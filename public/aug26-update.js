/* 2026.08.26 08:40 KST terminal update for forecast/news. */
(function(){
  var AS_OF = '2026.08.26 08:40 KST';
  var latest = {
    asOf: AS_OF,
    currentMonthNotice: '2026-09',
    forecastTargetMonth: '2026-10',
    currentAppliedMonth: '2026-08',
    septemberStage: 21,
    augustStage: 14,
    stageChange: 7,
    septemberJetFuelAvgUsdPerBbl: 149.29,
    septemberJetFuelAvgCentsPerGal: 355.46,
    previousJetFuelAvgUsdPerBbl: 119.06,
    singaporeJetFuelRecentUsdPerBbl: 154.98,
    singaporeJetFuelRecentDate: '2026-08-20',
    globalJetFuelWeeklyUsdPerBbl: 163.87,
    globalJetFuelWeeklyChangePct: 3.1,
    usdKrw: 1382.3,
    usdKrwLabel: '약 1,382.3원',
    brentUsdPerBbl: 88.58,
    brentChangePct: -3.9,
    wtiUsdPerBbl: 82.36,
    wtiChangePct: -3.1,
    wtiAsiaSessionUsdPerBbl: 80.99,
    wtiAsiaSessionChangePct: -1.7,
    hormuzCommodityVessels: 2,
    outlook: 'centered_flat_cut_probability_expanded_low_confidence',
    marketSummary: '10월 전망: 보합 중심 · 인하 가능성 확대 · 신뢰도 낮음'
  };
  window.AERO_MARKET_NUMBERS_20260826 = Object.assign({}, window.AERO_MARKET_NUMBERS_LATEST || {}, latest);
  window.AERO_MARKET_NUMBERS_LATEST = window.AERO_MARKET_NUMBERS_20260826;
  window.AERO_MARKET_SNAPSHOTS = Object.assign({}, window.AERO_MARKET_SNAPSHOTS || {}, {'2026-08-26': window.AERO_MARKET_NUMBERS_20260826});
  window.RATES = Object.assign({}, window.RATES || {}, {USD: 1 / latest.usdKrw});

  function currentLang(){
    var l = (window.getCurrentLang ? window.getCurrentLang() : (localStorage.getItem('aero_lang') || document.documentElement.lang || 'ko')).toLowerCase().split('-')[0];
    if(l === 'cn' || l === 'zh_cn' || l === 'zhcn') return 'zh';
    if(l === 'jp') return 'ja';
    return l;
  }
  function setText(sel, txt){ document.querySelectorAll(sel).forEach(function(el){ el.textContent = txt; }); }
  function setHtml(sel, html){ document.querySelectorAll(sel).forEach(function(el){ el.innerHTML = html; }); }
  function meta(name, value){
    var el = document.querySelector('meta[name="'+name+'"]');
    if(el) el.setAttribute('content', value);
  }
  function prop(name, value){
    var el = document.querySelector('meta[property="'+name+'"]');
    if(el) el.setAttribute('content', value);
  }
  function updateJsonLd(page){
    document.querySelectorAll('script[type="application/ld+json"]').forEach(function(node){
      try {
        var data = JSON.parse(node.textContent);
        data.dateModified = '2026-08-26T08:40:00+09:00';
        if(page === 'forecast'){
          data.headline = data.headline || '2026년 10월 국제선 유류할증료 전망';
          data.description = '2026년 8월 26일 기준 환율, Jet Fuel, 국제유가와 호르무즈 임시 항행로 협상을 바탕으로 10월 국제선 유류할증료 방향을 분석합니다.';
          data.url = data.url || 'https://aero-surcharge.com/forecast.html';
        } else if(page === 'news'){
          data.headline = data.headline || '2026년 9월 공시 및 10월 전망 뉴스';
          data.description = '2026년 8월 26일 기준 9월 확정 공시와 10월 전망, 글로벌 Jet Fuel, 국제유가 급락, 호르무즈 상황을 정리합니다.';
          data.url = data.url || 'https://aero-surcharge.com/news.html';
        }
        node.textContent = JSON.stringify(data);
      } catch(e) {}
    });
  }

  function forecastPack(lang){
    var en = {
      title:'October 2026 International Fuel Surcharge Outlook | FX, MOPS and Hormuz',
      desc:'As of August 26, 2026, analyze the October international fuel surcharge direction using USD/KRW, Jet Fuel/MOPS, crude oil and Hormuz temporary corridor talks.',
      page:'October 2026 International Fuel Surcharge Outlook',
      sub:'As of 2026.08.26 08:40 KST · September Level 21 confirmed · October window 2026.08.16-09.15 · FX ↓↓ / Jet Fuel ↑↑ / oil ↘↘ / Hormuz operations ↑↑↑ / diplomacy ↓↓',
      h1:'October 2026 International Fuel Surcharge Outlook',
      notice:'<strong>Confirmed:</strong> September is fixed at Level 21. October is still early in its calculation window, so no stage, route amount or probability is confirmed.',
      intro:'USD/KRW remains near 1,382 while Brent fell to USD 88.58 and WTI to USD 82.36, with WTI around USD 80.99 in the Asia session. Iran and Oman have begun discussing a joint temporary navigational corridor for Hormuz, strengthening downside and relief factors. However, global Jet Fuel rose to USD 163.87/bbl, public Hormuz commodity-vessel transit fell to 2 vessels, and a tanker near the Hormuz entrance was hit by an unidentified projectile. Current October view: centered around flat, with a larger chance of reduction, low confidence.',
      section:'October 2026 Forecast Indicators',
      th:['Item','Current status','Meaning for October'],
      rows:[
        ['October direction','Centered around flat · reduction chance expanded · low confidence','Direction only; stage and amounts are not confirmed.'],
        ['USD/KRW','around 1,382.3','Strong downside factor for KRW-denominated amounts, not a direct stage-setting variable.'],
        ['MOPS / Jet Fuel','September baseline USD 149.29/bbl · recent Singapore Jet Fuel about USD 154.98/bbl · global weekly Jet Fuel USD 163.87/bbl (+3.1%)','Jet Fuel remains strong upside pressure; the October cumulative Singapore MOPS average is still collecting.'],
        ['International oil','Brent USD 88.58 (-3.9%) · WTI USD 82.36 (-3.1%) · Asia WTI about USD 80.99','Crude has shifted into a sharp short-term fall, reducing risk premium pressure.'],
        ['Hormuz operations','Public commodity-vessel tracking: 2 vessels','Actual operations remain extremely risky; this is not total traffic and not normalization.'],
        ['Hormuz diplomacy','Iran-Oman temporary navigational corridor talks · mine-removal discussions','Diplomatic relief signal, but free navigation has not been confirmed.']
      ],
      foot:'* USD 149.29 is the September Singapore Jet Fuel calculation average. USD 154.98 is a recent Singapore Jet Fuel reference. USD 163.87 is an IATA/Platts global weekly Jet Fuel average, not Singapore MOPS and not the October average.',
      summaryTitle:'October 2026 International Fuel Surcharge Outlook Summary',
      updated:'As of 2026.08.26 08:40 KST · centered flat · reduction chance expanded · low confidence',
      summary:['September remains confirmed at Level 21, up 7 stages from August Level 14.','The September baseline is USD 149.29/bbl and 355.46 cents/gal for 2026.07.16-08.15.','October is still early in the 2026.08.16-09.15 calculation window.','USD/KRW around 1,382.3 keeps strong downside pressure on KRW conversion amounts.','Brent USD 88.58 and WTI USD 82.36 show a sharp crude-side decline; Asia WTI is around USD 80.99.','Global Jet Fuel rose to USD 163.87/bbl, +3.1% week on week, so Jet Fuel pressure remains strong.','Iran-Oman temporary Hormuz corridor talks are a relief signal, but actual public transit fell to 2 commodity vessels.','A tanker near the Hormuz entrance was hit by an unidentified projectile; the attacker is not confirmed.','Current view: centered around flat, with a larger chance of reduction, low confidence.'],
      verdictTitle:'Current October 2026 View',
      verdict1:'October stage and route amounts are not confirmed.',
      verdict2:'FX and crude oil have become stronger downside factors, but Jet Fuel, refined-product supply and actual Hormuz operations still block a confirmed reduction call.',
      verdictShort:'October outlook: centered around flat · reduction chance expanded · low confidence',
      verdictLong:'FX ↓↓ / Jet Fuel ↑↑ / oil ↘↘ / Hormuz operations ↑↑↑ / diplomacy ↓↓',
      market:['Market Brief','Crude: Brent USD 88.58/bbl (-3.9%) and WTI USD 82.36/bbl (-3.1%); Asia-session WTI around USD 80.99.','FX: USD/KRW around 1,382.3 remains a strong downside factor for KRW-denominated surcharge amounts.','Jet Fuel/MOPS: September baseline USD 149.29/bbl, recent Singapore Jet Fuel about USD 154.98/bbl, global weekly Jet Fuel USD 163.87/bbl (+3.1%). These are separate metrics.','Hormuz: Iran and Oman are discussing a temporary navigational corridor, but public commodity-vessel transit is down to 2 and a tanker was disabled after an unidentified projectile hit.','Current view: centered around flat with a larger chance of reduction, not a confirmed October stage.','Key figures: 2026.08.26 08:40 KST · USD/KRW 1,382.3 · Sep baseline 149.29 · Singapore Jet Fuel 154.98 · global Jet Fuel 163.87 · Brent 88.58 · WTI 82.36 / Asia 80.99'],
      predict:[['October outlook','Centered flat · reduction chance expanded · low confidence','neutral'],['FX','USD/KRW around 1,382.3 · KRW downside ↓↓','down'],['MOPS / Jet Fuel','Global weekly Jet Fuel USD 163.87/bbl · pressure ↑↑','up'],['International oil','Brent 88.58 · WTI 82.36 · sharp fall ↘↘','down'],['Refined products','Supply risk remains ↑↑','up'],['Hormuz operations','Public commodity-vessel transit 2 · risk ↑↑↑','up'],['Hormuz diplomacy','Temporary corridor talks · relief ↓↓','down'],['October averages','Singapore MOPS average and average FX collecting','neutral']],
      keyTitle:'Core Variables',
      keyVars:['September Level 21 confirmed','October window 2026.08.16-09.15','Current USD/KRW around 1,382.3','Average USD/KRW collecting','September baseline USD 149.29/bbl','Singapore Jet Fuel recent USD 154.98/bbl','Global weekly Jet Fuel USD 163.87/bbl','Brent 88.58','WTI 82.36 / Asia 80.99','Hormuz commodity-vessel tracking 2','Iran-Oman temporary corridor talks','Tanker hit near Hormuz entrance, attacker unconfirmed'],
      basisTitle:'September Confirmed · October Forecast Updated',
      basisBody:'The forecast target is October 2026. September official notices remain the confirmed baseline; October remains directional until calculation averages accumulate and airline notices are published.',
      ai:'Reference content — This page separates September confirmed data from October directional forecast inputs.'
    };
    var ko = Object.assign({}, en, {
      title:'2026년 10월 국제선 유류할증료 전망 | 환율·MOPS·호르무즈 분석',
      desc:'2026년 8월 26일 기준 원달러 환율, Jet Fuel·MOPS, 국제유가와 호르무즈 임시 항행로 협상을 바탕으로 10월 국제선 유류할증료 방향을 분석합니다.',
      page:'2026년 10월 국제선 유류할증료 전망',
      sub:'2026.08.26 08:40 KST 기준 · 9월 21단계 확정 · 10월 산정기간 2026.08.16~09.15 · 환율 ↓↓ / Jet Fuel ↑↑ / 유가 ↘↘ / 호르무즈 운항 ↑↑↑ / 외교 ↓↓',
      h1:'2026년 10월 국제선 유류할증료 전망',
      notice:'<strong>확인:</strong> 9월 국제선 유류할증료는 21단계로 확정됐습니다. 10월은 산정기간 초반이므로 단계·노선별 금액·확률은 확정하지 않습니다.',
      intro:'원/달러 환율은 약 1,382.3원으로 원화 강세를 유지하고, Brent는 88.58달러, WTI는 82.36달러까지 급락했으며 아시아장 WTI도 약 80.99달러까지 내려왔습니다. 이란과 오만이 호르무즈 공동 임시 항행 통로를 논의하기 시작해 완화 신호도 커졌습니다. 다만 글로벌 Jet Fuel은 163.87달러/bbl로 오히려 상승했고, 공개 호르무즈 commodity vessel 통항은 2척까지 줄었으며 호르무즈 입구 유조선 피격도 발생했습니다. 현재 10월 전망은 보합 중심 · 인하 가능성 확대 · 신뢰도 낮음입니다.',
      section:'2026년 10월 전망 지표',
      th:['항목','현재 확인 상태','10월 전망에서의 의미'],
      rows:[
        ['10월 방향성','보합 중심 · 인하 가능성 확대 · 신뢰도 낮음','방향성만 표시하며 단계·금액은 확정하지 않습니다.'],
        ['USD/KRW','약 1,382.3원','원화 환산액 강한 하락 요인입니다. 단계 자체를 직접 낮추는 변수로 쓰지 않습니다.'],
        ['MOPS/Jet Fuel','9월 기준선 149.29달러/bbl · 최근 Singapore Jet Fuel 약 154.98달러/bbl · 글로벌 주간 Jet Fuel 163.87달러/bbl(+3.1%)','항공유는 여전히 강한 상승 압력입니다. 10월 누적 Singapore MOPS 평균은 집계 중입니다.'],
        ['국제유가','Brent 88.58달러(-3.9%) · WTI 82.36달러(-3.1%) · 아시아장 WTI 약 80.99달러','국제유가는 급격한 단기 하락으로 전환되어 위험 프리미엄 부담을 낮췄습니다.'],
        ['호르무즈 실제 운항','공개 commodity vessel 추적 2척','실제 운항 위험은 극도로 높습니다. 전체 선박 숫자도 정상화도 아닙니다.'],
        ['호르무즈 외교','이란·오만 임시 항행 통로 논의 · 기뢰 제거 협의','완화 신호지만 자유항행 정상화는 확인되지 않았습니다.']
      ],
      foot:'* 149.29달러는 9월 Singapore Jet Fuel 산정 평균, 154.98달러는 최근 Singapore Jet Fuel 참고값, 163.87달러는 IATA/Platts 글로벌 주간 Jet Fuel 평균입니다. 163.87달러를 Singapore MOPS 또는 10월 평균으로 표시하지 않습니다.',
      summaryTitle:'2026년 10월 국제선 유류할증료 전망 요약',
      updated:'2026.08.26 08:40 KST 기준 · 보합 중심 · 인하 가능성 확대 · 신뢰도 낮음',
      summary:['9월은 8월 14단계에서 21단계로 +7단계 인상이 확정됐습니다.','9월 기준선은 2026.07.16~08.15 산정 평균 149.29달러/bbl, 355.46 cents/gal입니다.','10월은 2026.08.16~09.15 산정기간 초반입니다.','USD/KRW 약 1,382.3원은 원화 환산액에 강한 하락 요인입니다.','Brent 88.58달러와 WTI 82.36달러는 급격한 하락이며, 아시아장 WTI는 약 80.99달러입니다.','글로벌 Jet Fuel은 163.87달러/bbl, 전주 대비 +3.1%로 항공유 상승 압력이 유지됩니다.','이란·오만 임시 항행 통로 논의는 완화 신호지만 실제 공개 통항은 commodity vessel 2척까지 감소했습니다.','호르무즈 입구 유조선 피격은 공격 주체 미확인 상태입니다.','현재 판단은 보합 중심 · 인하 가능성 확대 · 신뢰도 낮음입니다.'],
      verdictTitle:'2026년 10월 현재 전망',
      verdict1:'10월 단계·노선별 금액은 아직 확정되지 않았습니다.',
      verdict2:'환율과 원유는 하방 요인이 강해졌지만, Jet Fuel·정제품 공급·호르무즈 실제 운항 위험 때문에 인하를 기본 시나리오로 확정하지 않습니다.',
      verdictShort:'10월 전망: 보합 중심 · 인하 가능성 확대 · 신뢰도 낮음',
      verdictLong:'환율 ↓↓ / Jet Fuel ↑↑ / 유가 ↘↘ / 호르무즈 운항 ↑↑↑ / 외교 ↓↓',
      market:['시장 브리핑','국제유가: Brent 88.58달러/bbl(-3.9%), WTI 82.36달러/bbl(-3.1%)이며 아시아장 WTI는 약 80.99달러입니다.','환율: USD/KRW 약 1,382.3원은 원화 유류할증료 금액의 강한 하락 요인입니다.','MOPS/Jet Fuel: 9월 기준선 149.29달러/bbl, 최근 Singapore Jet Fuel 약 154.98달러/bbl, 글로벌 주간 Jet Fuel 163.87달러/bbl(+3.1%)은 서로 다른 지표입니다.','호르무즈: 이란·오만 임시 항행 통로 논의는 완화 신호지만 공개 commodity vessel 통항은 2척으로 줄었고 호르무즈 입구 유조선 피격도 발생했습니다.','현재 판단: 보합 중심 · 인하 가능성 확대이며 10월 특정 단계는 확정하지 않습니다.','핵심 수치: 2026.08.26 08:40 KST · USD/KRW 1,382.3원 · 9월 기준선 149.29 · Singapore Jet Fuel 154.98 · 글로벌 Jet Fuel 163.87 · Brent 88.58 · WTI 82.36 / 아시아장 80.99'],
      predict:[['10월 전망','보합 중심 · 인하 가능성 확대 · 신뢰도 낮음','neutral'],['환율','USD/KRW 약 1,382.3원 · 원화 금액 하락 ↓↓','down'],['MOPS/Jet Fuel','글로벌 주간 Jet Fuel 163.87달러/bbl · 상승 ↑↑','up'],['국제유가','Brent 88.58 · WTI 82.36 · 급격한 하락 ↘↘','down'],['정유/정제품','공급 위험 유지 ↑↑','up'],['호르무즈 운항','공개 commodity vessel 2척 · 위험 ↑↑↑','up'],['호르무즈 외교','임시 항행로 논의 · 완화 ↓↓','down'],['10월 평균','Singapore MOPS 평균·평균환율 집계 중','neutral']],
      keyTitle:'핵심 변수',
      keyVars:['9월 21단계 확정','10월 산정기간 2026.08.16~09.15','현재 USD/KRW 약 1,382.3원','평균 USD/KRW 집계 중','9월 기준선 149.29달러/bbl','Singapore Jet Fuel 최근 154.98달러/bbl','글로벌 주간 Jet Fuel 163.87달러/bbl','Brent 88.58','WTI 82.36 / 아시아장 80.99','호르무즈 commodity vessel 2척','이란·오만 임시 항행 통로 논의','호르무즈 입구 유조선 피격, 공격 주체 미확인'],
      basisTitle:'9월 확정 · 10월 전망 갱신',
      basisBody:'현재 전망 목표는 2026년 10월입니다. 9월 확정 공시는 기준선으로 유지하고, 10월은 평균 항공유와 평균환율이 충분히 쌓이기 전까지 방향성만 표시합니다.',
      ai:'참고 콘텐츠 — 이 페이지는 9월 확정 데이터와 10월 방향성 예측을 분리합니다.'
    });
    var ja = Object.assign({}, en, {title:'2026年10月国際線燃油サーチャージ見通し | 為替・MOPS・ホルムズ',desc:'2026年8月26日時点、為替、Jet Fuel/MOPS、原油、ホルムズ暫定航行回廊協議を基に10月方向性を分析します。',page:'2026年10月国際線燃油サーチャージ見通し',sub:'2026.08.26 08:40 KST時点 · 9月21段階確定 · 10月算定期間2026.08.16~09.15 · 為替↓↓ / Jet Fuel ↑↑ / 原油↘↘ / ホルムズ運航↑↑↑ / 外交↓↓',h1:'2026年10月国際線燃油サーチャージ見通し',notice:'<strong>確認:</strong> 9月は21段階で確定しました。10月は算定期間序盤のため段階・金額・確率は確定しません。',intro:'USD/KRWは約1,382.3を維持し、Brentは88.58ドル、WTIは82.36ドル、アジア時間WTIは約80.99ドルまで下落しました。イランとオマーンはホルムズ暫定航行回廊を協議し始めましたが、世界Jet Fuelは163.87ドル/bblへ上昇し、公開commodity vessel通航は2隻まで低下しました。現在の10月見通しは横ばい中心、引き下げ可能性拡大、信頼度低いです。',section:'2026年10月見通し指標',th:['項目','現在の確認状況','10月見通しでの意味'],rows:[['10月方向性','横ばい中心 · 引き下げ可能性拡大 · 信頼度低い','方向性のみ表示し、段階・金額は確定しません。'],['USD/KRW','約1,382.3','ウォン換算額の強い下押し要因です。'],['MOPS / Jet Fuel','9月基準149.29ドル/bbl · Singapore Jet Fuel最近154.98ドル/bbl · 世界週次Jet Fuel 163.87ドル/bbl(+3.1%)','Jet Fuelは強い上昇圧力です。10月Singapore MOPS平均は集計中です。'],['国際原油','Brent 88.58ドル · WTI 82.36ドル · アジアWTI約80.99ドル','原油は急落し、リスクプレミアムを下げました。'],['ホルムズ運航','公開commodity vessel追跡2隻','実運航リスクは極めて高く、全体通航量でも正常化でもありません。'],['ホルムズ外交','イラン・オマーン暫定航行回廊協議','緩和信号ですが自由航行正常化は未確認です。']],summaryTitle:'2026年10月国際線燃油サーチャージ見通し要約',updated:'2026.08.26 08:40 KST時点 · 横ばい中心 · 引き下げ可能性拡大 · 信頼度低い',summary:['9月は21段階で確定し、8月14段階から+7段階です。','9月基準は149.29ドル/bbl、355.46 cents/galです。','10月は2026.08.16~09.15算定期間の序盤です。','USD/KRW約1,382.3はウォン換算額を下げる要因です。','Brent 88.58ドル、WTI 82.36ドル、アジアWTI約80.99ドルで原油は急落しています。','世界Jet Fuelは163.87ドル/bbl、前週比+3.1%です。','ホルムズ暫定航行回廊協議は緩和信号ですが、公開通航は2隻です。','ホルムズ入口のタンカー被弾は攻撃主体未確認です。','現在判断は横ばい中心、引き下げ可能性拡大、信頼度低いです。']});
    var zh = Object.assign({}, en, {title:'2026年10月国际线燃油附加费展望 | 汇率·MOPS·霍尔木兹',desc:'截至2026年8月26日，基于汇率、Jet Fuel/MOPS、国际油价和霍尔木兹临时航行通道谈判分析10月方向。',page:'2026年10月国际线燃油附加费展望',sub:'截至2026.08.26 08:40 KST · 9月第21档确认 · 10月计算期2026.08.16~09.15 · 汇率↓↓ / Jet Fuel ↑↑ / 油价↘↘ / 霍尔木兹通行↑↑↑ / 外交↓↓',h1:'2026年10月国际线燃油附加费展望',notice:'<strong>确认:</strong> 9月已确认为第21档。10月仍处计算期初期，因此不确认档位、金额或概率。',intro:'USD/KRW维持约1,382.3，Brent降至88.58美元，WTI降至82.36美元，亚洲时段WTI约80.99美元。伊朗与阿曼开始讨论霍尔木兹临时航行通道，但全球Jet Fuel升至163.87美元/bbl，公开commodity vessel通行降至2艘。当前10月展望为以持平为中心、下调可能性扩大、可信度低。',section:'2026年10月展望指标',th:['项目','当前确认状态','对10月展望的意义'],rows:[['10月方向','以持平为中心 · 下调可能性扩大 · 可信度低','仅显示方向，档位和金额不确认。'],['USD/KRW','约1,382.3','韩元换算金额的强下行因素。'],['MOPS / Jet Fuel','9月基准149.29美元/bbl · Singapore Jet Fuel近期154.98美元/bbl · 全球周度Jet Fuel 163.87美元/bbl(+3.1%)','Jet Fuel仍为强上行压力，10月Singapore MOPS均值仍在统计。'],['国际油价','Brent 88.58美元 · WTI 82.36美元 · 亚洲WTI约80.99美元','原油急跌，风险溢价压力下降。'],['霍尔木兹通行','公开commodity vessel跟踪2艘','实际通行风险极高，不代表全部船舶数量，也不是正常化。'],['霍尔木兹外交','伊朗与阿曼讨论临时航行通道','为缓和信号，但自由航行正常化尚未确认。']],summaryTitle:'2026年10月国际线燃油附加费展望摘要',updated:'截至2026.08.26 08:40 KST · 以持平为中心 · 下调可能性扩大 · 可信度低',summary:['9月已确认为第21档，较8月第14档增加7档。','9月基准为149.29美元/bbl和355.46 cents/gal。','10月仍处2026.08.16~09.15计算期初期。','USD/KRW约1,382.3对韩元换算金额构成下行压力。','Brent 88.58美元、WTI 82.36美元，亚洲WTI约80.99美元，油价急跌。','全球Jet Fuel为163.87美元/bbl，周环比+3.1%。','霍尔木兹临时航行通道谈判是缓和信号，但公开通行仅2艘。','霍尔木兹入口油轮遇袭的攻击方未确认。','当前判断为以持平为中心、下调可能性扩大、可信度低。']});
    var fr = Object.assign({}, en, {title:'Perspective octobre 2026 | FX, MOPS et Hormuz',desc:'Au 26 août 2026, analyse de la direction d’octobre avec FX, Jet Fuel/MOPS, pétrole et discussions de corridor temporaire à Hormuz.',page:'Perspective surtaxe carburant internationale octobre 2026',sub:'Au 2026.08.26 08:40 KST · septembre niveau 21 confirmé · fenêtre octobre 2026.08.16-09.15 · FX ↓↓ / Jet Fuel ↑↑ / pétrole ↘↘ / Hormuz opérations ↑↑↑ / diplomatie ↓↓',h1:'Perspective surtaxe carburant internationale octobre 2026',notice:'<strong>Confirmé:</strong> septembre est fixé au niveau 21. Octobre est au début de sa période de calcul; aucun niveau, montant ou probabilité n’est confirmé.',intro:'USD/KRW reste près de 1 382.3, Brent recule à 88.58 USD et WTI à 82.36 USD, avec environ 80.99 USD en séance asiatique. L’Iran et Oman discutent d’un corridor temporaire à Hormuz, mais le Jet Fuel mondial monte à 163.87 USD/bbl et le suivi public des commodity vessels tombe à 2. Vue octobre: centrée sur stable, probabilité de baisse accrue, faible confiance.',section:'Indicateurs de perspective octobre 2026',th:['Élément','État actuel','Sens pour octobre'],rows:[['Direction octobre','Centrée sur stable · probabilité de baisse accrue · faible confiance','Direction seulement; niveau et montants non confirmés.'],['USD/KRW','env. 1 382.3','Fort facteur baissier pour les montants KRW.'],['MOPS / Jet Fuel','Base septembre 149.29 USD/bbl · Singapore Jet Fuel récent 154.98 USD/bbl · Jet Fuel mondial 163.87 USD/bbl(+3.1%)','Le Jet Fuel reste une forte pression haussière; moyenne Singapore MOPS en collecte.'],['Pétrole international','Brent 88.58 USD · WTI 82.36 USD · WTI Asie env. 80.99 USD','Le pétrole baisse fortement à court terme.'],['Opérations Hormuz','Suivi public commodity vessel: 2 navires','Risque opérationnel extrême; pas un total de trafic ni une normalisation.'],['Diplomatie Hormuz','Discussions Iran-Oman sur un corridor temporaire','Signal d’apaisement, sans normalisation confirmée.']],summaryTitle:'Résumé perspective octobre 2026',updated:'Au 2026.08.26 08:40 KST · stable centré · baisse plus probable · faible confiance'});
    var de = Object.assign({}, en, {title:'Oktober-2026 Ausblick | FX, MOPS und Hormuz',desc:'Stand 26. August 2026: Oktober-Richtung mit FX, Jet Fuel/MOPS, Öl und Gesprächen über einen temporären Hormuz-Korridor.',page:'Oktober-2026 internationaler Treibstoffzuschlag Ausblick',sub:'Stand 2026.08.26 08:40 KST · September Stufe 21 bestätigt · Oktober-Fenster 2026.08.16-09.15 · FX ↓↓ / Jet Fuel ↑↑ / Öl ↘↘ / Hormuz Betrieb ↑↑↑ / Diplomatie ↓↓',h1:'Oktober-2026 internationaler Treibstoffzuschlag Ausblick',notice:'<strong>Bestätigt:</strong> September ist Stufe 21. Oktober ist noch früh im Berechnungsfenster; Stufe, Beträge und Wahrscheinlichkeit sind nicht bestätigt.',intro:'USD/KRW bleibt nahe 1.382,3, Brent fiel auf 88.58 USD und WTI auf 82.36 USD, mit etwa 80.99 USD in Asien. Iran und Oman sprechen über einen temporären Hormuz-Korridor, aber globales Jet Fuel steigt auf 163.87 USD/bbl und öffentliches commodity-vessel Tracking fällt auf 2. Oktober-Sicht: stabil im Zentrum, Senkungschance größer, geringe Sicherheit.',section:'Oktober-2026 Ausblicksindikatoren',th:['Punkt','Aktueller Stand','Bedeutung für Oktober'],rows:[['Oktober-Richtung','Stabil zentriert · Senkungschance größer · geringe Sicherheit','Nur Richtung; Stufe und Beträge nicht bestätigt.'],['USD/KRW','ca. 1.382,3','Starker Abwärtsfaktor für KRW-Beträge.'],['MOPS / Jet Fuel','September-Basis 149.29 USD/bbl · Singapore Jet Fuel zuletzt 154.98 USD/bbl · globales Wochen-Jet-Fuel 163.87 USD/bbl(+3.1%)','Jet Fuel bleibt starker Aufwärtsdruck; Oktober-Singapore-MOPS-Durchschnitt wird gesammelt.'],['Internationales Öl','Brent 88.58 USD · WTI 82.36 USD · Asien-WTI ca. 80.99 USD','Öl fällt kurzfristig stark.'],['Hormuz Betrieb','Öffentliches commodity-vessel Tracking: 2 Schiffe','Extremes Betriebsrisiko; kein Gesamtverkehr und keine Normalisierung.'],['Hormuz Diplomatie','Iran-Oman-Gespräche über temporären Korridor','Entspannungssignal, aber keine bestätigte Normalisierung.']],summaryTitle:'Oktober-2026 Ausblick Zusammenfassung',updated:'Stand 2026.08.26 08:40 KST · stabil zentriert · Senkungschance größer · geringe Sicherheit'});
    return {ko:ko,en:en,ja:ja,zh:zh,fr:fr,de:de}[lang] || en;
  }

  function applyForecast(){
    if(!/forecast\.html(?:$|[?#])/.test(location.pathname)) return;
    var p = forecastPack(currentLang());
    document.title = p.title;
    meta('description', p.desc);
    prop('og:title', p.title);
    prop('og:description', p.desc);
    prop('article:modified_time', '2026-08-26T08:40:00+09:00');
    setText('[data-i18n="fore.pageTitle"]', p.page);
    setText('[data-i18n="fore.pageSub"]', p.sub);
    setText('[data-i18n="fore.h1"]', p.h1);
    setHtml('[data-i18n-html="fore.notice"]', p.notice);
    setText('[data-i18n="fore.intro"]', p.intro);
    setText('[data-i18n="fore.section.indicators"]', p.section);
    var thead = document.getElementById('indicatorThead');
    if(thead) thead.innerHTML = '<tr>'+p.th.map(function(h){return '<th>'+h+'</th>';}).join('')+'</tr>';
    var tbody = document.getElementById('indicatorTbody');
    if(tbody) tbody.innerHTML = p.rows.map(function(r){return '<tr><td><strong>'+r[0]+'</strong></td><td>'+r[1]+'</td><td class="impact-up">'+r[2]+'</td></tr>';}).join('');
    setText('[data-i18n="fore.indicator.footnote"]', p.foot);
    var summaryCard = document.getElementById('summaryCard');
    if(summaryCard) summaryCard.innerHTML = '<div class="nsc-title">'+p.summaryTitle+'</div><div class="nsc-updated">'+p.updated+'</div><ul>'+p.summary.map(function(s){return '<li>'+s+'</li>';}).join('')+'</ul>';
    var verdict = document.getElementById('verdictBox');
    if(verdict) verdict.innerHTML = '<div class="verdict-title">'+p.verdictTitle+'</div>'+p.verdict1+'<br>'+p.verdict2+'<br><br><strong>'+p.verdictShort+'</strong><br><strong>'+p.verdictLong+'</strong>';
    var market = document.getElementById('marketBriefBox');
    if(market) market.innerHTML = '<div class="mb-title">'+p.market[0]+'</div>'+p.market.slice(1,5).map(function(s){return '<div class="mb-item">'+s+'</div>';}).join('')+'<div class="mb-summary">'+p.market[5]+'</div><div class="mb-summary" style="margin-top:6px;color:#558B2F;">'+p.market[6]+'</div>';
    var pred = document.getElementById('predictFactors');
    if(pred) pred.innerHTML = p.predict.map(function(it){return '<div class="predict-factor"><div class="pf-label">'+it[0]+'</div><div class="pf-val '+it[2]+'">'+it[1]+'</div></div>';}).join('');
    var kvTitle = document.querySelector('.key-vars-box .kv-title');
    if(kvTitle) kvTitle.textContent = p.keyTitle;
    var keyGrid = document.getElementById('keyVarsGrid');
    if(keyGrid) keyGrid.innerHTML = p.keyVars.map(function(s){return '<div class="kv-chip">'+s+'</div>';}).join('');
    var basis = document.querySelectorAll('.basis-box [data-i18n]');
    if(basis[0]) basis[0].textContent = p.basisTitle;
    if(basis[1]) basis[1].textContent = p.basisBody;
    setText('.ai-notice [data-i18n="fore.aiNotice"]', p.ai);
    updateJsonLd('forecast');
  }

  function cardLocales(en, ko, ja, zh, fr, de){ return {en:en, ko:ko, ja:ja || en, zh:zh || en, fr:fr || en, de:de || en}; }
  var newsCards = [
    {id:'iran-oman-hormuz-corridor-20260826', category:'geo', priority:1, date:'2026-08-26', updatedAt:'2026-08-26T08:40:00+09:00', badge:'호르무즈 외교', aiSummary:true, relevanceScore:1, title:'이란·오만, 호르무즈 임시 항행 통로 논의', aiBrief:'양국이 공동 임시 항행 통로와 일부 기뢰 제거를 논의하며 외교적 완화 신호가 커졌습니다.', summary:'선택적 선박 허가보다 진전된 협의지만 자유항행 정상화는 확인되지 않았습니다.', impact:'호르무즈 외교는 완화 신호로 반영하되 실제 운항 위험과 분리합니다.', sourceName:'Hormuz corridor reference', sourceUrl:'forecast.html', tags:['호르무즈','이란·오만','임시 항행로','완화 신호'], i18n:cardLocales({title:'Iran and Oman discuss temporary Hormuz navigational corridor', aiBrief:'Talks on a joint temporary corridor and mine-removal work add a diplomatic relief signal.', summary:'This is a step beyond selective vessel permission, but free-navigation normalization is not confirmed.', impact:'Hormuz diplomacy is treated as relief while actual operations remain separate.', tags:['Hormuz','Iran-Oman','temporary corridor','relief signal']},{title:'이란·오만, 호르무즈 임시 항행 통로 논의', aiBrief:'양국이 공동 임시 항행 통로와 일부 기뢰 제거를 논의하며 외교적 완화 신호가 커졌습니다.', summary:'선택적 선박 허가보다 진전된 협의지만 자유항행 정상화는 확인되지 않았습니다.', impact:'호르무즈 외교는 완화 신호로 반영하되 실제 운항 위험과 분리합니다.', tags:['호르무즈','이란·오만','임시 항행로','완화 신호']},{title:'イラン・オマーン、ホルムズ暫定航行回廊を協議', aiBrief:'共同暫定回廊と一部機雷除去協議が外交的緩和信号になっています。', summary:'選択的許可より進んだ協議ですが自由航行正常化は未確認です。', impact:'外交緩和と実運航リスクを分けて反映します。', tags:['ホルムズ','イラン・オマーン','暫定回廊','緩和']},{title:'伊朗与阿曼讨论霍尔木兹临时航行通道', aiBrief:'共同临时通道和部分扫雷讨论带来外交缓和信号。', summary:'这比选择性放行更进一步，但自由航行正常化尚未确认。', impact:'将外交缓和与实际通行风险分开处理。', tags:['霍尔木兹','伊朗阿曼','临时通道','缓和']})},
    {id:'brent-wti-sharp-fall-20260826', category:'market', priority:2, date:'2026-08-26', updatedAt:'2026-08-26T08:40:00+09:00', badge:'국제유가', aiSummary:true, relevanceScore:.99, title:'Brent 88.58달러·WTI 82.36달러 급락', aiBrief:'미국 제재 이후 위험 프리미엄이 축소되며 Brent와 WTI가 급락했고, 아시아장 WTI는 약 80.99달러까지 내려왔습니다.', summary:'원유는 10월 전망에서 강한 하방 요인으로 바뀌었습니다.', impact:'국제유가 상태를 급격한 하락으로 보정합니다.', sourceName:'Crude market reference', sourceUrl:'forecast.html', tags:['Brent 88.58','WTI 82.36','WTI 80.99','급락'], i18n:cardLocales({title:'Brent USD 88.58 and WTI USD 82.36 drop sharply', aiBrief:'Risk premium narrowed after U.S. sanctions; Asia-session WTI moved around USD 80.99.', summary:'Crude has become a strong downside factor for the October outlook.', impact:'Crude status is updated to sharp fall.', tags:['Brent 88.58','WTI 82.36','WTI 80.99','sharp fall']},{title:'Brent 88.58달러·WTI 82.36달러 급락', aiBrief:'미국 제재 이후 위험 프리미엄이 축소되며 Brent와 WTI가 급락했고, 아시아장 WTI는 약 80.99달러까지 내려왔습니다.', summary:'원유는 10월 전망에서 강한 하방 요인으로 바뀌었습니다.', impact:'국제유가 상태를 급격한 하락으로 보정합니다.', tags:['Brent 88.58','WTI 82.36','WTI 80.99','급락']})},
    {id:'global-jetfuel-16387-20260826', category:'market', priority:3, date:'2026-08-26', updatedAt:'2026-08-26T08:40:00+09:00', badge:'Jet Fuel', aiSummary:true, relevanceScore:.98, title:'글로벌 Jet Fuel 163.87달러…전주 대비 +3.1%', aiBrief:'원유 급락과 달리 IATA/Platts 글로벌 주간 Jet Fuel은 163.87달러/bbl로 상승했습니다.', summary:'이 값은 글로벌 주간 평균이며 Singapore MOPS나 10월 누적 평균이 아닙니다.', impact:'MOPS/Jet Fuel은 강한 상승 압력으로 유지합니다.', sourceName:'Global Jet Fuel reference', sourceUrl:'forecast.html', tags:['Jet Fuel','163.87','+3.1%','MOPS 구분'], i18n:cardLocales({title:'Global Jet Fuel rises to USD 163.87, up 3.1% WoW', aiBrief:'Unlike crude, the IATA/Platts global weekly Jet Fuel average rose to USD 163.87/bbl.', summary:'This is a global weekly average, not Singapore MOPS or the October cumulative average.', impact:'Jet Fuel remains strong upside pressure.', tags:['Jet Fuel','163.87','+3.1%','separate from MOPS']},{title:'글로벌 Jet Fuel 163.87달러…전주 대비 +3.1%', aiBrief:'원유 급락과 달리 IATA/Platts 글로벌 주간 Jet Fuel은 163.87달러/bbl로 상승했습니다.', summary:'이 값은 글로벌 주간 평균이며 Singapore MOPS나 10월 누적 평균이 아닙니다.', impact:'MOPS/Jet Fuel은 강한 상승 압력으로 유지합니다.', tags:['Jet Fuel','163.87','+3.1%','MOPS 구분']})},
    {id:'hormuz-commodity-vessels-two-20260826', category:'geo', priority:4, date:'2026-08-26', updatedAt:'2026-08-26T08:40:00+09:00', badge:'호르무즈 운항', aiSummary:true, relevanceScore:.97, title:'호르무즈 공개 commodity vessel 통항 2척까지 감소', aiBrief:'공개 추적 기준 commodity vessel 통항이 2척 수준까지 떨어져 실제 운항은 개선되지 않았습니다.', summary:'이는 전체 선박 확정 숫자가 아니라 공개 commodity vessel 추적값입니다.', impact:'호르무즈 실제 운항 위험은 극도로 높은 위험으로 유지합니다.', sourceName:'Kpler public tracking reference', sourceUrl:'forecast.html', tags:['호르무즈','commodity vessel','2척','운항 위험'], i18n:cardLocales({title:'Hormuz public commodity-vessel tracking falls to 2', aiBrief:'Public commodity-vessel tracking fell to around 2, so actual operations have not improved.', summary:'This is a public commodity-vessel tracking value, not confirmed total traffic.', impact:'Actual Hormuz operations remain extreme risk.', tags:['Hormuz','commodity vessel','2','operations risk']},{title:'호르무즈 공개 commodity vessel 통항 2척까지 감소', aiBrief:'공개 추적 기준 commodity vessel 통항이 2척 수준까지 떨어져 실제 운항은 개선되지 않았습니다.', summary:'이는 전체 선박 확정 숫자가 아니라 공개 commodity vessel 추적값입니다.', impact:'호르무즈 실제 운항 위험은 극도로 높은 위험으로 유지합니다.', tags:['호르무즈','commodity vessel','2척','운항 위험']})},
    {id:'hormuz-tanker-hit-20260826', category:'geo', priority:5, date:'2026-08-26', updatedAt:'2026-08-26T08:40:00+09:00', badge:'선박 피격', aiSummary:true, relevanceScore:.96, title:'호르무즈 입구 유조선 피격…운항 불능', aiBrief:'호르무즈 입구 인근 유조선이 정체불명의 발사체에 맞아 운항 불능 상태로 보고됐습니다.', summary:'공격 주체는 확인되지 않았습니다. 해협의 실질 운항 위험은 높은 상태입니다.', impact:'공격 주체를 단정하지 않고 운항 위험으로만 반영합니다.', sourceName:'Tanker incident reference', sourceUrl:'forecast.html', tags:['호르무즈','유조선 피격','공격 주체 미확인','운항 불능'], i18n:cardLocales({title:'Tanker hit near Hormuz entrance and disabled', aiBrief:'A tanker near the Hormuz entrance was reportedly disabled after being hit by an unidentified projectile.', summary:'The attacker is not confirmed; operational risk remains high.', impact:'The incident is reflected as operational risk without assigning responsibility.', tags:['Hormuz','tanker hit','attacker unconfirmed','disabled']},{title:'호르무즈 입구 유조선 피격…운항 불능', aiBrief:'호르무즈 입구 인근 유조선이 정체불명의 발사체에 맞아 운항 불능 상태로 보고됐습니다.', summary:'공격 주체는 확인되지 않았습니다. 해협의 실질 운항 위험은 높은 상태입니다.', impact:'공격 주체를 단정하지 않고 운항 위험으로만 반영합니다.', tags:['호르무즈','유조선 피격','공격 주체 미확인','운항 불능']})},
    {id:'hormuz-mine-removal-claims-20260826', category:'geo', priority:6, date:'2026-08-26', updatedAt:'2026-08-26T08:40:00+09:00', badge:'기뢰', aiSummary:true, relevanceScore:.94, title:'기뢰 제거, 미국 주장과 이란·오만 추가 협의 병존', aiBrief:'미국은 국제수역 기뢰 제거 완료를 주장하지만, 이란·오만은 임시 항행로의 추가 기뢰 제거를 논의 중입니다.', summary:'기관별 발표가 일치하지 않아 완전 제거 확정으로 표시하지 않습니다.', impact:'기뢰 상태는 주장 차이로 분리합니다.', sourceName:'Mine-removal reference', sourceUrl:'forecast.html', tags:['기뢰','미국 주장','이란·오만','확정 아님'], i18n:cardLocales({title:'Mine-removal claims differ between U.S. claims and Iran-Oman talks', aiBrief:'The U.S. claims international-water mines were removed, while Iran and Oman discuss additional clearance for a temporary corridor.', summary:'Because statements differ, the site does not mark complete clearance as confirmed.', impact:'Mine status is shown as competing claims.', tags:['mines','U.S. claim','Iran-Oman','not confirmed']},{title:'기뢰 제거, 미국 주장과 이란·오만 추가 협의 병존', aiBrief:'미국은 국제수역 기뢰 제거 완료를 주장하지만, 이란·오만은 임시 항행로의 추가 기뢰 제거를 논의 중입니다.', summary:'기관별 발표가 일치하지 않아 완전 제거 확정으로 표시하지 않습니다.', impact:'기뢰 상태는 주장 차이로 분리합니다.', tags:['기뢰','미국 주장','이란·오만','확정 아님']})},
    {id:'usdkrw-1382-holds-20260826', category:'fx', priority:7, date:'2026-08-26', updatedAt:'2026-08-26T08:40:00+09:00', badge:'환율', aiSummary:true, relevanceScore:.93, title:'원/달러 약 1,382.3원…원화 강세 유지', aiBrief:'USD/KRW가 1,380원대 초반을 유지하며 원화 환산액 하방 압력이 이어집니다.', summary:'환율은 단계 자체보다 USD 기준 유류할증료의 원화 환산액에 영향을 줍니다.', impact:'환율은 강한 하락 요인으로 유지합니다.', sourceName:'FX reference', sourceUrl:'forecast.html', tags:['USD/KRW','1,382.3','환율','원화 강세'], i18n:cardLocales({title:'USD/KRW holds near 1,382.3', aiBrief:'USD/KRW stays in the low 1,380s, maintaining downside pressure on KRW conversion amounts.', summary:'FX affects KRW conversion amounts more than the surcharge stage itself.', impact:'FX remains a strong downside factor.', tags:['USD/KRW','1,382.3','FX','KRW strength']},{title:'원/달러 약 1,382.3원…원화 강세 유지', aiBrief:'USD/KRW가 1,380원대 초반을 유지하며 원화 환산액 하방 압력이 이어집니다.', summary:'환율은 단계 자체보다 USD 기준 유류할증료의 원화 환산액에 영향을 줍니다.', impact:'환율은 강한 하락 요인으로 유지합니다.', tags:['USD/KRW','1,382.3','환율','원화 강세']})}
  ];
  var extraCardLocales = {
    'iran-oman-hormuz-corridor-20260826': {
      fr:{title:'Iran et Oman discutent d’un corridor temporaire à Hormuz', aiBrief:'Un corridor temporaire conjoint et des travaux de déminage partiel apportent un signal diplomatique d’apaisement.', summary:'C’est une avancée par rapport aux permissions sélectives, mais la normalisation de la libre navigation n’est pas confirmée.', impact:'La diplomatie Hormuz est traitée comme apaisement, séparée du risque opérationnel.', tags:['Hormuz','Iran-Oman','corridor temporaire','apaisement']},
      de:{title:'Iran und Oman beraten temporären Hormuz-Navigationskorridor', aiBrief:'Gespräche über einen gemeinsamen temporären Korridor und teilweise Minenräumung liefern ein diplomatisches Entspannungssignal.', summary:'Das geht über selektive Schiffsgenehmigungen hinaus, bestätigt aber keine Normalisierung freier Navigation.', impact:'Hormuz-Diplomatie wird als Entlastung erfasst, getrennt vom Betriebsrisiko.', tags:['Hormuz','Iran-Oman','temporärer Korridor','Entspannung']}
    },
    'brent-wti-sharp-fall-20260826': {
      ja:{title:'Brent 88.58ドル・WTI 82.36ドルへ急落', aiBrief:'米国制裁後にリスクプレミアムが縮小し、アジア時間WTIは約80.99ドルまで下落しました。', summary:'原油は10月見通しで強い下押し要因に変わりました。', impact:'原油状態を急落に修正します。', tags:['Brent 88.58','WTI 82.36','WTI 80.99','急落']},
      zh:{title:'Brent 88.58美元、WTI 82.36美元急跌', aiBrief:'美国制裁后风险溢价缩小，亚洲时段WTI约降至80.99美元。', summary:'原油已成为10月展望的强下行因素。', impact:'将油价状态修正为急跌。', tags:['Brent 88.58','WTI 82.36','WTI 80.99','急跌']},
      fr:{title:'Brent 88.58 USD et WTI 82.36 USD chutent fortement', aiBrief:'La prime de risque a diminué après les sanctions américaines; le WTI asiatique évolue autour de 80.99 USD.', summary:'Le pétrole devient un fort facteur baissier pour octobre.', impact:'Le statut pétrole passe à forte baisse.', tags:['Brent 88.58','WTI 82.36','WTI 80.99','forte baisse']},
      de:{title:'Brent 88.58 USD und WTI 82.36 USD fallen stark', aiBrief:'Die Risikoprämie sank nach den US-Sanktionen; WTI lag in Asien bei etwa 80.99 USD.', summary:'Öl ist nun ein starker Abwärtsfaktor für den Oktober-Ausblick.', impact:'Ölstatus wird auf starken Rückgang gesetzt.', tags:['Brent 88.58','WTI 82.36','WTI 80.99','starker Rückgang']}
    },
    'global-jetfuel-16387-20260826': {
      ja:{title:'世界Jet Fuel 163.87ドル、前週比+3.1%', aiBrief:'原油急落と異なり、IATA/Platts世界週次Jet Fuelは163.87ドル/bblへ上昇しました。', summary:'これは世界週次平均であり、Singapore MOPSや10月累積平均ではありません。', impact:'Jet Fuelは強い上昇圧力として維持します。', tags:['Jet Fuel','163.87','+3.1%','MOPS区別']},
      zh:{title:'全球Jet Fuel 163.87美元，周环比+3.1%', aiBrief:'不同于原油急跌，IATA/Platts全球周度Jet Fuel升至163.87美元/bbl。', summary:'这是全球周度均值，不是Singapore MOPS或10月累计均值。', impact:'Jet Fuel维持强上行压力。', tags:['Jet Fuel','163.87','+3.1%','区别MOPS']},
      fr:{title:'Jet Fuel mondial à 163.87 USD, +3.1% sur une semaine', aiBrief:'Contrairement au pétrole, la moyenne hebdomadaire IATA/Platts monte à 163.87 USD/bbl.', summary:'C’est une moyenne mondiale hebdomadaire, pas le Singapore MOPS ni la moyenne d’octobre.', impact:'Le Jet Fuel reste une forte pression haussière.', tags:['Jet Fuel','163.87','+3.1%','séparé du MOPS']},
      de:{title:'Globales Jet Fuel 163.87 USD, +3.1% zur Vorwoche', aiBrief:'Anders als Öl stieg der IATA/Platts-Wochendurchschnitt auf 163.87 USD/bbl.', summary:'Das ist ein globaler Wochendurchschnitt, nicht Singapore MOPS oder Oktober-Durchschnitt.', impact:'Jet Fuel bleibt starker Aufwärtsdruck.', tags:['Jet Fuel','163.87','+3.1%','getrennt von MOPS']}
    },
    'hormuz-commodity-vessels-two-20260826': {
      ja:{title:'ホルムズ公開commodity vessel通航、2隻まで減少', aiBrief:'公開追跡でcommodity vessel通航が2隻水準まで落ち、実運航は改善していません。', summary:'これは全船舶の確定数ではなく公開commodity vessel追跡値です。', impact:'ホルムズ実運航リスクは極めて高いままです。', tags:['ホルムズ','commodity vessel','2隻','運航リスク']},
      zh:{title:'霍尔木兹公开commodity vessel通行降至2艘', aiBrief:'公开跟踪显示commodity vessel通行降至2艘，实际通行尚未改善。', summary:'这不是全部船舶确认数，而是公开commodity vessel跟踪值。', impact:'霍尔木兹实际通行风险仍极高。', tags:['霍尔木兹','commodity vessel','2艘','通行风险']},
      fr:{title:'Hormuz: suivi public commodity vessel tombé à 2 navires', aiBrief:'Le suivi public tombe autour de 2 navires, donc l’exploitation ne s’améliore pas.', summary:'C’est une valeur de suivi public commodity vessel, pas un total confirmé.', impact:'Le risque opérationnel à Hormuz reste extrême.', tags:['Hormuz','commodity vessel','2 navires','risque opérationnel']},
      de:{title:'Hormuz: öffentliches commodity-vessel Tracking fällt auf 2 Schiffe', aiBrief:'Das öffentliche Tracking fällt auf rund 2 Schiffe; der Betrieb verbessert sich nicht.', summary:'Dies ist ein öffentlicher commodity-vessel Wert, kein bestätigter Gesamtverkehr.', impact:'Das tatsächliche Hormuz-Risiko bleibt extrem.', tags:['Hormuz','commodity vessel','2 Schiffe','Betriebsrisiko']}
    },
    'hormuz-tanker-hit-20260826': {
      ja:{title:'ホルムズ入口でタンカー被弾、運航不能', aiBrief:'ホルムズ入口付近のタンカーが未確認の発射体を受け運航不能と報告されました。', summary:'攻撃主体は確認されていません。海峡の実質運航リスクは高いままです。', impact:'主体を断定せず運航リスクとして反映します。', tags:['ホルムズ','タンカー被弾','攻撃主体未確認','運航不能']},
      zh:{title:'霍尔木兹入口油轮遇袭，无法航行', aiBrief:'霍尔木兹入口附近油轮被不明发射物击中并被报告无法航行。', summary:'攻击方尚未确认，海峡实际通行风险仍高。', impact:'不判断攻击方，仅作为通行风险反映。', tags:['霍尔木兹','油轮遇袭','攻击方未确认','无法航行']},
      fr:{title:'Un tanker touché près de l’entrée d’Hormuz, immobilisé', aiBrief:'Un tanker aurait été immobilisé après un impact de projectile non identifié.', summary:'L’assaillant n’est pas confirmé; le risque opérationnel reste élevé.', impact:'L’incident est traité comme risque opérationnel sans attribution.', tags:['Hormuz','tanker touché','assaillant non confirmé','immobilisé']},
      de:{title:'Tanker nahe Hormuz-Eingang getroffen und manövrierunfähig', aiBrief:'Ein Tanker wurde Berichten zufolge von einem unbekannten Projektil getroffen.', summary:'Der Angreifer ist nicht bestätigt; das Betriebsrisiko bleibt hoch.', impact:'Der Vorfall wird ohne Schuldzuweisung als Betriebsrisiko erfasst.', tags:['Hormuz','Tanker getroffen','Angreifer unbestätigt','manövrierunfähig']}
    },
    'hormuz-mine-removal-claims-20260826': {
      ja:{title:'機雷除去、米国主張とイラン・オマーン追加協議が併存', aiBrief:'米国は除去完了を主張する一方、イランとオマーンは暫定航路の追加除去を協議中です。', summary:'発表が一致しないため完全除去確定とは表示しません。', impact:'機雷状態は主張差として分離します。', tags:['機雷','米国主張','イラン・オマーン','未確定']},
      zh:{title:'扫雷：美国主张与伊朗阿曼追加讨论并存', aiBrief:'美国称国际水域扫雷完成，但伊朗和阿曼仍讨论临时航道追加扫雷。', summary:'各方说法不一致，因此不标记为完全清除确认。', impact:'扫雷状态按说法差异分开处理。', tags:['扫雷','美国主张','伊朗阿曼','未确认']},
      fr:{title:'Mines: revendication américaine et discussions Iran-Oman coexistent', aiBrief:'Les États-Unis revendiquent un déminage, tandis qu’Iran et Oman discutent d’un déminage additionnel.', summary:'Les déclarations divergent; le déminage complet n’est pas confirmé.', impact:'Le statut des mines est séparé comme revendications divergentes.', tags:['mines','revendication US','Iran-Oman','non confirmé']},
      de:{title:'Minenräumung: US-Behauptung und Iran-Oman-Gespräche bestehen nebeneinander', aiBrief:'Die USA behaupten Räumung, während Iran und Oman zusätzliche Räumung besprechen.', summary:'Da Aussagen abweichen, wird vollständige Räumung nicht bestätigt.', impact:'Minenstatus wird als abweichende Aussagen geführt.', tags:['Minen','US-Behauptung','Iran-Oman','nicht bestätigt']}
    },
    'usdkrw-1382-holds-20260826': {
      ja:{title:'USD/KRW約1,382.3、ウォン高維持', aiBrief:'USD/KRWは1,380台前半を維持し、ウォン換算額の下押し圧力が続きます。', summary:'為替は段階そのものよりUSD建てサーチャージのウォン換算額に影響します。', impact:'為替は強い下押し要因として維持します。', tags:['USD/KRW','1,382.3','為替','ウォン高']},
      zh:{title:'USD/KRW约1,382.3，韩元强势维持', aiBrief:'USD/KRW维持在1,380初段，韩元换算金额下行压力持续。', summary:'汇率主要影响美元燃油附加费的韩元换算金额，而非档位本身。', impact:'汇率维持强下行因素。', tags:['USD/KRW','1,382.3','汇率','韩元强势']},
      fr:{title:'USD/KRW près de 1 382.3, KRW toujours fort', aiBrief:'USD/KRW reste dans le bas des 1 380, maintenant une pression baissière sur les montants KRW.', summary:'Le FX affecte surtout la conversion KRW des montants en USD, pas le niveau.', impact:'Le FX reste un fort facteur baissier.', tags:['USD/KRW','1 382.3','FX','KRW fort']},
      de:{title:'USD/KRW nahe 1.382,3, KRW bleibt stark', aiBrief:'USD/KRW bleibt im niedrigen 1.380er Bereich und drückt KRW-Umrechnungsbeträge.', summary:'FX beeinflusst vor allem KRW-Beträge der USD-Zuschläge, nicht die Stufe selbst.', impact:'FX bleibt ein starker Abwärtsfaktor.', tags:['USD/KRW','1.382,3','FX','starker KRW']}
    }
  };
  newsCards.forEach(function(card){
    if(extraCardLocales[card.id]) card.i18n = Object.assign(card.i18n || {}, extraCardLocales[card.id]);
  });
  var detailedNewsCopy = {
    ko: {
      'iran-oman-hormuz-corridor-20260826': {
        aiBrief:'호르무즈 해협을 둘러싼 이란·오만 실무 논의가 선택적 선박 허가에서 임시 항행 통로 협의로 한 단계 진전됐습니다.',
        summary:'지역 이슈: 중동 걸프 해상운송, 특히 호르무즈 해협입니다. 이란과 오만은 제한된 선박 운항을 개선하기 위한 공동 임시 항행 통로와 일부 기뢰 제거를 논의하고 있습니다. 이는 10월 유류할증료 전망에서 외교적 완화 신호로 반영됩니다. 다만 공개 통항량은 여전히 극도로 낮고 자유항행 정상화가 확인된 것은 아니므로, 이 카드는 “호르무즈 정상화”가 아니라 “협상 진전과 현장 위험 병존”으로 해석해야 합니다.',
        impact:'SEO/geo 핵심: 호르무즈 해협, 이란·오만, 임시 항행로, 중동 해상운송. 유류할증료에는 하락 완화 신호지만 실제 운항 위험과 분리합니다.',
        tags:['호르무즈 해협','이란·오만','임시 항행 통로','중동 해상운송','10월 유류할증료']
      },
      'brent-wti-sharp-fall-20260826': {
        aiBrief:'Brent와 WTI가 동반 급락하면서 10월 유류할증료 전망에서 원유 쪽 하방 압력이 커졌습니다.',
        summary:'시장 이슈: 국제 원유 가격입니다. Brent는 88.58달러/bbl, WTI는 82.36달러/bbl로 내려왔고 아시아장 WTI는 약 80.99달러까지 추가 하락했습니다. 미국의 대이란 제재 발표 이후 시장이 즉각적인 공급차단보다 제한적 충격을 더 크게 반영하면서 지정학 프리미엄이 빠르게 축소된 흐름입니다. 이 변화는 10월 국제선 유류할증료의 인하 가능성을 넓히는 핵심 하방 요인입니다.',
        impact:'SEO 핵심: Brent 유가, WTI 유가, 국제유가 급락, 10월 유류할증료 전망. 단계 확정이 아니라 원유 측 하방 요인입니다.',
        tags:['Brent 88.58','WTI 82.36','WTI 80.99','국제유가 급락','유류할증료 전망']
      },
      'global-jetfuel-16387-20260826': {
        aiBrief:'원유는 급락했지만 글로벌 Jet Fuel은 163.87달러/bbl까지 올라 항공유 가격 압력은 여전히 강합니다.',
        summary:'시장 이슈: 항공유와 MOPS 구분입니다. IATA/Platts 글로벌 주간 Jet Fuel 평균은 163.87달러/bbl, 전주 대비 +3.1%로 상승했습니다. 이 값은 Singapore MOPS가 아니며 10월 산정기간 누적 평균도 아닙니다. 그러나 원유 하락에도 항공유와 정제품 공급이 같은 속도로 완화되지 않았다는 신호이므로, 10월 전망에서 Jet Fuel은 여전히 강한 상승 압력으로 유지합니다.',
        impact:'SEO 핵심: 글로벌 Jet Fuel, IATA Platts, Singapore MOPS 아님, 항공유 가격. 163.87달러를 10월 확정 MOPS로 쓰지 않습니다.',
        tags:['글로벌 Jet Fuel','163.87달러','IATA Platts','Singapore MOPS 아님','항공유 가격']
      },
      'hormuz-commodity-vessels-two-20260826': {
        aiBrief:'호르무즈 공개 commodity vessel 통항이 2척 수준으로 줄어 실제 운항 위험은 오히려 악화됐습니다.',
        summary:'지역 이슈: 호르무즈 해협 실제 운항입니다. 공개 추적 기준 commodity vessel 통항량은 2척까지 낮아졌습니다. 이 수치는 전체 선박 통항량 확정값이 아니라 공개 추적 가능한 상품 운반선 기준 관측값입니다. 이란·오만의 임시 항행로 논의가 외교적 완화 신호라면, 2척 통항은 현장 운항이 아직 회복되지 않았다는 반대 신호입니다.',
        impact:'SEO/geo 핵심: 호르무즈 통항량, commodity vessel, Kpler 공개 추적, 중동 해상 리스크. 전체 선박 수로 오표기하지 않습니다.',
        tags:['호르무즈 통항량','commodity vessel 2척','Kpler 공개 추적','중동 해상 리스크','정상화 아님']
      },
      'hormuz-tanker-hit-20260826': {
        aiBrief:'호르무즈 입구 인근 유조선 피격은 항행로 협상과 별개로 현장 운항 위험이 남아 있음을 보여줍니다.',
        summary:'지역 이슈: 호르무즈 입구와 걸프 해상안보입니다. 유조선 한 척이 정체불명의 발사체에 맞아 운항 불능 상태로 보고됐습니다. 공격 주체는 확인되지 않았으므로 특정 국가나 세력의 공격으로 단정하지 않습니다. 이 사건은 10월 유류할증료 전망에서 호르무즈 실제 운항 위험과 선박 보험·물류 비용 리스크를 높이는 요인입니다.',
        impact:'SEO/geo 핵심: 호르무즈 유조선 피격, 공격 주체 미확인, 걸프 해상안보. 책임 소재를 단정하지 않습니다.',
        tags:['호르무즈 유조선 피격','공격 주체 미확인','걸프 해상안보','운항 불능','선박 리스크']
      },
      'hormuz-mine-removal-claims-20260826': {
        aiBrief:'기뢰 제거와 관련해 미국 주장과 이란·오만 협의가 동시에 존재해 확정 사실과 주장을 분리해야 합니다.',
        summary:'지역 이슈: 호르무즈 국제수역과 임시 항행로 안전입니다. 미국은 국제수역의 기뢰 제거 완료를 주장하지만, 이란과 오만은 임시 항행 통로의 추가 기뢰 제거를 논의하고 있습니다. 두 설명이 완전히 일치하지 않기 때문에 사이트에서는 기뢰 완전 제거를 확정하지 않습니다. 이 카드는 호르무즈 리스크가 단일 뉴스로 단순화되지 않는다는 점을 설명합니다.',
        impact:'SEO/geo 핵심: 호르무즈 기뢰 제거, 미국 주장, 이란·오만 협의, 항행 안전. 완전 제거 확정으로 표현하지 않습니다.',
        tags:['호르무즈 기뢰','미국 주장','이란·오만 협의','항행 안전','확정 아님']
      },
      'usdkrw-1382-holds-20260826': {
        aiBrief:'원/달러 환율이 1,382.3원 수준을 유지하면서 원화 환산 유류할증료에는 하방 압력이 이어집니다.',
        summary:'시장 이슈: 한국 원화와 달러 환율입니다. USD/KRW는 약 1,382.3원으로 1,380원대 초반에 머물고 있습니다. 환율은 유류할증료 단계 자체를 직접 정하는 핵심 변수라기보다, USD 기준으로 산정된 금액을 원화로 환산할 때 영향을 줍니다. 따라서 이 카드는 “단계 하락 확정”이 아니라 “원화 부과액 하락 요인”으로 해석해야 합니다.',
        impact:'SEO 핵심: 원달러 환율, USD/KRW 1,382.3, 원화 유류할증료, 환율 하락. 단계 확정 신호로 쓰지 않습니다.',
        tags:['USD/KRW 1,382.3','원달러 환율','원화 강세','원화 유류할증료','환율 하락']
      }
    },
    en: {
      'iran-oman-hormuz-corridor-20260826': {
        aiBrief:'Iran-Oman working talks have moved the Hormuz story from selective vessel permission toward a temporary navigational corridor discussion.',
        summary:'Geo focus: the Strait of Hormuz and Gulf maritime transport. Iran and Oman are discussing a joint temporary navigational corridor and partial mine-clearance work to improve restricted vessel movement. This is a diplomatic relief signal for the October fuel surcharge outlook. It is not confirmed free-navigation normalization because public traffic remains extremely low.',
        impact:'SEO/geo focus: Strait of Hormuz, Iran-Oman, temporary corridor, Gulf shipping. Relief signal, separated from actual operational risk.',
        tags:['Strait of Hormuz','Iran-Oman','temporary navigational corridor','Gulf shipping','October fuel surcharge']
      },
      'brent-wti-sharp-fall-20260826': {
        aiBrief:'Brent and WTI fell sharply, making crude oil a stronger downside factor for the October surcharge outlook.',
        summary:'Market focus: global crude oil. Brent moved to USD 88.58/bbl, WTI to USD 82.36/bbl, and Asia-session WTI around USD 80.99. After U.S. Iran sanctions were announced, the market priced a smaller immediate supply shock than feared, reducing geopolitical risk premium. This expands the chance of a lower October surcharge path, but does not confirm a stage.',
        impact:'SEO focus: Brent crude, WTI crude, oil price drop, October fuel surcharge outlook. This is crude-side downside, not a confirmed stage.',
        tags:['Brent 88.58','WTI 82.36','WTI 80.99','oil price drop','fuel surcharge outlook']
      },
      'global-jetfuel-16387-20260826': {
        aiBrief:'Crude fell, but global Jet Fuel rose to USD 163.87/bbl, keeping aviation fuel pressure high.',
        summary:'Market focus: jet fuel and MOPS separation. The IATA/Platts global weekly Jet Fuel average rose to USD 163.87/bbl, up 3.1% week on week. This is not Singapore MOPS and not the October cumulative average. It still matters because it shows jet fuel and refined-product markets have not eased as quickly as crude.',
        impact:'SEO focus: global Jet Fuel, IATA Platts, not Singapore MOPS, aviation fuel price. Do not use USD 163.87 as confirmed October MOPS.',
        tags:['global Jet Fuel','USD 163.87','IATA Platts','not Singapore MOPS','aviation fuel price']
      },
      'hormuz-commodity-vessels-two-20260826': {
        aiBrief:'Public Hormuz commodity-vessel tracking fell to 2 vessels, so actual operations look worse despite diplomatic talks.',
        summary:'Geo focus: real vessel movement through the Strait of Hormuz. Publicly trackable commodity-vessel transit has fallen to 2 vessels. This is not a confirmed count of all ships, but it is a clear operating-risk signal for fuel, refined-product and shipping logistics. In the October surcharge view, the corridor talks are a relief signal while the 2-vessel tracking value is the opposite operational signal.',
        impact:'SEO/geo focus: Hormuz traffic, commodity vessel, public tracking, Gulf maritime risk. Do not label it as total traffic or normalization.',
        tags:['Hormuz traffic','2 commodity vessels','public tracking','Gulf maritime risk','not normalization']
      },
      'hormuz-tanker-hit-20260826': {
        aiBrief:'A tanker near the Hormuz entrance was disabled, showing that operational risk remains separate from corridor diplomacy.',
        summary:'Geo focus: the Hormuz entrance and Gulf maritime security. A tanker was reported disabled after being hit by an unidentified projectile. The attacker has not been confirmed, so the card avoids attributing responsibility to any state or group. For the October surcharge outlook, this raises shipping insurance, delay and refined-product logistics risk.',
        impact:'SEO/geo focus: Hormuz tanker hit, unidentified attacker, Gulf security, disabled tanker. Attribution is not confirmed.',
        tags:['Hormuz tanker hit','attacker unconfirmed','Gulf security','disabled tanker','shipping risk']
      },
      'hormuz-mine-removal-claims-20260826': {
        aiBrief:'Mine-removal statements differ, so the site separates U.S. claims from Iran-Oman follow-up talks.',
        summary:'Geo focus: Hormuz international waters and temporary corridor safety. The United States claims mines were removed from international waters, while Iran and Oman are still discussing additional mine removal for a temporary navigational corridor. Because these claims do not fully match, the site does not treat full mine clearance as confirmed.',
        impact:'SEO/geo focus: Hormuz mines, U.S. claim, Iran-Oman talks, navigation safety. Do not present full clearance as confirmed.',
        tags:['Hormuz mines','U.S. claim','Iran-Oman talks','navigation safety','not confirmed']
      },
      'usdkrw-1382-holds-20260826': {
        aiBrief:'USD/KRW around 1,382.3 keeps downward pressure on KRW-converted surcharge amounts.',
        summary:'Market focus: Korean won and U.S. dollar exchange rate. USD/KRW is holding near the low 1,380s at about 1,382.3. FX does not directly set the official surcharge stage, but it affects how USD-based surcharge inputs translate into KRW amounts paid by Korea-departure passengers. This card should be read as a KRW amount relief factor, not as a confirmed stage reduction.',
        impact:'SEO focus: USD/KRW 1,382.3, Korean won, KRW fuel surcharge, FX downside. Not a confirmed stage signal.',
        tags:['USD/KRW 1,382.3','Korean won','KRW fuel surcharge','FX downside','exchange rate']
      }
    }
  };
  ['ja','zh','fr','de'].forEach(function(lang){
    detailedNewsCopy[lang] = detailedNewsCopy[lang] || {};
    Object.keys(extraCardLocales).forEach(function(id){
      if(extraCardLocales[id][lang]) detailedNewsCopy[lang][id] = Object.assign({}, extraCardLocales[id][lang]);
    });
  });
  newsCards.forEach(function(card){
    Object.keys(detailedNewsCopy).forEach(function(lang){
      var detail = detailedNewsCopy[lang][card.id];
      if(!detail) return;
      card.i18n = card.i18n || {};
      card.i18n[lang] = Object.assign({}, card.i18n[lang] || {}, detail);
    });
  });

  function newsPack(lang){
    var en = {'news.metaTitle':'September 2026 Notices and October Outlook News | August 26','news.metaDesc':'As of August 26, 2026, track September Level 21 confirmation and the October outlook with global Jet Fuel USD 163.87, sharp Brent/WTI falls and Hormuz corridor talks.','news.pageTitle':'September 2026 Notices and October Outlook News','news.h1':'September 2026 Notices and October Outlook News','news.pageSub':'As of 2026.08.26 08:40 KST · September Level 21 confirmed · October outlook: centered flat, reduction chance expanded · USD/KRW 1,382.3 · Brent 88.58 · WTI 82.36','news.summary.title':'September Notices and October Outlook Summary','news.summary.updated':'As of 2026.08.26 08:40 KST · oil falls sharply · Jet Fuel rises · Hormuz mixed','news.summary.li1':'September international fuel surcharge is confirmed at Level 21.','news.summary.li2':'October is still pre-filing; no stage, route amount or probability is confirmed.','news.summary.li3':'USD/KRW around 1,382.3 is a strong downside factor for KRW conversion amounts.','news.summary.li4':'Brent USD 88.58 and WTI USD 82.36 fell sharply; Asia-session WTI is around USD 80.99.','news.summary.li5':'Global Jet Fuel rose to USD 163.87/bbl, up 3.1% week on week, and is not Singapore MOPS.','news.summary.li6':'Singapore Jet Fuel around USD 154.98 remains a recent market reference, not the October average.','news.summary.li7':'Iran and Oman are discussing a temporary Hormuz navigational corridor and mine-removal work.','news.summary.li8':'Actual public Hormuz commodity-vessel transit fell to 2 vessels, so operations are not normalized.','news.summary.li9':'A tanker near the Hormuz entrance was disabled after an unidentified projectile hit; the attacker is unconfirmed.','news.summary.li10':'Current October view: centered around flat, reduction chance expanded, low confidence.','news.dataRef':'As of 2026.08.26 08:40 KST · September notices confirmed · October calculation period in progress','news.fx':'FX: USD/KRW around 1,382.3; this affects KRW conversion amounts, not the stage by itself.','news.mops':'Jet Fuel: September baseline USD 149.29/bbl; recent Singapore Jet Fuel USD 154.98/bbl; global weekly Jet Fuel USD 163.87/bbl (+3.1%). October Singapore MOPS average is still collecting.','news.brent':'Crude: Brent USD 88.58/bbl (-3.9%), WTI USD 82.36/bbl (-3.1%), and Asia-session WTI around USD 80.99.','news.geo':'Hormuz: Iran-Oman temporary corridor talks are a relief signal, but public commodity-vessel transit is 2 and a tanker incident keeps operational risk high.','news.marketSummary':'→ October outlook: centered around flat · reduction chance expanded · low confidence.','news.fxDominance':'Key figures: 2026.08.26 08:40 KST · September Level 21 confirmed · USD/KRW 1,382.3 · Singapore Jet Fuel 154.98 · global Jet Fuel 163.87 · Brent 88.58 · WTI 82.36 / Asia 80.99','news.decisionTitle':'Conclusion: September confirmed; October shifts to flat-centered tracking with a larger reduction chance','news.decisionLine1':'→ September official notices remain the confirmed baseline.','news.decisionLine2':'→ October remains directional until average Singapore MOPS and average USD/KRW accumulate.','news.forecastCta.title':'October 2026 Fuel Surcharge Outlook','news.forecastCta.desc':'Track October average Singapore MOPS and average FX while separating recent references from confirmed averages.','news.forecastCta.btn':'View October outlook →'};
    var ko = Object.assign({}, en, {'news.metaTitle':'2026년 9월 공시 및 10월 전망 뉴스 | 8월 26일','news.metaDesc':'2026년 8월 26일 기준 9월 21단계 확정과 10월 전망, 글로벌 Jet Fuel 163.87달러, Brent·WTI 급락, 호르무즈 임시 항행로 논의를 정리합니다.','news.pageTitle':'2026년 9월 공시 및 10월 전망 뉴스','news.h1':'2026년 9월 공시 및 10월 전망 뉴스','news.pageSub':'2026.08.26 08:40 KST 기준 · 9월 21단계 확정 · 10월 전망: 보합 중심 · 인하 가능성 확대 · USD/KRW 1,382.3원 · Brent 88.58 · WTI 82.36','news.summary.title':'9월 공시 및 10월 전망 요약','news.summary.updated':'2026.08.26 08:40 KST 기준 · 유가 급락 · Jet Fuel 상승 · 호르무즈 혼재','news.summary.li1':'9월 국제선 유류할증료는 21단계로 확정됐습니다.','news.summary.li2':'10월은 아직 공시 전이므로 단계·노선별 금액·확률은 확정하지 않습니다.','news.summary.li3':'USD/KRW 약 1,382.3원은 원화 환산액의 강한 하락 요인입니다.','news.summary.li4':'Brent 88.58달러와 WTI 82.36달러가 급락했고, 아시아장 WTI는 약 80.99달러입니다.','news.summary.li5':'글로벌 Jet Fuel은 163.87달러/bbl, 전주 대비 +3.1%이며 Singapore MOPS가 아닙니다.','news.summary.li6':'Singapore Jet Fuel 약 154.98달러는 최근 시장 참고값이며 10월 평균이 아닙니다.','news.summary.li7':'이란과 오만이 호르무즈 임시 항행 통로와 기뢰 제거를 논의 중입니다.','news.summary.li8':'실제 공개 호르무즈 commodity vessel 통항은 2척까지 줄어 운항 정상화가 아닙니다.','news.summary.li9':'호르무즈 입구 유조선은 정체불명의 발사체에 맞아 운항 불능으로 보고됐고 공격 주체는 미확인입니다.','news.summary.li10':'현재 10월 전망은 보합 중심 · 인하 가능성 확대 · 신뢰도 낮음입니다.','news.dataRef':'2026.08.26 08:40 KST 기준 · 9월 공시 확인 · 10월 산정기간 진행 중','news.fx':'환율: USD/KRW 약 1,382.3원. 환율은 단계 자체보다 원화 환산액에 영향을 줍니다.','news.mops':'항공유: 9월 기준선 149.29달러/bbl, 최근 Singapore Jet Fuel 154.98달러/bbl, 글로벌 주간 Jet Fuel 163.87달러/bbl(+3.1%)은 구분합니다. 10월 Singapore MOPS 평균은 집계 중입니다.','news.brent':'국제유가: Brent 88.58달러/bbl(-3.9%), WTI 82.36달러/bbl(-3.1%), 아시아장 WTI 약 80.99달러입니다.','news.geo':'호르무즈: 이란·오만 임시 항행로 논의는 완화 신호지만 공개 commodity vessel 통항은 2척이고 신규 유조선 피격으로 운항 위험은 높습니다.','news.marketSummary':'→ 10월 전망: 보합 중심 · 인하 가능성 확대 · 신뢰도 낮음.','news.fxDominance':'핵심 수치: 2026.08.26 08:40 KST · 9월 21단계 확정 · USD/KRW 1,382.3원 · Singapore Jet Fuel 154.98 · 글로벌 Jet Fuel 163.87 · Brent 88.58 · WTI 82.36 / 아시아장 80.99','news.decisionTitle':'결론: 9월 공시는 확정, 10월은 보합 중심·인하 가능성 확대 추적','news.decisionLine1':'→ 9월 공식 공시는 현재 확정 기준선입니다.','news.decisionLine2':'→ 10월은 산정기간 Singapore MOPS 평균과 평균 USD/KRW가 쌓일 때까지 방향성만 표시합니다.','news.forecastCta.title':'2026년 10월 유류할증료 전망','news.forecastCta.desc':'10월 산정기간 Singapore MOPS 평균과 평균환율을 추적하고 최근값과 확정 평균을 구분합니다.','news.forecastCta.btn':'10월 전망 보기 →'});
    var ja = Object.assign({}, en, {'news.metaTitle':'2026年9月公示と10月見通しニュース | 8月26日','news.pageTitle':'2026年9月公示と10月見通しニュース','news.h1':'2026年9月公示と10月見通しニュース','news.pageSub':'2026.08.26 08:40 KST時点 · 9月21段階確定 · 10月見通し: 横ばい中心・引き下げ可能性拡大 · USD/KRW 1,382.3 · Brent 88.58 · WTI 82.36','news.summary.title':'9月公示と10月見通し要約','news.marketSummary':'→ 10月見通し: 横ばい中心 · 引き下げ可能性拡大 · 信頼度低い。','news.fxDominance':'主要数値: 2026.08.26 08:40 KST · 9月21段階確定 · USD/KRW 1,382.3 · Singapore Jet Fuel 154.98 · 世界Jet Fuel 163.87 · Brent 88.58 · WTI 82.36 / アジア80.99'});
    var zh = Object.assign({}, en, {'news.metaTitle':'2026年9月公告与10月展望新闻 | 8月26日','news.pageTitle':'2026年9月公告与10月展望新闻','news.h1':'2026年9月公告与10月展望新闻','news.pageSub':'截至2026.08.26 08:40 KST · 9月第21档确认 · 10月展望：以持平为中心、下调可能性扩大 · USD/KRW 1,382.3 · Brent 88.58 · WTI 82.36','news.summary.title':'9月公告与10月展望摘要','news.marketSummary':'→ 10月展望：以持平为中心 · 下调可能性扩大 · 可信度低。','news.fxDominance':'核心数据：2026.08.26 08:40 KST · 9月第21档确认 · USD/KRW 1,382.3 · Singapore Jet Fuel 154.98 · 全球Jet Fuel 163.87 · Brent 88.58 · WTI 82.36 / 亚洲80.99'});
    var fr = Object.assign({}, en, {'news.metaTitle':'Avis septembre 2026 et perspective octobre | 26 août','news.pageTitle':'Avis septembre 2026 et perspective octobre','news.h1':'Avis septembre 2026 et perspective octobre','news.pageSub':'Au 2026.08.26 08:40 KST · septembre niveau 21 confirmé · octobre: stable centré, baisse plus probable · USD/KRW 1 382.3 · Brent 88.58 · WTI 82.36','news.summary.title':'Synthèse avis septembre et perspective octobre','news.marketSummary':'→ Perspective octobre: stable centrée · probabilité de baisse accrue · faible confiance.','news.fxDominance':'Chiffres clés: 2026.08.26 08:40 KST · septembre niveau 21 confirmé · USD/KRW 1 382.3 · Singapore Jet Fuel 154.98 · Jet Fuel mondial 163.87 · Brent 88.58 · WTI 82.36 / Asie 80.99'});
    var de = Object.assign({}, en, {'news.metaTitle':'September-2026 Hinweise und Oktober-Ausblick | 26. August','news.pageTitle':'September-2026 Hinweise und Oktober-Ausblick','news.h1':'September-2026 Hinweise und Oktober-Ausblick','news.pageSub':'Stand 2026.08.26 08:40 KST · September Stufe 21 bestätigt · Oktober: stabil zentriert, Senkungschance größer · USD/KRW 1.382,3 · Brent 88.58 · WTI 82.36','news.summary.title':'Zusammenfassung September-Hinweise und Oktober-Ausblick','news.marketSummary':'→ Oktober-Ausblick: stabil zentriert · Senkungschance größer · geringe Sicherheit.','news.fxDominance':'Kennzahlen: 2026.08.26 08:40 KST · September Stufe 21 bestätigt · USD/KRW 1.382,3 · Singapore Jet Fuel 154.98 · globales Jet Fuel 163.87 · Brent 88.58 · WTI 82.36 / Asien 80.99'});
    Object.assign(ja, {
      'news.metaDesc':'2026年8月26日時点、9月21段階確定と10月見通し、世界Jet Fuel 163.87ドル、Brent/WTI急落、ホルムズ暫定航行回廊協議を整理します。',
      'news.summary.updated':'2026.08.26 08:40 KST時点 · 原油急落 · Jet Fuel上昇 · ホルムズ混在',
      'news.summary.li1':'9月国際線燃油サーチャージは21段階で確定しました。',
      'news.summary.li2':'10月はまだ公示前で、段階・路線別金額・確率は確定していません。',
      'news.summary.li3':'USD/KRW約1,382.3はウォン換算額の強い下押し要因です。',
      'news.summary.li4':'Brent 88.58ドル、WTI 82.36ドルが急落し、アジア時間WTIは約80.99ドルです。',
      'news.summary.li5':'世界Jet Fuelは163.87ドル/bbl、前週比+3.1%で、Singapore MOPSではありません。',
      'news.summary.li6':'Singapore Jet Fuel約154.98ドルは最近の市場参考値で、10月平均ではありません。',
      'news.summary.li7':'イランとオマーンはホルムズ暫定航行回廊と機雷除去を協議しています。',
      'news.summary.li8':'公開ホルムズcommodity vessel通航は2隻まで減少し、運航正常化ではありません。',
      'news.summary.li9':'ホルムズ入口付近のタンカーは正体不明の発射体で航行不能と報告され、攻撃主体は未確認です。',
      'news.summary.li10':'現在の10月見通しは横ばい中心、引き下げ可能性拡大、信頼度低いです。',
      'news.dataRef':'2026.08.26 08:40 KST時点 · 9月公示確認 · 10月算定期間進行中',
      'news.fx':'為替: USD/KRW約1,382.3。段階そのものではなくウォン換算額に影響します。',
      'news.mops':'航空燃料: 9月基準149.29ドル/bbl、最近のSingapore Jet Fuel 154.98ドル/bbl、世界週次Jet Fuel 163.87ドル/bbl(+3.1%)は別指標です。10月Singapore MOPS平均は集計中です。',
      'news.brent':'原油: Brent 88.58ドル/bbl(-3.9%)、WTI 82.36ドル/bbl(-3.1%)、アジア時間WTI約80.99ドルです。',
      'news.geo':'ホルムズ: イラン・オマーン暫定回廊協議は緩和信号ですが、公開commodity vessel通航は2隻で、タンカー事故により運航リスクは高いままです。',
      'news.decisionTitle':'結論: 9月公示は確定、10月は横ばい中心・引き下げ可能性拡大を追跡',
      'news.decisionLine1':'→ 9月公式公示は現在の確定基準です。',
      'news.decisionLine2':'→ 10月はSingapore MOPS平均と平均USD/KRWが蓄積するまで方向性のみ表示します。',
      'news.forecastCta.title':'2026年10月燃油サーチャージ見通し',
      'news.forecastCta.desc':'10月算定期間のSingapore MOPS平均と平均為替を追跡し、最近値と確定平均を区別します。',
      'news.forecastCta.btn':'10月見通しを見る →'
    });
    Object.assign(zh, {
      'news.metaDesc':'截至2026年8月26日，整理9月第21档确认、10月展望、全球Jet Fuel 163.87美元、Brent/WTI急跌与霍尔木兹临时航道谈判。',
      'news.summary.updated':'截至2026.08.26 08:40 KST · 原油急跌 · Jet Fuel上升 · 霍尔木兹信号混杂',
      'news.summary.li1':'9月国际线燃油附加费已确认为第21档。',
      'news.summary.li2':'10月仍在公告前，档位、航线金额和概率均未确认。',
      'news.summary.li3':'USD/KRW约1,382.3，对韩元换算金额形成强下行因素。',
      'news.summary.li4':'Brent 88.58美元、WTI 82.36美元急跌，亚洲时段WTI约80.99美元。',
      'news.summary.li5':'全球Jet Fuel为163.87美元/bbl，周环比+3.1%，不是Singapore MOPS。',
      'news.summary.li6':'Singapore Jet Fuel约154.98美元是近期市场参考值，不是10月平均值。',
      'news.summary.li7':'伊朗和阿曼正在讨论霍尔木兹临时航行通道和扫雷工作。',
      'news.summary.li8':'公开霍尔木兹commodity vessel通行降至2艘，并不代表航运正常化。',
      'news.summary.li9':'霍尔木兹入口附近油轮被不明发射体击中后无法航行，攻击方尚未确认。',
      'news.summary.li10':'当前10月展望：以持平为中心、下调可能性扩大、可信度低。',
      'news.dataRef':'截至2026.08.26 08:40 KST · 9月公告已确认 · 10月计算期进行中',
      'news.fx':'汇率：USD/KRW约1,382.3。它影响韩元换算金额，而非单独决定档位。',
      'news.mops':'航空燃料：9月基准149.29美元/bbl、近期Singapore Jet Fuel 154.98美元/bbl、全球周度Jet Fuel 163.87美元/bbl(+3.1%)是不同指标。10月Singapore MOPS平均仍在累计。',
      'news.brent':'原油：Brent 88.58美元/bbl(-3.9%)、WTI 82.36美元/bbl(-3.1%)，亚洲时段WTI约80.99美元。',
      'news.geo':'霍尔木兹：伊朗-阿曼临时通道谈判是缓和信号，但公开commodity vessel通行仅2艘，油轮事件使运营风险仍然偏高。',
      'news.decisionTitle':'结论：9月公告已确认，10月转向持平中心并跟踪下调可能性',
      'news.decisionLine1':'→ 9月官方公告是当前确认基准。',
      'news.decisionLine2':'→ 10月在Singapore MOPS平均和USD/KRW平均充分累计前只显示方向性。',
      'news.forecastCta.title':'2026年10月燃油附加费展望',
      'news.forecastCta.desc':'跟踪10月计算期Singapore MOPS平均和平均汇率，并区分近期参考值与确认平均。',
      'news.forecastCta.btn':'查看10月展望 →'
    });
    Object.assign(fr, {
      'news.metaDesc':'Au 26 aout 2026, suivi du niveau 21 confirme en septembre, de la perspective octobre, du Jet Fuel mondial a 163.87 USD, de la chute Brent/WTI et du corridor Hormuz.',
      'news.summary.updated':'Au 2026.08.26 08:40 KST · chute du brut · Jet Fuel en hausse · signaux mixtes a Hormuz',
      'news.summary.li1':'La surcharge carburant internationale de septembre est confirmee au niveau 21.',
      'news.summary.li2':'Octobre reste avant publication: aucun niveau, montant par route ou probabilite n est confirme.',
      'news.summary.li3':'USD/KRW autour de 1 382.3 est un fort facteur baissier pour les montants convertis en KRW.',
      'news.summary.li4':'Brent 88.58 USD et WTI 82.36 USD ont fortement baisse; le WTI en Asie est autour de 80.99 USD.',
      'news.summary.li5':'Le Jet Fuel mondial est a 163.87 USD/bbl, +3.1% sur une semaine, et ce n est pas Singapore MOPS.',
      'news.summary.li6':'Singapore Jet Fuel autour de 154.98 USD est une reference recente de marche, pas la moyenne d octobre.',
      'news.summary.li7':'L Iran et Oman discutent d un corridor temporaire a Hormuz et de travaux de deminage.',
      'news.summary.li8':'Le transit public des commodity vessels a Hormuz est tombe a 2 navires; ce n est pas une normalisation.',
      'news.summary.li9':'Un tanker pres de l entree d Hormuz a ete immobilise par un projectile non identifie; l attaquant n est pas confirme.',
      'news.summary.li10':'Vue actuelle d octobre: stable centree, probabilite de baisse accrue, faible confiance.',
      'news.dataRef':'Au 2026.08.26 08:40 KST · avis de septembre confirmes · periode de calcul d octobre en cours',
      'news.fx':'Change: USD/KRW autour de 1 382.3; cela affecte les montants convertis en KRW, pas le niveau seul.',
      'news.mops':'Jet Fuel: base septembre 149.29 USD/bbl, Singapore Jet Fuel recent 154.98 USD/bbl, Jet Fuel mondial hebdomadaire 163.87 USD/bbl(+3.1%). La moyenne Singapore MOPS d octobre est encore en calcul.',
      'news.brent':'Brut: Brent 88.58 USD/bbl(-3.9%), WTI 82.36 USD/bbl(-3.1%) et WTI en Asie autour de 80.99 USD.',
      'news.geo':'Hormuz: les discussions Iran-Oman sur un corridor temporaire sont un signal d apaisement, mais le transit public est de 2 navires et l incident tanker maintient un risque eleve.',
      'news.decisionTitle':'Conclusion: septembre confirme; octobre reste centre stable avec probabilite de baisse accrue',
      'news.decisionLine1':'→ Les avis officiels de septembre restent la base confirmee.',
      'news.decisionLine2':'→ Octobre reste directionnel jusqu a accumulation des moyennes Singapore MOPS et USD/KRW.',
      'news.forecastCta.title':'Perspective surcharge carburant octobre 2026',
      'news.forecastCta.desc':'Suivez la moyenne Singapore MOPS et le change moyen d octobre en separant references recentes et moyennes confirmees.',
      'news.forecastCta.btn':'Voir la perspective octobre →'
    });
    Object.assign(de, {
      'news.metaDesc':'Stand 26. August 2026: September Stufe 21 bestaetigt, Oktober-Ausblick, globales Jet Fuel 163.87 USD, Brent/WTI-Rueckgang und Hormuz-Korridorgespraeche.',
      'news.summary.updated':'Stand 2026.08.26 08:40 KST · Oel faellt stark · Jet Fuel steigt · Hormuz gemischt',
      'news.summary.li1':'Der internationale Treibstoffzuschlag fuer September ist auf Stufe 21 bestaetigt.',
      'news.summary.li2':'Oktober ist noch vor der Bekanntgabe; Stufe, Streckenbetraege und Wahrscheinlichkeiten sind nicht bestaetigt.',
      'news.summary.li3':'USD/KRW um 1.382,3 ist ein starker Abwaertsfaktor fuer KRW-Umrechnungsbetraege.',
      'news.summary.li4':'Brent 88.58 USD und WTI 82.36 USD fielen stark; WTI in Asien liegt um 80.99 USD.',
      'news.summary.li5':'Globales Jet Fuel liegt bei 163.87 USD/bbl, +3.1% zur Vorwoche, und ist nicht Singapore MOPS.',
      'news.summary.li6':'Singapore Jet Fuel um 154.98 USD ist ein aktueller Marktreferenzwert, nicht der Oktober-Durchschnitt.',
      'news.summary.li7':'Iran und Oman sprechen ueber einen temporaeren Hormuz-Navigationskorridor und Minenraeumung.',
      'news.summary.li8':'Der oeffentlich verfolgte Hormuz-Transit von commodity vessels fiel auf 2 Schiffe; das ist keine Normalisierung.',
      'news.summary.li9':'Ein Tanker nahe dem Eingang von Hormuz wurde durch ein unbekanntes Projektil manoevrierunfaehig; der Angreifer ist nicht bestaetigt.',
      'news.summary.li10':'Aktuelle Oktobersicht: stabil zentriert, Senkungschance groesser, geringe Sicherheit.',
      'news.dataRef':'Stand 2026.08.26 08:40 KST · September-Hinweise bestaetigt · Oktober-Berechnungszeitraum laeuft',
      'news.fx':'Wechselkurs: USD/KRW um 1.382,3; dies beeinflusst KRW-Umrechnungsbetraege, nicht allein die Stufe.',
      'news.mops':'Jet Fuel: September-Basis 149.29 USD/bbl, aktuelles Singapore Jet Fuel 154.98 USD/bbl, globales woechentliches Jet Fuel 163.87 USD/bbl(+3.1%). Der Oktober-Singapore-MOPS-Durchschnitt wird noch gesammelt.',
      'news.brent':'Rohöl: Brent 88.58 USD/bbl(-3.9%), WTI 82.36 USD/bbl(-3.1%) und WTI Asien um 80.99 USD.',
      'news.geo':'Hormuz: Iran-Oman-Gespraeche ueber einen temporaeren Korridor sind ein Entlastungssignal, aber der oeffentliche Transit liegt bei 2 Schiffen und der Tanker-Vorfall haelt das Risiko hoch.',
      'news.decisionTitle':'Fazit: September bestaetigt; Oktober bleibt stabil zentriert mit groesserer Senkungschance',
      'news.decisionLine1':'→ Offizielle September-Hinweise bleiben die bestaetigte Basis.',
      'news.decisionLine2':'→ Oktober bleibt richtungsbezogen, bis Singapore-MOPS- und USD/KRW-Durchschnitte belastbar sind.',
      'news.forecastCta.title':'Treibstoffzuschlag-Ausblick Oktober 2026',
      'news.forecastCta.desc':'Verfolgen Sie Singapore-MOPS-Durchschnitt und Durchschnittswechselkurs fuer Oktober, getrennt von aktuellen Referenzwerten.',
      'news.forecastCta.btn':'Oktober-Ausblick ansehen →'
    });
    var common = {
      ko:{
        'news.aiNotice':'AI 요약 콘텐츠 — 이 페이지의 내용은 공개된 정보를 바탕으로 AI가 정리한 참고용 자료입니다. 공식 정보가 아니므로 중요한 결정 전 항공사 및 기관 공식 채널을 확인하세요.',
        'news.surchargeNote':'※ 유류할증료는 예약 시점이 아니라 발권일 기준으로 적용됩니다. 가격 변동 전 최종 금액을 확인하세요.',
        'news.filterAll':'전체','news.filterAirline':'항공사 공시','news.filterInstitution':'기관','news.filterMarket':'시장',
        'aff.usim.title':'여행 SIM 준비','aff.usim.desc':'출국 전 필수 준비','aff.cta':'최저가 확인 →'
      },
      en:{
        'news.aiNotice':'AI summary content — This page summarizes public information for reference only. It is not official information. Always confirm important decisions through official airline and institution channels.',
        'news.surchargeNote':'※ Fuel surcharges apply by ticketing date, not reservation date. Confirm the final amount before prices change.',
        'news.filterAll':'All','news.filterAirline':'Airline notices','news.filterInstitution':'Institutions','news.filterMarket':'Market',
        'aff.usim.title':'Travel SIM Ready','aff.usim.desc':'Essential before departure','aff.cta':'Check price →'
      },
      ja:{
        'news.aiNotice':'AI要約コンテンツ — このページは公開情報を参考用に整理したものです。公式情報ではないため、重要な判断の前に航空会社および関係機関の公式チャネルを確認してください。',
        'news.surchargeNote':'※ 燃油サーチャージは予約日ではなく発券日基準で適用されます。価格変更前に最終金額を確認してください。',
        'news.filterAll':'すべて','news.filterAirline':'航空会社公示','news.filterInstitution':'機関','news.filterMarket':'市場',
        'aff.usim.title':'旅行SIM準備','aff.usim.desc':'出発前の必須準備','aff.cta':'最安値を確認 →'
      },
      zh:{
        'news.aiNotice':'AI摘要内容 — 本页基于公开信息整理，仅供参考，并非官方信息。做出重要决定前请务必通过航空公司和相关机构官方渠道确认。',
        'news.surchargeNote':'※ 燃油附加费按出票日而非预订日适用。价格变化前请确认最终金额。',
        'news.filterAll':'全部','news.filterAirline':'航空公司公告','news.filterInstitution':'机构','news.filterMarket':'市场',
        'aff.usim.title':'旅行SIM准备','aff.usim.desc':'出发前必备','aff.cta':'查看最低价 →'
      },
      fr:{
        'news.aiNotice':'Contenu resume par IA — Cette page synthetise des informations publiques a titre indicatif. Ce n est pas une information officielle; verifiez toujours les canaux officiels des compagnies et institutions avant toute decision importante.',
        'news.surchargeNote':'※ Les surcharges carburant s appliquent selon la date d emission du billet, pas la date de reservation. Verifiez le montant final avant tout changement de prix.',
        'news.filterAll':'Tout','news.filterAirline':'Avis compagnies','news.filterInstitution':'Institutions','news.filterMarket':'Marche',
        'aff.usim.title':'SIM voyage prete','aff.usim.desc':'Indispensable avant le depart','aff.cta':'Voir le meilleur prix →'
      },
      de:{
        'news.aiNotice':'KI-Zusammenfassung — Diese Seite fasst oeffentliche Informationen nur als Referenz zusammen. Es handelt sich nicht um offizielle Informationen; pruefen Sie vor wichtigen Entscheidungen die offiziellen Kanaele der Airlines und Institutionen.',
        'news.surchargeNote':'※ Treibstoffzuschlaege gelten nach Ausstellungsdatum, nicht nach Reservierungsdatum. Pruefen Sie den Endbetrag vor Preisänderungen.',
        'news.filterAll':'Alle','news.filterAirline':'Airline-Hinweise','news.filterInstitution':'Institutionen','news.filterMarket':'Markt',
        'aff.usim.title':'Reise-SIM bereit','aff.usim.desc':'Wichtig vor Abflug','aff.cta':'Bestpreis pruefen →'
      }
    };
    Object.assign(ko, common.ko);
    Object.assign(en, common.en);
    Object.assign(ja, common.ja);
    Object.assign(zh, common.zh);
    Object.assign(fr, common.fr);
    Object.assign(de, common.de);
    return {ko:ko,en:en,ja:ja,zh:zh,fr:fr,de:de}[lang] || en;
  }

  function ensureNewsCards(){
    if(!/news\.html(?:$|[?#])/.test(location.pathname) || !Array.isArray(window.FIXED_NEWS || FIXED_NEWS)) return;
    var removeIds = {'iran-oman-hormuz-corridor-20260826':1,'brent-wti-sharp-fall-20260826':1,'global-jetfuel-16387-20260826':1,'hormuz-commodity-vessels-two-20260826':1,'hormuz-tanker-hit-20260826':1,'hormuz-mine-removal-claims-20260826':1,'usdkrw-1382-holds-20260826':1,'us-iran-sanctions-announced-20260825':1,'brent-wti-fall-235-20260825':1,'usdkrw-1382-strong-krw-20260825':1,'hormuz-weekend-public-tracking-20260825':1,'asia-refined-products-imports-down-20260825':1,'hormuz-crude-flow-estimate-gap-20260825':1};
    FIXED_NEWS = newsCards.concat((FIXED_NEWS || []).filter(function(card){ return card && !removeIds[card.id]; }));
    window.FIXED_NEWS = FIXED_NEWS;
    var feed = (typeof NEWS_DATA !== 'undefined' && NEWS_DATA) || window.NEWS_DATA;
    if(feed && Array.isArray(feed.items)) feed.items = feed.items.filter(function(item){ return !(item && removeIds[item.id]); });
  }

  function applyNews(){
    if(!/news\.html(?:$|[?#])/.test(location.pathname)) return;
    ensureNewsCards();
    var p = newsPack(currentLang());
    Object.keys(p).forEach(function(key){ setText('[data-i18n="'+key+'"]', p[key]); });
    document.title = p['news.metaTitle'];
    meta('description', p['news.metaDesc']);
    prop('og:title', p['news.metaTitle']);
    prop('og:description', p['news.metaDesc']);
    prop('article:modified_time', '2026-08-26T08:40:00+09:00');
    var labels = {
      ko:['핵심 확인 변수','9월 21단계 확정','10월: 보합 중심 · 인하 가능성 확대','USD/KRW 약 1,382.3원','글로벌 Jet Fuel 163.87','Brent 88.58 / WTI 82.36','호르무즈 통항 2척 · 임시 항행로 논의'],
      en:['Key Check Variables','September Level 21 confirmed','October: flat-centered, reduction chance expanded','USD/KRW around 1,382.3','Global Jet Fuel 163.87','Brent 88.58 / WTI 82.36','Hormuz 2 vessels · corridor talks'],
      ja:['主要確認項目','9月21段階確定','10月: 横ばい中心・引き下げ可能性拡大','USD/KRW約1,382.3','世界Jet Fuel 163.87','Brent 88.58 / WTI 82.36','ホルムズ2隻・回廊協議'],
      zh:['核心确认变量','9月第21档确认','10月：持平中心、下调可能性扩大','USD/KRW约1,382.3','全球Jet Fuel 163.87','Brent 88.58 / WTI 82.36','霍尔木兹2艘·通道谈判'],
      fr:['Points clés','Septembre niveau 21 confirmé','Octobre: stable centré, baisse plus probable','USD/KRW env. 1 382.3','Jet Fuel mondial 163.87','Brent 88.58 / WTI 82.36','Hormuz 2 navires · corridor'],
      de:['Wichtige Prüfpunkte','September Stufe 21 bestätigt','Oktober: stabil zentriert, Senkungschance größer','USD/KRW ca. 1.382,3','Globales Jet Fuel 163.87','Brent 88.58 / WTI 82.36','Hormuz 2 Schiffe · Korridor']
    };
    var kv = labels[currentLang()] || labels.en;
    var box = document.getElementById('newsKeyVariables');
    if(box) box.innerHTML = '<div style="font-weight:700;margin-bottom:8px;">'+kv[0]+'</div><div>'+kv.slice(1).map(function(v){return '<span style="display:inline-block;margin:3px 6px 3px 0;padding:5px 8px;border:1px solid #BFDBFE;border-radius:999px;background:#EFF6FF;color:#0F172A;">'+v+'</span>';}).join('')+'</div>';
    document.querySelectorAll('.news-card').forEach(function(card){
      if(/20260826$/.test(card.id || '')) return;
      if(/^(us-iran-sanctions-announced-20260825|brent-wti-fall-235-20260825|usdkrw-1382-strong-krw-20260825|hormuz-weekend-public-tracking-20260825|asia-refined-products-imports-down-20260825|hormuz-crude-flow-estimate-gap-20260825)$/.test(card.id || '')) { card.remove(); return; }
      if(/보합~소폭 상승|flat to slight upward|93\.45|92\.17|86\.14|85\.01|158\.91|발표 예정|재개방 신호|자유항행 정상화 확인/.test(card.innerText || '')) card.remove();
    });
    updateJsonLd('news');
  }

  function wrap(){
    if(typeof window.renderForecastPage === 'function' && !window.renderForecastPage.__aug26Wrapped){
      var prevForecast = window.renderForecastPage;
      window.renderForecastPage = function(){ var out = prevForecast.apply(this, arguments); setTimeout(applyForecast, 0); return out; };
      window.renderForecastPage.__aug26Wrapped = true;
    }
    if(typeof window.renderNews === 'function' && !window.renderNews.__aug26Wrapped){
      var prevNews = window.renderNews;
      window.renderNews = function(){ ensureNewsCards(); var out = prevNews.apply(this, arguments); applyNews(); setTimeout(applyNews, 0); return out; };
      window.renderNews.__aug26Wrapped = true;
    }
    if(typeof window.applyLanguage === 'function' && !window.applyLanguage.__aug26Wrapped){
      var prevApply = window.applyLanguage;
      window.applyLanguage = function(){ var out = prevApply.apply(this, arguments); applyForecast(); applyNews(); setTimeout(function(){ applyForecast(); applyNews(); }, 0); return out; };
      window.applyLanguage.__aug26Wrapped = true;
    }
  }
  wrap();
  ensureNewsCards();
  applyForecast();
  applyNews();
  [0, 400, 900, 1600, 2800, 4600, 6200].forEach(function(ms){ setTimeout(function(){ wrap(); ensureNewsCards(); applyForecast(); applyNews(); }, ms); });
  var aug26Timer = setInterval(function(){ wrap(); ensureNewsCards(); applyForecast(); applyNews(); }, 700);
  setTimeout(function(){ clearInterval(aug26Timer); }, 7600);
})();
