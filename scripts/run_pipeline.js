#!/usr/bin/env node
/**
 * Pipeline Runner — v7 (v30)
 * Collector → AI-Search → Parser → Validation → 저장
 *
 * 실행:
 *   node scripts/run_pipeline.js                   (환경변수 기반 자동)
 *   node scripts/run_pipeline.js --mock             (API 전체 mock 강제, AI-Search 건너뜀)
 *   node scripts/run_pipeline.js --mock --dry-run   (저장 안 함)
 *   node scripts/run_pipeline.js --only KE TW       (특정 항공사)
 *   node scripts/run_pipeline.js --skip-llm         (Collector만 실행, AI-Search/Parser API 건너뜀)
 *   node scripts/run_pipeline.js --skip-llm --dry-run (수집기만 빠른 검증)
 *
 * 환경변수 (.env.local):
 *   ANTHROPIC_API_KEY      — 공지 파싱용 + AI-Search용 (없으면 mock 파서, AI-Search 건너뜀)
 *   EXCHANGERATE_API_KEY   — 환율 API (없으면 mock 환율)
 *   USE_LIVE_MARKET_DATA   — "true" 이면 환율 실제 호출
 *   SKIP_LLM               — "true" 이면 --skip-llm과 동일
 *
 * v5 변경 (v28):
 *   - Step 3.5: AI-Search (Level 3) 추가
 *     → Collector fallback 항공사 대상 AI 자동 검색 + 자동 검증 + 자동 등록
 *     → 검증 통과 시만 source='ai-search-auto'로 교체, 실패 시 기존 fallback 유지
 *     → --mock / --skip-llm / API 키 없을 때는 자동으로 건너뜀
 *   - Parser: ai-search-auto 결과는 _parsedDirect 직접 주입 (재파싱 불필요)
 *   - Candidate: ai-search-auto를 official_notice로 처리 (신뢰도 소폭 하향)
 *   - 로그: [AI-SEARCH] 태그로 전 단계 추적 가능
 */

'use strict';

// ── .env.local 로딩 (파일 없어도 오류 없음) ──
// dotenv 미설치 시 수동 파싱으로 fallback
const fs   = require('fs');
const path = require('path');

(function loadEnv() {
  const envPath = path.resolve(__dirname, '..', '.env.local');
  if (!fs.existsSync(envPath)) return;
  try {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;       // 빈줄·주석 skip
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx < 1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (key && !(key in process.env)) {                      // 이미 설정된 값은 덮어쓰지 않음
        process.env[key] = val;
      }
    }
    console.log('[Env] .env.local 로드 완료');
  } catch (e) {
    console.warn('[Env] .env.local 로드 실패:', e.message);
  }
})();

const { collectAll, SAVEABLE_SOURCES }         = require('../lib/collector');
const { parseAll }                             = require('../lib/parser');
const { validateAll, printValidationSummary }  = require('../lib/validation');
const { getMarketData }                        = require('../lib/market');
const { resolveFinal, logFinal }               = require('../lib/candidate');
const { getPipelineMonths }                    = require('../lib/month');
const { runAiSearch }                          = require('../lib/ai-search');

// ── CLI 인수 ──────────────────────────────
const args = process.argv.slice(2);
const OPT  = {
  mock:    args.includes('--mock'),
  dryRun:  args.includes('--dry-run'),
  skipLlm: args.includes('--skip-llm') || process.env.SKIP_LLM === 'true',
  only:   (() => {
    const idx = args.indexOf('--only');
    if (idx === -1) return null;
    // --only 뒤에 오는 비-플래그 인수들을 모두 수집
    const codes = [];
    for (let i = idx + 1; i < args.length && !args[i].startsWith('--'); i++) {
      codes.push(args[i]);
    }
    return codes.length ? codes : null;
  })(),
};

