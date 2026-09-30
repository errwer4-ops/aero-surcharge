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

  function applyOfficialAmounts(){Object.keys(september).forEach(function(code){
    var data=window.SAVING_COMPARE_DATA&&SAVING_COMPARE_DATA[code];
    if(!data||!Array.isArray(data.rows))return;
    data.rows.forEach(function(row,index){
      row.may=september[code][index]==null?null:september[code][index];
      row.june=october[code]&&october[code][index]!=null?october[code][index]:null;
      row.julyOfficial=row.may;
      row.augustOfficial=row.june;
    });
    if(window.JULY_2026_OFFICIAL_AMOUNTS)JULY_2026_OFFICIAL_AMOUNTS[code]=september[code].slice();
    if(window.AUGUST_2026_OFFICIAL_AMOUNTS)AUGUST_2026_OFFICIAL_AMOUNTS[code]=(october[code]||data.rows.map(function(){return null;})).slice();
  });}
  applyOfficialAmounts();

  var ui={
    ko:{saveHeadline:'10월 공식 공시 기준 항공사별 차이 최대 {amount}',thMay:'9월 공식 공시',thJune:'10월 공식 공시',thSaving:'10월 최저 대비',julyPending:'10월 공시 발표 전',affiliateSave:'현재 2026년 10월 공식 공시 기준 항공사별 유류할증료 차이는 최대 {amount}입니다. 실제 운임, 세금, 좌석 상황까지 함께 비교해보세요.',affiliateNeutral:'현재 10월 공식 공시 기준 항공사별 차이가 작습니다. 실제 항공권 총액과 일정 조건을 함께 비교해보세요.'},
    en:{saveHeadline:'Up to {amount} airline difference based on October official notices',thMay:'September official notice',thJune:'October official notice',thSaving:'vs October lowest',julyPending:'October notice not yet published',affiliateSave:'Based on October 2026 official notices, airline surcharge differences can be up to {amount}. Compare the actual fare, taxes and seat availability too.',affiliateNeutral:'Airline differences are small based on October official notices. Compare the total fare and schedule conditions too.'},
    ja:{saveHeadline:'10月公式公示基準で航空会社別差額は最大{amount}',thMay:'9月公式公示',thJune:'10月公式公示',thSaving:'10月最安比',julyPending:'10月公示発表前'},
    zh:{saveHeadline:'按10月官方公告，航司差异最高{amount}',thMay:'9月官方公告',thJune:'10月官方公告',thSaving:'较10月最低',julyPending:'10月公告尚未发布'},
    fr:{saveHeadline:'Écart maximal de {amount} selon les avis officiels d’octobre',thMay:'Avis officiel septembre',thJune:'Avis officiel octobre',thSaving:'vs minimum octobre',julyPending:'Avis octobre non publié'},
    de:{saveHeadline:'Bis zu {amount} Unterschied laut Oktober-Mitteilungen',thMay:'September-Hinweis',thJune:'Oktober-Hinweis',thSaving:'ggü. Oktober-Minimum',julyPending:'Oktober-Hinweis noch nicht veröffentlicht'}
  };
  Object.keys(ui).forEach(function(lang){
    if(window.SAVING_UI_TEXT&&SAVING_UI_TEXT[lang])Object.assign(SAVING_UI_TEXT[lang],ui[lang]);
  });

  var base={
    ko:{title:'유류할증료 계산기 | 2026년 9월·10월 공식 공시 노선별 비교',desc:'한국 출발 국제선 항공권의 2026년 9월과 10월 공식 유류할증료를 노선·항공사·왕복·인원별로 비교하고 11월 산정 중 상태를 확인합니다.',sub:'2026년 9월 공식 공시 기준 · 2026년 10월 공식 공시 반영 · 11월 산정 중',h1:'유류할증료 계산기: 9월과 10월 공식 공시 금액 비교',notice:'<strong>안내:</strong> 2026년 9월과 10월 공식 공시를 비교합니다. 10월 공시는 KE·OZ·LJ·BX·TW·7C·ZE·RS·YP를 반영하며, 9개 항공사의 10월 공시 금액을 모두 반영했습니다.',alert:'유류할증료는 <strong>탑승일이 아닌 발권일 기준</strong>으로 적용됩니다. 최종 결제 전 항공사 공식 공지와 예약 화면을 확인하세요.',intro:'2026년 9월과 10월 공식 공시 금액을 노선, 항공사, 편도·왕복, 인원 수에 맞춰 비교하는 계산기입니다.',answerTitle:'현재 계산 기준은 9월과 10월 공식 공시 금액입니다',answerBody:'선택한 노선에서 2026년 9월 대비 10월 공식 공시 기준 항공사별 유류할증료 차이를 보여줍니다.',readyTitle:'9월 공시 기준 · 10월 공식 공시 반영',readyBadge:'9월 기준 · 10월 반영',readyBody:'10월 공시가 확인된 KE·OZ·LJ·BX·TW·7C·ZE·RS·YP의 공식 금액을 표시합니다. 대한항공 일부 구간은 9월보다 인하됐으며, 공시 표에 별도 금액이 없는 구간은 표시하지 않습니다.',readyLink:'2026년 11월 전망 보기 →',faqTitle:'계산기에 2026년 10월 유류할증료도 반영되나요?',faqBody:'네. KE·OZ·LJ·BX·TW·7C·ZE·RS·YP의 10월 공식 공시 금액을 반영했습니다. 이스타항공과 에어프레미아도 10월 공식 공시 금액으로 계산합니다.'},
    en:{title:'Fuel Surcharge Calculator | September and October 2026 Official Notice Comparison',desc:'Compare September and October 2026 official Korea-departure international fuel surcharges by route, airline, trip type and passengers, with November calculation underway separated.',sub:'September 2026 baseline · October official notices reflected · November calculation underway',h1:'Fuel Surcharge Calculator: Compare September and October official notices',notice:'<strong>Notice:</strong> This calculator compares September and October 2026 official notices. October amounts are reflected for KE, OZ, LJ, BX, TW, 7C, ZE, RS and YP. All nine airlines are included.',alert:'Fuel surcharges apply by <strong>ticketing date</strong>, not travel date. Check the airline notice and booking screen before payment.',intro:'Compare September and October 2026 official notice amounts by route, airline, one-way or round trip, and passenger count.',answerTitle:'The current calculation compares September and October official notices',answerBody:'For the selected route, the calculator shows airline differences between September and October 2026 official surcharge amounts.',readyTitle:'September baseline · October official notices reflected',readyBadge:'September baseline · October reflected',readyBody:'Official October amounts are shown for KE, OZ, LJ, BX, TW, 7C, ZE, RS and YP. Some Korean Air bands decreased; bands with no published amount remain blank.',readyLink:'View November 2026 outlook →',faqTitle:'Does the calculator include October 2026 surcharges?',faqBody:'Yes. October official amounts are reflected for KE, OZ, LJ, BX, TW, 7C, ZE, RS and YP. Eastar Jet and Air Premia also use their official October amounts.'}
  };
  base.ja=Object.assign({},base.en,{title:'燃油サーチャージ計算機 | 2026年9月・10月公式公示比較',sub:'2026年9月基準 · 10月公式公示反映 · 11月準備',h1:'燃油サーチャージ計算機：9月と10月の公式公示を比較',notice:'<strong>案内:</strong> 2026年9月と10月の公式公示を比較します。10月はKE・OZ・LJ・BX・TW・7C・ZE・RS・YPを反映し、全9社の公式金額を反映します。',answerTitle:'現在は9月と10月の公式公示を比較します',answerBody:'選択した路線で、2026年9月比の10月公式燃油サーチャージ差額を表示します。',readyTitle:'9月基準 · 10月公式公示反映',readyBadge:'9月基準 · 10月反映',readyLink:'2026年11月見通し準備を見る →',faqTitle:'2026年10月の燃油サーチャージは反映されていますか？'});
  base.zh=Object.assign({},base.en,{title:'燃油附加费计算器 | 2026年9月与10月官方公告比较',sub:'2026年9月基准 · 已反映10月官方公告 · 11月准备',h1:'燃油附加费计算器：比较9月与10月官方公告',notice:'<strong>提示:</strong> 比较2026年9月与10月官方公告。10月已反映KE、OZ、LJ、BX、TW、7C、ZE、RS和YP，共9家航空公司均已纳入计算。',answerTitle:'当前比较9月与10月官方公告',answerBody:'针对所选航线，显示2026年10月相对9月的航空公司燃油附加费差异。',readyTitle:'9月基准 · 已反映10月官方公告',readyBadge:'9月基准 · 10月已反映',readyLink:'查看2026年11月展望准备 →',faqTitle:'是否已反映2026年10月燃油附加费？'});
  base.fr=Object.assign({},base.en,{title:'Calculateur de surtaxe | comparaison septembre-octobre 2026',sub:'Base septembre · avis octobre reflétés · préparation novembre',h1:'Calculateur de surtaxe : septembre et octobre 2026',readyTitle:'Base septembre · avis octobre reflétés',readyBadge:'Septembre · octobre reflété',readyLink:'Voir la préparation novembre 2026 →'});
  base.de=Object.assign({},base.en,{title:'Kerosinzuschlag-Rechner | September-Oktober 2026',sub:'September-Basis · Oktober-Hinweise berücksichtigt · November-Vorbereitung',h1:'Kerosinzuschlag-Rechner: September und Oktober 2026',readyTitle:'September-Basis · Oktober berücksichtigt',readyBadge:'September · Oktober berücksichtigt',readyLink:'November-2026 Vorbereitung ansehen →'});

  var localized={
    ja:{desc:'韓国発国際線の2026年9月と10月の公式燃油サーチャージを路線・航空会社・人数別に比較します。',alert:'燃油サーチャージは<strong>発券日基準</strong>です。支払前に公式公示を確認してください。',intro:'9月と10月の公式金額を路線・片道または往復・人数別に比較します。',readyBody:'全9社の10月公式金額を反映しました。大韓航空の一部区分は下落し、公示額のない区分は空欄です。',faqBody:'全9社の10月公式金額を反映し、イースター航空とエアプレミアも計算に含めます。'},
    zh:{desc:'按航线、航空公司、单程或往返及人数比较2026年9月和10月韩国出发国际线官方燃油附加费。',alert:'燃油附加费按<strong>出票日期</strong>适用。付款前请确认官方公告。',intro:'按航线、行程和人数比较9月及10月官方公布金额。',readyBody:'已反映9家航空公司10月金额。大韩航空部分距离档下降，无公布金额的档位留空。',faqBody:'已反映9家航空公司10月金额，易斯达和Air Premia也已纳入计算。'},
    fr:{desc:'Comparez les surtaxes officielles de septembre et octobre 2026 au départ de Corée par route, compagnie, trajet et passagers.',notice:'<strong>Note :</strong> Les montants officiels de septembre et octobre des neuf compagnies sont inclus.',alert:'La surtaxe dépend de la <strong>date d’émission</strong>. Vérifiez l’avis officiel avant paiement.',intro:'Comparez septembre et octobre selon la route, le trajet et le nombre de passagers.',answerTitle:'Comparaison des montants officiels de septembre et octobre',answerBody:'Les résultats montrent les montants de septembre et octobre pour la route choisie.',readyBody:'Les neuf compagnies sont incluses. Certains tarifs Korean Air baissent; les tranches sans montant publié restent vides.',faqTitle:'Les surtaxes d’octobre 2026 sont-elles incluses ?',faqBody:'Oui, les neuf compagnies, dont Eastar Jet et Air Premia, utilisent les montants officiels d’octobre.'},
    de:{desc:'Vergleichen Sie offizielle Zuschläge ab Korea für September und Oktober 2026 nach Route, Airline, Reiseart und Personen.',notice:'<strong>Hinweis:</strong> Offizielle September- und Oktober-Beträge aller neun Airlines sind enthalten.',alert:'Der Zuschlag gilt nach <strong>Ausstellungsdatum</strong>. Prüfen Sie vor Zahlung die offizielle Mitteilung.',intro:'Vergleichen Sie September und Oktober nach Route, Reiseart und Personen.',answerTitle:'Vergleich offizieller September- und Oktober-Beträge',answerBody:'Ergebnisse zeigen September- und Oktober-Beträge für die gewählte Route.',readyBody:'Alle neun Airlines sind enthalten. Einige Korean-Air-Bänder sinken; Bänder ohne veröffentlichten Betrag bleiben leer.',faqTitle:'Sind die Zuschläge für Oktober 2026 enthalten?',faqBody:'Ja, alle neun Airlines einschließlich Eastar Jet und Air Premia nutzen offizielle Oktober-Beträge.'}
  };
  Object.keys(localized).forEach(function(l){Object.assign(base[l],localized[l]);});
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
  Object.keys(base).forEach(function(lang){
    var p=base[lang];
    var values={'calc.metaTitle':p.title,'calc.metaDesc':p.desc,'calc.pageSub':p.sub,'calc.h1':p.h1,'calc.notice':p.notice,'calc.alert':p.alert,'calc.intro':p.intro,'calc.answer.title':p.answerTitle,'calc.answer.body':p.answerBody,'calc.card3.body':p.answerBody,'calc.readiness.title':p.readyTitle,'calc.readiness.badge':p.readyBadge,'calc.readiness.body':p.readyBody,'calc.readiness.link':p.readyLink,'calc.related.june':p.readyLink,'calc.related.may':p.readyLink,'calc.faq.july.title':p.faqTitle,'calc.faq.july.body':p.faqBody};
    Object.keys(noticeLinks).forEach(function(code){
      var key='calc.official.item.'+code,oldValue=(window.I18N[lang]||{})[key]||'';
      values[key]=oldValue.replace(/href=(["']).*?\1/g,'href="'+noticeLinks[code]+'"');
    });
    window.I18N[lang]=window.I18N[lang]||{};Object.assign(window.I18N[lang],values);
    if(window.PAGE_I18N&&PAGE_I18N[lang])Object.assign(PAGE_I18N[lang],values);
  });

  var staticText={
    ko:['노선별 2026년 9월·10월 유류할증료 비교','같은 노선의 취항 항공사를 자동으로 묶어 2026년 9월과 10월 공식 공시 금액을 비교합니다.','2026.09 공식 공시 기준 · 2026.10 공식 공시 반영','10','2026.10 반영','10월 공식 공시 확인분 반영','10월 최저 유류할증료'],
    en:['Route Fuel Surcharge Comparison: September and October 2026','Compare September and October 2026 official amounts for airlines on the same route.','September 2026 baseline · October 2026 reflected','10','October 2026 reflected','October official notices included','Lowest October surcharge'],
    ja:['路線別 2026年9月・10月 燃油サーチャージ比較','同じ路線の航空会社について、2026年9月と10月の公式公示金額を比較します。','2026年9月基準 · 2026年10月反映','10','2026年10月反映','10月公式公示を反映','10月最安サーチャージ'],
    zh:['按航线比较2026年9月·10月燃油附加费','比较同一航线各航空公司2026年9月与10月官方公告金额。','2026年9月基准 · 已反映2026年10月','10','已反映2026年10月','包含10月官方公告','10月最低燃油附加费']
  };
  function lang(){return(window.SHARED_STATE&&SHARED_STATE.lang)||'ko';}
  var periodNotes={
    ko:'유류할증료는 발권일 기준입니다. 2026년 9월·10월 공식 공시를 비교하며 11월은 산정 중입니다.',
    en:'Surcharges apply by ticketing date. Compare September and October 2026 official amounts; November calculation is underway.',
    ja:'発券日基準で2026年9月・10月の公式金額を比較します。11月は算定中です。',
    zh:'按出票日期比较2026年9月和10月官方金额，11月仍在计算中。',
    fr:'La date d’émission détermine la surtaxe. Comparaison septembre-octobre 2026; calcul de novembre en cours.',
    de:'Das Ausstellungsdatum bestimmt den Zuschlag. Vergleich September-Oktober 2026; November-Berechnung läuft.'
  };
  staticText.fr=['Comparaison des surtaxes septembre-octobre 2026','Comparez les montants officiels des compagnies sur la même route.','Base septembre · octobre reflété','10','Octobre 2026 reflété','Neuf compagnies incluses','Surtaxe minimale octobre'];
  staticText.de=['Zuschlagsvergleich September-Oktober 2026','Vergleichen Sie offizielle Airline-Beträge auf derselben Route.','September-Basis · Oktober berücksichtigt','10','Oktober 2026 berücksichtigt','Neun Airlines enthalten','Niedrigster Oktober-Zuschlag'];
  function fix(){
    var p=base[lang()]||base.en,t=staticText[lang()]||staticText.en;
    document.title=p.title;
    var meta=document.querySelector('meta[name="description"]');if(meta)meta.content=p.desc;
    var ogt=document.querySelector('meta[property="og:title"]');if(ogt)ogt.content=p.title;
    var ogd=document.querySelector('meta[property="og:description"]');if(ogd)ogd.content=p.desc;
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
      note.textContent=periodNotes[lang()]||periodNotes.en;
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
  }
  window._fixOctoberCalculatorSurface=fix;
  window._fixSeptemberCalculatorSurfaceCopy=fix;
  window._fixSeptemberCalculatorTerminalSurfaceCopy=fix;
  var render=window.renderSavingCalculator;
  if(typeof render==='function')window.renderSavingCalculator=function(){applyOfficialAmounts();var result=render.apply(this,arguments);fix();return result;};
  if(typeof window.applyLanguage==='function')window.applyLanguage();
  if(window.renderSavingCalculator)window.renderSavingCalculator();
  fix();
  var passes=0;
  var settle=setInterval(function(){
    passes++;
    applyOfficialAmounts();
    if(passes===1&&typeof window.applyLanguage==='function')window.applyLanguage();
    if(window.renderSavingCalculator)window.renderSavingCalculator();
    fix();
    if(passes>=16)clearInterval(settle);
  },250);
})();
