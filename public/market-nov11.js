/* November 11 manual morning release. The November 10 archive remains intact.
 * Publication clocks, observation dates and the 08:30 KST cutoff are distinct. */
(function () {
  'use strict';
  var r = window.AERO_MARKET_RELEASE, n = window.AERO_MARKET_NUMBERS_20261111;
  if (!r || !n) return;
  var stamp = "2026-11-11T08:43:25.826+09:00", asOf = n.asOf;
  var urls = {
  "stage": "https://mobile.newsis.com/view_amp.html?ar_id=NISX20261016_0003828757",
  "jet": "https://commodityscope.com/prices/singapore-jet-kerosene",
  "fx": "https://news.einfomax.co.kr/news/articleView.html?idxno=4444026",
  "fxClose": "https://www.newsis.com/view/NISX20261110_0003862401",
  "oil": "https://www.rigzone.com/news/wire/oil_prices_retreat_as_peace_hopes_grow-10-nov-2026-185054-article/",
  "oilCorroboration": "https://www.afp.com/en/us-stocks-fall-hot-inflation-report-nvidia-tumbles-again",
  "iata": "https://www.iata.org/en/publications/economics/fuel-monitor/",
  "iataTable": "https://www.iata.org/contentassets/9036deaf9c984009a3515fd6aa1c5e24/fuel_price_analysis.jpg",
  "imo": "https://www.imo.org/en/mediacentre/hottopics/pages/middle-east-highlighted-incidents.aspx",
  "imoRelease": "https://www.imo.org/en/mediacentre/pressbriefings/pages/imo-council-c138-urges-stronger-protection-of-seafarers-amid-threats-to-global-shipping-.aspx",
  "traffic": "https://insights.windward.ai/",
  "eia": "https://www.eia.gov/outlooks/steo/",
  "eiaPdf": "https://www.eia.gov/outlooks/steo/pdf/steo_text.pdf",
  "eiaOil": "https://www.eia.gov/outlooks/steo/report/global_oil.php",
  "eiaProducts": "https://www.eia.gov/outlooks/steo/report/petro_prod.php",
  "pipeline": "https://www.brecorder.com/news/amp/40448133",
  "policy": "https://www.opec.org/pr-detail/620-1-november-2026.html",
  "yp": "https://www.airpremia.com/a/ko/customer/notice/803"
};
  var copy = {
  "ko": {
    "desc": "11월 유류할증료와 12월 전망. 11월 10일 시장 정산, Windward 11월 9일 관측, EIA 전망과 사우디 파이프라인 발표를 11월 11일 08:30 KST 기준으로 구분합니다.",
    "expectation": "12월 예상: 인하 압력·반등 위험 지속",
    "dec": "12월 산정기간은 10월 16일~11월 15일입니다. 11월 10일 원유 정산·원/달러 하락과 11월 6일 종료 IATA 주간평균 하락은 인하 압력입니다. 해상·제품 공급 위험이 남아 반등 위험도 지속되며 신뢰도는 낮습니다. 공식 누적 MOPS·기간 평균환율·단계·금액은 미확정입니다.",
    "fx": "11월 10일 서울 15:30 주간 종가는 1,337.5원/USD, 전일 대비9.6원 하락입니다. 연합인포맥스18:09:42 KST 보도를 뉴시스와 대조했습니다. 원화 환산 비용의 하방 요인이며 실시간 환율·12월 산정 평균은 아닙니다. 공시액을 현물환율로 다시 계산하지 않습니다.",
    "oil": "11월 10일 선물 정산: Brent2027년1월물91.49 USD/bbl(-1.2%), WTI2026년12월물86.04(-0.9%). 변화율은 Bloomberg/Rigzone 기사 반올림값이며 AFP와 대조했습니다. 거래소 정산표 직접 검증은 아닙니다. 원유 선물·항공유·공식 MOPS·EIA 현물 월평균 전망은 서로 다릅니다.",
    "jet": "Singapore Jet 158.55 USD/bbl(+5.03·+3.3%)은 CommodityScope의 11월 6일 자체 FOB 일일 평가입니다. 낮은 신뢰도의 날짜 명시 참고값이며 11월 11일 실시간값이나 Platts MOPS가 아닙니다. 11월 대한항공 발표의 MOPS 173.89는 9월 16일~10월 15일 평균이고, 아래 IATA 주간평균과도 계산기간·지역이 다릅니다.",
    "iata": "IATA/Platts 표의 11월 6일 종료 주간 세계 항공유 평균은 178.95 USD/bbl로 전주보다 6.6% 하락했고, 아시아·오세아니아는 163.26(-6.0%)입니다. 정유소 기준의 세계·지역 주간평균이며 Singapore 단일시장 일일값이나 한국 항공사 공식 MOPS 산정평균이 아닙니다. 같은11월6일 종료 주간표를 재확인했으며 새 일일 평가가 아닙니다. 최초 게시시각은 미제공입니다.",
    "imo": "IMO131건·선원 사망25명은 앞선 실행에서 확인한 11월 9일 목록의 과거 참고 집계입니다. 이번 11월 11일08:30 KST 기준 최신 목록의 공개시각을 입증하지 못해 최신 확정 누계는 미확인입니다. 확인일만 바꿔 과거 수치를 최신값으로 표시하지 않습니다. 과거 공식 자료 간 집계·사건일 차이를 해소하는 정정은 미확인입니다. 중동 사건은 호르무즈 전수 통항과 다릅니다.",
    "traffic": "Windward11월10일 판은 11월9일 호르무즈 통항6회(진입3·출항3), AIS송신3·비송신3을 관측했습니다. 정확한 일중 시작·종료시각은 미제공입니다. 이전48시간14회와 같은 기간의 증감률로 비교하지 않습니다. 업체 관측이며 전수 통항·원유 b/d·선박안전 회복의 증거가 아닙니다.",
    "context": "EIA전망은11월5일 입력에 기반한 조건부 시나리오입니다. 사우디 파이프라인 운영 영향 없음은 당국 소식통 발표이며 우회 공급과 선박안전은 다릅니다. OPEC+11월1일 결정의12월 요구생산량은9월 수준, 다음 회의11월29일입니다. 요구생산량은 실제 생산·수출량이 아닙니다.",
    "marine": "IMO과거 참고131건·사망25명(11월9일), 최신 미확인 | Windward6회=진입3+출항3(11월9일)",
    "heads": [
      "원/달러1,337.5원: 11월10일 주간 종가9.6원 하락",
      "Brent91.49·WTI86.04: 11월10일 선물 정산 하락",
      "Windward: 11월9일 호르무즈 통항6회 관측",
      "EIA11월 전망: 연말Brent약100, 11월5일 입력의 조건부 전망",
      "사우디 파이프라인 공격: 당국 소식통은 운영 영향 없다고 설명"
    ],
    "basis": "11월10일 원유 정산·서울 환율과 날짜가 명시된 IATA주간평균 하락은 인하 압력입니다. 공식 기간평균·단계·금액은 미확인입니다.",
    "risk": "해상·제품 공급 위험이 남습니다. EIA는11월5일 이후 사건을 반영하지 않으며 파이프라인 운영 설명은 당국 소식통 발표입니다.",
    "impacts": [
      "인하 압력·반등 위험 지속, 신뢰도 낮음. 공식 단계·금액 미확정.",
      "11월6일 IATA주간표와 민간 Singapore참고값을 날짜 그대로 재확인. 공식 MOPS산정평균과 구분합니다.",
      "전일 대비9.6원 하락은 환산 비용의 하방 요인입니다.",
      "11월10일 원유 정산은 하락했습니다. EIA조건부 현물 월평균 전망과 다릅니다.",
      "IMO131은11월9일 과거 참고, 최신 미확인. Windward6회는 안전 회복의 증거가 아닙니다."
    ],
    "jetQuestion": "Singapore Jet 참고값과 IATA 주간평균은 공식 MOPS인가요?",
    "imoQuestion": "IMO 사건 집계와 Windward 통항 관측의 범위는 무엇인가요?",
    "publicationUnavailable": "게시시각 미제공",
    "globalLabel": "세계",
    "asiaLabel": "아시아·오세아니아",
    "weekEndingLabel": "주간 종료",
    "eia": "11월10일 EIA STEO는 11~12월 Brent현물 월평균을 약100 USD/bbl로 전망합니다. 모형 입력은11월5일 마감되어 이후 시장 사건을 특별히 반영하지 않습니다. 이란을 제외한 중동 대부분 생산이2027년2분기 말 전쟁 전 평균으로 복귀한다는 가정이며 제품 공급제약은2027년 말까지 이어질 것으로 봤습니다. 조건부 전망이지 현재 정산·항공유 평균·한국12월 확정 요율이 아닙니다.",
    "pipeline": "Reuters는 사우디 국영매체가 에너지부 소식통을 인용해11월9일 Medina지역 East-West 원유 파이프라인 공격·제한 화재 진압을 발표했다고 보도했습니다. 사상자·운영 영향이 없었다는 내용도 해당 소식통의 설명이며 독립적인 유량·운영 실측 확인은 아닙니다. 9월의 과거 중단을 이번의 현재 중단으로 재사용하지 않으며 호르무즈 안전 회복과도 다릅니다."
  },
  "en": {
    "desc": "November surcharges and December outlook at November 11, 08:30 KST: November 10 settlements, Windward observations, EIA projections and Saudi pipeline statements.",
    "expectation": "December outlook: downward pressure with continuing rebound risk",
    "dec": "December is calculated over October 16–November 15. Lower November 10 crude settlements and USD/KRW, alongside IATA’s lower averages for the week ending November 6, exert downward pressure. Maritime and product-supply risks leave rebound risk intact; confidence is low. Official cumulative MOPS, period-average FX, stage and amounts remain unconfirmed.",
    "fx": "The November 10 Seoul daytime close at 15:30 was 1,337.5 KRW/USD, down 9.6 won. Yonhap Infomax’s 18:09:42 KST report was checked against Newsis. This lowers conversion costs but is neither a live rate nor December’s average. Published charges are not recalculated at spot FX.",
    "oil": "November 10 futures settlements: Brent January 2027 at 91.49 USD/bbl (-1.2%), WTI December 2026 at 86.04 (-0.9%). Percentages are rounded as reported by Bloomberg/Rigzone and checked against AFP. Exchange settlement tables were not directly verified. Crude futures, jet fuel, official MOPS and EIA monthly spot forecasts are distinct.",
    "jet": "Singapore Jet 158.55 USD/bbl (+5.03; +3.3%) is CommodityScope’s proprietary daily FOB assessment dated November 6. It is a low-confidence dated reference, not a November 11 live quote or Platts MOPS. Korean Air’s reported November MOPS reference of 173.89 covers September 16–October 15, a different period and scope from IATA’s weekly averages.",
    "iata": "The IATA/Platts table for the week ending November 6 shows global jet fuel at 178.95 USD/bbl, down 6.6% week on week, and Asia & Oceania at 163.26 (-6.0%). These are regional and global weekly refinery-price averages, not daily Singapore prices or Korean airlines’ official MOPS calculation averages. The same November 6 weekly table was rechecked; it is not a new daily assessment. Initial publication time is unavailable.",
    "imo": "IMO’s 131 incidents and 25 seafarer fatalities are a historical reference from the November 9 list verified previously. Publication of the latest list before November 11 at 08:30 KST is unproven, so its latest confirmed cumulative count is unavailable. A new check date does not make older figures current. No correction resolving historical official count or event-date differences was verified. Middle East incidents are not exhaustive Hormuz traffic.",
    "traffic": "Windward’s November 10 edition observes six Hormuz crossings on November 9: three inbound and three outbound, with three AIS-visible and three dark. Exact intraday start and end times are unavailable. Do not compare directly with the earlier 14 crossings over 48 hours. Provider observations are not exhaustive traffic, oil b/d or proof of safe passage.",
    "context": "EIA uses November 5 inputs for a conditional scenario. No operational impact on the Saudi pipeline is an attributed ministry-source statement; bypass supply and vessel safety differ. OPEC+’s November 1 decision keeps December required production at September levels, with the next meeting on November 29. Quotas are not actual output or exports.",
    "marine": "IMO historical: 131 incidents, 25 fatalities (Nov 9); latest unconfirmed | Windward: 6=3 inbound+3 outbound (Nov 9)",
    "heads": [
      "USD/KRW 1,337.5: November 10 close falls 9.6 won",
      "Brent 91.49; WTI 86.04: November 10 settlements fall",
      "Windward observes six Hormuz crossings on November 9",
      "EIA: year-end Brent near 100, conditional on November 5 inputs",
      "Saudi pipeline attack: ministry source reports no operational impact"
    ],
    "basis": "Lower November 10 crude settlements and Seoul FX, alongside dated lower IATA weekly averages, exert downward pressure. Official averages, stage and amounts remain unconfirmed.",
    "risk": "Maritime and product-supply risks persist. EIA excludes events after November 5; pipeline operating statements are attributed to a ministry source.",
    "impacts": [
      "Downward pressure with continuing rebound risk; low confidence. Official stage and amounts unconfirmed.",
      "The November 6 IATA weekly table and dated private Singapore reference were rechecked, keeping their distinct dates and scopes.",
      "The 9.6-won daily fall lowers conversion costs.",
      "November 10 futures settlements fell; EIA’s conditional monthly spot forecast is separate.",
      "IMO 131 is a historical November 9 reference; latest unconfirmed. Six Windward crossings do not establish safety."
    ],
    "jetQuestion": "Are the Singapore Jet reference and IATA weekly averages official MOPS?",
    "imoQuestion": "What do the IMO incident count and Windward transit observations cover?",
    "publicationUnavailable": "Publication time unavailable",
    "globalLabel": "Global",
    "asiaLabel": "Asia & Oceania",
    "weekEndingLabel": "week ending",
    "eia": "EIA’s November 10 STEO projects Brent spot monthly averages near 100 USD/bbl for November–December. Model inputs closed November 5, excluding specific later market events. It assumes most Middle East production outside Iran returns to pre-conflict averages by end-Q2 2027, while product-supply constraints continue through end-2027. This is a conditional forecast, not a current settlement, jet-fuel average or confirmed Korean December surcharge.",
    "pipeline": "Reuters reports that Saudi state media, citing an energy-ministry source, announced a November 9 attack and extinguished limited fire on the East-West crude pipeline in Medina. No casualties or operational impact is also that source’s account, not independent flow or operating measurements. September’s shutdown must not become a current shutdown or proof of safe Hormuz passage."
  },
  "ja": {
    "desc": "11月11日08:30 KST基準の11月サーチャージ・12月見通し。11月10日市場清算、Windward観測、EIA条件付き予測とサウジパイプライン発表を区別します。",
    "expectation": "12月見通し：下落圧力と反発リスクが継続",
    "dec": "12月算定期間は10月16日～11月15日。11月10日原油清算・ドル／ウォンと11月6日終了週のIATA平均下落は引下げ要因です。海上・製品供給リスクが残り反発リスクも継続、信頼度は低いままです。公式累積MOPS・期間平均為替・段階・金額は未確定です。",
    "fx": "11月10日ソウル15:30日中終値は1,337.5 KRW/USD、前日比9.6ウォン下落。聯合インフォマックス18:09:42 KST報道をNewsisと照合しました。換算費用の下落要因ですが実況為替や12月算定平均ではなく、公示額を再計算しません。",
    "oil": "11月10日先物清算値はBrent2027年1月限91.49 USD/bbl(-1.2%)、WTI2026年12月限86.04(-0.9%)。変化率はBloomberg/Rigzone記事の丸め値でAFPと照合。取引所表の直接検証ではありません。航空燃料・公式MOPS・EIA現物月平均予測とは別です。",
    "jet": "Singapore Jet158.55 USD/bbl（+5.03、+3.3%）はCommodityScopeによる11月6日の独自FOB日次評価です。信頼度の低い日付付き参考値で、11月11日の実況値やPlatts MOPSではありません。大韓航空発表の11月MOPS参考173.89は9月16日～10月15日平均で、IATA週平均とも期間・地域が異なります。",
    "iata": "IATA/Plattsの11月6日終了週の表では世界航空燃料平均178.95 USD/bbl、前週比-6.6%、アジア・オセアニア163.26（-6.0%）です。製油所価格の世界・地域週平均で、Singapore単一市場の日次値や韓国航空会社の公式MOPS算定平均ではありません。同じ11月6日終了週の表を再確認したもので、新しい日次評価ではありません。初回公開時刻は未提供です。",
    "imo": "IMO131件・船員死亡25人は前回確認した11月9日一覧の過去参考集計です。11月11日08:30 KST前の最新一覧の公開を立証できず、最新確定累計は未確認です。再確認日だけで過去値を最新にはしません。公式資料の過去の件数・事件日の差を解消する訂正も未確認です。中東事件集計はホルムズ全通航数ではありません。",
    "traffic": "Windward11月10日版は11月9日にホルムズ通航6回(入航3・出航3)、AIS送信3・非送信3を観測。正確な日中開始・終了時刻は未提供です。以前の48時間14回と同一期間の増減で比較しません。民間観測は全通航・原油b/d・安全回復の証明ではありません。",
    "context": "EIAは11月5日入力の条件付きシナリオです。サウジパイプライン操業影響なしは当局筋の説明で、迂回供給と船舶安全を区別します。OPEC+11月1日決定は12月要求生産量を9月水準で維持、次回会合11月29日。要求量は実生産・輸出ではありません。",
    "marine": "IMO過去参考131件・死亡25人(11月9日)、最新未確認 | Windward6回=入航3+出航3(11月9日)",
    "heads": [
      "ドル／ウォン1,337.5：11月10日終値は9.6ウォン下落",
      "Brent91.49・WTI86.04：11月10日清算値が下落",
      "Windward：11月9日ホルムズ通航6回を観測",
      "EIA：年末Brent約100、11月5日入力の条件付き予測",
      "サウジパイプライン攻撃：当局筋は操業影響なしと説明"
    ],
    "basis": "11月10日原油清算・ソウル為替と日付を保ったIATA週平均下落は引下げ要因です。公式平均・段階・金額は未確認。",
    "risk": "海上・製品供給リスクが残ります。EIAは11月5日以降を反映せず、パイプライン説明は当局筋の発表です。",
    "impacts": [
      "下落圧力と反発リスクが継続、信頼度は低い。公式段階・金額は未確定。",
      "11月6日IATA週表と民間Singapore参考値を再確認。各日付・範囲を保ち公式MOPSと区別。",
      "前日比9.6ウォン下落は換算費用の下落要因です。",
      "11月10日原油清算は下落。EIA条件付き現物月平均予測とは別です。",
      "IMO131は11月9日の過去参考、最新未確認。Windward6回は安全回復を示しません。"
    ],
    "jetQuestion": "Singapore Jet参考値とIATA週平均は公式MOPSですか？",
    "imoQuestion": "IMO事件集計とWindward通航観測は何を対象としていますか？",
    "publicationUnavailable": "公開時刻未提供",
    "globalLabel": "世界",
    "asiaLabel": "アジア・オセアニア",
    "weekEndingLabel": "週終了",
    "eia": "11月10日公表のEIA STEOは11～12月Brent現物月平均を約100 USD/bblと予測。モデル入力は11月5日締切で、以降の事象を特別に織り込みません。イラン以外の中東の大半が2027年第2四半期末に戦前平均生産へ戻る前提で、製品供給制約は2027年末まで続くと想定。条件付き予測であり現在清算値・航空燃料平均・韓国12月確定額ではありません。",
    "pipeline": "Reutersはサウジ国営メディアがエネルギー省筋を引用し、11月9日Medina地域のEast-West原油パイプライン攻撃と限定火災の消火を発表したと報道。死傷者や操業影響なしも同筋の説明で、独立した流量・操業実測ではありません。9月の過去停止を今回の停止として再利用せず、ホルムズ安全回復とも区別します。"
  },
  "zh": {
    "desc": "11月11日08:30 KST基准的11月附加费及12月展望：区分11月10日市场结算、Windward观测、EIA条件预测及沙特管道声明。",
    "expectation": "12月展望：下行压力与反弹风险持续",
    "dec": "12月计算期为10月16日至11月15日。11月10日原油结算、美元兑韩元及11月6日当周IATA均价下降带来下行压力。海上及成品油供应风险仍在，反弹风险持续，置信度低。官方累计MOPS、期间平均汇率、档位及金额未确认。",
    "fx": "11月10日首尔15:30日间收盘1,337.5 KRW/USD，较前日下降9.6韩元。韩联社Infomax18:09:42 KST报道与Newsis已对照。这是换算成本下行因素，而非实时汇率或12月期间均值，不据此重算公告金额。",
    "oil": "11月10日期货结算为2027年1月Brent91.49 USD/bbl(-1.2%)、2026年12月WTI86.04(-0.9%)。百分比按Bloomberg/Rigzone报道四舍五入并与AFP对照，未直接核验交易所表。原油期货并非航油、官方MOPS或EIA现货月均预测。",
    "jet": "Singapore Jet158.55 USD/bbl（+5.03、+3.3%）为CommodityScope11月6日自有FOB日度评估。此低置信度带日期参考值并非11月11日实时价或Platts MOPS。大韩航空公布的11月MOPS参考173.89对应9月16日至10月15日，与IATA周均价的期间及地域均不同。",
    "iata": "IATA/Platts截至11月6日当周表中，全球航油均价178.95 USD/bbl，环比下降6.6%；亚洲及大洋洲163.26（-6.0%）。这是炼厂价格的全球及地区周均值，并非Singapore单一市场日价或韩国航司官方MOPS计算均值。再次核对同一11月6日当周表，并非新的日度评估；首次发布时间未提供。",
    "imo": "IMO131起事件、25名海员死亡是前次核验11月9日清单的历史参考。无法证实最新清单在11月11日08:30 KST前公开，最新确认累计仍未核实。更新查阅日期不会使旧数成为最新值，也未核实解决历史官方总数及事件日期差异的更正。中东事件统计并非霍尔木兹完整通行量。",
    "traffic": "Windward11月10日版观测11月9日霍尔木兹通行6次(进入3、驶出3)，AIS可见3、关闭3。未提供精确日内起止时刻，不可与此前48小时14次作为同期间增减比较。私人观测并非完整通行量、原油b/d或安全恢复的证据。",
    "context": "EIA展望基于11月5日输入的条件情景。沙特管道无运营影响来自官方消息人士，绕行供应与船舶安全须区分。OPEC+11月1日决定12月要求产量维持9月水平，下次会议11月29日；要求产量不等于实际生产或出口。",
    "marine": "IMO历史参考131起、25人死亡(11月9日)，最新未确认 | Windward6次=进入3+驶出3(11月9日)",
    "heads": [
      "美元兑韩元1,337.5：11月10日收盘下降9.6韩元",
      "Brent91.49、WTI86.04：11月10日期货结算下跌",
      "Windward：11月9日观测霍尔木兹通行6次",
      "EIA：年末Brent约100，基于11月5日输入的条件预测",
      "沙特管道遇袭：官方消息人士称运营未受影响"
    ],
    "basis": "11月10日原油结算、首尔汇率及保留原日期的IATA周均下降带来下行压力。官方均值、档位及金额未确认。",
    "risk": "海上及成品油供应风险仍在。EIA未纳入11月5日之后事件，管道运营情况属于官方消息人士说明。",
    "impacts": [
      "下行压力与反弹风险持续，置信度低。官方档位与金额未确认。",
      "重核11月6日IATA周表与带日期的私人Singapore参考值，保留各自期间与范围。",
      "较前日下降9.6韩元，降低换算成本。",
      "11月10日原油结算下降，与EIA条件性现货月均预测不同。",
      "IMO131为11月9日历史参考，最新未确认。Windward6次不能证明安全恢复。"
    ],
    "jetQuestion": "Singapore Jet参考值和IATA周均价是官方MOPS吗？",
    "imoQuestion": "IMO事件统计与Windward通行观测分别涵盖什么？",
    "publicationUnavailable": "发布时间未提供",
    "globalLabel": "全球",
    "asiaLabel": "亚洲及大洋洲",
    "weekEndingLabel": "周截止",
    "eia": "EIA11月10日STEO预计11—12月Brent现货月均约100 USD/bbl。模型输入截至11月5日，未特别纳入其后事件。假设除伊朗外中东多数产量于2027年第二季度末回到战前平均，成品油供应限制延续至2027年底。这是条件预测，不是当前结算、航油均价或韩国12月确定收费。",
    "pipeline": "Reuters报道沙特国营媒体援引能源部消息人士称，11月9日Medina地区East-West原油管道遇袭、有限火灾已扑灭。无伤亡和运营未受影响也来自该消息人士，并非独立流量或运营实测。不能把9月历史停运当成本次停运，亦不能视为霍尔木兹安全恢复。"
  },
  "fr": {
    "desc": "Novembre et perspectives de décembre au 11 novembre à 08:30 KST : règlements du 10, observations Windward, prévisions EIA et déclaration sur l’oléoduc saoudien.",
    "expectation": "Décembre : pression baissière et risque de rebond persistant",
    "dec": "Le calcul de décembre couvre le 16 octobre–15 novembre. Le recul du pétrole et du USD/KRW du 10 novembre, ainsi que les moyennes IATA de la semaine au 6 novembre, exerce une pression baissière. Risques maritimes et d’offre de produits persistants ; confiance faible. MOPS officiel cumulé, change moyen, niveau et montants restent non confirmés.",
    "fx": "Clôture diurne de Séoul du 10 novembre à 15 h 30 : 1,337.5 KRW/USD, soit -9.6 wons. Yonhap Infomax à 18:09:42 KST a été recoupé avec Newsis. Coût de conversion réduit, sans constituer un cours en direct ou la moyenne de décembre. Aucun recalcul des surtaxes publiées au comptant.",
    "oil": "Règlements du 10 novembre : Brent janvier 2027 à 91.49 USD/bbl (-1.2 %) et WTI décembre 2026 à 86.04 (-0.9 %). Pourcentages arrondis de Bloomberg/Rigzone, recoupés avec AFP, sans vérification directe des tableaux de bourse. Brut à terme, kérosène, MOPS officiel et prévisions mensuelles EIA restent distincts.",
    "jet": "Singapore Jet à 158.55 USD/bbl (+5.03 ; +3.3 %) est l’évaluation FOB quotidienne propre à CommodityScope du 6 novembre. Cette référence datée, de confiance faible, n’est ni un cours du 11 novembre en direct ni Platts MOPS. La référence MOPS de novembre annoncée par Korean Air, 173.89, couvre le 16 septembre–15 octobre, distinct des moyennes IATA.",
    "iata": "Le tableau IATA/Platts de la semaine terminée le 6 novembre indique 178.95 USD/bbl pour le kérosène mondial, soit -6.6 % sur une semaine, et 163.26 pour l’Asie-Océanie (-6.0 %). Moyennes hebdomadaires de prix en raffinerie, elles ne sont ni un cours quotidien de Singapour ni la moyenne MOPS officielle des compagnies coréennes. Le même tableau de la semaine au 6 novembre a été revérifié, sans nouvelle évaluation quotidienne. Heure de première publication inconnue.",
    "imo": "Les 131 incidents et 25 morts de l’OMI sont une référence historique de la liste du 9 novembre vérifiée auparavant. La disponibilité de la dernière liste avant le 11 novembre à 08:30 KST n’est pas établie ; le dernier total confirmé reste inconnu. Une nouvelle consultation ne rend pas ce bilan actuel. Aucun correctif des anciens écarts de nombres ou de dates n’a été vérifié. Ce n’est pas le trafic exhaustif à Hormuz.",
    "traffic": "Windward, édition du 10 novembre, observe six passages à Hormuz le 9 : trois entrants, trois sortants, trois visibles par AIS et trois sans AIS. Les heures exactes de début et de fin manquent. Pas de variation comparable avec les 14 passages antérieurs sur 48 heures. Ni trafic exhaustif, ni pétrole en b/j, ni preuve de sécurité.",
    "context": "Le scénario EIA repose sur les données au 5 novembre. L’absence d’impact sur l’oléoduc saoudien est attribuée à une source officielle ; approvisionnement détourné et sécurité des navires diffèrent. La décision OPEP+ du 1er novembre maintient décembre au niveau requis de septembre, prochaine réunion le 29 novembre. Quotas et production réelle diffèrent.",
    "marine": "OMI historique : 131 incidents, 25 morts (9 nov.), dernier bilan inconnu | Windward : 6=3 entrants+3 sortants (9 nov.)",
    "heads": [
      "USD/KRW 1,337.5 : clôture du 10 novembre en baisse de 9.6 wons",
      "Brent 91.49 ; WTI 86.04 : recul des règlements du 10 novembre",
      "Windward observe six passages à Hormuz le 9 novembre",
      "EIA : Brent de fin d’année proche de 100, prévision arrêtée au 5 novembre",
      "Oléoduc saoudien attaqué : une source officielle dit les opérations intactes"
    ],
    "basis": "Pétrole et change de Séoul du 10 novembre en recul, avec moyennes IATA datées en baisse : pression baissière. Moyennes officielles, niveau et montants non confirmés.",
    "risk": "Risques maritimes et d’offre de produits persistants. EIA exclut les événements après le 5 novembre ; le fonctionnement de l’oléoduc est décrit par une source officielle.",
    "impacts": [
      "Pression baissière et risque de rebond persistant ; confiance faible. Niveau et montants officiels non confirmés.",
      "Tableau IATA au 6 novembre et référence privée de Singapour revérifiés, avec dates et périmètres distincts.",
      "Le recul quotidien de 9.6 wons réduit le coût de conversion.",
      "Les règlements du 10 novembre baissent ; la prévision mensuelle conditionnelle EIA est distincte.",
      "OMI 131 est la référence historique du 9 novembre, dernier bilan inconnu. Six passages Windward ne prouvent pas la sécurité."
    ],
    "jetQuestion": "La référence Singapore Jet et les moyennes IATA sont-elles le MOPS officiel ?",
    "imoQuestion": "Que couvrent le bilan OMI et les observations de passages Windward ?",
    "publicationUnavailable": "Heure de publication non fournie",
    "globalLabel": "Monde",
    "asiaLabel": "Asie-Océanie",
    "weekEndingLabel": "semaine au",
    "eia": "Le STEO EIA publié le 10 novembre prévoit un Brent au comptant proche de 100 USD/bbl en moyenne mensuelle en novembre–décembre. Données du modèle arrêtées au 5 novembre, sans prise en compte spécifique des événements suivants. Il suppose un retour de la plupart des productions du Moyen-Orient hors Iran aux moyennes d’avant-guerre fin T2 2027, avec contraintes sur les produits jusqu’à fin 2027. Prévision conditionnelle, ni règlement actuel, ni moyenne de kérosène, ni surtaxe coréenne confirmée.",
    "pipeline": "Reuters rapporte que les médias d’État saoudiens, citant une source au ministère de l’Énergie, annoncent l’attaque du 9 novembre contre l’oléoduc East-West dans la région de Medina et l’extinction d’un feu limité. L’absence de victimes ou d’impact opérationnel est aussi attribuée à cette source, sans mesure indépendante des flux ou du fonctionnement. L’arrêt de septembre n’est pas un arrêt actuel ni une preuve de sécurité à Hormuz."
  },
  "de": {
    "desc": "November und Dezember-Ausblick zum 11. November, 08:30 KST: Abrechnung vom 10., Windward-Beobachtungen, bedingte EIA-Prognosen und saudische Pipeline-Angaben.",
    "expectation": "Dezember: Abwärtsdruck bei anhaltendem Erholungsrisiko",
    "dec": "Die Dezember-Berechnung umfasst den 16. Oktober–15. November. Niedrigere Öl-Abrechnung und USD/KRW am 10. November sowie IATA-Wochenwerte bis 6. November wirken abwärts. Maritime und Produktrisiken lassen einen Wiederanstieg möglich; geringes Vertrauen. Offizieller kumulierter MOPS, Periodenwechselkurs, Stufe und Beträge bleiben unbestätigt.",
    "fx": "Seouler Tagesschluss am 10. November um 15:30: 1,337.5 KRW/USD, minus 9.6 Won. Yonhap Infomax um 18:09:42 KST wurde mit Newsis abgeglichen. Das senkt Umrechnungskosten, ist aber weder Echtzeitkurs noch Dezember-Durchschnitt. Keine Neuberechnung veröffentlichter Zuschläge zum Kassakurs.",
    "oil": "Abrechnung am 10. November: Brent Januar 2027 bei 91.49 USD/bbl (-1.2 %), WTI Dezember 2026 bei 86.04 (-0.9 %). Gerundete Prozente aus Bloomberg/Rigzone, mit AFP abgeglichen; keine direkte Prüfung der Börsentabellen. Rohöl-Futures, Kerosin, offizieller MOPS und EIA-Monatsprognosen bleiben getrennt.",
    "jet": "Singapore Jet 158.55 USD/bbl (+5.03; +3.3 %) ist CommodityScopes eigene tägliche FOB-Bewertung vom 6. November. Datierte Referenz mit geringem Vertrauen, kein Echtzeitwert vom 11. November und kein Platts MOPS. Korean Airs gemeldete November-MOPS-Referenz 173.89 umfasst den 16. September–15. Oktober und unterscheidet sich von den IATA-Wochenwerten.",
    "iata": "Die IATA/Platts-Tabelle für die Woche bis 6. November zeigt weltweit 178.95 USD/bbl für Kerosin, minus 6.6 % zur Vorwoche, sowie Asien/Ozeanien 163.26 (-6.0 %). Regionale und globale wöchentliche Raffineriepreise, keine täglichen Singapurwerte oder offiziellen MOPS-Berechnungsdurchschnitte koreanischer Airlines. Dieselbe Tabelle für die Woche bis 6. November wurde erneut geprüft, keine neue Tagesbewertung. Erste Veröffentlichungszeit unbekannt.",
    "imo": "Die 131 IMO-Vorfälle und 25 Toten sind eine früher geprüfte historische Referenz der Liste vom 9. November. Eine Veröffentlichung der neuesten Liste vor dem 11. November um 08:30 KST ist unbelegt; der neueste bestätigte Gesamtstand bleibt unbekannt. Ein neues Prüfdatum macht alte Zahlen nicht aktuell. Keine Korrektur historischer Zahlen- und Datumsdifferenzen wurde bestätigt. Keine vollständige Hormus-Verkehrszählung.",
    "traffic": "Windwards Ausgabe vom 10. November beobachtet sechs Hormus-Passagen am 9.: drei einwärts, drei auswärts, drei AIS-sichtbar und drei ohne AIS. Genaue Tagesanfangs- und Endzeiten fehlen. Kein direkter Änderungsvergleich mit zuvor 14 Passagen in 48 Stunden. Weder vollständiger Verkehr noch Öl-b/d oder Sicherheitsnachweis.",
    "context": "EIAs Szenario beruht auf Eingaben bis 5. November. Fehlende Betriebsfolgen der saudischen Pipeline sind einer Behördenquelle zugeschrieben; Umgehungslieferungen und Schiffssicherheit bleiben getrennt. OPEC+ hält laut Beschluss vom 1. November die Dezember-Vorgabe auf Septemberniveau, nächstes Treffen 29. November. Vorgaben sind keine reale Förderung oder Ausfuhr.",
    "marine": "IMO historisch: 131 Vorfälle, 25 Tote (9. Nov.), neuester Stand unbekannt | Windward: 6=3 einwärts+3 auswärts (9. Nov.)",
    "heads": [
      "USD/KRW 1,337.5: Tagesschluss am 10. November um 9.6 Won niedriger",
      "Brent 91.49; WTI 86.04: Abrechnung am 10. November fällt",
      "Windward beobachtet sechs Hormus-Passagen am 9. November",
      "EIA: Brent zum Jahresende nahe 100, mit Daten bis 5. November",
      "Saudische Pipeline angegriffen: Behördenquelle meldet keine Betriebsfolgen"
    ],
    "basis": "Niedrigere Öl-Abrechnung und Seouler Devisen am 10. November sowie datierte schwächere IATA-Wochenwerte wirken abwärts. Offizielle Durchschnitte, Stufe und Beträge unbestätigt.",
    "risk": "Maritime und Produktversorgungsrisiken bleiben. EIA berücksichtigt keine Ereignisse nach 5. November; Pipeline-Angaben stammen von einer Behördenquelle.",
    "impacts": [
      "Abwärtsdruck bei anhaltendem Erholungsrisiko; geringes Vertrauen. Offizielle Stufe und Beträge unbestätigt.",
      "IATA-Woche bis 6. November und private Singapur-Referenz erneut geprüft, mit unveränderten Daten und getrenntem Umfang.",
      "Der Tagesrückgang um 9.6 Won senkt Umrechnungskosten.",
      "Öl-Futures am 10. November fallen; EIAs bedingte Kassa-Monatsprognose ist getrennt.",
      "IMO 131 ist historische Referenz vom 9. November, neuester Stand unbekannt. Sechs Windward-Passagen belegen keine Sicherheit."
    ],
    "jetQuestion": "Sind Singapore-Jet-Referenz und IATA-Wochenwerte offizielles MOPS?",
    "imoQuestion": "Was erfassen IMO-Vorfälle und Windwards Transitbeobachtungen?",
    "publicationUnavailable": "Veröffentlichungszeit nicht angegeben",
    "globalLabel": "Welt",
    "asiaLabel": "Asien/Ozeanien",
    "weekEndingLabel": "Woche bis",
    "eia": "Der EIA-STEO vom 10. November erwartet für November–Dezember Brent-Kassamonatsmittel nahe 100 USD/bbl. Modelleingaben endeten am 5. November; spätere Marktereignisse sind nicht gezielt berücksichtigt. Unterstellt wird die Rückkehr der meisten Nahost-Förderung außerhalb Irans zum Vorkriegsniveau bis Ende Q2 2027, während Produktengpässe bis Ende 2027 bestehen. Bedingte Prognose, kein aktueller Abrechnungspreis, Kerosinmittel oder bestätigter Korea-Zuschlag.",
    "pipeline": "Reuters meldet, dass saudische Staatsmedien unter Berufung auf eine Energieministeriumsquelle einen Angriff am 9. November auf die East-West-Rohölleitung in Medina und einen gelöschten begrenzten Brand berichteten. Keine Opfer oder Betriebsfolgen ist ebenfalls deren Aussage, keine unabhängige Fluss- oder Betriebsmessung. Der September-Stillstand darf nicht als aktueller Zustand oder sichere Hormus-Passage ausgelegt werden."
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
    ['NEWSIS / Korean Air · 2026-10-16', urls.stage],
    ['CommodityScope · 2026-11-06 dated private FOB assessment', urls.jet],
    ['Yonhap Infomax · 2026-11-10 Seoul daytime close', urls.fx],
    ['NEWSIS · 2026-11-10 daytime close corroboration', urls.fxClose],
    ['Bloomberg / Rigzone · 2026-11-10 settlements and contracts', urls.oil],
    ['AFP · 2026-11-10 settlements corroboration', urls.oilCorroboration],
    ['IATA / Platts · week ending 2026-11-06; global and regional weekly refinery-price averages', urls.iata],
    ['IATA / Platts · 2026-11-06 weekly table; historical availability established previously', urls.iataTable],
    ['Windward · 2026-11-10 edition / 2026-11-09 observations; exact intraday window unavailable', urls.traffic],
    ['IMO · historical reference: 2026-11-09 list, 131 incidents / 25 fatalities; latest pre-cutoff publication unconfirmed', urls.imo],
    ['IMO · 2026-11-06 historical release / earlier minimum 130', urls.imoRelease],
    ['EIA · November 2026 STEO, released 2026-11-10; model completed 2026-11-05', urls.eia],
    ['EIA · November 2026 forecast text, available before cutoff', urls.eiaPdf],
    ['EIA · conditional global oil forecast', urls.eiaOil],
    ['EIA · conditional petroleum-product supply outlook', urls.eiaProducts],
    ['Reuters / Business Recorder · 2026-11-09 Saudi ministry-source pipeline account', urls.pipeline],
    ['OPEC · 2026-11-01 production policy, rechecked 2026-11-11', urls.policy],
    ['Air Premia · 2026-10-27 notice / Ningbo effective 2026-11-06', urls.yp]
  ];
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
    questions[3] = questions[3].replace(/1,347\.1/g, '1,337.5');
    questions[5] = c.imoQuestion;
    var update = labels[0] + ': ' + stamp + ' · ' + labels[1] + ': ' + asOf;
    var rowNames = p.rows.map(function (row) { return row[0]; });
    var rows = [
      [rowNames[0], p.status, c.dec],
      [rowNames[1], 'MOPS 173.89 (2026-09-16–10-15) | Singapore Jet 158.55 (2026-11-06) | IATA ' + c.globalLabel + ' 178.95 / ' + c.asiaLabel + ' 163.26 (' + c.weekEndingLabel + ' 2026-11-06) USD/bbl', c.jet + ' ' + c.iata],
      [rowNames[2], '1,337.5 KRW/USD (2026-11-10 15:30 KST; -9.6)', c.fx],
      [rowNames[3], 'Brent 91.49 (2027-01) / WTI 86.04 (2026-12) USD/bbl · 2026-11-10', c.oil],
      [rowNames[4], c.marine, c.imo + ' ' + c.traffic]
    ];
    var answers = [nov, c.dec, c.jet + ' ' + c.iata, c.fx, c.oil, c.imo + ' ' + c.traffic, c.context + ' ' + c.eia];
    r.rows[lang] = rows;
    Object.assign(p, {
      desc: c.desc, sub: update + ' · ' + c.dec, newsSub: update + ' · ' + p.status,
      updated: update, updatedLabel: labels[0], intro: p.status + ' ' + c.dec, rows: rows,
      summary: [p.status, c.dec, rows[1][1], rows[2][1], rows[3][1], c.marine],
      foot: c.jet + ' ' + c.iata + ' ' + nov, basisBody: nov + ' ' + c.jet + ' ' + c.iata,
      verdict1: c.dec, verdict2: c.fx, verdictLong: c.context + ' ' + c.eia,
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
    {key:'fx', name:'Yonhap Infomax', reported:'2026-11-10T18:09:42+09:00', event:'2026-11-10T15:30:00+09:00', verified:'2026-11-11T08:30:59.762+09:00', citations:[urls.fx, urls.fxClose]},
    {key:'oil', name:'Bloomberg / Rigzone', reported:'2026-11-10T21:02:06Z', event:'2026-11-10', modified:'2026-11-10T21:02:06Z', verified:'2026-11-11T08:31:22.507+09:00', citations:[urls.oil, urls.oilCorroboration]},
    {key:'traffic', name:'Windward', reported:'2026-11-10', event:'2026-11-09', publication:null, verification:'provider_tracked_observation', verified:'2026-11-11T08:30:57.110+09:00', modified:'2026-11-10T06:09:03Z'},
    {key:'eia', name:'U.S. EIA', reported:'2026-11-10', event:null, publication:null, verification:'official_conditional_forecast', verified:'2026-11-11T08:31:28.880+09:00', modified:'2026-11-10T16:32:28Z', citations:[urls.eia, urls.eiaPdf, urls.eiaOil, urls.eiaProducts]},
    {key:'pipeline', name:'Reuters / Business Recorder', reported:'2026-11-09T21:59:33+05:00', event:'2026-11-09', modified:'2026-11-09T21:59:33+05:00', verification:'attributed_ministry_source_statement_not_independent_flow_verification', verified:'2026-11-11T08:31:29.145+09:00'}
  ];
  var cards = definitions.map(function (def, i) {
    var card = {
      id:'market-20261111-' + (i + 1), category:['eia', 'pipeline'].indexOf(def.key) >= 0 ? 'institution' : 'market',
      priority:i + 1, date:'2026-11-11', publishedAt:stamp, updatedAt:stamp,
      reportedDate:def.reported, eventDate:def.event || null, dateKind:'site_update',
      sourcePublishedAt: Object.prototype.hasOwnProperty.call(def, 'publication') ? def.publication : def.reported,
      sourceUrl:urls[def.key], citationUrls:def.citations || [urls[def.key]],
      sourceVerificationStatus:def.verification || 'published_source',
      badge:'NEW', aiSummary:true, relevanceScore:1 - i / 100, i18n:{}
    };
    if (def.key === 'traffic') {
      card.observationDate = '2026-11-09'; card.observationStart = null; card.observationEnd = null;
      card.observationWindowNote = 'Only the observation date is supplied; exact intraday boundaries and timezone are unavailable.';
    }
    if (def.key === 'oil') card.corroboratingSourcePublishedAt = '2026-11-10T22:40:10Z';
    if (def.key === 'eia') {
      card.sourceReleaseDate = '2026-11-10';
      card.forecastInputCutoff = '2026-11-05'; card.forecastTargetPeriod = '2026-11/2026-12';
      card.sourcePublicationNote = 'The release date is provided, but its exact publication clock is unavailable. PDF Last-Modified establishes pre-cutoff availability, not first publication.';
      card.sourceLastModifiedUrl = urls.eiaPdf;
    }
    if (def.verified) card.sourceVerifiedAt = def.verified;
    if (def.modified) {
      if (def.key === 'traffic' || def.key === 'eia') card.sourceLastModifiedAt = def.modified;
      else card.sourceUpdatedAt = def.modified;
    }
    if (def.publication === null && !card.sourcePublicationNote) card.sourcePublicationNote = 'Initial publication time is unavailable. Last-Modified establishes pre-cutoff availability, not first publication; the observation date and actual retrieval time are separate.';
    Object.keys(copy).forEach(function (lang) {
      var c = copy[lang], label = captions[lang];
      var dates = label[2] + ': ' + (def.reported || c.publicationUnavailable) + '. ' + (def.publication === null && def.reported ? c.publicationUnavailable + '. ' : '') + (def.event ? label[3] + ': ' + def.event + '. ' : '');
      card.i18n[lang] = {
        title:c.heads[i], aiBrief:c.heads[i], summary:dates + c[def.key], impact:c.dec,
        sourceName:def.name, sourceRefs:card.citationUrls.map(function (url) {
          var name = url === urls.fxClose ? 'NEWSIS' : url === urls.oilCorroboration ? 'AFP' : def.name;
          return {name:name, url:url};
        }), tags:[label[4]], links:[], faq:[]
      };
    });
    card.i18n.cn = card.i18n.zh;
    return card;
  });
  r.newsCards = cards.concat(r.newsCards.filter(function (card) { return !/^market-20261111-/.test(card.id); }));
  window.AERO_MARKET_RELEASE = r;
  window.AERO_MARKET_NUMBERS_LATEST = n;
  if (typeof window.AeroApplyNovemberNoticePeriod20261110 === 'function') window.AeroApplyNovemberNoticePeriod20261110();
})();
