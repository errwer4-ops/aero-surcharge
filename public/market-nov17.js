/* November 17 09:00 KST evidence. Original news and dated snapshots remain intact. */
(function(){
"use strict";
var r=window.AERO_MARKET_RELEASE,n=window.AERO_MARKET_NUMBERS_20261117;if(!r||!n)return;
var stamp="2026-11-17T00:15:47.484Z";
var urls={
  "stage": "https://mobile.newsis.com/view_amp.html?ar_id=NISX20261016_0003828757",
  "jet": "https://commodityscope.com/prices/singapore-jet-kerosene",
  "iata": "https://www.iata.org/en/publications/economics/fuel-monitor/",
  "iataTable": "https://www.iata.org/contentassets/9036deaf9c984009a3515fd6aa1c5e24/fuel_price_analysis.jpg",
  "fx": "https://www.newsis.com/view/NISX20261116_0003870079",
  "fxMore": "https://www.news1.kr/finance/market-exr/6355567",
  "oil": "https://news.einfomax.co.kr/news/articleView.html?idxno=4445052",
  "oilMore": "https://www.newsis.com/view/NISX20261117_0003870633",
  "mops": "https://www.newsis.com/view/NISX20261116_0003869952",
  "mopsMore": "https://www.fnnews.com/news/202611161506121925",
  "imo": "https://www.imo.org/en/mediacentre/hottopics/pages/middle-east-highlighted-incidents.aspx",
  "traffic": "https://insights.windward.ai/",
  "ukmto": "https://www.ukmto.org/-/media/ukmto/products/20261116-ukmto_warning_207-26.pdf?rev=b7a05cc809114a4c9bb82eb10734d893",
  "ukmto208": "https://www.ukmto.org/-/media/ukmto/products/20261116-ukmto_warning_208-26.pdf?rev=29246f8ab7714c10a7668e09cddcac15",
  "jmic": "https://www.ukmto.org/-/media/ukmto/products/update-114_jmic_advisory_15-nov.pdf?rev=be65cfbd755a41c4816feba6cef4401c",
  "eia": "https://www.eia.gov/outlooks/steo/report/energysecurity/article.php",
  "opec": "https://boereport.com/2026/11/16/opec-officials-meet-to-discuss-oil-production-capacity-review/amp/",
  "opecPolicy": "https://www.opec.org/pr-detail/620-1-november-2026.html"
};
var copy={
  "ko": {
    "desc": "11월 17일 09:00 KST 기준 시장·해상안전 자료와 12월 공시를 구분해 안내합니다.",
    "dec": "대한항공·아시아나·에어부산은 12월 인하 공시를 확인했습니다. 나머지 항공사는 공시 확인이 필요합니다. 유류할증료 인하가 항공권 총액 인하를 보장하지는 않습니다.",
    "expectation": "확인된 3개사는 인하, 나머지 항공사는 공시 확인",
    "basis": "IATA 주간 항공유 평균과 11월 16일 원유 정산값·주간 환율 종가가 내렸습니다. 실제 부과액은 항공사 공시와 발권기간을 따릅니다.",
    "risk": "해상 사고 보고가 이어지고 있습니다. 분기 석유 흐름이나 통항 횟수로 현재 항해 안전을 판단할 수 없습니다.",
    "note": "12월 MOPS 평균·25단계는 대한항공 인용 보도 참고이며 공시 본문에서 직접 검증한 공식 산정값과 구분합니다. 미확인 항공사 금액은 추정하지 않습니다.",
    "questions": [
      "12월 유류할증료는 어떻게 판단하나요?",
      "공식 MOPS와 보도 평균·항공유 참고가격은 어떻게 다른가요?",
      "1,335.7원 환율은 언제의 값인가요?",
      "Brent·WTI는 어느 월물의 가격인가요?",
      "IMO 누계와 최근 UKMTO 보고는 무엇을 뜻하나요?",
      "석유 공급·통항 자료로 해상 안전을 판단할 수 있나요?"
    ],
    "labels": [
      "최종 편집",
      "자료 기준",
      "자료 발표",
      "사건·관측",
      "최초 발표시각 미제공",
      "세계",
      "아시아·오세아니아",
      "주간 종료"
    ],
    "fx": {
      "title": "USD/KRW 1,335.7원: 11월 16일 서울 주간 종가 1.0원 하락",
      "summary": "11월 16일 서울 15:30 주간 종가는 1,335.7 KRW/USD로 전 거래일인 11월 13일보다 1.0원 내렸습니다. 뉴시스·뉴스1·뉴스핌 원문을 대조했습니다. 실시간·야간·NDF·산정기간 평균환율이 아닙니다.",
      "impact": "원화 환산 부담의 참고 신호입니다. 항공사 공시액이나 사이트의 별도 표시 환율을 이 종가로 다시 계산하지 않습니다."
    },
    "oil": {
      "title": "Brent 92.44·WTI 85.72: 11월 16일 선물 정산 하락",
      "summary": "Brent 2027년 1월물은 92.44 USD/bbl(-3.40, -3.55%), WTI 2026년 12월물은 85.72(-2.84, -3.21%)에 정산됐다는 원문 보도를 확인했습니다. 연합인포맥스·뉴시스·Bloomberg 재배포를 대조했으며 거래소 정산표를 직접 확인한 것은 아닙니다.",
      "impact": "원유 가격은 항공유 가격이나 항공사 MOPS 산정평균을 대신하지 않습니다."
    },
    "jet": {
      "title": "Singapore Jet: 11월 13일 민간 FOB 평가 151.15달러",
      "summary": "CommodityScope의 11월 13일 Singapore Jet FOB 평가는 151.15 USD/bbl로 11월 12일보다 1.19달러(+0.8%) 높았습니다. 오늘 09시 전에 원문을 열람했습니다. 제공자가 낮은 신뢰도로 표시한 참고 평가이며 거래 가능 호가나 Platts MOPS가 아닙니다.",
      "impact": "평가일은 11월 13일입니다. 확인일을 가격 관측일로 바꾸지 않으며 공식 산정평균에 합치지 않습니다."
    },
    "iata": {
      "title": "IATA 11월 13일 종료 주간: 세계 169.82·아시아 152.80달러",
      "summary": "IATA/Platts 주간 정유가격 평균은 세계 169.82 USD/bbl(-5.1%), 아시아·오세아니아 152.80(-6.4%)입니다. 11월 13일 종료 주간의 공식 표를 오늘 09시 전에 확인했습니다.",
      "impact": "주간 항공유 평균 하락을 보여주지만, 싱가포르 일별 평가나 항공사별 산정기간 MOPS 평균과는 다른 자료입니다."
    },
    "mops": {
      "title": "12월 대한항공 MOPS 165.66달러·25단계 보도: 공식 공시액과 구분",
      "summary": "11월 16일 보도는 대한항공의 10월 16일~11월 15일 산정평균을 165.66 USD/bbl·394.44 cents/gal, 12월 단계를 25단계로 전합니다. 뉴시스의 대한항공 인용과 뉴스1·머니투데이 원문을 대조했습니다. 항공사 공시 본문이나 Platts 원자료에서 이 산정값을 직접 검증한 것은 아닙니다.",
      "impact": "대한항공에 관한 보도 참고입니다. 모든 항공사의 공통 단계로 적용하거나 미확인 요율을 만들어내지 않습니다."
    },
    "traffic": "Windward 11월 14일판은 11월 12일 18:00~13일 18:00 UTC의 24시간 통항 9회(진입 5·출항 4)를 제시합니다. AIS 미관측 분류 9회 중 위성만으로 탐지한 2회가 포함됩니다. 오늘 새 관측으로 바꾸지 않습니다.",
    "imo": {
      "title": "IMO, 중동 해역 확인 사건 누계 137건",
      "summary": "IMO는 11월 16일 기준 호르무즈와 중동 해역의 확인 사건을 누계 137건, 선원 사망을 25명으로 집계했습니다. 오늘 하루 발생 건수나 호르무즈만의 집계는 아닙니다.",
      "impact": "원유 수출이 회복돼도 선박의 안전까지 회복됐다는 뜻은 아닙니다."
    },
    "ukmto": {
      "title": "호르무즈 유조선 공격 관련 UKMTO 보고 2건",
      "summary": "UKMTO의 11월 16일 경보 207·208은 회사 보안책임자와 제3자가 전한 유조선 공격·기관실 화재 보고입니다. 207은 인명피해 보고 없음·전원 확인, 208은 승무원 안전 보고이며, 두 보고의 중복 여부와 피해 규모는 미확인입니다.",
      "impact": "JMIC의 11월 15일 평가에서 호르무즈 위험은 SEVERE입니다. 보고 2건을 독립 공격 2건이나 확정된 원유 공급 손실로 계산할 수 없습니다."
    },
    "eia": {
      "title": "EIA: 3분기 호르무즈 석유 통과량 하루 평균 910만 배럴",
      "summary": "EIA가 11월 16일 발표한 2026년 3분기 석유 통과량은 9.1 million b/d입니다. 2분기 5.1보다 늘었지만 전년 동기 21.4에는 못 미쳤고, 원유·콘덴세이트 7.3과 석유제품 1.8로 구성됩니다.",
      "impact": "이는 분기 평균 추정치로 오늘의 유량이나 항해 안전을 나타내지 않습니다. AIS 관측의 불확실성 때문에 수치가 수정될 수 있습니다."
    },
    "opec": {
      "title": "OPEC, 2027년 생산 기준을 위한 생산능력 검토",
      "summary": "Reuters에 따르면 OPEC은 11월 16일 최대 지속가능 생산능력 검토를 논의했습니다. 이 평가는 2027년 이후 생산 기준에 활용되며, 다음 장관급 회의는 11월 29일로 예정돼 있습니다.",
      "impact": "이번 논의가 12월 증산 결정은 아닙니다. 공식 11월 1일 결정은 12월 생산 목표를 유지하는 내용입니다."
    },
    "marine": "해상 위험 지속: IMO 11월 16일 누계 137건·선원 사망 25명, UKMTO 보고 2건은 중복 여부 미확인.",
    "status": "11월 공시 적용 · 12월 KE·OZ·BX 금액 확인, 나머지 공시 확인 중"
  },
  "en": {
    "desc": "Market and maritime evidence as of November 17, 09:00 KST, separate from verified December airline notices.",
    "dec": "Lower December surcharges are verified for Korean Air, Asiana and Air Busan. Check notices for the other airlines. A lower surcharge does not guarantee a lower total ticket price.",
    "expectation": "Three airlines announce reductions; check the remaining notices",
    "basis": "IATA weekly jet averages, November 16 crude settlements and the Seoul daytime FX close fell. Published airline amounts and ticketing dates determine the charge.",
    "risk": "Maritime incident reports continue. Quarterly petroleum flows or crossing counts do not establish current navigation safety.",
    "note": "The December MOPS average and stage 25 are reported Korean Air references, separate from calculation values directly verified in official notices. Unverified airline amounts remain unknown.",
    "questions": [
      "How should I assess December surcharges?",
      "How do official MOPS, reported averages and jet-fuel references differ?",
      "When was the USD/KRW rate of 1,335.7 observed?",
      "Which contracts do the Brent and WTI prices cover?",
      "What do the IMO total and recent UKMTO reports mean?",
      "Can petroleum supply and crossing figures establish maritime safety?"
    ],
    "labels": [
      "Last edited",
      "Information cutoff",
      "Source publication",
      "Event / observation",
      "First publication time unavailable",
      "Global",
      "Asia & Oceania",
      "Week ending"
    ],
    "fx": {
      "title": "USD/KRW 1,335.7: November 16 Seoul daytime close down 1.0 won",
      "summary": "The November 16 Seoul 15:30 daytime close was 1,335.7 KRW/USD, down 1.0 won from the previous trading day, November 13. NEWSIS, News1 and Newspim reports were cross-checked. This is not live, overnight, NDF or calculation-period-average FX.",
      "impact": "A reference for conversion pressure. This closing rate does not recalculate published airline charges or the site’s separate display-conversion rate."
    },
    "oil": {
      "title": "Brent 92.44, WTI 85.72: November 16 futures settlements fall",
      "summary": "Original reports put January 2027 Brent at USD 92.44/bbl (-3.40, -3.55%) and December 2026 WTI at 85.72 (-2.84, -3.21%) at settlement. Infomax, NEWSIS and a Bloomberg republication were cross-checked; exchange settlement tables were not directly verified.",
      "impact": "Crude prices are not jet-fuel prices or an airline’s MOPS calculation-period average."
    },
    "jet": {
      "title": "Singapore Jet: private November 13 FOB assessment of USD 151.15",
      "summary": "CommodityScope’s November 13 Singapore Jet FOB assessment was USD 151.15/bbl, up 1.19 (+0.8%) from November 12. The original page was read before today’s 09:00 cutoff. The provider labels this a low-confidence reference assessment, not an executable quote or Platts MOPS.",
      "impact": "The assessment date remains November 13. Retrieval does not make it a new price observation or an official calculation average."
    },
    "iata": {
      "title": "IATA week to November 13: global USD 169.82, Asia USD 152.80",
      "summary": "IATA/Platts weekly refinery-price averages were USD 169.82/bbl globally (-5.1%) and 152.80 in Asia and Oceania (-6.4%). The official table for the week ending November 13 was checked before today’s 09:00 cutoff.",
      "impact": "The weekly decline is distinct from daily Singapore assessments and airline-specific calculation-period MOPS averages."
    },
    "mops": {
      "title": "December Korean Air MOPS USD 165.66 and stage 25 reported separately",
      "summary": "November 16 reports give Korean Air’s October 16–November 15 calculation average as USD 165.66/bbl or 394.44 cents/gal, with stage 25 for December. NEWSIS attribution to Korean Air was compared with News1 and MoneyToday. These calculation values were not directly verified in the airline’s notice or raw Platts data.",
      "impact": "A reported Korean Air reference, not a common stage for all airlines or a basis for inventing unverified charges."
    },
    "traffic": "Windward’s November 14 edition reports nine crossings, five inbound and four outbound, during November 12 18:00–November 13 18:00 UTC. Its nine AIS-unobserved crossings include two detected only by satellite. These are not new observations from today.",
    "imo": {
      "title": "IMO records 137 confirmed incidents across Middle East waters",
      "summary": "As of November 16, IMO lists 137 cumulative confirmed incidents across the Strait of Hormuz and the Middle East, with 25 confirmed seafarer deaths. These are neither one day's figures nor a Hormuz-only count.",
      "impact": "Recovering oil exports do not establish that ships can transit safely."
    },
    "ukmto": {
      "title": "Two UKMTO reports concern tanker attacks in Hormuz",
      "summary": "UKMTO warnings 207 and 208, dated November 16, relay tanker attack and engine-room fire reports from a company security officer and a third party. Warning 207 reports all crew accounted for and no casualties; warning 208 reports crew safe, while overlap between the reports and damage extent remain unconfirmed.",
      "impact": "JMIC's November 15 assessment rates Hormuz SEVERE. Two reports cannot be treated as two independently confirmed attacks or quantified oil supply losses."
    },
    "eia": {
      "title": "EIA: Hormuz oil flows averaged 9.1 million b/d in Q3",
      "summary": "EIA's November 16 release estimates Q3 2026 oil flows at 9.1 million b/d, up from 5.1 in Q2 but below 21.4 a year earlier. The Q3 total comprises 7.3 of crude oil and condensate and 1.8 of petroleum products.",
      "impact": "This quarterly estimate is not today's flow or a measure of navigation safety. Uncertain AIS observations mean the figures remain subject to revision."
    },
    "opec": {
      "title": "OPEC reviews capacity to inform production baselines from 2027",
      "summary": "Reuters reports that OPEC discussed its maximum sustainable production capacity review on November 16. The assessment informs production baselines from 2027, with ministerial meetings scheduled for November 29.",
      "impact": "The discussion is not a December output increase. The official November 1 decision keeps December production targets unchanged."
    },
    "marine": "Maritime risks persist: IMO's November 16 cumulative total is 137 incidents and 25 seafarer deaths; overlap between two UKMTO reports is unconfirmed.",
    "status": "November notices apply · December KE/OZ/BX amounts verified; other notices pending verification"
  },
  "ja": {
    "desc": "11月17日09:00 KST時点の市場・海上安全資料と、確認済みの12月航空会社公示を分けて案内します。",
    "dec": "大韓航空・アシアナ航空・エアプサンの12月引き下げ公示を確認しました。他社は公示確認が必要です。サーチャージの低下は航空券総額の値下がりを保証しません。",
    "expectation": "確認済み3社は引き下げ、他社は公示を確認",
    "basis": "IATA週間航空燃料平均、11月16日の原油清算値とソウル日中為替終値は下落しました。実際の料金は航空会社の公示と発券期間で決まります。",
    "risk": "海上事件の報告が続いています。四半期の石油流量や通航回数で現在の航行安全を判断できません。",
    "note": "12月MOPS平均と25段階は大韓航空についての報道参考値です。公式公示本文で直接確認した算定値とは区別し、未確認の他社料金を推定しません。",
    "questions": [
      "12月サーチャージをどう判断すればよいですか？",
      "公式MOPS・報道平均・航空燃料参考価格はどう違いますか？",
      "1,335.7の為替はいつの値ですか？",
      "Brent・WTIはどの限月の価格ですか？",
      "IMO累計と最近のUKMTO報告は何を意味しますか？",
      "石油供給・通航資料で海上安全を判断できますか？"
    ],
    "labels": [
      "最終編集",
      "情報基準",
      "資料発表",
      "事件・観測",
      "初回公表時刻不明",
      "世界",
      "アジア・オセアニア",
      "週終了"
    ],
    "fx": {
      "title": "USD/KRW1,335.7：11月16日のソウル日中終値は1.0ウォン下落",
      "summary": "11月16日15:30のソウル日中終値は1,335.7 KRW/USDで、前営業日11月13日比1.0ウォン下落しました。NEWSIS・News1・Newspimの本文を照合しました。リアルタイム、夜間、NDF、算定期間平均の為替ではありません。",
      "impact": "換算負担の参考指標です。航空会社の公示額やサイトの別途表示換算レートをこの終値で再計算しません。"
    },
    "oil": {
      "title": "Brent92.44・WTI85.72：11月16日先物清算値が下落",
      "summary": "原文報道によるとBrent2027年1月物は92.44 USD/bbl（-3.40、-3.55%）、WTI2026年12月物は85.72（-2.84、-3.21%）で清算されました。Infomax・NEWSIS・Bloomberg転載を照合しましたが、取引所の清算表を直接確認したものではありません。",
      "impact": "原油価格は航空燃料価格や航空会社のMOPS算定期間平均とは異なります。"
    },
    "jet": {
      "title": "Singapore Jet：11月13日の民間FOB評価151.15ドル",
      "summary": "CommodityScopeの11月13日Singapore Jet FOB評価は151.15 USD/bblで、11月12日比1.19ドル（+0.8%）上昇しました。本日09時前に原文を確認しました。提供者が低信頼度とする参考評価であり、取引可能な気配値やPlatts MOPSではありません。",
      "impact": "評価日は11月13日のままです。確認日を価格観測日に置き換えず、公式算定平均に混ぜません。"
    },
    "iata": {
      "title": "IATA11月13日終了週：世界169.82・アジア152.80ドル",
      "summary": "IATA/Plattsの週間製油所価格平均は世界169.82 USD/bbl（-5.1%）、アジア・オセアニア152.80（-6.4%）でした。11月13日終了週の公式表を本日09時前に確認しました。",
      "impact": "週間下落を示しますが、シンガポールの日次評価や航空会社別MOPS算定期間平均とは別の資料です。"
    },
    "mops": {
      "title": "大韓航空12月MOPS165.66ドル・25段階の報道を区別",
      "summary": "11月16日報道は、大韓航空の10月16日～11月15日算定平均を165.66 USD/bbl・394.44 cents/gal、12月を25段階と伝えました。NEWSISの大韓航空引用とNews1・MoneyToday原文を照合しました。航空会社の公示本文やPlatts原資料で直接確認した算定値ではありません。",
      "impact": "大韓航空に関する報道参考値です。全社共通の段階として適用せず、未確認料金を作りません。"
    },
    "traffic": "Windward11月14日版は11月12日18:00～13日18:00 UTCの24時間に9回（入域5・出域4）の通航を観測しました。AIS未観測分類9回には衛星のみで検出した2回を含みます。本日の新規観測ではありません。",
    "imo": {
      "title": "IMO、中東海域の確認事案件数を累計137件と公表",
      "summary": "IMOの11月16日時点の集計は、ホルムズ海峡と中東海域で確認された事案が累計137件、船員の死亡が25人です。1日の発生件数やホルムズ海峡だけの件数ではありません。",
      "impact": "原油輸出の回復は、船舶の安全な航行が回復したことを意味しません。"
    },
    "ukmto": {
      "title": "ホルムズ海峡のタンカー攻撃に関するUKMTOの報告2件",
      "summary": "11月16日付のUKMTO警報207・208は、船社保安担当者と第三者によるタンカー攻撃・機関室火災の報告です。207では全乗員を確認し死傷者の報告なし、208では乗員の安全が報告されていますが、両報告の重複や被害規模は未確認です。",
      "impact": "JMICの11月15日評価でホルムズ海峡の脅威はSEVEREです。2件の報告を独立して確認された攻撃2件や原油供給の確定損失として計算できません。"
    },
    "eia": {
      "title": "EIA：第3四半期のホルムズ石油通過量は日量910万バレル",
      "summary": "EIAの11月16日発表では、2026年第3四半期の石油通過量は9.1 million b/dです。第2四半期の5.1を上回る一方、前年同期の21.4を下回り、原油・コンデンセート7.3と石油製品1.8で構成されます。",
      "impact": "四半期平均の推計であり、現在の流量や航行の安全性を示すものではありません。AIS観測の不確実性により改定される可能性があります。"
    },
    "opec": {
      "title": "OPEC、2027年以降の生産基準に向けて生産能力を検討",
      "summary": "Reutersによると、OPECは11月16日に最大持続可能生産能力の評価を協議しました。2027年以降の生産基準に関わる評価で、次回の閣僚会合は11月29日の予定です。",
      "impact": "今回の協議は12月の増産決定ではありません。11月1日の公式決定は12月の生産目標の据え置きです。"
    },
    "marine": "海上リスクは継続：IMOの11月16日時点の累計は137件・船員死亡25人。UKMTOの報告2件の重複は未確認。",
    "status": "11月公示を適用・12月KE/OZ/BX金額を確認、他社は公示確認中"
  },
  "zh": {
    "desc": "区分截至11月17日09:00 KST的市场、海上安全资料与已核实的12月航司公告。",
    "dec": "已确认大韩航空、韩亚航空和釜山航空公告下调12月燃油附加费。其余航司仍须查看公告。附加费下降不保证机票总价下降。",
    "expectation": "已确认3家航司下调，其余仍须查看公告",
    "basis": "IATA周均航油价格、11月16日原油结算价及首尔日间汇率收盘值均下降。实际费用以航司公告和适用出票日期为准。",
    "risk": "海上事件报告仍在增加。季度石油流量或通航次数不能证明当前航行安全。",
    "note": "12月MOPS均价和25档是援引大韩航空的报道参考值，须与官方公告正文直接核实的计算值区分。不推算尚未核实的航司金额。",
    "questions": [
      "应如何判断12月燃油附加费？",
      "官方MOPS、报道均价和航油参考价有何区别？",
      "1,335.7的汇率是什么时候的值？",
      "Brent和WTI价格对应哪个合约？",
      "IMO累计数与近期UKMTO报告说明什么？",
      "石油供应和通航数据能证明海上安全吗？"
    ],
    "labels": [
      "最后编辑",
      "资料截止",
      "来源发布",
      "事件／观测",
      "首次发布时间未知",
      "全球",
      "亚洲及大洋洲",
      "周截至"
    ],
    "fx": {
      "title": "USD/KRW1,335.7：11月16日首尔日间收盘下降1.0韩元",
      "summary": "11月16日首尔15:30日间收盘为1,335.7 KRW/USD，较前一交易日11月13日下降1.0韩元。已对照NEWSIS、News1和Newspim原文。这不是实时、夜间、NDF或计算期平均汇率。",
      "impact": "仅供判断换算成本压力，不据此重算航司公告金额或网站另设的显示换算汇率。"
    },
    "oil": {
      "title": "Brent92.44、WTI85.72：11月16日期货结算下跌",
      "summary": "原文报道显示，Brent2027年1月合约结算于92.44 USD/bbl（-3.40、-3.55%），WTI2026年12月合约为85.72（-2.84、-3.21%）。已对照Infomax、NEWSIS及Bloomberg转载，但未直接核验交易所结算表。",
      "impact": "原油价格不是航油价格，也不能代替航司MOPS计算期均价。"
    },
    "jet": {
      "title": "Singapore Jet：11月13日私人FOB评估151.15美元",
      "summary": "CommodityScope的11月13日Singapore Jet FOB评估为151.15 USD/bbl，较11月12日上涨1.19美元（+0.8%）。今日09时前已阅读原文。供应商将其标为低置信度参考评估，不是可成交报价或Platts MOPS。",
      "impact": "评估日仍为11月13日，不将查阅日改成价格观测日，也不混入官方计算均价。"
    },
    "iata": {
      "title": "IATA截至11月13日当周：全球169.82、亚洲152.80美元",
      "summary": "IATA/Platts炼厂周均价为全球169.82 USD/bbl（-5.1%）、亚洲及大洋洲152.80（-6.4%）。截至11月13日当周的官方表格已于今日09时前核实。",
      "impact": "这显示周均航油价格下跌，但不同于新加坡日评估及各航司MOPS计算期均价。"
    },
    "mops": {
      "title": "报道大韩航空12月MOPS165.66美元、25档：单独列示",
      "summary": "11月16日报道称，大韩航空10月16日至11月15日的计算均价为165.66 USD/bbl、394.44 cents/gal，12月适用25档。已对照NEWSIS援引大韩航空的报道及News1、MoneyToday原文。这些计算值未在航司公告正文或Platts原始数据中直接核实。",
      "impact": "这是有关大韩航空的报道参考值，不是所有航司的统一档位，也不能用来生成未核实费用。"
    },
    "traffic": "Windward11月14日版记录11月12日18:00至13日18:00 UTC的24小时内通航9次，入5、出4。AIS未观测类别9次中已包含仅由卫星检测的2次。这不是今日新增观测。",
    "imo": {
      "title": "IMO公布中东海域累计137起已确认事件",
      "summary": "截至11月16日，IMO记录霍尔木兹海峡及中东海域累计137起已确认事件、25名海员死亡。这不是单日发生数，也不是仅限霍尔木兹海峡的统计。",
      "impact": "原油出口恢复并不代表船舶通航安全已经恢复。"
    },
    "ukmto": {
      "title": "UKMTO收到两份霍尔木兹油轮袭击相关报告",
      "summary": "UKMTO的11月16日第207和208号警报分别转述船公司保安负责人及第三方提供的油轮遇袭、机舱起火报告。207称全体船员已确认且未报告伤亡，208称船员安全；两份报告是否重复及损失程度仍未确认。",
      "impact": "JMIC在11月15日的评估中将霍尔木兹威胁等级列为SEVERE。不能把两份报告当作两起独立确认的袭击或确定的原油供应损失。"
    },
    "eia": {
      "title": "EIA：第三季度霍尔木兹石油流量日均910万桶",
      "summary": "EIA于11月16日发布的2026年第三季度估计为9.1 million b/d，高于第二季度的5.1，但低于去年同期的21.4。其中原油与凝析油为7.3，石油产品为1.8。",
      "impact": "这是季度平均估计，不是今日流量，也不代表航行安全。AIS观测存在不确定性，数据可能修订。"
    },
    "opec": {
      "title": "OPEC讨论用于2027年以后生产基准的产能评估",
      "summary": "据Reuters报道，OPEC于11月16日讨论了最大可持续石油生产能力评估。该评估关系到2027年以后的生产基准，下次部长级会议定于11月29日。",
      "impact": "本次讨论不是12月增产决定。11月1日的官方决定仍为维持12月生产目标。"
    },
    "marine": "海上风险持续：IMO截至11月16日累计137起事件、25名海员死亡；UKMTO两份报告是否重复尚未确认。",
    "status": "当前适用11月公告·已核实12月KE/OZ/BX金额，其余公告待核实"
  },
  "fr": {
    "desc": "Données de marché et de sécurité maritime au 17 novembre, 09:00 KST, distinctes des annonces de décembre vérifiées.",
    "dec": "Korean Air, Asiana et Air Busan ont annoncé une baisse pour décembre. Les annonces des autres compagnies restent à vérifier. Une surcharge plus basse ne garantit pas un billet moins cher.",
    "expectation": "Trois baisses annoncées ; vérifier les autres compagnies",
    "basis": "Les moyennes hebdomadaires IATA, les règlements pétroliers du 16 novembre et le change diurne à Séoul ont baissé. Les montants publiés et dates d’émission déterminent la surcharge.",
    "risk": "Des incidents maritimes continuent d’être signalés. Un débit pétrolier trimestriel ou un nombre de passages ne prouve pas la sécurité actuelle.",
    "note": "La moyenne MOPS de décembre et le palier 25 sont des références de presse attribuées à Korean Air, distinctes des paramètres vérifiés directement dans les annonces officielles. Les montants non vérifiés ne sont pas estimés.",
    "questions": [
      "Comment évaluer les surcharges de décembre ?",
      "Comment distinguer MOPS officiel, moyennes rapportées et références du kérosène ?",
      "De quand date le change de 1,335.7 KRW/USD ?",
      "Quelles échéances couvrent les prix Brent et WTI ?",
      "Que signifient le cumul OMI et les récents signalements UKMTO ?",
      "Les flux pétroliers et passages prouvent-ils la sécurité maritime ?"
    ],
    "labels": [
      "Dernière modification",
      "Données arrêtées au",
      "Publication de la source",
      "Événement / observation",
      "Heure de première publication inconnue",
      "Monde",
      "Asie et Océanie",
      "Semaine au"
    ],
    "fx": {
      "title": "USD/KRW à 1,335.7 : clôture diurne du 16 novembre en baisse de 1.0 won",
      "summary": "La clôture diurne de Séoul du 16 novembre à 15:30 était de 1,335.7 KRW/USD, soit -1.0 won depuis la séance précédente du 13 novembre. Les originaux NEWSIS, News1 et Newspim concordent. Ce n’est ni un taux en direct, nocturne, NDF ni une moyenne de calcul.",
      "impact": "Un indicateur de pression de conversion. Ce cours ne recalcule ni les tarifs publiés ni le taux distinct de conversion d’affichage du site."
    },
    "oil": {
      "title": "Brent 92.44 et WTI 85.72 : baisse des règlements du 16 novembre",
      "summary": "Les sources originales donnent un règlement de 92.44 USD/bbl pour Brent janvier 2027 (-3.40 ; -3.55 %) et de 85.72 pour WTI décembre 2026 (-2.84 ; -3.21 %). Infomax, NEWSIS et une republication Bloomberg ont été comparés, sans vérification directe des tables boursières.",
      "impact": "Le brut ne remplace ni le prix du kérosène ni la moyenne MOPS de calcul d’une compagnie."
    },
    "jet": {
      "title": "Singapore Jet : évaluation FOB privée du 13 novembre à 151.15 USD",
      "summary": "L’évaluation FOB Singapore Jet de CommodityScope du 13 novembre est de 151.15 USD/bbl, soit +1.19 (+0.8 %) depuis le 12 novembre. L’original a été consulté avant 09:00 aujourd’hui. Le fournisseur la classe comme référence de faible confiance, pas comme offre négociable ou Platts MOPS.",
      "impact": "La date d’évaluation reste le 13 novembre. La consultation ne crée ni nouvelle observation de prix ni moyenne officielle."
    },
    "iata": {
      "title": "IATA, semaine au 13 novembre : monde 169.82, Asie 152.80 USD",
      "summary": "Les moyennes hebdomadaires de prix en raffinerie IATA/Platts sont de 169.82 USD/bbl dans le monde (-5.1 %) et de 152.80 en Asie-Océanie (-6.4 %). Le tableau officiel de la semaine au 13 novembre a été vérifié avant 09:00 aujourd’hui.",
      "impact": "Cette baisse hebdomadaire est distincte des évaluations quotidiennes de Singapour et des moyennes MOPS de calcul propres aux compagnies."
    },
    "mops": {
      "title": "MOPS de décembre à 165.66 USD et palier 25 rapportés pour Korean Air",
      "summary": "La presse du 16 novembre indique pour Korean Air une moyenne du 16 octobre au 15 novembre de 165.66 USD/bbl, soit 394.44 cents/gal, et un palier 25 en décembre. L’attribution NEWSIS à Korean Air a été confrontée à News1 et MoneyToday. Ces paramètres n’ont pas été directement vérifiés dans l’annonce de la compagnie ou les données brutes Platts.",
      "impact": "Une référence rapportée concernant Korean Air, pas un palier commun à toutes les compagnies ni un moyen d’inventer des montants non vérifiés."
    },
    "traffic": "L’édition Windward du 14 novembre rapporte neuf passages, cinq entrants et quatre sortants, du 12 novembre 18:00 au 13 novembre 18:00 UTC. Les neuf passages sans observation AIS incluent deux détections uniquement satellitaires. Il ne s’agit pas d’observations nouvelles du jour.",
    "imo": {
      "title": "L'OMI recense 137 incidents confirmés au Moyen-Orient",
      "summary": "Au 16 novembre, l'OMI recense un cumul de 137 incidents confirmés dans le détroit d'Ormuz et au Moyen-Orient, avec 25 décès de marins confirmés. Ce ne sont ni les chiffres d'une seule journée ni un décompte limité à Ormuz.",
      "impact": "La reprise des exportations de pétrole ne signifie pas que la sécurité des navires est rétablie."
    },
    "ukmto": {
      "title": "Deux signalements UKMTO concernent des attaques de pétroliers à Ormuz",
      "summary": "Les alertes UKMTO 207 et 208 du 16 novembre relaient des signalements d'attaques et d'incendies en salle des machines, provenant d'un responsable de sûreté et d'un tiers. L'alerte 207 indique tous les membres d'équipage recensés et aucune victime signalée, la 208 un équipage déclaré en sécurité ; un éventuel doublon et l'étendue des dégâts restent à confirmer.",
      "impact": "L'évaluation JMIC du 15 novembre classe Ormuz SEVERE. Ces deux signalements ne prouvent ni deux attaques distinctes ni un volume de pétrole perdu."
    },
    "eia": {
      "title": "EIA : 9,1 millions de barils par jour via Ormuz au T3",
      "summary": "La publication EIA du 16 novembre estime les flux pétroliers du T3 2026 à 9.1 million b/d, contre 5.1 au T2 et 21.4 un an plus tôt. Le total comprend 7.3 de pétrole brut et condensats, et 1.8 de produits pétroliers.",
      "impact": "Cette moyenne trimestrielle n'est ni le débit actuel ni un indicateur de sécurité maritime. L'incertitude des observations AIS peut entraîner des révisions."
    },
    "opec": {
      "title": "L'OPEP examine les capacités servant aux bases de production dès 2027",
      "summary": "Selon Reuters, l'OPEP a discuté le 16 novembre de son évaluation de la capacité maximale de production durable. Ce travail concerne les bases de production à partir de 2027, avant les réunions ministérielles prévues le 29 novembre.",
      "impact": "Cette discussion ne constitue pas une hausse de production pour décembre. La décision officielle du 1er novembre maintient les objectifs de décembre."
    },
    "marine": "Risques maritimes persistants : au 16 novembre, l'OMI totalise 137 incidents et 25 décès de marins ; un doublon entre les deux signalements UKMTO reste possible.",
    "status": "Annonces de novembre applicables · Montants KE/OZ/BX de décembre vérifiés, autres annonces à vérifier"
  },
  "de": {
    "desc": "Markt- und Schiffssicherheitsdaten zum 17. November, 09:00 KST, getrennt von geprüften Dezember-Mitteilungen.",
    "dec": "Korean Air, Asiana und Air Busan haben niedrigere Dezember-Zuschläge angekündigt. Die übrigen Airline-Mitteilungen sind noch zu prüfen. Ein niedrigerer Zuschlag garantiert keinen günstigeren Gesamtflugpreis.",
    "expectation": "Drei bestätigte Senkungen; weitere Mitteilungen prüfen",
    "basis": "Die IATA-Wochenmittel, Rohölabrechnungen vom 16. November und der Tages-Devisenschluss in Seoul sind gesunken. Maßgeblich sind die veröffentlichten Airline-Beträge und Ausstellungszeiträume.",
    "risk": "Weitere Vorfälle auf See werden gemeldet. Quartalsdurchschnitte des Ölflusses oder Passagezahlen belegen keine aktuelle Navigationssicherheit.",
    "note": "Der Dezember-MOPS-Mittelwert und Stufe 25 sind Korean Air zugeschriebene Presseangaben, getrennt von direkt in offiziellen Mitteilungen geprüften Berechnungswerten. Unbestätigte Airline-Beträge werden nicht geschätzt.",
    "questions": [
      "Wie sind die Dezember-Zuschläge einzuschätzen?",
      "Wie unterscheiden sich offizieller MOPS, berichtete Mittelwerte und Kerosinreferenzen?",
      "Wann wurde der Kurs von 1,335.7 KRW/USD beobachtet?",
      "Welche Laufzeiten haben die Brent- und WTI-Kontrakte?",
      "Was bedeuten die IMO-Summe und die aktuellen UKMTO-Meldungen?",
      "Belegen Ölfluss und Passagezahlen die Sicherheit auf See?"
    ],
    "labels": [
      "Zuletzt bearbeitet",
      "Datenstand",
      "Quellenveröffentlichung",
      "Ereignis / Beobachtung",
      "Erstveröffentlichungszeit unbekannt",
      "Welt",
      "Asien und Ozeanien",
      "Woche bis"
    ],
    "fx": {
      "title": "USD/KRW 1,335.7: Seouler Tagesschluss am 16. November um 1.0 Won gefallen",
      "summary": "Der Seouler Tagesschluss am 16. November um 15:30 betrug 1,335.7 KRW/USD, 1.0 Won weniger als am vorherigen Handelstag, dem 13. November. NEWSIS, News1 und Newspim wurden abgeglichen. Dies ist kein Live-, Nacht-, NDF- oder Berechnungszeitraum-Durchschnittskurs.",
      "impact": "Ein Hinweis auf Umrechnungskosten. Veröffentlichte Airline-Beträge und der getrennte Anzeige-Umrechnungskurs der Website werden damit nicht neu berechnet."
    },
    "oil": {
      "title": "Brent 92.44, WTI 85.72: Futures-Abrechnungen vom 16. November gesunken",
      "summary": "Originalberichte nennen für Brent Januar 2027 einen Abrechnungspreis von 92.44 USD/bbl (-3.40; -3.55 %) und für WTI Dezember 2026 von 85.72 (-2.84; -3.21 %). Infomax, NEWSIS und eine Bloomberg-Wiederveröffentlichung wurden abgeglichen; die Börsentabellen wurden nicht direkt geprüft.",
      "impact": "Rohölpreise ersetzen weder Kerosinpreise noch den MOPS-Berechnungsdurchschnitt einer Airline."
    },
    "jet": {
      "title": "Singapore Jet: private FOB-Bewertung vom 13. November bei 151.15 USD",
      "summary": "CommodityScopes FOB-Bewertung für Singapore Jet vom 13. November beträgt 151.15 USD/bbl, 1.19 (+0.8 %) mehr als am 12. November. Die Originalseite wurde heute vor 09:00 gelesen. Der Anbieter kennzeichnet sie als Referenz mit geringer Sicherheit, nicht als handelbare Quote oder Platts MOPS.",
      "impact": "Bewertungsdatum bleibt der 13. November. Die Abrufzeit macht daraus weder eine neue Preisbeobachtung noch einen offiziellen Berechnungsdurchschnitt."
    },
    "iata": {
      "title": "IATA-Woche bis 13. November: weltweit 169.82, Asien 152.80 USD",
      "summary": "Die wöchentlichen IATA/Platts-Raffineriepreismittel betragen weltweit 169.82 USD/bbl (-5.1 %) und in Asien-Ozeanien 152.80 (-6.4 %). Die offizielle Tabelle zur Woche bis zum 13. November wurde heute vor 09:00 geprüft.",
      "impact": "Der Wochenrückgang ist von täglichen Singapur-Bewertungen und den MOPS-Berechnungszeiträumen einzelner Airlines zu unterscheiden."
    },
    "mops": {
      "title": "Für Korean Air berichtet: Dezember-MOPS 165.66 USD und Stufe 25",
      "summary": "Berichte vom 16. November nennen für Korean Air im Zeitraum 16. Oktober–15. November einen Mittelwert von 165.66 USD/bbl beziehungsweise 394.44 cents/gal sowie Stufe 25 im Dezember. Die Korean Air zugeschriebene NEWSIS-Angabe wurde mit News1 und MoneyToday verglichen. Diese Berechnungswerte wurden nicht direkt in der Airline-Mitteilung oder in Platts-Rohdaten geprüft.",
      "impact": "Eine Presseangabe zu Korean Air, keine einheitliche Stufe für alle Airlines und keine Grundlage für erfundene unbestätigte Zuschläge."
    },
    "traffic": "Die Windward-Ausgabe vom 14. November meldet neun Passagen, fünf einwärts und vier auswärts, vom 12. November 18:00 bis 13. November 18:00 UTC. In den neun ohne AIS-Beobachtung erfassten Passagen sind zwei reine Satellitenerkennungen enthalten. Das sind keine neuen Beobachtungen von heute.",
    "imo": {
      "title": "IMO meldet kumulativ 137 bestätigte Vorfälle im Nahen Osten",
      "summary": "Zum 16. November zählt die IMO insgesamt 137 bestätigte Vorfälle in der Straße von Hormus und im Nahen Osten sowie 25 bestätigte Todesfälle unter Seeleuten. Das sind weder Tageszahlen noch ausschließlich Vorfälle in Hormus.",
      "impact": "Eine Erholung der Ölexporte bedeutet nicht, dass die Sicherheit der Schifffahrt wiederhergestellt ist."
    },
    "ukmto": {
      "title": "Zwei UKMTO-Meldungen zu Tankerangriffen bei Hormus",
      "summary": "Die UKMTO-Warnungen 207 und 208 vom 16. November geben Meldungen eines Sicherheitsbeauftragten und eines Dritten über Angriffe und Maschinenraumbrände wieder. Bei 207 sind alle Besatzungsmitglieder erfasst und keine Opfer gemeldet, bei 208 wird die Besatzung als sicher gemeldet; mögliche Überschneidungen und das Schadensausmaß sind ungeklärt.",
      "impact": "JMIC bewertet Hormus mit Stand 15. November als SEVERE. Zwei Meldungen belegen weder zwei unabhängig bestätigte Angriffe noch einen bestimmten Ausfall der Ölversorgung."
    },
    "eia": {
      "title": "EIA: Ölfluss durch Hormus im dritten Quartal bei 9,1 Mio. Barrel täglich",
      "summary": "Die EIA-Veröffentlichung vom 16. November schätzt den Ölfluss im dritten Quartal 2026 auf 9.1 million b/d, nach 5.1 im zweiten Quartal und 21.4 im Vorjahresquartal. Davon entfallen 7.3 auf Rohöl und Kondensate sowie 1.8 auf Mineralölprodukte.",
      "impact": "Dies ist ein Quartalsdurchschnitt, kein aktueller Durchfluss und kein Sicherheitsmaßstab. Unsichere AIS-Beobachtungen können zu Revisionen führen."
    },
    "opec": {
      "title": "OPEC prüft Kapazitäten für Produktionsbasen ab 2027",
      "summary": "Laut Reuters erörterte die OPEC am 16. November die Bewertung ihrer maximal nachhaltig verfügbaren Produktionskapazität. Diese dient als Grundlage für Produktionsbasen ab 2027; die nächsten Ministertreffen sind für den 29. November geplant.",
      "impact": "Die Beratung ist kein Beschluss zur Produktionssteigerung im Dezember. Der offizielle Beschluss vom 1. November lässt die Dezemberziele unverändert."
    },
    "marine": "Maritime Risiken bleiben: IMO-Stand 16. November insgesamt 137 Vorfälle und 25 tote Seeleute; Überschneidungen der zwei UKMTO-Meldungen sind ungeklärt.",
    "status": "November-Mitteilungen gelten · Dezember-Beträge von KE/OZ/BX geprüft, weitere Mitteilungen noch zu prüfen"
  }
};
var definitions=[
  {
    "key": "fx",
    "name": "NEWSIS / News1 / Newspim",
    "url": "https://www.newsis.com/view/NISX20261116_0003870079",
    "published": "2026-11-16T15:46:17+09:00",
    "updated": "2026-11-16T16:40:24+09:00",
    "event": "2026-11-16T15:30:00+09:00",
    "checked": "2026-11-16T23:59:21.358Z",
    "citations": [
      "https://www.newsis.com/view/NISX20261116_0003870079",
      "https://www.news1.kr/finance/market-exr/6355567",
      "https://www.newspim.com/news/view/20261116001164"
    ],
    "status": "reported_Seoul_1530_daytime_close_not_live_overnight_NDF_or_period_mean",
    "extra": {
      "comparisonDate": "2026-11-13",
      "unit": "KRW/USD",
      "priceType": "Seoul daytime closing spot rate; not overnight, NDF, live FX or calculation-period mean"
    }
  },
  {
    "key": "oil",
    "name": "Yonhap Infomax / NEWSIS / Bloomberg",
    "url": "https://news.einfomax.co.kr/news/articleView.html?idxno=4445052",
    "published": "2026-11-17T07:02:19+09:00",
    "updated": null,
    "event": "2026-11-16",
    "checked": "2026-11-16T23:59:53.617Z",
    "citations": [
      "https://news.einfomax.co.kr/news/articleView.html?idxno=4445052",
      "https://www.newsis.com/view/NISX20261117_0003870633",
      "https://www.rigzone.com/news/wire/oil_retreats_as_traders_weigh_supply_glut-16-nov-2026-185096-article/"
    ],
    "status": "reported_futures_settlements_not_direct_exchange_tables",
    "extra": {
      "brentContractMonth": "2027-01",
      "wtiContractMonth": "2026-12",
      "unit": "USD/bbl",
      "sourceUpdatedMinute": "2026-11-17T07:03+09:00",
      "sourceUpdatePrecision": "minute",
      "priceType": "futures_settlement"
    }
  },
  {
    "key": "jet",
    "name": "CommodityScope",
    "url": "https://commodityscope.com/prices/singapore-jet-kerosene",
    "published": null,
    "updated": null,
    "reported": null,
    "event": "2026-11-13",
    "checked": null,
    "status": "private_indicative_FOB_assessment_low_confidence_not_Platts_MOPS",
    "extra": {
      "unit": "USD/bbl",
      "previousObservationDate": "2026-11-12",
      "sourceVerificationWindow": {
        "start": "2026-11-16T23:58:58Z",
        "end": "2026-11-16T23:59:03Z"
      },
      "sourceAvailabilityEvidence": "Original-page web-open returned this content between 2026-11-16T23:58:58Z and 23:59:03Z; direct HTTP attempt returned403.",
      "firstPublicationTimeUnknown": true
    }
  },
  {
    "key": "iata",
    "name": "IATA / Platts",
    "url": "https://www.iata.org/en/publications/economics/fuel-monitor/",
    "published": null,
    "updated": null,
    "reported": null,
    "event": "2026-11-13",
    "checked": "2026-11-16T23:59:21.428Z",
    "citations": [
      "https://www.iata.org/en/publications/economics/fuel-monitor/",
      "https://www.iata.org/contentassets/9036deaf9c984009a3515fd6aa1c5e24/fuel_price_analysis.jpg"
    ],
    "status": "official_weekly_global_and_regional_refinery_price_table",
    "extra": {
      "observationWeekEnding": "2026-11-13",
      "unit": "USD/bbl",
      "sourceLastModifiedAt": "2026-11-16T08:28:39Z",
      "sourceAvailabilityEvidence": "Actual HTTP200 image captured and visually reviewed before09:00KST; Last-Modified is not asserted as initial publication timestamp."
    }
  },
  {
    "key": "mops",
    "name": "NEWSIS / News1 / MoneyToday",
    "url": "https://www.newsis.com/view/NISX20261116_0003869952",
    "published": "2026-11-16T15:14:32+09:00",
    "updated": null,
    "event": null,
    "checked": "2026-11-16T23:59:53.703Z",
    "citations": [
      "https://www.newsis.com/view/NISX20261116_0003869952",
      "https://www.fnnews.com/news/202611161506121925",
      "https://www.mt.co.kr/index.php/industry/2026/11/16/2026111615451527605"
    ],
    "status": "reported_Korean_Air_average_and_stage_not_direct_official_MOPS_verification",
    "extra": {
      "observationStart": "2026-10-16",
      "observationEnd": "2026-11-15",
      "applicationMonth": "2026-12",
      "reportedMopsUsdPerBbl": 165.66,
      "reportedMopsCentsPerGal": 394.44,
      "reportedStage": 25,
      "officialAverageDirectlyVerified": false,
      "officialStageDirectlyVerified": false,
      "scope": "Korean_Air_reported_reference_not_common_to_all_airlines"
    }
  },
  {
    "key": "imo",
    "name": "IMO",
    "url": "https://www.imo.org/en/mediacentre/hottopics/pages/middle-east-highlighted-incidents.aspx",
    "published": null,
    "updated": null,
    "reported": null,
    "event": null,
    "checked": "2026-11-16T23:59:23.522Z",
    "status": "official_cumulative_Middle_East_confirmed_incident_list_not_only_Hormuz",
    "extra": {
      "observationDate": "2026-11-16",
      "cumulativeIncidents": 137,
      "cumulativeFatalities": 25,
      "sourceAvailabilityEvidence": "Direct HTTP 200 body saved before cutoff",
      "cumulativeScope": "Cumulative confirmed highlighted incidents for Strait of Hormuz and Middle East; not daily incidents, vessels sunk, oil volumes, or a safe-transit assessment. Do not add UKMTO reports to this count."
    }
  },
  {
    "key": "ukmto",
    "name": "UKMTO / JMIC",
    "url": "https://www.ukmto.org/-/media/ukmto/products/20261116-ukmto_warning_207-26.pdf?rev=b7a05cc809114a4c9bb82eb10734d893",
    "published": null,
    "updated": null,
    "reported": "2026-11-16",
    "event": "2026-11-16",
    "checked": null,
    "citations": [
      "https://www.ukmto.org/-/media/ukmto/products/20261116-ukmto_warning_207-26.pdf?rev=b7a05cc809114a4c9bb82eb10734d893",
      "https://www.ukmto.org/-/media/ukmto/products/20261116-ukmto_warning_208-26.pdf?rev=29246f8ab7714c10a7668e09cddcac15",
      "https://www.ukmto.org/-/media/ukmto/products/update-114_jmic_advisory_15-nov.pdf?rev=be65cfbd755a41c4816feba6cef4401c"
    ],
    "status": "official_alerts_relay_reported_incidents_not_two_independently_confirmed_distinct_attacks",
    "extra": {
      "sourceReleaseDateKind": "alert_date_not_initial_publication_time",
      "reportedIncidents": [
        {
          "id": "207-26",
          "eventAt": "2026-11-16T05:58:00Z",
          "sourceType": "Company Security Officer",
          "sourceUrl": "https://www.ukmto.org/-/media/ukmto/products/20261116-ukmto_warning_207-26.pdf?rev=b7a05cc809114a4c9bb82eb10734d893",
          "event": "Outbound tanker in Strait of Hormuz reported struck by unknown projectile; engine-room fire; no casualties reported; all crew accounted for; damage assessment and environmental impact unknown.",
          "vesselName": null,
          "attacker": null,
          "distributionAt": "2026-11-16T07:19:00Z",
          "officialPostUrl": "https://x.com/UK_MTO/status/2122228069440323988",
          "distributionEvidenceUrl": "https://www.nitter.cf/UK_MTO/status/2122228069440323988"
        },
        {
          "id": "208-26",
          "eventAt": "2026-11-16T19:00:00Z",
          "sourceType": "Third Party",
          "sourceUrl": "https://www.ukmto.org/-/media/ukmto/products/20261116-ukmto_warning_208-26.pdf?rev=29246f8ab7714c10a7668e09cddcac15",
          "event": "A third party reported an attacked tanker 7 NM north of Khasab, Oman, disabled with engine-room fire; crew reported safe; damage assessment and environmental impact unknown.",
          "vesselName": null,
          "attacker": null,
          "distributionAt": "2026-11-16T21:33:00Z",
          "officialPostUrl": "https://x.com/UK_MTO/status/2122442974655037710",
          "distributionEvidenceUrl": "https://www.nitter.cf/UK_MTO/status/2122442974655037710"
        }
      ],
      "independentDistinctAttacks": null,
      "overlapUnconfirmed": true,
      "quantifiedOilSupplyLoss": null,
      "addedToImoTotal": false,
      "jmicInformationCutoff": "2026-11-15T13:00:00Z",
      "jmicHormuzRisk": "SEVERE",
      "sourceAccess": "Web tool read official PDFs; direct HTTP 403 saved as error HTML, no valid local PDF. Screenshot commands returned reference metadata only, so no successful visual screenshot inspection is claimed.",
      "sourceAvailabilityEvidence": "Official X post timestamps read via third-party mirror, not directly from X. Exact initial publication times of PDFs unknown. Reports are not independently confirmed distinct attacks and are not merged into IMO totals."
    }
  },
  {
    "key": "eia",
    "name": "EIA",
    "url": "https://www.eia.gov/outlooks/steo/report/energysecurity/article.php",
    "published": null,
    "updated": null,
    "reported": "2026-11-16",
    "event": null,
    "checked": "2026-11-17T00:01:53.196Z",
    "citations": [
      "https://www.eia.gov/outlooks/steo/report/energysecurity/article.php",
      "https://www.eia.gov/about/new/WNtest3.php",
      "https://www.prnewswire.com/news-releases/on-monday-in-oil-and-gas-federal-hormuz-data-lands-as-two-acquisitions-are-announced-302941088.html"
    ],
    "status": "official_historical_quarterly_estimate_not_current_Hormuz_flow",
    "extra": {
      "observationPeriod": "2026-Q3",
      "unit": "million barrels per day",
      "quarterlyTotalOil": 9.1,
      "quarterlyCrudeAndCondensate": 7.3,
      "quarterlyPetroleumProducts": 1.8,
      "quarterlyPreviousTotalOil": 5.1,
      "yearEarlierQuarterlyTotalOil": 21.4,
      "sourceTable": 4,
      "sourceAvailabilityEvidence": [
        "Official EIA RSS dates release 11/16 (midnight EST placeholder, not exact initial publication)",
        "PRNewswire article reproduces the same figures at 2026-11-16T22:05:00Z and modified22:07:25Z, both before cutoff"
      ],
      "cutoffCorroboratingPublishedAt": "2026-11-16T22:05:00Z",
      "cutoffCorroboratingUpdatedAt": "2026-11-16T22:07:25Z",
      "quantitativeSource": "EIA",
      "currentDailyFlow": null
    }
  },
  {
    "key": "opec",
    "name": "Reuters / BOE Report; OPEC policy",
    "url": "https://boereport.com/2026/11/16/opec-officials-meet-to-discuss-oil-production-capacity-review/amp/",
    "published": "2026-11-16T17:11:25Z",
    "updated": "2026-11-16T18:36:09Z",
    "event": "2026-11-16",
    "checked": null,
    "citations": [
      "https://boereport.com/2026/11/16/opec-officials-meet-to-discuss-oil-production-capacity-review/amp/",
      "https://www.opec.org/pr-detail/620-1-november-2026.html"
    ],
    "status": "reported_capacity_review_not_December_output_change",
    "extra": {
      "scope": "capacity_baseline_review_for_2027_and_later_not_final_quotas_or_actual_production",
      "nextMinisterialMeeting": "2026-11-29",
      "decemberOutputTargetChanged": false,
      "officialDecemberDecisionDate": "2026-11-01"
    }
  }
];

r.modified=stamp;r.asOf=n.asOf;r.numbers=n;
r.sources=[
['NEWSIS / Korean Air · November reference, September16–October15 period',urls.stage],
['CommodityScope · November13 private FOB assessment, not official MOPS',urls.jet],
['IATA / Platts · week ending November13',urls.iata],
['IATA / Platts · original weekly table',urls.iataTable],
['NEWSIS / News1 · November16 Seoul15:30 close',urls.fx],
['Yonhap Infomax / NEWSIS · November16 futures settlements',urls.oil],
['NEWSIS / News1 · reported December Korean Air MOPS, not direct official verification',urls.mops],
['IMO · cumulative Middle East list as at November16',urls.imo],
['UKMTO · November16 report207',urls.ukmto],
['UKMTO · November16 report208; overlap unconfirmed',urls.ukmto208],
['JMIC114 · threat assessment at November15 13:00UTC',urls.jmic],
['Windward · unchanged November14 edition, observations ending November13 18Z',urls.traffic],
['EIA · historical Q3 2026 petroleum transit estimate',urls.eia],
['Reuters / BOE Report · November16 capacity review discussion',urls.opec],
['OPEC · unchanged November1 December-target decision',urls.opecPolicy]
];
Object.keys(copy).forEach(function(lang){
 var p=r.packs[lang],c=copy[lang];if(!p)return;
 var nov=p.faq[0],names=p.rows.map(function(row){return row[0];});
 p.status=c.status;
 var update=c.labels[0]+': '+stamp+' · '+c.labels[1]+': '+n.asOf;
 var jetValue='Singapore Jet 151.15 (2026-11-13) | IATA '+c.labels[5]+' 169.82 / '+c.labels[6]+' 152.80 ('+c.labels[7]+' 2026-11-13) USD/bbl';
 var rows=[
 [names[0],c.expectation,c.dec],
 [names[1],jetValue,c.jet.summary+' '+c.iata.summary],
 [names[2],'1,335.7 KRW/USD (2026-11-16 15:30 KST; −1.0)',c.fx.summary+' '+c.fx.impact],
 [names[3],'Brent 92.44 (2027-01) / WTI 85.72 (2026-12) USD/bbl · 2026-11-16',c.oil.summary+' '+c.oil.impact],
 [names[4],c.marine,c.imo.summary+' '+c.ukmto.summary+' '+c.ukmto.impact]
 ];
 var context=c.traffic+' '+c.eia.summary+' '+c.eia.impact+' '+c.opec.summary+' '+c.opec.impact;
 var answers=[c.dec,c.mops.summary+' '+c.mops.impact+' '+c.jet.summary+' '+c.iata.summary,c.fx.summary+' '+c.fx.impact,c.oil.summary+' '+c.oil.impact,c.imo.summary+' '+c.ukmto.summary+' '+c.ukmto.impact,context];
 Object.assign(p,{desc:c.desc,sub:update,newsSub:update,updated:update,updatedLabel:c.labels[0],intro:c.dec,rows:rows,summary:[p.status,c.dec,jetValue,rows[2][1],rows[3][1],c.marine],foot:c.jet.summary+' '+c.iata.summary+' '+c.mops.summary,basisBody:nov.a+' '+c.mops.summary,verdict1:c.dec,verdict2:c.fx.impact,verdictLong:context,note:c.dec,officialNotice:update+' · '+p.status,keyVars:[c.expectation,jetValue,rows[2][1],rows[3][1],c.marine],faq:[nov].concat(c.questions.map(function(q,i){return {q:q,a:answers[i]};}))});
 var overview=p.forecastOverview;
 p.forecastOverview=Object.assign({},overview,{modifiedAt:stamp,informationCutoff:n.informationCutoff,expectation:c.expectation,question:c.questions[0],basis:c.basis,risk:c.risk,note:c.note,
 rows:[[overview.rows[0][0],c.expectation,c.dec],[names[1],jetValue,c.iata.impact+' '+c.jet.impact],[names[2],rows[2][1],c.fx.impact],[names[3],rows[3][1],c.oil.impact],[names[4],c.marine,c.ukmto.impact]],rowTones:['down','hold','down','down','up']});
 r.rows[lang]=rows;
 p.surface=Object.assign({},p.surface,{'fore.pageSub':p.sub,'fore.intro':p.intro,'fore.summary.updated':update,'fore.indicator.footnote':p.foot,'fore.verdict.line1':p.verdict1,'fore.verdict.line2':p.verdict2,'fore.verdict.long':p.verdictLong,'fore.basis.body':p.basisBody,'fore.predict.footnote':p.foot,'fore.aiNotice':c.dec,'news.pageSub':p.newsSub,'news.note':c.dec,'news.surchargeNote':c.dec,'news.dataRef':p.sub,'news.decisionShort':c.dec,'news.decisionLine1':c.dec,'news.decisionLine2':c.fx.impact,'news.forecastCta.desc':p.intro,'news.summary.updated':update,'news.officialNotice':p.officialNotice,'news.basisBody':p.foot});
});
var cards=definitions.map(function(def,i){
 var card={id:'market-20261117-'+(i+1),category:['fx','oil','jet','iata'].indexOf(def.key)>=0?'market':'institution',priority:i+1,date:'2026-11-17',dateKind:'site_update',publishedAt:stamp,updatedAt:stamp,informationCutoff:n.informationCutoff,reportedDate:def.published||def.reported||null,sourcePublishedAt:def.published,sourceUpdatedAt:def.updated,eventDate:def.event,sourceVerifiedAt:def.checked,sourceUrl:def.url,citationUrls:def.citations||[def.url],sourceVerificationStatus:def.status,badge:'NEW',aiSummary:true,relevanceScore:1-i/100,i18n:{}};
 if(def.reported)card.sourceReleaseDate=def.reported;
 if(!def.published)card.sourcePublicationNote='First publication time unknown; observation, issue, distribution and retrieval times are distinct.';
 Object.assign(card,def.extra||{});
 Object.keys(copy).forEach(function(lang){
  var c=copy[lang],article=c[def.key],dates=c.labels[2]+': '+(card.reportedDate||c.labels[4])+'. ';
  if(def.event)dates+=c.labels[3]+': '+def.event+'. ';
  if(def.key==='eia')dates+=c.labels[3]+': 2026-Q3. ';
  if(def.key==='imo')dates+=c.labels[3]+': 2026-11-16. ';
  if(def.key==='mops')dates+=c.labels[3]+': 2026-10-16–2026-11-15. ';
  card.i18n[lang]={title:article.title,aiBrief:article.title,summary:dates+article.summary,impact:article.impact,sourceName:def.name,sourceRefs:card.citationUrls.map(function(url){return {name:new URL(url).hostname,url:url};}),tags:[def.name],links:[],faq:[]};
 });
 card.i18n.cn=card.i18n.zh;return card;
});
r.newsCards=cards.concat(r.newsCards.filter(function(card){return !/^market-20261117-/.test(card.id);}));
window.AERO_MARKET_RELEASE=r;window.AERO_MARKET_NUMBERS_LATEST=n;
if(typeof window.AeroApplyNovemberNoticePeriod20261110==='function')window.AeroApplyNovemberNoticePeriod20261110();
})();
