(function(){
  'use strict';

  var latest = {
    asOf: '2026.09.03 09:45 KST',
    currentMonth: '2026-09',
    forecastTargetMonth: '2026-10',
    septemberLevel: 21,
    augustLevel: 14,
    septemberBaselineUsdPerBbl: 149.29,
    septemberBaselineCentsPerGal: 355.46,
    septemberBaselinePeriod: '2026.07.16~2026.08.15',
    octoberWindow: '2026.08.16~2026.09.15',
    usdKrw: 1361.63,
    jpy100Krw: 856.95,
    singaporeJetFuelDate: '2026.08.27',
    singaporeJetFuelFlatUsdPerBbl: 142.93,
    singaporeJetFuelVsBaselineUsd: -6.36,
    singaporeJetFuelVsBaselinePct: -4.3,
    globalJetFuelUsdPerBbl: 156.85,
    globalJetFuelWeeklyPct: -4.3,
    brentUsdPerBbl: 95.63,
    brentPct: 1.0,
    wtiUsdPerBbl: 91.01,
    wtiPct: 0.9,
    hormuzKplerCommodityVessels: 4,
    hormuzTenDayAverageCommodityVessels: 13,
    iranBlacklistVessels: 56,
    fujairahMiddleDistillateInventory: '1.741 million barrels',
    fujairahMiddleDistillateWeeklyPct: 19
  };
  window.AERO_MARKET_NUMBERS_20260903 = Object.assign({}, window.AERO_MARKET_NUMBERS_LATEST || {}, latest);
  window.AERO_MARKET_NUMBERS_LATEST = window.AERO_MARKET_NUMBERS_20260903;
  window.AERO_MARKET_SNAPSHOTS = Object.assign({}, window.AERO_MARKET_SNAPSHOTS || {}, {'2026-09-03': window.AERO_MARKET_NUMBERS_20260903});

  function normalizeLang(value){
    var v = String(value || localStorage.getItem('aero_lang') || document.documentElement.lang || 'ko').toLowerCase();
    if(v === 'kr') return 'ko';
    if(v === 'cn') return 'zh';
    return ['ko','en','ja','zh','fr','de'].indexOf(v) >= 0 ? v : 'en';
  }
  window.normalizeNewsLang = normalizeLang;
  function lang(){ return normalizeLang(); }
  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function setText(key, val){ document.querySelectorAll('[data-i18n="'+key+'"]').forEach(function(el){ el.textContent = val; }); }
  function setHtml(key, val){ document.querySelectorAll('[data-i18n="'+key+'"]').forEach(function(el){ el.innerHTML = val; }); }
  function pathIs(name){ return new RegExp('/'+name+'(?:\\.html)?(?:$|[?#])').test(location.pathname + location.search); }
  function updateHead(title, desc, url){
    if(title) document.title = title;
    var meta = document.querySelector('meta[name="description"]'); if(meta && desc) meta.setAttribute('content', desc);
    var ogTitle = document.querySelector('meta[property="og:title"]'); if(ogTitle && title) ogTitle.setAttribute('content', title);
    var ogDesc = document.querySelector('meta[property="og:description"]'); if(ogDesc && desc) ogDesc.setAttribute('content', desc);
    var canonical = document.querySelector('link[rel="canonical"]'); if(canonical && url) canonical.setAttribute('href', url);
  }

  var rows = {
    ko: [
      ['10월 종합','보합 중심 · 인하 가능성 유지 · 변동성 매우 높음','환율과 Jet Fuel은 하방, 국제유가와 호르무즈는 상방으로 갈라져 단계·금액은 확정하지 않습니다.'],
      ['USD/KRW','2026.09.03 09:45 KST 전후 약 1,361.63원 · 100엔 약 856.95원','원화 부과액의 매우 강한 하락 요인입니다. 단계 자체를 직접 낮추는 변수는 아닙니다.'],
      ['MOPS/항공유','9월 기준선 149.29달러/bbl · 8월 27일 Singapore Jet Fuel 142.93달러/bbl · 글로벌 Jet Fuel 156.85달러/bbl(-4.3%)','10월 산정기간의 하방 신호입니다. 단 142.93달러와 156.85달러는 10월 확정 MOPS 평균이 아닙니다.'],
      ['국제유가','2026.09.02 미국시장 종가 Brent 95.63달러(+1.0%) · WTI 91.01달러(+0.9%)','원유와 호르무즈 위험은 상방 요인입니다. Jet Fuel 하락 신호와 반대로 작용합니다.'],
      ['호르무즈·정제품 공급','Kpler 공개 추적 commodity vessel 기준 4척 · 이란 blacklist 56척 · Fujairah 재고 +19%','전체 선박 수가 아니라 공개 추적 범위입니다. 운송·보험·정제품 공급 위험은 상승 요인입니다.']
    ],
    en: [
      ['October overall','Flat-centered · cut chance maintained · volatility very high','FX and jet fuel lean lower, while crude oil and Hormuz risk lean higher; no stage or amount is confirmed.'],
      ['USD/KRW','Around KRW 1,361.63 near 2026.09.03 09:45 KST · 100 JPY around KRW 856.95','A very strong downside factor for KRW amounts. It does not directly set the surcharge stage.'],
      ['MOPS / Jet Fuel','September baseline USD 149.29/bbl · Aug. 27 Singapore Jet Fuel USD 142.93/bbl · Global Jet Fuel USD 156.85/bbl (-4.3%)','A downside signal inside the October calculation window. USD 142.93 and USD 156.85 are not confirmed October MOPS averages.'],
      ['International crude','Sept. 2 U.S. close: Brent USD 95.63 (+1.0%) · WTI USD 91.01 (+0.9%)','Crude and Hormuz risk are upside factors and conflict with the weaker jet-fuel signal.'],
      ['Hormuz and refined products','Kpler publicly tracked commodity vessels: 4 · Iran blacklist 56 vessels · Fujairah inventory +19%','This is not total vessel traffic. Shipping, insurance and refined-product supply risks are upside factors.']
    ],
    ja: [
      ['10月総合','横ばい中心 · 引き下げ可能性維持 · 変動性は非常に高い','為替とJet Fuelは下方向、原油とホルムズは上方向に分かれ、段階・金額は確定しません。'],
      ['USD/KRW','2026.09.03 09:45 KST前後で約1,361.63ウォン · 100円約856.95ウォン','ウォン建て金額の非常に強い下押し要因。段階を直接決めるものではありません。'],
      ['MOPS/航空燃料','9月基準149.29ドル/bbl · 8月27日Singapore Jet Fuel 142.93ドル/bbl · Global Jet Fuel 156.85ドル/bbl(-4.3%)','10月算定期間内の下方向シグナルです。ただし10月確定MOPS平均ではありません。'],
      ['国際原油','9月2日米国終値 Brent 95.63ドル(+1.0%) · WTI 91.01ドル(+0.9%)','原油とホルムズリスクは上方向で、Jet Fuelの下落シグナルと逆方向です。'],
      ['ホルムズ・石油製品供給','Kpler公開追跡commodity vessel基準4隻 · イランblacklist 56隻 · Fujairah在庫+19%','全船舶数ではありません。輸送・保険・石油製品供給リスクは上昇要因です。']
    ],
    zh: [
      ['10月综合','持平为主 · 下调可能性仍在 · 波动性很高','汇率和Jet Fuel偏下行，油价和霍尔木兹风险偏上行，档位和金额不确认。'],
      ['USD/KRW','2026.09.03 09:45 KST附近约1,361.63韩元 · 100日元约856.95韩元','韩元金额的很强下行因素，但不直接决定档位。'],
      ['MOPS/航油','9月基准149.29美元/bbl · 8月27日Singapore Jet Fuel 142.93美元/bbl · 全球Jet Fuel 156.85美元/bbl(-4.3%)','这是10月计算期内的下行信号，但不是10月确定MOPS均值。'],
      ['国际油价','9月2日美国收盘 Brent 95.63美元(+1.0%) · WTI 91.01美元(+0.9%)','原油和霍尔木兹风险是上行因素，与Jet Fuel走弱信号相反。'],
      ['霍尔木兹与成品油供应','Kpler公开追踪commodity vessel 기준4艘 · 伊朗blacklist 56艘 · Fujairah库存+19%','这不是全部船舶数量。运输、保险和成品油供应风险是上行因素。']
    ],
    fr: [
      ['Vue octobre','Scénario central stable · baisse encore possible · volatilité très élevée','FX et Jet Fuel poussent vers le bas, pétrole et Hormuz vers le haut; aucun niveau ni montant confirmé.'],
      ['USD/KRW','Env. 1 361,63 KRW vers 2026.09.03 09:45 KST · 100 JPY env. 856,95 KRW','Très fort facteur baissier pour les montants en KRW, sans fixer directement le niveau.'],
      ['MOPS / Jet Fuel','Base septembre 149.29 USD/bbl · Singapore Jet Fuel du 27 août 142.93 USD/bbl · Global Jet Fuel 156.85 USD/bbl (-4.3%)','Signal baissier dans la période de calcul d’octobre, mais pas une moyenne MOPS confirmée pour octobre.'],
      ['Pétrole international','Clôture US du 2 sept.: Brent 95.63 USD (+1.0%) · WTI 91.01 USD (+0.9%)','Le pétrole et Hormuz restent haussiers et contredisent le signal plus faible du Jet Fuel.'],
      ['Hormuz et raffinés','Commodity vessels suivis publiquement par Kpler: 4 · blacklist Iran 56 navires · stocks Fujairah +19%','Ce n’est pas le trafic total. Transport, assurance et produits raffinés sont des risques haussiers.']
    ],
    de: [
      ['Oktober-Sicht','Stabil im Zentrum · Senkung weiter möglich · Volatilität sehr hoch','FX und Jetfuel wirken nach unten, Öl und Hormuz nach oben; Stufe und Betrag sind nicht bestätigt.'],
      ['USD/KRW','Um 2026.09.03 09:45 KST ca. 1.361,63 KRW · 100 JPY ca. 856,95 KRW','Sehr starker Abwärtsfaktor für KRW-Beträge; bestimmt die Stufe nicht direkt.'],
      ['MOPS / Jetfuel','September-Basis 149.29 USD/bbl · 27. Aug. Singapore Jet Fuel 142.93 USD/bbl · Global Jet Fuel 156.85 USD/bbl (-4.3%)','Abwärtssignal im Oktober-Fenster, aber kein bestätigter Oktober-MOPS-Durchschnitt.'],
      ['Internationales Öl','US-Schluss 2. Sept.: Brent 95.63 USD (+1.0%) · WTI 91.01 USD (+0.9%)','Öl und Hormuz wirken nach oben und laufen gegen das schwächere Jetfuel-Signal.'],
      ['Hormuz und Raffinerieprodukte','Kpler öffentlich erfasste commodity vessels: 4 · Iran blacklist 56 Schiffe · Fujairah Lager +19%','Nicht der gesamte Schiffsverkehr. Transport, Versicherung und Produkte wirken nach oben.']
    ]
  };

  var packs = {
    ko: {
      title:'2026년 10월 국제선 유류할증료 전망',
      meta:'2026년 10월 국제선 유류할증료 전망 | MOPS·환율·호르무즈',
      desc:'2026년 9월 3일 기준 Singapore Jet Fuel·MOPS, 원달러 환율, 국제유가와 호르무즈 해협 상황을 분석해 10월 국제선 유류할증료 인상·인하 가능성을 추적합니다.',
      sub:'2026.09.03 09:45 KST 기준 · 9월 21단계 현재 적용 · 10월 산정기간 진행 중 · 환율 ↓↓↓ / Jet Fuel ↓↓ / 국제유가 ↑↑↑ / 호르무즈 ↑↑↑ / 공급 ↕',
      notice:'<strong>확인:</strong> 9월 국제선 유류할증료는 21단계로 현재 적용 중입니다. 10월은 산정기간 진행 중이며 공식 공시 전까지 단계·금액·확률을 확정하지 않습니다.',
      intro:'2026년 9월 3일 기준 10월 국제선 유류할증료는 보합 가능성을 기본으로 보되 인하 가능성도 유지되고 있습니다. 원/달러 환율은 약 1,361.63원까지 내려왔고 글로벌 Jet Fuel도 주간 4.3% 하락했지만, Brent와 WTI가 각각 95.63달러와 91.01달러까지 상승하고 호르무즈 통항과 미·이란 군사위험도 악화돼 변동성이 매우 높은 상태입니다.',
      indicator:'2026년 10월 유류할증료 전망 핵심 지표',
      th:['항목','현재 확인 상태','10월 전망에서의 의미'],
      foot:'* 142.93달러는 2026년 8월 27일 Singapore Jet Fuel 시장 flat price 참고값입니다. 156.85달러는 글로벌 Jet Fuel 주간 평균입니다. 둘 다 10월 확정 Singapore MOPS 평균이 아닙니다.',
      verdictTitle:'2026년 10월 전망 결론',
      verdict1:'10월 단계·노선별 금액은 아직 확정되지 않았습니다.',
      verdict2:'현재 결론은 보합 중심 · 인하 가능성 유지 · 변동성 매우 높음입니다.',
      verdictLong:'신뢰도: 낮음~보통 · 공식 공시 전 특정 단계 예측 보류',
      keyTitle:'주요 확인 항목',
      keyVars:['9월 21단계 현재 적용','USD/KRW 약 1,361.63원','MOPS/항공유: 142.93 · 156.85달러','국제유가: Brent 95.63 · WTI 91.01','호르무즈 공개 추적 4척 · blacklist 56척'],
      newsTitle:'2026년 10월 유류할증료와 9월 적용 뉴스',
      newsMeta:'2026년 10월 유류할증료 전망 뉴스 | MOPS·환율·호르무즈',
      newsSub:'2026.09.03 09:45 KST 기준 · 9월 21단계 현재 적용 · 10월 전망: 보합 중심 · 인하 가능성 유지 · 변동성 매우 높음',
      note:'※ 유류할증료는 발권일 기준으로 적용됩니다. 9월 공식 공시는 현재 적용 기준선이며, 현재 초점은 10월 전망입니다.',
      latest:'최신 뉴스', previous:'이전 뉴스', archive:'날짜순 아카이브', filters:['전체','항공사 공지','기관','시장'],
      officialTitle:'주요 항공사 2026년 9월 국제선 유류할증료 공식 공시',
      officialNotice:'2026.09.03 09:45 KST 기준 · KE/OZ/LJ/BX/TW/7C/ZE/RS/YP 9월 공시 반영 · 10월 공식 공시는 아직 확인되지 않음',
      officialDesc:'* 9월 공식 공시는 현재 적용 기준선입니다. 10월 단계와 노선별 금액은 항공사 공식 공시 전까지 확정하지 않습니다.',
      link:'공식 공지 ↗', forecastBtn:'10월 전망 보기 →'
    },
    en: {
      title:'October 2026 International Fuel Surcharge Outlook',
      meta:'October 2026 International Fuel Surcharge Outlook | MOPS, FX and Hormuz',
      desc:'As of September 3, 2026, track October fuel surcharge direction using Singapore Jet Fuel, MOPS, USD/KRW, crude oil and Hormuz Strait risk.',
      sub:'As of 2026.09.03 09:45 KST · September Level 21 now applies · October calculation in progress · FX ↓↓↓ / Jet Fuel ↓↓ / crude ↑↑↑ / Hormuz ↑↑↑ / supply ↕',
      notice:'<strong>Confirmed:</strong> September international surcharges are now in effect at Level 21. October remains in calculation, and no stage, amount or probability is confirmed before official airline notices.',
      intro:'As of September 3, 2026, October international fuel surcharges remain flat-centered, while the chance of a cut is still alive. USD/KRW has moved down near 1,361.63 and global Jet Fuel fell 4.3% week over week, but Brent and WTI rose to USD 95.63 and USD 91.01, while Hormuz traffic and U.S.-Iran military risk worsened. Volatility is very high.',
      indicator:'October 2026 Fuel Surcharge Core Indicators',
      th:['Item','Current status','Meaning for October'],
      foot:'* USD 142.93 is the Aug. 27 Singapore Jet Fuel flat-price reference. USD 156.85 is a global Jet Fuel weekly average. Neither is a confirmed October Singapore MOPS average.',
      verdictTitle:'October 2026 Outlook Conclusion',
      verdict1:'October stage and route amounts are not confirmed yet.',
      verdict2:'Current view: flat-centered, cut chance maintained, volatility very high.',
      verdictLong:'Confidence: low-to-medium · no specific stage forecast before official notices',
      keyTitle:'Key Check Variables',
      keyVars:['September Level 21 currently applies','USD/KRW around 1,361.63','MOPS/Jet Fuel: USD 142.93 · 156.85','Crude: Brent 95.63 · WTI 91.01','Hormuz public tracking 4 vessels · blacklist 56'],
      newsTitle:'October 2026 Fuel Surcharge and September Baseline News',
      newsMeta:'October 2026 Fuel Surcharge Outlook News | MOPS, FX and Hormuz',
      newsSub:'As of 2026.09.03 09:45 KST · September Level 21 now applies · October outlook: flat-centered · cut chance maintained · volatility very high',
      note:'Fuel surcharges apply by ticketing date. September notices are the current baseline; the focus is October forecasting.',
      latest:'Latest News', previous:'Previous News', archive:'Archived by date', filters:['All','Airline notices','Institutions','Market'],
      officialTitle:'Major Airline September 2026 International Fuel Surcharge Official Notices',
      officialNotice:'As of 2026.09.03 09:45 KST · KE/OZ/LJ/BX/TW/7C/ZE/RS/YP September notices reflected · October official notices not yet confirmed',
      officialDesc:'* September notices are the current baseline. October stage and route amounts are not confirmed before official airline notices.',
      link:'Official notice ↗', forecastBtn:'View October outlook →'
    }
  };
  packs.ja = Object.assign({}, packs.en, {title:'2026年10月国際線燃油サーチャージ見通し', meta:'2026年10月国際線燃油サーチャージ見通し | MOPS・為替・ホルムズ', desc:'2026年9月3日時点のSingapore Jet Fuel、MOPS、USD/KRW、原油、ホルムズリスクから10月国際線燃油サーチャージを追跡します。', sub:'2026.09.03 09:45 KST時点 · 9月21段階が適用中 · 10月算定中 · 為替↓↓↓ / Jet Fuel↓↓ / 原油↑↑↑ / ホルムズ↑↑↑ / 供給↕', indicator:'2026年10月燃油サーチャージ主要指標', th:['項目','現在の確認状況','10月見通しでの意味'], latest:'最新ニュース', previous:'過去のニュース', archive:'日付順アーカイブ', filters:['すべて','航空会社公示','機関','市場'], officialTitle:'主要航空会社 2026年9月国際線燃油サーチャージ公式公示', link:'公式公示 ↗', newsTitle:'2026年10月燃油サーチャージと9月適用ニュース', newsSub:'2026.09.03 09:45 KST時点 · 9月21段階適用中 · 10月見通し: 横ばい中心 · 引き下げ可能性維持 · 変動性は非常に高い'});
  packs.zh = Object.assign({}, packs.en, {title:'2026年10月国际线燃油附加费展望', meta:'2026年10月国际线燃油附加费展望 | MOPS·汇率·霍尔木兹', desc:'截至2026年9月3日，用Singapore Jet Fuel、MOPS、USD/KRW、油价和霍尔木兹风险追踪10月国际线燃油附加费。', sub:'截至2026.09.03 09:45 KST · 9月第21档适用中 · 10月计算中 · 汇率↓↓↓ / Jet Fuel↓↓ / 油价↑↑↑ / 霍尔木兹↑↑↑ / 供应↕', indicator:'2026年10月燃油附加费核心指标', th:['项目','当前确认状态','对10月展望的意义'], latest:'最新新闻', previous:'过往新闻', archive:'按日期归档', filters:['全部','航空公司公告','机构','市场'], officialTitle:'主要航空公司2026年9月国际线燃油附加费官方公告', link:'官方公告 ↗', newsTitle:'2026年10月燃油附加费与9月适用新闻', newsSub:'截至2026.09.03 09:45 KST · 9月第21档适用中 · 10月展望：持平为主 · 下调可能性仍在 · 波动性很高'});
  packs.cn = packs.zh;
  packs.fr = Object.assign({}, packs.en, {title:'Perspective surtaxe carburant internationale octobre 2026', meta:'Perspective octobre 2026 | MOPS, FX et Hormuz', desc:'Au 3 septembre 2026, suivi de la surtaxe carburant internationale d’octobre avec Singapore Jet Fuel, MOPS, USD/KRW, pétrole et Hormuz.', sub:'Au 2026.09.03 09:45 KST · septembre niveau 21 en vigueur · octobre en calcul · FX ↓↓↓ / Jet Fuel ↓↓ / pétrole ↑↑↑ / Hormuz ↑↑↑ / offre ↕', indicator:'Indicateurs clés de la surtaxe carburant octobre 2026', th:['Élément','État actuel','Sens pour octobre'], latest:'Dernières nouvelles', previous:'Anciennes nouvelles', archive:'Archive par date', filters:['Tout','Avis compagnies','Institutions','Marché'], officialTitle:'Avis officiels septembre 2026 des principales compagnies', link:'Avis officiel ↗', newsTitle:'Actualités surtaxe carburant octobre 2026 et base septembre', newsSub:'Au 2026.09.03 09:45 KST · septembre niveau 21 en vigueur · octobre: stable central · baisse possible · volatilité très élevée'});
  packs.de = Object.assign({}, packs.en, {title:'Oktober-2026 internationaler Treibstoffzuschlag Ausblick', meta:'Oktober-2026 Ausblick | MOPS, FX und Hormuz', desc:'Stand 3. September 2026: Ausblick auf Oktober-Zuschläge mit Singapore Jet Fuel, MOPS, USD/KRW, Öl und Hormuz-Risiko.', sub:'Stand 2026.09.03 09:45 KST · September Stufe 21 gilt · Oktober läuft · FX ↓↓↓ / Jetfuel ↓↓ / Öl ↑↑↑ / Hormuz ↑↑↑ / Angebot ↕', indicator:'Oktober-2026 Kernindikatoren für Treibstoffzuschlag', th:['Punkt','Aktueller Stand','Bedeutung für Oktober'], latest:'Neueste Nachrichten', previous:'Frühere Nachrichten', archive:'Nach Datum archiviert', filters:['Alle','Airline-Hinweise','Institutionen','Markt'], officialTitle:'Offizielle September-2026 Hinweise wichtiger Airlines', link:'Offizieller Hinweis ↗', newsTitle:'Oktober-2026 Treibstoffzuschlag und September-Basis News', newsSub:'Stand 2026.09.03 09:45 KST · September Stufe 21 gilt · Oktober: stabil zentral · Senkung möglich · Volatilität sehr hoch'});
  function pack(l){ var p = packs[l] || packs.en; p.rows = rows[l] || rows.en; p.summary = p.rows.map(function(r){ return r[0]+': '+r[1]+' - '+r[2]; }); return p; }

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

  function multi(ko,en,ja,zh,fr,de){ return {ko:ko,en:en,ja:ja||en,zh:zh||en,cn:zh||en,fr:fr||en,de:de||en}; }
  var newsCards = [
    {id:'hormuz-public-tracking-four-vessels-20260903', category:'geo', priority:1, date:'2026-09-03', updatedAt:'2026-09-03T09:45:00+09:00', badge:'호르무즈', aiSummary:true, relevanceScore:1, sourceUrl:'forecast.html', i18n:multi(
      {title:'호르무즈 공개통항 4척…10일 평균 크게 하회', aiBrief:'Kpler 공개 추적 기준 화요일 호르무즈 commodity vessel 통항은 4척으로 전날 10척, 10일 평균 약 13척보다 적었습니다.', summary:'이 수치는 전체 선박 통항량이 아니라 공개 추적 가능한 commodity vessel 기준입니다. AIS 비활성 선박 등은 누락될 수 있습니다.', impact:'호르무즈가 정상화됐다고 보기 어려워 10월 유류할증료의 해상운송·보험 위험을 높이는 변수입니다.', sourceName:'Reuters cited Kpler public tracking', tags:['Hormuz','Kpler 4 vessels','commodity vessel','10월 전망']},
      {title:'Hormuz public tracking falls to 4 vessels, far below the 10-day average', aiBrief:'Kpler public tracking showed 4 commodity vessels through Hormuz on Tuesday, below 10 the prior day and about 13 on the 10-day average.', summary:'This is not total vessel traffic. It covers publicly tracked commodity vessels, and AIS-off ships may be missing.', impact:'The data argues against calling Hormuz normalized and keeps maritime and insurance risk high for October surcharges.', sourceName:'Reuters cited Kpler public tracking', tags:['Hormuz','Kpler 4 vessels','commodity vessel','October outlook']},
      {title:'ホルムズ公開追跡は4隻、10日平均を大きく下回る', aiBrief:'Kpler公開追跡では火曜日のホルムズcommodity vessel通航が4隻で、前日10隻、10日平均約13隻を下回りました。', summary:'これは全船舶数ではなく公開追跡可能なcommodity vessel基準です。AISオフの船舶は含まれない可能性があります。', impact:'正常化とは言いにくく、10月サーチャージの海上輸送・保険リスクを高めます。', sourceName:'Reuters cited Kpler public tracking', tags:['ホルムズ','Kpler 4隻','commodity vessel','10月見通し']},
      {title:'霍尔木兹公开追踪仅4艘，明显低于10日均值', aiBrief:'Kpler公开追踪显示，周二霍尔木兹commodity vessel通航为4艘，低于前日10艘和10日均值约13艘。', summary:'这不是全部船舶通航量，而是公开可追踪commodity vessel口径，关闭AIS的船舶可能缺失。', impact:'该数据不支持霍尔木兹已正常化的判断，10月燃油附加费的海运和保险风险仍高。', sourceName:'Reuters cited Kpler public tracking', tags:['霍尔木兹','Kpler 4艘','commodity vessel','10月展望']},
      {title:'Hormuz: suivi public à 4 navires, bien sous la moyenne de 10 jours', aiBrief:'Le suivi public Kpler indique 4 commodity vessels mardi, contre 10 la veille et environ 13 en moyenne sur 10 jours.', summary:'Ce n’est pas le trafic total: le chiffre couvre les commodity vessels suivis publiquement, avec possibles absences AIS.', impact:'Hormuz ne peut pas être qualifié de normalisé; le risque transport et assurance reste élevé pour octobre.', sourceName:'Reuters cited Kpler public tracking', tags:['Hormuz','Kpler 4 navires','commodity vessel','octobre']},
      {title:'Hormuz öffentlich nur 4 Schiffe erfasst, deutlich unter 10-Tage-Schnitt', aiBrief:'Kpler sah am Dienstag 4 öffentlich erfasste commodity vessels durch Hormuz, nach 10 am Vortag und ca. 13 im 10-Tage-Schnitt.', summary:'Das ist nicht der gesamte Schiffsverkehr, sondern öffentlich verfolgte commodity vessels; AIS-off-Schiffe können fehlen.', impact:'Eine Normalisierung ist daraus nicht abzuleiten; Transport- und Versicherungsrisiko bleibt für Oktober hoch.', sourceName:'Reuters cited Kpler public tracking', tags:['Hormuz','Kpler 4 Schiffe','commodity vessel','Oktober']})},
    {id:'iran-vessel-blacklist-56-20260903', category:'geo', priority:2, date:'2026-09-03', updatedAt:'2026-09-03T09:45:00+09:00', badge:'해상보험', aiSummary:true, relevanceScore:.99, sourceUrl:'forecast.html', i18n:multi(
      {title:'이란, 호르무즈 선박 블랙리스트 56척으로 확대', aiBrief:'이란이 기존 45척에 11척을 추가해 원유·LNG·LPG·정제품 선박 등 총 56척을 블랙리스트에 올렸습니다.', summary:'이란은 벌금, 선박 억류, 화물 압류 가능성을 경고하고 있습니다. 이는 선박 선택 제한과 보험료 상승으로 이어질 수 있습니다.', impact:'호르무즈 운송비와 보험 리스크를 높여 Jet Fuel 재상승 위험을 남기는 상방 변수입니다.', sourceName:'Maritime risk reports', tags:['blacklist 56','Iran','shipping risk','insurance']},
      {title:'Iran expands Hormuz vessel blacklist to 56', aiBrief:'Iran added 11 vessels to a prior list of 45, bringing the blacklist to 56 crude, LNG, LPG and clean-product vessels.', summary:'Iran warned of possible fines, detention and cargo seizure. That can restrict vessel choice and lift insurance costs.', impact:'Higher shipping and insurance risk keeps jet-fuel rebound risk alive.', sourceName:'Maritime risk reports', tags:['blacklist 56','Iran','shipping risk','insurance']},
      {title:'イラン、ホルムズ船舶ブラックリストを56隻へ拡大', aiBrief:'イランは既存45隻に11隻を追加し、原油・LNG・LPG・クリーン製品船など計56隻に拡大しました。', summary:'罰金、船舶拘束、貨物押収の可能性が警告され、船舶選択や保険コストを押し上げます。', impact:'輸送・保険リスクが高まり、Jet Fuel再上昇リスクを残します。', sourceName:'Maritime risk reports', tags:['blacklist 56','イラン','輸送リスク','保険']},
      {title:'伊朗将霍尔木兹船舶黑名单扩大至56艘', aiBrief:'伊朗在原45艘基础上新增11艘，涉及原油、LNG、LPG和成品油船，总数达56艘。', summary:'伊朗警告可能罚款、扣船和扣货，这会限制船舶选择并推高保险成本。', impact:'更高的海运和保险风险使Jet Fuel反弹风险继续存在。', sourceName:'Maritime risk reports', tags:['blacklist 56','伊朗','海运风险','保险']},
      {title:'L’Iran porte la blacklist de navires à 56', aiBrief:'L’Iran ajoute 11 navires à une liste de 45, couvrant brut, LNG, LPG et clean products.', summary:'Amendes, détentions et saisies de cargaison sont évoquées, ce qui peut restreindre les navires et augmenter l’assurance.', impact:'Le risque transport et assurance maintient un risque de rebond du Jet Fuel.', sourceName:'Maritime risk reports', tags:['blacklist 56','Iran','transport','assurance']},
      {title:'Iran erweitert Schiff-Blacklist auf 56', aiBrief:'Iran fügte 11 Schiffe zu einer Liste von 45 hinzu, darunter Rohöl-, LNG-, LPG- und Produktentanker.', summary:'Bußgelder, Festsetzungen und Ladungsbeschlagnahmen werden angedroht und können Versicherungskosten erhöhen.', impact:'Transport- und Versicherungsrisiko hält Jetfuel-Rebound-Risiko hoch.', sourceName:'Maritime risk reports', tags:['blacklist 56','Iran','Shipping','Versicherung']})},
    {id:'brent-wti-sept2-close-20260903', category:'market', priority:3, date:'2026-09-03', updatedAt:'2026-09-03T09:45:00+09:00', badge:'국제유가', aiSummary:true, relevanceScore:.98, sourceUrl:'forecast.html', i18n:multi(
      {title:'Brent 95.63달러·WTI 91.01달러…원유 쪽 강한 상승', aiBrief:'2026년 9월 2일 미국시장 종가 기준 Brent는 95.63달러, WTI는 91.01달러로 상승했습니다.', summary:'최근 Brent 흐름은 87.84달러에서 95.63달러까지 빠르게 올라왔습니다. Jet Fuel 하락과 달리 원유는 지정학 리스크에 민감하게 반응하고 있습니다.', impact:'원유 상승은 10월 유류할증료 인하 가능성의 신뢰도를 낮추는 상방 변수입니다.', sourceName:'Oil market close reference', tags:['Brent 95.63','WTI 91.01','crude oil','상방 위험']},
      {title:'Brent USD 95.63 and WTI USD 91.01 show strong crude upside', aiBrief:'At the Sept. 2 U.S. close, Brent settled at USD 95.63 and WTI at USD 91.01.', summary:'Brent moved quickly from the USD 87.84 area to USD 95.63. Unlike weaker jet fuel, crude is reacting strongly to geopolitical risk.', impact:'Crude upside lowers confidence in an October surcharge cut.', sourceName:'Oil market close reference', tags:['Brent 95.63','WTI 91.01','crude oil','upside risk']})},
    {id:'global-jetfuel-15685-down-20260903', category:'market', priority:4, date:'2026-09-03', updatedAt:'2026-09-03T09:45:00+09:00', badge:'Jet Fuel', aiSummary:true, relevanceScore:.97, sourceUrl:'forecast.html', i18n:multi(
      {title:'글로벌 Jet Fuel 4.3% 하락…10월 유류할증료 하방압력 유지', aiBrief:'IATA/S&P Global Platts 글로벌 Jet Fuel 주간 평균은 156.85달러/bbl로 전주 대비 4.3% 하락했습니다.', summary:'이 값은 Singapore MOPS가 아니라 글로벌 항공유 주간 평균입니다. 8월 27일 Singapore Jet Fuel 142.93달러와 함께 하방 신호를 제공합니다.', impact:'원유 상승에도 10월 인하 가능성을 완전히 지우지 않는 핵심 하방 변수입니다.', sourceName:'IATA / S&P Global Platts weekly reference', tags:['Global Jet Fuel','156.85','-4.3%','MOPS 구분']},
      {title:'Global Jet Fuel falls 4.3%, keeping October surcharge downside alive', aiBrief:'The IATA/S&P Global Platts global Jet Fuel weekly average was USD 156.85/bbl, down 4.3% week over week.', summary:'This is not Singapore MOPS. It is a global weekly jet-fuel reference and should be separated from the October Singapore MOPS average.', impact:'Even with stronger crude, this keeps the October cut possibility from disappearing.', sourceName:'IATA / S&P Global Platts weekly reference', tags:['Global Jet Fuel','156.85','-4.3%','MOPS distinction']})},
    {id:'asia-jetfuel-supply-fujairah-buffer-20260903', category:'market', priority:5, date:'2026-09-03', updatedAt:'2026-09-03T09:45:00+09:00', badge:'공급', aiSummary:true, relevanceScore:.96, sourceUrl:'forecast.html', i18n:multi(
      {title:'아시아 Jet Fuel 공급 증가와 Fujairah 재고 +19%…일부 완충', aiBrief:'중국·한국·일본 Jet Fuel 공급 증가와 Fujairah middle distillate 재고 1.741 million barrels, 전주 대비 +19%가 확인됐습니다.', summary:'middle distillates에는 diesel과 Jet Fuel이 포함됩니다. Singapore regrade 약세는 Jet Fuel이 diesel 대비 상대적으로 약해지는 흐름을 의미합니다.', impact:'공급 완충은 인하 가능성을 지지하지만, 호르무즈 군사위험을 완전히 상쇄하지는 못합니다.', sourceName:'S&P Global / refined-product market references', tags:['Asia Jet Fuel','Fujairah +19%','regrade','공급 완충']},
      {title:'Asia jet-fuel supply and Fujairah inventories add partial buffer', aiBrief:'China, Korea and Japan jet-fuel supply increased, while Fujairah middle distillate inventories reached 1.741 million barrels, up 19% week over week.', summary:'Middle distillates include diesel and jet fuel. A weaker Singapore regrade means jet fuel is relatively weaker versus diesel.', impact:'Supply buffers support the cut case, but do not fully offset Hormuz military risk.', sourceName:'S&P Global / refined-product market references', tags:['Asia Jet Fuel','Fujairah +19%','regrade','supply buffer']})},
    {id:'usdkrw-136163-20260903', category:'market', priority:6, date:'2026-09-03', updatedAt:'2026-09-03T09:45:00+09:00', badge:'환율', aiSummary:true, relevanceScore:.95, sourceUrl:'forecast.html', i18n:multi(
      {title:'USD/KRW 약 1,361.63원…원화 부과액 하락 요인 강화', aiBrief:'2026년 9월 3일 09:45 KST 전후 USD/KRW는 약 1,361.63원, 100엔은 약 856.95원 수준입니다.', summary:'최근 USD/KRW는 1,394원대에서 1,362원대까지 내려왔습니다. 환율은 원화 환산액을 낮추지만 유류할증료 단계 자체를 직접 결정하지 않습니다.', impact:'10월 인하 가능성을 유지시키는 가장 강한 하방 변수 중 하나입니다.', sourceName:'FX market reference', tags:['USD/KRW','1,361.63','원화 강세','하방 요인']},
      {title:'USD/KRW near 1,361.63 strengthens KRW amount downside', aiBrief:'Near 2026.09.03 09:45 KST, USD/KRW was around 1,361.63 and 100 JPY around KRW 856.95.', summary:'USD/KRW moved from the 1,394 area to the 1,362 area. FX lowers KRW-converted amounts but does not directly determine the surcharge stage.', impact:'One of the strongest downside variables keeping an October cut possible.', sourceName:'FX market reference', tags:['USD/KRW','1,361.63','KRW strength','downside']})}
  ];

  function installNewsCards(){
    var list = Array.isArray(window.FIXED_NEWS) ? window.FIXED_NEWS : (typeof FIXED_NEWS !== 'undefined' && Array.isArray(FIXED_NEWS) ? FIXED_NEWS : null);
    if(!list) return;
    var stale = /20260902|20260831|20260828|20260827|hormuz-risk|vlccs-hit|five-week-high|asia-distillate|14293-still-below|1374/i;
    list = list.filter(function(item){
      var id = item && item.id ? String(item.id) : '';
      if(/september-surcharge|airpremia|tway|jeju|eastar|airseoul/i.test(id)) return true;
      return !stale.test(id);
    });
    newsCards.slice().reverse().forEach(function(item){
      var localized = item.i18n[lang()] || item.i18n.en || item.i18n.ko;
      list.unshift(Object.assign({}, item, localized, {i18n:item.i18n, sourceUrl:item.sourceUrl || 'forecast.html'}));
    });
    window.FIXED_NEWS = list;
    if(typeof FIXED_NEWS !== 'undefined') FIXED_NEWS = list;
  }

  function renderTable(p){
    var tbody = document.querySelector('#indicatorTbody') || document.querySelector('.indicator-table tbody') || document.querySelector('.fore-tbl tbody');
    if(tbody) tbody.innerHTML = p.rows.map(function(r){ return '<tr><td><strong>'+esc(r[0])+'</strong></td><td>'+esc(r[1])+'</td><td class="impact-up">'+esc(r[2])+'</td></tr>'; }).join('');
    var table = tbody && tbody.closest('table');
    var thead = table && table.querySelector('thead');
    if(thead) thead.innerHTML = '<tr>'+p.th.map(function(h){ return '<th>'+esc(h)+'</th>'; }).join('')+'</tr>';
  }
  function renderPredict(p){
    var box = document.getElementById('predictFactors');
    if(!box) return;
    var classes = ['','down','down','up','up'];
    box.innerHTML = p.rows.map(function(r, i){
      return '<div class="predict-factor"><div class="pf-label">'+esc(r[0])+'</div><div class="pf-val '+classes[i]+'">'+esc(r[1])+'</div></div>';
    }).join('');
  }
  function removeUndefined(){
    document.querySelectorAll('body *').forEach(function(el){
      if(el.tagName === 'SCRIPT' || el.tagName === 'STYLE') return;
      if(el.children.length === 0 && /^\s*undefined\s*$/i.test(el.textContent || '')) {
        var parent = el.parentElement;
        el.remove();
        if(parent && !parent.textContent.trim()) parent.remove();
      }
    });
    document.querySelectorAll('.verdict-box, .summary-card, .alert, .notice, .forecast-box').forEach(function(el){
      if(/undefined/i.test(el.textContent || '') && el.children.length <= 3) el.remove();
      if(/2026년 8월 유류할증료와 9월 전망|8월 국제선 14단계|9월 국제선 공식 공시 대기|USD\/KRW 약 1,416/i.test(el.textContent || '')) el.remove();
    });
  }
  function renderForecast(){
    if(window.AERO_MARKET_NUMBERS_20260904) return;
    if(!pathIs('forecast')) return;
    var p = pack(lang());
    updateHead(p.meta, p.desc, 'https://aero-surcharge.com/forecast.html');
    setText('fore.pageTitle', p.title);
    setText('fore.pageSub', p.sub);
    setText('fore.h1', p.title);
    setHtml('fore.notice', p.notice);
    setText('fore.intro', p.intro);
    setText('fore.summary.updated', p.sub);
    setText('fore.indicator.title', p.indicator);
    setText('fore.indicator.footnote', p.foot);
    setText('fore.predict.title', p.indicator);
    setText('fore.predict.subtitle', p.rows[0][1]);
    setText('fore.predict.footnote', p.foot);
    setText('fore.verdict.title', p.verdictTitle);
    setText('fore.verdict.line1', p.verdict1);
    setText('fore.verdict.line2', p.verdict2);
    setText('fore.verdict.long', p.verdictLong);
    setText('fore.keyvars.title', p.keyTitle);
    renderTable(p);
    var verdictBox = document.getElementById('verdictBox');
    if(verdictBox){
      verdictBox.innerHTML = '<div class="verdict-title">'+esc(p.verdictTitle)+'</div><p>'+esc(p.verdict1)+'</p><p>'+esc(p.verdict2)+'</p><p>'+esc(p.verdictLong)+'</p>';
    }
    var marketBrief = document.getElementById('marketBriefBox');
    if(marketBrief){
      marketBrief.innerHTML = '<strong>'+esc(p.indicator)+'</strong>' + p.rows.map(function(r){ return '<div class="mb-item">'+esc(r[0])+': '+esc(r[1])+'</div>'; }).join('');
    }
    var summaryCard = document.getElementById('summaryCard');
    if(summaryCard){
      summaryCard.innerHTML = '<ul>' + p.rows.map(function(r){ return '<li><strong>'+esc(r[0])+':</strong> '+esc(r[1])+'</li>'; }).join('') + '</ul>';
    }
    var summary = document.querySelector('.summary-list');
    if(summary) summary.innerHTML = p.summary.map(function(x){ return '<li>'+esc(x)+'</li>'; }).join('');
    var key = document.querySelector('.key-vars, .keyvars, #keyVariables');
    if(key) key.innerHTML = p.keyVars.map(function(x){ return '<span class="pill">'+esc(x)+'</span>'; }).join('');
    var keyGrid = document.getElementById('keyVarsGrid');
    if(keyGrid) keyGrid.innerHTML = p.keyVars.map(function(x){ return '<span style="display:inline-block;margin:3px 6px 3px 0;padding:5px 8px;border:1px solid #BFDBFE;border-radius:999px;background:#EFF6FF;color:#0F172A;">'+esc(x)+'</span>'; }).join('');
    renderPredict(p);
    ['scenarioBox','bookingDecisionBox','mopsAnalysisBox'].forEach(function(id){ var el = document.getElementById(id); if(el) el.style.display = 'none'; });
    removeUndefined();
    updateJsonLd('forecast', p);
  }
  function renderOfficialBox(p, l){
    var official = document.querySelector('.official-summary-box');
    if(!official) return;
    official.innerHTML = '<div class="official-title" data-i18n="news.officialTitle">'+esc(p.officialTitle)+'</div><div data-i18n="news.officialNotice" style="font-size:12px;color:#9A6A00;margin-bottom:10px;padding:6px 10px;background:rgba(255,255,255,.78);border-radius:6px;border-left:3px solid #FFCC80;">'+esc(p.officialNotice)+'</div>'
      + airlineRows(l).map(function(r){ return '<div class="official-item" id="'+esc(r[0])+'"><strong>'+esc(r[1])+'</strong> - '+esc(r[2])+' · <a href="'+esc(noticeUrls[r[0]])+'" target="_blank" rel="noopener noreferrer" style="color:#075985;font-weight:700;">'+esc(p.link)+'</a></div>'; }).join('')
      + '<div class="official-desc" id="officialDesc">'+esc(p.officialDesc)+'</div>';
  }
  function renderNewsBrief(p){
    var anchor = document.querySelector('.official-summary-box') || document.querySelector('.news-list') || document.querySelector('.main');
    if(!anchor || !anchor.parentNode) return;
    var box = document.getElementById('sep03NewsBrief');
    if(!box){
      box = document.createElement('div');
      box.id = 'sep03NewsBrief';
      box.className = 'summary-card sep03-news-brief';
      anchor.parentNode.insertBefore(box, anchor);
    }
    box.innerHTML = '<div class="summary-card-title">'+esc(p.indicator)+'</div><ul>'
      + p.rows.map(function(r){ return '<li><strong>'+esc(r[0])+':</strong> '+esc(r[1])+'</li>'; }).join('')
      + '</ul>';
  }
  function relocalizeCards(){
    var l = lang();
    document.querySelectorAll('.news-card').forEach(function(el){
      var id = el.id || el.getAttribute('data-id') || '';
      var source = newsCards.filter(function(c){ return c.id === id; })[0];
      if(!source) return;
      var item = source.i18n[l] || source.i18n.en || source.i18n.ko;
      var title = el.querySelector('.news-title');
      var brief = el.querySelector('.ai-brief, .news-ai-brief');
      var paras = el.querySelectorAll('p, .news-summary');
      var impact = el.querySelector('.news-impact');
      var link = el.querySelector('.news-source, .source-name, a.source');
      if(title) title.textContent = item.title;
      if(brief) brief.textContent = item.aiBrief;
      if(paras[0]) paras[0].textContent = item.summary;
      if(paras[1]) paras[1].textContent = item.impact;
      if(impact) impact.textContent = item.impact;
      if(link) link.textContent = item.sourceName + ' ↗';
    });
  }
  function renderNews(){
    if(window.AERO_MARKET_NUMBERS_20260904) return;
    if(!pathIs('news')) return;
    var l = lang(), p = pack(l);
    updateHead(p.newsMeta, p.desc, 'https://aero-surcharge.com/news.html');
    installNewsCards();
    setText('news.pageTitle', p.newsTitle);
    setText('news.pageSub', p.newsSub);
    setText('news.note', p.note);
    setText('news.latest.title', p.latest);
    setText('news.previous.title', p.previous);
    setText('news.decisionTitle', p.verdictTitle);
    setText('news.decisionLine1', '→ ' + p.verdict1);
    setText('news.decisionLine2', '→ ' + p.verdict2);
    setText('news.forecastCta.title', p.title);
    setText('news.forecastCta.desc', p.intro);
    setText('news.forecastCta.btn', p.forecastBtn);
    document.querySelectorAll('.filter-btn, .category-filter button').forEach(function(btn, i){ if(p.filters[i]) btn.textContent = p.filters[i]; });
    renderNewsBrief(p);
    renderOfficialBox(p, l);
    if(typeof window.renderNews === 'function' && !window.__AERO_SEP03_RENDERING){
      window.__AERO_SEP03_RENDERING = true;
      try { window.renderNews(); } catch(e) {}
      window.__AERO_SEP03_RENDERING = false;
    }
    relocalizeCards();
    var latestTitle = document.querySelector('.news-section-title[data-section="latest"], .news-section-label.latest .news-section-title');
    var previousTitle = document.querySelector('.news-section-title[data-section="previous"], .news-section-label.previous .news-section-title');
    if(latestTitle) latestTitle.textContent = p.latest;
    if(previousTitle) previousTitle.textContent = p.previous;
    document.querySelectorAll('.news-section-meta, .news-section-sub').forEach(function(el){
      if(/Archive|아카이브|アーカイブ|归档|Archiv|date|날짜/i.test(el.textContent || '')) el.textContent = p.archive;
    });
    removeUndefined();
    updateJsonLd('news', p);
  }
  function updateJsonLd(kind, p){
    document.querySelectorAll('script[type="application/ld+json"]').forEach(function(node){
      try{
        var json = JSON.parse(node.textContent || '{}');
        if(json && typeof json === 'object'){
          json.headline = kind === 'news' ? p.newsTitle : p.title;
          json.description = p.desc;
          json.dateModified = '2026-09-03T09:45:00+09:00';
          json.datePublished = json.datePublished || '2026-09-03T09:45:00+09:00';
          node.textContent = JSON.stringify(json);
        }
      }catch(e){}
    });
  }
  function applyAll(){ if(window.AERO_MARKET_NUMBERS_20260904) return; renderForecast(); renderNews(); }
  var prevRenderForecast = window.renderForecastPage;
  if(typeof prevRenderForecast === 'function') window.renderForecastPage = function(){ var out = prevRenderForecast.apply(this, arguments); setTimeout(renderForecast, 0); return out; };
  var prevRenderNews = window.renderNews;
  if(typeof prevRenderNews === 'function') window.renderNews = function(){ var out = prevRenderNews.apply(this, arguments); if(!window.__AERO_SEP03_RENDERING) setTimeout(renderNews, 0); return out; };
  var prevApplyLanguage = window.applyLanguage;
  if(typeof prevApplyLanguage === 'function') window.applyLanguage = function(){ var out = prevApplyLanguage.apply(this, arguments); applyAll(); setTimeout(applyAll, 0); return out; };
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyAll);
  else applyAll();
  [0,100,400,900,1600,2600,4200,6200,9000,14000,22000,36000].forEach(function(ms){ setTimeout(applyAll, ms); });
})();
