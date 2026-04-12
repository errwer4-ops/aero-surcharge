/**
 * Collector Layer — v10 (v30)
 *
 * 서비스 범위 재정의:
 *   - 출발지: 대한민국 (ICN/GMP)
 *   - 대상: 한국 국적 항공사 (KE, OZ, TW, LJ, 7C, BX, YP)
 *   - 기준: "한국 출발 국제선 유류할증료 (YR)"만
 *
 * v9 → v10 변경사항:
 *
 *   [Override 확장] — 핵심 변경
 *   - type: url  → URL fetch 후 파싱 (기존)
 *   - type: text → 공지 텍스트 직접 입력, Collector 완전 우회
 *   - type: html → 공지 HTML 직접 입력, Collector 완전 우회
 *   - text/html override 시 Playwright 포함 자동화 전체 skip
 *   - KE, OZ: override 기반 운영 권장 (overrideRecommended: true)
 *
 *   [수집 원칙]
 *   - 항공사 공지 그대로 전달 (계산/추정 금지)
 *   - 자동 수집은 보조, 실패 시 즉시 fallback
 *   - fallback 저장 금지 유지
 *
 *   [운영]
 *   - override → API/JSON → direct fetch → Playwright → fallback
 *   - 수집 후 요약 리포트 + override 등록 가이드 출력
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const {
  getPipelineMonths,
  detectMonthFromText,
  classifyNoticeMonth,
} = require('../month');

const { collectKE }     = require('./airlines/KE');
const { collectOZ }     = require('./airlines/OZ');
const { collectTW }     = require('./airlines/TW');
const { collectHybrid } = require('./airlines/HYBRID');
const { htmlToText, detectKeywords } = require('./utils/html');

// ─────────────────────────────────────────
// 상수
// ─────────────────────────────────────────

const COLLECTOR_TIMEOUT_MS = 90000;

const OVERRIDE_SOURCE = {
  url:  'override-url',
  text: 'override-text',
  html: 'override-html',
};

// 저장 허용 source 목록 (외부에서도 참조)
const SAVEABLE_SOURCES = ['live', 'override-url', 'override-text', 'override-html', 'ai-search-auto'];

// ─────────────────────────────────────────
// 항공사 타겟
// ─────────────────────────────────────────

const AIRLINE_TARGETS = [
  {
    code: 'KE', name: '대한항공',
    strategy: 'browser-heavy',
    listUrl: 'https://www.koreanair.com/contents/footer/customer-support/notice',
    baseUrl: 'https://www.koreanair.com',
    keywords: ['유류할증료', '유류 할증료', 'fuel surcharge', 'YQ', 'YR'],
    overrideRecommended: true,
    mockHtml: '<div class="notice-content"><h3>2026년 4월 국제선 유류할증료 안내</h3><table><thead><tr><th>거리구간</th><th>유류할증료</th></tr></thead><tbody><tr><td>500마일 미만</td><td>42,000원</td></tr><tr><td>500~1,000마일</td><td>57,000원</td></tr><tr><td>1,000~1,500마일</td><td>78,000원</td></tr><tr><td>1,500~2,000마일</td><td>97,500원</td></tr><tr><td>2,000~3,000마일</td><td>123,000원</td></tr><tr><td>3,000~4,000마일</td><td>126,000원</td></tr><tr><td>4,000~5,000마일</td><td>199,500원</td></tr><tr><td>5,000~6,500마일</td><td>276,000원</td></tr><tr><td>6,500마일 이상</td><td>303,000원</td></tr></tbody></table></div>',
  },
  {
    code: 'OZ', name: '아시아나항공',
    strategy: 'browser-heavy',
    listUrl: 'https://flyasiana.com/C/KR/KO/customer/notice/list',
    baseUrl: 'https://flyasiana.com',
    keywords: ['유류할증료', '유류 할증료', 'fuel surcharge', 'YQ', 'YR'],
    overrideRecommended: true,
    mockHtml: '<div class="board-content"><h4>아시아나항공 2026년 4월 유류할증료 안내</h4><table><tr><th>구간</th><th>금액(원)</th></tr><tr><td>500마일 미만</td><td>42,000</td></tr><tr><td>500~1,500마일</td><td>78,000</td></tr><tr><td>1,500~2,500마일</td><td>110,000</td></tr><tr><td>5,000마일 이상</td><td>276,000</td></tr></table></div>',
  },
  {
    code: 'TW', name: '티웨이항공',
    strategy: 'hybrid',
    listUrl: 'https://www.twayair.com/app/customerCenter/notice',
    baseUrl: 'https://www.twayair.com',
    keywords: ['유류할증료', '유류 할증료', 'fuel surcharge', 'YQ', 'YR'],
    overrideRecommended: false,
    mockHtml: '<div class="surcharge-wrap"><h2>유류할증료 안내</h2><p>2026년 4월</p><table><tr><th>구간</th><th>금액</th></tr><tr><td>500마일 미만</td><td>42,000원</td></tr><tr><td>500~1,000마일</td><td>57,000원</td></tr><tr><td>1,000~1,500마일</td><td>78,000원</td></tr></table></div>',
  },
  {
    code: 'LJ', name: '진에어',
    strategy: 'hybrid',
    listUrl: 'https://www.jinair.com/company/announce/announceList',
    baseUrl: 'https://www.jinair.com',
    keywords: ['유류할증료', '유류 할증료', 'fuel surcharge', 'YQ', 'YR'],
    overrideRecommended: false,
    mockHtml: '<div class="notice-detail"><h4>진에어 2026년 4월 국제선 유류할증료</h4><table><tr><th>노선</th><th>편도</th></tr><tr><td>500마일 미만</td><td>42,000원</td></tr><tr><td>500~1,000마일</td><td>57,000원</td></tr><tr><td>1,000~1,500마일</td><td>78,000원</td></tr><tr><td>3,000~4,000마일</td><td>126,000원</td></tr></table></div>',
  },
  {
    code: '7C', name: '제주항공',
    strategy: 'hybrid',
    listUrl: 'https://www.jejuair.net/ko/customerServiceCenter/notice.do',
    baseUrl: 'https://www.jejuair.net',
    keywords: ['유류할증료', '유류 할증료', 'fuel surcharge', 'YQ', 'YR'],
    overrideRecommended: false,
    mockHtml: '<div class="view-content"><h3>2026년 4월 국제선 유류할증료 안내</h3><table><tr><th>운항거리</th><th>유류할증료(원)</th></tr><tr><td>500마일 미만</td><td>42,000</td></tr><tr><td>500~1,000마일</td><td>57,000</td></tr><tr><td>1,000~2,000마일</td><td>97,500</td></tr><tr><td>2,000~3,000마일</td><td>123,000</td></tr></table></div>',
  },
  {
    code: 'BX', name: '에어부산',
    strategy: 'hybrid',
    listUrl: 'https://www.airbusan.com/ko/customer/notice',
    baseUrl: 'https://www.airbusan.com',
    keywords: ['유류할증료', '유류 할증료', 'fuel surcharge', 'YQ', 'YR'],
    overrideRecommended: false,
    mockHtml: '<div class="content-area"><h3>에어부산 2026년 4월 유류할증료</h3><table><tr><th>운항거리</th><th>KRW/편도</th></tr><tr><td>~500마일</td><td>42,000</td></tr><tr><td>500~1,000마일</td><td>57,000</td></tr><tr><td>1,000~1,500마일</td><td>78,000</td></tr></table></div>',
  },
  {
    code: 'YP', name: '에어프레미아',
    strategy: 'hybrid',
    listUrl: 'https://www.airpremia.com/a/ko/customer/notice',
    baseUrl: 'https://www.airpremia.com',
    keywords: ['유류할증료', '유류 할증료', 'fuel surcharge', 'YQ', 'YR'],
    overrideRecommended: false,
    mockHtml: '<div class="notice"><h3>에어프레미아 2026년 4월 유류할증료</h3><table><tr><td>미주 노선 (5,000마일 이상)</td><td>199,500원</td></tr><tr><td>동남아 (2,000~4,000마일)</td><td>126,000원</td></tr></table></div>',
  },
];

// ─────────────────────────────────────────
// Override 로드 및 해석
// ─────────────────────────────────────────

function loadOverrides() {
  const p = path.join(process.cwd(), 'public', 'data', 'manual_overrides.json');
  try {
    if (!fs.existsSync(p)) return {};
    return JSON.parse(fs.readFileSync(p, 'utf8')).collector_overrides || {};
  } catch (e) {
    console.warn('[Collector] override 로드 실패:', e.message);
    return {};
  }
}

/**
 * override entry 반환.
 *
 * 신버전: { type: 'url'|'text'|'html', value, sourceUrl? }
 * 구버전 호환: 문자열 → type='url'로 취급
 * value가 비어있으면 null 반환
 */
