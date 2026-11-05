/* November 5 morning release. New observations extend the November 4 release;
 * archived articles retain their original objects, sources and timestamps. */
(function () {
  'use strict';
  var r = window.AERO_MARKET_RELEASE, n = window.AERO_MARKET_NUMBERS_20261105;
  if (!r || !n) return;
  var stamp = '2026-11-05T09:06:24+09:00', asOf = n.asOf;
  var urls = {
    stage: 'https://mobile.newsis.com/view_amp.html?ar_id=NISX20261016_0003828757',
    fx: 'https://files.newsis.com/view/NISX20261104_0003854868',
    oil: 'https://www.channelnewsasia.com/business/oil-slumps-after-midterm-election-rebuke-trump-raises-bets-iran-war-exit-6519506',
    brentContract: n.brentContractSourceUrl,
    wtiContract: n.wtiContractSourceUrl,
    jet: 'https://commodityscope.com/prices/singapore-jet-kerosene',
    imo: 'https://www.imo.org/en/mediacentre/hottopics/pages/middle-east-highlighted-incidents.aspx',
    traffic: 'https://insights.windward.ai/',
    workshop: 'https://www.opec.org/pr-detail/621-4-november-2026.html',
    policy: 'https://www.opec.org/pr-detail/620-1-november-2026.html',
    claim: 'https://www.marketscreener.com/news/iran-s-irgc-says-four-tankers-ablaze-after-hitting-mines-near-strait-of-hormuz-ce785fdede8cf325',
    inventory: 'https://www.eia.gov/petroleum/supply/weekly/archive/2026/2026_11_04/download/table6.csv',
    inventoryRelease: 'https://www.eia.gov/petroleum/supply/weekly/archive/2026/2026_11_04/wpsr_2026_11_04.php',
    flows: 'https://uk.marketscreener.com/news/gulf-oil-flows-dip-in-october-from-post-iran-war-high-data-shows-ce785fdedb8ff525',
    talks: 'https://mofa.gov.qa/en/qatar/latest-articles/latest-news/details/2026/11/03/advisor-to-prime-minister--official-spokesperson-for-ministry-of-foreign-affairs--qatar-continues-its-efforts-to-bridge-gap-between-washington--tehran'
  };
  var copy = {
    ko: {
      desc: '11월 유류할증료와 12월 전망. 11월 4일 원유 급락·환율 소폭 상승, 11월 3일 Singapore Jet 참고가격과 호르무즈 통항, 공식 항공유 재고를 구분해 확인합니다.',
      dec: '12월 산정기간은 10월 16일~11월 15일입니다. 단기 원유·항공유 참고가격 하락은 보합~인하 가능성을 뒷받침하지만, 원/달러 소폭 상승과 해상안전 위험은 상방 요인입니다. 공식 누적 MOPS·산정 평균환율·단계·금액은 미확정이며 전망 신뢰도는 낮습니다.',
      fx: '11월 4일 서울 외환시장 15:30 종가는 1,341.5원/USD로 전일보다 0.5원 상승했습니다. 뉴시스 15:48:20 보도 기준입니다. 원화 환산 부담의 소폭 상방 요인이며, 11월 5일 실시간 환율이나 12월 산정 평균환율이 아닙니다. 현물환율로 공시액을 다시 계산하지 않습니다.',
      oil: '11월 4일 원유 선물 정산가는 Brent 94.62 USD/bbl(-8.98달러·-8.7%), WTI 88.12(-7.97달러·-8.3%)입니다. Brent는 2027년 1월물, WTI는 2026년 12월물입니다. Reuters/CNA 기사는 11월 5일 05:21:40 KST에 정산 내용을 반영했습니다. 협상 기대를 반영한 가격 하락과 실제 합의·통항 안전은 별개이며 MOPS 산정 평균도 아닙니다.',
      jet: 'CommodityScope의 11월 3일 FOB Singapore Jet Kerosene 자체 일일 평가는 164.52 USD/bbl, 신뢰도 낮음입니다. 제3자 참고가격이며 Platts MOPS나 12월 공식 산정 평균, 항공사 확정 부과액을 뜻하지 않습니다.',
      imo: 'IMO 공식 페이지를 다시 확인한 결과 집계 기준은 11월 3일, 중동 해역 확인 사건 128건과 선원 사망 24명입니다. 새 11월 5일 사건 수가 아니며 호르무즈만의 집계나 선박 통항 건수와 합산하지 않습니다.',
      traffic: 'Windward 11월 4일 판은 11월 3일 관측한 호르무즈 통과 3건(진입 1·진출 2)을 제시합니다. 출항에는 AIS 송신 제품유선 1척과 비송신 화물선 1척이 포함됩니다. 업체 관측 범위의 통항이며 전수 통항량·원유 b/d 또는 항행 안전 회복을 뜻하지 않습니다.',
      workshop: 'OPEC은 11월 4일 IEA·IEF·OPEC 공동 기술 워크숍에서 해상 에너지 흐름, 운송·보험과 시장 안정을 논의했다고 발표했습니다. 운송·보험 비용에 대한 논의이며 새 증산·감산 결정이 아닙니다. 11월 1일 발표한 12월 요구 생산량 정책과 구분합니다.',
      claim: 'Reuters는 11월 4일 이란 혁명수비대가 남쪽 통항로에서 유조선 4척이 기뢰에 부딪혀 파괴·화재가 났고 다른 선박 2척을 나포했다고 주장한 내용을 전했습니다. 이는 당사자 발표를 보도한 것으로, 이번 확인 범위에서 선박 신원·피해·나포 결과는 독립 검증되지 않았습니다. IMO 사건 수에 더하거나 확정 공급 손실로 환산하지 않습니다.',
      inventory: 'EIA가 11월 4일 공개한 주간 자료에서 미국 등유형 항공유 기말 재고는 10월 30일 41.782백만 배럴로, 10월 23일 42.217에서 0.435백만 배럴 감소했습니다. 미국 재고 통계이며 Singapore Jet 가격·MOPS 평균·세계 항공유 부족량이 아닙니다.',
      flows: 'Reuters의 11월 3일 보도에서 Vortexa는 10월 걸프 원유·콘덴세이트·정제품 수출(LPG 제외)을 17.1백만 b/d, 9월을 18.9로 추정했습니다. 10월 원유·콘덴세이트는 14.0, 정제품은 3.1입니다. Kpler의 별도 범위(호르무즈·홍해·오만만 원유·콘덴세이트)는 16.1 대 17.09입니다. 양사 모두 이란을 제외하며 추후 상향 수정될 수 있습니다. 호르무즈 단일 해협의 확정 유량이나 안전 정상화 수치가 아닙니다.',
      context: '카타르의 11월 3일 공식 발표는 제안 검토와 중재 지속이며 구체적 돌파구를 확정하지 않았습니다. 이후 나온 당사자 주장과 가격 움직임도 합의·휴전·안전 정상화를 입증하지 않습니다.',
      marine: 'IMO 128건·24명 사망 (11월 3일 기준) | Windward 3건 (11월 3일 관측)',
      heads: ['원/달러 1,341.5원 · 11월 4일 종가 소폭 상승', 'Brent 94.62·WTI 88.12 · 11월 4일 정산 급락', 'Singapore Jet 164.52 · 11월 3일 자체 평가', 'Windward: 11월 3일 호르무즈 통과 3건 관측', 'IEA·IEF·OPEC 해상 에너지 워크숍 · 생산정책 변경 아님', '이란, 유조선 4척 파괴·선박 2척 나포 주장 · 독립확인 안 됨', 'EIA: 미국 항공유 재고 41.782백만 배럴 · 10월 30일', '10월 걸프 석유 수출 감소 추정 · 추적 범위·수정 가능성 구분'],
      basis: '원유 급락과 항공유 참고가격 하락은 인하 압력입니다.',
      risk: '원/달러 소폭 상승과 지속되는 해상안전 위험은 반등·인상 요인입니다.',
      impacts: ['보합~인하 가능성이나 신뢰도 낮음. 공식 단계·금액은 미확정입니다.', '항공유 참고가격 하락은 인하 요인. 민간 일일 평가는 공식 MOPS 평균을 대체하지 않습니다.', '전일보다 0.5원 상승해 원화 환산 부담의 소폭 상방 요인. 산정기간 평균은 미확정입니다.', '원유 급락은 인하 압력. 11월 4일 정산가이며 MOPS 평균이나 합의 확정 근거가 아닙니다.', '해상안전 위험은 상방 요인. IMO 중동 사건과 Windward 관측 통항의 범위를 구분합니다.']
    },
    en: {
      desc: 'November surcharges and the December outlook: November 4 oil settlements and FX, November 3 Singapore Jet and Hormuz observations, and official US jet-fuel stocks, with their different scopes preserved.',
      dec: 'December’s calculation period is October 16–November 15. Lower short-term crude and jet-fuel references support unchanged or lower surcharges, while a small USD/KRW rise and maritime risks exert upward pressure. Official cumulative MOPS, period-average FX, the level and amounts remain unconfirmed; confidence is low.',
      fx: 'The November 4 Seoul 15:30 close was 1,341.5 KRW/USD, up 0.5 from the previous session, reported by NEWSIS at 15:48:20. The rise adds slight upward pressure to KRW conversion costs. It is neither November 5 live FX nor December’s period-average rate and does not reprice published charges.',
      oil: 'November 4 crude futures settlements: Brent 94.62 USD/bbl, down 8.98 dollars (8.7%); WTI 88.12, down 7.97 (8.3%). Brent is the January 2027 contract and WTI December 2026. Reuters/CNA updated the settlement report at 05:21:40 KST on November 5. Prices reflecting hopes for talks do not establish an agreement or safe shipping; these are not MOPS averages.',
      jet: 'CommodityScope’s November 3 proprietary daily FOB Singapore Jet Kerosene assessment is 164.52 USD/bbl, with low confidence. It is a third-party reference, not Platts MOPS, December’s official average or a confirmed airline charge.',
      imo: 'A fresh check of IMO’s official page still shows 128 confirmed Middle East incidents and 24 seafarer fatalities as at November 3. These are not new November 5 totals, a Hormuz-only count or numbers to add to vessel crossings.',
      traffic: 'Windward’s November 4 edition records three observed Hormuz crossings on November 3: one inbound and two outbound. The outbound observations include one AIS-visible product tanker and one dark cargo vessel. This provider’s observations are not an exhaustive traffic count, crude barrels per day or confirmation of safe navigation.',
      workshop: 'OPEC said November 4 that an IEA–IEF–OPEC technical workshop discussed maritime energy flows, shipping, insurance and market stability. This was a discussion of transport and insurance costs, not a new production increase or cut. It is separate from the December required-output policy announced November 1.',
      claim: 'Reuters reported November 4 that Iran’s Revolutionary Guard claimed four tankers had been destroyed by mines and remained ablaze on a southern passage, and that two other vessels were seized. This reports a party’s statement. Vessel identities, damage and seizure outcomes were not independently verified in this review. Do not add the claim to IMO totals or convert it into established supply losses.',
      inventory: 'EIA’s November 4 weekly release puts US kerosene-type jet-fuel ending stocks at 41.782 million barrels on October 30, down 0.435 million from 42.217 on October 23. These are US inventories, not Singapore Jet prices, MOPS averages or a global jet-fuel shortfall.',
      flows: 'Reuters reported November 3 that Vortexa estimated October Gulf crude, condensate and refined-product exports excluding LPG at 17.1 million b/d, versus 18.9 in September. October crude and condensate were 14.0 and products 3.1. Kpler’s different series—crude and condensate via Hormuz, the Red Sea and Gulf of Oman—was 16.1 versus 17.09. Both exclude Iran and may be revised upward. These are not confirmed Hormuz-only flows or evidence of safe shipping.',
      context: 'Qatar’s November 3 official statement described continued mediation and proposal review without a specific breakthrough. Subsequent party claims and price moves do not prove a deal, ceasefire or normalization of safety.',
      marine: 'IMO: 128 incidents, 24 fatalities (Nov 3 baseline) | Windward: 3 crossings (Nov 3 observations)',
      heads: ['USD/KRW 1,341.5: small rise at November 4 close', 'Brent 94.62; WTI 88.12: sharp November 4 settlement falls', 'Singapore Jet 164.52: November 3 private assessment', 'Windward observes three Hormuz crossings on November 3', 'IEA–IEF–OPEC maritime workshop: no production-policy change', 'Iran claims four tankers destroyed and two vessels seized; unverified', 'EIA: US jet-fuel stocks 41.782 million barrels on October 30', 'Estimated October Gulf exports fall; scopes and revisions matter'],
      basis: 'The sharp crude decline and lower jet-fuel reference prices exert downward pressure.',
      risk: 'A small USD/KRW rise and continuing maritime risks support rebound and surcharge-rise risk.',
      impacts: ['Unchanged or lower surcharges are possible, with low confidence. The official level and amounts remain unconfirmed.', 'Lower jet-fuel references support easing. Private daily assessments cannot replace official MOPS averages.', 'The 0.5-won daily rise adds slight upward conversion pressure. Period-average FX remains unconfirmed.', 'The sharp crude fall supports easing. November 4 settlements are not MOPS averages or proof of a deal.', 'Maritime safety risks exert upward pressure. Distinguish IMO regional incidents from Windward’s observed crossings.']
    },
    ja: {
      desc: '11月の燃油サーチャージと12月見通し。11月4日の原油清算値と為替、3日の航空燃料参考価格・ホルムズ通過、米国の公式航空燃料在庫を区別します。',
      dec: '12月算定期間は10月16日～11月15日です。短期の原油・航空燃料参考価格下落は横ばい～引き下げを支える一方、ドル／ウォンの小幅上昇と海上リスクは上昇要因です。公式累積MOPS、期間平均為替、段階・金額は未確定で、予想の信頼度は低い状態です。',
      fx: 'NEWSISが15:48:20に報じた11月4日ソウル15:30終値は1 USD＝1,341.5 KRW、前日比0.5ウォン上昇です。ウォン換算負担の小幅な上昇要因です。11月5日の現在値や12月算定平均ではなく、公示額の再計算には使いません。',
      oil: '11月4日原油先物清算値：Brent 94.62 USD/bbl（8.98ドル・8.7%下落）、WTI 88.12（7.97ドル・8.3%下落）。Brentは2027年1月限、WTIは2026年12月限です。Reuters/CNAは11月5日05:21:40 KSTに清算値を反映しました。協議への期待による価格下落は合意や航行安全の確認ではなく、MOPS平均でもありません。',
      jet: 'CommodityScopeの11月3日FOB Singapore Jet Kerosene独自日次評価は164.52 USD/bbl、信頼度は低いとされています。第三者参考価格であり、Platts MOPS、12月公式算定平均、確定した航空会社の料金ではありません。',
      imo: 'IMO公式ページを再確認したところ、11月3日現在の中東海域確認事案128件、船員死亡24人です。11月5日の新集計でもホルムズだけの件数でもなく、船舶通過数と合算しません。',
      traffic: 'Windwardの11月4日版は、11月3日のホルムズ通過観測3件（入域1・出域2）を報告。出域にはAIS送信中の石油製品タンカー1隻と非送信貨物船1隻が含まれます。同社の観測であり、全通過数、原油の日量、安全回復の証明ではありません。',
      workshop: 'OPECは11月4日、IEA・IEF・OPEC共同技術ワークショップで海上エネルギー輸送、海運、保険、市場安定を議論したと発表しました。輸送・保険費用の協議であり、新たな増産・減産決定ではありません。11月1日発表の12月要求生産量政策と区別します。',
      claim: 'Reutersは11月4日、イラン革命防衛隊が南側航路でタンカー4隻が機雷で破壊され炎上し、別の2隻を拿捕したと主張したことを報じました。当事者声明の報道であり、今回の確認範囲では船名、被害、拿捕結果を独立検証できていません。IMO件数に加えたり確定供給損失に換算したりしません。',
      inventory: 'EIAの11月4日週報では米国の灯油型ジェット燃料期末在庫が10月30日に41.782百万バレル、23日の42.217から0.435百万減少しました。米国在庫であり、Singapore Jet価格、MOPS平均、世界の航空燃料不足量ではありません。',
      flows: 'Reutersの11月3日報道でVortexaは10月の湾岸原油・コンデンセート・石油製品輸出（LPG除外）を17.1百万b/d、9月を18.9と推定。10月原油・コンデンセート14.0、製品3.1です。Kplerの別範囲（ホルムズ・紅海・オマーン湾の原油・コンデンセート）は16.1対17.09。両社ともイランを除外し、上方修正の可能性があります。ホルムズ単独の確定流量や安全回復を示しません。',
      context: 'カタールの11月3日公式声明は仲介継続と提案検討であり、具体的な打開を確認していません。その後の当事者主張や相場変動も、合意・停戦・安全正常化の証拠ではありません。',
      marine: 'IMO 128件・死亡24人（11月3日基準）| Windward 3件（11月3日観測）',
      heads: ['ドル／ウォン1,341.5：11月4日終値は小幅上昇', 'Brent 94.62・WTI 88.12：11月4日清算値が急落', 'Singapore Jet 164.52：11月3日独自評価', 'Windward：11月3日にホルムズ通過3件を観測', 'IEA・IEF・OPEC海上輸送協議：生産政策変更ではない', 'イランがタンカー4隻破壊・2隻拿捕を主張：独立未確認', 'EIA：米航空燃料在庫41.782百万バレル、10月30日', '10月湾岸輸出減少の推定：範囲と修正可能性を区別'],
      basis: '原油急落と航空燃料参考価格の下落は引き下げ圧力です。',
      risk: 'ドル／ウォン小幅上昇と海上リスクの継続は反発・引き上げ要因です。',
      impacts: ['横ばい～引き下げの可能性がありますが信頼度は低く、公式段階・金額は未確定です。', '航空燃料参考価格下落は緩和要因。民間日次評価は公式MOPS平均を代替しません。', '前日比0.5ウォン上昇は換算負担の小幅な上昇要因。算定期間平均は未確定です。', '原油急落は引き下げ圧力。11月4日清算値であり、MOPS平均や合意の証明ではありません。', '海上リスクは上昇要因。IMOの地域事案とWindwardの通過観測は範囲が異なります。']
    },
    zh: {
      desc: '11月燃油附加费与12月展望：区分11月4日原油结算价及汇率、3日航空煤油参考价和霍尔木兹通行观测，以及美国官方航空煤油库存。',
      dec: '12月计算期为10月16日至11月15日。短期原油及航空煤油参考价下降支持持平至下调，但美元兑韩元小幅上涨及海上风险带来上行压力。官方累计MOPS、期间平均汇率、档位及金额均未确定，预测置信度低。',
      fx: 'NEWSIS于15:48:20报道，11月4日首尔15:30收盘为1美元兑1,341.5韩元，较前一交易日上涨0.5韩元，对韩元换算成本构成小幅上行压力。这不是11月5日实时汇率或12月计算期均值，不能重算已公布收费。',
      oil: '11月4日原油期货结算：Brent 94.62 USD/bbl，下跌8.98美元（8.7%）；WTI 88.12，下跌7.97美元（8.3%）。Brent为2027年1月合约，WTI为2026年12月合约。Reuters/CNA于11月5日05:21:40 KST更新结算报道。谈判预期引发的跌价不等于达成协议或航行安全恢复，也不是MOPS均价。',
      jet: 'CommodityScope对11月3日FOB Singapore Jet Kerosene的自有日度评估为164.52 USD/bbl，置信度低。这是第三方参考价，并非Platts MOPS、12月官方计算均价或航司确定收费。',
      imo: '重新核查IMO官方页面后，统计基准仍为11月3日：中东海域确认事件128起、海员死亡24人。不是11月5日新增统计，也非仅限霍尔木兹，不能与船舶通行数相加。',
      traffic: 'Windward 11月4日版记录11月3日霍尔木兹通行观测3次，进入1次、离开2次。离开船舶包括1艘发送AIS信号的成品油船和1艘未发送信号的货船。它是该机构观测范围的通行数，不是全量通行、原油桶/日或安全恢复的证明。',
      workshop: 'OPEC 11月4日称，IEA、IEF、OPEC联合技术研讨会讨论海上能源运输、航运、保险及市场稳定。此为运输和保险成本讨论，并非新的增减产决定，应与11月1日公布的12月要求产量政策区分。',
      claim: 'Reuters 11月4日报道伊朗革命卫队声称，4艘油船在南部航道触雷被毁且仍起火，另有2艘船被扣押。这是对当事方声明的报道；本次核查未独立证实船舶身份、损害或扣押结果。不能加到IMO统计中或换算为已确认供应损失。',
      inventory: 'EIA于11月4日公布的周报显示，美国煤油型喷气燃料期末库存10月30日为41.782百万桶，比10月23日的42.217减少0.435百万桶。这是美国库存，并非Singapore Jet价格、MOPS均值或全球航空燃料缺口。',
      flows: 'Reuters 11月3日报道，Vortexa估计10月海湾原油、凝析油和成品油出口（不含LPG）为17.1百万桶/日，9月为18.9；10月原油及凝析油14.0，成品油3.1。Kpler另一个统计范围（霍尔木兹、红海、阿曼湾原油及凝析油）为16.1对17.09。两者均不含伊朗，且可能上修，并非霍尔木兹单一海峡的确定流量或安全正常化证据。',
      context: '卡塔尔11月3日官方声明称继续调解及审议提案，未确认具体突破。此后当事方说法和价格波动也不能证明协议、停火或安全恢复。',
      marine: 'IMO 128起、24人死亡（11月3日基准）| Windward 3次（11月3日观测）',
      heads: ['美元兑韩元1,341.5：11月4日收盘小幅上涨', 'Brent 94.62、WTI 88.12：11月4日结算大跌', 'Singapore Jet 164.52：11月3日私人评估', 'Windward：11月3日观测霍尔木兹通行3次', 'IEA、IEF、OPEC海运研讨会：不是产量政策变更', '伊朗声称4艘油船被毁、2艘被扣：未经独立证实', 'EIA：10月30日美国航空煤油库存41.782百万桶', '10月海湾石油出口下降估计：须区分范围及修订可能'],
      basis: '原油大跌及航空煤油参考价下降带来下调压力。',
      risk: '美元兑韩元小幅上涨及持续海上风险保留反弹、上调可能。',
      impacts: ['可能持平至下调，但置信度低，官方档位及金额未确定。', '航空煤油参考价下降支持下调，私人日度评估不能替代官方MOPS均价。', '较前日上涨0.5韩元，对换算成本形成小幅上行压力。期间平均汇率未确定。', '原油大跌支持下调；11月4日结算价不是MOPS均价或达成协议的证明。', '海上安全风险带来上行压力，须区分IMO地区事件与Windward通行观测范围。']
    },
    fr: {
      desc: 'Surtaxes de novembre et perspectives de décembre : règlements pétroliers et change du 4 novembre, kérosène et passages observés le 3, stocks américains officiels, avec des périmètres distincts.',
      dec: 'La période de calcul de décembre va du 16 octobre au 15 novembre. Le recul à court terme du brut et du kérosène de référence favorise stabilité ou baisse, tandis que la légère hausse USD/KRW et les risques maritimes poussent à la hausse. MOPS cumulé officiel, change moyen, niveau et montants restent non confirmés ; confiance faible.',
      fx: 'Clôture de Séoul du 4 novembre à 15 h 30 : 1,341.5 KRW/USD, en hausse de 0.5 won, selon NEWSIS à 15:48:20. Cela renchérit légèrement la conversion en wons. Ce n’est ni un cours en direct du 5 novembre ni le change moyen de décembre ; les tarifs publiés ne sont pas recalculés au comptant.',
      oil: 'Règlements du 4 novembre : Brent 94.62 USD/bbl, en baisse de 8.98 dollars (8.7 %) ; WTI 88.12, en baisse de 7.97 (8.3 %). Le Brent correspond à janvier 2027, le WTI à décembre 2026. Reuters/CNA a actualisé le règlement le 5 novembre à 05:21:40 KST. Les espoirs de négociation ne prouvent ni accord ni sécurité maritime ; ces cours ne sont pas une moyenne MOPS.',
      jet: 'L’évaluation quotidienne propre à CommodityScope du 3 novembre pour FOB Singapore Jet Kerosene est de 164.52 USD/bbl, avec une confiance faible. Référence tierce, elle ne constitue ni Platts MOPS, ni moyenne officielle de décembre, ni surtaxe confirmée.',
      imo: 'La nouvelle consultation de la page officielle de l’OMI retrouve 128 incidents confirmés au Moyen-Orient et 24 marins décédés, au 3 novembre. Il ne s’agit pas d’un nouveau total du 5 novembre ni d’Hormuz seul ; ne pas additionner ces incidents aux passages de navires.',
      traffic: 'L’édition Windward du 4 novembre rapporte trois passages observés à Hormuz le 3 : une entrée et deux sorties. Les sorties comprennent un transporteur de produits pétroliers visible en AIS et un cargo sans signal. Ce périmètre d’observation n’est ni un décompte exhaustif, ni un débit de brut, ni une preuve de sécurité retrouvée.',
      workshop: 'L’OPEP a annoncé le 4 novembre un atelier technique AIE–IEF–OPEP sur les flux énergétiques maritimes, le transport, l’assurance et la stabilité des marchés. Cette discussion des coûts ne constitue pas une nouvelle décision de hausse ou de baisse de production. Elle est distincte de la politique de décembre annoncée le 1er novembre.',
      claim: 'Reuters a rapporté le 4 novembre l’affirmation des Gardiens de la révolution iraniens selon laquelle quatre pétroliers auraient été détruits par des mines et resteraient en feu sur un passage sud, et deux autres navires auraient été saisis. Il s’agit d’une déclaration de partie. Identités, dommages et saisies ne sont pas indépendamment vérifiés dans cet examen ; ne pas les ajouter au total OMI ni en déduire une perte confirmée d’approvisionnement.',
      inventory: 'Le rapport hebdomadaire EIA publié le 4 novembre établit les stocks américains de carburéacteur de type kérosène à 41.782 millions de barils au 30 octobre, en baisse de 0.435 million par rapport aux 42.217 du 23 octobre. Stocks américains, et non prix de Singapour, moyenne MOPS ou déficit mondial de kérosène.',
      flows: 'Reuters a rapporté le 3 novembre l’estimation Vortexa des exportations du Golfe en octobre : 17.1 millions b/j de brut, condensats et produits raffinés hors GPL, contre 18.9 en septembre. Brut et condensats : 14.0 ; produits : 3.1. La série Kpler, différente, couvre brut et condensats via Hormuz, mer Rouge et golfe d’Oman : 16.1 contre 17.09. Les deux excluent l’Iran et peuvent être révisées à la hausse. Ce n’est pas le débit confirmé d’Hormuz seul ni un constat de sécurité.',
      context: 'Le communiqué officiel qatari du 3 novembre décrit une médiation et l’examen de propositions, sans percée précise confirmée. Les déclarations ultérieures et les cours ne prouvent ni accord, ni cessez-le-feu, ni normalisation de la sécurité.',
      marine: 'OMI : 128 incidents, 24 morts (base du 3 nov.) | Windward : 3 passages (observés le 3 nov.)',
      heads: ['USD/KRW 1,341.5 : légère hausse à la clôture du 4 novembre', 'Brent 94.62 ; WTI 88.12 : forte baisse des règlements du 4 novembre', 'Kérosène Singapour 164.52 : évaluation privée du 3 novembre', 'Windward observe trois passages à Hormuz le 3 novembre', 'Atelier maritime AIE–IEF–OPEP : pas de changement de production', 'Iran : quatre pétroliers détruits et deux navires saisis selon une affirmation non vérifiée', 'EIA : stocks de kérosène US de 41.782 millions de barils au 30 octobre', 'Exportations du Golfe estimées en baisse : périmètres et révisions à distinguer'],
      basis: 'La forte baisse du brut et le recul du kérosène de référence exercent une pression à la baisse.',
      risk: 'La légère hausse USD/KRW et les risques maritimes persistants favorisent un rebond ou une hausse.',
      impacts: ['Stabilité ou baisse possible, avec une confiance faible. Niveau et montants officiels non confirmés.', 'Le recul du kérosène favorise une baisse. Une évaluation privée ne remplace pas la moyenne MOPS officielle.', 'La hausse quotidienne de 0.5 won renchérit légèrement la conversion. Le change moyen reste non confirmé.', 'Le recul du brut favorise une baisse. Règlements du 4 novembre, ni moyenne MOPS ni preuve d’accord.', 'Les risques maritimes poussent à la hausse. Incidents régionaux de l’OMI et passages observés par Windward ont des périmètres distincts.']
    },
    de: {
      desc: 'November-Zuschläge und Dezember-Ausblick: Öl-Abrechnung und Wechselkurs vom 4. November, Kerosinreferenz und Hormus-Beobachtungen vom 3. sowie amtliche US-Kerosinbestände, jeweils mit eigenem Umfang.',
      dec: 'Der Dezember-Berechnungszeitraum läuft vom 16. Oktober bis 15. November. Kurzfristig niedrigere Rohöl- und Kerosinreferenzpreise begünstigen unveränderte oder niedrigere Zuschläge; der leichte USD/KRW-Anstieg und maritime Risiken wirken aufwärts. Offizielles kumuliertes MOPS, Durchschnittskurs, Stufe und Beträge sind unbestätigt; geringes Vertrauen.',
      fx: 'Seouler Schlusskurs am 4. November um 15:30: 1,341.5 KRW/USD, 0.5 Won höher als am Vortag, laut NEWSIS um 15:48:20. Dies erhöht die Umrechnungsbelastung leicht. Kein Echtzeitkurs vom 5. November oder Dezember-Durchschnitt; veröffentlichte Zuschläge werden nicht zum Kassakurs neu berechnet.',
      oil: 'Abrechnung am 4. November: Brent 94.62 USD/bbl, minus 8.98 Dollar (8.7 %); WTI 88.12, minus 7.97 (8.3 %). Brent betrifft Januar 2027, WTI Dezember 2026. Reuters/CNA aktualisierte den Abrechnungsbericht am 5. November um 05:21:40 KST. Verhandlungshoffnungen im Preis belegen weder ein Abkommen noch sichere Schifffahrt; dies sind keine MOPS-Mittelwerte.',
      jet: 'CommodityScopes eigene tägliche Bewertung für FOB Singapore Jet Kerosene vom 3. November beträgt 164.52 USD/bbl, bei geringem Vertrauen. Diese Drittanbieterreferenz ist weder Platts MOPS noch offizieller Dezember-Durchschnitt oder bestätigter Airline-Zuschlag.',
      imo: 'Die erneute Prüfung der offiziellen IMO-Seite ergibt weiterhin 128 bestätigte Nahost-Vorfälle und 24 getötete Seeleute zum 3. November. Keine neue Gesamtzahl vom 5. November, keine reine Hormus-Zählung und nicht mit Schiffspassagen zu addieren.',
      traffic: 'Windwards Ausgabe vom 4. November nennt drei beobachtete Hormus-Passagen am 3.: eine einwärts, zwei auswärts. Auswärts wurden ein AIS-sichtbarer Produktentanker und ein Frachter ohne Signal erfasst. Dies ist eine Anbieterbeobachtung, kein vollständiger Verkehrszähler, Rohöldurchsatz oder Nachweis sicherer Passage.',
      workshop: 'OPEC teilte am 4. November mit, ein gemeinsamer technischer IEA–IEF–OPEC-Workshop habe maritime Energieflüsse, Transport, Versicherung und Marktstabilität behandelt. Die Kostendiskussion ist kein neuer Beschluss zur Produktionssteigerung oder -kürzung. Sie ist von der am 1. November angekündigten Dezember-Fördervorgabe zu trennen.',
      claim: 'Reuters berichtete am 4. November die Behauptung der iranischen Revolutionsgarden, vier Tanker seien auf einer südlichen Passage durch Minen zerstört worden und brennten weiter; zwei weitere Schiffe seien beschlagnahmt worden. Das ist eine Parteiaussage. Identitäten, Schäden und Beschlagnahmen sind in dieser Prüfung nicht unabhängig bestätigt; nicht zum IMO-Gesamtstand addieren oder in gesicherte Lieferausfälle umrechnen.',
      inventory: 'Der am 4. November veröffentlichte EIA-Wochenbericht nennt US-Endbestände an kerosinartigem Flugturbinenkraftstoff von 41.782 Mio. Barrel am 30. Oktober, 0.435 Mio. weniger als die 42.217 vom 23. Oktober. US-Bestände sind weder Singapore-Jet-Preise noch MOPS-Mittelwerte oder weltweite Kerosinfehlmengen.',
      flows: 'Reuters berichtete am 3. November Vortexas Oktober-Schätzung für Golfexporte von Rohöl, Kondensat und Raffinerieprodukten ohne LPG: 17.1 Mio. b/d gegenüber 18.9 im September; Rohöl und Kondensat 14.0, Produkte 3.1. Kplers anders abgegrenzte Reihe für Rohöl und Kondensat über Hormus, Rotes Meer und Golf von Oman nennt 16.1 gegenüber 17.09. Beide schließen Iran aus und können aufwärts revidiert werden. Kein bestätigter reiner Hormus-Durchsatz oder Sicherheitsnachweis.',
      context: 'Katars offizielle Erklärung vom 3. November beschreibt fortgesetzte Vermittlung und die Prüfung von Vorschlägen ohne bestätigten konkreten Durchbruch. Spätere Parteiaussagen und Preisbewegungen belegen weder Abkommen noch Waffenruhe oder normalisierte Sicherheit.',
      marine: 'IMO: 128 Vorfälle, 24 Tote (Stand 3. Nov.) | Windward: 3 Passagen (Beobachtung 3. Nov.)',
      heads: ['USD/KRW 1,341.5: leichter Anstieg zum Schluss am 4. November', 'Brent 94.62; WTI 88.12: starker Rückgang am 4. November', 'Singapore Jet 164.52: private Bewertung vom 3. November', 'Windward beobachtet drei Hormus-Passagen am 3. November', 'Maritimer IEA–IEF–OPEC-Workshop: keine neue Förderpolitik', 'Iran behauptet vier zerstörte Tanker und zwei beschlagnahmte Schiffe: unbestätigt', 'EIA: US-Kerosinbestände 41.782 Mio. Barrel am 30. Oktober', 'Geschätzte Golfexporte im Oktober niedriger: Umfang und Revisionen beachten'],
      basis: 'Der starke Rohölrückgang und niedrigere Kerosinreferenzpreise erzeugen Abwärtsdruck.',
      risk: 'Der leichte USD/KRW-Anstieg und anhaltende maritime Risiken begünstigen einen Wiederanstieg.',
      impacts: ['Unveränderte oder niedrigere Zuschläge möglich, bei geringem Vertrauen. Offizielle Stufe und Beträge unbestätigt.', 'Niedrigere Kerosinreferenzen begünstigen Entlastung. Private Bewertungen ersetzen nicht den offiziellen MOPS-Durchschnitt.', 'Der Tagesanstieg um 0.5 Won erhöht die Umrechnungskosten leicht. Der Durchschnittskurs bleibt unbestätigt.', 'Der Rohölrückgang begünstigt Entlastung. Abrechnung vom 4. November, kein MOPS-Mittel oder Beleg eines Abkommens.', 'Maritime Risiken wirken aufwärts. Regionale IMO-Vorfälle und Windward-Passagen unterscheiden sich im Umfang.']
    }
  };
  var captions = {
    ko: ['최종 수정', '정보 기준', '발표·보도', '사건·관측', '낮은 신뢰도', '출처가 있는 관측', '독립 미확인 당사자 주장'],
    en: ['Modified', 'Information cutoff', 'Publication/report', 'Event/observation', 'Low confidence', 'Sourced observation', 'Party claim, not independently verified'],
    ja: ['最終編集', '情報基準時刻', '公表・報道', '出来事・観測', '信頼度低', '出典付き観測', '当事者主張・独立未確認'],
    zh: ['最后修改', '信息截至', '发布·报道', '事件·观测', '置信度低', '有来源观测', '当事方说法·未经独立证实'],
    fr: ['Modifié', 'Date limite des informations', 'Publication', 'Événement / observation', 'Confiance faible', 'Observation sourcée', 'Affirmation de partie non vérifiée indépendamment'],
    de: ['Geändert', 'Informationsstand', 'Veröffentlichung', 'Ereignis / Beobachtung', 'Geringes Vertrauen', 'Belegte Beobachtung', 'Parteibehauptung, nicht unabhängig bestätigt']
  };
  r.modified = stamp; r.asOf = asOf; r.numbers = n;
  r.sources = [
    ['NEWSIS / Korean Air · 2026-10-16', urls.stage],
    ['CommodityScope · 2026-11-03 private assessment', urls.jet],
    ['NEWSIS · 2026-11-04 Seoul close', urls.fx],
    ['Reuters / CNA · 2026-11-04 settlements; updated 2026-11-05 05:21 KST', urls.oil],
    ['EFE / Prensa Libre · Brent January 2027 contract · 2026-11-04', urls.brentContract],
    ['MT Newswires / Yahoo Finance · WTI December 2026 contract · 2026-11-04', urls.wtiContract],
    ['IMO · as at 2026-11-03', urls.imo],
    ['Windward · 2026-11-04 edition / 2026-11-03 observations', urls.traffic],
    ['OPEC · 2026-11-04 technical workshop', urls.workshop],
    ['OPEC · 2026-11-01 production policy', urls.policy],
    ['Reuters / MarketScreener · IRGC claim · 2026-11-04', urls.claim],
    ['EIA · 2026-11-04 release / week ending 2026-10-30', urls.inventoryRelease],
    ['EIA · Table 6 original CSV', urls.inventory],
    ['Reuters / MarketScreener · 2026-11-03 / October export estimates', urls.flows],
    ['Qatar Ministry of Foreign Affairs · 2026-11-03', urls.talks]
  ];
  var interfaceCopy = {
    ko:['항공권 총액 확인하기 →','중거리 국제선: 항공사 원문의 거리 구간과 공시 통화를 확인하세요.','전체','항공사 공시','기관','시장'],
    en:['Check total airfare →','Mid-haul international: check the airline’s original distance bands and notice currency.','All','Airline notices','Institutions','Market'],
    ja:['航空券総額を確認 →','中距離国際線：航空会社の原文で距離区分と公示通貨を確認してください。','すべて','航空会社の公示','機関','市場'],
    zh:['查看机票总价 →','中程国际线：请核实航司原文的距离区间和公告币种。','全部','航司公告','机构','市场'],
    fr:['Vérifier le prix total du billet →','Moyen-courrier international : vérifiez les tranches de distance et la devise dans l’avis de la compagnie.','Tout','Avis des compagnies','Institutions','Marché'],
    de:['Gesamten Flugpreis prüfen →','Internationale Mittelstrecke: Entfernungsgruppen und Währung in der Originalmitteilung der Airline prüfen.','Alle','Airline-Mitteilungen','Institutionen','Markt']
  };
  Object.keys(copy).forEach(function (lang) {
    var c = copy[lang], p = r.packs[lang], labels = captions[lang];
    if (!p) return;
    var nov = p.faq[0].a, questions = p.faq.map(function (item) { return item.q; });
    questions[2] = questions[2].replace(/165\.55/g, '164.52');
    questions[3] = questions[3].replace(/1,341\.0/g, '1,341.5');
    var update = labels[0] + ': ' + stamp + ' · ' + labels[1] + ': ' + asOf;
    var rowNames = p.rows.map(function (row) { return row[0]; });
    var rows = [
      [rowNames[0], p.status, c.dec],
      [rowNames[1], 'MOPS 173.89 USD/bbl (2026-09-16–10-15) | Singapore Jet 164.52 USD/bbl (2026-11-03)', c.jet],
      [rowNames[2], '1,341.5 KRW/USD (2026-11-04 15:30 KST; +0.5)', c.fx],
      [rowNames[3], 'Brent 94.62 (2027-01) / WTI 88.12 (2026-12) USD/bbl · 2026-11-04', c.oil],
      [rowNames[4], c.marine, c.imo + ' ' + c.traffic]
    ];
    var answers = [nov, c.dec, c.jet, c.fx, c.oil, c.imo + ' ' + c.traffic, c.context + ' ' + c.claim];
    r.rows[lang] = rows;
    Object.assign(p, {
      desc: c.desc, sub: update + ' · ' + c.dec, newsSub: update + ' · ' + p.status,
      updated: update, updatedLabel: labels[0], intro: p.status + ' ' + c.dec, rows: rows,
      summary: [p.status, c.dec, rows[1][1], rows[2][1], rows[3][1], c.marine],
      foot: c.jet + ' ' + nov, basisBody: nov + ' ' + c.jet,
      verdict1: c.dec, verdict2: c.fx, verdictLong: c.context + ' ' + c.claim + ' ' + c.workshop,
      note: c.dec, officialNotice: update + ' · ' + p.status,
      keyVars: [p.status, rows[1][1], rows[2][1], rows[3][1], c.marine],
      faq: questions.map(function (q, i) { return {q: q, a: answers[i]}; })
    });
    var overview = p.forecastOverview;
    p.forecastOverview = Object.assign({}, overview, {
      modifiedAt: stamp, informationCutoff: n.informationCutoff,
      basis: c.basis, risk: c.risk,
      rows: [
        [overview.rows[0][0], overview.expectation, c.impacts[0]],
        [rowNames[1], 'MOPS 173.89 | Singapore Jet 164.52 USD/bbl (2026-11-03)', c.impacts[1]],
        [rowNames[2], rows[2][1], c.impacts[2]],
        [rowNames[3], rows[3][1], c.impacts[3]],
        [rowNames[4], c.marine, c.impacts[4]]
      ],
      rowTones: ['hold', 'down', 'up', 'down', 'up']
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
      'news.officialNotice': p.officialNotice, 'news.basisBody': p.foot,
      'fore.myrealtrip.btn': interfaceCopy[lang][0], 'news.decisionMid': interfaceCopy[lang][1],
      'news.filterAll': interfaceCopy[lang][2], 'news.filterAirline': interfaceCopy[lang][3],
      'news.filterInstitution': interfaceCopy[lang][4], 'news.filterMarket': interfaceCopy[lang][5]
    });
  });
  var definitions = [
    {key:'fx', name:'NEWSIS', reported:'2026-11-04T15:48:20+09:00', event:'2026-11-04T15:30:00+09:00'},
    {key:'oil', name:'Reuters / CNA', reported:'2026-11-05T04:21:40+08:00', published:'2026-11-04T10:10:18+08:00', event:'2026-11-04'},
    {key:'jet', name:'CommodityScope', reported:'2026-11-03', event:'2026-11-03', verification:'private_assessment_low_confidence'},
    {key:'traffic', name:'Windward', reported:'2026-11-04', event:'2026-11-03', verification:'provider_tracked_observation'},
    {key:'workshop', name:'OPEC', reported:'2026-11-04', event:'2026-11-04'},
    {key:'claim', name:'Reuters / MarketScreener', reported:'2026-11-04T03:49:16Z', period:'IRGC statement on 2026-11-04; alleged incident times not independently established', verification:'attributed_unverified_claim'},
    {key:'inventory', name:'EIA', reported:'2026-11-04', event:'2026-10-30'},
    {key:'flows', name:'Reuters / MarketScreener', reported:'2026-11-03T15:40:48Z', period:'2026-10 / 2026-09', verification:'reported_provider_estimates'}
  ];
  var cards = definitions.map(function (def, i) {
    var key = def.key, card = {
      id: 'market-20261105-' + (i + 1), category: ['workshop', 'claim', 'inventory'].indexOf(key) >= 0 ? 'institution' : 'market',
      priority: i + 1, date: '2026-11-05', publishedAt: stamp, updatedAt: stamp,
      reportedDate: def.reported, eventDate: def.event || null, dateKind: 'site_update',
      sourcePublishedAt: key === 'jet' ? null : def.published || def.reported,
      sourceUrl: urls[key], citationUrls: key === 'inventory' ? [urls.inventory, urls.inventoryRelease] : key === 'oil' ? [urls.oil, urls.brentContract, urls.wtiContract] : [urls[key]],
      sourceVerificationStatus: def.verification || 'published_source',
      badge: 'NEW', aiSummary: true, relevanceScore: 1 - i / 100, i18n: {}
    };
    if (def.published) card.sourceUpdatedAt = def.reported;
    if (def.period) card.observationPeriod = def.period;
    if (key === 'jet') {
      card.sourceVerifiedAt = '2026-11-05T08:58:40+09:00';
      card.sourceDateKind = 'assessment_observation_not_publication';
    }
    if (key === 'inventory') card.scheduledReleaseAt = '2026-11-04T10:30:00-05:00';
    if (key === 'traffic') card.sourceVerifiedAt = '2026-11-05T08:59:41+09:00';
    Object.keys(copy).forEach(function (lang) {
      var c = copy[lang], label = captions[lang];
      var dates = key === 'jet' ? label[3] + ': ' + def.event + '. ' : label[2] + ': ' + def.reported + (def.event ? ' · ' + label[3] + ': ' + def.event : '') + '. ';
      card.i18n[lang] = {
        title: c.heads[i], aiBrief: c.heads[i], summary: dates + c[key], impact: c.dec,
        sourceName: def.name, sourceRefs: card.citationUrls.map(function (url) {
          return {name:url === urls.brentContract ? 'EFE / Prensa Libre' : url === urls.wtiContract ? 'MT Newswires / Yahoo Finance' : def.name, url:url};
        }),
        tags: [label[key === 'jet' ? 4 : key === 'claim' ? 6 : 5]], links: [], faq: []
      };
    });
    card.i18n.cn = card.i18n.zh;
    return card;
  });
  r.newsCards = cards.concat(r.newsCards.filter(function (card) { return !/^market-20261105-/.test(card.id); }));
  window.AERO_MARKET_RELEASE = r;
  window.AERO_MARKET_NUMBERS_LATEST = n;
})();
