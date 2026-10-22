(function(){
  'use strict';
  var core=window.AeroCalculatorCore;
  if(!core)return;
  function notice(code){return (window.NOVEMBER_2026_OFFICIAL_NOTICES||[]).find(function(n){return n.code===code;});}
  function language(){return (window.getCurrentLang?window.getCurrentLang():'ko')==='ko';}
  function esc(value){return String(value==null?'':value).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function noticeOnlyEvaluator(){return window.AeroSourceTrust?{evaluate:window.AeroSourceTrust.evaluateNotice}:null;}
  function recordFor(code,index,month,dep,arr,routeSpecific){
    var data=window._OFFICIAL_AMT&&window._OFFICIAL_AMT[code],row=data&&data.rows[index],n=notice(code);
    if(!row)return null;
    var record={airline:code,origin:dep,destination:arr,month:month,basis:row.range||row.label,currency:data.currency,direction:'one_way',departureCountry:null,band:row.label,sourceBand:null,bandIndex:null,amount:null,status:'unconfirmed',validationStatus:'passed',sourceUrl:null,publishedAt:null,collectedAt:null,effectiveFrom:null,effectiveTo:null};
    if(month==='2026-11'&&n){
      Object.assign(record,{amount:n.november[index],currency:n.currency,sourceUrl:core.safeUrl(n.url),band:n.bands[index],sourceBand:n.bands[index],bandIndex:index,direction:n.direction,departureCountry:n.departureCountry,publishedAt:n.noticePublishedAt||n.noticeDate||null,collectedAt:n.collectedAt||null,effectiveFrom:n.ticketingStart,effectiveTo:n.ticketingEnd});
    }else if(month==='2026-10'){
      var old=(window.OCTOBER_2026_ROUTE_GROUP_NOTICES||{})[code];
      var reviewed=window.AeroSourceTrust&&window.AeroSourceTrust.getNotice(code,month);
      Object.assign(record,{amount:row.july,sourceUrl:core.safeUrl((window.OCTOBER_2026_NOTICE_LINKS||{})[code])});
      if(old){
        Object.assign(record,{amount:(old.amounts||old.october)[index],currency:old.currency,sourceUrl:core.safeUrl(old.url),band:old.bands[index],sourceBand:old.bands[index],bandIndex:index,direction:old.direction,departureCountry:old.departureCountry,publishedAt:old.noticePublishedAt||old.noticeDate||null,effectiveFrom:old.ticketingStart,effectiveTo:old.ticketingEnd});
      }else if(reviewed&&reviewed.routesByGroup){
        // October's independently reviewed route list establishes its identity.
        Object.assign(record,{band:reviewed.bands[index],sourceBand:reviewed.bands[index],bandIndex:index,direction:reviewed.direction,departureCountry:reviewed.departureCountry,publishedAt:reviewed.publishedAt,effectiveFrom:reviewed.effectiveFrom,effectiveTo:reviewed.effectiveTo});
      }else if(reviewed&&String(row.label).replace(/\s+/g,'')===String(reviewed.bands[index]).replace(/\s+/g,'')){
        Object.assign(record,{sourceBand:reviewed.bands[index],bandIndex:index,direction:reviewed.direction,departureCountry:reviewed.departureCountry,publishedAt:reviewed.publishedAt,effectiveFrom:reviewed.effectiveFrom,effectiveTo:reviewed.effectiveTo});
      }
    }
    if(!core.money(record.amount))return null;
    if(code==='BX'||code==='ZE')record.basis='route-group-'+(index+1);
    return core.reconcile(record,routeSpecific?null:noticeOnlyEvaluator());
  }
  function selectedIndex(code,dep,arr){
    var n=notice(code),data=window._OFFICIAL_AMT&&window._OFFICIAL_AMT[code];
    if(!data)return -1;
    if(code==='BX'||code==='ZE')return core.officialRouteGroupIndex(n,dep,arr);
    var basis=window.OFFICIAL_ROUTE_MAP&&window.OFFICIAL_ROUTE_MAP[code]&&window.OFFICIAL_ROUTE_MAP[code][dep+'-'+arr];
    return basis?data.rows.findIndex(function(row){return row.range===basis;}):-1;
  }
  function koreaMonth(){return new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit'}).format(new Date());}
  function latestTime(values){return values.filter(function(v){return typeof v==='string'&&Number.isFinite(Date.parse(v));}).sort(function(a,b){return Date.parse(b)-Date.parse(a);})[0]||null;}
  function landingMonthState(code,month){
    var data=window._OFFICIAL_AMT&&window._OFFICIAL_AMT[code],n=notice(code),records=[],total=0,verified=0;
    var slot=month==='2026-10'?'july':month==='2026-11'?'august':null;
    var url=month==='2026-11'&&n?n.url:month==='2026-10'?(window.OCTOBER_2026_NOTICE_LINKS||{})[code]:null;
    if(data&&slot)data.rows.forEach(function(row,index){
      if(!core.money(row[slot]))return;
      total++;
      // This checks notice bands without making a route/flight-schedule claim.
      var record=recordFor(code,index,month,'ICN','NRT',false);
      var completeNotice=month!=='2026-11'||window.AeroSourceTrust&&window.AeroSourceTrust.summarize([n],month).verifiedCount===1;
      if(record&&record.amount===row[slot]&&completeNotice&&core.isConfirmed(record,noticeOnlyEvaluator())){verified++;records.push(record);}
    });
    return {month:month,url:core.safeUrl(url),total:total,verified:verified,status:total&&verified===total?'verified':verified?'partial':total?'pending':'missing',sourceVerifiedAt:latestTime(records.map(function(r){return r.verifiedAt;})),collectedAt:latestTime(records.map(function(r){return r.collectedAt;}))};
  }
  function landingState(code){
    var current=landingMonthState(code,koreaMonth()),latest=landingMonthState(code,notice(code)?'2026-11':'2026-10');
    return {current:current,latest:latest,publication:landingMonthState(code,'2026-11')};
  }
  function summarizeComparison(pairs){
    if(!pairs.length)return null;
    var rates=pairs.map(function(pair){return pair.percent;}),minimum=Math.min.apply(null,rates),maximum=Math.max.apply(null,rates);
    return {kind:minimum>0?'increase':maximum<0?'decrease':minimum===0&&maximum===0?'unchanged':minimum===0?'rise_and_unchanged':maximum===0?'fall_and_unchanged':'mixed',minimum:minimum,maximum:maximum,pairs:pairs,archived:pairs.some(function(pair){return !pair.sourceVerified;})};
  }
  function landingComparison(code){
    var n=notice(code),data=window._OFFICIAL_AMT&&window._OFFICIAL_AMT[code],pairs=[];
    if(!n||!data||landingMonthState(code,'2026-11').status!=='verified'||data.currency!==n.currency||!Array.isArray(n.october)||n.october.length!==n.bands.length||new Set(data.rows.map(function(row){return row.range;})).size!==data.rows.length)return null;
    var reviewedOld=window.AeroSourceTrust&&window.AeroSourceTrust.getNotice(code,'2026-10');
    n.bands.forEach(function(band,index){
      var row=data.rows[index],baseline=n.october[index],target=n.november[index];
      // Both saved monthly slots must identify the same row and native currency.
      // Nulls, missing amounts, zero denominators and mismatched slots are omitted.
      if(!row||!row.range||!band||!core.money(baseline)||baseline===0||!core.money(target)||row.july!==baseline||row.august!==target)return;
      // Known original-source disagreement cannot be reclassified as an archive.
      if(reviewedOld&&(reviewedOld.currency!==n.currency||reviewedOld.direction!==n.direction||reviewedOld.departureCountry!==n.departureCountry||reviewedOld.bands[index]!==band||reviewedOld.amounts[index]!==baseline))return;
      var baseRecord=recordFor(code,index,'2026-10','ICN','NRT',false),targetRecord=recordFor(code,index,'2026-11','ICN','NRT',false);
      pairs.push({band:band,basis:row.range,currency:n.currency,base:baseline,target:target,percent:(target-baseline)/baseline*100,sourceVerified:core.compare(baseRecord,targetRecord,noticeOnlyEvaluator()).valid});
    });
    return summarizeComparison(pairs);
  }
  function comparisonLabel(comparison){
    var ko=language(),min=comparison.minimum,max=comparison.maximum,fmt=function(value){return value.toFixed(1)+'%';};
    if(comparison.kind==='increase')return ko?'전월 대비 최소 '+fmt(min)+' 상승':'At least '+fmt(min)+' higher than October';
    if(comparison.kind==='decrease')return ko?'전월 대비 최소 '+fmt(Math.abs(max))+' 하락':'At least '+fmt(Math.abs(max))+' lower than October';
    if(comparison.kind==='unchanged')return ko?'전월 대비 변동 없음':'Unchanged from October';
    if(comparison.kind==='rise_and_unchanged')return ko?'전월 대비 동결~최대 '+fmt(max)+' 상승':'Unchanged to '+fmt(max)+' higher';
    if(comparison.kind==='fall_and_unchanged')return ko?'전월 대비 동결~최대 '+fmt(Math.abs(min))+' 하락':'Unchanged to '+fmt(Math.abs(min))+' lower';
    return ko?'전월 대비 '+fmt(min)+'~+'+fmt(max)+' 변동':fmt(min)+' to +'+fmt(max)+' versus October';
  }
  function landingComparisonHtml(code){
    var comparison=landingComparison(code);if(!comparison)return '';
    var ko=language(),label=comparisonLabel(comparison),pending=comparison.pairs.filter(function(pair){return !pair.sourceVerified;});
    var explanation=(ko?'2026년 10월 → 11월, 동일 통화·동일 저장 구간의 '+comparison.pairs.length+'개 금액쌍 기준입니다. 누락·미공시·기준액 0인 구간은 제외합니다. 비율은 소수 첫째 자리로 반올림합니다.':'October → November 2026, '+comparison.pairs.length+' pairs in the same currency and stored charging band. Missing, unpublished and zero-baseline bands are excluded. Percentages are rounded to one decimal.');
    if(pending.length)explanation+=' '+(ko?'10월 보관 기록을 포함한 참고 비율입니다.':'An indicative rate including retained October records.');
    return '<details class="mini-trend-details" style="margin-top:7px;font-size:11px;line-height:1.6"><summary title="'+esc(explanation)+'" aria-label="'+esc(code+' · '+label+(comparison.archived?' · '+(ko?'보관 기록 기준':'Retained records'):'')+' · '+(ko?'계산 근거 보기':'Calculation details'))+'" style="cursor:pointer;color:#075985"><span class="mini-trend-label">'+esc(label)+'</span>'+(comparison.archived?' <small class="mini-archive-mark" style="color:var(--muted)">'+(ko?'보관 기록 기준':'Retained records')+'</small>':'')+'</summary><div style="margin-top:5px;color:var(--muted);overflow-wrap:anywhere">'+esc(explanation)+'<ul style="padding-left:16px;margin:5px 0">'+comparison.pairs.map(function(pair){return '<li>'+esc(pair.band+' · '+pair.currency+' '+pair.base.toLocaleString('en-US')+' → '+pair.target.toLocaleString('en-US')+' · '+(pair.percent>0?'+':'')+pair.percent.toFixed(1)+'%')+(!pair.sourceVerified?' · '+(ko?'10월 보관 기록':'October retained record'):'')+'</li>';}).join('')+'</ul></div></details>';
  }
  function landingLabel(state){
    var ko=language();
    return state.status==='verified'?(ko?'공시 완료':'Notice available'):state.status==='partial'||state.status==='pending'?(ko?'공시 확인 중':'Notice pending'):(ko?'해당 월 데이터 없음':'No data for this month');
  }
  function updateStatusText(siteEditedAt){
    var text=document.getElementById('statusText');if(!text)return;
    var states=(window.KR_AIRLINES||[]).flatMap(function(al){var state=landingState(al.code);return [state.current,state.latest];}),ko=language();
    function stamp(value){return value&&Number.isFinite(Date.parse(value))?new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(new Date(value))+' KST':ko?'미기록':'not recorded';}
    text.textContent=(ko?'사이트 문구 수정: ':'Site text edited: ')+stamp(siteEditedAt)+' · '+(ko?'공시 확인: ':'Notices checked: ')+stamp(latestTime(states.map(function(s){return s.sourceVerifiedAt;})))+' · '+(ko?'공시 수집: ':'Notice collected: ')+stamp(latestTime(states.map(function(s){return s.collectedAt;})));
    var feedDate=window.FEED&&window.FEED.meta&&window.FEED.meta.lastUpdated;
    if(feedDate)text.textContent+=' · '+(ko?'별도 피드 파일 갱신: ':'Separate feed file updated: ')+stamp(feedDate);
    var strip=document.getElementById('statusStrip');if(strip)strip.style.display='flex';
  }
  function install(){
    ['BX','ZE'].forEach(function(code){
      var n=notice(code),data=window._OFFICIAL_AMT&&window._OFFICIAL_AMT[code];
      if(!n||!data||!window.OFFICIAL_ROUTE_MAP)return;
      var original=window.OFFICIAL_ROUTE_MAP[code]||{},next={};
      Object.keys(original).forEach(function(route){var p=route.split('-'),i=core.officialRouteGroupIndex(n,p[0],p[1]);if(i>=0&&data.rows[i])next[route]=data.rows[i].range;});
      if(n.routesByGroup)n.routesByGroup.forEach(function(routes,i){routes.forEach(function(route){if(data.rows[i])next[route]=data.rows[i].range;});});
      core.noticeRouteApplicability.filter(function(route){return route.airline===code;}).forEach(function(route){var i=core.officialRouteGroupIndex(n,route.origin,route.destination);if(i>=0&&data.rows[i])next[route.origin+'-'+route.destination]=data.rows[i].range;});
      window.OFFICIAL_ROUTE_MAP[code]=next;
    });
    window.buildOfficialSection=function(cd,al,miles,isRT,dep,arr){
      var data=window._OFFICIAL_AMT&&window._OFFICIAL_AMT[al.code],selected=selectedIndex(al.code,dep,arr),ko=language(),mult=isRT?2:1;
      if(!data||selected<0)return '<p class="official-section">'+(ko?'해당 노선의 부과 구간을 확인할 수 없습니다.':'No charging group established for this route.')+'</p>';
      function amount(record){return record?esc(record.currency)+' '+(record.amount*mult).toLocaleString('en-US',{maximumFractionDigits:2}):'—';}
      function cell(record,index){
        if(!record)return '—<br><small>'+(ko?'공식 데이터 없음':'No official data')+'</small>';
        var confirmed=core.isConfirmed(record,index===selected?null:noticeOnlyEvaluator());
        return amount(record)+'<br><small class="source-verification-status" style="white-space:normal;color:var(--muted)">'+(confirmed?(ko?'공시 확인 완료':'Notice confirmed'):(ko?'확인 중':'Pending'))+'</small>';
      }
      var rows=data.rows.map(function(row,index){
        var baseline=recordFor(al.code,index,'2026-10',dep,arr,index===selected),target=recordFor(al.code,index,'2026-11',dep,arr,index===selected);
        var comparison=core.compare(baseline,target,index===selected?null:noticeOnlyEvaluator()),delta='—';
        if(comparison.valid)delta=(comparison.difference<0?'-':comparison.difference>0?'+':'')+esc(comparison.currency)+' '+(Math.abs(comparison.difference)*mult).toLocaleString('en-US',{maximumFractionDigits:2})+'<br>'+(comparison.percent===null?(ko?'기준액 0: 비율 계산 불가':'Zero baseline: no percentage'):(comparison.percent>0?'+':'')+comparison.percent.toFixed(2)+'%');
        var band=target&&target.band||baseline&&baseline.band||row.label;
        return '<tr class="'+(index===selected?'highlighted':'')+'" data-source-verified="'+String(index===selected&&core.isConfirmed(target))+'"><td><span class="route-range">'+esc(band)+'</span>'+(index===selected?'<span class="route-highlight-badge">'+(ko?'선택 노선':'Selected route')+'</span>':'')+'</td><td class="route-amt-current">'+cell(baseline,index)+'</td><td class="route-amt-next">'+cell(target,index)+'</td><td>'+delta+'</td></tr>';
      }).join('');
      var applicability=core.noticeRouteApplicability.find(function(route){return route.airline===al.code&&route.origin===dep&&route.destination===arr;});
      var scopeNote=applicability?'<p class="notice-route-scope" style="font-size:12px;line-height:1.7">'+(ko?'부산 출발 UBN 공시 금액 조회입니다. 현재 운항일·좌석 제공을 뜻하지 않습니다. ':'Published surcharge lookup for PUS–UBN. This does not establish current operating dates or seat availability. ')+'<a href="'+esc(applicability.routeSourceUrl)+'" target="_blank" rel="noopener noreferrer">'+(ko?'항공사 노선 근거':'Airline route source')+'</a> · <a href="https://www.airbusan.com/web/individual/booking/schedule" target="_blank" rel="noopener noreferrer">'+(ko?'운항 일정 확인':'Check schedules')+'</a></p>':'';
      var sources=['2026-10','2026-11'].map(function(month){var record=recordFor(al.code,selected,month,dep,arr,true);if(!record)return '';return (record.sourceUrl?'<a href="'+esc(record.sourceUrl)+'" target="_blank" rel="noopener noreferrer">'+month+' '+(ko?'원문 링크':'Source link')+'</a>':'')+' · '+(ko?'발표일: ':'Published: ')+esc(record.publishedAt||(ko?'미기록':'not recorded'))+' · '+(ko?'확인일: ':'Checked: ')+esc(record.verifiedAt||(ko?'미기록':'not recorded'))+(record.effectiveFrom?' · '+(ko?'발권 적용: ':'Ticketing: ')+esc(record.effectiveFrom)+' – '+esc(record.effectiveTo):'');}).filter(Boolean).join('<br>');
      return '<div class="official-section"><div class="official-label">'+(ko?'공시 금액 · 원통화':'Notice amounts · original currency')+'</div><p style="font-size:11px;line-height:1.6">'+esc(dep+' → '+arr)+' · '+(isRT?(ko?'단순 왕복 추정: 한국 출발 편도 × 2':'Simple round-trip estimate: Korea-origin one-way × 2'):(ko?'1인 편도':'One-way per person'))+'</p>'+scopeNote+'<div class="route-table-wrap"><table class="route-table"><thead><tr><th>'+(ko?'공시 부과 구간':'Published charging band')+'</th><th>2026.10</th><th>2026.11</th><th>'+(ko?'차액 / 변동률':'Difference / change')+'</th></tr></thead><tbody>'+rows+'</tbody></table></div><p style="font-size:11px;line-height:1.7">'+(ko?'확인된 금액만 비교합니다. 확인 중인 금액은 비교에서 제외합니다.':'Only confirmed amounts are compared. Pending amounts are excluded.')+'<br>'+sources+'</p></div>';
    };
    window._trendBadgeHtml=function(code,miles,dep,arr){
      var index=selectedIndex(code,dep,arr);if(index<0)return '';
      var comparison=core.compare(recordFor(code,index,'2026-10',dep,arr,true),recordFor(code,index,'2026-11',dep,arr,true));
      if(!comparison.valid||comparison.percent===null)return '';
      return '<span style="font-size:11px;color:#075985">'+(comparison.percent>0?'+':'')+comparison.percent.toFixed(2)+'%</span>';
    };
    window.AeroHomePlatform={recordFor:recordFor,selectedIndex:selectedIndex,landingState:landingState,landingLabel:landingLabel,landingComparison:landingComparison,landingComparisonHtml:landingComparisonHtml,summarizeComparison:summarizeComparison,comparisonLabel:comparisonLabel,updateStatusText:updateStatusText};
    (window.KR_AIRLINES||[]).forEach(function(al){al.hasOfficialNotice=landingState(al.code).current.status==='verified';});
    if(window.renderLanding)window.renderLanding();
    if(window._searchCtx)window.renderCards('all');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