// ── 파일 경로 ─────────────────────────────
const ROOT      = path.resolve(__dirname, '..');
const DATA_DIR  = path.join(ROOT, 'public', 'data');
const FEED_PATH = path.join(DATA_DIR, 'official_surcharge_feed.json');
const FC_PATH   = path.join(DATA_DIR, 'forecast_feed.json');
const LOG_PATH  = path.join(DATA_DIR, 'pipeline_log.json');

function readJson(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return null; }
}

// ──────────────────────────────────────────
// mergeFeed — candidate 기반 다중 출처 선택
// ──────────────────────────────────────────
function mergeFeed(existingFeed, validatedResults, forecastFeed, manualOverrides, collected) {
  const feed = JSON.parse(JSON.stringify(existingFeed));
  const now  = new Date().toISOString();

  // forecast_feed에서 항공사별 예측 항목 인덱싱
  const forecastByCode = {};
  for (const fc of (forecastFeed?.forecasts || [])) {
    if (!forecastByCode[fc.airlineCode]) forecastByCode[fc.airlineCode] = [];
    forecastByCode[fc.airlineCode].push(fc);
  }

  const summary = [];

  for (const result of validatedResults) {
    const { airline } = result;
    const existing      = (feed.airlines || []).find(a => a.iataCode === airline);
    const forecasts     = forecastByCode[airline] || [];
    const overrideEntry = manualOverrides?.[airline] || null;

    if (!existing) { console.warn(`[Pipeline] ${airline}: 피드에 없음 → 건너뜀`); continue; }

    // collectorMonthType을 validatedResult에 주입 (collector에서 생성된 monthType)
    // collected 배열에서 같은 airline 찾기
    const collectedEntry = (typeof collected !== 'undefined' ? collected : []).find(c => c.code === airline);
    if (collectedEntry && collectedEntry.monthType) {
      result.collectorMonthType = collectedEntry.monthType;
    }

    // candidate 기반 최종 선택
    const final = resolveFinal(result, existing, forecasts, overrideEntry);
    logFinal(final);
    summary.push({ airline, finalSource: final.finalSource, finalConfidence: final.finalConfidence,
                   routeCount: final.finalRoutes.length, updated: final.updated });

    // 후보 요약 항상 기록 (감사 추적)
    existing.candidatesSummary = final.candidates.map(c => ({
      sourceType: c.sourceType, confidence: c.confidence,
      valid: c.valid !== false, routeCount: c.routes?.length || 0, reason: c.reason,
    }));
    existing.lastPipelineRun = now;

    if (!final.updated) {
      // carry_over / forecast_model → 기존 items 유지
      console.log(`[Pipeline] ${airline}: ← 기존 유지 (${final.finalSource})`);
      continue;
    }

    // 실제 갱신
    existing.confidence    = 'fresh';
    existing.supported     = true;
    existing.fetchedAt     = now;
    // displayMonth: official_notice면 탐지월, 그 외는 currentMonth (미래 오염 방지)
    existing.currentPeriod = final.displayMonth || final.month || existing.currentPeriod;
    existing.currency      = result.currency || existing.currency || 'KRW';
    existing.items         = final.finalRoutes;
    existing.dataQuality   = {
      source: final.finalSource, confidence: final.finalConfidence,
      updatedAt: now, reason: final.reason,
    };
    if (result.spikeDetected) {
      existing.spikeWarning = result.allWarnings.filter(w => w.includes('이상변동')).join('; ');
    } else { delete existing.spikeWarning; }
    delete existing.lowConfidenceReason;
    if (result.summary) existing.aiSummary = result.summary;

    console.log(`[Pipeline] ${airline}: ✅ 갱신 (${final.finalSource}, ${final.finalRoutes.length}구간, conf=${(final.finalConfidence*100).toFixed(0)}%, month=${final.displayMonth}, monthType=${final.monthType})`);
  }

  console.log('\n[Pipeline] ── 실행 요약 ──');
  for (const s of summary) {
    const icon = s.updated ? '✅' : '🔵';
    console.log(`  ${icon} ${s.airline}: ${s.finalSource} (${(s.finalConfidence*100).toFixed(0)}%, ${s.routeCount}구간)`);
  }
  console.log('[Pipeline] ────────────────\n');

  feed.meta = feed.meta || {};
  feed.meta.lastUpdated = now;
  feed.meta.pipelineRun = now;
  return feed;
}

