(function () {
  'use strict';
  // Separate keys keep the total-airfare CTA independent of monthly notice copy.
  var keys=['fareCompare.title','fareCompare.description','fareCompare.button'];
  var copy={
    ko:['다음은 실제 항공권 총액 비교','유류할증료에 기본 운임·세금·선택한 부가서비스를 더한 최종 결제 총액과 조건을 발권처에서 확인하세요.','유류할증료 포함 실제 항공권 총액 비교하기'],
    en:['Compare the actual total airfare next','Check the final payment total and conditions with the ticket seller, including the fuel surcharge, base fare, taxes and any optional services.','Compare actual total airfare including fuel surcharge'],
    ja:['次は実際の航空券総額を比較','燃油サーチャージ、基本運賃、税金、選択した追加サービスを含む最終支払総額と条件を購入先でご確認ください。','燃油サーチャージを含む実際の航空券総額を比較'],
    zh:['接下来比较实际机票总价','请向出票方确认包含燃油附加费、基础票价、税费及所选附加服务的最终支付总额和条件。','比较包含燃油附加费的实际机票总价'],
    fr:['Comparez ensuite le prix total réel du billet','Vérifiez auprès du vendeur le montant final et les conditions, en incluant la surcharge carburant, le tarif de base, les taxes et les services optionnels choisis.','Comparer le prix total réel du billet, surcharge carburant incluse'],
    de:['Vergleichen Sie jetzt den tatsächlichen Gesamtflugpreis','Prüfen Sie beim Ticketanbieter den Endbetrag und die Bedingungen einschließlich Kerosinzuschlag, Grundtarif, Steuern und gewählter Zusatzleistungen.','Tatsächlichen Gesamtflugpreis inklusive Kerosinzuschlag vergleichen']
  };
  Object.keys(copy).forEach(function(lang){
    var dict=window.I18N[lang]||(window.I18N[lang]={});
    keys.forEach(function(key,index){dict[key]=copy[lang][index];});
  });
})();
