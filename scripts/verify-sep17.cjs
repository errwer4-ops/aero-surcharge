const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

(async()=>{
  const browser=await chromium.launch({headless:true});
  const out=path.resolve('artifacts/sep17');
  fs.mkdirSync(out,{recursive:true});
  const results=[];
  try{
    for(const name of ['forecast','news']){
      const page=await browser.newPage({viewport:{width:1440,height:900}});
      const errors=[];
      page.on('pageerror',e=>errors.push(e.message));
      await page.goto('http://127.0.0.1:4187/'+name,{waitUntil:'domcontentloaded'});
      await page.waitForTimeout(1200);
      for(const lang of ['ko','en','ja','zh','fr','de']){
        await page.locator('#navLang').selectOption(lang);
        await page.waitForTimeout(450);
        const data=await page.evaluate(()=>({
          text:document.body.innerText,
          title:document.title,
          h1:document.querySelectorAll('h1').length,
          factors:document.querySelectorAll('#predictFactors .predict-factor').length,
          overview:!!document.querySelector('#octoberNovemberOverview'),
          official:Array.from(document.querySelectorAll('.official-summary-box .official-item a'),a=>a.href),
          officialItems:Array.from(document.querySelectorAll('.official-summary-box .official-item'),x=>({text:x.textContent,hasLink:!!x.querySelector('a')})),
          cards:window.AERO_MARKET_RELEASE.newsCards.length,
          cardData:window.AERO_MARKET_RELEASE.newsCards.map(x=>x.i18n[document.documentElement.lang]||x.i18n.en),
          modified:window.AERO_MARKET_RELEASE.modified,
          schemas:Array.from(document.querySelectorAll('script[type="application/ld+json"]'),x=>{try{return JSON.parse(x.textContent)}catch{return null}}).filter(Boolean),
          canonical:document.querySelector('link[rel="canonical"]')?.href,
          overflow:document.documentElement.scrollWidth>innerWidth+1
        }));
        for(const value of ['158.57','181.46','1,370.95','1,380.55','104.82','101.91']) assert(data.text.includes(value),`${name}/${lang} missing ${value}`);
        if(name==='forecast') assert(data.text.includes('Hormuz 3 / 10-day avg 17'));
        assert.equal(data.h1,1);
        assert.equal(data.modified,'2026-09-18T09:00:00+09:00');
        assert(data.schemas.some(x=>x.dateModified===data.modified),`${name}/${lang} schema modified date`);
        assert.equal(data.canonical,'https://aero-surcharge.com/'+name+'.html');
        assert.equal(data.overflow,false);
        assert.equal(data.cards,15);
        assert.equal(data.factors,name==='forecast'?5:0);
        assert.equal(data.overview,false);
        if(name==='news'){
          assert.equal(data.official.length,7);
          assert.equal(data.officialItems.length,9);
          for(const item of [data.officialItems[6],data.officialItems[8]]){
            assert.equal(item.hasLink,false);
            if(lang==='ko') assert(item.text.includes('10월 공시 발표 전'));
          }
          assert(data.official[0].includes('2610-infuel'));
          assert(data.official[1].includes('CM202609160002530627'));
          assert(data.official[2].includes('28742'));
          assert(data.official[3].includes('4407'));
          assert(data.official.some(x=>x.includes('0000000762')));
          assert(data.official.some(x=>x.includes('12703')));
          assert(data.official.some(x=>x.includes('11103')));
          if(lang==='ko') for(const amount of ['37,000','256,600','USD 37~87','60,300','108,300']) assert(data.text.includes(amount),`news/${lang} missing official amount ${amount}`);
          for(const card of data.cardData){
            assert(card.aiBrief&&card.summary&&card.aiBrief!==card.title&&card.aiBrief!==card.summary);
          }
          for(const card of data.cardData.slice(0,3)) assert(data.text.includes(card.title),`${name}/${lang} airline card title missing`);
        }
        assert(!/undefined/.test(data.text));
        if(lang!=='ko'){
          const leaked=data.text.split('\n').filter(line=>/[가-힣]/.test(line)&&!line.includes('한국어'));
          assert.deepEqual(leaked,[],`${name}/${lang} Korean text`);
        }
        assert.deepEqual(errors,[]);
        results.push({name,lang,title:data.title,overflow:data.overflow,errors:[...errors]});
      }
      await page.locator('#navLang').selectOption('ko');
      await page.waitForTimeout(500);
      await page.screenshot({path:path.join(out,name+'-desktop.png'),fullPage:true});
      await page.setViewportSize({width:390,height:844});
      await page.screenshot({path:path.join(out,name+'-mobile.png'),fullPage:true});
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
      await page.close();
    }
    const graph=await browser.newPage({viewport:{width:1440,height:900}});
    const graphErrors=[];
    graph.on('pageerror',e=>graphErrors.push(e.message));
    await graph.goto('http://127.0.0.1:4187/fuel-surcharge-graph.html',{waitUntil:'domcontentloaded'});
    await graph.waitForTimeout(800);
    for(const lang of ['ko','en','ja','zh']){
      await graph.locator('#navLang').selectOption(lang);
      await graph.waitForTimeout(250);
      const text=await graph.locator('#octoberGraphSummary').innerText();
      assert(text.includes('149.29')&&text.includes('158.57')&&text.includes('1,370.95'),`graph/${lang} missing comparison`);
      assert(!/undefined/.test(text));
    }
    assert.deepEqual(graphErrors,[]);
    await graph.locator('#navLang').selectOption('ko');
    await graph.screenshot({path:path.join(out,'graph-desktop.png'),fullPage:true});
    await graph.setViewportSize({width:390,height:844});
    await graph.screenshot({path:path.join(out,'graph-mobile.png'),fullPage:true});
    assert.equal(await graph.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
    await graph.close();
    fs.writeFileSync(path.join(out,'verification.json'),JSON.stringify(results,null,2));
    console.log(`${results.length} language/page checks passed`);
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
