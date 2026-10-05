const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const outputDir = path.join(require('node:os').tmpdir(), 'aero-oct06-verification');
fs.mkdirSync(outputDir, {recursive:true});
(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = [];
  for (const pageName of ['forecast', 'news']) {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.route('**/*', route => route.request().url().startsWith('http://localhost:4173/') ? route.continue() : route.abort());
    await page.goto('http://localhost:4173/' + pageName, {waitUntil:'domcontentloaded'});
    for (const language of ['ko', 'en', 'ja', 'zh', 'fr', 'de']) {
      await page.selectOption('#navLang', language);
      await page.waitForTimeout(1600);
      const result = await page.evaluate(() => {
        const release = window.AERO_MARKET_RELEASE;
        return {
          language: document.documentElement.lang,
          h1: document.querySelectorAll('h1').length,
          heading: document.querySelector('h1').textContent,
          undefined: /undefined/.test(document.body.innerText),
          asOf: window.AERO_MARKET_NUMBERS_LATEST.asOf,
          cards: release.newsCards.filter(x => x.date === '2026-10-06').length,
          rows: release.rows.ko.length,
          faq: release.packs.ko.faq.length,
          jet: release.numbers.singaporeJetFuelMarketUsdPerBbl,
          globalJet: release.numbers.globalJetFuelUsdPerBbl,
          overflow: document.documentElement.scrollWidth > innerWidth,
          schemas: [...document.querySelectorAll('script')].filter(x => x.type === 'application/ld+json').map(x => JSON.parse(x.textContent).dateModified).filter(Boolean),
          latestText: [...document.querySelectorAll('.news-card')].filter(x => /20261006/.test(x.getAttribute('data-id') || x.id)).map(x => x.innerText)
        };
      });
      console.log(pageName, language, JSON.stringify({...result, latestText:result.latestText.map(x => x.length)}));
      assert.equal(result.h1, 1);
      assert.equal(result.undefined, false);
      assert.equal(result.cards, 10);
      assert.equal(result.rows, 5);
      assert.equal(result.faq, 8);
      assert.equal(result.jet, 176.78);
      assert.equal(result.globalJet, 187.34);
      assert.equal(result.asOf, '2026.10.06 08:20 KST');
      if(pageName === 'news') {
        assert.equal(result.latestText.length, 10);
        if(language !== 'ko') assert(result.latestText.every(x => !/[가-힣]/.test(x)));
        for(const text of result.latestText) assert(text.length > 150);
      }
      if(language !== 'ko') {
        const untranslated = await page.evaluate(() => [...document.querySelectorAll('body *')].filter(x => !x.children.length && !['SCRIPT','STYLE','OPTION'].includes(x.tagName) && x.getBoundingClientRect().height > 0 && /[가-힣]/.test(x.innerText)).map(x => x.innerText));
        assert.deepEqual(untranslated, []);
      }
      assert(result.schemas.every(x => x === '2026-10-06T08:20:00+09:00'));
      results.push(result);
    }
    await page.selectOption('#navLang', 'ko');
    await page.waitForTimeout(1600);
    await page.screenshot({ path: path.join(outputDir, 'oct06-' + pageName + '-desktop.png'), fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(300);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await page.screenshot({ path: path.join(outputDir, 'oct06-' + pageName + '-mobile.png'), fullPage: true });
    assert.deepEqual(errors, []);
    await page.close();
  }
  const stablePages = [];
  for(const name of ['forecast','news']) {
    const page = await browser.newPage();
    await page.route('**/*', route => route.request().url().startsWith('http://localhost:4173/') ? route.continue() : route.abort());
    await page.goto('http://localhost:4173/' + name, {waitUntil:'domcontentloaded'});
    await page.waitForTimeout(1700);
    stablePages.push({page,heading:await page.locator('h1').innerText(), signature:await page.evaluate(() => JSON.stringify(window.AERO_MARKET_RELEASE.rows.ko)), dom:await page.evaluate(() => [...document.querySelectorAll('table, .news-card')].map(x=>x.innerText).join('\n'))});
  }
  for(let i=0;i<11;i++) {
    await new Promise(resolve => setTimeout(resolve,5000));
    for(const {page,heading,signature,dom} of stablePages) {
      assert.equal(await page.locator('h1').innerText(),heading);
      assert.equal(await page.evaluate(() => JSON.stringify(window.AERO_MARKET_RELEASE.rows.ko)),signature);
      assert.equal(await page.evaluate(() => [...document.querySelectorAll('table, .news-card')].map(x=>x.innerText).join('\n')),dom);
      assert.equal(await page.evaluate(() => window.AERO_MARKET_NUMBERS_LATEST.asOf),'2026.10.06 08:20 KST');
      assert.equal(await page.evaluate(() => document.body.innerText.includes('undefined')),false);
    }
  }
  await browser.close();
  console.log('PASS: 12 page/language combinations, desktop/mobile, no runtime errors, 55-second stability check.');
})().catch(error => { console.error(error); process.exit(1); });
