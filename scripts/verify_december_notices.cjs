const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {spawn}=require('node:child_process');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const port=Number(process.env.DECEMBER_TEST_PORT||4224),base=`http://127.0.0.1:${port}`;
const out=path.join(root,'artifacts','review-verification','market-nov17','december-integrated-pages');
const languages=['ko','en','ja','zh','fr','de'];
const pages=['index','forecast','news','airlines','fuel-surcharge-korean-air','fuel-surcharge-asiana'];
const norm=value=>String(value||'').replace(/\s+/g,' ').trim();
const amounts={KE:[50800,69500,97500,120200,169600,172200,231000,336400,377800],OZ:[57500,84300,111000,137800,164600,190000,216700,270300,322400],BX:[40,71,84,98]};
const captureBaseline=`;(()=>{const clone=v=>v==null?null:JSON.parse(JSON.stringify(v)),r=window.AERO_MARKET_RELEASE;window.__DECEMBER_QA_BASELINE={numbers:clone(r&&r.numbers),latest:clone(window.AERO_MARKET_NUMBERS_LATEST),snapshots:clone(window.AERO_MARKET_SNAPSHOTS),newsCards:clone(r&&r.newsCards),november:clone(window.NOVEMBER_2026_OFFICIAL_NOTICES)};})();\n`;

