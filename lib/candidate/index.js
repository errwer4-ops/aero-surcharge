/**
 * Candidate Selection Layer — v4 (v31)
 *
 * v3 → v4 핵심 변경:
 *   [버그 수정] override-text / override-html / override-url source가
 *   final 선택에서 무시되던 치명적 오류 수정.
 *
 *   원인:
 *     buildCandidates에서 isLiveSource || isAiSearchSource 조건만 체크해
 *     override 계열 source(override-text/html/url)가 official_notice로 등록되지 않았음.
 *     결과적으로 forecast_model이 final로 선택되는 오류 발생.
 *
 *   수정:
 *     1) override 계열 source는 buildCandidates에서 'override' sourceType으로 별도 등록
 *     2) selectFinal ORDER에서 'override'를 manual_verified보다 앞에 배치
 *     3) override는 confidence/monthType과 무관하게 무조건 최우선 선택
 *
 *   최종 우선순위:
 *     override (text/html/url) > manual_verified > official_notice >
 *     yr_yq_quote > carry_over > forecast_model
 */

'use strict';

const {
  getPipelineMonths,
  classifyNoticeMonth,
  monthTypePriority,
  validateCarryOverMonth,
} = require('../month');

// ──────────────────────────────────────────
// 기본 신뢰도
// ──────────────────────────────────────────

const CONFIDENCE = {
  override:        1.00,   // v31: override 계열 최우선 고정값
  manual_verified: 0.98,
  official_notice: 0.95,
  yr_yq_quote:     0.80,
  carry_over:      0.60,
  forecast_model:  0.45,
};

// override source 목록
const OVERRIDE_SOURCES = new Set(['override-text', 'override-html', 'override-url']);

// 저장 가능 source (fallback/mock 제외)
const SAVEABLE_SOURCES = new Set(['live', 'override-url', 'override-text', 'override-html', 'ai-search-auto']);

// ──────────────────────────────────────────
// Route 변환 헬퍼
// ──────────────────────────────────────────

function routesToItems(validRoutes, airline, currency = 'KRW') {
  return validRoutes.map(route => ({
    key:           `${airline}_${(route.distance_range || route.route_type || 'gen').replace(/\s+/g, '_')}`,
    label:         route.route_type || route.distance_range || '일반',
    distanceRange: route.distance_range || null,
    current:       route.amount,
    next:          null,
    diff:          null,
    currency:      route.currency || currency || 'KRW',
    spiked:        route._validation?.warnings?.some(w => w.includes('이상변동')) || false,
  }));
}

function itemsToRoutes(items) {
  return (items || []).map(it => ({
    route_type:      it.label || it.distanceRange || '일반',
    distance_range:  it.distanceRange || null,
    amount:          it.current,
    currency:        it.currency || 'KRW',
    confidence_note: 'carry_over from previous feed',
    _validation:     { passed: true, errors: [], warnings: [] },
  }));
}

function forecastToRoutes(forecasts) {
  return forecasts
    .filter(f => f.predictedMin != null && f.predictedMax != null)
    .map(f => ({
      route_type:     f.distanceLabel || f.distanceBand || '예측 구간',
      distance_range: null,
      amount:         Math.round((f.predictedMin + f.predictedMax) / 2),
      currency:       'KRW',
      confidence_note: `forecast_model: ${f.distanceBand || ''} (${f.direction})`,
      _validation:    { passed: true, errors: [], warnings: [] },
    }));
}

// ──────────────────────────────────────────
// 후보 목록 조합
// ──────────────────────────────────────────

