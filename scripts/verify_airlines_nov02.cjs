const {chromium}=require('playwright'),assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const origin='http://127.0.0.1:4173',out=path.join(process.env.TEMP,'aero-airlines-nov02');fs.mkdirSync(out,{recursive:true});
const pages=['airlines','fuel-surcharge-korean-air','fuel-surcharge-asiana','fuel-surcharge-jejuair','fuel-surcharge-jinair','fuel-surcharge-tway'];
(async()=>{const b=await chromium.launch();try{for(const name of pages){
 const p=await b.newPage({viewport:{width:1440,height:1000}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.route('**/*',r=>r.request().url().startsWith(origin)?r.continue():r.abort());
 await p.goto(origin+'/'+name);await p.waitForTimeout(4400);
 for(const l of ['ko','en','ja','zh','fr','de']){
  await p.selectOption('#navLang',l);await p.waitForTimeout(400);
  const x=await p.evaluate(()=>({body:document.body.innerText,month:window.NEXT_MONTH,title:document.title,rows:[...document.querySelectorAll('#surchargeTableBody tr')].map(r=>[...r.cells].map(c=>c.textContent)),compare:window.OFFICIAL_COMPARE_DATA,notices:NOVEMBER_2026_OFFICIAL_NOTICES,h1:document.querySelectorAll('h1').length,overflow:document.documentElement.scrollWidth>innerWidth}));
  assert.equal(x.h1,1);assert(!x.overflow);assert(!/undefined|\?\?\?\?/.test(x.body));assert(x.body.includes('2026-11-01~11-30'));
  if(name==='airlines'){
   assert.equal(x.month,'2026.11');assert.equal(await p.locator('.airline-row').count(),9);
   for(const n of x.notices){assert.deepEqual(x.compare[n.code].map(r=>r.v5),n.november);assert.deepEqual(x.compare[n.code].map(r=>r.band),n.bands);}
   assert.equal(x.compare.YP.length,6);assert.equal(x.compare.TW[5].v5,null);
   await p.locator('.airline-row[data-code="KE"]').click();assert((await p.locator('#detail-KE').innerText()).includes('55,600'));
  }else{
   const code={'fuel-surcharge-korean-air':'KE','fuel-surcharge-asiana':'OZ','fuel-surcharge-jejuair':'7C','fuel-surcharge-jinair':'LJ','fuel-surcharge-tway':'TW'}[name],n=x.notices.find(n=>n.code===code);
   assert.equal(x.rows.length,n.bands.length);n.november.forEach((v,i)=>assert.equal(x.rows[i][3],v==null?'—':n.currency+' '+v.toLocaleString('en-US')));
   assert(!(await p.locator('#sectionTitle').innerText()).includes('8'));
  }
 }
 await p.selectOption('#navLang','ko');await p.waitForTimeout(400);await p.screenshot({path:path.join(out,name+'-desktop.png'),fullPage:true});
 await p.setViewportSize({width:390,height:844});await p.waitForTimeout(300);assert(!await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));await p.screenshot({path:path.join(out,name+'-mobile.png'),fullPage:true});
 assert.deepEqual(errors,[]);await p.close();console.log(name+' PASS');
}console.log('Screenshots: '+out);}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
