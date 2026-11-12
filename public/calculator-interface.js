(function(){
  'use strict';
  var keys=['calc.interface.graph','calc.interface.criteria','calc.interface.faq','calc.interface.reference','calc.interface.title'];
  var copy={
    ko:['월별 추이','계산 기준과 공시 안내','자주 묻는 질문','유류할증료 산정 방식','유류할증료 계산기'],
    en:['Monthly trends','Calculation basis and notices','Frequently asked questions','How fuel surcharges are calculated','Fuel Surcharge Calculator'],
    ja:['月別推移','計算基準と公示の案内','よくある質問','燃油サーチャージの算定方法','燃油サーチャージ計算機'],
    zh:['月度趋势','计算依据与公告说明','常见问题','燃油附加费的计算方式','燃油附加费计算器'],
    fr:['Évolution mensuelle','Bases du calcul et avis','Questions fréquentes','Calcul des surtaxes carburant','Calculateur de surtaxe carburant'],
    de:['Monatsverlauf','Berechnungsgrundlagen und Mitteilungen','Häufige Fragen','Berechnung der Kerosinzuschläge','Kerosinzuschlag-Rechner']
  };
  Object.keys(copy).forEach(function(lang){
    window.I18N[lang]=window.I18N[lang]||{};
    keys.forEach(function(key,index){window.I18N[lang][key]=copy[lang][index];});
  });
})();
