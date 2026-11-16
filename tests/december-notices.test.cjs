'use strict';
const test = require('node:test'), assert = require('node:assert/strict'), fs = require('node:fs');
const api = require('../public/december-notices.js');
const vm = require('node:vm');
const trust = require('../public/source-provenance.js');
const { loadNotices, validateDecemberNotices } = require('../scripts/validate_service_data.cjs');
const november = loadNotices(fs.readFileSync('public/_shared.js', 'utf8'));
const clone = () => JSON.parse(JSON.stringify(api));

test('December confirms only the 18 source-reviewed KE/OZ amounts and preserves November', () => {
  const feed = JSON.parse(fs.readFileSync('public/data/forecast_feed.json', 'utf8'));
  assert.equal(feed.meta.informationCutoff, '2026-11-16T09:00:00+09:00');
  assert.equal(feed.announcedNotices.checkedAt, api.checkedAt);
  assert.deepEqual(feed.announcedNotices.notices, JSON.parse(JSON.stringify(api.notices)));
  assert.deepEqual(feed.announcedNotices.unverifiedAirlines, api.unverifiedAirlines);
  const before = JSON.stringify(november);
  const result = validateDecemberNotices(api, november);
  assert.equal(result.passed, true, result.errors.join('; '));
  assert.equal(result.amountCount, 18);
  assert.equal(result.airlineCount, 2);
  assert.equal(result.sourceReconciliation.verifiedCount, 2);
  assert.equal(trust.summarize(november, '2026.11').verifiedCount, 9);
  assert.equal(api.getNotice('KE').ticketingEnd, '2026-12-31');
  assert.equal(api.getNotice('OZ').ticketingEnd, '2026-12-16');
  assert.equal(JSON.stringify(november), before);
  assert(Object.isFrozen(api.notices) && Object.isFrozen(api.getNotice('OZ').amounts));
});

test('unverified December airlines and the OZ post-merger period never receive invented rates', () => {
  assert.equal(api.unverifiedAirlines.length, 7);
  for (const code of api.unverifiedAirlines) {
    assert.equal(api.getNotice(code), null);
    assert.equal(api.record(code, 0, 'ICN', 'NRT'), null);
    assert.equal(trust.getNotice(code, '2026.12'), null);
  }
  assert.equal(api.getNotice('OZ').postPeriodRateConfirmed, false);
  assert.match(api.getNotice('OZ').postPeriodRule, /12월 17일.*통합항공사/);
  assert.equal(api.getNotice('KE').officialStage, null);
  assert.equal(api.getNotice('OZ').officialStage, null);
  for (const invalidIndex of [-1, 9, null, '0']) assert.equal(api.record('KE', invalidIndex, 'ICN', 'NRT'), null);
});

test('five omitted lookup routes match both original monthly notices instead of estimated mileage', () => {
  const receipt = JSON.parse(fs.readFileSync('docs/review-evidence/20261116-ke-oz-routes.json', 'utf8'));
  const index = fs.readFileSync('public/index.html', 'utf8');
  const declaration = index.match(/var OFFICIAL_ROUTE_MAP\s*=\s*\{[\s\S]*?\n\};/);
  assert(declaration);
  const context = {};
  vm.runInNewContext(declaration[0], context, { timeout: 1000 });
  assert.equal(receipt.routes.length, 5);
  for (const route of receipt.routes) {
    assert.equal(context.OFFICIAL_ROUTE_MAP[route.airline][`${route.origin}-${route.destination}`], route.range);
    const current = november.find(n => n.code === route.airline), upcoming = api.getNotice(route.airline);
    assert.equal(current.bands[route.bandIndex], upcoming.bands[route.bandIndex]);
    assert.equal(current.november[route.bandIndex], upcoming.november[route.bandIndex]);
    assert.equal(upcoming.url, receipt.sourceUrls[route.airline].december);
    assert.equal(trust.evaluateNotice({ airline:route.airline, month:'2026.12', sourceUrl:upcoming.url,
      currency:upcoming.currency, direction:upcoming.direction, departureCountry:upcoming.departureCountry,
      bandIndex:route.bandIndex, band:upcoming.bands[route.bandIndex], amount:upcoming.amounts[route.bandIndex] }).status, 'verified');
  }
});

test('December audit rejects altered prices, source identity, applicability and invented verification', () => {
  for (const mutate of [
    data => { data.notices[0].amounts[0]++; },
    data => { data.notices[0].amounts[0]++; data.notices[0].december[0]++; },
    data => { data.notices[0].november[0]++; },
    data => { data.notices[0].bands[0] = '500~999 mi'; },
    data => { data.notices[0].amounts[0] = data.notices[0].december[0] = null; },
    data => { data.notices[0].amounts[0] = data.notices[0].december[0] = 0; },
    data => { data.notices[0].amounts[0] = data.notices[0].december[0] = '50800'; },
    data => { data.notices[0].url = data.notices[0].url.replace('2612', '2611'); },
    data => { data.notices[0].currency = 'USD'; },
    data => { data.notices[0].direction = 'round_trip'; },
    data => { data.notices[0].departureCountry = 'JP'; },
    data => { data.notices[0].dataStatus = 'forecast'; },
    data => { data.notices[0].month = '2026-11'; },
    data => { data.notices[1].ticketingEnd = '2026-12-31'; },
    data => { data.notices[1].postPeriodRateConfirmed = true; },
    data => { data.notices[1].postPeriodRule = null; },
    data => { data.notices[0].officialStage = 25; },
    data => { data.notices[0].noticePublishedAt = '2026-11-16T00:00:00+09:00'; },
    data => { data.notices[0].verifiedAt = '2026-11-16T09:00:00+09:00'; },
    data => { data.checkedAt = '2026-11-16T09:00:00+09:00'; },
    data => { data.unverifiedAirlines.pop(); },
    data => { data.notices.push({ ...data.notices[0], code: 'YP' }); },
    data => { data.notices.pop(); },
    data => { data.notices.push(data.notices[0]); },
  ]) {
    const data = clone(); mutate(data);
    const result = validateDecemberNotices(data, november);
    assert.equal(result.passed, false, mutate.toString());
  }
  assert.equal(validateDecemberNotices(null, november).passed, false);
  assert.equal(validateDecemberNotices(api, []).passed, false);
});
