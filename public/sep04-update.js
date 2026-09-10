(function(){
  'use strict';

  var latest = {
    asOf: '2026.09.04 07:15 KST',
    currentMonth: '2026-09',
    forecastTargetMonth: '2026-10',
    septemberLevel: 21,
    augustLevel: 14,
    septemberBaselineUsdPerBbl: 149.29,
    septemberBaselineCentsPerGal: 355.46,
    septemberBaselinePeriod: '2026.07.16~2026.08.15',
    octoberWindow: '2026.08.16~2026.09.15',
    usdKrw: 1356.3,
    jpy100Krw: 870,
    singaporeJetFuelDate: '2026.08.27',
    singaporeJetFuelFlatUsdPerBbl: 142.93,
    singaporeJetFuelVsBaselineUsd: -6.36,
    singaporeJetFuelVsBaselinePct: -4.3,
    globalJetFuelUsdPerBbl: 156.85,
    globalJetFuelWeeklyPct: -4.3,
    brentUsdPerBbl: 97.29,
    brentPct: 1.7,
    wtiUsdPerBbl: 93.04,
    wtiPct: 2.2,
    hormuzKplerCommodityVessels: 4,
    hormuzTenDayAverageCommodityVessels: 13,
    iranBlacklistVessels: 56,
    fujairahMiddleDistillateInventory: '1.741 million barrels',
    fujairahMiddleDistillateWeeklyPct: 19,
    iraqCrudeExportsBpd: '2.34 million bpd',
    iranCrudeExportsBpd: 'about 260,000 bpd'
  };

  var release = window.AERO_MARKET_RELEASE;
  window.AERO_MARKET_NUMBERS_20260904 = Object.assign({}, latest);
  if(release) latest = Object.assign({}, latest, release.numbers);
  window.AERO_MARKET_NUMBERS_LATEST = latest;
  window.AERO_MARKET_SNAPSHOTS = Object.assign({}, window.AERO_MARKET_SNAPSHOTS || {}, {'2026-09-04': window.AERO_MARKET_NUMBERS_20260904});
  if(release) window.AERO_MARKET_SNAPSHOTS['2026-09-07'] = latest;

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
      ['10월 종합','보합 중심 · 인하 가능성 유지 · 상승 리스크 재확대 · 신뢰도 낮음~보통','환율·Jet Fuel 약세는 하방이지만 Brent·WTI 급등과 호르무즈 위험이 상승 리스크를 다시 키웁니다. 단계·금액은 확정하지 않습니다.'],
      ['USD/KRW','2026.09.04 07:15 KST 전후 약 1,356.3원 · 100엔 약 870원','원화 부과액의 매우 강한 하락 요인입니다. 단계 자체를 직접 낮추는 변수는 아닙니다.'],
      ['Singapore Jet Fuel / MOPS','9월 기준선 149.29달러/bbl · 8월 27일 Singapore Jet Fuel 142.93달러/bbl · 글로벌 Jet Fuel 156.85달러/bbl(-4.3%)','10월 산정기간의 하방 신호입니다. 단 142.93달러와 156.85달러는 10월 확정 MOPS 평균이 아닙니다.'],
      ['국제유가','2026.09.03 미국시장 종가 Brent 97.29달러(+1.7%) · WTI 93.04달러(+2.2%)','원유가격은 매우 강한 상승 요인입니다. Jet Fuel 약세와 반대로 작용합니다.'],
      ['호르무즈·정제품 공급','Kpler 공개 추적 commodity vessel 기준 4척 · 이란 blacklist 56척 · 이라크 수출 2.34m bpd · Fujairah 재고 +19%','전체 선박 수가 아니라 공개 추적 범위입니다. 운송·보험 위험은 상방, 일부 대체공급은 완충 요인입니다.']
    ],
    en: [
      ['October overall','Flat-centered · cut chance maintained · upside risk re-expanded · low-to-medium confidence','FX and jet fuel lean lower, but Brent, WTI and Hormuz risk have rebuilt upside pressure. No stage or amount is confirmed.'],
      ['USD/KRW','Around KRW 1,356.3 near 2026.09.04 07:15 KST · 100 JPY around KRW 870','A very strong downside factor for KRW amounts. It does not directly set the surcharge stage.'],
      ['Singapore Jet Fuel / MOPS','September baseline USD 149.29/bbl · Aug. 27 Singapore Jet Fuel USD 142.93/bbl · Global Jet Fuel USD 156.85/bbl (-4.3%)','A downside signal inside the October calculation window. USD 142.93 and USD 156.85 are not confirmed October MOPS averages.'],
      ['International crude','Sept. 3 U.S. close: Brent USD 97.29 (+1.7%) · WTI USD 93.04 (+2.2%)','Crude oil is a very strong upside factor and conflicts with the weaker jet-fuel signal.'],
      ['Hormuz and refined products','Kpler publicly tracked commodity vessels: 4 · Iran blacklist 56 vessels · Iraq exports 2.34m bpd · Fujairah inventory +19%','This is not total vessel traffic. Shipping and insurance risks are upside factors, while some alternative supply is a buffer.']
    ],
    ja: [
      ['10月総合','横ばい中心 · 引き下げ可能性維持 · 上昇リスク再拡大 · 信頼度低~中','為替とJet Fuelは下方向だが、Brent・WTIとホルムズリスクが上方向圧力を再び強めています。段階・金額は未確定です。'],
      ['USD/KRW','2026.09.04 07:15 KST前後で約1,356.3ウォン · 100円約870ウォン','ウォン建て金額の非常に強い下押し要因。段階を直接決めるものではありません。'],
      ['Singapore Jet Fuel / MOPS','9月基準149.29ドル/bbl · 8月27日Singapore Jet Fuel 142.93ドル/bbl · Global Jet Fuel 156.85ドル/bbl(-4.3%)','10月算定期間内の下方向シグナルです。ただし10月確定MOPS平均ではありません。'],
      ['国際原油','9月3日米国終値 Brent 97.29ドル(+1.7%) · WTI 93.04ドル(+2.2%)','原油は非常に強い上方向要因で、Jet Fuelの弱さと逆方向です。'],
      ['ホルムズ・石油製品供給','Kpler公開追跡commodity vessel基準4隻 · イランblacklist 56隻 · イラク輸出2.34m bpd · Fujairah在庫+19%','全船舶数ではありません。輸送・保険リスクは上昇要因、一部代替供給は緩衝要因です。']
    ],
    zh: [
      ['10月综合','持平为主 · 下调可能性仍在 · 上行风险再扩大 · 可信度低至中','汇率和Jet Fuel偏下行，但Brent、WTI和霍尔木兹风险重新推高上行压力。档位和金额不确认。'],
      ['USD/KRW','2026.09.04 07:15 KST附近约1,356.3韩元 · 100日元约870韩元','韩元金额的很强下行因素，但不直接决定档位。'],
      ['Singapore Jet Fuel / MOPS','9月基准149.29美元/bbl · 8月27日Singapore Jet Fuel 142.93美元/bbl · 全球Jet Fuel 156.85美元/bbl(-4.3%)','这是10月计算期内的下行信号，但不是10月确定MOPS均值。'],
      ['国际油价','9月3日美国收盘 Brent 97.29美元(+1.7%) · WTI 93.04美元(+2.2%)','原油是很强的上行因素，与Jet Fuel走弱信号相反。'],
      ['霍尔木兹与成品油供应','Kpler公开追踪commodity vessel口径4艘 · 伊朗blacklist 56艘 · 伊拉克出口2.34m bpd · Fujairah库存+19%','这不是全部船舶数量。运输和保险风险偏上行，部分替代供应是缓冲因素。']
    ],
    fr: [
      ['Vue octobre','Scénario central stable · baisse encore possible · risque haussier réaccentué · confiance faible à moyenne','FX et Jet Fuel poussent vers le bas, mais Brent, WTI et Hormuz renforcent de nouveau la pression haussière. Aucun niveau ni montant confirmé.'],
      ['USD/KRW','Env. 1 356,3 KRW vers 2026.09.04 07:15 KST · 100 JPY env. 870 KRW','Très fort facteur baissier pour les montants en KRW, sans fixer directement le niveau.'],
      ['Singapore Jet Fuel / MOPS','Base septembre 149.29 USD/bbl · Singapore Jet Fuel du 27 août 142.93 USD/bbl · Global Jet Fuel 156.85 USD/bbl (-4.3%)','Signal baissier dans la période de calcul d’octobre, mais pas une moyenne MOPS confirmée pour octobre.'],
      ['Pétrole international','Clôture US du 3 sept.: Brent 97.29 USD (+1.7%) · WTI 93.04 USD (+2.2%)','Le pétrole est un très fort facteur haussier et contredit le signal plus faible du Jet Fuel.'],
      ['Hormuz et raffinés','Commodity vessels suivis publiquement par Kpler: 4 · blacklist Iran 56 navires · exportations Irak 2.34m bpd · stocks Fujairah +19%','Ce n’est pas le trafic total. Transport et assurance sont haussiers, tandis que certaines offres alternatives amortissent.']
    ],
    de: [
      ['Oktober-Sicht','Stabil im Zentrum · Senkung weiter möglich · Aufwärtsrisiko wieder ausgeweitet · geringe bis mittlere Sicherheit','FX und Jetfuel wirken nach unten, aber Brent, WTI und Hormuz bauen wieder Aufwärtsdruck auf. Stufe und Betrag sind nicht bestätigt.'],
      ['USD/KRW','Um 2026.09.04 07:15 KST ca. 1.356,3 KRW · 100 JPY ca. 870 KRW','Sehr starker Abwärtsfaktor für KRW-Beträge; bestimmt die Stufe nicht direkt.'],
      ['Singapore Jet Fuel / MOPS','September-Basis 149.29 USD/bbl · 27. Aug. Singapore Jet Fuel 142.93 USD/bbl · Global Jet Fuel 156.85 USD/bbl (-4.3%)','Abwärtssignal im Oktober-Fenster, aber kein bestätigter Oktober-MOPS-Durchschnitt.'],
      ['Internationales Öl','US-Schluss 3. Sept.: Brent 97.29 USD (+1.7%) · WTI 93.04 USD (+2.2%)','Öl ist ein sehr starker Aufwärtsfaktor und läuft gegen das schwächere Jetfuel-Signal.'],
      ['Hormuz und Raffinerieprodukte','Kpler öffentlich erfasste commodity vessels: 4 · Iran blacklist 56 Schiffe · Irak-Exporte 2.34m bpd · Fujairah Lager +19%','Nicht der gesamte Schiffsverkehr. Transport und Versicherung wirken nach oben, alternative Versorgung puffert teilweise.']
    ]
  };

  var packs = {
    ko: {
      title:'2026년 10월 국제선 유류할증료 전망',
      meta:'2026년 10월 국제선 유류할증료 전망 | MOPS·환율·호르무즈',
      desc:'2026년 9월 4일 기준 Singapore Jet Fuel·MOPS, 원달러 환율, 국제유가와 호르무즈 해협 상황을 분석해 10월 국제선 유류할증료 인상·인하 가능성을 추적합니다.',
      sub:'2026.09.04 07:15 KST 기준 · 9월 21단계 현재 적용 · 10월 공식공시 전 · 산정기간 추적 중 · 환율 ↓↓↓ / Jet Fuel ↓↓ / 국제유가 ↑↑↑ / 호르무즈 ↑↑↑',
      notice:'<strong>확인:</strong> 9월 국제선 유류할증료는 21단계로 현재 적용 중입니다. 10월은 공식공시 전이며 산정기간을 추적 중이므로 단계·금액·확률을 확정하지 않습니다.',
      intro:'2026년 9월 4일 기준 10월 국제선 유류할증료는 보합을 기본 시나리오로 보되 인하 가능성도 유지되고 있습니다. 원/달러 환율은 약 1,356원까지 내려왔고 글로벌 Jet Fuel도 주간 4.3% 하락했지만, Brent와 WTI가 각각 97.29달러와 93.04달러까지 상승하고 호르무즈 공급위험도 매우 높은 상태입니다.',
      indicator:'2026년 10월 유류할증료 전망 핵심 지표',
      th:['항목','현재 확인 상태','10월 전망에서의 의미'],
      foot:'* 142.93달러는 2026년 8월 27일 Singapore Jet Fuel 시장 flat price 참고값입니다. 156.85달러는 글로벌 Jet Fuel 주간 평균입니다. 둘 다 10월 확정 Singapore MOPS 평균이 아닙니다.',
      verdictTitle:'2026년 10월 전망 결론',
      verdict1:'10월 단계·노선별 금액은 아직 확정되지 않았습니다.',
      verdict2:'현재 결론은 보합 중심 · 인하 가능성 유지 · 상승 리스크 재확대입니다.',
      verdictLong:'신뢰도: 낮음~보통 · 공식 공시 전 특정 단계 예측 보류',
      keyTitle:'주요 확인 항목',
      keyVars:['9월 21단계 현재 적용','10월 공식공시 전 · 산정기간 추적 중','USD/KRW 약 1,356.3원','Singapore Jet Fuel 142.93 · Global Jet Fuel 156.85','Brent 97.29 · WTI 93.04','Kpler 공개 추적 4척 · blacklist 56척'],
      newsTitle:'2026년 10월 유류할증료와 9월 적용 뉴스',
      newsMeta:'2026년 10월 유류할증료 전망 뉴스 | MOPS·환율·호르무즈',
      newsSub:'2026.09.04 07:15 KST 기준 · 9월 21단계 현재 적용 · 10월 전망: 보합 중심 · 인하 가능성 유지 · 상승 리스크 재확대',
      note:'※ 유류할증료는 발권일 기준으로 적용됩니다. 9월 공식 공시는 현재 적용 기준선이며, 현재 초점은 10월 전망입니다.',
      latest:'최신 뉴스', previous:'이전 뉴스', archive:'날짜순 아카이브', filters:['전체','항공사 공지','기관','시장'],
      officialTitle:'주요 항공사 2026년 9월 국제선 유류할증료 공식 공시',
      officialNotice:'2026.09.04 07:15 KST 기준 · KE/OZ/LJ/BX/TW/7C/ZE/RS/YP 9월 공시 반영 · 10월 공식 공시는 아직 확인되지 않음',
      officialDesc:'* 9월 공식 공시는 현재 적용 기준선입니다. 10월 단계와 노선별 금액은 항공사 공식 공시 전까지 확정하지 않습니다.',
      link:'공식 공지 ↗', forecastBtn:'10월 전망 보기 →'
    },
    en: {
      title:'October 2026 International Fuel Surcharge Outlook',
      meta:'October 2026 International Fuel Surcharge Outlook | MOPS, FX and Hormuz',
      desc:'As of September 4, 2026, track October fuel surcharge direction using Singapore Jet Fuel, MOPS, USD/KRW, crude oil and Hormuz Strait risk.',
      sub:'As of 2026.09.04 07:15 KST · September Level 21 now applies · October official notices not yet published · calculation tracked · FX ↓↓↓ / Jet Fuel ↓↓ / crude ↑↑↑ / Hormuz ↑↑↑',
      notice:'<strong>Confirmed:</strong> September international surcharges are in effect at Level 21. October remains before official notices, so no stage, amount or probability is confirmed.',
      intro:'As of September 4, 2026, October international fuel surcharges remain flat-centered, with a cut still possible. USD/KRW has moved down near 1,356 and global Jet Fuel fell 4.3% week over week, but Brent and WTI reached USD 97.29 and USD 93.04 while Hormuz supply risk remains very high.',
      indicator:'October 2026 Fuel Surcharge Core Indicators',
      th:['Item','Current status','Meaning for October'],
      foot:'* USD 142.93 is the Aug. 27 Singapore Jet Fuel flat-price reference. USD 156.85 is a global Jet Fuel weekly average. Neither is a confirmed October Singapore MOPS average.',
      verdictTitle:'October 2026 Outlook Conclusion',
      verdict1:'October stage and route amounts are not confirmed yet.',
      verdict2:'Current view: flat-centered, cut chance maintained, upside risk re-expanded.',
      verdictLong:'Confidence: low-to-medium · no specific stage forecast before official notices',
      keyTitle:'Key Check Variables',
      keyVars:['September Level 21 currently applies','October official notices not yet published','USD/KRW around 1,356.3','Singapore Jet Fuel 142.93 · Global Jet Fuel 156.85','Brent 97.29 · WTI 93.04','Kpler public tracking 4 vessels · blacklist 56'],
      newsTitle:'October 2026 Fuel Surcharge and September Baseline News',
      newsMeta:'October 2026 Fuel Surcharge Outlook News | MOPS, FX and Hormuz',
      newsSub:'As of 2026.09.04 07:15 KST · September Level 21 now applies · October outlook: flat-centered · cut chance maintained · upside risk re-expanded',
      note:'Fuel surcharges apply by ticketing date. September notices are the current baseline; the focus is October forecasting.',
      latest:'Latest News', previous:'Previous News', archive:'Archived by date', filters:['All','Airline notices','Institutions','Market'],
      officialTitle:'Major Airline September 2026 International Fuel Surcharge Official Notices',
      officialNotice:'As of 2026.09.04 07:15 KST · KE/OZ/LJ/BX/TW/7C/ZE/RS/YP September notices reflected · October official notices not yet confirmed',
      officialDesc:'* September notices are the current baseline. October stage and route amounts are not confirmed before official airline notices.',
      link:'Official notice ↗', forecastBtn:'View October outlook →'
    }
  };
  packs.ja = Object.assign({}, packs.en, {title:'2026年10月国際線燃油サーチャージ見通し', meta:'2026年10月国際線燃油サーチャージ見通し | MOPS・為替・ホルムズ', desc:'2026年9月4日時点のSingapore Jet Fuel、MOPS、USD/KRW、原油、ホルムズリスクから10月国際線燃油サーチャージを追跡します。', sub:'2026.09.04 07:15 KST時点 · 9月21段階が適用中 · 10月公式公示前 · 算定中 · 為替↓↓↓ / Jet Fuel↓↓ / 原油↑↑↑ / ホルムズ↑↑↑', notice:'<strong>確認:</strong> 9月国際線燃油サーチャージは21段階で適用中です。10月は公式公示前で、段階・金額・確率は確定しません。', intro:'2026年9月4日時点で、10月国際線燃油サーチャージは横ばい中心ながら引き下げ可能性も残ります。USD/KRWは約1,356まで低下しGlobal Jet Fuelも週4.3%下落しましたが、BrentとWTIは97.29ドル、93.04ドルまで上昇し、ホルムズ供給リスクも非常に高い状態です。', indicator:'2026年10月燃油サーチャージ主要指標', th:['項目','現在の確認状況','10月見通しでの意味'], latest:'最新ニュース', previous:'過去のニュース', archive:'日付順アーカイブ', filters:['すべて','航空会社公示','機関','市場'], officialTitle:'主要航空会社 2026年9月国際線燃油サーチャージ公式公示', officialNotice:'2026.09.04 07:15 KST時点 · KE/OZ/LJ/BX/TW/7C/ZE/RS/YPの9月公示を反映 · 10月公式公示は未確認', link:'公式公示 ↗', newsTitle:'2026年10月燃油サーチャージと9月適用ニュース', newsSub:'2026.09.04 07:15 KST時点 · 9月21段階適用中 · 10月見通し: 横ばい中心 · 引き下げ可能性維持 · 上昇リスク再拡大'});
  packs.zh = Object.assign({}, packs.en, {title:'2026年10月国际线燃油附加费展望', meta:'2026年10月国际线燃油附加费展望 | MOPS·汇率·霍尔木兹', desc:'截至2026年9月4日，用Singapore Jet Fuel、MOPS、USD/KRW、油价和霍尔木兹风险追踪10月国际线燃油附加费。', sub:'截至2026.09.04 07:15 KST · 9月第21档适用中 · 10月官方公告前 · 计算期追踪中 · 汇率↓↓↓ / Jet Fuel↓↓ / 油价↑↑↑ / 霍尔木兹↑↑↑', notice:'<strong>确认:</strong> 9月国际线燃油附加费第21档正在适用。10月仍在官方公告前，档位、金额和概率不确认。', intro:'截至2026年9月4日，10月国际线燃油附加费以持平为基本情景，同时仍保留下调可能。USD/KRW降至约1,356，全球Jet Fuel周环比下降4.3%，但Brent和WTI升至97.29美元和93.04美元，霍尔木兹供应风险仍很高。', indicator:'2026年10月燃油附加费核心指标', th:['项目','当前确认状态','对10月展望的意义'], latest:'最新新闻', previous:'过往新闻', archive:'按日期归档', filters:['全部','航空公司公告','机构','市场'], officialTitle:'主要航空公司2026年9月国际线燃油附加费官方公告', officialNotice:'截至2026.09.04 07:15 KST · 已反映KE/OZ/LJ/BX/TW/7C/ZE/RS/YP 9月公告 · 10月官方公告尚未确认', link:'官方公告 ↗', newsTitle:'2026年10月燃油附加费与9月适用新闻', newsSub:'截至2026.09.04 07:15 KST · 9月第21档适用中 · 10月展望：持平为主 · 下调可能性仍在 · 上行风险再扩大'});
  packs.cn = packs.zh;
  packs.fr = Object.assign({}, packs.en, {title:'Perspective surtaxe carburant internationale octobre 2026', meta:'Perspective octobre 2026 | MOPS, FX et Hormuz', desc:'Au 4 septembre 2026, suivi de la surtaxe carburant internationale d’octobre avec Singapore Jet Fuel, MOPS, USD/KRW, pétrole et Hormuz.', sub:'Au 2026.09.04 07:15 KST · septembre niveau 21 en vigueur · avis officiels octobre non publiés · calcul suivi · FX ↓↓↓ / Jet Fuel ↓↓ / pétrole ↑↑↑ / Hormuz ↑↑↑', notice:'<strong>Confirmé:</strong> les surtaxes internationales de septembre sont au niveau 21. Octobre reste avant avis officiels; aucun niveau, montant ou probabilité n’est confirmé.', intro:'Au 4 septembre 2026, la surtaxe carburant internationale d’octobre reste centrée sur la stabilité, avec une baisse encore possible. USD/KRW est proche de 1 356 et Global Jet Fuel baisse de 4,3% sur la semaine, mais Brent et WTI atteignent 97,29 et 93,04 USD tandis que le risque Hormuz demeure très élevé.', indicator:'Indicateurs clés de la surtaxe carburant octobre 2026', th:['Élément','État actuel','Sens pour octobre'], latest:'Dernières nouvelles', previous:'Anciennes nouvelles', archive:'Archive par date', filters:['Tout','Avis compagnies','Institutions','Marché'], officialTitle:'Avis officiels septembre 2026 des principales compagnies', officialNotice:'Au 2026.09.04 07:15 KST · avis septembre KE/OZ/LJ/BX/TW/7C/ZE/RS/YP reflétés · avis officiels octobre non confirmés', link:'Avis officiel ↗', newsTitle:'Actualités surtaxe carburant octobre 2026 et base septembre', newsSub:'Au 2026.09.04 07:15 KST · septembre niveau 21 en vigueur · octobre: stable central · baisse possible · risque haussier réaccentué'});
  packs.de = Object.assign({}, packs.en, {title:'Oktober-2026 internationaler Treibstoffzuschlag Ausblick', meta:'Oktober-2026 Ausblick | MOPS, FX und Hormuz', desc:'Stand 4. September 2026: Ausblick auf Oktober-Zuschläge mit Singapore Jet Fuel, MOPS, USD/KRW, Öl und Hormuz-Risiko.', sub:'Stand 2026.09.04 07:15 KST · September Stufe 21 gilt · Oktober-Hinweise noch nicht veröffentlicht · Berechnung verfolgt · FX ↓↓↓ / Jetfuel ↓↓ / Öl ↑↑↑ / Hormuz ↑↑↑', notice:'<strong>Bestätigt:</strong> September-Zuschläge gelten mit Stufe 21. Oktober ist noch vor offiziellen Hinweisen; Stufe, Betrag und Wahrscheinlichkeit sind nicht bestätigt.', intro:'Stand 4. September 2026 bleibt der internationale Oktober-Zuschlag im Basisszenario stabil, mit weiter möglicher Senkung. USD/KRW liegt nahe 1.356 und Global Jet Fuel fiel wöchentlich 4,3%, doch Brent und WTI erreichten 97,29 bzw. 93,04 USD, während das Hormuz-Risiko sehr hoch bleibt.', indicator:'Oktober-2026 Kernindikatoren für Treibstoffzuschlag', th:['Punkt','Aktueller Stand','Bedeutung für Oktober'], latest:'Neueste Nachrichten', previous:'Frühere Nachrichten', archive:'Nach Datum archiviert', filters:['Alle','Airline-Hinweise','Institutionen','Markt'], officialTitle:'Offizielle September-2026 Hinweise wichtiger Airlines', officialNotice:'Stand 2026.09.04 07:15 KST · September-Hinweise KE/OZ/LJ/BX/TW/7C/ZE/RS/YP übernommen · Oktober-Hinweise nicht bestätigt', link:'Offizieller Hinweis ↗', newsTitle:'Oktober-2026 Treibstoffzuschlag und September-Basis News', newsSub:'Stand 2026.09.04 07:15 KST · September Stufe 21 gilt · Oktober: stabil zentral · Senkung möglich · Aufwärtsrisiko wieder ausgeweitet'});

  function pack(l){
    var p = packs[l] || packs.en;
    var out = Object.assign({}, p, release && release.packs[l]);
    out.rows = release ? release.rows[l] : (rows[l] || rows.en);
    out.summary = out.rows.map(function(x){ return x[0]+': '+x[1]+' - '+x[2]; });
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
    var data = {
      ko:[['officialKe','대한항공','9월 KRW 48,000~354,000 · 8월 대비 최소 +12,800원'],['officialOz','아시아나항공','9월 KRW 52,000~290,100 · 8월 대비 최소 +15,400원'],['officialLj','진에어','9월 USD 29~89 · 8월 대비 최소 +USD 9'],['officialBx','에어부산','9월 USD 71/82 구간 반영 · 8월 대비 최소 +USD 24'],['officialTw','티웨이항공','9월 KRW 36,200~247,500 · 8월 대비 최소 +11,800원'],['official7c','제주항공','9월 USD 29~89 · 8월 대비 최소 +USD 7'],['officialZe','이스타항공','9월 USD 29~89 · 8월 대비 최소 +USD 7'],['officialRs','에어서울','9월 KRW 52,000~93,900 · 8월 대비 최소 +12,300원'],['officialYp','에어프레미아','9월 USD 30~195 · 8월 대비 최소 +USD 5']],
      en:[['officialKe','Korean Air','September KRW 48,000~354,000 · at least +KRW 12,800 vs August'],['officialOz','Asiana Airlines','September KRW 52,000~290,100 · at least +KRW 15,400 vs August'],['officialLj','Jin Air','September USD 29~89 · at least +USD 9 vs August'],['officialBx','Air Busan','September USD 71/82 ranges reflected · at least +USD 24 vs August'],['officialTw','Tway Air','September KRW 36,200~247,500 · at least +KRW 11,800 vs August'],['official7c','Jeju Air','September USD 29~89 · at least +USD 7 vs August'],['officialZe','Eastar Jet','September USD 29~89 · at least +USD 7 vs August'],['officialRs','Air Seoul','September KRW 52,000~93,900 · at least +KRW 12,300 vs August'],['officialYp','Air Premia','September USD 30~195 · at least +USD 5 vs August']]
    };
    var terms={ja:['9月','8月比、最低','区間を反映'],zh:['9月','较8月至少','已反映区间'],fr:['Septembre','au moins, par rapport à août','tranches prises en compte'],de:['September','mindestens gegenüber August','Bereiche berücksichtigt']};
    Object.keys(terms).forEach(function(code){
      var t=terms[code];
      data[code]=data.en.map(function(r){return [r[0],r[1],r[2].replace('September',t[0]).replace('at least',t[1]).replace(' vs August','').replace('ranges reflected',t[2])];});
    });
    data.cn = data.zh;
    return data[l] || data.en;
  }

  function multi(ko,en,ja,zh,fr,de){ return {ko:ko,en:en,ja:ja||en,zh:zh||en,cn:zh||en,fr:fr||en,de:de||en}; }
  var newsCards = [
    {id:'brent-wti-six-week-high-20260904', category:'market', priority:1, date:'2026-09-04', updatedAt:'2026-09-04T07:15:00+09:00', badge:'국제유가', aiSummary:true, relevanceScore:.99, sourceUrl:'forecast.html', i18n:multi(
      {title:'Brent 97.29달러·WTI 93.04달러…중동 충돌에 6주 최고', aiBrief:'2026년 9월 3일 미국시장 종가 기준 Brent는 97.29달러, WTI는 93.04달러까지 올랐습니다.', summary:'미·이란 직접 군사충돌과 호르무즈 공급차질 우려가 이어지면서 국제유가가 다시 강한 상승세를 보였습니다.', impact:'국제유가 급등은 향후 Singapore Jet Fuel 재상승 위험을 키워 10월 인하 판단의 신뢰도를 낮춥니다.', sourceName:'Oil market close reference', tags:['Brent 97.29','WTI 93.04','6주 최고','상승 리스크']},
      {title:'Brent USD 97.29 and WTI USD 93.04 reach six-week highs', aiBrief:'At the Sept. 3 U.S. close, Brent reached USD 97.29 and WTI USD 93.04.', summary:'U.S.-Iran military clashes and Hormuz supply concerns kept crude oil rising strongly.', impact:'The crude spike raises the risk that Singapore Jet Fuel rebounds during the October calculation window.', sourceName:'Oil market close reference', tags:['Brent 97.29','WTI 93.04','six-week high','upside risk']},
      {title:'Brent 97.29ドル・WTI 93.04ドル、6週高値', aiBrief:'9月3日米国終値でBrentは97.29ドル、WTIは93.04ドルに上昇。', summary:'米・イラン衝突とホルムズ供給懸念が原油を押し上げました。', impact:'Singapore Jet Fuelの再上昇リスクを高め、10月引き下げ判断の信頼度を下げます。', sourceName:'Oil market close reference', tags:['Brent 97.29','WTI 93.04','6週高値','上昇リスク']},
      {title:'Brent 97.29美元、WTI 93.04美元升至六周高位', aiBrief:'9月3日美国收盘，Brent升至97.29美元，WTI升至93.04美元。', summary:'美伊冲突和霍尔木兹供应担忧继续推高原油。', impact:'原油急涨提高Singapore Jet Fuel反弹风险，削弱10月下调判断的可信度。', sourceName:'Oil market close reference', tags:['Brent 97.29','WTI 93.04','六周高位','上行风险']},
      {title:'Brent 97,29 USD et WTI 93,04 USD au plus haut de six semaines', aiBrief:'À la clôture américaine du 3 sept., Brent atteint 97,29 USD et WTI 93,04 USD.', summary:'Les tensions États-Unis-Iran et Hormuz soutiennent fortement le pétrole.', impact:'Le risque de rebond du Singapore Jet Fuel augmente dans la période de calcul d’octobre.', sourceName:'Oil market close reference', tags:['Brent 97.29','WTI 93.04','six semaines','risque haussier']},
      {title:'Brent 97,29 USD und WTI 93,04 USD auf Sechswochenhoch', aiBrief:'Zum US-Schluss am 3. Sept. erreichten Brent 97,29 USD und WTI 93,04 USD.', summary:'US-Iran-Konflikte und Hormuz-Sorgen treiben Öl weiter an.', impact:'Das erhöht das Risiko eines Singapore-Jet-Fuel-Rebounds im Oktober-Fenster.', sourceName:'Oil market close reference', tags:['Brent 97.29','WTI 93.04','Sechswochenhoch','Aufwärtsrisiko']})},
    {id:'us-iran-clashes-continue-20260904', category:'market', priority:2, date:'2026-09-04', updatedAt:'2026-09-04T07:15:00+09:00', badge:'지정학', aiSummary:true, relevanceScore:.98, sourceUrl:'forecast.html', i18n:multi(
      {title:'미·이란 직접 군사충돌 지속…전면전 확정은 아님', aiBrief:'9월 3일까지 미국과 이란의 직접 공격이 이어지며 호르무즈 위험 프리미엄이 유지됐습니다.', summary:'사이트는 직접 군사충돌 지속으로 표현하되 전면전 확정이나 호르무즈 전면 봉쇄로 단정하지 않습니다.', impact:'군사위험은 10월 유류할증료 상승 리스크 재확대의 핵심 배경입니다.', sourceName:'Reuters / AP market reports', tags:['미국 이란','호르무즈','군사위험','10월 전망']},
      {title:'U.S.-Iran clashes continue, without treating full war as confirmed', aiBrief:'Direct U.S.-Iran attacks continued through Sept. 3, keeping the Hormuz risk premium elevated.', summary:'The page describes continuing direct clashes, not a confirmed full-scale war or full Hormuz blockade.', impact:'Military risk is a key reason October upside risk has re-expanded.', sourceName:'Reuters / AP market reports', tags:['U.S.-Iran','Hormuz','military risk','October outlook']},
      {title:'米・イラン直接衝突が継続、全面戦争確定とは表現しない', aiBrief:'9月3日まで直接攻撃が続き、ホルムズのリスクプレミアムが残っています。', summary:'全面戦争やホルムズ全面封鎖と断定せず、直接軍事衝突の継続として扱います。', impact:'軍事リスクは10月の上昇リスク再拡大の中心要因です。', sourceName:'Reuters / AP market reports', tags:['米イラン','ホルムズ','軍事リスク','10月見通し']},
      {title:'美伊直接军事冲突持续，但不等于全面战争确认', aiBrief:'截至9月3日，直接攻击仍在持续，霍尔木兹风险溢价维持。', summary:'页面表述为直接军事冲突持续，不把它写成全面战争确认或霍尔木兹全面封锁。', impact:'军事风险是10月上行风险再扩大的关键背景。', sourceName:'Reuters / AP market reports', tags:['美伊','霍尔木兹','军事风险','10月展望']},
      {title:'Les affrontements États-Unis-Iran se poursuivent, sans guerre totale confirmée', aiBrief:'Les attaques directes se poursuivent jusqu’au 3 sept., maintenant la prime de risque Hormuz.', summary:'La page parle d’affrontements directs continus, pas d’une guerre totale ou d’un blocage complet confirmé.', impact:'Le risque militaire explique la réaccentuation du risque haussier pour octobre.', sourceName:'Reuters / AP market reports', tags:['États-Unis-Iran','Hormuz','risque militaire','octobre']},
      {title:'USA-Iran-Konflikt hält an, aber kein bestätigter Vollkrieg', aiBrief:'Direkte Angriffe hielten bis 3. Sept. an und stützen die Hormuz-Risikoprämie.', summary:'Die Seite beschreibt fortgesetzte direkte Konflikte, keinen bestätigten Vollkrieg oder komplette Hormuz-Blockade.', impact:'Militärrisiko ist ein Kernfaktor für das wieder erhöhte Oktober-Aufwärtsrisiko.', sourceName:'Reuters / AP market reports', tags:['USA-Iran','Hormuz','Militärrisiko','Oktober']})},
    {id:'usdkrw-13563-20260904', category:'market', priority:3, date:'2026-09-04', updatedAt:'2026-09-04T07:15:00+09:00', badge:'환율', aiSummary:true, relevanceScore:.97, sourceUrl:'forecast.html', i18n:multi(
      {title:'원/달러 1,356원대…10월 원화 유류할증료 하방압력 확대', aiBrief:'2026년 9월 4일 07:15 KST 전후 USD/KRW는 약 1,356.3원, 100엔은 약 870원 수준입니다.', summary:'최근 환율은 1,394원대에서 1,350원대 중반까지 내려왔습니다. 이는 원화 환산금액을 낮추지만 유류할증료 단계 자체를 직접 결정하지 않습니다.', impact:'환율은 10월 인하 가능성을 유지시키는 가장 강한 하방 변수 중 하나입니다.', sourceName:'FX market reference', tags:['USD/KRW','1,356.3','원화 강세','하방 요인']},
      {title:'USD/KRW near 1,356 expands downside pressure on KRW surcharge amounts', aiBrief:'Near 2026.09.04 07:15 KST, USD/KRW was around 1,356.3 and 100 JPY around KRW 870.', summary:'USD/KRW moved from the 1,394 area to the mid-1,350s. FX lowers KRW-converted amounts but does not directly determine the surcharge stage.', impact:'FX remains one of the strongest downside variables keeping an October cut possible.', sourceName:'FX market reference', tags:['USD/KRW','1,356.3','KRW strength','downside']},
      {title:'USD/KRWは1,356ウォン台、ウォン建て負担の下押し拡大', aiBrief:'2026.09.04 07:15 KST前後でUSD/KRWは約1,356.3ウォン、100円は約870ウォンです。', summary:'為替は1,394ウォン台から1,350ウォン台半ばまで下落しました。ウォン換算額を下げますが、段階を直接決めません。', impact:'10月引き下げ可能性を残す最も強い下方向要因の一つです。', sourceName:'FX market reference', tags:['USD/KRW','1,356.3','ウォン高','下方向']},
      {title:'美元/韩元约1,356，扩大韩元燃油附加费下行压力', aiBrief:'2026.09.04 07:15 KST附近，USD/KRW约1,356.3，100日元约870韩元。', summary:'汇率从1,394附近降至1,350中段。它降低韩元换算金额，但不直接决定燃油附加费档位。', impact:'汇率仍是维持10月下调可能性的最强下行变量之一。', sourceName:'FX market reference', tags:['USD/KRW','1,356.3','韩元走强','下行']},
      {title:'USD/KRW près de 1 356, pression baissière accrue sur les montants KRW', aiBrief:'Vers 2026.09.04 07:15 KST, USD/KRW est proche de 1 356,3 et 100 JPY près de 870 KRW.', summary:'Le taux est passé de la zone 1 394 au milieu des 1 350. Il baisse les montants KRW mais ne fixe pas directement le niveau.', impact:'Le FX reste une des variables baissières les plus fortes pour une baisse d’octobre.', sourceName:'FX market reference', tags:['USD/KRW','1 356,3','KRW fort','baisse']},
      {title:'USD/KRW nahe 1.356 erhöht Abwärtsdruck auf KRW-Beträge', aiBrief:'Um 2026.09.04 07:15 KST lag USD/KRW bei etwa 1.356,3 und 100 JPY bei rund 870 KRW.', summary:'Der Kurs fiel vom Bereich 1.394 in die mittleren 1.350er. Das senkt KRW-Beträge, bestimmt aber nicht direkt die Stufe.', impact:'FX bleibt eine der stärksten Abwärtsvariablen für eine mögliche Oktober-Senkung.', sourceName:'FX market reference', tags:['USD/KRW','1.356,3','starker KRW','Abwärtsdruck']})},
    {id:'global-jetfuel-15685-opposite-crude-20260904', category:'market', priority:4, date:'2026-09-04', updatedAt:'2026-09-04T07:15:00+09:00', badge:'Jet Fuel', aiSummary:true, relevanceScore:.96, sourceUrl:'forecast.html', i18n:multi(
      {title:'글로벌 Jet Fuel 4.3% 하락…원유 급등과 반대 흐름', aiBrief:'IATA/S&P Global Platts 글로벌 Jet Fuel 주간 평균은 156.85달러/bbl로 전주 대비 4.3% 하락했습니다.', summary:'이 값은 Singapore MOPS가 아니라 글로벌 항공유 주간 평균입니다. 8월 27일 Singapore Jet Fuel 142.93달러와 함께 하방 신호를 제공합니다.', impact:'Jet Fuel 약세는 10월 인하 가능성을 유지하지만 중동 원유 급등이 재상승 위험을 남깁니다.', sourceName:'IATA / S&P Global Platts weekly reference', tags:['Global Jet Fuel','156.85','-4.3%','MOPS 구분']},
      {title:'Global Jet Fuel falls 4.3% while crude spikes in the opposite direction', aiBrief:'The IATA/S&P Global Platts global Jet Fuel weekly average was USD 156.85/bbl, down 4.3% week over week.', summary:'This is not Singapore MOPS. It is a global weekly jet-fuel reference and should be separated from the October Singapore MOPS average.', impact:'Weaker jet fuel keeps the cut case alive, but stronger Middle East crude leaves rebound risk.', sourceName:'IATA / S&P Global Platts weekly reference', tags:['Global Jet Fuel','156.85','-4.3%','MOPS distinction']},
      {title:'Global Jet Fuelは4.3%下落、原油急騰と逆方向', aiBrief:'IATA/S&P Global PlattsのGlobal Jet Fuel週間平均は156.85ドル/bblで、前週比4.3%下落しました。', summary:'これはSingapore MOPSではなく、世界の航空燃料週間平均です。10月Singapore MOPS平均とは分けて扱います。', impact:'Jet Fuelの弱さは引き下げ可能性を残しますが、中東原油高で再上昇リスクも残ります。', sourceName:'IATA / S&P Global Platts weekly reference', tags:['Global Jet Fuel','156.85','-4.3%','MOPS区別']},
      {title:'全球Jet Fuel下跌4.3%，与原油急涨方向相反', aiBrief:'IATA/S&P Global Platts全球Jet Fuel周均价为156.85美元/bbl，周环比下降4.3%。', summary:'这不是Singapore MOPS，而是全球航油周度参考值，应与10月Singapore MOPS均值分开。', impact:'航油走弱保留下调可能，但中东原油走强留下反弹风险。', sourceName:'IATA / S&P Global Platts weekly reference', tags:['Global Jet Fuel','156.85','-4.3%','MOPS区分']},
      {title:'Global Jet Fuel baisse de 4,3%, à l’opposé du pétrole', aiBrief:'La moyenne hebdomadaire IATA/S&P Global Platts Global Jet Fuel est de 156,85 USD/bbl, en baisse de 4,3%.', summary:'Ce n’est pas le Singapore MOPS. C’est une référence hebdomadaire mondiale, séparée de la moyenne MOPS d’octobre.', impact:'Le Jet Fuel faible garde la baisse possible, mais le pétrole du Moyen-Orient laisse un risque de rebond.', sourceName:'IATA / S&P Global Platts weekly reference', tags:['Global Jet Fuel','156.85','-4.3%','distinction MOPS']},
      {title:'Global Jet Fuel fällt 4,3%, während Rohöl steigt', aiBrief:'Der IATA/S&P Global Platts Global-Jet-Fuel-Wochendurchschnitt liegt bei 156,85 USD/bbl, 4,3% niedriger.', summary:'Das ist kein Singapore MOPS, sondern eine globale Wochenreferenz und vom Oktober-MOPS-Durchschnitt zu trennen.', impact:'Schwächeres Jetfuel hält die Senkungschance offen, aber höheres Nahost-Öl lässt Rebound-Risiko.', sourceName:'IATA / S&P Global Platts weekly reference', tags:['Global Jet Fuel','156.85','-4.3%','MOPS-Trennung']})},
    {id:'asia-jetfuel-supply-expands-20260904', category:'market', priority:5, date:'2026-09-04', updatedAt:'2026-09-04T07:15:00+09:00', badge:'공급', aiSummary:true, relevanceScore:.95, sourceUrl:'forecast.html', i18n:multi(
      {title:'아시아 Jet Fuel 공급 확대…계절수요 둔화와 함께 하방 요인', aiBrief:'중국·한국·일본의 Jet Fuel 공급 확대와 여름 성수기 종료가 항공유 가격을 누르는 요인으로 반영됐습니다.', summary:'Singapore regrade 약세는 Jet Fuel이 diesel 대비 상대적으로 약하다는 뜻입니다. Fujairah middle distillate 재고도 1.741 million barrels로 주간 19% 증가했습니다.', impact:'공급 개선은 인하 가능성을 지지하지만 호르무즈 군사위험을 완전히 상쇄하지는 못합니다.', sourceName:'S&P Global / refined-product market references', tags:['Asia Jet Fuel','Fujairah +19%','regrade','공급 완충']},
      {title:'Asia jet-fuel supply expands as seasonal demand cools', aiBrief:'China, Korea and Japan supply and post-summer demand softness are treated as jet-fuel downside factors.', summary:'A weaker Singapore regrade means jet fuel is relatively weaker versus diesel. Fujairah middle distillate inventories rose 19% to 1.741 million barrels.', impact:'Supply buffers support the cut case, but do not fully offset Hormuz military risk.', sourceName:'S&P Global / refined-product market references', tags:['Asia Jet Fuel','Fujairah +19%','regrade','supply buffer']},
      {title:'アジアJet Fuel供給拡大、季節需要鈍化とともに下方向要因', aiBrief:'中国・韓国・日本の供給増と夏需要の終了を航空燃料の下方向要因として反映しました。', summary:'Singapore regradeの弱さは、Jet Fuelがdieselに対して相対的に弱いことを示します。Fujairah中間留分在庫も19%増です。', impact:'供給改善は引き下げ可能性を支えますが、ホルムズ軍事リスクを完全には相殺しません。', sourceName:'S&P Global / refined-product market references', tags:['Asia Jet Fuel','Fujairah +19%','regrade','供給緩衝']},
      {title:'亚洲Jet Fuel供应扩大，叠加季节需求降温形成下行因素', aiBrief:'中国、韩国、日本供应增加和暑期旺季结束被反映为航油下行因素。', summary:'Singapore regrade走弱意味着Jet Fuel相对diesel偏弱。Fujairah中间馏分库存也升至1.741 million barrels，周增19%。', impact:'供应改善支持下调可能，但无法完全抵消霍尔木兹军事风险。', sourceName:'S&P Global / refined-product market references', tags:['Asia Jet Fuel','Fujairah +19%','regrade','供应缓冲']},
      {title:'L’offre asiatique de Jet Fuel augmente avec le reflux saisonnier', aiBrief:'La hausse de l’offre en Chine, Corée et Japon et la fin de la haute saison pèsent sur le Jet Fuel.', summary:'Un Singapore regrade plus faible signifie un Jet Fuel plus faible face au diesel. Les stocks Fujairah middle distillate montent aussi de 19%.', impact:'L’amélioration de l’offre soutient la baisse possible, sans effacer le risque militaire Hormuz.', sourceName:'S&P Global / refined-product market references', tags:['Asia Jet Fuel','Fujairah +19%','regrade','tampon offre']},
      {title:'Asiatisches Jet-Fuel-Angebot steigt bei schwächerer Saisonnachfrage', aiBrief:'Mehr Angebot aus China, Korea und Japan sowie nachlassende Sommernachfrage wirken nach unten.', summary:'Ein schwächerer Singapore regrade bedeutet, dass Jet Fuel gegenüber Diesel relativ schwach ist. Fujairah-Mitteldestillat-Lager stiegen um 19%.', impact:'Angebotspuffer stützen die Senkungschance, gleichen Hormuz-Militärrisiko aber nicht vollständig aus.', sourceName:'S&P Global / refined-product market references', tags:['Asia Jet Fuel','Fujairah +19%','regrade','Angebotspuffer']})},
    {id:'hormuz-public-tracking-four-vessels-20260904', category:'market', priority:6, date:'2026-09-04', updatedAt:'2026-09-04T07:15:00+09:00', badge:'호르무즈', aiSummary:true, relevanceScore:.94, sourceUrl:'forecast.html', i18n:multi(
      {title:'호르무즈 공개 추적 통항 극저조…Kpler commodity vessel 4척', aiBrief:'가장 최근 공개 Kpler 예비치는 commodity vessel 기준 4척입니다. 이는 전체 선박 수가 아닙니다.', summary:'전날 10척, 10일 평균 약 13척과 비교해 낮은 수치입니다. AIS 비활성 선박이나 비공개 추적 대상은 포함되지 않을 수 있습니다.', impact:'호르무즈 통항 제한은 운송·보험 위험을 높여 항공유 재상승 위험을 키웁니다.', sourceName:'Reuters citing Kpler / maritime tracking', tags:['Kpler','commodity vessel 4','Hormuz','AIS']},
      {title:'Hormuz public tracking remains very low: Kpler commodity vessels at 4', aiBrief:'The latest public Kpler preliminary count is 4 commodity vessels. This is not total vessel traffic.', summary:'It compares with 10 the prior day and a 10-day average near 13. AIS-dark or non-publicly tracked vessels may be missing.', impact:'Restricted Hormuz traffic lifts shipping and insurance risk and can feed jet-fuel rebound risk.', sourceName:'Reuters citing Kpler / maritime tracking', tags:['Kpler','commodity vessel 4','Hormuz','AIS']},
      {title:'ホルムズ公開追跡は低水準、Kpler commodity vessel 4隻', aiBrief:'最新のKpler公開予備値はcommodity vessel基準4隻です。全船舶数ではありません。', summary:'前日10隻、10日平均約13隻より低い水準です。AISを切った船や非公開追跡分は含まれない可能性があります。', impact:'ホルムズ通航制限は輸送・保険リスクを高め、Jet Fuel再上昇リスクにつながります。', sourceName:'Reuters citing Kpler / maritime tracking', tags:['Kpler','commodity vessel 4','ホルムズ','AIS']},
      {title:'霍尔木兹公开追踪通行很低：Kpler commodity vessel为4艘', aiBrief:'最新公开Kpler预估为commodity vessel 4艘，这不是全部船舶流量。', summary:'该数值低于前一日10艘和10日均值约13艘。关闭AIS或未公开追踪的船舶可能未包含。', impact:'霍尔木兹通行受限推高运输和保险风险，并可能带来航油反弹风险。', sourceName:'Reuters citing Kpler / maritime tracking', tags:['Kpler','commodity vessel 4','霍尔木兹','AIS']},
      {title:'Le suivi public d’Hormuz reste très bas: 4 commodity vessels Kpler', aiBrief:'Le dernier comptage public préliminaire Kpler est de 4 commodity vessels. Ce n’est pas le trafic total.', summary:'Il se compare à 10 la veille et environ 13 en moyenne sur dix jours. Les navires AIS éteint peuvent manquer.', impact:'Un trafic Hormuz limité augmente transport, assurance et risque de rebond du Jet Fuel.', sourceName:'Reuters citing Kpler / maritime tracking', tags:['Kpler','commodity vessel 4','Hormuz','AIS']},
      {title:'Hormuz öffentliches Tracking bleibt niedrig: 4 Kpler commodity vessels', aiBrief:'Die jüngste öffentliche Kpler-Vorabschätzung liegt bei 4 commodity vessels. Das ist nicht der gesamte Schiffsverkehr.', summary:'Das steht gegen 10 am Vortag und rund 13 im Zehntagesdurchschnitt. AIS-dunkle oder nicht öffentliche Schiffe können fehlen.', impact:'Begrenzter Hormuz-Verkehr erhöht Transport- und Versicherungsrisiko und kann Jetfuel-Rebound fördern.', sourceName:'Reuters citing Kpler / maritime tracking', tags:['Kpler','commodity vessel 4','Hormuz','AIS']})},
    {id:'iran-vessel-blacklist-56-20260904', category:'market', priority:7, date:'2026-09-04', updatedAt:'2026-09-04T07:15:00+09:00', badge:'해운', aiSummary:true, relevanceScore:.93, sourceUrl:'forecast.html', i18n:multi(
      {title:'이란 선박 블랙리스트 56척…운송·보험 위험 유지', aiBrief:'이란이 기존 45척에 11척을 추가해 원유·LNG·LPG·정제품 선박 등 총 56척을 블랙리스트에 올렸습니다.', summary:'이란은 벌금, 선박 억류, 화물 압류 가능성을 경고하고 있습니다. 이는 선박 선택 제한과 보험료 상승으로 이어질 수 있습니다.', impact:'선박·보험·STS 위험은 10월 유류할증료 상승 리스크를 유지시키는 변수입니다.', sourceName:'Maritime risk reports', tags:['blacklist 56','Iran','shipping risk','insurance']},
      {title:'Iran vessel blacklist stays at 56, keeping shipping and insurance risk high', aiBrief:'Iran added 11 vessels to a prior list of 45, bringing the blacklist to 56 crude, LNG, LPG and clean-product vessels.', summary:'Iran warned of possible fines, detention and cargo seizure. That can restrict vessel choice and lift insurance costs.', impact:'Higher shipping and insurance risk keeps jet-fuel rebound risk alive.', sourceName:'Maritime risk reports', tags:['blacklist 56','Iran','shipping risk','insurance']},
      {title:'イラン船舶ブラックリスト56隻、輸送・保険リスク継続', aiBrief:'既存45隻に11隻が加わり、原油・LNG・LPG・クリーン製品船など計56隻になりました。', summary:'罰金、船舶拘束、貨物押収の可能性が警告され、船舶選択と保険費を押し上げる可能性があります。', impact:'船舶・保険・STSリスクは10月上昇リスクを残す要因です。', sourceName:'Maritime risk reports', tags:['blacklist 56','イラン','輸送リスク','保険']},
      {title:'伊朗船舶黑名单维持56艘，运输和保险风险仍高', aiBrief:'伊朗在原45艘基础上新增11艘，涉及原油、LNG、LPG和成品油船。', summary:'伊朗警告可能罚款、扣船和扣货，这会限制船舶选择并推高保险成本。', impact:'更高的运输、保险和STS风险继续支撑航油反弹风险。', sourceName:'Maritime risk reports', tags:['blacklist 56','伊朗','海运风险','保险']},
      {title:'La blacklist iranienne reste à 56 navires, risque transport et assurance élevé', aiBrief:'L’Iran ajoute 11 navires à une liste de 45, couvrant brut, LNG, LPG et clean products.', summary:'Amendes, détentions et saisies de cargaison peuvent restreindre les navires et augmenter l’assurance.', impact:'Transport, assurance et STS maintiennent un risque haussier pour octobre.', sourceName:'Maritime risk reports', tags:['blacklist 56','Iran','transport','assurance']},
      {title:'Iran-Schiffsliste bleibt bei 56, Transport- und Versicherungsrisiko hoch', aiBrief:'Iran fügte 11 Schiffe zu 45 hinzu, darunter Rohöl-, LNG-, LPG- und Produktentanker.', summary:'Bußgelder, Festsetzungen und Ladungsbeschlagnahmen können Schiffsauswahl und Versicherungskosten belasten.', impact:'Transport-, Versicherungs- und STS-Risiko halten Jetfuel-Rebound-Risiko hoch.', sourceName:'Maritime risk reports', tags:['blacklist 56','Iran','Shipping','Versicherung']})},
    {id:'non-middle-east-crude-procurement-20260904', category:'market', priority:8, date:'2026-09-04', updatedAt:'2026-09-04T07:15:00+09:00', badge:'공급망', aiSummary:true, relevanceScore:.92, sourceUrl:'forecast.html', i18n:multi(
      {title:'한국·일본 등 비중동 원유조달 확대…호르무즈 의존 완화', aiBrief:'아시아 주요 원유 수입국들이 미국, 브라질, 아르헨티나 등 비중동 공급원을 더 활용하고 있습니다.', summary:'공급망 안정에는 도움이 되지만 항로와 운송시간이 길어져 물류비가 늘 수 있습니다.', impact:'대체 공급망은 공급 완충 요인이지만 운송비 상승 가능성을 함께 남깁니다.', sourceName:'Crude procurement market reports', tags:['대체 공급망','비중동 원유','운송비','공급 완충']},
      {title:'Korea, Japan and other Asian buyers expand non-Middle-East crude procurement', aiBrief:'Major Asian crude importers are using more U.S., Brazilian, Argentine and other non-Middle-East supply.', summary:'This helps supply stability but can lengthen voyages and raise logistics costs.', impact:'Alternative supply is a buffer, while longer routes keep cost risk alive.', sourceName:'Crude procurement market reports', tags:['alternative supply','non-Middle-East crude','freight','buffer']},
      {title:'韓国・日本などが非中東原油調達を拡大、ホルムズ依存を緩和', aiBrief:'アジア主要輸入国は米国、ブラジル、アルゼンチンなど非中東供給を活用しています。', summary:'供給安定には役立ちますが、航路と輸送時間が長くなり物流費が増える可能性があります。', impact:'代替供給は緩衝要因ですが、輸送費上昇リスクも残します。', sourceName:'Crude procurement market reports', tags:['代替供給','非中東原油','輸送費','緩衝']},
      {title:'韩国、日本等扩大非中东原油采购，降低霍尔木兹依赖', aiBrief:'亚洲主要原油进口国更多使用美国、巴西、阿根廷等非中东供应。', summary:'这有利于供应稳定，但航程和运输时间变长，物流费用可能上升。', impact:'替代供应是缓冲因素，但更长航线保留成本上行风险。', sourceName:'Crude procurement market reports', tags:['替代供应','非中东原油','运费','缓冲']},
      {title:'Corée, Japon et Asie élargissent les achats de brut hors Moyen-Orient', aiBrief:'Les grands importateurs asiatiques utilisent davantage les offres américaines, brésiliennes, argentines et autres.', summary:'Cela stabilise l’offre mais peut rallonger les trajets et augmenter les coûts logistiques.', impact:'L’offre alternative amortit le risque, tandis que les routes longues gardent un risque de coût.', sourceName:'Crude procurement market reports', tags:['offre alternative','brut hors Moyen-Orient','fret','tampon']},
      {title:'Korea, Japan und andere kaufen mehr Rohöl außerhalb des Nahen Ostens', aiBrief:'Große asiatische Importeure nutzen mehr US-, brasilianische, argentinische und andere Nicht-Nahost-Angebote.', summary:'Das hilft der Versorgungssicherheit, kann aber längere Reisen und höhere Logistikkosten bedeuten.', impact:'Alternative Versorgung puffert, während längere Routen Kostenrisiko erhalten.', sourceName:'Crude procurement market reports', tags:['alternative Versorgung','Nicht-Nahost-Rohöl','Fracht','Puffer']})},
    {id:'iraq-crude-export-buffer-20260904', category:'market', priority:9, date:'2026-09-04', updatedAt:'2026-09-04T07:15:00+09:00', badge:'공급', aiSummary:true, relevanceScore:.91, sourceUrl:'forecast.html', i18n:multi(
      {title:'이라크 원유수출 약 2.34m bpd…부분적 공급완충', aiBrief:'최근 이라크 원유 수출은 약 2.34 million bpd 수준으로 일부 중동 공급 우려를 완충합니다.', summary:'동시에 이란 원유수출은 약 260,000 bpd 수준으로 낮아져 단기 공급위험은 여전히 남아 있습니다.', impact:'이라크 수출 증가는 완충 요인이지만 중동 리스크 전체를 낮추지는 못합니다.', sourceName:'Crude export flow reference', tags:['Iraq exports','2.34m bpd','Iran exports','supply buffer']},
      {title:'Iraq crude exports near 2.34m bpd add a partial supply buffer', aiBrief:'Recent Iraq crude exports near 2.34 million bpd partly buffer Middle East supply concerns.', summary:'At the same time, Iranian crude exports near 260,000 bpd leave short-term supply risk in place.', impact:'Iraq export growth is a buffer, but it does not remove wider Middle East risk.', sourceName:'Crude export flow reference', tags:['Iraq exports','2.34m bpd','Iran exports','supply buffer']},
      {title:'イラク原油輸出約2.34m bpd、部分的な供給緩衝', aiBrief:'最近のイラク原油輸出は約2.34 million bpdで、中東供給懸念を一部緩和します。', summary:'一方でイラン原油輸出は約260,000 bpdまで低く、短期供給リスクは残ります。', impact:'イラク輸出増は緩衝要因ですが、中東リスク全体を消すものではありません。', sourceName:'Crude export flow reference', tags:['Iraq exports','2.34m bpd','Iran exports','供給緩衝']},
      {title:'伊拉克原油出口约2.34m bpd，形成部分供应缓冲', aiBrief:'近期伊拉克原油出口约2.34 million bpd，部分缓解中东供应担忧。', summary:'同时伊朗原油出口约260,000 bpd，短期供应风险仍在。', impact:'伊拉克出口增加是缓冲因素，但不能消除更广泛的中东风险。', sourceName:'Crude export flow reference', tags:['Iraq exports','2.34m bpd','Iran exports','供应缓冲']},
      {title:'Les exportations irakiennes proches de 2,34m bpd ajoutent un tampon', aiBrief:'Les exportations récentes de brut irakien autour de 2,34 million bpd amortissent partiellement les inquiétudes.', summary:'En parallèle, les exportations iraniennes proches de 260 000 bpd gardent un risque d’offre court terme.', impact:'La hausse irakienne amortit, mais ne supprime pas le risque régional plus large.', sourceName:'Crude export flow reference', tags:['Iraq exports','2.34m bpd','Iran exports','tampon offre']},
      {title:'Irak-Rohölexporte nahe 2,34m bpd liefern teilweisen Puffer', aiBrief:'Jüngste irakische Rohölexporte nahe 2,34 million bpd puffern Nahost-Angebotssorgen teilweise.', summary:'Gleichzeitig halten iranische Exporte nahe 260.000 bpd kurzfristiges Angebotsrisiko offen.', impact:'Irakisches Exportwachstum puffert, entfernt aber breiteres Nahost-Risiko nicht.', sourceName:'Crude export flow reference', tags:['Iraq exports','2.34m bpd','Iran exports','Angebotspuffer']})}
  ];

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
    var classes = ['','down','up','up','up'];
    box.innerHTML = p.rows.map(function(r, i){
      return '<div class="predict-factor"><div class="pf-label">'+esc(r[0])+'</div><div class="pf-val '+classes[i]+'">'+esc(r[1])+'</div></div>';
    }).join('');
  }
  function scrubStale(){
    var stale = /2026년 8월 유류할증료와 9월 전망|2026년 8월 국제선 유류할증료 공식 공시|8월 현재 적용|8월 공식 공시 반영|8월 산정 MOPS|9월 전망|9월 공시 대기|다음 달 9월|2026\.08\.31 07:15|2026\.09\.02 07:30|2026\.09\.03 09:45|1,374\.36|1,361\.63|95\.63|91\.01|90\.22|94\.65|VLCC 2척|undefined/i;
    var oldBrief = document.getElementById('sep03NewsBrief');
    if(oldBrief) oldBrief.remove();
    document.querySelectorAll('body *').forEach(function(el){
      if(el.tagName === 'SCRIPT' || el.tagName === 'STYLE') return;
      if(el.children.length === 0 && stale.test(el.textContent || '')) el.textContent = '';
      if(el.children.length <= 3 && /^\s*undefined\s*$/i.test(el.textContent || '')) el.remove();
    });
    document.querySelectorAll('#scenarioBox,#bookingDecisionBox,#mopsAnalysisBox').forEach(function(el){ el.innerHTML = ''; el.style.display = 'none'; });
    document.querySelectorAll('body *').forEach(function(el){
      if(el.tagName === 'SCRIPT' || el.tagName === 'STYLE' || el.children.length) return;
      var text = el.textContent || '';
      if(text.indexOf('7월 공식 공시 금액') >= 0) el.textContent = text.replace('7월 공식 공시 금액', '9월 공식 공시 금액');
    });
  }

  function renderNewsStaticSections(p){
    var updatedLabel = ({ko:'최종 업데이트', en:'Last updated', ja:'最終更新', zh:'最后更新', fr:'Dernière mise à jour', de:'Zuletzt aktualisiert'}[lang()] || 'Last updated');
    var mainSummary = Array.prototype.filter.call(document.querySelectorAll('.summary-card'), function(el){
      return el.id !== 'sep04NewsBrief' && !el.classList.contains('sep04-news-brief') && !el.closest('.official-summary-box');
    })[0];
    if(mainSummary){
      mainSummary.innerHTML = '<div class="summary-card-title">'+esc(p.newsTitle)+'</div>'
        + '<div class="summary-updated">'+esc(updatedLabel)+': '+esc(latest.asOf)+' · '+esc(p.rows[0][1])+'</div>'
        + '<ul>'+p.summary.map(function(s){ return '<li>'+esc(s)+'</li>'; }).join('')+'</ul>';
    }
    var marketBrief = document.querySelector('.market-brief-box');
    if(marketBrief){
      marketBrief.innerHTML = '<div class="mb-title">'+esc(p.indicator)+'</div>'
        + '<div class="mb-summary">'+esc(p.intro)+'</div>'
        + p.rows.slice(1).map(function(r){ return '<div class="mb-item"><strong>'+esc(r[0])+'</strong><br>'+esc(r[1])+'<br>'+esc(r[2])+'</div>'; }).join('')
        + '<div class="mb-summary">'+esc(p.sub)+'</div>';
    }
    var mb = document.querySelectorAll('.mb-summary');
    if(mb[0]) mb[0].textContent = p.intro;
    if(mb[1]) mb[1].textContent = p.sub;
    var dataRef = document.querySelector('.data-ref-summary');
    if(dataRef) dataRef.textContent = '→ ' + p.rows[0][1] + ' · ' + p.rows[1][1] + ' · ' + p.rows[2][1] + ' · ' + p.rows[3][1];
    document.querySelectorAll('.cta-card, .compare-card, .fare-compare-card, .booking-compare-card').forEach(function(el){
      if(/7월 공식 공시|8월 국제선|9월 공시 대기/i.test(el.textContent || '')){
        el.innerHTML = '<strong>'+esc(packs.ko.note === p.note ? '유류할증료 확인 후, 실제 항공권 총액도 비교하세요' : 'Compare actual ticket totals after checking surcharges')+'</strong>'
          + '<div>'+esc(p.note)+'</div>'
          + '<a href="index.html" class="btn-outline">'+esc(packs.ko.note === p.note ? '지금 항공권 총액 확인하기' : 'Check ticket total now')+'</a>';
      }
    });
  }

  function renderForecast(){
    if(!pathIs('forecast')) return;
    var p = pack(lang());
    updateHead(p.meta, p.desc, 'https://aero-surcharge.com/forecast.html');
    setText('fore.pageTitle', p.title);
    setText('fore.pageSub', p.sub);
    setText('fore.h1', p.title);
    setText('fore.section.indicators', p.indicator);
    setHtml('fore.notice', p.notice);
    setText('fore.intro', p.intro);
    setText('fore.summary.updated', (p.updatedLabel || 'Last updated') + ': ' + latest.asOf + ' · ' + p.rows[0][1]);
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
      verdictBox.className = verdictBox.className || 'forecast-verdict-box';
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
    document.querySelectorAll('.summary-card ul, .forecast-summary-card ul').forEach(function(ul){
      if(!ul.closest('#sep04NewsBrief')) ul.innerHTML = p.summary.map(function(x){ return '<li>'+esc(x)+'</li>'; }).join('');
    });
    var key = document.querySelector('.key-vars, .keyvars, #keyVariables');
    if(key) key.innerHTML = p.keyVars.map(function(x){ return '<span class="pill">'+esc(x)+'</span>'; }).join('');
    var keyGrid = document.getElementById('keyVarsGrid');
    if(keyGrid) keyGrid.innerHTML = p.keyVars.map(function(x){ return '<span style="display:inline-block;margin:3px 6px 3px 0;padding:5px 8px;border:1px solid #BFDBFE;border-radius:999px;background:#EFF6FF;color:#0F172A;">'+esc(x)+'</span>'; }).join('');
    renderPredict(p);
    scrubStale();
    if(release){
      setText('fore.basis.body', p.foot);
      setText('fore.aiNotice', p.note);
      var guide=document.getElementById('bookingGuideBox');
      if(guide) guide.innerHTML='<div class="bg-title">'+esc(p.ui[0])+'</div><div class="bg-item">'+esc(p.note)+'</div><div class="bg-item">'+esc(p.verdict1)+'</div><div class="bg-item">'+esc(p.rows[1][2])+'</div>';
      document.querySelectorAll('#relatedLinks a').forEach(function(a,i){a.textContent=p.ui[[2,3,4,5][i]] || a.textContent;});
      var faq = document.getElementById('forecastFaqBox');
      if(faq) faq.innerHTML = '<h2 class="bg-title">'+esc(p.faqTitle)+'</h2><ul>'+p.faq.map(function(x){return '<li><strong>'+esc(x.q)+'</strong><br>'+esc(x.a)+'</li>';}).join('')+'</ul>';
      var foot = document.querySelector('[data-i18n="fore.indicator.footnote"]');
      if(foot) foot.innerHTML = esc(p.foot)+' '+release.sources.slice(0,2).map(function(s){return '<a href="'+esc(s[1])+'" target="_blank" rel="noopener noreferrer">'+esc(s[0])+'</a>';}).join(' · ');
    }
    updateJsonLd('forecast', p);
  }

  function installNewsCards(){
    if(release) newsCards = release.newsCards;
    var list = Array.isArray(window.FIXED_NEWS) ? window.FIXED_NEWS : (typeof FIXED_NEWS !== 'undefined' && Array.isArray(FIXED_NEWS) ? FIXED_NEWS : null);
    if(!list) return;
    var stale = /20260908|20260907|20260904|20260903|20260902|20260831|20260828|20260827|136163|1374|five-week-high|sept2-close|global-jetfuel-15685-down|asia-jetfuel-supply-fujairah|hormuz-kpler|blacklist-56/i;
    list = list.filter(function(item){
      var id = item && item.id ? String(item.id) : '';
      if(/september-surcharge|airpremia|tway|jeju|eastar|airseoul/i.test(id)) return true;
      return !stale.test(id) && !newsCards.some(function(card){ return card.id === id; });
    });
    newsCards.slice().reverse().forEach(function(item){
      var localized = item.i18n[lang()] || item.i18n.en || item.i18n.ko;
      list.unshift(Object.assign({}, item, localized, {i18n:item.i18n, sourceUrl:item.sourceUrl || 'forecast.html'}));
    });
    window.FIXED_NEWS = list;
    if(typeof FIXED_NEWS !== 'undefined') FIXED_NEWS = list;
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
    var box = document.getElementById('sep04NewsBrief');
    var old = document.getElementById('sep03NewsBrief'); if(old) old.remove();
    if(!box){
      box = document.createElement('div');
      box.id = 'sep04NewsBrief';
      box.className = 'summary-card sep04-news-brief';
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
    if(!pathIs('news')) return;
    var l = lang(), p = pack(l);
    updateHead(p.newsMeta, p.desc, 'https://aero-surcharge.com/news.html');
    installNewsCards();
    setText('news.pageTitle', p.newsTitle);
    setText('news.h1', p.newsTitle);
    setText('news.pageSub', p.newsSub);
    setText('news.note', p.note);
    setText('news.surchargeNote', p.note);
    setText('news.dataRef', p.sub);
    setText('news.latest.title', p.latest);
    setText('news.previous.title', p.previous);
    setText('news.decisionTitle', p.verdictTitle);
    setText('news.decisionLine1', '→ ' + p.verdict1);
    setText('news.decisionLine2', '→ ' + p.verdict2);
    setText('news.decisionLong', p.rows[0][1]);
    setText('news.forecastCta.title', p.title);
    setText('news.forecastCta.desc', p.intro);
    setText('news.forecastCta.btn', p.forecastBtn);
    setText('news.summary.updated', (p.updatedLabel || 'Last updated') + ': ' + latest.asOf + ' · ' + p.rows[0][1]);
    document.querySelectorAll('.filter-btn, .category-filter button').forEach(function(btn, i){ if(p.filters[i]) btn.textContent = p.filters[i]; });
    renderNewsBrief(p);
    renderNewsStaticSections(p);
    renderOfficialBox(p, l);
    if(typeof window.renderNews === 'function' && !window.__AERO_SEP04_RENDERING){
      window.__AERO_SEP04_RENDERING = true;
      try { window.renderNews(); } catch(e) {}
      window.__AERO_SEP04_RENDERING = false;
    }
    relocalizeCards();
    var latestTitle = document.querySelector('.news-section-title[data-section="latest"], .news-section-label.latest .news-section-title');
    var previousTitle = document.querySelector('.news-section-title[data-section="previous"], .news-section-label.previous .news-section-title');
    if(latestTitle) latestTitle.textContent = p.latest;
    if(previousTitle) previousTitle.textContent = p.previous;
    document.querySelectorAll('.news-section-meta, .news-section-sub').forEach(function(el){
      if(/Archive|아카이브|アーカイブ|归档|Archiv|date|날짜/i.test(el.textContent || '')) el.textContent = p.archive;
    });
    scrubStale();
    if(release){
      var compare=document.getElementById('compareList');
      if(compare) compare.innerHTML=airlineRows(l).map(function(r){return '<li>'+esc(r[1])+': '+esc(r[2])+'</li>';}).join('');
      setText('news.compareTitle',p.ui[2]);
      setText('news.basisBody',p.foot);
      var keyBox=document.getElementById('newsKeyVariables');
      if(keyBox){
        keyBox.firstElementChild.textContent=p.keyTitle;
        Array.from(keyBox.lastElementChild.children).forEach(function(el,i){el.textContent=p.rows[[3,2,1,0][i]][0];});
      }
      var related=document.getElementById('newsRelatedLinksBox');
      if(related){
        related.firstElementChild.textContent=p.ui[1];
        related.querySelectorAll('a').forEach(function(a,i){a.textContent=[p.title,p.ui[6],p.ui[2],p.ui[7],p.ui[4],p.ui[3]][i];if(i===2)a.href='fuel-surcharge-graph.html';});
      }
    }
    updateJsonLd('news', p);
  }

  function updateJsonLd(kind, p){
    var pageEntityUpdated = false;
    document.querySelectorAll('script[type="application/ld+json"]').forEach(function(node){
      try{
        var json = JSON.parse(node.textContent || '{}');
        if(json && typeof json === 'object'){
          function update(entity){
            if(!entity || typeof entity !== 'object') return;
            if(Array.isArray(entity)){ entity.forEach(update); return; }
            if(entity['@graph']) entity['@graph'].forEach(update);
            var type = entity['@type'];
            // NewsArticle fields belong to individual cards, not the page summary.
            if(kind === 'news' && /Article/.test(String(type))) return;
            if(type === 'FAQPage' && release){
              entity.mainEntity = kind === 'forecast' ? p.faq.map(function(x){return {'@type':'Question',name:x.q,acceptedAnswer:{'@type':'Answer',text:x.a}};}) : [];
              entity['@id'] = 'https://aero-surcharge.com/'+kind+'.html#faq';
            }
            if(/Article|WebPage|CollectionPage|FAQPage/.test(String(type))){
              pageEntityUpdated = true;
              entity.headline = kind === 'news' ? p.newsTitle : p.title;
              entity.description = p.desc;
              entity.dateModified = release ? release.modified : '2026-09-04T07:15:00+09:00';
              entity.inLanguage = lang();
            }
          }
          update(json);
          if(kind === 'news' && json['@type'] === 'FAQPage' && release){node.remove(); return;}
          node.textContent = JSON.stringify(json);
        }
      }catch(e){}
    });
    if(kind === 'news' && !pageEntityUpdated && release){
      var pageSchema = document.getElementById('newsCollectionStructuredData');
      if(!pageSchema){
        pageSchema = document.createElement('script');
        pageSchema.type = 'application/ld+json';
        pageSchema.id = 'newsCollectionStructuredData';
        document.head.appendChild(pageSchema);
      }
      pageSchema.textContent = JSON.stringify({
        '@context':'https://schema.org','@type':'CollectionPage',
        headline:p.newsTitle,description:p.desc,dateModified:release.modified,
        mainEntityOfPage:'https://aero-surcharge.com/news.html',url:'https://aero-surcharge.com/news.html',
        author:{'@type':'Organization',name:'aero-surcharge.com'},
        publisher:{'@type':'Organization',name:'aero-surcharge.com'},inLanguage:lang()
      });
    }
  }

  function applyAll(){ renderForecast(); renderNews(); }
  var prevRenderForecast = window.renderForecastPage;
  if(typeof prevRenderForecast === 'function') window.renderForecastPage = function(){ var out = prevRenderForecast.apply(this, arguments); setTimeout(renderForecast, 0); return out; };
  var prevRenderNews = window.renderNews;
  if(typeof prevRenderNews === 'function') window.renderNews = function(){ var out = prevRenderNews.apply(this, arguments); if(!window.__AERO_SEP04_RENDERING) setTimeout(renderNews, 0); return out; };
  var prevApplyLanguage = window.applyLanguage;
  if(typeof prevApplyLanguage === 'function') window.applyLanguage = function(){ var out = prevApplyLanguage.apply(this, arguments); applyAll(); setTimeout(applyAll, 0); return out; };
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyAll);
  else applyAll();
  [0,100,400,900,1600,2600,4200,6200,9000,14000,22000,36000,52000].forEach(function(ms){ setTimeout(applyAll, ms); });
})();
