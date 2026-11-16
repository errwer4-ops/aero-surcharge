'use strict';

// Stage 1: compact home comparisons retain their original financial evidence.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {chromium} = require('playwright');
const base = (process.env.AERO_QA_ORIGIN || process.env.BASE_URL || 'http://127.0.0.1:4221').replace(/\/$/, '');
const origin = new URL(base).origin;
const baseline = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../docs/review-evidence/main-improvements-20261116/step-1-before-desktop.json'), 'utf8'));
const stage3Baseline = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../docs/review-evidence/main-improvements-20261116/step-3-before-desktop.json'), 'utf8'));
const ctaBaseline = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../docs/review-evidence/main-improvements-20261116/step-3-before-desktop-cta.json'), 'utf8'));
const languages = ['ko', 'en', 'ja', 'zh', 'fr', 'de'];
const codes = baseline.rows.map(row => row.code);
const norm = value => String(value == null ? '' : value).replace(/\s+/g, ' ').trim();
const semantics = {
  ko: {minimum:'최소', meaning:'평균이 아닙니다', basis:'동일 통화·동일 저장 구간', yes:'보관 기록 포함: 있음', no:'보관 기록 포함: 없음', retained:'10월 보관 기록'},
  en: {minimum:'At least', meaning:'not an average', basis:'same currency and stored charging band', yes:'Retained records included: yes', no:'Retained records included: no', retained:'October retained record'},
  ja: {minimum:'最低', meaning:'平均ではありません', basis:'同じ通貨・保存区分', yes:'保管記録を含む：はい', no:'保管記録を含む：いいえ', retained:'10月保管記録'},
  zh: {minimum:'至少', meaning:'并非平均值', basis:'同币种、同留存收费区间', yes:'包含留存记录：是', no:'包含留存记录：否', retained:'10月留存记录'},
  fr: {minimum:'Au moins', meaning:'pas une moyenne', basis:'même devise et tranche conservée', yes:'Archives conservées incluses : oui', no:'Archives conservées incluses : non', retained:'Archive d’octobre'},
  de: {minimum:'Mindestens', meaning:'keinen Durchschnitt', basis:'derselben Währung und gespeicherten Tarifgruppe', yes:'Gespeicherte Aufzeichnungen enthalten: ja', no:'Gespeicherte Aufzeichnungen enthalten: nein', retained:'Oktober-Aufzeichnung'}
};

async function preservedData(page, label, expected=baseline) {
  const actual = await page.evaluate(() => ({
    notices:window.NOVEMBER_2026_OFFICIAL_NOTICES,
    comparisons:Object.fromEntries(window.NOVEMBER_2026_OFFICIAL_NOTICES.map(n => [n.code, window.AeroHomePlatform.landingComparison(n.code)])),
    links:[...document.querySelectorAll('#miniGrid .mini-notice-btn')].map(a => a.href)
  }));
  assert.deepEqual(actual.notices, expected.notices, label + ' complete original nine notices');
  assert.deepEqual(actual.comparisons, expected.comparisons, label + ' complete comparison bands, currencies, amounts, percentages and source status');
  assert.deepEqual(actual.links, expected.links, label + ' original source URLs and order');
}

