const {chromium}=require('playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const origin='http://localhost:4173',stamp='2026-10-29T07:58:49+09:00';
const out=path.join(process.env.TEMP,'aero-oct29-qa');fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch(),base=await browser.newPage();
 await base.route('**/*',q=>!q.request().url().startsWith(origin)||q.request().url().includes('/market-oct29.js')?q.abort():q.continue());
 await base.goto(origin+'/news');await base.waitForTimeout(1500);
 const old=await base.evaluate(()=>AERO_MARKET_RELEASE.newsCards);await base.close();
 const stable=[];
 for(const name of ['forecast','news']){
  const p=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
  p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.url().startsWith(origin)&&r.status()>=400)errors.push(r.url());});
  await p.route('**/*',q=>q.request().url().startsWith(origin)?q.continue():q.abort());await p.goto(origin+'/'+name);
  for(const lang of ['ko','en','ja','zh','fr','de']){
   await p.selectOption('#navLang',lang);await p.waitForTimeout(1250);
   const x=await p.evaluate(lang=>({n:AERO_MARKET_RELEASE.numbers,rows:AERO_MARKET_RELEASE.rows[lang],faq:AERO_MARKET_RELEASE.packs[lang].faq,cards:AERO_MARKET_RELEASE.newsCards,notices:NOVEMBER_2026_OFFICIAL_NOTICES,review:NOVEMBER_2026_SOURCE_REVIEW,body:document.body.innerText,h1:document.querySelectorAll('h1').length,overflow:document.documentElement.scrollWidth>innerWidth,schemas:[...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(e=>{let j=JSON.parse(e.textContent);return j['@graph']||[j];}),hangul:[...document.querySelectorAll('body *')].filter(e=>!e.closest('#aeroPrivacy,.aero-privacy-open')&&!e.children.length&&!['SCRIPT','STYLE','OPTION'].includes(e.tagName)&&e.getBoundingClientRect().height>0&&/[가-힣]/.test(e.innerText)).map(e=>e.innerText)}),lang);
   assert.equal(x.rows.length,5);assert.equal(x.faq.length,7);assert.equal(x.h1,1);assert(!x.overflow);assert(!/undefined|\?\?\?\?/.test(x.body));if(lang!=='ko')assert.deepEqual(x.hangul,[]);
   for(const value of ['2026.10.29 07:30 KST','173.89','178.64','1,337.7','115.32','102.78'])assert(x.body.includes(value),name+' '+lang+' '+value);
   assert.equal(x.review.verifiedCount,9);assert.deepEqual(x.review.pending,[]);
   assert.equal(x.n.octoberLevel,23);assert.equal(x.n.novemberLevel,27);assert.equal(x.n.decemberMopsUsdPerBbl,null);assert.equal(x.n.decemberStageEstimate,null);assert.equal(x.n.decemberStageConfidence,'low');
   assert.deepEqual(x.cards.filter(c=>!c.id.startsWith('market-20261029-')),old);
   const fresh=x.cards.filter(c=>c.id.startsWith('market-20261029-'));assert.equal(fresh.length,8);
   for(const c of fresh){assert.equal(c.publishedAt,stamp);assert(c.reportedDate&&c.eventDate);assert(c.i18n[lang].summary.length>100);assert(c.citationUrls.every(u=>u.startsWith('https://')));}
   const yp=x.notices.find(n=>n.code==='YP');assert.deepEqual(yp.november,[48,64,107,187,236,296]);assert.deepEqual(yp.displayBandIndices,[0,1,null,2,3,4,5]);
   const card=x.cards.find(c=>c.id==='notice-202611-yp');assert(card&&card.i18n[lang].title&&!/undefined/.test(JSON.stringify(card)));assert.equal(card.reportedDate,'2026-10-27');assert.equal(card.sourcePublishedAt,'2026-10-27T09:18:18+09:00');
   for(const s of x.schemas.filter(s=>/^(WebPage|CollectionPage|FAQPage)$/.test(s['@type'])))assert.equal(s.dateModified,stamp);
   if(name==='forecast')assert(x.schemas.some(s=>s['@type']==='FAQPage'&&s.mainEntity.length===7));
   else for(const c of fresh){const s=x.schemas.find(s=>s['@type']==='NewsArticle'&&s.url.endsWith('#'+c.id));assert(s);assert.equal(s.dateModified,stamp);assert.deepEqual(s.citation,c.citationUrls);assert.equal(s.articleBody,c.i18n[lang].summary+' '+c.i18n[lang].impact);}
   console.log(name,lang,'PASS');
  }
  if(name==='news')for(const cat of ['airline','institution','market']){await p.locator('[data-f="'+cat+'"]').click();assert(await p.locator('.news-card:visible').count()>0);} 
  if(name==='news')await p.locator('[data-f="all"]').click();
  const links=await p.evaluate(()=>[...new Set([...document.querySelectorAll('a[href]')].map(a=>new URL(a.href)).filter(u=>u.origin===location.origin&&!u.hash).map(u=>u.pathname))]);for(const link of links)assert((await p.request.get(origin+link)).status()<400,link);
  await p.selectOption('#navLang','ko');await p.waitForTimeout(600);await p.screenshot({path:path.join(out,name+'-desktop.png'),fullPage:true});
  await p.setViewportSize({width:390,height:844});await p.waitForTimeout(400);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await p.screenshot({path:path.join(out,name+'-mobile.png'),fullPage:true});
  stable.push({p,errors,text:await p.evaluate(()=>document.body.innerText)});
 }
 const stabilityMs=process.argv.includes('--quick')?1000:54000;
 await stable[0].p.waitForTimeout(stabilityMs);for(const x of stable){assert.equal(await x.p.evaluate(()=>document.body.innerText),x.text);assert.deepEqual(x.errors,[]);await x.p.close();}
 for(const name of ['index','fuel-surcharge-calculator','fuel-surcharge-graph']){
  const p=await browser.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.route('**/*',q=>q.request().url().startsWith(origin)?q.continue():q.abort());await p.goto(origin+'/'+name);await p.waitForTimeout(1600);
  const x=await p.evaluate(()=>({n:NOVEMBER_2026_OFFICIAL_NOTICES.find(n=>n.code==='YP'),review:NOVEMBER_2026_SOURCE_REVIEW,home:window.AeroHomePlatform?[0,1,2,3,4,5,6].map(i=>AeroHomePlatform.recordFor('YP',i,'2026-11','ICN','NRT',false)):null,body:document.body.innerText}));
  assert.equal(x.review.verifiedCount,9);assert.deepEqual(x.n.november,[48,64,107,187,236,296]);if(x.home)assert.deepEqual(x.home.map(n=>n?n.amount:null),[48,64,null,107,187,236,296]);
  if(name==='fuel-surcharge-calculator'){
   const fares=await p.evaluate(()=>['NRT','HKG','BKK','HNL','LAX','EWR'].map(destination=>{const r=AeroCalculatorPlatform.recordFor({origin:'ICN',destination},'YP','2026-11');return r&&{amount:r.amount,status:r.status};}));
   assert.deepEqual(fares.map(r=>r?.amount),[48,64,107,187,236,296]);assert(fares.every(r=>r.status==='confirmed'));
  }
  if(name==='fuel-surcharge-graph'){
   assert.deepEqual(await p.evaluate(()=>AIRLINES.find(a=>a.code==='YP').nov),[48,64,null,107,187,236,296]);
   const nonblank=await p.evaluate(()=>{const c=document.getElementById('graphCanvas'),d=c.getContext('2d').getImageData(0,0,c.width,c.height).data;let n=0;for(let i=3;i<d.length;i+=4)if(d[i])n++;return n;});assert(nonblank>1000);
   await p.screenshot({path:path.join(out,'graph-desktop.png'),fullPage:true});await p.setViewportSize({width:390,height:844});await p.waitForTimeout(500);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await p.screenshot({path:path.join(out,'graph-mobile.png'),fullPage:true});
  }
  assert.deepEqual(errors,[]);assert(!/undefined/.test(x.body));await p.close();console.log(name,'YP data PASS');
 }
 await browser.close();console.log('PASS: 12 locales; 8 new cards; YP notice; 7 FAQs; archives preserved; local links/resources; mobile/desktop; '+stabilityMs/1000+'-second stability. '+out);
})().catch(e=>{console.error(e);process.exit(1);});
