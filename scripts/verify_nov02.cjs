const {chromium}=require('playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const origin='http://127.0.0.1:4173',out=path.join(process.env.TEMP,'aero-nov02-qa');
fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch();
 try{for(const name of ['forecast','news']){
  const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',r=>r.request().url().startsWith(origin)?r.continue():r.abort());
  await page.goto(origin+'/'+name);await page.waitForTimeout(1800);
  for(const lang of ['ko','en','ja','zh','fr','de']){
   await page.selectOption('#navLang',lang);await page.waitForTimeout(600);
   const x=await page.evaluate(()=>({body:document.body.innerText,r:AERO_MARKET_RELEASE,n:AERO_MARKET_NUMBERS_LATEST,schemas:[...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(s=>{const j=JSON.parse(s.textContent);return j['@graph']||[j];}),overflow:document.documentElement.scrollWidth>innerWidth}));
   assert.equal(x.r.rows[lang].length,5);assert.equal(x.r.packs[lang].faq.length,7);
   assert.equal(await page.title(),x.r.packs[lang].meta);
   assert.equal(await page.locator('h1').innerText(),x.r.packs[lang].title);
   assert.equal(x.n.currentStage,27);assert.equal(x.n.octoberStatus,'archive');assert.equal(x.n.decemberMopsUsdPerBbl,null);assert.equal(x.n.decemberStageEstimate,null);
   assert.equal(x.n.brentContractMonth,'2027-01');assert.equal(x.n.brentExpiredDecemberSettlement,117.64);
   assert.equal(x.n.decemberAverageUsdKrw,null);assert.equal(x.n.tankerInsuranceCargoValuePercentApprox,null);
   for(const v of ['173.89','168.42','1,334.3','117.64','113.43','104.12','111.92','102.34','11.7'])assert(x.body.includes(v),name+' '+lang+' missing '+v);
   assert(!/undefined|\?\?\?\?|AERO_MARKET_NUMBERS/.test(x.body));assert(!x.overflow);
   const cards=x.r.newsCards.filter(c=>c.id.startsWith('market-20261102-'));assert.equal(cards.length,7);
   assert(x.r.newsCards.some(c=>c.id.startsWith('market-20261029-')));
   for(const s of x.schemas.filter(s=>/^(WebPage|FAQPage|CollectionPage)$/.test(s['@type'])))assert.equal(s.dateModified,x.r.modified);
   if(name==='news')for(const c of cards){const s=x.schemas.find(s=>s['@type']==='NewsArticle'&&s.url.endsWith('#'+c.id));assert(s);assert.equal(s.articleBody,c.i18n[lang].summary+' '+c.i18n[lang].impact);}
  }
  await page.selectOption('#navLang','ko');await page.waitForTimeout(1000);
  await page.screenshot({path:path.join(out,name+'-desktop.png'),fullPage:true});
  await page.setViewportSize({width:390,height:844});await page.waitForTimeout(500);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.screenshot({path:path.join(out,name+'-mobile.png'),fullPage:true});
  const before=await page.locator('h1').innerText();await page.waitForTimeout(process.argv.includes('--quick')?1000:12000);assert.equal(await page.locator('h1').innerText(),before);
  if(name==='forecast')console.log('Visible copy:',(await page.locator('body').innerText()).slice(0,2500));
  assert.deepEqual(errors,[]);await page.close();console.log(name+' PASS');
 }
 const p=await browser.newPage();await p.route('**/*',r=>r.request().url().startsWith(origin)?r.continue():r.abort());
 await p.goto(origin+'/fuel-surcharge-graph');await p.waitForTimeout(1500);
 assert(await p.evaluate(()=>{const c=document.querySelector('#graphCanvas');const a=c.getContext('2d').getImageData(0,0,c.width,c.height).data;return a.some((v,i)=>i%4===3&&v>0);}));
 console.log('Graph nonblank; screenshots: '+out);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
