#!/usr/bin/env node
'use strict';

// Read-only checks for the real browser data sources, in addition to pipeline JSON.
// Execute only the isolated notice declaration block, never DOM or network code.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { execFileSync } = require('node:child_process');
const { normalizeRecord, normalizeMonth, validateRecord, validateSourceUrl } = require('../lib/validation');
const { validDate } = require('../lib/validation/records');
const sourceTrust = require('../public/source-provenance');
const { reconcileRecord } = require('../lib/validation/provenance');
const root = path.resolve(__dirname, '..');

function loadNotices(source) {
  const start = source.indexOf('window.NOVEMBER_2026_OFFICIAL_NOTICES=');
  const end = source.indexOf('window.NOVEMBER_2026_NOTICE_COPY=', start);
  if (start < 0 || end <= start) throw new Error('공식 공시 선언 경계 변경: 데이터 검증 어댑터 검토 필요');
  const context = { window: {} };
  vm.runInNewContext(source.slice(start, end), context, { timeout: 1000 });
  const notices = context.window.NOVEMBER_2026_OFFICIAL_NOTICES;
  if (!Array.isArray(notices) || !notices.length) throw new Error('공식 공시 배열이 비어 있음');
  return notices;
}

function loadRouteGroupNotices(source) {
  const context = { window: {} };
  vm.runInNewContext(source, context, { timeout: 1000 });
  const groups = context.window.OCTOBER_2026_ROUTE_GROUP_NOTICES;
  if (!groups || typeof groups !== 'object' || Array.isArray(groups) || !Object.keys(groups).length) throw new Error('10월 노선군 공식 공시 선언 없음 또는 스키마 변경');
  return groups;
}

function validateRouteGroupNotices(groups, novemberNotices) {
  const errors = [], warnings = [];
  let amountCount = 0, comparedGroups = 0;
  if (!groups || typeof groups !== 'object' || Array.isArray(groups) || !Object.keys(groups).length) return { passed: false, errors: ['10월 노선군 공시 객체 필요'], warnings, airlineCount: 0, amountCount, comparedGroups };
  for (const [code, notice] of Object.entries(groups)) {
    if (!/^[A-Z0-9]{2}$/.test(code) || !notice || typeof notice !== 'object' || notice.code !== code) { errors.push(`${code}: 10월 노선군 항공사 코드/객체 오류`); continue; }
    if (sourceTrust.summarize([notice], '2026.10').verifiedCount !== 1) errors.push(`${code}/2026.10: 검토된 원문 금액/부과 기준과 불일치 — 확정 상태 게시 불가`);
    errors.push(...validateSourceUrl(notice.url, code).map(message => `${code}/2026.10: ${message}`));
    if (notice.direction !== 'one_way' || notice.departureCountry !== 'KR') errors.push(`${code}/2026.10: 편도/출발국 기준 불일치`);
    if (!/^official_notice_verified(?:_against_web(?:_and_saved_pdf)?|_from_saved_pdf|_from_web_saved_pdf_blank)$/.test(notice.status || '')
      || (notice.dataStatus != null && notice.dataStatus !== 'confirmed')) errors.push(`${code}/2026.10: 공식 원문 확인 상태 없음`);
    if (notice.ticketingStart !== '2026-10-01' || notice.ticketingEnd !== '2026-10-31') errors.push(`${code}: 10월 발권 적용 기간 불일치`);
    if (!notice.verifiedAt || !validDate(notice.verifiedAt)) errors.push(`${code}/2026.10: 원문 검증 시각 누락/형식 오류`);
    for (const field of ['noticeDate', 'noticePublishedAt', 'collectedAt']) if (notice[field] != null && !validDate(notice[field])) errors.push(`${code}/2026.10: ${field} 날짜 오류`);
    if (!notice.noticeDate && !notice.noticePublishedAt) warnings.push(`${code}/2026.10: 공시 발표일 미제공 (확인일로 대체하지 않음)`);
    if (!notice.collectedAt) warnings.push(`${code}/2026.10: 수집 시각 미제공 (원문 검증 시각과 구분)`);
    if (!Array.isArray(notice.bands) || !notice.bands.length || notice.bands.some(band => typeof band !== 'string' || !band.trim())) { errors.push(`${code}/2026.10: 유효한 부과 기준 배열 필요`); continue; }
    if (new Set(notice.bands).size !== notice.bands.length) errors.push(`${code}/2026.10: 부과 기준 중복`);
    if (!Array.isArray(notice.october) || notice.october.length !== notice.bands.length) { errors.push(`${code}/2026.10: 금액/구간 수 불일치`); continue; }
    const candidates = (Array.isArray(novemberNotices) ? novemberNotices : []).filter(item => item.code === code);
    if (candidates.length !== 1) errors.push(`${code}: 대조할 11월 공시 항공사가 없거나 중복됨`);
    const next = candidates.length === 1 ? candidates[0] : null;
    if (next && (next.currency !== notice.currency || next.direction !== notice.direction || next.departureCountry !== notice.departureCountry)) errors.push(`${code}: 10·11월 공시의 통화/방향/출발국 불일치`);
    for (let index = 0; index < notice.bands.length; index++) {
      const band = notice.bands[index], amount = notice.october[index];
      if (amount !== null && (typeof amount !== 'number' || !Number.isFinite(amount))) errors.push(`${code}/2026.10/${band}: 명시적인 숫자 또는 null 금액 필요`);
      const record = normalizeRecord({ amount, label: band }, { ...notice, airline: code, sourceUrl: notice.url,
        effective_month: '2026.10', dataStatus: 'confirmed' });
      errors.push(...validateRecord(record).errors.map(message => `${code}/2026.10/${band}: ${message}`));
      if (amount === 0) errors.push(`${code}/2026.10/${band}: 신규 0원 값 원문 검토 필요`);
      if (amount != null) amountCount++; else warnings.push(`${code}/2026.10/${band}: 공시 금액 없음 — null 유지`);
      // Match the published charging group, not the position of a group array.
      const nextIndex = Array.isArray(next?.bands) ? next.bands.indexOf(band) : -1;
      if (nextIndex < 0) { warnings.push(`${code}/2026.10/${band}: 동일한 11월 부과 구간 없음 — 월간 비교 불가`); continue; }
      comparedGroups++;
      if (!Array.isArray(next.october) || next.october[nextIndex] !== amount) errors.push(`${code}/${band}: 10월 원문 선언과 11월 화면의 10월 비교액 불일치`);
    }
  }
  return { passed: !errors.length, errors, warnings, airlineCount: Object.keys(groups).length, amountCount, comparedGroups };
}

