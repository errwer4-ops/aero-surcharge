'use strict';

const https = require('https');
const OFFICIAL_HOSTS = Object.freeze({
  KE: ['koreanair.com'], OZ: ['flyasiana.com'], TW: ['twayair.com', 'trinityairways.com'], LJ: ['jinair.com'],
  '7C': ['jejuair.net'], BX: ['airbusan.com'], YP: ['airpremia.com'],
  RS: ['flyairseoul.com'], ZE: ['eastarjet.com'], CX: ['cathaypacific.com'],
});
const CURRENCIES = new Set(['KRW', 'USD', 'JPY', 'EUR', 'CNY', 'HKD', 'SGD', 'AUD', 'GBP', 'TWD', 'THB', 'VND', 'MYR', 'PHP', 'CAD', 'NZD', 'INR', 'IDR', 'AED', 'QAR', 'CHF']);
const MAX_AMOUNT = { KRW: 1000000, USD: 1000, JPY: 100000, EUR: 1000, CNY: 10000, HKD: 10000, SGD: 2000, AUD: 2000, GBP: 1000 };
const first = (...values) => values.find(v => v !== undefined && v !== null && v !== '') ?? null;
const object = value => value && typeof value === 'object' && !Array.isArray(value) ? value : {};

function normalizeMonth(value) {
  const match = typeof value === 'string' && value.match(/^(\d{4})[.-](0[1-9]|1[0-2])$/);
  return match ? `${match[1]}.${match[2]}` : null;
}

function normalizeRecord(item, parent = {}) {
  const it = object(item), p = object(parent), m = object(it.metadata), pm = object(p.metadata);
  const status = first(it.dataStatus, m.dataStatus, p.dataStatus, pm.dataStatus);
  const sourceType = first(it.sourceType, p.sourceType, p.collectorSource);
  const amount = Object.prototype.hasOwnProperty.call(it, 'amount') ? it.amount
    : Object.prototype.hasOwnProperty.call(it, 'current') ? it.current : first(m.oneWayAmount);
  return {
    schemaVersion: '1.0', airline: first(it.airline, p.airline, p.iataCode),
    origin: first(it.origin, it.departure, m.origin, p.origin, p.departure, pm.origin),
    destination: first(it.destination, m.destination, p.destination),
    departureCountry: first(it.departureCountry, m.departureCountry, p.departureCountry, pm.departureCountry),
    direction: first(it.direction, m.direction, p.direction, pm.direction,
      it.oneWay === true || p.oneWay === true ? 'one_way' : null),
    chargingBasis: first(it.distance_range, it.distanceRange, m.chargingBasis, it.route, it.route_type, it.label),
    currency: first(it.currency, m.currency, p.currency, pm.currency), oneWayAmount: amount === undefined ? null : amount,
    effectiveMonth: normalizeMonth(first(it.period, it.effective_month, m.effectiveMonth, p.effective_month, p.currentPeriod, pm.effectiveMonth)),
    publishedAt: first(it.publishedAt, it.noticePublishedAt, it.noticeDate, m.publishedAt, p.publishedAt, p.noticePublishedAt, p.noticeDate, pm.publishedAt),
    effectiveFrom: first(it.effectiveFrom, it.effective_start, m.effectiveFrom, p.effectiveFrom, p.effective_start, p.applicableFrom, p.ticketingStart, pm.effectiveFrom),
    effectiveTo: first(it.effectiveTo, it.effective_end, m.effectiveTo, p.effectiveTo, p.effective_end, p.applicableTo, p.ticketingEnd, pm.effectiveTo),
    collectedAt: first(it.collectedAt, m.collectedAt, p.collectedAt, p.fetchedAt, pm.collectedAt),
    sourceUrl: first(it.sourceUrl, m.sourceUrl, p.sourceUrl, p.source_url, p.officialSourceUrl, p.officialNoticeUrl, p.noticeUrl, p.sources?.noticeUrl, pm.sourceUrl),
    dataStatus: status || (sourceType === 'official_notice' || it.dataQuality === 'official_verified' ? 'confirmed' : /forecast|prediction/.test(sourceType || '') ? 'forecast' : 'unconfirmed'),
    validationStatus: first(it.validationStatus, m.validationStatus, p.validationStatus, pm.validationStatus, 'unverified'),
    validatedAt: first(it.validatedAt, m.validatedAt, p.validatedAt, pm.validatedAt),
    sourceVerificationStatus: first(it.sourceVerificationStatus, m.sourceVerificationStatus, p.sourceVerificationStatus, pm.sourceVerificationStatus, it.status, p.status),
    sourceVerifiedAt: first(it.sourceVerifiedAt, m.sourceVerifiedAt, p.sourceVerifiedAt, pm.sourceVerifiedAt, it.verifiedAt, p.verifiedAt),
  };
}

