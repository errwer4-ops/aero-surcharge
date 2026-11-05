(function(){
  'use strict';
  function load(){
    var c=window.AERO_ANALYTICS_CONFIG||{};
    if(c.adsEnabled!==true||!window.AeroAnalytics||window.AeroAnalytics.consent().advertising!==true)return;
    if(/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)&&c.allowLocal!==true)return;
    if(!/^ca-pub-\d+$/.test(c.adsClient||'')||document.getElementById('aero-ads'))return;
    var s=document.createElement('script');s.id='aero-ads';s.async=true;s.crossOrigin='anonymous';
    s.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+c.adsClient;
    document.head.appendChild(s);
  }
  window.addEventListener('aero:consent',load);load();
})();
