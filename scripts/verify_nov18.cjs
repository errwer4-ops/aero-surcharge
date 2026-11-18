/* November 18 source-driven regression checks. No live source scraping or deployment. */
'use strict';
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawn, execFileSync } = require('node:child_process');
const { createHash } = require('node:crypto');
const root = path.resolve(__dirname, '..');
const baselineCommit = 'ee98230513d84852749c50ac719cfedccfc06c4c';
const port = Number(process.env.NOV18_TEST_PORT || 4418);
const origin = process.env.AERO_QA_ORIGIN || 'http://127.0.0.1:' + port;
const allPages = ['forecast','news','index','fuel-surcharge-graph','fuel-surcharge-calculator'];
const selectedPages = process.env.NOV18_TEST_PAGES ? process.env.NOV18_TEST_PAGES.split(',') : allPages;
assert(selectedPages.length>0 && selectedPages.every(p=>allPages.includes(p)), 'NOV18_TEST_PAGES contains supported page names');
const out = path.join(root, 'artifacts/review-verification/market-nov18', process.env.NOV18_TEST_PAGES ? 'verification-'+selectedPages.join('-') : 'verification');
const cutoff = '2026-11-18T09:00:00+09:00';
const languages = ['ko', 'en', 'ja', 'zh', 'fr', 'de'];
const confirmed = ['BX', 'KE', 'LJ', 'OZ', 'ZE'];
const pending = ['7C', 'RS', 'TW', 'YP'];
const prefix = 'market-20261118-';
const normalize = x => String(x || '').replace(/\s+/g, ' ').trim();
const sha = x => createHash('sha256').update(x).digest('hex');
const scriptSha256 = sha(fs.readFileSync(__filename));
const sourceDigest = () => require(path.join(root,'lib/release-readiness.cjs')).sourceDigest(root);
const startSourceDigest = sourceDigest();
fs.mkdirSync(out, { recursive: true });

