'use strict';

const { getPipelineMonths } = require('../month');
const { normalizeRecord, normalizeMonth, validateRecord, validateSourceUrl, validateFeed, checkSourceLinks, routeIdentity } = require('./records');
const SAVEABLE = new Set(['live', 'override-url', 'override-text', 'override-html', 'ai-search-auto']);
const MIN_ROUTES = { KE: 3, OZ: 6 };

function detectSpike(airline, record, previousFeed) {
  const previousAirline = previousFeed?.airlines?.find(a => a.iataCode === airline);
  const prior = previousAirline?.items?.map(item => normalizeRecord(item, previousAirline))
    .find(item => item.chargingBasis === record.chargingBasis && item.currency === record.currency
      && (!item.origin || !record.origin || item.origin === record.origin)
      && (!item.destination || !record.destination || item.destination === record.destination));
  if (!prior || !Number.isFinite(prior.oneWayAmount) || prior.oneWayAmount === record.oneWayAmount) return null;
  const ratio = prior.oneWayAmount === 0 ? Infinity : Math.abs((record.oneWayAmount - prior.oneWayAmount) / prior.oneWayAmount);
  return ratio >= 0.5 ? `이상변동 검토 필요: ${routeIdentity(record)} ${prior.oneWayAmount} → ${record.oneWayAmount} ${record.currency}` : null;
}

function validateOne(parseResult, previousFeed = null, source = 'unknown', collector = {}) {
  const pr = parseResult && typeof parseResult === 'object' ? parseResult : {};
  const errors = [], warnings = [], validRoutes = [], rejectedRoutes = [], seen = new Set();
  const now = new Date().toISOString();
  let spikeDetected = false;
  const month = normalizeMonth(pr.effective_month);
  const previous = previousFeed?.airlines?.find(a => a.iataCode === pr.airline);
  if (!/^[A-Z0-9]{2}$/.test(pr.airline || '')) errors.push('airline 코드 누락 또는 형식 오류');
  if (!month) errors.push('effective_month 누락 또는 형식 오류 (YYYY.MM)');
  if (!Array.isArray(pr.routes) || !pr.routes.length) errors.push('routes 비어 있음 또는 배열 아님');
  if (!SAVEABLE.has(source)) errors.push(`수집 실패/미확인 출처 (${source}) — 기존 데이터 보존`);
  if (pr.usedMock !== false) errors.push('mock 또는 파서 검증 상태 미확인 — 게시 금지');
  if (collector.error) errors.push(`수집 오류: ${collector.error}`);
  if (collector.code && collector.code !== pr.airline) errors.push('수집 항공사와 파싱 항공사 불일치');
  if (collector.detectedMonth && normalizeMonth(collector.detectedMonth) !== month) errors.push('수집월과 적용월 불일치');
  if (month && normalizeMonth(previous?.currentPeriod) && month < normalizeMonth(previous.currentPeriod)) errors.push('이전 적용월로 되돌리는 갱신 차단');
  if (month && month > getPipelineMonths().nextMonth) errors.push('다음 달 이후 공시: 수동 검토 필요');
  const sourceUrl = pr.source_url || collector.sourceUrl || null;
  errors.push(...validateSourceUrl(sourceUrl, pr.airline));
  if (collector.sourceUrl && sourceUrl !== collector.sourceUrl) errors.push('파서 출처와 수집 출처 URL 불일치');
  const context = { ...pr, sourceUrl, collectedAt: collector.fetchedAt || null, dataStatus: 'confirmed' };
  for (const route of (Array.isArray(pr.routes) ? pr.routes : [])) {
    const record = normalizeRecord(route, context), check = validateRecord(record, { strict: true });
    if (route?.dataStatus && route.dataStatus !== 'confirmed') check.errors.push('전망/미확인 값을 공식 피드에 혼합할 수 없음');
    if (route?.status && !['confirmed', 'official', 'official_verified'].includes(route.status)) check.errors.push('공식 상태가 아닌 항목');
    if (pr.dataStatus && pr.dataStatus !== 'confirmed') check.errors.push('전망/미확인 파싱 결과');
    if (pr.status && !['confirmed', 'official', 'official_verified'].includes(pr.status)) check.errors.push('전망/미확인 파싱 결과');
    if (/forecast|prediction/.test(`${pr.sourceType || ''} ${route?.sourceType || ''}`) || route?.predictedMin != null || route?.predictedMax != null) check.errors.push('전망 필드를 공식 공시에 혼합할 수 없음');
    if (record.currency && pr.currency && record.currency !== pr.currency) check.errors.push('항목 통화와 공시 통화 불일치');
    if (record.effectiveMonth !== month) check.errors.push('항목 적용월과 공시 적용월 불일치');
    const identity = `${record.effectiveMonth}|${routeIdentity(record)}|${record.currency}`;
    if (seen.has(identity)) check.errors.push('동일 항공사·월·구간·통화 중복');
    seen.add(identity);
    const spike = detectSpike(pr.airline, record, previousFeed);
    if (spike) { spikeDetected = true; check.errors.push(spike); }
    // A zero may be official, but it must be reviewed instead of overwriting on failure.
    if (record.oneWayAmount === 0) check.errors.push('0원 공시: 수집 실패와 구분하기 위한 수동 검토 필요');
    const validation = { passed: check.errors.length === 0, errors: check.errors, warnings: check.warnings };
    // Technical validation cannot attest that the source body actually matches.
    const normalized = { ...route, currency: record.currency, metadata: { ...record,
      dataStatus: 'unconfirmed', sourceVerificationStatus: 'unresolved', sourceVerifiedAt: null }, _validation: validation };
    if (validation.passed) validRoutes.push(normalized); else rejectedRoutes.push(normalized);
    warnings.push(...check.warnings);
  }
  if (validRoutes.length < (MIN_ROUTES[pr.airline] || 1)) errors.push(`${pr.airline || '?'} 최소 구간 수 미달`);
  const previousCount = previous?.items?.filter(item => item.current != null).length || 0;
  if (validRoutes.length && validRoutes.length < previousCount) errors.push('기존 공시 대비 구간 수 감소 — 누락 여부 검토 필요');
  if (rejectedRoutes.length) errors.push(`거부된 구간 ${rejectedRoutes.length}개 — 공시 전체 검토 필요`);
  const blockUpdate = errors.length > 0;
  return { ...pr, source_url: sourceUrl, effective_month: month, validRoutes, rejectedRoutes,
    hasValidData: !blockUpdate && validRoutes.length > 0, blockUpdate,
    spikeDetected, allWarnings: [...warnings, ...errors], validationErrors: errors,
    collectorSource: source, collectorMonthType: collector.monthType || null,
    collectedAt: collector.fetchedAt || null, lowConfidence: blockUpdate,
    validatedAt: now, validationStatus: blockUpdate ? 'rejected' : 'passed' };
}

