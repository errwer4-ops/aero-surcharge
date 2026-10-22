'use strict';
const test = require('node:test'), assert = require('node:assert/strict'), fs = require('node:fs'), vm = require('node:vm');
const trust = require('../public/source-provenance');
const { loadNotices } = require('../scripts/validate_service_data.cjs');
const shared = fs.readFileSync('public/_shared.js', 'utf8');
const market = fs.readFileSync('public/market-oct17.js', 'utf8');
const langs = ['ko','en','ja','zh','fr','de'];
function render(mutate, withTrust = true, latest = false) {
  const notices = loadNotices(shared); if (mutate) mutate(notices);
  const release = { officialRows:{}, officialUrls:{}, packs:{}, rows:{}, numbers:{octoberLevel:23,octoberMopsUsdPerBbl:158.57,octoberMopsCentsPerGal:377.54}, newsCards:[] };
  for (const lang of langs) {
    release.officialRows[lang] = notices.map(n => [n.key, n.code, 'October']);
    release.rows[lang] = [['status','before','before']];
    release.packs[lang] = { th:['','',''], ui:['','',''], faq:[{q:'a',a:'b'},{q:'c',a:'d'},{q:'e',a:'f'}] };
  }
  const context = { window:{ NOVEMBER_2026_OFFICIAL_NOTICES:notices, AERO_MARKET_RELEASE:release } };
  if (withTrust) context.window.AeroSourceTrust = trust;
  const start = shared.indexOf('window.NOVEMBER_2026_NOTICE_COPY='), end = shared.indexOf('/* October 19 market references', start);
  vm.runInNewContext(shared.slice(start, end), context);
  vm.runInNewContext(market, context);
  if (latest) {
    // Load the real market declarations and both later overrides, including stale
    // legacy level-confirmed flags. The final packs must quarantine those claims.
    vm.runInNewContext(shared.slice(end), context);
    for (const day of ['19','21']) vm.runInNewContext(fs.readFileSync('public/market-oct'+day+'.js','utf8'), context);
  }
  return context.window.AERO_MARKET_RELEASE;
}
test('notice card source dates use reviewed publication metadata, never the old October16 fallback', () => {
  const release = render(), get = code => release.newsCards.find(n => n.id === 'notice-202611-' + code.toLowerCase());
  for (const code of ['KE','LJ','BX']) {
    assert.equal(get(code).reportedDate, null); assert.equal(get(code).eventDate, null);
    assert.equal(get(code).sourcePublishedAt, null); assert.equal(get(code).dateKind, 'site_update');
  }
  assert.equal(get('7C').reportedDate, '2026-10-16');
  assert.equal(get('ZE').reportedDate, '2026-10-20');
  assert.equal(get('TW').reportedDate, '2026-10-19');
  assert.match(get('LJ').i18n.ko.summary, /공시 발표일: 미확인/);
  assert.match(get('LJ').i18n.en.summary, /Notice publication date: unknown/);
  assert.equal(get('7C').i18n.ko.tags.at(-1), '2026-11', 'month title does not invent exact dates');
  assert.equal(release.numbers.novemberNoticeDate, null);
});
test('all six language packs use actual source counts and original publication assumptions are absent', () => {
  const release = render();
  assert.equal(release.numbers.novemberConfirmedAirlines.length, 8);
  for (const lang of langs) {
    assert.match(release.packs[lang].title, /8/);
    assert.match(release.packs[lang].faq[1].a, /8/);
  }
  const text = JSON.stringify(release.newsCards.map(c => c.i18n));
  assert.doesNotMatch(text, /10월 16일 공식|October 16 official|16日の公式公示|10月16日官方|officiel du 16 octobre|Mitteilung vom 16\. Oktober/);
});
test('unreconciled card retains amounts but loses confirmed counts and source publication claims', () => {
  const release = render(notices => { notices.find(n => n.code === 'LJ').november[0] = 37; });
  assert.equal(release.numbers.novemberConfirmedAirlines.length, 7);
  assert.ok(release.numbers.novemberPendingAirlines.includes('LJ'));
  const card = release.newsCards.find(n => n.id === 'notice-202611-lj');
  assert.equal(card.dataStatus, 'unconfirmed'); assert.equal(card.reportedDate, null);
  assert.match(card.i18n.ko.aiBrief, /공시 확인 중/); assert.match(card.i18n.ko.summary, /37/);
  assert.equal(render(null, false).numbers.novemberConfirmedAirlines.length, 0);
});

