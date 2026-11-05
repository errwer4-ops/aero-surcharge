/* Use the same independently reconciled notices as the calculator. */
(function(){
'use strict';
var notices=window.NOVEMBER_2026_OFFICIAL_NOTICES||[],trust=window.AeroSourceTrust;
if(!trust)return;
var review=trust.summarize(notices,'2026.11'),stamp='2026-11-05T10:33:46+09:00';
var verified=notices.filter(function(n){return review.verified.indexOf(n.code)>=0;});
var labels={
ko:['항공사별 2026년 11월 유류할증료','11월 27단계 · 현재 발권 적용 · 2026-11-01~11-30','한국 출발 국제선 편도·발권일 기준입니다. 10월은 과거 비교이며 12월은 산정 중입니다. 공시 통화를 유지하며 표시 환산액은 실제 결제액이 아닙니다.','10월 과거 공시','11월 현재 공시','공식 공시 확인','확인 필요','10월 → 11월 비교','공식 노선표 확인','공시 원문','구간','노선·조건','변동','공시 금액 없음','확인된 항공사','12월 전망'],
en:['November 2026 fuel surcharges by airline','November Level 27 · current ticketing · 2026-11-01~11-30','Korea-departure international, one-way, by ticketing date. October is historical; December is being calculated. Original notice currencies apply; display conversions are not payment amounts.','October historical notice','November current notice','Official notice verified','Verification pending','October → November comparison','Check official route table','Official source','Band','Route / conditions','Change','No published amount','Verified airlines','December outlook'],
ja:['航空会社別2026年11月燃油サーチャージ','11月27段階・現在発券適用・2026-11-01~11-30','韓国発国際線・片道・発券日基準。10月は過去比較、12月は算定中。公示通貨を保持し、表示換算額は決済額ではありません。','10月過去公示','11月現在公示','公式公示確認','確認待ち','10月→11月比較','公式路線表確認','公式原文','区分','路線・条件','変動','公示金額なし','確認済み航空会社','12月見通し'],
zh:['各航司2026年11月燃油附加费','11月27档·当前出票适用·2026-11-01~11-30','韩国出发国际线、单程、按出票日。10月为历史比较，12月计算中。保留公告币种，显示换算并非实际付款金额。','10月历史公告','11月当前公告','官方公告已核实','待核实','10月→11月比较','查看官方航线表','官方原文','区间','航线及条件','变化','无公告金额','已核实航司','12月展望'],
fr:['Surtaxes par compagnie · novembre 2026','Novembre niveau 27 · émissions actuelles · 2026-11-01~11-30','International au départ de Corée, aller simple, date d’émission. Octobre est historique ; décembre en calcul. Devises publiées conservées, conversions indicatives et non montants à payer.','Avis historique octobre','Avis actuel novembre','Avis officiel vérifié','Vérification en attente','Comparaison octobre → novembre','Voir les lignes officielles','Source officielle','Tranche','Ligne / conditions','Variation','Montant non publié','Compagnies vérifiées','Perspectives décembre'],
de:['Airline-Treibstoffzuschläge · November 2026','November Stufe 27 · aktuelle Ausstellung · 2026-11-01~11-30','International ab Korea, einfacher Flug, Ausstellungsdatum. Oktober ist historisch; Dezember in Berechnung. Originalwährungen bleiben, Anzeigeumrechnung ist kein Zahlbetrag.','Historischer Oktober-Hinweis','Aktueller November-Hinweis','Offizieller Hinweis geprüft','Prüfung ausstehend','Vergleich Oktober → November','Offizielle Streckentabelle','Offizielle Quelle','Band','Route / Bedingungen','Änderung','Kein veröffentlichter Betrag','Geprüfte Airlines','Dezember-Ausblick']};
function lang(){return (window.SHARED_STATE&&SHARED_STATE.lang)||'ko';}
var periodText={
ko:['11월 적용 예정 공시','11월 과거 공시','한국 출발 국제선 편도 공시입니다. 항공사 원문의 발권·결제일 조건과 공시 통화를 따르며 표시 환산액은 실제 결제액이 아닙니다.','10월과 11월 공시 금액을 같은 통화·구간으로 비교합니다. 노선 적용 조건은 각 항공사 원문에서 확인하세요.','항공사는 월별 적용 금액과 기간을 공지합니다. 여행일과 발권·결제일을 구분해 확인하세요.','공시 원문에서 노선·면제 조건과 실제 발권 금액을 확인하세요.'],
en:['November upcoming notice','November archived notice','Korea-departure international one-way notices. Follow each airline’s ticketing/payment conditions and original currency. Display conversions are not payment amounts.','Compare October and November amounts within the same currency and band. Check route applicability in the original airline notice.','Airlines publish monthly amounts and effective periods. Distinguish travel dates from ticketing and payment dates.','Check route conditions, exemptions and the actual ticketing amount in the original notice.'],
ja:['11月適用予定公示','11月過去公示','韓国発国際線片道の公示です。各社原文の発券・決済日条件と通貨に従ってください。表示換算額は決済額ではありません。','10月・11月の金額を同じ通貨・区分で比較します。路線適用条件は航空会社原文で確認してください。','航空会社は月別金額と適用期間を公示します。旅行日と発券・決済日を区別してください。','原文で路線条件、免除条件、実際の発券金額を確認してください。'],
zh:['11月即将适用公告','11月历史公告','韩国出发国际线单程公告。请遵循各航司原文的出票、付款日期条件及币种。显示换算并非实际付款金额。','在同一币种及区间内比较10月与11月金额。航线适用条件请查看航司原文。','航司按月公布金额及适用期。请区分出行日期与出票、付款日期。','请在公告原文核实航线条件、豁免条件及实际出票金额。'],
fr:['Avis novembre à venir','Avis novembre archivé','Avis internationaux aller simple au départ de Corée. Respectez les conditions d’émission/paiement et la devise d’origine. Les conversions affichées ne sont pas les montants à payer.','Comparez octobre et novembre dans une même devise et tranche. Vérifiez les lignes concernées dans l’avis original.','Les compagnies publient des montants et périodes mensuels. Distinguez la date de voyage des dates d’émission et de paiement.','Vérifiez lignes, exemptions et montant réel à l’émission dans l’avis original.'],
de:['Künftige November-Mitteilung','Archivierte November-Mitteilung','Internationale Einfachflüge ab Korea. Ausstellungs-/Zahlungsbedingungen und Originalwährung der Airline beachten. Anzeigeumrechnungen sind keine Zahlbeträge.','Oktober und November in derselben Währung und Tarifgruppe vergleichen. Gültige Strecken in der Originalmitteilung prüfen.','Airlines veröffentlichen monatliche Beträge und Geltungszeiträume. Reise-, Ausstellungs- und Zahlungsdatum unterscheiden.','Streckenbedingungen, Ausnahmen und tatsächlichen Ausstellungsbetrag in der Originalmitteilung prüfen.']};
function copy(language){
 var l=language||lang(),c=(labels[l]||labels.en).slice(),p=periodText[l]||periodText.en;
 var api=window.AeroNoticePeriod,s=api&&api.state(),period=api&&api.copy(l);
 if(period){c[1]=period.short+' · 2026-11-01~11-30';c[2]=p[2];if(s.relation!=='current')c[4]=s.relation==='upcoming'?p[0]:p[1];}
 return c;
}
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function head(title,desc){
 document.title=title;
 ['meta[name="description"]','meta[property="og:description"]','meta[name="twitter:description"]'].forEach(function(s){var e=document.querySelector(s);if(e)e.content=desc;});
 ['meta[property="og:title"]','meta[name="twitter:title"]'].forEach(function(s){var e=document.querySelector(s);if(e)e.content=title;});
 document.querySelectorAll('script[type="application/ld+json"]').forEach(function(s){try{var j=JSON.parse(s.textContent);(j['@graph']||[j]).forEach(function(n){if(/WebPage|Article|CollectionPage/.test(n['@type'])){n.headline=title;n.description=desc;n.dateModified=stamp;}if(n['@type']==='FAQPage'){n.dateModified=stamp;n.mainEntity=[{'@type':'Question',name:title,acceptedAnswer:{'@type':'Answer',text:desc}}];}});s.textContent=JSON.stringify(j);}catch(ignore){}});
}
function amount(v,currency){return v==null?'—':currency+' '+Number(v).toLocaleString('en-US');}
function rows(n){return n.bands.map(function(b,i){return {band:b,routes:n.groupType==='route_group'?b:copy()[8],v4:n.october[i],v5:n.november[i],cur:n.currency};});}
var detailCodes={'fuel-surcharge-korean-air':'KE','fuel-surcharge-asiana':'OZ','fuel-surcharge-jejuair':'7C','fuel-surcharge-jinair':'LJ','fuel-surcharge-tway':'TW'};
var code=detailCodes[location.pathname.split('/').pop().replace(/\.html$/,'')];
if(!code){
 BASE_MONTH='2026.10';NEXT_MONTH='2026.11';
 notices.forEach(function(n){OFFICIAL_COMPARE_DATA[n.code]=rows(n).map(function(r){if(review.verified.indexOf(n.code)<0)r.v5=null;return r;});});
 getCompareRows=function(c){var n=notices.find(function(n){return n.code===c;});return (OFFICIAL_COMPARE_DATA[c]||[]).map(function(r){return {band:r.band,routes:n&&n.groupType==='route_group'?r.routes:copy()[8],v4:r.v4,cur4:r.cur,v5:r.v5,cur5:r.cur};});};
 JULY_OFFICIAL_CODES=verified.map(function(n){return n.code;});JUNE_OFFICIAL_CODES=JULY_OFFICIAL_CODES.slice();
 hasJulyOfficial=hasJuneOfficial=hasSeptember2026Official=function(c){return review.verified.indexOf(c)>=0;};
 getRepAmount=function(c){var n=verified.find(function(n){return n.code===c;});if(!n)return null;var i=n.november.findIndex(function(v){return v!=null;});return i<0?null:{amountRaw:n.november[i],amountKRW:n.currency==='KRW'?n.november[i]:null,currency:n.currency,label:n.bands[i],month:'2026.11'};};
 function updateIndexCopy(){Object.keys(labels).forEach(function(l){var c=copy(l),d=AIRLINES_I18N[l];Object.assign(d,{pageTitle:c[0],pageSub:c[1],introTitle:c[0],introBody:c[2],betaDesc:c[2],betaNote:c[1],seoSummaryH2:c[0],seoSummaryP:c[1]+' · '+c[14]+': '+verified.map(function(n){return n.code;}).join(' / '),surchargeIntro:c[2],analysisH3:c[7],analysisBullets:[c[1],c[2]],expandHint:c[7],compareTitle:c[7],aprNotice:c[3],mayNotice:c[4],mayBasedLabel:c[4],aprBasedLabel:c[3],notPublished:c[13],noService:c[13],noNotice:c[6],nextOfficialBadge:c[5],pendingOfficialBadge:c[6],missingNoticeBadge:c[6],ftabOfficial:c[5],ftabMissing:c[6],thCurrent:c[4],thStatus:c[5],thSource:c[9],officialNotice:c[9],footerNote:c[2],statusText:function(){return c[1]+' · '+verified.length+'/9';}});});}
 updateIndexCopy();
 var original=window.renderTable;
 window.renderTable=function(){
  updateIndexCopy();
  (window.KR_AIRLINES||[]).forEach(function(a){var n=verified.find(function(n){return n.code===a.code;});if(n){a.officialNoticeUrlMay=null;a.officialNoticeUrl=n.url;a.hasOfficialNotice=true;}});
  AIRLINES_I18N[lang()].aprNotice=copy()[7]+' · '+copy()[9];
  var result=original.apply(this,arguments),c=copy();head(c[0],c[1]+'. '+c[2]);
  document.querySelectorAll('#tableBody .airline-row').forEach(function(row){var ok=review.verified.indexOf(row.dataset.code)>=0,e=row.querySelector('.row-main > div:nth-child(5)');if(e)e.textContent=ok?c[5]:c[6];});
  document.querySelectorAll('a[href="forecast.html"]').forEach(function(a){a.textContent=c[15];});return result;
 };
 var attempts=0,timer=setInterval(function(){if(window.KR_AIRLINES&&KR_AIRLINES.length){renderTable();if(++attempts>=16)clearInterval(timer);}},250);
 window.addEventListener('aero:notice-period-change',function(){renderTable();});
 renderTable();return;
}
var n=verified.find(function(n){return n.code===code;});if(!n)return;
var prefix={KE:'ke',OZ:'oz','7C':'jj',LJ:'lj',TW:'tw'}[code];
function updateDetailCopy(){Object.keys(labels).forEach(function(l){var c=copy(l),p=periodText[l]||periodText.en,d=I18N[l]||(I18N[l]={}),title=code+' · '+c[0];
 ['metaTitle','pageTitle','h1','sectionTitle'].forEach(function(k){d[prefix+'.'+k]=title;});
 d[prefix+'.metaDesc']=c[1]+'. '+c[2];d[prefix+'.intro']=p[3];d[prefix+'.footnote']=c[2];
 d[prefix+'.notice']=c[1];d[prefix+'.card2.body']=p[4];d[prefix+'.card3.body']=p[5];
 d[prefix+'.pageSub']=c[1];d[prefix+'.officialLinkText']=c[9]+' · 2026-11';
 d[prefix+'.rel.may']=c[9];d[prefix+'.rel.jun']=c[15];d[prefix+'.rel.notice']=c[9];d[prefix+'.rel.forecast']=c[15];
});}
updateDetailCopy();
window.renderSurchargeTable=function(){var c=copy(),body=document.getElementById('surchargeTableBody'),thead=document.getElementById('tableHead');
 var section=document.getElementById('sectionTitle');if(section)section.textContent=code+' · '+c[7];
 thead.innerHTML=[c[10],c[11],c[3],c[4],c[12]].map(function(s){return '<th>'+esc(s)+'</th>';}).join('');
 body.innerHTML=rows(n).map(function(r){var diff=r.v4==null||r.v5==null?'—':amount(r.v5-r.v4,n.currency);return '<tr><td>'+esc(r.band)+'</td><td><a href="'+esc(n.url)+'" target="_blank" rel="noopener">'+esc(c[8])+'</a></td><td>'+amount(r.v4,n.currency)+'</td><td><strong>'+amount(r.v5,n.currency)+'</strong></td><td>'+diff+'</td></tr>';}).join('');
 var foot=document.getElementById('tableFootnote');if(foot)foot.textContent=c[2];
 document.querySelectorAll('[data-i18n="'+prefix+'.officialLinkText"],[data-i18n="'+prefix+'.rel.may"],[data-i18n="'+prefix+'.rel.notice"]').forEach(function(a){a.href=n.url;});
 document.querySelectorAll('[data-i18n="'+prefix+'.rel.jun"],[data-i18n="'+prefix+'.rel.forecast"]').forEach(function(a){a.href='forecast.html';});
 head(code+' · '+c[0],c[1]+'. '+c[2]);
};
window.renderAirlinePage=function(){updateDetailCopy();if(window.applyLanguage)window.applyLanguage();window.renderSurchargeTable();};
window.addEventListener('aero:notice-period-change',function(){renderAirlinePage();});
renderAirlinePage();
})();