// ──────────────────────────────────────────
// forecast_feed inputs 갱신
// ──────────────────────────────────────────
function updateForecastInputs(existingFc, marketData) {
  const fc = JSON.parse(JSON.stringify(existingFc));
  fc.meta  = fc.meta || {};
  fc.meta.inputs = {
    brentUSD:              marketData.brentUSD,
    wtiUSD:                marketData.wtiUSD,
    jetFuelSpread:         marketData.jetFuelSpread,
    usdKrw:                marketData.usdKrw,
    usdJpy:                marketData.usdJpy,
    geopoliticalRiskScore: marketData.geopoliticalRiskScore,
    baselineBrentUSD:      marketData.baselineBrentUSD,
    marketDataSource:      marketData.source,
    marketFetchedAt:       marketData.fetchedAt,
  };
  fc.meta.generatedAt = new Date().toISOString();
  return fc;
}

// ──────────────────────────────────────────
// 실행 로그 저장
// ──────────────────────────────────────────
function saveLog(logData) {
  let existing = readJson(LOG_PATH) || { runs: [] };
  existing.runs.unshift(logData);
  if (existing.runs.length > 20) existing.runs = existing.runs.slice(0, 20);
  fs.writeFileSync(LOG_PATH, JSON.stringify(existing, null, 2), 'utf8');
}

// ──────────────────────────────────────────
// 최종 출력 요약 — 거리구간별 리스트
// ──────────────────────────────────────────
function printSummary(validated) {
  console.log('\n════════════════════════════════════════');
  console.log('  유류할증료 파이프라인 결과 (구간별)');
  console.log('════════════════════════════════════════');

  for (const r of validated) {
    const spike = r.spikeDetected ? ' 🚨 이상변동' : '';
    console.log(`\n🛫 ${r.airline}  [${r.effective_month || '월 미상'}]${spike}`);

    if (!r.hasValidData) {
      console.log('  ⛔ 유효 데이터 없음 (UI 반영 안 됨)');
      if (r.parse_warning) console.log(`  ℹ️  ${r.parse_warning}`);
      continue;
    }

    // 거리구간별 리스트 출력
    r.validRoutes.forEach(route => {
      const rangeStr = route.distance_range ? `[${route.distance_range}마일] ` : '';
      const amtStr   = route.amount != null
        ? `${route.amount.toLocaleString()} ${route.currency || r.currency || 'KRW'}`
        : '금액 없음';
      const spikeFlag = route._validation?.warnings?.some(w=>w.includes('이상변동')) ? ' ⚠' : '';
      console.log(`  ✅ ${rangeStr}${route.route_type || '노선 미상'}: ${amtStr}${spikeFlag}`);
    });

    if (r.rejectedRoutes.length) {
      r.rejectedRoutes.forEach(rt =>
        console.log(`  ❌ 거부 [${rt.route_type||'?'}]: ${rt._validation.errors.join(', ')}`)
      );
    }
    if (r.summary) console.log(`  📝 ${r.summary}`);
  }
  console.log('\n════════════════════════════════════════\n');
}