// These expectations are manually transcribed from the November 18 source review.
// They deliberately do not load renderer packs or the generated shared-data patch.
// Research artifacts record original bodies, publication/observation clocks and limits.
const sources = {
  fx:'https://www.newsis.com/view/NISX20261117_0003871797',
  oil:'https://news.einfomax.co.kr/news/articleView.html?idxno=4445238',
  jet:'https://commodityscope.com/prices/singapore-jet-kerosene',
  hedging:'https://www.opis.com/resources/energy-market-news-from-opis/european-airlines-reduce-fuel-hedging-gambling-on-oil-price-drops/',
  imo:'https://www.imo.org/en/mediacentre/hottopics/pages/middle-east-highlighted-incidents.aspx',
  traffic:'https://insights.windward.ai/',
  ukmto208update:'https://x.com/UK_MTO/status/2122620224801501653',
  ukmto209:'https://x.com/UK_MTO/status/2122649948298850600',
  ukmto210:'https://x.com/UK_MTO/status/2122703877438861624',
  tankerCapacity:'https://gcaptain.com/gulf-oil-flow-at-risk-from-lack-of-empty-tankers-tracker-says/'
};
const noticeSources = {
  KE: 'https://www.koreanair.com/contents/footer/customer-support/notice/2026/2612-infuel',
  OZ: 'https://flyasiana.com/C/KR/KO/customer/notice/detail?id=CM202611160002531020',
  BX: 'https://www.airbusan.com/content/common/customercenter/noticeDetail?id=4431',
  LJ:'https://www.hanjinsabre.com/Airlinegroup/BoardView/?CDA=LJ&TAB=3&BID=90147',
  ZE:'https://www.hanjinsabre.com/Airlinemain/BoardView/?CDA=ZE&TAB=3&BID=90153'
};
const amounts = {
  KE: [50800, 69500, 97500, 120200, 169600, 172200, 231000, 336400, 377800],
  OZ: [57500, 84300, 111000, 137800, 164600, 190000, 216700, 270300, 322400],
  BX: [40, 71, 84, 98],
  LJ:[34,50,81,88], ZE:[40,51,61,73,82,95]
};
const expectedNumbers = {
  informationCutoff: cutoff, currentMonth: '2026-11', currentAppliedMonth: '2026-11', forecastTargetMonth: '2026-12',
  currentStage: 27, currentStageScope: 'Korean_Air_November_reported_reference_not_common_to_all_airlines',
  runKind: 'scheduled_0900', scheduledReferenceTimeUsed: true,
  usdKrw: 1338.2, usdKrwDate: '2026-11-17', usdKrwDailyChange: 2.5, usdKrwDailyChangePercent: null,
  usdKrwReferenceAt: '2026-11-17T15:30:00+09:00',
  brentUsdPerBbl: 93.14, wtiUsdPerBbl: 86.01, brentDailyChangeUsd: 0.7, wtiDailyChangeUsd: 0.29,
  brentPct: 0.76, wtiPct: 0.34, crudePriceDate: '2026-11-17', crudePriceKind: 'settlement',
  brentContractMonth: '2027-01', wtiContractMonth: '2026-12',
  singaporeJetFobReferenceUsdPerBbl: 151.72, singaporeJetFobReferenceDate: '2026-11-16',
  singaporeJetDailyChangeUsd: 0.57, singaporeJetDailyChangePct: 0.4, singaporeJetPreviousAssessmentDate: '2026-11-13',
  commodityScopeConfidence: 'low', singaporeJetSourcePublishedAt: null,
  singaporeJetLatestVerifiedUsdPerBbl: 151.72, singaporeJetLatestVerifiedDate: '2026-11-16',
  iataJetFuelGlobalUsdPerBbl: 169.82, iataJetFuelGlobalWeeklyChangePct: -5.1,
  iataJetFuelAsiaOceaniaUsdPerBbl: 152.8, iataJetFuelAsiaOceaniaWeeklyChangePct: -6.4,
  iataJetFuelWeekEnding: '2026-11-13', iataJetFuelSourcePublishedAt: null, iataJetFuelIsSingaporeMops: false,
  imoCumulativeConfirmedIncidents: 138, imoLatestConfirmedIncidentsAtCutoff: 138, imoLatestFatalitiesAtCutoff: 25,
  imoCumulativeFatalities: 25, imoListConfirmedIncidents: 138, imoListUpdated: '2026-11-17', imoSourcePublishedAt: null,
  jmicEdition: 114, jmicReportDate: '2026-11-15', jmicInformationCutoff: '2026-11-15T13:00:00Z',
  jmicHormuzThreat: 'SEVERE', jmicArabianGulfThreat: 'SUBSTANTIAL', jmicGulfOfOmanThreat: 'MODERATE',
  eiaHormuzQuarterlyPeriod: '2026-Q3', eiaHormuzQuarterlyReportDate: '2026-11-16',
  eiaHormuzQuarterlyTotalOilMillionBpd: 9.1, eiaHormuzQuarterlyCrudeCondensateMillionBpd: 7.3,
  eiaHormuzQuarterlyPetroleumProductsMillionBpd: 1.8, eiaHormuzQuarterlyPreviousTotalOilMillionBpd: 5.1,
  eiaHormuzQuarterlySourcePublishedAt: null,
  opecCapacityReviewDate: '2026-11-16', opecCapacityReviewPublishedAt: '2026-11-16T17:11:25Z',
  windwardTrackedCrossings: 4, windwardInboundCrossings: 4, windwardOutboundCrossings: 0,
  windwardAisTrackedCrossings: 0, windwardDarkCrossings: 4, windwardSatelliteOnlyDetections: null,
  windwardObservationWindowStart: null, windwardObservationWindowEnd: null,
  currentHormuzTraffic: null, hormuzLatestGulfCrudeFlowMillionBpd: null, hormuzOilFlowLast24hBbl: null,
  hormuzCrudeShipmentBbl: null, hormuzCrudeShipmentPrevDayBbl: null,
  mopsUsdPerBbl: null, mopsUsdPerGallon: null, mopsCentsPerGallon: null,
  decemberMopsUsdPerBbl: null, decemberStageEstimate: null, decemberOfficialStage: null, decemberAverageUsdKrw: null,
  reportedDecemberMopsUsdPerBbl: 165.66, reportedDecemberMopsCentsPerGal: 394.44, reportedDecemberStage: 25,
  reportedDecemberMopsPeriodStart: '2026-10-16', reportedDecemberMopsPeriodEnd: '2026-11-15',
  decemberCalculationStart: '2026-10-16', decemberCalculationEnd: '2026-11-15', decemberCalculationPeriodEnded: true,
  decemberCalculationStatus: 'period_ended_official_notices_partially_confirmed_average_unverified',
  eiaJetInventoryMillionBarrels: 41.979, eiaJetInventoryWeekEnded: '2026-11-06',
  ieaOmrReportDate: '2026-11-13', ieaOmrObservationMonth: '2026-10', ieaOmrGlobalOilSupplyMillionBpd: 105.4
};
function beforeCutoff(value, label) {
  assert(Number.isFinite(Date.parse(value)), label + ' is an explicit timestamp');
  assert(Date.parse(value) <= Date.parse(cutoff), label + ' precedes the cutoff');
}
function checkNumbers(n) {
  for(const [key,value] of Object.entries(expectedNumbers)) assert.deepEqual(n[key],value,key+' independently transcribed source expectation');
  assert.deepEqual(n.decemberConfirmedAirlines.slice().sort(),confirmed);
  assert.deepEqual(n.decemberPendingAirlines.slice().sort(),pending);
  for(const [key,url] of Object.entries({fxReferenceSourceUrl:sources.fx,crudeSourceUrl:sources.oil,singaporeJetFobReferenceSourceUrl:sources.jet,imoSourceUrl:sources.imo})) assert.equal(n[key],url,key);
  assert.equal(n.fxSourcePublishedAt,'2026-11-17T15:44:17+09:00');
  assert.equal(n.crudeSourcePublishedAt,'2026-11-18T07:07:08+09:00');
  for(const key of ['fxSourcePublishedAt','crudeSourcePublishedAt','imoSourceCheckedAt','iataJetFuelSourceCheckedAt','singaporeJetSourceCheckedAt']) beforeCutoff(n[key],key);
  assert.match(n.eiaHormuzQuarterlyKind,/historical.*quarterly.*not_current/);
  assert.match(n.reportedDecemberMopsKind,/not_direct_official/);
  assert.equal(n.singaporeJetFobReferenceKind,'dated_private_FOB_assessment_not_live_quote_or_official_MOPS');
  assert.match(n.imoScope,/not_Hormuz_only/);
  assert(Date.parse(n.lastUpdated)>=Date.parse(cutoff),'modification clock separate from source cutoff');
  checkAmounts(n.decemberOfficialAmounts,'sourceUrl');
}
function checkAmounts(notices, urlKey = 'url') {
  const byCode = Array.isArray(notices) ? Object.fromEntries(notices.map(n => [n.code,n])) : notices;
  assert.deepEqual(Object.keys(byCode).sort(), confirmed, 'only five verified December carriers');
  assert.equal(Object.values(byCode).reduce((sum,n)=>sum+n.amounts.length,0),32,'32 independently checked December amounts');
  for (const code of confirmed) {
    const n = byCode[code];
    assert.deepEqual(n.amounts, amounts[code], code + ' original published band amounts');
    assert.equal(n.currency, ['KE','OZ'].includes(code) ? 'KRW' : 'USD');
    assert.equal(n.direction, 'one_way');
    assert.equal(n.ticketingStart, '2026-12-01');
    assert.equal(n.ticketingEnd, code === 'OZ' ? '2026-12-16' : '2026-12-31');
    assert.equal(n[urlKey], noticeSources[code]);
  }
}
function checkFeed(feed, n) {
  assert.equal(feed.meta.informationCutoff, cutoff);
  assert.equal(feed.latest.informationCutoff, cutoff);
  assert.equal(feed.meta.lastUpdated, n.lastUpdated);
  const input = feed.meta.inputs;
  const aliases = { brentUSD:'brentUsdPerBbl', wtiUSD:'wtiUsdPerBbl',
    singaporeJetPrivateAssessmentUsdPerBbl:'singaporeJetFobReferenceUsdPerBbl',
    singaporeJetAssessmentDate:'singaporeJetFobReferenceDate', imoConfirmedIncidents:'imoCumulativeConfirmedIncidents',
    imoFatalities:'imoCumulativeFatalities', decemberOfficialMopsUsdPerBbl:'decemberMopsUsdPerBbl',
    decemberPeriodAverageUsdKrw:'decemberAverageUsdKrw' };
  for (const [key, target] of Object.entries(aliases)) assert.deepEqual(input[key], n[target], key + ' feed alias');
  for (const key of Object.keys(expectedNumbers)) if (Object.hasOwn(input,key)) assert.deepEqual(input[key], n[key], key + ' feed/shared consistency');
  for (const key of ['reportedDecemberMopsUsdPerBbl','reportedDecemberMopsCentsPerGal','reportedDecemberStage',
    'jmicHormuzThreat','eiaHormuzQuarterlyTotalOilMillionBpd','iataJetFuelGlobalUsdPerBbl']) assert.deepEqual(input[key], n[key], key + ' required feed input');
  assert.equal(feed.announcedNotices.month,'2026-12');
  checkAmounts(feed.announcedNotices.notices);
  for (const f of feed.forecasts) {
    assert.equal(f.targetPeriod,'2026.12');
    for (const key of ['predictedMin','predictedMax','officialStage','officialAmounts']) assert.equal(f[key],null,'no invented universal '+key);
  }
}

