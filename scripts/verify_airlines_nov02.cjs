'use strict';
const {chromium}=require('playwright');
const assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs'),os=require('node:os');
const trust=require('../public/source-provenance.js');
const base=(process.env.BASE_URL||'http://127.0.0.1:4173').replace(/\/$/,''),origin=new URL(base).origin;
const out=path.join(os.tmpdir(),'aero-airlines-nov02');fs.mkdirSync(out,{recursive:true});
const pages=['airlines','fuel-surcharge-korean-air','fuel-surcharge-asiana','fuel-surcharge-jejuair','fuel-surcharge-jinair','fuel-surcharge-tway'];
const languages=['ko','en','ja','zh','fr','de'];
const detailCodes={'fuel-surcharge-korean-air':'KE','fuel-surcharge-asiana':'OZ','fuel-surcharge-jejuair':'7C','fuel-surcharge-jinair':'LJ','fuel-surcharge-tway':'TW'};
const norm=value=>String(value||'').replace(/\s+/g,' ').trim();
const amount=(value,currency)=>value==null?'—':currency+' '+value.toLocaleString('en-US');
const nativeAmount=(value,currency)=>(currency==='KRW'?'₩':'USD ')+value.toLocaleString('en-US');
const toggle=(page,code)=>page.locator('.airline-row[data-code="'+code+'"] .expand-hint');

async function noticeSnapshot(page){
 return page.evaluate(()=>JSON.stringify(window.NOVEMBER_2026_OFFICIAL_NOTICES));
}

function verifyNotices(notices,label){
 assert.equal(notices.length,9,label+' notice count');
 assert.equal(new Set(notices.map(n=>n.code)).size,9,label+' distinct airlines');
 for(const n of notices){
  const reviewed=trust.getNotice(n.code,'2026.11');assert(reviewed,n.code+' reviewed notice exists');
  assert.deepEqual(n.november,reviewed.amounts,n.code+' all November amounts match independent source snapshot');
  assert.deepEqual(n.bands,reviewed.bands,n.code+' reviewed bands');
  assert.equal(n.currency,reviewed.currency,n.code+' original currency');
  assert.equal(n.url,reviewed.sourceUrl,n.code+' original notice URL');
  assert.equal(n.ticketingStart,'2026-11-01',n.code+' November ticketing start');
  assert.equal(n.ticketingEnd,'2026-11-30',n.code+' November ticketing end');
  if(reviewed.effectiveFrom)assert.equal(n.ticketingStart,reviewed.effectiveFrom,n.code+' reviewed ticketing start');
  if(reviewed.effectiveTo)assert.equal(n.ticketingEnd,reviewed.effectiveTo,n.code+' reviewed ticketing end');
  const october=trust.getNotice(n.code,'2026.10');
  if(october)assert.deepEqual(n.october,october.amounts,n.code+' reviewed October amounts');
 }
 assert.equal(notices.find(n=>n.code==='YP').november.length,6,'YP retains six actual notice bands');
 assert.equal(notices.find(n=>n.code==='TW').november[5],null,'unpublished TW amount stays null');
}

async function assertExpanded(page,code,expanded,label){
 await page.waitForFunction(({code,expanded})=>document.querySelector('.airline-row[data-code="'+code+'"] .expand-hint')?.getAttribute('aria-expanded')===String(expanded),{code,expanded},{timeout:3000});
 assert.equal(await toggle(page,code).evaluate(el=>el.tagName),'BUTTON',label+' native disclosure button');
 assert.equal(await toggle(page,code).getAttribute('aria-controls'),'detail-'+code,label+' controlled panel');
 assert.equal(await page.locator('#detail-'+code).isVisible(),expanded,label+' actual panel visibility');
}

async function ensureOpen(page,code){
 const button=toggle(page,code);
 if(await button.getAttribute('aria-expanded')!=='true')await button.click();
 await assertExpanded(page,code,true,code);
}

async function verifyKeyboard(page,label){
 await ensureOpen(page,'KE');
 for(const [key,expanded] of [['Enter',false],['Space',true],['Enter',false],['Space',true]]){
  await toggle(page,'KE').focus();await toggle(page,'KE').press(key);
  await assertExpanded(page,'KE',expanded,label+' '+key);
  assert.equal(await toggle(page,'KE').evaluate(el=>document.activeElement===el),true,label+' focus survives '+key+' render');
 }
 await page.selectOption('#navCurr','USD');await assertExpanded(page,'KE',true,label+' currency change');
 await page.selectOption('#navCurr','KRW');await assertExpanded(page,'KE',true,label+' currency restore');
}