// ──────────────────────────────────────────
// 메인
// ──────────────────────────────────────────
async function main() {
  const startTime = Date.now();
  console.log(`\n[Pipeline] 시작 ${new Date().toLocaleString('ko-KR')}`);

  // API 키 설정 현황 출력 (값 자체는 노출 안 함)
  console.log(`[Pipeline] Anthropic API: ${process.env.ANTHROPIC_API_KEY ? '✅ 설정됨' : '⚠ 미설정 (mock 파서)'}`);
  console.log(`[Pipeline] 환율 API:      ${process.env.EXCHANGERATE_API_KEY ? '✅ 설정됨' : '⚠ 미설정 (mock 환율)'}`);
  console.log(`[Pipeline] 실시간 시장:   ${process.env.USE_LIVE_MARKET_DATA === 'true' ? '✅ 활성화' : '— 비활성화'}`);

  if (OPT.mock)    console.log('[Pipeline] --mock: 모든 API mock 강제');
  if (OPT.dryRun)  console.log('[Pipeline] --dry-run: 파일 저장 안 함');
  if (OPT.skipLlm) console.log('[Pipeline] --skip-llm: Collector만 실행, Parser API 건너뜀 (mock 파서)');
  if (OPT.only)    console.log(`[Pipeline] --only: ${OPT.only.join(', ')}`);

  const { currentMonth, nextMonth } = getPipelineMonths();
  console.log(`[Pipeline] 기준월: ${currentMonth} (현재) / ${nextMonth} (다음달 예고)`);

  const logEntry = { runAt: new Date().toISOString(), opts: OPT, steps: {}, success: false };

  try {
    // Step 1: 기존 피드 로드
    const existingFeed   = readJson(FEED_PATH);
    const existingFc     = readJson(FC_PATH);
    const manualOverrides = readJson(path.join(DATA_DIR, 'manual_overrides.json'));
    if (!existingFeed) throw new Error(`피드 파일 없음: ${FEED_PATH}`);
    console.log(`[Step 1] 피드 로드: ${existingFeed.airlines?.length || 0}개 항공사`);

    // Step 2: 시장 데이터 (환경변수 기반 live/mock 분기)
    // USE_LIVE_MARKET_DATA=true → 환율 API 실제 호출 시도
    // --mock 플래그 → 항상 mock (환경변수 무시)
    const marketData = await getMarketData({ useMock: OPT.mock });
    const marketMode = OPT.mock ? 'mock(강제)'
      : process.env.USE_LIVE_MARKET_DATA === 'true' ? 'live 시도'
      : 'mock';
    console.log(`[Step 2] 시장 데이터 (${marketMode}): Brent $${marketData.brentUSD}, USD/KRW ${marketData.usdKrw} [source: ${marketData.source}]`);
    if (marketData.fxError) {
      console.warn(`[Step 2] ⚠ 환율 live 실패: ${marketData.fxError}`);
    }
    logEntry.steps.market = { source: marketData.source, usdKrw: marketData.usdKrw, fxError: marketData.fxError || null };

    // Step 3: Collector
    console.log('\n[Step 3] Collector...');
    const collected = await collectAll({ useMock: OPT.mock, only: OPT.only });
    logEntry.steps.collect = collected.map(c => ({
      code: c.code, detected: c.detected, source: c.source, error: c.error,
    }));

    // source별 결과 요약 출력 (v30: SAVEABLE_SOURCES 기준)
    const successCount  = collected.filter(c => SAVEABLE_SOURCES.includes(c.source)).length;
    const fallCount     = collected.filter(c => !SAVEABLE_SOURCES.includes(c.source)).length;
    console.log(`[Step 3] 수집 완료: 성공 ${successCount}개, fallback ${fallCount}개`);
    collected.forEach(c => {
      const ok   = SAVEABLE_SOURCES.includes(c.source);
      const icon = ok ? '✅' : '⚠ ';
      const src  = c.source.padEnd(16);
      console.log(`  ${icon} ${c.code.padEnd(3)} | source: ${src} | ${c.error ? '사유: ' + c.error.slice(0, 55) : '성공'}`);
    });

    // Step 3.5: AI 자동 검색 (Level 3) — fallback 항공사 복구 시도
    // --mock, --skip-llm 모드에서는 건너뜀 (실 API 호출 필요)
    let collectedFinal = collected;
    if (!OPT.mock && !OPT.skipLlm && process.env.ANTHROPIC_API_KEY) {
      console.log('\n[Step 3.5] AI-Search (Level 3)...');
      try {
        collectedFinal = await runAiSearch(collected);
        const autoCount     = collectedFinal.filter(c => c.source === 'ai-search-auto').length;
        const stillFallback = collectedFinal.filter(c => c.source === 'fallback').length;
        console.log(`[Step 3.5] AI-Search 완료: auto 등록 ${autoCount}개, 여전히 fallback ${stillFallback}개`);
        logEntry.steps.aiSearch = {
          autoRegistered: collectedFinal
            .filter(c => c.source === 'ai-search-auto')
            .map(c => ({ code: c.code, sourceUrl: c.sourceUrl })),
          stillFallback: collectedFinal
            .filter(c => c.source === 'fallback')
            .map(c => c.code),
        };
      } catch (aiErr) {
        console.warn(`[Step 3.5] AI-Search 예외 (pipeline 계속): ${aiErr.message}`);
        logEntry.steps.aiSearch = { error: aiErr.message };
        // 예외 발생 시 원본 collected 그대로 사용
      }
    } else {
      const skipReason = OPT.mock ? '--mock' : OPT.skipLlm ? '--skip-llm' : 'ANTHROPIC_API_KEY 없음';
      console.log(`\n[Step 3.5] AI-Search 건너뜀 (${skipReason})`);
      logEntry.steps.aiSearch = { skipped: true, reason: skipReason };
    }

    // Step 4: Parser
    console.log('\n[Step 4] Parser...');
    // 수집 source를 parser 입력 로그에 반영
    collectedFinal.forEach(c => {
      const srcTag = c.source === 'live'              ? '[실공지]  '
                   : c.source === 'ai-search-auto'    ? '[ai-search]'
                   : c.source === 'override-text'     ? '[수동텍스트]'
                   : c.source === 'override-html'     ? '[수동HTML]'
                   : c.source === 'override-url'      ? '[수동URL] '
                   : '[fallback] ';
      const saveable = SAVEABLE_SOURCES.includes(c.source);
      console.log(`  ${saveable ? '✅' : '⚠ '} ${srcTag} ${c.code}: 출처=${c.source}`);
    });
    const parsed = await parseAll(collectedFinal, { skipLlm: OPT.skipLlm });
    logEntry.steps.parse = parsed.map(p => ({
      code: p.airline, routeCount: p.routes?.length || 0, usedMock: p.usedMock,
    }));
    console.log(`[Step 4] 파싱 완료: ${parsed.map(p=>`${p.airline}(${p.routes?.length||0}구간)`).join(', ')}`);

    // Step 5: Validation
    console.log('\n[Step 5] Validation...');
    const validated = validateAll(parsed, existingFeed, collectedFinal); // collected source 전달
    printValidationSummary(validated);
    logEntry.steps.validate = validated.map(v => ({
      code: v.airline, passed: v.hasValidData, spikeDetected: v.spikeDetected,
      validRoutes: v.validRoutes.length, rejectedRoutes: v.rejectedRoutes.length,
    }));

    // Step 6: 결과 출력
    printSummary(validated);

    // Step 7: 저장
    if (!OPT.dryRun) {
      const updatedFeed = mergeFeed(existingFeed, validated, existingFc, manualOverrides, collectedFinal);
      fs.writeFileSync(FEED_PATH, JSON.stringify(updatedFeed, null, 2), 'utf8');
      console.log(`[Step 7] 피드 저장: ${FEED_PATH}`);

      if (existingFc) {
        const updatedFc = updateForecastInputs(existingFc, marketData);
        fs.writeFileSync(FC_PATH, JSON.stringify(updatedFc, null, 2), 'utf8');
        console.log(`[Step 7] forecast 저장: ${FC_PATH}`);
      }
    } else {
      console.log('[Step 7] dry-run: 저장 건너뜀');
    }

    logEntry.success    = true;
    logEntry.durationMs = Date.now() - startTime;
    saveLog(logEntry);
    console.log(`[Pipeline] 완료 (${logEntry.durationMs}ms)\n`);

  } catch (err) {
    console.error('[Pipeline] 치명적 오류:', err.message);
    logEntry.error = err.message;
    logEntry.durationMs = Date.now() - startTime;
    saveLog(logEntry);
    process.exit(1);
  }
}

main();