function routeIdentity(record) { return JSON.stringify([record.origin, record.destination, record.chargingBasis]); }

function validateSourceUrl(value, airline) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password || (url.port && url.port !== '443')) return ['출처 URL은 인증정보 없는 HTTPS 주소여야 함'];
    const hosts = OFFICIAL_HOSTS[airline];
    if (!hosts || !hosts.some(host => url.hostname === host || url.hostname.endsWith(`.${host}`))) return [`검증되지 않은 공식 출처 호스트 (${airline || '?'})`];
    return [];
  } catch { return ['공식 출처 URL 누락 또는 형식 오류']; }
}

function validDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2}))?$/.test(value)) return false;
  const day = value.slice(0, 10), parsed = new Date(`${day}T00:00:00Z`);
  return Number.isFinite(Date.parse(value)) && !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === day;
}

function validateRecord(record, { strict = false } = {}) {
  const errors = [], warnings = [], issue = message => (strict ? errors : warnings).push(message);
  if (!/^[A-Z0-9]{2}$/.test(record.airline || '')) errors.push('항공사 코드 형식 오류');
  if (!record.chargingBasis || typeof record.chargingBasis !== 'string') errors.push('거리 구간 또는 공식 부과 기준 누락');
  if (!CURRENCIES.has(record.currency)) errors.push('통화 누락 또는 지원하지 않는 통화');
  if (record.oneWayAmount === null) issue('공시 금액 없음 (null 유지; 0으로 변환하지 않음)');
  else if (typeof record.oneWayAmount !== 'number' || !Number.isFinite(record.oneWayAmount) || record.oneWayAmount < 0) errors.push('금액 비수치/음수');
  if (MAX_AMOUNT[record.currency] && record.oneWayAmount > MAX_AMOUNT[record.currency]) errors.push('금액 상한 초과: 공식 원문 수동 검토 필요');
  if (!record.effectiveMonth) issue('적용월 누락 또는 기존 비정규 월 표기');
  if (!['confirmed', 'forecast', 'unconfirmed'].includes(record.dataStatus)) errors.push('데이터 상태 형식 오류');
  if (strict && record.dataStatus !== 'confirmed') errors.push('전망/미확인 값을 공식 피드에 게시할 수 없음');
  if (record.direction && record.direction !== 'one_way') errors.push('편도 이외 또는 불명확한 방향의 금액 — 원문 검토 필요');
  if (record.departureCountry && !/^[A-Z]{2}$/.test(record.departureCountry)) errors.push('출발국 코드 형식 오류');
  for (const field of ['publishedAt', 'effectiveFrom', 'effectiveTo', 'collectedAt', 'validatedAt', 'sourceVerifiedAt']) {
    if (record[field] !== null && !validDate(record[field])) errors.push(`${field} 날짜 형식 오류`);
  }
  if (!record.collectedAt) issue('수집 시각 없음');
  if (!record.publishedAt) warnings.push('공시 발표일 미제공 (null 유지)');
  if (!record.effectiveFrom || !record.effectiveTo) warnings.push('적용 시작/종료일 미제공 (월에서 날짜 추정하지 않음)');
  for (const field of ['effectiveFrom', 'effectiveTo']) {
    if (record[field] && record.effectiveMonth && record[field].slice(0, 7).replace('-', '.') !== record.effectiveMonth) errors.push(`${field}와 적용월 불일치`);
  }
  if (record.effectiveFrom && record.effectiveTo && Date.parse(record.effectiveFrom) > Date.parse(record.effectiveTo)) errors.push('적용 시작일이 종료일 이후');
  for (const message of validateSourceUrl(record.sourceUrl, record.airline)) issue(message);
  return { errors, warnings };
}

