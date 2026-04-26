/* ── 항공 유류할증료 — Shared JS v3 ── */

/* ─────────────────────────────────────────────
   환율 / 통화 포매팅
───────────────────────────────────────────── */
window.RATES    = { KRW:1, USD:1/1480, JPY:1/10.1, EUR:1/1630, GBP:1/1870, CNY:1/204, AUD:1/950, SGD:1/1110, HKD:1/190 };
window.CURR_SYM = { KRW:'₩', USD:'$', JPY:'¥', EUR:'€', GBP:'£', CNY:'¥', AUD:'A$', SGD:'S$', HKD:'HK$' };
window.CURR_DEC = { KRW:0, USD:2, JPY:0, EUR:2, GBP:2, CNY:2, AUD:2, SGD:2, HKD:1 };
window.SHARED_STATE = { lang:'ko', curr:'KRW' };

/* ─────────────────────────────────────────────
   한국 국적기 필터
   isKoreanCarrier / VISIBLE_CARRIERS
───────────────────────────────────────────── */
/* v32: 에어부산(BX) public UI 전면 제외 */
window.KOREAN_CARRIER_CODES = ['KE','OZ','YP','LJ','7C','TW','ZE','RS'];
/* BX는 공식 공지 미제공으로 excludeFromPublicLists=true */
window.EXCLUDED_FROM_PUBLIC = ['BX'];

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
   periodStr: "Fare amount (From April 1, 2025)" 등 또는 ISO 날짜
───────────────────────────────────────────── */
window.formatPeriodLabel = function(periodStr) {
  if (!periodStr) return null;
  /* ISO 형태 "2026-04-01" */
  var isoM = periodStr.match(/(\d{4})-(\d{2})/);
  if (isoM) return isoM[1] + '.' + isoM[2];
  /* "April 1, 2026" 또는 "From April 1, 2026" */
  var months = {january:'01',february:'02',march:'03',april:'04',may:'05',june:'06',
                july:'07',august:'08',september:'09',october:'10',november:'11',december:'12'};
  var lower = periodStr.toLowerCase();
  var year = (periodStr.match(/(\d{4})/)||[])[1];
  for (var m in months) {
    if (lower.indexOf(m) !== -1 && year) return year + '.' + months[m];
  }
  /* "31 Mar 2026" 형태 */
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
       navRoutes:'노선별 조회', navAirlines:'항공사 인덱스', navNews:'참고 소식' },
  en:{ btnOW:'One-way', btnRT:'Round-trip', officialSite:'Official site ↗',
       loading:'Loading...', loadErr:'Load failed', noData:'No data.',
       official:'Official', aiPredict:'AI Forecast', prepublish:'Not yet published', noValue:'No data',
       predictUnavail:'Unavailable', predictInsuff:'Insufficient data', predictPreparing:'Preparing',
       officialNotice:'Official Notice', aiPredictBadge:'AI Forecast', refOnly:'Pre-announcement reference',
       confidence:{high:'High',medium:'Medium',low:'Low'},
       predictBasis:'Forecast basis', predictNote:'Pre-announcement estimate. For reference only.',
       navRoutes:'Route Search', navAirlines:'Airline Index', navNews:'News & Insights' },
  ja:{ btnOW:'片道', btnRT:'往復', officialSite:'公式サイト ↗',
       loading:'読み込み中...', loadErr:'読み込み失敗', noData:'データなし',
       official:'公式', aiPredict:'AI予測', prepublish:'未公示', noValue:'データなし',
       predictUnavail:'予測不可', predictInsuff:'データ不足', predictPreparing:'準備中',
       officialNotice:'公式公示', aiPredictBadge:'AI予測', refOnly:'公式公示前の参考',
       confidence:{high:'高',medium:'中',low:'低'},
       predictBasis:'予測根拠', predictNote:'公式公示前の推定値。参考用。',
       navRoutes:'路線別検索', navAirlines:'航空会社一覧', navNews:'参考情報' },
  zh:{ btnOW:'单程', btnRT:'往返', officialSite:'官方网站 ↗',
       loading:'加载中...', loadErr:'加载失败', noData:'暂无数据',
       official:'官方', aiPredict:'AI预测', prepublish:'未公告', noValue:'无数据',
       predictUnavail:'无法预测', predictInsuff:'数据不足', predictPreparing:'准备中',
       officialNotice:'官方公告', aiPredictBadge:'AI预测', refOnly:'官方公告前参考',
       confidence:{high:'高',medium:'中',low:'低'},
       predictBasis:'预测依据', predictNote:'官方公告前估算值，仅供参考。',
       navRoutes:'按航线查询', navAirlines:'航空公司索引', navNews:'参考资讯' },
  fr:{ btnOW:'Aller simple', btnRT:'Aller-retour', officialSite:'Site officiel ↗',
       loading:'Chargement...', loadErr:'Erreur', noData:'Aucune donnée',
       official:'Officiel', aiPredict:'Prévision IA', prepublish:'Non publié', noValue:'Pas de données',
       predictUnavail:'Indisponible', predictInsuff:'Données insuffisantes', predictPreparing:'En préparation',
       officialNotice:'Notice officielle', aiPredictBadge:'Prévision IA', refOnly:'Référence avant annonce',
       confidence:{high:'Élevé',medium:'Moyen',low:'Faible'},
       predictBasis:'Base de prévision', predictNote:'Estimation avant annonce officielle. À titre indicatif.',
       navRoutes:'Recherche route', navAirlines:'Index compagnies', navNews:'Actualités' },
  de:{ btnOW:'Einfach', btnRT:'Hin & Zurück', officialSite:'Offizielle Seite ↗',
       loading:'Lädt...', loadErr:'Fehler', noData:'Keine Daten',
       official:'Offiziell', aiPredict:'KI-Prognose', prepublish:'Nicht veröffentlicht', noValue:'Keine Daten',
       predictUnavail:'Nicht verfügbar', predictInsuff:'Unzureichende Daten', predictPreparing:'In Vorbereitung',
       officialNotice:'Offizielle Mitteilung', aiPredictBadge:'KI-Prognose', refOnly:'Vor offiz. Ankündigung',
       confidence:{high:'Hoch',medium:'Mittel',low:'Niedrig'},
       predictBasis:'Prognosebasis', predictNote:'Schätzung vor offizieller Bekanntmachung. Nur zur Referenz.',
       navRoutes:'Routensuche', navAirlines:'Airline-Index', navNews:'Nachrichten' },
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

/* ─────────────────────────────────────────────
   STATUS 시스템
───────────────────────────────────────────── */
window.resolveStatus = function(airline, overrideEntry) {
  if (overrideEntry && overrideEntry.status) return overrideEntry.status;
  var c = airline.confidence, st = airline.sourceType;
  if (c === 'fresh' && airline.supported)  return 'official_verified';
  if (c === 'stale')                        return 'stale_fallback';
  if (st === 'fare_breakdown')              return 'fare_breakdown_based';
  if (st === 'fare_embedded' || st === 'booking_only' || st === 'manual') return 'official_missing';
  if (c === 'unsupported')                  return 'official_missing';
  if (c === 'error')                        return 'official_blocked';
  if (airline.regulatoryContext)            return 'regulation_based';
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
  var mult = isRT ? 2 : 1;

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
  JFK:'US',LAX:'US',SFO:'US',SEA:'US',ORD:'US',ATL:'US',IAD:'US',HNL:'US',GUM:'US',
  YVR:'CA',YYZ:'CA',
  LHR:'GB',MAN:'GB',CDG:'FR',FRA:'DE',MUC:'DE',AMS:'NL',
  FCO:'IT',BCN:'ES',MAD:'ES',VIE:'AT',ZRH:'CH',HEL:'FI',IST:'TR',
  DXB:'AE',AUH:'AE',DOH:'QA',ADD:'ET',
};

