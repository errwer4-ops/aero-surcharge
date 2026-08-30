(function(){
  var AS_OF = '2026.08.28 09:00 KST';
  var ISO = '2026-08-28T09:00:00+09:00';
  var latest = {
    asOf: AS_OF,
    lastUpdated: ISO,
    currentAppliedMonth: '2026-08',
    currentMonthNotice: '2026-09',
    confirmedNoticeMonth: '2026-09',
    forecastTargetMonth: '2026-10',
    septemberInternationalStage: 21,
    septemberInternationalStageChange: 7,
    septemberCalculationPeriod: '2026-07-16~2026-08-15',
    septemberCalculationJetFuelUsdPerBbl: 149.29,
    septemberCalculationJetFuelCentsPerGallon: 355.46,
    singaporeJetFuelRecentUsdPerBbl: 154.98,
    singaporeJetFuelRecentDate: '2026-08-20',
    globalJetFuelWeeklyUsdPerBbl: 163.87,
    globalJetFuelWeeklyChangePct: 3.1,
    globalJetFuelIsSingaporeMops: false,
    usdKrw: 1386,
    usdKrwLabel: '약 1,386원',
    jpy100Krw: 867,
    brentUsdPerBbl: 93.45,
    brentChangePct: null,
    wtiUsdPerBbl: 86.14,
    wtiChangePct: null,
    hormuzCommodityVessels: 10,
    hormuzPreviousCommodityVessels: 8,
    hormuzRecent10DayAverageVessels: 15,
    hormuzCrudeExportsAugMillionBpd: 2.3,
    hormuzCrudeExportsJulMillionBpd: 4.49,
    hormuzPreWarThreeMonthAvgMillionBpd: 15.82,
    asiaCrudeImportsAugMillionBpd: 23.12,
    asiaCrudeImportsJulMillionBpd: 23.36,
    asiaCrudeImportsPreWarMillionBpd: 26.91,
    iranVesselBlacklistCount: 45,
    octoberForecastDirection: 'slight_upward_pressure_partly_eased_low_confidence',
    marketSummary: '10월 전망: 상승 압력 소폭 우세 · 일부 완화 · 신뢰도 낮음'
  };
  window.AERO_MARKET_NUMBERS_20260828 = Object.assign({}, window.AERO_MARKET_NUMBERS_LATEST || {}, latest);
  window.AERO_MARKET_NUMBERS_LATEST = window.AERO_MARKET_NUMBERS_20260828;
  window.AERO_MARKET_SNAPSHOTS = Object.assign({}, window.AERO_MARKET_SNAPSHOTS || {}, {'2026-08-28': window.AERO_MARKET_NUMBERS_20260828});
  window.RATES = Object.assign({}, window.RATES || {}, {USD:1/1386, JPY:8.67/1386});

  function lang(){
    var raw = (window.getCurrentLang ? window.getCurrentLang() : (localStorage.getItem('aero_lang') || document.documentElement.lang || 'ko')).toLowerCase().replace('_','-');
    if(raw === 'cn' || raw.indexOf('zh') === 0) return 'zh';
    if(raw === 'jp') return 'ja';
    return raw.split('-')[0] || 'ko';
  }
  function setText(key, value){
    document.querySelectorAll('[data-i18n="'+key+'"]').forEach(function(el){ el.textContent = value; });
  }
  function setHtml(key, value){
    document.querySelectorAll('[data-i18n-html="'+key+'"],[data-i18n="'+key+'"]').forEach(function(el){ el.innerHTML = value; });
  }
  function esc(value){
    return String(value == null ? '' : value).replace(/[&<>"']/g, function(ch){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];
    });
  }
  function block(value){ return esc(value).replace(/\n/g, '<br>'); }
  function updateHead(title, desc, url){
    if(title) document.title = title;
    var meta = document.querySelector('meta[name="description"]');
    if(meta && desc) meta.setAttribute('content', desc);
    var ogTitle = document.querySelector('meta[property="og:title"]');
    var ogDesc = document.querySelector('meta[property="og:description"]');
    var ogUrl = document.querySelector('meta[property="og:url"]');
    var modified = document.querySelector('meta[property="article:modified_time"]');
    if(ogTitle && title) ogTitle.setAttribute('content', title);
    if(ogDesc && desc) ogDesc.setAttribute('content', desc);
    if(ogUrl && url) ogUrl.setAttribute('content', url);
    if(modified) modified.setAttribute('content', ISO);
    document.querySelectorAll('script[type="application/ld+json"]').forEach(function(node){
      try {
        var json = JSON.parse(node.textContent || '{}');
        if(json['@type'] === 'FAQPage') json.dateModified = ISO;
        if(json['@type'] === 'WebPage' || json['@type'] === 'Article' || json['@type'] === 'NewsArticle'){
          if(title) json.headline = title;
          if(desc) json.description = desc;
          json.dateModified = ISO;
          if(url) json.url = url;
        }
        node.textContent = JSON.stringify(json);
      } catch(e) {}
    });
  }

  var forecast = {
    ko:{
      title:'2026년 10월 국제선 유류할증료 전망 | MOPS·환율·호르무즈 분석',
      desc:'2026년 8월 28일 기준 MOPS·Jet Fuel, 원달러 환율, 국제유가와 호르무즈 해협 상황을 분석해 10월 국제선 유류할증료 인상·인하 가능성을 추적합니다.',
      page:'2026년 10월 국제선 유류할증료 전망',
      sub:'2026.08.28 09:00 KST 기준 · 9월 21단계 확정 · 10월 산정기간 2026.08.16~09.15 · 환율 ↓↓ / Jet Fuel 완화 ↘ / 국제유가 반등 ↗ / 호르무즈 위험 지속',
      notice:'<strong>확인:</strong> 9월 국제선 유류할증료는 21단계로 대폭 인상이 확정됐습니다. 10월은 산정기간 진행 중이므로 단계·노선별 금액·확률은 확정하지 않습니다.',
      intro:'2026년 8월 28일 09:00 KST 기준 10월 국제선 유류할증료는 보합 가능성이 가장 높고 인하 가능성도 열려 있습니다. 원/달러 환율은 약 1,381원으로 원화 부과액의 강한 하락 요인이고, 최근 Singapore kerosene 시장의 스프레드와 크랙이 낮아지며 항공유 추가 상승 압력도 일부 완화됐습니다. 그러나 Brent 원유가 8월 27일 미국시장 종가 기준 89.70달러/bbl로 반등했고, 공개 추적 기준 호르무즈 원유 흐름은 전쟁 이전보다 여전히 크게 낮습니다. 따라서 현재 결론은 보합 중심 · 인하 가능성 유지 · 신뢰도 낮음입니다.',
      section:'2026년 10월 예측 핵심 지표',
      th:['항목','현재 확인 상태','10월 전망에서의 의미'],
      rows:[
        ['10월 종합','보합 중심 · 인하 가능성 유지 · 신뢰도 낮음','전날보다 인하 기대는 소폭 후퇴했지만 상승 우세로 바꾸지는 않습니다.'],
        ['9월 기준선','21단계 확정 · 355.46 cents/gal · 149.29달러/bbl','9월 확정 산정값이며 10월 평균 MOPS가 아닙니다.'],
        ['10월 산정기간','2026.08.16~2026.09.15 진행 중','Singapore MOPS 평균과 평균환율은 아직 집계 중입니다.'],
        ['USD/KRW','약 1,381원 · 100엔 약 867원','환율 하락은 원화 환산액의 강한 하락 요인입니다. 단계 자체를 직접 결정하지 않습니다.'],
        ['MOPS / Jet Fuel','9월 평균 149.29 · 최근 Singapore Jet Fuel 154.98 · 글로벌 Jet Fuel 163.87','163.87은 Singapore MOPS가 아니며 10월 평균도 아닙니다. 높은 수준이나 완화 신호가 생겼습니다.'],
        ['Singapore kerosene','Sep/Oct spread·September crack 하락 · regrade 정상 수준 접근','항공유 시장 긴장도가 일부 완화되는 하락 신호입니다. 정상화로 표현하지 않습니다.'],
        ['국제유가','Brent 89.70(+2.1%) · WTI 83.53(+1.6%)','최근 급락 뒤 반등해 유가 방향성이 불안정합니다.'],
        ['호르무즈 공개 통항','Kpler 공개 추적 commodity vessel 10척 · 10일 평균 약 15척','소폭 개선이지만 전체 선박 수나 정상화로 해석하지 않습니다.'],
        ['호르무즈 원유 흐름','8월 약 2.3m bpd · 7월 4.49m · 전쟁 직전 15.82m','선박 수와 실제 원유 흐름을 분리합니다. 원유 흐름은 여전히 극도로 낮습니다.'],
        ['외교와 운송위험','조건부 재개방 논의 · 미·이란 직접협상 교착 · 선박 45척 블랙리스트 · 신규 유조선 피격','완화 신호와 운송·보험 상승위험이 동시에 존재합니다. 공격 주체는 미확인입니다.']
      ],
      foot:'* 149.29달러는 9월 산정 평균, 154.98달러는 2026.08.20 Singapore Jet Fuel 참고값, 163.87달러는 IATA/Platts 글로벌 주간 Jet Fuel 참고값입니다. 모두 10월 확정 Singapore MOPS 평균이 아닙니다.',
      summaryTitle:'10월 유류할증료 전망 요약',
      updated:'최종 업데이트: 2026.08.28 09:00 KST · 보합 중심 · 인하 가능성 유지 · 신뢰도 낮음',
      summary:[
        '2026년 9월 국제선 유류할증료는 21단계로 대폭 인상이 확정됐습니다.',
        '현재는 2026.08.16~09.15의 10월 유류할증료 산정기간이 진행 중입니다.',
        'USD/KRW 약 1,381원은 원화 부과액의 강한 하락 요인입니다.',
        'Singapore kerosene spread와 crack 하락은 항공유 시장 완화 신호입니다.',
        '글로벌 Jet Fuel 163.87달러/bbl은 Singapore MOPS가 아니지만 절대 수준은 높습니다.',
        'Brent 89.70달러와 WTI 83.53달러는 최근 급락 후 반등했습니다.',
        'Kpler 공개 추적 commodity vessel 통항은 10척으로 소폭 개선됐습니다.',
        '호르무즈 경유 원유 수출은 8월 약 2.3m bpd로 전쟁 직전 평균보다 매우 낮습니다.',
        '이란은 조건부 재개방 협상 가능성을 보였지만 미국·이란 직접 협상은 진행되지 않습니다.',
        '선박 45척 블랙리스트와 정체불명 발사체 피격은 운송·보험 위험을 유지합니다.'
      ],
      verdictTitle:'2026년 10월 전망 결론',
      verdict1:'10월 단계와 노선별 금액은 아직 확정되지 않았습니다.',
      verdict2:'환율과 Singapore kerosene 완화는 인하 가능성을 유지시키지만, 국제유가 반등과 호르무즈 원유 흐름 부진, 운송위험 때문에 인하 확정으로 볼 수 없습니다.',
      verdictShort:'10월 전망: 보합 중심 · 인하 가능성 유지 · 신뢰도 낮음',
      verdictLong:'환율 ↓↓ / Jet Fuel 완화 ↘ / 국제유가 반등 ↗ / 호르무즈 위험 지속',
      market:['시장 브리핑','환율: 2026.08.28 09:00 KST 전후 USD/KRW는 약 1,381원, 100엔은 약 867원입니다. 환율 하락은 원화 환산액 하락 요인입니다.','MOPS / Jet Fuel: 9월 산정 평균은 149.29달러/bbl입니다. 최근 Singapore Jet Fuel 154.98달러/bbl과 글로벌 주간 Jet Fuel 163.87달러/bbl은 성격이 다른 참고값입니다.','국제유가: Brent는 8월 27일 미국시장 종가 기준 89.70달러/bbl(+2.1%), WTI는 83.53달러/bbl(+1.6%)입니다. 급락 후 반등입니다.','호르무즈: Kpler 공개 추적 commodity vessel 통항은 10척으로 일부 회복됐지만, 8월 원유 수출 2.3m bpd는 전쟁 직전 평균 15.82m bpd보다 낮습니다.','현재 판단: 보합 중심 · 인하 가능성 유지 · 신뢰도 낮음. 19~21단계 같은 특정 단계는 예측하지 않습니다.','핵심 수치: 2026.08.28 09:00 KST · USD/KRW 1,381 · 9월 기준선 149.29 · Singapore Jet Fuel 154.98 · 글로벌 Jet Fuel 163.87 · Brent 89.70 · WTI 83.53 · 호르무즈 10척 · 원유 2.3m bpd'],
      predict:[['10월 전망','보합 중심 · 인하 가능성 유지','neutral'],['환율','USD/KRW 약 1,381 · 원화 금액 ↓↓','down'],['MOPS / Jet Fuel','높은 수준 · 상승압력 일부 완화 ↘','down'],['국제유가','Brent 89.70 · WTI 83.53 · 반등 ↗','up'],['호르무즈 통항','Kpler 공개 추적 10척 · 일부 개선 ↓','down'],['호르무즈 원유 흐름','8월 약 2.3m bpd · 극도로 낮음 ↑↑↑','up'],['외교','조건부 재개방 논의 · 중재 개선 ↓','down'],['운송·보험','블랙리스트 45척 · 유조선 피격 · 위험 ↑↑','up']],
      keyTitle:'핵심 확인 변수',
      keyVars:['9월 21단계 확정','10월 산정기간 2026.08.16~09.15','USD/KRW 약 1,381','100엔 약 867원','Singapore kerosene 완화 신호','9월 기준선 149.29달러/bbl','Singapore Jet Fuel 최근 154.98달러/bbl','글로벌 Jet Fuel 163.87달러/bbl','Brent 89.70','WTI 83.53','Kpler 공개 commodity vessel 10척','호르무즈 원유 8월 약 2.3m bpd','조건부 재개방 논의','미·이란 직접협상 교착','선박 45척 블랙리스트','정체불명 발사체 피격'],
      basisTitle:'9월 확정 기준선 · 10월 예측 추적',
      basisBody:'9월 공식 공시는 확정 기준선입니다. 10월은 평균 Singapore MOPS와 평균 USD/KRW가 집계 중이므로 방향성만 표시하고 특정 단계나 금액을 확정하지 않습니다.',
      ai:'참고 콘텐츠 — 이 페이지는 9월 확정 사실, 10월 시장 관측, 기관·정부 주장, 사이트 전망을 분리합니다.'
    }
  };
  forecast.en = {
    title:'October 2026 International Fuel Surcharge Outlook | MOPS, FX and Hormuz',
    desc:'As of August 28, 2026, track October international fuel surcharge upside and downside factors using MOPS/Jet Fuel, USD/KRW, crude oil and Hormuz conditions.',
    page:'October 2026 International Fuel Surcharge Outlook',
    sub:'As of 2026.08.28 09:00 KST · September Level 21 confirmed · October window 2026.08.16-09.15 · FX ↓↓ / Jet Fuel easing ↘ / crude rebound ↗ / Hormuz risk persists',
    notice:'<strong>Confirmed:</strong> September international surcharges are fixed at Level 21. October is still in the calculation period, so stage, route amounts and probabilities are not confirmed.',
    intro:'As of 2026.08.28 09:00 KST, the October 2026 international fuel surcharge outlook remains flat-centered with a possible reduction still open. USD/KRW near 1,381 is a strong downside factor for KRW amounts, and Singapore kerosene spreads and cracks are starting to ease. However, Brent rebounded to USD 89.70/bbl at the Aug 27 U.S. close, and publicly tracked Hormuz crude flows remain far below pre-war levels. The current conclusion is flat-centered, reduction chance maintained, low confidence.',
    section:'October 2026 Forecast Inputs',
    th:['Item','Current status','Meaning for October'],
    rows:[['October view','Flat-centered · reduction chance maintained · low confidence','Reduction hopes are slightly weaker than yesterday, but the view is not upside-dominant.'],['September baseline','Level 21 confirmed · 355.46 cents/gal · USD 149.29/bbl','Confirmed September calculation value, not the October MOPS average.'],['October window','2026.08.16-2026.09.15 in progress','Average Singapore MOPS and average FX are still collecting.'],['USD/KRW','Around 1,381 · JPY100 around KRW 867','FX is a strong downside factor for KRW amounts, not a direct stage setter.'],['MOPS / Jet Fuel','Sep average 149.29 · recent Singapore Jet Fuel 154.98 · global Jet Fuel 163.87','163.87 is not Singapore MOPS or October average. Jet Fuel is high, but easing signals appeared.'],['Singapore kerosene','Sep/Oct spread and September crack down · regrade closer to normal','A downside signal for jet-fuel market stress. Do not call it normalization.'],['Crude oil','Brent 89.70 (+2.1%) · WTI 83.53 (+1.6%)','Crude rebounded after a sharp fall, so direction is unstable.'],['Hormuz transit','Kpler public commodity-vessel tracking at 10 · 10-day average near 15','Slight improvement, not total traffic and not normalization.'],['Hormuz crude flow','August about 2.3m bpd · July 4.49m · pre-war 15.82m','Separate vessel count from actual oil flow; crude flow remains extremely low.'],['Diplomacy and shipping risk','Conditional reopening discussion · no direct U.S.-Iran talks · 45-vessel blacklist · tanker hit by unknown projectile','Relief signals and freight/insurance risk coexist. Attacker is unconfirmed.']],
    foot:'* USD 149.29 is the September calculation average, USD 154.98 is an Aug 20 Singapore Jet Fuel reference, and USD 163.87 is an IATA/Platts global weekly Jet Fuel reference. None is the confirmed October Singapore MOPS average.',
    summaryTitle:'October Fuel Surcharge Outlook Summary',
    updated:'Last updated: 2026.08.28 09:00 KST · flat-centered · reduction chance maintained · low confidence',
    summary:['September 2026 international surcharge is confirmed at Level 21.','October calculation period is 2026.08.16-09.15.','USD/KRW around 1,381 is a strong downside factor for KRW amounts.','Singapore kerosene spread and crack easing is a jet-fuel relief signal.','Global Jet Fuel USD 163.87/bbl is not Singapore MOPS, but the absolute level remains high.','Brent USD 89.70 and WTI USD 83.53 rebounded after a sharp fall.','Kpler public commodity-vessel tracking improved to 10.','Hormuz crude exports around 2.3m bpd in August remain far below the pre-war average.','Iran signaled conditional reopening talks, while direct U.S.-Iran talks are stalled.','The 45-vessel blacklist and tanker hit keep shipping and insurance risk elevated.'],
    verdictTitle:'October 2026 Forecast Conclusion',
    verdict1:'October stage and route amounts are not confirmed.',
    verdict2:'FX and Singapore kerosene easing keep reduction risk open, but crude rebound, weak Hormuz oil flows and shipping risk prevent a confirmed-cut view.',
    verdictShort:'October outlook: flat-centered · reduction chance maintained · low confidence',
    verdictLong:'FX ↓↓ / Jet Fuel easing ↘ / crude rebound ↗ / Hormuz risk persists',
    market:['Market brief','FX: around 2026.08.28 09:00 KST, USD/KRW is near 1,381 and JPY100 near KRW 867. Lower FX reduces KRW-converted surcharge pressure.','MOPS / Jet Fuel: September calculation average is USD 149.29/bbl. Recent Singapore Jet Fuel USD 154.98/bbl and global weekly Jet Fuel USD 163.87/bbl are separate references.','Crude: Brent was USD 89.70/bbl (+2.1%) and WTI USD 83.53/bbl (+1.6%) at the Aug 27 U.S. close, a rebound after the prior fall.','Hormuz: Kpler public commodity-vessel traffic improved to 10, but August crude exports around 2.3m bpd remain far below the pre-war 15.82m bpd average.','Current view: flat-centered, reduction chance maintained, low confidence. Do not project a specific October stage such as 19-21.','Key figures: 2026.08.28 09:00 KST · USD/KRW 1,381 · Sep baseline 149.29 · Singapore Jet Fuel 154.98 · global Jet Fuel 163.87 · Brent 89.70 · WTI 83.53 · Hormuz 10 · crude 2.3m bpd'],
    predict:[['October outlook','Flat-centered · reduction chance maintained','neutral'],['FX','USD/KRW around 1,381 · KRW amounts ↓↓','down'],['MOPS / Jet Fuel','High level · upside pressure easing ↘','down'],['Crude oil','Brent 89.70 · WTI 83.53 · rebound ↗','up'],['Hormuz transit','Kpler public tracking 10 · slight improvement ↓','down'],['Hormuz crude flow','August about 2.3m bpd · extremely low ↑↑↑','up'],['Diplomacy','Conditional reopening talks · mediation improves ↓','down'],['Shipping risk','45-vessel blacklist · tanker hit · risk ↑↑','up']],
    keyTitle:'Key Check Variables',
    keyVars:['September Level 21 confirmed','October window 2026.08.16-09.15','USD/KRW around 1,381','JPY100 around KRW 867','Singapore kerosene easing signal','September baseline USD 149.29/bbl','Recent Singapore Jet Fuel USD 154.98/bbl','Global Jet Fuel USD 163.87/bbl','Brent 89.70','WTI 83.53','Kpler public commodity vessels 10','Hormuz crude exports about 2.3m bpd','Conditional reopening talks','No direct U.S.-Iran talks','45-vessel blacklist','Unknown-projectile tanker hit'],
    basisTitle:'September confirmed baseline · October forecast tracking',
    basisBody:'September official notices remain the confirmed baseline. October only shows direction while average Singapore MOPS and average USD/KRW are still being collected.',
    ai:'Reference content — This page separates September confirmed facts, October market observations, institutional claims and site forecasts.'
  };
  forecast.ja = Object.assign({}, forecast.en, {title:'2026年10月国際線燃油サーチャージ見通し | MOPS・為替・ホルムズ',desc:'2026年8月28日時点で、MOPS/Jet Fuel、USD/KRW、原油、ホルムズ状況から10月国際線燃油サーチャージの上下要因を追跡します。',page:'2026年10月国際線燃油サーチャージ見通し',sub:'2026.08.28 09:00 KST時点 · 9月21段階確定 · 10月算定期間2026.08.16~09.15 · 為替↓↓ / Jet Fuel緩和↘ / 原油反発↗ / ホルムズリスク継続',notice:'<strong>確認:</strong> 9月国際線燃油サーチャージは21段階で確定しました。10月は算定期間中のため、段階・路線別金額・確率は確定しません。',intro:'2026年8月28日09:00 KST時点で、10月国際線燃油サーチャージは横ばい中心で、引き下げ可能性も残っています。USD/KRW約1,381はウォン建て金額の下押し要因で、Singapore keroseneのスプレッドとクラックも緩和し始めました。一方、Brentは8月27日米国終値で89.70ドル/bblへ反発し、ホルムズ経由の公開追跡原油フローは戦前を大きく下回ります。結論は横ばい中心・引き下げ可能性維持・信頼度低いです。',section:'2026年10月予測の主要指標',th:['項目','現在の確認状況','10月見通しでの意味'],rows:[['10月総合','横ばい中心 · 引き下げ可能性維持 · 信頼度低い','前日より引き下げ期待はやや後退しましたが、上昇優勢には変更しません。'],['9月基準線','21段階確定 · 355.46 cents/gal · 149.29ドル/bbl','9月確定値であり10月平均MOPSではありません。'],['10月算定期間','2026.08.16~2026.09.15進行中','Singapore MOPS平均と平均為替は集計中です。'],['USD/KRW','約1,381 · 100円約867ウォン','為替下落はウォン換算額の下押し要因です。段階を直接決めません。'],['MOPS / Jet Fuel','9月平均149.29 · 最近Singapore Jet Fuel 154.98 · 世界Jet Fuel 163.87','163.87はSingapore MOPSでも10月平均でもありません。高水準ですが緩和信号があります。'],['Singapore kerosene','Sep/Oct spread・September crack低下 · regrade正常水準に接近','航空燃料市場ストレスの緩和信号です。正常化とは表現しません。'],['原油','Brent 89.70(+2.1%) · WTI 83.53(+1.6%)','急落後に反発し、方向性は不安定です。'],['ホルムズ公開通航','Kpler公開追跡commodity vessel 10隻 · 10日平均約15隻','小幅改善ですが全船舶数や正常化ではありません。'],['ホルムズ原油フロー','8月約2.3m bpd · 7月4.49m · 戦前15.82m','船舶数と実際の原油フローを分けます。原油フローは極めて低いです。'],['外交と輸送リスク','条件付き再開協議 · 米イラン直接協議は停滞 · 45隻ブラックリスト · タンカー被弾','緩和信号と輸送・保険リスクが併存します。攻撃主体は未確認です。']],summaryTitle:'10月燃油サーチャージ見通し要約',updated:'最終更新: 2026.08.28 09:00 KST · 横ばい中心 · 引き下げ可能性維持 · 信頼度低い',verdictTitle:'2026年10月見通し結論',verdictShort:'10月見通し: 横ばい中心 · 引き下げ可能性維持 · 信頼度低い',verdictLong:'為替↓↓ / Jet Fuel緩和↘ / 原油反発↗ / ホルムズリスク継続',keyTitle:'主要確認項目',basisTitle:'9月確定基準線 · 10月予測追跡',basisBody:'9月公式公示は確定基準線です。10月は平均Singapore MOPSと平均USD/KRWが集計中のため方向性のみ表示します。',ai:'参考コンテンツ — このページは9月確定事実、10月市場観測、機関・政府主張、サイト予測を分離します。'});
  forecast.zh = Object.assign({}, forecast.ja, {title:'2026年10月国际线燃油附加费展望 | MOPS·汇率·霍尔木兹',desc:'截至2026年8月28日，基于MOPS/Jet Fuel、USD/KRW、国际油价和霍尔木兹情况跟踪10月国际线燃油附加费上下因素。',page:'2026年10月国际线燃油附加费展望',sub:'截至2026.08.28 09:00 KST · 9月第21档确认 · 10月计算期2026.08.16~09.15 · 汇率↓↓ / Jet Fuel缓和↘ / 油价反弹↗ / 霍尔木兹风险持续',notice:'<strong>确认:</strong> 9月国际线燃油附加费已确认为第21档。10月仍在计算期，因此不确认档位、航线金额或概率。',intro:'截至2026年8月28日09:00 KST，10月国际线燃油附加费仍以持平为主，下调可能性仍在。USD/KRW约1,381是韩元金额的下行因素，Singapore kerosene价差和裂解价差也开始缓和。但Brent在8月27日美国收盘反弹至89.70美元/bbl，霍尔木兹公开追踪原油流量仍远低于战前。结论是持平为主、下调可能性维持、可信度低。',section:'2026年10月预测核心指标',th:['项目','当前确认状态','对10月展望的意义'],rows:[['10月综合','持平为主 · 下调可能性维持 · 可信度低','较前日下调期待略有后退，但不改为上行占优。'],['9月基准','第21档确认 · 355.46 cents/gal · 149.29美元/bbl','这是9月确认计算值，不是10月平均MOPS。'],['10月计算期','2026.08.16~2026.09.15进行中','Singapore MOPS均值和平均汇率仍在统计。'],['USD/KRW','约1,381 · 100日元约867韩元','汇率下行是韩元换算金额的下行因素，不直接决定档位。'],['MOPS / Jet Fuel','9月均值149.29 · 近期Singapore Jet Fuel 154.98 · 全球Jet Fuel 163.87','163.87不是Singapore MOPS，也不是10月平均。水平仍高但出现缓和信号。'],['Singapore kerosene','Sep/Oct spread和September crack下降 · regrade接近正常','这是航油市场紧张度缓和信号，不写成正常化。'],['国际油价','Brent 89.70(+2.1%) · WTI 83.53(+1.6%)','急跌后反弹，方向不稳定。'],['霍尔木兹公开通行','Kpler公开追踪commodity vessel 10艘 · 10日均值约15艘','小幅改善，但不是全部船舶数或正常化。'],['霍尔木兹原油流量','8月约2.3m bpd · 7月4.49m · 战前15.82m','区分船舶数量和实际原油流量；原油流量仍极低。'],['外交与运输风险','条件式重开讨论 · 美伊直接谈判停滞 · 45艘黑名单 · 油轮遭击','缓和信号与运输保险风险并存。攻击方未确认。']],summaryTitle:'10月燃油附加费展望摘要',updated:'最后更新：2026.08.28 09:00 KST · 持平为主 · 下调可能性维持 · 可信度低',verdictTitle:'2026年10月展望结论',verdictShort:'10月展望：持平为主 · 下调可能性维持 · 可信度低',verdictLong:'汇率↓↓ / Jet Fuel缓和↘ / 油价反弹↗ / 霍尔木兹风险持续',keyTitle:'核心确认项目',basisTitle:'9月确认基准 · 10月预测追踪',basisBody:'9月官方公告是确认基准。10月仍在累计平均Singapore MOPS和平均USD/KRW，因此只显示方向性。',ai:'参考内容 — 本页区分9月确认事实、10月市场观察、机构/政府表态和网站预测。'});
  forecast.fr = Object.assign({}, forecast.en, {title:'Perspective octobre 2026 | MOPS, FX et Hormuz',desc:'Au 28 août 2026, suivi des facteurs de hausse et baisse de la surtaxe internationale d’octobre avec MOPS/Jet Fuel, USD/KRW, pétrole et Hormuz.',page:'Perspective surtaxe carburant internationale octobre 2026',sub:'Au 2026.08.28 09:00 KST · septembre niveau 21 confirmé · fenêtre octobre 2026.08.16-09.15 · FX ↓↓ / Jet Fuel s’apaise ↘ / pétrole rebondit ↗ / risque Hormuz persiste',notice:'<strong>Confirmé:</strong> septembre est fixé au niveau 21. Octobre est en période de calcul; aucun niveau, montant par route ou probabilité n’est confirmé.',intro:'Au 2026.08.28 09:00 KST, la perspective d’octobre reste centrée sur la stabilité avec une possibilité de baisse encore ouverte. USD/KRW près de 1 381 réduit les montants en KRW, et les spreads/cracks Singapore kerosene commencent à s’apaiser. Mais Brent a rebondi à 89.70 USD/bbl à la clôture US du 27 août et les flux de brut via Hormuz restent très inférieurs à l’avant-guerre. Conclusion: stable centré, possibilité de baisse maintenue, faible confiance.',section:'Indicateurs clés pour octobre 2026',th:['Élément','État actuel','Sens pour octobre'],rows:[['Vue octobre','Stable centré · possibilité de baisse maintenue · faible confiance','L’espoir de baisse recule légèrement vs hier, mais la hausse ne domine pas.'],['Base septembre','Niveau 21 confirmé · 355.46 cents/gal · 149.29 USD/bbl','Valeur confirmée de septembre, pas la moyenne MOPS d’octobre.'],['Fenêtre octobre','2026.08.16-2026.09.15 en cours','Singapore MOPS moyen et FX moyen sont encore en collecte.'],['USD/KRW','Env. 1 381 · 100 JPY env. 867 KRW','Le FX est baissier pour les montants KRW, sans fixer directement le niveau.'],['MOPS / Jet Fuel','Moyenne sept. 149.29 · Singapore Jet Fuel récent 154.98 · Jet Fuel mondial 163.87','163.87 n’est ni Singapore MOPS ni la moyenne d’octobre. Niveau élevé, mais signaux d’apaisement.'],['Singapore kerosene','Sep/Oct spread et September crack en baisse · regrade proche de normal','Signal d’apaisement du stress carburéacteur, pas une normalisation.'],['Pétrole','Brent 89.70 (+2.1%) · WTI 83.53 (+1.6%)','Rebond après chute rapide; direction instable.'],['Transit Hormuz','Kpler public commodity vessels: 10 · moyenne 10 jours env. 15','Légère amélioration, pas trafic total ni normalisation.'],['Flux brut Hormuz','Août env. 2.3m bpd · juillet 4.49m · avant-guerre 15.82m','Séparer nombre de navires et flux réel; le flux brut reste très faible.'],['Diplomatie et transport','Discussion de réouverture conditionnelle · pas de pourparlers directs US-Iran · 45 navires listés · tanker touché','Signaux d’apaisement et risques fret/assurance coexistent. Auteur non confirmé.']],summaryTitle:'Résumé perspective surtaxe octobre',updated:'Dernière mise à jour: 2026.08.28 09:00 KST · stable centré · possibilité de baisse maintenue · faible confiance',verdictTitle:'Conclusion perspective octobre 2026',verdictShort:'Octobre: stable centré · possibilité de baisse maintenue · faible confiance',verdictLong:'FX ↓↓ / Jet Fuel s’apaise ↘ / pétrole rebondit ↗ / risque Hormuz persiste',keyTitle:'Points clés',basisTitle:'Base confirmée de septembre · suivi prévisionnel octobre',basisBody:'Les avis officiels de septembre restent la base confirmée. Octobre affiche seulement une direction pendant la collecte du Singapore MOPS moyen et de l’USD/KRW moyen.',ai:'Contenu de référence — cette page sépare faits confirmés de septembre, observations de marché d’octobre, déclarations institutionnelles et prévision du site.'});
  forecast.de = Object.assign({}, forecast.en, {title:'Oktober-2026 Ausblick | MOPS, FX und Hormuz',desc:'Stand 28. August 2026: Oktober-Zuschlag mit MOPS/Jet Fuel, USD/KRW, Öl und Hormuz-Risiken verfolgen.',page:'Oktober-2026 internationaler Treibstoffzuschlag Ausblick',sub:'Stand 2026.08.28 09:00 KST · September Stufe 21 bestätigt · Oktober-Fenster 2026.08.16-09.15 · FX ↓↓ / Jet Fuel entspannt ↘ / Öl erholt ↗ / Hormuz-Risiko bleibt',notice:'<strong>Bestätigt:</strong> September ist auf Stufe 21 festgelegt. Oktober läuft im Berechnungszeitraum; Stufe, Routenbeträge und Wahrscheinlichkeiten sind nicht bestätigt.',intro:'Stand 2026.08.28 09:00 KST bleibt der Oktober-Ausblick stabil zentriert, mit weiter offener Senkungschance. USD/KRW nahe 1.381 senkt KRW-Beträge, und Singapore-kerosene-Spreads sowie Cracks zeigen erste Entspannung. Brent erholte sich jedoch zum US-Schluss am 27. August auf 89.70 USD/bbl, und öffentlich verfolgte Hormuz-Rohölflüsse bleiben weit unter Vorkriegsniveau. Fazit: stabil zentriert, Senkungschance bleibt, geringe Sicherheit.',section:'Kernindikatoren für Oktober 2026',th:['Punkt','Aktueller Stand','Bedeutung für Oktober'],rows:[['Oktober-Sicht','Stabil zentriert · Senkungschance bleibt · geringe Sicherheit','Senkungshoffnung ist etwas schwächer als gestern, aber nicht aufwärtsdominant.'],['September-Basis','Stufe 21 bestätigt · 355.46 cents/gal · 149.29 USD/bbl','Bestätigter September-Wert, nicht der Oktober-MOPS-Durchschnitt.'],['Oktober-Fenster','2026.08.16-2026.09.15 läuft','Durchschnittlicher Singapore MOPS und FX werden noch gesammelt.'],['USD/KRW','Ca. 1.381 · 100 JPY ca. 867 KRW','FX senkt KRW-Beträge, setzt aber nicht direkt die Stufe.'],['MOPS / Jet Fuel','September-Mittel 149.29 · Singapore Jet Fuel zuletzt 154.98 · globales Jet Fuel 163.87','163.87 ist weder Singapore MOPS noch Oktober-Mittel. Niveau hoch, aber Entspannungssignale.'],['Singapore kerosene','Sep/Oct spread und September crack fallen · regrade näher an normal','Signal für weniger Jetfuel-Stress, keine Normalisierung.'],['Öl','Brent 89.70 (+2.1%) · WTI 83.53 (+1.6%)','Erholung nach schnellem Rückgang; Richtung instabil.'],['Hormuz-Verkehr','Kpler public commodity vessels: 10 · 10-Tage-Schnitt ca. 15','Leichte Verbesserung, nicht Gesamtverkehr und nicht Normalisierung.'],['Hormuz-Rohölfluss','August ca. 2.3m bpd · Juli 4.49m · Vorkrieg 15.82m','Schiffszahl und Ölfluss trennen; Ölfluss bleibt extrem niedrig.'],['Diplomatie und Transport','Bedingte Wiederöffnung im Gespräch · keine direkten US-Iran-Gespräche · 45-Schiffe-Liste · Tanker getroffen','Entspannungssignale und Fracht-/Versicherungsrisiken bestehen gleichzeitig. Angreifer unbestätigt.']],summaryTitle:'Oktober-Zuschlag Ausblick Zusammenfassung',updated:'Zuletzt aktualisiert: 2026.08.28 09:00 KST · stabil zentriert · Senkungschance bleibt · geringe Sicherheit',verdictTitle:'Oktober-2026 Fazit',verdictShort:'Oktober-Ausblick: stabil zentriert · Senkungschance bleibt · geringe Sicherheit',verdictLong:'FX ↓↓ / Jet Fuel entspannt ↘ / Öl erholt ↗ / Hormuz-Risiko bleibt',keyTitle:'Wichtige Prüfpunkte',basisTitle:'Bestätigte September-Basis · Oktober-Prognose',basisBody:'Offizielle September-Hinweise bleiben die bestätigte Basis. Oktober zeigt nur die Richtung, während durchschnittlicher Singapore MOPS und USD/KRW gesammelt werden.',ai:'Referenzinhalt — diese Seite trennt bestätigte September-Fakten, Oktober-Marktbeobachtungen, institutionelle Aussagen und Website-Prognose.'});
  forecast.cn = forecast.zh;

  function fillDerivedForecast(l, label){
    var p = forecast[l];
    if(!p) return;
    p.foot = label.foot;
    p.summary = p.rows.map(function(row){ return row[0] + ': ' + row[1] + ' - ' + row[2]; }).slice(0, 10);
    p.verdict1 = label.verdict1;
    p.verdict2 = label.verdict2;
    p.market = [
      label.market,
      p.rows[3][0] + ': ' + p.rows[3][1] + ' - ' + p.rows[3][2],
      p.rows[4][0] + ': ' + p.rows[4][1] + ' - ' + p.rows[4][2],
      p.rows[6][0] + ': ' + p.rows[6][1] + ' - ' + p.rows[6][2],
      p.rows[7][0] + ' / ' + p.rows[8][0] + ': ' + p.rows[7][1] + ' · ' + p.rows[8][1],
      p.verdictShort,
      label.figures + ': USD/KRW 1,381 · 149.29 · 154.98 · 163.87 · Brent 89.70 · WTI 83.53 · Hormuz 10 · 2.3m bpd'
    ];
    p.predict = [
      [p.rows[0][0], p.rows[0][1], 'neutral'],
      [p.rows[3][0], p.rows[3][1], 'down'],
      [p.rows[4][0], p.rows[4][1], 'down'],
      [p.rows[6][0], p.rows[6][1], 'up'],
      [p.rows[7][0], p.rows[7][1], 'down'],
      [p.rows[8][0], p.rows[8][1], 'up'],
      [p.rows[9][0], p.rows[9][1], 'neutral']
    ];
    p.keyVars = p.rows.map(function(row){ return row[0] + ': ' + row[1]; });
  }
  fillDerivedForecast('ja', {market:'市場ブリーフィング', figures:'主要数値', verdict1:'10月の段階と路線別金額はまだ確定していません。', verdict2:'為替とSingapore keroseneの緩和は引き下げ余地を残しますが、原油反発とホルムズ原油フローの低迷、輸送リスクにより引き下げ確定とはできません。', foot:'* 149.29ドルは9月算定平均、154.98ドルは2026.08.20のSingapore Jet Fuel参考値、163.87ドルはIATA/Plattsのグローバル週次Jet Fuel参考値です。いずれも10月確定Singapore MOPS平均ではありません。'});
  fillDerivedForecast('zh', {market:'市场简报', figures:'核心数值', verdict1:'10月档位和航线金额尚未确认。', verdict2:'汇率和Singapore kerosene缓和使下调可能性仍在，但油价反弹、霍尔木兹原油流量低迷和运输风险使其不能写成下调确认。', foot:'* 149.29美元是9月计算均值，154.98美元是2026.08.20 Singapore Jet Fuel参考值，163.87美元是IATA/Platts全球周度Jet Fuel参考值。均不是10月确认Singapore MOPS均值。'});
  fillDerivedForecast('fr', {market:'Brief marché', figures:'Chiffres clés', verdict1:'Le niveau et les montants par route d’octobre ne sont pas confirmés.', verdict2:'Le FX et l’apaisement Singapore kerosene gardent une baisse possible, mais le rebond du pétrole, les faibles flux de brut via Hormuz et le risque transport empêchent de conclure à une baisse confirmée.', foot:'* 149.29 USD est la moyenne de calcul de septembre, 154.98 USD est une référence Singapore Jet Fuel du 2026.08.20, et 163.87 USD est une référence hebdomadaire mondiale IATA/Platts Jet Fuel. Aucun n’est la moyenne Singapore MOPS confirmée d’octobre.'});
  fillDerivedForecast('de', {market:'Marktbriefing', figures:'Kernzahlen', verdict1:'Oktober-Stufe und Routenbeträge sind noch nicht bestätigt.', verdict2:'FX und Singapore-kerosene-Entspannung halten eine Senkung möglich, aber Ölerholung, schwache Hormuz-Rohölflüsse und Transportrisiken verhindern eine bestätigte Senkungssicht.', foot:'* 149.29 USD ist der September-Berechnungsdurchschnitt, 154.98 USD eine Singapore-Jet-Fuel-Referenz vom 2026.08.20 und 163.87 USD eine globale wöchentliche IATA/Platts-Jet-Fuel-Referenz. Keiner dieser Werte ist der bestätigte Oktober-Singapore-MOPS-Durchschnitt.'});
  forecast.cn = forecast.zh;

  function applyCoreForecastShape(){
    var packs = {
      ko:{
        title:'2026년 10월 국제선 유류할증료 전망 | 환율·MOPS·국제유가',
        desc:'2026년 10월 국제선 유류할증료 전망을 기존 핵심 지표인 원달러 환율, MOPS/항공유, 국제유가 기준으로 정리합니다.',
        page:'2026년 10월 국제선 유류할증료 전망',
        sub:'2026.08.28 09:00 KST 기준 · 9월 21단계 확정 · 10월 산정기간 2026.08.16~09.15 · 환율·MOPS/항공유·국제유가 중심',
        intro:'10월 전망은 기존 지표 흐름에 맞춰 환율, MOPS/항공유, 국제유가만 사용합니다. USD/KRW 약 1,386원은 원화 환산액 하락 요인이고, Singapore Jet Fuel 최근값 약 154.98달러/bbl은 항공유 부담을 유지합니다. Brent 약 93.45달러와 WTI 약 86.14달러는 단기 조정에도 여전히 높은 구간입니다.',
        section:'2026년 10월 유류할증료 전망 핵심 지표',
        rows:[['10월 방향성','상승 압력 소폭 우세 · 일부 완화 · 신뢰도 낮음','방향성만 표시하며 단계·금액은 확정하지 않습니다.'],['USD/KRW','약 1,386원','원화 환산액 하락 요인입니다.'],['MOPS/항공유','Singapore Jet Fuel 최근 154.98달러/bbl','항공유 부담은 남아 있지만 10월 평균은 아직 확정하지 않습니다.'],['국제유가','Brent 약 93.45달러 · WTI 약 86.14달러','높은 수준이나 단기 조정입니다.']],
        foot:'* 항공사 공식 공시 전까지 10월 단계금액은 표시하지 않습니다.',
        verdictTitle:'2026년 10월 전망 결론', verdict1:'10월 단계·금액은 아직 확정되지 않았습니다.', verdict2:'환율은 완화 요인이지만 항공유와 국제유가 부담이 남아 있어 상승 압력이 소폭 우세한 상태입니다.', verdictShort:'10월 전망: 상승 압력 소폭 우세 · 일부 완화 · 신뢰도 낮음', verdictLong:'환율 ↓ / MOPS·항공유 ↑ / 국제유가 높은 수준',
        summaryTitle:'2026년 10월 국제선 유류할증료 전망 요약',
        updated:'최종 업데이트: 2026.08.28 09:00 KST · 상승 압력 소폭 우세 · 일부 완화 · 신뢰도 낮음',
        predict:[['10월 전망','상승 압력 소폭 우세 · 일부 완화','up'],['환율','USD/KRW 약 1,386원','down'],['MOPS/항공유','Singapore Jet Fuel 최근 154.98달러/bbl','up'],['국제유가','Brent 93.45 · WTI 86.14','neutral']],
        keyVars:['9월 21단계 확정','USD/KRW 약 1,386원','MOPS/항공유 최근 154.98달러/bbl','Brent 93.45','WTI 86.14','10월 단계·금액 미확정']
      },
      en:{
        title:'October 2026 International Fuel Surcharge Outlook | FX, MOPS and Crude',
        desc:'October 2026 international fuel surcharge outlook using the existing core indicators: USD/KRW, MOPS/jet fuel and international crude.',
        page:'October 2026 International Fuel Surcharge Outlook',
        sub:'As of 2026.08.28 09:00 KST · September Level 21 confirmed · October window 2026.08.16-09.15 · FX, MOPS/jet fuel and crude centered',
        intro:'The October outlook uses the existing core indicators only: FX, MOPS/jet fuel and international crude. USD/KRW around 1,386 reduces KRW conversion pressure, while recent Singapore Jet Fuel near USD 154.98/bbl keeps jet-fuel burden in place. Brent around USD 93.45 and WTI around USD 86.14 remain high despite short-term adjustment.',
        section:'October 2026 Fuel Surcharge Core Indicators',
        rows:[['October direction','Slight upward pressure · partly eased · low confidence','Direction only; stage and amounts are not confirmed.'],['USD/KRW','around 1,386','Downside factor for KRW conversion amounts.'],['MOPS / jet fuel','recent Singapore Jet Fuel USD 154.98/bbl','Jet-fuel burden remains; October average is not confirmed yet.'],['International crude','Brent around USD 93.45 · WTI around USD 86.14','High level with short-term adjustment.']],
        foot:'* October stage and route amounts are not shown before official airline notices.',
        verdictTitle:'October 2026 Forecast Conclusion', verdict1:'October stage and route amounts are not confirmed.', verdict2:'FX is a relief factor, but jet fuel and crude remain high enough to keep slight upward pressure.', verdictShort:'October outlook: slight upward pressure · partly eased · low confidence', verdictLong:'FX ↓ / MOPS·jet fuel ↑ / crude still high',
        summaryTitle:'October 2026 International Fuel Surcharge Outlook Summary',
        updated:'Last updated: 2026.08.28 09:00 KST · slight upward pressure · partly eased · low confidence',
        predict:[['October outlook','Slight upward pressure · partly eased','up'],['FX','USD/KRW around 1,386','down'],['MOPS / jet fuel','recent Singapore Jet Fuel USD 154.98/bbl','up'],['International crude','Brent 93.45 · WTI 86.14','neutral']],
        keyVars:['September Level 21 confirmed','USD/KRW around 1,386','MOPS/jet fuel recent USD 154.98/bbl','Brent 93.45','WTI 86.14','October stage and amounts unconfirmed']
      }
    };
    packs.ja = Object.assign({}, packs.en, {title:'2026年10月国際線燃油サーチャージ見通し | 為替・MOPS・原油',desc:'既存の主要指標であるUSD/KRW、MOPS/航空燃料、国際原油を使って10月見通しを整理します。',page:'2026年10月国際線燃油サーチャージ見通し',sub:'2026.08.28 09:00 KST時点 · 9月21段階確定 · 10月算定期間2026.08.16~09.15 · 為替・MOPS/航空燃料・国際原油中心',intro:'10月見通しは既存の主要指標である為替、MOPS/航空燃料、国際原油のみを使います。USD/KRW約1,386はウォン換算額の下押し要因で、Singapore Jet Fuel直近154.98ドル/bblは航空燃料負担を維持します。Brent約93.45ドル、WTI約86.14ドルは短期調整後も高い水準です。',section:'2026年10月燃油サーチャージ主要指標',rows:[['10月方向性','小幅な上昇圧力 · 一部緩和 · 信頼度低い','方向性のみ表示し、段階・金額は確定しません。'],['USD/KRW','約1,386','ウォン換算額の下押し要因です。'],['MOPS / 航空燃料','Singapore Jet Fuel直近154.98ドル/bbl','航空燃料負担は残りますが、10月平均は未確定です。'],['国際原油','Brent約93.45ドル · WTI約86.14ドル','高水準ながら短期調整です。']],foot:'* 航空会社公式公示前は10月の段階・金額を表示しません。',verdictTitle:'2026年10月見通し結論',verdict1:'10月の段階・金額はまだ確定していません。',verdict2:'為替は緩和要因ですが、航空燃料と原油負担が残り小幅な上昇圧力が優勢です。',verdictShort:'10月見通し: 小幅な上昇圧力 · 一部緩和 · 信頼度低い',verdictLong:'為替 ↓ / MOPS・航空燃料 ↑ / 原油高水準',summaryTitle:'2026年10月国際線燃油サーチャージ見通し要約',updated:'最終更新: 2026.08.28 09:00 KST · 小幅な上昇圧力 · 一部緩和 · 信頼度低い',predict:[['10月見通し','小幅な上昇圧力 · 一部緩和','up'],['為替','USD/KRW約1,386','down'],['MOPS / 航空燃料','Singapore Jet Fuel直近154.98ドル/bbl','up'],['国際原油','Brent 93.45 · WTI 86.14','neutral']],keyVars:['9月21段階確定','USD/KRW約1,386','MOPS/航空燃料直近154.98ドル/bbl','Brent 93.45','WTI 86.14','10月段階・金額未確定']});
    packs.zh = Object.assign({}, packs.en, {title:'2026年10月国际线燃油附加费展望 | 汇率·MOPS·油价',desc:'使用既有核心指标USD/KRW、MOPS/航油和国际油价整理10月展望。',page:'2026年10月国际线燃油附加费展望',sub:'截至2026.08.28 09:00 KST · 9月第21档确认 · 10月计算期2026.08.16~09.15 · 汇率、MOPS/航油和国际油价为中心',intro:'10月展望仅使用原有核心指标：汇率、MOPS/航油、国际油价。USD/KRW约1,386是韩元换算金额下行因素，Singapore Jet Fuel近期154.98美元/bbl维持航油负担。Brent约93.45美元、WTI约86.14美元短期调整但仍处高位。',section:'2026年10月燃油附加费核心指标',rows:[['10月方向','上行压力略占优 · 部分缓和 · 可信度低','仅显示方向，档位和金额不确认。'],['USD/KRW','约1,386','韩元换算金额下行因素。'],['MOPS/航油','Singapore Jet Fuel近期154.98美元/bbl','航油负担仍在，但10月均值尚未确认。'],['国际油价','Brent约93.45美元 · WTI约86.14美元','高位短期调整。']],foot:'* 航空公司官方公告前不显示10月档位和金额。',verdictTitle:'2026年10月展望结论',verdict1:'10月档位和金额尚未确认。',verdict2:'汇率是缓和因素，但航油和国际油价负担仍在，因此上行压力略占优。',verdictShort:'10月展望：上行压力略占优 · 部分缓和 · 可信度低',verdictLong:'汇率 ↓ / MOPS·航油 ↑ / 油价仍高',summaryTitle:'2026年10月国际线燃油附加费展望摘要',updated:'最后更新：2026.08.28 09:00 KST · 上行压力略占优 · 部分缓和 · 可信度低',predict:[['10月展望','上行压力略占优 · 部分缓和','up'],['汇率','USD/KRW约1,386','down'],['MOPS/航油','Singapore Jet Fuel近期154.98美元/bbl','up'],['国际油价','Brent 93.45 · WTI 86.14','neutral']],keyVars:['9月第21档确认','USD/KRW约1,386','MOPS/航油近期154.98美元/bbl','Brent 93.45','WTI 86.14','10月档位和金额未确认']});
    packs.fr = Object.assign({}, packs.en, {title:'Perspective octobre 2026 | FX, MOPS et pétrole',desc:'Perspective octobre avec les indicateurs existants: USD/KRW, MOPS/jet fuel et pétrole international.',page:'Perspective surtaxe carburant internationale octobre 2026',sub:'Au 2026.08.28 09:00 KST · septembre niveau 21 confirmé · fenêtre octobre 2026.08.16-09.15 · FX, MOPS/jet fuel et pétrole international',intro:'La perspective d’octobre utilise uniquement les indicateurs existants: FX, MOPS/jet fuel et pétrole international. USD/KRW autour de 1 386 réduit les montants convertis en KRW, tandis que Singapore Jet Fuel récent à 154.98 USD/bbl maintient la charge carburant. Brent autour de 93.45 USD et WTI autour de 86.14 USD restent élevés malgré l’ajustement de court terme.',section:'Indicateurs clés de la surtaxe carburant octobre 2026',rows:[['Direction octobre','Légère pression haussière · partiellement atténuée · faible confiance','Direction seulement; niveau et montants non confirmés.'],['USD/KRW','env. 1 386','Facteur baissier pour les montants KRW.'],['MOPS / jet fuel','Singapore Jet Fuel récent 154.98 USD/bbl','La charge jet fuel demeure; la moyenne d’octobre n’est pas confirmée.'],['Pétrole international','Brent env. 93.45 USD · WTI env. 86.14 USD','Niveau élevé avec ajustement court terme.']],foot:'* Aucun niveau ou montant d’octobre avant les avis officiels des compagnies.',verdictTitle:'Conclusion perspective octobre 2026',verdict1:'Le niveau et les montants d’octobre ne sont pas confirmés.',verdict2:'Le FX apporte du répit, mais jet fuel et pétrole restent assez élevés pour maintenir une légère pression haussière.',verdictShort:'Octobre: légère pression haussière · partiellement atténuée · faible confiance',verdictLong:'FX ↓ / MOPS·jet fuel ↑ / pétrole encore élevé',summaryTitle:'Résumé perspective surtaxe internationale octobre 2026',updated:'Dernière mise à jour: 2026.08.28 09:00 KST · légère pression haussière · partiellement atténuée · faible confiance',predict:[['Perspective octobre','Légère pression haussière · atténuée','up'],['FX','USD/KRW env. 1 386','down'],['MOPS / jet fuel','Singapore Jet Fuel récent 154.98 USD/bbl','up'],['Pétrole international','Brent 93.45 · WTI 86.14','neutral']],keyVars:['Septembre niveau 21 confirmé','USD/KRW env. 1 386','MOPS/jet fuel récent 154.98 USD/bbl','Brent 93.45','WTI 86.14','Niveau et montants octobre non confirmés']});
    packs.de = Object.assign({}, packs.en, {title:'Oktober-2026 Ausblick | FX, MOPS und Öl',desc:'Oktober-Ausblick mit den bestehenden Kernindikatoren USD/KRW, MOPS/Jetfuel und internationalem Öl.',page:'Oktober-2026 internationaler Treibstoffzuschlag Ausblick',sub:'Stand 2026.08.28 09:00 KST · September Stufe 21 bestätigt · Oktober-Fenster 2026.08.16-09.15 · FX, MOPS/Jetfuel und internationales Öl im Fokus',intro:'Der Oktober-Ausblick nutzt nur die bestehenden Kernindikatoren: FX, MOPS/Jetfuel und internationales Öl. USD/KRW um 1.386 senkt KRW-Umrechnungsbeträge, während Singapore Jet Fuel zuletzt 154.98 USD/bbl die Jetfuel-Belastung erhält. Brent um 93.45 USD und WTI um 86.14 USD bleiben trotz kurzfristiger Korrektur hoch.',section:'Oktober-2026 Kernindikatoren für Treibstoffzuschlag',rows:[['Oktober-Richtung','Leichter Aufwärtsdruck · teilweise entschärft · geringe Sicherheit','Nur Richtung; Stufe und Beträge nicht bestätigt.'],['USD/KRW','ca. 1.386','Senkender Faktor für KRW-Beträge.'],['MOPS / Jetfuel','Singapore Jet Fuel zuletzt 154.98 USD/bbl','Jetfuel-Belastung bleibt; Oktober-Durchschnitt nicht bestätigt.'],['Internationales Öl','Brent ca. 93.45 USD · WTI ca. 86.14 USD','Hohes Niveau mit kurzfristiger Korrektur.']],foot:'* Keine Oktober-Stufe oder Beträge vor offiziellen Airline-Hinweisen.',verdictTitle:'Oktober-2026 Fazit',verdict1:'Oktober-Stufe und Beträge sind noch nicht bestätigt.',verdict2:'FX entlastet, aber Jetfuel und Öl bleiben hoch genug für leichten Aufwärtsdruck.',verdictShort:'Oktober: leichter Aufwärtsdruck · teilweise entschärft · geringe Sicherheit',verdictLong:'FX ↓ / MOPS·Jetfuel ↑ / Öl weiter hoch',summaryTitle:'Oktober-2026 Ausblick Zusammenfassung',updated:'Zuletzt aktualisiert: 2026.08.28 09:00 KST · leichter Aufwärtsdruck · teilweise entschärft · geringe Sicherheit',predict:[['Oktober-Ausblick','Leichter Aufwärtsdruck · entschärft','up'],['FX','USD/KRW ca. 1.386','down'],['MOPS / Jetfuel','Singapore Jet Fuel zuletzt 154.98 USD/bbl','up'],['Internationales Öl','Brent 93.45 · WTI 86.14','neutral']],keyVars:['September Stufe 21 bestätigt','USD/KRW ca. 1.386','MOPS/Jetfuel zuletzt 154.98 USD/bbl','Brent 93.45','WTI 86.14','Oktober Stufe und Beträge nicht bestätigt']});
    Object.keys(packs).forEach(function(l){
      var p = forecast[l]; if(!p) return;
      var core = packs[l];
      Object.assign(p, core);
      p.summary = core.rows.map(function(row){ return row[0] + ': ' + row[1] + ' - ' + row[2]; });
      p.market = [core.section].concat(core.rows.slice(1).map(function(row){ return row[0] + ': ' + row[1] + ' - ' + row[2]; })).concat([core.verdictShort, core.keyVars.join(' · '), '']);
      p.keyTitle = p.keyTitle || (l === 'ko' ? '핵심 변수' : 'Key Variables');
    });
    forecast.cn = forecast.zh;
  }
  applyCoreForecastShape();

  var news = {
    ko:{title:'유류할증료·MOPS·환율 최신 뉴스 | 2026년 8월 28일',desc:'원달러 환율, Singapore Jet Fuel·MOPS, 국제유가와 호르무즈 해협 최신 뉴스 및 국내 항공사 유류할증료 공시를 한눈에 확인하세요.',page:'유류할증료·MOPS·환율 최신 뉴스',sub:'2026.08.28 09:00 KST 기준 · 9월 21단계 확정 · 10월 전망: 보합 중심 · 인하 가능성 유지 · USD/KRW 약 1,381 · Brent 89.70 · WTI 83.53',note:'※ 유류할증료는 발권일 기준으로 적용됩니다. 9월 공식 공시는 확정 기준선이며, 현재 초점은 10월 예측입니다.',ref:'2026.08.28 09:00 KST 기준 · 9월 공시 확정 · 10월 산정기간 진행 중',cur:'→ 10월 전망은 보합 중심 · 인하 가능성 유지입니다. 전날보다 인하 기대는 소폭 후퇴했지만 상승 우세로 확정하지 않습니다.',filters:['전체','항공사 공지','기관','시장'],latest:'최신 뉴스',previous:'이전 뉴스',archive:'날짜순 아카이브',keys:['주요 확인 항목','10월: 보합 중심·인하 가능성 유지','USD/KRW 약 1,381','Jet Fuel 완화 신호','Brent 89.70 / WTI 83.53','호르무즈 10척·원유 2.3m bpd']},
    en:{title:'Fuel Surcharge, MOPS and FX Latest News | August 28, 2026',desc:'Follow USD/KRW, Singapore Jet Fuel/MOPS, crude oil, Hormuz news and Korean airline fuel surcharge notices in one place.',page:'Fuel Surcharge, MOPS and FX Latest News',sub:'As of 2026.08.28 09:00 KST · September Level 21 confirmed · October outlook: flat-centered · reduction chance maintained · USD/KRW around 1,381 · Brent 89.70 · WTI 83.53',note:'Fuel surcharges apply by ticketing date. September notices are the confirmed baseline; the focus now shifts to October forecasting.',ref:'As of 2026.08.28 09:00 KST · September notices confirmed · October calculation period in progress',cur:'→ October outlook is flat-centered with reduction chance maintained. Reduction hopes are slightly weaker than yesterday, but no upside-dominant stage is confirmed.',filters:['All','Airline notices','Institutions','Market'],latest:'Latest News',previous:'Previous News',archive:'Archived by date',keys:['Key Check Variables','October: flat-centered, reduction chance maintained','USD/KRW around 1,381','Jet Fuel easing signal','Brent 89.70 / WTI 83.53','Hormuz 10 vessels · crude 2.3m bpd']},
    ja:{title:'燃油サーチャージ・MOPS・為替 最新ニュース | 2026年8月28日',desc:'USD/KRW、Singapore Jet Fuel/MOPS、原油、ホルムズ、韓国航空会社の燃油サーチャージ公示をまとめます。',page:'燃油サーチャージ・MOPS・為替 最新ニュース',sub:'2026.08.28 09:00 KST時点 · 9月21段階確定 · 10月見通し: 横ばい中心 · 引き下げ可能性維持 · USD/KRW約1,381 · Brent 89.70 · WTI 83.53',note:'燃油サーチャージは発券日基準です。9月公示は確定基準で、現在の焦点は10月予測です。',ref:'2026.08.28 09:00 KST時点 · 9月公示確定 · 10月算定期間進行中',cur:'→ 10月見通しは横ばい中心・引き下げ可能性維持です。前日より期待はやや後退しましたが、上昇優勢とは確定しません。',filters:['すべて','航空会社公示','機関','市場'],latest:'最新ニュース',previous:'過去のニュース',archive:'日付順アーカイブ',keys:['主要確認項目','10月: 横ばい中心・引き下げ可能性維持','USD/KRW約1,381','Jet Fuel緩和信号','Brent 89.70 / WTI 83.53','ホルムズ10隻・原油2.3m bpd']},
    zh:{title:'燃油附加费、MOPS与汇率最新新闻 | 2026年8月28日',desc:'集中查看USD/KRW、Singapore Jet Fuel/MOPS、国际油价、霍尔木兹新闻及韩国航司燃油附加费公告。',page:'燃油附加费、MOPS与汇率最新新闻',sub:'截至2026.08.28 09:00 KST · 9月第21档确认 · 10月展望：持平为主 · 下调可能性维持 · USD/KRW约1,381 · Brent 89.70 · WTI 83.53',note:'燃油附加费按出票日适用。9月公告为确认基准，当前重点转向10月预测。',ref:'截至2026.08.28 09:00 KST · 9月公告确认 · 10月计算期进行中',cur:'→ 10月展望为持平为主、下调可能性维持。较前日下调期待略有后退，但不确认上行占优。',filters:['全部','航空公司公告','机构','市场'],latest:'最新新闻',previous:'过往新闻',archive:'按日期归档',keys:['核心确认项目','10月：持平为主、下调可能性维持','USD/KRW约1,381','Jet Fuel缓和信号','Brent 89.70 / WTI 83.53','霍尔木兹10艘·原油2.3m bpd']},
    fr:{title:'Actualités surtaxe carburant, MOPS et FX | 28 août 2026',desc:'Suivez USD/KRW, Singapore Jet Fuel/MOPS, pétrole, Hormuz et les avis de surtaxe des compagnies coréennes.',page:'Actualités surtaxe carburant, MOPS et FX',sub:'Au 2026.08.28 09:00 KST · septembre niveau 21 confirmé · octobre: stable centré · possibilité de baisse maintenue · USD/KRW env. 1 381 · Brent 89.70 · WTI 83.53',note:'Les surtaxes s’appliquent selon la date d’émission. Septembre est la base confirmée; le focus passe à octobre.',ref:'Au 2026.08.28 09:00 KST · avis septembre confirmés · période de calcul octobre en cours',cur:'→ Octobre est stable centré avec possibilité de baisse maintenue. L’espoir de baisse recule légèrement vs hier, sans confirmer une hausse dominante.',filters:['Tout','Avis compagnies','Institutions','Marché'],latest:'Dernières nouvelles',previous:'Anciennes nouvelles',archive:'Archive par date',keys:['Points clés','Octobre: stable centré, baisse maintenue','USD/KRW env. 1 381','Signal d’apaisement Jet Fuel','Brent 89.70 / WTI 83.53','Hormuz 10 navires · brut 2.3m bpd']},
    de:{title:'Treibstoffzuschlag, MOPS und FX News | 28. August 2026',desc:'USD/KRW, Singapore Jet Fuel/MOPS, Öl, Hormuz und koreanische Airline-Zuschlagshinweise an einem Ort verfolgen.',page:'Treibstoffzuschlag, MOPS und FX News',sub:'Stand 2026.08.28 09:00 KST · September Stufe 21 bestätigt · Oktober: stabil zentriert · Senkungschance bleibt · USD/KRW ca. 1.381 · Brent 89.70 · WTI 83.53',note:'Treibstoffzuschläge gelten nach Ausstellungsdatum. September ist die bestätigte Basis; Fokus ist jetzt Oktober.',ref:'Stand 2026.08.28 09:00 KST · September-Hinweise bestätigt · Oktober-Berechnungszeitraum läuft',cur:'→ Oktober bleibt stabil zentriert mit weiter offener Senkungschance. Die Senkungshoffnung ist etwas schwächer als gestern, aber kein Aufwärtsfall ist bestätigt.',filters:['Alle','Airline-Hinweise','Institutionen','Markt'],latest:'Neueste Nachrichten',previous:'Frühere Nachrichten',archive:'Nach Datum archiviert',keys:['Wichtige Prüfpunkte','Oktober: stabil zentriert, Senkungschance bleibt','USD/KRW ca. 1.381','Jet-Fuel-Entspannungssignal','Brent 89.70 / WTI 83.53','Hormuz 10 Schiffe · Rohöl 2.3m bpd']}
  };
  news.cn = news.zh;
  function applyCoreNewsShape(){
    var packs = {
      ko:{sub:'2026.08.28 09:00 KST 기준 · 9월 21단계 확정 · 10월 전망: 상승 압력 소폭 우세 · 일부 완화 · USD/KRW 약 1,386 · Brent 93.45 · WTI 86.14',cur:'→ 10월 전망은 상승 압력 소폭 우세이나 일부 완화된 상태입니다. 항공사 공식 공시 전까지 단계·금액은 확정하지 않습니다.',keys:['주요 확인 항목','10월: 상승 압력 소폭 우세·일부 완화','USD/KRW 약 1,386','MOPS/항공유 최근 154.98','Brent 93.45 / WTI 86.14','10월 단계·금액 미확정']},
      en:{sub:'As of 2026.08.28 09:00 KST · September Level 21 confirmed · October outlook: slight upward pressure, partly eased · USD/KRW around 1,386 · Brent 93.45 · WTI 86.14',cur:'→ October shows slight upward pressure, partly eased. Stage and route amounts are not confirmed before airline notices.',keys:['Key Check Variables','October: slight upward pressure, partly eased','USD/KRW around 1,386','MOPS/jet fuel recent 154.98','Brent 93.45 / WTI 86.14','October stage and amount not confirmed']},
      ja:{sub:'2026.08.28 09:00 KST時点 · 9月21段階確定 · 10月見通し: 小幅な上昇圧力・一部緩和 · USD/KRW約1,386 · Brent 93.45 · WTI 86.14',cur:'→ 10月は小幅な上昇圧力ながら一部緩和です。航空会社公示前に段階・金額は確定しません。',keys:['主要確認項目','10月: 小幅上昇圧力・一部緩和','USD/KRW約1,386','MOPS/航空燃料最近154.98','Brent 93.45 / WTI 86.14','10月段階・金額未確定']},
      zh:{sub:'截至2026.08.28 09:00 KST · 9月第21档确认 · 10月展望：上行压力略占优、部分缓和 · USD/KRW约1,386 · Brent 93.45 · WTI 86.14',cur:'→ 10月为上行压力略占优但部分缓和。航空公司公告前不确认档位和金额。',keys:['核心确认项目','10月：上行压力略占优、部分缓和','USD/KRW约1,386','MOPS/航油近期154.98','Brent 93.45 / WTI 86.14','10月档位和金额未确认']},
      fr:{sub:'Au 2026.08.28 09:00 KST · septembre niveau 21 confirmé · octobre: légère pression haussière, partiellement atténuée · USD/KRW env. 1 386 · Brent 93.45 · WTI 86.14',cur:'→ Octobre montre une légère pression haussière, partiellement atténuée. Aucun niveau ou montant n’est confirmé avant les avis des compagnies.',keys:['Points clés','Octobre: légère pression haussière, atténuée','USD/KRW env. 1 386','MOPS/jet fuel récent 154.98','Brent 93.45 / WTI 86.14','Niveau et montant octobre non confirmés']},
      de:{sub:'Stand 2026.08.28 09:00 KST · September Stufe 21 bestätigt · Oktober: leichter Aufwärtsdruck, teilweise entschärft · USD/KRW ca. 1.386 · Brent 93.45 · WTI 86.14',cur:'→ Oktober zeigt leichten Aufwärtsdruck, teilweise entschärft. Stufe und Beträge sind vor Airline-Hinweisen nicht bestätigt.',keys:['Wichtige Prüfpunkte','Oktober: leichter Aufwärtsdruck, entschärft','USD/KRW ca. 1.386','MOPS/Jetfuel zuletzt 154.98','Brent 93.45 / WTI 86.14','Oktober-Stufe und Betrag nicht bestätigt']}
    };
    Object.keys(packs).forEach(function(l){
      news[l] = Object.assign({}, news[l] || news.en, packs[l]);
    });
    news.cn = news.zh;
  }
  applyCoreNewsShape();

  function newsSurfacePack(l){
    var p = news[l] || news.en;
    var f = forecast[l] || forecast.en;
    return {
      summaryTitle: l === 'ko' ? '9월 확정 공시와 10월 전망 요약' : (l === 'ja' ? '9月確定公示と10月見通し要約' : (l === 'zh' ? '9月确认公告与10月展望摘要' : (l === 'fr' ? 'Résumé avis septembre et perspective octobre' : (l === 'de' ? 'September-Hinweise und Oktober-Ausblick' : 'September Confirmed Notices and October Outlook Summary')))),
      summaryUpdated: f.updated,
      summary: f.summary,
      officialTitle: l === 'ko' ? '주요 항공사 2026년 9월 국제선 유류할증료 공식 공시' : (l === 'ja' ? '主要航空会社 2026年9月国際線燃油サーチャージ公式公示' : (l === 'zh' ? '主要航空公司2026年9月国际线燃油附加费官方公告' : (l === 'fr' ? 'Avis officiels septembre 2026 des principales compagnies' : (l === 'de' ? 'Offizielle September-2026 Hinweise wichtiger Airlines' : 'Major Airline September 2026 International Fuel Surcharge Official Notices')))),
      officialNotice: p.ref + ' · KE/OZ/LJ/BX/TW/7C/ZE/RS/YP',
      officialDesc: l === 'ko' ? '* 9월 공식 공시는 확정 기준선입니다. 10월 단계와 노선별 금액은 아직 확정하지 않습니다.' : (l === 'ja' ? '* 9月公式公示は確定基準です。10月段階と路線別金額は未確定です。' : (l === 'zh' ? '* 9月官方公告是确认基准。10月档位和航线金额尚未确认。' : (l === 'fr' ? '* Les avis officiels de septembre sont la base confirmée. Octobre n’est pas confirmé.' : (l === 'de' ? '* Offizielle September-Hinweise sind die bestätigte Basis. Oktober ist nicht bestätigt.' : '* September notices are the confirmed baseline. October stage and route amounts are not confirmed.')))),
      link: l === 'ko' ? '공식 공지 ↗' : (l === 'ja' ? '公式公示 ↗' : (l === 'zh' ? '官方公告 ↗' : (l === 'fr' ? 'Avis officiel ↗' : (l === 'de' ? 'Offizieller Hinweis ↗' : 'Official notice ↗')))),
      compareTitle: l === 'ko' ? '전월 대비: 8월 → 9월 확정 변화와 10월 예측 전환' : (l === 'ja' ? '前月比: 8月から9月の確定変化と10月予測への移行' : (l === 'zh' ? '环比：8月至9月确认变化与10月预测转换' : (l === 'fr' ? 'Mois sur mois: changements confirmés août-septembre et passage à octobre' : (l === 'de' ? 'Monatsvergleich: bestätigte August-September-Änderungen und Oktober-Prognose' : 'Month-over-month: August to September confirmed changes and October forecast shift')))),
      marketTitle: f.market[0],
      brent: f.market[3],
      mops: f.market[2],
      fx: f.market[1],
      geo: f.market[4],
      marketSummary: f.market[5],
      fxDominance: f.keyVars.join(' · '),
      decisionTitle: f.verdictTitle,
      decisionLine1: f.verdict1,
      decisionLine2: f.verdict2,
      forecastTitle: f.basisTitle,
      forecastDesc: f.basisBody,
      forecastBtn: l === 'ko' ? '10월 전망 보기 →' : (l === 'ja' ? '10月見通しを見る →' : (l === 'zh' ? '查看10月展望 →' : (l === 'fr' ? 'Voir la perspective octobre →' : (l === 'de' ? 'Oktober-Ausblick ansehen →' : 'View October Outlook →'))))
    };
  }

  var notices = {
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
    var packs = {
      ko:[['officialKe','대한항공','9월 KRW 48,000~354,000 · 8월 대비 최소 +12,800원'],['officialOz','아시아나항공','9월 KRW 52,000~290,100 · 8월 대비 최소 +15,400원'],['officialLj','진에어','9월 USD 29~89 · 8월 대비 최소 +USD 9'],['officialBx','에어부산','9월 USD 71/82 · 8월 대비 최소 +USD 24'],['officialTw','티웨이항공','9월 KRW 36,200~247,500 · 8월 대비 최소 +11,800원'],['official7c','제주항공','9월 USD 33~79 · 8월 대비 최소 +USD 11'],['officialZe','이스타항공','9월 USD 33~79 · 8월 대비 최소 +USD 11'],['officialRs','에어서울','9월 KRW 57,700~99,600 · 8월 대비 최소 +18,000원'],['officialYp','에어프레미아','9월 USD 37~228 · 8월 대비 최소 +USD 12']],
      en:[['officialKe','Korean Air','September KRW 48,000-354,000 · minimum +KRW 12,800 vs August'],['officialOz','Asiana Airlines','September KRW 52,000-290,100 · minimum +KRW 15,400 vs August'],['officialLj','Jin Air','September USD 29-89 · minimum +USD 9 vs August'],['officialBx','Air Busan','September USD 71/82 · minimum +USD 24 vs August'],['officialTw',"T'way Air",'September KRW 36,200-247,500 · minimum +KRW 11,800 vs August'],['official7c','Jeju Air','September USD 33-79 · minimum +USD 11 vs August'],['officialZe','Eastar Jet','September USD 33-79 · minimum +USD 11 vs August'],['officialRs','Air Seoul','September KRW 57,700-99,600 · minimum +KRW 18,000 vs August'],['officialYp','Air Premia','September USD 37-228 · minimum +USD 12 vs August']],
      ja:[['officialKe','大韓航空','9月 KRW 48,000-354,000 · 8月比 最低 +KRW 12,800'],['officialOz','アシアナ航空','9月 KRW 52,000-290,100 · 8月比 最低 +KRW 15,400'],['officialLj','ジンエアー','9月 USD 29-89 · 8月比 最低 +USD 9'],['officialBx','エアプサン','9月 USD 71/82 · 8月比 最低 +USD 24'],['officialTw','ティーウェイ航空','9月 KRW 36,200-247,500 · 8月比 最低 +KRW 11,800'],['official7c','チェジュ航空','9月 USD 33-79 · 8月比 最低 +USD 11'],['officialZe','イースター航空','9月 USD 33-79 · 8月比 最低 +USD 11'],['officialRs','エアソウル','9月 KRW 57,700-99,600 · 8月比 最低 +KRW 18,000'],['officialYp','エアプレミア','9月 USD 37-228 · 8月比 最低 +USD 12']],
      zh:[['officialKe','大韩航空','9月 KRW 48,000-354,000 · 较8月最低 +KRW 12,800'],['officialOz','韩亚航空','9月 KRW 52,000-290,100 · 较8月最低 +KRW 15,400'],['officialLj','真航空','9月 USD 29-89 · 较8月最低 +USD 9'],['officialBx','釜山航空','9月 USD 71/82 · 较8月最低 +USD 24'],['officialTw','德威航空','9月 KRW 36,200-247,500 · 较8月最低 +KRW 11,800'],['official7c','济州航空','9月 USD 33-79 · 较8月最低 +USD 11'],['officialZe','易斯达航空','9月 USD 33-79 · 较8月最低 +USD 11'],['officialRs','首尔航空','9月 KRW 57,700-99,600 · 较8月最低 +KRW 18,000'],['officialYp','Air Premia','9月 USD 37-228 · 较8月最低 +USD 12']],
      fr:[['officialKe','Korean Air','Septembre KRW 48 000-354 000 · minimum +KRW 12 800 vs août'],['officialOz','Asiana Airlines','Septembre KRW 52 000-290 100 · minimum +KRW 15 400 vs août'],['officialLj','Jin Air','Septembre USD 29-89 · minimum +USD 9 vs août'],['officialBx','Air Busan','Septembre USD 71/82 · minimum +USD 24 vs août'],['officialTw',"T'way Air",'Septembre KRW 36 200-247 500 · minimum +KRW 11 800 vs août'],['official7c','Jeju Air','Septembre USD 33-79 · minimum +USD 11 vs août'],['officialZe','Eastar Jet','Septembre USD 33-79 · minimum +USD 11 vs août'],['officialRs','Air Seoul','Septembre KRW 57 700-99 600 · minimum +KRW 18 000 vs août'],['officialYp','Air Premia','Septembre USD 37-228 · minimum +USD 12 vs août']],
      de:[['officialKe','Korean Air','September KRW 48.000-354.000 · mindestens +KRW 12.800 vs August'],['officialOz','Asiana Airlines','September KRW 52.000-290.100 · mindestens +KRW 15.400 vs August'],['officialLj','Jin Air','September USD 29-89 · mindestens +USD 9 vs August'],['officialBx','Air Busan','September USD 71/82 · mindestens +USD 24 vs August'],['officialTw',"T'way Air",'September KRW 36.200-247.500 · mindestens +KRW 11.800 vs August'],['official7c','Jeju Air','September USD 33-79 · mindestens +USD 11 vs August'],['officialZe','Eastar Jet','September USD 33-79 · mindestens +USD 11 vs August'],['officialRs','Air Seoul','September KRW 57.700-99.600 · mindestens +KRW 18.000 vs August'],['officialYp','Air Premia','September USD 37-228 · mindestens +USD 12 vs August']]
    };
    return packs[l] || packs.en;
  }
  function bookingCopy(l){
    var packs = {
      ko:{
        decisionLong:'장거리·성수기: 9월 확정 공시 금액과 실제 항공권 총액을 함께 비교',
        myrealtripTitle:'항공권 가격과 여행 상품을 함께 비교',
        myrealtripDesc:'9월 확정 유류할증료를 기준으로 항공권 총액과 여행 상품 가격을 함께 확인',
        myrealtripCta:'항공권 총액 확인하기',
        hotelsTitle:'항공권 예매 및 숙소 예약 한 번에 비교',
        hotelsDesc:'항공권과 호텔 가격을 함께 비교하고 최적의 예약 타이밍 확인',
        genericCta:'최저가 확인 →',
        usimTitle:'여행 SIM 준비',
        usimDesc:'출국 전에 필요한 데이터 상품 확인',
        agodaTitle:'숙소 가격도 함께 확인',
        agodaDesc:'항공권 총액과 숙소 비용을 함께 비교'
      },
      en:{
        decisionLong:'Long haul and peak season: compare confirmed September surcharges with total airfare',
        myrealtripTitle:'Compare flight prices and travel products together',
        myrealtripDesc:'Use confirmed September surcharges to check total airfare and travel product pricing together',
        myrealtripCta:'Check total airfare',
        hotelsTitle:'Compare flights and hotels in one place',
        hotelsDesc:'Check flight and hotel prices together to time your booking',
        genericCta:'Check price →',
        usimTitle:'Prepare Travel SIM',
        usimDesc:'Check essential data options before departure',
        agodaTitle:'Check accommodation prices too',
        agodaDesc:'Compare total airfare and accommodation cost together'
      },
      ja:{
        decisionLong:'長距離・繁忙期: 9月確定サーチャージと航空券総額を比較',
        myrealtripTitle:'航空券価格と旅行商品を一緒に比較',
        myrealtripDesc:'9月確定燃油サーチャージを基準に航空券総額と旅行商品価格を確認',
        myrealtripCta:'航空券総額を確認',
        hotelsTitle:'航空券とホテルをまとめて比較',
        hotelsDesc:'航空券とホテル価格を一緒に比較して予約タイミングを確認',
        genericCta:'最安値を確認 →',
        usimTitle:'旅行SIM準備',
        usimDesc:'出発前に必要なデータ商品を確認',
        agodaTitle:'宿泊料金も確認',
        agodaDesc:'航空券総額と宿泊費を一緒に比較'
      },
      zh:{
        decisionLong:'长途和旺季：比较9月确认附加费与机票总价',
        myrealtripTitle:'同时比较机票价格和旅行产品',
        myrealtripDesc:'以9月确认燃油附加费为基准，一起查看机票总价和旅行产品价格',
        myrealtripCta:'查看机票总价',
        hotelsTitle:'机票和酒店一次比较',
        hotelsDesc:'一起比较机票和酒店价格，确认合适预订时机',
        genericCta:'查看最低价 →',
        usimTitle:'旅行SIM准备',
        usimDesc:'出发前查看必要的数据产品',
        agodaTitle:'也查看住宿价格',
        agodaDesc:'一起比较机票总价和住宿费用'
      },
      fr:{
        decisionLong:'Long-courrier et haute saison: comparez les surtaxes confirmées de septembre avec le prix total du billet',
        myrealtripTitle:'Comparer billets d’avion et produits de voyage',
        myrealtripDesc:'Avec les surtaxes confirmées de septembre, vérifiez le prix total du billet et les produits de voyage',
        myrealtripCta:'Voir le prix total',
        hotelsTitle:'Comparer vols et hôtels en une fois',
        hotelsDesc:'Comparez vols et hôtels pour choisir le bon moment de réservation',
        genericCta:'Voir le prix →',
        usimTitle:'Préparer la SIM voyage',
        usimDesc:'Vérifiez les options data avant le départ',
        agodaTitle:'Vérifier aussi les hébergements',
        agodaDesc:'Comparez le prix total du billet et le coût de l’hébergement'
      },
      de:{
        decisionLong:'Langstrecke und Hochsaison: bestätigte September-Zuschläge mit dem Gesamtflugpreis vergleichen',
        myrealtripTitle:'Flugpreise und Reiseprodukte zusammen vergleichen',
        myrealtripDesc:'Mit bestätigten September-Zuschlägen Gesamtflugpreis und Reiseprodukte gemeinsam prüfen',
        myrealtripCta:'Gesamtflugpreis prüfen',
        hotelsTitle:'Flüge und Hotels gemeinsam vergleichen',
        hotelsDesc:'Flug- und Hotelpreise zusammen prüfen und Buchungszeitpunkt vergleichen',
        genericCta:'Preis prüfen →',
        usimTitle:'Travel-SIM vorbereiten',
        usimDesc:'Datenoptionen vor Abflug prüfen',
        agodaTitle:'Auch Unterkunftspreise prüfen',
        agodaDesc:'Gesamtflugpreis und Unterkunftskosten gemeinsam vergleichen'
      }
    };
    return packs[l] || packs.en;
  }

  var latestCards = [
    {
      id:'hormuz-commodity-vessels-10-crude-flow-low-20260828', category:'geo', priority:1, date:'2026-08-28', updatedAt:ISO, sourceUrl:'forecast.html', aiSummary:true, relevanceScore:1,
      i18n:{
        ko:{title:'호르무즈 통항 10척으로 소폭 회복…원유 흐름은 여전히 낮음', aiBrief:'Kpler 공개 추적 기준 commodity vessel 통항은 수요일 10척으로 늘었지만, 8월 원유 수출은 약 2.3m bpd로 전쟁 직전 평균보다 크게 낮습니다.', summary:'호르무즈 해협은 선박 수와 실제 원유 흐름을 분리해서 봐야 합니다. 공개 통항 10척은 전일 약 8척보다 개선된 관측이지만 전체 선박 수가 아니며, 8월 호르무즈 경유 원유 수출은 약 2.3m bpd로 7월 4.49m bpd와 전쟁 직전 3개월 평균 15.82m bpd보다 낮습니다.', impact:'10월 유류할증료 전망에서는 통항 소폭 개선을 하락 요인으로 보되, 원유 흐름 부진은 운송·공급 상승위험으로 유지합니다.', sourceName:'Forecast analysis', tags:['호르무즈','Kpler 10척','원유 2.3m bpd','10월 전망']},
        en:{title:'Hormuz transit improves to 10 vessels, but crude flows remain low', aiBrief:'Kpler public commodity-vessel tracking rose to 10 on Wednesday, while August crude exports near 2.3m bpd remain far below the pre-war average.', summary:'Hormuz vessel counts and actual oil flow should be separated. Ten publicly tracked commodity vessels is an improvement from around eight, but it is not total traffic. August crude exports through Hormuz are around 2.3m bpd, below July 4.49m bpd and the pre-war three-month average of 15.82m bpd.', impact:'For October surcharge forecasting, the transit improvement is a relief factor, while weak crude flow keeps supply and shipping risk elevated.', sourceName:'Forecast analysis', tags:['Hormuz','Kpler 10','crude 2.3m bpd','October outlook']},
        ja:{title:'ホルムズ通航10隻へ小幅改善、原油フローはなお低水準', aiBrief:'Kpler公開追跡のcommodity vesselは水曜10隻に増えましたが、8月原油輸出は約2.3m bpdで戦前平均を大きく下回ります。', summary:'ホルムズは船舶数と実際の原油フローを分けて見る必要があります。公開追跡10隻は前日約8隻から改善しましたが、全船舶数ではありません。8月のホルムズ経由原油輸出は約2.3m bpdで、7月4.49m bpdや戦前3カ月平均15.82m bpdを下回ります。', impact:'10月見通しでは通航改善を緩和要因、原油フロー低迷を供給・輸送リスクとして扱います。', sourceName:'予測分析', tags:['ホルムズ','Kpler 10隻','原油2.3m bpd','10月見通し']},
        zh:{title:'霍尔木兹通行小幅恢复至10艘，但原油流量仍低', aiBrief:'Kpler公开追踪commodity vessel周三增至10艘，但8月原油出口约2.3m bpd，远低于战前平均。', summary:'霍尔木兹应区分船舶数量和实际原油流量。公开追踪10艘较前日约8艘改善，但不是全部船舶通行。8月经霍尔木兹原油出口约2.3m bpd，低于7月4.49m bpd和战前三个月均值15.82m bpd。', impact:'10月展望中，通行改善是缓和因素，但原油流量低迷仍维持供应和运输风险。', sourceName:'预测分析', tags:['霍尔木兹','Kpler 10艘','原油2.3m bpd','10月展望']},
        fr:{title:'Hormuz: transit à 10 navires, mais flux de brut toujours bas', aiBrief:'Le suivi public Kpler atteint 10 commodity vessels mercredi, tandis que les exportations de brut d’août près de 2.3m bpd restent très inférieures à l’avant-guerre.', summary:'Il faut séparer le nombre de navires et le flux réel de pétrole. Dix commodity vessels suivis publiquement marquent une amélioration vs environ huit, mais ce n’est pas le trafic total. Les exportations de brut via Hormuz en août sont près de 2.3m bpd, sous juillet 4.49m bpd et la moyenne d’avant-guerre 15.82m bpd.', impact:'Pour octobre, l’amélioration du transit est un facteur d’apaisement, mais le faible flux de brut maintient le risque offre et transport.', sourceName:'Analyse prévisionnelle', tags:['Hormuz','Kpler 10','brut 2.3m bpd','octobre']},
        de:{title:'Hormuz-Verkehr verbessert sich auf 10 Schiffe, Rohölfluss bleibt niedrig', aiBrief:'Kpler public commodity-vessel tracking stieg am Mittwoch auf 10, während August-Rohölexporte von ca. 2.3m bpd weit unter Vorkriegsniveau bleiben.', summary:'Bei Hormuz müssen Schiffszahl und tatsächlicher Ölfluss getrennt werden. Zehn öffentlich verfolgte commodity vessels sind besser als rund acht, aber nicht der gesamte Verkehr. August-Rohölexporte durch Hormuz liegen bei etwa 2.3m bpd, unter Juli 4.49m bpd und dem Vorkriegs-Dreimonatsschnitt von 15.82m bpd.', impact:'Für Oktober ist die Verkehrsverbesserung entlastend, schwacher Ölfluss hält Angebots- und Transportrisiken hoch.', sourceName:'Prognoseanalyse', tags:['Hormuz','Kpler 10','Rohöl 2.3m bpd','Oktober']}
      }
    },
    {
      id:'brent-wti-rebound-20260828', category:'market', priority:2, date:'2026-08-28', updatedAt:ISO, sourceUrl:'forecast.html', aiSummary:true, relevanceScore:.99,
      i18n:{
        ko:{title:'Brent 89.70달러·WTI 83.53달러, 급락 후 반등', aiBrief:'8월 27일 미국시장 종가 기준 Brent는 89.70달러/bbl(+2.1%), WTI는 83.53달러/bbl(+1.6%)로 반등했습니다.', summary:'국제유가는 최근 급락 뒤 다시 올랐습니다. 미국·이란 직접 협상 부재와 호르무즈 조기 정상화 기대 후퇴가 공급위험 프리미엄을 되살린 요인으로 해석됩니다. 유가 반등은 10월 항공유 가격 하락 속도를 제한할 수 있습니다.', impact:'10월 전망의 인하 기대를 전날보다 소폭 낮추되, 환율과 kerosene 완화 신호 때문에 상승 우세로 확정하지 않습니다.', sourceName:'Market reference', tags:['Brent 89.70','WTI 83.53','유가 반등','10월 전망']},
        en:{title:'Brent USD 89.70 and WTI USD 83.53 rebound after sharp fall', aiBrief:'At the Aug 27 U.S. close, Brent was USD 89.70/bbl (+2.1%) and WTI USD 83.53/bbl (+1.6%).', summary:'Crude prices rebounded after the recent drop. Lack of direct U.S.-Iran talks and weaker early Hormuz-normalization hopes revived some supply-risk premium. The rebound can slow any decline in October jet-fuel costs.', impact:'Reduction expectations are slightly reduced versus yesterday, but FX and kerosene easing prevent an upside-dominant call.', sourceName:'Market reference', tags:['Brent 89.70','WTI 83.53','crude rebound','October outlook']},
        ja:{title:'Brent 89.70ドル・WTI 83.53ドル、急落後に反発', aiBrief:'8月27日米国終値でBrentは89.70ドル/bbl(+2.1%)、WTIは83.53ドル/bbl(+1.6%)でした。', summary:'原油は最近の急落後に反発しました。米イラン直接協議の不在とホルムズ早期正常化期待の後退が供給リスクプレミアムを戻したと見ます。', impact:'10月の引き下げ期待はやや後退しますが、為替とkerosene緩和により上昇優勢とはしません。', sourceName:'市場参考', tags:['Brent 89.70','WTI 83.53','原油反発','10月見通し']},
        zh:{title:'Brent 89.70美元、WTI 83.53美元，急跌后反弹', aiBrief:'8月27日美国收盘，Brent为89.70美元/bbl(+2.1%)，WTI为83.53美元/bbl(+1.6%)。', summary:'国际油价在近期急跌后反弹。美伊没有直接谈判、霍尔木兹早期正常化预期减弱，使供应风险溢价部分回升。', impact:'10月下调期待较前日略降，但汇率和kerosene缓和使其不转为上行占优。', sourceName:'市场参考', tags:['Brent 89.70','WTI 83.53','油价反弹','10月展望']},
        fr:{title:'Brent 89.70 USD et WTI 83.53 USD rebondissent après la chute', aiBrief:'À la clôture US du 27 août, Brent valait 89.70 USD/bbl (+2.1%) et WTI 83.53 USD/bbl (+1.6%).', summary:'Le pétrole rebondit après la forte baisse récente. L’absence de pourparlers directs États-Unis-Iran et le recul des attentes de normalisation rapide d’Hormuz ravivent une prime de risque offre.', impact:'La probabilité de baisse d’octobre recule légèrement, sans devenir un scénario haussier dominant.', sourceName:'Référence marché', tags:['Brent 89.70','WTI 83.53','rebond pétrole','octobre']},
        de:{title:'Brent 89.70 USD und WTI 83.53 USD erholen sich nach starkem Rückgang', aiBrief:'Zum US-Schluss am 27. August lag Brent bei 89.70 USD/bbl (+2.1%) und WTI bei 83.53 USD/bbl (+1.6%).', summary:'Öl erholte sich nach dem jüngsten starken Rückgang. Fehlende direkte US-Iran-Gespräche und geringere schnelle Hormuz-Normalisierungserwartungen stützen die Risikoprämie.', impact:'Oktober-Senkungshoffnungen werden leicht reduziert, ohne eine aufwärtsdominante Sicht zu bestätigen.', sourceName:'Marktreferenz', tags:['Brent 89.70','WTI 83.53','Ölerholung','Oktober']}
      }
    },
    {
      id:'singapore-kerosene-easing-signal-20260828', category:'market', priority:3, date:'2026-08-28', updatedAt:ISO, sourceUrl:'forecast.html', aiSummary:true, relevanceScore:.98,
      i18n:{
        ko:{title:'Singapore kerosene spread·crack 완화, Jet Fuel 긴장 일부 낮아져', aiBrief:'Sep/Oct Singapore kerosene spread와 September crack 하락, regrade 정상 수준 접근은 항공유 추가 상승 압력이 약해지는 신호입니다.', summary:'최근 Singapore kerosene 시장에서는 스프레드와 크랙이 완화되고 Jet regrade가 정상 수준에 가까워지는 움직임이 확인됩니다. 다만 Jet Fuel 절대 가격은 여전히 높으므로 MOPS 정상화나 유류할증료 인하 확정으로 쓰지 않습니다.', impact:'10월 전망은 보합 중심을 유지하되 인하 가능성을 계속 열어둡니다.', sourceName:'Jet fuel market reference', tags:['Singapore kerosene','spread','crack','Jet Fuel 완화']},
        en:{title:'Singapore kerosene spread and crack ease, lowering some Jet Fuel stress', aiBrief:'Lower Sep/Oct Singapore kerosene spread, lower September crack and regrade moving closer to normal are easing signals.', summary:'Singapore kerosene spreads and cracks are easing, and Jet regrade is moving closer to normal levels. However, absolute Jet Fuel prices remain high, so this is not MOPS normalization or a confirmed surcharge cut.', impact:'The October view stays flat-centered while keeping reduction possibility open.', sourceName:'Jet fuel market reference', tags:['Singapore kerosene','spread','crack','Jet Fuel easing']},
        ja:{title:'Singapore kerosene spread・crackが緩和、Jet Fuelストレス一部低下', aiBrief:'Sep/Oct spreadとSeptember crack低下、regrade正常水準接近は緩和信号です。', summary:'Singapore kerosene市場ではスプレッドとクラックが緩和し、Jet regradeが正常水準に近づいています。ただし絶対価格は高く、MOPS正常化や引き下げ確定とはしません。', impact:'10月見通しは横ばい中心を維持し、引き下げ可能性を残します。', sourceName:'航空燃料市場参考', tags:['Singapore kerosene','spread','crack','Jet Fuel緩和']},
        zh:{title:'Singapore kerosene价差和裂解价差缓和，Jet Fuel压力部分下降', aiBrief:'Sep/Oct价差、September crack下降和regrade接近正常是缓和信号。', summary:'Singapore kerosene市场的价差和裂解价差正在缓和，Jet regrade接近正常水平。但Jet Fuel绝对价格仍高，因此不能写成MOPS正常化或附加费下调确认。', impact:'10月展望维持持平为主，同时保留下调可能性。', sourceName:'航油市场参考', tags:['Singapore kerosene','spread','crack','Jet Fuel缓和']},
        fr:{title:'Les spreads et cracks Singapore kerosene s’apaisent', aiBrief:'Le recul du Sep/Oct spread, du September crack et le regrade plus normal réduisent une partie du stress Jet Fuel.', summary:'Le marché Singapore kerosene montre un apaisement des spreads et cracks, avec un Jet regrade plus proche de la normale. Mais le prix absolu du Jet Fuel reste élevé: ce n’est pas une normalisation MOPS ni une baisse confirmée.', impact:'La vue d’octobre reste stable centrée, avec possibilité de baisse ouverte.', sourceName:'Référence marché Jet Fuel', tags:['Singapore kerosene','spread','crack','Jet Fuel']},
        de:{title:'Singapore-kerosene-Spreads und Cracks entspannen sich', aiBrief:'Niedrigerer Sep/Oct spread, niedrigerer September crack und normalerer regrade senken etwas Jetfuel-Stress.', summary:'Singapore-kerosene-Spreads und Cracks entspannen sich, und Jet regrade nähert sich normalen Niveaus. Absolute Jetfuel-Preise bleiben aber hoch: keine MOPS-Normalisierung und keine bestätigte Senkung.', impact:'Der Oktober-Ausblick bleibt stabil zentriert, mit offener Senkungschance.', sourceName:'Jetfuel-Marktreferenz', tags:['Singapore kerosene','spread','crack','Jetfuel entspannt']}
      }
    },
    {
      id:'hormuz-reopening-conditions-tanker-hit-20260828', category:'geo', priority:4, date:'2026-08-28', updatedAt:ISO, sourceUrl:'forecast.html', aiSummary:true, relevanceScore:.97,
      i18n:{
        ko:{title:'이란, 조건부 재개방 논의…호르무즈 유조선은 정체불명 발사체 피격', aiBrief:'이란은 재개방 조건을 구체화하고 있지만 미·이란 직접협상은 교착입니다. UKMTO는 유조선 피격과 화재를 보고했으며 공격 주체는 미확인입니다.', summary:'이란의 재개방 조건에는 지역 전쟁 종료, 항구 봉쇄 해제, 제재 완화/해제, 보상 등이 거론됩니다. 이는 재개방 불가에서 조건부 협상 가능성으로 이동한 완화 신호입니다. 다만 미국·이란 직접협상은 진행되지 않고, 유조선 피격과 45척 블랙리스트는 운송·보험 위험을 유지합니다.', impact:'호르무즈를 열림/닫힘으로 단순화하지 않고 외교 완화와 운송위험을 분리합니다.', sourceName:'UKMTO / forecast analysis', tags:['이란 조건부 재개방','직접협상 교착','유조선 피격','공격 주체 미확인']},
        en:{title:'Iran discusses conditional reopening, while a Hormuz tanker is hit by unknown projectile', aiBrief:'Iran is specifying reopening conditions, but direct U.S.-Iran talks are stalled. UKMTO reported a tanker hit and fire; the attacker is unconfirmed.', summary:'Iran’s reopening conditions include ending regional war, lifting port blockades, easing or removing sanctions and compensation. This is a relief signal from “no reopening” toward conditional talks. However, no direct U.S.-Iran talks are underway, and the tanker hit plus 45-vessel blacklist keep shipping and insurance risk elevated.', impact:'Hormuz is treated as a mixed state, separating diplomatic relief from shipping risk.', sourceName:'UKMTO / forecast analysis', tags:['Iran reopening conditions','direct talks stalled','tanker hit','attacker unconfirmed']},
        ja:{title:'イランが条件付き再開を協議、ホルムズではタンカー被弾', aiBrief:'イランは再開条件を具体化していますが米イラン直接協議は停滞。UKMTOはタンカー被弾と火災を報告し、攻撃主体は未確認です。', summary:'再開条件には地域戦争終了、港湾封鎖解除、制裁緩和・解除、補償などが含まれます。これは条件付き協議可能性という緩和信号です。一方で直接協議はなく、タンカー被弾と45隻ブラックリストが輸送・保険リスクを残します。', impact:'ホルムズを開閉の二択にせず、外交緩和と輸送リスクを分けます。', sourceName:'UKMTO / 予測分析', tags:['条件付き再開','直接協議停滞','タンカー被弾','攻撃主体未確認']},
        zh:{title:'伊朗讨论条件式重开，霍尔木兹油轮遭不明发射体击中', aiBrief:'伊朗正在明确重开条件，但美伊直接谈判停滞。UKMTO报告油轮遭击并起火，攻击方未确认。', summary:'伊朗重开条件包括地区战争结束、解除港口封锁、制裁缓和或解除、补偿等。这是从无法重开转向条件谈判的缓和信号。但美伊没有直接谈判，油轮遭击和45艘黑名单仍维持运输与保险风险。', impact:'不把霍尔木兹简化为开或关，而是区分外交缓和与运输风险。', sourceName:'UKMTO / 预测分析', tags:['条件式重开','直接谈判停滞','油轮遭击','攻击方未确认']},
        fr:{title:'Iran: réouverture conditionnelle discutée, tanker touché par un projectile non identifié', aiBrief:'L’Iran précise des conditions de réouverture, mais les pourparlers directs avec les États-Unis sont bloqués. UKMTO rapporte un tanker touché et un incendie; l’auteur est non confirmé.', summary:'Les conditions évoquées incluent fin de la guerre régionale, levée du blocus portuaire, assouplissement ou levée des sanctions et compensation. C’est un signal d’apaisement conditionnel, mais le tanker touché et la liste noire de 45 navires maintiennent le risque transport et assurance.', impact:'Hormuz est traité comme un état mixte, séparant diplomatie et risque transport.', sourceName:'UKMTO / analyse prévisionnelle', tags:['réouverture conditionnelle','pourparlers bloqués','tanker touché','auteur non confirmé']},
        de:{title:'Iran spricht über bedingte Wiederöffnung, Hormuz-Tanker von unbekanntem Projektil getroffen', aiBrief:'Iran konkretisiert Bedingungen, direkte US-Iran-Gespräche stocken. UKMTO meldet Tankertreffer und Feuer; der Angreifer ist unbestätigt.', summary:'Genannte Bedingungen sind Ende des regionalen Kriegs, Aufhebung von Hafenblockaden, Sanktionslockerung oder -aufhebung und Entschädigung. Das ist ein bedingtes Entspannungssignal, aber Tankertreffer und 45-Schiffe-Liste halten Transport- und Versicherungsrisiken hoch.', impact:'Hormuz wird nicht als offen/geschlossen vereinfacht, sondern in Diplomatie und Transportrisiko getrennt.', sourceName:'UKMTO / Prognoseanalyse', tags:['bedingte Wiederöffnung','Gespräche stocken','Tanker getroffen','Angreifer unbestätigt']}
      }
    }
  ];

  function normalizeFeedLocales(){
    var feed = (typeof NEWS_DATA !== 'undefined' && NEWS_DATA) || window.NEWS_DATA;
    if(feed && Array.isArray(feed.items)){
      feed.items.forEach(function(item){
        if(item && item.tags && !Array.isArray(item.tags) && typeof item.tags === 'object'){
          item.i18n = item.tags;
          item.tags = Array.isArray(item.sourceName) ? item.sourceName.slice() : [];
        }
      });
    }
  }
  function installNewsCards(){
    normalizeFeedLocales();
    var list = Array.isArray(window.FIXED_NEWS) ? window.FIXED_NEWS : (typeof FIXED_NEWS !== 'undefined' && Array.isArray(FIXED_NEWS) ? FIXED_NEWS : null);
    if(!list) return;
    var remove = {
      'hormuz-commodity-vessels-two-20260826':1,
      'brent-wti-fall-235-20260825':1,
      'brent-wti-sharp-fall-20260826':1,
      'usdkrw-1382-strong-krw-20260825':1,
      'usdkrw-1382-holds-20260826':1,
      'hormuz-weekend-public-tracking-20260825':1,
      'brent-wti-8784-8223-20260827':1,
      'usdkrw-1380-20260827':1
    };
    for(var i=list.length-1;i>=0;i--){ if(list[i] && remove[list[i].id]) list.splice(i,1); }
    var seen = {};
    list.forEach(function(card){ if(card && card.id) seen[card.id] = true; });
    latestCards.slice().reverse().forEach(function(card){ if(!seen[card.id]) list.unshift(card); });
  }

  function applyForecast(){
    if(window.AERO_MARKET_NUMBERS_20260831) return;
    if(!/\/forecast(?:\.html)?(?:$|[?#])/.test(location.pathname + location.search)) return;
    var p = forecast[lang()] || forecast.en;
    updateHead(p.title, p.desc, 'https://aero-surcharge.com/forecast.html');
    setText('fore.pageTitle', p.page); setText('fore.h1', p.page); setText('fore.pageSub', p.sub);
    setHtml('fore.notice', p.notice); setText('fore.intro', p.intro); setText('fore.section.indicators', p.section);
    var thead = document.getElementById('indicatorThead');
    if(thead) thead.innerHTML = '<tr>'+p.th.map(function(h){ return '<th>'+esc(h)+'</th>'; }).join('')+'</tr>';
    var tbody = document.getElementById('indicatorTbody');
    if(tbody) tbody.innerHTML = p.rows.map(function(r){ return '<tr><td><strong>'+esc(r[0])+'</strong></td><td>'+esc(r[1])+'</td><td>'+esc(r[2])+'</td></tr>'; }).join('');
    setText('fore.indicator.footnote', p.foot);
    var summary = document.getElementById('summaryCard');
    if(summary) summary.innerHTML = '<div class="nsc-title">'+esc(p.summaryTitle)+'</div><div class="nsc-updated">'+esc(p.updated)+'</div><ul>'+p.summary.map(function(s){ return '<li>'+esc(s)+'</li>'; }).join('')+'</ul>';
    var verdict = document.getElementById('verdictBox');
    if(verdict) verdict.innerHTML = '<div class="verdict-title">'+esc(p.verdictTitle)+'</div>'+esc(p.verdict1)+'<br>'+esc(p.verdict2)+'<br><br><strong>'+esc(p.verdictShort)+'</strong><br><strong>'+esc(p.verdictLong)+'</strong>';
    var scenario = document.getElementById('scenarioBox');
    if(scenario){ scenario.innerHTML = ''; scenario.style.display = 'none'; }
    var decision = document.getElementById('bookingDecisionBox');
    if(decision){ decision.innerHTML = ''; decision.style.display = 'none'; }
    var mops = document.getElementById('mopsAnalysisBox');
    if(mops){ mops.innerHTML = ''; mops.style.display = 'none'; }
    var market = document.getElementById('marketBriefBox');
    if(market) market.innerHTML = '<div class="mb-title">'+esc(p.market[0])+'</div>'+p.market.slice(1,5).map(function(s){ return '<div class="mb-item">'+esc(s)+'</div>'; }).join('')+'<div class="mb-summary">'+esc(p.market[5])+'</div><div class="mb-summary" style="margin-top:6px;color:#558B2F;">'+esc(p.market[6])+'</div>';
    var pred = document.getElementById('predictFactors');
    if(pred) pred.innerHTML = p.predict.map(function(it){ return '<div class="predict-factor"><div class="pf-label">'+esc(it[0])+'</div><div class="pf-val '+esc(it[2])+'">'+esc(it[1])+'</div></div>'; }).join('');
    setText('fore.predict.title', p.section); setText('fore.predict.subtitle', p.verdictShort); setText('fore.predict.footnote', p.foot);
    setText('fore.keyvars.title', p.keyTitle);
    var keys = document.getElementById('keyVarsGrid');
    if(keys) keys.innerHTML = p.keyVars.map(function(s){ return '<div class="kv-chip">'+esc(s)+'</div>'; }).join('');
    setText('fore.basis.title', p.basisTitle); setText('fore.basis.body', p.basisBody); setText('fore.aiNotice', p.ai);
    applyForecastRelatedLinks(lang());
    applyForecastFaq(p, lang());
    document.querySelectorAll('#verdictBox, #summaryCard, #predictFactors, #marketBriefBox').forEach(function(el){
      if(/\bundefined\b/.test(el.innerText || '')) el.innerHTML = '';
    });
  }

  function applyForecastRelatedLinks(l){
    var packs = {
      ko:{title:'관련 유류할증료 정보', links:['항공사별 9월 유류할증료','유류할증료 변동 그래프','9월 확정 공시 뉴스','한국 출발 유류할증료 조회','유류할증료 계산기','데이터 기준 보기']},
      en:{title:'Related Fuel Surcharge Information', links:['September surcharge by airline','Fuel surcharge trend graph','September confirmed notices','Korea-departure surcharge lookup','Fuel surcharge calculator','Data methodology']},
      ja:{title:'関連燃油サーチャージ情報', links:['航空会社別9月サーチャージ','燃油サーチャージ推移グラフ','9月確定公示ニュース','韓国発サーチャージ検索','燃油サーチャージ計算機','データ基準']},
      zh:{title:'相关燃油附加费信息', links:['各航空公司9月附加费','燃油附加费趋势图','9月确认公告新闻','韩国出发附加费查询','燃油附加费计算器','数据方法']},
      fr:{title:'Informations liées à la surtaxe carburant', links:['Surtaxe septembre par compagnie','Graphique de tendance','Avis septembre confirmés','Recherche départ Corée','Calculateur de surtaxe','Méthodologie']},
      de:{title:'Verwandte Treibstoffzuschlag-Informationen', links:['September-Zuschlag nach Airline','Trendgrafik','Bestätigte September-Hinweise','Korea-Abflug Suche','Zuschlagrechner','Datenmethodik']}
    };
    var p = packs[l] || packs.en;
    setText('fore.related.title', p.title);
    var urls = ['airlines.html','fuel-surcharge-graph.html','news.html','fuel-surcharge-korea.html','fuel-surcharge-calculator.html','methodology.html'];
    var related = document.getElementById('relatedLinks');
    if(related) related.innerHTML = p.links.map(function(text, idx){
      return '<a href="'+urls[idx]+'" style="display:block;padding:10px 14px;background:var(--bg);border:1.5px solid var(--line);border-radius:9px;font-size:12px;font-weight:700;color:var(--blue);text-decoration:none;">'+esc(text)+'</a>';
    }).join('');
  }

  function applyForecastFaq(p, l){
    var labels = {
      ko:{title:'자주 묻는 질문', q1:'2026년 10월 국제선 유류할증료는 인하될까?', q2:'10월 유류할증료는 언제 확정되나?', a2:'10월은 2026.08.16~09.15 산정기간이 진행 중입니다. 항공사 공식 공시가 나온 뒤 확정값으로 반영해야 합니다.', q4:'환율이 내려가면 유류할증료도 내려가나?', q5:'호르무즈 해협은 정상화됐나?'},
      en:{title:'FAQ', q1:'Will the October 2026 international fuel surcharge fall?', q2:'When will the October surcharge be confirmed?', a2:'October is still in the 2026.08.16-09.15 calculation period. Confirmed values should be reflected only after airline notices are published.', q4:'Does lower FX reduce the fuel surcharge?', q5:'Is Hormuz normalized?'},
      ja:{title:'よくある質問', q1:'2026年10月の国際線燃油サーチャージは下がりますか？', q2:'10月サーチャージはいつ確定しますか？', a2:'10月は2026.08.16~09.15の算定期間中です。航空会社の公式公示後に確定値として反映します。', q4:'為替が下がると燃油サーチャージも下がりますか？', q5:'ホルムズ海峡は正常化しましたか？'},
      zh:{title:'常见问题', q1:'2026年10月国际线燃油附加费会下调吗？', q2:'10月燃油附加费何时确认？', a2:'10月仍处于2026.08.16~09.15计算期。应在航空公司官方公告发布后再反映确认值。', q4:'汇率下行会降低燃油附加费吗？', q5:'霍尔木兹海峡已经正常化了吗？'},
      fr:{title:'Questions fréquentes', q1:'La surtaxe internationale d’octobre 2026 va-t-elle baisser ?', q2:'Quand la surtaxe d’octobre sera-t-elle confirmée ?', a2:'Octobre est encore dans la période de calcul 2026.08.16-09.15. Les valeurs confirmées ne doivent être intégrées qu’après publication des avis des compagnies.', q4:'Un FX plus bas réduit-il la surtaxe ?', q5:'Hormuz est-il normalisé ?'},
      de:{title:'FAQ', q1:'Sinkt der internationale Treibstoffzuschlag im Oktober 2026?', q2:'Wann wird der Oktober-Zuschlag bestätigt?', a2:'Oktober liegt noch im Berechnungszeitraum 2026.08.16-09.15. Bestätigte Werte sollten erst nach offiziellen Airline-Hinweisen übernommen werden.', q4:'Senkt ein niedrigerer FX den Treibstoffzuschlag?', q5:'Ist Hormuz normalisiert?'}
    }[l] || null;
    labels = labels || {title:'FAQ', q1:'Will the October 2026 international fuel surcharge fall?', q2:'When will the October surcharge be confirmed?', a2:'October is still in the 2026.08.16-09.15 calculation period. Confirmed values should be reflected only after airline notices are published.', q4:'Does lower FX reduce the fuel surcharge?', q5:'Is Hormuz normalized?'};
    var items = [
      [labels.q1, p.verdict2],
      [labels.q2, labels.a2],
      ['MOPS / Jet Fuel', p.foot],
      [labels.q4, p.rows[3][2]],
      [labels.q5, (p.rows[4] && p.rows[4][2]) || p.verdict2]
    ];
    var faq = document.querySelector('.faq-box, #faqBox, #forecastFaq, #forecastFaqBox');
    if(faq) faq.innerHTML = '<h2>'+esc(labels.title)+'</h2>'+items.map(function(item){ return '<div class="faq-item"><h3>'+esc(item[0])+'</h3><p>'+esc(item[1])+'</p></div>'; }).join('');
    var node = document.querySelector('script[type="application/ld+json"]');
    if(node){
      try {
        var json = JSON.parse(node.textContent || '{}');
        if(json['@type'] === 'FAQPage'){
          json['@id'] = 'https://aero-surcharge.com/forecast.html#faq-20260828';
          json.dateModified = ISO;
          json.mainEntity = items.map(function(item){ return {'@type':'Question', name:item[0], acceptedAnswer:{'@type':'Answer', text:item[1]}}; });
          node.textContent = JSON.stringify(json);
        }
      } catch(e) {}
    }
  }

  function applyNews(){
    if(window.AERO_MARKET_NUMBERS_20260831) return;
    if(!/\/news(?:\.html)?(?:$|[?#])/.test(location.pathname + location.search)) return;
    installNewsCards();
    var l = lang();
    var p = news[l] || news.en;
    var s = newsSurfacePack(l);
    updateHead(p.title, p.desc, 'https://aero-surcharge.com/news.html');
    setText('news.pageTitle', p.page); setText('news.h1', p.page); setText('news.pageSub', p.sub);
    setText('news.surchargeNote', p.note); setText('news.dataRef', p.ref); setText('news.curSummary', p.cur);
    setText('news.summary.title', s.summaryTitle); setText('news.summary.updated', s.summaryUpdated);
    (s.summary || []).forEach(function(line, idx){ setText('news.summary.li'+(idx+1), line); });
    document.querySelectorAll('.summary-card ul, .news-summary-card ul, .new-summary-card ul').forEach(function(ul){
      ul.innerHTML = (s.summary || []).map(function(line){ return '<li>'+esc(line)+'</li>'; }).join('');
    });
    setText('news.officialTitle', s.officialTitle); setText('news.officialNotice', s.officialNotice); setText('news.compareTitle', s.compareTitle);
    setText('news.marketTitle', s.marketTitle); setText('news.brent', s.brent); setText('news.mops', s.mops); setText('news.fx', s.fx); setText('news.geo', s.geo);
    setText('news.marketSummary', s.marketSummary); setText('news.fxDominance', s.fxDominance);
    setText('news.decisionTitle', s.decisionTitle); setText('news.decisionLine1', s.decisionLine1); setText('news.decisionLine2', s.decisionLine2);
    setText('news.forecastCta.title', s.forecastTitle); setText('news.forecastCta.desc', s.forecastDesc); setText('news.forecastCta.btn', s.forecastBtn);
    var b = bookingCopy(l);
    setText('news.decisionLong', b.decisionLong);
    setText('aff.myrealtrip.title', b.myrealtripTitle);
    setText('aff.myrealtrip.desc', b.myrealtripDesc);
    setText('aff.myrealtrip.cta', b.myrealtripCta);
    setText('aff.hotelscombined.title', b.hotelsTitle);
    setText('aff.hotelscombined.desc', b.hotelsDesc);
    setText('aff.agoda.title', b.agodaTitle);
    setText('aff.agoda.desc', b.agodaDesc);
    setText('aff.usim.title', b.usimTitle);
    setText('aff.usim.desc', b.usimDesc);
    setText('aff.cta', b.genericCta);
    ['news.filterAll','news.filterAirline','news.filterInstitution','news.filterMarket'].forEach(function(key, idx){ setText(key, p.filters[idx]); });
    applyNewsRelatedLinks(l);
    var officialBox = document.querySelector('.official-summary-box');
    if(officialBox){
      officialBox.innerHTML = '<div class="official-title" data-i18n="news.officialTitle">'+esc(s.officialTitle)+'</div>'
        + '<div data-i18n="news.officialNotice" style="font-size:12px;color:#9A6A00;margin-bottom:10px;padding:6px 10px;background:rgba(255,255,255,.78);border-radius:6px;border-left:3px solid #FFCC80;">'+esc(s.officialNotice)+'</div>'
        + airlineRows(l).map(function(item){ return '<div class="official-item" id="'+esc(item[0])+'"><strong>'+esc(item[1])+'</strong> - '+esc(item[2])+' · <a href="'+esc(notices[item[0]])+'" target="_blank" rel="noopener noreferrer" style="color:#075985;font-weight:700;">'+esc(s.link)+'</a></div>'; }).join('')
        + '<div class="official-desc" id="officialDesc">'+esc(s.officialDesc)+'</div>';
    }
    var compare = document.getElementById('compareList');
    if(compare){
      var f = forecast[l] || forecast.en;
      compare.innerHTML = f.rows.slice(1,8).map(function(row){ return '<li><strong>'+esc(row[0])+':</strong> '+esc(row[1])+' - '+esc(row[2])+'</li>'; }).join('');
    }
    var latestTitle = document.querySelector('.news-section-title[data-section="latest"], .news-section-label.latest .news-section-title');
    var previousTitle = document.querySelector('.news-section-title[data-section="previous"], .news-section-label.previous .news-section-title');
    if(latestTitle) latestTitle.textContent = p.latest;
    if(previousTitle) previousTitle.textContent = p.previous;
    document.querySelectorAll('.news-section-meta, .news-section-sub').forEach(function(el){
      if(/Archive|아카이브|アーカイブ|归档|Archiv|보관|date/i.test(el.textContent || '')) el.textContent = p.archive;
    });
    var box = document.getElementById('newsKeyVariables');
    if(box) box.innerHTML = '<div style="font-weight:700;margin-bottom:8px;">'+esc(p.keys[0])+'</div><div>'+p.keys.slice(1).map(function(v){ return '<span style="display:inline-block;margin:3px 6px 3px 0;padding:5px 8px;border:1px solid #BFDBFE;border-radius:999px;background:#EFF6FF;color:#0F172A;">'+esc(v)+'</span>'; }).join('')+'</div>';
    localizeRenderedCards();
    removeStaleRenderedCards();
    localizePagination();
  }
  function applyNewsRelatedLinks(l){
    var packs = {
      ko:{title:'관련 유류할증료 정보', links:['2026년 10월 유류할증료 전망','유류할증료 변동 그래프','8월 vs 9월 비교','유류할증료 계산 방법','한국 출발 유류할증료 조회','항공사별 유류할증료']},
      en:{title:'Related Fuel Surcharge Information', links:['October 2026 surcharge outlook','Fuel surcharge trend graph','August vs September comparison','How fuel surcharges are calculated','Korea-departure surcharge lookup','Surcharge by airline']},
      ja:{title:'関連燃油サーチャージ情報', links:['2026年10月サーチャージ見通し','燃油サーチャージ推移グラフ','8月と9月の比較','燃油サーチャージ計算方法','韓国発サーチャージ検索','航空会社別サーチャージ']},
      zh:{title:'相关燃油附加费信息', links:['2026年10月附加费展望','燃油附加费趋势图','8月与9月比较','燃油附加费计算方法','韩国出发附加费查询','按航空公司查看附加费']},
      fr:{title:'Informations liées à la surtaxe carburant', links:['Perspective surtaxe octobre 2026','Graphique de tendance','Comparaison août vs septembre','Calcul de la surtaxe carburant','Recherche départ Corée','Surtaxe par compagnie']},
      de:{title:'Verwandte Treibstoffzuschlag-Informationen', links:['Oktober-2026 Zuschlag Ausblick','Trendgrafik Treibstoffzuschlag','August-vs-September Vergleich','Berechnung des Treibstoffzuschlags','Korea-Abflug Suche','Zuschlag nach Airline']}
    };
    var p = packs[l] || packs.en;
    var box = document.getElementById('newsRelatedLinksBox');
    if(!box) return;
    var title = box.querySelector('div');
    if(title) title.textContent = p.title;
    var anchors = box.querySelectorAll('a');
    p.links.forEach(function(text, idx){ if(anchors[idx]) anchors[idx].textContent = text; });
  }
  function localizeRenderedCards(){
    var l = lang();
    var list = Array.isArray(window.FIXED_NEWS) ? window.FIXED_NEWS : (typeof FIXED_NEWS !== 'undefined' && Array.isArray(FIXED_NEWS) ? FIXED_NEWS : null);
    if(!list) return;
    var byId = {};
    list.forEach(function(card){ if(card && card.id) byId[card.id] = card; });
    document.querySelectorAll('.news-card').forEach(function(el){
      var card = byId[el.id];
      var pack = card && card.i18n && (card.i18n[l] || card.i18n.en);
      if(!pack) return;
      var title = el.querySelector('.news-title');
      var brief = el.querySelector('.news-ai-brief');
      var summary = el.querySelector('.news-summary');
      var impact = el.querySelector('.news-impact');
      var source = el.querySelector('.news-link');
      var tags = el.querySelector('.news-tags');
      if(title && pack.title) title.textContent = pack.title;
      if(brief && pack.aiBrief) brief.innerHTML = block(pack.aiBrief);
      if(summary && pack.summary) summary.innerHTML = block(pack.summary);
      if(impact && pack.impact){
        var prefix = {ko:'→ 유류할증료 영향: ',en:'→ Surcharge impact: ',ja:'→ 燃油サーチャージへの影響: ',zh:'→ 燃油附加费影响: ',fr:'→ Impact sur la surtaxe carburant: ',de:'→ Auswirkung auf den Treibstoffzuschlag: '}[l] || '→ Surcharge impact: ';
        impact.textContent = prefix + pack.impact;
      }
      if(source && pack.sourceName) source.textContent = pack.sourceName + ' ↗';
      if(tags && Array.isArray(pack.tags)) tags.innerHTML = pack.tags.map(function(tag){ return '<span class="news-tag">'+esc(tag)+'</span>'; }).join('');
    });
  }
  function localizePagination(){
    var labels = {
      ko:{prev:'‹ 이전', next:'다음 ›'}, en:{prev:'‹ Previous', next:'Next ›'}, ja:{prev:'‹ 前へ', next:'次へ ›'}, zh:{prev:'‹ 上一页', next:'下一页 ›'}, fr:{prev:'‹ Précédent', next:'Suivant ›'}, de:{prev:'‹ Zurück', next:'Weiter ›'}
    }[lang()] || {prev:'‹ Previous', next:'Next ›'};
    document.querySelectorAll('#pagination .pg-btn').forEach(function(btn){
      var text = (btn.textContent || '').trim();
      if(/^‹/.test(text) || /이전|Previous|前へ|上一页|Précédent|Zurück/.test(text)) btn.textContent = labels.prev;
      if(/›$/.test(text) || /다음|Next|次へ|下一页|Suivant|Weiter/.test(text)) btn.textContent = labels.next;
    });
  }
  function removeStaleRenderedCards(){
    var ids = {
      'brent-wti-8784-8223-20260827':1,
      'usdkrw-1380-20260827':1,
      'hormuz-commodity-vessels-two-20260826':1,
      'brent-wti-sharp-fall-20260826':1,
      'usdkrw-1382-holds-20260826':1
    };
    document.querySelectorAll('.news-card').forEach(function(card){
      var text = card.innerText || '';
      if(ids[card.id] || /92\.17|85\.01|89\.70|83\.53|1,381|158\.91|1,382\.3|flat to slight upward|보합~소폭 상승|Hormuz 10|호르무즈 10척/.test(text)){
        card.remove();
      }
    });
  }

  if(typeof window.renderForecastPage === 'function' && !window.renderForecastPage.__aug28Wrapped){
    var prevForecast = window.renderForecastPage;
    window.renderForecastPage = function(){ var out = prevForecast.apply(this, arguments); applyForecast(); return out; };
    window.renderForecastPage.__aug28Wrapped = true;
  }
  if(typeof window.renderNews === 'function' && !window.renderNews.__aug28Wrapped){
    var prevNews = window.renderNews;
    window.renderNews = function(){ installNewsCards(); var out = prevNews.apply(this, arguments); applyNews(); return out; };
    window.renderNews.__aug28Wrapped = true;
  }
  if(typeof window.applyLanguage === 'function' && !window.applyLanguage.__aug28Wrapped){
    var prevLang = window.applyLanguage;
    window.applyLanguage = function(){ var out = prevLang.apply(this, arguments); applyForecast(); applyNews(); setTimeout(function(){ applyForecast(); applyNews(); }, 0); return out; };
    window.applyLanguage.__aug28Wrapped = true;
  }
  function rerenderNewsOnce(){
    if(window.__aug28NewsRerendered || !/\/news(?:\.html)?(?:$|[?#])/.test(location.pathname + location.search) || typeof window.renderNews !== 'function') return;
    window.__aug28NewsRerendered = true;
    installNewsCards();
    window.renderNews();
  }
  function applyCurrentSurface(){ applyForecast(); applyNews(); rerenderNewsOnce(); }
  [0,100,400,900,1600,2600,4200,6200,8200,11000,15000,22000,30000].forEach(function(ms){
    setTimeout(applyCurrentSurface, ms);
  });
  var runs = 0;
  var timer = setInterval(function(){
    applyCurrentSurface();
    runs += 1;
    if(runs >= 60) clearInterval(timer);
  }, 1000);
  var observing = false;
  if(window.MutationObserver && !window.__aug28SurfaceObserver){
    window.__aug28SurfaceObserver = new MutationObserver(function(){
      if(observing) return;
      observing = true;
      setTimeout(function(){ applyCurrentSurface(); observing = false; }, 25);
    });
    window.__aug28SurfaceObserver.observe(document.body || document.documentElement, {childList:true, subtree:true, characterData:true});
  }
})();
