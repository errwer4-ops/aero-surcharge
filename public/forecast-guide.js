(function () {
  'use strict';
  // Presentation only: the release remains the owner of market facts and dates.
  var copy = {
    ko: {
      eyebrow:'발권 전 확인', title:'{month} 유류할증료, 지금 발권할까요?',
      lead:'일정이 정해졌다면 총액 비교부터, 여유가 있다면 공시 확인부터.',
      reason:'유류할증료가 내려도 항공권 총액은 달라질 수 있습니다. 같은 일정과 조건으로 비교하세요.',
      fixedTitle:'일정이 정해졌다면', fixedBody:'원하는 항공편의 총액과 수하물·변경·환불 조건을 먼저 비교하세요.',
      flexibleTitle:'기다릴 여유가 있다면', flexibleBody:'이용할 항공사의 {month} 공시와 적용 발권일을 확인한 뒤 총액을 다시 비교하세요.',
      compare:'현재 항공권 총액 비교', notices:'항공사별 공시 확인',
      affiliate:'제휴 링크 · 예약 시 수수료를 받을 수 있습니다.',
      evidence:'전망 근거와 시장·해상안전 지표', evidenceSub:'항공유·환율·유가·통항 자료와 해석 한계',
      sources:'출처·산정 기준 FAQ', sourcesSub:'공식 평균과 참고가격의 차이, 자료별 기준일',
      cutoff:'자료 기준', pending:'{month} 인하 여부는 아직 판단하기 어렵습니다.',
      fallback:'확인된 항공사 공시와 아래 근거를 함께 살펴보세요.',
      meta:'{month} 유류할증료 전망 | 발권 판단 가이드'
    },
    en: {
      eyebrow:'Before you book', title:'{month} fuel surcharges: book now or wait?',
      lead:'Dates fixed? Compare total fares. Time to wait? Check airline notices first.',
      reason:'A lower fuel surcharge does not guarantee a lower total fare. Compare the same itinerary and conditions.',
      fixedTitle:'Your dates are fixed', fixedBody:'Compare total fares for your flight, including baggage, change and refund conditions.',
      flexibleTitle:'You have time to wait', flexibleBody:'Check your airline’s {month} notice and applicable ticketing dates, then compare total fares again.',
      compare:'Compare current total fares', notices:'Check airline notices',
      affiliate:'Affiliate link · We may earn a commission if you book.',
      evidence:'Outlook evidence and market / maritime indicators', evidenceSub:'Jet fuel, exchange rates, oil and vessel traffic, with limitations',
      sources:'Sources and calculation FAQ', sourcesSub:'Official averages, reference prices and observation dates',
      cutoff:'Information cutoff', pending:'It is still unclear whether {month} surcharges will fall.',
      fallback:'Review verified airline notices alongside the evidence below.',
      meta:'{month} fuel surcharge outlook | Booking guide'
    },
    ja: {
      eyebrow:'航空券の購入前に', title:'{month}の燃油サーチャージ、今買う？ 待つ？',
      lead:'日程が決まっていれば総額を比較。待つ余裕があれば航空会社の告知を確認。',
      reason:'燃油サーチャージが下がっても航空券の総額が安くなるとは限りません。同じ日程・条件で比較しましょう。',
      fixedTitle:'日程が決まっている方', fixedBody:'希望する便の総額と、手荷物・変更・払い戻しの条件を先に比較しましょう。',
      flexibleTitle:'購入を待つ余裕がある方', flexibleBody:'利用する航空会社の{month}の告知と適用される発券日を確認してから、総額を再比較しましょう。',
      compare:'現在の航空券総額を比較', notices:'航空会社別の告知を確認',
      affiliate:'アフィリエイトリンク · 予約により手数料を受け取る場合があります。',
      evidence:'見通しの根拠と市場・海上安全の指標', evidenceSub:'航空燃料・為替・原油・通航データと解釈上の制約',
      sources:'出典・算定基準のFAQ', sourcesSub:'公式平均と参考価格の違い、各資料の基準日',
      cutoff:'情報の基準時刻', pending:'{month}の燃油サーチャージが下がるかは、まだ判断できません。',
      fallback:'確認済みの航空会社の告知と、以下の根拠をご確認ください。',
      meta:'{month}の燃油サーチャージ見通し | 購入判断ガイド'
    },
    zh: {
      eyebrow:'出票前先看', title:'{month}燃油附加费：现在买，还是等？',
      lead:'行程已定，先比总价；有时间等，先看航空公司公告。',
      reason:'燃油附加费降低，不代表机票总价一定更低。请按相同行程和条件比较。',
      fixedTitle:'行程已经确定', fixedBody:'先比较所选航班的总价，以及行李、改签和退票条件。',
      flexibleTitle:'可以等待出票', flexibleBody:'查看所选航空公司的{month}公告和适用出票日期后，再比较机票总价。',
      compare:'比较当前机票总价', notices:'查看各航空公司公告',
      affiliate:'推广链接 · 如完成预订，我们可能获得佣金。',
      evidence:'预测依据及市场、海上安全指标', evidenceSub:'航油、汇率、原油和船舶通行数据及解读限制',
      sources:'来源与计算标准常见问题', sourcesSub:'官方均价与参考价格的区别，以及各项数据日期',
      cutoff:'资料截止时间', pending:'目前还难以判断{month}燃油附加费是否会下调。',
      fallback:'请结合已核实的航空公司公告和以下依据进行判断。',
      meta:'{month}燃油附加费展望 | 出票参考'
    },
    fr: {
      eyebrow:'Avant de réserver', title:'Surcharge de {month} : réserver ou attendre ?',
      lead:'Dates fixées : comparez le prix total. Du temps devant vous : consultez les annonces.',
      reason:'Une baisse de la surcharge ne garantit pas un billet moins cher. Comparez le même trajet et les mêmes conditions.',
      fixedTitle:'Vos dates sont fixées', fixedBody:'Comparez le prix total du vol, les bagages et les conditions de modification et de remboursement.',
      flexibleTitle:'Vous pouvez attendre', flexibleBody:'Consultez l’annonce de votre compagnie pour {month} et les dates d’émission applicables, puis comparez à nouveau les prix totaux.',
      compare:'Comparer les prix totaux actuels', notices:'Consulter les annonces des compagnies',
      affiliate:'Lien affilié · Une réservation peut nous rapporter une commission.',
      evidence:'Fondements des prévisions et indicateurs de marché et de sécurité maritime', evidenceSub:'Carburant, change, pétrole, trafic maritime et limites des données',
      sources:'Sources et FAQ sur le calcul', sourcesSub:'Moyennes officielles, prix de référence et dates d’observation',
      cutoff:'Données arrêtées au', pending:'Une baisse de la surcharge en {month} reste incertaine.',
      fallback:'Consultez les annonces vérifiées des compagnies et les données ci-dessous.',
      meta:'Surcharge carburant de {month} | Guide de réservation'
    },
    de: {
      eyebrow:'Vor der Flugbuchung', title:'Kerosinzuschlag im {month}: jetzt buchen oder warten?',
      lead:'Reisedaten stehen fest? Gesamtpreise vergleichen. Noch Zeit? Erst Mitteilungen prüfen.',
      reason:'Ein niedrigerer Zuschlag garantiert keinen günstigeren Gesamtpreis. Vergleichen Sie dieselbe Reise und dieselben Bedingungen.',
      fixedTitle:'Ihre Reisedaten stehen fest', fixedBody:'Vergleichen Sie den Gesamtpreis Ihres Fluges sowie Gepäck-, Umbuchungs- und Erstattungsbedingungen.',
      flexibleTitle:'Sie können noch warten', flexibleBody:'Prüfen Sie die Mitteilung Ihrer Airline für {month} und die gültigen Ausstellungsdaten. Vergleichen Sie danach die Gesamtpreise erneut.',
      compare:'Aktuelle Gesamtflugpreise vergleichen', notices:'Mitteilungen der Airlines prüfen',
      affiliate:'Affiliate-Link · Bei einer Buchung erhalten wir möglicherweise eine Provision.',
      evidence:'Grundlagen des Ausblicks sowie Markt- und Schiffssicherheitsdaten', evidenceSub:'Kerosin, Wechselkurse, Rohöl, Schiffsverkehr und Datengrenzen',
      sources:'Quellen und Fragen zur Berechnung', sourcesSub:'Offizielle Mittelwerte, Referenzpreise und Beobachtungsdaten',
      cutoff:'Datenstand', pending:'Ob die Zuschläge im {month} sinken, ist noch unklar.',
      fallback:'Prüfen Sie bestätigte Airline-Mitteilungen und die folgenden Grundlagen.',
      meta:'Kerosinzuschlag im {month} | Buchungsratgeber'
    }
  };
  function language() {
    var l = (localStorage.getItem('aero_lang') || document.documentElement.lang || 'ko').toLowerCase();
    return copy[l] ? l : 'en';
  }
  function text(n) {
    var l=language(), result={}, target=/^(\d{4})-(\d{2})$/.exec(n.forecastTargetMonth || '');
    var month=target ? new Intl.DateTimeFormat(l,{month:'long',timeZone:'UTC'}).format(new Date(Date.UTC(+target[1],+target[2]-1,1))) : '';
    Object.keys(copy[l]).forEach(function(k){result[k]=copy[l][k].replace(/\{month\}/g,month);});
    if(target){
      var datedMonth=new Intl.DateTimeFormat(l,{year:'numeric',month:'long',timeZone:'UTC'}).format(new Date(Date.UTC(+target[1],+target[2]-1,1)));
      result.meta=copy[l].meta.replace(/\{month\}/g,datedMonth);
    }
    var update=window.AeroDecemberView, notices=window.AeroDecemberNotices;
    if(update&&notices&&update.isVerified()&&n.forecastTargetMonth===notices.month){var released=update.copy[l];result.lead=released.summary;result.noticeStatus=notices.notices.map(function(notice){return released[notice.code.toLowerCase()];}).join(" · ");result.flexibleBody=released.guide;result.noticeSub=released.checked+": "+update.stamp()+" · "+released.market+": "+n.asOf;}
    return result;
  }
  function currentBrief(p,n,c) {
    if(window.AeroDecemberNotices&&n.forecastTargetMonth===window.AeroDecemberNotices.month&&p.forecastOverview&&p.forecastOverview.noticeCheckedAt)return c.noticeStatus||p.forecastOverview.expectation;
    // This concise assessment belongs only to the reviewed November 16 snapshot.
    // Future releases fall back to their own outlook instead of inheriting it.
    if(n.informationCutoff==='2026-11-16T09:00:00+09:00' && n.forecastTargetMonth==='2026-12' &&
       n.decemberCalculationStatus==='period_ended_official_average_and_notices_unconfirmed') return c.pending;
    return p.forecastOverview && p.forecastOverview.informationCutoff===n.informationCutoff ? p.forecastOverview.expectation : c.fallback;
  }
  window.AERO_FORECAST_GUIDE = {
    view:function(p,n) {
      var c=text(n), sub=c.noticeSub||c.cutoff+': '+n.asOf;
      return Object.assign({},p,{title:c.title,meta:c.meta,desc:c.lead+' '+c.reason,sub:sub,
        surface:Object.assign({},p.surface,{'fore.h1':c.title,'fore.pageTitle':c.title,'fore.pageSub':sub})});
    },
    render:function(p,n) {
      var c=text(n); c.status=currentBrief(p,n,c);
      document.querySelectorAll('[data-forecast-copy]').forEach(function(el){
        var value=c[el.getAttribute('data-forecast-copy')];
        if(value!==undefined && el.textContent!==value) el.textContent=value;
      });
    }
  };
})();