async function snapshot(page){return page.evaluate(()=>{
  const flatten=value=>!value?[]:[value,...(value['@graph']||[]).flatMap(flatten)];
  const schemas=[...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(el=>flatten(JSON.parse(el.textContent)));
  const r=window.AERO_MARKET_RELEASE,api=window.AeroDecemberNotices,view=window.AeroDecemberView;
  return {baseline:window.__DECEMBER_QA_BASELINE,lang:document.documentElement.lang,canonical:document.querySelector('link[rel="canonical"]')?.href,
    notices:api.notices,review:AeroSourceTrust.summarize(api.notices,api.month),copy:view.copy[getCurrentLang()],
    panel:document.getElementById('decemberNoticePanel')?.innerText,
    panelHtml:document.getElementById('decemberNoticePanel')?.innerHTML,
    panelRows:[...document.querySelectorAll('#decemberNoticePanel article')].map(article=>({title:article.querySelector('h3')?.innerText,rows:[...article.querySelectorAll('tbody tr')].map(row=>[...row.cells].map(cell=>cell.textContent)),links:[...article.querySelectorAll('a')].map(a=>a.href)})),
    numbers:r?.numbers,latest:window.AERO_MARKET_NUMBERS_LATEST,snapshots:window.AERO_MARKET_SNAPSHOTS,november:window.NOVEMBER_2026_OFFICIAL_NOTICES,
    cards:r?.newsCards,releaseModified:r?.modified,noticeChecked:r?.noticeCheckedAt,schemas,
    visibleNews:[...document.querySelectorAll('.news-card')].map(el=>({id:el.id,title:el.querySelector('.news-title')?.textContent,summary:el.querySelector('.news-summary')?.textContent,impact:el.querySelector('.news-impact')?.textContent})),
    faq:document.querySelector('#forecastFaqBox')?.textContent||'',lead:document.querySelector('[data-forecast-copy="lead"]')?.innerText||'',
    body:document.body.innerText,overflow:document.documentElement.scrollWidth>innerWidth};
});}

function preserved(state,label){
  const b=state.baseline;assert(b,label+' pre-notice baseline captured');
  // Opening the existing lazy evidence module adds legacy-only fields to LATEST.
  // Every pre-update field and the complete dated 09:00 snapshot must stay intact.
  if(b.latest)for(const [key,value]of Object.entries(b.latest))assert.deepEqual(state.latest[key],value,label+' market field unchanged: '+key);
  else assert.equal(state.latest??null,null,label+' no synthetic market object');
  if(b.snapshots){
    for(const [key,value]of Object.entries(b.snapshots))assert.deepEqual(state.snapshots[key],value,label+' dated market snapshot unchanged: '+key);
    for(const key of Object.keys(state.snapshots).filter(key=>!(key in b.snapshots)))assert(key<'2026-11-16',label+' lazy evidence may restore only older archive keys');
  }else assert.equal(state.snapshots??null,null,label+' no synthetic snapshot registry');
  // The existing home renderer enriches YP's localized period explanation after load.
  // Compare the original tariff/source facts; that pre-existing display patch is not a new tariff.
  const tariffFacts=notices=>notices?notices.map(({period,...notice})=>notice):null;
  assert.deepEqual(tariffFacts(state.november),tariffFacts(b.november),label+' current November tariff/source facts unchanged');
  if(b.numbers){assert.deepEqual(state.numbers,b.numbers,label+' release market numbers unchanged');assert.match(state.numbers.informationCutoff,/^2026-11-\d{2}T09:00:00\+09:00$/);}
  if(b.newsCards){
    assert(b.newsCards.length>=168,label+' original archive retained before notices');
    const added=state.notices.map(n=>'notice-202612-'+n.code.toLowerCase()+'-'+(n.code==='BX'?'20261117':'20261116')).filter(id=>!b.newsCards.some(c=>c.id===id));
    assert.equal(state.cards.length,b.newsCards.length+added.length,label+' only reviewed notice articles added');
    assert.deepEqual(state.cards.filter(c=>!added.includes(c.id)),b.newsCards,label+' every pre-notice article preserved byte-for-field');
    assert.equal(new Set(state.cards.map(c=>c.id)).size,state.cards.length,label+' no duplicated card ids');
    assert.equal(state.noticeChecked,'2026-11-17T00:00:36Z',label+' latest notice verification keeps its actual timestamp');
    assert(Date.parse(state.releaseModified)>=Date.parse(state.noticeChecked),label+' site update follows the distinct notice check');
    assert.notEqual(state.releaseModified,state.numbers.informationCutoff,label+' evening site update is not the morning market cutoff');
  }
}

function verify(state,name,lang,canonical){
  const label=name+' '+lang,c=state.copy,only=name==='fuel-surcharge-korean-air'?'KE':name==='fuel-surcharge-asiana'?'OZ':null;
  assert.equal(state.lang,lang,label+' document language');assert.equal(state.canonical,canonical,label+' canonical preserved');assert.equal(state.overflow,false,label+' no horizontal overflow');
  assert.equal(state.review.verifiedCount,3,label+' three independently verified December notices');
  assert.deepEqual(state.notices.map(n=>n.code).sort(),['BX','KE','OZ']);
  for(const n of state.notices){assert.deepEqual(n.amounts,amounts[n.code]);assert.equal(n.currency,n.code==='BX'?'USD':'KRW');assert.equal(n.direction,'one_way');assert.equal(n.ticketingStart,'2026-12-01');assert.equal(n.ticketingEnd,n.code==='OZ'?'2026-12-16':'2026-12-31');}
  assert(norm(state.panel).includes(norm(c.title)),label+' localized notice heading');if(name!=='forecast')assert(norm(state.panel).includes(norm(c.summary)),label+' localized partial notice summary');
  assert(norm(state.panel).includes(norm(c.sourceNote)),label+' evening check distinct from morning market cutoff');
  assert.equal(state.panelRows.length,only?1:3,label+' expected airline panels');
  (only?[only]:['KE','OZ','BX']).forEach((code,index)=>{
    const row=state.panelRows[index];assert.equal(norm(row.title),norm(c[code.toLowerCase()]));
    assert.equal(row.rows.length,amounts[code].length,label+' all published '+code+' groups');
    assert.deepEqual(row.rows.map(r=>Number(r[2].replace(/,/g,''))),amounts[code]);
    assert(row.links.includes(state.notices.find(n=>n.code===code).url),label+' original '+code+' notice URL');
  });
  if(only!=='KE')assert(norm(state.panel).includes(norm(c.later)),label+' December 17 onward separately qualified');
  if(!only){assert(norm(state.panel).includes(norm(c.pending)),label+' other six remain unverified');for(const code of ['7C','LJ','RS','TW','ZE','YP'])assert(state.panel.includes(code));}
  if(name==='forecast'){
    assert.equal(norm(state.lead),norm(c.summary),label+' first forecast conclusion reflects KE/OZ notices');
    const faqs=state.schemas.filter(s=>s['@type']==='FAQPage');assert(faqs.length,label+' FAQ schema exists');
    const questions=faqs.flatMap(s=>s.mainEntity||[]),december=questions.find(q=>norm(q.name)===norm(c.question));assert(december,label+' December FAQ schema');
    assert(norm(december.acceptedAnswer.text).includes(norm(c.later)),label+' FAQ preserves short Asiana period');
    for(const q of questions){assert(norm(state.faq).includes(norm(q.name)),label+' schema question matches visible FAQ');assert(norm(state.faq).includes(norm(q.acceptedAnswer.text)),label+' schema answer matches visible FAQ');}
  }
  if(name==='news')for(const code of ['KE','OZ','BX']){
    const id='notice-202612-'+code.toLowerCase()+'-'+(code==='BX'?'20261117':'20261116'),card=state.cards.find(c=>c.id===id),localized=card.i18n[lang],visible=state.visibleNews.find(c=>c.id===id);
    assert(visible,label+' new '+code+' article visible');assert.equal(norm(visible.title),norm(localized.title));assert.equal(norm(visible.summary),norm(localized.summary));
    const schema=state.schemas.find(s=>s['@type']==='NewsArticle'&&s.url?.endsWith('#'+id));assert(schema,label+' new article schema');assert.equal(schema.headline,localized.title);assert.equal(schema.articleBody,localized.summary+' '+localized.impact);assert.equal(schema.dateModified,card.updatedAt);assert.deepEqual(schema.citation,card.citationUrls);
  }
  preserved(state,label);
}

async function verifyPage(browser,name){
  const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await context.route('**/*',route=>{
    const url=new URL(route.request().url());if(url.origin!==base||url.pathname.startsWith('/api/'))return route.abort();
    if(url.pathname==='/december-update.js')return route.fulfill({contentType:'application/javascript',body:captureBaseline+fs.readFileSync(path.join(root,'public','december-update.js'),'utf8')});
    return route.continue();
  });
  try{
    await page.goto(base+'/'+name+'.html');await page.waitForFunction(()=>window.__DECEMBER_QA_BASELINE&&window.AeroDecemberView&&document.querySelector('#decemberNoticePanel article'));await page.waitForTimeout(1200);
    const canonical=await page.locator('link[rel="canonical"]').getAttribute('href');
    for(const lang of languages){
      await page.selectOption('#navLang',lang);await page.waitForFunction(lang=>document.querySelector('#decemberNoticePanel h2')?.textContent===AeroDecemberView.copy[lang].title,lang);await page.waitForTimeout(150);
      if(name==='index'){const fold=page.locator('#decemberNoticePanel > details');if(!await fold.evaluate(el=>el.open))await fold.locator(':scope > summary').click();}
      if(name==='forecast')for(const id of ['forecastEvidence','forecastSources']){const details=page.locator('#'+id);if(!await details.evaluate(el=>el.open))await details.locator(':scope > summary').click();}
      if(name==='forecast')await page.waitForFunction(()=>document.querySelector('#forecastFaqBox')?.textContent.length>100);
      verify(await snapshot(page),name,lang,canonical);
    }
    await page.selectOption('#navLang','ko');await page.waitForTimeout(250);const before=await snapshot(page);verify(before,name,'ko',canonical);
    if(name==='forecast')await page.evaluate(()=>{for(const id of ['forecastEvidence','forecastSources'])document.getElementById(id).open=false;scrollTo(0,0);});
    await page.screenshot({path:path.join(out,name+'-desktop.png'),fullPage:true});
    await page.setViewportSize({width:390,height:844});await page.waitForTimeout(150);verify(await snapshot(page),name,'ko',canonical);
    await page.screenshot({path:path.join(out,name+'-mobile.png'),fullPage:true});
    await page.waitForTimeout(12000);const after=await snapshot(page);verify(after,name,'ko',canonical);
    assert.equal(after.panelHtml,before.panelHtml,name+' notice panel remains stable after 12 seconds');assert.deepEqual(errors,[],name+' browser errors');
    const result={page:name,languages:languages.length,viewports:['1440x1000','390x844'],delayMs:12000,archiveCards:after.cards?.length??null,marketCutoff:after.numbers?.informationCutoff??after.latest?.informationCutoff??null,consoleErrors:errors,status:'passed'};
    fs.writeFileSync(path.join(out,name+'-verification.json'),JSON.stringify(result,null,2));console.log('PASS December notices: '+name+' · six languages, desktop/mobile, sources and periods, market/archive preservation, 12s stability');return result;
  }catch(error){await page.screenshot({path:path.join(out,name+'-failure.png'),fullPage:true}).catch(()=>{});const details=await snapshot(page).catch(()=>null);fs.writeFileSync(path.join(out,name+'-failure.json'),JSON.stringify({error:error.stack,errors,state:details},null,2));throw error;}
  finally{await context.close();}
}

async function main(){
  fs.mkdirSync(out,{recursive:true});let browser;
  const server=spawn(process.execPath,[path.join(root,'scripts','serve_local.js')],{cwd:root,env:{...process.env,PORT:String(port)},stdio:['ignore','pipe','pipe']});
  try{
    await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Server start timeout')),10000);server.stdout.on('data',data=>{if(String(data).includes('Local review server')){clearTimeout(timer);resolve();}});server.on('error',reject);server.on('exit',code=>reject(Error('Server exit '+code)));});
    browser=await chromium.launch();const results=[];
    for(let i=0;i<pages.length;i+=2){const batch=await Promise.allSettled(pages.slice(i,i+2).map(name=>verifyPage(browser,name)));for(const result of batch){if(result.status==='rejected')throw result.reason;results.push(result.value);}}
    fs.writeFileSync(path.join(out,'verification.json'),JSON.stringify({checkedAt:new Date().toISOString(),results},null,2));console.log('PASS integrated December notices: all six pages');
  }finally{if(browser)await browser.close();server.kill();}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