async function verifyContent(page, lang) {
  const rows = await page.locator('#miniGrid .mini-card').evaluateAll(nodes => nodes.map(row => {
    const wrapper=row.querySelector('.mini-trend-details'),button=wrapper?.querySelector('.mini-trend-info'),tip=wrapper?.querySelector('.mini-trend-tooltip');
    return {code:row.dataset.airline,wrapperTag:wrapper?.tagName,
      shape:wrapper&&[...wrapper.children].map(el => [el.tagName, el.className]),
      label:wrapper?.querySelector('.mini-trend-label')?.textContent,buttonTag:button?.tagName,
      buttonType:button?.type,buttonLabel:button?.getAttribute('aria-label'),describedBy:button?.getAttribute('aria-describedby'),
      tooltipId:tip?.id,tooltipRole:tip?.getAttribute('role'),text:tip?.textContent,
      paragraphs:tip&&[...tip.querySelectorAll('p')].map(p => p.textContent),
      pairs:tip&&[...tip.querySelectorAll('li')].map(li => li.textContent),
      archived:wrapper?.dataset.archived,archiveBadge:!!wrapper?.querySelector('.mini-archive-mark')};
  }));
  assert.deepEqual(rows.map(row => row.code), codes, lang + ' all nine rows in original order');
  for (const row of rows) {
    const expected=baseline.comparisons[row.code],copy=semantics[lang],label=lang+' '+row.code;
    assert.equal(row.wrapperTag, 'DIV', label + ' common wrapper');
    assert.deepEqual(row.shape, [['SPAN','mini-trend-label'],['BUTTON','mini-trend-info'],['DIV','mini-trend-tooltip']], label + ' consistent comparison structure');
    assert.equal(norm(row.label), '▲ '+expected.minimum.toFixed(1)+'%', label + ' exact compact minimum rate');
    assert.match(norm(row.label), /^▲ \d+\.\d%$/, label + ' no explanatory prose in compact label');
    assert.equal(row.buttonTag, 'BUTTON', label + ' native keyboard control');
    assert.equal(row.buttonType, 'button', label + ' non-submit button');
    assert(row.buttonLabel?.trim(), label + ' accessible button name');
    assert.equal(row.describedBy, 'mini-trend-tooltip-'+row.code, label + ' associated explanation');
    assert.equal(row.tooltipId, row.describedBy, label + ' exact described tooltip');
    assert.equal(row.tooltipRole, 'tooltip', label + ' tooltip semantics');
    assert.equal(row.archived, String(expected.archived), label + ' archive status');
    assert.equal(row.archiveBadge, false, label + ' identical compact treatment for archived and source-verified rows');
    for (const token of [copy.minimum,copy.meaning,copy.basis,expected.archived?copy.yes:copy.no]) {
      assert(norm(row.text).toLocaleLowerCase().includes(token.toLocaleLowerCase()), label + ' localized explanation: '+token);
    }
    assert(row.paragraphs.some(p => p.includes('2026') && p.includes(String(expected.pairs.length))), label + ' period and complete comparable band count');
    assert.equal(row.pairs.length, expected.pairs.length, label + ' every original comparison pair retained');
    expected.pairs.forEach((pair,index) => {
      const financial=pair.band+' · '+pair.currency+' '+pair.base.toLocaleString('en-US')+' → '+pair.target.toLocaleString('en-US')+' · '+(pair.percent>0?'+':'')+pair.percent.toFixed(1)+'%';
      assert.equal(norm(row.pairs[index]), norm(financial+(!pair.sourceVerified?' · '+copy.retained:'')), label + ' exact original pair '+index);
    });
  }
  assert.equal(await page.locator('.mini-trend-tooltip:visible').count(), 0, lang + ' explanations initially collapsed');
  assert.equal(await page.locator('[id^="mini-trend-tooltip-"]').count(), 9, lang + ' unique tooltip IDs');
  await preservedData(page, lang);
}

async function focusTooltip(page, code) {
  const button=page.locator('#miniGrid .mini-card[data-airline="'+code+'"] .mini-trend-info');
  await page.evaluate(() => document.activeElement?.blur());
  await button.scrollIntoViewIfNeeded();
  // Let document scrolling finish before the focus event opens a fixed popup.
  await page.waitForTimeout(40);
  await button.focus();
  const tooltip=page.locator('#mini-trend-tooltip-'+code);
  await tooltip.waitFor({state:'visible'});
  return {button,tooltip};
}

async function verifyBounds(page, tooltip, label) {
  const box=await tooltip.boundingBox(),viewport=page.viewportSize();
  assert(box, label + ' visible popup bounds');
  assert(box.x>=0 && box.y>=0 && box.x+box.width<=viewport.width+1 && box.y+box.height<=viewport.height+1,
    label + ' popup fully inside viewport: '+JSON.stringify({box,viewport}));
  assert.equal(await page.locator('.mini-trend-tooltip:visible').count(), 1, label + ' only active explanation visible');
  assert.equal(await tooltip.evaluate(el => el.scrollWidth<=el.clientWidth+1), true, label + ' no clipped horizontal tooltip content');
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth<=innerWidth), true, label + ' no page overflow');
}

