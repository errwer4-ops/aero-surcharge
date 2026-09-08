const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({headless:true});
  const out = path.resolve('artifacts/sep08');
  fs.mkdirSync(out, {recursive:true});
  const reports = [];
  try {
    for (const pageName of ['forecast','news']) {
      const page = await browser.newPage({viewport:{width:1440,height:1000}});
      const errors=[];
      page.on('pageerror', e=>errors.push(e.message));
      await page.goto('http://127.0.0.1:4187/'+pageName, {waitUntil:'domcontentloaded'});
      await page.waitForTimeout(1200);
      for (const language of ['ko','en','ja','zh','fr','de']) {
        await page.locator('#navLang').selectOption(language);
        await page.waitForTimeout(500);
        const result=await page.evaluate(()=>({
          title:document.title,
          text:document.body.innerText,
          rows:document.querySelectorAll('#indicatorTbody tr,.indicator-table tbody tr').length,
          factors:document.querySelectorAll('#predictFactors .predict-factor').length,
          faq:document.querySelector('#forecastFaqBox')?.innerText,
          official:document.querySelectorAll('.official-summary-box .official-item a').length,
          cards:window.AERO_MARKET_RELEASE?.newsCards.map(x=>({id:x.id,title:x.i18n?.[document.documentElement.lang === 'zh' ? 'zh' : document.documentElement.lang]?.title || x.title})),
          h1:document.querySelectorAll('h1').length,
          schemas:Array.from(document.querySelectorAll('script[type="application/ld+json"]'),el=>JSON.parse(el.textContent)),
          overflow:document.documentElement.scrollWidth>innerWidth+1,
          core:document.querySelector('#indicatorTbody')?.innerText || document.querySelector('.news-list')?.innerText
        }));
        assert(!/undefined/.test(result.text),pageName+' '+language+' undefined');
        assert(result.text.includes('159.58') && result.text.includes('171.01'),pageName+' missing data');
        assert.equal(result.h1,1,pageName+' h1');
        if(pageName==='forecast') {
          assert.equal(result.factors,5);
          assert(result.faq.includes('159.58'));
        } else {
          assert.equal(result.official,9);
          assert.equal(result.cards.length,10);
          for(const card of result.cards) assert(result.text.includes(card.title),'Missing rendered card: '+card.id+' '+language);
        }
        const korean=language==='ko'?[]:result.text.split('\n').filter(t=>/[가-힣]/.test(t) && !/한국어/.test(t));
        assert.equal(korean.length,0,pageName+' '+language+' Korean leak');
        assert.equal(errors.length,0,pageName+' script errors');
        reports.push({page:pageName,language,korean,overflow:result.overflow,errors:[...errors],title:result.title,cards:result.cards});
      }
      await page.locator('#navLang').selectOption('ko');
      await page.waitForTimeout(500);
      await page.screenshot({path:path.join(out,pageName+'-desktop.png'),fullPage:true});
      await page.setViewportSize({width:390,height:844});
      await page.screenshot({path:path.join(out,pageName+'-mobile.png'),fullPage:true});
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,pageName+' mobile overflow');
      await page.close();
    }
    console.log(JSON.stringify(reports,null,2));
    fs.writeFileSync(path.join(out,'verification.json'),JSON.stringify(reports,null,2));
  } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;});
