const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const origin='http://127.0.0.1:4173',out=path.join(process.env.TEMP,'aero-nov03-qa');fs.mkdirSync(out,{recursive:true});
(async()=>{const b=await chromium.launch();try{
 for(const name of ['forecast','news']){
  const p=await b.newPage({viewport:{width:1440,height:1000}}),errors=[];
  p.on('pageerror',e=>errors.push(e.message));await p.route('**/*',r=>r.request().url().startsWith(origin)?r.continue():r.abort());
  await p.goto(origin+'/'+name);await p.waitForTimeout(1800);
  for(const lang of ['ko','en','ja','zh','fr','de']){
   await p.selectOption('#navLang',lang);await p.waitForTimeout(600);
   const x=await p.evaluate(()=>({n:AERO_MARKET_NUMBERS_LATEST,r:AERO_MARKET_RELEASE,body:document.body.innerText,h1:document.querySelector('h1').textContent,canon:document.querySelector('link[rel="canonical"]').href,schemas:[...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(s=>{const j=JSON.parse(s.textContent);return j['@graph']||[j];}),overflow:document.documentElement.scrollWidth>innerWidth}));
   assert.equal(x.n.informationCutoff,'2026-11-03T09:00:00+09:00');assert.equal(x.n.currentStage,27);assert.equal(x.n.octoberStatus,'archive');
   assert.equal(x.n.usdKrw,1343.8);assert.equal(x.n.usdKrwDate,'2026-11-02');assert.equal(x.n.brentUsdPerBbl,104.77);assert.equal(x.n.wtiUsdPerBbl,96.46);
   assert.equal(x.n.decemberMopsUsdPerBbl,null);assert.equal(x.n.decemberAverageUsdKrw,null);assert.equal(x.n.decemberStageEstimate,null);assert.equal(x.n.crudeIntradayAt,null);
   assert.equal(x.n.imoCumulativeConfirmedIncidents,null);assert.equal(x.n.imoUserProvidedIncidentCount,123);
   assert.deepEqual(x.n.mopsMonthlyConfirmed.map(v=>v.usdPerBbl),[149.29,158.57,173.89,null]);
   assert.equal(x.canon,'https://aero-surcharge.com/'+name);assert.equal(await p.title(),x.r.packs[lang].meta);assert.equal(x.h1,x.r.packs[lang].title);
   for(const v of ['1,343.8','104.77','96.46','173.89','168.42','123','Al Mayeda'])assert(x.body.includes(v),name+' '+lang+' '+v);
   assert(!/undefined|\?\?\?\?|AERO_MARKET_NUMBERS/.test(x.body));assert(!x.overflow);
   const cards=x.r.newsCards.filter(c=>c.id.startsWith('market-20261103-'));assert.equal(cards.length,10);assert(x.r.newsCards.some(c=>c.id.startsWith('market-20261102-')));
   assert.equal(cards[3].eventDate,'2026-11-01');assert.equal(cards[5].eventDate,'2026-10-30');assert.equal(cards[6].sourceVerificationStatus,'attributed_claim_independently_unverified');
   for(const s of x.schemas.filter(s=>/^(WebPage|CollectionPage|FAQPage)$/.test(s['@type'])))assert.equal(s.dateModified,x.r.modified);
   if(name==='forecast')assert(x.schemas.some(s=>s['@type']==='FAQPage'&&s.mainEntity.length===7));
   else for(const c of cards){const s=x.schemas.find(s=>s['@type']==='NewsArticle'&&s.url.endsWith('#'+c.id));assert(s);assert.equal(s.articleBody,c.i18n[lang].summary+' '+c.i18n[lang].impact);}
  }
  await p.selectOption('#navLang','ko');await p.waitForTimeout(800);const reject=p.getByText('모두 거부',{exact:true});if(await reject.count())await reject.click();
  await p.screenshot({path:path.join(out,name+'-desktop.png'),fullPage:true});await p.screenshot({path:path.join(out,name+'-desktop-top.png')});
  await p.setViewportSize({width:390,height:844});await p.waitForTimeout(400);assert(!await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
  await p.screenshot({path:path.join(out,name+'-mobile.png'),fullPage:true});await p.screenshot({path:path.join(out,name+'-mobile-top.png')});
  const title=await p.title();await p.waitForTimeout(12000);assert.equal(await p.title(),title);assert.deepEqual(errors,[]);await p.close();console.log(name+' six locales, schema, layout and stability PASS');
 }
 const p=await b.newPage();await p.route('**/*',r=>r.request().url().startsWith(origin)?r.continue():r.abort());await p.goto(origin+'/fuel-surcharge-graph');await p.waitForTimeout(1500);
 assert(await p.evaluate(()=>{const c=document.querySelector('#graphCanvas');return c.getContext('2d').getImageData(0,0,c.width,c.height).data.some((v,i)=>i%4===3&&v>0);}));
 await p.setViewportSize({width:390,height:844});assert(!await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
 console.log('Graph nonblank, mobile PASS. '+out);
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
