const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const assert = (value, message) => {
  if (!value) throw new Error(message);
};

const shared = read('public/_shared.js');
const news = read('public/news.html');
const forecast = read('public/fuel-surcharge-forecast.html');

assert(shared.includes('AERO_NEWS_CARDS_20260610'), 'June 10 news cards are missing');
assert(shared.includes("window.AERO_NEWS_LATEST = window.AERO_MARKET_BRIEF_20260610"), 'June 10 brief is not latest');
assert(news.indexOf('AERO_NEWS_CARDS_20260610') < news.indexOf('AERO_NEWS_CARDS_20260608'), 'June 10 cards are not prepended');
assert(news.includes('2026-06-10T11:00:00+09:00'), 'News modified time is stale');
assert(forecast.includes('2026-06-10T11:00:00+09:00'), 'Forecast modified time is stale');
assert(news.includes('#faq-20260610'), 'News FAQ id is stale');
assert(forecast.includes('#faq-20260610'), 'Forecast FAQ id is stale');
assert(forecast.includes('동결: 55~60%'), 'Latest freeze probability is missing');
assert(forecast.includes('1단계 인상: 25~35%'), 'Latest one-step probability is missing');
assert(forecast.includes('OPEC+'), 'OPEC+ analysis is missing');
assert(forecast.includes('대한항공 유류할증료') && forecast.includes('티웨이 유류할증료'), 'Airline SEO entities are missing');
assert(shared.includes('AERO_NEWS_CARDS_20260608'), 'June 8 news history was removed');
assert(news.includes('AERO_NEWS_CARDS_20260524'), 'Older news history was removed');
assert(forecast.includes('6월') && forecast.includes('공식'), 'Confirmed June filing context is missing');

for (const html of [['news', news], ['forecast', forecast]]) {
  const scripts = [...html[1].matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)]
    .map(match => match[1])
    .filter(code => code.trim() && !code.trim().startsWith('{'));
  scripts.forEach((code, index) => new vm.Script(code, { filename: `${html[0]}:${index}` }));
}

for (const source of [news, forecast]) {
  const jsonBlocks = [...source.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  jsonBlocks.forEach(match => JSON.parse(match[1]));
}

console.log('2026-06-10 market update verification passed');
