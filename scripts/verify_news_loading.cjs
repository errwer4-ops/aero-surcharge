/* Delayed legacy loading plus the current news content and interaction contract. */
const assert = require('node:assert/strict');
const path = require('node:path');
const {spawn} = require('node:child_process');
const {chromium} = require('playwright');
const root = path.resolve(__dirname, '..');
const port = Number(process.env.NEWS_LOADING_TEST_PORT || 4212);
const base = `http://127.0.0.1:${port}`;
const languages = ['ko', 'en', 'ja', 'zh', 'fr', 'de'];
const guideIds = ['newsContextGuide', 'newsMethodGuide'];
const norm = value => String(value == null ? '' : value).replace(/\s+/g, ' ').trim();

async function preservedData(page) {
  return page.evaluate(() => JSON.stringify({cards:AERO_MARKET_RELEASE.newsCards,numbers:AERO_MARKET_RELEASE.numbers,
    snapshots:window.AERO_MARKET_SNAPSHOTS,notices:window.NOVEMBER_2026_OFFICIAL_NOTICES}));
}

async function waitForCurrentNews(page, lang) {
  // Preserve the original slow-loading regression and four-chip row order.
  await page.waitForFunction(lang => {
    const box=document.getElementById('newsKeyVariables'),r=window.AERO_MARKET_RELEASE,rows=r&&r.rows[lang];
    if(!box||!rows||!box.lastElementChild)return false;
    const labels=Array.from(box.lastElementChild.children,el=>el.textContent);
    return labels.length===4&&[3,2,1,0].every((row,i)=>labels[i]===rows[row][0]);
  },lang,{timeout:5000});
  await page.waitForFunction(lang => {
    const r=window.AERO_MARKET_RELEASE,p=r&&r.packs[lang],norm=v=>String(v||'').replace(/\s+/g,' ').trim();
    if(!p||document.title!==p.newsMeta)return false;
    return [...document.querySelectorAll('.news-card')].every(node=>{
      const source=r.newsCards.find(card=>card.id===node.id);if(!source)return true;
      const item=source.i18n[lang]||source.i18n.en;
      return norm(node.querySelector('.news-title')?.textContent)===norm(item.title)
        &&norm(node.querySelector('.news-summary')?.textContent)===norm(item.summary)
        &&norm(node.querySelector('.news-impact')?.textContent)===norm(item.impact);
    });
  },lang,{timeout:5000});
}

