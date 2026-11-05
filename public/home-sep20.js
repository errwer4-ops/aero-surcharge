(function(){
  'use strict';
  var stamp='2026-11-04T22:27:40+09:00';
  var octoberLinks={
    KE:'https://www.koreanair.com/contents/footer/customer-support/notice/2026/2610-infuel?pageNum=1',
    OZ:'https://flyasiana.com/C/KR/KO/customer/notice/detail?id=CM202609160002530627',
    LJ:'https://www.jinair.com/company/announce/announceView?anceSeq=28742&searchWord=&searchKey=titlCtn&page=1',
    BX:'https://www.airbusan.com/content/common/customercenter/noticeDetail?id=4407',
    TW:'https://www.trinityairways.com/app/customerCenter/notice/retrieve/12703',
    '7C':'https://www.jejuair.net/ko/customerServiceCenter/noticeDetail.do?billboardNo=0000000762',
    RS:'https://flyairseoul.com/CW/ko/noticeContent.do?seq=11103&pageNo=1',
    ZE:'https://www.eastarjet.com/newstar/PGWCA00002?cId=11&iId=0&bId=664&lang=KR&searchWord=&searchIndex=1',
    YP:'https://www.airpremia.com/a/ko/customer/notice/791'
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
    '7C':[37,47,57,68,76,87],ZE:[37,47,57,68,76,87],
    RS:[60300,69900,87800,98700,108300],YP:[41,54,null,91,159,200,251]
  };
  // Service descriptions explain their own purpose. Only the dedicated
  // notice-status line receives the current period summary.
  var text={
    ko:{
      title:'노선별 유류할증료 조회 · 항공사 공식 공시 비교',
      desc:'한국 출발 국제선 유류할증료를 항공사·노선별로 조회하고, 월별 금액 차이와 공시 원문을 확인하세요.',
      hero:'출발·도착 공항을 선택해 항공사별 유류할증료와 월별 변화를 확인하세요.',
      s1:'항공사 공식 공지와 원문 링크',s2:'같은 통화·노선 구간 비교',
      intro1:'인천·김포·부산·청주·대구 등 한국 출발 국제선의 유류할증료를 항공사와 노선별로 조회합니다. 항공사별 거리 구간과 노선군에 맞는 금액을 확인할 수 있습니다.',
      intro2:'항공사 공식 공지의 금액·통화·적용 기간을 확인하고 원문 링크를 제공합니다. 원문 검증이 끝난 데이터와 확인 중인 데이터를 구분해 표시합니다.',
      intro3:'여러 항공사의 공지를 한 화면에서 살펴보고, 같은 항공사·통화·구간의 월별 변화를 비교할 수 있습니다. 유류할증료가 항공권 총액에 미치는 차이를 파악하는 데 도움이 됩니다.',
      decision:'공시 확인 현황과 금액 읽는 방법',
      line2:'조회 금액의 적용 월과 편도 기준을 확인하고, 항공사마다 다른 발권·결제일 조건을 살펴보세요.',
      line3:'미확인 금액은 비교에서 제외합니다. 원 통화가 다르면 환산 기준을 확인한 뒤 비교하세요.',
      conclusion:'최종 결제금액은 항공사 또는 발권처의 요금 내역에서 확인하세요.',
      quick1:'월별 유류할증료 비교',quick1d:'같은 항공사·노선의 공시 금액 변화 확인',
      forecastLabel:'유류할증료 전망',nextMonthLabel:'다음 달',waitLabel:'공시 확인 대기',
      quickForecastDesc:'공식 공시 확인 대기 · 시장 변수와 방향성 살펴보기',
      affiliate:'유류할증료에 기본 운임·세금·선택한 부가서비스를 더한 실제 항공권 총액을 확인하세요. 최종 결제 조건은 발권처에서 확인할 수 있습니다.',
      statusFallback:'공시 원문과 검증 상태를 확인하세요.'
    },
    en:{
      title:'Fuel Surcharge Lookup · Official Airline Notice Comparison',
      desc:'Look up international fuel surcharges departing Korea by airline and route, compare monthly amounts and inspect official sources.',
      hero:'Choose your departure and arrival airports to see airline surcharges and monthly changes.',
      s1:'Official airline notices and source links',s2:'Compare matching currencies and route bands',
      intro1:'Look up international surcharges departing Korean airports such as Incheon, Gimpo, Busan, Cheongju and Daegu. Amounts follow each airline’s distance bands or route groups.',
      intro2:'We check amounts, currencies and effective periods against official airline notices and link to the originals. Source-verified data is distinguished from data still awaiting review.',
      intro3:'Review multiple airline notices on one screen and compare monthly changes for the same airline, currency and band. This helps you understand the surcharge’s contribution to total airfare.',
      decision:'Notice status and how to read the amounts',
      line2:'Check the applicable month and one-way basis, along with each airline’s ticketing or payment-date conditions.',
      line3:'Unverified amounts are excluded from comparisons. Check the conversion basis before comparing different original currencies.',
      conclusion:'Confirm the final payment amount in the airline or ticket seller’s fare breakdown.',
      quick1:'Compare monthly surcharges',quick1d:'Track published changes for the same airline and route',
      forecastLabel:'surcharge outlook',nextMonthLabel:'Next month',waitLabel:'Official notice awaiting verification',
      quickForecastDesc:'Official notice pending verification · explore market drivers and direction',
      affiliate:'Compare the actual ticket total, including the surcharge, base fare, taxes and selected extras. The ticket seller provides the final payment conditions.',
      statusFallback:'Check official notice sources and verification status.'
    },
    ja:{
      title:'路線別燃油サーチャージ検索 · 航空会社公式公示比較',
      desc:'韓国発国際線の燃油サーチャージを航空会社・路線別に検索し、月別の金額差と公式原文を確認できます。',
      hero:'出発・到着空港を選び、航空会社別の燃油サーチャージと月別変化を確認してください。',
      s1:'航空会社公式公示と原文リンク',s2:'同じ通貨・路線区間で比較',
      intro1:'仁川・金浦・釜山・清州・大邱など韓国発国際線の燃油サーチャージを検索します。各社の距離区間や路線群に対応する金額を確認できます。',
      intro2:'航空会社公式公示の金額・通貨・適用期間を確認し、原文リンクを提供します。原文確認済みのデータと確認中のデータを区別して表示します。',
      intro3:'複数社の公示を一画面で確認し、同じ航空会社・通貨・区間の月別変化を比較できます。燃油サーチャージが航空券総額に与える差を把握できます。',
      decision:'公示確認状況と金額の見方',
      line2:'金額の適用月と片道基準を確認し、各社の発券・決済日条件をご確認ください。',
      line3:'未確認の金額は比較対象から除外します。通貨が異なる場合は換算基準を確認して比較してください。',
      conclusion:'最終支払額は航空会社または発券窓口の料金内訳で確認してください。',
      quick1:'月別燃油サーチャージ比較',quick1d:'同じ航空会社・路線の公示額の変化を確認',
      forecastLabel:'燃油サーチャージ見通し',nextMonthLabel:'翌月',waitLabel:'公式公示確認待ち',
      quickForecastDesc:'公式公示確認待ち · 市場要因と方向性を確認',
      affiliate:'燃油サーチャージ、基本運賃、税金、選択した追加サービスを含む航空券総額を確認してください。最終決済条件は発券窓口で確認できます。',
      statusFallback:'公式公示の原文と確認状況をご確認ください。'
    },
    zh:{
      title:'按航线查询燃油附加费 · 航司官方公告比较',
      desc:'按航司及航线查询韩国出发国际线燃油附加费，比较各月金额变化并核对官方来源。',
      hero:'选择出发及到达机场，查看各航司燃油附加费和月度变化。',
      s1:'航司官方公告与原文链接',s2:'比较同一币种及航线区间',
      intro1:'查询仁川、金浦、釜山、清州、大邱等韩国机场出发的国际线燃油附加费。金额对应各航司的距离区间或航线组。',
      intro2:'核对航司官方公告中的金额、币种和适用期间，并提供原文链接。已完成原文核验的数据与仍待核实的数据分别显示。',
      intro3:'在一个页面查看多家航司公告，比较同一航司、币种及区间的月度变化，了解燃油附加费对机票总价的影响。',
      decision:'公告核实情况与金额说明',
      line2:'请确认金额适用月份和单程标准，并查看各航司的出票或付款日期条件。',
      line3:'未核实金额不纳入比较。原币种不同的金额应先确认换算依据。',
      conclusion:'最终支付金额请以航司或出票平台的费用明细为准。',
      quick1:'月度燃油附加费比较',quick1d:'查看同一航司及航线的公告金额变化',
      forecastLabel:'燃油附加费展望',nextMonthLabel:'下月',waitLabel:'等待核实官方公告',
      quickForecastDesc:'官方公告待核实 · 查看市场因素与方向',
      affiliate:'请比较包含燃油附加费、基础票价、税费及所选附加服务的实际机票总价。最终支付条件可在出票平台确认。',
      statusFallback:'请核对官方公告原文与核实状态。'
    },
    fr:{
      title:'Recherche de surtaxes carburant · Comparaison des avis officiels',
      desc:'Consultez les surtaxes internationales au départ de Corée par compagnie et ligne, comparez les montants mensuels et leurs sources officielles.',
      hero:'Choisissez les aéroports de départ et d’arrivée pour consulter les surtaxes et leur évolution mensuelle.',
      s1:'Avis officiels et liens vers les sources',s2:'Comparer les mêmes devises et tranches de lignes',
      intro1:'Recherchez les surtaxes des vols internationaux au départ d’Incheon, Gimpo, Busan, Cheongju, Daegu et d’autres aéroports coréens. Les montants suivent les tranches de distance ou groupes de lignes de chaque compagnie.',
      intro2:'Les montants, devises et périodes d’application sont contrôlés à partir des avis officiels, avec un lien vers l’original. Les données vérifiées sont distinguées de celles encore à examiner.',
      intro3:'Consultez plusieurs avis sur un seul écran et comparez les variations mensuelles pour une même compagnie, devise et tranche. Vous pouvez ainsi mieux comprendre la part de la surtaxe dans le prix du billet.',
      decision:'État des avis et lecture des montants',
      line2:'Vérifiez le mois d’application, la base aller simple et les conditions de date d’émission ou de paiement de chaque compagnie.',
      line3:'Les montants non vérifiés sont exclus des comparaisons. Vérifiez la base de conversion avant de comparer des devises différentes.',
      conclusion:'Confirmez le montant final dans le détail tarifaire de la compagnie ou du vendeur du billet.',
      quick1:'Comparer les surtaxes mensuelles',quick1d:'Suivre les montants publiés pour une même compagnie et ligne',
      forecastLabel:'— perspectives de surtaxe',nextMonthLabel:'Mois suivant',waitLabel:'Avis officiel à vérifier',
      quickForecastDesc:'Avis officiel à vérifier · consulter les facteurs de marché et leur orientation',
      affiliate:'Comparez le prix réel du billet, incluant surtaxe, tarif de base, taxes et services choisis. Le vendeur précise les conditions finales de paiement.',
      statusFallback:'Consultez les sources officielles et leur état de vérification.'
    },
    de:{
      title:'Treibstoffzuschläge nach Strecke · Offizielle Mitteilungen vergleichen',
      desc:'Internationale Treibstoffzuschläge ab Korea nach Airline und Strecke prüfen, Monatsbeträge vergleichen und offizielle Quellen einsehen.',
      hero:'Abflug- und Zielflughafen wählen, um Zuschläge und monatliche Änderungen der Airlines zu sehen.',
      s1:'Offizielle Mitteilungen und Quellenlinks',s2:'Gleiche Währungen und Streckengruppen vergleichen',
      intro1:'Internationale Zuschläge ab Incheon, Gimpo, Busan, Cheongju, Daegu und anderen koreanischen Flughäfen nachschlagen. Die Beträge richten sich nach den Entfernungsbändern oder Streckengruppen der jeweiligen Airline.',
      intro2:'Beträge, Währungen und Gültigkeitszeiträume werden anhand offizieller Airline-Mitteilungen geprüft und mit den Originalquellen verlinkt. Geprüfte Angaben bleiben von noch offenen Prüfungen getrennt.',
      intro3:'Mehrere Airline-Mitteilungen auf einer Seite ansehen und Monatsänderungen derselben Airline, Währung und Gruppe vergleichen. So wird der Anteil des Zuschlags am gesamten Flugpreis verständlich.',
      decision:'Prüfstand der Mitteilungen und Hinweise zu Beträgen',
      line2:'Gültigen Monat, Einfachstrecke und die jeweiligen Bedingungen zum Ausstellungs- oder Zahlungsdatum prüfen.',
      line3:'Ungeprüfte Beträge werden nicht verglichen. Vor dem Vergleich unterschiedlicher Originalwährungen die Umrechnungsbasis prüfen.',
      conclusion:'Den endgültigen Zahlbetrag in der Preisaufstellung der Airline oder Verkaufsstelle bestätigen.',
      quick1:'Monatliche Zuschläge vergleichen',quick1d:'Veröffentlichte Änderungen derselben Airline und Strecke verfolgen',
      forecastLabel:'— Zuschlagsausblick',nextMonthLabel:'Nächster Monat',waitLabel:'Offizielle Mitteilung noch zu prüfen',
      quickForecastDesc:'Offizielle Mitteilung noch zu prüfen · Marktfaktoren und Richtung ansehen',
      affiliate:'Den tatsächlichen Gesamtpreis inklusive Zuschlag, Grundtarif, Steuern und gewählten Zusatzleistungen vergleichen. Die Verkaufsstelle nennt die endgültigen Zahlungsbedingungen.',
      statusFallback:'Offizielle Quellen und ihren Prüfstand ansehen.'
    }
  };
  // These labels describe the stored comparison columns, not the current month.
  var recordCopy={
    ko:['11월 공식 공지 ↗','11월 공시 확인 중','월별 공시 기록 비교','10월 보관 데이터','✓ 11월 공시 반영','같은 구간의 10월 대비 11월 금액 변동률','10월 대비','2026.11 공시','2026.11 확인 중','10월 공시 원문 ↗','선택 구간 ','선택 노선 구간의 10월 대비 11월 금액 변화'],
    en:['November official notice ↗','November notice under review','Monthly notice records','October archived data','✓ November notice reflected','November change versus October for the same band','vs October','2026.11 notice','2026.11 under review','October source link ↗','Selected band ','November versus October for the selected route band'],
    ja:['11月公式公示 ↗','11月公示確認中','月別公示記録比較','10月保存データ','✓ 11月公示反映','同じ区間の10月比11月金額変動率','10月比','2026.11公示','2026.11確認中','10月公示原文 ↗','選択区間 ','選択路線区間の10月比11月金額変化'],
    zh:['11月官方公告 ↗','11月公告核实中','月度公告记录比较','10月存档数据','✓ 已反映11月公告','同一区间11月金额较10月的变化率','较10月','2026.11公告','2026.11核实中','10月公告原文 ↗','所选区间 ','所选航线区间11月金额较10月的变化'],
    fr:['Avis officiel novembre ↗','Avis novembre en cours de vérification','Avis mensuels comparés','Données archivées octobre','✓ Avis novembre intégré','Variation novembre contre octobre pour la même tranche','vs octobre','Avis 2026.11','2026.11 à vérifier','Source octobre ↗','Tranche choisie ','Évolution novembre contre octobre pour la tranche choisie'],
    de:['Offizielle November-Mitteilung ↗','November-Mitteilung wird geprüft','Monatliche Mitteilungsdaten vergleichen','Archivdaten Oktober','✓ November-Mitteilung enthalten','November-Änderung gegenüber Oktober im selben Band','gegenüber Oktober','Mitteilung 2026.11','2026.11 in Prüfung','Oktober-Quellenlink ↗','Gewähltes Band ','November-Änderung gegenüber Oktober für die gewählte Strecke']
  };
  Object.keys(text).forEach(function(lang){
    var a=recordCopy[lang];
    Object.assign(text[lang],{notice:a[0],pending:a[1],compare:a[2],base:a[3],reflected:a[4],trend:a[5],trendPrefix:a[6],thPrev:'2026.10',thNow:a[7],thPending:a[8],octoberNotice:a[9],selectedLabel:a[10],selectedTip:a[11],suffix:' · '+a[2]});
  });
  var guideCopy={
    ko:'금액은 항공사마다 다르며, 같은 항공사라도 비행 거리 구간이나 노선군에 따라 다르게 적용됩니다. 항공사가 공지한 발권 적용 기간을 기준으로 확인하세요.',
    en:'Amounts vary by airline and by distance band or route group within an airline. Check the ticket-issuance period specified in each airline’s notice.',
    ja:'金額は航空会社によって異なり、同じ航空会社でも距離帯や路線群によって変わります。各社の公式発表に記載された発券適用期間を確認してください。',
    zh:'金额因航空公司而异，同一航空公司也会按距离区间或航线组采用不同金额。请以各航空公司公告的出票适用期间为准。',
    fr:'Les montants varient selon la compagnie, la tranche de distance ou le groupe de lignes. Vérifiez la période d’émission des billets indiquée dans chaque avis officiel.',
    de:'Die Beträge unterscheiden sich je nach Fluggesellschaft, Distanzband oder Streckengruppe. Beachten Sie den in der jeweiligen Mitteilung angegebenen Gültigkeitszeitraum für die Ticketausstellung.'
  };
  function updatePeriodCopy(now){
    var api=window.AeroNoticePeriod;
    var state=api&&typeof api.state==='function'?api.state(now):null;
    var market=window.AERO_MARKET_NUMBERS_LATEST||{};
    var hasNextNotice=state&&state.nextMonth===state.noticeMonth&&state.verifiedCount>0&&state.pendingCount===0;
    var hasNextForecast=state&&market.forecastTargetMonth===state.nextMonth;
    Object.keys(text).forEach(function(lang){
      var c=text[lang],period=api&&typeof api.copy==='function'?api.copy(lang,now):null;
      var nextLabel=period&&period.nextLabel||c.nextMonthLabel;
      c.line1=period&&period.summary||c.statusFallback;
      c.s3=hasNextNotice?c.reflected:nextLabel+' · '+c.waitLabel;
      // A calendar rollover must not relabel the existing forecast as a new one.
      c.quick2=(hasNextForecast?nextLabel+' ':'')+c.forecastLabel.replace(/^—\s*/, '');
      c.quick2d=hasNextForecast?c.quickForecastDesc:c.statusFallback;
      // Keep the relation available to renderers without rewriting stored data.
      c.noticeRelation=state&&state.relation||'archive';
    });
  }
  var november={},novemberLinks={};
  (window.NOVEMBER_2026_OFFICIAL_NOTICES||[]).forEach(function(n){november[n.code]=n.displayBandIndices?n.displayBandIndices.map(function(i){return i===null?null:n.november[i];}):n.november.slice();novemberLinks[n.code]=n.url;});
  window.NOVEMBER_2026_NOTICE_LINKS=novemberLinks;
  function installCopy(now){
    updatePeriodCopy(now);
    Object.keys(text).forEach(function(lang){var c=text[lang];window.I18N[lang]=window.I18N[lang]||{};Object.assign(window.I18N[lang],{
      'index.title':c.title,'index.metaDesc':c.desc,'index.heroSub':c.hero,'index.signal1':c.s1,'index.signal2':c.s2,'index.signal3':c.s3,
      'index.meta.suffix':c.suffix,'index.intro1.body':c.intro1,'index.intro2.body':c.intro2,'index.intro3.body':c.intro3,
      'index.decision.title':c.decision,'index.decision.line1':c.line1,'index.decision.line2':c.line2,'index.decision.line3':c.line3,'index.decision.conclusion':c.conclusion,
      'index.status.updatedSuffix':c.suffix,'index.card.septemberNotice':c.notice,'index.card.septemberPending':c.pending,'index.card.pendingSepShort':c.pending,
      'index.card.compareSep':c.compare,'index.card.augustBase':c.base,'index.card.officialReflectedSep':c.reflected,'index.card.trendSepTooltip':c.trend,
      'index.card.trendSepPrefix':c.trendPrefix,'index.card.thAug':c.thPrev,'index.card.thSepOfficial':c.thNow,'index.card.thSepPending':c.thPending,
      'index.quick.compare.name':c.quick1,'index.quick.compare.desc':c.quick1d,'index.quick.jul.name':c.quick2,'index.quick.jul.desc':c.quick2d,
      'index.card.miniNotice':c.octoberNotice,
      'aff.myrealtrip.desc':c.affiliate,'index.guide.p2':guideCopy[lang]
    });});
  }
  function installData(){
    // Eastar publishes route groups, not mileage brackets.
    if(window._OFFICIAL_AMT&&_OFFICIAL_AMT.ZE)_OFFICIAL_AMT.ZE.rows.forEach(function(row,i){row.label=String(i+1);});
    // The legacy july/august slots render the baseline and next-month columns.
    Object.keys(october).forEach(function(code){var d=window._OFFICIAL_AMT&&_OFFICIAL_AMT[code];if(!d||!d.rows)return;d.rows.forEach(function(row,i){row.july=october[code][i];row.august=november[code]?november[code][i]:null;});});
    Object.keys(AUGUST_2026_NOTICE_LINKS).forEach(function(code){delete AUGUST_2026_NOTICE_LINKS[code];});
    Object.keys(novemberLinks).forEach(function(code){AUGUST_2026_NOTICE_LINKS[code]=novemberLinks[code];});
    Object.keys(AUGUST_2026_OFFICIAL_AMOUNTS).forEach(function(code){delete AUGUST_2026_OFFICIAL_AMOUNTS[code];});
    Object.keys(november).forEach(function(code){AUGUST_2026_OFFICIAL_AMOUNTS[code]=november[code];});
    if(Array.isArray(window.KR_AIRLINES)) KR_AIRLINES.forEach(function(al){al.officialNoticeUrl=octoberLinks[al.code]||null;al.hasOfficialNotice=!!(window.AeroHomePlatform&&window.AeroHomePlatform.landingState(al.code).current.status==='verified');});
    // The site copy edit time is not a data collection or feed update time.
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
      var label=(down?'▼ ':'▲ ')+(selected?c.selectedLabel:c.trendPrefix+' ')+(rate>0?'+':'')+rate.toFixed(1)+'%';
      var tip=selected?c.selectedTip:c.trend;
      return '<span title="'+tip+'" style="display:inline-flex;align-items:center;font-size:11px;font-weight:700;color:'+(down?'#075985':'#C62828')+';background:'+(down?'#E0F2FE':'#FFF0F0')+';border:1px solid '+(down?'#BAE6FD':'#FFCDD2')+';border-radius:10px;padding:2px 8px;white-space:nowrap;flex-shrink:0;cursor:default">'+label+'</span>';
    };
    var style=document.getElementById('homeSep20TableFix');if(!style){style=document.createElement('style');style.id='homeSep20TableFix';style.textContent='.al-card .route-table{table-layout:fixed}.al-card .route-table th,.al-card .route-table td{padding-left:5px;padding-right:5px;overflow-wrap:anywhere}.al-card .route-table th:nth-child(1),.al-card .route-table td:nth-child(1){width:34%}.al-card .route-table th:nth-child(2),.al-card .route-table td:nth-child(2){width:22%}.al-card .route-table th:nth-child(3),.al-card .route-table td:nth-child(3){width:25%}.al-card .route-table th:nth-child(4),.al-card .route-table td:nth-child(4){width:19%}.al-card .route-amt-current,.al-card .route-amt-next{white-space:nowrap;font-size:11px}.al-card .route-table-wrap{overflow-x:hidden}';document.head.appendChild(style);}
  }
  function updateHead(){
    var lang=window.getCurrentLang?window.getCurrentLang():'ko';if(lang==='cn')lang='zh';var c=text[lang]||text.en;document.title=c.title;
    var desc=document.querySelector('meta[name="description"]');if(desc)desc.content=c.desc;
    var ogTitle=document.querySelector('meta[property="og:title"]');if(ogTitle)ogTitle.content=c.title;
    var ogDesc=document.querySelector('meta[property="og:description"]');if(ogDesc)ogDesc.content=c.desc;
    var twTitle=document.querySelector('meta[name="twitter:title"]');if(twTitle)twTitle.content=c.title;
    var twDesc=document.querySelector('meta[name="twitter:description"]');if(twDesc)twDesc.content=c.desc;
    var old=document.getElementById('homeSep20Schema');if(old)old.remove();
    var schema=document.createElement('script');schema.id='homeSep20Schema';schema.type='application/ld+json';schema.textContent=JSON.stringify({'@context':'https://schema.org','@type':'WebPage',name:c.title,description:c.desc,url:'https://aero-surcharge.com/',dateModified:stamp,inLanguage:lang,mainEntity:{'@type':'Dataset',name:c.compare,description:c.desc}});document.head.appendChild(schema);
  }
  function patchLandingState(){
    var lang=window.getCurrentLang?window.getCurrentLang():'ko';if(lang==='cn')lang='zh';var c=text[lang]||text.en;
    var statusText=document.getElementById('statusText');
    if(window.AeroHomePlatform)window.AeroHomePlatform.updateStatusText(stamp);
    else if(statusText)statusText.textContent=(lang==='ko'?'사이트 문구 수정: ':'Site text edited: ')+stamp.slice(0,16).replace('T',' ')+' KST';
    var compareLink=document.querySelector('[data-i18n="index.quick.compare.name"]');
    if(compareLink&&compareLink.closest('a'))compareLink.closest('a').href='news.html#compareList';
    var forecastLink=document.querySelector('[data-i18n="index.quick.jul.name"]');
    if(forecastLink&&forecastLink.closest('a'))forecastLink.closest('a').href='forecast.html';
    updateHead();
  }
  if(typeof window.renderLanding==='function'){
    var baseRenderLanding=window.renderLanding;
    window.renderLanding=function(){baseRenderLanding();patchLandingState();};
  }
  function patchNotApplicableRows(){
    var lang=window.getCurrentLang?window.getCurrentLang():'ko';if(lang==='cn')lang='zh';
    var label={ko:'해당 노선 없음',en:'No applicable route',ja:'該当路線なし',zh:'无适用航线',fr:'Aucune ligne applicable',de:'Keine passende Strecke'}[lang]||'No applicable route';
    document.querySelectorAll('.al-card').forEach(function(card){
      var code=card.querySelector('.card-code');if(!code)return;
      if(code.textContent.trim()==='ZE'){
        var heading=card.querySelector('.route-table th');
        if(heading)heading.textContent={ko:'노선군',en:'Route group',ja:'路線群',zh:'航线组',fr:'Groupe de lignes',de:'Streckengruppe'}[lang]||'Route group';
        return;
      }
      if(code.textContent.trim()!=='YP')return;
      card.querySelectorAll('tbody tr').forEach(function(row){
        var current=row.querySelector('.route-amt-current');var next=row.querySelector('.route-amt-next');
        if(!current||!next||current.textContent.trim()!=='-'||!next.querySelector('.prepub'))return;
        next.textContent=label;next.style.color='var(--muted)';next.style.fontWeight='400';
        if(row.lastElementChild)row.lastElementChild.textContent='-';
      });
    });
  }
  if(typeof window.renderCards==='function'){
    var baseRenderCards=window.renderCards;
    window.renderCards=function(){var result=baseRenderCards.apply(this,arguments);patchNotApplicableRows();return result;};
  }
  function refresh(now){
    installCopy(now);installData();updateHead();
    if(window.applyLanguage) window.applyLanguage(window.getCurrentLang?window.getCurrentLang():'ko');
    if(typeof window.renderLanding==='function')window.renderLanding();
    if(typeof window.renderBookingDecision==='function')window.renderBookingDecision();
    if(window._searchCtx&&typeof window.renderCards==='function')window.renderCards('all');
    patchNotApplicableRows();
  }
  window.refreshAeroHomeCopy=refresh;
  window.addEventListener('aero:notice-period-change',function(){refresh();});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){refresh();});else refresh();
})();
