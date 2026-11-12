const {chromium} = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {spawn} = require('node:child_process');
const root = path.resolve(__dirname, '..');
const port = Number(process.env.NOV12_TEST_PORT || 4230);
const origin = process.env.AERO_QA_ORIGIN || 'http://127.0.0.1:' + port;
const out = path.join(os.tmpdir(), 'aero-nov12-qa');
const langs = ['ko', 'en', 'ja', 'zh', 'fr', 'de'];
const prefix = 'market-20261112-';
const cutoff = '2026-11-12T09:00:00+09:00';
const normalize = text => String(text).replace(/\s+/g, ' ').trim();
fs.mkdirSync(out, {recursive:true});

// Derive the preceding shared data from the checkout; no untracked artifact fixture is required.
const shared = fs.readFileSync(path.join(root, 'public/_shared.js'), 'utf8');
const appendMarker = '/* November 12 09:00 KST reviewed snapshot.';
const appendOffset = shared.indexOf(appendMarker);
assert(appendOffset > 0, 'November 12 append boundary exists');
assert.equal(shared.lastIndexOf(appendMarker), appendOffset, 'one November 12 snapshot boundary');
const previousShared = shared.slice(0, appendOffset);
const precedingSnapshotKeys = ['2026-11-11', '2026-11-11T08:30:00+09:00', '2026-11-11T09:00:00+09:00'];
const sourceUrls = {
  fx:'https://news.einfomax.co.kr/news/articleView.html?idxno=4444261',
  fxClose:'https://www.newsis.com/view/NISX20261111_0003864097',
  oil:'https://www.newsweekjapan.jp/articles/-/339829',
  oilContracts:'https://news.sbs.co.kr/english/article.do?news_id=N1008842078',
  jet:'https://commodityscope.com/prices/singapore-jet-kerosene',
  jetCategory:'https://commodityscope.com/prices/jet-fuel',
  traffic:'https://insights.windward.ai/',
  opec:'https://www.opec.org/assets/assetdb/momr-appendix-november-2026.xlsx',
  opecReport:'https://publications.opec.org/momr',
  opecNews:'https://www.brecorder.com/news/amp/40448439',
  didamar:'https://www.marketscreener.com/news/iran-attacks-shipping-navigation-systems-on-oman-s-didamar-island-sources-say-ce785edbde80f420'
};
function beforeCutoff(value, label) {
  assert(Number.isFinite(Date.parse(value)), label + ' explicit availability timestamp');
  assert(Date.parse(value) <= Date.parse(cutoff), label + ' available before cutoff');
}

