/* November 6 morning release. The November 5 archive remains intact.
 * Publication clocks, observation dates and the 09:00 KST cutoff are distinct. */
(function () {
  'use strict';
  var r = window.AERO_MARKET_RELEASE, n = window.AERO_MARKET_NUMBERS_20261106;
  if (!r || !n) return;
  var stamp = "2026-11-06T09:13:59+09:00", asOf = n.asOf;
  var urls = {
    stage: 'https://mobile.newsis.com/view_amp.html?ar_id=NISX20261016_0003828757',
    jet: 'https://commodityscope.com/prices/singapore-jet-kerosene',
    fx: 'https://files.newsis.com/view/NISX20261105_0003856668',
    fxClose: 'https://www.kfenews.co.kr/news/articleView.html?idxno=667603',
    oil: 'https://www.wowtv.co.kr/NewsCenter/News/Read?articleId=AKR20261106008700072',
    oilReuters: 'https://www.businesstimes.com.sg/companies-markets/energy-commodities/brent-crude-jumps-settles-over-us3-after-tanker-attacks',
    imo: 'https://www.imo.org/en/mediacentre/hottopics/pages/middle-east-highlighted-incidents.aspx',
    traffic: 'https://insights.windward.ai/',
    eia: 'https://www.eia.gov/todayinenergy/detail.php?id=68424',
    eiaRss: 'https://www.eia.gov/rss/todayinenergy.xml',
    policy: 'https://www.opec.org/pr-detail/620-1-november-2026.html'
  };
  var copy = {
    ko: {
      desc: '11월 유류할증료와 12월 전망. 11월 5일 원유 정산가·서울 환율, Windward 11월 4일 통항 관측과 EIA 분석을 확인합니다. 항공유 참고값·IMO 집계는 이전 확인값과 최신 검증 한계를 구분합니다.',
      expectation: '12월 예상: 인하 압력·반등 위험 혼재',
      dec: '12월 산정기간은 10월 16일~11월 15일입니다. 이전 확인 항공유 참고값의 하락과 11월 5일 원유 반등·원/달러 소폭 상승·해상안전 위험이 엇갈려 인하 압력과 반등 위험이 혼재합니다. 신뢰도는 낮으며 공식 누적 MOPS·산정 평균환율·단계·금액은 미확정입니다.',
      fx: '11월 5일 서울 외환시장 15:30 주간 종가는 1,342.1원/USD로 전일보다 0.6원 상승했습니다. 뉴시스 15:59:49 보도 기준입니다. 원화 환산 부담의 소폭 상방 요인이며 11월 6일 실시간 환율이나 12월 산정 평균환율이 아닙니다. 현물환율로 공시액을 다시 계산하지 않습니다.',
      oil: '11월 5일 원유 선물 정산가는 Brent 2027년 1월물 98.29 USD/bbl(+3.67달러·+3.88%), WTI 2026년 12월물 90.52(+2.40달러·+2.72%)입니다. 연합뉴스 재배포는 11월 6일 06:07:09 KST에 게시됐고 Reuters 보도로 교차 확인했습니다. 전일 급락 뒤 반등은 단기 상방 압력이며 MOPS 산정평균이나 통항 안전의 확인이 아닙니다.',
      jet: 'Singapore Jet은 이전 확인 참고값인 CommodityScope 11월 3일 자체 일일 평가 164.52 USD/bbl을 유지합니다. 11월 6일 09:00 KST 기준 최신 평가는 미확인입니다. 이후 확인한 11월 4일 관측값은 기준시각 전 공개를 입증하지 못해 반영하지 않았습니다. 신뢰도 낮은 제3자 평가로 Platts MOPS나 공식 산정평균이 아닙니다.',
      imo: 'IMO는 이전 확인 집계인 11월 3일 기준 중동 해역 사건 128건·선원 사망 24명을 유지합니다. 11월 6일 09:00 KST 기준 최신 집계는 미확인입니다. 이후 확인한 갱신 자료는 기준시각 전 공개를 입증하지 못해 보류했습니다. 호르무즈만의 집계나 통항 건수가 아닙니다.',
      traffic: 'Windward 11월 5일 판은 11월 4일 호르무즈 통항 5회(진입 2·출항 3)를 관측했습니다. 관측 출항 유조선은 없고 출항 화물선 1척은 AIS 신호 없이 포착됐습니다. 업체 관측 범위의 횟수로 전체 통항량·원유 유량·안전 회복을 뜻하지 않습니다.',
      eia: 'EIA의 11월 5일 분석은 2026년 8월까지 미국 정유수율 자료를 다룹니다. 항공유 수율은 3월 처음 12%를 넘었고 8월까지 12% 이상을 유지했습니다. 높은 정제마진에 따른 생산 배분 변화로, 현재 항공유 공급량·Singapore Jet 가격·MOPS 평균이 아닙니다.',
      context: '가격 반등이나 관측 통항 수로 협상 타결·선박안전 정상화를 확정할 수 없습니다. OPEC+의 11월 1일 공시는 12월 요구생산량을 9월 수준으로 유지하며 다음 회의는 11월 29일입니다. 실제 생산·수출량과 구분합니다.',
      marine: 'IMO 이전 집계 128건·24명 사망(11월 3일) | Windward 5회(11월 4일 관측)',
      heads: ['원/달러 1,342.1원: 11월 5일 주간 종가 0.6원 상승', 'Brent 98.29·WTI 90.52: 11월 5일 정산가 반등', 'Windward: 11월 4일 호르무즈 통항 5회 관측', 'EIA: 미국 항공유 정유수율 3~8월 12% 이상'],
      basis: '11월 3일의 이전 확인 항공유 참고값 하락은 하방 요인이지만 최신 평가와 공식 기간평균은 미확인입니다.',
      risk: '원유 반등·원/달러 소폭 상승과 해상안전 위험이 인하 가능성을 제약합니다.',
      impacts: ['인하 압력과 반등 위험 혼재, 신뢰도 낮음. 공식 단계·금액은 미확정입니다.', '11월 3일 이전 참고값 유지, 09시 기준 최신 평가 미확인. 4일 값은 공개시각 입증 부족으로 보류.', '전일 대비 0.6원 상승으로 원화 환산 비용의 소폭 상방 압력입니다.', '11월 5일 정산가 반등은 상방 압력이며 공식 MOPS 평균이 아닙니다.', 'IMO는 11월 3일 이전 집계이며 09시 기준 최신 집계는 미확인입니다. 통항 관측과 범위가 다릅니다.']
    },
    en: {
      desc: 'November surcharges and December outlook: November 5 oil settlements and Seoul FX, Windward November 4 observations and EIA analysis. Earlier jet references and IMO counts retain their dates and verification limits.',
      expectation: 'December outlook: downward pressure and rebound risks coexist',
      dec: 'December is calculated over October 16–November 15. The earlier verified jet reference had fallen, while the November 5 oil rebound, slightly higher USD/KRW and maritime risks push upward. Downward pressure and rebound risks coexist, with low confidence. Official cumulative MOPS, average FX, stage and amounts remain unconfirmed.',
      fx: 'The November 5 Seoul 15:30 daytime close was 1,342.1 KRW/USD, up 0.6 won, reported by NEWSIS at 15:59:49 KST. It adds slight upward conversion pressure. This is neither a live November 6 rate nor the December calculation-period average; published surcharges are not recalculated at spot FX.',
      oil: 'November 5 futures settlements: January 2027 Brent 98.29 USD/bbl, up 3.67 (3.88%); December 2026 WTI 90.52, up 2.40 (2.72%). Yonhap’s republication appeared November 6 at 06:07:09 KST, corroborated by Reuters. The rebound after the previous fall adds short-term upward pressure; it is neither a MOPS average nor confirmation of safe passage.',
      jet: 'Singapore Jet retains an earlier verified reference: CommodityScope’s November 3 private daily assessment of 164.52 USD/bbl. The latest assessment available at November 6, 09:00 KST is unconfirmed. The November 4 observation found later is withheld because pre-cutoff publication is unproven. Low-confidence third-party data, not Platts MOPS or an official period average.',
      imo: 'The retained earlier IMO Middle East count is 128 incidents and 24 seafarer deaths as of November 3. The latest count available at November 6, 09:00 KST is unconfirmed. A later-found update is withheld because pre-cutoff publication could not be established. This is neither Hormuz alone nor a crossing count.',
      traffic: 'Windward’s November 5 edition observed five Hormuz crossings on November 4: two inbound and three outbound. No outbound tanker was observed; one outbound cargo vessel was detected without AIS. Provider coverage is not exhaustive traffic, crude throughput or proof of restored safety.',
      eia: 'EIA’s November 5 analysis covers US refinery yields through August 2026. Jet-fuel yield first exceeded 12% in March and remained at or above 12% through August. This describes production allocation encouraged by high refining margins, not current jet supply, Singapore prices or MOPS averages.',
      context: 'Price rebounds and observed crossing counts do not establish a peace deal or restored shipping safety. OPEC+’s November 1 decision keeps December required production at September levels; the next meeting is November 29. Required production is distinct from actual output and exports.',
      marine: 'Earlier IMO count: 128 incidents, 24 deaths (Nov 3) | Windward: 5 crossings (observed Nov 4)',
      heads: ['USD/KRW 1,342.1: November 5 daytime close rises 0.6 won', 'Brent 98.29; WTI 90.52: November 5 settlements rebound', 'Windward observes five Hormuz crossings on November 4', 'EIA: US jet-fuel refinery yield at least 12% in March–August'],
      basis: 'The earlier November 3 jet reference had fallen; the latest assessment and official period average remain unconfirmed.',
      risk: 'Rebounding crude, slightly higher USD/KRW and maritime risks constrain the possibility of a reduction.',
      impacts: ['Downward pressure and rebound risks coexist, with low confidence. Official stage and amounts unconfirmed.', 'Earlier November 3 reference retained; latest at 09:00 unconfirmed. November 4 publication before cutoff is unproven.', 'The daily 0.6-won increase adds slight upward pressure to won conversion costs.', 'The November 5 settlement rebound adds upward pressure; it is not the official MOPS average.', 'IMO retains the earlier November 3 count; latest at 09:00 is unconfirmed. Its scope differs from observed crossings.']
    },
    ja: {
      desc: '11月の燃油サーチャージと12月見通し。11月5日の原油清算値・ソウル為替、Windwardの4日観測、EIA分析を確認。以前確認した航空燃料参考値・IMO集計は日付と検証限界を明記します。',
      expectation: '12月予想：引き下げ圧力と反発リスクが混在',
      dec: '12月の算定期間は10月16日～11月15日です。以前確認した航空燃料参考値の下落と、11月5日の原油反発・USD/KRW小幅上昇・海上リスクが交錯し、引き下げ圧力と反発リスクが混在します。信頼度は低く、公式累積MOPS・平均為替・段階・金額は未確定です。',
      fx: '11月5日ソウル15:30の日中終値は1,342.1 KRW/USD、前日比0.6ウォン上昇。NEWSISの15:59:49報道です。ウォン換算費用への小幅な上昇圧力ですが、11月6日のリアルタイム値や12月算定平均ではありません。公示額を直物為替で再計算しません。',
      oil: '11月5日の先物清算値はBrent 2027年1月限98.29 USD/bbl（+3.67、+3.88%）、WTI 2026年12月限90.52（+2.40、+2.72%）。聯合ニュース再配信は11月6日06:07:09 KST、Reutersでも確認しました。前日の急落後の反発は短期上昇要因で、MOPS平均や安全な通航の証明ではありません。',
      jet: 'Singapore Jetは以前確認したCommodityScope 11月3日の民間日次評価164.52 USD/bblを維持します。11月6日09:00 KST時点の最新評価は未確認です。後から確認した4日観測値は基準時刻前の公開を立証できず保留しました。信頼度の低い第三者評価で、Platts MOPSや公式平均ではありません。',
      imo: 'IMOは以前確認した11月3日時点の中東海域事件128件・船員死亡24人を維持します。11月6日09:00 KST時点の最新集計は未確認。後から確認した更新資料は基準時刻前の公開を立証できず保留しました。ホルムズだけの集計や通航回数ではありません。',
      traffic: 'Windwardの11月5日版は4日にホルムズ通航5回（入域2・出域3）を観測。出域タンカーは観測されず、貨物船1隻はAISなしで検出されました。事業者の観測範囲であり、全通航数・原油流量・安全回復の証明ではありません。',
      eia: 'EIAの11月5日分析は2026年8月までの米国製油得率を扱います。航空燃料得率は3月に初めて12%を超え、8月まで12%以上でした。高い精製利幅に伴う製品配分であり、現在の供給量・Singapore Jet価格・MOPS平均ではありません。',
      context: '価格反発や観測通航数から和平合意や船舶安全の正常化は確認できません。OPEC+の11月1日決定は12月の要求生産量を9月水準に維持し、次回会合は11月29日です。実際の生産・輸出量とは区別します。',
      marine: 'IMO以前の集計128件・死者24人（11月3日）| Windward 5回（11月4日観測）',
      heads: ['USD/KRW 1,342.1：11月5日の日中終値は0.6ウォン上昇', 'Brent 98.29・WTI 90.52：11月5日清算値は反発', 'Windward：11月4日にホルムズ通航5回を観測', 'EIA：米航空燃料の製油得率は3～8月に12%以上'],
      basis: '以前確認した11月3日の航空燃料参考値下落は下方要因ですが、最新評価と公式期間平均は未確認です。',
      risk: '原油反発・USD/KRW小幅上昇・海上リスクが引き下げの可能性を抑えます。',
      impacts: ['引き下げ圧力と反発リスクが混在、信頼度低。公式段階・金額は未確定。', '以前の11月3日参考値を維持。09時時点の最新評価は未確認で4日分は保留。', '前日比0.6ウォン上昇で換算費用に小幅な上昇圧力。', '11月5日の清算値反発は上昇要因。公式MOPS平均ではありません。', 'IMOは以前の11月3日集計、09時時点の最新集計は未確認。通航観測とは範囲が異なります。']
    },
    zh: {
      desc: '11月燃油附加费及12月展望：核查11月5日原油结算、首尔汇率、Windward的4日通行观测和EIA分析。保留航空煤油及IMO以前确认值的日期与核查限制。',
      expectation: '12月预期：下调压力与反弹风险并存',
      dec: '12月计算期为10月16日至11月15日。此前确认的航空煤油参考值下跌，而11月5日原油反弹、美元兑韩元小涨及海上风险形成上行压力。下调压力与反弹风险并存，置信度低。官方累计MOPS、平均汇率、档位和金额未确定。',
      fx: '11月5日首尔15:30日间收盘为1,342.1 KRW/USD，较前日上涨0.6韩元，NEWSIS于15:59:49报道。此为韩元换算成本的小幅上行因素，并非11月6日实时汇率或12月计算期均值，不能据此重算已公布收费。',
      oil: '11月5日期货结算：2027年1月Brent为98.29 USD/bbl（+3.67、+3.88%），2026年12月WTI为90.52（+2.40、+2.72%）。韩联社转载发表于11月6日06:07:09 KST，并经Reuters交叉核查。前日大跌后的反弹带来短期上行压力，并非MOPS均值或安全通行的证明。',
      jet: 'Singapore Jet保留此前确认的CommodityScope 11月3日私人日度评估164.52 USD/bbl。截至11月6日09:00 KST的最新评估未确认。其后查到的4日观测值无法证实截止前公开，故暂缓采用。此低置信度第三方评估不是Platts MOPS或官方期间均价。',
      imo: 'IMO保留此前确认的11月3日中东海域统计：128起事件、24名船员死亡。截至11月6日09:00 KST的最新统计未确认。其后查到的更新无法证实截止前公开，故暂缓采用。这不是霍尔木兹单一海峡或通行次数统计。',
      traffic: 'Windward 11月5日版观测到4日霍尔木兹通行5次：进入2次、离开3次。未观测到出航油轮，1艘出航货船在无AIS信号情况下被发现。仅属服务商观测范围，不是全量通航、原油流量或安全恢复的证明。',
      eia: 'EIA 11月5日分析采用截至2026年8月的美国炼油收率资料。航空燃料收率3月首次超过12%，至8月均保持12%以上。此为高炼油利润促成的产品分配变化，不是当前供应量、Singapore Jet价格或MOPS均价。',
      context: '价格反弹及观测通行数不能证明谈判达成协议或船舶安全恢复。OPEC+11月1日决定维持12月要求产量在9月水平，下次会议为11月29日；与实际产量及出口量分别看待。',
      marine: 'IMO此前统计128起、死亡24人（11月3日）| Windward 5次（11月4日观测）',
      heads: ['美元兑韩元1,342.1：11月5日日间收盘上涨0.6韩元', 'Brent 98.29、WTI 90.52：11月5日结算反弹', 'Windward：11月4日观测霍尔木兹通行5次', 'EIA：美国航空燃料炼油收率3至8月均不低于12%'],
      basis: '此前确认的11月3日航空煤油参考值下降，但最新评估与官方期间均价仍未确认。',
      risk: '原油反弹、美元兑韩元小涨及海上风险限制下调可能。',
      impacts: ['下调压力与反弹风险并存，置信度低。官方档位与金额未确定。', '保留此前11月3日参考值；09时最新评估未确认，4日值暂缓采用。', '较前日上涨0.6韩元，令韩元换算成本小幅承压上行。', '11月5日结算反弹带来上行压力，并非官方MOPS均值。', 'IMO保留此前11月3日统计，09时最新统计未确认；与通行观测范围不同。']
    },
    fr: {
      desc: 'Surtaxes de novembre et perspectives de décembre : pétrole et change du 5 novembre, passages Windward du 4 et analyse EIA. Les références kérosène et OMI antérieures conservent leur date et leurs limites de vérification.',
      expectation: 'Décembre : pressions baissières et risque de rebond coexistent',
      dec: 'Le calcul de décembre couvre le 16 octobre–15 novembre. La référence kérosène antérieure avait baissé, mais le rebond pétrolier du 5 novembre, la légère hausse USD/KRW et les risques maritimes poussent à la hausse. Pressions baissières et risque de rebond coexistent, avec une confiance faible. MOPS officiel, change moyen, niveau et montants restent non confirmés.',
      fx: 'Clôture diurne de Séoul du 5 novembre à 15 h 30 : 1,342.1 KRW/USD, soit +0.6 won, selon NEWSIS à 15:59:49 KST. Cela renchérit légèrement la conversion. Ce n’est ni le cours en direct du 6 novembre ni le change moyen de décembre ; les surtaxes publiées ne sont pas recalculées au comptant.',
      oil: 'Règlements du 5 novembre : Brent janvier 2027 à 98.29 USD/bbl (+3.67 ; +3.88 %) et WTI décembre 2026 à 90.52 (+2.40 ; +2.72 %). La reprise Yonhap a été publiée le 6 novembre à 06:07:09 KST, recoupée avec Reuters. Ce rebond après la chute précédente exerce une pression haussière, sans constituer une moyenne MOPS ou une preuve de passage sûr.',
      jet: 'Singapore Jet conserve la référence antérieure vérifiée : évaluation privée CommodityScope du 3 novembre, 164.52 USD/bbl. La dernière évaluation disponible au 6 novembre à 09:00 KST n’est pas confirmée. Celle du 4, consultée ensuite, est écartée faute de preuve de publication avant la limite. Confiance faible, ni Platts MOPS ni moyenne officielle.',
      imo: 'Le bilan OMI antérieur conservé est de 128 incidents au Moyen-Orient et 24 marins décédés au 3 novembre. Le dernier bilan disponible au 6 novembre à 09:00 KST n’est pas confirmé. La mise à jour consultée ensuite est écartée faute de preuve de publication avant la limite. Ni Hormuz seul ni un nombre de passages.',
      traffic: 'Windward, édition du 5 novembre, observe cinq passages à Hormuz le 4 : deux entrées et trois sorties. Aucun pétrolier sortant observé ; un cargo sortant détecté sans AIS. Ce périmètre fournisseur ne mesure ni tout le trafic ni le débit de brut et ne prouve pas le retour de la sécurité.',
      eia: 'L’analyse EIA du 5 novembre porte sur les rendements des raffineries américaines jusqu’en août 2026. Celui du kérosène a dépassé 12 % pour la première fois en mars, restant au moins à 12 % jusqu’en août. Répartition de production favorisée par les marges, et non offre actuelle, prix de Singapour ou moyenne MOPS.',
      context: 'Rebond des prix et passages observés ne prouvent ni accord de paix ni sécurité retrouvée. La décision OPEP+ du 1er novembre maintient la production requise de décembre au niveau de septembre ; prochaine réunion le 29 novembre. À distinguer de la production et des exportations effectives.',
      marine: 'Bilan OMI antérieur : 128 incidents, 24 morts (3 nov.) | Windward : 5 passages (observés le 4 nov.)',
      heads: ['USD/KRW 1,342.1 : clôture diurne du 5 novembre en hausse de 0.6 won', 'Brent 98.29 ; WTI 90.52 : rebond des règlements du 5 novembre', 'Windward observe cinq passages à Hormuz le 4 novembre', 'EIA : rendement du kérosène américain d’au moins 12 % de mars à août'],
      basis: 'La référence antérieure du 3 novembre avait baissé ; dernière évaluation et moyenne officielle restent non confirmées.',
      risk: 'Le rebond du brut, la légère hausse USD/KRW et les risques maritimes limitent la possibilité de baisse.',
      impacts: ['Pressions baissières et risque de rebond coexistent, confiance faible. Niveau et montants non confirmés.', 'Référence antérieure du 3 novembre conservée ; dernière valeur à 09:00 non confirmée, celle du 4 écartée.', 'La hausse quotidienne de 0.6 won renchérit légèrement les coûts convertis.', 'Le rebond des règlements du 5 novembre pousse à la hausse ; ce n’est pas la moyenne MOPS officielle.', 'L’OMI conserve le bilan antérieur du 3 novembre ; dernier à 09:00 non confirmé. Périmètre distinct des passages.']
    },
    de: {
      desc: 'November-Zuschläge und Dezember-Ausblick: Öl und Seoul-Wechselkurs vom 5. November, Windward-Passagen vom 4. und EIA-Analyse. Frühere Kerosinreferenzen und IMO-Zahlen behalten Datum und Prüfgrenzen.',
      expectation: 'Dezember: Abwärtsdruck und Wiederanstiegsrisiken zugleich',
      dec: 'Der Dezember-Berechnungszeitraum läuft vom 16. Oktober bis 15. November. Die frühere Kerosinreferenz war gesunken; Ölpreisanstieg am 5. November, leicht höherer USD/KRW-Kurs und maritime Risiken wirken aufwärts. Abwärtsdruck und Wiederanstiegsrisiken bestehen zugleich, bei geringem Vertrauen. Offizielles MOPS, Durchschnittskurs, Stufe und Beträge bleiben unbestätigt.',
      fx: 'Seouler Tagesschluss am 5. November um 15:30: 1,342.1 KRW/USD, plus 0.6 Won, laut NEWSIS um 15:59:49 KST. Das erhöht die Umrechnungskosten leicht. Kein Echtzeitkurs vom 6. November oder Dezember-Durchschnitt; veröffentlichte Zuschläge werden nicht zum Kassakurs neu berechnet.',
      oil: 'Abrechnung am 5. November: Brent Januar 2027 bei 98.29 USD/bbl (+3.67; +3.88 %), WTI Dezember 2026 bei 90.52 (+2.40; +2.72 %). Yonhaps Weiterveröffentlichung erschien am 6. November um 06:07:09 KST, durch Reuters gegengeprüft. Der Wiederanstieg nach dem Vortagesrückgang wirkt kurzfristig aufwärts, ist aber weder MOPS-Mittelwert noch Nachweis sicherer Passage.',
      jet: 'Singapore Jet behält die früher geprüfte CommodityScope-Tagesbewertung vom 3. November bei: 164.52 USD/bbl. Die neueste zum 6. November um 09:00 KST verfügbare Bewertung ist unbestätigt. Die später gefundene Beobachtung vom 4. bleibt mangels Beleg einer Veröffentlichung vor dem Stichtag unberücksichtigt. Geringes Vertrauen, weder Platts MOPS noch offizieller Durchschnitt.',
      imo: 'Beibehalten wird der früher bestätigte IMO-Stand vom 3. November: 128 Nahost-Vorfälle, 24 getötete Seeleute. Der neueste zum 6. November um 09:00 KST verfügbare Stand ist unbestätigt. Die später gefundene Aktualisierung bleibt mangels belegter Veröffentlichung vor dem Stichtag unberücksichtigt. Weder reine Hormus-Zählung noch Passagezahl.',
      traffic: 'Windwards Ausgabe vom 5. November beobachtet am 4. fünf Hormus-Passagen: zwei einwärts, drei auswärts. Kein auslaufender Tanker wurde beobachtet; ein auslaufender Frachter wurde ohne AIS erkannt. Anbieterabdeckung ist weder vollständiger Verkehr noch Rohöldurchsatz oder Nachweis wiederhergestellter Sicherheit.',
      eia: 'Die EIA-Analyse vom 5. November behandelt US-Raffinerieausbeuten bis August 2026. Die Kerosinausbeute überschritt im März erstmals 12 % und blieb bis August mindestens bei 12 %. Dies beschreibt durch hohe Margen begünstigte Produktverteilung, nicht aktuelle Versorgung, Singapur-Preise oder MOPS-Mittelwerte.',
      context: 'Preiserholung und beobachtete Passagen belegen weder ein Friedensabkommen noch sichere Schifffahrt. OPEC+ hält laut Beschluss vom 1. November die Dezember-Fördervorgabe auf September-Niveau; nächstes Treffen am 29. November. Vorgaben sind von tatsächlicher Förderung und Ausfuhr zu unterscheiden.',
      marine: 'Früherer IMO-Stand: 128 Vorfälle, 24 Tote (3. Nov.) | Windward: 5 Passagen (beobachtet am 4. Nov.)',
      heads: ['USD/KRW 1,342.1: Tagesschluss am 5. November um 0.6 Won höher', 'Brent 98.29; WTI 90.52: Abrechnungspreise am 5. November erholt', 'Windward beobachtet fünf Hormus-Passagen am 4. November', 'EIA: US-Kerosinausbeute von März bis August mindestens 12 %'],
      basis: 'Die frühere Kerosinreferenz vom 3. November war gesunken; neueste Bewertung und offizieller Durchschnitt bleiben unbestätigt.',
      risk: 'Rohölerholung, leicht höherer USD/KRW-Kurs und maritime Risiken begrenzen mögliche Senkungen.',
      impacts: ['Abwärtsdruck und Wiederanstiegsrisiken zugleich, geringes Vertrauen. Stufe und Beträge unbestätigt.', 'Frühere Referenz vom 3. bleibt; neueste um 09:00 unbestätigt. Die Bewertung vom 4. ist zurückgestellt.', 'Der Tagesanstieg um 0.6 Won erhöht die Umrechnungskosten leicht.', 'Der Preisanstieg zur Abrechnung am 5. November wirkt aufwärts; kein offizieller MOPS-Durchschnitt.', 'IMO behält den früheren Stand vom 3. November; neuester um 09:00 unbestätigt. Anderer Umfang als Passagebeobachtungen.']
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
    ['CommodityScope · 2026-11-03 retained private assessment', urls.jet],
    ['NEWSIS · 2026-11-05 Seoul daytime close', urls.fx],
    ['KFE News · 2026-11-05 15:30 close', urls.fxClose],
    ['Yonhap / Korea Economic TV · 2026-11-05 settlements and contracts', urls.oil],
    ['Reuters / Business Times · 2026-11-05 settlements', urls.oilReuters],
    ['IMO · earlier verified count as at 2026-11-03; latest at cutoff unconfirmed', urls.imo],
    ['Windward · 2026-11-05 edition / 2026-11-04 observations', urls.traffic],
    ['EIA · 2026-11-05 release / US yields through 2026-08', urls.eia],
    ['EIA · official publication RSS', urls.eiaRss],
    ['OPEC · 2026-11-01 production policy', urls.policy]
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
    questions[3] = questions[3].replace(/1,341\.5/g, '1,342.1');
    var update = labels[0] + ': ' + stamp + ' · ' + labels[1] + ': ' + asOf;
    var rowNames = p.rows.map(function (row) { return row[0]; });
    var rows = [
      [rowNames[0], p.status, c.dec],
      [rowNames[1], 'MOPS 173.89 USD/bbl (2026-09-16–10-15) | Singapore Jet 164.52 USD/bbl (2026-11-03)', c.jet],
      [rowNames[2], '1,342.1 KRW/USD (2026-11-05 15:30 KST; +0.6)', c.fx],
      [rowNames[3], 'Brent 98.29 (2027-01) / WTI 90.52 (2026-12) USD/bbl · 2026-11-05', c.oil],
      [rowNames[4], c.marine, c.imo + ' ' + c.traffic]
    ];
    var answers = [nov, c.dec, c.jet, c.fx, c.oil, c.imo + ' ' + c.traffic, c.context];
    r.rows[lang] = rows;
    Object.assign(p, {
      desc: c.desc, sub: update + ' · ' + c.dec, newsSub: update + ' · ' + p.status,
      updated: update, updatedLabel: labels[0], intro: p.status + ' ' + c.dec, rows: rows,
      summary: [p.status, c.dec, rows[1][1], rows[2][1], rows[3][1], c.marine],
      foot: c.jet + ' ' + nov, basisBody: nov + ' ' + c.jet,
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
        [rowNames[1], 'MOPS 173.89 | Singapore Jet 164.52 USD/bbl (2026-11-03)', c.impacts[1]],
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
    {key:'fx', name:'NEWSIS', reported:'2026-11-05T15:59:49+09:00', event:'2026-11-05T15:30:00+09:00', citations:[urls.fx, urls.fxClose]},
    {key:'oil', name:'Yonhap / Korea Economic TV', reported:'2026-11-06T06:07:09+09:00', event:'2026-11-05', citations:[urls.oil, urls.oilReuters]},
    {key:'traffic', name:'Windward', reported:'2026-11-05', event:'2026-11-04', publication:null, verification:'provider_tracked_observation', verified:'2026-11-06T09:00:51+09:00', modified:'2026-11-05T06:41:36Z'},
    {key:'eia', name:'EIA', reported:'2026-11-05T09:00:00-05:00', period:'2026-03/2026-08', citations:[urls.eia, urls.eiaRss]}
  ];
  var cards = definitions.map(function (def, i) {
    var card = {
      id:'market-20261106-' + (i + 1), category:def.key === 'eia' ? 'institution' : 'market',
      priority:i + 1, date:'2026-11-06', publishedAt:stamp, updatedAt:stamp,
      reportedDate:def.reported, eventDate:def.event || null, dateKind:'site_update',
      sourcePublishedAt: Object.prototype.hasOwnProperty.call(def, 'publication') ? def.publication : def.reported,
      sourceUrl:urls[def.key], citationUrls:def.citations || [urls[def.key]],
      sourceVerificationStatus:def.verification || 'published_source',
      badge:'NEW', aiSummary:true, relevanceScore:1 - i / 100, i18n:{}
    };
    if (def.period) card.observationPeriod = def.period;
    if (def.verified) card.sourceVerifiedAt = def.verified;
    if (def.modified) card.sourceLastModifiedAt = def.modified;
    if (def.publication === null) card.sourcePublicationNote = 'Dated edition or count; exact publication clock is not provided. HTTP Last-Modified, where present, is separate.';
    Object.keys(copy).forEach(function (lang) {
      var c = copy[lang], label = captions[lang];
      var dates = label[2] + ': ' + def.reported + (def.event ? ' · ' + label[3] + ': ' + def.event : '') + '. ';
      card.i18n[lang] = {
        title:c.heads[i], aiBrief:c.heads[i], summary:dates + c[def.key], impact:c.dec,
        sourceName:def.name, sourceRefs:card.citationUrls.map(function (url) {
          var name = url === urls.fxClose ? 'KFE News' : url === urls.oilReuters ? 'Reuters / Business Times' : def.name;
          return {name:name, url:url};
        }), tags:[label[4]], links:[], faq:[]
      };
    });
    card.i18n.cn = card.i18n.zh;
    return card;
  });
  r.newsCards = cards.concat(r.newsCards.filter(function (card) { return !/^market-20261106-/.test(card.id); }));
  window.AERO_MARKET_RELEASE = r;
  window.AERO_MARKET_NUMBERS_LATEST = n;
})();
