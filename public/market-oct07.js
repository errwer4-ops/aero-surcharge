/* October 7 release: data updates only, existing five-row layout and renderer. */
(function(){
'use strict';
var r=window.AERO_MARKET_RELEASE;if(!r)return;
var stamp='2026-10-07T08:45:00+09:00',asOf='2026.10.07 08:45 KST';
var copy={
  "ko": {
    "status": "10월 23단계 현재 적용 · 11월 MOPS 산정 중 · 상승 압력 우세",
    "verdict": "11월 MOPS 상승 압력 우세 · 원화 강세와 원유 공급 회복이 강하게 완충 · 실제 KRW 부과액은 보합~제한적 상승 가능 · 방향성 신뢰도 보통~다소 높음 · 특정 단계 신뢰도 낮음",
    "krw": "MOPS 방향과 원화 부과액 방향은 다릅니다. 현재 원화 강세가 평균환율에도 반영되면 KRW 상승폭은 MOPS 상승폭보다 작거나 일부 구간에서 보합에 가까울 수 있습니다. 최종 평균·단계·금액은 아직 미확정입니다.",
    "fx": [
      "원/달러 1,337원대…11월 KRW 유류할증료 강한 완충",
      "2026.10.07 08:45 KST 제공 브리핑 기준 USD/KRW는 약 1,337.16원, 100 JPY는 845.56원입니다. 10월 확정 평균환율 1,370.95원보다 33.79원 낮지만 현재 현물환율을 11월 평균으로 대체하지 않습니다. 9월 16일~10월 15일 평균환율도 낮아지면 MOPS 상승분이 실제 원화 부과액에서 일부 상쇄될 수 있습니다.",
      "원화 강세는 KRW 금액의 강한 완충입니다. 11월 인상이나 특정 단계는 확정하지 않습니다."
    ],
    "exports": [
      "중동 원유·정제품 수출 회복…항공유 회복 속도는 별개",
      "Vitol CEO는 10월 6일 최근 7~10일 중동에서 원유 약 12m bpd와 정제품 약 2m bpd가 수출됐다고 설명했습니다. 별도의 9월 Vortexa 통계는 이란을 제외한 Gulf 원유·콘덴세이트·정제품 합계 19.2m bpd로 전쟁 전 23.6m bpd의 약 81%입니다. 원유·콘덴세이트 회복률 약 91%와 정제품 약 60%는 범위가 다르며 서로 다른 기간의 수치를 합산하지 않습니다.",
      "원유 공급 회복은 완충이지만 정제 제약·중국 화물 차질·높은 운임 때문에 Jet 공급이 동시에 정상화되는 것은 아닙니다. India는 잠재적 부분 대체 후보입니다."
    ],
    "pipeline": [
      "Saudi East-West 우회수송…공급 지속과 공격위험 구분",
      "Saudi East-West Pipeline과 Yanbu 우회 경로가 공급을 완충합니다. 약 4m bpd는 제공 브리핑의 우회수송 참고값이며, 10월 6일 장관의 “화요일 오전까지 5.8m barrels” 발표와는 구분합니다. 보도별 일일 수송량·용량 표현이 달라 5.8m barrels를 자동으로 5.8m bpd로 바꾸지 않습니다. Reuters는 최근 차질 보도에도 흐름이 중단되지 않았다는 소식통 설명을 전했습니다.",
      "공급 지속은 강한 완충이나 추가 공격위험·Red Sea 운임·보험비까지 정상화됐다는 뜻은 아닙니다."
    ],
    "g7": [
      "G7 1억 배럴 합의…IEA 세부안 10월 14~15일 결정 예정",
      "G7은 기존 약속 이행 차원에서 4개월간 100m barrels를 조정 방출하고 초기 20일에 상당한 diesel 물량을 앞당기는 계획을 발표했습니다. 10월 6일 Reuters는 소식통을 인용해 IEA가 10월 14~15일 국가별 물량과 원유·diesel 구성을 결정할 예정이라고 보도했습니다. 세부안은 아직 확정되지 않았으며 전량 공급 완료나 기존 약속 외 신규 1억 배럴로 표현하지 않습니다.",
      "결정 시점이 11월 산정마감과 가까워 실제 인도 일정에 따라 12월 산정에 더 큰 직접 효과가 날 가능성도 있습니다. 이는 전망이지 확정된 영향이 아닙니다."
    ],
    "eia": [
      "EIA, 4분기 Brent 평균 전망 105달러…현물과 구분",
      "EIA의 2026년 10월 6일 STEO는 4분기 Brent 평균을 105달러/bbl로 전망했습니다. 전망은 10월 1일 작성 완료됐고, 지난달 전망보다 14달러 높습니다. 10월 6일 실제 종가는 Brent 100.58달러, WTI 89.44달러로 각각 소폭 상승했습니다. 장기 전망·종가·Singapore Jet·MOPS는 서로 다른 데이터입니다.",
      "원유 공급 회복에도 재고와 중동 위험이 남습니다. EIA 전망을 11월 항공사 단계나 MOPS 확정값으로 사용하지 않습니다."
    ],
    "airport": [
      "Saudi 공항 3명 부상 확인…Bab el-Mandeb 안전은 별개",
      "Saudi GACA는 10월 5일 저녁 Jazan·Najran 공항 공격으로 3명이 경상을 입고 제한적인 물적 피해가 발생했다고 10월 6일 발표했습니다. 당국 발표의 실제 피해 확인과 Houthis의 개별 공격 주장은 구분하며, GACA 발표만으로 모든 공격의 책임을 확정하지 않습니다. Saudi 지원 예멘 정부군의 Mocha/Bab el-Mandeb 진격 주장도 완전한 해상 통제나 missile·drone 위협 해소를 의미하지 않습니다.",
      "인프라·선박안전·운임·보험 위험은 지속됩니다. 지상 통제 완화 가능성과 해상 안전 정상화를 동일시하지 않습니다."
    ],
    "faqQ": [
      "현재 10월 국제선 유류할증료는 몇 단계인가요?",
      "11월 유류할증료는 오를 가능성이 높은가요?",
      "Singapore Jet 176.78달러가 11월 MOPS인가요?",
      "Jet regrade +4.95달러는 무슨 뜻인가요?",
      "왜 원유공급이 회복됐는데 항공유 가격은 높나요?",
      "Hormuz는 정상화됐나요?",
      "환율 1,337원은 11월 부과액에 어떤 의미인가요?",
      "G7 1억 배럴은 이미 시장에 풀렸나요?"
    ],
    "g7Answer": "방출 합의는 있지만 국가별 물량·원유/diesel 구성은 미확정입니다. Reuters 소식통 보도에 따르면 IEA가 10월 14~15일 세부안을 결정할 예정이며 전량 방출 완료는 아닙니다."
  },
  "en": {
    "status": "October Level 23 applies · November MOPS calculation underway · upward pressure dominates",
    "verdict": "November MOPS upward pressure dominates · strong KRW and crude recovery cushion costs · KRW charges may be flat to modestly higher · directional confidence moderate to somewhat high · specific-level confidence low",
    "krw": "MOPS direction differs from KRW charges. If KRW strength also lowers calculation-period average FX, charges may rise much less than MOPS or stay near flat on some routes. Final averages, level and amounts remain unconfirmed.",
    "fx": [
      "USD/KRW near 1,337: strong cushion for November KRW charges",
      "The supplied October 7 08:45 KST briefing quotes USD/KRW near 1,337.16 and KRW 845.56 per 100 JPY. This is KRW 33.79 below October confirmed average FX of 1,370.95, but spot FX is not November average FX. A lower September 16–October 15 average could offset part of higher MOPS in actual KRW charges.",
      "KRW strength strongly cushions amounts; no November increase or specific level is confirmed."
    ],
    "exports": [
      "Middle East crude and product exports recover at different speeds",
      "On October 6, Vitol CEO described roughly 12m bpd of crude and 2m bpd of refined products leaving the region over the preceding 7–10 days. Separate September Vortexa data put Gulf crude, condensate and products excluding Iran at 19.2m bpd, around 81% of prewar 23.6m. Crude/condensate recovery near 91% versus refined fuels near 60% uses distinct product scopes; these different periods must not be added together.",
      "Crude recovery cushions shortages without normalizing jet supply: refining limits, China cargo disruption and freight persist. India is a potential partial substitute."
    ],
    "pipeline": [
      "Saudi East-West bypass: continuing flow, persistent attack risk",
      "East-West Pipeline and Yanbu bypass routes cushion supplies. Around 4m bpd is a supplied briefing reference, separate from the minister’s October 6 statement of 5.8m barrels by Tuesday morning. Reports differ on rate versus capacity wording, so the barrel figure is not automatically converted to 5.8m bpd. Reuters cited a source saying flow had not been interrupted despite recent disruption reports.",
      "Continuing supply is a strong buffer, not proof that attack risks, Red Sea freight or insurance have normalized."
    ],
    "g7": [
      "G7 100m-barrel agreement: IEA details expected October 14–15",
      "The G7 announced coordinated implementation of existing commitments: 100m barrels over four months with substantial diesel front-loaded into 20 days. October 6 Reuters reporting cites sources expecting the IEA to settle country allocations and crude/diesel composition on October 14–15. Details remain pending; this is neither all barrels already delivered nor a confirmed extra 100m on top of previous pledges.",
      "The meeting is close to November calculation closure. Depending on delivery, December calculation may receive more direct relief; this is analysis, not confirmed timing of price effects."
    ],
    "eia": [
      "EIA forecasts Q4 Brent at USD 105: not a spot price",
      "The October 6 EIA STEO forecasts Q4 2026 Brent averaging USD 105/bbl, USD 14 above last month’s forecast. Forecast preparation ended October 1. October 6 market closes were Brent USD 100.58 and WTI USD 89.44, both slightly higher. Quarterly forecasts, daily closes, Singapore jet and MOPS are different measures.",
      "Inventory and Middle East risks remain despite crude recovery. The EIA forecast cannot establish November airline levels or MOPS."
    ],
    "airport": [
      "Saudi airports: three injuries confirmed, maritime safety still uncertain",
      "On October 6, Saudi GACA reported three minor injuries and limited damage from October 5 evening attacks on Jazan and Najran airports. Authority-confirmed damage differs from individual Houthi claims; the GACA statement alone does not establish all attack attribution. Saudi-backed Yemeni government claims of gains near Mocha/Bab el-Mandeb also do not establish full maritime control or an end to missiles and drones.",
      "Infrastructure, vessel safety, freight and insurance risks persist. Possible ground-control relief is not shipping normalization."
    ],
    "faqQ": [
      "Which October level currently applies?",
      "Is November likely to rise?",
      "Is Singapore Jet USD 176.78 November MOPS?",
      "What does regrade +USD 4.95 mean?",
      "Why is jet high despite crude supply recovery?",
      "Has Hormuz normalized?",
      "What does USD/KRW 1,337 mean for charges?",
      "Are the G7 100m barrels already delivered?"
    ],
    "g7Answer": "Release is agreed, but country volumes and crude/diesel split remain pending. Reuters sources expect IEA details on October 14–15; full delivery is not confirmed."
  },
  "ja": {
    "status": "10月23段階が適用中・11月MOPS算定中・上昇圧力優勢",
    "verdict": "11月MOPSは上昇圧力優勢・ウォン高と原油供給回復が緩衝・KRW負担は横ばい〜限定的上昇の可能性・方向信頼度は中〜やや高・特定段階は低信頼",
    "krw": "MOPSの方向とウォン負担は異なります。ウォン高が算定期間平均為替にも反映されれば、負担上昇はMOPSより小さく一部路線で横ばいに近くなる可能性があります。最終平均・段階・金額は未確定です。",
    "fx": [
      "USD/KRW約1,337：11月ウォン負担を強く緩衝",
      "提供された10月7日08:45 KST資料のUSD/KRWは約1,337.16、100円は845.56ウォンです。10月確定平均1,370.95より33.79低いものの、現物為替は11月平均ではありません。9月16日〜10月15日の平均も下がればMOPS上昇の一部が実際のウォン負担で相殺され得ます。",
      "ウォン高は金額の強い緩衝要因で、11月値上げや特定段階は未確定です。"
    ],
    "exports": [
      "中東の原油・製品輸出回復：航空燃料とは速度が異なる",
      "Vitol CEOは10月6日、直近7〜10日の輸出を原油約12m bpd、精製品約2m bpdと説明しました。別のVortexa9月統計ではイランを除く湾岸の原油・コンデンセート・製品計19.2m bpd、戦前23.6mの約81％です。原油類約91％と精製燃料約60％は製品範囲が異なり、別期間の数値を合算しません。",
      "原油回復は緩衝ですが製油制約・中国貨物の混乱・運賃によりJet供給は同時に正常化しません。インドは部分代替の候補です。"
    ],
    "pipeline": [
      "Saudi East-West迂回：供給継続と攻撃リスクを区別",
      "East-West PipelineとYanbu迂回は供給を緩衝します。約4m bpdは提供資料の参考値で、10月6日大臣の「火曜朝まで5.8m barrels」発表とは別です。報道で流量・能力の単位が異なるため自動的に5.8m bpdへ換算しません。Reutersは最近の障害報道にも流れが途絶えていないとの関係者説明を伝えました。",
      "供給継続は強い緩衝であり、追加攻撃・紅海運賃・保険の正常化ではありません。"
    ],
    "g7": [
      "G7の1億バレル合意：IEA詳細は10月14〜15日予定",
      "G7は既存約束の履行として4か月100m barrels、最初の20日に相当量のdieselを前倒しする計画を示しました。10月6日Reutersは関係者を引用し、IEAが10月14〜15日に国別配分と原油/diesel構成を決める予定と報道しました。詳細未確定で、全量引渡し済みや追加の新規1億バレルとはしません。",
      "会議は11月算定締切に近く、引渡し次第で12月算定への直接効果が大きい可能性があります。効果時期は分析で未確定です。"
    ],
    "eia": [
      "EIA：第4四半期Brent平均105ドル、現物値とは別",
      "10月6日EIA STEOは2026年第4四半期Brent平均105ドル/bblを予測し、前月より14ドル上方です。予測作成完了日は10月1日。10月6日終値はBrent100.58、WTI89.44ドルで小幅上昇しました。四半期予測・終値・Singapore Jet・MOPSは別指標です。",
      "原油回復にも在庫・中東リスクが残ります。EIA予測を11月段階やMOPS確定値にしません。"
    ],
    "airport": [
      "Saudi空港で3人負傷確認：海上安全は未正常化",
      "Saudi GACAは10月6日、前日夕方のJazan・Najran空港攻撃で3人軽傷と限定的損害を報告しました。当局が確認した損害とHouthisの個別攻撃主張を区別し、GACA発表だけで全件の責任を断定しません。Saudi支援イエメン政府軍のMocha/Bab el-Mandeb進展主張も完全な海上支配やミサイル・ドローン脅威解消ではありません。",
      "インフラ・船舶安全・運賃・保険リスクは継続し、地上統制の緩和可能性と海運正常化は異なります。"
    ],
    "faqQ": [
      "現在10月は何段階？",
      "11月は上昇する？",
      "Singapore Jet176.78ドルは11月MOPS？",
      "regrade+4.95ドルの意味は？",
      "原油供給回復でもJetが高いのは？",
      "Hormuzは正常化？",
      "USD/KRW1,337の負担への意味は？",
      "G7の1億バレルは引渡し済み？"
    ],
    "g7Answer": "放出合意はありますが国別数量と原油/diesel構成は未確定です。Reuters関係者によればIEA詳細決定は10月14〜15日予定で、全量引渡し済みではありません。"
  },
  "zh": {
    "status": "10月第23档适用中·11月MOPS计算中·上行压力占优",
    "verdict": "11月MOPS上行压力占优·韩元走强与原油供应恢复缓冲·韩元收费可能持平至有限上涨·方向可信度中等至略高·具体档位可信度低",
    "krw": "MOPS方向不同于韩元收费方向。若韩元走强也降低计算期平均汇率，收费涨幅可能小于MOPS涨幅，部分航线接近持平。最终均价、档位和金额仍未确定。",
    "fx": [
      "USD/KRW约1,337：强力缓冲11月韩元收费",
      "提供的10月7日08:45 KST简报给出USD/KRW约1,337.16，100日元为845.56韩元。比10月确认平均汇率1,370.95低33.79，但现汇不是11月平均汇率。若9月16日至10月15日平均也下降，实际韩元收费可能抵消部分MOPS涨幅。",
      "韩元走强缓冲金额，不代表11月涨价或具体档位已经确认。"
    ],
    "exports": [
      "中东原油与成品油出口恢复：航油速度不同",
      "Vitol CEO于10月6日称，最近7至10天原油约12m bpd、成品油约2m bpd离开中东。另一个Vortexa9月统计为不含伊朗的海湾原油、凝析油及产品合计19.2m bpd，约为战前23.6m的81%。原油类恢复约91%、成品燃料约60%的产品范围不同，不合并不同期间的统计。",
      "原油恢复缓冲短缺，但炼油约束、中国货物中断和高运费使航油供应未必同步正常化。印度是潜在部分替代者。"
    ],
    "pipeline": [
      "Saudi East-West绕行：供油持续但攻击风险仍在",
      "East-West Pipeline及Yanbu绕行缓冲供应。约4m bpd是提供简报的参考值，与10月6日大臣所述“周二上午前5.8m barrels”区分。报道对流量和能力单位表述不同，不自动换成5.8m bpd。Reuters援引消息人士称，近期中断报道之后实际流动并未停止。",
      "持续供应是强力缓冲，不表示攻击风险、红海运费或保险已正常。"
    ],
    "g7": [
      "G7一亿桶协议：IEA细则预计10月14至15日决定",
      "G7宣布履行已有承诺，四个月协调释放100m barrels，前20天优先大量diesel。10月6日Reuters援引消息人士称，IEA预计10月14至15日决定各国分配与原油/diesel构成。细则未定，不表示已全部交付或已有承诺之外新增一亿桶。",
      "会议接近11月计算截止，实际交付安排可能使12月计算获得更直接缓冲；这是分析而非确认的价格影响。"
    ],
    "eia": [
      "EIA预计第四季度Brent均价105美元：不是现货",
      "10月6日EIA STEO预计2026年第四季度Brent均价105美元/bbl，比上月预测高14美元；预测于10月1日完成。10月6日收盘Brent100.58、WTI89.44美元，均小幅上涨。季度预测、收盘、Singapore Jet及MOPS属于不同指标。",
      "原油恢复后库存和中东风险仍在。EIA预测不能用于确定11月航司档位或MOPS。"
    ],
    "airport": [
      "Saudi机场确认3人受伤：海运安全仍不确定",
      "Saudi GACA于10月6日公布，前一晚Jazan、Najran机场攻击造成3人轻伤与有限财产损失。当局确认损失和Houthis逐次攻击主张不同，不能仅依GACA声明判定所有责任。Saudi支持的也门政府军在Mocha/Bab el-Mandeb推进主张也不代表全面海上控制或导弹、无人机威胁消失。",
      "基础设施、船舶安全、运费及保险风险仍在，地面控制缓和可能不等于航运正常化。"
    ],
    "faqQ": [
      "当前10月是第几档？",
      "11月可能上涨吗？",
      "Singapore Jet176.78美元是11月MOPS吗？",
      "regrade+4.95美元是什么意思？",
      "原油供应恢复后为何航油仍高？",
      "Hormuz正常化了吗？",
      "USD/KRW1,337对收费意味着什么？",
      "G7一亿桶已经全部投放吗？"
    ],
    "g7Answer": "已经达成释放协议，但各国数量及原油/diesel构成未定。Reuters消息人士称IEA预计10月14至15日决定细则，不代表已全部交付。"
  },
  "fr": {
    "status": "Niveau 23 applicable en octobre · calcul MOPS novembre en cours · pression haussière dominante",
    "verdict": "MOPS novembre : pression haussière dominante · won fort et offre de brut en reprise amortissent · montants KRW possiblement stables à légèrement supérieurs · confiance directionnelle moyenne à assez élevée · niveau précis peu fiable",
    "krw": "Le sens du MOPS diffère des montants KRW. Si le won fort réduit aussi le change moyen de calcul, la hausse facturée peut être inférieure à celle du MOPS, voire proche de zéro sur certaines routes. Moyennes, niveau et montants définitifs non confirmés.",
    "fx": [
      "USD/KRW vers 1,337 : fort amortisseur des montants novembre",
      "Le briefing fourni du 7 octobre à 08:45 KST indique USD/KRW 1,337.16 et KRW 845.56 pour 100 JPY. Le spot est inférieur de 33.79 à la moyenne octobre confirmée de 1,370.95, sans être la moyenne novembre. Une moyenne plus basse du 16 septembre au 15 octobre pourrait compenser une partie du MOPS dans les montants KRW.",
      "Le won fort amortit les montants ; ni hausse novembre ni niveau précis confirmés."
    ],
    "exports": [
      "Reprise des exportations de brut et produits : rythmes différents",
      "Le 6 octobre, le PDG de Vitol décrit environ 12m bpd de brut et 2m bpd de produits sortis du Moyen-Orient sur 7–10 jours. Les données Vortexa distinctes de septembre totalisent 19.2m bpd de brut, condensats et produits du Golfe hors Iran, environ 81% des 23.6m avant-guerre. Reprise du brut/condensats vers 91% et des carburants vers 60% : périmètres différents, périodes non additionnables.",
      "La reprise du brut ne normalise pas le jet : raffinage, perturbations chinoises et fret persistent. Inde : remplacement partiel potentiel."
    ],
    "pipeline": [
      "Dérivation Saudi East-West : flux maintenus, risque persistant",
      "East-West Pipeline et Yanbu amortissent l’offre. Environ 4m bpd est une référence du briefing fourni, distincte de la déclaration ministérielle du 6 octobre de 5.8m barrels mardi matin. Les unités de débit ou capacité divergent selon les rapports ; pas de conversion automatique en 5.8m bpd. Reuters cite une source indiquant des flux non interrompus malgré les récents rapports de perturbation.",
      "Offre maintenue ne signifie ni disparition des attaques ni normalisation du fret et des assurances en mer Rouge."
    ],
    "g7": [
      "G7 : 100m barils, détails IEA attendus les 14–15 octobre",
      "Le G7 prévoit la mise en œuvre d’engagements existants : 100m barils sur quatre mois, diesel fortement avancé sur 20 jours. Reuters du 6 octobre cite des sources attendant une décision IEA les 14–15 octobre sur les allocations nationales et la composition brut/diesel. Détails non fixés : ni totalité livrée ni nouvelle quantité additionnelle confirmée.",
      "La réunion est proche de la clôture novembre. Selon les livraisons, le calcul décembre pourrait bénéficier davantage ; effet analysé, non garanti."
    ],
    "eia": [
      "EIA : Brent moyen T4 à 105 USD, pas le spot",
      "Le STEO EIA du 6 octobre prévoit Brent moyen T4 2026 à 105 USD/bbl, 14 USD au-dessus du mois précédent. Prévision achevée le 1er octobre. Clôtures du 6 octobre : Brent 100.58 et WTI 89.44 USD, légèrement en hausse. Prévision trimestrielle, clôture, Singapore Jet et MOPS sont distincts.",
      "Stocks et risques régionaux subsistent. La prévision EIA ne fixe ni MOPS ni niveau aérien novembre."
    ],
    "airport": [
      "Aéroports saoudiens : trois blessés, sécurité maritime incertaine",
      "GACA annonce le 6 octobre trois blessés légers et dommages limités après les attaques du 5 octobre soir à Jazan et Najran. Dommages confirmés par l’autorité et revendications houthies sont distincts ; le communiqué seul ne fixe pas toutes les responsabilités. Les avancées revendiquées près de Mocha/Bab el-Mandeb par le gouvernement yéménite soutenu par Riyad ne prouvent ni contrôle maritime total ni fin des missiles/drones.",
      "Risques d’infrastructures, navires, fret et assurance persistants ; détente terrestre éventuelle ne signifie pas navigation normale."
    ],
    "faqQ": [
      "Quel niveau octobre s’applique ?",
      "Novembre risque-t-il de monter ?",
      "Singapore Jet 176.78 USD est-il MOPS novembre ?",
      "Que signifie regrade +4.95 USD ?",
      "Pourquoi le jet reste haut malgré le brut ?",
      "Hormuz est-il normalisé ?",
      "Que signifie USD/KRW 1,337 pour les montants ?",
      "Les 100m barils G7 sont-ils déjà livrés ?"
    ],
    "g7Answer": "Accord conclu, mais allocations nationales et composition brut/diesel en attente. Sources Reuters : détails IEA attendus les 14–15 octobre, pas totalité déjà livrée."
  },
  "de": {
    "status": "Oktober Stufe 23 gilt · November-MOPS-Berechnung läuft · Aufwärtsdruck überwiegt",
    "verdict": "November-MOPS: Aufwärtsdruck überwiegt · starker Won und Rohölerholung puffern · KRW-Beträge möglicherweise stabil bis moderat höher · Richtungssicherheit mittel bis etwas höher · konkrete Stufe unsicher",
    "krw": "MOPS-Richtung und KRW-Beträge unterscheiden sich. Senkt Won-Stärke auch den Berechnungswechselkurs, kann die Gebühr deutlich weniger steigen als MOPS oder auf manchen Strecken fast stabil bleiben. Endmittel, Stufe und Beträge unbestätigt.",
    "fx": [
      "USD/KRW etwa 1,337: starker Puffer für November-Gebühren",
      "Das bereitgestellte Briefing vom 7. Oktober 08:45 KST nennt USD/KRW 1,337.16 und KRW 845.56 je 100 JPY. Spot liegt 33.79 unter Oktobers bestätigtem Mittel 1,370.95, ist jedoch kein November-Mittel. Ein niedrigerer Durchschnitt vom 16. September bis 15. Oktober könnte MOPS-Anstiege im KRW-Betrag teilweise ausgleichen.",
      "Won-Stärke puffert Beträge; November-Erhöhung und konkrete Stufe bleiben unbestätigt."
    ],
    "exports": [
      "Nahostexporte erholen sich: Rohöl und Produkte unterschiedlich",
      "Vitol-CEO nennt am 6. Oktober etwa 12m bpd Rohöl und 2m bpd Produkte aus dem Nahen Osten über die letzten 7–10 Tage. Separate Vortexa-Septemberdaten für Golfstaaten ohne Iran ergeben 19.2m bpd Rohöl, Kondensat und Produkte, rund 81% von zuvor 23.6m. Rohöl/Kondensat etwa 91%, Brennstoffe etwa 60%: verschiedene Umfänge und nicht addierbare Zeiträume.",
      "Rohölerholung normalisiert Jet nicht automatisch: Raffinerien, China-Ladungen und Fracht bleiben Risiken. Indien ist potenzieller Teilersatz."
    ],
    "pipeline": [
      "Saudi East-West-Umleitung: laufendes Öl, bleibendes Risiko",
      "East-West Pipeline und Yanbu puffern das Angebot. Rund 4m bpd ist eine bereitgestellte Briefingreferenz, getrennt von der Ministeraussage am 6. Oktober über 5.8m barrels am Dienstagmorgen. Berichte unterscheiden sich bei Durchsatz-/Kapazitätseinheiten; keine automatische Umrechnung in 5.8m bpd. Reuters zitiert eine Quelle, wonach trotz neuer Störungsberichte keine Unterbrechung eingetreten sei.",
      "Fortgesetztes Angebot bedeutet weder sichere Infrastruktur noch normale Fracht und Versicherung im Roten Meer."
    ],
    "g7": [
      "G7: 100m Barrel, IEA-Details am 14.–15. Oktober erwartet",
      "G7 setzt bestehende Zusagen um: 100m Barrel über vier Monate, erheblicher Diesel in den ersten 20 Tagen. Reuters vom 6. Oktober nennt Quellen, die IEA-Beschlüsse über Länderanteile und Rohöl/Diesel am 14.–15. Oktober erwarten. Details offen, weder alles geliefert noch bestätigte zusätzliche neue 100m Barrel.",
      "Nahe November-Berechnungsschluss könnten tatsächliche Lieferungen Dezember direkter entlasten. Analyse, kein bestätigter Preiseffekt."
    ],
    "eia": [
      "EIA: Q4-Brent-Mittel 105 USD, kein Spotpreis",
      "EIA-STEO vom 6. Oktober erwartet Q4 2026 Brent-Mittel 105 USD/bbl, 14 USD über der Vormonatsprognose. Prognoseabschluss 1. Oktober. Schlusskurse 6. Oktober: Brent 100.58 und WTI 89.44 USD, leicht höher. Quartalsprognose, Schlusskurs, Singapore Jet und MOPS sind getrennte Maße.",
      "Bestands- und Nahostrisiken bleiben. Die EIA-Prognose bestimmt weder November-MOPS noch Airline-Stufe."
    ],
    "airport": [
      "Saudi-Flughäfen: drei Verletzte, Seesicherheit offen",
      "GACA meldet am 6. Oktober drei leicht Verletzte und begrenzte Schäden durch Angriffe am Vorabend auf Jazan und Najran. Behördlich bestätigte Schäden und Houthi-Einzelbehauptungen unterscheiden sich; die GACA-Erklärung allein klärt nicht jede Verantwortung. Saudi-gestützte jemenitische Regierungsangaben über Geländegewinne bei Mocha/Bab el-Mandeb beweisen weder volle Seekontrolle noch ein Ende der Raketen/Drohnen.",
      "Infrastruktur-, Schiffs-, Fracht- und Versicherungsrisiken bestehen. Mögliche Bodenentlastung ist keine normale Schifffahrt."
    ],
    "faqQ": [
      "Welche Oktober-Stufe gilt?",
      "Steigt November wahrscheinlich?",
      "Ist Singapore Jet 176.78 USD November-MOPS?",
      "Was bedeutet Regrade +4.95 USD?",
      "Warum bleibt Jet trotz Rohölerholung teuer?",
      "Ist Hormuz normalisiert?",
      "Was bedeutet USD/KRW 1,337 für Gebühren?",
      "Sind G7-100m Barrel bereits geliefert?"
    ],
    "g7Answer": "Freigabe vereinbart, Länderanteile und Rohöl/Diesel noch offen. Reuters-Quellen erwarten IEA-Details am 14.–15. Oktober; vollständige Lieferung nicht bestätigt."
  }
};
var oldCards=r.newsCards.filter(function(x){return /^market-20261006-/.test(x.id);});
var supplyValues={
ko:'10/6 발표: 원유 약 12m bpd / 정제품 약 2m bpd · Pipeline 약 4m bpd 참고 · G7 1억 배럴 계획',
en:'Oct 6 statement: crude ~12m bpd / products ~2m bpd · Pipeline ~4m bpd reference · G7 100m-barrel plan',
ja:'10/6発表：原油約12m bpd／精製品約2m bpd・Pipeline約4m bpd参考・G7計画1億バレル',
zh:'10/6公告：原油约12m bpd／成品油约2m bpd·Pipeline约4m bpd参考·G7计划一亿桶',
fr:'Déclaration 6/10 : brut ~12m bpd / produits ~2m bpd · Pipeline ~4m bpd indicatif · plan G7 100m barils',
de:'Aussage 6.10.: Rohöl ~12m bpd / Produkte ~2m bpd · Pipeline ~4m bpd Referenz · G7-Plan 100m Barrel'
};
function previous(n){return oldCards.find(function(x){return x.id==='market-20261006-'+n;});}
function firstSentence(text){
var match=text.match(/^.*?(?:(?<![0-9])[.!?](?=\s|$)|。)/);
return match?match[0]:text;
}
r.modified=stamp;r.asOf=asOf;r.numbers=Object.assign({},r.numbers,window.AERO_MARKET_NUMBERS_20261007);
Object.keys(copy).forEach(function(l){
var c=copy[l],p=r.packs[l],rows=r.rows[l].map(function(x){return x.slice();});
rows[0][1]=c.status;rows[0][2]=c.krw;
rows[2][1]='Global Jet 187.34 USD/bbl (+1.0%) · USD/KRW 1,337.16 · 100 JPY 845.56 · Brent 100.58 / WTI 89.44 (2026-10-06)';
rows[2][2]=firstSentence(c.fx[1])+' '+c.krw+' '+firstSentence(c.eia[1]);
rows[3][1]=supplyValues[l];
rows[3][2]=firstSentence(c.exports[1])+' '+c.exports[2]+' '+c.g7Answer;
rows[4][2]=rows[4][2]+' '+firstSentence(c.airport[1]);
r.rows[l]=rows;
var intro=p.notice+' '+rows[1][2]+' '+firstSentence(c.fx[1])+' '+c.verdict+' '+c.krw;
var faq=p.faq.map(function(x){return{q:x.q,a:x.a};});
faq.forEach(function(x,i){x.q=c.faqQ[i];});
faq[1].a=c.verdict+' '+c.krw;faq[4].a=c.exports[2];faq[6].a=c.fx[1];faq[7].a=c.g7Answer;
Object.assign(p,{rows:rows,intro:intro,desc:intro,sub:asOf+' · '+c.status,newsSub:asOf+' · '+c.status,verdict1:c.verdict,verdictLong:c.krw,keyVars:rows.map(function(x){return x[0]+': '+x[1];}),officialNotice:asOf+' · '+p.notice,faq:faq});
});
var topics=[
{key:'fx',base:6,category:'market'},
{base:1,category:'market'},
{key:'exports',category:'market',url:'https://es.marketscreener.com/noticias/ceo-de-vitol-dice-que-est-n-saliendo-de-oriente-medio-unos-14-millones-de-barriles-por-d-a-ce785dd9d980f623',source:'Reuters / Vitol'},
{key:'pipeline',category:'institution',url:'https://www.marketscreener.com/news/saudi-energy-minister-says-oil-pumped-through-east-west-pipeline-reached-5-8-million-barrels-ce785dd8d181f324',source:'Saudi minister / Reuters'},
{base:3,category:'market'},
{base:5,category:'institution'},
{base:7,category:'market'},
{key:'g7',category:'institution',url:'https://www.businessday.co.za/markets/2026-10-06-iea-to-finalise-allocation-of-100-million-barrel-emergency-release-by-g7/',source:'Reuters / IEA'},
{key:'eia',category:'institution',url:'https://www.eia.gov/outlooks/steo/report/global_oil.php',source:'U.S. EIA'},
{key:'airport',category:'institution',url:'https://www.aol.com/articles/two-saudi-airports-targeted-monday-073734000.html',source:'Saudi GACA / Reuters'}
];
var cards=topics.map(function(topic,i){
var prior=topic.base?previous(topic.base):null;
var card={id:'market-20261007-'+(i+1),category:topic.category,priority:i+1,date:'2026-10-07',updatedAt:stamp,badge:'NEW',aiSummary:true,relevanceScore:1-i/100,sourceUrl:topic.url||(prior?prior.sourceUrl:''),i18n:{}};
Object.keys(copy).forEach(function(l){
var x=topic.key?copy[l][topic.key]:null;
var value=x?{title:x[0],summary:x[1],impact:x[2],sourceName:topic.source||(prior?prior.i18n[l].sourceName:''),tags:[],links:[],faq:[]}:Object.assign({},prior.i18n[l]);
value.aiBrief=firstSentence(value.summary);card.i18n[l]=value;
});
card.i18n.cn=card.i18n.zh;return card;
});
r.newsCards=cards.concat(r.newsCards.filter(function(x){return !/^market-20261007-/.test(x.id);}));
window.AERO_MARKET_RELEASE=r;
})();