function checkNumbers(n) {
  // Independent expectations transcribed from reviewed sources, not copied from the renderer.
  const expected = {
    informationCutoff:cutoff,currentMonth:'2026-11',currentStage:27,
    currentStageScope:'Korean_Air_reported_reference_not_common_to_all_airlines',octoberStatus:'archive',
    usdKrw:1333.6,usdKrwDate:'2026-11-11',usdKrwDailyChange:-3.9,usdKrwDailyChangePercent:null,
    usdKrwReferenceAt:'2026-11-11T15:30:00+09:00',
    brentUsdPerBbl:92.76,wtiUsdPerBbl:86.53,brentDailyChangeUsd:1.27,wtiDailyChangeUsd:0.49,
    brentPct:1.39,wtiPct:0.57,crudePriceDate:'2026-11-11',crudePriceKind:'settlement',
    brentContractMonth:'2027-01',wtiContractMonth:'2026-12',
    oilReferenceType:'2026-11-11 futures_settlement',oilReferenceTime:'2026-11-11 settlement_not_post_settlement_trade',
    singaporeJetFobReferenceUsdPerBbl:145.98,singaporeJetFobReferenceDate:'2026-11-10',
    commodityScopeJetUsdPerBbl:145.98,commodityScopeJetDate:'2026-11-10',commodityScopeConfidence:'low',
    singaporeJetDailyChangeUsd:-12.57,singaporeJetDailyChangePct:-7.9,singaporeJetPreviousAssessmentDate:'2026-11-06',
    singaporeJetSourcePublishedAt:null,singaporeJetPriorObservedAt:null,
    imoCumulativeConfirmedIncidents:null,imoLatestConfirmedIncidentsAtCutoff:null,imoLatestFatalitiesAtCutoff:null,
    imoListConfirmedIncidents:null,imoCumulativeFatalities:null,imoListUpdated:null,imoSourcePublishedAt:null,
    imoSourcePreviouslyObservedAt:null,
    windwardTrackedCrossings:10,windwardInboundCrossings:5,windwardOutboundCrossings:5,
    windwardDarkCrossings:5,windwardAisTrackedCrossings:5,windwardObservationDate:'2026-11-10',
    windwardObservationWindowStart:'2026-11-09T18:00:00Z',windwardObservationWindowEnd:'2026-11-10T18:00:00Z',
    windwardObservationWindowHours:24,windwardReportDate:'2026-11-11',windwardSourcePublishedAt:null,
    iataJetFuelGlobalUsdPerBbl:178.95,iataJetFuelGlobalWeeklyChangePct:-6.6,
    iataJetFuelAsiaOceaniaUsdPerBbl:163.26,iataJetFuelAsiaOceaniaWeeklyChangePct:-6,
    iataJetFuelWeekEnding:'2026-11-06',iataJetFuelSourcePublishedAt:null,
    eiaSteoReportDate:'2026-11-10',eiaSteoForecastCompletedDate:'2026-11-05',
    eiaSteoBrentSpotNovemberDecember2026ApproxUsdPerBbl:100,eiaSteoBrentSpotQ4_2027AverageUsdPerBbl:77,
    eiaSteoKind:'conditional_model_forecast_not_observed_spot_futures_or_MOPS',eiaSteoSourcePublishedAt:null,
    eiaJetInventoryMillionBarrels:41.782,eiaJetInventoryPreviousMillionBarrels:42.217,
    eiaJetInventoryWeeklyChangeMillionBarrels:-0.435,eiaJetInventoryWeekEnded:'2026-10-30',eiaJetInventoryReportDate:'2026-11-04',
    opecMomrReportMonth:'2026-11',opecMomrObservationMonth:'2026-10',
    opecMomrDocCrudeProductionMillionBpd:41.23,opecMomrDocCrudeProductionMonthlyChangeMillionBpd:2.04,
    opecMomrSourcePublishedAt:null,didamarEventDate:null,didamarClaimAnnouncementDate:'2026-11-10',
    didamarFacilityDestructionIndependentlyVerified:false,
    decemberDirection:'downward_pressure_with_rebound_risk',decemberDirectionConfidence:'low',
    decemberCalculationStart:'2026-10-16',decemberCalculationEnd:'2026-11-15'
  };
  for(const [key,value] of Object.entries(expected)) assert.equal(n[key],value,key+' independently checked source value');
  assert.equal(n.runKind,'scheduled_0900');
  assert.equal(n.scheduledReferenceTimeUsed,true);
  assert.match(n.lastUpdated,/^2026-11-12T/);
  assert(Date.parse(n.lastUpdated)>=Date.parse(cutoff),'actual modification is separate from source cutoff');
  assert.equal(n.windwardTrackedCrossings,n.windwardInboundCrossings+n.windwardOutboundCrossings);
  assert.equal(n.windwardTrackedCrossings,n.windwardAisTrackedCrossings+n.windwardDarkCrossings);
  assert.equal(Date.parse(n.windwardObservationWindowEnd)-Date.parse(n.windwardObservationWindowStart),24*60*60*1000);
  assert.match(n.windwardObservationWindowStartBasis,/computed.*duration.*end/,'start is derived from stated 24 hours and end');
  assert.equal(Date.parse(n.windwardSourceLastModifiedAt),Date.parse('2026-11-11T00:59:58Z'));
  assert.deepEqual(
    {asAt:n.imoHistoricalReference.asAt,count:n.imoHistoricalReference.confirmedIncidents,deaths:n.imoHistoricalReference.fatalities},
    {asAt:'2026-11-10',count:133,deaths:25}
  );
  beforeCutoff(n.imoHistoricalReference.sourceCheckedAt,'previously observed IMO historical reference');
  assert(Date.parse(n.imoLatestPageCheckedAt)>Date.parse(cutoff),'changed latest IMO page first read after cutoff');
  assert.match(n.imoLatestAvailabilityAtCutoff,/after_cutoff/);
  assert.equal(Date.parse(n.singaporeJetFirstSearchStartedAt),Date.parse('2026-11-12T08:59:53+09:00'));
  assert.equal(Date.parse(n.singaporeJetFirstSearchReturnedByUpperBound),Date.parse('2026-11-12T08:59:58+09:00'));
  beforeCutoff(n.singaporeJetFirstSearchReturnedByUpperBound,'Jet conservative search-return upper bound');
  assert.match(n.singaporeJetFirstSearchTimingMethod,/not_directly_measured/,'bound is not an invented exact retrieval clock');
  assert(Date.parse(n.singaporeJetSourceCheckedAt)>Date.parse(cutoff),'detail check remains separate from pre-cutoff search');
  assert.match(n.singaporeJetSourceAvailability,/not_first_publication/);
  assert.match(n.opecMomrProductionKind,/secondary_source.*not.*policy.*exports.*Hormuz/);
  assert.match(n.didamarVerificationStatus,/not_independently_verified/);
  for(const key of ['fxSourcePublishedAt','crudeSourcePublishedAt','crudeCorroboratingPublishedAt','windwardSourceLastModifiedAt','iataJetFuelSourceLastModifiedAt','eiaSteoPdfLastModifiedAt','opecMomrCorroboratingPublishedAt','didamarSourcePublishedAt']) beforeCutoff(n[key],key);
  assert.equal(n.fxReferenceSourceUrl,sourceUrls.fx);
  assert.equal(n.fxDaytimeCloseCorroboratingSourceUrl,sourceUrls.fxClose);
  assert.equal(n.crudeSourceUrl,sourceUrls.oil);
  assert.equal(n.crudeCorroboratingSourceUrl,sourceUrls.oilContracts);
  assert.equal(n.didamarSourceUrl,sourceUrls.didamar);
  for(const key of ['currentHormuzTraffic','hormuzLatestGulfCrudeFlowMillionBpd','decemberMopsUsdPerBbl','decemberAverageUsdKrw','decemberStageEstimate','decemberOfficialAmounts','crudeIntradayAt']) assert.equal(n[key],null,key+' not inferred');
}