async function capture(page) {
  return page.evaluate(()=>{
    const flatten=n=>n?[n,...(n['@graph']||[]).flatMap(flatten)]:[];
    return {lang:document.documentElement.lang,currentF,currentPage,title:document.title,
      h1:[...document.querySelectorAll('h1')].map(el=>el.textContent),interfaceTitle:t('news.interface.title'),calculatorLabel:t('nav.calc'),
      note:document.querySelector('#newsList .news-list-note')?.textContent,noteLabel:t('news.interface.note'),
      relatedLinks:[...document.querySelectorAll('#newsRelatedLinksBox a')].map(a=>({href:a.getAttribute('href'),text:a.textContent})),
      canonical:document.querySelector('link[rel="canonical"]')?.href,
      description:document.querySelector('meta[name="description"]')?.content,
      ogTitle:document.querySelector('meta[property="og:title"]')?.content,
      ogDescription:document.querySelector('meta[property="og:description"]')?.content,
      twitterTitle:document.querySelector('meta[name="twitter:title"]')?.content,
      twitterDescription:document.querySelector('meta[name="twitter:description"]')?.content,
      modified:document.querySelector('meta[property="article:modified_time"]')?.content,
      schemas:[...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(el=>flatten(JSON.parse(el.textContent))),
      brief:[...document.querySelectorAll('#sep04NewsBrief li')].map(el=>el.textContent),
      marketSummaryTitle:document.querySelector('#newsMarketSummary .summary-card-title')?.textContent,
      marketSummaryItems:[...document.querySelectorAll('#newsMarketSummary li')].map(el=>el.textContent),
      cards:[...document.querySelectorAll('.news-card')].map(node=>({id:node.id,date:node.dataset.date,
        dateText:node.querySelector('.news-date')?.textContent,priority:Number(node.className.match(/priority-(\d+)/)?.[1]),
        category:['airline','institution','market'].find(cat=>node.querySelector('.cat-'+cat)),
        title:node.querySelector('.news-title')?.textContent,titleTag:node.querySelector('.news-title')?.tagName,
        summary:node.querySelector('.news-summary')?.textContent,impact:node.querySelector('.news-impact')?.textContent,
        updated:node.querySelector('.news-updated')?.textContent,brief:node.querySelector('.news-ai-brief')?.textContent,
        isNew:!!node.querySelector('.new-badge'),
        sources:[...node.querySelectorAll('a.news-link')].map(a=>({href:a.href,target:a.target,rel:a.rel}))})),
      overflow:document.documentElement.scrollWidth>innerWidth};
  });
}

function verifySurface(x,r,lang,label) {
  const p=r.packs[lang];assert.equal(x.lang,lang,label+' language');
  assert.deepEqual(x.h1,[x.interfaceTitle],label+' one localized page heading');
  assert.equal(x.title,p.newsMeta,label+' original metadata title');
  assert.equal(x.canonical,'https://aero-surcharge.com/news',label+' canonical');
  assert.equal(x.description,p.desc,label+' description');
  assert.equal(x.ogTitle,p.newsMeta,label+' Open Graph title');assert.equal(x.ogDescription,p.desc,label+' Open Graph description');
  assert.equal(x.twitterTitle,p.newsMeta,label+' Twitter title');assert.equal(x.twitterDescription,p.desc,label+' Twitter description');
  assert.equal(x.modified,r.modified,label+' site update date');assert.equal(x.overflow,false,label+' overflow');
  assert.equal(x.relatedLinks[3]?.href,'fuel-surcharge-calculator.html',label+' related calculator destination');
  assert.equal(norm(x.relatedLinks[3]?.text),norm(x.calculatorLabel),label+' localized related calculator label');
  if(x.currentPage===1)assert.equal(norm(x.note),norm(x.noteLabel),label+' note preserves airline-specific charging conditions');
  assert.deepEqual(x.brief.map(norm),r.rows[lang].map(row=>norm(row[0]+': '+row[1])),label+' five original indicator rows');
  assert.equal(x.marketSummaryTitle,p.newsTitle,label+' current market summary survives legacy removal');
  assert.deepEqual(x.marketSummaryItems.map(norm),r.rows[lang].map(row=>norm(row[0]+': '+row[1]+' - '+row[2])),label+' complete current market summary retained');
  const pageSchemas=x.schemas.filter(s=>/^(WebPage|CollectionPage)$/.test(s['@type']));assert(pageSchemas.length,label+' page schema');
  for(const s of pageSchemas){assert.equal(s.headline,p.newsTitle,label+' schema original title');assert.equal(s.description,p.desc,label+' schema description');assert.equal(s.dateModified,r.modified,label+' schema update date');assert.equal(s.inLanguage,lang,label+' schema language');}
  assert(x.cards.length>0&&x.cards.length<=10,label+' ten-item page limit');
  assert.equal(new Set(x.cards.map(c=>c.id)).size,x.cards.length,label+' unique ids');
  const latest=r.newsCards.reduce((date,c)=>c.date>date?c.date:date,'');
  for(const [index,c] of x.cards.entries()){
    assert.equal(c.titleTag,'H2',c.id+' semantic heading');assert.equal(c.dateText,c.date,c.id+' displayed article date');
    assert.equal(c.isNew,c.date===latest,c.id+' NEW follows dataset date');assert(c.category,c.id+' valid category');
    if(x.currentF!=='all')assert.equal(c.category,x.currentF,label+' actual category');
    if(index){const prev=x.cards[index-1];assert(prev.date>c.date||(prev.date===c.date&&prev.priority<=c.priority),label+' date/priority order');}
    for(const s of c.sources){const u=new URL(s.href);assert.match(u.protocol,/^https?:$/);assert(!/(^|\.)aero-surcharge\.com$/i.test(u.hostname),c.id+' external source');assert.equal(s.target,'_blank');assert.match(s.rel,/\bnoopener\b/);}
    const original=r.newsCards.find(item=>item.id===c.id);if(!original)continue;
    const item=original.i18n[lang]||original.i18n.en;
    assert.equal(norm(c.title),norm(item.title),c.id+' original title');assert.equal(norm(c.summary),norm(item.summary),c.id+' full original summary');assert.equal(norm(c.impact),norm(item.impact),c.id+' full original impact');
    assert.equal(c.date,original.date,c.id+' original date');assert.equal(c.updated,item.updatedAt||original.updatedAt||original.date,c.id+' original update time');
    if(norm(item.aiBrief)===norm(item.title))assert.equal(c.brief,undefined,c.id+' duplicate brief omitted');
    else if(item.aiBrief)assert.equal(norm(c.brief),norm(item.aiBrief),c.id+' distinct brief retained');
    const refs=item.sourceRefs||original.sourceRefs;
    if(refs?.length)assert.deepEqual(c.sources.map(s=>s.href),refs.map(s=>new URL(s.url).href),c.id+' exact original source links');
    else if(original.sourceUrl)assert(c.sources.some(s=>s.href===new URL(original.sourceUrl).href),c.id+' original source link');
  }
  // Schemas cover the filtered archive, rather than only its visible page.
  for(const s of x.schemas.filter(s=>s['@type']==='NewsArticle')){
    const original=r.newsCards.find(c=>s.url?.endsWith('#'+c.id));if(!original)continue;
    const item=original.i18n[lang]||original.i18n.en;
    assert.equal(s.headline,item.title,original.id+' schema title');assert.equal(s.articleBody,item.summary+' '+item.impact,original.id+' schema original body');
    assert.equal(s.dateModified,original.updatedAt,original.id+' individual schema date');assert.deepEqual(s.citation,original.citationUrls,original.id+' original citations');
  }
}

async function selectFilter(page,category,lang) {
  await page.locator('#filterRow .ftab[data-f="'+category+'"]').click();
  await page.waitForFunction(category=>currentF===category&&currentPage===1,category);await waitForCurrentNews(page,lang);
  assert.equal(await page.locator('#filterRow .ftab.active').getAttribute('data-f'),category,'active filter');
  assert.deepEqual(await page.locator('#filterRow .ftab').evaluateAll(buttons=>buttons.map(b=>[b.dataset.f,b.getAttribute('aria-pressed')])),
    ['all','airline','institution','market'].map(value=>[value,String(value===category)]),'filter aria-pressed');
}

async function verifyPagination(page,r,lang) {
  const before=await capture(page),buttons=page.locator('#pagination .pg-btn');assert.equal(before.currentPage,1);
  assert.equal(await buttons.first().isDisabled(),true,'first page previous disabled');
  assert.equal(await page.locator('#pagination [aria-current="page"]').textContent(),'1');
  assert.equal(await buttons.last().isDisabled(),false,'next enabled');
  await buttons.last().click();await page.waitForFunction(()=>currentPage===2);await waitForCurrentNews(page,lang);
  const second=await capture(page);verifySurface(second,r,lang,lang+' page two');
  assert.equal(await page.locator('#pagination [aria-current="page"]').textContent(),'2');
  assert.notDeepEqual(second.cards.map(c=>c.id),before.cards.map(c=>c.id),'next changes articles');
  assert(second.cards.every(c=>!before.cards.some(previous=>previous.id===c.id)),'pages do not repeat articles');
  await buttons.first().click();await page.waitForFunction(()=>currentPage===1);await waitForCurrentNews(page,lang);
  assert.deepEqual((await capture(page)).cards,before.cards,'previous restores original articles');
}

async function verifyGuides(page,lang) {
  for(const id of guideIds){const guide=page.locator('#'+id),summary=guide.locator(':scope > summary');
    assert.equal(await guide.evaluate(el=>el.tagName),'DETAILS',id+' native details');assert.equal(await guide.getAttribute('open'),null,id+' starts collapsed');
    await summary.focus();await summary.press('Enter');assert.equal(await guide.evaluate(el=>el.open),true,id+' Enter opens');
    assert.equal(await summary.evaluate(el=>document.activeElement===el),true,id+' opening preserves focus');
    await summary.press('Space');assert.equal(await guide.evaluate(el=>el.open),false,id+' Space closes');
    assert.equal(await summary.evaluate(el=>document.activeElement===el),true,id+' closing preserves focus');await summary.press('Enter');
  }
  await page.locator('#navCurr').selectOption('USD');await waitForCurrentNews(page,lang);
  for(const id of guideIds)assert.equal(await page.locator('#'+id).evaluate(el=>el.open),true,id+' open state survives currency render');
  await page.locator('#navCurr').selectOption('KRW');await waitForCurrentNews(page,lang);
  for(const id of guideIds){const summary=page.locator('#'+id+' > summary');await summary.focus();await summary.press('Space');assert.equal(await page.locator('#'+id).evaluate(el=>el.open),false,id+' closes after render');}
}

async function verifySummaryRecovery(page,release) {
  for(const id of guideIds)assert.equal(await page.locator('#'+id).getAttribute('open'),null,id+' initially collapsed after slow loading');
  const guide=page.locator('#newsContextGuide'),summary=guide.locator(':scope > summary');
  await summary.focus();await summary.press('Enter');
  await page.evaluate(()=>{document.getElementById('newsMarketSummary').remove();window.renderNews();});
  await page.waitForFunction(()=>document.querySelector('#newsMarketSummary .summary-card-title')?.textContent===AERO_MARKET_RELEASE.packs.ko.newsTitle,null,{timeout:5000});
  await waitForCurrentNews(page,'ko');
  assert.equal(await page.locator('#newsMarketSummary').count(),1,'removed market summary is recreated exactly once');
  assert.equal(await guide.evaluate(el=>el.open),true,'summary recovery preserves open guide');
  verifySurface(await capture(page),release,'ko','removed summary recovery');
  await summary.focus();await summary.press('Space');
  assert.equal(await guide.evaluate(el=>el.open),false,'recovered guide remains keyboard operable');
}

async function main() {
  const server = spawn(process.execPath, [path.join(__dirname, 'serve_local.js')], {
    cwd: root, env: {...process.env, PORT: String(port)}, stdio: ['ignore', 'pipe', 'pipe']
  });
  let browser;
  try {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Server start timeout')), 10000);
      server.stdout.on('data', data => {
        if (String(data).includes('Local review server')) { clearTimeout(timer); resolve(); }
      });
      server.on('error', error => { clearTimeout(timer); reject(error); });
      server.on('exit', code => { clearTimeout(timer); reject(new Error('Server exit ' + code)); });
    });
    browser = await chromium.launch({headless: true});
    const context = await browser.newContext({viewport: {width: 1280, height: 900}});
    await context.route('**/*', async route => {
      const url = new URL(route.request().url());
      if (url.origin !== base || url.pathname === '/api' || url.pathname.startsWith('/api/')) return route.abort();
      // Allows the older inline news renderer to publish its five chips before
      // the current renderer loads. A warm cache normally hides this race.
      if (url.pathname === '/aug28-update.js') await new Promise(resolve => setTimeout(resolve, 1200));
      return route.continue();
    });
    const page = await context.newPage();
    await page.clock.setFixedTime(new Date('2026-11-04T00:00:00Z'));
    const errors = [];
    page.on('pageerror', error => errors.push(error.stack || error.message));
    await page.goto(base + '/news.html', {waitUntil: 'domcontentloaded'});
    await page.waitForTimeout(1800);
    assert.deepEqual(errors, [], 'slow script loading must not throw during the news update');
    await waitForCurrentNews(page,'ko');
    const original=await preservedData(page),release=await page.evaluate(()=>AERO_MARKET_RELEASE);
    await verifySummaryRecovery(page,release);
    const latestDate=release.newsCards.reduce((date,c)=>c.date>date?c.date:date,'');
    const latestIds=release.newsCards.filter(c=>c.date===latestDate).map(c=>c.id);
    for(const lang of languages){
      await page.locator('#navLang').selectOption(lang);await waitForCurrentNews(page,lang);await selectFilter(page,'all',lang);
      const first=await capture(page);verifySurface(first,release,lang,lang+' initial');
      for(const id of latestIds)assert(first.cards.some(c=>c.id===id),id+' latest article retained');
      for(const category of ['all','airline','institution','market']){
        // Select a different category from page two to verify its page reset.
        const next=page.locator('#pagination .pg-btn').last();
        if(await next.count()&&!await next.isDisabled()){await next.click();await page.waitForFunction(()=>currentPage===2);}
        await selectFilter(page,category,lang);verifySurface(await capture(page),release,lang,lang+' '+category);
      }
      await selectFilter(page,'all',lang);await verifyPagination(page,release,lang);
      await verifyGuides(page,lang);verifySurface(await capture(page),release,lang,lang+' currency changes');
      assert.equal(await preservedData(page),original,lang+' articles, market snapshots and notices unchanged');
      await page.setViewportSize({width:390,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,lang+' mobile overflow');
      await page.setViewportSize({width:1280,height:900});assert.deepEqual(errors,[],lang+' page errors');console.log('news '+lang+' PASS');
    }
    const before=await capture(page);await page.waitForTimeout(12000);await waitForCurrentNews(page,'de');
    const after=await capture(page);verifySurface(after,release,'de','delayed stability');
    assert.deepEqual(after.cards,before.cards,'delayed callbacks preserve article copy and sources');
    assert.equal(await preservedData(page),original,'delayed callbacks preserve original data');
    assert.deepEqual(errors,[],'language changes and delayed callbacks must not restore stale chips or throw');
    console.log('PASS news: delayed loading, four indicators, six languages, filters/pagination, original articles/sources/schema, keyboard guides, currency/mobile and delayed stability.');
  } finally {
    if (browser) await browser.close();
    server.kill();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