async function verifyInteraction(page, lang, width) {
  await page.setViewportSize({width,height:width<500?812:900});
  for (const code of codes) {
    const label=lang+' '+width+'px '+code,{button,tooltip}=await focusTooltip(page,code);
    await verifyBounds(page,tooltip,label);
    await button.press('Escape');
    assert.equal(await tooltip.isVisible(), false, label + ' Escape dismisses');
    assert.equal(await button.evaluate(el => document.activeElement===el), true, label + ' Escape retains keyboard focus');
  }
  const {button,tooltip}=await focusTooltip(page,'KE');
  assert.equal(await tooltip.evaluate(el => el.scrollHeight>el.clientHeight), true, lang+' '+width+'px long explanation has an internal scroll area');
  await tooltip.evaluate(el => {el.scrollTop=0;});
  const beforeScroll=await page.evaluate(() => scrollY);
  await button.press('PageDown');
  assert((await tooltip.evaluate(el => el.scrollTop))>0, lang+' '+width+'px PageDown reads remaining explanation');
  assert.equal(await page.evaluate(() => scrollY), beforeScroll, lang+' '+width+'px explanation keys do not scroll page');
  assert.equal(await tooltip.isVisible(), true, lang+' '+width+'px internal scrolling keeps explanation open');
  await button.press('Escape');
  await page.evaluate(() => document.activeElement?.blur());
  await page.mouse.move(0,0);
  await button.hover();
  await tooltip.waitFor({state:'visible'});
  await tooltip.evaluate(el => {el.scrollTop=0;});
  const hoverBox=await tooltip.boundingBox();
  await page.mouse.move(hoverBox.x+hoverBox.width/2,hoverBox.y+30,{steps:20});
  await page.waitForTimeout(300);
  assert.equal(await tooltip.isVisible(),true,lang+' '+width+'px crossing the hover gap keeps explanation open');
  await page.mouse.wheel(0,180);
  await page.waitForTimeout(100);
  assert((await tooltip.evaluate(el => el.scrollTop))>0,lang+' '+width+'px pointer can scroll the hovered explanation');
  assert.equal(await tooltip.isVisible(),true,lang+' '+width+'px wheel scrolling keeps explanation open');
  await page.mouse.move(0,0);
  await tooltip.waitFor({state:'hidden'});
  await button.click();
  await tooltip.waitFor({state:'visible'});
  await button.press('Tab');
  // Chromium can include a scrollable explanation itself in the native tab order.
  if (await tooltip.evaluate(el => el===document.activeElement || el.contains(document.activeElement))) {
    assert.equal(await tooltip.isVisible(),true,lang+' '+width+'px reading the focused explanation keeps it open');
    await page.keyboard.press('Tab');
  }
  assert.equal(await button.evaluate(el => el.closest('.mini-trend-details').contains(document.activeElement)),false,lang+' '+width+'px Tab leaves the explanation without trapping focus');
  await tooltip.waitFor({state:'hidden'});
}

const fareButtonCopy={
  ko:'유류할증료 포함 실제 항공권 총액 비교하기',
  en:'Compare actual total airfare including fuel surcharge',
  ja:'燃油サーチャージを含む実際の航空券総額を比較',
  zh:'比较包含燃油附加费的实际机票总价',
  fr:'Comparer le prix total réel du billet, surcharge carburant incluse',
  de:'Tatsächlichen Gesamtflugpreis inklusive Kerosinzuschlag vergleichen'
};

async function affiliateEvents(page) {
  return page.evaluate(() => dataLayer.filter(item => item[0]==='event' && ['affiliate_click','cta_fare_compare'].includes(item[1])).map(item => ({name:item[1],params:item[2]})));
}

