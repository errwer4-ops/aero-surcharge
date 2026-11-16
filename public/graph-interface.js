(function(){
  'use strict';
  var keys=['graph.interface.nav','graph.interface.title','graph.interface.intro','graph.interface.guide'];
  var copy={
    ko:['월별 추이','월별 유류할증료 추이','항공사와 월을 선택해 공시 금액과 변동률을 비교하세요.','표시 기준과 데이터 안내'],
    en:['Monthly trends','Monthly fuel surcharges','Select an airline and month to compare published amounts and changes.','Display basis and data notes'],
    ja:['月別推移','燃油サーチャージの月別推移','航空会社と月を選び、公示金額と変化率を比較できます。','表示基準とデータの説明'],
    zh:['月度趋势','燃油附加费月度趋势','选择航空公司和月份，比较公告金额与变化率。','显示依据与数据说明'],
    fr:['Évolution mensuelle','Évolution des surtaxes carburant','Choisissez une compagnie et un mois pour comparer les montants publiés et leurs variations.','Base d’affichage et informations sur les données'],
    de:['Monatsverlauf','Monatliche Kerosinzuschläge','Wählen Sie Airline und Monat, um veröffentlichte Beträge und Änderungen zu vergleichen.','Darstellungsgrundlage und Datenhinweise']
  };
  Object.keys(copy).forEach(function(lang){
    window.I18N[lang]=window.I18N[lang]||{};
    keys.forEach(function(key,index){window.I18N[lang][key]=copy[lang][index];});
  });
})();
