/**
 * Validation Layer — v2
 * Parser의 routes[] 배열을 route별로 개별 검증.
 * 검증 실패 route만 제거 (통과 route는 유지).
 * 이전 데이터와 동일 route_type 기준으로 이상변동 감지.
 *
 * v2 변경:
 *   - item 단위 → route 단위 검증
 *   - 동일 distance_range 기준 spike 비교
 *   - 이상 route만 플래그 (전체 거부 아님)
 */

'use strict';

const CONFIG = {
  SPIKE_THRESHOLD_PCT: 0.50,            // 50% 이상 변화 → 이상 플래그
  VALID_CURRENCIES:    ['KRW','USD','JPY','EUR','CNY','HKD','SGD','AUD','GBP'],
  AMOUNT_RANGE: {
    KRW: { min: 1000,  max: 1000000 },
    USD: { min: 1,     max: 1000    },
    JPY: { min: 100,   max: 100000  },
  },
};

// ──────────────────────────────────────────
// 단일 route 검증
// ──────────────────────────────────────────

/**
 * route 하나를 검증.
 * @param {object} route - parser의 routes[] 항목
 * @param {string} currency - 항공사 통화 (parser 최상위)
 * @returns {{ errors:string[], warnings:string[] }}
 */
function validateRoute(route, currency) {
  const errors   = [];
  const warnings = [];
  const curr     = route.currency || currency || null;

  // 1. 필수값: amount
  if (route.amount === null || route.amount === undefined) {
    errors.push('amount 없음');
    return { errors, warnings };   // 이후 검증 불필요
  }

  // 2. 숫자 타입
  if (typeof route.amount !== 'number' || isNaN(route.amount) || route.amount <= 0) {
    errors.push(`amount 형식 오류: ${route.amount}`);
    return { errors, warnings };
  }

  // 3. 통화 유효성
  if (!curr) {
    warnings.push('currency 없음 (기본값 KRW 가정)');
  } else if (!CONFIG.VALID_CURRENCIES.includes(curr.toUpperCase())) {
    errors.push(`알 수 없는 통화: ${curr}`);
  }

  // 4. 금액 범위
  const range = CONFIG.AMOUNT_RANGE[curr] || CONFIG.AMOUNT_RANGE.KRW;
  if (route.amount < range.min || route.amount > range.max) {
    warnings.push(`금액이 기대 범위 밖: ${route.amount} ${curr} (범위: ${range.min}~${range.max})`);
  }

  // 5. route_type 없으면 경고 (오류 아님)
  if (!route.route_type) {
    warnings.push('route_type 없음');
  }

  return { errors, warnings };
}

// ──────────────────────────────────────────
// 이전 데이터 대비 spike 감지 (route 단위)
// ──────────────────────────────────────────

/**
 * 이전 official_surcharge_feed의 동일 항공사 데이터에서
 * 동일 distance_range 기준으로 이전 금액을 찾아 비교.
 *
 * @param {string} airlineCode
 * @param {object} route        - 신규 route
 * @param {object|null} prevFeed - 기존 피드 전체
 * @returns {{ spikeDetected:boolean, spikePct:number|null, warning:string|null }}
 */
function detectSpike(airlineCode, route, prevFeed) {
  if (!prevFeed || route.amount == null) {
    return { spikeDetected: false, spikePct: null, warning: null };
  }

  const prevAirline = (prevFeed.airlines || []).find(a => a.iataCode === airlineCode);
  if (!prevAirline || !Array.isArray(prevAirline.items)) {
    return { spikeDetected: false, spikePct: null, warning: null };
  }

  // 동일 distance_range 키를 가진 이전 항목 탐색
  const matchKey = route.distance_range;
  const prevItem = matchKey
    ? prevAirline.items.find(it => it.distanceRange === matchKey)
    : null;

  if (!prevItem || typeof prevItem.current !== 'number') {
    return { spikeDetected: false, spikePct: null, warning: null };
  }

  const changePct = Math.abs((route.amount - prevItem.current) / prevItem.current);
  if (changePct >= CONFIG.SPIKE_THRESHOLD_PCT) {
    return {
      spikeDetected: true,
      spikePct: changePct,
      warning: `이상변동: ${matchKey} 구간 ${prevItem.current}→${route.amount} (${(changePct*100).toFixed(1)}%)`,
    };
  }
  return { spikeDetected: false, spikePct: changePct, warning: null };
}

// ──────────────────────────────────────────
// ParseResult 전체 검증 (public API)
// ──────────────────────────────────────────

// ──────────────────────────────────────────
// 항공사별 최소 구간 수 기준
// ──────────────────────────────────────────
const MIN_ROUTES = {
  KE: 3,   // 실제 9구간, 최소 3 이상이어야 유효
  OZ: 6,   // 실제 8~9구간, 6 미만이면 잘못 파싱된 것
  TW: 1,   // 3구간, 최소 1
  LJ: 1,
  '7C': 1,
  BX: 1,
  YP: 1,
};

