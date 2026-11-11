const {chromium} = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {spawn,execFileSync} = require('node:child_process');
const root = path.resolve(__dirname, '..'), port = Number(process.env.NOV11_0900_TEST_PORT || 4229);

const origin = process.env.AERO_QA_ORIGIN || 'http://127.0.0.1:' + port;
const out = path.join(os.tmpdir(), 'aero-nov11-0900-qa');
const langs = ['ko', 'en', 'ja', 'zh', 'fr', 'de'];
const prefix = 'market-20261111-0900-';
const cutoff = '2026-11-11T09:00:00+09:00';
const expectedNewCardCount = 2;
const normalize = text => String(text).replace(/\s+/g, ' ').trim();
fs.mkdirSync(out, {recursive:true});

function checkNumbers(n) {
  const expected = {
    informationCutoff:cutoff,currentMonth:'2026-11',currentStage:27,
    currentStageScope:'Korean_Air_reported_reference_not_common_to_all_airlines',octoberStatus:'archive',
    usdKrw:1337.5,usdKrwDate:'2026-11-10',usdKrwDailyChange:-9.6,usdKrwReferenceAt:'2026-11-10T15:30:00+09:00',
    brentUsdPerBbl:91.49,wtiUsdPerBbl:86.04,brentDailyChangeUsd:-1.08,wtiDailyChangeUsd:-0.81,
    brentPct:-1.2,wtiPct:-0.9,crudePriceDate:'2026-11-10',crudePriceKind:'settlement',
    brentContractMonth:'2027-01',wtiContractMonth:'2026-12',
    singaporeJetFobReferenceUsdPerBbl:158.55,singaporeJetFobReferenceDate:'2026-11-06',commodityScopeConfidence:'low',
    imoCumulativeConfirmedIncidents:133,imoLatestConfirmedIncidentsAtCutoff:133,imoLatestFatalitiesAtCutoff:25,
    imoListConfirmedIncidents:133,imoCumulativeFatalities:25,imoListUpdated:'2026-11-10',imoSourcePublishedAt:null,
    windwardTrackedCrossings:6,windwardInboundCrossings:3,windwardOutboundCrossings:3,windwardDarkCrossings:3,windwardAisTrackedCrossings:3,
    windwardObservationDate:'2026-11-09',windwardObservationWindowStart:null,windwardObservationWindowEnd:null,
    windwardReportDate:'2026-11-10',windwardSourcePublishedAt:null,windwardSourceLastModifiedAt:'2026-11-10T06:09:03Z',
    iataJetFuelGlobalUsdPerBbl:178.95,iataJetFuelGlobalWeeklyChangePct:-6.6,
    iataJetFuelAsiaOceaniaUsdPerBbl:163.26,iataJetFuelAsiaOceaniaWeeklyChangePct:-6,
    iataJetFuelWeekEnding:'2026-11-06',iataJetFuelSourcePublishedAt:null,
    eiaSteoReportDate:'2026-11-10',eiaSteoForecastCompletedDate:'2026-11-05',
    eiaSteoBrentSpotNovemberDecember2026ApproxUsdPerBbl:100,eiaSteoBrentSpotQ4_2027AverageUsdPerBbl:77,
    eiaSteoKind:'conditional_model_forecast_not_observed_spot_futures_or_MOPS',eiaSteoSourcePublishedAt:null,
    decemberDirection:'downward_pressure_with_rebound_risk',decemberDirectionConfidence:'low',
    decemberCalculationStart:'2026-10-16',decemberCalculationEnd:'2026-11-15'
  };
  for(const [key,value] of Object.entries(expected)) assert.equal(n[key],value,key+' independently checked source value');
  assert.equal(n.runKind,'scheduled_0900');
  assert.equal(n.scheduledReferenceTimeUsed,true,'scheduled cutoff has been reached');
  assert.match(n.lastUpdated,/^2026-11-11T/);
  assert(Date.parse(n.lastUpdated)>=Date.parse(cutoff));
  assert.equal(n.windwardTrackedCrossings,n.windwardInboundCrossings+n.windwardOutboundCrossings);
  assert.equal(n.windwardTrackedCrossings,n.windwardAisTrackedCrossings+n.windwardDarkCrossings);
  assert.equal(n.imoHistoricalReference.asAt,'2026-11-09');
  assert.equal(n.imoHistoricalReference.confirmedIncidents,131);
  assert(Date.parse(n.imoHistoricalReference.sourceCheckedAt)<Date.parse(cutoff));
  assert.equal(n.imoSourcePreviouslyObservedAt,'2026-11-11T08:30:56.838+09:00');
  assert.equal(n.adnocVesselIncidentIndependentVerification,false);
  assert.equal(n.adnocVesselIncidentClaimedEventDate,'2026-11-10');
  for(const key of ['adnocVesselIncidentVesselName','adnocVesselIncidentAttacker','adnocVesselIncidentCasualties','adnocVesselIncidentDisruptionSize','adnocVesselIncidentOperationalImpact']) assert.equal(n[key],null,key+' not inferred from company statement');
  for(const key of ['imoSourcePreviouslyObservedAt','crudeDailyChangeUsdSourcePublishedAt','adnocVesselIncidentSourcePublishedAt']) assert(Date.parse(n[key])<=Date.parse(cutoff),key+' cutoff-qualified availability');
  for(const key of ['fxSourcePublishedAt','crudeSourcePublishedAt','windwardSourceLastModifiedAt','iataJetFuelSourceLastModifiedAt','eiaSteoPdfLastModifiedAt']) {
    assert(Number.isFinite(Date.parse(n[key])),key+' availability evidence');
    assert(Date.parse(n[key])<=Date.parse(cutoff),key+' available by cutoff');
  }
  for(const key of ['currentHormuzTraffic','hormuzLatestGulfCrudeFlowMillionBpd','decemberMopsUsdPerBbl','decemberAverageUsdKrw','decemberStageEstimate','decemberOfficialAmounts','crudeIntradayAt']) assert.equal(n[key],null,key+' not inferred');
}

