'use strict';
const test = require('node:test'), assert = require('node:assert/strict'), fs = require('node:fs');
const crypto = require('node:crypto');
const vm = require('node:vm');
const trust = require('../public/source-provenance');
const { loadNotices, validateNotices, validateRouteGroupNotices, loadRouteGroupNotices } = require('../scripts/validate_service_data.cjs');
const { normalizeRecord } = require('../lib/validation');
const { reconcileRecord } = require('../lib/validation/provenance');
const notices = loadNotices(fs.readFileSync('public/_shared.js', 'utf8'));
function row(code = '7C', month = '2026.11', index = 0) {
  const entry = trust.getNotice(code, month);
  return { airline: code, month, currency: entry.currency, sourceUrl: entry.sourceUrl,
    direction: entry.direction, departureCountry: entry.departureCountry,
    bandIndex: index, band: entry.bands[index], amount: entry.amounts[index] };
}
test('original PDF reconciliations cover all November bands of 7C, LJ and ZE', () => {
  for (const code of ['7C', 'LJ', 'ZE']) {
    const entry = trust.getNotice(code, '2026.11');
    assert.equal(entry.evidence.method, 'saved_official_notice_pdf_visual_review');
    assert.match(entry.evidence.sha256, /^[a-f0-9]{64}$/);
    entry.amounts.forEach((_, i) => assert.equal(trust.evaluateNotice(row(code, '2026.11', i)).status, 'verified'));
  }
  assert.equal(trust.getNotice('LJ', '2026.11').publishedAt, null, 'PDF does not provide publication date');
});
test('known October Eastar notice is independently bound to bId664', () => {
  const r = { ...row('ZE', '2026.10'), route: 'PUS-KMJ' };
  assert.equal(trust.evaluate(r).status, 'verified');
  assert.equal(trust.evaluate({ ...r, sourceUrl: trust.getNotice('ZE', '2026.11').sourceUrl }).status, 'unresolved');
  assert.equal(trust.evaluate({ ...r, route: 'ICN-NRT' }).status, 'unresolved');
  assert.equal(trust.evaluate({ ...r, route: null }).status, 'unresolved');
  assert.equal(trust.getNotice('ZE', '2026.10').publishedAt, '2026-09-21');
});

