'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {spawn}=require('node:child_process'),{chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),port=Number(process.env.LOCALE_PERIOD_TEST_PORT||4203),origin='http://127.0.0.1:'+port;
const langs=['ko','en','ja','zh','fr','de'],details=['korean-air','asiana','jejuair','jinair','tway'];
const out=path.join(os.tmpdir(),'aero-extra-review'),results=[];
const selected=process.argv.find(a=>a.startsWith('--pages='));
const current={ko:/현재 적용/,en:/currently applies/,ja:/現在適用/,zh:/当前适用/,fr:/en vigueur/,de:/aktuell gültig/};
const upcoming={ko:/적용 예정/,en:/will apply next/,ja:/適用予定/,zh:/即将适用/,fr:/à venir/,de:/künftig gültig/};
const archive={ko:/자료 확인 대기.*과거 기록/,en:/data pending.*archived/,ja:/確認待ち.*過去記録/,zh:/资料待确认.*历史记录/,fr:/en attente.*archivés/,de:/ausstehend.*archiviert/};
function values(page){return page.evaluate(()=>JSON.stringify((window.NOVEMBER_2026_OFFICIAL_NOTICES||[]).map(n=>({code:n.code,currency:n.currency,bands:n.bands,amounts:n.november,start:n.ticketingStart,end:n.ticketingEnd}))));}
async function main(){
 const server=spawn(process.execPath,[path.join(__dirname,'serve_local.js')],{cwd:root,env:{...process.env,PORT:String(port)},stdio:['ignore','pipe','pipe']});let browser;
 try{
  await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Server startup timeout')),10000);server.stdout.on('data',b=>{if(String(b).includes('Local review server')){clearTimeout(timer);resolve();}});server.on('error',reject);});
  browser=await chromium.launch();const context=await browser.newContext({viewport:{width:1280,height:900}});
  await context.route('**/*',r=>r.request().url().startsWith(origin+'/')&&!r.request().url().includes('/api/')?r.continue():r.abort());
  for(const name of ['index','fuel-surcharge-calculator','airlines','fuel-surcharge-korea',...details.map(x=>'fuel-surcharge-'+x)].filter(x=>!selected||selected.slice(8).split(',').includes(x))){
   const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.clock.setFixedTime(new Date('2026-11-05T00:00:00Z'));await page.goto(origin+'/'+name);await page.waitForTimeout(800);
   const original=await values(page),isDetail=details.some(x=>name==='fuel-surcharge-'+x);
   for(const lang of langs){
    await page.clock.setFixedTime(new Date('2026-11-05T00:00:00Z'));await page.evaluate(()=>window.dispatchEvent(new Event('focus')));
    await page.selectOption('#navLang',lang);await page.waitForTimeout(180);
    assert.equal(await page.locator('html').getAttribute('lang'),lang,name+' language');
    if(name==='index'){
     const labels=await page.locator('.mini-trend-label').allTextContents();assert.equal(labels.length,9);
     assert(labels.every(s=>lang==='en'?/At least/.test(s):!/At least|higher than|Retained records/.test(s)),lang+' home comparisons translated');
     const summary=await page.locator('.mini-trend-details summary').first().getAttribute('title');
     if(!['ko','en'].includes(lang))assert.doesNotMatch(summary,/pairs in the same currency|indicative rate/);
     if(lang!=='ko')assert.doesNotMatch(await page.locator('.myrealtrip-cta .cta-kicker').first().innerText(),/[가-힣]/);
    }else if(name==='fuel-surcharge-korea'){
     const body=await page.locator('main').innerText();
     if(!['ko','en'].includes(lang))assert.doesNotMatch(body,/Check total airfare|Fuel surcharges apply|Compare October|Notice Basis|Currency Basis|Airline Index|Airlines quote in/);
     const nav=await page.locator('.nav-link').allTextContents();if(!['ko','en'].includes(lang))assert(nav.every(s=>!/Airline Index|Route Search|Calculator|Market News/.test(s)));
     assert.equal(await page.locator('meta[name="twitter:title"]').getAttribute('content'),await page.title());
     assert.equal(await page.locator('meta[name="twitter:description"]').getAttribute('content'),await page.locator('meta[name="description"]').getAttribute('content'));
    }else if(name==='fuel-surcharge-calculator'){
     const body=await page.locator('.saving-tool-sub').innerText(),save=await page.locator('#calculatorSave').innerText();
     if(!['ko','en'].includes(lang)){assert.doesNotMatch(body,/Compare monthly notices/);assert.notEqual(save,'Save route');assert.doesNotMatch(await page.locator('#savingTableWrap').innerText(),/Notice confirmed|Checking source|Published:|Cannot compare/);}
     assert.notEqual(await page.locator('#savingAirlineFilter option[value="all"]').innerText(),'전체 · All');
     await page.locator('#savingRoundTrip').click();
     if(!['ko','en'].includes(lang))assert.doesNotMatch(await page.locator('#calculatorAssumption').innerText(),/Simple round-trip estimate|Korea-origin/);
     await page.locator('#savingOneWay').click();
     await page.locator('#calculatorSave').click();
     if(!['ko','en'].includes(lang))assert.doesNotMatch(await page.locator('#calculatorSaveStatus').innerText(),/Route saved|Saved for|Choose a valid/);
    }else{
     const nav=await page.locator('.nav-link').allTextContents();if(lang!=='ko')assert(nav.every(s=>!/[가-힣]/.test(s)),name+' '+lang+' navigation');
     const sub=await page.locator('.page-sub').innerText();assert.match(sub,current[lang]);
     if(isDetail){const intro=await page.locator('.seo-intro').innerText(),cards=await page.locator('.summary-card-body').allTextContents();assert.equal(new Set([intro,...cards]).size,4,name+' distinct intro/cards');}
     for(const [date,expected] of [['2026-10-31T14:59:00Z',upcoming],['2026-11-30T15:00:00Z',archive],['2026-12-31T15:00:00Z',archive]]){
      await page.clock.setFixedTime(new Date(date));await page.evaluate(()=>window.dispatchEvent(new Event('focus')));await page.waitForTimeout(50);
      assert.match(await page.locator('.page-sub').innerText(),expected[lang],name+' '+lang+' '+date);
      assert.match(await page.locator('meta[name="description"]').getAttribute('content'),expected[lang],name+' metadata follows period');
      assert.equal(await values(page),original,name+' calendar must not change official amounts or conditions');
     }
    }
    await page.selectOption('#navCurr','USD');await page.selectOption('#navCurr','KRW');
    await page.setViewportSize({width:390,height:844});await page.waitForTimeout(80);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,name+' '+lang+' mobile overflow');
    await page.setViewportSize({width:1280,height:900});
    assert.equal(await values(page),original,name+' locale/currency preserve notice data');
    results.push({page:name,lang,passed:true});
   }
   assert.deepEqual(errors,[],name+' JavaScript errors');await page.close();
  }
  const reportName='locale-period-verification'+(selected?'-'+selected.slice(8).replace(/[^\w-]/g,'_'):'')+'.json';
  fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,reportName),JSON.stringify({checkedAt:new Date().toISOString(),results},null,2));
  console.log('PASS: '+results.length+' page/language combinations, archive/upcoming boundaries, unchanged notices, mobile and currency switching. '+out);
 }finally{if(browser)await browser.close();server.kill();}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