function checkFeed(feed,n) {
  assert.equal(feed.meta.informationCutoff,cutoff); assert.equal(feed.meta.lastUpdated,n.lastUpdated);
  const input=feed.meta.inputs;
  const pairs={usdKrw:'usdKrw',brentUSD:'brentUsdPerBbl',wtiUSD:'wtiUsdPerBbl',brentContract:'brentContractMonth',wtiContract:'wtiContractMonth',singaporeJetPrivateAssessmentUsdPerBbl:'singaporeJetFobReferenceUsdPerBbl',singaporeJetAssessmentDate:'singaporeJetFobReferenceDate',imoListConfirmedIncidents:'imoListConfirmedIncidents',imoFatalities:'imoCumulativeFatalities',imoListDate:'imoListUpdated',fxSourceUrl:'fxReferenceSourceUrl',crudeSourceUrl:'crudeSourceUrl'};
  for(const [feedKey,numberKey] of Object.entries(pairs)) assert.equal(input[feedKey],n[numberKey],feedKey+' synchronized');
  for(const key of ['windwardTrackedCrossings','windwardInboundCrossings','windwardOutboundCrossings','windwardObservationDate','windwardObservationWindowStart','windwardObservationWindowEnd','iataJetFuelGlobalUsdPerBbl','iataJetFuelAsiaOceaniaUsdPerBbl','iataJetFuelWeekEnding','imoLatestConfirmedIncidentsAtCutoff','imoLatestFatalitiesAtCutoff','eiaSteoReportDate','eiaSteoForecastCompletedDate','eiaSteoBrentSpotNovemberDecember2026ApproxUsdPerBbl','eiaSteoBrentSpotQ4_2027AverageUsdPerBbl']) assert.equal(input[key],n[key],key+' synchronized');
  assert.equal(input.singaporeJetConfidence,'low');
  assert.equal(input.decemberOfficialMopsUsdPerBbl,null); assert.equal(input.decemberPeriodAverageUsdKrw,null);
  assert.match(input.fxKind,/15:30.*daytime_close/); assert.equal(input.fxObservationAt,'2026-11-10T15:30:00+09:00');
  assert.match(input.crudeKind,/settlement/); assert.equal(input.crudeObservationDate,'2026-11-10');
  for(const p of feed.forecasts) {
    assert.equal(p.targetPeriod,'2026.12'); assert.equal(p.direction,n.decemberDirection); assert.equal(p.confidence,'low');
    for(const key of ['predictedMin','predictedMax','officialStage','officialAmounts']) assert.equal(p[key],null);
  }
}

