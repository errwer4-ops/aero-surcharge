/**
 * Market test fixtures only. ExchangeRate-API use was discontinued by the user.
 * A leftover key or USE_LIVE_MARKET_DATA flag never initiates a network request.
 * These fixtures are not verified market observations and must not be published.
 */
'use strict';
const MOCK_MARKET_DATA = {
  brentUSD:             82.5,   // Brent 원유 ($/배럴) — EIA mock
  wtiUSD:               78.3,   // WTI 원유 ($/배럴)   — EIA mock
  jetFuelSpread:        14.2,   // Jet Fuel 스프레드    — EIA mock
  usdKrw:               1480,   // USD/KRW — 테스트용 mock
  usdJpy:               149.2,  // USD/JPY — 테스트용 mock
  geopoliticalRiskScore: 0.35,  // 수동 추정값 (자동화 불가)
  baselineBrentUSD:     75,     // surcharge 산정 기준 유가
};

async function getMarketData(opts = {}) {
  const requestedLive = !opts.useMock && process.env.USE_LIVE_MARKET_DATA === 'true';
  return {
    ...MOCK_MARKET_DATA,
    fetchedAt: new Date().toISOString(),
    source: requestedLive ? 'mock_fallback' : 'mock',
    fxStatus: 'disabled',
    fxConfigured: false,
    fxProvider: null,
    fxError: 'ExchangeRate-API 사용 중단. 원격 환율 자동 수집은 미구성 상태이며 반환값은 테스트용 mock입니다.',
  };
}

module.exports = { getMarketData };
