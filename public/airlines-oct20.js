(function(){
  'use strict';
  BASE_MONTH='2026.09';
  NEXT_MONTH='2026.10';

  var confirmed=['KE','OZ','LJ','BX','TW','7C','RS'];
  var all=['KE','OZ','LJ','BX','TW','7C','ZE','RS','YP'];
  var october={
    KE:[49000,65800,98000,116200,162400,168000,226800,322000,362600],
    OZ:[53400,79400,104000,128700,153300,178000,202600,251900,301200],
    LJ:[32,46,74,81,97],BX:[37,66,78,90],
    TW:[37000,65900,82300,105700,113900,null,256600],
    '7C':[37,47,57,68,76,87],RS:[60300,69900,87800,98700,108300]
  };
  var octoberLinks={
    KE:'https://www.koreanair.com/contents/footer/customer-support/notice/2026/2610-infuel?pageNum=1',
    OZ:'https://flyasiana.com/C/KR/KO/customer/notice/detail?id=CM202609160002530627',
    LJ:'https://www.jinair.com/company/announce/announceView?anceSeq=28742&searchWord=&searchKey=titlCtn&page=1',
    BX:'https://www.airbusan.com/content/common/customercenter/noticeDetail?id=4407',
    TW:'https://www.trinityairways.com/app/customerCenter/notice/retrieve/12703',
    '7C':'https://www.jejuair.net/ko/customerServiceCenter/noticeDetail.do?billboardNo=0000000762',
    RS:'https://flyairseoul.com/CW/ko/noticeContent.do?seq=11103&pageNo=1'
  };

  all.forEach(function(code){
    var rows=SEPTEMBER_2026_OFFICIAL_COMPARE_DATA[code]||OFFICIAL_COMPARE_DATA[code]||[];
    OFFICIAL_COMPARE_DATA[code]=rows.map(function(row,index){
      return {band:row.band,routes:row.routes,v4:row.v5,cur:row.cur,v5:october[code]&&october[code][index]!=null?october[code][index]:null};
    });
  });
  JULY_OFFICIAL_CODES=confirmed.slice();
  JUNE_OFFICIAL_CODES=all.slice();
  hasJulyOfficial=function(code){return confirmed.indexOf(code)>=0;};
  hasJuneOfficial=function(code){return all.indexOf(code)>=0;};
  hasSeptember2026Official=function(code){return all.indexOf(code)>=0;};

  var packs={
    ko:{pageSub:'2026.09.20 기준 · 2026년 10월 공식 공시 반영 · 11월 공시 준비',introTitle:'항공사별 2026년 10월 유류할증료 공시 현황',introBody:'2026년 10월 한국 출발 국제선 유류할증료는 대한항공·아시아나항공·진에어·에어부산·트리니티(티웨이)·제주항공·에어서울 공식 공시를 반영했습니다. 이스타항공과 에어프레미아는 10월 공시 발표 전으로 구분하며 링크와 금액을 임의로 만들지 않습니다.',betaDesc:'현재 한국 출발 국제선 유류할증료를 중심으로 10월 공식 금액과 항공사 공지 링크를 제공합니다. 실제 발권 금액은 항공사 공지와 결제 통화를 함께 확인하세요.',betaNote:'11월 유류할증료는 공시 전 전망 구간입니다. 공식 발표 전 단계와 금액을 확정값으로 표시하지 않습니다.',summaryH:'2026년 10월 한국 출발 국제선 유류할증료 공시 반영 현황',summaryP:'10월 공식 공시는 <strong>KE·OZ·LJ·BX·TW·7C·RS</strong>에 반영됐습니다. 10월은 23단계로 확정됐지만 산정기간 평균환율 영향으로 대한항공 일부 구간은 인하되고 다른 구간과 USD 공시 항공사는 인상됐습니다. ZE·YP는 10월 공시 발표 전입니다.',intro:'아래 목록은 2026년 9월과 10월 공식 공시를 비교합니다. KE·OZ·LJ·BX·TW·7C·RS는 10월 공식 금액을 표시하며, ZE·YP는 9월 기준과 10월 공시 발표 전 상태를 분리합니다.',analysisH:'2026년 9월 → 10월 유류할증료 반영 현황',bullets:['<strong>10월 공시 반영</strong>: 대한항공·아시아나·진에어·에어부산·트리니티(티웨이)·제주항공·에어서울의 공식 금액과 링크를 표시합니다.','<strong>혼합 변동</strong>: 10월 단계는 23단계로 올랐지만 평균환율 영향으로 대한항공 일부 원화 구간은 9월보다 인하됐습니다.','<strong>공시 발표 전</strong>: 이스타항공·에어프레미아는 10월 금액과 링크를 표시하지 않습니다.','<strong>11월 준비</strong>: 11월은 공식 공시 전이므로 전망 페이지에서 산정기간 변수만 추적합니다.'],expand:'9월→10월 비교',compare:'9월 vs 10월 유류할증료 비교',prev:'9월 공식 공시',current:'10월 공식 공시',currentBasis:'10월 기준',prevBasis:'9월 기준',pending:'10월 공시 발표 전',officialBadge:'10월 공식 공시 반영',pendingBadge:'10월 공시 발표 전',status:'갱신: 2026.09.20 · 10월 공식 공시 반영 · 11월 공시 준비'},
    en:{pageSub:'As of 2026-09-20 · October 2026 official notices reflected · November preparation',introTitle:'October 2026 fuel surcharge notice status by airline',introBody:'October 2026 Korea-departure international notices are reflected for Korean Air, Asiana, Jin Air, Air Busan, Trinity (Tway), Jeju Air and Air Seoul. Eastar Jet and Air Premia remain pre-publication, with no invented amount or link.',betaDesc:'This page provides October official amounts and airline notice links for Korea-departure international fuel surcharges. Check the airline notice and payment currency before ticketing.',betaNote:'November remains a pre-filing outlook. No stage or amount is shown as confirmed before publication.',summaryH:'October 2026 Korea-departure fuel surcharge notices reflected',summaryP:'October official notices are reflected for <strong>KE, OZ, LJ, BX, TW, 7C and RS</strong>. October is Level 23, but period-average FX means some Korean Air KRW bands declined while other bands and USD filings increased. ZE and YP remain pre-publication.',intro:'The list compares September and October 2026 official notices. KE, OZ, LJ, BX, TW, 7C and RS show October amounts; ZE and YP remain separated as pre-publication.',analysisH:'September to October 2026 fuel surcharge changes',bullets:['<strong>October reflected</strong>: Official amounts and links are shown for KE, OZ, LJ, BX, TW, 7C and RS.','<strong>Mixed changes</strong>: October rose to Level 23, but period-average FX lowered some Korean Air KRW bands versus September.','<strong>Pre-publication</strong>: No October amount or link is shown for Eastar Jet or Air Premia.','<strong>November preparation</strong>: Only calculation-window variables are tracked before official notices.'],expand:'September→October',compare:'September vs October fuel surcharge comparison',prev:'September official notice',current:'October official notice',currentBasis:'October basis',prevBasis:'September basis',pending:'October notice not yet published',officialBadge:'October official notice reflected',pendingBadge:'October notice not yet published',status:'Updated: 2026-09-20 · October notices reflected · November preparation'}
  };
  packs.ja=Object.assign({},packs.en,{pageSub:'2026.09.20基準 · 2026年10月公式公示反映 · 11月準備',introTitle:'航空会社別 2026年10月燃油サーチャージ公示状況',introBody:'10月公式公示はKE・OZ・LJ・BX・TW・7C・RSに反映済みです。ZE・YPは10月公示発表前として、金額とリンクを表示しません。',summaryH:'2026年10月 韓国発国際線燃油サーチャージ公示状況',intro:'2026年9月と10月の公式公示を比較します。ZE・YPは10月公示発表前として分離します。',analysisH:'2026年9月 → 10月 燃油サーチャージ変化',expand:'9月→10月比較',compare:'9月 vs 10月 燃油サーチャージ比較',prev:'9月公式公示',current:'10月公式公示',currentBasis:'10月基準',prevBasis:'9月基準',pending:'10月公示発表前',officialBadge:'10月公式公示反映',pendingBadge:'10月公示発表前',status:'更新: 2026.09.20 · 10月公示反映 · 11月準備'});
  packs.zh=Object.assign({},packs.en,{pageSub:'截至2026.09.20 · 已反映2026年10月官方公告 · 准备11月公告',introTitle:'各航空公司2026年10月燃油附加费公告情况',introBody:'10月官方公告已反映KE、OZ、LJ、BX、TW、7C和RS。ZE与YP仍为10月公告发布前状态，不显示金额和链接。',summaryH:'2026年10月韩国出发国际线燃油附加费公告情况',intro:'比较2026年9月与10月官方公告。ZE与YP在10月公告发布前单独显示。',analysisH:'2026年9月 → 10月燃油附加费变化',expand:'9月→10月比较',compare:'9月 vs 10月燃油附加费比较',prev:'9月官方公告',current:'10月官方公告',currentBasis:'10月基准',prevBasis:'9月基准',pending:'10月公告发布前',officialBadge:'已反映10月官方公告',pendingBadge:'10月公告发布前',status:'更新: 2026.09.20 · 已反映10月公告 · 准备11月公告'});
  packs.fr=Object.assign({},packs.en,{pageSub:'Au 20.09.2026 · avis octobre reflétés · préparation novembre',introTitle:'Statut des avis d’octobre 2026 par compagnie',summaryH:'Avis octobre 2026 reflétés',intro:'Comparaison des avis officiels septembre et octobre 2026.',analysisH:'Évolution septembre → octobre 2026',expand:'Comparer septembre→octobre',compare:'Septembre vs octobre',prev:'Avis officiel septembre',current:'Avis officiel octobre',currentBasis:'Base octobre',prevBasis:'Base septembre',pending:'Avis octobre non publié',officialBadge:'Avis octobre reflété',pendingBadge:'Avis octobre non publié',status:'Mis à jour: 20.09.2026 · avis octobre reflétés · préparation novembre'});
  packs.de=Object.assign({},packs.en,{pageSub:'Stand 20.09.2026 · Oktober-Hinweise berücksichtigt · November-Vorbereitung',introTitle:'Status der Oktober-2026 Hinweise nach Airline',summaryH:'Oktober-2026 Hinweise berücksichtigt',intro:'Vergleich der offiziellen September- und Oktober-2026 Hinweise.',analysisH:'September → Oktober 2026',expand:'September→Oktober',compare:'September vs Oktober',prev:'September-Hinweis',current:'Oktober-Hinweis',currentBasis:'Oktober-Basis',prevBasis:'September-Basis',pending:'Oktober-Hinweis noch nicht veröffentlicht',officialBadge:'Oktober-Hinweis berücksichtigt',pendingBadge:'Oktober noch nicht veröffentlicht',status:'Aktualisiert: 20.09.2026 · Oktober berücksichtigt · November-Vorbereitung'});

  Object.keys(packs).forEach(function(lang){
    var p=packs[lang],d=AIRLINES_I18N[lang]||(AIRLINES_I18N[lang]={});
    Object.assign(d,{pageSub:p.pageSub,introTitle:p.introTitle,introBody:p.introBody,betaDesc:p.betaDesc,betaNote:p.betaNote,seoSummaryH2:p.summaryH,seoSummaryP:p.summaryP,surchargeIntro:p.intro,analysisH3:p.analysisH,analysisBullets:p.bullets,expandHint:p.expand,compareTitle:p.compare,aprNotice:p.prev,mayNotice:p.current,mayBasedLabel:p.currentBasis,aprBasedLabel:p.prevBasis,notPublished:p.pending,noNotice:p.pending,nextOfficialBadge:p.officialBadge,pendingOfficialBadge:p.pendingBadge,missingNoticeBadge:p.pendingBadge,statusText:function(){return p.status;}});
  });

  document.title='항공사별 유류할증료 | 2026년 10월 공시 반영 및 11월 준비';
  var desc=document.querySelector('meta[name="description"]');if(desc)desc.content='2026년 10월 한국 출발 국제선 유류할증료 공식 공시와 9월 대비 변동, 11월 공시 준비 상태를 항공사별로 비교합니다.';
  var patched={};
  function settle(){
    if(!window.KR_AIRLINES||!KR_AIRLINES.length)return;
    KR_AIRLINES.forEach(function(al){
      if(!patched[al.code]){al.officialNoticeUrlMay=al.officialNoticeUrl;patched[al.code]=true;}
      al.officialNoticeUrl=octoberLinks[al.code]||null;
      al.hasOfficialNotice=!!al.officialNoticeUrl;
    });
    if(typeof applyStaticTexts==='function')applyStaticTexts();
    if(typeof renderTable==='function')renderTable();
  }
  var count=0,timer=setInterval(function(){count++;settle();if(count>=16)clearInterval(timer);},250);
})();