function validateAll(parsed, previousFeed = null, collected = []) {
  const byCode = new Map(collected.map(c => [c.code, c]));
  const results = parsed.map(pr => {
    const collector = byCode.get(pr?.airline) || {};
    return validateOne(pr, previousFeed, collector.source || 'unknown', collector);
  });
  const seen = new Set();
  for (const result of results) {
    if (seen.has(result.airline)) {
      for (const duplicate of results.filter(r => r.airline === result.airline)) {
        duplicate.blockUpdate = true; duplicate.hasValidData = false; duplicate.validationStatus = 'rejected';
        duplicate.validationErrors.push('동일 항공사 파싱 결과 중복');
      }
    }
    seen.add(result.airline);
  }
  return results;
}

function printValidationSummary(results) {
  for (const result of results) {
    console.log(`[Validation] ${result.airline}: ${result.hasValidData ? (result.sourceVerificationStatus === 'source_reconciled' ? 'PASS' : 'TECHNICAL_PASS / SOURCE_HOLD') : 'HOLD'} (${result.validRoutes.length}구간)`);
    result.allWarnings.forEach(message => console.log(`  ${message}`));
    result.rejectedRoutes.forEach(route => console.log(`  ${route.route_type || '?'}: ${route._validation.errors.join('; ')}`));
  }
}

module.exports = { validateOne, validateAll, printValidationSummary, detectSpike,
  normalizeRecord, normalizeMonth, validateRecord, validateSourceUrl, validateFeed, checkSourceLinks };
