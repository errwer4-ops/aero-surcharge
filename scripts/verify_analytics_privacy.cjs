const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');

// Serve local sources at a synthetic origin. No request reaches an ad,
// analytics, affiliate, API or other external service during this regression.
async function verifyAnalyticsPrivacy(browser){
  const origin='https://www.aero-consent.invalid',context=await browser.newContext();
  const blocked=[];
  function anchor(file,href){
    const text=fs.readFileSync(path.join(root,'public',file),'utf8');
    const found=[...text.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g)].map(x=>x[0]).find(x=>x.includes('href="'+href+'"'));
    assert(found,file+' affiliate fixture exists');return found;
  }
  const hotelFiles=['fuel-surcharge-asiana.html','fuel-surcharge-jejuair.html','fuel-surcharge-korean-air.html','fuel-surcharge-jinair.html','fuel-surcharge-tway.html'];
  const links=[anchor('forecast.html','https://linkmoa.kr/click.php?m=myrealtrip&a=A100704170&l=0000'),
    ...hotelFiles.map(file=>anchor(file,'http://app.ac/xjCXQLa23')),
    anchor('index.html','http://app.ac/ejCPW0a93'),
    '<a href="https://app.ac/unclassified-test">Unclassified partner fixture</a>'];
  const assets=Object.fromEntries(['_analytics-config.js','_analytics.js','_ads.js'].map(name=>['/'+name,fs.readFileSync(path.join(root,'public',name),'utf8')]));
  const html='<!doctype html><html lang="ko"><head><meta charset="UTF-8"><title>Privacy regression fixture</title>'+Object.keys(assets).map(src=>'<script src="'+src+'"></script>').join('')+'</head><body><main>'+links.join('\n')+'</main><footer></footer></body></html>';
  await context.route('**/*',route=>{
    const url=new URL(route.request().url());
    if(url.origin!==origin){blocked.push(url.hostname);return route.abort();}
    if(assets[url.pathname])return route.fulfill({contentType:'text/javascript; charset=utf-8',body:assets[url.pathname]});
    return route.fulfill({contentType:'text/html; charset=utf-8',body:html});
  });
  try{
    const a=await context.newPage(),b=await context.newPage();
    await a.goto(origin+'/a');
    assert.equal(await a.locator('#aero-ga4,#aero-clarity,#aero-ads').count(),0,'no analytics or ads before consent');
    assert.deepEqual(blocked,[],'no external request is attempted before consent');
    assert.equal(await a.locator('#aeroPrivacyBar').isVisible(),true,'initial choice is a compact bar');
    assert.equal(await a.locator('#aeroPrivacy').isVisible(),false,'details are initially closed');
    const labels={ko:['선택 저장','모두 거부','분석·광고 설정'],en:['Save choices','Reject all','Privacy settings'],ja:['選択を保存','すべて拒否','分析・広告の設定'],zh:['保存选择','全部拒绝','分析与广告设置'],fr:['Enregistrer mes choix','Tout refuser','Paramètres de confidentialité'],de:['Auswahl speichern','Alle ablehnen','Datenschutzeinstellungen']};
    const barLayouts=[];
    for(const [width,height] of [[1366,768],[375,812]]){
      await a.setViewportSize({width,height});
      for(const lang of Object.keys(labels)){
        await a.evaluate(lang=>document.documentElement.lang=lang,lang);
        await a.waitForFunction(text=>document.getElementById('aeroConsentDeny').textContent===text,labels[lang][1]);
        const size=await a.locator('#aeroPrivacyBar').evaluate(el=>{const r=el.getBoundingClientRect();return {height:r.height,left:r.left,right:r.right,width:innerWidth,overflow:el.scrollWidth>el.clientWidth};});
        assert(size.height>=48&&size.height<=56,lang+' '+width+' compact bar stays between 48 and 56px');
        assert(size.left>=0&&size.right<=size.width&&!size.overflow,lang+' '+width+' compact bar fits the viewport');
        barLayouts.push({lang,width,height:size.height});
      }
    }
    await a.locator('#aeroConsentSettings').click();
    assert.equal(await a.locator('#aeroPrivacy').evaluate(el=>el.tagName==='DIALOG'&&el.matches(':modal')),true,'settings use a native modal dialog');
    await a.locator('#aeroConsentAnalytics').check();
    const initialChoice=await a.evaluate(()=>localStorage.getItem('aero_privacy_v1'));
    for(const [lang,text] of Object.entries(labels)){
      await a.evaluate(lang=>document.documentElement.lang=lang,lang);
      await a.waitForFunction(text=>document.getElementById('aeroConsentSave').textContent===text,text[0]);
      assert.equal(await a.locator('#aeroConsentDeny').innerText(),text[1]);
      assert.equal(await a.locator('.aero-privacy-open').innerText(),text[2]);
      assert.equal(await a.locator('#aeroPrivacy').getAttribute('aria-label'),text[2]);
      assert.equal(await a.locator('#aeroPrivacy').isVisible(),true,'language change keeps panel open');
      assert.equal(await a.locator('#aeroConsentAnalytics').isChecked(),true,'unsaved analytics selection is preserved');
      assert.equal(await a.locator('#aeroConsentAds').isChecked(),false,'unsaved advertising selection is preserved');
      assert.deepEqual(await a.evaluate(()=>AeroAnalytics.consent()),{analytics:false,advertising:false});
      assert.equal(await a.evaluate(()=>localStorage.getItem('aero_privacy_v1')),initialChoice);
      assert.equal(await a.locator('#aero-ga4,#aero-clarity,#aero-ads').count(),0,'translation does not grant consent');
      const fit=await a.locator('#aeroPrivacy').evaluate(el=>{const r=el.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.top>=0&&r.bottom<=innerHeight&&el.scrollWidth<=el.clientWidth;});
      assert(fit,lang+' settings remain inside the mobile viewport');
    }
    await a.keyboard.press('Escape');
    assert.equal(await a.locator('#aeroPrivacy').isVisible(),false,'Escape closes settings');
    assert.equal(await a.evaluate(()=>document.activeElement.id),'aeroConsentSettings','Escape returns focus to the invoking button');
    assert.equal(await a.evaluate(()=>localStorage.getItem('aero_privacy_v1')),initialChoice,'Escape does not save an unsaved selection');
    assert.deepEqual(blocked,[],'opening, editing, translating and closing settings makes no external request');
    await a.locator('.aero-privacy-open').click();
    assert.equal(await a.locator('#aeroConsentAnalytics').isChecked(),false,'reopening restores the saved choice, not abandoned edits');
    await a.locator('#aeroConsentClose').click();
    assert.equal(await a.evaluate(()=>document.activeElement.classList.contains('aero-privacy-open')),true,'close returns focus to footer settings');
    assert.deepEqual(await a.evaluate(()=>AeroAnalytics.consent()),{analytics:false,advertising:false},'closing settings never grants consent');
    await a.evaluate(()=>AeroAnalytics.showPrivacy());
    assert.equal(await a.locator('#aeroPrivacy').isVisible(),true,'public settings opener opens the dialog');
    await a.locator('#aeroConsentDenyDialog').click();
    assert.equal(await a.locator('#aeroPrivacyBar').isVisible(),false,'dialog rejection hides the compact bar');
    assert.equal(await a.locator('#aeroPrivacy').isVisible(),false,'dialog rejection closes settings');
    await a.evaluate(()=>AeroAnalytics.setConsent(true,true));
    for(const lang of Object.keys(labels)){
      await a.evaluate(lang=>document.documentElement.lang=lang,lang);
      await a.waitForFunction(text=>document.getElementById('aeroConsentSave').textContent===text,labels[lang][0]);
      assert.equal(await a.locator('#aeroPrivacy').isVisible(),false,'language change keeps saved panel closed');
      assert.deepEqual(await a.evaluate(()=>AeroAnalytics.consent()),{analytics:true,advertising:true});
    }
    await b.goto(origin+'/b');
    assert.equal(await b.evaluate(()=>AeroAnalytics.consent().analytics),true);
    assert.equal(await b.locator('#aero-ads').count(),0,'advertising consent cannot override disabled configuration');
    await a.evaluate(()=>AeroAnalytics.setConsent(false,false));
    await b.waitForFunction(()=>!AeroAnalytics.consent().analytics&&!AeroAnalytics.consent().advertising);
    assert.equal(await b.evaluate(()=>window['ga-disable-'+AERO_ANALYTICS_CONFIG.ga4Id]),true);
    const count=await b.evaluate(()=>dataLayer.length);
    assert.equal(await b.evaluate(()=>AeroAnalytics.track('route_search',{origin:'ICN',destination:'NRT'},'withdrawn')),false);
    assert.equal(await b.evaluate(()=>dataLayer.length),count,'another tab withdrawal prevents new custom events');

    await context.addCookies([
      {name:'_ga',value:'fixture',domain:'.aero-consent.invalid',path:'/',secure:true},
      {name:'_ga_FIXTURE',value:'fixture',domain:'www.aero-consent.invalid',path:'/',secure:true},
      {name:'aero_saved_fixture',value:'preserve',domain:'.aero-consent.invalid',path:'/',secure:true}
    ]);
    await b.evaluate(()=>AeroAnalytics.setConsent(false,false));
    const cookies=await context.cookies();
    assert(!cookies.some(x=>/^_ga($|_)/.test(x.name)),'withdrawal removes host and parent-domain GA cookies');
    assert(cookies.some(x=>x.name==='aero_saved_fixture'),'unrelated first-party cookies remain');

    await b.evaluate(()=>{
      AeroAnalytics.setConsent(true,false);
      localStorage.setItem('aero_privacy_v1',JSON.stringify({version:1,at:Date.now()-181*86400000,analytics:true,advertising:true}));
      dispatchEvent(new Event('focus'));
    });
    assert.equal(await b.evaluate(()=>AeroAnalytics.consent().analytics),false,'focus rechecks expired choices');
    assert.equal(await b.locator('#aeroPrivacyBar').isVisible(),true,'expired choices restore the compact bar');
    assert.equal(await b.locator('#aeroPrivacy').isVisible(),false,'expiry does not open a blocking dialog');
    await b.evaluate(()=>{AeroAnalytics.setConsent(true,false);localStorage.setItem('aero_privacy_v1','invalid-json');dispatchEvent(new Event('focus'));});
    assert.equal(await b.evaluate(()=>AeroAnalytics.consent().analytics),false,'malformed saved choices fail closed');
    await a.evaluate(()=>AeroAnalytics.setConsent(true,false));
    await b.waitForFunction(()=>AeroAnalytics.consent().analytics);
    await a.evaluate(()=>localStorage.clear());
    await b.waitForFunction(()=>!AeroAnalytics.consent().analytics);
    assert.equal(await b.locator('#aeroPrivacyBar').isVisible(),true,'clearing site storage restores the compact bar');

    await a.evaluate(()=>{
      AeroAnalytics.setConsent(true,false);
      document.addEventListener('click',event=>event.preventDefault(),true);
      document.querySelectorAll('main a').forEach(link=>link.click());
    });
    const events=await a.evaluate(()=>dataLayer.filter(x=>x[0]==='event'&&x[1]==='affiliate_click').map(x=>x[2].affiliate));
    assert.deepEqual(events,['myrealtrip',...hotelFiles.map(()=>'hotel_partner'),'sim_partner','unknown_partner']);
    assert.equal(await a.locator('main a:not([rel~="sponsored"]),main a:not([rel~="noreferrer"])').count(),0);
    assert.equal(blocked.filter(host=>/linkmoa|app\.ac/.test(host)).length,0,'no affiliate request was sent');
    assert.equal(await a.locator('#aero-ga4').count(),1,'repeated choice changes never duplicate GA loader');

    const restricted=await context.newPage();
    await restricted.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Blocked','SecurityError');}}));
    await restricted.goto(origin+'/restricted');
    await restricted.evaluate(()=>{AeroAnalytics.setConsent(true,false);dispatchEvent(new Event('focus'));});
    assert.equal(await restricted.evaluate(()=>AeroAnalytics.consent().analytics),true,'blocked storage preserves an explicit in-memory choice');
    await restricted.evaluate(()=>AeroAnalytics.setConsent(false,false));
    assert.equal(await restricted.evaluate(()=>AeroAnalytics.track('route_search',{origin:'ICN'})),false);
    const network=await verifyConsentNetwork(browser,assets);
    return {passed:true,barLayouts,network,externalRequestsBlocked:[...new Set(blocked)],affiliateRequestsSent:0};
  }finally{await context.close();}
}

