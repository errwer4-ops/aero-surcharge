(function(){
  'use strict';
  var september={
    KE:{currency:'KRW',min:48000,max:354000},OZ:{currency:'KRW',min:52000,max:290100},
    LJ:{currency:'USD',min:29,max:89},BX:{currency:'USD',min:34,max:82},
    TW:{currency:'KRW',min:36200,max:247500},'7C':{currency:'USD',min:33,max:79},
    ZE:{currency:'USD',min:33,max:79},RS:{currency:'KRW',min:57700,max:99600},
    YP:{currency:'USD',min:37,max:228}
  };
  var october={
    KE:{currency:'KRW',min:49000,max:362600},OZ:{currency:'KRW',min:53400,max:301200},
    LJ:{currency:'USD',min:32,max:97},BX:{currency:'USD',min:37,max:90},
    TW:{currency:'KRW',min:37000,max:256600},'7C':{currency:'USD',min:37,max:87},
    RS:{currency:'KRW',min:60300,max:108300}
  };
  var links={
    KE:'https://www.koreanair.com/contents/footer/customer-support/notice/2026/2610-infuel?pageNum=1',
    OZ:'https://flyasiana.com/C/KR/KO/customer/notice/detail?id=CM202609160002530627',
    LJ:'https://www.jinair.com/company/announce/announceView?anceSeq=28742&searchWord=&searchKey=titlCtn&page=1',
    BX:'https://www.airbusan.com/content/common/customercenter/noticeDetail?id=4407',
    TW:'https://www.trinityairways.com/app/customerCenter/notice/retrieve/12703',
    '7C':'https://www.jejuair.net/ko/customerServiceCenter/noticeDetail.do?billboardNo=0000000762',
    RS:'https://flyairseoul.com/CW/ko/noticeContent.do?seq=11103&pageNo=1'
  };
  function range(item){
    if(!item)return null;
    return item.currency==='USD'
      ?{minKRW:item.min*USD_TO_KRW,maxKRW:item.max*USD_TO_KRW,minOrig:item.min,maxOrig:item.max}
      :{minKRW:item.min,maxKRW:item.max};
  }
  KOREA_AIRLINES.forEach(function(al){
    var sep=september[al.code],oct=october[al.code];
    if(sep){al.currency=sep.currency;al.may=range(sep);}
    al.augustOfficial=!!oct;
    al.aug=range(oct);
    al.augustUrl=links[al.code]||null;
  });

  var packs={
    ko:{title:'한국 출발 국제선 유류할증료 조회',sub:'2026년 9월 공식 공시 기준 · 2026년 10월 공식 공시 반영 · 11월 공시 준비',h1:'한국 출발 국제선 유류할증료 9월·10월 공식 공시 비교',basisTitle:'현재 적용 기준: 2026년 10월 공식 유류할증료',basisDesc:'2026년 10월 한국 출발 국제선 유류할증료는 대한항공·아시아나항공·진에어·에어부산·트리니티(티웨이)·제주항공·에어서울 공시를 반영했습니다. 이스타항공·에어프레미아는 10월 공시 발표 전으로 표시합니다.',topTitle:'✈️ 10월 유류할증료를 포함한 항공권 총액 확인',topDesc:'유류할증료는 발권일 기준으로 적용됩니다. 9월과 10월 공식 공시 금액을 비교한 뒤 실제 항공권 총액을 확인하세요.',bottomDesc:'10월 공시 금액과 항공권 운임, 세금, 숙소 비용을 함께 비교해 전체 여행비를 확인하세요.',section:'항공사별 2026년 9월 → 10월 국제선 유류할증료 공시 비교',note:'10월 공식 공시는 KE·OZ·LJ·BX·TW·7C·RS에 반영됐습니다. ZE·YP는 10월 공시 발표 전이며 임의 금액이나 링크를 표시하지 않습니다.',prev:'2026년 9월 공식 공시',current:'2026년 10월 공식 공시',pending:'10월 공시 발표 전',source:'공식 공지 ↗',sourcePending:'10월 공시 발표 전',foot:'※ 9월과 10월 금액은 항공사별 공식 통화와 거리 구간 체계를 유지한 최소~최대 요약입니다. ZE·YP의 10월 금액은 공식 발표 전이므로 표시하지 않습니다.',linksTitle:'🔗 2026년 10월 유류할증료 공식 공지 및 발표 전 항공사',related:'📌 2026년 10월 공식 공시',forecast:'🔮 2026년 11월 전망'},
    en:{title:'Korea Departure Fuel Surcharge',sub:'September 2026 baseline · October 2026 official notices reflected · November preparation',h1:'Korea departure fuel surcharge: September and October 2026 official comparison',basisTitle:'Current basis: October 2026 official fuel surcharges',basisDesc:'October 2026 notices are reflected for Korean Air, Asiana, Jin Air, Air Busan, Trinity (Tway), Jeju Air and Air Seoul. Eastar Jet and Air Premia remain marked as pre-publication.',topTitle:'✈️ Check total airfare with October surcharges',topDesc:'Fuel surcharges apply by ticketing date. Compare September and October official amounts with the actual total airfare.',bottomDesc:'Compare October surcharge amounts, airfare, taxes and accommodation to understand the total trip cost.',section:'September to October 2026 international fuel surcharge comparison by airline',note:'October official notices are reflected for KE, OZ, LJ, BX, TW, 7C and RS. ZE and YP remain pre-publication, with no invented amount or link.',prev:'September 2026 official notice',current:'October 2026 official notice',pending:'October notice not yet published',source:'Official notice ↗',sourcePending:'October notice not yet published',foot:'September and October values are min-max summaries preserving each airline’s official currency and distance-band structure. No October value is shown for ZE or YP before publication.',linksTitle:'October 2026 official notices and pre-publication airlines',related:'📌 October 2026 official notices',forecast:'🔮 November 2026 outlook'}
  };
  packs.ja=Object.assign({},packs.en,{title:'韓国発国際線 燃油サーチャージ',sub:'2026年9月基準 · 10月公式公示反映 · 11月準備',h1:'韓国発国際線 2026年9月・10月公式公示比較',basisTitle:'現在の適用基準：2026年10月公式燃油サーチャージ',basisDesc:'10月公式公示はKE・OZ・LJ・BX・TW・7C・RSに反映済みです。ZE・YPは10月公示発表前として表示します。',section:'航空会社別 2026年9月 → 10月 国際線燃油サーチャージ比較',note:'10月公示はKE・OZ・LJ・BX・TW・7C・RSに反映済みです。ZE・YPは公示発表前で、金額とリンクを表示しません。',prev:'2026年9月公式公示',current:'2026年10月公式公示',pending:'10月公示発表前',source:'公式公示 ↗',sourcePending:'10月公示発表前',linksTitle:'2026年10月公式公示と発表前の航空会社',related:'📌 2026年10月公式公示',forecast:'🔮 2026年11月見通し'});
  packs.zh=Object.assign({},packs.en,{title:'韩国出发国际线燃油附加费',sub:'2026年9月基准 · 已反映10月官方公告 · 11月准备',h1:'韩国出发国际线2026年9月·10月官方公告比较',basisTitle:'当前适用基准：2026年10月官方燃油附加费',basisDesc:'10月官方公告已反映KE、OZ、LJ、BX、TW、7C和RS。ZE与YP显示为10月公告发布前。',section:'各航空公司2026年9月 → 10月国际线燃油附加费比较',note:'10月公告已反映KE、OZ、LJ、BX、TW、7C和RS。ZE与YP在发布前不显示金额和链接。',prev:'2026年9月官方公告',current:'2026年10月官方公告',pending:'10月公告发布前',source:'官方公告 ↗',sourcePending:'10月公告发布前',linksTitle:'2026年10月官方公告及发布前航空公司',related:'📌 2026年10月官方公告',forecast:'🔮 2026年11月展望'});
  packs.fr=Object.assign({},packs.en,{title:'Surcharge carburant au départ de Corée',sub:'Base septembre 2026 · avis octobre reflétés · préparation novembre',h1:'Comparaison des avis septembre et octobre 2026',basisTitle:'Base actuelle : surtaxes officielles octobre 2026',section:'Comparaison septembre → octobre 2026 par compagnie',prev:'Avis officiel septembre 2026',current:'Avis officiel octobre 2026',pending:'Avis octobre non publié',source:'Avis officiel ↗',sourcePending:'Avis octobre non publié',related:'📌 Avis officiels octobre 2026',forecast:'🔮 Perspectives novembre 2026'});
  packs.de=Object.assign({},packs.en,{title:'Kerosinzuschlag ab Korea',sub:'September-2026 Basis · Oktober-Hinweise berücksichtigt · November-Vorbereitung',h1:'Vergleich September und Oktober 2026',basisTitle:'Aktuelle Basis: offizielle Oktober-2026 Zuschläge',section:'September → Oktober 2026 nach Airline',prev:'September-2026 Hinweis',current:'Oktober-2026 Hinweis',pending:'Oktober-Hinweis nicht veröffentlicht',source:'Offizieller Hinweis ↗',sourcePending:'Oktober-Hinweis nicht veröffentlicht',related:'📌 Oktober-2026 Hinweise',forecast:'🔮 November-2026 Ausblick'});

  Object.keys(packs).forEach(function(lang){
    var p=packs[lang],d=window.I18N[lang]||(window.I18N[lang]={});
    Object.assign(d,{
      'korea.pageTitle':p.title,'korea.pageSub':p.sub,'korea.h1':p.h1,
      'korea.currentBasis.title':p.basisTitle,'korea.currentBasis.desc':p.basisDesc,
      'korea.aff.top.title':p.topTitle,'korea.aff.top.desc':p.topDesc,'korea.aff.bottom.desc':p.bottomDesc,
      'korea.sectionTitle':p.section,'korea.tableNote':p.note,'korea.th.may':p.prev,'korea.th.aug':p.current,
      'korea.augPending':p.pending,'korea.source.label':p.source,'korea.source.pending':p.sourcePending,
      'korea.footnote':p.foot,'korea.officialLinkTitle':p.linksTitle,
      'korea.related.may':p.related,'korea.related.jun':p.forecast
    });
  });

  function updateMeta(){
    var lang=(window.SHARED_STATE&&SHARED_STATE.lang)||'ko',p=packs[lang]||packs.en;
    document.title=p.title+' | '+p.sub;
    var desc=document.querySelector('meta[name="description"]');if(desc)desc.content=p.basisDesc;
    var ogt=document.querySelector('meta[property="og:title"]');if(ogt)ogt.content=document.title;
    var ogd=document.querySelector('meta[property="og:description"]');if(ogd)ogd.content=p.basisDesc;
  }
  var previousRender=window.renderKoreaTable;
  window.renderKoreaTable=function(){var result=previousRender.apply(this,arguments);updateMeta();return result;};
  if(typeof window.applyLanguage==='function')window.applyLanguage();
  renderKoreaTable();renderAffiliateBoxes();renderCurrentBasis();updateMeta();
})();
