/* November 10 morning release. The November 9 archive remains intact.
 * Publication clocks, observation dates and the 09:00 KST cutoff are distinct. */
(function () {
  'use strict';
  var r = window.AERO_MARKET_RELEASE, n = window.AERO_MARKET_NUMBERS_20261110;
  if (!r || !n) return;
  var stamp = "2026-11-10T09:05:18+09:00", asOf = n.asOf;
  var urls = {
  "stage": "https://mobile.newsis.com/view_amp.html?ar_id=NISX20261016_0003828757",
  "jet": "https://commodityscope.com/prices/singapore-jet-kerosene",
  "fx": "https://news.einfomax.co.kr/news/articleView.html?idxno=4443817",
  "fxClose": "https://www.news1.kr/finance/market-exr/6348028",
  "oil": "https://www.rigzone.com/news/wire/oil_prices_sink_on_iran_peace_hopes-09-nov-2026-185046-article/",
  "oilCorroboration": "https://www.dtnpf.com/agriculture/web/ag/news/world-policy/article/2026/11/09/wti-tests-85-u-s-iran-de-escalation",
  "iata": "https://www.iata.org/en/publications/economics/fuel-monitor/",
  "iataTable": "https://www.iata.org/contentassets/9036deaf9c984009a3515fd6aa1c5e24/fuel_price_analysis.jpg",
  "imo": "https://www.imo.org/en/mediacentre/hottopics/pages/middle-east-highlighted-incidents.aspx",
  "imoRelease": "https://www.imo.org/en/mediacentre/pressbriefings/pages/imo-council-c138-urges-stronger-protection-of-seafarers-amid-threats-to-global-shipping-.aspx",
  "traffic": "https://insights.windward.ai/",
  "claim": "https://www.al-monitor.com/originals/2026/11/iran-says-no-unauthorised-vessels-transited-strait-hormuz-overnight-after",
  "policy": "https://www.opec.org/pr-detail/620-1-november-2026.html",
  "yp": "https://www.airpremia.com/a/ko/customer/notice/803"
};
  var copy = {
  "ko": {
    "desc": "11월 유류할증료와 12월 전망. 11월 9일 서울 환율·원유 정산, 11월 6일 IATA 항공유 주간평균, IMO 11월 9일 목록과 Windward 48시간 통항 관측을 구분합니다.",
    "expectation": "12월 예상: 인하 압력·반등 위험 지속",
    "dec": "12월 산정기간은 10월 16일~11월 15일입니다. 원유 정산·원/달러 하락과 IATA 항공유 주간평균 하락은 인하 압력입니다. 해상위험이 이어져 반등 위험도 남아 있으며 신뢰도는 낮습니다. 공식 누적 MOPS·기간 평균환율·단계·금액은 미확정입니다.",
    "fx": "11월 9일 서울 외환시장 15:30 주간 종가는 1,347.1원/USD로 전일 대비 9.5원 하락했습니다. 연합인포맥스의 18:05:42 KST 보도를 뉴스1과 대조했습니다. 원화 환산 비용의 하방 요인이지만 실시간 환율이나 12월 산정 평균환율은 아닙니다. 항공사 공시액을 현물환율로 다시 계산하지 않습니다.",
    "oil": "11월 9일 선물 정산가는 Brent 2027년 1월물 92.57 USD/bbl(-5.75달러·-5.85%), WTI 2026년 12월물 86.85(-3.98달러·-4.38%)입니다. Bloomberg/Rigzone과 DTN 원문으로 대조했으며 거래소 정산표 직접 검증은 아닙니다. 원유 선물 정산이며 항공유 가격·공식 MOPS 평균·실시간가와 구분합니다.",
    "jet": "Singapore Jet 158.55 USD/bbl(+5.03·+3.3%)은 CommodityScope의 11월 6일 자체 FOB 일일 평가입니다. 낮은 신뢰도의 날짜 명시 참고값이며 11월 10일 실시간값이나 Platts MOPS가 아닙니다. 11월 대한항공 발표의 MOPS 173.89는 9월 16일~10월 15일 평균이고, 아래 IATA 주간평균과도 계산기간·지역이 다릅니다.",
    "iata": "IATA/Platts 표의 11월 6일 종료 주간 세계 항공유 평균은 178.95 USD/bbl로 전주보다 6.6% 하락했고, 아시아·오세아니아는 163.26(-6.0%)입니다. 정유소 기준의 세계·지역 주간평균이며 Singapore 단일시장 일일값이나 한국 항공사 공식 MOPS 산정평균이 아닙니다. 09시 이전에 원문 표를 확인했으며 최초 게시시각은 미제공입니다.",
    "imo": "IMO 공식 목록은 11월 9일 기준 중동·호르무즈 관련 확인 사건 131건, 선원 사망 25명입니다. 11월 10일 09시 전에 원문을 열람했고 정확한 게시시각은 미제공입니다. 과거 11월 6일 성명의 최소 130건은 더 이른 시점입니다. 당시 목록129·성명최소130의 역사적 차이와 VELOS SAPPHIRE 사건일 목록4일·성명5일 차이는 정정 근거 없이 해결 처리하지 않습니다. 이는 호르무즈만의 통항 건수가 아닙니다.",
    "traffic": "Windward 11월 8일 판은 11월 6일 18:00~8일 18:00 UTC의 48시간에 호르무즈 통항 14회(진입8·출항6)를 관측했습니다. 일일 카드나 상단 기준일을 이 관측창과 섞지 않습니다. 업체 관측이며 전체 통항·원유 b/d·선박안전 정상화의 증거가 아닙니다. 이전 20시간16회와 같은 기간의 증감률로 비교하지 않습니다.",
    "context": "협상 기대와 실제 합의·원유 흐름·선박안전은 다릅니다. 이란 측의 11월 9일 남부 항로시설 파괴·밤사이 무허가 통항 부재 발언은 독립 확인되지 않은 주장입니다. OPEC+의 11월 1일 결정은 12월 요구생산량을 9월 수준으로 유지하며 다음 회의는 11월 29일입니다. 요구생산량은 실제 생산·수출량이 아닙니다.",
    "marine": "IMO 131건·사망25명(11월 9일 목록) | Windward 14회=진입8+출항6(11월 6~8일 48시간)",
    "heads": [
      "원/달러 1,347.1원: 11월 9일 주간 종가 9.5원 하락",
      "Brent 92.57·WTI 86.85: 11월 9일 선물 정산 하락",
      "IATA: 11월 6일 주간 세계 항공유 178.95, 전주 대비 6.6% 하락",
      "Windward: 11월 6~8일 48시간 호르무즈 통항 14회 관측",
      "IMO: 11월 9일 목록 131건·선원 사망25명",
      "에어프레미아 기존 11월 공지: 닝보 노선 11월 6일 적용 조건 재확인"
    ],
    "basis": "11월 9일 원유 정산·서울 환율 및 11월 6일 IATA 항공유 주간평균 하락은 인하 압력입니다. 공식 기간평균과 확정 단계·금액은 미확인입니다.",
    "risk": "공식 선박 피해와 제한된 통항 관측은 해상위험이 남아 있음을 보여줍니다. 공급 차질·시장 반등 위험을 배제할 수 없습니다.",
    "impacts": [
      "인하 압력과 반등 위험 지속, 신뢰도 낮음. 공식 단계·금액은 미확정입니다.",
      "IATA 세계 주간평균 -6.6%. 날짜가 다른 민간 Singapore 일일값 및 공식 산정평균과 구분합니다.",
      "전일 대비 9.5원 하락은 원화 환산 비용의 하방 요인입니다.",
      "11월 9일 선물 정산 하락은 하방 요인이며 공식 MOPS 평균은 아닙니다.",
      "IMO 11월 9일 목록과 Windward 48시간 관측을 구분하며 안전 회복으로 해석하지 않습니다."
    ],
    "jetQuestion": "Singapore Jet 참고값과 IATA 주간평균은 공식 MOPS인가요?",
    "imoQuestion": "IMO 사건 집계와 Windward 통항 관측의 범위는 무엇인가요?",
    "yp": "에어프레미아의 10월 27일 09:18:18 KST 기존 공지803을 다시 확인했습니다. 닝보(NGB)는 ~999마일 구간의 편도 USD48이며, 공지7항은 닝보 노선에 2026년 11월 6일부터 적용한다고 명시합니다. 일반 조건은 11월 1~30일 결제일 기준, 원화 환산은 발권일 환율입니다. 금액 변경이나 오늘 발표된 새 공지가 아닙니다. 해당 조항의 추가·수정시각은 미제공이며 공식 본문은 웹 도구로 확인했고 직접 HTTP 접근은403이었습니다.",
    "ypImpact": "닝보 적용일 예외를 확인한 것이며 기존 6개 공시액은 변경하지 않았습니다.",
    "publicationUnavailable": "게시시각 미제공",
    "noticeTag": "기존 공지 조건 재확인",
    "globalLabel": "세계",
    "asiaLabel": "아시아·오세아니아",
    "weekEndingLabel": "주간 종료"
  },
  "en": {
    "desc": "November surcharges and December outlook: November 9 Seoul FX and oil settlements, IATA jet-fuel averages for the week ending November 6, the November 9 IMO list and Windward’s 48-hour observations.",
    "expectation": "December outlook: downward pressure with continuing rebound risk",
    "dec": "December is calculated over October 16–November 15. Lower crude settlements, USD/KRW and IATA weekly jet-fuel averages exert downward pressure. Maritime risks leave scope for a rebound; confidence is low. Official cumulative MOPS, period-average FX, stage and amounts remain unconfirmed.",
    "fx": "The November 9 Seoul daytime close at 15:30 was 1,347.1 KRW/USD, down 9.5 won. Yonhap Infomax’s 18:05:42 KST report was checked against News1. This reduces conversion costs but is neither a live rate nor December’s assessment-period average. Published airline charges are not recalculated at spot FX.",
    "oil": "November 9 futures settlements were Brent January 2027 at 92.57 USD/bbl (-5.75; -5.85%) and WTI December 2026 at 86.85 (-3.98; -4.38%). Bloomberg/Rigzone and DTN were cross-checked; exchange settlement tables were not directly verified. These are crude futures, not jet fuel, official MOPS or live prices.",
    "jet": "Singapore Jet 158.55 USD/bbl (+5.03; +3.3%) is CommodityScope’s proprietary daily FOB assessment dated November 6. It is a low-confidence dated reference, not a November 10 live quote or Platts MOPS. Korean Air’s reported November MOPS reference of 173.89 covers September 16–October 15, a different period and scope from IATA’s weekly averages.",
    "iata": "The IATA/Platts table for the week ending November 6 shows global jet fuel at 178.95 USD/bbl, down 6.6% week on week, and Asia & Oceania at 163.26 (-6.0%). These are regional and global weekly refinery-price averages, not daily Singapore prices or Korean airlines’ official MOPS calculation averages. The table was checked before 09:00 KST; its initial publication clock is unavailable.",
    "imo": "IMO’s list as at November 9 records 131 confirmed Middle East/Hormuz incidents and 25 seafarer fatalities. It was retrieved before November 10 at 09:00 KST; the exact publication clock is unavailable. The November 6 release’s minimum 130 is an older observation. The historical November 6 discrepancy of 129 versus at least 130, and the VELOS SAPPHIRE event-date difference of November 4 versus 5, remain unexplained. This is not a Hormuz transit count.",
    "traffic": "Windward’s November 8 edition observes 14 Hormuz crossings, eight inbound and six outbound, during the 48 hours from November 6 at 18:00 UTC to November 8 at 18:00 UTC. Daily cards and the header date are separate. Provider observations are not exhaustive traffic, oil b/d or proof of safe passage. Do not calculate a like-for-like change from the earlier 16 crossings in 20 hours.",
    "context": "Hopes for talks do not establish an agreement, oil flows or safe passage. Iran’s November 9 statement on destroyed southern navigation aids and no unauthorised overnight transits remains an unverified party claim. OPEC+’s November 1 decision keeps December required production at September levels, with the next meeting on November 29. Required production is not actual output or exports.",
    "marine": "IMO: 131 incidents, 25 fatalities (Nov 9 list) | Windward: 14=8 inbound+6 outbound (Nov 6–8, 48 hours)",
    "heads": [
      "USD/KRW 1,347.1: November 9 daytime close falls 9.5 won",
      "Brent 92.57; WTI 86.85: November 9 futures settlements fall",
      "IATA: weekly global jet fuel 178.95, down 6.6% for week ending November 6",
      "Windward observes 14 Hormuz crossings over 48 hours on November 6–8",
      "IMO: November 9 list records 131 incidents and 25 seafarer fatalities",
      "Air Premia’s existing November notice: Ningbo applies from November 6"
    ],
    "basis": "Lower November 9 crude settlements and Seoul FX, plus IATA’s lower November 6 weekly jet-fuel averages, exert downward pressure. Official period averages, stage and amounts remain unconfirmed.",
    "risk": "Confirmed vessel damage and limited transit observations leave maritime risks unresolved. Supply disruption and a market rebound remain possible.",
    "impacts": [
      "Downward pressure with continuing rebound risk; low confidence. Official stage and amounts are unconfirmed.",
      "IATA global weekly average: -6.6%. Keep it separate from dated private Singapore daily assessments and official calculation averages.",
      "The 9.5-won daily decline reduces won conversion costs.",
      "Lower November 9 crude futures settlements exert downward pressure; they are not MOPS averages.",
      "Keep the November 9 IMO list separate from Windward’s 48-hour sample; neither proves safe passage."
    ],
    "jetQuestion": "Are the Singapore Jet reference and IATA weekly averages official MOPS?",
    "imoQuestion": "What do the IMO incident count and Windward transit observations cover?",
    "yp": "Air Premia notice 803, originally published October 27 at 09:18:18 KST, was rechecked. Ningbo (NGB) is in the up-to-999-mile band at USD48 one way; clause 7 specifies application from November 6, 2026 for Ningbo. General terms use payment dates November 1–30 and the ticketing-date FX rate for won conversion. This is neither a price change nor a notice newly issued today. The clause’s addition/amendment time is unavailable; the official text was read through the web tool while direct HTTP returned403.",
    "ypImpact": "The Ningbo effective-date exception was rechecked; all six existing published amounts remain unchanged.",
    "publicationUnavailable": "Publication time unavailable",
    "noticeTag": "Existing notice condition rechecked",
    "globalLabel": "Global",
    "asiaLabel": "Asia & Oceania",
    "weekEndingLabel": "week ending"
  },
  "ja": {
    "desc": "11月燃油サーチャージと12月見通し。11月9日ソウル為替・原油清算、11月6日終了週のIATA航空燃料平均、IMOの11月9日一覧とWindwardの48時間観測を区別します。",
    "expectation": "12月見通し：下落圧力と反発リスクが継続",
    "dec": "12月の算定期間は10月16日～11月15日です。原油清算値・ドル／ウォンとIATA航空燃料週平均の下落は引下げ要因です。海上リスクが続くため反発余地もあり、信頼度は低いままです。公式累積MOPS・期間平均為替・段階・金額は未確定です。",
    "fx": "11月9日ソウル15:30の日中終値は1,347.1 KRW/USD、前日比9.5ウォン下落。聯合インフォマックスの18:05:42 KST報道をNews1と照合しました。換算費用の下落要因ですが、リアルタイム為替や12月算定平均ではありません。公示額を直物為替で再計算しません。",
    "oil": "11月9日の先物清算値はBrent2027年1月限92.57 USD/bbl（-5.75、-5.85%）、WTI2026年12月限86.85（-3.98、-4.38%）です。Bloomberg/RigzoneとDTNを照合し、取引所の清算表を直接検証したものではありません。航空燃料・公式MOPS平均・リアルタイム価格とは区別します。",
    "jet": "Singapore Jet158.55 USD/bbl（+5.03、+3.3%）はCommodityScopeによる11月6日の独自FOB日次評価です。信頼度の低い日付付き参考値で、11月10日の実況値やPlatts MOPSではありません。大韓航空発表の11月MOPS参考173.89は9月16日～10月15日平均で、IATA週平均とも期間・地域が異なります。",
    "iata": "IATA/Plattsの11月6日終了週の表では世界航空燃料平均178.95 USD/bbl、前週比-6.6%、アジア・オセアニア163.26（-6.0%）です。製油所価格の世界・地域週平均で、Singapore単一市場の日次値や韓国航空会社の公式MOPS算定平均ではありません。09:00 KST前に表を確認しましたが、初回公開時刻は未提供です。",
    "imo": "IMOの11月9日現在の一覧は中東・ホルムズ関連の確認事案131件、船員死亡25人です。11月10日09:00 KST前に閲覧し、正確な公開時刻は未提供です。11月6日発表の最低130件は過去時点です。当時の一覧129件との歴史的差異とVELOS SAPPHIREの事件日4日／5日の差は未解明のままです。ホルムズ通航回数ではありません。",
    "traffic": "Windward11月8日版は11月6日18:00～8日18:00 UTCの48時間にホルムズ通航14回（入航8・出航6）を観測しました。日次カードや見出しの日付とは別の観測窓です。民間観測は全通航・原油b/d・安全回復の証明ではありません。以前の20時間16回と同一期間の増減率で比較しません。",
    "context": "協議への期待は合意・原油流量・通航安全の確認ではありません。南部航行援助施設の破壊と夜間無許可通航ゼロという11月9日のイラン側発言は独立未確認です。OPEC+の11月1日決定は12月要求生産量を9月水準で維持し、次回会合は11月29日です。実生産・輸出とは区別します。",
    "marine": "IMO131件・死亡25人（11月9日一覧）| Windward14回=入航8+出航6（11月6～8日、48時間）",
    "heads": [
      "ドル／ウォン1,347.1：11月9日日中終値は9.5ウォン下落",
      "Brent92.57・WTI86.85：11月9日先物清算値が下落",
      "IATA：11月6日終了週の世界航空燃料178.95、前週比6.6%下落",
      "Windward：11月6～8日の48時間でホルムズ通航14回",
      "IMO：11月9日一覧は131件・船員死亡25人",
      "エアプレミア既存11月公告：寧波は11月6日適用と再確認"
    ],
    "basis": "11月9日の原油清算・ソウル為替と11月6日IATA航空燃料週平均の下落は引下げ要因です。公式期間平均・段階・金額は未確認です。",
    "risk": "確認された船舶被害と限定された通航観測から海上リスクは残ります。供給障害や市場反発の可能性を排除できません。",
    "impacts": [
      "下落圧力と反発リスクが継続、信頼度は低い。公式段階・金額は未確定。",
      "IATA世界週平均-6.6%。日付付き民間Singapore日次値や公式算定平均とは別です。",
      "前日比9.5ウォン下落は換算費用の下落要因です。",
      "11月9日原油先物清算値は下落。公式MOPS平均ではありません。",
      "IMO11月9日一覧とWindward48時間観測を区別し、安全回復と解釈しません。"
    ],
    "jetQuestion": "Singapore Jet参考値とIATA週平均は公式MOPSですか？",
    "imoQuestion": "IMO事件集計とWindward通航観測は何を対象としていますか？",
    "yp": "10月27日09:18:18 KST公表のエアプレミア既存公告803を再確認しました。寧波(NGB)は999マイル以下区間の片道USD48で、第7項は寧波路線を2026年11月6日から適用すると明記しています。通常条件は11月1～30日の決済日基準、ウォン換算は発券日為替です。料金変更や本日発表の新公告ではありません。条項の追加・修正時刻は未提供。公式本文はウェブツールで確認し、直接HTTPは403でした。",
    "ypImpact": "寧波の適用日例外を確認したもので、既存6公示額は変更していません。",
    "publicationUnavailable": "公開時刻未提供",
    "noticeTag": "既存公告の条件を再確認",
    "globalLabel": "世界",
    "asiaLabel": "アジア・オセアニア",
    "weekEndingLabel": "週終了"
  },
  "zh": {
    "desc": "11月燃油附加费与12月展望：区分11月9日首尔汇率及原油结算、11月6日当周IATA航油均价、IMO11月9日清单和Windward48小时观测。",
    "expectation": "12月展望：下行压力与反弹风险持续",
    "dec": "12月计算期为10月16日至11月15日。原油结算、美元兑韩元及IATA航油周均价下降形成下行压力。海上风险仍在，反弹风险持续，置信度低。官方累计MOPS、期间平均汇率、档位及金额尚未确认。",
    "fx": "11月9日首尔15:30日间收盘为1,347.1 KRW/USD，较前日下降9.5韩元。已将韩联社Infomax18:05:42 KST报道与News1对照。此为韩元换算成本的下行因素，并非实时汇率或12月计算期均值，不能据此重算已公布收费。",
    "oil": "11月9日期货结算：2027年1月Brent92.57 USD/bbl（-5.75、-5.85%），2026年12月WTI86.85（-3.98、-4.38%）。已对照Bloomberg/Rigzone与DTN，未直接核验交易所结算表。这是原油期货，不是航油价格、官方MOPS均值或实时价。",
    "jet": "Singapore Jet158.55 USD/bbl（+5.03、+3.3%）为CommodityScope11月6日自有FOB日度评估。此低置信度带日期参考值并非11月10日实时价或Platts MOPS。大韩航空公布的11月MOPS参考173.89对应9月16日至10月15日，与IATA周均价的期间及地域均不同。",
    "iata": "IATA/Platts截至11月6日当周表中，全球航油均价178.95 USD/bbl，环比下降6.6%；亚洲及大洋洲163.26（-6.0%）。这是炼厂价格的全球及地区周均值，并非Singapore单一市场日价或韩国航司官方MOPS计算均值。表格已于09:00 KST前查阅，首次发布时间未提供。",
    "imo": "IMO11月9日清单统计中东及霍尔木兹相关确认事件131起、海员死亡25人。11月10日09:00 KST前已查阅，准确发布时间未提供。11月6日声明中的至少130起属于较早时点；当时清单129起的历史差异及VELOS SAPPHIRE事件日期4日/5日之差仍未解释。这不是霍尔木兹通行次数。",
    "traffic": "Windward11月8日版在11月6日18:00至8日18:00 UTC的48小时内观测到霍尔木兹通行14次（进入8、驶出6）。每日卡片及页首日期不等于此观测窗口。私人观测不是完整通行量、原油b/d或安全恢复的证明，不能与此前20小时16次计算同期间增减率。",
    "context": "谈判预期并不证明已达成协议、原油流量或安全通行。伊朗方面11月9日关于南部导航设施被毁及夜间无未授权船只通行的说法未经独立证实。OPEC+11月1日决定12月要求产量维持9月水平，下次会议11月29日；要求产量不是实际生产或出口。",
    "marine": "IMO131起、25人死亡（11月9日清单）| Windward14次=进入8+驶出6（11月6—8日48小时）",
    "heads": [
      "美元兑韩元1,347.1：11月9日日间收盘下降9.5韩元",
      "Brent92.57、WTI86.85：11月9日期货结算下跌",
      "IATA：11月6日当周全球航油178.95，环比下降6.6%",
      "Windward：11月6—8日48小时观测霍尔木兹通行14次",
      "IMO：11月9日清单131起事件、25名海员死亡",
      "Air Premia既有11月公告：宁波航线11月6日起适用条件再核查"
    ],
    "basis": "11月9日原油结算、首尔汇率及11月6日IATA航油周均价下降形成下行压力。官方期间均值、档位及金额尚未确认。",
    "risk": "已确认船舶损伤及有限通行观测显示海上风险仍在，供应中断和市场反弹的可能性不能排除。",
    "impacts": [
      "下行压力与反弹风险持续，置信度低。官方档位及金额未确认。",
      "IATA全球周均价-6.6%，须与不同日期的私人Singapore日度评估及官方计算均值区分。",
      "较前日下降9.5韩元，降低韩元换算成本。",
      "11月9日原油期货结算下降，但并非MOPS官方均值。",
      "IMO11月9日清单与Windward48小时观测各有范围，不能据此认定安全恢复。"
    ],
    "jetQuestion": "Singapore Jet参考值和IATA周均价是官方MOPS吗？",
    "imoQuestion": "IMO事件统计与Windward通行观测分别涵盖什么？",
    "yp": "重新核查Air Premia于10月27日09:18:18 KST发布的既有公告803。宁波(NGB)属于999英里及以下档，单程USD48；第7项明确宁波航线自2026年11月6日起适用。一般条件按11月1—30日付款日期，韩元换算采用出票日汇率。这不是改价或今日新发布公告。该条款的新增/修改时间未提供；官方正文经网页工具查阅，直接HTTP返回403。",
    "ypImpact": "核查宁波生效日例外，既有六个公告金额均未改变。",
    "publicationUnavailable": "发布时间未提供",
    "noticeTag": "既有公告条件再核查",
    "globalLabel": "全球",
    "asiaLabel": "亚洲及大洋洲",
    "weekEndingLabel": "周截止"
  },
  "fr": {
    "desc": "Surtaxes de novembre et perspectives de décembre : change et règlements pétroliers du 9 novembre, moyenne IATA de la semaine au 6 novembre, liste OMI du 9 et observations Windward sur 48 heures.",
    "expectation": "Décembre : pression baissière et risque de rebond persistant",
    "dec": "Le calcul de décembre couvre le 16 octobre–15 novembre. Le recul du pétrole, du USD/KRW et des moyennes hebdomadaires IATA exerce une pression baissière. Les risques maritimes laissent subsister un risque de rebond ; confiance faible. MOPS cumulé officiel, change moyen, niveau et montants restent non confirmés.",
    "fx": "Clôture diurne de Séoul du 9 novembre à 15 h 30 : 1,347.1 KRW/USD, soit -9.5 wons. Le reportage Yonhap Infomax de 18:05:42 KST a été recoupé avec News1. Cela réduit le coût de conversion, sans constituer un cours en direct ou la moyenne de décembre. Les surtaxes publiées ne sont pas recalculées au comptant.",
    "oil": "Règlements du 9 novembre : Brent janvier 2027 à 92.57 USD/bbl (-5.75 ; -5.85 %) et WTI décembre 2026 à 86.85 (-3.98 ; -4.38 %). Bloomberg/Rigzone et DTN ont été recoupés, sans vérification directe des tableaux de bourse. Il s’agit de contrats à terme de brut, ni de kérosène, ni de MOPS officiel, ni de cours en direct.",
    "jet": "Singapore Jet à 158.55 USD/bbl (+5.03 ; +3.3 %) est l’évaluation FOB quotidienne propre à CommodityScope du 6 novembre. Cette référence datée, de confiance faible, n’est ni un cours du 10 novembre en direct ni Platts MOPS. La référence MOPS de novembre annoncée par Korean Air, 173.89, couvre le 16 septembre–15 octobre, distinct des moyennes IATA.",
    "iata": "Le tableau IATA/Platts de la semaine terminée le 6 novembre indique 178.95 USD/bbl pour le kérosène mondial, soit -6.6 % sur une semaine, et 163.26 pour l’Asie-Océanie (-6.0 %). Moyennes hebdomadaires de prix en raffinerie, elles ne sont ni un cours quotidien de Singapour ni la moyenne MOPS officielle des compagnies coréennes. Tableau consulté avant 09:00 KST ; heure de première publication inconnue.",
    "imo": "La liste OMI au 9 novembre recense 131 incidents confirmés au Moyen-Orient/Hormuz et 25 marins décédés. Consultation avant le 10 novembre à 09:00 KST ; heure de publication inconnue. Le communiqué du 6 novembre indiquant au moins 130 est antérieur. L’écart historique avec les 129 de la liste du 6 et la date de VELOS SAPPHIRE, 4 ou 5 novembre, restent inexpliqués. Ce n’est pas un total de passages à Hormuz.",
    "traffic": "L’édition Windward du 8 novembre observe 14 passages à Hormuz, huit entrants et six sortants, entre le 6 novembre à 18:00 UTC et le 8 à 18:00 UTC, soit 48 heures. Les cartes quotidiennes et la date d’en-tête sont distinctes. Ni trafic exhaustif, ni pétrole en b/j, ni preuve de sécurité. Ne pas calculer une variation comparable avec les 16 passages précédents sur 20 heures.",
    "context": "Les espoirs de négociation ne prouvent ni accord, ni débit pétrolier, ni passage sûr. La déclaration iranienne du 9 novembre sur des aides à la navigation détruites au sud et l’absence de passages nocturnes non autorisés n’est pas confirmée indépendamment. La décision OPEP+ du 1er novembre maintient la production requise de décembre au niveau de septembre ; prochaine réunion le 29 novembre. Ce n’est pas la production ou l’exportation réelle.",
    "marine": "OMI : 131 incidents, 25 morts (liste du 9 nov.) | Windward : 14=8 entrants+6 sortants (6–8 nov., 48 h)",
    "heads": [
      "USD/KRW 1,347.1 : clôture du 9 novembre en baisse de 9.5 wons",
      "Brent 92.57 ; WTI 86.85 : recul des règlements du 9 novembre",
      "IATA : kérosène mondial hebdomadaire à 178.95, -6.6 % au 6 novembre",
      "Windward observe 14 passages à Hormuz en 48 heures du 6 au 8 novembre",
      "OMI : liste du 9 novembre à 131 incidents et 25 marins décédés",
      "Avis Air Premia de novembre : application à Ningbo à partir du 6 novembre"
    ],
    "basis": "Le recul des règlements pétroliers et du change de Séoul du 9 novembre, ainsi que des moyennes IATA au 6 novembre, exerce une pression baissière. Moyennes officielles, niveau et montants non confirmés.",
    "risk": "Les dommages confirmés et les observations limitées laissent les risques maritimes ouverts. Perturbation de l’offre et rebond des marchés restent possibles.",
    "impacts": [
      "Pression baissière et risque de rebond persistant ; confiance faible. Niveau et montants officiels non confirmés.",
      "Moyenne mondiale IATA : -6.6 %. À distinguer des évaluations privées quotidiennes et du MOPS de calcul officiel.",
      "Le recul quotidien de 9.5 wons réduit le coût de conversion.",
      "Baisse des règlements à terme du 9 novembre : facteur baissier, pas une moyenne MOPS.",
      "Distinguer la liste OMI du 9 novembre et l’échantillon Windward sur 48 heures, sans conclure à un passage sûr."
    ],
    "jetQuestion": "La référence Singapore Jet et les moyennes IATA sont-elles le MOPS officiel ?",
    "imoQuestion": "Que couvrent le bilan OMI et les observations de passages Windward ?",
    "yp": "L’avis Air Premia 803, publié le 27 octobre à 09:18:18 KST, a été revérifié. Ningbo (NGB) appartient à la tranche jusqu’à 999 miles, à USD 48 l’aller ; la clause 7 précise une application à partir du 6 novembre 2026 pour cette route. Conditions générales : paiements du 1er au 30 novembre, conversion en wons au change du jour d’émission. Ni changement de tarif ni nouvel avis publié aujourd’hui. Heure d’ajout/modification de la clause inconnue ; texte officiel consulté via l’outil web, accès HTTP direct 403.",
    "ypImpact": "L’exception de date pour Ningbo a été vérifiée ; les six montants publiés restent inchangés.",
    "publicationUnavailable": "Heure de publication non fournie",
    "noticeTag": "Condition d’un avis existant revérifiée",
    "globalLabel": "Monde",
    "asiaLabel": "Asie-Océanie",
    "weekEndingLabel": "semaine au"
  },
  "de": {
    "desc": "November-Zuschläge und Dezember-Ausblick: Seouler Devisen und Öl-Abrechnung vom 9. November, IATA-Woche bis 6. November, IMO-Liste vom 9. und Windwards 48-Stunden-Beobachtungen.",
    "expectation": "Dezember: Abwärtsdruck bei anhaltendem Erholungsrisiko",
    "dec": "Die Dezember-Berechnung umfasst den 16. Oktober–15. November. Niedrigere Öl-Abrechnungspreise, USD/KRW und IATA-Wochendurchschnitte wirken abwärts. Maritime Risiken lassen einen Wiederanstieg möglich erscheinen; das Vertrauen ist gering. Offizieller kumulierter MOPS, Periodenwechselkurs, Stufe und Beträge bleiben unbestätigt.",
    "fx": "Seouler Tagesschluss am 9. November um 15:30: 1,347.1 KRW/USD, minus 9.5 Won. Der Bericht von Yonhap Infomax um 18:05:42 KST wurde mit News1 abgeglichen. Das senkt Umrechnungskosten, ist aber weder Echtzeitkurs noch Dezember-Durchschnitt. Veröffentlichte Airline-Beträge werden nicht zum Kassakurs neu berechnet.",
    "oil": "Abrechnung am 9. November: Brent Januar 2027 bei 92.57 USD/bbl (-5.75; -5.85 %), WTI Dezember 2026 bei 86.85 (-3.98; -4.38 %). Bloomberg/Rigzone und DTN wurden abgeglichen; Börsentabellen wurden nicht direkt geprüft. Rohöl-Futures sind weder Kerosinpreise noch offizieller MOPS-Durchschnitt oder Echtzeitkurse.",
    "jet": "Singapore Jet 158.55 USD/bbl (+5.03; +3.3 %) ist CommodityScopes eigene tägliche FOB-Bewertung vom 6. November. Datierte Referenz mit geringem Vertrauen, kein Echtzeitwert vom 10. November und kein Platts MOPS. Korean Airs gemeldete November-MOPS-Referenz 173.89 umfasst den 16. September–15. Oktober und unterscheidet sich von den IATA-Wochenwerten.",
    "iata": "Die IATA/Platts-Tabelle für die Woche bis 6. November zeigt weltweit 178.95 USD/bbl für Kerosin, minus 6.6 % zur Vorwoche, sowie Asien/Ozeanien 163.26 (-6.0 %). Regionale und globale wöchentliche Raffineriepreise, keine täglichen Singapurwerte oder offiziellen MOPS-Berechnungsdurchschnitte koreanischer Airlines. Vor 09:00 KST geprüft; erste Veröffentlichungsuhrzeit unbekannt.",
    "imo": "Die IMO-Liste zum 9. November nennt 131 bestätigte Nahost/Hormus-Vorfälle und 25 getötete Seeleute. Abruf vor dem 10. November um 09:00 KST; genaue Veröffentlichungszeit unbekannt. Die Mitteilung vom 6. November mit mindestens 130 ist älter. Die historische Differenz zu 129 in der damaligen Liste und das VELOS-SAPPHIRE-Datum 4. versus 5. November bleiben ungeklärt. Keine Zahl der Hormus-Passagen.",
    "traffic": "Windwards Ausgabe vom 8. November beobachtet 14 Hormus-Passagen, acht einwärts und sechs auswärts, vom 6. November um 18:00 UTC bis zum 8. um 18:00 UTC: 48 Stunden. Tageskarten und Kopfdatum sind getrennt. Anbieterbeobachtungen sind weder vollständiger Verkehr noch Öl-b/d oder Sicherheitsnachweis. Kein gleichzeitiger Änderungsvergleich mit den früheren 16 Passagen in 20 Stunden.",
    "context": "Verhandlungshoffnungen belegen weder Einigung noch Ölfluss oder sichere Passage. Irans Aussage vom 9. November zu zerstörten südlichen Navigationshilfen und fehlenden unerlaubten Nachtpassagen ist unabhängig unbestätigt. Der OPEC+-Beschluss vom 1. November hält die erforderliche Dezember-Förderung auf Septemberniveau; nächstes Treffen am 29. November. Vorgaben sind keine tatsächliche Förderung oder Ausfuhr.",
    "marine": "IMO: 131 Vorfälle, 25 Tote (Liste 9. Nov.) | Windward: 14=8 einwärts+6 auswärts (6.–8. Nov., 48 h)",
    "heads": [
      "USD/KRW 1,347.1: Tagesschluss am 9. November um 9.5 Won niedriger",
      "Brent 92.57; WTI 86.85: Abrechnung am 9. November fällt",
      "IATA: globales Wochenkerosin 178.95, -6.6 % für Woche bis 6. November",
      "Windward beobachtet 14 Hormus-Passagen in 48 Stunden vom 6.–8. November",
      "IMO: Liste vom 9. November mit 131 Vorfällen und 25 getöteten Seeleuten",
      "Bestehende Air-Premia-November-Mitteilung: Ningbo gilt ab 6. November"
    ],
    "basis": "Niedrigere Öl-Abrechnung und Seouler Devisen am 9. November sowie IATA-Wochenkerosin bis 6. November wirken abwärts. Offizielle Periodendurchschnitte, Stufe und Beträge bleiben unbestätigt.",
    "risk": "Bestätigte Schiffsschäden und begrenzte Transitbeobachtungen lassen maritime Risiken bestehen. Angebotsstörungen und ein Marktanstieg bleiben möglich.",
    "impacts": [
      "Abwärtsdruck bei weiterem Erholungsrisiko; geringes Vertrauen. Offizielle Stufe und Beträge unbestätigt.",
      "Globaler IATA-Wochendurchschnitt: -6.6 %. Getrennt von datierten privaten Tagesbewertungen und offiziellen MOPS-Mittelwerten.",
      "Der Tagesrückgang um 9.5 Won senkt die Umrechnungskosten.",
      "Niedrigere Rohöl-Abrechnung vom 9. November wirkt abwärts, ist aber kein MOPS-Mittelwert.",
      "IMO-Liste vom 9. November und Windwards 48-Stunden-Stichprobe getrennt lesen; kein Nachweis sicherer Passage."
    ],
    "jetQuestion": "Sind Singapore-Jet-Referenz und IATA-Wochenwerte offizielles MOPS?",
    "imoQuestion": "Was erfassen IMO-Vorfälle und Windwards Transitbeobachtungen?",
    "yp": "Air-Premia-Mitteilung 803 vom 27. Oktober um 09:18:18 KST wurde erneut geprüft. Ningbo (NGB) liegt in der Gruppe bis 999 Meilen bei USD 48 je Strecke; Ziffer 7 nennt für Ningbo den 6. November 2026 als Beginn. Allgemein gelten Zahlungsdaten vom 1.–30. November und der Wechselkurs am Ticket-Ausstellungstag für die Won-Umrechnung. Weder Preisänderung noch heute neu veröffentlichte Mitteilung. Zeitpunkt der Klauseländerung unbekannt; offizieller Airline-Text über das Webwerkzeug gelesen, direkter HTTP-Abruf 403.",
    "ypImpact": "Die Ningbo-Ausnahme zum Geltungsbeginn wurde geprüft; alle sechs veröffentlichten Beträge bleiben unverändert.",
    "publicationUnavailable": "Veröffentlichungszeit nicht angegeben",
    "noticeTag": "Bedingung bestehender Mitteilung erneut geprüft",
    "globalLabel": "Welt",
    "asiaLabel": "Asien/Ozeanien",
    "weekEndingLabel": "Woche bis"
  }
};
  var captions = {
    ko: ['최종 수정', '정보 기준', '발표·보도', '사건·관측', '출처가 있는 관측'],
    en: ['Modified', 'Information cutoff', 'Publication/report', 'Event/observation', 'Sourced observation'],
    ja: ['最終編集', '情報基準時刻', '公表・報道', '出来事・観測', '出典付き観測'],
    zh: ['最后修改', '信息截至', '发布·报道', '事件·观测', '有来源观测'],
    fr: ['Modifié', 'Date limite des informations', 'Publication', 'Événement / observation', 'Observation sourcée'],
    de: ['Geändert', 'Informationsstand', 'Veröffentlichung', 'Ereignis / Beobachtung', 'Belegte Beobachtung']
  };
  r.modified = stamp; r.asOf = asOf; r.numbers = n;
  // The existing footnote renderer links these first two sources in this order.
  r.sources = [
  [
    "NEWSIS / Korean Air · 2026-10-16",
    "https://mobile.newsis.com/view_amp.html?ar_id=NISX20261016_0003828757"
  ],
  [
    "CommodityScope · 2026-11-06 dated private FOB assessment",
    "https://commodityscope.com/prices/singapore-jet-kerosene"
  ],
  [
    "Yonhap Infomax · 2026-11-09 Seoul daytime close",
    "https://news.einfomax.co.kr/news/articleView.html?idxno=4443817"
  ],
  [
    "News1 · 2026-11-09 daytime close corroboration",
    "https://www.news1.kr/finance/market-exr/6348028"
  ],
  [
    "Bloomberg / Rigzone · 2026-11-09 settlements and contracts",
    "https://www.rigzone.com/news/wire/oil_prices_sink_on_iran_peace_hopes-09-nov-2026-185046-article/"
  ],
  [
    "DTN · 2026-11-09 settlements and contracts corroboration",
    "https://www.dtnpf.com/agriculture/web/ag/news/world-policy/article/2026/11/09/wti-tests-85-u-s-iran-de-escalation"
  ],
  [
    "IATA / Platts · week ending 2026-11-06; global and regional weekly refinery-price averages",
    "https://www.iata.org/en/publications/economics/fuel-monitor/"
  ],
  [
    "IATA / Platts · 2026-11-06 weekly table, verified before cutoff",
    "https://www.iata.org/contentassets/9036deaf9c984009a3515fd6aa1c5e24/fuel_price_analysis.jpg"
  ],
  [
    "Windward · 2026-11-08 edition / 2026-11-06 18:00–2026-11-08 18:00 UTC observations",
    "https://insights.windward.ai/"
  ],
  [
    "IMO · list as at 2026-11-09 / 131 incidents, 25 fatalities",
    "https://www.imo.org/en/mediacentre/hottopics/pages/middle-east-highlighted-incidents.aspx"
  ],
  [
    "IMO · 2026-11-06 historical release / earlier minimum 130",
    "https://www.imo.org/en/mediacentre/pressbriefings/pages/imo-council-c138-urges-stronger-protection-of-seafarers-amid-threats-to-global-shipping-.aspx"
  ],
  [
    "Reuters / Al-Monitor · 2026-11-09 Iranian official claim, independently unconfirmed",
    "https://www.al-monitor.com/originals/2026/11/iran-says-no-unauthorised-vessels-transited-strait-hormuz-overnight-after"
  ],
  [
    "OPEC · 2026-11-01 production policy, rechecked 2026-11-10",
    "https://www.opec.org/pr-detail/620-1-november-2026.html"
  ]
];
  r.sources.push(['Air Premia · 2026-10-27 notice / Ningbo effective 2026-11-06; condition rechecked', urls.yp]);
  var stageScope = {
    ko: {airline:/대한항공/, stage:/27단계/g, scoped:'27단계(대한항공 기준)', note:'27단계는 대한항공 발표 기준이며 모든 항공사의 공통 단계가 아닙니다.'},
    en: {airline:/Korean Air/i, stage:/Level 27/gi, scoped:'Level 27 (Korean Air)', note:'Level 27 refers to Korean Air’s announcement, not a common stage for every airline.'},
    ja: {airline:/大韓航空/, stage:/27段階/g, scoped:'27段階（大韓航空基準）', note:'27段階は大韓航空の発表基準で、全航空会社に共通する段階ではありません。'},
    zh: {airline:/大韩航空/, stage:/27档/g, scoped:'27档（大韩航空标准）', note:'27档依据大韩航空公告，并非所有航司共用的档位。'},
    fr: {airline:/Korean Air/i, stage:/niveau 27/gi, scoped:'niveau 27 (Korean Air)', note:'Le niveau 27 correspond à l’annonce de Korean Air, et non à un niveau commun à toutes les compagnies.'},
    de: {airline:/Korean Air/i, stage:/Stufe 27/gi, scoped:'Stufe 27 (Korean Air)', note:'Stufe 27 bezieht sich auf die Mitteilung von Korean Air, nicht auf eine gemeinsame Stufe aller Airlines.'}
  };
  // Scope only current presentation copy. Archived news objects are never visited.
  function scopeStageCopy(value, scope) {
    if (typeof value === 'string') return scope.airline.test(value) ? value : value.replace(scope.stage, scope.scoped);
    if (Array.isArray(value)) return value.map(function (item) { return scopeStageCopy(item, scope); });
    if (value && typeof value === 'object') {
      var result = {};
      Object.keys(value).forEach(function (key) { result[key] = scopeStageCopy(value[key], scope); });
      return result;
    }
    return value;
  }
  Object.keys(copy).forEach(function (lang) {
    var c = copy[lang], p = r.packs[lang], labels = captions[lang];
    if (!p) return;
    Object.assign(p, scopeStageCopy(p, stageScope[lang]));
    if (p.faq[0].a.indexOf(stageScope[lang].note) < 0) p.faq[0].a += ' ' + stageScope[lang].note;
    var nov = p.faq[0].a, questions = p.faq.map(function (item) { return item.q; });
    questions[2] = c.jetQuestion;
    questions[3] = questions[3].replace(/1,356\.6/g, '1,347.1');
    questions[5] = c.imoQuestion;
    var update = labels[0] + ': ' + stamp + ' · ' + labels[1] + ': ' + asOf;
    var rowNames = p.rows.map(function (row) { return row[0]; });
    var rows = [
      [rowNames[0], p.status, c.dec],
      [rowNames[1], 'MOPS 173.89 (2026-09-16–10-15) | Singapore Jet 158.55 (2026-11-06) | IATA ' + c.globalLabel + ' 178.95 / ' + c.asiaLabel + ' 163.26 (' + c.weekEndingLabel + ' 2026-11-06) USD/bbl', c.jet + ' ' + c.iata],
      [rowNames[2], '1,347.1 KRW/USD (2026-11-09 15:30 KST; -9.5)', c.fx],
      [rowNames[3], 'Brent 92.57 (2027-01) / WTI 86.85 (2026-12) USD/bbl · 2026-11-09', c.oil],
      [rowNames[4], c.marine, c.imo + ' ' + c.traffic]
    ];
    var answers = [nov, c.dec, c.jet + ' ' + c.iata, c.fx, c.oil, c.imo + ' ' + c.traffic, c.context];
    r.rows[lang] = rows;
    Object.assign(p, {
      desc: c.desc, sub: update + ' · ' + c.dec, newsSub: update + ' · ' + p.status,
      updated: update, updatedLabel: labels[0], intro: p.status + ' ' + c.dec, rows: rows,
      summary: [p.status, c.dec, rows[1][1], rows[2][1], rows[3][1], c.marine],
      foot: c.jet + ' ' + c.iata + ' ' + nov, basisBody: nov + ' ' + c.jet + ' ' + c.iata,
      verdict1: c.dec, verdict2: c.fx, verdictLong: c.context,
      note: c.dec, officialNotice: update + ' · ' + p.status,
      keyVars: [p.status, rows[1][1], rows[2][1], rows[3][1], c.marine],
      faq: questions.map(function (q, i) { return {q: q, a: answers[i]}; })
    });
    var overview = p.forecastOverview;
    p.forecastOverview = Object.assign({}, overview, {
      modifiedAt: stamp, informationCutoff: n.informationCutoff, expectation: c.expectation, basis: c.basis, risk: c.risk,
      rows: [
        [overview.rows[0][0], c.expectation, c.impacts[0]],
        [rowNames[1], rows[1][1], c.impacts[1]],
        [rowNames[2], rows[2][1], c.impacts[2]],
        [rowNames[3], rows[3][1], c.impacts[3]],
        [rowNames[4], c.marine, c.impacts[4]]
      ], rowTones: ['hold', 'down', 'down', 'down', 'up']
    });
    p.surface = Object.assign({}, p.surface, {
      'fore.pageSub': p.sub, 'fore.intro': p.intro, 'fore.summary.updated': update,
      'fore.indicator.footnote': p.foot, 'fore.verdict.line1': p.verdict1,
      'fore.verdict.line2': p.verdict2, 'fore.verdict.long': p.verdictLong,
      'fore.basis.body': p.basisBody, 'fore.predict.footnote': p.foot, 'fore.aiNotice': c.dec,
      'news.pageSub': p.newsSub, 'news.note': c.dec, 'news.surchargeNote': c.dec,
      'news.dataRef': p.sub, 'news.decisionShort': p.status + ' · ' + c.dec,
      'news.decisionLine1': c.dec, 'news.decisionLine2': c.fx,
      'news.forecastCta.desc': p.intro, 'news.summary.updated': update,
      'news.officialNotice': p.officialNotice, 'news.basisBody': p.foot
    });
  });
  var definitions = [
    {key:'fx', name:'Yonhap Infomax', reported:'2026-11-09T18:05:42+09:00', event:'2026-11-09T15:30:00+09:00', citations:[urls.fx, urls.fxClose]},
    {key:'oil', name:'Bloomberg / Rigzone', reported:'2026-11-09T21:27:55Z', event:'2026-11-09', citations:[urls.oil, urls.oilCorroboration]},
    {key:'iata', name:'IATA / Platts', reported:null, event:'2026-11-06', publication:null, verification:'official_weekly_refinery_price_assessment', verified:'2026-11-10T08:59:29.183+09:00', modified:'2026-11-09T02:24:57Z', citations:[urls.iata, urls.iataTable]},
    {key:'traffic', name:'Windward', reported:'2026-11-08', period:'2026-11-06T18:00:00Z/2026-11-08T18:00:00Z', publication:null, verification:'provider_tracked_observation', verified:'2026-11-10T08:58:56.083+09:00', modified:'2026-11-09T02:30:44Z'},
    {key:'imo', name:'IMO', reported:null, event:null, publication:null, verification:'official_list_retrieved_before_cutoff', verified:'2026-11-10T08:58:56.707+09:00', citations:[urls.imo, urls.imoRelease]},
    {key:'yp', name:'Air Premia', reported:'2026-10-27T09:18:18+09:00', event:'2026-11-06', verification:'existing_official_notice_condition_rechecked_via_web_tool', verified:'2026-11-10', citations:[urls.yp]}
  ];
  var cards = definitions.map(function (def, i) {
    var card = {
      id:'market-20261110-' + (i + 1), category:['imo', 'iata', 'yp'].indexOf(def.key) >= 0 ? 'institution' : 'market',
      priority:i + 1, date:'2026-11-10', publishedAt:stamp, updatedAt:stamp,
      reportedDate:def.reported, eventDate:def.event || null, dateKind:'site_update',
      sourcePublishedAt: Object.prototype.hasOwnProperty.call(def, 'publication') ? def.publication : def.reported,
      sourceUrl:urls[def.key], citationUrls:def.citations || [urls[def.key]],
      sourceVerificationStatus:def.verification || 'published_source',
      badge:'NEW', aiSummary:true, relevanceScore:1 - i / 100, i18n:{}
    };
    if (def.period) card.observationPeriod = def.period;
    if (def.key === 'traffic') { card.observationStart = '2026-11-06T18:00:00Z'; card.observationEnd = '2026-11-08T18:00:00Z'; }
    if (def.key === 'imo') { card.countAsOf = '2026-11-09'; card.eventDateBySource = {incidentList:'2026-11-04', historicalPressRelease:'2026-11-05'}; card.historicalCountDiscrepancyStatus = '2026-11-06_discrepancy_unresolved'; }
    if (def.key === 'oil') card.corroboratingSourceUpdatedAt = '2026-11-09T20:57:00Z';
    if (def.key === 'iata') { card.observationWeekEnding = '2026-11-06'; card.assessmentScope = 'global_and_regional_weekly_refinery_prices_not_official_korean_airline_MOPS_average'; }
    if (def.verified) card.sourceVerifiedAt = def.verified;
    if (def.key === 'yp') { card.sourceUpdatedAt = null; card.conditionAmendedAt = null; card.sourceVerificationPeriod = '2026-11-10 08:58–08:59 KST (minute precision)'; card.sourceAccessMethod = 'official_text_via_web_tool_direct_HTTP_403'; card.originalNoticeUnchangedAmounts = true; }
    if (def.modified) { if (def.key === 'traffic' || def.key === 'iata') card.sourceLastModifiedAt = def.modified; else card.sourceUpdatedAt = def.modified; }
    if (def.publication === null) card.sourcePublicationNote = 'Initial publication time is unavailable. Direct retrieval before the cutoff establishes availability; observation dates and HTTP Last-Modified are separate.';
    Object.keys(copy).forEach(function (lang) {
      var c = copy[lang], label = captions[lang];
      var dates = label[2] + ': ' + (def.reported || c.publicationUnavailable) + '. ' + (def.publication === null && def.reported ? c.publicationUnavailable + '. ' : '') + (def.event ? label[3] + ': ' + def.event + '. ' : '');
      card.i18n[lang] = {
        title:c.heads[i], aiBrief:c.heads[i], summary:dates + c[def.key], impact:def.key === 'yp' ? c.ypImpact : c.dec,
        sourceName:def.name, sourceRefs:card.citationUrls.map(function (url) {
          var name = url === urls.fxClose ? 'News1' : url === urls.oilCorroboration ? 'DTN' : def.name;
          return {name:name, url:url};
        }), tags:[def.key === 'yp' ? c.noticeTag : label[4]], links:[], faq:[]
      };
    });
    card.i18n.cn = card.i18n.zh;
    return card;
  });
  r.newsCards = cards.concat(r.newsCards.filter(function (card) { return !/^market-20261110-/.test(card.id); }));
  window.AERO_MARKET_RELEASE = r;
  window.AERO_MARKET_NUMBERS_LATEST = n;
  if (typeof window.AeroApplyNovemberNoticePeriod20261110 === 'function') window.AeroApplyNovemberNoticePeriod20261110();
})();