function checkFeed(feed,n) {
  assert.equal(feed.meta.informationCutoff,cutoff);
  assert.equal(feed.meta.lastUpdated,n.lastUpdated);
  const input=feed.meta.inputs;
  const pairs={
    usdKrw:'usdKrw',usdKrwDailyChange:'usdKrwDailyChange',brentUSD:'brentUsdPerBbl',wtiUSD:'wtiUsdPerBbl',
    brentContract:'brentContractMonth',wtiContract:'wtiContractMonth',brentDailyChangeUSD:'brentDailyChangeUsd',wtiDailyChangeUSD:'wtiDailyChangeUsd',
    brentDailyChangePercent:'brentPct',wtiDailyChangePercent:'wtiPct',
    singaporeJetPrivateAssessmentUsdPerBbl:'singaporeJetFobReferenceUsdPerBbl',singaporeJetAssessmentDate:'singaporeJetFobReferenceDate',
    singaporeJetDailyChangeUSD:'singaporeJetDailyChangeUsd',imoConfirmedIncidents:'imoCumulativeConfirmedIncidents',
    imoListConfirmedIncidents:'imoListConfirmedIncidents',imoFatalities:'imoCumulativeFatalities',imoListDate:'imoListUpdated',
    fxSourceUrl:'fxReferenceSourceUrl',crudeSourceUrl:'crudeSourceUrl'
  };
  for(const [feedKey,numberKey] of Object.entries(pairs)) assert.equal(input[feedKey],n[numberKey],feedKey+' synchronized');
  const sameKeys=[
    'windwardTrackedCrossings','windwardInboundCrossings','windwardOutboundCrossings','windwardAisTrackedCrossings','windwardDarkCrossings',
    'windwardObservationDate','windwardReportDate','windwardObservationWindowStart','windwardObservationWindowEnd','windwardObservationWindowHours','windwardObservationWindowStartBasis',
    'iataJetFuelGlobalUsdPerBbl','iataJetFuelAsiaOceaniaUsdPerBbl','iataJetFuelWeekEnding','imoLatestConfirmedIncidentsAtCutoff','imoLatestFatalitiesAtCutoff',
    'eiaSteoReportDate','eiaSteoForecastCompletedDate','eiaSteoBrentSpotNovemberDecember2026ApproxUsdPerBbl','eiaSteoBrentSpotQ4_2027AverageUsdPerBbl',
    'eiaJetInventoryMillionBarrels','eiaJetInventoryPreviousMillionBarrels','eiaJetInventoryWeeklyChangeMillionBarrels','eiaJetInventoryWeekEnded','eiaJetInventoryReportDate',
    'opecMomrReportMonth','opecMomrObservationMonth','opecMomrDocCrudeProductionMillionBpd','opecMomrDocCrudeProductionMonthlyChangeMillionBpd',
    'singaporeJetPreviousAssessmentDate','singaporeJetFirstSearchReturnedByUpperBound','singaporeJetFirstSearchTimingMethod',
    'oilReferenceType','oilReferenceTime','didamarEventDate','didamarFacilityDestructionIndependentlyVerified'
  ];
  for(const key of sameKeys) assert.equal(input[key],n[key],key+' synchronized');
  assert.deepEqual(input.imoHistoricalReference,n.imoHistoricalReference);
  assert.equal(input.singaporeJetConfidence,'low');
  assert.equal(input.decemberOfficialMopsUsdPerBbl,null); assert.equal(input.decemberPeriodAverageUsdKrw,null);
  assert.match(input.fxKind,/15:30.*daytime_close/); assert.equal(input.fxObservationAt,'2026-11-11T15:30:00+09:00');
  assert.match(input.crudeKind,/settlement/); assert.equal(input.crudeObservationDate,'2026-11-11');
  for(const p of feed.forecasts) {
    assert.equal(p.targetPeriod,'2026.12'); assert.equal(p.direction,n.decemberDirection); assert.equal(p.confidence,'low');
    for(const key of ['predictedMin','predictedMax','officialStage','officialAmounts']) assert.equal(p[key],null);
  }
  assert.equal(feed.latest.informationCutoff,cutoff,'top-level latest cutoff is current');
  assert.equal(feed.latest.asOf,n.asOf,'top-level latest display cutoff agrees');
  assert.equal(feed.latest.runKind,n.runKind,'top-level latest execution kind agrees');
  assert.match(feed.latest.summary,/1,333\.6/,'latest summary has current FX');
  assert.match(feed.latest.summary,/92\.76/,'latest summary has current Brent');
  assert.match(feed.latest.summary,/86\.53/,'latest summary has current WTI');
  assert.match(feed.latest.summary,/145\.98/,'latest summary has dated Jet assessment');
  assert.doesNotMatch(feed.latest.summary,/1,337\.5|91\.49|86\.04|158\.55/);
}

