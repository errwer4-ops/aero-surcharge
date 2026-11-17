/* Independently checked December notices; preserve market timestamps and archived articles. */
(function(){
  'use strict';
  var api=window.AeroDecemberNotices, editedAt='2026-11-17T00:04:09.746Z';
  if(!api)return;
  var legacyCopy={
  "ko": {
    "scope": "한국 출발 · 1인 편도 · KRW",
    "keNews": "대한항공, 12월 국제선 유류할증료 인하 공시",
    "ozNews": "아시아나, 12월 1~16일 국제선 유류할증료 공시",
    "keBody": "한국 출발 편도 9개 거리 구간은 50,800~377,800원입니다. 12월 1~31일 발권분에 적용됩니다.",
    "ozBody": "한국 출발 편도 9개 거리 구간은 57,500~322,400원입니다. 12월 1~16일 발권분에 적용되며, 17일부터 통합 항공사 기준으로 바뀝니다.",
    "basis": "탑승일이 아닌 발권일 기준입니다. 해외 출발 금액은 다를 수 있어 왕복 총액을 단순 확정할 수 없습니다.",
    "later": "아시아나는 12월 17일부터 통합 항공사 기준이 적용됩니다. 이후 금액은 별도 확인이 필요합니다.",
    "title": "12월 공시 확인"
  },
  "en": {
    "scope": "Departing Korea · one person, one way · KRW",
    "keNews": "Korean Air announces lower December international surcharges",
    "ozNews": "Asiana publishes international surcharges for December 1–16",
    "keBody": "Nine Korea-origin one-way distance bands range from KRW 50,800 to 377,800, for tickets issued December 1–31.",
    "ozBody": "Nine Korea-origin one-way distance bands range from KRW 57,500 to 322,400, for tickets issued December 1–16. Integrated-airline rules apply from December 17.",
    "basis": "Ticketing date, not travel date, determines the charge. Overseas-origin charges may differ; a round-trip total cannot simply be assumed.",
    "later": "From December 17, Asiana applies the integrated airline’s surcharge. Check the subsequent amounts separately.",
    "title": "December notices verified"
  },
  "ja": {
    "scope": "韓国発・1人片道・KRW",
    "keNews": "大韓航空、12月国際線燃油サーチャージ引き下げを公示",
    "ozNews": "アシアナ航空、12月1～16日国際線燃油サーチャージを公示",
    "keBody": "韓国発片道9区分は50,800～377,800ウォン。12月1～31日の発券に適用されます。",
    "ozBody": "韓国発片道9区分は57,500～322,400ウォン。12月1～16日の発券に適用され、17日から統合航空会社の基準になります。",
    "basis": "搭乗日ではなく発券日が基準です。海外発の金額は異なる場合があり、往復総額を単純に確定できません。",
    "later": "アシアナ航空は12月17日から統合航空会社の基準を適用します。それ以降の金額は別途確認が必要です。",
    "title": "12月の公示を確認"
  },
  "zh": {
    "scope": "韩国出发·每人单程·韩元 KRW",
    "keNews": "大韩航空公告下调12月国际线燃油附加费",
    "ozNews": "韩亚航空公布12月1日至16日国际线燃油附加费",
    "keBody": "韩国出发单程9个距离区间为50,800至377,800韩元，适用于12月1日至31日出票。",
    "ozBody": "韩国出发单程9个距离区间为57,500至322,400韩元，适用于12月1日至16日出票。17日起适用整合后航司标准。",
    "basis": "以出票日而非乘机日为准。海外出发金额可能不同，不能直接认定往返总额。",
    "later": "韩亚航空自12月17日起适用整合后航空公司的标准。之后的金额须另行确认。",
    "title": "12月公告已核实"
  },
  "fr": {
    "scope": "Départ de Corée · une personne, aller simple · KRW",
    "keNews": "Korean Air annonce une baisse des surcharges internationales de décembre",
    "ozNews": "Asiana publie les surcharges internationales du 1er au 16 décembre",
    "keBody": "Les neuf tranches au départ de Corée vont de 50 800 à 377 800 KRW par aller simple, pour une émission du 1er au 31 décembre.",
    "ozBody": "Les neuf tranches au départ de Corée vont de 57 500 à 322 400 KRW par aller simple, pour une émission du 1er au 16 décembre. Les règles de la compagnie intégrée s’appliquent dès le 17.",
    "basis": "La date d’émission compte, pas celle du vol. Les départs de l’étranger peuvent être tarifés différemment ; le total aller-retour ne peut être présumé.",
    "later": "À partir du 17 décembre, Asiana applique les règles de la compagnie intégrée. Les montants ultérieurs restent à vérifier.",
    "title": "Annonces de décembre vérifiées"
  },
  "de": {
    "scope": "Ab Korea · eine Person, einfacher Flug · KRW",
    "keNews": "Korean Air kündigt niedrigere internationale Dezember-Zuschläge an",
    "ozNews": "Asiana veröffentlicht internationale Zuschläge für den 1. bis 16. Dezember",
    "keBody": "Die neun Entfernungsgruppen ab Korea reichen von 50.800 bis 377.800 KRW pro einfachem Flug, gültig bei Ausstellung vom 1. bis 31. Dezember.",
    "ozBody": "Die neun Entfernungsgruppen ab Korea reichen von 57.500 bis 322.400 KRW pro einfachem Flug, gültig bei Ausstellung vom 1. bis 16. Dezember. Ab dem 17. gelten die Regeln der integrierten Airline.",
    "basis": "Maßgeblich ist das Ausstellungsdatum, nicht der Reisetag. Zuschläge ab dem Ausland können abweichen; Hin- und Rückflug dürfen nicht einfach gleichgesetzt werden.",
    "later": "Ab dem 17. Dezember gelten bei Asiana die Regeln der integrierten Fluggesellschaft. Die späteren Beträge sind gesondert zu prüfen.",
    "title": "Dezember-Mitteilungen geprüft"
  }
};
  var copy={
  "ko": {
    "title": "12월 공시 확인",
    "summary": "대한항공·아시아나·에어부산은 12월 유류할증료 인하를 공시했습니다.",
    "ke": "대한항공: 12월 1~31일 발권",
    "oz": "아시아나: 12월 1~16일 발권",
    "later": "아시아나는 12월 17일부터 통합 항공사 기준이 적용됩니다. 이후 금액은 별도 확인이 필요합니다.",
    "pending": "나머지 6개사(7C·LJ·RS·TW·ZE·YP)의 12월 국제선 여객 금액은 이번 확인에서 검증하지 못했습니다.",
    "scope": "한국 출발 · 1인 편도 · {currency}",
    "basis": "탑승일이 아닌 발권일 기준입니다. 해외 출발 금액은 다를 수 있어 왕복 총액을 단순 확정할 수 없습니다.",
    "checked": "공시 확인",
    "market": "시장 자료 기준",
    "details": "구간별 11월 → 12월 금액",
    "source": "공식 공시 원문",
    "band": "거리·노선 구간",
    "change": "차액",
    "guide": "기다릴 수 있다면 이용 항공사의 적용 발권일과 항공권 총액을 함께 비교하세요.",
    "question": "12월 유류할증료는 확정됐나요?",
    "count": "9개사 중 3개사 공시 확인",
    "sourceNote": "KE·OZ는 11월 16일 저녁, BX는 11월 17일 아침 공시를 확인했습니다. 시장 자료 기준시각과 구분합니다.",
    "officialAverage": "공시 금액은 확인했지만 공식 MOPS 산정평균·기간 평균환율·단계는 이 공시에서 확인하지 못했습니다.",
    "nov": "11월",
    "dec": "12월",
    "keNews": "대한항공, 12월 국제선 유류할증료 인하 공시",
    "ozNews": "아시아나, 12월 1~16일 국제선 유류할증료 공시",
    "keBody": "한국 출발 편도 9개 거리 구간은 50,800~377,800원입니다. 12월 1~31일 발권분에 적용됩니다.",
    "ozBody": "한국 출발 편도 9개 거리 구간은 57,500~322,400원입니다. 12월 1~16일 발권분에 적용되며, 17일부터 통합 항공사 기준으로 바뀝니다.",
    "bx": "에어부산: 12월 1~31일 발권",
    "bxNews": "에어부산, 12월 국제선 유류할증료 인하 공시",
    "bxBody": "한국 출발 편도 4개 노선군은 USD 40·71·84·98입니다. 12월 1~31일 발권분에 적용되며, 나리타·코타키나발루·치앙마이는 출발공항 조건을 확인해야 합니다."
  },
  "en": {
    "title": "December notices verified",
    "summary": "Korean Air, Asiana and Air Busan have announced lower December fuel surcharges.",
    "ke": "Korean Air: tickets issued December 1–31",
    "oz": "Asiana: tickets issued December 1–16",
    "later": "From December 17, Asiana applies the integrated airline’s surcharge. Check the subsequent amounts separately.",
    "pending": "December international passenger amounts for the other six airlines (7C, LJ, RS, TW, ZE, YP) were not verified in this check.",
    "scope": "Departing Korea · one person, one way · {currency}",
    "basis": "Ticketing date, not travel date, determines the charge. Overseas-origin charges may differ; a round-trip total cannot simply be assumed.",
    "checked": "Notices checked",
    "market": "Market information cutoff",
    "details": "Amounts by band: November → December",
    "source": "Official notice",
    "band": "Distance or route group",
    "change": "Difference",
    "guide": "If you can wait, compare your airline’s applicable ticketing dates and total ticket prices together.",
    "question": "Are December surcharges confirmed?",
    "count": "Notices verified for 3 of 9 airlines",
    "sourceNote": "KE/OZ notices were checked on November 16 in the evening; BX on November 17 in the morning. These checks are separate from the market cutoff.",
    "officialAverage": "Published amounts are verified. These notices did not establish the official MOPS calculation average, period-average FX or a surcharge stage.",
    "nov": "November",
    "dec": "December",
    "keNews": "Korean Air announces lower December international surcharges",
    "ozNews": "Asiana publishes international surcharges for December 1–16",
    "keBody": "Nine Korea-origin one-way distance bands range from KRW 50,800 to 377,800, for tickets issued December 1–31.",
    "ozBody": "Nine Korea-origin one-way distance bands range from KRW 57,500 to 322,400, for tickets issued December 1–16. Integrated-airline rules apply from December 17.",
    "bx": "Air Busan: tickets issued December 1–31",
    "bxNews": "Air Busan announces lower December international surcharges",
    "bxBody": "Four Korea-origin one-way route groups are USD 40, 71, 84 and 98 for tickets issued December 1–31. Check origin-airport restrictions for Narita, Kota Kinabalu and Chiang Mai."
  },
  "ja": {
    "title": "12月の公示を確認",
    "summary": "大韓航空・アシアナ航空・エアプサンが12月の燃油サーチャージ引き下げを公示しました。",
    "ke": "大韓航空：12月1～31日の発券",
    "oz": "アシアナ航空：12月1～16日の発券",
    "later": "アシアナ航空は12月17日から統合航空会社の基準を適用します。それ以降の金額は別途確認が必要です。",
    "pending": "他の6社（7C・LJ・RS・TW・ZE・YP）の12月国際線旅客追加料金は、今回の確認では検証できませんでした。",
    "scope": "韓国発・1人片道・{currency}",
    "basis": "搭乗日ではなく発券日が基準です。海外発の金額は異なる場合があり、往復総額を単純に確定できません。",
    "checked": "公示確認",
    "market": "市場資料の基準時刻",
    "details": "距離区分別の11月 → 12月金額",
    "source": "公式公示",
    "band": "距離・路線区分",
    "change": "差額",
    "guide": "購入を待てる場合は、利用する航空会社の適用発券日と航空券総額を合わせて比較しましょう。",
    "question": "12月の燃油サーチャージは確定しましたか？",
    "count": "9社中3社の公示を確認",
    "sourceNote": "KE・OZは11月16日夜、BXは11月17日朝に公示を確認。市場資料の基準時刻とは区別しています。",
    "officialAverage": "公示金額は確認済みですが、公式MOPS算定平均・期間平均為替・段階はこの公示から確認できませんでした。",
    "nov": "11月",
    "dec": "12月",
    "keNews": "大韓航空、12月国際線燃油サーチャージ引き下げを公示",
    "ozNews": "アシアナ航空、12月1～16日国際線燃油サーチャージを公示",
    "keBody": "韓国発片道9区分は50,800～377,800ウォン。12月1～31日の発券に適用されます。",
    "ozBody": "韓国発片道9区分は57,500～322,400ウォン。12月1～16日の発券に適用され、17日から統合航空会社の基準になります。",
    "bx": "エアプサン：12月1～31日の発券",
    "bxNews": "エアプサン、12月国際線燃油サーチャージ引き下げを公示",
    "bxBody": "韓国発片道4路線区分はUSD 40・71・84・98。12月1～31日の発券に適用されます。成田・コタキナバル・チェンマイは出発空港の条件をご確認ください。"
  },
  "zh": {
    "title": "12月公告已核实",
    "summary": "大韩航空、韩亚航空和釜山航空已公告下调12月燃油附加费。",
    "ke": "大韩航空：12月1日至31日出票",
    "oz": "韩亚航空：12月1日至16日出票",
    "later": "韩亚航空自12月17日起适用整合后航空公司的标准。之后的金额须另行确认。",
    "pending": "其余6家航司（7C、LJ、RS、TW、ZE、YP）的12月国际客运金额，本次未能核实。",
    "scope": "韩国出发·每人单程·{currency}",
    "basis": "以出票日而非乘机日为准。海外出发金额可能不同，不能直接认定往返总额。",
    "checked": "公告核实",
    "market": "市场资料截至",
    "details": "各距离区间11月 → 12月金额",
    "source": "官方公告",
    "band": "距离或航线区间",
    "change": "差额",
    "guide": "如果可以等待，请结合所选航司的适用出票日期与机票总价进行比较。",
    "question": "12月燃油附加费确定了吗？",
    "count": "已核实9家中的3家公告",
    "sourceNote": "KE、OZ于11月16日晚核实，BX于11月17日早间核实，与市场资料截至时间分开记录。",
    "officialAverage": "公告金额已核实，但这些公告未确认官方MOPS计算均价、期间平均汇率或档位。",
    "nov": "11月",
    "dec": "12月",
    "keNews": "大韩航空公告下调12月国际线燃油附加费",
    "ozNews": "韩亚航空公布12月1日至16日国际线燃油附加费",
    "keBody": "韩国出发单程9个距离区间为50,800至377,800韩元，适用于12月1日至31日出票。",
    "ozBody": "韩国出发单程9个距离区间为57,500至322,400韩元，适用于12月1日至16日出票。17日起适用整合后航司标准。",
    "bx": "釜山航空：12月1日至31日出票",
    "bxNews": "釜山航空公告下调12月国际线燃油附加费",
    "bxBody": "韩国出发单程4组航线为USD 40、71、84、98，适用于12月1日至31日出票。成田、亚庇和清迈须核对出发机场条件。"
  },
  "fr": {
    "title": "Annonces de décembre vérifiées",
    "summary": "Korean Air, Asiana et Air Busan ont annoncé une baisse des surcharges de décembre.",
    "ke": "Korean Air : billets émis du 1er au 31 décembre",
    "oz": "Asiana : billets émis du 1er au 16 décembre",
    "later": "À partir du 17 décembre, Asiana applique les règles de la compagnie intégrée. Les montants ultérieurs restent à vérifier.",
    "pending": "Les montants internationaux passagers de décembre des six autres compagnies (7C, LJ, RS, TW, ZE, YP) n’ont pas été vérifiés lors de ce contrôle.",
    "scope": "Départ de Corée · une personne, aller simple · {currency}",
    "basis": "La date d’émission compte, pas celle du vol. Les départs de l’étranger peuvent être tarifés différemment ; le total aller-retour ne peut être présumé.",
    "checked": "Annonces vérifiées",
    "market": "Données de marché arrêtées au",
    "details": "Montants par tranche : novembre → décembre",
    "source": "Annonce officielle",
    "band": "Tranche de distance ou de ligne",
    "change": "Écart",
    "guide": "Si vous pouvez attendre, comparez les dates d’émission applicables et les prix totaux des billets.",
    "question": "Les surcharges de décembre sont-elles confirmées ?",
    "count": "Annonces vérifiées pour 3 compagnies sur 9",
    "sourceNote": "KE/OZ ont été vérifiées le 16 novembre au soir ; BX le 17 novembre au matin. Ces contrôles sont distincts de la date limite des données de marché.",
    "officialAverage": "Les montants publiés sont vérifiés. Ces annonces ne confirment ni la moyenne officielle MOPS, ni le change moyen de la période, ni un palier.",
    "nov": "Novembre",
    "dec": "Décembre",
    "keNews": "Korean Air annonce une baisse des surcharges internationales de décembre",
    "ozNews": "Asiana publie les surcharges internationales du 1er au 16 décembre",
    "keBody": "Les neuf tranches au départ de Corée vont de 50 800 à 377 800 KRW par aller simple, pour une émission du 1er au 31 décembre.",
    "ozBody": "Les neuf tranches au départ de Corée vont de 57 500 à 322 400 KRW par aller simple, pour une émission du 1er au 16 décembre. Les règles de la compagnie intégrée s’appliquent dès le 17.",
    "bx": "Air Busan : billets émis du 1er au 31 décembre",
    "bxNews": "Air Busan annonce une baisse des surcharges internationales de décembre",
    "bxBody": "Quatre groupes de lignes au départ de Corée sont à 40, 71, 84 et 98 USD par aller simple, pour une émission du 1er au 31 décembre. Vérifier l’aéroport de départ pour Narita, Kota Kinabalu et Chiang Mai."
  },
  "de": {
    "title": "Dezember-Mitteilungen geprüft",
    "summary": "Korean Air, Asiana und Air Busan haben niedrigere Kerosinzuschläge für Dezember angekündigt.",
    "ke": "Korean Air: Ticketausstellung vom 1. bis 31. Dezember",
    "oz": "Asiana: Ticketausstellung vom 1. bis 16. Dezember",
    "later": "Ab dem 17. Dezember gelten bei Asiana die Regeln der integrierten Fluggesellschaft. Die späteren Beträge sind gesondert zu prüfen.",
    "pending": "Die internationalen Passagierzuschläge für Dezember der anderen sechs Airlines (7C, LJ, RS, TW, ZE, YP) konnten bei dieser Prüfung nicht bestätigt werden.",
    "scope": "Ab Korea · eine Person, einfacher Flug · {currency}",
    "basis": "Maßgeblich ist das Ausstellungsdatum, nicht der Reisetag. Zuschläge ab dem Ausland können abweichen; Hin- und Rückflug dürfen nicht einfach gleichgesetzt werden.",
    "checked": "Mitteilungen geprüft",
    "market": "Stichtag der Marktdaten",
    "details": "Beträge je Entfernung: November → Dezember",
    "source": "Offizielle Mitteilung",
    "band": "Entfernungs- oder Streckengruppe",
    "change": "Differenz",
    "guide": "Wenn Sie warten können, vergleichen Sie die geltenden Ausstellungsdaten und die Gesamtpreise der Tickets.",
    "question": "Sind die Dezember-Zuschläge bestätigt?",
    "count": "Mitteilungen von 3 der 9 Airlines geprüft",
    "sourceNote": "KE/OZ wurden am Abend des 16. November geprüft, BX am Morgen des 17. November. Diese Prüfungen sind vom Marktstichtag getrennt.",
    "officialAverage": "Die veröffentlichten Beträge sind geprüft. Diese Mitteilungen belegen weder den offiziellen MOPS-Mittelwert noch den mittleren Wechselkurs des Zeitraums oder eine Stufe.",
    "nov": "November",
    "dec": "Dezember",
    "keNews": "Korean Air kündigt niedrigere internationale Dezember-Zuschläge an",
    "ozNews": "Asiana veröffentlicht internationale Zuschläge für den 1. bis 16. Dezember",
    "keBody": "Die neun Entfernungsgruppen ab Korea reichen von 50.800 bis 377.800 KRW pro einfachem Flug, gültig bei Ausstellung vom 1. bis 31. Dezember.",
    "ozBody": "Die neun Entfernungsgruppen ab Korea reichen von 57.500 bis 322.400 KRW pro einfachem Flug, gültig bei Ausstellung vom 1. bis 16. Dezember. Ab dem 17. gelten die Regeln der integrierten Airline.",
    "bx": "Air Busan: Ticketausstellung vom 1. bis 31. Dezember",
    "bxNews": "Air Busan kündigt niedrigere internationale Dezember-Zuschläge an",
    "bxBody": "Vier Streckengruppen ab Korea kosten je einfachem Flug 40, 71, 84 und 98 USD, gültig bei Ausstellung vom 1.–31. Dezember. Für Narita, Kota Kinabalu und Chiang Mai gelten Bedingungen zum Abflughafen."
  }
};
  function language(){var l=window.getCurrentLang?window.getCurrentLang():localStorage.getItem('aero_lang')||'ko';return copy[l]?l:'en';}
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function verified(n){return window.AeroSourceTrust&&window.AeroSourceTrust.summarize([n],api.month).verifiedCount===1;}
  function numbers(value){return Number(value).toLocaleString('en-US');}
  function stamp(value){return new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(new Date(value||api.checkedAt))+' KST';}
  function scope(c,n){return c.scope.replace('{currency}',n.currency);}
  function title(c,n){return c[n.code.toLowerCase()];}
  function panel(){
    var box=document.getElementById('decemberNoticePanel');if(!box)return;
    var c=copy[language()],only=box.getAttribute('data-airline');
    var html='<h2>'+esc(c.title)+'</h2>'+(!document.getElementById('forecastDecisionTitle')?'<p>'+esc(c.summary)+'</p>':'')+'<div class="december-notice-cards">'+api.notices.filter(function(n){return verified(n)&&(!only||n.code===only);}).map(function(n){
      return '<article data-airline="'+esc(n.code)+'"><h3>'+esc(title(c,n))+'</h3><p class="december-notice-range">'+esc(n.currency)+' '+numbers(Math.min.apply(null,n.amounts))+'–'+numbers(Math.max.apply(null,n.amounts))+'</p><p>'+esc(scope(c,n))+'</p>'+(n.code==='OZ'?'<p>'+esc(c.later)+'</p>':'')+'<a href="'+esc(n.url)+'" target="_blank" rel="noopener noreferrer">'+esc(c.source)+' ↗</a><details><summary>'+esc(c.details)+'</summary><div class="december-notice-table"><table><thead><tr><th>'+esc(c.band)+'</th><th>'+esc(c.nov)+'</th><th>'+esc(c.dec)+'</th><th>'+esc(c.change)+'</th></tr></thead><tbody>'+n.bands.map(function(b,i){return '<tr><th scope="row">'+esc(b)+'</th><td>'+numbers(n.november[i])+'</td><td>'+numbers(n.amounts[i])+'</td><td>−'+numbers(n.november[i]-n.amounts[i])+'</td></tr>';}).join('')+'</tbody></table></div></details><small>'+esc(c.checked)+': '+stamp(n.verifiedAt)+'</small></article>';
    }).join('')+'</div><p>'+esc(c.basis)+'</p>'+(!only?'<p>'+esc(c.pending)+'</p>':'')+'<small>'+esc(c.checked)+': '+stamp()+' · '+esc(c.sourceNote)+'</small>';
    if(box.hasAttribute('data-compact'))html='<details class="december-notice-fold"><summary>'+esc(c.summary)+' · '+esc(c.title)+'</summary>'+html+'</details>';
    if(box.innerHTML!==html){var open=Array.from(box.querySelectorAll('details')).map(function(d){return d.open;});box.innerHTML=html;box.querySelectorAll('details').forEach(function(d,i){d.open=!!open[i];});}
  }
  function routeSummary(code,index,origin,destination){
    var n=api.getNotice(code),c=copy[language()];if(!n||!verified(n)||!n.bands[index])return '';
    var record=api.record(code,index,origin,destination);if(!record||record.status!=='confirmed')return '';
    return '<section class="december-route-summary"><strong>'+esc(title(c,n))+'</strong><p>'+esc(origin+' → '+destination)+' · '+esc(n.bands[index])+' · '+esc(scope(c,n))+'</p><p>'+esc(c.nov)+' '+esc(n.currency)+' '+numbers(n.november[index])+' → '+esc(c.dec)+' <strong>'+esc(n.currency)+' '+numbers(n.amounts[index])+'</strong> (−'+numbers(n.november[index]-n.amounts[index])+')</p>'+(code==='OZ'?'<p>'+esc(c.later)+'</p>':'')+'<a href="'+esc(n.url)+'" target="_blank" rel="noopener noreferrer">'+esc(c.source)+' ↗</a></section>';
  }
  window.AeroDecemberView={isVerified:function(){return api.notices.length===3&&api.notices.every(verified);},copy:copy,render:panel,routeSummary:routeSummary,stamp:stamp};
  var r=window.AERO_MARKET_RELEASE;
  if(r&&api.notices.every(verified)){
    r.noticeCheckedAt=api.checkedAt;r.modified=Date.parse(r.modified)>Date.parse(editedAt)?r.modified:editedAt;
    Object.keys(copy).forEach(function(l){
      var p=r.packs[l],c=copy[l];if(!p)return;
      p.ui[2]=({ko:'발권월별 공식 공시 금액 비교',en:'Compare notice amounts by ticketing month',ja:'発券月別の公示金額を比較',zh:'按出票月份比较公告金额',fr:'Comparer les montants par mois d’émission',de:'Veröffentlichte Beträge je Ausstellungsmonat vergleichen'})[l];
      var answer=c.summary+' '+c.ke+'. '+c.oz+'. '+c.bx+'. '+c.later+' '+c.pending;
      var sub=c.checked+': '+stamp()+' · '+c.market+': '+r.numbers.asOf;
      p.desc=c.summary+' '+c.ke+'. '+c.oz+'. '+c.bx+'. '+c.later;p.sub=sub;p.newsSub=sub;p.updated=sub;
      p.intro=c.summary;p.note=answer;p.verdict1=c.summary;p.verdictLong=c.later;p.summary[1]=answer;
      p.rows[0]=[c.title,c.summary,c.ke+'. '+c.oz+'. '+c.bx+'. '+c.later];r.rows[l]=p.rows;
      p.faq[1]={q:c.question,a:answer+' '+c.officialAverage};
      p.forecastOverview=Object.assign({},p.forecastOverview,{modifiedAt:r.modified,noticeCheckedAt:api.checkedAt,expectation:c.summary,confidence:c.count,basis:c.ke+'. '+c.oz+'. '+c.bx,risk:c.later,note:c.officialAverage,question:c.question});
      p.forecastOverview.rows[0]=[c.title,c.summary,c.ke+'. '+c.oz+'. '+c.bx+'. '+c.later];
      p.forecastOverview.rowTones[0]='down';
      p.surface=Object.assign({},p.surface,{'fore.pageSub':sub,'fore.summary.updated':sub,'fore.intro':c.summary,'fore.aiNotice':answer,'news.pageSub':sub,'news.note':answer,'news.surchargeNote':answer,'news.dataRef':sub,'news.decisionShort':c.summary,'news.decisionLine1':c.summary,'news.forecastCta.desc':c.guide,'news.summary.updated':sub});
    });
    var cards=api.notices.map(function(n){
      var fresh=n.code==='BX',id='notice-202612-'+n.code.toLowerCase()+'-'+(fresh?'20261117':'20261116');
      var existing=r.newsCards.find(function(card){return card.id===id;});if(existing)return existing;
      var date=fresh?'2026-11-17':'2026-11-16',edit=fresh?editedAt:'2026-11-16T22:10:24+09:00',checked=fresh?n.verifiedAt:'2026-11-16T13:02:58.634Z';
      var card={id:id,category:'airline',priority:1,date:date,dateKind:'site_update',publishedAt:edit,updatedAt:edit,informationCutoff:fresh?'2026-11-17T09:00:00+09:00':checked,reportedDate:n.noticeDate,sourcePublishedAt:n.noticePublishedAt,sourcePublicationPrecision:n.publicationTimePrecision,sourceUpdatedAt:null,eventDate:n.ticketingStart,sourceVerifiedAt:checked,sourceUrl:n.url,citationUrls:[n.url],sourceVerificationStatus:'official_notice_table_and_conditions_verified',badge:'NEW',aiSummary:true,relevanceScore:1,i18n:{}};
      Object.keys(copy).forEach(function(l){var c=fresh?copy[l]:legacyCopy[l],key=n.code.toLowerCase();card.i18n[l]={title:c[key+'News'],summary:c[key+'Body'],aiBrief:fresh?scope(c,n):c.scope,impact:n.code==='OZ'?c.later:c.basis,sourceName:({KE:'Korean Air',OZ:'Asiana Airlines',BX:'Air Busan'})[n.code],tag:c.title};});return card;});
    var cardIds=cards.map(function(card){return card.id;});r.newsCards=cards.concat(r.newsCards.filter(function(card){return cardIds.indexOf(card.id)<0;}));
    r.sources.push(['Korean Air · December1–31 ticketing',api.getNotice('KE').url],['Asiana · December1–16 ticketing only',api.getNotice('OZ').url],['Air Busan · December1–31 ticketing · USD',api.getNotice('BX').url]);
  }
  var prior=window.applyLanguage;
  if(typeof prior==='function')window.applyLanguage=function(){var result=prior.apply(this,arguments);panel();return result;};
  document.addEventListener('change',function(e){if(e.target&&e.target.tagName==='SELECT')setTimeout(panel,0);});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',panel,{once:true});else panel();
})();
