const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const fs=require('node:fs'),path=require('node:path');
const origin='http://localhost:4173',out=path.join(process.env.TEMP,'aero-november-ze');
fs.mkdirSync(out,{recursive:true});
(async()=>{
 const b=await chromium.launch(),baseline=await b.newPage(),old={};
 for(const f of ['_shared.js','market-oct17.js','market-oct19.js'])old['/'+f]=execFileSync('git',['show','HEAD:public/'+f],{encoding:'utf8',maxBuffer:10000000});
 await baseline.route('**/*',r=>{const u=new URL(r.request().url());return old[u.pathname]?r.fulfill({contentType:'text/javascript',body:old[u.pathname]}):u.origin===origin?r.continue():r.abort();});
 await baseline.goto(origin+'/news');await baseline.waitForTimeout(1200);
 const previous=await baseline.evaluate(()=>({notices:window.NOVEMBER_2026_OFFICIAL_NOTICES,cards:window.AERO_MARKET_RELEASE.newsCards,n:window.AERO_MARKET_RELEASE.numbers}));
 await baseline.close();
 for(const name of ['news','forecast','index.html','fuel-surcharge-calculator','fuel-surcharge-graph']){
  const p=await b.newPage({viewport:{width:1440,height:1000}}),errors=[];
  p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.url().startsWith(origin)&&r.status()>=400)errors.push(r.status()+':'+r.url());});
  await p.route('**/*',r=>r.request().url().startsWith(origin)?r.continue():r.abort());
  await p.goto(origin+'/'+name);await p.waitForTimeout(1300);
  const data=await p.evaluate(()=>({n:window.NOVEMBER_2026_OFFICIAL_NOTICES,cards:window.AERO_MARKET_RELEASE?.newsCards,numbers:window.AERO_MARKET_RELEASE?.numbers,
   home:window._OFFICIAL_AMT,routes:typeof OFFICIAL_ROUTE_MAP==='undefined'?null:OFFICIAL_ROUTE_MAP,
   calc:window.SAVING_COMPARE_DATA,graph:typeof AIRLINES==='undefined'?null:AIRLINES}));
  assert.equal(data.n.length,8);assert.deepEqual(data.n.slice(0,7),previous.notices);
  const ze=data.n.find(n=>n.code==='ZE');
  assert.equal(ze.currency,'USD');assert.deepEqual(ze.november,[43,54,66,79,89,103]);assert.deepEqual(ze.october,[37,47,57,68,76,87]);
  assert.equal(ze.noticeDate,'2026-10-20');assert.equal(ze.ticketingStart,'2026-11-01');assert.equal(ze.ticketingEnd,'2026-11-30');
  if(data.cards){
   assert.deepEqual(data.cards.filter(c=>c.id!=='notice-202611-ze'),previous.cards);
   const c=data.cards.find(c=>c.id==='notice-202611-ze');assert(c);assert.equal(c.reportedDate,'2026-10-20');assert.equal(c.date,'2026-10-21');
   assert(c.i18n.ko.aiBrief.includes('+USD 6'));assert(c.i18n.ko.aiBrief.includes('+USD 16'));
   for(const k of ['asOf','usdKrw','singaporeJetFobReferenceUsdPerBbl','brentUsdPerBbl','wtiUsdPerBbl','forecastTargetMonth','decemberStageEstimate'])assert.deepEqual(data.numbers[k],previous.n[k]);
  }
  if(name==='index.html'){
   assert.deepEqual(data.home.ZE.rows.map(r=>r.august),ze.november);assert(data.home.YP.rows.every(r=>r.august==null));
   const ranges=['0-499','500-999','1000-1499','1500-1999','2000-2499','2500+'];
   ze.routesByGroup.forEach((routes,i)=>routes.forEach(route=>assert.equal(data.routes.ZE[route],ranges[i])));
   assert.equal(Object.keys(data.routes.ZE).length,ze.routesByGroup.flat().length);
  }
  if(name==='fuel-surcharge-calculator'){assert.deepEqual(data.calc.ZE.rows.map(r=>r.june),ze.november);assert(data.calc.YP.rows.every(r=>r.june==null));}
  if(data.graph){assert.deepEqual(data.graph.find(a=>a.code==='ZE').nov,ze.november);assert(data.graph.find(a=>a.code==='YP').nov.every(v=>v==null));}
  for(const l of ['ko','en','ja','zh','fr','de']){
   await p.selectOption('#navLang',l);await p.waitForTimeout(1100);
   const x=await p.evaluate(()=>({body:document.body.innerText,overflow:document.documentElement.scrollWidth>innerWidth,
    foreign:[...document.querySelectorAll('body *')].filter(x=>!x.children.length&&!['SCRIPT','STYLE','OPTION'].includes(x.tagName)&&x.getBoundingClientRect().height&&/[가-힣]/.test(x.innerText)).map(x=>x.innerText)}));
   assert(!/undefined|[?]{4}/.test(x.body));assert(!x.overflow);
   const existingHome=['항공권 총액 확인 후 바로 비교','항공권 가격 비교','여행 상품 확인','예약 타이밍 판단','대한항공','아시아나항공','에어프레미아','진에어','제주항공','티웨이항공','에어부산','에어서울'];
   const existingGraph=['단거리','중거리1','중거리2','장거리'];
   if(l!=='ko')assert.deepEqual(x.foreign.filter(t=>!(name==='index.html'&&existingHome.includes(t))&&!(name==='fuel-surcharge-calculator'&&/ → .* · /.test(t))&&!(name==='fuel-surcharge-graph'&&existingGraph.includes(t))),[]);
   if(name==='news'){
    await p.locator('#notice-202611-ze').waitFor({state:'visible',timeout:3000});
    assert.equal(await p.locator('.official-summary-box a').count(),8);
    assert((await p.locator('#officialZe').innerText()).includes('USD 43–103'));
    assert.equal(await p.locator('#officialYp a').count(),0);
    assert.equal(await p.locator('#notice-202611-ze p').evaluateAll(xs=>xs.filter(x=>x.scrollHeight>x.clientHeight+2).length),0);
    await p.locator('[data-f="airline"]').click();await p.waitForTimeout(150);assert.equal(await p.locator('#notice-202611-ze:visible').count(),1);await p.locator('[data-f="all"]').click();
   }
   console.log(name,l,'PASS');
  }
  await p.selectOption('#navLang','ko');await p.waitForTimeout(900);
  if(name==='fuel-surcharge-calculator'){
   for(const [dep,dest,expected] of [['PUS','KIX','62,350'],['ICN','KIX','78,300'],['ICN','PVG','78,300']]){
    await p.selectOption('#savingOrigin',dep,{force:true});
    const v=await p.locator('#savingDestination').evaluate((e,a)=>[...e.options].find(o=>o.value===a[0]+'-'+a[1]||o.value===a[1])?.value,[dep,dest]);
    assert(v);await p.selectOption('#savingDestination',v,{force:true});await p.click('#savingCalcBtn');await p.waitForTimeout(250);
    assert((await p.locator('.saving-table tbody tr').filter({hasText:'(ZE)'}).innerText()).includes(expected));
   }
   await p.fill('#savingPax','2');await p.click('#savingRoundTrip');await p.click('#savingCalcBtn');await p.waitForTimeout(250);
   assert((await p.locator('.saving-table tbody tr').filter({hasText:'(ZE)'}).innerText()).includes('313,200'));
  }
  if(name==='news'){await p.locator('.official-summary-box').scrollIntoViewIfNeeded();await p.screenshot({path:path.join(out,'news-notices.png')});await p.locator('#notice-202611-ze').scrollIntoViewIfNeeded();await p.screenshot({path:path.join(out,'eastar-card.png')});}
  await p.setViewportSize({width:390,height:844});await p.waitForTimeout(300);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await p.screenshot({path:path.join(out,name.replace('.html','')+'-mobile.png'),fullPage:true});assert.deepEqual(errors,[]);await p.close();
 }
 const stable=await b.newPage();await stable.route('**/*',r=>r.request().url().startsWith(origin)?r.continue():r.abort());
 await stable.goto(origin+'/news');await stable.waitForTimeout(1500);const text=await stable.locator('.official-summary-box').innerText();
 await stable.waitForTimeout(54000);assert.equal(await stable.locator('.official-summary-box').innerText(),text);assert.equal(await stable.locator('#notice-202611-ze:visible').count(),1);
 await b.close();console.log('PASS: 30 locale/page combinations; eight notices, original seven and news preserved; ZE route groups, FX comparison, return trip, mobile, resources and 54-second stability.');
})().catch(e=>{console.error(e);process.exit(1);});
