/* These legacy detail URLs keep their original data, with explicit coverage. */
(function () {
  'use strict';
  var prefix = {
    'fuel-surcharge-korean-air':'ke', 'fuel-surcharge-asiana':'oz',
    'fuel-surcharge-jejuair':'jj', 'fuel-surcharge-jinair':'lj', 'fuel-surcharge-tway':'tw'
  }[location.pathname.split('/').pop().replace(/\.html$/, '')];
  if (!prefix || !window.I18N) return;
  var labels = {
    ko:['이 표는 2026년 8월·9월의 과거 공식 공시 비교입니다. 편도·발권일 기준이며, 현재 발권월 금액은 계산기와 항공사 원문에서 확인하세요. 표시 통화 환산값은 참고용입니다.','과거 공시 비교 · 2026년 8월·9월','최신 공시·발권월 비교','전망과 공식 공시 확인'],
    en:['Historical official notices for August and September 2026. One-way, by ticketing date. Check the calculator and airline notice for current ticketing months. Currency conversions are indicative.','Historical comparison · August–September 2026','Latest notices and ticketing-month comparison','Outlook and official notices'],
    ja:['2026年8月・9月の過去の公式公示比較です。片道・発券日基準。現在の発券月は計算機と航空会社の原文で確認してください。換算額は参考値です。','過去の比較 · 2026年8月・9月','最新公示と発券月の比較','見通しと公式公示'],
    zh:['本表为2026年8月、9月历史官方公告比较，按单程及出票日期计算。当前出票月份请查看计算器与航司原文，换算金额仅供参考。','历史比较 · 2026年8月、9月','最新公告与出票月比较','展望与官方公告'],
    fr:['Comparaison historique des avis officiels août–septembre 2026, aller simple et date d’émission. Consultez le calculateur et les avis des compagnies pour les mois actuels. Conversions indicatives.','Comparaison historique · août–septembre 2026','Avis récents et comparaison par mois','Perspectives et avis officiels'],
    de:['Historische offizielle Hinweise August–September 2026, einfacher Flug und Ausstellungsdatum. Aktuelle Monate im Rechner und beim Anbieter prüfen. Umrechnungen sind Richtwerte.','Historischer Vergleich · August–September 2026','Aktuelle Hinweise und Monatsvergleich','Ausblick und offizielle Hinweise']
  };
  Object.keys(labels).forEach(function (lang) {
    var copy=labels[lang], dictionary=window.I18N[lang] || (window.I18N[lang]={});
    dictionary[prefix+'.footnote']=copy[0];
    dictionary[prefix+'.metaDesc']=copy[0];
    dictionary[prefix+'.sectionTitle']=copy[1];
    dictionary[prefix+'.pageSub']=copy[1];
    dictionary[prefix+'.rel.may']=copy[2];
    dictionary[prefix+'.rel.jun']=copy[3];
    dictionary[prefix+'.rel.notice']=copy[2];
    dictionary[prefix+'.rel.forecast']=copy[3];
  });
  if (prefix==='ke') {
    window.I18N.ko['ke.card2.body']='적용 월과 발권 기간을 항공사 공식 공지에서 확인합니다.';
  }
  document.querySelectorAll('[data-i18n="'+prefix+'.rel.may"], [data-i18n="'+prefix+'.rel.notice"]').forEach(function(a){a.href='fuel-surcharge-calculator.html';});
  if (typeof window.renderAirlinePage==='function') window.renderAirlinePage();
  else if(typeof window.applyLanguage==='function') window.applyLanguage();
})();