/**
 * @typedef {object} ValidatedResult
 * @property {string}   airline
 * @property {string}   source_url
 * @property {string|null} effective_month
 * @property {string|null} currency
 * @property {object[]} validRoutes
 * @property {object[]} rejectedRoutes
 * @property {boolean}  hasValidData
 * @property {boolean}  spikeDetected
 * @property {string[]} allWarnings
 * @property {string|null} summary
 * @property {string|null} parse_warning
 * @property {'live'|'fallback'|'live_html_no_notice'} collectorSource
 * @property {boolean}  lowConfidence   - fallback 기반이면 true
 * @property {boolean}  blockUpdate     - OZ fallback → 저장 금지
 * @property {string}   validatedAt
 */
function validateOne(parseResult, prevFeed = null, collectorSource = 'live') {
  const { airline, source_url, effective_month, currency, routes, summary, parse_warning } = parseResult;

  const validRoutes    = [];
  const rejectedRoutes = [];
  let   spikeDetected  = false;
  const allWarnings    = [];

  for (const route of (routes || [])) {
    const { errors, warnings } = validateRoute(route, currency);
    const spike = detectSpike(airline, route, prevFeed);
    if (spike.warning)        warnings.push(spike.warning);
    if (spike.spikeDetected)  spikeDetected = true;

    if (errors.length > 0) {
      rejectedRoutes.push({ ...route, _validation: { passed: false, errors, warnings } });
    } else {
      validRoutes.push({ ...route, _validation: { passed: true, errors: [], warnings } });
      allWarnings.push(...warnings);
    }
  }

  // ── 항공사별 최소 구간 수 검증 ────────────
  const minRequired = MIN_ROUTES[airline] || 1;
  if (validRoutes.length > 0 && validRoutes.length < minRequired) {
    allWarnings.push(
      `${airline}: 유효 구간 ${validRoutes.length}개 — 기대 최소 ${minRequired}개 (파싱 오류 가능성)`
    );
    // OZ: 기준 미달이면 아예 무효 처리
    if (airline === 'OZ') {
      console.warn(`[Validation] OZ: 구간 ${validRoutes.length}개 < 최소 ${minRequired}개 → hasValidData=false`);
      return {
        airline, source_url, effective_month, currency,
        validRoutes: [], rejectedRoutes: [...rejectedRoutes, ...validRoutes.map(r => ({
          ...r, _validation: { passed: false, errors: [`OZ 최소구간 미달 (${validRoutes.length}/${minRequired})`], warnings: [] },
        }))],
        hasValidData: false, spikeDetected, allWarnings, summary, parse_warning,
        collectorSource, lowConfidence: true, blockUpdate: true,
        validatedAt: new Date().toISOString(),
      };
    }
  }

  // ── fallback 정책 ─────────────────────────────────────────
  // v30: override-text / override-html / override-url 은 저장 허용 (manual 공지 입력)
  const SAVEABLE = ['live', 'override-url', 'override-text', 'override-html', 'ai-search-auto'];
  const isFallback    = !SAVEABLE.includes(collectorSource);
  const lowConfidence = isFallback;
  // fallback이면 전 항공사 저장 금지 (KE 포함 — v30 정책 강화)
  const blockUpdate = isFallback;

  if (isFallback) {
    allWarnings.push(`${airline}: fallback 데이터 (source=${collectorSource}) — 저장 금지`);
  }

  return {
    airline, source_url, effective_month, currency,
    validRoutes, rejectedRoutes,
    hasValidData: validRoutes.length > 0,
    spikeDetected, allWarnings, summary, parse_warning,
    collectorSource, lowConfidence, blockUpdate,
    validatedAt: new Date().toISOString(),
  };
}

function validateAll(parseResults, prevFeed = null, collectedResults = []) {
  return parseResults.map((pr, i) => {
    const src = collectedResults[i]?.source || 'live';
    return validateOne(pr, prevFeed, src);
  });
}

// ──────────────────────────────────────────
// 검증 결과 콘솔 요약
// ──────────────────────────────────────────
function printValidationSummary(results) {
  console.log('\n[Validation] ── 검증 결과 요약 ──');
  for (const r of results) {
    const status    = r.hasValidData ? '✅ PASS' : '❌ FAIL';
    const spike     = r.spikeDetected  ? ' ⚠️ 이상변동'    : '';
    const lowConf   = r.lowConfidence  ? ' 🔶 LOW_CONF'    : '';
    const blocked   = r.blockUpdate    ? ' 🚫 저장금지'    : '';
    console.log(`  ${status}${spike}${lowConf}${blocked} | ${r.airline} | 유효 ${r.validRoutes.length}개 구간, 거부 ${r.rejectedRoutes.length}개 구간 [${r.collectorSource || '?'}]`);
    r.rejectedRoutes.forEach(rt =>
      console.log(`    거부 [${rt.route_type||'?'}]: ${rt._validation.errors.join(', ')}`)
    );
    r.allWarnings.forEach(w => console.log(`    경고: ${w}`));
  }
  console.log('[Validation] ──────────────────────\n');
}

module.exports = { validateOne, validateAll, printValidationSummary };
