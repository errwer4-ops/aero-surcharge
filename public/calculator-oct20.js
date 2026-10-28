(function(){
  'use strict';

  var september={
    KE:[48000,66000,91500,109500,153000,156000,216000,325500,354000],
    OZ:[52000,76500,99600,124100,147200,171800,194900,242500,290100],
    LJ:[29,41,67,74,89],BX:[34,60,71,82,82,82],
    TW:[36200,62200,78200,101300,110000,null,247500],
    '7C':[33,42,50,60,68,79],ZE:[33,42,50,60,68,79],
    RS:[57700,66400,86600,95300,99600],YP:[37,49,null,83,144,182,228]
  };
  var october={
    KE:[49000,65800,98000,116200,162400,168000,226800,322000,362600],
    OZ:[53400,79400,104000,128700,153300,178000,202600,251900,301200],
    LJ:[32,46,74,81,97],BX:[37,66,78,90,90,90],
    TW:[37000,65900,82300,105700,113900,null,256600],
    '7C':[37,47,57,68,76,87],ZE:[37,47,57,68,76,87],RS:[60300,69900,87800,98700,108300],YP:[41,54,null,91,159,200,251]
  };

  var november={};(window.NOVEMBER_2026_OFFICIAL_NOTICES||[]).forEach(function(n){november[n.code]=n.displayBandIndices?n.displayBandIndices.map(function(i){return i===null?null:n.november[i];}):n.november.slice();});
  function applyOfficialAmounts(){Object.keys(october).forEach(function(code){
    var data=window.SAVING_COMPARE_DATA&&SAVING_COMPARE_DATA[code];
    if(!data||!Array.isArray(data.rows))return;
    data.rows.forEach(function(row,index){
      if(code==='ZE')row.label=String(index+1);
      row.may=october[code][index]==null?null:october[code][index];
      row.june=november[code]&&november[code][index]!=null?november[code][index]:null;
      row.julyOfficial=row.may;
      row.augustOfficial=row.june;
    });
    if(window.JULY_2026_OFFICIAL_AMOUNTS)JULY_2026_OFFICIAL_AMOUNTS[code]=october[code].slice();
    if(window.AUGUST_2026_OFFICIAL_AMOUNTS)AUGUST_2026_OFFICIAL_AMOUNTS[code]=(november[code]||data.rows.map(function(){return null;})).slice();
  });}
  applyOfficialAmounts();
  window.applyCurrentCalculatorNotices=applyOfficialAmounts;

  var ui={
    ko:{saveHeadline:'11월 공식 공시 기준 항공사별 차이 최대 {amount}',thMay:'10월 공식 공시',thJune:'11월 공식 공시',thSaving:'11월 최저 대비',julyPending:'11월 공시 발표 전',affiliateSave:'현재 2026년 11월 공식 공시 기준 항공사별 유류할증료 차이는 최대 {amount}입니다. 실제 운임, 세금, 좌석 상황까지 함께 비교해보세요.',affiliateNeutral:'현재 11월 공식 공시 기준 항공사별 차이가 작습니다. 실제 항공권 총액과 일정 조건을 함께 비교해보세요.'},
    en:{saveHeadline:'Up to {amount} airline difference based on November official notices',thMay:'October official notice',thJune:'November official notice',thSaving:'vs November lowest',julyPending:'November notice not yet published',affiliateSave:'Based on November 2026 official notices, airline surcharge differences can be up to {amount}. Compare the actual fare, taxes and seat availability too.',affiliateNeutral:'Airline differences are small based on November official notices. Compare the total fare and schedule conditions too.'},
    ja:{saveHeadline:'11月公式公示基準で航空会社別差額は最大{amount}',thMay:'10月公式公示',thJune:'11月公式公示',thSaving:'11月最安比',julyPending:'11月公示発表前'},
    zh:{saveHeadline:'按11月官方公告，航司差异最高{amount}',thMay:'10月官方公告',thJune:'11月官方公告',thSaving:'较11月最低',julyPending:'11月公告尚未发布'},
    fr:{saveHeadline:'Écart maximal de {amount} selon les avis officiels d’novembre',thMay:'Avis officiel octobre',thJune:'Avis officiel novembre',thSaving:'vs minimum novembre',julyPending:'Avis novembre non publié'},
    de:{saveHeadline:'Bis zu {amount} Unterschied laut November-Mitteilungen',thMay:'October-Hinweis',thJune:'November-Hinweis',thSaving:'ggü. November-Minimum',julyPending:'November-Hinweis noch nicht veröffentlicht'}
  };
  Object.keys(ui).forEach(function(lang){
    if(window.SAVING_UI_TEXT&&SAVING_UI_TEXT[lang])Object.assign(SAVING_UI_TEXT[lang],ui[lang]);
  });

  var base={
    ko:{title:'유류할증료 계산기 | 2026년 10월·11월 공식 공시 노선별 비교',desc:'한국 출발 국제선 항공권의 2026년 10월과 11월 공식 유류할증료를 노선·항공사·왕복·인원별로 비교하고 11월 산정 중 상태를 확인합니다.',sub:'2026년 10월 공식 공시 기준 · 2026년 11월 공식 공시 반영 · 11월 산정 중',h1:'유류할증료 계산기: 10월과 11월 공식 공시 금액 비교',notice:'<strong>안내:</strong> 2026년 10월과 11월 공식 공시를 비교합니다. 11월 공시는 KE·OZ·LJ·BX·TW·7C·ZE·RS·YP를 반영하며, 9개 항공사의 11월 공시 금액을 모두 반영했습니다.',alert:'유류할증료는 <strong>탑승일이 아닌 발권일 기준</strong>으로 적용됩니다. 최종 결제 전 항공사 공식 공지와 예약 화면을 확인하세요.',intro:'2026년 10월과 11월 공식 공시 금액을 노선, 항공사, 편도·왕복, 인원 수에 맞춰 비교하는 계산기입니다.',answerTitle:'현재 계산 기준은 10월과 11월 공식 공시 금액입니다',answerBody:'선택한 노선에서 2026년 10월 대비 11월 공식 공시 기준 항공사별 유류할증료 차이를 보여줍니다.',readyTitle:'10월 공시 기준 · 11월 공식 공시 반영',readyBadge:'10월 기준 · 11월 반영',readyBody:'11월 공시가 확인된 KE·OZ·LJ·BX·TW·7C·ZE·RS·YP의 공식 금액을 표시합니다. 대한항공 일부 구간은 10월보다 인하됐으며, 공시 표에 별도 금액이 없는 구간은 표시하지 않습니다.',readyLink:'2026년 11월 전망 보기 →',faqTitle:'계산기에 2026년 11월 유류할증료도 반영되나요?',faqBody:'네. KE·OZ·LJ·BX·TW·7C·ZE·RS·YP의 11월 공식 공시 금액을 반영했습니다. 이스타항공과 에어프레미아도 11월 공식 공시 금액으로 계산합니다.'},
    en:{title:'Fuel Surcharge Calculator | October and November 2026 Official Notice Comparison',desc:'Compare October and November 2026 official Korea-departure international fuel surcharges by route, airline, trip type and passengers, with November calculation underway separated.',sub:'October 2026 baseline · November official notices reflected · November calculation underway',h1:'Fuel Surcharge Calculator: Compare October and November official notices',notice:'<strong>Notice:</strong> This calculator compares October and November 2026 official notices. November amounts are reflected for KE, OZ, LJ, BX, TW, 7C, ZE, RS and YP. All nine airlines are included.',alert:'Fuel surcharges apply by <strong>ticketing date</strong>, not travel date. Check the airline notice and booking screen before payment.',intro:'Compare October and November 2026 official notice amounts by route, airline, one-way or round trip, and passenger count.',answerTitle:'The current calculation compares October and November official notices',answerBody:'For the selected route, the calculator shows airline differences between October and November 2026 official surcharge amounts.',readyTitle:'October baseline · November official notices reflected',readyBadge:'October baseline · November reflected',readyBody:'Official November amounts are shown for KE, OZ, LJ, BX, TW, 7C, ZE, RS and YP. Some Korean Air bands decreased; bands with no published amount remain blank.',readyLink:'View November 2026 outlook →',faqTitle:'Does the calculator include November 2026 surcharges?',faqBody:'Yes. November official amounts are reflected for KE, OZ, LJ, BX, TW, 7C, ZE, RS and YP. Eastar Jet and Air Premia also use their official November amounts.'}
  };
  base.ja=Object.assign({},base.en,{title:'燃油サーチャージ計算機 | 2026年10月・11月公式公示比較',sub:'2026年10月基準 · 11月公式公示反映 · 11月準備',h1:'燃油サーチャージ計算機：10月と11月の公式公示を比較',notice:'<strong>案内:</strong> 2026年10月と11月の公式公示を比較します。11月はKE・OZ・LJ・BX・TW・7C・ZE・RS・YPを反映し、全9社の公式金額を反映します。',answerTitle:'現在は10月と11月の公式公示を比較します',answerBody:'選択した路線で、2026年10月比の11月公式燃油サーチャージ差額を表示します。',readyTitle:'10月基準 · 11月公式公示反映',readyBadge:'10月基準 · 11月反映',readyLink:'2026年11月見通し準備を見る →',faqTitle:'2026年11月の燃油サーチャージは反映されていますか？'});
  base.zh=Object.assign({},base.en,{title:'燃油附加费计算器 | 2026年10月与11月官方公告比较',sub:'2026年10月基准 · 已反映11月官方公告 · 11月准备',h1:'燃油附加费计算器：比较10月与11月官方公告',notice:'<strong>提示:</strong> 比较2026年10月与11月官方公告。11月已反映KE、OZ、LJ、BX、TW、7C、ZE、RS和YP，共9家航空公司均已纳入计算。',answerTitle:'当前比较10月与11月官方公告',answerBody:'针对所选航线，显示2026年11月相对10月的航空公司燃油附加费差异。',readyTitle:'10月基准 · 已反映11月官方公告',readyBadge:'10月基准 · 11月已反映',readyLink:'查看2026年11月展望准备 →',faqTitle:'是否已反映2026年11月燃油附加费？'});
  base.fr=Object.assign({},base.en,{title:'Calculateur de surtaxe | comparaison octobre-novembre 2026',sub:'Base octobre · avis novembre reflétés · préparation novembre',h1:'Calculateur de surtaxe : octobre et novembre 2026',readyTitle:'Base octobre · avis novembre reflétés',readyBadge:'Octobre · novembre reflété',readyLink:'Voir la préparation novembre 2026 →'});
  base.de=Object.assign({},base.en,{title:'Kerosinzuschlag-Rechner | October-November 2026',sub:'October-Basis · November-Hinweise berücksichtigt · November-Vorbereitung',h1:'Kerosinzuschlag-Rechner: October und November 2026',readyTitle:'October-Basis · November berücksichtigt',readyBadge:'October · November berücksichtigt',readyLink:'November-2026 Vorbereitung ansehen →'});

  var localized={
    ja:{desc:'韓国発国際線の2026年10月と11月の公式燃油サーチャージを路線・航空会社・人数別に比較します。',alert:'燃油サーチャージは<strong>発券日基準</strong>です。支払前に公式公示を確認してください。',intro:'10月と11月の公式金額を路線・片道または往復・人数別に比較します。',readyBody:'全9社の11月公式金額を反映しました。大韓航空の一部区分は下落し、公示額のない区分は空欄です。',faqBody:'全9社の11月公式金額を反映し、イースター航空とエアプレミアも計算に含めます。'},
    zh:{desc:'按航线、航空公司、单程或往返及人数比较2026年10月和11月韩国出发国际线官方燃油附加费。',alert:'燃油附加费按<strong>出票日期</strong>适用。付款前请确认官方公告。',intro:'按航线、行程和人数比较10月及11月官方公布金额。',readyBody:'已反映9家航空公司11月金额。大韩航空部分距离档下降，无公布金额的档位留空。',faqBody:'已反映9家航空公司11月金额，易斯达和Air Premia也已纳入计算。'},
    fr:{desc:'Comparez les surtaxes officielles de octobre et novembre 2026 au départ de Corée par route, compagnie, trajet et passagers.',notice:'<strong>Note :</strong> Les montants officiels de octobre et novembre des neuf compagnies sont inclus.',alert:'La surtaxe dépend de la <strong>date d’émission</strong>. Vérifiez l’avis officiel avant paiement.',intro:'Comparez octobre et novembre selon la route, le trajet et le nombre de passagers.',answerTitle:'Comparaison des montants officiels de octobre et novembre',answerBody:'Les résultats montrent les montants de octobre et novembre pour la route choisie.',readyBody:'Les neuf compagnies sont incluses. Certains tarifs Korean Air baissent; les tranches sans montant publié restent vides.',faqTitle:'Les surtaxes d’novembre 2026 sont-elles incluses ?',faqBody:'Oui, les neuf compagnies, dont Eastar Jet et Air Premia, utilisent les montants officiels d’novembre.'},
    de:{desc:'Vergleichen Sie offizielle Zuschläge ab Korea für October und November 2026 nach Route, Airline, Reiseart und Personen.',notice:'<strong>Hinweis:</strong> Offizielle October- und November-Beträge aller neun Airlines sind enthalten.',alert:'Der Zuschlag gilt nach <strong>Ausstellungsdatum</strong>. Prüfen Sie vor Zahlung die offizielle Mitteilung.',intro:'Vergleichen Sie October und November nach Route, Reiseart und Personen.',answerTitle:'Vergleich offizieller October- und November-Beträge',answerBody:'Ergebnisse zeigen October- und November-Beträge für die gewählte Route.',readyBody:'Alle neun Airlines sind enthalten. Einige Korean-Air-Bänder sinken; Bänder ohne veröffentlichten Betrag bleiben leer.',faqTitle:'Sind die Zuschläge für November 2026 enthalten?',faqBody:'Ja, alle neun Airlines einschließlich Eastar Jet und Air Premia nutzen offizielle November-Beträge.'}
  };
  Object.keys(localized).forEach(function(l){Object.assign(base[l],localized[l]);});
  var novemberState={"ko":["유류할증료 계산기 | 2026년 10월·11월 공식 공시 비교","10월 현재 적용 금액과 11월 공식 공시를 비교합니다. 11월은 KE·OZ·7C·LJ·RS 5개사만 반영하며, BX·TW·ZE·YP는 10월 금액만 표시하고 11월은 공시 전으로 둡니다.","10월 기준 · 11월 공시 5개사 반영","11월 공시 전","11월 공시가 확인된 항공사만 최저가와 차액 계산에 포함합니다. 미공시 금액을 0원 또는 10월 금액으로 대신 계산하지 않습니다.","11월 공식 공시 확인 →","2026년 11월 유류할증료도 계산하나요?"],"en":["Fuel Surcharge Calculator | October and November 2026 Official Notices","Compare current October charges and November official notices. November is confirmed only for KE/OZ/7C/LJ/RS; BX/TW/ZE/YP retain October amounts and November remains pending.","October baseline · five November notices reflected","November notice pending","Only confirmed November amounts enter the lowest-price and difference calculation. Unpublished amounts are neither zero nor replaced with October values.","View November official notices →","Does the calculator include November 2026 notices?"],"ja":["燃油サーチャージ計算機 | 2026年10月・11月公式公示比較","現在の10月額と11月公示を比較。11月はKE・OZ・7C・LJ・RSのみ反映。他4社は10月額を表示し11月は公示前です。","10月基準・11月5社公示反映","11月公示前","11月確認済み金額だけを最安額・差額計算に使用します。未公示額をゼロや10月額で代替しません。","11月公式公示を確認 →","2026年11月公示も計算できますか？"],"zh":["燃油附加费计算器 | 2026年10月与11月官方公告比较","比较当前10月收费与11月公告。11月仅反映KE/OZ/7C/LJ/RS；其余4家保留10月金额，11月为公告前。","10月基准・11月5家公告已反映","11月公告前","仅已确认11月金额参与最低价与差额计算。未公告金额不当作零或以10月金额代替。","查看11月官方公告 →","计算器包含2026年11月公告吗？"],"fr":["Calculateur de surtaxe | avis octobre et novembre 2026","Comparez octobre en vigueur et novembre officiel. Seuls KE/OZ/7C/LJ/RS sont confirmés en novembre ; BX/TW/ZE/YP gardent octobre et novembre en attente.","Base octobre · cinq avis novembre intégrés","Avis novembre en attente","Seuls les montants novembre confirmés entrent dans le minimum et les écarts. Aucun montant inconnu remplacé par zéro ou octobre.","Voir les avis officiels novembre →","Le calculateur inclut-il les avis novembre 2026 ?"],"de":["Kerosinzuschlag-Rechner | Oktober und November 2026","Vergleich aktueller Oktober-Beträge und November-Mitteilungen. November nur für KE/OZ/7C/LJ/RS bestätigt; BX/TW/ZE/YP behalten Oktober und November bleibt ausstehend.","Oktober-Basis · fünf November-Mitteilungen enthalten","November-Mitteilung ausstehend","Nur bestätigte November-Beträge zählen für Minimum und Differenzen. Unbekannte Beträge werden nicht durch null oder Oktober ersetzt.","November-Mitteilungen ansehen →","Sind November-2026-Mitteilungen enthalten?"]};
  var reviewCopy={
    ko:['유류할증료 계산기 | 2026년 10월·11월 비교','노선과 발권월을 선택해 금액을 비교하세요.','11월 확인 중','10월 공시','11월 공시','확인된 두 달의 금액을 같은 조건으로 비교합니다.'],
    en:['Fuel Surcharge Calculator | October–November 2026','Choose a route and ticketing months to compare amounts.','November checking','October notice','November notice','Compare confirmed amounts for both months under the same conditions.'],
    ja:['燃油サーチャージ計算機 | 2026年10月・11月比較','路線と発券月を選んで金額を比較できます。','11月確認中','10月公示','11月公示','確認済みの両月の金額を同じ条件で比較します。'],
    zh:['燃油附加费计算器 | 2026年10月与11月比较','选择航线和出票月份，比较金额。','11月确认中','10月公告','11月公告','在相同条件下比较两个月已确认的金额。'],
    fr:['Calculateur de surtaxe | octobre–novembre 2026','Choisissez une ligne et les mois d’émission à comparer.','Novembre en cours de confirmation','Avis octobre','Avis novembre','Comparez les montants confirmés des deux mois à conditions identiques.'],
    de:['Kerosinzuschlag-Rechner | Oktober–November 2026','Wählen Sie Strecke und Ausstellungsmonate zum Vergleich.','November wird geprüft','Oktober-Mitteilung','November-Mitteilung','Vergleichen Sie bestätigte Beträge beider Monate unter gleichen Bedingungen.']
  };
  Object.keys(novemberState).forEach(function(l){
    novemberState[l][0]=reviewCopy[l][0];
    novemberState[l][1]=window.NOVEMBER_2026_NOTICE_COPY[l].summary+' '+reviewCopy[l][1];
    novemberState[l][2]=window.NOVEMBER_2026_NOTICE_COPY[l].short;
    novemberState[l][3]=reviewCopy[l][2];novemberState[l][4]=reviewCopy[l][5];
    ui[l].thMay=reviewCopy[l][3];ui[l].thJune=reviewCopy[l][4];
    var n=novemberState[l],p=base[l];
    Object.assign(p,{title:n[0],desc:n[1],sub:n[2],h1:n[0],notice:n[1],intro:n[1],answerTitle:n[2],answerBody:n[4],readyTitle:n[2],readyBadge:n[2],readyBody:n[1]+' '+n[4],readyLink:n[5],faqTitle:n[6],faqBody:n[1]+' '+n[4]});
    ui[l].julyPending=n[3];
    ui[l].affiliateSave=n[4]+' '+ui[l].saveHeadline;
    ui[l].affiliateNeutral=n[4];
    Object.assign(SAVING_UI_TEXT[l],ui[l]);
  });
  var noticeLinks={
    ke:'https://www.koreanair.com/contents/footer/customer-support/notice/2026/2610-infuel?pageNum=1',
    oz:'https://flyasiana.com/C/KR/KO/customer/notice/detail?id=CM202609160002530627',
    lj:'https://www.jinair.com/company/announce/announceView?anceSeq=28742',
    bx:'https://www.airbusan.com/content/common/customercenter/noticeDetail?id=4407',
    tw:'https://www.trinityairways.com/app/customerCenter/notice/retrieve/12703',
    '7c':'https://www.jejuair.net/ko/customerServiceCenter/noticeDetail.do?billboardNo=0000000762',
    ze:'https://www.eastarjet.com/newstar/PGWCA00002?cId=11&iId=0&bId=664&lang=KR',
    rs:'https://flyairseoul.com/CW/ko/noticeContent.do?seq=11103&pageNo=1',
    yp:'https://www.airpremia.com/a/ko/customer/notice/791'
  };
  window.AERO_CALCULATOR_OCTOBER={amounts:october,sources:Object.assign({},noticeLinks)};
  (window.NOVEMBER_2026_OFFICIAL_NOTICES||[]).forEach(function(n){noticeLinks[n.code.toLowerCase()]=n.url;});
  Object.keys(base).forEach(function(lang){
    var p=base[lang];
    var values={'calc.metaTitle':p.title,'calc.metaDesc':p.desc,'calc.pageSub':p.sub,'calc.h1':p.h1,'calc.notice':p.notice,'calc.alert':p.alert,'calc.intro':p.intro,'calc.answer.title':p.answerTitle,'calc.answer.body':p.answerBody,'calc.card3.body':p.answerBody,'calc.readiness.title':p.readyTitle,'calc.readiness.badge':p.readyBadge,'calc.readiness.body':p.readyBody,'calc.readiness.link':p.readyLink,'calc.related.june':p.readyLink,'calc.related.may':p.readyLink,'calc.faq.july.title':p.faqTitle,'calc.faq.july.body':p.faqBody};
    Object.keys(noticeLinks).forEach(function(code){
      var key='calc.official.item.'+code,oldValue=(window.I18N[lang]||{})[key]||'';
      var confirmed=(window.NOVEMBER_2026_SOURCE_REVIEW||{verified:[]}).verified.indexOf(code.toUpperCase())>=0;
      var label=november[code.toUpperCase()]?ui[lang].thJune:ui[lang].thMay;
      values[key]='<a href="'+noticeLinks[code]+'" target="_blank" rel="noopener noreferrer">'+code.toUpperCase()+' · '+label+'</a>'+(confirmed?'':' · '+novemberState[lang][3]);
    });
    window.I18N[lang]=window.I18N[lang]||{};Object.assign(window.I18N[lang],values);
    if(window.PAGE_I18N&&PAGE_I18N[lang])Object.assign(PAGE_I18N[lang],values);
  });

  var staticText={
    ko:['노선별 2026년 10월·11월 유류할증료 비교','같은 노선의 취항 항공사를 자동으로 묶어 2026년 10월과 11월 공식 공시 금액을 비교합니다.','2026.10 공식 공시 기준 · 2026.11 공식 공시 반영','10','2026.11 반영','11월 공식 공시 확인분 반영','11월 최저 유류할증료'],
    en:['Route Fuel Surcharge Comparison: October and November 2026','Compare October and November 2026 official amounts for airlines on the same route.','October 2026 baseline · November 2026 reflected','10','November 2026 reflected','November official notices included','Lowest November surcharge'],
    ja:['路線別 2026年10月・11月 燃油サーチャージ比較','同じ路線の航空会社について、2026年10月と11月の公式公示金額を比較します。','2026年10月基準 · 2026年11月反映','10','2026年11月反映','11月公式公示を反映','11月最安サーチャージ'],
    zh:['按航线比较2026年10月·11月燃油附加费','比较同一航线各航空公司2026年10月与11月官方公告金额。','2026年10月基准 · 已反映2026年11月','10','已反映2026年11月','包含11月官方公告','11月最低燃油附加费']
  };
  function lang(){return(window.SHARED_STATE&&SHARED_STATE.lang)||'ko';}
  var periodNotes={
    ko:'유류할증료는 발권일 기준입니다. 2026년 10월·11월 공식 공시를 비교하며 11월은 산정 중입니다.',
    en:'Surcharges apply by ticketing date. Compare October and November 2026 official amounts; November calculation is underway.',
    ja:'発券日基準で2026年10月・11月の公式金額を比較します。11月は算定中です。',
    zh:'按出票日期比较2026年10月和11月官方金额，11月仍在计算中。',
    fr:'La date d’émission détermine la surtaxe. Comparaison octobre-novembre 2026; calcul de novembre en cours.',
    de:'Das Ausstellungsdatum bestimmt den Zuschlag. Vergleich October-November 2026; November-Berechnung läuft.'
  };
  staticText.fr=['Comparaison des surtaxes octobre-novembre 2026','Comparez les montants officiels des compagnies sur la même route.','Base octobre · novembre reflété','10','Novembre 2026 reflété','Neuf compagnies incluses','Surtaxe minimale novembre'];
  staticText.de=['Zuschlagsvergleich October-November 2026','Vergleichen Sie offizielle Airline-Beträge auf derselben Route.','October-Basis · November berücksichtigt','10','November 2026 berücksichtigt','Neun Airlines enthalten','Niedrigster November-Zuschlag'];
  Object.keys(novemberState).forEach(function(l){periodNotes[l]=novemberState[l][1]+' '+novemberState[l][4];staticText[l][1]=reviewCopy[l][5];staticText[l][2]=novemberState[l][2];staticText[l][3]='11';staticText[l][4]=ui[l].thJune;staticText[l][5]=novemberState[l][2];});
  function fix(){
    var p=base[lang()]||base.en,t=staticText[lang()]||staticText.en;
    document.title=p.title;
    var meta=document.querySelector('meta[name="description"]');if(meta)meta.content=p.desc;
    var ogt=document.querySelector('meta[property="og:title"]');if(ogt)ogt.content=p.title;
    var ogd=document.querySelector('meta[property="og:description"]');if(ogd)ogd.content=p.desc;
    var twt=document.querySelector('meta[name="twitter:title"]');if(twt)twt.content=p.title;
    var twd=document.querySelector('meta[name="twitter:description"]');if(twd)twd.content=p.desc;
    var title=document.querySelector('.saving-tool-title');if(title)title.textContent=t[0];
    var sub=document.querySelector('.saving-tool-sub');if(sub)sub.textContent=t[1];
    var badge=document.querySelector('.saving-tool-badge');if(badge)badge.textContent=t[2];
    var trust=document.querySelectorAll('.saving-trust-item');
    if(trust[2]){var icon=trust[2].querySelector('.saving-trust-icon'),tt=trust[2].querySelector('.saving-trust-title'),td=trust[2].querySelector('.saving-trust-desc');if(icon)icon.textContent=t[3];if(tt)tt.textContent=t[4];if(td)td.textContent=t[5];}
    var labels=document.querySelectorAll('.saving-metric-label');if(labels[1])labels[1].textContent=t[6];
    var heads=document.querySelectorAll('.saving-table thead th');
    if(heads[1])heads[1].textContent=ui[lang()]&&ui[lang()].thMay||ui.en.thMay;
    if(heads[2])heads[2].textContent=ui[lang()]&&ui[lang()].thJune||ui.en.thJune;
    if(heads[3])heads[3].textContent=ui[lang()]&&ui[lang()].thSaving||ui.en.thSaving;
    var note=document.querySelector('.saving-note');
    if(note){
      var fxNote={"ko":"USD 공시의 원화 표시는 기존 비교용 고정환율 1 USD = 1,450 KRW를 사용하며 항공사 산정기간 평균환율이나 실제 결제환율이 아닙니다.","en":"USD notices use the existing comparison-only fixed rate of 1 USD = 1,450 KRW, not an airline period-average or payment exchange rate.","ja":"USD公示のウォン表示は既存の比較用固定レート1 USD = 1,450 KRWで、航空会社の算定平均や決済レートではありません。","zh":"USD公告的韩元显示沿用比较用固定汇率1 USD = 1,450 KRW，不是航司期间平均或实际支付汇率。","fr":"Les avis USD utilisent le taux fixe de comparaison existant 1 USD = 1,450 KRW, pas le taux moyen de la compagnie ou du paiement.","de":"USD-Mitteilungen nutzen den bestehenden festen Vergleichskurs 1 USD = 1,450 KRW, nicht den Airline-Periodenmittelkurs oder Zahlungskurs."};
      note.textContent=(periodNotes[lang()]||periodNotes.en)+' '+(fxNote[lang()]||fxNote.en);
    }
    if(lang()==='ko'){
      var root=document.getElementById('savingTool');
      if(root){
        var replacements={
          '노선별 2026년 8월·9월 유류할증료 비교':t[0],
          '같은 노선의 취항 항공사를 자동으로 묶어 2026년 8월 공식 공시 기준 금액과 2026년 9월 공식 공시 금액의 차이를 표로 보여줍니다.':t[1],
          '2026.08 공식 공시 기준 · 2026.09 공식 공시 반영':t[2],
          '2026.09 공시 반영':t[4],
          '9월 공식 공시 확인분 반영':t[5],
          '9월 최저 유류할증료':t[6],
          '9월 공식 공시 기준':'10월 공식 공시 기준',
          '2026년 8월 대비 9월 공식 공시':'2026년 9월 대비 10월 공식 공시',
          '10월 금액은 공식 공지 확인 후 반영되므로 ':''
        };
        var walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),node;
        while((node=walker.nextNode()))Object.keys(replacements).forEach(function(from){if(node.nodeValue.indexOf(from)!==-1)node.nodeValue=node.nodeValue.split(from).join(replacements[from]);});
      }
    }
    if(lang()!=='ko'){
      var foreignRoot=document.getElementById('savingTool');
      if(foreignRoot){
        var foreignReplacements={
          'based on September official notices':'based on October official notices',
          'Based on September 2026 official notices':'Based on October 2026 official notices',
          'October 2026 amounts will be added only after official notices are confirmed, so ':'',
          '9月公式公示基準':'10月公式公示基準','按9月官方公告':'按10月官方公告',
          'selon les avis officiels de septembre':'selon les avis officiels d’octobre',
          'laut September-Mitteilungen':'laut Oktober-Mitteilungen'
        };
        var fw=document.createTreeWalker(foreignRoot,NodeFilter.SHOW_TEXT),fn;
        while((fn=fw.nextNode()))Object.keys(foreignReplacements).forEach(function(from){if(fn.nodeValue.indexOf(from)!==-1)fn.nodeValue=fn.nodeValue.split(from).join(foreignReplacements[from]);});
      }
    }
    var faqAnswers=document.querySelectorAll('#calculatorFaq .faq-a');
    if(faqAnswers[0])faqAnswers[0].textContent=periodNotes[lang()]||periodNotes.en;
    if(window.AeroCalculatorPlatform)window.AeroCalculatorPlatform.refreshSurface();
    var faqItems=Array.from(document.querySelectorAll('#calculatorFaq .faq-item')).map(function(el){var q=el.querySelector('.faq-q'),a=el.querySelector('.faq-a');return q&&a?{'@type':'Question',name:q.textContent,acceptedAnswer:{'@type':'Answer',text:a.textContent}}:null;}).filter(Boolean);
    document.querySelectorAll('script[type="application/ld+json"]').forEach(function(el){try{var d=JSON.parse(el.textContent);function update(x){if(!x||typeof x!=='object')return;if(x['@type']==='WebPage'||x['@type']==='WebApplication'){x.name=p.title;x.description=p.desc;x.dateModified='2026-10-29T07:58:49+09:00';x.inLanguage=lang();}if(x['@type']==='FAQPage'&&faqItems.length){x.mainEntity=faqItems;x.inLanguage=lang();x.dateModified='2026-10-29T07:58:49+09:00';}if(Array.isArray(x['@graph']))x['@graph'].forEach(update);}update(d);el.textContent=JSON.stringify(d);}catch(e){}});
  }
  window._fixNovemberCalculatorSurface=fix;
  window._fixOctoberCalculatorSurface=fix;
  window._fixSeptemberCalculatorSurfaceCopy=fix;
  window._fixSeptemberCalculatorTerminalSurfaceCopy=fix;
  window._fixOctoberCalculatorSurfaceCopy=fix;
  window._fixOctoberCalculatorTerminalSurfaceCopy=fix;
  var render=window.renderSavingCalculator;
  if(typeof render==='function')window.renderSavingCalculator=function(){applyOfficialAmounts();var result=render.apply(this,arguments);fix();return result;};
  if(typeof window.applyLanguage==='function')window.applyLanguage();
  if(window.renderSavingCalculator)window.renderSavingCalculator();
  fix();
  var passes=0;
  var settle=setInterval(function(){
    if(window.AeroCalculatorPlatform){clearInterval(settle);fix();return;}
    passes++;
    applyOfficialAmounts();
    if(passes===1&&typeof window.applyLanguage==='function')window.applyLanguage();
    if(window.renderSavingCalculator)window.renderSavingCalculator();
    fix();
    if(passes>=16)clearInterval(settle);
  },250);
})();
