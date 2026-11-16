/* November 16, 09:00 KST release. The 161 preceding news objects remain intact. */
(function () {
  'use strict';
  var r = window.AERO_MARKET_RELEASE, n = window.AERO_MARKET_NUMBERS_20261116;
  if (!r || !n) return;
  var stamp = '2026-11-16T09:16:26.424+09:00';
  var urls = {
    stage:'https://mobile.newsis.com/view_amp.html?ar_id=NISX20261016_0003828757',
    jet:'https://commodityscope.com/prices/singapore-jet-kerosene',
    iata:'https://www.iata.org/en/publications/economics/fuel-monitor/',
    iataTable:'https://www.iata.org/contentassets/9036deaf9c984009a3515fd6aa1c5e24/fuel_price_analysis.jpg',
    fx:'https://view.asiae.co.kr/article/2026111315345800319',
    fxClose:'https://www.newsis.com/view/NISX20261113_0003867424',
    oil:'https://news.einfomax.co.kr/news/articleView.html?idxno=4444752',
    oilReuters:'https://www.marketscreener.com/news/oil-prices-set-for-second-weekly-decline-as-trump-sticks-with-iran-blockade-ce785ed9db81f121',
    inventory:'https://www.eia.gov/petroleum/supply/weekly/archive/2026/2026_11_12/download/table6.csv',
    inventoryLive:'https://ir.eia.gov/wpsr/table6.csv',
    inventoryReport:'https://www.eia.gov/petroleum/supply/weekly/archive/2026/2026_11_12/wpsr_2026_11_12.php',
    imo:'https://www.imo.org/en/mediacentre/hottopics/pages/middle-east-highlighted-incidents.aspx',
    traffic:'https://insights.windward.ai/',
    iea:'https://www.iea.org/reports/oil-market-report-november-2026',
    ukmto:'https://www.ukmto.org/-/media/ukmto/products/20261113-ukmto_vra_overview_u.pdf?rev=f163325bceb8457fa7f891c6c48dafa5',
    ukmtoDistribution:'https://x.com/UK_MTO/status/2121290471292977619',
    claim:'https://www.aol.com/articles/irans-navy-says-three-tankers-103107000.html',
    claimReuters:'https://www.reuters.com/world/middle-east/irans-navy-says-oil-tanker-fire-after-hitting-mine-hormuz-2026-11-14/',
    yp:'https://www.airpremia.com/a/ko/customer/notice/803'
  };
  var copy = {
    ko: {
      desc:'11월 16일 09:00 KST 기준 11월 유류할증료와 12월 전망. 산정기간 종료 후 공식 평균·단계·금액 확인을 기다리며, 혼조인 원유·환율과 과거 항공유 참고값·해상위험을 구분합니다.',
      expectation:'12월 예상: 방향 혼재·확정 공시 확인 대기',
      dec:'12월 산정기간인 10월 16일~11월 15일은 종료됐습니다. 이전 IATA 주간평균 하락과 원유·환율·해상위험이 엇갈려 방향 판단의 신뢰도는 낮습니다. 공식 MOPS 산정평균·기간 평균환율·단계·금액 및 새 한국발 국제선 공시는 이번 확인에서 확보하지 못했습니다. 인하나 특정 금액을 확정하지 않습니다.',
      fx:'11월 13일 서울 15:30 주간 종가는 1,336.7원/USD로 11월 12일보다 6.0원 올랐습니다. 아시아경제와 뉴시스 보도를 대조했습니다. 원화 환산 비용의 상방 요인이며 실시간·야간·NDF·산정기간 평균환율은 아닙니다. 항공사 공시액을 이 환율로 다시 계산하지 않습니다.',
      oil:'11월 13일 선물 정산은 Brent 2027년 1월물 95.84 USD/bbl(+0.02·+0.02%), WTI 2026년 12월물 88.56(-0.18·-0.20%)로 혼조입니다. 연합인포맥스의 월물·정산값을 Reuters 보도와 대조했으며 거래소 원표 직접 검증은 아닙니다. 일일 등락을 이전 사이트 기준일과의 차이로 계산하지 않으며, 원유는 항공유·공식 MOPS 평균과 별개입니다.',
      jet:'Singapore Jet 147.37 USD/bbl은 CommodityScope의 11월 11일 민간 FOB 평가로, 11월 10일보다 1.39달러 높았던 과거 참고값입니다. 11월 13일 작업에서 이미 열람했고 오늘 이력표를 재확인했습니다. 낮은 신뢰도의 민간 평가이며 Platts MOPS·실거래가가 아닙니다. 최신값의 09시 전 공개 근거는 없어 최신 확정값은 미확인입니다. 대한항공 발표의 11월 MOPS 173.89는 별도 9월 16일~10월 15일 평균입니다.',
      iata:'IATA/Platts의 11월 6일 종료 주간 세계 178.95 USD/bbl(-6.6%), 아시아·오세아니아 163.26(-6.0%)은 같은 과거 주간표를 재확인한 값입니다. 11월 13일 종료 주간값은 확보하지 못했습니다. 세계·지역 정유소 주간평균이며 싱가포르 일일 평가나 한국 항공사의 공식 MOPS 산정평균이 아닙니다.',
      imo:'IMO 134건·선원 사망 25명은 11월 11일 기준 목록을 11월 13일에 저장 확인한 과거 참고값입니다. 최신 변경 목록의 11월 16일 09시 이전 공개 근거를 확보하지 못해 최신 확정 누계는 미확인입니다. 중동 해역 누적 사건이며 호르무즈만의 집계·전수 통항·원유 유량이 아닙니다.',
      traffic:'Windward 11월 14일 판은 11월 12일 18:00~13일 18:00 UTC의 24시간에 화물선·유조선 통항 9회(진입 5·출항 4)를 관측했습니다. AIS 관측 0·AIS 미관측 분류 9이며 위성만으로 탐지한 2회는 이 9회에 포함됩니다. 업체 관측으로, AIS를 고의로 껐다는 증거·전수 통항·원유 b/d·안전 회복을 뜻하지 않습니다.',
      inventory:'EIA 11월 12일 주간보고서의 미국 등유형 항공유 재고는 11월 6일 종료 주 4,197.9만 배럴로, 10월 30일의 4,178.2만 배럴보다 19.7만 배럴 증가했습니다. 공식 보관 CSV와 현재 CSV가 일치합니다. 미국 재고량이며 생산량·정유 수율·세계 실시간 공급·공식 MOPS가 아닙니다.',
      iea:'IEA 11월 13일 석유시장보고서는 10월 세계 석유 공급을 1억 540만 b/d(전월 대비 +230만), 오만 제외 걸프 석유 수출을 1,840만 b/d로 제시합니다. 그중 원유 1,500만 b/d는 총수출에 포함됩니다. 과거 월간 공급·지역 수출이며 현재 호르무즈 통과량이나 해상안전 회복을 입증하지 않습니다. 정제품 수급 긴장과 선박 공격 위험도 남아 있습니다.',
      ukmto:'UKMTO 11월 13일 제작 주간보고서는 11월 5~11일 사건 8건(공격 7·권고 1)을 집계합니다. 13일 공식 배포글은 확인했으나 문서 최초 게시시각은 미제공입니다. 주간 사건 집계는 IMO 누계와 범위·방식이 다르며, 이후인 14일 이란 주장의 확인 근거가 아닙니다. 독립 확인이 어려운 혼합 통항 합계는 채택하지 않았습니다.',
      claim:'Reuters는 이란 해군·혁명수비대가 11월 14일 호르무즈에서 유조선 3척의 기뢰 피격·화재를 주장했다고 보도했습니다. Reuters는 이를 즉시 독립 확인하지 못했습니다. 선명·사상자·화물량·공급 손실은 미확인입니다. 확인된 사건 3건으로 단정하거나 IMO 누계에 더하지 않으며 해협 봉쇄·유량 감소를 추정하지 않습니다.',
      marine:'IMO 과거 134건·25명(11월 11일), 최신 미확인 | Windward 9회=진입 5+출항 4(11월 12일 18Z~13일 18Z)',
      basis:'산정기간은 종료됐지만 공식 평균은 미확인입니다. 이전 IATA 주간평균 하락과 11월 13일 원유 혼조만으로 12월 인하를 확정할 수 없습니다.',
      risk:'원/달러는 전일 대비 6.0원 상승했습니다. 해상 공격 위험이 지속되고 최신 항공유·IMO 누계의 기준시각 전 공개 여부도 미확인입니다.',
      note:'10월 16일~11월 15일 공식 MOPS·평균환율·단계·금액 확인 대기입니다. 서로 다른 날짜와 범위의 지표를 종합한 낮은 신뢰도의 판단이며 특정 단계·금액 예측이 아닙니다.',
      impacts:['방향 혼재·공시 확인 대기. 신뢰도 낮음, 단계·금액 미확정.','민간 평가는 과거 반등, IATA는 더 이른 주간 하락입니다. 최신 MOPS 평균은 아닙니다.','전일 대비 6.0원 상승은 환산 비용의 상방 요인입니다.','Brent 소폭 상승·WTI 하락으로 혼조입니다. 항공유 평균의 대용이 아닙니다.','IMO는 과거 참고입니다. 통항 9회와 별도 당사자 주장을 안전·유량으로 환산하지 않습니다.'],
      questions:['11월 단계와 항공사 금액은 어떤 근거인가요?','산정기간이 끝난 12월 유류할증료는 어떻게 예상하나요?','과거 Singapore Jet 평가와 IATA 주간평균은 공식 MOPS인가요?','1,336.7원은 언제의 환율인가요?','Brent·WTI는 어떤 계약의 정산값인가요?','IMO 사건 집계와 Windward 통항 관측의 범위는 무엇인가요?','EIA·IEA 수급자료와 UKMTO·이란 주장 보도는 어떻게 구분하나요?'],
      heads:['원/달러 1,336.7원: 11월 13일 주간 종가 6.0원 상승','Brent 95.84·WTI 88.56: 11월 13일 선물 정산 혼조','EIA: 11월 6일 주 미국 항공유 재고 4,197.9만 배럴','Windward: 11월 12~13일 24시간 통항 9회','IEA: 10월 세계 공급 1억 540만·걸프 수출 1,840만 b/d','UKMTO: 11월 5~11일 사건 8건, 공격 7·권고 1','Reuters: 이란의 유조선 3척 기뢰 피격 주장, 독립 미확인'],
      labels:['최종 수정','정보 기준','자료 발표·판본','사건·관측','최초 게시시각 미제공','세계','아시아·오세아니아','주간 종료','과거 참고'],
      tags:['시장 종가','선물 정산','미국 주간 재고','제공자 관측','월간 공급·수출','공식 주간 사건','당사자 주장']
    },
    en: {
      desc:'November surcharges and December outlook at November 16, 09:00 KST. The calculation period has ended; official averages, stage and amounts await verification amid mixed markets, dated jet references and maritime risks.',
      expectation:'December outlook: mixed signals; awaiting confirmed notices',
      dec:'The October 16–November 15 calculation period for December has ended. Earlier falling IATA weekly averages coexist with mixed crude, FX and maritime risks, leaving low confidence in direction. This check did not obtain official MOPS and period-average FX, a stage, amounts or a new Korea-origin international passenger notice. Neither a reduction nor a specific charge is confirmed.',
      fx:'Seoul’s November 13 daytime close at 15:30 was 1,336.7 KRW/USD, up 6.0 won from November 12. Asia Economy was checked against Newsis. This raises conversion-cost pressure; it is not a live, overnight, NDF or period-average rate. Published airline charges are not recalculated at this rate.',
      oil:'November 13 futures settlements were mixed: Brent January 2027 at 95.84 USD/bbl (+0.02; +0.02%), WTI December 2026 at 88.56 (-0.18; -0.20%). Yonhap Infomax’s contracts and settlements were checked against Reuters, not directly against exchange tables. Daily moves are not calculated against the site’s earlier reference date; crude is distinct from jet fuel and official MOPS averages.',
      jet:'Singapore Jet 147.37 USD/bbl is a historical CommodityScope private FOB assessment dated November 11, up 1.39 dollars from November 10. It was read during the November 13 run and rechecked in today’s history table. This low-confidence assessment is neither Platts MOPS nor a transaction price. Latest availability before 09:00 is unproven, so the latest confirmed value is unavailable. Korean Air’s November MOPS reference of 173.89 separately covers September 16–October 15.',
      iata:'The same historical IATA/Platts table for the week ending November 6 was rechecked: global 178.95 USD/bbl (-6.6%), Asia/Oceania 163.26 (-6.0%). The week ending November 13 was not obtained. These global and regional weekly refinery-price averages are neither daily Singapore assessments nor Korean airlines’ official MOPS average.',
      imo:'IMO’s 134 incidents and 25 seafarer fatalities are a historical reference from the list as at November 11, saved on November 13. Pre-cutoff availability of the latest changed list was not established for November 16, 09:00, so the latest confirmed total is unavailable. This is cumulative Middle East maritime reporting, not Hormuz-only incidents, total traffic or oil flow.',
      traffic:'Windward’s November 14 edition observes nine cargo-vessel and tanker crossings in the 24 hours from November 12, 18:00 to November 13, 18:00 UTC: five inbound and four outbound. Zero were AIS-visible; nine were classified as dark, including two detected by satellite only. Provider observations do not prove deliberate AIS disabling, exhaustive traffic, oil b/d or safe passage.',
      inventory:'EIA’s November 12 weekly report shows US kerosene-type jet fuel stocks of 41.979 million barrels for the week ending November 6, up 0.197 million from 41.782 million on October 30. Official archived and live CSVs agree. This is US inventory, not production, refinery yield, current global supply or official MOPS.',
      iea:'IEA’s November 13 Oil Market Report puts October global oil supply at 105.4 million b/d, up 2.3 million month on month, and Gulf oil exports excluding Oman at 18.4 million b/d. The crude component of 15 million b/d is included in that total. Past monthly supply and regional exports do not establish current Hormuz flow or maritime safety. Refined-product tightness and shipping-attack risks remain.',
      ukmto:'UKMTO’s weekly report produced November 13 records eight incidents during November 5–11: seven attacks and one advisory. An official November 13 distribution post was checked, but first publication time is unavailable. Its weekly scope and method differ from IMO’s cumulative total and cannot confirm Iran’s later November 14 claims. Mixed transit totals with unverifiable components were not adopted.',
      claim:'Reuters reports Iranian Navy/IRGC claims that three oil tankers hit mines and caught fire in Hormuz on November 14. Reuters could not immediately verify the reports independently. Vessel names, casualties, cargo volumes and supply losses are unknown. These are not three independently confirmed incidents; they are not added to IMO totals or used to infer closure or lost oil flow.',
      marine:'IMO historical: 134 incidents, 25 fatalities (Nov 11); latest unconfirmed | Windward: 9=5 inbound+4 outbound (Nov 12 18Z–Nov 13 18Z)',
      basis:'The calculation period has ended, but official averages remain unconfirmed. Earlier IATA weekly declines and mixed November 13 crude settlements cannot confirm a December reduction.',
      risk:'USD/KRW rose 6.0 won on the day. Maritime attack risks persist; pre-cutoff availability of the latest jet assessment and IMO total is also unverified.',
      note:'Official October 16–November 15 MOPS, average FX, stage and amounts await verification. This is a low-confidence assessment of indicators with different dates and scopes, not a specific stage or amount forecast.',
      impacts:['Mixed signals; awaiting notices. Low confidence, stage and amounts unconfirmed.','The private reference rose historically; IATA’s earlier weekly series fell. Neither is the latest official MOPS average.','The daily 6.0-won rise increases conversion-cost pressure.','Brent edged up while WTI fell. Mixed crude settlements do not replace jet averages.','IMO is historical. Nine observed crossings and separate party claims do not establish safety or oil flow.'],
      questions:['What supports November’s stage and airline amounts?','What is the December outlook now that its calculation period has ended?','Are the historical Singapore Jet reference and IATA averages official MOPS?','When was the 1,336.7 exchange rate observed?','Which contracts do the Brent and WTI settlements refer to?','What do the IMO incident count and Windward crossings cover?','How do EIA/IEA supply data differ from UKMTO reports and Iranian claims?'],
      heads:['USD/KRW 1,336.7: November 13 daytime close up 6.0 won','Brent 95.84; WTI 88.56: mixed November 13 settlements','EIA: US jet fuel stocks at 41.979 million barrels in week to November 6','Windward: nine crossings over 24 hours on November 12–13','IEA: October global supply 105.4m b/d; Gulf exports 18.4m b/d','UKMTO: eight incidents on November 5–11, seven attacks and one advisory','Reuters: Iranian claim of three tankers hitting mines remains unverified'],
      labels:['Modified','Information cutoff','Report / edition','Event / observation','First publication time unavailable','Global','Asia/Oceania','week ending','Historical reference'],
      tags:['Market close','Futures settlement','US weekly inventory','Provider observation','Monthly supply and exports','Official weekly incidents','Attributed party claim']
    },
    ja: {
      desc:'11月16日09:00 KST基準の11月燃油サーチャージと12月見通し。算定期間終了後も公式平均・段階・金額の確認待ち。原油・為替の混在、過去の航空燃料参考値と海上リスクを区別します。',
      expectation:'12月見通し：方向は混在・確定公示の確認待ち',
      dec:'12月の算定期間10月16日～11月15日は終了しました。以前のIATA週平均下落と原油・為替・海上リスクが交錯し、方向判断の信頼度は低いままです。今回の確認では公式MOPS算定平均・期間平均為替・段階・金額と、新たな韓国発国際線旅客公示を取得できていません。引下げや具体的金額は確定しません。',
      fx:'11月13日ソウル15:30の日中終値は1,336.7 KRW/USD、11月12日比6.0ウォン上昇です。アジア経済とNewsisを照合しました。換算費用の上昇要因ですが、リアルタイム・夜間・NDF・算定期間平均ではなく、公示額を再計算しません。',
      oil:'11月13日の先物清算値はBrent2027年1月限95.84 USD/bbl（+0.02・+0.02%）、WTI2026年12月限88.56（-0.18・-0.20%）とまちまちです。聯合インフォマックスの限月・清算値とReutersを照合し、取引所表の直接検証ではありません。日次変動をサイトの以前の基準日との差で計算せず、航空燃料・公式MOPS平均とも区別します。',
      jet:'Singapore Jet147.37 USD/bblはCommodityScopeの11月11日の民間FOB評価で、11月10日比1.39ドル高い過去参考値です。11月13日の作業で閲覧済みで、今日の履歴表とも照合しました。信頼度は低く、Platts MOPSや約定価格ではありません。最新値の09時以前の公開根拠がなく、最新確定値は未確認です。大韓航空発表の11月MOPS173.89は別の9月16日～10月15日平均です。',
      iata:'同じ過去のIATA/Platts表を再確認しました。11月6日終了週は世界178.95 USD/bbl（-6.6%）、アジア・オセアニア163.26（-6.0%）です。11月13日終了週は未取得です。世界・地域の製油所週平均で、シンガポール日次評価や韓国航空会社の公式MOPS平均ではありません。',
      imo:'IMO134件・船員死亡25人は、11月11日時点一覧を11月13日に保存確認した過去参考値です。変更後の最新一覧が11月16日09時以前に公開されていた根拠がなく、最新確定累計は未確認です。中東海域の累積事件で、ホルムズだけの集計・全通航・原油流量ではありません。',
      traffic:'Windward11月14日版は11月12日18:00～13日18:00 UTCの24時間に貨物船・タンカー通航9回（入航5・出航4）を観測しました。AIS観測0・AIS未観測分類9で、衛星のみの検出2回も9回に含まれます。民間観測であり、意図的なAIS停止・全通航・原油b/d・安全回復を示しません。',
      inventory:'EIA11月12日週報の米国ケロシン型航空燃料在庫は11月6日終了週4,197.9万バレルで、10月30日の4,178.2万から19.7万増加しました。公式保管CSVと現行CSVが一致します。米国在庫であり、生産量・製油所歩留まり・世界の現在供給・公式MOPSではありません。',
      iea:'IEA11月13日石油市場報告は10月世界石油供給を1億540万b/d（前月比+230万）、オマーンを除く湾岸石油輸出を1,840万b/dとしています。うち原油1,500万b/dは総輸出に含まれます。過去の月間供給・地域輸出で、現在のホルムズ流量や安全回復を示しません。石油製品の需給逼迫と船舶攻撃リスクも残ります。',
      ukmto:'11月13日作成のUKMTO週報は11月5～11日の事件8件（攻撃7・勧告1）を集計しています。13日の公式配布投稿は確認しましたが、文書の初回公開時刻は不明です。週次集計はIMO累計と範囲・方法が異なり、後日の14日のイラン主張を確認する資料ではありません。独立確認できない要素を含む混合通航数は採用していません。',
      claim:'Reutersはイラン海軍・革命防衛隊が11月14日にホルムズでタンカー3隻の機雷接触・火災を主張したと報じました。Reutersは直ちに独立確認できませんでした。船名・死傷者・貨物量・供給損失は未確認です。確認済み事件3件とはせず、IMO累計への加算や海峡封鎖・流量減少の推定には使いません。',
      marine:'IMO過去134件・死亡25人（11月11日）、最新未確認 | Windward9回=入航5+出航4（11月12日18Z～13日18Z）',
      basis:'算定期間は終了しましたが公式平均は未確認です。以前のIATA週平均下落と11月13日の原油まちまちの動きだけで12月引下げは確定できません。',
      risk:'USD/KRWは前日比6.0ウォン上昇しました。海上攻撃リスクが続き、最新航空燃料評価・IMO累計の基準時刻前の公開も未確認です。',
      note:'10月16日～11月15日の公式MOPS・平均為替・段階・金額は確認待ちです。日付と範囲の異なる指標に基づく低信頼度の判断で、特定の段階・金額予測ではありません。',
      impacts:['方向混在・公示確認待ち。信頼度は低く、段階・金額未確定。','民間評価は過去の反発、IATAはより前の週の下落。最新公式MOPS平均ではありません。','前日比6.0ウォン上昇は換算費用の上昇要因。','Brent小幅高・WTI安とまちまち。航空燃料平均の代用にはしません。','IMOは過去参考。通航9回や別の当事者主張を安全・流量へ換算しません。'],
      questions:['11月の段階と航空会社金額の根拠は何ですか？','算定期間終了後の12月サーチャージ見通しは？','過去のSingapore Jet評価とIATA週平均は公式MOPSですか？','1,336.7の為替はいつの値ですか？','Brent・WTIはどの限月の清算値ですか？','IMO事件集計とWindward通航観測の範囲は？','EIA・IEA需給資料とUKMTO・イラン主張報道はどう異なりますか？'],
      heads:['USD/KRW1,336.7：11月13日日中終値6.0ウォン上昇','Brent95.84・WTI88.56：11月13日清算値はまちまち','EIA：11月6日終了週の米国航空燃料在庫4,197.9万バレル','Windward：11月12～13日の24時間に通航9回','IEA：10月世界供給1億540万・湾岸輸出1,840万b/d','UKMTO：11月5～11日に事件8件、攻撃7・勧告1','Reuters：イランがタンカー3隻の機雷接触を主張、独立未確認'],
      labels:['最終編集','情報基準','資料発表・版','事件・観測','初回公表時刻不明','世界','アジア・オセアニア','週終了','過去参考'],
      tags:['市場終値','先物清算値','米国週間在庫','事業者観測','月間供給・輸出','公式週次事件','当事者の主張']
    },
    zh: {
      desc:'截至11月16日09:00 KST的11月燃油附加费与12月展望。计算期已结束，官方均价、档位及金额待确认；区分原油与汇率的混合信号、历史航油参考值和海上风险。',
      expectation:'12月展望：方向混合，等待确认正式公告',
      dec:'12月的计算期10月16日至11月15日已结束。此前IATA周均价下跌与原油、汇率、海上风险相互交织，方向判断置信度低。本次未取得官方MOPS计算均价、期间平均汇率、档位、金额或新的韩国出发国际客运公告。不能确认降费或具体金额。',
      fx:'11月13日首尔15:30日间收盘为1,336.7 KRW/USD，较11月12日上涨6.0韩元。已对照《亚洲经济》与Newsis报道。这增加韩元换算成本压力，但并非实时、夜间、NDF或计算期平均汇率，不据此重算航司公告金额。',
      oil:'11月13日期货结算涨跌不一：Brent2027年1月合约95.84 USD/bbl（+0.02、+0.02%），WTI2026年12月合约88.56（-0.18、-0.20%）。联合Infomax的合约与结算值已与Reuters对照，并非直接核验交易所原表。日变动不按网站此前参考日的差额计算；原油也不等于航油或官方MOPS均价。',
      jet:'Singapore Jet147.37 USD/bbl是CommodityScope11月11日私人FOB评估的历史参考值，较11月10日上涨1.39美元。11月13日工作时已查阅，今日再次核对历史表。置信度低，并非Platts MOPS或成交价。最新值在09时前公开的证据不足，故最新确认值未知。大韩航空公布的11月MOPS173.89另对应9月16日至10月15日均价。',
      iata:'再次核对的仍是IATA/Platts截至11月6日的历史周表：全球178.95 USD/bbl（-6.6%）、亚洲及大洋洲163.26（-6.0%）。未取得截至11月13日的周值。这是全球和地区炼厂周均价，不是新加坡日评估或韩国航司官方MOPS计算均价。',
      imo:'IMO134起、海员死亡25人是11月13日保存确认的截至11月11日清单历史参考值。未获得最新变更清单在11月16日09时前公开的证据，最新确认累计数未知。其范围是中东海域累计事件，并非仅霍尔木兹、全部通航或石油流量。',
      traffic:'Windward11月14日版在11月12日18:00至13日18:00 UTC的24小时内观测到货船及油轮通行9次：入港5、出港4。AIS可见0、AIS未观测类别9，其中仅由卫星探测的2次已计入9次。供应商观测不能证明故意关闭AIS、完整通航量、石油b/d或安全恢复。',
      inventory:'EIA11月12日周报显示，截至11月6日当周美国煤油型航空燃油库存为4,197.9万桶，较10月30日的4,178.2万桶增加19.7万桶。官方存档与当前CSV一致。这是美国库存，不是产量、炼厂收率、全球实时供应或官方MOPS。',
      iea:'IEA11月13日石油市场报告列出10月全球石油供应1亿540万b/d，环比增加230万；不含阿曼的海湾石油出口1,840万b/d，其中原油1,500万已包含于总数。历史月度供应和地区出口不等于当前霍尔木兹流量，也不证明海上安全恢复。成品油紧张和船舶袭击风险仍在。',
      ukmto:'UKMTO于11月13日制作的周报统计11月5至11日事件8起：袭击7、警示1。已核对13日官方分发帖，但文件首次发布时间未知。其周度范围与方法不同于IMO累计数，不能证实随后14日伊朗的主张。含无法独立核验部分的混合通航合计未被采用。',
      claim:'Reuters报道伊朗海军及革命卫队声称，11月14日霍尔木兹有3艘油轮触雷并起火。Reuters无法立即独立证实。船名、伤亡、货物量及供应损失未知。不将其定为3起已证实事件，不加进IMO累计数，也不推断海峡封锁或石油流量损失。',
      marine:'IMO历史134起、25人死亡（11月11日），最新未知 | Windward9次=入5+出4（11月12日18Z至13日18Z）',
      basis:'计算期已结束，官方均价仍待确认。此前IATA周均价下跌与11月13日原油涨跌不一，不能确认12月降费。',
      risk:'USD/KRW当日上涨6.0韩元。海上袭击风险持续，最新航油评估与IMO累计数在截止前是否公开也未确认。',
      note:'等待确认10月16日至11月15日官方MOPS、平均汇率、档位及金额。这是基于不同日期与范围指标的低置信度判断，并非具体档位或金额预测。',
      impacts:['方向混合，等待公告确认。置信度低，档位和金额未定。','私人评估的历史值反弹，IATA更早周值下跌；均不是最新官方MOPS均价。','当日上涨6.0韩元增加换算成本压力。','Brent小涨、WTI下跌，信号混合；不能替代航油均价。','IMO为历史参考。9次通航及另行归属的当事方主张不等于安全或流量。'],
      questions:['11月档位和各航司金额依据是什么？','计算期结束后如何判断12月燃油附加费？','历史Singapore Jet评估与IATA周均价是官方MOPS吗？','1,336.7汇率是什么时候的值？','Brent与WTI结算价对应哪些合约？','IMO事件与Windward通航的观测范围是什么？','EIA、IEA供需资料与UKMTO及伊朗主张报道有何区别？'],
      heads:['USD/KRW1,336.7：11月13日日间收盘上涨6.0韩元','Brent95.84、WTI88.56：11月13日期货结算涨跌不一','EIA：截至11月6日当周美国航油库存4,197.9万桶','Windward：11月12至13日24小时通航9次','IEA：10月全球供应1亿540万、海湾出口1,840万b/d','UKMTO：11月5至11日事件8起，袭击7、警示1','Reuters：伊朗称3艘油轮触雷，尚未独立证实'],
      labels:['修改时间','信息截止','资料发布／版本','事件／观测','首次发布时间未知','全球','亚洲及大洋洲','周截至','历史参考'],
      tags:['市场收盘','期货结算','美国周度库存','供应商观测','月度供应与出口','官方周度事件','当事方主张']
    },
    fr: {
      desc:'Surtaxes de novembre et perspectives de décembre au 16 novembre, 09:00 KST. Période de calcul terminée, moyennes officielles, niveau et montants à vérifier, avec marchés contrastés, références historiques de kérosène et risques maritimes.',
      expectation:'Décembre : signaux contrastés, annonces confirmées attendues',
      dec:'La période de calcul de décembre, du 16 octobre au 15 novembre, est terminée. Le recul des anciennes moyennes IATA coexiste avec des signaux contrastés du brut, du change et des risques maritimes : confiance faible. Cette vérification n’a pas permis d’obtenir le MOPS officiel, le change moyen, le niveau, les montants ou une nouvelle annonce internationale passagers au départ de Corée. Ni baisse ni montant précis ne sont confirmés.',
      fx:'La clôture diurne de Séoul du 13 novembre à 15:30 était de 1,336.7 KRW/USD, en hausse de 6.0 wons par rapport au 12 novembre. Asia Economy a été confronté à Newsis. Cela accroît les coûts de conversion ; ce n’est ni un taux en direct, nocturne, NDF ou moyen de la période. Les surtaxes publiées ne sont pas recalculées avec ce taux.',
      oil:'Règlements à terme contrastés le 13 novembre : Brent janvier 2027 à 95.84 USD/bbl (+0.02 ; +0.02 %), WTI décembre 2026 à 88.56 (-0.18 ; -0.20 %). Les échéances et règlements d’Infomax ont été confrontés à Reuters, sans contrôle direct des tables boursières. Les variations quotidiennes ne sont pas calculées depuis l’ancienne référence du site ; le brut reste distinct du kérosène et du MOPS officiel.',
      jet:'Singapore Jet 147.37 USD/bbl est une référence historique de l’évaluation FOB privée CommodityScope du 11 novembre, en hausse de 1.39 dollar sur le 10 novembre. Déjà consultée le 13 novembre, elle a été revérifiée dans l’historique actuel. Confiance faible : ni Platts MOPS ni prix de transaction. La disponibilité du dernier chiffre avant 09:00 n’est pas établie, donc la dernière valeur confirmée est inconnue. Le MOPS de novembre de Korean Air, 173.89, couvre séparément le 16 septembre–15 octobre.',
      iata:'Le même tableau historique IATA/Platts pour la semaine au 6 novembre a été revérifié : monde 178.95 USD/bbl (-6.6 %), Asie-Océanie 163.26 (-6.0 %). La semaine au 13 novembre n’a pas été obtenue. Moyennes hebdomadaires mondiales et régionales de raffinerie, pas évaluations quotidiennes de Singapour ni MOPS officiel des compagnies coréennes.',
      imo:'Les 134 incidents et 25 marins morts de l’OMI sont une référence historique de la liste au 11 novembre, enregistrée le 13 novembre. La disponibilité de la dernière liste modifiée avant le 16 novembre à 09:00 n’est pas établie ; le dernier total confirmé est inconnu. Il s’agit d’incidents cumulés au Moyen-Orient, pas seulement à Ormuz, ni de tout le trafic ou du débit pétrolier.',
      traffic:'L’édition Windward du 14 novembre observe neuf passages de cargos et pétroliers sur 24 heures, du 12 novembre à 18:00 au 13 novembre à 18:00 UTC : cinq entrants, quatre sortants. Zéro passage visible par AIS et neuf classés sans observation AIS, dont deux détectés uniquement par satellite, déjà compris dans les neuf. Cela ne prouve ni coupure volontaire de l’AIS, ni trafic exhaustif, débit pétrolier ou sécurité.',
      inventory:'Le rapport EIA du 12 novembre donne 41.979 millions de barils de stocks américains de carburéacteur de type kérosène pour la semaine au 6 novembre, soit +0.197 million depuis les 41.782 millions du 30 octobre. Les CSV officiels archivé et courant concordent. Il s’agit de stocks américains, pas de production, rendement de raffinerie, offre mondiale actuelle ou MOPS officiel.',
      iea:'Le rapport pétrolier AIE du 13 novembre situe l’offre mondiale d’octobre à 105.4 millions b/j, +2.3 millions sur un mois, et les exportations pétrolières du Golfe hors Oman à 18.4 millions b/j. Les 15 millions de brut sont inclus dans ce total. Ces données mensuelles passées ne mesurent pas le débit actuel d’Ormuz et ne prouvent pas sa sécurité. Tensions sur les produits raffinés et risques d’attaques persistent.',
      ukmto:'Le rapport hebdomadaire UKMTO produit le 13 novembre compte huit incidents du 5 au 11 novembre : sept attaques et un avis. La publication officielle de diffusion du 13 a été consultée, mais l’heure de première publication du document est inconnue. Son périmètre et sa méthode diffèrent du cumul OMI et ne confirment pas les affirmations iraniennes ultérieures du 14. Les totaux de passages mêlant des données non vérifiables n’ont pas été retenus.',
      claim:'Reuters rapporte que la marine iranienne et les Gardiens de la révolution affirment que trois pétroliers ont heurté des mines et pris feu à Ormuz le 14 novembre. Reuters n’a pas pu vérifier immédiatement ces informations. Noms, victimes, cargaisons et pertes d’offre sont inconnus. Ces trois événements ne sont pas indépendamment confirmés, ne sont pas ajoutés au total OMI et ne permettent pas de déduire une fermeture ou une perte de débit.',
      marine:'OMI historique : 134 incidents, 25 morts (11 nov.), dernier total inconnu | Windward : 9=5 entrants+4 sortants (12 nov. 18Z–13 nov. 18Z)',
      basis:'La période est terminée, les moyennes officielles restent inconnues. Le recul des anciennes moyennes IATA et les règlements contrastés du 13 novembre ne confirment pas une baisse en décembre.',
      risk:'USD/KRW a augmenté de 6.0 wons sur la journée. Les risques maritimes persistent ; la publication avant l’échéance du dernier kérosène et du total OMI reste non vérifiée.',
      note:'MOPS officiel, change moyen, niveau et montants du 16 octobre–15 novembre attendent vérification. Appréciation de faible confiance à partir de dates et périmètres différents, sans prévision de niveau ou montant précis.',
      impacts:['Signaux contrastés, annonces attendues. Confiance faible ; niveau et montants non confirmés.','La référence privée historique remonte ; l’ancienne semaine IATA recule. Ni l’une ni l’autre n’est le MOPS officiel actuel.','La hausse quotidienne de 6.0 wons accroît la pression des coûts de conversion.','Brent légèrement en hausse, WTI en baisse : signal contrasté, distinct du kérosène moyen.','OMI historique. Neuf passages et des affirmations distinctes ne mesurent ni sécurité ni flux pétrolier.'],
      questions:['Sur quoi reposent le niveau de novembre et les montants des compagnies ?','Quelles perspectives pour décembre après la fin de sa période de calcul ?','Les références historiques Singapore Jet et IATA sont-elles le MOPS officiel ?','Quand le taux de 1,336.7 a-t-il été observé ?','À quels contrats correspondent les règlements Brent et WTI ?','Que couvrent les incidents OMI et les passages Windward ?','Comment distinguer les données EIA/AIE des rapports UKMTO et des affirmations iraniennes ?'],
      heads:['USD/KRW 1,336.7 : clôture diurne du 13 novembre en hausse de 6.0 wons','Brent 95.84 ; WTI 88.56 : règlements contrastés le 13 novembre','EIA : stocks américains de kérosène à 41.979 millions de barils au 6 novembre','Windward : neuf passages sur 24 heures du 12 au 13 novembre','AIE : offre mondiale d’octobre à 105.4m b/j, exportations du Golfe à 18.4m','UKMTO : huit incidents du 5 au 11 novembre, sept attaques et un avis','Reuters : affirmation iranienne de trois pétroliers touchés par des mines, non vérifiée'],
      labels:['Modifié','Date limite des informations','Rapport / édition','Événement / observation','Heure de première publication inconnue','Monde','Asie-Océanie','semaine au','Référence historique'],
      tags:['Clôture de marché','Règlement à terme','Stocks américains hebdomadaires','Observation du fournisseur','Offre et exportations mensuelles','Incidents hebdomadaires officiels','Affirmation attribuée']
    },
    de: {
      desc:'November-Zuschläge und Dezember-Ausblick zum 16. November, 09:00 KST. Berechnungszeitraum beendet, offizielle Mittelwerte, Stufe und Beträge noch ungeprüft; gemischte Märkte, historische Kerosinwerte und maritime Risiken getrennt eingeordnet.',
      expectation:'Dezember: gemischte Signale, bestätigte Mitteilungen abwarten',
      dec:'Der Dezember-Berechnungszeitraum vom 16. Oktober bis 15. November ist beendet. Frühere sinkende IATA-Wochenmittel treffen auf gemischte Öl-, Wechselkurs- und maritime Signale; die Einschätzung bleibt unsicher. Bei dieser Prüfung wurden offizieller MOPS-Durchschnitt, Periodenwechselkurs, Stufe, Beträge und eine neue internationale Passagiermitteilung für Abflüge aus Korea nicht bestätigt. Weder Senkung noch konkreter Betrag sind sicher.',
      fx:'Seouler Tagesschluss am 13. November um 15:30: 1,336.7 KRW/USD, plus 6.0 Won gegenüber dem 12. November. Asia Economy wurde mit Newsis abgeglichen. Das erhöht den Umrechnungskostendruck; kein Echtzeit-, Nacht-, NDF- oder Periodenmittelkurs. Veröffentlichte Airline-Zuschläge werden damit nicht neu berechnet.',
      oil:'Gemischte Futures-Abrechnung am 13. November: Brent Januar 2027 bei 95.84 USD/bbl (+0.02; +0.02 %), WTI Dezember 2026 bei 88.56 (-0.18; -0.20 %). Infomax-Laufzeiten und Abrechnungen wurden mit Reuters abgeglichen, nicht direkt mit Börsentabellen. Tagesänderungen werden nicht aus dem früheren Referenzdatum der Website berechnet; Rohöl ist kein Kerosin- oder offizieller MOPS-Durchschnitt.',
      jet:'Singapore Jet 147.37 USD/bbl ist CommodityScopes historische private FOB-Bewertung vom 11. November, 1.39 Dollar über dem 10. November. Bereits am 13. November gelesen und heute in der Historie erneut geprüft. Geringes Vertrauen: weder Platts MOPS noch Transaktionspreis. Verfügbarkeit des neuesten Werts vor 09:00 ist unbelegt; der neueste bestätigte Wert bleibt unbekannt. Korean Airs November-MOPS 173.89 betrifft separat den 16. September–15. Oktober.',
      iata:'Dieselbe historische IATA/Platts-Tabelle für die Woche bis 6. November wurde erneut geprüft: weltweit 178.95 USD/bbl (-6.6 %), Asien/Ozeanien 163.26 (-6.0 %). Die Woche bis 13. November wurde nicht erhalten. Globale und regionale Raffinerie-Wochenmittel, keine täglichen Singapurbewertungen oder offiziellen MOPS-Mittel koreanischer Airlines.',
      imo:'134 IMO-Vorfälle und 25 getötete Seeleute sind eine historische Referenz der Liste mit Stand 11. November, gespeichert am 13. November. Die Verfügbarkeit der neuesten geänderten Liste vor dem 16. November um 09:00 ist nicht belegt; der neueste bestätigte Gesamtstand ist unbekannt. Kumulierte maritime Nahost-Vorfälle, weder nur Hormus noch Gesamtverkehr oder Ölfluss.',
      traffic:'Windwards Ausgabe vom 14. November erfasst neun Fracht- und Tankerpassagen in 24 Stunden vom 12. November, 18:00 bis 13. November, 18:00 UTC: fünf einwärts, vier auswärts. Null AIS-sichtbar, neun als nicht per AIS beobachtet eingestuft; die zwei nur per Satellit erkannten Passagen sind darin enthalten. Das belegt weder absichtliches Abschalten von AIS noch vollständigen Verkehr, Öl-b/d oder Sicherheit.',
      inventory:'EIAs Wochenbericht vom 12. November nennt US-Bestände an Kerosin-Flugturbinenkraftstoff von 41.979 Millionen Barrel für die Woche bis 6. November, plus 0.197 Millionen gegenüber 41.782 Millionen am 30. Oktober. Offizielle archivierte und aktuelle CSV stimmen überein. US-Lagerbestand, keine Förderung, Raffinerieausbeute, aktuelle globale Versorgung oder offizielles MOPS.',
      iea:'IEAs Ölmarktbericht vom 13. November nennt für Oktober ein weltweites Ölangebot von 105.4 Millionen b/d, plus 2.3 Millionen zum Vormonat, und Golf-Ölexporte ohne Oman von 18.4 Millionen b/d. Die 15 Millionen Rohöl sind Teil dieser Summe. Vergangene Monatsversorgung und regionale Exporte sind kein aktueller Hormus-Durchfluss oder Sicherheitsnachweis. Engpässe bei Raffinerieprodukten und Angriffsrisiken bestehen fort.',
      ukmto:'Der am 13. November erstellte UKMTO-Wochenbericht zählt acht Vorfälle vom 5.–11. November: sieben Angriffe und eine Warnmeldung. Der offizielle Verteilungspost vom 13. wurde geprüft, die erste Dokumentveröffentlichung ist zeitlich unbekannt. Wochenumfang und Methode unterscheiden sich vom IMO-Gesamtstand und bestätigen keine späteren iranischen Behauptungen vom 14. Gemischte Verkehrssummen mit ungeprüften Bestandteilen wurden nicht übernommen.',
      claim:'Reuters berichtet, dass Irans Marine und Revolutionsgarden für den 14. November Minentreffer und Brände auf drei Öltankern in Hormus behaupten. Reuters konnte die Meldungen nicht unmittelbar unabhängig prüfen. Schiffsnamen, Opfer, Ladungsmengen und Angebotsverluste sind unbekannt. Keine drei unabhängig bestätigten Vorfälle: keine Addition zum IMO-Stand und keine Ableitung einer Sperre oder verlorenen Ölmenge.',
      marine:'IMO historisch: 134 Vorfälle, 25 Tote (11. Nov.), neuester Stand unbekannt | Windward: 9=5 einwärts+4 auswärts (12. Nov. 18Z–13. Nov. 18Z)',
      basis:'Der Berechnungszeitraum ist beendet, offizielle Mittelwerte bleiben unbestätigt. Frühere IATA-Rückgänge und gemischte Öl-Abrechnungen vom 13. November bestätigen keine Dezember-Senkung.',
      risk:'USD/KRW stieg am Tag um 6.0 Won. Maritime Angriffsrisiken bleiben; die Veröffentlichung der neuesten Kerosinbewertung und IMO-Summe vor dem Stichtag ist ebenfalls ungeprüft.',
      note:'Offizieller MOPS, Durchschnittswechselkurs, Stufe und Beträge für den 16. Oktober–15. November warten auf Bestätigung. Unsichere Einschätzung unterschiedlich datierter und abgegrenzter Indikatoren, keine konkrete Stufen- oder Betragsprognose.',
      impacts:['Gemischte Signale, Mitteilungen abwarten. Geringe Sicherheit; Stufe und Beträge unbestätigt.','Die private historische Bewertung stieg, die frühere IATA-Woche fiel. Kein aktuelles offizielles MOPS-Mittel.','Der Tagesanstieg um 6.0 Won erhöht den Umrechnungskostendruck.','Brent leicht höher, WTI niedriger: gemischt, kein Ersatz für Kerosinmittel.','IMO ist historisch. Neun Passagen und getrennte Parteibehauptungen belegen weder Sicherheit noch Ölfluss.'],
      questions:['Worauf beruhen November-Stufe und Beträge der Airlines?','Wie ist der Dezember-Ausblick nach Ende des Berechnungszeitraums?','Sind historische Singapore-Jet- und IATA-Werte offizielles MOPS?','Wann wurde der Wechselkurs 1,336.7 beobachtet?','Welche Kontrakte betreffen die Brent- und WTI-Abrechnungen?','Was erfassen IMO-Vorfälle und Windward-Passagen?','Wie unterscheiden sich EIA-/IEA-Daten von UKMTO-Berichten und iranischen Behauptungen?'],
      heads:['USD/KRW 1,336.7: Tagesschluss am 13. November steigt um 6.0 Won','Brent 95.84; WTI 88.56: gemischte Abrechnung am 13. November','EIA: US-Kerosinbestand 41.979 Millionen Barrel in der Woche bis 6. November','Windward: neun Passagen in 24 Stunden am 12.–13. November','IEA: Oktober-Weltangebot 105.4 Mio. b/d, Golfexporte 18.4 Mio. b/d','UKMTO: acht Vorfälle am 5.–11. November, sieben Angriffe und eine Warnung','Reuters: Irans Behauptung über drei Minentreffer auf Tanker bleibt ungeprüft'],
      labels:['Geändert','Informationsstand','Bericht / Ausgabe','Ereignis / Beobachtung','Erste Veröffentlichungszeit unbekannt','Welt','Asien/Ozeanien','Woche bis','Historische Referenz'],
      tags:['Marktschluss','Futures-Abrechnung','Wöchentliche US-Bestände','Anbieterbeobachtung','Monatliches Angebot und Exporte','Offizielle Wochenvorfälle','Zugeschriebene Behauptung']
    }
  };

  r.modified = stamp; r.asOf = n.asOf; r.numbers = n;
  // The existing footnote renderer relies on the first two sources in this order.
  r.sources = [
    ['NEWSIS / Korean Air · November reference, September 16–October 15 average', urls.stage],
    ['CommodityScope · historical November 11 private FOB assessment; latest at cutoff unverified', urls.jet],
    ['IATA / Platts · unchanged historical week ending November 6', urls.iata],
    ['IATA / Platts · global and regional weekly refinery-price table', urls.iataTable],
    ['Asia Economy · November 13 Seoul 15:30 close', urls.fx],
    ['NEWSIS · November 13 daytime-close corroboration', urls.fxClose],
    ['Yonhap Infomax · November 13 futures settlements and contract months', urls.oil],
    ['Reuters / MarketScreener · settlement corroboration; initial timestamp is not final-settlement publication', urls.oilReuters],
    ['EIA · November 12 report, US jet stocks for week ending November 6', urls.inventory],
    ['EIA · weekly report release page', urls.inventoryReport],
    ['IMO · historical 134 / 25 as at November 11, saved November 13; latest cutoff total unknown', urls.imo],
    ['Windward · November 14 edition, November 12 18Z–November 13 18Z observations', urls.traffic],
    ['IEA · November 13 Oil Market Report, October supply and regional exports', urls.iea],
    ['UKMTO · document produced November 13, incidents November 5–11; first publication clock unknown', urls.ukmto],
    ['Reuters / AOL · November 14 Iranian claim, not independently confirmed', urls.claim],
    ['Air Premia · notice 803, Ningbo payment condition effective November 6', urls.yp]
  ];
  Object.keys(copy).forEach(function (lang) {
    var p = r.packs[lang], c = copy[lang], labels = c.labels;
    if (!p) return;
    var nov = p.faq[0].a, names = p.rows.map(function (row) { return row[0]; });
    var update = labels[0] + ': ' + stamp + ' · ' + labels[1] + ': ' + n.asOf;
    var jetValue = 'MOPS 173.89 (2026-09-16–10-15) | ' + labels[8] + ': Singapore Jet 147.37 (2026-11-11) | IATA ' + labels[5] + ' 178.95 / ' + labels[6] + ' 163.26 (' + labels[7] + ' 2026-11-06) USD/bbl';
    var rows = [
      [names[0], p.status, c.dec],
      [names[1], jetValue, c.jet + ' ' + c.iata],
      [names[2], '1,336.7 KRW/USD (2026-11-13 15:30 KST; +6.0)', c.fx],
      [names[3], 'Brent 95.84 (2027-01) / WTI 88.56 (2026-12) USD/bbl · 2026-11-13', c.oil],
      [names[4], c.marine, c.imo + ' ' + c.traffic]
    ];
    var context = c.inventory + ' ' + c.iea + ' ' + c.ukmto + ' ' + c.claim;
    var answers = [nov, c.dec, c.jet + ' ' + c.iata, c.fx, c.oil, c.imo + ' ' + c.traffic, context];
    Object.assign(p, {
      desc:c.desc, sub:update + ' · ' + c.dec, newsSub:update + ' · ' + p.status,
      updated:update, updatedLabel:labels[0], intro:p.status + ' ' + c.dec, rows:rows,
      summary:[p.status, c.dec, rows[1][1], rows[2][1], rows[3][1], c.marine],
      foot:c.jet + ' ' + c.iata + ' ' + nov, basisBody:nov + ' ' + c.jet + ' ' + c.iata,
      verdict1:c.dec, verdict2:c.fx, verdictLong:context, note:c.dec,
      officialNotice:update + ' · ' + p.status,
      keyVars:[p.status, rows[1][1], rows[2][1], rows[3][1], c.marine],
      faq:c.questions.map(function (q, i) { return {q:q, a:answers[i]}; })
    });
    var overview = p.forecastOverview;
    p.forecastOverview = Object.assign({}, overview, {
      modifiedAt:stamp, informationCutoff:n.informationCutoff,
      expectation:c.expectation, question:c.questions[1], basis:c.basis, risk:c.risk, note:c.note,
      rows:[
        [overview.rows[0][0], c.expectation, c.impacts[0]],
        [names[1], rows[1][1], c.impacts[1]],
        [names[2], rows[2][1], c.impacts[2]],
        [names[3], rows[3][1], c.impacts[3]],
        [names[4], c.marine, c.impacts[4]]
      ], rowTones:['hold', 'hold', 'up', 'hold', 'up']
    });
    r.rows[lang] = rows;
    p.surface = Object.assign({}, p.surface, {
      'fore.pageSub':p.sub, 'fore.intro':p.intro, 'fore.summary.updated':update,
      'fore.indicator.footnote':p.foot, 'fore.verdict.line1':p.verdict1,
      'fore.verdict.line2':p.verdict2, 'fore.verdict.long':p.verdictLong,
      'fore.basis.body':p.basisBody, 'fore.predict.footnote':p.foot, 'fore.aiNotice':c.dec,
      'news.pageSub':p.newsSub, 'news.note':c.dec, 'news.surchargeNote':c.dec,
      'news.dataRef':p.sub, 'news.decisionShort':p.status + ' · ' + c.dec,
      'news.decisionLine1':c.dec, 'news.decisionLine2':c.fx,
      'news.forecastCta.desc':p.intro, 'news.summary.updated':update,
      'news.officialNotice':p.officialNotice, 'news.basisBody':p.foot
    });
  });
  var definitions = [
    {key:'fx', name:'Asia Economy / NEWSIS', url:urls.fx, published:'2026-11-13T15:34:58+09:00', updated:'2026-11-13T15:34:58+09:00', event:'2026-11-13T15:30:00+09:00', checked:'2026-11-16T00:05:04.463Z', citations:[urls.fx, urls.fxClose], status:'published_reports_of_Seoul_1530_daytime_close'},
    {key:'oil', name:'Yonhap Infomax / Reuters', url:urls.oil, published:'2026-11-14T07:07:23+09:00', updated:null, event:'2026-11-13', checked:'2026-11-16T00:05:49.219Z', citations:[urls.oil, urls.oilReuters], status:'reported_futures_settlements_and_contract_months_not_direct_exchange_table'},
    {key:'inventory', name:'EIA', url:urls.inventory, published:null, updated:null, reported:'2026-11-12', event:'2026-11-06', checked:'2026-11-16T00:05:06.374Z', lastModified:'2026-11-12T17:55:04Z', citations:[urls.inventory, urls.inventoryLive, urls.inventoryReport], status:'official_US_weekly_jet_inventory_archived_and_live_CSV_match_prior_observation'},
    {key:'traffic', name:'Windward', url:urls.traffic, published:null, updated:null, reported:'2026-11-14', event:'2026-11-13', checked:'2026-11-16T00:05:06.274Z', lastModified:'2026-11-13T21:41:58Z', status:'provider_observed_24_hour_crossings_not_exhaustive_traffic_or_oil_flow'},
    {key:'iea', name:'IEA', url:urls.iea, published:null, updated:null, reported:'2026-11-13', event:null, checked:null, status:'official_monthly_report_text_observed_through_web_date_published_exact_clock_unavailable'},
    {key:'ukmto', name:'UKMTO', url:urls.ukmto, published:null, updated:null, reported:'2026-11-13', event:null, checked:null, status:'official_weekly_report_text_and_distribution_post_first_document_publication_clock_unknown'},
    {key:'claim', name:'Reuters / AOL', url:urls.claim, published:'2026-11-14T10:31:07Z', updated:'2026-11-14T22:54:12Z', event:null, checked:'2026-11-16T00:05:48.904Z', citations:[urls.claim, urls.claimReuters], status:'attributed_Iranian_naval_claim_not_independently_verified'}
  ];
  var cards = definitions.map(function (def, i) {
    var card = {
      id:'market-20261116-' + (i + 1), category:[0,1,3].indexOf(i) >= 0 ? 'market' : 'institution', priority:i + 1,
      date:'2026-11-16', dateKind:'site_update', publishedAt:stamp, updatedAt:stamp,
      informationCutoff:n.informationCutoff, reportedDate:def.published || def.reported || null,
      sourcePublishedAt:def.published, sourceUpdatedAt:def.updated, eventDate:def.event,
      sourceVerifiedAt:def.checked, sourceUrl:def.url, citationUrls:def.citations || [def.url],
      sourceVerificationStatus:def.status, badge:'NEW', aiSummary:true, relevanceScore:1 - i / 100, i18n:{}
    };
    if (def.reported) card.sourceReleaseDate = def.reported;
    if (def.lastModified) card.sourceLastModifiedAt = def.lastModified;
    if (!def.published) card.sourcePublicationNote = 'First publication clock is unavailable. Report, production, distribution, observation and retrieval dates are separate; Last-Modified is not first publication.';
    if (def.key === 'fx') {
      card.comparisonDate = '2026-11-12';
      card.corroboratingSourcePublishedAt = '2026-11-13T15:33:59+09:00';
      card.corroboratingSourceUpdatedAt = null;
    }
    if (def.key === 'oil') {
      card.brentContractMonth = '2027-01'; card.wtiContractMonth = '2026-12';
      card.sourceUpdatedMinute = '2026-11-14T07:08+09:00';
      card.sourceUpdatePrecision = 'minute_only';
      card.corroboratingVisibleUpdatedMinute = '2026-11-13T16:02-05:00';
      card.corroboratingInitialTimestampIsSettlementEvidence = false;
    }
    if (def.key === 'inventory') {
      card.observationDate = '2026-11-06'; card.previousObservationDate = '2026-10-30';
      card.sourcePreviouslyObservedAt = '2026-11-13T08:57:37.209+09:00';
      card.sourceScheduledAt = '2026-11-12T12:00:00-05:00';
      card.scheduledTimeIsNotActualPublication = true;
      card.stockScope = 'US_kerosene_type_jet_fuel_inventory_not_production_or_refinery_yield';
    }
    if (def.key === 'traffic') {
      card.observationDate = '2026-11-13';
      card.observationStart = '2026-11-12T18:00:00Z'; card.observationEnd = '2026-11-13T18:00:00Z';
      card.observationHours = 24; card.observationStartBasis = n.windwardObservationWindowStartBasis;
      card.observationBoundariesExplicitInSource = true;
      card.satelliteOnlyDetectionsIncludedInTotal = true;
    }
    if (def.key === 'iea' || def.key === 'ukmto') {
      card.sourceVerificationWindow = {start:'2026-11-16T09:07:31+09:00', end:'2026-11-16T09:07:33+09:00'};
      card.sourceAccess = 'official_text_read_through_web_separate_direct_HTTP_403_not_successful_read';
    }
    if (def.key === 'iea') {
      card.sourcePublishedDate = '2026-11-13'; card.observationPeriod = '2026-10';
      card.supplyScope = 'monthly_global_oil_supply_and_Gulf_exports_excluding_Oman_not_current_Hormuz_flow';
      card.crudeExportsIncludedInTotal = true;
    }
    if (def.key === 'ukmto') {
      card.documentProducedDate = '2026-11-13'; card.sourceReleaseDateKind = 'document_production_date_not_first_publication';
      card.observationStart = '2026-11-05'; card.observationEnd = '2026-11-11';
      card.observationPeriod = '2026-11-05/2026-11-11'; card.observationTimeOfDay = null;
      card.officialDistributionAt = '2026-11-13T17:13:00Z'; card.officialDistributionTimePrecision = 'minute';
      card.officialDistributionUrl = urls.ukmtoDistribution;
      card.officialDistributionReadVia = 'https://nitter.cf/UK_MTO/status/2121290471292977619';
      card.sourceAvailabilityEvidence = 'document_produced_Nov13_and_official_distribution_post_read_via_public_mirror_not_first_publication_time';
      card.mixedTransitTotalsAdopted = false;
    }
    if (def.key === 'claim') {
      card.eventDateIsClaimed = true; card.claimedEventDate = '2026-11-14';
      card.claimedVessels = 3; card.independentlyVerified = false;
      card.vesselNames = null; card.casualties = null; card.cargoVolumes = null; card.supplyDisruptionBarrelsPerDay = null;
      card.relationshipToOtherIncidents = 'not_established_no_addition_to_IMO_or_UKMTO';
    }
    Object.keys(copy).forEach(function (lang) {
      var c = copy[lang], labels = c.labels;
      var dates = labels[2] + ': ' + (card.reportedDate || labels[4]) + '. ';
      if (!def.published && card.reportedDate) dates += labels[4] + '. ';
      if (def.event && def.key !== 'claim') dates += labels[3] + ': ' + def.event + '. ';
      card.i18n[lang] = {
        title:c.heads[i], aiBrief:c.heads[i], summary:dates + c[def.key], impact:c.dec,
        sourceName:def.name, sourceRefs:card.citationUrls.map(function (url) {
          return {name:url === urls.fxClose ? 'NEWSIS' : url === urls.oilReuters ? 'Reuters / MarketScreener' : url === urls.claimReuters ? 'Reuters' : def.name, url:url};
        }), tags:[c.tags[i]], links:[], faq:[]
      };
    });
    card.i18n.cn = card.i18n.zh;
    return card;
  });
  r.newsCards = cards.concat(r.newsCards.filter(function (card) { return !/^market-20261116-/.test(card.id); }));
  window.AERO_MARKET_RELEASE = r;
  window.AERO_MARKET_NUMBERS_LATEST = n;
  if (typeof window.AeroApplyNovemberNoticePeriod20261110 === 'function') window.AeroApplyNovemberNoticePeriod20261110();
})();