async function verifyConsentNetwork(browser,assets){
  const origin='https://www.aero-network.invalid',results=[];
  for(const [name,analytics,advertising] of [['analytics',true,false],['advertising',false,true],['both',true,true]]){
    const context=await browser.newContext(),requests=[];
    try{
      // Test configuration only: the production IDs and enablement are untouched.
      await context.addInitScript(()=>{window.AERO_ANALYTICS_CONFIG={ga4Id:'G-TEST123',clarityId:'test1234',adsEnabled:true,adsClient:'ca-pub-1234567890'};});
      const html='<!doctype html><html lang="ko"><head><meta charset="UTF-8"><title>Consent network fixture</title>'+Object.keys(assets).map(src=>'<script src="'+src+'"></script>').join('')+'</head><body><main>Consent network fixture</main><footer></footer></body></html>';
      await context.route('**/*',route=>{
        const url=new URL(route.request().url());
        if(url.origin!==origin){requests.push(url.href);return route.abort();}
        return route.fulfill({contentType:assets[url.pathname]?'text/javascript; charset=utf-8':'text/html; charset=utf-8',body:assets[url.pathname]||html});
      });
      const page=await context.newPage();
      await page.goto(origin+'/network');
      assert.deepEqual(requests,[],name+' first visit attempts no third-party request');
      await page.locator('#aeroConsentSettings').click();
      await page.locator('#aeroConsentAnalytics').check();
      await page.locator('#aeroConsentAds').check();
      await page.keyboard.press('Escape');
      await page.locator('#aeroConsentDeny').click();
      await page.reload();
      assert.deepEqual(requests,[],name+' unsaved changes, rejection and reload attempt no third-party request');
      assert.equal(await page.locator('#aeroPrivacyBar').isVisible(),false,'rejection persists across reload');
      await page.locator('.aero-privacy-open').click();
      await page.locator('#aeroConsentAnalytics').setChecked(analytics);
      await page.locator('#aeroConsentAds').setChecked(advertising);
      assert.deepEqual(requests,[],name+' checkboxes alone do not load providers');
      const expected=[];
      if(analytics)expected.push('https://www.googletagmanager.com/gtag/js?id=G-TEST123','https://www.clarity.ms/tag/test1234');
      if(advertising)expected.push('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890');
      const arrivals=expected.map(url=>page.waitForRequest(request=>request.url()===url));
      await page.locator('#aeroConsentSave').click();
      await Promise.all(arrivals);
      await page.waitForTimeout(50);
      assert.deepEqual(requests.slice().sort(),expected.slice().sort(),name+' only explicitly selected provider requests are attempted');
      assert.deepEqual(await page.evaluate(()=>AeroAnalytics.consent()),{analytics,advertising});
      assert.equal(await page.locator('#aeroPrivacyBar').isVisible(),false,'save hides compact bar');
      assert.equal(await page.locator('#aeroPrivacy').isVisible(),false,'save closes dialog');
      for(let attempt=0;attempt<2;attempt++){
        await page.locator('.aero-privacy-open').click();
        await page.locator('#aeroConsentSave').click();
      }
      await page.waitForTimeout(50);
      assert.deepEqual(requests.slice().sort(),expected.slice().sort(),name+' repeated saves do not reload providers');
      results.push({choice:name,beforeConsentRequests:0,requests:requests.slice(),duplicateRequests:0});
    }finally{await context.close();}
  }
  return results;
}
module.exports={verifyAnalyticsPrivacy};
if(require.main===module)(async()=>{
  const browser=await chromium.launch({headless:true});
  try{console.log('PASS: analytics privacy regression '+JSON.stringify(await verifyAnalyticsPrivacy(browser)));}
  finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
