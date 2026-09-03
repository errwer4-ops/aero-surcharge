(function(){
  'use strict';
  var latest = {
    asOf: '2026.09.02 07:30 KST',
    currentMonth: '2026-09',
    forecastTargetMonth: '2026-10',
    septemberLevel: 21,
    septemberBaselineUsdPerBbl: 149.29,
    septemberBaselineCentsPerGal: 355.46,
    octoberWindow: '2026.08.16~2026.09.15',
    usdKrw: 1374.36,
    jpy100Krw: 858,
    singaporeJetFuelDate: '2026.08.27',
    singaporeJetFuelFlatUsdPerBbl: 142.93,
    singaporeJetFuelVsBaselineUsd: -6.36,
    singaporeJetFuelVsBaselinePct: -4.3,
    brentUsdPerBbl: 94.65,
    brentChangeUsd: 4.16,
    brentPct: 4.6,
    wtiUsdPerBbl: 90.22,
    wtiChangeUsd: 4.46,
    wtiPct: 5.2,
    asiaDistillateImportsBpd: '5.10 million bpd',
    middleEastDistillateExportsBpd: '2.14 million bpd',
    iranCrudeExportsBpd: '220,000~255,000 bpd'
  };
  window.AERO_MARKET_NUMBERS_20260902 = Object.assign({}, window.AERO_MARKET_NUMBERS_LATEST || {}, latest);
  window.AERO_MARKET_NUMBERS_LATEST = window.AERO_MARKET_NUMBERS_20260902;
  window.AERO_MARKET_SNAPSHOTS = Object.assign({}, window.AERO_MARKET_SNAPSHOTS || {}, {'2026-09-02': window.AERO_MARKET_NUMBERS_20260902});

  function lang(){
    var v = (localStorage.getItem('aero_lang') || document.documentElement.lang || 'ko').toLowerCase();
    if(v === 'kr') return 'ko';
    if(v === 'cn') return 'zh';
    return ['ko','en','ja','zh','fr','de'].indexOf(v) >= 0 ? v : 'en';
  }
  if(typeof window.normalizeNewsLang !== 'function'){
    window.normalizeNewsLang = function(value){
      var v = String(value || 'ko').toLowerCase();
      if(v === 'kr') return 'ko';
      if(v === 'cn') return 'zh';
      return ['ko','en','ja','zh','fr','de'].indexOf(v) >= 0 ? v : 'en';
    };
  }
  function esc(s){
    return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; });
  }
  function setText(key, val){
    document.querySelectorAll('[data-i18n="'+key+'"]').forEach(function(el){ el.textContent = val; });
  }
  function setHtml(key, val){
    document.querySelectorAll('[data-i18n="'+key+'"]').forEach(function(el){ el.innerHTML = val; });
  }
  function pathIs(name){
    return new RegExp('/'+name+'(?:\\.html)?(?:$|[?#])').test(location.pathname + location.search);
  }
  function updateHead(title, desc, url){
    if(title) document.title = title;
    var meta = document.querySelector('meta[name="description"]');
    if(meta && desc) meta.setAttribute('content', desc);
    var ogTitle = document.querySelector('meta[property="og:title"]');
    if(ogTitle && title) ogTitle.setAttribute('content', title);
    var ogDesc = document.querySelector('meta[property="og:description"]');
    if(ogDesc && desc) ogDesc.setAttribute('content', desc);
    var canonical = document.querySelector('link[rel="canonical"]');
    if(canonical && url) canonical.setAttribute('href', url);
  }

  var rows = {
    ko: [
      ['10월 종합','보합 중심 · 인하 가능성 유지 · 상승 리스크 급증 · 신뢰도 낮음~보통','환율과 8월 말 항공유는 인하 요인이지만 9월 1일 이후 원유·호르무즈·정제품 위험이 급등했습니다.'],
      ['USD/KRW','2026.09.02 07:30 KST 이전 최근 약 1,374.36원 · 100엔 약 858원','원화 부과액의 매우 강한 하락 요인입니다. 단계 자체를 직접 낮추는 변수는 아닙니다.'],
      ['Singapore Jet Fuel / MOPS','2026.08.27 Singapore Jet Fuel flat price 142.93달러/bbl · 9월 Baseline 149.29달러보다 -4.3%','10월 인하 조건은 남아 있습니다. 단, 10월 산정기간 평균 MOPS가 아니라 최근 공개 시장 참고값입니다.'],
      ['국제유가','2026.09.01 종가 Brent 94.65달러(+4.6%) · WTI 90.22달러(+5.2%)','미·이란 군사충돌 재확대로 10월 Jet Fuel 재상승 위험이 크게 커졌습니다.'],
      ['호르무즈·정제품 공급','VLCC 2척 피격 보도 · 아시아 distillate 수입 5.10m bpd · 중동 수출 2.14m bpd','공격 주체는 미확인입니다. 운송·보험·정제품 공급 위험은 상승 요인입니다.']
    ],
    en: [
      ['October overall','Flat-centered · cut chance maintained · upside risk surged · low-to-medium confidence','FX and late-August jet fuel still lean lower, but crude, Hormuz and refined-product risks surged after Sept. 1.'],
      ['USD/KRW','Near KRW 1,374.36 before 2026.09.02 07:30 KST · 100 JPY near KRW 858','Very strong downside factor for KRW-denominated amounts. It does not directly set the surcharge stage.'],
      ['Singapore Jet Fuel / MOPS','Aug. 27 Singapore Jet Fuel flat price USD 142.93/bbl · 4.3% below the September baseline USD 149.29','October cut conditions remain alive. This is a recent public market reference, not the October MOPS average.'],
      ['International crude','Sept. 1 close: Brent USD 94.65 (+4.6%) · WTI USD 90.22 (+5.2%)','Renewed U.S.-Iran clashes sharply raised jet-fuel rebound risk for October.'],
      ['Hormuz and refined products','Reports of two VLCCs hit · Asia distillate imports 5.10m bpd · Middle East exports 2.14m bpd','Attacker attribution is unconfirmed. Shipping, insurance and refined-product supply risks are upside factors.']
    ]
  };
  rows.ja = [
    ['10月総合','横ばい中心 · 引き下げ可能性維持 · 上昇リスク急増 · 信頼度低~中','為替と8月末の航空燃料は下方向だが、9月1日以降に原油・ホルムズ・石油製品リスクが急上昇。'],
    ['USD/KRW','2026.09.02 07:30 KST前の直近約1,374.36ウォン · 100円約858ウォン','ウォン建て金額の非常に強い下押し要因。段階を直接決めるものではありません。'],
    ['Singapore Jet Fuel / MOPS','8月27日Singapore Jet Fuel flat price 142.93ドル/bbl · 9月基準149.29ドルより-4.3%','10月の引き下げ条件は残ります。ただし10月平均MOPSではなく最近の市場参考値です。'],
    ['国際原油','9月1日終値 Brent 94.65ドル(+4.6%) · WTI 90.22ドル(+5.2%)','米・イラン衝突再拡大で10月Jet Fuel再上昇リスクが大きく上昇。'],
    ['ホルムズ・石油製品供給','VLCC 2隻被弾報道 · アジアdistillate輸入5.10m bpd · 中東輸出2.14m bpd','攻撃主体は未確認。輸送・保険・石油製品供給リスクは上昇要因です。']
  ];
  rows.zh = [
    ['10月综合','持平为主 · 下调可能性仍在 · 上行风险急增 · 可信度低~中','汇率和8月末航油偏下行，但9月1日后油价、霍尔木兹和成品油风险急升。'],
    ['USD/KRW','2026.09.02 07:30 KST前近期约1,374.36韩元 · 100日元约858韩元','韩元金额的很强下行因素，但不直接决定档位。'],
    ['Singapore Jet Fuel / MOPS','8月27日Singapore Jet Fuel flat price 142.93美元/bbl · 较9月基准149.29美元低4.3%','10月下调条件仍在。该值是近期公开市场参考，不是10月MOPS均值。'],
    ['国际油价','9月1日收盘 Brent 94.65美元(+4.6%) · WTI 90.22美元(+5.2%)','美伊冲突再扩大使10月航油反弹风险明显上升。'],
    ['霍尔木兹与成品油供应','VLCC两艘遇袭报道 · 亚洲distillate进口5.10m bpd · 中东出口2.14m bpd','攻击方未确认。运输、保险和成品油供应风险是上行因素。']
  ];
  rows.fr = [
    ['Vue octobre','Scénario central stable · baisse encore possible · risque haussier en forte hausse · confiance faible à moyenne','FX et jet fuel fin août restent baissiers, mais pétrole, Hormuz et produits raffinés ont fortement remonté après le 1er septembre.'],
    ['USD/KRW','Env. 1 374,36 KRW avant 2026.09.02 07:30 KST · 100 JPY env. 858 KRW','Très fort facteur baissier pour les montants KRW; ne fixe pas directement le niveau.'],
    ['Singapore Jet Fuel / MOPS','Flat price Singapore Jet Fuel du 27 août: 142.93 USD/bbl · 4.3% sous la base septembre 149.29','La possibilité de baisse reste ouverte. C’est une référence de marché récente, pas la moyenne MOPS d’octobre.'],
    ['Pétrole international','Clôture du 1er sept.: Brent 94.65 USD (+4.6%) · WTI 90.22 USD (+5.2%)','La reprise des tensions États-Unis-Iran augmente fortement le risque de rebond du jet fuel.'],
    ['Hormuz et raffinés','Deux VLCC signalés touchés · importations Asia distillate 5.10m bpd · exportations Moyen-Orient 2.14m bpd','Auteur non confirmé. Transport, assurance et offre de produits raffinés sont des risques haussiers.']
  ];
  rows.de = [
    ['Oktober-Sicht','Stabil im Zentrum · Senkung weiter möglich · Aufwärtsrisiko stark gestiegen · geringe bis mittlere Sicherheit','FX und Jetfuel Ende August sprechen weiter nach unten, aber Öl, Hormuz und Raffinerieprodukte stiegen nach dem 1. September als Risiko stark an.'],
    ['USD/KRW','Vor 2026.09.02 07:30 KST zuletzt ca. 1.374,36 KRW · 100 JPY ca. 858 KRW','Sehr starker Abwärtsfaktor für KRW-Beträge; bestimmt die Stufe nicht direkt.'],
    ['Singapore Jet Fuel / MOPS','27. Aug. Singapore Jet Fuel flat price 142.93 USD/bbl · 4.3% unter September-Basis 149.29','Die Senkungschance bleibt bestehen. Dies ist eine aktuelle Marktreferenz, nicht der Oktober-MOPS-Durchschnitt.'],
    ['Internationales Öl','Schluss 1. Sept.: Brent 94.65 USD (+4.6%) · WTI 90.22 USD (+5.2%)','Neue US-Iran-Konfrontation erhöht das Jetfuel-Rebound-Risiko deutlich.'],
    ['Hormuz und Raffinerieprodukte','Berichte über zwei getroffene VLCCs · Asien-Distillateinfuhren 5.10m bpd · Nahost-Exporte 2.14m bpd','Angreifer nicht bestätigt. Transport-, Versicherungs- und Produktangebotsrisiken wirken nach oben.']
  ];

  function pack(l){
    var r = rows[l] || rows.en;
    var p = {
      ko: {
        title:'2026년 10월 국제선 유류할증료 전망',
        meta:'2026년 10월 국제선 유류할증료 전망 | MOPS·환율·호르무즈',
        desc:'2026년 9월 2일 기준 Singapore Jet Fuel·MOPS, 원달러 환율, 국제유가와 호르무즈 군사상황을 분석해 10월 국제선 유류할증료 인상·인하 가능성을 추적합니다.',
        sub:'2026.09.02 07:30 KST 기준 · 9월 21단계 현재 적용 · 10월 산정기간 진행 중 · 환율 ↓↓↓ / Jet Fuel 최근 ↓↓ / 국제유가 ↑↑↑ / 호르무즈 ↑↑↑ / 정제품 ↑↑',
        notice:'<strong>확인:</strong> 9월 국제선 유류할증료는 21단계로 현재 적용 중입니다. 10월은 아직 공식 공시 전이므로 단계·금액·확률을 확정하지 않습니다.',
        intro:'2026년 9월 2일 기준 10월 국제선 유류할증료는 보합 가능성을 기본으로 보되 인하 가능성도 남아 있습니다. 원/달러 환율은 약 1,374원이고 8월 27일 Singapore Jet Fuel도 9월 산정 평균보다 낮았지만, 미국·이란 군사충돌 재확대와 호르무즈 VLCC 피격 보도로 국제유가와 공급위험이 급격히 상승했습니다.',
        indicator:'2026년 10월 유류할증료 전망 핵심 지표',
        th:['항목','현재 확인 상태','10월 전망에서의 의미'],
        foot:'* 142.93달러는 2026년 8월 27일 Singapore Jet Fuel 시장 flat price 참고값입니다. 10월 산정기간 평균 MOPS 또는 공식 기준유가가 아닙니다.',
        verdictTitle:'2026년 10월 전망 결론',
        verdict1:'10월 단계·노선별 금액은 아직 확정되지 않았습니다.',
        verdict2:'현재 결론은 보합 중심 · 인하 가능성 유지 · 상승 리스크 급증입니다.',
        verdictLong:'신뢰도: 낮음~보통 · 특정 단계 예측 보류',
        keyTitle:'주요 확인 항목',
        newsTitle:'유류할증료 MOPS 환율 호르무즈 최신 뉴스',
        newsMeta:'유류할증료 MOPS 환율 호르무즈 최신 뉴스 | 2026년 9월 2일',
        newsSub:'2026.09.02 07:30 KST 기준 · 9월 21단계 현재 적용 · 10월 전망: 보합 중심 · 인하 가능성 유지 · 상승 리스크 급증',
        note:'※ 유류할증료는 발권일 기준으로 적용됩니다. 9월 공식 공시는 현재 적용 기준선이며, 현재 초점은 10월 전망입니다.',
        latest:'최신 뉴스', previous:'이전 뉴스', archive:'날짜순 아카이브', filters:['전체','항공사 공지','기관','시장'],
        officialTitle:'주요 항공사 2026년 9월 국제선 유류할증료 공식 공시',
        officialNotice:'2026.09.02 07:30 KST 기준 · KE/OZ/LJ/BX/TW/7C/ZE/RS/YP 9월 공시 반영 · 10월 공식 공시는 아직 확인되지 않음',
        officialDesc:'* 9월 공식 공시는 현재 적용 기준선입니다. 10월 단계와 노선별 금액은 항공사 공식 공시 전까지 확정하지 않습니다.',
        link:'공식 공지 ↗', forecastBtn:'10월 전망 보기 →'
      },
      en: {
        title:'October 2026 International Fuel Surcharge Outlook',
        meta:'October 2026 International Fuel Surcharge Outlook | MOPS, FX and Hormuz',
        desc:'As of September 2, 2026, track October surcharge upside and downside using Singapore Jet Fuel, MOPS, USD/KRW, crude oil and Hormuz risk.',
        sub:'As of 2026.09.02 07:30 KST · September Level 21 now applies · October calculation in progress · FX ↓↓↓ / recent Jet Fuel ↓↓ / crude ↑↑↑ / Hormuz ↑↑↑ / refined products ↑↑',
        notice:'<strong>Confirmed:</strong> September international surcharges are now in effect at Level 21. October stage, amounts and probabilities are not confirmed before official airline notices.',
        intro:'As of September 2, 2026, the base case for October international fuel surcharges is flat, with a cut still possible. USD/KRW is near 1,374 and the Aug. 27 Singapore Jet Fuel reference is below the September calculation average, but renewed U.S.-Iran clashes and reports of two VLCCs hit near Hormuz sharply raised crude and supply risks.',
        indicator:'October 2026 Fuel Surcharge Core Indicators',
        th:['Item','Current status','Meaning for October'],
        foot:'* USD 142.93 is the August 27, 2026 Singapore Jet Fuel flat-price reference. It is not the October calculation-period MOPS average or an official fuel basis.',
        verdictTitle:'October 2026 Outlook Conclusion',
        verdict1:'October stage and route amounts are not confirmed yet.',
        verdict2:'Current view: flat-centered, cut chance maintained, upside risk surged.',
        verdictLong:'Confidence: low-to-medium · no specific stage forecast',
        keyTitle:'Key Check Variables',
        newsTitle:'Fuel Surcharge MOPS FX and Hormuz Latest News',
        newsMeta:'Fuel Surcharge MOPS FX and Hormuz Latest News | September 2, 2026',
        newsSub:'As of 2026.09.02 07:30 KST · September Level 21 now applies · October outlook: flat-centered · cut chance maintained · upside risk surged',
        note:'Fuel surcharges apply by ticketing date. September notices are the current baseline; the focus is October forecasting.',
        latest:'Latest News', previous:'Previous News', archive:'Archived by date', filters:['All','Airline notices','Institutions','Market'],
        officialTitle:'Major Airline September 2026 International Fuel Surcharge Official Notices',
        officialNotice:'As of 2026.09.02 07:30 KST · KE/OZ/LJ/BX/TW/7C/ZE/RS/YP September notices reflected · October official notices not yet confirmed',
        officialDesc:'* September notices are the current baseline. October stage and route amounts are not confirmed before official airline notices.',
        link:'Official notice ↗', forecastBtn:'View October outlook →'
      }
    };
    p.ja = Object.assign({}, p.en, {title:'2026年10月国際線燃油サーチャージ見通し', sub:'2026.09.02 07:30 KST時点 · 9月21段階が適用中 · 10月算定中 · 為替↓↓↓ / Jet Fuel直近↓↓ / 原油↑↑↑ / ホルムズ↑↑↑ / 石油製品↑↑', indicator:'2026年10月燃油サーチャージ主要指標', th:['項目','現在の確認状況','10月見通しでの意味'], newsTitle:'燃油サーチャージ MOPS 為替 ホルムズ 最新ニュース', newsSub:'2026.09.02 07:30 KST時点 · 9月21段階適用中 · 10月見通し: 横ばい中心 · 引き下げ可能性維持 · 上昇リスク急増', latest:'最新ニュース', previous:'過去のニュース', archive:'日付順アーカイブ', officialTitle:'主要航空会社 2026年9月国際線燃油サーチャージ公式公示', link:'公式公示 ↗'});
    p.zh = Object.assign({}, p.en, {title:'2026年10月国际线燃油附加费展望', sub:'截至2026.09.02 07:30 KST · 9月第21档适用中 · 10月计算中 · 汇率↓↓↓ / 近期Jet Fuel↓↓ / 油价↑↑↑ / 霍尔木兹↑↑↑ / 成品油↑↑', indicator:'2026年10月燃油附加费核心指标', th:['项目','当前确认状态','对10月展望的意义'], newsTitle:'燃油附加费 MOPS 汇率 霍尔木兹最新新闻', newsSub:'截至2026.09.02 07:30 KST · 9月第21档适用中 · 10月展望：持平为主 · 下调可能性仍在 · 上行风险急增', latest:'最新新闻', previous:'过往新闻', archive:'按日期归档', officialTitle:'主要航空公司2026年9月国际线燃油附加费官方公告', link:'官方公告 ↗'});
    p.fr = Object.assign({}, p.en, {title:'Perspective surtaxe carburant internationale octobre 2026', sub:'Au 2026.09.02 07:30 KST · septembre niveau 21 en vigueur · octobre en calcul · FX ↓↓↓ / Jet Fuel récent ↓↓ / pétrole ↑↑↑ / Hormuz ↑↑↑ / raffinés ↑↑', indicator:'Indicateurs clés de la surtaxe carburant octobre 2026', th:['Élément','État actuel','Sens pour octobre'], newsTitle:'Actualités surtaxe carburant MOPS FX et Hormuz', newsSub:'Au 2026.09.02 07:30 KST · septembre niveau 21 en vigueur · octobre: stable central · baisse possible · risque haussier accru', latest:'Dernières nouvelles', previous:'Anciennes nouvelles', archive:'Archive par date', officialTitle:'Avis officiels septembre 2026 des principales compagnies', link:'Avis officiel ↗'});
    p.de = Object.assign({}, p.en, {title:'Oktober-2026 internationaler Treibstoffzuschlag Ausblick', sub:'Stand 2026.09.02 07:30 KST · September Stufe 21 gilt · Oktober läuft · FX ↓↓↓ / aktuelles Jetfuel ↓↓ / Öl ↑↑↑ / Hormuz ↑↑↑ / Produkte ↑↑', indicator:'Oktober-2026 Kernindikatoren für Treibstoffzuschlag', th:['Punkt','Aktueller Stand','Bedeutung für Oktober'], newsTitle:'Treibstoffzuschlag MOPS FX und Hormuz News', newsSub:'Stand 2026.09.02 07:30 KST · September Stufe 21 gilt · Oktober: stabil zentral · Senkung möglich · Aufwärtsrisiko gestiegen', latest:'Neueste Nachrichten', previous:'Frühere Nachrichten', archive:'Nach Datum archiviert', officialTitle:'Offizielle September-2026 Hinweise wichtiger Airlines', link:'Offizieller Hinweis ↗'});
    p.cn = p.zh;
    var out = p[l] || p.en;
    out.rows = r;
    out.summary = r.map(function(x){ return x[0]+': '+x[1]+' - '+x[2]; });
    out.predict = r.map(function(x, i){ return [x[0], x[1], i === 1 || i === 2 ? 'down' : (i >= 3 ? 'up' : 'neutral')]; });
    out.keyVars = r.map(function(x){ return x[0]+': '+x[1]; });
    return out;
  }

  var noticeUrls = {
    officialKe:'https://www.koreanair.com/contents/footer/customer-support/notice/2026/2609-infuel',
    officialOz:'https://flyasiana.com/C/KR/KO/customer/notice/detail?id=CM202608180002530123',
    officialLj:'https://www.jinair.com/company/announce/announceView?anceSeq=28662&searchWord=&searchKey=titlCtn&page=1',
    officialBx:'https://www.airbusan.com/content/common/customercenter/noticeDetail?id=4399',
    officialTw:'https://www.twayair.com/app/customerCenter/notice/retrieve/12685',
    official7c:'https://www.jejuair.net/ko/customerServiceCenter/noticeDetail.do?billboardNo=0000000751',
    officialZe:'https://www.eastarjet.com/newstar/PGWCA00002?cId=11&iId=0&bId=653&lang=KR&searchWord=&searchIndex=1',
    officialRs:'https://flyairseoul.com/CW/ko/noticeContent.do?seq=11048&pageNo=1',
    officialYp:'https://www.airpremia.com/a/ko/customer/notice/772'
  };
  function airlineRows(l){
    if(l === 'ko') return [['officialKe','대한항공','9월 KRW 48,000~354,000 · 8월 대비 최소 +12,800원'],['officialOz','아시아나항공','9월 KRW 52,000~290,100 · 8월 대비 최소 +15,400원'],['officialLj','진에어','9월 USD 29~89 · 8월 대비 최소 +USD 9'],['officialBx','에어부산','9월 USD 71/82 · 8월 대비 최소 +USD 24'],['officialTw','티웨이항공','9월 KRW 36,200~247,500 · 8월 대비 최소 +11,800원'],['official7c','제주항공','9월 USD 33~79 · 8월 대비 최소 +USD 11'],['officialZe','이스타항공','9월 USD 33~79 · 8월 대비 최소 +USD 11'],['officialRs','에어서울','9월 KRW 57,700~99,600 · 8월 대비 최소 +18,000원'],['officialYp','에어프레미아','9월 USD 37~228 · 8월 대비 최소 +USD 12']];
    return [['officialKe','Korean Air','September KRW 48,000-354,000 · minimum +KRW 12,800 vs August'],['officialOz','Asiana Airlines','September KRW 52,000-290,100 · minimum +KRW 15,400 vs August'],['officialLj','Jin Air','September USD 29-89 · minimum +USD 9 vs August'],['officialBx','Air Busan','September USD 71/82 · minimum +USD 24 vs August'],['officialTw',"T'way Air",'September KRW 36,200-247,500 · minimum +KRW 11,800 vs August'],['official7c','Jeju Air','September USD 33-79 · minimum +USD 11 vs August'],['officialZe','Eastar Jet','September USD 33-79 · minimum +USD 11 vs August'],['officialRs','Air Seoul','September KRW 57,700-99,600 · minimum +KRW 18,000 vs August'],['officialYp','Air Premia','September USD 37-228 · minimum +USD 12 vs August']];
  }

  function i18n(ko, en, ja, zh, fr, de){
    return {ko:ko, en:en || ko, ja:ja || en || ko, zh:zh || en || ko, cn:zh || en || ko, fr:fr || en || ko, de:de || en || ko};
  }
  var newsCards = [
    {
      id:'us-iran-direct-clash-hormuz-risk-20260902', category:'geo', priority:1, date:'2026-09-02', updatedAt:'2026-09-02T07:30:00+09:00', badge:'군사위험', aiSummary:true, relevanceScore:1, sourceUrl:'forecast.html',
      i18n:i18n(
        {title:'미국·이란 군사충돌 재확대…호르무즈 공급위험 급증', aiBrief:'미국이 이란 혁명수비대 관련 목표물을 추가 공격한 뒤 이란이 요르단 미군기지를 탄도미사일과 드론으로 공격했다고 밝혔습니다.', summary:'이번 사건은 전면전 확정이 아니라 직접 군사충돌 재확대입니다. 호르무즈 원유·정제품 운송의 위험 프리미엄을 크게 높이는 변수입니다.', impact:'10월 유류할증료 전망을 인하 우세에서 보합 중심·상승 리스크 급증으로 조정하는 핵심 뉴스입니다.', sourceName:'AP / Reuters market reports', tags:['미국·이란','호르무즈','군사충돌','10월 전망']},
        {title:'U.S.-Iran clashes re-expand, lifting Hormuz supply risk', aiBrief:'After additional U.S. strikes on IRGC-linked targets, Iran said it attacked U.S. bases in Jordan with missiles and drones.', summary:'This is described as renewed direct military confrontation, not confirmed full-scale war. It raises risk premiums for oil and refined-product shipping through Hormuz.', impact:'Key reason the October outlook moves from cut-leaning to flat-centered with higher upside risk.', sourceName:'AP / Reuters market reports', tags:['U.S.-Iran','Hormuz','military risk','October outlook']})
    },
    {
      id:'two-vlccs-hit-hormuz-20260902', category:'geo', priority:2, date:'2026-09-02', updatedAt:'2026-09-02T07:30:00+09:00', badge:'선박안전', aiSummary:true, relevanceScore:.99, sourceUrl:'forecast.html',
      i18n:i18n(
        {title:'사우디 원유 운반 VLCC 2척, 호르무즈에서 피격', aiBrief:'사우디 원유 약 400만 배럴을 실은 VLCC 2척이 호르무즈를 빠져나오던 중 피격됐다는 보도가 나왔습니다.', summary:'Saudi-flagged Sidr와 Liberian-flagged Senegal Prosperity는 각각 약 200만 배럴을 싣고 있었던 것으로 전해졌습니다. 공격 주체는 확인되지 않았습니다.', impact:'선박운송·보험 위험을 매우 높은 수준으로 끌어올리는 상방 변수입니다.', sourceName:'Financial Times / maritime reports', tags:['VLCC','호르무즈','공격 주체 미확인','보험 위험']},
        {title:'Two Saudi crude VLCCs reportedly hit near Hormuz', aiBrief:'Two VLCCs carrying about 4 million barrels of Saudi crude were reportedly struck while leaving Hormuz.', summary:'The Saudi-flagged Sidr and Liberian-flagged Senegal Prosperity reportedly carried about 2 million barrels each. Attacker attribution remains unconfirmed.', impact:'A major upside factor for shipping and insurance risk.', sourceName:'Financial Times / maritime reports', tags:['VLCC','Hormuz','unconfirmed attacker','insurance risk']})
    },
    {
      id:'brent-wti-five-week-high-20260902', category:'market', priority:3, date:'2026-09-02', updatedAt:'2026-09-02T07:30:00+09:00', badge:'국제유가', aiSummary:true, relevanceScore:.98, sourceUrl:'forecast.html',
      i18n:i18n(
        {title:'Brent 94.65달러·WTI 90.22달러…중동 충돌로 5주 최고', aiBrief:'9월 1일 미국시장 종가 기준 Brent는 94.65달러, WTI는 90.22달러로 급등했습니다.', summary:'Brent는 하루 4.6%, WTI는 5.2% 상승했습니다. 8월 말 항공유 하락 신호와 달리 원유 쪽 상방 압력이 크게 커졌습니다.', impact:'Jet Fuel 재상승 위험을 키워 10월 인하 전망의 신뢰도를 낮춥니다.', sourceName:'WSJ / MarketWatch market close', tags:['Brent 94.65','WTI 90.22','5주 최고','원유 급등']},
        {title:'Brent USD 94.65 and WTI USD 90.22 hit five-week highs', aiBrief:'At the Sept. 1 U.S. close, Brent settled at USD 94.65 and WTI at USD 90.22.', summary:'Brent rose 4.6% and WTI rose 5.2%. This sharply raises crude-side upside pressure even though late-August jet fuel had fallen.', impact:'Raises jet-fuel rebound risk and lowers confidence in an October cut.', sourceName:'WSJ / MarketWatch market close', tags:['Brent 94.65','WTI 90.22','five-week high','crude surge']})
    },
    {
      id:'asia-distillate-supply-tight-20260902', category:'market', priority:4, date:'2026-09-02', updatedAt:'2026-09-02T07:30:00+09:00', badge:'정제품', aiSummary:true, relevanceScore:.96, sourceUrl:'forecast.html',
      i18n:i18n(
        {title:'아시아 Jet Fuel·디젤 공급 타이트…8월 정제품 수입 전쟁 이후 최저', aiBrief:'아시아 light/middle distillate 수입은 8월 약 5.10 million bpd로 줄었습니다.', summary:'7월 5.61 million bpd와 전쟁 전 3개월 평균 7.06 million bpd보다 낮습니다. 중동 정제품 수출도 약 2.14 million bpd로 줄어 물류 정상화가 아직 멀다는 신호입니다.', impact:'8월 27일 Jet Fuel 하락이 곧바로 지속 하락으로 이어진다고 단정하지 않게 하는 공급 상방 변수입니다.', sourceName:'Refined-product flow reference', tags:['Jet Fuel','디젤','정제품 공급','아시아 수입']},
        {title:'Asia jet fuel and diesel supply stays tight as August distillate imports hit post-war low', aiBrief:'Asia light/middle distillate imports fell to about 5.10 million bpd in August.', summary:'This is below July’s 5.61 million bpd and the pre-war three-month average of 7.06 million bpd. Middle East refined-product exports also fell to about 2.14 million bpd.', impact:'A supply-side upside risk that prevents assuming continued jet-fuel declines.', sourceName:'Refined-product flow reference', tags:['Jet Fuel','diesel','distillates','Asia imports']})
    },
    {
      id:'usdkrw-1374-strong-krw-downside-20260902', category:'market', priority:5, date:'2026-09-02', updatedAt:'2026-09-02T07:30:00+09:00', badge:'환율', aiSummary:true, relevanceScore:.95, sourceUrl:'forecast.html',
      i18n:i18n(
        {title:'USD/KRW 약 1,374원…원화 부과액 하락 요인 강화', aiBrief:'2026년 9월 2일 07:30 KST 이전 최근 USD/KRW는 약 1,374.36원 수준입니다.', summary:'최근 환율은 1,394원대에서 1,374원대까지 내려왔습니다. 이는 원화 유류할증료 금액에는 매우 강한 하락 요인이지만, 유류할증료 단계 자체를 직접 낮추는 변수는 아닙니다.', impact:'10월 인하 가능성을 유지시키는 핵심 하방 변수입니다.', sourceName:'FX market reference', tags:['USD/KRW','1,374원','원화 강세','10월 전망']},
        {title:'USD/KRW near 1,374 strengthens KRW amount downside', aiBrief:'Before 2026.09.02 07:30 KST, USD/KRW was near 1,374.36.', summary:'The rate moved down from the 1,394 area to the 1,374 area. This is a strong downside factor for KRW amounts but does not directly set the fuel-surcharge stage.', impact:'A key downside variable keeping the October cut possibility alive.', sourceName:'FX market reference', tags:['USD/KRW','1,374','KRW strength','October outlook']})
    },
    {
      id:'singapore-jetfuel-14293-still-below-baseline-20260902', category:'market', priority:6, date:'2026-09-02', updatedAt:'2026-09-02T07:30:00+09:00', badge:'MOPS', aiSummary:true, relevanceScore:.94, sourceUrl:'forecast.html',
      i18n:i18n(
        {title:'Singapore Jet Fuel 142.93달러…9월 Baseline보다 낮지만 재상승 위험 확대', aiBrief:'마지막 신뢰 가능한 공개 참고값인 8월 27일 Singapore Jet Fuel은 142.93달러/bbl입니다.', summary:'현재 적용 중인 9월 산정 평균 149.29달러보다 6.36달러, 약 4.3% 낮습니다. 다만 9월 1일 원유 급등과 공급 타이트로 9월 초 이후 Jet Fuel 재상승 위험이 커졌습니다.', impact:'인하 가능성은 남기되 보합 중심으로 조정하는 핵심 근거입니다.', sourceName:'Singapore Jet Fuel reference', tags:['Singapore Jet Fuel','142.93','9월 Baseline','재상승 위험']},
        {title:'Singapore Jet Fuel USD 142.93 remains below baseline, but rebound risk grew', aiBrief:'The latest reliable public reference remains the Aug. 27 Singapore Jet Fuel flat price of USD 142.93/bbl.', summary:'It is USD 6.36, or about 4.3%, below the September calculation average of USD 149.29. But the Sept. 1 crude surge and tight supply raised rebound risk.', impact:'Keeps the cut possibility alive while shifting the base case back toward flat.', sourceName:'Singapore Jet Fuel reference', tags:['Singapore Jet Fuel','142.93','September baseline','rebound risk']})
    }
  ];
  var cardLocales = {
    ja: {
      'us-iran-direct-clash-hormuz-risk-20260902': {title:'米国・イラン衝突再拡大、ホルムズ供給リスク急増', aiBrief:'米国の追加攻撃後、イランはヨルダンの米軍基地をミサイルとドローンで攻撃したと発表しました。', summary:'全面戦争確定ではなく、直接軍事衝突の再拡大として扱います。ホルムズの原油・石油製品輸送リスクを押し上げます。', impact:'10月見通しを横ばい中心・上昇リスク急増へ修正する主因です。', sourceName:'AP / Reuters market reports', tags:['米国・イラン','ホルムズ','軍事リスク','10月見通し']},
      'two-vlccs-hit-hormuz-20260902': {title:'サウジ原油VLCC 2隻、ホルムズで被弾報道', aiBrief:'約400万バレルのサウジ原油を積んだVLCC 2隻が被弾したと報じられました。', summary:'SidrとSenegal Prosperityは各約200万バレルを積載していたとされます。攻撃主体は未確認です。', impact:'船舶輸送・保険リスクを非常に高める上昇要因です。', sourceName:'Financial Times / maritime reports', tags:['VLCC','ホルムズ','攻撃主体未確認','保険リスク']},
      'brent-wti-five-week-high-20260902': {title:'Brent 94.65ドル・WTI 90.22ドル、中東衝突で5週高値', aiBrief:'9月1日米国市場終値でBrentは94.65ドル、WTIは90.22ドルへ急騰しました。', summary:'Brentは4.6%、WTIは5.2%上昇しました。8月末の航空燃料下落とは逆に原油側の上昇圧力が強まりました。', impact:'Jet Fuel再上昇リスクを高め、10月引き下げ見通しの信頼度を下げます。', sourceName:'WSJ / MarketWatch market close', tags:['Brent 94.65','WTI 90.22','5週高値','原油急騰']},
      'asia-distillate-supply-tight-20260902': {title:'アジアJet Fuel・ディーゼル供給逼迫、8月輸入は戦争後最低', aiBrief:'アジアのlight/middle distillate輸入は8月に約5.10 million bpdへ低下しました。', summary:'7月5.61 million bpd、戦前3カ月平均7.06 million bpdを下回ります。中東輸出も約2.14 million bpdへ低下しました。', impact:'Jet Fuelがこのまま下がり続けると断定できない供給リスクです。', sourceName:'Refined-product flow reference', tags:['Jet Fuel','ディーゼル','石油製品供給','アジア輸入']},
      'usdkrw-1374-strong-krw-downside-20260902': {title:'USD/KRW約1,374ウォン、ウォン建て負担の下押し強まる', aiBrief:'2026年9月2日07:30 KST前のUSD/KRWは約1,374.36ウォンです。', summary:'1,394ウォン台から1,374ウォン台まで低下しました。ウォン建て金額には強い下押しですが、段階を直接決めません。', impact:'10月引き下げ可能性を残す主要な下方要因です。', sourceName:'FX market reference', tags:['USD/KRW','1,374','ウォン高','10月見通し']},
      'singapore-jetfuel-14293-still-below-baseline-20260902': {title:'Singapore Jet Fuel 142.93ドル、基準下回るが再上昇リスク拡大', aiBrief:'最新の信頼できる公開参考値は8月27日の142.93ドル/bblです。', summary:'9月算定平均149.29ドルより6.36ドル、約4.3%低い水準です。ただし原油急騰と供給逼迫で再上昇リスクが高まりました。', impact:'引き下げ可能性は残しつつ、基本シナリオを横ばい寄りにします。', sourceName:'Singapore Jet Fuel reference', tags:['Singapore Jet Fuel','142.93','9月基準','再上昇リスク']}
    },
    zh: {
      'us-iran-direct-clash-hormuz-risk-20260902': {title:'美伊直接冲突再扩大，霍尔木兹供应风险急升', aiBrief:'美国追加打击后，伊朗称以导弹和无人机攻击约旦美军基地。', summary:'页面将其表述为直接军事冲突再扩大，而非全面战争确认。霍尔木兹原油和成品油运输风险溢价上升。', impact:'这是10月展望转为持平为主、上行风险急增的关键新闻。', sourceName:'AP / Reuters market reports', tags:['美伊','霍尔木兹','军事风险','10月展望']},
      'two-vlccs-hit-hormuz-20260902': {title:'两艘沙特原油VLCC在霍尔木兹遇袭报道', aiBrief:'载有约400万桶沙特原油的两艘VLCC据报在离开霍尔木兹时遇袭。', summary:'Sidr与Senegal Prosperity据称各载约200万桶原油。攻击方尚未确认。', impact:'这是推高航运和保险风险的重要上行因素。', sourceName:'Financial Times / maritime reports', tags:['VLCC','霍尔木兹','攻击方未确认','保险风险']},
      'brent-wti-five-week-high-20260902': {title:'Brent 94.65美元、WTI 90.22美元，中东冲突推至五周高位', aiBrief:'9月1日美国收盘，Brent为94.65美元，WTI为90.22美元。', summary:'Brent上涨4.6%，WTI上涨5.2%。这与8月末航油下行信号相反，显著抬高原油侧压力。', impact:'提高Jet Fuel反弹风险，并降低10月下调判断的可信度。', sourceName:'WSJ / MarketWatch market close', tags:['Brent 94.65','WTI 90.22','五周高位','原油急涨']},
      'asia-distillate-supply-tight-20260902': {title:'亚洲航油和柴油供应紧张，8月成品油进口降至战后低位', aiBrief:'亚洲light/middle distillate进口8月降至约5.10 million bpd。', summary:'低于7月5.61 million bpd和战前三个月均值7.06 million bpd。中东成品油出口也降至约2.14 million bpd。', impact:'这是防止将Jet Fuel下跌简单外推的供应上行风险。', sourceName:'Refined-product flow reference', tags:['Jet Fuel','柴油','成品油供应','亚洲进口']},
      'usdkrw-1374-strong-krw-downside-20260902': {title:'USD/KRW约1,374，韩元金额下行因素增强', aiBrief:'2026年9月2日07:30 KST前，USD/KRW约为1,374.36。', summary:'汇率从1,394附近降至1,374附近。它强烈压低韩元金额，但不直接决定燃油附加费档位。', impact:'这是维持10月下调可能性的关键下行变量。', sourceName:'FX market reference', tags:['USD/KRW','1,374','韩元走强','10月展望']},
      'singapore-jetfuel-14293-still-below-baseline-20260902': {title:'Singapore Jet Fuel 142.93美元低于基准，但反弹风险扩大', aiBrief:'最新可靠公开参考值仍为8月27日142.93美元/bbl。', summary:'比9月计算均值149.29美元低6.36美元，约4.3%。但9月1日原油急涨和供应紧张提高了反弹风险。', impact:'保留下调可能性，同时使基本判断转向持平。', sourceName:'Singapore Jet Fuel reference', tags:['Singapore Jet Fuel','142.93','9月基准','反弹风险']}
    }
  };
  cardLocales.fr = {
    'us-iran-direct-clash-hormuz-risk-20260902': {title:'Reprise des affrontements États-Unis-Iran, risque Hormuz en forte hausse', aiBrief:'Après de nouvelles frappes américaines, l’Iran dit avoir visé des bases américaines en Jordanie par missiles et drones.', summary:'Le site parle d’une reprise de confrontation militaire directe, pas d’une guerre totale confirmée. Le risque de transport pétrole et produits raffinés via Hormuz augmente.', impact:'Raison clé du passage à une vue octobre centrée sur la stabilité avec risque haussier accru.', sourceName:'AP / Reuters market reports', tags:['États-Unis-Iran','Hormuz','risque militaire','octobre']},
    'two-vlccs-hit-hormuz-20260902': {title:'Deux VLCC transportant du brut saoudien signalés touchés près d’Hormuz', aiBrief:'Deux VLCC transportant environ 4 millions de barils de brut saoudien auraient été touchés en quittant Hormuz.', summary:'Sidr et Senegal Prosperity transportaient chacun environ 2 millions de barils selon les rapports. L’auteur de l’attaque n’est pas confirmé.', impact:'Facteur haussier majeur pour le transport et l’assurance.', sourceName:'Financial Times / maritime reports', tags:['VLCC','Hormuz','auteur non confirmé','assurance']},
    'brent-wti-five-week-high-20260902': {title:'Brent 94.65 USD et WTI 90.22 USD, plus haut de cinq semaines', aiBrief:'À la clôture américaine du 1er septembre, Brent était à 94.65 USD et WTI à 90.22 USD.', summary:'Brent a gagné 4.6% et WTI 5.2%. La pression pétrole remonte fortement malgré le signal baissier du jet fuel fin août.', impact:'Accroît le risque de rebond du Jet Fuel et réduit la confiance dans une baisse d’octobre.', sourceName:'WSJ / MarketWatch market close', tags:['Brent 94.65','WTI 90.22','plus haut cinq semaines','pétrole']},
    'asia-distillate-supply-tight-20260902': {title:'Jet Fuel et diesel asiatiques tendus, importations d’août au plus bas depuis la guerre', aiBrief:'Les importations asiatiques de light/middle distillate sont tombées à environ 5.10 million bpd en août.', summary:'Ce niveau est inférieur à juillet et à la moyenne pré-guerre. Les exportations du Moyen-Orient reculent aussi vers 2.14 million bpd.', impact:'Risque d’offre qui empêche de prolonger mécaniquement la baisse du Jet Fuel.', sourceName:'Refined-product flow reference', tags:['Jet Fuel','diesel','produits raffinés','Asie']},
    'usdkrw-1374-strong-krw-downside-20260902': {title:'USD/KRW proche de 1 374, pression baissière accrue sur les montants KRW', aiBrief:'Avant 2026.09.02 07:30 KST, USD/KRW était proche de 1 374,36.', summary:'Le taux est passé de la zone 1 394 à la zone 1 374. Il baisse les montants KRW mais ne fixe pas directement le niveau.', impact:'Variable baissière clé qui maintient possible une baisse d’octobre.', sourceName:'FX market reference', tags:['USD/KRW','1 374','KRW fort','octobre']},
    'singapore-jetfuel-14293-still-below-baseline-20260902': {title:'Singapore Jet Fuel 142.93 USD sous la base, mais risque de rebond accru', aiBrief:'La dernière référence publique fiable reste le prix du 27 août à 142.93 USD/bbl.', summary:'Il est 6.36 USD, soit environ 4.3%, sous la moyenne de septembre 149.29. Mais le pétrole et l’offre tendue augmentent le risque de rebond.', impact:'Maintient la possibilité de baisse tout en ramenant le scénario central vers la stabilité.', sourceName:'Singapore Jet Fuel reference', tags:['Singapore Jet Fuel','142.93','base septembre','rebond']}
  };
  cardLocales.de = {
    'us-iran-direct-clash-hormuz-risk-20260902': {title:'USA-Iran-Konflikt eskaliert erneut, Hormuz-Versorgungsrisiko steigt', aiBrief:'Nach weiteren US-Schlägen erklärte Iran Angriffe auf US-Basen in Jordanien mit Raketen und Drohnen.', summary:'Dies wird als erneute direkte militärische Konfrontation beschrieben, nicht als bestätigter umfassender Krieg. Das Risiko für Öl- und Produkttransporte durch Hormuz steigt.', impact:'Wichtiger Grund für den Oktober-Ausblick: stabil zentral, Senkung möglich, Aufwärtsrisiko stark gestiegen.', sourceName:'AP / Reuters market reports', tags:['USA-Iran','Hormuz','Militärrisiko','Oktober']},
    'two-vlccs-hit-hormuz-20260902': {title:'Zwei VLCCs mit saudischem Rohöl nahe Hormuz getroffen gemeldet', aiBrief:'Zwei VLCCs mit rund 4 Millionen Barrel saudischem Rohöl wurden beim Verlassen von Hormuz getroffen gemeldet.', summary:'Sidr und Senegal Prosperity sollen je rund 2 Millionen Barrel geladen haben. Der Angreifer ist nicht bestätigt.', impact:'Starker Aufwärtsfaktor für Transport- und Versicherungsrisiken.', sourceName:'Financial Times / maritime reports', tags:['VLCC','Hormuz','Angreifer unbestätigt','Versicherung']},
    'brent-wti-five-week-high-20260902': {title:'Brent 94.65 USD und WTI 90.22 USD auf Fünfwochenhoch', aiBrief:'Zum US-Schluss am 1. September lag Brent bei 94.65 USD und WTI bei 90.22 USD.', summary:'Brent stieg um 4.6%, WTI um 5.2%. Damit nimmt der Ölaufwärtsdruck trotz Jetfuel-Entlastung Ende August stark zu.', impact:'Erhöht das Jetfuel-Rebound-Risiko und senkt die Sicherheit einer Oktober-Senkung.', sourceName:'WSJ / MarketWatch market close', tags:['Brent 94.65','WTI 90.22','Fünfwochenhoch','Öl']},
    'asia-distillate-supply-tight-20260902': {title:'Asia Jet Fuel und Diesel knapp, August-Importe auf Nachkriegstief', aiBrief:'Asiens light/middle distillate Importe sanken im August auf etwa 5.10 million bpd.', summary:'Das liegt unter Juli und dem Vorkriegsdurchschnitt. Nahost-Produktexporte fielen ebenfalls auf etwa 2.14 million bpd.', impact:'Angebotsrisiko, das eine einfache Fortschreibung fallender Jetfuel-Preise verhindert.', sourceName:'Refined-product flow reference', tags:['Jet Fuel','Diesel','Raffinerieprodukte','Asien']},
    'usdkrw-1374-strong-krw-downside-20260902': {title:'USD/KRW nahe 1.374 verstärkt Abwärtsdruck auf KRW-Beträge', aiBrief:'Vor 2026.09.02 07:30 KST lag USD/KRW nahe 1.374,36.', summary:'Der Kurs fiel aus dem Bereich 1.394 in den Bereich 1.374. Das senkt KRW-Beträge, bestimmt aber nicht direkt die Stufe.', impact:'Wichtige Abwärtsvariable, die eine Oktober-Senkung möglich hält.', sourceName:'FX market reference', tags:['USD/KRW','1.374','starker KRW','Oktober']},
    'singapore-jetfuel-14293-still-below-baseline-20260902': {title:'Singapore Jet Fuel 142.93 USD unter Basis, aber Rebound-Risiko höher', aiBrief:'Die letzte verlässliche öffentliche Referenz bleibt der 27. August mit 142.93 USD/bbl.', summary:'Das liegt 6.36 USD bzw. rund 4.3% unter dem September-Durchschnitt 149.29. Ölpreissprung und knappes Angebot erhöhen aber das Rebound-Risiko.', impact:'Hält die Senkungschance offen, verschiebt den Basisausblick aber Richtung stabil.', sourceName:'Singapore Jet Fuel reference', tags:['Singapore Jet Fuel','142.93','September-Basis','Rebound']}
  };

  function installNewsCards(){
    var list = Array.isArray(window.FIXED_NEWS) ? window.FIXED_NEWS : (typeof FIXED_NEWS !== 'undefined' && Array.isArray(FIXED_NEWS) ? FIXED_NEWS : null);
    if(!list) return;
    for(var i=list.length-1;i>=0;i--){
      var id = (list[i] && list[i].id) || '';
      if(/20260831|20260828|20260827/.test(id) && !/september-surcharge|airpremia/.test(id)) list.splice(i,1);
    }
    var seen = {};
    list.forEach(function(item){ if(item && item.id) seen[item.id]=true; });
    newsCards.slice().reverse().forEach(function(item){
      if(!seen[item.id]){
        var tr = item.i18n.ko;
        list.unshift(Object.assign({}, item, tr, {sourceUrl:item.sourceUrl}));
      }
    });
    if(typeof FIXED_NEWS !== 'undefined') FIXED_NEWS = list;
    window.FIXED_NEWS = list;
  }

  function renderForecast(){
    if(window.AERO_MARKET_NUMBERS_20260903) return;
    if(!pathIs('forecast')) return;
    var p = pack(lang());
    updateHead(p.meta, p.desc, 'https://aero-surcharge.com/forecast.html');
    setText('fore.pageTitle', p.title);
    setText('fore.pageSub', p.sub);
    setText('fore.section.indicators', p.indicator);
    setHtml('fore.notice', p.notice);
    setText('fore.intro', p.intro);
    ['fore.th.item','fore.th.current','fore.th.impact'].forEach(function(k,i){ setText(k,p.th[i]); });
    var tbody = document.getElementById('indicatorTbody');
    if(tbody) tbody.innerHTML = p.rows.map(function(r){ return '<tr><td><strong>'+esc(r[0])+'</strong></td><td>'+esc(r[1])+'</td><td class="impact-up">'+esc(r[2])+'</td></tr>'; }).join('');
    setText('fore.indicator.footnote', p.foot);
    setText('fore.summary.title', p.indicator);
    setText('fore.summary.updated', '최종 업데이트: ' + latest.asOf + ' · ' + p.rows[0][1]);
    document.querySelectorAll('.summary-card ul, .forecast-summary-card ul').forEach(function(ul){
      ul.innerHTML = p.summary.map(function(s){ return '<li>'+esc(s)+'</li>'; }).join('');
    });
    var verdict = document.getElementById('verdictBox');
    if(verdict) verdict.innerHTML = '<div class="verdict-title">'+esc(p.verdictTitle)+'</div>'+esc(p.verdict1)+'<br>'+esc(p.verdict2)+'<br><br><strong>'+esc(p.verdictLong)+'</strong>';
    var pred = document.getElementById('predictFactors');
    if(pred) pred.innerHTML = p.predict.map(function(it){ return '<div class="predict-factor"><div class="pf-label">'+esc(it[0])+'</div><div class="pf-val '+esc(it[2])+'">'+esc(it[1])+'</div></div>'; }).join('');
    setText('fore.predict.title', p.indicator);
    setText('fore.predict.subtitle', p.rows[0][1]);
    setText('fore.predict.footnote', p.foot);
    setText('fore.keyvars.title', p.keyTitle);
    var keys = document.getElementById('keyVarsGrid');
    if(keys) keys.innerHTML = p.keyVars.map(function(s){ return '<div class="kv-chip">'+esc(s)+'</div>'; }).join('');
    ['scenarioBox','bookingDecisionBox','mopsAnalysisBox'].forEach(function(id){ var el=document.getElementById(id); if(el){ el.innerHTML=''; el.style.display='none'; } });
    updateJsonLd('forecast', p);
    scrubStale();
  }

  function renderNews(){
    if(window.AERO_MARKET_NUMBERS_20260903) return;
    if(!pathIs('news')) return;
    installNewsCards();
    var l = lang();
    var p = pack(l);
    updateHead(p.newsMeta, p.desc, 'https://aero-surcharge.com/news.html');
    setText('news.pageTitle', p.newsTitle);
    setText('news.h1', p.newsTitle);
    setText('news.pageSub', p.newsSub);
    setText('news.surchargeNote', p.note);
    setText('news.dataRef', p.sub);
    setText('news.curSummary', '→ ' + p.rows[0][1]);
    setText('news.marketTitle', p.indicator);
    setText('news.fx', p.rows[1][0] + ': ' + p.rows[1][1] + ' - ' + p.rows[1][2]);
    setText('news.mops', p.rows[2][0] + ': ' + p.rows[2][1] + ' - ' + p.rows[2][2]);
    setText('news.brent', p.rows[3][0] + ': ' + p.rows[3][1] + ' - ' + p.rows[3][2]);
    setText('news.geo', p.rows[4][0] + ': ' + p.rows[4][1] + ' - ' + p.rows[4][2]);
    setText('news.marketSummary', p.rows[0][2]);
    setText('news.fxDominance', p.sub);
    setText('news.summary.title', '9월 현재 적용과 10월 전망 요약');
    setText('news.summary.updated', '최종 업데이트: ' + latest.asOf + ' · ' + p.rows[0][1]);
    document.querySelectorAll('.summary-card ul, .news-summary-card ul, .new-summary-card ul').forEach(function(ul){
      ul.innerHTML = p.summary.map(function(s){ return '<li>'+esc(s)+'</li>'; }).join('');
    });
    ['news.filterAll','news.filterAirline','news.filterInstitution','news.filterMarket'].forEach(function(key, idx){ setText(key, p.filters[idx]); });
    setText('news.decisionLong', '10월 전망: ' + p.rows[0][1]);
    setText('news.decisionTitle', p.verdictTitle);
    setText('news.decisionLine1', '→ ' + p.verdict1);
    setText('news.decisionLine2', '→ ' + p.verdict2);
    setText('news.forecastCta.title', p.title);
    setText('news.forecastCta.desc', p.intro);
    setText('news.forecastCta.btn', p.forecastBtn);
    var official = document.querySelector('.official-summary-box');
    if(official){
      official.innerHTML = '<div class="official-title" data-i18n="news.officialTitle">'+esc(p.officialTitle)+'</div>'
        + '<div data-i18n="news.officialNotice" style="font-size:12px;color:#9A6A00;margin-bottom:10px;padding:6px 10px;background:rgba(255,255,255,.78);border-radius:6px;border-left:3px solid #FFCC80;">'+esc(p.officialNotice)+'</div>'
        + airlineRows(l).map(function(r){ return '<div class="official-item" id="'+esc(r[0])+'"><strong>'+esc(r[1])+'</strong> - '+esc(r[2])+' · <a href="'+esc(noticeUrls[r[0]])+'" target="_blank" rel="noopener noreferrer" style="color:#075985;font-weight:700;">'+esc(p.link)+'</a></div>'; }).join('')
        + '<div class="official-desc" id="officialDesc">'+esc(p.officialDesc)+'</div>';
    }
    if(typeof window.renderNews === 'function' && !window.__AERO_SEP02_RENDERING){
      window.__AERO_SEP02_RENDERING = true;
      try { window.renderNews(); } catch(e) {}
      window.__AERO_SEP02_RENDERING = false;
    }
    relocalizeCards();
    var latestTitle = document.querySelector('.news-section-title[data-section="latest"], .news-section-label.latest .news-section-title');
    var previousTitle = document.querySelector('.news-section-title[data-section="previous"], .news-section-label.previous .news-section-title');
    if(latestTitle) latestTitle.textContent = p.latest;
    if(previousTitle) previousTitle.textContent = p.previous;
    document.querySelectorAll('.news-section-meta, .news-section-sub').forEach(function(el){ if(/Archive|아카이브|アーカイブ|归档|Archiv|보관|date/i.test(el.textContent || '')) el.textContent = p.archive; });
    updateJsonLd('news', p);
    scrubStale();
  }

  function relocalizeCards(){
    var l = lang();
    document.querySelectorAll('.news-card').forEach(function(el){
      var id = el.id || el.getAttribute('data-id') || '';
      var source = newsCards.filter(function(c){ return c.id === id; })[0];
      if(!source) return;
      var tr = (cardLocales[l] && cardLocales[l][id]) || source.i18n[l] || source.i18n.en || source.i18n.ko;
      var title = el.querySelector('.news-title');
      var brief = el.querySelector('.ai-brief, .news-ai-brief');
      var paras = el.querySelectorAll('p, .news-summary');
      var impact = el.querySelector('.news-impact');
      var link = el.querySelector('.news-source, .source-name, a.source');
      if(title) title.textContent = tr.title;
      if(brief) brief.textContent = tr.aiBrief;
      if(paras[0]) paras[0].textContent = tr.summary;
      if(paras[1]) paras[1].textContent = tr.impact;
      if(impact) impact.textContent = tr.impact;
      if(link) link.textContent = tr.sourceName + ' ↗';
    });
  }

  function updateJsonLd(kind, p){
    document.querySelectorAll('script[type="application/ld+json"]').forEach(function(node){
      try{
        var json = JSON.parse(node.textContent || '{}');
        if(json && typeof json === 'object'){
          json.headline = kind === 'news' ? p.newsTitle : p.title;
          json.description = p.desc;
          json.dateModified = '2026-09-02T07:30:00+09:00';
          json.datePublished = json.datePublished || '2026-09-02T07:30:00+09:00';
          node.textContent = JSON.stringify(json);
        }
      }catch(e){}
    });
  }
  function scrubStale(){
    var stale = /2026년 8월 유류할증료와 9월 전망|2026년 8월 국제선 유류할증료 공식 공시|8월 현재 적용|8월 공식 공시 반영|8월 산정 MOPS|USD\/KRW 약 1,386|Singapore Jet Fuel 최근 154\.98|Brent 93\.45|WTI 86\.14|보합~인하 압력 우세|2026\.08\.31 07:15|undefined/i;
    document.querySelectorAll('body *').forEach(function(el){
      if(el.children.length === 0 && stale.test(el.textContent || '')) el.textContent = '';
    });
  }
  function applyAll(){
    if(window.AERO_MARKET_NUMBERS_20260903) return;
    renderForecast();
    renderNews();
  }

  var prevRenderForecast = window.renderForecastPage;
  if(typeof prevRenderForecast === 'function'){
    window.renderForecastPage = function(){ var out = prevRenderForecast.apply(this, arguments); setTimeout(renderForecast, 0); return out; };
  }
  var prevRenderNews = window.renderNews;
  if(typeof prevRenderNews === 'function'){
    window.renderNews = function(){ var out = prevRenderNews.apply(this, arguments); if(!window.__AERO_SEP02_RENDERING) setTimeout(renderNews, 0); return out; };
  }
  var prevApplyLanguage = window.applyLanguage;
  if(typeof prevApplyLanguage === 'function'){
    window.applyLanguage = function(){ var out = prevApplyLanguage.apply(this, arguments); applyAll(); setTimeout(applyAll, 0); return out; };
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyAll);
  else applyAll();
  [0,100,400,900,1600,2600,4200,6200,9000,14000,22000,36000].forEach(function(ms){ setTimeout(applyAll, ms); });
})();
