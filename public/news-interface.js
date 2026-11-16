(function(){
  'use strict';
  var keys=['title','intro','graph','context','method','services','count'];
  var copy={
    ko:['참고 소식','항공사 공시와 시장 소식을 출처와 함께 확인하세요.','월별 추이','공시와 시장 참고자료','자료 기준과 이용 안내','여행 준비','건'],
    en:['News & updates','Read airline notices and market news with their sources.','Monthly trends','Notices and market context','Data sources and reading guide','Travel services','items'],
    ja:['参考ニュース','航空会社の公示と市場ニュースを出典とともに確認できます。','月別推移','公示と市場の参考資料','データの基準と利用案内','旅行の準備','件'],
    zh:['参考资讯','查看航空公司公告、市场资讯及其来源。','月度趋势','公告与市场参考资料','数据依据与使用说明','出行准备','条'],
    fr:['Actualités','Consultez les avis des compagnies et les actualités du marché avec leurs sources.','Évolution mensuelle','Avis et contexte du marché','Sources et guide de lecture','Services de voyage','articles'],
    de:['Nachrichten','Lesen Sie Airline-Mitteilungen und Marktnachrichten mit ihren Quellen.','Monatsverlauf','Mitteilungen und Markthintergrund','Datenquellen und Lesehinweise','Reiseservices','Beiträge']
  };
  Object.keys(copy).forEach(function(lang){
    window.I18N[lang]=window.I18N[lang]||{};
    keys.forEach(function(key,index){window.I18N[lang]['news.interface.'+key]=copy[lang][index];});
  });
  var note={
    ko:'적용 조건은 각 항공사의 공시 원문에서 확인하세요.',
    en:'Check each airline’s original notice for the applicable conditions.',
    ja:'適用条件は各航空会社の公示原文で確認してください。',
    zh:'适用条件请查看各航空公司的公告原文。',
    fr:'Consultez l’avis original de chaque compagnie pour les conditions applicables.',
    de:'Die geltenden Bedingungen finden Sie in der Originalmitteilung der jeweiligen Airline.'
  };
  Object.keys(note).forEach(function(lang){window.I18N[lang]['news.interface.note']=note[lang];});
})();
