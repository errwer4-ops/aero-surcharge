/**
 * Market Data Layer — v2
 * 환율(USD/KRW) 실제 API 연동 추가.
 * Jet Fuel(EIA)은 mock 유지.
 *
 * 환경변수:
 *   EXCHANGERATE_API_KEY  — exchangerate-api.com 키
 *   USE_LIVE_MARKET_DATA  — "true" 이면 실제 API 호출
 *
 * 흐름:
 *   USE_LIVE_MARKET_DATA=true → fetchFxRates() 시도
 *     성공 → live 데이터 반환
 *     실패 → MOCK_MARKET_DATA fallback + 경고 로그
 *   USE_LIVE_MARKET_DATA 미설정 or false → mock 즉시 반환
 */

'use strict';

const https = require('https');

// ──────────────────────────────────────────
// Mock 기준값 (fallback + Jet Fuel 항목)
// ──────────────────────────────────────────
const MOCK_MARKET_DATA = {
  brentUSD:             82.5,   // Brent 원유 ($/배럴) — EIA mock
  wtiUSD:               78.3,   // WTI 원유 ($/배럴)   — EIA mock
  jetFuelSpread:        14.2,   // Jet Fuel 스프레드    — EIA mock
  usdKrw:               1480,   // USD/KRW — live 실패 시 fallback
  usdJpy:               149.2,  // USD/JPY — live 실패 시 fallback
  geopoliticalRiskScore: 0.35,  // 수동 추정값 (자동화 불가)
  baselineBrentUSD:     75,     // surcharge 산정 기준 유가
};

// ──────────────────────────────────────────
// JSON fetch 헬퍼 (https GET → JSON 파싱)
// ──────────────────────────────────────────

/**
 * HTTPS GET으로 JSON을 가져온다.
 * 타임아웃 8초. non-200 상태코드는 Error로 처리.
 * @param {string} url
 * @returns {Promise<object>}
 */
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { timeout: 8000 }, (res) => {
      if (res.statusCode !== 200) {
        res.resume(); // 응답 body 소비 (메모리 누수 방지)
        return reject(new Error(`HTTP ${res.statusCode}: ${url}`));
      }
      let body = '';
      res.setEncoding('utf8');
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch (e) { reject(new Error('JSON 파싱 실패: ' + e.message)); }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('요청 타임아웃: ' + url));
    });
  });
}

// ──────────────────────────────────────────
// 환율 API (exchangerate-api.com)
// ──────────────────────────────────────────

/**
 * exchangerate-api.com에서 USD 기준 환율을 가져온다.
 * 필요 환경변수: EXCHANGERATE_API_KEY
 *
 * 응답 구조:
 *   { result: "success", conversion_rates: { KRW: 1480, JPY: 149.2, ... } }
 *
 * @returns {Promise<{ usdKrw: number, usdJpy: number, fetchedAt: string, source: string }>}
 */
async function fetchFxRates() {
  const apiKey = process.env.EXCHANGERATE_API_KEY;
  if (!apiKey) {
    throw new Error('EXCHANGERATE_API_KEY 환경변수 없음');
  }

  const url  = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
  const data = await fetchJson(url);

  // API 오류 응답 처리 (result: "error")
  if (data.result !== 'success') {
    throw new Error(`환율 API 오류: ${data['error-type'] || JSON.stringify(data)}`);
  }

  const rates = data.conversion_rates;
  if (!rates || typeof rates.KRW !== 'number' || typeof rates.JPY !== 'number') {
    throw new Error('환율 응답에 KRW/JPY 값 없음');
  }

  return {
    usdKrw:    Math.round(rates.KRW),   // 소수점 제거
    usdJpy:    parseFloat(rates.JPY.toFixed(2)),
    fetchedAt: new Date().toISOString(),
    source:    'exchangerate-api.com',
  };
}

// ──────────────────────────────────────────
// Jet Fuel (EIA) — 구조 유지, mock 고정
// ──────────────────────────────────────────

/**
 * EIA API 구조 (미구현 — mock 고정).
 * 실제 구현 시 이 함수만 채우면 됨.
 * 환경변수: EIA_API_KEY
 */
async function fetchJetFuelPrice() { // eslint-disable-line no-unused-vars
  // TODO: EIA API 구현
  // const url = `https://api.eia.gov/v2/petroleum/pri/spt/data/`
  //   + `?api_key=${process.env.EIA_API_KEY}&frequency=weekly`
  //   + `&data[0]=value&facets[series][]=EER_EPJK_PF4_RGC_DPG`;
  // const data = await fetchJson(url);
  // return { jetFuelUSD: data.response.data[0].value, ... };
  throw new Error('EIA API 미구현 — mock 사용');
}

// ──────────────────────────────────────────
// getMarketData — 환경변수 기반 live/mock 분기
// ──────────────────────────────────────────

/**
 * 시장 데이터를 반환.
 * USE_LIVE_MARKET_DATA=true 이면 환율 API를 실제 호출.
 * 실패 시 mock fallback (파이프라인 중단 없음).
 *
 * opts.useMock=true 로 강제 mock 가능 (--mock CLI 플래그 연동).
 *
 * @param {object}  [opts]
 * @param {boolean} [opts.useMock] - true면 환경변수 무시하고 mock 강제
 * @returns {Promise<MarketData>}
 *
 * @typedef {object} MarketData
 * @property {number} brentUSD
 * @property {number} wtiUSD
 * @property {number} jetFuelSpread
 * @property {number} usdKrw
 * @property {number} usdJpy
 * @property {number} geopoliticalRiskScore
 * @property {number} baselineBrentUSD
 * @property {string} source       'mock' | 'live' | 'mock_fallback'
 * @property {string} fetchedAt    ISO 8601
 * @property {string} [fxError]    live 실패 시 오류 메시지
 */
async function getMarketData(opts = {}) {
  const now = new Date().toISOString();

  // --mock 플래그 또는 환경변수 미설정 → mock 즉시 반환
  const useLive = !opts.useMock
    && process.env.USE_LIVE_MARKET_DATA === 'true';

  if (!useLive) {
    return { ...MOCK_MARKET_DATA, fetchedAt: now, source: 'mock' };
  }

  // ── live 모드: 환율 API 호출 ──────────────
  let fxData   = null;
  let fxError  = null;

  try {
    fxData = await fetchFxRates();
    console.log(`[MarketData] 환율 live: USD/KRW ${fxData.usdKrw}, USD/JPY ${fxData.usdJpy}`);
  } catch (err) {
    fxError = err.message;
    console.warn(`[MarketData] 환율 API 실패 → mock fallback: ${err.message}`);
  }

  // Jet Fuel은 항상 mock (EIA 미구현)
  // 환율은 live 성공 시 실제값, 실패 시 mock값 사용
  return {
    brentUSD:             MOCK_MARKET_DATA.brentUSD,
    wtiUSD:               MOCK_MARKET_DATA.wtiUSD,
    jetFuelSpread:        MOCK_MARKET_DATA.jetFuelSpread,
    usdKrw:               fxData ? fxData.usdKrw : MOCK_MARKET_DATA.usdKrw,
    usdJpy:               fxData ? fxData.usdJpy : MOCK_MARKET_DATA.usdJpy,
    geopoliticalRiskScore: MOCK_MARKET_DATA.geopoliticalRiskScore,
    baselineBrentUSD:     MOCK_MARKET_DATA.baselineBrentUSD,
    fetchedAt:            now,
    source:               fxData ? 'live' : 'mock_fallback',
    ...(fxError ? { fxError } : {}), // 실패 사유 로그용
  };
}

module.exports = { getMarketData };
