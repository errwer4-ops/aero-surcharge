(function (w, d) {
  'use strict';
  if (w.AeroAnalytics) return;
  var config = w.AERO_ANALYTICS_CONFIG || {};
  var storageKey = 'aero_privacy_v1';
  var consent = { analytics: false, advertising: false };
  var chosen = false, started = false, startScheduled = false, sequence = 0;
  var privacyUi = null;
  var sent = new Set();
  var routeViewed = false;
  var local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(w.location.hostname);
  var allowed = !local || config.allowLocal === true;
  var eventNames = new Set(['route_search','route_result_view','route_no_result','airline_compare','month_compare','forecast_view','archive_view','affiliate_click','cta_fare_compare']);
  var fields = {
    origin:/^[A-Z]{3}$/, destination:/^[A-Z]{3}$/, airline:/^[A-Z0-9]{2,3}$/,
    base_month:/^20\d{2}-\d{2}$/, compare_month:/^20\d{2}-\d{2}$/, month:/^20\d{2}-\d{2}$/,
    currency:/^[A-Z]{3}$/, result_status:/^[a-z_]{1,40}$/, placement:/^[a-z0-9_-]{1,60}$/,
    affiliate:/^[a-z0-9_-]{1,40}$/, trip_type:/^(one_way|round_trip_estimate)$/,
    content_type:/^[a-z_]{1,30}$/
  };
  function cleanPage() { return w.location.origin + w.location.pathname; }
  function readChoice() {
    var raw, saved;
    try { raw=w.localStorage.getItem(storageKey); } catch (_) { return false; }
    try { saved=JSON.parse(raw); } catch (_) { saved=null; }
    consent = { analytics:false, advertising:false }; chosen=false;
    if (saved && saved.version === 1 && Number.isFinite(saved.at) && Date.now() - saved.at >= 0 && Date.now() - saved.at < 180*86400000) {
      consent = { analytics:saved.analytics === true, advertising:saved.advertising === true };
      chosen = true;
    }
    return true;
  }
  w.dataLayer = w.dataLayer || [];
  w.gtag = w.gtag || function () { w.dataLayer.push(arguments); };
  w.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  function appendScript(id, src) {
    if (d.getElementById(id)) return;
    var s=d.createElement('script'); s.id=id; s.async=true; s.src=src; d.head.appendChild(s);
  }
  function start() {
    if (!allowed || !consent.analytics || started) return;
    if(d.readyState==='loading') {
      if(!startScheduled) { startScheduled=true; d.addEventListener('DOMContentLoaded',start,{once:true}); }
      return;
    }
    started = true;
    if (/^G-[A-Z0-9]+$/.test(config.ga4Id || '')) {
      w.gtag('js',new Date());
      w.gtag('config',config.ga4Id,{
        send_page_view:false, allow_google_signals:false, allow_ad_personalization_signals:false,
        page_location:cleanPage(),page_referrer:'',ignore_referrer:true
      });
      appendScript('aero-ga4','https://www.googletagmanager.com/gtag/js?id='+config.ga4Id);
      w.gtag('event','page_view',{page_location:cleanPage(),page_referrer:'',page_title:d.title,debug_mode:config.debug === true});
    }
    if (/^[a-z0-9]{6,20}$/i.test(config.clarityId || '')) {
      // Mask the whole document, including route fields. Never record free-text searches.
      d.documentElement.setAttribute('data-clarity-mask','true');
      w.clarity = w.clarity || function () { (w.clarity.q=w.clarity.q||[]).push(arguments); };
      w.clarity('consentv2',{analytics_Storage:'granted',ad_Storage:'denied'});
      appendScript('aero-clarity','https://www.clarity.ms/tag/'+config.clarityId);
    }
  }
  function updateConsent() {
    w['ga-disable-'+config.ga4Id] = !consent.analytics;
    w.gtag('consent','update',{
      analytics_storage:consent.analytics?'granted':'denied',
      // Advertising remains separate; never enable signals/personalization here.
      ad_storage:consent.advertising?'granted':'denied',ad_user_data:'denied',ad_personalization:'denied'
    });
    if (w.clarity) w.clarity('consentv2',{analytics_Storage:consent.analytics?'granted':'denied',ad_Storage:'denied'});
    start();
    w.dispatchEvent(new CustomEvent('aero:consent',{detail:{analytics:consent.analytics,advertising:consent.advertising}}));
  }
  function saveChoice(analytics, advertising) {
    consent = {analytics:analytics===true,advertising:advertising===true}; chosen=true;
    try { w.localStorage.setItem(storageKey,JSON.stringify({version:1,at:Date.now(),analytics:consent.analytics,advertising:consent.advertising})); } catch (_) {}
    updateConsent();
    if (privacyUi) privacyUi.saved();
    if (!consent.analytics) clearAnalyticsCookies();
  }
  function clearAnalyticsCookies() {
    // GA can use a parent-domain cookie on a www/subdomain page. Only remove
    // GA cookies, and only for this host or its own parent-domain suffixes.
    var host=w.location.hostname, domains=[];
    if (!/^(localhost|\[.*\]|\d+(?:\.\d+){3})$/.test(host)) {
      var parts=host.split('.');
      for (var i=0;i<parts.length-1;i++) domains.push(parts.slice(i).join('.'));
    }
      try { d.cookie.split(';').forEach(function (cookie) {
        var name=cookie.split('=')[0].trim();
        if (/^_ga($|_)/.test(name)) {
          d.cookie=name+'=; Max-Age=0; Path=/; SameSite=Lax';
          domains.forEach(function(domain){d.cookie=name+'=; Max-Age=0; Path=/; Domain=.'+domain+'; SameSite=Lax';});
        }
      }); } catch (_) { /* Some privacy modes block cookie access as well as storage. */ }
  }
  function syncChoice() {
    var previous=consent, wasChosen=chosen;
    if (!readChoice()) return; // Storage can be blocked while in-memory choices still work.
    if (previous.analytics!==consent.analytics || previous.advertising!==consent.advertising || wasChosen!==chosen) {
      updateConsent();
      if (!consent.analytics) clearAnalyticsCookies();
      if (privacyUi) privacyUi.sync();
    }
  }
  function track(name, params, key) {
    if (!eventNames.has(name) || !allowed || !consent.analytics) return false;
    if (key && sent.has(name+':'+key)) return false;
    var safe={page_location:cleanPage(),page_path:w.location.pathname,page_referrer:'',debug_mode:config.debug===true};
    Object.keys(params||{}).forEach(function(k){
      if (fields[k] && typeof params[k]==='string' && fields[k].test(params[k])) safe[k]=params[k];
      if (k==='result_count' && Number.isInteger(params[k]) && params[k]>=0 && params[k]<=1000) safe[k]=params[k];
    });
    if (name==='route_result_view') routeViewed=true;
    if (name==='affiliate_click') {
      safe.after_route_result=routeViewed;
      safe.device_category=w.matchMedia('(max-width: 700px)').matches?'mobile':'desktop';
    }
    if (key) { sent.add(name+':'+key); if(sent.size>500) sent.delete(sent.values().next().value); }
    if (/^G-[A-Z0-9]+$/.test(config.ga4Id||'')) w.gtag('event',name,safe);
    return true;
  }
  function provider(link) {
    try {
      var url=new URL(link.href,w.location.href),h=url.hostname;
      if (/(^|\.)(lase\.kr|linkmoa\.kr|myrealt\.rip|myrealtrip\.com)$/.test(h)) return 'myrealtrip';
      if (/(^|\.)newtip\.net$/.test(h)) return 'hotelscombined';
      if (/(^|\.)app\.ac$/.test(h)) {
        if(link.dataset.affiliate==='hotel_partner')return 'hotel_partner';
        if(url.pathname==='/ejCPW0a93')return 'sim_partner';
        return 'unknown_partner';
      }
      if (/(^|\.)klook\.com$/.test(h)) return 'klook';
    } catch (_) {}
    return null;
  }
  function ui() {
    var style=d.createElement('style');
    style.textContent=[
      '#aeroPrivacyBar,#aeroPrivacy,#aeroPrivacyBar *,#aeroPrivacy *{box-sizing:border-box}',
      '#aeroPrivacyBar{position:fixed;bottom:0;left:0;right:0;z-index:10000;display:flex;align-items:center;gap:8px;min-height:53px;padding:4px max(12px,calc((100vw - 1092px)/2));border-top:1px solid #e0e4e9;background:#fff;color:#4e5c6c;font:12px/1.4 var(--sans,system-ui,sans-serif)}',
      '#aeroPrivacyBar[hidden]{display:none}#aeroPrivacyBar p{flex:1;min-width:0;margin:0;overflow-wrap:anywhere}#aeroPrivacyBar .aero-privacy-actions{display:flex;flex:none;gap:8px}',
      '#aeroPrivacyBar button,#aeroPrivacy button,.aero-privacy-open{font:inherit;cursor:pointer;min-height:44px;border:1px solid #ccd4de;background:#fff;color:#2453a6;border-radius:4px;padding:8px 10px;margin:0;line-height:1.4}',
      '#aeroPrivacyBar button{white-space:nowrap;border-color:transparent}#aeroPrivacyBar button:hover{background:#f7f8fa}',
      '#aeroPrivacy{position:fixed;inset:0;margin:auto;width:calc(100% - 32px);max-width:460px;max-height:calc(100vh - 32px);max-height:calc(100dvh - 32px);overflow:auto;padding:20px;border:1px solid #ccd4de;border-radius:6px;background:#fff;color:#172332;font:13px/1.7 var(--sans,system-ui,sans-serif)}',
      '#aeroPrivacy::backdrop{background:rgba(23,35,50,.22)}#aeroPrivacy .aero-privacy-heading{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}',
      '#aeroPrivacy h2{margin:0;font-size:16px;font-weight:600;line-height:1.5}#aeroPrivacy p{margin:0 0 14px;color:#4e5c6c}#aeroPrivacy a{color:#2453a6;text-underline-offset:3px}',
      '#aeroPrivacy label{display:flex;align-items:center;gap:9px;min-height:44px;margin:0;color:#4e5c6c}#aeroPrivacy input{flex:none;width:16px;height:16px;margin:0;accent-color:#2453a6}',
      '#aeroPrivacy .aero-privacy-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}#aeroPrivacy #aeroConsentClose{flex:none;min-width:44px;font-size:20px;border:0;padding:4px}',
      '#aeroPrivacyBar :is(button,a):focus-visible,#aeroPrivacy :is(button,a,input):focus-visible,.aero-privacy-open:focus-visible{outline:2px solid #2453a6;outline-offset:3px}',
      '.aero-privacy-open{font:12px/1.4 var(--sans,system-ui,sans-serif)}'
    ].join('');
    d.head.appendChild(style);
    var copies={
      ko:{intro:'선택한 노선 코드 등 이용 통계를 분석하려면 동의해 주세요. 거부해도 조회·관심 노선 저장을 사용할 수 있습니다.',policy:'개인정보 안내',analytics:'이용 통계 (GA4·설정된 경우 Clarity)',ads:'광고 쿠키 (광고 기능이 활성화된 경우)',save:'선택 저장',deny:'모두 거부',open:'분석·광고 설정'},
      en:{intro:'Allow usage analytics for route codes and interactions. Search and saved routes work without consent.',policy:'Privacy policy',analytics:'Analytics (GA4 and configured Clarity)',ads:'Advertising cookies (when ads are enabled)',save:'Save choices',deny:'Reject all',open:'Privacy settings'},
      ja:{intro:'選択した路線コードなどの利用統計の分析に同意してください。同意しなくても検索と路線の保存を利用できます。',policy:'プライバシーポリシー',analytics:'利用統計（GA4・設定済みの場合はClarity）',ads:'広告Cookie（広告機能が有効な場合）',save:'選択を保存',deny:'すべて拒否',open:'分析・広告の設定'},
      zh:{intro:'是否允许分析所选航线代码等使用统计？拒绝后仍可查询并保存关注航线。',policy:'隐私政策',analytics:'使用统计（GA4及已配置的Clarity）',ads:'广告Cookie（启用广告功能时）',save:'保存选择',deny:'全部拒绝',open:'分析与广告设置'},
      fr:{intro:'Autorisez les statistiques sur les codes de trajet et les interactions. La recherche et les trajets enregistrés restent disponibles sans consentement.',policy:'Politique de confidentialité',analytics:'Statistiques (GA4 et Clarity si configuré)',ads:'Cookies publicitaires (si les annonces sont activées)',save:'Enregistrer mes choix',deny:'Tout refuser',open:'Paramètres de confidentialité'},
      de:{intro:'Erlauben Sie Nutzungsstatistiken zu Streckencodes und Interaktionen. Suche und gespeicherte Strecken bleiben auch ohne Einwilligung verfügbar.',policy:'Datenschutzerklärung',analytics:'Nutzungsstatistiken (GA4 und eingerichtetes Clarity)',ads:'Werbe-Cookies (bei aktivierter Werbung)',save:'Auswahl speichern',deny:'Alle ablehnen',open:'Datenschutzeinstellungen'}
    };
    var compactCopy={
      ko:['선택 쿠키는 동의 후 사용합니다.','설정','닫기'],
      en:['Optional analytics and ad cookies','Settings','Close'],
      ja:['分析・広告Cookieは任意です。','設定','閉じる'],
      zh:['统计与广告 Cookie 可自由选择。','设置','关闭'],
      fr:['Cookies facultatifs','Paramètres','Fermer'],
      de:['Optionale Cookies','Einstellungen','Schließen']
    };
    var bar=d.createElement('section');bar.id='aeroPrivacyBar';bar.hidden=chosen;
    bar.innerHTML='<p id="aeroConsentBarIntro"></p><div class="aero-privacy-actions"><button type="button" id="aeroConsentSettings" aria-controls="aeroPrivacy" aria-haspopup="dialog"></button><button type="button" id="aeroConsentDeny"></button></div>';
    d.body.appendChild(bar);
    var panel=d.createElement('dialog');panel.id='aeroPrivacy';panel.setAttribute('aria-labelledby','aeroConsentTitle');panel.setAttribute('aria-describedby','aeroConsentIntro');
    panel.innerHTML='<div class="aero-privacy-heading"><h2 id="aeroConsentTitle"></h2><button type="button" id="aeroConsentClose">×</button></div><p><span id="aeroConsentIntro"></span> <a href="privacy.html" id="aeroConsentPolicy"></a></p><label><input id="aeroConsentAnalytics" type="checkbox"> <span id="aeroConsentAnalyticsLabel"></span></label><label><input id="aeroConsentAds" type="checkbox"> <span id="aeroConsentAdsLabel"></span></label><div class="aero-privacy-actions"><button type="button" id="aeroConsentSave"></button><button type="button" id="aeroConsentDenyDialog"></button></div>';
    d.body.appendChild(panel);
    var returnFocus=null;
    function reflect(){d.getElementById('aeroConsentAnalytics').checked=consent.analytics;d.getElementById('aeroConsentAds').checked=consent.advertising;}
    function closeSettings(){if(panel.open)panel.close();}
    function showSettings(){
      if(panel.open)return;
      returnFocus=d.activeElement;reflect();panel.showModal();d.getElementById('aeroConsentAnalytics').focus();
    }
    panel.addEventListener('close',function(){
      var target=returnFocus;returnFocus=null;
      if(!target||!target.isConnected||!target.getClientRects().length)target=open;
      if(target&&target.focus)target.focus({preventScroll:true});
    });
    privacyUi={
      open:showSettings,
      saved:function(){bar.hidden=true;closeSettings();},
      sync:function(){bar.hidden=chosen;reflect();if(chosen)closeSettings();}
    };
    reflect();
    d.getElementById('aeroConsentSave').onclick=function(){saveChoice(d.getElementById('aeroConsentAnalytics').checked,d.getElementById('aeroConsentAds').checked);};
    d.getElementById('aeroConsentDeny').onclick=function(){saveChoice(false,false);};
    d.getElementById('aeroConsentDenyDialog').onclick=function(){saveChoice(false,false);};
    d.getElementById('aeroConsentSettings').onclick=showSettings;
    d.getElementById('aeroConsentClose').onclick=closeSettings;
    var open=d.createElement('button');open.type='button';open.className='aero-privacy-open';
    open.setAttribute('aria-controls','aeroPrivacy');open.setAttribute('aria-haspopup','dialog');open.onclick=showSettings;
    (d.querySelector('footer')||d.body).appendChild(open);
    function translate(){
      var lang=(d.documentElement.lang||'ko').toLowerCase().split('-')[0],copy=copies[lang]||copies.en;
      var labels={aeroConsentIntro:'intro',aeroConsentPolicy:'policy',aeroConsentAnalyticsLabel:'analytics',aeroConsentAdsLabel:'ads',aeroConsentSave:'save',aeroConsentDeny:'deny',aeroConsentDenyDialog:'deny',aeroConsentTitle:'open'};
      Object.keys(labels).forEach(function(id){d.getElementById(id).textContent=copy[labels[id]];});
      var compact=compactCopy[lang]||compactCopy.en;
      d.getElementById('aeroConsentBarIntro').textContent=compact[0];d.getElementById('aeroConsentSettings').textContent=compact[1];d.getElementById('aeroConsentClose').setAttribute('aria-label',compact[2]);
      open.textContent=copy.open;panel.setAttribute('aria-label',copy.open);bar.setAttribute('aria-label',copy.open);
    }
    translate();
    new MutationObserver(translate).observe(d.documentElement,{attributes:true,attributeFilter:['lang']});
    d.addEventListener('click',function(e){
      var link=e.target.closest && e.target.closest('a[href]');if(!link)return;
      var partner=provider(link);if(!partner)return;
      link.rel=Array.from(new Set((link.rel+' noopener noreferrer sponsored').split(/\s+/).filter(Boolean))).join(' ');
      var placement=link.dataset.analyticsPlacement||(link.closest('#resultsSection')?'route_result':link.closest('#savingAffiliate')?'calculator_result':link.closest('footer')?'footer':'content');
      var action='click-'+(++sequence);
      track('affiliate_click',{affiliate:partner,placement:placement},action);
      if(partner==='myrealtrip'&&link.dataset.fareCompare==='true'){
        var params={affiliate:partner,placement:placement};
        // Record the route that produced these results, never unsubmitted input.
        if(link.closest('#resultsSection')&&w._searchCtx){
          params.origin=w._searchCtx.dep;params.destination=w._searchCtx.arr;
          params.trip_type=w._searchCtx.isRT?'round_trip_estimate':'one_way';
        }
        track('cta_fare_compare',params,action);
      }
    });
    // A view means substantive content is visible, not merely a navigation click.
    var path=w.location.pathname, name=/\/forecast(?:\.html)?$/.test(path)?'forecast_view':/\/fuel-surcharge-(graph|2026-05)(?:\.html)?$/.test(path)?'archive_view':null;
    if(name && 'IntersectionObserver' in w){
      var target=d.querySelector('main')||d.querySelector('.container');
      if(target){
        function viewed(){
          var rect=target.getBoundingClientRect();
          if(rect.bottom>0 && rect.top<w.innerHeight && target.innerText.trim().length>200 && track(name,{content_type:name==='forecast_view'?'forecast':'historical'},'page')) observer.disconnect();
        }
        var observer=new IntersectionObserver(viewed,{threshold:0.01});observer.observe(target);
        w.addEventListener('aero:consent',viewed);
      }
    }
  }
  w.AeroAnalytics={track:track,consent:function(){return Object.assign({},consent);},setConsent:saveChoice,showPrivacy:function(){if(privacyUi)privacyUi.open();},nextAction:function(){return ++sequence;}};
  readChoice();updateConsent();
  w.addEventListener('storage',function(e){if(e.key===storageKey||e.key===null)syncChoice();});
  w.addEventListener('focus',syncChoice);
  d.addEventListener('visibilitychange',function(){if(d.visibilityState==='visible')syncChoice();});
  if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',ui,{once:true});else ui();
})(window,document);