function buildCandidates(validatedResult, existingEntry, forecastEntries, overrideEntry) {
  const { airline, collectorSource, hasValidData, blockUpdate,
          validRoutes, effective_month, currency,
          collectorMonthType } = validatedResult;

  const { currentMonth } = getPipelineMonths();
  const candidates = [];

  // ── 0) [v31 신규] override 계열 source — 무조건 최우선 ──────────
  // override-text / override-html / override-url 로 수집된 데이터가
  // validation을 통과한 경우, 'override' sourceType으로 등록
  if (OVERRIDE_SOURCES.has(collectorSource) && hasValidData && !blockUpdate && validRoutes.length > 0) {
    const monthType = collectorMonthType || 'UNKNOWN';
    candidates.push({
      sourceType:     'override',
      confidence:     CONFIDENCE.override,
      valid:          true,
      routes:         routesToItems(validRoutes, airline, currency),
      reason:         `수동 입력 (source=${collectorSource}) + 검증 통과 (${validRoutes.length}구간) [월: ${monthType}]`,
      effectiveMonth: effective_month,
      monthType,
    });
    console.log(`[Candidate][${airline}] override 후보 등록: source=${collectorSource}, routes=${validRoutes.length}, monthType=${monthType}`);
  }

  // ── 1) manual_verified (노선별 overrideEntry.items) ──────────────
  if (overrideEntry && Array.isArray(overrideEntry.items) && overrideEntry.items.length > 0) {
    candidates.push({
      sourceType: 'manual_verified', confidence: CONFIDENCE.manual_verified,
      valid: true, routes: overrideEntry.items,
      reason: 'manual_overrides.json 노선 override 적용',
    });
  }

  // ── 2) official_notice (live / ai-search-auto) ───────────────────
  const isLiveSource     = collectorSource === 'live';
  const isAiSearchSource = collectorSource === 'ai-search-auto';
  const isOfficialValid  = hasValidData && !blockUpdate && (isLiveSource || isAiSearchSource) && validRoutes.length > 0;

  if (isOfficialValid) {
    const monthType = collectorMonthType || 'UNKNOWN';
    let confidence = CONFIDENCE.official_notice;
    if (monthType === 'CURRENT') confidence = isAiSearchSource ? 0.90 : 0.97;
    else if (monthType === 'NEXT') confidence = isAiSearchSource ? 0.82 : 0.88;
    else confidence = isAiSearchSource ? 0.76 : 0.82;

    const sourceLabel = isAiSearchSource ? 'AI 자동 검색 복구' : 'live 수집';
    candidates.push({
      sourceType: 'official_notice', confidence, valid: true,
      routes:     routesToItems(validRoutes, airline, currency),
      reason:     `${sourceLabel} + AI 파싱 (${validRoutes.length}구간) [월: ${monthType}]`,
      effectiveMonth: effective_month,
      monthType,
    });
  } else if (hasValidData && !blockUpdate && validRoutes.length > 0
             && !OVERRIDE_SOURCES.has(collectorSource)) {
    // fallback 파싱 결과 — final 사용 불가 (valid=false)
    candidates.push({
      sourceType: 'carry_over', confidence: CONFIDENCE.carry_over * 0.8,
      valid: false,
      routes: routesToItems(validRoutes, airline, currency),
      reason: `fallback 파싱 (source=${collectorSource}) — final 사용 불가`,
    });
  }

  // ── 3) carry_over — 이전 피드 유지 (미래월 오염 차단) ───────────
  const prevItems = existingEntry?.items || [];
  const prevMonth = existingEntry?.currentPeriod || null;

  if (prevItems.length > 0) {
    const monthCheck = validateCarryOverMonth(prevMonth, currentMonth);
    let carryConfidence = CONFIDENCE.carry_over - monthCheck.penalty;
    if (carryConfidence < 0.05) carryConfidence = 0.05;

    candidates.push({
      sourceType: 'carry_over',
      confidence: carryConfidence,
      valid:      monthCheck.valid,
      routes:     prevItems,
      reason:     `이전 피드 유지 (${prevItems.length}구간) — ${monthCheck.reason}`,
      effectiveMonth: prevMonth,
      monthType:  monthCheck.valid ? (prevMonth === currentMonth ? 'CURRENT' : 'UNKNOWN') : 'FUTURE',
    });
  }

  // ── 4) forecast_model — override 없을 때만 의미 있음 ────────────
  const fRoutes = forecastToRoutes(forecastEntries || []);
  if (fRoutes.length > 0) {
    candidates.push({
      sourceType: 'forecast_model', confidence: CONFIDENCE.forecast_model,
      valid: true,
      routes: fRoutes.map(r => routesToItems([r], airline, 'KRW')[0]),
      reason: `forecast_feed 예측 (${fRoutes.length}구간)`,
    });
  }

  return candidates;
}

