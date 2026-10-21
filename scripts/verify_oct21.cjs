const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const origin='http://localhost:4173',stamp='2026-10-21T10:00:00+09:00';
const out=path.join(process.env.TEMP||'.','aero-oct21-qa');
fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch();
 const base=await browser.newPage();
 await base.route('**/*',rt=>rt.request().url().includes('/market-oct21.js')||!rt.request().url().startsWith(origin)?rt.abort():rt.continue());
 await base.goto(origin+'/news');await base.waitForTimeout(1600);
 const previous=await base.evaluate(()=>({cards:window.AERO_MARKET_RELEASE.newsCards,fares:window.NOVEMBER_2026_OFFICIAL_NOTICES,official:window.AERO_MARKET_RELEASE.officialRows,urls:window.AERO_MARKET_RELEASE.officialUrls}));
 await base.close();
 const pages=[];
 for(const name of ['forecast','news']){
  const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.url().startsWith(origin)&&r.status()>=400)errors.push(r.status()+':'+r.url());});
  await page.route('**/*',rt=>rt.request().url().startsWith(origin)?rt.continue():rt.abort());
  await page.goto(origin+'/'+name,{waitUntil:'domcontentloaded'});
  for(const l of ['ko','en','ja','zh','fr','de']){
   await page.selectOption('#navLang',l);await page.waitForTimeout(1350);
   const x=await page.evaluate(l=>{
    const r=window.AERO_MARKET_RELEASE;
    return {body:document.body.innerText,rows:r.rows[l],n:r.numbers,cards:r.newsCards,
     fares:window.NOVEMBER_2026_OFFICIAL_NOTICES,official:r.officialRows,urls:r.officialUrls,
     modified:r.modified,h1:document.querySelectorAll('h1').length,
     schemas:[...document.querySelectorAll('script[type="application/ld+json"]')].map(e=>JSON.parse(e.textContent)),
     hangul:[...document.querySelectorAll('body *')].filter(e=>!e.children.length&&!['SCRIPT','STYLE','OPTION'].includes(e.tagName)&&e.getBoundingClientRect().height>0&&/[가-힣]/.test(e.innerText)).map(e=>e.innerText),
     clipped:[...document.querySelectorAll('.news-card p,.news-card .news-summary')].filter(e=>e.getBoundingClientRect().height>0&&e.scrollHeight>e.clientHeight+2).map(e=>e.innerText),
     overflow:document.documentElement.scrollWidth>innerWidth};
   },l);
   assert.equal(x.h1,1);assert.equal(x.rows.length,5);assert.equal(x.modified,stamp);
   assert.equal(x.overflow,false);assert.deepEqual(x.clipped,[]);
   assert.equal(/undefined|[?]{4}/.test(x.body),false);if(l!=='ko')assert.deepEqual(x.hangul,[]);
   for(const text of ['173.89','170.16','1,323.65','109.64','98.58','2026.10.21 10:00 KST'])assert(x.body.includes(text),name+' '+l+' '+text);
   assert.equal(x.n.octoberLevel,23);assert.equal(x.n.novemberLevel,27);
   assert.equal(x.n.decemberMopsUsdPerBbl,null);assert.equal(x.n.decemberStageEstimate,null);
   assert.equal(x.n.decemberDirectionConfidence,'low');assert.equal(x.n.decemberStageConfidence,'judgment_reserved');
   assert.equal(x.n.usdKrw,1323.65);assert.equal(x.n.fxReferenceAt,'2026-10-21T09:42:00+09:00');
   assert.equal(x.n.crudeReferenceAt,'2026-10-21T00:22:00Z');assert.equal(x.n.hormuzLatestGulfCrudeFlowMillionBpd,null);
   assert.equal(x.n.hormuzMineClaimIndependentVerification,false);
   assert.deepEqual(x.cards.filter(c=>!c.id.startsWith('market-20261021-')),previous.cards);
   assert.deepEqual(x.fares,previous.fares);assert.equal(x.fares.length,8);
   assert.deepEqual(x.official,previous.official);assert.deepEqual(x.urls,previous.urls);
   const fresh=x.cards.filter(c=>c.id.startsWith('market-20261021-'));assert.equal(fresh.length,7);
   for(const c of fresh){assert(c.i18n[l].summary.length>75);assert.equal(c.updatedAt,stamp);assert(c.eventDate&&c.reportedDate&&c.sourceUrl);}
   for(const schema of x.schemas.filter(s=>/^(FAQPage|CollectionPage|WebPage)$/.test(s['@type'])))assert.equal(schema.dateModified,stamp);
   if(name==='forecast')assert(x.schemas.some(s=>s['@type']==='FAQPage'&&s.mainEntity.length===8));
   else{
    const articles=x.schemas.flatMap(s=>s['@graph']||[s]).filter(s=>s['@type']==='NewsArticle');
    for(const card of fresh){const article=articles.find(s=>String(s.url).endsWith('#'+card.id));assert(article,'schema missing '+card.id);assert.equal(article.datePublished,stamp);assert.equal(article.dateModified,stamp);assert.deepEqual(article.citation,card.citationUrls);assert.equal(article.articleBody,card.i18n[l].summary+' '+card.i18n[l].impact);}
    assert.equal(await page.locator('.news-card[id^="market-20261021-"]:visible').count(),7);
    assert.equal(await page.locator('.official-summary-box a').count(),8);
    for(const category of ['airline','institution','market']){
     await page.locator('[data-f="'+category+'"]').click();await page.waitForTimeout(150);
     assert(await page.locator('.news-card[id^="market-20261021-"]:visible').count()>0);
    }
    await page.locator('[data-f="all"]').click();
   }
   console.log(name,l,'PASS');
  }
  const localPaths=await page.evaluate(()=>[...new Set([...document.querySelectorAll('a[href]')].map(a=>new URL(a.href)).filter(u=>u.origin===location.origin&&!u.hash).map(u=>u.pathname))]);
  for(const url of localPaths){const response=await page.request.get(origin+url);assert(response.status()<400,response.status()+' '+url);}
  console.log(name,'local links PASS',localPaths.length);
  await page.selectOption('#navLang','ko');await page.waitForTimeout(1500);
  await page.screenshot({path:path.join(out,name+'-desktop.png'),fullPage:true});
  await page.setViewportSize({width:390,height:844});await page.waitForTimeout(500);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.screenshot({path:path.join(out,name+'-mobile.png'),fullPage:true});
  pages.push({page,name,errors,stable:await page.evaluate(()=>document.body.innerText)});
 }
 await pages[0].page.waitForTimeout(54000);
 for(const {page,name,errors,stable} of pages){assert.equal(await page.evaluate(()=>document.body.innerText),stable,name+' late renderer');assert.deepEqual(errors,[]);await page.close();}
 await browser.close();console.log('PASS: 12 page/locales; seven new cards; eight FAQs; five rows; all historical cards and eight fare tables unchanged; categories, mobile, local links/resources and delayed-render stability. '+out);
})().catch(e=>{console.error(e);process.exit(1);});
