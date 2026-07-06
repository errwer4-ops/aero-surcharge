/* ── 항공 유류할증료 — Shared JS v3 ── */

/* ─────────────────────────────────────────────
   환율 / 통화 포매팅
───────────────────────────────────────────── */
window.RATES    = { KRW:1, USD:1/1500, JPY:1/10.0, EUR:1/1620, GBP:1/1860, CNY:1/203, AUD:1/948, SGD:1/1108, HKD:1/189 };
/* 환율 기준: USD/KRW 약 1,490~1,507원대 (2026.05.21 09:00 KST 기준 · 대한항공·아시아나·진에어·에어부산·이스타항공·제주항공 6월 공식 공시 반영 완료) */
window.CURR_SYM = { KRW:'₩', USD:'$', JPY:'¥', EUR:'€', GBP:'£', CNY:'¥', AUD:'A$', SGD:'S$', HKD:'HK$' };
window.CURR_DEC = { KRW:0, USD:2, JPY:0, EUR:2, GBP:2, CNY:2, AUD:2, SGD:2, HKD:1 };
window.SHARED_STATE = { lang:'ko', curr:'KRW' };

/* ─────────────────────────────────────────────
   한국 국적기 필터
   isKoreanCarrier / VISIBLE_CARRIERS
───────────────────────────────────────────── */
/* v35: 제주항공(7C)2026년 6월 공식 공시 반영 — official_verified 처리 */
window.KOREAN_CARRIER_CODES = ['KE','OZ','YP','LJ','7C','TW','ZE','RS','BX'];
/* 7C:2026년 6월 공식 공시 수동 반영 완료 — official_verified · USD 공시 기준 */
/* BX:2026년 5월/6월 공식 공지 수동 반영 완료 — public UI 포함 */
window.EXCLUDED_FROM_PUBLIC = [];

window.isKoreanCarrier = function(iataCode) {
  return window.KOREAN_CARRIER_CODES.indexOf(iataCode) !== -1;
};

window.isExcludedFromPublic = function(iataCode) {
  return window.EXCLUDED_FROM_PUBLIC.indexOf(iataCode) !== -1;
};

/* 현재는 한국 국적기만 visible — 나중에 SHOW_ALL=true로 외항사 활성화 가능 */
window.SHOW_ALL_CARRIERS = false;

window.isVisibleCarrier = function(iataCode) {
  if (window.isExcludedFromPublic(iataCode)) return false;
  return window.SHOW_ALL_CARRIERS || window.isKoreanCarrier(iataCode);
};

/* ─────────────────────────────────────────────
   연월 포매팅 — 실제 월 표시 (하드코딩 금지)
   periodStr: "Fare amount (From April 1,2025)" 등 또는 ISO 날짜
───────────────────────────────────────────── */
window.formatPeriodLabel = function(periodStr) {
  if (!periodStr) return null;
  /* ISO 형태 "2026-04-01" */
  var isoM = periodStr.match(/(\d{4})-(\d{2})/);
  if (isoM) return isoM[1] + '.' + isoM[2];
  /* "April 1,2026" 또는 "From April 1,2026" */
  var months = {january:'01',february:'02',march:'03',april:'04',may:'05',june:'06',
                july:'07',august:'08',september:'09',october:'10',november:'11',december:'12'};
  var lower = periodStr.toLowerCase();
  var year = (periodStr.match(/(\d{4})/)||[])[1];
  for (var m in months) {
    if (lower.indexOf(m) !== -1 && year) return year + '.' + months[m];
  }
  /* "31 Mar2026" 형태 */
  var abbr = {jan:'01',feb:'02',mar:'03',apr:'04',may:'05',jun:'06',
               jul:'07',aug:'08',sep:'09',oct:'10',nov:'11',dec:'12'};
  var m2 = periodStr.match(/(\d{1,2})\s+([a-zA-Z]{3})\s+(\d{4})/);
  if (m2 && abbr[m2[2].toLowerCase()]) return m2[3] + '.' + abbr[m2[2].toLowerCase()];
  return null;
};

/* 공식 데이터 기준 "다음 달" 연월 계산
   반드시 currentLabel(공식 데이터 월)을 넘겨야 함.
   null 이면 시스템 날짜를 사용하지 않고 null 반환. */
window.nextMonthLabel = function(currentLabel) {
  if (!currentLabel) return null;  /* 시스템 날짜 사용 금지 */
  var m = currentLabel.match(/(\d{4})\.(\d{2})/);
  if (!m) return null;
  var y = parseInt(m[1]), mo = parseInt(m[2]) + 1;
  if (mo > 12) { mo = 1; y++; }
  return y + '.' + String(mo).padStart(2,'0');
};

/* ─────────────────────────────────────────────
   다국어
───────────────────────────────────────────── */
window.I18N_SHARED = {
  ko:{ btnOW:'편도', btnRT:'왕복', officialSite:'공식 사이트 ↗',
       loading:'데이터 로딩 중...', loadErr:'데이터 로드 실패', noData:'표시할 데이터가 없습니다.',
       official:'공식 공지', aiPredict:'AI 예측', prepublish:'공시 전', noValue:'데이터 없음',
       predictUnavail:'예측 불가', predictInsuff:'데이터 부족', predictPreparing:'준비 중',
       officialNotice:'공식 공지', aiPredictBadge:'AI 예측', refOnly:'공식 공지 전 참고용',
       confidence:{high:'높음',medium:'보통',low:'낮음'},
       predictBasis:'예측 근거', predictNote:'공식 공지 전 참고용 추정값입니다.',
       navRoutes:'노선별 조회', navAirlines:'항공사 인덱스', navNews:'참고 소식',
       /* 2026.05.29 07:00 KST 시장 브리핑 공용 키 — 6월 확정 데이터 기반 7월 전망 중심 */
      marketDataRef: '2026.06.10 11:00 KST 기준',
      marketBrent:   '국제유가: 브렌트유는 6월 초 고점보다 안정됐고, OPEC+ 증산 기대가 유가 급등을 제한하고 있습니다.',
      marketMops:    '항공유 가격(MOPS): 국제유가는 안정됐지만 항공유 가격 부담과 성수기 수요가 남아 있어 유류할증료 인하 가능성을 제한할 수 있습니다.',
      marketFx:      '원달러 환율: 높은 환율 구간이 유지될 경우 항공사의 달러 결제 연료비 부담이 커져 KRW 기준 유류할증료 인하 여력이 줄어들 수 있습니다.',
      marketGeo:     '호르무즈 해협: 개방 신호와 선박 통행 증가 조짐이 나타났지만, 완전 정상화 전까지 지정학 리스크 프리미엄은 남아 있습니다.',
      marketOutlook: '2026년 7월 유류할증료는 동결 가능성이 가장 높고 일부 항공사의 1단계 인상 가능성이 남아 있습니다. 현재 기준 동결 55~60%, 1단계 인상 25~35%, 2단계 이상 인상 10% 이하로 봅니다.' },
  en:{ btnOW:'One-way', btnRT:'Round-trip', officialSite:'Official site ↗',
       loading:'Loading...', loadErr:'Load failed', noData:'No data.',
       official:'Official', aiPredict:'AI Forecast', prepublish:'Not yet published', noValue:'No data',
       predictUnavail:'Unavailable', predictInsuff:'Insufficient data', predictPreparing:'Preparing',
       officialNotice:'Official Notice', aiPredictBadge:'AI Forecast', refOnly:'Pre-announcement reference',
       confidence:{high:'High',medium:'Medium',low:'Low'},
       predictBasis:'Forecast basis', predictNote:'Pre-announcement estimate. For reference only.',
       navRoutes:'Route Search', navAirlines:'Airline Index', navNews:'News & Insights',
       /* 2026.05.29 07:00 KST market brief shared keys */
      marketDataRef: 'As of 2026.06.10 11:00 KST',
      marketBrent:   'Oil prices: Brent has stabilized from early-June highs, while expected OPEC+ supply is limiting another sharp rise.',
      marketMops:    'MOPS jet fuel: oil has stabilized, but jet-fuel costs and peak-season demand still limit the chance of a surcharge cut.',
      marketFx:      'USD/KRW: elevated FX can increase dollar-denominated airline fuel costs and reduce room for a KRW-based surcharge cut.',
      marketGeo:     'Strait of Hormuz: reopening signals and rising vessel traffic are positive, but a geopolitical risk premium remains until full normalization.',
      marketOutlook: 'A freeze is the leading July 2026 scenario: 55-60%, versus 25-35% for a one-step increase and 10% or less for two steps or more.' },
  ja:{ btnOW:'片道', btnRT:'往復', officialSite:'公式サイト ↗',
       loading:'読み込み中...', loadErr:'読み込み失敗', noData:'データなし',
       official:'公式', aiPredict:'AI予測', prepublish:'未公示', noValue:'データなし',
       predictUnavail:'予測不可', predictInsuff:'データ不足', predictPreparing:'準備中',
       officialNotice:'公式公示', aiPredictBadge:'AI予測', refOnly:'公式公示前の参考',
       confidence:{high:'高',medium:'中',low:'低'},
       predictBasis:'予測根拠', predictNote:'公式公示前の推定値。参考用。',
       navRoutes:'路線別検索', navAirlines:'航空会社一覧', navNews:'参考情報',
       marketDataRef:'2026.06.08 09:00 KST時点',
       marketBrent:'国際原油価格: 直近高値からやや落ち着いたものの、中東リスクと供給不確実性は残っています。',
       marketMops:'航空燃料価格(MOPS): 国際線需要と夏の繁忙期入りで強含みが続いています。',
       marketFx:'USD/KRW: 高い為替水準が続くと航空会社の燃料費負担が増える可能性があります。',
       marketGeo:'ホルムズ海峡: 一部運航は続いていますが、正常化宣言はありません。',
       marketOutlook:'2026年7月の燃油サーチャージは据え置き優勢に戻りましたが、MOPSと為替負担により小幅引き上げ余地も残ります。' },
  zh:{ btnOW:'单程', btnRT:'往返', officialSite:'官方网站 ↗',
       loading:'加载中...', loadErr:'加载失败', noData:'暂无数据',
       official:'官方', aiPredict:'AI预测', prepublish:'未公告', noValue:'无数据',
       predictUnavail:'无法预测', predictInsuff:'数据不足', predictPreparing:'准备中',
       officialNotice:'官方公告', aiPredictBadge:'AI预测', refOnly:'官方公告前参考',
       confidence:{high:'高',medium:'中',low:'低'},
       predictBasis:'预测依据', predictNote:'官方公告前估算值，仅供参考。',
       navRoutes:'按航线查询', navAirlines:'航空公司索引', navNews:'参考资讯',
       marketDataRef:'截至2026.06.08 09:00 KST',
       marketBrent:'国际油价：较近期高点有所稳定，但中东风险和供应不确定性仍然存在。',
       marketMops:'航空燃油价格(MOPS)：国际线需求增加和暑期旺季使MOPS维持强势。',
       marketFx:'美元/韩元：若高汇率区间持续，航空公司的燃油成本压力可能增加。',
       marketGeo:'霍尔木兹海峡：部分航行仍在继续，但尚无正常化声明。',
       marketOutlook:'2026年7月燃油附加费再次偏向维持不变，但MOPS和汇率压力仍保留小幅上调可能。' },
  fr:{ btnOW:'Aller simple', btnRT:'Aller-retour', officialSite:'Site officiel ↗',
       loading:'Chargement...', loadErr:'Erreur', noData:'Aucune donnée',
       official:'Officiel', aiPredict:'Prévision IA', prepublish:'Non publié', noValue:'Pas de données',
       predictUnavail:'Indisponible', predictInsuff:'Données insuffisantes', predictPreparing:'En préparation',
       officialNotice:'Notice officielle', aiPredictBadge:'Prévision IA', refOnly:'Référence avant annonce',
       confidence:{high:'Élevé',medium:'Moyen',low:'Faible'},
       predictBasis:'Base de prévision', predictNote:'Estimation avant annonce officielle. À titre indicatif.',
       navRoutes:'Recherche route', navAirlines:'Index compagnies', navNews:'Actualités',
       marketDataRef:'Au 2026.06.08 09:00 KST',
       marketBrent:'Pétrole: les prix se sont quelque peu stabilisés depuis les récents sommets, mais les risques au Moyen-Orient et l’incertitude d’offre persistent.',
       marketMops:'Carburant aviation (MOPS): la demande internationale et la saison estivale maintiennent le marché ferme.',
       marketFx:'USD/KRW: une zone de change élevée peut accroître le coût du carburant pour les compagnies.',
       marketGeo:'Détroit d’Ormuz: certaines opérations continuent, mais aucune normalisation n’est déclarée.',
       marketOutlook:'La surtaxe carburant de juillet 2026 penche de nouveau vers le statu quo, avec un risque de légère hausse lié au MOPS et au change.' },
  de:{ btnOW:'Einfach', btnRT:'Hin & Zurück', officialSite:'Offizielle Seite ↗',
       loading:'Lädt...', loadErr:'Fehler', noData:'Keine Daten',
       official:'Offiziell', aiPredict:'KI-Prognose', prepublish:'Nicht veröffentlicht', noValue:'Keine Daten',
       predictUnavail:'Nicht verfügbar', predictInsuff:'Unzureichende Daten', predictPreparing:'In Vorbereitung',
       officialNotice:'Offizielle Mitteilung', aiPredictBadge:'KI-Prognose', refOnly:'Vor offiz. Ankündigung',
       confidence:{high:'Hoch',medium:'Mittel',low:'Niedrig'},
       predictBasis:'Prognosebasis', predictNote:'Schätzung vor offizieller Bekanntmachung. Nur zur Referenz.',
       navRoutes:'Routensuche', navAirlines:'Airline-Index', navNews:'Nachrichten',
       marketDataRef:'Stand 2026.06.08 09:00 KST',
       marketBrent:'Öl: Die Preise haben sich von jüngsten Hochs etwas stabilisiert, doch Nahostrisiken und Angebotsunsicherheit bleiben.',
       marketMops:'Kerosinpreis (MOPS): Internationale Nachfrage und Sommersaison halten MOPS fest.',
       marketFx:'USD/KRW: Ein hoher Wechselkursbereich kann die Treibstoffkosten der Airlines erhöhen.',
       marketGeo:'Straße von Hormus: Einige Fahrten laufen weiter, aber es gibt keine Normalisierungserklärung.',
       marketOutlook:'Für Juli 2026 überwiegt wieder ein unveränderter Treibstoffzuschlag, doch MOPS und FX lassen eine kleine Erhöhung möglich.' },
};

window.ts = function(key) {
  var l = window.SHARED_STATE.lang;
  return (window.I18N_SHARED[l] || window.I18N_SHARED.en)[key] || key;
};
/* legacy alias */
window.ts_alias = window.ts;

window.fmtAmt = function(krw) {
  if (krw === null || krw === undefined) return '—';
  var c = window.SHARED_STATE.curr;
  var val = krw * (window.RATES[c] || 1);
  var dec = window.CURR_DEC[c] != null ? window.CURR_DEC[c] : 0;
  var sym = window.CURR_SYM[c] || c;
  return sym + val.toLocaleString('en-US', { minimumFractionDigits:dec, maximumFractionDigits:dec });
};

/* 2026.06.08 market numbers used by forecast/news.
   USD market quotes are converted for display only; source values stay in USD. */
window.AERO_MARKET_NUMBERS_20260608 = {
  asOf: '2026.06.08 09:00 KST',
  brentUsdPerBbl: 95.51,
  wtiUsdPerBbl: 92.72,
  iataJetFuelUsdPerBbl: 141.64,
  mopsUsdPerGallon: 3.6127,
  mopsUsdPerBbl: 151.73,
  usdKrw: 1559.36,
  sources: {
    brentWti: 'Trading Economics, Jun/08 market quote',
    iataJetFuel: 'IATA Fuel Price Monitor, latest weekly global average',
    mops: 'Korean Air cargo fuel surcharge notice, 2026 May MOPS',
    usdKrw: 'Investing.com latest USD/KRW quote around Jun 8'
  }
};

/* June 10 outlook ranges supplied for the current forecast.
   Exact MOPS and USD/KRW values below remain labeled reference inputs. */
window.AERO_MARKET_NUMBERS_20260610 = Object.assign({}, window.AERO_MARKET_NUMBERS_20260608, {
  asOf: '2026.06.10 11:00 KST',
  brentMinUsdPerBbl: 90,
  brentMaxUsdPerBbl: 93,
  wtiMinUsdPerBbl: 88,
  wtiMaxUsdPerBbl: 90
});

/* June 12 outlook snapshot.
   Oil uses the June 11 close available at the 06:00 KST cutoff.
   MOPS, IATA jet fuel and USD/KRW retain their last verified exact reference values. */
window.AERO_MARKET_NUMBERS_20260612 = Object.assign({}, window.AERO_MARKET_NUMBERS_20260610, {
  asOf: '2026.06.12 06:00 KST',
  brentUsdPerBbl: 90.38,
  wtiUsdPerBbl: 87.71,
  brentMinUsdPerBbl: 90,
  brentMaxUsdPerBbl: 92,
  wtiMinUsdPerBbl: 87,
  wtiMaxUsdPerBbl: 89,
  referenceAsOf: {
    brentWti: '2026.06.11 close',
    iataJetFuel: 'latest verified weekly global average',
    mops: 'latest verified MOPS reference',
    usdKrw: 'latest verified USD/KRW reference'
  },
  sources: {
    brentWti: 'June 11, 2026 market close: Brent 90.38 USD/bbl; WTI 87.71 USD/bbl',
    iataJetFuel: 'IATA Fuel Price Monitor, latest verified weekly global average',
    mops: 'Latest verified MOPS reference retained until a newer public exact value is confirmed',
    usdKrw: 'Latest verified USD/KRW reference retained until a newer exact quote is confirmed'
  }
});

/* June 15 outlook snapshot.
   Oil reflects the market reaction available at the 09:10 KST cutoff.
   MOPS, IATA jet fuel and USD/KRW retain their latest verified exact references. */
window.AERO_MARKET_NUMBERS_20260615 = Object.assign({}, window.AERO_MARKET_NUMBERS_20260612, {
  asOf: '2026.06.15 09:10 KST',
  brentUsdPerBbl: 83.90,
  wtiUsdPerBbl: 81.07,
  brentMinUsdPerBbl: 83,
  brentMaxUsdPerBbl: 84,
  wtiMinUsdPerBbl: 80,
  wtiMaxUsdPerBbl: 82,
  referenceAsOf: {
    brentWti: '2026.06.15 09:10 KST market snapshot',
    iataJetFuel: 'latest verified weekly global average',
    mops: 'latest verified MOPS reference',
    usdKrw: 'latest verified USD/KRW reference'
  },
  sources: {
    brentWti: 'June 15, 2026 market reaction: Brent 83.90 USD/bbl; WTI 81.07 USD/bbl',
    iataJetFuel: 'IATA Fuel Price Monitor, latest verified weekly global average',
    mops: 'Latest verified MOPS reference retained until a newer public exact value is confirmed',
    usdKrw: 'Latest verified USD/KRW reference retained until a newer exact quote is confirmed'
  }
});
window.AERO_MARKET_NUMBERS_LATEST = window.AERO_MARKET_NUMBERS_20260615;

/* June 16 outlook snapshot.
   Oil reflects the market reaction available at the 09:30 KST cutoff.
   MOPS, IATA jet fuel and USD/KRW retain their latest verified exact references. */
window.AERO_MARKET_NUMBERS_20260616 = Object.assign({}, window.AERO_MARKET_NUMBERS_20260615, {
  asOf: '2026.06.16 09:30 KST',
  brentUsdPerBbl: 83.07,
  wtiUsdPerBbl: 80.38,
  brentMinUsdPerBbl: 83,
  brentMaxUsdPerBbl: 84,
  wtiMinUsdPerBbl: 80,
  wtiMaxUsdPerBbl: 81,
  referenceAsOf: {
    brentWti: '2026.06.16 09:30 KST market snapshot',
    iataJetFuel: 'latest verified weekly global average',
    mops: 'latest verified MOPS reference',
    usdKrw: 'latest verified USD/KRW reference'
  },
  sources: {
    brentWti: 'June 16, 2026 market reaction: Brent 83.07 USD/bbl; WTI 80.38 USD/bbl',
    iataJetFuel: 'IATA Fuel Price Monitor, latest verified weekly global average',
    mops: 'Latest verified MOPS reference retained until a newer public exact value is confirmed',
    usdKrw: 'Latest verified USD/KRW reference retained until a newer exact quote is confirmed'
  }
});
window.AERO_MARKET_NUMBERS_LATEST = window.AERO_MARKET_NUMBERS_20260616;

window.AERO_MARKET_NUMBERS_20260619 = Object.assign({}, window.AERO_MARKET_NUMBERS_LATEST || {}, {
  asOf: '2026.06.19 09:00 KST',
  usdKrw: 1536.00,
  mopsUsdPerGallon: 3.383,
  mopsCentsPerGallon: 338.3,
  referenceAsOf: {
    mops: '2026.05.16~2026.06.15 average reference for July filing / August outlook baseline',
    usdKrw: '2026.06.19 09:00 KST market snapshot',
    geo: 'No confirmed new Israel strike on Iran as of 2026.06.19 09:00 KST'
  },
  sources: {
    usdKrw: 'Latest USD/KRW quote around 2026.06.19 09:00 KST',
    mops: 'July fuel surcharge calculation reference: MOPS average 338.3 cents/gal',
    geo: 'Major wire reports checked: no confirmed new Israel strike on Iran at cutoff'
  }
});
window.AERO_MARKET_NUMBERS_LATEST = window.AERO_MARKET_NUMBERS_20260619;

window.AERO_MARKET_NUMBERS_20260622 = Object.assign({}, window.AERO_MARKET_NUMBERS_LATEST || {}, {
  asOf: '2026.06.22 07:00 KST',
  usdKrw: 1527.00,
  mopsUsdPerGallon: 3.383,
  mopsCentsPerGallon: 338.3,
  referenceAsOf: {
    mops: '2026.05.16~2026.06.15 average reference for July filing / August outlook baseline',
    usdKrw: '2026.06.22 07:00 KST market snapshot',
    geo: 'Hormuz reopening remains conditional after Iran-linked report on Lebanon ceasefire and oil waivers'
  },
  sources: {
    usdKrw: 'USD/KRW around 1,527 KRW as of 2026.06.22 07:00 KST reference',
    mops: 'July fuel surcharge calculation reference: MOPS average 338.3 cents/gal',
    geo: 'Reuters 2026.06.21: Hormuz will not reopen until Lebanon ceasefire holds and oil waivers are issued'
  }
});
window.AERO_MARKET_NUMBERS_LATEST = window.AERO_MARKET_NUMBERS_20260622;

window.AERO_MARKET_NUMBERS_20260623 = Object.assign({}, window.AERO_MARKET_NUMBERS_LATEST || {}, {
  asOf: '2026.06.23 06:55 KST',
  usdKrw: 1534.00,
  mopsUsdPerGallon: 3.383,
  mopsCentsPerGallon: 338.3,
  iataJetFuelUsdPerBbl: 119.17,
  iataJetFuelWeeklyChangePct: -14.2,
  brentUsdPerBbl: 77.90,
  wtiUsdPerBbl: 74.82,
  referenceAsOf: {
    mops: '2026.05.16~2026.06.15 average reference for July filing / August outlook baseline',
    augustSurchargeWindow: '2026.06.16~2026.07.15 average window for August 2026 surcharge',
    usdKrw: '2026.06.23 06:55 KST market snapshot',
    iataJetFuel: 'Latest IATA weekly global jet fuel average reference',
    brentWti: '2026.06.22 oil market close after US-Iran talks and temporary Iran oil-sale authorization',
    geo: 'Hormuz traffic partially recovered, but normalization is not complete'
  },
  sources: {
    usdKrw: 'USD/KRW around 1,534 KRW as of 2026.06.23 06:55 KST reference',
    mops: 'July fuel surcharge calculation reference: MOPS average 338.3 cents/gal',
    iataJetFuel: 'IATA Jet Fuel Price Monitor: global average jet fuel around 119.17 USD/bbl, down 14.2% WoW',
    brentWti: 'Reuters 2026.06.22: Brent 77.90 USD/bbl, WTI 74.82 USD/bbl after easing supply-risk signals',
    geo: 'Reuters 2026.06.22: tanker traffic through Hormuz picked up, but remains below pre-war normal levels'
  }
});
window.AERO_MARKET_NUMBERS_LATEST = window.AERO_MARKET_NUMBERS_20260623;

window.AERO_MARKET_NUMBERS_20260624 = Object.assign({}, window.AERO_MARKET_NUMBERS_LATEST || {}, {
  asOf: '2026.06.24 07:00 KST',
  usdKrw: 1531.61,
  usdKrwMin: 1531.08,
  usdKrwMax: 1532.66,
  mopsUsdPerGallon: 3.383,
  mopsCentsPerGallon: 338.3,
  iataJetFuelUsdPerBbl: 119.17,
  iataJetFuelWeeklyChangePct: -14.2,
  brentUsdPerBbl: 77.08,
  wtiUsdPerBbl: 73.21,
  referenceAsOf: {
    mops: '2026.05.16~2026.06.15 average reference for July filing / August outlook baseline',
    augustSurchargeWindow: '2026.06.16~2026.07.15 average window for August 2026 surcharge',
    usdKrw: '2026.06.24 07:00 KST market snapshot',
    iataJetFuel: 'Latest IATA weekly global jet fuel average reference',
    brentWti: '2026.06.23 oil market close / 2026.06.24 07:00 KST reference',
    geo: 'Hormuz traffic partially recovered, but normalization is not complete'
  },
  sources: {
    usdKrw: 'USD/KRW around 1,531 KRW as of 2026.06.24 07:00 KST reference',
    mops: 'July fuel surcharge calculation reference: MOPS average 338.3 cents/gal',
    iataJetFuel: 'IATA Jet Fuel Price Monitor: global average jet fuel around 119.17 USD/bbl, down 14.2% WoW',
    brentWti: 'Reuters 2026.06.23: Brent 77.08 USD/bbl, WTI 73.21 USD/bbl',
    geo: 'Reuters 2026.06.23: Hormuz traffic partially recovered, but tanker congestion, port damage and safety checks remain'
  }
});
window.AERO_MARKET_NUMBERS_LATEST = window.AERO_MARKET_NUMBERS_20260624;

window.AERO_MARKET_NUMBERS_20260625 = Object.assign({}, window.AERO_MARKET_NUMBERS_LATEST || {}, {
  asOf: '2026.06.25 07:00 KST',
  usdKrw: 1532.00,
  usdKrwLabel: '약 1,530원대 초중반',
  mopsUsdPerGallon: 3.383,
  mopsCentsPerGallon: 338.3,
  iataJetFuelUsdPerBbl: 119.17,
  iataJetFuelWeeklyChangePct: -14.2,
  brentUsdPerBbl: 73.74,
  wtiUsdPerBbl: 70.34,
  hormuzOilFlowLast24hBbl: 20000000,
  referenceAsOf: {
    mops: '2026.05.16~2026.06.15 average reference for July filing / August outlook baseline',
    augustSurchargeWindow: '2026.06.16~2026.07.15 average window for August 2026 surcharge',
    usdKrw: '2026.06.25 07:00 KST market snapshot',
    iataJetFuel: 'Latest IATA weekly global jet fuel average reference',
    brentWti: '2026.06.24 oil market close / 2026.06.25 07:00 KST reference',
    geo: 'Hormuz crude flows improved, but normalization is not complete'
  },
  sources: {
    usdKrw: 'USD/KRW around low-to-mid 1,530 KRW range as of 2026.06.25 07:00 KST reference',
    mops: 'July fuel surcharge calculation reference: MOPS average 338.3 cents/gal',
    iataJetFuel: 'IATA Jet Fuel Price Monitor: global average jet fuel around 119.17 USD/bbl, down 14.2% WoW',
    brentWti: 'Reuters 2026.06.24: Brent 73.74 USD/bbl, WTI 70.34 USD/bbl',
    geo: 'Reuters 2026.06.24: around 20 million barrels of oil exited Hormuz in the last 24 hours, but risks remain'
  }
});
window.AERO_MARKET_NUMBERS_LATEST = window.AERO_MARKET_NUMBERS_20260625;

window.AERO_MARKET_NUMBERS_20260626 = Object.assign({}, window.AERO_MARKET_NUMBERS_LATEST || {}, {
  asOf: '2026.06.26 07:00 KST',
  usdKrw: 1538.00,
  usdKrwLabel: '1,530원대~1,540원대 중반',
  mopsUsdPerGallon: 3.383,
  mopsCentsPerGallon: 338.3,
  iataJetFuelUsdPerBbl: 119.17,
  iataJetFuelWeeklyChangePct: -14.2,
  brentUsdPerBbl: 75.26,
  wtiUsdPerBbl: 71.92,
  brentPreviousLowUsdPerBbl: 73.74,
  wtiPreviousLowUsdPerBbl: 70.34,
  hormuzCrudeShipmentBbl: 10000000,
  hormuzCrudeShipmentPrevDayBbl: 10800000,
  mideastFuelOilExportsTonnes: 2400000,
  mideastFuelOilExportsBpd: 508000,
  referenceAsOf: {
    mops: '2026.05.16~2026.06.15 average reference for July filing / August outlook baseline',
    augustSurchargeWindow: '2026.06.16~2026.07.15 average window for August 2026 surcharge',
    usdKrw: '2026.06.26 07:00 KST market snapshot; use label due to source variance',
    iataJetFuel: 'Latest IATA weekly global jet fuel average reference',
    brentWti: '2026.06.25 oil market close / 2026.06.26 07:00 KST reference',
    geo: 'Hormuz crude shipments recovered, but vessel safety risk resurfaced after a ship was hit near Oman'
  },
  sources: {
    usdKrw: 'USD/KRW shown across low 1,530s to mid 1,540s range around 2026.06.26 07:00 KST reference',
    mops: 'July fuel surcharge calculation reference: MOPS average 338.3 cents/gal',
    iataJetFuel: 'IATA Fuel Price Monitor: global average jet fuel around 119.17 USD/bbl, down 14.2% WoW',
    brentWti: 'Reuters 2026.06.25: Brent 75.26 USD/bbl, WTI 71.92 USD/bbl after vessel-hit risk near Oman',
    geo: 'Reuters 2026.06.25: crude shipments through Hormuz highest since the war began, but safety risks remain'
  }
});
window.AERO_MARKET_NUMBERS_LATEST = window.AERO_MARKET_NUMBERS_20260626;

window.AERO_MARKET_NUMBERS_20260629 = Object.assign({}, window.AERO_MARKET_NUMBERS_LATEST || {}, {
  asOf: '2026.06.29 09:00 KST',
  usdKrw: 1535.04,
  usdKrwLabel: '약 1,535원대',
  mopsUsdPerGallon: 3.383,
  mopsCentsPerGallon: 338.3,
  iataJetFuelUsdPerBbl: 119.17,
  iataJetFuelWeeklyChangePct: -14.2,
  brentUsdPerBbl: 72.51,
  wtiUsdPerBbl: 69.94,
  referenceAsOf: {
    mops: '2026.05.16~2026.06.15 average reference for July filing / August outlook baseline',
    augustSurchargeWindow: '2026.06.16~2026.07.15 average window for August 2026 surcharge; not finalized yet',
    usdKrw: '2026.06.29 09:00 KST market snapshot',
    iataJetFuel: 'Latest IATA weekly global jet fuel average reference',
    brentWti: '2026.06.29 09:00 KST reference after renewed Hormuz and Middle East risk',
    geo: 'Hormuz transit recovery remains incomplete; renewed vessel and security risks limit normalization'
  },
  sources: {
    usdKrw: 'USD/KRW around 1,535 KRW as of 2026.06.29 09:00 KST reference',
    mops: 'July fuel surcharge calculation reference: MOPS average 338.3 cents/gal',
    iataJetFuel: 'IATA Fuel Price Monitor: global average jet fuel around 119.17 USD/bbl, down 14.2% WoW',
    brentWti: 'Brent around 72.51 USD/bbl and WTI around 69.94 USD/bbl near the 2026.06.29 09:00 KST update window',
    geo: 'Hormuz shipping has partially recovered but is not fully normalized; renewed risk remains relevant for August outlook'
  }
});
window.AERO_MARKET_NUMBERS_LATEST = window.AERO_MARKET_NUMBERS_20260629;

window.AERO_MARKET_NUMBERS_20260630 = Object.assign({}, window.AERO_MARKET_NUMBERS_LATEST || {}, {
  asOf: '2026.06.30 09:20 KST',
  usdKrw: 1540.47,
  usdKrwLabel: '약 1,540원대 초중반',
  usdKrwMin: 1531.55,
  usdKrwMax: 1550.02,
  mopsUsdPerGallon: 3.383,
  mopsCentsPerGallon: 338.3,
  mopsUsdPerBbl: 142.09,
  iataJetFuelUsdPerBbl: 116.63,
  iataJetFuelWeeklyChangePct: -2.1,
  brentUsdPerBbl: 73.0,
  brentUsdPerBblLabel: '약 73달러대',
  usIranStrikeConfirmed: true,
  usIranStrikeDate: '2026.06.26~2026.06.27',
  hormuzSundayCrossings: 22,
  hormuzFriSunCrossings: 108,
  referenceAsOf: {
    mops: '2026.05.16~2026.06.15 average reference for July 2026 filing; August 2026 surcharge window is still in progress',
    augustSurchargeWindow: '2026.06.16~2026.07.15 average window for August 2026 surcharge; not finalized yet',
    usdKrw: '2026.06.30 09:20 KST market snapshot',
    iataJetFuel: 'IATA Fuel Price Monitor latest weekly global jet fuel average',
    brentWti: '2026.06.29~2026.06.30 market reference after renewed Hormuz and U.S.-Iran tension',
    geo: 'U.S. strikes against Iran were confirmed for June 26~27, but not a new June 30 morning strike; Hormuz transit is recovering but not normalized'
  },
  sources: {
    usdKrw: 'Investing.com USD/KRW around 1,540 KRW as of 2026.06.30 update window',
    mops: 'July 2026 fuel surcharge calculation reference: MOPS average 338.3 cents/gal',
    iataJetFuel: 'IATA Fuel Price Monitor: global average jet fuel 116.63 USD/bbl, down 2.1% WoW',
    brentWti: 'Reuters market context: oil around low-70 USD/bbl range after Hormuz reopening and renewed weekend fighting',
    geo: 'Reuters/AP/WSJ context: U.S. strikes confirmed on June 26~27 after Hormuz vessel attacks; both sides paused further attacks by June 29; Hormuz traffic remains below normal'
  }
});
window.AERO_MARKET_NUMBERS_LATEST = window.AERO_MARKET_NUMBERS_20260630;

window.AERO_MARKET_NUMBERS_20260701 = Object.assign({}, window.AERO_MARKET_NUMBERS_LATEST || {}, {
  asOf: '2026.07.01 09:00 KST',
  usdKrw: 1550.00,
  usdKrwLabel: '약 1,550원 안팎',
  mopsUsdPerGallon: 3.383,
  mopsCentsPerGallon: 338.3,
  mopsUsdPerBbl: 142.09,
  iataJetFuelUsdPerBbl: 116.63,
  iataJetFuelWeeklyChangePct: -2.1,
  brentUsdPerBbl: 72.92,
  wtiUsdPerBbl: 69.50,
  referenceAsOf: {
    mops: '2026.05.16~2026.06.15 average reference for July 2026 filing; August 2026 surcharge window is still in progress',
    augustSurchargeWindow: '2026.06.16~2026.07.15 average window for August 2026 surcharge; not finalized yet',
    usdKrw: '2026.07.01 09:00 KST reference; around 1,550 KRW per USD',
    iataJetFuel: 'IATA Fuel Price Monitor latest weekly global jet fuel average',
    brentWti: '2026.06.30 oil market close / 2026.07.01 KST reference',
    geo: 'Hormuz has reopened/recovered partially, but logistics, insurance and safety normalization remain incomplete'
  },
  sources: {
    usdKrw: 'Internal market memo for 2026.07.01 09:00 KST: USD/KRW around 1,550 KRW per USD',
    mops: 'July 2026 fuel surcharge calculation reference: MOPS average 338.3 cents/gal',
    iataJetFuel: 'IATA Fuel Price Monitor: global average jet fuel 116.63 USD/bbl, down 2.1% WoW',
    brentWti: '2026.06.30 oil market close reference: Brent 72.92 USD/bbl, WTI 69.50 USD/bbl',
    geo: 'Hormuz transit has partially recovered, but shipping safety, insurance, logistics delay and rerouting risks remain'
  }
});
window.AERO_MARKET_NUMBERS_LATEST = window.AERO_MARKET_NUMBERS_20260701;

(function(){
  var koMarket = {
    marketDataRef: '2026.06.23 06:55 KST 기준',
    marketBrent: '국제유가: 브렌트유는 77.90달러/bbl, WTI는 74.82달러/bbl 수준입니다. 미국-이란 협상과 공급 리스크 완화 신호로 유가 급등 압력은 약해졌습니다.',
    marketMops: '항공유 가격(MOPS): 7월 공시 기준 평균은 338.3 cents/gal입니다. IATA 글로벌 항공유는 119.17달러/bbl로 전주 대비 14.2% 하락해 8월 유류할증료 하방 압력을 키웁니다.',
    marketFx: '원달러 환율: 1달러당 약 1,534원대입니다. 항공유 하락에도 높은 환율은 항공권 총액 체감 인하 폭을 제한할 수 있습니다.',
    marketGeo: '호르무즈 해협: 일부 유조선 통항은 회복됐지만 전쟁 이전 정상 수준으로 보기는 어렵습니다. 보험료, 선박 안전 점검, 물류 정상화 속도를 계속 확인해야 합니다.',
    marketOutlook: '2026년 8월 국제선 유류할증료는 보합 또는 소폭 인하 가능성이 우세하지만, 환율 부담과 호르무즈 정상화 지연으로 큰 폭 인하는 단정하기 어렵습니다.'
  };
  var enMarket = {
    marketDataRef: 'As of 2026.06.23 06:55 KST',
    marketBrent: 'Oil prices: Brent is around USD 77.90/bbl and WTI around USD 74.82/bbl after easing supply-risk signals and U.S.-Iran talks.',
    marketMops: 'MOPS jet fuel: the July filing baseline remains 338.3 cents/gal. IATA global jet fuel is around USD 119.17/bbl, down 14.2% WoW, adding downside pressure for August.',
    marketFx: 'USD/KRW: around KRW 1,534 per USD can limit perceived total airfare relief even if jet fuel prices fall.',
    marketGeo: 'Strait of Hormuz: tanker traffic has partially recovered, but it is not back to pre-war normal levels. Insurance, vessel checks and logistics remain variables.',
    marketOutlook: 'August 2026 international fuel surcharge is more likely flat or slightly lower, but FX and incomplete Hormuz normalization make a large cut uncertain.'
  };
  if (window.I18N_SHARED) {
    Object.assign(window.I18N_SHARED.ko || (window.I18N_SHARED.ko = {}), koMarket);
    Object.assign(window.I18N_SHARED.en || (window.I18N_SHARED.en = {}), enMarket);
    ['ja','zh','fr','de'].forEach(function(lang){
      Object.assign(window.I18N_SHARED[lang] || (window.I18N_SHARED[lang] = {}), enMarket);
    });
  }
})();

(function(){
  var koMarket = {
    marketDataRef: '2026.06.22 07:00 KST 기준',
    marketBrent: '국제유가: 호르무즈 해협 재개방 기대는 남아 있지만 조건부 정상화 이슈로 단기 리스크 프리미엄이 다시 확인되고 있습니다.',
    marketMops: '항공유 가격(MOPS): 338.3 cents/gal 기준은 8월 유류할증료 하방 요인이지만, 8월 공시가 확정된 것은 아닙니다.',
    marketFx: '원달러 환율: 1달러당 약 1,527원대의 높은 환율 구간은 항공권 총액 체감 인하 폭을 제한할 수 있습니다.',
    marketGeo: '호르무즈 해협: 재개방은 조건부로 남아 있으며 보험료, 선박 안전 점검, 물류 정상화 지연을 계속 확인해야 합니다.',
    marketOutlook: '2026년 8월 국제선 유류할증료는 보합 또는 소폭 인하 가능성이 우세하지만, 환율과 호르무즈 리스크 때문에 큰 폭 인하는 단정하기 어렵습니다.'
  };
  var enMarket = {
    marketDataRef: 'As of 2026.06.22 07:00 KST',
    marketBrent: 'Oil prices: Hormuz reopening hopes remain, but conditional normalization has brought the risk premium back into focus.',
    marketMops: 'MOPS jet fuel: 338.3 cents/gal supports downside pressure for August, but the August filing is not confirmed.',
    marketFx: 'USD/KRW: around KRW 1,527 per USD remains high enough to limit perceived total airfare relief.',
    marketGeo: 'Strait of Hormuz: reopening remains conditional; insurance, vessel safety checks and logistics delays still need monitoring.',
    marketOutlook: 'August 2026 international fuel surcharge is more likely flat or slightly lower, but FX and Hormuz risks make a large cut uncertain.'
  };
  if (window.I18N_SHARED) {
    Object.assign(window.I18N_SHARED.ko || (window.I18N_SHARED.ko = {}), koMarket);
    Object.assign(window.I18N_SHARED.en || (window.I18N_SHARED.en = {}), enMarket);
    ['ja','zh','fr','de'].forEach(function(lang){
      Object.assign(window.I18N_SHARED[lang] || (window.I18N_SHARED[lang] = {}), enMarket);
    });
  }
})();

/* 2026.06.23 06:55 KST final shared market text override. */
(function(){
  var koMarket = {
    marketDataRef: '2026.06.23 06:55 KST 기준',
    marketBrent: '국제유가: 브렌트유는 77.90달러/bbl, WTI는 74.82달러/bbl 수준입니다. 미국-이란 협상과 공급 리스크 완화 신호로 유가 급등 압력은 약해졌습니다.',
    marketMops: '항공유 가격(MOPS): 7월 공시 기준 평균은 338.3 cents/gal입니다. IATA 글로벌 항공유는 119.17달러/bbl로 전주 대비 14.2% 하락해 8월 유류할증료 하방 압력을 키웁니다.',
    marketFx: '원달러 환율: 1달러당 약 1,534원대입니다. 항공유 하락에도 높은 환율은 항공권 총액 체감 인하 폭을 제한할 수 있습니다.',
    marketGeo: '호르무즈 해협: 일부 유조선 통항은 회복됐지만 전쟁 이전 정상 수준으로 보기는 어렵습니다. 보험료, 선박 안전 점검, 물류 정상화 속도를 계속 확인해야 합니다.',
    marketOutlook: '2026년 8월 국제선 유류할증료는 보합 또는 소폭 인하 가능성이 우세하지만, 환율 부담과 호르무즈 정상화 지연으로 큰 폭 인하는 단정하기 어렵습니다.'
  };
  var enMarket = {
    marketDataRef: 'As of 2026.06.23 06:55 KST',
    marketBrent: 'Oil prices: Brent is around USD 77.90/bbl and WTI around USD 74.82/bbl after easing supply-risk signals and U.S.-Iran talks.',
    marketMops: 'MOPS jet fuel: the July filing baseline remains 338.3 cents/gal. IATA global jet fuel is around USD 119.17/bbl, down 14.2% WoW, adding downside pressure for August.',
    marketFx: 'USD/KRW: around KRW 1,534 per USD can limit perceived total airfare relief even if jet fuel prices fall.',
    marketGeo: 'Strait of Hormuz: tanker traffic has partially recovered, but it is not back to pre-war normal levels. Insurance, vessel checks and logistics remain variables.',
    marketOutlook: 'August 2026 international fuel surcharge is more likely flat or slightly lower, but FX and incomplete Hormuz normalization make a large cut uncertain.'
  };
  if (window.I18N_SHARED) {
    Object.assign(window.I18N_SHARED.ko || (window.I18N_SHARED.ko = {}), koMarket);
    Object.assign(window.I18N_SHARED.en || (window.I18N_SHARED.en = {}), enMarket);
    ['ja','zh','fr','de'].forEach(function(lang){
      Object.assign(window.I18N_SHARED[lang] || (window.I18N_SHARED[lang] = {}), enMarket);
    });
  }
})();

window.marketMoney = function(usdAmount, unit) {
  if (usdAmount == null) return '—';
  var c = window.getCurrentCurr ? window.getCurrentCurr() : (window.SHARED_STATE.curr || 'KRW');
  var sym = window.CURR_SYM[c] || c;
  var dec = window.CURR_DEC[c] != null ? window.CURR_DEC[c] : 2;
  var val;
  if (c === 'USD') {
    val = usdAmount;
    dec = 2;
  } else {
    var latestMarket = window.AERO_MARKET_NUMBERS_LATEST || window.AERO_MARKET_NUMBERS_20260608;
    var krw = usdAmount * latestMarket.usdKrw;
    val = krw * (window.RATES[c] || 1);
  }
  var amount = sym + val.toLocaleString('en-US', {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec
  });
  return amount + (unit ? '/' + unit : '');
};

window.marketMetricText = function(metric) {
  var d = window.AERO_MARKET_NUMBERS_LATEST || window.AERO_MARKET_NUMBERS_20260610 || window.AERO_MARKET_NUMBERS_20260608;
  var lang = window.getCurrentLang ? window.getCurrentLang() : (window.SHARED_STATE.lang || 'ko');
  var curr = window.getCurrentCurr ? window.getCurrentCurr() : (window.SHARED_STATE.curr || 'KRW');
  var original = curr === 'USD' ? '' : ' (USD 기준)';
  var labels = {
    ko: { brent:'브렌트유', wti:'WTI', iata:'IATA 주간 글로벌 항공유', mops:'MOPS', fx:'원달러 환율' },
    en: { brent:'Brent', wti:'WTI', iata:'IATA weekly global jet fuel', mops:'MOPS', fx:'USD/KRW' },
    ja: { brent:'ブレント原油', wti:'WTI', iata:'IATA週間グローバル航空燃料', mops:'MOPS', fx:'USD/KRW' },
    zh: { brent:'布伦特原油', wti:'WTI', iata:'IATA每周全球航空燃油', mops:'MOPS', fx:'美元/韩元' },
    fr: { brent:'Brent', wti:'WTI', iata:'Carburant aviation mondial hebdo IATA', mops:'MOPS', fx:'USD/KRW' },
    de: { brent:'Brent', wti:'WTI', iata:'IATA wöchentlicher globaler Jet Fuel', mops:'MOPS', fx:'USD/KRW' }
  };
  var l = labels[lang] || labels.en;
  if (metric === 'brentRange') return l.brent + ' ' + window.marketMoney(d.brentMinUsdPerBbl, 'bbl') + '–' + window.marketMoney(d.brentMaxUsdPerBbl, 'bbl') + original;
  if (metric === 'wtiRange') return l.wti + ' ' + window.marketMoney(d.wtiMinUsdPerBbl, 'bbl') + '–' + window.marketMoney(d.wtiMaxUsdPerBbl, 'bbl') + original;
  if (metric === 'brent') return l.brent + ' ' + window.marketMoney(d.brentUsdPerBbl, 'bbl') + original;
  if (metric === 'wti') return l.wti + ' ' + window.marketMoney(d.wtiUsdPerBbl, 'bbl') + original;
  if (metric === 'iataJetFuel') return l.iata + ' ' + window.marketMoney(d.iataJetFuelUsdPerBbl, 'bbl') + original;
  if (metric === 'mops') {
    return l.mops + ' ' + window.marketMoney(d.mopsUsdPerGallon, 'gal') + ' / ' + window.marketMoney(d.mopsUsdPerBbl, 'bbl') + original;
  }
  if (metric === 'usdKrw') return l.fx + ' 1 USD = ₩' + d.usdKrw.toLocaleString('en-US', { minimumFractionDigits:2, maximumFractionDigits:2 });
  return '';
};

window.marketMetricHtml = function(metric) {
  return '<span data-market-metric="' + metric + '"></span>';
};

window.hydrateMarketMetricSpans = function(root) {
  var scope = root || document;
  scope.querySelectorAll('[data-market-metric]').forEach(function(el) {
    el.textContent = window.marketMetricText(el.getAttribute('data-market-metric'));
  });
};

/* ─────────────────────────────────────────────
   STATUS 시스템
───────────────────────────────────────────── */
window.resolveStatus = function(airline, overrideEntry) {
  if (overrideEntry && overrideEntry.status) return overrideEntry.status;

  /* [1] airline_meta.json 기반: hasOfficialNotice=true + officialNoticeUrl 있으면 공식 확인 */
  var code = airline.iataCode || airline.code || airline.iata;
  var meta = (code && window.getAirlineMeta) ? window.getAirlineMeta(code) : null;
  if (meta && meta.hasOfficialNotice && meta.officialNoticeUrl) {
    return 'official_verified';
  }

  var c  = airline.confidence;
  var st = airline.sourceType || airline.officialDataSource;

  /* [2] sourceType/officialDataSource 기반: manual_verified/manual_override/official_notice */
  if (st === 'manual_verified' ||
      st === 'manual_override' ||
      st === 'official_notice') {
    return 'official_verified';
  }

  /* [3] 기존 supported + fresh */
  if (c === 'fresh' && airline.supported) return 'official_verified';

  /* [4] 이하 기존 로직 유지 */
  if (c === 'stale')                      return 'stale_fallback';
  if (st === 'fare_breakdown')            return 'fare_breakdown_based';
  if (st === 'fare_embedded' || st === 'booking_only' || st === 'manual') return 'official_missing';
  if (c === 'unsupported')               return 'official_missing';
  if (c === 'error')                     return 'official_blocked';
  /* [5] regulatoryContext는 최후 fallback */
  if (airline.regulatoryContext)         return 'regulation_based';
  return 'unknown';
};

var _STATUS_LABELS = {
  ko:{ official_verified:'공식 공지', official_blocked:'자동 확인 불가',
       official_missing:'공시 없음', regulation_based:'국가 규정 기준',
       stale_fallback:'이전 데이터', fare_breakdown_based:'발권 기준 추정', unknown:'확인 불가' },
  en:{ official_verified:'Official', official_blocked:'Access Restricted',
       official_missing:'No Notice', regulation_based:'Regulation Based',
       stale_fallback:'Previous Data', fare_breakdown_based:'Fare Estimate', unknown:'Unknown' },
  ja:{ official_verified:'公式確認', official_blocked:'確認不可',
       official_missing:'公示なし', regulation_based:'国家規定',
       stale_fallback:'前回データ', fare_breakdown_based:'発券推定', unknown:'不明' },
  zh:{ official_verified:'官方确认', official_blocked:'无法确认',
       official_missing:'无公告', regulation_based:'依据国家规定',
       stale_fallback:'历史数据', fare_breakdown_based:'发票估算', unknown:'未知' },
  fr:{ official_verified:'Officiel', official_blocked:'Accès restreint',
       official_missing:'Sans notice', regulation_based:'Réglementation',
       stale_fallback:'Données préc.', fare_breakdown_based:'Estimation', unknown:'Inconnu' },
  de:{ official_verified:'Offiziell', official_blocked:'Eingeschränkt',
       official_missing:'Keine Mitteilung', regulation_based:'Regelung',
       stale_fallback:'Vorherige Daten', fare_breakdown_based:'Schätzung', unknown:'Unbekannt' },
};

window.statusLabel = function(s) {
  var l = window.SHARED_STATE.lang;
  return (_STATUS_LABELS[l] || _STATUS_LABELS.ko)[s] || s;
};
window.statusCls = function(s) {
  return { official_verified:'sb-official', official_blocked:'sb-blocked',
    official_missing:'sb-missing', regulation_based:'sb-regulation',
    stale_fallback:'sb-stale', fare_breakdown_based:'sb-breakdown', unknown:'sb-unknown' }[s] || 'sb-unknown';
};

var _STATUS_DESC = {
  ko:{ official_verified:'공식 공시 데이터 기준', official_blocked:'공식 페이지 접근 제한 (데이터 확인 불가)',
       official_missing:'별도 유류할증료 공시 없음', regulation_based:'국가 규정 참고 (실제 금액 상이 가능)',
       stale_fallback:'이전 수집 데이터 유지 중', fare_breakdown_based:'YQ/YR 발권 분해 추정값', unknown:'데이터 확인 불가' },
  en:{ official_verified:'Based on official surcharge notice', official_blocked:'Official page access restricted',
       official_missing:'No separate surcharge published', regulation_based:'National regulation reference',
       stale_fallback:'Previous collected data', fare_breakdown_based:'YQ/YR fare breakdown estimate', unknown:'Data unavailable' },
};
window.statusDesc = function(s) {
  var l = window.SHARED_STATE.lang;
  return (_STATUS_DESC[l] || _STATUS_DESC.en)[s] || '';
};
window.statusBadgeHtml = function(s) {
  return '<span class="status-badge ' + window.statusCls(s) + '"><span class="sb-dot"></span>' + window.statusLabel(s) + '</span>';
};

/* ─────────────────────────────────────────────
   AI 예측 배지 / 블록
───────────────────────────────────────────── */
window.aiBadgeHtml = function() {
  return '<span class="ai-predict-badge"><span class="ai-dot"></span>' + window.ts('aiPredictBadge') + '</span>';
};

/* AI 예측 카드 블록 HTML
   targetPeriod: forecastEntry.targetPeriod (공식 데이터 basePeriod + 1)
   시스템 날짜 사용 금지 */
window.buildAIPredictBlock = function(forecastEntry, currentKRW, isRT, miles) {
  var l = window.SHARED_STATE.lang;
  var t = window.I18N_SHARED[l] || window.I18N_SHARED.ko;
  var mult = isRT ?2 : 1;

  /* 예측 불가 케이스 */
  if (!forecastEntry || forecastEntry.predictedMin == null) {
    var reason = (forecastEntry && forecastEntry.unavailableReason) || t.predictPreparing;
    return '<div class="ai-predict-block unavail">'
      + window.aiBadgeHtml()
      + '<span class="ai-unavail-text">' + reason + '</span>'
      + '</div>';
  }

  /* 예측 대상 월: forecastEntry.targetPeriod (공식 데이터 basePeriod 기준 +1) */
  var nextLabel = forecastEntry.targetPeriod
    || window.nextMonthLabel(forecastEntry.basePeriod)
    || '공시 전';

  var minV = forecastEntry.predictedMin * mult;
  var maxV = forecastEntry.predictedMax * mult;
  var dir  = forecastEntry.direction || 'flat';
  var conf = forecastEntry.confidence || 0;
  var lvl  = conf >= 0.60 ? 'high' : conf >= 0.40 ? 'medium' : 'low';
  var pct  = Math.round(conf * 100);
  var confLabel = t.confidence[lvl] || lvl;
  var drivers = Array.isArray(forecastEntry.drivers) ? forecastEntry.drivers.slice(0,3) : [];

  var dirArrow = { up:'▲', down:'▼', flat:'→' }[dir] || '→';
  var dirCls   = { up:'dir-up', down:'dir-down', flat:'dir-flat' }[dir] || 'dir-flat';

  var basisHtml = '';
  if (drivers.length) {
    basisHtml = '<div class="ai-basis-label">' + t.predictBasis + '</div>'
      + '<div class="ai-drivers">';
    drivers.forEach(function(d) {
      basisHtml += '<span class="ai-driver-chip ' + (d.impact||'neutral') + '">' + d.factor + '</span>';
    });
    basisHtml += '</div>';
  }

  return '<div class="ai-predict-block">'
    + '<div class="ai-predict-header">'
    + window.aiBadgeHtml()
    + '<span class="ai-predict-period">' + nextLabel + '</span>'
    + '<span class="ai-conf-badge ' + lvl + '">' + confLabel + ' ' + pct + '%</span>'
    + '</div>'
    + '<div class="ai-predict-range">'
    + window.fmtAmt(minV) + '<span class="ai-range-sep">~</span>' + window.fmtAmt(maxV)
    + '<span class="ai-dir ' + dirCls + '">' + dirArrow + '</span>'
    + '</div>'
    + basisHtml
    + '<div class="ai-predict-note">' + t.predictNote + '</div>'
    + '</div>';
};

/* ─────────────────────────────────────────────
   MANUAL OVERRIDE
───────────────────────────────────────────── */
window.getOverrideEntry = function(overrides, iataCode, dep, arr) {
  if (!overrides || !iataCode || iataCode.startsWith('_')) return null;
  var ao = overrides[iataCode];
  if (!ao || typeof ao !== 'object') return null;
  return ao[dep+'-'+arr] || ao[arr+'-'+dep] || null;
};

/* ─────────────────────────────────────────────
   EFFECTIVE VALUE 해석 (override > official > stale)
───────────────────────────────────────────── */
var _AP_REGION = {
  ICN:'KR',GMP:'KR',PUS:'KR',CJU:'KR',
  NRT:'JP',HND:'JP',KIX:'JP',FUK:'JP',CTS:'JP',NGO:'JP',OKA:'JP',
  HKG:'HK',MFM:'HK',
  SIN:'SG',PVG:'CN',PEK:'CN',CAN:'CN',CTU:'CN',TPE:'TW',
  BKK:'TH',HKT:'TH',KUL:'MY',MNL:'PH',CEB:'PH',
  SGN:'VN',HAN:'VN',DAD:'VN',DPS:'ID',CGK:'ID',
  DEL:'IN',BOM:'IN',
  SYD:'AU',MEL:'AU',AKL:'NZ',
  JFK:'US',EWR:'US',LAX:'US',SFO:'US',SEA:'US',ORD:'US',ATL:'US',IAD:'US',HNL:'US',GUM:'US',
  YVR:'CA',YYZ:'CA',
  LHR:'GB',MAN:'GB',CDG:'FR',FRA:'DE',MUC:'DE',AMS:'NL',
  FCO:'IT',BCN:'ES',MAD:'ES',VIE:'AT',ZRH:'CH',HEL:'FI',IST:'TR',
  DXB:'AE',AUH:'AE',DOH:'QA',ADD:'ET',
};

function _toKRW(val, currency) {
  if (val == null) return null;
  var rates = { USD:1450, JPY:10.1, EUR:1630, GBP:1870, CNY:204, HKD:190, AUD:950, SGD:1110 };
  if (currency && currency !== 'KRW') return Math.round(val * (rates[currency] || 1));
  return val;
}

/* ─────────────────────────────────────────────
   노선별 유류할증료 조회 (파이프라인 items[] 기반)
   distanceRange 키 형식: "0-500", "500-1000", "6500+"
───────────────────────────────────────────── */

/**
 * 마일수(miles)가 주어진 distanceRange 키에 속하는지 확인.
 * @param {number} miles
 * @param {string} rangeKey - "0-500" | "500-1000" | "6500+"
 * @returns {boolean}
 */
window.isInDistanceRange = function(miles, rangeKey) {
  if (!rangeKey) return false;
  if (rangeKey.endsWith('+')) {
    var min = parseInt(rangeKey, 10);
    return miles >= min;
  }
  var parts = rangeKey.split('-');
  if (parts.length <2) return false;
  var lo = parseInt(parts[0], 10);
  var hi = parseInt(parts[1], 10);
  return miles >= lo && miles < hi;
};

/**
 * 항공사 피드에서 특정 마일수에 해당하는 item 하나를 반환.
 * 파이프라인이 저장한 distanceRange 기반으로 매핑.
 * @param {object} airline - 피드의 airline 항목
 * @param {number} miles   - 해당 노선 마일수
 * @returns {object|null}  - 해당 item 또는 null
 */
window.resolveItemByMiles = function(airline, miles) {
  if (!airline || !Array.isArray(airline.items) || !airline.items.length) return null;
  // distanceRange가 있는 항목 우선 탐색
  var matched = airline.items.find(function(it) {
    return it.distanceRange && window.isInDistanceRange(miles, it.distanceRange);
  });
  // 없으면 첫 번째 항목 (기존 호환)
  return matched || airline.items[0];
};

/**
 * 항공사 피드의 전체 routes(items[])를 UI용 배열로 반환.
 * 검증 통과한 항목만 (spiked 항목은 경고 포함).
 * @param {object} airline
 * @returns {{ distanceRange:string|null, label:string, amount:number, currency:string, spiked:boolean }[]}
 */
window.resolveAllRoutes = function(airline) {
  if (!airline || !Array.isArray(airline.items)) return [];
  return airline.items
    .filter(function(it) { return it.current != null; })
    .map(function(it) {
      var cur = it.currency || airline.currency || 'KRW';
      return {
        distanceRange: it.distanceRange || null,
        label:    it.label || it.distanceRange || '—',
        amount:   it.current,
        amountKRW: _toKRW(it.current, cur),
        currency: cur,
        spiked:   !!it.spiked,
      };
    });
};

window.resolveEffectiveFuelValue = function(airline, overrideEntry, originCode) {
  if (overrideEntry && overrideEntry.fuelSurcharge != null) {
    return {
      current: _toKRW(overrideEntry.fuelSurcharge, overrideEntry.currency||'KRW'),
      prev: null, next: null, diff: null, currency:'KRW',
      label: overrideEntry.note||null, source:'manual',
      periodCurrent: overrideEntry.period || null, periodPrev: null,
    };
  }
  if (airline.supported && airline.confidence === 'fresh') {
    var region = _AP_REGION[originCode] || originCode;
    var item = null;
    if (airline.items_by_origin && airline.items_by_origin[region] && airline.items_by_origin[region].length)
      item = airline.items_by_origin[region][0];
    else if (airline.items && airline.items.length)
      item = airline.items[0];
    if (item) {
      var curr = item.currency || airline.currency || 'KRW';
      return {
        current: _toKRW(item.current, curr),
        prev: _toKRW(item.prev, curr),
        next: _toKRW(item.next, curr),
        diff: _toKRW(item.diff, curr),
        currency: 'KRW', label: item.label||null, source:'official',
        periodCurrent: window.formatPeriodLabel(airline.currentPeriod) || null,
        periodPrev: window.formatPeriodLabel(airline.previousPeriod) || null,
        periodNext: window.formatPeriodLabel(airline.nextPeriod) || null,
      };
    }
  }
  if (airline.confidence === 'stale' && airline.items && airline.items.length) {
    var item2 = airline.items[0];
    var curr2 = item2.currency || airline.currency || 'KRW';
    return {
      current: _toKRW(item2.current, curr2),
      prev: null, next: null, diff: null, currency:'KRW',
      label: item2.label||null, source:'stale',
      periodCurrent: window.formatPeriodLabel(airline.currentPeriod) || null,
      periodPrev: null,
    };
  }
  return null;
};

/* ─────────────────────────────────────────────
   YQ/YR 검증
───────────────────────────────────────────── */
window.resolveValidationStatus = function(officialAmt, fareBreakdownAmt) {
  if (officialAmt == null || fareBreakdownAmt == null) return 'unavailable';
  var pct = officialAmt > 0 ? Math.abs(officialAmt - fareBreakdownAmt) / officialAmt : 0;
  if (pct <= 0.05) return 'matched';
  if (pct <= 0.15) return 'minor_diff';
  return 'major_diff';
};
var _VLBL = {
  ko:{matched:'일치',minor_diff:'소폭 차이',major_diff:'큰 차이',unavailable:'검증 불가'},
  en:{matched:'Matched',minor_diff:'Minor diff',major_diff:'Major diff',unavailable:'Unavailable'},
};
window.validationLabel = function(vs) {
  return (_VLBL[window.SHARED_STATE.lang]||_VLBL.en)[vs]||vs;
};
window.buildValidationHtml = function(officialAmt, fareData) {
  if (!fareData) return '';
  var vs = window.resolveValidationStatus(officialAmt, fareData.amount);
  var clsMap = {matched:'match',minor_diff:'minor',major_diff:'major',unavailable:'unavail'};
  var l = window.SHARED_STATE.lang;
  return '<div class="yqyr-block '+(clsMap[vs]||'unavail')+'">'
    +'<span class="yq-lbl">'+({ko:'공식 공지',en:'Official'}[l]||'Official')+'</span>'
    +'<span class="yq-val">'+window.fmtAmt(officialAmt)+'</span>'
    +' / <span class="yq-lbl">'+({ko:'발권('+fareData.code+')',en:'Fare('+fareData.code+')'}[l]||'Fare')+'</span>'
    +'<span class="yq-val">'+window.fmtAmt(fareData.amount)+'</span>'
    +' <span class="yq-status '+(clsMap[vs]||'unavail')+'">'+window.validationLabel(vs)+'</span>'
    +(fareData.note?'<div class="yq-note">'+fareData.note+'</div>':'')
    +'</div>';
};

/* ─────────────────────────────────────────────
   BetaNoticeBanner — 베타 안내 배너 컴포넌트
   사용법:
     window.renderBetaBanner('컨테이너-id')   // 컨테이너 안에 삽입
     window.renderBetaBanner(null, refEl)     // refEl 바로 앞에 삽입
───────────────────────────────────────────── */
window.BETA_BANNER_HTML = function() {
  return ''
    + '<div class="beta-banner" id="betaNoticeBanner" role="note" aria-label="베타 서비스 안내">'
    + '<div class="beta-banner-inner">'
    + '<div class="beta-banner-icon">⚠️</div>'
    + '<div class="beta-banner-body">'
    + '<div class="beta-banner-title">'
    + '<span class="beta-badge">BETA</span>'
    + '베타 서비스 안내'
    + '</div>'
    + '<div class="beta-banner-desc">'
    + '현재 한국 출발 국제선 유류할증료를 기준으로 제공되고 있으며, 일부 항공사는 공식 공지 기반 수동 반영입니다.<br>'
    + '최종 금액은 항공사 공식 공지를 반드시 확인해주세요.'
    + '</div>'
    + '<div class="beta-banner-note">'
    + '※ 현재는 한국 출발 국제선만 지원합니다. 해외 출발 노선은 서비스 준비중입니다.'
    + '</div>'
    + '</div>'
    + '</div>'
    + '</div>';
};

/**
 * 베타 배너를 페이지에 삽입합니다.
 * @param {string|null} containerId  - 삽입할 컨테이너 ID (null이면 refEl 앞에 삽입)
 * @param {Element|null} refEl       - 이 요소 바로 앞에 삽입 (containerId가 null일 때 사용)
 */
window.renderBetaBanner = function(containerId, refEl) {
  // 중복 삽입 방지
  if (document.getElementById('betaNoticeBanner')) return;

  var html = window.BETA_BANNER_HTML();
  var tmp = document.createElement('div');
  tmp.innerHTML = html;
  var node = tmp.firstElementChild;

  if (containerId) {
    var container = document.getElementById(containerId);
    if (container) { container.appendChild(node); return; }
  }
  if (refEl && refEl.parentNode) {
    refEl.parentNode.insertBefore(node, refEl);
    return;
  }
  // fallback: body 맨 앞 nav 뒤에 삽입
  var nav = document.querySelector('nav');
  if (nav && nav.nextSibling) {
    nav.parentNode.insertBefore(node, nav.nextSibling);
  } else {
    document.body.appendChild(node);
  }
};

/* ─────────────────────────────────────────────
   NAV 초기화
───────────────────────────────────────────── */
window.initNav = function(opts) {
  var langEl = document.getElementById('navLang');
  var currEl = document.getElementById('navCurr');
  if (langEl) {
    langEl.value = window.SHARED_STATE.lang;
    langEl.addEventListener('change', function() {
      window.SHARED_STATE.lang = this.value;
      document.documentElement.lang = this.value;
      if (opts && opts.onLangChange) opts.onLangChange(this.value);
    });
  }
  if (currEl) {
    currEl.value = window.SHARED_STATE.curr;
    currEl.addEventListener('change', function() {
      window.SHARED_STATE.curr = this.value;
      if (opts && opts.onCurrChange) opts.onCurrChange(this.value);
    });
  }
};

/* ─────────────────────────────────────────────
   v32: AIRLINE_META 시스템
   airline_meta.json 기반 항공사 설정 중앙 관리
   officialNoticeUrl / isVisibleToUser / excludeFromPublicLists 등
───────────────────────────────────────────── */
/* ═════════════════════════════════════════════════════════
   v33 AIRLINE_META 시스템
   airline_meta.json 중앙 관리 — 모든 화면 공통 참조
   supportedOrigins / surchargeSchema / showSingleAmtOnMain 추가
═════════════════════════════════════════════════════════ */
window.AIRLINE_META = null;
window.MANUAL_OVERRIDES = null;

/* ─────────────────────────────────────────────
   ZE(이스타항공) 6월 공식 공시 하드코딩 데이터
  2026.05.19 공시 기준 · PDF 원문 확인 완료
   1군 USD 43 /2군 USD 54 / 3군 USD 66
   4군 USD 79 / 5군 USD 89 / 6군 USD 103
───────────────────────────────────────────── */
window._ZE_OFFICIAL_OVERRIDE = {
  '2026.05': {
    sourceType: 'manual_override', confidence: 'fresh', currency: 'USD',
    surchargeSchema: 'group_tier',
    group_tiers: [
      { group: 1, label: '1군', amount: 52, currency: 'USD' },
      { group:2, label: '2군', amount: 66, currency: 'USD' },
      { group: 3, label: '3군', amount: 80, currency: 'USD' },
      { group: 4, label: '4군', amount: 95, currency: 'USD' },
      { group: 5, label: '5군', amount: 107, currency: 'USD' },
      { group: 6, label: '6군', amount: 126, currency: 'USD' },
    ],
    group_route_map: {
      1: { milesApprox: '0-700',    routes: ['인천-후쿠오카','부산-후쿠오카','부산-오사카','부산-구마모토','제주-상하이','청주-옌지','인천-엔타이'] },
     2: { milesApprox: '700-1200', routes: ['인천-나리타','인천-오사카','인천-치토세','부산-치토세','인천-오키나와','부산-오키나와','인천-도쿠시마','김포-타이베이','인천-타이베이','청주-타이베이','제주-타이베이','부산-타이베이','인천-상하이','청주-상하이','부산-옌지','인천-정저우'] },
      3: { milesApprox: '1200-1500', routes: ['인천-홍콩','청주-장가계'] },
      4: { milesApprox: '1500-1800', routes: ['인천-다낭'] },
      5: { milesApprox: '1800-2500', routes: ['인천-방콕','인천-치앙마이','부산-치앙마이','인천-나트랑','인천-푸꾸옥','인천-마나도'] },
      6: { milesApprox: '2500+',     routes: ['인천-알마티','부산-알마티'] },
    },
  },
  '2026.06': {
    sourceType: 'manual_override', confidence: 'fresh', currency: 'USD',
    surchargeSchema: 'group_tier',
    officialNoticeUrl: 'https://www.eastarjet.com/newstar/PGWCA00002?cId=11&iId=0&bId=594&lang=KR',
    group_tiers: [
      { group: 1, label: '1군', amount: 43, currency: 'USD' },
      { group:2, label: '2군', amount: 54, currency: 'USD' },
      { group: 3, label: '3군', amount: 66, currency: 'USD' },
      { group: 4, label: '4군', amount: 79, currency: 'USD' },
      { group: 5, label: '5군', amount: 89, currency: 'USD' },
      { group: 6, label: '6군', amount: 103, currency: 'USD' },
    ],
    group_route_map: {
      1: { milesApprox: '0-700',    routes: ['인천-후쿠오카','부산-후쿠오카','부산-오사카','부산-구마모토','제주-상하이','청주-옌지','인천-엔타이'] },
     2: { milesApprox: '700-1200', routes: ['인천-나리타','인천-오사카','인천-치토세','부산-치토세','인천-오키나와','부산-오키나와','인천-도쿠시마','김포-타이베이','인천-타이베이','청주-타이베이','제주-타이베이','부산-타이베이','인천-상하이','청주-상하이','부산-옌지','인천-정저우'] },
      3: { milesApprox: '1200-1500', routes: ['인천-홍콩','청주-장가계'] },
      4: { milesApprox: '1500-1800', routes: ['인천-다낭'] },
      5: { milesApprox: '1800-2500', routes: ['인천-방콕','인천-치앙마이','부산-치앙마이','인천-나트랑','인천-푸꾸옥','인천-마나도'] },
      6: { milesApprox: '2500+',     routes: ['인천-알마티','부산-알마티'] },
    },
  },
};

/* ─────────────────────────────────────────────
   7C(제주항공)2026년 6월 공식 공시 하드코딩 데이터
  2026.05.21 09:00 KST 기준 · official_verified
   거리구간별 USD 공시 — 5월 대비 전 구간 인하
   1구간 USD 52→42 /2구간 USD 66→54
   3구간 USD 80→65 / 4구간 USD 95→78
   5구간 USD 107→89 / 6구간 USD 126→104
   공식 공지: jejuair.net2026.05.XX 기준
───────────────────────────────────────────── */
window._7C_OFFICIAL_OVERRIDE = {
  '2026.05': {
    sourceType: 'official_notice', status: 'official_verified', confidence: 'fresh', currency: 'USD',
    surchargeSchema: 'mileage_band',
    officialNoticeUrl: 'https://www.jejuair.net/ko/customerServiceCenter/noticeDetail.do?billboardNo=0000000703',
    items: [
      { distanceRange: '1~500mile',       label: '1~500마일',       amount: 52,  currency: 'USD' },
      { distanceRange: '500~1000mile',    label: '500~1,000마일',   amount: 66,  currency: 'USD' },
      { distanceRange: '1000~1500mile',   label: '1,000~1,500마일', amount: 80,  currency: 'USD' },
      { distanceRange: '1500~2000mile',   label: '1,500~2,000마일', amount: 95,  currency: 'USD' },
      { distanceRange: '2000~2500mile',   label: '2,000~2,500마일', amount: 107, currency: 'USD' },
      { distanceRange: '2500mile+',       label: '2,500마일+',      amount: 126, currency: 'USD' },
    ],
  },
  '2026.06': {
    sourceType: 'official_notice', status: 'official_verified', confidence: 'fresh', currency: 'USD',
    surchargeSchema: 'mileage_band',
    officialNoticeUrl: 'https://www.jejuair.net/ko/customerServiceCenter/noticeDetail.do?billboardNo=0000000690',
    items: [
      { distanceRange: '1~500mile',       label: '1~500마일',       amount: 42,  currency: 'USD' },
      { distanceRange: '500~1000mile',    label: '500~1,000마일',   amount: 54,  currency: 'USD' },
      { distanceRange: '1000~1500mile',   label: '1,000~1,500마일', amount: 65,  currency: 'USD' },
      { distanceRange: '1500~2000mile',   label: '1,500~2,000마일', amount: 78,  currency: 'USD' },
      { distanceRange: '2000~2500mile',   label: '2,000~2,500마일', amount: 89,  currency: 'USD' },
      { distanceRange: '2500mile+',       label: '2,500마일+',      amount: 104, currency: 'USD' },
    ],
  },
  '2026.07': {
    sourceType: 'official_notice', status: 'official_verified', confidence: 'fresh', currency: 'USD',
    surchargeSchema: 'mileage_band',
    officialNoticeUrl: 'https://www.jejuair.net/ko/customerServiceCenter/noticeDetail.do?billboardNo=0000000729',
    verifiedAt: '2026-06-16T00:00:00+09:00',
    items: [
      { distanceRange: '1~500mile',       label: '1~500마일',       amount: 30, currency: 'USD' },
      { distanceRange: '500~1000mile',    label: '500~1,000마일',   amount: 38, currency: 'USD' },
      { distanceRange: '1000~1500mile',   label: '1,000~1,500마일', amount: 46, currency: 'USD' },
      { distanceRange: '1500~2000mile',   label: '1,500~2,000마일', amount: 55, currency: 'USD' },
      { distanceRange: '2000~2500mile',   label: '2,000~2,500마일', amount: 62, currency: 'USD' },
      { distanceRange: '2500mile+',       label: '2,500마일+',      amount: 72, currency: 'USD' },
    ],
  },
};

window._JULY_2026_OFFICIAL_OVERRIDES = {
  KE: {
    '2026.07': {
      sourceType: 'official_notice', status: 'official_verified', confidence: 'fresh', currency: 'KRW',
      surchargeSchema: 'mileage_band',
      officialNoticeUrl: 'https://www.koreanair.com/contents/footer/customer-support/notice/2026/2607-infuel?pageNum=1',
      verifiedAt: '2026-06-16T00:00:00+09:00',
      items: [
        { distanceRange: '0-499',     label: '~499마일',       amount: 46400,  currency: 'KRW' },
        { distanceRange: '500-999',   label: '500~999마일',    amount: 62400,  currency: 'KRW' },
        { distanceRange: '1000-1499', label: '1,000~1,499마일', amount: 86400,  currency: 'KRW' },
        { distanceRange: '1500-1999', label: '1,500~1,999마일', amount: 108800, currency: 'KRW' },
        { distanceRange: '2000-2999', label: '2,000~2,999마일', amount: 139200, currency: 'KRW' },
        { distanceRange: '3000-3999', label: '3,000~3,999마일', amount: 147200, currency: 'KRW' },
        { distanceRange: '4000-4999', label: '4,000~4,999마일', amount: 214400, currency: 'KRW' },
        { distanceRange: '5000-6499', label: '5,000~6,499마일', amount: 318400, currency: 'KRW' },
        { distanceRange: '6500+',     label: '6,500마일 이상', amount: 344000, currency: 'KRW' },
      ],
    },
  },
  OZ: {
    '2026.07': {
      sourceType: 'official_notice', status: 'official_verified', confidence: 'fresh', currency: 'KRW',
      surchargeSchema: 'mileage_band',
      officialNoticeUrl: 'https://flyasiana.com/C/KR/KO/customer/notice/detail?id=CM202606160002529424&dispCt=all&page=1&searchOption=0&searchText=',
      verifiedAt: '2026-06-16T00:00:00+09:00',
      items: [
        { distanceRange: '0-499',     label: '~499마일',       amount: 48500,  currency: 'KRW' },
        { distanceRange: '500-999',   label: '500~999마일',    amount: 71200,  currency: 'KRW' },
        { distanceRange: '1000-1499', label: '1,000~1,499마일', amount: 94000,  currency: 'KRW' },
        { distanceRange: '1500-1999', label: '1,500~1,999마일', amount: 116700, currency: 'KRW' },
        { distanceRange: '2000-2499', label: '2,000~2,499마일', amount: 139400, currency: 'KRW' },
        { distanceRange: '2500-2999', label: '2,500~2,999마일', amount: 162200, currency: 'KRW' },
        { distanceRange: '3000-3999', label: '3,000~3,999마일', amount: 184900, currency: 'KRW' },
        { distanceRange: '4000-4999', label: '4,000~4,999마일', amount: 230400, currency: 'KRW' },
        { distanceRange: '5000+',     label: '5,000마일 이상', amount: 275800, currency: 'KRW' },
      ],
    },
  },
  LJ: {
    '2026.07': {
      sourceType: 'official_notice', status: 'official_verified', confidence: 'fresh', currency: 'USD',
      surchargeSchema: 'mileage_band',
      officialNoticeUrl: 'https://www.jinair.com/company/announce/announceView?anceSeq=28218&searchWord=&searchKey=titlCtn&page=1',
      verifiedAt: '2026-06-16T00:00:00+09:00',
      items: [
        { distanceRange: '1-599',     label: '1~599마일',       amount: 27, currency: 'USD' },
        { distanceRange: '600-1199',  label: '600~1,199마일',   amount: 37, currency: 'USD' },
        { distanceRange: '1200-1799', label: '1,200~1,799마일', amount: 61, currency: 'USD' },
        { distanceRange: '1800-2399', label: '1,800~2,399마일', amount: 67, currency: 'USD' },
        { distanceRange: '2400-3599', label: '2,400~3,599마일', amount: 79, currency: 'USD' },
      ],
    },
  },
  ZE: {
    '2026.07': {
      sourceType: 'official_notice', status: 'official_verified', confidence: 'fresh', currency: 'USD',
      surchargeSchema: 'group_tier',
      officialNoticeUrl: 'https://www.eastarjet.com/newstar/PGWCA00002?cId=11&iId=0&bId=608&lang=KR',
      verifiedAt: '2026-06-17T00:00:00+09:00',
      group_tiers: [
        { group: 1, label: '1군', amount: 30, currency: 'USD' },
        { group: 2, label: '2군', amount: 38, currency: 'USD' },
        { group: 3, label: '3군', amount: 45, currency: 'USD' },
        { group: 4, label: '4군', amount: 55, currency: 'USD' },
        { group: 5, label: '5군', amount: 62, currency: 'USD' },
        { group: 6, label: '6군', amount: 72, currency: 'USD' },
      ],
    },
  },
  RS: {
    '2026.07': {
      sourceType: 'official_notice', status: 'official_verified', confidence: 'fresh', currency: 'KRW',
      surchargeSchema: 'mileage_band',
      officialNoticeUrl: 'https://flyairseoul.com/CW/ko/noticeContent.do?seq=10914&pageNo=1',
      verifiedAt: '2026-06-18T00:00:00+09:00',
      items: [
        { distanceRange: '300-700',   label: '300~700mi',     amount: 54500, currency: 'KRW' },
        { distanceRange: '700-1100',  label: '700~1,100mi',   amount: 62100, currency: 'KRW' },
        { distanceRange: '1100-1500', label: '1,100~1,500mi', amount: 80300, currency: 'KRW' },
        { distanceRange: '1500-1900', label: '1,500~1,900mi', amount: 90900, currency: 'KRW' },
        { distanceRange: '1900-2300', label: '1,900~2,300mi', amount: 93900, currency: 'KRW' },
      ],
    },
  },
  YP: {
    '2026.07': {
      sourceType: 'official_notice', status: 'official_verified', confidence: 'fresh', currency: 'USD',
      surchargeSchema: 'mileage_band',
      officialNoticeUrl: 'https://www.airpremia.com/a/ko/customer/notice/728',
      verifiedAt: '2026-06-18T00:00:00+09:00',
      items: [
        { distanceRange: '0-999',     label: 'ICN-NRT', amount: 33,  currency: 'USD', route: 'ICN-NRT' },
        { distanceRange: '1000-1499', label: 'ICN-HKG', amount: 44,  currency: 'USD', route: 'ICN-HKG' },
        { distanceRange: '1500-1999', label: 'ICN-DAD', amount: 58,  currency: 'USD', route: 'ICN-DAD' },
        { distanceRange: '2000-2499', label: 'ICN-BKK', amount: 75,  currency: 'USD', route: 'ICN-BKK' },
        { distanceRange: '4000-4999', label: 'ICN-HNL', amount: 130, currency: 'USD', route: 'ICN-HNL' },
        { distanceRange: '5000-6499', label: 'ICN-LAX/ICN-SFO', amount: 164, currency: 'USD', route: 'ICN-LAX/ICN-SFO' },
        { distanceRange: '6500+',     label: 'ICN-IAD/ICN-EWR', amount: 205, currency: 'USD', route: 'ICN-IAD/ICN-EWR' },
      ],
    },
  },
  BX: {
    '2026.07': {
      sourceType: 'official_notice', status: 'official_verified', confidence: 'fresh', currency: 'USD',
      surchargeSchema: 'mileage_band',
      officialNoticeUrl: 'https://www.airbusan.com/content/common/customercenter/noticeDetail?id=4377',
      verifiedAt: '2026-06-17T00:00:00+09:00',
      items: [
        { distanceRange: '0-699',     label: '1구간 (~699mi)',        amount: 30, currency: 'USD' },
        { distanceRange: '700-1299',  label: '2구간 (700~1,299mi)',   amount: 54, currency: 'USD' },
        { distanceRange: '1300-1999', label: '3구간 (1,300~1,999mi)', amount: 64, currency: 'USD' },
        { distanceRange: '2000+',     label: '4구간 (2,000mi~)',      amount: 74, currency: 'USD' },
      ],
    },
  },
  TW: {
    '2026.07': {
      sourceType: 'official_notice', status: 'official_verified', confidence: 'fresh', currency: 'KRW',
      surchargeSchema: 'group_tier',
      officialNoticeUrl: 'https://www.twayair.com/app/customerCenter/notice/retrieve/12654',
      verifiedAt: '2026-06-19T08:42:00+09:00',
      group_tiers: [
        { group: 1, label: '1군 (~600mi)', amount: 33400, currency: 'KRW' },
        { group: 2, label: '2군 (600~1,200mi)', amount: 59200, currency: 'KRW' },
        { group: 3, label: '3군 (1,200~1,800mi)', amount: 74400, currency: 'KRW' },
        { group: 4, label: '4군 (1,800~2,400mi)', amount: 97200, currency: 'KRW' },
        { group: 5, label: '5군 (2,400~4,000mi)', amount: 104700, currency: 'KRW' },
        { group: 6, label: '6군 (4,000~5,000mi)', amount: null, currency: 'KRW' },
        { group: 7, label: '7군 (5,000mi+)', amount: 233800, currency: 'KRW' },
      ],
    },
  },
};

/* ─────────────────────────────────────────────
   TW(티웨이항공)2026년 6월 공식 공시 하드코딩 데이터
   작성일:2026.05.21 17:15 · KRW 공시 (판도 기준)
   1군 KRW 47,400 /2군 KRW 82,900 / 3군 KRW 103,600
   4군 KRW 134,700 / 5군 KRW 145,000 / 6군 — / 7군 KRW 327,000
   5월 대비 전 구간 약 19~20% 인하
   공식 공지: twayair.com2026.05.21 공시 기준
───────────────────────────────────────────── */
window._TW_OFFICIAL_OVERRIDE = {
  '2026.05': {
    sourceType: 'manual_override', confidence: 'fresh', currency: 'KRW',
    surchargeSchema: 'group_tier',
    group_tiers: [
      { group: 1, label: '1군 (~600mi)',        amount:  58600, currency: 'KRW' },
      { group:2, label: '2군 (600~1,200mi)',   amount: 103600, currency: 'KRW' },
      { group: 3, label: '3군 (1,200~1,800mi)', amount: 129100, currency: 'KRW' },
      { group: 4, label: '4군 (1,800~2,400mi)', amount: 168200, currency: 'KRW' },
      { group: 5, label: '5군 (2,400~4,000mi)', amount: 180200, currency: 'KRW' },
      { group: 6, label: '6군 (4,000~5,000mi)', amount:    null, currency: 'KRW' },
      { group: 7, label: '7군 (5,000mi+)',       amount: 406900, currency: 'KRW' },
    ],
  },
  '2026.06': {
    sourceType: 'official_notice', status: 'official_verified', confidence: 'fresh', currency: 'KRW',
    surchargeSchema: 'group_tier',
    officialNoticeUrl: 'https://www.twayair.com/app/customer/NOTICE_VIEW?lang=ko&noticeType=1&noticeNo=10001268',
    group_tiers: [
      { group: 1, label: '1군 (~600mi)',        amount:  47400, currency: 'KRW' },
      { group:2, label: '2군 (600~1,200mi)',   amount:  82900, currency: 'KRW' },
      { group: 3, label: '3군 (1,200~1,800mi)', amount: 103600, currency: 'KRW' },
      { group: 4, label: '4군 (1,800~2,400mi)', amount: 134700, currency: 'KRW' },
      { group: 5, label: '5군 (2,400~4,000mi)', amount: 145000, currency: 'KRW' },
      { group: 6, label: '6군 (4,000~5,000mi)', amount:    null, currency: 'KRW' },
      { group: 7, label: '7군 (5,000mi+)',       amount: 327000, currency: 'KRW' },
    ],
    group_route_map: {
      1: { milesApprox: '0-600',    routes: ['인천-후쿠오카','대구-후쿠오카','부산-후쿠오카','제주-후쿠오카','인천-오사카','대구-오사카','부산-오사카','인천-상하이','인천-옌지'] },
     2: { milesApprox: '600-1200', routes: ['인천-나리타','인천-오키나와','인천-삿포로','인천-타이베이','인천-홍콩','인천-마카오','인천-블라디보스토크'] },
      3: { milesApprox: '1200-1800', routes: ['인천-하노이','인천-세부','인천-클락','인천-울란바타르'] },
      4: { milesApprox: '1800-2400', routes: ['인천-방콕','인천-치앙마이','인천-다낭','인천-람'] },
      5: { milesApprox: '2400-4000', routes: ['인천-싱가포르','인천-발리','인천-타슈켄트','인천-비슈케크'] },
      6: { milesApprox: '4000-5000', routes: [] },
      7: { milesApprox: '5000+',     routes: ['인천-시드니','인천-자그레브','인천-바르셀로나','인천-로마','인천-파리','인천-프랑크푸르트','인천-밴쿠버'] },
    },
  },
  '2026.07': {
    sourceType: 'official_notice', status: 'official_verified', confidence: 'fresh', currency: 'KRW',
    surchargeSchema: 'group_tier',
    officialNoticeUrl: 'https://www.twayair.com/app/customerCenter/notice/retrieve/12654',
    verifiedAt: '2026-06-19T08:42:00+09:00',
    group_tiers: [
      { group: 1, label: '1군 (~600mi)', amount: 33400, currency: 'KRW' },
      { group: 2, label: '2군 (600~1,200mi)', amount: 59200, currency: 'KRW' },
      { group: 3, label: '3군 (1,200~1,800mi)', amount: 74400, currency: 'KRW' },
      { group: 4, label: '4군 (1,800~2,400mi)', amount: 97200, currency: 'KRW' },
      { group: 5, label: '5군 (2,400~4,000mi)', amount: 104700, currency: 'KRW' },
      { group: 6, label: '6군 (4,000~5,000mi)', amount: null, currency: 'KRW' },
      { group: 7, label: '7군 (5,000mi+)', amount: 233800, currency: 'KRW' },
    ],
  },
};

/* ─────────────────────────────────────────────
   YP(에어프레미아)2026년 6월 공식 공시 데이터
   확인 파일:2026.06 에어프레미아 유류할증료.pdf
   공식 원문은 한국 출발 편도/mile 기준 USD 공시
───────────────────────────────────────────── */
window._YP_OFFICIAL_OVERRIDE = {
  '2026.06': {
    sourceType: 'official_notice', status: 'official_verified', confidence: 'fresh', currency: 'USD',
    surchargeSchema: 'mileage_band',
    officialNoticeUrl: 'https://www.airpremia.com/a/ko/customer/notice',
    note: '에어프레미아2026년 6월 공식 공시는 편도/mile 기준 USD 금액입니다.',
    items: [
      { distanceRange: '0-999',     label: '인천-나리타', amount:  48, currency: 'USD', route: 'ICN-NRT' },
      { distanceRange: '1000-1499', label: '인천-홍콩', amount:  64, currency: 'USD', route: 'ICN-HKG' },
      { distanceRange: '1500-1999', label: '인천-다낭', amount:  83, currency: 'USD', route: 'ICN-DAD' },
      { distanceRange: '2000-2499', label: '인천-방콕', amount: 107, currency: 'USD', route: 'ICN-BKK' },
      { distanceRange: '4000-4999', label: '인천-호놀룰루', amount: 187, currency: 'USD', route: 'ICN-HNL' },
      { distanceRange: '5000-6499', label: '인천-로스앤젤레스·샌프란시스코', amount:236, currency: 'USD', route: 'ICN-LAX/ICN-SFO' },
      { distanceRange: '6500+',     label: '인천-워싱턴 D.C.·뉴욕', amount:296, currency: 'USD', route: 'ICN-IAD/ICN-EWR' },
    ],
  },
};

window.loadAirlineMeta = async function() {
  try {
    var [mr, or_] = await Promise.allSettled([
      fetch('data/airline_meta.json').then(function(r){return r.ok?r.json():null;}),
      fetch('data/manual_overrides.json').then(function(r){return r.ok?r.json():null;}),
    ]);
    if (mr.status === 'fulfilled' && mr.value) window.AIRLINE_META = mr.value.airlines || {};
    if (or_.status === 'fulfilled' && or_.value) window.MANUAL_OVERRIDES = or_.value;
  } catch(e) { window.AIRLINE_META = {}; }
  /* ZE 6월 공식 공시 데이터 강제 주입 (manual_overrides.json 미포함 대비) */
  if (!window.MANUAL_OVERRIDES) window.MANUAL_OVERRIDES = {};
  if (!window.MANUAL_OVERRIDES['ZE']) window.MANUAL_OVERRIDES['ZE'] = {};
  window.MANUAL_OVERRIDES['ZE']['2026.05'] = window._ZE_OFFICIAL_OVERRIDE['2026.05'];
  window.MANUAL_OVERRIDES['ZE']['2026.06'] = window._ZE_OFFICIAL_OVERRIDE['2026.06'];
  /* 7C(제주항공)2026년 6월 공식 공시 데이터 강제 주입 — official_verified */
  if (!window.MANUAL_OVERRIDES['7C']) window.MANUAL_OVERRIDES['7C'] = {};
  window.MANUAL_OVERRIDES['7C']['2026.05'] = window._7C_OFFICIAL_OVERRIDE['2026.05'];
  window.MANUAL_OVERRIDES['7C']['2026.06'] = window._7C_OFFICIAL_OVERRIDE['2026.06'];
  window.MANUAL_OVERRIDES['7C']['2026.07'] = window._7C_OFFICIAL_OVERRIDE['2026.07'];
  /* 2026년 7월 공식 공시 완료 항공사 — KE/OZ/LJ */
  Object.keys(window._JULY_2026_OFFICIAL_OVERRIDES || {}).forEach(function(code) {
    if (!window.MANUAL_OVERRIDES[code]) window.MANUAL_OVERRIDES[code] = {};
    var months = window._JULY_2026_OFFICIAL_OVERRIDES[code] || {};
    Object.keys(months).forEach(function(month) {
      window.MANUAL_OVERRIDES[code][month] = months[month];
    });
  });
  /* TW(티웨이항공)2026년 6월 공식 공시 데이터 강제 주입 — official_verified · KRW 공시 */
  if (!window.MANUAL_OVERRIDES['TW']) window.MANUAL_OVERRIDES['TW'] = {};
  window.MANUAL_OVERRIDES['TW']['2026.05'] = window._TW_OFFICIAL_OVERRIDE['2026.05'];
  window.MANUAL_OVERRIDES['TW']['2026.06'] = window._TW_OFFICIAL_OVERRIDE['2026.06'];
  window.MANUAL_OVERRIDES['TW']['2026.07'] = window._TW_OFFICIAL_OVERRIDE['2026.07'];
  /* YP(에어프레미아)2026년 6월 공식 PDF 공시 데이터 강제 주입 — official_verified · USD 공시 */
  if (!window.MANUAL_OVERRIDES['YP']) window.MANUAL_OVERRIDES['YP'] = {};
  window.MANUAL_OVERRIDES['YP']['2026.06'] = window._YP_OFFICIAL_OVERRIDE['2026.06'];
  if (window._JULY_2026_OFFICIAL_OVERRIDES && window._JULY_2026_OFFICIAL_OVERRIDES['YP']) {
    window.MANUAL_OVERRIDES['YP']['2026.07'] = window._JULY_2026_OFFICIAL_OVERRIDES['YP']['2026.07'];
  }
  return window.AIRLINE_META;
};

/** 항공사 메타 반환 */
window.getAirlineMeta = function(iataCode) {
  return (window.AIRLINE_META && window.AIRLINE_META[iataCode]) || null;
};

/** officialNoticeUrl — airline_meta.json 단일 참조 */
window.getOfficialNoticeUrl = function(iataCode) {
  var meta = window.getAirlineMeta(iataCode);
  return meta ? (meta.officialNoticeUrl || null) : null;
};

/* ── 한국 공항 코드 목록 ── */
var KR_AIRPORT_CODES = ['ICN','GMP','PUS','CJU','CJJ','TAE','RSU','KWJ','WJU','YNY','HIN'];

/** 해당 공항이 한국 출발인지 여부 */
window.isKoreanAirport = function(airportCode) {
  return KR_AIRPORT_CODES.indexOf(airportCode) !== -1;
};

/** 한국 출발 지원 여부 — supportedOrigins 배열에서 KR 공항 포함 여부 */
window.supportsKROrigin = function(iataCode) {
  var meta = window.getAirlineMeta(iataCode);
  if (!meta) return false;
  // supportedOrigins 배열에서 KR 코드 체크 (기존 호환)
  if (Array.isArray(meta.supportedOrigins)) {
    return meta.supportedOrigins.some(function(o) {
      return o === 'KR' || KR_AIRPORT_CODES.indexOf(o) !== -1;
    });
  }
  return false;
};

/** 특정 노선(출발→도착) 취항 여부 확인
 *  dep: 출발 공항 IATA, arr: 도착 공항 IATA
 *  반환: { operates: bool, reason: string }
 */
window.checkRouteSupport = function(iataCode, dep, arr) {
  var meta = window.getAirlineMeta(iataCode);
  if (!meta) return { operates: false, reason: 'no_meta' };

  // 1. 출발지 한국 여부 확인
  var depIsKR = window.isKoreanAirport(dep);
  var arrIsKR = window.isKoreanAirport(arr);

  // 국내선
  if (depIsKR && arrIsKR) return { operates: false, reason: 'domestic' };

  // 한국 출발/도착 아닌 경우
  if (!depIsKR && !arrIsKR) return { operates: false, reason: 'neither_kr' };

  // 한국 출발 기준으로 정렬
  var origin = depIsKR ? dep : arr;
  var destination = depIsKR ? arr : dep;

  //2. OFFICIAL_ROUTE_MAP 전용 판단 (KE/OZ 포함 8개 항공사 모두)
  //    index.html에서 OFFICIAL_ROUTE_MAP이 정의되어 있으면 그것만 사용
  if (typeof OFFICIAL_ROUTE_MAP !== 'undefined') {
    var rm = OFFICIAL_ROUTE_MAP[iataCode];
    if (!rm) {
      // routeMap이 없는 항공사: 지원 안 함
      return { operates: false, reason: 'no_route_map' };
    }
    var key1 = origin + '-' + destination;
    var key2 = destination + '-' + origin;
    var band = rm[key1] || rm[key2] || null;
    if (!band) return { operates: false, reason: 'destination_not_operated' };
    /* OZ 노선 범위 불일치 경고 (개발용) */
    if (iataCode === 'OZ' && typeof AIRLINE_PAGE_DATA !== 'undefined' && AIRLINE_PAGE_DATA.carrier === 'OZ') {
      var expectedRange = null;
      if (typeof AIRLINE_PAGE_DATA.rows !== 'undefined') {
        AIRLINE_PAGE_DATA.rows.forEach(function(row) {
          /* range string 예: "~499", "500~999", "1,000~1,499" 등을 band 형식과 매핑 */
          var rangeBand = row.range.replace(/,/g,'').replace('~','').trim();
          /* 단순 포함 여부로 비교 */
          if (row.routeKo && rangeBand) {
            /* 목적지 IATA가 routeKo에 직접 들어있지 않으므로 band 값 비교 */
          }
        });
      }
      /* AIRLINE_PAGE_DATA rows에 정의된 range와 OFFICIAL_ROUTE_MAP band 비교는
         페이지 레벨에서 처리 — 여기서는 OZ 전용 목적지 미포함 노선 경고만 */
    }
    return { operates: true, reason: 'ok', band: band };
  }

  // 3. Fallback (OFFICIAL_ROUTE_MAP 미정의 환경 — 이전 로직 유지)
  /* supportedRoutes: { "ICN": [...], "PUS": [...], "CJU": [...] } 구조 우선 처리 */
  if (meta.supportedRoutes && typeof meta.supportedRoutes === 'object') {
    var routeMap = meta.supportedRoutes[origin];
    if (!routeMap) return { operates: false, reason: 'origin_not_in_route_map' };
    var destOkR = routeMap.indexOf(destination) !== -1;
    if (!destOkR) return { operates: false, reason: 'destination_not_operated' };
    return { operates: true, reason: 'ok' };
  }
  if (Array.isArray(meta.supportedOrigins) && meta.supportedOrigins.length > 0) {
    var originOk = meta.supportedOrigins.some(function(o) {
      return o === 'KR' || o === origin;
    });
    if (!originOk) return { operates: false, reason: 'origin_not_supported' };
  }
  if (Array.isArray(meta.supportedDestinations) && meta.supportedDestinations.length > 0) {
    var destOk = meta.supportedDestinations.indexOf(destination) !== -1;
    if (!destOk) return { operates: false, reason: 'destination_not_operated' };
  }
  return { operates: true, reason: 'ok' };
};

/** public 목록 노출 여부 */
window.isPublicVisible = function(iataCode) {
  var meta = window.getAirlineMeta(iataCode);
  if (meta) return !meta.excludeFromPublicLists && meta.isVisibleToUser;
  return false;
};

/** 군별 스키마(group_tier) 여부 */
window.isGroupTierSchema = function(iataCode) {
  var meta = window.getAirlineMeta(iataCode);
  return meta && meta.surchargeSchema === 'group_tier';
};

/** manual_overrides에서 현재 기간 항목 반환 */
window.getOverrideForPeriod = function(iataCode, period) {
  if (!window.MANUAL_OVERRIDES) return null;
  var alOv = window.MANUAL_OVERRIDES[iataCode];
  if (!alOv) return null;
  return alOv[period] || null;
};

/** 현재 기간 override items 반환 (mileage_band 스키마용) */
window.getOverrideItems = function(iataCode, period) {
  var ov = window.getOverrideForPeriod(iataCode, period || '2026.05');
  if (!ov) return null;
  if (Array.isArray(ov.items) && ov.items.length > 0) return {items: ov.items, currency: ov.currency};
  return null;
};

/** 현재 기간 override group_tiers 반환 (group_tier 스키마용, ZE) */
window.getOverrideGroupTiers = function(iataCode, period) {
  var ov = window.getOverrideForPeriod(iataCode, period || '2026.05');
  if (!ov || !Array.isArray(ov.group_tiers)) return null;
  return {tiers: ov.group_tiers, routeMap: ov.group_route_map || {}, currency: ov.currency};
};

/* ─────────────────────────────────────────────
   신뢰 소스 판별 (v33: manual_override도 trusted)
───────────────────────────────────────────── */
var _TRUSTED_SRC = new Set(['official_notice','manual_verified','override','yr_yq_quote','manual_override']);
var _UNTRUSTED_SRC = new Set(['carry_over','fallback','forecast_model','low_conf']);

window.hasVerifiedOfficialData = function(feedAl) {
  if (!feedAl) return false;
  if (!_TRUSTED_SRC.has(feedAl.sourceType)) return false;
  if (feedAl.confidence !== 'fresh') return false;
  /* group_tier 스키마는 group_tiers 배열 확인 */
  if (feedAl.surchargeSchema === 'group_tier') {
    return Array.isArray(feedAl.group_tiers) && feedAl.group_tiers.length > 0;
  }
  if (!Array.isArray(feedAl.items) || feedAl.items.length === 0) return false;
  if (Array.isArray(feedAl.candidatesSummary) && feedAl.candidatesSummary.length > 0) {
    var hasReal = feedAl.candidatesSummary.some(function(c) {
      return c.valid && !_UNTRUSTED_SRC.has(c.sourceType);
    });
    if (!hasReal) return false;
  }
  return true;
};

/* ─────────────────────────────────────────────
   resolveAllRoutes v33
   manual_overrides 우선 → feed.items fallback
   null amount(티웨이 4000-5000) → 미표시 처리
───────────────────────────────────────────── */
var _KRW_RATES = {USD:1450,JPY:10.1,EUR:1630,GBP:1870,CNY:204,HKD:190,AUD:950,SGD:1110};
function _toKRWLocal(v, c) {
  if (v == null) return null;
  return (c && c !== 'KRW') ? Math.round(v * (_KRW_RATES[c] || 1)) : v;
}

window.resolveAllRoutes = function(feedAl, iataCode, period) {
  var cur_period = period || '2026.05';
  var ovData = iataCode ? window.getOverrideItems(iataCode, cur_period) : null;

  var rawItems, currency;
  if (ovData && ovData.items.length > 0) {
    rawItems = ovData.items;
    currency = ovData.currency;
  } else if (feedAl && Array.isArray(feedAl.items)) {
    rawItems = feedAl.items.filter(function(it) { return it.current != null; });
    currency = (feedAl && feedAl.currency) || 'KRW';
  } else {
    return [];
  }

  return rawItems
    .filter(function(it) {
      var amt = it.amount != null ? it.amount : it.current;
      return amt != null; /* null amount → 미표시 (티웨이 공지상 '-') */
    })
    .map(function(it) {
      var amt = it.amount != null ? it.amount : it.current;
      var cur = it.currency || currency || 'KRW';
      return {
        distanceRange: it.distanceRange || null,
        label:    it.label || it.distanceRange || '—',
        amount:   amt,
        amountKRW: _toKRWLocal(amt, cur),
        currency: cur,
        spiked:   !!it.spiked,
        dataNote: it._note || null,
      };
    });
};

/** group_tier 항공사(ZE) 전용 — group_tiers 반환 */
window.resolveGroupTiers = function(iataCode, feedAl, period) {
  var cur_period = period || '2026.05';
  var ovData = window.getOverrideGroupTiers(iataCode, cur_period);
  if (ovData) {
    return {
      tiers: ovData.tiers.map(function(t) {
        return {
          group: t.group, label: t.label, amount: t.amount,
          amountKRW: _toKRWLocal(t.amount, t.currency || 'USD'),
          currency: t.currency || 'USD',
        };
      }),
      routeMap: ovData.routeMap,
      source: 'manual_override',
    };
  }
  if (feedAl && Array.isArray(feedAl.group_tiers)) {
    return {
      tiers: feedAl.group_tiers.map(function(t) {
        return {
          group: t.group, label: t.label, amount: t.current || t.amount,
          amountKRW: _toKRWLocal(t.current || t.amount, t.currency || 'USD'),
          currency: t.currency || 'USD',
        };
      }),
      routeMap: feedAl.group_route_map || {},
      source: 'official_feed',
    };
  }
  return null;
};

/**
 * ICN 기준 마일수 → ZE 군 번호 매핑
 * group_route_map의 milesApprox 범위 기준
 */
window.resolveZEGroup = function(miles, groupTiersResult) {
  if (!groupTiersResult || !groupTiersResult.routeMap) return null;
  var routeMap = groupTiersResult.routeMap;
  for (var g in routeMap) {
    var range = routeMap[g].milesApprox || '';
    var parts = range.split('-');
    if (parts.length ===2) {
      var lo = parseInt(parts[0]), hi = parseInt(parts[1]);
      if (miles >= lo && miles < hi) return parseInt(g);
    } else if (range.endsWith('+')) {
      if (miles >= parseInt(range)) return parseInt(g);
    }
  }
  return null;
};

/* ─────────────────────────────────────────────
   금액 포맷
───────────────────────────────────────────── */
window.fmtAmtNative = function(amount, currency, mult) {
  if (amount == null) return null;
  var v = amount * (mult || 1);
  if (!currency || currency === 'KRW') return null;
  if (currency === 'USD') return '$' + (Number.isInteger(v) ? v : v.toFixed(0));
  if (currency === 'JPY') return '¥' + Math.round(v).toLocaleString();
  return v.toLocaleString() + ' ' + currency;
};

window.fmtAmtDisplay = function(amountKRW, origCurrency, mult) {
  if (amountKRW == null) return '—';
  var krw = amountKRW * (mult || 1);
  var formatted = window.fmtAmt(krw);
  if (origCurrency && origCurrency !== 'KRW') {
    var badge = '<span style="font-size:9px;background:#e3f2fd;color:#0d47a1;border-radius:4px;'
      + 'padding:1px 5px;margin-left:4px;font-weight:700;">'
      + origCurrency + '공시</span>';
    return formatted + badge;
  }
  return formatted;
};

var _NATIVE_RATES = {USD:1450,JPY:10.1,EUR:1630,GBP:1870,CNY:204,HKD:190,AUD:950,SGD:1110};
window.krwRefHtml = function(amount, currency, mult) {
  if (!amount || !currency || currency === 'KRW') return '';
  var rate = _NATIVE_RATES[currency];
  if (!rate) return '';
  var krw = Math.round(amount * (mult || 1) * rate);
  return '<span style="font-size:10px;color:var(--muted);margin-left:4px">(≈' + Math.round(krw/1000) + '천원)</span>';
};

/* ═══════════════════════════════════════════════════════════════════
   i18n 레이어 — aero-surcharge v34
   window.I18N  딕셔너리 (ko/en/ja/zh/fr/de)
   getCurrentLang / setCurrentLang / t(key) / applyLanguage()
   buildAirportOptions(selectEl, type)  — select 옵션 재구성
   initNav() 래핑 — 언어변경 시 applyLanguage 자동 호출
═══════════════════════════════════════════════════════════════════ */
(function(){

/* ─── 공항 데이터 ─── */
var AIRPORT_GROUPS = [
  { key:'index.region.korea',    codes:['ICN','GMP','PUS','CJU','CJJ','TAE'] },
  { key:'index.region.japan',    codes:['NRT','HND','KIX','FUK','CTS','OKA','NGO','KMJ','NGS','OIT','HIJ','KOJ','MYJ','HKD','FSZ','TAK','AKJ','KKJ','KMI','SDJ'] },
  { key:'index.region.china',    codes:['PVG','PEK','CAN','CTU','XIY','CGO','CKG','YNJ','DYG','SHA','TAO','WEH','YNT','NTG','HRB','KWL','SYX','SHE','DLC','TSN','HGH','NKG','SZX','XMN','CSX','CGQ','HAK'] },
  { key:'index.region.taiwan',   codes:['TPE','KHH','RMQ','TXG'] },
  { key:'index.region.seasia',   codes:['HKG','SIN','BKK','MNL','KUL','SGN','HAN','DAD','DPS','CGK','RGN','CNX','HKT','NHA','MFM','PNH','REP','VTE','ULN','GUM','SPN','PQC','DLI','BTH','HPH'] },
  { key:'index.region.seasia2',  codes:['CEB','TAG','CRK','DVO','ILO','MNL','BKI','KCH','PEN','KLO','CXR','PPS'] },
  { key:'index.region.swasia',   codes:['DEL','BOM','CMB','KTM','DAC','MLE','TBS','ALA','FRU','TSE','TAS','SVO','VVO'] },
  { key:'index.region.usa',     codes:['LAX','JFK','EWR','SFO','SEA','HNL','IAD','BOS','ORD','ATL','DFW','LAS','BIS'] },
  { key:'index.region.canada',  codes:['YVR','YYZ'] },
  { key:'index.region.australia', codes:['SYD','MEL','BNE'] },
  { key:'index.region.newzealand',codes:['AKL'] },
  { key:'index.region.oceania', codes:['ROR'] },
  { key:'index.region.europeMiddleEast', codes:['CDG','LHR','FRA','AMS','DXB','FCO','BCN','PRG','BUD','MXP','VIE','MAD','LIS','ZRH','ZAG','IST','CAI','DOH','AUH','RUH'] },
];
window.AIRPORT_GROUPS = AIRPORT_GROUPS;

/* ─── 번역 딕셔너리 ─── */
window.I18N = {

/* ══════ 한국어 ══════ */
ko:{
  /* nav */
  'nav.routes':'노선별 조회','nav.calc':'계산기','nav.airlines':'항공사 인덱스','nav.news':'참고 소식',
  /* footer */
  'footer.notice':'표시된 유류할증료는 항공사 공식 공지 기반 참고용 정보입니다. 최종 금액은 항공사 공식 사이트 또는 발권처에서 반드시 확인하세요.',
  'footer.about':'About','footer.privacy':'Privacy Policy','footer.terms':'Terms of Service',
  /* page meta */
  'index.title':'유류할증료 조회 — 한국 출발 국제선 항공사별 비교',
  'index.metaDesc':'한국 출발 국제선 항공사별 유류할증료를 노선·거리구간별로 비교합니다.',
  /* hero */
  'index.heroTitle':'노선별 유류할증료 조회',
  'index.heroSub':'공식 공시와 시장 지표를 확인하고 노선별로 비교하세요',
  /* form */
  'index.labelOrigin':'출발 공항','index.labelDest':'도착 공항','index.labelTrip':'여정',
  'index.trip.oneWay':'편도','index.trip.roundTrip':'왕복',
  'index.search':'🔍 예약 판단하기',
  'index.signal1':'📢 주요 항공사 6월 공식 공시 반영 완료',
  'index.signal2':'✈️ 노선별 현재 적용 금액 확인',
  'index.signal3':'⏱️ 예약 타이밍 판단',
  'index.airport.selectOrigin':'출발지 선택','index.airport.selectDest':'도착지 선택',
  'index.airport.searchOriginPlaceholder':'공항명 또는 코드 입력 (예: 인천, ICN)',
  'index.airport.searchDestPlaceholder':'공항명 또는 코드 입력 (예: 도쿄, HND)',
  'index.airport.searchOriginAria':'출발 공항 검색',
  'index.airport.searchDestAria':'도착 공항 검색',
  'index.airport.noSearchResults':'결과 없음',
  'common.clear':'지우기',
  /* regions */
  'index.region.korea':'🇰🇷 한국','index.region.japan':'🇯🇵 일본',
  'index.region.china':'🇨🇳 중국','index.region.taiwan':'🇹🇼 대만',
  'index.region.seasia':'🌏 동남아시아','index.region.seasia2':'🌏 동남아시아 (필리핀·말레이시아)',
  'index.region.swasia':'🌍 남아시아·중앙아시아',
  'index.region.usa':'🇺🇸 미국','index.region.canada':'🇨🇦 캐나다',
  'index.region.australia':'🇦🇺 호주','index.region.newzealand':'🇳🇿 뉴질랜드','index.region.oceania':'🇦🇺 오세아니아',
  'index.region.europeMiddleEast':'🇪🇺 유럽·중동',
  /* airport names */
  'airport.ICN':'인천','airport.GMP':'김포','airport.PUS':'부산','airport.CJU':'제주',
  'airport.CJJ':'청주','airport.TAE':'대구',
  'airport.NRT':'도쿄 나리타','airport.HND':'도쿄 하네다','airport.KIX':'오사카',
  'airport.FUK':'후쿠오카','airport.CTS':'삿포로','airport.OKA':'오키나와',
  'airport.NGO':'나고야','airport.KMJ':'구마모토','airport.NGS':'나가사키',
  'airport.OIT':'오이타','airport.HIJ':'히로시마','airport.KOJ':'가고시마',
  'airport.MYJ':'마쓰야마','airport.HKD':'하코다테','airport.FSZ':'시즈오카','airport.TAK':'다카마쓰',
  'airport.HKG':'홍콩','airport.SIN':'싱가포르','airport.BKK':'방콕','airport.MNL':'마닐라',
  'airport.KUL':'쿠알라룸푸르','airport.SGN':'호찌민','airport.HAN':'하노이',
  'airport.DAD':'다낭','airport.DPS':'발리','airport.CGK':'자카르타','airport.PVG':'상하이','airport.PEK':'베이징',
  'airport.CAN':'광저우','airport.CTU':'청두','airport.XIY':'시안','airport.CGO':'정저우',
  'airport.CKG':'충칭','airport.YNJ':'옌지','airport.DYG':'장자제','airport.SHA':'상하이 훙차오','airport.SYX':'싼야(하이난)',
  'airport.TAO':'칭다오','airport.WEH':'웨이하이','airport.YNT':'옌타이','airport.NTG':'난통',
  'airport.HRB':'하얼빈','airport.KWL':'구이린',
  'airport.SHE':'선양','airport.DLC':'다롄','airport.TSN':'톈진',
  'airport.HGH':'항저우','airport.NKG':'난징','airport.SZX':'선전',
  'airport.XMN':'샤먼','airport.CSX':'창사',
  'airport.TPE':'타이베이','airport.KHH':'가오슝','airport.RMQ':'타이중','airport.TXG':'타이중',
  'airport.RGN':'양곤','airport.CNX':'치앙마이','airport.HKT':'푸껫','airport.NHA':'나트랑',
  'airport.MFM':'마카오','airport.PNH':'프놈펜','airport.REP':'씨엠립','airport.VTE':'비엔티안',
  'airport.ULN':'울란바타르',
  'airport.GUM':'괌','airport.SPN':'사이판',
  'airport.PQC':'푸쿠옥','airport.DLI':'달랏','airport.BTH':'바탐',
  'airport.CEB':'세부','airport.TAG':'보홀','airport.CRK':'클락','airport.DVO':'다바오',
  'airport.ILO':'일로일로','airport.BKI':'코타키나발루','airport.KCH':'쿠칭','airport.PEN':'페낭',
  'airport.KLO':'보라카이(칼리보)','airport.CXR':'나트랑(깜라인)',
  'airport.DEL':'뉴델리','airport.BOM':'뭄바이','airport.CMB':'콜롬보','airport.KTM':'카트만두',
  'airport.DAC':'다카','airport.MLE':'말레','airport.TBS':'트빌리시',
  'airport.ALA':'알마티','airport.FRU':'비슈케크','airport.TSE':'아스타나','airport.TAS':'타슈켄트',
  'airport.SVO':'모스크바','airport.VVO':'블라디보스토크',
  'airport.LAX':'LA','airport.JFK':'뉴욕 JFK','airport.EWR':'뉴욕 뉴어크','airport.SFO':'샌프란시스코',
  'airport.SEA':'시애틀','airport.YVR':'밴쿠버','airport.YYZ':'토론토',
  'airport.HNL':'호놀룰루','airport.IAD':'워싱턴 D.C.',
  'airport.BOS':'보스턴','airport.ORD':'시카고','airport.ATL':'애틀랜타',
  'airport.DFW':'달라스','airport.LAS':'라스베이거스',
  'airport.SYD':'시드니','airport.MEL':'멜버른','airport.AKL':'오클랜드','airport.BNE':'브리즈번',
  'airport.CDG':'파리','airport.LHR':'런던','airport.FRA':'프랑크푸르트',
  'airport.AMS':'암스테르담','airport.DXB':'두바이',
  'airport.FCO':'로마','airport.BCN':'바르셀로나','airport.PRG':'프라하',
  'airport.BUD':'부다페스트','airport.MXP':'밀라노','airport.VIE':'비엔나',
  'airport.MAD':'마드리드','airport.LIS':'리스본','airport.ZRH':'취리히','airport.ZAG':'자그레브',
  'airport.IST':'이스탄불','airport.CAI':'카이로','airport.DOH':'도하',
  'airport.AUH':'아부다비','airport.RUH':'리야드',
  /* beta banner */
  'beta.title':'베타 서비스 안내',
  'beta.desc':'현재 한국 출발 국제선 유류할증료를 기준으로 제공되고 있으며, 일부 항공사는 공식 공지 기반 수동 반영입니다. 최종 금액은 항공사 공식 공지를 반드시 확인해주세요.',
  'beta.note':'※ 현재는 한국 출발 국제선만 지원합니다. 해외 출발 노선은 서비스 준비중입니다.',
  /* intro cards */
  'index.intro1.title':'한국 출발 국제선 유류할증료 비교',
  'index.intro1.body':'이 서비스는 인천(ICN), 김포(GMP), 부산(PUS), 청주(CJJ), 대구(TAE) 등 한국 출발 국제선의 항공사별 유류할증료를 노선·거리구간별로 비교합니다. 대한항공, 아시아나항공, 제주항공 등 8개 항공사의 공식 공지를 기반으로 한 데이터를 제공합니다.',
  'index.intro2.title':'항공사 공식 공지 기반 정보 제공',
  'index.intro2.body':'각 항공사가 매월 발표하는 공식 유류할증료 공지를 우선으로 반영합니다. 공식 공지가 확인된 항공사에는 \'공식 확인\' 표시가 함께 노출되며, 각 카드에서 항공사 공지 원문 링크를 바로 확인할 수 있습니다.',
  'index.intro3.title':'왜 이 서비스가 필요한가요?',
  'index.intro3.body':'유류할증료는 항공권 총 비용의 상당 부분을 차지하지만, 각 항공사 공지를 개별 확인해야 해 비교가 번거롭습니다. 이 서비스는 여러 항공사의 공식 공지를 한 화면에서 비교해 실제 비용 차이를 빠르게 파악할 수 있도록 돕습니다.',
  /* guide block */
  'index.guide.title':'💡 유류할증료란 무엇인가요?',
  'index.guide.p1':'유류할증료(Fuel Surcharge)는 항공유 가격 변동에 따라 항공사가 기본 운임 외에 별도로 부과하는 요금입니다. 국제유가가 오르면 할증료도 높아지고, 유가가 내리면 감소하거나 면제되기도 합니다.',
  'index.guide.p2':'금액은 항공사마다 다르며, 같은 항공사라도 비행 거리구간(단거리·중거리·장거리)에 따라 구간별로 다르게 적용됩니다. 매월 초 항공사가 다음 달 적용 금액을 공식 공지합니다.',
  'index.guide.p3':'아래 결과는 공식 공지 기준이며, 최종 결제 금액은 항공사 예약 화면 또는 공식 공지에서 반드시 재확인하시기 바랍니다.',
  'index.guide.p1Landing':'유류할증료(Fuel Surcharge)는 국제유가 변동에 연동해 항공사가 기본 운임과 별도로 부과하는 요금입니다. 비행 거리가 멀수록, 유가가 높을수록 금액이 높아지는 구조입니다.',
  'index.guide.p2Landing':'국내 항공사들은 국토교통부 기준에 따라 매월 다음 달 적용 금액을 공식 공지합니다. 출발지·도착지를 선택해 검색하면 항공사별 공식 공지 기준 금액을 노선별로 비교할 수 있습니다.',
  'index.decision.title':'📢 KE·OZ·LJ·BX·ZE·RS·TW·7C·YP 6월 공식 공시 반영 완료',
  'index.decision.line1':'✔ 주요 9개 국적사 6월 유류할증료 공시 반영 — 티웨이(TW)는 KRW, 제주항공(7C)·에어프레미아(YP)는 USD 기준',
  'index.decision.line2':'✔ 에어프레미아 6월 공시 추가 — 단거리 인천-나리타 USD 48, 장거리 뉴욕·워싱턴 D.C. USD296',
  'index.decision.line3':'✔ 7월 방향성: 브렌트유($109~112)·MOPS·환율(1,490~1,507) 복합 모니터링 필요',
  'index.decision.conclusion':'👉 9개 항공사 6월 공시 확인 완료 · 발권일 기준 적용 · 7월 방향성 별도 확인 권장',
  /* landing */
  'index.landingTitle':'한국 출발 국제선 유류할증료',
  'index.krOnly.title':'한국 출발 국제선만 지원합니다',
  'index.krOnly.desc':'노선별 조회에서 출발지·도착지를 선택하면 항공사별 공식 공지 기준 금액을 확인할 수 있습니다. 단일 금액은 구간마다 달라 오해 소지가 있어 표시하지 않습니다.',
  'index.indexLink':'→ 항공사 전체 인덱스 보기',
  /* status */
  'index.status.loading':'데이터 로딩 중...',
  'index.status.loadError':'데이터 로딩 실패 — 콘솔을 확인하세요',
  'index.status.scriptError':'스크립트 오류로 로딩 실패 — 콘솔을 확인하세요',
  'index.status.updated':'데이터 갱신: ','index.status.updatedSuffix':' · KE·OZ·LJ·BX·ZE·RS·TW·7C·YP 6월 공식 공시 반영 · 2026.05.26 KST 기준',
  /* filters */
  'index.filter.all':'전체','index.filter.hasOfficialData':'공식 데이터 있음',
  /* result */
  'index.result.label':'항공사별 유류할증료',
  'index.result.noResults':'조회 결과가 없습니다',
  'index.result.onlyKoreaDeparture':'현재는 한국 출발 국제선만 지원합니다',
  'index.result.overseasComingSoon':'해외 출발 노선은 서비스 준비중입니다.',
  'index.result.overseasMeta':'해외 출발 노선',
  /* alerts */
  'index.alert.selectAirports':'출발지와 도착지를 선택하세요',
  'index.alert.differentAirports':'출발지와 도착지를 다르게 선택하세요',
  /* meta suffix */
  'index.meta.oneWay':'편도','index.meta.roundTrip':'왕복',
  'index.meta.suffix':'한국 출발 국제선 · 2026년 6월 KE·OZ·LJ·BX·ZE·RS·TW·7C·YP 공식 공시 반영',
  /* card strings */
  'index.card.currentRoute':'현재 노선',
  'index.card.notPublished':'8월 공시 준비',
  'index.card.preAnnouncement':'공시전',
  'index.card.groupTier':'군별 요금',
  'index.card.usdNotice':'USD 공시',
  'index.card.notOperated':'미운항',
  'index.card.routeNotServed':'해당 노선 미취항',
  'index.card.viewOfficialNotice':'공식 공지 ↗',
  'index.card.noData':'공식 데이터를 불러올 수 없습니다. 공식 공지 버튼을 통해 직접 확인하세요.',
  'index.card.compare':'5월 vs 6월 공식 공시',
  'index.card.period':'2026.05',
  'index.card.periodMay':'2026.06 공식 공시',
  'index.card.diff':'증감',
  'index.card.periodNext':'다음달 공시',
  'index.card.fare':'유류할증료',
  'index.card.distanceBand':'거리구간',
  'index.card.mayTrend':'전월 대비',
  'index.card.groupTierShort':'군별',
  'index.card.notListed':'공지 미기재',
  'index.card.miniNotice':'공식 공지 ↗',
  /* news page */
  'news.pageTitle':'📊2026년 7월 유류할증료 전망 & 6월 공시 반영',
  /* CTA 박스 */
  'news.cta.desc':              '📍 노선별 실제 유류할증료를 바로 확인하세요',
  'news.cta.main':              '👉 유류할증료 조회하기',
  'news.cta.airlines':          '👉 항공사별 비교 보기',
  /* 제휴 카드 */
  'aff.cta':                    '최저가 확인 →',
  'aff.hotelscombined.title':   '항공권 예매 및 숙소 예약 한 번에 비교',
  'aff.hotelscombined.desc':    '항공권과 호텔 가격을 함께 비교하고 최적의 예약 타이밍 확인',
  'aff.agoda.title':            '항공권 일정에 맞춰 숙소까지 빠르게 예약',
  'aff.agoda.desc':             '여행 일정에 맞는 숙소를 빠르게 찾고 예약까지 한 번에 진행',
  'aff.usim.title':             '여행 유심 준비',
  'aff.usim.desc':              '출국 전 필수 준비',
  'aff.hotels.title':           '전 세계 숙소 간편 예약',
  'aff.hotels.desc':            '다양한 호텔과 숙소를 비교하고 바로 예약',
  'aff.myrealtrip.title':       '유류할증료 확인 후, 실제 항공권 총액도 비교하세요',
  'aff.myrealtrip.desc':        '유류할증료는 발권 시점 기준으로 적용됩니다. 5월과 6월 공식 공시 금액을 함께 보고 예약 타이밍을 판단하세요.',
  'aff.myrealtrip.cta':         '지금 항공권 총액 확인하기',
  'news.pageSub':'대한항공·아시아나·진에어·에어부산·이스타항공 6월 공식 공시 기준 · 5월 대비 변화 · 7월 방향성 참고 지표',
  'news.predictTitle':'📊 AI 예측 참고 지표 현황',
  'news.officialTitle':'📢 주요 항공사2026년 6월 국제선 유류할증료 공식 공시',
  'news.compareTitle':'📊 전월 대비: 5월 → 6월 변화 (공식 공시 기준)',
  'news.marketTitle':'🌍 시장 브리핑 (2026.05.24 10:30 KST 기준)',
  'news.brent':'🛢 국제유가: 미국-이란 협상 기대감은 리스크 프리미엄 완화 요인 · 호르무즈 리스크는 완전 해소 전',
  'news.fx':'💱 원달러 환율:2026.05.22 공개 데이터 기준 약 1,504~1,512원 범위 · 2026.05.24 10:30 KST 실시간 환율 확인 필요',
  'news.mops':'✈️ 항공유/MOPS: 511.21 → 410.02 cents/gal 하락',
  'news.mops.extra':'→ MOPS 하락은 7월 유류할증료 추가 인하 가능성을 높이는 핵심 변수',
  'news.geo':'⚠ 지정학: 미국-이란 협상 기대감은 있으나 호르무즈 해협 리스크는 완전 해소 전',
  'news.marketSummary':'→ 6월 확정 공시와 7월 시장 전망을 분리해 확인하세요. MOPS 하락은 추가 인하 요인이지만 USD/KRW 1,500원대와 호르무즈 리스크가 인하 폭을 제한할 수 있습니다.',
  'news.fxDominance':'🌍 7월 방향성 참고 지표: MOPS + 환율 + 국제유가 + 호르무즈 리스크',
  'news.decisionTitle':'📌 현재 판단 기준',
  'news.decisionLine1':'→ MOPS 511.21 → 410.02 cents/gal 하락으로 7월 추가 인하 가능성 존재',
  'news.decisionLine2':'→ 다만 환율 1,500원대와 호르무즈 리스크로 인하 폭은 제한될 수 있음',
  'news.decisionShort':'👉 단거리: 6월 대한항공 기준 61,500원 (5월 75,000원)',
  'news.decisionMid':'👉 중거리: 6월 대한항공 기준 117,000~205,500원 구간',
  'news.decisionLong':'👉 장거리: 항공사별 6월 공식 공시 기준 — KE·OZ·LJ·BX·ZE 반영 완료 (대한항공282,000~451,500원)',
  /* 7월 전망 CTA 박스 */
  'news.forecastCta.title':'2026년 7월 유류할증료 전망 — 6월 공시 반영 기준',
  'news.forecastCta.desc':'6월 공시 확정 데이터와 7월 시장 기반 전망을 분리해 정리했습니다. 브렌트유·환율·MOPS 확인 필요 지표를 바탕으로 7월 방향성을 확인하세요.',
  'news.forecastCta.btn':'7월 전망 자세히 보기 →',
  /* 7월 공시 안내 */
  'news.basisTitle':'📅 7월 유류할증료 공시 안내',
  'news.basisBody':'7월 공시는 6월 중 각 항공사 공식 채널에서 확인 필요합니다. 6월 공식 공시 반영 결과가 7월 방향성의 중요한 참고 지표입니다.',
  'news.aiNotice':'AI 요약 콘텐츠 — 이 페이지의 내용은 공개된 정보를 바탕으로 AI가 정리한 참고용 자료입니다. 원문 기반 요약이며, 공식 정보가 아닙니다. 중요한 결정 전에 각 항공사 및 기관의 공식 채널을 반드시 확인하세요.',
  'news.filterAll':'전체',
  'news.dataRef':        '✅ 6월 확정 공시와 7월 시장 전망 분리 · 2026.05.24 10:30 KST 기준',
  'news.curSummaryTitle':'현재 기준 요약 (2026.05.24 10:30 KST):',
  'news.curSummary':     '→ 6월 확정 공시는 공식 공시 확인 항공사만 표시 · 7월은 시장 지표 기반 전망',
  /* 핵심 요약 카드 i18n */
  'news.summary.title':   '📌2026년 7월 유류할증료 전망 — MOPS 하락과 환율 변수',
  'news.summary.updated': '🕐2026.05.24 10:30 KST 기준 시장 지표 반영',
  'news.summary.li1':     '6월 국제선 유류할증료 인하 흐름 확정 — 대한항공 564,000원 → 451,500원',
  'news.summary.li2':     '항공유(MOPS) 511.21 → 410.02 cents/gal 하락',
  'news.summary.li3':     'USD/KRW는2026.05.22 공개 데이터 기준 약 1,504~1,512원 범위 확인',
  'news.summary.li4':     '미국-이란 협상 기대감은 유가 리스크 프리미엄 완화 요인이나 호르무즈 리스크는 완전 해소 전',
  'news.summary.li5':     '6월 공시는 확인된 항공사 공식 공시만 확정 데이터로 표시',
  'news.summary.li6':     '7월은 추가 인하 가능성이 존재하지만 환율과 지정학 변수로 인하 폭 제한 가능',
  'news.surchargeNote':  '※ 유류할증료는 발권일 기준 적용됩니다. 6월 확정 공시와 7월 시장 전망을 혼동하지 말고, 최종 발권 전 항공사 공식 공지를 확인하세요.',
  'news.sectionPrev':    '📚 이전 뉴스 / 이전 분석 기록',
  'news.sectionPrevSub': '※ 아래 내용은 각 작성 시점 기준의 시장 분석 기록입니다.',
  'news.newBadge':       'NEW',

  'news.filterInstitution':'기관',
  'news.filterMarket':'시장',
  'news.disclaimer':'※ 유류할증료는 예약 시점 기준으로 적용됩니다. 변동 전에 예약 여부를 반드시 확인하세요.',
  'news.cat.airline':'항공사','news.cat.institution':'기관','news.cat.market':'시장','news.cat.general':'일반',
  'news.impact.prefix':'→ 유류할증료 영향: ',
  /* predict box */
  'news.predict.subtitle':'데이터 기반 추정',
  'news.predict.footnote':'* KE·OZ·LJ·BX·ZE 6월 공식 공시 완료(인하). 현재 시장 지표는 7월 유류할증료 방향성 참고용입니다.',
  'news.predict.brentLabel':'Brent 유가',
  'news.predict.mopsLabel':'싱가포르 항공유 (MOPS)',
  'news.predict.mopsValue':'고점 대비 일부 조정 후 재상승 시도, 고가 유지',
  'news.predict.fxLabel':'원달러 환율',
  'news.predict.fxUnit':'원',
  'news.predict.fxArrow':'→',
  'news.predict.brentUnit':'/ 배럴',
  'news.predict.geoLabel':'지정학 리스크',
  'news.predict.geoValue':'중동 리스크와 공급 불안 지속',
  'news.predict.outlookLabel':'surcharge 전망',
  'news.predict.outlook.flat':'동결 또는 제한적 상승 가능성 우세',
  'news.predict.outlook.up':'상승 가능성 높음',
  'news.predict.outlook.down':'하락 가능성 높음',
  /* month names for period label */
  'month.1':'1월','month.2':'2월','month.3':'3월','month.4':'4월',
  'month.5':'5월','month.6':'6월','month.7':'7월','month.8':'8월',
  'month.9':'9월','month.10':'10월','month.11':'11월','month.12':'12월',
  /* common */
  'common.noData':'데이터 없음',
  'common.status':'상태',
  'common.loading':'소식 데이터 로딩 중...',
  'common.aiSummaryBadge':'AI 요약',
  'common.emptyAll':'현재 표시할 주요 소식이 없습니다',
  'common.emptyAllSub':'수집 데이터 준비 중입니다',
  'common.emptyFilter':'해당 분류의 소식이 없습니다',
  /* official summary box */
  'news.official.ke':'대한항공 — 5월 대비 전 구간 인하 (6월 공식 공시 완료)',
  'news.official.oz':'아시아나항공 — 5월 대비 전 구간 인하 (6월 공식 공시 완료)',
  'news.official.lj':'진에어 — 5월 대비 전 구간 인하 (USD 42→36, USD 140→115)',
  'news.official.7c':'제주항공 — 6월 공식 공시 완료 ✅ (5월→6월: 최대 USD 126→104, 전 구간 인하)',
  'news.official.bx':'에어부산 — 5월 대비 전 구간 인하 (USD 52→43, USD 126→106)',
  'news.official.ze':'이스타항공 — 5월 대비 전 구간 인하 (USD 52→43, USD 126→103)',
  'news.official.rs':'에어서울 — 5월 대비 전 구간 인하 (KRW 94,500→75,300 / KRW 165,000→132,800)',
  'news.official.tw':'티웨이항공 — <span style="color:#1b5e20;font-weight:700;">6월 공식 공시 완료 ✅</span> · KRW 공시 · 1군 47,400원~7군 327,000원',
  'news.official.yp':'에어프레미아 — 6월 USD 공시 반영 · 단거리 예시 인천-나리타 USD 59→48 / 장거리 예시 인천-뉴욕·워싱턴 D.C. USD 365→296',
  'news.official.desc':'* KE·OZ·LJ·BX·ZE·RS·TW·7C·YP 6월 공식 공시 완료 · 5월 대비 전 구간 인하 · 티웨이(TW) KRW 공시, 에어프레미아(YP) USD 공시 포함 · 최종 금액은 발권일 기준 공식 공지 반드시 확인',
  /* compare box */
  'news.compare.li1':'대한항공: 전 구간 인하 (단거리 75,000원→61,500원, 장거리 564,000원→451,500원)',
  'news.compare.li2':'아시아나: 전 구간 인하 (단거리 85,400원→68,000원, 장거리 476,200원→382,800원)',
  'news.compare.li3':'진에어: 전 구간 인하 (USD 42→36, USD 140→115)',
  'news.compare.li4':'에어부산: 전 구간 인하 (USD 52→43, USD 126→106)',
  'news.compare.li5':'이스타항공: 전 구간 인하 (USD 52→43, USD 126→103)',
  'news.compare.li6':'에어서울: 전 구간 인하 (KRW 94,500→75,300 / KRW 165,000→132,800)',
  'news.compare.li7':'제주항공: 6월 공식 공시 완료 ✅ — 전 구간 인하 (USD 52→42, USD 126→104)',
  'news.compare.li8':'티웨이항공: 5월 대비 6월 전 구간 인하 — 1군 58,600원→47,400원 / 7군 406,900원→327,000원 (KRW 공시)',
  'news.compare.li9':'공통: KE·OZ·LJ·BX·ZE·RS·TW·7C·YP 6월 공식 공시 반영 완료 — 5월 대비 인하 흐름 확인',
  /* fixed news cards */
  'news.fixed.20260523a.title':'2026.05.2322:00 KST | 유가·환율 고점 유지, 7월 유류할증료 급락 가능성은 제한적',
  'news.fixed.20260523a.summary':'6월 유류할증료는 확인된 항공사 공식 공시만 확정 데이터로 보고, 7월은 시장 지표 기반 전망으로 분리해야 합니다. 브렌트유는 최근 고점권에서 등락 중이며, MOPS는 최신 공개 수치 확인이 필요합니다. USD/KRW는2026.05.22 공개 데이터 기준 약 1,504~1,512원 범위가 확인되어 하락 제한 요인입니다. 현재 유가와 환율 흐름을 고려하면 7월 유류할증료는 급격한 인하보다는 현 수준 유지 또는 일부 구간의 제한적 조정 가능성이 더 높습니다.',
  'news.fixed.20260523a.impact':'7월 급락 가능성 제한적 · 6월 확정 공시와 7월 전망 분리',
  'news.fixed.20260523a.source':'시장 데이터 기반 분석 (2026.05.2322:00 KST)',
  'news.fixed.20260523a.tag1':'7월 유류할증료 전망',
  'news.fixed.20260523a.tag2':'유가 고점권',
  'news.fixed.20260523a.tag3':'USD/KRW 1,500원대',
  'news.fixed.20260523a.tag4':'MOPS 확인 필요',
  'news.fixed.20260523a.tag5':'성수기 예약 가이드',
  'news.fixed.20260420.title':'유가 하락 지속, 6월 유류할증료 변동성 확대 — 공식 공시 확인 필요',
  'news.fixed.20260420.summary':'브렌트유가 80달러 초반까지 하락한 이후 추가 하락 흐름을 유지하고 있다. 환율은 여전히 높은 수준이지만 소폭 안정세를 보이며, 6월 유류할증료는 하락 또는 유지 가능성이 커지고 있다.',
  'news.fixed.20260420.impact':'하락 압력 강화',
  'news.fixed.20260417.title':'진에어·제주항공, 5월 국제선 유류할증료 인상',
  'news.fixed.20260417.summary':'대한항공·아시아나에 이어 진에어와 제주항공도 전 구간 인상. 일부 구간은 4월 대비 두 배 수준 상승.',
  'news.fixed.20260417.impact':'상승 반영 완료 (고점 형성)',
  'news.fixed.20260416.title':'5월 국제선 유류할증료 역대 최고 수준',
  'news.fixed.20260416.summary':'거리비례제 도입 이후 최고 단계 적용, 대부분 항공사 전 구간 인상.',
  'news.fixed.20260416.impact':'상승 사이클 정점',
  'news.fixed.20260415.title':'중동 긴장으로 국제유가 급등',
  'news.fixed.20260415.summary':'브렌트유 90달러 이상 상승, 항공 연료비 부담 증가.',
  'news.fixed.20260415.impact':'상승 압력',
  'news.fixed.20260418a.title':'호르무즈 해협 완화 소식에 유가 급락',
  'news.fixed.20260418a.summary':'중동 리스크 완화 기대감으로 브렌트유 급락, 80달러 초반대로 하락.',
  'news.fixed.20260418a.impact':'하락 압력 발생 (6월 영향 가능)',
  'news.fixed.20260418b.title':'원달러 환율 1,470원대 유지',
  'news.fixed.20260418b.summary':'환율이 높은 수준 유지되며 항공사 비용 부담 지속.',
  'news.fixed.20260418b.impact':'하락 제한 요인',
  'news.fixed.20260507a.title':'국제유가 일부 조정… 6월 유류할증료 변동성 확대, 공식 공시 주시 필요',
  'news.fixed.20260507a.summary':'브렌트유와 항공유 가격이 최고점 대비 일부 하락했으나, 환율·중동 리스크 등 변수가 남아있어 6월 유류할증료 방향은 공식 공시 확인이 필요하다.',
  'news.fixed.20260507a.impact':'하락 압력 강화',
  'news.fixed.20260507b.title':'항공사 비용 부담 지속… 환율·유가 변수 경계',
  'news.fixed.20260507b.summary':'환율은 다소 안정됐지만 여전히 높은 수준이며, 항공사들은 연료비 부담과 중동 변수에 대한 경계를 유지하고 있다.',
  'news.fixed.20260507b.impact':'변동성 유지',
  'news.fixed.src.marketUpdate':'Market Update',
  'news.fixed.src.airlineIndustry':'Airline Industry',
  'news.fixed.src.airlineNotice':'항공사 공지',
  'news.fixed.src.marketSummary':'시장 종합',
  'news.fixed.src.marketSummaryEn':'Market Summary',
  'news.fixed.src.marketBreaking':'Market Breaking',
  'news.fixed.src.fxMarket':'FX Market',
  /* page meta */
  'news.metaTitle':'2026년 7월 유류할증료 전망 — 6월 공식 공시 반영 및 5월 대비 변화',
  'news.metaDesc':'대한항공·아시아나·진에어·에어부산·이스타항공2026년 6월 국제선 유류할증료 공식 공시가 반영되었습니다. 5월 대비 변화와2026년 7월 유류할증료 전망 참고 지표를 확인하세요.',
  /* footer */
  'news.footer.notice':'이 페이지의 소식은 공개 정보 기반 참고용 자료입니다. 중요한 결정 전 공식 채널을 확인하세요.',
  'news.footer.contact':'문의',
  /* klook affiliate */
  'klook.title':'✈️ 여행 비용, 항공권만이 아닙니다',
  'klook.desc':'유류할증료 부담이 크다면, 현지 투어·액티비티 비용도 미리 파악해두는 것이 전체 여행 예산 관리에 도움이 됩니다.',
  'klook.btn':'여행 비용 줄이는 방법 보기 →',
  'klook.inline':'항공권 가격이 부담된다면 여행 비용을 낮출 수 있는 방법도 확인해보세요',
  'klook.inlineLink':'여행 비용 줄이는 방법 보기',
  /* 빠른 조회 SEO 섹션 */
  'index.quick.title':'🔗 유류할증료 빠른 조회',
  'index.quick.korea.name':'한국 출발 유류할증료',
  'index.quick.korea.desc':'국적기 전체 비교',
  'index.quick.compare.name':'2026년 5월 → 6월 유류할증료 비교',
  'index.quick.compare.desc':'항공사별 5월 적용 금액과 6월 공식 공시 금액 비교',
  'index.quick.graph.name':'유류할증료 변동 그래프',
  'index.quick.graph.desc':'월별 인상·인하 추이',
  'index.quick.calc.name':'유류할증료 계산 방법',
  'index.quick.calc.desc':'산정 기준 및 확인 방법',
  'index.quick.ke.name':'대한항공 유류할증료',
  'index.quick.ke.desc':'KE 월별 공시 상세',
  'index.quick.oz.name':'아시아나항공 유류할증료',
  'index.quick.oz.desc':'OZ 월별 공시 상세',
  'index.quick.7c.name':'제주항공 유류할증료',
  'index.quick.7c.desc':'7C 월별 공시 상세',
  'index.quick.lj.name':'진에어 유류할증료',
  'index.quick.lj.desc':'LJ 월별 공시 상세',
  'index.quick.tw.name':'티웨이항공 유류할증료',
  'index.quick.tw.desc':'TW 월별 공시 상세',
},

/* ══════ English ══════ */
en:{
  'nav.routes':'Route Search','nav.calc':'Calculator','nav.airlines':'Airline Index','nav.news':'Market News',
  'footer.notice':'Fuel surcharge data is provided for reference only. Always confirm the final amount with the airline or ticketing agent.',
  'footer.about':'About','footer.privacy':'Privacy Policy','footer.terms':'Terms of Service',
  'index.title':'Fuel Surcharge Search — Korea Departure International Flights',
  'index.metaDesc':'Compare fuel surcharges by airline for international flights departing Korea.',
  'index.heroTitle':'Fuel Surcharge by Route',
  'index.heroSub':'Check official filings and market indicators — compare by route.',
  'index.labelOrigin':'Departure Airport','index.labelDest':'Arrival Airport','index.labelTrip':'Trip Type',
  'index.trip.oneWay':'One-way','index.trip.roundTrip':'Round-trip',
  'index.search':'🔍 Check Booking Timing',
  'index.signal1':'📢 Korean Air Jun official filing reflected',
  'index.signal2':'✈️ Current surcharge by route',
  'index.signal3':'⏱️ Decide booking timing',
  'index.airport.selectOrigin':'Select origin','index.airport.selectDest':'Select destination',
  'index.airport.searchOriginPlaceholder':'Enter airport name or code (e.g. Seoul, ICN)',
  'index.airport.searchDestPlaceholder':'Enter airport name or code (e.g. Tokyo, HND)',
  'index.airport.searchOriginAria':'Search departure airport',
  'index.airport.searchDestAria':'Search arrival airport',
  'index.airport.noSearchResults':'No results',
  'common.clear':'Clear',
  'index.region.china':'🇨🇳 China','index.region.taiwan':'🇹🇼 Taiwan',
  'index.region.seasia':'🌏 Southeast Asia','index.region.seasia2':'🌏 SE Asia (Philippines/Malaysia)',
  'index.region.swasia':'🌍 South/Central Asia','index.region.usa':'🇺🇸 United States','index.region.canada':'🇨🇦 Canada',
  'index.region.australia':'🇦🇺 Australia','index.region.newzealand':'🇳🇿 New Zealand','index.region.oceania':'🇦🇺 Oceania',
  'index.region.europeMiddleEast':'🇪🇺 Europe & Middle East',
  'airport.ICN':'Seoul Incheon','airport.GMP':'Seoul Gimpo','airport.PUS':'Busan','airport.CJU':'Jeju',
  'airport.CJJ':'Cheongju','airport.TAE':'Daegu',
  'airport.NRT':'Tokyo Narita','airport.HND':'Tokyo Haneda','airport.KIX':'Osaka',
  'airport.FUK':'Fukuoka','airport.CTS':'Sapporo','airport.OKA':'Okinawa',
  'airport.NGO':'Nagoya','airport.KMJ':'Kumamoto','airport.NGS':'Nagasaki',
  'airport.OIT':'Oita','airport.HIJ':'Hiroshima','airport.KOJ':'Kagoshima',
  'airport.MYJ':'Matsuyama','airport.HKD':'Hakodate','airport.FSZ':'Shizuoka','airport.TAK':'Takamatsu',
  'airport.HKG':'Hong Kong','airport.SIN':'Singapore','airport.BKK':'Bangkok','airport.MNL':'Manila',
  'airport.KUL':'Kuala Lumpur','airport.SGN':'Ho Chi Minh City','airport.HAN':'Hanoi',
  'airport.DAD':'Da Nang','airport.DPS':'Bali','airport.CGK':'Jakarta','airport.PVG':'Shanghai Pudong','airport.PEK':'Beijing',
  'airport.CAN':'Guangzhou','airport.CTU':'Chengdu','airport.XIY':'Xian','airport.CGO':'Zhengzhou',
  'airport.CKG':'Chongqing','airport.YNJ':'Yanji','airport.DYG':'Zhangjiajie','airport.SHA':'Shanghai Hongqiao','airport.SYX':'Sanya (Hainan)',
  'airport.TAO':'Qingdao','airport.WEH':'Weihai','airport.YNT':'Yantai','airport.NTG':'Nantong',
  'airport.HRB':'Harbin','airport.KWL':'Guilin',
  'airport.SHE':'Shenyang','airport.DLC':'Dalian','airport.TSN':'Tianjin',
  'airport.HGH':'Hangzhou','airport.NKG':'Nanjing','airport.SZX':'Shenzhen',
  'airport.XMN':'Xiamen','airport.CSX':'Changsha','airport.KHH':'Kaohsiung','airport.RMQ':'Taichung','airport.TXG':'Taichung',
  'airport.RGN':'Yangon','airport.CNX':'Chiang Mai','airport.HKT':'Phuket','airport.NHA':'Nha Trang',
  'airport.MFM':'Macau','airport.PNH':'Phnom Penh','airport.REP':'Siem Reap','airport.VTE':'Vientiane',
  'airport.ULN':'Ulaanbaatar',
  'airport.GUM':'Guam','airport.SPN':'Saipan',
  'airport.PQC':'Phu Quoc','airport.DLI':'Da Lat','airport.BTH':'Batam',
  'airport.CEB':'Cebu','airport.TAG':'Bohol','airport.CRK':'Clark','airport.BKI':'Kota Kinabalu',
  'airport.KLO':'Boracay (Kalibo)','airport.CXR':'Nha Trang (Cam Ranh)',
  'airport.ALA':'Almaty','airport.FRU':'Bishkek','airport.TSE':'Astana','airport.TAS':'Tashkent',
  'airport.SVO':'Moscow','airport.VVO':'Vladivostok',
  'airport.LAX':'Los Angeles','airport.JFK':'New York JFK','airport.EWR':'Newark / New York','airport.SFO':'San Francisco',
  'airport.SEA':'Seattle','airport.YVR':'Vancouver','airport.YYZ':'Toronto',
  'airport.HNL':'Honolulu','airport.IAD':'Washington D.C.',
  'airport.BOS':'Boston','airport.ORD':'Chicago','airport.ATL':'Atlanta',
  'airport.DFW':'Dallas','airport.LAS':'Las Vegas',
  'airport.SYD':'Sydney','airport.MEL':'Melbourne','airport.AKL':'Auckland','airport.BNE':'Brisbane',
  'airport.CDG':'Paris','airport.LHR':'London','airport.FRA':'Frankfurt',
  'airport.AMS':'Amsterdam','airport.DXB':'Dubai',
  'airport.FCO':'Rome','airport.BCN':'Barcelona','airport.PRG':'Prague',
  'airport.BUD':'Budapest','airport.MXP':'Milan','airport.VIE':'Vienna',
  'airport.MAD':'Madrid','airport.LIS':'Lisbon','airport.ZRH':'Zurich','airport.ZAG':'Zagreb',
  'airport.IST':'Istanbul','airport.CAI':'Cairo','airport.DOH':'Doha',
  'beta.title':'Beta Service Notice',
  'beta.desc':'Currently covering fuel surcharges for international flights departing Korea. Some airlines reflect manually updated official notices. Always confirm the final amount with the airline.',
  'beta.note':'※ Only Korea departure routes are currently supported. Overseas departure routes are coming soon.',
  'index.intro1.title':'Fuel Surcharge Comparison for Korea Departures',
  'index.intro1.body':'This service compares fuel surcharges by airline and distance band for international flights from Korean airports (ICN, GMP, PUS). Data is based on official notices from Korean Air, Asiana, Jeju Air, and more.',
  'index.intro2.title':'Official Airline Notice Based Data',
  'index.intro2.body':'Monthly official fuel surcharge notices from each airline are prioritized. Airlines with verified notices are labeled "Official Verified," and a direct link to the notice is shown on each card.',
  'index.intro3.title':'Why This Service?',
  'index.intro3.body':'Fuel surcharges are a significant part of airfare, but comparing each airline\'s notice individually is cumbersome. This service aggregates official notices on one screen.',
  'index.guide.title':'💡 What is a Fuel Surcharge?',
  'index.guide.p1':'A fuel surcharge is an additional fee charged by airlines on top of the base fare, tied to aviation fuel price fluctuations. When oil prices rise, surcharges increase; when they fall, surcharges decrease or may be waived.',
  'index.guide.p2':'Amounts vary by airline and distance band (short/medium/long haul). Airlines publish the following month\'s amounts in official notices at the beginning of each month.',
  'index.guide.p3':'Results shown are based on official notices. Always reconfirm the final amount via the airline\'s reservation system or official notice.',
  'index.guide.p1Landing':'A fuel surcharge is linked to international oil prices and is charged separately from the base fare. The further the distance and the higher the oil price, the greater the surcharge.',
  'index.guide.p2Landing':'Korean airlines publish next-month amounts in official notices each month. Select origin and destination to compare official notice amounts by airline.',
  'index.decision.title':'📢 KE/OZ/LJ/BX/ZE/RS/TW/7C/YP June official filings reflected',
  'index.decision.line1':'✔ Nine Korean carriers reflected — T\u0027way in KRW, Jeju Air and Air Premia in USD',
  'index.decision.line2':'✔ Air Premia added — short-haul ICN-NRT USD 48, long-haul New York/Washington D.C. USD296',
  'index.decision.line3':'✔ July direction: monitor Brent ($109–112), MOPS & FX (1,490–1,507) complex pressures',
  'index.decision.conclusion':'👉 9-airline June filings confirmed · Booking-date basis applies · Verify July direction separately',
  'index.landingTitle':'Fuel Surcharges — Korea Departures',
  'index.krOnly.title':'Korea Departures Only',
  'index.krOnly.desc':'Select origin and destination in Route Search to compare official surcharge amounts by airline. Per-segment amounts vary, so a single figure is not shown.',
  'index.indexLink':'→ View Full Airline Index',
  'index.status.loading':'Loading data...','index.status.loadError':'Failed to load data — check console',
  'index.status.scriptError':'Script error — check console',
  'index.status.updated':'Data updated: ','index.status.updatedSuffix':' · KE/OZ/LJ/BX/ZE/RS/7C Jun2026 official filing reflected',
  'index.filter.all':'All','index.filter.hasOfficialData':'Has Official Data',
  'index.result.label':'Fuel Surcharge by Airline',
  'index.result.noResults':'No results found',
  'index.result.onlyKoreaDeparture':'Only Korea departure routes are currently supported',
  'index.result.overseasComingSoon':'Overseas departure routes are coming soon.',
  'index.result.overseasMeta':'Overseas departure route',
  'index.alert.selectAirports':'Please select origin and destination',
  'index.alert.differentAirports':'Origin and destination must be different',
  'index.meta.oneWay':'One-way','index.meta.roundTrip':'Round-trip',
  'index.meta.suffix':'Korea Departure · Korean Air Jun2026 Official Filing Reflected',
  'index.card.currentRoute':'This Route',
  'index.card.notPublished':'August filing preparation','index.card.preAnnouncement':'Pending August filing',
  'index.card.groupTier':'Group Tier','index.card.usdNotice':'USD Quoted',
  'index.card.notOperated':'Not Operated','index.card.routeNotServed':'This airline does not serve this route',
  'index.card.viewOfficialNotice':'Official Notice ↗',
  'index.card.noData':'Official data unavailable. Please check via the official notice button.',
  'index.card.compare':'May vs June Official Filing',
  'index.card.period':'2026.05','index.card.periodMay':'2026.06 Official Filing',
  'index.card.diff':'Change',
  'index.card.periodNext':'Next Month Filing',
  'index.card.fare':'Surcharge','index.card.distanceBand':'Distance Band',
  'index.card.mayTrend':'vs. Prev. Month',
  'index.card.groupTierShort':'Group',
  'index.card.notListed':'Not listed','index.card.miniNotice':'Official Notice ↗',
  /* news page */
  'news.pageTitle':'Market Insights',
  /* CTA box */
  'news.cta.desc':              '📍 Check fuel surcharges by route',
  'news.cta.main':              '👉 Search Fuel Surcharges',
  'news.cta.airlines':          '👉 Compare by Airline',
  /* Affiliate cards */
  'aff.cta':                    'Check price →',
  'aff.hotelscombined.title':   'Compare flights & hotels in one place',
  'aff.hotelscombined.desc':    'Compare airfare and hotel prices together to find the best booking timing',
  'aff.agoda.title':            'Book accommodation to match your flight',
  'aff.agoda.desc':             'Find the right place to stay and book in one go',
  'aff.usim.title':             'Travel SIM',
  'aff.usim.desc':              'Essential before departure',
  'aff.hotels.title':           'Hotels worldwide — easy booking',
  'aff.hotels.desc':            'Compare and book hotels and accommodation worldwide',
  'aff.myrealtrip.title':       'After checking surcharges, compare total ticket prices too',
  'aff.myrealtrip.desc':        'Surcharges apply at the time of ticketing. Compare May and June official filing amounts before deciding when to book.',
  'aff.myrealtrip.cta':         'Check total ticket price now',
  'news.pageSub':'Fuel surcharge market, policy & airline updates · AI-powered summaries · Forecast basis',
  'news.predictTitle':'📊 AI Forecast Indicators',
  'news.officialTitle':'📢 May 28026 Confirmed Surcharge Summary (Reference for June Outlook)',
  'news.compareTitle':'📊 May vs June Changes (Official Filings)',
  'news.marketTitle':'🌍 Market Brief (as of2026.05.2322:00 KST)',
  'news.brent':'⛽ Brent crude: fluctuating near recent highs — sharp surcharge cuts look limited',
  'news.fx':'💱 USD/KRW: public May 282 data shows roughly 1,504–1,512 KRW — check real-time FX before purchase',
  'news.mops':'✈️ Jet Fuel/MOPS: latest public figure needs verification — monitor rebound risk after short-term correction',
  'news.geo':'🌍 Geopolitics: Hormuz uncertainty is not fully resolved — risk premium partly remains',
  'news.marketSummary':'→ Separate June confirmed filings from July market outlook. Brent near highs, USD/KRW around the 1,500 zone, and MOPS verification needs suggest limited odds of a sharp July cut.',
  'news.fxDominance':'🌍 July direction reference: monitor oil + FX + MOPS verification',
  'news.decisionTitle':'📌 Current Decision Guide',
  'news.decisionLine1':'→ Current oil and FX conditions favor a hold or limited adjustment over a sharp July cut',
  'news.decisionLine2':'→ MOPS needs latest public figure verification; avoid unverified numeric assumptions',
  'news.decisionShort':'👉 Short-haul: June Korean Air KRW 61,500 (May 75,000)',
  'news.decisionMid':'👉 Mid-haul: June Korean Air KRW 117,000–205,500 range',
  'news.decisionLong':'👉 Long-haul: June filings complete for KE/OZ/LJ/BX/ZE — Korean Air KRW282,000–451,500',
  /* 7월 전망 CTA 박스 */
  'news.forecastCta.title':'July 2026 Fuel Surcharge Outlook',
  'news.forecastCta.desc':'Based on KE/OZ/LJ/BX/ZE June official filing results, Brent crude, USD/KRW, jet fuel/MOPS and geopolitical risk, this page summarizes July surcharge direction.',
  'news.forecastCta.btn':'View July Outlook →',
  /* 6월 기준 안내 */
  'news.basisTitle':'📅 June Surcharge Filing Notice',
  'news.basisBody':'June filings will be published by each airline via their official channels during May.',
  'news.aiNotice':'AI Summary — Content on this page is AI-organized reference information based on public data. Not official. Always confirm with airline official channels before important decisions.',
  'news.filterAll':'All',
  'news.dataRef':        '✅ June confirmed filings separated from July market outlook · As of 2026.05.2322:00 KST',
  'news.curSummaryTitle':'Current Market Summary (2026.05.2322:00 KST):',
  'news.curSummary':     '→ Show June data only when official filings are confirmed; July remains a market-based outlook.',
  /* summary card i18n */
  'news.summary.title':   '📌 July 2026 Surcharge Direction — June filings and market outlook separated',
  'news.summary.updated': '🕐 Market indicators as of2026.05.2322:00 KST',
  'news.summary.li1':     'Brent is fluctuating near recent highs — sharp surcharge cuts look limited',
  'news.summary.li2':     'Jet fuel/MOPS needs latest public figure verification',
  'news.summary.li3':     'USD/KRW public May 282 data shows roughly 1,504–1,512 KRW',
  'news.summary.li4':     'Hormuz uncertainty is not fully resolved; risk premium partly remains',
  'news.summary.li5':     'June values should be shown only for airlines with confirmed official filings',
  'news.summary.li6':     'July outlook favors current-level hold or limited adjustments over a sharp cut',
  'news.surchargeNote':  '※ Surcharges apply at ticketing date. Do not mix June confirmed filings with July market outlook; confirm final amount via official airline notices.',
  'news.sectionPrev':    '📚 Previous News / Past Analysis',
  'news.sectionPrevSub': '※ The content below is market analysis recorded at each publication date.',
  'news.newBadge':       'NEW',

  'news.filterInstitution':'Institutional',
  'news.filterMarket':'Market',
  'news.disclaimer':'※ Fuel surcharges apply based on booking date. Confirm before prices change.',
  'news.cat.airline':'Airline','news.cat.institution':'Institutional','news.cat.market':'Market','news.cat.general':'General',
  'news.impact.prefix':'→ Surcharge impact: ',
  /* predict box */
  'news.predict.subtitle':'Data-based estimate',
  'news.predict.footnote':'* June surcharge uses confirmed official filings where available. July outlook is market-data reference only.',
  'news.predict.brentLabel':'Brent Crude',
  'news.predict.mopsLabel':'Singapore Jet Fuel (MOPS)',
  'news.predict.mopsValue':'Rebounding after partial pullback, still elevated',
  'news.predict.fxLabel':'USD/KRW Rate',
  'news.predict.fxUnit':'',
  'news.predict.fxArrow':'→',
  'news.predict.brentUnit':'/ bbl',
  'news.predict.geoLabel':'Geopolitical Risk',
  'news.predict.geoValue':'Middle East risk and supply concerns persist',
  'news.predict.outlookLabel':'surcharge outlook',
  'news.predict.outlook.flat':'Flat or limited increase likely',
  'news.predict.outlook.up':'Likely to rise',
  'news.predict.outlook.down':'Likely to fall',
  /* month names */
  'month.1':'Jan','month.2':'Feb','month.3':'Mar','month.4':'Apr',
  'month.5':'May','month.6':'Jun','month.7':'Jul','month.8':'Aug',
  'month.9':'Sep','month.10':'Oct','month.11':'Nov','month.12':'Dec',
  /* common */
  'common.noData':'No data',
  'common.status':'Status',
  'common.loading':'Loading news...',
  'common.aiSummaryBadge':'AI Summary',
  'common.emptyAll':'No major updates available',
  'common.emptyAllSub':'Data collection in progress',
  'common.emptyFilter':'No news in this category',
  /* official summary */
  'news.official.ke':'Korean Air — All routes down vs May (June official filing complete)',
  'news.official.oz':'Asiana Airlines — All routes down vs May (June official filing complete)',
  'news.official.lj':'Jin Air — All routes down vs May (USD 42→36, USD 140→115)',
  'news.official.7c':'Jeju Air — June official filing complete ✅ (May→Jun: max USD 126→104, all-band reduction)',
  'news.official.bx':'Air Busan — All routes down vs May (USD 52→43, USD 126→106)',
  'news.official.ze':'Eastar Jet — All routes down vs May (USD 52→43, USD 126→103)',
  'news.official.rs':'Air Seoul — All-band reduction vs May (KRW 94,500→75,300 / KRW 165,000→132,800)',
  'news.official.tw':'T\'way Air — June filing complete',
  'news.official.yp':'Air Premia — June USD filing reflected · short-haul ICN-NRT USD 59→48 / long-haul New York·Washington D.C. USD 365→296',
  'news.official.desc':'* KE/OZ/LJ/BX/ZE/RS/TW/7C/YP June filings complete · All-band reduction vs May · Jeju Air (USD), T\'way (KRW), and Air Premia (USD) included',
  /* compare box */
  'news.compare.li1':'Korean Air: all routes down (short ₩75,000→₩61,500, long ₩564,000→₩451,500)',
  'news.compare.li2':'Asiana: all routes down (short ₩85,400→₩68,000, long ₩476,200→₩382,800)',
  'news.compare.li3':'Jin Air: all routes down (USD 42→36, USD 140→115)',
  'news.compare.li4':'Air Busan: all routes down (USD 52→43, USD 126→106)',
  'news.compare.li5':'Eastar Jet: all routes down (USD 52→43, USD 126→103)',
  'news.compare.li6':'Air Seoul: all routes down (KRW 94,500→75,300 / KRW 165,000→132,800)',
  'news.compare.li7':'Jeju Air: June official filing complete ✅ — all-band reduction (USD 52→42, USD 126→104)',
  'news.compare.li8':'T\'way Air: June KRW filing reflected',
  'news.compare.li9':'Overall: KE/OZ/LJ/BX/ZE/RS/TW/7C/YP June filings reflected — reductions confirmed vs May',
  /* fixed news cards */
  'news.fixed.20260420.title':'Oil prices keep falling — June surcharge outlook uncertain, check official filings',
  'news.fixed.20260420.summary':'Brent crude has continued sliding after hitting the low $80s. The USD/KRW rate is easing slightly despite remaining elevated, and the probability of a June surcharge reduction or hold is growing.',
  'news.fixed.20260420.impact':'Downward pressure strengthening',
  'news.fixed.20260417.title':'Jin Air & Jeju Air raise May international fuel surcharges',
  'news.fixed.20260417.summary':'Following Korean Air and Asiana, Jin Air and Jeju Air have raised surcharges across all routes. Some bands are up nearly2× vs April.',
  'news.fixed.20260417.impact':'Peak pricing locked in',
  'news.fixed.20260416.title':'May international fuel surcharge at record high',
  'news.fixed.20260416.summary':'Highest tier applied since distance-based system was introduced; most airlines raised all routes.',
  'news.fixed.20260416.impact':'Peak of surcharge cycle',
  'news.fixed.20260415.title':'Middle East tensions spike oil prices',
  'news.fixed.20260415.summary':'Brent crude surpassed $90, increasing airline fuel cost burdens.',
  'news.fixed.20260415.impact':'Upward pressure',
  'news.fixed.20260418a.title':'Oil prices plunge on Strait of Hormuz de-escalation',
  'news.fixed.20260418a.summary':'Expectations of easing Middle East risk drove Brent crude sharply lower into the low $80s.',
  'news.fixed.20260418a.impact':'Downward pressure emerging (June impact possible)',
  'news.fixed.20260418b.title':'USD/KRW holds at 1,470s',
  'news.fixed.20260418b.summary':'Elevated exchange rate persists, keeping airline cost pressures sustained.',
  'news.fixed.20260418b.impact':'Limiting factor for surcharge cuts',
  'news.fixed.20260507a.title':'Oil prices partially ease… June surcharge volatility elevated, monitor official filing',
  'news.fixed.20260507a.summary':'Brent crude and jet fuel prices have partially declined from peak levels, but FX and Middle East risk factors remain. The direction of June surcharges is uncertain — confirm with official airline filings.',
  'news.fixed.20260507a.impact':'Downward pressure strengthening',
  'news.fixed.20260507b.title':'Airline cost burden persists… exchange rate and oil price risk on watch',
  'news.fixed.20260507b.summary':'The exchange rate has stabilized somewhat but remains elevated; airlines are maintaining vigilance over fuel cost burdens and Middle East variables.',
  'news.fixed.20260507b.impact':'Volatility maintained',
  'news.fixed.src.marketUpdate':'Market Update',
  'news.fixed.src.airlineIndustry':'Airline Industry',
  'news.fixed.src.airlineNotice':'Airline Notice',
  'news.fixed.src.marketSummary':'Market Summary',
  'news.fixed.src.marketSummaryEn':'Market Summary',
  'news.fixed.src.marketBreaking':'Market Breaking',
  'news.fixed.src.fxMarket':'FX Market',
  /* page meta */
  'news.metaTitle':'Market Insights — Airline Fuel Surcharge Trends | Oil · FX · Policy',
  'news.metaDesc':'Fuel surcharge market updates covering oil prices, exchange rates, and policy. AI-summarized news for informed booking decisions.',
  /* footer */
  'news.footer.notice':'Content on this page is reference information based on public data. Confirm with official channels before important decisions.',
  'news.footer.contact':'Contact',
  /* klook affiliate */
  'klook.title':'✈️ Travel costs go beyond airfare',
  'klook.desc':'If fuel surcharges are weighing on your budget, checking local tours and activity costs in advance can help manage your total travel spend.',
  'klook.btn':'Find ways to lower travel costs →',
  'klook.inline':'If airfare is stretching your budget, check out ways to reduce your overall travel costs',
  'klook.inlineLink':'Find ways to lower travel costs',
  /* Quick links SEO section */
  'index.quick.title':'🔗 Quick Fuel Surcharge Links',
  'index.quick.korea.name':'Korea Departure Fuel Surcharge',
  'index.quick.korea.desc':'Compare all Korean carriers',
  'index.quick.compare.name':'May → June 2026 Fuel Surcharge Comparison',
  'index.quick.compare.desc':'Compare May applied rates and June official filings by airline',
  'index.quick.graph.name':'Fuel Surcharge Trend Graph',
  'index.quick.graph.desc':'Monthly increase/decrease trend',
  'index.quick.calc.name':'Fuel Surcharge Calculation Guide',
  'index.quick.calc.desc':'Rules and checking method',
  'index.quick.ke.name':'Korean Air Fuel Surcharge',
  'index.quick.ke.desc':'KE monthly notice details',
  'index.quick.oz.name':'Asiana Airlines Fuel Surcharge',
  'index.quick.oz.desc':'OZ monthly notice details',
  'index.quick.7c.name':'Jeju Air Fuel Surcharge',
  'index.quick.7c.desc':'7C monthly notice details',
  'index.quick.lj.name':'Jin Air Fuel Surcharge',
  'index.quick.lj.desc':'LJ monthly notice details',
  'index.quick.tw.name':"T'way Air Fuel Surcharge",
  'index.quick.tw.desc':'TW monthly notice details',
},
ja:{
  'nav.routes':'路線別検索','nav.calc':'計算機','nav.airlines':'航空会社一覧','nav.news':'参考ニュース',
  'footer.notice':'燃油サーチャージ情報は参考用です。最終金額は必ず航空会社公式サイトでご確認ください。',
  'footer.about':'About','footer.privacy':'プライバシーポリシー','footer.terms':'利用規約',
  'index.title':'燃油サーチャージ照会 — 韓国出発国際線',
  'index.metaDesc':'韓国出発国際線の航空会社別燃油サーチャージを比較。',
  'index.heroTitle':'路線別燃油サーチャージ検索',
  'index.heroSub':'公式公示と市場指標を確認し、路線別に比較しましょう',
  'index.labelOrigin':'出発空港','index.labelDest':'到着空港','index.labelTrip':'旅程',
  'index.trip.oneWay':'片道','index.trip.roundTrip':'往復',
  'index.search':'🔍 予約タイミングを確認',
  'index.signal1':'📢 大韓航空6月公式公示反映',
  'index.signal2':'✈️ 路線別現在適用金額',
  'index.signal3':'⏱️ 予約タイミング判断',
  'index.airport.selectOrigin':'出発地を選択','index.airport.selectDest':'目的地を選択',
  'index.airport.searchOriginPlaceholder':'空港名またはコードを入力 (例: ソウル, ICN)',
  'index.airport.searchDestPlaceholder':'空港名またはコードを入力 (例: 東京, HND)',
  'index.airport.searchOriginAria':'出発空港を検索',
  'index.airport.searchDestAria':'到着空港を検索',
  'index.airport.noSearchResults':'結果なし',
  'common.clear':'クリア',
  'index.region.korea':'🇰🇷 韓国','index.region.japan':'🇯🇵 日本',
  'index.region.asia':'🌏 アジア','index.region.usa':'🇺🇸 アメリカ','index.region.canada':'🇨🇦 カナダ',
  'index.region.australia':'🇦🇺 オーストラリア','index.region.newzealand':'🇳🇿 ニュージーランド','index.region.oceania':'🇦🇺 オセアニア',
  'index.region.europeMiddleEast':'🇪🇺 欧州・中東',
  'airport.ICN':'ソウル仁川','airport.GMP':'ソウル金浦','airport.PUS':'釜山','airport.CJU':'済州',
  'airport.NRT':'東京成田','airport.HND':'東京羽田','airport.KIX':'大阪',
  'airport.FUK':'福岡','airport.CTS':'札幌',
  'airport.HKG':'香港','airport.SIN':'シンガポール','airport.BKK':'バンコク','airport.MNL':'マニラ',
  'airport.KUL':'クアラルンプール','airport.SGN':'ホーチミン','airport.HAN':'ハノイ',
  'airport.DAD':'ダナン','airport.DPS':'バリ','airport.CGK':'ジャカルタ','airport.PVG':'上海','airport.PEK':'北京',
  'airport.CAN':'広州','airport.XIY':'西安','airport.SZX':'深セン','airport.XMN':'厦門',
  'airport.TSN':'天津','airport.HGH':'杭州','airport.NKG':'南京',
  'airport.SHE':'瀋陽','airport.DLC':'大連','airport.CSX':'長沙',
  'airport.HKT':'プーケット','airport.SGN':'ホーチミン','airport.SIN':'シンガポール',
  'airport.ULN':'ウランバートル','airport.MFM':'マカオ','airport.CXR':'ニャチャン(カムラン)',
  'airport.PQC':'フーコック','airport.RGN':'ヤンゴン','airport.KTM':'カトマンズ','airport.TAS':'タシュケント','airport.TXG':'台中',
  'airport.GUM':'グアム','airport.DEL':'デリー','airport.CNX':'チェンマイ',
  'airport.BKK':'バンコク',
  'airport.YVR':'バンクーバー','airport.YYZ':'トロント',
  'airport.HNL':'ホノルル','airport.IAD':'ワシントンD.C.',
  'airport.BOS':'ボストン','airport.ORD':'シカゴ','airport.ATL':'アトランタ',
  'airport.DFW':'ダラス','airport.LAS':'ラスベガス',
  'airport.BNE':'ブリスベン','airport.AKL':'オークランド','airport.MEL':'メルボルン','airport.SYD':'シドニー',
  'airport.FCO':'ローマ','airport.MXP':'ミラノ','airport.VIE':'ウィーン',
  'airport.PRG':'プラハ','airport.BUD':'ブダペスト','airport.ZRH':'チューリッヒ',
  'airport.MAD':'マドリード','airport.LIS':'リスボン','airport.IST':'イスタンブール',
  'airport.SVO':'モスクワ',
  'airport.LAX':'ロサンゼルス','airport.JFK':'ニューヨーク JFK','airport.EWR':'ニューアーク / ニューヨーク','airport.SFO':'サンフランシスコ',
  'airport.SEA':'シアトル','airport.SYD':'シドニー',
  'airport.CDG':'パリ','airport.LHR':'ロンドン','airport.FRA':'フランクフルト',
  'airport.AMS':'アムステルダム','airport.DXB':'ドバイ',
  'beta.title':'ベータサービスのご案内',
  'beta.desc':'韓国出発国際線の燃油サーチャージを提供中。最終金額は必ず公式通知をご確認ください。',
  'beta.note':'※ 現在は韓国出発国際線のみ対応。海外出発路線は準備中です。',
  'index.intro1.title':'韓国出発国際線の燃油サーチャージ比較',
  'index.intro1.body':'ICN・GMP・PUS等の韓国出発国際線を対象に、航空会社別・距離帯別の燃油サーチャージを比較するサービスです。',
  'index.intro2.title':'公式通知に基づくデータ提供',
  'index.intro2.body':'各航空会社が毎月発表する公式燃油サーチャージ通知を優先反映。公式確認済の航空会社には「公式確認」表示が付きます。',
  'index.intro3.title':'なぜこのサービスが必要？',
  'index.intro3.body':'燃油サーチャージは航空券総額の多くを占めますが、各社通知を個別確認するのは手間がかかります。このサービスで一画面での比較が可能です。',
  'index.guide.title':'💡 燃油サーチャージとは？',
  'index.guide.p1':'燃油サーチャージは、航空燃料価格の変動に応じて航空会社が基本運賃とは別に徴収する追加料金です。',
  'index.guide.p2':'金額は航空会社ごと、距離帯（短距離・中距離・長距離）ごとに異なります。毎月初めに翌月分が公式発表されます。',
  'index.guide.p3':'以下の結果は公式通知基準です。最終金額は予約画面または公式通知で必ずご確認ください。',
  'index.guide.p1Landing':'燃油サーチャージは国際油価に連動して航空会社が基本運賃と別途徴収する料金です。',
  'index.guide.p2Landing':'国内航空会社は毎月翌月分の金額を公式通知します。出発・目的地を選択して検索すると航空会社別の公式通知金額が確認できます。',
  'index.decision.title':'📢 大韓航空6月公式公示反映完了',
  'index.decision.line1':'✔ 大韓航空6月公式公示完了 — 5月比全区間引き下げ',
  'index.decision.line2':'✔ 他航空会社6月公示は順次反映中 — 各社公式チャンネル確認',
  'index.decision.line3':'✔ 7月方向性はブレント油・MOPS・為替指標を確認',
  'index.decision.conclusion':'👉 大韓航空6月公示確認完了 · 他社公示・7月方向性は別途確認推奨',
  'index.landingTitle':'韓国出発国際線燃油サーチャージ',
  'index.krOnly.title':'韓国出発のみ対応','index.krOnly.desc':'路線別検索で出発・目的地を選択すると航空会社別の公式通知金額を確認できます。',
  'index.indexLink':'→ 航空会社一覧を見る',
  'index.status.loading':'データ読み込み中...','index.status.loadError':'データ読み込み失敗',
  'index.status.scriptError':'スクリプトエラー',
  'index.status.updated':'データ更新: ','index.status.updatedSuffix':' · KE·OZ·LJ·BX·ZE2026年6月公式公示反映',
  'index.filter.all':'すべて','index.filter.hasOfficialData':'公式データあり',
  'index.result.label':'航空会社別燃油サーチャージ',
  'index.result.noResults':'検索結果がありません',
  'index.result.onlyKoreaDeparture':'現在は韓国出発国際線のみ対応しています',
  'index.result.overseasComingSoon':'海外出発路線は準備中です。',
  'index.result.overseasMeta':'海外出発路線',
  'index.alert.selectAirports':'出発地と目的地を選択してください',
  'index.alert.differentAirports':'出発地と目的地を別々に選択してください',
  'index.meta.oneWay':'片道','index.meta.roundTrip':'往復',
  'index.meta.suffix':'韓国出発 · 大韓航空2026年6月公式公示反映',
  'index.card.currentRoute':'現在の路線',
  'index.card.notPublished':'August filing preparation','index.card.preAnnouncement':'Pending August filing',
  'index.card.groupTier':'群別料金','index.card.usdNotice':'USD建て',
  'index.card.notOperated':'未就航','index.card.routeNotServed':'該当路線は未就航です',
  'index.card.viewOfficialNotice':'公式通知 ↗',
  'index.card.noData':'公式データが取得できません。公式通知ボタンからご確認ください。',
  'index.card.compare':'5月 vs 6月 公式公示',
  'index.card.period':'2026.05','index.card.periodMay':'2026.06 公式公示',
  'index.card.diff':'増減',
  'index.card.periodNext':'翌月公示',
  'index.card.fare':'サーチャージ','index.card.distanceBand':'距離帯',
  'index.card.mayTrend':'前月比',
  'index.card.groupTierShort':'群別',
  'index.card.notListed':'公示なし','index.card.miniNotice':'公式通知 ↗',
  /* news page */
  'news.pageTitle':'参考ニュース',
  /* CTA */
  'news.cta.desc':              '📍 路線別の燃油サーチャージをすぐ確認',
  'news.cta.main':              '👉 燃油サーチャージを検索',
  'news.cta.airlines':          '👉 航空会社別に比較',
  /* 提携カード */
  'aff.cta':                    '最安値を確認 →',
  'aff.hotelscombined.title':   '航空券と宿泊をまとめて比較',
  'aff.hotelscombined.desc':    '航空券とホテルの料金を比較して最適なタイミングで予約',
  'aff.agoda.title':            '旅程に合わせて宿泊をすぐ予約',
  'aff.agoda.desc':             '旅程に合ったホテルを素早く見つけてまとめて予約',
  'aff.usim.title':             '旅行SIM準備',
  'aff.usim.desc':              '出国前の必須準備',
  'aff.hotels.title':           '世界中の宿泊施設を簡単予約',
  'aff.hotels.desc':            '多彩なホテル・宿泊施設を比較してすぐ予約',
  'aff.myrealtrip.title':       'サーチャージ確認後、実際の航空券総額も比較しましょう',
  'aff.myrealtrip.desc':        '燃油サーチャージは発券日基準で適用されます。5月と6月の公式公示金額を確認して予約タイミングを判断しましょう。',
  'aff.myrealtrip.cta':         '今すぐ航空券総額を確認',
  'news.pageSub':'燃油サーチャージ関連 市場・政策・航空会社情報 · AI要約 · 予測根拠',
  'news.predictTitle':'📊 AI予測参考指標',
  'news.officialTitle':'📢 5月燃油サーチャージ 確定公示まとめ（6月見通し参考用）',
  'news.compareTitle':'📊 5月→6月変化 (公式公示基準)',
  'news.marketTitle':'🌍 市場ブリーフィング (2026.05.21 09:00 KST基準)',
  'news.brent':'⛽ ブレント原油: 約$100〜102/バレル — 高値から一部下落',
  'news.fx':'💱 ウォン/ドル: 約1,440〜1,450ウォン — 安定化試み',
  'news.mops':'✈️ 航空燃料/MOPS: 約480〜490セント/ガロン — 500割れへの再進入試み',
  'news.geo':'🌍 地政学: 中東リスク継続（ホルムズ/イラン変数）',
  'news.marketSummary':'→ 上昇サイクル終了後、下落転換を試みる展開',
  'news.fxDominance':'🌍 原油・為替変数に要注意（6月変動性拡大区間）',
  'news.decisionTitle':'📌 現在の判断基準',
  'news.decisionLine1':'→ 上昇サイクルの終了は不確実 — 原油・為替変数により方向が変わる',
  'news.decisionLine2':'→ 航空会社のコスト負担は依然として高水準を維持',
  'news.decisionShort':'👉 短距離路線: 公式公示確認後に予約検討',
  'news.decisionMid':'👉 長距離路線: 6月公示と市場指標の確認が必要',
  'news.decisionLong':'👉 原油・為替変数により方向が変わる可能性あり',
  /* 6月予測CTAボックス */
  'news.forecastCta.title':'2026年7月 燃油サーチャージ予測',
  'news.forecastCta.desc':'KE·OZ·LJ·BX·ZE 6月公式公示結果とブレント原油・ウォン/ドル為替・航空燃油/MOPS・中東リスクをベースに7月サーチャージの方向性をまとめました。',
  'news.forecastCta.btn':'7月予測を詳しく見る →',
  /* 6月基準案内 */
  'news.basisTitle':'📅 6月サーチャージ公示案内',
  'news.basisBody':'6月公示は5月中に各航空会社の公式チャンネルでご確認ください。',
  'news.aiNotice':'AI要約コンテンツ — このページの内容は公開情報をもとにAIが整理した参考資料です。公式情報ではありません。重要な判断前は各航空会社の公式チャンネルを必ずご確認ください。',
  'news.filterAll':'すべて',
  'news.dataRef':        '✅ KE·OZ·LJ·BX·ZE·RS·TW·7C 6月公式公示完了 · 2026.05.21 09:00 KST 基準',
  'news.curSummaryTitle':'現在の基準要約 (2026.05.07):',
  'news.curSummary':     '→ 6月サーチャージ: 原油・為替変数により方向不透明 — 公式公示の確認が必要',
  /* summary card i18n (ja — en fallback) */
  'news.summary.title':   '📌2026年6月 主要サマリー',
  'news.summary.updated': '🕐2026.05.21 09:00 KST 市場指標反映',
  'news.summary.li1':     'ブレント原油 高値から一部下落の流れ継続',
  'news.summary.li2':     '航空燃油(MOPS) 500セント割れへの再進入を試みる局面',
  'news.summary.li3':     '韓国ウォン/ドル 1,440〜1,450ウォン台での安定化',
  'news.summary.li4':     '中東地政学リスクは依然として継続',
  'news.summary.li5':     '6月燃油サーチャージ: 原油・為替変数に要注意、公式公示確認が必要',
  'news.summary.li6':     '短期的な変動性は非常に大きい状態',
  'news.surchargeNote':  '※ 燃油サーチャージは予約時点(発券日)を基準に適用されます。KE·OZ·LJ·BX·ZE·RS·TW·7C 6月公式公示が反映されました (2026.05.21基準)。',
  'news.sectionPrev':    '📚 過去のニュース / 過去の分析記録',
  'news.sectionPrevSub': '※ 下記の内容は各作成時点基準の市場分析記録です。',
  'news.newBadge':       'NEW',

  'news.filterInstitution':'機関',
  'news.filterMarket':'市場',
  'news.disclaimer':'※ 燃油サーチャージは予約時点の料金が適用されます。変動前に予約をご確認ください。',
  'news.cat.airline':'航空会社','news.cat.institution':'機関','news.cat.market':'市場','news.cat.general':'一般',
  'news.impact.prefix':'→ 燃油サーチャージへの影響: ',
  /* predict box */
  'news.predict.subtitle':'データに基づく推定',
  'news.predict.footnote':'* 5月サーチャージは公式通知確定。6月見通しは市場データ参考用。',
  'news.predict.brentLabel':'ブレント原油',
  'news.predict.mopsLabel':'シンガポール航空燃料 (MOPS)',
  'news.predict.mopsValue':'一部調整後に再上昇を試みる動き、高値維持',
  'news.predict.fxLabel':'ドル/ウォンレート',
  'news.predict.fxUnit':'ウォン',
  'news.predict.fxArrow':'→',
  'news.predict.brentUnit':'/ バレル',
  'news.predict.geoLabel':'地政学リスク',
  'news.predict.geoValue':'中東リスクと供給不安が継続',
  'news.predict.outlookLabel':'surcharge見通し',
  'news.predict.outlook.flat':'据え置きまたは限定的引き上げの可能性',
  'news.predict.outlook.up':'上昇の可能性が高い',
  'news.predict.outlook.down':'下落の可能性が高い',
  /* month names */
  'month.1':'1月','month.2':'2月','month.3':'3月','month.4':'4月',
  'month.5':'5月','month.6':'6月','month.7':'7月','month.8':'8月',
  'month.9':'9月','month.10':'10月','month.11':'11月','month.12':'12月',
  /* common */
  'common.noData':'データなし',
  'common.status':'状態',
  'common.loading':'ニュースを読み込み中...',
  'common.aiSummaryBadge':'AI要約',
  'common.emptyAll':'主要なアップデートはありません',
  'common.emptyAllSub':'データ収集中です',
  'common.emptyFilter':'このカテゴリのニュースはありません',
  /* official summary */
  'news.official.ke':'大韓航空 — 5月比全路線引き下げ (6月公式公示完了)',
  'news.official.oz':'アシアナ航空 — 5月比全路線引き下げ (6月公式公示完了)',
  'news.official.lj':'ジンエアー — 5月比全路線引き下げ (USD 42→36, 140→115)',
  'news.official.7c':'チェジュ航空 — 6月公式公示完了 ✅ (5月→6月: 最大 USD 126→104、全路線引き下げ)',
  'news.official.bx':'エアプサン — 5月比全路線引き下げ (USD 52→43, 126→106)',
  'news.official.ze':'イースター航空 — 5月比全路線引き下げ (USD 52→43、126→103)',
  'news.official.rs':'エアソウル — 5月比全路線引き下げ (KRW 94,500→75,300 / KRW 165,000→132,800)',
  'news.official.tw':'ティーウェイ — 6月公示前',
  'news.official.yp':'エアプレミア — 6月USD公示反映済み · 短距離 ICN-NRT USD 59→48 / 長距離 ニューヨーク·ワシントンD.C. USD 365→296',
  'news.official.desc':'* KE·OZ·LJ·BX·ZE·RS·TW·7C·YP 6月公式公示完了 · 5月比全区間引き下げ · エアプレミア(YP) USD公示反映済み',
  /* compare box */
  'news.compare.li1':'大韓航空：全路線引き下げ (短距離₩75,000→₩61,500、長距離₩564,000→₩451,500)',
  'news.compare.li2':'アシアナ：全路線引き下げ (短距離₩85,400→₩68,000、長距離₩476,200→₩382,800)',
  'news.compare.li3':'ジンエアー：全路線引き下げ (USD 42→36、140→115)',
  'news.compare.li4':'エアプサン：全路線引き下げ (USD 52→43、126→106)',
  'news.compare.li4b':'イースター航空：全路線引き下げ (USD 52→43、126→103)',
  'news.compare.li5':'イースター航空：全路線引き下げ (USD 52→43、126→103)',
  'news.compare.li6':'エアソウル：全路線引き下げ (KRW 94,500→75,300 / KRW 165,000→132,800)',
  'news.compare.li7':'チェジュ航空：6月公式公示完了 ✅ — 全路線引き下げ (USD 52→42、USD 126→104)',
  'news.compare.li8':'ティーウェイ：公示前',
  'news.compare.li9':'共通: KE/OZ/LJ/BX/ZE/RS/TW/7C/YP 6月公示反映済み — 5月比引き下げを確認',
  /* fixed news cards */
  'news.fixed.20260420.title':'原油安続く — 6月サーチャージの見通し不透明、公式公示の確認が必要',
  'news.fixed.20260420.summary':'ブレント原油が80ドル前半まで下落後も下落基調を維持。為替は依然高水準だが小幅安定化し、6月サーチャージの引き下げまたは維持の可能性が高まっている。',
  'news.fixed.20260420.impact':'下落圧力が強化',
  'news.fixed.20260417.title':'ジンエアー・チェジュ航空が5月国際線燃油サーチャージを引き上げ',
  'news.fixed.20260417.summary':'大韓航空・アシアナに続き、ジンエアーとチェジュ航空も全路線で引き上げ。一部区間は4月比約2倍に上昇。',
  'news.fixed.20260417.impact':'高値反映完了（ピーク形成）',
  'news.fixed.20260416.title':'5月国際線燃油サーチャージが過去最高水準に',
  'news.fixed.20260416.summary':'距離比例制導入後最高段階が適用され、ほぼ全航空会社が全路線で引き上げ。',
  'news.fixed.20260416.impact':'サーチャージサイクルのピーク',
  'news.fixed.20260415.title':'中東緊張で国際原油価格が急騰',
  'news.fixed.20260415.summary':'ブレント原油が90ドルを超え、航空燃料コストの負担が増大。',
  'news.fixed.20260415.impact':'上昇圧力',
  'news.fixed.20260418a.title':'ホルムズ海峡緊張緩和で原油急落',
  'news.fixed.20260418a.summary':'中東リスク緩和期待でブレント原油が急落、80ドル前半へ下落。',
  'news.fixed.20260418a.impact':'下落圧力発生（6月への影響可能性あり）',
  'news.fixed.20260418b.title':'ドル/ウォン 1,470ウォン台を維持',
  'news.fixed.20260418b.summary':'為替が高水準を維持し、航空会社のコスト負担が継続。',
  'news.fixed.20260418b.impact':'サーチャージ引き下げの制限要因',
  'news.fixed.20260507a.title':'国際油価が一部調整… 6月サーチャージ変動性拡大、公式公示の動向を注視',
  'news.fixed.20260507a.summary':'ブレント原油と航空燃油価格が高値から一部下落しているが、為替・中東リスクなど変数が残っており6月サーチャージの方向は不透明。公式公示の確認が必要。',
  'news.fixed.20260507a.impact':'下落圧力が強化',
  'news.fixed.20260507b.title':'航空会社のコスト負担継続… 為替・油価変数に警戒',
  'news.fixed.20260507b.summary':'為替は若干安定したが依然として高水準であり、航空会社は燃料費負担と中東変数への警戒を維持している。',
  'news.fixed.20260507b.impact':'変動性維持',
  'news.fixed.src.marketUpdate':'Market Update',
  'news.fixed.src.airlineIndustry':'Airline Industry',
  'news.fixed.src.airlineNotice':'航空会社公知',
  'news.fixed.src.marketSummary':'市場まとめ',
  'news.fixed.src.marketSummaryEn':'Market Summary',
  'news.fixed.src.marketBreaking':'Market Breaking',
  'news.fixed.src.fxMarket':'FX Market',
  /* page meta */
  'news.metaTitle':'参考ニュース — 航空燃油サーチャージ動向',
  'news.metaDesc':'国際油価・為替・政策動向に基づく燃油サーチャージ参考情報。AI要約でお届けします。',
  /* footer */
  'news.footer.notice':'このページの情報は公開データ基準の参考資料です。重要な決定前は公式チャンネルをご確認ください。',
  'news.footer.contact':'お問い合わせ',
  /* klook affiliate */
  'klook.title':'✈️ 旅行費用は航空券だけではありません',
  'klook.desc':'燃油サーチャージが負担なら、現地ツアー・アクティビティの費用も事前に把握しておくと旅行全体の予算管理に役立ちます。',
  'klook.btn':'旅行費用を抑える方法を見る →',
  'klook.inline':'航空券の費用が気になる方は、旅行全体のコストを下げる方法もチェックしてみてください',
  'klook.inlineLink':'旅行費用を抑える方法を見る',
  /* クイックリンク SEO セクション */
  'index.quick.title':'🔗 燃油サーチャージ クイックリンク',
  'index.quick.korea.name':'韓国出発 燃油サーチャージ',
  'index.quick.korea.desc':'国籍キャリア全社比較',
  'index.quick.compare.name':'2026年5月→6月 燃油サーチャージ比較',
  'index.quick.compare.desc':'航空会社別5月適用額と6月公示額の比較',
  'index.quick.graph.name':'燃油サーチャージ変動グラフ',
  'index.quick.graph.desc':'月別値上げ・値下げ推移',
  'index.quick.calc.name':'燃油サーチャージ計算方法',
  'index.quick.calc.desc':'算定基準と確認方法',
  'index.quick.ke.name':'大韓航空 燃油サーチャージ',
  'index.quick.ke.desc':'KE 月別公示詳細',
  'index.quick.oz.name':'アシアナ航空 燃油サーチャージ',
  'index.quick.oz.desc':'OZ 月別公示詳細',
  'index.quick.7c.name':'済州航空 燃油サーチャージ',
  'index.quick.7c.desc':'7C 月別公示詳細',
  'index.quick.lj.name':'ジンエアー 燃油サーチャージ',
  'index.quick.lj.desc':'LJ 月別公示詳細',
  'index.quick.tw.name':'ティーウェイ航空 燃油サーチャージ',
  'index.quick.tw.desc':'TW 月別公示詳細',
},
zh:{
  'nav.routes':'按航线查询','nav.calc':'计算器','nav.airlines':'航空公司一览','nav.news':'参考资讯',
  'footer.notice':'燃油附加费信息仅供参考。最终金额请以航空公司官方公告为准。',
  'footer.about':'About','footer.privacy':'隐私政策','footer.terms':'服务条款',
  'index.title':'燃油附加费查询 — 韩国出发国际航班',
  'index.metaDesc':'比较韩国出发国际航班各航空公司燃油附加费。',
  'index.heroTitle':'按航线查询燃油附加费',
  'index.heroSub':'请确认官方公告和市场指标，按航线进行比较',
  'index.labelOrigin':'出发机场','index.labelDest':'到达机场','index.labelTrip':'行程类型',
  'index.trip.oneWay':'单程','index.trip.roundTrip':'往返',
  'index.search':'🔍 判断预订时机',
  'index.signal1':'📢 大韩航空6月官方公告已反映',
  'index.signal2':'✈️ 按航线确认当前金额',
  'index.signal3':'⏱️ 判断预订时机',
  'index.airport.selectOrigin':'选择出发地','index.airport.selectDest':'选择目的地',
  'index.airport.searchOriginPlaceholder':'输入机场名称或代码（例：首尔, ICN）',
  'index.airport.searchDestPlaceholder':'输入机场名称或代码（例：东京, HND）',
  'index.airport.searchOriginAria':'搜索出发机场',
  'index.airport.searchDestAria':'搜索到达机场',
  'index.airport.noSearchResults':'无结果',
  'common.clear':'清除',
  'index.region.korea':'🇰🇷 韩国','index.region.japan':'🇯🇵 日本',
  'index.region.asia':'🌏 亚洲','index.region.usa':'🇺🇸 美国','index.region.canada':'🇨🇦 加拿大',
  'index.region.australia':'🇦🇺 澳大利亚','index.region.newzealand':'🇳🇿 新西兰','index.region.oceania':'🇦🇺 大洋洲',
  'index.region.europeMiddleEast':'🇪🇺 欧洲·中东',
  'airport.ICN':'首尔仁川','airport.GMP':'首尔金浦','airport.PUS':'釜山','airport.CJU':'济州',
  'airport.NRT':'东京成田','airport.HND':'东京羽田','airport.KIX':'大阪',
  'airport.FUK':'福冈','airport.CTS':'札幌',
  'airport.HKG':'香港','airport.SIN':'新加坡','airport.BKK':'曼谷','airport.MNL':'马尼拉',
  'airport.KUL':'吉隆坡','airport.SGN':'胡志明市','airport.HAN':'河内',
  'airport.DAD':'岘港','airport.DPS':'巴厘岛','airport.CGK':'雅加达','airport.PVG':'上海','airport.PEK':'北京',
  'airport.CAN':'广州','airport.XIY':'西安','airport.SZX':'深圳','airport.XMN':'厦门',
  'airport.TSN':'天津','airport.HGH':'杭州','airport.NKG':'南京',
  'airport.SHE':'沈阳','airport.DLC':'大连','airport.CSX':'长沙',
  'airport.HKT':'普吉岛','airport.SGN':'胡志明市','airport.SIN':'新加坡',
  'airport.ULN':'乌兰巴托','airport.MFM':'澳门','airport.CXR':'芽庄(金兰)',
  'airport.PQC':'富国岛','airport.RGN':'仰光','airport.KTM':'加德满都','airport.TAS':'塔什干','airport.TXG':'台中',
  'airport.GUM':'关岛','airport.DEL':'德里','airport.CNX':'清迈',
  'airport.BKK':'曼谷',
  'airport.YVR':'温哥华','airport.YYZ':'多伦多',
  'airport.HNL':'檀香山','airport.IAD':'华盛顿特区',
  'airport.BOS':'波士顿','airport.ORD':'芝加哥','airport.ATL':'亚特兰大',
  'airport.DFW':'达拉斯','airport.LAS':'拉斯维加斯',
  'airport.BNE':'布里斯班','airport.AKL':'奥克兰','airport.MEL':'墨尔本','airport.SYD':'悉尼',
  'airport.FCO':'罗马','airport.MXP':'米兰','airport.VIE':'维也纳',
  'airport.PRG':'布拉格','airport.BUD':'布达佩斯','airport.ZRH':'苏黎世',
  'airport.MAD':'马德里','airport.LIS':'里斯本','airport.IST':'伊斯坦布尔',
  'airport.SVO':'莫斯科',
  'airport.LAX':'洛杉矶','airport.JFK':'纽约 JFK','airport.EWR':'纽瓦克 / 纽约','airport.SFO':'旧金山',
  'airport.SEA':'西雅图','airport.SYD':'悉尼',
  'airport.CDG':'巴黎','airport.LHR':'伦敦','airport.FRA':'法兰克福',
  'airport.AMS':'阿姆斯特丹','airport.DXB':'迪拜',
  'beta.title':'Beta服务说明',
  'beta.desc':'目前提供韩国出发国际航班燃油附加费信息。最终金额请以航空公司官方公告为准。',
  'beta.note':'※ 目前仅支持韩国出发国际航班，海外出发航线即将上线。',
  'index.intro1.title':'韩国出发国际航班燃油附加费比较',
  'index.intro1.body':'本服务比较从ICN、GMP、PUS等韩国机场出发的国际航班各航空公司燃油附加费。',
  'index.intro2.title':'基于官方公告的数据',
  'index.intro2.body':'优先反映各航空公司每月发布的官方燃油附加费公告。经过官方确认的航空公司标有"官方确认"标识。',
  'index.intro3.title':'为什么需要这项服务？',
  'index.intro3.body':'燃油附加费占机票总价相当一部分，但逐一查看各家公告十分繁琐。本服务将多家航空公司的官方公告汇聚于一个页面。',
  'index.guide.title':'💡 什么是燃油附加费？',
  'index.guide.p1':'燃油附加费是航空公司根据航空燃料价格变动，在基本票价之外额外收取的费用。',
  'index.guide.p2':'各航空公司金额不同，同一航空公司也按飞行距离段有所区别。每月初公布下月适用金额。',
  'index.guide.p3':'以下结果基于官方公告，最终金额请在预订界面或官方公告中确认。',
  'index.guide.p1Landing':'燃油附加费与国际油价联动，由航空公司在基本票价之外单独收取。',
  'index.guide.p2Landing':'韩国航空公司每月发布下月适用金额的官方公告。选择出发地和目的地即可比较各航空公司的官方公告金额。',
  'index.decision.title':'📢 大韩航空6月官方公告已反映',
  'index.decision.line1':'✔ 大韩航空6月官方公告完成 — 全区间较5月下调',
  'index.decision.line2':'✔ 其他航司6月公告陆续发布中 — 请查阅各航司官方渠道',
  'index.decision.line3':'✔ 7月方向需关注布伦特油价·MOPS·汇率指标',
  'index.decision.conclusion':'👉 大韩航空6月公告确认完成 · 其他航司及7月方向另行确认',
  'index.landingTitle':'韩国出发国际航班燃油附加费',
  'index.krOnly.title':'仅支持韩国出发','index.krOnly.desc':'在航线查询中选择出发地和目的地，即可查看各航空公司官方公告金额。',
  'index.indexLink':'→ 查看完整航空公司一览',
  'index.status.loading':'数据加载中...','index.status.loadError':'数据加载失败',
  'index.status.scriptError':'脚本错误',
  'index.status.updated':'数据更新: ','index.status.updatedSuffix':' · KE·OZ·LJ·BX·ZE2026年6月官方公告已反映',
  'index.filter.all':'全部','index.filter.hasOfficialData':'有官方数据',
  'index.result.label':'各航空公司燃油附加费',
  'index.result.noResults':'无搜索结果',
  'index.result.onlyKoreaDeparture':'目前仅支持韩国出发国际航班',
  'index.result.overseasComingSoon':'海外出发航线即将上线。',
  'index.result.overseasMeta':'海外出发航线',
  'index.alert.selectAirports':'请选择出发地和目的地',
  'index.alert.differentAirports':'出发地和目的地请选择不同机场',
  'index.meta.oneWay':'单程','index.meta.roundTrip':'往返',
  'index.meta.suffix':'韩国出发 · 大韩航空2026年6月官方公告已反映',
  'index.card.currentRoute':'当前航线',
  'index.card.notPublished':'August filing preparation','index.card.preAnnouncement':'Pending August filing',
  'index.card.groupTier':'组别费率','index.card.usdNotice':'USD报价',
  'index.card.notOperated':'未开通','index.card.routeNotServed':'该航空公司未运营此航线',
  'index.card.viewOfficialNotice':'官方公告 ↗',
  'index.card.noData':'无法获取官方数据，请通过官方公告按钮直接查看。',
  'index.card.compare':'5月 vs 6月 官方公告',
  'index.card.period':'2026.05','index.card.periodMay':'2026.06 官方公告',
  'index.card.diff':'增减',
  'index.card.periodNext':'下月公告',
  'index.card.fare':'燃油附加费','index.card.distanceBand':'距离段',
  'index.card.mayTrend':'环比变动',
  'index.card.groupTierShort':'组别',
  'index.card.notListed':'未公布','index.card.miniNotice':'官方公告 ↗',
  /* news page */
  'news.pageTitle':'参考资讯',
  /* CTA */
  'news.cta.desc':              '📍 按航线查询燃油附加费',
  'news.cta.main':              '👉 查询燃油附加费',
  'news.cta.airlines':          '👉 按航空公司比较',
  /* 合作卡片 */
  'aff.cta':                    '查看最低价 →',
  'aff.hotelscombined.title':   '机票和住宿一站式比较',
  'aff.hotelscombined.desc':    '同时比较机票和酒店价格，找到最佳预订时机',
  'aff.agoda.title':            '按行程快速预订住宿',
  'aff.agoda.desc':             '快速找到合适住宿并一次完成预订',
  'aff.usim.title':             '旅行SIM卡准备',
  'aff.usim.desc':              '出发前必备准备',
  'aff.hotels.title':           '全球住宿轻松预订',
  'aff.hotels.desc':            '比较多种酒店和住宿，立即预订',
  'aff.myrealtrip.title':       '确认附加费后，也比较一下实际机票总价',
  'aff.myrealtrip.desc':        '燃油附加费按出票日期适用。对比5月和6月官方公告金额，判断预订时机。',
  'aff.myrealtrip.cta':         '立即查看机票总价',
  'news.pageSub':'燃油附加费相关市场、政策、航空公司动态 · AI摘要 · 预测依据',
  'news.predictTitle':'📊 AI预测参考指标',
  'news.officialTitle':'📢 5月燃油附加费 确定公告汇总（6月展望参考）',
  'news.compareTitle':'📊 5月 vs 6月对比 (官方公告)',
  'news.marketTitle':'🌍 市场简报 (2026.05.21 09:00 KST)',
  'news.brent':'⛽ 布伦特原油: 约$100~102/桶 — 较高点有所回落',
  'news.fx':'💱 美元/韩元: 约1,440~1,450韩元 — 趋稳态势',
  'news.mops':'✈️ 航空燃油/MOPS: 约480~490美分/加仑 — 尝试重新进入500以下',
  'news.geo':'🌍 地缘政治: 中东风险持续（霍尔木兹/伊朗变量）',
  'news.marketSummary':'→ 上涨周期结束后，正尝试转入下行',
  'news.fxDominance':'🌍 核心关注：油价·汇率变量（6月波动性扩大区间）',
  'news.decisionTitle':'📌 当前判断参考',
  'news.decisionLine1':'→ 上涨周期走向不明 — 取决于油价及汇率变量',
  'news.decisionLine2':'→ 航空公司成本压力仍维持在较高水平',
  'news.decisionShort':'👉 短途航线: 确认官方公告后再考虑预订',
  'news.decisionMid':'👉 长途航线: 需确认6月公告及市场指标',
  'news.decisionLong':'👉 油价·汇率变量可能使方向出现变化',
  /* 6月预测CTA框 */
  'news.forecastCta.title':'2026年7月燃油附加费预测',
  'news.forecastCta.desc':'基于KE·OZ·LJ·BX·ZE 6月官方公告结果、布伦特原油、韩元/美元汇率、航空燃油/MOPS及中东风险，整理了7月附加费方向性。',
  'news.forecastCta.btn':'查看7月预测详情 →',
  /* 6月基准说明 */
  'news.basisTitle':'📅 6月燃油附加费公告说明',
  'news.basisBody':'6月公告请于5月中关注各航空公司官方渠道。',
  'news.aiNotice':'AI摘要内容 — 本页内容为AI基于公开信息整理的参考资料，非官方信息。重要决策前请务必确认各航空公司官方渠道。',
  'news.filterAll':'全部',
  'news.dataRef':        '✅ KE·OZ·LJ·BX·ZE·RS·TW·7C 6月官方公告完成 · 2026.05.21 09:00 KST 基准',
  'news.curSummaryTitle':'当前基准摘要 (2026.05.07):',
  'news.curSummary':     '→ 6月附加费：因油价·汇率变量方向不明，需确认官方公告',
  /* summary card i18n (zh) */
  'news.summary.title':   '📌2026年6月核心摘要',
  'news.summary.updated': '🕐 反映2026.05.21 09:00 KST市场指标',
  'news.summary.li1':     '布伦特原油较高点有所回落，下行趋势延续',
  'news.summary.li2':     '航空燃油(MOPS)尝试重新进入500美分以下',
  'news.summary.li3':     '韩元/美元汇率在1,440~1,450区间趋稳',
  'news.summary.li4':     '中东地缘政治风险依然持续',
  'news.summary.li5':     '6月燃油附加费：需关注油价·汇率变量，确认官方公告',
  'news.summary.li6':     '近期波动性极大',
  'news.surchargeNote':  '※ 燃油附加费按出票日期基准适用。KE·OZ·LJ·BX·ZE·RS·TW·7C 6月官方公告已反映 (2026.05.21基准)。',
  'news.sectionPrev':    '📚 历史新闻 / 历史分析记录',
  'news.sectionPrevSub': '※ 以下内容为各发布时间点的市场分析记录。',
  'news.newBadge':       'NEW',

  'news.filterInstitution':'机构',
  'news.filterMarket':'市场',
  'news.disclaimer':'※ 燃油附加费以预订时点为准。请在价格变动前确认是否预订。',
  'news.cat.airline':'航空公司','news.cat.institution':'机构','news.cat.market':'市场','news.cat.general':'综合',
  'news.impact.prefix':'→ 对燃油附加费的影响: ',
  /* predict box */
  'news.predict.subtitle':'基于数据的估算',
  'news.predict.footnote':'* 5月附加费已由官方公告确认。6月展望仅供市场数据参考。',
  'news.predict.brentLabel':'布伦特原油',
  'news.predict.mopsLabel':'新加坡航空燃油 (MOPS)',
  'news.predict.mopsValue':'高点后小幅回调再反弹，高位维持',
  'news.predict.fxLabel':'美元/韩元汇率',
  'news.predict.fxUnit':'韩元',
  'news.predict.fxArrow':'→',
  'news.predict.brentUnit':'/ 桶',
  'news.predict.geoLabel':'地缘政治风险',
  'news.predict.geoValue':'中东风险与供应不安持续',
  'news.predict.outlookLabel':'surcharge展望',
  'news.predict.outlook.flat':'维持或有限上调可能性较大',
  'news.predict.outlook.up':'上涨可能性高',
  'news.predict.outlook.down':'下跌可能性高',
  /* month names */
  'month.1':'1月','month.2':'2月','month.3':'3月','month.4':'4月',
  'month.5':'5月','month.6':'6月','month.7':'7月','month.8':'8月',
  'month.9':'9月','month.10':'10月','month.11':'11月','month.12':'12月',
  /* common */
  'common.noData':'暂无数据',
  'common.status':'状态',
  'common.loading':'资讯加载中...',
  'common.aiSummaryBadge':'AI摘要',
  'common.emptyAll':'暂无主要动态',
  'common.emptyAllSub':'数据收集中',
  'common.emptyFilter':'该分类暂无资讯',
  /* official summary */
  'news.official.ke':'大韩航空 — 较5月全航线下调 (6月官方公告完成)',
  'news.official.oz':'韩亚航空 — 较5月全航线下调 (6月官方公告完成)',
  'news.official.lj':'真航空 — 较5月全航线下调 (USD 42→36, 140→115)',
  'news.official.7c':'济州航空 — 6月官方公告完成 ✅ (5月→6月: 最高 USD 126→104，全区间下调)',
  'news.official.bx':'釜山航空 — 较5月全航线下调 (USD 52→43, 126→106)',
  'news.official.ze':'易斯达航空 — 较5月全航线下调 (USD 52→43, 126→103)',
  'news.official.rs':'首尔航空 — 较5月全区间下调 (KRW 94,500→75,300 / KRW 165,000→132,800)',
  'news.official.tw':'德威航空 — 6月公告完成',
  'news.official.yp':'航空前奏 — 已反映6月USD公告 · 短途 ICN-NRT USD 59→48 / 长途 纽约·华盛顿D.C. USD 365→296',
  'news.official.desc':'* KE·OZ·LJ·BX·ZE·RS·TW·7C·YP 6月官方公告完成 · 较5月全区间下调 · 已包含航空前奏(YP) USD公告',
  /* compare box */
  'news.compare.li1':'大韩航空：全线下调 (短途₩75,000→₩61,500，长途₩564,000→₩451,500)',
  'news.compare.li2':'韩亚航空：全线下调 (短途₩85,400→₩68,000，长途₩476,200→₩382,800)',
  'news.compare.li3':'真航空：全线下调 (USD 42→36，140→115)',
  'news.compare.li4':'釜山航空：全线下调 (USD 52→43，126→106)',
  'news.compare.li4b':'易斯达航空：全线下调 (USD 52→43，126→103)',
  'news.compare.li5':'易斯达航空：全区间下调 (USD 52→43、126→103)',
  'news.compare.li6':'首尔航空：全区间下调 (KRW 94,500→75,300 / KRW 165,000→132,800)',
  'news.compare.li7':'济州航空：6月官方公告完成 ✅ — 全区间下调 (USD 52→42、USD 126→104)',
  'news.compare.li8':'德威航空：已反映6月KRW公告',
  'news.compare.li9':'总体：KE/OZ/LJ/BX/ZE/RS/TW/7C/YP 6月公告已反映 — 较5月下调确认',
  /* fixed news cards */
  'news.fixed.20260420.title':'油价持续下跌 — 6月附加费走势不明，需关注官方公告',
  'news.fixed.20260420.summary':'布伦特原油跌至80美元初段后继续下行。汇率虽仍偏高但小幅稳定，6月附加费下调或维持的可能性正在增大。',
  'news.fixed.20260420.impact':'下行压力增强',
  'news.fixed.20260417.title':'真航空·济州航空上调5月国际线燃油附加费',
  'news.fixed.20260417.summary':'继大韩、韩亚之后，真航空和济州航空也对全线进行了上调。部分区间较4月翻近一倍。',
  'news.fixed.20260417.impact':'高位反映完毕（顶部形成）',
  'news.fixed.20260416.title':'5月国际线燃油附加费创历史新高',
  'news.fixed.20260416.summary':'距离比例制引入以来最高档次适用，大多数航空公司全线上调。',
  'news.fixed.20260416.impact':'附加费周期顶部',
  'news.fixed.20260415.title':'中东局势紧张推动国际油价急涨',
  'news.fixed.20260415.summary':'布伦特原油突破90美元，航空燃油成本压力加剧。',
  'news.fixed.20260415.impact':'上行压力',
  'news.fixed.20260418a.title':'霍尔木兹海峡局势缓和，油价急跌',
  'news.fixed.20260418a.summary':'中东风险缓和预期推动布伦特原油急跌至80美元初段。',
  'news.fixed.20260418a.impact':'下行压力出现（可能影响6月）',
  'news.fixed.20260418b.title':'美元/韩元维持在1,470韩元区间',
  'news.fixed.20260418b.summary':'汇率持续偏高，航空公司成本压力延续。',
  'news.fixed.20260418b.impact':'附加费下调的制约因素',
  'news.fixed.20260507a.title':'国际油价小幅回调… 6月附加费波动性扩大，需持续关注官方公告',
  'news.fixed.20260507a.summary':'布伦特原油与航空燃油价格较高点小幅回落，但汇率·中东风险等变量依然存在，6月燃油附加费走向不明。需确认各航空公司官方公告。',
  'news.fixed.20260507a.impact':'下行压力增强',
  'news.fixed.20260507b.title':'航空公司成本压力持续… 汇率·油价变量需警惕',
  'news.fixed.20260507b.summary':'汇率有所稳定但仍处于高位，航空公司对燃料成本压力与中东变量保持警惕。',
  'news.fixed.20260507b.impact':'波动性维持',
  'news.fixed.src.marketUpdate':'Market Update',
  'news.fixed.src.airlineIndustry':'Airline Industry',
  'news.fixed.src.airlineNotice':'航空公司公告',
  'news.fixed.src.marketSummary':'市场综合',
  'news.fixed.src.marketSummaryEn':'Market Summary',
  'news.fixed.src.marketBreaking':'Market Breaking',
  'news.fixed.src.fxMarket':'FX Market',
  /* page meta */
  'news.metaTitle':'参考资讯 — 航空燃油附加费动态',
  'news.metaDesc':'国际油价、汇率及政策动态对燃油附加费的影响。AI摘要助您做出明智预订决策。',
  /* footer */
  'news.footer.notice':'本页内容为公开信息基准的参考资料。重要决策前请确认官方渠道。',
  'news.footer.contact':'联系方式',
  /* klook affiliate */
  'klook.title':'✈️ 旅行费用不只是机票',
  'klook.desc':'如果燃油附加费让您感到压力，提前了解当地观光和活动费用，有助于整体旅行预算管理。',
  'klook.btn':'查看降低旅行费用的方法 →',
  'klook.inline':'如果机票费用让您担忧，不妨了解一下降低整体旅行费用的方法',
  'klook.inlineLink':'查看降低旅行费用的方法',
  /* 快速链接 SEO 区域 */
  'index.quick.title':'🔗 燃油附加费快速查询',
  'index.quick.korea.name':'韩国出发 燃油附加费',
  'index.quick.korea.desc':'国籍航空公司全面比较',
  'index.quick.compare.name':'2026年5月→6月 燃油附加费比较',
  'index.quick.compare.desc':'各航空公司5月适用金额与6月官方公告金额对比',
  'index.quick.graph.name':'燃油附加费变动图表',
  'index.quick.graph.desc':'月度涨跌趋势',
  'index.quick.calc.name':'燃油附加费计算方法',
  'index.quick.calc.desc':'计算标准及查询方法',
  'index.quick.ke.name':'大韩航空 燃油附加费',
  'index.quick.ke.desc':'KE 月度公告详情',
  'index.quick.oz.name':'韩亚航空 燃油附加费',
  'index.quick.oz.desc':'OZ 月度公告详情',
  'index.quick.7c.name':'济州航空 燃油附加费',
  'index.quick.7c.desc':'7C 月度公告详情',
  'index.quick.lj.name':'真航空 燃油附加费',
  'index.quick.lj.desc':'LJ 月度公告详情',
  'index.quick.tw.name':'德威航空 燃油附加费',
  'index.quick.tw.desc':'TW 月度公告详情',
},
fr:{
  'nav.routes':'Recherche route','nav.calc':'Calculateur','nav.airlines':'Index compagnies','nav.news':'Actualités',
  'footer.notice':'Les données de surcharge carburant sont fournies à titre indicatif. Confirmez toujours le montant final auprès de la compagnie aérienne.',
  'footer.about':'À propos','footer.privacy':'Confidentialité','footer.terms':'Conditions',
  'index.title':'Surcharge carburant — Vols internationaux depuis la Corée',
  'index.metaDesc':'Comparez les surcharges carburant par compagnie pour les vols au départ de Corée.',
  'index.heroTitle':'Surcharge carburant par route',
  'index.heroSub':'Vérifiez les annonces officielles et les indicateurs de marché — comparez par route.',
  'index.labelOrigin':'Aéroport départ','index.labelDest':'Aéroport arrivée','index.labelTrip':'Type voyage',
  'index.trip.oneWay':'Aller simple','index.trip.roundTrip':'Aller-retour',
  'index.search':'🔍 Évaluer le timing',
  'index.signal1':'📢 Publication officielle Korean Air juin',
  'index.signal2':'✈️ Tarif actuel par route',
  'index.signal3':'⏱️ Choisir le bon moment',
  'index.airport.selectOrigin':'Sélectionner départ','index.airport.selectDest':'Sélectionner arrivée',
  'index.airport.searchOriginPlaceholder':'Saisir un aéroport ou un code (ex. Séoul, ICN)',
  'index.airport.searchDestPlaceholder':'Saisir un aéroport ou un code (ex. Tokyo, HND)',
  'index.airport.searchOriginAria':'Rechercher l\'aéroport de départ',
  'index.airport.searchDestAria':'Rechercher l\'aéroport d\'arrivée',
  'index.airport.noSearchResults':'Aucun résultat',
  'common.clear':'Effacer',
  'index.region.korea':'🇰🇷 Corée','index.region.japan':'🇯🇵 Japon',
  'index.region.asia':'🌏 Asie','index.region.usa':'🇺🇸 États-Unis','index.region.canada':'🇨🇦 Canada',
  'index.region.australia':'🇦🇺 Australie','index.region.newzealand':'🇳🇿 Nouvelle-Zélande','index.region.oceania':'🇦🇺 Océanie',
  'index.region.europeMiddleEast':'🇪🇺 Europe & Moyen-Orient',
  'airport.ICN':'Séoul Incheon','airport.GMP':'Séoul Gimpo','airport.PUS':'Busan','airport.CJU':'Jeju',
  'airport.NRT':'Tokyo Narita','airport.HND':'Tokyo Haneda','airport.KIX':'Osaka',
  'airport.FUK':'Fukuoka','airport.CTS':'Sapporo',
  'airport.HKG':'Hong Kong','airport.SIN':'Singapour','airport.BKK':'Bangkok','airport.MNL':'Manille',
  'airport.KUL':'Kuala Lumpur','airport.SGN':'Hô Chi Minh-Ville','airport.HAN':'Hanoï',
  'airport.DAD':'Da Nang','airport.DPS':'Bali','airport.CGK':'Jakarta','airport.PVG':'Shanghai','airport.PEK':'Pékin',
  'airport.TAS':'Tachkent','airport.TXG':'Taichung',
  'airport.LAX':'Los Angeles','airport.JFK':'New York JFK','airport.EWR':'Newark / New York','airport.SFO':'San Francisco',
  'airport.SEA':'Seattle','airport.SYD':'Sydney',
  'airport.CDG':'Paris','airport.LHR':'Londres','airport.FRA':'Francfort',
  'airport.AMS':'Amsterdam','airport.DXB':'Dubaï',
  'beta.title':'Avis bêta','beta.desc':'Surcharges pour vols Korea-départs. Confirmez le montant final avec la compagnie.','beta.note':'※ Seuls les départs depuis la Corée sont pris en charge.',
  'index.intro1.title':'Comparaison surcharges Korea-départs',
  'index.intro1.body':'Ce service compare les surcharges carburant par compagnie pour les vols internationaux au départ des aéroports coréens.',
  'index.intro2.title':'Données basées sur les avis officiels',
  'index.intro2.body':'Les avis officiels mensuels sont prioritaires. Les compagnies vérifiées sont labelisées "Officiel confirmé".',
  'index.intro3.title':'Pourquoi ce service ?',
  'index.intro3.body':'Les surcharges représentent une part importante du billet. Ce service regroupe tous les avis sur une seule page.',
  'index.guide.title':'💡 Qu\'est-ce qu\'une surcharge carburant ?',
  'index.guide.p1':'Une surcharge carburant est une redevance additionnelle liée aux fluctuations du carburant d\'aviation.',
  'index.guide.p2':'Les montants varient selon les compagnies et tranches de distance. Publiés début de mois pour le mois suivant.',
  'index.guide.p3':'Résultats basés sur les avis officiels. Confirmez toujours le montant final avant de réserver.',
  'index.guide.p1Landing':'La surcharge carburant est liée aux prix du pétrole et facturée séparément du tarif de base.',
  'index.guide.p2Landing':'Sélectionnez l\'origine et la destination pour comparer les montants officiels par compagnie.',
  'index.decision.title':'📢 Publication officielle Korean Air juin',
  'index.decision.line1':'✔ Publication officielle Korean Air juin complète — toutes zones en baisse vs mai',
  'index.decision.line2':'✔ Publications autres compagnies juin en cours — vérifier les canaux officiels',
  'index.decision.line3':'✔ Direction juillet : surveiller Brent, MOPS et taux de change',
  'index.decision.conclusion':'👉 Publication Korean Air juin confirmée · vérifier autres compagnies & direction juillet séparément',
  'index.landingTitle':'Surcharges carburant — Départs Corée',
  'index.krOnly.title':'Départs Corée uniquement',
  'index.krOnly.desc':'Sélectionnez départ et arrivée pour voir les montants officiels par compagnie.',
  'index.indexLink':'→ Voir l\'index complet des compagnies',
  'index.status.loading':'Chargement...','index.status.loadError':'Erreur de chargement',
  'index.status.scriptError':'Erreur de script',
  'index.status.updated':'Mis à jour: ','index.status.updatedSuffix':' · Publications officielles KE/OZ/LJ/BX/ZE juin2026',
  'index.filter.all':'Tout','index.filter.hasOfficialData':'Données officielles disponibles',
  'index.result.label':'Surcharge par compagnie',
  'index.result.noResults':'Aucun résultat',
  'index.result.onlyKoreaDeparture':'Seuls les départs depuis la Corée sont pris en charge',
  'index.result.overseasComingSoon':'Les départs hors Corée arrivent bientôt.',
  'index.result.overseasMeta':'Route hors Corée',
  'index.alert.selectAirports':'Veuillez sélectionner départ et destination',
  'index.alert.differentAirports':'Le départ et la destination doivent être différents',
  'index.meta.oneWay':'Aller simple','index.meta.roundTrip':'Aller-retour',
  'index.meta.suffix':'Départ Corée · Publications officielles KE/OZ/LJ/BX/ZE juin2026',
  'index.card.currentRoute':'Cette route',
  'index.card.notPublished':'August filing preparation','index.card.preAnnouncement':'Pending August filing',
  'index.card.groupTier':'Tarif groupe','index.card.usdNotice':'USD coté',
  'index.card.notOperated':'Non desservie','index.card.routeNotServed':'La compagnie ne dessert pas cette route',
  'index.card.viewOfficialNotice':'Avis officiel ↗',
  'index.card.noData':'Données indisponibles. Consultez le bouton avis officiel.',
  'index.card.compare':'Mai vs Juin (official)',
  'index.card.period':'2026.05','index.card.periodMay':'2026.06 Public.',
  'index.card.diff':'Écart',
  'index.card.periodNext':'Publication mois suivant',
  'index.card.fare':'Surcharge','index.card.distanceBand':'Tranche distance',
  'index.card.mayTrend':'vs mois préc.',
  'index.card.groupTierShort':'Groupe',
  'index.card.notListed':'Non publié','index.card.miniNotice':'Avis officiel ↗',
  /* news page */
  'news.pageTitle':'Actualités marché',
  /* CTA */
  'news.cta.desc':              '📍 Vérifiez les surcharges par route',
  'news.cta.main':              '👉 Rechercher la surcharge',
  'news.cta.airlines':          '👉 Comparer par compagnie',
  /* Cartes partenaires */
  'aff.cta':                    'Voir le prix →',
  'aff.hotelscombined.title':   'Vols et hôtels en une seule comparaison',
  'aff.hotelscombined.desc':    'Comparez les prix des vols et des hôtels pour réserver au meilleur moment',
  'aff.agoda.title':            'Hébergement adapté à votre itinéraire',
  'aff.agoda.desc':             'Trouvez et réservez rapidement le logement idéal pour votre voyage',
  'aff.usim.title':             'SIM de voyage',
  'aff.usim.desc':              'Indispensable avant le départ',
  'aff.hotels.title':           'Hôtels du monde entier',
  'aff.hotels.desc':            'Comparez et réservez des hôtels et hébergements dans le monde',
  'aff.myrealtrip.title':       'Après la surcharge, comparez aussi le prix total du billet',
  'aff.myrealtrip.desc':        'La surcharge s\'applique à la date d\'émission. Comparez les montants officiels de mai et juin avant de décider.',
  'aff.myrealtrip.cta':         'Vérifier le prix total maintenant',
  'news.pageSub':'Surcharge carburant · actualités marché, politique & compagnies aériennes · résumés IA',
  'news.predictTitle':'📊 Indicateurs de prévision IA',
  'news.officialTitle':'📢 Surcharge mai — Résumé confirmé (Référence pour juin)',
  'news.compareTitle':'📊 Comparaison mai vs juin (publications officielles)',
  'news.marketTitle':'🌍 Point marché (2026.05.21 09:00 KST)',
  'news.brent':'⛽ Brent: légèrement en repli par rapport aux récents sommets',
  'news.fx':'💱 USD/KRW: tentative de stabilisation dans la fourchette 1 440–1 450',
  'news.mops':'✈️ Kérosène/MOPS: tentative de repasser sous 500 cent',
  'news.geo':"🌍 Géopolitique: risques Moyen-Orient persistants (variable Hormuz/Iran)",
  'news.marketSummary':'→ Tentative de retournement baissier après la fin du cycle haussier',
  'news.fxDominance':"🌍 Variables pétrole & change à surveiller (zone de volatilité juin)",
  'news.decisionTitle':'📌 Guide de décision actuel',
  'news.decisionLine1':'→ Cycle haussier incertain — évolution conditionnelle aux variables pétrole & change',
  'news.decisionLine2':'→ Les coûts des compagnies aériennes restent élevés',
  'news.decisionShort':'👉 Vols courts : vérifier l\'annonce officielle avant réservation',
  'news.decisionMid':'👉 Vols moyens : Korean Air juin KRW 117 000–205 500',
  'news.decisionLong':'👉 Les variables pétrole & change peuvent faire évoluer la direction',
  /* Boîte CTA prévision juin */
  'news.forecastCta.title':'Prévision surcharge carburant juillet2026',
  'news.forecastCta.desc':'Basée sur les publications officielles KE/OZ/LJ/BX/ZE de juin, cette page résume la direction de la surcharge de juillet.',
  'news.forecastCta.btn':'Voir la prévision de juillet →',
  /* Mention base calcul juin */
  'news.basisTitle':'📅 Annonce surcharge juin',
  'news.basisBody':'Les annonces de juin seront publiées par chaque compagnie aérienne via leurs canaux officiels en mai.',
  'news.aiNotice':'Résumé IA — Le contenu de cette page est une référence organisée par IA sur la base de données publiques. Non officiel. Vérifiez toujours auprès des canaux officiels avant toute décision importante.',
  'news.filterAll':'Tout',
  'news.dataRef':        '✅ Publications officielles KE/OZ/LJ/BX/ZE/RS/7C juin complètes · Au2026.05.21 09:00 KST',
  'news.curSummaryTitle':'Résumé actuel (2026.05.07) :',
  'news.curSummary':     '→ Surcharge juin: direction incertaine (pétrole & change) — vérifier l\'annonce officielle',
  /* summary card i18n (fr — en content) */
  'news.summary.title':   '📌 Résumé clé — juin2026',
  'news.summary.updated': '🕐 Indicateurs marché au2026.05.21 09:00 KST',
  'news.summary.li1':     'Brent en légère baisse par rapport aux récents sommets',
  'news.summary.li2':     'Kérosène (MOPS) en tentative de repasser sous 500 cent',
  'news.summary.li3':     'USD/KRW en stabilisation dans la fourchette 1 440–1 450',
  'news.summary.li4':     'Risques géopolitiques au Moyen-Orient toujours présents',
  'news.summary.li5':     'Surcharge juin: variables pétrole & change à surveiller, vérifier annonce officielle',
  'news.summary.li6':     'Forte volatilité à court terme',
  'news.surchargeNote':  "※ La surcharge s'applique à la date d'émission du billet. Les publications juin de KE/OZ/LJ/BX/ZE/RS/7C ont été reflétées (2026.05.21).",
  'news.sectionPrev':    '📚 Actualités précédentes / Analyses passées',
  'news.sectionPrevSub': '※ Le contenu ci-dessous est une analyse de marché à la date de publication respective.',
  'news.newBadge':       'NEW',

  'news.filterInstitution':'Institutionnel',
  'news.filterMarket':'Marché',
  'news.disclaimer':'※ La surcharge s\'applique à la date de réservation. Vérifiez avant tout changement de prix.',
  'news.cat.airline':'Compagnie','news.cat.institution':'Institutionnel','news.cat.market':'Marché','news.cat.general':'Général',
  'news.impact.prefix':'→ Impact surcharge : ',
  /* predict box */
  'news.predict.subtitle':'Estimation basée sur les données',
  'news.predict.footnote':'* Surcharge de mai confirmée par avis officiel. Prévision juin = référence marché uniquement.',
  'news.predict.brentLabel':'Brent brut',
  'news.predict.mopsLabel':'Kérosène Singapour (MOPS)',
  'news.predict.mopsValue':'Rebond en cours après repli limité, toujours élevé',
  'news.predict.fxLabel':'Taux USD/KRW',
  'news.predict.fxUnit':'',
  'news.predict.fxArrow':'→',
  'news.predict.brentUnit':'/ baril',
  'news.predict.geoLabel':'Risque géopolitique',
  'news.predict.geoValue':'Risques Moyen-Orient et incertitudes d\'approvisionnement persistants',
  'news.predict.outlookLabel':'prévision surcharge',
  'news.predict.outlook.flat':'Stable ou légère hausse probable',
  'news.predict.outlook.up':'Hausse probable',
  'news.predict.outlook.down':'Baisse probable',
  /* month names */
  'month.1':'Jan','month.2':'Fév','month.3':'Mar','month.4':'Avr',
  'month.5':'Mai','month.6':'Juin','month.7':'Juil','month.8':'Août',
  'month.9':'Sep','month.10':'Oct','month.11':'Nov','month.12':'Déc',
  /* common */
  'common.noData':'Aucune donnée',
  'common.status':'Statut',
  'common.loading':'Chargement des actualités...',
  'common.aiSummaryBadge':'Résumé IA',
  'common.emptyAll':'Aucune mise à jour majeure disponible',
  'common.emptyAllSub':'Collecte de données en cours',
  'common.emptyFilter':'Aucune actualité dans cette catégorie',
  /* official summary */
  'news.official.ke':'Korean Air — Tous les itinéraires en baisse vs mai (publication juin complète)',
  'news.official.oz':'Asiana Airlines — Tous les itinéraires en baisse vs mai (publication juin complète)',
  'news.official.lj':'Jin Air — Baisse vs mai (USD 42→36, 140→115)',
  'news.official.7c':'Jeju Air — Publication juin complète ✅ (mai→juin: max USD 126→104, baisse tous itinéraires)',
  'news.official.bx':'Air Busan — Baisse vs mai (USD 52→43, 126→106)',
  'news.official.ze':'Eastar Jet — Tous les itinéraires en baisse vs mai (USD 52→43, 126→103)',
  'news.official.rs':'Air Seoul — Baisse sur toutes les tranches vs mai (KRW 94 500→75 300 / KRW 165 000→132 800)',
  'news.official.tw':'T\'way Air — Publication juin complète',
  'news.official.yp':'Air Premia — publication USD juin reflétée · court ICN-NRT USD 59→48 / long New York·Washington D.C. USD 365→296',
  'news.official.desc':'* Publications juin KE/OZ/LJ/BX/ZE/RS/TW/7C/YP complètes · Baisse vs mai · Air Premia USD inclus',
  /* compare box */
  'news.compare.li1':'Korean Air : tous en baisse vs mai (court ₩75 000→₩61 500, long ₩564 000→₩451 500)',
  'news.compare.li2':'Asiana : tous en baisse (court ₩85 400→₩68 000, long ₩476200→₩382 800)',
  'news.compare.li3':'Jin Air : tous en baisse (USD 42→36, 140→115)',
  'news.compare.li4':'Air Busan : tous en baisse (USD 52→43, 126→106)',
  'news.compare.li5':'Eastar Jet : tous en baisse (USD 52→43, 126→103)',
  'news.compare.li6':'Air Seoul : tous en baisse (KRW 94 500→75 300 / KRW 165 000→132 800)',
  'news.compare.li7':'Jeju Air : publication juin complète ✅ — tous en baisse (USD 52→42, USD 126→104)',
  'news.compare.li8':'T\'way Air : publication KRW de juin reflétée',
  'news.compare.li9':'Ensemble : publications juin KE/OZ/LJ/BX/ZE/RS/TW/7C/YP reflétées — baisses vs mai confirmées',
  /* fixed news cards */
  'news.fixed.20260420.title':'Le pétrole continue de baisser — perspectives juin incertaines, surveiller l\'annonce officielle',
  'news.fixed.20260420.summary':'Le Brent reste sous pression après les niveaux bas des $80. Le taux USD/KRW se stabilise légèrement malgré un niveau encore élevé, mais les variables pétrole & change rendent la direction de juin incertaine — vérifier l\'annonce officielle.',
  'news.fixed.20260420.impact':'Pression à la baisse renforcée',
  'news.fixed.20260417.title':'Jin Air et Jeju Air relèvent la surcharge carburant de mai',
  'news.fixed.20260417.summary':'Après Korean Air et Asiana, Jin Air et Jeju Air ont relevé les tarifs sur tous les itinéraires. Certaines tranches ont presque doublé vs avril.',
  'news.fixed.20260417.impact':'Pic de tarification verrouillé',
  'news.fixed.20260416.title':'Surcharge carburant internationale de mai à un niveau record',
  'news.fixed.20260416.summary':'Niveau le plus élevé depuis l\'introduction du système proportionnel à la distance ; la plupart des compagnies ont relevé tous les itinéraires.',
  'news.fixed.20260416.impact':'Sommet du cycle de surcharge',
  'news.fixed.20260415.title':'Les tensions au Moyen-Orient font flamber le pétrole',
  'news.fixed.20260415.summary':'Le Brent a dépassé 90$, alourdissant les coûts de carburant des compagnies aériennes.',
  'news.fixed.20260415.impact':'Pression à la hausse',
  'news.fixed.20260418a.title':'Le pétrole chute après la désescalade dans le détroit d\'Ormuz',
  'news.fixed.20260418a.summary':'Les espoirs d\'apaisement des tensions au Moyen-Orient ont précipité le Brent dans les $80 bas.',
  'news.fixed.20260418a.impact':'Pression baissière émergente (possible impact juin)',
  'news.fixed.20260418b.title':'USD/KRW se maintient à 1 470',
  'news.fixed.20260418b.summary':'Un taux de change élevé maintient les pressions sur les coûts des compagnies aériennes.',
  'news.fixed.20260418b.impact':'Facteur limitant les baisses de surcharge',
  'news.fixed.20260507a.title':'Léger repli du pétrole… volatilité de la surcharge juin élevée, surveiller l\'annonce officielle',
  'news.fixed.20260507a.summary':'Le Brent et le kérosène reculent légèrement par rapport aux sommets, mais les variables de change et les risques au Moyen-Orient persistent. La direction de la surcharge de juin reste incertaine — confirmer avec l\'annonce officielle de chaque compagnie.',
  'news.fixed.20260507a.impact':'Pression baissière renforcée',
  'news.fixed.20260507b.title':'Pression sur les coûts des compagnies aériennes… vigilance sur les variables change et pétrole',
  'news.fixed.20260507b.summary':'Le taux de change s\'est légèrement stabilisé mais reste élevé ; les compagnies restent vigilantes face aux coûts de carburant et aux variables au Moyen-Orient.',
  'news.fixed.20260507b.impact':'Volatilité maintenue',
  'news.fixed.src.marketUpdate':'Market Update',
  'news.fixed.src.airlineIndustry':'Airline Industry',
  'news.fixed.src.airlineNotice':'Avis compagnie',
  'news.fixed.src.marketSummary':'Synthèse marché',
  'news.fixed.src.marketSummaryEn':'Market Summary',
  'news.fixed.src.marketBreaking':'Market Breaking',
  'news.fixed.src.fxMarket':'FX Market',
  /* page meta */
  'news.metaTitle':'Actualités marché — Tendances surcharge carburant aérien',
  'news.metaDesc':'Informations sur les surcharges carburant liées au pétrole, au taux de change et aux politiques. Résumés IA pour des décisions de réservation éclairées.',
  /* footer */
  'news.footer.notice':'Le contenu de cette page est une référence basée sur des données publiques. Vérifiez les canaux officiels avant toute décision importante.',
  'news.footer.contact':'Contact',
  /* klook affiliate */
  'klook.title':'✈️ Les coûts du voyage vont au-delà du billet',
  'klook.desc':'Si les surcharges carburant pèsent sur votre budget, anticiper les coûts des tours et activités locaux peut vous aider à mieux gérer vos dépenses globales.',
  'klook.btn':'Voir comment réduire les coûts de voyage →',
  'klook.inline':'Si le prix du billet vous préoccupe, découvrez des moyens de réduire vos coûts de voyage globaux',
  'klook.inlineLink':'Voir comment réduire les coûts de voyage',
  /* Liens rapides section SEO */
  'index.quick.title':'🔗 Liens rapides — Surcharge carburant',
  'index.quick.korea.name':'Surcharge carburant — Départ Corée',
  'index.quick.korea.desc':'Comparer toutes les compagnies coréennes',
  'index.quick.compare.name':'Comparaison surcharge mai → juin2026',
  'index.quick.compare.desc':'Tarifs de mai appliqués vs publication officielle de juin par compagnie',
  'index.quick.graph.name':'Graphique des tendances de surcharge',
  'index.quick.graph.desc':'Hausse/baisse mensuelle',
  'index.quick.calc.name':'Guide de calcul de la surcharge',
  'index.quick.calc.desc':'Règles et méthode de vérification',
  'index.quick.ke.name':'Korean Air — Surcharge carburant',
  'index.quick.ke.desc':'KE — Détails des avis mensuels',
  'index.quick.oz.name':'Asiana Airlines — Surcharge carburant',
  'index.quick.oz.desc':'OZ — Détails des avis mensuels',
  'index.quick.7c.name':'Jeju Air — Surcharge carburant',
  'index.quick.7c.desc':'7C — Détails des avis mensuels',
  'index.quick.lj.name':'Jin Air — Surcharge carburant',
  'index.quick.lj.desc':'LJ — Détails des avis mensuels',
  'index.quick.tw.name':"T'way Air — Surcharge carburant",
  'index.quick.tw.desc':'TW — Détails des avis mensuels',
},
de:{
  'nav.routes':'Streckensuche','nav.calc':'Rechner','nav.airlines':'Airline-Index','nav.news':'Nachrichten',
  'footer.notice':'Treibstoffzuschlag-Daten dienen nur als Referenz. Bitte bestätigen Sie den endgültigen Betrag bei der Fluggesellschaft.',
  'footer.about':'Über uns','footer.privacy':'Datenschutz','footer.terms':'Nutzungsbedingungen',
  'index.title':'Treibstoffzuschlag — Internationale Flüge ab Korea',
  'index.metaDesc':'Vergleichen Sie Treibstoffzuschläge nach Fluggesellschaft für internationale Flüge ab Korea.',
  'index.heroTitle':'Treibstoffzuschlag nach Strecke',
  'index.heroSub':'Offizielle Bekanntgaben und Marktindikatoren prüfen — streckenweise vergleichen.',
  'index.labelOrigin':'Abflughafen','index.labelDest':'Ankunftsflughafen','index.labelTrip':'Reiseart',
  'index.trip.oneWay':'Einfach','index.trip.roundTrip':'Hin und zurück',
  'index.search':'🔍 Buchungszeitpunkt prüfen',
  'index.signal1':'📢 Offizielle Bekanntgabe Korean Air Juni',
  'index.signal2':'✈️ Aktueller Zuschlag je Strecke',
  'index.signal3':'⏱️ Buchungszeitpunkt bestimmen',
  'index.airport.selectOrigin':'Abflug wählen','index.airport.selectDest':'Ziel wählen',
  'index.airport.searchOriginPlaceholder':'Flughafenname oder Code eingeben (z. B. Seoul, ICN)',
  'index.airport.searchDestPlaceholder':'Flughafenname oder Code eingeben (z. B. Tokio, HND)',
  'index.airport.searchOriginAria':'Abflughafen suchen',
  'index.airport.searchDestAria':'Zielflughafen suchen',
  'index.airport.noSearchResults':'Keine Ergebnisse',
  'common.clear':'Löschen',
  'index.region.korea':'🇰🇷 Korea','index.region.japan':'🇯🇵 Japan',
  'index.region.asia':'🌏 Asien','index.region.usa':'🇺🇸 USA','index.region.canada':'🇨🇦 Kanada',
  'index.region.australia':'🇦🇺 Australien','index.region.newzealand':'🇳🇿 Neuseeland','index.region.oceania':'🇦🇺 Ozeanien',
  'index.region.europeMiddleEast':'🇪🇺 Europa & Naher Osten',
  'airport.ICN':'Seoul Incheon','airport.GMP':'Seoul Gimpo','airport.PUS':'Busan','airport.CJU':'Jeju',
  'airport.NRT':'Tokio Narita','airport.HND':'Tokio Haneda','airport.KIX':'Osaka',
  'airport.FUK':'Fukuoka','airport.CTS':'Sapporo',
  'airport.HKG':'Hongkong','airport.SIN':'Singapur','airport.BKK':'Bangkok','airport.MNL':'Manila',
  'airport.KUL':'Kuala Lumpur','airport.SGN':'Ho-Chi-Minh-Stadt','airport.HAN':'Hanoi',
  'airport.DAD':'Da Nang','airport.DPS':'Bali','airport.CGK':'Jakarta','airport.PVG':'Shanghai','airport.PEK':'Peking',
  'airport.TAS':'Taschkent','airport.TXG':'Taichung',
  'airport.LAX':'Los Angeles','airport.JFK':'New York JFK','airport.EWR':'Newark / New York','airport.SFO':'San Francisco',
  'airport.SEA':'Seattle','airport.SYD':'Sydney',
  'airport.CDG':'Paris','airport.LHR':'London','airport.FRA':'Frankfurt',
  'airport.AMS':'Amsterdam','airport.DXB':'Dubai',
  'beta.title':'Beta-Service Hinweis',
  'beta.desc':'Treibstoffzuschläge für internationale Flüge ab Korea. Endgültigen Betrag bei der Fluggesellschaft bestätigen.',
  'beta.note':'※ Derzeit nur Korea-Abflüge unterstützt. Auslandsabflüge folgen bald.',
  'index.intro1.title':'Treibstoffzuschlag-Vergleich für Korea-Abflüge',
  'index.intro1.body':'Dieser Service vergleicht Treibstoffzuschläge nach Fluggesellschaft für internationale Flüge ab koreanischen Flughäfen.',
  'index.intro2.title':'Daten basierend auf offiziellen Mitteilungen',
  'index.intro2.body':'Monatliche offizielle Mitteilungen werden priorisiert. Verifizierte Airlines werden mit "Offiziell bestätigt" gekennzeichnet.',
  'index.intro3.title':'Warum dieser Service?',
  'index.intro3.body':'Treibstoffzuschläge sind ein erheblicher Teil des Flugpreises. Dieser Service aggregiert offizielle Mitteilungen auf einer Seite.',
  'index.guide.title':'💡 Was ist ein Treibstoffzuschlag?',
  'index.guide.p1':'Ein Treibstoffzuschlag ist eine zusätzliche Gebühr, die Fluggesellschaften neben dem Grundtarif erheben.',
  'index.guide.p2':'Beträge variieren je nach Fluggesellschaft und Distanzbereich. Für den Folgemonat werden sie zu Beginn jeden Monats veröffentlicht.',
  'index.guide.p3':'Ergebnisse basieren auf offiziellen Mitteilungen. Bestätigen Sie immer den endgültigen Betrag vor der Buchung.',
  'index.guide.p1Landing':'Der Treibstoffzuschlag ist an internationale Ölpreise gebunden und wird separat vom Grundtarif erhoben.',
  'index.guide.p2Landing':'Wählen Sie Abflug und Ziel, um offizielle Beträge nach Fluggesellschaft zu vergleichen.',
  'index.decision.title':'📢 Offizielle Bekanntgabe Korean Air Juni',
  'index.decision.line1':'✔ Offizielle Bekanntgabe Korean Air Juni komplett — alle Bänder ggü. Mai gesunken',
  'index.decision.line2':'✔ Juni-Bekanntgaben anderer Airlines laufen — jeweiligen offiziellen Kanal prüfen',
  'index.decision.line3':'✔ Juli-Richtung: Brent, MOPS und Wechselkurs beobachten',
  'index.decision.conclusion':'👉 Korean Air Juni bestätigt · andere Airlines & Juli-Richtung separat prüfen',
  'index.landingTitle':'Treibstoffzuschläge — Korea-Abflüge',
  'index.krOnly.title':'Nur Korea-Abflüge',
  'index.krOnly.desc':'Wählen Sie Abflug und Ziel in der Streckensuche, um offizielle Beträge zu sehen.',
  'index.indexLink':'→ Vollständigen Airline-Index ansehen',
  'index.status.loading':'Daten werden geladen...','index.status.loadError':'Fehler beim Laden',
  'index.status.scriptError':'Skriptfehler',
  'index.status.updated':'Aktualisiert: ','index.status.updatedSuffix':' · Offizielle Bekanntgaben KE/OZ/LJ/BX/ZE Juni2026',
  'index.filter.all':'Alle','index.filter.hasOfficialData':'Offizielle Daten vorhanden',
  'index.result.label':'Treibstoffzuschlag nach Fluggesellschaft',
  'index.result.noResults':'Keine Ergebnisse',
  'index.result.onlyKoreaDeparture':'Derzeit werden nur Korea-Abflüge unterstützt',
  'index.result.overseasComingSoon':'Abflüge aus dem Ausland folgen bald.',
  'index.result.overseasMeta':'Route mit Auslandsabflug',
  'index.alert.selectAirports':'Bitte Abflug und Ziel auswählen',
  'index.alert.differentAirports':'Abflug und Ziel müssen unterschiedlich sein',
  'index.meta.oneWay':'Einfach','index.meta.roundTrip':'Hin und zurück',
  'index.meta.suffix':'Korea-Abflug · Offizielle Bekanntgaben KE/OZ/LJ/BX/ZE Juni2026',
  'index.card.currentRoute':'Diese Strecke',
  'index.card.notPublished':'August filing preparation','index.card.preAnnouncement':'Pending August filing',
  'index.card.groupTier':'Gruppenpreis','index.card.usdNotice':'USD-notiert',
  'index.card.notOperated':'Nicht betrieben','index.card.routeNotServed':'Diese Fluggesellschaft betreibt diese Strecke nicht',
  'index.card.viewOfficialNotice':'Offizielle Mitteilung ↗',
  'index.card.noData':'Offizielle Daten nicht verfügbar. Bitte über den offiziellen Hinweis-Button prüfen.',
  'index.card.compare':'Mai vs Jun (offiziell)',
  'index.card.period':'2026.05','index.card.periodMay':'2026.06 Offiziell',
  'index.card.diff':'Differenz',
  'index.card.periodNext':'Bekanntgabe nächsten Monat',
  'index.card.fare':'Zuschlag','index.card.distanceBand':'Distanzbereich',
  'index.card.mayTrend':'Vgl. Vormonat',
  'index.card.groupTierShort':'Gruppe',
  'index.card.notListed':'Nicht veröff.','index.card.miniNotice':'Offizielle Mitteilung ↗',
  /* news page */
  'news.pageTitle':'Markt-News',
  /* CTA */
  'news.cta.desc':              '📍 Zuschläge nach Strecke prüfen',
  'news.cta.main':              '👉 Zuschlag suchen',
  'news.cta.airlines':          '👉 Nach Airline vergleichen',
  /* Partnerkarten */
  'aff.cta':                    'Preis prüfen →',
  'aff.hotelscombined.title':   'Flüge & Hotels auf einmal vergleichen',
  'aff.hotelscombined.desc':    'Flug- und Hotelpreise gemeinsam vergleichen für optimales Buchungstiming',
  'aff.agoda.title':            'Unterkunft passend zum Flug buchen',
  'aff.agoda.desc':             'Passende Unterkunft schnell finden und in einem Schritt buchen',
  'aff.usim.title':             'Reise-SIM-Karte',
  'aff.usim.desc':              'Vor der Abreise unbedingt',
  'aff.hotels.title':           'Unterkünfte weltweit — einfach buchen',
  'aff.hotels.desc':            'Hotels und Unterkünfte vergleichen und sofort buchen',
  'aff.myrealtrip.title':       'Nach dem Zuschlag auch den Gesamtpreis vergleichen',
  'aff.myrealtrip.desc':        'Zuschläge gelten ab Ausstellungsdatum. Vergleichen Sie die offiziellen Mai- und Juni-Beträge, bevor Sie buchen.',
  'aff.myrealtrip.cta':         'Gesamtpreis jetzt prüfen',
  'news.pageSub':'Treibstoffzuschlag · Markt-, Politik- & Airline-Updates · KI-Zusammenfassung · Prognosebasis',
  'news.predictTitle':'📊 KI-Prognose Indikatoren',
  'news.officialTitle':'📢 Mai Treibstoffzuschlag — Bestätigte Zusammenfassung (Referenz für Juni)',
  'news.compareTitle':'📊 Mai vs. Juni Vergleich (Offizielle Bekanntgaben)',
  'news.marketTitle':'🌍 Marktüberblick (2026.05.21 09:00 KST)',
  'news.brent':'⛽ Brent-Rohöl: leichter Rückgang gegenüber den jüngsten Hochs',
  'news.fx':'💱 USD/KRW: Stabilisierungsversuch im Bereich 1.440–1.450',
  'news.mops':'✈️ Kerosin/MOPS: Versuch, wieder unter 500 Cent zu fallen',
  'news.geo':'🌍 Geopolitik: Nahost-Risiken bestehen (Hormuz/Iran-Variable)',
  'news.marketSummary':'→ Abwärtswendeversuch nach Ende des Aufwärtszyklus',
  'news.fxDominance':'🌍 Öl- & Wechselkursvariablen im Blick behalten (Juni-Volatilitätszone)',
  'news.decisionTitle':'📌 Aktuelle Entscheidungshilfe',
  'news.decisionLine1':'→ Ende des Aufwärtszyklus ungewiss — Richtung abhängig von Öl- & Wechselkursvariablen',
  'news.decisionLine2':'→ Kostenbelastung der Fluggesellschaften bleibt hoch',
  'news.decisionShort':'👉 Kurzstrecke: offizielle Bekanntgabe vor der Buchung prüfen',
  'news.decisionMid':'👉 Langstrecke: Juni-Bekanntgabe und Marktindikatoren abwarten',
  'news.decisionLong':'👉 Öl- & Wechselkursvariablen können die Richtung in beide Seiten verschieben',
  /* Forecast CTA Box Juni */
  'news.forecastCta.title':'Prognose Treibstoffzuschlag Juli2026',
  'news.forecastCta.desc':'Basierend auf den offiziellen Bekanntgaben von KE/OZ/LJ/BX/ZE für Juni fasst diese Seite die Juli-Zuschlagsrichtung zusammen.',
  'news.forecastCta.btn':'Juli-Prognose ansehen →',
  /* Hinweis Juni-Basis */
  'news.basisTitle':'📅 Hinweis Juni-Zuschlag',
  'news.basisBody':'Die Juni-Mitteilungen werden von jeder Airline über ihre offiziellen Kanäle im Mai veröffentlicht.',
  'news.aiNotice':'KI-Zusammenfassung — Inhalte dieser Seite sind KI-aufbereitete Referenzinformationen auf Basis öffentlicher Daten. Nicht offiziell. Bitte immer offizielle Kanäle der Fluggesellschaft prüfen.',
  'news.filterAll':'Alle',
  'news.dataRef':        '✅ Offizielle KE/OZ/LJ/BX/ZE/RS/7C Juni-Bekanntgaben vollständig · Stand2026.05.21 09:00 KST',
  'news.curSummaryTitle':'Aktuelle Zusammenfassung (2026.05.07):',
  'news.curSummary':     '→ Juni-Zuschlag: Richtung ungewiss (Öl & Wechselkurs) — offizielle Bekanntgabe prüfen',
  /* summary card i18n (de) */
  'news.summary.title':   '📌 Juni2026 Kernzusammenfassung',
  'news.summary.updated': '🕐 Marktdaten vom2026.05.21 09:00 KST',
  'news.summary.li1':     'Brent-Rohöl leicht gesunken gegenüber den jüngsten Hochs',
  'news.summary.li2':     'Kerosin (MOPS) versucht, wieder unter 500 Cent zu fallen',
  'news.summary.li3':     'USD/KRW stabilisiert sich im Bereich 1.440–1.450',
  'news.summary.li4':     'Geopolitische Risiken im Nahen Osten bestehen weiterhin',
  'news.summary.li5':     'Juni-Zuschlag: Öl- & Wechselkursvariablen beobachten, offizielle Bekanntgabe prüfen',
  'news.summary.li6':     'Kurzfristige Volatilität sehr hoch',
  'news.surchargeNote':  '※ Der Treibstoffzuschlag gilt ab dem Ausstellungsdatum. Die Juni-Bekanntgaben von KE/OZ/LJ/BX/ZE/RS/7C wurden berücksichtigt (2026.05.21).',
  'news.sectionPrev':    '📚 Frühere Nachrichten / Frühere Analysen',
  'news.sectionPrevSub': '※ Die folgenden Inhalte sind Marktanalysen zum jeweiligen Veröffentlichungszeitpunkt.',
  'news.newBadge':       'NEW',

  'news.filterInstitution':'Institutionell',
  'news.filterMarket':'Markt',
  'news.disclaimer':'※ Treibstoffzuschläge gelten zum Buchungszeitpunkt. Bitte vor Preisänderungen prüfen.',
  'news.cat.airline':'Airline','news.cat.institution':'Institutionell','news.cat.market':'Markt','news.cat.general':'Allgemein',
  'news.impact.prefix':'→ Auswirkung auf Zuschlag: ',
  /* predict box */
  'news.predict.subtitle':'Datenbasierte Schätzung',
  'news.predict.footnote':'* KE/OZ/LJ/BX Juni-Bekanntgaben bestätigt. Juli-Prognose nur als Marktdaten-Referenz.',
  'news.predict.brentLabel':'Brent-Rohöl',
  'news.predict.mopsLabel':'Singapur-Kerosin (MOPS)',
  'news.predict.mopsValue':'Erholung nach Korrektur, weiterhin hohes Niveau',
  'news.predict.fxLabel':'USD/KRW-Kurs',
  'news.predict.fxUnit':'',
  'news.predict.fxArrow':'→',
  'news.predict.brentUnit':'/ Barrel',
  'news.predict.geoLabel':'Geopolitisches Risiko',
  'news.predict.geoValue':'Nahost-Risiken und Versorgungsunsicherheiten anhaltend',
  'news.predict.outlookLabel':'Zuschlag-Ausblick',
  'news.predict.outlook.flat':'Stabil oder begrenzte Erhöhung wahrscheinlich',
  'news.predict.outlook.up':'Anstieg wahrscheinlich',
  'news.predict.outlook.down':'Rückgang wahrscheinlich',
  /* month names */
  'month.1':'Jan','month.2':'Feb','month.3':'Mär','month.4':'Apr',
  'month.5':'Mai','month.6':'Jun','month.7':'Jul','month.8':'Aug',
  'month.9':'Sep','month.10':'Okt','month.11':'Nov','month.12':'Dez',
  /* common */
  'common.noData':'Keine Daten',
  'common.status':'Status',
  'common.loading':'Nachrichten werden geladen...',
  'common.aiSummaryBadge':'KI-Zusammenfassung',
  'common.emptyAll':'Keine wichtigen Updates verfügbar',
  'common.emptyAllSub':'Datenerfassung läuft',
  'common.emptyFilter':'Keine Nachrichten in dieser Kategorie',
  /* official summary */
  'news.official.ke':'Korean Air — Alle Strecken gegenüber Mai gesenkt (Juni-Mitteilung vollständig)',
  'news.official.oz':'Asiana Airlines — Alle Strecken gegenüber Mai gesenkt (Juni-Mitteilung vollständig)',
  'news.official.lj':'Jin Air — Alle Strecken gesenkt vs Mai (USD 42→36, 140→115)',
  'news.official.7c':'Jeju Air — Juni-Mitteilung vollständig ✅ (Mai→Juni: max USD 126→104, alle Bänder gesunken)',
  'news.official.bx':'Air Busan — Alle Strecken gesenkt vs Mai (USD 52→43, 126→106)',
  'news.official.ze':'Eastar Jet — Alle Strecken gesenkt vs Mai (USD 52→43, 126→103)',
  'news.official.rs':'Air Seoul — Alle Strecken gesunken vs Mai (KRW 94.500→75.300 / KRW 165.000→132.800)',
  'news.official.tw':'T\'way Air — Juni-Mitteilung vollständig',
  'news.official.yp':'Air Premia — Juni-USD-Mitteilung berücksichtigt · Kurzstrecke ICN-NRT USD 59→48 / Langstrecke New York·Washington D.C. USD 365→296',
  'news.official.desc':'* KE/OZ/LJ/BX/ZE/RS/TW/7C/YP Juni-Mitteilungen vollständig · Senkungen vs Mai · Air Premia USD enthalten',
  /* compare box */
  'news.compare.li1':'Korean Air: alle Strecken gesunken (kurz ₩75.000→₩61.500, lang ₩564.000→₩451.500)',
  'news.compare.li2':'Asiana: alle Strecken gesunken (kurz ₩85.400→₩68.000, lang ₩476.200→₩382.800)',
  'news.compare.li3':'Jin Air: alle gesunken (USD 42→36, 140→115)',
  'news.compare.li4':'Air Busan: alle gesunken (USD 52→43, 126→106)',
  'news.compare.li4b':'Eastar Jet: alle gesunken (USD 52→43, 126→103)',
  'news.compare.li5':'Eastar Jet: alle gesunken (USD 52→43, 126→103)',
  'news.compare.li6':'Air Seoul: alle gesunken (KRW 94.500→75.300 / KRW 165.000→132.800)',
  'news.compare.li7':'Jeju Air: Juni-Mitteilung vollständig ✅ — alle Bänder gesunken (USD 52→42, USD 126→104)',
  'news.compare.li8':'T\'way Air: Juni-KRW-Mitteilung berücksichtigt',
  'news.compare.li9':'Insgesamt: KE/OZ/LJ/BX/ZE/RS/TW/7C/YP Juni-Mitteilungen berücksichtigt — Senkungen vs Mai bestätigt',
  /* fixed news cards */
  'news.fixed.20260420.title':'Ölpreise fallen weiter — Juni-Aussichten ungewiss, offizielle Bekanntgabe im Blick behalten',
  'news.fixed.20260420.summary':'Brent-Rohöl setzt den Rückgang nach dem Tief in den unteren 80 $ fort. USD/KRW stabilisiert sich leicht trotz erhöhtem Niveau; die Wahrscheinlichkeit einer Senkung oder eines stabilen Zuschlags im Juni nimmt zu.',
  'news.fixed.20260420.impact':'Abwärtsdruck verstärkt sich',
  'news.fixed.20260417.title':'Jin Air & Jeju Air erhöhen Mai-Treibstoffzuschlag',
  'news.fixed.20260417.summary':'Nach Korean Air und Asiana haben auch Jin Air und Jeju Air die Zuschläge auf allen Strecken erhöht. Einige Bänder sind fast doppelt so hoch wie im April.',
  'news.fixed.20260417.impact':'Höchstpreis eingepreist',
  'news.fixed.20260416.title':'Mai-Auslandstreibstoffzuschlag auf Rekordhoch',
  'news.fixed.20260416.summary':'Höchste Stufe seit Einführung des entfernungsbasierten Systems angewendet; die meisten Airlines haben alle Strecken erhöht.',
  'news.fixed.20260416.impact':'Zuschlagzyklus-Höhepunkt',
  'news.fixed.20260415.title':'Nahost-Spannungen treiben Ölpreis stark nach oben',
  'news.fixed.20260415.summary':'Brent-Rohöl überschritt 90 $, Flugzeugkraftstoffkosten steigen.',
  'news.fixed.20260415.impact':'Aufwärtsdruck',
  'news.fixed.20260418a.title':'Ölpreis stürzt nach Hormus-Entspannung ab',
  'news.fixed.20260418a.summary':'Hoffnungen auf Nahost-Entspannung ließen Brent-Rohöl in die unteren 80 $ fallen.',
  'news.fixed.20260418a.impact':'Abwärtsdruck entsteht (Juni-Auswirkung möglich)',
  'news.fixed.20260418b.title':'USD/KRW hält sich bei 1.470',
  'news.fixed.20260418b.summary':'Erhöhter Wechselkurs hält Kostendruck auf Airlines aufrecht.',
  'news.fixed.20260418b.impact':'Begrenzender Faktor für Zuschlagsenkungen',
  'news.fixed.20260507a.title':'Ölpreise geben etwas nach… Juni-Zuschlag-Volatilität erhöht, offizielle Bekanntgabe abwarten',
  'news.fixed.20260507a.summary':'Brent-Rohöl und Kerosin sind leicht von den Hochs zurückgegangen, aber Wechselkurs- und Nahost-Risiken bleiben bestehen. Die Richtung des Juni-Zuschlags ist ungewiss — bitte offizielle Airline-Bekanntgaben prüfen.',
  'news.fixed.20260507a.impact':'Abwärtsdruck verstärkt sich',
  'news.fixed.20260507b.title':'Kostenbelastung der Airlines hält an… Wechselkurs- und Öl-Variablen im Blick',
  'news.fixed.20260507b.summary':'Der Wechselkurs hat sich etwas stabilisiert, bleibt aber erhöht; die Airlines sind weiterhin wachsam gegenüber Kraftstoffkosten und Nahost-Variablen.',
  'news.fixed.20260507b.impact':'Volatilität bleibt bestehen',
  'news.fixed.src.marketUpdate':'Market Update',
  'news.fixed.src.airlineIndustry':'Airline Industry',
  'news.fixed.src.airlineNotice':'Airline-Mitteilung',
  'news.fixed.src.marketSummary':'Marktzusammenfassung',
  'news.fixed.src.marketSummaryEn':'Market Summary',
  'news.fixed.src.marketBreaking':'Market Breaking',
  'news.fixed.src.fxMarket':'FX Market',
  /* page meta */
  'news.metaTitle':'Markt-News — Treibstoffzuschlag-Trends | Öl · Wechselkurs · Politik',
  'news.metaDesc':'Treibstoffzuschlag-Updates zu Ölpreisen, Wechselkursen und Politikänderungen. KI-Zusammenfassungen für fundierte Buchungsentscheidungen.',
  /* footer */
  'news.footer.notice':'Inhalte dieser Seite sind Referenzinformationen auf Basis öffentlicher Daten. Bitte offizielle Kanäle vor wichtigen Entscheidungen prüfen.',
  'news.footer.contact':'Kontakt',
  /* klook affiliate */
  'klook.title':'✈️ Reisekosten sind mehr als nur das Ticket',
  'klook.desc':'Wenn Treibstoffzuschläge Ihr Budget belasten, hilft es, die Kosten für lokale Touren und Aktivitäten im Voraus zu kennen – für eine bessere Gesamtplanung.',
  'klook.btn':'Wege zur Kostensenkung entdecken →',
  'klook.inline':'Wenn der Ticketpreis zu hoch erscheint, entdecken Sie Möglichkeiten, Ihre Gesamtreisekosten zu senken',
  'klook.inlineLink':'Wege zur Kostensenkung entdecken',
  /* Schnellzugriff SEO-Bereich */
  'index.quick.title':'🔗 Schnellzugriff — Treibstoffzuschlag',
  'index.quick.korea.name':'Treibstoffzuschlag — Korea-Abflug',
  'index.quick.korea.desc':'Alle koreanischen Airlines vergleichen',
  'index.quick.compare.name':'Vergleich Mai → Juni2026 Treibstoffzuschlag',
  'index.quick.compare.desc':'Mai-Tarife vs. offizielle Juni-Bekanntgaben je Airline',
  'index.quick.graph.name':'Zuschlag-Trendgrafik',
  'index.quick.graph.desc':'Monatliche Steigerungen/Senkungen',
  'index.quick.calc.name':'Berechnungsanleitung',
  'index.quick.calc.desc':'Berechnungsregeln und Prüfmethode',
  'index.quick.ke.name':'Korean Air — Treibstoffzuschlag',
  'index.quick.ke.desc':'KE — Monatliche Mitteilungsdetails',
  'index.quick.oz.name':'Asiana Airlines — Treibstoffzuschlag',
  'index.quick.oz.desc':'OZ — Monatliche Mitteilungsdetails',
  'index.quick.7c.name':'Jeju Air — Treibstoffzuschlag',
  'index.quick.7c.desc':'7C — Monatliche Mitteilungsdetails',
  'index.quick.lj.name':'Jin Air — Treibstoffzuschlag',
  'index.quick.lj.desc':'LJ — Monatliche Mitteilungsdetails',
  'index.quick.tw.name':"T'way Air — Treibstoffzuschlag",
  'index.quick.tw.desc':'TW — Monatliche Mitteilungsdetails',
},
}; /* end I18N */

/*2026.05.28 06:45 KST latest market brief.
   June 2026 filings remain confirmed baseline data. July 2026 stays a forecast. */
window.AERO_MARKET_BRIEF_20260528 = {
  id: 'market-brief-20260528-0645',
  timestamp: '2026-05-28T06:45:00+09:00',
  displayTime: '2026.05.28 06:45 KST',
  badge: 'LATEST',
  currentMonthNotice: '2026-06',
  forecastTargetMonth: '2026-07',
  summary: '2026.05.28 06:45 KST 기준 2026년 6월 유류할증료 공시는 확정 데이터로 유지하고, 콘텐츠 중심은 2026년 7월 유류할증료 전망입니다. 브렌트유는 5월 초 급등 이후 고점 대비 완화 흐름이지만 중동 리스크 프리미엄이 완전히 사라진 것은 아닙니다. 원달러 환율은 여전히 높은 구간이어서 유가 하락 효과가 항공권 체감가에 온전히 반영되지 않을 수 있습니다.',
  keywords: ['2026년 7월 유류할증료 전망','국제선 유류할증료','원달러 환율','항공유 가격','MOPS','브렌트유','항공권 가격 전망','유류할증료 인하 가능성','6월 유류할증료 공시','7월 항공권 예약 타이밍'],
  cards: [
    { title:'국제유가 고점 대비 완화', point:'5월 초 급등 이후 완화 흐름', decision:'브렌트유가 내려와도 중동 리스크 프리미엄은 별도로 봅니다.' },
    { title:'원달러 환율 부담 지속', point:'고환율 구간 유지', decision:'유가 하락 효과가 항공권 체감가에 온전히 반영되지 않을 수 있습니다.' },
    { title:'2026년 7월 유류할증료 전망', point:'인하 가능성 우세, 단 변수 존재', decision:'MOPS 평균, 환율, 공시 시차, 지정학 리스크를 함께 봅니다.' },
    { title:'7월 항공권 예약 타이밍', point:'단거리·중거리·장거리 판단 분리', decision:'성수기 항공권은 유류할증료보다 총액 기준으로 비교합니다.' }
  ]
};
window.AERO_NEWS_LATEST = window.AERO_MARKET_BRIEF_20260528;

/* 2026.05.29 07:00 KST latest market brief.
   June 2026 filings are confirmed baseline data. July 2026 remains the forecast focus. */
window.AERO_MARKET_BRIEF_20260529 = {
  id: 'market-brief-20260529-0700',
  timestamp: '2026-05-29T07:00:00+09:00',
  displayTime: '2026.05.29 07:00 KST',
  badge: 'LATEST',
  currentMonthNotice: '2026-06',
  forecastTargetMonth: '2026-07',
  summary: '2026.05.29 07:00 KST 기준 콘텐츠 초점은 2026년 7월 유류할증료 전망입니다. 6월 공시는 확정 데이터로 유지하고, 7월은 국제유가·항공유 가격·원달러 환율·여름 성수기 수요를 함께 본 시장 전망으로 분리합니다.',
  keywords: ['2026년 7월 유류할증료 전망','7월 유류할증료','항공권 유류할증료 환율','유류할증료 인하 가능성','대한항공 7월 유류할증료 전망','여름 휴가 항공권 예약 시기','원달러 환율 항공권 가격'],
  cards: [
    { title:'국제유가 급등세 둔화', point:'고점 대비 일부 진정', decision:'항공유 부담이 남아 있어 7월은 동결 또는 소폭 조정 가능성 중심으로 봅니다.' },
    { title:'환율 부담 지속', point:'원달러 환율이 체감 인하 제한', decision:'유가가 내려도 환율이 높으면 항공권 가격 부담은 남을 수 있습니다.' },
    { title:'6월 확정 → 7월 전망', point:'공시 완료 데이터는 기준점', decision:'미공시 항공사는 공지 전 또는 업데이트 대기로 분리합니다.' },
    { title:'여름 휴가 예약 판단', point:'성수기 수요 변수', decision:'일정이 확정된 여행자는 유류할증료만 기다리지 말고 총액 기준으로 판단합니다.' }
  ]
};
window.AERO_NEWS_LATEST = window.AERO_MARKET_BRIEF_20260529;

window.AERO_NEWS_CARDS_20260529 = [
  {
    id: 'news-20260529-oil-jetfuel-burden',
    slug: 'may-29-oil-easing-jetfuel-burden',
    category: 'market',
    priority: 1,
    date: '2026-05-29',
    updatedAt: '2026.05.29 07:00 KST 업데이트',
    badge: 'NEW',
    aiSummary: true,
    relevanceScore: 1,
    currentMonthNotice: '2026-06',
    forecastTargetMonth: '2026-07',
    title: '국제유가 급등세는 둔화, 하지만 항공유 부담은 지속',
    aiBrief: '브렌트유와 항공유 가격은 고점 대비 일부 진정된 흐름입니다. 다만 항공유 가격이 여전히 높은 구간에 있어 2026년 7월 유류할증료 인하를 단정하기는 어렵습니다.',
    summary: '2026.05.29 07:00 KST 기준 7월 유류할증료 전망은 큰 폭 인하보다 동결 또는 소폭 조정 가능성 중심으로 보는 것이 안전합니다.\n\n국제유가 급등세는 둔화됐지만, 항공유 가격 부담은 아직 남아 있습니다. 유류할증료는 유가 하루 변동이 아니라 항공유 가격(MOPS) 평균, 환율, 항공사 공시 시차를 함께 반영합니다.',
    impact: '2026년 7월 유류할증료 전망, 항공유 가격, 유류할증료 인하 가능성 검색 의도에 대응합니다.',
    sourceName: '시장 지표 종합 점검 (2026.05.29 07:00 KST)',
    sourceUrl: 'forecast.html',
    tags: ['NEW','항공유 가격','MOPS','2026년 7월 유류할증료 전망','유류할증료 인하 가능성'],
    faq: [
      { q:'유가가 진정되면 7월 유류할증료가 바로 내려가나요?', a:'아닙니다. 항공유 가격 평균, 환율, 항공사 공시 시차가 함께 반영되므로 동결 또는 소폭 조정 가능성도 봐야 합니다.' }
    ],
    links: [
      { href:'forecast.html', label:'7월 전망 자세히 보기' },
      { href:'fuel-surcharge-graph.html', label:'월별 변동 그래프 보기' }
    ],
    i18n: {
      en: {
        title:'Oil spike slows, but jet fuel burden remains',
        aiBrief:'Brent and jet fuel have eased from their highs, but jet fuel remains elevated. A July 2026 fuel surcharge cut is not guaranteed.',
        summary:'As of 2026.05.29 07:00 KST, the July fuel surcharge outlook should be read as freeze or small adjustment rather than a certain large cut. Fuel surcharges reflect MOPS averages, FX and airline filing lag, not one-day oil moves.',
        impact:'Matches July 2026 fuel surcharge outlook, jet fuel price and surcharge-cut search intent.'
      }
    }
  },
  {
    id: 'news-20260529-usdkrw-limits-cut',
    slug: 'may-29-usdkrw-limits-fuel-surcharge-cut',
    category: 'market',
    priority: 1,
    date: '2026-05-29',
    updatedAt: '2026.05.29 07:00 KST 업데이트',
    badge: 'NEW',
    aiSummary: true,
    relevanceScore: 1,
    currentMonthNotice: '2026-06',
    forecastTargetMonth: '2026-07',
    title: '원/달러 환율 부담 지속, 유류할증료 인하를 막는 변수',
    aiBrief: '유가가 일부 내려도 원/달러 환율이 높은 수준이면 소비자 체감 인하는 제한될 수 있습니다. 7월 전망에서 환율은 가장 중요한 변수 중 하나입니다.',
    summary: '항공권 유류할증료 환율 영향은 7월 전망에서 핵심입니다.\n\n유류할증료는 항공유 가격뿐 아니라 환율 영향을 함께 받습니다. 원달러 환율이 높은 구간에 머물면 유가 하락 효과가 항공권 가격에 온전히 반영되지 않을 수 있습니다. 따라서 7월 항공권 가격 전망은 유류할증료 인하 가능성만이 아니라 총액 기준으로 봐야 합니다.',
    impact: '항공권 유류할증료 환율, 원달러 환율 항공권 가격, 여름 휴가 항공권 예약 시기 검색 의도에 대응합니다.',
    sourceName: '환율·항공권 총액 영향 점검',
    sourceUrl: 'fuel-surcharge-calculator.html',
    tags: ['NEW','원달러 환율','항공권 유류할증료 환율','항공권 가격 전망','7월 유류할증료'],
    faq: [
      { q:'환율이 높으면 유류할증료 인하 효과가 줄어드나요?', a:'그럴 수 있습니다. 유가가 일부 내려도 원달러 환율이 높으면 원화 기준 항공권 체감 인하는 제한될 수 있습니다.' }
    ],
    links: [
      { href:'fuel-surcharge-calculator.html', label:'유류할증료 계산기' },
      { href:'index.html', label:'노선별 조회' }
    ],
    i18n: {
      en: {
        title:'USD/KRW remains a key variable limiting surcharge relief',
        aiBrief:'Even if oil eases, elevated USD/KRW can limit the consumer benefit. FX remains one of the most important July variables.',
        summary:'Fuel surcharges are affected by jet fuel prices and exchange rates. If USD/KRW remains elevated, lower oil may not fully reduce won-denominated airfare.',
        impact:'Matches airfare fuel surcharge FX and USD/KRW airfare price search intent.'
      }
    }
  },
  {
    id: 'news-20260529-june-confirmed-july-focus',
    slug: 'may-29-june-filings-confirmed-july-outlook-focus',
    category: 'forecast',
    priority: 1,
    date: '2026-05-29',
    updatedAt: '2026.05.29 07:00 KST 업데이트',
    badge: 'NEW',
    aiSummary: true,
    relevanceScore: 1,
    currentMonthNotice: '2026-06',
    forecastTargetMonth: '2026-07',
    title: '6월 공시 반영 이후 시장은 7월 전망으로 이동',
    aiBrief: '대한항공, 아시아나, 주요 LCC의 6월 공시 데이터는 확정 기준점입니다. 이제 사이트 문구는 2026년 7월 유류할증료 전망 중심이어야 합니다.',
    summary: '6월 공시 완료 항공사는 6월 확정 데이터로 표시하고, 미공시 항공사는 공지 전·6월 공시 미확인·업데이트 대기로 구분해야 합니다.\n\n2026년 7월 유류할증료 전망은 6월 확정 데이터 위에 국제유가, 항공유 가격, 원달러 환율 흐름을 더해 판단합니다. 이미 공시가 나온 항공사를 예상 또는 미정처럼 표시하면 안 됩니다.',
    impact: '대한항공 7월 유류할증료 전망, 2026년 7월 유류할증료 전망, 6월 확정 데이터 검색 의도에 대응합니다.',
    sourceName: '6월 확정 데이터 기반 7월 전망',
    sourceUrl: 'forecast.html',
    tags: ['NEW','6월 확정 데이터','공시 완료','2026년 7월 유류할증료 전망','대한항공 7월 유류할증료 전망'],
    faq: [
      { q:'6월 공시가 완료됐는데 왜 7월 전망을 보나요?', a:'6월 금액은 현재 기준점이고, 여행객은 7월 성수기 발권 판단을 위해 다음 달 방향성을 함께 봐야 하기 때문입니다.' }
    ],
    links: [
      { href:'forecast.html', label:'6월 확정 데이터 기반 7월 전망' },
      { href:'airlines.html', label:'항공사별 공시 보기' }
    ],
    i18n: {
      en: {
        title:'After June filings, market focus shifts to July',
        aiBrief:'June filings by Korean Air, Asiana and major LCCs are confirmed baseline data. The site should now focus on the July 2026 outlook.',
        summary:'Airlines with confirmed June notices should be shown as confirmed. Airlines without notices should remain pending or unconfirmed, not copied from previous months.',
        impact:'Matches Korean Air July fuel surcharge outlook and confirmed June data search intent.'
      }
    }
  },
  {
    id: 'news-20260529-summer-booking-guide',
    slug: 'may-29-summer-vacation-airfare-booking-guide',
    category: 'general',
    priority: 1,
    date: '2026-05-29',
    updatedAt: '2026.05.29 07:00 KST 업데이트',
    badge: 'NEW',
    aiSummary: true,
    relevanceScore: 0.98,
    currentMonthNotice: '2026-06',
    forecastTargetMonth: '2026-07',
    title: '여름 휴가철 항공권, 지금 예약 판단이 필요한 구간',
    aiBrief: '7월은 여름 성수기와 겹쳐 항공권 수요가 늘어날 수 있습니다. 유류할증료가 크게 내려갈 가능성이 뚜렷하지 않다면 일정이 확정된 여행자는 조기 예약 검토가 필요합니다.',
    summary: '여름 휴가 항공권 예약 시기는 유류할증료만으로 판단하기 어렵습니다.\n\n7월에는 성수기 수요가 늘 수 있고, 환율 부담도 남아 있습니다. 유류할증료가 크게 내려갈 가능성이 아직 뚜렷하지 않다면 일정이 확정된 여행자는 현재 항공권 총액을 확인하는 편이 낫습니다. 단거리 노선은 유가·환율 변동에 따라 소폭 조정 가능성이 남아 있습니다.',
    impact: '여름 휴가 항공권 예약 시기, 원달러 환율 항공권 가격, 7월 유류할증료 검색 의도에 대응합니다.',
    sourceName: '여름 성수기 예약 판단 가이드',
    sourceUrl: 'index.html',
    tags: ['NEW','여름 휴가 항공권 예약 시기','7월 유류할증료','항공권 가격 전망','원달러 환율 항공권 가격'],
    faq: [
      { q:'7월 여행은 유류할증료 공시를 기다리는 편이 좋나요?', a:'일정이 확정된 성수기 노선은 운임과 좌석 상황이 더 빠르게 움직일 수 있어 항공권 총액 기준으로 조기 확인하는 편이 안전할 수 있습니다.' }
    ],
    links: [
      { href:'index.html', label:'노선별 유류할증료 조회' },
      { href:'fuel-surcharge-calculator.html', label:'목적지별 총액 확인' }
    ],
    i18n: {
      en: {
        title:'Summer vacation airfares may need earlier booking decisions',
        aiBrief:'July overlaps with peak summer demand. If a large surcharge cut is not clear, travelers with fixed schedules may need to check total fares earlier.',
        summary:'For July travel, do not judge by fuel surcharge alone. Peak demand, FX and seat availability can matter more than waiting for a small surcharge adjustment.',
        impact:'Matches summer vacation airfare booking timing and July fuel surcharge search intent.'
      }
    }
  }
];

window.AERO_NEWS_CARDS_20260528 = [
  {
    id: 'news-20260528-oil-easing-risk-premium',
    slug: 'may-28-brent-easing-middle-east-risk-premium',
    category: 'market',
    priority: 1,
    date: '2026-05-28',
    updatedAt: '2026.05.28 06:45 KST 업데이트',
    badge: 'NEW',
    aiSummary: true,
    relevanceScore: 1,
    currentMonthNotice: '2026-06',
    forecastTargetMonth: '2026-07',
    title: '국제유가 고점 대비 완화, 중동 리스크 프리미엄은 잔존',
    aiBrief: '2026.05.28 06:45 KST 기준 브렌트유는 5월 초 급등 이후 고점 대비 완화 흐름입니다. 다만 호르무즈 해협, 미국·이란 협상, 국제유가 반등 가능성은2026년 7월 유류할증료 전망에서 여전히 분리해 봐야 할 변수입니다.',
    summary: '2026년 7월 유류할증료 전망에서 국제유가는 긍정 요인과 제한 요인이 함께 있는 상태입니다.\n\n5월 초 급등 이후 브렌트유는 고점 대비 완화되는 흐름이지만, 중동 리스크 프리미엄이 완전히 사라졌다고 단정하기는 어렵습니다. 따라서 “유가 하락 = 유류할증료 즉시 인하”로 연결하면 안 됩니다.\n\n7월 국제선 유류할증료는 항공유 가격(MOPS) 평균, 원달러 환율, 항공사별 공시 시차, 지정학 리스크를 함께 반영해 판단해야 합니다.',
    impact: '브렌트유, 항공유 가격, MOPS,2026년 7월 유류할증료 전망 검색 의도에 대응합니다.',
    sourceName: '시장 지표 종합 점검 (2026.05.28 06:45 KST)',
    sourceUrl: 'forecast.html',
    tags: ['NEW','브렌트유','항공유 가격','MOPS','2026년 7월 유류할증료 전망'],
    faq: [
      { q:'유가가 내려가면 유류할증료도 바로 내려가나요?', a:'아닙니다. 유류할증료는 항공유 MOPS 평균, 환율, 항공사 공시 시차, 지정학 리스크를 함께 반영합니다.' },
      { q:'28일 기준 국제유가 흐름은 7월 전망에 어떤 의미인가요?', a:'고점 대비 완화는 인하 가능성을 높이지만, 중동 리스크 프리미엄이 남아 있어 인하 폭은 제한될 수 있습니다.' }
    ],
    links: [
      { href:'forecast.html', label:'2026년 7월 전망 자세히 보기' },
      { href:'fuel-surcharge-graph.html', label:'월별 유류할증료 그래프' }
    ]
  },
  {
    id: 'news-20260528-usdkrw-airfare-burden',
    slug: 'may-28-usdkrw-limits-airfare-relief',
    category: 'market',
    priority: 1,
    date: '2026-05-28',
    updatedAt: '2026.05.28 06:45 KST 업데이트',
    badge: 'NEW',
    aiSummary: true,
    relevanceScore: 0.99,
    currentMonthNotice: '2026-06',
    forecastTargetMonth: '2026-07',
    title: '원달러 환율 부담 지속, 항공권 체감가 하락폭 제한 가능',
    aiBrief: '원달러 환율은 여전히 높은 구간에 있어 유가 하락 효과가 항공권 가격 전망에 온전히 반영되지 않을 수 있습니다. 7월 항공권 예약 타이밍은 유류할증료뿐 아니라 운임, 세금, 환율, 좌석 상황을 총액 기준으로 봐야 합니다.',
    summary: '원달러 환율은2026년 7월 유류할증료 전망에서 핵심 제한 요인입니다.\n\n국제유가와 항공유 가격이 고점 대비 완화되더라도, 원달러 환율이 높은 구간에 머물면 원화 기준 항공권 체감가 하락폭은 제한될 수 있습니다. 특히 장거리 노선은 유류할증료 절대 금액이 크기 때문에 환율과 운임의 영향을 함께 봐야 합니다.\n\n따라서 7월 항공권 예약 타이밍은 유류할증료 인하 가능성만으로 결정하기보다 항공권 총액 기준으로 비교하는 것이 안전합니다.',
    impact: '원달러 환율, 항공권 가격 전망, 국제선 유류할증료, 7월 항공권 예약 타이밍 키워드에 대응합니다.',
    sourceName: '환율·항공권 총액 영향 점검',
    sourceUrl: 'fuel-surcharge-calculator.html',
    tags: ['NEW','원달러 환율','항공권 가격 전망','국제선 유류할증료','7월 항공권 예약 타이밍'],
    faq: [
      { q:'환율이 유류할증료 전망에 왜 중요한가요?', a:'항공유와 국제 항공 비용은 달러 기반 영향이 크기 때문에 고환율이면 원화 기준 체감 인하 폭이 줄어들 수 있습니다.' },
      { q:'성수기 항공권은 무엇을 기준으로 봐야 하나요?', a:'유류할증료만 보지 말고 운임, 세금, 환율, 좌석 상황을 포함한 총액 기준으로 비교해야 합니다.' }
    ],
    links: [
      { href:'fuel-surcharge-calculator.html', label:'유류할증료 계산기' },
      { href:'index.html', label:'노선별 유류할증료 조회' }
    ]
  },
  {
    id: 'news-20260528-july-surcharge-outlook',
    slug: 'may-28-july-2026-fuel-surcharge-outlook',
    category: 'forecast',
    priority: 1,
    date: '2026-05-28',
    updatedAt: '2026.05.28 06:45 KST 업데이트',
    badge: 'NEW',
    aiSummary: true,
    relevanceScore: 1,
    currentMonthNotice: '2026-06',
    forecastTargetMonth: '2026-07',
    title: '2026년 7월 유류할증료 전망: 인하 가능성 우세, 단 인하 폭 제한 가능',
    aiBrief: '6월 유류할증료 공시는 5월 대비 인하 흐름이 확정됐지만, 7월은 유가 완화와 고환율이 충돌하는 구간입니다. 현재로서는 유류할증료 인하 가능성이 우세하되, 고환율과 중동 변수 재확대 시 인하 폭 제한 또는 변동 가능성이 있습니다.',
    summary: '2026년 7월 유류할증료 전망은 “인하 가능성 우세, 단 고환율·중동 변수 재확대 시 인하 폭 제한 또는 변동 가능”으로 정리하는 것이 적절합니다.\n\n6월 유류할증료 공시는 이미 확정 데이터입니다. KE/OZ/LJ/BX/ZE/RS/TW/7C/YP의 6월 공식 공시 데이터는 유지하며, 7월 전망은 별도 시장 전망으로 봐야 합니다.\n\n유가 하락을 바로 유류할증료 인하로 단정하지 않고, 항공유 가격(MOPS) 평균, 원달러 환율, 항공사 공시 시차, 중동 리스크를 함께 확인해야 합니다.',
    impact: '2026년 7월 유류할증료 전망, 유류할증료 인하 가능성, 6월 유류할증료 공시 검색 의도에 대응합니다.',
    sourceName: '7월 전망 종합',
    sourceUrl: 'forecast.html',
    tags: ['NEW','2026년 7월 유류할증료 전망','유류할증료 인하 가능성','6월 유류할증료 공시','MOPS'],
    faq: [
      { q:'2026년 7월 유류할증료는 내려갈 가능성이 있나요?', a:'현재 흐름에서는 인하 가능성이 우세합니다. 다만 고환율과 중동 리스크가 다시 커지면 인하 폭이 제한되거나 전망이 흔들릴 수 있습니다.' },
      { q:'6월 공시와 7월 전망은 어떻게 다른가요?', a:'6월 공시는 항공사 공식 공시로 확정된 데이터이고, 7월은 MOPS 평균, 환율, 유가, 지정학 리스크를 바탕으로 한 전망입니다.' }
    ],
    links: [
      { href:'forecast.html', label:'7월 전망 페이지' },
      { href:'news.html#news-20260528-oil-easing-risk-premium', label:'국제유가 카드 보기' }
    ]
  },
  {
    id: 'news-20260528-booking-timing-guide',
    slug: 'may-28-july-air-ticket-booking-timing-guide',
    category: 'guide',
    priority: 1,
    date: '2026-05-28',
    updatedAt: '2026.05.28 06:45 KST 업데이트',
    badge: 'NEW',
    aiSummary: true,
    relevanceScore: 0.96,
    currentMonthNotice: '2026-06',
    forecastTargetMonth: '2026-07',
    title: '7월 항공권 예약 타이밍: 유류할증료보다 총액 기준 비교',
    aiBrief: '단거리는 6월 인하 반영 후 현재 발권가를 확인할 가치가 있고, 중거리는 환율과 항공유 추이를 함께 봐야 합니다. 장거리는 유류할증료 절대 금액이 커서 7월 공시 전후 총액 비교가 필요합니다.',
    summary: '7월 항공권 예약 타이밍은 노선 길이와 성수기 여부에 따라 다르게 봐야 합니다.\n\n단거리 노선은 6월 유류할증료 인하가 이미 반영된 현재 발권가를 확인할 가치가 있습니다. 중거리 노선은 환율과 항공유 추이를 조금 더 함께 보는 편이 좋습니다. 장거리 노선은 유류할증료 절대 금액이 크기 때문에 7월 공시 전후 총액 비교가 필요합니다.\n\n성수기 항공권은 유류할증료만 보고 기다리기보다 운임, 세금, 환율, 좌석 상황을 포함한 총액 기준으로 판단해야 합니다.',
    impact: '7월 항공권 예약 타이밍, 항공권 가격 전망, 국제선 유류할증료 검색 의도에 대응합니다.',
    sourceName: '예약 판단 가이드',
    sourceUrl: 'fuel-surcharge-calculator.html',
    tags: ['NEW','7월 항공권 예약 타이밍','항공권 가격 전망','국제선 유류할증료','성수기 항공권'],
    faq: [
      { q:'7월 공시까지 기다리는 것이 좋나요?', a:'장거리나 일정이 유연한 경우 비교 가치가 있습니다. 단거리·성수기 노선은 운임 상승이 유류할증료 인하보다 클 수 있습니다.' },
      { q:'항공권 예약은 무엇을 기준으로 판단해야 하나요?', a:'유류할증료, 운임, 세금, 환율, 좌석 상황을 포함한 총액 기준으로 판단해야 합니다.' }
    ],
    links: [
      { href:'fuel-surcharge-calculator.html', label:'유류할증료 계산기' },
      { href:'index.html', label:'목적지별 유류할증료 조회' }
    ]
  }
];

(function(){
  ['en','ja','zh','fr','de'].forEach(function(lang){
    (window.AERO_NEWS_CARDS_20260528 || []).forEach(function(card){
      if(!card.i18n) card.i18n = {};
      if(!card.i18n.en) {
        card.i18n.en = {
          updatedAt:'Updated2026.05.28 06:45 KST',
          title: card.title,
          aiBrief: card.aiBrief,
          summary: card.summary,
          impact: card.impact,
          sourceName: card.sourceName,
          tags: card.tags,
          faq: card.faq,
          links: card.links
        };
      }
      if(lang !== 'en' && !card.i18n[lang]) card.i18n[lang] = card.i18n.en;
    });
  });
})();

/*2026.05.28 06:45 KST corrected market brief.
   This intentionally supersedes the earlier20260527 draft because the May 28
   story is not just a date change: it is the first morning check after June
   Level 27 became the working baseline. */
window.AERO_MARKET_BRIEF_20260527 = {
  id: 'market-brief-20260527-0625',
  timestamp: '2026-05-28T06:45:00+09:00',
  displayTime: '2026.05.28 06:45 KST',
  badge: 'LATEST',
  currentMonthNotice: '2026-06',
  forecastTargetMonth: '2026-07',
  summary: '2026.05.28 06:45 KST 기준 핵심은 6월 유류할증료 인하가 이미 확정된 뒤, 7월 전망을 다시 점검하는 단계라는 점입니다. 항공유/MOPS 하락은 6월 33단계→27단계 적용으로 확인됐지만,2일 오전에는 Brent eased from the early-May spike, while elevated USD/KRW can still limit perceived airfare relief.',
  keywords: ['2026년 7월 유류할증료 전망','2026년 6월 유류할증료','항공유 가격','MOPS','원달러 환율','Brent 유가','국제선 유류할증료','항공권 유류할증료'],
  cards: [
    { title:'5월 28일 오전 점검: 6월 인하 확정 이후 7월 전망 재정리', point:'6월 27단계는 확정, 7월은 전망', decision:'6월 공시 데이터와 7월 예상 흐름을 분리해서 봅니다.' },
    { title:'항공유 하락 효과는 확인,2일 변수는 유가와 환율', point:'MOPS 511.21 → 410.02 cents/gal 이후 Brent eased from the early-May spike, while elevated USD/KRW can still limit perceived airfare relief.', decision:'추가 하락 가능성은 유지되지만 체감 인하 폭은 제한될 수 있습니다.' },
    { title:'대한항공 6월 기준점 유지', point:'61,500~451,500원, 5월 대비 최대 112,500원 인하', decision:'새로운 7월 공시가 아니라 7월 전망의 비교 기준입니다.' },
    { title:'중동 리스크는 완전 해소 전', point:'호르무즈·미국 이란 협상·유가 반등 가능성', decision:'하락 가능성 우세 문구에 변동성 조건을 함께 둡니다.' },
    { title:'성수기 예약은 총액 기준', point:'유류할증료 + 운임 + 환율 + 좌석 상황', decision:'기다림의 이익과 성수기 운임 상승 위험을 같이 비교합니다.' }
  ]
};
window.AERO_NEWS_LATEST = window.AERO_MARKET_BRIEF_20260527;

window.AERO_NEWS_CARDS_20260527 = [
  {
    id: 'news-20260527-market-recheck-after-june-cut',
    slug: 'may-27-2026-july-fuel-surcharge-market-recheck',
    category: 'market',
    priority: 1,
    date: '2026-05-27',
    updatedAt: '2026.05.28 06:45 KST 업데이트',
    aiSummary: true,
    relevanceScore: 1,
    currentMonthNotice: '2026-06',
    forecastTargetMonth: '2026-07',
    title: '5월 28일 오전 점검: 6월 유류할증료 인하 확정 이후 7월 전망 재정리',
    aiBrief: '2026.05.28 06:45 KST 기준 핵심은 6월 유류할증료 인하가 이미 확정된 뒤, 7월 유류할증료 전망을 다시 점검하는 단계라는 점입니다. 6월은 33단계에서 27단계로 낮아졌고, 7월은 항공유 가격·Brent 유가·원달러 환율·중동 리스크를 다시 확인해야 합니다.',
    summary: '2026년 5월 28일 오전 기준 뉴스의 초점은26일 카드와 달라야 합니다.26일이 “6월 공시 반영 완료와 7월 전망 전환”이었다면,2일은 “6월 인하가 기준점으로 굳어진 뒤 7월 추가 완화 폭을 다시 점검하는 시점”입니다.\n\n확정 데이터는 분명합니다.2026년 6월 국제선 유류할증료는 5월 33단계에서 6월 27단계 수준으로 내려와 적용 중입니다. 대한항공 기준 6월 국제선 편도 유류할증료는 61,500원~451,500원이며, 5월 대비 최대 112,500원 낮아진 구간이 있습니다.\n\n다만2일 오전에는 “추가 하락 가능성”만 강조하기 어렵습니다. 항공유/MOPS 하락은 6월 인하에 이미 반영됐고, Brent eased from the early-May spike, while elevated USD/KRW can still limit perceived airfare relief.',
    impact: '2026년 7월 유류할증료 전망,2026년 6월 유류할증료, 항공유 가격, 원달러 환율 검색 의도에 맞춘 5월 28일 기준 카드입니다.',
    sourceName: '시장 지표 재점검 (2026.05.28 06:45 KST)',
    sourceUrl: 'forecast.html',
    tags: ['LATEST', '2026년 7월 유류할증료 전망', '2026년 6월 유류할증료', '항공유 가격', '원달러 환율'],
    faq: [
      { q:'2026년 7월 유류할증료는 내려갈 가능성이 있나요?', a:'가능성은 여전히 있습니다. 다만 5월 28일 오전 기준으로는 Brent 유가와 원달러 환율이 인하 폭을 제한할 수 있어 “하락 가능성 우세, 변동성 유지”로 보는 것이 적절합니다.' },
      { q:'27일 기준 새로 봐야 할 변수는 무엇인가요?', a:'6월 27단계 적용은 이미 확정된 기준점입니다.2일에는 Brent 유가, 원달러 환율, 중동 리스크가 7월 인하 폭을 얼마나 제한할지가 핵심입니다.' },
      { q:'6월 유류할증료 하락 이유는 무엇인가요?', a:'싱가포르 항공유/MOPS 하락이 핵심 배경입니다. 이 효과는 이미 6월 33단계→27단계 적용으로 확인됐고, 7월은 이후 시장 지표를 별도로 봐야 합니다.' }
    ],
    links: [
      { href:'forecast.html', label:'2026년 7월 유류할증료 전망 보기' },
      { href:'fuel-surcharge-calculator.html', label:'유류할증료 계산기로 총액 비교' },
      { href:'fuel-surcharge-graph.html', label:'월별 유류할증료 그래프 확인' }
    ],
    i18n: {
      en: {
        updatedAt:'Updated2026.05.28 06:45 KST',
        title:'May 28 morning check: July outlook after June fuel surcharge cuts are confirmed',
        aiBrief:'As of 2026.05.28 06:45 KST, the point is no longer just that June cuts were reflected. June Level 27 is now the baseline, and July needs a fresh check against Brent, USD/KRW, jet fuel, and Middle East risk.',
        summary:'The May 28 update should not be a date-only repeat of May 286. May 286 marked the shift after June filings; May 28 is the first market recheck after June Level 27 became the baseline.\n\nConfirmed data: June international fuel surcharges fell from Level 33 to around Level 27. Korean Air June one-way surcharges are KRW 61,500–451,500, down by up to KRW 112,500 from May.\n\nBut the July cut size is not guaranteed. Jet fuel/MOPS decline has already been reflected in June, while Brent eased from the early-May spike, while elevated USD/KRW can still limit perceived airfare relief.',
        impact:'May 28-specific card for July 2026 fuel surcharge outlook, June 2026 surcharge, jet fuel, and USD/KRW intent.',
        sourceName:'Market recheck as of2026.05.28 06:45 KST',
        tags:['LATEST','July 2026 fuel surcharge outlook','June 2026 surcharge','jet fuel price','USD/KRW'],
        faq:[
          { q:'Can July 2026 fuel surcharges fall?', a:'They still can, but as of May 28 Brent and USD/KRW may limit the size. The right framing is lower bias with volatility.' },
          { q:'What is new on May 28?', a:'June Level 27 is already the confirmed baseline. May 28 focuses on Brent, USD/KRW, and geopolitical risk as constraints on July cuts.' },
          { q:'Why did June surcharges fall?', a:'Lower Singapore jet fuel/MOPS drove the June move from Level 33 to Level 27. July requires a separate market check.' }
        ],
        links:[
          { href:'forecast.html', label:'See July 2026 outlook' },
          { href:'fuel-surcharge-calculator.html', label:'Compare total with calculator' },
          { href:'fuel-surcharge-graph.html', label:'See monthly trend chart' }
        ]
      }
    }
  },
  {
    id: 'news-20260527-oil-fx-constraint',
    slug: 'may-27-brent-usdkrw-limit-july-fuel-surcharge-relief',
    category: 'market',
    priority: 1,
    date: '2026-05-27',
    updatedAt: '2026.05.28 06:45 KST 업데이트',
    aiSummary: true,
    relevanceScore: 0.98,
    currentMonthNotice: '2026-06',
    forecastTargetMonth: '2026-07',
    title: '항공유 하락은 긍정적이지만,2일 오전 유가·환율은 인하 폭 제한 요인',
    aiBrief: '항공유/MOPS 하락은 6월 유류할증료 인하의 핵심 배경입니다. 하지만2026.05.28 06:45 KST 기준으로는 Brent eased from the early-May spike, while elevated USD/KRW can still limit perceived airfare relief.',
    summary: '27일 기준으로 새로 강조해야 할 부분은 “항공유 하락 자체”보다 “항공유 하락 효과가 얼마나 더 남았는가”입니다.\n\n6월 유류할증료 27단계 적용은 이미 항공유/MOPS 하락을 반영한 결과입니다. 따라서 7월 전망에서는 남은 항공유 흐름뿐 아니라 Brent 유가와 원달러 환율을 함께 봐야 합니다.\n\n특히 원달러 환율 변동성이 확대되면 유류할증료가 더 내려가더라도 항공권 총액 체감 인하가 제한될 수 있습니다. 장거리·성수기 노선은 유류할증료 절감분보다 운임, 환율, 좌석 상황이 더 크게 작용할 수 있습니다.',
    impact: '항공유 가격, Brent 유가, 원달러 환율, 항공권 유류할증료 키워드를 5월 28일 기준으로 연결합니다.',
    sourceName: 'Brent·USDKRW2일 오전 지표 점검',
    sourceUrl: 'news.html#news-20260527-oil-fx-constraint',
    tags: ['항공유 가격', 'Brent 유가', '원달러 환율', '항공권 유류할증료', '7월 전망'],
    faq: [
      { q:'환율이 유류할증료에 미치는 영향은 무엇인가요?', a:'원달러 환율이 높은 구간이면 항공유 가격 하락에도 원화 기준 항공권 총액 하락폭이 줄어들 수 있습니다.' },
      { q:'27일 기준으로 항공유 하락만 보면 되나요?', a:'아닙니다. 6월 인하에는 항공유 하락이 이미 반영됐고, 7월 전망은 Brent 유가와 원달러 환율을 함께 봐야 합니다.' }
    ],
    links: [
      { href:'forecast.html', label:'7월 전망 상세 보기' },
      { href:'fuel-surcharge-calculator.html', label:'항공권 총액 비교하기' }
    ],
    i18n: {
      en: {
        updatedAt:'Updated2026.05.28 06:45 KST',
        title:'Jet fuel is lower, but May 28 oil and FX still limit the size of relief',
        aiBrief:'Lower jet fuel/MOPS explains the June cut. But as of2026.05.28 06:45 KST, Brent eased from the early-May spike, while elevated USD/KRW can still limit perceived airfare relief.',
        summary:'The May 28 question is not simply whether jet fuel fell. It is how much additional benefit is still left after June Level 27 already reflected that decline.\n\nFor July, watch remaining jet fuel movement together with Brent and USD/KRW remains elevated, so lower oil may not fully translate into lower perceived airfare.',
        impact:'Connects jet fuel, Brent, USD/KRW, and air ticket surcharge intent as of May 28.',
        sourceName:'May 28 Brent and USD/KRW check',
        tags:['jet fuel price','Brent crude','USD/KRW','ticket fuel surcharge','July outlook'],
        faq:[
          { q:'How does FX affect surcharges?', a:'Elevated USD/KRW can reduce the won-denominated benefit of lower jet fuel prices.' },
          { q:'Is jet fuel the only variable now?', a:'No. June already reflected the jet fuel decline; July needs Brent and USD/KRW checked together.' }
        ],
        links:[
          { href:'forecast.html', label:'See detailed July outlook' },
          { href:'fuel-surcharge-calculator.html', label:'Compare total airfare' }
        ]
      }
    }
  }
];

(function(){
  ['ja','zh','fr','de'].forEach(function(lang){
    (window.AERO_NEWS_CARDS_20260527 || []).forEach(function(card){
      if(!card.i18n) card.i18n = {};
      if(!card.i18n[lang] && card.i18n.en) card.i18n[lang] = card.i18n.en;
    });
  });
})();

/*2026.05.25 10:30 KST topic-based news cards
   New cards are cumulative. Do not overwrite prior daily cards because the news page
   is also used as an archive for SEO/AEO/GEO discovery. */
window.AERO_NEWS_CARDS_20260525 = [
  {
    id: 'news-20260525-july-surcharge-stabilization',
    slug: 'july-2026-fuel-surcharge-stabilization-outlook',
    category: 'market',
    priority: 1,
    date: '2026-05-25',
    updatedAt: '2026.05.25 10:30 KST 업데이트',
    aiSummary: true,
    relevanceScore: 1,
    title: '2026년 7월 유류할증료 안정화 가능성 확대: 추가 하락 또는 제한적 조정 우세',
    aiBrief: '2026.05.25 10:30 KST 기준 2026년 7월 유류할증료는 급등보다 안정화 가능성이 더 큰 흐름입니다. MOPS 급락으로 6월 국제선 유류할증료가 33단계에서 27단계로 낮아졌고, 7월은 추가 하락 또는 제한적 조정 가능성이 우세합니다.',
    summary: '현재 시장은 항공유 가격 피크가 일단 지나갔다는 쪽에 무게가 실립니다.\n\nMOPS 급락 이후 6월 국제선 유류할증료는 33단계에서 27단계로 하락했습니다. 7월 유류할증료 전망은 추가 하락 또는 현 수준 안정화 가능성이 우세하지만, 여름 성수기 항공유 수요와 환율이 인하 폭을 제한할 수 있습니다.\n\n여행객은 단거리 노선에서는 운임 자체를, 장거리 노선에서는 유류할증료와 환율을 함께 확인하는 것이 유리합니다.',
    impact: '2026년 7월 유류할증료 전망, 국제선 유류할증료, 항공권 가격 전망 검색 의도에 맞춘 핵심 카드입니다.',
    sourceName: '시장 지표 종합 분석 (2026.05.25 10:30 KST)',
    sourceUrl: 'forecast.html',
    tags: ['NEW', '7월 전망', '유류할증료 전망', '2026년 7월 유류할증료', '국제선 유류할증료'],
    faq: [
      { q: '7월 유류할증료는 더 내려갈까?', a: '가능성은 있습니다. MOPS 급락으로 하락 압력이 생겼지만 USD/KRW 환율, 성수기 항공유 수요, 중동 리스크 때문에 인하 폭은 제한될 수 있습니다.' },
      { q: '6월 확정 데이터와 7월 전망은 어떻게 다른가요?', a: '6월은 항공사 공시로 확인된 데이터이고, 7월은 MOPS, 환율, 유가, 지정학 리스크를 바탕으로 한 시장 기반 전망입니다.' },
      { q: '지금 항공권을 예약하는 것이 유리한가요?', a: '단거리 노선은 유류할증료보다 운임 변동 영향이 클 수 있습니다. 장거리 노선은 유류할증료와 환율을 함께 보고 총액 기준으로 판단하는 것이 좋습니다.' }
    ],
    links: [
      { href: 'forecast.html', label: '2026년 7월 유류할증료 전망 자세히 보기' },
      { href: 'fuel-surcharge-calculator.html', label: '5월·6월 발권 절약액 계산' },
      { href: 'airlines.html', label: '항공사별 공식 공시 확인' },
      { href: 'fuel-surcharge-graph.html', label: '월별 유류할증료 그래프' }
    ],
    i18n: {
      en: {
        updatedAt: 'Updated2026.05.25 10:30 KST',
        title: 'July 2026 fuel surcharge stabilization outlook: further cuts or limited adjustment more likely',
        aiBrief: 'As of 2026.05.25 10:30 KST, July 2026 fuel surcharges look more likely to stabilize than spike. MOPS dropped sharply and June international fuel surcharges moved from Level 33 to Level 27.',
        summary: 'The current market view is that the jet fuel price spike has likely passed for now.\n\nAfter the MOPS drop, June international surcharges fell from Level 33 to Level 27. For July, further cuts or stabilization look more likely, but summer jet fuel demand and USD/KRW may limit the size.\n\nTravelers should focus on fare levels for short-haul routes and check both surcharge and FX impact for long-haul routes.',
        impact: 'Core card for July 2026 fuel surcharge outlook, international fuel surcharge, and air ticket price forecast searches.',
        sourceName: 'Market indicator synthesis (2026.05.25 10:30 KST)',
        tags: ['NEW', 'July outlook', 'fuel surcharge outlook', 'July 2026 fuel surcharge', 'international fuel surcharge'],
        faq: [
          { q: 'Will July fuel surcharges fall further?', a: 'They may. MOPS creates downward pressure, but USD/KRW, summer fuel demand, and Middle East risk can limit the size.' },
          { q: 'How are June confirmed data and July outlook different?', a: 'June is based on airline filings, while July is a market-based outlook using MOPS, FX, crude oil, and geopolitical risk.' },
          { q: 'Is booking now better?', a: 'For short-haul routes, base fare can matter more than surcharge. For long-haul routes, compare surcharge and FX impact together.' }
        ],
        links: [
          { href: 'forecast.html', label: 'Detailed July 2026 fuel surcharge outlook' },
          { href: 'fuel-surcharge-calculator.html', label: 'Calculate May-June ticketing savings' },
          { href: 'airlines.html', label: 'Check official airline filings' },
          { href: 'fuel-surcharge-graph.html', label: 'Monthly surcharge chart' }
        ]
      },
      ja: {
        updatedAt: '2026.05.25 10:30 KST 更新',
        title: '2026年7月の燃油サーチャージは安定化の可能性が拡大',
        aiBrief: '2026.05.25 10:30 KST時点では、2026年7月の燃油サーチャージは急上昇よりも安定化の可能性が高い流れです。MOPS急落後、6月の国際線燃油サーチャージは33段階から27段階へ下がりました。',
        summary: '現在の市場では、航空燃料価格の急騰局面はいったん通過したとの見方が強まっています。\n\nMOPS急落を受けて、6月の国際線燃油サーチャージは33段階から27段階へ低下しました。7月は追加引き下げまたは安定化が優勢ですが、夏の需要と為替が下げ幅を制限する可能性があります。\n\n短距離路線は運賃そのもの、長距離路線は燃油サーチャージと為替を合わせて確認するのが有利です。',
        impact: '2026年7月燃油サーチャージ見通し、国際線燃油サーチャージ、航空券価格見通し向けの主要カードです。',
        sourceName: '市場指標総合分析（2026.05.25 10:30 KST）',
        tags: ['NEW', '7月見通し', '燃油サーチャージ見通し', '2026年7月燃油サーチャージ', '国際線燃油サーチャージ'],
        faq: [
          { q: '7月の燃油サーチャージはさらに下がりますか？', a: '可能性はあります。MOPS下落は下押し要因ですが、USD/KRW、夏の燃料需要、中東リスクが下げ幅を抑える場合があります。' },
          { q: '6月確定データと7月見通しの違いは？', a: '6月は航空会社の公示データで、7月はMOPS、為替、原油、地政学リスクを使った市場見通しです。' },
          { q: '今予約した方がよいですか？', a: '短距離は運賃の影響が大きく、長距離は燃油サーチャージと為替を一緒に確認するのがよいです。' }
        ],
        links: [
          { href: 'forecast.html', label: '2026年7月見通しを見る' },
          { href: 'fuel-surcharge-calculator.html', label: '5月・6月発券の節約額を計算' },
          { href: 'airlines.html', label: '航空会社の公式公示を確認' },
          { href: 'fuel-surcharge-graph.html', label: '月別グラフを見る' }
        ]
      },
      zh: {
        updatedAt: '2026.05.25 10:30 KST 更新',
        title: '2026年7月燃油附加费稳定可能性扩大：进一步下调或有限调整占优',
        aiBrief: '截至2026.05.25 10:30 KST，2026年7月燃油附加费更可能进入稳定阶段，而不是再次急涨。MOPS急跌后，6月国际线燃油附加费从33级降至27级。',
        summary: '当前市场更倾向于认为航空燃油价格的急涨高点已暂时过去。\n\nMOPS急跌后，6月国际线燃油附加费从33级降至27级。7月可能继续小幅下调或维持稳定，但暑期航空燃油需求和美元兑韩元汇率可能限制降幅。\n\n短途航线应重点看机票基础运价，长途航线应同时比较燃油附加费和汇率影响。',
        impact: '面向2026年7月燃油附加费预测、国际线燃油附加费和机票价格预测搜索意图的核心卡片。',
        sourceName: '市场指标综合分析（2026.05.25 10:30 KST）',
        tags: ['NEW', '7月展望', '燃油附加费预测', '2026年7月燃油附加费', '国际线燃油附加费'],
        faq: [
          { q: '7月燃油附加费还会下降吗？', a: '有可能。MOPS下降带来下调压力，但USD/KRW汇率、暑期需求和中东风险可能限制降幅。' },
          { q: '6月确定数据和7月展望有什么区别？', a: '6月是航空公司已公布数据，7月是基于MOPS、汇率、油价和地缘风险的市场展望。' },
          { q: '现在订票更有利吗？', a: '短途航线基础票价影响可能更大，长途航线应同时查看燃油附加费和汇率。' }
        ],
        links: [
          { href: 'forecast.html', label: '查看2026年7月燃油附加费展望' },
          { href: 'fuel-surcharge-calculator.html', label: '计算5月与6月出票节省额' },
          { href: 'airlines.html', label: '查看航空公司官方公告' },
          { href: 'fuel-surcharge-graph.html', label: '查看月度图表' }
        ]
      },
      fr: {
        updatedAt: 'Mise à jour2026.05.25 10:30 KST',
        title: 'Surcharge carburant de juillet2026 : scénario de stabilisation ou de baisse limitée',
        aiBrief: 'Au2026.05.25 10:30 KST, la surcharge carburant de juillet2026 paraît plus proche d’une stabilisation que d’un nouveau bond. Le MOPS a fortement baissé et la surcharge internationale de juin est passée du niveau 33 au niveau2.',
        summary: 'Le marché considère que le pic de prix du carburant aviation est probablement passé pour le moment.\n\nAprès la baisse du MOPS, la surcharge internationale de juin est passée du niveau 33 au niveau2. Pour juillet, une nouvelle baisse ou une stabilisation paraît plus probable, mais la demande estivale et l’USD/KRW peuvent limiter l’ampleur.\n\nSur les courts-courriers, le tarif de base reste central. Sur les longs-courriers, il faut vérifier la surcharge et l’effet de change ensemble.',
        impact: 'Carte clé pour les requêtes sur la prévision de surcharge carburant de juillet2026 et le prix des billets.',
        sourceName: 'Synthèse des indicateurs de marché (2026.05.25 10:30 KST)',
        tags: ['NEW', 'prévision juillet', 'surcharge carburant', 'juillet2026', 'vols internationaux'],
        faq: [
          { q: 'La surcharge de juillet peut-elle encore baisser ?', a: 'Oui, c’est possible. Le MOPS pousse à la baisse, mais l’USD/KRW, la demande estivale et le risque Moyen-Orient peuvent limiter l’effet.' },
          { q: 'Quelle différence entre juin confirmé et juillet prévu ?', a: 'Juin repose sur les annonces des compagnies. Juillet est une prévision de marché fondée sur MOPS, change, pétrole et risque géopolitique.' },
          { q: 'Faut-il réserver maintenant ?', a: 'Sur court-courrier, le tarif de base peut compter davantage. Sur long-courrier, comparez surcharge et change ensemble.' }
        ],
        links: [
          { href: 'forecast.html', label: 'Prévision détaillée de juillet2026' },
          { href: 'fuel-surcharge-calculator.html', label: 'Calculer l’économie mai-juin' },
          { href: 'airlines.html', label: 'Voir les annonces officielles' },
          { href: 'fuel-surcharge-graph.html', label: 'Graphique mensuel' }
        ]
      },
      de: {
        updatedAt: 'Aktualisiert2026.05.25 10:30 KST',
        title: 'Kerosinzuschlag Juli2026: Stabilisierung oder begrenzte Senkung wahrscheinlicher',
        aiBrief: 'Stand2026.05.25 10:30 KST wirkt der Juli-Zuschlag2026 eher stabil als sprunghaft steigend. MOPS fiel deutlich, und der internationale Juni-Zuschlag sank von Stufe 33 auf Stufe2.',
        summary: 'Der Markt geht derzeit davon aus, dass der Preisspitzenbereich bei Flugkraftstoff vorerst überschritten ist.\n\nNach dem MOPS-Rückgang sank der internationale Juni-Zuschlag von Stufe 33 auf Stufe2. Für Juli sind eine weitere Senkung oder Stabilisierung wahrscheinlicher, doch Sommernachfrage und USD/KRW können den Umfang begrenzen.\n\nBei Kurzstrecken zählt oft der Basistarif stärker. Bei Langstrecken sollten Zuschlag und Wechselkurs gemeinsam geprüft werden.',
        impact: 'Kernkarte für Suchanfragen zu Juli-2026-Zuschlag, internationalen Zuschlägen und Ticketpreis-Prognosen.',
        sourceName: 'Marktindikatoren-Synthese (2026.05.25 10:30 KST)',
        tags: ['NEW', 'Juli-Ausblick', 'Kerosinzuschlag', 'Juli2026', 'internationaler Zuschlag'],
        faq: [
          { q: 'Kann der Juli-Zuschlag weiter sinken?', a: 'Ja, das ist möglich. MOPS wirkt senkend, aber USD/KRW, Sommernachfrage und Nahost-Risiken können den Umfang begrenzen.' },
          { q: 'Was unterscheidet Juni-Daten und Juli-Ausblick?', a: 'Juni basiert auf Airline-Meldungen. Juli ist ein Marktausblick aus MOPS, Wechselkurs, Ölpreis und geopolitischem Risiko.' },
          { q: 'Sollte man jetzt buchen?', a: 'Bei Kurzstrecken kann der Grundtarif wichtiger sein. Bei Langstrecken sollten Zuschlag und Wechselkurs zusammen verglichen werden.' }
        ],
        links: [
          { href: 'forecast.html', label: 'Detaillierter Juli-Ausblick2026' },
          { href: 'fuel-surcharge-calculator.html', label: 'Ersparnis Mai-Juni berechnen' },
          { href: 'airlines.html', label: 'Offizielle Airline-Meldungen prüfen' },
          { href: 'fuel-surcharge-graph.html', label: 'Monatsdiagramm ansehen' }
        ]
      }
    }
  },
  {
    id: 'news-20260525-mops-market-stabilization',
    slug: 'mops-drop-jet-fuel-market-stabilization-2026',
    category: 'market',
    priority: 1,
    date: '2026-05-25',
    updatedAt: '2026.05.25 10:30 KST 업데이트',
    aiSummary: true,
    relevanceScore: 1,
    title: 'MOPS 급락 이후 항공유 가격 안정 흐름: 511.21 → 410.02 cents/gal',
    aiBrief: '싱가포르 항공유(MOPS)는 511.21에서 410.02 cents/gal로 내려오며 항공유 가격 전망을 안정 쪽으로 바꿨습니다. 이 흐름은 6월 유류할증료 33단계 → 27단계 하락의 핵심 배경입니다.',
    summary: 'MOPS는 국제선 유류할증료 산정에 직접 연결되는 대표 항공유 가격 지표입니다.\n\n5월 중순 이후 MOPS가 급락하면서 항공업계에서는 급등 피크가 일단 지나갔다는 분위기가 강해졌습니다. 유럽 및 글로벌 공급망 안정, 정유사의 항공유 생산 확대도 공급 공포 완화에 기여했습니다.\n\n다만 중동 리스크는 여전히 변수입니다. MOPS가 안정돼도 호르무즈 리스크가 재점화되면 항공유 가격 전망은 다시 흔들릴 수 있습니다.',
    impact: 'MOPS 하락, 항공유 가격, 항공유 가격 전망 검색에 대응하는 카드입니다.',
    sourceName: 'MOPS 및 항공유 가격 흐름 종합',
    sourceUrl: 'fuel-surcharge-graph.html',
    tags: ['NEW', 'MOPS', '항공유 가격', '항공유 가격 전망', '33단계 → 27단계'],
    faq: [
      { q: 'MOPS 하락이 의미하는 것은?', a: 'MOPS 하락은 항공사의 연료비 부담이 줄어들 수 있다는 뜻입니다. 유류할증료에는 시차가 있지만, 국제선 유류할증료 인하 압력으로 작용합니다.' },
      { q: 'MOPS 511.21에서 410.02 cents/gal 하락은 큰 변화인가요?', a: '약 101.19 cents/gal 하락으로, 6월 유류할증료가 33단계에서 27단계로 내려간 배경으로 해석할 수 있습니다.' },
      { q: '항공유 가격이 안정되면 항공권도 바로 싸지나요?', a: '바로 연결되지는 않습니다. 항공권 총액은 운임, 좌석 상황, 환율, 세금, 유류할증료가 함께 결정합니다.' }
    ],
    links: [
      { href: 'fuel-surcharge-graph.html', label: 'MOPS·유류할증료 추세 보기' },
      { href: 'news.html#news-20260525-july-surcharge-stabilization', label: '7월 전망 카드 보기' },
      { href: 'forecast.html', label: '7월 예상 시나리오 확인' }
    ],
    i18n: {
      en: {
        updatedAt: 'Updated2026.05.25 10:30 KST',
        title: 'Jet fuel market stabilizes after MOPS drop: 511.21 → 410.02 cents/gal',
        aiBrief: 'Singapore jet fuel MOPS fell from 511.21 to 410.02 cents/gal. This shift supports a more stable jet fuel price outlook and explains the Level 33 → Level 27 June surcharge drop.',
        summary: 'MOPS is one of the key jet fuel benchmarks behind international fuel surcharge calculations.\n\nAfter the mid-May MOPS drop, the airline market view is that the spike has likely passed for now. More stable European and global supply chains and increased refinery output helped ease supply fear.\n\nMiddle East risk remains a variable. If Hormuz risk returns, the jet fuel price outlook can become volatile again.',
        impact: 'Supports search intent for MOPS decline, jet fuel prices, and jet fuel price outlook.',
        sourceName: 'MOPS and jet fuel price trend synthesis',
        tags: ['NEW', 'MOPS', 'jet fuel price', 'jet fuel price outlook', 'Level 33 → Level 27'],
        faq: [
          { q: 'What does the MOPS drop mean?', a: 'It means airline fuel-cost pressure may ease. There is a lag, but it creates downward pressure on international fuel surcharges.' },
          { q: 'Is 511.21 to 410.02 cents/gal a large move?', a: 'Yes. It is a drop of about 101.19 cents/gal and helps explain the Level 33 to Level 27 change.' },
          { q: 'Do air tickets get cheaper immediately?', a: 'Not necessarily. Total price also depends on fare, seats, FX, taxes, and surcharge.' }
        ],
        links: [
          { href: 'fuel-surcharge-graph.html', label: 'See MOPS and surcharge trend' },
          { href: 'news.html#news-20260525-july-surcharge-stabilization', label: 'Read July outlook card' },
          { href: 'forecast.html', label: 'Check July scenarios' }
        ]
      }
    }
  },
  {
    id: 'news-20260525-usdkrw-ticket-burden',
    slug: 'usd-krw-exchange-rate-ticket-price-burden-2026',
    category: 'market',
    priority: 1,
    date: '2026-05-25',
    updatedAt: '2026.05.25 10:30 KST 업데이트',
    aiSummary: true,
    relevanceScore: 0.95,
    title: '환율 부담은 아직 지속: 유류할증료가 내려도 항공권 체감 가격은 제한적',
    aiBrief: 'USD/KRW 환율 부담은2026년 7월 유류할증료 전망의 핵심 변수입니다. 유류할증료가 내려가도 환율과 성수기 운임이 높으면 항공권 가격 전망은 크게 낮아지기 어렵습니다.',
    summary: '유류할증료는 항공유 가격뿐 아니라 달러 기반 비용과 원화 환산 부담의 영향을 받습니다.\n\n현재 시장은 환율 변동성이 일부 완화됐지만 USD/KRW 부담이 계속되는 구간으로 해석됩니다. 따라서 MOPS 하락이 있더라도 항공권 유류할증료 인하 효과가 소비자 총액에 모두 반영되지는 않을 수 있습니다.\n\n여행객은 유류할증료만 보지 말고 환율 전망, 성수기 운임, 좌석 상황까지 함께 확인해야 합니다.',
    impact: '환율 전망, 항공권 가격 전망, 항공권 유류할증료 검색 의도에 대응합니다.',
    sourceName: 'USD/KRW 및 항공권 가격 변수 분석',
    sourceUrl: 'fuel-surcharge-calculator.html',
    tags: ['NEW', '환율 전망', 'USD/KRW', '항공권 가격 전망', '항공권 유류할증료'],
    faq: [
      { q: '환율이 항공권 가격에 미치는 영향은?', a: 'USD/KRW가 높으면 달러 기반 연료비와 해외 비용의 원화 부담이 커집니다. 유류할증료가 내려도 항공권 총액 하락이 제한될 수 있습니다.' },
      { q: '유류할증료가 내려가면 무조건 싸게 살 수 있나요?', a: '아닙니다. 여름 성수기 운임과 좌석 수급이 높게 형성되면 유류할증료 인하 효과가 줄어들 수 있습니다.' },
      { q: '소비자는 무엇을 같이 봐야 하나요?', a: '발권월 유류할증료, 실시간 운임, USD/KRW 환율, 좌석 상황을 함께 비교해야 합니다.' }
    ],
    links: [
      { href: 'fuel-surcharge-calculator.html', label: '발권월별 절약액 계산하기' },
      { href: 'index.html', label: '노선별 유류할증료 조회' },
      { href: 'forecast.html', label: '환율 변수 반영 전망 보기' }
    ],
    i18n: {
      en: {
        updatedAt: 'Updated2026.05.25 10:30 KST',
        title: 'USD/KRW burden persists: lower surcharge may not fully lower perceived ticket cost',
        aiBrief: 'USD/KRW remains a key variable for the July 2026 fuel surcharge outlook. Even if surcharges fall, high FX and peak-season fares can keep ticket prices elevated.',
        summary: 'Fuel surcharges are affected not only by jet fuel prices but also by dollar-linked costs and won conversion.\n\nThe market sees some easing in FX volatility, but USD/KRW remains a burden. As a result, lower MOPS may not fully translate into lower consumer ticket totals.\n\nTravelers should check surcharge, FX outlook, peak-season fare, and seat availability together.',
        impact: 'Supports exchange-rate outlook, air ticket price forecast, and ticket fuel surcharge search intent.',
        sourceName: 'USD/KRW and air ticket price variable analysis',
        tags: ['NEW', 'exchange rate outlook', 'USD/KRW', 'air ticket price forecast', 'ticket fuel surcharge'],
        faq: [
          { q: 'How does FX affect ticket prices?', a: 'A high USD/KRW raises won-denominated dollar costs, so lower surcharges may not fully reduce the total ticket price.' },
          { q: 'Does a lower surcharge always mean cheaper tickets?', a: 'No. Peak-season fares and seat availability can offset the surcharge benefit.' },
          { q: 'What should travelers compare?', a: 'Compare ticketing-month surcharge, live fare, USD/KRW, and seat availability together.' }
        ],
        links: [
          { href: 'fuel-surcharge-calculator.html', label: 'Calculate ticketing-month savings' },
          { href: 'index.html', label: 'Search surcharge by route' },
          { href: 'forecast.html', label: 'See FX in July outlook' }
        ]
      }
    }
  },
  {
    id: 'news-20260525-hormuz-risk-variable',
    slug: 'hormuz-risk-middle-east-oil-jet-fuel-variable-2026',
    category: 'market',
    priority: 1,
    date: '2026-05-25',
    updatedAt: '2026.05.25 10:30 KST 업데이트',
    aiSummary: true,
    relevanceScore: 0.95,
    title: '호르무즈 변수는 여전히 존재: 공급망 안정에도 중동 리스크는 7월 유류할증료 변수',
    aiBrief: '유럽 및 글로벌 공급망은 안정되는 흐름이지만 중동 리스크는 여전히 변수입니다. 호르무즈 해협 관련 불확실성이 재점화되면 Brent와 항공유 가격 전망이 다시 흔들릴 수 있습니다.',
    summary: '공급망 안정과 정유사 항공유 생산 확대는 항공유 가격 안정에 긍정적입니다.\n\n하지만 중동 리스크는 여전히 변수입니다. 미국-이란 협상 기대감은 위험 프리미엄을 낮추는 요인이지만, 호르무즈 해협 관련 불확실성이 완전히 사라진 것은 아닙니다.\n\n7월 유류할증료 전망은 안정화가 우세하되, 호르무즈 변수가 재점화되면 변동성이 확대될 수 있다는 점을 함께 봐야 합니다.',
    impact: '중동 리스크, 호르무즈 해협, Brent, 항공유 가격 전망 검색 의도에 대응합니다.',
    sourceName: '중동 리스크 및 공급망 흐름 종합',
    sourceUrl: 'forecast.html',
    tags: ['NEW', '호르무즈 리스크', '중동 리스크', 'Brent', '항공유 가격 전망'],
    faq: [
      { q: '호르무즈 리스크가 유류할증료에 영향을 주나요?', a: '영향을 줄 수 있습니다. 호르무즈 리스크는 Brent와 항공유 가격의 위험 프리미엄을 높여 유류할증료 하락을 제한할 수 있습니다.' },
      { q: '공급망 안정은 어떤 의미인가요?', a: '글로벌 공급망 안정과 정유사 생산 확대는 항공유 공급 공포를 낮추며 MOPS 안정에 도움이 됩니다.' },
      { q: '7월 전망에서 가장 중요한 변수는 무엇인가요?', a: 'MOPS 하락, USD/KRW 환율, 여름 항공유 수요, 호르무즈 리스크를 함께 봐야 합니다.' }
    ],
    links: [
      { href: 'forecast.html', label: '7월 유류할증료 변수 정리' },
      { href: 'news.html#news-20260525-mops-market-stabilization', label: 'MOPS 안정 카드 보기' },
      { href: 'fuel-surcharge-graph.html', label: '월별 변동 흐름 확인' }
    ],
    i18n: {
      en: {
        updatedAt: 'Updated2026.05.25 10:30 KST',
        title: 'Hormuz risk remains a variable for July fuel surcharge despite supply-chain stabilization',
        aiBrief: 'European and global supply chains are stabilizing, but Middle East risk remains a variable. If Strait of Hormuz uncertainty returns, Brent and jet fuel price outlooks can become volatile again.',
        summary: 'Supply-chain stabilization and higher refinery jet fuel output are positive for jet fuel prices.\n\nHowever, Middle East risk remains a variable. US-Iran negotiation hopes can reduce risk premium, but Strait of Hormuz uncertainty has not fully disappeared.\n\nFor July fuel surcharges, stabilization is more likely, but renewed Hormuz risk could increase volatility.',
        impact: 'Supports search intent for Middle East risk, Strait of Hormuz, Brent, and jet fuel price outlook.',
        sourceName: 'Middle East risk and supply-chain trend synthesis',
        tags: ['NEW', 'Hormuz risk', 'Middle East risk', 'Brent', 'jet fuel price outlook'],
        faq: [
          { q: 'Can Hormuz risk affect fuel surcharges?', a: 'Yes. It can raise risk premium in Brent and jet fuel prices, limiting surcharge declines.' },
          { q: 'What does supply-chain stabilization mean?', a: 'Stable global supply chains and higher refinery output reduce supply fear and support MOPS stability.' },
          { q: 'What are the key July variables?', a: 'MOPS decline, USD/KRW, summer fuel demand, and Hormuz risk should be checked together.' }
        ],
        links: [
          { href: 'forecast.html', label: 'See July surcharge variables' },
          { href: 'news.html#news-20260525-mops-market-stabilization', label: 'Read MOPS stabilization card' },
          { href: 'fuel-surcharge-graph.html', label: 'Check monthly trend' }
        ]
      }
    }
  }
];

/* Reuse English card text for languages that should not fall back to Korean when
   a full localized editorial version is not yet available. */
(function(){
  ['ja','zh','fr','de'].forEach(function(lang){
    (window.AERO_NEWS_CARDS_20260525 || []).forEach(function(card){
      if(!card.i18n) card.i18n = {};
      if(!card.i18n[lang] && card.i18n.en) card.i18n[lang] = card.i18n.en;
    });
  });
})();

/*2026.05.24 10:30 KST topic-based news cards
   Shared data shape for news.html, FAQ schema, and future archive reuse. */
window.AERO_NEWS_CARDS_20260524 = [
  {
    id: 'news-20260524-june-surcharge-cut',
    slug: 'june-international-fuel-surcharge-cut-2026',
    category: 'airline',
    priority: 1,
    date: '2026-05-24',
    updatedAt: '2026.05.24 10:30 KST 업데이트',
    aiSummary: true,
    relevanceScore: 1,
    title: '2026년 6월 국제선 유류할증료 인하 확정: 대한항공 최대 112,500원 인하',
    aiBrief: '2026년 6월 발권 국제선 유류할증료는 항공유 가격 하락 영향으로 인하 흐름이 확정되었습니다. 대한항공 기준 장거리 최상위 구간은 564,000원에서 451,500원으로 112,500원 내려갔습니다.',
    summary: '6월 국제선 유류할증료는 5월 대비 낮아진 항공유 기준 가격을 반영해 주요 구간에서 인하되었습니다.\n\n핵심 변화\n- 대한항공 최상위 장거리: 564,000원 -> 451,500원\n- 인하액: 112,500원\n- 소비자 관점: 6월 발권분은 5월 발권분보다 유류할증료 부담이 낮아졌습니다.\n\n다만 유류할증료는 발권일 기준으로 적용되므로 실제 결제 전 항공사 예매 화면의 총액을 확인해야 합니다.',
    impact: '국제선 유류할증료 인하 검색 의도에 대응하는 확정 데이터 카드입니다.',
    sourceName: '대한항공 6월 공시 및 항공업계 보도 기반',
    sourceUrl: 'https://biz.chosun.com/industry/company/2026/05/18/WC6GLCWTA5C2DCUFP3UZ4PCVFE/?outputType=amp',
    tags: ['국제선 유류할증료 인하', '대한항공 유류할증료', '2026년 6월 유류할증료', '발권일 기준'],
    faq: [
      { q: '2026년 6월 국제선 유류할증료는 인하됐나요?', a: '네. 대한항공 등 주요 항공사의 6월 국제선 유류할증료는 5월 대비 인하 흐름이 확인됩니다.' },
      { q: '대한항공 유류할증료는 얼마나 내려갔나요?', a: '대한항공 최상위 장거리 구간은 564,000원에서 451,500원으로 112,500원 인하되었습니다.' },
      { q: '유류할증료는 탑승일 기준인가요?', a: '아닙니다. 유류할증료는 일반적으로 탑승일이 아니라 발권일 기준으로 적용됩니다.' }
    ],
    links: [
      { href: 'airlines.html', label: '항공사별 유류할증료 공시 보기' },
      { href: 'index.html', label: '노선별 유류할증료 조회' },
      { href: 'fuel-surcharge-graph.html', label: '월별 유류할증료 그래프 확인' }
    ]
  },
  {
    id: 'news-20260524-mops-drop',
    slug: 'mops-jet-fuel-price-drop-2026',
    category: 'market',
    priority: 1,
    date: '2026-05-24',
    updatedAt: '2026.05.24 10:30 KST 업데이트',
    aiSummary: true,
    relevanceScore: 1,
    title: 'MOPS 급락으로 국제선 유류할증료 하락세 지속: 511.21 -> 410.02 cents/gal',
    aiBrief: '싱가포르 항공유 가격 지표인 MOPS가 511.21 cents/gal에서 410.02 cents/gal로 하락했습니다. 항공유 기준 가격 하락은 6월 유류할증료 인하의 핵심 배경이며, 7월 추가 인하 가능성을 판단할 때도 가장 중요한 변수입니다.',
    summary: 'MOPS는 국제선 유류할증료 산정에 직접 영향을 주는 항공유 가격 지표입니다.\n\n수치 변화\n- 이전 고점 참고: 511.21 cents/gal\n- 6월 산정 기준 보도: 410.02 cents/gal\n- 변화: 약 101.19 cents/gal 하락\n\nMOPS 하락은 유류할증료 인하 압력으로 작용합니다. 다만 7월 유류할증료는 6월 중 평균 항공유 가격과 환율, 항공사별 공시 기준을 함께 봐야 합니다.',
    impact: 'MOPS 하락, 항공유 가격, 유류할증료 예상 검색 의도에 대응합니다.',
    sourceName: '항공유 MOPS 기준 가격 보도',
    sourceUrl: 'https://biz.chosun.com/industry/company/2026/05/18/WC6GLCWTA5C2DCUFP3UZ4PCVFE/?outputType=amp',
    tags: ['MOPS 하락', '항공유 가격', '싱가포르 항공유', '유류할증료 예상'],
    faq: [
      { q: 'MOPS 하락이 왜 유류할증료에 중요한가요?', a: 'MOPS는 항공유 가격 기준으로 쓰이며, 항공유 가격이 내려가면 국제선 유류할증료 인하 압력이 커집니다.' },
      { q: 'MOPS 410.02 cents/gal은 무엇을 의미하나요?', a: '6월 유류할증료 산정 기준이 된 싱가포르 항공유 현물시장 가격 지표로 보도된 수치입니다.' },
      { q: 'MOPS가 하락하면 7월 유류할증료도 무조건 내려가나요?', a: '무조건은 아닙니다. 7월에는 6월 중 항공유 평균, 원달러 환율, 항공사 정책이 함께 반영됩니다.' }
    ],
    links: [
      { href: 'forecast.html', label: '2026년 7월 유류할증료 전망 보기' },
      { href: 'fuel-surcharge-graph.html', label: 'MOPS와 유류할증료 흐름 비교' },
      { href: 'fuel-surcharge-calculator.html', label: '발권월별 절약액 계산' }
    ]
  },
  {
    id: 'news-20260524-usdkrw-stabilizes',
    slug: 'usd-krw-fuel-surcharge-relationship-2026',
    category: 'market',
    priority: 1,
    date: '2026-05-24',
    updatedAt: '2026.05.24 10:30 KST 업데이트',
    aiSummary: true,
    relevanceScore: 0.95,
    title: '원달러 환율 변동성 완화: 유류할증료 추가 인하를 제한하는 변수는 여전히 환율',
    aiBrief: '2026.05.24 10:30 KST는 주말 시점이므로 최신 실시간 환율 대신2026.05.22 공개 USD/KRW 데이터를 참고해야 합니다. 원달러 환율은 1,500원대 전후의 높은 구간에 있어 MOPS 하락 효과를 일부 제한할 수 있습니다.',
    summary: '원달러 환율은 항공사가 원화 기준 유류할증료를 공시할 때 중요한 변수입니다.\n\n확인 기준\n-2026.05.22 공개 USD/KRW 데이터: 약 1,504~1,512원 범위\n-2026.05.24 10:30 KST: 주말 시점으로 실시간 환율 확인 필요\n- 해석: 변동성은 다소 완화됐지만 환율 레벨은 여전히 높은 편입니다.\n\n따라서 MOPS가 내려가더라도 원달러 환율이 높게 유지되면 7월 유류할증료 인하 폭은 제한될 수 있습니다.',
    impact: '환율과 항공권 가격 관계, 유류할증료 인하 제한 요인을 설명합니다.',
    sourceName: 'USD/KRW 공개 환율 히스토리',
    sourceUrl: 'https://www.poundsterlinglive.com/history/USD-KRW-2026',
    tags: ['원달러 환율', 'USD/KRW', '항공권 가격', '유류할증료 영향'],
    faq: [
      { q: '환율이 유류할증료에 영향을 주나요?', a: '네. 항공유 가격이 달러 기반으로 움직이기 때문에 원달러 환율이 높으면 원화 기준 유류할증료 인하 폭이 줄어들 수 있습니다.' },
      { q: '2026.05.24 10:30 KST 환율은 왜 실시간 확인이 필요한가요?', a: '해당 시점은 주말로 시장 데이터 제공처마다 반영 방식이 달라 최종 결제 전 실시간 환율 확인이 필요합니다.' },
      { q: '환율 변동성이 완화되면 항공권이 바로 싸지나요?', a: '바로 반영되지는 않습니다. 항공권 총액은 운임, 유류할증료, 세금, 좌석 상황이 함께 결정합니다.' }
    ],
    links: [
      { href: 'fuel-surcharge-calculator.html', label: '환율 반영 절약액 계산하기' },
      { href: 'forecast.html', label: '7월 유류할증료 환율 변수 보기' },
      { href: 'index.html', label: '노선별 총 부담 확인' }
    ]
  },
  {
    id: 'news-20260524-hormuz-risk',
    slug: 'hormuz-risk-oil-price-fuel-surcharge-2026',
    category: 'market',
    priority: 1,
    date: '2026-05-24',
    updatedAt: '2026.05.24 10:30 KST 업데이트',
    aiSummary: true,
    relevanceScore: 0.95,
    title: '호르무즈 해협 리스크 현황: 미국-이란 협상 기대감에도 완전 해소는 아님',
    aiBrief: '미국-이란 협상 기대감은 국제유가의 리스크 프리미엄을 낮추는 요인입니다. 다만 호르무즈 해협 관련 불확실성이 완전히 사라진 것은 아니어서 7월 유류할증료 전망에는 하방 요인과 상방 리스크가 동시에 남아 있습니다.',
    summary: '호르무즈 해협 리스크는 국제유가와 항공유 가격에 영향을 주는 지정학 변수입니다.\n\n현재 해석\n- 미국-이란 협상 기대감: 유가 리스크 프리미엄 완화 요인\n- 호르무즈 리스크: 완전 해소 전\n- 유류할증료 영향: MOPS 하락을 지지하지만, 지정학 재확대 시 인하 폭이 줄어들 수 있음\n\n즉 7월 유류할증료는 추가 인하 가능성이 존재하지만, 지정학 리스크가 재확대될 경우 일부 구간은 제한적 조정에 그칠 수 있습니다.',
    impact: '호르무즈 해협 리스크와 국제유가가 유류할증료에 미치는 영향을 분리 설명합니다.',
    sourceName: 'AP 미국-이란 협상 및 호르무즈 보도',
    sourceUrl: 'https://apnews.com/article/1c283f26d037102cc5e6f798546d0e59',
    tags: ['호르무즈 해협 리스크', '국제유가', '미국 이란 협상', '항공유 가격'],
    faq: [
      { q: '호르무즈 해협 리스크가 유류할증료에 영향을 주나요?', a: '네. 호르무즈 리스크는 국제유가와 항공유 가격의 리스크 프리미엄을 키워 유류할증료 하락을 제한할 수 있습니다.' },
      { q: '미국-이란 협상 기대감은 유류할증료에 어떤 의미인가요?', a: '협상 기대감은 유가와 항공유 가격을 낮추는 방향으로 작용할 수 있어 7월 유류할증료 추가 인하 가능성을 높입니다.' },
      { q: '호르무즈 리스크는 완전히 해소됐나요?', a: '아직 완전 해소로 보기 어렵습니다. 협상 기대감은 있지만 시장은 일부 리스크 프리미엄을 유지하고 있습니다.' }
    ],
    links: [
      { href: 'news.html#news-20260524-mops-drop', label: 'MOPS 하락 카드 함께 보기' },
      { href: 'forecast.html', label: '7월 전망에서 지정학 변수 확인' },
      { href: 'fuel-surcharge-graph.html', label: '유류할증료 추세 그래프 보기' }
    ]
  },
  {
    id: 'news-20260524-july-outlook',
    slug: 'july-2026-fuel-surcharge-outlook',
    category: 'market',
    priority: 1,
    date: '2026-05-24',
    updatedAt: '2026.05.24 10:30 KST 업데이트',
    aiSummary: true,
    relevanceScore: 1,
    title: '2026년 7월 유류할증료 추가 인하 가능성: MOPS 하락과 환율이 핵심 변수',
    aiBrief: '2026년 7월 유류할증료는 6월 확정 공시가 아니라 시장 기반 전망으로 봐야 합니다. MOPS가 410.02 cents/gal까지 내려간 점은 추가 인하 요인이지만, 원달러 환율과 호르무즈 리스크가 인하 폭을 제한할 수 있습니다.',
    summary: '2026년 7월 유류할증료는 아직 확정 공시가 아닙니다. 현재 기준으로는 추가 인하 가능성이 존재하지만, 인하 폭은 제한될 수 있습니다.\n\n7월 전망 핵심\n- 인하 요인: MOPS 511.21 -> 410.02 cents/gal 하락\n- 제한 요인: 원달러 환율 1,500원대 전후\n- 리스크 요인: 호르무즈 해협 불확실성 완전 해소 전\n- 소비자 판단: 단거리 노선은 운임 자체, 장거리 노선은 유류할증료와 환율을 함께 확인\n\n결론: 7월 유류할증료는 추가 인하 가능성이 존재하지만, 확정 금액은 6월 중 항공사 공식 공시를 확인해야 합니다.',
    impact: '2026년 7월 유류할증료 전망, 유류할증료 예상 검색 의도에 대응하는 대표 카드입니다.',
    sourceName: '시장 지표 종합 분석 (2026.05.24 10:30 KST)',
    sourceUrl: 'forecast.html',
    tags: ['2026년 7월 유류할증료 전망', '유류할증료 예상', '국제선 유류할증료 인하', 'MOPS 하락'],
    faq: [
      { q: '2026년 7월 유류할증료는 더 내려갈 가능성이 있나요?', a: '가능성은 있습니다. MOPS 하락은 추가 인하 요인이지만, 환율과 지정학 리스크 때문에 인하 폭은 제한될 수 있습니다.' },
      { q: '7월 유류할증료는 확정됐나요?', a: '아직 확정 공시가 아닙니다. 7월 확정 금액은 6월 중 각 항공사 공식 채널에서 확인해야 합니다.' },
      { q: '단거리와 장거리 노선 중 어디가 유류할증료 영향을 더 받나요?', a: '단거리 노선은 운임 자체 영향이 더 클 수 있고, 장거리 노선은 유류할증료와 환율 영향을 함께 확인하는 것이 유리합니다.' }
    ],
    links: [
      { href: 'forecast.html', label: '2026년 7월 유류할증료 전망 상세' },
      { href: 'fuel-surcharge-calculator.html', label: '5월·6월 발권 절약액 계산' },
      { href: 'airlines.html', label: '항공사별 공식 공시 확인' }
    ]
  }
];

(function(){
  var tr = {
    'news-20260524-june-surcharge-cut': {
      en: {
        updatedAt: 'Updated2026.05.24 10:30 KST',
        title: 'June 2026 international fuel surcharge cuts confirmed: Korean Air down by up to KRW 112,500',
        aiBrief: 'June 2026 ticketing surcharges are moving lower as jet fuel prices fell. Korean Air’s highest long-haul band declined from KRW 564,000 to KRW 451,500, a KRW 112,500 reduction.',
        summary: 'The June international fuel surcharge reflects a lower jet fuel pricing base versus May.\n\nKey change\n- Korean Air highest long-haul band: KRW 564,000 -> KRW 451,500\n- Reduction: KRW 112,500\n- Consumer meaning: June ticketing carries a lower surcharge burden than May ticketing.\n\nFuel surcharges apply by ticketing date, so always confirm the final total on the airline booking screen.',
        impact: 'Confirmed-data card for searches about international fuel surcharge cuts.',
        sourceName: 'Korean Air June filing and airline-industry reporting',
        tags: ['international fuel surcharge cut', 'Korean Air fuel surcharge', 'June 2026 fuel surcharge', 'ticketing date basis'],
        faq: [
          { q: 'Did June 2026 international fuel surcharges go down?', a: 'Yes. Major Korea-departure international surcharges including Korean Air show a lower June filing versus May.' },
          { q: 'How much did Korean Air’s surcharge fall?', a: 'The highest long-haul band fell from KRW 564,000 to KRW 451,500, down KRW 112,500.' },
          { q: 'Are fuel surcharges based on travel date?', a: 'No. They are generally applied by ticketing date, not departure date.' }
        ],
        links: [
          { href: 'airlines.html', label: 'View airline surcharge notices' },
          { href: 'index.html', label: 'Search surcharge by route' },
          { href: 'fuel-surcharge-graph.html', label: 'See monthly surcharge chart' }
        ]
      }
    },
    'news-20260524-mops-drop': {
      en: {
        updatedAt: 'Updated2026.05.24 10:30 KST',
        title: 'MOPS drop keeps international fuel surcharge trend lower: 511.21 -> 410.02 cents/gal',
        aiBrief: 'Singapore jet fuel MOPS fell from 511.21 to 410.02 cents/gal. This drop is the key reason June surcharges came down and the most important variable for possible July cuts.',
        summary: 'MOPS is a jet fuel price benchmark that directly affects international fuel surcharge calculations.\n\nNumerical change\n- Previous high reference: 511.21 cents/gal\n- Reported June calculation base: 410.02 cents/gal\n- Change: down about 101.19 cents/gal\n\nLower MOPS creates downward pressure on surcharges. July still depends on June average jet fuel prices, FX rates, and each airline’s filing rules.',
        impact: 'Covers search intent for MOPS decline, jet fuel prices, and fuel surcharge forecasts.',
        sourceName: 'Reported jet fuel MOPS benchmark',
        tags: ['MOPS drop', 'jet fuel price', 'Singapore jet fuel', 'fuel surcharge forecast'],
        faq: [
          { q: 'Why does MOPS matter for fuel surcharges?', a: 'MOPS is used as a jet fuel price benchmark. When jet fuel falls, downward pressure on international fuel surcharges increases.' },
          { q: 'What does 410.02 cents/gal mean?', a: 'It is the reported Singapore jet fuel spot-market benchmark used for June surcharge calculations.' },
          { q: 'If MOPS falls, will July surcharges automatically fall?', a: 'Not automatically. July also reflects June average jet fuel prices, USD/KRW, and airline policy.' }
        ],
        links: [
          { href: 'forecast.html', label: 'View July 2026 surcharge outlook' },
          { href: 'fuel-surcharge-graph.html', label: 'Compare MOPS and surcharge trends' },
          { href: 'fuel-surcharge-calculator.html', label: 'Calculate ticketing-month savings' }
        ]
      }
    },
    'news-20260524-usdkrw-stabilizes': {
      en: {
        updatedAt: 'Updated2026.05.24 10:30 KST',
        title: 'USD/KRW volatility eases, but FX still limits further fuel surcharge cuts',
        aiBrief: 'Because2026.05.24 10:30 KST falls on a weekend, the latest public USD/KRW reference is the May 282 range. The exchange rate remains around the high 1,500 KRW zone, which can limit the benefit from lower MOPS.',
        summary: 'USD/KRW matters when airlines publish won-denominated fuel surcharges.\n\nReference points\n- Public May 282 USD/KRW data: roughly KRW 1,504~1,512\n-2026.05.24 10:30 KST: real-time weekend FX check required\n- Interpretation: volatility has eased somewhat, but the level is still high.\n\nEven if MOPS falls, a high USD/KRW rate can limit the size of July surcharge cuts.',
        impact: 'Explains how FX can limit fuel surcharge cuts and affect ticket totals.',
        sourceName: 'Public USD/KRW history',
        tags: ['USD/KRW', 'exchange rate', 'air ticket price', 'fuel surcharge impact'],
        faq: [
          { q: 'Does exchange rate affect fuel surcharges?', a: 'Yes. Jet fuel is dollar-linked, so a high USD/KRW can reduce the won-denominated benefit of lower fuel prices.' },
          { q: 'Why check real-time FX for2026.05.24 10:30 KST?', a: 'It is a weekend timestamp, and providers can differ in how they publish or roll forward data.' },
          { q: 'Does lower FX volatility immediately make tickets cheaper?', a: 'No. Total ticket price also depends on fare, taxes, surcharge, and seat availability.' }
        ],
        links: [
          { href: 'fuel-surcharge-calculator.html', label: 'Calculate FX-adjusted savings' },
          { href: 'forecast.html', label: 'See FX variable in July outlook' },
          { href: 'index.html', label: 'Check route-level total burden' }
        ]
      }
    },
    'news-20260524-hormuz-risk': {
      en: {
        updatedAt: 'Updated2026.05.24 10:30 KST',
        title: 'Strait of Hormuz risk update: US-Iran talks help, but risk is not fully resolved',
        aiBrief: 'US-Iran negotiation hopes can reduce the oil risk premium. However, Hormuz uncertainty has not fully disappeared, so the July surcharge outlook still contains both downside support and upside risk.',
        summary: 'Hormuz risk is a geopolitical variable for crude oil and jet fuel prices.\n\nCurrent reading\n- US-Iran talks: possible easing factor for oil risk premium\n- Hormuz risk: not fully resolved\n- Surcharge impact: supports lower MOPS, but renewed tension could limit cuts\n\nJuly surcharges may fall further, but renewed geopolitical risk could keep some bands from moving much.',
        impact: 'Separates the effect of Hormuz risk and oil prices on fuel surcharges.',
        sourceName: 'AP reporting on US-Iran talks and Hormuz risk',
        tags: ['Strait of Hormuz risk', 'oil price', 'US Iran talks', 'jet fuel price'],
        faq: [
          { q: 'Does Hormuz risk affect fuel surcharges?', a: 'Yes. Hormuz risk can lift the risk premium in crude and jet fuel prices, limiting surcharge declines.' },
          { q: 'What do US-Iran talks mean for surcharges?', a: 'Negotiation hopes can ease oil and jet fuel prices, increasing the chance of July surcharge cuts.' },
          { q: 'Is Hormuz risk fully resolved?', a: 'No. There are negotiation hopes, but the market still keeps some risk premium.' }
        ],
        links: [
          { href: 'news.html#news-20260524-mops-drop', label: 'Read the MOPS drop card' },
          { href: 'forecast.html', label: 'Check geopolitics in July outlook' },
          { href: 'fuel-surcharge-graph.html', label: 'See surcharge trend chart' }
        ]
      }
    },
    'news-20260524-july-outlook': {
      en: {
        updatedAt: 'Updated2026.05.24 10:30 KST',
        title: 'July 2026 fuel surcharge outlook: further cuts possible as MOPS falls, FX remains key',
        aiBrief: 'July 2026 surcharges should be read as a market-based outlook, not a confirmed filing. MOPS at 410.02 cents/gal supports further cuts, while USD/KRW and Hormuz risk can limit the size.',
        summary: 'July 2026 fuel surcharges are not officially confirmed yet. Further cuts are possible, but the size may be limited.\n\nJuly outlook\n- Cut driver: MOPS 511.21 -> 410.02 cents/gal\n- Limiting factor: USD/KRW around the 1,500 KRW zone\n- Risk factor: Hormuz uncertainty not fully resolved\n- Consumer guide: short-haul depends more on fare itself, while long-haul should check surcharge and FX together\n\nConclusion: July has room for further cuts, but final amounts must be checked through official airline notices in June.',
        impact: 'Representative card for July 2026 fuel surcharge outlook and forecast search intent.',
        sourceName: 'Market indicator synthesis (2026.05.24 10:30 KST)',
        tags: ['July 2026 fuel surcharge outlook', 'fuel surcharge forecast', 'international surcharge cut', 'MOPS drop'],
        faq: [
          { q: 'Can July 2026 fuel surcharges fall further?', a: 'Yes, there is room for further cuts because MOPS fell, but FX and geopolitics may limit the size.' },
          { q: 'Are July surcharges confirmed?', a: 'No. Final July amounts should be checked through each airline’s official channel in June.' },
          { q: 'Do short-haul and long-haul routes react differently?', a: 'Short-haul routes may be affected more by fare itself, while long-haul routes should check both surcharge and FX.' }
        ],
        links: [
          { href: 'forecast.html', label: 'Detailed July 2026 outlook' },
          { href: 'fuel-surcharge-calculator.html', label: 'Calculate May vs June savings' },
          { href: 'airlines.html', label: 'Check official airline notices' }
        ]
      }
    },
    zh: {
      'news-20260524-june-surcharge-cut': {
        updatedAt: '2026.05.24 10:30 KST 更新',
        title: '2026年6月国际线燃油附加费下调确认：大韩航空最高下调112,500韩元',
        aiBrief: '受航空燃油价格下降影响，2026年6月出票的国际线燃油附加费已确认下调。以大韩航空为例，最长距离区间从564,000韩元降至451,500韩元，下降112,500韩元。',
        summary: '6月国际线燃油附加费反映了较5月更低的航空燃油基准价格，主要区间出现下调。\n\n核心变化\n- 大韩航空最长距离区间：564,000韩元 -> 451,500韩元\n- 下调金额：112,500韩元\n- 对消费者的意义：6月出票比5月出票的燃油附加费负担更低。\n\n燃油附加费按出票日适用，付款前请在航空公司预订页面确认最终总额。',
        impact: '面向“国际线燃油附加费下调”搜索意图的确认数据卡片。',
        sourceName: '大韩航空6月公告及航空业报道',
        tags: ['国际线燃油附加费下调', '大韩航空燃油附加费', '2026年6月燃油附加费', '出票日标准'],
        faq: [
          { q: '2026年6月国际线燃油附加费下调了吗？', a: '是的。包括大韩航空在内的主要韩国出发国际线6月公告显示较5月下调。' },
          { q: '大韩航空燃油附加费下调多少？', a: '最长距离区间从564,000韩元降至451,500韩元，下降112,500韩元。' },
          { q: '燃油附加费按乘机日计算吗？', a: '不是。一般按出票日而不是乘机日适用。' }
        ],
        links: [
          { href: 'airlines.html', label: '查看各航空公司公告' },
          { href: 'index.html', label: '按航线查询' },
          { href: 'fuel-surcharge-graph.html', label: '查看月度图表' }
        ]
      },
      'news-20260524-mops-drop': {
        updatedAt: '2026.05.24 10:30 KST 更新',
        title: 'MOPS大幅下跌，国际线燃油附加费延续下降趋势：511.21 -> 410.02 cents/gal',
        aiBrief: '新加坡航空燃油指标MOPS从511.21 cents/gal降至410.02 cents/gal。这是6月燃油附加费下调的核心原因，也是判断7月是否继续下调的重要变量。',
        summary: 'MOPS是直接影响国际线燃油附加费计算的航空燃油价格指标。\n\n数值变化\n- 前期高位参考：511.21 cents/gal\n- 6月计算基准报道：410.02 cents/gal\n- 变化：约下降101.19 cents/gal\n\nMOPS下跌会形成燃油附加费下调压力。但7月仍需结合6月平均航空燃油价格、汇率和航空公司公告规则判断。',
        impact: '对应MOPS下跌、航空燃油价格、燃油附加费预测等搜索意图。',
        sourceName: '航空燃油MOPS基准价格报道',
        tags: ['MOPS下跌', '航空燃油价格', '新加坡航空燃油', '燃油附加费预测'],
        faq: [
          { q: 'MOPS下跌为什么重要？', a: 'MOPS是航空燃油价格基准，航空燃油下降会增强国际线燃油附加费下调压力。' },
          { q: 'MOPS 410.02 cents/gal是什么意思？', a: '这是被报道用于6月燃油附加费计算的新加坡航空燃油现货市场指标。' },
          { q: 'MOPS下降后7月一定会下调吗？', a: '不一定。7月还会反映6月平均航空燃油价格、USD/KRW和航空公司政策。' }
        ],
        links: [
          { href: 'forecast.html', label: '查看2026年7月展望' },
          { href: 'fuel-surcharge-graph.html', label: '比较MOPS和附加费趋势' },
          { href: 'fuel-surcharge-calculator.html', label: '计算出票月份节省额' }
        ]
      },
      'news-20260524-usdkrw-stabilizes': {
        updatedAt: '2026.05.24 10:30 KST 更新',
        title: '韩元/美元汇率波动缓和，但仍限制燃油附加费进一步下调',
        aiBrief: '2026.05.24 10:30 KST为周末时点，因此需参考2026.05.22公开USD/KRW数据。汇率仍在1,500韩元附近的高位，可能部分抵消MOPS下跌效果。',
        summary: '韩元/美元汇率是航空公司公布韩元计价燃油附加费时的重要变量。\n\n确认基准\n-2026.05.22公开USD/KRW：约1,504~1,512韩元\n-2026.05.24 10:30 KST：周末时点，需确认实时汇率\n- 解读：波动性有所缓和，但汇率水平仍偏高。\n\n即使MOPS下降，如果USD/KRW维持高位，7月燃油附加费下调幅度也可能受限。',
        impact: '解释汇率与机票价格、燃油附加费下调限制因素。',
        sourceName: 'USD/KRW公开汇率历史',
        tags: ['韩元美元汇率', 'USD/KRW', '机票价格', '燃油附加费影响'],
        faq: [
          { q: '汇率会影响燃油附加费吗？', a: '会。航空燃油受美元计价影响，USD/KRW较高会削弱燃油价格下降带来的韩元计价下调效果。' },
          { q: '为什么2026.05.24 10:30 KST需要确认实时汇率？', a: '该时点为周末，不同数据源的更新和延续方式可能不同。' },
          { q: '汇率波动缓和后机票会马上变便宜吗？', a: '不会马上反映。机票总价还取决于票价、税费、燃油附加费和座位情况。' }
        ],
        links: [
          { href: 'fuel-surcharge-calculator.html', label: '计算汇率影响节省额' },
          { href: 'forecast.html', label: '查看7月展望中的汇率变量' },
          { href: 'index.html', label: '确认航线负担' }
        ]
      },
      'news-20260524-hormuz-risk': {
        updatedAt: '2026.05.24 10:30 KST 更新',
        title: '霍尔木兹海峡风险现状：美国-伊朗谈判预期存在，但尚未完全解除',
        aiBrief: '美国-伊朗谈判预期有助于降低国际油价风险溢价。但霍尔木兹海峡不确定性尚未完全消失，因此7月燃油附加费展望中同时存在下行因素和上行风险。',
        summary: '霍尔木兹海峡风险是影响国际油价和航空燃油价格的地缘政治变量。\n\n当前解读\n- 美国-伊朗谈判：可能缓和油价风险溢价\n- 霍尔木兹风险：尚未完全解除\n- 对燃油附加费影响：支持MOPS下行，但紧张再扩大时可能限制下调幅度\n\n因此7月燃油附加费存在继续下调可能，但地缘政治风险再次扩大时部分区间可能仅小幅调整。',
        impact: '分离说明霍尔木兹海峡风险和国际油价对燃油附加费的影响。',
        sourceName: 'AP美国-伊朗谈判及霍尔木兹报道',
        tags: ['霍尔木兹海峡风险', '国际油价', '美国伊朗谈判', '航空燃油价格'],
        faq: [
          { q: '霍尔木兹风险会影响燃油附加费吗？', a: '会。该风险会提高原油和航空燃油风险溢价，从而限制燃油附加费下降。' },
          { q: '美国-伊朗谈判对燃油附加费意味着什么？', a: '谈判预期可能压低油价和航空燃油价格，提高7月继续下调的可能性。' },
          { q: '霍尔木兹风险已经完全解除了吗？', a: '还没有。虽然存在谈判预期，但市场仍保留部分风险溢价。' }
        ],
        links: [
          { href: 'news.html#news-20260524-mops-drop', label: '查看MOPS下跌卡片' },
          { href: 'forecast.html', label: '查看7月展望地缘因素' },
          { href: 'fuel-surcharge-graph.html', label: '查看趋势图' }
        ]
      },
      'news-20260524-july-outlook': {
        updatedAt: '2026.05.24 10:30 KST 更新',
        title: '2026年7月燃油附加费继续下调可能性：MOPS下跌与汇率是关键',
        aiBrief: '2026年7月燃油附加费应视为市场展望，而非确认公告。MOPS降至410.02 cents/gal支持继续下调，但汇率和霍尔木兹风险可能限制幅度。',
        summary: '2026年7月燃油附加费尚未正式确认。当前存在继续下调可能，但下调幅度可能受限。\n\n7月展望\n- 下调因素：MOPS 511.21 -> 410.02 cents/gal\n- 限制因素：USD/KRW在1,500韩元附近\n- 风险因素：霍尔木兹海峡不确定性尚未完全解除\n- 消费者判断：短途更受票价本身影响，长途需同时确认燃油附加费和汇率\n\n结论：7月存在继续下调空间，但最终金额需通过6月各航空公司官方公告确认。',
        impact: '对应2026年7月燃油附加费展望和预测搜索意图的代表卡片。',
        sourceName: '市场指标综合分析 (2026.05.24 10:30 KST)',
        tags: ['2026年7月燃油附加费展望', '燃油附加费预测', '国际线燃油附加费下调', 'MOPS下跌'],
        faq: [
          { q: '2026年7月燃油附加费还会下降吗？', a: '有可能。MOPS下降是下调因素，但汇率和地缘风险可能限制幅度。' },
          { q: '7月燃油附加费已经确定了吗？', a: '尚未确定。最终金额需在6月通过各航空公司官方渠道确认。' },
          { q: '短途和长途受影响不同吗？', a: '短途可能更受票价本身影响，长途则应同时确认燃油附加费和汇率影响。' }
        ],
        links: [
          { href: 'forecast.html', label: '2026年7月展望详情' },
          { href: 'fuel-surcharge-calculator.html', label: '计算5月/6月节省额' },
          { href: 'airlines.html', label: '查看航空公司官方公告' }
        ]
      }
    }
  };
  (window.AERO_NEWS_CARDS_20260524 || []).forEach(function(card){
    if(tr[card.id]) card.i18n = tr[card.id];
  });
  var local = {
    ja: {
      'news-20260524-june-surcharge-cut': {
        updatedAt: '2026.05.24 10:30 KST 更新',
        title: '2026年6月 国際線燃油サーチャージ引き下げ確定：大韓航空は最大112,500ウォン下落',
        aiBrief: '2026年6月発券分の国際線燃油サーチャージは、航空燃油価格の下落を受けて引き下げられました。大韓航空の最長距離帯は564,000ウォンから451,500ウォンへ、112,500ウォン下がりました。',
        summary: '6月の国際線燃油サーチャージは、5月より低い航空燃油基準価格を反映して主要区間で引き下げられました。\n\n主な変化\n- 大韓航空 最長距離帯: 564,000ウォン -> 451,500ウォン\n- 引き下げ額: 112,500ウォン\n- 利用者への意味: 6月発券分は5月発券分より燃油サーチャージ負担が軽くなります。\n\n燃油サーチャージは搭乗日ではなく発券日基準で適用されるため、決済前に航空会社の予約画面で総額を確認してください。',
        impact: '国際線燃油サーチャージ引き下げに関する確定データカードです。',
        sourceName: '大韓航空6月公示および航空業界報道',
        tags: ['国際線燃油サーチャージ引き下げ', '大韓航空 燃油サーチャージ', '2026年6月 燃油サーチャージ', '発券日基準'],
        faq: [
          { q: '2026年6月の国際線燃油サーチャージは下がりましたか？', a: 'はい。大韓航空を含む主要な韓国発国際線の6月公示では、5月より低い水準が確認されています。' },
          { q: '大韓航空の燃油サーチャージはいくら下がりましたか？', a: '最長距離帯は564,000ウォンから451,500ウォンへ、112,500ウォン下がりました。' },
          { q: '燃油サーチャージは搭乗日基準ですか？', a: 'いいえ。一般的に搭乗日ではなく発券日基準で適用されます。' }
        ],
        links: [
          { href: 'airlines.html', label: '航空会社別公示を見る' },
          { href: 'index.html', label: '路線別に検索' },
          { href: 'fuel-surcharge-graph.html', label: '月別グラフを見る' }
        ]
      },
      'news-20260524-mops-drop': {
        updatedAt: '2026.05.24 10:30 KST 更新',
        title: 'MOPS急落で国際線燃油サーチャージの下落基調続く：511.21 -> 410.02 cents/gal',
        aiBrief: 'シンガポール航空燃油指標のMOPSは511.21 cents/galから410.02 cents/galへ下落しました。6月サーチャージ引き下げの主因であり、7月の追加引き下げ可能性を判断する重要指標です。',
        summary: 'MOPSは国際線燃油サーチャージ算定に直接影響する航空燃油価格指標です。\n\n数値変化\n- 以前の高値参考: 511.21 cents/gal\n- 6月算定基準として報道: 410.02 cents/gal\n- 変化: 約101.19 cents/gal下落\n\nMOPS下落は燃油サーチャージの引き下げ圧力になります。ただし7月分は6月中の平均航空燃油価格、為替、航空会社別公示基準を合わせて見る必要があります。',
        impact: 'MOPS下落、航空燃油価格、燃油サーチャージ予想に対応します。',
        sourceName: '航空燃油MOPS基準価格報道',
        tags: ['MOPS下落', '航空燃油価格', 'シンガポール航空燃油', '燃油サーチャージ予想'],
        faq: [
          { q: 'MOPS下落はなぜ重要ですか？', a: 'MOPSは航空燃油価格の基準であり、航空燃油が下がると国際線燃油サーチャージの引き下げ圧力が強まります。' },
          { q: 'MOPS 410.02 cents/galとは何ですか？', a: '6月燃油サーチャージ算定基準として報道されたシンガポール航空燃油現物市場の指標です。' },
          { q: 'MOPSが下がれば7月も必ず下がりますか？', a: '必ずではありません。7月は6月平均の航空燃油価格、USD/KRW、航空会社の方針も反映されます。' }
        ],
        links: [
          { href: 'forecast.html', label: '2026年7月見通しを見る' },
          { href: 'fuel-surcharge-graph.html', label: 'MOPSと推移を比較' },
          { href: 'fuel-surcharge-calculator.html', label: '発券月別節約額を計算' }
        ]
      },
      'news-20260524-usdkrw-stabilizes': {
        updatedAt: '2026.05.24 10:30 KST 更新',
        title: 'ウォン/ドル為替の変動性は緩和、ただし追加引き下げを制限する要因',
        aiBrief: '2026.05.24 10:30 KSTは週末のため、公開データは2026.05.22のUSD/KRWを参考にします。為替は1,500ウォン台前後と高く、MOPS下落効果を一部制限する可能性があります。',
        summary: 'ウォン/ドル為替は、航空会社がウォン建て燃油サーチャージを公示する際の重要変数です。\n\n確認基準\n-2026.05.22公開USD/KRW: 約1,504~1,512ウォン\n-2026.05.24 10:30 KST: 週末のためリアルタイム為替確認が必要\n- 解釈: 変動性はやや緩和しましたが、水準はまだ高めです。\n\nMOPSが下がっても、USD/KRWが高いままだと7月の引き下げ幅は制限される可能性があります。',
        impact: '為替と航空券価格、燃油サーチャージ引き下げ制限要因を説明します。',
        sourceName: 'USD/KRW公開為替履歴',
        tags: ['ウォン/ドル為替', 'USD/KRW', '航空券価格', '燃油サーチャージ影響'],
        faq: [
          { q: '為替は燃油サーチャージに影響しますか？', a: 'はい。航空燃油はドル建ての影響を受けるため、USD/KRWが高いとウォン建ての引き下げ幅が小さくなる可能性があります。' },
          { q: '2026.05.24 10:30 KSTの為替はなぜ確認が必要ですか？', a: '週末時点のため、データ提供元によって反映方法が異なる場合があります。' },
          { q: '為替変動性が緩和すれば航空券はすぐ安くなりますか？', a: 'すぐには反映されません。航空券総額は運賃、税金、サーチャージ、座席状況で決まります。' }
        ],
        links: [
          { href: 'fuel-surcharge-calculator.html', label: '為替反映の節約額を計算' },
          { href: 'forecast.html', label: '7月見通しの為替要因を見る' },
          { href: 'index.html', label: '路線別負担を確認' }
        ]
      },
      'news-20260524-hormuz-risk': {
        updatedAt: '2026.05.24 10:30 KST 更新',
        title: 'ホルムズ海峡リスク現況：米国・イラン協議期待でも完全解消ではない',
        aiBrief: '米国・イラン協議への期待は原油リスクプレミアムを下げる要因です。ただしホルムズ海峡の不確実性は完全には消えておらず、7月サーチャージには下落要因と上振れリスクが共存します。',
        summary: 'ホルムズ海峡リスクは国際原油と航空燃油価格に影響する地政学変数です。\n\n現在の解釈\n- 米国・イラン協議: 原油リスクプレミアム緩和要因\n- ホルムズリスク: 完全解消前\n- サーチャージ影響: MOPS下落を支える一方、緊張再拡大時は引き下げ幅を制限\n\n7月燃油サーチャージは追加引き下げの可能性がありますが、地政学リスクが再拡大すれば一部区間は限定的な調整にとどまる可能性があります。',
        impact: 'ホルムズ海峡リスクと国際油価が燃油サーチャージに与える影響を分離して説明します。',
        sourceName: 'AP 米国・イラン協議およびホルムズ報道',
        tags: ['ホルムズ海峡リスク', '国際油価', '米国 イラン協議', '航空燃油価格'],
        faq: [
          { q: 'ホルムズ海峡リスクは燃油サーチャージに影響しますか？', a: 'はい。原油と航空燃油のリスクプレミアムを高め、サーチャージ下落を制限する可能性があります。' },
          { q: '米国・イラン協議はどんな意味がありますか？', a: '協議期待は原油と航空燃油を下げる方向に作用し、7月の追加引き下げ可能性を高めます。' },
          { q: 'ホルムズリスクは完全に解消されましたか？', a: 'いいえ。協議期待はありますが、市場は一部リスクプレミアムを維持しています。' }
        ],
        links: [
          { href: 'news.html#news-20260524-mops-drop', label: 'MOPS下落カードを見る' },
          { href: 'forecast.html', label: '7月見通しの地政学要因' },
          { href: 'fuel-surcharge-graph.html', label: '推移グラフを見る' }
        ]
      },
      'news-20260524-july-outlook': {
        updatedAt: '2026.05.24 10:30 KST 更新',
        title: '2026年7月 燃油サーチャージ追加引き下げの可能性：MOPS下落と為替が核心',
        aiBrief: '2026年7月分は確定公示ではなく市場ベースの見通しです。MOPSが410.02 cents/galまで下がった点は追加引き下げ要因ですが、為替とホルムズリスクが幅を制限する可能性があります。',
        summary: '2026年7月燃油サーチャージはまだ確定公示ではありません。現時点では追加引き下げの可能性がありますが、幅は制限される可能性があります。\n\n7月見通し\n- 引き下げ要因: MOPS 511.21 -> 410.02 cents/gal\n- 制限要因: USD/KRW 1,500ウォン台前後\n- リスク要因: ホルムズ海峡不確実性が完全解消前\n- 消費者判断: 短距離は運賃自体、長距離はサーチャージと為替を一緒に確認\n\n結論: 7月は追加引き下げの余地がありますが、確定金額は6月中の航空会社公式公示を確認してください。',
        impact: '2026年7月燃油サーチャージ見通し検索に対応する代表カードです。',
        sourceName: '市場指標総合分析 (2026.05.24 10:30 KST)',
        tags: ['2026年7月 燃油サーチャージ見通し', '燃油サーチャージ予想', '国際線サーチャージ引き下げ', 'MOPS下落'],
        faq: [
          { q: '2026年7月の燃油サーチャージはさらに下がりますか？', a: '可能性はあります。MOPS下落は引き下げ要因ですが、為替と地政学リスクで幅が制限される可能性があります。' },
          { q: '7月分は確定していますか？', a: 'まだ確定公示ではありません。6月中に各航空会社の公式チャンネルで確認が必要です。' },
          { q: '短距離と長距離で影響は違いますか？', a: '短距離は運賃自体の影響が大きく、長距離はサーチャージと為替を一緒に確認するのが有利です。' }
        ],
        links: [
          { href: 'forecast.html', label: '2026年7月見通し詳細' },
          { href: 'fuel-surcharge-calculator.html', label: '5月・6月節約額計算' },
          { href: 'airlines.html', label: '航空会社公式公示確認' }
        ]
      }
    }
  };
  Object.keys(local).forEach(function(lang){
    (window.AERO_NEWS_CARDS_20260524 || []).forEach(function(card){
      if(local[lang][card.id]){
        if(!card.i18n) card.i18n = {};
        card.i18n[lang] = local[lang][card.id];
      }
    });
  });
  var zhCards = {
    'news-20260524-june-surcharge-cut': {
      updatedAt: '2026.05.24 10:30 KST 更新',
      title: '2026年6月国际线燃油附加费下调确认：大韩航空最高下调112,500韩元',
      aiBrief: '受航空燃油价格下降影响，2026年6月出票的国际线燃油附加费已确认下调。以大韩航空为例，最长距离区间从564,000韩元降至451,500韩元。',
      summary: '6月国际线燃油附加费反映了较5月更低的航空燃油基准价格。\n\n核心变化\n- 大韩航空最长距离区间：564,000韩元 -> 451,500韩元\n- 下调金额：112,500韩元\n- 燃油附加费按出票日适用，付款前请确认航空公司预订页面的最终总额。',
      impact: '面向国际线燃油附加费下调搜索意图的确认数据卡片。',
      sourceName: '大韩航空6月公告及航空业报道',
      tags: ['国际线燃油附加费下调', '大韩航空燃油附加费', '2026年6月燃油附加费', '出票日标准'],
      faq: [
        { q: '2026年6月国际线燃油附加费下调了吗？', a: '是的。包括大韩航空在内的主要韩国出发国际线6月公告显示较5月下调。' },
        { q: '大韩航空燃油附加费下调多少？', a: '最长距离区间从564,000韩元降至451,500韩元，下降112,500韩元。' }
      ],
      links: [{href:'airlines.html',label:'查看各航空公司公告'},{href:'index.html',label:'按航线查询'}]
    },
    'news-20260524-mops-drop': {
      updatedAt: '2026.05.24 10:30 KST 更新',
      title: 'MOPS大幅下跌，国际线燃油附加费延续下降趋势：511.21 -> 410.02 cents/gal',
      aiBrief: '新加坡航空燃油指标MOPS从511.21 cents/gal降至410.02 cents/gal。这是6月燃油附加费下调的核心原因，也是判断7月是否继续下调的重要变量。',
      summary: 'MOPS是直接影响国际线燃油附加费计算的航空燃油价格指标。\n\n数值变化\n- 前期高位参考：511.21 cents/gal\n- 6月计算基准报道：410.02 cents/gal\n- 变化：约下降101.19 cents/gal\n\nMOPS下跌会形成燃油附加费下调压力，但7月仍需结合汇率和航空公司公告判断。',
      impact: '对应MOPS下跌、航空燃油价格、燃油附加费预测等搜索意图。',
      sourceName: '航空燃油MOPS基准价格报道',
      tags: ['MOPS下跌', '航空燃油价格', '新加坡航空燃油', '燃油附加费预测'],
      faq: [
        { q: 'MOPS下跌为什么重要？', a: 'MOPS是航空燃油价格基准，航空燃油下降会增强国际线燃油附加费下调压力。' },
        { q: 'MOPS下降后7月一定会下调吗？', a: '不一定。7月还会反映6月平均航空燃油价格、USD/KRW和航空公司政策。' }
      ],
      links: [{href:'forecast.html',label:'查看2026年7月展望'},{href:'fuel-surcharge-graph.html',label:'比较MOPS和附加费趋势'}]
    },
    'news-20260524-usdkrw-stabilizes': {
      updatedAt: '2026.05.24 10:30 KST 更新',
      title: '韩元/美元汇率波动缓和，但仍限制燃油附加费进一步下调',
      aiBrief: '2026.05.24 10:30 KST为周末时点，因此需参考2026.05.22公开USD/KRW数据。汇率仍在1,500韩元附近，可能部分抵消MOPS下跌效果。',
      summary: '韩元/美元汇率是航空公司公布韩元计价燃油附加费时的重要变量。\n\n确认基准\n-2026.05.22公开USD/KRW：约1,504~1,512韩元\n-2026.05.24 10:30 KST：周末时点，需确认实时汇率\n\n即使MOPS下降，如果USD/KRW维持高位，7月燃油附加费下调幅度也可能受限。',
      impact: '解释汇率与机票价格、燃油附加费下调限制因素。',
      sourceName: 'USD/KRW公开汇率历史',
      tags: ['韩元美元汇率', 'USD/KRW', '机票价格', '燃油附加费影响'],
      faq: [
        { q: '汇率会影响燃油附加费吗？', a: '会。航空燃油受美元计价影响，USD/KRW较高会削弱燃油价格下降带来的韩元计价下调效果。' }
      ],
      links: [{href:'fuel-surcharge-calculator.html',label:'计算汇率影响节省额'},{href:'forecast.html',label:'查看7月展望中的汇率变量'}]
    },
    'news-20260524-hormuz-risk': {
      updatedAt: '2026.05.24 10:30 KST 更新',
      title: '霍尔木兹海峡风险现状：美国-伊朗谈判预期存在，但尚未完全解除',
      aiBrief: '美国-伊朗谈判预期有助于降低国际油价风险溢价。但霍尔木兹海峡不确定性尚未完全消失，因此7月燃油附加费展望中同时存在下行因素和上行风险。',
      summary: '霍尔木兹海峡风险是影响国际油价和航空燃油价格的地缘政治变量。\n\n当前解读\n- 美国-伊朗谈判：可能缓和油价风险溢价\n- 霍尔木兹风险：尚未完全解除\n- 对燃油附加费影响：支持MOPS下行，但紧张再扩大时可能限制下调幅度。',
      impact: '分离说明霍尔木兹海峡风险和国际油价对燃油附加费的影响。',
      sourceName: 'AP美国-伊朗谈判及霍尔木兹报道',
      tags: ['霍尔木兹海峡风险', '国际油价', '美国伊朗谈判', '航空燃油价格'],
      faq: [
        { q: '霍尔木兹风险会影响燃油附加费吗？', a: '会。该风险会提高原油和航空燃油风险溢价，从而限制燃油附加费下降。' }
      ],
      links: [{href:'news.html#news-20260524-mops-drop',label:'查看MOPS下跌卡片'},{href:'forecast.html',label:'查看7月展望地缘因素'}]
    },
    'news-20260524-july-outlook': {
      updatedAt: '2026.05.24 10:30 KST 更新',
      title: '2026年7月燃油附加费继续下调可能性：MOPS下跌与汇率是关键',
      aiBrief: '2026年7月燃油附加费应视为市场展望，而非确认公告。MOPS降至410.02 cents/gal支持继续下调，但汇率和霍尔木兹风险可能限制幅度。',
      summary: '2026年7月燃油附加费尚未正式确认。当前存在继续下调可能，但下调幅度可能受限。\n\n7月展望\n- 下调因素：MOPS 511.21 -> 410.02 cents/gal\n- 限制因素：USD/KRW在1,500韩元附近\n- 风险因素：霍尔木兹海峡不确定性尚未完全解除\n\n最终金额需通过6月各航空公司官方公告确认。',
      impact: '对应2026年7月燃油附加费展望和预测搜索意图的代表卡片。',
      sourceName: '市场指标综合分析 (2026.05.24 10:30 KST)',
      tags: ['2026年7月燃油附加费展望', '燃油附加费预测', '国际线燃油附加费下调', 'MOPS下跌'],
      faq: [
        { q: '2026年7月燃油附加费还会下降吗？', a: '有可能。MOPS下降是下调因素，但汇率和地缘风险可能限制幅度。' },
        { q: '7月燃油附加费已经确定了吗？', a: '尚未确定。最终金额需在6月通过各航空公司官方渠道确认。' }
      ],
      links: [{href:'forecast.html',label:'2026年7月展望详情'},{href:'airlines.html',label:'查看航空公司官方公告'}]
    }
  };
  (window.AERO_NEWS_CARDS_20260524 || []).forEach(function(card){
    if(zhCards[card.id]){
      if(!card.i18n) card.i18n = {};
      card.i18n.zh = zhCards[card.id];
    }
  });
  var newsFrDe = {
    fr: {
      'news-20260524-june-surcharge-cut': {
        updatedAt:'Mise à jour2026.05.24 10:30 KST',
        title:'Juin2026 : baisse confirmée des surtaxes carburant internationales, Korean Air -112 500 KRW au maximum',
        aiBrief:'Les surtaxes carburant internationales de juin2026 reculent avec la baisse du prix du carburant aérien. Chez Korean Air, la zone long-courrier la plus élevée passe de 564 000 KRW à 451 500 KRW.',
        summary:'Les montants de juin sont plus bas que ceux de mai sur les principales zones.\n\nPoints clés\n- Korean Air long-courrier maximum : 564 000 KRW -> 451 500 KRW\n- Baisse : 112 500 KRW\n- Le montant dépend de la date de billetterie ; vérifiez le total final avant paiement.',
        impact:'Carte de données confirmées pour la recherche sur la baisse des surtaxes internationales.',
        sourceName:'Annonces de juin Korean Air et presse aérienne',
        tags:['baisse surtaxe carburant internationale','Korean Air surtaxe carburant','juin2026','date de billetterie']
      },
      'news-20260524-mops-drop': {
        updatedAt:'Mise à jour2026.05.24 10:30 KST',
        title:'La baisse du MOPS soutient la tendance baissière des surtaxes : 511.21 -> 410.02 cents/gal',
        aiBrief:'Le MOPS, indicateur du carburant aérien à Singapour, est passé de 511.21 à 410.02 cents/gal. C’est un facteur clé pour la baisse de juin et la possibilité d’une nouvelle baisse en juillet.',
        summary:'Le MOPS influence directement les surtaxes carburant internationales.\n\n- Ancien niveau de référence : 511.21 cents/gal\n- Niveau rapporté pour le calcul de juin : 410.02 cents/gal\n- Baisse : environ 101.19 cents/gal\n\nPour juillet, il faut aussi suivre l’USD/KRW et les annonces officielles.',
        impact:'Répond aux recherches MOPS, prix du carburant aérien et prévision de surtaxe.',
        sourceName:'Données et articles sur le MOPS',
        tags:['MOPS en baisse','prix du carburant aérien','prévision surtaxe']
      },
      'news-20260524-usdkrw-stabilizes': {
        updatedAt:'Mise à jour2026.05.24 10:30 KST',
        title:'USD/KRW : volatilité plus modérée, mais le change limite encore les baisses de surtaxe',
        aiBrief:'Au2026.05.24 10:30 KST, le week-end impose de se référer aux données publiques du2026.05.22. L’USD/KRW reste autour de 1 500 KRW et peut limiter l’effet de la baisse du MOPS.',
        summary:'Le change USD/KRW reste une variable importante pour les surtaxes publiées en KRW.\n\n- Données publiques du2026.05.22 : environ 1 504~1 512 KRW\n- Le niveau reste élevé malgré une volatilité plus modérée\n- Une devise forte peut limiter la baisse de juillet.',
        impact:'Explique le lien entre change, prix du billet et surtaxe.',
        sourceName:'Historique public USD/KRW',
        tags:['USD/KRW','change','prix des billets','surtaxe carburant']
      },
      'news-20260524-hormuz-risk': {
        updatedAt:'Mise à jour2026.05.24 10:30 KST',
        title:'Risque du détroit d’Hormuz : les discussions USA-Iran aident, mais le risque n’est pas résolu',
        aiBrief:'Les attentes de négociation USA-Iran peuvent réduire la prime de risque du pétrole, mais l’incertitude autour d’Hormuz n’a pas disparu.',
        summary:'Le risque Hormuz reste une variable géopolitique pour le pétrole et le carburant aérien.\n\n- Discussions USA-Iran : facteur de détente\n- Risque Hormuz : pas entièrement résolu\n- Impact : la baisse du MOPS aide, mais une reprise des tensions pourrait limiter la baisse.',
        impact:'Sépare l’effet géopolitique de l’effet prix du carburant.',
        sourceName:'AP et données de marché',
        tags:['détroit d’Hormuz','pétrole','USA Iran','carburant aérien']
      },
      'news-20260524-july-outlook': {
        updatedAt:'Mise à jour2026.05.24 10:30 KST',
        title:'Prévision juillet2026 : nouvelle baisse possible des surtaxes, MOPS et change restent clés',
        aiBrief:'Juillet2026 n’est pas encore officiellement publié. La baisse du MOPS soutient une nouvelle baisse possible, mais l’USD/KRW et Hormuz peuvent limiter l’ampleur.',
        summary:'La surtaxe carburant de juillet reste une prévision de marché.\n\n- Facteur de baisse : MOPS 511.21 -> 410.02 cents/gal\n- Facteur limitant : USD/KRW autour de 1 500 KRW\n- Risque : Hormuz non entièrement résolu\n\nConclusion : une baisse supplémentaire est possible, mais les montants finaux doivent être vérifiés en juin.',
        impact:'Carte principale pour la recherche prévision surtaxe carburant juillet2026.',
        sourceName:'Analyse des indicateurs de marché',
        tags:['prévision juillet2026','surtaxe carburant','MOPS','baisse possible']
      }
    },
    de: {
      'news-20260524-june-surcharge-cut': {
        updatedAt:'Aktualisiert2026.05.24 10:30 KST',
        title:'Juni2026: internationale Treibstoffzuschläge sinken, Korean Air bis zu 112.500 KRW niedriger',
        aiBrief:'Die internationalen Treibstoffzuschläge für Juni2026 sinken mit dem Rückgang der Flugtreibstoffpreise. Bei Korean Air fällt die höchste Langstreckenzone von 564.000 KRW auf 451.500 KRW.',
        summary:'Die Juni-Beträge liegen in wichtigen Zonen unter Mai.\n\nKernpunkte\n- Korean Air höchste Langstrecke: 564.000 KRW -> 451.500 KRW\n- Rückgang: 112.500 KRW\n- Der Zuschlag gilt nach Ticketausstellungsdatum; prüfen Sie vor Zahlung den Endbetrag.',
        impact:'Bestätigte Datenkarte zur Suche nach sinkenden internationalen Treibstoffzuschlägen.',
        sourceName:'Korean-Air-Juni-Mitteilungen und Branchenberichte',
        tags:['internationaler Treibstoffzuschlag sinkt','Korean Air Zuschlag','Juni2026','Ticketausstellung']
      },
      'news-20260524-mops-drop': {
        updatedAt:'Aktualisiert2026.05.24 10:30 KST',
        title:'MOPS-Rückgang hält Treibstoffzuschläge unter Druck: 511.21 -> 410.02 cents/gal',
        aiBrief:'Der Singapur-Flugtreibstoffindikator MOPS fiel von 511.21 auf 410.02 cents/gal. Das ist ein Kernfaktor für die Juni-Senkung und mögliche Juli-Senkungen.',
        summary:'MOPS beeinflusst internationale Treibstoffzuschläge direkt.\n\n- Früherer Referenzwert: 511.21 cents/gal\n- Für Juni gemeldeter Wert: 410.02 cents/gal\n- Rückgang: rund 101.19 cents/gal\n\nFür Juli zählen zusätzlich USD/KRW und offizielle Mitteilungen.',
        impact:'Deckt Suchintentionen zu MOPS, Flugtreibstoffpreis und Zuschlagsprognose ab.',
        sourceName:'MOPS-Daten und Berichte',
        tags:['MOPS Rückgang','Flugtreibstoffpreis','Zuschlagsprognose']
      },
      'news-20260524-usdkrw-stabilizes': {
        updatedAt:'Aktualisiert2026.05.24 10:30 KST',
        title:'USD/KRW: geringere Volatilität, aber Wechselkurs begrenzt weitere Zuschlagssenkungen',
        aiBrief:'Stand2026.05.24 10:30 KST ist wegen Wochenende auf öffentliche Daten vom2026.05.22 zu achten. USD/KRW bleibt nahe 1.500 KRW und kann den MOPS-Effekt begrenzen.',
        summary:'USD/KRW bleibt wichtig für in KRW veröffentlichte Zuschläge.\n\n- Öffentliche Daten vom2026.05.22: etwa 1.504~1.512 KRW\n- Das Niveau bleibt trotz geringerer Volatilität hoch\n- Ein starker Dollar kann Juli-Senkungen begrenzen.',
        impact:'Erklärt den Zusammenhang zwischen Wechselkurs, Flugpreis und Zuschlag.',
        sourceName:'Öffentliche USD/KRW-Historie',
        tags:['USD/KRW','Wechselkurs','Flugpreise','Treibstoffzuschlag']
      },
      'news-20260524-hormuz-risk': {
        updatedAt:'Aktualisiert2026.05.24 10:30 KST',
        title:'Hormuz-Risiko: USA-Iran-Gespräche helfen, aber das Risiko ist nicht gelöst',
        aiBrief:'Erwartungen an USA-Iran-Gespräche können die Öl-Risikoprämie senken, doch die Unsicherheit um Hormuz ist nicht verschwunden.',
        summary:'Das Hormuz-Risiko bleibt eine geopolitische Variable für Öl und Flugtreibstoff.\n\n- USA-Iran-Gespräche: Entlastungsfaktor\n- Hormuz-Risiko: nicht vollständig gelöst\n- Wirkung: MOPS-Rückgang hilft, neue Spannungen könnten Senkungen begrenzen.',
        impact:'Trennt geopolitische Effekte von Treibstoffpreiseffekten.',
        sourceName:'AP und Marktdaten',
        tags:['Straße von Hormuz','Ölpreis','USA Iran','Flugtreibstoff']
      },
      'news-20260524-july-outlook': {
        updatedAt:'Aktualisiert2026.05.24 10:30 KST',
        title:'Prognose Juli2026: weitere Senkung möglich, MOPS und Wechselkurs bleiben entscheidend',
        aiBrief:'Juli2026 ist noch nicht offiziell veröffentlicht. Der MOPS-Rückgang spricht für weitere Senkungen, aber USD/KRW und Hormuz können den Umfang begrenzen.',
        summary:'Der Juli-Zuschlag bleibt eine Marktprognose.\n\n- Senkungsfaktor: MOPS 511.21 -> 410.02 cents/gal\n- Begrenzender Faktor: USD/KRW um 1.500 KRW\n- Risiko: Hormuz nicht vollständig gelöst\n\nFazit: Weitere Senkungen sind möglich, endgültige Beträge müssen im Juni geprüft werden.',
        impact:'Hauptkarte für Suchanfragen zur Treibstoffzuschlag-Prognose Juli2026.',
        sourceName:'Analyse der Marktindikatoren',
        tags:['Prognose Juli2026','Treibstoffzuschlag','MOPS','mögliche Senkung']
      }
    }
  };
  Object.keys(newsFrDe).forEach(function(lang){
    (window.AERO_NEWS_CARDS_20260524 || []).forEach(function(card){
      if(newsFrDe[lang][card.id]){
        if(!card.i18n) card.i18n = {};
        card.i18n[lang] = newsFrDe[lang][card.id];
      }
    });
  });
})();

/* ─── 언어 관리 ─── */
window.getCurrentLang = function(){
  return localStorage.getItem('aero_lang') || 'ko';
};
window.setCurrentLang = function(lang){
  localStorage.setItem('aero_lang', lang);
  window.SHARED_STATE.lang = lang;
  document.documentElement.lang = lang;
};
window.getCurrentCurr = function(){
  return localStorage.getItem('aero_curr') || 'KRW';
};
window.setCurrentCurr = function(curr){
  localStorage.setItem('aero_curr', curr);
  window.SHARED_STATE.curr = curr;
};

/* fr/de page fallback for pages that still have only ko/en/ja/zh local dictionaries. */
window.pageAutoTranslate = function(lang, key){
  if(lang !== 'fr' && lang !== 'de') return undefined;
  var isFr = lang === 'fr';
  var common = isFr ? {
    official:'Avis officiel ↗', officialTitle:'Liens officiels des compagnies', related:'Pages liées',
    main:'Recherche principale', airlines:'Par compagnie', news:'Actualités', graph:'Graphique',
    calc:'Calculateur', may:'Mai2026', june:'Prévision juillet2026', korea:'Départ de Corée',
    airline:'Compagnie', currency:'Devise', source:'Source officielle', range:'Zone',
    route:'Itinéraire', diff:'Variation', noService:'Non desservi',
    foot:'Informations indicatives basées sur les annonces officielles. Vérifiez toujours le montant final avant achat.'
  } : {
    official:'Offizielle Mitteilung ↗', officialTitle:'Offizielle Airline-Links', related:'Verwandte Seiten',
    main:'Hauptsuche', airlines:'Nach Airline', news:'Nachrichten', graph:'Diagramm',
    calc:'Rechner', may:'Mai2026', june:'Prognose Juli2026', korea:'Ab Korea',
    airline:'Airline', currency:'Währung', source:'Offizielle Quelle', range:'Zone',
    route:'Route', diff:'Änderung', noService:'Nicht bedient',
    foot:'Angaben dienen nur als Referenz und basieren auf offiziellen Mitteilungen. Prüfen Sie immer den endgültigen Betrag vor dem Kauf.'
  };
  var names = {KE:'Korean Air (KE)', OZ:'Asiana Airlines (OZ)', '7C':'Jeju Air (7C)', LJ:'Jin Air (LJ)', TW:"T'way Air (TW)", ZE:'Eastar Jet (ZE)', RS:'Air Seoul (RS)', YP:'Air Premia (YP)', BX:'Air Busan (BX)'};
  if(/^airline\./.test(key)) return names[key.split('.')[1]];

  var related = {
    main:common.main, airlines:common.airlines, news:common.news, graph:common.graph,
    calc:common.calc, may:common.may, june:common.june, korea:common.korea
  };
  var mRel = key.match(/^(may|graph|calc)\.related\.(main|airlines|news|graph|calc|may|june|korea)$/);
  if(mRel) return related[mRel[2]];

  var basic = {};
  basic.fr = {
    'may.pageTitle':'Comparaison des surtaxes carburant mai vs juin2026', 'may.metaDesc':'Comparez les surtaxes carburant mai et juin2026 par compagnie au départ de Corée.',
    'may.h1':'📊 Comparaison des surtaxes carburant mai vs juin2026', 'may.pageSub':'Annonces officielles de juin reflétées · baisse par rapport à mai',
    'may.notice':'<strong>Note :</strong> Les montants sont basés sur les annonces officielles des compagnies.', 'may.intro':'Cette page compare les surtaxes carburant internationales au départ de Corée entre mai et juin2026.',
    'may.card1.title':'Caractéristiques de juin', 'may.card1.body':'Les surtaxes de juin reflètent la baisse du prix de référence du carburant aérien.', 'may.card2.title':'Différences entre compagnies',
    'may.card2.body':'Les compagnies peuvent utiliser des zones, devises et méthodes différentes.', 'may.card3.title':'Recherche par itinéraire', 'may.card3.body':'Utilisez la recherche principale pour vérifier le montant exact par route.',
    'may.sectionTitle':'📊 Tableau comparatif des surtaxes carburant', 'may.th.airline':common.airline, 'may.th.currency':common.currency, 'may.th.apr':'Mai2026', 'may.th.may':'Juin2026',
    'may.th.change':'vs mai', 'may.th.source':common.source, 'may.change.major':'Baisse importante ▼', 'may.change.minor':'Baisse légère ▼', 'may.source.label':'Avis officiel',
    'may.officialLinkTitle':common.officialTitle, 'may.officialLinkSuffix':common.official, 'may.tableNote':'※ Données basées sur les annonces officielles.', 'may.relatedTitle':common.related,
    'may.usdBadge':'Publication USD', 'may.footnote':common.foot,
    'graph.pageTitle':'📈 Graphique des surtaxes carburant', 'graph.metaTitle':'Graphique des surtaxes carburant — avril, mai et juin2026', 'graph.metaDesc':'Graphique interactif comparant les surtaxes carburant par compagnie.',
    'graph.pageSub':'Comparaison avril · mai · juin2026', 'graph.h1':'Graphique des surtaxes carburant avril, mai et juin2026', 'graph.notice':'<strong>Note :</strong> Les montants sont basés sur la devise officielle publiée.',
    'graph.intro':'Comparez les surtaxes carburant par compagnie avec un graphique et un tableau.', 'graph.answer.title':'Comment les surtaxes ont-elles évolué ?', 'graph.answer.body':'Le graphique en barres permet de comparer avril, mai et juin par compagnie et par zone.',
    'graph.card1.title':'Tendance mensuelle', 'graph.card1.body':'Les surtaxes suivent généralement les prix du pétrole et du carburant aérien.', 'graph.card2.title':'Lien avec le pétrole', 'graph.card2.body':'Les montants reflètent les prix moyens du mois précédent.',
    'graph.card3.title':'Effet du change', 'graph.card3.body':'Un USD/KRW élevé peut augmenter le montant équivalent en KRW.', 'graph.filter.airline':common.airline, 'graph.filter.month':'Mois', 'graph.filter.view':'Vue',
    'graph.filter.currHint':'Devise : réglée dans la barre supérieure', 'graph.filter.all':'Toutes', 'graph.filter.apr':'Avril2026', 'graph.filter.may':'Mai2026', 'graph.filter.june':'Juin2026',
    'graph.filter.amount':'Montant', 'graph.filter.change':'Variation (%)', 'graph.chartNote':'※ Le graphique affiche les montants moyens ou par zone selon la sélection.', 'graph.tableTitle':'📋 Données détaillées par compagnie',
    'graph.tableNote':'※ Données issues des annonces officielles.', 'graph.faq.title':'FAQ du graphique', 'graph.faq.q1':'Quelles données sont comparées ?', 'graph.faq.a1':'Avril, mai et juin2026 par compagnie.',
    'graph.faq.q2':'Pourquoi un graphique en barres ?', 'graph.faq.a2':'Les surtaxes sont des montants mensuels publiés.', 'graph.th.airline':common.airline, 'graph.th.currency':common.currency,
    'graph.th.band':common.range, 'graph.th.apr':'Avril', 'graph.th.may':'Mai', 'graph.th.june':'Juin', 'graph.th.change':'vs mai', 'graph.official.title':common.officialTitle,
    'graph.official.suffix':common.official, 'graph.relatedTitle':common.related, 'graph.usdBadge':'Publication USD', 'graph.noData':'—', 'graph.footnote':common.foot,
    'calc.pageTitle':'🧮 Calculateur de surtaxe carburant', 'calc.metaTitle':'Calculateur de surtaxe carburant', 'calc.metaDesc':'Comparez les surtaxes carburant mai et juin par route et compagnie.',
    'calc.pageSub':'Comparez mai et juin par itinéraire et compagnie', 'calc.h1':'Calculateur de surtaxe carburant', 'calc.notice':'<strong>Note :</strong> Sélectionnez un départ et une destination.',
    'calc.alert':'La surtaxe s’applique généralement selon la date de billetterie.', 'calc.intro':'Ce calculateur compare les surtaxes par mois, route et compagnie.', 'calc.answer.title':'Quand émettre le billet ?',
    'calc.answer.body':'Le calculateur indique quelle compagnie est moins chère et l’économie estimée.', 'calc.section.airline':'🔍 Critères par compagnie', 'calc.th.airline':common.airline,
    'calc.th.method':'Méthode', 'calc.th.channel':'Canal officiel', 'calc.th.note':'Note', 'calc.official.suffix':'Site officiel ↗', 'calc.official.title':common.officialTitle,
    'calc.related.title':common.related, 'calc.footnote':common.foot
  };
  basic.de = {
    'may.pageTitle':'Vergleich Treibstoffzuschläge Mai vs. Juni2026', 'may.metaDesc':'Vergleichen Sie Treibstoffzuschläge Mai und Juni2026 nach Airline ab Korea.',
    'may.h1':'📊 Vergleich Treibstoffzuschläge Mai vs. Juni2026', 'may.pageSub':'Offizielle Juni-Mitteilungen berücksichtigt · Rückgang gegenüber Mai',
    'may.notice':'<strong>Hinweis:</strong> Die Beträge basieren auf offiziellen Airline-Mitteilungen.', 'may.intro':'Diese Seite vergleicht internationale Treibstoffzuschläge ab Korea für Mai und Juni2026.',
    'may.card1.title':'Merkmale im Juni', 'may.card1.body':'Die Juni-Zuschläge spiegeln niedrigere Referenzpreise für Flugtreibstoff wider.', 'may.card2.title':'Unterschiede nach Airline',
    'may.card2.body':'Airlines können unterschiedliche Zonen, Währungen und Methoden verwenden.', 'may.card3.title':'Routensuche', 'may.card3.body':'Nutzen Sie die Hauptsuche für genaue Beträge je Route.',
    'may.sectionTitle':'📊 Vergleichstabelle Treibstoffzuschläge', 'may.th.airline':common.airline, 'may.th.currency':common.currency, 'may.th.apr':'Mai2026', 'may.th.may':'Juni2026',
    'may.th.change':'ggü. Mai', 'may.th.source':common.source, 'may.change.major':'Deutlicher Rückgang ▼', 'may.change.minor':'Leichter Rückgang ▼', 'may.source.label':'Offizielle Mitteilung',
    'may.officialLinkTitle':common.officialTitle, 'may.officialLinkSuffix':common.official, 'may.tableNote':'※ Daten basieren auf offiziellen Mitteilungen.', 'may.relatedTitle':common.related,
    'may.usdBadge':'USD-Mitteilung', 'may.footnote':common.foot,
    'graph.pageTitle':'📈 Trenddiagramm Treibstoffzuschlag', 'graph.metaTitle':'Trenddiagramm Treibstoffzuschlag — April, Mai und Juni2026', 'graph.metaDesc':'Interaktives Diagramm zum Vergleich der Treibstoffzuschläge nach Airline.',
    'graph.pageSub':'Vergleich April · Mai · Juni2026', 'graph.h1':'Trenddiagramm der Treibstoffzuschläge April, Mai und Juni2026', 'graph.notice':'<strong>Hinweis:</strong> Die Beträge basieren auf der offiziell veröffentlichten Währung.',
    'graph.intro':'Vergleichen Sie Treibstoffzuschläge nach Airline mit Diagramm und Tabelle.', 'graph.answer.title':'Wie haben sich Zuschläge verändert?', 'graph.answer.body':'Das Balkendiagramm vergleicht April, Mai und Juni nach Airline und Zone.',
    'graph.card1.title':'Monatlicher Trend', 'graph.card1.body':'Zuschläge folgen meist Öl- und Flugtreibstoffpreisen.', 'graph.card2.title':'Bezug zum Ölpreis', 'graph.card2.body':'Beträge spiegeln Durchschnittspreise des Vormonats wider.',
    'graph.card3.title':'Wechselkurseffekt', 'graph.card3.body':'Ein hoher USD/KRW kann KRW-Beträge erhöhen.', 'graph.filter.airline':common.airline, 'graph.filter.month':'Monat', 'graph.filter.view':'Ansicht',
    'graph.filter.currHint':'Währung: oben einstellen', 'graph.filter.all':'Alle', 'graph.filter.apr':'April2026', 'graph.filter.may':'Mai2026', 'graph.filter.june':'Juni2026',
    'graph.filter.amount':'Betrag', 'graph.filter.change':'Änderung (%)', 'graph.chartNote':'※ Das Diagramm zeigt je nach Auswahl Durchschnitts- oder Zonenwerte.', 'graph.tableTitle':'📋 Detaildaten nach Airline',
    'graph.tableNote':'※ Daten stammen aus offiziellen Mitteilungen.', 'graph.faq.title':'Diagramm-FAQ', 'graph.faq.q1':'Welche Daten werden verglichen?', 'graph.faq.a1':'April, Mai und Juni2026 nach Airline.',
    'graph.faq.q2':'Warum ein Balkendiagramm?', 'graph.faq.a2':'Zuschläge sind monatlich veröffentlichte Beträge.', 'graph.th.airline':common.airline, 'graph.th.currency':common.currency,
    'graph.th.band':common.range, 'graph.th.apr':'April', 'graph.th.may':'Mai', 'graph.th.june':'Juni', 'graph.th.change':'ggü. Mai', 'graph.official.title':common.officialTitle,
    'graph.official.suffix':common.official, 'graph.relatedTitle':common.related, 'graph.usdBadge':'USD-Mitteilung', 'graph.noData':'—', 'graph.footnote':common.foot,
    'calc.pageTitle':'🧮 Treibstoffzuschlag-Rechner', 'calc.metaTitle':'Treibstoffzuschlag-Rechner', 'calc.metaDesc':'Vergleichen Sie Treibstoffzuschläge Mai und Juni nach Route und Airline.',
    'calc.pageSub':'Vergleich Mai und Juni nach Route und Airline', 'calc.h1':'Treibstoffzuschlag-Rechner', 'calc.notice':'<strong>Hinweis:</strong> Wählen Sie Abflug und Ziel.',
    'calc.alert':'Der Zuschlag gilt meist nach Ticketausstellungsdatum.', 'calc.intro':'Dieser Rechner vergleicht Zuschläge nach Monat, Route und Airline.', 'calc.answer.title':'Wann ist die Ausstellung günstiger?',
    'calc.answer.body':'Der Rechner zeigt die günstigere Airline und die geschätzte Ersparnis.', 'calc.section.airline':'🔍 Kriterien nach Airline', 'calc.th.airline':common.airline,
    'calc.th.method':'Methode', 'calc.th.channel':'Offizieller Kanal', 'calc.th.note':'Hinweis', 'calc.official.suffix':'Offizielle Seite ↗', 'calc.official.title':common.officialTitle,
    'calc.related.title':common.related, 'calc.footnote':common.foot
  };
  if(basic[lang][key] !== undefined) return basic[lang][key];

  var air = key.match(/^(ke|oz|jj|lj|tw)\.(.+)$/);
  if(air){
    var airline = {ke:'Korean Air', oz:'Asiana Airlines', jj:'Jeju Air', lj:'Jin Air', tw:"T'way Air"}[air[1]];
    var tail = air[2];
    var airMap = {
      metaTitle: airline + (isFr ? ' — surtaxe carburant2026' : ' — Treibstoffzuschlag2026'),
      metaDesc: isFr ? ('Surtaxe carburant ' + airline + ' au départ de Corée.') : ('Treibstoffzuschlag von ' + airline + ' ab Korea.'),
      pageTitle: '✈️ ' + airline + (isFr ? ' — surtaxe carburant' : ' — Treibstoffzuschlag'),
      pageSub: isFr ? 'Montants officiels par zone' : 'Offizielle Beträge nach Zone',
      h1: airline + (isFr ? ' — surtaxe carburant internationale' : ' — internationaler Treibstoffzuschlag'),
      notice: isFr ? '<strong>Note :</strong> Vérifiez le montant final sur l’avis officiel.' : '<strong>Hinweis:</strong> Prüfen Sie den endgültigen Betrag in der offiziellen Mitteilung.',
      intro: isFr ? ('Résumé des surtaxes carburant de ' + airline + ' par zone.') : ('Zusammenfassung der Treibstoffzuschläge von ' + airline + ' nach Zone.'),
      sectionTitle: isFr ? ('📊 Tableau des surtaxes ' + airline) : ('📊 Zuschlagstabelle ' + airline),
      officialTitle: isFr ? ('🔗 Avis officiel ' + airline) : ('🔗 Offizielle Mitteilung ' + airline),
      officialSite: isFr ? 'Site officiel ↗' : 'Offizielle Seite ↗',
      relatedTitle: common.related, footer: common.foot, noService: common.noService,
      footnote: common.foot, 'th.range':common.range, 'th.route':common.route, 'th.apr':'Avril', 'th.may':isFr?'Mai':'Mai',
      'th.may2':isFr?'Mai':'Mai', 'th.jun':isFr?'Juin':'Juni', 'th.june':isFr?'Juin':'Juni', 'th.diff':common.diff,
      'th.diffmay':common.diff, 'th.diffjun':common.diff, 'th.diff_may_june':common.diff,
      'rel.main':common.main, 'rel.airlines':common.airlines, 'rel.news':common.news, 'rel.graph':common.graph,
      'rel.calc':common.calc, 'rel.may':common.may, 'rel.jun':common.june, 'rel.korea':common.korea, 'rel.asiana':'Asiana Airlines', 'rel.other':isFr?'Autres compagnies':'Andere Airlines',
      'card1.title':isFr?'Base de calcul':'Berechnungsbasis', 'card1.body':isFr?'Les montants reflètent le carburant, le change et la méthode de la compagnie.':'Die Beträge spiegeln Treibstoff, Wechselkurs und Airline-Methode wider.',
      'card2.title':isFr?'Différences par zone':'Unterschiede nach Zone', 'card2.body':isFr?'Les montants varient selon la distance.':'Die Beträge variieren nach Entfernung.',
      'card3.title':isFr?'Vérification avant achat':'Prüfung vor dem Kauf', 'card3.body':isFr?'Confirmez le total final avant achat.':'Prüfen Sie den endgültigen Gesamtbetrag vor dem Kauf.'
    };
    if(airMap[tail] !== undefined) return airMap[tail];
  }
  if(/^fore\./.test(key)){
    var fore = isFr ? {
      'fore.metaTitle':'Prévision des surtaxes carburant juillet2026',
      'fore.metaDesc':'Prévision juillet2026 basée sur les annonces confirmées de juin, MOPS, USD/KRW, pétrole et risque Hormuz.',
      'fore.pageTitle':'🔮 Prévision des surtaxes carburant juillet2026',
      'fore.pageSub':'Données confirmées de juin séparées de la prévision de juillet',
      'fore.h1':'Prévision juillet2026 — MOPS, change et pétrole',
      'fore.notice':'<strong>Note :</strong> Juillet n’est pas encore officiellement publié. Cette page distingue les données confirmées de juin et la prévision de marché.',
      'fore.intro':'Au2026.05.24 10:30 KST, les surtaxes de juin sont en baisse, tandis que juillet reste une prévision basée sur MOPS, USD/KRW, le pétrole et le risque Hormuz.',
      'fore.section.indicators':'📊 Indicateurs clés pour juillet2026',
      'fore.indicator.footnote':'※ Juin correspond aux annonces officielles confirmées ; juillet reste une prévision de marché.',
      'fore.predict.title':'Indicateurs de marché',
      'fore.predict.subtitle':'Données de juin et prévision de juillet séparées',
      'fore.predict.footnote':'* Les montants de juillet devront être confirmés par les annonces officielles en juin.',
      'fore.summary.title':'📌 Résumé de la prévision juillet2026',
      'fore.summary.updated':'✅ Mise à jour2026.05.24 10:30 KST',
      'fore.market.title':'🌍 Briefing marché',
      'fore.market.brent':'🛢 Pétrole : les attentes de négociation réduisent la prime de risque, mais Hormuz n’est pas entièrement résolu.',
      'fore.market.fx':'💱 USD/KRW : données publiques du2026.05.22 autour de 1 504~1 512 KRW.',
      'fore.market.mops':'✈️ MOPS : baisse de 511.21 à 410.02 cents/gal.',
      'fore.market.geo':'⚠ Géopolitique : risque Hormuz encore présent.',
      'fore.market.summary':'→ Une baisse supplémentaire en juillet est possible, mais le change et la géopolitique peuvent limiter l’ampleur.',
      'fore.market.fx2':'💡 Signal clé : MOPS baisse, mais USD/KRW et Hormuz limitent la baisse.',
      'fore.verdict.title':'📌 Conclusion juillet',
      'fore.verdict.line1':'→ La baisse du MOPS ouvre une possibilité de nouvelle baisse en juillet.',
      'fore.verdict.line2':'→ Juillet n’est pas confirmé ; les avis officiels devront être vérifiés en juin.',
      'fore.verdict.short':'👉 Court-courrier : le tarif de base et les sièges peuvent compter davantage.',
      'fore.verdict.long':'👉 Long-courrier : vérifiez ensemble surtaxe et change.',
      'fore.mops.analysis.title':'📉 MOPS et prévision juillet',
      'fore.mops.analysis.body':'La baisse du MOPS soutient une possible réduction en juillet, mais USD/KRW et le risque Hormuz peuvent limiter l’ampleur.',
      'fore.booking.title':'🗓️ Guide de réservation',
      'fore.keyvars.title':'🔑 Variables clés',
      'fore.basis.title':'📅 Base de calcul de juillet',
      'fore.basis.body':'Les surtaxes de juillet seront publiées selon le prix moyen du carburant, le change et la politique de chaque compagnie.',
      'fore.aiNotice':'Contenu de référence basé sur des données publiques.',
      'fore.official.title':'🔗 Avis officiels des compagnies',
      'fore.related.title':'🔗 Pages liées',
      'fore.footnote':'Prévision indicative. Vérifiez toujours le montant final.'
    } : {
      'fore.metaTitle':'Prognose Treibstoffzuschlag Juli2026',
      'fore.metaDesc':'Juli-2026-Prognose auf Basis bestätigter Juni-Mitteilungen, MOPS, USD/KRW, Ölpreis und Hormuz-Risiko.',
      'fore.pageTitle':'🔮 Prognose Treibstoffzuschlag Juli2026',
      'fore.pageSub':'Bestätigte Juni-Daten getrennt von der Juli-Prognose',
      'fore.h1':'Prognose Juli2026 — MOPS, Wechselkurs und Ölpreis',
      'fore.notice':'<strong>Hinweis:</strong> Juli ist noch nicht offiziell veröffentlicht. Diese Seite trennt bestätigte Juni-Daten von der Marktprognose.',
      'fore.intro':'Stand2026.05.24 10:30 KST sinken die Juni-Zuschläge, während Juli eine Prognose auf Basis von MOPS, USD/KRW, Ölpreis und Hormuz-Risiko bleibt.',
      'fore.section.indicators':'📊 Schlüsselindikatoren für Juli2026',
      'fore.indicator.footnote':'※ Juni sind bestätigte offizielle Mitteilungen; Juli ist eine Marktprognose.',
      'fore.predict.title':'Marktindikatoren',
      'fore.predict.subtitle':'Juni-Daten und Juli-Prognose getrennt',
      'fore.predict.footnote':'* Juli-Beträge müssen im Juni über offizielle Mitteilungen bestätigt werden.',
      'fore.summary.title':'📌 Kurzfassung Prognose Juli2026',
      'fore.summary.updated':'✅ Aktualisiert2026.05.24 10:30 KST',
      'fore.market.title':'🌍 Marktbriefing',
      'fore.market.brent':'🛢 Ölpreis: Verhandlungshoffnungen senken die Risikoprämie, aber Hormuz ist nicht vollständig gelöst.',
      'fore.market.fx':'💱 USD/KRW: öffentliche Daten vom2026.05.22 etwa 1.504~1.512 KRW.',
      'fore.market.mops':'✈️ MOPS: Rückgang von 511.21 auf 410.02 cents/gal.',
      'fore.market.geo':'⚠ Geopolitik: Hormuz-Risiko bleibt bestehen.',
      'fore.market.summary':'→ Zusätzliche Juli-Senkungen sind möglich, aber Wechselkurs und Geopolitik können den Umfang begrenzen.',
      'fore.market.fx2':'💡 Kernsignal: MOPS fällt, USD/KRW und Hormuz begrenzen die Senkung.',
      'fore.verdict.title':'📌 Fazit Juli',
      'fore.verdict.line1':'→ Der MOPS-Rückgang eröffnet Spielraum für weitere Senkungen im Juli.',
      'fore.verdict.line2':'→ Juli ist noch nicht bestätigt; offizielle Mitteilungen müssen im Juni geprüft werden.',
      'fore.verdict.short':'👉 Kurzstrecke: Basispreis und Sitzplätze können wichtiger sein.',
      'fore.verdict.long':'👉 Langstrecke: Zuschlag und Wechselkurs gemeinsam prüfen.',
      'fore.mops.analysis.title':'📉 MOPS und Juli-Prognose',
      'fore.mops.analysis.body':'Der MOPS-Rückgang stützt mögliche Juli-Senkungen, aber USD/KRW und Hormuz-Risiko können den Umfang begrenzen.',
      'fore.booking.title':'🗓️ Buchungsleitfaden',
      'fore.keyvars.title':'🔑 Schlüsselvariablen',
      'fore.basis.title':'📅 Berechnungsbasis Juli',
      'fore.basis.body':'Juli-Zuschläge werden anhand durchschnittlicher Treibstoffpreise, Wechselkurse und Airline-Regeln veröffentlicht.',
      'fore.aiNotice':'Referenzinhalt auf Basis öffentlicher Daten.',
      'fore.official.title':'🔗 Offizielle Airline-Mitteilungen',
      'fore.related.title':'🔗 Verwandte Seiten',
      'fore.footnote':'Unverbindliche Prognose. Prüfen Sie immer den endgültigen Betrag.'
    };
    if(fore[key] !== undefined) return fore[key];
  }
  var extra = isFr ? {
    'affiliate.flight.title':'Comparer le prix total du billet', 'affiliate.flight.desc':'Vérifiez le prix du billet avec taxes et surtaxes incluses.', 'affiliate.flight.btn':'Voir les prix des vols',
    'affiliate.hotel.title2':'Comparer les hébergements avec vos dates', 'affiliate.hotel.desc2':'Comparez aussi l’hôtel pour estimer le coût total du voyage.', 'affiliate.hotel.btn2':'Comparer les hôtels',
    'fore.myrealtrip.title':'Comparez le prix total du billet maintenant', 'fore.myrealtrip.desc':'Les surtaxes de juin ont baissé ; comparez le prix final avant achat.', 'fore.myrealtrip.btn':'Vérifier le prix total →',
    'fore.cta.desc':'📍 Vérifiez les surtaxes actuelles par itinéraire', 'fore.cta.main':'👉 Rechercher les surtaxes', 'fore.cta.may':'👉 Comparer mai et juin',
    'fore.hotelscombined.title':'🏨 Comparez aussi les hébergements', 'fore.hotelscombined.desc':'Après le vol, comparez l’hébergement pour voir le coût total.', 'fore.hotelscombined.btn':'Comparer les hôtels →',
    'calc.card1.title':'Lien avec le pétrole', 'calc.card1.body':'Les surtaxes sont calculées à partir des prix moyens du pétrole et du carburant aérien.', 'calc.card2.title':'Zones par distance', 'calc.card2.body':'Les montants diffèrent selon la distance et la compagnie.', 'calc.card3.title':'Base de comparaison', 'calc.card3.body':'Le calcul compare les montants publiés en mai et juin.',
    'calc.section.structure':'📖 Structure de calcul', 'calc.guide.what.title':'💡 Qu’est-ce qu’une surtaxe carburant ?', 'calc.guide.what.body':'C’est un supplément appliqué au billet pour refléter le coût du carburant.', 'calc.guide.how.title':'📋 Méthode de calcul',
    'calc.guide.how.step1':'<strong>Prix de référence :</strong> prix moyen du mois précédent.', 'calc.guide.how.step2':'<strong>Zone :</strong> le prix est associé à un palier.', 'calc.guide.how.step3':'<strong>Montant :</strong> il dépend de la distance et de la compagnie.', 'calc.guide.how.step4':'<strong>Application :</strong> selon la date de billetterie.', 'calc.guide.how.step5':'<strong>Aller-retour :</strong> généralement deux fois l’aller simple.',
    'calc.row.ke.method':'Zones court / long-courrier', 'calc.row.oz.method':'Zones court / long-courrier', 'calc.row.lcc.method':'Par route ou par zone', 'calc.row.ze.method':'Zone / publication USD', 'calc.row.rs.method':'Zone de distance / KRW', 'calc.note.monthly':'Mensuel', 'calc.note.manual':'Manuel',
    'calc.tableFootnote':'※ Vérifiez toujours les zones et montants exacts dans l’avis officiel.',
    'index.intro3.title':'Pourquoi ce service ?', 'index.guide.title':'💡 Qu’est-ce qu’une surtaxe carburant ?', 'index.quick.jul.name':'Prévision juillet2026', 'index.quick.jul.desc':'Voir la prévision de juillet basée sur MOPS, change et pétrole.',
    'news.officialNotice':'✅ Période : 1er–30 juin2026 · avis officiel', 'news.filterAirline':'Compagnies',
    'graph.legend.averageNote':'Vue globale : montant moyen par compagnie'
  } : {
    'affiliate.flight.title':'Gesamtpreis des Flugtickets vergleichen', 'affiliate.flight.desc':'Prüfen Sie den Flugpreis inklusive Steuern und Zuschlägen.', 'affiliate.flight.btn':'Flugpreise ansehen',
    'affiliate.hotel.title2':'Unterkünfte passend zu Ihren Reisedaten vergleichen', 'affiliate.hotel.desc2':'Vergleichen Sie auch Hotels, um die Gesamtkosten zu sehen.', 'affiliate.hotel.btn2':'Hotels vergleichen',
    'fore.myrealtrip.title':'Gesamtpreis des Tickets jetzt vergleichen', 'fore.myrealtrip.desc':'Die Juni-Zuschläge sind niedriger; prüfen Sie den Endpreis vor dem Kauf.', 'fore.myrealtrip.btn':'Gesamtpreis prüfen →',
    'fore.cta.desc':'📍 Aktuelle Zuschläge nach Route prüfen', 'fore.cta.main':'👉 Zuschläge suchen', 'fore.cta.may':'👉 Mai und Juni vergleichen',
    'fore.hotelscombined.title':'🏨 Auch Unterkünfte vergleichen', 'fore.hotelscombined.desc':'Nach dem Flugpreis hilft der Hotelvergleich beim Gesamtbudget.', 'fore.hotelscombined.btn':'Hotels vergleichen →',
    'calc.card1.title':'Bezug zum Ölpreis', 'calc.card1.body':'Zuschläge werden aus Durchschnittspreisen für Öl und Flugtreibstoff berechnet.', 'calc.card2.title':'Distanzzonen', 'calc.card2.body':'Die Beträge unterscheiden sich nach Entfernung und Airline.', 'calc.card3.title':'Vergleichsbasis', 'calc.card3.body':'Der Rechner vergleicht veröffentlichte Beträge im Mai und Juni.',
    'calc.section.structure':'📖 Berechnungsstruktur', 'calc.guide.what.title':'💡 Was ist ein Treibstoffzuschlag?', 'calc.guide.what.body':'Ein Zusatzbetrag zum Ticket, der Treibstoffkosten abbildet.', 'calc.guide.how.title':'📋 Berechnungsmethode',
    'calc.guide.how.step1':'<strong>Referenzpreis:</strong> Durchschnittspreis des Vormonats.', 'calc.guide.how.step2':'<strong>Zone:</strong> der Preis wird einer Stufe zugeordnet.', 'calc.guide.how.step3':'<strong>Betrag:</strong> abhängig von Distanz und Airline.', 'calc.guide.how.step4':'<strong>Anwendung:</strong> nach Ticketausstellungsdatum.', 'calc.guide.how.step5':'<strong>Hin und zurück:</strong> meist doppelter einfacher Betrag.',
    'calc.row.ke.method':'Kurz- / Langstreckenzonen', 'calc.row.oz.method':'Kurz- / Langstreckenzonen', 'calc.row.lcc.method':'Je Route oder Zone', 'calc.row.ze.method':'Zone / USD-Mitteilung', 'calc.row.rs.method':'Distanzzone / KRW', 'calc.note.monthly':'Monatlich', 'calc.note.manual':'Manuell',
    'calc.tableFootnote':'※ Prüfen Sie genaue Zonen und Beträge immer in der offiziellen Mitteilung.',
    'index.intro3.title':'Warum dieser Service?', 'index.guide.title':'💡 Was ist ein Treibstoffzuschlag?', 'index.quick.jul.name':'Prognose Juli2026', 'index.quick.jul.desc':'Juli-Prognose auf Basis von MOPS, Wechselkurs und Ölpreis ansehen.',
    'news.officialNotice':'✅ Zeitraum: 1.–30. Juni2026 · offizielle Mitteilung', 'news.filterAirline':'Airlines',
    'graph.legend.averageNote':'Gesamtansicht: Durchschnittsbetrag je Airline'
  };
  if(extra[key] !== undefined) return extra[key];
  if(/^korea\./.test(key)){
    var ktail = key.replace(/^korea\./,'');
    var kbase = isFr ? {
      pageTitle:'🇰🇷 Surtaxe carburant au départ de Corée', pageSub:'Recherche par compagnie et route', h1:'Surtaxe carburant internationale au départ de Corée',
      langNotice:'Les montants varient selon la date de billetterie et la compagnie.', intro:'Comparez les surtaxes carburant pour les vols internationaux au départ de Corée.',
      officialLinkTitle:common.officialTitle, footnote:common.foot
      , 'footer.contact':'Kontakt', usdBadge:'Publication USD'
    } : {
      pageTitle:'🇰🇷 Treibstoffzuschlag ab Korea', pageSub:'Suche nach Airline und Route', h1:'Internationaler Treibstoffzuschlag ab Korea',
      langNotice:'Beträge variieren nach Ticketausstellung und Airline.', intro:'Vergleichen Sie Treibstoffzuschläge für internationale Flüge ab Korea.',
      officialLinkTitle:common.officialTitle, footnote:common.foot
      , 'footer.contact':'Kontakt', usdBadge:'USD-Mitteilung'
    };
    if(kbase[ktail] !== undefined) return kbase[ktail];
    if(/title$/i.test(ktail)) return isFr ? 'Information clé' : 'Wichtige Information';
    if(/desc$|body$/i.test(ktail)) return isFr ? 'Vérifiez les montants officiels et le total final avant achat.' : 'Prüfen Sie offizielle Beträge und den Endpreis vor dem Kauf.';
    if(/btn$/i.test(ktail)) return isFr ? 'Vérifier maintenant' : 'Jetzt prüfen';
    if(/^related\./.test(ktail)) return common.related;
    if(/^th\./.test(ktail)) return common.diff;
  }
  return undefined;
};

/* ─── 번역 함수 ─── */
window.t = function(key){
  var lang = window.getCurrentLang();
  /* 1순위: 페이지별 override (news.html 등에서 선언) */
  if(window.PAGE_I18N_OVERRIDE){
    var ovLang = window.PAGE_I18N_OVERRIDE[lang];
    if(ovLang && ovLang[key] !== undefined) return ovLang[key];
  }
  /*2순위: 공용 I18N 사전 */
  var dict = window.I18N[lang];
  if(dict && dict[key] !== undefined) return dict[key];
  var auto = window.pageAutoTranslate ? window.pageAutoTranslate(lang, key) : undefined;
  if(auto !== undefined) return auto;
  var en = window.I18N['en'];
  if(lang !== 'ko' && en && en[key] !== undefined) return en[key];
  if(window.PAGE_I18N_OVERRIDE && lang !== 'ko'){
    var ovEn = window.PAGE_I18N_OVERRIDE['en'];
    if(ovEn && ovEn[key] !== undefined) return ovEn[key];
  }
  if(window.PAGE_I18N_OVERRIDE){
    var ovKo = window.PAGE_I18N_OVERRIDE['ko'];
    if(ovKo && ovKo[key] !== undefined) return ovKo[key];
  }
  var ko = window.I18N['ko'];
  if(ko && ko[key] !== undefined) return ko[key];
  return key;
};

/* ─── 공항 select 재구성 ─── */
window.buildAirportOptions = function(selectEl, type){
  /* type: 'origin' | 'dest' */
  var saved = selectEl.value;
  selectEl.innerHTML = '';
  /* placeholder */
  var ph = document.createElement('option');
  ph.value = '';
  ph.textContent = window.t(type === 'origin' ? 'index.airport.selectOrigin' : 'index.airport.selectDest');
  selectEl.appendChild(ph);

  AIRPORT_GROUPS.forEach(function(grp){
    var og = document.createElement('optgroup');
    og.label = window.t(grp.key);
    grp.codes.forEach(function(code){
      var opt = document.createElement('option');
      opt.value = code;
      opt.textContent = window.t('airport.' + code) + ' (' + code + ')';
      og.appendChild(opt);
    });
    selectEl.appendChild(og);
  });
  /* 선택값 복원 */
  if(saved) selectEl.value = saved;
};

/* ─── 공항 별칭 (도시명·국가명·영문 검색 지원) ─── */
/* ─── 공항 개별 별칭 (도시명·영문) ─── */
var AIRPORT_ALIASES = {
  /* ── 한국 ── */
  ICN: ['인천','서울','seoul','korea','한국','대한민국','incheon'],
  GMP: ['김포','서울','seoul','korea','한국','대한민국','gimpo'],
  PUS: ['부산','busan','korea','한국','대한민국'],
  CJU: ['제주','jeju','korea','한국','대한민국'],
  CJJ: ['청주','cheongju','korea','한국','대한민국'],
  TAE: ['대구','daegu','korea','한국','대한민국'],
  /* ── 일본 ── */
  NRT: ['도쿄','동경','tokyo','japan','일본','나리타','narita'],
  HND: ['도쿄','동경','tokyo','japan','일본','하네다','haneda'],
  KIX: ['오사카','osaka','간사이','kansai','japan','일본'],
  FUK: ['후쿠오카','fukuoka','japan','일본'],
  CTS: ['삿포로','sapporo','홋카이도','hokkaido','japan','일본'],
  OKA: ['오키나와','okinawa','japan','일본'],
  NGO: ['나고야','nagoya','japan','일본','주부','chubu'],
  KMJ: ['구마모토','kumamoto','japan','일본'],
  NGS: ['나가사키','nagasaki','japan','일본'],
  OIT: ['오이타','oita','japan','일본'],
  HIJ: ['히로시마','hiroshima','japan','일본'],
  KOJ: ['가고시마','kagoshima','japan','일본'],
  MYJ: ['마쓰야마','matsuyama','japan','일본'],
  HKD: ['하코다테','hakodate','japan','일본'],
  FSZ: ['시즈오카','shizuoka','japan','일본'],
  TAK: ['다카마쓰','takamatsu','japan','일본'],
  /* ── 중국 ── */
  PVG: ['상하이','shanghai','china','중국','푸동','pudong'],
  SHA: ['상하이','shanghai','china','중국','훙차오','hongqiao'],
  PEK: ['베이징','beijing','china','중국','북경'],
  CAN: ['광저우','guangzhou','china','중국'],
  CTU: ['청두','chengdu','china','중국'],
  XIY: ['시안','xian','china','중국'],
  CGO: ['정저우','zhengzhou','china','중국'],
  CKG: ['충칭','chongqing','china','중국'],
  YNJ: ['옌지','yanji','china','중국'],
  DYG: ['장자제','zhangjiajie','china','중국'],
  TAO: ['칭다오','qingdao','china','중국'],
  WEH: ['웨이하이','weihai','china','중국'],
  YNT: ['옌타이','yantai','china','중국'],
  NTG: ['난통','nantong','china','중국'],
  HRB: ['하얼빈','harbin','china','중국'],
  KWL: ['구이린','guilin','china','중국'],
  SYX: ['싼야','sanya','hainan','하이난','china','중국'],
  SHE: ['선양','shenyang','china','중국'],
  DLC: ['다롄','dalian','china','중국'],
  TSN: ['톈진','tianjin','china','중국'],
  HGH: ['항저우','hangzhou','china','중국'],
  NKG: ['난징','nanjing','china','중국'],
  SZX: ['선전','shenzhen','china','중국'],
  XMN: ['샤먼','xiamen','china','중국'],
  CSX: ['창사','changsha','长沙','長沙','china','중국'],
  /* ── 대만 ── */
  TPE: ['타이베이','taipei','taiwan','대만'],
  KHH: ['가오슝','kaohsiung','taiwan','대만'],
  RMQ: ['타이중','taichung','taiwan','대만'],
  /* ── 동남아 ── */
  BKK: ['방콕','bangkok','thailand','태국'],
  SIN: ['싱가포르','singapore'],
  HKG: ['홍콩','hong kong','hongkong'],
  MNL: ['마닐라','manila','philippines','필리핀'],
  CEB: ['세부','cebu','philippines','필리핀'],
  KUL: ['쿠알라룸푸르','kuala lumpur','malaysia','말레이시아'],
  SGN: ['호찌민','ho chi minh','vietnam','베트남','hcmc'],
  HAN: ['하노이','hanoi','vietnam','베트남'],
  DAD: ['다낭','da nang','danang','vietnam','베트남'],
  DPS: ['발리','bali','indonesia','인도네시아','덴파사르','denpasar'],
  HKT: ['푸껫','phuket','thailand','태국'],
  NHA: ['나트랑','nha trang','vietnam','베트남'],
  CNX: ['치앙마이','chiang mai','thailand','태국'],
  MFM: ['마카오','macau','macao'],
  GUM: ['괌','guam'],
  SPN: ['사이판','saipan'],
  KLO: ['보라카이','boracay','칼리보','kalibo','philippines','필리핀'],
  CXR: ['나트랑','깜라인','cam ranh','nha trang','khanh hoa','vietnam','베트남'],
  /* ── 미국 / 캐나다 / 오세아니아 ── */
  LAX: ['LA','los angeles','usa','미국','로스앤젤레스','america'],
  JFK: ['뉴욕','new york','usa','미국','nyc','america'],
  EWR: ['뉴어크','뉴욕','newark','new york','usa','미국','nyc','america'],
  SFO: ['샌프란시스코','san francisco','usa','미국','america'],
  HNL: ['호놀룰루','honolulu','hawaii','하와이','usa','미국','america'],
  SEA: ['시애틀','seattle','usa','미국','america'],
  YVR: ['밴쿠버','vancouver','canada','캐나다'],
  YYZ: ['토론토','toronto','canada','캐나다'],
  IAD: ['워싱턴','washington','usa','미국','dc','america'],
  BOS: ['보스턴','boston','usa','미국','america'],
  ORD: ['시카고','chicago','usa','미국','america'],
  ATL: ['애틀랜타','atlanta','usa','미국','america'],
  DFW: ['달라스','dallas','usa','미국','america'],
  LAS: ['라스베이거스','las vegas','usa','미국','america'],
  SYD: ['시드니','sydney','australia','호주','oceania','오세아니아'],
  MEL: ['멜버른','melbourne','australia','호주','oceania','오세아니아'],
  AKL: ['오클랜드','auckland','newzealand','new zealand','뉴질랜드','oceania','오세아니아'],
  BNE: ['브리즈번','brisbane','australia','호주','oceania','오세아니아'],
  /* ── 유럽 ── */
  CDG: ['파리','paris','france','프랑스','europe','유럽'],
  LHR: ['런던','london','uk','영국','britain','europe','유럽'],
  FRA: ['프랑크푸르트','frankfurt','germany','독일','europe','유럽'],
  AMS: ['암스테르담','amsterdam','netherlands','네덜란드','europe','유럽'],
  FCO: ['로마','rome','italy','이탈리아','europe','유럽'],
  BCN: ['바르셀로나','barcelona','spain','스페인','europe','유럽'],
  PRG: ['프라하','prague','czech','체코','europe','유럽'],
  BUD: ['부다페스트','budapest','hungary','헝가리','europe','유럽'],
  MXP: ['밀라노','milan','italy','이탈리아','europe','유럽'],
  VIE: ['비엔나','vienna','austria','오스트리아','europe','유럽'],
  MAD: ['마드리드','madrid','spain','스페인','europe','유럽'],
  LIS: ['리스본','lisbon','portugal','포르투갈','europe','유럽'],
  ZRH: ['취리히','zurich','switzerland','스위스','europe','유럽'],
  ZAG: ['자그레브','zagreb','croatia','크로아티아','europe','유럽'],
  /* ── 중동 ── */
  DXB: ['두바이','dubai','uae','아랍에미리트'],
  DOH: ['도하','doha','qatar','카타르'],
  IST: ['이스탄불','istanbul','turkey','튀르키예','터키'],
  CAI: ['카이로','cairo','egypt','이집트'],
  AUH: ['아부다비','abu dhabi','uae','아랍에미리트'],
  RUH: ['리야드','riyadh','saudi','사우디'],
};

/* ─── 지역(국가) 키워드 → AIRPORT_GROUPS key 매핑 ─── */
/* ─── 지역(국가) 키워드 → AIRPORT_GROUPS key 직접 매핑 ─── */
var REGION_KEY_MAP = [
  {
    keys: ['한국','대한민국','korea','kr','south korea'],
    groupKeys: ['index.region.korea']
  },
  {
    keys: ['일본','japan','jp'],
    groupKeys: ['index.region.japan']
  },
  {
    keys: ['중국','china','cn'],
    groupKeys: ['index.region.china']
  },
  {
    keys: ['대만','taiwan','tw'],
    groupKeys: ['index.region.taiwan']
  },
  {
    keys: ['동남아','southeast asia','베트남','vietnam','태국','thailand',
           '싱가포르','singapore','필리핀','philippines','말레이시아','malaysia',
           '인도네시아','indonesia','괌','guam','사이판'],
    groupKeys: ['index.region.seasia','index.region.seasia2']
  },
  {
    keys: ['미국','usa','america','united states','북미'],
    groupKeys: ['index.region.usa']
  },
  {
    keys: ['캐나다','canada'],
    groupKeys: ['index.region.canada']
  },
  {
    keys: ['호주','australia','오스트레일리아'],
    groupKeys: ['index.region.australia']
  },
  {
    keys: ['뉴질랜드','newzealand','new zealand'],
    groupKeys: ['index.region.newzealand']
  },
  {
    keys: ['오세아니아','oceania'],
    groupKeys: ['index.region.australia','index.region.newzealand']
  },
  {
    keys: ['유럽','europe'],
    groupKeys: ['index.region.europeMiddleEast']
  },
  {
    keys: ['중동','middle east','두바이','도하','이스탄불','이집트'],
    groupKeys: ['index.region.europeMiddleEast']
  },
  {
    keys: ['남아시아','인도','india','스리랑카','중앙아시아'],
    groupKeys: ['index.region.swasia']
  },
];

/* ─── 지역 키워드 매칭 → 해당 그룹 전체 codes 배열 반환 ─── */
function matchRegionCodes(ql){
  /* 매칭된 모든 groupKeys 수집 (복수 매칭 허용) */
  var matchedGroupKeys = {};
  for(var ri=0; ri<REGION_KEY_MAP.length; ri++){
    var rm = REGION_KEY_MAP[ri];
    for(var ki=0; ki<rm.keys.length; ki++){
      if(ql.indexOf(rm.keys[ki]) !== -1){
        rm.groupKeys.forEach(function(gk){ matchedGroupKeys[gk] = true; });
        break; /* 한 항목에서 키 하나 매칭되면 다음 REGION_KEY_MAP 항목으로 */
      }
    }
  }
  if(!Object.keys(matchedGroupKeys).length) return null;

  /* 매칭된 groupKeys에 속하는 모든 codes 수집 */
  var allCodes = [];
  AIRPORT_GROUPS.forEach(function(grp){
    if(matchedGroupKeys[grp.key]){
      allCodes = allCodes.concat(grp.codes);
    }
  });

  /* 중복 제거 */
  var seen = {};
  return allCodes.filter(function(c){ return seen[c] ? false : (seen[c] = true); });
}

/* ─── 공항 검색 자동완성용 items 반환 ─── */
window.getAirportSearchItems = function(){
  var items = [];
  AIRPORT_GROUPS.forEach(function(grp){
    grp.codes.forEach(function(code){
      var label   = window.t('airport.' + code);
      var labelKo = (window.I18N['ko'] && window.I18N['ko']['airport.' + code]) || '';
      var aliases = (AIRPORT_ALIASES[code] || []).join(' ');
      items.push({
        code: code,
        label: label,
        searchText: (labelKo + ' ' + label + ' ' + code + ' ' + aliases).toLowerCase(),
        display: label + ' (' + code + ')'
      });
    });
  });
  return items;
};

/* ─── 지역 검색어를 items 배열로 변환 ─── */
window.getAirportItemsByRegionQuery = function(ql){
  var codes = matchRegionCodes(ql);
  if(!codes || !codes.length) return null;
  var all   = window.getAirportSearchItems();
  var codeSet = {};
  codes.forEach(function(c){ codeSet[c] = true; });
  return all.filter(function(it){ return codeSet[it.code]; });
};

/* ─── DOM 일괄 applyLanguage ─── */
window.applyLanguage = function(){
  var lang = window.getCurrentLang();
  document.documentElement.lang = lang;
  /* data-i18n */
  document.querySelectorAll('[data-i18n]').forEach(function(el){
    var key = el.getAttribute('data-i18n');
    var val = window.t(key);
    /* t()가 키 자체를 반환(번역 없음)하거나 빈 값이면 기존 텍스트 유지 */
    if(!val || val === key) return;
    if (String(val).indexOf('data-market-metric') !== -1) {
      el.innerHTML = val;
    } else {
      el.textContent = val;
    }
  });
  /* data-i18n-html */
  document.querySelectorAll('[data-i18n-html]').forEach(function(el){
    el.innerHTML = window.t(el.getAttribute('data-i18n-html'));
  });
  /* data-i18n-placeholder */
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el){
    el.placeholder = window.t(el.getAttribute('data-i18n-placeholder'));
  });
  /* data-i18n-title */
  document.querySelectorAll('[data-i18n-title]').forEach(function(el){
    el.title = window.t(el.getAttribute('data-i18n-title'));
  });
  /* data-i18n-aria-label */
  document.querySelectorAll('[data-i18n-aria-label]').forEach(function(el){
    el.setAttribute('aria-label', window.t(el.getAttribute('data-i18n-aria-label')));
  });
  /* airport selects */
  var orig = document.getElementById('originSelect');
  var dest = document.getElementById('destSelect');
  if(orig) window.buildAirportOptions(orig, 'origin');
  if(dest) window.buildAirportOptions(dest, 'dest');
  /* document.title */
  var titleKey = document.querySelector('meta[data-i18n-page-title]');
  if(titleKey) {
    var localizedTitle = window.t(titleKey.getAttribute('data-i18n-page-title'));
    document.title = localizedTitle;
    var ogTitle = document.querySelector('meta[property="og:title"]');
    var twTitle = document.querySelector('meta[name="twitter:title"], meta[property="twitter:title"]');
    if(ogTitle) ogTitle.setAttribute('content', localizedTitle);
    if(twTitle) twTitle.setAttribute('content', localizedTitle);
  }
  /* meta description */
  var descEl = document.querySelector('meta[name="description"][data-i18n-page-desc]');
  if(descEl) {
    var localizedDesc = window.t(descEl.getAttribute('data-i18n-page-desc'));
    descEl.setAttribute('content', localizedDesc);
    var ogDesc = document.querySelector('meta[property="og:description"]');
    var twDesc = document.querySelector('meta[name="twitter:description"], meta[property="twitter:description"]');
    if(ogDesc) ogDesc.setAttribute('content', localizedDesc);
    if(twDesc) twDesc.setAttribute('content', localizedDesc);
  }
  /* data-i18n may recreate market metric spans. Hydrate them after every language pass. */
  if (window.hydrateMarketMetricSpans) window.hydrateMarketMetricSpans(document);
  /* Keep JSON-LD modified dates aligned with the page-level article timestamp. */
  var modifiedMeta = document.querySelector('meta[property="article:modified_time"]');
  if(modifiedMeta && modifiedMeta.content){
    document.querySelectorAll('script[type="application/ld+json"]').forEach(function(script){
      if(!script.textContent || script.id === 'topicNewsStructuredData') return;
      try{
        var data = JSON.parse(script.textContent);
        function touch(node){
          if(!node || typeof node !== 'object') return;
          if(node.dateModified !== undefined) node.dateModified = modifiedMeta.content;
          if(Array.isArray(node['@graph'])) node['@graph'].forEach(touch);
          if(Array.isArray(node.mainEntity)) node.mainEntity.forEach(touch);
        }
        touch(data);
        script.textContent = JSON.stringify(data);
      }catch(e){}
    });
  }
};

/* ─── initNav 래핑 ─── */
/* 2026.06.01 09:05 KST latest market brief and news cards.
   June 2026 notice remains the confirmed baseline; July 2026 remains forecast-only. */
window.AERO_MARKET_BRIEF_20260601 = {
  id: 'market-brief-20260601-0905',
  timestamp: '2026-06-01T09:05:00+09:00',
  displayTime: '2026.06.01 09:05 KST',
  badge: 'LATEST',
  currentMonthNotice: '2026-06',
  forecastTargetMonth: '2026-07',
  summary: '2026.06.01 09:05 KST 기준 2026년 7월 유류할증료 전망은 국제유가, 항공유 가격, 약 1,505원대의 원달러 환율, 호르무즈 해협 리스크를 함께 봐야 합니다. 국제유가 상승과 원화 약세가 동시에 나타나면 항공사 유류비 부담이 커져 유류할증료 인하 가능성은 낮아지고 동결 또는 소폭 인상 압력이 커질 수 있습니다.',
  keywords: ['유류할증료 전망','2026년 7월 유류할증료','국제유가 전망','항공유 가격 전망','원달러 환율 전망','호르무즈 해협','항공권 유류할증료','대한항공 유류할증료','아시아나 유류할증료'],
  cards: [
    { title:'중동 긴장 지속', point:'호르무즈 해협 리스크 확대', decision:'국제유가 상승은 항공유 가격과 항공사 비용을 끌어올려 유류할증료 인상 압력으로 이어질 수 있습니다.' },
    { title:'원달러 환율 변동성 확대', point:'약 1,505원대 흐름', decision:'원화 약세가 겹치면 항공사 달러 결제 부담이 커져 유류할증료 인하 여력이 줄어듭니다.' },
    { title:'7월 전망', point:'동결 또는 소폭 인상 가능성 우세', decision:'유가 안정과 환율 하락이 함께 나타날 때만 일부 인하 가능성을 검토할 수 있습니다.' }
  ]
};

window.AERO_NEWS_CARDS_20260601 = [
  {
    id: 'news-20260601-middle-east-oil-pressure',
    slug: 'june-1-middle-east-hormuz-oil-pressure',
    category: 'market',
    priority: 1,
    date: '2026-06-01',
    updatedAt: '2026.06.01 09:05 KST 업데이트',
    badge: 'NEW',
    aiSummary: true,
    relevanceScore: 1,
    currentMonthNotice: '2026-06',
    forecastTargetMonth: '2026-07',
    title: '중동 긴장 지속, 국제유가 다시 상승 압력',
    aiBrief: '호르무즈 해협 리스크가 이어지면 원유 공급 차질 우려가 커지고 국제유가 변동성이 확대됩니다. 국제유가 상승은 항공유 가격 상승과 항공사 비용 증가로 이어져 유류할증료 인상 압력이 될 수 있습니다.',
    summary: '2026.06.01 09:05 KST 기준 2026년 7월 유류할증료 전망에서 가장 중요한 변수는 국제유가와 호르무즈 해협 리스크입니다.\n\n호르무즈 해협은 전 세계 원유 수송의 핵심 통로입니다. 긴장 확대나 봉쇄 우려가 커지면 국제유가와 항공유 가격이 급등할 수 있고, 이는 항공사 유류비 부담 증가와 항공권 유류할증료 인상 압력으로 연결됩니다.',
    impact: '유류할증료 전망, 국제유가 전망, 항공유 가격 전망, 호르무즈 해협 검색 의도에 대응합니다.',
    sourceName: '시장 지표 종합 점검 (2026.06.01 09:05 KST)',
    sourceUrl: 'forecast.html',
    tags: ['NEW','국제유가 전망','항공유 가격 전망','호르무즈 해협','유류할증료 전망'],
    faq: [
      { q:'호르무즈 해협이 유류할증료에 영향을 주는 이유는?', a:'호르무즈 해협은 전 세계 원유 수송의 핵심 통로입니다. 이 지역 긴장이 커지면 국제유가와 항공유 가격이 상승해 항공사 비용과 유류할증료에 영향을 줄 수 있습니다.' }
    ],
    links: [
      { href:'forecast.html', label:'2026년 7월 유류할증료 전망 보기' },
      { href:'fuel-surcharge-graph.html', label:'월별 유류할증료 그래프 보기' }
    ],
    i18n: {
      en: {
        title:'Middle East tensions keep upward pressure on oil prices',
        aiBrief:'Strait of Hormuz risk can raise oil supply concerns and widen oil-price volatility. Higher oil can lift jet fuel prices, airline costs and fuel surcharge pressure.',
        summary:'As of 2026.06.01 09:05 KST, oil prices and Strait of Hormuz risk are key variables for the July 2026 fuel surcharge outlook. If the chokepoint risk escalates, oil and jet fuel can rise, raising airline fuel costs and surcharge pressure.',
        impact:'Matches fuel surcharge outlook, oil price outlook, jet fuel price outlook and Strait of Hormuz search intent.'
      }
    }
  },
  {
    id: 'news-20260601-usdkrw-volatility',
    slug: 'june-1-usdkrw-volatility-airline-fuel-cost',
    category: 'market',
    priority: 1,
    date: '2026-06-01',
    updatedAt: '2026.06.01 09:05 KST 업데이트',
    badge: 'NEW',
    aiSummary: true,
    relevanceScore: 1,
    currentMonthNotice: '2026-06',
    forecastTargetMonth: '2026-07',
    title: '원달러 환율 변동성 확대',
    aiBrief: '공개 USD/KRW 환율은 약 1,505원대 흐름입니다. 한국 외환시장의 24시간 체제 확대를 앞두고 원달러 환율 변동성도 함께 봐야 합니다. 중동 리스크가 달러 강세와 원화 약세로 이어지면 항공사 달러 결제 부담이 커질 수 있습니다.',
    summary: '항공권 유류할증료는 국제유가만으로 결정되지 않습니다. 원달러 환율 전망도 함께 봐야 합니다.\n\n항공유와 국제선 관련 비용은 달러 결제 비중이 크기 때문에 원화가 약해지면 항공사 유류비 부담이 증가할 수 있습니다. 유가 상승과 원화 약세가 동시에 발생하면 2026년 7월 유류할증료 인하 가능성은 낮아지고 동결 또는 소폭 인상 가능성이 커질 수 있습니다.',
    impact: '원달러 환율 전망, 항공권 유류할증료, 유류할증료 인하 가능성 검색 의도에 대응합니다.',
    sourceName: '환율·항공사 비용 영향 점검',
    sourceUrl: 'fuel-surcharge-calculator.html',
    tags: ['NEW','원달러 환율 전망','항공권 유류할증료','항공사 유류비','유류할증료 전망'],
    faq: [
      { q:'환율이 오르면 유류할증료도 오르나요?', a:'항상 즉시 오르는 것은 아니지만, 원화 약세가 지속되면 항공사의 달러 결제 유류비 부담이 커져 유류할증료 인하 여력이 줄거나 인상 압력이 커질 수 있습니다.' }
    ],
    links: [
      { href:'fuel-surcharge-calculator.html', label:'유류할증료 계산기 보기' },
      { href:'index.html', label:'노선별 유류할증료 조회' }
    ],
    i18n: {
      en: {
        title:'USD/KRW volatility expands as an airfare variable',
        aiBrief:'With Korea expanding FX trading hours, USD/KRW volatility matters for airline fuel costs. Middle East risk can support the dollar and weaken the won.',
        summary:'Fuel surcharges are not driven by oil alone. If higher oil and a weaker won occur together, airline dollar-denominated fuel costs can rise and reduce room for July fuel surcharge cuts.',
        impact:'Matches USD/KRW outlook, airfare fuel surcharge and fuel surcharge cut search intent.'
      }
    }
  },
  {
    id: 'news-20260601-july-surcharge-outlook',
    slug: 'june-1-july-2026-fuel-surcharge-outlook',
    category: 'forecast',
    priority: 1,
    date: '2026-06-01',
    updatedAt: '2026.06.01 09:05 KST 업데이트',
    badge: 'NEW',
    aiSummary: true,
    relevanceScore: 1,
    currentMonthNotice: '2026-06',
    forecastTargetMonth: '2026-07',
    title: '7월 유류할증료 전망은?',
    aiBrief: '현재 기준 2026년 7월 유류할증료는 인하보다 동결 또는 소폭 인상 가능성에 더 무게가 실립니다. 국제유가, 원달러 환율, 호르무즈 해협 리스크가 핵심 변수입니다.',
    summary: '2026년 7월 유류할증료 전망은 세 가지 변수로 정리됩니다. 국제유가, 원달러 환율, 호르무즈 해협 리스크입니다.\n\n국제유가가 높은 수준을 유지하고 원화 약세가 지속될 경우 항공사의 유류비 부담이 증가하여 대한항공 유류할증료, 아시아나 유류할증료 등 주요 항공사의 7월 금액은 동결 또는 소폭 인상 압력을 받을 수 있습니다. 반대로 국제유가 안정과 환율 하락이 동시에 나타날 경우 일부 항공사의 인하 가능성도 남아 있습니다.',
    impact: '2026년 7월 유류할증료, 대한항공 유류할증료, 아시아나 유류할증료, 항공권 유류할증료 검색 의도에 대응합니다.',
    sourceName: '2026년 7월 유류할증료 전망 요약',
    sourceUrl: 'forecast.html',
    tags: ['NEW','2026년 7월 유류할증료','대한항공 유류할증료','아시아나 유류할증료','항공권 유류할증료'],
    faq: [
      { q:'2026년 7월 유류할증료는 인상될 가능성이 있나요?', a:'현재 기준으로는 국제유가와 환율 부담 때문에 인하보다 동결 또는 소폭 인상 가능성을 함께 봐야 합니다. 다만 유가 안정과 환율 하락이 동시에 나타나면 일부 인하 가능성도 남아 있습니다.' }
    ],
    links: [
      { href:'forecast.html', label:'7월 전망 상세 보기' },
      { href:'airlines.html', label:'항공사별 유류할증료 보기' }
    ],
    i18n: {
      en: {
        title:'What is the July fuel surcharge outlook?',
        aiBrief:'As of now, July 2026 fuel surcharges lean more toward freeze or small increase than a clear cut. Oil, USD/KRW and Hormuz risk are key variables.',
        summary:'The July 2026 fuel surcharge outlook depends on oil prices, USD/KRW and Strait of Hormuz risk. If oil remains high and the won weakens, Korean Air and Asiana fuel surcharges may face freeze or small-increase pressure.',
        impact:'Matches July 2026 fuel surcharge, Korean Air fuel surcharge, Asiana fuel surcharge and airfare surcharge search intent.'
      }
    }
  }
];
window.AERO_NEWS_LATEST = window.AERO_MARKET_BRIEF_20260601;

/* 2026.06.02 08:30 KST latest market brief and news cards.
   June 2026 notice remains the confirmed baseline; July 2026 remains forecast-only. */
window.AERO_MARKET_BRIEF_20260602 = {
  id: 'market-brief-20260602-0830',
  timestamp: '2026-06-02T08:30:00+09:00',
  displayTime: '2026.06.02 08:30 KST',
  badge: 'LATEST',
  currentMonthNotice: '2026-06',
  forecastTargetMonth: '2026-07',
  summary: '2026.06.02 08:30 KST 기준 2026년 7월 유류할증료 전망은 국제유가, 항공유 가격, 원달러 환율, 호르무즈 해협 정상화 속도를 함께 봐야 합니다. 중동 리스크와 선박 통행 불확실성은 항공유 가격 상승 압력으로 이어질 수 있고, 달러 강세·원화 약세가 겹치면 국제선 유류할증료 인하 여력은 줄어듭니다. 7월 금액은 아직 공식 공시 전이며 현재 전망은 6월 대비 상승 또는 고점 유지 가능성 우세입니다.',
  keywords: ['2026년 7월 유류할증료 전망','국제선 유류할증료','항공유 가격','원달러 환율','호르무즈 해협','항공권 가격 전망','OPEC+ 증산','대한항공 유류할증료','아시아나 유류할증료'],
  cards: [
    { title:'항공유 가격 상승 압력 지속', point:'중동 리스크와 호르무즈 불안', decision:'국제유가 상승 압력이 항공유 가격과 항공사 연료비 부담으로 연결되며 7월 유류할증료 상승 요인이 될 수 있습니다.' },
    { title:'호르무즈 해협 리스크가 핵심 변수', point:'통행 제한·보험료·우회 운항 가능성', decision:'단순 유가보다 호르무즈 해협 정상화 속도가 향후 항공유 공급과 유류할증료 전망의 핵심 변수입니다.' },
    { title:'OPEC+ 증산 효과는 제한적', point:'공급 안정 요인이나 물류 차질 상쇄는 제한', decision:'일부 산유국 증산은 유가 안정 요인이지만 지정학 리스크와 운송 차질을 완전히 상쇄하기는 어렵습니다.' },
    { title:'달러 강세·원화 약세 부담', point:'안전자산 선호와 환율 변동성', decision:'원/달러 환율 상승은 항공사의 달러 결제 연료비 부담을 키워 국제선 유류할증료에 추가 상승 요인으로 작용할 수 있습니다.' },
    { title:'2026년 7월 유류할증료 전망', point:'상승 또는 고점 유지 가능성 우세', decision:'호르무즈 정상화, 국제유가 조정, 원화 반등이 함께 확인되면 상승폭은 제한될 수 있습니다.' }
  ]
};

window.AERO_NEWS_CARDS_20260602 = [
  {
    id: 'news-20260602-jet-fuel-pressure',
    slug: 'june-2-jet-fuel-price-pressure',
    category: 'market',
    priority: 1,
    date: '2026-06-02',
    updatedAt: '2026.06.02 08:30 KST 업데이트',
    badge: 'NEW',
    aiSummary: true,
    relevanceScore: 1,
    currentMonthNotice: '2026-06',
    forecastTargetMonth: '2026-07',
    title: '항공유 가격 상승 압력 지속',
    aiBrief: '중동 리스크와 호르무즈 해협 불안은 국제유가와 항공유 가격의 상승 압력입니다. 국제유가 상승 → 항공유 가격 상승 → 항공사 연료비 부담 확대 → 유류할증료 인상 압력 구조로 봐야 합니다.',
    summary: '2026.06.02 08:30 KST 기준 항공유 가격은 중동 리스크와 호르무즈 해협 불안의 영향을 계속 받고 있습니다.\n\n항공사는 국제선 연료비의 상당 부분을 달러 기준으로 부담하기 때문에 항공유 가격이 높은 구간에 머물면 2026년 7월 국제선 유류할증료 전망도 인하보다 상승 또는 고점 유지 가능성을 함께 봐야 합니다. 다만 7월 유류할증료는 아직 항공사 공식 공시 전이므로 확정 금액처럼 표현해서는 안 됩니다.',
    impact: '유류할증료 영향: 상승. 7월 전망 영향: 6월 대비 상승 또는 고점 유지 가능성을 높이는 요인입니다.',
    sourceName: '2026년 7월 유류할증료 전망 업데이트',
    sourceUrl: 'forecast.html',
    tags: ['NEW','항공유 가격','국제유가 전망','국제선 유류할증료','항공권 가격 전망'],
    faq: [
      { q:'2026년 7월 유류할증료는 오를 가능성이 있나요?', a:'가능성은 있습니다. 항공유 가격과 국제유가가 높은 구간을 유지하고 원달러 환율까지 오르면 7월 유류할증료는 6월 대비 상승 또는 고점 유지 압력을 받을 수 있습니다. 단, 아직 공식 공시는 아닙니다.' }
    ],
    links: [
      { href:'forecast.html', label:'2026년 7월 유류할증료 전망 보기' },
      { href:'fuel-surcharge-calculator.html', label:'6월 확정 공시 기준 계산기 보기' }
    ],
    i18n: {
      en: {
        title:'Jet fuel price pressure continues',
        aiBrief:'Middle East risk and Strait of Hormuz uncertainty keep upward pressure on oil and jet fuel. The chain is oil up, jet fuel up, airline fuel costs up, and fuel surcharge pressure up.',
        summary:'As of 2026.06.02 08:30 KST, jet fuel prices remain exposed to Middle East and Strait of Hormuz risk. July 2026 fuel surcharge amounts are not confirmed filings yet, but the market bias has shifted toward freeze, high-level continuation or a small increase.',
        impact:'Fuel surcharge impact: upward. July outlook impact: increases the chance of freeze or higher levels.'
      }
    }
  },
  {
    id: 'news-20260602-hormuz-risk',
    slug: 'june-2-strait-of-hormuz-risk',
    category: 'market',
    priority: 1,
    date: '2026-06-02',
    updatedAt: '2026.06.02 08:30 KST 업데이트',
    badge: 'NEW',
    aiSummary: true,
    relevanceScore: 1,
    currentMonthNotice: '2026-06',
    forecastTargetMonth: '2026-07',
    title: '호르무즈 해협 리스크가 핵심 변수',
    aiBrief: '호르무즈 해협은 전 세계 원유 수송의 핵심 통로입니다. 선박 통행 제한, 보험료 상승, 우회 운항 가능성이 커지면 원유·항공유 공급 불확실성이 높아집니다.',
    summary: '호르무즈 해협은 전 세계 해상 원유 물동량의 약 20%가 통과하는 핵심 지역으로, 중동 지정학 리스크가 국제유가와 항공유 가격에 전달되는 통로입니다.\n\n이번 7월 유류할증료 전망에서는 단순한 유가 숫자보다 호르무즈 해협 정상화 속도가 더 중요한 변수입니다. 통행 제한, 보험료 상승, 우회 운항 가능성이 지속되면 항공유 공급 불확실성이 커지고 항공권 유류할증료 인하 가능성은 낮아질 수 있습니다.',
    impact: '유류할증료 영향: 상승. 7월 전망 영향: 호르무즈 정상화가 지연되면 고점 유지 또는 상승 압력이 커집니다.',
    sourceName: '호르무즈 해협 리스크 점검',
    sourceUrl: 'forecast.html',
    tags: ['NEW','호르무즈 해협','국제유가 전망','항공유 가격 전망','유류할증료 전망'],
    faq: [
      { q:'호르무즈 해협이 유류할증료에 영향을 주는 이유는 무엇인가요?', a:'호르무즈 해협은 원유 수송의 핵심 통로입니다. 이 지역에서 봉쇄, 충돌, 통행 제한이 발생하면 국제유가와 항공유 가격이 올라 항공사의 연료비 부담과 유류할증료 전망에 영향을 줄 수 있습니다.' }
    ],
    links: [
      { href:'forecast.html', label:'호르무즈 리스크 반영 전망 보기' },
      { href:'news.html', label:'최신 유류할증료 뉴스 보기' }
    ],
    i18n: {
      en: {
        title:'Strait of Hormuz risk is the key variable',
        aiBrief:'The Strait of Hormuz is a critical oil transit route. Traffic limits, higher insurance costs and rerouting risk can raise oil and jet fuel uncertainty.',
        summary:'For the July 2026 fuel surcharge outlook, the pace of normalization in the Strait of Hormuz may matter more than a single oil-price quote. Delays can keep jet fuel supply uncertainty high.',
        impact:'Fuel surcharge impact: upward. July outlook impact: delayed normalization supports higher or elevated levels.'
      }
    }
  },
  {
    id: 'news-20260602-opec-plus-limited',
    slug: 'june-2-opec-plus-production-limited-effect',
    category: 'market',
    priority: 1,
    date: '2026-06-02',
    updatedAt: '2026.06.02 08:30 KST 업데이트',
    badge: 'NEW',
    aiSummary: true,
    relevanceScore: 0.95,
    currentMonthNotice: '2026-06',
    forecastTargetMonth: '2026-07',
    title: 'OPEC+ 증산 효과는 제한적',
    aiBrief: 'OPEC+ 일부 산유국의 증산은 유가 안정 요인이지만, 호르무즈 해협 리스크와 물류 차질을 완전히 상쇄하기에는 제한적입니다.',
    summary: 'OPEC+ 일부 산유국의 증산은 국제유가 안정에 도움을 줄 수 있는 요인입니다.\n\n다만 호르무즈 해협 통행 제한, 보험료 상승, 우회 운항 가능성처럼 물류 차질이 남아 있으면 증산 효과가 항공유 가격 안정으로 곧바로 이어지기는 어렵습니다. 따라서 2026년 7월 유류할증료 전망에서는 OPEC+ 증산을 하락 요인으로 보되, 지정학 리스크를 완전히 상쇄하는 재료로 단정하지 않는 편이 안전합니다.',
    impact: '유류할증료 영향: 중립. 7월 전망 영향: 유가 안정 요인이지만 상승 압력을 제한하는 정도로 해석합니다.',
    sourceName: 'OPEC+ 증산과 항공유 가격 영향 분석',
    sourceUrl: 'forecast.html',
    tags: ['NEW','OPEC+ 증산','국제유가 전망','항공유 가격','유류할증료 인하 가능성'],
    faq: [
      { q:'OPEC+ 증산이면 유류할증료가 바로 내려가나요?', a:'그렇게 단정하기 어렵습니다. 증산은 유가 안정 요인이지만 호르무즈 해협 리스크, 운송 차질, 환율 상승이 남아 있으면 항공유 가격과 유류할증료 인하 효과가 제한될 수 있습니다.' }
    ],
    links: [
      { href:'forecast.html', label:'7월 시장 변수 자세히 보기' }
    ],
    i18n: {
      en: {
        title:'OPEC+ production increase has limited offsetting power',
        aiBrief:'OPEC+ production increases can help stabilize oil prices, but may not fully offset Hormuz risk and logistics disruption.',
        summary:'OPEC+ supply increases are a stabilizing factor, but shipping constraints and geopolitical risk can limit the pass-through to jet fuel prices and airfare fuel surcharge relief.',
        impact:'Fuel surcharge impact: neutral. July outlook impact: stabilizing factor, but not enough to confirm cuts.'
      }
    }
  },
  {
    id: 'news-20260602-usdkrw-airfare',
    slug: 'june-2-usdkrw-airfare-fuel-surcharge',
    category: 'market',
    priority: 1,
    date: '2026-06-02',
    updatedAt: '2026.06.02 08:30 KST 업데이트',
    badge: 'NEW',
    aiSummary: true,
    relevanceScore: 1,
    currentMonthNotice: '2026-06',
    forecastTargetMonth: '2026-07',
    title: '달러 강세·원화 약세가 유류할증료에 미치는 영향',
    aiBrief: '중동 리스크가 커지면 안전자산 선호로 달러 강세와 원화 약세 압력이 발생할 수 있습니다. 원/달러 환율 상승은 항공사의 달러 결제 연료비 부담을 키웁니다.',
    summary: '항공권 유류할증료는 국제유가만으로 결정되지 않습니다. 항공유 가격과 함께 원달러 환율도 중요합니다.\n\n중동 리스크가 확대되면 안전자산 선호가 강해지고 달러 강세, 원화 약세 압력이 나타날 수 있습니다. 이 경우 항공사의 달러 결제 연료비 부담이 커져 2026년 7월 국제선 유류할증료 인하 가능성은 낮아지고, 상승 또는 고점 유지 가능성은 커질 수 있습니다.',
    impact: '유류할증료 영향: 상승. 7월 전망 영향: 원/달러 환율 상승 시 항공권 가격 전망에 부담입니다.',
    sourceName: '원달러 환율과 항공권 유류할증료 영향',
    sourceUrl: 'fuel-surcharge-calculator.html',
    tags: ['NEW','원달러 환율','항공권 가격 전망','국제선 유류할증료','환율 상승'],
    faq: [
      { q:'환율 상승은 항공권 가격에 어떤 영향을 주나요?', a:'원/달러 환율이 오르면 항공사의 달러 결제 연료비와 해외 관련 비용 부담이 커질 수 있습니다. 이 부담은 유류할증료 인하 여력을 줄이거나 항공권 총액 부담을 높이는 요인이 될 수 있습니다.' }
    ],
    links: [
      { href:'fuel-surcharge-calculator.html', label:'노선별 유류할증료 계산기 보기' },
      { href:'index.html', label:'한국 출발 노선별 조회' }
    ],
    i18n: {
      en: {
        title:'Dollar strength and won weakness affect fuel surcharges',
        aiBrief:'Middle East risk can support safe-haven dollar strength and won weakness. Higher USD/KRW can raise airline dollar-denominated fuel costs.',
        summary:'Airfare fuel surcharges are not driven by oil alone. USD/KRW matters because a weaker won can raise local-currency fuel-cost pressure for airlines.',
        impact:'Fuel surcharge impact: upward. July outlook impact: higher USD/KRW can pressure airfare prices.'
      }
    }
  },
  {
    id: 'news-20260602-july-outlook',
    slug: 'june-2-july-2026-fuel-surcharge-outlook',
    category: 'forecast',
    priority: 1,
    date: '2026-06-02',
    updatedAt: '2026.06.02 08:30 KST 업데이트',
    badge: 'NEW',
    aiSummary: true,
    relevanceScore: 1,
    currentMonthNotice: '2026-06',
    forecastTargetMonth: '2026-07',
    title: '2026년 7월 유류할증료 전망',
    aiBrief: '현재 기준 2026년 7월 유류할증료는 6월 대비 상승 또는 고점 유지 가능성이 우세합니다. 단, 호르무즈 정상화, 국제유가 조정, 원화 반등이 확인되면 상승폭은 제한될 수 있습니다.',
    summary: '2026년 7월 유류할증료는 아직 확정 공시가 아닙니다. 현재 사이트에서는 2026년 6월 항공사 공식 공시를 확정 데이터로 유지하고, 7월은 시장 변수 기반 전망으로 분리합니다.\n\n2026.06.02 08:30 KST 기준으로는 국제유가와 항공유 가격 상승 압력, 원달러 환율 변동성, 호르무즈 해협 리스크 때문에 6월 대비 상승 또는 고점 유지 가능성이 우세합니다. 다만 호르무즈 해협 정상화, 국제유가 조정, 원화 반등이 동시에 나타나면 상승폭은 제한될 수 있습니다.',
    impact: '유류할증료 영향: 상승. 7월 전망 영향: 상승 또는 고점 유지 가능성 우세, 단 안정 변수 확인 시 제한적 조정 가능.',
    sourceName: '2026년 7월 유류할증료 전망 요약',
    sourceUrl: 'forecast.html',
    tags: ['NEW','2026년 7월 유류할증료 전망','대한항공 유류할증료','아시아나 유류할증료','항공권 유류할증료'],
    faq: [
      { q:'2026년 7월 유류할증료는 오를 가능성이 있나요?', a:'현재 기준으로는 상승 또는 고점 유지 가능성이 우세합니다. 다만 7월 공식 공시는 아직 나오지 않았고, 호르무즈 해협 정상화와 원화 반등이 확인되면 상승폭은 제한될 수 있습니다.' }
    ],
    links: [
      { href:'forecast.html', label:'7월 전망 상세 보기' },
      { href:'airlines.html', label:'항공사별 유류할증료 보기' }
    ],
    i18n: {
      en: {
        title:'July 2026 fuel surcharge outlook',
        aiBrief:'As of now, July 2026 fuel surcharges lean toward higher or still-elevated levels versus June. Normalization in Hormuz, lower oil and a stronger won could limit the upside.',
        summary:'July 2026 fuel surcharges are not confirmed filings yet. As of 2026.06.02 08:30 KST, oil, jet fuel, USD/KRW and Strait of Hormuz risk support a higher or elevated outlook.',
        impact:'Fuel surcharge impact: upward. July outlook impact: higher or elevated levels are more likely, with upside limited if stabilizing variables improve.'
      }
    }
  }
];

window.AERO_NEWS_LATEST = window.AERO_MARKET_BRIEF_20260602;

/* 2026.06.03 KST latest market brief and news cards.
   June 2026 notice remains the confirmed baseline; July 2026 remains forecast-only. */
window.AERO_MARKET_BRIEF_20260603 = {
  id: 'market-brief-20260603',
  timestamp: '2026-06-03T09:00:00+09:00',
  displayTime: '2026.06.03 KST',
  badge: 'LATEST',
  currentMonthNotice: '2026-06',
  forecastTargetMonth: '2026-07',
  summary: '2026.06.03 KST 기준 미국-이란 협상 교착과 호르무즈 해협 물동량 감소, 전쟁위험 보험료 상승이 항공유 가격과 국제선 유류할증료에 다시 상승 압력으로 작용하고 있습니다. Brent는 약 $96~97/bbl, WTI는 약 $95/bbl, USD/KRW는 1,517.80원 수준입니다. 다만 OPEC+ 증산 유지가 급격한 인상 가능성을 일부 제한해 현재 2026년 7월 유류할증료 전망은 동결 55%, 1단계 인상 35%, 2단계 이상 인상 10%로 정리합니다.',
  keywords: ['2026년 7월 유류할증료 전망','유류할증료','항공권 유류할증료','국제유가','브렌트유','WTI','환율 전망','원달러 환율','항공유 가격','호르무즈 해협','대한항공 유류할증료','아시아나 유류할증료','제주항공 유류할증료'],
  cards: [
    { title:'미국-이란 갈등 재점화', point:'협상 교착과 군사 긴장 재상승', decision:'중동 긴장이 다시 높아지며 국제유가와 항공유 가격 상승 압력이 커지고 있습니다.' },
    { title:'브렌트유 97달러 근접', point:'Brent 약 $96~97/bbl, WTI 약 $95/bbl', decision:'유류할증료 산정에 영향을 주는 국제유가가 다시 높은 구간으로 올라왔습니다.' },
    { title:'호르무즈 해협 통항 감소', point:'평시 대비 선박 통항량 급감', decision:'원유 수송 차질 우려가 확대되면 항공유 가격 상승 가능성이 커집니다.' },
    { title:'전쟁위험 보험료 급등', point:'유조선 보험료와 운송 비용 상승', decision:'원유 공급 비용 증가가 항공사 연료비 부담으로 이어질 수 있습니다.' },
    { title:'7월 유류할증료 전망', point:'동결 55% · 1단계 인상 35% · 2단계 이상 10%', decision:'현재 기준 동결 가능성이 높지만 일부 항공사의 인상 가능성도 존재합니다.' }
  ]
};

window.AERO_NEWS_CARDS_20260603 = [
  {
    id: 'news-20260603-us-iran-tension',
    slug: 'june-3-us-iran-tension-fuel-surcharge',
    category: 'market',
    priority: 1,
    date: '2026-06-03',
    updatedAt: '2026.06.03 KST 업데이트',
    badge: 'NEW',
    aiSummary: true,
    relevanceScore: 1,
    currentMonthNotice: '2026-06',
    forecastTargetMonth: '2026-07',
    title: '미국-이란 갈등 재점화',
    aiBrief: '미국-이란 협상 교착과 중동 군사적 긴장 재상승으로 국제유가와 항공유 가격의 상승 압력이 다시 커지고 있습니다.',
    summary: '중동 긴장이 다시 높아지며 국제유가가 상승 압력을 받고 있습니다.\n\n2026년 7월 유류할증료 전망에서는 미국-이란 갈등 재확대가 핵심 변수입니다. 국제유가가 오르면 항공유 가격과 항공사 연료비 부담이 커지고, 이는 대한항공 유류할증료, 아시아나 유류할증료, 제주항공 유류할증료 등 국제선 항공권 유류할증료의 상승 압력으로 이어질 수 있습니다.',
    impact: '유류할증료 영향: 상승. 7월 전망 영향: 동결 우세 속 일부 항공사 1단계 인상 가능성을 높이는 요인입니다.',
    sourceName: '2026년 7월 유류할증료 전망 업데이트',
    sourceUrl: 'forecast.html',
    tags: ['NEW','미국-이란 갈등','국제유가','유류할증료','항공권 유류할증료'],
    faq: [
      { q:'유류할증료는 왜 오르나요?', a:'국제유가와 항공유 가격 상승이 주요 원인입니다. 중동 긴장이 높아지면 항공유 가격과 항공사 연료비 부담이 커져 유류할증료 상승 압력으로 이어질 수 있습니다.' }
    ],
    links: [
      { href:'forecast.html', label:'2026년 7월 유류할증료 전망 보기' },
      { href:'airlines.html', label:'항공사별 유류할증료 보기' }
    ],
    i18n: {
      en: {
        title:'U.S.-Iran tensions flare again',
        aiBrief:'Stalled U.S.-Iran talks and renewed Middle East military tension are increasing upward pressure on oil and jet fuel prices.',
        summary:'Renewed U.S.-Iran tension is a key variable for the July 2026 fuel surcharge outlook. Higher oil can raise jet fuel prices and airline fuel-cost pressure.',
        impact:'Fuel surcharge impact: upward. July outlook impact: raises the chance of a one-step increase for some airlines.'
      }
    }
  },
  {
    id: 'news-20260603-brent-wti',
    slug: 'june-3-brent-wti-oil-price',
    category: 'market',
    priority: 1,
    date: '2026-06-03',
    updatedAt: '2026.06.03 KST 업데이트',
    badge: 'NEW',
    aiSummary: true,
    relevanceScore: 1,
    currentMonthNotice: '2026-06',
    forecastTargetMonth: '2026-07',
    title: '브렌트유 97달러 근접',
    aiBrief: 'Brent는 약 $96~97/bbl, WTI는 약 $95/bbl 수준입니다. 유류할증료 산정에 영향을 주는 국제유가가 다시 높은 구간에 머물고 있습니다.',
    summary: '유류할증료 산정에 영향을 주는 국제유가가 다시 상승 중입니다.\n\n공개 시장 지표 기준 Brent는 약 $96~97/bbl, WTI는 약 $95/bbl 수준입니다. 국제유가가 높은 구간에 머물면 항공유 가격도 쉽게 내려가기 어렵고, 2026년 7월 국제선 유류할증료 전망은 동결 가능성 우세 속 일부 인상 가능성을 함께 봐야 합니다.',
    impact: '유류할증료 영향: 상승. 7월 전망 영향: 동결 가능성은 유지되지만 인하 가능성은 낮추는 요인입니다.',
    sourceName: 'Brent·WTI 국제유가 점검',
    sourceUrl: 'forecast.html',
    tags: ['NEW','브렌트유','WTI','국제유가','항공유 가격','2026년 7월 유류할증료'],
    faq: [
      { q:'국제유가가 오르면 유류할증료도 바로 오르나요?', a:'즉시 오르는 것은 아니지만, 항공유 가격 평균과 항공사 공시 시차를 거쳐 유류할증료 산정에 영향을 줄 수 있습니다.' }
    ],
    links: [
      { href:'fuel-surcharge-graph.html', label:'월별 유류할증료 그래프 보기' }
    ],
    i18n: {
      en: {
        title:'Brent approaches the $97 range',
        aiBrief:'Brent is around $96-97/bbl and WTI is around $95/bbl, keeping oil in a high range for fuel surcharge calculations.',
        summary:'Oil prices are back in an elevated range. This lowers the chance of a July surcharge cut and keeps freeze or one-step increase scenarios relevant.',
        impact:'Fuel surcharge impact: upward. July outlook impact: reduces cut probability.'
      }
    }
  },
  {
    id: 'news-20260603-hormuz-traffic',
    slug: 'june-3-hormuz-traffic-decline',
    category: 'market',
    priority: 1,
    date: '2026-06-03',
    updatedAt: '2026.06.03 KST 업데이트',
    badge: 'NEW',
    aiSummary: true,
    relevanceScore: 1,
    currentMonthNotice: '2026-06',
    forecastTargetMonth: '2026-07',
    title: '호르무즈 해협 통항 감소',
    aiBrief: '평시 대비 선박 통항량이 급감하고 일부 유조선 및 LNG 운반선만 제한 운항하는 흐름입니다. 물류 불확실성이 항공유 가격 리스크로 이어질 수 있습니다.',
    summary: '호르무즈 해협의 원유 수송 차질 우려가 확대되고 있습니다.\n\n호르무즈 해협은 세계 원유 물동량의 상당 부분이 통과하는 핵심 통로입니다. 해협 리스크가 장기화되면 원유와 항공유 공급 불확실성이 커지고, 항공유 가격 상승 가능성이 높아져 항공권 유류할증료 전망에도 부담이 됩니다.',
    impact: '유류할증료 영향: 상승. 7월 전망 영향: 해협 상황 악화 시 추가 인상 가능성을 높입니다.',
    sourceName: '호르무즈 해협 물류 리스크 점검',
    sourceUrl: 'forecast.html',
    tags: ['NEW','호르무즈 해협','항공유 가격','국제유가','항공권 유류할증료'],
    faq: [
      { q:'호르무즈 해협이 중요한 이유는?', a:'세계 원유 물동량의 상당 부분이 통과하기 때문입니다. 통항이 줄거나 보험료가 오르면 원유와 항공유 공급 비용이 올라 유류할증료에 영향을 줄 수 있습니다.' }
    ],
    links: [
      { href:'forecast.html', label:'호르무즈 리스크 반영 전망 보기' }
    ],
    i18n: {
      en: {
        title:'Strait of Hormuz traffic remains constrained',
        aiBrief:'Traffic is sharply below normal, with only limited tanker and LNG carrier operations. Logistics uncertainty can lift jet fuel risk.',
        summary:'The Strait of Hormuz remains a critical variable for oil and jet fuel supply. Prolonged disruption can increase fuel surcharge pressure.',
        impact:'Fuel surcharge impact: upward. July outlook impact: deterioration can raise additional increase risk.'
      }
    }
  },
  {
    id: 'news-20260603-war-risk-insurance',
    slug: 'june-3-war-risk-insurance',
    category: 'market',
    priority: 1,
    date: '2026-06-03',
    updatedAt: '2026.06.03 KST 업데이트',
    badge: 'NEW',
    aiSummary: true,
    relevanceScore: 0.95,
    currentMonthNotice: '2026-06',
    forecastTargetMonth: '2026-07',
    title: '전쟁위험 보험료 급등',
    aiBrief: '유조선 전쟁위험 보험료 상승은 운송 비용과 원유 공급 비용을 키우며 항공유 가격 상승 압력으로 연결될 수 있습니다.',
    summary: '원유 운송 비용 증가로 항공유 가격 상승 압력이 커지고 있습니다.\n\n전쟁위험 보험료가 오르면 유조선 운항 비용이 상승하고, 이 비용은 원유 공급 비용과 항공유 가격에 반영될 수 있습니다. 항공사는 항공유 가격과 환율의 영향을 함께 받기 때문에 원달러 환율 상승까지 겹치면 연료비 부담이 더 커질 수 있습니다.',
    impact: '유류할증료 영향: 상승. 7월 전망 영향: 항공사 연료비 부담 증가 가능성입니다.',
    sourceName: '전쟁위험 보험료와 항공유 비용 영향',
    sourceUrl: 'forecast.html',
    tags: ['NEW','전쟁위험 보험료','항공유 가격','원달러 환율','항공사 연료비'],
    faq: [
      { q:'전쟁위험 보험료가 항공권 유류할증료와 관련이 있나요?', a:'직접 항공권 항목은 아니지만 원유 운송 비용과 항공유 가격을 밀어 올릴 수 있어 항공사 연료비 부담과 유류할증료 전망에 간접 영향을 줄 수 있습니다.' }
    ],
    links: [
      { href:'fuel-surcharge-calculator.html', label:'노선별 유류할증료 계산기 보기' }
    ],
    i18n: {
      en: {
        title:'War-risk insurance costs surge',
        aiBrief:'Higher war-risk insurance for tankers can raise shipping and oil supply costs, adding pressure to jet fuel prices.',
        summary:'Rising war-risk insurance can lift oil transport costs and feed into jet fuel price pressure, especially when USD/KRW is elevated.',
        impact:'Fuel surcharge impact: upward. July outlook impact: increases airline fuel-cost burden.'
      }
    }
  },
  {
    id: 'news-20260603-july-outlook-probability',
    slug: 'june-3-july-2026-fuel-surcharge-probability',
    category: 'forecast',
    priority: 1,
    date: '2026-06-03',
    updatedAt: '2026.06.03 KST 업데이트',
    badge: 'NEW',
    aiSummary: true,
    relevanceScore: 1,
    currentMonthNotice: '2026-06',
    forecastTargetMonth: '2026-07',
    title: '2026년 7월 유류할증료 전망',
    aiBrief: '현재 기준 동결 가능성이 높지만 일부 항공사의 1단계 인상 가능성도 존재합니다. 전망 확률은 동결 55%, 1단계 인상 35%, 2단계 이상 인상 10%입니다.',
    summary: '현재 기준 동결 가능성이 높지만 일부 항공사의 인상 가능성도 존재합니다.\n\n2026년 7월 유류할증료는 아직 공식 공시 전입니다. 현재 국제유가는 중동 긴장 고조와 호르무즈 해협 리스크 영향으로 상승 압력을 받고 있으나, OPEC+ 증산 유지가 일부 완충 역할을 하고 있습니다. 따라서 전망은 동결 55%, 1단계 인상 35%, 2단계 이상 인상 10%로 정리합니다.',
    impact: '유류할증료 영향: 중립~상승. 7월 전망 영향: 동결 우세, 일부 항공사 1단계 인상 가능성 존재.',
    sourceName: '2026년 7월 유류할증료 전망 확률',
    sourceUrl: 'forecast.html',
    tags: ['NEW','2026년 7월 유류할증료','대한항공 유류할증료','아시아나 유류할증료','제주항공 유류할증료'],
    faq: [
      { q:'2026년 7월 유류할증료는 오를까요?', a:'현재 기준으로 동결 가능성이 높지만 일부 인상 가능성도 존재합니다. 전망 확률은 동결 55%, 1단계 인상 35%, 2단계 이상 인상 10%입니다.' }
    ],
    links: [
      { href:'forecast.html', label:'7월 전망 상세 보기' },
      { href:'index.html', label:'한국 출발 유류할증료 조회' }
    ],
    i18n: {
      en: {
        title:'July 2026 fuel surcharge outlook',
        aiBrief:'Freeze remains the most likely scenario, but a one-step increase is possible for some airlines. Probability: freeze 55%, one-step increase 35%, two-step or more 10%.',
        summary:'July 2026 fuel surcharges are not official filings yet. OPEC+ production helps cap sharp increases, while Hormuz and oil-price risks keep one-step increase scenarios alive.',
        impact:'Fuel surcharge impact: neutral to upward. July outlook impact: freeze bias with one-step increase risk.'
      }
    }
  }
];

window.AERO_NEWS_LATEST = window.AERO_MARKET_BRIEF_20260603;

/* 2026.06.03 multilingual news-card cleanup.
   Every visible card field has per-language text so non-Korean pages do not mix
   Korean base fields with English fallback content. */
(function(){
  var tr = {
    'news-20260603-us-iran-tension': {
      en: {
        updatedAt:'Updated 2026.06.03 KST',
        title:'U.S.-Iran tensions flare again',
        aiBrief:'Stalled U.S.-Iran talks and renewed Middle East military tension are increasing upward pressure on oil and jet fuel prices.',
        summary:'Middle East tension is rising again, increasing pressure on oil prices. For the July 2026 fuel surcharge outlook, renewed U.S.-Iran conflict is a key variable because higher oil can lift jet fuel prices and airline fuel costs.',
        impact:'Fuel surcharge impact: upward. July outlook impact: raises the chance of a one-step increase for some airlines.',
        sourceName:'July 2026 fuel surcharge outlook update',
        tags:['NEW','U.S.-Iran tension','oil prices','fuel surcharge','airfare fuel surcharge'],
        faq:[{q:'Why do fuel surcharges rise?',a:'Oil and jet fuel price increases are the main causes. When Middle East tension rises, jet fuel and airline fuel-cost pressure can increase.'}],
        links:[{href:'forecast.html',label:'View July 2026 outlook'},{href:'airlines.html',label:'View airline fuel surcharges'}]
      },
      ja: {
        updatedAt:'2026.06.03 KST 更新',
        title:'米国・イラン対立が再燃',
        aiBrief:'米国・イラン協議の停滞と中東の軍事的緊張により、原油価格と航空燃料価格に上昇圧力がかかっています。',
        summary:'中東情勢の緊張が再び高まり、国際原油価格に上昇圧力が出ています。2026年7月の燃油サーチャージ見通しでは、米国・イラン対立の再燃が重要な変数です。',
        impact:'燃油サーチャージへの影響: 上昇要因。7月見通しへの影響: 一部航空会社で1段階引き上げの可能性を高める要因です。',
        sourceName:'2026年7月燃油サーチャージ見通し更新',
        tags:['NEW','米国・イラン','原油価格','燃油サーチャージ','航空券燃油サーチャージ'],
        faq:[{q:'燃油サーチャージはなぜ上がりますか？',a:'主な要因は国際原油価格と航空燃料価格の上昇です。中東情勢が悪化すると、航空会社の燃料費負担が増える可能性があります。'}],
        links:[{href:'forecast.html',label:'7月見通しを見る'},{href:'airlines.html',label:'航空会社別燃油サーチャージを見る'}]
      },
      zh: {
        updatedAt:'2026.06.03 KST 更新',
        title:'美国与伊朗紧张局势再度升温',
        aiBrief:'美国与伊朗谈判停滞，中东军事紧张再起，正在推高原油和航空燃油价格压力。',
        summary:'中东紧张局势再次升温，国际油价面临上行压力。在2026年7月燃油附加费展望中，美国与伊朗冲突再度升温是关键变量。',
        impact:'燃油附加费影响：上行。7月展望影响：提高部分航空公司上调一级的可能性。',
        sourceName:'2026年7月燃油附加费展望更新',
        tags:['NEW','美国伊朗紧张','国际油价','燃油附加费','机票燃油附加费'],
        faq:[{q:'燃油附加费为什么会上涨？',a:'主要原因是国际油价和航空燃油价格上涨。中东紧张局势升温时，航空公司燃油成本压力可能增加。'}],
        links:[{href:'forecast.html',label:'查看7月展望'},{href:'airlines.html',label:'查看航空公司燃油附加费'}]
      },
      fr: {
        updatedAt:'Mis à jour le 2026.06.03 KST',
        title:'Regain de tension entre les États-Unis et l’Iran',
        aiBrief:'Le blocage des discussions entre les États-Unis et l’Iran et le regain de tension militaire au Moyen-Orient renforcent la pression sur le pétrole et le kérosène.',
        summary:'La tension au Moyen-Orient augmente de nouveau et soutient les prix du pétrole. Pour les surtaxes carburant de juillet 2026, le risque États-Unis/Iran redevient une variable clé.',
        impact:'Impact sur la surtaxe carburant : haussier. Impact pour juillet : risque accru d’une hausse d’un palier chez certaines compagnies.',
        sourceName:'Mise à jour des perspectives de surtaxe carburant de juillet 2026',
        tags:['NEW','États-Unis Iran','prix du pétrole','surtaxe carburant','billet d’avion'],
        faq:[{q:'Pourquoi les surtaxes carburant augmentent-elles ?',a:'La hausse du pétrole et du kérosène est la cause principale. Une tension accrue au Moyen-Orient peut augmenter les coûts de carburant des compagnies.'}],
        links:[{href:'forecast.html',label:'Voir les perspectives de juillet'},{href:'airlines.html',label:'Voir les surtaxes par compagnie'}]
      },
      de: {
        updatedAt:'Aktualisiert am 2026.06.03 KST',
        title:'US-Iran-Konflikt flammt wieder auf',
        aiBrief:'Stockende Gespräche zwischen den USA und Iran sowie neue militärische Spannungen im Nahen Osten erhöhen den Druck auf Öl- und Kerosinpreise.',
        summary:'Die Spannungen im Nahen Osten nehmen wieder zu und stützen höhere Ölpreise. Für den Ausblick auf die Treibstoffzuschläge im Juli 2026 ist der US-Iran-Konflikt ein wichtiger Faktor.',
        impact:'Auswirkung auf den Treibstoffzuschlag: steigend. Auswirkung auf Juli: erhöht das Risiko einer Anhebung um eine Stufe bei einigen Airlines.',
        sourceName:'Update zum Ausblick auf Treibstoffzuschläge Juli 2026',
        tags:['NEW','USA Iran','Ölpreise','Treibstoffzuschlag','Flugticket-Zuschlag'],
        faq:[{q:'Warum steigen Treibstoffzuschläge?',a:'Hauptgründe sind steigende Öl- und Kerosinpreise. Höhere Spannungen im Nahen Osten können die Treibstoffkosten der Airlines erhöhen.'}],
        links:[{href:'forecast.html',label:'Juli-Ausblick ansehen'},{href:'airlines.html',label:'Zuschläge nach Airline ansehen'}]
      }
    },
    'news-20260603-brent-wti': {
      en: {
        updatedAt:'Updated 2026.06.03 KST',
        title:'Brent approaches the $97 range',
        aiBrief:'Brent is around $96-97/bbl and WTI is around $95/bbl, keeping oil in a high range for fuel surcharge calculations.',
        summary:'Oil prices are back in an elevated range. This lowers the chance of a July surcharge cut and keeps freeze or one-step increase scenarios relevant.',
        impact:'Fuel surcharge impact: upward. July outlook impact: reduces cut probability.',
        sourceName:'Brent and WTI oil price check',
        tags:['NEW','Brent','WTI','oil prices','jet fuel price','July 2026 fuel surcharge'],
        faq:[{q:'Do fuel surcharges rise immediately when oil prices rise?',a:'Not immediately. Airline surcharge filings usually reflect jet fuel averages and a filing lag.'}],
        links:[{href:'fuel-surcharge-graph.html',label:'View monthly fuel surcharge graph'}]
      },
      ja: {
        updatedAt:'2026.06.03 KST 更新',
        title:'ブレント原油が97ドル圏に接近',
        aiBrief:'ブレント原油は約96〜97ドル/bbl、WTIは約95ドル/bblで、燃油サーチャージ算定に影響する原油価格が高い水準にあります。',
        summary:'国際原油価格は再び高い水準に戻っています。7月の燃油サーチャージが下がる可能性は低下し、据え置きまたは1段階引き上げのシナリオを確認する必要があります。',
        impact:'燃油サーチャージへの影響: 上昇要因。7月見通しへの影響: 引き下げ可能性を抑える要因です。',
        sourceName:'ブレント・WTI原油価格チェック',
        tags:['NEW','ブレント原油','WTI','国際原油価格','航空燃料価格','2026年7月燃油サーチャージ'],
        faq:[{q:'原油価格が上がると燃油サーチャージもすぐ上がりますか？',a:'すぐに上がるとは限りません。航空燃料価格の平均と航空会社の公示時差を経て反映されます。'}],
        links:[{href:'fuel-surcharge-graph.html',label:'月別燃油サーチャージグラフを見る'}]
      },
      zh: {
        updatedAt:'2026.06.03 KST 更新',
        title:'布伦特原油接近97美元区间',
        aiBrief:'布伦特原油约为96至97美元/桶，WTI约为95美元/桶，油价仍处于影响燃油附加费测算的高位。',
        summary:'国际油价重新回到较高区间。这会降低7月燃油附加费下调的可能性，使维持不变或上调一级的情景仍需关注。',
        impact:'燃油附加费影响：上行。7月展望影响：降低下调概率。',
        sourceName:'布伦特与WTI油价检查',
        tags:['NEW','布伦特原油','WTI','国际油价','航空燃油价格','2026年7月燃油附加费'],
        faq:[{q:'油价上涨后燃油附加费会立即上涨吗？',a:'不一定会立即上涨。通常会经过航空燃油均价和航空公司公示时差后反映。'}],
        links:[{href:'fuel-surcharge-graph.html',label:'查看月度燃油附加费图表'}]
      },
      fr: {
        updatedAt:'Mis à jour le 2026.06.03 KST',
        title:'Le Brent se rapproche de 97 dollars',
        aiBrief:'Le Brent évolue autour de 96-97 dollars le baril et le WTI autour de 95 dollars, un niveau élevé pour le calcul des surtaxes carburant.',
        summary:'Les prix du pétrole sont revenus dans une zone élevée. Cela réduit la probabilité d’une baisse en juillet et maintient les scénarios de statu quo ou de hausse d’un palier.',
        impact:'Impact sur la surtaxe carburant : haussier. Impact pour juillet : baisse moins probable.',
        sourceName:'Point Brent et WTI',
        tags:['NEW','Brent','WTI','prix du pétrole','kérosène','surtaxe juillet 2026'],
        faq:[{q:'La surtaxe augmente-t-elle immédiatement quand le pétrole monte ?',a:'Pas immédiatement. Les compagnies reflètent généralement la moyenne du kérosène et un délai de publication.'}],
        links:[{href:'fuel-surcharge-graph.html',label:'Voir le graphique mensuel'}]
      },
      de: {
        updatedAt:'Aktualisiert am 2026.06.03 KST',
        title:'Brent nähert sich der Marke von 97 US-Dollar',
        aiBrief:'Brent liegt bei etwa 96-97 US-Dollar je Barrel und WTI bei etwa 95 US-Dollar. Öl bleibt damit für Zuschlagsberechnungen auf hohem Niveau.',
        summary:'Die Ölpreise befinden sich wieder in einem erhöhten Bereich. Das verringert die Wahrscheinlichkeit einer Senkung im Juli und hält Szenarien mit unveränderten oder leicht höheren Zuschlägen relevant.',
        impact:'Auswirkung auf den Treibstoffzuschlag: steigend. Auswirkung auf Juli: geringere Senkungswahrscheinlichkeit.',
        sourceName:'Brent- und WTI-Preischeck',
        tags:['NEW','Brent','WTI','Ölpreise','Kerosinpreis','Treibstoffzuschlag Juli 2026'],
        faq:[{q:'Steigen Treibstoffzuschläge sofort, wenn Ölpreise steigen?',a:'Nicht sofort. Meist wirken Kerosin-Durchschnittspreise und Veröffentlichungsfristen der Airlines zeitverzögert.'}],
        links:[{href:'fuel-surcharge-graph.html',label:'Monatsgrafik ansehen'}]
      }
    }
  };
  var common = {
    'news-20260603-hormuz-traffic': {
      en:['Strait of Hormuz traffic remains constrained','Traffic is sharply below normal, with only limited tanker and LNG carrier operations. Logistics uncertainty can lift jet fuel risk.','The Strait of Hormuz remains a critical variable for oil and jet fuel supply. Prolonged disruption can increase fuel surcharge pressure.','Fuel surcharge impact: upward. July outlook impact: deterioration can raise additional increase risk.','Strait of Hormuz logistics risk check',['NEW','Strait of Hormuz','jet fuel price','oil prices','airfare fuel surcharge'],'Why is the Strait of Hormuz important?','A significant share of global oil traffic passes through the strait. Lower traffic or higher insurance costs can raise oil and jet fuel supply costs.','View Hormuz risk outlook'],
      ja:['ホルムズ海峡の通航減少','平常時に比べ船舶通航量が大きく減少し、一部のタンカーとLNG船だけが限定的に運航しています。物流不確実性は航空燃料リスクを高めます。','ホルムズ海峡は原油と航空燃料供給の重要な変数です。混乱が長期化すると燃油サーチャージの上昇圧力が強まる可能性があります。','燃油サーチャージへの影響: 上昇要因。7月見通しへの影響: 状況悪化時に追加引き上げリスクが高まります。','ホルムズ海峡物流リスク点検',['NEW','ホルムズ海峡','航空燃料価格','国際原油価格','航空券燃油サーチャージ'],'ホルムズ海峡が重要な理由は？','世界の原油輸送の相当部分が通過するためです。通航減少や保険料上昇は原油・航空燃料供給コストを押し上げる可能性があります。','ホルムズリスク見通しを見る'],
      zh:['霍尔木兹海峡通行受限','船舶通行量较平时大幅减少，仅部分油轮和LNG运输船有限运行。物流不确定性可能推高航空燃油风险。','霍尔木兹海峡仍是原油和航空燃油供应的关键变量。若干扰持续，燃油附加费上行压力可能增加。','燃油附加费影响：上行。7月展望影响：若形势恶化，额外上调风险增加。','霍尔木兹海峡物流风险检查',['NEW','霍尔木兹海峡','航空燃油价格','国际油价','机票燃油附加费'],'霍尔木兹海峡为什么重要？','全球相当一部分原油运输经过该海峡。通行减少或保险费上升可能提高原油和航空燃油供应成本。','查看霍尔木兹风险展望'],
      fr:['Le trafic du détroit d’Ormuz reste contraint','Le trafic maritime est nettement inférieur à la normale, avec seulement certaines opérations limitées de pétroliers et méthaniers. Cette incertitude logistique peut accroître le risque sur le kérosène.','Le détroit d’Ormuz reste une variable critique pour l’offre de pétrole et de kérosène. Une perturbation prolongée peut augmenter la pression sur les surtaxes carburant.','Impact sur la surtaxe carburant : haussier. Impact pour juillet : une détérioration peut accroître le risque de hausse supplémentaire.','Point sur le risque logistique du détroit d’Ormuz',['NEW','détroit d’Ormuz','kérosène','prix du pétrole','surtaxe billet d’avion'],'Pourquoi le détroit d’Ormuz est-il important ?','Une part importante du trafic pétrolier mondial y transite. Une baisse du trafic ou une hausse des assurances peut augmenter les coûts du pétrole et du kérosène.','Voir le risque Ormuz'],
      de:['Verkehr in der Straße von Hormus bleibt eingeschränkt','Der Schiffsverkehr liegt deutlich unter dem Normalniveau; nur begrenzte Tanker- und LNG-Transporte laufen weiter. Diese Logistikunsicherheit kann das Kerosinrisiko erhöhen.','Die Straße von Hormus bleibt ein zentraler Faktor für Öl- und Kerosinversorgung. Anhaltende Störungen können den Druck auf Treibstoffzuschläge erhöhen.','Auswirkung auf den Treibstoffzuschlag: steigend. Auswirkung auf Juli: Verschlechterung kann Zusatzrisiko erhöhen.','Check des Logistikrisikos Straße von Hormus',['NEW','Straße von Hormus','Kerosinpreis','Ölpreise','Flugticket-Treibstoffzuschlag'],'Warum ist die Straße von Hormus wichtig?','Ein erheblicher Teil des weltweiten Ölverkehrs passiert diese Meerenge. Weniger Verkehr oder höhere Versicherungen können Öl- und Kerosinkosten erhöhen.','Hormus-Risiko ansehen']
    },
    'news-20260603-war-risk-insurance': {
      en:['War-risk insurance costs surge','Higher war-risk insurance for tankers can raise shipping and oil supply costs, adding pressure to jet fuel prices.','Rising war-risk insurance can lift oil transport costs and feed into jet fuel price pressure, especially when USD/KRW is elevated.','Fuel surcharge impact: upward. July outlook impact: increases airline fuel-cost burden.','War-risk insurance and jet fuel cost check',['NEW','war-risk insurance','jet fuel price','USD/KRW','airline fuel cost'],'How are war-risk insurance costs linked to airfare fuel surcharges?','They are not a direct ticket fee, but they can raise oil transport and jet fuel costs, indirectly affecting airline fuel-cost pressure.','View route fuel surcharge calculator'],
      ja:['戦争リスク保険料が急騰','タンカー向け戦争リスク保険料の上昇は輸送費と原油供給コストを押し上げ、航空燃料価格に上昇圧力を加える可能性があります。','戦争リスク保険料の上昇は原油輸送コストを高め、特にUSD/KRWが高い局面では航空燃料価格への圧力となります。','燃油サーチャージへの影響: 上昇要因。7月見通しへの影響: 航空会社の燃料費負担を増やす可能性があります。','戦争リスク保険料と航空燃料コスト点検',['NEW','戦争リスク保険料','航空燃料価格','USD/KRW','航空会社燃料費'],'戦争リスク保険料は航空券燃油サーチャージと関係がありますか？','直接の航空券手数料ではありませんが、原油輸送費と航空燃料コストを押し上げ、航空会社の燃料費負担に間接的に影響します。','路線別燃油サーチャージ計算機を見る'],
      zh:['战争风险保险费急升','油轮战争风险保险费上升可能提高运输和原油供应成本，并对航空燃油价格形成压力。','战争风险保险费上升会推高原油运输成本，尤其在美元兑韩元汇率较高时，会进一步增加航空燃油价格压力。','燃油附加费影响：上行。7月展望影响：增加航空公司燃油成本负担。','战争风险保险费与航空燃油成本检查',['NEW','战争风险保险费','航空燃油价格','USD/KRW','航空公司燃油成本'],'战争风险保险费与机票燃油附加费有关吗？','它不是直接的机票费用，但可能提高原油运输和航空燃油成本，间接影响航空公司燃油成本压力。','查看航线燃油附加费计算器'],
      fr:['Forte hausse des assurances risque de guerre','La hausse des assurances risque de guerre pour les pétroliers peut augmenter les coûts de transport et d’approvisionnement en pétrole, ajoutant une pression sur le kérosène.','La hausse des assurances peut renchérir le transport du pétrole et se transmettre au kérosène, surtout lorsque l’USD/KRW reste élevé.','Impact sur la surtaxe carburant : haussier. Impact pour juillet : hausse possible de la charge carburant des compagnies.','Assurance risque de guerre et coût du kérosène',['NEW','assurance risque de guerre','kérosène','USD/KRW','coût carburant compagnie'],'Quel lien avec la surtaxe carburant des billets ?', 'Ce n’est pas un frais direct du billet, mais cela peut augmenter les coûts de transport du pétrole et du kérosène, influençant indirectement les compagnies.','Voir le calculateur par route'],
      de:['Kriegsrisiko-Versicherungen steigen stark','Höhere Kriegsrisiko-Versicherungen für Tanker können Transport- und Ölversorgungskosten erhöhen und Druck auf Kerosinpreise ausüben.','Steigende Versicherungen können Öltransportkosten erhöhen und besonders bei hohem USD/KRW auf Kerosinkosten durchschlagen.','Auswirkung auf den Treibstoffzuschlag: steigend. Auswirkung auf Juli: höhere Treibstoffkostenbelastung der Airlines möglich.','Kriegsrisiko-Versicherung und Kerosinkosten',['NEW','Kriegsrisiko-Versicherung','Kerosinpreis','USD/KRW','Airline-Treibstoffkosten'],'Wie hängen Kriegsrisiko-Versicherungen mit Flugticket-Zuschlägen zusammen?', 'Sie sind keine direkte Ticketgebühr, können aber Öltransport- und Kerosinkosten erhöhen und damit Airlines indirekt belasten.','Routenrechner ansehen']
    },
    'news-20260603-july-outlook-probability': {
      en:['July 2026 fuel surcharge outlook','Freeze remains the most likely scenario, but a one-step increase is possible for some airlines. Probability: freeze 55%, one-step increase 35%, two-step or more 10%.','July 2026 fuel surcharges are not official filings yet. OPEC+ production helps cap sharp increases, while Hormuz and oil-price risks keep one-step increase scenarios alive.','Fuel surcharge impact: neutral to upward. July outlook impact: freeze bias with one-step increase risk.','July 2026 fuel surcharge probability',['NEW','July 2026 fuel surcharge','Korean Air fuel surcharge','Asiana fuel surcharge','Jeju Air fuel surcharge'],'Will July 2026 fuel surcharges rise?','Freeze is currently the most likely scenario, but some increase is possible. Probability: freeze 55%, one-step increase 35%, two-step or more 10%.','View detailed July outlook'],
      ja:['2026年7月燃油サーチャージ見通し','現時点では据え置きの可能性が最も高いものの、一部航空会社で1段階引き上げの可能性もあります。確率は据え置き55%、1段階引き上げ35%、2段階以上10%です。','2026年7月の燃油サーチャージはまだ公式公示前です。OPEC+の増産は急騰を抑える一方、ホルムズ海峡と原油価格リスクにより1段階引き上げの可能性は残ります。','燃油サーチャージへの影響: 中立〜上昇。7月見通しへの影響: 据え置き優勢、一部1段階引き上げリスクあり。','2026年7月燃油サーチャージ確率',['NEW','2026年7月燃油サーチャージ','大韓航空燃油サーチャージ','アシアナ燃油サーチャージ','チェジュ航空燃油サーチャージ'],'2026年7月の燃油サーチャージは上がりますか？','現時点では据え置きの可能性が最も高いですが、一部引き上げの可能性もあります。据え置き55%、1段階引き上げ35%、2段階以上10%です。','7月見通しの詳細を見る'],
      zh:['2026年7月燃油附加费展望','目前维持不变的可能性最高，但部分航空公司存在上调一级的可能。概率为维持55%、上调一级35%、上调两级以上10%。','2026年7月燃油附加费尚未正式公示。OPEC+增产有助于限制急涨，但霍尔木兹和油价风险仍使上调一级情景存在。','燃油附加费影响：中性至上行。7月展望影响：维持为主，同时存在上调一级风险。','2026年7月燃油附加费概率',['NEW','2026年7月燃油附加费','大韩航空燃油附加费','韩亚航空燃油附加费','济州航空燃油附加费'],'2026年7月燃油附加费会上涨吗？','目前维持不变的可能性最高，但也存在部分上调可能。概率为维持55%、上调一级35%、上调两级以上10%。','查看7月详细展望'],
      fr:['Perspectives de surtaxe carburant pour juillet 2026','Le statu quo reste le scénario le plus probable, mais une hausse d’un palier reste possible pour certaines compagnies. Probabilité : statu quo 55%, hausse d’un palier 35%, deux paliers ou plus 10%.','Les surtaxes carburant de juillet 2026 ne sont pas encore officielles. La production OPEC+ limite une forte hausse, mais les risques Ormuz et pétrole maintiennent le scénario d’une hausse d’un palier.','Impact sur la surtaxe carburant : neutre à haussier. Impact pour juillet : biais de statu quo avec risque de hausse d’un palier.','Probabilité de surtaxe carburant juillet 2026',['NEW','surtaxe juillet 2026','surtaxe Korean Air','surtaxe Asiana','surtaxe Jeju Air'],'Les surtaxes de juillet 2026 vont-elles augmenter ?', 'Le statu quo est le scénario le plus probable, mais une hausse reste possible. Probabilité : statu quo 55%, hausse d’un palier 35%, deux paliers ou plus 10%.','Voir le détail des perspectives de juillet'],
      de:['Ausblick auf Treibstoffzuschläge Juli 2026','Unveränderte Zuschläge bleiben am wahrscheinlichsten, aber bei einigen Airlines ist eine Anhebung um eine Stufe möglich. Wahrscheinlichkeit: unverändert 55%, eine Stufe 35%, zwei Stufen oder mehr 10%.','Die Zuschläge für Juli 2026 sind noch nicht offiziell. OPEC+ Produktion begrenzt starke Anstiege, während Hormus- und Ölpreisrisiken das Szenario einer Anhebung um eine Stufe offenhalten.','Auswirkung auf den Treibstoffzuschlag: neutral bis steigend. Auswirkung auf Juli: unverändert wahrscheinlicher, aber Risiko einer Stufe.','Wahrscheinlichkeit Juli 2026',['NEW','Treibstoffzuschlag Juli 2026','Korean Air Zuschlag','Asiana Zuschlag','Jeju Air Zuschlag'],'Werden die Treibstoffzuschläge im Juli 2026 steigen?', 'Unverändert ist derzeit am wahrscheinlichsten, aber Anhebungen sind möglich: 55% unverändert, 35% eine Stufe, 10% zwei Stufen oder mehr.','Detaillierten Juli-Ausblick ansehen']
    }
  };
  Object.keys(common).forEach(function(id){
    tr[id] = tr[id] || {};
    Object.keys(common[id]).forEach(function(lang){
      var a = common[id][lang];
      tr[id][lang] = {
        updatedAt: lang === 'en' ? 'Updated 2026.06.03 KST' : a[0].includes('2026') ? a[0] : undefined,
        title:a[0], aiBrief:a[1], summary:a[2], impact:a[3], sourceName:a[4], tags:a[5],
        faq:[{q:a[6], a:a[7]}], links:[{href:id === 'news-20260603-july-outlook-probability' ? 'forecast.html' : (id === 'news-20260603-war-risk-insurance' ? 'fuel-surcharge-calculator.html' : 'forecast.html'), label:a[8]}]
      };
      if (!tr[id][lang].updatedAt) {
        tr[id][lang].updatedAt = ({ja:'2026.06.03 KST 更新',zh:'2026.06.03 KST 更新',fr:'Mis à jour le 2026.06.03 KST',de:'Aktualisiert am 2026.06.03 KST'})[lang] || 'Updated 2026.06.03 KST';
      }
    });
  });
  (window.AERO_NEWS_CARDS_20260603 || []).forEach(function(card){
    var perCard = tr[card.id];
    if (!perCard) return;
    card.i18n = card.i18n || {};
    ['en','ja','zh','fr','de'].forEach(function(lang){
      if (perCard[lang]) card.i18n[lang] = Object.assign({}, card.i18n[lang] || {}, perCard[lang]);
    });
  });
})();

/* 2026.06.04 KST market brief and multilingual news cards.
   June filings remain confirmed data; July remains a market outlook. */
window.AERO_MARKET_BRIEF_20260604 = {
  id:'market-brief-20260604',
  timestamp:'2026-06-04T09:00:00+09:00',
  displayTime:'2026.06.04 09:00 KST',
  badge:'LATEST',
  currentMonthNotice:'2026-06',
  forecastTargetMonth:'2026-07',
  summary:'2026년 6월 4일 09:00 KST 기준, 호르무즈 해협 통항 불확실성과 미국·이란 협상 교착이 이어지며 국제유가와 MOPS 항공유 가격에 상승 압력이 지속되고 있습니다. Brent는 약 $97/bbl, WTI는 약 $96/bbl 수준입니다. 7월 유류할증료 전망은 동결 우세에서 동결과 소폭 인상 경합으로 이동했습니다.',
  keywords:['유류할증료','항공권 유류할증료','2026년 7월 유류할증료','국제유가','브렌트유','WTI','MOPS','항공유 가격','원달러 환율','환율 전망','호르무즈 해협','대한항공 유류할증료','아시아나 유류할증료','제주항공 유류할증료','티웨이 유류할증료','에어서울 유류할증료'],
  cards:[
    {title:'호르무즈 해협 리스크 지속',point:'원유 수송 불확실성 유지',decision:'국제유가와 항공유 가격에 상승 압력이 이어지고 있습니다.'},
    {title:'브렌트유·WTI 고점 부담',point:'Brent 약 $97 · WTI 약 $96',decision:'7월 유류할증료 인상 가능성이 이전보다 커졌습니다.'},
    {title:'MOPS 항공유 가격 주목',point:'유류할증료 산정의 직접 기준',decision:'6월 평균 MOPS가 강세를 유지하면 7월 하락 가능성은 제한적입니다.'},
    {title:'환율도 변수',point:'달러 강세·원화 약세 가능성',decision:'MOPS와 원달러 환율이 함께 오르면 인상 압력이 커질 수 있습니다.'},
    {title:'7월 전망은?',point:'동결 50~55% · 1단계 인상 35~40%',decision:'동결 우세에서 동결과 소폭 인상 경합으로 이동했습니다.'}
  ]
};

(function(){
  var date = '2026-06-04';
  var updated = {
    ko:'2026.06.04 09:00 KST 업데이트', en:'Updated 2026.06.04 09:00 KST',
    ja:'2026.06.04 09:00 KST 更新', zh:'2026.06.04 09:00 KST 更新',
    fr:'Mis à jour le 2026.06.04 09:00 KST', de:'Aktualisiert am 2026.06.04 09:00 KST'
  };
  var faq = {
    ko:[
      {q:'MOPS가 유류할증료에 중요한 이유는?',a:'MOPS는 싱가포르 항공유 시장 가격 지표로, 국내 항공사 유류할증료 산정에 직접적인 영향을 주는 핵심 기준입니다.'},
      {q:'호르무즈 해협 리스크가 유류할증료에 영향을 주나요?',a:'네. 주요 원유 수송로의 통항 불안은 국제유가와 항공유 가격 상승으로 이어질 수 있습니다.'},
      {q:'2026년 7월 유류할증료는 오를 가능성이 있나요?',a:'현재는 동결 가능성이 가장 높지만, 국제유가와 MOPS가 강세를 유지하면 일부 항공사에서 1단계 인상이 나타날 수 있습니다.'}
    ],
    en:[
      {q:'Why is MOPS important for fuel surcharges?',a:'MOPS is a Singapore jet fuel market benchmark and is a key direct input for Korean airline fuel surcharge calculations.'},
      {q:'Does Strait of Hormuz risk affect fuel surcharges?',a:'Yes. Disruption on a major oil route can raise oil and jet fuel prices.'},
      {q:'Could July 2026 fuel surcharges rise?',a:'Freeze remains most likely, but some airlines may raise one step if oil and MOPS stay strong.'}
    ],
    ja:[
      {q:'MOPSが燃油サーチャージに重要な理由は？',a:'MOPSはシンガポール航空燃料市場の価格指標で、韓国航空会社の燃油サーチャージ算定に直接影響する重要基準です。'},
      {q:'ホルムズ海峡リスクは燃油サーチャージに影響しますか？',a:'はい。主要原油輸送路の不安定化は原油価格と航空燃料価格の上昇につながる可能性があります。'},
      {q:'2026年7月の燃油サーチャージは上がる可能性がありますか？',a:'据え置きが最も有力ですが、原油価格とMOPSが強い場合は一部航空会社で1段階引き上げの可能性があります。'}
    ],
    zh:[
      {q:'MOPS为什么对燃油附加费重要？',a:'MOPS是新加坡航空燃油市场价格指标，是韩国航空公司计算燃油附加费的重要直接基准。'},
      {q:'霍尔木兹海峡风险会影响燃油附加费吗？',a:'会。主要原油运输通道的不稳定可能推高国际油价和航空燃油价格。'},
      {q:'2026年7月燃油附加费可能上涨吗？',a:'维持不变仍最有可能，但若国际油价和MOPS保持强势，部分航空公司可能上调一级。'}
    ],
    fr:[
      {q:'Pourquoi MOPS est-il important pour les surtaxes carburant ?',a:'MOPS est un indicateur du marché du kérosène à Singapour et un critère direct important pour le calcul des compagnies coréennes.'},
      {q:'Le risque dans le détroit d’Ormuz influence-t-il les surtaxes ?',a:'Oui. Une perturbation d’une grande route pétrolière peut augmenter le pétrole et le kérosène.'},
      {q:'Les surtaxes de juillet 2026 peuvent-elles augmenter ?',a:'Le statu quo reste le plus probable, mais certaines compagnies peuvent augmenter d’un palier si le pétrole et MOPS restent élevés.'}
    ],
    de:[
      {q:'Warum ist MOPS für Treibstoffzuschläge wichtig?',a:'MOPS ist ein Marktindikator für Kerosin in Singapur und ein wichtiger direkter Maßstab für koreanische Airlines.'},
      {q:'Beeinflusst das Risiko in der Straße von Hormus die Zuschläge?',a:'Ja. Störungen einer wichtigen Ölroute können Öl- und Kerosinpreise erhöhen.'},
      {q:'Können die Zuschläge im Juli 2026 steigen?',a:'Unverändert bleibt am wahrscheinlichsten, aber einige Airlines könnten um eine Stufe erhöhen, wenn Öl und MOPS stark bleiben.'}
    ]
  };
  var text = {
    ko:[
      ['호르무즈 해협 리스크 지속','중동 긴장과 원유 수송 불확실성이 국제유가에 상승 압력으로 작용하고 있습니다.','미국·이란 갈등과 협상 교착이 이어지면서 호르무즈 해협의 통항 불확실성이 유지되고 있습니다. 지정학적 리스크 프리미엄은 국제유가와 항공유 가격에 반영되고 있습니다.','상승. 7월 전망은 해협 정상화 속도에 민감합니다.'],
      ['브렌트유·WTI 고점 부담','브렌트유 약 97달러, WTI 약 96달러 수준의 높은 국제유가가 7월 유류할증료 인상 압력을 키우고 있습니다.','중동 긴장, 원유재고 감소, 여름 성수기 수요가 국제유가 상승 요인입니다. 국제유가가 100달러에 가까워지면서 항공유 가격과 항공사 연료비 부담도 커질 수 있습니다.','상승. 동결과 소폭 인상 경합을 강화합니다.'],
      ['MOPS 항공유 가격 주목','유류할증료 산정에는 국제유가보다 MOPS 항공유 가격 흐름이 더 직접적으로 반영됩니다.','국제유가 상승과 중동 리스크는 MOPS 항공유 가격에도 상승 압력으로 작용합니다. 6월 평균 MOPS가 5월보다 높거나 비슷하면 7월 유류할증료 하락 가능성은 제한적입니다.','상승. MOPS 강세는 동결 또는 일부 인상 근거가 될 수 있습니다.'],
      ['환율도 변수','유가 상승과 중동 리스크는 달러 강세와 원화 약세 압력으로 이어질 수 있습니다.','유류할증료는 항공유 가격과 환율을 함께 반영합니다. MOPS 상승과 원달러 환율 상승이 동시에 나타나면 항공사의 유류비 부담과 인상 압력이 커질 수 있습니다.','상승. 원달러 환율 강세는 원화 기준 연료비 부담을 높입니다.'],
      ['2026년 7월 유류할증료, 동결 우세 속 인상 압력 확대','현재는 동결 가능성이 가장 높지만 일부 항공사의 1단계 인상 가능성이 전일보다 커졌습니다.','2026년 6월 4일 09:00 KST 기준 7월 유류할증료 전망은 동결 50~55%, 1단계 인상 35~40%, 2단계 이상 인상 10% 이하입니다. 기존 동결 우세 전망에서 동결과 소폭 인상 경합으로 상승 압력이 다소 커졌습니다.','중립~상승. 7월은 아직 공식 공시 전입니다.']
    ],
    en:[
      ['Strait of Hormuz risk persists','Middle East tension and oil-shipping uncertainty continue to pressure oil prices higher.','Stalled U.S.-Iran talks keep Strait of Hormuz traffic uncertainty unresolved. A geopolitical risk premium remains embedded in oil and jet fuel prices.','Upward. The July outlook remains sensitive to the pace of normalization.'],
      ['Brent and WTI remain elevated','Brent near $97 and WTI near $96 increase July fuel surcharge pressure.','Middle East tension, lower inventories and summer demand support oil prices near $100, increasing jet fuel and airline fuel-cost pressure.','Upward. Strengthens competition between freeze and a small increase.'],
      ['Watch MOPS jet fuel prices','MOPS jet fuel trends are more directly relevant to surcharge calculations than crude oil alone.','Higher oil and Middle East risk can lift MOPS. If the June average stays at or above May, the chance of a July cut is limited.','Upward. Strong MOPS supports freeze or some increases.'],
      ['FX is also a variable','Higher oil and Middle East risk can support dollar strength and won weakness.','Fuel surcharges reflect both jet fuel and FX. If MOPS and USD/KRW rise together, airline fuel-cost and surcharge pressure can increase.','Upward. Strong USD/KRW raises KRW-based fuel costs.'],
      ['July 2026 fuel surcharge: increase pressure grows despite freeze bias','Freeze remains most likely, but the chance of a one-step increase for some airlines has grown since yesterday.','As of 2026.06.04 09:00 KST, the July outlook is freeze 50-55%, one-step increase 35-40%, and two steps or more at 10% or less. The outlook has shifted from freeze bias toward competition between freeze and a small increase.','Neutral to upward. July is not an official filing yet.']
    ],
    ja:[
      ['ホルムズ海峡リスクが継続','中東情勢と原油輸送の不確実性が国際原油価格に上昇圧力をかけています。','米国・イラン協議の停滞により、ホルムズ海峡の通航不確実性が続いています。地政学リスクプレミアムは原油と航空燃料価格に反映されています。','上昇要因。7月見通しは正常化の速度に左右されます。'],
      ['ブレント・WTIの高値負担','ブレント約97ドル、WTI約96ドルの高い原油価格が7月燃油サーチャージの引き上げ圧力を高めています。','中東情勢、在庫減少、夏季需要が原油価格を支え、航空燃料と航空会社の燃料費負担を高める可能性があります。','上昇要因。据え置きと小幅引き上げの競合を強めます。'],
      ['MOPS航空燃料価格に注目','燃油サーチャージ算定では原油価格よりMOPS航空燃料価格の動きがより直接的です。','原油価格上昇と中東リスクはMOPSにも上昇圧力をかけます。6月平均が5月以上なら7月引き下げの可能性は限定的です。','上昇要因。MOPSの強さは据え置きまたは一部引き上げの根拠になります。'],
      ['為替も変数','原油上昇と中東リスクはドル高・ウォン安圧力につながる可能性があります。','燃油サーチャージは航空燃料価格と為替を共に反映します。MOPSとUSD/KRWが同時に上がると引き上げ圧力が高まります。','上昇要因。USD/KRW上昇はウォン建て燃料費を高めます。'],
      ['2026年7月燃油サーチャージ、据え置き優勢も上昇圧力拡大','据え置きが最も有力ですが、一部航空会社の1段階引き上げ可能性が前日より高まりました。','2026.06.04 09:00 KST時点の見通しは据え置き50〜55%、1段階引き上げ35〜40%、2段階以上10%以下です。据え置き優勢から据え置きと小幅引き上げの競合へ移動しています。','中立〜上昇。7月はまだ公式公示前です。']
    ],
    zh:[
      ['霍尔木兹海峡风险持续','中东紧张和原油运输不确定性继续对国际油价形成上行压力。','美国与伊朗谈判停滞，霍尔木兹海峡通行不确定性仍未消除，地缘风险溢价继续反映在油价和航空燃油价格中。','上行。7月展望对正常化速度较为敏感。'],
      ['布伦特与WTI高位压力','布伦特约97美元、WTI约96美元的高油价正在增加7月燃油附加费上调压力。','中东紧张、库存下降和夏季需求支撑油价接近100美元，并可能增加航空燃油和航空公司燃油成本。','上行。增强维持不变与小幅上调之间的竞争。'],
      ['关注MOPS航空燃油价格','燃油附加费测算中，MOPS航空燃油价格比单纯国际油价更直接。','油价上涨和中东风险会推高MOPS。若6月平均值与5月相当或更高，7月下调可能性有限。','上行。MOPS强势支持维持或部分上调。'],
      ['汇率也是变量','油价上涨和中东风险可能带来美元走强与韩元走弱压力。','燃油附加费同时反映航空燃油价格与汇率。MOPS和USD/KRW同时上涨时，上调压力可能增加。','上行。USD/KRW走高增加韩元计价燃油成本。'],
      ['2026年7月燃油附加费：维持占优但上调压力扩大','维持不变仍最有可能，但部分航空公司上调一级的可能性较前一日提高。','截至2026.06.04 09:00 KST，7月展望为维持50至55%、上调一级35至40%、上调两级以上不超过10%。展望已从维持占优转向维持与小幅上调竞争。','中性至上行。7月尚未正式公示。']
    ]
  };
  text.fr = [
    ['Le risque dans le détroit d’Ormuz persiste','Les tensions au Moyen-Orient et l’incertitude du transport pétrolier maintiennent une pression haussière sur le pétrole.','Le blocage des discussions États-Unis/Iran maintient l’incertitude dans le détroit d’Ormuz. La prime de risque géopolitique reste intégrée aux prix du pétrole et du kérosène.','Haussier. Les perspectives de juillet restent sensibles au rythme de normalisation.'],
    ['Brent et WTI restent élevés','Le Brent autour de 97 dollars et le WTI autour de 96 dollars renforcent la pression sur les surtaxes de juillet.','Les tensions au Moyen-Orient, la baisse des stocks et la demande estivale soutiennent le pétrole et peuvent augmenter le kérosène et les coûts des compagnies.','Haussier. Renforce la concurrence entre statu quo et petite hausse.'],
    ['Surveiller le prix MOPS du kérosène','MOPS est plus directement pertinent pour le calcul des surtaxes que le pétrole brut seul.','La hausse du pétrole et le risque au Moyen-Orient peuvent soutenir MOPS. Si la moyenne de juin reste au niveau de mai ou au-dessus, une baisse en juillet est moins probable.','Haussier. Un MOPS fort soutient le statu quo ou certaines hausses.'],
    ['Le taux de change reste une variable','La hausse du pétrole et le risque au Moyen-Orient peuvent soutenir le dollar et affaiblir le won.','Les surtaxes reflètent le kérosène et le taux de change. Une hausse simultanée de MOPS et USD/KRW peut augmenter la pression.','Haussier. Un USD/KRW élevé augmente les coûts en KRW.'],
    ['Surtaxe juillet 2026 : pression haussière accrue malgré le statu quo','Le statu quo reste le plus probable, mais la possibilité d’une hausse d’un palier a augmenté depuis hier.','Au 2026.06.04 09:00 KST, les probabilités sont : statu quo 50-55%, hausse d’un palier 35-40%, deux paliers ou plus 10% ou moins.','Neutre à haussier. Juillet n’est pas encore officiel.']
  ];
  text.de = [
    ['Risiko in der Straße von Hormus bleibt bestehen','Nahost-Spannungen und Unsicherheit beim Öltransport halten den Aufwärtsdruck auf Ölpreise aufrecht.','Stockende Gespräche zwischen den USA und Iran lassen die Unsicherheit in der Straße von Hormus bestehen. Die geopolitische Risikoprämie bleibt in Öl- und Kerosinpreisen enthalten.','Steigend. Der Juli-Ausblick bleibt vom Normalisierungstempo abhängig.'],
    ['Brent und WTI bleiben hoch','Brent um 97 US-Dollar und WTI um 96 US-Dollar erhöhen den Druck auf Juli-Zuschläge.','Nahost-Spannungen, niedrigere Lagerbestände und Sommernachfrage stützen Ölpreise und können Kerosin- sowie Airline-Kosten erhöhen.','Steigend. Verstärkt den Wettbewerb zwischen unverändert und kleiner Anhebung.'],
    ['MOPS-Kerosinpreis beobachten','MOPS ist für Zuschlagsberechnungen direkter relevant als Rohöl allein.','Höhere Ölpreise und Nahost-Risiken können MOPS erhöhen. Liegt der Juni-Durchschnitt auf oder über Mai, ist eine Juli-Senkung weniger wahrscheinlich.','Steigend. Starkes MOPS stützt unveränderte oder teilweise höhere Zuschläge.'],
    ['Auch der Wechselkurs ist eine Variable','Höhere Ölpreise und Nahost-Risiken können Dollarstärke und Won-Schwäche fördern.','Zuschläge berücksichtigen Kerosin und Wechselkurs. Steigen MOPS und USD/KRW gemeinsam, kann der Druck zunehmen.','Steigend. Hohes USD/KRW erhöht KRW-basierte Kosten.'],
    ['Treibstoffzuschlag Juli 2026: höherer Druck trotz unverändertem Basisszenario','Unverändert bleibt am wahrscheinlichsten, aber eine Anhebung um eine Stufe ist wahrscheinlicher als gestern.','Stand 2026.06.04 09:00 KST: unverändert 50-55%, eine Stufe 35-40%, zwei Stufen oder mehr höchstens 10%.','Neutral bis steigend. Juli ist noch nicht offiziell.']
  ];
  var ids=['hormuz-risk','brent-wti-high','mops-focus','fx-variable','july-outlook'];
  var categories=['market','market','market','market','market'];
  window.AERO_NEWS_CARDS_20260604 = ids.map(function(id,idx){
    var ko=text.ko[idx];
    var card={id:'news-20260604-'+id,slug:'june-4-'+id,category:categories[idx],priority:1,date:date,updatedAt:updated.ko,badge:'NEW',aiSummary:true,relevanceScore:1,currentMonthNotice:'2026-06',forecastTargetMonth:'2026-07',title:ko[0],aiBrief:ko[1],summary:ko[2],impact:ko[3],sourceName:'2026년 7월 유류할증료 전망 업데이트',sourceUrl:'forecast.html',tags:window.AERO_MARKET_BRIEF_20260604.keywords.slice(0,6),faq:faq.ko,links:[{href:'forecast.html',label:'2026년 7월 전망 보기'}],i18n:{}};
    ['en','ja','zh','fr','de'].forEach(function(lang){
      var v=text[lang][idx];
      card.i18n[lang]={updatedAt:updated[lang],title:v[0],aiBrief:v[1],summary:v[2],impact:v[3],sourceName:lang==='ja'?'2026年7月燃油サーチャージ見通し更新':lang==='zh'?'2026年7月燃油附加费展望更新':'July 2026 fuel surcharge outlook update',tags:lang==='ja'?['NEW','燃油サーチャージ','MOPS','ホルムズ海峡','原油価格','為替']:lang==='zh'?['NEW','燃油附加费','MOPS','霍尔木兹海峡','国际油价','汇率']:['NEW','fuel surcharge','MOPS','Strait of Hormuz','oil prices','FX'],faq:faq[lang],links:[{href:'forecast.html',label:lang==='ja'?'2026年7月見通しを見る':lang==='zh'?'查看2026年7月展望':'View July 2026 outlook'}]};
    });
    return card;
  });
})();

window.AERO_NEWS_LATEST = window.AERO_MARKET_BRIEF_20260604;

/* Keep the June 4 card footer, tags, and CTA in the selected language. */
(function(){
  var localized = {
    en:{sourceName:'July 2026 fuel surcharge outlook update',tags:['NEW','fuel surcharge','MOPS','Strait of Hormuz','oil prices','FX'],label:'View July 2026 outlook'},
    ja:{sourceName:'2026年7月燃油サーチャージ見通し更新',tags:['NEW','燃油サーチャージ','MOPS','ホルムズ海峡','原油価格','為替'],label:'2026年7月見通しを見る'},
    zh:{sourceName:'2026年7月燃油附加费展望更新',tags:['NEW','燃油附加费','MOPS','霍尔木兹海峡','国际油价','汇率'],label:'查看2026年7月展望'},
    fr:{sourceName:'Mise à jour des perspectives de juillet 2026',tags:['NOUVEAU','surtaxe carburant','MOPS','détroit d’Ormuz','prix du pétrole','taux de change'],label:'Voir les perspectives de juillet 2026'},
    de:{sourceName:'Aktualisierung des Juli-Ausblicks 2026',tags:['NEU','Treibstoffzuschlag','MOPS','Straße von Hormus','Ölpreise','Wechselkurs'],label:'Juli-Ausblick 2026 ansehen'}
  };
  (window.AERO_NEWS_CARDS_20260604 || []).forEach(function(card){
    Object.keys(localized).forEach(function(lang){
      var copy=localized[lang];
      card.i18n[lang]=card.i18n[lang]||{};
      card.i18n[lang].sourceName=copy.sourceName;
      card.i18n[lang].tags=copy.tags;
      card.i18n[lang].links=[{href:'forecast.html',label:copy.label}];
    });
  });
})();

/* 2026.06.05 KST market brief and news cards. */
window.AERO_MARKET_BRIEF_20260605 = {
  timestamp:'2026-06-05T09:00:00+09:00',
  displayTime:'2026.06.05 09:00 KST',
  currentMonthNotice:'2026-06',
  forecastTargetMonth:'2026-07',
  badge:'JULY_OUTLOOK',
  summary:'2026.06.05 09:00 KST 기준 2026년 7월 국제선 유류할증료는 동결과 1단계 인상 가능성이 경합하는 구간으로 진입했습니다. 이란 원유 수출 감소, 호르무즈 해협 정상화 지연, MOPS 항공유 가격 강세 가능성, 원달러 환율 부담이 7월 유류할증료 인하 가능성을 제한하고 있습니다.',
  probabilities:{freeze:'45~50%',oneStepIncrease:'40~45%',twoStepOrMore:'10% 이하'},
  keywords:['유류할증료','2026년 7월 유류할증료','항공권 유류할증료','MOPS','항공유 가격','국제유가','브렌트유','WTI','원달러 환율','호르무즈 해협','이란 원유 수출','대한항공 유류할증료','아시아나 유류할증료','제주항공 유류할증료','티웨이 유류할증료']
};
(function(){
  var date='2026-06-05';
  var updated={ko:'2026.06.05 09:00 KST 업데이트',en:'Updated 2026.06.05 09:00 KST',ja:'2026.06.05 09:00 KST 更新',zh:'2026.06.05 09:00 KST 更新',fr:'Mis à jour le 2026.06.05 09:00 KST',de:'Aktualisiert am 2026.06.05 09:00 KST'};
  var faq={
    ko:[
      {q:'2026년 7월 유류할증료는 오를 가능성이 있나요?',a:'2026년 6월 5일 기준으로는 동결과 1단계 인상 가능성이 경합하고 있습니다. 동결 가능성은 45~50%, 1단계 인상 가능성은 40~45% 수준으로 봅니다.'},
      {q:'MOPS가 왜 중요한가요?',a:'MOPS는 항공유 가격 지표로 국내 항공사 유류할증료 산정에 직접적인 영향을 줍니다.'},
      {q:'호르무즈 해협 리스크가 완화됐나요?',a:'일부 물동량은 회복됐지만 정상화로 보기는 어렵습니다. 국제유가와 항공유 가격의 리스크 프리미엄은 남아 있습니다.'},
      {q:'이란 원유 수출 감소는 어떤 영향을 주나요?',a:'원유 공급 감소 우려는 국제유가와 항공유 가격 상승 압력으로 이어질 수 있고, 유류할증료 인하 가능성을 제한하거나 인상 압력을 높일 수 있습니다.'}
    ],
    en:[
      {q:'Could July 2026 fuel surcharges rise?',a:'As of June 5, 2026, freeze and one-step increase scenarios are competing. Freeze is estimated at 45-50%, and a one-step increase at 40-45%.'},
      {q:'Why is MOPS important?',a:'MOPS is a jet fuel price benchmark and directly affects Korean airline fuel surcharge calculations.'},
      {q:'Has Strait of Hormuz risk eased?',a:'Some traffic has recovered, but it is hard to call it normalized. A risk premium remains in oil and jet fuel prices.'},
      {q:'How does lower Iranian crude exports affect fuel surcharges?',a:'Lower crude supply can pressure oil and jet fuel prices higher, limiting surcharge cuts or increasing surcharge pressure.'}
    ]
  };
  faq.ja=faq.en; faq.zh=faq.en; faq.fr=faq.en; faq.de=faq.en;
  var cards={
    ko:[
      ['iran-exports','이란 원유 수출 6개월 최저','공급 감소 우려가 국제유가와 항공유 가격 상승 압력으로 작용하고 있습니다.','최근 이란 원유 수출이 6개월 최저 수준으로 줄면서 공급 불안이 다시 커졌습니다. 이는 MOPS 항공유 가격과 2026년 7월 국제선 유류할증료 인하 가능성을 제한하는 변수입니다.','상승. 국제유가와 MOPS 강세를 통해 유류할증료 인상 압력을 높일 수 있습니다.'],
      ['hormuz-partial','호르무즈 해협 일부 회복','일부 물동량은 회복됐지만 정상화로 보기에는 아직 어렵습니다.','호르무즈 해협 리스크는 완전히 해소되지 않았습니다. 통항 불확실성이 남아 있으면 항공유 가격의 리스크 프리미엄도 유지될 수 있습니다.','상승. 지정학 리스크 프리미엄이 7월 전망의 핵심 변수입니다.'],
      ['mops-firm','MOPS 강세 가능성','항공유 수요와 국제유가 부담이 7월 유류할증료 인하 가능성을 제한하고 있습니다.','MOPS는 국내 항공사 국제선 유류할증료 산정에 직접적인 영향을 주는 항공유 가격 지표입니다. 6월 평균이 강세를 보이면 7월은 동결 또는 인상 쪽으로 기울 수 있습니다.','상승. 동결 또는 1단계 인상 압력을 키울 수 있습니다.'],
      ['fx-burden','환율 부담 지속','원달러 환율이 높은 구간에 머물면 항공사의 달러 결제 연료비 부담이 커질 수 있습니다.','국제유가가 크게 내려가지 않는 상황에서 환율 부담이 이어지면 KRW 기준 유류할증료 인하 여력은 줄어듭니다.','상승. KRW 기준 항공유 비용 부담을 유지합니다.'],
      ['july-competition','7월 전망은 경합','현재 기준 7월 유류할증료는 동결과 1단계 인상 가능성이 비슷하게 경쟁하고 있습니다.','2026.06.05 09:00 KST 기준 전망은 동결 45~50%, 1단계 인상 40~45%, 2단계 이상 인상 10% 이하입니다. 6월 3~4일보다 상승 압력이 커진 상태입니다.','중립~상승. 7월 금액은 아직 공식 공시 전입니다.']
    ],
    en:[
      ['iran-exports','Iran crude exports hit a six-month low','Supply concerns are adding upward pressure to oil and jet fuel prices.','Lower Iranian crude exports increase supply uncertainty. This can keep MOPS jet fuel firm and limit the chance of July 2026 international fuel surcharge cuts.','Upward. Oil and MOPS strength can raise surcharge pressure.'],
      ['hormuz-partial','Strait of Hormuz only partly recovered','Some traffic has returned, but it is still hard to call the route normalized.','Strait of Hormuz risk is not fully resolved. If transit uncertainty remains, a risk premium can stay in jet fuel prices.','Upward. Geopolitical risk remains a key July variable.'],
      ['mops-firm','MOPS may stay firm','Air travel demand and oil pressure are limiting the chance of July surcharge cuts.','MOPS is the jet fuel benchmark that directly affects Korean international fuel surcharge calculations. If the June average stays firm, July can tilt toward freeze or increase.','Upward. Supports freeze or one-step increase pressure.'],
      ['fx-burden','FX burden persists','Elevated USD/KRW can increase airline dollar-denominated fuel costs.','If oil does not fall sharply while FX stays elevated, the room for KRW-based surcharge cuts is limited.','Upward. Keeps KRW-based fuel cost pressure.'],
      ['july-competition','July outlook is now competitive','Freeze and one-step increase scenarios are now closely competing.','As of 2026.06.05 09:00 KST, the outlook is freeze 45-50%, one-step increase 40-45%, and two steps or more 10% or less. Upward pressure is stronger than June 3-4.','Neutral to upward. July is not officially filed yet.']
    ]
  };
  cards.ja=cards.en; cards.zh=cards.en; cards.fr=cards.en; cards.de=cards.en;
  var categories=['market','market','market','market','market'];
  var source={ko:'2026년 7월 유류할증료 전망 업데이트',en:'July 2026 fuel surcharge outlook update',ja:'2026年7月燃油サーチャージ見通し更新',zh:'2026年7月燃油附加费展望更新',fr:'Mise à jour des perspectives de juillet 2026',de:'Aktualisierung des Juli-Ausblicks 2026'};
  var labels={ko:'2026년 7월 전망 보기',en:'View July 2026 outlook',ja:'2026年7月見通しを見る',zh:'查看2026年7月展望',fr:'Voir les perspectives de juillet 2026',de:'Juli-Ausblick 2026 ansehen'};
  window.AERO_NEWS_CARDS_20260605=cards.ko.map(function(v,idx){
    var card={id:'news-20260605-'+v[0],slug:'june-5-'+v[0],category:categories[idx],priority:1,date:date,updatedAt:updated.ko,badge:'NEW',aiSummary:true,relevanceScore:1,currentMonthNotice:'2026-06',forecastTargetMonth:'2026-07',title:v[1],aiBrief:v[2],summary:v[3],impact:v[4],sourceName:source.ko,sourceUrl:'forecast.html',tags:window.AERO_MARKET_BRIEF_20260605.keywords.slice(0,6),faq:faq.ko,links:[{href:'forecast.html',label:labels.ko}],i18n:{}};
    ['en','ja','zh','fr','de'].forEach(function(lang){var x=cards[lang][idx];card.i18n[lang]={updatedAt:updated[lang],title:x[1],aiBrief:x[2],summary:x[3],impact:x[4],sourceName:source[lang],tags:['NEW','fuel surcharge','MOPS','Strait of Hormuz','oil prices','FX'],faq:faq[lang],links:[{href:'forecast.html',label:labels[lang]}]};});
    return card;
  });
})();

/* Localized 2026.06.05 news cards.
   The first 2026.06.05 insert used English as a fallback for non-ko/en languages.
   Keep the data structure, but replace visible fields with real locale copy. */
(function(){
  if (!window.AERO_NEWS_CARDS_20260605) return;
  var i18n605 = {
    ja: {
      updatedAt: '2026.06.05 09:00 KST 更新',
      sourceName: '2026年7月燃油サーチャージ見通し更新',
      label: '2026年7月見通しを見る',
      tags: ['NEW','燃油サーチャージ','MOPS','ホルムズ海峡','原油価格','為替'],
      faq: [
        {q:'2026年7月の燃油サーチャージは上がる可能性がありますか？',a:'2026年6月5日時点では、据え置きと1段階引き上げの可能性が競合しています。据え置きは45〜50%、1段階引き上げは40〜45%程度と見ています。'},
        {q:'MOPSが重要な理由は何ですか？',a:'MOPSは航空燃料価格の指標で、韓国発国際線の燃油サーチャージ算定に直接影響する基準です。'},
        {q:'ホルムズ海峡リスクは緩和しましたか？',a:'一部の輸送は回復しましたが、正常化とはまだ言いにくい状態です。原油と航空燃料価格にはリスクプレミアムが残っています。'},
        {q:'イラン原油輸出の減少はどんな影響がありますか？',a:'原油供給への不安が強まると、原油価格と航空燃料価格に上昇圧力がかかり、燃油サーチャージの引き下げ余地を制限する可能性があります。'}
      ],
      cards: [
        ['イラン原油輸出が6か月ぶり低水準','供給減少への懸念が、原油と航空燃料価格に上昇圧力をかけています。','最近のイラン原油輸出減少により供給不安が再び強まりました。これはMOPS航空燃料価格と2026年7月国際線燃油サーチャージの引き下げ可能性を制限する変数です。','上昇要因。原油価格とMOPSの強さを通じて、燃油サーチャージ引き上げ圧力を高める可能性があります。'],
        ['ホルムズ海峡は一部回復','一部の輸送は回復しましたが、正常化とはまだ言いにくい状況です。','ホルムズ海峡リスクは完全には解消していません。通航の不確実性が残れば、航空燃料価格にリスクプレミアムが残る可能性があります。','上昇要因。地政学リスクは7月見通しの主要変数です。'],
        ['MOPSが強含む可能性','航空需要と原油価格の負担が、7月燃油サーチャージの引き下げ余地を制限しています。','MOPSは韓国発国際線の燃油サーチャージ算定に直接影響する航空燃料価格指標です。6月平均が強いままなら、7月は据え置きまたは引き上げに傾く可能性があります。','上昇要因。据え置きまたは1段階引き上げ圧力を支えます。'],
        ['為替負担が続く','USD/KRWが高い水準にあると、航空会社のドル建て燃料費負担が増える可能性があります。','原油価格が大きく下がらない状況で為替負担が続くと、ウォン建て燃油サーチャージの引き下げ余地は限られます。','上昇要因。ウォン基準の航空燃料費負担を残します。'],
        ['7月見通しは競合局面','据え置きと1段階引き上げのシナリオが拮抗しています。','2026.06.05 09:00 KST時点の見通しは、据え置き45〜50%、1段階引き上げ40〜45%、2段階以上10%以下です。6月3〜4日より上昇圧力が強まっています。','中立から上昇要因。7月の金額はまだ公式公示前です。']
      ]
    },
    zh: {
      updatedAt: '2026.06.05 09:00 KST 更新',
      sourceName: '2026年7月燃油附加费展望更新',
      label: '查看2026年7月展望',
      tags: ['NEW','燃油附加费','MOPS','霍尔木兹海峡','国际油价','汇率'],
      faq: [
        {q:'2026年7月燃油附加费有上调可能吗？',a:'截至2026年6月5日，维持不变和上调一个等级的可能性正在竞争。维持不变约45–50%，上调一个等级约40–45%。'},
        {q:'为什么MOPS很重要？',a:'MOPS是航空燃油价格指标，会直接影响韩国航司国际线燃油附加费的计算。'},
        {q:'霍尔木兹海峡风险缓解了吗？',a:'部分通行已经恢复，但仍难以称为正常化。国际油价和航空燃油价格中仍存在风险溢价。'},
        {q:'伊朗原油出口减少会有什么影响？',a:'原油供应担忧可能推高国际油价和航空燃油价格，从而限制燃油附加费下调空间或增加上调压力。'}
      ],
      cards: [
        ['伊朗原油出口降至6个月低点','供应减少担忧正在给国际油价和航空燃油价格带来上行压力。','近期伊朗原油出口减少使供应不确定性再次扩大。这可能使MOPS航空燃油价格保持强势，并限制2026年7月国际线燃油附加费下调的可能性。','上行因素。国际油价和MOPS走强可能增加燃油附加费上调压力。'],
        ['霍尔木兹海峡部分恢复','部分船舶通行已经恢复，但仍难以认为航道完全正常化。','霍尔木兹海峡风险尚未完全解除。如果通行不确定性持续，航空燃油价格中可能继续保留风险溢价。','上行因素。地缘政治风险仍是7月展望的关键变量。'],
        ['MOPS可能保持强势','航空需求和油价压力正在限制7月燃油附加费下调空间。','MOPS是直接影响韩国国际线燃油附加费计算的航空燃油价格指标。如果6月平均值保持强势，7月可能偏向维持不变或上调。','上行因素。支持维持不变或上调一个等级的压力。'],
        ['汇率负担持续','美元/韩元处于高位时，航司以美元结算的燃油成本可能增加。','如果国际油价没有明显下跌，同时汇率仍处高位，以韩元计价的燃油附加费下调空间会受到限制。','上行因素。维持以韩元计价的燃油成本压力。'],
        ['7月展望进入竞争区间','维持不变和上调一个等级的情景正在接近。','截至2026.06.05 09:00 KST，展望为维持不变45–50%、上调一个等级40–45%、上调两个等级以上10%以下。相比6月3–4日，上行压力有所增强。','中性至上行。7月金额尚未正式公告。']
      ]
    },
    fr: {
      updatedAt: 'Mis à jour le 2026.06.05 à 09:00 KST',
      sourceName: 'Mise à jour des perspectives de juillet 2026',
      label: 'Voir les perspectives de juillet 2026',
      tags: ['NOUVEAU','surtaxe carburant','MOPS','détroit d’Ormuz','prix du pétrole','change'],
      faq: [
        {q:'Les surtaxes carburant de juillet 2026 peuvent-elles augmenter ?',a:'Au 5 juin 2026, les scénarios de statu quo et de hausse d’un palier sont en concurrence. Le statu quo est estimé à 45–50% et la hausse d’un palier à 40–45%.'},
        {q:'Pourquoi le MOPS est-il important ?',a:'Le MOPS est un indicateur du prix du kérosène et influence directement le calcul des surtaxes carburant des compagnies coréennes.'},
        {q:'Le risque dans le détroit d’Ormuz a-t-il diminué ?',a:'Une partie du trafic a repris, mais il est difficile de parler de normalisation. Une prime de risque reste présente dans le pétrole et le kérosène.'},
        {q:'Quel est l’effet de la baisse des exportations iraniennes de brut ?',a:'Une offre de brut plus limitée peut soutenir le pétrole et le kérosène, limiter les baisses de surtaxe ou accroître la pression haussière.'}
      ],
      cards: [
        ['Les exportations de brut iranien au plus bas depuis six mois','Les inquiétudes d’approvisionnement ajoutent une pression haussière sur le pétrole et le kérosène.','La baisse récente des exportations iraniennes de brut renforce l’incertitude d’approvisionnement. Cela peut maintenir le MOPS ferme et limiter la probabilité d’une baisse des surtaxes internationales de juillet 2026.','Facteur haussier. La fermeté du pétrole et du MOPS peut renforcer la pression sur les surtaxes.'],
        ['Le détroit d’Ormuz ne se rétablit que partiellement','Une partie du trafic est revenue, mais la route n’est pas encore normalisée.','Le risque lié au détroit d’Ormuz n’est pas totalement résolu. Si l’incertitude du transit persiste, une prime de risque peut rester dans les prix du kérosène.','Facteur haussier. Le risque géopolitique reste une variable clé pour juillet.'],
        ['Le MOPS pourrait rester ferme','La demande aérienne et la pression pétrolière limitent les chances de baisse en juillet.','Le MOPS est l’indicateur de kérosène qui influence directement le calcul des surtaxes internationales coréennes. Si la moyenne de juin reste ferme, juillet peut pencher vers le statu quo ou une hausse.','Facteur haussier. Soutient la pression de statu quo ou de hausse d’un palier.'],
        ['La pression du change persiste','Un USD/KRW élevé peut accroître les coûts carburant libellés en dollars des compagnies.','Si le pétrole ne baisse pas nettement et que le change reste élevé, la marge de baisse des surtaxes en won est limitée.','Facteur haussier. Maintient la pression sur les coûts carburant en KRW.'],
        ['Les scénarios de juillet sont en concurrence','Le statu quo et la hausse d’un palier sont désormais proches.','Au 2026.06.05 09:00 KST, les probabilités sont: statu quo 45–50%, hausse d’un palier 40–45%, deux paliers ou plus 10% ou moins. La pression haussière est plus forte que les 3–4 juin.','Neutre à haussier. Les montants de juillet ne sont pas encore officiellement publiés.']
      ]
    },
    de: {
      updatedAt: 'Aktualisiert am 2026.06.05 um 09:00 KST',
      sourceName: 'Aktualisierung des Juli-Ausblicks 2026',
      label: 'Juli-Ausblick 2026 ansehen',
      tags: ['NEU','Treibstoffzuschlag','MOPS','Straße von Hormus','Ölpreise','Wechselkurs'],
      faq: [
        {q:'Können die Treibstoffzuschläge im Juli 2026 steigen?',a:'Stand 5. Juni 2026 konkurrieren unverändert und eine Anhebung um eine Stufe. Unverändert wird auf 45–50% geschätzt, eine Stufe höher auf 40–45%.'},
        {q:'Warum ist MOPS wichtig?',a:'MOPS ist ein Kerosinpreis-Benchmark und beeinflusst die Berechnung koreanischer Airline-Treibstoffzuschläge direkt.'},
        {q:'Hat sich das Risiko in der Straße von Hormus entspannt?',a:'Ein Teil des Verkehrs hat sich erholt, aber von Normalisierung kann kaum gesprochen werden. Eine Risikoprämie bleibt in Öl- und Kerosinpreisen enthalten.'},
        {q:'Wie wirken niedrigere iranische Rohölexporte?',a:'Geringeres Rohölangebot kann Öl- und Kerosinpreise stützen, Zuschlagssenkungen begrenzen oder Erhöhungsdruck erzeugen.'}
      ],
      cards: [
        ['Irans Rohölexporte auf Sechsmonatstief','Sorgen um das Angebot erhöhen den Druck auf Öl- und Kerosinpreise.','Niedrigere iranische Rohölexporte verstärken die Angebotsunsicherheit. Das kann MOPS-Kerosin fest halten und die Chance auf Senkungen der internationalen Treibstoffzuschläge im Juli 2026 begrenzen.','Aufwärtsfaktor. Stärke bei Öl und MOPS kann den Zuschlagsdruck erhöhen.'],
        ['Straße von Hormus nur teilweise erholt','Ein Teil des Verkehrs ist zurück, aber die Route ist noch nicht normalisiert.','Das Risiko in der Straße von Hormus ist nicht vollständig gelöst. Bleibt die Transitunsicherheit bestehen, kann eine Risikoprämie in Kerosinpreisen bleiben.','Aufwärtsfaktor. Geopolitisches Risiko bleibt eine wichtige Juli-Variable.'],
        ['MOPS könnte fest bleiben','Flugnachfrage und Öldruck begrenzen die Chance auf Senkungen im Juli.','MOPS ist der Kerosin-Benchmark, der koreanische internationale Treibstoffzuschläge direkt beeinflusst. Bleibt der Juni-Durchschnitt fest, kann Juli zu unverändert oder höher tendieren.','Aufwärtsfaktor. Unterstützt Druck auf unverändert oder eine Stufe höher.'],
        ['Wechselkursbelastung hält an','Ein erhöhter USD/KRW kann die in Dollar gezahlten Treibstoffkosten der Airlines erhöhen.','Wenn Öl nicht deutlich fällt und der Wechselkurs hoch bleibt, ist der Spielraum für KRW-basierte Zuschlagssenkungen begrenzt.','Aufwärtsfaktor. Hält den Kostendruck in KRW aufrecht.'],
        ['Juli-Ausblick ist umkämpft','Unverändert und eine Anhebung um eine Stufe liegen nun eng beieinander.','Stand 2026.06.05 09:00 KST lautet der Ausblick: unverändert 45–50%, eine Stufe höher 40–45%, zwei oder mehr Stufen höchstens 10%. Der Aufwärtsdruck ist stärker als am 3.–4. Juni.','Neutral bis aufwärts. Juli-Beträge sind noch nicht offiziell veröffentlicht.']
      ]
    }
  };
  window.AERO_NEWS_CARDS_20260605.forEach(function(card, idx){
    Object.keys(i18n605).forEach(function(lang){
      var pack = i18n605[lang];
      var row = pack.cards[idx];
      if (!row) return;
      card.i18n = card.i18n || {};
      card.i18n[lang] = Object.assign({}, card.i18n[lang] || {}, {
        updatedAt: pack.updatedAt,
        title: row[0],
        aiBrief: row[1],
        summary: row[2],
        impact: row[3],
        sourceName: pack.sourceName,
        tags: pack.tags,
        faq: pack.faq,
        links: [{href:'forecast.html', label: pack.label}]
      });
    });
  });
})();

window.AERO_NEWS_LATEST = window.AERO_MARKET_BRIEF_20260605;

/* 2026.06.06 KST market brief and news cards. */
window.AERO_MARKET_BRIEF_20260606 = {
  timestamp:'2026-06-06T10:30:00+09:00',
  displayTime:'2026.06.06 10:30 KST',
  currentMonthNotice:'2026-06',
  forecastTargetMonth:'2026-07',
  badge:'JULY_OUTLOOK',
  summary:'2026년 6월 6일 10:30 KST 기준 2026년 7월 유류할증료는 동결과 1단계 인상 가능성이 경합하는 상태입니다. 전일보다 인상 압력은 약간 완화됐지만, 인하 전망으로 전환할 정도는 아닙니다.',
  probabilities:{freeze:'45~50%',oneStepIncrease:'35~45%',twoStepOrMore:'10% 이하'},
  keywords:['유류할증료','2026년 7월 유류할증료','항공권 유류할증료','MOPS','항공유 가격','국제유가','브렌트유','WTI','원달러 환율','환율 전망','호르무즈 해협','대한항공 유류할증료','아시아나 유류할증료','제주항공 유류할증료','티웨이 유류할증료']
};
(function(){
  var date='2026-06-06';
  var faqKo=[
    {q:'2026년 7월 유류할증료는 오를 가능성이 있나요?',a:'2026년 6월 6일 10:30 KST 기준으로는 동결과 1단계 인상 가능성이 경합하고 있습니다. 동결 가능성은 45~50%, 1단계 인상 가능성은 35~45% 수준으로 봅니다.'},
    {q:'MOPS가 왜 중요한가요?',a:'MOPS는 항공유 가격 지표로 국내 항공사 유류할증료 산정에 직접적인 영향을 줍니다.'},
    {q:'호르무즈 해협 리스크가 완화됐나요?',a:'일부 선박 이동 기대는 있지만 통항 정상화로 보기는 어렵습니다. 따라서 국제유가와 항공유 가격에 대한 리스크 프리미엄은 남아 있습니다.'},
    {q:'국제유가가 일부 하락했는데 유류할증료도 내려가나요?',a:'국제유가가 일부 완화된 것은 인상 압력을 낮추는 요인이지만, MOPS 항공유 가격과 원달러 환율, 호르무즈 해협 리스크가 남아 있어 7월 유류할증료 인하 전망으로 보기는 아직 어렵습니다.'}
  ];
  var faqEn=[
    {q:'Could July 2026 fuel surcharges rise?',a:'As of June 6, 2026 10:30 KST, a freeze and a one-step increase remain competing scenarios. Freeze is estimated at 45-50%, and a one-step increase at 35-45%.'},
    {q:'Why is MOPS important?',a:'MOPS is a jet fuel price benchmark that directly affects Korean airline fuel surcharge calculations.'},
    {q:'Has Strait of Hormuz risk eased?',a:'Some vessel movement may resume, but transit is not yet normalized, so a risk premium remains in oil and jet fuel prices.'},
    {q:'Will lower oil prices reduce fuel surcharges?',a:'Partial oil-price easing reduces upward pressure, but MOPS, USD/KRW and Strait of Hormuz risk still make a July surcharge cut difficult to call.'}
  ];
  var rowsKo=[
    ['oil-easing','국제유가 일부 완화에도 MOPS·환율 부담 지속, 7월 유류할증료 동결·인상 경합','브렌트유와 WTI는 협상 기대감으로 고점 대비 일부 하락했습니다.','2026년 6월 6일 10:30 KST 기준 국제유가는 협상 기대감으로 고점 대비 일부 완화됐지만, 호르무즈 해협 통항 정상화는 아직 확인되지 않았습니다. 항공유 가격과 MOPS 부담, 높은 원달러 환율이 이어지면서 2026년 7월 유류할증료는 인하보다는 동결 또는 일부 항공사의 1단계 인상 가능성이 경합하는 상태로 판단됩니다.','완화 요인. 전일보다 인상 압력을 낮추지만 인하 전망으로 전환하기에는 부족합니다.'],
    ['hormuz-not-normal','호르무즈 정상화는 아직','일부 선박 이동 기대는 있지만 통항 정상화로 보기는 어렵습니다.','호르무즈 해협의 정상 통항이 확인되기 전까지 국제유가와 항공유 가격에는 지정학 리스크 프리미엄이 남을 수 있습니다.','상승 요인. 공급 불확실성과 항공유 가격 변동성을 유지합니다.'],
    ['mops-burden','MOPS 부담 지속','항공유 가격 부담이 이어지며 유류할증료 인하 여력을 제한하고 있습니다.','MOPS는 국내 항공사의 국제선 유류할증료 산정에 직접 영향을 주는 항공유 가격 지표입니다. 항공유 가격 부담이 지속되면 7월 인하 가능성은 제한됩니다.','상승 요인. 동결 또는 1단계 인상 가능성을 지지합니다.'],
    ['fx-variable','환율도 변수','높은 원달러 환율은 항공사의 달러 결제 연료비 부담을 키울 수 있습니다.','국제유가가 일부 완화돼도 원달러 환율이 높은 구간을 유지하면 원화 기준 연료비 부담과 유류할증료 인하 제약이 이어질 수 있습니다.','상승 요인. KRW 기준 인하 여력을 제한합니다.'],
    ['july-outlook','7월 전망','현재 기준 7월 유류할증료는 동결과 1단계 인상 가능성이 경합하고 있습니다.','전망 확률은 동결 45~50%, 1단계 인상 35~45%, 2단계 이상 인상 10% 이하입니다. 전일보다 상승 압력은 다소 낮아졌지만 인하 전망으로 보기는 어렵습니다.','중립~상승. 7월 금액은 아직 공식 공시 전입니다.']
  ];
  var rowsEn=[
    ['oil-easing','Oil eases, but MOPS and FX keep July surcharge outlook contested','Brent and WTI have eased from recent highs on negotiation hopes.','As of June 6, 2026 10:30 KST, oil has eased from recent highs, but Strait of Hormuz transit is not normalized. MOPS jet fuel costs and elevated USD/KRW keep July fuel surcharges between a freeze and a possible one-step increase.','Relief factor, but not enough to establish a cut outlook.'],
    ['hormuz-not-normal','Hormuz is not normalized','Some vessel movement may resume, but normal transit has not been confirmed.','A geopolitical risk premium can remain in oil and jet fuel until normal Strait of Hormuz transit is confirmed.','Upward factor through supply uncertainty.'],
    ['mops-burden','MOPS burden persists','Jet fuel costs continue to limit room for surcharge cuts.','MOPS directly affects Korean international fuel surcharge calculations. Persistent jet fuel costs limit the chance of a July cut.','Upward factor supporting freeze or one-step increase.'],
    ['fx-variable','FX remains a variable','Elevated USD/KRW can increase airline dollar-denominated fuel costs.','Even with some oil-price relief, elevated USD/KRW can preserve KRW-based fuel cost pressure.','Upward factor limiting KRW-based cuts.'],
    ['july-outlook','July outlook','A freeze and one-step increase remain competing scenarios.','Current probabilities are freeze 45-50%, one-step increase 35-45%, and two steps or more 10% or less. Upward pressure eased slightly from the prior day, but a cut remains difficult to call.','Neutral to upward. July is not officially filed yet.']
  ];
  var categories=['market','market','market','market','market'];
  window.AERO_NEWS_CARDS_20260606=rowsKo.map(function(row,idx){
    var en=rowsEn[idx];
    return {
      id:'news-20260606-'+row[0],slug:'june-6-'+row[0],category:categories[idx],priority:1,date:date,
      updatedAt:'2026.06.06 10:30 KST 업데이트',badge:'NEW',aiSummary:true,relevanceScore:1,
      currentMonthNotice:'2026-06',forecastTargetMonth:'2026-07',
      title:row[1],aiBrief:row[2],summary:row[3],impact:row[4],
      sourceName:'2026년 7월 유류할증료 전망 업데이트',sourceUrl:'forecast.html',
      tags:window.AERO_MARKET_BRIEF_20260606.keywords.slice(0,9),faq:faqKo,
      links:[{href:'forecast.html',label:'2026년 7월 전망 보기'}],
      i18n:{
        en:{updatedAt:'Updated 2026.06.06 10:30 KST',title:en[1],aiBrief:en[2],summary:en[3],impact:en[4],sourceName:'July 2026 fuel surcharge outlook update',tags:['NEW','fuel surcharge','MOPS','oil prices','USD/KRW','Strait of Hormuz'],faq:faqEn,links:[{href:'forecast.html',label:'View July 2026 outlook'}]}
      }
    };
  });
  ['ja','zh','fr','de'].forEach(function(lang){
    window.AERO_NEWS_CARDS_20260606.forEach(function(card){
      card.i18n[lang]=Object.assign({},card.i18n.en);
    });
  });
})();

/* 2026.06.08 KST market brief and news cards. */
window.AERO_MARKET_BRIEF_20260608 = {
  timestamp:'2026-06-08T09:00:00+09:00',
  displayTime:'2026.06.08 09:00 KST',
  currentMonthNotice:'2026-06',
  forecastTargetMonth:'2026-07',
  badge:'JULY_OUTLOOK',
  summary:'2026년 6월 8일 09:00 KST 기준 2026년 7월 국제선 유류할증료는 동결 가능성이 다시 우세해진 상태입니다. 국제유가는 최근 고점 대비 일부 안정됐지만, MOPS 항공유 가격과 원달러 환율, 호르무즈 해협 리스크가 남아 있어 인하보다는 동결 또는 소폭 인상 가능성이 높습니다.',
  probabilities:{freeze:'50~55%',oneStepIncrease:'30~40%',twoStepOrMore:'10% 이하'},
  keywords:['유류할증료','2026년 7월 유류할증료','항공권 유류할증료','MOPS','항공유 가격','국제유가','브렌트유','WTI','원달러 환율','환율 전망','호르무즈 해협','대한항공 유류할증료','아시아나 유류할증료','제주항공 유류할증료','티웨이 유류할증료']
};
(function(){
  var date='2026-06-08';
  var faqKo=[
    {q:'2026년 7월 유류할증료는 인상될까요?',a:'현재 기준으로는 동결 가능성이 50~55%로 가장 높지만 일부 항공사의 1단계 인상 가능성도 남아 있습니다.'},
    {q:'국제유가가 하락했는데 왜 유류할증료가 바로 내려가지 않나요?',a:'유류할증료는 국제유가뿐 아니라 MOPS 항공유 가격과 원달러 환율도 함께 반영하기 때문입니다.'},
    {q:'호르무즈 해협 상황은 안정됐나요?',a:'일부 운항은 지속되고 있지만 정상화로 보기는 어렵습니다.'},
    {q:'MOPS는 왜 중요한가요?',a:'MOPS는 국내 항공사의 유류할증료 산정에 직접 반영되는 항공유 가격 지표입니다.'}
  ];
  var faqEn=[
    {q:'Will July 2026 fuel surcharges rise?',a:'The freeze scenario is currently the most likely at 50-55%, but a one-step increase remains possible for some airlines.'},
    {q:'Why do fuel surcharges not fall immediately when oil eases?',a:'Fuel surcharges reflect not only crude oil prices but also MOPS jet fuel and USD/KRW.'},
    {q:'Has the Strait of Hormuz stabilized?',a:'Some operations continue, but it is difficult to call the situation normalized.'},
    {q:'Why is MOPS important?',a:'MOPS is the jet fuel price benchmark directly reflected in Korean airline fuel surcharge calculations.'}
  ];
  var rowsKo=[
    ['market-main','국제유가 안정에도 MOPS 부담 지속, 7월 유류할증료 동결 가능성 확대','2026년 6월 8일 기준 국제유가는 최근 고점 대비 일부 안정됐지만, MOPS 항공유 가격과 원달러 환율 부담은 여전히 남아 있습니다.','호르무즈 해협 리스크도 완전히 해소되지 않은 가운데 2026년 7월 유류할증료는 동결 가능성이 다시 높아진 것으로 분석됩니다. 브렌트유와 WTI 안정은 인상 압력을 낮추지만, 항공유 가격과 환율 전망은 대한항공 유류할증료, 아시아나 유류할증료, 제주항공 유류할증료, 티웨이 유류할증료 전망에서 여전히 중요한 변수입니다.','동결 우세. 다만 MOPS와 원달러 환율 때문에 인하 전망은 아닙니다.'],
    ['oil-stability','국제유가 안정','브렌트유와 WTI가 최근 고점 대비 다소 안정된 모습을 보이고 있습니다.','국제유가 안정은 2026년 7월 유류할증료의 인상 압력을 낮추는 요인입니다. 다만 중동 리스크와 원유 재고 감소 문제가 남아 있어 항공권 유류할증료 인하를 단정하기는 어렵습니다.','완화 요인. 동결 가능성을 높입니다.'],
    ['hormuz-risk','호르무즈 리스크 지속','정상화 선언은 없으며 지정학적 리스크 프리미엄은 유지되고 있습니다.','호르무즈 해협은 일부 유조선 운항과 우회 수송이 이어지고 있으나 정상화 선언은 없습니다. 보험료 부담과 지정학적 프리미엄은 항공유 가격과 유류할증료 전망에 계속 영향을 줍니다.','상승 요인. 완전한 인하 전망을 제한합니다.'],
    ['mops-strong','MOPS 강세 유지','항공유 수요 증가와 성수기 진입 영향으로 MOPS는 강세를 유지하고 있습니다.','MOPS는 국내 항공사의 유류할증료 산정에 직접 반영되는 항공유 가격 지표입니다. 국제선 수요 증가와 여름 성수기 진입으로 MOPS가 강세를 유지하면 7월 유류할증료는 인하보다 동결 또는 일부 인상 쪽으로 해석해야 합니다.','상승 요인. 동결 또는 1단계 인상 가능성을 남깁니다.'],
    ['fx-burden','환율 부담 지속','원달러 환율은 여전히 항공사의 연료비 부담을 높이는 요인입니다.','높은 원달러 환율이 유지되면 항공사의 달러 결제 연료비 부담이 커지고 원화 기준 비용도 증가합니다. 환율 전망은 2026년 7월 항공권 유류할증료 판단에서 국제유가만큼 중요한 변수입니다.','상승 요인. KRW 기준 인하 여력을 제한합니다.'],
    ['july-outlook','7월 전망','현재는 인상보다 동결 가능성이 다소 우세한 상태입니다.','최신 전망 확률은 동결 50~55%, 1단계 인상 30~40%, 2단계 이상 인상 10% 이하입니다. 6월 5일의 동결과 인상 경합 구간에서 6월 8일에는 동결 우세로 이동했지만, MOPS와 원달러 환율 부담 때문에 인하 전망으로 전환된 것은 아닙니다.','중립~완화. 7월 금액은 아직 공식 공시 전입니다.']
  ];
  var rowsEn=[
    ['market-main','Oil stabilizes, but MOPS pressure keeps July fuel surcharge freeze more likely','As of June 8, 2026, oil prices have eased from recent highs, while MOPS jet fuel and USD/KRW burdens remain.','With Strait of Hormuz risk not fully resolved, July 2026 fuel surcharges are again leaning toward a freeze. Brent and WTI stabilization lowers increase pressure, but jet fuel prices and FX remain important for Korean Air, Asiana, Jeju Air and Tway surcharge outlooks.','Freeze-leaning, but not a cut outlook because MOPS and FX remain burdensome.'],
    ['oil-stability','Oil prices stabilize','Brent and WTI have stabilized somewhat from recent highs.','Oil-price stabilization reduces upward pressure on July 2026 fuel surcharges, but Middle East risk and inventory concerns still make a direct airfare fuel surcharge cut difficult to call.','Relief factor. Supports the freeze scenario.'],
    ['hormuz-risk','Hormuz risk continues','There is no normalization declaration, and a geopolitical risk premium remains.','Some tanker operations and rerouting continue around the Strait of Hormuz, but normal transit has not been declared. Insurance costs and geopolitical premiums continue to affect jet fuel prices.','Upward factor. Limits a clear cut outlook.'],
    ['mops-strong','MOPS remains firm','Higher jet fuel demand and the summer peak season are keeping MOPS firm.','MOPS is the jet fuel benchmark directly reflected in Korean airline fuel surcharge calculations. If MOPS stays firm, July should be read as freeze or possible increase rather than a cut.','Upward factor. Keeps one-step increase risk alive.'],
    ['fx-burden','FX burden persists','USD/KRW remains a factor increasing airline fuel-cost pressure.','If USD/KRW stays elevated, airlines face higher dollar-denominated fuel costs and higher KRW-based cost pressure. FX outlook remains central to July airfare fuel surcharge decisions.','Upward factor. Limits KRW-based cuts.'],
    ['july-outlook','July outlook','A freeze is now somewhat more likely than an increase.','Current probabilities are freeze 50-55%, one-step increase 30-40%, and two steps or more 10% or less. The outlook moved from competition on June 5 to freeze-leaning on June 8, but not to a cut outlook.','Neutral to relief. July filings are not official yet.']
  ];
  var categories=['market','market','market','market','market','market'];
  window.AERO_NEWS_CARDS_20260608=rowsKo.map(function(row,idx){
    var en=rowsEn[idx];
    return {
      id:'news-20260608-'+row[0],slug:'june-8-'+row[0],category:categories[idx],priority:1,date:date,
      updatedAt:'2026.06.08 09:00 KST 업데이트',badge:'NEW',aiSummary:true,relevanceScore:1,
      currentMonthNotice:'2026-06',forecastTargetMonth:'2026-07',
      title:row[1],aiBrief:row[2],summary:row[3],impact:row[4],
      sourceName:'2026년 7월 유류할증료 전망 업데이트',sourceUrl:'forecast.html',
      tags:window.AERO_MARKET_BRIEF_20260608.keywords.slice(0,10),faq:faqKo,
      links:[{href:'forecast.html',label:'2026년 7월 전망 보기'}],
      i18n:{
        en:{updatedAt:'Updated 2026.06.08 09:00 KST',title:en[1],aiBrief:en[2],summary:en[3],impact:en[4],sourceName:'July 2026 fuel surcharge outlook update',tags:['NEW','fuel surcharge','MOPS','jet fuel price','oil prices','Brent','WTI','USD/KRW','Strait of Hormuz'],faq:faqEn,links:[{href:'forecast.html',label:'View July 2026 outlook'}]}
      }
    };
  });
  var localized = {
    ja: {
      updatedAt:'2026.06.08 09:00 KST更新', sourceName:'2026年7月燃油サーチャージ見通し更新',
      tags:['NEW','燃油サーチャージ','MOPS','航空燃料価格','国際原油価格','ブレント','WTI','USD/KRW','ホルムズ海峡'],
      link:'2026年7月見通しを見る',
      faq:[
        {q:'2026年7月の燃油サーチャージは上がりますか？',a:'現時点では据え置き可能性が50〜55%で最も高いものの、一部航空会社では1段階引き上げの可能性も残っています。'},
        {q:'原油価格が下がってもすぐに燃油サーチャージが下がらない理由は？',a:'燃油サーチャージは原油価格だけでなく、MOPS航空燃料価格とUSD/KRWも反映するためです。'},
        {q:'ホルムズ海峡は安定しましたか？',a:'一部運航は続いていますが、正常化と見るのは難しい状況です。'},
        {q:'MOPSはなぜ重要ですか？',a:'MOPSは韓国系航空会社の燃油サーチャージ算定に直接反映される航空燃料価格指標です。'}
      ],
      rows:[
        ['原油は安定したがMOPS負担は継続、7月燃油サーチャージは据え置き可能性拡大','2026年6月8日時点で原油価格は直近高値からやや安定しましたが、MOPS航空燃料価格とUSD/KRWの負担は残っています。','ホルムズ海峡リスクが完全には解消されていないため、2026年7月燃油サーチャージは据え置き寄りです。ブレントとWTIの安定は引き上げ圧力を下げますが、航空燃料価格と為替見通しは主要航空会社の判断でなお重要です。','据え置き優勢。ただしMOPSとUSD/KRWのため引き下げ見通しではありません。'],
        ['国際原油価格は安定','ブレントとWTIは直近高値からやや安定しています。','原油安定は2026年7月燃油サーチャージの上昇圧力を下げる要因です。ただし中東リスクと在庫減少懸念が残るため、航空券燃油サーチャージの引き下げを断定するのは難しいです。','緩和要因。据え置き可能性を高めます。'],
        ['ホルムズリスクは継続','正常化宣言はなく、地政学的リスクプレミアムは残っています。','ホルムズ海峡では一部タンカー運航と迂回輸送が続いていますが、正常化宣言はありません。保険料負担と地政学プレミアムは航空燃料価格と燃油サーチャージ見通しに影響します。','上昇要因。明確な引き下げ見通しを制限します。'],
        ['MOPSは強含み維持','航空燃料需要増と夏の繁忙期入りでMOPSは強含みです。','MOPSは韓国系航空会社の燃油サーチャージ算定に直接反映される航空燃料指標です。国際線需要と夏の繁忙期で強含みが続けば、7月は引き下げより据え置きまたは一部引き上げで見る必要があります。','上昇要因。据え置きまたは1段階引き上げの可能性を残します。'],
        ['為替負担は継続','USD/KRWは航空会社の燃料費負担を高める要因です。','高いUSD/KRWが続けば、航空会社のドル建て燃料費とウォン換算コストが増えます。為替見通しは7月の航空券燃油サーチャージ判断で原油価格と同じくらい重要です。','上昇要因。KRWベースの引き下げ余地を制限します。'],
        ['7月見通し','現在は引き上げより据え置きの可能性がやや優勢です。','最新確率は据え置き50〜55%、1段階引き上げ30〜40%、2段階以上10%以下です。6月5日の拮抗状態から6月8日は据え置き優勢に移りましたが、MOPSとUSD/KRW負担により引き下げ見通しではありません。','中立〜緩和。7月金額はまだ公式公示前です。']
      ]
    },
    zh: {
      updatedAt:'2026.06.08 09:00 KST更新', sourceName:'2026年7月燃油附加费展望更新',
      tags:['NEW','燃油附加费','MOPS','航空燃油价格','国际油价','布伦特','WTI','美元/韩元','霍尔木兹海峡'],
      link:'查看2026年7月展望',
      faq:[
        {q:'2026年7月燃油附加费会上调吗？',a:'目前维持不变的可能性最高，为50–55%，但部分航空公司仍有上调一级的可能。'},
        {q:'国际油价下降，为什么燃油附加费不会马上下降？',a:'因为燃油附加费不仅反映国际油价，也会反映MOPS航空燃油价格和美元/韩元汇率。'},
        {q:'霍尔木兹海峡局势稳定了吗？',a:'部分航行仍在继续，但难以视为已经正常化。'},
        {q:'MOPS为什么重要？',a:'MOPS是韩国航空公司计算燃油附加费时直接参考的航空燃油价格指标。'}
      ],
      rows:[
        ['油价稳定但MOPS压力持续，7月燃油附加费维持可能性扩大','截至2026年6月8日，国际油价较近期高点有所稳定，但MOPS航空燃油价格和美元/韩元压力仍在。','霍尔木兹海峡风险尚未完全解除，2026年7月燃油附加费再次偏向维持不变。布伦特和WTI稳定降低上调压力，但航空燃油价格和汇率展望仍是主要航空公司判断中的重要变量。','维持不变占优。但由于MOPS和美元/韩元压力，尚不是下调展望。'],
        ['国际油价稳定','布伦特和WTI较近期高点有所稳定。','油价稳定降低了2026年7月燃油附加费的上行压力，但中东风险和库存下降问题仍在，难以断定航空票价燃油附加费会下调。','缓和因素。提高维持不变的可能性。'],
        ['霍尔木兹风险持续','尚无正常化声明，地缘政治风险溢价仍在。','霍尔木兹海峡仍有部分油轮航行和绕行运输，但没有正常化声明。保险费压力和地缘政治溢价继续影响航空燃油价格和附加费展望。','上行因素。限制明确下调展望。'],
        ['MOPS维持强势','航空燃油需求增加和夏季旺季使MOPS保持强势。','MOPS是直接反映在韩国航空公司燃油附加费计算中的航空燃油指标。若因国际线需求和暑期旺季继续强势，7月应解读为维持或部分上调，而不是下调。','上行因素。保留维持或上调一级的可能。'],
        ['汇率压力持续','美元/韩元仍是提高航空公司燃油成本压力的因素。','如果美元/韩元保持高位，航空公司的美元燃油支出和韩元计价成本会增加。汇率展望在2026年7月燃油附加费判断中与国际油价同样重要。','上行因素。限制韩元基准下调空间。'],
        ['7月展望','目前维持不变的可能性略高于上调。','最新概率为维持不变50–55%、上调一级30–40%、上调两级以上10%以下。6月5日仍是维持与上调竞争，6月8日转向维持占优，但MOPS和美元/韩元压力意味着并非下调展望。','中性至缓和。7月金额尚未官方公告。']
      ]
    },
    fr: {
      updatedAt:'Mis à jour le 2026.06.08 09:00 KST', sourceName:'Mise à jour des perspectives de surtaxe carburant juillet 2026',
      tags:['NEW','surtaxe carburant','MOPS','carburant aviation','prix du pétrole','Brent','WTI','USD/KRW','détroit d’Ormuz'],
      link:'Voir les perspectives juillet 2026',
      faq:faqEn,
      rows:[
        ['Le pétrole se stabilise, mais la pression MOPS maintient le statu quo plus probable en juillet','Au 8 juin 2026, le pétrole a reculé par rapport aux récents sommets, tandis que le MOPS et l’USD/KRW restent contraignants.','Le risque dans le détroit d’Ormuz n’étant pas totalement résolu, les surtaxes carburant de juillet 2026 penchent de nouveau vers le statu quo. La stabilisation du Brent et du WTI réduit la pression haussière, mais le carburant aviation et le change restent essentiels.','Statu quo privilégié, mais pas de scénario de baisse à cause du MOPS et du change.'],
        ['Les prix du pétrole se stabilisent','Le Brent et le WTI se sont quelque peu stabilisés depuis leurs récents sommets.','Cette stabilisation réduit la pression haussière sur les surtaxes de juillet 2026, mais le risque au Moyen-Orient et les stocks limitent l’hypothèse d’une baisse directe.','Facteur d’allègement. Soutient le scénario de statu quo.'],
        ['Le risque Ormuz continue','Aucune normalisation n’est déclarée et une prime de risque géopolitique demeure.','Autour du détroit d’Ormuz, certaines opérations et reroutages se poursuivent, mais le transit normal n’est pas déclaré. Les coûts d’assurance et les primes géopolitiques continuent d’influencer le carburant aviation.','Facteur haussier. Limite un scénario clair de baisse.'],
        ['Le MOPS reste ferme','La demande de carburant aviation et la saison estivale maintiennent le MOPS ferme.','Le MOPS est l’indice de carburant aviation directement reflété dans le calcul des surtaxes des compagnies coréennes. S’il reste ferme, juillet doit être lu comme statu quo ou possible hausse plutôt que baisse.','Facteur haussier. Maintient le risque d’une hausse d’un palier.'],
        ['La pression de change persiste','L’USD/KRW reste un facteur augmentant la pression sur les coûts carburant des compagnies.','Si l’USD/KRW reste élevé, les coûts de carburant libellés en dollars et les coûts en KRW augmentent. Le change reste central dans l’analyse de juillet.','Facteur haussier. Limite les baisses en KRW.'],
        ['Perspectives de juillet','Le statu quo est désormais un peu plus probable qu’une hausse.','Les probabilités actuelles sont: statu quo 50-55%, hausse d’un palier 30-40%, deux paliers ou plus 10% ou moins. Le scénario est passé d’un duel à un biais statu quo, sans devenir un scénario de baisse.','Neutre à allègement. Les montants de juillet ne sont pas encore officiels.']
      ]
    },
    de: {
      updatedAt:'Aktualisiert 2026.06.08 09:00 KST', sourceName:'Update zur Prognose der Treibstoffzuschläge Juli 2026',
      tags:['NEW','Treibstoffzuschlag','MOPS','Kerosinpreis','Ölpreise','Brent','WTI','USD/KRW','Straße von Hormus'],
      link:'Prognose Juli 2026 ansehen',
      faq:faqEn,
      rows:[
        ['Öl stabilisiert sich, doch MOPS-Druck macht unverändert im Juli wahrscheinlicher','Stand 8. Juni 2026 haben sich Ölpreise von jüngsten Hochs gelöst, während MOPS-Kerosin und USD/KRW belastend bleiben.','Da das Risiko in der Straße von Hormus nicht vollständig gelöst ist, tendieren die Treibstoffzuschläge für Juli 2026 wieder zu unverändert. Brent- und WTI-Stabilisierung senken den Erhöhungsdruck, aber Kerosinpreise und FX bleiben wichtig.','Unverändert bevorzugt, aber wegen MOPS und FX kein Senkungsausblick.'],
        ['Ölpreise stabilisieren sich','Brent und WTI haben sich von jüngsten Hochs etwas stabilisiert.','Die Stabilisierung senkt den Aufwärtsdruck auf Juli-Zuschläge, doch Nahostrisiken und Lagerbestände machen eine direkte Senkung schwer.','Entlastungsfaktor. Unterstützt das unverändert-Szenario.'],
        ['Hormus-Risiko hält an','Es gibt keine Normalisierungserklärung; eine geopolitische Risikoprämie bleibt.','Rund um die Straße von Hormus laufen einige Tankerfahrten und Umleitungen weiter, aber Normalbetrieb ist nicht erklärt. Versicherungs- und Risikoprämien beeinflussen weiter Kerosinpreise.','Aufwärtsfaktor. Begrenzt einen klaren Senkungsausblick.'],
        ['MOPS bleibt fest','Höhere Kerosinnachfrage und Sommersaison halten MOPS fest.','MOPS ist der Kerosin-Benchmark, der direkt in koreanische Airline-Zuschläge einfließt. Bleibt MOPS fest, ist Juli eher unverändert oder teilweise höher als niedriger.','Aufwärtsfaktor. Hält Risiko einer Stufe höher aufrecht.'],
        ['FX-Belastung bleibt','USD/KRW erhöht weiter den Kostendruck bei Airline-Treibstoff.','Bleibt USD/KRW hoch, steigen dollarbasierte Treibstoffkosten und KRW-Kosten. Der FX-Ausblick ist für Juli ähnlich wichtig wie Öl.','Aufwärtsfaktor. Begrenzt KRW-basierte Senkungen.'],
        ['Juli-Ausblick','Unverändert ist derzeit etwas wahrscheinlicher als eine Erhöhung.','Aktuelle Wahrscheinlichkeiten: unverändert 50-55%, eine Stufe höher 30-40%, zwei oder mehr Stufen höchstens 10%. Der Ausblick ist von Konkurrenz zu unverändert-Tendenz gewechselt, aber nicht zu Senkung.','Neutral bis entlastend. Juli-Beträge sind noch nicht offiziell.']
      ]
    }
  };
  Object.keys(localized).forEach(function(lang){
    var pack = localized[lang];
    window.AERO_NEWS_CARDS_20260608.forEach(function(card, idx){
      var row = pack.rows[idx];
      card.i18n[lang]={
        updatedAt:pack.updatedAt,title:row[0],aiBrief:row[1],summary:row[2],impact:row[3],
        sourceName:pack.sourceName,tags:pack.tags,faq:pack.faq,
        links:[{href:'forecast.html',label:pack.link}]
      };
    });
  });
})();

window.AERO_NEWS_LATEST = window.AERO_MARKET_BRIEF_20260608;

/* 2026.06.10 11:00 KST market brief and news cards. */
window.AERO_MARKET_BRIEF_20260610 = {
  date:'2026-06-10',
  displayTime:'2026.06.10 11:00 KST',
  title:'호르무즈 해협 개방 신호와 유가 안정, 7월 유류할증료 동결 가능성 확대',
  summary:'호르무즈 해협 리스크와 국제유가는 6월 초보다 완화됐지만 MOPS 항공유 가격과 높은 원달러 환율 부담은 남아 있습니다.',
  outlook:{freeze:'55~60%',oneStep:'25~35%',twoPlus:'10% 이하'},
  keywords:['유류할증료','2026년 7월 유류할증료','MOPS','항공유 가격','국제유가','브렌트유','WTI','원달러 환율','호르무즈 해협','OPEC+']
};

(function(){
  var rows = {
    ko:[
      ['호르무즈 해협 개방 신호와 유가 안정, 7월 유류할증료 동결 가능성 확대','동결 55~60%가 가장 높은 시나리오입니다.','호르무즈 해협 리스크는 완화됐고 국제유가도 6월 초 고점보다 안정됐습니다. 다만 MOPS 항공유 가격과 높은 원달러 환율 때문에 인하보다 동결, 일부 항공사의 1단계 인상 가능성을 함께 봐야 합니다.'],
      ['호르무즈 개방 신호','완전 봉쇄 위험은 낮아졌습니다.','선박 통행 증가 조짐은 긍정적이지만 통행료, 보험료와 지정학적 프리미엄은 남아 있습니다.'],
      ['국제유가 안정','브렌트유는 90달러 초반 수준입니다.','WTI도 80달러 후반에서 90달러 부근으로 안정돼 유류할증료 인상 압력을 낮추고 있습니다.'],
      ['OPEC+ 증산 기대','추가 공급 기대가 가격 상단을 제한합니다.','OPEC+ 증산 기대와 중국 원유 수입 둔화가 국제유가의 100달러 돌파 가능성을 낮추는 요인입니다.'],
      ['MOPS 부담 지속','항공유 가격 부담은 여전히 남아 있습니다.','여름 성수기 항공 수요로 MOPS 하락 폭이 제한될 수 있어 국제유가 안정이 바로 유류할증료 인하로 이어지지는 않습니다.'],
      ['7월 전망','현재는 동결 가능성이 가장 높습니다.','동결 55~60%, 1단계 인상 25~35%, 2단계 이상 인상 10% 이하로 보며 공식 공시 전까지 변동 가능성이 있습니다.']
    ],
    en:[
      ['Hormuz reopening signals and steadier oil raise the chance of a July fuel-surcharge freeze','A freeze at 55-60% is the leading scenario.','Hormuz and oil risks have eased from early June, but MOPS jet fuel and elevated USD/KRW still favor a freeze over a cut, with a one-step increase possible for some airlines.'],
      ['Hormuz reopening signals','The risk of a complete closure has declined.','Rising vessel traffic is positive, but possible tolls, insurance costs and geopolitical premiums remain.'],
      ['Oil prices stabilize','Brent is in the low $90s per barrel.','WTI is in the high $80s to around $90, reducing upward pressure on fuel surcharges.'],
      ['OPEC+ supply expectations','Expected additional supply is capping prices.','OPEC+ supply expectations and slower Chinese crude imports reduce the chance of oil breaking above $100.'],
      ['MOPS burden persists','Jet-fuel cost pressure remains.','Peak summer demand may limit MOPS declines, so steadier crude oil does not immediately translate into lower surcharges.'],
      ['July outlook','A freeze is currently the most likely result.','Freeze 55-60%, one-step increase 25-35%, and two steps or more at 10% or less, subject to official airline filings.']
    ],
    ja:[
      ['ホルムズ海峡の開放兆候と原油安定で7月燃油サーチャージ据え置きの可能性上昇','据え置き55〜60%が最有力です。','ホルムズ海峡と原油のリスクは緩和しましたが、MOPSと高いUSD/KRWにより引き下げより据え置きが有力です。'],
      ['ホルムズ開放の兆候','完全封鎖の可能性は低下しました。','船舶通行の増加は好材料ですが、通行料、保険料、地政学プレミアムは残ります。'],
      ['原油価格が安定','ブレントは1バレル90ドル台前半です。','WTIも80ドル台後半から90ドル付近で安定しています。'],
      ['OPEC+増産期待','追加供給期待が上値を抑えています。','OPEC+増産期待が100ドル突破の可能性を低下させています。'],
      ['MOPS負担は継続','航空燃料価格の負担は残っています。','夏季需要でMOPSの下落幅が限られる可能性があります。'],
      ['7月見通し','据え置きが最も有力です。','据え置き55〜60%、1段階引き上げ25〜35%、2段階以上10%以下です。']
    ],
    zh:[
      ['霍尔木兹海峡开放信号与油价稳定提高7月燃油附加费维持概率','维持不变55–60%为最可能情景。','霍尔木兹和油价风险有所缓和，但MOPS与高位美元/韩元仍使维持不变比下调更可能。'],
      ['霍尔木兹开放信号','完全封锁风险已经下降。','船舶通行增加是积极信号，但通行费、保险费和地缘政治溢价仍然存在。'],
      ['国际油价稳定','布伦特原油处于每桶90美元出头。','WTI在80美元后段至90美元附近。'],
      ['OPEC+增产预期','新增供应预期限制价格上沿。','OPEC+增产预期降低油价突破100美元的可能。'],
      ['MOPS压力持续','航空燃油成本压力仍在。','暑期需求可能限制MOPS跌幅。'],
      ['7月展望','目前维持不变概率最高。','维持55–60%，上调一级25–35%，上调两级以上10%以下。']
    ],
    fr:[
      ['Les signaux de réouverture d’Ormuz renforcent le statu quo en juillet','Le statu quo à 55-60% est le scénario principal.','Les risques ont diminué, mais le MOPS et un USD/KRW élevé favorisent le statu quo plutôt qu’une baisse.'],
      ['Réouverture d’Ormuz','Le risque de fermeture totale a diminué.','Trafic en hausse, mais péages, assurance et prime géopolitique subsistent.'],
      ['Pétrole stabilisé','Le Brent se situe au début des 90 dollars.','Le WTI évolue entre la fin des 80 dollars et environ 90 dollars.'],
      ['Attentes OPEC+','L’offre attendue plafonne les prix.','Les attentes de hausse de l’offre limitent le risque de dépasser 100 dollars.'],
      ['Pression MOPS','La charge du carburant aviation demeure.','La demande estivale peut limiter la baisse du MOPS.'],
      ['Perspectives de juillet','Le statu quo est le plus probable.','Statu quo 55-60%, hausse d’un palier 25-35%, deux paliers ou plus 10% ou moins.']
    ],
    de:[
      ['Hormus-Öffnungssignale erhöhen die Chance unveränderter Juli-Zuschläge','Unverändert mit 55-60% ist das Leitszenario.','Die Risiken sind gesunken, doch MOPS und ein hoher USD/KRW sprechen eher für unverändert als für eine Senkung.'],
      ['Hormus-Öffnungssignale','Das Risiko einer vollständigen Sperre ist gesunken.','Mehr Verkehr ist positiv, Gebühren, Versicherung und Risikoprämien bleiben.'],
      ['Ölpreise stabilisieren sich','Brent liegt im niedrigen 90-Dollar-Bereich.','WTI liegt im hohen 80-Dollar-Bereich bis nahe 90 Dollar.'],
      ['OPEC+-Erwartungen','Zusatzangebot begrenzt die Preise.','Höhere Angebotserwartungen senken die Chance auf Öl über 100 Dollar.'],
      ['MOPS-Belastung','Der Kerosin-Kostendruck besteht fort.','Sommernachfrage kann MOPS-Rückgänge begrenzen.'],
      ['Juli-Ausblick','Unverändert ist am wahrscheinlichsten.','Unverändert 55-60%, eine Stufe höher 25-35%, zwei oder mehr Stufen höchstens 10%.']
    ]
  };
  var ids=['main','hormuz','oil','opec','mops','outlook'];
  var categories=['market','market','market','market','market','market'];
  window.AERO_NEWS_CARDS_20260610=rows.ko.map(function(row,idx){
    var card={
      id:'news-20260610-'+ids[idx],slug:'june-10-'+ids[idx],category:categories[idx],topic:ids[idx],priority:1,
      date:'2026-06-10',updatedAt:'2026.06.10 11:00 KST 업데이트',badge:'NEW',aiSummary:true,relevanceScore:1,
      currentMonthNotice:'2026-06',forecastTargetMonth:'2026-07',
      title:row[0],aiBrief:row[1],summary:row[2],impact:'2026년 7월 유류할증료 판단 변수입니다.',
      sourceName:'2026년 7월 유류할증료 전망 업데이트',sourceUrl:'forecast.html',
      tags:window.AERO_MARKET_BRIEF_20260610.keywords.slice(),
      links:[{href:'forecast.html',label:'2026년 7월 전망 보기'}],i18n:{}
    };
    ['en','ja','zh','fr','de'].forEach(function(lang){
      var translated=rows[lang][idx];
      card.i18n[lang]={
        updatedAt:'2026.06.10 11:00 KST',title:translated[0],aiBrief:translated[1],
        summary:translated[2],impact:translated[1],
        sourceName:'July 2026 fuel surcharge outlook update',
        tags:window.AERO_MARKET_BRIEF_20260610.keywords.slice(),
        links:[{href:'forecast.html',label:'View July 2026 outlook'}]
      };
    });
    return card;
  });
})();

window.AERO_NEWS_LATEST = window.AERO_MARKET_BRIEF_20260610;

Object.assign(window.I18N_SHARED.ja, {
  marketDataRef:'2026.06.10 11:00 KST時点',
  marketBrent:'国際原油価格: ブレントは6月初めの高値から安定し、OPEC+の増産期待が急騰を抑えています。',
  marketMops:'航空燃料価格(MOPS): 原油は安定しましたが、航空燃料負担と繁忙期需要が引き下げ余地を制限します。',
  marketFx:'USD/KRW: 高い為替水準はドル建て燃料費を押し上げ、KRW基準の引き下げ余地を縮小します。',
  marketGeo:'ホルムズ海峡: 開放兆候と船舶通行増加が見られますが、完全正常化までは地政学プレミアムが残ります。',
  marketOutlook:'7月は据え置き55〜60%、1段階引き上げ25〜35%、2段階以上10%以下と見ます。'
});
Object.assign(window.I18N_SHARED.zh, {
  marketDataRef:'截至2026.06.10 11:00 KST',
  marketBrent:'国际油价：布伦特较6月初高点稳定，OPEC+增产预期限制再次大幅上涨。',
  marketMops:'航空燃油价格(MOPS)：油价稳定，但航空燃油成本与旺季需求仍限制下调空间。',
  marketFx:'美元/韩元：高汇率会增加美元燃油成本，减少韩元基准燃油附加费下调空间。',
  marketGeo:'霍尔木兹海峡：出现开放与船舶通行增加信号，但完全正常化前仍有地缘政治溢价。',
  marketOutlook:'7月维持不变55–60%，上调一级25–35%，上调两级以上10%以下。'
});
Object.assign(window.I18N_SHARED.fr, {
  marketDataRef:'Au 2026.06.10 11:00 KST',
  marketBrent:'Pétrole: le Brent s’est stabilisé depuis les sommets de début juin et les attentes OPEC+ limitent une nouvelle flambée.',
  marketMops:'MOPS: le pétrole est plus stable, mais le coût du carburant aviation et la demande estivale limitent une baisse.',
  marketFx:'USD/KRW: un change élevé accroît les coûts en dollars et réduit la marge de baisse en KRW.',
  marketGeo:'Détroit d’Ormuz: les signaux de réouverture sont positifs, mais une prime géopolitique demeure avant normalisation complète.',
  marketOutlook:'Juillet: statu quo 55-60%, hausse d’un palier 25-35%, deux paliers ou plus 10% ou moins.'
});
Object.assign(window.I18N_SHARED.de, {
  marketDataRef:'Stand 2026.06.10 11:00 KST',
  marketBrent:'Öl: Brent hat sich von den Hochs Anfang Juni stabilisiert; OPEC+-Angebotserwartungen begrenzen einen neuen Sprung.',
  marketMops:'MOPS: Stabileres Öl hilft, doch Kerosinkosten und Sommernachfrage begrenzen eine Senkung.',
  marketFx:'USD/KRW: Ein hoher Wechselkurs erhöht Dollarkosten und verringert den Spielraum für KRW-basierte Senkungen.',
  marketGeo:'Straße von Hormus: Öffnungssignale sind positiv, doch bis zur Normalisierung bleibt eine geopolitische Prämie.',
  marketOutlook:'Juli: unverändert 55-60%, eine Stufe höher 25-35%, zwei oder mehr Stufen höchstens 10%.'
});

/* 2026.06.12 06:00 KST market brief and news cards. */
window.AERO_MARKET_BRIEF_20260612 = {
  asOf:'2026.06.12 06:00 KST',
  currentMonthNotice:'2026-06',
  forecastTargetMonth:'2026-07',
  freezeProbability:'60~65%',
  oneStepProbability:'25~30%',
  twoStepProbability:'10% 이하',
  keywords:['유류할증료','2026년 7월 유류할증료','MOPS','항공유 가격','국제유가','브렌트유','WTI','원달러 환율','호르무즈 해협','OPEC+']
};
(function(){
  var rows={
    ko:[
      ['국제유가 안정세 지속, 7월 유류할증료 동결 가능성 확대','동결 60~65%가 가장 유력합니다.','브렌트유 $90.38/bbl, WTI $87.71/bbl로 6월 초 고점보다 안정됐습니다. MOPS와 원달러 환율 부담은 남아 있어 인하보다 동결 가능성이 높습니다.'],
      ['국제유가 안정세','브렌트유와 WTI가 6월 초 고점보다 낮아졌습니다.','6월 11일 종가는 브렌트유 $90.38/bbl, WTI $87.71/bbl로 확인됩니다.'],
      ['호르무즈 리스크 완화','완전 정상화는 아니지만 전면 봉쇄 위험은 낮아졌습니다.','우회 수송과 공급망 적응이 진행됐지만 보험료와 지정학 프리미엄은 남아 있습니다.'],
      ['MOPS 하락 제한','항공유 가격은 국제유가보다 완만하게 움직일 수 있습니다.','여름 성수기와 국제선 수요가 MOPS 하락 폭을 제한해 유류할증료 인하 가능성을 낮춥니다.'],
      ['환율 부담 지속','높은 원달러 환율은 항공사의 원화 환산 연료비를 높입니다.','환율은 인하 요인보다 동결 요인으로 작용하고 있습니다.'],
      ['7월 전망','현재는 인상보다 동결 가능성이 가장 높습니다.','동결 60~65%, 1단계 인상 25~30%, 2단계 이상 인상 10% 이하로 판단합니다.']
    ],
    en:[
      ['Steadier oil raises the probability of a July fuel-surcharge freeze','A freeze at 60-65% is the leading scenario.','Brent closed at $90.38/bbl and WTI at $87.71/bbl, below early-June highs. MOPS and USD/KRW pressure still favor a freeze over a cut.'],
      ['Oil stabilizes','Brent and WTI are below early-June highs.','The June 11 close was $90.38/bbl for Brent and $87.71/bbl for WTI.'],
      ['Hormuz risk eases','Full normalization has not occurred, but complete-closure risk has declined.','Rerouting and supply-chain adaptation help, while insurance and geopolitical premiums remain.'],
      ['MOPS decline remains limited','Jet fuel can decline more slowly than crude oil.','Peak-season and international demand may limit MOPS declines and reduce the chance of a surcharge cut.'],
      ['FX pressure remains','Elevated USD/KRW raises airlines’ KRW-equivalent fuel costs.','FX currently supports a freeze rather than a cut.'],
      ['July outlook','A freeze is more likely than an increase.','Freeze 60-65%, one-step increase 25-30%, and two steps or more 10% or less.']
    ],
    ja:[
      ['原油安定で7月燃油サーチャージ据え置き確率が上昇','据え置き60〜65%が最有力です。','ブレントは$90.38/bbl、WTIは$87.71/bblで6月初めの高値を下回ります。MOPSとUSD/KRW負担により値下げより据え置きが有力です。'],
      ['原油価格が安定','ブレントとWTIは6月初めの高値を下回りました。','6月11日終値はブレント$90.38/bbl、WTI$87.71/bblです。'],
      ['ホルムズリスク緩和','完全正常化ではありませんが全面封鎖リスクは低下しました。','迂回輸送と供給網の適応が進む一方、保険料と地政学プレミアムは残ります。'],
      ['MOPS下落は限定的','航空燃料は原油より緩やかに下落する可能性があります。','夏季需要がMOPSの下落幅を制限します。'],
      ['為替負担継続','高いUSD/KRWは航空会社の燃料費を押し上げます。','為替は値下げより据え置き要因です。'],
      ['7月見通し','引き上げより据え置きが有力です。','据え置き60〜65%、1段階引き上げ25〜30%、2段階以上10%以下です。']
    ],
    zh:[
      ['油价趋稳提高7月燃油附加费维持概率','维持不变60–65%为最可能情景。','布伦特收于$90.38/bbl，WTI收于$87.71/bbl，低于6月初高点。MOPS与美元/韩元压力使维持不变比下调更可能。'],
      ['国际油价趋稳','布伦特和WTI低于6月初高点。','6月11日收盘价为布伦特$90.38/bbl、WTI $87.71/bbl。'],
      ['霍尔木兹风险缓和','尚未完全正常化，但全面封锁风险下降。','绕行运输和供应链适应在推进，保险费与地缘溢价仍存在。'],
      ['MOPS跌幅有限','航空燃油可能比原油下降得更慢。','暑期和国际线需求限制MOPS跌幅。'],
      ['汇率压力持续','高位美元/韩元提高航空公司的韩元燃油成本。','汇率更支持维持而非下调。'],
      ['7月展望','维持不变比上调更可能。','维持60–65%，上调一级25–30%，上调两级以上10%以下。']
    ],
    fr:[
      ['La stabilisation du pétrole renforce le statu quo en juillet','Le statu quo à 60-65% est le scénario principal.','Le Brent a clôturé à 90,38 $/bbl et le WTI à 87,71 $/bbl. Le MOPS et l’USD/KRW favorisent le statu quo plutôt qu’une baisse.'],
      ['Pétrole stabilisé','Le Brent et le WTI sont sous les sommets de début juin.','Clôture du 11 juin: Brent 90,38 $/bbl, WTI 87,71 $/bbl.'],
      ['Risque d’Ormuz en baisse','La normalisation n’est pas totale, mais le risque de fermeture complète diminue.','Les détours progressent; assurance et prime géopolitique subsistent.'],
      ['Baisse MOPS limitée','Le carburant aviation peut baisser moins vite que le brut.','La demande estivale limite le recul du MOPS.'],
      ['Pression du change','Un USD/KRW élevé augmente le coût du carburant en KRW.','Le change favorise le statu quo plutôt qu’une baisse.'],
      ['Perspectives de juillet','Le statu quo est plus probable qu’une hausse.','Statu quo 60-65%, hausse d’un palier 25-30%, deux paliers ou plus 10% ou moins.']
    ],
    de:[
      ['Stabileres Öl erhöht die Chance unveränderter Juli-Zuschläge','Unverändert mit 60-65% ist das Leitszenario.','Brent schloss bei 90,38 $/bbl und WTI bei 87,71 $/bbl. MOPS und USD/KRW sprechen eher für unverändert als für eine Senkung.'],
      ['Ölpreise stabilisieren sich','Brent und WTI liegen unter den Hochs Anfang Juni.','Schluss am 11. Juni: Brent 90,38 $/bbl, WTI 87,71 $/bbl.'],
      ['Hormus-Risiko sinkt','Keine vollständige Normalisierung, aber geringeres Sperrrisiko.','Umleitungen nehmen zu; Versicherungs- und Risikoprämien bleiben.'],
      ['MOPS-Rückgang begrenzt','Kerosin kann langsamer als Rohöl fallen.','Sommernachfrage begrenzt den MOPS-Rückgang.'],
      ['FX-Belastung bleibt','Ein hoher USD/KRW erhöht die Treibstoffkosten in KRW.','FX stützt unverändert statt einer Senkung.'],
      ['Juli-Ausblick','Unverändert ist wahrscheinlicher als eine Erhöhung.','Unverändert 60-65%, eine Stufe höher 25-30%, zwei oder mehr Stufen höchstens 10%.']
    ]
  };
  var ids=['main','oil','hormuz','mops','fx','outlook'];
  var categories=['market','market','market','market','market','market'];
  window.AERO_NEWS_CARDS_20260612=rows.ko.map(function(row,idx){
    var card={
      id:'news-20260612-'+ids[idx],slug:'june-12-'+ids[idx],category:categories[idx],topic:ids[idx],priority:idx+1,
      date:'2026-06-12',updatedAt:'2026.06.12 06:00 KST 업데이트',badge:'NEW',aiSummary:true,relevanceScore:1,
      currentMonthNotice:'2026-06',forecastTargetMonth:'2026-07',
      title:row[0],aiBrief:row[1],summary:row[2],impact:'2026년 7월 유류할증료 판단 변수입니다.',
      sourceName:'2026년 7월 유류할증료 전망 업데이트',sourceUrl:'forecast.html',
      tags:window.AERO_MARKET_BRIEF_20260612.keywords.slice(),
      links:[{href:'forecast.html',label:'2026년 7월 전망 보기'}],i18n:{}
    };
    ['en','ja','zh','fr','de'].forEach(function(lang){
      var translated=rows[lang][idx];
      card.i18n[lang]={
        updatedAt:'2026.06.12 06:00 KST',title:translated[0],aiBrief:translated[1],summary:translated[2],impact:translated[1],
        sourceName:'July 2026 fuel surcharge outlook update',
        tags:window.AERO_MARKET_BRIEF_20260612.keywords.slice(),
        links:[{href:'forecast.html',label:'View July 2026 outlook'}]
      };
    });
    return card;
  });
})();

/* 2026.06.15 09:10 KST market brief and news cards. */
window.AERO_MARKET_BRIEF_20260615 = {
  asOf:'2026.06.15 09:10 KST',
  currentMonthNotice:'2026-06',
  forecastTargetMonth:'2026-07',
  probabilities:{freeze:'70~75%',oneStepIncrease:'15~20%',twoStepOrMore:'5% 이하'},
  keywords:['유류할증료','2026년 7월 유류할증료','항공권 유류할증료','MOPS','항공유 가격','국제유가','브렌트유','WTI','원달러 환율','환율 전망','호르무즈 해협','호르무즈 재개방','OPEC+','미국-이란 평화 합의']
};
(function(){
  var ids=['main','hormuz','oil','opec','mops','outlook'];
  var ko=[
    ['호르무즈 재개방 합의와 국제유가 급락, 7월 유류할증료 동결 사실상 유력','동결 70~75%가 핵심 시나리오입니다.','미국과 이란의 합의 발표에 호르무즈 해협 재개방 기대가 커지며 국제유가가 급락했습니다. 다만 정식 서명과 실제 물류 정상화, MOPS와 원달러 환율의 시차 반영이 남아 있어 즉시 인하로 단정하기는 어렵습니다.'],
    ['호르무즈 해협 재개방 기대','정식 서명과 실제 운항 정상화 여부를 확인해야 합니다.','합의 발표로 전면 봉쇄 위험은 크게 낮아졌지만 보험료, 선박 통행량과 물류 정상화에는 시간이 필요할 수 있습니다.'],
    ['국제유가 급락','브렌트유와 WTI가 6월 초 고점 대비 크게 낮아졌습니다.','2026년 6월 15일 09:10 KST 시장 반응 기준 브렌트유는 약 $83.90/bbl, WTI는 약 $81.07/bbl입니다.'],
    ['공급 정상화 기대','호르무즈 재개방과 OPEC+ 공급 확대 기대가 급등 위험을 낮춥니다.','걸프 지역 수출 회복 기대와 OPEC+ 증산 기조는 국제유가 상단을 제한하는 요인입니다.'],
    ['MOPS의 시차 반영','원유 급락이 항공유 가격에 즉시 같은 폭으로 반영되지는 않습니다.','여름 성수기 항공 수요와 정제·물류 비용 때문에 MOPS 하락은 국제유가보다 늦고 완만할 수 있습니다.'],
    ['7월 전망','동결 가능성이 매우 높아졌습니다.','동결 70~75%, 1단계 인상 15~20%, 2단계 이상 인상 5% 이하입니다. 8월 이후에는 하락 신호가 더 뚜렷해질 수 있습니다.']
  ];
  var en=[
    ['Hormuz reopening framework and oil selloff make a July freeze highly likely','A freeze at 70-75% is the core scenario.','The U.S.-Iran framework raised expectations for reopening the Strait of Hormuz and pushed oil sharply lower. Formal signing, actual shipping normalization, and delayed MOPS and FX transmission still prevent an immediate cut call.'],
    ['Hormuz reopening expectations','Formal signing and actual shipping normalization still need confirmation.','The announcement sharply reduced full-closure risk, but insurance, vessel traffic and logistics may take time to normalize.'],
    ['Oil prices plunge','Brent and WTI are well below early-June highs.','At the June 15 09:10 KST market snapshot, Brent was about $83.90/bbl and WTI about $81.07/bbl.'],
    ['Supply normalization expectations','Hormuz reopening and OPEC+ supply expectations reduce spike risk.','Expected Gulf export recovery and OPEC+ supply growth cap the upside for crude oil.'],
    ['Delayed MOPS transmission','Jet fuel does not necessarily fall as quickly as crude oil.','Peak-season aviation demand plus refining and logistics costs can make MOPS decline later and more gradually.'],
    ['July outlook','A freeze is now highly likely.','Freeze 70-75%, one-step increase 15-20%, and two steps or more 5% or less. A clearer downward signal may appear from August.']
  ];
  var localized={
    ja:{main:'ホルムズ海峡再開合意と原油急落で7月据え置きが有力',line:'据え置き70〜75%、1段階引き上げ15〜20%、2段階以上5%以下。原油下落はMOPSに遅れて反映されます。'},
    zh:{main:'霍尔木兹海峡重开框架与油价大跌使7月维持不变更可能',line:'维持70–75%，上调一级15–20%，上调两级以上不超过5%。原油下跌会延迟传导至MOPS。'},
    fr:{main:'Le cadre de réouverture d’Ormuz et la chute du pétrole renforcent le statu quo en juillet',line:'Statu quo 70-75%, hausse d’un palier 15-20%, deux paliers ou plus 5% ou moins. La baisse du brut se transmet au MOPS avec retard.'},
    de:{main:'Hormus-Rahmenabkommen und Ölpreisrückgang machen unveränderte Juli-Zuschläge sehr wahrscheinlich',line:'Unverändert 70-75%, eine Stufe höher 15-20%, zwei oder mehr Stufen höchstens 5%. Der Ölpreisrückgang wirkt verzögert auf MOPS.'}
  };
  window.AERO_NEWS_CARDS_20260615=ko.map(function(row,idx){
    var card={
      id:'news-20260615-'+ids[idx],slug:'june-15-'+ids[idx],category:'market',topic:ids[idx],
      priority:idx+1,date:'2026-06-15',updatedAt:'2026.06.15 09:10 KST 업데이트',
      badge:'NEW',aiSummary:true,relevanceScore:1,currentMonthNotice:'2026-06',forecastTargetMonth:'2026-07',
      title:row[0],aiBrief:row[1],summary:row[2],impact:'2026년 7월 유류할증료 동결 가능성을 높이는 변수입니다.',
      tags:window.AERO_MARKET_BRIEF_20260615.keywords.slice(),
      links:[{href:'forecast.html',label:'2026년 7월 전망 보기'}],i18n:{}
    };
    card.i18n.en={updatedAt:'Updated 2026.06.15 09:10 KST',title:en[idx][0],aiBrief:en[idx][1],summary:en[idx][2],impact:en[idx][1],tags:['fuel surcharge','July 2026','MOPS','jet fuel','oil','Brent','WTI','USD/KRW','Hormuz','OPEC+'],links:[{href:'forecast.html',label:'View July 2026 outlook'}]};
    Object.keys(localized).forEach(function(lang){
      var pack=localized[lang];
      card.i18n[lang]={updatedAt:'2026.06.15 09:10 KST',title:idx===0?pack.main:(en[idx][0]),aiBrief:pack.line,summary:pack.line,impact:pack.line,tags:card.i18n.en.tags,links:[{href:'forecast.html',label:'July 2026 outlook'}]};
    });
    return card;
  });
})();
window.AERO_NEWS_LATEST=window.AERO_MARKET_BRIEF_20260615;

/* 2026.06.16 09:30 KST market brief and news cards. */
window.AERO_MARKET_BRIEF_20260616 = {
  asOf:'2026.06.16 09:30 KST',
  currentMonthNotice:'2026-06',
  forecastTargetMonth:'2026-07',
  probabilities:{direction:'유지 ~ 소폭 인상 가능',sharpCut:'낮음',smallIncrease:'가능'},
  keywords:['유류할증료','2026년 7월 유류할증료 전망','국제선 유류할증료','항공유 가격 전망','MOPS 전망','원달러 환율 전망','호르무즈 해협 영향','대한항공 유류할증료','아시아나 유류할증료','MOPS','항공유','USDKRW','호르무즈','OPEC+']
};
(function(){
  var ids=['peace-draft','hormuz-normalization','mops-pressure','fx-stability','july-outlook'];
  var topics=['geopolitics','hormuz','mops','fx','outlook'];
  var ko=[
    ['미국-이란 평화 합의 초안 발표','호르무즈 해협 재개방 기대가 높아지며 국제 에너지 시장 안정 가능성이 확대되고 있습니다.','미국과 이란의 평화 합의 초안 발표로 호르무즈 해협 재개방 기대가 높아지고 있습니다. 다만 최종 서명과 실제 운송 재개 여부는 계속 확인해야 합니다.',['호르무즈','유가','환율']],
    ['호르무즈 해협 정상화는 아직 진행 중','기뢰 제거와 선박 안전 점검으로 실제 정상화까지는 시간이 더 필요합니다.','재개방 기대와 달리 실제 물류 정상화까지는 상당한 시간이 필요할 것으로 전망됩니다. 보험료와 위험 프리미엄도 단기간에 완전히 사라지기는 어렵습니다.',['호르무즈','원유','물류']],
    ['항공유 가격 상승 압력 지속','중동 공급 불안으로 항공유 가격이 높은 수준을 유지하고 있습니다.','환율 안정에도 불구하고 항공유 가격 상승이 유류할증료 하락을 제한하는 요인으로 작용하고 있습니다. MOPS 전망은 여전히 보수적으로 봐야 합니다.',['MOPS','항공유','유류할증료']],
    ['원달러 환율 안정세','환율은 안정되고 있지만 항공유 가격 상승 영향이 더욱 크게 작용하고 있습니다.','원달러 환율은 안정세를 보이고 있으나 유류할증료 결정에는 항공유 가격 영향이 더욱 크게 작용합니다.',['환율','USDKRW','유류할증료']],
    ['7월 유류할증료 전망','현재 흐름 기준으로는 급격한 인하 가능성이 낮고 현 수준 유지 또는 소폭 인상 가능성이 남아 있습니다.','현재 기준으로는 2026년 7월 국제선 유류할증료가 급격히 인하될 가능성은 낮습니다. 원달러 환율은 일부 안정 흐름을 보이고 있으나, MOPS 항공유 가격과 호르무즈 해협 리스크가 남아 있어 현 수준 유지 또는 소폭 인상 가능성을 함께 열어두어야 합니다.',['유류할증료','전망','항공권']]
  ];
  var en=[
    ['U.S.-Iran peace draft announced','Expectations for reopening the Strait of Hormuz are improving energy-market sentiment.','The U.S.-Iran peace draft raises expectations for reopening Hormuz, but final signing and actual transport recovery still need confirmation.'],
    ['Hormuz normalization is still in progress','Minesweeping and vessel-safety checks mean full logistics normalization may take more time.','Reopening expectations have improved, but shipping, insurance and logistics normalization may take weeks.'],
    ['Jet-fuel price pressure persists','Middle East supply uncertainty keeps jet-fuel prices elevated.','Even with a steadier USD/KRW, high jet-fuel prices and MOPS pressure limit fuel-surcharge cuts.'],
    ['USD/KRW stabilizes','FX pressure is easing, but jet-fuel prices matter more for surcharge decisions.','A steadier USD/KRW helps, but MOPS and jet-fuel costs remain the larger driver.'],
    ['July fuel surcharge outlook','A sharp cut looks unlikely, while unchanged to small increases remain possible.','As of now, a sharp July international fuel surcharge cut is unlikely. USD/KRW is partly stable, but MOPS jet fuel and Hormuz risks remain.']
  ];
  var localized={
    ja:{main:'2026年7月燃油サーチャージ見通し',line:'急激な引き下げの可能性は低く、MOPSとホルムズリスクにより据え置き〜小幅引き上げの可能性があります。'},
    zh:{main:'2026年7月燃油附加费展望',line:'大幅下调可能性较低，MOPS与霍尔木兹风险使维持至小幅上调仍有可能。'},
    fr:{main:'Perspectives de surtaxe carburant juillet 2026',line:'Une forte baisse paraît peu probable; le MOPS et le risque d’Ormuz laissent possible un statu quo ou une légère hausse.'},
    de:{main:'Treibstoffzuschlag-Prognose Juli 2026',line:'Eine starke Senkung ist unwahrscheinlich; MOPS und Hormusrisiken lassen unverändert bis kleine Erhöhung möglich.'}
  };
  window.AERO_NEWS_CARDS_20260616=ko.map(function(row,idx){
    var card={
      id:'news-20260616-'+ids[idx],slug:'june-16-'+ids[idx],category:'market',topic:topics[idx],
      priority:idx+1,date:'2026-06-16',updatedAt:'2026.06.16 09:30 KST 업데이트',
      badge:'NEW',aiSummary:true,relevanceScore:1,currentMonthNotice:'2026-06',forecastTargetMonth:'2026-07',
      title:row[0],aiBrief:row[1],summary:row[2],impact:'2026년 7월 국제선 유류할증료 전망에 영향을 주는 시장 변수입니다.',
      tags:row[3],links:[{href:'forecast.html',label:'2026년 7월 전망 보기'}],i18n:{}
    };
    card.i18n.en={updatedAt:'Updated 2026.06.16 09:30 KST',title:en[idx][0],aiBrief:en[idx][1],summary:en[idx][2],impact:en[idx][1],tags:['fuel surcharge','July 2026','MOPS','jet fuel','USD/KRW','Hormuz','oil'],links:[{href:'forecast.html',label:'View July 2026 outlook'}]};
    Object.keys(localized).forEach(function(lang){
      var pack=localized[lang];
      card.i18n[lang]={updatedAt:'2026.06.16 09:30 KST',title:idx===4?pack.main:en[idx][0],aiBrief:pack.line,summary:pack.line,impact:pack.line,tags:card.i18n.en.tags,links:[{href:'forecast.html',label:'July 2026 outlook'}]};
    });
    return card;
  });
})();

(function(){
  var date = '2026-06-16';
  var updatedKo = '2026.06.16 KST 공식 공시 반영';
  var cards = [
    {
      id:'news-20260616-ke-july-official',
      slug:'korean-air-july-2026-official-surcharge',
      category:'airline',
      topic:'official-notice',
      priority:1,
      title:'대한항공 2026년 7월 국제선 유류할증료 공시 반영',
      aiBrief:'대한항공은 2026년 7월 한국 출발 국제선 유류할증료를 원화 기준으로 공시했습니다.',
      summary:'대한항공 2026년 7월 유류할증료는 거리 구간별 46,400원부터 344,000원까지입니다. 기존 6월 데이터는 보존하고 7월 공식 공시 금액을 별도로 반영했습니다.',
      impact:'공시 확인. 대한항공 이용자는 7월 발권 전 노선별 거리 구간과 항공권 총액을 함께 확인해야 합니다.',
      sourceName:'대한항공 공식 공지',
      sourceUrl:'https://www.koreanair.com/contents/footer/customer-support/notice/2026/2607-infuel?pageNum=1',
      tags:['대한항공 유류할증료','2026년 7월 유류할증료','국제선 유류할증료','항공권 유류할증료'],
      faq:[
        {q:'대한항공 2026년 7월 유류할증료는 확정됐나요?',a:'현재 사이트에는 대한항공 공식 공지 기준으로 2026년 7월 한국 출발 국제선 유류할증료를 공시 반영했습니다.'},
        {q:'대한항공 7월 금액은 어떤 기준으로 표시되나요?',a:'대한항공 공식 공지의 거리 구간별 원화 금액을 그대로 유지해 표시합니다.'}
      ],
      links:[{href:'airlines.html',label:'항공사별 7월 공시 보기'},{href:'forecast.html',label:'7월 공시 반영 현황 보기'}]
    },
    {
      id:'news-20260616-oz-july-official',
      slug:'asiana-july-2026-official-surcharge',
      category:'airline',
      topic:'official-notice',
      priority:1,
      title:'아시아나항공 2026년 7월 국제선 유류할증료 공시 반영',
      aiBrief:'아시아나항공은 2026년 7월 한국 출발 국제선 유류할증료를 원화 기준으로 공시했습니다.',
      summary:'아시아나항공 2026년 7월 유류할증료는 거리 구간별 48,500원부터 275,800원까지입니다. 대한항공과 구간 체계가 다르므로 항공사 공시 기준을 그대로 분리해 반영했습니다.',
      impact:'공시 확인. 아시아나항공은 노선별 적용 구간을 확인한 뒤 대한항공 등 다른 항공사와 총액 기준으로 비교하는 것이 좋습니다.',
      sourceName:'아시아나항공 공식 공지',
      sourceUrl:'https://flyasiana.com/C/KR/KO/customer/notice/detail?id=CM202606160002529424&dispCt=all&page=1&searchOption=0&searchText=',
      tags:['아시아나 유류할증료','2026년 7월 유류할증료','국제선 유류할증료','항공권 유류할증료'],
      faq:[
        {q:'아시아나항공 2026년 7월 유류할증료는 확정됐나요?',a:'현재 사이트에는 아시아나항공 공식 공지 기준으로 2026년 7월 한국 출발 국제선 유류할증료를 공시 반영했습니다.'},
        {q:'대한항공과 아시아나 금액을 바로 같은 구간으로 비교해도 되나요?',a:'두 항공사는 공시 구간과 노선 적용 방식이 다를 수 있으므로 각 항공사 공시 기준을 유지해 비교해야 합니다.'}
      ],
      links:[{href:'airlines.html',label:'항공사별 7월 공시 보기'},{href:'forecast.html',label:'7월 공시 반영 현황 보기'}]
    },
    {
      id:'news-20260616-7c-july-official',
      slug:'jeju-air-july-2026-official-surcharge',
      category:'airline',
      topic:'official-notice',
      priority:1,
      title:'제주항공 2026년 7월 국제선 유류할증료 USD 공시 반영',
      aiBrief:'제주항공은 2026년 7월 한국 출발 국제선 유류할증료를 USD 기준으로 공시했습니다.',
      summary:'제주항공 2026년 7월 유류할증료는 거리 구간별 USD 30부터 USD 72까지입니다. 원화 환산 금액은 선택 통화와 환율 기준에 따라 참고값으로 표시됩니다.',
      impact:'공시 확인. USD 공시 항공사는 발권 시점 환율과 항공권 총액을 함께 보는 것이 중요합니다.',
      sourceName:'제주항공 공식 공지',
      sourceUrl:'https://www.jejuair.net/ko/customerServiceCenter/noticeDetail.do?billboardNo=0000000729',
      tags:['제주항공 유류할증료','USD 유류할증료','2026년 7월 유류할증료','항공권 유류할증료'],
      faq:[
        {q:'제주항공 2026년 7월 유류할증료는 어떤 통화인가요?',a:'제주항공 공식 공시는 USD 기준입니다. 사이트의 원화 금액은 환율 적용 참고값으로 봐야 합니다.'},
        {q:'제주항공 7월 최저 구간 금액은 얼마인가요?',a:'공식 공시 기준 최저 구간은 USD 30입니다.'}
      ],
      links:[{href:'airlines.html',label:'항공사별 7월 공시 보기'},{href:'forecast.html',label:'7월 공시 반영 현황 보기'}]
    },
    {
      id:'news-20260616-lj-july-official',
      slug:'jin-air-july-2026-official-surcharge',
      category:'airline',
      topic:'official-notice',
      priority:1,
      title:'진에어 2026년 7월 국제선 유류할증료 USD 공시 반영',
      aiBrief:'진에어는 2026년 7월 한국 출발 국제선 유류할증료를 USD 기준으로 공시했습니다.',
      summary:'진에어 2026년 7월 유류할증료는 거리 구간별 USD 27부터 USD 79까지입니다. 진에어의 6월 데이터와 7월 공시 데이터를 분리해 비교할 수 있게 반영했습니다.',
      impact:'공시 확인. 진에어는 USD 공시이므로 실제 결제 통화와 환율 적용 기준을 함께 확인해야 합니다.',
      sourceName:'진에어 공식 공지',
      sourceUrl:'https://www.jinair.com/company/announce/announceView?anceSeq=28218&searchWord=&searchKey=titlCtn&page=1',
      tags:['진에어 유류할증료','USD 유류할증료','2026년 7월 유류할증료','항공권 유류할증료'],
      faq:[
        {q:'진에어 2026년 7월 유류할증료는 어떤 통화인가요?',a:'진에어 공식 공시는 USD 기준입니다. 사이트의 원화 표시는 참고 환산값입니다.'},
        {q:'진에어 7월 최저 구간 금액은 얼마인가요?',a:'공식 공시 기준 최저 구간은 USD 27입니다.'}
      ],
      links:[{href:'airlines.html',label:'항공사별 7월 공시 보기'},{href:'forecast.html',label:'7월 공시 반영 현황 보기'}]
    }
  ];
  cards.forEach(function(card){
    card.date = date;
    card.updatedAt = updatedKo;
    card.badge = 'NEW';
    card.aiSummary = true;
    card.relevanceScore = 1;
    card.i18n = card.i18n || {};
    card.i18n.en = {
      updatedAt:'Updated 2026.06.16 KST',
      title:card.title,
      aiBrief:card.aiBrief,
      summary:card.summary,
      impact:card.impact,
      sourceName:card.sourceName,
      tags:['official notice','July 2026 fuel surcharge','Korea departure','international flights'],
      faq:card.faq,
      links:[{href:'airlines.html',label:'View July official notices'},{href:'forecast.html',label:'View July notice status'}]
    };
  });
  window.AERO_NEWS_CARDS_20260616 = cards.concat(window.AERO_NEWS_CARDS_20260616 || []);
})();
window.AERO_NEWS_LATEST=window.AERO_MARKET_BRIEF_20260616;

/* 2026.06.17 KST market brief and news cards. */
(function(){
  var date = '2026-06-17';
  var updatedKo = '2026.06.17 KST 업데이트';
  var marketRefs = [
    {name:'U.S. EIA - Petroleum & Other Liquids',url:'https://www.eia.gov/petroleum/'},
    {name:'IATA - Fuel Price Monitor',url:'https://www.iata.org/en/publications/economics/fuel-monitor/'},
    {name:'Bank of Korea ECOS',url:'https://ecos.bok.or.kr/'},
    {name:'UKMTO - Maritime Security',url:'https://www.ukmto.org/'}
  ];
  var officialRefs = [
    {name:'Korean Air official notice',url:'https://www.koreanair.com/contents/footer/customer-support/notice/2026/2607-infuel?pageNum=1'},
    {name:'Asiana Airlines official notice',url:'https://flyasiana.com/C/KR/KO/customer/notice/detail?id=CM202606160002529424&dispCt=all&page=1&searchOption=0&searchText='},
    {name:'Jeju Air official notice',url:'https://www.jejuair.net/ko/customerServiceCenter/noticeDetail.do?billboardNo=0000000729'},
    {name:'Jin Air official notice',url:'https://www.jinair.com/company/announce/announceView?anceSeq=28218&searchWord=&searchKey=titlCtn&page=1'},
    {name:'Air Busan official notice',url:'https://www.airbusan.com/content/common/customercenter/noticeDetail?id=4377'},
    {name:'Eastar Jet official notice',url:'https://www.eastarjet.com/newstar/PGWCA00002?cId=11&iId=0&bId=608&lang=KR'}
  ];
  window.AERO_MARKET_BRIEF_20260617 = {
    asOf:'2026.06.17 KST',
    forecastTargetMonth:'2026-08',
    category:'market',
    title:'2026년 8월 유류할증료 전망: 보합 또는 소폭 인하 가능성 우세',
    summary:'7월 공시 항공사 4곳의 인하, 브렌트유 하락, 원화 강세, 호르무즈 해협 통항 정상화 기대는 8월 유류할증료 하방 요인입니다. 다만 싱가포르 석유 재고가 약 13년 최저 수준이고 중동 리스크와 선박 보험료 부담이 남아 있어 급격한 인하로 단정하기는 어렵습니다.',
    direction:'보합 또는 소폭 인하 가능성 우세',
    keywords:['2026년 8월 유류할증료 전망','국제선 유류할증료','MOPS','항공유 가격','원달러 환율','호르무즈 해협','브렌트유','싱가포르 항공유'],
    sourceRefs:marketRefs
  };
  var cards = [
    {
      id:'news-20260617-august-outlook',
      slug:'august-2026-fuel-surcharge-flat-or-slight-cut',
      category:'market',
      topic:'outlook',
      priority:1,
      title:'2026년 8월 유류할증료, 보합 또는 소폭 인하 가능성 우세',
      aiBrief:'7월 공시 인하와 시장 안정 요인이 8월 국제선 유류할증료의 하방 압력을 키우고 있습니다.',
      summary:'대한항공, 아시아나항공, 제주항공, 진에어의 2026년 7월 공식 공시는 모두 6월 대비 인하로 확인됐습니다. 여기에 브렌트유 하락, 원화 강세, 호르무즈 해협 통항 정상화 기대가 더해지며 8월 유류할증료는 보합 또는 소폭 인하 가능성이 우세합니다.',
      impact:'8월 전망 영향: 하방 요인이 우세합니다. 다만 싱가포르 석유 재고 부족과 중동 리스크 때문에 급격한 인하보다는 보합 또는 소폭 인하 시나리오가 적절합니다.',
      tags:['2026년 8월 유류할증료 전망','국제선 유류할증료','MOPS','항공유 가격','원달러 환율','브렌트유','호르무즈 해협'],
      sourceRefs:marketRefs,
      faq:[
        {q:'2026년 8월 유류할증료는 인하될까요?',a:'현재 기준으로는 보합 또는 소폭 인하 가능성이 우세합니다. 다만 항공유 재고 부족과 지정학 리스크가 남아 있어 큰 폭 인하로 단정하기는 어렵습니다.'},
        {q:'7월 공시 인하가 8월 전망에 영향을 주나요?',a:'영향을 줍니다. 7월에 공시된 4개 항공사가 모두 6월 대비 인하되면서 8월 전망의 기준점도 하방 쪽으로 이동했습니다.'}
      ],
      links:[{href:'forecast.html',label:'8월 전망 보기'},{href:'airlines.html',label:'7월 공시 항공사 보기'}]
    },
    {
      id:'news-20260617-positive-factors',
      slug:'brent-krw-hormuz-positive-factors-june-17',
      category:'market',
      topic:'oil',
      priority:2,
      title:'브렌트유 하락·원화 강세, 8월 유류할증료 하방 요인 확대',
      aiBrief:'브렌트유 하락, 싱가포르 항공유 프리미엄 완화, 원화 강세가 유류할증료 상승 압력을 낮추고 있습니다.',
      summary:'미국·이란 긴장 완화와 호르무즈 해협 통항 정상화 기대가 커지면서 브렌트유 급등 우려가 일부 완화됐습니다. 원화 강세와 싱가포르 항공유 프리미엄 하락도 항공권 유류할증료 상승 압력을 낮추는 방향으로 작용합니다.',
      impact:'긍정 요인: 국제유가와 환율 부담이 동시에 완화되면 다음 공시월의 유류할증료 인하 가능성이 높아질 수 있습니다.',
      tags:['브렌트유 하락','원화 강세','싱가포르 항공유 프리미엄','항공권 유류할증료','MOPS 전망'],
      sourceRefs:marketRefs,
      faq:[
        {q:'브렌트유 하락은 유류할증료에 바로 반영되나요?',a:'바로 반영되지는 않습니다. 항공사 공시는 MOPS 항공유 가격, 환율, 적용 기간을 함께 보므로 시차가 생길 수 있습니다.'},
        {q:'원화 강세는 왜 긍정 요인인가요?',a:'항공유와 항공 관련 비용은 달러 기준 영향이 크기 때문에 원화 강세는 원화 기준 비용 부담을 낮추는 요인입니다.'}
      ],
      links:[{href:'forecast.html',label:'시장 지표 해석 보기'}]
    },
    {
      id:'news-20260617-risk-factors',
      slug:'singapore-inventory-hormuz-risk-june-17',
      category:'market',
      topic:'hormuz',
      priority:3,
      title:'싱가포르 석유 재고 부족과 호르무즈 리스크, 큰 폭 인하 제한',
      aiBrief:'싱가포르 석유 재고가 낮고 선박 보험료 부담이 남아 있어 항공유 가격의 급락을 기대하기는 어렵습니다.',
      summary:'긍정적인 시장 흐름에도 싱가포르 석유 재고가 약 13년 최저 수준이라는 점은 부담입니다. 중동 지정학 리스크, 선박 보험료 상승, 공급망 정상화 미완료도 남아 있어 8월 유류할증료를 급격한 인하로 보기에는 아직 이릅니다.',
      impact:'부정 요인: 항공유 공급망과 보험료 부담이 유지되면 MOPS 하락 속도가 제한되고, 유류할증료 인하 폭도 제한될 수 있습니다.',
      tags:['싱가포르 석유 재고','호르무즈 해협','선박 보험료','중동 리스크','항공유 가격 전망'],
      sourceRefs:marketRefs,
      faq:[
        {q:'싱가포르 석유 재고가 왜 중요합니까?',a:'싱가포르 시장은 아시아 항공유 가격과 MOPS 흐름에 영향을 주는 핵심 지표 중 하나라 재고 부족은 가격 하락을 제한할 수 있습니다.'},
        {q:'호르무즈 해협 정상화 기대가 있는데도 왜 위험 요인인가요?',a:'통항 기대는 커졌지만 실제 물류 정상화, 선박 안전 점검, 보험료 안정까지는 시간이 걸릴 수 있기 때문입니다.'}
      ],
      links:[{href:'forecast.html',label:'리스크 요인 보기'}]
    },
    {
      id:'news-20260617-july-official-baseline',
      slug:'july-2026-official-notices-become-august-baseline',
      category:'airline',
      topic:'official-notice',
      priority:4,
      title:'7월 공시 인하, 8월 유류할증료 전망의 기준점으로 전환',
      aiBrief:'대한항공·아시아나항공·제주항공·진에어의 7월 공시는 모두 6월 대비 인하로 확인됐습니다.',
      summary:'2026년 7월 공시가 확인된 대한항공, 아시아나항공, 제주항공, 진에어는 모두 6월 대비 인하되었습니다. 따라서 뉴스와 전망 페이지에서는 7월은 사실 데이터로, 8월은 전망 데이터로 분리해서 해석해야 합니다.',
      impact:'데이터 기준: 7월 공시 완료 항공사는 확정 데이터로 표시하고, 미공시 항공사는 공시 전 상태로 유지해야 합니다.',
      tags:['2026년 7월 유류할증료','대한항공 유류할증료','아시아나 유류할증료','제주항공 유류할증료','진에어 유류할증료'],
      sourceRefs:officialRefs,
      faq:[
        {q:'2026년 7월 공시 완료 항공사는 어디인가요?',a:'현재 사이트 기준으로 대한항공, 아시아나항공, 제주항공, 진에어가 2026년 7월 한국 출발 국제선 유류할증료를 공시한 상태입니다.'},
        {q:'미공시 항공사는 어떻게 표시해야 하나요?',a:'공식 공시가 확인되기 전까지는 금액을 임의로 만들지 않고 공시 전 또는 대기 상태로 표시해야 합니다.'}
      ],
      links:[{href:'airlines.html',label:'항공사별 7월 공시 보기'}]
    },
    {
      id:'news-20260617-indicators-to-watch',
      slug:'mops-iata-fx-indicators-to-watch-june-17',
      category:'institution',
      topic:'mops',
      priority:5,
      title:'MOPS·IATA 항공유·환율, 다음 공시월 핵심 확인 변수',
      aiBrief:'7월 공시가 시작된 이후에는 MOPS, IATA 항공유 가격, 원달러 환율이 8월 전망의 핵심 지표입니다.',
      summary:'7월 공시 금액은 항공사별 공식 데이터로 확정 관리하고, 이후 시장 지표는 8월 전망 판단에 활용해야 합니다. MOPS 항공유 가격, IATA 항공유 지표, 원달러 환율, 호르무즈 해협 물류 정상화 여부가 다음 공시월의 핵심 확인 변수입니다.',
      impact:'GEO/AEO 관점: 7월 확정 데이터와 8월 전망 데이터를 분리하면 AI 검색엔진이 인용하기 쉬운 구조가 됩니다.',
      tags:['MOPS','IATA 항공유','원달러 환율','환율 전망','8월 유류할증료 전망'],
      sourceRefs:marketRefs,
      faq:[
        {q:'MOPS와 IATA 항공유 가격은 같은 지표인가요?',a:'둘 다 항공유 시장을 보는 데 활용되지만 산정 기준과 제공 방식이 다릅니다. 유류할증료 판단에는 항공사 공시 기준과 MOPS 흐름을 함께 보는 것이 안전합니다.'},
        {q:'7월 공시 이후 가장 먼저 볼 지표는 무엇인가요?',a:'MOPS 항공유 가격, 원달러 환율, 국제유가, 호르무즈 해협 물류 정상화 여부를 함께 확인하는 것이 좋습니다.'}
      ],
      links:[{href:'forecast.html',label:'8월 전망 핵심 지표 보기'}]
    }
  ];
  cards.push({
    id:'news-20260617-air-busan-july-official',
    slug:'air-busan-july-2026-fuel-surcharge-official-notice',
    category:'airline',
    topic:'official-notice',
    priority:1,
    title:'에어부산 2026년 7월 국제선 유류할증료 공식 공시 — 6월 대비 전 구간 인하',
    aiBrief:'에어부산의 2026년 7월 한국 출발 국제선 유류할증료가 공식 공시됐고, 6월 대비 모든 USD 구간이 인하됐습니다.',
    summary:'에어부산이 2026년 7월 한국 출발 국제선 유류할증료를 공식 공시했습니다.\n\n■ 적용 기간: 2026년 7월 1일~7월 31일 (발권일 기준)\n■ 공시 통화: USD\n■ 공시 상태: 공식 공시 확인\n\n■ 6월 → 7월 변화:\n• 1구간 (~699mi): USD 43 → USD 30\n• 2구간 (700~1,299mi): USD 77 → USD 54\n• 3구간 (1,300~1,999mi): USD 90 → USD 64\n• 4구간 (2,000mi~): USD 106 → USD 74\n\n7월 공시가 확인된 항공사는 대한항공, 아시아나항공, 제주항공, 진에어, 에어부산, 이스타항공으로 확대됐습니다. 미공시 항공사는 확인 전까지 공시 전 상태로 분리 표시합니다.',
    impact:'에어부산 7월 공식 공시 반영 완료. 6월 대비 전 구간 인하가 확인됐으며 USD 공시 기준으로 표시합니다.',
    tags:['에어부산','2026년 7월 유류할증료','국제선 유류할증료','USD 공시','항공사 공식'],
    sourceRefs:[{name:'Air Busan official notice',url:'https://www.airbusan.com/content/common/customercenter/noticeDetail?id=4377'}],
    faq:[
      {q:'2026년 7월 에어부산 유류할증료는 얼마인가?',a:'에어부산 2026년 7월 한국 출발 국제선 유류할증료는 USD 30, USD 54, USD 64, USD 74로 공시됐습니다. 구간은 에어부산 공식 거리 구간 기준입니다.'},
      {q:'에어부산 7월 유류할증료는 6월보다 내려갔나?',a:'네. 공식 공시 기준으로 1구간 USD 43→30, 2구간 USD 77→54, 3구간 USD 90→64, 4구간 USD 106→74로 전 구간 인하됐습니다.'}
    ],
    links:[{href:'airlines.html',label:'항공사별 7월 공시 보기'},{href:'fuel-surcharge-korea.html',label:'6월→7월 비교 보기'}]
  });
  cards.push({
    id:'news-20260617-eastar-july-official',
    slug:'eastar-jet-july-2026-fuel-surcharge-official-notice',
    category:'airline',
    topic:'official-notice',
    priority:1,
    title:'이스타항공 2026년 7월 국제선 유류할증료 공식 공시 — 6월 대비 전 구간 인하',
    aiBrief:'이스타항공의 2026년 7월 한국 출발 국제선 유류할증료가 공식 공시됐고, 6월 대비 모든 USD 군이 인하됐습니다.',
   summary:'이스타항공이 2026년 7월 한국 출발 국제선 유류할증료를 공식 공시했습니다.\n\n■ 적용 기간: 2026년 7월 1일~7월 31일 (발권일 기준)\n■ 공시 통화: USD\n■ 공시 상태: 공식 공시 확인\n\n■ 6월 → 7월 변화:\n• 1군: USD 43 → USD 30\n• 2군: USD 54 → USD 38\n• 3군: USD 66 → USD 45\n• 4군: USD 79 → USD 55\n• 5군: USD 89 → USD 62\n• 6군: USD 103 → USD 72\n\n이후 추가 확인으로 2026년 7월 공시 확인 항공사는 대한항공, 아시아나항공, 제주항공, 진에어, 에어부산, 이스타항공, 에어서울, 에어프레미아, 티웨이항공까지 확대됐습니다.',
    impact:'이스타항공 7월 공식 공시 반영 완료. 6월 대비 전 구간 인하가 확인됐으며 USD 공시 기준으로 표시합니다.',
    tags:['이스타항공','2026년 7월 유류할증료','국제선 유류할증료','USD 공시','항공사 공식'],
    sourceRefs:[{name:'Eastar Jet official notice',url:'https://www.eastarjet.com/newstar/PGWCA00002?cId=11&iId=0&bId=608&lang=KR'}],
    faq:[
      {q:'2026년 7월 이스타항공 유류할증료는 얼마인가?',a:'이스타항공 2026년 7월 한국 출발 국제선 유류할증료는 공식 공시 기준 1군 USD 30, 2군 USD 38, 3군 USD 45, 4군 USD 55, 5군 USD 62, 6군 USD 72입니다.'},
      {q:'이스타항공 7월 유류할증료는 6월보다 내려갔나?',a:'네. 공식 공시 기준으로 1군 USD 43→30, 2군 USD 54→38, 3군 USD 66→45, 4군 USD 79→55, 5군 USD 89→62, 6군 USD 103→72로 전 구간 인하됐습니다.'}
    ],
    links:[{href:'airlines.html',label:'항공사별 7월 공시 보기'},{href:'fuel-surcharge-korea.html',label:'6월→7월 비교 보기'}]
  });  cards.forEach(function(card, idx){
    card.date = date;
    card.updatedAt = updatedKo;
    card.badge = 'NEW';
    card.aiSummary = true;
    card.relevanceScore = 1;
    card.i18n = card.i18n || {};
    card.i18n.en = {
      updatedAt:'Updated 2026.06.17 KST',
      title:[
        'August 2026 fuel surcharge: flat to slight cut scenario leads',
        'Lower Brent and a stronger KRW add downside pressure',
        'Singapore inventory shortage and Hormuz risk limit a sharp cut',
        'July official cuts become the baseline for August outlook',
        'MOPS, IATA jet fuel and USD/KRW are the key next indicators'
      ][idx],
      aiBrief:[
        'July official cuts and easing market indicators point to downside pressure for August.',
        'Lower Brent, softer Singapore jet-fuel premium and a stronger KRW reduce surcharge pressure.',
        'Low Singapore inventories, insurance costs and incomplete logistics normalization still matter.',
        'July verified notices should be treated as factual data, while August remains an outlook.',
        'After July notices, MOPS, IATA jet fuel, USD/KRW and Hormuz logistics are the key watch items.'
      ][idx],
      summary:card.summary,
      impact:card.impact,
      tags:card.tags,
      sourceRefs:card.sourceRefs,
      faq:card.faq,
      links:card.links
    };
    if(card.id === 'news-20260617-eastar-july-official') {
      card.i18n.en = {
        updatedAt:'Updated 2026.06.17 KST',
        title:'Eastar Jet July 2026 International Fuel Surcharge Official Notice - All USD Groups Down vs June',
        aiBrief:'Eastar Jet has published its July 2026 Korea-departure international fuel surcharge, with all USD groups lower than June.',
        summary:'Eastar Jet has published its July 2026 Korea-departure international fuel surcharge notice.\n\nApplied period: July 1-31, 2026 (ticketing date basis)\nCurrency: USD\nStatus: official notice verified\n\nJune to July changes:\n- Group 1: USD 43 to USD 30\n- Group 2: USD 54 to USD 38\n- Group 3: USD 66 to USD 45\n- Group 4: USD 79 to USD 55\n- Group 5: USD 89 to USD 62\n- Group 6: USD 103 to USD 72\n\nVerified July notices now include Korean Air, Asiana Airlines, Jeju Air, Jin Air, Air Busan, Eastar Jet, Air Seoul, Air Premia and Tway Air.',
        impact:'Eastar Jet July official notice reflected. All USD groups are lower than June and are displayed using the airline official USD filing.',
        tags:['Eastar Jet','July 2026 fuel surcharge','international fuel surcharge','USD filing','airline official notice'],
        sourceRefs:card.sourceRefs,
        faq:[
          {q:'How much is Eastar Jet fuel surcharge in July 2026?',a:'Eastar Jet July 2026 Korea-departure international fuel surcharge is USD 30, 38, 45, 55, 62 and 72 by official group.'},
          {q:'Did Eastar Jet July surcharge fall from June?',a:'Yes. The official notice shows all groups down: USD 43 to 30, 54 to 38, 66 to 45, 79 to 55, 89 to 62 and 103 to 72.'}
        ],
        links:[{href:'airlines.html',label:'View July airline notices'},{href:'fuel-surcharge-korea.html',label:'Compare June to July'}]
      };
    }    if(card.id === 'news-20260617-air-busan-july-official') {
      card.i18n.en = {
        updatedAt:'Updated 2026.06.17 KST',
        title:'Air Busan July 2026 International Fuel Surcharge Official Notice — All USD Bands Down vs June',
        aiBrief:'Air Busan has published its July 2026 Korea-departure international fuel surcharge, with all USD bands lower than June.',
        summary:'Air Busan has published its July 2026 Korea-departure international fuel surcharge notice.\n\n■ Applied period: July 1-31, 2026 (ticketing date basis)\n■ Currency: USD\n■ Status: official notice verified\n\n■ June → July changes:\n• Band 1 (~699mi): USD 43 → USD 30\n• Band 2 (700-1,299mi): USD 77 → USD 54\n• Band 3 (1,300-1,999mi): USD 90 → USD 64\n• Band 4 (2,000mi+): USD 106 → USD 74\n\nVerified July notices now include Korean Air, Asiana Airlines, Jeju Air, Jin Air and Air Busan. Pending airlines remain separated until official notices are verified.',
        impact:'Air Busan July official notice reflected. All USD bands are lower than June and are displayed using the airline official USD filing.',
        tags:['Air Busan','July 2026 fuel surcharge','international fuel surcharge','USD filing','airline official notice'],
        sourceRefs:card.sourceRefs,
        faq:[
          {q:'How much is Air Busan fuel surcharge in July 2026?',a:'Air Busan July 2026 Korea-departure international fuel surcharge is published at USD 30, USD 54, USD 64 and USD 74 by the airline distance bands.'},
          {q:'Did Air Busan July surcharge fall from June?',a:'Yes. The official notice shows all bands down: USD 43→30, USD 77→54, USD 90→64 and USD 106→74.'}
        ],
        links:[{href:'airlines.html',label:'View July airline notices'},{href:'fuel-surcharge-korea.html',label:'Compare June to July'}]
      };
    }
  });
  window.AERO_NEWS_CARDS_20260617 = cards.concat(window.AERO_NEWS_CARDS_20260617 || []);
})();
window.AERO_NEWS_LATEST=window.AERO_MARKET_BRIEF_20260617;

window.AERO_MARKET_BRIEF_20260618 = {
  date:'2026-06-18',
  updatedAt:'2026.06.18 09:00 KST',
  title:'2026년 7월 유류할증료 공시 반영: 19단계 적용',
  summary:'2026년 7월 한국 출발 국제선 유류할증료는 6월 27단계에서 7월 19단계로 조정됐습니다. 산정 기준 MOPS 평균은 2026.05.16~2026.06.15 기준 갤런당 338.3센트로, 6월 기준 410.02센트 대비 약 17.5% 낮아졌습니다.',
  keywords:['2026년 7월 유류할증료','19단계','MOPS','항공유 가격','원달러 환율','호르무즈 해협','2026년 8월 유류할증료 전망'],
  decision:'7월은 전망이 아니라 공시 반영 단계이며, 8월은 MOPS·환율·호르무즈 해협 변수에 따른 전망으로 분리합니다.'
};
(function(){
  var date='2026-06-18';
  var updatedKo='2026.06.18 09:00 KST';
  var sourceRefs={
    mops:[{name:'IATA Fuel Price Monitor',url:'https://www.iata.org/en/publications/economics/fuel-monitor/'}],
    fx:[{name:'Bank of Korea ECOS',url:'https://ecos.bok.or.kr/'}],
    oil:[{name:'U.S. EIA Petroleum & Other Liquids',url:'https://www.eia.gov/petroleum/'}],
    hormuz:[{name:'UKMTO Maritime Security',url:'https://www.ukmto.org/'}]
  };
  var cards=[
    {
      id:'news-20260618-july-level-19',
      category:'institution',
      topic:'mops',
      priority:0,
      title:'2026년 7월 국제선 유류할증료 19단계 적용',
      aiBrief:'7월 한국 출발 국제선 유류할증료는 6월 27단계에서 7월 19단계로 내려간 공시 반영 상태입니다.',
      summary:'2026년 7월 국제선 유류할증료는 더 이상 전망 단계가 아니라 공시 반영 단계입니다. 6월 적용 27단계에서 7월 적용 19단계로 8단계 낮아졌고, 항공사별 공식 공시가 확인된 곳은 실제 금액 기준으로 반영해야 합니다. 아직 공시가 확인되지 않은 항공사는 임의 예측 금액을 쓰지 않고 공시 전 상태로 분리합니다.',
      impact:'SEO/AEO: 2026년 7월 유류할증료 공시 반영, 19단계 적용, 6월 대비 8단계 인하 질의에 직접 대응합니다.',
      tags:['2026년 7월 유류할증료','19단계','6월 대비 8단계 인하','공시 반영','국제선 유류할증료'],
      sourceRefs:sourceRefs.mops,
      faq:[
        {q:'2026년 7월 국제선 유류할증료는 몇 단계인가요?',a:'현재 반영 기준으로 2026년 7월 한국 출발 국제선 유류할증료는 19단계입니다. 6월 27단계보다 8단계 낮아진 수준입니다.'},
        {q:'7월 유류할증료는 전망인가요?',a:'아닙니다. 7월은 항공사 공식 공시가 반영되는 단계이며, 공시가 확인된 항공사만 확정 데이터로 표시합니다.'}
      ],
      links:[{href:'fuel-surcharge-korea.html',label:'6월→7월 비교 보기'},{href:'forecast.html',label:'7월 공시와 8월 전망 구분 보기'}]
    },
    {
      id:'news-20260618-mops-average-drop',
      category:'market',
      topic:'mops',
      priority:1,
      title:'MOPS 평균 338.3센트, 6월 기준 대비 약 17.5% 하락',
      aiBrief:'7월 유류할증료 인하의 핵심 배경은 산정 기간 MOPS 평균 하락입니다.',
      summary:'2026년 7월 유류할증료 산정에 반영되는 MOPS 평균은 2026.05.16~2026.06.15 기준 갤런당 338.3센트입니다. 6월 기준 MOPS 410.02센트와 비교하면 약 17.5% 낮아졌고, 이 변화가 7월 국제선 유류할증료 단계 하락의 핵심 배경입니다.',
      impact:'MOPS 수치와 산정 기간을 명확히 제시해 AI Overview와 생성형 검색이 인용하기 쉬운 근거형 답변을 강화합니다.',
      tags:['MOPS','항공유 가격','338.3센트','410.02센트','17.5% 하락','유류할증료 산정'],
      sourceRefs:sourceRefs.mops,
      faq:[
        {q:'2026년 7월 유류할증료가 내려간 이유는 무엇인가요?',a:'산정 기간 MOPS 평균이 6월 기준보다 낮아졌기 때문입니다. MOPS 평균은 갤런당 338.3센트로, 6월 기준 410.02센트 대비 약 17.5% 하락했습니다.'},
        {q:'MOPS는 왜 중요한가요?',a:'MOPS는 국제선 유류할증료 산정에 직접 반영되는 항공유 가격 지표이기 때문에 단계 조정의 핵심 변수입니다.'}
      ],
      links:[{href:'forecast.html',label:'MOPS와 8월 전망 보기'},{href:'fuel-surcharge-calculator.html',label:'항공권 총액 계산하기'}]
    },
    {
      id:'news-20260618-fx-hormuz-august-watch',
      category:'market',
      topic:'outlook',
      priority:2,
      title:'환율·호르무즈 변수는 8월 유류할증료 전망의 핵심',
      aiBrief:'7월은 공시 반영 단계이고, 8월은 원달러 환율·MOPS·호르무즈 정상화 속도에 따라 달라질 전망입니다.',
      summary:'2026.06.18 기준 원달러 환율은 1달러당 약 1,515.50원 수준으로 높은 구간에 머물러 있어 항공권 총액 체감 인하를 제한할 수 있습니다. 미국·이란 긴장 완화는 유가 부담을 낮추는 요인이지만, 호르무즈 해협 물류 정상화와 선박 보험료 부담은 아직 완전히 해소됐다고 보기 어렵습니다. 따라서 8월 유류할증료는 2026.06.16~2026.07.15 MOPS 흐름과 환율, 지정학 리스크를 함께 봐야 합니다.',
      impact:'7월 공시와 8월 전망을 분리해 사용자 혼란을 줄이고, 환율 전망·호르무즈 해협 영향·항공유 가격 전망 검색 의도까지 연결합니다.',
      tags:['원달러 환율','1,515.50원','호르무즈 해협','2026년 8월 유류할증료 전망','항공유 가격 전망','환율 전망'],
      sourceRefs:sourceRefs.fx.concat(sourceRefs.oil,sourceRefs.hormuz),
      faq:[
        {q:'7월 공시 이후 8월 유류할증료는 어떻게 봐야 하나요?',a:'8월은 아직 전망 단계입니다. 2026.06.16~2026.07.15 MOPS 평균, 원달러 환율, 호르무즈 해협 정상화 속도를 함께 확인해야 합니다.'},
        {q:'환율이 높으면 유류할증료 인하 효과가 줄어드나요?',a:'유류할증료 자체가 내려가도 원달러 환율이 높은 구간이면 항공권 총액에서 체감 인하 폭은 제한될 수 있습니다.'}
      ],
      links:[{href:'forecast.html',label:'2026년 8월 전망 보기'},{href:'fuel-surcharge-calculator.html',label:'항공권 총액 확인하기'}]
    }
  ];
  cards.forEach(function(card,idx){
    card.date=date;
    card.updatedAt=updatedKo;
    card.badge='NEW';
    card.aiSummary=true;
    card.relevanceScore=1;
    card.i18n=card.i18n||{};
    card.i18n.en={
      updatedAt:'Updated 2026.06.18 09:00 KST',
      title:[
        'July 2026 international fuel surcharge applies Level 19',
        'MOPS average at 338.3 cents, about 17.5% lower than the June basis',
        'USD/KRW and Hormuz remain key variables for the August outlook'
      ][idx],
      aiBrief:[
        'July 2026 is now an official notice reflection stage, not a forecast stage.',
        'The main driver of the July cut is the lower MOPS average during the calculation period.',
        'July notices are factual data; August remains an outlook driven by MOPS, FX and Hormuz logistics.'
      ][idx],
      summary:card.summary,
      impact:card.impact,
      tags:card.tags,
      sourceRefs:card.sourceRefs,
      faq:card.faq,
      links:card.links
    };
  });
  window.AERO_NEWS_CARDS_20260618 = cards.concat(window.AERO_NEWS_CARDS_20260618 || []);
})();
window.AERO_NEWS_LATEST=window.AERO_MARKET_BRIEF_20260618;

window.AERO_NEWS_CARDS_20260618 = [
  {
    id:'news-20260618-air-seoul-july-official',
    slug:'air-seoul-july-2026-fuel-surcharge-official-notice',
    category:'airline',
    topic:'official-notice',
    priority:0,
    date:'2026-06-18',
    updatedAt:'2026.06.18 KST',
    badge:'NEW',
    aiSummary:true,
    relevanceScore:1,
    title:'에어서울 2026년 7월 국제선 유류할증료 공식 공시 - 6월 대비 전 구간 인하',
    aiBrief:'에어서울은 2026년 7월 한국 출발 국제선 유류할증료를 공식 공시했고, 6월 대비 모든 KRW 구간이 인하됐습니다.',
    summary:'에어서울이 2026년 7월 한국 출발 국제선 유류할증료를 공식 공시했습니다.\n\n■ 적용 기간: 2026년 7월 1일~7월 31일 (발권일 기준)\n■ 공시 통화: KRW\n■ 공시 상태: 공식 공시 확인\n\n■ 6월 → 7월 변화:\n• 300~700mi: 75,300원 → 54,500원\n• 700~1,100mi: 87,100원 → 62,100원\n• 1,100~1,500mi: 109,200원 → 80,300원\n• 1,500~1,900mi: 125,500원 → 90,900원\n• 1,900~2,300mi: 132,800원 → 93,900원\n\n에어서울은 KRW 기준 공시 항공사이므로 실제 발권 시점의 항공권 총액, 운임, 세금과 함께 확인해야 합니다.',
    impact:'에어서울 7월 공식 공시 반영 완료. 6월 대비 전 구간 인하가 확인되며, 최저 54,500원·최고 93,900원 기준으로 표시합니다.',
    tags:['에어서울','에어서울 유류할증료','2026년 7월 유류할증료','국제선 유류할증료','KRW 공시'],
    sourceRefs:[{name:'Air Seoul official notice',url:'https://flyairseoul.com/CW/ko/noticeContent.do?seq=10914&pageNo=1'}],
    faq:[
      {q:'2026년 7월 에어서울 유류할증료는 얼마인가요?',a:'에어서울 2026년 7월 한국 출발 국제선 유류할증료는 거리 구간별 54,500원, 62,100원, 80,300원, 90,900원, 93,900원입니다.'},
      {q:'에어서울 7월 유류할증료는 6월보다 내렸나요?',a:'네. 공식 공시 기준으로 모든 KRW 구간이 6월 대비 인하됐습니다.'}
    ],
    links:[{href:'airlines.html',label:'항공사별 7월 공시 보기'},{href:'fuel-surcharge-korea.html',label:'6월→7월 비교 보기'}],
    i18n:{
      en:{
        updatedAt:'Updated 2026.06.18 KST',
        title:'Air Seoul July 2026 International Fuel Surcharge Official Notice - All KRW Bands Down vs June',
        aiBrief:'Air Seoul has published its July 2026 Korea-departure international fuel surcharge, with all KRW bands lower than June.',
        summary:'Air Seoul has published its July 2026 Korea-departure international fuel surcharge notice.\n\nApplied period: July 1-31, 2026 (ticketing date basis)\nCurrency: KRW\nStatus: official notice verified\n\nJune to July changes:\n- 300-700mi: KRW 75,300 to KRW 54,500\n- 700-1,100mi: KRW 87,100 to KRW 62,100\n- 1,100-1,500mi: KRW 109,200 to KRW 80,300\n- 1,500-1,900mi: KRW 125,500 to KRW 90,900\n- 1,900-2,300mi: KRW 132,800 to KRW 93,900\n\nAir Seoul is a KRW-filing airline, so travelers should compare the surcharge with total airfare, base fare and taxes at ticketing.',
        impact:'Air Seoul July official notice reflected. All KRW bands are lower than June, from KRW 54,500 to KRW 93,900.',
        tags:['Air Seoul','Air Seoul fuel surcharge','July 2026 fuel surcharge','international fuel surcharge','KRW filing'],
        sourceRefs:[{name:'Air Seoul official notice',url:'https://flyairseoul.com/CW/ko/noticeContent.do?seq=10914&pageNo=1'}],
        faq:[
          {q:'How much is Air Seoul fuel surcharge in July 2026?',a:'Air Seoul July 2026 Korea-departure international fuel surcharge is KRW 54,500, 62,100, 80,300, 90,900 and 93,900 by distance band.'},
          {q:'Did Air Seoul July surcharge fall from June?',a:'Yes. The official notice shows all KRW distance bands down from June.'}
        ],
        links:[{href:'airlines.html',label:'View July airline notices'},{href:'fuel-surcharge-korea.html',label:'Compare June to July'}]
      }
    }
  },
  {
    id:'news-20260618-air-premia-july-official',
    slug:'air-premia-july-2026-fuel-surcharge-official-notice',
    category:'airline',
    topic:'official-notice',
    priority:0,
    date:'2026-06-18',
    updatedAt:'2026.06.18 KST',
    badge:'NEW',
    aiSummary:true,
    relevanceScore:1,
    title:'에어프레미아 2026년 7월 국제선 유류할증료 공식 공시 - 장거리 USD 구간 인하',
    aiBrief:'에어프레미아는 2026년 7월 한국 출발 국제선 유류할증료를 USD 기준으로 공시했고, 6월 대비 전 구간 인하됐습니다.',
    summary:'에어프레미아가 2026년 7월 한국 출발 국제선 유류할증료를 공식 공시했습니다.\n\n■ 적용 기간: 2026년 7월 1일~7월 31일 (결제일 기준)\n■ 공시 통화: USD\n■ 공시 기준: 편도 / mile\n■ 공시 상태: 공식 공시 확인\n\n■ 6월 → 7월 변화:\n• ~999mi: USD 48 → USD 33\n• 1,000~1,499mi: USD 64 → USD 44\n• 1,500~1,999mi: USD 83 → USD 58\n• 2,000~2,499mi: USD 107 → USD 75\n• 4,000~4,999mi: USD 187 → USD 130\n• 5,000~6,499mi: USD 236 → USD 164\n• 6,500mi~: USD 296 → USD 205\n\n에어프레미아는 미국 장거리 노선 비중이 커서 유류할증료와 환율을 함께 보는 것이 중요합니다.',
    impact:'에어프레미아 7월 공식 공시 반영 완료. 단거리 ICN-NRT는 USD 33, 장거리 ICN-IAD/ICN-EWR 구간은 USD 205로 확인됩니다.',
    tags:['에어프레미아','에어프레미아 유류할증료','2026년 7월 유류할증료','국제선 유류할증료','USD 공시'],
    sourceRefs:[{name:'Air Premia official notice',url:'https://www.airpremia.com/a/ko/customer/notice/728'}],
    faq:[
      {q:'2026년 7월 에어프레미아 유류할증료는 얼마인가요?',a:'에어프레미아 2026년 7월 한국 출발 국제선 유류할증료는 USD 33부터 USD 205까지 거리 구간별로 공시됐습니다.'},
      {q:'에어프레미아 7월 유류할증료는 6월보다 내렸나요?',a:'네. 공식 공시 기준으로 USD 48~296이던 6월 구간이 7월에는 USD 33~205로 전 구간 인하됐습니다.'}
    ],
    links:[{href:'airlines.html',label:'항공사별 7월 공시 보기'},{href:'fuel-surcharge-korea.html',label:'6월→7월 비교 보기'}],
    i18n:{
      en:{
        updatedAt:'Updated 2026.06.18 KST',
        title:'Air Premia July 2026 International Fuel Surcharge Official Notice - Long-haul USD Bands Down',
        aiBrief:'Air Premia has published its July 2026 Korea-departure international fuel surcharge in USD, with all bands lower than June.',
        summary:'Air Premia has published its July 2026 Korea-departure international fuel surcharge notice.\n\nApplied period: July 1-31, 2026 (payment date basis)\nCurrency: USD\nBasis: one-way / mile\nStatus: official notice verified\n\nJune to July changes:\n- Up to 999mi: USD 48 to USD 33\n- 1,000-1,499mi: USD 64 to USD 44\n- 1,500-1,999mi: USD 83 to USD 58\n- 2,000-2,499mi: USD 107 to USD 75\n- 4,000-4,999mi: USD 187 to USD 130\n- 5,000-6,499mi: USD 236 to USD 164\n- 6,500mi and above: USD 296 to USD 205\n\nBecause Air Premia has a high share of long-haul U.S. routes, travelers should review both surcharge and USD/KRW effects.',
        impact:'Air Premia July official notice reflected. ICN-NRT is USD 33, while long-haul ICN-IAD/ICN-EWR bands are shown at USD 205.',
        tags:['Air Premia','Air Premia fuel surcharge','July 2026 fuel surcharge','international fuel surcharge','USD filing'],
        sourceRefs:[{name:'Air Premia official notice',url:'https://www.airpremia.com/a/ko/customer/notice/728'}],
        faq:[
          {q:'How much is Air Premia fuel surcharge in July 2026?',a:'Air Premia July 2026 Korea-departure international fuel surcharge is published from USD 33 to USD 205 by distance band.'},
          {q:'Did Air Premia July surcharge fall from June?',a:'Yes. The official notice shows all bands down from June USD 48-296 to July USD 33-205.'}
        ],
        links:[{href:'airlines.html',label:'View July airline notices'},{href:'fuel-surcharge-korea.html',label:'Compare June to July'}]
      }
    }
  }
].concat(window.AERO_NEWS_CARDS_20260618 || []);

window.AERO_NEWS_CARDS_20260619 = [
  {
    id:'news-20260619-tway-july-official',
    slug:'tway-air-july-2026-fuel-surcharge-official-notice',
    category:'airline',
    topic:'official-notice',
    priority:0,
    date:'2026-06-19',
    updatedAt:'2026.06.19 09:00 KST',
    badge:'NEW',
    aiSummary:true,
    relevanceScore:1,
    title:'티웨이항공, 2026년 7월 한국발 국제선 유류할증료 공지 확인',
    aiBrief:'티웨이항공 2026년 7월 한국발 국제선 유류할증료 공식 공지가 확인되어 기존 미확인 상태에서 공식 반영 상태로 변경합니다.',
    summary:'2026.06.19 09:00 KST 기준 티웨이항공의 2026년 7월 한국발 국제선 유류할증료 공지가 확인됐습니다.\n\n공식 표 기준 금액은 1군 33,400원, 2군 59,200원, 3군 74,400원, 4군 97,200원, 5군 104,700원, 6군 해당 없음, 7군 233,800원입니다. 기존 6월 18일 기준 데이터에서 티웨이항공은 미확인 상태였으나, 이번 업데이트부터 7월 공식 공시 반영 항공사로 표시합니다.',
    impact:'티웨이항공이 7월 공식 공시 반영 항공사에 추가되면서 2026년 7월 한국발 국제선 유류할증료 확인 항공사는 KE·OZ·7C·LJ·BX·ZE·RS·YP·TW로 확대됩니다.',
    tags:['티웨이항공','2026년 7월 유류할증료','한국발 국제선','항공사 공시'],
    sourceRefs:[{name:'Tway Air official notice',url:'https://www.twayair.com/app/customerCenter/notice/retrieve/12654'}],
    faq:[
      {q:'티웨이항공 2026년 7월 국제선 유류할증료는 공시됐나요?',a:'네. 2026.06.19 기준 티웨이항공 2026년 7월 한국발 국제선 유류할증료 공식 공지가 확인됐습니다.'},
      {q:'티웨이항공 2026년 7월 유류할증료 금액은 얼마인가요?',a:'공식 표 기준 1군 33,400원, 2군 59,200원, 3군 74,400원, 4군 97,200원, 5군 104,700원, 6군 해당 없음, 7군 233,800원입니다.'}
    ],
    links:[{href:'airlines.html',label:'항공사별 7월 공시 보기'},{href:'fuel-surcharge-korea.html',label:'6월 vs 7월 비교 보기'}],
    i18n:{
      en:{
        updatedAt:'Updated 2026.06.19 09:00 KST',
        title:"T'way Air July 2026 Korea-departure international fuel surcharge notice verified",
        aiBrief:"T'way Air's July 2026 Korea-departure international fuel surcharge notice is now verified and moves from previously unverified to official reflected status.",
        summary:"As of June 19, 2026 09:00 KST, T'way Air's July 2026 Korea-departure international fuel surcharge notice is verified.\n\nOfficial amounts are KRW 33,400, 59,200, 74,400, 97,200, 104,700, no amount for Group 6, and KRW 233,800 for Group 7. The site now treats T'way Air as a verified July notice airline.",
        impact:"T'way Air is added to the July verified airline list: KE, OZ, 7C, LJ, BX, ZE, RS, YP and TW.",
        tags:["T'way Air",'July 2026 fuel surcharge','Korea-departure international','airline notice'],
        sourceRefs:[{name:'Tway Air official notice',url:'https://www.twayair.com/app/customerCenter/notice/retrieve/12654'}],
        faq:[
          {q:"Has T'way Air published its July 2026 international fuel surcharge?",a:"Yes. As of June 19, 2026, T'way Air's July 2026 Korea-departure international fuel surcharge notice is verified."},
          {q:"How much is T'way Air's July 2026 fuel surcharge?",a:"The official table lists KRW 33,400, 59,200, 74,400, 97,200, 104,700, no Group 6 amount, and KRW 233,800 for Group 7."}
        ],
        links:[{href:'airlines.html',label:'View July airline notices'},{href:'fuel-surcharge-korea.html',label:'Compare June to July'}]
      }
    }
  },
  {
    id:'news-20260619-no-new-israel-iran-strike',
    slug:'no-confirmed-new-israel-iran-strike-hormuz-risk-june-19',
    category:'market',
    topic:'geopolitics',
    priority:1,
    date:'2026-06-19',
    updatedAt:'2026.06.19 09:00 KST',
    badge:'NEW',
    aiSummary:true,
    relevanceScore:1,
    title:'이스라엘-이란 신규 폭격 확인 안 됨 - 호르무즈 리스크는 완전 해소 전',
    aiBrief:'신규 중동 군사 충돌은 확인되지 않았지만 호르무즈 해협 정상화와 중동 리스크 프리미엄은 계속 확인해야 합니다.',
    summary:'2026.06.19 09:00 KST 기준, 신규 중동 군사 충돌 보도은 주요 외신에서 확인되지 않습니다. 다만 6월 초 이스라엘-이란 직접 충돌 이력, 미국-이란 합의에 대한 이스라엘의 반발, 레바논·헤즈볼라 방면 긴장은 남아 있습니다. 따라서 호르무즈 해협 재개방 기대는 유가 하방 요인이지만, 리스크 프리미엄이 완전히 사라졌다고 보기는 어렵습니다.',
    impact:'신규 폭격 미확인으로 단기 유가 급등 근거는 약화됐지만, 지정학 리스크는 8월 유류할증료 인하 폭을 제한할 수 있습니다.',
    tags:['이스라엘','이란','호르무즈 해협','국제유가','유류할증료 전망'],
    sourceRefs:[{name:'UKMTO Maritime Security',url:'https://www.ukmto.org/'}],
    faq:[
      {q:'신규 중동 군사 충돌이 새로 확인됐나요?',a:'2026.06.19 09:00 KST 기준 주요 외신에서 신규 중동 군사 충돌은 확인되지 않습니다.'},
      {q:'호르무즈 해협 리스크는 유류할증료에 어떤 영향을 주나요?',a:'호르무즈 정상화 지연과 보험료 부담은 항공유 가격과 MOPS 전망에 영향을 주어 8월 유류할증료 인하 폭을 제한할 수 있습니다.'}
    ],
    links:[{href:'forecast.html',label:'2026년 8월 전망 보기'}],
    i18n:{
      en:{
        updatedAt:'Updated 2026.06.19 09:00 KST',
        title:'No confirmed new Israel strike on Iran - Hormuz risk not fully resolved',
        aiBrief:'No new strike on Iran is confirmed, but Hormuz normalization and Middle East risk premium still need monitoring.',
        summary:'As of June 19, 2026 09:00 KST, major wire reports do not confirm a new Israeli strike on mainland Iran. However, the early-June Israel-Iran clash history, Israeli opposition to the U.S.-Iran framework, and Lebanon-Hezbollah tensions remain separate risk factors. Hormuz reopening hopes are a downside factor for oil, but the risk premium should not be treated as fully gone.',
        impact:'The lack of a confirmed new strike weakens the short-term oil spike case, but geopolitical risk can still limit the scale of any August fuel surcharge cut.',
        tags:['Israel','Iran','Strait of Hormuz','oil prices','fuel surcharge outlook'],
        sourceRefs:[{name:'UKMTO Maritime Security',url:'https://www.ukmto.org/'}],
        faq:[
          {q:'Did Israel newly strike Iran?',a:'As of June 19, 2026 09:00 KST, major wire reports do not confirm a new Israeli strike on mainland Iran.'},
          {q:'How does Hormuz risk affect fuel surcharges?',a:'Delayed Hormuz normalization and insurance costs can affect jet fuel and MOPS expectations, limiting the scale of an August cut.'}
        ],
        links:[{href:'forecast.html',label:'View August outlook'}]
      }
    }
  }
].concat(window.AERO_NEWS_CARDS_20260619 || []);

window.AERO_NEWS_CARDS_20260622 = [
  {
    id:'news-20260622-hormuz-conditional-reopening',
    slug:'hormuz-conditional-reopening-august-2026-fuel-surcharge-outlook',
    category:'market',
    topic:'geopolitics',
    priority:1,
    date:'2026-06-22',
    updatedAt:'2026.06.22 07:00 KST',
    badge:'NEW',
    aiSummary:true,
    relevanceScore:1,
    title:'호르무즈 해협 재개방 기대 후퇴 - 8월 유류할증료 인하 폭 제한 변수',
    aiBrief:'호르무즈 해협 재개방 기대는 유가 하방 요인이지만, 조건부 정상화와 보험료 부담은 8월 유류할증료 인하 폭을 제한할 수 있습니다.',
    summary:'2026.06.22 07:00 KST 기준, 6월 19일에는 호르무즈 해협 재개방 기대가 유가 하방 요인으로 작용했지만 6월 21일 이후 이란 측 조건부 정상화 보도로 물류 정상화 지연과 리스크 프리미엄이 다시 부각됐습니다.\n\nMOPS 평균 338.3 cents/gal은 2026년 8월 유류할증료 하방 요인이지만, 호르무즈 해협의 보험료·선박 안전 점검·물류 정상화 지연은 큰 폭 인하를 제한할 수 있습니다.',
    impact:'MOPS 하락은 유지되지만 지정학 리스크가 남아 있어 8월 유류할증료는 보합 또는 소폭 인하 가능성 중심으로 봐야 하며, 큰 폭 인하로 단정하면 안 됩니다.',
    tags:['호르무즈 해협','MOPS','2026년 8월 유류할증료','국제유가','환율'],
    sourceRefs:[{name:'Reuters market context',url:'https://www.reuters.com/'}],
    faq:[
      {q:'호르무즈 해협 이슈가 8월 유류할증료에 영향을 주나요?',a:'네. 재개방 기대는 유가 하방 요인이지만 조건부 정상화, 보험료, 선박 안전 점검 지연은 항공유 가격과 MOPS 전망에 리스크로 남을 수 있습니다.'},
      {q:'2026년 8월 유류할증료는 인하가 정해졌나요?',a:'아닙니다. 2026.06.22 기준으로는 보합 또는 소폭 인하 가능성이 우세하지만, 8월 공시는 아직 발표 전입니다.'}
    ],
    links:[{href:'forecast.html',label:'8월 전망 보기'},{href:'news.html',label:'시장 뉴스 보기'}],
    i18n:{
      en:{
        updatedAt:'Updated 2026.06.22 07:00 KST',
        title:'Hormuz reopening hopes fade - a limiting factor for August 2026 fuel surcharge cuts',
        aiBrief:'Hormuz reopening hopes are oil-negative, but conditional normalization and insurance costs can limit the scale of any August fuel surcharge cut.',
        summary:'As of June 22, 2026 07:00 KST, Hormuz reopening hopes seen on June 19 were partly offset after reports that reopening remains conditional on Lebanon ceasefire stability and oil waivers.\n\nMOPS at 338.3 cents/gal supports downside pressure for the August 2026 fuel surcharge, but insurance, vessel safety checks and logistics delays can limit any large cut.',
        impact:'Lower MOPS remains supportive, but geopolitical risk means August should be described as flat to slightly lower, not as a confirmed sharp cut.',
        tags:['Strait of Hormuz','MOPS','August 2026 fuel surcharge','oil prices','FX'],
        sourceRefs:[{name:'Reuters market context',url:'https://www.reuters.com/'}],
        faq:[
          {q:'Does Hormuz affect the August 2026 fuel surcharge outlook?',a:'Yes. Reopening hopes are oil-negative, but conditional normalization, insurance and vessel checks can keep jet fuel risk premium alive.'},
          {q:'Is the August 2026 fuel surcharge cut confirmed?',a:'No. As of June 22, 2026, flat to slightly lower is the leading outlook, but the August filing is not confirmed.'}
        ],
        links:[{href:'forecast.html',label:'View August outlook'},{href:'news.html',label:'View market news'}]
      }
    }
  },
  {
    id:'news-20260622-tway-july-official-reflected',
    slug:'tway-air-july-2026-fuel-surcharge-official-reflected-june-22',
    category:'airline',
    topic:'official-notice',
    priority:1,
    date:'2026-06-22',
    updatedAt:'2026.06.22 07:00 KST',
    badge:'UPDATE',
    aiSummary:true,
    relevanceScore:1,
    title:'티웨이항공 2026년 7월 한국발 국제선 유류할증료 공식 공시 반영',
    aiBrief:'티웨이항공 2026년 7월 한국발 국제선 유류할증료 공지가 공식 확인되어 미반영 상태에서 공식 반영 상태로 정리했습니다.',
    summary:'티웨이항공은 2026.06.19 08:42에 2026년 7월 한국발 국제선 유류할증료 공지를 게시했습니다. 적용 기간은 2026.07.01~2026.07.31 발권 기준입니다.\n\n공식 표 기준 금액은 1군 33,400원, 2군 59,200원, 3군 74,400원, 4군 97,200원, 5군 104,700원, 6군 해당 없음, 7군 233,800원입니다. 이에 따라 2026년 7월 공식 공시 확인 항공사는 KE·OZ·7C·LJ·BX·ZE·RS·YP·TW로 정리합니다.',
    impact:'티웨이항공을 7월 공식 공시 반영 항공사에 포함하고, 기존 미반영 문구와 6월 fallback 표시를 제거해야 합니다.',
    tags:['티웨이항공','TW','2026년 7월 유류할증료','한국발 국제선','공식 공시'],
    sourceRefs:[{name:'Tway Air official notice',url:'https://www.twayair.com/app/customerCenter/notice/retrieve/12654'}],
    faq:[
      {q:'티웨이항공 2026년 7월 유류할증료는 공시됐나요?',a:'네. 2026.06.19 08:42 기준 티웨이항공 2026년 7월 한국발 국제선 유류할증료 공지가 확인됐습니다.'},
      {q:'티웨이항공 2026년 7월 유류할증료 금액은 얼마인가요?',a:'공식 표 기준 1군 33,400원, 2군 59,200원, 3군 74,400원, 4군 97,200원, 5군 104,700원, 6군 해당 없음, 7군 233,800원입니다.'}
    ],
    links:[{href:'airlines.html',label:'항공사별 공시 보기'},{href:'fuel-surcharge-korea.html',label:'6월 vs 7월 비교'}],
    i18n:{
      en:{
        updatedAt:'Updated 2026.06.22 07:00 KST',
        title:"T'way Air July 2026 Korea-departure international fuel surcharge officially reflected",
        aiBrief:"T'way Air's July 2026 notice is verified and has been moved from pending to official reflected status.",
        summary:"T'way Air posted its July 2026 Korea-departure international fuel surcharge notice at 08:42 KST on June 19, 2026. The ticketing period is July 1-31, 2026.\n\nThe official table lists KRW 33,400, 59,200, 74,400, 97,200, 104,700, no Group 6 amount, and KRW 233,800 for Group 7. Verified July airlines are KE, OZ, 7C, LJ, BX, ZE, RS, YP and TW.",
        impact:"T'way Air is included in verified July notices; old pending wording and June fallback display should be removed.",
        tags:["T'way Air",'TW','July 2026 fuel surcharge','Korea-departure international','official notice'],
        sourceRefs:[{name:'Tway Air official notice',url:'https://www.twayair.com/app/customerCenter/notice/retrieve/12654'}],
        faq:[
          {q:"Has T'way Air published its July 2026 fuel surcharge?",a:"Yes. T'way Air's July 2026 Korea-departure international fuel surcharge notice was posted at 08:42 KST on June 19, 2026."},
          {q:"How much is T'way Air's July 2026 surcharge?",a:"The official table lists KRW 33,400, 59,200, 74,400, 97,200, 104,700, no Group 6 amount, and KRW 233,800 for Group 7."}
        ],
        links:[{href:'airlines.html',label:'View airline notices'},{href:'fuel-surcharge-korea.html',label:'Compare June to July'}]
      }
    }
  }
].concat(window.AERO_NEWS_CARDS_20260622 || window.AERO_NEWS_CARDS_20260619 || []);

window.AERO_NEWS_CARDS_20260623 = [
  {
    id:'news-20260623-iata-jet-fuel-drop',
    slug:'iata-jet-fuel-14-percent-drop-august-2026-fuel-surcharge',
    category:'market',
    topic:'jet-fuel',
    priority:1,
    date:'2026-06-23',
    updatedAt:'2026.06.23 06:55 KST',
    badge:'NEW',
    aiSummary:true,
    relevanceScore:1,
    title:'IATA 항공유 14.2% 하락 - 8월 유류할증료 하방 압력 강화',
    aiBrief:'IATA 글로벌 항공유 평균이 119.17달러/bbl로 전주 대비 14.2% 하락해 2026년 8월 국제선 유류할증료의 보합 또는 소폭 인하 가능성을 키웁니다.',
    summary:'2026.06.23 06:55 KST 기준 IATA 글로벌 항공유 평균은 119.17달러/bbl로 전주 대비 14.2% 하락했습니다. 7월 공시 기준 MOPS 평균 338.3 cents/gal과 함께 보면 2026년 8월 유류할증료는 보합 또는 소폭 인하 가능성이 우세합니다.\n\n다만 원달러 환율이 약 1,534원대에 머물고 있어 실제 항공권 총액의 체감 인하 폭은 제한될 수 있습니다. 8월 유류할증료는 아직 공시 전이므로 인하가 결정된 것처럼 표현하면 안 됩니다.',
    impact:'항공유 하락은 8월 유류할증료 하방 요인이지만, 환율과 호르무즈 변수 때문에 큰 폭 인하는 단정하기 어렵습니다.',
    tags:['IATA 항공유','MOPS','2026년 8월 유류할증료','원달러 환율','항공유 가격'],
    sourceRefs:[{name:'IATA Jet Fuel Price Monitor',url:'https://www.iata.org/'}],
    faq:[
      {q:'IATA 항공유 가격 하락은 유류할증료에 어떤 영향을 주나요?',a:'항공유 가격 하락은 다음 달 유류할증료 하방 압력으로 작용할 수 있습니다. 다만 실제 공시는 MOPS 평균, 환율, 항공사 정책을 함께 반영합니다.'},
      {q:'2026년 8월 유류할증료 인하는 확정인가요?',a:'아닙니다. 2026.06.23 기준 보합 또는 소폭 인하 가능성이 우세하지만 8월 공시는 아직 발표 전입니다.'}
    ],
    links:[{href:'forecast.html',label:'8월 전망 보기'},{href:'fuel-surcharge-graph.html',label:'유류할증료 추이 보기'}],
    i18n:{
      en:{
        updatedAt:'Updated 2026.06.23 06:55 KST',
        title:'IATA jet fuel down 14.2% - more downside pressure for August fuel surcharge',
        aiBrief:'IATA global jet fuel averaged USD 119.17/bbl, down 14.2% WoW, strengthening the flat-to-slightly-lower August 2026 fuel surcharge outlook.',
        summary:'As of June 23, 2026 06:55 KST, IATA global jet fuel is around USD 119.17/bbl, down 14.2% week over week. Together with the July filing MOPS average of 338.3 cents/gal, this supports a flat to slightly lower August fuel surcharge outlook.\n\nHowever, USD/KRW near KRW 1,534 can limit perceived total airfare relief. The August filing is not confirmed yet.',
        impact:'Lower jet fuel is a downside factor, but FX and Hormuz variables make a large cut uncertain.',
        tags:['IATA jet fuel','MOPS','August 2026 fuel surcharge','USD/KRW','jet fuel price'],
        sourceRefs:[{name:'IATA Jet Fuel Price Monitor',url:'https://www.iata.org/'}],
        faq:[
          {q:'How does lower IATA jet fuel affect fuel surcharges?',a:'Lower jet fuel can reduce next-month surcharge pressure, but actual filings use MOPS averages, FX and airline policies.'},
          {q:'Is the August 2026 fuel surcharge cut confirmed?',a:'No. Flat to slightly lower is the leading outlook as of June 23, but August notices are not published yet.'}
        ],
        links:[{href:'forecast.html',label:'View August outlook'},{href:'fuel-surcharge-graph.html',label:'View surcharge trend'}]
      }
    }
  },
  {
    id:'news-20260623-hormuz-partial-traffic-recovery',
    slug:'hormuz-partial-traffic-recovery-not-normalized-june-23',
    category:'market',
    topic:'geopolitics',
    priority:1,
    date:'2026-06-23',
    updatedAt:'2026.06.23 06:55 KST',
    badge:'NEW',
    aiSummary:true,
    relevanceScore:1,
    title:'호르무즈 해협 일부 통항 회복 - 정상화 완료는 아님',
    aiBrief:'호르무즈 해협 유조선 통항은 일부 회복됐지만 전쟁 이전 정상 수준으로 보기는 어렵습니다. 보험료와 선박 안전 점검은 8월 유류할증료 인하 폭을 제한할 수 있습니다.',
    summary:'2026.06.23 06:55 KST 기준 호르무즈 해협의 일부 유조선 통항은 회복됐지만 완전 정상화로 보기는 어렵습니다. 미국-이란 협상, 이란 원유 판매 임시 허용, 레바논 휴전 흐름은 유가 하방 요인이지만 보험료, 선박 안전 점검, 물류 정상화 속도는 여전히 확인해야 합니다.\n\n따라서 국제유가와 항공유 가격 하락은 8월 유류할증료 하방 요인이지만, 대폭 인하를 단정하기에는 이릅니다.',
    impact:'유가 급등 근거는 약해졌지만 호르무즈 리스크 프리미엄은 일부 남아 있어 8월 인하 폭을 제한할 수 있습니다.',
    tags:['호르무즈 해협','미국-이란 협상','국제유가','유류할증료 전망','중동 리스크'],
    sourceRefs:[{name:'Reuters market context',url:'https://www.reuters.com/'}],
    faq:[
      {q:'호르무즈 해협은 정상화됐나요?',a:'아닙니다. 일부 통항은 회복됐지만 전쟁 이전 정상 수준으로 보기 어렵고 보험료와 안전 점검, 물류 정상화가 변수로 남아 있습니다.'},
      {q:'호르무즈 해협은 유류할증료에 어떤 영향을 주나요?',a:'통항 리스크는 국제유가와 항공유 가격에 영향을 주어 다음 달 유류할증료 전망의 상방 또는 하방 제한 요인이 될 수 있습니다.'}
    ],
    links:[{href:'forecast.html',label:'호르무즈 영향 보기'},{href:'news.html',label:'시장 뉴스 보기'}],
    i18n:{
      en:{
        updatedAt:'Updated 2026.06.23 06:55 KST',
        title:'Hormuz tanker traffic partly recovers - not fully normalized',
        aiBrief:'Tanker traffic through the Strait of Hormuz has partly recovered, but it is not back to pre-war normal levels.',
        summary:'As of June 23, 2026 06:55 KST, some tanker traffic through the Strait of Hormuz has recovered, but full normalization is not confirmed. U.S.-Iran talks, temporary authorization for Iranian oil sales and Lebanon ceasefire signals are oil-negative, while insurance, vessel checks and logistics remain variables.\n\nLower oil and jet fuel support a downside August outlook, but a large cut should not be assumed.',
        impact:'The short-term oil spike case is weaker, but residual risk premium can limit any August surcharge cut.',
        tags:['Strait of Hormuz','U.S.-Iran talks','oil prices','fuel surcharge outlook','Middle East risk'],
        sourceRefs:[{name:'Reuters market context',url:'https://www.reuters.com/'}],
        faq:[
          {q:'Has the Strait of Hormuz normalized?',a:'No. Some tanker traffic has recovered, but pre-war normal levels are not confirmed and insurance/logistics remain variables.'},
          {q:'How does Hormuz affect fuel surcharges?',a:'Hormuz risk can affect oil and jet fuel prices, which in turn influences next-month fuel surcharge expectations.'}
        ],
        links:[{href:'forecast.html',label:'View Hormuz impact'},{href:'news.html',label:'View market news'}]
      }
    }
  },
  {
    id:'news-20260623-usdkrw-1534-total-airfare',
    slug:'usdkrw-1534-limits-airfare-relief-june-23',
    category:'market',
    topic:'fx',
    priority:2,
    date:'2026-06-23',
    updatedAt:'2026.06.23 06:55 KST',
    badge:'NEW',
    aiSummary:true,
    relevanceScore:0.98,
    title:'USD/KRW 1,534원대 - 항공유 하락에도 체감 인하 제한',
    aiBrief:'원달러 환율이 약 1,534원대에 머물면서 항공유 가격 하락에도 항공권 총액의 체감 인하 폭은 제한될 수 있습니다.',
    summary:'2026.06.23 06:55 KST 기준 원달러 환율은 약 1,534원대입니다. IATA 항공유와 국제유가 하락은 8월 유류할증료 하방 요인이지만 높은 환율은 원화 기준 항공권 총액의 체감 인하 폭을 줄일 수 있습니다.\n\n특히 제주항공, 진에어, 에어부산, 이스타항공, 에어프레미아처럼 USD 기준 공시를 쓰는 항공사는 결제 시점 환율에 따라 원화 체감액이 달라질 수 있습니다.',
    impact:'MOPS와 항공유 하락은 긍정적이지만, 높은 환율은 항공권 총액 절감 효과를 제한하는 변수입니다.',
    tags:['원달러 환율','USD/KRW','항공권 총액','유류할증료','환율 영향'],
    sourceRefs:[{name:'USD/KRW market snapshot',url:'forecast.html'}],
    faq:[
      {q:'원달러 환율이 높으면 유류할증료 체감액이 달라지나요?',a:'네. USD 기준 공시 항공사는 결제 시점 환율에 따라 원화 체감액이 달라질 수 있습니다.'},
      {q:'항공유가 내려도 항공권 총액이 바로 내려가나요?',a:'항공유 하락은 하방 요인이지만 환율, 운임, 세금, 좌석 상황이 함께 반영되므로 총액 인하가 즉시 보장되지는 않습니다.'}
    ],
    links:[{href:'fuel-surcharge-calculator.html',label:'항공권 총액 계산하기'},{href:'airlines.html',label:'항공사별 공시 보기'}],
    i18n:{
      en:{
        updatedAt:'Updated 2026.06.23 06:55 KST',
        title:'USD/KRW near 1,534 - lower jet fuel may not fully reduce total airfare',
        aiBrief:'USD/KRW near KRW 1,534 can limit perceived airfare relief even as jet fuel prices fall.',
        summary:'As of June 23, 2026 06:55 KST, USD/KRW is around KRW 1,534. Lower IATA jet fuel and oil prices are downside factors for August surcharges, but high FX can limit perceived total airfare relief in KRW.\n\nUSD-denominated airlines such as Jeju Air, Jin Air, Air Busan, Eastar Jet and Air Premia are more sensitive to the payment-date FX rate.',
        impact:'Lower MOPS and jet fuel are positive, but high FX remains a limiting factor for total airfare savings.',
        tags:['USD/KRW','foreign exchange','total airfare','fuel surcharge','FX impact'],
        sourceRefs:[{name:'USD/KRW market snapshot',url:'forecast.html'}],
        faq:[
          {q:'Does high USD/KRW affect fuel surcharge burden?',a:'Yes. For USD-denominated airline notices, the KRW amount felt by travelers can vary by payment-date FX rates.'},
          {q:'Will lower jet fuel immediately lower total airfare?',a:'Not necessarily. Fuel, FX, base fare, taxes and seat availability all affect total airfare.'}
        ],
        links:[{href:'fuel-surcharge-calculator.html',label:'Calculate total airfare'},{href:'airlines.html',label:'View airline notices'}]
      }
    }
  }
].concat(window.AERO_NEWS_CARDS_20260622 || window.AERO_NEWS_CARDS_20260619 || []);

window.AERO_NEWS_CARDS_20260624 = [
  {
    id:'news-20260624-brent-wti-august-downside',
    slug:'brent-wti-lower-august-2026-fuel-surcharge-june-24',
    category:'market',
    topic:'oil',
    priority:1,
    date:'2026-06-24',
    updatedAt:'2026.06.24 07:00 KST',
    badge:'NEW',
    aiSummary:true,
    relevanceScore:1,
    title:'브렌트유 77달러대·WTI 73달러대 - 8월 유류할증료 하방 압력 유지',
    aiBrief:'브렌트유 77.08달러/bbl, WTI 73.21달러/bbl 수준은 2026년 8월 국제선 유류할증료의 보합 또는 소폭 인하 가능성을 지지합니다.',
    summary:'2026.06.24 07:00 KST 기준 브렌트유는 77.08달러/bbl, WTI는 73.21달러/bbl 수준입니다. 미국-이란 협상과 공급 리스크 완화 신호로 국제유가 상방 압력이 약해지면서 2026년 8월 국제선 유류할증료는 보합 또는 소폭 인하 가능성이 우세합니다.\n\n다만 원달러 환율이 약 1,531원대에 머물고 있고 호르무즈 해협 정상화가 완전히 확인된 것은 아니므로, 큰 폭 인하를 확정적으로 표현하기는 어렵습니다.',
    impact:'국제유가 하락은 8월 유류할증료 하방 요인이지만, 환율과 호르무즈 변수가 인하 폭을 제한할 수 있습니다.',
    tags:['브렌트유','WTI','2026년 8월 유류할증료','국제유가','MOPS'],
    sourceRefs:[
      {name:'Reuters oil market reference',url:'https://www.reuters.com/'},
      {name:'IATA Fuel Price Monitor',url:'https://www.iata.org/en/publications/economics/fuel-monitor/'}
    ],
    faq:[
      {q:'국제유가 하락은 8월 유류할증료 인하를 확정하나요?',a:'아닙니다. 유가와 항공유 하락은 하방 요인이지만 8월 공시는 아직 발표 전이며 MOPS 평균, 환율, 항공사 정책이 함께 반영됩니다.'},
      {q:'2026년 8월 유류할증료 전망은 무엇인가요?',a:'2026.06.24 07:00 KST 기준으로는 보합 또는 소폭 인하 가능성이 우세하지만 큰 폭 인하는 단정하기 어렵습니다.'}
    ],
    links:[{href:'forecast.html',label:'8월 전망 보기'},{href:'fuel-surcharge-graph.html',label:'유류할증료 추이 보기'}],
    i18n:{
      en:{
        updatedAt:'Updated 2026.06.24 07:00 KST',
        title:'Brent near USD 77 and WTI near USD 73 - August surcharge downside pressure remains',
        aiBrief:'Brent around USD 77.08/bbl and WTI around USD 73.21/bbl support a flat to slightly lower August 2026 international fuel surcharge outlook.',
        summary:'As of June 24, 2026 07:00 KST, Brent is around USD 77.08/bbl and WTI around USD 73.21/bbl. Easing supply-risk signals and U.S.-Iran talks keep oil upside pressure weaker, supporting a flat to slightly lower August fuel surcharge outlook.\n\nHowever, USD/KRW near KRW 1,531 and incomplete Hormuz normalization make any large-cut assumption uncertain.',
        impact:'Lower oil is a downside factor for August surcharges, but FX and Hormuz variables can limit the size of any cut.',
        tags:['Brent','WTI','August 2026 fuel surcharge','oil prices','MOPS'],
        sourceRefs:[
          {name:'Reuters oil market reference',url:'https://www.reuters.com/'},
          {name:'IATA Fuel Price Monitor',url:'https://www.iata.org/en/publications/economics/fuel-monitor/'}
        ],
        faq:[
          {q:'Does lower oil confirm an August surcharge cut?',a:'No. Lower oil and jet fuel are downside factors, but August notices are not published yet and depend on MOPS averages, FX and airline policies.'},
          {q:'What is the August 2026 fuel surcharge outlook?',a:'As of June 24, 2026 07:00 KST, flat to slightly lower is more likely, but a large cut is uncertain.'}
        ],
        links:[{href:'forecast.html',label:'View August outlook'},{href:'fuel-surcharge-graph.html',label:'View surcharge trend'}]
      }
    }
  },
  {
    id:'news-20260624-hormuz-partial-transit-not-normalized',
    slug:'hormuz-partial-transit-not-normalized-june-24',
    category:'market',
    topic:'hormuz',
    priority:1,
    date:'2026-06-24',
    updatedAt:'2026.06.24 07:00 KST',
    badge:'NEW',
    aiSummary:true,
    relevanceScore:1,
    title:'호르무즈 해협 일부 통항 회복 - 정상화 완료는 아님',
    aiBrief:'일부 슈퍼탱커와 LNG 탱커 통항은 회복됐지만, 전쟁 이전 정상 수준으로 보기에는 탱커 정체와 높은 운임·보험료 변수가 남아 있습니다.',
    summary:'2026.06.24 07:00 KST 기준 호르무즈 해협에서는 일부 슈퍼탱커와 LNG 탱커 통항 회복 신호가 확인됩니다. 그러나 전쟁 이전 하루 평균 통항량에는 미치지 못하고, 걸프 해역 탱커 정체, 항만 피해, 선박 안전 점검, 상승한 탱커 운임과 보험료가 남아 있습니다.\n\n따라서 호르무즈 리스크는 유가 급등 요인으로는 약해졌지만 완전히 해소됐다고 보기 어렵고, 8월 유류할증료의 큰 폭 인하를 제한할 수 있습니다.',
    impact:'유가 급등 근거는 약해졌지만 정상화 지연은 8월 유류할증료 인하 폭 제한 요인입니다.',
    tags:['호르무즈 해협','유조선','LNG','국제유가','유류할증료 전망'],
    sourceRefs:[{name:'Reuters Hormuz shipping context',url:'https://www.reuters.com/'}],
    faq:[
      {q:'호르무즈 해협은 정상화됐나요?',a:'아닙니다. 일부 통항은 회복됐지만 전쟁 이전 정상 수준은 아니며 탱커 정체, 안전 점검, 보험료와 운임 변수가 남아 있습니다.'},
      {q:'호르무즈 리스크는 유류할증료에 어떤 영향을 주나요?',a:'호르무즈 리스크는 국제유가와 항공유 가격에 영향을 주며, 정상화가 지연되면 유류할증료 인하 폭을 제한할 수 있습니다.'}
    ],
    links:[{href:'forecast.html',label:'호르무즈 영향 보기'},{href:'news.html',label:'시장 뉴스 보기'}],
    i18n:{
      en:{
        updatedAt:'Updated 2026.06.24 07:00 KST',
        title:'Strait of Hormuz partially recovers - not fully normalized',
        aiBrief:'Some supertanker and LNG tanker transit has resumed, but tanker congestion, higher freight rates and insurance remain variables.',
        summary:'As of June 24, 2026 07:00 KST, some supertanker and LNG tanker traffic through the Strait of Hormuz has recovered. However, traffic is still below pre-war normal levels, with Gulf tanker congestion, port damage, vessel checks, higher tanker rates and insurance costs remaining.\n\nHormuz risk is less supportive of an oil spike than before, but it has not fully disappeared and can limit any large August surcharge cut.',
        impact:'The oil spike case is weaker, but incomplete normalization can limit the size of any August surcharge cut.',
        tags:['Strait of Hormuz','tankers','LNG','oil prices','fuel surcharge outlook'],
        sourceRefs:[{name:'Reuters Hormuz shipping context',url:'https://www.reuters.com/'}],
        faq:[
          {q:'Has the Strait of Hormuz normalized?',a:'No. Some traffic has recovered, but pre-war normal levels are not confirmed and congestion, checks, insurance and freight rates remain variables.'},
          {q:'How does Hormuz risk affect fuel surcharges?',a:'It can affect oil and jet fuel prices; delayed normalization can limit the scale of any surcharge cut.'}
        ],
        links:[{href:'forecast.html',label:'View Hormuz impact'},{href:'news.html',label:'View market news'}]
      }
    }
  },
  {
    id:'news-20260624-usdkrw-1531-airfare-relief',
    slug:'usdkrw-1531-limits-airfare-relief-june-24',
    category:'market',
    topic:'fx',
    priority:2,
    date:'2026-06-24',
    updatedAt:'2026.06.24 07:00 KST',
    badge:'NEW',
    aiSummary:true,
    relevanceScore:0.97,
    title:'USD/KRW 1,531원대 - 전일보다 낮지만 여전히 높은 환율',
    aiBrief:'원달러 환율은 약 1,531원대로 전일보다 낮아졌지만, 항공권 총액 체감 인하 폭을 제한할 수 있는 높은 구간입니다.',
    summary:'2026.06.24 07:00 KST 기준 원달러 환율은 약 1,531원대입니다. 전일 1,534원대보다 낮아졌지만 여전히 높은 구간이라, 항공유 가격 하락이 항공권 총액 인하로 온전히 체감되기에는 한계가 있습니다.\n\n특히 제주항공, 진에어, 에어부산, 이스타항공, 에어프레미아처럼 USD 기준 공시를 쓰는 항공사는 결제 시점 환율에 따라 원화 체감액이 달라질 수 있습니다.',
    impact:'환율은 8월 유류할증료 전망에서 인하 폭을 제한하는 변수로 유지됩니다.',
    tags:['원달러 환율','USD/KRW','항공권 총액','유류할증료','환율 영향'],
    sourceRefs:[{name:'Bank of Korea ECOS',url:'https://ecos.bok.or.kr/'}],
    faq:[
      {q:'원달러 환율이 높으면 유류할증료 체감액이 달라지나요?',a:'네. USD 기준 공시 항공사는 결제 시점 환율에 따라 원화 체감액이 달라질 수 있고, KRW 기준 항공권 총액 인하도 제한될 수 있습니다.'},
      {q:'항공유가 내려도 항공권 총액이 바로 내려가나요?',a:'아닙니다. 항공유, 환율, 운임, 세금, 좌석 상황이 함께 반영되므로 총액 인하가 즉시 보장되지는 않습니다.'}
    ],
    links:[{href:'fuel-surcharge-calculator.html',label:'항공권 총액 계산하기'},{href:'airlines.html',label:'항공사별 공시 보기'}],
    i18n:{
      en:{
        updatedAt:'Updated 2026.06.24 07:00 KST',
        title:'USD/KRW near 1,531 - lower than yesterday but still elevated',
        aiBrief:'USD/KRW near KRW 1,531 is lower than the prior day, but still high enough to limit perceived total airfare relief.',
        summary:'As of June 24, 2026 07:00 KST, USD/KRW is around KRW 1,531. It is lower than the prior day near KRW 1,534, but still high enough to limit how much lower jet fuel is felt in total airfare.\n\nUSD-denominated airlines such as Jeju Air, Jin Air, Air Busan, Eastar Jet and Air Premia remain sensitive to payment-date FX rates.',
        impact:'FX remains a limiting factor for the scale of any August surcharge or total airfare relief.',
        tags:['USD/KRW','foreign exchange','total airfare','fuel surcharge','FX impact'],
        sourceRefs:[{name:'Bank of Korea ECOS',url:'https://ecos.bok.or.kr/'}],
        faq:[
          {q:'Does high USD/KRW affect fuel surcharge burden?',a:'Yes. For USD-denominated airline notices, the KRW amount felt by travelers can vary by payment-date FX rates.'},
          {q:'Will lower jet fuel immediately lower total airfare?',a:'Not necessarily. Fuel, FX, base fare, taxes and seat availability all affect total airfare.'}
        ],
        links:[{href:'fuel-surcharge-calculator.html',label:'Calculate total airfare'},{href:'airlines.html',label:'View airline notices'}]
      }
    }
  }
].concat(window.AERO_NEWS_CARDS_20260623 || window.AERO_NEWS_CARDS_20260622 || window.AERO_NEWS_CARDS_20260619 || []);

window.AERO_NEWS_CARDS_20260625 = [
  {
    id:'news-20260625-brent-wti-august-downside',
    slug:'brent-wti-lower-august-2026-fuel-surcharge-june-25',
    category:'market',
    topic:'oil',
    priority:1,
    date:'2026-06-25',
    updatedAt:'2026.06.25 07:00 KST',
    badge:'NEW',
    aiSummary:true,
    relevanceScore:1,
    title:'브렌트유 73달러대·WTI 70달러대 - 8월 유류할증료 하방 압력 강화',
    aiBrief:'브렌트유 73.74달러/bbl, WTI 70.34달러/bbl 수준은 2026년 8월 국제선 유류할증료의 보합 또는 소폭 인하 전망을 강화합니다.',
    summary:'2026.06.25 07:00 KST 기준 브렌트유는 73.74달러/bbl, WTI는 70.34달러/bbl 수준까지 내려왔습니다. 호르무즈 해협 공급 차질 우려 완화와 걸프 지역 원유 흐름 회복 신호가 국제유가 하락 요인입니다.\n\n국제유가 하락과 IATA 글로벌 항공유 가격 하락은 2026년 8월 국제선 유류할증료의 하방 압력을 강화합니다. 다만 원달러 환율이 약 1,530원대 초중반이고 호르무즈 해협 정상화가 완전히 확인된 것은 아니므로 큰 폭 인하는 단정하기 어렵습니다.',
    impact:'국제유가 하락은 8월 유류할증료 하방 요인이지만, 환율과 호르무즈 변수가 인하 폭을 제한할 수 있습니다.',
    tags:['브렌트유','WTI','2026년 8월 유류할증료','국제유가','MOPS'],
    sourceRefs:[
      {name:'Reuters oil market reference',url:'https://www.reuters.com/'},
      {name:'IATA Fuel Price Monitor',url:'https://www.iata.org/en/publications/economics/fuel-monitor/'}
    ],
    faq:[
      {q:'브렌트유와 WTI 하락은 8월 유류할증료 인하를 확정하나요?',a:'아닙니다. 유가 하락은 하방 요인이지만 8월 유류할증료 공시는 아직 발표 전이며 MOPS 평균, 환율, 항공사 정책이 함께 반영됩니다.'},
      {q:'2026년 8월 유류할증료 전망은 무엇인가요?',a:'2026.06.25 07:00 KST 기준으로는 보합 또는 소폭 인하 가능성이 우세하지만 큰 폭 인하는 단정하기 어렵습니다.'}
    ],
    links:[{href:'forecast.html',label:'8월 전망 보기'},{href:'fuel-surcharge-graph.html',label:'유류할증료 추이 보기'}],
    i18n:{
      en:{
        updatedAt:'Updated 2026.06.25 07:00 KST',
        title:'Brent near USD 73 and WTI near USD 70 - August surcharge downside pressure strengthens',
        aiBrief:'Brent around USD 73.74/bbl and WTI around USD 70.34/bbl strengthen the flat-to-slightly-lower August 2026 fuel surcharge outlook.',
        summary:'As of June 25, 2026 07:00 KST, Brent is around USD 73.74/bbl and WTI around USD 70.34/bbl. Easing Strait of Hormuz supply-disruption fears and improving Gulf crude flows are key drivers behind lower oil prices.\n\nLower crude oil and lower IATA global jet fuel strengthen downside pressure for August 2026 international fuel surcharges. However, USD/KRW in the low-to-mid KRW 1,530 range and incomplete Hormuz normalization make a large cut uncertain.',
        impact:'Lower crude oil is a downside factor for August surcharges, but FX and Hormuz variables can limit the size of any cut.',
        tags:['Brent','WTI','August 2026 fuel surcharge','oil prices','MOPS'],
        sourceRefs:[
          {name:'Reuters oil market reference',url:'https://www.reuters.com/'},
          {name:'IATA Fuel Price Monitor',url:'https://www.iata.org/en/publications/economics/fuel-monitor/'}
        ],
        faq:[
          {q:'Does lower Brent and WTI confirm an August surcharge cut?',a:'No. Lower crude oil is a downside factor, but August notices are not published yet and depend on MOPS averages, FX and airline policies.'},
          {q:'What is the August 2026 fuel surcharge outlook?',a:'As of June 25, 2026 07:00 KST, flat to slightly lower is more likely, but a large cut is uncertain.'}
        ],
        links:[{href:'forecast.html',label:'View August outlook'},{href:'fuel-surcharge-graph.html',label:'View surcharge trend'}]
      }
    }
  },
  {
    id:'news-20260625-hormuz-oil-flow-not-normalized',
    slug:'hormuz-oil-flow-improves-not-normalized-june-25',
    category:'market',
    topic:'hormuz',
    priority:1,
    date:'2026-06-25',
    updatedAt:'2026.06.25 07:00 KST',
    badge:'NEW',
    aiSummary:true,
    relevanceScore:1,
    title:'호르무즈 해협 원유 흐름 회복 - 완전 정상화는 아님',
    aiBrief:'최근 24시간 동안 약 2,000만 배럴의 원유가 호르무즈 해협을 빠져나가며 흐름 회복 신호가 나타났지만, 물류 정상화는 아직 완전하지 않습니다.',
    summary:'2026.06.25 07:00 KST 기준 최근 24시간 동안 약 2,000만 배럴의 원유가 호르무즈 해협을 빠져나가며 원유 흐름 회복 신호가 나타났습니다. 이는 국제유가 급등 우려를 낮추는 요인입니다.\n\n다만 부유 기뢰, 군사 호위, 감독 통항, 높은 탱커 운임, 선박 대기 문제가 남아 있어 완전 정상화로 보기는 어렵습니다. 따라서 호르무즈 리스크는 약해졌지만 2026년 8월 유류할증료의 큰 폭 인하를 제한하는 변수로 남습니다.',
    impact:'원유 흐름 회복은 유가 하방 요인이지만, 완전 정상화 전까지는 리스크 프리미엄이 남아 8월 인하 폭을 제한할 수 있습니다.',
    tags:['호르무즈 해협','원유 흐름','국제유가','유조선','유류할증료 전망'],
    sourceRefs:[{name:'Reuters Hormuz shipping context',url:'https://www.reuters.com/'}],
    faq:[
      {q:'호르무즈 해협은 정상화됐나요?',a:'아닙니다. 원유 흐름 회복 신호는 있지만 부유 기뢰, 군사 호위, 감독 통항, 높은 운임과 선박 대기 문제가 남아 있습니다.'},
      {q:'호르무즈 해협 흐름 회복은 유류할증료에 어떤 영향을 주나요?',a:'국제유가와 항공유 가격의 급등 우려를 낮추지만 완전 정상화 전까지는 유류할증료 인하 폭을 제한할 수 있습니다.'}
    ],
    links:[{href:'forecast.html',label:'호르무즈 영향 보기'},{href:'news.html',label:'시장 뉴스 보기'}],
    i18n:{
      en:{
        updatedAt:'Updated 2026.06.25 07:00 KST',
        title:'Strait of Hormuz crude flow improves - not fully normalized',
        aiBrief:'Around 20 million barrels of oil exited Hormuz in the last 24 hours, but floating mines, escorts, supervised transit, high tanker rates and vessel queues remain.',
        summary:'As of June 25, 2026 07:00 KST, around 20 million barrels of oil exited the Strait of Hormuz in the last 24 hours, signaling an improvement in crude flows. This lowers the near-term oil spike concern.\n\nHowever, floating mines, military escorts, supervised transit, high tanker freight rates and vessel queues remain. Hormuz risk has eased but has not disappeared, and it can still limit the scale of any August fuel surcharge cut.',
        impact:'Improving flows are oil-negative, but risk premium remains until full normalization is confirmed.',
        tags:['Strait of Hormuz','crude flow','oil prices','tankers','fuel surcharge outlook'],
        sourceRefs:[{name:'Reuters Hormuz shipping context',url:'https://www.reuters.com/'}],
        faq:[
          {q:'Has the Strait of Hormuz normalized?',a:'No. Crude flows have improved, but mines, escorts, supervised transit, high rates and vessel queues remain.'},
          {q:'How does improved Hormuz flow affect fuel surcharges?',a:'It lowers oil-spike risk, but incomplete normalization can still limit the size of any surcharge cut.'}
        ],
        links:[{href:'forecast.html',label:'View Hormuz impact'},{href:'news.html',label:'View market news'}]
      }
    }
  },
  {
    id:'news-20260625-usdkrw-1530s-airfare-relief',
    slug:'usdkrw-1530s-limits-airfare-relief-june-25',
    category:'market',
    topic:'fx',
    priority:2,
    date:'2026-06-25',
    updatedAt:'2026.06.25 07:00 KST',
    badge:'NEW',
    aiSummary:true,
    relevanceScore:0.97,
    title:'USD/KRW 1,530원대 초중반 - 유가 하락에도 체감 인하 제한',
    aiBrief:'원달러 환율은 약 1,530원대 초중반으로, 유가와 항공유 하락이 항공권 총액 인하로 온전히 체감되는 것을 제한할 수 있습니다.',
    summary:'2026.06.25 07:00 KST 기준 원달러 환율은 약 1,530원대 초중반입니다. 브렌트유, WTI, IATA 글로벌 항공유 가격 하락은 8월 유류할증료 하방 요인이지만 높은 환율은 원화 기준 항공권 총액 체감 인하 폭을 제한할 수 있습니다.\n\n특히 제주항공, 진에어, 에어부산, 이스타항공, 에어프레미아처럼 USD 기준 공시를 쓰는 항공사는 결제 시점 환율에 따라 원화 체감액이 달라질 수 있습니다.',
    impact:'환율은 8월 유류할증료 전망에서 인하 폭과 항공권 총액 체감액을 제한하는 변수로 유지됩니다.',
    tags:['원달러 환율','USD/KRW','항공권 총액','유류할증료','환율 영향'],
    sourceRefs:[{name:'Bank of Korea ECOS',url:'https://ecos.bok.or.kr/'}],
    faq:[
      {q:'원달러 환율이 높으면 유류할증료 체감액이 달라지나요?',a:'네. USD 기준 공시 항공사는 결제 시점 환율에 따라 원화 체감액이 달라질 수 있고, KRW 기준 항공권 총액 인하도 제한될 수 있습니다.'},
      {q:'항공유가 내려도 항공권 총액이 바로 내려가나요?',a:'아닙니다. 항공유, 환율, 운임, 세금, 좌석 상황이 함께 반영되므로 총액 인하가 즉시 보장되지는 않습니다.'}
    ],
    links:[{href:'fuel-surcharge-calculator.html',label:'항공권 총액 계산하기'},{href:'airlines.html',label:'항공사별 공시 보기'}],
    i18n:{
      en:{
        updatedAt:'Updated 2026.06.25 07:00 KST',
        title:'USD/KRW in the low-to-mid 1,530s - lower oil may not fully reduce total airfare',
        aiBrief:'USD/KRW in the low-to-mid KRW 1,530 range can limit how much lower oil and jet fuel are felt in total airfare.',
        summary:'As of June 25, 2026 07:00 KST, USD/KRW is in the low-to-mid KRW 1,530 range. Lower Brent, WTI and IATA global jet fuel are downside factors for August surcharges, but elevated FX can limit perceived total airfare relief in KRW.\n\nUSD-denominated airlines such as Jeju Air, Jin Air, Air Busan, Eastar Jet and Air Premia remain sensitive to payment-date FX rates.',
        impact:'FX remains a limiting factor for the scale of August surcharge and total airfare relief.',
        tags:['USD/KRW','foreign exchange','total airfare','fuel surcharge','FX impact'],
        sourceRefs:[{name:'Bank of Korea ECOS',url:'https://ecos.bok.or.kr/'}],
        faq:[
          {q:'Does high USD/KRW affect fuel surcharge burden?',a:'Yes. For USD-denominated airline notices, the KRW amount felt by travelers can vary by payment-date FX rates.'},
          {q:'Will lower jet fuel immediately lower total airfare?',a:'Not necessarily. Fuel, FX, base fare, taxes and seat availability all affect total airfare.'}
        ],
        links:[{href:'fuel-surcharge-calculator.html',label:'Calculate total airfare'},{href:'airlines.html',label:'View airline notices'}]
      }
    }
  }
].concat(window.AERO_NEWS_CARDS_20260624 || window.AERO_NEWS_CARDS_20260623 || window.AERO_NEWS_CARDS_20260622 || window.AERO_NEWS_CARDS_20260619 || []);

window.AERO_NEWS_CARDS_20260626 = [
  {
    id:'news-20260626-brent-rebound-hormuz-safety-risk',
    slug:'brent-rebounds-hormuz-vessel-safety-risk-june-26',
    category:'market',
    topic:'oil',
    priority:1,
    date:'2026-06-26',
    updatedAt:'2026.06.26 07:00 KST',
    badge:'NEW',
    aiSummary:true,
    relevanceScore:1,
    title:'브렌트유 75달러대 반등 - 호르무즈 선박 안전 리스크 재부각',
    aiBrief:'브렌트유 75.26달러/bbl, WTI 71.92달러/bbl 반등은 8월 유류할증료의 큰 폭 인하 기대를 제한하는 변수입니다.',
    summary:'2026.06.26 07:00 KST 기준 브렌트유는 전일 저점 73.74달러/bbl에서 75.26달러/bbl로, WTI는 70.34달러/bbl에서 71.92달러/bbl로 반등했습니다. 오만 인근 선박 피격 이슈로 호르무즈·해상 안전 리스크 프리미엄이 일부 되살아난 영향입니다.\n\n8월 유류할증료는 여전히 보합 또는 소폭 인하 가능성이 우세하지만, 국제유가 반등과 해상 안전 리스크 때문에 큰 폭 인하로 단정하기는 어렵습니다.',
    impact:'8월 유류할증료 전망은 보합 또는 소폭 인하 가능성 우세를 유지하되, 큰 폭 인하 제한 요인이 강화됐습니다.',
    tags:['브렌트유','WTI','호르무즈 해협','2026년 8월 유류할증료','국제유가'],
    sourceRefs:[{name:'Reuters oil and shipping market context',url:'https://www.reuters.com/'}],
    faq:[
      {q:'브렌트유 반등은 8월 유류할증료 인하를 막나요?',a:'반등 자체가 인하를 막는 것은 아니지만, 큰 폭 인하를 단정하기 어렵게 만드는 제한 요인입니다.'},
      {q:'2026년 8월 유류할증료 전망은 바뀌었나요?',a:'보합 또는 소폭 인하 가능성 우세는 유지되지만, 전일보다 인하 폭 제한 문구를 더 강하게 볼 필요가 있습니다.'}
    ],
    links:[{href:'forecast.html',label:'8월 전망 보기'},{href:'fuel-surcharge-graph.html',label:'유류할증료 추이 보기'}],
    i18n:{en:{
      updatedAt:'Updated 2026.06.26 07:00 KST',
      title:'Brent rebounds to USD 75 - Hormuz vessel safety risk returns',
      aiBrief:'Brent at USD 75.26/bbl and WTI at USD 71.92/bbl limit expectations for a large August fuel surcharge cut.',
      summary:'As of June 26, 2026 07:00 KST, Brent rebounded from the previous low of USD 73.74/bbl to USD 75.26/bbl, while WTI rose from USD 70.34/bbl to USD 71.92/bbl. A vessel-hit incident near Oman revived part of the Hormuz and maritime safety risk premium.\n\nAugust surcharges are still more likely flat or slightly lower, but the oil rebound and safety risk make a large cut uncertain.',
      impact:'The flat-to-slightly-lower August outlook remains, but limiting factors for a large cut have strengthened.',
      tags:['Brent','WTI','Strait of Hormuz','August 2026 fuel surcharge','oil prices'],
      sourceRefs:[{name:'Reuters oil and shipping market context',url:'https://www.reuters.com/'}],
      faq:[
        {q:'Does the Brent rebound prevent an August fuel surcharge cut?',a:'Not by itself, but it makes a large cut less certain.'},
        {q:'Has the August 2026 outlook changed?',a:'Flat or slightly lower remains more likely, but the language around the limited size of any cut should be stronger than yesterday.'}
      ],
      links:[{href:'forecast.html',label:'View August outlook'},{href:'fuel-surcharge-graph.html',label:'View surcharge trend'}]
    }}
  },
  {
    id:'news-20260626-hormuz-flow-recovery-vessel-risk',
    slug:'hormuz-crude-flow-recovery-vessel-risk-june-26',
    category:'market',
    topic:'hormuz',
    priority:1,
    date:'2026-06-26',
    updatedAt:'2026.06.26 07:00 KST',
    badge:'NEW',
    aiSummary:true,
    relevanceScore:1,
    title:'호르무즈 원유 물동량 회복 - 선박 안전 리스크는 여전',
    aiBrief:'호르무즈 원유 수송은 전월 이후 최고 수준까지 회복됐지만, 오만 인근 선박 피격 이슈로 완전 정상화로 보기는 어렵습니다.',
    summary:'호르무즈 해협을 통한 원유 선적은 전월 이후 최고 수준까지 회복됐습니다. 6월 25일에는 최소 6척이 약 1,000만 배럴을 이송했고, 6월 24일에는 약 1,080만 배럴이 이동했습니다. 중동 연료유 수출도 6월 240만 톤, 하루 약 50만 8천 배럴 수준으로 4개월 만의 최고치를 전망합니다.\n\n다만 오만 인근 선박 피격과 안전 통항 지원 중단 이슈로 선박 안전 리스크가 다시 부각돼 전면 정상화로 보기에는 이릅니다.',
    impact:'원유 공급 우려 완화는 유가 하락 요인이지만, 선박 안전 리스크는 유류할증료 인하 폭을 제한하는 변수입니다.',
    tags:['호르무즈 해협','원유 물동량','유조선','해상 안전','유류할증료 전망'],
    sourceRefs:[{name:'Reuters Hormuz shipping context',url:'https://www.reuters.com/'}],
    faq:[
      {q:'호르무즈 해협은 정상화됐나요?',a:'원유 물동량은 회복됐지만 오만 인근 선박 피격과 안전 통항 지원 중단 이슈가 있어 완전 정상화로 보기는 어렵습니다.'},
      {q:'호르무즈 물동량 회복은 유류할증료에 어떤 의미인가요?',a:'공급 우려 완화는 하방 요인이지만, 선박 안전 리스크가 남아 인하 폭은 제한될 수 있습니다.'}
    ],
    links:[{href:'forecast.html',label:'호르무즈 영향 보기'},{href:'news.html',label:'시장 뉴스 보기'}],
    i18n:{en:{
      updatedAt:'Updated 2026.06.26 07:00 KST',
      title:'Hormuz crude flow recovers - vessel safety risk remains',
      aiBrief:'Hormuz crude shipments recovered to the highest level since the prior month, but vessel safety risk near Oman keeps full normalization uncertain.',
      summary:'Crude shipments through the Strait of Hormuz recovered to the highest level since the previous month. On June 25, at least six vessels moved about 10 million barrels, after roughly 10.8 million barrels moved on June 24. Middle East fuel-oil exports are also projected near 2.4 million tonnes in June, or about 508,000 bpd, a four-month high.\n\nHowever, a vessel-hit incident near Oman and paused safe-transit support keep maritime safety risk in focus, so full normalization is not confirmed.',
      impact:'Improved flows ease supply concerns, but vessel safety risk can limit the size of any surcharge cut.',
      tags:['Strait of Hormuz','crude flows','tankers','maritime safety','fuel surcharge outlook'],
      sourceRefs:[{name:'Reuters Hormuz shipping context',url:'https://www.reuters.com/'}],
      faq:[
        {q:'Has the Strait of Hormuz normalized?',a:'Crude flows have recovered, but the Oman vessel incident and safe-transit concerns mean full normalization is not confirmed.'},
        {q:'What does Hormuz flow recovery mean for fuel surcharges?',a:'It is a downside factor through lower supply concern, but maritime safety risk can limit the size of any cut.'}
      ],
      links:[{href:'forecast.html',label:'View Hormuz impact'},{href:'news.html',label:'View market news'}]
    }}
  },
  {
    id:'news-20260626-usdkrw-high-range-limits-relief',
    slug:'usdkrw-high-range-limits-airfare-relief-june-26',
    category:'market',
    topic:'fx',
    priority:2,
    date:'2026-06-26',
    updatedAt:'2026.06.26 07:00 KST',
    badge:'NEW',
    aiSummary:true,
    relevanceScore:0.97,
    title:'USD/KRW 높은 구간 유지 - 항공유 하락에도 체감 인하 제한',
    aiBrief:'원달러 환율이 1,530원대~1,540원대 중반의 높은 구간에 머물러 항공권 총액 체감 인하 폭을 제한할 수 있습니다.',
    summary:'원달러 환율은 1,530원대~1,540원대 중반의 높은 구간에 머물고 있습니다. 항공유와 MOPS 하락은 8월 유류할증료 하방 요인이지만, 높은 환율은 KRW 기준 유류할증료와 실제 항공권 총액의 체감 인하 폭을 제한할 수 있습니다.\n\n특히 USD 기준 공시 항공사는 결제 시점 환율에 따라 원화 체감액이 달라질 수 있습니다.',
    impact:'8월 전망에서 환율은 여전히 인하 폭 제한 요인입니다.',
    tags:['원달러 환율','USD/KRW','항공권 총액','유류할증료','환율 영향'],
    sourceRefs:[{name:'Bank of Korea ECOS',url:'https://ecos.bok.or.kr/'}],
    faq:[
      {q:'환율이 높으면 유류할증료 인하가 줄어드나요?',a:'항공유가 내려도 환율이 높은 구간에 있으면 원화 기준 체감 인하 폭이 제한될 수 있습니다.'},
      {q:'USD 기준 공시 항공사는 무엇을 봐야 하나요?',a:'공시 금액뿐 아니라 결제 시점 환율을 함께 확인해야 실제 원화 부담을 판단할 수 있습니다.'}
    ],
    links:[{href:'fuel-surcharge-calculator.html',label:'항공권 총액 계산하기'},{href:'airlines.html',label:'항공사별 공시 보기'}],
    i18n:{en:{
      updatedAt:'Updated 2026.06.26 07:00 KST',
      title:'USD/KRW remains high - lower jet fuel may not fully reduce total airfare',
      aiBrief:'USD/KRW in the low 1,530s to mid 1,540s can limit perceived total airfare relief.',
      summary:'USD/KRW remains in a high range from the low 1,530s to mid 1,540s. Lower jet fuel and MOPS are downside factors for August surcharges, but elevated FX can limit perceived KRW-based relief in both fuel surcharges and total airfare.\n\nFor USD-denominated airline notices, payment-date FX remains important.',
      impact:'FX remains a limiting factor for the size of any August surcharge relief.',
      tags:['USD/KRW','foreign exchange','total airfare','fuel surcharge','FX impact'],
      sourceRefs:[{name:'Bank of Korea ECOS',url:'https://ecos.bok.or.kr/'}],
      faq:[
        {q:'Does high FX reduce the impact of lower fuel surcharges?',a:'Yes. Even if jet fuel falls, high USD/KRW can limit the KRW-based relief felt by travelers.'},
        {q:'What should users check for USD-denominated airlines?',a:'They should check both the official surcharge and the payment-date exchange rate.'}
      ],
      links:[{href:'fuel-surcharge-calculator.html',label:'Calculate total airfare'},{href:'airlines.html',label:'View airline notices'}]
    }}
  }
].concat(window.AERO_NEWS_CARDS_20260625 || window.AERO_NEWS_CARDS_20260624 || window.AERO_NEWS_CARDS_20260623 || window.AERO_NEWS_CARDS_20260622 || window.AERO_NEWS_CARDS_20260619 || []);

window.AERO_NEWS_CARDS_20260629 = [
  {
    id:'news-20260629-july-surcharge-cut-confirmed',
    slug:'july-2026-fuel-surcharge-cut-confirmed-june-29',
    category:'airline',
    topic:'official-notice',
    priority:1,
    date:'2026-06-29',
    updatedAt:'2026.06.29 09:00 KST',
    badge:'NEW',
    aiSummary:true,
    relevanceScore:1,
    title:'2026년 7월 국제선 유류할증료, 주요 국적사 6월 대비 인하 공시 반영',
    aiBrief:'2026년 7월 한국발 국제선 유류할증료는 공시 확인 항공사 기준 6월 대비 인하된 사실 데이터입니다.',
    summary:'2026.06.29 09:00 KST 기준 2026년 7월 한국발 국제선 유류할증료는 대한항공, 아시아나항공, 제주항공, 진에어, 에어부산, 이스타항공, 에어서울, 에어프레미아, 티웨이항공 등 공시 확인 항공사 기준 6월 대비 인하 흐름이 반영됐습니다.\n\n7월 공시 금액은 확정 데이터로, 2026년 8월 유류할증료는 아직 공시 전 전망 데이터로 분리해 표시합니다.',
    impact:'7월 공시 인하 사실과 8월 전망을 분리해 검색과 AI 요약에서 혼동을 줄입니다.',
    tags:['7월 공시','유류할증료 인하','공식 공지','2026년 7월 유류할증료','한국발 국제선'],
    sourceRefs:[{name:'대한항공 2026년 7월 유류할증료 공지',url:'https://www.koreanair.com/contents/footer/customer-support/notice/2026/2607-infuel?pageNum=1'}],
    faq:[
      {q:'2026년 7월 유류할증료는 확정인가요?',a:'공시가 확인된 항공사 기준으로는 2026년 7월 유류할증료가 공식 공지 금액으로 반영된 사실 데이터입니다.'},
      {q:'8월 유류할증료도 확정인가요?',a:'아닙니다. 2026년 8월 유류할증료는 아직 공시 전이므로 보합 또는 소폭 인하 가능성 중심의 전망입니다.'}
    ],
    links:[{href:'airlines.html',label:'항공사별 7월 공시 보기'},{href:'forecast.html',label:'8월 전망 보기'}],
    i18n:{en:{
      updatedAt:'Updated 2026.06.29 09:00 KST',
      title:'July 2026 international fuel surcharges: verified Korean carriers show cuts from June',
      aiBrief:'July 2026 Korea-departure surcharges are factual notice data for verified airlines and should be separated from the August outlook.',
      summary:'As of June 29, 2026 09:00 KST, July Korea-departure international fuel surcharges for verified airlines reflect cuts from June. Verified carriers include Korean Air, Asiana, Jeju Air, Jin Air, Air Busan, Eastar Jet, Air Seoul, Air Premia and Tway Air.\n\nJuly notice amounts are factual data, while August 2026 remains an outlook before official notices.',
      impact:'Separates July official notice data from the August outlook for search and AI summaries.',
      tags:['July notice','fuel surcharge cut','official notice','July 2026 fuel surcharge','Korea departure'],
      sourceRefs:[{name:'Korean Air July 2026 fuel surcharge notice',url:'https://www.koreanair.com/contents/footer/customer-support/notice/2026/2607-infuel?pageNum=1'}],
      faq:[
        {q:'Is the July 2026 fuel surcharge confirmed?',a:'For airlines with verified notices, July 2026 surcharge amounts are official notice data.'},
        {q:'Is August 2026 confirmed?',a:'No. August 2026 remains an outlook before official airline notices.'}
      ],
      links:[{href:'airlines.html',label:'View July airline notices'},{href:'forecast.html',label:'View August outlook'}]
    }}
  },
  {
    id:'news-20260629-usdkrw-1535-limits-cut',
    slug:'usdkrw-1535-limits-august-surcharge-cut-june-29',
    category:'market',
    topic:'fx',
    priority:1,
    date:'2026-06-29',
    updatedAt:'2026.06.29 09:00 KST',
    badge:'NEW',
    aiSummary:true,
    relevanceScore:1,
    title:'원달러 환율 약 1,535원대, 8월 유류할증료 인하 폭 제한 변수',
    aiBrief:'원달러 환율 약 1,535원대는 항공유 가격 하락에도 원화 기준 체감 인하 폭을 제한할 수 있습니다.',
    summary:'2026.06.29 09:00 KST 기준 원달러 환율은 약 1,535원대입니다. 항공유 가격과 MOPS 하락은 2026년 8월 유류할증료 하방 요인이지만, 높은 환율은 원화 기준 유류할증료와 항공권 총액의 체감 인하 폭을 제한할 수 있습니다.\n\n특히 USD 기준 공시 항공사는 실제 결제 시점 환율을 함께 확인해야 합니다.',
    impact:'환율은 8월 유류할증료 전망에서 큰 폭 인하를 제한하는 핵심 변수입니다.',
    tags:['USD/KRW','환율','8월 전망','항공권 총액','유류할증료'],
    sourceRefs:[{name:'Bank of Korea ECOS',url:'https://ecos.bok.or.kr/'}],
    faq:[
      {q:'원달러 환율이 높으면 유류할증료 인하가 줄어드나요?',a:'항공유가 내려도 환율이 높으면 원화 기준 체감 인하 폭이 제한될 수 있습니다.'},
      {q:'USD 공시 항공사는 무엇을 봐야 하나요?',a:'공식 공시 금액과 결제 시점 환율을 함께 봐야 실제 원화 부담을 판단할 수 있습니다.'}
    ],
    links:[{href:'fuel-surcharge-calculator.html',label:'항공권 총액 계산하기'},{href:'forecast.html',label:'8월 전망 보기'}],
    i18n:{en:{
      updatedAt:'Updated 2026.06.29 09:00 KST',
      title:'USD/KRW near 1,535 limits the size of any August surcharge cut',
      aiBrief:'USD/KRW around KRW 1,535 can limit KRW-based relief even if jet fuel prices fall.',
      summary:'As of June 29, 2026 09:00 KST, USD/KRW is around KRW 1,535. Lower MOPS and jet fuel are downside factors for August, but elevated FX can limit the KRW-based relief in fuel surcharges and total airfare.\n\nFor USD-denominated airline notices, travelers should also check payment-date FX.',
      impact:'FX is a key limiting factor for a large August surcharge cut.',
      tags:['USD/KRW','FX','August outlook','total airfare','fuel surcharge'],
      sourceRefs:[{name:'Bank of Korea ECOS',url:'https://ecos.bok.or.kr/'}],
      faq:[
        {q:'Does high FX limit surcharge cuts?',a:'Yes. Even if jet fuel falls, high USD/KRW can limit KRW-based relief.'},
        {q:'What should users check for USD notices?',a:'They should check both official surcharge amounts and payment-date FX.'}
      ],
      links:[{href:'fuel-surcharge-calculator.html',label:'Calculate total airfare'},{href:'forecast.html',label:'View August outlook'}]
    }}
  },
  {
    id:'news-20260629-mops-iata-jetfuel-down-but-august-not-final',
    slug:'mops-iata-jetfuel-down-august-not-final-june-29',
    category:'market',
    topic:'mops',
    priority:1,
    date:'2026-06-29',
    updatedAt:'2026.06.29 09:00 KST',
    badge:'NEW',
    aiSummary:true,
    relevanceScore:1,
    title:'항공유 가격은 하락했지만, 8월 유류할증료 큰 폭 인하는 아직 불확실',
    aiBrief:'MOPS 338.3 cents/gal과 IATA 항공유 119.17달러/bbl은 하방 요인이지만 8월 산정 기간은 아직 진행 중입니다.',
    summary:'7월 공시 산정 기준 MOPS 평균은 338.3 cents/gal이고, IATA 글로벌 항공유 가격은 119.17달러/bbl로 전주 대비 14.2% 하락했습니다. 이는 2026년 8월 유류할증료의 하방 요인입니다.\n\n다만 8월 산정 기간은 아직 완료되지 않았고, 싱가포르 항공유·정제유 수급과 환율, 호르무즈 리스크가 남아 있어 큰 폭 인하를 단정하기는 어렵습니다.',
    impact:'항공유 하락은 긍정적이지만 8월 공시 전에는 확정 표현을 피해야 합니다.',
    tags:['MOPS','IATA 항공유','항공유 가격','8월 유류할증료','정제유 수급'],
    sourceRefs:[{name:'IATA Fuel Price Monitor',url:'https://www.iata.org/en/publications/economics/fuel-monitor/'}],
    faq:[
      {q:'MOPS가 내려가면 8월 유류할증료도 내려가나요?',a:'하락 가능성은 커지지만, 산정 기간 평균과 환율·호르무즈 리스크를 함께 봐야 하므로 확정은 아닙니다.'},
      {q:'IATA 항공유 가격은 왜 중요하나요?',a:'글로벌 항공유 가격 흐름을 보여주는 참고 지표로, 유류할증료 전망의 방향성을 판단하는 데 도움이 됩니다.'}
    ],
    links:[{href:'forecast.html',label:'MOPS 기반 8월 전망 보기'},{href:'fuel-surcharge-graph.html',label:'추이 보기'}],
    i18n:{en:{
      updatedAt:'Updated 2026.06.29 09:00 KST',
      title:'Jet fuel is lower, but a large August surcharge cut is still uncertain',
      aiBrief:'MOPS at 338.3 cents/gal and IATA jet fuel at USD 119.17/bbl are downside factors, but the August averaging period is not complete.',
      summary:'The July filing baseline MOPS average is 338.3 cents/gal, and IATA global jet fuel is USD 119.17/bbl, down 14.2% week over week. These are downside factors for August 2026 fuel surcharges.\n\nHowever, the August averaging period is still in progress, and Singapore jet fuel/refined-product supply, FX and Hormuz risks remain. A large cut should not be treated as confirmed.',
      impact:'Lower jet fuel is positive, but August should remain an outlook until official notices.',
      tags:['MOPS','IATA jet fuel','jet fuel prices','August fuel surcharge','refined-product supply'],
      sourceRefs:[{name:'IATA Fuel Price Monitor',url:'https://www.iata.org/en/publications/economics/fuel-monitor/'}],
      faq:[
        {q:'Does lower MOPS mean August will be lower?',a:'It raises the chance, but the final average, FX and Hormuz risk still matter.'},
        {q:'Why does IATA jet fuel matter?',a:'It is a useful global reference for the direction of jet fuel prices and surcharge outlooks.'}
      ],
      links:[{href:'forecast.html',label:'View MOPS-based August outlook'},{href:'fuel-surcharge-graph.html',label:'View trend'}]
    }}
  },
  {
    id:'news-20260629-hormuz-recovery-not-normalized',
    slug:'hormuz-transit-recovery-not-normalized-june-29',
    category:'market',
    topic:'hormuz',
    priority:1,
    date:'2026-06-29',
    updatedAt:'2026.06.29 09:00 KST',
    badge:'NEW',
    aiSummary:true,
    relevanceScore:1,
    title:'호르무즈 해협 통항 회복에도 완전 정상화는 아직',
    aiBrief:'호르무즈 해협 통항은 일부 회복됐지만 선박 안전, 보험료, 물류 지연 가능성이 남아 있습니다.',
    summary:'호르무즈 해협은 일부 선박 통항이 회복됐지만 완전 정상화로 보기는 어렵습니다. 선박 안전, 보험료, 통항 지연 가능성은 여전히 국제유가와 항공유 가격의 리스크 프리미엄으로 작용할 수 있습니다.\n\n따라서 2026년 8월 유류할증료 전망에서는 호르무즈 해협 리스크를 사전에 반영해야 합니다.',
    impact:'공급 불안 완화는 긍정적이지만 지정학 리스크는 8월 인하 폭을 제한할 수 있습니다.',
    tags:['호르무즈 해협','중동 리스크','국제유가','유류할증료 전망','선박 안전'],
    sourceRefs:[{name:'Reuters Middle East shipping context',url:'https://www.reuters.com/'}],
    faq:[
      {q:'호르무즈 해협은 정상화됐나요?',a:'일부 통항은 회복됐지만 선박 안전, 보험료, 통항 지연 가능성이 남아 완전 정상화로 보기는 어렵습니다.'},
      {q:'호르무즈 리스크는 유류할증료에 어떤 영향을 주나요?',a:'국제유가와 항공유 가격의 리스크 프리미엄을 높여 인하 폭을 제한할 수 있습니다.'}
    ],
    links:[{href:'forecast.html',label:'호르무즈 영향 보기'},{href:'news.html',label:'시장 뉴스 보기'}],
    i18n:{en:{
      updatedAt:'Updated 2026.06.29 09:00 KST',
      title:'Hormuz transit is recovering, but full normalization is not confirmed',
      aiBrief:'Some Hormuz transit has recovered, but vessel safety, insurance and logistics delay risks remain.',
      summary:'Some vessel transit through the Strait of Hormuz has recovered, but full normalization is not confirmed. Vessel safety, insurance costs and possible logistics delays can still add risk premium to oil and jet fuel prices.\n\nFor the August 2026 fuel surcharge outlook, Hormuz risk should remain a forward-looking variable.',
      impact:'Easing supply risk is positive, but geopolitics can limit the size of any August cut.',
      tags:['Strait of Hormuz','Middle East risk','oil prices','fuel surcharge outlook','vessel safety'],
      sourceRefs:[{name:'Reuters Middle East shipping context',url:'https://www.reuters.com/'}],
      faq:[
        {q:'Has Hormuz normalized?',a:'Some transit has recovered, but full normalization is not confirmed because vessel safety, insurance and delay risks remain.'},
        {q:'How does Hormuz risk affect surcharges?',a:'It can raise the risk premium in oil and jet fuel prices, limiting the size of a cut.'}
      ],
      links:[{href:'forecast.html',label:'View Hormuz impact'},{href:'news.html',label:'View market news'}]
    }}
  },
  {
    id:'news-20260629-august-outlook-flat-slightly-lower',
    slug:'august-2026-outlook-flat-slightly-lower-june-29',
    category:'market',
    topic:'outlook',
    priority:1,
    date:'2026-06-29',
    updatedAt:'2026.06.29 09:00 KST',
    badge:'NEW',
    aiSummary:true,
    relevanceScore:1,
    title:'2026년 8월 유류할증료 전망: 보합 또는 소폭 인하 우세, 변수는 환율과 호르무즈',
    aiBrief:'2026년 8월 유류할증료는 보합 또는 소폭 인하 가능성이 우세하지만 큰 폭 인하는 단정하기 어렵습니다.',
    summary:'2026.06.29 기준 2026년 8월 국제선 유류할증료는 보합 또는 소폭 인하 가능성이 우세합니다. MOPS와 IATA 항공유 하락은 하방 요인이지만, 원달러 환율 약 1,535원대와 호르무즈 해협 리스크는 인하 폭을 제한하는 변수입니다.\n\n8월 공시는 아직 발표 전이므로 확정 표현 대신 전망, 가능성, 현재 기준 표현으로 구분해야 합니다.',
    impact:'8월 전망 페이지와 뉴스 요약이 같은 방향으로 정리됩니다.',
    tags:['8월 유류할증료','전망','보합 가능성','소폭 인하','환율'],
    sourceRefs:[{name:'IATA Fuel Price Monitor',url:'https://www.iata.org/en/publications/economics/fuel-monitor/'},{name:'Bank of Korea ECOS',url:'https://ecos.bok.or.kr/'}],
    faq:[
      {q:'2026년 8월 유류할증료는 인하되나요?',a:'현재 기준으로는 보합 또는 소폭 인하 가능성이 우세하지만 아직 공식 공시 전입니다.'},
      {q:'큰 폭 인하를 기대해도 되나요?',a:'환율과 호르무즈 리스크가 남아 있어 큰 폭 인하는 단정하기 어렵습니다.'}
    ],
    links:[{href:'forecast.html',label:'8월 전망 자세히 보기'},{href:'fuel-surcharge-calculator.html',label:'총액 계산하기'}],
    i18n:{en:{
      updatedAt:'Updated 2026.06.29 09:00 KST',
      title:'August 2026 fuel surcharge outlook: flat or slightly lower is more likely; FX and Hormuz are the variables',
      aiBrief:'August 2026 is more likely flat or slightly lower, but a large cut is uncertain.',
      summary:'As of June 29, 2026, August 2026 international fuel surcharges are more likely flat or slightly lower. Lower MOPS and IATA jet fuel are downside factors, while USD/KRW around 1,535 and Hormuz risk limit the size of any cut.\n\nAugust official notices have not been published, so wording should remain outlook-based rather than confirmed.',
      impact:'News summaries and the forecast page stay aligned.',
      tags:['August fuel surcharge','outlook','flat scenario','slightly lower','FX'],
      sourceRefs:[{name:'IATA Fuel Price Monitor',url:'https://www.iata.org/en/publications/economics/fuel-monitor/'},{name:'Bank of Korea ECOS',url:'https://ecos.bok.or.kr/'}],
      faq:[
        {q:'Will August 2026 fuel surcharges fall?',a:'Flat or slightly lower is more likely as of now, but official notices are not out yet.'},
        {q:'Can users expect a large cut?',a:'A large cut is uncertain because FX and Hormuz risks remain.'}
      ],
      links:[{href:'forecast.html',label:'View August outlook'},{href:'fuel-surcharge-calculator.html',label:'Calculate total airfare'}]
    }}
  }
].concat(window.AERO_NEWS_CARDS_20260626 || window.AERO_NEWS_CARDS_20260625 || window.AERO_NEWS_CARDS_20260624 || window.AERO_NEWS_CARDS_20260623 || window.AERO_NEWS_CARDS_20260622 || window.AERO_NEWS_CARDS_20260619 || []);

window.AERO_NEWS_CARDS_20260701 = [
  {
    id:'news-20260701-market-brief-0900',
    slug:'fuel-surcharge-market-brief-20260701-0900',
    category:'market',
    topic:'daily-brief',
    priority:1,
    date:'2026-07-01',
    updatedAt:'2026.07.01 09:00 KST',
    badge:'NEW',
    aiSummary:true,
    relevanceScore:1,
    title:'2026.07.01 09:00 KST 기준 7월 유류할증료 인하 적용 시작·8월 전망 점검',
    aiBrief:'7월 국제선 유류할증료는 오늘부터 인하 적용 단계에 들어갔고, 8월은 보합 또는 소폭 인하 가능성이 우세하지만 아직 확정 전입니다.',
    summary:'2026.07.01 09:00 KST 기준 2026년 7월 한국발 국제선 유류할증료는 6월 27단계에서 7월 19단계로 낮아져 발권일 기준 적용 단계에 들어갔습니다. 7월 산정 기준 MOPS 평균은 338.3 cents/gal로 직전 산정 기준 410.02 cents/gal 대비 약 17.5% 낮습니다.\n\n8월 유류할증료는 아직 공시 전 전망 단계입니다. IATA 글로벌 항공유는 116.63달러/bbl로 전주 대비 2.1% 하락했고, 6월 30일 마감 기준 Brent는 72.92달러/bbl, WTI는 69.50달러/bbl입니다. 이는 8월 전망의 하방 요인이지만, USD/KRW가 약 1,550원 안팎이고 호르무즈 해협은 재개방 이후에도 선박 안전·보험료·물류 지연 리스크가 남아 있어 큰 폭 인하를 단정하기 어렵습니다.\n\n결론적으로 7월은 인하 적용 단계, 8월은 보합 또는 소폭 인하 가능성 우세지만 확정 전으로 분리해 봐야 합니다.',
    impact:'7월 확정 적용과 8월 전망을 분리하고, 8월은 MOPS·IATA 항공유 하락과 환율·호르무즈 리스크를 함께 반영합니다.',
    tags:['2026년 7월 유류할증료','2026년 8월 유류할증료 전망','MOPS','IATA 항공유','원달러 환율','호르무즈 해협'],
    faq:[
      {q:'2026년 7월 유류할증료는 적용이 시작됐나요?',a:'2026.07.01 기준 7월 한국발 국제선 유류할증료는 발권일 기준 적용 단계에 들어갔습니다.'},
      {q:'2026년 8월 유류할증료는 인하되나요?',a:'현재 기준으로는 보합 또는 소폭 인하 가능성이 우세하지만 8월 공시는 아직 확정 전입니다.'},
      {q:'환율은 어떤 변수인가요?',a:'USD/KRW가 약 1,550원 안팎이면 항공유 가격 하락에도 원화 기준 항공권 총액 체감 인하 폭이 제한될 수 있습니다.'}
    ],
    links:[{href:'forecast.html',label:'8월 전망 보기'},{href:'fuel-surcharge-calculator.html',label:'항공권 총액 계산하기'}],
    i18n:{en:{
      updatedAt:'Updated 2026.07.01 09:00 KST',
      title:'July surcharge cuts start applying and August outlook check as of July 1, 2026 09:00 KST',
      aiBrief:'July international fuel surcharge cuts have entered the ticketing-date application stage, while August remains an outlook and is not confirmed.',
      summary:'As of July 1, 2026 09:00 KST, July 2026 Korea-departure international fuel surcharges have entered the ticketing-date application stage after moving from Level 27 in June to Level 19 in July. The July filing MOPS average is 338.3 cents/gal, about 17.5% below the previous 410.02 cents/gal reference.\n\nAugust 2026 has not been officially announced yet. IATA global jet fuel is USD 116.63/bbl, down 2.1% week over week, while the June 30 close references are Brent at USD 72.92/bbl and WTI at USD 69.50/bbl. These are downside factors for August, but USD/KRW around 1,550 and incomplete Hormuz normalization with vessel safety, insurance and logistics-delay risks make a large cut uncertain.\n\nIn short, July is now an applied cut stage, while August is more likely flat or slightly lower but remains unconfirmed.',
      impact:'Separates July applied data from the August outlook and reflects MOPS/IATA downside factors together with FX and Hormuz risks.',
      tags:['July 2026 fuel surcharge','August 2026 fuel surcharge outlook','MOPS','IATA jet fuel','USD/KRW','Strait of Hormuz'],
      faq:[
        {q:'Have July 2026 fuel surcharge cuts started applying?',a:'Yes. As of July 1, 2026, July Korea-departure international fuel surcharges are in the ticketing-date application stage.'},
        {q:'Will August 2026 fuel surcharges fall?',a:'Flat or slightly lower is more likely for now, but August notices have not been confirmed.'},
        {q:'Why does FX matter?',a:'USD/KRW around 1,550 can limit KRW-based perceived total airfare relief even when jet fuel falls.'}
      ],
      links:[{href:'forecast.html',label:'View August outlook'},{href:'fuel-surcharge-calculator.html',label:'Calculate total airfare'}]
    }}
  }
];

window.AERO_NEWS_CARDS_20260630 = [
  {
    id:'news-20260630-market-brief-0920',
    slug:'fuel-surcharge-market-brief-20260630-0920',
    category:'market',
    topic:'daily-brief',
    priority:1,
    date:'2026-06-30',
    updatedAt:'2026.06.30 09:20 KST',
    badge:'NEW',
    aiSummary:true,
    relevanceScore:1,
    title:'2026.06.30 09:20 KST 기준 유류할증료·환율·MOPS·호르무즈 점검',
    aiBrief:'7월 유류할증료 인하는 확정 흐름이지만 8월 전망은 환율·호르무즈·미국-이란 사안 때문에 보수적으로 봐야 합니다.',
    summary:'2026.06.30 09:20 KST 기준 2026년 7월 한국발 국제선 유류할증료는 공시 확인 항공사 기준 6월 대비 인하된 사실 데이터입니다.\n\n2026년 8월 유류할증료는 아직 공시 전입니다. MOPS 338.3 cents/gal은 7월 공시 산정 기준값이고, IATA 글로벌 항공유는 116.63달러/bbl로 전주 대비 2.1% 하락했습니다. 다만 USD/KRW는 약 1,540원대 초중반이고, 호르무즈 해협은 일부 원유·LNG 선적이 이어지지만 완전 정상화로 보기 어렵습니다.\n\n미국의 이란 공격 보도는 사실로 확인되지만, 2026년 6월 30일 오전 신규 공격이라기보다 6월 26~27일 호르무즈 인근 선박 공격 이후 미국의 보복 공습과 이란의 재보복이 이어진 사안으로 정리해야 합니다.',
    impact:'7월 확정 공시와 8월 전망을 분리하고, 8월은 보합 또는 소폭 인하 가능성 중심으로 보수적으로 해석합니다.',
    tags:['2026년 8월 유류할증료 전망','MOPS','IATA 항공유','원달러 환율','호르무즈 해협'],
    faq:[
      {q:'2026년 8월 유류할증료는 인하되나요?',a:'현재 기준으로는 보합 또는 소폭 인하 가능성이 우세하지만, 8월 공시는 아직 발표 전입니다.'},
      {q:'7월 유류할증료와 8월 전망은 어떻게 구분하나요?',a:'7월은 공시 확인 항공사 기준 사실 데이터이고, 8월은 MOPS·환율·호르무즈 변수를 반영한 전망 데이터입니다.'}
    ],
    links:[{href:'forecast.html',label:'8월 전망 보기'},{href:'fuel-surcharge-calculator.html',label:'항공권 총액 계산하기'}],
    i18n:{en:{
      updatedAt:'Updated 2026.06.30 09:20 KST',
      title:'Fuel surcharge, FX, MOPS and Hormuz brief as of June 30, 2026 09:20 KST',
      aiBrief:'July surcharge cuts are factual notice data, but August should be interpreted conservatively because of FX, Hormuz and U.S.-Iran risks.',
      summary:'As of June 30, 2026 09:20 KST, July 2026 Korea-departure international fuel surcharges are factual notice data showing cuts from June for verified airlines.\n\nAugust 2026 has not been officially announced yet. MOPS at 338.3 cents/gal is the July filing baseline, and IATA global jet fuel is USD 116.63/bbl, down 2.1% week over week. However, USD/KRW is around the low-to-mid KRW 1,540s, and Hormuz oil and LNG shipments continue only under incomplete normalization.\n\nReports of U.S. strikes on Iran are factual, but they should not be described as a new June 30 morning strike. They refer to the June 26-27 sequence after vessel attacks near Hormuz, followed by U.S. retaliatory strikes and Iran-related counteraction.',
      impact:'Separates July factual notices from the August outlook and keeps the August view conservative.',
      tags:['August 2026 fuel surcharge outlook','MOPS','IATA jet fuel','USD/KRW','Strait of Hormuz'],
      faq:[
        {q:'Will August 2026 fuel surcharges fall?',a:'Flat or slightly lower is more likely for now, but official August notices have not been published.'},
        {q:'How should July and August be separated?',a:'July is factual notice data for verified airlines, while August is an outlook based on MOPS, FX and Hormuz variables.'}
      ],
      links:[{href:'forecast.html',label:'View August outlook'},{href:'fuel-surcharge-calculator.html',label:'Calculate total airfare'}]
    }}
  },
  {
    id:'news-20260630-us-iran-strike-factcheck',
    slug:'us-iran-strike-factcheck-20260630',
    category:'market',
    topic:'geopolitics',
    priority:1,
    date:'2026-06-30',
    updatedAt:'2026.06.30 09:20 KST',
    badge:'FACT CHECK',
    aiSummary:true,
    relevanceScore:1,
    title:'미국의 이란 공격 보도 사실 확인 - 6월 30일 신규 공격 표현은 주의',
    aiBrief:'미국의 이란 공격은 확인됐지만 6월 30일 오전 신규 공격이 아니라 6월 26~27일 호르무즈 선박 공격 이후의 공습·보복 공방입니다.',
    summary:'미국의 이란 공격 보도는 사실로 확인됩니다. 다만 2026년 6월 30일 오전 신규 공격이라기보다 6월 26~27일 호르무즈 인근 선박 공격 이후 미국의 보복 공습과 이란의 재보복이 이어진 사안입니다. 6월 29일 기준 양측은 추가 공격을 일시 중단하고 긴장 완화 가능성을 경고 신호와 함께 보이고 있습니다.\n\n따라서 8월 유류할증료 전망에서는 단기 유가 급등을 확정하지 않고, 지정학 리스크 프리미엄이 인하 폭을 제한할 수 있다는 정도로 반영하는 것이 적절합니다.',
    impact:'지정학 리스크가 다시 부각되면서 8월 유류할증료 인하 폭을 제한할 수 있습니다.',
    tags:['미국 이란 공격','호르무즈 해협','지정학 리스크','8월 유류할증료','팩트체크'],
    faq:[
      {q:'미국이 이란을 다시 공격했다는 뉴스는 사실인가요?',a:'미국의 이란 공격 보도는 사실로 확인되지만, 6월 30일 오전 신규 공격이 아니라 6월 26~27일 사안으로 보는 것이 정확합니다.'},
      {q:'이 사안은 유류할증료에 어떤 영향을 주나요?',a:'국제유가와 항공유 가격의 리스크 프리미엄을 높여 8월 인하 폭을 제한할 수 있습니다.'}
    ],
    links:[{href:'forecast.html',label:'지정학 리스크 반영 전망 보기'}],
    i18n:{en:{
      updatedAt:'Updated 2026.06.30 09:20 KST',
      title:'Fact-check: U.S. strikes on Iran were reported, but avoid calling it a new June 30 strike',
      aiBrief:'U.S. strikes on Iran are confirmed, but they refer to the June 26-27 sequence after Hormuz vessel attacks, not a new June 30 morning strike.',
      summary:'Reports of U.S. strikes on Iran are factual. However, it is more accurate to treat them as part of the June 26-27 sequence after vessel attacks near Hormuz, followed by U.S. retaliatory strikes and Iran-related counteraction, rather than as a new June 30 morning strike. By June 29, both sides had paused additional attacks while warning signals remained.\n\nFor the August fuel surcharge outlook, this should be reflected as a risk premium that can limit the size of any cut, not as proof of an immediate large oil spike.',
      impact:'Renewed geopolitical risk can limit the size of any August fuel surcharge cut.',
      tags:['U.S. Iran strike','Strait of Hormuz','geopolitical risk','August fuel surcharge','fact-check'],
      faq:[
        {q:'Is the report about a U.S. strike on Iran true?',a:'Yes, but it should be treated as the June 26-27 sequence rather than a new June 30 morning strike.'},
        {q:'How does this affect fuel surcharges?',a:'It can add risk premium to crude oil and jet fuel prices, limiting the size of a possible August cut.'}
      ],
      links:[{href:'forecast.html',label:'View geopolitical risk outlook'}]
    }}
  },
  {
    id:'news-20260630-hormuz-traffic-risk',
    slug:'hormuz-traffic-risk-20260630',
    category:'market',
    topic:'hormuz',
    priority:1,
    date:'2026-06-30',
    updatedAt:'2026.06.30 09:20 KST',
    badge:'NEW',
    aiSummary:true,
    relevanceScore:1,
    title:'호르무즈 해협, 일부 선적 지속에도 완전 정상화는 아직',
    aiBrief:'원유와 LNG 선적은 이어지고 있지만 선박 안전·보험료·통항 지연 리스크가 남아 있습니다.',
    summary:'중동 원유와 LNG 생산국의 선적은 이어지고 있습니다. 다만 일부 선박은 AIS를 끄거나 우회·지연 운항을 하는 것으로 알려져 완전 정상화로 보기는 어렵습니다.\n\nWSJ 기준으로 일요일 통항은 22척, 금요일부터 일요일까지는 총 108척 수준으로 언급됐습니다. 선박 안전, 보험료, 통항 지연 가능성이 남아 있어 호르무즈 해협은 2026년 8월 유류할증료 전망의 리스크 변수로 유지해야 합니다.',
    impact:'통항 회복은 긍정적이지만 완전 정상화 전까지 큰 폭 인하 전망을 제한합니다.',
    tags:['호르무즈 해협','선박 통항','원유 선적','LNG','보험료'],
    faq:[
      {q:'호르무즈 해협은 정상화됐나요?',a:'일부 원유와 LNG 선적은 이어지고 있지만 선박 안전, 보험료, 통항 지연 리스크 때문에 완전 정상화로 보기는 어렵습니다.'},
      {q:'호르무즈 통항은 8월 유류할증료에 왜 중요한가요?',a:'원유와 항공유 가격의 리스크 프리미엄에 영향을 주기 때문입니다.'}
    ],
    links:[{href:'forecast.html',label:'호르무즈 변수 보기'}],
    i18n:{en:{
      updatedAt:'Updated 2026.06.30 09:20 KST',
      title:'Hormuz traffic continues, but full normalization is still not confirmed',
      aiBrief:'Oil and LNG shipments continue, but vessel safety, insurance and delay risks remain.',
      summary:'Oil and LNG shipments from Middle East producers continue. However, some vessels are reportedly turning off AIS or operating with detours and delays, so full normalization is not confirmed.\n\nWSJ-referenced traffic figures cited 22 crossings on Sunday and 108 vessels from Friday through Sunday. Vessel safety, insurance costs and possible transit delays should remain risk variables for the August 2026 fuel surcharge outlook.',
      impact:'Transit recovery is positive, but incomplete normalization limits large-cut assumptions.',
      tags:['Strait of Hormuz','vessel traffic','oil shipment','LNG','insurance costs'],
      faq:[
        {q:'Has Hormuz normalized?',a:'Some oil and LNG shipments continue, but vessel safety, insurance and delay risks remain.'},
        {q:'Why does Hormuz traffic matter for August surcharges?',a:'It affects risk premium in crude oil and jet fuel prices.'}
      ],
      links:[{href:'forecast.html',label:'View Hormuz variable'}]
    }}
  },
  {
    id:'news-20260630-iata-mops-jetfuel',
    slug:'iata-mops-jetfuel-20260630',
    category:'market',
    topic:'mops',
    priority:1,
    date:'2026-06-30',
    updatedAt:'2026.06.30 09:20 KST',
    badge:'NEW',
    aiSummary:true,
    relevanceScore:1,
    title:'IATA 항공유 116.63달러/bbl, MOPS 338.3 cents/gal - 8월 하방 요인',
    aiBrief:'항공유 가격 하락은 8월 유류할증료 하방 요인이지만 산정 기간이 끝나지 않아 확정 표현은 피해야 합니다.',
    summary:'IATA 글로벌 항공유 가격은 116.63달러/bbl로 전주 대비 2.1% 하락했습니다. 7월 공시 산정 기준 MOPS 평균은 338.3 cents/gal이며 배럴 환산 기준은 약 142.09달러/bbl입니다.\n\n다만 2026년 8월 유류할증료 산정 기간은 2026.06.16~2026.07.15로 아직 진행 중입니다. 환율과 호르무즈 리스크가 남아 있으므로 8월 큰 폭 인하를 확정적으로 표현하면 안 됩니다.',
    impact:'항공유 하락은 8월 보합 또는 소폭 인하 가능성을 지지하지만, 공식 공시 전에는 전망으로만 다룹니다.',
    tags:['IATA 항공유','MOPS','항공유 가격','8월 유류할증료','싱가포르 항공유'],
    faq:[
      {q:'IATA 항공유 가격 하락은 8월 유류할증료 인하를 뜻하나요?',a:'하방 요인은 맞지만 8월 공시는 아직 전이므로 확정은 아닙니다.'},
      {q:'MOPS 338.3 cents/gal은 어떤 기준인가요?',a:'2026년 7월 유류할증료 공시 산정 기준 평균으로, 8월 전망의 참고값입니다.'}
    ],
    links:[{href:'fuel-surcharge-graph.html',label:'항공유 추이 보기'},{href:'forecast.html',label:'8월 전망 보기'}],
    i18n:{en:{
      updatedAt:'Updated 2026.06.30 09:20 KST',
      title:'IATA jet fuel at USD 116.63/bbl and MOPS at 338.3 cents/gal are August downside factors',
      aiBrief:'Lower jet fuel supports downside pressure for August, but the averaging period is not complete and confirmed wording should be avoided.',
      summary:'IATA global jet fuel is USD 116.63/bbl, down 2.1% week over week. The July filing MOPS average is 338.3 cents/gal, or roughly USD 142.09/bbl on a barrel basis.\n\nHowever, the August 2026 surcharge averaging window runs from June 16 to July 15, 2026 and is still in progress. FX and Hormuz risk remain, so a large August cut should not be described as confirmed.',
      impact:'Lower jet fuel supports a flat or slightly lower August view, but it remains an outlook before official notices.',
      tags:['IATA jet fuel','MOPS','jet fuel prices','August fuel surcharge','Singapore jet fuel'],
      faq:[
        {q:'Does lower IATA jet fuel mean August surcharges will fall?',a:'It is a downside factor, but August notices have not been published yet.'},
        {q:'What does MOPS 338.3 cents/gal refer to?',a:'It is the July 2026 filing average and a reference for the August outlook.'}
      ],
      links:[{href:'fuel-surcharge-graph.html',label:'View jet fuel trend'},{href:'forecast.html',label:'View August outlook'}]
    }}
  },
  {
    id:'news-20260630-usdkrw-1540',
    slug:'usdkrw-1540-20260630',
    category:'market',
    topic:'fx',
    priority:1,
    date:'2026-06-30',
    updatedAt:'2026.06.30 09:20 KST',
    badge:'NEW',
    aiSummary:true,
    relevanceScore:1,
    title:'원달러 환율 1,540원대, 유류할증료 체감 인하 폭 제한',
    aiBrief:'항공유가 내려도 원달러 환율이 1,540원대에 머물면 원화 기준 항공권 총액 인하 체감은 제한될 수 있습니다.',
    summary:'2026.06.30 09:20 KST 기준 USD/KRW는 약 1,540원대 초중반입니다. 항공유 가격 하락은 8월 유류할증료 하방 요인이지만 높은 환율은 원화 기준 유류할증료와 항공권 총액의 체감 인하 폭을 제한할 수 있습니다.\n\n특히 USD 기준 공시 항공사는 결제 시점 환율을 함께 확인해야 실제 원화 부담을 판단할 수 있습니다.',
    impact:'환율은 8월 유류할증료 전망에서 인하 폭을 제한하는 핵심 변수입니다.',
    tags:['USD/KRW','환율','항공권 총액','유류할증료','원화 부담'],
    faq:[
      {q:'원달러 환율이 높으면 유류할증료 인하 효과가 줄어드나요?',a:'항공유가 내려도 환율이 높으면 원화 기준 체감 인하 폭이 제한될 수 있습니다.'},
      {q:'USD 공시 항공사는 무엇을 확인해야 하나요?',a:'공식 공시 금액과 실제 결제 시점 환율을 함께 확인해야 합니다.'}
    ],
    links:[{href:'fuel-surcharge-calculator.html',label:'항공권 총액 계산하기'},{href:'forecast.html',label:'8월 전망 보기'}],
    i18n:{en:{
      updatedAt:'Updated 2026.06.30 09:20 KST',
      title:'USD/KRW in the 1,540 range can limit perceived fuel surcharge relief',
      aiBrief:'Even if jet fuel falls, USD/KRW around the 1,540 range can limit KRW-based total airfare relief.',
      summary:'As of June 30, 2026 09:20 KST, USD/KRW is around the low-to-mid KRW 1,540s. Lower jet fuel is a downside factor for August surcharges, but elevated FX can limit perceived relief in KRW-based surcharges and total airfare.\n\nFor airlines with USD-denominated notices, payment-date FX should be checked together with the official surcharge amount.',
      impact:'FX is a key limiting factor in the August fuel surcharge outlook.',
      tags:['USD/KRW','FX','total airfare','fuel surcharge','KRW burden'],
      faq:[
        {q:'Does high USD/KRW reduce the effect of lower surcharges?',a:'Yes. Even if jet fuel falls, high FX can limit KRW-based perceived relief.'},
        {q:'What should users check for USD-denominated notices?',a:'They should check both official surcharge amounts and payment-date FX.'}
      ],
      links:[{href:'fuel-surcharge-calculator.html',label:'Calculate total airfare'},{href:'forecast.html',label:'View August outlook'}]
    }}
  }
].concat(window.AERO_NEWS_CARDS_20260629 || window.AERO_NEWS_CARDS_20260626 || window.AERO_NEWS_CARDS_20260625 || window.AERO_NEWS_CARDS_20260624 || window.AERO_NEWS_CARDS_20260623 || window.AERO_NEWS_CARDS_20260622 || window.AERO_NEWS_CARDS_20260619 || []);

window.AERO_NEWS_CARDS_20260701 = (window.AERO_NEWS_CARDS_20260701 || []).concat(window.AERO_NEWS_CARDS_20260630 || []);

/*
 * News taxonomy and sourcing policy:
 * categories are limited to airline, institution, and market.
 * Detailed subjects belong in topic/tags. Internal pages are never sources.
 */
(function(){
  var allowedCategories={airline:true,institution:true,market:true};
  var externalSources={
    oil:[{name:'U.S. EIA - Petroleum & Other Liquids',url:'https://www.eia.gov/petroleum/'}],
    opec:[{name:'OPEC - Press Releases',url:'https://www.opec.org/press-releases.html'}],
    mops:[{name:'IATA - Fuel Price Monitor',url:'https://www.iata.org/en/publications/economics/fuel-monitor/'}],
    fx:[{name:'Bank of Korea ECOS',url:'https://ecos.bok.or.kr/'}],
    hormuz:[{name:'UKMTO - Maritime Security',url:'https://www.ukmto.org/'}],
    geopolitics:[{name:'UKMTO - Maritime Security',url:'https://www.ukmto.org/'}],
    main:[
      {name:'U.S. EIA - Petroleum & Other Liquids',url:'https://www.eia.gov/petroleum/'},
      {name:'IATA - Fuel Price Monitor',url:'https://www.iata.org/en/publications/economics/fuel-monitor/'},
      {name:'Bank of Korea ECOS',url:'https://ecos.bok.or.kr/'}
    ],
    outlook:[
      {name:'U.S. EIA - Petroleum & Other Liquids',url:'https://www.eia.gov/petroleum/'},
      {name:'IATA - Fuel Price Monitor',url:'https://www.iata.org/en/publications/economics/fuel-monitor/'},
      {name:'Bank of Korea ECOS',url:'https://ecos.bok.or.kr/'}
    ]
  };
  function isExternalUrl(value){
    try{
      var parsed=new URL(value);
      return /^https?:$/.test(parsed.protocol) &&
        !/(^|\.)aero-surcharge\.com$/i.test(parsed.hostname);
    }catch(e){
      return false;
    }
  }
  function inferTopic(card){
    if(card.topic) return card.topic;
    var value=(card.id||card.slug||'').toLowerCase();
    return ['hormuz','geopolitics','opec','mops','oil','fx','outlook','main'].find(function(key){
      return value.indexOf(key)!==-1;
    }) || '';
  }
  function enforce(card){
    if(!card) return card;
    if(!allowedCategories[card.category]) card.category='market';
    card.topic=inferTopic(card);
    if(!isExternalUrl(card.sourceUrl)){
      delete card.sourceUrl;
      delete card.sourceName;
    }
    var refs=(card.sourceRefs||externalSources[card.topic]||[]).filter(function(ref){
      return ref && ref.name && isExternalUrl(ref.url);
    });
    if(refs.length) card.sourceRefs=refs;
    else delete card.sourceRefs;
    return card;
  }
  Object.keys(window).filter(function(key){
    return /^AERO_NEWS_CARDS_\d{8}$/.test(key);
  }).forEach(function(key){
    (window[key]||[]).forEach(enforce);
  });
  window.AERO_NEWS_POLICY={
    categories:['airline','institution','market'],
    isExternalSourceUrl:isExternalUrl,
    enforceCard:enforce
  };
})();

Object.assign(window.I18N_SHARED.ko,{
  marketDataRef:'2026.06.12 06:00 KST 기준',
  marketBrent:'국제유가: 브렌트유 $90.38/bbl, WTI $87.71/bbl로 6월 초 고점보다 안정됐으며 OPEC+ 공급 기대가 추가 급등을 제한합니다.',
  marketMops:'항공유 가격(MOPS): 국제유가는 안정됐지만 여름 성수기와 국제선 수요로 하락 폭은 제한적입니다.',
  marketFx:'원달러 환율: 높은 환율 구간은 항공사의 원화 환산 연료비 부담을 높여 유류할증료 인하 여력을 제한합니다.',
  marketGeo:'호르무즈 해협: 전면 봉쇄 위험은 낮아졌지만 완전 정상화는 아니며 보험료와 지정학 프리미엄이 남아 있습니다.',
  marketOutlook:'2026년 7월 유류할증료는 동결 60~65%, 1단계 인상 25~30%, 2단계 이상 인상 10% 이하로 봅니다.'
});
Object.assign(window.I18N_SHARED.en,{
  marketDataRef:'As of 2026.06.12 06:00 KST',
  marketBrent:'Oil: Brent closed at $90.38/bbl and WTI at $87.71/bbl, below early-June highs, while OPEC+ supply expectations cap another spike.',
  marketMops:'MOPS jet fuel: steadier crude helps, but peak-season and international demand may limit the decline.',
  marketFx:'USD/KRW: elevated FX raises airlines’ KRW-equivalent fuel costs and limits room for a surcharge cut.',
  marketGeo:'Strait of Hormuz: complete-closure risk has declined, but insurance and geopolitical premiums remain before full normalization.',
  marketOutlook:'July 2026: freeze 60-65%, one-step increase 25-30%, and two steps or more 10% or less.'
});
Object.assign(window.I18N_SHARED.ja,{marketDataRef:'2026.06.12 06:00 KST時点',marketBrent:'原油: ブレント$90.38/bbl、WTI $87.71/bblで6月初めの高値を下回ります。',marketMops:'MOPS: 夏季と国際線需要により下落幅は限定的です。',marketFx:'USD/KRW: 高い為替水準が値下げ余地を制限します。',marketGeo:'ホルムズ海峡: 全面封鎖リスクは低下しましたが完全正常化ではありません。',marketOutlook:'7月は据え置き60〜65%、1段階引き上げ25〜30%、2段階以上10%以下です。'});
Object.assign(window.I18N_SHARED.zh,{marketDataRef:'截至2026.06.12 06:00 KST',marketBrent:'国际油价：布伦特$90.38/bbl、WTI $87.71/bbl，低于6月初高点。',marketMops:'MOPS：暑期和国际线需求限制跌幅。',marketFx:'美元/韩元：高汇率限制燃油附加费下调空间。',marketGeo:'霍尔木兹海峡：全面封锁风险下降，但尚未完全正常化。',marketOutlook:'7月维持60–65%，上调一级25–30%，上调两级以上10%以下。'});
Object.assign(window.I18N_SHARED.fr,{marketDataRef:'Au 2026.06.12 06:00 KST',marketBrent:'Pétrole: Brent 90,38 $/bbl et WTI 87,71 $/bbl, sous les sommets de début juin.',marketMops:'MOPS: la demande estivale limite la baisse.',marketFx:'USD/KRW: un change élevé limite une baisse de la surtaxe.',marketGeo:'Ormuz: le risque de fermeture totale diminue sans normalisation complète.',marketOutlook:'Juillet: statu quo 60-65%, hausse d’un palier 25-30%, deux paliers ou plus 10% ou moins.'});
Object.assign(window.I18N_SHARED.de,{marketDataRef:'Stand 2026.06.12 06:00 KST',marketBrent:'Öl: Brent 90,38 $/bbl und WTI 87,71 $/bbl, unter den Hochs Anfang Juni.',marketMops:'MOPS: Sommer- und internationale Nachfrage begrenzen den Rückgang.',marketFx:'USD/KRW: Ein hoher Wechselkurs begrenzt den Spielraum für Senkungen.',marketGeo:'Hormus: Das vollständige Sperrrisiko sinkt, aber keine volle Normalisierung.',marketOutlook:'Juli: unverändert 60-65%, eine Stufe höher 25-30%, zwei oder mehr Stufen höchstens 10%.'});

Object.assign(window.I18N_SHARED.ko,{marketDataRef:'2026.06.15 09:10 KST 기준',marketBrent:'국제유가: 미국-이란 합의 발표와 호르무즈 재개방 기대에 브렌트유는 약 $83.90/bbl, WTI는 약 $81.07/bbl로 급락했습니다.',marketMops:'항공유 가격(MOPS): 국제유가 급락은 긍정적이지만 여름 성수기 수요와 정제·물류 비용 때문에 시차를 두고 반영될 수 있습니다.',marketFx:'원달러 환율: 국제유가 급락은 원화 부담 완화 요인이지만 달러 강세와 글로벌 경기 우려는 변동 요인입니다.',marketGeo:'호르무즈 해협: 재개방을 포함한 합의가 발표됐지만 정식 서명과 실제 선박 운항·보험·물류 정상화 여부를 확인해야 합니다.',marketOutlook:'2026년 7월 유류할증료는 동결 70~75%, 1단계 인상 15~20%, 2단계 이상 인상 5% 이하로 판단합니다.'});
Object.assign(window.I18N_SHARED.en,{marketDataRef:'As of 2026.06.15 09:10 KST',marketBrent:'Oil: Brent fell to about $83.90/bbl and WTI to about $81.07/bbl after the U.S.-Iran framework and Hormuz reopening expectations.',marketMops:'MOPS jet fuel: the oil selloff is positive, but peak demand, refining and logistics can delay transmission.',marketFx:'USD/KRW: lower oil eases pressure, while dollar strength and global growth concerns remain variables.',marketGeo:'Strait of Hormuz: a reopening framework was announced, but formal signing and actual shipping, insurance and logistics normalization still require confirmation.',marketOutlook:'July 2026: freeze 70-75%, one-step increase 15-20%, and two steps or more 5% or less.'});
Object.assign(window.I18N_SHARED.ja,{marketDataRef:'2026.06.15 09:10 KST時点',marketBrent:'原油: 米国・イラン合意とホルムズ海峡再開期待でブレント約83.90ドル、WTI約81.07ドルへ下落しました。',marketMops:'MOPS: 原油下落は好材料ですが、夏季需要と精製・物流費により反映には時間差があります。',marketFx:'USD/KRW: 原油下落は負担緩和要因ですが、ドル高と景気懸念は変動要因です。',marketGeo:'ホルムズ海峡: 再開枠組みは発表されましたが、正式署名と実際の物流正常化を確認する必要があります。',marketOutlook:'7月は据え置き70〜75%、1段階引き上げ15〜20%、2段階以上5%以下です。'});
Object.assign(window.I18N_SHARED.zh,{marketDataRef:'截至2026.06.15 09:10 KST',marketBrent:'国际油价：美伊框架协议与霍尔木兹海峡重开预期使布伦特跌至约83.90美元，WTI约81.07美元。',marketMops:'MOPS：原油下跌是利好，但暑期需求、炼化和物流成本会造成延迟传导。',marketFx:'美元/韩元：油价下跌缓解压力，但美元强势与全球增长担忧仍是变量。',marketGeo:'霍尔木兹海峡：已公布重开框架，但仍需确认正式签署和实际航运、保险及物流正常化。',marketOutlook:'7月维持70–75%，上调一级15–20%，上调两级以上不超过5%。'});
Object.assign(window.I18N_SHARED.fr,{marketDataRef:'Au 2026.06.15 09:10 KST',marketBrent:'Pétrole: le cadre États-Unis-Iran et l’espoir de réouverture d’Ormuz ont ramené le Brent vers 83,90 $ et le WTI vers 81,07 $.',marketMops:'MOPS: la baisse du brut est positive, mais la demande estivale et les coûts de raffinage et de logistique retardent sa transmission.',marketFx:'USD/KRW: la baisse du pétrole allège la pression, mais le dollar et les craintes de croissance restent des variables.',marketGeo:'Ormuz: un cadre de réouverture a été annoncé, mais la signature et la normalisation réelle doivent être confirmées.',marketOutlook:'Juillet: statu quo 70-75%, hausse d’un palier 15-20%, deux paliers ou plus 5% ou moins.'});
Object.assign(window.I18N_SHARED.de,{marketDataRef:'Stand 2026.06.15 09:10 KST',marketBrent:'Öl: Das US-Iran-Rahmenabkommen und die Hormus-Öffnungserwartung drückten Brent auf etwa 83,90 $ und WTI auf etwa 81,07 $.',marketMops:'MOPS: Der Ölpreisrückgang hilft, wird wegen Sommernachfrage sowie Raffinerie- und Logistikkosten aber verzögert weitergegeben.',marketFx:'USD/KRW: Niedrigeres Öl entlastet, während Dollarstärke und Wachstumssorgen Variablen bleiben.',marketGeo:'Hormus: Ein Öffnungsrahmen wurde angekündigt, doch Unterzeichnung und tatsächliche Normalisierung müssen bestätigt werden.',marketOutlook:'Juli: unverändert 70-75%, eine Stufe höher 15-20%, zwei oder mehr Stufen höchstens 5%.'});

Object.assign(window.I18N_SHARED.ko,{marketDataRef:'2026.06.16 09:30 KST 기준',marketBrent:'국제유가: 미국-이란 평화 합의 초안과 호르무즈 재개방 기대가 유가 급등 우려를 낮추고 있지만, 정상화 지연으로 위험 프리미엄은 남아 있습니다.',marketMops:'항공유 가격(MOPS): 항공유 공급망 불안과 제트연료 가격 고공행진으로 2026년 7월 유류할증료 인하 압력을 제한하고 있습니다.',marketFx:'원달러 환율: 안정세는 긍정적이나 유류할증료 결정에는 MOPS 항공유 가격 영향이 더 크게 작용합니다.',marketGeo:'호르무즈 해협: 기뢰 제거와 선박 안전 점검, 보험료 정상화에 시간이 필요해 실제 원유 운송은 아직 정상 수준으로 보기 어렵습니다.',marketOutlook:'2026년 7월 국제선 유류할증료는 급격한 인하 가능성은 낮고, 현 수준 유지 또는 소폭 인상 가능성을 함께 봐야 합니다.'});
Object.assign(window.I18N_SHARED.en,{marketDataRef:'As of 2026.06.16 09:30 KST',marketBrent:'Oil: the U.S.-Iran peace draft and Hormuz reopening expectations reduce spike risk, but delayed normalization keeps a risk premium in place.',marketMops:'MOPS jet fuel: supply-chain uncertainty and elevated jet-fuel prices continue to limit the chance of July surcharge cuts.',marketFx:'USD/KRW: a steadier exchange rate is positive, but MOPS jet-fuel prices have the larger effect on fuel surcharges.',marketGeo:'Strait of Hormuz: minesweeping, vessel checks and insurance normalization may take time, so crude transport is not yet fully normal.',marketOutlook:'July 2026 international fuel surcharges: a sharp cut is unlikely, and unchanged to small increases remain possible.'});
Object.assign(window.I18N_SHARED.ja,{marketDataRef:'2026.06.16 09:30 KST時点',marketBrent:'原油: 米国・イラン和平草案とホルムズ再開期待で急騰リスクは低下しましたが、正常化遅延でリスクプレミアムは残ります。',marketMops:'MOPS: 航空燃料供給網の不安とジェット燃料高により、7月の引き下げ余地は限定的です。',marketFx:'USD/KRW: 為替安定は好材料ですが、燃油サーチャージにはMOPSの影響がより大きく作用します。',marketGeo:'ホルムズ海峡: 機雷除去、安全確認、保険料正常化には時間が必要です。',marketOutlook:'2026年7月は急激な引き下げの可能性が低く、据え置き〜小幅引き上げの可能性があります。'});
Object.assign(window.I18N_SHARED.zh,{marketDataRef:'截至2026.06.16 09:30 KST',marketBrent:'国际油价：美伊和平草案和霍尔木兹重开预期降低了飙升风险，但正常化延迟使风险溢价仍然存在。',marketMops:'MOPS：航空燃料供应链不稳和喷气燃料价格高位，继续限制7月燃油附加费下调空间。',marketFx:'美元/韩元：汇率趋稳是利好，但MOPS航空燃油价格影响更大。',marketGeo:'霍尔木兹海峡：排雷、船舶安全检查和保险费正常化仍需时间。',marketOutlook:'2026年7月国际线燃油附加费大幅下调可能性较低，维持至小幅上调仍有可能。'});
Object.assign(window.I18N_SHARED.fr,{marketDataRef:'Au 2026.06.16 09:30 KST',marketBrent:'Pétrole: le projet d’accord États-Unis-Iran et l’espoir de réouverture d’Ormuz réduisent le risque de flambée, mais la normalisation lente maintient une prime de risque.',marketMops:'MOPS: les tensions sur la chaîne d’approvisionnement et le prix élevé du kérosène limitent les baisses possibles en juillet.',marketFx:'USD/KRW: la stabilisation du change est positive, mais le MOPS reste le facteur dominant.',marketGeo:'Ormuz: le déminage, les contrôles de sécurité et la normalisation de l’assurance prendront du temps.',marketOutlook:'Juillet 2026: une forte baisse est peu probable; un statu quo ou une légère hausse reste possible.'});
Object.assign(window.I18N_SHARED.de,{marketDataRef:'Stand 2026.06.16 09:30 KST',marketBrent:'Öl: Der US-Iran-Friedensentwurf und die Hormus-Öffnungserwartung senken das Sprungrisiko, aber verzögerte Normalisierung hält eine Risikoprämie aufrecht.',marketMops:'MOPS: Unsicherheit in der Kerosin-Lieferkette und hohe Jet-Fuel-Preise begrenzen mögliche Juli-Senkungen.',marketFx:'USD/KRW: Stabilerer Wechselkurs hilft, doch MOPS wirkt stärker auf Treibstoffzuschläge.',marketGeo:'Hormus: Minenräumung, Sicherheitschecks und Versicherungsnormalisierung brauchen Zeit.',marketOutlook:'Juli 2026: eine starke Senkung ist unwahrscheinlich; unverändert bis kleine Erhöhung bleibt möglich.'});

/* 2026.06.16 index official filing copy.
   Reflects verified July notices and separates pending airlines. */
(function(){
  if (!window.I18N) return;
  var ko = {
    'index.title':'유류할증료 조회 — 2026년 7월 공식 공시 반영',
    'index.metaDesc':'한국 출발 국제선 항공사별 유류할증료를 노선·거리구간별로 비교하고, 2026년 7월 주요 항공사 공식 공시 금액을 확인합니다.',
    'index.heroTitle':'노선별 유류할증료 조회',
    'index.heroSub':'2026년 7월 공식 공시가 반영된 항공사별 유류할증료를 확인하세요',
    'index.signal1':'7월 공식 공시 반영',
    'index.signal2':'노선별 현재 적용 금액 확인',
    'index.signal3':'6월 대비 7월 변동률 확인',
    'index.decision.title':'2026년 7월 공식 공시 반영 완료',
    'index.decision.line1':'2026년 7월 유류할증료는 주요 한국 출발 국제선 항공사의 공식 공시 데이터를 반영했습니다.',
    'index.decision.line2':'항공사별 6월 대비 7월 변동률과 공식 공지 링크를 함께 확인할 수 있습니다.',
    'index.decision.line3':'USD 공시 항공사는 원문 통화를 유지하고, 원화 표시는 환율 적용 참고값으로 제공합니다.',
    'index.decision.conclusion':'조회 결과는 2026년 7월 공식 공시 금액을 기준으로 표시합니다.',
    'index.readiness.title':'7월 유류할증료 공시 반영 현황',
    'index.readiness.badge':'일부 공시 반영',
    'index.readiness.baseLabel':'확정 기준',
    'index.readiness.baseText':'2026년 7월 공식 공시 확인 항공사 반영',
    'index.readiness.targetLabel':'다음 입력',
    'index.readiness.targetText':'미공시 항공사 공지 확인 후 순차 반영',
    'index.readiness.watchLabel':'점검 변수',
    'index.readiness.watchText':'항공유 가격, 원/달러 환율, 호르무즈 리스크',
    'index.readiness.note':'대한항공, 아시아나항공, 제주항공, 진에어의 2026년 7월 공시는 공식 원문 기준으로 반영했습니다. 아직 공시되지 않은 항공사는 임의 금액 없이 대기 상태로 표시합니다.',
    'index.readiness.link':'2026년 7월 공시 반영 현황 보기 →',
    'index.status.updatedSuffix':' · 2026년 7월 공식 공시 반영',
    'index.meta.suffix':'한국 출발 국제선 · 2026년 7월 공식 공시 반영',
    'aff.myrealtrip.desc':'유류할증료는 발권 시점 기준으로 적용됩니다. 7월 공식 공시 금액과 실제 항공권 총액을 함께 비교하세요.',
    'index.quick.compare.name':'2026년 6월 → 7월 유류할증료 비교',
    'index.quick.compare.desc':'공시 완료 항공사의 6월 대비 7월 공식 금액 비교',
    'index.quick.jul.name':'2026년 8월 유류할증료 전망',
    'index.quick.jul.desc':'7월 공시 반영 이후 MOPS·환율·호르무즈 변수 점검'
  };
  var en = {
    'index.title':'Fuel surcharge search — July 2026 official notices reflected',
    'index.metaDesc':'Compare Korea-departure international fuel surcharges by airline and route using July 2026 official notices.',
    'index.heroSub':'Compare airline fuel surcharges with July 2026 official notices reflected',
    'index.signal1':'July official notices reflected',
    'index.signal2':'Check current route amounts',
    'index.signal3':'June-to-July change shown',
    'index.decision.title':'July 2026 official notices reflected',
    'index.decision.line1':'July 2026 official notice data is reflected for major Korea-departure international airlines.',
    'index.decision.line2':'Check official notice links and June-to-July changes by airline.',
    'index.decision.line3':'USD notices keep their original currency; KRW conversions are reference values only.',
    'index.decision.conclusion':'Route results show amounts based on July 2026 official notices.',
    'index.readiness.title':'July fuel surcharge notice status',
    'index.readiness.badge':'Partly reflected',
    'index.readiness.baseLabel':'Confirmed base',
    'index.readiness.baseText':'July 2026 official notices reflected where verified',
    'index.readiness.targetLabel':'Next entry',
    'index.readiness.targetText':'Add pending airline notices after verification',
    'index.readiness.watchLabel':'Variables',
    'index.readiness.watchText':'Jet fuel, USD/KRW, oil and Hormuz risk',
    'index.readiness.note':'July official notices for Korean Air, Asiana, Jeju Air and Jin Air are reflected from official sources. Airlines without confirmed July notices remain pending.',
    'index.readiness.link':'View July 2026 notice status →',
    'index.status.updatedSuffix':' · July 2026 official notices reflected',
    'index.meta.suffix':'Korea departure · July 2026 official notices reflected',
    'aff.myrealtrip.desc':'Fuel surcharges apply by ticketing date. Compare July official surcharge amounts with the actual total airfare.'
  };
  var ja = {
    'index.title':'燃油サーチャージ検索 — 6月確定公示と7月公示準備',
    'index.metaDesc':'韓国発国際線の燃油サーチャージを航空会社・路線別に比較し、2026年6月確定公示と7月公示準備状況を確認できます。',
    'index.heroSub':'6月確定公示を基準に比較し、7月公示準備状況を確認してください',
    'index.signal1':'6月公式公示反映済み',
    'index.signal2':'路線別の現在適用額を確認',
    'index.signal3':'7月公示入力準備中',
    'index.decision.title':'6月確定公示基準 · 7月公示入力準備',
    'index.decision.line1':'6月燃油サーチャージはKE・OZ・LJ・BX・ZE・RS・TW・7C・YPの公式公示データを基準に表示します。',
    'index.decision.line2':'7月燃油サーチャージはまだ確定前で、各航空会社の公式公示確認後に順次入力します。',
    'index.decision.line3':'7月入力前には航空燃油価格、USD/KRW、国際原油価格、ホルムズ海峡リスクを確認します。',
    'index.decision.conclusion':'現在の検索結果は6月確定データです。7月金額は公示確認後に確定データへ切り替えます。',
    'index.readiness.title':'7月燃油サーチャージ公示入力準備',
    'index.readiness.badge':'公示前 · 待機中',
    'index.readiness.baseLabel':'確定基準',
    'index.readiness.baseText':'2026年6月公式公示データを維持',
    'index.readiness.targetLabel':'次の入力',
    'index.readiness.targetText':'2026年7月航空会社別公示確認後に反映',
    'index.readiness.watchLabel':'確認変数',
    'index.readiness.watchText':'航空燃油価格、USD/KRW、ホルムズリスク',
    'index.readiness.note':'7月公示はまだ確定前です。現在の路線検索結果は6月確定公示を基準に提供し、7月データは航空会社公式公示が確認され次第入力します。',
    'index.readiness.link':'2026年7月燃油サーチャージ見通しを見る →',
    'index.status.updatedSuffix':' · 2026年6月公式公示反映 · 7月公示入力準備中',
    'index.meta.suffix':'韓国発国際線 · 2026年6月公式公示反映 · 7月公示準備中',
    'aff.myrealtrip.desc':'燃油サーチャージは発券日基準で適用されます。6月確定公示額を確認した後、同じ目的地の航空券総額も比較してください。'
  };
  var zh = {
    'index.title':'燃油附加费查询 — 6月已确认公告与7月公告准备',
    'index.metaDesc':'按航空公司和航线比较韩国出发国际线燃油附加费，并确认2026年6月已确认公告及7月公告准备状态。',
    'index.heroSub':'以6月已确认公告为基准比较，并确认7月公告准备状态',
    'index.signal1':'6月官方公告已反映',
    'index.signal2':'查看航线当前适用金额',
    'index.signal3':'7月公告录入准备中',
    'index.decision.title':'6月已确认公告基准 · 7月公告录入准备',
    'index.decision.line1':'6月燃油附加费基于KE、OZ、LJ、BX、ZE、RS、TW、7C、YP官方公告数据提供。',
    'index.decision.line2':'7月燃油附加费尚未确认，将在各航空公司官方公告确认后依次录入。',
    'index.decision.line3':'7月录入前，将同时观察航空燃油价格、美元/韩元、国际油价和霍尔木兹风险。',
    'index.decision.conclusion':'当前查询结果为6月确认数据。7月金额将在公告确认后切换为确认数据。',
    'index.readiness.title':'7月燃油附加费公告录入准备',
    'index.readiness.badge':'公告前 · 等待中',
    'index.readiness.baseLabel':'确认基准',
    'index.readiness.baseText':'维持2026年6月官方公告数据',
    'index.readiness.targetLabel':'下一步录入',
    'index.readiness.targetText':'确认2026年7月各航空公司公告后反映',
    'index.readiness.watchLabel':'观察变量',
    'index.readiness.watchText':'航空燃油价格、美元/韩元、霍尔木兹风险',
    'index.readiness.note':'7月公告尚未确认。当前航线查询结果以6月已确认公告为基准，7月数据将在航空公司官方公告确认后依次录入。',
    'index.readiness.link':'查看2026年7月燃油附加费展望 →',
    'index.status.updatedSuffix':' · 2026年6月官方公告已反映 · 7月公告录入准备中',
    'index.meta.suffix':'韩国出发国际线 · 2026年6月官方公告已反映 · 7月公告准备中',
    'aff.myrealtrip.desc':'燃油附加费按出票日期适用。确认6月已确定公告金额后，也请比较同一目的地的实际机票总价。'
  };
  Object.assign(window.I18N.ko || (window.I18N.ko = {}), ko);
  Object.assign(window.I18N.en || (window.I18N.en = {}), en);
  Object.assign(window.I18N.ja || (window.I18N.ja = {}), ja);
  Object.assign(window.I18N.zh || (window.I18N.zh = {}), zh);
})();

(function(){
  if (!window.I18N) return;
  var ko = {
    'index.title':'유류할증료 조회 — 2026년 7월 공식 공시 반영',
    'index.metaDesc':'한국 출발 국제선 항공사별 유류할증료를 노선·거리구간별로 비교하고, 대한항공·아시아나항공·제주항공·진에어·에어부산·이스타항공·에어서울·에어프레미아·티웨이항공 2026년 7월 공식 공시 금액을 확인합니다.',
    'index.heroTitle':'노선별 유류할증료 조회',
    'index.heroSub':'2026년 7월 공식 공시가 반영된 항공사별 유류할증료를 확인하세요',
    'index.signal1':'7월 공식 공시 반영',
    'index.signal2':'노선별 현재 적용 금액 확인',
    'index.signal3':'6월 대비 7월 변동률 확인',
    'index.decision.title':'2026년 7월 공식 공시 반영 완료',
    'index.decision.line1':'2026년 7월 유류할증료는 대한항공·아시아나항공·제주항공·진에어·에어부산·이스타항공·에어서울·에어프레미아·티웨이항공 공식 공시 데이터를 반영했습니다.',
    'index.decision.line2':'항공사별 6월 대비 7월 변동률과 공식 공지 링크를 함께 확인할 수 있습니다.',
    'index.decision.line3':'USD 공시 항공사는 원문 통화를 유지하고, 원화 표시는 환율 적용 참고값으로 제공합니다.',
    'index.decision.conclusion':'조회 결과는 2026년 7월 공식 공시 금액을 기준으로 표시합니다.',
    'index.readiness.title':'7월 유류할증료 공시 반영 현황',
    'index.readiness.badge':'일부 공시 반영',
    'index.readiness.baseLabel':'확정 기준',
    'index.readiness.baseText':'2026년 7월 공식 공시 확인 항공사 반영',
    'index.readiness.targetLabel':'다음 입력',
    'index.readiness.targetText':'미공시 항공사 공지 확인 후 순차 반영',
    'index.readiness.watchLabel':'점검 변수',
    'index.readiness.watchText':'항공유 가격, 원달러 환율, 호르무즈 리스크',
    'index.readiness.note':'대한항공, 아시아나항공, 제주항공, 진에어, 에어부산, 이스타항공의 2026년 7월 공시는 공식 원문 기준으로 반영했습니다. 아직 공시되지 않은 항공사는 임의 금액 없이 대기 상태로 표시합니다.',
    'index.readiness.link':'2026년 7월 공시 반영 현황 보기 →',
    'index.status.updatedSuffix':' · 2026년 7월 공식 공시 반영',
    'index.meta.suffix':'한국 출발 국제선 · 2026년 7월 공식 공시 반영',
    'aff.myrealtrip.desc':'유류할증료는 발권 시점 기준으로 적용됩니다. 7월 공식 공시 금액과 실제 항공권 총액을 함께 비교하세요.',
    'index.quick.compare.name':'2026년 6월 → 7월 유류할증료 비교',
    'index.quick.compare.desc':'공시 완료 항공사의 6월 대비 7월 공식 금액 비교',
    'index.quick.jul.name':'2026년 8월 유류할증료 전망',
    'index.quick.jul.desc':'7월 공시 반영 이후 MOPS·환율·호르무즈 변수 점검'
  };
  var en = {
    'index.title':'Fuel surcharge search — July 2026 official notices reflected',
    'index.metaDesc':'Compare Korea-departure international fuel surcharges by airline and route using July 2026 official notices for Korean Air, Asiana, Jeju Air, Jin Air, Air Busan, Eastar Jet, Air Seoul, Air Premia and Tway Air.',
    'index.heroTitle':'Route Fuel Surcharge Search',
    'index.heroSub':'Compare airline fuel surcharges with July 2026 official notices reflected.',
    'index.signal1':'July notices reflected',
    'index.signal2':'Check current route amounts',
    'index.signal3':'June-to-July changes shown',
    'index.decision.title':'July 2026 official notices reflected',
    'index.decision.line1':'July 2026 official notices are reflected for Korean Air, Asiana, Jeju Air, Jin Air, Air Busan, Eastar Jet, Air Seoul, Air Premia and Tway Air.',
    'index.decision.line2':'Check official notice links and June-to-July changes by airline.',
    'index.decision.line3':'USD notices keep their original currency; KRW conversions are reference values only.',
    'index.decision.conclusion':'Route results show amounts based on July 2026 official notices.',
    'index.readiness.title':'July fuel surcharge notice status',
    'index.readiness.badge':'Partly reflected',
    'index.readiness.baseLabel':'Confirmed base',
    'index.readiness.baseText':'July 2026 official notices reflected where verified',
    'index.readiness.targetLabel':'Next entry',
    'index.readiness.targetText':'Add pending airline notices after verification',
    'index.readiness.watchLabel':'Variables',
    'index.readiness.watchText':'Jet fuel, USD/KRW, oil and Hormuz risk',
    'index.readiness.note':'July official notices for Korean Air, Asiana, Jeju Air, Jin Air, Air Busan and Eastar Jet are reflected from official sources. Airlines without confirmed July notices remain pending.',
    'index.readiness.link':'View July 2026 notice status →',
    'index.status.updatedSuffix':' · July 2026 official notices reflected',
    'index.meta.suffix':'Korea departure · July 2026 official notices reflected',
    'aff.myrealtrip.desc':'Fuel surcharges apply by ticketing date. Compare July official surcharge amounts with the actual total airfare.',
    'index.quick.compare.name':'June to July 2026 fuel surcharge comparison',
    'index.quick.compare.desc':'Official June-to-July changes for verified airlines',
    'index.quick.jul.name':'August 2026 fuel surcharge outlook',
    'index.quick.jul.desc':'MOPS, FX and Hormuz variables after July notices'
  };
  Object.assign(window.I18N.ko || (window.I18N.ko = {}), ko);
  Object.assign(window.I18N.en || (window.I18N.en = {}), en);
  ['ja','zh','fr','de'].forEach(function(lang){
    window.I18N[lang] = window.I18N[lang] || {};
    Object.assign(window.I18N[lang], en);
  });
})();

/* 2026.06.24 07:00 KST final shared market text override. */
(function(){
  var koMarket = {
    marketDataRef: '2026.06.24 07:00 KST 기준',
    marketBrent: '국제유가: 브렌트유는 77.08달러/bbl, WTI는 73.21달러/bbl 수준입니다. 미국-이란 협상과 공급 리스크 완화 신호로 유가 상방 압력은 약해졌습니다.',
    marketMops: '항공유 가격(MOPS): 7월 공시 기준 평균은 338.3 cents/gal입니다. IATA 글로벌 항공유는 119.17달러/bbl로 전주 대비 14.2% 하락해 8월 유류할증료 하방 압력을 유지합니다.',
    marketFx: '원달러 환율: 1달러당 약 1,531원대입니다. 전일보다 낮아졌지만 여전히 높은 구간이라 항공권 총액 체감 인하 폭을 제한할 수 있습니다.',
    marketGeo: '호르무즈 해협: 일부 슈퍼탱커와 LNG 탱커 통항은 회복됐지만 전쟁 이전 정상 수준으로 보기는 어렵습니다. 탱커 정체, 항만 피해, 선박 안전 점검, 높은 운임과 보험료가 남아 있습니다.',
    marketOutlook: '2026년 8월 국제선 유류할증료는 보합 또는 소폭 인하 가능성이 우세하지만, 환율 부담과 호르무즈 정상화 지연으로 큰 폭 인하는 단정하기 어렵습니다.'
  };
  var enMarket = {
    marketDataRef: 'As of 2026.06.24 07:00 KST',
    marketBrent: 'Oil prices: Brent is around USD 77.08/bbl and WTI around USD 73.21/bbl as U.S.-Iran talks and easing supply-risk signals weaken oil upside pressure.',
    marketMops: 'MOPS jet fuel: the July filing baseline remains 338.3 cents/gal. IATA global jet fuel is around USD 119.17/bbl, down 14.2% WoW, keeping downside pressure for August.',
    marketFx: 'USD/KRW: around KRW 1,531 per USD is lower than the prior day, but still high enough to limit perceived total airfare relief.',
    marketGeo: 'Strait of Hormuz: some supertanker and LNG tanker transit has recovered, but traffic has not returned to pre-war normal levels. Congestion, port damage, vessel checks, higher rates and insurance remain variables.',
    marketOutlook: 'August 2026 international fuel surcharge is more likely flat or slightly lower, but FX and incomplete Hormuz normalization make a large cut uncertain.'
  };
  window.AERO_MARKET_NUMBERS_LATEST = window.AERO_MARKET_NUMBERS_20260624 || window.AERO_MARKET_NUMBERS_LATEST;
  if (window.I18N_SHARED) {
    Object.assign(window.I18N_SHARED.ko || (window.I18N_SHARED.ko = {}), koMarket);
    Object.assign(window.I18N_SHARED.en || (window.I18N_SHARED.en = {}), enMarket);
    ['ja','zh','fr','de'].forEach(function(lang){
      Object.assign(window.I18N_SHARED[lang] || (window.I18N_SHARED[lang] = {}), enMarket);
    });
  }
})();

/* 2026.06.25 07:00 KST final shared market text override. */
(function(){
  var koMarket = {
    marketDataRef: '2026.06.25 07:00 KST 기준',
    marketBrent: '국제유가: 브렌트유는 73.74달러/bbl, WTI는 70.34달러/bbl 수준까지 내려왔습니다. 호르무즈 해협 공급 차질 우려 완화와 걸프 지역 원유 흐름 회복이 유가 하락 요인입니다.',
    marketMops: '항공유 가격(MOPS): 7월 공시 기준 평균은 338.3 cents/gal입니다. IATA 글로벌 항공유는 119.17달러/bbl로 전주 대비 14.2% 하락해 8월 유류할증료 하방 압력을 유지합니다.',
    marketFx: '원달러 환율: 약 1,530원대 초중반입니다. 항공유와 국제유가 하락에도 높은 환율은 원화 기준 항공권 총액 체감 인하 폭을 제한할 수 있습니다.',
    marketGeo: '호르무즈 해협: 최근 24시간 동안 약 2,000만 배럴의 원유가 해협을 빠져나가며 흐름 회복 신호가 나타났습니다. 다만 부유 기뢰, 군사 호위, 감독 통항, 높은 탱커 운임, 선박 대기 문제가 남아 있어 완전 정상화로 보기는 어렵습니다.',
    marketOutlook: '2026년 8월 국제선 유류할증료는 보합 또는 소폭 인하 가능성이 우세합니다. 전일보다 하방 압력은 강해졌지만, 환율 부담과 호르무즈 리스크 잔존으로 큰 폭 인하는 단정하기 어렵습니다.'
  };
  var enMarket = {
    marketDataRef: 'As of 2026.06.25 07:00 KST',
    marketBrent: 'Oil prices: Brent is down to around USD 73.74/bbl and WTI around USD 70.34/bbl. Easing Strait of Hormuz supply-disruption concerns and recovering Gulf crude flows are driving oil lower.',
    marketMops: 'MOPS jet fuel: the July filing baseline remains 338.3 cents/gal. IATA global jet fuel is around USD 119.17/bbl, down 14.2% WoW, keeping downside pressure for August fuel surcharges.',
    marketFx: 'USD/KRW: in the low-to-mid KRW 1,530 range. Even with lower oil and jet fuel, elevated FX can limit the perceived KRW-based reduction in total airfare.',
    marketGeo: 'Strait of Hormuz: around 20 million barrels of oil exited the strait in the last 24 hours, signaling improved flows. However, floating mines, military escorts, supervised transit, high tanker rates and vessel queues remain, so full normalization is not confirmed.',
    marketOutlook: 'August 2026 international fuel surcharge is more likely flat or slightly lower. Downside pressure is stronger than yesterday, but FX burden and remaining Hormuz risk make a large cut uncertain.'
  };
  window.AERO_MARKET_NUMBERS_LATEST = window.AERO_MARKET_NUMBERS_20260625 || window.AERO_MARKET_NUMBERS_LATEST;
  if (window.I18N_SHARED) {
    Object.assign(window.I18N_SHARED.ko || (window.I18N_SHARED.ko = {}), koMarket);
    Object.assign(window.I18N_SHARED.en || (window.I18N_SHARED.en = {}), enMarket);
    ['ja','zh','fr','de'].forEach(function(lang){
      Object.assign(window.I18N_SHARED[lang] || (window.I18N_SHARED[lang] = {}), enMarket);
    });
  }
})();

/* 2026.06.26 07:00 KST final shared market text override. */
(function(){
  var koMarket = {
    marketDataRef: '2026.06.26 07:00 KST 기준',
    marketBrent: '국제유가: 브렌트유는 전일 저점 73.74달러/bbl에서 75.26달러/bbl로, WTI는 70.34달러/bbl에서 71.92달러/bbl로 반등했습니다. 오만 인근 선박 피격 이슈로 호르무즈·해상 안전 리스크 프리미엄이 일부 되살아났습니다.',
    marketMops: '항공유 가격(MOPS): 7월 공시 기준 평균은 338.3 cents/gal입니다. IATA 글로벌 항공유는 119.17달러/bbl로 전주 대비 14.2% 하락해 8월 유류할증료 하방 압력은 유지됩니다.',
    marketFx: '원달러 환율: 1,530원대~1,540원대 중반의 높은 구간입니다. 항공유와 국제유가 하락에도 높은 환율은 원화 기준 항공권 총액 체감 인하 폭을 제한할 수 있습니다.',
    marketGeo: '호르무즈 해협: 원유 물동량은 전월 이후 최고 수준까지 회복됐지만, 오만 인근 선박 피격과 안전 통항 지원 중단 보도로 선박 안전 리스크가 다시 부각됐습니다. 물동량 회복과 안전 리스크가 동시에 존재합니다.',
    marketOutlook: '2026년 8월 국제선 유류할증료는 보합 또는 소폭 인하 가능성이 우세합니다. 다만 전일보다 리스크 프리미엄이 일부 되살아나 큰 폭 인하를 단정하기는 어렵고, 환율·호르무즈 안전 리스크가 인하 폭을 제한할 수 있습니다.'
  };
  var enMarket = {
    marketDataRef: 'As of 2026.06.26 07:00 KST',
    marketBrent: 'Oil prices: Brent rebounded from the previous low of USD 73.74/bbl to USD 75.26/bbl, while WTI rose from USD 70.34/bbl to USD 71.92/bbl after a vessel-hit incident near Oman revived some maritime safety risk premium.',
    marketMops: 'MOPS jet fuel: the July filing baseline remains 338.3 cents/gal. IATA global jet fuel is around USD 119.17/bbl, down 14.2% WoW, so downside pressure for August remains.',
    marketFx: 'USD/KRW: the rate remains in a high range from the low 1,530s to mid 1,540s, which can limit perceived airfare relief despite lower oil and jet fuel prices.',
    marketGeo: 'Strait of Hormuz: crude flows recovered to the highest level since the previous month, but a vessel-hit incident near Oman and paused safety-transit support brought maritime safety risk back into focus.',
    marketOutlook: 'August 2026 international fuel surcharge is still more likely flat or slightly lower. However, the risk premium has partially returned, and FX plus Hormuz safety risks can limit the size of any cut.'
  };
  window.AERO_MARKET_NUMBERS_LATEST = window.AERO_MARKET_NUMBERS_20260626 || window.AERO_MARKET_NUMBERS_LATEST;
  if (window.I18N_SHARED) {
    Object.assign(window.I18N_SHARED.ko || (window.I18N_SHARED.ko = {}), koMarket);
    Object.assign(window.I18N_SHARED.en || (window.I18N_SHARED.en = {}), enMarket);
    ['ja','zh','fr','de'].forEach(function(lang){
      Object.assign(window.I18N_SHARED[lang] || (window.I18N_SHARED[lang] = {}), enMarket);
    });
  }
})();

/* 2026.06.29 09:00 KST final shared market text override. */
(function(){
  var koMarket = {
    marketDataRef: '2026.06.29 09:00 KST 기준',
    marketBrent: '국제유가: 브렌트유는 약 72.51달러/bbl, WTI는 약 69.94달러/bbl 수준입니다. 전월 고점 대비 안정됐지만 호르무즈 해협과 중동 리스크로 변동성은 남아 있습니다.',
    marketMops: '항공유 가격(MOPS): 7월 공시 산정 기준 평균은 338.3 cents/gal입니다. IATA 글로벌 항공유는 119.17달러/bbl로 전주 대비 14.2% 하락했지만, 싱가포르 항공유와 정제유 수급 부담은 아직 완전히 해소되지 않았습니다.',
    marketFx: '원달러 환율: 1달러당 약 1,535원대입니다. 항공유 가격이 내려가도 높은 환율은 원화 기준 유류할증료 인하 효과와 항공권 총액 체감 인하를 제한할 수 있습니다.',
    marketGeo: '호르무즈 해협: 일부 통항은 회복됐지만 완전 정상화로 보기는 어렵습니다. 선박 안전, 보험료, 통항 지연 가능성은 8월 유류할증료 전망의 상방 리스크입니다.',
    marketOutlook: '2026년 8월 국제선 유류할증료는 보합 또는 소폭 인하 가능성이 우세하지만, 원달러 환율과 호르무즈 리스크 때문에 큰 폭 인하를 단정하기 어렵습니다.'
  };
  var enMarket = {
    marketDataRef: 'As of 2026.06.29 09:00 KST',
    marketBrent: 'Oil prices: Brent is around USD 72.51/bbl and WTI around USD 69.94/bbl. Prices are calmer than recent highs, but Hormuz and Middle East risk keep volatility alive.',
    marketMops: 'MOPS jet fuel: the July filing baseline remains 338.3 cents/gal. IATA global jet fuel is around USD 119.17/bbl, down 14.2% WoW, but Singapore jet fuel and refined-product supply pressure has not fully cleared.',
    marketFx: 'USD/KRW: around KRW 1,535 per USD. Even if jet fuel prices fall, elevated FX can limit KRW-based surcharge relief and perceived total airfare relief.',
    marketGeo: 'Strait of Hormuz: some transit has recovered, but full normalization is not confirmed. Vessel safety, insurance and possible transit delays remain upside risks for the August outlook.',
    marketOutlook: 'August 2026 international fuel surcharge is more likely flat or slightly lower, but USD/KRW and Hormuz risk make a large cut uncertain.'
  };
  window.AERO_MARKET_NUMBERS_LATEST = window.AERO_MARKET_NUMBERS_20260629 || window.AERO_MARKET_NUMBERS_LATEST;
  if (window.I18N_SHARED) {
    Object.assign(window.I18N_SHARED.ko || (window.I18N_SHARED.ko = {}), koMarket);
    Object.assign(window.I18N_SHARED.en || (window.I18N_SHARED.en = {}), enMarket);
    ['ja','zh','fr','de'].forEach(function(lang){
      Object.assign(window.I18N_SHARED[lang] || (window.I18N_SHARED[lang] = {}), enMarket);
    });
  }
})();

/* 2026.06.30 09:20 KST final shared market text override. */
(function(){
  var koMarket = {
    marketDataRef: '2026.06.30 09:20 KST 기준',
    marketBrent: '국제유가: 호르무즈 해협 재개방과 주말 교전 이후에도 원유 선적이 이어지며 브렌트유는 약 73달러대에 머물고 있습니다. 공급 공포는 완화됐지만 리스크 프리미엄은 완전히 사라지지 않았습니다.',
    marketMops: '항공유 가격(MOPS): 7월 공시 기준 MOPS 평균은 338.3 cents/gal입니다. IATA 글로벌 항공유는 116.63달러/bbl로 전주 대비 2.1% 하락해 8월 유류할증료 하방 요인입니다.',
    marketFx: '원달러 환율: 1달러당 약 1,540원대 초중반입니다. 항공유 가격 하락에도 높은 환율은 원화 기준 유류할증료와 항공권 총액의 체감 인하 폭을 제한할 수 있습니다.',
    marketGeo: '호르무즈 해협: 일부 원유·LNG 선적은 계속되고 있지만 통항량은 완전 정상화 전입니다. 선박 안전, 보험료, 물류 지연 리스크가 남아 있습니다.',
    marketOutlook: '2026년 8월 국제선 유류할증료는 보합 또는 소폭 인하 가능성이 우세하지만, 미국-이란 사안과 호르무즈 통항 리스크 때문에 큰 폭 인하를 단정하기 어렵습니다.'
  };
  var enMarket = {
    marketDataRef: 'As of 2026.06.30 09:20 KST',
    marketBrent: 'Oil prices: Brent is around the USD 73/bbl range as crude shipments continue after Hormuz reopening and weekend fighting. Supply panic has eased, but risk premium has not fully disappeared.',
    marketMops: 'Jet fuel price (MOPS): the July filing average is 338.3 cents/gal. IATA global jet fuel is USD 116.63/bbl, down 2.1% week over week, which is a downside factor for August surcharges.',
    marketFx: 'USD/KRW: around the low-to-mid KRW 1,540s per USD. Even with lower jet fuel, elevated FX can limit KRW-based fuel surcharge relief and perceived total airfare relief.',
    marketGeo: 'Strait of Hormuz: some oil and LNG shipments continue, but traffic is not fully normalized. Vessel safety, insurance and logistics-delay risks remain.',
    marketOutlook: 'August 2026 international fuel surcharges are more likely flat or slightly lower, but U.S.-Iran tensions and Hormuz transit risk make a large cut uncertain.'
  };
  window.AERO_MARKET_NUMBERS_LATEST = window.AERO_MARKET_NUMBERS_20260630 || window.AERO_MARKET_NUMBERS_LATEST;
  if(window.I18N_SHARED){
    Object.assign(window.I18N_SHARED.ko || (window.I18N_SHARED.ko = {}), koMarket);
    Object.assign(window.I18N_SHARED.en || (window.I18N_SHARED.en = {}), enMarket);
    ['ja','zh','fr','de'].forEach(function(lang){ Object.assign(window.I18N_SHARED[lang] || (window.I18N_SHARED[lang] = {}), enMarket); });
  }
})();

/* 2026.07.01 09:00 KST final shared market text override. */
(function(){
  var koMarket = {
    marketDataRef: '2026.07.01 09:00 KST 기준',
    marketBrent: '국제유가: 6월 30일 마감 기준 브렌트유는 72.92달러/bbl, WTI는 69.50달러/bbl입니다. 유가는 전월 이전 고점보다 낮아졌지만 호르무즈 리스크 프리미엄은 완전히 사라졌다고 단정하기 어렵습니다.',
    marketMops: '항공유 가격(MOPS): 7월 공시 기준 MOPS 평균은 338.3 cents/gal로 직전 산정 기준 410.02 cents/gal 대비 약 17.5% 낮습니다. IATA 글로벌 항공유는 116.63달러/bbl로 전주 대비 2.1% 하락해 8월 유류할증료 하방 요인입니다.',
    marketFx: '원달러 환율: 1달러당 약 1,550원 안팎입니다. 항공유 가격이 내려도 높은 환율은 원화 기준 유류할증료와 항공권 총액의 체감 인하 폭을 제한할 수 있습니다.',
    marketGeo: '호르무즈 해협: 재개방과 통항 회복 흐름은 있지만 선박 안전, 보험료, 물류 지연, 우회 비용 문제가 남아 있습니다. 정상화 완료가 아니라 전망 리스크로 보는 것이 적절합니다.',
    marketOutlook: '2026년 7월 국제선 유류할증료는 인하 금액으로 발권일 기준 적용 단계에 들어갔고, 2026년 8월 유류할증료는 보합 또는 소폭 인하 가능성이 우세하지만 아직 확정 전입니다.'
  };
  var enMarket = {
    marketDataRef: 'As of 2026.07.01 09:00 KST',
    marketBrent: 'Oil prices: as of the June 30 close, Brent was USD 72.92/bbl and WTI was USD 69.50/bbl. Prices are below earlier monthly highs, but the Hormuz risk premium has not fully disappeared.',
    marketMops: 'Jet fuel price (MOPS): the July filing average is 338.3 cents/gal, about 17.5% below the previous 410.02 cents/gal reference. IATA global jet fuel is USD 116.63/bbl, down 2.1% WoW, a downside factor for August.',
    marketFx: 'USD/KRW: around KRW 1,550 per USD. Even with lower jet fuel, elevated FX can limit KRW-based fuel surcharge relief and perceived total airfare relief.',
    marketGeo: 'Strait of Hormuz: reopening and partial traffic recovery are visible, but vessel safety, insurance, logistics delay and rerouting costs remain. It should be treated as an outlook risk, not full normalization.',
    marketOutlook: 'July 2026 international fuel surcharge cuts have entered the ticketing-date application stage, while August 2026 is more likely flat or slightly lower but remains unconfirmed.'
  };
  window.AERO_MARKET_NUMBERS_LATEST = window.AERO_MARKET_NUMBERS_20260701 || window.AERO_MARKET_NUMBERS_LATEST;
  if(window.I18N_SHARED){
    Object.assign(window.I18N_SHARED.ko || (window.I18N_SHARED.ko = {}), koMarket);
    Object.assign(window.I18N_SHARED.en || (window.I18N_SHARED.en = {}), enMarket);
    ['ja','zh','fr','de'].forEach(function(lang){ Object.assign(window.I18N_SHARED[lang] || (window.I18N_SHARED[lang] = {}), enMarket); });
  }
})();

/* 2026.07.03 11:00 KST market numbers, shared text and news card final override. */
(function(){
  window.AERO_MARKET_NUMBERS_20260703 = Object.assign({}, window.AERO_MARKET_NUMBERS_LATEST || {}, {
    asOf: '2026.07.03 11:00 KST',
    usdKrw: 1539.00,
    usdKrwLabel: '약 1,538~1,540원대',
    mopsUsdPerGallon: 3.383,
    mopsCentsPerGallon: 338.3,
    mopsUsdPerBbl: 142.09,
    iataJetFuelUsdPerBbl: 116.63,
    iataJetFuelWeeklyChangePct: -2.1,
    brentUsdPerBbl: 71.80,
    brentUsdPerBblLabel: '약 70~72달러대',
    wtiUsdPerBbl: 68.69,
    wtiUsdPerBblLabel: '약 68~69달러대',
    referenceAsOf: {
      mops: '2026.05.16~2026.06.15 average reference for July 2026 filing; August 2026 surcharge window is still in progress',
      augustSurchargeWindow: '2026.06.16~2026.07.15 average window for August 2026 surcharge; not finalized yet',
      usdKrw: '2026.07.03 11:00 KST reference; around KRW 1,538~1,540 per USD',
      iataJetFuel: 'IATA Fuel Price Monitor latest weekly global jet fuel average',
      brentWti: '2026.07.02~2026.07.03 market reference; use range label due to source variance',
      geo: 'Hormuz flows have partially recovered, but Iran-approved route warning, vessel safety, insurance and logistics risks remain'
    },
    sources: {
      usdKrw: 'USD/KRW around KRW 1,538~1,540 as of 2026.07.03 11:00 KST reference',
      mops: 'July 2026 fuel surcharge calculation reference: MOPS average 338.3 cents/gal',
      iataJetFuel: 'IATA Fuel Price Monitor: global average jet fuel 116.63 USD/bbl, down 2.1% WoW',
      brentWti: 'Brent around low-70 USD/bbl range and WTI around high-60 USD/bbl range after Hormuz flow recovery',
      geo: 'Hormuz transit has partially recovered, but Iran route-control warning and shipping safety risks remain'
    }
  });
  window.AERO_MARKET_NUMBERS_LATEST = window.AERO_MARKET_NUMBERS_20260703;

  var koMarket = {
    marketDataRef: '2026.07.03 11:00 KST 기준',
    marketBrent: '국제유가: Brent는 약 70~72달러/bbl, WTI는 약 68~69달러/bbl 구간입니다. 호르무즈 통항 회복 기대와 공급 불안 완화로 전월 고점 대비 낮아졌지만, 지정학 리스크 프리미엄이 완전히 사라졌다고 보기는 어렵습니다.',
    marketMops: '항공유 가격(MOPS): 7월 공시 산정 기준 MOPS 평균은 338.3 cents/gal입니다. IATA 글로벌 항공유는 116.63달러/bbl로 전주 대비 2.1% 하락해 8월 유류할증료에는 하방 요인입니다. 다만 8월 산정 기간 평균은 아직 확정 전입니다.',
    marketFx: '원달러 환율: 약 1,538~1,540원대입니다. 7월 1일의 1,550원 안팎보다 다소 낮아졌지만 여전히 높은 구간이어서 항공유 하락분이 원화 기준 유류할증료 인하로 온전히 반영되기는 어렵습니다.',
    marketGeo: '호르무즈 해협: 통항 회복 기대는 커졌지만 이란의 승인 항로 요구와 강경 대응 경고가 나오며 선박 안전, 보험료, 물류 지연, 우회 비용 리스크가 남아 있습니다. 완전 정상화가 아니라 부분 회복으로 보는 것이 적절합니다.',
    marketOutlook: '2026년 7월 국제선 유류할증료는 인하 금액으로 발권일 기준 적용 중입니다. 2026년 8월 유류할증료는 보합 또는 소폭 인하 가능성이 우세하지만, 고환율과 호르무즈 통항 리스크 때문에 큰 폭 인하는 단정하기 어렵습니다.'
  };
  var enMarket = {
    marketDataRef: 'As of 2026.07.03 11:00 KST',
    marketBrent: 'Oil prices: Brent is in the low USD 70s/bbl and WTI is in the high USD 60s/bbl. Prices are lower than the previous spike as Hormuz flows partially recover, but the geopolitical risk premium has not fully disappeared.',
    marketMops: 'Jet fuel price (MOPS): the July filing average remains 338.3 cents/gal. IATA global jet fuel is USD 116.63/bbl, down 2.1% WoW, which is a downside factor for August surcharges. However, the August averaging window is not finalized yet.',
    marketFx: 'USD/KRW: around KRW 1,538~1,540 per USD. This is slightly lower than the July 1 level near KRW 1,550, but still elevated enough to limit KRW-based surcharge relief.',
    marketGeo: "Strait of Hormuz: transit recovery has improved, but Iran's approved-route warning keeps vessel safety, insurance, logistics delay and rerouting risks in place. Treat this as partial recovery, not full normalization.",
    marketOutlook: 'July 2026 international fuel surcharges are now being applied at lower levels. August 2026 is more likely flat or slightly lower, but elevated FX and Hormuz transit risk make a large cut uncertain.'
  };
  if(window.I18N_SHARED){
    Object.assign(window.I18N_SHARED.ko || (window.I18N_SHARED.ko = {}), koMarket);
    Object.assign(window.I18N_SHARED.en || (window.I18N_SHARED.en = {}), enMarket);
    ['ja','zh','fr','de'].forEach(function(lang){
      Object.assign(window.I18N_SHARED[lang] || (window.I18N_SHARED[lang] = {}), enMarket);
    });
  }

  window.AERO_NEWS_CARDS_20260703 = [
    {
      id:'market-20260703-hormuz-fx-mops',
      slug:'market-20260703-hormuz-fx-mops',
      date:'2026-07-03',
      updatedAt:'2026.07.03 11:00 KST',
      priority:1,
      category:'market',
      topic:'market',
      title:'2026.07.03 기준: 7월 유류할증료 인하 적용 중, 8월은 보합·소폭 인하 가능성',
      aiBrief:'MOPS와 IATA 항공유 하락은 8월 유류할증료 하방 요인이지만, 원달러 환율 1,538~1,540원대와 호르무즈 통항 통제 리스크가 큰 폭 인하를 제한할 수 있습니다.',
      summary:'2026년 7월 한국발 국제선 유류할증료는 인하 적용 중입니다. 8월은 보합 또는 소폭 인하 가능성이 우세하지만 아직 공시 전이며, 호르무즈 해협은 부분 회복 상태로 봐야 합니다.',
      impact:'7월은 발권일 기준 인하 적용 중인 사실 데이터입니다. 8월은 MOPS·항공유 하락이 하방 요인이지만 환율과 호르무즈 리스크 때문에 결과를 단정하면 안 됩니다.',
      sourceName:'시장 지표 기반 분석',
      tags:['2026년 8월 유류할증료 전망','MOPS','IATA 항공유','원달러 환율','호르무즈 해협'],
      faq:[
        {q:'2026년 8월 유류할증료는 인하되나요?',a:'2026.07.03 11:00 KST 기준으로는 보합 또는 소폭 인하 가능성이 우세하지만, 아직 8월 공식 공시는 발표 전입니다.'},
        {q:'호르무즈 해협은 정상화됐나요?',a:'통항 회복 기대는 커졌지만 승인 항로 요구와 선박 안전·보험료·물류 지연 리스크가 남아 있어 완전 정상화로 보기는 어렵습니다.'}
      ],
      links:[{href:'forecast.html',label:'8월 전망 보기 →'}],
      i18n:{
        en:{
          updatedAt:'Updated 2026.07.03 11:00 KST',
          title:'As of Jul 3, 2026: July surcharge cuts apply, August is likely flat or slightly lower',
          aiBrief:'Lower MOPS and IATA jet fuel are downside factors for August surcharges, but USD/KRW around 1,538~1,540 and Hormuz transit-control risk can limit a large cut.',
          summary:'July 2026 Korea-departure international fuel surcharges are being applied at lower levels. August is more likely flat or slightly lower, but official notices are not out yet and Hormuz should be treated as partial recovery.',
          impact:'July is factual ticketing-date application data. August remains an outlook and should not be described as a confirmed or large cut.',
          sourceName:'Market indicator analysis',
          tags:['August 2026 fuel surcharge outlook','MOPS','IATA jet fuel','USD/KRW','Strait of Hormuz'],
          faq:[
            {q:'Will August 2026 fuel surcharges fall?',a:'As of July 3, 2026 11:00 KST, flat or slightly lower is more likely, but official August notices have not been published.'},
            {q:'Has the Strait of Hormuz normalized?',a:'Transit recovery has improved, but approved-route warnings, vessel safety, insurance and logistics risks remain.'}
          ],
          links:[{href:'forecast.html',label:'View August outlook →'}]
        }
      }
    }
  ].concat(window.AERO_NEWS_CARDS_20260701 || []);
  ['ja','zh','fr','de'].forEach(function(lang){
    window.AERO_NEWS_CARDS_20260703.forEach(function(card){
      card.i18n = card.i18n || {};
      if(!card.i18n[lang]) card.i18n[lang] = card.i18n.en;
    });
  });
})();

/* 2026.07.06 08:00 KST market numbers, shared text and news card final override. */
(function(){
  window.AERO_MARKET_NUMBERS_20260706 = Object.assign({}, window.AERO_MARKET_NUMBERS_LATEST || {}, {
    asOf: '2026.07.06 08:00 KST',
    usdKrw: 1529.50,
    usdKrwLabel: '약 1,529~1,530원대',
    mopsUsdPerGallon: 3.383,
    mopsCentsPerGallon: 338.3,
    mopsUsdPerBbl: 142.09,
    iataJetFuelUsdPerBbl: 116.63,
    iataJetFuelWeeklyChangePct: -2.1,
    brentUsdPerBbl: 72.00,
    brentUsdPerBblLabel: '약 72달러/bbl',
    wtiUsdPerBbl: 68.70,
    wtiUsdPerBblLabel: '약 68~69달러/bbl',
    opecPlusAugustIncreaseBpd: 188000,
    referenceAsOf: {
      mops: '2026.05.16~2026.06.15 average reference for July 2026 filing; August 2026 surcharge averaging window is still in progress',
      augustSurchargeWindow: '2026.06.16~2026.07.15 average window for August 2026 surcharge; official airline notices are not published yet',
      usdKrw: '2026.07.06 08:00 KST market snapshot; around KRW 1,529~1,530 per USD',
      iataJetFuel: 'IATA Fuel Price Monitor latest weekly global jet fuel average',
      brentWti: '2026.07.06 morning market reference; use range labels due to source variance',
      geo: 'Hormuz transit is partially recovering, but vessel safety, insurance and logistics normalization are not complete',
      opecPlus: 'OPEC+ August output increase of 188,000 bpd adds supply-side relief'
    },
    sources: {
      usdKrw: 'USD/KRW around KRW 1,529~1,530 as of 2026.07.06 08:00 KST reference',
      mops: 'July 2026 fuel surcharge calculation reference: MOPS average 338.3 cents/gal',
      iataJetFuel: 'IATA Fuel Price Monitor: global average jet fuel 116.63 USD/bbl, down 2.1% WoW',
      brentWti: 'Brent around USD 72/bbl and WTI around USD 68~69/bbl',
      geo: 'Hormuz flow has partially recovered, but full normalization is not confirmed',
      opecPlus: 'OPEC+ August increase: 188,000 bpd'
    }
  });
  window.AERO_MARKET_NUMBERS_LATEST = window.AERO_MARKET_NUMBERS_20260706;

  var koMarket = {
    marketDataRef: '2026.07.06 08:00 KST 기준',
    marketBrent: '국제유가: Brent는 약 72달러/bbl, WTI는 약 68~69달러/bbl 구간입니다. OPEC+의 8월 18.8만 배럴/일 추가 증산은 공급 완화 요인이지만, 지정학 리스크 프리미엄은 완전히 사라지지 않았습니다.',
    marketMops: '항공유 가격(MOPS): 7월 공시 산정 기준 MOPS 평균은 338.3 cents/gal입니다. IATA 글로벌 항공유는 116.63달러/bbl로 전주 대비 2.1% 하락해 8월 유류할증료 하방 요인입니다.',
    marketFx: '원달러 환율: 약 1,529~1,530원대입니다. 전주보다 다소 안정됐지만 여전히 높은 구간이어서 항공권 총액의 원화 기준 체감 인하 폭을 제한할 수 있습니다.',
    marketGeo: '호르무즈 해협: 통항은 부분 회복됐지만 완전 정상화로 보기는 어렵습니다. 선박 안전, 보험료, 물류 지연, 우회 비용 리스크가 8월 전망의 제한 요인으로 남아 있습니다.',
    marketOutlook: '2026년 7월 유류할증료는 인하 금액으로 적용 중입니다. 2026년 8월 유류할증료는 보합 또는 소폭 인하 가능성이 우세하지만, 8월 공식 공시 전이며 큰 폭 인하는 아직 단정하기 어렵습니다.'
  };
  var enMarket = {
    marketDataRef: 'As of 2026.07.06 08:00 KST',
    marketBrent: 'Oil prices: Brent is around USD 72/bbl and WTI around USD 68~69/bbl. The OPEC+ August increase of 188,000 bpd is a supply-side relief factor, but the geopolitical risk premium has not fully disappeared.',
    marketMops: 'Jet fuel price (MOPS): the July filing average remains 338.3 cents/gal. IATA global jet fuel is USD 116.63/bbl, down 2.1% WoW, a downside factor for August surcharges.',
    marketFx: 'USD/KRW: around KRW 1,529~1,530 per USD. This is steadier than last week, but still elevated enough to limit perceived KRW-based total airfare relief.',
    marketGeo: 'Strait of Hormuz: transit has partially recovered, but full normalization is not confirmed. Vessel safety, insurance, logistics delay and rerouting-cost risks remain limiting factors for August.',
    marketOutlook: 'July 2026 fuel surcharges are being applied at lower levels. August 2026 is more likely flat or slightly lower, but official August notices are not out yet and a large cut remains uncertain.'
  };
  if(window.I18N_SHARED){
    Object.assign(window.I18N_SHARED.ko || (window.I18N_SHARED.ko = {}), koMarket);
    Object.assign(window.I18N_SHARED.en || (window.I18N_SHARED.en = {}), enMarket);
    ['ja','zh','fr','de'].forEach(function(lang){
      Object.assign(window.I18N_SHARED[lang] || (window.I18N_SHARED[lang] = {}), enMarket);
    });
  }

  window.AERO_NEWS_CARDS_20260706 = [
    {
      id:'market-20260706-opec-hormuz-fx-mops',
      slug:'market-20260706-opec-hormuz-fx-mops',
      date:'2026-07-06',
      updatedAt:'2026.07.06 08:00 KST',
      priority:1,
      category:'market',
      topic:'market',
      title:'2026.07.06 기준: OPEC+ 증산·호르무즈 부분 회복, 8월 유류할증료는 보합·소폭 인하 우세',
      aiBrief:'Brent 약 72달러, WTI 약 68~69달러, USD/KRW 약 1,529~1,530원대, MOPS 338.3 cents/gal 기준으로 8월 유류할증료는 보합 또는 소폭 인하 가능성이 우세합니다.',
      summary:'OPEC+의 8월 18.8만 배럴/일 추가 증산과 호르무즈 해협 부분 회복은 유가 안정 요인입니다. 다만 8월 공식 공시는 아직 발표 전이며, 환율과 선박 안전·보험료 리스크 때문에 큰 폭 인하는 단정하기 어렵습니다.',
      impact:'7월 유류할증료 인하 적용은 사실 데이터입니다. 8월은 MOPS·IATA 항공유 하락이 하방 요인이지만 환율과 호르무즈 리스크를 함께 봐야 합니다.',
      sourceName:'시장 지표 기반 분석',
      tags:['2026년 8월 유류할증료 전망','OPEC+','호르무즈 해협','MOPS','원달러 환율'],
      faq:[
        {q:'2026년 8월 유류할증료는 인하되나요?',a:'2026.07.06 08:00 KST 기준으로는 보합 또는 소폭 인하 가능성이 우세하지만, 아직 8월 공식 공시는 발표 전입니다.'},
        {q:'OPEC+ 증산은 유류할증료에 어떤 영향을 주나요?',a:'8월 18.8만 배럴/일 추가 증산은 유가 안정 요인이지만, MOPS·환율·호르무즈 리스크까지 함께 확인해야 합니다.'}
      ],
      links:[{href:'forecast.html',label:'8월 전망 보기 →'}],
      i18n:{
        en:{
          updatedAt:'Updated 2026.07.06 08:00 KST',
          title:'As of Jul 6, 2026: OPEC+ supply increase and partial Hormuz recovery keep August flat-to-slightly-lower bias',
          aiBrief:'With Brent around USD 72, WTI around USD 68~69, USD/KRW around 1,529~1,530 and MOPS at 338.3 cents/gal, August surcharges are more likely flat or slightly lower.',
          summary:'The OPEC+ August increase of 188,000 bpd and partial Hormuz recovery are stabilizing factors. However, official August notices are not out yet, and FX plus vessel safety and insurance risks make a large cut uncertain.',
          impact:'July surcharge cuts are factual application data. August remains an outlook where lower MOPS and IATA jet fuel must be weighed against FX and Hormuz risks.',
          sourceName:'Market indicator analysis',
          tags:['August 2026 fuel surcharge outlook','OPEC+','Strait of Hormuz','MOPS','USD/KRW'],
          faq:[
            {q:'Will August 2026 fuel surcharges fall?',a:'As of July 6, 2026 08:00 KST, flat or slightly lower is more likely, but official August notices have not been published.'},
            {q:'How does the OPEC+ increase affect surcharges?',a:'The 188,000 bpd August increase is a stabilizing factor for oil, but MOPS, FX and Hormuz risks still matter.'}
          ],
          links:[{href:'forecast.html',label:'View August outlook →'}]
        }
      }
    }
  ].concat(window.AERO_NEWS_CARDS_20260703 || window.AERO_NEWS_CARDS_20260701 || []);
  ['ja','zh','fr','de'].forEach(function(lang){
    window.AERO_NEWS_CARDS_20260706.forEach(function(card){
      card.i18n = card.i18n || {};
      if(!card.i18n[lang]) card.i18n[lang] = card.i18n.en;
    });
  });
})();

/* 2026.07.07 06:00 KST market numbers, shared text and news card final override. */
(function(){
  window.AERO_MARKET_NUMBERS_20260707 = Object.assign({}, window.AERO_MARKET_NUMBERS_LATEST || {}, {
    asOf: '2026.07.07 06:00 KST',
    usdKrw: 1529.00,
    usdKrwLabel: '약 1,528~1,530원대',
    mopsUsdPerGallon: 3.383,
    mopsCentsPerGallon: 338.3,
    mopsUsdPerBbl: 142.09,
    iataJetFuelUsdPerBbl: 116.63,
    iataJetFuelWeeklyChangePct: -2.1,
    brentUsdPerBbl: 71.99,
    brentUsdPerBblLabel: '약 72달러/bbl',
    wtiUsdPerBbl: 68.55,
    wtiUsdPerBblLabel: '약 68달러대/bbl',
    opecPlusAugustIncreaseBpd: 188000,
    referenceAsOf: {
      mops: '2026.05.16~2026.06.15 average reference for July 2026 filing; August 2026 surcharge averaging window is still in progress',
      augustSurchargeWindow: '2026.06.16~2026.07.15 average window for August 2026 surcharge; official airline notices are not published yet',
      usdKrw: '2026.07.07 06:00 KST reference; around KRW 1,528~1,530 per USD',
      iataJetFuel: 'IATA Fuel Price Monitor latest weekly global jet fuel average',
      brentWti: '2026.07.06 oil-market close / 2026.07.07 KST reference after OPEC+ additional output and Hormuz export recovery expectations',
      geo: 'Hormuz flows are recovering, but the strait should be treated as partially recovered rather than fully normalized; vessel safety, insurance and logistics risks remain',
      opecPlus: 'OPEC+ August output increase of 188,000 bpd adds supply-side relief'
    },
    sources: {
      usdKrw: 'USD/KRW around KRW 1,528~1,530 as of 2026.07.07 06:00 KST reference',
      mops: 'July 2026 fuel surcharge calculation reference: MOPS average 338.3 cents/gal',
      iataJetFuel: 'IATA Fuel Price Monitor: global average jet fuel 116.63 USD/bbl, down 2.1% WoW',
      brentWti: 'Brent around USD 71.99/bbl and WTI around USD 68.55/bbl after OPEC+ output increase and Hormuz export recovery expectations',
      geo: 'Hormuz transit has partially recovered, but vessel safety, war-risk insurance, logistics bottlenecks and route-control risks remain',
      opecPlus: 'OPEC+ August increase: 188,000 bpd'
    }
  });
  window.AERO_MARKET_NUMBERS_LATEST = window.AERO_MARKET_NUMBERS_20260707;

  var koMarket = {
    marketDataRef: '2026.07.07 06:00 KST 기준',
    marketBrent: '국제유가: Brent는 약 72달러/bbl, WTI는 약 68달러대/bbl입니다. OPEC+ 추가 증산과 호르무즈 수출 회복 기대가 유가 안정 요인으로 작용하고 있습니다.',
    marketMops: '항공유 가격(MOPS): 7월 공시 산정 기준 MOPS 평균은 338.3 cents/gal로 직전 410.02 cents/gal 대비 약 17.5% 낮습니다. IATA 글로벌 항공유는 116.63달러/bbl로 전주 대비 2.1% 하락해 8월 유류할증료 하방 요인입니다. 다만 8월 산정 기간 평균은 아직 확정 전입니다.',
    marketFx: '원달러 환율: 약 1,528~1,530원대입니다. 7월 1일의 1,550원 안팎보다 다소 완화됐지만, 1,530원대 자체가 여전히 높은 구간이어서 원화 기준 인하 폭을 제한할 수 있습니다.',
    marketGeo: '호르무즈 해협: 통항 회복 흐름은 있지만 완전 정상화로 보기는 어렵습니다. 선박 안전, 전쟁위험 보험료, 물류 병목, 우회 비용, 통항 통제 가능성이 남아 있어 8월 전망의 리스크 요인입니다.',
    marketOutlook: '2026년 7월 국제선 유류할증료는 발권일 기준 인하 적용 중입니다. 2026년 8월 유류할증료는 항공유와 유가 하락, OPEC+ 증산, 호르무즈 수출 회복 기대를 반영하면 보합 또는 소폭 인하 가능성이 우세하지만, 환율과 호르무즈 통항 리스크 때문에 큰 폭 인하는 아직 단정하기 어렵습니다.'
  };
  var enMarket = {
    marketDataRef: 'As of 2026.07.07 06:00 KST',
    marketBrent: 'Oil prices: Brent is around USD 72/bbl and WTI is in the USD 68/bbl range. OPEC+ additional output and recovering Hormuz exports are supporting price stability.',
    marketMops: 'Jet fuel price (MOPS): the July filing average is 338.3 cents/gal, about 17.5% below the previous 410.02 cents/gal reference. IATA global jet fuel is USD 116.63/bbl, down 2.1% WoW, a downside factor for August surcharges. However, the August averaging window is not finalized yet.',
    marketFx: 'USD/KRW: around KRW 1,528~1,530 per USD. This is lower than the July 1 level near KRW 1,550, but still elevated enough to limit KRW-based surcharge relief.',
    marketGeo: 'Strait of Hormuz: transit recovery is visible, but this should not be treated as full normalization. Vessel safety, war-risk insurance, logistics bottlenecks, rerouting costs and route-control risks remain.',
    marketOutlook: 'July 2026 international fuel surcharge cuts are now being applied on a ticketing-date basis. August 2026 is more likely flat or slightly lower, but elevated FX and Hormuz transit risks make a large cut uncertain.'
  };
  if(window.I18N_SHARED){
    Object.assign(window.I18N_SHARED.ko || (window.I18N_SHARED.ko = {}), koMarket);
    Object.assign(window.I18N_SHARED.en || (window.I18N_SHARED.en = {}), enMarket);
    ['ja','zh','fr','de'].forEach(function(lang){
      Object.assign(window.I18N_SHARED[lang] || (window.I18N_SHARED[lang] = {}), enMarket);
    });
  }

  window.AERO_NEWS_CARDS_20260707 = [
    {
      id:'market-20260707-fx-mops-oil-hormuz',
      slug:'market-20260707-fx-mops-oil-hormuz',
      date:'2026-07-07',
      updatedAt:'2026.07.07 06:00 KST',
      priority:1,
      category:'market',
      topic:'market',
      title:'2026.07.07 기준: 7월 유류할증료 인하 적용 중, 8월은 보합·소폭 인하 가능성 우세',
      aiBrief:'Brent 약 72달러, WTI 약 68달러대, IATA 항공유 116.63달러/bbl, USD/KRW 1,528~1,530원대는 8월 유류할증료 하방 요인입니다. 다만 호르무즈 해협은 완전 정상화가 아닌 부분 회복 상태라 큰 폭 인하는 단정하기 어렵습니다.',
      summary:'2026년 7월 한국발 국제선 유류할증료는 발권일 기준 인하 적용 중입니다. 2026년 8월은 보합 또는 소폭 인하 가능성이 우세하지만 아직 공식 공시 전이며, 호르무즈 해협의 선박 안전·보험료·물류 리스크는 계속 확인해야 합니다.',
      impact:'8월 유류할증료 전망은 보합 또는 소폭 인하 가능성 우세입니다. 다만 공식 공시 전이므로 확정 표현은 피해야 합니다.',
      sourceName:'Market briefing as of 2026.07.07 06:00 KST',
      tags:['2026년 8월 유류할증료 전망','MOPS','IATA 항공유','원달러 환율','호르무즈 해협','OPEC+'],
      links:[
        {href:'forecast.html',label:'2026년 8월 유류할증료 전망 보기'},
        {href:'index.html',label:'노선별 유류할증료 조회'}
      ],
      faq:[
        {q:'2026년 8월 유류할증료는 인하되나요?',a:'2026.07.07 06:00 KST 기준으로는 보합 또는 소폭 인하 가능성이 우세하지만, 공식 공시는 아직 발표 전입니다.'},
        {q:'호르무즈 해협은 정상화됐나요?',a:'통항 회복 흐름은 있지만 완전 정상화로 보기는 어렵습니다. 선박 안전, 전쟁위험 보험료, 물류 병목 리스크가 남아 있습니다.'}
      ],
      i18n:{
        en:{
          updatedAt:'Updated 2026.07.07 06:00 KST',
          title:'As of Jul 7, 2026: July cuts apply, August is more likely flat or slightly lower',
          aiBrief:'Brent around USD 72, WTI in the USD 68 range, IATA jet fuel at USD 116.63/bbl and USD/KRW around 1,528~1,530 are downside factors for August surcharges. However, Hormuz is partially recovered rather than fully normalized, so a large cut remains uncertain.',
          summary:'July 2026 Korea-departure international fuel surcharges are being applied at reduced levels. August is more likely flat or slightly lower, but official notices are not out yet and Hormuz vessel safety, insurance and logistics risks still need monitoring.',
          impact:'August fuel surcharge outlook leans flat or slightly lower, but official notices are not published yet and confirmed wording should be avoided.',
          sourceName:'Market briefing as of 2026.07.07 06:00 KST',
          tags:['August 2026 fuel surcharge outlook','MOPS','IATA jet fuel','USD/KRW','Strait of Hormuz','OPEC+'],
          links:[
            {href:'forecast.html',label:'View August 2026 fuel surcharge outlook'},
            {href:'index.html',label:'Check route fuel surcharge'}
          ],
          faq:[
            {q:'Will August 2026 fuel surcharges fall?',a:'As of July 7, 2026 06:00 KST, flat or slightly lower is more likely, but official notices have not been published.'},
            {q:'Has the Strait of Hormuz normalized?',a:'Transit recovery is visible, but full normalization is not confirmed. Vessel safety, war-risk insurance and logistics bottlenecks remain.'}
          ]
        }
      }
    }
  ].concat(window.AERO_NEWS_CARDS_20260706 || window.AERO_NEWS_CARDS_20260703 || window.AERO_NEWS_CARDS_20260701 || []);
  ['ja','zh','fr','de'].forEach(function(lang){
    window.AERO_NEWS_CARDS_20260707.forEach(function(card){
      card.i18n = card.i18n || {};
      if(!card.i18n[lang]) card.i18n[lang] = card.i18n.en;
    });
  });
})();

var _origInitNav = window.initNav;
window.initNav = function(opts){
  opts = opts || {};
  var origLang = opts.onLangChange;
  var origCurr = opts.onCurrChange;
  opts.onLangChange = function(val){
    window.setCurrentLang(val);
    window.applyLanguage();
    if(origLang) origLang(val);
  };
  opts.onCurrChange = function(val){
    window.setCurrentCurr(val);
    if(origCurr) origCurr(val);
  };
  /* 저장된 언어 복원 */
  var saved = window.getCurrentLang();
  window.SHARED_STATE.lang = saved;
  var savedCurr = window.getCurrentCurr();
  window.SHARED_STATE.curr = savedCurr;
  var navLang = document.getElementById('navLang');
  if(navLang && saved) navLang.value = saved;
  var navCurr = document.getElementById('navCurr');
  if(navCurr && savedCurr) navCurr.value = savedCurr;
  /* 원래 initNav 호출 */
  if(_origInitNav) _origInitNav(opts);
  /* 최초 적용 */
  window.applyLanguage();
};

})();
