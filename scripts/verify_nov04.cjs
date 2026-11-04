const {chromium} = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const origin = process.env.AERO_QA_ORIGIN || 'http://127.0.0.1:4173';
const out = path.join(os.tmpdir(), 'aero-nov04-qa');
const langs = ['ko', 'en', 'ja', 'zh', 'fr', 'de'];
const prefix = 'market-20261104-';
const cutoff = '2026-11-04T09:00:00+09:00';
const normalize = text => String(text).replace(/\s+/g, ' ').trim();
fs.mkdirSync(out, {recursive:true});

function checkNumbers(n) {
  assert.equal(n.informationCutoff, cutoff);
  assert.equal(n.currentMonth, '2026-11');
  assert.equal(n.currentStage, 27);
  assert.equal(n.octoberStatus, 'archive');
  assert.equal(n.novemberEffectiveFrom, '2026-11-01');
  assert.equal(n.novemberEffectiveTo, '2026-11-30');
  assert.equal(n.usdKrw, 1341);
  assert.equal(n.usdKrwDate, '2026-11-03');
  assert.equal(n.usdKrwDailyChange, -2.8);
  assert.equal(n.brentUsdPerBbl, 103.60);
  assert.equal(n.wtiUsdPerBbl, 96.09);
  assert.equal(n.crudePriceDate, '2026-11-03');
  assert.equal(n.crudePriceKind, 'settlement');
  assert.equal(n.brentContractMonth, '2027-01');
  assert.equal(n.wtiContractMonth, '2026-12');
  assert.equal(n.singaporeJetFobReferenceUsdPerBbl, 165.55);
  assert.equal(n.singaporeJetFobReferenceDate, '2026-11-02');
  assert.equal(n.commodityScopeConfidence, 'low');
  assert.equal(n.imoCumulativeConfirmedIncidents, 128);
  assert.equal(n.imoCumulativeFatalities, 24);
  assert.equal(n.imoListUpdated, '2026-11-03');
  assert.equal(n.windwardTrackedCrossings, 7);
  assert.equal(n.windwardInboundCrossings, 5);
  assert.equal(n.windwardOutboundCrossings, 2);
  assert.equal(n.windwardObservationDate, '2026-11-02');
  assert.equal(n.windwardReportDate, '2026-11-03');
  assert.equal(n.currentHormuzTraffic, null, 'provider sample must not become exhaustive traffic');
  for (const key of ['decemberMopsUsdPerBbl', 'decemberAverageUsdKrw', 'decemberStageEstimate', 'decemberOfficialAmounts', 'crudeIntradayAt']) {
    assert.equal(n[key], null, key + ' must stay unavailable');
  }
  assert.equal(n.decemberCalculationStart, '2026-10-16');
  assert.equal(n.decemberCalculationEnd, '2026-11-15');
}

function checkFeed(feed, n) {
  assert.equal(feed.meta.informationCutoff, cutoff);
  assert.equal(feed.meta.lastUpdated, n.lastUpdated);
  const input = feed.meta.inputs;
  assert.equal(input.usdKrw, n.usdKrw);
  assert.equal(input.brentUSD, n.brentUsdPerBbl);
  assert.equal(input.wtiUSD, n.wtiUsdPerBbl);
  assert.equal(input.brentContract, n.brentContractMonth);
  assert.equal(input.wtiContract, n.wtiContractMonth);
  assert.equal(input.singaporeJetPrivateAssessmentUsdPerBbl, n.singaporeJetFobReferenceUsdPerBbl);
  assert.equal(input.singaporeJetAssessmentDate, n.singaporeJetFobReferenceDate);
  assert.equal(input.singaporeJetConfidence, 'low');
  assert.equal(input.imoConfirmedIncidents, 128);
  assert.equal(input.imoFatalities, n.imoCumulativeFatalities);
  assert.equal(input.imoListDate, n.imoListUpdated);
  for (const key of ['windwardTrackedCrossings', 'windwardInboundCrossings', 'windwardOutboundCrossings', 'windwardObservationDate', 'windwardReportDate']) assert.equal(input[key], n[key]);
  assert.equal(input.fxSourceUrl, n.fxReferenceSourceUrl);
  assert.equal(input.crudeSourceUrl, n.crudeSourceUrl);
  assert.equal(input.singaporeJetSourceUrl, n.singaporeJetFobReferenceSourceUrl);
  assert.equal(input.imoSourceUrl, n.imoSourceUrl);
  assert.equal(input.decemberOfficialMopsUsdPerBbl, null);
  assert.equal(input.decemberPeriodAverageUsdKrw, null);
  assert.match(input.fxKind, /2026-11-03/);
  assert.match(input.crudeKind, /2026-11-03/);
  for (const prediction of feed.forecasts) {
    assert.equal(prediction.targetPeriod, '2026.12');
    for (const key of ['predictedMin', 'predictedMax', 'officialStage', 'officialAmounts']) assert.equal(prediction[key], null);
  }
}