function validateNotices(notices, previous = []) {
  const errors = [], warnings = [], seen = new Set();
  let amountCount = 0;
  for (const notice of notices) {
    const code = notice?.code;
    if (!/^[A-Z0-9]{2}$/.test(code || '')) { errors.push('공시 항공사 코드 오류'); continue; }
    if (seen.has(code)) errors.push(`${code}: 공시 중복`);
    seen.add(code);
    if (sourceTrust.summarize([notice], '2026.11').verifiedCount !== 1) errors.push(`${code}/2026.11: 검토된 원문 금액/부과 기준과 불일치 — 확정 상태 게시 불가`);
    const reviewed = sourceTrust.getNotice(code, '2026.11');
    if (reviewed && !reviewed.publishedAt && notice.noticeDate) warnings.push(`${code}: 기존 발표일 ${notice.noticeDate}는 이번 원문에서 재확인되지 않음 — 검토 메타데이터 발표일 null 유지`);
    if (reviewed?.publishedAt && notice.noticeDate && reviewed.publishedAt.slice(0, 10) !== notice.noticeDate) errors.push(`${code}: 검토 원문과 공시 발표일 불일치`);
    if (reviewed && (!reviewed.effectiveFrom || !reviewed.effectiveTo)) warnings.push(`${code}: 적용월 원문 확인; 명시적 시작/종료일 줄은 미확인 — 날짜를 생성하지 않음`);
    errors.push(...validateSourceUrl(notice.url, code).map(message => `${code}: ${message}`));
    if (notice.direction !== 'one_way' || notice.departureCountry !== 'KR') errors.push(`${code}: 편도/출발국 기준 불일치`);
    if (!/^official_notice_verified/.test(notice.status || '')) errors.push(`${code}: 공식 확인 상태 없는 공시`);
    if (notice.ticketingStart !== '2026-11-01' || notice.ticketingEnd !== '2026-11-30') errors.push(`${code}: 11월 발권 적용 기간 불일치`);
    for (const key of ['noticeDate', 'noticePublishedAt', 'verifiedAt']) if (notice[key] != null && !validDate(notice[key])) errors.push(`${code}: ${key} 날짜 오류`);
    if (!notice.noticeDate) warnings.push(`${code}: 공시 발표일 미제공 (확인일로 대체하지 않음)`);
    if (!Array.isArray(notice.bands) || !notice.bands.length) { errors.push(`${code}: 부과 기준 배열 없음`); continue; }
    if (new Set(notice.bands).size !== notice.bands.length) errors.push(`${code}: 부과 기준 중복`);
    for (const monthKey of ['october', 'november']) {
      if (!Array.isArray(notice[monthKey]) || notice[monthKey].length !== notice.bands.length) { errors.push(`${code}: ${monthKey} 금액/구간 수 불일치`); continue; }
      notice[monthKey].forEach((amount, index) => {
        const label = `${code}/${monthKey}/${notice.bands[index]}`;
        if (amount === null) { warnings.push(`${label}: 공시 금액 없음 — null 유지`); return; }
        amountCount++;
        const record = normalizeRecord({ amount, label: notice.bands[index] }, {
          airline: code, currency: notice.currency, effective_month: monthKey === 'november' ? '2026.11' : '2026.10',
          sourceUrl: notice.url, dataStatus: 'confirmed', direction: notice.direction,
        });
        errors.push(...validateRecord(record).errors.map(message => `${label}: ${message}`));
        const old = previous.find(item => item.code === code), oldIndex = old?.bands?.indexOf(notice.bands[index]) ?? -1;
        const oldAmount = oldIndex >= 0 ? old[monthKey]?.[oldIndex] : undefined;
        if (amount === 0 && oldAmount !== 0) errors.push(`${label}: 신규 0원 값은 원문 검토 필요`);
        if (old && old.currency === notice.currency && Number.isFinite(oldAmount) && oldAmount !== amount && (oldAmount === 0 || Math.abs((amount - oldAmount) / oldAmount) >= 0.5)) errors.push(`${label}: 50% 이상 수정 — 원문 검토 필요`);
      });
    }
    if (notice.routesByGroup) {
      if (!Array.isArray(notice.routesByGroup) || notice.routesByGroup.length !== notice.bands.length) errors.push(`${code}: 노선군 매핑 수 불일치`);
      else {
        const routes = new Set();
        for (const group of notice.routesByGroup) {
          if (!Array.isArray(group) || !group.length) { errors.push(`${code}: 빈 노선군`); continue; }
          for (const route of group) {
            if (!/^[A-Z]{3}-[A-Z]{3}$/.test(route) || routes.has(route)) errors.push(`${code}: 노선군 중복/형식 오류 ${route}`);
            routes.add(route);
          }
        }
      }
    }
  }
  for (const old of previous) if (!seen.has(old.code)) errors.push(`${old.code}: 공시 삭제 검토 필요`);
  warnings.push('10월 비교 수치의 원문 URL은 11월 공시 URL로 검증했다고 간주하지 않음; 별도 10월 원문 대조 필요');
  return { passed: !errors.length, errors, warnings, airlineCount: seen.size, amountCount, sourceReconciliation: sourceTrust.summarize(notices, '2026.11') };
}

