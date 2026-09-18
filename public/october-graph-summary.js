(function(){
  'use strict';
  var data={
    ko:['9월 → 10월 확정 산정 비교','10월 23단계 확정 · 9월 21단계 대비 +2단계. 원화 금액은 평균환율 하락으로 일부 노선에서 감소했습니다.','Singapore Jet Fuel/MOPS 평균','국제선 단계','산정기간 평균 USD/KRW','9월','10월','10월 항공사별 상세 금액은 확인된 공식공지와 비교하세요.'],
    en:['Confirmed September → October calculation','October Level 23 is confirmed, up two from September Level 21. Lower average FX reduced some KRW route charges.','Singapore Jet Fuel/MOPS average','International stage','Period-average USD/KRW','September','October','Compare route charges with confirmed official airline notices.'],
    ja:['9月→10月確定算定比較','10月23段階が確定、9月21段階から+2。平均為替低下で一部KRW額は減少。','Singapore Jet Fuel/MOPS平均','国際線段階','期間平均USD/KRW','9月','10月','路線別金額は公式公示で確認してください。'],
    zh:['9月→10月确定计算对比','10月第23档确定，比9月第21档高2档。平均汇率下降令部分韩元金额降低。','Singapore Jet Fuel/MOPS均值','国际线档位','期间平均USD/KRW','9月','10月','航线金额请核对官方公告。'],
    fr:['Calcul confirmé septembre → octobre','Octobre niveau 23, +2 sur septembre niveau 21. La baisse du change moyen réduit certains montants KRW.','Moyenne Singapore Jet Fuel/MOPS','Niveau international','USD/KRW moyen de période','Septembre','Octobre','Vérifiez les montants par ligne auprès des avis officiels.'],
    de:['Bestätigte Berechnung September → Oktober','Oktober Stufe 23, +2 gegenüber September Stufe 21. Niedrigeres Perioden-FX senkte manche KRW-Beträge.','Singapore Jet Fuel/MOPS-Mittel','Internationale Stufe','Periodenmittel USD/KRW','September','Oktober','Streckenbeträge bitte mit offiziellen Airline-Hinweisen vergleichen.']
  };
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function row(label,sept,oct,unit,max,reverse,t){
    function line(month,value,color){return '<div style="display:grid;grid-template-columns:90px minmax(0,1fr) 90px;align-items:center;gap:8px;margin:5px 0"><span>'+esc(month)+'</span><div style="height:12px;background:#eaf4fc"><div style="height:12px;background:'+color+';width:'+(value/max*100).toFixed(1)+'%"></div></div><strong style="text-align:right">'+esc(value.toLocaleString('en-US',{maximumFractionDigits:2})+unit)+'</strong></div>';}
    return '<div style="margin:13px 0"><strong>'+esc(label)+'</strong>'+line(t[5],sept,reverse?'#15803d':'#64748b')+line(t[6],oct,reverse?'#0891b2':'#0369a1')+'</div>';
  }
  function render(){
    var intro=document.querySelector('[data-i18n="graph.intro"]');if(!intro)return;
    var box=document.getElementById('octoberGraphSummary');if(!box){box=document.createElement('section');box.id='octoberGraphSummary';box.style.cssText='margin:22px 0;padding:14px 0;border-top:1px solid #bfdbfe;border-bottom:1px solid #bfdbfe;line-height:1.5';intro.insertAdjacentElement('afterend',box);}
    var lang=(document.getElementById('navLang')||{}).value||localStorage.getItem('aero_lang')||'ko';if(lang==='cn')lang='zh';var t=data[lang]||data.en;
    box.innerHTML='<h2 style="font-size:18px;margin:0 0 5px">'+esc(t[0])+'</h2><p style="margin:0">'+esc(t[1])+'</p>'+
      row(t[2],149.29,158.57,' USD/bbl',165,false,t)+row(t[3],21,23,'',25,false,t)+row(t[4],1446,1370.95,' KRW',1500,true,t)+
      '<p style="margin:8px 0 0;font-size:12px">'+esc(t[7])+' <a href="news.html">'+esc(t[0])+'</a></p>';
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
  document.getElementById('navLang')?.addEventListener('change',function(){setTimeout(render,0);});
})();