// ──────────────────────────────────────────
// 최종 선택 — 우선순위 엄격 적용
// ──────────────────────────────────────────

/**
 * 우선순위:
 *   override > manual_verified > official_notice > yr_yq_quote > carry_over > forecast_model
 *
 * override는 confidence/monthType과 무관하게 무조건 최우선.
 * valid=false 항목은 최후 수단에서만 사용.
 */
function selectFinal(candidates) {
  const ORDER = ['override', 'manual_verified', 'official_notice', 'yr_yq_quote', 'carry_over', 'forecast_model'];

  for (const type of ORDER) {
    const group = candidates.filter(c => c.sourceType === type && c.valid !== false);
    if (group.length === 0) continue;

    // override는 단순히 첫 번째 선택 (confidence=1.00으로 단일)
    if (type === 'override') return group[0];

    // 같은 sourceType 내 monthType 정렬
    group.sort((a, b) => {
      const pa = monthTypePriority(a.monthType || 'UNKNOWN');
      const pb = monthTypePriority(b.monthType || 'UNKNOWN');
      if (pa !== pb) return pa - pb;
      return b.confidence - a.confidence;
    });

    return group[0];
  }

  // valid=false도 없으면 첫 번째 후보라도 사용
  return candidates[0] || null;
}

// ──────────────────────────────────────────
// FinalSurcharge 조합
// ──────────────────────────────────────────

function resolveFinal(validatedResult, existingEntry, forecastEntries, overrideEntry) {
  const { airline, effective_month } = validatedResult;
  const { currentMonth } = getPipelineMonths();

  const candidates = buildCandidates(validatedResult, existingEntry, forecastEntries, overrideEntry);
  const selected   = selectFinal(candidates);

  if (!selected) {
    return {
      airline, month: effective_month || existingEntry?.currentPeriod || null,
      finalSource: 'none', finalConfidence: 0, finalRoutes: [],
      candidates, updated: false, reason: '선택 가능한 후보 없음',
      displayMonth: currentMonth,
    };
  }

  // override/official_notice/manual_verified → 갱신(updated=true)
  const updated = ['override', 'official_notice', 'manual_verified', 'yr_yq_quote'].includes(selected.sourceType);

  // displayMonth: override/official_notice → 탐지월, 그 외 → currentMonth
  const displayMonth = ['override', 'official_notice'].includes(selected.sourceType) && selected.effectiveMonth
    ? selected.effectiveMonth
    : currentMonth;

  return {
    airline,
    month:           selected.effectiveMonth || effective_month || existingEntry?.currentPeriod || null,
    finalSource:     selected.sourceType,
    finalConfidence: selected.confidence,
    finalRoutes:     selected.routes || [],
    candidates,
    updated,
    reason:          selected.reason || '',
    monthType:       selected.monthType || 'UNKNOWN',
    displayMonth,
  };
}

// ──────────────────────────────────────────
// 로그
// ──────────────────────────────────────────

function logFinal(final) {
  const { airline, finalSource, finalConfidence, finalRoutes, candidates, updated, reason, monthType, displayMonth } = final;
  const icon = updated ? '✅' : '🔵';
  const pct  = (finalConfidence * 100).toFixed(0);

  console.log(`\n[Candidate][${airline}] ${icon} final: ${finalSource} (conf=${pct}%) [${monthType}] displayMonth: ${displayMonth}`);
  console.log(`  선택 이유: ${reason}`);
  console.log(`  구간 수: ${finalRoutes.length}개`);
  console.log(`  후보 목록:`);
  for (const c of candidates) {
    const mark = c.valid !== false ? '  ○' : '  ×';
    const conf = (c.confidence * 100).toFixed(0);
    const mt   = c.monthType ? ` [${c.monthType}]` : '';
    console.log(`    ${mark} [${c.sourceType}] conf=${conf}%${mt} routes=${c.routes?.length || 0} — ${c.reason || ''}`);
  }
}

module.exports = {
  CONFIDENCE,
  OVERRIDE_SOURCES,
  SAVEABLE_SOURCES,
  buildCandidates,
  selectFinal,
  resolveFinal,
  logFinal,
  routesToItems,
  itemsToRoutes,
};