function validateManualOverrides(data, previous = null) {
  const errors = [], warnings = [];
  let monthCount = 0, amountCount = 0;
  if (!data || typeof data !== 'object' || Array.isArray(data)) return { passed: false, errors: ['수동 공시 스키마 오류'], warnings, monthCount, amountCount };
  for (const [code, months] of Object.entries(data)) {
    if (!/^[A-Z0-9]{2}$/.test(code)) continue;
    for (const [month, block] of Object.entries(months || {})) {
      if (month.startsWith('_')) continue;
      if (!normalizeMonth(month) || !block || typeof block !== 'object') { errors.push(`${code}/${month}: 적용월/공시 형식 오류`); continue; }
      monthCount++;
      const items = block.items || block.group_tiers;
      if (!Array.isArray(items) || !items.length) { errors.push(`${code}/${month}: 부과 구간 없음`); continue; }
      const source = block.officialNoticeUrl || block.sourceUrl || months._meta?.url || null;
      errors.push(...validateSourceUrl(source, code).map(message => `${code}/${month}: ${message}`));
      const seen = new Set();
      const before = previous?.[code]?.[month];
      for (const item of items) {
        const basis = item.distanceRange || (item.group != null ? `group:${item.group}` : item.route || item.label);
        const record = normalizeRecord({ ...item, distanceRange: basis }, { ...block, airline: code,
          effective_month: month, sourceUrl: source });
        const check = validateRecord(record);
        if (previous && JSON.stringify(before) !== JSON.stringify(block) && reconcileRecord(record).status !== 'verified') check.errors.push('변경된 수동 데이터의 공식 원문 금액/부과 기준 대조 필요');
        if (record.dataStatus === 'forecast') check.errors.push('공식 데이터에 전망값 혼합');
        else if (record.dataStatus !== 'confirmed') {
          (previous && JSON.stringify(before) !== JSON.stringify(block) ? check.errors : check.warnings).push('기존 수동 데이터의 공식 확인 상태 미제공');
        }
        if (item.period && normalizeMonth(item.period) !== normalizeMonth(month)) check.errors.push('항목 적용월 불일치');
        if (seen.has(`${basis}|${record.currency}`)) check.errors.push('중복 구간');
        seen.add(`${basis}|${record.currency}`);
        const oldItems = before?.items || before?.group_tiers || [];
        const old = oldItems.find(row => (row.distanceRange || (row.group != null ? `group:${row.group}` : row.route || row.label)) === basis);
        if (record.oneWayAmount === 0 && old?.amount !== 0) check.errors.push('신규 0원 값은 원문 검토 필요');
        if (previous && old && (old.currency || before.currency) === record.currency && Number.isFinite(old.amount) && old.amount !== record.oneWayAmount && record.oneWayAmount != null
          && (old.amount === 0 || Math.abs((record.oneWayAmount - old.amount) / old.amount) >= 0.5)) check.errors.push('50% 이상 수정 — 원문 검토 필요');
        errors.push(...check.errors.map(message => `${code}/${month}/${basis}: ${message}`));
        warnings.push(...check.warnings.map(message => `${code}/${month}/${basis}: ${message}`));
        if (record.oneWayAmount != null) amountCount++;
      }
    }
  }
  if (previous) for (const [code, months] of Object.entries(previous)) {
    if (!/^[A-Z0-9]{2}$/.test(code)) continue;
    for (const month of Object.keys(months)) if (normalizeMonth(month) && !data[code]?.[month]) errors.push(`${code}/${month}: 과거 공시 삭제 검토 필요`);
  }
  return { passed: !errors.length, errors, warnings, monthCount, amountCount };
}