function validateFeed(feed, { strict = false } = {}) {
  const errors = [], warnings = [], records = [];
  if (!feed || !Array.isArray(feed.airlines) || !feed.meta || typeof feed.meta !== 'object') return { passed: false, errors: ['피드 스키마 오류: meta 객체와 airlines 배열 필수'], warnings, records };
  const airlines = new Set(), seen = new Set();
  for (const airline of feed.airlines) {
    if (!airline || !/^[A-Z0-9]{2}$/.test(airline.iataCode || '')) { errors.push('피드 항공사 코드 오류'); continue; }
    if (airlines.has(airline.iataCode)) errors.push(`${airline.iataCode}: 항공사 중복`);
    airlines.add(airline.iataCode);
    if (airline.items !== undefined && !Array.isArray(airline.items)) { errors.push(`${airline.iataCode}: items 배열 아님`); continue; }
    for (const item of airline.items || []) {
      if (!item || typeof item !== 'object' || Array.isArray(item)) { errors.push(`${airline.iataCode}: 구간 항목은 객체여야 함`); continue; }
      const record = normalizeRecord(item, airline), check = validateRecord(record, { strict });
      if (Object.prototype.hasOwnProperty.call(item, 'amount') && Object.prototype.hasOwnProperty.call(item, 'current') && item.amount !== item.current) check.errors.push('amount/current 금액 불일치');
      const key = `${record.airline}|${record.effectiveMonth}|${routeIdentity(record)}|${record.currency}`;
      if (seen.has(key)) check.errors.push('동일 항공사·월·구간·통화 중복');
      seen.add(key);
      if (item.period && normalizeMonth(item.period) !== normalizeMonth(airline.currentPeriod)) check.errors.push('항목 적용월과 항공사 적용월 불일치');
      if (record.dataStatus === 'forecast') check.errors.push('공식 피드에 전망값 혼합');
      errors.push(...check.errors.map(message => `${airline.iataCode}/${record.chargingBasis}: ${message}`));
      warnings.push(...check.warnings.map(message => `${airline.iataCode}/${record.chargingBasis}: ${message}`)); records.push(record);
    }
  }
  return { passed: errors.length === 0, errors, warnings, records };
}

// Optional live reachability check; redirects must stay on official hosts.
function checkSourceLinks(records, { timeoutMs = 8000 } = {}) {
  const links = [...new Map(records.map(record => [`${record.airline}|${record.sourceUrl}`, record])).values()];
  function check(record, value = record.sourceUrl, redirects = 0) {
    const invalid = validateSourceUrl(value, record.airline);
    if (invalid.length) return Promise.resolve({ airline: record.airline, url: value, passed: false, error: invalid.join('; ') });
    return new Promise(resolve => {
      const req = https.get(value, { headers: { 'User-Agent': 'AeroSurcharge-SourceCheck/1.0' } }, res => {
        res.resume();
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirects < 3) {
          try { resolve(check(record, new URL(res.headers.location, value).href, redirects + 1)); }
          catch { resolve({ airline: record.airline, url: value, passed: false, error: '공식 출처 redirect 주소 형식 오류' }); }
          return;
        }
        resolve({ airline: record.airline, url: value, passed: res.statusCode >= 200 && res.statusCode < 300, status: res.statusCode });
      });
      const deadline = setTimeout(() => req.destroy(new Error('공식 출처 연결 시간 초과')), timeoutMs);
      req.on('close', () => clearTimeout(deadline));
      req.on('error', err => resolve({ airline: record.airline, url: value, passed: false, error: err.message }));
    });
  }
  return Promise.all(links.map(record => check(record)));
}

module.exports = { normalizeRecord, normalizeMonth, validateRecord, validateFeed, validateSourceUrl, checkSourceLinks, routeIdentity, validDate };