function checkTranslations(release,cards) {
  const historicalWords={ko:/과거/,en:/historical/i,ja:/過去/,zh:/历史/,fr:/historique/i,de:/historisch/i};
  const unknownWords={ko:/미확인/,en:/unconfirmed|unverified|unavailable/i,ja:/未確認/,zh:/未确认|未核验|未核实/,fr:/non confirm|non vérifi|inconnu/i,de:/unbestätigt|nicht bestätigt|ungeklärt|unbekannt/i};
  for(const lang of langs) {
    const p=release.packs[lang], o=p.forecastOverview;
    assert.equal(release.rows[lang].length,5,lang+' established five indicators');
    assert.deepEqual(p.rows,release.rows[lang]);
    const marine=JSON.stringify(p.rows[4]);
    assert.match(marine,/133/); assert.doesNotMatch(marine,/\b134\b/,'post-cutoff count is withheld');
    assert.match(marine,historicalWords[lang],lang+' historical IMO label');
    assert.match(marine,unknownWords[lang],lang+' latest IMO unavailable label');
    assert(o,lang+' forecast overview');
    assert.equal(o.informationCutoff,cutoff);
    assert.equal(o.rows.length,5); assert.equal(o.columns.length,3);
    assert.deepEqual(o.rowTones,['hold','down','down','up','up'],lang+' current price and risk directions');
    for(const key of ['title','expectation','question','confidence','basis','risk','note']) {
      assert(typeof o[key]==='string' && o[key].trim(),lang+' overview '+key);
      if(lang!=='en') assert.notEqual(o[key],release.packs.en.forecastOverview[key],lang+' translated overview '+key);
    }
    assert(p.faq.length>0);
    p.faq.forEach((entry,i)=>{for(const key of ['q','a']) {
      assert(entry[key],lang+' FAQ '+i+' '+key);
      assert.doesNotMatch(entry[key],/1,337\.5|91\.49|86\.04|158\.55/,lang+' current FAQ has no superseded prices');
      if(lang!=='en') assert.notEqual(entry[key],release.packs.en.faq[i][key],lang+' translated FAQ');
    }});
    for(const key of ['desc','intro','verdict1']) {
      assert(typeof p[key]==='string' && p[key]);
      if(lang!=='en') assert.notEqual(p[key],release.packs.en[key],lang+' translated '+key);
    }
    for(const card of cards) {
      const item=card.i18n[lang]; assert(item,card.id+' '+lang);
      for(const key of ['title','summary','impact']) {
        assert(item[key],card.id+' '+lang+' '+key);
        if(lang!=='en') assert.notEqual(item[key],card.i18n.en[key],card.id+' translated '+key);
      }
      if(lang==='ko') assert.match(item.summary,/[가-힣]/);
      if(lang==='ja') assert.match(item.summary,/[ぁ-んァ-ン]/);
      if(lang==='zh') assert.match(item.summary,/[\u4e00-\u9fff]/);
    }
  }
}