async function verifyLink(page,link,source,code,label){
 assert.equal(await link.getAttribute('href'),source,label+' exact source URL');
 assert.equal(await link.getAttribute('target'),'_blank',label+' separate browsing context');
 assert.match(await link.getAttribute('rel'),/\bnoopener\b/,label+' source rel');
 assert.equal(await link.isVisible(),true,label+' source is visible');
 const before=await toggle(page,code).getAttribute('aria-expanded');
 // Exercise normal click bubbling without opening an external document.
 await link.evaluate(el=>el.addEventListener('click',event=>event.preventDefault(),{capture:true,once:true}));
 await link.click();
 assert.equal(await toggle(page,code).getAttribute('aria-expanded'),before,label+' source click must not toggle the panel');
 await assertExpanded(page,code,before==='true',label+' source click');
}

async function verifyIndexAmounts(page,notices,label){
 for(const currency of ['KRW','USD']){
  await page.selectOption('#navCurr',currency);
  for(const n of notices.filter(n=>n.currency===currency)){
   await ensureOpen(page,n.code);
   const panel=page.locator('#detail-'+n.code),rows=await panel.locator('.cmp-tbl tbody tr').evaluateAll(trs=>trs.map(tr=>[...tr.cells].map(cell=>cell.textContent)));
   assert.equal(rows.length,n.bands.length,label+' '+n.code+' comparison rows');
   const empty=await page.evaluate(()=>({none:T('noService'),pending:T('notPublished'),equal:T('noChange')}));
   n.bands.forEach((band,i)=>{
    const row=rows[i],old=n.october[i],current=n.november[i],bothEmpty=old==null&&current==null;
    assert.equal(norm(row[0]),band,label+' '+n.code+' band '+i);
    assert.equal(norm(row[2]),old==null?(bothEmpty?empty.none:'—'):nativeAmount(old,currency),label+' '+n.code+' October '+i);
    assert.equal(norm(row[3]),current==null?(bothEmpty?empty.none:empty.pending):nativeAmount(current,currency),label+' '+n.code+' November '+i);
    let difference;
    if(current==null)difference=empty.pending;
    else if(old==null)difference='—';
    else if(current===old)difference=empty.equal;
    else{const delta=current-old,sign=delta>0?'+':'';difference=sign+nativeAmount(delta,currency)+' ('+sign+(delta/old*100).toFixed(1)+'%)';}
    assert.equal(norm(row[4]),difference,label+' '+n.code+' original-currency difference/percent '+i);
   });
   const mainSource=page.locator('.airline-row[data-code="'+n.code+'"] a.cell-src-link').first();
   await verifyLink(page,mainSource,n.url,n.code,label+' '+n.code+' main');
   const detailSources=panel.locator('a.detail-src-link');assert(await detailSources.count()>0,n.code+' detail source present');
   for(const source of await detailSources.all())assert.equal(await source.getAttribute('href'),n.url,n.code+' detail source uses current reviewed notice');
   await verifyLink(page,detailSources.first(),n.url,n.code,label+' '+n.code+' detail');
  }
 }
 await page.selectOption('#navCurr','KRW');await ensureOpen(page,'KE');
 assert((await page.locator('#detail-KE').innerText()).includes('55,600'),label+' existing KE November amount assertion');
}

async function verifySearchAndFilters(page,label){
 const airlines=await page.evaluate(()=>KR_AIRLINES.map(a=>({code:a.code,name:a.name,url:a.officialNoticeUrl,source:a.officialDataSource})));
 const visibleCodes=()=>page.locator('.airline-row').evaluateAll(rows=>rows.map(row=>row.dataset.code));
 const search=page.locator('#searchInput');
 await search.fill('  ke  ');assert.deepEqual(await visibleCodes(),['KE'],label+' trimmed case-insensitive IATA search');
 assert.equal(norm(await page.locator('#countLabel').innerText()),'1/9',label+' search count');
 await assertExpanded(page,'KE',false,label+' search closes panel');
 assert.equal(await search.evaluate(el=>document.activeElement===el),true,label+' search retains focus');
 await search.fill(airlines.find(a=>a.code==='KE').name);assert.deepEqual(await visibleCodes(),['KE'],label+' airline name search');
 await search.fill('no-such-airline-qa');assert.deepEqual(await visibleCodes(),[],label+' no-result search');
 assert.equal(norm(await page.locator('#countLabel').innerText()),'0/9',label+' no-result count');
 assert.equal(norm(await page.locator('#tableBody').innerText()),await page.evaluate(()=>T('noResults')),label+' localized empty state');
 await search.fill('');assert.equal(await page.locator('.airline-row').count(),9,label+' clearing search restores rows');
 for(const filter of ['official','missing','blocked','all']){
  await page.locator('.ftab[data-f="'+filter+'"]').click();
  const expected=airlines.filter(a=>filter==='all'||(filter==='official'&&a.url)||(filter==='missing'&&!a.url)||(filter==='blocked'&&a.source==='blocked')).map(a=>a.code);
  assert.deepEqual(await visibleCodes(),expected,label+' '+filter+' filter');
  assert.equal(await page.locator('.ftab.active').getAttribute('data-f'),filter,label+' active filter');
  assert.equal(norm(await page.locator('#countLabel').innerText()),expected.length+'/9',label+' filter count');
 }
 await ensureOpen(page,'KE');
}

