(function(){
  'use strict';
  var keys=['title','intro','search','note','guide','related','graph','korea','forecast','ke','oz','jeju','lj','tw'];
  var copy={
    ko:['항공사 공시','항공사별 공시 금액과 월별 비교를 확인하세요.','항공사 이름 또는 코드','대표 금액은 첫 공시 구간 기준입니다. 노선별 금액은 상세 비교에서 확인하세요.','표시 기준과 공시 안내','항공사별 상세 안내','월별 추이','한국 출발 유류할증료','다음 달 전망','대한항공 ↗','아시아나항공 ↗','제주항공 ↗','진에어 ↗','티웨이항공 ↗'],
    en:['Airline notices','Check published surcharges and compare months by airline.','Airline name or code','The amount shown is for the first published band. Open the comparison for route-specific amounts.','Display basis and notice details','Airline guides','Monthly trends','Surcharges from Korea','Next month’s outlook','Korean Air ↗','Asiana Airlines ↗','Jeju Air ↗','Jin Air ↗','T’way Air ↗'],
    ja:['航空会社の公示','航空会社ごとの公示金額と月別比較を確認できます。','航空会社名またはコード','代表金額は最初の公示区分の金額です。路線別の金額は詳細比較で確認できます。','表示基準と公示の説明','航空会社別ガイド','月別推移','韓国発の燃油サーチャージ','翌月の見通し','大韓航空 ↗','アシアナ航空 ↗','チェジュ航空 ↗','ジンエアー ↗','ティーウェイ航空 ↗'],
    zh:['航空公司公告','查看各航空公司的公告金额和月度比较。','航空公司名称或代码','代表金额取自首个已公布区间。各航线金额请查看详细比较。','显示依据与公告说明','航空公司指南','月度趋势','韩国出发燃油附加费','下月展望','大韩航空 ↗','韩亚航空 ↗','济州航空 ↗','真航空 ↗','德威航空 ↗'],
    fr:['Avis des compagnies','Consultez les surtaxes publiées et comparez les mois par compagnie.','Nom ou code de la compagnie','Le montant affiché correspond à la première tranche publiée. Consultez le détail pour les montants par liaison.','Base d’affichage et détails des avis','Guides par compagnie','Évolution mensuelle','Surtaxes au départ de Corée','Perspectives du mois prochain','Korean Air ↗','Asiana Airlines ↗','Jeju Air ↗','Jin Air ↗','T’way Air ↗'],
    de:['Airline-Mitteilungen','Prüfen Sie veröffentlichte Zuschläge und vergleichen Sie die Monate je Airline.','Name oder Code der Airline','Der Betrag gilt für die erste veröffentlichte Stufe. Streckenbezogene Beträge finden Sie im Detailvergleich.','Darstellungsgrundlage und Hinweise','Airline-Informationen','Monatsverlauf','Zuschläge ab Korea','Ausblick auf den nächsten Monat','Korean Air ↗','Asiana Airlines ↗','Jeju Air ↗','Jin Air ↗','T’way Air ↗']
  };
  Object.keys(copy).forEach(function(lang){
    window.I18N[lang]=window.I18N[lang]||{};
    keys.forEach(function(key,index){window.I18N[lang]['airlines.interface.'+key]=copy[lang][index];});
  });
  var compare={ko:'상세 비교',en:'Compare',ja:'詳細比較',zh:'详细比较',fr:'Comparer',de:'Vergleichen'};
  Object.keys(compare).forEach(function(lang){window.I18N[lang]['airlines.interface.compare']=compare[lang];});
})();
