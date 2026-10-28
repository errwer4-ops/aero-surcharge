(function () {
  'use strict';
  var core=window.AeroCalculatorCore, bridge=window.AeroCalculatorBridge;
  if (!core || !bridge) return;
  var storage=null; try { storage=window.localStorage; } catch (_) {}
  var store=core.createStore(storage), lastContext=null, searchSequence=0, restored=false, feedRecords=[], feedLoaded=false, renderedMonths=null;
  var el=function(id){return document.getElementById(id);};
  var english=function(){return (window.SHARED_STATE && window.SHARED_STATE.lang || 'ko') !== 'ko';};
  var t=function(ko,en){return english()?en:ko;};
  function esc(value){return String(value == null ? '' : value).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function amount(value,currency){return currency+' '+value.toLocaleString('en-US',{maximumFractionDigits:2});}
  function currentMonth(){var parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit'}).formatToParts(new Date());return parts.find(function(p){return p.type==='year';}).value+'-'+parts.find(function(p){return p.type==='month';}).value;}
  function conditions(context){return {origin:context.origin,destination:context.destination,airline:el('savingAirlineFilter').value,baseMonth:el('savingBaseMonth').value,targetMonth:el('savingTargetMonth').value,passengers:context.passengers,trip:context.trip};}
  function installNoticeRouteSupport(){
    if(!window.SAVING_INDEX_ROUTE_MAP || !Array.isArray(window.SAVING_DESTINATIONS))return;
    core.noticeRouteApplicability.forEach(function(route){
      var notice=(window.NOVEMBER_2026_OFFICIAL_NOTICES||[]).find(function(n){return n.code===route.airline;}),data=window.SAVING_COMPARE_DATA[route.airline];
      var index=core.officialRouteGroupIndex(notice,route.origin,route.destination);
      if(!notice || !data || index<0 || !data.rows[index])return;
      var key=route.origin+'-'+route.destination;
      window.SAVING_INDEX_ROUTE_MAP[route.airline]=window.SAVING_INDEX_ROUTE_MAP[route.airline]||{};
      window.SAVING_INDEX_ROUTE_MAP[route.airline][key]=data.rows[index].range;
      if(!window.SAVING_DESTINATIONS.some(function(item){return item.code===key;}))window.SAVING_DESTINATIONS.push({code:key,name:key,dep:route.origin,arr:route.destination,airlines:[route.airline],scope:route.scope});
    });
    if(window.renderSavingCalculator)window.renderSavingCalculator();
  }
  function noticeIndex(notice,route,matched,data){
    if (!route || !matched || !data) return -1;
    if (notice.code === 'ZE' || notice.code === 'BX') return core.officialRouteGroupIndex(notice,route.split('-')[0],route.split('-')[1]);
    var index=data.rows.indexOf(matched.row);
    return notice.displayBandIndices?(notice.displayBandIndices[index]===null?-1:notice.displayBandIndices[index]):index;
  }
  function recordFor(context,code,month){
    var selected=core.selectFeedRecord(feedRecords,{airline:code,origin:context.origin,destination:context.destination,month:month,direction:'one_way'});
    if(selected.present)return core.reconcile(selected.record);
    var route=context.origin+'-'+context.destination, matched=bridge.findRow(code,route), data=window.SAVING_COMPARE_DATA[code];
    if (!matched || !data) return null;
    var row=matched.row,index=data.rows.indexOf(row),notice=(window.NOVEMBER_2026_OFFICIAL_NOTICES||[]).find(function(n){return n.code===code;});
    var record={airline:code,origin:context.origin,destination:context.destination,month:month,currency:data.currency,direction:'one_way',basis:row.range || row.label,band:row.label,
      amount:null,status:'unconfirmed',validationStatus:'passed',verificationStatus:'unverified',sourceUrl:null,publishedAt:null,verifiedAt:null,collectedAt:null,effectiveFrom:null,effectiveTo:null,sourceBand:null,bandIndex:null,departureCountry:null};
    if(month==='2026-11' && notice){
      var ni=noticeIndex(notice,route,matched,data);
      if(ni<0 || !core.money(notice.november[ni]))return null;
      Object.assign(record,{amount:notice.november[ni],currency:notice.currency,sourceUrl:core.safeUrl(notice.url),direction:notice.direction,departureCountry:notice.departureCountry,bandIndex:ni,sourceBand:notice.bands[ni],
        publishedAt:notice.noticePublishedAt||notice.noticeDate||null,collectedAt:notice.collectedAt||null,effectiveFrom:notice.ticketingStart,effectiveTo:notice.ticketingEnd,band:notice.bands[ni]});
      // The published route groups take precedence over the older distance aliases.
      if(code==='BX' || code==='ZE')record.basis='route-group-'+(ni+1);
      return core.reconcile(record);
    }
    if(month==='2026-10'){
      var verifiedOld=window.OCTOBER_2026_ROUTE_GROUP_NOTICES && window.OCTOBER_2026_ROUTE_GROUP_NOTICES[code];
      if(verifiedOld){
        var oldIndex=core.officialRouteGroupIndex(verifiedOld,context.origin,context.destination),oldAmounts=verifiedOld.amounts||verifiedOld.october;
        if(oldIndex<0 || !oldAmounts || !core.money(oldAmounts[oldIndex]))return null;
        Object.assign(record,{amount:oldAmounts[oldIndex],currency:verifiedOld.currency,sourceUrl:core.safeUrl(verifiedOld.url),direction:verifiedOld.direction,departureCountry:verifiedOld.departureCountry,bandIndex:oldIndex,sourceBand:verifiedOld.bands[oldIndex],publishedAt:verifiedOld.noticePublishedAt||verifiedOld.noticeDate||null,collectedAt:verifiedOld.collectedAt||null,effectiveFrom:verifiedOld.ticketingStart||null,effectiveTo:verifiedOld.ticketingEnd||null,band:verifiedOld.bands[oldIndex],basis:'route-group-'+(oldIndex+1)});
        return core.reconcile(record);
      }
      var old=window.AERO_CALCULATOR_OCTOBER;
      var reviewedOld=window.AeroSourceTrust&&window.AeroSourceTrust.getNotice(code,month);
      if(reviewedOld&&reviewedOld.routesByGroup&&old&&old.amounts[code]){
        var reviewedIndex=core.officialRouteGroupIndex({code:code,bands:reviewedOld.bands,routesByGroup:reviewedOld.routesByGroup},context.origin,context.destination);
        if(reviewedIndex<0||!core.money(old.amounts[code][reviewedIndex]))return null;
        Object.assign(record,{amount:old.amounts[code][reviewedIndex],sourceUrl:core.safeUrl(old.sources[code.toLowerCase()]),sourceBand:reviewedOld.bands[reviewedIndex],band:reviewedOld.bands[reviewedIndex],bandIndex:reviewedIndex,basis:'route-group-'+(reviewedIndex+1),direction:reviewedOld.direction,departureCountry:reviewedOld.departureCountry,publishedAt:reviewedOld.publishedAt,effectiveFrom:reviewedOld.effectiveFrom,effectiveTo:reviewedOld.effectiveTo});
        return core.reconcile(record);
      }
      if(!old || !old.amounts[code] || !core.money(old.amounts[code][index]))return null;
      Object.assign(record,{amount:old.amounts[code][index],sourceUrl:core.safeUrl(old.sources[code.toLowerCase()]),verificationStatus:'legacy_record'});
      if(reviewedOld&&String(row.label).replace(/\s+/g,'')===String(reviewedOld.bands[index]).replace(/\s+/g,'')){
        Object.assign(record,{sourceBand:reviewedOld.bands[index],bandIndex:index,direction:reviewedOld.direction,departureCountry:reviewedOld.departureCountry,publishedAt:reviewedOld.publishedAt,effectiveFrom:reviewedOld.effectiveFrom,effectiveTo:reviewedOld.effectiveTo});
      }
      if(code==='BX' || code==='ZE')record.basis='route-group-'+(index+1);
      if(code==='ZE')record.status='unconfirmed';
      return core.reconcile(record);
    }
    // Historical records are only used when the exact original charging basis is present.
    var historical=window.MANUAL_OVERRIDES && window.MANUAL_OVERRIDES[code] && window.MANUAL_OVERRIDES[code][month.replace('-','.')];
    if(!historical || historical.sourceType!=='official_notice' || historical.status!=='official_verified' || !Array.isArray(historical.items))return null;
    var item=historical.items.find(function(v){return v.distanceRange===row.range;});
    if(!item || !core.money(item.amount) || !core.safeUrl(historical.officialNoticeUrl))return null;
    Object.assign(record,{amount:item.amount,currency:item.currency||historical.currency,sourceUrl:core.safeUrl(historical.officialNoticeUrl),direction:item.direction||historical.direction||null,departureCountry:item.departureCountry||historical.departureCountry||null,sourceBand:item.sourceBand||null,bandIndex:Number.isInteger(item.bandIndex)?item.bandIndex:null,publishedAt:historical.publishedAt||null,collectedAt:historical.collectedAt||null,effectiveFrom:historical.applicableFrom||null,effectiveTo:historical.applicableTo||null});
    if(code==='BX' || code==='ZE')record.basis='historical-'+item.distanceRange;
    return core.reconcile(record);
  }
  function getRows(context,value){
    if(!context.route)return [];
    return context.route.airlines.filter(function(code){return value.airline==='all'||value.airline===code;}).map(function(code){
      var base=recordFor(context,code,value.baseMonth),target=recordFor(context,code,value.targetMonth);
      return {code:code,name:bridge.airlineName(code),base:base,target:target,comparison:core.compare(base,target)};
    });
  }
  function allRecords(value){
    var context=bridge.contextFor(value.origin,value.destination);
    if(!context.route)return [];
    var months=['2026-10','2026-11'];
    feedRecords.forEach(function(record){if(months.indexOf(record.month)<0)months.push(record.month);});
    Object.keys(window.MANUAL_OVERRIDES||{}).forEach(function(code){Object.keys(window.MANUAL_OVERRIDES[code]||{}).forEach(function(m){m=m.replace('.','-');if(core.month(m)&&months.indexOf(m)<0)months.push(m);});});
    return context.route.airlines.filter(function(code){return value.airline==='all'||code===value.airline;}).flatMap(function(code){return months.map(function(month){return recordFor(context,code,month);}).filter(Boolean);});
  }
  function info(record){
    if(!record)return '<span class="calculator-pending">'+t('확인 중','Checking')+'</span>';
    var verified=core.isConfirmed(record);
    var status=verified?t('공시 확인 완료','Notice confirmed'):t('확인 중','Checking');
    return '<span class="calculator-status">'+status+'</span><div class="calculator-source">'+(record.sourceUrl?'<a href="'+esc(record.sourceUrl)+'" target="_blank" rel="noopener noreferrer">'+t('공시 원문','Original notice')+'</a>':t('출처 확인 중','Checking source'))+
      '<span>'+t('발표일: ','Published: ')+esc(record.publishedAt||t('미기록','not recorded'))+'</span><span>'+t('확인일: ','Checked: ')+esc(verified&&record.verifiedAt||t('미기록','not recorded'))+'</span><span>'+t('수집일: ','Collected: ')+esc(record.collectedAt||t('미기록','not recorded'))+'</span>'+
      (record.effectiveFrom?'<span>'+t('발권 적용: ','Ticketing: ')+esc(record.effectiveFrom)+' – '+esc(record.effectiveTo)+'</span>':'')+'</div>';
  }
  function nativeCell(record,multiplier){return record?'<strong>'+esc(amount(record.amount*multiplier,record.currency))+'</strong><span class="calculator-unit">'+t('1인 편도 ','Per person, one way ')+esc(amount(record.amount,record.currency))+'</span>'+info(record):info(null);}
  function delta(row,multiplier){
    var comparison=row.comparison;
    if(!comparison.valid)return '<span class="calculator-pending">'+(comparison.reason==='conditions'?t('비교 불가 · 조건 다름','Cannot compare · different conditions'):comparison.reason==='same_month'?t('다른 발권월을 선택하세요','Choose different months'):t('비교 불가 · 확인 중','Cannot compare · checking'))+'</span>';
    return '<strong>'+esc((comparison.difference>0?'+':'')+amount(comparison.difference*multiplier,comparison.currency))+'</strong><span class="calculator-unit">'+(comparison.percent===null?t('기준액 0: 변동률 계산 불가','Zero baseline: percentage unavailable'):(comparison.percent>0?'+':'')+comparison.percent.toFixed(2)+'%')+'</span>';
  }
  function refreshSurface(){
    if(!lastContext)return;
    var value=conditions(lastContext),trip=lastContext.trip===2;
    el('savingRoundTrip').textContent=t('단순 왕복 추정','Simple round-trip estimate');
    el('savingOneWay').setAttribute('aria-pressed',String(!trip));el('savingRoundTrip').setAttribute('aria-pressed',String(trip));
    el('calculatorAssumption').textContent=trip?t('단순 왕복 추정액 = 한국 출발 편도 금액 × 2 × 인원. 귀국편 국가·항공사·통화·발권 조건에 따라 실제 부과액은 달라집니다. 항공권 가격이나 최종 결제액이 아닙니다.','Simple round-trip estimate = Korea-origin one-way amount × 2 × passengers. Return country, airline, currency and ticket conditions may change the charge. This is not the ticket price or final payment.'):t('한국 출발 편도 금액 × 인원입니다. 확인 중인 금액은 비교·최저액에서 제외하며, 통화별로 표시합니다.','Korea-origin one-way amount × passengers. Amounts still being checked are excluded from comparisons and minimums. Currencies are shown separately.');
    var applicability=core.noticeRouteApplicability.find(function(route){return route.origin===value.origin&&route.destination===value.destination&&(value.airline==='all'||value.airline===route.airline);});
    if(applicability){
      el('calculatorAssumption').appendChild(document.createTextNode(t(' 부산 출발 UBN 공시 금액 조회이며 현재 운항일·좌석 제공을 뜻하지 않습니다. ',' This is a PUS–UBN surcharge lookup, not confirmation of operating dates or seat availability. ')));
      var routeLink=document.createElement('a');routeLink.href=applicability.routeSourceUrl;routeLink.target='_blank';routeLink.rel='noopener noreferrer';routeLink.textContent=t('항공사 노선 근거','Airline route source');el('calculatorAssumption').appendChild(routeLink);
    }
    var title=document.querySelector('.saving-tool-title'),sub=document.querySelector('.saving-tool-sub'),badge=document.querySelector('.saving-tool-badge');
    title.textContent=t('노선·항공사·발권월별 유류할증료 비교','Compare fuel surcharges by route, airline and ticketing month');
    sub.textContent=t('같은 항공사·구간·통화의 공시를 월별로 비교합니다.','Compare monthly notices for the same airline, band and currency.');
    badge.textContent=value.baseMonth+' → '+value.targetMonth;
    var note=document.querySelector('.saving-note');if(note)note.textContent=t('‘확인 중’은 사이트의 확인 상태이며 항공사의 미공시를 뜻하지 않습니다. 최종 금액은 예약 화면에서 확인하세요.','“Checking” refers to this site’s review, not whether the airline has published a notice. Confirm the final amount when booking.');
    document.querySelectorAll('.saving-metric-label')[1].textContent=t('통화별 최저액','Lowest by currency');
    var headers=el('savingTableWrap').querySelectorAll('thead th');
    [t('항공사 · 노선 · 부과 기준','Airline · route · charging basis'),value.baseMonth,value.targetMonth,t('월별 차액 · 변동률','Monthly difference · change')].forEach(function(label,i){if(headers[i])headers[i].textContent=label;});
    el('savingTableWrap').querySelectorAll('tbody tr').forEach(function(row){row.children[1].setAttribute('data-month',value.baseMonth);row.children[2].setAttribute('data-month',value.targetMonth);row.children[3].setAttribute('data-label',t('월별 차액 · 변동률','Monthly difference · change'));});
    var labels={calculatorBaseLabel:t('기준 발권월','Baseline ticketing month'),calculatorTargetLabel:t('비교 발권월','Comparison ticketing month'),calculatorAirlineLabel:t('관심 항공사','Airline'),calculatorSave:t('관심 노선 저장','Save route'),calculatorRecent:t('최근 검색 복원','Restore recent search'),calculatorSavedTitle:t('저장한 관심 노선','Saved routes')};
    Object.keys(labels).forEach(function(id){el(id).textContent=labels[id];});
    el('calculatorStorageNote').textContent=store.available()?t('이 브라우저에 최대 20개 노선을 저장합니다. 이메일·서버 전송 없이 이 기기에서만 유지됩니다.','Up to 20 routes are stored in this browser, without email or server submission.'):t('브라우저 저장소를 사용할 수 없어 현재 화면에서만 유지됩니다. 계산은 정상 이용할 수 있습니다.','Browser storage is unavailable; saved routes last only for this page. The calculator still works.');
    el('calculatorRecent').disabled=!store.state.recent;
    var answer=document.querySelectorAll('#calculatorFaq .faq-a')[3];if(answer)answer.textContent=t('단순 왕복 추정액은 한국 출발 편도 공시액 × 2 × 인원으로 계산합니다. 귀국편 출발 국가·항공사·통화·발권 조건에 따라 실제 부과액은 달라집니다. 항공권 가격이나 최종 결제액이 아닙니다.','A simple round-trip estimate is the Korea-origin one-way notice × 2 × passengers. The return-origin country, airline, currency and ticket conditions can change the actual surcharge. This is not the ticket price or final payment.');
  }
  function render(context){
    lastContext=context;
    var value=conditions(context),rows=getRows(context,value),multiplier=context.passengers*context.trip;
    var available=rows.filter(function(row){return row.base||row.target;});
    var lowest=core.lowestVerified(rows.map(function(row){return row.target;}));
    el('savingCarrierCount').textContent=String(available.length);
    el('savingBestJune').textContent=Object.keys(lowest).map(function(currency){return amount(lowest[currency]*multiplier,currency);}).join(' / ')||'—';
    el('savingHeadline').textContent=context.route?context.origin+' → '+context.destination:t('노선을 선택하세요','Choose a route');
    el('savingImpact').textContent=t('항공사 간 차이는 같은 통화 안에서 확인하세요. 월별 차액 = 비교 월 − 기준 월.','Compare airlines within each currency. Monthly difference = comparison month − baseline month.');
    var table=el('savingTableWrap');
    table.innerHTML=rows.length?'<table class="saving-table calculator-month-table"><caption>'+esc(context.origin+' → '+context.destination+' · '+value.baseMonth+' → '+value.targetMonth)+'</caption><thead><tr><th></th><th></th><th></th><th></th></tr></thead><tbody>'+rows.map(function(row){return '<tr data-airline="'+esc(row.code)+'"><td><span class="saving-airline-name">'+esc(row.name)+' ('+row.code+')</span><span class="saving-route-note">'+esc(context.origin+' → '+context.destination)+'</span><span class="calculator-unit">'+esc(row.base&&row.base.band||'—')+' → '+esc(row.target&&row.target.band||'—')+'</span></td><td>'+nativeCell(row.base,multiplier)+'</td><td>'+nativeCell(row.target,multiplier)+'</td><td>'+delta(row,multiplier)+'</td></tr>';}).join('')+'</tbody></table>':'<div class="saving-empty">'+t('선택한 노선의 공식 데이터를 찾을 수 없습니다. 출발지와 도착지를 다시 선택하세요.','No official data for this route. Please select an origin and destination.')+'</div>';
    table.dataset.resultStatus=available.length?'valid':'no_result';
    el('savingAffiliateDesc').textContent=t('유류할증료와 항공권 판매 가격은 다릅니다. 실제 운임·세금·좌석 조건이 포함된 항공권 총액을 제휴사에서 확인하세요.','Fuel surcharges and ticket sale prices differ. Check the total fare, taxes and seat conditions with the affiliate.');
    refreshSurface();renderSaved();renderedMonths=value.baseMonth+'|'+value.targetMonth;
    return {rows:rows,available:available};
  }
  function renderSaved(){
    var current=currentMonth();
    el('calculatorSavedList').innerHTML=store.state.saved.map(function(entry){
      var c=entry.conditions,id=core.identity(c),records=allRecords(c);
      // Old snapshots were based on status strings, not source reconciliation.
      // Establish a new baseline silently; do not manufacture revision badges.
      if(entry.snapshotVersion!==core.SNAPSHOT_VERSION&&restored&&feedLoaded)store.acknowledge(id,records);
      var changes=entry.snapshotVersion===core.SNAPSHOT_VERSION?core.changes(entry.snapshot,core.snapshot(records),current,entry.observed):[];
      var badges={new_notice:t('새 공식 공시','New official notice'),notice_revision:t('공식 공시 수정','Official revision'),historical_added:t('과거 공시 추가','Historical notice added'),historical_revision:t('과거 공시 수정','Historical revision')};
      return '<li><button type="button" data-route-load="'+esc(id)+'">'+esc(c.origin+' → '+c.destination+' · '+(c.airline==='all'?t('전체 항공사','All airlines'):c.airline))+'<small>'+esc(c.baseMonth+' → '+c.targetMonth)+'</small></button>'+changes.map(function(kind){return '<span class="calculator-update">'+badges[kind]+'</span>';}).join('')+'<button type="button" data-route-delete="'+esc(id)+'" aria-label="'+esc(c.origin+' '+c.destination+' '+t('삭제','Delete'))+'">'+t('삭제','Delete')+'</button></li>';
    }).join('')||'<li>'+t('저장한 관심 노선이 없습니다.','No saved routes yet.')+'</li>';
  }
  function restore(value){
    if(!core.normalizeConditions(value))return false;
    el('savingAirlineFilter').value=value.airline;el('savingBaseMonth').value=value.baseMonth;el('savingTargetMonth').value=value.targetMonth;
    return bridge.restore(value);
  }
  function track(name,params,key){if(window.AeroAnalytics)window.AeroAnalytics.track(name,params,key);}
  function search(action){
    ['Origin','Destination'].forEach(function(kind){var select=el('saving'+kind),input=el('saving'+kind+'Input'),option=select.selectedOptions[0],typed=input.value.trim();if(!option || (typed!==option.textContent.trim() && typed!==select.value))select.value='';});
    var context=bridge.getContext(),value=conditions(context),id='calculator-'+(++searchSequence);
    var params={origin:/^[A-Z]{3}$/.test(value.origin)?value.origin:undefined,destination:/^[A-Z]{3}$/.test(value.destination)?value.destination:undefined,airline:value.airline==='all'?undefined:value.airline,base_month:value.baseMonth,compare_month:value.targetMonth,placement:'calculator',result_status:'requested',trip_type:context.trip===2?'round_trip_estimate':'one_way'};
    if(action==='search')track('route_search',params,id+'-request');
    bridge.update();
    var result=getRows(bridge.getContext(),value),valid=result.filter(function(row){return row.base||row.target;});
    params.result_status=valid.length?'valid':'no_result';params.result_count=valid.length;
    if(action==='search'){
      track(valid.length?'route_result_view':'route_no_result',params,id+'-result');
      if(valid.length>1)track('airline_compare',params,id+'-airlines');
      if(result.some(function(row){return row.comparison.valid;}))track('month_compare',params,id+'-months');
    }
    if(action==='month' && result.some(function(row){return row.comparison.valid;}))track('month_compare',params,id+'-months');
    if(core.normalizeConditions(value) && context.route)store.recent(value);
    refreshSurface();
  }
  window.AeroCalculatorPlatform={render:render,refreshSurface:refreshSurface,recordFor:recordFor,getRows:getRows,search:search};
  el('calculatorSave').addEventListener('click',function(){
    var value=conditions(bridge.getContext());
    if(!bridge.getContext().route || !store.save(value,allRecords(value))){el('calculatorSaveStatus').textContent=t('유효한 노선을 선택하세요. 최대 20개까지 저장할 수 있습니다.','Choose a valid route. Up to 20 routes can be saved.');return;}
    el('calculatorSaveStatus').textContent=store.available()?t('관심 노선을 저장했습니다.','Route saved.'):t('이번 화면에 저장했습니다. 브라우저 저장소를 사용할 수 없습니다.','Saved for this page only; browser storage is unavailable.');renderSaved();refreshSurface();
  });
  el('calculatorRecent').addEventListener('click',function(){if(store.state.recent)restore(store.state.recent);});
  el('calculatorSavedList').addEventListener('click',function(event){
    var button=event.target.closest('button');if(!button)return;
    var id=button.dataset.routeDelete||button.dataset.routeLoad;
    if(button.dataset.routeDelete){store.remove(id);renderSaved();return;}
    var entry=store.state.saved.find(function(item){return core.identity(item.conditions)===id;});
    if(entry && restore(entry.conditions)){store.acknowledge(id,allRecords(entry.conditions));renderSaved();}
  });
  el('savingAirlineFilter').addEventListener('change',function(){bridge.update();});
  ['savingBaseMonth','savingTargetMonth'].forEach(function(id){el(id).addEventListener('change',function(){
    var next=el('savingBaseMonth').value+'|'+el('savingTargetMonth').value;
    if(next===renderedMonths){bridge.update();return;}
    search('month');
  });});
  document.addEventListener('aero:calculator-ready',function(){installNoticeRouteSupport();if(!restored){restored=true;if(store.state.recent)restore(store.state.recent);}bridge.update();});
  document.addEventListener('aero:source-provenance-ready',function(){bridge.update();});
  installNoticeRouteSupport();
  fetch('data/official_surcharge_feed.json',{credentials:'same-origin'}).then(function(response){return response.ok?response.json():null;}).then(function(feed){feedRecords=core.validatedFeedRecords(feed);feedLoaded=true;bridge.update();}).catch(function(){feedLoaded=true;bridge.update();/* Keep source-reconciled embedded notices if the feed is unavailable. */});
  bridge.update();
})();