function checkTranslations(release, cards) {
  for (const lang of langs) {
    const pack = release.packs[lang];
    assert.equal(release.rows[lang].length, 5, lang + ' exactly five established indicators');
    assert.deepEqual(pack.rows, release.rows[lang]);
    assert.doesNotMatch(JSON.stringify(pack.rows[4]),/\b131\b/,lang+' earlier historical count must not be the current value');
    assert.match(JSON.stringify(pack.rows[4]),/133/,lang+' cutoff-qualified IMO list count is visible');
    assert(pack.faq.length > 0, lang + ' FAQ exists');
    const overview = pack.forecastOverview;
    assert(overview, lang + ' current forecast overview exists');
    assert.equal(overview.informationCutoff, cutoff, lang + ' overview uses the current cutoff');
    assert.equal(overview.rows.length, 5, lang + ' overview has five rows');
    assert.equal(overview.columns.length, 3, lang + ' overview has three table columns');
    assert.equal(overview.rowTones.length, 5, lang + ' all five indicators have a tone');
    for (const key of ['title', 'expectation', 'question', 'confidence', 'basis', 'risk', 'note']) {
      assert.equal(typeof overview[key], 'string', lang + ' forecast overview ' + key);
      assert(overview[key].trim(), lang + ' nonempty forecast overview ' + key);
      if (lang !== 'en') assert.notEqual(overview[key], release.packs.en.forecastOverview[key], lang + ' translated forecast overview ' + key);
    }
    pack.faq.forEach((entry, i) => {
      for (const key of ['q', 'a']) {
        assert(entry[key], lang + ' nonempty FAQ ' + i + ' ' + key);
        assert.doesNotMatch(entry[key], /1,347\.1|92\.57|86\.85/, lang + ' current FAQ must not retain superseded prices');
        if (lang !== 'en') assert.notEqual(entry[key], release.packs.en.faq[i][key], lang + ' translated FAQ ' + i + ' ' + key);
      }
    });
    for (const key of ['desc', 'intro', 'verdict1']) {
      assert(pack[key] && typeof pack[key] === 'string', lang + ' ' + key);
      if (lang !== 'en') assert.notEqual(pack[key], release.packs.en[key], lang + ' ' + key + ' must be translated');
    }
    for (const card of cards) {
      const localized = card.i18n[lang];
      assert(localized, card.id + ' ' + lang);
      for (const key of ['title', 'summary', 'impact']) {
        assert(localized[key], card.id + ' ' + lang + ' ' + key);
        if (lang !== 'en') assert.notEqual(localized[key], card.i18n.en[key], card.id + ' ' + lang + ' English fallback');
      }
      if (lang === 'ko') assert.match(localized.summary, /[가-힣]/);
      if (lang === 'ja') assert.match(localized.summary, /[ぁ-んァ-ン]/);
      if (lang === 'zh') assert.match(localized.summary, /[\u4e00-\u9fff]/);
    }
  }
}

async function newPage(browser, withoutNewRelease = false) {
  const page = await browser.newPage({viewport:{width:1440,height:1000}});
  await page.clock.setFixedTime(new Date(cutoff));
  page._blockedUrls = new Set();

  await page.route('**/*', route => {
    const url = new URL(route.request().url());
    if (url.origin !== origin) {page._blockedUrls.add(url.origin + url.pathname); return route.abort();}
    if (withoutNewRelease && url.pathname === '/market-nov11-0900.js') return route.fulfill({contentType:'application/javascript',body:'/* Previous release baseline for archive comparison. */'});
    return route.continue();
  });
  return page;
}

