'use strict';
const test = require('node:test'), assert = require('node:assert/strict'), fs = require('node:fs');
const api = require('../public/december-notices.js');
const vm = require('node:vm');
const trust = require('../public/source-provenance.js');
const { loadNotices, validateDecemberNotices } = require('../scripts/validate_service_data.cjs');
const november = loadNotices(fs.readFileSync('public/_shared.js', 'utf8'));
const clone = () => JSON.parse(JSON.stringify(api));

test('Air Busan December retains USD, unknown publication date and origin-specific route groups', () => {
  const bx = api.getNotice('BX');
  assert.deepEqual(bx.amounts, [40, 71, 84, 98]);
  assert.deepEqual(bx.november, [43, 77, 90, 106]);
  assert.equal(bx.currency, 'USD');
  assert.equal(bx.noticeDate, null);
  assert.equal(bx.noticePublishedAt, null);
  assert.equal(bx.publicationTimePrecision, 'unknown');
  assert.equal(bx.ticketingEnd, '2026-12-31');
  assert.equal(bx.officialStage, null);
  for (const [index, origin, destination, amount] of [[0,'PUS','NRT',40],[1,'ICN','NRT',71],[2,'PUS','BKI',84],[2,'ICN','CNX',84],[3,'PUS','BKK',98]]) {
    const record = api.record('BX', index, origin, destination);
    assert.equal(record.status, 'confirmed');
    assert.equal(record.currency, 'USD'); assert.equal(record.amount, amount);
    assert.equal(record.sourceUrl, bx.url); assert.equal(record.publishedAt, null);
  }
  for (const [index, origin, destination] of [[0,'ICN','NRT'],[1,'PUS','NRT'],[2,'ICN','BKI'],[2,'PUS','CNX'],[0,'NRT','PUS']]) {
    assert.equal(api.record('BX', index, origin, destination).status, 'unconfirmed');
  }
  for (const mutate of [
    n=>{n.currency='KRW';},n=>{n.noticeDate=n.noticePublishedAt='2026-11-17';},
    n=>{n.publicationTimePrecision='date';},n=>{n.ticketingEnd='2026-12-16';},
    n=>{n.amounts[0]=n.december[0]=43;},n=>{n.bands[0]=n.bands[0].replace('NRT (PUS)','NRT');}
  ]) { const changed=clone();mutate(changed.notices.find(n=>n.code==='BX'));assert.equal(validateDecemberNotices(changed,november).passed,false); }
});

test('Air Busan independent receipt separates pre-cutoff availability from later verification', () => {
  const receipt=JSON.parse(fs.readFileSync('docs/review-evidence/20261117-bx-december.json','utf8'));
  const original=receipt.sources[0],entry=trust.getNotice('BX','2026.12');
  assert.equal(receipt.sources.length,1);assert.equal(original.airline,'BX');
  assert.deepEqual(entry.bands,original.bands);assert.deepEqual(entry.amounts,original.amounts);
  assert.equal(entry.sourceUrl,original.url);assert.equal(entry.publishedAt,null);
  assert.equal(entry.sourceVerifiedAt,receipt.reviewedAt);assert.equal(entry.effectiveTo,original.ticketingEnd);
  assert(Date.parse(receipt.availability.savedSearchObservedWindow[1])<Date.parse('2026-11-17T09:00:00+09:00'));
  assert(Date.parse(receipt.reviewedAt)>Date.parse('2026-11-17T09:00:00+09:00'));
  assert(original.rawFiles.length>=2);
});


test('December confirms 22 independently reviewed KE/OZ/BX amounts and preserves November', () => {
  const feed = JSON.parse(fs.readFileSync('public/data/forecast_feed.json', 'utf8'));
  assert.match(feed.meta.informationCutoff, /^2026-11-\d{2}T09:00:00\+09:00$/);
  assert.equal(feed.announcedNotices.checkedAt, api.checkedAt);
  assert.deepEqual(feed.announcedNotices.notices, JSON.parse(JSON.stringify(api.notices)));
  assert.deepEqual(feed.announcedNotices.unverifiedAirlines, api.unverifiedAirlines);
  const before = JSON.stringify(november);
  const result = validateDecemberNotices(api, november);
  assert.equal(result.passed, true, result.errors.join('; '));
  assert.equal(result.amountCount, 22);
  assert.equal(result.airlineCount, 3);
  assert.equal(result.sourceReconciliation.verifiedCount, 3);
  assert.equal(trust.summarize(november, '2026.11').verifiedCount, 9);
  assert.equal(api.getNotice('KE').ticketingEnd, '2026-12-31');
  assert.equal(api.getNotice('OZ').ticketingEnd, '2026-12-16');
  assert.equal(JSON.stringify(november), before);
  assert(Object.isFrozen(api.notices) && Object.isFrozen(api.getNotice('OZ').amounts));
});

test('unverified December airlines and the OZ post-merger period never receive invented rates', () => {
  assert.equal(api.unverifiedAirlines.length, 6);
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