function checkTranslations(release, cards) {
  for (const lang of langs) {
    const pack = release.packs[lang];
    assert.equal(release.rows[lang].length, 5, lang + ' exactly five established indicators');
    assert.deepEqual(pack.rows, release.rows[lang]);
    assert(pack.faq.length > 0, lang + ' FAQ exists');
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
  await page.route('**/*', route => {
    const url = new URL(route.request().url());
    if (url.origin !== origin) return route.abort();
    if (withoutNewRelease && url.pathname === '/market-nov04.js') return route.fulfill({contentType:'application/javascript',body:'/* Previous release baseline for archive comparison. */'});
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
      officialDescription:document.querySelector('#officialDesc')?.innerText || '',
      overflow:document.documentElement.scrollWidth > innerWidth
    };
  });
}

(async () => {
  const browser = await chromium.launch();
  const reports = [];
  try {
    // Load the preceding release through the same page, omitting only today's extension.
    const baselinePage = await newPage(browser, true);
    await baselinePage.goto(origin + '/news');
    await baselinePage.waitForTimeout(1800);
    const historicalCards = await baselinePage.evaluate(() => window.AERO_MARKET_RELEASE.newsCards);
    assert(historicalCards.length > 0);
    assert(!historicalCards.some(card => card.id.startsWith(prefix)));
    await baselinePage.close();

    for (const name of ['forecast', 'news']) {
      const page = await newPage(browser), errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(origin + '/' + name);
      await page.waitForTimeout(1800);
      const initial = await state(page);
      const cards = initial.r.newsCards.filter(card => card.id.startsWith(prefix));
      assert.deepEqual(cards.map(card => card.id).sort(), Array.from({length:8}, (_, i) => prefix + (i + 1)).sort());
      assert.deepEqual(initial.r.newsCards.filter(card => !card.id.startsWith(prefix)), historicalCards, 'historical cards and timestamps preserved');
      checkTranslations(initial.r, cards);
      for (const card of cards) {
        assert.equal(card.date, '2026-11-04');
        assert.equal(card.dateKind, 'site_update');
        assert.equal(card.updatedAt, initial.r.modified);
        assert(card.reportedDate && (card.eventDate || card.observationPeriod), card.id + ' source date and observation date or period');
        assert(Date.parse(card.reportedDate) <= Date.parse(cutoff), card.id + ' source date before cutoff');
        if (card.eventDate) assert(Date.parse(card.eventDate) <= Date.parse(cutoff), card.id + ' observation before cutoff');
        else assert.equal(card.observationPeriod, '2026-Q2 / 2026-Q3', card.id + ' quarterly report does not invent a one-day event');
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
        const x = await state(page), pack = x.r.packs[lang];
        checkNumbers(x.n);
        assert.equal(x.canonical, 'https://aero-surcharge.com/' + name);
        assert.equal(x.title, name === 'news' ? pack.newsMeta : pack.meta);
        assert.equal(x.h1, name === 'news' ? pack.newsTitle : pack.title);
        assert.equal(x.overflow, false, name + ' ' + lang + ' desktop overflow');
        assert.doesNotMatch(x.body, /undefined|\?\?\?\?|AERO_MARKET_NUMBERS|\ufffd/);
        for (const number of [/1[, .]?341(?:[.,]0)?/, /103[.,]6(?:0)?/, /96[.,]09/, /165[.,]55/, /128/]) assert.match(x.body, number, name + ' ' + lang + ' latest values visible');
        for (const schema of x.schemas.filter(s => /^(WebPage|CollectionPage|FAQPage)$/.test(s['@type']))) assert.equal(schema.dateModified, x.r.modified);
        if (name === 'forecast') {
          assert.deepEqual(x.rows.map(row => row.map(normalize)), pack.rows.map(row => row.map(normalize)), lang + ' visible five-row table matches release');
          const faq = x.schemas.find(s => s['@type'] === 'FAQPage');
          assert(faq, lang + ' FAQ schema');
          assert.deepEqual(faq.mainEntity.map(q => ({q:q.name,a:q.acceptedAnswer.text})), pack.faq);
          for (const entry of pack.faq) {
            assert(normalize(x.faq).includes(normalize(entry.q)), lang + ' visible FAQ question');
            assert(normalize(x.faq).includes(normalize(entry.a)), lang + ' visible FAQ answer');
          }
        } else {
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
      assert.deepEqual(after.visibleCards, before.visibleCards, name + ' delayed card stability');
      checkNumbers(after.n);
      assert.equal(after.overflow, false);
      assert.deepEqual(errors, [], name + ' page JavaScript errors');
      reports.push({page:name,locales:langs,historicalCards:historicalCards.length,newCards:cards.length,errors,desktopAndMobile:true,delayedStabilitySeconds:12});
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
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
