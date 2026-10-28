'use strict';
const test = require('node:test'), assert = require('node:assert/strict'), fs = require('node:fs'), vm = require('node:vm');
const trust = require('../public/source-provenance');
const { loadNotices } = require('../scripts/validate_service_data.cjs');
const shared = fs.readFileSync('public/_shared.js', 'utf8');
const langs = ['ko', 'en', 'ja', 'zh', 'fr', 'de'];

// Exercise the actual final copy installers without network, browser or data mutation.
function render(file, lang = 'ko', mutate) {
  const notices = loadNotices(shared); if (mutate) mutate(notices);
  const nodes = new Map(), schemas = [{ textContent:JSON.stringify({'@type':'WebApplication', description:'All nine airlines confirmed'}) }];
  const faqAnswer = { textContent:'' }, faqQuestion = { textContent:'Current notice coverage?' };
  const context = { console, setInterval:() => 1, clearInterval:() => {},
    I18N:Object.fromEntries(langs.map(l => [l, {}])), SAVING_UI_TEXT:Object.fromEntries(langs.map(l => [l, {}])),
    AUGUST_2026_NOTICE_LINKS:{}, AUGUST_2026_OFFICIAL_AMOUNTS:{}, NOVEMBER_2026_OFFICIAL_NOTICES:notices,
    AeroSourceTrust:trust, SHARED_STATE:{lang}, getCurrentLang:() => lang,
    renderLanding:() => {}, document:{readyState:'complete', title:'',
      querySelector(selector) {
        if (selector.startsWith('meta[')) {
          if (!nodes.has(selector)) nodes.set(selector, {content:''});
          return nodes.get(selector);
        }
        return null;
      },
      querySelectorAll(selector) {
        if (selector === 'script[type="application/ld+json"]') return schemas;
        if (selector === '#calculatorFaq .faq-a') return [faqAnswer];
        if (selector === '#calculatorFaq .faq-item') return [{querySelector:s => s === '.faq-q' ? faqQuestion : faqAnswer}];
        return [];
      },
      getElementById:id => nodes.get(id) || null,
      createElement:tag => ({tagName:tag, remove(){nodes.delete(this.id);}}),
      head:{appendChild(node){ if (node.id) nodes.set(node.id, node); if (node.type === 'application/ld+json') schemas.push(node); }}
    }
  };
  context.window = context;
  vm.createContext(context);
  const start = shared.indexOf('window.NOVEMBER_2026_NOTICE_COPY='), end = shared.indexOf('/* October 19 market references', start);
  vm.runInContext(shared.slice(start, end), context);
  vm.runInContext(fs.readFileSync('public/' + file, 'utf8'), context);
  return {context, nodes, schemas, faqAnswer};
}

test('final home and calculator copy follows source count in all six languages', () => {
  for (const file of ['home-sep20.js', 'calculator-oct20.js']) for (const lang of langs) {
    const {context, nodes} = render(file, lang);
    const description = nodes.get('meta[name="description"]').content;
    assert.match(description, /9/);
    assert.ok(description.includes(context.NOVEMBER_2026_NOTICE_COPY[lang].summary));
    assert.equal(nodes.get('meta[property="og:description"]').content, description);
    assert.equal(nodes.get('meta[name="twitter:description"]').content, description);
    assert.doesNotMatch(description, /인하됐|decreased/);
  }
});

test('changed primary-source amount reduces displayed count and leaves source link explicitly pending', () => {
  const mutate = notices => { notices.find(n => n.code === 'LJ').november[0]++; };
  for (const file of ['home-sep20.js', 'calculator-oct20.js']) {
    const {context, nodes} = render(file, 'ko', mutate);
    assert.match(nodes.get('meta[name="description"]').content, /공시 완료 8개사/);
    assert.match(nodes.get('meta[name="description"]').content, /공시 미완료: LJ\./);
    if (file.startsWith('calculator')) assert.match(context.I18N.ko['calc.official.item.lj'], /11월 확인 중/);
  }
});

test('October archived scope and pending-not-unpublished distinction reach FAQ and WebApplication schema', () => {
  const {context, nodes, schemas, faqAnswer} = render('calculator-oct20.js');
  assert.match(context.I18N.ko['calc.notice'], /노선과 발권월/);
  assert.match(context.SAVING_UI_TEXT.ko.thMay, /10월 공시/);
  assert.match(context.SAVING_UI_TEXT.ko.julyPending, /확인 중/);
  assert.match(faqAnswer.textContent, /노선과 발권월/);
  assert.equal(JSON.parse(schemas[0].textContent).description, nodes.get('meta[name="description"]').content);
  const home = render('home-sep20.js');
  assert.equal(home.context.I18N.ko['index.card.augustBase'], '10월 보관 데이터');
  assert.equal(home.context.I18N.ko['index.card.miniNotice'], '10월 공시 원문 ↗');
  assert.equal(JSON.parse(home.nodes.get('homeSep20Schema').textContent).description, home.nodes.get('meta[name="description"]').content);
});