async function clickAffiliate(page, link, expectedFare, expectedAffiliate, label, route) {
  const before=await affiliateEvents(page);
  // Exercise real bubbling and keyboard focus without visiting a partner site.
  await link.evaluate(el => el.addEventListener('click',event => event.preventDefault(),{once:true,capture:true}));
  await link.click();
  const added=(await affiliateEvents(page)).slice(before.length);
  assert.equal(added.filter(event => event.name==='affiliate_click').length,expectedAffiliate,label+' generic affiliate click count');
  assert.equal(added.filter(event => event.name==='cta_fare_compare').length,expectedFare,label+' fare comparison click count');
  for (const event of added) {
    assert.equal(event.params.page_location,base+new URL(page.url()).pathname,label+' query-free page location');
    assert.equal(event.params.page_referrer,'',label+' empty referrer');
    assert(!JSON.stringify(event.params).includes('qa_cta'),label+' no URL query in event');
    if(event.name==='cta_fare_compare'){
      assert.equal(event.params.affiliate,'myrealtrip',label+' correct provider');
      assert.equal(event.params.placement,route?'route_result':'forecast_bottom',label+' explicit CTA placement');
      if(route){
        assert.equal(event.params.origin,route.dep,label+' submitted origin');
        assert.equal(event.params.destination,route.arr,label+' submitted destination');
        assert.equal(event.params.trip_type,route.isRT?'round_trip_estimate':'one_way',label+' submitted journey basis');
      }else{
        assert.equal(event.params.origin,undefined,label+' no invented forecast origin');
        assert.equal(event.params.destination,undefined,label+' no invented forecast destination');
        assert.equal(event.params.trip_type,undefined,label+' no invented forecast journey');
      }
    }
  }
  return added;
}

async function searchHome(page) {
  await page.locator('#originAirportInput').fill('ICN');
  await page.locator('#originAirportInput').press('Enter');
  await page.locator('#destAirportInput').fill('NRT');
  await page.locator('#destAirportInput').press('Enter');
  await page.locator('#searchBtn').click();
  await page.waitForFunction(() => window._searchCtx?.dep==='ICN' && window._searchCtx?.arr==='NRT' && document.querySelectorAll('#cardsGrid .al-card').length>0);
  return page.evaluate(() => ({...window._searchCtx}));
}