// Serve immutable public blobs from the prior deployed commit, including its HTML
// and script order. This is not a fixture generated from today's implementation.
// It requires this git object to exist; missing history fails rather than silently
// replacing the baseline with current files or an ignored screenshot artifact.
assert.equal(execFileSync('git',['rev-parse',baselineCommit+'^{commit}'],{cwd:root,encoding:'utf8'}).trim(),baselineCommit);
const previousPaths = new Set(execFileSync('git',['ls-tree','-r','--name-only',baselineCommit,'public'],{cwd:root,encoding:'utf8'}).trim().split(/\r?\n/));
const blobCache = new Map();
const captureShared = '\n;window.__NOV18_QA_SHARED_STATE=JSON.parse(JSON.stringify({snapshots:window.AERO_MARKET_SNAPSHOTS,latest:window.AERO_MARKET_NUMBERS_LATEST}));';
function baselineBlob(relative) {
  if (!previousPaths.has(relative)) return null;
  if (!blobCache.has(relative)) blobCache.set(relative,execFileSync('git',['show',baselineCommit+':'+relative],{cwd:root,maxBuffer:32*1024*1024}));
  return blobCache.get(relative);
}
const mime = {'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.json':'application/json',
  '.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.ico':'image/x-icon',
  '.woff':'font/woff','.woff2':'font/woff2','.webp':'image/webp','.txt':'text/plain'};
