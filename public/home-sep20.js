(function(){
  'use strict';
  var stamp='2026-09-20T09:00:00+09:00';
  var octoberLinks={
    KE:'https://www.koreanair.com/contents/footer/customer-support/notice/2026/2610-infuel?pageNum=1',
    OZ:'https://flyasiana.com/C/KR/KO/customer/notice/detail?id=CM202609160002530627',
    LJ:'https://www.jinair.com/company/announce/announceView?anceSeq=28742&searchWord=&searchKey=titlCtn&page=1',
    BX:'https://www.airbusan.com/content/common/customercenter/noticeDetail?id=4407',
    TW:'https://www.trinityairways.com/app/customerCenter/notice/retrieve/12703',
    '7C':'https://www.jejuair.net/ko/customerServiceCenter/noticeDetail.do?billboardNo=0000000762',
    RS:'https://flyairseoul.com/CW/ko/noticeContent.do?seq=11103&pageNo=1'
  };
  window.OCTOBER_2026_NOTICE_LINKS=octoberLinks;
  var september={
    KE:[48000,66000,91500,109500,153000,156000,216000,325500,354000],
    OZ:[52000,76500,99600,124100,147200,171800,194900,242500,290100],
    LJ:[29,41,67,74,89],BX:[34,60,71,82],
    TW:[36200,62200,78200,101300,110000,null,247500],
    '7C':[33,42,50,60,68,79],ZE:[33,42,50,60,68,79],
    RS:[57700,66400,86600,95300,99600],YP:[37,49,null,83,144,182,228]
  };
  var october={
    KE:[49000,65800,98000,116200,162400,168000,226800,322000,362600],
    OZ:[53400,79400,104000,128700,153300,178000,202600,251900,301200],
    LJ:[32,46,74,81,97],BX:[37,66,78,90],
    TW:[37000,65900,82300,105700,113900,null,256600],
    '7C':[37,47,57,68,76,87],RS:[60300,69900,87800,98700,108300]
  };
  var text={
    ko:{title:'유류할증료 조회 · 2026년 10월 공식 공시 반영',desc:'한국 출발 국제선 항공사별 유류할증료를 노선·거리구간별로 비교합니다. 2026년 10월 대한항공·아시아나·진에어·에어부산·트리니티(티웨이)·제주항공·에어서울 공식 공시를 반영하고, 이스타항공·에어프레미아는 10월 공시 발표 전으로 표시합니다. 11월 산정 현황은 전망 페이지에서 추적합니다.',hero:'2026년 10월 공식 공시 7개 항공사와 11월 산정 준비 상태를 노선별로 확인하세요',s1:'✈️ 10월 공시 확인: KE·OZ·LJ·BX·TW·7C·RS',s2:'💸 노선별 9월 기준과 10월 공식 공시 금액 비교',s3:'📌 11월 유류할증료 산정 중 · 구체적 단계는 아직 미정',intro1:'이 서비스는 한국 출발 국제선의 항공사별 유류할증료를 노선·거리구간별로 비교합니다. 2026년 10월 대한항공·아시아나·진에어·에어부산·트리니티(티웨이)·제주항공·에어서울 공식 공시를 반영했습니다.',intro2:'항공사 공식 공지를 최종 기준으로 사용합니다. 이스타항공과 에어프레미아는 10월 공시 발표 전으로 표시하며 이전 달 링크를 10월 공시처럼 연결하지 않습니다.',intro3:'조회 결과에서 9월 기준과 10월 공식 금액, 증감률, 공식 원문을 함께 확인할 수 있습니다. 11월은 산정 중이므로 forecast 페이지에서 방향성만 별도로 추적합니다.',decision:'2026년 10월 공식 공시 반영',line1:'대한항공·아시아나·진에어·에어부산·트리니티(티웨이)·제주항공·에어서울의 10월 국제선 유류할증료 공시를 반영했습니다.',line2:'조회 결과 카드는 9월 금액과 10월 공식 공시 금액을 노선·거리구간별로 비교합니다.',line3:'이스타항공·에어프레미아는 10월 공시 발표 전이며, 11월은 산정 초기 단계라 특정 단계나 금액을 표시하지 않습니다.',conclusion:'현재 메인 조회 결과는 확인된 2026년 10월 공식 공시를 우선합니다.',notice:'10월 공식 공지 ↗',pending:'10월 공시 발표 전',compare:'9월 VS 10월 공식 공시',base:'9월 공식 공시 기준',reflected:'✓ 10월 공식 공시 반영',trend:'2026년 9월 대비 2026년 10월 공식 공시 변동률',trendPrefix:'9월 대비',thPrev:'2026.09',thNow:'2026.10 공식 공시',thPending:'2026.10 공시 발표 전',quick1:'2026년 9월 → 10월 유류할증료 비교',quick1d:'10월 공식 공시 반영 · 노선별 금액 변화 확인',quick2:'2026년 11월 유류할증료 전망',quick2d:'11월 산정기간 진행 중 · 특정 단계는 미정',suffix:' · 2026년 10월 공시 반영 · 11월 산정 대비'},
    en:{title:'Fuel Surcharge Lookup · October 2026 Notices Reflected',desc:'Compare Korea-departure international fuel surcharges by airline, route and distance band. October notices are reflected for KE, OZ, LJ, BX, TW, 7C and RS; Eastar Jet and Air Premia remain unpublished. November calculation is tracked separately.',hero:'Check seven confirmed October notices and November calculation status by route',s1:'October notices confirmed: KE, OZ, LJ, BX, TW, 7C, RS',s2:'Compare September and October official amounts by route',s3:'November calculation in progress · exact level not determined',intro1:'This service compares Korea-departure international fuel surcharges by airline, route and distance band. Seven confirmed October airline notices are reflected.',intro2:'Official airline notices are the final reference. Eastar Jet and Air Premia are marked as not yet published, with no September link presented as an October notice.',intro3:'Results compare September amounts with confirmed October charges and source links. November remains a directional forecast only.',decision:'October 2026 notices reflected',line1:'October international fuel surcharge notices are reflected for Korean Air, Asiana, Jin Air, Air Busan, Trinity (Tway), Jeju Air and Air Seoul.',line2:'Result cards compare September amounts with confirmed October amounts by route and distance band.',line3:'Eastar Jet and Air Premia have not published October notices. No exact November level or amount is shown.',conclusion:'Main results prioritize confirmed October 2026 airline notices.',notice:'October official notice ↗',pending:'October notice not yet published',compare:'September vs October official notices',base:'September official basis',reflected:'✓ October notice reflected',trend:'Change in October official notice versus September',trendPrefix:'vs September',thPrev:'2026.09',thNow:'2026.10 official',thPending:'2026.10 unpublished',quick1:'September to October 2026 comparison',quick1d:'October notices reflected · compare route changes',quick2:'November 2026 surcharge outlook',quick2d:'Calculation in progress · exact level unknown',suffix:' · October notices reflected · November tracking'},
    ja:{title:'燃油サーチャージ検索 · 2026年10月公式公示反映',desc:'韓国発国際線の燃油サーチャージを比較。10月公示はKE・OZ・LJ・BX・TW・7C・RSを反映し、イースター航空とエアプレミアは発表前と表示します。',hero:'10月公式公示7社と11月算定状況を路線別に確認できます',s1:'10月公示確認: KE・OZ・LJ・BX・TW・7C・RS',s2:'路線別に9月と10月公式金額を比較',s3:'11月算定中・具体的な段階は未定',intro1:'韓国発国際線の燃油サーチャージを航空会社・路線・距離区分別に比較し、10月公式公示7社を反映しました。',intro2:'航空会社公式公示を最終基準とします。イースター航空とエアプレミアは10月公示発表前で、9月リンクは表示しません。',intro3:'9月金額、10月公式金額、増減率、原文リンクを確認できます。11月は方向性のみ追跡します。',decision:'2026年10月公式公示反映',line1:'大韓航空・アシアナ・ジンエアー・エアプサン・Trinity（ティーウェイ）・チェジュ航空・エアソウルの10月公示を反映しました。',line2:'検索結果では9月と10月の公式金額を比較します。',line3:'イースター航空とエアプレミアは10月公示発表前。11月の具体的段階は表示しません。',conclusion:'現在の検索結果は確認済み10月公示を優先します。',notice:'10月公式公示 ↗',pending:'10月公示発表前',compare:'9月 vs 10月公式公示',base:'9月公式公示基準',reflected:'✓ 10月公式公示反映',trend:'9月比の10月公式公示変動率',trendPrefix:'9月比',thPrev:'2026.09',thNow:'2026.10公式公示',thPending:'2026.10発表前',quick1:'2026年9月→10月比較',quick1d:'10月公式公示を反映',quick2:'2026年11月見通し',quick2d:'算定中・具体的段階は未定',suffix:' · 10月公示反映 · 11月算定追跡'},
    zh:{title:'燃油附加费查询 · 已反映2026年10月公告',desc:'按航空公司、航线和距离档比较韩国出发国际线燃油附加费。已反映KE、OZ、LJ、BX、TW、7C和RS的10月公告；易斯达和Air Premia尚未发布。',hero:'按航线查看7家航空公司的10月公告和11月计算状态',s1:'10月公告确认: KE、OZ、LJ、BX、TW、7C、RS',s2:'按航线比较9月和10月官方金额',s3:'11月计算中·具体档位尚未确定',intro1:'本服务按航空公司、航线和距离档比较韩国出发国际线燃油附加费，已反映7家航空公司的10月公告。',intro2:'以航空公司官方公告为最终依据。易斯达和Air Premia标为10月公告尚未发布，不连接9月公告。',intro3:'可同时查看9月金额、10月官方金额、变化率和原文链接。11月仅跟踪方向。',decision:'已反映2026年10月官方公告',line1:'已反映大韩、韩亚、真航空、釜山航空、Trinity（德威）、济州航空和首尔航空的10月公告。',line2:'查询卡片按航线和距离档比较9月和10月官方金额。',line3:'易斯达和Air Premia尚未发布10月公告；不显示11月具体档位。',conclusion:'当前查询优先采用已确认的10月官方公告。',notice:'10月官方公告 ↗',pending:'10月公告尚未发布',compare:'9月 vs 10月官方公告',base:'9月官方基准',reflected:'✓ 已反映10月公告',trend:'10月官方金额较9月变化',trendPrefix:'较9月',thPrev:'2026.09',thNow:'2026.10官方公告',thPending:'2026.10尚未发布',quick1:'2026年9月→10月比较',quick1d:'已反映10月官方公告',quick2:'2026年11月展望',quick2d:'计算中·具体档位未知',suffix:' · 已反映10月公告 · 跟踪11月'},
    fr:{title:'Recherche de surtaxe · avis octobre 2026 intégrés',desc:'Comparez les surtaxes internationales au départ de Corée. Les avis octobre de KE, OZ, LJ, BX, TW, 7C et RS sont intégrés; Eastar Jet et Air Premia ne sont pas encore publiés.',hero:'Consultez sept avis octobre confirmés et le suivi de novembre par ligne',s1:'Avis octobre confirmés: KE, OZ, LJ, BX, TW, 7C, RS',s2:'Comparer septembre et octobre par ligne',s3:'Calcul novembre en cours · niveau exact inconnu',intro1:'Ce service compare les surtaxes internationales au départ de Corée et intègre sept avis officiels d’octobre.',intro2:'Les avis officiels des compagnies font foi. Eastar Jet et Air Premia restent non publiés pour octobre, sans lien septembre trompeur.',intro3:'Les résultats comparent septembre et octobre avec les sources. Novembre reste une perspective directionnelle.',decision:'Avis octobre 2026 intégrés',line1:'Les avis octobre de Korean Air, Asiana, Jin Air, Air Busan, Trinity (Tway), Jeju Air et Air Seoul sont intégrés.',line2:'Les cartes comparent les montants de septembre et octobre par ligne.',line3:'Eastar Jet et Air Premia n’ont pas encore publié octobre. Aucun niveau précis pour novembre.',conclusion:'Les résultats privilégient les avis octobre confirmés.',notice:'Avis officiel octobre ↗',pending:'Avis octobre non encore publié',compare:'Septembre vs octobre',base:'Base officielle septembre',reflected:'✓ Avis octobre intégré',trend:'Variation octobre contre septembre',trendPrefix:'vs septembre',thPrev:'2026.09',thNow:'2026.10 officiel',thPending:'2026.10 non publié',quick1:'Comparaison septembre→octobre',quick1d:'Avis octobre intégrés',quick2:'Perspective novembre 2026',quick2d:'Calcul en cours · niveau inconnu',suffix:' · avis octobre intégrés · suivi novembre'},
    de:{title:'Kerosinzuschlag-Suche · Oktober-2026-Hinweise berücksichtigt',desc:'Vergleichen Sie Zuschläge für internationale Flüge ab Korea. Oktober-Hinweise für KE, OZ, LJ, BX, TW, 7C und RS sind berücksichtigt; Eastar Jet und Air Premia sind noch nicht veröffentlicht.',hero:'Sieben bestätigte Oktober-Hinweise und November-Berechnung nach Strecke',s1:'Oktober-Hinweise bestätigt: KE, OZ, LJ, BX, TW, 7C, RS',s2:'September und Oktober nach Strecke vergleichen',s3:'November-Berechnung läuft · genaue Stufe offen',intro1:'Dieser Service vergleicht Zuschläge ab Korea und berücksichtigt sieben offizielle Oktober-Hinweise.',intro2:'Offizielle Airline-Hinweise sind maßgeblich. Eastar Jet und Air Premia sind für Oktober noch nicht veröffentlicht; September-Links werden nicht als Oktober ausgegeben.',intro3:'Ergebnisse vergleichen September und Oktober mit Quellen. November bleibt eine Richtungsprognose.',decision:'Oktober-2026-Hinweise berücksichtigt',line1:'Oktober-Hinweise von Korean Air, Asiana, Jin Air, Air Busan, Trinity (Tway), Jeju Air und Air Seoul sind berücksichtigt.',line2:'Ergebniskarten vergleichen September- und Oktober-Beträge nach Strecke.',line3:'Eastar Jet und Air Premia haben Oktober noch nicht veröffentlicht. Keine genaue November-Stufe.',conclusion:'Die Suche priorisiert bestätigte Oktober-Hinweise.',notice:'Oktober-Hinweis ↗',pending:'Oktober-Mitteilung noch nicht veröffentlicht',compare:'September vs Oktober',base:'Offizielle September-Basis',reflected:'✓ Oktober berücksichtigt',trend:'Oktober-Änderung gegenüber September',trendPrefix:'ggü. September',thPrev:'2026.09',thNow:'2026.10 offiziell',thPending:'2026.10 unveröffentlicht',quick1:'September→Oktober 2026',quick1d:'Oktober-Hinweise berücksichtigt',quick2:'November-2026-Ausblick',quick2d:'Berechnung läuft · Stufe offen',suffix:' · Oktober berücksichtigt · November-Tracking'}
  };
  function installCopy(){
    Object.keys(text).forEach(function(lang){var c=text[lang];window.I18N[lang]=window.I18N[lang]||{};Object.assign(window.I18N[lang],{
      'index.title':c.title,'index.metaDesc':c.desc,'index.heroSub':c.hero,'index.signal1':c.s1,'index.signal2':c.s2,'index.signal3':c.s3,
      'index.meta.suffix':c.suffix,'index.intro1.body':c.intro1,'index.intro2.body':c.intro2,'index.intro3.body':c.intro3,
      'index.decision.title':c.decision,'index.decision.line1':c.line1,'index.decision.line2':c.line2,'index.decision.line3':c.line3,'index.decision.conclusion':c.conclusion,
      'index.status.updatedSuffix':c.suffix,'index.card.septemberNotice':c.notice,'index.card.septemberPending':c.pending,'index.card.pendingSepShort':c.pending,
      'index.card.compareSep':c.compare,'index.card.augustBase':c.base,'index.card.officialReflectedSep':c.reflected,'index.card.trendSepTooltip':c.trend,
      'index.card.trendSepPrefix':c.trendPrefix,'index.card.thAug':c.thPrev,'index.card.thSepOfficial':c.thNow,'index.card.thSepPending':c.thPending,
      'index.quick.compare.name':c.quick1,'index.quick.compare.desc':c.quick1d,'index.quick.jul.name':c.quick2,'index.quick.jul.desc':c.quick2d,
      'aff.myrealtrip.desc':c.intro3
    });});
  }
  function installData(){
    Object.keys(september).forEach(function(code){var d=window._OFFICIAL_AMT&&_OFFICIAL_AMT[code];if(!d||!d.rows)return;d.rows.forEach(function(row,i){row.july=september[code][i];row.august=october[code]?october[code][i]:null;});});
    Object.keys(AUGUST_2026_NOTICE_LINKS).forEach(function(code){delete AUGUST_2026_NOTICE_LINKS[code];});
    Object.keys(octoberLinks).forEach(function(code){AUGUST_2026_NOTICE_LINKS[code]=octoberLinks[code];});
    Object.keys(AUGUST_2026_OFFICIAL_AMOUNTS).forEach(function(code){delete AUGUST_2026_OFFICIAL_AMOUNTS[code];});
    Object.keys(october).forEach(function(code){AUGUST_2026_OFFICIAL_AMOUNTS[code]=october[code];});
    if(Array.isArray(window.KR_AIRLINES)) KR_AIRLINES.forEach(function(al){al.officialNoticeUrl=octoberLinks[al.code]||null;al.hasOfficialNotice=!!octoberLinks[al.code];});
    if(window.FEED&&FEED.meta) FEED.meta.lastUpdated=stamp;
    window._trendBadgeHtml=function(code,miles,dep,arr){
      var d=window._OFFICIAL_AMT&&_OFFICIAL_AMT[code];if(!d||!d.rows)return '';
      var selected=null;
      if(miles!=null){
        var map=window.OFFICIAL_ROUTE_MAP&&OFFICIAL_ROUTE_MAP[code];
        var range=map&&dep&&arr&&(map[dep+'-'+arr]||map[arr+'-'+dep]);
        if(range)selected=d.rows.find(function(row){return row.range===range;});
        if(!selected&&code!=='KE'&&code!=='OZ'&&code!=='LJ')selected=d.rows.find(function(row){if(!row.range)return false;if(/\+$/.test(row.range))return miles>=parseInt(row.range,10);var p=row.range.split('-');return p.length===2&&miles>=parseInt(p[0],10)&&miles<parseInt(p[1],10);});
      }
      var rates=(selected?[selected]:d.rows).filter(function(row){return row.july>0&&row.august!=null;}).map(function(row){return ((row.august-row.july)/row.july)*100;});
      if(!rates.length)return '';
      var rate=selected?rates[0]:(rates.every(function(v){return v>=0;})?Math.min.apply(null,rates):rates.every(function(v){return v<=0;})?Math.max.apply(null,rates):rates.reduce(function(a,b){return a+b;},0)/rates.length);
      if(Math.abs(rate)<0.05)return '';
      var down=rate<0,lang=window.getCurrentLang?window.getCurrentLang():'ko';if(lang==='cn')lang='zh';var c=text[lang]||text.en;
      var label=(down?'▼ ':'▲ ')+(selected?(lang==='ko'?'선택 구간 ':'Selected band '):c.trendPrefix+' ')+(rate>0?'+':'')+rate.toFixed(1)+'%';
      var tip=selected?(lang==='ko'?'선택한 노선 구간의 9월 대비 10월 공식 금액 변동률':'October official change versus September for the selected route band'):c.trend;
      return '<span title="'+tip+'" style="display:inline-flex;align-items:center;font-size:11px;font-weight:700;color:'+(down?'#075985':'#C62828')+';background:'+(down?'#E0F2FE':'#FFF0F0')+';border:1px solid '+(down?'#BAE6FD':'#FFCDD2')+';border-radius:10px;padding:2px 8px;white-space:nowrap;flex-shrink:0;cursor:default">'+label+'</span>';
    };
    var style=document.getElementById('homeSep20TableFix');if(!style){style=document.createElement('style');style.id='homeSep20TableFix';style.textContent='.al-card .route-table{table-layout:fixed}.al-card .route-table th,.al-card .route-table td{padding-left:5px;padding-right:5px;overflow-wrap:anywhere}.al-card .route-table th:nth-child(1),.al-card .route-table td:nth-child(1){width:34%}.al-card .route-table th:nth-child(2),.al-card .route-table td:nth-child(2){width:22%}.al-card .route-table th:nth-child(3),.al-card .route-table td:nth-child(3){width:25%}.al-card .route-table th:nth-child(4),.al-card .route-table td:nth-child(4){width:19%}.al-card .route-amt-current,.al-card .route-amt-next{white-space:nowrap;font-size:11px}.al-card .route-table-wrap{overflow-x:hidden}';document.head.appendChild(style);}
  }
  function updateHead(){
    var c=text.ko;document.title=c.title;
    var desc=document.querySelector('meta[name="description"]');if(desc)desc.content=c.desc;
    var ogTitle=document.querySelector('meta[property="og:title"]');if(ogTitle)ogTitle.content=c.title;
    var ogDesc=document.querySelector('meta[property="og:description"]');if(ogDesc)ogDesc.content=c.desc;
    var old=document.getElementById('homeSep20Schema');if(old)old.remove();
    var schema=document.createElement('script');schema.id='homeSep20Schema';schema.type='application/ld+json';schema.textContent=JSON.stringify({'@context':'https://schema.org','@type':'WebPage',name:c.title,description:c.desc,url:'https://aero-surcharge.com/',dateModified:stamp,inLanguage:'ko-KR',mainEntity:{'@type':'Dataset',name:'2026년 10월 한국 출발 국제선 유류할증료',dateModified:stamp,description:'항공사 공식 공지를 기준으로 한 9월 대비 10월 국제선 유류할증료 비교'}});document.head.appendChild(schema);
  }
  function patchLandingState(){
    var lang=window.getCurrentLang?window.getCurrentLang():'ko';if(lang==='cn')lang='zh';var c=text[lang]||text.en;
    document.querySelectorAll('.mini-notice-btn:not([href])').forEach(function(pending){var card=pending.closest('.mini-card');var status=card&&card.querySelector('.mini-status');if(status)status.innerHTML='<span style="font-size:10px;color:#92400e;font-weight:700">'+c.pending+'</span>';});
    var statusText=document.getElementById('statusText');if(statusText)statusText.textContent=(lang==='ko'?'데이터 갱신: 09. 20. 오전 09:00':'Updated: 2026-09-20 09:00 KST')+c.suffix;
  }
  if(typeof window.renderLanding==='function'){
    var baseRenderLanding=window.renderLanding;
    window.renderLanding=function(){baseRenderLanding();patchLandingState();};
  }
  function refresh(){
    installCopy();installData();updateHead();
    if(window.applyLanguage) window.applyLanguage(window.getCurrentLang?window.getCurrentLang():'ko');
    if(typeof window.renderLanding==='function')window.renderLanding();
    if(typeof window.renderBookingDecision==='function')window.renderBookingDecision();
    if(window._searchCtx&&typeof window.renderCards==='function')window.renderCards('all');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',refresh);else refresh();
})();