test('Air Premia November has six PDF bands, a non-price display gap and ticketing-day FX conditions', () => {
  const entry=trust.getNotice('YP','2026.11'),notice=notices.find(n=>n.code==='YP');
  assert.deepEqual(entry.amounts,[48,64,107,187,236,296]);
  assert.equal(entry.bands.length,6);assert.deepEqual(Array.from(notice.displayBandIndices),[0,1,null,2,3,4,5]);
  assert.equal(entry.publishedAt,'2026-10-27T09:18:18+09:00');
  assert.equal(entry.effectiveFrom,'2026-11-01');assert.equal(entry.effectiveTo,'2026-11-30');
  entry.amounts.forEach((_,i)=>assert.equal(trust.evaluateNotice(row('YP','2026.11',i)).status,'verified'));
  assert.equal(trust.evaluateNotice({...row('YP','2026.11',5),amount:251}).status,'unresolved');
  for(const lang of ['ko','en','ja','zh','fr','de'])assert(notice.period[lang].length>50);
});
test('stale confidence strings cannot bless altered amounts, identity or missing metadata', () => {
  const base = row();
  for (const change of [{ amount: 44 }, { amount: null }, { amount: '43' }, { bandIndex: 1 }, { band: 'arbitrary' },
    { currency: 'KRW' }, { month: '2026.12' }, { sourceUrl: base.sourceUrl.replace('0814', '0751') },
    { sourceUrl: 'https://jejuair.net.evil.invalid' }, { direction: 'round_trip' }, { direction: null },
    { departureCountry: 'JP' }, { bandIndex: null }]) {
    assert.equal(trust.evaluateNotice({ ...base, ...change, status: 'confirmed', sourceVerificationStatus: 'source_reconciled' }).status, 'unresolved');
  }
  assert.equal(trust.evaluateNotice({ ...base, sourceUrl: base.sourceUrl + '&page=2' }).status, 'verified');
  assert.equal(trust.evaluateNotice({ ...base, status: 'forecast' }).status, 'unresolved');
});
test('historical status without reviewed source identity stays unresolved and original amount is preserved', () => {
  const record = normalizeRecord({ amount: 123, label: 'legacy', dataStatus: 'confirmed' }, { airline: 'YP', currency: 'USD', effective_month: '2026.09', sourceVerificationStatus: 'official_verified' });
  assert.equal(reconcileRecord(record).status, 'unresolved'); assert.equal(record.oneWayAmount, 123);
  assert.equal(record.publishedAt, null); assert.equal(record.sourceBand, null); assert.equal(record.bandIndex, null);
});
test('Air Busan departure-qualified groups cannot cross ICN/PUS mappings', () => {
  assert.equal(trust.evaluate({ ...row('BX'), route: 'PUS-NRT' }).status, 'verified');
  assert.equal(trust.evaluate({ ...row('BX'), route: 'ICN-NRT' }).status, 'unresolved');
  assert.equal(trust.evaluate({ ...row('BX', '2026.11', 2), route: 'PUS-BKI' }).status, 'verified');
  assert.equal(trust.evaluate({ ...row('BX', '2026.11', 2), route: 'ICN-BKI' }).status, 'unresolved');
});
test('a null official dash is never a confirmed zero amount', () => {
  assert.equal(trust.evaluateNotice(row('TW', '2026.11', 5)).status, 'unresolved');
  assert.equal(trust.evaluateNotice({ ...row('TW', '2026.11', 5), amount: 0 }).status, 'unresolved');
  assert.equal(trust.summarize(notices, '2026.11').verifiedCount, 9);
});
test('whole notice counts and CI fail closed for any changed route map, band or amount', () => {
  for (const mutate of [all => { all[0].november[0]++; }, all => { all[0].bands[0] = 'new'; }, all => { delete all[0].bands[0]; delete all[0].november[0]; },
    all => { all.find(n => n.code === 'ZE').routesByGroup[0][0] = 'ICN-NRT'; }]) {
    const copy = structuredClone(notices); mutate(copy);
    assert.equal(trust.summarize(copy, '2026.11').verifiedCount, 8);
    assert.equal(validateNotices(copy).passed, false);
  }
  const groups = loadRouteGroupNotices(fs.readFileSync('public/notice-group-source.js', 'utf8'));
  groups.BX.october[0]++; assert.equal(validateRouteGroupNotices(groups, notices).passed, false);
});
test('reviewed manifest is immutable and independent receipts agree', () => {
  assert.throws(() => { trust.getNotice('7C', '2026.11').amounts[0] = 0; });
  const receipt = JSON.parse(fs.readFileSync('docs/review-evidence/source-reconciliation.json', 'utf8'));
  assert.deepEqual(trust.manifest, receipt.notices);
  for (const entry of trust.manifest.filter(n => n.evidence.file?.startsWith('docs/'))) {
    const hash = crypto.createHash('sha256').update(fs.readFileSync(entry.evidence.file)).digest('hex');
    assert.equal(entry.evidence.sha256, hash);
  }
});
test('common six-language overview counts only source-reconciled notices and keeps unresolved original amounts', () => {
  const shared = fs.readFileSync('public/_shared.js', 'utf8');
  const start = shared.indexOf('window.NOVEMBER_2026_NOTICE_COPY='), end = shared.indexOf('/* October 19 market references', start);
  const copy = structuredClone(notices); copy.find(n => n.code === '7C').november[0] = 44;
  const context = { window: { AeroSourceTrust: trust, NOVEMBER_2026_OFFICIAL_NOTICES: copy } };
  vm.runInNewContext(shared.slice(start, end), context);
  assert.equal(context.window.NOVEMBER_2026_SOURCE_REVIEW.verifiedCount, 8);
  assert.equal(copy.find(n => n.code === '7C').dataStatus, 'unconfirmed');
  assert.equal(copy.find(n => n.code === '7C').november[0], 44);
  for (const lang of ['ko','en','ja','zh','fr','de']) assert.match(context.window.NOVEMBER_2026_NOTICE_COPY[lang].short, /8/);
  delete context.window.AeroSourceTrust;
  vm.runInNewContext(shared.slice(start, end), context);
  assert.equal(context.window.NOVEMBER_2026_SOURCE_REVIEW.verifiedCount, 0);
});