test('airline archive retains its rows and links without certifying every stored record', () => {
  const html = fs.readFileSync('public/airlines.html', 'utf8');
  const originalRenderer = html.match(/function renderTable\(\)\{[\s\S]*?\r?\n\}/)[0];
  for (const lang of langs) {
    const nodes = new Map(), statusCell = {textContent:'', style:{}}, timers = [];
    const context = {
      BASE_MONTH:'2026.09', NEXT_MONTH:'2026.10', OFFICIAL_COMPARE_DATA:{},
      SEPTEMBER_2026_OFFICIAL_COMPARE_DATA:{KE:[{band:'~499', routes:[], cur:'KRW', v5:48000}]},
      JULY_OFFICIAL_CODES:[], JUNE_OFFICIAL_CODES:[], hasJulyOfficial:null, hasJuneOfficial:null, hasSeptember2026Official:null,
      AIRLINES_I18N:Object.fromEntries(langs.map(l => [l, {}])), SHARED_STATE:{lang},
      KR_AIRLINES:[{code:'KE', name:'Korean Air', logo:'KE', surchargeSchema:'mileage_band', officialNoticeUrl:'https://example.invalid/original-september-source'}],
      FEED:null, currentF:'all', searchQ:'', openCode:null,
      applyStaticTexts:() => {}, findFeedAl:() => ({status:'official_verified'}), resolveStatus:() => 'official_verified',
      statusBadgeHtml:status => '<span>'+status+'</span>', buildCompareTableHtml:() => '<table><tr><td>archived detail</td></tr></table>',
      getRepAmount:() => ({amountRaw:49000,amountKRW:49000,currency:'KRW',label:'~499',month:'2026.10'}),
      fmtSurcharge:(amount,currency) => currency+' '+amount,
      setInterval:fn => {timers.push(fn);return 1;}, clearInterval:() => {},
      document:{title:'', querySelector:selector => {
        if(!nodes.has(selector))nodes.set(selector,{content:''});return nodes.get(selector);
      }, querySelectorAll:selector => selector === '#tableBody .row-main > div:nth-child(5)' ? [statusCell] : [],
      getElementById:id => {if(!nodes.has(id))nodes.set(id,{textContent:'',innerHTML:'',style:{}});return nodes.get(id);}}
    };
    context.window=context;context.T=key => context.AIRLINES_I18N[lang][key] || key;
    vm.createContext(context);
    vm.runInContext(originalRenderer, context);
    vm.runInContext(fs.readFileSync('public/airlines-oct20.js', 'utf8'), context);
    timers[0](); // The existing metadata-ready settling pass.
    const copy = context.AIRLINES_I18N[lang];
    assert.equal(statusCell.textContent, copy.nextOfficialBadge);
    assert.equal(copy.nextOfficialBadge, copy.thStatus);
    assert.notEqual(copy.ftabOfficial, '공식 확인');
    assert.equal(context.KR_AIRLINES[0].hasOfficialNotice, false);
    assert.equal(context.KR_AIRLINES[0].hasSourceLink, true);
    assert.equal(context.KR_AIRLINES[0].officialNoticeUrlMay, 'https://example.invalid/original-september-source');
    assert.match(nodes.get('tableBody').innerHTML, /2610-infuel/);
    assert.match(nodes.get('tableBody').innerHTML, /KRW 49000/);
    assert.equal(context.OFFICIAL_COMPARE_DATA.KE[0].v4, 48000);
    assert.equal(context.OFFICIAL_COMPARE_DATA.KE[0].v5, 49000);
    assert.equal(context.hasJulyOfficial('KE'), true, 'legacy column selector remains compatible');
    assert.equal(nodes.get('meta[name="description"]').content, copy.introBody);
    assert.equal(nodes.get('meta[property="og:description"]').content, copy.introBody);
    assert.equal(nodes.get('meta[name="twitter:description"]').content, copy.introBody);
    statusCell.textContent='official_verified';context.renderTable();
    assert.equal(statusCell.textContent, copy.nextOfficialBadge, 'filter/currency rerenders retain archive status');
    if(lang==='ko') {
      assert.match(copy.introBody, /2026년 9월·10월 보관 기록/);
      assert.match(copy.introBody, /최신 금액은 계산기/);
      assert.match(copy.seoSummaryP, /^기록 당시 분석/);
    }
  }
});
