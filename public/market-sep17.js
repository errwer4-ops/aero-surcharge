(function(){
  'use strict';
  var base=window.AERO_MARKET_RELEASE;
  if(!base) return;
  var modified='2026-09-17T06:40:00+09:00', asOf='2026.09.17 06:40 KST';
  var locale={
    ko:{title:'2026년 10월 국제선 유류할증료 23단계 확정 및 11월 전망',news:'10월 유류할증료 확정·11월 전망 뉴스',status:'9월 21단계 현재 적용 · 10월 23단계 확정 · 11월 산정 시작',fact:'10월 확정',outlook:'11월 초기 전망',why:'왜 일부 노선은 내려갔나',notice:'10월 공식공시: 대한항공·아시아나·진에어·에어부산 확인. 나머지 항공사는 확인 대기.',pending:'10월 국제선 공지 확인 대기 · 9월 공지 링크 유지',link:'공식공지 ↗',intro:'2026년 10월 국제선 유류할증료는 23단계로 확정됐습니다. 8월 16일~9월 15일 Singapore Jet Fuel/MOPS 평균은 $158.57/bbl로 9월 $149.29보다 $9.28, 약 6.2% 높습니다. 하지만 평균 USD/KRW가 약 1,370.95원으로 낮아져 일부 대한항공 노선의 원화 금액은 내려갔습니다. 9월 30일까지는 9월 21단계가 적용됩니다. 11월 산정은 시작 단계이며 방향성 신뢰도는 낮습니다.',nov:'11월 산정기간은 9월 16일~10월 15일입니다. Global Jet Fuel $181.46(+6.1%)와 Hormuz 공개통항 4척은 초기 상방요인입니다. Oman Sohar STS 우회수출은 일부 완충하지만 정확한 단계는 예측하지 않습니다.',fx:'단계는 MOPS가 결정하고 원화 금액에는 산정기간 평균환율이 반영됩니다. 대한항공 도쿄·베이징 등은 66,000원에서 65,800원, 런던·파리·LA 등은 325,500원에서 322,000원으로 내려갔습니다. 현물 1,377.63원은 10월 확정값이 아닌 11월 변수입니다.'},
    en:{title:'October 2026 Fuel Surcharge Confirmed at Level 23 | November Outlook',news:'October confirmed surcharge and November outlook news',status:'September Level 21 applies now · October Level 23 confirmed · November calculation starts',fact:'October confirmed',outlook:'Early November outlook',why:'Why some route amounts fell',notice:'October official notices confirmed: Korean Air, Asiana, Jin Air and Air Busan. Other airlines await verification.',pending:'October international notice pending · September link retained',link:'Official notice ↗',intro:'The October 2026 international fuel surcharge is confirmed at Level 23. The Aug 16–Sept 15 Singapore Jet Fuel/MOPS average was $158.57/bbl, up $9.28 or about 6.2% from September’s $149.29. Yet average USD/KRW fell to about 1,370.95 and some Korean Air KRW route charges declined. September Level 21 still applies through Sept 30. The November calculation has only just begun, so confidence in an exact stage is low.',nov:'The November calculation window is Sept 16–Oct 15. Global Jet Fuel at $181.46 (+6.1%) and just four publicly tracked Hormuz commodity vessels are early upside risks. Oman Sohar ship-to-ship exports partly cushion supply; no exact stage is forecast.',fx:'MOPS determines the stage, while period-average FX converts USD amounts to KRW. Korean Air Tokyo/Beijing fell from KRW 66,000 to 65,800 and London/Paris/LA from 325,500 to 322,000. Spot USD/KRW 1,377.63 is a November variable, not part of confirmed October.'},
    ja:{title:'2026年10月国際線燃油サーチャージ23段階確定・11月見通し',news:'10月確定・11月見通しニュース',status:'9月21段階適用中 · 10月23段階確定 · 11月算定開始',fact:'10月確定',outlook:'11月初期見通し',why:'一部路線が値下がりした理由',notice:'10月公式公示確認: 大韓航空・アシアナ・ジンエアー・エアプサン。他社は確認待ち。',pending:'10月国際線公示確認待ち · 9月公示リンク保持',link:'公式公示 ↗',intro:'2026年10月国際線燃油サーチャージは23段階で確定。8/16～9/15のSingapore Jet Fuel/MOPS平均は$158.57/bblで9月$149.29より約6.2%高いです。一方、平均USD/KRWは約1,370.95となり大韓航空の一部KRW額は低下。9/30まで9月21段階を適用。11月算定は初期で正確な段階の信頼度は低いです。',nov:'11月算定期間は9/16～10/15。Global Jet Fuel $181.46（+6.1%）とホルムズ公開追跡4隻は上方要因。Oman SoharのSTS輸出は一部緩衝しますが段階は予測しません。',fx:'段階はMOPS、KRW額は期間平均為替で決まります。大韓航空の東京・北京などは66,000から65,800ウォン、ロンドン・パリ・LAなどは325,500から322,000ウォンに低下。直物1,377.63は11月変数です。'},
    zh:{title:'2026年10月国际线燃油附加费第23档确定及11月展望',news:'10月确定收费与11月展望新闻',status:'9月第21档现行 · 10月第23档确定 · 11月计算开始',fact:'10月确定',outlook:'11月初步展望',why:'部分航线为何降价',notice:'10月官方公告已确认: 大韩、韩亚、真航空、釜山航空。其他公司待核实。',pending:'10月国际线公告待核实 · 保留9月公告链接',link:'官方公告 ↗',intro:'2026年10月国际线燃油附加费确定为第23档。8月16日至9月15日Singapore Jet Fuel/MOPS平均$158.57/bbl，比9月$149.29高约6.2%。但平均USD/KRW降至约1,370.95，部分大韩航空韩元金额下降。9月30日前仍适用9月第21档。11月计算刚开始，准确档位可信度低。',nov:'11月计算期为9月16日至10月15日。Global Jet Fuel $181.46（+6.1%）及霍尔木兹公开追踪4艘形成初期上行风险。Oman Sohar STS出口部分缓冲供应，不预测具体档位。',fx:'MOPS决定档位，期间平均汇率影响韩元金额。大韩航空东京/北京等由66,000降至65,800韩元，伦敦/巴黎/洛杉矶等由325,500降至322,000韩元。即期1,377.63属于11月变量。'},
    fr:{title:'Surtaxe internationale octobre 2026 confirmée au niveau 23 | novembre',news:'Octobre confirmé et perspectives de novembre',status:'Septembre niveau 21 en vigueur · octobre niveau 23 confirmé · calcul novembre commencé',fact:'Octobre confirmé',outlook:'Première perspective novembre',why:'Pourquoi certaines lignes baissent',notice:'Avis octobre confirmés: Korean Air, Asiana, Jin Air, Air Busan. Autres compagnies à vérifier.',pending:'Avis international octobre à vérifier · lien septembre conservé',link:'Avis officiel ↗',intro:'La surtaxe internationale d’octobre 2026 est confirmée au niveau 23. La moyenne Singapore Jet Fuel/MOPS du 16 août au 15 septembre est $158.57/bbl, soit environ +6,2% par rapport à $149.29 en septembre. Pourtant le change moyen USD/KRW est tombé vers 1 370,95 et certains montants Korean Air en KRW baissent. Le niveau 21 de septembre s’applique jusqu’au 30 septembre. La prévision de novembre est très précoce.',nov:'La période novembre court du 16 septembre au 15 octobre. Jet Fuel mondial $181.46 (+6,1%) et quatre navires suivis à Hormuz créent une pression initiale. Les transferts STS à Oman Sohar amortissent partiellement; aucun niveau exact prévu.',fx:'MOPS fixe le niveau, le change moyen convertit le montant en KRW. Tokyo/Pékin chez Korean Air passe de 66 000 à 65 800 KRW et Londres/Paris/LA de 325 500 à 322 000. Le comptant 1 377,63 concerne novembre.'},
    de:{title:'Internationaler Oktober-2026-Zuschlag Stufe 23 bestätigt | November-Ausblick',news:'Oktober bestätigt und November-Ausblick',status:'September Stufe 21 gilt · Oktober Stufe 23 bestätigt · November-Berechnung begonnen',fact:'Oktober bestätigt',outlook:'Früher November-Ausblick',why:'Warum einige Strecken günstiger werden',notice:'Oktober-Hinweise bestätigt: Korean Air, Asiana, Jin Air, Air Busan. Andere Airlines noch zu prüfen.',pending:'Oktober-Internationalhinweis zu prüfen · September-Link bleibt',link:'Offizieller Hinweis ↗',intro:'Der internationale Oktober-Zuschlag 2026 ist mit Stufe 23 bestätigt. Das Singapore-Jet-Fuel/MOPS-Mittel vom 16. August bis 15. September beträgt $158.57/bbl, rund 6,2% über September $149.29. Der durchschnittliche USD/KRW sank jedoch auf etwa 1.370,95; einige Korean-Air-KRW-Beträge fielen. Bis 30. September gilt September Stufe 21. November ist erst am Beginn der Berechnung.',nov:'Der November-Zeitraum läuft vom 16. September bis 15. Oktober. Globales Jet Fuel $181.46 (+6,1%) und vier öffentlich verfolgte Hormuz-Schiffe erzeugen frühen Aufwärtsdruck. Oman-Sohar-STS puffert teilweise; keine genaue Stufe wird prognostiziert.',fx:'MOPS bestimmt die Stufe, Perioden-FX den KRW-Betrag. Korean Air Tokio/Peking sank von 66.000 auf 65.800 KRW, London/Paris/LA von 325.500 auf 322.000. Spot 1.377,63 ist eine November-Variable.'}
  };
  var labels={
    ko:['9월 21 → 10월 23 · +2단계','10월 확정 평균; $159.58는 9월 3일 단일 시장가격입니다.','10월 확정 평균','글로벌 주간평균은 Singapore MOPS와 다릅니다. Oman Sohar STS는 공급위험을 일부 완충합니다.','Kpler 공개 AIS 기반 commodity vessel 예비집계입니다. 전체 선박 통항이 아닙니다.','11월 산정은 9월 16일 시작됐으며 정확한 단계는 미정입니다.'],
    en:['September 21 → October 23 · +2 levels','Confirmed October average; $159.58 is a single Sept 3 market quote.','October confirmed average','Global weekly average is not Singapore MOPS. Oman Sohar STS partly cushions supply.','Kpler public AIS-based preliminary commodity-vessel count, not all shipping.','The November calculation began Sept 16; exact stage unknown.'],
    ja:['9月21 → 10月23 · +2段階','10月確定平均。$159.58は9月3日の単日市場値です。','10月確定平均','世界週平均はSingapore MOPSではありません。Oman Sohar STSは一部供給緩衝です。','Kpler公開AISによるcommodity vessel暫定集計で、全船舶ではありません。','11月算定は9月16日開始。正確な段階は未定です。'],
    zh:['9月21 → 10月23 · +2档','10月确定均值；$159.58为9月3日单一市场价格。','10月确定均值','全球周均值不是Singapore MOPS。Oman Sohar STS部分缓冲供应。','Kpler公开AIS商品船初步统计，并非全部船舶。','11月计算自9月16日开始，准确档位未定。'],
    fr:['Septembre 21 → octobre 23 · +2 niveaux','Moyenne octobre confirmée; $159.58 est un seul cours du 3 septembre.','Moyenne octobre confirmée','La moyenne mondiale hebdomadaire n’est pas Singapore MOPS. Oman Sohar STS amortit partiellement.','Décompte provisoire Kpler AIS des commodity vessels, pas tous les navires.','Le calcul novembre a commencé le 16 septembre; niveau exact inconnu.'],
    de:['September 21 → Oktober 23 · +2 Stufen','Bestätigtes Oktober-Mittel; $159.58 ist nur der Marktwert vom 3. September.','Bestätigtes Oktober-Mittel','Globales Wochenmittel ist nicht Singapore MOPS. Oman-Sohar-STS puffert teilweise.','Vorläufige öffentliche Kpler-AIS-Zählung von Rohstoffschiffen, nicht aller Schiffe.','November-Berechnung begann am 16. September; genaue Stufe offen.']
  };
  var rows={},packs={},overview={};
  Object.keys(locale).forEach(function(l){
    var t=locale[l], q=labels[l];
    rows[l]=[
      [t.fact,q[0],t.status],
      ['Singapore Jet Fuel / MOPS','$149.29 → $158.57/bbl (+$9.28; +6.2%) · 377.54¢/gal · 8/16–9/15',q[1]],
      ['USD/KRW',q[2]+' ~1,370.95 · spot ~1,377.63 · JPY100 ~881.80',t.fx],
      ['Global Jet Fuel / Brent / WTI','$181.46/bbl (+6.1%) · Brent $105.83 (-2.7%) · WTI $102.43 (-3.2%)',q[3]],
      ['Hormuz / Bab el-Mandeb','Hormuz 4 / 10-day avg 18 · VLCC 0 · LNG 0 · Bab el-Mandeb 22 / prior 24',q[4]]
    ];
    packs[l]=Object.assign({},base.packs[l],{
      title:t.title,meta:t.title,newsTitle:t.news,newsMeta:t.news+' | aero-surcharge.com',
      desc:t.intro,sub:asOf+' · '+t.status,newsSub:asOf+' · '+t.status,
      intro:t.intro,notice:'<strong>'+t.fact+':</strong> '+t.status,
      verdictTitle:t.outlook,verdict1:t.status,verdict2:t.nov,verdictLong:t.fx,
      indicator:t.fact+' / '+t.outlook,keyVars:rows[l].map(function(r){return r[0]+': '+r[1];}),
      officialTitle:t.fact+' · '+t.notice,officialNotice:asOf+' · '+t.notice,
      officialDesc:t.pending,forecastBtn:t.outlook+' →',foot:t.intro,
      faqTitle:'FAQ',faq:[
        {q:t.fact+'?',a:t.intro},{q:t.why+'?',a:t.fx},{q:t.outlook+'?',a:t.nov},
        {q:({ko:'Global Jet Fuel $181.46이 Singapore MOPS인가?',en:'Is Global Jet Fuel $181.46 Singapore MOPS?',ja:'Global Jet Fuel $181.46はSingapore MOPSですか?',zh:'Global Jet Fuel $181.46是Singapore MOPS吗?',fr:'Global Jet Fuel $181.46 est-il Singapore MOPS?',de:'Ist Global Jet Fuel $181.46 Singapore MOPS?'}[l]),a:q[3]}
      ]
    });
    overview[l]=[[t.fact,t.intro],[t.why,t.fx],[t.outlook,t.nov]];
  });
  var names={ko:['대한항공','아시아나항공','진에어','에어부산','티웨이항공','제주항공','이스타항공','에어서울','에어프레미아'],en:['Korean Air','Asiana Airlines','Jin Air','Air Busan','Tway Air','Jeju Air','Eastar Jet','Air Seoul','Air Premia']};
  var codes=['officialKe','officialOz','officialLj','officialBx','officialTw','official7c','officialZe','officialRs','officialYp'];
  var officialUrls={
    officialKe:'https://www.koreanair.com/contents/footer/customer-support/notice/2026/2610-infuel?pageNum=1',
    officialOz:'https://flyasiana.com/C/KR/KO/customer/notice/detail?id=CM202609160002530627',
    officialLj:'https://www.jinair.com/company/announce/announceView?anceSeq=28742&searchWord=&searchKey=titlCtn&page=1',
    officialBx:'https://www.airbusan.com/content/common/customercenter/noticeDetail?id=4407'
  };
  var amounts={ko:['10월 공식: KRW 49,000~362,600; 일부 노선 KRW 하락','10월 공식 공지 확인; 노선별 금액은 공식 원문 확인','10월 공식: 구간별 USD 32·46·74 등','10월 공식: USD 37·66·78·90'],en:['October official: KRW 49,000–362,600; some routes lower in KRW','October official notice confirmed; see route amounts at source','October official: USD 32, 46, 74 by distance','October official: USD 37, 66, 78, 90 by route']};
  var officialRows={};
  var pendingLabels={ko:'10월 공시 발표 전',en:'October notice not yet published',ja:'10月公示発表前',zh:'10月公告尚未发布',fr:'Avis d’octobre non encore publié',de:'Oktober-Mitteilung noch nicht veröffentlicht'};
  Object.keys(locale).forEach(function(l){var ko=l==='ko',n=names[ko?'ko':'en'],a=amounts[ko?'ko':'en'];officialRows[l]=codes.map(function(code,i){return [code,n[i],i<4?a[i]:pendingLabels[l]];});});
  var cards=[];
  var airlineCards=[
    ['officialKe',[
      ['대한항공 10월 국제선 유류할증료 공시','10월 금액은 49,000~362,600원입니다.','23단계 확정에도 평균 환율 영향으로 일부 노선의 원화 금액은 9월보다 낮아졌습니다. 도쿄·베이징 등은 66,000원에서 65,800원, 장거리 일부는 325,500원에서 322,000원입니다.','노선별 금액을 대한항공 공시에서 확인하세요.'],
      ['Korean Air publishes October international surcharge','October charges range from KRW 49,000 to 362,600.','Despite Level 23, some KRW amounts fell as the period-average exchange rate declined. Tokyo and Beijing routes move from KRW 66,000 to 65,800; some long-haul routes from 325,500 to 322,000.','Check the official route table.'],
      ['大韓航空、10月国際線燃油サーチャージを公示','10月の金額は49,000～362,600ウォンです。','23段階確定でも算定期間の平均為替により一部路線のウォン建て金額は9月より低下。東京・北京などは66,000から65,800ウォンです。','路線別金額は公式公示をご確認ください。'],
      ['大韩航空公布10月国际线燃油附加费','10月金额为49,000至362,600韩元。','虽然确定为第23档，但计算期平均汇率下降使部分航线韩元金额低于9月。东京、北京等由66,000降至65,800韩元。','请查阅官方航线表。'],
      ['Korean Air publie la surtaxe internationale d’octobre','Les montants vont de 49 000 à 362 600 KRW.','Malgré le niveau 23, certains montants en KRW baissent grâce au taux de change moyen. Tokyo et Pékin passent de 66 000 à 65 800 KRW.','Consultez le tableau officiel par ligne.'],
      ['Korean Air veröffentlicht den internationalen Oktober-Zuschlag','Die Beträge liegen zwischen 49.000 und 362.600 KRW.','Trotz Stufe 23 sinken einige KRW-Beträge wegen des durchschnittlichen Wechselkurses. Tokio und Peking fallen von 66.000 auf 65.800 KRW.','Prüfen Sie die offizielle Streckentabelle.']
    ]],
    ['officialOz',[
      ['아시아나항공 10월 국제선 유류할증료 공시','아시아나항공의 10월 공시가 발표됐습니다.','10월 발권분에 적용되는 노선별 금액은 공식 공지의 거리·구간 표에 따라 다릅니다. 9월 금액이나 23단계 수치만으로 실제 결제 금액을 단정하지 마세요.','탑승 노선의 공식 금액을 확인하세요.'],
      ['Asiana publishes October international surcharge','Asiana has issued its October notice.','The amount for tickets issued in October depends on the route and distance band in the official table. September charges and the Level 23 figure alone do not establish the fare.','Check your route in the official notice.'],
      ['アシアナ航空、10月国際線燃油サーチャージを公示','アシアナ航空の10月公示が発表されました。','10月発券分の金額は公式表の路線・距離区分によって異なります。9月の金額や23段階だけで実際の金額は決まりません。','対象路線を公式公示でご確認ください。'],
      ['韩亚航空公布10月国际线燃油附加费','韩亚航空已发布10月公告。','10月出票适用金额依官方公告中的航线和距离档而异。不能仅凭9月金额或第23档推断实际费用。','请核对官方公告中的航线。'],
      ['Asiana publie la surtaxe internationale d’octobre','L’avis d’octobre d’Asiana est publié.','Le montant des billets émis en octobre varie selon la ligne et la tranche de distance du tableau officiel. Le niveau 23 seul ne donne pas le prix final.','Vérifiez votre ligne dans l’avis officiel.'],
      ['Asiana veröffentlicht den internationalen Oktober-Zuschlag','Die Oktober-Mitteilung von Asiana ist veröffentlicht.','Der Betrag für im Oktober ausgestellte Tickets hängt von Strecke und Entfernungsgruppe der offiziellen Tabelle ab. Stufe 23 allein ergibt keinen Endbetrag.','Prüfen Sie Ihre Strecke in der Mitteilung.']
    ]],
    ['officialLj',[
      ['진에어 10월 국제선 유류할증료 공시','진에어의 10월 공시에는 구간별 USD 32·46·74 등이 제시됐습니다.','대표 거리 구간의 금액은 각각 1~599마일 USD 32, 600~1,199마일 USD 46, 1,200~1,799마일 USD 74입니다. 다른 구간과 실제 노선 금액은 공시 원문을 확인해야 합니다.','노선과 발권일에 맞는 구간을 확인하세요.'],
      ['Jin Air publishes October international surcharge','The October notice lists USD 32, 46 and 74 for sample distance bands.','The first three bands shown are 1–599 miles at USD 32, 600–1,199 at USD 46 and 1,200–1,799 at USD 74. Verify other bands and your actual route in the source.','Match your route to the official band.'],
      ['ジンエアー、10月国際線燃油サーチャージを公示','代表距離区分にUSD 32・46・74が示されました。','1～599マイルはUSD 32、600～1,199マイルはUSD 46、1,200～1,799マイルはUSD 74です。その他の区分は原文で確認してください。','公式表で路線区分をご確認ください。'],
      ['真航空公布10月国际线燃油附加费','示例距离档金额为32、46和74美元。','1至599英里为32美元，600至1,199英里为46美元，1,200至1,799英里为74美元。其他档位和实际航线以公告原文为准。','请核对官方距离档。'],
      ['Jin Air publie la surtaxe internationale d’octobre','Les premières tranches affichent 32, 46 et 74 USD.','Les tranches de 1 à 599, 600 à 1 199 et 1 200 à 1 799 miles coûtent respectivement 32, 46 et 74 USD. Consultez l’avis pour les autres lignes.','Vérifiez la tranche officielle de votre ligne.'],
      ['Jin Air veröffentlicht den internationalen Oktober-Zuschlag','Beispielhafte Entfernungsgruppen kosten 32, 46 und 74 USD.','Für 1–599, 600–1.199 und 1.200–1.799 Meilen nennt die Mitteilung 32, 46 und 74 USD. Weitere Gruppen stehen in der offiziellen Tabelle.','Prüfen Sie die Entfernungsgruppe Ihrer Strecke.']
    ]],
    ['officialBx',[
      ['에어부산 10월 국제선 유류할증료 공시','에어부산의 10월 공시에는 USD 37·66·78·90이 제시됐습니다.','공시의 대표 구간 금액은 9월 USD 34·60·71·82보다 각각 높습니다. 실제 적용 금액은 노선 구간과 발권 시점에 따라 공시 원문에서 확인해야 합니다.','탑승 노선의 해당 구간을 확인하세요.'],
      ['Air Busan publishes October international surcharge','The notice lists USD 37, 66, 78 and 90.','These sample October amounts exceed the corresponding September figures of USD 34, 60, 71 and 82. The actual charge depends on the route band and ticket date.','Check the band for your route.'],
      ['エアプサン、10月国際線燃油サーチャージを公示','代表区分の金額はUSD 37・66・78・90です。','対応する9月のUSD 34・60・71・82より高くなっています。実際の金額は路線区分と発券日を公式公示で確認してください。','対象路線の区分をご確認ください。'],
      ['釜山航空公布10月国际线燃油附加费','示例档位金额为37、66、78和90美元。','对应9月的34、60、71和82美元，均有所上升。实际费用取决于航线档位和出票日期，请以官方公告为准。','请核对所乘航线档位。'],
      ['Air Busan publie la surtaxe internationale d’octobre','Les montants exemples sont 37, 66, 78 et 90 USD.','Ils dépassent les montants correspondants de septembre, 34, 60, 71 et 82 USD. Le montant réel dépend de la ligne et de la date d’émission.','Vérifiez la tranche de votre ligne.'],
      ['Air Busan veröffentlicht den internationalen Oktober-Zuschlag','Beispielbeträge sind 37, 66, 78 und 90 USD.','Sie liegen über den entsprechenden September-Beträgen von 34, 60, 71 und 82 USD. Der tatsächliche Betrag hängt von Strecke und Ausstellungsdatum ab.','Prüfen Sie die passende Streckengruppe.']
    ]]
  ];
  var cardLangs=['ko','en','ja','zh','fr','de'];
  airlineCards.forEach(function(entry,index){var card={id:entry[0]+'-20260917',category:'airline',priority:index+1,date:'2026-09-17',updatedAt:modified,aiSummary:true,relevanceScore:1-index/100,sourceUrl:officialUrls[entry[0]],i18n:{}};cardLangs.forEach(function(l,i){var copy=entry[1][i];card.i18n[l]={title:copy[0],aiBrief:copy[1],summary:copy[2],impact:copy[3],sourceName:l==='ko'?'항공사 공식 공지':'Official airline notice',tags:[],links:[],faq:[]};});card.i18n.cn=card.i18n.zh;cards.push(card);});
  var stories=[
    ['october-stage',0,'https://www.koreanair.com/contents/footer/customer-support/notice/2026/2610-infuel?pageNum=1',
      ['10월 국제선 유류할증료 23단계 확정','October international surcharge confirmed at Level 23','10月国際線燃油サーチャージ23段階確定','10月国际线燃油附加费确定为第23档','Surtaxe internationale octobre confirmée au niveau 23','Internationaler Oktober-Zuschlag Stufe 23 bestätigt']],
    ['fx-offset',1,officialUrls.officialKe,['단계는 올랐는데 일부 노선은 더 싸졌다','Stage rose but some KRW routes became cheaper','段階上昇でも一部路線は値下がり','档位上升但部分航线韩元金额下降','Niveau en hausse mais certaines lignes moins chères','Stufe steigt, einige KRW-Strecken werden günstiger']],
    ['global-jet',2,'https://www.iata.org/en/publications/economics/fuel-monitor/',['글로벌 Jet Fuel $181.46…11월 초기 상방압력','Global Jet Fuel $181.46: early November upside','世界Jet Fuel $181.46、11月初期上方圧力','全球航油$181.46，11月初期上行风险','Jet Fuel mondial $181.46, risque haussier novembre','Globales Jet Fuel $181.46, früher November-Druck']],
    ['hormuz',3,'https://www.reuters.com/',['호르무즈 공개통항 4척…VLCC·LNG 0','Hormuz public traffic four; no VLCC or LNG tracked','ホルムズ公開通航4隻、VLCC・LNGゼロ','霍尔木兹公开通行4艘，VLCC和LNG为零','Hormuz: quatre navires suivis, aucun VLCC ni LNG','Hormuz: vier verfolgte Schiffe, kein VLCC oder LNG']],
    ['sohar-sts',4,'https://www.reuters.com/',['사우디, Oman Sohar STS로 원유 우회수출','Saudi expands crude exports via Oman Sohar STS','サウジ、Oman Sohar STSで原油迂回輸出','沙特经Oman Sohar STS扩大原油绕行出口','L’Arabie saoudite utilise le STS à Oman Sohar','Saudi-Arabien nutzt Oman-Sohar-STS für Rohölexport']],
    ['oil-close',5,'https://www.reuters.com/',['Brent $105.83·WTI $102.43…고점에서 조정','Brent $105.83 and WTI $102.43 retreat from highs','Brent $105.83・WTI $102.43、高値から調整','Brent $105.83、WTI $102.43从高点回落','Brent $105.83 et WTI $102.43 corrigent','Brent $105.83 und WTI $102.43 korrigieren']],
    ['fx-spot',6,'https://www.google.com/finance/quote/USD-KRW',['원/달러 약 1,377.63원…11월 변수','USD/KRW near 1,377.63 is a November input','USD/KRW約1,377.63は11月変数','USD/KRW约1,377.63属于11月变量','USD/KRW proche de 1 377,63 concerne novembre','USD/KRW um 1.377,63 gehört zu November']],
    ['bab-traffic',7,'https://www.reuters.com/',['Bab el-Mandeb 22척…호르무즈보다 통항 안정','Bab el-Mandeb 22 vessels, steadier than Hormuz','Bab el-Mandeb 22隻、ホルムズより安定','Bab el-Mandeb 22艘，比霍尔木兹更稳定','Bab el-Mandeb 22 navires, plus stable qu’Hormuz','Bab el-Mandeb 22 Schiffe, stabiler als Hormuz']]
  ];
  var langs=['ko','en','ja','zh','fr','de'];
  stories.forEach(function(s){var card={id:s[0]+'-20260917',category:s[1]<2?'airline':'market',priority:s[1]+1,date:'2026-09-17',updatedAt:modified,aiSummary:true,relevanceScore:1-s[1]/100,sourceUrl:s[2],i18n:{}};langs.forEach(function(l,i){var detail=s[1]===0?locale[l].intro:s[1]===1?locale[l].fx:s[1]===2?locale[l].nov:s[1]===3?rows[l][4][1]+'; '+rows[l][4][2]:s[1]===4?locale[l].nov:s[1]===5?rows[l][3][1]+'; '+rows[l][3][2]:s[1]===6?rows[l][2][1]+'; '+locale[l].fx:rows[l][4][1]+'; '+locale[l].nov;var brief=/^(ja|zh)$/.test(l)?detail.split('。')[0]+'。':(detail.match(/^.*?[.!?](?=\s|$)/)||[detail])[0];if(brief===detail)detail+=' '+labels[l][5];card.i18n[l]={title:s[3][i],aiBrief:brief,summary:detail,impact:labels[l][5],sourceName:s[1]<2?'Official airline notice':'Market reference',tags:[],links:[{href:'forecast.html',label:locale[l].outlook}],faq:[]};});card.i18n.cn=card.i18n.zh;cards.push(card);});
  var numbers=Object.assign({},base.numbers,{asOf:asOf,currentMonth:'2026-09',forecastTargetMonth:'2026-11',septemberLevel:21,octoberLevel:23,octoberMopsUsdPerBbl:158.57,octoberMopsCentsPerGal:377.54,octoberAverageUsdKrw:1370.95,novemberCalculationStatus:'started',globalJetFuelUsdPerBbl:181.46,globalJetFuelWeeklyPct:6.1,usdKrw:1377.63,jpy100Krw:881.80,brentUsdPerBbl:105.83,wtiUsdPerBbl:102.43,hormuzKplerCommodityVessels:4,hormuzTenDayAverage:18,hormuzVlcc:0,hormuzLng:0,babElMandebCommodityVessels:22,babElMandebPrevious:24});
  window.AERO_MARKET_RELEASE={numbers:numbers,rows:rows,packs:packs,overview:overview,officialRows:officialRows,officialUrls:officialUrls,newsCards:cards,sources:base.sources,modified:modified};
})();