async function main(){
 const browser=await chromium.launch();
 try{
  for(const name of pages){
   const context=await browser.newContext({viewport:{width:1440,height:1000}});
   await context.route('**/*',route=>{
    const url=new URL(route.request().url());
    return url.origin===origin&&url.pathname!=='/api'&&!url.pathname.startsWith('/api/')?route.continue():route.abort();
   });
   const page=await context.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.stack||error.message));
   await page.clock.setFixedTime(new Date('2026-11-15T00:00:00Z'));
   await page.goto(base+'/'+name);await page.waitForTimeout(4400);
   const original=await noticeSnapshot(page),notices=JSON.parse(original);verifyNotices(notices,name);
   for(const lang of languages){
    const label=name+' '+lang;
    await page.selectOption('#navLang',lang);await page.waitForTimeout(400);
    const x=await page.evaluate(()=>({body:document.body.innerText,month:window.NEXT_MONTH,rows:[...document.querySelectorAll('#surchargeTableBody tr')].map(r=>[...r.cells].map(c=>c.textContent)),compare:window.OFFICIAL_COMPARE_DATA,h1:document.querySelectorAll('h1').length,overflow:document.documentElement.scrollWidth>innerWidth}));
    assert.equal(x.h1,1,label+' single h1');assert(!x.overflow,label+' desktop overflow');assert(!/undefined|\?\?\?\?/.test(x.body),label+' readable text');assert(x.body.includes('2026-11-01~11-30'),label+' original effective period');
    if(name==='airlines'){
     assert.equal(x.month,'2026.11');assert.equal(await page.locator('.airline-row').count(),9);
     for(const n of notices){
      assert.deepEqual(x.compare[n.code].map(r=>r.v5),n.november,n.code+' November comparison data');
      assert.deepEqual(x.compare[n.code].map(r=>r.v4),n.october,n.code+' October comparison data');
      assert.deepEqual(x.compare[n.code].map(r=>r.band),n.bands,n.code+' comparison bands');
      assert(x.compare[n.code].every(r=>r.cur===n.currency),n.code+' original comparison currency');
     }
     assert.equal(x.compare.YP.length,6);assert.equal(x.compare.TW[5].v5,null);
     await verifyKeyboard(page,label);await verifyIndexAmounts(page,notices,label);await verifySearchAndFilters(page,label);
    }else{
     const n=notices.find(n=>n.code===detailCodes[name]);assert.equal(x.rows.length,n.bands.length);
     n.november.forEach((value,i)=>{
      assert.equal(x.rows[i][0],n.bands[i],label+' band '+i);
      assert.equal(x.rows[i][2],amount(n.october[i],n.currency),label+' October '+i);
      assert.equal(x.rows[i][3],amount(value,n.currency),label+' November '+i);
      assert.equal(x.rows[i][4],value==null||n.october[i]==null?'—':amount(value-n.october[i],n.currency),label+' difference '+i);
     });
     for(const href of await page.locator('#surchargeTableBody a').evaluateAll(links=>links.map(a=>a.getAttribute('href'))))assert.equal(href,n.url,label+' detail table original source');
     assert(!(await page.locator('#sectionTitle').innerText()).includes('8'));
     const originalRows=JSON.stringify(x.rows);
     await page.selectOption('#navCurr','USD');
     assert.equal(await page.locator('#surchargeTableBody tr').evaluateAll(rows=>JSON.stringify(rows.map(row=>[...row.cells].map(cell=>cell.textContent)))),originalRows,label+' native notice table is unchanged by display currency');
     await page.selectOption('#navCurr','KRW');
    }
    assert.equal(await noticeSnapshot(page),original,label+' all original notice arrays and conditions unchanged');
    await page.setViewportSize({width:390,height:844});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,label+' mobile overflow');
    if(name==='airlines'){
     await ensureOpen(page,'KE');
     await verifyLink(page,page.locator('.airline-row[data-code="KE"] a.cell-src-link').first(),notices.find(n=>n.code==='KE').url,'KE',label+' mobile');
    }
    await page.setViewportSize({width:1440,height:1000});
   }
   await page.selectOption('#navLang','ko');await page.waitForTimeout(400);
   await page.screenshot({path:path.join(out,name+'-desktop.png'),fullPage:true});
   await page.setViewportSize({width:390,height:844});await page.waitForTimeout(300);
   assert(!await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
   await page.screenshot({path:path.join(out,name+'-mobile.png'),fullPage:true});
   assert.equal(await noticeSnapshot(page),original,name+' final original notices unchanged');
   assert.deepEqual(errors,[],name+' page errors');await context.close();console.log(name+' PASS');
  }
  console.log('PASS: six pages × six languages, original October/November amounts and changes, keyboard disclosures, search/filters, source links and mobile. Screenshots: '+out);
 }finally{await browser.close();}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