async function newPage(browser, baseline=false) {
  const page = await browser.newPage({viewport:{width:1440,height:1000}});
  await page.clock.setFixedTime(new Date(cutoff));
  page.qa = { blocked:new Set(), errors:[], consoleErrors:[], failed:[], badResponses:[] };
  await page.route('**/*', async route => {
    const url = new URL(route.request().url()), clean=url.origin+url.pathname;
    if (url.origin !== origin || /^\/api(?:\/|$)/.test(url.pathname) || !['GET','HEAD'].includes(route.request().method())) { page.qa.blocked.add(clean); return route.abort(); }
    if (baseline) {
      let pathname = decodeURIComponent(url.pathname);
      if (pathname === '/') pathname='/index.html';
      if (!path.extname(pathname)) pathname+='.html';
      const relative='public'+pathname, blob=baselineBlob(relative);
      if (!blob) return route.fulfill({status:404,body:'Not present in immutable baseline'});
      return route.fulfill({status:200,contentType:mime[path.extname(pathname)]||'application/octet-stream',
        body:pathname==='/_shared.js' ? Buffer.concat([blob,Buffer.from(captureShared)]) : blob});
    }
    if (url.pathname === '/_shared.js') return route.fulfill({contentType:mime['.js'],body:fs.readFileSync(path.join(root,'public/_shared.js'),'utf8')+captureShared});
    return route.continue();
  });
  page.on('pageerror', e => page.qa.errors.push(e.message));
  page.on('console', m => { if(m.type()==='error') page.qa.consoleErrors.push({text:m.text(),url:m.location().url}); });
  page.on('requestfailed', r => { const u=new URL(r.url()); if(!page.qa.blocked.has(u.origin+u.pathname)) page.qa.failed.push({url:r.url(),error:r.failure()?.errorText}); });
  page.on('response', r => { if(r.status()>=400 && new URL(r.url()).origin===origin) page.qa.badResponses.push({url:r.url(),status:r.status()}); });
  return page;
}
async function state(page) {
  return page.evaluate(() => {
    const flatten = x => Array.isArray(x) ? x.flatMap(flatten) : x?.['@graph'] ? flatten(x['@graph']) : [x];
    const table=document.querySelector('#indicatorTbody, .indicator-table tbody, .fore-tbl tbody');
    return {
      n:window.AERO_MARKET_NUMBERS_LATEST, r:window.AERO_MARKET_RELEASE, body:document.body.innerText,
      title:document.title,h1:[...document.querySelectorAll('h1')].map(x=>x.textContent),
      canonical:document.querySelector('link[rel="canonical"]')?.href,
      description:document.querySelector('meta[name="description"]')?.content,
      ogTitle:document.querySelector('meta[property="og:title"]')?.content,
      language:typeof getCurrentLang==='function' ? getCurrentLang() : document.documentElement.lang,
      overflow:document.documentElement.scrollWidth>innerWidth,
      schemas:[...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(el=>flatten(JSON.parse(el.textContent))),
      faq:[...document.querySelectorAll('#forecastFaqBox li')].map(li=>({q:li.querySelector('strong')?.textContent,
        a:li.textContent.slice(li.querySelector('strong')?.textContent.length||0)})),
      rows:table ? [...table.rows].map(row=>[...row.cells].map(cell=>cell.innerText)) : [],
      overview:document.querySelector('#forecastOutlookSummary')?.innerText || '',
      decision:document.querySelector('#forecastDecisionTitle')?.innerText || '',
      visibleCards:[...document.querySelectorAll('.news-card')].map(c=>({id:c.id,title:c.querySelector('.news-title')?.textContent,
        summary:c.querySelector('.news-summary')?.textContent,impact:c.querySelector('.news-impact')?.textContent,
        hrefs:[...c.querySelectorAll('a[href]')].map(a=>a.href)})),
      notices:window.AeroDecemberNotices?.notices,
      noticeCount:window.AeroDecemberNotices && window.AeroSourceTrust?.summarize(window.AeroDecemberNotices.notices,'2026-12').verifiedCount
    };
  });
}
function checkClean(page, label) {
  const unexpected = page.qa.consoleErrors.filter(e => !(/Failed to load resource: net::ERR_(FAILED|BLOCKED_BY_CLIENT)/.test(e.text) && page.qa.blocked.has(String(e.url).split('?')[0])));
  assert.deepEqual(page.qa.errors,[],label+' JS exceptions');
  assert.deepEqual(page.qa.failed,[],label+' local failed requests');
  assert.deepEqual(page.qa.badResponses,[],label+' local HTTP errors');
  assert.deepEqual(unexpected,[],label+' unexpected console errors');
  return {errors:[],unexpectedConsole:[],blockedExternalRequests:page.qa.blocked.size};
}
function checkCommon(s, name, language, width) {
  assert.equal(s.overflow,false,name+' '+language+' '+width+' horizontal overflow');
  assert.equal(s.language,language,name+' language switch');
  assert.equal(s.h1.length,1,name+' single primary heading');
  assert(s.title && s.description,name+' SEO title/description present');
  assert.equal(s.canonical,'https://aero-surcharge.com/'+(name==='index'?'':name),name+' canonical');
  assert.doesNotMatch(s.body,/undefined|\?\?\?\?|\ufffd/);
  if(s.notices) { checkAmounts(s.notices); assert.equal(s.noticeCount,5,'verified notice count'); }
}
function checkCards(cards,previous) {
  assert.equal(previous.length,182,'immutable prior article count');
  assert.equal(cards.length,192,'182 historical + ten fresh market articles');
  assert.equal(new Set(cards.map(c=>c.id)).size,192,'unique article IDs');
  const oldIds=new Set(previous.map(c=>c.id));
  assert.deepEqual(cards.filter(c=>oldIds.has(c.id)),previous,'all previous cards/translations/clocks preserved');
  const added=cards.filter(c=>!oldIds.has(c.id));
  assert.equal(added.length,10); assert(added.every(c=>c.id.startsWith(prefix)),'all new cards use current dated prefix');
  const times={fx:'2026-11-17T15:44:17+09:00',oil:'2026-11-18T07:07:08+09:00',hedging:'2026-11-17T09:02:00Z',ukmto208update:'2026-11-17T09:17:00Z',ukmto209:'2026-11-17T11:15:00Z',ukmto210:'2026-11-17T14:50:00Z',tankerCapacity:'2026-11-17T18:24:56Z'};
  for(const [key,url] of Object.entries(sources)) {
    const found=added.filter(c=>c.sourceUrl===url);assert.equal(found.length,1,key+' source article');const c=found[0];
    assert.equal(c.id,prefix+key);assert.equal(c.date,'2026-11-18');assert.equal(c.dateKind,'site_update');assert.equal(c.informationCutoff,cutoff);
    assert(Object.hasOwn(c,'sourcePublishedAt'));assert(Object.hasOwn(c,'eventDate'));assert(c.citationUrls.includes(url));
    if(times[key])assert.equal(c.sourcePublishedAt,times[key],key+' source publication precision');
    if(c.sourcePublishedAt)beforeCutoff(c.sourcePublishedAt,key+' publication');
    else {const clocks=[c.sourceVerifiedAt,c.sourcePreviouslyObservedAt,c.sourceAvailabilityUpperBound,c.sourceVerificationWindow?.end];assert(clocks.some(v=>v&&Number.isFinite(Date.parse(v))&&Date.parse(v)<=Date.parse(cutoff)),key+' pre-cutoff availability proof');}
    assert(Date.parse(c.updatedAt)>=Date.parse(cutoff),'article update does not masquerade as source publication');
    assert.deepEqual(Object.keys(c.i18n).filter(k=>k!=='cn').sort(),languages.slice().sort());
    if(c.i18n.cn)assert.deepEqual(c.i18n.cn,c.i18n.zh);
    for(const lang of languages)for(const field of ['title','summary','impact'])assert(normalize(c.i18n[lang][field]),key+' '+lang+' '+field);
  }
  const patterns={fx:[/1[, .]?338[.,]2/],oil:[/93[.,]14/,/86[.,]01/],jet:[/151[.,]72/],hedging:[/2027/],imo:[/138/,/25/],traffic:[/4|four|quatre|vier/i,/0|zero|no outbound|aucune sortie|null|keine Ausfahrt/i],ukmto208update:[/208/,/07:45/],ukmto209:[/209/,/13/],ukmto210:[/210/,/50/],tankerCapacity:[/40/]};
  for(const [key,tests] of Object.entries(patterns))for(const lang of languages){const c=added.find(c=>c.id===prefix+key);const text=['title','summary','impact'].map(k=>c.i18n[lang][k]).join(' ');for(const re of tests)assert.match(text,re,key+' '+lang+' independently checked fact');}
  const byKey=Object.fromEntries(added.map(c=>[c.id.slice(prefix.length),c]));
  assert.equal(byKey.ukmto208update.eventDate,'2026-11-16','208 initial event differs from update publication');
  assert.equal(byKey.ukmto209.eventDate,'2026-11-13','209 late report keeps original event date');
  assert.equal(byKey.ukmto210.eventDate,'2026-11-17','210 event date is separate from site update');
  assert.equal(byKey.imo.eventDate,null,'IMO cumulative update is not a single new incident');
  assert.equal(byKey.traffic.eventDate,null,'tracking edition is not an incident event');
  return added;
}
async function history(page) {
  return page.evaluate(()=>({cards:window.AERO_MARKET_RELEASE.newsCards,snapshots:window.AERO_MARKET_SNAPSHOTS,
    rawSnapshots:window.__NOV18_QA_SHARED_STATE.snapshots,
    notices:window.AeroDecemberNotices?.notices,rates:window.RATES,
    namedArchives:{july31:window.AERO_MARKET_NUMBERS_20260731,september7:window.AERO_MARKET_NUMBERS_20260907}}));
}
async function checkPreserved(page, baseline, name) {
  const now=await history(page), rawKeys=Object.keys(baseline.rawSnapshots), keys=Object.keys(baseline.snapshots);
  assert.deepEqual(now.notices,baseline.notices,name+' unchanged notice amounts, publication and verification clocks preserved');
  assert.deepEqual(now.rates,baseline.rates,name+' display-currency reference rates preserved');
  assert.deepEqual(Object.fromEntries(rawKeys.map(k=>[k,now.rawSnapshots[k]])),baseline.rawSnapshots,name+' all 52 old shared snapshots preserved');
  assert.deepEqual(Object.fromEntries(keys.map(k=>[k,now.snapshots[k]])),baseline.snapshots,name+' all old runtime snapshots preserved');
  assert.deepEqual(now.namedArchives,baseline.namedArchives,name+' named legacy archives preserved');
  for(const [values,previousKeys] of [[now.rawSnapshots,rawKeys],[now.snapshots,keys]]) assert.deepEqual(Object.keys(values).sort(),[...previousKeys,'2026-11-18',cutoff].sort(),name+' only two dated snapshot keys added');
  const current=await page.evaluate(()=>({day:AERO_MARKET_SNAPSHOTS['2026-11-18'],timed:AERO_MARKET_SNAPSHOTS['2026-11-18T09:00:00+09:00'],named:AERO_MARKET_NUMBERS_20261118,latest:AERO_MARKET_NUMBERS_LATEST}));
  assert.deepEqual(current.day,current.timed); assert.deepEqual(current.named,current.day);
  for(const [k,v] of Object.entries(current.named)) assert.deepEqual(current.latest[k],v,'current explicit field retained '+k);
  checkNumbers(current.named);
}
async function openEvidence(page,name) {
  for(const id of name==='forecast' ? ['forecastEvidence','forecastSources'] : ['newsContextGuide','newsMethodGuide']) {
    const d=page.locator('#'+id); if(await d.count()) await d.evaluate(e=>{e.open=true;});
  }
}
function checkMarketRendered(s,name,lang,market) {
  checkNumbers(s.n);
  const pack=s.r.packs[lang];
  for(const value of [pack.status,pack.summary[0],pack.officialNotice]) {
    assert.match(value,/KE/,lang+' current status retains Korean Air notice');
    assert.match(value,/OZ/,lang+' current status retains Asiana notice');
    assert.match(value,/BX/,lang+' current status retains Air Busan notice');
    assert.match(value,/LJ/,lang+' current status retains Jin Air notice');
    assert.match(value,/ZE/,lang+' current status retains Eastar notice');
  }
  assert.match(s.body,/09:00/,'cutoff visible');
  for(const pattern of [/1[, .]?338[.,]2/,/93[.,]14/,/86[.,]01/,/151[.,]72/,/169[.,]82/,/152[.,]8/,/138/]) assert.match(s.body,pattern,name+' '+lang+' dated indicators visible');
  assert.equal(s.ogTitle,s.title,name+' Open Graph title');
  if(name==='forecast') {
    assert(s.decision,'traveler decision summary remains first');
    const faq=s.schemas.find(x=>x['@type']==='FAQPage'); assert(faq,'FAQ schema');
    assert.equal(faq.inLanguage,lang); assert.equal(faq['@id'],s.canonical+'#faq');
    assert.equal(faq.headline,s.h1[0]); assert.equal(faq.description,s.description);
    assert.deepEqual(faq.mainEntity.map(x=>({q:normalize(x.name),a:normalize(x.acceptedAnswer.text)})),s.faq.map(x=>({q:normalize(x.q),a:normalize(x.a)})),lang+' visible FAQ and structured data agree');
    assert(s.rows.length>=5,'market and maritime rows retained');
  } else for(const c of market) {
    const visible=s.visibleCards.find(x=>x.id===c.id),schema=s.schemas.find(x=>x['@type']==='NewsArticle' && x.url?.endsWith('#'+c.id));
    assert(visible,c.id+' rendered'); assert(schema,c.id+' structured article');
    const copy=c.i18n[lang];
    for(const key of ['title','summary','impact']) assert.equal(normalize(visible[key]),normalize(copy[key]),c.id+' '+lang+' '+key);
    assert.equal(schema.headline,copy.title); assert.equal(schema.articleBody,copy.summary+' '+copy.impact);
    assert.equal(schema.dateModified,c.updatedAt,c.id+' own modification time');
    assert(visible.hrefs.includes(c.sourceUrl),c.id+' original source link');
  }
}
async function graph(page){const g=await page.evaluate(()=>({airlines:AIRLINES.map(a=>({code:a.code,currency:a.currency,dec:a.dec})),hits:typeof _hitAreas!=='undefined'?_hitAreas:[],ink:(()=>{const c=document.querySelector('#graphCanvas');return c&&c.width>0&&c.height>0&&c.getContext('2d').getImageData(0,0,c.width,c.height).data.some((v,i)=>i%4===3&&v>0);})()}));assert(g.ink);for(const a of g.airlines){if(confirmed.includes(a.code)){assert.deepEqual(a.dec.filter(v=>v!==null),amounts[a.code]);assert.equal(a.currency,['KE','OZ'].includes(a.code)?'KRW':'USD');if(a.code==='LJ'){assert.equal(a.dec.length,5);assert.equal(a.dec[4],null);}}else assert(a.dec===null||a.dec.every(v=>v===null),a.code+' unknown December');}return g;}
const routeCases=[['LJ','ICN','FUK',34],['LJ','ICN','NRT',50],['LJ','PUS','CEB',81],['LJ','ICN','CEB',88],['ZE','PUS','KIX',40],['ZE','ICN','KIX',51],['ZE','ICN','HKG',61],['ZE','ICN','DAD',73],['ZE','ICN','CXR',82],['ZE','ICN','ALA',95],['BX','PUS','NRT',40],['BX','ICN','NRT',71],['KE','ICN','NRT',69500],['OZ','ICN','NRT',84300]];
async function graphCoverage(page){
 await page.selectOption('#filterAirline','all');await page.selectOption('#filterView','change');await page.waitForTimeout(250);
 let hits=await page.evaluate(()=>_hitAreas.map(h=>({code:h.airline.code,month:h.month,index:h.bandIdx,original:h.origVal,shown:h.displayVal})));
 assert(!hits.some(h=>h.code==='LJ'&&h.month==='change'),'LJ aggregate percentage suppressed when November and December cover different bands');assert(hits.some(h=>h.month==='change'),'other comparable change bars remain');
 await page.selectOption('#filterAirline','LJ');await page.waitForTimeout(250);hits=await page.evaluate(()=>_hitAreas.map(h=>({code:h.airline.code,month:h.month,index:h.bandIdx,original:h.origVal})));
 assert.deepEqual(hits.filter(h=>h.month==='change').map(h=>h.index).sort(),[0,1,2,3],'LJ four comparable per-band change bars');
 await page.selectOption('#filterView','amount');await page.waitForTimeout(250);hits=await page.evaluate(()=>_hitAreas.map(h=>({code:h.airline.code,month:h.month,index:h.bandIdx,original:h.origVal})));
 assert.deepEqual(hits.filter(h=>h.month==='dec').map(h=>h.original),amounts.LJ,'LJ canvas original USD amounts');assert(!hits.some(h=>h.month==='dec'&&h.index===4),'missing fifth LJ December band is not drawn');
 await page.screenshot({path:path.join(out,'graph-lj-december-four-bands.png')});await page.selectOption('#filterAirline','ZE');await page.waitForTimeout(250);hits=await page.evaluate(()=>_hitAreas.map(h=>({month:h.month,original:h.origVal})));
 assert.deepEqual(hits.filter(h=>h.month==='dec').map(h=>h.original),amounts.ZE,'ZE canvas original six groups');await page.screenshot({path:path.join(out,'graph-ze-december-six-groups.png')});await page.selectOption('#filterAirline','all');await page.waitForTimeout(200);
}
async function calculator(page){const results=await page.evaluate(cases=>cases.map(([code,origin,destination,value])=>({code,origin,destination,value,rows:AeroCalculatorPlatform.getRows(AeroCalculatorBridge.contextFor(origin,destination),{airline:'all',baseMonth:'2026-11',targetMonth:'2026-12'})})),routeCases);for(const c of results){const row=c.rows.find(r=>r.code===c.code);assert(row,c.code+' '+c.origin+'-'+c.destination+' available');assert(row.target,c.code+' target exists');assert.equal(row.target.amount,c.value,c.code+' '+c.origin+'-'+c.destination);assert.equal(row.target.status,'confirmed');assert.equal(row.target.currency,['KE','OZ'].includes(c.code)?'KRW':'USD');assert.equal(row.target.sourceUrl,noticeSources[c.code]);assert.equal(row.target.effectiveTo,c.code==='OZ'?'2026-12-16':'2026-12-31');}const missing=await page.evaluate(()=>({fifth:AeroDecemberNotices.record('LJ',4,'ICN','SIN'),wrong:AeroDecemberNotices.record('ZE',0,'ICN','KIX'),unknown:AeroCalculatorPlatform.getRows(AeroCalculatorBridge.contextFor('ICN','NRT'),{airline:'all',baseMonth:'2026-11',targetMonth:'2026-12'}).filter(r=>['7C','RS','TW','YP'].includes(r.code)).map(r=>r.target)}));assert.equal(missing.fifth,null);assert(!missing.wrong||missing.wrong.status!=='confirmed');assert(missing.unknown.every(x=>x===null));assert(await page.locator('#savingTableWrap').isVisible());}

const checkGraph=graph,checkCalculator=calculator;
function stability(s) {
  return {title:s.title,h1:s.h1,description:s.description,rows:s.rows,overview:s.overview,decision:s.decision,
    visibleCards:s.visibleCards,faq:s.faq,notices:s.notices,noticeCount:s.noticeCount,
    cards:s.r?.newsCards,n:s.n};
}
async function serve() {
  if(process.env.AERO_QA_ORIGIN) return null;
  const server=spawn(process.execPath,[path.join(__dirname,'serve_local.js')],{cwd:root,env:{...process.env,PORT:String(port)},stdio:['ignore','pipe','pipe']});
  await new Promise((resolve,reject)=>{ const t=setTimeout(()=>reject(Error('Local server timeout')),10000);
    server.stdout.on('data',b=>{if(String(b).includes('Local review server')){clearTimeout(t);resolve();}});
    server.on('error',e=>{clearTimeout(t);reject(e);}); server.on('exit',c=>{clearTimeout(t);reject(Error('Local server exited '+c));}); });
  return server;
}
(async()=>{
  let browser,server,activePage,activeName;
  const reports=[],startedAt=new Date().toISOString();
  try {
    server=await serve(); browser=await chromium.launch();
    const baseline={};
    for(const name of ['forecast','news']) {
      const p=await newPage(browser,true); await p.goto(origin+'/'+name); await p.waitForTimeout(1800);
      baseline[name]=await history(p); assert.equal(baseline[name].cards.length,182,name+' immutable baseline article count');
      assert.equal(Object.keys(baseline[name].rawSnapshots).length,52,name+' immutable baseline shared snapshots');
      assert.deepEqual(p.qa.errors,[],name+' baseline script errors'); await p.close();
    }
    assert.deepEqual(baseline.forecast.cards,baseline.news.cards,'baseline pages agree on complete archive');
    for(const name of selectedPages) {
      activeName=name; const page=activePage=await newPage(browser); await page.goto(origin+(name==='index'?'/':'/'+name)); await page.waitForTimeout(1800);
      const initial=await state(page),marketPage=['forecast','news'].includes(name);
      let market=[];
      if(marketPage) {
        market=checkCards(initial.r.newsCards,baseline[name].cards); await checkPreserved(page,baseline[name],name);
        checkFeed(await (await page.request.get(origin+'/data/forecast_feed.json')).json(),initial.n);
      }
      if(name==='fuel-surcharge-graph') {await page.selectOption('#filterMonth','dec');await page.selectOption('#navCurr','USD');await graphCoverage(page);}
      if(name==='fuel-surcharge-calculator') {
        await page.fill('#savingBaseMonth','2026-11'); await page.dispatchEvent('#savingBaseMonth','change');
        await page.fill('#savingTargetMonth','2026-12'); await page.dispatchEvent('#savingTargetMonth','change');
        await page.fill('#savingOriginInput','ICN'); await page.press('#savingOriginInput','Enter');
        await page.fill('#savingDestinationInput','NRT'); await page.press('#savingDestinationInput','Enter');
        await page.selectOption('#savingAirlineFilter','all');
      }
      const languagesChecked=[];
      for(const lang of languages) {
        await page.selectOption('#navLang',lang); await page.waitForTimeout(650);
        if(marketPage) await openEvidence(page,name);
        for(const viewport of [{width:1440,height:1000},{width:390,height:844}]) {
          await page.setViewportSize(viewport); await page.waitForTimeout(200);
          const s=await state(page); checkCommon(s,name,lang,viewport.width);
          if(marketPage) checkMarketRendered(s,name,lang,market);
          if(name==='fuel-surcharge-graph') await checkGraph(page);
          if(name==='fuel-surcharge-calculator') await checkCalculator(page);
          await page.evaluate(()=>scrollTo(0,0));
          await page.screenshot({path:path.join(out,name+'-'+lang+'-'+viewport.width+'.png')});
        }
        languagesChecked.push(lang);
      }
      await page.selectOption('#navLang','ko'); await page.waitForTimeout(650);
      if(marketPage) await openEvidence(page,name);
      const before=await state(page); await page.waitForTimeout(12000); const after=await state(page);
      assert.deepEqual(stability(after),stability(before),name+' state remains stable after 12 seconds');
      checkCommon(after,name,'ko',390);
      if(marketPage) { checkCards(after.r.newsCards,baseline[name].cards); await checkPreserved(page,baseline[name],name); }
      if(name==='fuel-surcharge-graph') await checkGraph(page);
      if(name==='fuel-surcharge-calculator') await checkCalculator(page);
      const clean=checkClean(page,name);
      reports.push({page:name,languages:languagesChecked,widths:[1440,390],delayedStabilitySeconds:12,...clean,
        ...(marketPage?{archiveCards:182,newMarketCards:10,newNoticeCards:0,totalCards:192,rawPreservedSnapshots:52,runtimePreservedSnapshots:Object.keys(baseline[name].snapshots).length}:{})});
      console.log(name+': six languages, desktop/mobile, 12-second stability PASS');
      await page.close(); activePage=null;
    }
    assert.equal(sha(fs.readFileSync(__filename)),scriptSha256,'verification script unchanged during execution');
    assert.equal(sourceDigest(),startSourceDigest,'source files unchanged during verification');
    fs.writeFileSync(path.join(out,'verification.json'),JSON.stringify({status:'PASS',cutoff,startedAt,finishedAt:new Date().toISOString(),scriptSha256,sourceDigest:startSourceDigest,
      baseline:{commit:baselineCommit,source:'git show immutable tracked public blobs; no generated or ignored baseline fixture',publicFiles:previousPaths.size},
      independentExpectations:{sources,values:expectedNumbers,noticeSources,amounts},reports,
      scope:'Local browser rendering and data/source-provenance consistency. External APIs/analytics/advertising blocked; this is not a new source fetch, production deployment or affiliate conversion test. Screenshots require visual review.'},null,2));
    console.log('Report and '+(selectedPages.length*12)+' viewport screenshots: '+out);
  } catch(error) {
    let failureState; try{if(activePage)failureState=await state(activePage);}catch{}
    fs.writeFileSync(path.join(out,'failure.json'),JSON.stringify({status:'FAIL',cutoff,startedAt,failedAt:new Date().toISOString(),scriptSha256,activeName,
      error:{message:error.message,stack:error.stack},reports,failureState,errors:activePage?.qa.errors,consoleErrors:activePage?.qa.consoleErrors},null,2));
    throw error;
  } finally { if(browser)await browser.close(); if(server)server.kill(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
