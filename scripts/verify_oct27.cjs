const {chromium}=require('playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const origin='http://localhost:4173',stamp='2026-10-27T07:30:00+09:00';
const out=path.join(process.env.TEMP,'aero-oct27-qa');fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch(),base=await browser.newPage();
 await base.route('**/*',r=>!r.request().url().startsWith(origin)||r.request().url().includes('/market-oct27.js')?r.abort():r.continue());
 await base.goto(origin+'/news');await base.waitForTimeout(1800);
 const old=await base.evaluate(()=>({cards:AERO_MARKET_RELEASE.newsCards,fares:NOVEMBER_2026_OFFICIAL_NOTICES,rows:AERO_MARKET_RELEASE.officialRows,urls:AERO_MARKET_RELEASE.officialUrls}));await base.close();
 const pending=[];
 for(const name of ['forecast','news']){
  const p=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
  p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.url().startsWith(origin)&&r.status()>=400)errors.push(r.url());});
  await p.route('**/*',r=>r.request().url().startsWith(origin)?r.continue():r.abort());await p.goto(origin+'/'+name);
  for(const lang of ['ko','en','ja','zh','fr','de']){
   await p.selectOption('#navLang',lang);await p.waitForTimeout(1250);
   // The existing global analytics widget is outside this market update's locale surface.
   const x=await p.evaluate(lang=>{const r=AERO_MARKET_RELEASE;return {n:r.numbers,rows:r.rows[lang],cards:r.newsCards,fares:NOVEMBER_2026_OFFICIAL_NOTICES,official:r.officialRows,urls:r.officialUrls,body:document.body.innerText,h1:document.querySelectorAll('h1').length,schemas:[...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(e=>{const j=JSON.parse(e.textContent);return j['@graph']||[j];}),overflow:document.documentElement.scrollWidth>innerWidth,hangul:[...document.querySelectorAll('body *')].filter(e=>!e.closest('#aeroPrivacy,.aero-privacy-open')&&!e.children.length&&!['SCRIPT','STYLE','OPTION'].includes(e.tagName)&&e.getBoundingClientRect().height>0&&/[가-힣]/.test(e.innerText)).map(e=>e.innerText),clipped:[...document.querySelectorAll('.news-card .news-summary')].filter(e=>e.clientHeight>0&&e.scrollHeight>e.clientHeight+2).length};},lang);
   assert.equal(x.rows.length,5);assert.equal(x.h1,1);assert.equal(x.overflow,false);assert.equal(x.clipped,0);assert(!/undefined|\?\?\?\?/.test(x.body));if(lang!=='ko')assert.deepEqual(x.hangul,[]);
   for(const v of ['2026.10.27 07:30 KST','173.89','179.94','176.59','1,326.09','115.81','101.76'])assert(x.body.includes(v),name+' '+lang+' '+v);
   assert.equal(x.n.octoberLevel,23);assert.equal(x.n.novemberLevel,27);assert.equal(x.n.decemberMopsUsdPerBbl,null);assert.equal(x.n.decemberStageEstimate,null);assert.equal(x.n.decemberDirectionConfidence,'low');assert.equal(x.n.decemberStageConfidence,'judgment_reserved');
   assert.equal(x.n.crudePriceKind,'settlement');assert.equal(x.n.wtiContractMonth,'2026-12');assert.equal(x.n.hormuzUsFacilitatedTransits,101);assert.equal(x.n.hormuzJmicWaitingVesselsApprox,492);
   assert.deepEqual(x.cards.filter(c=>!c.id.startsWith('market-20261027-')),old.cards);assert.deepEqual(x.fares,old.fares);assert.equal(x.fares.length,8);assert.deepEqual(x.official,old.rows);assert.deepEqual(x.urls,old.urls);
   const fresh=x.cards.filter(c=>c.id.startsWith('market-20261027-'));assert.equal(fresh.length,9);for(const c of fresh){assert.equal(c.publishedAt,stamp);assert(c.reportedDate&&c.eventDate);assert(c.i18n[lang].summary.length>100);}
   for(const s of x.schemas.filter(s=>/^(WebPage|CollectionPage|FAQPage)$/.test(s['@type'])))assert.equal(s.dateModified,stamp);
   if(name==='forecast')assert(x.schemas.some(s=>s['@type']==='FAQPage'&&s.mainEntity.length===9));
   else{
    for(const c of fresh){const s=x.schemas.find(s=>s['@type']==='NewsArticle'&&s.url.endsWith('#'+c.id));assert(s,'missing schema '+c.id);assert.equal(s.dateModified,stamp);assert.deepEqual(s.citation,c.citationUrls);assert.equal(s.articleBody,c.i18n[lang].summary+' '+c.i18n[lang].impact);}
    for(const category of ['airline','institution','market']){await p.locator('[data-f="'+category+'"]').click();await p.waitForTimeout(120);assert(await p.locator('.news-card[id^="market-20261027-"]:visible').count()>0);}await p.locator('[data-f="all"]').click();
   }
   console.log(name,lang,'PASS');
  }
  const paths=await p.evaluate(()=>[...new Set([...document.querySelectorAll('a[href]')].map(a=>new URL(a.href)).filter(u=>u.origin===location.origin&&!u.hash).map(u=>u.pathname))]);for(const u of paths)assert((await p.request.get(origin+u)).status()<400,u);
  await p.selectOption('#navLang','ko');await p.waitForTimeout(1500);await p.screenshot({path:path.join(out,name+'-desktop.png'),fullPage:true});
  if(name==='forecast')await p.locator('table').first().screenshot({path:path.join(out,'forecast-table.png')});
  await p.setViewportSize({width:390,height:844});await p.waitForTimeout(400);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await p.screenshot({path:path.join(out,name+'-mobile.png'),fullPage:true});
  if(name==='news')await p.locator('#market-20261027-3').screenshot({path:path.join(out,'jet-card-mobile.png')});
  pending.push({p,errors,text:await p.evaluate(()=>document.body.innerText)});
 }
 await pending[0].p.waitForTimeout(54000);for(const x of pending){assert.equal(await x.p.evaluate(()=>document.body.innerText),x.text);assert.deepEqual(x.errors,[]);await x.p.close();}
 for(const name of ['index','fuel-surcharge-calculator','fuel-surcharge-graph']){const p=await browser.newPage();await p.route('**/*',r=>r.request().url().startsWith(origin)?r.continue():r.abort());await p.goto(origin+'/'+name);await p.waitForTimeout(1500);assert.deepEqual(await p.evaluate(()=>NOVEMBER_2026_OFFICIAL_NOTICES),old.fares);await p.close();console.log(name,'fare smoke PASS');}
 await browser.close();console.log('PASS: 12 locales, nine cards/FAQs, archives and eight fare tables unchanged, mobile/desktop, local links/resources, 54-second stability, home/calculator/graph fare smoke. '+out);
})().catch(e=>{console.error(e);process.exit(1);});