function getOverrideEntry(overrides, code, targetMonth) {
  const raw = (overrides[code] || {})[targetMonth];
  if (!raw) return null;

  // 구버전 호환 (string URL)
  if (typeof raw === 'string') {
    const v = raw.trim();
    return v ? { type: 'url', value: v, sourceUrl: v } : null;
  }

  if (typeof raw === 'object') {
    const type  = (raw.type  || '').trim();
    const value = (raw.value || '').trim();
    if (!type || !value) return null;
    if (!['url', 'text', 'html'].includes(type)) {
      console.warn(`[Collector] override type 미지원: "${type}" — 무시`);
      return null;
    }
    return { type, value, sourceUrl: (raw.sourceUrl || '').trim() || null };
  }
  return null;
}

// ─────────────────────────────────────────
// text/html override 처리 (Collector 완전 우회)
// ─────────────────────────────────────────

function applyTextOrHtmlOverride(target, entry) {
  const { code, keywords } = target;
  const { currentMonth, nextMonth } = getPipelineMonths();
  const tag = `[Collector][${code}]`;

  let html, text;
  if (entry.type === 'text') {
    text = entry.value;
    html = entry.value;   // parser가 text도 rawHtml로 처리
  } else {
    html = entry.value;
    text = htmlToText(html);
  }

  const { detected, matched } = detectKeywords(html + text, keywords);
  const detectedMonth = detectMonthFromText(text);
  const monthType     = classifyNoticeMonth(detectedMonth, currentMonth, nextMonth);
  const source        = OVERRIDE_SOURCE[entry.type];

  console.log(`${tag} [${source}] ✅ Collector 우회 | ${text.length}자 | month: ${detectedMonth} [${monthType}]`);

  return { html, text, sourceUrl: entry.sourceUrl || target.listUrl, monthType, detectedMonth, source, detected, matched };
}

