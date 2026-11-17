(function(){
  'use strict';
  var keys=['graph.interface.nav','graph.interface.title','graph.interface.intro','graph.interface.guide'];
  var copy={
    ko:['월별 추이','월별 유류할증료 추이','11월·12월 발권분 공시 금액을 비교하세요. 12월은 대한항공·아시아나·에어부산 확인분이며, 아시아나는 12월 16일까지 발권 기준입니다.','표시 기준과 데이터 안내'],
    en:['Monthly trends','Monthly fuel surcharges','Compare notices for November and December ticketing. December includes Korean Air, Asiana and Air Busan; Asiana applies to tickets issued through December 16.','Display basis and data notes'],
    ja:['月別推移','燃油サーチャージの月別推移','11月・12月発券分の公示金額を比較できます。12月は大韓航空・アシアナ・エアプサン確認分で、アシアナは12月16日までの発券が対象です。','表示基準とデータの説明'],
    zh:['月度趋势','燃油附加费月度趋势','比较11月与12月出票的公告金额。12月已核实大韩航空、韩亚航空、釜山航空；韩亚适用截至12月16日出票的机票。','显示依据与数据说明'],
    fr:['Évolution mensuelle','Évolution des surtaxes carburant','Comparez les avis de novembre et décembre de Korean Air, Asiana et Air Busan. Asiana concerne les billets émis jusqu’au 16 décembre.','Base d’affichage et informations sur les données'],
    de:['Monatsverlauf','Monatliche Kerosinzuschläge','Vergleichen Sie die November- und Dezember-Mitteilungen von Korean Air, Asiana und Air Busan. Asiana gilt für Ausstellung bis 16. Dezember.','Darstellungsgrundlage und Datenhinweise']
  };
  Object.keys(copy).forEach(function(lang){
    window.I18N[lang]=window.I18N[lang]||{};
    keys.forEach(function(key,index){window.I18N[lang][key]=copy[lang][index];});
  });
})();
