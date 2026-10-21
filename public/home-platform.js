(function(){
  'use strict';
  var core=window.AeroCalculatorCore;
  if(!core)return;
  var notices=window.NOVEMBER_2026_OFFICIAL_NOTICES||[];
  function notice(code){return notices.find(function(n){return n.code===code;});}
  function language(){return (window.getCurrentLang?window.getCurrentLang():'ko')==='ko';}
  function esc(value){return String(value==null?'':value).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function install(){
    ['BX','ZE'].forEach(function(code){
      var n=notice(code),data=window._OFFICIAL_AMT&&window._OFFICIAL_AMT[code];
      if(!n||!data||!window.OFFICIAL_ROUTE_MAP)return;
      var original=window.OFFICIAL_ROUTE_MAP[code]||{},next={};
      Object.keys(original).forEach(function(route){
        var p=route.split('-'),i=core.officialRouteGroupIndex(n,p[0],p[1]);
        if(i>=0&&data.rows[i])next[route]=data.rows[i].range;
      });
      if(n.routesByGroup)n.routesByGroup.forEach(function(routes,i){routes.forEach(function(route){if(data.rows[i])next[route]=data.rows[i].range;});});
      core.noticeRouteApplicability.filter(function(route){return route.airline===code;}).forEach(function(route){
        var i=core.officialRouteGroupIndex(n,route.origin,route.destination);
        if(i>=0&&data.rows[i])next[route.origin+'-'+route.destination]=data.rows[i].range;
      });
      window.OFFICIAL_ROUTE_MAP[code]=next;
    });
    var previous=window.buildOfficialSection;
    window.buildOfficialSection=function(cd,al,miles,isRT,dep,arr){
      if(al.code!=='BX'&&al.code!=='ZE')return previous.apply(this,arguments);
      var n=notice(al.code),old=(window.OCTOBER_2026_ROUTE_GROUP_NOTICES||{})[al.code],selected=core.officialRouteGroupIndex(n,dep,arr),ko=language();
      if(!n||selected<0)return '<p class="official-section">'+(ko?'해당 노선의 공식 부과 구간을 확인할 수 없습니다.':'No verified charging group for this route.')+'</p>';
      var mult=isRT?2:1;
      function amount(v){return core.money(v)?esc(n.currency)+' '+(v*mult).toLocaleString('en-US',{maximumFractionDigits:2}):'—';}
      var rows=n.bands.map(function(band,i){
        var baseline=old&&old.bands[i]===band?old.october[i]:null,target=n.november[i],diff=core.money(baseline)&&core.money(target)?target-baseline:null;
        var delta=diff===null?'—':(diff<0?'-':diff>0?'+':'')+amount(Math.abs(diff))+'<br>'+(baseline===0?'—':((diff/baseline)*100).toFixed(2)+'%');
        // The old ZE group amounts remain in the historical data. Do not claim
        // an October route mapping is verified by the November route list.
        return '<tr class="'+(i===selected?'highlighted':'')+'"><td><span class="route-range">'+esc(band)+'</span>'+(i===selected?'<span class="route-highlight-badge">'+(ko?'선택 노선':'Selected route')+'</span>':'')+'</td><td class="route-amt-current">'+amount(baseline)+'</td><td class="route-amt-next">'+amount(target)+'</td><td>'+delta+'</td></tr>';
      }).join('');
      var applicability=core.noticeRouteApplicability.find(function(route){return route.airline===al.code&&route.origin===dep&&route.destination===arr;});
      var scopeNote=applicability?'<p class="notice-route-scope" style="font-size:12px;line-height:1.7">'+(ko?'부산 출발 UBN 공시 금액 조회입니다. 현재 운항일·좌석 제공을 뜻하지 않습니다. ':'Published surcharge lookup for PUS–UBN. This does not establish current operating dates or seat availability. ')+'<a href="'+esc(applicability.routeSourceUrl)+'" target="_blank" rel="noopener noreferrer">'+(ko?'항공사 노선 근거':'Airline route source')+'</a> · <a href="https://www.airbusan.com/web/individual/booking/schedule" target="_blank" rel="noopener noreferrer">'+(ko?'운항 일정 확인':'Check schedules')+'</a></p>':'';
      return '<div class="official-section"><div class="official-label">'+(ko?'공식 노선군 · 원통화 기준':'Official route groups · original currency')+'</div><p style="font-size:11px;line-height:1.6">'+esc(dep+' → '+arr)+' · '+(isRT?(ko?'단순 왕복 추정: 한국 출발 편도 × 2':'Simple round-trip estimate: Korea-origin one-way × 2'):(ko?'1인 편도':'One-way per person'))+'</p>'+scopeNote+'<div class="route-table-wrap"><table class="route-table"><thead><tr><th>'+(ko?'공식 노선군':'Official route group')+'</th><th>2026.10</th><th>2026.11</th><th>'+(ko?'차액 / 변동률':'Difference / change')+'</th></tr></thead><tbody>'+rows+'</tbody></table></div><p style="font-size:11px;line-height:1.7">'+(old?'<a href="'+esc(old.url)+'" target="_blank" rel="noopener noreferrer">2026.10 '+(ko?'공식 원문':'official source')+'</a> · ':(ko?'10월 노선군 대조 미완료: 월간 차액 표시 보류. ':'October route-group verification pending; monthly difference unavailable. '))+'<a href="'+esc(n.url)+'" target="_blank" rel="noopener noreferrer">2026.11 '+(ko?'공식 원문':'official source')+'</a><br>'+(ko?'11월 발권 적용: ':'November ticketing: ')+esc(n.ticketingStart)+' – '+esc(n.ticketingEnd)+'</p></div>';
    };
    var previousTrend=window._trendBadgeHtml;
    window._trendBadgeHtml=function(code,miles,dep,arr){
      if(code==='ZE')return '';
      if(code==='BX'&&dep&&arr){
        var n=notice(code),old=window.OCTOBER_2026_ROUTE_GROUP_NOTICES.BX,i=core.officialRouteGroupIndex(n,dep,arr);
        if(i<0||old.bands[i]!==n.bands[i])return '';
        var pct=(n.november[i]-old.october[i])/old.october[i]*100;
        return '<span style="font-size:11px;color:#075985">'+(pct>0?'+':'')+pct.toFixed(2)+'%</span>';
      }
      return previousTrend?previousTrend.apply(this,arguments):'';
    };
    if(window.renderLanding)window.renderLanding();
    if(window._searchCtx)window.renderCards('all');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
