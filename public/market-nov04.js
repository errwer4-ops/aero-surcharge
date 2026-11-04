/* November 4 release. Source observation dates and the 09:00 KST cutoff are
 * separate from the actual editorial timestamp; historical cards are retained. */
(function () {
  'use strict';
  var r = window.AERO_MARKET_RELEASE;
  var n = window.AERO_MARKET_NUMBERS_20261104;
  if (!r || !n) return;
  var stamp = n.lastUpdated, asOf = n.asOf;
  var urls = {
    stage: 'https://mobile.newsis.com/view_amp.html?ar_id=NISX20261016_0003828757',
    fx: 'https://www.newsis.com/view/NISX20261103_0003853005',
    oil: 'https://www.eleconomista.com.mx/mercados/precios-petroleo-caen-atencion-dialogo-eu-e-iran-20261103-841962.html',
    jet: 'https://commodityscope.com/prices/singapore-jet-kerosene',
    imo: 'https://www.imo.org/en/mediacentre/hottopics/pages/middle-east-highlighted-incidents.aspx',
    talks: 'https://mofa.gov.qa/en/qatar/latest-articles/latest-news/details/2026/11/03/advisor-to-prime-minister--official-spokesperson-for-ministry-of-foreign-affairs--qatar-continues-its-efforts-to-bridge-gap-between-washington--tehran',
    strikes: 'https://krdo.com/politics/cnn-us-politics/2026/11/03/us-carried-out-limited-defensive-strikes-on-irans-qeshm-island-official-says/',
    refinery: 'https://www.eia.gov/TodayinEnergy/detail.php?id=68404',
    traffic: 'https://insights.windward.ai/',
    opec: 'https://www.opec.org/pr-detail/620-1-november-2026.html'
  };
  var copy = {
    ko: {
      title: '2026년 11월 국제선 유류할증료 27단계 | 12월 전망',
      status: '11월 27단계 적용 · 12월 단계·금액 미확정',
      desc: '11월 국제선 유류할증료와 12월 전망. 11월 3일 환율·원유 정산가, Singapore Jet 참고가격, IMO 중동 사건과 미국·이란 협상 소식을 확인하세요.',
      nov: '11월 발권분 27단계와 9월 16일~10월 15일 MOPS 평균 173.89 USD/bbl·414.03 cents/gal은 대한항공 발표를 인용한 뉴시스 10월 16일 보도에서 확인했습니다. Platts 원자료를 직접 검증한 수치는 아닙니다. 항공사별 11월 공식 금액·통화·편도 및 발권·결제일 조건은 유지합니다.',
      dec: '12월 산정기간은 10월 16일~11월 15일입니다. 공식 MOPS 누적 평균·산정 평균환율·특정 단계·금액은 미확정입니다. 최근 원유와 원/달러 하락은 부담 완화 요인이지만 해상안전 위험은 남아 있어 인하를 확정하거나 정밀 수치로 예측하지 않습니다.',
      fx: '11월 3일 서울 외환시장 15:30 종가는 1,341.0원/USD로 전일보다 2.8원 하락했습니다. 뉴시스 11월 3일 보도 기준이며 11월 4일 실시간 환율이나 12월 산정기간 평균환율이 아닙니다. 현물환율로 항공사 공시액을 다시 계산하지 않습니다.',
      oil: '11월 3일 정산가: Brent 2027년 1월물 103.60 USD/bbl(-1.12%), WTI 12월물 96.09 USD/bbl(-0.38%). El Economista의 AFP·Reuters 보도는 11월 4일 06:02:50 KST에 게시됐습니다. 계약월을 구분한 정산값이며 11월 4일 실시간가나 MOPS 평균이 아닙니다.',
      jet: 'CommodityScope의 11월 2일 FOB Singapore Jet Kerosene 자체 일일 평가는 165.55 USD/bbl, 신뢰도 낮음입니다. 11월 4일 08:58 KST에 확인했으며 Platts MOPS나 12월 산정 평균으로 사용하지 않습니다.',
      imo: 'IMO는 11월 3일 기준 중동 해역 확인 사건 128건과 선원 사망 24명을 제시했습니다. 11월 4일 08:58:43 KST에 공식 페이지를 확인했습니다. 호르무즈만의 사건 수가 아니며 다른 기관의 집계와 합산하지 않습니다.',
      talks: '카타르 외교부는 11월 3일 미국과 이란이 교환한 제안을 검토 중이며 카타르 대표단이 11월 2일 테헤란에서 약 3시간 회의했다고 밝혔습니다. 구체적 돌파구는 확인되지 않았습니다. 중재 진행을 합의·휴전·봉쇄 해제 또는 항행 안전 회복으로 해석하지 않습니다.',
      strikes: 'CNN의 11월 3일 보도에서 미국 관리 3명은 11월 2일 이란 케슘섬에 제한적 공습이 있었다고 전했습니다. 방어적 조치라는 평가는 미국 측 설명입니다. Fars의 현지 11월 3일 새벽 폭발 보도와 날짜를 구분하며 피해 규모나 전면전 재개가 확인됐다고 단정하지 않습니다.',
      refinery: 'EIA의 11월 3일 분석에 따르면 세계 정유시설 원유 투입량은 2분기 하루 480만 배럴 감소한 뒤 3분기 180만 배럴 회복했지만, 3분기에도 전년 동기보다 약 5% 낮았습니다. 분기별 정유 투입량이며 현재 항공유 생산량이나 호르무즈 통과 물량이 아닙니다.',
      traffic: 'Windward 11월 3일 자료는 11월 2일 추적된 호르무즈 통과 7건(진입 5·진출 2), 전일 8건을 제시합니다. 해당 업체가 추적한 선박 통과 건수로 전체 통항량이나 하루 배럴 수가 아니며 안전 정상화를 뜻하지 않습니다.',
      opec: 'OPEC+의 11월 1일 발표는 12월 요구 생산량을 2026년 9월 수준으로 유지하고 다음 회의를 11월 29일로 정했습니다. 생산목표는 실제 생산·수출 물량과 구분합니다.',
      heads: ['원/달러 1,341.0원 · 11월 3일 서울 종가', 'Brent 103.60·WTI 96.09 · 11월 3일 정산', 'Singapore Jet 165.55 · 11월 2일 자체 평가', 'IMO 중동 확인 사건 128건 · 11월 3일 기준', '카타르: 미국·이란 제안 검토 중 · 돌파구 미확인', '미 관리들, 케슘섬 제한 공습 설명 · CNN 보도', 'EIA: 세계 정유 투입량 일부 회복 · 전년 수준 미달', 'Windward: 11월 2일 호르무즈 통과 7건 추적'],
      qs: ['11월 단계와 항공사 금액은 어떤 근거인가요?', '12월 유류할증료는 확정됐나요?', 'Singapore Jet 165.55는 공식 MOPS인가요?', '1,341.0원은 언제의 환율인가요?', 'Brent·WTI는 어떤 계약의 가격인가요?', 'IMO 128건은 호르무즈만의 사건인가요?', '미국·이란 협상에 돌파구가 있었나요?'],
      labels: ['최종 수정', '정보 기준', '발표·보도', '사건·관측', '낮은 신뢰도', '출처가 있는 관측', '당사자 설명', '12월 전망과 확인된 자료', '한국 출발 국제선 공시', '시장·해상안전 지표', '공식 공시와 보도 근거', '노선별 11월 공식 금액 확인'],
      rowNames: ['유류할증료 적용·전망', 'MOPS / 항공유 참고가격', 'USD/KRW', 'Brent / WTI', '중동 선박안전 / 호르무즈 통항'],
      marineValue: 'IMO 128건·24명 사망 (11월 3일) | Windward 7건 (11월 2일)',
      booking: '11월 공시의 원 통화·노선 구간·발권 또는 결제일 조건을 확인하고 실제 항공권 총액을 비교하세요. 12월 금액은 아직 미확정입니다.'
    },
    en: {
      title: 'November 2026 International Surcharge Level 27 | December Outlook',
      status: 'November Level 27 applies · December level and amounts unconfirmed',
      desc: 'November surcharges and December outlook: November 3 FX and oil settlements, Singapore Jet reference prices, IMO Middle East incidents and US–Iran mediation.',
      nov: 'NEWSIS reported Korean Air’s announcement on October 16: Level 27 for November ticketing and September 16–October 15 MOPS averaging 173.89 USD/bbl or 414.03 cents/gal. These are reported figures, not our direct validation of raw Platts data. Each airline’s November amounts, original currency, one-way basis and ticketing/payment conditions remain in force.',
      dec: 'December’s calculation period is October 16–November 15. Official cumulative MOPS, period-average FX, the exact level and amounts remain unconfirmed. Recent declines in crude and USD/KRW ease cost pressure, but maritime risks persist; they do not establish a cut or a precise forecast.',
      fx: 'November 3 Seoul 15:30 close: 1,341.0 KRW/USD, down 2.8 from the previous session, according to NEWSIS. This is neither November 4 live FX nor December’s period-average rate. Spot FX does not reprice published airline amounts.',
      oil: 'November 3 settlements: January 2027 Brent 103.60 USD/bbl (-1.12%); December WTI 96.09 (-0.38%). El Economista’s AFP/Reuters report was published November 4 at 06:02:50 KST. These are dated settlements for distinct contracts, not November 4 live prices or MOPS averages.',
      jet: 'CommodityScope’s November 2 proprietary daily FOB Singapore Jet Kerosene assessment is 165.55 USD/bbl, with low confidence. Checked November 4 at 08:58 KST. It is neither Platts MOPS nor the December calculation-period average.',
      imo: 'IMO lists 128 confirmed incidents in the Middle East and 24 seafarer fatalities as at November 3. The official page was checked November 4 at 08:58:43 KST. This is not a Hormuz-only count and must not be added to other agencies’ totals.',
      talks: 'Qatar’s foreign ministry said November 3 that the US and Iran were reviewing exchanged proposals and that a Qatari delegation held about three hours of meetings in Tehran on November 2. No specific breakthrough was established. Mediation does not confirm a deal, ceasefire, removal of restrictions or safe navigation.',
      strikes: 'CNN reported November 3 that three US officials described limited US strikes on Iran’s Qeshm Island on November 2. “Defensive” is the US characterization. Fars reported explosions early November 3 local time. Damage and a full resumption of war are not established by this report.',
      refinery: 'EIA’s November 3 analysis says global refinery crude inputs fell 4.8 million b/d in Q2, then recovered 1.8 million b/d in Q3, which still remained about 5% below a year earlier. These quarterly refinery inputs are not current jet-fuel output or Hormuz throughput.',
      traffic: 'Windward’s November 3 edition reports seven tracked Hormuz crossings on November 2: five inbound and two outbound, versus eight the previous day. This provider’s tracked crossing count is neither exhaustive traffic nor barrels per day, and does not establish safe passage.',
      opec: 'OPEC+ said November 1 that December required output would stay at September 2026 levels; the next meeting is November 29. Required output is distinct from actual production and exports.',
      heads: ['USD/KRW 1,341.0: November 3 Seoul close', 'Brent 103.60; WTI 96.09: November 3 settlements', 'Singapore Jet 165.55: November 2 private assessment', 'IMO: 128 Middle East incidents as at November 3', 'Qatar: US and Iran review proposals; no confirmed breakthrough', 'US officials describe limited Qeshm strikes: CNN', 'EIA: refinery inputs partly recover, still below last year', 'Windward tracks seven Hormuz crossings on November 2'],
      qs: ['What supports November’s level and airline amounts?', 'Is the December surcharge confirmed?', 'Is Singapore Jet 165.55 official MOPS?', 'When was USD/KRW 1,341.0 observed?', 'Which Brent and WTI contracts are quoted?', 'Are all 128 IMO incidents in Hormuz?', 'Have US–Iran talks achieved a breakthrough?'],
      labels: ['Modified', 'Information cutoff', 'Publication/report', 'Event/observation', 'Low confidence', 'Sourced observation', 'Attributed statement', 'December outlook and verified evidence', 'Korea-departure international notices', 'Market and maritime safety indicators', 'Official notices and reported evidence', 'Check November amounts by route'],
      rowNames: ['Surcharge status and outlook', 'MOPS / jet-fuel reference', 'USD/KRW', 'Brent / WTI', 'Middle East safety / Hormuz crossings'],
      marineValue: 'IMO 128 incidents; 24 fatalities (Nov 3) | Windward 7 crossings (Nov 2)',
      booking: 'Check November’s original notice currency, route band and ticketing or payment conditions when comparing total airfares. December amounts remain unconfirmed.'
    },
    ja: {
      title: '2026年11月国際線燃油サーチャージ27段階 | 12月見通し',
      status: '11月27段階適用 · 12月の段階・金額は未確定',
      desc: '11月の燃油サーチャージと12月見通し。11月3日の為替・原油清算値、航空燃料参考価格、IMO中東海域の事案と米国・イラン協議を確認。',
      nov: '11月発券分の27段階と9月16日～10月15日のMOPS平均173.89 USD/bbl・414.03 cents/galは、大韓航空の発表を伝えた10月16日のNEWSIS報道で確認しました。Platts原データの直接検証ではありません。各社11月の公式金額、元の通貨、片道基準、発券・決済日条件を維持します。',
      dec: '12月の算定期間は10月16日～11月15日です。公式累積MOPS、算定期間平均為替、具体的な段階・金額は未確定です。最近の原油とドル／ウォンの下落は負担軽減要因ですが、海上安全リスクが残り、値下げや精密な数値予測は確定できません。',
      fx: 'NEWSISによる11月3日ソウル市場15:30終値は1 USD＝1,341.0 KRW、前日比2.8ウォン下落です。11月4日のリアルタイム為替や12月算定期間の平均為替ではありません。現物為替で航空会社の公示額を再計算しません。',
      oil: '11月3日清算値はBrent 2027年1月限103.60 USD/bbl（-1.12%）、WTI 12月限96.09（-0.38%）。El Economista掲載のAFP・Reuters報道は11月4日06:02:50 KST公開です。契約月別の清算値であり、11月4日の現在値やMOPS平均ではありません。',
      jet: 'CommodityScopeの11月2日FOB Singapore Jet Kerosene独自日次評価は165.55 USD/bbl、信頼度は低いとされています。11月4日08:58 KST確認。Platts MOPSや12月算定期間平均とは区別します。',
      imo: 'IMOは11月3日現在、中東海域の確認事案128件、船員死亡24人を公表しています。公式ページを11月4日08:58:43 KSTに確認しました。ホルムズ海峡だけの件数ではなく、他機関の集計とは合算しません。',
      talks: 'カタール外務省は11月3日、米国とイランが交換した提案を検討中で、カタール代表団が11月2日にテヘランで約3時間協議したと発表しました。具体的な打開は確認されていません。仲介の進展は合意・停戦・制限解除・航行安全の回復を意味しません。',
      strikes: 'CNNは11月3日、米当局者3人の説明として、米国が11月2日にイランのケシュム島へ限定的な攻撃を行ったと報じました。「防御的」は米国側の評価です。Farsによる現地11月3日未明の爆発報道と区別し、被害規模や全面的な戦争再開が確認されたとは扱いません。',
      refinery: 'EIAの11月3日分析では、世界の製油所原油投入量は第2四半期に日量480万バレル減少後、第3四半期に180万バレル回復しましたが、前年同期比ではなお約5%低い水準でした。四半期の精製投入量であり、現在の航空燃料生産量やホルムズ通過量ではありません。',
      traffic: 'Windwardの11月3日版は、11月2日に追跡したホルムズ通過7件（入域5・出域2）、前日8件を報告しています。同社の追跡対象の件数で、全船舶の通過数や日量バレルではなく、安全回復の証拠でもありません。',
      opec: 'OPEC+の11月1日発表では、12月の要求生産量を2026年9月水準に維持し、次回会合は11月29日です。目標量と実際の生産・輸出量は異なります。',
      heads: ['ドル／ウォン1,341.0 · 11月3日ソウル終値', 'Brent 103.60・WTI 96.09 · 11月3日清算値', 'Singapore Jet 165.55 · 11月2日独自評価', 'IMO中東事案128件 · 11月3日現在', 'カタール：米国・イランが提案検討中、打開未確認', '米当局者がケシュム島限定攻撃を説明 · CNN', 'EIA：精製投入量は一部回復、前年割れ続く', 'Windward：11月2日のホルムズ通過7件を追跡'],
      qs: ['11月の段階と各社金額の根拠は？', '12月の燃油サーチャージは確定しましたか？', 'Singapore Jet 165.55は公式MOPSですか？', '1,341.0ウォンはいつの為替ですか？', 'Brent・WTIはどの限月の価格ですか？', 'IMOの128件はホルムズ海峡だけですか？', '米国・イラン協議に打開はありましたか？'],
      labels: ['最終編集', '情報基準時刻', '公表・報道', '出来事・観測', '信頼度低', '出典付き観測', '当事者の説明', '12月見通しと確認資料', '韓国発国際線公式公示', '市場・海上安全指標', '公式公示と報道根拠', '路線別の11月公示額を確認'],
      rowNames: ['燃油サーチャージ適用・見通し', 'MOPS / 航空燃料参考価格', 'USD/KRW', 'Brent / WTI', '中東海上安全 / ホルムズ通過'],
      marineValue: 'IMO 128件・死亡24人（11月3日）| Windward 7件（11月2日）',
      booking: '11月公示の元の通貨、路線区間、発券・決済日条件を確認し、航空券総額を比較してください。12月金額は未確定です。'
    },
    zh: {
      title: '2026年11月国际线燃油附加费27档 | 12月展望',
      status: '11月执行27档 · 12月档位及金额未确定',
      desc: '11月燃油附加费与12月展望：11月3日汇率及原油结算价、航空煤油参考价格、IMO中东事件和美伊谈判。',
      nov: '11月出票适用27档，以及9月16日至10月15日MOPS均价173.89 USD/bbl、414.03 cents/gal，依据NEWSIS于10月16日引用大韩航空声明的报道。这并非本站直接核验Platts原始数据。各航司11月官方金额、原币种、单程及出票或付款日条件保持适用。',
      dec: '12月计算期为10月16日至11月15日。官方累计MOPS、计算期平均汇率、具体档位及金额均未确定。近期原油与美元兑韩元下跌有助于减轻成本，但海上安全风险仍存，不能据此确认降价或作精确数值预测。',
      fx: '据NEWSIS报道，11月3日首尔外汇市场15:30收盘为1美元兑1,341.0韩元，较前一交易日下降2.8韩元。这不是11月4日实时汇率，也不是12月计算期平均汇率。不能用即期汇率重算航司公布的金额。',
      oil: '11月3日结算价：Brent 2027年1月合约103.60 USD/bbl（-1.12%），WTI 12月合约96.09（-0.38%）。El Economista刊载的AFP、Reuters报道于11月4日06:02:50 KST发布。这是不同合约的历史结算价，不是11月4日实时价格或MOPS均价。',
      jet: 'CommodityScope对11月2日FOB Singapore Jet Kerosene的自有日度评估为165.55 USD/bbl，置信度低。11月4日08:58 KST核查。该值不是Platts MOPS，也不是12月计算期均价。',
      imo: 'IMO列明截至11月3日，中东海域确认事件128起、海员死亡24人。官方页面于11月4日08:58:43 KST核查。此范围并非仅限霍尔木兹，不能与其他机构的统计相加。',
      talks: '卡塔尔外交部11月3日称，美伊正在审议交换的提案，卡塔尔代表团于11月2日在德黑兰会谈约3小时。尚无具体突破得到确认。调解进程不等于达成协议、停火、解除限制或恢复航行安全。',
      strikes: 'CNN于11月3日援引三名美国官员称，美军于11月2日对伊朗格什姆岛实施有限打击。“防御性”属于美方定性。Fars另报当地11月3日凌晨发生爆炸；需区分时间，不能据此认定损失规模或全面战争重启。',
      refinery: 'EIA于11月3日分析称，全球炼厂原油投入量第二季度减少480万桶/日，第三季度回升180万桶/日，但仍比上年同期低约5%。这是季度炼油投入量，并非当前航空煤油产量或霍尔木兹运输量。',
      traffic: 'Windward 11月3日资料记录11月2日追踪到的霍尔木兹通行7次，其中入向5次、出向2次，前一日为8次。这是该供应商追踪范围内的通行次数，不是完整船流统计或桶/日，也不代表安全恢复。',
      opec: 'OPEC+于11月1日宣布，12月要求产量维持在2026年9月水平，下次会议为11月29日。目标产量应与实际生产、出口量区分。',
      heads: ['美元兑韩元1,341.0 · 11月3日首尔收盘', 'Brent 103.60、WTI 96.09 · 11月3日结算', 'Singapore Jet 165.55 · 11月2日自有评估', 'IMO中东确认事件128起 · 截至11月3日', '卡塔尔：美伊审议提案，未确认突破', '美官员称格什姆岛遭有限打击 · CNN报道', 'EIA：炼厂投入量部分恢复，仍低于上年', 'Windward：11月2日追踪霍尔木兹通行7次'],
      qs: ['11月档位与航司金额的依据是什么？', '12月燃油附加费确定了吗？', 'Singapore Jet 165.55是官方MOPS吗？', '1,341.0韩元是哪一天的汇率？', 'Brent和WTI报价对应哪些合约？', 'IMO的128起事件仅限霍尔木兹吗？', '美伊谈判有突破了吗？'],
      labels: ['最后编辑', '信息截止', '发布／报道', '事件／观测', '置信度低', '有来源的观测', '当事方说明', '12月展望与已核实资料', '韩国出发国际线官方公告', '市场及海上安全指标', '官方公告与报道依据', '查询各航线11月官方金额'],
      rowNames: ['附加费执行情况与展望', 'MOPS / 航空煤油参考价', 'USD/KRW', 'Brent / WTI', '中东海上安全 / 霍尔木兹通行'],
      marineValue: 'IMO 128起、死亡24人（11月3日）| Windward 7次（11月2日）',
      booking: '比较机票总价时，请核对11月公告的原币种、航线区间及出票或付款日条件。12月金额尚未确定。'
    },
    fr: {
      title: 'Surtaxe internationale novembre 2026 : niveau 27 | Perspectives décembre',
      status: 'Novembre : niveau 27 applicable · décembre non confirmé',
      desc: 'Surtaxes de novembre et perspectives de décembre : change et règlements pétroliers du 3 novembre, kérosène de référence, incidents au Moyen-Orient et médiation entre Washington et Téhéran.',
      nov: 'NEWSIS rapporte le 16 octobre l’annonce de Korean Air : niveau 27 pour les émissions de novembre et MOPS moyen du 16 septembre au 15 octobre de 173.89 USD/bbl, soit 414.03 cents/gal. Il s’agit de chiffres rapportés, sans vérification directe des données brutes Platts. Les montants officiels de novembre, devises, bases aller simple et conditions d’émission ou de paiement de chaque compagnie restent applicables.',
      dec: 'La période de calcul de décembre va du 16 octobre au 15 novembre. MOPS cumulé officiel, change moyen de la période, niveau précis et montants restent non confirmés. Le recul récent du pétrole et du dollar face au won allège la pression, mais les risques maritimes persistent : aucune baisse ni prévision chiffrée précise n’est établie.',
      fx: 'Selon NEWSIS, la clôture de Séoul à 15 h 30 le 3 novembre est de 1,341.0 KRW/USD, soit 2.8 wons de moins que la séance précédente. Ce n’est ni le change en direct du 4 novembre ni la moyenne de calcul de décembre. Le cours au comptant ne recalcule pas les montants publiés par les compagnies.',
      oil: 'Règlements du 3 novembre : Brent janvier 2027 à 103.60 USD/bbl (-1.12 %) ; WTI décembre à 96.09 (-0.38 %). L’article AFP/Reuters d’El Economista a été publié le 4 novembre à 06:02:50 KST. Contrats et dates sont distincts : ni cours en direct du 4 novembre ni moyenne MOPS.',
      jet: 'L’évaluation quotidienne propre à CommodityScope du kérosène FOB Singapour du 2 novembre est de 165.55 USD/bbl, avec une confiance faible. Vérifiée le 4 novembre à 08:58 KST. Ce n’est ni le MOPS Platts ni la moyenne de calcul de décembre.',
      imo: 'L’OMI recense, au 3 novembre, 128 incidents confirmés au Moyen-Orient et 24 décès de marins. Page officielle consultée le 4 novembre à 08:58:43 KST. Le périmètre dépasse le seul détroit d’Ormuz ; ne pas additionner ces chiffres aux bilans d’autres organismes.',
      talks: 'Le ministère qatari des Affaires étrangères indique le 3 novembre que Washington et Téhéran examinent les propositions échangées. Une délégation qatarie a discuté environ trois heures à Téhéran le 2 novembre. Aucune avancée décisive précise n’est établie. La médiation ne confirme ni accord, ni cessez-le-feu, ni levée des restrictions, ni navigation sûre.',
      strikes: 'CNN rapporte le 3 novembre, citant trois responsables américains, des frappes limitées menées le 2 novembre sur l’île iranienne de Qeshm. Leur caractère « défensif » est l’appréciation américaine. Fars signale des explosions tôt le 3 novembre, heure locale. Les dégâts et une reprise générale de la guerre ne sont pas établis.',
      refinery: 'L’analyse EIA du 3 novembre indique que les entrées mondiales de brut en raffinerie ont baissé de 4.8 millions de barils/jour au T2, puis récupéré 1.8 million au T3, restant environ 5 % sous le niveau d’un an auparavant. Ce sont des flux trimestriels de raffinage, pas la production actuelle de kérosène ni le trafic d’Ormuz.',
      traffic: 'L’édition Windward du 3 novembre compte sept passages suivis à Ormuz le 2 novembre : cinq entrants et deux sortants, contre huit la veille. Ce comptage propre au fournisseur n’est ni exhaustif ni exprimé en barils/jour et ne démontre pas le retour d’une navigation sûre.',
      opec: 'L’OPEP+ a annoncé le 1er novembre le maintien des niveaux de production requis de décembre à ceux de septembre 2026 ; prochaine réunion le 29 novembre. Ces objectifs se distinguent de la production et des exportations réelles.',
      heads: ['USD/KRW 1,341.0 : clôture de Séoul du 3 novembre', 'Brent 103.60 ; WTI 96.09 : règlements du 3 novembre', 'Kérosène Singapour 165.55 : évaluation privée du 2 novembre', 'OMI : 128 incidents au Moyen-Orient au 3 novembre', 'Qatar : propositions américano-iraniennes à l’étude, sans percée confirmée', 'CNN : des responsables américains décrivent des frappes limitées à Qeshm', 'EIA : reprise partielle du raffinage, encore sous le niveau annuel précédent', 'Windward suit sept passages à Ormuz le 2 novembre'],
      qs: ['Quelles sources étayent le niveau et les montants de novembre ?', 'La surtaxe de décembre est-elle confirmée ?', 'Le kérosène à 165.55 est-il le MOPS officiel ?', 'À quelle date correspond le change de 1,341.0 ?', 'Quels contrats Brent et WTI sont cités ?', 'Les 128 incidents de l’OMI concernent-ils uniquement Ormuz ?', 'Les discussions entre Washington et Téhéran ont-elles abouti ?'],
      labels: ['Dernière modification', 'Limite des informations', 'Publication', 'Événement / observation', 'Confiance faible', 'Observation sourcée', 'Déclaration attribuée', 'Perspectives de décembre et éléments vérifiés', 'Avis internationaux au départ de Corée', 'Indicateurs de marché et de sécurité maritime', 'Avis officiels et sources de presse', 'Consulter les montants de novembre par ligne'],
      rowNames: ['Surtaxes et perspectives', 'MOPS / référence kérosène', 'USD/KRW', 'Brent / WTI', 'Sécurité au Moyen-Orient / passages à Ormuz'],
      marineValue: 'OMI : 128 incidents, 24 décès (3 nov.) | Windward : 7 passages (2 nov.)',
      booking: 'Pour comparer le prix total des billets, vérifiez la devise originale, la tranche de ligne et les conditions d’émission ou de paiement de novembre. Les montants de décembre restent non confirmés.'
    },
    de: {
      title: 'Internationaler Treibstoffzuschlag November 2026: Stufe 27 | Dezember-Ausblick',
      status: 'November: Stufe 27 gilt · Dezember-Stufe und Beträge unbestätigt',
      desc: 'November-Zuschläge und Dezember-Ausblick: Devisen und Öl-Abrechnungspreise vom 3. November, Kerosinreferenz, IMO-Vorfälle im Nahen Osten und Vermittlung zwischen den USA und Iran.',
      nov: 'NEWSIS berichtete am 16. Oktober über die Mitteilung von Korean Air: Stufe 27 für November-Ausstellungen und ein MOPS-Mittel vom 16. September bis 15. Oktober von 173.89 USD/bbl beziehungsweise 414.03 cents/gal. Das sind berichtete Angaben, keine eigene Prüfung der Platts-Rohdaten. Offizielle November-Beträge, Originalwährungen, Einfachstrecken sowie Ausstellungs- und Zahlungsbedingungen der Airlines bleiben maßgeblich.',
      dec: 'Der Dezember-Berechnungszeitraum läuft vom 16. Oktober bis 15. November. Offizielles kumuliertes MOPS, durchschnittlicher Wechselkurs, genaue Stufe und Beträge sind unbestätigt. Zuletzt fallende Ölpreise und USD/KRW entlasten, doch maritime Risiken bleiben. Daraus folgt weder eine bestätigte Senkung noch eine genaue Zahlenprognose.',
      fx: 'Laut NEWSIS lag der Seouler Schlusskurs am 3. November um 15:30 Uhr bei 1,341.0 KRW/USD, 2.8 Won unter dem Vortag. Das ist weder ein Echtzeitkurs vom 4. November noch der Durchschnitt des Dezember-Zeitraums. Veröffentlichte Airline-Beträge werden nicht mit dem Kassakurs neu berechnet.',
      oil: 'Abrechnung am 3. November: Brent Januar 2027 bei 103.60 USD/bbl (-1.12 %), WTI Dezember bei 96.09 (-0.38 %). Der AFP/Reuters-Bericht bei El Economista erschien am 4. November um 06:02:50 KST. Es handelt sich um datierte Preise verschiedener Kontrakte, nicht um Echtzeitkurse vom 4. November oder MOPS-Mittelwerte.',
      jet: 'CommodityScopes eigene tägliche Bewertung für FOB Singapore Jet Kerosene vom 2. November beträgt 165.55 USD/bbl, bei niedrigem Vertrauen. Geprüft am 4. November um 08:58 KST. Sie ist weder Platts MOPS noch der Dezember-Zeitraumdurchschnitt.',
      imo: 'Die IMO nennt zum Stand 3. November 128 bestätigte Vorfälle im Nahen Osten und 24 getötete Seeleute. Die offizielle Seite wurde am 4. November um 08:58:43 KST geprüft. Das ist keine reine Hormus-Zählung und darf nicht mit Zahlen anderer Stellen addiert werden.',
      talks: 'Katars Außenministerium erklärte am 3. November, die USA und Iran prüften ausgetauschte Vorschläge. Eine katarische Delegation habe am 2. November rund drei Stunden in Teheran beraten. Ein konkreter Durchbruch ist nicht bestätigt. Vermittlung bedeutet weder Abkommen noch Waffenruhe, aufgehobene Beschränkungen oder sichere Schifffahrt.',
      strikes: 'CNN berichtete am 3. November unter Berufung auf drei US-Beamte über begrenzte US-Angriffe auf Irans Insel Qeschm am 2. November. „Defensiv“ ist die US-Einordnung. Fars meldete Explosionen am frühen 3. November Ortszeit. Schadensumfang und eine umfassende Wiederaufnahme des Krieges sind damit nicht bestätigt.',
      refinery: 'Laut EIA-Analyse vom 3. November sank der weltweite Rohöleinsatz in Raffinerien im zweiten Quartal um 4.8 Mio. Barrel/Tag und erholte sich im dritten um 1.8 Mio.; er lag dennoch etwa 5 % unter dem Vorjahresquartal. Das sind vierteljährliche Raffineriemengen, keine aktuelle Kerosinproduktion oder Hormus-Durchsatzmenge.',
      traffic: 'Windwards Ausgabe vom 3. November meldet sieben erfasste Hormus-Passagen am 2. November: fünf einwärts, zwei auswärts, nach acht am Vortag. Diese Anbieterzählung erfasst nicht den gesamten Verkehr, ist keine Barrel-pro-Tag-Angabe und belegt keine sichere Schifffahrt.',
      opec: 'OPEC+ erklärte am 1. November, die erforderlichen Dezember-Fördermengen auf dem Niveau von September 2026 zu halten; nächstes Treffen ist am 29. November. Vorgaben sind von tatsächlicher Produktion und Exporten zu unterscheiden.',
      heads: ['USD/KRW 1,341.0: Seouler Schlusskurs vom 3. November', 'Brent 103.60; WTI 96.09: Abrechnung vom 3. November', 'Singapore Jet 165.55: eigene Bewertung vom 2. November', 'IMO: 128 Nahost-Vorfälle zum 3. November', 'Katar: USA und Iran prüfen Vorschläge; kein bestätigter Durchbruch', 'CNN: US-Beamte schildern begrenzte Qeschm-Angriffe', 'EIA: Raffinerieeinsatz erholt sich teilweise, bleibt unter Vorjahr', 'Windward erfasst sieben Hormus-Passagen am 2. November'],
      qs: ['Was belegt November-Stufe und Airline-Beträge?', 'Steht der Dezember-Zuschlag fest?', 'Ist Singapore Jet 165.55 offizielles MOPS?', 'Von wann stammt der Kurs von 1,341.0?', 'Welche Brent- und WTI-Kontrakte sind gemeint?', 'Betreffen alle 128 IMO-Vorfälle nur Hormus?', 'Gab es einen Durchbruch bei den USA-Iran-Gesprächen?'],
      labels: ['Zuletzt bearbeitet', 'Informationsstand', 'Veröffentlichung', 'Ereignis / Beobachtung', 'Niedriges Vertrauen', 'Belegte Beobachtung', 'Zugeordnete Aussage', 'Dezember-Ausblick und geprüfte Belege', 'Internationale Mitteilungen ab Korea', 'Markt- und Schifffahrtssicherheitsindikatoren', 'Offizielle Mitteilungen und Pressebelege', 'November-Beträge nach Strecke prüfen'],
      rowNames: ['Zuschläge und Ausblick', 'MOPS / Kerosinreferenz', 'USD/KRW', 'Brent / WTI', 'Nahost-Sicherheit / Hormus-Passagen'],
      marineValue: 'IMO: 128 Vorfälle, 24 Tote (3. Nov.) | Windward: 7 Passagen (2. Nov.)',
      booking: 'Beim Gesamtpreisvergleich die November-Originalwährung, Streckengruppe und Ausstellungs- oder Zahlungsbedingungen beachten. Dezember-Beträge sind noch unbestätigt.'
    }
  };

  // A concise forecast-only interpretation. News copy and its original rows
  // retain the dated evidence; this view does not add a numeric stage forecast.
  var forecastCopy = {
    ko: {
      title: '시장·해상안전 지표와 12월 예상',
      expectation: '12월 예상: 보합~인하 가능성',
      question: '12월 유류할증료는 어떻게 예상하나요?',
      confidence: '신뢰도 낮음 · 단계 미확정',
      basis: '항공유 참고가격·원유·환율의 최근 하락은 인하 압력입니다.',
      risk: '해상안전 위험이 커 가격 반등·인상 가능성도 남아 있습니다.',
      note: '공식 누적 MOPS·산정 평균환율은 미확정입니다. 단기 지표를 바탕으로 한 방향성 예상이며 특정 단계·금액 예측이 아닙니다.',
      firstLabel: '12월 방향성 예상',
      columns: ['항목', '현재 확인값', '12월 예상에 미치는 영향'],
      jetValue: '11월 산정 MOPS 173.89 | Singapore Jet 165.55 USD/bbl (11월 2일)',
      impacts: [
        '단기 지표상 보합~인하 가능성. 공식 단계·금액은 미확정입니다.',
        '최근 항공유 참고가격 하락은 인하 요인. 민간 일일 평가는 공식 산정 평균을 대체하지 않습니다.',
        '원화 환산 부담 완화 요인. 하루 종가로 산정기간 평균환율이나 최종 공시액을 정하지 않습니다.',
        '원유 하락은 인하 압력. 11월 3일 계약별 정산가이며 MOPS 평균이 아닙니다.',
        '가격 반등·인상 위험. IMO는 중동 사건, Windward는 추적 통과 건수로 범위가 다릅니다.'
      ]
    },
    en: {
      title: 'Market and maritime indicators: December outlook',
      expectation: 'December outlook: unchanged or lower surcharges possible',
      question: 'What is the outlook for December fuel surcharges?',
      confidence: 'Low confidence · level unconfirmed',
      basis: 'Recent declines in jet-fuel reference prices, crude and USD/KRW put downward pressure on costs.',
      risk: 'High maritime risks leave room for a price rebound and higher surcharges.',
      note: 'Official cumulative MOPS and period-average FX remain unconfirmed. This is a directional inference from short-term indicators, not a forecast of a specific level or amount.',
      firstLabel: 'December directional outlook',
      columns: ['Indicator', 'Verified observation', 'Effect on the December outlook'],
      jetValue: 'November MOPS basis 173.89 | Singapore Jet 165.55 USD/bbl (Nov 2)',
      impacts: [
        'Short-term indicators suggest unchanged or lower surcharges are possible. The official level and amounts remain unconfirmed.',
        'Lower jet-fuel reference prices support easing. A private daily assessment cannot replace the official calculation average.',
        'Supports a lower KRW conversion burden. One daily close cannot determine period-average FX or the final published amount.',
        'Lower crude supports easing. These are November 3 settlements for distinct contracts, not the MOPS average.',
        'Rebound and surcharge-rise risk. IMO covers Middle East incidents; Windward counts tracked crossings. Their scopes differ.'
      ]
    },
    ja: {
      title: '市場・海上安全指標と12月予想',
      expectation: '12月予想：横ばい～引き下げの可能性',
      question: '12月の燃油サーチャージはどう予想されますか？',
      confidence: '信頼度は低い · 段階未確定',
      basis: '航空燃料参考価格・原油・ドル／ウォンの最近の下落は引き下げ圧力です。',
      risk: '海上安全リスクが高く、価格反発や引き上げの可能性も残ります。',
      note: '公式累積MOPSと算定期間平均為替は未確定です。短期指標に基づく方向性の予想であり、具体的な段階・金額の予測ではありません。',
      firstLabel: '12月の方向性予想',
      columns: ['項目', '確認済みの値', '12月予想への影響'],
      jetValue: '11月算定MOPS 173.89 | Singapore Jet 165.55 USD/bbl（11月2日）',
      impacts: [
        '短期指標では横ばい～引き下げの可能性。公式の段階・金額は未確定です。',
        '航空燃料参考価格の下落は引き下げ要因。民間の日次評価で公式算定平均を代用できません。',
        'ウォン換算負担の軽減要因。1日の終値では期間平均為替や最終公示額は決まりません。',
        '原油下落は引き下げ圧力。11月3日の限月別清算値で、MOPS平均ではありません。',
        '価格反発・引き上げリスク。IMOは中東の事案、Windwardは追跡通過件数で対象範囲が異なります。'
      ]
    },
    zh: {
      title: '市场及海上安全指标与12月预期',
      expectation: '12月预期：持平至下调的可能性',
      question: '如何判断12月燃油附加费的走势？',
      confidence: '置信度低 · 档位未确定',
      basis: '航空煤油参考价、原油及美元兑韩元近期下跌，构成下调压力。',
      risk: '海上安全风险较高，价格反弹及附加费上调的可能性仍存。',
      note: '官方累计MOPS与计算期平均汇率尚未确定。这是基于短期指标的方向性判断，并非对具体档位或金额的预测。',
      firstLabel: '12月方向性预期',
      columns: ['指标', '已核实数据', '对12月预期的影响'],
      jetValue: '11月计算依据MOPS 173.89 | Singapore Jet 165.55 USD/bbl（11月2日）',
      impacts: [
        '短期指标显示持平至下调的可能性。官方档位与金额尚未确定。',
        '航空煤油参考价下降支持下调。私人机构日度评估不能替代官方计算均价。',
        '有助减轻韩元换算成本。单日收盘价不能决定计算期平均汇率或最终公告金额。',
        '原油下跌带来下调压力。这是11月3日不同合约的结算价，不是MOPS均价。',
        '存在反弹及上调风险。IMO统计中东事件，Windward记录追踪通行次数，范围不同。'
      ]
    },
    fr: {
      title: 'Indicateurs de marché et maritimes : perspectives de décembre',
      expectation: 'Décembre : stabilité ou baisse possible des surtaxes',
      question: 'Quelles sont les perspectives pour les surtaxes carburant de décembre ?',
      confidence: 'Confiance faible · niveau non confirmé',
      basis: 'Le recul récent du kérosène de référence, du brut et du dollar face au won exerce une pression à la baisse.',
      risk: 'Les risques maritimes élevés laissent subsister une possibilité de rebond des prix et de hausse des surtaxes.',
      note: 'Le MOPS cumulé officiel et le change moyen de la période restent non confirmés. Il s’agit d’une appréciation directionnelle fondée sur des indicateurs à court terme, sans prévision de niveau ou de montant précis.',
      firstLabel: 'Orientation possible en décembre',
      columns: ['Indicateur', 'Observation vérifiée', 'Effet sur les perspectives de décembre'],
      jetValue: 'Base MOPS de novembre 173.89 | Kérosène Singapour 165.55 USD/bbl (2 nov.)',
      impacts: [
        'Les indicateurs à court terme suggèrent une stabilité ou une baisse possible. Niveau et montants officiels restent non confirmés.',
        'Le recul du kérosène de référence favorise une baisse. Une évaluation privée quotidienne ne remplace pas la moyenne officielle.',
        'Facteur d’allègement du coût converti en wons. Une clôture quotidienne ne détermine ni change moyen ni montant publié final.',
        'Le recul du brut exerce une pression à la baisse. Règlements du 3 novembre par contrat, et non moyenne MOPS.',
        'Risque de rebond et de hausse. L’OMI recense des incidents au Moyen-Orient ; Windward suit des passages, sur un autre périmètre.'
      ]
    },
    de: {
      title: 'Markt- und Schifffahrtsindikatoren: Dezember-Ausblick',
      expectation: 'Dezember: unveränderte oder niedrigere Zuschläge möglich',
      question: 'Wie ist der Ausblick für die Treibstoffzuschläge im Dezember?',
      confidence: 'Geringes Vertrauen · Stufe unbestätigt',
      basis: 'Zuletzt gesunkene Kerosinreferenzpreise, Rohölpreise und USD/KRW erzeugen Abwärtsdruck.',
      risk: 'Hohe Schifffahrtsrisiken lassen einen Preisanstieg und höhere Zuschläge weiterhin zu.',
      note: 'Offizielles kumuliertes MOPS und der durchschnittliche Wechselkurs des Zeitraums sind unbestätigt. Dies ist eine Richtungseinschätzung aus kurzfristigen Indikatoren, keine Vorhersage einer bestimmten Stufe oder eines Betrags.',
      firstLabel: 'Mögliche Dezember-Richtung',
      columns: ['Indikator', 'Geprüfte Beobachtung', 'Einfluss auf den Dezember-Ausblick'],
      jetValue: 'November-MOPS-Basis 173.89 | Singapore Jet 165.55 USD/bbl (2. Nov.)',
      impacts: [
        'Kurzfristige Indikatoren sprechen für mögliche unveränderte oder niedrigere Zuschläge. Offizielle Stufe und Beträge stehen nicht fest.',
        'Sinkende Kerosinreferenzpreise begünstigen Entlastung. Private Tagesbewertungen ersetzen nicht den offiziellen Berechnungsdurchschnitt.',
        'Entlastet bei der Umrechnung in Won. Ein Tagesschlusskurs bestimmt weder den Durchschnittskurs noch den endgültigen veröffentlichten Betrag.',
        'Fallendes Rohöl erzeugt Abwärtsdruck. Kontraktspezifische Abrechnungspreise vom 3. November, kein MOPS-Mittel.',
        'Risiko steigender Preise und Zuschläge. Die IMO erfasst Nahost-Vorfälle, Windward beobachtete Passagen; der Umfang ist unterschiedlich.'
      ]
    }
  };

  r.modified = stamp;
  r.asOf = asOf;
  r.numbers = n;
  r.sources = [
    ['NEWSIS · Korean Air statement · 2026-10-16', urls.stage],
    ['CommodityScope · 2026-11-02 assessment', urls.jet],
    ['NEWSIS · 2026-11-03 Seoul close', urls.fx],
    ['El Economista / AFP / Reuters · 2026-11-03 settlements', urls.oil],
    ['IMO · as at 2026-11-03', urls.imo],
    ['Qatar Ministry of Foreign Affairs · 2026-11-03', urls.talks],
    ['CNN / KRDO · 2026-11-03', urls.strikes],
    ['EIA · 2026-11-03', urls.refinery],
    ['Windward · 2026-11-03 edition / 2026-11-02 observations', urls.traffic],
    ['OPEC · 2026-11-01', urls.opec]
  ];
  Object.keys(copy).forEach(function (l) {
    var c = copy[l], p = r.packs[l];
    if (!p) return;
    var update = c.labels[0] + ': ' + stamp + ' · ' + c.labels[1] + ': ' + asOf;
    var rows = [
      [c.rowNames[0], c.status, c.dec],
      [c.rowNames[1], 'MOPS 173.89 USD/bbl (2026-09-16–10-15) | Singapore Jet 165.55 USD/bbl (2026-11-02)', c.jet],
      [c.rowNames[2], '1,341.0 KRW/USD (2026-11-03 15:30 KST; -2.8)', c.fx],
      [c.rowNames[3], 'Brent 103.60 (2027-01) / WTI 96.09 (2026-12) USD/bbl · 2026-11-03', c.oil],
      [c.rowNames[4], c.marineValue, c.imo + ' ' + c.traffic]
    ];
    var answers = [c.nov, c.dec, c.jet, c.fx, c.oil, c.imo + ' ' + c.traffic, c.talks + ' ' + c.strikes];
    r.rows[l] = rows;
    Object.assign(p, {
      title: c.title, meta: c.title, newsTitle: c.title, newsMeta: c.title,
      status: c.status, notice: c.status, desc: c.desc,
      sub: update + ' · ' + c.dec, newsSub: update + ' · ' + c.status,
      updated: update, updatedLabel: c.labels[0], indicator: c.labels[9],
      intro: c.status + ' ' + c.dec,
      rows: rows, summaryTitle: c.labels[7],
      summary: [c.status, c.dec, rows[1][1], rows[2][1], rows[3][1], c.marineValue],
      foot: c.jet + ' ' + c.nov,
      basisTitle: c.labels[10], basisBody: c.nov + ' ' + c.jet,
      verdictTitle: c.labels[7], verdict1: c.dec, verdict2: c.fx,
      verdictShort: c.status, verdictLong: c.talks + ' ' + c.strikes + ' ' + c.opec,
      note: c.dec, officialTitle: c.labels[8], officialNotice: update + ' · ' + c.status, officialDesc: c.booking,
      keyVars: [c.status, rows[1][1], rows[2][1], rows[3][1], c.marineValue],
      bookingDescription: c.booking, routeDescription: c.labels[11],
      faq: c.qs.map(function (q, i) { return {q: q, a: answers[i]}; })
    });
    var overview = forecastCopy[l];
    p.forecastOverview = {
      modifiedAt: '2026-11-04T09:40:54+09:00',
      informationCutoff: n.informationCutoff,
      title: overview.title,
      expectation: overview.expectation,
      question: overview.question,
      confidence: overview.confidence,
      basis: overview.basis,
      risk: overview.risk,
      note: overview.note,
      columns: overview.columns,
      rows: [
        [overview.firstLabel, overview.expectation, overview.impacts[0]],
        [c.rowNames[1], overview.jetValue, overview.impacts[1]],
        [c.rowNames[2], rows[2][1], overview.impacts[2]],
        [c.rowNames[3], rows[3][1], overview.impacts[3]],
        [c.rowNames[4], c.marineValue, overview.impacts[4]]
      ],
      rowTones: ['hold', 'down', 'down', 'down', 'up']
    };
    // Keep the existing surfaces and renderer, replacing only current copy.
    p.surface = Object.assign({}, p.surface, {
      'fore.pageTitle': c.title, 'fore.h1': c.title, 'fore.pageSub': p.sub,
      'fore.notice': c.status, 'fore.intro': p.intro,
      'fore.summary.title': p.summaryTitle, 'fore.summary.updated': update,
      'fore.indicator.footnote': p.foot, 'fore.verdict.title': p.verdictTitle,
      'fore.verdict.line1': p.verdict1, 'fore.verdict.line2': p.verdict2,
      'fore.verdict.short': p.verdictShort, 'fore.verdict.long': p.verdictLong,
      'fore.basis.title': p.basisTitle, 'fore.basis.body': p.basisBody,
      'fore.predict.title': p.indicator, 'fore.predict.subtitle': c.status,
      'fore.predict.footnote': p.foot,
      'fore.aiNotice': c.dec, 'fore.myrealtrip.desc': c.booking,
      'fore.cta.desc': c.labels[11], 'aff.myrealtrip.desc': c.booking,
      'news.pageTitle': c.title, 'news.h1': c.title, 'news.pageSub': p.newsSub,
      'news.note': c.dec, 'news.surchargeNote': c.dec, 'news.dataRef': p.sub,
      'news.decisionTitle': p.verdictTitle, 'news.decisionShort': c.status + ' · ' + c.dec,
      'news.decisionLine1': c.dec, 'news.decisionLine2': c.fx,
      'news.decisionLong': c.status, 'news.forecastCta.title': c.title,
      'news.forecastCta.desc': p.intro, 'news.summary.updated': update,
      'news.officialTitle': p.officialTitle, 'news.officialNotice': p.officialNotice, 'news.officialDesc': p.officialDesc,
      'news.basisBody': p.foot
    });
  });

  var keys = ['fx', 'oil', 'jet', 'imo', 'talks', 'strikes', 'refinery', 'traffic'];
  var names = ['NEWSIS', 'El Economista / AFP / Reuters', 'CommodityScope', 'IMO', 'Qatar Ministry of Foreign Affairs', 'CNN / KRDO', 'EIA', 'Windward'];
  var reports = ['2026-11-03T15:33:18+09:00', '2026-11-03T15:02:50-06:00', '2026-11-02', '2026-11-03', '2026-11-03', '2026-11-03T15:36:56Z', '2026-11-03', '2026-11-03'];
  var events = ['2026-11-03T15:30:00+09:00', '2026-11-03', '2026-11-02', '2026-11-03', '2026-11-02', '2026-11-02', null, '2026-11-02'];
  var cards = keys.map(function (key, i) {
    var card = {
      id: 'market-20261104-' + (i + 1),
      category: ['imo', 'talks', 'strikes', 'refinery'].indexOf(key) >= 0 ? 'institution' : 'market',
      priority: i + 1, date: '2026-11-04', publishedAt: stamp, updatedAt: stamp,
      reportedDate: reports[i], eventDate: events[i], dateKind: 'site_update',
      sourceUrl: urls[key], citationUrls: [urls[key]],
      sourceVerificationStatus: key === 'strikes' ? 'attributed_official_statement' : key === 'jet' ? 'private_assessment_low_confidence' : key === 'traffic' ? 'provider_tracked_observation' : 'published_source',
      badge: 'NEW', aiSummary: true, relevanceScore: 1 - i / 100, i18n: {}
    };
    if (key === 'jet') card.sourceVerifiedAt = '2026-11-04T08:58:00+09:00';
    if (key === 'imo') card.sourceVerifiedAt = '2026-11-04T08:58:43+09:00';
    if (key === 'refinery') card.observationPeriod = '2026-Q2 / 2026-Q3';
    Object.keys(copy).forEach(function (l) {
      var c = copy[l];
      var dates = c.labels[2] + ': ' + reports[i] + (events[i] ? ' · ' + c.labels[3] + ': ' + events[i] : '') + '. ';
      card.i18n[l] = {
        title: c.heads[i], aiBrief: c.heads[i], summary: dates + c[key], impact: c.dec,
        sourceName: names[i], sourceRefs: [{name: names[i], url: urls[key]}],
        tags: [c.labels[key === 'jet' ? 4 : key === 'strikes' ? 6 : 5]], links: [], faq: []
      };
    });
    card.i18n.cn = card.i18n.zh;
    return card;
  });
  r.newsCards = cards.concat(r.newsCards.filter(function (card) { return !/^market-20261104-/.test(card.id); }));
  window.AERO_MARKET_RELEASE = r;
  window.AERO_MARKET_NUMBERS_LATEST = n;
})();
