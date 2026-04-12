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