// ─────────────────────────────────────────
// 알림 인터페이스 (추후 확장)
// ─────────────────────────────────────────

async function sendAlert(summary) {
  // [추후] process.env.ALERT_WEBHOOK_URL 으로 POST
  void summary;
}

// ─────────────────────────────────────────
// 운영 요약 리포트
// ─────────────────────────────────────────

function printCollectionSummary(results) {
  const succeeded = results.filter(r => SAVEABLE_SOURCES.includes(r.source));
  const failed    = results.filter(r => !SAVEABLE_SOURCES.includes(r.source));

  console.log('\n' + '═'.repeat(64));
  console.log('📊 [Collector] 수집 결과 요약 (v30)');
  console.log('═'.repeat(64));

  console.log(`\n✅ 수집 성공 (${succeeded.length}개):`);
  for (const r of succeeded) {
    const mark = r.source.startsWith('override') ? ' [수동입력]' : '';
    console.log(`   ${r.code.padEnd(3)} ${r.name.padEnd(8)} source: ${r.source.padEnd(16)} month: ${r.detectedMonth || '미상'} [${r.monthType}]${mark}`);
  }

  console.log(`\n❌ 수집 실패 / fallback (${failed.length}개):`);
  const needOverride = [];
  for (const r of failed) {
    const reason = r.error ? r.error.slice(0, 65) : '원인 불명';
    const rec    = AIRLINE_TARGETS.find(t => t.code === r.code)?.overrideRecommended ? ' ⚠ override 권장' : '';
    console.log(`   ${r.code.padEnd(3)} ${r.name.padEnd(8)} → ${reason}${rec}`);
    needOverride.push(r.code);
  }

  if (needOverride.length > 0) {
    console.log('\n📝 override 등록 방법 (manual_overrides.json > collector_overrides):');
    console.log('   [텍스트 직접 입력] { "type": "text", "value": "500마일 미만: 42,000원\\n..." }');
    console.log('   [URL 등록]         { "type": "url",  "value": "https://..." }');
    console.log('   [HTML 직접 입력]   { "type": "html", "value": "<table>...</table>" }');
  }

  console.log('\n📋 source별 분류:');
  const bySource = {};
  for (const r of results) {
    if (!bySource[r.source]) bySource[r.source] = [];
    bySource[r.source].push(r.code);
  }
  for (const [src, codes] of Object.entries(bySource).sort()) {
    const icon = SAVEABLE_SOURCES.includes(src) ? '✅' : '⚠️ ';
    console.log(`   ${icon} ${src.padEnd(18)}: ${codes.join(', ')}`);
  }
  console.log('═'.repeat(64) + '\n');

  sendAlert({ failedAirlines: failed.map(r => r.code), needOverride }).catch(() => {});
  return { succeeded, failed, needOverride };
}

// ─────────────────────────────────────────
// 전략 디스패치
// ─────────────────────────────────────────

function dispatchCollect(target, overrideUrl) {
  if (target.code === 'KE') return collectKE(target, overrideUrl);
  if (target.code === 'OZ') return collectOZ(target, overrideUrl);
  if (target.code === 'TW') return collectTW(target, overrideUrl);
  return collectHybrid(target, overrideUrl);
}

// ─────────────────────────────────────────
// collectOne
// ─────────────────────────────────────────