function main(args = process.argv.slice(2)) {
  const baseAt = args.indexOf('--base-ref'), baseRef = baseAt >= 0 ? args[baseAt + 1] : null;
  if (baseAt >= 0 && (!baseRef || !/^[a-zA-Z0-9_./~-]+$/.test(baseRef))) throw new Error('잘못된 git 기준 ref');
  const read = file => fs.readFileSync(path.join(root, file), 'utf8');
  const old = file => baseRef ? execFileSync('git', ['show', `${baseRef}:${file}`], { cwd: root, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 }) : null;
  const novemberNotices = loadNotices(read('public/_shared.js'));
  const notices = validateNotices(novemberNotices, baseRef ? loadNotices(old('public/_shared.js')) : []);
  const octoberGroups = validateRouteGroupNotices(loadRouteGroupNotices(read('public/notice-group-source.js')), novemberNotices);
  const manual = validateManualOverrides(JSON.parse(read('public/data/manual_overrides.json')), baseRef ? JSON.parse(old('public/data/manual_overrides.json')) : null);
  const result = { passed: notices.passed && octoberGroups.passed && manual.passed, notices, octoberGroups, manual };
  console.log(JSON.stringify({ passed: result.passed,
    notices: { ...notices, warnings: notices.warnings },
    octoberGroups,
    manual: { ...manual, warnings: undefined, warningCount: manual.warnings.length },
    limitation: '11월 공유 공시/명시적 10월 노선군은 검토된 원문 스냅샷과 대조. 과거 수동 JSON은 미변경 시 보존하며 구조 경고를 제공; 모든 역사 데이터의 원문 확인 완료를 의미하지 않음.' }, null, 2));
  return result;
}
if (require.main === module) { try { process.exitCode = main().passed ? 0 : 1; } catch (error) { console.error(error.message); process.exitCode = 1; } }
module.exports = { loadNotices, loadRouteGroupNotices, validateNotices, validateRouteGroupNotices, validateManualOverrides, main };
