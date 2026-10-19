const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const origin='http://localhost:4173';
const out=path.join(process.env.TEMP||'.','aero-oct19-qa');
fs.mkdirSync(out,{recursive:true});
(async()=>{
 const b=await chromium.launch();
 // Baseline excludes only the new release, leaving all prior cards and tables intact.
 const base=await b.newPage();
 await base.route('**/*',rt=>rt.request().url().includes('/market-oct19.js')||!rt.request().url().startsWith(origin)?rt.abort():rt.continue());
 await base.goto(origin+'/news');await base.waitForTimeout(1500);
 const previous=await base.evaluate(()=>({cards:window.AERO_MARKET_RELEASE.newsCards,fares:window.NOVEMBER_2026_OFFICIAL_NOTICES,official:window.AERO_MARKET_RELEASE.officialRows,urls:window.AERO_MARKET_RELEASE.officialUrls}));
 await base.close();
 for(const name of ['forecast','news']){
  const p=await b.newPage({viewport:{width:1440,height:1000}}),errors=[];
  p.on('pageerror',e=>errors.push(e.message));
  p.on('response',r=>{if(r.url().startsWith(origin)&&r.status()>=400)errors.push(r.status()+':'+r.url());});
  await p.route('**/*',rt=>rt.request().url().startsWith(origin)?rt.continue():rt.abort());
  await p.goto(origin+'/'+name,{waitUntil:'domcontentloaded'});
  for(const l of ['ko','en','ja','zh','fr','de']){
   await p.selectOption('#navLang',l);await p.waitForTimeout(1250);
   const x=await p.evaluate(l=>{
    const r=window.AERO_MARKET_RELEASE;
    return {body:document.body.innerText,title:document.title,rows:r.rows[l],n:r.numbers,
      cards:r.newsCards,fares:window.NOVEMBER_2026_OFFICIAL_NOTICES,official:r.officialRows,urls:r.officialUrls,
      schemas:[...document.querySelectorAll('script[type="application/ld+json"]')].map(x=>JSON.parse(x.textContent)),
      h1:document.querySelectorAll('h1').length,
      foreign:[...document.querySelectorAll('body *')].filter(x=>!x.children.length&&!['SCRIPT','STYLE','OPTION'].includes(x.tagName)&&x.getBoundingClientRect().height>0&&/[가-힣]/.test(x.innerText)).map(x=>x.innerText),
      clipped:[...document.querySelectorAll('.news-card p,.news-card .news-summary')].filter(x=>x.getBoundingClientRect().height>0&&x.scrollHeight>x.clientHeight+2).map(x=>x.innerText),
      overflow:document.documentElement.scrollWidth>innerWidth};
   },l);
   assert.equal(x.rows.length,5);assert.equal(x.h1,1);assert.equal(x.overflow,false);
   assert.equal(/undefined|[?]{4}/.test(x.body),false);assert.deepEqual(x.clipped,[]);
   if(l!=='ko')assert.deepEqual(x.foreign,[]);
   assert(x.title.includes('27'));assert(x.body.includes('173.89'));assert(x.body.includes('170.20'));
   assert.equal(x.n.novemberLevel,27);assert.equal(x.n.novemberMopsUsdPerBbl,173.89);
   assert.equal(x.n.forecastTargetMonth,'2026-12');assert.equal(x.n.decemberMopsUsdPerBbl,null);assert.equal(x.n.decemberStageEstimate,null);
   assert.equal(x.n.decemberDirectionConfidence,'low');assert.equal(x.n.decemberStageConfidence,'judgment_reserved');
   assert.equal(x.n.fxReferenceAt,'2026-10-19T07:36:02+09:00');
   assert.equal(x.n.usdKrw,1334.7);assert.equal(x.n.singaporeJetReferenceConfidence,'low');
   assert.equal(x.n.october19BrentIntraday,null);assert.equal(x.n.hormuzLatestGulfCrudeFlowMillionBpd,null);
   assert.deepEqual(x.cards.filter(c=>!c.id.startsWith('market-20261019-')),previous.cards);
   assert.deepEqual(x.fares,previous.fares);assert.deepEqual(x.official,previous.official);assert.deepEqual(x.urls,previous.urls);
   const fresh=x.cards.filter(c=>c.id.startsWith('market-20261019-'));
   assert.equal(fresh.length,6);
   for(const c of fresh){assert(c.i18n[l].summary.length>60);assert.equal(c.updatedAt,'2026-10-19T09:30:00+09:00');}
   const faqs=x.schemas.filter(x=>x['@type']==='FAQPage');if(name==='forecast')assert(faqs.length);
   assert(faqs.every(x=>x.mainEntity.length===8));
   assert(x.schemas.filter(x=>/^(FAQPage|CollectionPage|WebPage)$/.test(x['@type'])).every(x=>x.dateModified==='2026-10-19T09:30:00+09:00'));
   if(name==='news'){
    assert.equal(await p.locator('.news-card[id^="market-20261019-"]:visible').count(),6);
    assert.equal(await p.locator('.official-summary-box a').count(),5);
    for(const category of ['airline','institution','market']){
     await p.locator('[data-f="'+category+'"]').click();await p.waitForTimeout(100);
     assert(await p.locator('.news-card[id^="market-20261019-"]:visible').count()>0);
    }
    await p.locator('[data-f="all"]').click();
   }else{
    assert.equal(await p.locator('[data-i18n="fore.basis.title"]').innerText(),await p.evaluate(l=>window.AERO_MARKET_RELEASE.packs[l].basisTitle,l));
    assert.equal(await p.locator('[data-i18n="fore.cta.may"]').innerText(),await p.evaluate(l=>window.AERO_MARKET_RELEASE.packs[l].surface['fore.cta.may'],l));
   }
   console.log(name,l,'PASS');
  }
  await p.selectOption('#navLang','ko');await p.waitForTimeout(1200);
  await p.screenshot({path:path.join(out,name+'-desktop.png'),fullPage:true});
  await p.setViewportSize({width:390,height:844});await p.waitForTimeout(300);
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await p.screenshot({path:path.join(out,name+'-mobile.png'),fullPage:true});
  const stable=await p.evaluate(()=>document.body.innerText);
  await p.waitForTimeout(54000);
  assert.equal(await p.evaluate(()=>document.body.innerText),stable);
  assert.deepEqual(errors,[]);await p.close();
 }
 await b.close();console.log('PASS: 12 locales, 6 cards, 8 FAQs, archives/fares preserved, categories, mobile, resources and 54-second stability on both pages. Screenshots: '+out);
})().catch(e=>{console.error(e);process.exit(1);});
