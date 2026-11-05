'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {spawn}=require('node:child_process'),{chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),port=Number(process.env.HOME_PERIOD_TEST_PORT||4198),origin=`http://127.0.0.1:${port}`;
const out=path.join(os.tmpdir(),'aero-home-period-qa'),langs=['ko','en','ja','zh','fr','de'];
const timerOnly=process.argv.includes('--timer-only');
const boundaryOnly=process.argv.includes('--boundary-only');
const reviewTime='2026-11-04T00:00:00Z';
fs.mkdirSync(out,{recursive:true});

async function content(page){
  return page.evaluate(()=>({
    intro:[...document.querySelectorAll('#introSection .intro-card-body')].map(e=>e.innerText.trim()),
    summary:document.querySelector('#decisionList li')?.innerText.trim(),
    nextSignal:document.querySelector('[data-i18n="index.signal3"]')?.innerText.trim(),
    forecastLabel:document.querySelector('[data-i18n="index.quick.jul.name"]')?.innerText.trim(),
    body:document.body.innerText,
    states:[...document.querySelectorAll('#miniGrid .mini-status')].map(e=>e.innerText),
    ypLink:document.querySelector('#miniGrid [data-airline="YP"] a')?.href,
    description:document.querySelector('meta[name="description"]')?.content,
    ogDescription:document.querySelector('meta[property="og:description"]')?.content,
    twitterDescription:document.querySelector('meta[name="twitter:description"]')?.content,
    canonical:document.querySelector('link[rel="canonical"]')?.href,
    overflow:document.documentElement.scrollWidth>innerWidth,
    h1:document.querySelectorAll('h1').length
  }));
}
function assertHome(c,label){
  assert.equal(c.intro.length,3,label+' intro count');
  assert.equal(new Set(c.intro).size,3,label+' different intro purposes');
  assert(c.intro.every(v=>v.length>20),label+' complete explanations');
  assert(c.summary&&c.summary.length>30,label+' notice summary exists');
  assert.equal(c.body.split(c.summary).length-1,1,label+' one full notice summary');
  assert.equal(c.states.length,9,label+' nine airline cards');
  assert.equal(c.ypLink,'https://www.airpremia.com/a/ko/customer/notice/803',label+' YP November source');
  assert.equal(c.description,c.ogDescription,label+' OG metadata');
  assert.equal(c.description,c.twitterDescription,label+' Twitter metadata');
  assert.equal(c.canonical,'https://aero-surcharge.com/',label+' preserved canonical');
  assert.equal(c.overflow,false,label+' no horizontal overflow');assert.equal(c.h1,1,label+' one H1');
  assert.doesNotMatch(c.body,/10월은 현재 적용|10월 적용 중|11월 공시 미완료|공시 미완료: YP/,label+' no stale month/YP claim');
}
async function main(){
  const server=spawn(process.execPath,[path.join(__dirname,'serve_local.js')],{cwd:root,env:{...process.env,PORT:String(port)},stdio:['ignore','pipe','pipe']});
  let browser;
  try {
    await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error('Server startup timeout')),10000);server.stdout.on('data',b=>{if(String(b).includes('Local review server')){clearTimeout(timer);resolve();}});server.on('error',reject);});
    browser=await chromium.launch({headless:true});
    async function context(options={}){const ctx=await browser.newContext({viewport:{width:1280,height:900},...options});await ctx.route('**/*',r=>r.request().url().startsWith(origin+'/')&&!r.request().url().includes('/api/')?r.continue():r.abort());return ctx;}
    const results=[];
    if(!timerOnly&&!boundaryOnly){
    // The crawler snapshot must be correct before any repair script runs.
    const staticContext=await context({javaScriptEnabled:false}),staticPage=await staticContext.newPage();
    await staticPage.goto(origin+'/');const initial=await content(staticPage);assertHome(initial,'JavaScript disabled');
    assert.equal(initial.states.filter(s=>s==='11월 공시 완료').length,9,'initial nine published November notices');
    assert.match(initial.summary,/11월 발권분 현재 적용/);
    await staticPage.screenshot({path:path.join(out,'initial-no-javascript.png'),fullPage:true});
    results.push({case:'initial-no-javascript',intro:initial.intro,summary:initial.summary,ypLink:initial.ypLink});await staticContext.close();

    // Independent contexts prevent a language or currency test from borrowing
    // another tab's saved preference. Real time allows late renderers to fire.
    for(let offset=0;offset<langs.length;offset+=3)await Promise.all(langs.slice(offset,offset+3).map(async lang=>{
      const ctx=await context(),page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
      await page.clock.setFixedTime(new Date(reviewTime));await page.goto(origin+'/',{waitUntil:'domcontentloaded'});await page.waitForTimeout(1200);
      if(await page.locator('#aeroConsentDeny').isVisible())await page.locator('#aeroConsentDeny').click();
      await page.locator('#navLang').selectOption(lang);await page.waitForTimeout(300);
      await page.locator('#navCurr').selectOption('USD');await page.waitForTimeout(200);
      const before=await content(page);assertHome(before,lang+' desktop');
      assert.equal(before.summary,await page.evaluate(lang=>AeroNoticePeriod.copy(lang).summary,lang));
      await page.locator('#navCurr').selectOption('KRW');await page.waitForTimeout(14000);
      const after=await content(page);assertHome(after,lang+' after 14 seconds');
      assert.deepEqual(after.intro,before.intro,lang+' explanations do not revert');assert.equal(after.summary,before.summary,lang+' summary does not revert');assert.deepEqual(after.states,before.states,lang+' notice states do not revert');
      await page.screenshot({path:path.join(out,'home-'+lang+'-desktop.png'),fullPage:true});
      await page.setViewportSize({width:390,height:844});await page.waitForTimeout(200);assertHome(await content(page),lang+' mobile');
      await page.screenshot({path:path.join(out,'home-'+lang+'-mobile.png'),fullPage:true});
      assert.deepEqual(errors,[],lang+' console exceptions');
      results.push({case:lang,intro:after.intro,summary:after.summary,ypLink:after.ypLink,delayedSeconds:14,errors});await ctx.close();
    }));
    }
    if(!timerOnly){
    for(const [before,after,current,next,relation] of [
      ['2026-10-31T14:59:59Z','2026-10-31T15:00:00Z','2026-11','2026-12','current'],
      ['2026-11-30T14:59:59Z','2026-11-30T15:00:00Z','2026-12','2027-01','archive'],
      ['2026-12-31T14:59:59Z','2026-12-31T15:00:00Z','2027-01','2027-02','archive']
    ]){
      const ctx=await context(),page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
      await page.clock.setFixedTime(new Date(before));await page.goto(origin+'/',{waitUntil:'domcontentloaded'});await page.waitForTimeout(1200);
      const beforeView=await content(page);
      if(before.startsWith('2026-10-31')){
        assert.match(beforeView.nextSignal,/11월.*공시.*반영/,'published November notice is reflected before its effective month');
        assert.doesNotMatch(beforeView.nextSignal,/대기|미완료|미확인/,'October next-month signal cannot label verified November pending');
      }
      const original=await page.evaluate(()=>JSON.stringify(NOVEMBER_2026_OFFICIAL_NOTICES));
      await page.clock.setFixedTime(new Date(after));await page.evaluate(()=>window.dispatchEvent(new Event('focus')));await page.waitForTimeout(4500);
      const state=await page.evaluate(()=>AeroNoticePeriod.state()),view=await content(page);
      assert.equal(state.currentMonth,current);assert.equal(state.nextMonth,next);assert.equal(state.relation,relation);assert.equal(state.noticeMonth,'2026-11');assert.equal(state.verifiedCount,9);
      assert.equal(view.summary,await page.evaluate(()=>AeroNoticePeriod.copy('ko').summary),'visible summary follows Korea month boundary');
      assert.equal(await page.evaluate(()=>JSON.stringify(NOVEMBER_2026_OFFICIAL_NOTICES)),original,'clock change does not modify reviewed data');
      assert.equal(state.sourceVerifiedAt,'2026-10-29T07:54:00+09:00','clock does not renew source verification');
      if(relation==='archive'){
        assert.match(view.summary,/자료 확인 대기/);assert.match(view.summary,/11월 공시는 과거 기록/);
        assert.doesNotMatch(view.body,/11월 발권분 현재 적용|11월 현재 공시/,'old November notices cannot become current future data');
        assert.equal(await page.evaluate(()=>AeroHomePlatform.landingState('YP').current.status),'missing','unsupported month has no current amount');
        assert.equal(view.forecastLabel,'유류할증료 전망','old forecast keeps a generic label when next month has no matching forecast');
        assert.doesNotMatch(view.forecastLabel,/2027|1월|2월/,'calendar cannot relabel existing December forecast as January or February');
      }
      assert.deepEqual(errors,[],after+' console exceptions');results.push({case:'KST boundary',before,after,state,summary:view.summary,beforeSignal:beforeView.nextSignal,forecastLabel:view.forecastLabel});await ctx.close();
    }
    }
    // Keep the tab open across midnight with no focus/visibility event. This
    // exercises the actual scheduled rollover rather than only the fallback.
    const timerContext=await context(),timerPage=await timerContext.newPage(),timerErrors=[];
    timerPage.on('pageerror',e=>timerErrors.push(e.message));
    const before='2026-11-30T14:59:59Z';
    await timerPage.clock.install({time:new Date(before)});await timerPage.clock.pauseAt(new Date(before));
    await timerPage.goto(origin+'/',{waitUntil:'domcontentloaded'});
    assert.equal(await timerPage.evaluate(()=>AeroNoticePeriod.state().relation),'current','before Korea midnight');
    const original=await timerPage.evaluate(()=>JSON.stringify(NOVEMBER_2026_OFFICIAL_NOTICES));
    await timerPage.clock.runFor(1100);
    const state=await timerPage.evaluate(()=>AeroNoticePeriod.state()),summary=await timerPage.locator('#decisionList li').first().innerText();
    assert.equal(state.currentMonth,'2026-12');assert.equal(state.relation,'archive');
    assert.equal(summary,await timerPage.evaluate(()=>AeroNoticePeriod.copy('ko').summary),'open-tab timer updates visible summary without focus');
    assert.match(summary,/12월 자료 확인 대기/);assert.match(summary,/11월 공시는 과거 기록/);
    assert.equal(await timerPage.locator('[data-i18n="index.quick.jul.name"]').innerText(),'유류할증료 전망','midnight timer cannot create a January forecast label');
    assert.equal(await timerPage.evaluate(()=>JSON.stringify(NOVEMBER_2026_OFFICIAL_NOTICES)),original,'midnight timer cannot renew notice data');
    assert.equal(state.sourceVerifiedAt,'2026-10-29T07:54:00+09:00');assert.deepEqual(timerErrors,[]);
    results.push({case:'open-tab midnight timer',before,advancedMilliseconds:1100,state,summary,errors:timerErrors});await timerContext.close();
    fs.writeFileSync(path.join(out,timerOnly?'timer-verification.json':boundaryOnly?'boundary-verification.json':'verification.json'),JSON.stringify({reviewTime,results},null,2));
    console.log('PASS: '+(timerOnly?'open-tab Korea midnight timer without focus, unchanged notice data':boundaryOnly?'3 Korea-time month boundaries, verified upcoming notice signal, unchanged forecast identity, open-tab midnight timer':'initial no-JS snapshot, 6 languages, currency switching, real 14-second stability, desktop/mobile, 3 Korea-time month boundaries and open-tab midnight timer; no invented future notices')+'. Evidence: '+out);
  }finally{if(browser)await browser.close();server.kill();}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
