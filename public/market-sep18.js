(function(){
  'use strict';
  var release=window.AERO_MARKET_RELEASE;
  if(!release) return;
  var stamp='2026-09-18T09:00:00+09:00';
  var asOf='2026.09.18 09:00 KST';
  var langs=['ko','en','ja','zh','fr','de'];
  var copy={
    ko:{intro:'2026년 10월 국제선 유류할증료는 23단계로 확정됐고 산정 MOPS 평균은 $158.57/bbl입니다. 9월 21단계는 9월 30일까지 적용됩니다. 11월 산정은 시작 단계입니다. 글로벌 Jet Fuel 주간평균 $181.46/bbl(+6.1%), 현재 USD/KRW 약 1,380.55원, 호르무즈 Kpler 공개 AIS 기반 commodity vessel 예비집계 3척(10일 평균 17척)은 초기 상방요인입니다. 다만 Saudi/Oman STS 우회수출, 송유관 부분복구 노력, Singapore Jet의 diesel 대비 상대약세가 일부 완충합니다. 11월 전망은 초기 상방압력이 강하나 단계는 미정이며 신뢰도는 낮음~보통입니다.',nov:'11월 산정기간은 9월 16일~10월 15일입니다. 글로벌 Jet Fuel은 Singapore MOPS가 아니며, 현재 원/달러 환율도 10월 확정 평균환율이 아닌 11월 변수입니다. 호르무즈 공개통항 3척은 전체 선박 수가 아니고 AIS 비활성·dark route 선박은 누락될 수 있습니다. Saudi Oman Sohar STS와 East-West Pipeline 부분복구 추진, Singapore Jet regrade 약세가 공급위험을 일부 완충합니다.',fx:'10월 단계는 Singapore Jet Fuel/MOPS 평균 $158.57/bbl로 결정됐고 원화 부과액에는 10월 산정기간 평균 USD/KRW 약 1,370.95원이 반영됐습니다. 현재 현물 약 1,380.55원은 11월 산정 초기 변수입니다. 일부 대한항공 노선의 원화 금액은 9월보다 낮습니다.',summary:'11월 산정 시작 · 초기 상방압력 강함 · 신뢰도 낮음~보통',pipeline:'Saudi Oman Sohar STS 우회수출은 공급위험을 일부 완충합니다. East-West Pipeline은 부분복구를 추진 중이지만 차질은 계속됩니다.',jet:'Global Jet Fuel 주간평균은 Singapore MOPS와 다릅니다. Singapore Jet는 높은 절대가격에도 diesel 대비 상대강도가 약해지고 있습니다.',hormuz:'Kpler 공개 AIS 기반 commodity vessel 예비집계입니다. 전체 선박 통항이 아니며 AIS 비활성·dark route는 누락될 수 있습니다.'},
    en:{intro:'The October 2026 international surcharge is confirmed at Level 23 on a Singapore MOPS average of $158.57/bbl. September Level 21 applies through September 30. November calculation has begun. Global Jet Fuel $181.46/bbl (+6.1%), spot USD/KRW near 1,380.55 and three publicly tracked Hormuz commodity vessels versus a 10-day average of 17 create early upside pressure. Saudi/Oman STS exports, pipeline repair efforts and weaker Singapore jet regrade partly offset it. No November level is forecast; confidence is low to moderate.',nov:'The November calculation window is September 16–October 15. Global Jet Fuel is not Singapore MOPS, and spot FX is a November input, not the confirmed October average. The Hormuz figure is a preliminary Kpler public AIS commodity-vessel count, not total traffic; dark-route vessels may be missing.',fx:'October Level 23 uses Singapore MOPS $158.57/bbl and period-average USD/KRW near 1,370.95. Spot USD/KRW near 1,380.55 is an early November variable. Some Korean Air KRW amounts fell despite the level increase.',summary:'November calculation started · strong early upside pressure · low-to-moderate confidence',pipeline:'Saudi Oman Sohar STS exports partly offset supply risk. East-West Pipeline partial restoration is underway, but disruption continues.',jet:'The global weekly Jet Fuel average is not Singapore MOPS. Singapore jet remains expensive but is weakening relative to diesel.',hormuz:'Preliminary Kpler public AIS commodity-vessel count, not all shipping; AIS-off or dark-route vessels may be absent.'},
    ja:{intro:'2026年10月の国際線燃油サーチャージは23段階、算定MOPS平均は$158.57/bblで確定しました。9月21段階は9月30日まで適用。11月の算定は初期段階です。世界Jet Fuel週平均$181.46/bbl（+6.1%）、直物USD/KRW約1,380.55、ホルムズのKpler公開AIS暫定集計3隻（10日平均17隻）は上方要因です。Saudi/Oman STS、パイプライン部分復旧の取り組み、Singapore Jetのdiesel比での相対的な弱さが一部緩衝します。11月の段階は未定です。',nov:'11月の算定期間は9月16日～10月15日です。世界Jet FuelはSingapore MOPSではなく、直物為替は10月確定平均ではなく11月の変数です。ホルムズ3隻は全船舶ではなく公開AISによるcommodity vessel暫定集計です。',fx:'10月の算定MOPSは$158.57/bbl、平均USD/KRWは約1,370.95です。現在の直物約1,380.55は11月の変数です。一部の大韓航空路線のウォン額は低下しました。',summary:'11月算定開始・初期上方圧力は強い・信頼度は低～中',pipeline:'Saudi Oman Sohar STSの迂回輸出が一部緩衝。East-West Pipelineは部分復旧を進めていますが支障は続いています。',jet:'世界週平均Jet FuelはSingapore MOPSではありません。Singapore Jetは高値でもdiesel比の相対的な強さは弱まっています。',hormuz:'Kpler公開AISによるcommodity vessel暫定集計で全船舶数ではありません。AIS停止船は含まれない可能性があります。'},
    zh:{intro:'2026年10月国际线燃油附加费确定为第23档，计算期Singapore MOPS均价为$158.57/bbl。9月第21档适用至9月30日。11月计算刚开始。全球航油周均价$181.46/bbl（+6.1%）、即期USD/KRW约1,380.55、霍尔木兹Kpler公开AIS商品船初步统计3艘（10日均值17艘）构成初期上行压力。Saudi/Oman STS、管道部分修复和Singapore Jet相对diesel走弱带来部分缓冲。11月具体档位尚未确定。',nov:'11月计算期为9月16日至10月15日。全球航油并非Singapore MOPS，即期汇率也不是10月确定均值。霍尔木兹3艘仅是Kpler公开AIS商品船初步统计，不能代表全部船舶。',fx:'10月确定的MOPS均价为$158.57/bbl，平均USD/KRW约1,370.95。当前即期约1,380.55属于11月变量。部分大韩航空航线韩元费用下降。',summary:'11月计算开始·初期上行压力较强·可信度低至中',pipeline:'Saudi Oman Sohar STS绕行出口部分缓冲供应风险。East-West Pipeline正推动部分修复，但中断仍持续。',jet:'全球周均航油并非Singapore MOPS。Singapore Jet绝对价格较高，但相对diesel强度正在减弱。',hormuz:'Kpler公开AIS商品船初步统计，并非全部船舶；关闭AIS的船舶可能不在统计中。'},
    fr:{intro:'La surtaxe internationale d’octobre 2026 est confirmée au niveau 23, avec une moyenne Singapore MOPS de $158.57/bbl. Le niveau 21 de septembre reste applicable jusqu’au 30 septembre. Le calcul de novembre débute. Le Jet Fuel mondial à $181.46/bbl (+6,1%), le comptant USD/KRW proche de 1 380,55 et trois navires de marchandises suivis publiquement à Hormuz contre 17 en moyenne sur dix jours exercent une pression haussière. Le STS Saudi/Oman, les efforts de réparation du pipeline et la faiblesse relative du jet face au diesel amortissent partiellement. Aucun niveau de novembre n’est établi.',nov:'La période de novembre va du 16 septembre au 15 octobre. Le Jet Fuel mondial n’est pas le Singapore MOPS et le change au comptant est une variable de novembre. Les trois navires sont un décompte préliminaire Kpler AIS, pas le trafic total.',fx:'Le MOPS confirmé d’octobre est $158.57/bbl et le change moyen USD/KRW proche de 1 370,95. Le comptant proche de 1 380,55 concerne novembre. Certains montants Korean Air en KRW ont baissé.',summary:'Calcul novembre commencé · forte pression haussière initiale · confiance faible à modérée',pipeline:'Le STS à Oman Sohar amortit partiellement le risque. La remise en état partielle du pipeline East-West progresse, mais la perturbation continue.',jet:'La moyenne mondiale hebdomadaire n’est pas le Singapore MOPS. Le jet reste cher mais faiblit par rapport au diesel.',hormuz:'Décompte préliminaire Kpler AIS des navires de marchandises, non du trafic total; des navires sans AIS peuvent manquer.'},
    de:{intro:'Der internationale Oktober-Zuschlag 2026 ist mit Stufe 23 und einem Singapore-MOPS-Mittel von $158.57/bbl bestätigt. September-Stufe 21 gilt bis zum 30. September. Die November-Berechnung hat begonnen. Globales Jet Fuel mit $181.46/bbl (+6,1%), Spot-USD/KRW um 1.380,55 und drei öffentlich erfasste Rohstoffschiffe in Hormuz gegenüber einem Zehntagesmittel von 17 erzeugen frühen Aufwärtsdruck. Saudi/Oman-STS, Pipeline-Reparatur und schwächeres Singapore-Jet-Regrade gegenüber Diesel puffern teilweise. Eine genaue November-Stufe ist nicht bekannt.',nov:'Der November-Zeitraum läuft vom 16. September bis 15. Oktober. Globales Jet Fuel ist nicht Singapore MOPS; Spot-FX ist eine November-Variable. Die drei Schiffe sind eine vorläufige öffentliche Kpler-AIS-Zählung von Rohstoffschiffen, nicht der gesamte Verkehr.',fx:'Das bestätigte Oktober-MOPS-Mittel beträgt $158.57/bbl, der durchschnittliche USD/KRW etwa 1.370,95. Der aktuelle Spotkurs um 1.380,55 gehört zu November. Einige Korean-Air-KRW-Beträge sanken.',summary:'November-Berechnung begonnen · starker früher Aufwärtsdruck · geringe bis mittlere Sicherheit',pipeline:'Saudi Oman Sohar STS puffert das Angebotsrisiko teilweise. Eine Teilreparatur der East-West Pipeline läuft, die Störung hält jedoch an.',jet:'Der globale Jet-Fuel-Wochendurchschnitt ist nicht Singapore MOPS. Jet bleibt teuer, schwächt sich aber relativ zu Diesel ab.',hormuz:'Vorläufige öffentliche Kpler-AIS-Zählung von Rohstoffschiffen, nicht aller Schiffe; Schiffe ohne AIS können fehlen.'}
  };
  release.modified=stamp;
  Object.assign(release.numbers,{asOf:asOf,usdKrw:1380.55,jpy100Krw:885.36,brentUsdPerBbl:104.82,wtiUsdPerBbl:101.91,hormuzKplerCommodityVessels:3,hormuzTenDayAverage:17,babElMandebCommodityVessels:21,babElMandebPrevious:24});
  langs.forEach(function(l){
    var c=copy[l],p=release.packs[l],r=release.rows[l];
    p.sub=asOf+' · '+c.summary;
    p.newsSub=p.sub;
    p.intro=c.intro;
    p.desc=c.intro;
    p.foot=c.intro;
    p.verdictTitle=c.summary;
    p.verdict1=c.summary;
    p.verdict2=c.nov;
    p.verdictLong=c.fx;
    p.officialNotice=asOf+' · '+(l==='ko'?'10월 공식공시 7개 항공사 확인':'Seven October airline notices confirmed');
    p.officialDesc=l==='ko'?'이스타항공·에어프레미아: 10월 공시 발표 전':'Eastar Jet and Air Premia: October notice not yet published';
    p.faq=[{q:l==='ko'?'10월 유류할증료는 몇 단계인가?':'What is the October surcharge level?',a:c.intro},{q:l==='ko'?'11월 단계는 확정됐나?':'Is the November level confirmed?',a:c.nov},{q:l==='ko'?'현재 환율은 10월에도 적용되나?':'Does spot FX affect October?',a:c.fx},{q:l==='ko'?'Global Jet Fuel은 Singapore MOPS인가?':'Is Global Jet Fuel Singapore MOPS?',a:c.jet},{q:l==='ko'?'호르무즈 3척은 전체 통항량인가?':'Are three vessels the total Hormuz traffic?',a:c.hormuz}];
    r[0][2]=c.summary;
    r[2][1]=(l==='ko'?'10월 평균 ':'October average ')+'~1,370.95 · spot ~1,380.55 · JPY100 ~885.36';r[2][2]=c.fx;
    r[3][1]='$181.46/bbl (+6.1%) · Brent $104.82 · WTI $101.91';r[3][2]=c.jet+' '+c.pipeline;
    r[4][1]='Hormuz 3 / 10-day avg 17 · Bab el-Mandeb 21 / prior 24';r[4][2]=c.hormuz;
    p.keyVars=r.map(function(row){return row[0]+': '+row[1];});
  });
  var noticeUrls={
    officialTw:'https://www.trinityairways.com/app/customerCenter/notice/retrieve/12703',
    official7c:'https://www.jejuair.net/ko/customerServiceCenter/noticeDetail.do?billboardNo=0000000762',
    officialRs:'https://flyairseoul.com/CW/ko/noticeContent.do?seq=11103&pageNo=1'
  };
  Object.assign(release.officialUrls,noticeUrls);
  var noticeText={
    ko:['트리니티(티웨이) 10월 국제선 공시 확인','제주항공 10월 국제선 공시 확인','에어서울 10월 국제선 공시 확인'],
    en:['Trinity (Tway) October international notice published','Jeju Air October international notice published','Air Seoul October international notice published'],
    ja:['トリニティ（ティーウェイ）10月国際線公示確認','チェジュ航空10月国際線公示確認','エアソウル10月国際線公示確認'],
    zh:['Trinity（德威）10月国际线公告已发布','济州航空10月国际线公告已发布','首尔航空10月国际线公告已发布'],
    fr:['Avis international octobre Trinity (Tway) publié','Avis international octobre Jeju Air publié','Avis international octobre Air Seoul publié'],
    de:['Oktober-Mitteilung Trinity (Tway) veröffentlicht','Oktober-Mitteilung Jeju Air veröffentlicht','Oktober-Mitteilung Air Seoul veröffentlicht']
  };
  var confirmedText={
    ja:['10月公式: 49,000～362,600ウォン。一部路線のウォン額は低下','10月公式公示を確認。路線別金額は原文を参照','10月公式: 距離区分別にUSD 32・46・74など','10月公式: USD 37・66・78・90'],
    zh:['10月官方: 49,000至362,600韩元，部分航线韩元金额下降','10月官方公告已确认，航线金额请查阅原文','10月官方: 距离档32、46、74美元等','10月官方: 37、66、78、90美元'],
    fr:['Avis octobre: 49 000 à 362 600 KRW; certaines lignes baissent','Avis officiel octobre confirmé; voir les montants par ligne','Avis octobre: 32, 46 et 74 USD selon la distance','Avis octobre: 37, 66, 78 et 90 USD'],
    de:['Oktober offiziell: 49.000 bis 362.600 KRW; einige Strecken günstiger','Oktober-Mitteilung bestätigt; Streckenbeträge in der Quelle','Oktober offiziell: 32, 46 und 74 USD nach Entfernung','Oktober offiziell: 37, 66, 78 und 90 USD']
  };
  Object.keys(confirmedText).forEach(function(l){confirmedText[l].forEach(function(value,i){release.officialRows[l][i][2]=value;});});
  var noticeAmounts={
    ko:['37,000~256,600원','USD 37~87','60,300~108,300원'],
    en:['KRW 37,000–256,600','USD 37–87','KRW 60,300–108,300'],
    ja:['37,000～256,600ウォン','USD 37～87','60,300～108,300ウォン'],
    zh:['37,000至256,600韩元','37至87美元','60,300至108,300韩元'],
    fr:['37 000 à 256 600 KRW','37 à 87 USD','60 300 à 108 300 KRW'],
    de:['37.000 bis 256.600 KRW','37 bis 87 USD','60.300 bis 108.300 KRW']
  };
  langs.forEach(function(l){var rows=release.officialRows[l];[[4,0],[5,1],[7,2]].forEach(function(pair){rows[pair[0]][2]=noticeText[l][pair[1]]+' · '+noticeAmounts[l][pair[1]];});});
  var newCards=[['officialTw',0],['official7c',1],['officialRs',2]];
  var noticeAdvice={ko:'노선별 금액은 공식 공시에서 확인하세요.',en:'Check route amounts in the official notice.',ja:'路線別金額は公式公示で確認してください。',zh:'请在官方公告核对各航线金额。',fr:'Vérifiez les montants par ligne dans l’avis officiel.',de:'Prüfen Sie die Streckenbeträge in der offiziellen Mitteilung.'};
  newCards.forEach(function(entry,i){var card={id:entry[0]+'-20260918',category:'airline',priority:i+1,date:'2026-09-18',updatedAt:stamp,aiSummary:true,relevanceScore:1-i/100,sourceUrl:noticeUrls[entry[0]],i18n:{}};langs.forEach(function(l){var title=noticeText[l][entry[1]],amount=noticeAmounts[l][entry[1]];card.i18n[l]={title:title,aiBrief:amount+' · '+noticeAdvice[l],summary:title+'. '+amount+'. '+noticeAdvice[l]+' '+copy[l].fx,impact:noticeAdvice[l],sourceName:l==='ko'?'항공사 공식 공지':'Official airline notice',tags:[],links:[],faq:[]};});card.i18n.cn=card.i18n.zh;release.newsCards.unshift(card);});
  release.newsCards.forEach(function(card){card.updatedAt=stamp;});
  var updates={
    hormuz:{ko:['호르무즈 공개추적 3척…10일 평균 17척 하회','Kpler 공개 AIS 기반 commodity vessel 예비집계는 3척입니다. 10일 평균 17척보다 낮지만 전체 통항량은 아닙니다. AIS 비활성·dark route 선박은 누락될 수 있습니다.'],en:['Hormuz public tracking: three vessels versus 10-day average of 17','Preliminary Kpler public AIS commodity-vessel tracking shows three vessels. This is not total traffic; AIS-off and dark-route vessels may be missing.']},
    'oil-close':{ko:['Brent $104.82·WTI $101.91…고유가 속 단기 조정','9월 17일 미국시장 종가는 Brent $104.82, WTI $101.91입니다. Saudi Oman Sohar STS 확대와 East-West Pipeline 부분복구 기대가 공급위험을 일부 완충하지만 차질은 계속됩니다.'],en:['Brent $104.82 and WTI $101.91 ease from highs','At the Sept 17 U.S. close, Brent was $104.82 and WTI $101.91. Saudi Oman Sohar STS exports and partial pipeline repairs partly cushion risk, while disruption continues.']},
    'fx-spot':{ko:['원/달러 약 1,380.55원…11월 산정 초기 변수','현물 USD/KRW 약 1,380.55원은 10월 확정 평균환율 1,370.95원이 아닙니다. 9월 16일 시작한 11월 산정기간의 초기 환율 변수입니다.'],en:['Spot USD/KRW near 1,380.55 is an early November input','Spot USD/KRW near 1,380.55 is not the confirmed October period average of 1,370.95. It is an early input to November calculations.']},
    'bab-traffic':{ko:['Bab el-Mandeb 21척…호르무즈와 위험 구분 필요','Bab el-Mandeb 공개통항은 21척으로 전날 24척보다 줄었습니다. 군사위험은 있지만 호르무즈의 극심한 공개통항 감소와 동일한 수준의 운송차질로 보아서는 안 됩니다.'],en:['Bab el-Mandeb traffic 21 versus 24 previously','Publicly tracked Bab el-Mandeb traffic fell to 21 from 24. Military risk persists, but this should not be equated with the extreme Hormuz decline.']},
    'sohar-sts':{ko:['사우디 Oman Sohar STS 확대…공급차질 일부 완충','Saudi Arabia는 Oman Sohar에서 선박 간 환적을 통한 원유 우회수출을 확대하고 있습니다. East-West Pipeline은 부분복구를 추진 중이나 공급차질은 계속됩니다.'],en:['Saudi Oman Sohar STS partly cushions supply disruption','Saudi Arabia is expanding ship-to-ship crude exports through Oman Sohar. Partial restoration of the East-West Pipeline is being pursued, but disruption persists.']}
  };
  var marketTitles={
    hormuz:['호르무즈 공개추적 3척…10일 평균 17척 하회','Hormuz public tracking: 3 versus 10-day average of 17','ホルムズ公開追跡3隻・10日平均17隻を下回る','霍尔木兹公开追踪3艘，低于10日均值17艘','Hormuz: 3 navires suivis contre 17 en moyenne','Hormuz: 3 erfasste Schiffe gegen 17 im Zehntagesmittel'],
    'oil-close':['Brent $104.82·WTI $101.91…고유가 속 단기 조정','Brent $104.82 and WTI $101.91 ease from highs','Brent $104.82・WTI $101.91、高値から調整','Brent $104.82、WTI $101.91从高点回落','Brent $104.82 et WTI $101.91 corrigent','Brent $104.82 und WTI $101.91 korrigieren'],
    'fx-spot':['원/달러 약 1,380.55원…11월 산정 초기 변수','Spot USD/KRW near 1,380.55: early November input','USD/KRW約1,380.55、11月算定初期の変数','即期USD/KRW约1,380.55：11月初期变量','USD/KRW au comptant proche de 1 380,55','Spot-USD/KRW um 1.380,55 als November-Variable'],
    'bab-traffic':['Bab el-Mandeb 21척…호르무즈와 위험 구분','Bab el-Mandeb traffic 21 versus 24 previously','Bab el-Mandeb 21隻、前日24隻','曼德海峡21艘，前值24艘','Bab el-Mandeb: 21 navires contre 24','Bab el-Mandeb: 21 Schiffe nach 24'],
    'sohar-sts':['사우디 Oman Sohar STS 확대…공급차질 일부 완충','Saudi Oman Sohar STS partly cushions disruption','サウジのOman Sohar STS、供給障害を一部緩衝','沙特Oman Sohar STS部分缓冲供应中断','Le STS Saudi/Oman Sohar amortit partiellement','Saudi Oman Sohar STS puffert teilweise']
  };
  release.newsCards.forEach(function(card){var key=card.id.replace(/-20260917$/,'');var update=updates[key];if(!update)return;langs.forEach(function(l,i){var values=update[l],item=card.i18n[l];item.title=marketTitles[key][i];item.aiBrief=values?values[1].split('.')[0]+'.':copy[l].summary;item.summary=values?values[1]:key==='hormuz'?copy[l].hormuz:key==='sohar-sts'?copy[l].pipeline:key==='oil-close'?copy[l].jet:copy[l].fx;item.impact=copy[l].summary;});card.i18n.cn=card.i18n.zh;});
  var refreshed={
    'october-stage':'intro','fx-offset':'fx','global-jet':'jet'
  };
  release.newsCards.forEach(function(card){var key=card.id.replace(/-20260917$/,'');if(!refreshed[key])return;langs.forEach(function(l){var item=card.i18n[l];item.aiBrief=copy[l].summary;item.summary=copy[l][refreshed[key]];item.impact=copy[l].nov;});card.i18n.cn=card.i18n.zh;});
})();
