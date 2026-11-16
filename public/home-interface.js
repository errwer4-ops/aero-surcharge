(function(){
  'use strict';
  // Home-specific copy lives beside the home layout, without changing other pages.
  var keys=['home.nav.graph','home.scope','home.basis','home.criteriaLink','home.overview','home.airlinesLink','home.airline','home.notice','home.change','home.source','home.guide','home.back','home.skip','home.swap','index.search','index.trip.roundTrip','index.airport.searchOriginPlaceholder','index.airport.searchDestPlaceholder','index.guide.title','index.quick.title'];
  var copy={
    ko:['월별 추이','한국 출발 국제선 · 항공사 공식 공시','유류할증료만 비교합니다. 항공권 총액과 운항 여부는 발권처에서 확인하세요.','조회 기준','항공사 공시 현황','항공사 전체 보기 →','항공사','공시 상태','전월 대비 변화','출처','이용 기준과 데이터 안내','← 항공사 공시 현황','본문으로 이동','출발·도착 공항 교체','조회하기','왕복 추정','도시 또는 공항 코드','도시 또는 공항 코드','유류할증료란 무엇인가요?','더 살펴보기'],
    en:['Monthly trends','INTERNATIONAL FROM KOREA · AIRLINE NOTICES','Fuel surcharge only. Check the total airfare and flight availability with your ticket seller.','Lookup basis','Airline notice overview','All airlines →','Airline','Notice status','Monthly change','Source','How to read the data','← Airline notice overview','Skip to content','Swap departure and arrival','Compare','Round-trip est.','City or airport code','City or airport code','What is a fuel surcharge?','Explore more'],
    ja:['月別推移','韓国発国際線 · 航空会社の公式公示','燃油サーチャージのみを比較します。航空券総額と運航状況は購入先でご確認ください。','表示基準','航空会社の公示状況','すべての航空会社 →','航空会社','公示状況','前月比','出典','利用基準とデータの説明','← 航空会社の公示状況','本文へ移動','出発地と到着地を入れ替え','照会する','往復概算','都市・空港コード','都市・空港コード','燃油サーチャージとは？','関連情報'],
    zh:['月度趋势','韩国出发国际线 · 航司官方公告','仅比较燃油附加费。机票总价及航班运营情况请向出票方确认。','查询依据','航空公司公告','全部航空公司 →','航空公司','公告状态','环比变化','来源','查询依据与数据说明','← 航空公司公告','跳转正文','交换出发与到达机场','查询','往返估算','城市或机场代码','城市或机场代码','什么是燃油附加费？','更多信息'],
    fr:['Évolution mensuelle','DÉPARTS INTERNATIONAUX DE CORÉE · AVIS DES COMPAGNIES','Surtaxe carburant uniquement. Vérifiez le prix total et la disponibilité des vols auprès du vendeur.','Base de lecture','Avis des compagnies','Toutes les compagnies →','Compagnie','État de l’avis','Variation mensuelle','Source','Lire les données et leurs limites','← Avis des compagnies','Aller au contenu','Inverser départ et arrivée','Comparer','A/R estimé','Ville ou code aéroport','Ville ou code aéroport','Qu’est-ce que la surtaxe carburant ?','En savoir plus'],
    de:['Monatsverlauf','INTERNATIONAL AB KOREA · AIRLINE-MITTEILUNGEN','Nur Kerosinzuschläge. Gesamtpreis und Flugverfügbarkeit beim Ticketanbieter prüfen.','Abfragebasis','Mitteilungen der Airlines','Alle Airlines →','Airline','Mitteilungsstatus','Monatsänderung','Quelle','Daten und Vergleichsgrundlagen','← Mitteilungen der Airlines','Zum Inhalt','Abflug und Ziel tauschen','Vergleichen','Hin/Rück gesch.','Stadt oder Flughafencode','Stadt oder Flughafencode','Was ist ein Kerosinzuschlag?','Weitere Informationen']
  };
  Object.keys(copy).forEach(function(lang){
    window.I18N[lang]=window.I18N[lang]||{};
    keys.forEach(function(key,index){window.I18N[lang][key]=copy[lang][index];});
  });
  function setup(){
    var activeTrend=null,trendLeaveTimer=null;
    function cancelTrendLeave(){window.clearTimeout(trendLeaveTimer);trendLeaveTimer=null;}
    function hideTrend(){cancelTrendLeave();if(activeTrend)activeTrend.classList.remove('is-tooltip-open');activeTrend=null;}
    function showTrend(button){
      var row=button.closest('.mini-trend-details'),tip=row.querySelector('.mini-trend-tooltip');
      hideTrend();activeTrend=row;row.classList.add('is-tooltip-open');
      var anchor=button.getBoundingClientRect(),box=tip.getBoundingClientRect();
      tip.style.left=Math.max(16,Math.min(anchor.left,window.innerWidth-box.width-16))+'px';
      tip.style.top=Math.max(8,anchor.bottom+box.height+8<window.innerHeight?anchor.bottom+8:anchor.top-box.height-8)+'px';
    }
    document.addEventListener('focusin',function(event){var button=event.target.closest('.mini-trend-info');if(button)showTrend(button);});
    document.addEventListener('focusout',function(event){if(activeTrend&&!activeTrend.contains(event.relatedTarget))hideTrend();});
    document.addEventListener('mouseover',function(event){if(activeTrend&&activeTrend.contains(event.target))cancelTrendLeave();var button=event.target.closest('.mini-trend-info');if(button)showTrend(button);});
    document.addEventListener('mouseout',function(event){if(activeTrend&&activeTrend.contains(event.target)&&!activeTrend.contains(event.relatedTarget)&&!activeTrend.contains(document.activeElement)){cancelTrendLeave();trendLeaveTimer=window.setTimeout(hideTrend,250);}});
    document.addEventListener('click',function(event){var button=event.target.closest('.mini-trend-info');if(button)showTrend(button);else if(activeTrend&&!activeTrend.contains(event.target))hideTrend();});
    document.addEventListener('keydown',function(event){
      if(!activeTrend)return;
      if(event.key==='Escape'){hideTrend();event.preventDefault();}
      else if(event.target.matches('.mini-trend-info')&&['ArrowDown','ArrowUp','PageDown','PageUp'].includes(event.key)){
        activeTrend.querySelector('.mini-trend-tooltip').scrollBy(0,(event.key==='ArrowUp'||event.key==='PageUp'?-1:1)*(event.key.startsWith('Page')?180:40));event.preventDefault();
      }
    });
    window.addEventListener('resize',hideTrend);
    window.addEventListener('scroll',function(event){
      if(!activeTrend||activeTrend.contains(event.target))return;
      var button=activeTrend.querySelector('.mini-trend-info'),rect=button.getBoundingClientRect();
      if(rect.bottom<0||rect.top>window.innerHeight)hideTrend();else showTrend(button);
    },true);
    var back=document.getElementById('backToOverview');
    if(back)back.addEventListener('click',function(){
      window._searchCtx=null;
      window._unsupportedSearchCtx=null;
      document.getElementById('resultsSection').style.display='none';
      document.getElementById('landingSection').style.display='block';
      document.getElementById('cardsGrid').innerHTML='';
      document.querySelectorAll('#filterRow .ftab').forEach(function(button){button.classList.toggle('active',button.dataset.f==='all');});
      document.getElementById('homeMain').scrollIntoView({block:'start'});
      document.getElementById('landingTitle').setAttribute('tabindex','-1');
      document.getElementById('landingTitle').focus({preventScroll:true});
    });
    var guideLink=document.getElementById('openHomeGuide');
    if(guideLink)guideLink.addEventListener('click',function(){document.getElementById('homeGuide').open=true;});
    // Keep toggle state understandable without relying on the active color.
    function tripState(){
      ['btnOW','btnRT'].forEach(function(id){var button=document.getElementById(id);button.setAttribute('aria-pressed',String(button.classList.contains('active')));});
    }
    ['btnOW','btnRT'].forEach(function(id){document.getElementById(id).addEventListener('click',tripState);});
    tripState();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();