async function verifyFareCta(browser, pageName) {
  const home=pageName==='index',context=await browser.newContext({viewport:{width:1366,height:900}}),errors=[];
  await context.addInitScript(() => {window.AERO_ANALYTICS_CONFIG={allowLocal:true,debug:true,ga4Id:'G-TEST123'};});
  await context.route('**/*',route => {
    const url=new URL(route.request().url());
    return url.origin===origin && !/^\/api(?:\/|$)/.test(url.pathname) ? route.continue() : route.abort();
  });
  try {
    const page=await context.newPage();
    page.on('pageerror',error => errors.push(error.stack||error.message));
    await page.clock.setFixedTime(new Date('2026-11-16T03:00:00Z'));
    await page.goto(base+'/'+pageName+'.html?qa_cta=excluded');
    await page.waitForTimeout(4500);
    await page.waitForFunction(() => window.AeroAnalytics && window.NOVEMBER_2026_OFFICIAL_NOTICES?.length===9);
    const cta=page.locator('a[data-fare-compare="true"]');
    assert.equal(await cta.count(),1,pageName+' single marked CTA');
    const href=home?ctaBaseline.route.href:ctaBaseline.forecast.href;
    assert.equal(await cta.getAttribute('href'),href,pageName+' exact original affiliate URL');
    assert.deepEqual([...new URL(await cta.getAttribute('href')).searchParams.entries()],[['m','myrealtrip'],['a','A100704170'],['l','0000']],pageName+' unchanged affiliate parameters, no invented route query');
    assert.equal(await cta.getAttribute('target'),'_blank',pageName+' separate partner tab');
    assert.match(await cta.getAttribute('rel'),/\bsponsored\b/,pageName+' affiliate relationship');
    let route=home?await searchHome(page):null;
    if(home)assert.equal(await cta.evaluate(el => !!el.closest('#resultsSection') && !!(document.getElementById('cardsGrid').compareDocumentPosition(el)&Node.DOCUMENT_POSITION_FOLLOWING)),true,'home CTA follows rendered route results');
    else assert.equal(await cta.evaluate(el => el.closest('.fore-myrealtrip-box')===document.querySelector('main').lastElementChild),true,'forecast CTA is the last main content section');
    const market=await page.evaluate(() => JSON.stringify({numbers:window.AERO_MARKET_NUMBERS_LATEST,snapshots:window.AERO_MARKET_SNAPSHOTS,release:window.AERO_MARKET_RELEASE}));

    await clickAffiliate(page,cta,0,0,pageName+' no choice',route);
    await page.evaluate(() => AeroAnalytics.setConsent(false,true));
    await clickAffiliate(page,cta,0,0,pageName+' advertising only',route);
    await page.evaluate(() => AeroAnalytics.setConsent(false,false));
    await clickAffiliate(page,cta,0,0,pageName+' rejected',route);
    const beforeGrant=await affiliateEvents(page);
    await page.evaluate(() => AeroAnalytics.setConsent(true,false));
    assert.deepEqual(await affiliateEvents(page),beforeGrant,pageName+' granting consent does not replay denied clicks');
    if(home){
      route=await searchHome(page);
      await page.waitForFunction(() => dataLayer.some(item => item[0]==='event' && item[1]==='route_result_view'));
      // Editing both controls does not change the actual displayed search context.
      await page.locator('#originAirportInput').fill('PUS');
      await page.locator('#destAirportInput').fill('HND');
    }
    const approved=await clickAffiliate(page,cta,1,1,pageName+' analytics approved',route);
    if(home)assert.equal(approved.find(event => event.name==='affiliate_click').params.after_route_result,true,'home affiliate result attribution');
    await page.evaluate(() => AeroAnalytics.setConsent(false,false));
    await clickAffiliate(page,cta,0,0,pageName+' withdrawn',route);
    await page.evaluate(() => AeroAnalytics.setConsent(true,false));

    for(const lang of languages){
      const beforeLanguage=await affiliateEvents(page);
      await page.selectOption('#navLang',lang);
      await page.selectOption('#navCurr','USD');
      await page.selectOption('#navCurr','KRW');
      await page.waitForTimeout(400);
      assert.deepEqual(await affiliateEvents(page),beforeLanguage,pageName+' '+lang+' language/currency rerender does not emit clicks');
      assert.equal(norm(await cta.innerText()),fareButtonCopy[lang],pageName+' '+lang+' explicit surcharge-inclusive total airfare label');
      assert.equal(await page.evaluate(() => t('fareCompare.button')),fareButtonCopy[lang],pageName+' '+lang+' registered I18N key');
      assert.equal(await cta.getAttribute('href'),href,pageName+' '+lang+' unchanged href after rerender');
      for(const width of [1366,320,375]){
        await page.setViewportSize({width,height:width<500?812:900});
        await cta.scrollIntoViewIfNeeded();
        const box=await cta.boundingBox();
        assert(box && box.x>=0 && box.x+box.width<=width+1 && box.height>=48,pageName+' '+lang+' '+width+'px visible button with adequate height');
        assert.equal(await cta.evaluate(el => el.scrollWidth<=el.clientWidth+1),true,pageName+' '+lang+' '+width+'px complete button text');
        if(!home && lang==='de' && width===320){
          // Existing, unrelated heading overflow: keep CTA bounds strict and
          // identify the exact legacy text instead of concealing other overflow.
          const overflow=await page.evaluate(() => {
            const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),text=[];
            let node;
            while((node=walker.nextNode())){
              if(!node.textContent.trim())continue;
              const range=document.createRange();range.selectNodeContents(node);
              const rect=range.getBoundingClientRect();
              if(rect.width && rect.right>innerWidth+1)text.push(node.parentElement.id);
            }
            return {width:document.documentElement.scrollWidth,text,elements:[...document.querySelectorAll('body *')].filter(el => {const rect=el.getBoundingClientRect();return rect.width && rect.right>innerWidth+1;}).map(el => el.id||el.tagName)};
          });
          assert(overflow.width<=325,'known German 320px heading overflow must not grow');
          assert.deepEqual(overflow.text,['forecastMarketTitle'],'only the existing German market heading text overflows');
          assert.deepEqual(overflow.elements,[],'no element boxes overflow at the known heading exception');
          console.log('KNOWN out of scope: forecast de 320px market heading creates '+(overflow.width-width)+'px page overflow; CTA fits');
        }else{
          assert.equal(await page.evaluate(() => document.documentElement.scrollWidth<=innerWidth),true,pageName+' '+lang+' '+width+'px no page overflow');
        }
        const style=await cta.evaluate(el => ({background:getComputedStyle(el).backgroundColor,color:getComputedStyle(el).color}));
        assert.notEqual(style.background,'rgba(0, 0, 0, 0)',pageName+' '+lang+' filled CTA');
        assert.notEqual(style.background,style.color,pageName+' '+lang+' contrasting label');
      }
      await clickAffiliate(page,cta,1,1,pageName+' '+lang+' single click after rerender',route);
      if(home)await preservedData(page,'stage 3 '+lang,stage3Baseline);
      else assert.deepEqual(await page.evaluate(() => window.NOVEMBER_2026_OFFICIAL_NOTICES),stage3Baseline.notices,'forecast '+lang+' unchanged original notices');
    }
    if(home){
      for(const [selector,provider] of [['#affiliateSection a[href="https://newtip.net/click.php?m=hcombine2&a=A100704170&l=0000"]','hotelscombined'],['#affiliateSection a[href="http://app.ac/ejCPW0a93"]','sim_partner']]){
        const added=await clickAffiliate(page,page.locator(selector),0,1,'home '+provider+' remains generic affiliate only',route);
        assert.equal(added[0].params.affiliate,provider,'unchanged partner classification');
      }
    }else{
      await clickAffiliate(page,page.locator('.hotelcombine-btn'),0,1,'forecast hotel remains generic affiliate only');
      assert.equal(await cta.evaluate(el => el.closest('.fore-myrealtrip-box')===document.querySelector('main').lastElementChild),true,'forecast rerenders keep CTA at main bottom');
    }
    assert.equal(await page.evaluate(() => JSON.stringify({numbers:window.AERO_MARKET_NUMBERS_LATEST,snapshots:window.AERO_MARKET_SNAPSHOTS,release:window.AERO_MARKET_RELEASE})),market,pageName+' CTA interactions preserve loaded market data');
    assert.deepEqual(errors,[],pageName+' no runtime errors');
    console.log('PASS stage 3: '+pageName+' / six locales / three widths / original href and data / consent, once-per-click, route context and partner exclusions');
  } finally {
    await context.close();
  }
}