function _toKRW(val, currency) {
  if (val == null) return null;
  var rates = { USD:1480, JPY:10.1, EUR:1630, GBP:1870, CNY:204, HKD:190, AUD:950, SGD:1110 };
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
  if (parts.length < 2) return false;
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

window.loadAirlineMeta = async function() {
  try {
    var [mr, or_] = await Promise.allSettled([
      fetch('data/airline_meta.json').then(function(r){return r.ok?r.json():null;}),
      fetch('data/manual_overrides.json').then(function(r){return r.ok?r.json():null;}),
    ]);
    if (mr.status === 'fulfilled' && mr.value) window.AIRLINE_META = mr.value.airlines || {};
    if (or_.status === 'fulfilled' && or_.value) window.MANUAL_OVERRIDES = or_.value;
  } catch(e) { window.AIRLINE_META = {}; }
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

  // 1. 출발지가 한국인지 확인
  var depIsKR = window.isKoreanAirport(dep);
  var arrIsKR = window.isKoreanAirport(arr);

  // 양쪽 모두 한국: 국내선 — 지원 안 함
  if (depIsKR && arrIsKR) return { operates: false, reason: 'domestic' };

  // 한국 출발이 아닌 경우
  if (!depIsKR && !arrIsKR) return { operates: false, reason: 'neither_kr' };

  // 실제 출발/도착 (한국 출발 기준으로 정렬)
  var origin = depIsKR ? dep : arr;
  var destination = depIsKR ? arr : dep;

  // 2. supportedOrigins 체크
  if (Array.isArray(meta.supportedOrigins) && meta.supportedOrigins.length > 0) {
    var originOk = meta.supportedOrigins.some(function(o) {
      return o === 'KR' || o === origin;
    });
    if (!originOk) return { operates: false, reason: 'origin_not_supported' };
  }

  // 3. supportedDestinations 체크
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
  var ov = window.getOverrideForPeriod(iataCode, period || '2026.04');
  if (!ov) return null;
  if (Array.isArray(ov.items) && ov.items.length > 0) return {items: ov.items, currency: ov.currency};
  return null;
};

/** 현재 기간 override group_tiers 반환 (group_tier 스키마용, ZE) */
window.getOverrideGroupTiers = function(iataCode, period) {
  var ov = window.getOverrideForPeriod(iataCode, period || '2026.04');
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
var _KRW_RATES = {USD:1480,JPY:10.1,EUR:1630,GBP:1870,CNY:204,HKD:190,AUD:950,SGD:1110};
function _toKRWLocal(v, c) {
  if (v == null) return null;
  return (c && c !== 'KRW') ? Math.round(v * (_KRW_RATES[c] || 1)) : v;
}

window.resolveAllRoutes = function(feedAl, iataCode, period) {
  var cur_period = period || '2026.04';
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
  var cur_period = period || '2026.04';
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
    if (parts.length === 2) {
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

var _NATIVE_RATES = {USD:1480,JPY:10.1,EUR:1630,GBP:1870,CNY:204,HKD:190,AUD:950,SGD:1110};
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
  { key:'index.region.korea',    codes:['ICN','GMP','PUS','CJU'] },
  { key:'index.region.japan',    codes:['NRT','HND','KIX','FUK','CTS'] },
  { key:'index.region.asia',     codes:['HKG','SIN','BKK','MNL','KUL','SGN','HAN','DAD','DPS','PVG','PEK'] },
  { key:'index.region.naOceania',codes:['LAX','JFK','SFO','SEA','SYD'] },
  { key:'index.region.europeMiddleEast', codes:['CDG','LHR','FRA','AMS','DXB'] },
];

/* ─── 번역 딕셔너리 ─── */
window.I18N = {

/* ══════ 한국어 ══════ */
ko:{
  /* nav */
  'nav.routes':'노선별 조회','nav.airlines':'항공사 인덱스','nav.news':'참고 소식',
  /* footer */
  'footer.notice':'표시된 유류할증료는 항공사 공식 공지 기반 참고용 정보입니다. 최종 금액은 항공사 공식 사이트 또는 발권처에서 반드시 확인하세요.',
  'footer.about':'About','footer.privacy':'Privacy Policy','footer.terms':'Terms of Service',
  /* page meta */
  'index.title':'유류할증료 조회 — 한국 출발 국제선 항공사별 비교',
  'index.metaDesc':'한국 출발 국제선 항공사별 유류할증료를 노선·거리구간별로 비교합니다.',
  /* hero */
  'index.heroTitle':'노선별 유류할증료 조회',
  'index.heroSub':'한국 국적기 출발·도착 기준 유류할증료 비교 · 공식 공지 + AI 예측',
  /* form */
  'index.labelOrigin':'출발 공항','index.labelDest':'도착 공항','index.labelTrip':'여정',
  'index.trip.oneWay':'편도','index.trip.roundTrip':'왕복',
  'index.search':'🔍 검색',
  'index.airport.selectOrigin':'출발지 선택','index.airport.selectDest':'도착지 선택',
  /* regions */
  'index.region.korea':'🇰🇷 한국','index.region.japan':'🇯🇵 일본',
  'index.region.asia':'🌏 아시아','index.region.naOceania':'🇺🇸 북미·오세아니아',
  'index.region.europeMiddleEast':'🇪🇺 유럽·중동',
  /* airport names */
  'airport.ICN':'인천','airport.GMP':'김포','airport.PUS':'부산','airport.CJU':'제주',
  'airport.NRT':'도쿄 나리타','airport.HND':'도쿄 하네다','airport.KIX':'오사카',
  'airport.FUK':'후쿠오카','airport.CTS':'삿포로',
  'airport.HKG':'홍콩','airport.SIN':'싱가포르','airport.BKK':'방콕','airport.MNL':'마닐라',
  'airport.KUL':'쿠알라룸푸르','airport.SGN':'호찌민','airport.HAN':'하노이',
  'airport.DAD':'다낭','airport.DPS':'발리','airport.PVG':'상하이','airport.PEK':'베이징',
  'airport.LAX':'LA','airport.JFK':'뉴욕','airport.SFO':'샌프란시스코',
  'airport.SEA':'시애틀','airport.SYD':'시드니',
  'airport.CDG':'파리','airport.LHR':'런던','airport.FRA':'프랑크푸르트',
  'airport.AMS':'암스테르담','airport.DXB':'두바이',
  /* beta banner */
  'beta.title':'베타 서비스 안내',
  'beta.desc':'현재 한국 출발 국제선 유류할증료를 기준으로 제공되고 있으며, 일부 항공사는 공식 공지 기반 수동 반영입니다. 최종 금액은 항공사 공식 공지를 반드시 확인해주세요.',
  'beta.note':'※ 현재는 한국 출발 국제선만 지원합니다. 해외 출발 노선은 서비스 준비중입니다.',
  /* intro cards */
  'index.intro1.title':'한국 출발 국제선 유류할증료 비교',
  'index.intro1.body':'이 서비스는 인천(ICN), 김포(GMP), 부산(PUS) 등 한국 출발 국제선의 항공사별 유류할증료를 노선·거리구간별로 비교합니다. 대한항공, 아시아나항공, 제주항공 등 국내외 항공사의 공식 공지를 기반으로 한 데이터를 제공합니다.',
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
  /* landing */
  'index.landingTitle':'한국 출발 국제선 유류할증료',
  'index.krOnly.title':'한국 출발 국제선만 지원합니다',
  'index.krOnly.desc':'노선별 조회에서 출발지·도착지를 선택하면 항공사별 공식 공지 기준 금액을 확인할 수 있습니다. 단일 금액은 구간마다 달라 오해 소지가 있어 표시하지 않습니다.',
  'index.indexLink':'→ 항공사 전체 인덱스 보기',
  /* status */
  'index.status.loading':'데이터 로딩 중...',
  'index.status.loadError':'데이터 로딩 실패 — 콘솔을 확인하세요',
  'index.status.scriptError':'스크립트 오류로 로딩 실패 — 콘솔을 확인하세요',
  'index.status.updated':'데이터 갱신: ','index.status.updatedSuffix':' · 2026-04 공식 공지 기준',
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
  'index.meta.suffix':'한국 출발 국제선 · 2026년 4월 공식 공지 기준',
  /* card strings */
  'index.card.currentRoute':'현재 노선',
  'index.card.notPublished':'미공지',
  'index.card.preAnnouncement':'공시전',
  'index.card.groupTier':'군별 요금',
  'index.card.usdNotice':'USD 공시',
  'index.card.notOperated':'미운항',
  'index.card.routeNotServed':'해당 노선 미취항',
  'index.card.viewOfficialNotice':'공식 공지 ↗',
  'index.card.noData':'공식 데이터를 불러올 수 없습니다. 공식 공지 버튼을 통해 직접 확인하세요.',
  'index.card.compare':'04→05 비교',
  'index.card.period':'2026.04',
  'index.card.periodMay':'2026.05',
  'index.card.fare':'유류할증료',
  'index.card.distanceBand':'거리구간',
  'index.card.mayTrend':'5월 최소',
  'index.card.groupTierShort':'군별',
  'index.card.notListed':'공지 미기재',
  'index.card.miniNotice':'공식 공지 ↗',
  /* news page */
  'news.pageTitle':'참고 소식',
  'news.pageSub':'유류할증료 관련 국가·기관·항공사·시장 참고 정보 · 데이터 기반 AI 요약 · 예측 근거 연결',
  'news.predictTitle':'📊 AI 예측 참고 지표 현황',
  'news.officialTitle':'📢 5월 유류할증료 공식 공지 요약',
  'news.compareTitle':'📊 4월 vs 5월 변화',
  'news.marketTitle':'🌍 시장 브리핑',
  'news.brent':'⛽ 브렌트유: $86~89 / 배럴 — 단기 반등 후 횡보',
  'news.fx':'💱 원달러 환율: 1,460~1,480원 — 고점 대비 소폭 하락했지만 여전히 고환율',
  'news.mops':'✈️ 항공유/MOPS: 고점 대비 일부 조정 후 재상승 시도, 여전히 높은 구간',
  'news.geo':'🌍 지정학: 중동 리스크와 공급 불안 지속',
  'news.marketSummary':'→ 유가가 급등하는 국면은 아니지만 환율과 항공유 가격이 높은 수준을 유지해 6월 유류할증료 인하 신호는 약한 구조',
  'news.fxDominance':'💡 핵심 신호: 하락 신호 없음 · 환율 부담 지속 · 여름 수요 반영 시작',
  'news.decisionTitle':'📌 현재 판단 기준',
  'news.decisionLine1':'→ 5월은 주요 항공사 인상 반영 완료',
  'news.decisionLine2':'→ 6월 공시는 5월 중 각 항공사 공식 채널에서 확인 필요',
  'news.decisionShort':'👉 단기 여행(1~2개월): 현재 공시 기준 총액 확인 후 예약 판단',
  'news.decisionLong':'👉 여유 있는 일정: 5월 중 6월 공시 추이 추가 확인 권장',
  /* 6월 전망 CTA 박스 */
  'news.forecastCta.title':'2026년 6월 유류할증료 상세 전망',
  'news.forecastCta.desc':'브렌트유, 원달러 환율, 항공유/MOPS, 중동 리스크를 기준으로 6월 유류할증료 방향성을 따로 정리했습니다.',
  'news.forecastCta.btn':'6월 전망 자세히 보기 →',
  /* 6월 기준 안내 */
  'news.basisTitle':'📅 6월 유류할증료 공시 안내',
  'news.basisBody':'6월 공시는 5월 중 각 항공사 공식 채널에서 확인 필요합니다.',
  'news.aiNotice':'AI 요약 콘텐츠 — 이 페이지의 내용은 공개된 정보를 바탕으로 AI가 정리한 참고용 자료입니다. 원문 기반 요약이며, 공식 정보가 아닙니다. 중요한 결정 전에 각 항공사 및 기관의 공식 채널을 반드시 확인하세요.',
  'news.filterAll':'전체',
  'news.filterInstitution':'기관',
  'news.filterMarket':'시장',
  'news.disclaimer':'※ 유류할증료는 예약 시점 기준으로 적용됩니다. 변동 전에 예약 여부를 반드시 확인하세요.',
  'news.cat.airline':'항공사','news.cat.institution':'기관','news.cat.market':'시장','news.cat.general':'일반',
  'news.impact.prefix':'→ 유류할증료 영향: ',
  /* predict box */
  'news.predict.subtitle':'데이터 기반 추정',
  'news.predict.footnote':'* 5월 유류할증료는 공식 공지 기준 확정. 6월 전망은 시장 데이터 기반 참고용입니다.',
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
  'news.official.ke':'대한항공 — 4월 대비 전 구간 인상',
  'news.official.oz':'아시아나항공 — 4월 대비 전 구간 인상',
  'news.official.lj':'진에어 — 전 구간 인상 (예: USD 25 → 42, USD 76 → 140)',
  'news.official.7c':'제주항공 — 전 구간 인상 (예: USD 29 → 52, USD 68 → 126)',
  'news.official.desc':'* 단거리~장거리 전 구간 상승, 장거리 인상폭 큼',
  /* compare box */
  'news.compare.li1':'대한항공: 전 구간 인상 (최대 약 2배)',
  'news.compare.li2':'아시아나: 전 구간 인상',
  'news.compare.li3':'진에어: 전 구간 인상, 최대 USD 76 → 140',
  'news.compare.li4':'제주항공: 전 구간 인상, 최대 USD 68 → 126',
  'news.compare.li5':'공통: 5월 국제선 유류할증료 역대 최고 수준',
  /* fixed news cards */
  'news.fixed.20260420.title':'유가 하락 지속, 6월 유류할증료 인하 가능성 확대',
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
  'news.fixed.src.marketUpdate':'Market Update',
  'news.fixed.src.airlineNotice':'항공사 공지',
  'news.fixed.src.marketSummary':'시장 종합',
  'news.fixed.src.marketSummaryEn':'Market Summary',
  'news.fixed.src.marketBreaking':'Market Breaking',
  'news.fixed.src.fxMarket':'FX Market',
  /* page meta */
  'news.metaTitle':'참고 소식 — 항공 유류할증료 동향 | 국제유가·환율·정책',
  'news.metaDesc':'항공 유류할증료에 영향을 주는 국제유가, 환율, 정책 동향 정보. 국가·기관·시장 관련 참고 소식을 AI 요약으로 제공합니다.',
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
  'index.quick.may.name':'2026년 5월 유류할증료',
  'index.quick.may.desc':'항공사별 5월 적용 비교',
  'index.quick.june.name':'2026년 6월 전망',
  'index.quick.june.desc':'유가·환율 기반 전망',
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
  'nav.routes':'Route Search','nav.airlines':'Airline Index','nav.news':'Market News',
  'footer.notice':'Fuel surcharge data is provided for reference only. Always confirm the final amount with the airline or ticketing agent.',
  'footer.about':'About','footer.privacy':'Privacy Policy','footer.terms':'Terms of Service',
  'index.title':'Fuel Surcharge Search — Korea Departure International Flights',
  'index.metaDesc':'Compare fuel surcharges by airline for international flights departing Korea.',
  'index.heroTitle':'Fuel Surcharge by Route',
  'index.heroSub':'Compare fuel surcharges for Korea departure routes · Official notices + AI forecast',
  'index.labelOrigin':'Departure Airport','index.labelDest':'Arrival Airport','index.labelTrip':'Trip Type',
  'index.trip.oneWay':'One-way','index.trip.roundTrip':'Round-trip',
  'index.search':'🔍 Search',
  'index.airport.selectOrigin':'Select origin','index.airport.selectDest':'Select destination',
  'index.region.korea':'🇰🇷 Korea','index.region.japan':'🇯🇵 Japan',
  'index.region.asia':'🌏 Asia','index.region.naOceania':'🇺🇸 N. America & Oceania',
  'index.region.europeMiddleEast':'🇪🇺 Europe & Middle East',
  'airport.ICN':'Seoul Incheon','airport.GMP':'Seoul Gimpo','airport.PUS':'Busan','airport.CJU':'Jeju',
  'airport.NRT':'Tokyo Narita','airport.HND':'Tokyo Haneda','airport.KIX':'Osaka',
  'airport.FUK':'Fukuoka','airport.CTS':'Sapporo',
  'airport.HKG':'Hong Kong','airport.SIN':'Singapore','airport.BKK':'Bangkok','airport.MNL':'Manila',
  'airport.KUL':'Kuala Lumpur','airport.SGN':'Ho Chi Minh City','airport.HAN':'Hanoi',
  'airport.DAD':'Da Nang','airport.DPS':'Bali','airport.PVG':'Shanghai','airport.PEK':'Beijing',
  'airport.LAX':'Los Angeles','airport.JFK':'New York','airport.SFO':'San Francisco',
  'airport.SEA':'Seattle','airport.SYD':'Sydney',
  'airport.CDG':'Paris','airport.LHR':'London','airport.FRA':'Frankfurt',
  'airport.AMS':'Amsterdam','airport.DXB':'Dubai',
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
  'index.landingTitle':'Fuel Surcharges — Korea Departures',
  'index.krOnly.title':'Korea Departures Only',
  'index.krOnly.desc':'Select origin and destination in Route Search to compare official surcharge amounts by airline. Per-segment amounts vary, so a single figure is not shown.',
  'index.indexLink':'→ View Full Airline Index',
  'index.status.loading':'Loading data...','index.status.loadError':'Failed to load data — check console',
  'index.status.scriptError':'Script error — check console',
  'index.status.updated':'Data updated: ','index.status.updatedSuffix':' · Based on Apr 2026 official notice',
  'index.filter.all':'All','index.filter.hasOfficialData':'Has Official Data',
  'index.result.label':'Fuel Surcharge by Airline',
  'index.result.noResults':'No results found',
  'index.result.onlyKoreaDeparture':'Only Korea departure routes are currently supported',
  'index.result.overseasComingSoon':'Overseas departure routes are coming soon.',
  'index.result.overseasMeta':'Overseas departure route',
  'index.alert.selectAirports':'Please select origin and destination',
  'index.alert.differentAirports':'Origin and destination must be different',
  'index.meta.oneWay':'One-way','index.meta.roundTrip':'Round-trip',
  'index.meta.suffix':'Korea Departure · Based on April 2026 Official Notice',
  'index.card.currentRoute':'This Route',
  'index.card.notPublished':'N/A','index.card.preAnnouncement':'Pending',
  'index.card.groupTier':'Group Tier','index.card.usdNotice':'USD Quoted',
  'index.card.notOperated':'Not Operated','index.card.routeNotServed':'This airline does not serve this route',
  'index.card.viewOfficialNotice':'Official Notice ↗',
  'index.card.noData':'Official data unavailable. Please check via the official notice button.',
  'index.card.compare':'04→05 Comparison',
  'index.card.period':'2026.04','index.card.periodMay':'2026.05',
  'index.card.fare':'Surcharge','index.card.distanceBand':'Distance Band',
  'index.card.mayTrend':'May Min.',
  'index.card.groupTierShort':'Group',
  'index.card.notListed':'Not listed','index.card.miniNotice':'Official Notice ↗',
  /* news page */
  'news.pageTitle':'Market Insights',
  'news.pageSub':'Fuel surcharge market, policy & airline updates · AI-powered summaries · Forecast basis',
  'news.predictTitle':'📊 AI Forecast Indicators',
  'news.officialTitle':'📢 May Fuel Surcharge — Official Summary',
  'news.compareTitle':'📊 April vs May Changes',
  'news.marketTitle':'🌍 Market Brief',
  'news.brent':'⛽ Brent Crude: $86–89 / bbl — sideways after short-term rebound',
  'news.fx':'💱 USD/KRW: KRW 1,460–1,480 — slightly off peak but still elevated',
  'news.mops':'✈️ Jet Fuel/MOPS: Attempting to rebound after limited pullback, still elevated',
  'news.geo':'🌍 Geopolitics: Middle East risk and supply concerns remain',
  'news.marketSummary':'→ No surge underway, but FX and jet fuel costs remain elevated — weak signal for a June surcharge cut',
  'news.fxDominance':'💡 Key signals: No decline signal · FX pressure ongoing · Summer demand starting to be priced in',
  'news.decisionTitle':'📌 Current Decision Guide',
  'news.decisionLine1':'→ May: all major airlines have confirmed higher surcharges vs. April',
  'news.decisionLine2':'→ June filings: check each airline\'s official channel during May',
  'news.decisionShort':'👉 Short trip (1–2 months out): confirm total at current filing, then decide',
  'news.decisionLong':'👉 Flexible schedule: monitor June filings when published in May',
  /* 6월 전망 CTA 박스 */
  'news.forecastCta.title':'June 2026 Fuel Surcharge Outlook',
  'news.forecastCta.desc':'A separate outlook page summarizes June surcharge direction based on Brent crude, USD/KRW, jet fuel/MOPS and geopolitical risk.',
  'news.forecastCta.btn':'View June Outlook →',
  /* 6월 기준 안내 */
  'news.basisTitle':'📅 June Surcharge Filing Notice',
  'news.basisBody':'June filings will be published by each airline via their official channels during May.',
  'news.aiNotice':'AI Summary — Content on this page is AI-organized reference information based on public data. Not official. Always confirm with airline official channels before important decisions.',
  'news.filterAll':'All',
  'news.filterInstitution':'Institutional',
  'news.filterMarket':'Market',
  'news.disclaimer':'※ Fuel surcharges apply based on booking date. Confirm before prices change.',
  'news.cat.airline':'Airline','news.cat.institution':'Institutional','news.cat.market':'Market','news.cat.general':'General',
  'news.impact.prefix':'→ Surcharge impact: ',
  /* predict box */
  'news.predict.subtitle':'Data-based estimate',
  'news.predict.footnote':'* May surcharge confirmed by official notice. June outlook is market-data reference only.',
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
  'news.official.ke':'Korean Air — All routes raised vs April',
  'news.official.oz':'Asiana Airlines — All routes raised vs April',
  'news.official.lj':'Jin Air — All routes raised (e.g. USD 25→42, USD 76→140)',
  'news.official.7c':'Jeju Air — All routes raised (e.g. USD 29→52, USD 68→126)',
  'news.official.desc':'* Short to long-haul all up; long-haul hike largest',
  /* compare box */
  'news.compare.li1':'Korean Air: all routes up (up to ~2×)',
  'news.compare.li2':'Asiana: all routes up',
  'news.compare.li3':'Jin Air: all routes up, max USD 76→140',
  'news.compare.li4':'Jeju Air: all routes up, max USD 68→126',
  'news.compare.li5':'Common: May international surcharge at all-time high',
  /* fixed news cards */
  'news.fixed.20260420.title':'Oil prices keep falling — June surcharge cut increasingly likely',
  'news.fixed.20260420.summary':'Brent crude has continued sliding after hitting the low $80s. The USD/KRW rate is easing slightly despite remaining elevated, and the probability of a June surcharge reduction or hold is growing.',
  'news.fixed.20260420.impact':'Downward pressure strengthening',
  'news.fixed.20260417.title':'Jin Air & Jeju Air raise May international fuel surcharges',
  'news.fixed.20260417.summary':'Following Korean Air and Asiana, Jin Air and Jeju Air have raised surcharges across all routes. Some bands are up nearly 2× vs April.',
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
  'news.fixed.src.marketUpdate':'Market Update',
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
  'index.quick.may.name':'May 2026 Fuel Surcharge',
  'index.quick.may.desc':'Compare May rates by airline',
  'index.quick.june.name':'June 2026 Outlook',
  'index.quick.june.desc':'Oil and FX based outlook',
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
  'nav.routes':'路線別検索','nav.airlines':'航空会社一覧','nav.news':'参考ニュース',
  'footer.notice':'燃油サーチャージ情報は参考用です。最終金額は必ず航空会社公式サイトでご確認ください。',
  'footer.about':'About','footer.privacy':'プライバシーポリシー','footer.terms':'利用規約',
  'index.title':'燃油サーチャージ照会 — 韓国出発国際線',
  'index.metaDesc':'韓国出発国際線の航空会社別燃油サーチャージを比較。',
  'index.heroTitle':'路線別燃油サーチャージ照会',
  'index.heroSub':'韓国出発路線の燃油サーチャージ比較 · 公式通知 + AI予測',
  'index.labelOrigin':'出発空港','index.labelDest':'到着空港','index.labelTrip':'旅程',
  'index.trip.oneWay':'片道','index.trip.roundTrip':'往復',
  'index.search':'🔍 検索',
  'index.airport.selectOrigin':'出発地を選択','index.airport.selectDest':'目的地を選択',
  'index.region.korea':'🇰🇷 韓国','index.region.japan':'🇯🇵 日本',
  'index.region.asia':'🌏 アジア','index.region.naOceania':'🇺🇸 北米・オセアニア',
  'index.region.europeMiddleEast':'🇪🇺 欧州・中東',
  'airport.ICN':'ソウル仁川','airport.GMP':'ソウル金浦','airport.PUS':'釜山','airport.CJU':'済州',
  'airport.NRT':'東京成田','airport.HND':'東京羽田','airport.KIX':'大阪',
  'airport.FUK':'福岡','airport.CTS':'札幌',
  'airport.HKG':'香港','airport.SIN':'シンガポール','airport.BKK':'バンコク','airport.MNL':'マニラ',
  'airport.KUL':'クアラルンプール','airport.SGN':'ホーチミン','airport.HAN':'ハノイ',
  'airport.DAD':'ダナン','airport.DPS':'バリ','airport.PVG':'上海','airport.PEK':'北京',
  'airport.LAX':'ロサンゼルス','airport.JFK':'ニューヨーク','airport.SFO':'サンフランシスコ',
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
  'index.landingTitle':'韓国出発国際線燃油サーチャージ',
  'index.krOnly.title':'韓国出発のみ対応','index.krOnly.desc':'路線別検索で出発・目的地を選択すると航空会社別の公式通知金額を確認できます。',
  'index.indexLink':'→ 航空会社一覧を見る',
  'index.status.loading':'データ読み込み中...','index.status.loadError':'データ読み込み失敗',
  'index.status.scriptError':'スクリプトエラー',
  'index.status.updated':'データ更新: ','index.status.updatedSuffix':' · 2026年4月公式通知基準',
  'index.filter.all':'すべて','index.filter.hasOfficialData':'公式データあり',
  'index.result.label':'航空会社別燃油サーチャージ',
  'index.result.noResults':'検索結果がありません',
  'index.result.onlyKoreaDeparture':'現在は韓国出発国際線のみ対応しています',
  'index.result.overseasComingSoon':'海外出発路線は準備中です。',
  'index.result.overseasMeta':'海外出発路線',
  'index.alert.selectAirports':'出発地と目的地を選択してください',
  'index.alert.differentAirports':'出発地と目的地を別々に選択してください',
  'index.meta.oneWay':'片道','index.meta.roundTrip':'往復',
  'index.meta.suffix':'韓国出発 · 2026年4月公式通知基準',
  'index.card.currentRoute':'現在の路線',
  'index.card.notPublished':'未公示','index.card.preAnnouncement':'公示前',
  'index.card.groupTier':'群別料金','index.card.usdNotice':'USD建て',
  'index.card.notOperated':'未就航','index.card.routeNotServed':'該当路線は未就航です',
  'index.card.viewOfficialNotice':'公式通知 ↗',
  'index.card.noData':'公式データが取得できません。公式通知ボタンからご確認ください。',
  'index.card.compare':'04→05比較',
  'index.card.period':'2026.04','index.card.periodMay':'2026.05',
  'index.card.fare':'サーチャージ','index.card.distanceBand':'距離帯',
  'index.card.mayTrend':'5月最小',
  'index.card.groupTierShort':'群別',
  'index.card.notListed':'公示なし','index.card.miniNotice':'公式通知 ↗',
  /* news page */
  'news.pageTitle':'参考ニュース',
  'news.pageSub':'燃油サーチャージ関連 市場・政策・航空会社情報 · AI要約 · 予測根拠',
  'news.predictTitle':'📊 AI予測参考指標',
  'news.officialTitle':'📢 5月燃油サーチャージ 公式まとめ',
  'news.compareTitle':'📊 4月→5月変化',
  'news.marketTitle':'🌍 市場ブリーフィング',
  'news.brent':'⛽ ブレント原油: $86〜89 / バレル — 短期反発後横ばい',
  'news.fx':'💱 ウォン/ドル: 1,460〜1,480ウォン — 高値からわずかに下落も依然高水準',
  'news.mops':'✈️ 航空燃料/MOPS: 高値から一部調整後に再上昇を試みる動き、依然高値圏',
  'news.geo':'🌍 地政学: 中東リスクと供給不安が継続',
  'news.marketSummary':'→ 急騰局面ではないが為替と航空燃料価格が高水準を維持しており、6月引き下げシグナルは弱い構造',
  'news.fxDominance':'💡 キーシグナル: 下落シグナルなし · 為替負担継続 · 夏需要の先取りが始まる',
  'news.decisionTitle':'📌 現在の判断基準',
  'news.decisionLine1':'→ 5月：主要航空会社の引き上げ反映完了',
  'news.decisionLine2':'→ 6月公示：5月中に各航空会社の公式チャンネルで要確認',
  'news.decisionShort':'👉 短期旅行（1〜2ヶ月以内）：現在公示基準の総額確認後に予約判断',
  'news.decisionLong':'👉 日程に余裕あり：5月中の6月公示動向を追加確認推奨',
  /* 6月予測CTAボックス */
  'news.forecastCta.title':'2026年6月 燃油サーチャージ詳細予測',
  'news.forecastCta.desc':'ブレント原油・ウォン/ドル為替・航空燃油/MOPS・中東リスクをベースに6月サーチャージの方向性を別ページでまとめました。',
  'news.forecastCta.btn':'6月予測を詳しく見る →',
  /* 6月基準案内 */
  'news.basisTitle':'📅 6月サーチャージ公示案内',
  'news.basisBody':'6月公示は5月中に各航空会社の公式チャンネルでご確認ください。',
  'news.aiNotice':'AI要約コンテンツ — このページの内容は公開情報をもとにAIが整理した参考資料です。公式情報ではありません。重要な判断前は各航空会社の公式チャンネルを必ずご確認ください。',
  'news.filterAll':'すべて',
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
  'news.official.ke':'大韓航空 — 4月比全路線引き上げ',
  'news.official.oz':'アシアナ航空 — 4月比全路線引き上げ',
  'news.official.lj':'ジンエアー — 全路線引き上げ（例: USD 25→42, 76→140）',
  'news.official.7c':'チェジュ航空 — 全路線引き上げ（例: USD 29→52, 68→126）',
  'news.official.desc':'* 短距離〜長距離全路線上昇、長距離の上昇幅が最大',
  /* compare box */
  'news.compare.li1':'大韓航空：全路線引き上げ（最大約2倍）',
  'news.compare.li2':'アシアナ：全路線引き上げ',
  'news.compare.li3':'ジンエアー：全路線引き上げ、最大 USD 76→140',
  'news.compare.li4':'チェジュ航空：全路線引き上げ、最大 USD 68→126',
  'news.compare.li5':'共通：5月国際線燃油サーチャージが過去最高水準',
  /* fixed news cards */
  'news.fixed.20260420.title':'原油安続く — 6月サーチャージ引き下げの可能性が拡大',
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
  'news.fixed.src.marketUpdate':'Market Update',
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
  'index.quick.may.name':'2026年5月 燃油サーチャージ',
  'index.quick.may.desc':'航空会社別5月適用比較',
  'index.quick.june.name':'2026年6月 予測',
  'index.quick.june.desc':'原油・為替ベースの見通し',
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
  'nav.routes':'按航线查询','nav.airlines':'航空公司一览','nav.news':'参考资讯',
  'footer.notice':'燃油附加费信息仅供参考。最终金额请以航空公司官方公告为准。',
  'footer.about':'About','footer.privacy':'隐私政策','footer.terms':'服务条款',
  'index.title':'燃油附加费查询 — 韩国出发国际航班',
  'index.metaDesc':'比较韩国出发国际航班各航空公司燃油附加费。',
  'index.heroTitle':'按航线查询燃油附加费',
  'index.heroSub':'韩国出发航线燃油附加费比较 · 官方公告 + AI预测',
  'index.labelOrigin':'出发机场','index.labelDest':'到达机场','index.labelTrip':'行程类型',
  'index.trip.oneWay':'单程','index.trip.roundTrip':'往返',
  'index.search':'🔍 搜索',
  'index.airport.selectOrigin':'选择出发地','index.airport.selectDest':'选择目的地',
  'index.region.korea':'🇰🇷 韩国','index.region.japan':'🇯🇵 日本',
  'index.region.asia':'🌏 亚洲','index.region.naOceania':'🇺🇸 北美·大洋洲',
  'index.region.europeMiddleEast':'🇪🇺 欧洲·中东',
  'airport.ICN':'首尔仁川','airport.GMP':'首尔金浦','airport.PUS':'釜山','airport.CJU':'济州',
  'airport.NRT':'东京成田','airport.HND':'东京羽田','airport.KIX':'大阪',
  'airport.FUK':'福冈','airport.CTS':'札幌',
  'airport.HKG':'香港','airport.SIN':'新加坡','airport.BKK':'曼谷','airport.MNL':'马尼拉',
  'airport.KUL':'吉隆坡','airport.SGN':'胡志明市','airport.HAN':'河内',
  'airport.DAD':'岘港','airport.DPS':'巴厘岛','airport.PVG':'上海','airport.PEK':'北京',
  'airport.LAX':'洛杉矶','airport.JFK':'纽约','airport.SFO':'旧金山',
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
  'index.landingTitle':'韩国出发国际航班燃油附加费',
  'index.krOnly.title':'仅支持韩国出发','index.krOnly.desc':'在航线查询中选择出发地和目的地，即可查看各航空公司官方公告金额。',
  'index.indexLink':'→ 查看完整航空公司一览',
  'index.status.loading':'数据加载中...','index.status.loadError':'数据加载失败',
  'index.status.scriptError':'脚本错误',
  'index.status.updated':'数据更新: ','index.status.updatedSuffix':' · 2026年4月官方公告基准',
  'index.filter.all':'全部','index.filter.hasOfficialData':'有官方数据',
  'index.result.label':'各航空公司燃油附加费',
  'index.result.noResults':'无搜索结果',
  'index.result.onlyKoreaDeparture':'目前仅支持韩国出发国际航班',
  'index.result.overseasComingSoon':'海外出发航线即将上线。',
  'index.result.overseasMeta':'海外出发航线',
  'index.alert.selectAirports':'请选择出发地和目的地',
  'index.alert.differentAirports':'出发地和目的地请选择不同机场',
  'index.meta.oneWay':'单程','index.meta.roundTrip':'往返',
  'index.meta.suffix':'韩国出发 · 2026年4月官方公告基准',
  'index.card.currentRoute':'当前航线',
  'index.card.notPublished':'未公布','index.card.preAnnouncement':'待公布',
  'index.card.groupTier':'组别费率','index.card.usdNotice':'USD报价',
  'index.card.notOperated':'未开通','index.card.routeNotServed':'该航空公司未运营此航线',
  'index.card.viewOfficialNotice':'官方公告 ↗',
  'index.card.noData':'无法获取官方数据，请通过官方公告按钮直接查看。',
  'index.card.compare':'04→05对比',
  'index.card.period':'2026.04','index.card.periodMay':'2026.05',
  'index.card.fare':'燃油附加费','index.card.distanceBand':'距离段',
  'index.card.mayTrend':'5月最低',
  'index.card.groupTierShort':'组别',
  'index.card.notListed':'未公布','index.card.miniNotice':'官方公告 ↗',
  /* news page */
  'news.pageTitle':'参考资讯',
  'news.pageSub':'燃油附加费相关市场、政策、航空公司动态 · AI摘要 · 预测依据',
  'news.predictTitle':'📊 AI预测参考指标',
  'news.officialTitle':'📢 5月燃油附加费 官方公告汇总',
  'news.compareTitle':'📊 4月 vs 5月对比',
  'news.marketTitle':'🌍 市场简报',
  'news.brent':'⛽ 布伦特原油: $86~89 / 桶 — 短期反弹后横盘',
  'news.fx':'💱 美元/韩元: 1,460~1,480韩元 — 高点小幅回落但仍处高位',
  'news.mops':'✈️ 航空燃油/MOPS: 高点后小幅回调，再次尝试反弹，仍处高位区间',
  'news.geo':'🌍 地缘政治: 中东风险与供应不安持续',
  'news.marketSummary':'→ 油价未出现急涨，但汇率与航空燃油价格维持高位，6月下调信号偏弱',
  'news.fxDominance':'💡 核心信号: 无下调信号 · 汇率压力持续 · 夏季需求开始提前反映',
  'news.decisionTitle':'📌 当前判断参考',
  'news.decisionLine1':'→ 5月：主要航空公司涨价反映完成',
  'news.decisionLine2':'→ 6月公告：请于5月关注各航空公司官方渠道',
  'news.decisionShort':'👉 短途旅行（1~2个月内）：按当前公告确认总额后决定',
  'news.decisionLong':'👉 时间充裕：建议5月中持续关注6月公告动态',
  /* 6月预测CTA框 */
  'news.forecastCta.title':'2026年6月燃油附加费详细预测',
  'news.forecastCta.desc':'以布伦特原油、韩元/美元汇率、航空燃油/MOPS、中东风险为基准，另行整理了6月附加费方向性。',
  'news.forecastCta.btn':'查看6月预测详情 →',
  /* 6月基准说明 */
  'news.basisTitle':'📅 6月燃油附加费公告说明',
  'news.basisBody':'6月公告请于5月中关注各航空公司官方渠道。',
  'news.aiNotice':'AI摘要内容 — 本页内容为AI基于公开信息整理的参考资料，非官方信息。重要决策前请务必确认各航空公司官方渠道。',
  'news.filterAll':'全部',
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
  'news.official.ke':'大韩航空 — 全航线较4月上调',
  'news.official.oz':'韩亚航空 — 全航线较4月上调',
  'news.official.lj':'真航空 — 全航线上调（如 USD 25→42, 76→140）',
  'news.official.7c':'济州航空 — 全航线上调（如 USD 29→52, 68→126）',
  'news.official.desc':'* 短途至长途全线上涨，长途涨幅最大',
  /* compare box */
  'news.compare.li1':'大韩航空：全线上调（最高约2倍）',
  'news.compare.li2':'韩亚航空：全线上调',
  'news.compare.li3':'真航空：全线上调，最高 USD 76→140',
  'news.compare.li4':'济州航空：全线上调，最高 USD 68→126',
  'news.compare.li5':'共同：5月国际线燃油附加费创历史最高',
  /* fixed news cards */
  'news.fixed.20260420.title':'油价持续下跌 — 6月附加费下调可能性扩大',
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
  'news.fixed.src.marketUpdate':'Market Update',
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
  'index.quick.may.name':'2026年5月 燃油附加费',
  'index.quick.may.desc':'各航空公司5月适用比较',
  'index.quick.june.name':'2026年6月 预测',
  'index.quick.june.desc':'基于油价和汇率的展望',
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
  'nav.routes':'Recherche route','nav.airlines':'Index compagnies','nav.news':'Actualités',
  'footer.notice':'Les données de surcharge carburant sont fournies à titre indicatif. Confirmez toujours le montant final auprès de la compagnie aérienne.',
  'footer.about':'À propos','footer.privacy':'Confidentialité','footer.terms':'Conditions',
  'index.title':'Surcharge carburant — Vols internationaux depuis la Corée',
  'index.metaDesc':'Comparez les surcharges carburant par compagnie pour les vols au départ de Corée.',
  'index.heroTitle':'Surcharge carburant par route',
  'index.heroSub':'Comparaison des surcharges pour Korea-départs · Avis officiels + prévisions IA',
  'index.labelOrigin':'Aéroport départ','index.labelDest':'Aéroport arrivée','index.labelTrip':'Type voyage',
  'index.trip.oneWay':'Aller simple','index.trip.roundTrip':'Aller-retour',
  'index.search':'🔍 Rechercher',
  'index.airport.selectOrigin':'Sélectionner départ','index.airport.selectDest':'Sélectionner arrivée',
  'index.region.korea':'🇰🇷 Corée','index.region.japan':'🇯🇵 Japon',
  'index.region.asia':'🌏 Asie','index.region.naOceania':'🇺🇸 Amér. du Nord & Océanie',
  'index.region.europeMiddleEast':'🇪🇺 Europe & Moyen-Orient',
  'airport.ICN':'Séoul Incheon','airport.GMP':'Séoul Gimpo','airport.PUS':'Busan','airport.CJU':'Jeju',
  'airport.NRT':'Tokyo Narita','airport.HND':'Tokyo Haneda','airport.KIX':'Osaka',
  'airport.FUK':'Fukuoka','airport.CTS':'Sapporo',
  'airport.HKG':'Hong Kong','airport.SIN':'Singapour','airport.BKK':'Bangkok','airport.MNL':'Manille',
  'airport.KUL':'Kuala Lumpur','airport.SGN':'Hô Chi Minh-Ville','airport.HAN':'Hanoï',
  'airport.DAD':'Da Nang','airport.DPS':'Bali','airport.PVG':'Shanghai','airport.PEK':'Pékin',
  'airport.LAX':'Los Angeles','airport.JFK':'New York','airport.SFO':'San Francisco',
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
  'index.landingTitle':'Surcharges carburant — Départs Corée',
  'index.krOnly.title':'Départs Corée uniquement',
  'index.krOnly.desc':'Sélectionnez départ et arrivée pour voir les montants officiels par compagnie.',
  'index.indexLink':'→ Voir l\'index complet des compagnies',
  'index.status.loading':'Chargement...','index.status.loadError':'Erreur de chargement',
  'index.status.scriptError':'Erreur de script',
  'index.status.updated':'Mis à jour: ','index.status.updatedSuffix':' · Avis officiel avr. 2026',
  'index.filter.all':'Tout','index.filter.hasOfficialData':'Données officielles disponibles',
  'index.result.label':'Surcharge par compagnie',
  'index.result.noResults':'Aucun résultat',
  'index.result.onlyKoreaDeparture':'Seuls les départs depuis la Corée sont pris en charge',
  'index.result.overseasComingSoon':'Les départs hors Corée arrivent bientôt.',
  'index.result.overseasMeta':'Route hors Corée',
  'index.alert.selectAirports':'Veuillez sélectionner départ et destination',
  'index.alert.differentAirports':'Le départ et la destination doivent être différents',
  'index.meta.oneWay':'Aller simple','index.meta.roundTrip':'Aller-retour',
  'index.meta.suffix':'Départ Corée · Avis officiel avril 2026',
  'index.card.currentRoute':'Cette route',
  'index.card.notPublished':'N/D','index.card.preAnnouncement':'En attente',
  'index.card.groupTier':'Tarif groupe','index.card.usdNotice':'USD coté',
  'index.card.notOperated':'Non desservie','index.card.routeNotServed':'La compagnie ne dessert pas cette route',
  'index.card.viewOfficialNotice':'Avis officiel ↗',
  'index.card.noData':'Données indisponibles. Consultez le bouton avis officiel.',
  'index.card.compare':'Comparaison 04→05',
  'index.card.period':'2026.04','index.card.periodMay':'2026.05',
  'index.card.fare':'Surcharge','index.card.distanceBand':'Tranche distance',
  'index.card.mayTrend':'Min. mai',
  'index.card.groupTierShort':'Groupe',
  'index.card.notListed':'Non publié','index.card.miniNotice':'Avis officiel ↗',
  /* news page */
  'news.pageTitle':'Actualités marché',
  'news.pageSub':'Surcharge carburant · actualités marché, politique & compagnies aériennes · résumés IA',
  'news.predictTitle':'📊 Indicateurs de prévision IA',
  'news.officialTitle':'📢 Surcharge mai — Résumé officiel',
  'news.compareTitle':'📊 Comparaison avril vs mai',
  'news.marketTitle':'🌍 Point marché',
  'news.brent':'⛽ Brent: $86–89 / baril — stagnation après rebond court terme',
  'news.fx':'💱 USD/KRW: KRW 1 460–1 480 — légèrement sous le pic, toujours élevé',
  'news.mops':'✈️ Kérosène/MOPS: Rebond en cours après repli limité, toujours en zone élevée',
  'news.geo':'🌍 Géopolitique: risques Moyen-Orient et incertitudes d\'approvisionnement persistants',
  'news.marketSummary':'→ Pas de flambée des prix, mais le taux de change et le kérosène restent élevés — signal faible pour une baisse de surcharge en juin',
  'news.fxDominance':'💡 Signaux clés: Pas de signal de baisse · Pression change continue · Demande estivale commence à être intégrée',
  'news.decisionTitle':'📌 Guide de décision actuel',
  'news.decisionLine1':'→ Mai : toutes les grandes compagnies ont confirmé une hausse vs avril',
  'news.decisionLine2':'→ Juin : vérifiez les annonces officielles de chaque compagnie en mai',
  'news.decisionShort':'👉 Voyage court terme (1–2 mois) : confirmez le total au tarif actuel, puis décidez',
  'news.decisionLong':'👉 Planning flexible : surveillez les annonces de juin publiées en mai',
  /* Boîte CTA prévision juin */
  'news.forecastCta.title':'Prévision détaillée surcharge carburant juin 2026',
  'news.forecastCta.desc':'Une page dédiée résume la direction de la surcharge de juin basée sur le Brent, l\'USD/KRW, le kérosène/MOPS et le risque géopolitique.',
  'news.forecastCta.btn':'Voir la prévision de juin →',
  /* Mention base calcul juin */
  'news.basisTitle':'📅 Annonce surcharge juin',
  'news.basisBody':'Les annonces de juin seront publiées par chaque compagnie aérienne via leurs canaux officiels en mai.',
  'news.aiNotice':'Résumé IA — Le contenu de cette page est une référence organisée par IA sur la base de données publiques. Non officiel. Vérifiez toujours auprès des canaux officiels avant toute décision importante.',
  'news.filterAll':'Tout',
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
  'news.official.ke':'Korean Air — Tous les itinéraires en hausse vs avril',
  'news.official.oz':'Asiana Airlines — Tous les itinéraires en hausse vs avril',
  'news.official.lj':'Jin Air — Tous itinéraires relevés (ex: USD 25→42, 76→140)',
  'news.official.7c':'Jeju Air — Tous itinéraires relevés (ex: USD 29→52, 68→126)',
  'news.official.desc':'* Court au long-courrier en hausse ; long-courrier le plus impacté',
  /* compare box */
  'news.compare.li1':'Korean Air : tous itinéraires en hausse (jusqu\'à ×2)',
  'news.compare.li2':'Asiana : tous itinéraires en hausse',
  'news.compare.li3':'Jin Air : tous en hausse, max USD 76→140',
  'news.compare.li4':'Jeju Air : tous en hausse, max USD 68→126',
  'news.compare.li5':'Commun : surcharge internationale de mai à un niveau record',
  /* fixed news cards */
  'news.fixed.20260420.title':'Le pétrole continue de baisser — réduction surcharge juin de plus en plus probable',
  'news.fixed.20260420.summary':'Le Brent se maintient sous pression après avoir atteint les $80 bas. Le taux USD/KRW se stabilise légèrement malgré un niveau encore élevé, et la probabilité d\'une baisse ou d\'un maintien en juin augmente.',
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
  'news.fixed.src.marketUpdate':'Market Update',
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
  'index.quick.may.name':'Surcharge carburant — Mai 2026',
  'index.quick.may.desc':'Tarifs de mai par compagnie',
  'index.quick.june.name':'Prévision — Juin 2026',
  'index.quick.june.desc':'Perspectives pétrole et change',
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
  'nav.routes':'Streckensuche','nav.airlines':'Airline-Index','nav.news':'Nachrichten',
  'footer.notice':'Treibstoffzuschlag-Daten dienen nur als Referenz. Bitte bestätigen Sie den endgültigen Betrag bei der Fluggesellschaft.',
  'footer.about':'Über uns','footer.privacy':'Datenschutz','footer.terms':'Nutzungsbedingungen',
  'index.title':'Treibstoffzuschlag — Internationale Flüge ab Korea',
  'index.metaDesc':'Vergleichen Sie Treibstoffzuschläge nach Fluggesellschaft für internationale Flüge ab Korea.',
  'index.heroTitle':'Treibstoffzuschlag nach Strecke',
  'index.heroSub':'Vergleich der Treibstoffzuschläge für Korea-Abflüge · Offizielle Hinweise + KI-Prognose',
  'index.labelOrigin':'Abflughafen','index.labelDest':'Ankunftsflughafen','index.labelTrip':'Reiseart',
  'index.trip.oneWay':'Einfach','index.trip.roundTrip':'Hin und zurück',
  'index.search':'🔍 Suchen',
  'index.airport.selectOrigin':'Abflug wählen','index.airport.selectDest':'Ziel wählen',
  'index.region.korea':'🇰🇷 Korea','index.region.japan':'🇯🇵 Japan',
  'index.region.asia':'🌏 Asien','index.region.naOceania':'🇺🇸 Nordamerika & Ozeanien',
  'index.region.europeMiddleEast':'🇪🇺 Europa & Naher Osten',
  'airport.ICN':'Seoul Incheon','airport.GMP':'Seoul Gimpo','airport.PUS':'Busan','airport.CJU':'Jeju',
  'airport.NRT':'Tokio Narita','airport.HND':'Tokio Haneda','airport.KIX':'Osaka',
  'airport.FUK':'Fukuoka','airport.CTS':'Sapporo',
  'airport.HKG':'Hongkong','airport.SIN':'Singapur','airport.BKK':'Bangkok','airport.MNL':'Manila',
  'airport.KUL':'Kuala Lumpur','airport.SGN':'Ho-Chi-Minh-Stadt','airport.HAN':'Hanoi',
  'airport.DAD':'Da Nang','airport.DPS':'Bali','airport.PVG':'Shanghai','airport.PEK':'Peking',
  'airport.LAX':'Los Angeles','airport.JFK':'New York','airport.SFO':'San Francisco',
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
  'index.landingTitle':'Treibstoffzuschläge — Korea-Abflüge',
  'index.krOnly.title':'Nur Korea-Abflüge',
  'index.krOnly.desc':'Wählen Sie Abflug und Ziel in der Streckensuche, um offizielle Beträge zu sehen.',
  'index.indexLink':'→ Vollständigen Airline-Index ansehen',
  'index.status.loading':'Daten werden geladen...','index.status.loadError':'Fehler beim Laden',
  'index.status.scriptError':'Skriptfehler',
  'index.status.updated':'Aktualisiert: ','index.status.updatedSuffix':' · Offizielle Mitteilung Apr. 2026',
  'index.filter.all':'Alle','index.filter.hasOfficialData':'Offizielle Daten vorhanden',
  'index.result.label':'Treibstoffzuschlag nach Fluggesellschaft',
  'index.result.noResults':'Keine Ergebnisse',
  'index.result.onlyKoreaDeparture':'Derzeit werden nur Korea-Abflüge unterstützt',
  'index.result.overseasComingSoon':'Abflüge aus dem Ausland folgen bald.',
  'index.result.overseasMeta':'Route mit Auslandsabflug',
  'index.alert.selectAirports':'Bitte Abflug und Ziel auswählen',
  'index.alert.differentAirports':'Abflug und Ziel müssen unterschiedlich sein',
  'index.meta.oneWay':'Einfach','index.meta.roundTrip':'Hin und zurück',
  'index.meta.suffix':'Korea-Abflug · Offizielle Mitteilung April 2026',
  'index.card.currentRoute':'Diese Strecke',
  'index.card.notPublished':'Nicht veröffentlicht','index.card.preAnnouncement':'Ausstehend',
  'index.card.groupTier':'Gruppenpreis','index.card.usdNotice':'USD-notiert',
  'index.card.notOperated':'Nicht betrieben','index.card.routeNotServed':'Diese Fluggesellschaft betreibt diese Strecke nicht',
  'index.card.viewOfficialNotice':'Offizielle Mitteilung ↗',
  'index.card.noData':'Offizielle Daten nicht verfügbar. Bitte über den offiziellen Hinweis-Button prüfen.',
  'index.card.compare':'Vergleich 04→05',
  'index.card.period':'2026.04','index.card.periodMay':'2026.05',
  'index.card.fare':'Zuschlag','index.card.distanceBand':'Distanzbereich',
  'index.card.mayTrend':'Mai Min.',
  'index.card.groupTierShort':'Gruppe',
  'index.card.notListed':'Nicht veröff.','index.card.miniNotice':'Offizielle Mitteilung ↗',
  /* news page */
  'news.pageTitle':'Markt-News',
  'news.pageSub':'Treibstoffzuschlag · Markt-, Politik- & Airline-Updates · KI-Zusammenfassung · Prognosebasis',
  'news.predictTitle':'📊 KI-Prognose Indikatoren',
  'news.officialTitle':'📢 Mai Treibstoffzuschlag — Offizielle Zusammenfassung',
  'news.compareTitle':'📊 April vs. Mai Vergleich',
  'news.marketTitle':'🌍 Marktüberblick',
  'news.brent':'⛽ Brent-Rohöl: $86–89 / Barrel — Seitwärtsbewegung nach kurzfristiger Erholung',
  'news.fx':'💱 USD/KRW: KRW 1.460–1.480 — leicht unter dem Hoch, aber weiterhin erhöht',
  'news.mops':'✈️ Kerosin/MOPS: Erholung nach begrenzter Korrektur, weiterhin hohes Preisniveau',
  'news.geo':'🌍 Geopolitik: Nahost-Risiken und Versorgungsunsicherheiten dauern an',
  'news.marketSummary':'→ Kein Preisanstieg, aber Wechselkurs und Kerosinpreise bleiben hoch — schwaches Signal für eine Juni-Senkung',
  'news.fxDominance':'💡 Kernsignale: Kein Rückgangssignal · Wechselkursdruck anhaltend · Sommernachfrage beginnt eingepreist zu werden',
  'news.decisionTitle':'📌 Aktuelle Entscheidungshilfe',
  'news.decisionLine1':'→ Mai: alle wichtigen Airlines haben gegenüber April höhere Zuschläge bestätigt',
  'news.decisionLine2':'→ Juni: Bitte offizielle Kanäle jeder Airline im Mai prüfen',
  'news.decisionShort':'👉 Kurzreise (1–2 Monate): Gesamtbetrag laut aktuellem Tarif prüfen, dann entscheiden',
  'news.decisionLong':'👉 Flexibler Zeitplan: Juni-Mitteilungen im Mai beobachten',
  /* Forecast CTA Box Juni */
  'news.forecastCta.title':'Detaillierte Prognose Treibstoffzuschlag Juni 2026',
  'news.forecastCta.desc':'Eine separate Seite fasst die Juni-Zuschlagsentwicklung basierend auf Brent, USD/KRW, Kerosin/MOPS und geopolitischem Risiko zusammen.',
  'news.forecastCta.btn':'Juni-Prognose ansehen →',
  /* Hinweis Juni-Basis */
  'news.basisTitle':'📅 Hinweis Juni-Zuschlag',
  'news.basisBody':'Die Juni-Mitteilungen werden von jeder Airline über ihre offiziellen Kanäle im Mai veröffentlicht.',
  'news.aiNotice':'KI-Zusammenfassung — Inhalte dieser Seite sind KI-aufbereitete Referenzinformationen auf Basis öffentlicher Daten. Nicht offiziell. Bitte immer offizielle Kanäle der Fluggesellschaft prüfen.',
  'news.filterAll':'Alle',
  'news.filterInstitution':'Institutionell',
  'news.filterMarket':'Markt',
  'news.disclaimer':'※ Treibstoffzuschläge gelten zum Buchungszeitpunkt. Bitte vor Preisänderungen prüfen.',
  'news.cat.airline':'Airline','news.cat.institution':'Institutionell','news.cat.market':'Markt','news.cat.general':'Allgemein',
  'news.impact.prefix':'→ Auswirkung auf Zuschlag: ',
  /* predict box */
  'news.predict.subtitle':'Datenbasierte Schätzung',
  'news.predict.footnote':'* Mai-Zuschlag durch offizielle Mitteilung bestätigt. Juni-Prognose nur als Marktdaten-Referenz.',
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
  'news.official.ke':'Korean Air — Alle Strecken gegenüber April angehoben',
  'news.official.oz':'Asiana Airlines — Alle Strecken gegenüber April angehoben',
  'news.official.lj':'Jin Air — Alle Strecken angehoben (z.B. USD 25→42, 76→140)',
  'news.official.7c':'Jeju Air — Alle Strecken angehoben (z.B. USD 29→52, 68→126)',
  'news.official.desc':'* Kurz- bis Langstrecke alle gestiegen; Langstrecke am stärksten',
  /* compare box */
  'news.compare.li1':'Korean Air: alle Strecken gestiegen (bis zu ×2)',
  'news.compare.li2':'Asiana: alle Strecken gestiegen',
  'news.compare.li3':'Jin Air: alle gestiegen, max. USD 76→140',
  'news.compare.li4':'Jeju Air: alle gestiegen, max. USD 68→126',
  'news.compare.li5':'Gemeinsam: Mai-Auslandszuschlag auf Allzeithoch',
  /* fixed news cards */
  'news.fixed.20260420.title':'Ölpreise fallen weiter — Senkung im Juni immer wahrscheinlicher',
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
  'news.fixed.src.marketUpdate':'Market Update',
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
  'index.quick.may.name':'Treibstoffzuschlag — Mai 2026',
  'index.quick.may.desc':'Mai-Tarife nach Airline',
  'index.quick.june.name':'Ausblick — Juni 2026',
  'index.quick.june.desc':'Öl- und Wechselkursprognose',
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

/* ─── 언어 관리 ─── */
window.getCurrentLang = function(){
  return localStorage.getItem('aero_lang') || 'ko';
};
window.setCurrentLang = function(lang){
  localStorage.setItem('aero_lang', lang);
  window.SHARED_STATE.lang = lang;
  document.documentElement.lang = lang;
};

/* ─── 번역 함수 ─── */
window.t = function(key){
  var lang = window.getCurrentLang();
  var dict = window.I18N[lang];
  if(dict && dict[key] !== undefined) return dict[key];
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

/* ─── DOM 일괄 applyLanguage ─── */
window.applyLanguage = function(){
  var lang = window.getCurrentLang();
  document.documentElement.lang = lang;
  /* data-i18n */
  document.querySelectorAll('[data-i18n]').forEach(function(el){
    el.textContent = window.t(el.getAttribute('data-i18n'));
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
  /* airport selects */
  var orig = document.getElementById('originSelect');
  var dest = document.getElementById('destSelect');
  if(orig) window.buildAirportOptions(orig, 'origin');
  if(dest) window.buildAirportOptions(dest, 'dest');
  /* document.title */
  var titleKey = document.querySelector('meta[data-i18n-page-title]');
  if(titleKey) document.title = window.t(titleKey.getAttribute('data-i18n-page-title'));
  /* meta description */
  var descEl = document.querySelector('meta[name="description"][data-i18n-page-desc]');
  if(descEl) descEl.setAttribute('content', window.t(descEl.getAttribute('data-i18n-page-desc')));
};

/* ─── initNav 래핑 ─── */
var _origInitNav = window.initNav;
window.initNav = function(opts){
  opts = opts || {};
  var origLang = opts.onLangChange;
  opts.onLangChange = function(val){
    window.setCurrentLang(val);
    window.applyLanguage();
    if(origLang) origLang(val);
  };
  /* 저장된 언어 복원 */
  var saved = window.getCurrentLang();
  window.SHARED_STATE.lang = saved;
  var navLang = document.getElementById('navLang');
  if(navLang && saved) navLang.value = saved;
  /* 원래 initNav 호출 */
  if(_origInitNav) _origInitNav(opts);
  /* 최초 적용 */
  window.applyLanguage();
};

})();
