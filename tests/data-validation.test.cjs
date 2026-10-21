'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const { fixtures } = require('./helpers/data-fixtures.cjs');
const { validateOne, validateAll, normalizeRecord, validateFeed, validateSourceUrl, checkSourceLinks } = require('../lib/validation');
const { validDate } = require('../lib/validation/records');
const { validateChanges } = require('../scripts/validate_data');
const { getPipelineMonths } = require('../lib/month');
function validate(f) { return validateOne(f.parsed, f.previous, f.collector.source, f.collector); }

test('normalizes old fields without inventing publication or effective dates', () => {
  const f = fixtures(), record = normalizeRecord(f.previous.airlines[0].items[0], f.previous.airlines[0]);
  assert.equal(record.oneWayAmount, 20); assert.equal(record.currency, 'USD');
  assert.equal(record.publishedAt, null); assert.equal(record.effectiveFrom, null); assert.equal(record.effectiveTo, null);
  assert.equal(record.origin, null); assert.equal(record.validationStatus, 'unverified');
  assert.equal(record.direction, null); assert.equal(record.sourceVerificationStatus, null);
  assert.equal(record.dataStatus, 'confirmed'); assert.equal(record.sourceUrl, f.url);
});
test('official candidate passes without assuming omitted dates', () => {
  const result = validate(fixtures()); assert.equal(result.hasValidData, true);
  assert.equal(result.validRoutes[0].metadata.publishedAt, null);
});
for (const [name, update] of [
  ['negative amount', f => { f.parsed.routes[0].amount = -1; }],
  ['infinite amount', f => { f.parsed.routes[0].amount = Infinity; }],
  ['string amount', f => { f.parsed.routes[0].amount = '22'; }],
  ['missing amount', f => { f.parsed.routes[0].amount = null; }],
  ['zero overwrites', f => { f.parsed.routes[0].amount = 0; }],
  ['abnormal amount', f => { f.parsed.routes[0].amount = 100000; }],
  ['missing currency', f => { delete f.parsed.currency; delete f.parsed.routes[0].currency; }],
  ['mixed currencies', f => { f.parsed.routes[0].currency = 'KRW'; }],
  ['invalid month', f => { f.parsed.effective_month = '2026.13'; }],
  ['missing month', f => { f.parsed.effective_month = null; }],
  ['collection month mismatch', f => { f.collector.detectedMonth = '2020.01'; }],
  ['missing source URL', f => { delete f.parsed.source_url; delete f.collector.sourceUrl; }],
  ['unofficial source', f => { f.parsed.source_url = 'https://news.example.com/story'; }],
  ['mock parser on live collection', f => { f.parsed.usedMock = true; }],
  ['unknown parser status', f => { delete f.parsed.usedMock; }],
  ['fallback collector', f => { f.collector.source = 'fallback'; }],
  ['missing collection timestamp', f => { delete f.collector.fetchedAt; }],
  ['forecast top level', f => { f.parsed.dataStatus = 'forecast'; }],
  ['forecast route', f => { f.parsed.routes[0].dataStatus = 'forecast'; }],
  ['forecast source', f => { f.parsed.sourceType = 'forecast_model'; }],
  ['forecast interval', f => { f.parsed.routes[0].predictedMin = 20; }],
  ['duplicate route', f => { f.parsed.routes.push({ ...f.parsed.routes[0] }); }],
  ['invalid actual date', f => { f.parsed.publishedAt = '2026-02-30'; }],
  ['date month mismatch', f => { f.parsed.effectiveFrom = '2020-01-01'; }],
  ['large change', f => { f.parsed.routes[0].amount = 40; }],
  ['old month rollback', f => { f.parsed.effective_month = f.collector.detectedMonth = '2020.01'; }],
  ['round trip amount', f => { f.parsed.direction = 'round_trip'; }],
  ['return leg amount', f => { f.parsed.routes[0].direction = 'return'; }],
]) test(`holds ${name} and preserves the input feed`, () => {
  const f = fixtures(), before = JSON.stringify(f.previous); update(f);
  const result = validate(f); assert.equal(result.hasValidData, false); assert.equal(result.blockUpdate, true);
  assert.equal(JSON.stringify(f.previous), before);
});
test('one bad row holds the complete notice', () => {
  const f = fixtures(); f.parsed.routes.push({ route_type: 'invalid', amount: -1, currency: 'USD' });
  const r = validate(f); assert.equal(r.validRoutes.length, 1); assert.equal(r.hasValidData, false);
});
test('spikes do not compare amounts across currencies', () => {
  const f = fixtures(); f.previous.airlines[0].currency = f.previous.airlines[0].items[0].currency = 'KRW';
  f.previous.airlines[0].items[0].current = 100000;
  assert.equal(validate(f).spikeDetected, false);
});
test('collector association uses code instead of array order', () => {
  const f = fixtures();
  const results = validateAll([f.parsed], f.previous, [{ code: 'KE', source: 'fallback' }, f.collector]);
  assert.equal(results[0].hasValidData, true);
  assert.equal(validateAll([f.parsed], f.previous, [])[0].hasValidData, false);
});
test('duplicate airline candidates are rejected together', () => {
  const f = fixtures(); assert.ok(validateAll([f.parsed, f.parsed], f.previous, [f.collector]).every(r => r.blockUpdate));
});
test('source checks reject lookalike domains, credentials, HTTP and private destinations', async () => {
  for (const url of ['https://jinair.com.evil.test/', 'https://eviljinair.com/', 'https://x:y@jinair.com/', 'http://jinair.com/', 'https://127.0.0.1/']) assert.ok(validateSourceUrl(url, 'LJ').length);
  assert.equal(validateSourceUrl('https://www.jinair.com/notice', 'LJ').length, 0);
  assert.equal(validateSourceUrl('https://www.trinityairways.com/app/customerCenter/notice/retrieve/12722', 'TW').length, 0);
  const checks = await checkSourceLinks([{ airline: 'LJ', sourceUrl: 'https://127.0.0.1/' }]);
  assert.equal(checks[0].passed, false);
});
test('explicit direction and original verification provenance remain distinct from pipeline validation', () => {
  const record = normalizeRecord({ amount: 12, label: 'A', oneWay: true }, { airline: 'LJ', currency: 'USD',
    status: 'official_verified', verifiedAt: '2026-10-21', departureCountry: 'KR' });
  assert.equal(record.direction, 'one_way'); assert.equal(record.departureCountry, 'KR');
  assert.equal(record.sourceVerificationStatus, 'official_verified'); assert.equal(record.sourceVerifiedAt, '2026-10-21');
  assert.equal(record.validationStatus, 'unverified'); assert.equal(record.validatedAt, null);
});
test('current shared official notices and manual overrides pass structural audit', () => {
  const service = require('../scripts/validate_service_data.cjs');
  const fs = require('node:fs'), path = require('node:path');
  const notices = service.loadNotices(fs.readFileSync(path.resolve(__dirname, '../public/_shared.js'), 'utf8'));
  const actual = service.validateNotices(notices); assert.equal(actual.passed, true, actual.errors.join('; '));
  const manual = service.validateManualOverrides(require('../public/data/manual_overrides.json'));
  assert.equal(manual.passed, true, manual.errors.join('; '));
  const bad = structuredClone(notices); bad[0].november[0] = -1;
  assert.equal(service.validateNotices(bad).passed, false);
  const mismatch = structuredClone(notices); mismatch[0].november.pop();
  assert.equal(service.validateNotices(mismatch).passed, false);
  assert.throws(() => service.loadNotices('window.SOMETHING_ELSE=[];'));
});
test('October source module validates its metadata and matches November baselines by group', () => {
  const service = require('../scripts/validate_service_data.cjs');
  const fs = require('node:fs'), path = require('node:path');
  const groups = service.loadRouteGroupNotices(fs.readFileSync(path.resolve(__dirname, '../public/notice-group-source.js'), 'utf8'));
  const notices = service.loadNotices(fs.readFileSync(path.resolve(__dirname, '../public/_shared.js'), 'utf8'));
  const result = service.validateRouteGroupNotices(groups, notices);
  assert.equal(result.passed, true, result.errors.join('; ')); assert.equal(result.comparedGroups, 4);
  const reordered = structuredClone(groups);
  reordered.BX.bands.reverse(); reordered.BX.october.reverse();
  assert.equal(service.validateRouteGroupNotices(reordered, notices).passed, true);
  for (const mutate of [
    data => { data.BX.october[0] = 38; },
    data => { data.BX.october[0] = -1; },
    data => { data.BX.october[0] = '37'; },
    data => { delete data.BX.october[0]; },
    data => { data.BX.october.pop(); },
    data => { data.BX.bands[1] = data.BX.bands[0]; },
    data => { data.BX.url = 'https://example.com/notice'; },
    data => { data.BX.currency = 'KRW'; },
    data => { data.BX.status = 'forecast'; },
    data => { data.BX.dataStatus = 'forecast'; },
    data => { data.BX.direction = 'round_trip'; },
    data => { data.BX.departureCountry = 'JP'; },
    data => { data.BX.ticketingStart = '2026-11-01'; },
    data => { data.BX.noticeDate = '2026-02-30'; },
    data => { delete data.BX.verifiedAt; },
    data => { data.BX.code = 'KE'; },
  ]) {
    const invalid = structuredClone(groups); mutate(invalid);
    assert.equal(service.validateRouteGroupNotices(invalid, notices).passed, false);
  }
  assert.equal(service.validateRouteGroupNotices(groups, []).passed, false);
  assert.throws(() => service.loadRouteGroupNotices('window.SOMETHING_ELSE={};'));
});
test('date checker rejects rollovers and ambiguous timestamps', () => {
  assert.equal(validDate('2026-02-30'), false); assert.equal(validDate('2026-10-21T12:00:00'), false);
  assert.equal(validDate('2026-10-21T12:00:00+09:00'), true);
});
test('old documented null remains unavailable, not zero', () => {
  const f = fixtures(); f.previous.airlines[0].items[0].current = null;
  f.previous.airlines[0].items[0].metadata = { oneWayAmount: 99 };
  const check = validateFeed(f.previous); assert.equal(check.passed, true);
  assert.equal(check.records[0].oneWayAmount, null); assert.equal(validateFeed(f.previous, { strict: true }).passed, false);
});
test('feed schema, duplicated rows, mixed forecasts, conflicting amounts fail', () => {
  assert.equal(validateFeed({}).passed, false);
  for (const mutate of [a => a.items.push({ ...a.items[0] }), a => { a.items[0].dataStatus = 'forecast'; }, a => { a.items[0].amount = 99; }]) {
    const f = fixtures(); mutate(f.previous.airlines[0]); assert.equal(validateFeed(f.previous).passed, false);
  }
});
test('dataset changes use strict checks and reject zero and deletion', () => {
  const f = fixtures(), next = structuredClone(f.previous);
  next.airlines[0].items[0].current = 0; assert.equal(validateChanges(f.previous, next).passed, false);
  next.airlines = []; assert.equal(validateChanges(f.previous, next).passed, false);
});
test('KST month boundary is independent of machine timezone', () => {
  assert.equal(getPipelineMonths('2026-10-31T14:59:59Z').currentMonth, '2026.10');
  assert.equal(getPipelineMonths('2026-10-31T15:00:00Z').currentMonth, '2026.11');
  for (const tz of ['UTC', 'Asia/Seoul', 'America/Los_Angeles']) {
    const out = execFileSync(process.execPath, ['-e', "process.stdout.write(require('./lib/month').getPipelineMonths('2026-10-31T10:00:00Z').currentMonth)"], { cwd: require('path').resolve(__dirname, '..'), env: { ...process.env, TZ: tz } });
    assert.equal(out.toString(), '2026.10');
  }
});
