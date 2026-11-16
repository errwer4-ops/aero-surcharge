'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {spawn}=require('node:child_process'),{chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),port=Number(process.env.FORECAST_GUIDE_PORT||4240),origin='http://127.0.0.1:'+port;
const out=path.join(root,'artifacts/review-verification/forecast-guide');
const copy={
 ko:['대한항공·아시아나는 12월 유류할증료 인하를 공시했습니다.','현재 항공권 총액 비교','12월'],
 en:['Korean Air and Asiana have announced lower December fuel surcharges.','Compare current total fares','December'],
 ja:['大韓航空とアシアナ航空が12月の燃油サーチャージ引き下げを公示しました。','現在の航空券総額を比較','12月'],
 zh:['大韩航空和韩亚航空已公告下调12月燃油附加费。','比较当前机票总价','十二月'],
 fr:['Korean Air et Asiana ont annoncé une baisse des surcharges de décembre.','Comparer les prix totaux actuels','décembre'],
 de:['Korean Air und Asiana haben niedrigere Kerosinzuschläge für Dezember angekündigt.','Aktuelle Gesamtflugpreise vergleichen','Dezember']
};
const norm=s=>s.replace(/\s+/g,' ').trim();
async function market(page){return page.evaluate(()=>JSON.stringify({n:AERO_MARKET_NUMBERS_LATEST,r:AERO_MARKET_RELEASE,s:AERO_MARKET_SNAPSHOTS,notices:NOVEMBER_2026_OFFICIAL_NOTICES}));}
async function main(){
 fs.mkdirSync(out,{recursive:true});
 const server=spawn(process.execPath,[path.join(root,'scripts/serve_local.js')],{cwd:root,env:{...process.env,PORT:String(port)},stdio:['ignore','pipe','pipe']});let browser;
 try{
  await new Promise((resolve,reject)=>{const t=setTimeout(()=>reject(Error('server startup timeout')),10000);server.stdout.on('data',b=>{if(String(b).includes('Local review server')){clearTimeout(t);resolve();}});server.on('error',reject);});
  browser=await chromium.launch();const ctx=await browser.newContext({viewport:{width:1440,height:1000}});
  await ctx.route('**/*',r=>r.request().url().startsWith(origin+'/')&&!r.request().url().includes('/api/')?r.continue():r.abort());
  const page=await ctx.newPage(),errors=[],consoleErrors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/net::ERR_FAILED|net::ERR_BLOCKED_BY_CLIENT/.test(m.text()))consoleErrors.push(m.text());});
  await page.goto(origin+'/forecast');await page.waitForTimeout(4500);
  const original=await market(page),results=[];let koreanDecision;
  assert.equal(await page.locator('h1').count(),1,'one page heading');
  assert.equal(await page.locator('#forecastEvidence').evaluate(el=>el.open),false,'evidence collapsed initially');
  assert.equal(await page.locator('#forecastSources').evaluate(el=>el.open),false,'source FAQ collapsed initially');
  assert.equal(await page.locator('#indicatorTbody').isVisible(),false,'research table not in initial reading flow');
  const cta=page.locator('a[data-fare-compare]');
  assert.equal(await cta.count(),1,'one total fare affiliate CTA');
  assert.equal(await cta.getAttribute('href'),'https://linkmoa.kr/click.php?m=myrealtrip&a=A100704170&l=0000','original affiliate URL');
  assert.match(await cta.getAttribute('rel'),/\bsponsored\b/);
  assert.equal(await page.locator('.forecast-action-secondary').getAttribute('href'),'airlines.html');
  for(const [lang,expected] of Object.entries(copy)){
    await page.selectOption('#navLang',lang);await page.waitForTimeout(500);
    assert.equal(await page.locator('#forecastDecisionTitle').innerText(),expected[0],lang+' explicit action first');
    assert.equal(await cta.innerText(),expected[1],lang+' CTA');
    assert((await page.locator('h1').innerText()).includes(expected[2]),lang+' forecast month');
    assert.match(await page.locator('.page-sub').innerText(),/2026\.11\.16 09:00 KST/,'cutoff retained');
    const noticeState=await page.evaluate(()=>({checked:AeroDecemberNotices.checkedAt,cutoff:AERO_MARKET_NUMBERS_LATEST.informationCutoff,notices:AeroDecemberNotices.notices.map(n=>({code:n.code,end:n.ticketingEnd})),text:document.querySelector('#decemberNoticePanel').innerText,status:document.querySelector('[data-forecast-copy="status"]').textContent}));
    assert(Date.parse(noticeState.checked)>Date.parse(noticeState.cutoff),'evening notice verification separate from morning cutoff');
    assert.deepEqual(noticeState.notices,[{code:'KE',end:'2026-12-31'},{code:'OZ',end:'2026-12-16'}]);
    for(const amount of ['50,800','377,800','57,500','322,400'])assert(noticeState.text.includes(amount),lang+' verified notice amount '+amount);
    assert(/17/.test(noticeState.text),lang+' Asiana integration boundary retained');
    assert(/31/.test(noticeState.status)&&/16/.test(noticeState.status),lang+' decision status shows distinct ticketing periods');
    assert.notEqual(noticeState.status,expected[0],lang+' decision does not repeat the announcement');
    if(lang==='ko')koreanDecision={status:noticeState.status,flexible:await page.locator('[data-forecast-copy="flexibleBody"]').innerText()};
    for(const width of [1440,390,320]){
      await page.setViewportSize({width,height:width<500?844:1000});await page.evaluate(()=>scrollTo(0,0));
      const box=await page.locator('#forecastDecisionTitle').boundingBox();assert(box.y+box.height<(width<500?844:1000),lang+' '+width+' decision in first viewport');
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,lang+' '+width+' no overflow');
      if(width!==320)await page.screenshot({path:path.join(out,lang+'-'+width+'-closed.png'),fullPage:true});
      results.push({lang,width,passed:true});
    }
    const summary=page.locator('#forecastEvidence>summary');await summary.focus();await page.keyboard.press('Enter');
    assert.equal(await page.locator('#forecastEvidence').evaluate(el=>el.open),true,'keyboard expands evidence');
    assert.equal(await page.locator('#indicatorTbody tr').count(),5,'all indicators retained');
    assert.equal(await page.locator('#indicatorTbody').isVisible(),true);
    await page.locator('#forecastSources>summary').focus();await page.keyboard.press('Space');
    assert.equal(await page.locator('#forecastSources').evaluate(el=>el.open),true,'Space expands source FAQ');
    assert.equal(await page.locator('#forecastFaqBox li').count(),7);
    const faq=await page.evaluate(()=>[...document.querySelectorAll('script[type="application/ld+json"]')].map(e=>JSON.parse(e.textContent)).find(x=>x['@type']==='FAQPage'));
    assert.equal(faq.headline,await page.locator('h1').innerText());
    assert.equal(faq.description,await page.locator('meta[name="description"]').getAttribute('content'));
    const faqText=norm(await page.locator('#forecastFaqBox').innerText());
    for(const q of faq.mainEntity){assert(faqText.includes(norm(q.name)));assert(faqText.includes(norm(q.acceptedAnswer.text)));}
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://aero-surcharge.com/forecast');
    assert.equal(await page.locator('meta[property="og:title"]').getAttribute('content'),await page.title());
    for(const width of [1440,390,320]){await page.setViewportSize({width,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,lang+' '+width+' expanded content fits');}
    await page.selectOption('#navCurr','USD');await page.selectOption('#navCurr','KRW');await page.waitForTimeout(350);
    assert.equal(await page.locator('#forecastEvidence').evaluate(el=>el.open),true,'rerender preserves expanded state');
    await page.locator('#forecastSources>summary').click();await summary.click();
    assert.equal(await market(page),original,lang+' all market facts, archived cards and notices preserved');
  }
  // The native disclosure and focused summary survive locale changes and old delayed writers.
  await page.locator('#forecastEvidence>summary').focus();await page.keyboard.press('Enter');
  await page.selectOption('#navLang','en');await page.waitForTimeout(400);
  await page.locator('#forecastEvidence>summary').focus();
  const before=await page.locator('.forecast-decision').innerText();await page.waitForTimeout(15000);
  assert.equal(await page.locator('.forecast-decision').innerText(),before,'15-second delayed copy stability');
  assert.equal(await page.locator('#forecastEvidence').evaluate(el=>el.open),true,'delayed renderer retains open state');
  assert.equal(await page.evaluate(()=>document.activeElement===document.querySelector('#forecastEvidence>summary')),true,'delayed renderer preserves keyboard focus');
  assert.equal(await market(page),original,'delayed market preservation');
  const next=await page.evaluate(()=>{const n=Object.assign({},AERO_MARKET_NUMBERS_LATEST,{forecastTargetMonth:'2027-01',informationCutoff:'2026-12-16T09:00:00+09:00'});const p=Object.assign({},AERO_MARKET_RELEASE.packs.en,{forecastOverview:{informationCutoff:n.informationCutoff,expectation:'NEW VERIFIED OUTLOOK'}});const v=AERO_FORECAST_GUIDE.view(p,n);AERO_FORECAST_GUIDE.render(v,n);return {title:v.title,status:document.querySelector('[data-forecast-copy="status"]').textContent};});
  assert.match(next.title,/January/,'month follows release, no hardcoded December');assert.equal(next.status,'NEW VERIFIED OUTLOOK','next release does not inherit November 16 pending assessment');
  assert.deepEqual(errors,[]);assert.deepEqual(consoleErrors,[]);
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});await nojs.route('**/*',r=>r.request().url().startsWith(origin+'/')?r.continue():r.abort());
  const staticPage=await nojs.newPage();await staticPage.goto(origin+'/forecast');assert.equal(await staticPage.locator('#forecastDecisionTitle').innerText(),copy.ko[0]);await staticPage.locator('#forecastEvidence>summary').click();assert.equal(await staticPage.locator('#indicatorTbody').isVisible(),true,'evidence works without JavaScript');
  assert.equal(await staticPage.locator('[data-forecast-copy="status"]').innerText(),koreanDecision.status,'no-JS snapshot keeps the verified notice ticketing periods');
  assert.equal(await staticPage.locator('[data-forecast-copy="flexibleBody"]').innerText(),koreanDecision.flexible,'no-JS snapshot keeps the current waiting guidance');
  await nojs.close();
  fs.writeFileSync(path.join(out,'verification.json'),JSON.stringify({checkedAt:new Date().toISOString(),results,errors,consoleErrors,delayedStabilitySeconds:15,noJavaScript:true,nextReleaseFallback:true},null,2));
  console.log('PASS forecast guide: six languages, 18 viewport combinations, collapsed/expanded evidence, keyboard, no-JS, metadata/FAQ, immutable data, delayed stability and next-release fallback.');
 }finally{if(browser)await browser.close();server.kill();}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