async function state(page) {
  return page.evaluate(() => {
    function flatten(value) {
      if (Array.isArray(value)) return value.flatMap(flatten);
      return value && value['@graph'] ? flatten(value['@graph']) : [value];
    }
    const table = document.querySelector('#indicatorTbody') || document.querySelector('.indicator-table tbody') || document.querySelector('.fore-tbl tbody');
    return {
      n:window.AERO_MARKET_NUMBERS_LATEST, r:window.AERO_MARKET_RELEASE,
      body:document.body.innerText, title:document.title,
      h1:document.querySelector('h1').textContent,
      canonical:document.querySelector('link[rel="canonical"]').href,
      schemas:[...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(script => flatten(JSON.parse(script.textContent))),
      rows:table ? [...table.rows].map(row => [...row.cells].map(cell => cell.innerText)) : [],
      newsBriefRows:[...document.querySelectorAll('#sep04NewsBrief li')].map(el => el.innerText),
      visibleCards:[...document.querySelectorAll('.news-card')].map(card => ({
        id:card.id, title:card.querySelector('.news-title')?.textContent,
        summary:card.querySelector('.news-summary')?.textContent,
        impact:card.querySelector('.news-impact')?.textContent,
        hrefs:[...card.querySelectorAll('a[href]')].map(a => a.href)
      })),
      faq:document.querySelector('#forecastFaqBox')?.innerText || '',
      overview:document.querySelector('#forecastOutlookSummary')?.innerText || '',
      officialDescription:document.querySelector('#officialDesc')?.innerText || '',
      overflow:document.documentElement.scrollWidth > innerWidth
    };
  });
}

(async () => {
  let browser, server;
  const reports = [];
  try {
    if (!process.env.AERO_QA_ORIGIN) {
      server = spawn(process.execPath, [path.join(__dirname,'serve_local.js')], {cwd:root,env:{...process.env,PORT:String(port)},stdio:['ignore','pipe','pipe']});
      await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Local server timeout')),10000);server.stdout.on('data',b=>{if(String(b).includes('Local review server')){clearTimeout(timer);resolve();}});server.on('error',e=>{clearTimeout(timer);reject(e);});server.on('exit',code=>{clearTimeout(timer);reject(Error('Local server exited '+code));});});
    }
    browser = await chromium.launch();
    // Load the preceding release through the same page, omitting only today's extension.
    const baselinePage = await newPage(browser, true);
    await baselinePage.goto(origin + '/news');
    await baselinePage.waitForTimeout(1800);
    const historicalCards = await baselinePage.evaluate(() => window.AERO_MARKET_RELEASE.newsCards);
    assert.equal(historicalCards.length, 153, 'all 153 cards through the November 11 08:30 run remain in the preceding release');
    assert(!historicalCards.some(card => card.id.startsWith(prefix)));
    await baselinePage.close();

    for (const name of ['forecast', 'news']) {
      const page = await newPage(browser), errors = [];
      page.on('pageerror', error => errors.push(error.message));
      const consoleErrors=[];
      page.on('console', m=>{if(m.type()==='error')consoleErrors.push({text:m.text(),url:m.location().url});});
      await page.goto(origin + '/' + name);
      await page.waitForTimeout(1800);
      const initial = await state(page);
      const cards = initial.r.newsCards.filter(card => card.id.startsWith(prefix));
      assert(Number.isInteger(expectedNewCardCount) && expectedNewCardCount > 0, 'set the independently reviewed November 11 card count');
      assert.deepEqual(cards.map(card => card.id).sort(), Array.from({length:expectedNewCardCount}, (_, i) => prefix + (i + 1)).sort());
      assert.deepEqual(initial.r.newsCards.filter(card => !card.id.startsWith(prefix)), historicalCards, 'historical cards and timestamps preserved');
      checkTranslations(initial.r, cards);
      const imoCard = cards.find(card => card.id === prefix + '1');
      assert.equal(imoCard.sourcePublishedAt, null, 'IMO exact publication clock is unknown');
      assert.equal(imoCard.sourcePreviouslyObservedAt, '2026-11-11T08:30:56.838+09:00', 'IMO availability was observed before scheduled cutoff');
      assert.equal(imoCard.eventDate, null, 'list as-at date is not an event date');
      assert.equal(imoCard.observationDate, '2026-11-10');
      assert.deepEqual(imoCard.listedEventDates, ['2026-11-07','2026-11-03']);
      const wamCard = cards.find(card => card.id === prefix + '2');
      assert.equal(Date.parse(wamCard.sourcePublishedAt),Date.parse('2026-11-10T18:42:05+04:00'));
      assert.equal(wamCard.eventDate,'2026-11-10');
      const earlier=await page.evaluate(()=>({n:window.AERO_MARKET_NUMBERS_20261111,snapshot:window.AERO_MARKET_SNAPSHOTS['2026-11-11T08:30:00+09:00'],current:window.AERO_MARKET_SNAPSHOTS['2026-11-11T09:00:00+09:00']}));
      assert.equal(earlier.n.informationCutoff,'2026-11-11T08:30:00+09:00');
      assert.equal(earlier.n.imoCumulativeConfirmedIncidents,null);
      assert.equal(earlier.n.imoListConfirmedIncidents,131);
      assert.equal(earlier.n.brentDailyChangeUsd,null);
      assert.deepEqual(earlier.n,earlier.snapshot);
      assert.equal(earlier.current.informationCutoff,cutoff);
      assert.equal(earlier.current.imoCumulativeConfirmedIncidents,133);
      for (const card of cards) {
        assert.equal(card.date, '2026-11-11');
        assert.equal(card.dateKind, 'site_update');
        assert.equal(card.updatedAt, initial.r.modified);
        assert(Object.hasOwn(card,'sourcePublishedAt'), card.id + ' explicit publication availability');
        assert(Object.hasOwn(card, 'eventDate'), card.id + ' event date is present or explicitly unknown');
        if(card.reportedDate) assert(Date.parse(card.reportedDate) <= Date.parse(cutoff),card.id+' dated source before cutoff');
        if(!card.sourcePublishedAt){const availability=[card.sourceLastModifiedAt,card.sourcePreviouslyObservedAt,card.sourceVerifiedAt].filter(Boolean);assert(availability.some(t=>Number.isFinite(Date.parse(t))&&Date.parse(t)<=Date.parse(cutoff)),card.id+' unknown publication requires separate pre-cutoff availability evidence');}
        if (card.eventDate) assert(Date.parse(card.eventDate) <= Date.parse(cutoff), card.id + ' observation before cutoff');
        else {
          assert.equal(card.eventDate, null, card.id + ' an unknown event day must remain null');
          if (card.observationPeriod) assert.equal(typeof card.observationPeriod, 'string', card.id + ' a monthly observation must not invent a one-day event');
        }
        if (card.sourceUpdatedAt) assert(Date.parse(card.sourceUpdatedAt) <= Date.parse(cutoff), card.id + ' source update before cutoff');
        const url = new URL(card.sourceUrl);
        assert.equal(url.protocol, 'https:');
        assert.notEqual(url.hostname, 'aero-surcharge.com', card.id + ' external evidence');
        assert(card.citationUrls.includes(card.sourceUrl));
      }
      const feed = await (await page.request.get(origin + '/data/forecast_feed.json')).json();
      checkFeed(feed, initial.n);

      for (const lang of langs) {
        await page.selectOption('#navLang', lang);
        await page.waitForTimeout(650);
        let publicationBeforeRefresh;
        if(name==='forecast'){
          publicationBeforeRefresh=await page.evaluate(()=>{
            const faq=[...document.querySelectorAll('script[type="application/ld+json"]')].map(n=>JSON.parse(n.textContent)).find(n=>n['@type']==='FAQPage');
            const published=faq?.datePublished;
            window.syncForecastStructuredData();
            return published;
          });
          await page.waitForTimeout(100);
        }
        const x = await state(page), pack = x.r.packs[lang];
        checkNumbers(x.n);
        assert.equal(x.canonical, 'https://aero-surcharge.com/' + name);
        assert.equal(x.title, name === 'news' ? pack.newsMeta : pack.meta);
        assert.equal(x.h1, name === 'news' ? pack.newsTitle : pack.title);
        const stageCarrier = {ko:'대한항공',en:'Korean Air',ja:'大韓航空',zh:'大韩航空',fr:'Korean Air',de:'Korean Air'}[lang];
        assert(x.h1.includes(stageCarrier), lang + ' current stage is scoped to Korean Air');
        assert.equal(x.overflow, false, name + ' ' + lang + ' desktop overflow');
        assert.doesNotMatch(x.body, /undefined|\?\?\?\?|AERO_MARKET_NUMBERS|\ufffd/);
        assert.match(x.body,/09:00/,name+' scheduled execution cutoff is visible');
        for (const number of [/1[, .]?337[.,]5/, /91[.,]49/, /86[.,]04/, /158[.,]55/, /178[.,]95/, /163[.,]26/, /133/]) assert.match(x.body, number, name + ' ' + lang + ' dated reference values visible');
        const overview = name === 'forecast' && pack.forecastOverview?.informationCutoff === cutoff ? pack.forecastOverview : null;
        const pageModified = overview && Date.parse(overview.modifiedAt) > Date.parse(x.r.modified) ? overview.modifiedAt : x.r.modified;
        for (const schema of x.schemas.filter(s => /^(WebPage|CollectionPage|FAQPage)$/.test(s['@type']))) assert.equal(schema.dateModified, pageModified, name+' '+lang+' current page schema date');
        if (name === 'forecast') {
          const cta=page.locator('[data-i18n="fore.myrealtrip.btn"]');
          assert.equal(normalize(await cta.innerText()),normalize(pack.surface['fore.myrealtrip.btn']),lang+' translated airfare CTA');
          assert.equal(await page.locator('[data-i18n="fore.cta.may"]').getAttribute('href'),'fuel-surcharge-calculator.html','current month comparison opens the calculator');
          assert(overview, lang + ' the visible forecast must use the current overview');
          for (const key of ['expectation', 'confidence', 'basis', 'risk', 'note']) assert(normalize(x.overview).includes(normalize(overview[key])), lang + ' visible overview ' + key);
          assert.deepEqual(x.rows.map(row => row.map(normalize)), (overview?.rows || pack.rows).map(row => row.map(normalize)), lang + ' visible five-row table matches release');
          const faq = x.schemas.find(s => s['@type'] === 'FAQPage');
          assert(faq, lang + ' FAQ schema');
          assert.equal(faq['@id'],x.canonical+'#faq',lang+' FAQ canonical identity survives regeneration');
          assert.equal(faq.headline,x.h1,lang+' FAQ title matches the current page');
          assert.equal(faq.description,pack.desc,lang+' FAQ description matches current metadata');
          assert.equal(faq.inLanguage,lang,lang+' FAQ language survives regeneration');
          assert.equal(faq.datePublished,publicationBeforeRefresh,lang+' original FAQ publication is preserved');
          const expectedFaq = pack.faq.map((entry, i) => overview && i === 1 ? {q:overview.question,a:overview.expectation+'. '+overview.confidence+'. '+overview.basis+' '+overview.risk+' '+overview.note} : entry);
          assert.deepEqual(faq.mainEntity.map(q => ({q:q.name,a:q.acceptedAnswer.text})), expectedFaq);
          for (const entry of expectedFaq) {
            assert(normalize(x.faq).includes(normalize(entry.q)), lang + ' visible FAQ question');
            assert(normalize(x.faq).includes(normalize(entry.a)), lang + ' visible FAQ answer');
          }
        } else {
          for(const key of ['news.decisionMid','news.filterAirline'])assert.equal(normalize(await page.locator('[data-i18n="'+key+'"]').innerText()),normalize(pack.surface[key]),lang+' translated '+key);
          assert.equal(normalize(x.officialDescription), normalize(pack.officialDesc), lang + ' current notice period is consistent');
          assert.doesNotMatch(x.officialDescription, /10월 유류할증료 적용|October in force|Octobre en vigueur|Oktober gilt aktuell/);
          assert.equal(x.newsBriefRows.length, 5, lang + ' news brief retains five indicators');
          for (const card of cards) {
            const localized = card.i18n[lang];
            const schema = x.schemas.find(s => s['@type'] === 'NewsArticle' && s.url?.endsWith('#' + card.id));
            const visible = x.visibleCards.find(c => c.id === card.id);
            assert(schema, card.id + ' schema');
            assert(visible, card.id + ' visible card');
            assert.equal(schema.articleBody, localized.summary + ' ' + localized.impact);
            assert.equal(schema.headline, localized.title);
            assert.equal(normalize(visible.title), normalize(localized.title));
            assert.equal(normalize(visible.summary), normalize(localized.summary));
            assert.equal(normalize(visible.impact), normalize(localized.impact));
            assert(visible.hrefs.includes(card.sourceUrl), card.id + ' visible source link');
          }
        }
      }

      await page.selectOption('#navLang', 'ko');
      await page.waitForTimeout(650);
      const deny = page.locator('#aeroConsentDeny');
      if (await deny.isVisible()) await deny.click();
      await page.screenshot({path:path.join(out, name + '-desktop.png'),fullPage:true});
      await page.screenshot({path:path.join(out, name + '-desktop-top.png')});
      await page.setViewportSize({width:390,height:844});
      await page.waitForTimeout(500);
      const before = await state(page);
      assert.equal(before.overflow, false, name + ' mobile overflow');
      await page.screenshot({path:path.join(out, name + '-mobile.png'),fullPage:true});
      await page.screenshot({path:path.join(out, name + '-mobile-top.png')});
      await page.waitForTimeout(12000);
      const after = await state(page);
      assert.equal(after.title, before.title, name + ' delayed title stability');
      assert.equal(after.h1, before.h1, name + ' delayed heading stability');
      assert.deepEqual(after.rows, before.rows, name + ' delayed indicator stability');
      assert.equal(after.overview, before.overview, name + ' delayed outlook stability');
      assert.deepEqual(after.visibleCards, before.visibleCards, name + ' delayed card stability');
      for (const schema of after.schemas.filter(s => /^(WebPage|CollectionPage|FAQPage)$/.test(s['@type']))) assert.equal(schema.dateModified, after.r.modified, name+' delayed page schema date');
      if(name==='news') for(const card of after.r.newsCards){
        const schema=after.schemas.find(s=>s['@type']==='NewsArticle' && s.url?.endsWith('#'+card.id));
        if(schema) assert.equal(schema.dateModified,card.updatedAt,name+' delayed article date '+card.id);
      }
      checkNumbers(after.n);
      assert.equal(after.overflow, false);
      assert.deepEqual(errors, [], name + ' page JavaScript errors');
      const unexpectedConsole=consoleErrors.filter(e=>!(e.text==='Failed to load resource: net::ERR_FAILED' && page._blockedUrls.has((e.url||'').split('?')[0])));
      assert.deepEqual(unexpectedConsole, [], name+' unexpected console errors');
      reports.push({page:name,consoleErrors,unexpectedConsole,locales:langs,historicalCards:historicalCards.length,newCards:cards.length,errors,desktopAndMobile:true,delayedStabilitySeconds:12});
      await page.close();
      console.log(name + ': six locales, sources/schema, historical cards, mobile and delayed stability PASS');
    }

    const graph = await newPage(browser), graphErrors = [];
    graph.on('pageerror', error => graphErrors.push(error.message));
    await graph.goto(origin + '/fuel-surcharge-graph');
    await graph.waitForTimeout(1500);
    assert(await graph.evaluate(() => {
      const canvas = document.querySelector('#graphCanvas');
      return canvas && canvas.width > 0 && canvas.height > 0 && canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data.some((value,index) => index % 4 === 3 && value > 0);
    }), 'graph canvas is drawn');
    await graph.setViewportSize({width:390,height:844});
    await graph.waitForTimeout(300);
    assert.equal(await graph.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    assert.deepEqual(graphErrors, []);
    await graph.screenshot({path:path.join(out,'graph-mobile.png'),fullPage:true});
    fs.writeFileSync(path.join(out,'verification.json'), JSON.stringify({cutoff,reports,graph:'PASS',scope:'Local rendering with external requests blocked; remote source reachability checked separately.'},null,2));
    console.log('Graph nonblank/mobile PASS. Screenshots and report: ' + out);
  } finally {
    if (browser) await browser.close();
    if (server) server.kill();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
