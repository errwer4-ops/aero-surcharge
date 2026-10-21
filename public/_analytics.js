(function (w, d) {
  'use strict';
  if (w.AeroAnalytics) return;
  var config = w.AERO_ANALYTICS_CONFIG || {};
  var storageKey = 'aero_privacy_v1';
  var consent = { analytics: false, advertising: false };
  var chosen = false, started = false, startScheduled = false, sequence = 0;
  var sent = new Set();
  var routeViewed = false;
  var local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(w.location.hostname);
  var allowed = !local || config.allowLocal === true;
  var eventNames = new Set(['route_search','route_result_view','route_no_result','airline_compare','month_compare','forecast_view','archive_view','affiliate_click']);
  var fields = {
    origin:/^[A-Z]{3}$/, destination:/^[A-Z]{3}$/, airline:/^[A-Z0-9]{2,3}$/,
    base_month:/^20\d{2}-\d{2}$/, compare_month:/^20\d{2}-\d{2}$/, month:/^20\d{2}-\d{2}$/,
    currency:/^[A-Z]{3}$/, result_status:/^[a-z_]{1,40}$/, placement:/^[a-z0-9_-]{1,60}$/,
    affiliate:/^[a-z0-9_-]{1,40}$/, trip_type:/^(one_way|round_trip_estimate)$/,
    content_type:/^[a-z_]{1,30}$/
  };
  function cleanPage() { return w.location.origin + w.location.pathname; }
  function readChoice() {
    try {
      var saved = JSON.parse(w.localStorage.getItem(storageKey));
      if (saved && saved.version === 1 && Number.isFinite(saved.at) && Date.now() - saved.at >= 0 && Date.now() - saved.at < 180*86400000) {
        consent = { analytics:saved.analytics === true, advertising:saved.advertising === true };
        chosen = true;
      }
    } catch (_) { /* Storage is optional; search must keep working. */ }
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
    var panel=d.getElementById('aeroPrivacy'); if(panel) panel.hidden=true;
    // Clear first-party GA cookies on withdrawal; remote-provider cookies require browser controls.
    if (!consent.analytics) {
      try { d.cookie.split(';').forEach(function (cookie) {
        var name=cookie.split('=')[0].trim();
        if (/^_ga($|_)/.test(name)) {
          d.cookie=name+'=; Max-Age=0; Path=/; SameSite=Lax';
          d.cookie=name+'=; Max-Age=0; Path=/; Domain=.'+w.location.hostname+'; SameSite=Lax';
        }
      }); } catch (_) { /* Some privacy modes block cookie access as well as storage. */ }
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
      var h=new URL(link.href,w.location.href).hostname;
      if (/(^|\.)(lase\.kr|myrealt\.rip|myrealtrip\.com)$/.test(h)) return 'myrealtrip';
      if (/(^|\.)newtip\.net$/.test(h)) return 'hotelscombined';
      if (/(^|\.)app\.ac$/.test(h)) return 'sim_partner';
      if (/(^|\.)klook\.com$/.test(h)) return 'klook';
    } catch (_) {}
    return null;
  }
  function ui() {
    var style=d.createElement('style');
    style.textContent='#aeroPrivacy{position:fixed;bottom:12px;left:12px;right:12px;max-width:580px;z-index:10000;padding:16px;border:1px solid #bae6fd;border-radius:10px;background:#fff;box-shadow:0 3px 20px #0002;color:#334155;font:13px/1.7 sans-serif}#aeroPrivacy[hidden]{display:none}#aeroPrivacy p{margin:0 0 10px}#aeroPrivacy button,.aero-privacy-open{font:inherit;cursor:pointer;border:1px solid #94a3b8;background:#fff;color:#075985;border-radius:6px;padding:7px 12px;margin:3px}#aeroPrivacy label{display:block}';
    d.head.appendChild(style);
    var panel=d.createElement('section');panel.id='aeroPrivacy';panel.setAttribute('aria-label','분석 및 광고 설정 / Privacy settings');panel.hidden=chosen;
    var ko=(d.documentElement.lang||'ko').startsWith('ko');
    panel.innerHTML=ko?'<p>선택한 노선 코드 등 이용 통계를 분석하려면 동의해 주세요. 거부해도 조회·관심 노선 저장을 사용할 수 있습니다. <a href="privacy.html">개인정보 안내</a></p><label><input id="aeroConsentAnalytics" type="checkbox"> 이용 통계 (GA4·설정된 경우 Clarity)</label><label><input id="aeroConsentAds" type="checkbox"> 광고 쿠키 (광고 기능이 활성화된 경우)</label><button type="button" id="aeroConsentSave">선택 저장</button><button type="button" id="aeroConsentDeny">모두 거부</button>':'<p>Allow usage analytics for route codes and interactions. Search and saved routes work without consent. <a href="privacy.html">Privacy policy</a></p><label><input id="aeroConsentAnalytics" type="checkbox"> Analytics (GA4 and configured Clarity)</label><label><input id="aeroConsentAds" type="checkbox"> Advertising cookies (when ads are enabled)</label><button type="button" id="aeroConsentSave">Save choices</button><button type="button" id="aeroConsentDeny">Reject all</button>';
    d.body.appendChild(panel);
    function reflect(){d.getElementById('aeroConsentAnalytics').checked=consent.analytics;d.getElementById('aeroConsentAds').checked=consent.advertising;}
    reflect();
    d.getElementById('aeroConsentSave').onclick=function(){saveChoice(d.getElementById('aeroConsentAnalytics').checked,d.getElementById('aeroConsentAds').checked);};
    d.getElementById('aeroConsentDeny').onclick=function(){saveChoice(false,false);};
    var open=d.createElement('button');open.type='button';open.className='aero-privacy-open';open.textContent=ko?'분석·광고 설정':'Privacy settings';
    open.onclick=function(){reflect();panel.hidden=false;d.getElementById('aeroConsentAnalytics').focus();};
    (d.querySelector('footer')||d.body).appendChild(open);
    d.addEventListener('click',function(e){
      var link=e.target.closest && e.target.closest('a[href]');if(!link)return;
      var partner=provider(link);if(!partner)return;
      link.rel=Array.from(new Set((link.rel+' noopener noreferrer sponsored').split(/\s+/).filter(Boolean))).join(' ');
      var placement=link.dataset.analyticsPlacement||(link.closest('#resultsSection')?'route_result':link.closest('#savingAffiliate')?'calculator_result':link.closest('footer')?'footer':'content');
      track('affiliate_click',{affiliate:partner,placement:placement},'click-'+(++sequence));
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
  w.AeroAnalytics={track:track,consent:function(){return Object.assign({},consent);},setConsent:saveChoice,nextAction:function(){return ++sequence;}};
  readChoice();updateConsent();
  if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',ui,{once:true});else ui();
})(window,document);
