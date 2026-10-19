const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const fs=require('node:fs'),path=require('node:path');
const origin='http://localhost:4173',out=path.join(process.env.TEMP,'aero-november-bx-tw');
fs.mkdirSync(out,{recursive:true});
(async()=>{
 const b=await chromium.launch();
 const baseline=await b.newPage(),old={};
 for(const f of ['_shared.js','market-oct17.js','market-oct19.js'])old['/'+f]=execFileSync('git',['show','HEAD:public/'+f],{encoding:'utf8',maxBuffer:10000000});
 await baseline.route('**/*',r=>{const u=new URL(r.request().url());return old[u.pathname]?r.fulfill({contentType:'text/javascript',body:old[u.pathname]}):u.origin===origin?r.continue():r.abort();});
 await baseline.goto(origin+'/news');await baseline.waitForTimeout(1200);
 const previous=await baseline.evaluate(()=>({notices:window.NOVEMBER_2026_OFFICIAL_NOTICES,cards:window.AERO_MARKET_RELEASE.newsCards,rates:window.RATES}));
 await baseline.close();
 for(const name of ['news','forecast','index.html','fuel-surcharge-calculator','fuel-surcharge-graph']){
  const p=await b.newPage({viewport:{width:1440,height:1000}}),errors=[];
  p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.url().startsWith(origin)&&r.status()>=400)errors.push(r.status()+':'+r.url());});
  await p.route('**/*',r=>r.request().url().startsWith(origin)?r.continue():r.abort());
  await p.goto(origin+'/'+name);await p.waitForTimeout(1000);
  const data=await p.evaluate(()=>({n:window.NOVEMBER_2026_OFFICIAL_NOTICES,rates:window.RATES,cards:window.AERO_MARKET_RELEASE?.newsCards,official:window.AERO_MARKET_RELEASE?.officialRows.ko,home:window._OFFICIAL_AMT,calc:window.SAVING_COMPARE_DATA,graph:typeof AIRLINES==='undefined'?null:AIRLINES}));
  assert.equal(data.n.length,7);assert.deepEqual(data.n.slice(0,5),previous.notices);
  const bx=data.n.find(n=>n.code==='BX'),tw=data.n.find(n=>n.code==='TW');
  assert.deepEqual(bx.november,[43,77,90,106]);assert.deepEqual(tw.november,[43400,76000,95000,123500,133000,null,299800]);
  assert.equal(bx.currency,'USD');assert.equal(tw.currency,'KRW');
  if(data.cards){
   assert.deepEqual(data.cards.filter(c=>!['notice-202611-bx','notice-202611-tw'].includes(c.id)),previous.cards);
   assert(data.cards.find(c=>c.id==='notice-202611-tw').i18n.ko.aiBrief.includes('6,400'));
   assert(!data.cards.find(c=>c.id==='notice-202611-tw').i18n.ko.aiBrief.includes('KRW 0–'));
  }
  if(name==='index.html'){
   assert.deepEqual(data.home.BX.rows.map(r=>r.august),bx.november);
   assert.deepEqual(data.home.TW.rows.map(r=>r.august),tw.november);
   for(const c of ['ZE','YP'])assert(data.home[c].rows.every(r=>r.august==null));
  }
  if(name==='fuel-surcharge-calculator'){
   assert.deepEqual(data.calc.TW.rows.map(r=>r.june),tw.november);
   assert.deepEqual(data.calc.BX.rows.slice(0,4).map(r=>r.june),bx.november);
   for(const c of ['ZE','YP'])assert(data.calc[c].rows.every(r=>r.june==null));
  }
  if(data.graph){
   assert.deepEqual(data.graph.find(a=>a.code==='BX').nov,bx.november);
   assert.deepEqual(data.graph.find(a=>a.code==='TW').nov,tw.november);
   for(const c of ['ZE','YP'])assert(data.graph.find(a=>a.code===c).nov.every(v=>v==null));
  }
  for(const l of ['ko','en','ja','zh','fr','de']){
   await p.selectOption('#navLang',l);await p.waitForTimeout(1100);
   const x=await p.evaluate(()=>({body:document.body.innerText,overflow:document.documentElement.scrollWidth>innerWidth,
    foreign:[...document.querySelectorAll('body *')].filter(x=>!x.children.length&&!['SCRIPT','STYLE','OPTION'].includes(x.tagName)&&x.getBoundingClientRect().height&&/[가-힣]/.test(x.innerText)).map(x=>x.innerText)}));
   assert(!/undefined|[?]{4}/.test(x.body));assert(!x.overflow);
   // The home page has pre-existing Korean mini-directory/affiliate labels;
   // these are outside this notice update. Reject any additional Korean copy.
   const existingHome=['항공권 총액 확인 후 바로 비교','항공권 가격 비교','여행 상품 확인','예약 타이밍 판단','대한항공','아시아나항공','에어프레미아','진에어','제주항공','티웨이항공','에어부산','에어서울'];
   const existingGraphBands=['단거리','중거리1','중거리2','장거리'];
   if(l!=='ko')assert.deepEqual(x.foreign.filter(t=>!(name==='index.html'&&existingHome.includes(t))&&!(name==='fuel-surcharge-calculator'&&/ → .* · /.test(t))&&!(name==='fuel-surcharge-graph'&&existingGraphBands.includes(t))),[]);
   if(name==='news'){
    await p.locator('#notice-202611-bx').waitFor({state:'visible',timeout:3000});
    await p.locator('#notice-202611-tw').waitFor({state:'visible',timeout:3000});
    assert.equal(await p.locator('.official-summary-box a').count(),7);
    assert.equal(await p.locator('#notice-202611-bx:visible').count(),1);assert.equal(await p.locator('#notice-202611-tw:visible').count(),1);
    await p.locator('[data-f="airline"]').click();await p.waitForTimeout(100);assert.equal(await p.locator('#notice-202611-tw:visible').count(),1);await p.locator('[data-f="all"]').click();
   }
   console.log(name,l,'PASS');
  }
  await p.selectOption('#navLang','ko');await p.waitForTimeout(900);
  if(name==='news'){await p.locator('.official-summary-box').scrollIntoViewIfNeeded();await p.screenshot({path:path.join(out,'news-notices.png')});}
  await p.setViewportSize({width:390,height:844});await p.waitForTimeout(300);
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await p.screenshot({path:path.join(out,name.replace('.html','')+'-mobile.png'),fullPage:true});
  assert.deepEqual(errors,[]);await p.close();
 }
 const stable=await b.newPage();await stable.route('**/*',r=>r.request().url().startsWith(origin)?r.continue():r.abort());
 await stable.goto(origin+'/news');await stable.waitForTimeout(1500);const text=await stable.locator('.official-summary-box').innerText();
 await stable.waitForTimeout(54000);assert.equal(await stable.locator('.official-summary-box').innerText(),text);assert.equal(await stable.locator('.official-summary-box a').count(),7);
 await b.close();console.log('PASS: 30 page/locale combinations, seven official notices, two pending carriers, original fares/cards preserved, mobile and 54-second stability.');
})().catch(e=>{console.error(e);process.exit(1);});