function checkCards(cards,release) {
  assert.deepEqual(cards.map(c=>c.id).sort(),Array.from({length:6},(_,i)=>prefix+(i+1)).sort());
  const [fx,oil,jet,traffic,opec,didamar]=Array.from({length:6},(_,i)=>cards.find(c=>c.id===prefix+(i+1)));
  assert.equal(fx.sourceUrl,sourceUrls.fx); assert(fx.citationUrls.includes(sourceUrls.fxClose));
  assert.equal(fx.eventDate,'2026-11-11T15:30:00+09:00'); assert.equal(fx.sourcePublishedAt,'2026-11-11T18:35:50+09:00');
  assert.equal(oil.sourceUrl,sourceUrls.oil); assert(oil.citationUrls.includes(sourceUrls.oilContracts));
  assert.equal(oil.eventDate,'2026-11-11'); assert.equal(oil.sourcePublishedAt,'2026-11-12T05:57:00+09:00');
  assert.equal(oil.sourceUpdatedAt,'2026-11-12T06:01:37+09:00');
  assert.equal(oil.brentContractMonth,'2027-01'); assert.equal(oil.wtiContractMonth,'2026-12');
  assert.equal(jet.sourceUrl,sourceUrls.jet); assert(jet.citationUrls.includes(sourceUrls.jetCategory));
  assert.equal(jet.sourcePublishedAt,null); assert.equal(jet.observationDate,'2026-11-10');
  assert.equal(jet.previousAssessmentDate,'2026-11-06'); assert.equal(jet.assessmentConfidence,'low');
  assert.match(jet.assessmentKind,/private.*not_Platts_MOPS/);
  assert.equal(Date.parse(jet.sourceAvailabilityUpperBound),Date.parse('2026-11-12T08:59:58+09:00'));
  assert.match(jet.sourceAvailabilityMethod,/bound.*not_exact/);
  assert(Date.parse(jet.sourceVerifiedAt)>Date.parse(cutoff));
  assert.equal(traffic.sourceUrl,sourceUrls.traffic); assert.equal(traffic.sourcePublishedAt,null);
  assert.equal(traffic.observationStart,'2026-11-09T18:00:00Z'); assert.equal(traffic.observationEnd,'2026-11-10T18:00:00Z');
  assert.equal(traffic.observationHours,24); assert.equal(traffic.sourceReleaseDate,'2026-11-11');
  assert.match(traffic.observationStartBasis,/computed.*duration.*end/,'card distinguishes derived window start');
  assert.equal(opec.sourceUrl,sourceUrls.opecNews); assert(opec.citationUrls.includes(sourceUrls.opecReport));
  assert.equal(opec.sourcePublishedAt,'2026-11-11T18:18:13+05:00'); assert.equal(opec.eventDate,null);
  assert.equal(opec.officialReportSourcePublishedAt,null);
  assert.equal(opec.officialAppendixUrl,sourceUrls.opec); assert.equal(opec.officialAppendixValuesParsed,false);
  assert.equal(opec.observationPeriod,'2026-10'); assert.equal(opec.sourceReleaseDate,'2026-11-11');
  assert.match(opec.productionScope,/secondary_sources_not_exports_or_Hormuz_flow/);
  assert.equal(didamar.sourceUrl,sourceUrls.didamar); assert.equal(didamar.sourcePublishedAt,'2026-11-11T12:53:16-05:00');
  assert.equal(didamar.eventDate,null); assert.equal(didamar.claimAnnouncementDate,'2026-11-10');
  for(const key of ['damageExtent','navigationSystemsDestroyed','currentOilFlow']) assert.equal(didamar[key],null,key+' not inferred');
  assert.equal(didamar.relationshipToOtherIncidents,'not_established');
  assert.match(didamar.independentVisualVerification,/smoke_only.*not.*destruction/);
  for(const c of cards) {
    assert.equal(c.date,'2026-11-12'); assert.equal(c.dateKind,'site_update');
    assert.equal(c.updatedAt,release.modified); assert.equal(c.informationCutoff,cutoff);
    assert(Object.hasOwn(c,'sourcePublishedAt')); assert(Object.hasOwn(c,'eventDate'));
    if(c.sourcePublishedAt) {
      assert.match(c.sourcePublishedAt,/T\d\d:\d\d/,'release day must not become a publication clock');
      beforeCutoff(c.sourcePublishedAt,c.id+' publication');
    } else {
      const availability=[c.sourceLastModifiedAt,c.sourcePreviouslyObservedAt,c.sourceAvailabilityUpperBound].filter(Boolean);
      assert(availability.some(t=>Number.isFinite(Date.parse(t)) && Date.parse(t)<=Date.parse(cutoff)),c.id+' unknown publication needs separate pre-cutoff availability');
    }
    if(c.eventDate) beforeCutoff(c.eventDate,c.id+' observation');
    else assert.equal(c.eventDate,null,c.id+' unknown event date stays null');
    if(c.reportedDate) beforeCutoff(c.reportedDate,c.id+' report');
    if(c.sourceUpdatedAt) beforeCutoff(c.sourceUpdatedAt,c.id+' source update');
    const url=new URL(c.sourceUrl);
    assert.equal(url.protocol,'https:'); assert.notEqual(url.hostname,'aero-surcharge.com');
    assert(c.citationUrls.includes(c.sourceUrl));
  }
}

