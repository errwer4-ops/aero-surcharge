/* Observations stop at the editorial cutoff; modification time is separate. */
(function(){
'use strict';
var r=window.AERO_MARKET_RELEASE;if(!r)return;
var stamp='2026-11-02T09:25:39+09:00',asOf='2026.11.02 09:15 KST';
var urls=[
'https://www.reuters.com/world/tanker-strait-hormuz-hit-limpet-mines-security-sources-say-2026-10-30/',
'https://www.reuters.com/world/middle-east/irans-irgc-navy-says-two-tankers-exploded-after-hitting-mines-hormuz-2026-11-01/',
'https://www.reuters.com/business/energy/opec-set-keep-oil-output-targets-steady-sources-say-2026-11-01/',
'https://www.reuters.com/business/energy/oil-slips-more-than-1-talks-continue-ending-iran-war-2026-11-01/',
'https://www.investing.com/news/commodities-news/oil-rises-on-supply-concerns-as-houthis-attack-saudi-arabia-4985735',
'https://en.yna.co.kr/view/AEN20261030011400320',
'https://commodityscope.com/prices/singapore-jet-kerosene'];
var copy={
ko:{title:'2026년 11월 국제선 유류할증료 27단계 및 12월 전망',meta:'2026년 11월 국제선 유류할증료 27단계 | 12월 MOPS 전망',status:'11월 국제선 유류할증료 27단계 · 현재 발권 적용',dec:'12월 산정 중 · 11월 15일 산정 마감. 공식 누적 MOPS 평균 미확인. 변동성 높음, 방향성 판단 보수적으로 유지하며 특정 단계·원화 부과액은 제시하지 않습니다.',nov:'11월 1~30일 발권분은 국제선 27단계 확정입니다. 탑승일이 아닌 발권일 기준입니다. 산정기간 9월 16일~10월 15일 MOPS 평균은 173.89 USD/bbl로 전월 158.57 대비 9.7% 상승했습니다. 10월 23단계·158.57 USD/bbl은 과거 적용 아카이브입니다.',jet:'CommodityScope 10월 30일 FOB Singapore Jet 자체 일일 평가 168.42 USD/bbl · 낮은 신뢰도. Platts MOPS·12월 산정기간 평균이 아니며 공식 누적 평균에 혼합하지 않습니다.',fx:'10월 30일 서울시장 15:30 종가는 USD/KRW 1,334.3원, 전일 대비 2.5원 하락입니다. 11월 2일 공식 실시간 고시와 12월 산정기간 평균환율은 미확인입니다. 원화 움직임은 환산 부담에 영향을 줄 수 있지만 환율만으로 12월 최종 요금을 계산하지 않습니다.',oil:'10월 30일 정산: Brent 만기 12월물 117.64 / 활성 차월 2027년 1월물 113.43 / WTI 104.12 USD/bbl. 11월 2일 08:03 KST 무렵 장중: Brent 111.92(-1.33%) / WTI 102.34(-1.71%). 정산가나 09:15 현재가가 아니며 원유는 MOPS를 대체하지 않습니다.',flow:'Reuters 10월 22일 보도의 Kpler 10월 평균 추정 11.7m bpd(9월 9.75m, 전쟁 전 약 82%)는 가장 최근 공개 확인 추정치로, 최종 10월 평균·11월 2일 실시간 통항량이 아닙니다. 원유 흐름 회복과 높은 선박안전 위험은 별개입니다.',heads:['호르무즈 유조선 폭발물 공격 · 책임 주체 불명','이란 혁명수비대, 유조선 2척 기뢰 폭발 주장 · 독립 미확인','OPEC+ 핵심 7개국, 12월 생산목표 동결','이란·카타르 협상 사흘째 · 아시아 초반 유가 하락','10월 30일 유가 정산 · Brent 만기물과 차월물 구분','USD/KRW 1,334.3원 · 10월 30일 서울 종가','Singapore Jet 168.42 USD/bbl · 제3자 저신뢰도 평가'],body:[
'10월 29일 Khasab 북동쪽 약 25해리에서 선박에 폭발물이 부착돼 기관실 화재와 일시 운항 중단이 발생했다고 Reuters가 30일 보도했습니다. 세 해상안보 정보원은 Panama 선적 Louise 1과 부착식 기뢰로 지목했습니다. UKMTO는 공격 주체를 밝히지 않았으며 선원 안전·화재 진압·환경 피해 없음·다음 항구로 항해 계속을 전했습니다.',
'11월 1일 이란 국영매체가 전한 혁명수비대 해군의 주장: 허가되지 않은 항로의 유조선 2척이 기뢰에 맞아 폭발했다는 내용입니다. 독립 확인된 피해로 단정하지 않으며 10월 29일 Louise 1 사건과 동일시하지 않습니다.',
'11월 1일 사우디아라비아·러시아·이라크·쿠웨이트·알제리·카자흐스탄·오만이 12월 생산목표 동결을 결정했습니다. Reuters는 2027년 생산 틀 논의에서 11월 29일 전체 회의가 중요하다고 보도했습니다. 향후 생산량 확정 예측은 아닙니다.',
'Reuters 23:03 GMT(11월 2일 08:03 KST) 무렵 장중 참고값: Brent 111.92 USD/bbl(-1.33%), WTI 102.34(-1.71%). 이란·카타르 협상이 사흘째 이어진 가운데 하락했으며 합의·휴전이나 위험 해소를 뜻하지 않습니다.'
],qs:['현재 국제선 유류할증료는 몇 단계인가요?','12월 유류할증료는 몇 단계인가요?','Singapore Jet 168.42는 공식 MOPS인가요?','10월 30일 Brent는 얼마인가요?','호르무즈 해협은 정상화됐나요?','이란 측 유조선 2척 폭발 주장은 확인됐나요?','OPEC+가 생산을 늘렸나요?']},
en:{title:'November 2026 International Surcharge Level 27 and December Outlook',meta:'November 2026 International Surcharge Level 27 | December MOPS Outlook',status:'November Level 27 · current ticketing rate',dec:'December calculation: October 16–November 15. Official cumulative MOPS is unavailable. High volatility; direction remains uncertain. No specific December level or KRW fare.',nov:'Level 27 applies to ticketing November 1–30, not travel dates. September 16–October 15 MOPS averaged 173.89 USD/bbl, 9.7% above 158.57. October Level 23 and 158.57 are archived.',jet:'CommodityScope October 30 FOB Singapore Jet: 168.42 USD/bbl, private daily assessment, low confidence. Not Platts MOPS or a December average; never blend it into official MOPS.',fx:'October 30 Seoul 15:30 close: 1,334.3 KRW/USD, down 2.5. November 2 official live fixing and December period-average FX are unverified. FX alone cannot determine the final December fare.',oil:'October 30 settlements: expiring December Brent 117.64, active January 2027 Brent 113.43, WTI 104.12 USD/bbl. November 2 around 08:03 KST intraday: Brent 111.92 (-1.33%), WTI 102.34 (-1.71%). Not settlements or 09:15 live quotes. Crude is not MOPS.',flow:'Kpler via Reuters October 22: October-to-report crude flow estimate 11.7m bpd, versus September 9.75m, about 82% of pre-war. Not a final October mean or November 2 live traffic. Recovered volumes do not establish safe passage.',heads:['Hormuz tanker explosives attack; perpetrator unknown','IRGC claims two tanker mine explosions; independently unverified','Seven OPEC+ producers freeze December targets','Iran-Qatar talks continue; early Asian oil declines','October 30 settlements: expiring and next Brent contracts','USD/KRW 1,334.3: October 30 Seoul close','Singapore Jet 168.42: low-confidence private assessment'],body:[
'Reuters reported October 30 an October 29 attack about 25 nautical miles northeast of Khasab. Security sources identified Panama-flagged Louise 1 and limpet mines. UKMTO reported crew safe, fire extinguished, no environmental harm and onward sailing; it did not identify the attacker.',
'Iranian state media relayed an IRGC Navy claim November 1 that two tankers hit mines on an unauthorized route. Damage is not independently verified; do not equate this with the Louise 1 event.',
'Saudi Arabia, Russia, Iraq, Kuwait, Algeria, Kazakhstan and Oman froze December targets November 1. Reuters highlighted November 29 talks on the 2027 framework; future output is not settled.',
'Reuters quotes around 23:03 GMT / November 2 08:03 KST: Brent 111.92 (-1.33%), WTI 102.34 (-1.71%) USD/bbl. Iran-Qatar talks continued for a third day, without a confirmed deal, ceasefire or end to risk.'
],qs:['Which international level currently applies?','Is December confirmed?','Is Singapore Jet 168.42 official MOPS?','Which October 30 Brent contract?','Has Hormuz normalized?','Are the two tanker explosions verified?','Did OPEC+ raise production?']}
};
// Keep translated labels and the existing locale architecture; current facts are explicit.
var localized={
ja:['2026年11月国際線27段階と12月見通し','11月27段階・現在の発券に適用','12月は10月16日～11月15日算定中。公式累積MOPS未確認。段階・KRW金額は未確定。','11月1～30日発券に27段階、搭乗日基準ではありません。9月16日～10月15日MOPS173.89 USD/bbl、158.57比9.7％上昇。10月23段階は過去のアーカイブ。'],
zh:['2026年11月国际线27档及12月展望','11月27档·当前出票适用','12月计算期10月16日至11月15日，官方累计MOPS未确认。不预测具体档位或韩元金额。','11月1日至30日出票适用27档，非旅行日。9月16日至10月15日MOPS为173.89 USD/bbl，比158.57高9.7%。10月23档为历史档案。'],
fr:['Novembre 2026 niveau 27 et perspectives décembre','Novembre niveau 27 · émissions actuelles','Décembre : calcul du 16 octobre au 15 novembre. MOPS cumulé officiel inconnu. Aucun niveau ni montant KRW prédit.','Niveau 27 pour émissions du 1 au 30 novembre, non dates de voyage. MOPS du 16 septembre au 15 octobre : 173.89 USD/bbl, +9.7% contre 158.57. Octobre niveau 23 est archivé.'],
de:['November 2026 Stufe 27 und Dezember-Ausblick','November Stufe 27 · aktuelle Ticketausstellung','Dezember-Berechnung 16. Oktober bis 15. November. Offizielles kumuliertes MOPS unbekannt. Keine konkrete Stufe oder KRW-Prognose.','Stufe 27 für Ausstellung 1.–30. November, nicht Reisezeit. MOPS 16. September–15. Oktober 173.89 USD/bbl, +9.7% gegenüber 158.57. Oktober Stufe 23 ist archiviert.']};
Object.keys(localized).forEach(function(l){var a=localized[l];copy[l]=Object.assign({},copy.en,{title:a[0],meta:a[0],status:a[1],dec:a[2],nov:a[3]});});
var n=window.AERO_MARKET_NUMBERS_20261102;r.modified=stamp;r.asOf=asOf;r.numbers=n;
r.sources=[['Korean Air · November', 'https://www.koreanair.com/contents/footer/customer-support/notice/2026/2611-infuel'],['Asiana · November','https://flyasiana.com/C/KR/KO/customer/notice/detail?id=CM202610160002530868'],['CommodityScope · 2026-10-30',urls[6]],['Yonhap · 2026-10-30 16:49 KST',urls[5]],['Reuters · 2026-11-02 08:03 KST observation',urls[3]]];
Object.keys(copy).forEach(function(l){var c=copy[l],p=r.packs[l],old=r.rows[l];
 var rows=[[old[0][0],c.status,c.nov+' '+c.dec],[old[1][0],'MOPS 173.89 USD/bbl (2026-09-16~10-15) | Singapore Jet 168.42 USD/bbl (2026-10-30)',c.jet],[old[2][0],'USD/KRW 1,334.3 (2026-10-30 15:30 KST)',c.fx],[old[3][0],'Brent 117.64 / 113.43 · WTI 104.12 USD/bbl (2026-10-30)',c.oil],[old[4][0],'Kpler 11.7m bpd · Reuters 2026-10-22',c.flow+' '+c.body[0]+' '+c.body[1]]];
 rows[2][0]='USD/KRW';rows[3][0]='Brent / WTI';rows[4][0]=l==='ko'?'호르무즈 원유 흐름 / 선박안전':'Hormuz crude flow / shipping safety';
 r.rows[l]=rows;Object.assign(p,{title:c.title,meta:c.meta,newsTitle:c.title,newsMeta:c.meta,status:c.status,notice:c.status,desc:c.nov+' '+c.dec,sub:asOf+' · '+c.dec,newsSub:asOf+' · '+c.status,intro:c.nov+' '+c.dec+' '+c.jet+' '+c.fx+' '+c.oil+' '+c.flow+' '+c.body[1]+' '+c.body[2],rows:rows,summary:[c.nov,c.dec,c.jet,c.fx,c.oil,c.flow],foot:c.jet,basisBody:c.nov+' '+c.dec,verdict1:c.dec,verdict2:c.jet,verdictLong:c.body[2]+' '+c.body[3],note:c.dec,officialNotice:asOf+' · '+c.status,keyVars:[c.status,c.dec,c.fx,c.oil],faq:c.qs.map(function(q,i){return {q:q,a:[c.nov,c.dec,c.jet,c.oil,c.flow+' '+c.body[0],c.body[1],c.body[2]][i]};})});
 if(l==='ko')p.desc='2026년 11월 국제선 유류할증료는 27단계로 적용 중입니다. 12월 산정 MOPS와 환율, Brent·WTI, 호르무즈 해협 선박안전 및 OPEC+ 소식을 확인하세요.';
 p.sub=(l==='ko'?'최종 업데이트: ':'Last updated: ')+stamp+' · '+p.sub;
 p.newsSub=(l==='ko'?'최종 업데이트: ':'Last updated: ')+stamp+' · '+p.newsSub;
 p.surface=Object.assign({},p.surface,{'fore.pageTitle':c.title,'fore.h1':c.title,'news.h1':c.title,'news.pageTitle':c.title});
 p.surface['fore.myrealtrip.desc']=l==='ko'?'유류할증료는 발권일 기준입니다. 11월 현재 적용 금액과 10월 과거 적용 금액을 구분하며 12월 금액은 미확정입니다.':c.nov+' '+c.dec;
 p.bookingDescription=p.surface['fore.myrealtrip.desc'];
 p.surface['aff.myrealtrip.desc']=p.bookingDescription;
 p.surface['news.decisionShort']=c.status+' · '+c.dec;
 p.surface['fore.cta.desc']=l==='ko'?'11월 현재 적용 유류할증료를 노선별로 확인하세요':c.status;
});
var reports=['2026-10-30','2026-11-01','2026-11-01','2026-11-02','2026-10-30','2026-10-30','2026-10-30'];
var events=['2026-10-29','2026-11-01','2026-11-01','2026-11-02T08:03:00+09:00','2026-10-30','2026-10-30T15:30:00+09:00','2026-10-30'];
var cards=urls.map(function(url,i){var card={id:'market-20261102-'+(i+1),category:i===1||i===2?'institution':'market',priority:i+1,date:'2026-11-02',publishedAt:stamp,updatedAt:stamp,reportedDate:reports[i],eventDate:events[i],observationAt:i===3?events[i]:null,sourceUrl:url,citationUrls:[url],sourceVerificationStatus:i===1?'attributed_claim_independently_unverified':'published_source',badge:'NEW',aiSummary:true,relevanceScore:1-i/100,i18n:{}};
 Object.keys(copy).forEach(function(l){var c=copy[l];card.i18n[l]={title:c.heads[i],aiBrief:c.heads[i],summary:'Report: '+reports[i]+' · Event / observation: '+events[i]+'. '+(i<4?c.body[i]:[c.oil,c.fx,c.jet][i-4]),impact:c.dec,sourceName:i===5?'Yonhap':i===6?'CommodityScope':'Reuters',sourceRefs:[{name:i===5?'Yonhap':i===6?'CommodityScope':'Reuters',url:url}],tags:[i===6?'Low confidence':i===1?'Unverified claim':'Dated observation'],links:[],faq:[]};});card.i18n.cn=card.i18n.zh;return card;});
r.newsCards=cards.concat(r.newsCards.filter(function(c){return !/^market-20261102-/.test(c.id);}));
window.AERO_MARKET_RELEASE=r;window.AERO_MARKET_NUMBERS_LATEST=n;
})();