async function collectOne(target, opts = {}) {
  const { currentMonth, nextMonth } = getPipelineMonths();
  const result = {
    code: target.code, name: target.name,
    sourceUrl: target.listUrl, rawHtml: '', text: '',
    detected: false, matched: [], source: 'fallback',
    fetchedAt: new Date().toISOString(), error: null,
    detectedMonth: null, monthType: 'UNKNOWN',
  };

  if (opts.useMock) {
    result.rawHtml       = target.mockHtml;
    result.text          = htmlToText(target.mockHtml);
    result.source        = 'fallback';
    result.detectedMonth = detectMonthFromText(result.text);
    result.monthType     = classifyNoticeMonth(result.detectedMonth, currentMonth, nextMonth);
    Object.assign(result, detectKeywords(target.mockHtml, target.keywords));
    return result;
  }

  try {
    const overrides = loadOverrides();
    const entry     = getOverrideEntry(overrides, target.code, currentMonth);

    // ── text/html override: 자동 수집 전체 우회 ──────────────
    if (entry && (entry.type === 'text' || entry.type === 'html')) {
      const ov = applyTextOrHtmlOverride(target, entry);
      result.sourceUrl     = ov.sourceUrl;
      result.rawHtml       = ov.html;
      result.text          = ov.text;
      result.source        = ov.source;
      result.detectedMonth = ov.detectedMonth;
      result.monthType     = ov.monthType;
      result.detected      = ov.detected;
      result.matched       = ov.matched;
      console.log(`[Collector][${target.code}] ✅ source: ${result.source} | month: ${result.detectedMonth || '미상'} | monthType: ${result.monthType}`);
      return result;
    }

    // ── url override or 자동 수집 ─────────────────────────────
    const overrideUrl = entry?.type === 'url' ? entry.value : null;
    if (overrideUrl) {
      console.log(`[Collector][${target.code}] override URL: ${overrideUrl}`);
    } else if (target.overrideRecommended) {
      console.log(`[Collector][${target.code}] ⚠ override 권장 항공사 — 자동 수집 시도`);
    }

    const timeoutP = new Promise((_, rej) =>
      setTimeout(() => rej(new Error(`hard timeout ${COLLECTOR_TIMEOUT_MS / 1000}s`)), COLLECTOR_TIMEOUT_MS)
    );

    const fetched = await Promise.race([dispatchCollect(target, overrideUrl), timeoutP]);

    result.sourceUrl     = fetched.sourceUrl;
    result.rawHtml       = fetched.html;
    result.text          = fetched.text;
    result.monthType     = fetched.monthType || 'UNKNOWN';
    result.detectedMonth = detectMonthFromText(fetched.text) || detectMonthFromText(fetched.html || '');
    result.source        = fetched.source || 'live';

    const { detected, matched } = detectKeywords(fetched.html, target.keywords);
    result.detected = detected;
    result.matched  = matched;

    if (!detected) console.warn(`[Collector][${target.code}] ⚠ 키워드 미탐지`);
    console.log(`[Collector][${target.code}] ✅ source: ${result.source} | month: ${result.detectedMonth || '미상'} | monthType: ${result.monthType}`);

  } catch (err) {
    console.warn(`[Collector][${target.code}] ❌ 수집 실패 → fallback: ${err.message}`);
    result.error         = err.message;
    result.rawHtml       = target.mockHtml;
    result.text          = htmlToText(target.mockHtml);
    result.source        = 'fallback';
    result.detectedMonth = detectMonthFromText(result.text);
    result.monthType     = classifyNoticeMonth(result.detectedMonth, currentMonth, nextMonth);
    Object.assign(result, detectKeywords(target.mockHtml, target.keywords));
  }

  return result;
}

// ─────────────────────────────────────────
// collectAll
// ─────────────────────────────────────────

async function collectAll(opts = {}) {
  const { currentMonth, nextMonth } = getPipelineMonths();
  const targets = opts.only
    ? AIRLINE_TARGETS.filter(t => opts.only.includes(t.code))
    : AIRLINE_TARGETS;

  console.log(`[Collector] 수집 시작 (v30): ${targets.map(t => t.code).join(', ')}`);
  console.log(`[Collector] 기준월: ${currentMonth} / 다음월: ${nextMonth}`);

  const settled   = await Promise.allSettled(targets.map(t => collectOne(t, opts)));
  const collected = settled.map((r, i) => {
    if (r.status === 'fulfilled') return r.value;
    return {
      code: targets[i].code, name: targets[i].name,
      sourceUrl: targets[i].listUrl, rawHtml: targets[i].mockHtml,
      text: htmlToText(targets[i].mockHtml),
      detected: false, matched: [], source: 'fallback',
      fetchedAt: new Date().toISOString(), error: r.reason?.message || 'Unknown',
      detectedMonth: null, monthType: 'UNKNOWN',
    };
  });

  printCollectionSummary(collected);
  return collected;
}

module.exports = { collectAll, collectOne, AIRLINE_TARGETS, SAVEABLE_SOURCES, getOverrideEntry, loadOverrides };
