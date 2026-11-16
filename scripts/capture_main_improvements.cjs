const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const stage=process.argv[2],state=process.argv[3];
if(!/^[123]$/.test(stage)||!['before','after'].includes(state))throw new Error('Usage: node scripts/capture_main_improvements.cjs 1|2|3 before|after');
const base=process.env.AERO_QA_ORIGIN||'http://127.0.0.1:4221';
const out=path.resolve('docs/review-evidence/main-improvements-20261116');fs.mkdirSync(out,{recursive:true});
(async()=>{const browser=await chromium.launch();try{
 for(const [device,width,height] of [['desktop',1366,768],['mobile',375,812]]){
  const context=await browser.newContext({viewport:{width,height}});
  await context.route('**/*',r=>r.request().url().startsWith(base+'/')&&!r.request().url().includes('/api/')?r.continue():r.abort());
  const page=await context.newPage();await page.clock.setFixedTime(new Date('2026-11-16T03:00:00Z'));
  await page.goto(base+'/index.html');await page.waitForTimeout(4500);
  if(stage!=='2'){const deny=page.locator('#aeroConsentDeny');if(await deny.isVisible())await deny.click();}
  const prefix=`step-${stage}-${state}-${device}`;
  await page.screenshot({path:path.join(out,prefix+'.png')});
  if(stage==='1')await page.locator('#miniGrid').screenshot({path:path.join(out,prefix+'-table.png')});
  const evidence=await page.evaluate(()=>({
   notices:window.NOVEMBER_2026_OFFICIAL_NOTICES,
   comparisons:window.AeroHomePlatform&&Object.fromEntries(window.NOVEMBER_2026_OFFICIAL_NOTICES.map(n=>[n.code,window.AeroHomePlatform.landingComparison(n.code)])),
   links:[...document.querySelectorAll('#miniGrid .mini-notice-btn')].map(a=>a.href),
   rows:[...document.querySelectorAll('#miniGrid .mini-card')].map(e=>({code:e.dataset.airline,top:e.getBoundingClientRect().top,bottom:e.getBoundingClientRect().bottom})),
   overflow:document.documentElement.scrollWidth>innerWidth,
   viewport:{width:innerWidth,height:innerHeight},
   consentBar:(()=>{const e=document.getElementById('aeroPrivacyBar')||document.getElementById('aeroPrivacy');if(!e)return null;const r=e.getBoundingClientRect();return {top:r.top,bottom:r.bottom,height:r.height};})(),
   search:(()=>{const r=document.querySelector('.search-panel').getBoundingClientRect();return {top:r.top,bottom:r.bottom};})()
  }));
  fs.writeFileSync(path.join(out,prefix+'.json'),JSON.stringify(evidence,null,2));
  if(stage==='2'&&state==='after'){
   assert.equal(evidence.overflow,false,device+' no horizontal overflow');
   assert(evidence.consentBar.height<=56,device+' thin consent bar');
   assert(evidence.search.top>=0&&evidence.search.bottom<=evidence.consentBar.top,device+' search is unobscured');
   assert(evidence.rows[0].top>=0&&evidence.rows[2].bottom<=evidence.consentBar.top,device+' first three notice rows are unobscured');
   console.log(device+': bar '+evidence.consentBar.height+'px, third row bottom '+evidence.rows[2].bottom+', bar top '+evidence.consentBar.top);
  }
  if(stage==='3'){
   await page.locator('#originAirportInput').fill('ICN');await page.locator('#originAirportInput').press('Enter');
   await page.locator('#destAirportInput').fill('NRT');await page.locator('#destAirportInput').press('Enter');
   await page.locator('#searchBtn').click();await page.locator('#affiliateSection').waitFor({state:'visible'});await page.waitForTimeout(400);
   await page.locator('#affiliateSection').scrollIntoViewIfNeeded();
   await page.screenshot({path:path.join(out,prefix+'-route.png')});
   await page.locator('#affiliateSection').screenshot({path:path.join(out,prefix+'-route-cta.png')});
   const routeLink=await page.locator('#affiliateSection .cta-main-btn').getAttribute('href');
   await page.goto(base+'/forecast.html');await page.waitForTimeout(4500);
   await page.locator('.fore-myrealtrip-box').scrollIntoViewIfNeeded();
   await page.screenshot({path:path.join(out,prefix+'-forecast.png')});
   await page.locator('.fore-myrealtrip-box').screenshot({path:path.join(out,prefix+'-forecast-cta.png')});
   const forecastLink=await page.locator('.fore-myrealtrip-btn').getAttribute('href');
   fs.writeFileSync(path.join(out,prefix+'-cta.json'),JSON.stringify({route:{origin:'ICN',destination:'NRT',href:routeLink},forecast:{href:forecastLink},forecastOverflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)},null,2));
  }
  await context.close();
 }
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
