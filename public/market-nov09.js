/* November 9 morning release. The November 6 archive remains intact.
 * Publication clocks, observation dates and the 09:00 KST cutoff are distinct. */
(function () {
  'use strict';
  var r = window.AERO_MARKET_RELEASE, n = window.AERO_MARKET_NUMBERS_20261109;
  if (!r || !n) return;
  var stamp = "2026-11-09T09:13:14+09:00", asOf = n.asOf;
  var urls = {
  "stage": "https://mobile.newsis.com/view_amp.html?ar_id=NISX20261016_0003828757",
  "jet": "https://commodityscope.com/prices/singapore-jet-kerosene",
  "fx": "https://www.khan.co.kr/article/202611061634001/amp",
  "fxClose": "https://files.newsis.com/view/NISX20261106_0003858378",
  "oil": "https://www.rigzone.com/news/wire/oil_posts_biggest_weekly_drop_since_2022-06-nov-2026-185035-article/",
  "oilReuters": "https://www.globalbankingandfinance.com/oil-set-sharp-weekly-drop-middle-east-supply-concerns/",
  "imo": "https://www.imo.org/en/mediacentre/hottopics/pages/middle-east-highlighted-incidents.aspx",
  "imoRelease": "https://www.imo.org/en/mediacentre/pressbriefings/pages/imo-council-c138-urges-stronger-protection-of-seafarers-amid-threats-to-global-shipping-.aspx",
  "imoRemarks": "https://www.imo.org/en/mediacentre/secretarygeneral/pages/council-138th-session-closing-remarks.aspx",
  "traffic": "https://insights.windward.ai/",
  "iraq": "https://gcaptain.com/iraq-has-reached-understandings-with-us-to-allow-oil-exports-through-hormuz/",
  "policy": "https://www.opec.org/pr-detail/620-1-november-2026.html"
};
  var copy = {
  "ko": {
    "desc": "11월 유류할증료와 12월 전망. 11월 6일 원유 정산·서울 환율, 11월 5~6일 Windward 통항 관측, IMO 공식 수치 차이와 이라크 수출 항로 관련 발표를 구분합니다.",
    "expectation": "12월 예상: 인하 압력·반등 위험 혼재",
    "dec": "12월 산정기간은 10월 16일~11월 15일입니다. 11월 4일의 이전 확인 항공유 참고값 하락과 11월 6일 원유 소폭 상승·원/달러 14.5원 상승·해상위험이 엇갈려 인하 압력과 반등 위험이 혼재합니다. 신뢰도는 낮고 공식 누적 MOPS·산정 평균환율·단계·금액은 미확정입니다.",
    "fx": "11월 6일 서울 외환시장 15:30 주간 종가는 1,356.6원/USD로 전일 대비 14.5원(+1.08%) 상승했습니다. 경향신문은 16:34 KST에 보도했습니다. 원화 환산 비용의 상방 압력이며 11월 9일 실시간 환율이나 12월 산정 평균환율이 아닙니다. 항공사 공시액을 현물환율로 다시 계산하지 않습니다.",
    "oil": "11월 6일 선물 정산가는 Brent 2027년 1월물 98.32 USD/bbl(+0.03달러·+0.03%), WTI 2026년 12월물 90.83(+0.31달러·+0.34%)입니다. 계약월·금액은 Rigzone/Bloomberg, 전일 변화는 Reuters 원문 재배포로 확인했습니다. 소폭 상승한 원유 정산값이며 항공유 가격·MOPS 평균·11월 9일 실시간가가 아닙니다.",
    "jet": "Singapore Jet은 이전 확인 참고값인 CommodityScope의 11월 4일 자체 일일 평가 163.89 USD/bbl(-0.63)을 표시합니다. 11월 6일 실행에서 이미 열람한 값을 오늘 일별 표로 다시 대조했습니다. 11월 9일 09:00 KST 기준 최신 평가는 공개시각 미확인으로 보류합니다. 신뢰도 낮은 제3자 평가이며 Platts MOPS나 공식 산정평균이 아닙니다.",
    "imo": "IMO의 11월 6일 기준 목록은 중동 해역 사건 129건·선원 사망 25명, 같은 날 보도자료는 확인 공격 최소 130건·사망 25명으로 서로 다릅니다. 단일 확정 누계는 제시하지 않습니다. VELOS SAPPHIRE 사건일도 목록 11월 4일·보도자료 5일로 차이가 남아 있습니다. 호르무즈만의 집계나 통항 횟수로 해석하지 않습니다. 보도자료는 11월 6일 게시됐지만 목록의 11월 9일 09:00 KST 전 공개시각은 확인되지 않아 목록은 열람 대조용으로만 표시합니다.",
    "traffic": "Windward 11월 6일 판은 11월 5일 18:00~6일 14:00 UTC에 호르무즈 통항 최소 16회(진입 8·출항 8)를 관측했습니다. AIS 송신 13회·비송신 3회입니다. 상단의 11월 5일 기준 표기와 달리 본문의 관측 시간창을 사용합니다. 업체 관측은 전수 통항·원유 b/d·안전 회복의 증거가 아닙니다.",
    "context": "이라크 수출 항로 관련 장관 발언과 관측 통항 증가를 미·이란 합의나 선박안전 정상화로 단정하지 않습니다. OPEC+의 11월 1일 결정은 12월 요구생산량을 9월 수준으로 유지하며 다음 회의는 11월 29일입니다. 요구생산량과 실제 생산·수출량을 구분합니다.",
    "marine": "IMO 목록 129(공개시각 미확인·대조용) / 11월 6일 성명 최소 130·사망 25명, 차이 미해소 | Windward 최소 16회(11월 5~6일 관측)",
    "heads": [
      "원/달러 1,356.6원: 11월 6일 주간 종가 14.5원 상승",
      "Brent 98.32·WTI 90.83: 11월 6일 정산가 소폭 상승",
      "Windward: 11월 5~6일 관측창에서 호르무즈 통항 최소 16회",
      "IMO 사망 25명 확인, 목록 129건·성명 최소 130건 차이",
      "이라크 장관 “미국과 수출 항로 양해”: 실제 통항·안전 확인과 구분"
    ],
    "basis": "11월 4일의 이전 확인 항공유 참고값 하락은 하방 요인입니다. 최신 평가와 공식 기간평균은 미확인입니다.",
    "risk": "원/달러 14.5원 상승과 원유 소폭 상승, 지속되는 해상위험이 상방 요인입니다.",
    "impacts": [
      "인하 압력과 반등 위험 혼재, 신뢰도 낮음. 공식 단계·금액은 미확정입니다.",
      "11월 4일 이전 참고값 163.89를 재대조했습니다. 09시 기준 최신 평가의 공개시각은 미확인입니다.",
      "전일 대비 14.5원 상승으로 원화 환산 비용에 상방 압력이 커졌습니다.",
      "11월 6일 정산가는 소폭 상승했습니다. 원유 선물이며 공식 MOPS 평균이 아닙니다.",
      "IMO 목록·성명 차이를 보존합니다. Windward는 11월 5~6일 제한된 관측창이며 안전 회복을 뜻하지 않습니다."
    ],
    "iraq": "Reuters는 11월 8일 이라크 외무장관이 오만 인근 항로를 통한 이라크 원유 수출에 관해 미국과 양해에 도달했다고 말한 내용을 보도했습니다. 장관 발언에 대한 보도이며 미국의 별도 확인, 실제 추가 수출·통항 또는 선박안전 확보를 독립 검증한 결과는 아닙니다.",
    "imoQuestion": "IMO 목록과 보도자료의 수치는 왜 따로 표시하나요?"
  },
  "en": {
    "desc": "November surcharges and December outlook: November 6 oil settlements and Seoul FX, Windward’s November 5–6 observation window, conflicting IMO totals and Iraq’s statement on an oil-export route.",
    "expectation": "December outlook: downward pressure and rebound risks coexist",
    "dec": "December is calculated over October 16–November 15. The earlier November 4 jet reference fell, while November 6 crude edged up, USD/KRW rose 14.5 won and maritime risks persist. Downward pressure and rebound risks coexist, with low confidence. Official cumulative MOPS, average FX, stage and amounts remain unconfirmed.",
    "fx": "The November 6 Seoul 15:30 daytime close was 1,356.6 KRW/USD, up 14.5 won (1.08%), reported by Kyunghyang at 16:34 KST. This adds upward conversion pressure, but is neither a live November 9 rate nor the December calculation-period average. Airline notices are not recalculated at spot FX.",
    "oil": "November 6 futures settlements: January 2027 Brent 98.32 USD/bbl, up 0.03 (0.03%); December 2026 WTI 90.83, up 0.31 (0.34%). Rigzone/Bloomberg verifies contracts and levels; a Reuters republication verifies daily changes. These slightly higher crude settlements are not jet prices, MOPS averages or live November 9 quotes.",
    "jet": "Singapore Jet shows an earlier verified reference: CommodityScope’s November 4 private daily assessment of 163.89 USD/bbl, down 0.63. It was already read during the November 6 run and checked again against today’s daily table. The latest assessment at November 9, 09:00 KST is withheld because its publication time is unverified. Low-confidence third-party data, not Platts MOPS or an official average.",
    "imo": "IMO’s list as of November 6 records 129 Middle East incidents and 25 seafarer deaths; its same-day press release states at least 130 verified attacks and 25 deaths. No single reconciled total is asserted. VELOS SAPPHIRE is dated November 4 in the list and November 5 in the release. Neither count is Hormuz-only traffic. The press release was published on November 6. Publication of the list before November 9 at 09:00 KST is unverified, so the list is shown only for comparison with the release.",
    "traffic": "Windward’s November 6 edition observed at least 16 Hormuz crossings, eight inbound and eight outbound, from November 5 at 18:00 to November 6 at 14:00 UTC. Thirteen transmitted AIS and three did not. The body’s explicit window takes precedence over the page’s November 5 header. Provider coverage is not exhaustive traffic, crude b/d or proof of restored safety.",
    "context": "Iraq’s route statement and more observed crossings do not establish a US–Iran agreement or restored shipping safety. OPEC+’s November 1 decision keeps December required production at September levels; the next meeting is November 29. Required production is distinct from actual output and exports.",
    "marine": "IMO list: 129 (publication unverified; comparison only) / Nov 6 release: at least 130, 25 fatalities; unresolved | Windward: at least 16 (Nov 5–6 window)",
    "heads": [
      "USD/KRW 1,356.6: November 6 daytime close rises 14.5 won",
      "Brent 98.32; WTI 90.83: November 6 settlements edge higher",
      "Windward: at least 16 Hormuz crossings in the November 5–6 window",
      "IMO confirms 25 deaths; list 129 and release at least 130 remain unreconciled",
      "Iraqi minister reports US route understandings: passage and safety remain unverified"
    ],
    "basis": "The earlier November 4 jet reference fell. The latest assessment and official period average remain unconfirmed.",
    "risk": "A 14.5-won USD/KRW rise, slightly higher crude and persistent maritime risks add upward pressure.",
    "impacts": [
      "Downward pressure and rebound risks coexist, with low confidence. Official stage and amounts unconfirmed.",
      "Earlier November 4 reference of 163.89 rechecked; publication time of the latest assessment at 09:00 remains unverified.",
      "The daily 14.5-won rise increases upward pressure on won conversion costs.",
      "November 6 crude settlements edged up. Futures prices are not the official MOPS average.",
      "IMO list and release disagree. Windward covers a limited November 5–6 window, not restored shipping safety."
    ],
    "iraq": "Reuters reported on November 8 that Iraq’s foreign minister said understandings had been reached with the US to allow Iraqi oil exports via a shipping lane near Oman. This is an attributed ministerial statement, not separate US confirmation or independent verification of added exports, completed passages or shipping safety.",
    "imoQuestion": "Why are the IMO list and press-release totals shown separately?"
  },
  "ja": {
    "desc": "11月の燃油サーチャージと12月見通し。11月6日の原油清算値・ソウル為替、Windwardの5～6日観測、IMO公式件数の相違、イラクの輸出航路に関する発言を区別します。",
    "expectation": "12月予想：引き下げ圧力と反発リスクが混在",
    "dec": "12月の算定期間は10月16日～11月15日です。以前確認した11月4日の航空燃料参考値下落に対し、6日の原油小幅上昇・USD/KRW14.5ウォン上昇・海上リスクが上方要因です。引き下げ圧力と反発リスクが混在し、信頼度は低いままです。公式累積MOPS・平均為替・段階・金額は未確定です。",
    "fx": "11月6日ソウル15:30の日中終値は1,356.6 KRW/USD、前日比14.5ウォン（1.08%）上昇。京郷新聞の16:34 KST報道です。換算費用への上昇圧力ですが、9日のリアルタイム値や12月算定平均ではありません。公示額を直物為替で再計算しません。",
    "oil": "11月6日先物清算値はBrent 2027年1月限98.32 USD/bbl（+0.03、+0.03%）、WTI 2026年12月限90.83（+0.31、+0.34%）。契約月と価格はRigzone/Bloomberg、前日比はReuters再配信で確認。原油の小幅上昇であり、航空燃料価格・MOPS平均・11月9日の現在値ではありません。",
    "jet": "Singapore Jetは以前確認したCommodityScope 11月4日の民間日次評価163.89 USD/bbl（-0.63）を表示します。6日の実行時に既に閲覧済みで、今日の日別表と再照合しました。11月9日09:00 KST時点の最新評価は公開時刻未確認のため保留。信頼度の低い第三者評価でPlatts MOPSや公式平均ではありません。",
    "imo": "IMOの11月6日時点一覧は中東事件129件・船員死亡25人ですが、同日報道発表は確認攻撃少なくとも130件・死亡25人です。整合した単一件数は示しません。VELOS SAPPHIREの事件日も一覧4日・発表5日で相違があります。ホルムズだけの通航数ではありません。 報道発表は11月6日公開ですが、一覧の11月9日09:00 KST以前の公開時刻は未確認のため、一覧は閲覧時の照合用としてのみ表示します。",
    "traffic": "Windward 11月6日版は5日18:00～6日14:00 UTCにホルムズ通航少なくとも16回（入域8・出域8）を観測。AIS送信13回、非送信3回です。ページ上部の5日基準表記と区別し、本文の時間窓を使用します。全通航数・原油b/d・安全回復を示すものではありません。",
    "context": "イラクの航路に関する発言や観測通航の増加から米イラン合意・船舶安全正常化は確認できません。OPEC+の11月1日決定は12月要求生産量を9月水準に維持し、次回会合は29日。実生産・輸出量とは区別します。",
    "marine": "IMO一覧129件（公開時刻未確認・照合用）/ 11月6日発表は最低130件・死者25人、差は未解消 | Windward最低16回（11月5～6日観測）",
    "heads": [
      "USD/KRW 1,356.6：11月6日日中終値は14.5ウォン上昇",
      "Brent 98.32・WTI 90.83：11月6日清算値は小幅上昇",
      "Windward：11月5～6日の観測窓でホルムズ通航少なくとも16回",
      "IMOは死者25人確認、一覧129件と発表少なくとも130件は不一致",
      "イラク外相が米国との輸出航路了解を表明：通航・安全確認とは区別"
    ],
    "basis": "以前確認した11月4日の航空燃料参考値下落は下方要因。最新評価と公式期間平均は未確認です。",
    "risk": "USD/KRW14.5ウォン上昇、原油小幅上昇、継続する海上リスクが上方要因です。",
    "impacts": [
      "引き下げ圧力と反発リスクが混在、信頼度低。公式段階・金額は未確定。",
      "以前の11月4日参考値163.89を再照合。09時時点の最新評価の公開時刻は未確認。",
      "前日比14.5ウォン上昇でウォン換算費用の上昇圧力が拡大。",
      "11月6日原油清算値は小幅上昇。公式MOPS平均ではありません。",
      "IMO一覧と発表の相違を保持。Windwardは5～6日の限られた観測で安全回復の証明ではありません。"
    ],
    "iraq": "Reutersは11月8日、イラク外相がオマーン付近の航路による石油輸出について米国と了解に達したと述べたと報道。外相の発言であり、米国側の別途確認、実際の追加輸出・通航、船舶安全を独立検証した結果ではありません。",
    "imoQuestion": "IMO一覧と報道発表の件数を分けて表示するのはなぜですか？"
  },
  "zh": {
    "desc": "11月燃油附加费及12月展望：区分11月6日原油结算与首尔汇率、Windward的5至6日观测窗口、IMO官方数量差异，以及伊拉克出口航路声明。",
    "expectation": "12月预期：下调压力与反弹风险并存",
    "dec": "12月计算期为10月16日至11月15日。此前确认的11月4日航空煤油参考值下降，而6日原油小涨、美元兑韩元上涨14.5韩元及海上风险带来上行压力。下调压力与反弹风险并存，置信度低。官方累计MOPS、平均汇率、档位和金额未确定。",
    "fx": "11月6日首尔15:30日间收盘为1,356.6 KRW/USD，较前日上涨14.5韩元（1.08%），京乡新闻于16:34 KST报道。此为韩元换算成本上行因素，并非9日实时汇率或12月计算期均值，不据此重算航司公示收费。",
    "oil": "11月6日期货结算：2027年1月Brent为98.32 USD/bbl（+0.03、+0.03%），2026年12月WTI为90.83（+0.31、+0.34%）。Rigzone/Bloomberg核实合约和价格，Reuters转载核实日变动。这是小幅上涨的原油结算价，不是航空煤油、MOPS均价或9日实时价格。",
    "jet": "Singapore Jet显示此前确认的CommodityScope 11月4日私人日度评估163.89 USD/bbl（-0.63）。该值已在6日执行时阅览，今日再次与日表核对。11月9日09:00 KST最新评估因公开时间未确认而暂缓采用。此低置信度第三方评估不是Platts MOPS或官方均价。",
    "imo": "IMO截至11月6日的中东列表为129起事件、25名船员死亡，同日新闻稿则称确认攻击至少130起、死亡25人。两者未核对一致，不提供单一确定总数。VELOS SAPPHIRE事件日期也为列表4日、新闻稿5日。不能作为霍尔木兹单一海峡通行次数。 新闻稿于11月6日发布；清单是否在11月9日09:00 KST前公开尚未证实，因此清单仅供查阅对照。",
    "traffic": "Windward 11月6日版在5日18:00至6日14:00 UTC观测霍尔木兹通行至少16次：进入8次、离开8次；AIS发送13次、未发送3次。采用正文明确时间窗，与页首截至5日的标注区分。服务商观测不等于全量通航、原油b/d或安全恢复。",
    "context": "伊拉克航路声明及通行观测增加不能证明美伊达成协议或安全恢复。OPEC+11月1日决定维持12月要求产量在9月水平，下次会议为29日；要求产量与实际产量、出口量分别看待。",
    "marine": "IMO清单129起（公开时间未确认·仅供对照）/11月6日声明至少130起、25人死亡，差异未解决 | Windward至少16次（11月5—6日观测）",
    "heads": [
      "美元兑韩元1,356.6：11月6日日间收盘上涨14.5韩元",
      "Brent 98.32、WTI 90.83：11月6日结算小涨",
      "Windward：11月5至6日窗口观测霍尔木兹通行至少16次",
      "IMO确认死亡25人，列表129起与新闻稿至少130起存在差异",
      "伊拉克外长称与美达成出口航路谅解：通行与安全另行核实"
    ],
    "basis": "此前确认的11月4日航空煤油参考值下降形成下调压力；最新评估和官方期间均价仍未确认。",
    "risk": "美元兑韩元上涨14.5韩元、原油小涨及持续海上风险形成上行压力。",
    "impacts": [
      "下调压力与反弹风险并存，置信度低。官方档位与金额未确定。",
      "重新核对此前11月4日参考值163.89；09时最新评估的公开时间未确认。",
      "较前日上涨14.5韩元，增大韩元换算成本的上行压力。",
      "11月6日原油结算小涨，并非官方MOPS均价。",
      "保留IMO列表和新闻稿差异；Windward仅为5至6日有限窗口观测，不证明安全恢复。"
    ],
    "iraq": "Reuters于11月8日报道，伊拉克外长表示已与美国就通过阿曼附近航路出口伊拉克石油达成谅解。这是外长的说法，并非美国另行确认，也不是对新增实际出口、完成通行或船舶安全的独立核实。",
    "imoQuestion": "为什么分开展示IMO清单与新闻稿中的统计？"
  },
  "fr": {
    "desc": "Surtaxes de novembre et perspectives de décembre : pétrole et change du 6 novembre, fenêtre Windward des 5–6, divergence des chiffres OMI et déclaration irakienne sur une route d’exportation.",
    "expectation": "Décembre : pressions baissières et risque de rebond coexistent",
    "dec": "Le calcul de décembre couvre le 16 octobre–15 novembre. La référence kérosène antérieure du 4 novembre a baissé, mais le brut a légèrement progressé le 6, USD/KRW a gagné 14.5 wons et les risques maritimes persistent. Pressions baissières et risque de rebond coexistent, confiance faible. MOPS officiel, change moyen, niveau et montants non confirmés.",
    "fx": "Clôture diurne de Séoul le 6 novembre à 15 h 30 : 1,356.6 KRW/USD, soit +14.5 wons (+1.08 %), selon Kyunghyang à 16:34 KST. La conversion se renchérit. Ce n’est ni le cours en direct du 9 novembre ni le change moyen de décembre ; les surtaxes publiées ne sont pas recalculées au comptant.",
    "oil": "Règlements du 6 novembre : Brent janvier 2027 à 98.32 USD/bbl (+0.03 ; +0.03 %) et WTI décembre 2026 à 90.83 (+0.31 ; +0.34 %). Rigzone/Bloomberg confirme prix et contrats, une reprise Reuters les variations quotidiennes. Brut légèrement haussier, ni kérosène, ni moyenne MOPS, ni cours en direct du 9 novembre.",
    "jet": "Singapore Jet affiche la référence antérieure vérifiée CommodityScope du 4 novembre : 163.89 USD/bbl (-0.63). Déjà consultée lors de l’exécution du 6, elle a été recoupée avec le tableau quotidien aujourd’hui. La dernière évaluation au 9 novembre à 09:00 KST est écartée faute d’heure de publication vérifiée. Confiance faible, ni Platts MOPS ni moyenne officielle.",
    "imo": "La liste OMI au 6 novembre compte 129 incidents au Moyen-Orient et 25 marins décédés ; son communiqué du même jour annonce au moins 130 attaques vérifiées et 25 morts. Aucun total unique réconcilié n’est présenté. VELOS SAPPHIRE est daté du 4 dans la liste, du 5 dans le communiqué. Ce ne sont pas des passages limités à Hormuz. Le communiqué a été publié le 6 novembre. La publication de la liste avant le 9 novembre à 09:00 KST n’est pas établie ; la liste sert uniquement à la comparaison.",
    "traffic": "L’édition Windward du 6 novembre observe au moins 16 passages à Hormuz, huit entrées et huit sorties, du 5 à 18:00 au 6 à 14:00 UTC : 13 avec AIS, trois sans. La fenêtre explicite du texte est distincte de l’en-tête au 5 novembre. Ni trafic exhaustif, ni débit de brut en b/j, ni preuve de sécurité retrouvée.",
    "context": "La déclaration irakienne et davantage de passages observés ne prouvent ni accord américano-iranien ni retour de la sécurité. L’OPEP+ maintient, selon sa décision du 1er novembre, la production requise de décembre au niveau de septembre ; prochaine réunion le 29. À distinguer de la production et des exportations effectives.",
    "marine": "Liste OMI : 129 (publication non établie, comparaison seule) / communiqué du 6 nov. : au moins 130, 25 morts ; écart non résolu | Windward : au moins 16 (fenêtre du 5–6 nov.)",
    "heads": [
      "USD/KRW 1,356.6 : clôture du 6 novembre en hausse de 14.5 wons",
      "Brent 98.32 ; WTI 90.83 : légère hausse des règlements du 6 novembre",
      "Windward : au moins 16 passages à Hormuz dans la fenêtre des 5–6 novembre",
      "OMI : 25 morts confirmés, divergence entre liste 129 et communiqué au moins 130",
      "Ministre irakien : arrangements avec les États-Unis sur une route, sécurité non vérifiée"
    ],
    "basis": "La référence kérosène antérieure du 4 novembre a baissé ; dernière évaluation et moyenne officielle restent non confirmées.",
    "risk": "USD/KRW en hausse de 14.5 wons, brut légèrement plus cher et risques maritimes persistants poussent à la hausse.",
    "impacts": [
      "Pressions baissières et risque de rebond coexistent, confiance faible. Niveau et montants non confirmés.",
      "Référence antérieure du 4 novembre à 163.89 recoupée ; heure de publication de la dernière à 09:00 non vérifiée.",
      "La hausse quotidienne de 14.5 wons accentue la pression sur les coûts convertis.",
      "Légère hausse des règlements du 6 novembre, ni moyenne MOPS officielle ni prix de kérosène.",
      "Divergence OMI conservée. Windward couvre une fenêtre limitée des 5–6, sans prouver le retour de la sécurité."
    ],
    "iraq": "Reuters rapporte le 8 novembre que le ministre irakien des Affaires étrangères affirme avoir trouvé des arrangements avec les États-Unis pour exporter du pétrole par une route proche d’Oman. Déclaration attribuée, sans confirmation américaine distincte ni vérification indépendante d’exportations supplémentaires, de passages effectués ou de sécurité maritime.",
    "imoQuestion": "Pourquoi distinguer les totaux de la liste et du communiqué de l’OMI ?"
  },
  "de": {
    "desc": "November-Zuschläge und Dezember-Ausblick: Öl und Seoul-Wechselkurs vom 6. November, Windward-Zeitfenster 5.–6. November, widersprüchliche IMO-Zahlen und Iraks Aussage zu einer Exportroute.",
    "expectation": "Dezember: Abwärtsdruck und Wiederanstiegsrisiken zugleich",
    "dec": "Der Dezember-Berechnungszeitraum läuft vom 16. Oktober bis 15. November. Die frühere Kerosinreferenz vom 4. fiel; Rohöl stieg am 6. leicht, USD/KRW um 14.5 Won, maritime Risiken bleiben. Abwärtsdruck und Wiederanstiegsrisiken bestehen zugleich, bei geringem Vertrauen. Offizielles MOPS, Durchschnittskurs, Stufe und Beträge sind unbestätigt.",
    "fx": "Seouler Tagesschluss am 6. November um 15:30: 1,356.6 KRW/USD, plus 14.5 Won (1.08 %), laut Kyunghyang um 16:34 KST. Das erhöht die Umrechnungskosten. Kein Echtzeitkurs vom 9. oder Dezember-Durchschnitt; veröffentlichte Airline-Zuschläge werden nicht zum Kassakurs neu berechnet.",
    "oil": "Abrechnung am 6. November: Brent Januar 2027 bei 98.32 USD/bbl (+0.03; +0.03 %), WTI Dezember 2026 bei 90.83 (+0.31; +0.34 %). Rigzone/Bloomberg belegt Preise und Kontrakte, eine Reuters-Weiterveröffentlichung die Tagesänderungen. Leicht höhere Rohölpreise, keine Kerosinpreise, MOPS-Mittelwerte oder Echtzeitkurse vom 9. November.",
    "jet": "Singapore Jet zeigt die früher geprüfte CommodityScope-Tagesbewertung vom 4. November: 163.89 USD/bbl (-0.63). Schon beim Lauf am 6. gelesen und heute mit der Tagestabelle abgeglichen. Die neueste Bewertung zum 9. November um 09:00 KST bleibt wegen unbestätigter Veröffentlichungszeit unberücksichtigt. Geringes Vertrauen, weder Platts MOPS noch amtlicher Durchschnitt.",
    "imo": "Die IMO-Liste zum 6. November nennt 129 Nahost-Vorfälle und 25 getötete Seeleute; die Pressemitteilung desselben Tages nennt mindestens 130 bestätigte Angriffe und 25 Tote. Kein abgeglichener Einzelgesamtwert. VELOS SAPPHIRE steht in der Liste am 4., in der Mitteilung am 5. November. Keine reine Hormus-Passagezählung. Die Pressemitteilung wurde am 6. November veröffentlicht. Eine Veröffentlichung der Liste vor dem 9. November um 09:00 KST ist nicht belegt; die Liste dient nur zum Abgleich.",
    "traffic": "Windwards Ausgabe vom 6. November beobachtet mindestens 16 Hormus-Passagen, acht einwärts und acht auswärts, vom 5. um 18:00 bis 6. um 14:00 UTC: 13 mit AIS, drei ohne. Das ausdrücklich genannte Zeitfenster unterscheidet sich vom Seitenkopf zum 5. November. Kein vollständiger Verkehr, Rohöldurchsatz in b/d oder Sicherheitsnachweis.",
    "context": "Iraks Routenaussage und mehr beobachtete Passagen belegen weder ein US-iranisches Abkommen noch wiederhergestellte Sicherheit. OPEC+ hält laut Beschluss vom 1. November die Dezember-Fördervorgabe auf September-Niveau; nächstes Treffen am 29. Vorgaben sind von tatsächlicher Förderung und Ausfuhr zu unterscheiden.",
    "marine": "IMO-Liste: 129 (Veröffentlichung unbelegt, nur Abgleich) / Mitteilung vom 6. Nov.: mindestens 130, 25 Tote; Differenz ungeklärt | Windward: mindestens 16 (Fenster 5.–6. Nov.)",
    "heads": [
      "USD/KRW 1,356.6: Tagesschluss am 6. November um 14.5 Won höher",
      "Brent 98.32; WTI 90.83: leichte Zunahme zur Abrechnung am 6. November",
      "Windward: mindestens 16 Hormus-Passagen im Zeitfenster 5.–6. November",
      "IMO bestätigt 25 Tote; Liste 129 und Mitteilung mindestens 130 widersprechen sich",
      "Irakischer Minister meldet Routenverständigung mit USA: Passage und Sicherheit unbestätigt"
    ],
    "basis": "Die frühere Kerosinreferenz vom 4. November sank; neueste Bewertung und offizieller Durchschnitt bleiben unbestätigt.",
    "risk": "USD/KRW um 14.5 Won höher, leicht steigendes Rohöl und anhaltende maritime Risiken wirken aufwärts.",
    "impacts": [
      "Abwärtsdruck und Wiederanstiegsrisiken zugleich, geringes Vertrauen. Stufe und Beträge unbestätigt.",
      "Frühere Referenz vom 4. November bei 163.89 abgeglichen; Veröffentlichungszeit der neuesten um 09:00 unbestätigt.",
      "Der Tagesanstieg um 14.5 Won verstärkt den Aufwärtsdruck auf Umrechnungskosten.",
      "Leicht höhere Rohöl-Abrechnung am 6. November, kein offizieller MOPS-Durchschnitt.",
      "IMO-Abweichung bleibt sichtbar. Windward erfasst ein begrenztes Zeitfenster 5.–6. November, keinen Sicherheitsnachweis."
    ],
    "iraq": "Reuters berichtete am 8. November, Iraks Außenminister habe eine Verständigung mit den USA über irakische Ölexporte entlang einer Route nahe Oman bekanntgegeben. Eine zugeschriebene Ministeraussage, keine gesonderte US-Bestätigung oder unabhängige Prüfung zusätzlicher Ausfuhren, abgeschlossener Passagen oder sicherer Schifffahrt.",
    "imoQuestion": "Warum werden die Zahlen der IMO-Liste und der Pressemitteilung getrennt dargestellt?"
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
    "CommodityScope · 2026-11-04 earlier verified private assessment",
    "https://commodityscope.com/prices/singapore-jet-kerosene"
  ],
  [
    "Kyunghyang · 2026-11-06 Seoul daytime close",
    "https://www.khan.co.kr/article/202611061634001/amp"
  ],
  [
    "NEWSIS · 2026-11-07 report / 2026-11-06 close",
    "https://files.newsis.com/view/NISX20261106_0003858378"
  ],
  [
    "Bloomberg / Rigzone · 2026-11-06 settlements and contracts",
    "https://www.rigzone.com/news/wire/oil_posts_biggest_weekly_drop_since_2022-06-nov-2026-185035-article/"
  ],
  [
    "Reuters / Global Banking & Finance · 2026-11-06 settlements",
    "https://www.globalbankingandfinance.com/oil-set-sharp-weekly-drop-middle-east-supply-concerns/"
  ],
  [
    "Windward · 2026-11-06 edition / 2026-11-05 18:00–2026-11-06 14:00 UTC observations",
    "https://insights.windward.ai/"
  ],
  [
    "IMO · list as at 2026-11-06 / 129 incidents, 25 fatalities; cutoff publication unverified, comparison only",
    "https://www.imo.org/en/mediacentre/hottopics/pages/middle-east-highlighted-incidents.aspx"
  ],
  [
    "IMO · 2026-11-06 release / at least 130 attacks, 25 fatalities; discrepancy unresolved",
    "https://www.imo.org/en/mediacentre/pressbriefings/pages/imo-council-c138-urges-stronger-protection-of-seafarers-amid-threats-to-global-shipping-.aspx"
  ],
  [
    "IMO · 2026-11-06 closing remarks",
    "https://www.imo.org/en/mediacentre/secretarygeneral/pages/council-138th-session-closing-remarks.aspx"
  ],
  [
    "Reuters / gCaptain · 2026-11-08 Iraqi minister statement",
    "https://gcaptain.com/iraq-has-reached-understandings-with-us-to-allow-oil-exports-through-hormuz/"
  ],
  [
    "OPEC · 2026-11-01 production policy, rechecked 2026-11-09",
    "https://www.opec.org/pr-detail/620-1-november-2026.html"
  ]
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
    questions[2] = questions[2].replace(/164\.52/g, '163.89');
    questions[3] = questions[3].replace(/1,342\.1/g, '1,356.6');
    questions[5] = c.imoQuestion;
    var update = labels[0] + ': ' + stamp + ' · ' + labels[1] + ': ' + asOf;
    var rowNames = p.rows.map(function (row) { return row[0]; });
    var rows = [
      [rowNames[0], p.status, c.dec],
      [rowNames[1], 'MOPS 173.89 USD/bbl (2026-09-16–10-15) | Singapore Jet 163.89 USD/bbl (2026-11-04)', c.jet],
      [rowNames[2], '1,356.6 KRW/USD (2026-11-06 15:30 KST; +14.5)', c.fx],
      [rowNames[3], 'Brent 98.32 (2027-01) / WTI 90.83 (2026-12) USD/bbl · 2026-11-06', c.oil],
      [rowNames[4], c.marine, c.imo + ' ' + c.traffic]
    ];
    var answers = [nov, c.dec, c.jet, c.fx, c.oil, c.imo + ' ' + c.traffic, c.context];
    r.rows[lang] = rows;
    Object.assign(p, {
      desc: c.desc, sub: update + ' · ' + c.dec, newsSub: update + ' · ' + p.status,
      updated: update, updatedLabel: labels[0], intro: p.status + ' ' + c.dec, rows: rows,
      summary: [p.status, c.dec, rows[1][1], rows[2][1], rows[3][1], c.marine],
      foot: c.jet + ' ' + nov, basisBody: nov + ' ' + c.jet,
      verdict1: c.dec, verdict2: c.fx, verdictLong: c.context + ' ' + c.iraq,
      note: c.dec, officialNotice: update + ' · ' + p.status,
      keyVars: [p.status, rows[1][1], rows[2][1], rows[3][1], c.marine],
      faq: questions.map(function (q, i) { return {q: q, a: answers[i]}; })
    });
    var overview = p.forecastOverview;
    p.forecastOverview = Object.assign({}, overview, {
      modifiedAt: stamp, informationCutoff: n.informationCutoff, expectation: c.expectation, basis: c.basis, risk: c.risk,
      rows: [
        [overview.rows[0][0], c.expectation, c.impacts[0]],
        [rowNames[1], 'MOPS 173.89 | Singapore Jet 163.89 USD/bbl (2026-11-04)', c.impacts[1]],
        [rowNames[2], rows[2][1], c.impacts[2]],
        [rowNames[3], rows[3][1], c.impacts[3]],
        [rowNames[4], c.marine, c.impacts[4]]
      ], rowTones: ['hold', 'down', 'up', 'up', 'up']
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
    {key:'fx', name:'Kyunghyang', reported:'2026-11-06T16:34+09:00', event:'2026-11-06T15:30:00+09:00', citations:[urls.fx, urls.fxClose]},
    {key:'oil', name:'Bloomberg / Rigzone', reported:'2026-11-06T21:05:21Z', event:'2026-11-06', citations:[urls.oil, urls.oilReuters]},
    {key:'traffic', name:'Windward', reported:'2026-11-06', period:'2026-11-05T18:00:00Z/2026-11-06T14:00:00Z', publication:null, verification:'provider_tracked_observation', verified:'2026-11-09T09:03:54+09:00', modified:'2026-11-06T15:37:28Z'},
    {key:'imo', name:'IMO', reported:'2026-11-06', verification:'official_sources_disagree_unresolved', citations:[urls.imoRelease, urls.imo, urls.imoRemarks]},
    {key:'iraq', name:'Reuters / gCaptain', reported:'2026-11-08T14:30:33-08:00', event:'2026-11-08', verification:'attributed_official_claim_not_independently_verified', modified:'2026-11-08T14:30:38-08:00'}
  ];
  var claimLabels = {ko:'당사자 발언·독립 미확인',en:'Attributed statement, not independently verified',ja:'当事者発言・独立未確認',zh:'当事方声明·未经独立核实',fr:'Déclaration attribuée, non vérifiée indépendamment',de:'Zugeschriebene Aussage, nicht unabhängig bestätigt'};
  var cards = definitions.map(function (def, i) {
    var card = {
      id:'market-20261109-' + (i + 1), category:['imo', 'iraq'].indexOf(def.key) >= 0 ? 'institution' : 'market',
      priority:i + 1, date:'2026-11-09', publishedAt:stamp, updatedAt:stamp,
      reportedDate:def.reported, eventDate:def.event || null, dateKind:'site_update',
      sourcePublishedAt: Object.prototype.hasOwnProperty.call(def, 'publication') ? def.publication : def.reported,
      sourceUrl:def.key === 'imo' ? urls.imoRelease : urls[def.key], citationUrls:def.citations || [urls[def.key]],
      sourceVerificationStatus:def.verification || 'published_source',
      badge:'NEW', aiSummary:true, relevanceScore:1 - i / 100, i18n:{}
    };
    if (def.period) card.observationPeriod = def.period;
    if (def.key === 'traffic') { card.observationStart = '2026-11-05T18:00:00Z'; card.observationEnd = '2026-11-06T14:00:00Z'; }
    if (def.key === 'imo') { card.countAsOf = '2026-11-06'; card.eventDateBySource = {incidentList:'2026-11-04', pressRelease:'2026-11-05'}; card.sourcePublicationNote = 'The press release is explicitly dated November 6; its exact publication clock is unavailable. The incident list has an as-at date, not a publication date; availability before the cutoff is unverified, so the list is included for comparison only.'; }
    if (def.key === 'oil') card.corroboratingSourceUpdatedAt = '2026-11-06T21:47:23Z';
    if (def.verified) card.sourceVerifiedAt = def.verified;
    if (def.modified) { if (def.key === 'traffic') card.sourceLastModifiedAt = def.modified; else card.sourceUpdatedAt = def.modified; }
    if (def.publication === null) card.sourcePublicationNote = 'Dated edition or count; exact publication clock is not provided. HTTP Last-Modified, where present, is separate.';
    Object.keys(copy).forEach(function (lang) {
      var c = copy[lang], label = captions[lang];
      var dates = label[2] + ': ' + def.reported + (def.event ? ' · ' + label[3] + ': ' + def.event : '') + '. ';
      card.i18n[lang] = {
        title:c.heads[i], aiBrief:c.heads[i], summary:dates + c[def.key], impact:c.dec,
        sourceName:def.name, sourceRefs:card.citationUrls.map(function (url) {
          var name = url === urls.fxClose ? 'NEWSIS' : url === urls.oilReuters ? 'Reuters / Global Banking & Finance' : def.name;
          return {name:name, url:url};
        }), tags:[def.key === 'iraq' ? claimLabels[lang] : label[4]], links:[], faq:[]
      };
    });
    card.i18n.cn = card.i18n.zh;
    return card;
  });
  r.newsCards = cards.concat(r.newsCards.filter(function (card) { return !/^market-20261109-/.test(card.id); }));
  window.AERO_MARKET_RELEASE = r;
  window.AERO_MARKET_NUMBERS_LATEST = n;
})();
