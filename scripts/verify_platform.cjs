const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {spawn} = require('node:child_process');
const {chromium} = require('playwright');
const root=path.resolve(__dirname,'..'), port=Number(process.env.PLATFORM_TEST_PORT||4192), base=`http://127.0.0.1:${port}`;
const audit=process.argv.includes('--audit');
const out=path.join(root,'tmp','platform-verification');fs.mkdirSync(out,{recursive:true});
async function main(){
  const server=spawn(process.execPath,[path.join(__dirname,'serve_local.js')],{cwd:root,env:{...process.env,PORT:String(port)},stdio:['ignore','pipe','pipe']});
  let browser;
  try{
    await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error('Server startup timeout')),10000);server.stdout.on('data',data=>{if(String(data).includes('Local review server')){clearTimeout(timer);resolve();}});server.on('error',reject);server.on('exit',code=>{clearTimeout(timer);reject(new Error('Server exited '+code));});});
    browser=await chromium.launch({headless:true});
    const context=await browser.newContext({viewport:{width:1280,height:900}});
    const external=[];
    await context.route('**/*',route=>{
      const url=route.request().url();
      if(url.startsWith(base) && !url.includes('/api/'))return route.continue();
      external.push(url.split('?')[0]);
      return route.abort();
    });
    await context.addInitScript(()=>{window.AERO_ANALYTICS_CONFIG={allowLocal:true,debug:true};});
    await context.addInitScript(()=>{
      window.__aeroLabMetrics={lcpMs:null,cls:0};
      try{new PerformanceObserver(list=>{for(const e of list.getEntries())window.__aeroLabMetrics.lcpMs=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});}catch(_){}
      try{new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__aeroLabMetrics.cls+=e.value;}).observe({type:'layout-shift',buffered:true});}catch(_){}
    });
    const reports=[];
    for(const name of (process.argv.includes('--analytics-only')?[]:['index','fuel-surcharge-calculator','airlines','news','forecast','fuel-surcharge-graph','fuel-surcharge-2026-05','methodology','privacy'])){
      const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
      await page.goto(`${base}/${name}.html`,{waitUntil:'domcontentloaded'});await page.waitForTimeout(1800);
      const report=await page.evaluate(()=>({title:document.title,h1:[...document.querySelectorAll('h1')].map(x=>x.innerText),description:document.querySelector('meta[name=description]')?.content,canonical:document.querySelector('link[rel=canonical]')?.href,body:document.body.innerText.slice(0,2200),overflow:document.documentElement.scrollWidth>innerWidth,schemas:[...document.querySelectorAll('script[type="application/ld+json"]')].map(x=>JSON.parse(x.textContent)['@type']),gaScripts:document.querySelectorAll('script[src*=googletagmanager]').length}));
      report.page=name;report.errors=errors;
      report.desktopLab=await page.evaluate(()=>({...window.__aeroLabMetrics,domContentLoadedMs:performance.getEntriesByType('navigation')[0]?.domContentLoadedEventEnd,scope:'local desktop synthetic sample, external requests blocked; not field Core Web Vitals'}));
      if(!audit){assert.equal(report.h1.length,1,name+' one H1');assert.equal(report.gaScripts,0,name+' no tracking before consent');assert.equal(report.overflow,false,name+' desktop overflow');assert.deepEqual(errors,[],name+' page errors');}
      if(name==='index'&&!audit){
        const cards=page.locator('#miniGrid .mini-card');
        const states=await cards.locator('.mini-status').allTextContents();
        assert.equal(cards?await cards.count():0,9);
        assert.equal(states.filter(s=>s==='11월 공시 완료').length,8);
        assert.equal(states.filter(s=>s==='11월 공시 미완료').length,1);
        assert.equal(await cards.locator('.mini-trend-label').count(),8);
        assert.equal(await page.locator('#miniGrid [data-airline="KE"] .mini-trend-label').innerText(),'전월 대비 최소 8.0% 상승');
        assert.equal(await page.locator('#miniGrid [data-airline="YP"] a').count(),0,'October link must not masquerade as November');
        const detail=page.locator('#miniGrid [data-airline="OZ"] details'),toggle=detail.locator('summary');
        await toggle.focus();await toggle.press('Enter');assert.notEqual(await detail.getAttribute('open'),null);
        assert((await detail.innerText()).includes('10월 보관 기록을 포함한 참고 비율'));
        await page.locator('#aeroConsentDeny').click();
        await toggle.press('Enter');assert.equal(await detail.getAttribute('open'),null);
      }
      if(!audit)assert.doesNotMatch(await page.locator('body').innerText(), /원문 금액·구간 대조 완료|일부 구간 대조 완료|원문 (?:대조 완료|검증 대기|재검증 대기)|금액·통화·구간을 공식/, name+' concise public status copy');
      if(name==='index'){await page.locator('#miniGrid summary').first().blur();await page.locator('#miniGrid').screenshot({path:path.join(out,'index-cards-desktop.png')});}
      await page.setViewportSize({width:390,height:844});await page.waitForTimeout(200);
      report.mobileOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
      if(!audit)assert.equal(report.mobileOverflow,false,name+' mobile overflow');
      await page.screenshot({path:path.join(out,name+'-mobile.png'),fullPage:true});
      if(name==='index'){await page.locator('#miniGrid').evaluate(el=>window.scrollTo(0,el.getBoundingClientRect().top+window.scrollY-190));await page.screenshot({path:path.join(out,'index-cards-mobile.png')});}
      reports.push(report);await page.close();
    }
    if(!audit){
      const p=await context.newPage();await p.goto(base);await p.waitForTimeout(1800);
      // The screenshot pass rejected consent; reopen the real settings UI before opting in.
      await p.locator('.aero-privacy-open').click();
      await p.locator('#aeroConsentAnalytics').check();await p.locator('#aeroConsentSave').click();
      await p.evaluate(()=>{
        AeroAnalytics.track('month_compare',{airline:'KE',base_month:'2026-10',compare_month:'2026-11',email:'test@example.com',query:'private text'},'dedup-test');
        AeroAnalytics.track('month_compare',{airline:'KE'},'dedup-test');
        AeroAnalytics.track('alert_subscribe',{result_status:'success'},'unimplemented');
      });
      let events=await p.evaluate(()=>dataLayer.filter(x=>x[0]==='event').map(x=>[x[1],x[2]]));
      assert.equal(events.filter(x=>x[0]==='month_compare').length,1);
      assert.equal(events.filter(x=>x[0]==='alert_subscribe').length,0);
      assert(!JSON.stringify(events).includes('private text'));assert(!JSON.stringify(events).includes('test@example.com'));
      await p.evaluate(()=>{document.getElementById('originSelect').value='ICN';document.getElementById('destSelect').value='NRT';document.getElementById('originAirportInput').value='ICN';document.getElementById('destAirportInput').value='NRT';});
      await p.locator('#searchBtn').click();await p.waitForTimeout(500);
      events=await p.evaluate(()=>dataLayer.filter(x=>x[0]==='event').map(x=>[x[1],x[2]]));
      assert.equal(events.filter(x=>x[0]==='route_search').length,1);
      assert.equal(events.filter(x=>x[0]==='route_result_view').length,1);
      const link=p.locator('#cardsGrid a[href*="lase.kr"]').first();
      await p.evaluate(()=>document.addEventListener('click',e=>{if(e.target.closest('a[href*="lase.kr"]'))e.preventDefault();}));
      await link.click();
      assert.equal(await p.evaluate(()=>dataLayer.filter(x=>x[0]==='event'&&x[1]==='affiliate_click').length),1);
      // Editing a selected airport must search the visible text, not the old hidden select.
      await p.locator('#destAirportInput').fill('FUK');await p.locator('#searchBtn').click();await p.waitForTimeout(100);
      assert.equal(await p.locator('#destSelect').inputValue(),'FUK');
      assert.equal(await p.locator('#resultBadge').innerText(),'ICN → FUK');
      await p.locator('#originAirportInput').fill('PUS');await p.locator('#destAirportInput').fill('NRT');
      await p.locator('#searchBtn').click();await p.waitForTimeout(100);
      const bxCard=p.locator('#cardsGrid .al-card').filter({has:p.locator('a[href*="noticeDetail?id=4407"]')});
      const bxRow=bxCard.locator('tr.highlighted');
      assert((await bxRow.innerText()).includes('USD 37'));
      assert((await bxRow.innerText()).includes('USD 43'));
      assert((await bxRow.innerText()).includes('16.22%'));
      const countBeforeInvalid=await p.evaluate(()=>dataLayer.filter(x=>x[0]==='event'&&x[1]==='route_search').length);
      p.once('dialog',dialog=>dialog.dismiss());await p.locator('#destAirportInput').fill('not-an-airport');await p.locator('#searchBtn').click();
      assert.equal(await p.locator('#destSelect').inputValue(),'');
      assert.equal(await p.evaluate(()=>dataLayer.filter(x=>x[0]==='event'&&x[1]==='route_search').length),countBeforeInvalid);
      await p.evaluate(()=>AeroAnalytics.setConsent(false,false));
      const size=await p.evaluate(()=>dataLayer.length);await p.evaluate(()=>AeroAnalytics.track('route_search',{origin:'ICN',destination:'NRT'}));
      assert.equal(await p.evaluate(()=>dataLayer.length),size,'withdrawal stops custom tracking');
      await p.close();
      for(const [name,event] of [['forecast','forecast_view'],['fuel-surcharge-2026-05','archive_view']]){
        const view=await context.newPage();await view.goto(base+'/'+name+'.html');await view.waitForTimeout(1600);
        await view.evaluate(()=>AeroAnalytics.setConsent(true,false));
        await view.waitForFunction(event=>dataLayer.some(x=>x[0]==='event'&&x[1]===event),event);
        await view.evaluate(()=>{AeroAnalytics.setConsent(true,false);window.scrollTo(0,300);});
        assert.equal(await view.evaluate(event=>dataLayer.filter(x=>x[0]==='event'&&x[1]===event).length,event),1,name+' visible content once');
        assert.equal(await view.locator('script#aero-ga4').count(),1,'single GA4 tag');
        await view.evaluate(()=>AeroAnalytics.setConsent(false,false));await view.close();
      }
      const blocked=await browser.newContext();
      await blocked.route('**/*',r=>r.request().url().startsWith(base)&&!r.request().url().includes('/api/')?r.continue():r.abort());
      await blocked.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Blocked','SecurityError');}});});
      const bp=await blocked.newPage(),errors=[];bp.on('pageerror',e=>errors.push(e.message));
      await bp.goto(base+'/fuel-surcharge-calculator.html');await bp.waitForTimeout(1800);
      assert.deepEqual(errors,[],'blocked localStorage must not break calculator');await blocked.close();
    }
    fs.writeFileSync(path.join(out,audit?'audit-before.json':'verification.json'),JSON.stringify({at:new Date().toISOString(),reports,externalRequestsBlocked:[...new Set(external)]},null,2));
    console.log((audit?'AUDIT':'PASS')+': '+(reports.length?reports.length+' pages, desktop/mobile, metadata/JSON-LD; ':'')+'consent, safe events, search, affiliate dedup and blocked storage. Evidence: '+out);
  }finally{if(browser)await browser.close();server.kill();}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
