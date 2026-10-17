/* November official notices supplement the October market release without changing its layout. */
(function(){
'use strict';
var r=window.AERO_MARKET_RELEASE,notices=window.NOVEMBER_2026_OFFICIAL_NOTICES;
if(!r||!notices)return;
var stamp='2026-10-17T17:25:00+09:00',asOf='2026.10.17 17:25 KST';
var copy={
ko:{
title:'2026년 10월 유류할증료 적용 | 11월 5개 항공사 공식 공시',
status:'10월 23단계 현재 적용 · 11월 KE·OZ·7C·LJ·RS 공시 확인',
pending:'11월 산정기간 2026-09-16~10-15는 종료됐으며 10월 16일 발표된 대한항공·아시아나·제주항공·진에어·에어서울의 공식 금액을 확인했습니다. 11월 1~30일 발권분에 적용하며 현재 10월 금액과 구분합니다. 다른 항공사의 11월 공시와 공식 MOPS 평균·단계는 이번 자료에서 확인되지 않아 추정하지 않습니다.',
noticeTitle:'2026년 11월 한국 출발 국제선 유류할증료 공식 공시',
noticeDesc:'11월 공시 확인: KE·OZ·7C·LJ·RS. 나머지 4개사는 11월 공시 확인 대기이며 이전 달 링크를 11월 공시처럼 연결하지 않습니다.',
waiting:'11월 공시 확인 대기',
compareTitle:'전월 대비: 10월 → 11월 공식 공시 비교',
verdictTitle:'11월 공식 공시 확인 현황',
foot:'11월 금액은 항공사 공식 공시이며 발권일 기준입니다. KRW 공시와 USD 공시를 환율 환산 없이 직접 비교하지 않습니다. 10월 MOPS 평균 158.57 USD/bbl·377.54 cents/gal은 과거 산정 기준으로 유지하며 11월 평균·단계로 쓰지 않습니다.',
cardTitle:'11월 국제선 유류할증료 공시',
period:'10월 16일 공식 공지 및 저장 PDF에서 확인한 한국 출발 국제선 편도 금액입니다. 적용은 2026년 11월 1~30일 발권분이며 탑승일 기준이 아닙니다.',
detail:'거리 구간별 10월 → 11월 금액',
impact:'같은 항공사·같은 통화·같은 구간의 전월 대비 변화입니다. 다른 항공사의 통화와 직접 비교하지 않으며 실제 부과액은 공식 노선표를 확인하세요.',
change:'구간별 최소 추가 부담',maxChange:'최대 추가 부담',source:'항공사 공식 공지',q:'11월 국제선 공시는 어떤 항공사가 발표했나요?',
names:['대한항공','아시아나항공','제주항공','진에어','에어서울'],
applies:'11월 공식',current:'10월 현재 적용',noAverage:'확인된 5개사의 금액은 공식 공시입니다. 11월 MOPS 평균·단계는 이 공시만으로 추정하지 않습니다.'
},
en:{
title:'October 2026 Surcharges Apply | Five November Airline Notices Confirmed',
status:'October Level 23 applies · November KE/OZ/7C/LJ/RS notices confirmed',
pending:'The November calculation period September 16–October 15 has ended. Korean Air, Asiana, Jeju Air, Jin Air and Air Seoul published verified amounts on October 16 for ticketing November 1–30, separate from current October charges. Other November notices and the official MOPS average/level were not established from these documents and are not estimated.',
noticeTitle:'November 2026 Korea-departure international official notices',
noticeDesc:'November confirmed: KE/OZ/7C/LJ/RS. Four other carriers await verification; October links are not presented as November notices.',
waiting:'November official notice awaiting verification',
compareTitle:'Month comparison: October to November official notices',
verdictTitle:'November official notice verification',
foot:'November figures are official airline notices by ticketing date. Do not compare KRW and USD notices without conversion. October MOPS 158.57 USD/bbl and 377.54 cents/gal remain historical calculation averages, not November averages or level.',
cardTitle:'November international surcharge notice',
period:'Korea-departure international one-way figures verified against the October 16 official notice and saved PDF. They apply to ticketing November 1–30, 2026, not the travel date.',
detail:'Distance band: October to November',
impact:'Changes compare the same carrier, currency and band. Do not directly compare different notice currencies; check the official route table for the actual charge.',
change:'Minimum additional charge across bands',maxChange:'maximum additional charge',source:'Official airline notice',q:'Which airlines have published November international notices?',
names:['Korean Air','Asiana Airlines','Jeju Air','Jin Air','Air Seoul'],
applies:'November official',current:'October currently applies',noAverage:'The five airlines’ amounts are officially published. Their notices alone do not establish November MOPS average or level.'
},
ja:{
title:'2026年10月燃油サーチャージ適用 | 11月5社公式公示確認',
status:'10月23段階適用中 · 11月KE・OZ・7C・LJ・RS公示確認',
pending:'11月算定期間9月16日～10月15日は終了。10月16日発表の大韓航空・アシアナ・チェジュ航空・ジンエアー・エアソウルの公式金額を確認しました。11月1～30日発券分に適用し、現在の10月金額と区別します。他社11月公示、公式MOPS平均・段階は今回の資料から未確認のため推定しません。',
noticeTitle:'2026年11月韓国発国際線燃油サーチャージ公式公示',
noticeDesc:'11月確認済み：KE・OZ・7C・LJ・RS。他4社は11月公示確認待ちで、10月リンクを11月公示として表示しません。',
waiting:'11月公式公示確認待ち',compareTitle:'前月比較：10月→11月公式公示',verdictTitle:'11月公式公示確認状況',
foot:'11月金額は発券日基準の公式公示です。KRWとUSDを換算せず直接比較しません。10月MOPS158.57 USD/bbl・377.54 cents/galは過去の確定平均で、11月平均や段階ではありません。',
cardTitle:'11月国際線燃油サーチャージ公示',
period:'10月16日の公式公示と保存PDFで確認した韓国発国際線片道金額です。2026年11月1～30日発券分に適用し、搭乗日基準ではありません。',
detail:'距離区間別10月→11月',
impact:'同一航空会社・同一通貨・同一区間の前月比較です。異なる公示通貨を直接比較せず、実際の金額は公式路線表をご確認ください。',
change:'区間別の最小追加負担',maxChange:'最大追加負担',source:'航空会社公式公示',q:'11月国際線公示を発表した航空会社は？',
names:['大韓航空','アシアナ航空','チェジュ航空','ジンエアー','エアソウル'],applies:'11月公式',current:'10月現在適用',noAverage:'5社の金額は公式公示です。この公示だけから11月MOPS平均・段階は推定しません。'
},
zh:{
title:'2026年10月燃油附加费执行中 | 11月5家航司公告确认',
status:'10月第23档执行中 · 11月KE/OZ/7C/LJ/RS公告确认',
pending:'11月计算期9月16日至10月15日已结束。已核实大韩、韩亚、济州、真航空及首尔航空10月16日公布的官方金额，适用11月1日至30日出票，与当前10月收费区分。其他航司11月公告和官方MOPS均价、档位尚未从本次资料确认，不作推算。',
noticeTitle:'2026年11月韩国出发国际线燃油附加费官方公告',
noticeDesc:'11月已确认：KE/OZ/7C/LJ/RS。其余4家等待核实11月公告，不将10月链接作为11月公告。',
waiting:'等待核实11月官方公告',compareTitle:'前月对比：10月→11月官方公告',verdictTitle:'11月官方公告确认情况',
foot:'11月金额为按出票日期适用的航司官方公告。KRW与USD未经换算不可直接比较。10月MOPS158.57 USD/bbl及377.54 cents/gal为历史确定均价，不是11月均价或档位。',
cardTitle:'11月国际线燃油附加费公告',
period:'金额经10月16日官方公告及保存PDF核实，为韩国出发国际线单程费用。适用2026年11月1日至30日出票，而非乘机日期。',
detail:'距离区间10月→11月',
impact:'比较同一航司、币种及区间的前月变化。不可直接比较不同公告币种，实际费用请核对官方航线表。',
change:'各区间最低额外负担',maxChange:'最高额外负担',source:'航司官方公告',q:'哪些航司公布了11月国际线公告？',
names:['大韩航空','韩亚航空','济州航空','真航空','首尔航空'],applies:'11月官方',current:'10月当前执行',noAverage:'5家航司金额已正式公布，不能仅凭此公告推算11月MOPS均价或档位。'
},
fr:{
title:'Surtaxes octobre 2026 en vigueur | Cinq avis officiels novembre confirmés',
status:'Octobre niveau 23 en vigueur · avis novembre KE/OZ/7C/LJ/RS confirmés',
pending:'La période novembre du 16 septembre au 15 octobre est terminée. Korean Air, Asiana, Jeju Air, Jin Air et Air Seoul ont publié le 16 octobre des montants vérifiés pour émission du 1er au 30 novembre, distincts des montants octobre en vigueur. Autres avis, moyenne MOPS officielle et niveau novembre non établis par ces documents, sans estimation.',
noticeTitle:'Avis officiels internationaux novembre 2026 au départ de Corée',
noticeDesc:'Novembre confirmé : KE/OZ/7C/LJ/RS. Quatre autres compagnies à vérifier ; leurs liens octobre ne sont pas présentés comme avis novembre.',
waiting:'Avis officiel novembre en attente de vérification',compareTitle:'Comparaison mensuelle : octobre vers novembre',verdictTitle:'Vérification des avis officiels novembre',
foot:'Montants novembre officiels selon la date d’émission. Ne pas comparer directement KRW et USD sans conversion. MOPS octobre 158.57 USD/bbl et 377.54 cents/gal restent des moyennes historiques, pas moyenne ou niveau novembre.',
cardTitle:'Avis de surtaxe internationale novembre',
period:'Montants aller simple au départ de Corée vérifiés sur l’avis officiel du 16 octobre et le PDF sauvegardé. Émission du 1er au 30 novembre 2026, et non date de voyage.',
detail:'Tranches de distance : octobre vers novembre',
impact:'Écart pour même compagnie, devise et tranche. Ne pas comparer directement des devises différentes ; consulter le tableau officiel des lignes.',
change:'Supplément minimum parmi les tranches',maxChange:'supplément maximum',source:'Avis officiel de la compagnie',q:'Quelles compagnies ont publié leurs avis internationaux novembre ?',
names:['Korean Air','Asiana Airlines','Jeju Air','Jin Air','Air Seoul'],applies:'Novembre officiel',current:'Octobre en vigueur',noAverage:'Les montants des cinq compagnies sont officiels ; ces avis seuls ne déterminent ni moyenne MOPS ni niveau novembre.'
},
de:{
title:'Oktober-Zuschläge 2026 gelten | Fünf offizielle November-Mitteilungen bestätigt',
status:'Oktober Stufe 23 gilt · November KE/OZ/7C/LJ/RS bestätigt',
pending:'November-Zeitraum 16. September bis 15. Oktober beendet. Korean Air, Asiana, Jeju Air, Jin Air und Air Seoul veröffentlichten am 16. Oktober geprüfte Beträge für Ausstellung 1.–30. November, getrennt von aktuellen Oktober-Beträgen. Andere November-Mitteilungen, offizielles MOPS-Mittel und Stufe aus diesen Unterlagen nicht bestätigt; keine Schätzung.',
noticeTitle:'Offizielle internationale November-2026-Mitteilungen ab Korea',
noticeDesc:'November bestätigt: KE/OZ/7C/LJ/RS. Vier andere Airlines noch zu prüfen; Oktober-Links nicht als November-Mitteilungen dargestellt.',
waiting:'Offizielle November-Mitteilung noch zu prüfen',compareTitle:'Monatsvergleich: Oktober zu November',verdictTitle:'Prüfstand offizieller November-Mitteilungen',
foot:'November-Beträge laut offiziellen Mitteilungen nach Ausstellungsdatum. KRW und USD ohne Umrechnung nicht direkt vergleichen. Oktober-MOPS158.57 USD/bbl und 377.54 cents/gal bleiben historische Mittel, nicht November-Mittel oder Stufe.',
cardTitle:'November-Mitteilung internationaler Treibstoffzuschlag',
period:'Internationaler Einfachbetrag ab Korea laut offizieller Mitteilung vom 16. Oktober und gespeichertem PDF. Gilt für Ausstellung 1.–30. November 2026, nicht nach Reisedatum.',
detail:'Entfernungsband: Oktober zu November',
impact:'Vergleich derselben Airline, Währung und Entfernung. Unterschiedliche Mitteilungswährungen nicht direkt vergleichen; tatsächlichen Betrag in der offiziellen Streckentabelle prüfen.',
change:'Kleinster Mehrbetrag über alle Bänder',maxChange:'größter Mehrbetrag',source:'Offizielle Airline-Mitteilung',q:'Welche Airlines haben internationale November-Mitteilungen veröffentlicht?',
names:['Korean Air','Asiana Airlines','Jeju Air','Jin Air','Air Seoul'],applies:'November offiziell',current:'Oktober aktuell',noAverage:'Die fünf Airline-Beträge sind offiziell. Aus den Mitteilungen allein werden weder November-MOPS-Mittel noch Stufe abgeleitet.'
}
};
function fmt(n){return n.toLocaleString('en-US');}
var bookingCopy={"ko":"유류할증료는 발권일 기준입니다. 10월 현재 적용 금액과 확인된 11월 공식 금액을 구분해 항공권 총액을 비교하세요.","en":"Fuel surcharges follow ticketing date. Distinguish current October charges from confirmed November notices when comparing total fares.","ja":"燃油サーチャージは発券日基準です。現在の10月金額と確認済み11月公示を区別して航空券総額を比較してください。","zh":"燃油附加费按出票日适用。比较机票总价时，请区分当前10月收费与已确认11月官方金额。","fr":"La surtaxe dépend de la date d’émission. Distinguez octobre en vigueur des avis novembre confirmés pour comparer le prix total.","de":"Zuschläge gelten nach Ausstellungsdatum. Aktuelle Oktober-Beträge und bestätigte November-Mitteilungen beim Gesamtpreisvergleich trennen."};
function range(n){return n.currency+' '+fmt(Math.min.apply(null,n.november))+'–'+fmt(Math.max.apply(null,n.november));}
function changes(n){var d=n.november.map(function(v,i){return v-n.october[i];});return [Math.min.apply(null,d),Math.max.apply(null,d)];}
r.octoberOfficialRows={};Object.keys(r.officialRows).forEach(function(l){r.octoberOfficialRows[l]=r.officialRows[l].map(function(x){return x.slice();});});
r.octoberOfficialUrls=Object.assign({},r.officialUrls);
r.officialUrls={};notices.forEach(function(n){r.officialUrls[n.key]=n.url;});
r.modified=stamp;r.asOf=asOf;
r.numbers=Object.assign({},r.numbers,{
asOf:asOf,lastUpdated:stamp,novemberStatus:'five_official_notices_confirmed_other_carriers_unverified',
novemberConfirmedAirlines:notices.map(function(n){return n.code;}),
novemberNoticeDate:'2026-10-16',novemberStageEstimate:null,novemberMopsUsdPerBbl:null
});
Object.keys(copy).forEach(function(l){
var c=copy[l],p=r.packs[l],rows=r.rows[l].map(function(x){return x.slice();});
p.bookingDescription=bookingCopy[l];
rows[0][1]=c.status;rows[0][2]=c.pending;r.rows[l]=rows;
r.officialRows[l]=r.octoberOfficialRows[l].map(function(row){
var n=notices.find(function(x){return x.key===row[0];});
if(!n)return [row[0],row[1],c.waiting];
var i=notices.indexOf(n),d=changes(n);
return [row[0],c.names[i],c.applies+': '+range(n)+' · '+c.change+' +'+n.currency+' '+fmt(d[0])];
});
Object.assign(p,{title:c.title,meta:c.title,newsTitle:c.title,newsMeta:c.title,rows:rows,
desc:c.pending,sub:asOf+' · '+c.status,newsSub:asOf+' · '+c.status,
intro:c.pending+' '+c.noAverage,notice:c.status,foot:c.foot,basisBody:c.foot,note:c.pending,
verdictTitle:c.verdictTitle,verdict1:c.pending,verdict2:c.noAverage,verdictLong:c.foot,
officialTitle:c.noticeTitle,officialNotice:asOf+' · '+c.status,officialDesc:c.noticeDesc,
keyVars:rows.map(function(x){return x[0]+': '+x[1];})});
p.ui=p.ui.slice();p.ui[2]=c.compareTitle;
p.faq=p.faq.map(function(x,i){return i===1?{q:c.q,a:c.pending}:i===2?{q:x.q,a:c.pending}:x;});
});
var cards=notices.map(function(n,i){
var d=changes(n),card={id:'notice-202611-'+n.code.toLowerCase(),category:'airline',priority:i+1,
date:'2026-10-17',publishedAt:stamp,updatedAt:stamp,reportedDate:'2026-10-16',eventDate:'2026-10-16',
badge:'NEW',aiSummary:false,relevanceScore:1-i/100,sourceUrl:n.url,i18n:{}};
Object.keys(copy).forEach(function(l){var c=copy[l];
var brief=c.applies+': '+range(n)+' · '+c.change+' +'+n.currency+' '+fmt(d[0])+', '+c.maxChange+' +'+n.currency+' '+fmt(d[1])+'.';
var detail=n.bands.map(function(b,j){return b+': '+n.currency+' '+fmt(n.october[j])+' → '+fmt(n.november[j])+' (+'+fmt(n.november[j]-n.october[j])+')';}).join('; ');
card.i18n[l]={title:c.names[i]+' · '+c.cardTitle,aiBrief:brief,
summary:c.period+' '+c.detail+': '+detail+'.',impact:c.impact,
sourceName:c.source,tags:[n.code,n.currency,'2026-11-01~2026-11-30'],links:[],faq:[]};
});card.i18n.cn=card.i18n.zh;return card;
});
r.newsCards=cards.concat(r.newsCards.filter(function(x){return !/^notice-202611-/.test(x.id);}));
window.AERO_MARKET_RELEASE=r;
window.AERO_MARKET_NUMBERS_LATEST=r.numbers;
})();

