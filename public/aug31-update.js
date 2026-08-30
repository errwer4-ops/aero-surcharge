(function(){
  var ISO = '2026-08-31T07:15:00+09:00';
  window.AERO_MARKET_NUMBERS_20260831 = {
    asOf: '2026.08.31 07:15 KST',
    usdKrw: 1377.3,
    jpy100Krw: 853,
    septemberBaselineUsdPerBbl: 149.29,
    septemberBaselineCentsPerGal: 355.46,
    singaporeJetFuelFlatUsdPerBbl: 142.93,
    singaporeJetFuelDate: '2026.08.27',
    singaporeJetFuelVsBaselineUsd: -6.36,
    singaporeJetFuelVsBaselinePct: -4.3,
    brentUsdPerBbl: 90.32,
    brentPct: 2.52,
    wtiUsdPerBbl: 85.41,
    wtiPct: 2.41,
    kplerCommodityVessels: 7,
    kplerTenDayAvg: 15,
    octoberWindow: '2026.08.16~2026.09.15',
    octoberStatus: '산정 중'
  };
  window.AERO_MARKET_NUMBERS_LATEST = Object.assign({}, window.AERO_MARKET_NUMBERS_LATEST || {}, window.AERO_MARKET_NUMBERS_20260831);
  window.AERO_MARKET_SNAPSHOTS = Object.assign({}, window.AERO_MARKET_SNAPSHOTS || {}, {'2026-08-31': window.AERO_MARKET_NUMBERS_20260831});

  function lang(){
    var raw = (window.getCurrentLang ? window.getCurrentLang() : (localStorage.getItem('aero_lang') || document.documentElement.lang || 'ko')).toLowerCase().replace('_','-');
    if(raw === 'cn' || raw.indexOf('zh') === 0) return 'zh';
    if(raw === 'jp') return 'ja';
    return raw.split('-')[0] || 'ko';
  }
  function esc(v){
    return String(v == null ? '' : v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});
  }
  function setText(key, value){
    document.querySelectorAll('[data-i18n="'+key+'"]').forEach(function(el){ el.textContent = value || ''; });
  }
  function setHtml(key, value){
    document.querySelectorAll('[data-i18n="'+key+'"]').forEach(function(el){ el.innerHTML = value || ''; });
  }
  function updateHead(title, desc, url){
    if(title) document.title = title;
    var meta = document.querySelector('meta[name="description"]');
    if(meta && desc) meta.setAttribute('content', desc);
    var ogTitle = document.querySelector('meta[property="og:title"]');
    if(ogTitle && title) ogTitle.setAttribute('content', title);
    var ogDesc = document.querySelector('meta[property="og:description"]');
    if(ogDesc && desc) ogDesc.setAttribute('content', desc);
    var ogUrl = document.querySelector('meta[property="og:url"]');
    if(ogUrl && url) ogUrl.setAttribute('content', url);
    var canonical = document.querySelector('link[rel="canonical"]');
    if(canonical && url) canonical.setAttribute('href', url);
  }
  function pathIs(name){
    return new RegExp('/'+name+'(?:\\.html)?(?:$|[?#])').test(location.pathname + location.search);
  }

  var baseRows = {
    ko: [
      ['10월 종합','보합~인하 압력 우세 · 변동성 재확대 · 신뢰도 낮음~보통','항공유와 환율은 인하 쪽으로 기울었지만 국제유가가 반등해 단계·금액은 확정하지 않습니다.'],
      ['9월 확정 Baseline','21단계 · 2026.07.16~08.15 Singapore Jet Fuel 평균 149.29달러/bbl · 355.46 cents/gal','9월 유류할증료 산정 확정값입니다. 10월 평균으로 쓰지 않습니다.'],
      ['10월 산정기간','2026.08.16~09.15 진행 중 · 누적 평균 MOPS/평균환율 집계 중','현재값은 참고값이며 10월 공식 단계 산정값은 아직 아닙니다.'],
      ['USD/KRW','2026.08.31 07:15 KST 이전 최근 약 1,377.3원 · 100엔 약 853원','원화 부과액의 강한 하락 요인입니다. 단계 자체를 직접 낮추는 변수로 쓰지 않습니다.'],
      ['Singapore Jet Fuel','2026.08.27 flat price 142.93달러/bbl · 9월 기준보다 -6.36달러, 약 -4.3%','항공유 시장에서 10월 인하 조건이 뚜렷해졌다는 신호입니다. 단 하루 시장값이지 10월 평균은 아닙니다.'],
      ['아시아 Jet Fuel 공급','한국·일본 정제품 수출 견조 · 중국 9월 Jet Fuel cargo 공급 증가','동아시아 공급 개선은 Singapore Jet Fuel 가격과 스프레드 완화 요인입니다.'],
      ['국제유가','2026.08.31 오전 Brent 약 90.32달러(+2.52%) · WTI 약 85.41달러(+2.41%)','미국의 이란 라락섬 공격 이후 지정학적 위험 프리미엄이 다시 확대됐습니다.'],
      ['호르무즈 운항','Kpler 공개 추적 commodity vessel 예비집계 7척 · 10일 평균 약 15척보다 낮음','전체 선박 수가 아니며 AIS 비활성 선박은 제외될 수 있습니다. 평균 이하라 높은 위험으로 봅니다.'],
      ['호르무즈 외교','카타르·오만 중재와 조건부 재개방 논의 지속 · 라락섬 공습으로 불확실성 재확대','협상 결렬로 단정하지 않고, 협상 지속과 군사위험 확대를 분리합니다.'],
      ['해상기뢰·군사위험','미국은 이란 라락섬 발사대 2곳이 기뢰 투입 준비와 관련 있다고 밝혔고 이란은 보복을 예고','기뢰 설치 완료가 아니라 미국 측 주장 범위의 위험 재부각으로 표시합니다.']
    ],
    en: [
      ['October overall','Flat-to-cut pressure leads · geopolitical volatility re-expanded · low-to-medium confidence','Jet fuel and FX now lean lower, but Larak Island strikes raised military risk again. Stage and amounts are not confirmed.'],
      ['September confirmed baseline','Level 21 · 2026.07.16-08.15 Singapore Jet Fuel average USD 149.29/bbl · 355.46 cents/gal','This is the confirmed September surcharge basis, not the October average.'],
      ['October calculation window','2026.08.16-09.15 in progress · cumulative MOPS average and average FX still being collected','Current values are references, not official October calculation values.'],
      ['USD/KRW','Near KRW 1,377.3 before 2026.08.31 07:15 KST · 100 JPY near KRW 853','Strong downside factor for KRW-denominated surcharge amounts. It does not directly set the stage.'],
      ['Singapore Jet Fuel','2026.08.27 flat price USD 142.93/bbl · USD 6.36 below September baseline, about -4.3%','A clear jet-fuel downside signal for October. It is a one-day market reference, not the October average.'],
      ['Asia Jet Fuel supply','Korea and Japan refined-product exports firm · China September Jet Fuel cargo supply rises','East Asian supply improvement can ease Singapore Jet Fuel prices and spreads.'],
      ['International crude','Morning 2026.08.31 Brent near USD 90.32 (+2.52%) · WTI near USD 85.41 (+2.41%)','Geopolitical risk premium expanded again after the U.S. strike on Iran’s Larak Island.'],
      ['Hormuz transit','Kpler public preliminary commodity-vessel tracking: 7 · below the 10-day average near 15','Not total vessel traffic; AIS-dark vessels may be excluded. Below-average transit keeps risk high.'],
      ['Hormuz diplomacy','Qatar/Oman mediation and conditional reopening talks continue · Larak strike re-expanded uncertainty','Do not call talks collapsed; separate continuing diplomacy from higher military risk.'],
      ['Mine and military risk','The U.S. said two Larak Island launch sites were linked to mine-laying preparations; Iran warned of retaliation','Shown as renewed risk within the U.S. claim, not as confirmed mine deployment.']
    ]
  };
  baseRows.ja = [
    ['10月総合','横ばい~引き下げ圧力優勢 · 地政学的変動性再拡大 · 信頼度低~中','航空燃料と為替は下方向だが、ララク島攻撃後に軍事リスクが再拡大。段階・金額は未確定。'],
    ['9月確定基準','21段階 · 2026.07.16~08.15 Singapore Jet Fuel平均149.29ドル/bbl · 355.46 cents/gal','9月の確定算定値であり、10月平均ではありません。'],
    ['10月算定期間','2026.08.16~09.15進行中 · 累積MOPS平均と平均為替は集計中','現在値は参考値で、10月公式算定値ではありません。'],
    ['USD/KRW','2026.08.31 07:15 KST前の直近約1,377.3ウォン · 100円約853ウォン','ウォン建て金額の強い下押し要因。段階を直接決める変数ではありません。'],
    ['Singapore Jet Fuel','2026.08.27 flat price 142.93ドル/bbl · 9月基準より-6.36ドル、約-4.3%','10月の引き下げ条件が明確になった信号。ただし一日市場値で10月平均ではありません。'],
    ['アジアJet Fuel供給','韓国・日本の石油製品輸出堅調 · 中国9月Jet Fuel cargo供給増','東アジア供給改善はSingapore Jet Fuel価格とスプレッドの緩和要因です。'],
    ['国際原油','2026.08.31朝 Brent約90.32ドル(+2.52%) · WTI約85.41ドル(+2.41%)','米国のイラン・ララク島攻撃後、地政学的リスクプレミアムが再拡大。'],
    ['ホルムズ運航','Kpler公開追跡commodity vessel予備集計7隻 · 10日平均約15隻を下回る','全船舶数ではなく、AIS非表示船は除外される可能性があります。平均以下で高リスク。'],
    ['ホルムズ外交','カタール・オマーン仲介と条件付き再開協議は継続 · ララク島攻撃で不確実性再拡大','協議決裂とはせず、外交継続と軍事リスク拡大を分離します。'],
    ['機雷・軍事リスク','米国はララク島発射台2カ所が機雷投入準備に関連すると説明し、イランは報復を予告','機雷設置完了ではなく、米国側主張範囲のリスク再浮上として表示。']
  ];
  baseRows.zh = [
    ['10月综合','持平~下调压力占优 · 地缘波动性再扩大 · 可信度低~中','航油和汇率转向下行，但拉腊克岛攻击后军事风险再次扩大。档位和金额不确认。'],
    ['9月确认基准','第21档 · 2026.07.16~08.15 Singapore Jet Fuel均值149.29美元/bbl · 355.46 cents/gal','这是9月确认计算值，不是10月均值。'],
    ['10月计算期','2026.08.16~09.15进行中 · 累计MOPS均值和平均汇率仍在统计','当前值是参考值，不是10月官方计算值。'],
    ['USD/KRW','2026.08.31 07:15 KST前近期约1,377.3韩元 · 100日元约853韩元','韩元金额的强下行因素，不直接决定档位。'],
    ['Singapore Jet Fuel','2026.08.27 flat price 142.93美元/bbl · 较9月基准低6.36美元，约-4.3%','10月下调条件更明确的信号。但这是一日市场参考，不是10月均值。'],
    ['亚洲Jet Fuel供应','韩国、日本成品油出口稳健 · 中国9月Jet Fuel cargo供应增加','东亚供应改善有助于Singapore Jet Fuel价格和价差缓和。'],
    ['国际油价','2026.08.31上午Brent约90.32美元(+2.52%) · WTI约85.41美元(+2.41%)','美国攻击伊朗拉腊克岛后，地缘风险溢价再次扩大。'],
    ['霍尔木兹通行','Kpler公开追踪commodity vessel预备统计7艘 · 低于10日均值约15艘','不是全部船舶数量；AIS关闭船只可能不包含。低于均值意味着高风险。'],
    ['霍尔木兹外交','卡塔尔/阿曼斡旋与条件式重开讨论继续 · 拉腊克岛攻击使不确定性再扩大','不写成谈判破裂，区分外交持续和军事风险上升。'],
    ['水雷与军事风险','美国称拉腊克岛两处发射点与布雷准备有关，伊朗预告报复','按美国说法显示风险再现，不写成已完成布雷。']
  ];
  baseRows.fr = [
    ['Vue octobre','Pression stable~baissière dominante · volatilité géopolitique relancée · confiance faible à moyenne','Jet fuel et FX penchent vers la baisse, mais la frappe de Larak Island a relancé le risque militaire. Niveau et montants non confirmés.'],
    ['Base septembre confirmée','Niveau 21 · moyenne Singapore Jet Fuel 2026.07.16-08.15: 149.29 USD/bbl · 355.46 cents/gal','Base confirmée de septembre, pas la moyenne d’octobre.'],
    ['Fenêtre octobre','2026.08.16-09.15 en cours · MOPS cumulé et FX moyen en collecte','Les valeurs actuelles sont des références, pas les valeurs officielles d’octobre.'],
    ['USD/KRW','Env. 1 377,3 KRW avant 2026.08.31 07:15 KST · 100 JPY env. 853 KRW','Fort facteur baissier pour les montants en KRW; ne fixe pas directement le niveau.'],
    ['Singapore Jet Fuel','Flat price du 2026.08.27: 142.93 USD/bbl · 6.36 USD sous la base septembre, soit environ -4.3%','Signal baissier clair pour octobre. C’est une valeur de marché journalière, pas la moyenne d’octobre.'],
    ['Offre Asia Jet Fuel','Exportations de produits raffinés coréennes et japonaises solides · offre chinoise de cargo Jet Fuel en hausse en septembre','L’amélioration de l’offre est-asiatique peut apaiser prix et spreads Singapore Jet Fuel.'],
    ['Pétrole international','Matin 2026.08.31: Brent env. 90.32 USD (+2.52%) · WTI env. 85.41 USD (+2.41%)','La prime de risque géopolitique a repris après la frappe américaine sur Larak Island.'],
    ['Transit Hormuz','Suivi public préliminaire Kpler commodity vessels: 7 · sous la moyenne 10 jours env. 15','Ce n’est pas le trafic total; les navires AIS coupés peuvent être exclus. Risque élevé.'],
    ['Diplomatie Hormuz','Médiation Qatar/Oman et discussions de réouverture conditionnelle continuent · incertitude relancée par Larak','Ne pas conclure à un échec des négociations; séparer diplomatie et risque militaire.'],
    ['Mines et risque militaire','Les États-Unis disent que deux sites de Larak étaient liés à des préparatifs de mines; l’Iran menace de représailles','Risque selon l’affirmation américaine, pas déploiement confirmé de mines.']
  ];
  baseRows.de = [
    ['Oktober-Sicht','Stabil bis Senkungsdruck dominant · geopolitische Volatilität erneut erhöht · geringe bis mittlere Sicherheit','Jetfuel und FX sprechen für niedrigere Werte, aber Larak Island erhöhte das militärische Risiko. Stufe und Beträge nicht bestätigt.'],
    ['Bestätigte September-Basis','Stufe 21 · Singapore-Jet-Fuel-Durchschnitt 2026.07.16-08.15: 149.29 USD/bbl · 355.46 cents/gal','Bestätigte September-Basis, nicht der Oktober-Durchschnitt.'],
    ['Oktober-Fenster','2026.08.16-09.15 läuft · kumulierter MOPS-Durchschnitt und Durchschnitts-FX werden gesammelt','Aktuelle Werte sind Referenzen, keine offiziellen Oktober-Berechnungswerte.'],
    ['USD/KRW','Vor 2026.08.31 07:15 KST zuletzt ca. 1.377,3 KRW · 100 JPY ca. 853 KRW','Starker Abwärtsfaktor für KRW-Beträge; legt die Stufe nicht direkt fest.'],
    ['Singapore Jet Fuel','Flat price am 2026.08.27: 142.93 USD/bbl · 6.36 USD unter September-Basis, ca. -4.3%','Klares Jetfuel-Abwärtssignal für Oktober. Tagesmarktwert, nicht Oktober-Durchschnitt.'],
    ['Asia Jet Fuel Angebot','Korea/Japan Raffinerieprodukt-Exporte solide · China September Jet Fuel cargo Angebot steigt','Besseres ostasiatisches Angebot kann Singapore-Jet-Fuel-Preise und Spreads entspannen.'],
    ['Internationales Öl','Morgen 2026.08.31: Brent ca. 90.32 USD (+2.52%) · WTI ca. 85.41 USD (+2.41%)','Nach dem US-Schlag auf Larak Island stieg die geopolitische Risikoprämie wieder.'],
    ['Hormuz-Verkehr','Kpler public preliminary commodity-vessel tracking: 7 · unter 10-Tage-Schnitt ca. 15','Nicht Gesamtverkehr; AIS-dunkle Schiffe können fehlen. Unter Durchschnitt bleibt hohes Risiko.'],
    ['Hormuz-Diplomatie','Katar/Oman-Vermittlung und bedingte Wiederöffnungsgespräche laufen · Larak erhöht Unsicherheit','Keine gescheiterten Gespräche behaupten; Diplomatie und militärisches Risiko trennen.'],
    ['Minen- und Militärrisiko','Die USA sagen, zwei Larak-Startplätze seien mit Minenvorbereitungen verbunden; Iran kündigt Vergeltung an','Als erneutes Risiko nach US-Aussage zeigen, nicht als bestätigte Minenlegung.']
  ];

  function pack(l){
    var allRows = baseRows[l] || baseRows.en;
    var rows = [allRows[0], allRows[3], allRows[4], allRows[6]];
    var packs = {
      ko: {
        forecastTitle: '2026년 10월 국제선 유류할증료 전망',
        forecastMetaTitle: '2026년 10월 국제선 유류할증료 전망 | MOPS·환율·호르무즈',
        forecastDesc: '2026년 8월 31일 기준 Singapore Jet Fuel, MOPS, 원달러 환율, 국제유가와 호르무즈 상황을 분석해 10월 국제선 유류할증료 인하 가능성을 추적합니다.',
        forecastSub: '2026.08.31 07:15 KST 기준 · 9월 21단계 확정 · 10월 산정기간 진행 중 · 환율 ↓↓ / Jet Fuel ↓↓ / 국제유가 ↑↑',
        notice: '<strong>확인:</strong> 9월 국제선 유류할증료는 21단계로 대폭 인상이 확정됐습니다. 10월은 산정기간 진행 중이며 공식 공시 전까지 단계·노선별 금액은 확정하지 않습니다.',
        intro: '2026년 8월 31일 기준 10월 국제선 유류할증료는 보합~인하 압력이 우세합니다. 원/달러 환율이 약 1,377원까지 하락했고 8월 27일 Singapore Jet Fuel도 142.93달러/bbl로 9월 산정 평균 149.29달러보다 낮아졌습니다. 다만 Brent와 WTI가 2% 이상 반등해 아직 인하를 확정하기는 어렵습니다.',
        indicatorTitle: '2026년 10월 유류할증료 전망 핵심 지표',
        th: ['항목','현재 확인 상태','10월 전망에서의 의미'],
        foot: '* 142.93달러는 2026년 8월 27일 Singapore Jet Fuel 시장 flat price 참고값입니다. 10월 산정기간 평균 MOPS 또는 공식 기준유가가 아닙니다.',
        summaryTitle: '9월 확정 Baseline과 10월 전망 요약',
        updated: '최종 업데이트: 2026.08.31 07:15 KST · 보합~인하 압력 우세 · 지정학적 변동성 재확대 · 신뢰도 낮음~보통',
        verdictTitle: '2026년 10월 전망 결론',
        verdict1: '10월 단계·노선별 금액은 아직 확정되지 않았습니다.',
        verdict2: '환율과 Singapore Jet Fuel은 인하 요인이지만 국제유가가 다시 반등해 아직 방향을 확정하지 않습니다.',
        verdictShort: '10월 전망: 보합~인하 압력 우세 · 지정학적 변동성 재확대',
        verdictLong: '신뢰도: 낮음~보통 · 특정 단계 예측 보류',
        keyTitle: '주요 확인 항목',
        keyVars: ['9월 21단계 확정','10월 산정기간 2026.08.16~09.15','USD/KRW 약 1,377.3','Singapore Jet Fuel 142.93','9월 Baseline 149.29 대비 -4.3%','Brent 90.32 / WTI 85.41','Kpler 공개추적 7척','라락섬 공습·보복 예고','해상기뢰 위험 재부각','10월 단계·금액 미확정'],
        newsTitle: '유류할증료 MOPS 환율 호르무즈 최신 뉴스',
        newsMetaTitle: '유류할증료 MOPS 환율 호르무즈 최신 뉴스 | 2026년 8월 31일',
        newsDesc: '2026년 8월 31일 기준 Singapore Jet Fuel 142.93달러, 원달러 1,377원대, Brent·WTI 반등과 호르무즈 라락섬 공습 뉴스를 정리합니다.',
        newsSub: '2026.08.31 07:15 KST 기준 · 9월 21단계 확정 · 10월 전망: 보합~인하 압력 우세 · 지정학적 변동성 재확대',
        note: '※ 유류할증료는 발권일 기준으로 적용됩니다. 9월 공식 공시는 확정 기준선이며, 현재 초점은 10월 전망입니다.',
        ref: '2026.08.31 07:15 KST 기준 · 9월 공시 확정 · 10월 산정기간 진행 중',
        cur: '→ 10월 전망은 보합~인하 압력이 우세하지만, 라락섬 공습과 보복 예고로 지정학적 변동성이 다시 커졌습니다.',
        filters: ['전체','항공사 공지','기관','시장'],
        latest: '최신 뉴스',
        previous: '이전 뉴스',
        archive: '날짜순 아카이브',
        officialTitle: '주요 항공사 2026년 9월 국제선 유류할증료 공식 공시',
        officialNotice: '2026.08.31 07:15 KST 기준 · KE/OZ/LJ/BX/TW/7C/ZE/RS/YP 9월 공시 반영 · 10월 공식 공시는 아직 확인되지 않음',
        officialDesc: '* 9월 공식 공시는 확정 기준선입니다. 10월 단계와 노선별 금액은 항공사 공식 공시 전까지 확정하지 않습니다.',
        link: '공식 공지 ↗',
        forecastBtn: '10월 전망 보기 →',
        decisionLong: '장거리·성수기: 9월 확정 공시 금액과 실제 항공권 총액을 함께 비교'
      },
      en: {
        forecastTitle: 'October 2026 International Fuel Surcharge Outlook',
        forecastMetaTitle: 'October 2026 International Fuel Surcharge Outlook | MOPS, FX and Hormuz',
        forecastDesc: 'As of August 31, 2026, track October international fuel surcharge cut potential using Singapore Jet Fuel, MOPS, USD/KRW, crude oil and Hormuz risk.',
        forecastSub: 'As of 2026.08.31 07:15 KST · September Level 21 confirmed · October calculation in progress · FX ↓↓ / Jet Fuel ↓↓ / crude ↑↑ / Hormuz ↑↑ / military risk ↑↑↑',
        notice: '<strong>Confirmed:</strong> September international surcharges are fixed at Level 21. October is still in calculation; stage and route amounts are not confirmed before official airline notices.',
        intro: 'As of August 31, 2026, October international fuel surcharge pressure is flat-to-lower. USD/KRW has fallen near 1,377 and the August 27 Singapore Jet Fuel flat price was USD 142.93/bbl, below the September calculation average of USD 149.29/bbl. However, Brent and WTI rose more than 2% after the U.S. strike on Iran’s Larak Island, and Hormuz mine and military risks have re-expanded, so a cut is not confirmed.',
        indicatorTitle: 'October 2026 Fuel Surcharge Core Indicators',
        th: ['Item','Current status','Meaning for October'],
        foot: '* USD 142.93 is the August 27, 2026 Singapore Jet Fuel flat-price market reference. It is not the October MOPS average or an official calculation basis.',
        summaryTitle: 'September Confirmed Baseline and October Outlook Summary',
        updated: 'Last updated: 2026.08.31 07:15 KST · flat-to-cut pressure leads · geopolitical volatility re-expanded · low-to-medium confidence',
        verdictTitle: 'October 2026 Outlook Conclusion',
        verdict1: 'October stage and route amounts are not confirmed yet.',
        verdict2: 'FX and Singapore Jet Fuel are downside factors, but Larak Island strikes, Iran retaliation warnings and mine risk have re-expanded geopolitical volatility.',
        verdictShort: 'October outlook: flat-to-cut pressure leads · geopolitical volatility re-expanded',
        verdictLong: 'Confidence: low-to-medium · specific stage forecast withheld',
        keyTitle: 'Key Check Variables',
        keyVars: ['September Level 21 confirmed','October window 2026.08.16-09.15','USD/KRW around 1,377.3','Singapore Jet Fuel 142.93','-4.3% vs September baseline 149.29','Brent 90.32 / WTI 85.41','Kpler public tracking 7 vessels','Larak strike and retaliation warning','Mine risk renewed','October stage and amounts unconfirmed'],
        newsTitle: 'Fuel Surcharge MOPS FX and Hormuz Latest News',
        newsMetaTitle: 'Fuel Surcharge MOPS FX and Hormuz Latest News | August 31, 2026',
        newsDesc: 'As of August 31, 2026, follow Singapore Jet Fuel USD 142.93, USD/KRW near 1,377, Brent/WTI rebound and Larak Island Hormuz risk news.',
        newsSub: 'As of 2026.08.31 07:15 KST · September Level 21 confirmed · October outlook: flat-to-cut pressure leads · geopolitical volatility re-expanded',
        note: 'Fuel surcharges apply by ticketing date. September notices are the confirmed baseline; the focus is October forecasting.',
        ref: 'As of 2026.08.31 07:15 KST · September notices confirmed · October calculation period in progress',
        cur: '→ October pressure leans flat-to-lower, but Larak Island and retaliation warnings re-expanded geopolitical volatility.',
        filters: ['All','Airline notices','Institutions','Market'],
        latest: 'Latest News',
        previous: 'Previous News',
        archive: 'Archived by date',
        officialTitle: 'Major Airline September 2026 International Fuel Surcharge Official Notices',
        officialNotice: 'As of 2026.08.31 07:15 KST · KE/OZ/LJ/BX/TW/7C/ZE/RS/YP September notices reflected · October official notices not yet confirmed',
        officialDesc: '* September notices are the confirmed baseline. October stage and route amounts are not confirmed before official airline notices.',
        link: 'Official notice ↗',
        forecastBtn: 'View October outlook →',
        decisionLong: 'Long haul and peak season: compare confirmed September surcharges with total airfare'
      }
    };
    packs.ja = Object.assign({}, packs.en, {forecastTitle:'2026年10月国際線燃油サーチャージ見通し', forecastMetaTitle:'2026年10月国際線燃油サーチャージ見通し | MOPS・為替・ホルムズ', forecastSub:'2026.08.31 07:15 KST時点 · 9月21段階確定 · 10月算定中 · 為替↓↓ / Jet Fuel↓↓ / 原油↑↑ / ホルムズ↑↑ / 軍事リスク↑↑↑', indicatorTitle:'2026年10月燃油サーチャージ主要指標', th:['項目','現在の確認状況','10月見通しでの意味'], newsTitle:'燃油サーチャージ MOPS 為替 ホルムズ 最新ニュース', newsSub:'2026.08.31 07:15 KST時点 · 9月21段階確定 · 10月見通し: 横ばい~引き下げ圧力優勢 · 地政学的変動性再拡大', filters:['すべて','航空会社公示','機関','市場'], latest:'最新ニュース', previous:'過去のニュース', archive:'日付順アーカイブ', officialTitle:'主要航空会社 2026年9月国際線燃油サーチャージ公式公示', link:'公式公示 ↗', forecastBtn:'10月見通しを見る →'});
    packs.zh = Object.assign({}, packs.en, {forecastTitle:'2026年10月国际线燃油附加费展望', forecastMetaTitle:'2026年10月国际线燃油附加费展望 | MOPS·汇率·霍尔木兹', forecastSub:'截至2026.08.31 07:15 KST · 9月第21档确认 · 10月计算中 · 汇率↓↓ / Jet Fuel↓↓ / 油价↑↑ / 霍尔木兹↑↑ / 军事风险↑↑↑', indicatorTitle:'2026年10月燃油附加费核心指标', th:['项目','当前确认状态','对10月展望的意义'], newsTitle:'燃油附加费 MOPS 汇率 霍尔木兹最新新闻', newsSub:'截至2026.08.31 07:15 KST · 9月第21档确认 · 10月展望：持平~下调压力占优 · 地缘波动性再扩大', filters:['全部','航空公司公告','机构','市场'], latest:'最新新闻', previous:'过往新闻', archive:'按日期归档', officialTitle:'主要航空公司2026年9月国际线燃油附加费官方公告', link:'官方公告 ↗', forecastBtn:'查看10月展望 →'});
    packs.fr = Object.assign({}, packs.en, {forecastTitle:'Perspective surtaxe carburant internationale octobre 2026', forecastMetaTitle:'Perspective octobre 2026 | MOPS, FX et Hormuz', forecastSub:'Au 2026.08.31 07:15 KST · septembre niveau 21 confirmé · octobre en calcul · FX ↓↓ / Jet Fuel ↓↓ / pétrole ↑↑ / Hormuz ↑↑ / risque militaire ↑↑↑', indicatorTitle:'Indicateurs clés de la surtaxe carburant octobre 2026', th:['Élément','État actuel','Sens pour octobre'], newsTitle:'Actualités surtaxe carburant MOPS FX et Hormuz', newsSub:'Au 2026.08.31 07:15 KST · septembre niveau 21 confirmé · octobre: pression stable~baissière dominante · volatilité géopolitique relancée', filters:['Tout','Avis compagnies','Institutions','Marché'], latest:'Dernières nouvelles', previous:'Anciennes nouvelles', archive:'Archive par date', officialTitle:'Avis officiels septembre 2026 des principales compagnies', link:'Avis officiel ↗', forecastBtn:'Voir la perspective octobre →'});
    packs.de = Object.assign({}, packs.en, {forecastTitle:'Oktober-2026 internationaler Treibstoffzuschlag Ausblick', forecastMetaTitle:'Oktober-2026 Ausblick | MOPS, FX und Hormuz', forecastSub:'Stand 2026.08.31 07:15 KST · September Stufe 21 bestätigt · Oktober läuft · FX ↓↓ / Jetfuel ↓↓ / Öl ↑↑ / Hormuz ↑↑ / Militärrisiko ↑↑↑', indicatorTitle:'Oktober-2026 Kernindikatoren für Treibstoffzuschlag', th:['Punkt','Aktueller Stand','Bedeutung für Oktober'], newsTitle:'Treibstoffzuschlag MOPS FX und Hormuz News', newsSub:'Stand 2026.08.31 07:15 KST · September Stufe 21 bestätigt · Oktober: stabil bis Senkungsdruck dominant · geopolitische Volatilität erneut erhöht', filters:['Alle','Airline-Hinweise','Institutionen','Markt'], latest:'Neueste Nachrichten', previous:'Frühere Nachrichten', archive:'Nach Datum archiviert', officialTitle:'Offizielle September-2026 Hinweise wichtiger Airlines', link:'Offizieller Hinweis ↗', forecastBtn:'Oktober-Ausblick ansehen →'});
    packs.cn = packs.zh;
    var p = packs[l] || packs.en;
    var focusSub = {
      ko: '2026.08.31 07:15 KST 기준 · 9월 21단계 확정 · 10월 산정기간 진행 중 · 환율 ↓↓ / Jet Fuel ↓↓ / 국제유가 ↑↑',
      en: 'As of 2026.08.31 07:15 KST · September Level 21 confirmed · October calculation in progress · FX ↓↓ / Jet Fuel ↓↓ / crude ↑↑',
      ja: '2026.08.31 07:15 KST時点 · 9月21段階確定 · 10月算定中 · 為替↓↓ / Jet Fuel↓↓ / 原油↑↑',
      zh: '截至2026.08.31 07:15 KST · 9月第21档确认 · 10月计算中 · 汇率↓↓ / Jet Fuel↓↓ / 油价↑↑',
      fr: 'Au 2026.08.31 07:15 KST · septembre niveau 21 confirmé · octobre en calcul · FX ↓↓ / Jet Fuel ↓↓ / pétrole ↑↑',
      de: 'Stand 2026.08.31 07:15 KST · September Stufe 21 bestätigt · Oktober läuft · FX ↓↓ / Jetfuel ↓↓ / Öl ↑↑'
    };
    p.forecastSub = focusSub[l] || focusSub.en;
    p.rows = rows;
    p.summary = rows.map(function(row){ return row[0]+': '+row[1]+' - '+row[2]; });
    p.keyVars = rows.map(function(row){ return row[0]+': '+row[1]; });
    p.predict = [
      [rows[0][0], rows[0][1], 'neutral'],
      [rows[1][0], rows[1][1], 'down'],
      [rows[2][0], rows[2][1], 'down'],
      [rows[3][0], rows[3][1], 'up']
    ];
    return p;
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
    var ko = [['officialKe','대한항공','9월 KRW 48,000~354,000 · 8월 대비 최소 +12,800원'],['officialOz','아시아나항공','9월 KRW 52,000~290,100 · 8월 대비 최소 +15,400원'],['officialLj','진에어','9월 USD 29~89 · 8월 대비 최소 +USD 9'],['officialBx','에어부산','9월 USD 71/82 · 8월 대비 최소 +USD 24'],['officialTw','티웨이항공','9월 KRW 36,200~247,500 · 8월 대비 최소 +11,800원'],['official7c','제주항공','9월 USD 33~79 · 8월 대비 최소 +USD 11'],['officialZe','이스타항공','9월 USD 33~79 · 8월 대비 최소 +USD 11'],['officialRs','에어서울','9월 KRW 57,700~99,600 · 8월 대비 최소 +18,000원'],['officialYp','에어프레미아','9월 USD 37~228 · 8월 대비 최소 +USD 12']];
    if(l === 'ko') return ko;
    return [['officialKe','Korean Air','September KRW 48,000-354,000 · minimum +KRW 12,800 vs August'],['officialOz','Asiana Airlines','September KRW 52,000-290,100 · minimum +KRW 15,400 vs August'],['officialLj','Jin Air','September USD 29-89 · minimum +USD 9 vs August'],['officialBx','Air Busan','September USD 71/82 · minimum +USD 24 vs August'],['officialTw',"T'way Air",'September KRW 36,200-247,500 · minimum +KRW 11,800 vs August'],['official7c','Jeju Air','September USD 33-79 · minimum +USD 11 vs August'],['officialZe','Eastar Jet','September USD 33-79 · minimum +USD 11 vs August'],['officialRs','Air Seoul','September KRW 57,700-99,600 · minimum +KRW 18,000 vs August'],['officialYp','Air Premia','September USD 37-228 · minimum +USD 12 vs August']];
  }

  function card(id, category, priority, i18n){
    var ko = i18n.ko;
    return {
      id:id, category:category, priority:priority, date:'2026-08-31', updatedAt:ISO, sourceUrl:'forecast.html', aiSummary:true, relevanceScore:1,
      title:ko.title, aiBrief:ko.aiBrief, summary:ko.summary, impact:ko.impact, sourceName:ko.sourceName, tags:ko.tags,
      i18n:i18n
    };
  }
  var cards = [
    card('us-strikes-iran-larak-launchers-20260831','geo',1,{
      ko:{title:'미국, 이란 라락섬 공습…호르무즈 기뢰 위험 재부각', aiBrief:'미국군은 8월 30일 이란 라락섬의 발사대 두 곳을 공격했다고 밝혔습니다.', summary:'미국 측은 이란 혁명수비대가 호르무즈 해협에 기뢰를 투입할 준비를 하고 있었다고 판단해 라락섬 발사대 2곳을 공격했다고 설명했습니다. 이는 7월 말 이후 처음 확인된 미국의 이란 본토 공격으로 보도됐으며, 기존 재개방 협상에 새로운 불확실성을 더했습니다.', impact:'호르무즈 군사위험과 보험·운임 위험 프리미엄을 다시 키우는 변수입니다. 단 기뢰 설치 완료가 아니라 미국 측 주장 범위의 위험으로 표시합니다.', sourceName:'Reuters / U.S. military statement', tags:['라락섬','호르무즈','기뢰 위험','10월 전망']},
      en:{title:'U.S. strikes Iran’s Larak Island launchers, renewing Hormuz mine risk', aiBrief:'The U.S. said it struck two launch sites on Iran’s Larak Island on Aug 30.', summary:'The U.S. said the sites were linked to Iranian Revolutionary Guard preparations to lay mines in the Strait of Hormuz. The strike adds uncertainty to reopening talks and marks a renewed military-risk shock near the strait.', impact:'Raises Hormuz military, insurance and freight risk premiums. The page treats this as a U.S. claim of mine risk, not confirmed mine deployment.', sourceName:'Reuters / U.S. military statement', tags:['Larak Island','Hormuz','mine risk','October outlook']},
      ja:{title:'米国、イラン・ララク島を攻撃…ホルムズ機雷リスク再浮上', aiBrief:'米軍は8月30日、イラン・ララク島の発射台2カ所を攻撃したと説明しました。', summary:'米国は、イラン革命防衛隊がホルムズ海峡に機雷を投入する準備をしていたと判断したと説明しました。再開協議に新たな不確実性が生じています。', impact:'ホルムズの軍事・保険・運賃リスクを高める要因です。機雷設置完了とは表記しません。', sourceName:'Reuters / 米軍発表', tags:['ララク島','ホルムズ','機雷リスク','10月見通し']},
      zh:{title:'美国攻击伊朗拉腊克岛，霍尔木兹水雷风险再现', aiBrief:'美国称8月30日打击伊朗拉腊克岛两处发射点。', summary:'美国表示这些地点与伊朗革命卫队在霍尔木兹海峡布雷准备有关。这给重开谈判带来新的不确定性。', impact:'提高霍尔木兹军事、保险和运费风险溢价。页面按美国说法处理，不写成已完成布雷。', sourceName:'Reuters / 美国军方声明', tags:['拉腊克岛','霍尔木兹','水雷风险','10月展望']},
      fr:{title:'Les États-Unis frappent Larak Island; risque de mines à Hormuz ravivé', aiBrief:'Les États-Unis disent avoir frappé deux sites de lancement iraniens le 30 août.', summary:'Selon Washington, ces sites étaient liés à des préparatifs de mines par les Gardiens de la révolution près d’Hormuz. Cela ajoute de l’incertitude aux discussions de réouverture.', impact:'Hausse du risque militaire, assurance et fret. Le site présente cela comme une affirmation américaine, pas comme des mines confirmées.', sourceName:'Reuters / déclaration militaire US', tags:['Larak Island','Hormuz','mines','octobre']},
      de:{title:'USA greifen Larak Island an; Hormuz-Minenrisiko rückt zurück in den Fokus', aiBrief:'Die USA meldeten am 30. August Angriffe auf zwei iranische Startplätze.', summary:'Nach US-Angaben standen die Plätze mit Minenvorbereitungen der Revolutionsgarden in Verbindung. Das erhöht die Unsicherheit bei Wiederöffnungsgesprächen.', impact:'Erhöht Militär-, Versicherungs- und Frachtrisiken. Als US-Aussage zum Risiko, nicht als bestätigte Minenlegung.', sourceName:'Reuters / US-Militärerklärung', tags:['Larak Island','Hormuz','Minenrisiko','Oktober']}
    }),
    card('iran-retaliation-warning-larak-20260831','geo',2,{
      ko:{title:'이란 혁명수비대, 라락섬 공습에 보복 예고', aiBrief:'이란 혁명수비대는 라락섬 공격 이후 보복 대응을 예고했습니다.', summary:'이번 흐름은 미군 공격, 이란 보복 가능성, 호르무즈 군사위험 상승, 보험·운임·원유 위험프리미엄 상승 경로로 시장에 영향을 줄 수 있습니다. 실제 보복 발생 전까지는 보복 예고로만 표현합니다.', impact:'10월 전망에서 지정학적 변동성 재확대와 해상운송 위험 상승 요인으로 반영합니다.', sourceName:'Regional security reports', tags:['이란 보복 예고','혁명수비대','호르무즈','운송위험']},
      en:{title:'Iran Revolutionary Guard warns of retaliation after Larak strike', aiBrief:'Iran’s Revolutionary Guard warned of retaliation after the Larak Island strike.', summary:'The channel is U.S. strike, possible Iranian retaliation, higher Hormuz military risk, and higher insurance, freight and crude-risk premium. Until retaliation occurs, it is described only as a warning.', impact:'Adds geopolitical volatility and shipping-risk pressure to the October outlook.', sourceName:'Regional security reports', tags:['Iran retaliation warning','IRGC','Hormuz','shipping risk']},
      ja:{title:'イラン革命防衛隊、ララク島攻撃に報復を予告', aiBrief:'ララク島攻撃後、イラン革命防衛隊は報復対応を予告しました。', summary:'実際の報復が起きるまでは報復予告として扱います。軍事リスク、保険、運賃、原油リスクプレミアムを押し上げる可能性があります。', impact:'10月見通しでは地政学的変動性と輸送リスクの上昇要因です。', sourceName:'地域安全保障報道', tags:['イラン報復','革命防衛隊','ホルムズ','輸送リスク']},
      zh:{title:'伊朗革命卫队就拉腊克岛攻击预告报复', aiBrief:'拉腊克岛攻击后，伊朗革命卫队预告报复。', summary:'在实际报复发生前，仅表述为报复预告。该链条可能推高霍尔木兹军事风险、保险、运费和原油风险溢价。', impact:'作为10月展望中地缘波动性和运输风险上升因素。', sourceName:'地区安全报道', tags:['伊朗报复预告','革命卫队','霍尔木兹','运输风险']},
      fr:{title:'Les Gardiens de la révolution iraniens menacent de représailles', aiBrief:'Après la frappe de Larak Island, l’Iran a averti d’une réponse.', summary:'Avant tout acte réel, le site parle seulement de menace de représailles. Le canal potentiel passe par risque militaire, assurance, fret et prime de risque pétrole.', impact:'Facteur de volatilité géopolitique et de risque transport pour octobre.', sourceName:'Rapports sécurité régionale', tags:['Iran','représailles','Hormuz','transport']},
      de:{title:'Iranische Revolutionsgarden drohen nach Larak-Schlag mit Vergeltung', aiBrief:'Nach dem Angriff auf Larak Island kündigten die Revolutionsgarden Vergeltung an.', summary:'Bis zu tatsächlichen Maßnahmen bleibt es eine Warnung. Der mögliche Pfad läuft über Militär-, Versicherungs-, Fracht- und Ölrisikoprämien.', impact:'Faktor für höhere geopolitische Volatilität und Transportrisiken im Oktober.', sourceName:'Regionale Sicherheitsberichte', tags:['Iran','Vergeltung','Hormuz','Transport']}
    }),
    card('singapore-jetfuel-14293-below-september-baseline-20260831','market',3,{
      ko:{title:'Singapore Jet Fuel 142.93달러…9월 산정 평균 아래로 하락', aiBrief:'2026년 8월 27일 Singapore Jet Fuel flat price는 142.93달러/bbl로, 9월 산정 평균 149.29달러보다 약 4.3% 낮았습니다.', summary:'전주 대비 약 11달러/bbl 낮아진 수치이며 10월 유류할증료의 하락 가능성을 높이는 중요한 신호입니다. 다만 이는 하루 시장 flat price 참고값으로 10월 산정기간 전체 평균은 아직 확정되지 않았습니다.', impact:'10월 전망을 보합~인하 압력 우세로 바꾸는 핵심 근거입니다.', sourceName:'Sparta Commodities / Singapore Jet Fuel reference', tags:['Singapore Jet Fuel','142.93','9월 Baseline 149.29','MOPS']},
      en:{title:'Singapore Jet Fuel USD 142.93 falls below September calculation average', aiBrief:'The August 27 Singapore Jet Fuel flat price was USD 142.93/bbl, about 4.3% below the September calculation average of USD 149.29/bbl.', summary:'The price was about USD 11/bbl lower week over week and is an important downside signal for October surcharges. It remains a one-day flat-price reference, not the October calculation-period average.', impact:'Core reason the October view changes to flat-to-cut pressure leading.', sourceName:'Sparta Commodities / Singapore Jet Fuel reference', tags:['Singapore Jet Fuel','142.93','September baseline 149.29','MOPS']},
      ja:{title:'Singapore Jet Fuel 142.93ドル、9月算定平均を下回る', aiBrief:'8月27日のSingapore Jet Fuel flat priceは142.93ドル/bblで、9月算定平均149.29ドルを約4.3%下回りました。', summary:'前週比で約11ドル/bbl低く、10月引き下げ可能性を高める重要な信号です。ただし一日市場値であり10月平均ではありません。', impact:'10月見通しを横ばい~引き下げ圧力優勢へ変える主因です。', sourceName:'Sparta Commodities / Singapore Jet Fuel参考', tags:['Singapore Jet Fuel','142.93','9月基準149.29','MOPS']},
      zh:{title:'Singapore Jet Fuel 142.93美元，低于9月计算均值', aiBrief:'8月27日Singapore Jet Fuel flat price为142.93美元/bbl，较9月计算均值149.29美元低约4.3%。', summary:'较前周约低11美元/bbl，是10月附加费下调可能性上升的重要信号。但这是一日市场价格，不是10月计算期均值。', impact:'这是10月展望转为持平~下调压力占优的核心依据。', sourceName:'Sparta Commodities / Singapore Jet Fuel参考', tags:['Singapore Jet Fuel','142.93','9月基准149.29','MOPS']},
      fr:{title:'Singapore Jet Fuel à 142.93 USD, sous la moyenne de septembre', aiBrief:'Le flat price du 27 août était 142.93 USD/bbl, environ 4.3% sous la moyenne de calcul de septembre à 149.29 USD/bbl.', summary:'Environ 11 USD/bbl de moins sur une semaine: signal baissier important pour octobre, mais ce n’est pas la moyenne d’octobre.', impact:'Raison principale du passage à une pression stable~baissière dominante.', sourceName:'Sparta Commodities / référence Singapore Jet Fuel', tags:['Singapore Jet Fuel','142.93','base septembre 149.29','MOPS']},
      de:{title:'Singapore Jet Fuel 142.93 USD, unter September-Durchschnitt', aiBrief:'Der Flat Price vom 27. August lag bei 142.93 USD/bbl, rund 4.3% unter der September-Berechnungsbasis von 149.29 USD/bbl.', summary:'Etwa 11 USD/bbl niedriger zur Vorwoche und ein wichtiges Abwärtssignal für Oktober. Es ist aber ein Tagesmarktwert, kein Oktober-Durchschnitt.', impact:'Hauptgrund für die Sicht stabil bis Senkungsdruck dominant.', sourceName:'Sparta Commodities / Singapore-Jet-Fuel-Referenz', tags:['Singapore Jet Fuel','142.93','September-Basis 149.29','MOPS']}
    }),
    card('brent-wti-jump-after-larak-20260831','market',4,{
      ko:{title:'Brent 90달러 돌파…라락섬 공습 후 국제유가 2%대 반등', aiBrief:'2026년 8월 31일 07:00 KST 전후 Brent는 약 90.32달러/bbl(+2.52%), WTI는 약 85.41달러/bbl(+2.41%)로 상승했습니다.', summary:'8월 28일 미국시장 종가에서는 Brent 89.31달러, WTI 83.40달러로 주간 하락 흐름이었지만, 주말 라락섬 공습 이후 지정학적 위험 프리미엄이 다시 확대됐습니다.', impact:'Jet Fuel 하락 신호와 반대로 작용해 10월 인하 확정을 막는 불확실성입니다.', sourceName:'Crude oil market reference', tags:['Brent 90.32','WTI 85.41','라락섬','국제유가']},
      en:{title:'Brent tops USD 90 as crude rebounds more than 2% after Larak strike', aiBrief:'Around 2026.08.31 07:00 KST, Brent was near USD 90.32/bbl (+2.52%) and WTI near USD 85.41/bbl (+2.41%).', summary:'After Friday’s lower close, the weekend Larak Island strike re-expanded geopolitical risk premium.', impact:'This works against the jet-fuel downside signal and keeps an October cut unconfirmed.', sourceName:'Crude oil market reference', tags:['Brent 90.32','WTI 85.41','Larak','crude']},
      ja:{title:'Brent 90ドル突破、ララク島攻撃後に原油2%台反発', aiBrief:'2026.08.31 07:00 KST前後、Brent約90.32ドル(+2.52%)、WTI約85.41ドル(+2.41%)。', summary:'金曜終値では下落していましたが、週末のララク島攻撃後に地政学的リスクプレミアムが再拡大しました。', impact:'Jet Fuel下落信号と反対に作用し、10月引き下げ確定を妨げます。', sourceName:'原油市場参考', tags:['Brent 90.32','WTI 85.41','ララク島','原油']},
      zh:{title:'Brent突破90美元，拉腊克岛攻击后油价反弹逾2%', aiBrief:'2026.08.31 07:00 KST前后，Brent约90.32美元(+2.52%)，WTI约85.41美元(+2.41%)。', summary:'周五收盘仍处下行，但周末拉腊克岛攻击后地缘风险溢价再次扩大。', impact:'与航油下行信号相反，使10月下调无法确认。', sourceName:'原油市场参考', tags:['Brent 90.32','WTI 85.41','拉腊克岛','油价']},
      fr:{title:'Brent dépasse 90 USD après Larak Island, rebond du pétrole de plus de 2%', aiBrief:'Vers 2026.08.31 07:00 KST, Brent était près de 90.32 USD (+2.52%) et WTI près de 85.41 USD (+2.41%).', summary:'Après la baisse de vendredi, la frappe du week-end a relancé la prime de risque géopolitique.', impact:'Va contre le signal baissier du jet fuel et empêche de confirmer une baisse d’octobre.', sourceName:'Référence marché pétrole', tags:['Brent 90.32','WTI 85.41','Larak','pétrole']},
      de:{title:'Brent über 90 USD: Öl steigt nach Larak-Schlag über 2%', aiBrief:'Um 2026.08.31 07:00 KST lag Brent bei ca. 90.32 USD (+2.52%) und WTI bei ca. 85.41 USD (+2.41%).', summary:'Nach dem schwächeren Freitagsschluss erhöhte der Larak-Schlag am Wochenende die geopolitische Risikoprämie.', impact:'Wirkt gegen das Jetfuel-Abwärtssignal und verhindert eine bestätigte Oktober-Senkung.', sourceName:'Ölmarktreferenz', tags:['Brent 90.32','WTI 85.41','Larak','Öl']}
    }),
    card('asia-jetfuel-supply-improves-20260831','market',5,{
      ko:{title:'한국·일본 수출 견조, 중국 9월 cargo 증가…아시아 Jet Fuel 공급 개선', aiBrief:'동아시아 정유사의 정제품 수출과 중국의 9월 Jet Fuel cargo 공급 증가는 Singapore Jet Fuel 가격 완화 요인입니다.', summary:'아시아 Jet Fuel 공급 여건은 8월 말 들어 일부 개선됐습니다. 이는 Singapore Jet Fuel flat price 하락과 스프레드 완화에 기여할 수 있지만, 10월 산정기간 평균 하락이 확정됐다는 뜻은 아닙니다.', impact:'MOPS/항공유 항목을 하락 압력 확인으로 바꾸는 보조 근거입니다.', sourceName:'Asian refined-products market reference', tags:['아시아 Jet Fuel','공급 개선','한국 수출','중국 cargo']},
      en:{title:'Korea/Japan exports firm and China September cargoes rise, improving Asia Jet Fuel supply', aiBrief:'East Asian refined-product exports and higher China September Jet Fuel cargo supply ease Singapore Jet Fuel pressure.', summary:'Asia Jet Fuel supply conditions have partly improved into late August. This can help lower flat prices and spreads, but it does not confirm the October calculation average.', impact:'Supports changing MOPS/jet fuel to confirmed downside pressure.', sourceName:'Asian refined-products market reference', tags:['Asia Jet Fuel','supply improvement','Korea exports','China cargoes']},
      ja:{title:'韓国・日本輸出堅調、中国9月cargo増でアジアJet Fuel供給改善', aiBrief:'東アジアの石油製品輸出と中国9月Jet Fuel cargo増加はSingapore Jet Fuelの緩和要因です。', summary:'8月末にアジアJet Fuel供給は一部改善しています。ただし10月平均下落の確定ではありません。', impact:'MOPS/航空燃料を下落圧力確認へ変える補助根拠です。', sourceName:'アジア石油製品市場参考', tags:['アジアJet Fuel','供給改善','韓国輸出','中国cargo']},
      zh:{title:'韩日出口稳健，中国9月cargo增加，亚洲Jet Fuel供应改善', aiBrief:'东亚成品油出口和中国9月Jet Fuel cargo供应增加有助于缓和Singapore Jet Fuel压力。', summary:'8月底亚洲Jet Fuel供应条件部分改善。但这并不意味着10月计算期均值已经确认下降。', impact:'支持MOPS/航油改为下行压力确认。', sourceName:'亚洲成品油市场参考', tags:['亚洲Jet Fuel','供应改善','韩国出口','中国cargo']},
      fr:{title:'Offre Asia Jet Fuel en amélioration avec exports Corée/Japon et cargoes Chine', aiBrief:'Les exportations de produits raffinés et plus de cargoes chinois en septembre apaisent Singapore Jet Fuel.', summary:'Les conditions d’offre s’améliorent partiellement fin août, sans confirmer la moyenne d’octobre.', impact:'Soutient le passage de MOPS/jet fuel à une pression baissière confirmée.', sourceName:'Référence marché produits raffinés Asie', tags:['Asia Jet Fuel','offre','Corée','Chine']},
      de:{title:'Asia Jet Fuel Angebot verbessert sich: Korea/Japan stark, China-Cargoes steigen', aiBrief:'Ostasiatische Produktexporte und mehr China-Jet-Fuel-Cargoes im September entspannen Singapore Jet Fuel.', summary:'Das Angebot verbessert sich Ende August teilweise, bestätigt aber keinen Oktober-Durchschnitt.', impact:'Stützt die Umstellung von MOPS/Jetfuel auf bestätigten Abwärtsdruck.', sourceName:'Asiatische Raffinerieprodukt-Referenz', tags:['Asia Jet Fuel','Angebot','Korea','China']}
    }),
    card('hormuz-kpler-seven-below-average-20260831','geo',6,{
      ko:{title:'호르무즈 Kpler 공개추적 7척…10일 평균보다 낮아 위험 유지', aiBrief:'8월 28일 후속 Kpler 자료에서 목요일 commodity vessel 통항은 7척으로 집계돼 10일 평균 약 15척보다 낮았습니다.', summary:'이 숫자는 Kpler 공개 선박추적 예비집계이며 호르무즈 전체 선박 수가 아닙니다. AIS 비활성 선박 등은 제외될 수 있습니다. 수요일 예비치 10척은 후속 데이터에서 17척으로 수정됐습니다.', impact:'기존 “소폭 개선” 표현을 평균 이하·높은 위험으로 업데이트합니다.', sourceName:'Reuters citing Kpler public tracking', tags:['Kpler 7척','호르무즈','예비집계','평균 이하']},
      en:{title:'Kpler public Hormuz tracking at 7 vessels, below 10-day average', aiBrief:'Follow-up Kpler data put Thursday commodity-vessel transit at 7, below the 10-day average near 15.', summary:'This is preliminary public tracking for commodity vessels, not total Hormuz vessel traffic. AIS-dark vessels may be excluded. Wednesday’s preliminary 10-vessel figure was revised to 17.', impact:'Updates the previous “slight improvement” wording to below-average and high risk.', sourceName:'Reuters citing Kpler public tracking', tags:['Kpler 7','Hormuz','preliminary','below average']},
      ja:{title:'ホルムズKpler公開追跡7隻、10日平均下回る', aiBrief:'木曜のcommodity vessel通航は7隻で、10日平均約15隻を下回りました。', summary:'Kpler公開船舶追跡の予備集計であり、全船舶数ではありません。AIS非表示船は除外される可能性があります。水曜予備値10隻は17隻に修正されました。', impact:'「小幅改善」から平均以下・高リスクへ更新します。', sourceName:'Reuters citing Kpler public tracking', tags:['Kpler 7隻','ホルムズ','予備集計','平均以下']},
      zh:{title:'霍尔木兹Kpler公开追踪7艘，低于10日均值', aiBrief:'后续Kpler数据显示周四commodity vessel通行为7艘，低于10日均值约15艘。', summary:'这是公开船舶追踪预备统计，不是霍尔木兹全部船舶数量。AIS关闭船只可能不包含。周三预备10艘修正为17艘。', impact:'从“小幅改善”更新为低于均值、高风险。', sourceName:'Reuters citing Kpler public tracking', tags:['Kpler 7艘','霍尔木兹','预备统计','低于均值']},
      fr:{title:'Hormuz: suivi public Kpler à 7 navires, sous la moyenne 10 jours', aiBrief:'Les données Kpler placent le transit de jeudi à 7 commodity vessels, sous la moyenne d’environ 15.', summary:'C’est un suivi public préliminaire, pas le trafic total. Les navires AIS coupés peuvent être exclus. Le chiffre préliminaire de mercredi 10 a été révisé à 17.', impact:'Remplace “légère amélioration” par sous moyenne et risque élevé.', sourceName:'Reuters citant Kpler public tracking', tags:['Kpler 7','Hormuz','préliminaire','sous moyenne']},
      de:{title:'Hormuz: Kpler public tracking bei 7 Schiffen, unter 10-Tage-Schnitt', aiBrief:'Kpler-Folgedaten zeigen Donnerstag 7 commodity vessels, unter dem 10-Tage-Schnitt von ca. 15.', summary:'Vorläufiges öffentliches Tracking, nicht Gesamtverkehr. AIS-dunkle Schiffe können fehlen. Der Mittwochswert 10 wurde auf 17 revidiert.', impact:'Aktualisiert “leichte Verbesserung” zu unter Durchschnitt und hohes Risiko.', sourceName:'Reuters citing Kpler public tracking', tags:['Kpler 7','Hormuz','vorläufig','unter Durchschnitt']}
    }),
    card('usdkrw-1377-strong-downside-20260831','fx',7,{
      ko:{title:'USD/KRW 약 1,377원…원화 부과액 하락 요인 강화', aiBrief:'원/달러 환율은 최근 1,394원대에서 1,386원대, 1,381원대, 1,377원대로 하락했습니다.', summary:'현재 환율은 10월 유류할증료의 원화 환산액에 강한 하방 요인입니다. 다만 유류할증료 단계 자체는 Singapore Jet Fuel/MOPS가 핵심이며, 현재 환율 하나를 산정기간 평균환율처럼 쓰지 않습니다.', impact:'10월 전망에서 환율은 강한 하락 요인으로 유지합니다.', sourceName:'USD/KRW market reference', tags:['USD/KRW','1,377','환율','원화 강세']},
      en:{title:'USD/KRW near 1,377 strengthens KRW surcharge downside', aiBrief:'USD/KRW has moved from the 1,394 area to 1,386, 1,381 and then near 1,377.', summary:'Current FX is a strong downside factor for KRW-converted surcharge amounts. However, the stage is mainly driven by Singapore Jet Fuel/MOPS, and spot FX is not treated as the calculation-period average.', impact:'FX remains a strong downside factor in the October outlook.', sourceName:'USD/KRW market reference', tags:['USD/KRW','1,377','FX','KRW strength']},
      ja:{title:'USD/KRW約1,377、ウォン建て金額の下押し強まる', aiBrief:'USD/KRWは1,394台から1,386、1,381、1,377近辺へ下落。', summary:'現在の為替はウォン換算額の強い下押し要因です。ただし段階は主にSingapore Jet Fuel/MOPSが決め、現物為替を期間平均として扱いません。', impact:'10月見通しで為替は強い下落要因です。', sourceName:'USD/KRW市場参考', tags:['USD/KRW','1,377','為替','ウォン高']},
      zh:{title:'USD/KRW约1,377，韩元金额下行因素增强', aiBrief:'USD/KRW从1,394区域降至1,386、1,381并接近1,377。', summary:'当前汇率是韩元换算金额的强下行因素。但档位主要由Singapore Jet Fuel/MOPS决定，现货汇率不当作计算期平均汇率。', impact:'10月展望中汇率维持强下行因素。', sourceName:'USD/KRW市场参考', tags:['USD/KRW','1,377','汇率','韩元走强']},
      fr:{title:'USD/KRW près de 1 377 renforce la baisse des montants KRW', aiBrief:'USD/KRW est passé de la zone 1 394 à 1 386, 1 381 puis près de 1 377.', summary:'Le FX spot est un fort facteur baissier pour les montants convertis en KRW, mais le niveau dépend surtout de Singapore Jet Fuel/MOPS.', impact:'FX reste un facteur baissier fort pour octobre.', sourceName:'Référence marché USD/KRW', tags:['USD/KRW','1 377','FX','KRW']},
      de:{title:'USD/KRW nahe 1.377 verstärkt Abwärtsdruck auf KRW-Beträge', aiBrief:'USD/KRW fiel von ca. 1.394 auf 1.386, 1.381 und nahe 1.377.', summary:'Spot-FX senkt KRW-Beträge stark, aber die Stufe wird vor allem durch Singapore Jet Fuel/MOPS bestimmt.', impact:'FX bleibt starker Abwärtsfaktor im Oktober-Ausblick.', sourceName:'USD/KRW-Marktreferenz', tags:['USD/KRW','1.377','FX','KRW']}
    })
  ];

  function applyForecast(){
    if(!pathIs('forecast')) return;
    var p = pack(lang());
    updateHead(p.forecastMetaTitle, p.forecastDesc, 'https://aero-surcharge.com/forecast.html');
    setText('fore.pageTitle', p.forecastTitle);
    setText('fore.h1', p.forecastTitle);
    setText('fore.pageSub', p.forecastSub);
    setHtml('fore.notice', p.notice);
    setText('fore.intro', p.intro);
    setText('fore.section.indicators', p.indicatorTitle);
    var thead = document.getElementById('indicatorThead');
    if(thead) thead.innerHTML = '<tr>'+p.th.map(function(h){ return '<th>'+esc(h)+'</th>'; }).join('')+'</tr>';
    var tbody = document.getElementById('indicatorTbody');
    if(tbody) tbody.innerHTML = p.rows.map(function(r){ return '<tr><td><strong>'+esc(r[0])+'</strong></td><td>'+esc(r[1])+'</td><td>'+esc(r[2])+'</td></tr>'; }).join('');
    setText('fore.indicator.footnote', p.foot);
    var summary = document.getElementById('summaryCard');
    if(summary) summary.innerHTML = '<div class="nsc-title">'+esc(p.summaryTitle)+'</div><div class="nsc-updated">'+esc(p.updated)+'</div><ul>'+p.summary.map(function(s){ return '<li>'+esc(s)+'</li>'; }).join('')+'</ul>';
    var verdict = document.getElementById('verdictBox');
    if(verdict) verdict.innerHTML = '<div class="verdict-title">'+esc(p.verdictTitle)+'</div>'+esc(p.verdict1)+'<br>'+esc(p.verdict2)+'<br><br><strong>'+esc(p.verdictShort)+'</strong><br><strong>'+esc(p.verdictLong)+'</strong>';
    var market = document.getElementById('marketBriefBox');
    if(market) market.innerHTML = '<div class="mb-title">'+esc(p.indicatorTitle)+'</div>'+p.rows.slice(3).map(function(row){ return '<div class="mb-item">'+esc(row[0]+': '+row[1]+' - '+row[2])+'</div>'; }).join('');
    var pred = document.getElementById('predictFactors');
    if(pred) pred.innerHTML = p.predict.map(function(it){ return '<div class="predict-factor"><div class="pf-label">'+esc(it[0])+'</div><div class="pf-val '+esc(it[2])+'">'+esc(it[1])+'</div></div>'; }).join('');
    setText('fore.predict.title', p.indicatorTitle);
    setText('fore.predict.subtitle', p.verdictShort);
    setText('fore.predict.footnote', p.foot);
    setText('fore.keyvars.title', p.keyTitle);
    var keys = document.getElementById('keyVarsGrid');
    if(keys) keys.innerHTML = p.keyVars.map(function(s){ return '<div class="kv-chip">'+esc(s)+'</div>'; }).join('');
    ['scenarioBox','bookingDecisionBox','mopsAnalysisBox'].forEach(function(id){ var el=document.getElementById(id); if(el){ el.innerHTML=''; el.style.display='none'; } });
    updateJsonLd('forecast', p);
    scrubStale();
  }

  function installNewsCards(){
    var list = Array.isArray(window.FIXED_NEWS) ? window.FIXED_NEWS : (typeof FIXED_NEWS !== 'undefined' && Array.isArray(FIXED_NEWS) ? FIXED_NEWS : null);
    if(!list) return;
    var remove = /20260824|20260825|20260826|20260827|20260828/;
    for(var i=list.length-1;i>=0;i--){
      var id = list[i] && list[i].id || '';
      if(remove.test(id) && !/september-surcharge|airpremia/.test(id)) list.splice(i,1);
    }
    var seen = {};
    list.forEach(function(item){ if(item && item.id) seen[item.id]=true; });
    cards.slice().reverse().forEach(function(item){ if(!seen[item.id]) list.unshift(item); });
    if(typeof FIXED_NEWS !== 'undefined') FIXED_NEWS = list;
    window.FIXED_NEWS = list;
  }

  function applyNews(){
    if(!pathIs('news')) return;
    installNewsCards();
    var l = lang();
    var p = pack(l);
    updateHead(p.newsMetaTitle, p.newsDesc, 'https://aero-surcharge.com/news.html');
    setText('news.pageTitle', p.newsTitle);
    setText('news.h1', p.newsTitle);
    setText('news.pageSub', p.newsSub);
    setText('news.surchargeNote', p.note);
    setText('news.dataRef', p.ref);
    setText('news.curSummary', p.cur);
    setText('news.marketTitle', p.indicatorTitle);
    setText('news.fx', p.rows[1][0] + ': ' + p.rows[1][1] + ' - ' + p.rows[1][2]);
    setText('news.mops', p.rows[2][0] + ': ' + p.rows[2][1] + ' - ' + p.rows[2][2]);
    setText('news.brent', p.rows[3][0] + ': ' + p.rows[3][1] + ' - ' + p.rows[3][2]);
    setText('news.geo', p.cur);
    setText('news.marketSummary', p.cur);
    setText('news.fxDominance', p.verdictLong + ' · ' + p.keyVars.join(' · '));
    setText('news.decisionTitle', p.verdictTitle);
    setText('news.decisionLine1', '→ ' + p.verdict1);
    setText('news.decisionLine2', '→ ' + p.verdict2);
    setText('news.summary.title', p.summaryTitle);
    setText('news.summary.updated', p.updated);
    document.querySelectorAll('.summary-card ul, .news-summary-card ul, .new-summary-card ul').forEach(function(ul){
      ul.innerHTML = p.summary.slice(0,8).map(function(line){ return '<li>'+esc(line)+'</li>'; }).join('');
    });
    ['news.filterAll','news.filterAirline','news.filterInstitution','news.filterMarket'].forEach(function(key, idx){ setText(key, p.filters[idx]); });
    setText('news.decisionLong', p.decisionLong);
    setText('news.forecastCta.title', p.forecastTitle);
    setText('news.forecastCta.desc', p.forecastDesc);
    setText('news.forecastCta.btn', p.forecastBtn);
    var official = document.querySelector('.official-summary-box');
    if(official){
      official.innerHTML = '<div class="official-title" data-i18n="news.officialTitle">'+esc(p.officialTitle)+'</div>'
        + '<div data-i18n="news.officialNotice" style="font-size:12px;color:#9A6A00;margin-bottom:10px;padding:6px 10px;background:rgba(255,255,255,.78);border-radius:6px;border-left:3px solid #FFCC80;">'+esc(p.officialNotice)+'</div>'
        + airlineRows(l).map(function(r){ return '<div class="official-item" id="'+esc(r[0])+'"><strong>'+esc(r[1])+'</strong> - '+esc(r[2])+' · <a href="'+esc(noticeUrls[r[0]])+'" target="_blank" rel="noopener noreferrer" style="color:#075985;font-weight:700;">'+esc(p.link)+'</a></div>'; }).join('')
        + '<div class="official-desc" id="officialDesc">'+esc(p.officialDesc)+'</div>';
    }
    var box = document.getElementById('newsKeyVariables');
    if(box) box.innerHTML = '<div style="font-weight:700;margin-bottom:8px;">'+esc(p.keyTitle)+'</div><div>'+p.keyVars.map(function(v){ return '<span style="display:inline-block;margin:3px 6px 3px 0;padding:5px 8px;border:1px solid #BFDBFE;border-radius:999px;background:#EFF6FF;color:#0F172A;">'+esc(v)+'</span>'; }).join('')+'</div>';
    var latestTitle = document.querySelector('.news-section-title[data-section="latest"], .news-section-label.latest .news-section-title');
    var previousTitle = document.querySelector('.news-section-title[data-section="previous"], .news-section-label.previous .news-section-title');
    if(latestTitle) latestTitle.textContent = p.latest;
    if(previousTitle) previousTitle.textContent = p.previous;
    document.querySelectorAll('.news-section-meta, .news-section-sub').forEach(function(el){ if(/Archive|아카이브|アーカイブ|归档|Archiv|보관|date/i.test(el.textContent || '')) el.textContent = p.archive; });
    if(typeof window.renderNews === 'function' && !window.__AERO_AUG31_RENDERING){
      window.__AERO_AUG31_RENDERING = true;
      try { window.renderNews(); } catch(e) {}
      window.__AERO_AUG31_RENDERING = false;
    }
    relocalizeCards();
    updateJsonLd('news', p);
    scrubStale();
  }

  function relocalizeCards(){
    var l = lang();
    document.querySelectorAll('.news-card').forEach(function(cardEl){
      var id = cardEl.id || cardEl.getAttribute('data-id') || '';
      var source = cards.filter(function(c){ return c.id === id; })[0];
      if(!source) return;
      var tr = source.i18n[l] || source.i18n.en || source.i18n.ko;
      var title = cardEl.querySelector('.news-title');
      var brief = cardEl.querySelector('.ai-brief, .news-ai-brief');
      var paras = cardEl.querySelectorAll('p, .news-summary');
      var sourceLink = cardEl.querySelector('.news-source, .source-name, a.source');
      if(title) title.textContent = tr.title;
      if(brief) brief.textContent = tr.aiBrief;
      if(paras[0]) paras[0].textContent = tr.summary;
      if(paras[1]) paras[1].textContent = tr.impact;
      if(sourceLink) sourceLink.textContent = tr.sourceName + ' ↗';
    });
  }

  function updateJsonLd(kind, p){
    document.querySelectorAll('script[type="application/ld+json"]').forEach(function(node){
      try{
        var json = JSON.parse(node.textContent || '{}');
        if(json['@type'] === 'FAQPage'){
          json['@id'] = 'https://aero-surcharge.com/forecast.html#faq-20260831';
          json.dateModified = ISO;
          json.mainEntity = [
            ['2026년 10월 국제선 유류할증료는 내려갈까?','2026년 8월 31일 현재는 보합~인하 압력이 우세합니다. 원화 강세와 Singapore Jet Fuel 가격 하락은 인하 요인이지만 미국의 이란 라락섬 공격으로 국제유가와 호르무즈 위험이 다시 상승해 인하를 확정하기는 어렵습니다.'],
            ['10월 유류할증료 인하 가능성이 커진 이유는?','2026년 8월 27일 Singapore Jet Fuel 가격이 142.93달러/bbl로 9월 산정 평균 149.29달러보다 낮아졌고 원/달러 환율도 1,370원대 후반으로 하락했기 때문입니다.'],
            ['Singapore Jet Fuel 142.93달러가 10월 MOPS 평균인가?','아닙니다. 142.93달러는 2026년 8월 27일 시장의 Singapore Jet Fuel flat price이며 10월 유류할증료 산정기간 평균은 아직 확정되지 않았습니다.'],
            ['호르무즈 상황이 다시 악화됐나?','미국이 2026년 8월 30일 이란 라락섬의 발사대를 공격하고 이란 혁명수비대가 보복을 예고하면서 군사적 위험은 다시 커졌습니다. 다만 기존 재개방 협상이 공식적으로 종료됐다고 확인된 것은 아닙니다.']
          ].map(function(item){ return {'@type':'Question', name:item[0], acceptedAnswer:{'@type':'Answer', text:item[1]}}; });
          node.textContent = JSON.stringify(json);
        } else if(json['@type'] === 'Article' || json['@type'] === 'NewsArticle' || json['@type'] === 'WebPage'){
          json.headline = kind === 'news' ? p.newsTitle : p.forecastTitle;
          json.description = kind === 'news' ? p.newsDesc : p.forecastDesc;
          json.dateModified = ISO;
          json.url = kind === 'news' ? 'https://aero-surcharge.com/news.html' : 'https://aero-surcharge.com/forecast.html';
          node.textContent = JSON.stringify(json);
        }
      } catch(e) {}
    });
  }

  function scrubStale(){
    var staleCard = /2026년 8월 유류할증료와 9월 전망|2026년 8월 국제선 유류할증료 공식 공시|8월 공식 공시 반영|8월 산정 MOPS|USD\/KRW 약 1,386|Singapore Jet Fuel 최근 154\.98|Brent 93\.45|WTI 86\.14|보합~소폭 상승|상승 압력 소폭 우세|undefined/i;
    document.querySelectorAll('.news-card').forEach(function(cardEl){ if(staleCard.test(cardEl.innerText || '') && !/2026-08-31|142\.93|라락|Larak/.test(cardEl.innerText || '')) cardEl.remove(); });
    document.querySelectorAll('body *').forEach(function(el){
      if(el.children.length) return;
      var txt = el.textContent || '';
      if(/\bundefined\b/.test(txt)) el.textContent = txt.replace(/\bundefined\b/g,'').trim();
    });
  }

  function applyAll(){ applyForecast(); applyNews(); }
  if(typeof window.renderForecastPage === 'function' && !window.renderForecastPage.__aug31Wrapped){
    var prevForecast = window.renderForecastPage;
    window.renderForecastPage = function(){ var out = prevForecast.apply(this, arguments); applyAll(); return out; };
    window.renderForecastPage.__aug31Wrapped = true;
  }
  if(typeof window.renderNews === 'function' && !window.renderNews.__aug31Wrapped){
    var prevNews = window.renderNews;
    window.renderNews = function(){ var out = prevNews.apply(this, arguments); applyAll(); return out; };
    window.renderNews.__aug31Wrapped = true;
  }
  if(typeof window.applyLanguage === 'function' && !window.applyLanguage.__aug31Wrapped){
    var prevLang = window.applyLanguage;
    window.applyLanguage = function(){ var out = prevLang.apply(this, arguments); applyAll(); setTimeout(applyAll, 0); return out; };
    window.applyLanguage.__aug31Wrapped = true;
  }
  [0,100,400,900,1600,2600,4200,6200,9000,12000,18000,26000,36000,52000].forEach(function(ms){ setTimeout(applyAll, ms); });
  var runs = 0;
  var timer = setInterval(function(){ applyAll(); if(++runs >= 90) clearInterval(timer); }, 1000);
})();