const pendingCopy = {
  ko:/시장 참고|공식 확정값은 아닙니다/,en:/market reference|not officially confirmed/i,ja:/市場参考|公式確定値ではありません/,
  zh:/市场参考|并非官方确定值/,fr:/[Rr]éférence|sans confirmation officielle/,de:/Marktreferenz|nicht amtlich bestätigt/
};
const unsafeClaims = /27단계(?:로)? 확정|27段階(?:に)?確定|第27档(?:已)?确定|(?:Level 27 confirmed|confirmed at Level 27)|niveau 27 confirmé|confirmé au niveau 27|Stufe 27 bestätigt|mit Stufe 27 bestätigt|확정 MOPS|confirmed MOPS|確定MOPS|确定MOPS|MOPS confirmée|Bestätigtes MOPS|bestätigtes November-MOPS/i;

test('final October19→21 packs and latest report cards separate market claims from amount verification in six languages', () => {
  const release = render(null, true, true);
  for (const lang of langs) {
    const pack = release.packs[lang];
    assert.match(pack.status, pendingCopy[lang], lang+' status');
    assert.match(pack.faq[1].a, pendingCopy[lang], lang+' November answer');
    assert.equal(pack.faq[1].a, pack.faq[2].a);
    for (const number of ['23','158.57','377.54']) assert.ok(pack.faq[0].a.includes(number), lang+' October value '+number);
    for (const number of ['27','173.89','414.03','9.7','55,600','408,100']) assert.ok(pack.faq[1].a.includes(number), lang+' November value '+number);
    assert.doesNotMatch(JSON.stringify(pack), unsafeClaims, lang+' final metadata/FAQ/rows');
    assert.match(pack.rows[1][1], pendingCopy[lang], lang+' raw MOPS table cell is qualified');
    for (const day of ['19','21']) {
      const card = release.newsCards.find(c => c.id === 'market-202610'+day+'-1');
      assert.equal(card.dataStatus, 'unconfirmed'); assert.equal(card.claimType, 'existing_market_report');
      assert.match(card.i18n[lang].title, pendingCopy[lang]);
      assert.doesNotMatch(JSON.stringify(card.i18n[lang]), unsafeClaims);
      assert.ok(card.i18n[lang].summary.includes('173.89'));
    }
  }
});

test('reported level/MOPS numbers remain intact and cannot inherit official amount-table verification', () => {
  const release = render(null, true, true), n = release.numbers;
  assert.equal(n.octoberLevel, 23); assert.equal(n.novemberLevel, 27);
  assert.equal(n.octoberMopsUsdPerBbl, 158.57); assert.equal(n.octoberMopsCentsPerGal, 377.54);
  assert.equal(n.novemberMopsUsdPerBbl, 173.89); assert.equal(n.novemberMopsCentsPerGal, 414.03);
  assert.equal(n.novemberStatus, 'market_reference_official_source_recheck_pending');
  assert.equal(n.novemberDirection, 'market_report_reference');
  for (const key of ['octoberLevel','novemberLevel','octoberMopsAverage','novemberMopsAverage']) {
    assert.equal(n.marketReferenceVerification[key], 'official_source_recheck_pending');
  }
  const noSources = render(null, false, true);
  const changedAmount = render(notices => { notices.find(n => n.code === 'LJ').november[0]++; }, true, true);
  assert.equal(release.numbers.novemberConfirmedAirlines.length, 8);
  assert.equal(noSources.numbers.novemberConfirmedAirlines.length, 0);
  assert.equal(changedAmount.numbers.novemberConfirmedAirlines.length, 7);
  for (const other of [noSources,changedAmount]) {
    assert.deepEqual(JSON.parse(JSON.stringify(other.numbers.marketReferenceVerification)), JSON.parse(JSON.stringify(n.marketReferenceVerification)));
    for (const lang of langs) assert.equal(other.packs[lang].faq[1].a, release.packs[lang].faq[1].a);
  }
});