async function newPage(browser,baseline=false) {
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  await page.clock.setFixedTime(new Date(cutoff));
  page._blockedUrls=new Set();
  await page.route('**/*',route=>{
    const url=new URL(route.request().url());
    if(url.origin!==origin) {page._blockedUrls.add(url.origin+url.pathname);return route.abort();}
    if(baseline && url.pathname==='/market-nov12.js') return route.fulfill({contentType:'application/javascript',body:'/* Pre-Nov12 baseline. */'});
    if(baseline && url.pathname==='/_shared.js') return route.fulfill({contentType:'application/javascript',body:previousShared});
    return route.continue();
  });
  return page;
}
async function state(page) {
  return page.evaluate(()=>{
    function flatten(value) {
      if(Array.isArray(value)) return value.flatMap(flatten);
      return value && value['@graph'] ? flatten(value['@graph']) : [value];
    }
    const table=document.querySelector('#indicatorTbody') || document.querySelector('.indicator-table tbody') || document.querySelector('.fore-tbl tbody');
    const overview=document.querySelector('#forecastOutlookSummary'), b=overview?.getBoundingClientRect();
    return {
      n:window.AERO_MARKET_NUMBERS_LATEST,r:window.AERO_MARKET_RELEASE,
      body:document.body.innerText,title:document.title,h1:document.querySelector('h1').textContent,
      canonical:document.querySelector('link[rel="canonical"]').href,
      metaDescription:document.querySelector('meta[name="description"]')?.content,
      openGraphTitle:document.querySelector('meta[property="og:title"]')?.content,
      schemas:[...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(el=>flatten(JSON.parse(el.textContent))),
      rows:table ? [...table.rows].map(row=>[...row.cells].map(cell=>cell.innerText)) : [],
      rowTones:table ? [...table.rows].map(row=>row.cells[2]?.className) : [],
      newsBriefRows:[...document.querySelectorAll('#sep04NewsBrief li')].map(el=>el.innerText),
      visibleCards:[...document.querySelectorAll('.news-card')].map(card=>({
        id:card.id,title:card.querySelector('.news-title')?.textContent,summary:card.querySelector('.news-summary')?.textContent,
        impact:card.querySelector('.news-impact')?.textContent,hrefs:[...card.querySelectorAll('a[href]')].map(a=>a.href)
      })),
      faq:document.querySelector('#forecastFaqBox')?.innerText || '',overview:overview?.innerText || '',
      overviewBounds:b ? {top:b.top,width:b.width,height:b.height,viewportHeight:innerHeight} : null,
      officialDescription:document.querySelector('#officialDesc')?.innerText || '',
      overflow:document.documentElement.scrollWidth>innerWidth
    };
  });
}

(async()=>{
  let browser,server;
  const reports=[];
  try {
    if(!process.env.AERO_QA_ORIGIN) {
      server=spawn(process.execPath,[path.join(__dirname,'serve_local.js')],{cwd:root,env:{...process.env,PORT:String(port)},stdio:['ignore','pipe','pipe']});
      await new Promise((resolve,reject)=>{
        const timer=setTimeout(()=>reject(Error('Local server timeout')),10000);
        server.stdout.on('data',b=>{if(String(b).includes('Local review server')){clearTimeout(timer);resolve();}});
        server.on('error',e=>{clearTimeout(timer);reject(e);});
        server.on('exit',code=>{clearTimeout(timer);reject(Error('Local server exited '+code));});
      });
    }
    browser=await chromium.launch();
    const baseline=await newPage(browser,true);
    await baseline.goto(origin+'/news'); await baseline.waitForTimeout(1800);
    const preceding=await baseline.evaluate(keys=>({
      cards:window.AERO_MARKET_RELEASE.newsCards,manual:window.AERO_MARKET_NUMBERS_20261111,scheduled:window.AERO_MARKET_NUMBERS_20261111_0900,
      snapshots:Object.fromEntries(keys.map(key=>[key,window.AERO_MARKET_SNAPSHOTS[key]]))
    }),precedingSnapshotKeys);
    const historicalCards=preceding.cards;
    assert.equal(historicalCards.length,155,'155 preceding news cards');
    assert(!historicalCards.some(c=>c.id.startsWith(prefix)));
    assert.equal(preceding.manual.informationCutoff,'2026-11-11T08:30:00+09:00');
    assert.equal(preceding.scheduled.informationCutoff,'2026-11-11T09:00:00+09:00');
    await baseline.close();
    async function checkPreservedSnapshots(page) {
      const c=await page.evaluate(keys=>({
        manual:window.AERO_MARKET_NUMBERS_20261111,scheduled:window.AERO_MARKET_NUMBERS_20261111_0900,
        snapshots:Object.fromEntries(keys.map(key=>[key,window.AERO_MARKET_SNAPSHOTS[key]])),
        today:window.AERO_MARKET_NUMBERS_20261112,day:window.AERO_MARKET_SNAPSHOTS['2026-11-12'],
        timed:window.AERO_MARKET_SNAPSHOTS['2026-11-12T09:00:00+09:00'],latest:window.AERO_MARKET_NUMBERS_LATEST,
        distinct:window.AERO_MARKET_NUMBERS_20261112!==window.AERO_MARKET_NUMBERS_20261111_0900
      }),precedingSnapshotKeys);
      assert.deepEqual(c.manual,preceding.manual,'entire November 11 08:30 snapshot preserved');
      assert.deepEqual(c.scheduled,preceding.scheduled,'entire November 11 09:00 snapshot preserved');
      assert.deepEqual(c.snapshots,preceding.snapshots,'preceding date and timestamp registry entries preserved');
      assert(c.distinct); assert.deepEqual(c.today,c.day); assert.deepEqual(c.today,c.timed);
      // The established renderer adds legacy archive-only keys to LATEST.
      // Every field in today's explicit snapshot must still win unchanged.
      for(const [key,value] of Object.entries(c.today)) assert.deepEqual(c.latest[key],value,'latest preserves current snapshot field '+key);
      checkNumbers(c.today);
    }
    for(const name of ['forecast','news']) {
      const page=await newPage(browser), errors=[], consoleErrors=[];
      page.on('pageerror',error=>errors.push(error.message));
      page.on('console',m=>{if(m.type()==='error')consoleErrors.push({text:m.text(),url:m.location().url});});
      await page.goto(origin+'/'+name); await page.waitForTimeout(1800);
      const initial=await state(page), cards=initial.r.newsCards.filter(c=>c.id.startsWith(prefix));
      assert.deepEqual(initial.r.newsCards.filter(c=>!c.id.startsWith(prefix)),historicalCards,'all archived card fields and timestamps preserved');
      checkCards(cards,initial.r); checkTranslations(initial.r,cards); await checkPreservedSnapshots(page);
      const feed=await (await page.request.get(origin+'/data/forecast_feed.json')).json();
      checkFeed(feed,initial.n);
      for(const lang of langs) {
        await page.selectOption('#navLang',lang); await page.waitForTimeout(650);
        let publicationBeforeRefresh;
        if(name==='forecast') {
          publicationBeforeRefresh=await page.evaluate(()=>{
            const faq=[...document.querySelectorAll('script[type="application/ld+json"]')].map(el=>JSON.parse(el.textContent)).find(s=>s['@type']==='FAQPage');
            const published=faq?.datePublished; window.syncForecastStructuredData(); return published;
          });
          await page.waitForTimeout(100);
        }
        const x=await state(page), p=x.r.packs[lang];
        checkNumbers(x.n);
        assert.equal(x.canonical,'https://aero-surcharge.com/'+name);
        assert.equal(x.title,name==='news' ? p.newsMeta : p.meta);
        assert.equal(x.h1,name==='news' ? p.newsTitle : p.title);
        assert.equal(x.metaDescription,p.desc,lang+' current metadata');
        assert.equal(x.openGraphTitle,x.title,lang+' Open Graph title');
        const stageCarrier={ko:'대한항공',en:'Korean Air',ja:'大韓航空',zh:'大韩航空',fr:'Korean Air',de:'Korean Air'}[lang];
        assert(x.h1.includes(stageCarrier),lang+' current stage is scoped to Korean Air');
        assert.equal(x.overflow,false,name+' '+lang+' desktop overflow');
        assert.doesNotMatch(x.body,/undefined|\?\?\?\?|AERO_MARKET_NUMBERS|\ufffd/);
        assert.match(x.body,/09:00/,name+' cutoff visible');
        for(const number of [/1[, .]?333[.,]6/,/92[.,]76/,/86[.,]53/,/145[.,]98/,/178[.,]95/,/163[.,]26/,/133/]) assert.match(x.body,number,name+' '+lang+' dated values visible');
        const o=name==='forecast' && p.forecastOverview?.informationCutoff===cutoff ? p.forecastOverview : null;
        const modified=o && Date.parse(o.modifiedAt)>Date.parse(x.r.modified) ? o.modifiedAt : x.r.modified;
        for(const schema of x.schemas.filter(s=>/^(WebPage|CollectionPage|FAQPage)$/.test(s['@type']))) assert.equal(schema.dateModified,modified,name+' '+lang+' schema modification');
        if(name==='forecast') {
          assert(o,lang+' current forecast overview');
          assert.equal(normalize(await page.locator('[data-i18n="fore.myrealtrip.btn"]').innerText()),normalize(p.surface['fore.myrealtrip.btn']));
          assert.equal(await page.locator('[data-i18n="fore.cta.may"]').getAttribute('href'),'fuel-surcharge-calculator.html');
          for(const key of ['expectation','confidence','basis','risk','note']) assert(normalize(x.overview).includes(normalize(o[key])),lang+' visible overview '+key);
          assert.deepEqual(x.rows.map(row=>row.map(normalize)),o.rows.map(row=>row.map(normalize)),lang+' visible current rows');
          assert.deepEqual(x.rowTones,o.rowTones.map(tone=>'impact-'+tone),lang+' rendered direction classes');
          assert(x.overviewBounds && x.overviewBounds.top<x.overviewBounds.viewportHeight && x.overviewBounds.width>0,lang+' first-viewport outlook');
          const faq=x.schemas.find(s=>s['@type']==='FAQPage'); assert(faq);
          assert.equal(faq['@id'],x.canonical+'#faq'); assert.equal(faq.headline,x.h1); assert.equal(faq.description,p.desc);
          assert.equal(faq.inLanguage,lang); assert.equal(faq.datePublished,publicationBeforeRefresh);
          const expected=p.faq.map((entry,i)=>i===1 ? {q:o.question,a:o.expectation+'. '+o.confidence+'. '+o.basis+' '+o.risk+' '+o.note} : entry);
          assert.deepEqual(faq.mainEntity.map(q=>({q:q.name,a:q.acceptedAnswer.text})),expected);
          for(const entry of expected) {
            assert(normalize(x.faq).includes(normalize(entry.q)),lang+' visible FAQ question');
            assert(normalize(x.faq).includes(normalize(entry.a)),lang+' visible FAQ answer');
          }
        } else {
          for(const key of ['news.decisionMid','news.filterAirline']) assert.equal(normalize(await page.locator('[data-i18n="'+key+'"]').innerText()),normalize(p.surface[key]));
          assert.equal(normalize(x.officialDescription),normalize(p.officialDesc));
          assert.doesNotMatch(x.officialDescription,/10월 유류할증료 적용|October in force|Octobre en vigueur|Oktober gilt aktuell/);
          assert.deepEqual(x.newsBriefRows.map(normalize),p.rows.map(row=>normalize(row[0]+': '+row[1])),lang+' five current news indicators');
          for(const card of cards) {
            const item=card.i18n[lang], schema=x.schemas.find(s=>s['@type']==='NewsArticle' && s.url?.endsWith('#'+card.id));
            const visible=x.visibleCards.find(c=>c.id===card.id);
            assert(schema,card.id+' schema'); assert(visible,card.id+' rendered card');
            assert.equal(schema.articleBody,item.summary+' '+item.impact); assert.equal(schema.headline,item.title);
            assert.equal(normalize(visible.title),normalize(item.title));
            assert.equal(normalize(visible.summary),normalize(item.summary)); assert.equal(normalize(visible.impact),normalize(item.impact));
            assert(visible.hrefs.includes(card.sourceUrl),card.id+' visible original source link');
          }
        }
        await page.setViewportSize({width:390,height:844}); await page.waitForTimeout(180);
        const mobile=await state(page);
        assert.equal(mobile.overflow,false,name+' '+lang+' mobile overflow'); assert.equal(mobile.title,x.title);
        if(name==='forecast') {
          assert.deepEqual(mobile.rows,x.rows,lang+' mobile indicators');
          assert(mobile.overviewBounds && mobile.overviewBounds.top<mobile.overviewBounds.viewportHeight && mobile.overviewBounds.width>0,lang+' mobile first-viewport outlook');
        } else assert.deepEqual(mobile.newsBriefRows,x.newsBriefRows,lang+' mobile brief');
        await page.setViewportSize({width:1440,height:1000});
      }
      await page.selectOption('#navLang','ko'); await page.waitForTimeout(650);
      const deny=page.locator('#aeroConsentDeny'); if(await deny.isVisible()) await deny.click();
      await page.mouse.move(0,0);
      await page.screenshot({path:path.join(out,name+'-desktop.png'),fullPage:true});
      await page.screenshot({path:path.join(out,name+'-desktop-top.png')});
      await page.setViewportSize({width:390,height:844}); await page.waitForTimeout(500);
      const before=await state(page); assert.equal(before.overflow,false);
      await page.screenshot({path:path.join(out,name+'-mobile.png'),fullPage:true});
      await page.screenshot({path:path.join(out,name+'-mobile-top.png')});
      await page.waitForTimeout(12000);
      const after=await state(page);
      for(const key of ['title','h1','overview','metaDescription']) assert.equal(after[key],before[key],name+' delayed '+key);
      assert.deepEqual(after.rows,before.rows,name+' delayed indicators');
      assert.deepEqual(after.visibleCards,before.visibleCards,name+' delayed news cards');
      assert.deepEqual(after.r.newsCards.filter(c=>!c.id.startsWith(prefix)),historicalCards,name+' delayed archive equality');
      for(const schema of after.schemas.filter(s=>/^(WebPage|CollectionPage|FAQPage)$/.test(s['@type']))) assert.equal(schema.dateModified,after.r.modified,name+' delayed schema modification');
      if(name==='news') for(const card of after.r.newsCards) {
        const schema=after.schemas.find(s=>s['@type']==='NewsArticle' && s.url?.endsWith('#'+card.id));
        if(schema) assert.equal(schema.dateModified,card.updatedAt,card.id+' preserved individual article modification');
      }
      await checkPreservedSnapshots(page); assert.equal(after.overflow,false); assert.deepEqual(errors,[]);
      const unexpectedConsole=consoleErrors.filter(e=>!(e.text==='Failed to load resource: net::ERR_FAILED' && page._blockedUrls.has((e.url||'').split('?')[0])));
      assert.deepEqual(unexpectedConsole,[],name+' unexpected console errors');
      reports.push({page:name,locales:langs,historicalCards:155,newCards:6,previousSnapshots:'exactly preserved',desktopAndMobile:true,delayedStabilitySeconds:12,errors,consoleErrors,unexpectedConsole});
      await page.close();
      console.log(name+': six locales, source values/cutoff/schema, 155 archived cards, November 11 snapshots, mobile and 12-second stability PASS');
    }
    const graph=await newPage(browser), graphErrors=[];
    graph.on('pageerror',e=>graphErrors.push(e.message));
    await graph.goto(origin+'/fuel-surcharge-graph'); await graph.waitForTimeout(1500);
    assert(await graph.evaluate(()=>{
      const c=document.querySelector('#graphCanvas');
      return c && c.width>0 && c.height>0 && c.getContext('2d').getImageData(0,0,c.width,c.height).data.some((v,i)=>i%4===3 && v>0);
    }),'graph canvas drawn');
    await graph.setViewportSize({width:390,height:844}); await graph.waitForTimeout(300);
    assert.equal(await graph.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    assert.deepEqual(graphErrors,[]);
    await graph.screenshot({path:path.join(out,'graph-mobile.png'),fullPage:true});
    fs.writeFileSync(path.join(out,'verification.json'),JSON.stringify({cutoff,reports,graph:'PASS',scope:'Local rendering and data consistency; external requests blocked. Source research is recorded separately.'},null,2));
    console.log('Graph nonblank/mobile PASS. Screenshots and report: '+out);
  } finally {
    if(browser) await browser.close();
    if(server) server.kill();
  }
})().catch(error=>{console.error(error);process.exitCode=1;});
