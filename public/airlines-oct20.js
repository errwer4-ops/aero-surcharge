(function(){
  'use strict';
  BASE_MONTH='2026.09';
  NEXT_MONTH='2026.10';

  var confirmed=['KE','OZ','LJ','BX','TW','7C','ZE','RS','YP'];
  var all=['KE','OZ','LJ','BX','TW','7C','ZE','RS','YP'];
  var october={
    KE:[49000,65800,98000,116200,162400,168000,226800,322000,362600],
    OZ:[53400,79400,104000,128700,153300,178000,202600,251900,301200],
    LJ:[32,46,74,81,97],BX:[37,66,78,90],
    TW:[37000,65900,82300,105700,113900,null,256600],
    '7C':[37,47,57,68,76,87],ZE:[37,47,57,68,76,87],RS:[60300,69900,87800,98700,108300],YP:[41,54,null,91,159,200,251]
  };
  var octoberLinks={
    KE:'https://www.koreanair.com/contents/footer/customer-support/notice/2026/2610-infuel?pageNum=1',
    OZ:'https://flyasiana.com/C/KR/KO/customer/notice/detail?id=CM202609160002530627',
    LJ:'https://www.jinair.com/company/announce/announceView?anceSeq=28742&searchWord=&searchKey=titlCtn&page=1',
    BX:'https://www.airbusan.com/content/common/customercenter/noticeDetail?id=4407',
    TW:'https://www.trinityairways.com/app/customerCenter/notice/retrieve/12703',
    '7C':'https://www.jejuair.net/ko/customerServiceCenter/noticeDetail.do?billboardNo=0000000762',
    RS:'https://flyairseoul.com/CW/ko/noticeContent.do?seq=11103&pageNo=1',
    ZE:'https://www.eastarjet.com/newstar/PGWCA00002?cId=11&iId=0&bId=664&lang=KR',
    YP:'https://www.airpremia.com/a/ko/customer/notice/791'
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
    ko:{pageSub:'2026.10.01 기준 · 2026년 10월 공식 공시 반영 · 11월 공시 준비',introTitle:'항공사별 2026년 10월 유류할증료 공시 현황',introBody:'2026년 10월 한국 출발 국제선 유류할증료는 대한항공·아시아나항공·진에어·에어부산·트리니티(티웨이)·제주항공·에어서울 공식 공시를 반영했습니다. 이스타항공과 에어프레미아는 10월 공시 발표 전으로 구분하며 링크와 금액을 임의로 만들지 않습니다.',betaDesc:'현재 한국 출발 국제선 유류할증료를 중심으로 10월 공식 금액과 항공사 공지 링크를 제공합니다. 실제 발권 금액은 항공사 공지와 결제 통화를 함께 확인하세요.',betaNote:'11월 유류할증료는 공시 전 전망 구간입니다. 공식 발표 전 단계와 금액을 확정값으로 표시하지 않습니다.',summaryH:'2026년 10월 한국 출발 국제선 유류할증료 공시 반영 현황',summaryP:'10월 공식 공시는 <strong>KE·OZ·LJ·BX·TW·7C·RS</strong>에 반영됐습니다. 10월은 23단계로 확정됐지만 산정기간 평균환율 영향으로 대한항공 일부 구간은 인하되고 다른 구간과 USD 공시 항공사는 인상됐습니다. ZE·YP는 10월 공시 발표 전입니다.',intro:'아래 목록은 2026년 9월과 10월 공식 공시를 비교합니다. KE·OZ·LJ·BX·TW·7C·RS는 10월 공식 금액을 표시하며, ZE·YP는 9월 기준과 10월 공시 발표 전 상태를 분리합니다.',analysisH:'2026년 9월 → 10월 유류할증료 반영 현황',bullets:['<strong>10월 공시 반영</strong>: 대한항공·아시아나·진에어·에어부산·트리니티(티웨이)·제주항공·에어서울의 공식 금액과 링크를 표시합니다.','<strong>혼합 변동</strong>: 10월 단계는 23단계로 올랐지만 평균환율 영향으로 대한항공 일부 원화 구간은 9월보다 인하됐습니다.','<strong>공시 발표 전</strong>: 이스타항공·에어프레미아는 10월 금액과 링크를 표시하지 않습니다.','<strong>11월 준비</strong>: 11월은 공식 공시 전이므로 전망 페이지에서 산정기간 변수만 추적합니다.'],expand:'9월→10월 비교',compare:'9월 vs 10월 유류할증료 비교',prev:'9월 공식 공시',current:'10월 공식 공시',currentBasis:'10월 기준',prevBasis:'9월 기준',pending:'10월 공시 발표 전',officialBadge:'10월 공식 공시 반영',pendingBadge:'10월 공시 발표 전',status:'갱신: 2026.10.01 · 10월 공식 공시 반영 · 11월 공시 준비'},
    en:{pageSub:'As of 2026-10-01 · October 2026 official notices reflected · November preparation',introTitle:'October 2026 fuel surcharge notice status by airline',introBody:'October 2026 Korea-departure international notices are reflected for Korean Air, Asiana, Jin Air, Air Busan, Trinity (Tway), Jeju Air and Air Seoul. Eastar Jet and Air Premia remain pre-publication, with no invented amount or link.',betaDesc:'This page provides October official amounts and airline notice links for Korea-departure international fuel surcharges. Check the airline notice and payment currency before ticketing.',betaNote:'November remains a pre-filing outlook. No stage or amount is shown as confirmed before publication.',summaryH:'October 2026 Korea-departure fuel surcharge notices reflected',summaryP:'October official notices are reflected for <strong>KE, OZ, LJ, BX, TW, 7C and RS</strong>. October is Level 23, but period-average FX means some Korean Air KRW bands declined while other bands and USD filings increased. ZE and YP remain pre-publication.',intro:'The list compares September and October 2026 official notices. KE, OZ, LJ, BX, TW, 7C and RS show October amounts; ZE and YP remain separated as pre-publication.',analysisH:'September to October 2026 fuel surcharge changes',bullets:['<strong>October reflected</strong>: Official amounts and links are shown for KE, OZ, LJ, BX, TW, 7C and RS.','<strong>Mixed changes</strong>: October rose to Level 23, but period-average FX lowered some Korean Air KRW bands versus September.','<strong>Pre-publication</strong>: No October amount or link is shown for Eastar Jet or Air Premia.','<strong>November preparation</strong>: Only calculation-window variables are tracked before official notices.'],expand:'September→October',compare:'September vs October fuel surcharge comparison',prev:'September official notice',current:'October official notice',currentBasis:'October basis',prevBasis:'September basis',pending:'October notice not yet published',officialBadge:'October official notice reflected',pendingBadge:'October notice not yet published',status:'Updated: 2026-10-01 · October notices reflected · November preparation'}
  };
  packs.ja=Object.assign({},packs.en,{pageSub:'2026.10.01基準 · 2026年10月公式公示反映 · 11月準備',introTitle:'航空会社別 2026年10月燃油サーチャージ公示状況',introBody:'10月公式公示はKE・OZ・LJ・BX・TW・7C・RSに反映済みです。ZE・YPは10月公示発表前として、金額とリンクを表示しません。',summaryH:'2026年10月 韓国発国際線燃油サーチャージ公示状況',intro:'2026年9月と10月の公式公示を比較します。ZE・YPは10月公示発表前として分離します。',analysisH:'2026年9月 → 10月 燃油サーチャージ変化',expand:'9月→10月比較',compare:'9月 vs 10月 燃油サーチャージ比較',prev:'9月公式公示',current:'10月公式公示',currentBasis:'10月基準',prevBasis:'9月基準',pending:'10月公示発表前',officialBadge:'10月公式公示反映',pendingBadge:'10月公示発表前',status:'更新: 2026.10.01 · 10月公示反映 · 11月準備'});
  packs.zh=Object.assign({},packs.en,{pageSub:'截至2026.10.01 · 已反映2026年10月官方公告 · 准备11月公告',introTitle:'各航空公司2026年10月燃油附加费公告情况',introBody:'10月官方公告已反映KE、OZ、LJ、BX、TW、7C和RS。ZE与YP仍为10月公告发布前状态，不显示金额和链接。',summaryH:'2026年10月韩国出发国际线燃油附加费公告情况',intro:'比较2026年9月与10月官方公告。ZE与YP在10月公告发布前单独显示。',analysisH:'2026年9月 → 10月燃油附加费变化',expand:'9月→10月比较',compare:'9月 vs 10月燃油附加费比较',prev:'9月官方公告',current:'10月官方公告',currentBasis:'10月基准',prevBasis:'9月基准',pending:'10月公告发布前',officialBadge:'已反映10月官方公告',pendingBadge:'10月公告发布前',status:'更新: 2026.10.01 · 已反映10月公告 · 准备11月公告'});
  packs.fr=Object.assign({},packs.en,{pageSub:'Au 01.10.2026 · avis octobre reflétés · préparation novembre',introTitle:'Statut des avis d’octobre 2026 par compagnie',summaryH:'Avis octobre 2026 reflétés',intro:'Comparaison des avis officiels septembre et octobre 2026.',analysisH:'Évolution septembre → octobre 2026',expand:'Comparer septembre→octobre',compare:'Septembre vs octobre',prev:'Avis officiel septembre',current:'Avis officiel octobre',currentBasis:'Base octobre',prevBasis:'Base septembre',pending:'Avis octobre non publié',officialBadge:'Avis octobre reflété',pendingBadge:'Avis octobre non publié',status:'Mis à jour: 01.10.2026 · avis octobre reflétés · préparation novembre'});
  packs.de=Object.assign({},packs.en,{pageSub:'Stand 01.10.2026 · Oktober-Hinweise berücksichtigt · November-Vorbereitung',introTitle:'Status der Oktober-2026 Hinweise nach Airline',summaryH:'Oktober-2026 Hinweise berücksichtigt',intro:'Vergleich der offiziellen September- und Oktober-2026 Hinweise.',analysisH:'September → Oktober 2026',expand:'September→Oktober',compare:'September vs Oktober',prev:'September-Hinweis',current:'Oktober-Hinweis',currentBasis:'Oktober-Basis',prevBasis:'September-Basis',pending:'Oktober-Hinweis noch nicht veröffentlicht',officialBadge:'Oktober-Hinweis berücksichtigt',pendingBadge:'Oktober noch nicht veröffentlicht',status:'Aktualisiert: 01.10.2026 · Oktober berücksichtigt · November-Vorbereitung'});


  var finalCopy={
    ko:{introBody:'9개 항공사의 2026년 10월 한국 출발 국제선 공식 금액과 공지 링크를 반영했습니다. 9월과 10월 발권분을 공시 통화 및 거리구간별로 비교합니다.',summaryP:'10월은 23단계로 확정돼 10월 1일부터 적용됩니다. KE·OZ·LJ·BX·TW·7C·ZE·RS·YP 모두 공시를 반영했습니다. 대한항공 500~999mi는 66,000원→65,800원, 5,000~6,499mi는 325,500원→322,000원으로 인하됐습니다.',intro:'아래 목록은 9개 항공사의 9월·10월 공식 공시 금액과 구간별 변화를 비교합니다.',betaNote:'11월은 9월 16일~10월 15일 산정 중입니다. 단계와 금액은 공식 발표 후 확정됩니다.',bullets:['10월 공시: 9개 항공사의 금액과 공식 원문을 반영했습니다.','대한항공 일부 구간은 인하됐고 다수 다른 구간은 인상됐습니다.','USD 공시는 공시 통화로 비교하며 원화 결제액은 항공사 적용 환율에 따라 달라집니다.','11월은 산정 중입니다. 전망 페이지에서 진행 상황을 확인하세요.']},
    en:{introBody:'Official October 2026 amounts and notice links for all nine airlines are included. Compare September and October ticketing by currency and distance band.',summaryP:'October Level 23 applies from Oct 1. All nine airlines are included. Korean Air 500-999mi fell from KRW 66,000 to 65,800, and 5,000-6,499mi from KRW 325,500 to 322,000.',intro:'Compare September and October official amounts and band-specific changes for all nine airlines.',betaNote:'November calculation runs from Sept 16 to Oct 15. The level and amounts await official publication.',bullets:['All nine October notices and source links are included.','Some Korean Air bands decreased while many other bands increased.','USD filings are compared in their official currency; KRW payment depends on airline FX.','November calculation is underway; follow the forecast page.']},
    ja:{introBody:'全9社の2026年10月公式金額と公示リンクを反映しました。発券月の9月と10月を通貨・距離区分別に比較します。',summaryP:'10月1日から23段階を適用します。全9社の公示を反映。大韓航空500〜999miは66,000→65,800ウォン、5,000〜6,499miは325,500→322,000ウォンに下落しました。',intro:'全9社の9月・10月公式金額と区分別変化を比較します。',betaDesc:'韓国発国際線の10月公式金額と公示リンクを表示します。発券前に公式公示をご確認ください。',betaNote:'11月は9月16日〜10月15日の算定中で、段階・金額は公式発表待ちです。',bullets:['全9社の10月金額と原文を反映しました。','大韓航空の一部区分は下落し、多くの他区分は上昇しました。','USD公示は公式通貨で比較します。ウォン決済額は適用為替によります。','11月は算定中です。見通しページで確認できます。']},
    zh:{introBody:'已反映全部9家航空公司2026年10月官方金额和公告链接，按出票月份、币种及距离档比较9月与10月。',summaryP:'10月1日起适用第23档，9家公告均已反映。大韩航空500至999mi从66,000降至65,800韩元，5,000至6,499mi从325,500降至322,000韩元。',intro:'比较9家航空公司9月和10月官方金额及各距离档变化。',betaDesc:'显示韩国出发国际线10月官方金额和公告链接。出票前请核对官方公告。',betaNote:'11月计算期为9月16日至10月15日，档位和金额等待官方发布。',bullets:['9家航空公司的10月金额和原文均已反映。','大韩航空部分距离档下降，多数其他档位上涨。','USD公告按原币种比较，韩元付款金额取决于航司汇率。','11月计算中，可在展望页面查看。']},
    fr:{introBody:'Les montants officiels d’octobre et les liens des neuf compagnies sont inclus. Comparez septembre et octobre par devise et tranche.',summaryP:'Le niveau 23 s’applique dès le 1er octobre. Les neuf compagnies sont incluses. Korean Air 500-999mi baisse de 66 000 à 65 800 KRW et 5 000-6 499mi de 325 500 à 322 000 KRW.',intro:'Comparez les montants officiels septembre-octobre des neuf compagnies.',betaDesc:'Montants officiels internationaux au départ de Corée et liens des avis d’octobre. Vérifiez avant émission.',betaNote:'Calcul novembre du 16 septembre au 15 octobre; niveau et montants attendent les avis officiels.',bullets:['Les neuf avis d’octobre sont inclus.','Certaines tranches Korean Air baissent, beaucoup d’autres augmentent.','Les avis USD sont comparés en devise officielle; le paiement KRW dépend du change de la compagnie.','Le calcul de novembre est en cours. Consultez les prévisions.']},
    de:{introBody:'Offizielle Oktober-Beträge und Links aller neun Airlines sind enthalten. Vergleichen Sie September und Oktober nach Währung und Entfernung.',summaryP:'Stufe 23 gilt ab 1. Oktober. Alle neun Airlines sind enthalten. Korean Air 500-999mi sinkt von 66.000 auf 65.800 KRW und 5.000-6.499mi von 325.500 auf 322.000 KRW.',intro:'Vergleichen Sie offizielle September- und Oktober-Beträge aller neun Airlines.',betaDesc:'Offizielle internationale Oktober-Beträge ab Korea und Mitteilungslinks. Vor Ausstellung prüfen.',betaNote:'November wird vom 16. September bis 15. Oktober berechnet; Stufe und Beträge warten auf offizielle Veröffentlichung.',bullets:['Alle neun Oktober-Mitteilungen sind enthalten.','Einige Korean-Air-Bänder sinken, viele andere steigen.','USD-Mitteilungen werden in Originalwährung verglichen; KRW-Zahlung hängt vom Airline-Wechselkurs ab.','Die November-Berechnung läuft. Siehe Ausblick.']}
  };
  Object.keys(finalCopy).forEach(function(lang){Object.assign(packs[lang],finalCopy[lang]);});

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