(async () => {
  assert.equal(codes.length,9,'baseline has all nine airlines');
  const browser=await chromium.launch();
  try {
    if(!process.argv.includes('--cta-only')){
    const context=await browser.newContext({viewport:{width:1366,height:900}});
    await context.route('**/*', route => {
      const url=new URL(route.request().url());
      return url.origin===origin && !/^\/api(?:\/|$)/.test(url.pathname) ? route.continue() : route.abort();
    });
    const page=await context.newPage(),errors=[];
    page.on('pageerror', error => errors.push(error.stack||error.message));
    await page.clock.setFixedTime(new Date('2026-11-16T03:00:00Z'));
    await page.goto(base+'/index.html');
    await page.waitForFunction(() => window.AeroHomePlatform && document.querySelectorAll('#miniGrid button.mini-trend-info').length===9);
    await page.waitForTimeout(4500);
    const deny=page.locator('#aeroConsentDeny');
    if (await deny.isVisible()) await deny.click();
    for (const lang of languages) {
      await page.mouse.move(0,0);
      await page.evaluate(() => document.activeElement?.blur());
      await page.keyboard.press('Escape');
      await page.selectOption('#navLang',lang);
      await page.waitForTimeout(400);
      assert.equal(await page.evaluate(() => getCurrentLang()),lang,lang+' active locale');
      await verifyContent(page,lang);
      for (const width of [1366,320,375]) await verifyInteraction(page,lang,width);
      await preservedData(page,lang+' after interaction');
      console.log('PASS stage 1: '+lang+' / nine rows / 1366, 320, 375px / focus, hover, click, keyboard scroll / original data and links');
    }
    assert.deepEqual(errors,[],'no page runtime errors');
    await context.close();
    }
    await verifyFareCta(browser,'index');
    await verifyFareCta(browser,'forecast');
  } finally {
    await browser.close();
  }
})().catch(error => {console.error(error);process.exitCode=1;});
