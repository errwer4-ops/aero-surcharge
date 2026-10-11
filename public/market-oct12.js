/* October 12 release: current references, six languages, established five-row UI. */
(function(){
'use strict';
var r=window.AERO_MARKET_RELEASE;if(!r)return;
var stamp='2026-10-12T07:25:00+09:00',asOf='2026.10.12 07:25 KST';
var copy={
  "ko": {
    "status": "10월 23단계 현재 적용 · 11월 산정마감 D-3 · MOPS 상승 압력 우세",
    "verdict": "11월 MOPS 상승 압력 우세 · 중국 수출 재개로 상방 강도 일부 완화 · 강한 원화가 KRW 금액을 완충 · 실제 KRW 부과액 보합~상승 가능 · 방향성 신뢰도 다소 높음 · 특정 단계 공식 산정 대기",
    "deadline": "기존 방식 유지 시 11월 산정기간은 9월 16일~10월 15일이며, 10월 12일 기준 마감 약 3일 전입니다. 최종 누적 MOPS·단계·금액은 공개 확인 제한으로 미확정입니다.",
    "jet": "공개 검증한 일별 Singapore Jet는 10월 2일 176.78달러/bbl로 10월 확정 평균보다 +18.21달러(+11.5%)입니다. 같은 날 regrade +4.95달러는 Jet/diesel 상대가격이며, 중국 수출 재개 후 prompt regrade 완화 가능성이 있습니다. 11월 평균이나 오늘 가격이 아닙니다.",
    "krw": "현재 현물환율은 제공 브리핑 기준 약 1,340.88원으로 10월 평균 1,370.95원보다 낮습니다. 최종 적용은 산정기간 평균환율이므로 MOPS 상승 압력과 실제 KRW 부과액 방향은 다를 수 있습니다. 인상·특정 단계·금액은 확정하지 않습니다.",
    "supply": "중국 10월 승인 3.7m tonnes는 정제품 합계이며 수출 재개가 완충입니다. 10월 6일 Kpler 분석의 Gulf of Oman·Red Sea 우회 원유수출 약 6.7m bpd와 Saudi East-West/Yanbu 경로가 공급을 지지하지만, 정제품 수급과 해운 안전은 별개입니다.",
    "security": "10월 6일 Kpler 분석의 Hormuz 원유흐름은 최소 10.1m bpd, 이전 주간 고점보다 -27%입니다. 10월 6일 7척·7일 10척은 공개 commodity-vessel 범위이지 전체 선박 수가 아닙니다. Saudi 공항 공격과 CENTCOM 발표 사건은 발표 주체와 개별 귀속을 구분합니다.",
    "correction": "10/9 후속 업데이트: Golden Week 일시 중단 후 중국 정제품 수출 재개 보도. 3.7m tonnes는 Jet-only가 아닌 전체 승인량입니다. 이전 공급제약 설명은 당시 분석입니다.",
    "q": [
      "현재 10월 국제선 유류할증료는 몇 단계인가요?",
      "11월 산정은 언제 끝나나요?",
      "11월 유류할증료는 오를까요?",
      "Singapore Jet 176.78달러가 11월 평균인가요?",
      "중국은 10월 항공유 수출을 중단한 것 아닌가요?",
      "Hormuz는 다시 악화됐나요?",
      "Hormuz 악화에도 중동 전체 수출이 유지되는 이유는?",
      "환율 1,341원이 왜 중요한가요?"
    ],
    "cards": [
      [
        "중국, 10월 정제품 수출 재개…아시아 Jet 공급압력 완화",
        "10월 9일 Reuters 소식통 보도와 Platts 정유사 취재는 Golden Week 일시 중단 뒤 중국 수출 활동의 재개를 설명합니다. Reuters의 10월 승인량 약 370만 톤은 휘발유·디젤·항공유 합계이며 Jet만의 물량이 아닙니다. 9월 예상 400만 톤 이상·8월 460만 톤보다 적어 공급이 완전히 정상화됐다고 보지는 않습니다. Sparta는 재개 후 prompt Singapore regrade 완화 가능성을 제시합니다.",
        "중국 공급은 기존 상방 위험에서 완충 방향으로 바뀌었습니다. 10/2 Jet 176.78달러와 regrade +4.95달러는 날짜가 붙은 과거 공개값이지 새로운 11월 평균이 아닙니다."
      ],
      [
        "Hormuz commodity 통항 7척→10척…7월 이후 최저 기록",
        "10월 8일 Reuters가 전한 Kpler 공개자료에서 10월 6일 commodity vessel 7척이 통항해 7월 23일 이후 최저였습니다. 10월 7일은 10척으로 회복했지만 여전히 제한적입니다. 이 집계는 commodity 선박 범위이고 AIS를 끈 선박은 제외하므로 전체 선박 수나 원유 bpd와 혼합하지 않습니다. 이전 주 tanker 사건이 전쟁 시작 후 주간 최고였다는 보도도 개별 사건 귀속과 구분합니다.",
        "통항 감소는 해운·보험 위험을 높입니다. 선박 척수만으로 MOPS·수출량·11월 단계를 계산하지 않습니다."
      ],
      [
        "Hormuz 원유흐름 최소 10.1m bpd…우회수출 6.7m bpd가 완충",
        "10월 6일 Kpler 분석은 해협을 건넌 원유가 최소 10.1m bpd로 이전 주간 고점보다 27% 감소했다고 설명하며, 10월 8일 Reuters가 보도했습니다. 같은 분석의 전쟁 전 대비 74%와 과거 14.2m 참고값은 각 관측기간·범위가 다릅니다. Gulf of Oman 해안·Red Sea 수출은 약 6.7m bpd로 늘어 중동 전체 공급을 지지했습니다. 두 경로를 같은 범위의 단순 총합으로 더하지 않습니다.",
        "해협 자체의 회복 완충은 약해졌지만 우회공급이 공백을 보완합니다. 원유 물량·정제품 부족·운임·안전은 따로 봐야 합니다."
      ],
      [
        "Riyadh 공항 공격 피해 확대…13명 사망·300명 이상 부상 보도",
        "10월 11일 Reuters는 10월 10일 King Khalid 공항 공격 사망자가 초기 12명에서 13명으로 늘고 300명 이상이 부상했다고 보도했습니다. 추가 사망은 India 대사관 발표를 반영합니다. Houthis는 토요일 공격 책임을 주장했고, Saudi 연합은 11일 Terminal 4의 화재·부상을 일으킨 발사체를 미확인으로 설명했습니다. 두 사건의 귀속을 자동으로 동일시하지 않습니다.",
        "Saudi 인프라·항공·해운 안보 위험이 확대됐습니다. 공항 피해를 Pipeline 중단이나 특정 유류할증료 인상으로 직접 치환하지 않습니다."
      ],
      [
        "원/달러 1,341원대…11월 KRW 부과액 완충 지속",
        "제공된 10월 12일 07:25 KST 브리핑의 USD/KRW는 약 1,340.88원, 100 JPY는 약 847.05원입니다. 10월 확정 평균환율 1,370.95원보다 30.07원 낮지만 현물 참고값이며 독립 실시간 측정이나 11월 평균은 아닙니다. 기존 방식의 9월 16일~10월 15일 평균환율이 최종 원화 환산에 중요합니다.",
        "MOPS 상승 압력이 우세해도 원화 부과액 상승폭은 작거나 일부 구간에서 보합에 가까울 수 있습니다. 실제 금액은 공식 공시를 기다립니다."
      ],
      [
        "Brent 104.72·WTI 91.85달러…Isaias는 일시적 공급 충격",
        "10월 9일 미국시장 종가는 Brent 104.72달러·WTI 91.85달러로 각각 0.44달러·0.36달러 올랐습니다. Reuters는 Isaias 관련 US Gulf shut-in을 보도하며, 목요일 참고치 약 1.3m bpd(62.9%)와 금요일 70% 이상 생산 중단을 구분합니다. 같은 시점·범위의 한 숫자로 묶지 않습니다. Trump의 생산적 대화 발언과 중국 수출 재개는 반대 방향 변수입니다.",
        "허리케인은 일시적 원유 공급 충격입니다. Brent·WTI로 11월 MOPS를 만들지 않으며 산정기간 대부분이 이미 지난 점도 고려합니다."
      ],
      [
        "Iran, 미국 답변 ‘불충분’ 평가…Hormuz 재개 합의 미확인",
        "10월 11일 Iran 안보 당국자는 미국이 일부 조건을 수용했으나 Hormuz 재개안의 미해결 조건에 대한 답변이 부족하다고 평가했습니다. 이 판단은 Iran 측 발표와 매체 보도에 귀속합니다. 중재 채널과 Trump의 생산적 대화 발언이 있어도 전면 재개 합의나 즉각 군사 위험 소멸은 확인되지 않았습니다.",
        "외교는 잠재 완충이나 합의 완료가 아닙니다. 해협 재개 임박으로 표시하거나 물류·보험 위험을 삭제하지 않습니다."
      ],
      [
        "CENTCOM, Oman 상선 추진체계 무력화 발표…귀속 명시",
        "CENTCOM은 10월 10일 Gulf of Oman에서 Panama 국적 Ocean Molica(Arika Sun)의 추진체계를 정밀탄으로 무력화했다고 발표했습니다. 경고 불응·봉쇄 통과 시도와 선원 피해 없음도 미국 측 설명입니다. 독립 확인된 법적 위반·격침·제3자의 책임으로 단정하지 않습니다. 민간 해운에 군사적 집행 위험이 이어지고 있음을 보여주는 발표입니다.",
        "선박안전·운임·보험의 상방 위험을 설명하는 사건이지 Singapore MOPS나 실제 피해액의 계산값은 아닙니다."
      ],
      [
        "IEA, 기존 미집행 약 1억 배럴 방출 가속…독일 최대 1,500만",
        "10월 7일 IEA 공식 발표는 3월 비축유 공동조치의 아직 공급되지 않은 약 1억 배럴 집행 가속과 diesel 우선순위를 설명했습니다. 기존 4억 배럴 약속 외 신규 추가 1억 배럴이 아닙니다. 10월 9일 Germany는 diesel·heating oil·crude 최대 1,500만 배럴 방출 계획을 밝혔으며 계획과 인도 완료는 다릅니다.",
        "공급 완충은 있지만 정제 병목을 바로 해결하지 않습니다. 실제 인도 일정에 따라 11월 이후 효과가 달라질 수 있으며 기존 10/14~15 회의 기대를 공식 완료로 바꾸지 않습니다."
      ],
      [
        "Saudi·Iran 외교접촉…안보 악화 속 잠재 완충",
        "10월 11일 Saudi와 Iran 외무장관은 지역 긴장과 완화 노력을 논의했다고 양측 발표를 인용한 Reuters가 전했습니다. Iran 외무장관은 Saudi-Yemen 대화를 돕겠다는 의향을 밝혔습니다. 연락 채널의 재등장은 잠재 완충이지만 Houthis 휴전·공항 안전·Bab el-Mandeb 정상화를 뜻하지 않습니다. East-West/Yanbu 공급 경로와 인프라 안전도 별개로 봅니다.",
        "공급과 외교 완충을 반영하면서 실제 공격·운임·보험 위험은 유지합니다. 완화 가능성을 확정된 해상 정상화로 표시하지 않습니다."
      ]
    ]
  },
  "en": {
    "status": "October Level 23 applies · November calculation D-3 · MOPS upward pressure dominates",
    "verdict": "November MOPS upward pressure dominates but eases partly as China resumes exports · strong KRW cushions charges · actual KRW flat-to-upward possible · directional confidence somewhat high · specific level awaits official calculation",
    "deadline": "Under the existing method, November uses September 16–October 15: about three days remain as of October 12. Final cumulative MOPS, level and amounts remain unconfirmed.",
    "jet": "The exact daily public reference remains October 2 Singapore Jet USD 176.78/bbl, USD 18.21 (+11.5%) above October average. That day’s +USD 4.95 regrade is a jet/diesel spread; prompt regrade may ease after China resumes exports. Neither is today’s price or November average.",
    "krw": "The supplied briefing spot USD/KRW 1,340.88 remains below October average 1,370.95. Final conversion uses calculation-period average FX; MOPS direction can differ from KRW charges. No increase, level or amount is confirmed.",
    "supply": "China approval of 3.7m tonnes covers combined products and resumption is a cushion. Kpler’s October 6 analysis of Oman-coast/Red Sea exports near 6.7m bpd and Saudi East-West/Yanbu routes supports supply, not simultaneous refined-fuel or shipping normalization.",
    "security": "Kpler’s October 6 note gives Hormuz crude at least 10.1m bpd, down 27% from the prior weekly high. October 6 seven and October 7 ten commodity vessels are not all-vessel counts. Saudi attacks and the CENTCOM account require separate attribution.",
    "correction": "October 9 follow-up: China refined exports resume after the holiday pause; 3.7m tonnes is combined fuel approval, not jet alone. Earlier restriction analysis describes conditions at the time.",
    "q": [
      "Which October level applies?",
      "When does November calculation close?",
      "Will November surcharges rise?",
      "Is Singapore Jet USD 176.78 November average?",
      "Did China stop all October jet exports?",
      "Has Hormuz worsened again?",
      "Why can regional exports hold up despite Hormuz weakness?",
      "Why does USD/KRW near 1,341 matter?"
    ],
    "cards": [
      [
        "China resumes October product exports: Asian jet supply cushion",
        "October 9 Reuters sources and Platts refinery reporting describe exports restarting after the Golden Week pause. Reuters’ roughly 3.7m tonnes approval combines gasoline, diesel and jet, not jet alone. It remains below September’s expected 4m-plus and August’s 4.6m tonnes, so resumption is not full normalization. Sparta expects possible easing of prompt Singapore regrade after exports resume.",
        "China shifts from a supply constraint toward a cushion. October 2 jet USD 176.78 and regrade +USD 4.95 remain dated references, not a new November average."
      ],
      [
        "Hormuz commodity transits seven to ten: lowest since July",
        "October 8 Reuters reporting on Kpler data records seven commodity vessels on October 6, the lowest since July 23, then ten on October 7. This is a commodity-vessel scope excluding AIS-off ships, not all vessels or crude bpd. Reports of the prior week’s highest tanker-incident level since the war do not establish each incident’s attribution.",
        "Reduced transits add freight and insurance risk. Vessel counts cannot calculate MOPS, export volume or a November level."
      ],
      [
        "Hormuz crude at least 10.1m bpd: 6.7m bypass exports cushion",
        "An October 6 Kpler note reported October 8 places strait crude at at least 10.1m bpd, 27% below the prior wartime weekly high. Its 74% prewar comparison and earlier 14.2m reference have different periods and scopes. Oman-coast and Red Sea exports near 6.7m bpd cushion overall Middle East supply; the flows must not be naively added as a common-scope total.",
        "The strait’s supply recovery has weakened, but bypass routes buffer the gap. Crude volume, product tightness, safety and freight remain distinct."
      ],
      [
        "Riyadh airport: death toll 13, over 300 injured reported",
        "October 11 Reuters updates the October 10 King Khalid Airport toll from 12 to 13 after India’s embassy reported a further death; over 300 were wounded. Houthis claimed Saturday’s attack. Saudi coalition described Sunday’s Terminal 4 projectile, causing fire and injuries, as unidentified. Attribution of the separate attacks must not automatically be merged.",
        "Saudi infrastructure, aviation and maritime security risks rise. Airport damage does not itself prove pipeline closure or a specific surcharge increase."
      ],
      [
        "USD/KRW near 1,341: November KRW cushion persists",
        "The supplied October 12 07:25 KST briefing quotes USD/KRW 1,340.88 and KRW 847.05 per 100 JPY. Spot is 30.07 below October confirmed average 1,370.95, not independently verified live FX or November average. September 16–October 15 average FX matters for final KRW conversion under the existing method.",
        "Even with upward MOPS pressure, KRW increases may be limited or near flat on some routes. Official notices determine actual amounts."
      ],
      [
        "Brent USD 104.72, WTI USD 91.85: temporary Isaias shock",
        "October 9 closes were Brent USD 104.72 and WTI USD 91.85, up USD 0.44 and 0.36. Reuters separates Thursday’s roughly 1.3m bpd (62.9%) US Gulf shut-in reference from Friday’s above-70% production closure. These are not one same-time measure. Trump’s productive-talk comments and China resumption are opposing market factors.",
        "The hurricane is a temporary crude shock, not a MOPS substitute. Most of the November calculation window has already passed."
      ],
      [
        "Iran calls U.S. reply insufficient: no Hormuz agreement confirmed",
        "On October 11, an Iranian security official said Washington had accepted some conditions but its response to unresolved Hormuz requirements was insufficient. This assessment is attributed to Iran’s account and reporting, not independent proof of an agreed deal. Mediation and Trump’s productive-talk comments do not establish full reopening or an end to military risk.",
        "Diplomacy may cushion risk but is not a completed agreement. Do not label reopening imminent or remove freight and insurance concerns."
      ],
      [
        "CENTCOM says it disabled Oman cargo-vessel propulsion",
        "CENTCOM says it struck the propulsion of Panama-flagged Ocean Molica, also called Arika Sun, in the Gulf of Oman on October 10. Alleged ignored warnings and a blockade-running attempt, and the claim that crew were unharmed, are the U.S. account. This is not an independently established legal violation, sinking or third-party attribution.",
        "The statement indicates commercial-shipping military risk; it is not a Singapore MOPS or monetary-damage calculation."
      ],
      [
        "IEA accelerates existing unfulfilled stocks; Germany up to 15m",
        "The October 7 official IEA statement supports accelerating roughly 100m barrels not yet delivered under March’s collective action, prioritizing diesel. It is not another new 100m on top of the original 400m pledge. On October 9 Germany announced up to 15m barrels of diesel, heating oil and crude; a plan differs from completed delivery.",
        "Stocks cushion supply without instantly resolving refining bottlenecks. Actual delivery governs timing; an expected October 14–15 meeting is not a completed release."
      ],
      [
        "Saudi–Iran ministers speak: potential buffer amid security risk",
        "October 11 Reuters cites both sides’ accounts of a ministerial call on regional escalation and de-escalation efforts. Iran’s foreign minister offered help with Saudi–Yemen dialogue. Renewed contact is a possible buffer, not a Houthi ceasefire or restored airport/Bab el-Mandeb safety. East-West/Yanbu physical supply and infrastructure security remain distinct.",
        "Account for supply and diplomatic cushions while retaining attacks, freight and insurance risks. Possible relief is not confirmed maritime normalization."
      ]
    ]
  },
  "ja": {
    "status": "10月23段階が適用中・11月算定締切D-3・MOPS上昇圧力優勢",
    "verdict": "11月MOPS上昇圧力優勢・中国輸出再開で一部緩和・ウォン高が負担を緩衝・KRWは横ばい〜上昇の可能性・方向信頼度やや高・段階は公式算定待ち",
    "deadline": "従来方式なら11月算定は9月16日〜10月15日で、10月12日現在あと約3日です。最終累積MOPS・段階・金額は未確定です。",
    "jet": "公開検証した単日値は10月2日Singapore Jet176.78ドル/bblで、10月平均比+18.21ドル（+11.5％）。同日regrade+4.95ドルはJet/diesel相対価格で、中国輸出再開後に期近regradeが弱まる可能性があります。今日の価格や11月平均ではありません。",
    "krw": "提供資料の現物USD/KRW1,340.88は10月平均1,370.95より低い参考値です。最終換算は算定期間平均為替によるためMOPSとウォン負担の方向は異なり得ます。値上げ・段階・金額は未確定です。",
    "supply": "中国承認3.7m tonnesは製品合計で再開は緩衝です。10月6日Kpler分析のOman沿岸・紅海6.7m bpdとSaudi East-West/Yanbu迂回が供給を支えますが、精製燃料や海運安全の正常化とは別です。",
    "security": "10月6日Kpler分析のHormuz原油は最低10.1m bpd、前週高値比-27％。10月6日7隻・7日10隻はcommodity範囲で全船舶ではありません。Saudi攻撃とCENTCOM発表は個別の帰属を区別します。",
    "correction": "10/9続報：中国製品輸出は連休の一時停止後に再開。3.7m tonnesはJetだけでなく燃料合計承認量です。以前の供給制約は当時の分析です。",
    "q": [
      "現在10月は何段階？",
      "11月算定はいつ締切？",
      "11月サーチャージは上がる？",
      "Singapore Jet176.78ドルは11月平均？",
      "中国は10月Jet輸出を全停止？",
      "Hormuzは再び悪化？",
      "海峡悪化でも地域輸出が維持されるのは？",
      "USD/KRW約1,341が重要なのは？"
    ],
    "cards": [
      [
        "中国、10月製品輸出再開：アジアJet供給を緩衝",
        "10月9日Reuters関係者とPlatts製油所取材はGolden Week一時停止後の再開を伝えます。承認約370万トンはガソリン・diesel・Jet合計でJetだけではありません。9月予定400万超・8月460万より少なく完全正常化とはしません。Spartaは期近Singapore regradeの緩和可能性を示します。",
        "中国供給は制約から緩衝方向へ。10/2 Jet176.78とregrade+4.95ドルは日付付き参考で11月平均ではありません。"
      ],
      [
        "Hormuz commodity7隻→10隻：7月以来最低",
        "10月8日ReutersのKpler資料では10月6日7隻で7月23日以来最低、7日10隻に回復しました。commodity範囲でAIS停止船を除き、全船舶数や原油bpdではありません。前週タンカー事件が戦争開始以来週最高との報道も個別責任確定ではありません。",
        "低通航は運賃・保険リスクです。船数からMOPSや11月段階を算出しません。"
      ],
      [
        "Hormuz原油最低10.1m bpd：迂回6.7mが緩衝",
        "10月6日Kpler分析を8日Reutersが報道し、海峡原油最低10.1m bpd、前週戦時高値から27％低下と説明しました。戦前比74％と以前14.2m参考は期間・範囲を区別します。Oman沿岸・紅海約6.7m bpdが地域供給を支え、同一範囲の合計として単純加算しません。",
        "海峡回復の緩衝は弱まる一方、迂回が補います。原油量・製品不足・安全・運賃は別です。"
      ],
      [
        "Riyadh空港：死者13人・負傷300人超の報道",
        "10月11日Reutersは10日King Khalid空港攻撃の死者を12から13人へ更新し、India大使館の追加死亡発表を反映しました。負傷は300人超。Houthisは土曜攻撃を主張し、Saudi連合は日曜Terminal4の火災・負傷を起こした飛翔体を未確認と説明しました。別事件の責任を同一視しません。",
        "Saudiインフラ・航空・海運リスク拡大。空港被害をPipeline停止や確定値上げに置換しません。"
      ],
      [
        "USD/KRW約1,341：11月ウォン負担を緩衝",
        "提供10月12日07:25 KST資料はUSD/KRW1,340.88、100円847.05ウォンです。10月平均1,370.95より30.07低い現物参考で、独立したライブ測定や11月平均ではありません。従来方式では9月16日〜10月15日の平均が最終換算に重要です。",
        "MOPS上昇圧力でもウォン上昇は限定的・一部横ばいの可能性。実額は公式公示待ちです。"
      ],
      [
        "Brent104.72・WTI91.85ドル：Isaiasは一時的",
        "10月9日終値はBrent104.72、WTI91.85ドルで0.44・0.36ドル上昇。Reutersは木曜US Gulf約1.3m bpd（62.9％）停止と金曜70％超停止を別時点として報道しました。単一の同時測定にしません。Trumpの生産的対話発言と中国再開は逆方向要因です。",
        "ハリケーンは一時的原油ショックでMOPS代替ではありません。算定期間の大半は経過済みです。"
      ],
      [
        "Iran、米回答は不十分：Hormuz合意未確認",
        "10月11日Iran安保当局者は米国が一部条件を受け入れたが未解決条件への回答は不十分と評価しました。Iran側発表・報道に帰属し合意成立の証明とはしません。仲介とTrumpの対話発言があっても全面再開や軍事リスク消失は未確認です。",
        "外交は潜在緩衝で完了合意ではありません。再開目前や保険リスク解消としません。"
      ],
      [
        "CENTCOM、Oman商船の推進系無力化を発表",
        "CENTCOMは10月10日Panama籍Ocean Molica（Arika Sun）の推進系をOman湾で無力化したと発表しました。警告不応・封鎖通過試行・乗員無傷は米国側説明です。独立確認済み違法性・撃沈・第三者責任と断定しません。",
        "民間船への軍事執行リスクを示す発表でありSingapore MOPSや損害額の計算値ではありません。"
      ],
      [
        "IEA、既存未実施約1億バレルを加速：独最大1,500万",
        "10月7日IEA公式は3月共同措置の未供給約1億バレル実施加速とdiesel優先を説明しました。元の4億に新規1億追加ではありません。10月9日Germanyはdiesel・heating oil・原油最大1,500万バレルを計画し、予定と引渡し完了は異なります。",
        "供給緩衝は製油瓶頸を即解決しません。引渡しで効果時期は変わり、10/14〜15会議期待を完了放出にしません。"
      ],
      [
        "Saudi・Iran外相連絡：安保悪化下の潜在緩衝",
        "10月11日Reutersは双方発表を引用し外相が緊張と緩和努力を協議したと報道。Iran外相はSaudi-Yemen対話支援意向を示しました。連絡再開は潜在緩衝でHouthis停戦・空港やBab el-Mandeb安全回復ではありません。East-West/Yanbu供給とインフラ安全は別です。",
        "外交と供給緩衝を反映し攻撃・運賃・保険リスクは維持。海上正常化確定とはしません。"
      ]
    ]
  },
  "zh": {
    "status": "10月第23档适用中·11月计算截止D-3·MOPS上行压力占优",
    "verdict": "11月MOPS上行压力占优·中国出口重启部分缓和·强韩元缓冲收费·韩元收费可能持平至上涨·方向可信度略高·具体档位等待官方计算",
    "deadline": "原方式下11月计算期为9月16日至10月15日，10月12日距离截止约3天。最终累计MOPS、档位与金额未确定。",
    "jet": "公开验证日价仍为10月2日Singapore Jet176.78美元/bbl，比10月均价高18.21美元（11.5%）。同日regrade+4.95美元是Jet/diesel相对价，中国出口重启后近月regrade可能缓和。不是今日价或11月均价。",
    "krw": "提供简报现汇USD/KRW1,340.88低于10月平均1,370.95。最终换算用计算期平均汇率，MOPS方向可不同于韩元收费。涨价、具体档位与金额未确认。",
    "supply": "中国批准3.7m tonnes为成品油合计，重启形成缓冲。10月6日Kpler分析Oman沿岸及红海约6.7m bpd与Saudi East-West/Yanbu绕行支撑供应，不代表产品或航运同步正常。",
    "security": "10月6日Kpler分析Hormuz原油至少10.1m bpd、较前周高点低27%。10月6日7艘、7日10艘属于commodity范围，不是全部船只。Saudi攻击及CENTCOM说法须分开归因。",
    "correction": "10/9后续：中国成品油在假期短暂停止后重启。3.7m tonnes是燃料合计批准量而非仅航油，此前供应约束为当时分析。",
    "q": [
      "当前10月是第几档？",
      "11月计算何时截止？",
      "11月附加费会涨吗？",
      "Singapore Jet176.78美元是11月均价吗？",
      "中国全面停止10月航油出口了吗？",
      "Hormuz再次恶化了吗？",
      "海峡恶化后为何地区出口仍支撑？",
      "USD/KRW约1,341为何重要？"
    ],
    "cards": [
      [
        "中国重启10月成品油出口：缓冲亚洲航油压力",
        "10月9日Reuters消息人士与Platts炼厂采访描述Golden Week暂时停运后出口重启。约370万吨批准量是汽油、diesel、航油合计，不是仅航油。低于9月预计400万吨以上与8月460万吨，不代表完全正常。Sparta预计近月Singapore regrade可能缓和。",
        "中国供应由约束转向缓冲。10/2 Jet176.78与regrade+4.95美元是有日期参考，不是新11月均价。"
      ],
      [
        "Hormuz commodity7艘→10艘：7月以来最低",
        "10月8日Reuters引用Kpler：10月6日7艘为7月23日以来最低，7日恢复10艘。仅commodity船并排除关闭AIS者，不是全部船或原油bpd。前周油轮事件为战争以来周最高的报道，也不确认逐次责任。",
        "低通航增加运费、保险风险。不能从船数计算MOPS、出口量或11月档位。"
      ],
      [
        "Hormuz原油至少10.1m bpd：绕行6.7m缓冲",
        "10月6日Kpler分析由8日Reuters报道，原油至少10.1m bpd、较前周战时高点低27%。战前比74%和先前14.2m参考有不同期间及范围。Oman沿岸、红海约6.7m bpd支撑地区供应，不当作同一口径简单相加。",
        "海峡恢复缓冲变弱，绕行补缺。原油量、成品油紧缺、安全及运费应区分。"
      ],
      [
        "Riyadh机场：报道13人死亡、300多人受伤",
        "10月11日Reuters把10日King Khalid机场攻击死亡从12更新为13，反映India使馆新增死亡通报，伤者超过300。Houthis宣称周六攻击负责；Saudi联军将周日Terminal4导致火灾与受伤的发射物称为未知。不可自动统一两次归因。",
        "Saudi设施、航空、海运风险扩大，机场损害不能直接换成Pipeline中断或确定附加费涨价。"
      ],
      [
        "USD/KRW约1,341：11月韩元收费缓冲持续",
        "提供10月12日07:25 KST简报USD/KRW1,340.88、100日元847.05韩元。比10月平均1,370.95低30.07，为现汇参考，不是独立实时报价或11月平均。原方式9月16日至10月15日平均汇率影响最终换算。",
        "MOPS上行仍可能对应有限韩元涨幅，部分航线近持平。实际金额等官方公告。"
      ],
      [
        "Brent104.72、WTI91.85美元：Isaias短期冲击",
        "10月9日收盘Brent104.72、WTI91.85，分别涨0.44、0.36美元。Reuters区分周四US Gulf约1.3m bpd（62.9%）停产和周五70%以上停产，不合并为同一时点。Trump积极对话说法和中国重启是相反因素。",
        "飓风为暂时原油冲击，不替代MOPS；11月计算期大部分已过去。"
      ],
      [
        "Iran称美方答复不足：Hormuz协议未确认",
        "10月11日Iran安全官员称美方接受部分条件但未解决Hormuz条件的答复不足。归属Iran声明及报道，不视为已达成协议的独立证明。调停与Trump积极对话说法也不确认全面重开或军险消失。",
        "外交可能缓冲但不是完成协议，不能写即将重开或删除运费保险风险。"
      ],
      [
        "CENTCOM宣称Oman商船推进系统被击停",
        "CENTCOM称10月10日在Oman湾以精确武器使Panama籍Ocean Molica（Arika Sun）推进系统失效。未遵警告、企图穿封锁及船员无伤均为美方说法，不作为独立确认违法、沉船或第三方责任。",
        "说明商业航运军事执法风险，不是Singapore MOPS或损害金额计算值。"
      ],
      [
        "IEA加快既有未执行约一亿桶：德国最多1,500万",
        "10月7日IEA官方说明加快3月联合行动尚未交付约一亿桶，优先diesel；不是原四亿之外新增一亿。10月9日Germany公布diesel、heating oil和原油最多1,500万桶计划，计划不是全部交付。",
        "库存缓冲不立即解除炼油瓶颈。实际交付影响时间，不把10/14至15会议预期写成已完成投放。"
      ],
      [
        "Saudi与Iran外长联系：安保恶化下潜在缓冲",
        "10月11日Reuters引用双方通报称外长讨论紧张及缓和，Iran外长愿协助Saudi-Yemen对话。恢复联系不代表Houthis停火、机场或Bab el-Mandeb安全恢复。East-West/Yanbu实物流量和设施安全仍有区别。",
        "保留外交供应缓冲与攻击、运费、保险风险，不把缓和可能写成海运正常化。"
      ]
    ]
  },
  "fr": {
    "status": "Niveau 23 octobre applicable · clôture novembre D-3 · pression MOPS haussière",
    "verdict": "MOPS novembre haussier mais partiellement amorti par la reprise chinoise · won fort limite les montants · KRW stable à haussier possible · confiance directionnelle assez élevée · niveau précis en attente officielle",
    "deadline": "Selon la méthode existante, calcul novembre du 16 septembre au 15 octobre : environ trois jours restants au 12 octobre. Moyenne MOPS, niveau et montants non confirmés.",
    "jet": "Référence quotidienne exacte publique : 2 octobre, Singapore Jet 176.78 USD/bbl, +18.21 (+11.5%) sur la moyenne octobre. Regrade +4.95 USD ce jour-là est l’écart jet/diesel ; détente possible après reprise chinoise. Ni prix du jour ni moyenne novembre.",
    "krw": "Spot fourni USD/KRW 1,340.88, inférieur à la moyenne octobre 1,370.95. La conversion finale utilise le change moyen de calcul : MOPS et montants KRW peuvent diverger. Hausse, niveau et montant non confirmés.",
    "supply": "L’accord chinois de 3.7m tonnes couvre les carburants combinés. Analyse Kpler du 6 octobre : routes côtières d’Oman/mer Rouge vers 6.7m bpd et East-West/Yanbu amortissent l’offre, sans normalisation simultanée des produits ou de la sécurité.",
    "security": "Note Kpler du 6 octobre : brut Hormuz au moins 10.1m bpd, -27% face au précédent sommet hebdomadaire. Sept navires le 6 octobre, dix le 7 : périmètre commodity, pas tous les navires. Attaques saoudiennes et récit CENTCOM ont des attributions distinctes.",
    "correction": "Suite du 9 octobre : reprise chinoise après pause des fêtes. 3.7m tonnes est l’autorisation totale, pas jet seul. Les contraintes antérieures décrivent l’analyse de l’époque.",
    "q": [
      "Quel niveau octobre s’applique ?",
      "Quand le calcul novembre se termine-t-il ?",
      "La surtaxe novembre montera-t-elle ?",
      "Singapore Jet 176.78 USD est-il la moyenne novembre ?",
      "La Chine a-t-elle arrêté tout le jet octobre ?",
      "Hormuz se dégrade-t-il à nouveau ?",
      "Pourquoi les exports régionaux résistent-ils ?",
      "Pourquoi USD/KRW vers 1,341 compte-t-il ?"
    ],
    "cards": [
      [
        "Chine : reprise des produits octobre, amortisseur pour le jet",
        "Reuters et les sources de raffineries Platts du 9 octobre décrivent la reprise après la pause Golden Week. Autorisation vers 3.7m tonnes : essence, diesel et jet combinés, pas jet seul. Moins que septembre attendu au-delà de 4m et août 4.6m : pas de normalisation complète. Sparta envisage une détente du regrade Singapore prompt.",
        "L’offre chinoise devient amortisseur. Jet 176.78 et regrade +4.95 USD du 2 octobre restent des références datées, non une moyenne novembre."
      ],
      [
        "Hormuz : sept puis dix navires commodity, plus bas depuis juillet",
        "Reuters du 8 octobre cite Kpler : sept navires le 6 octobre, plus bas depuis le 23 juillet, puis dix le 7. Périmètre commodity excluant AIS éteint, pas tous les navires ni bpd. Le pic hebdomadaire d’incidents pétroliers depuis la guerre ne confirme pas chaque responsable.",
        "Le transit limité renchérit risques de fret et assurance. Aucun calcul MOPS ou niveau novembre à partir du nombre de navires."
      ],
      [
        "Hormuz : au moins 10.1m bpd, dérivations 6.7m en soutien",
        "Note Kpler du 6 octobre rapportée le 8 : brut traversant au moins 10.1m bpd, -27% face au sommet de la semaine précédente. Comparaison pré-guerre 74% et ancien repère 14.2m ont des fenêtres distinctes. Côte d’Oman et mer Rouge vers 6.7m bpd soutiennent le total régional, sans addition naïve des périmètres.",
        "L’amortisseur du détroit faiblit, les dérivations compensent. Volumes de brut, produits, sécurité et fret sont distincts."
      ],
      [
        "Riyadh : 13 morts et plus de 300 blessés selon les rapports",
        "Reuters du 11 octobre actualise le bilan du 10 à King Khalid de 12 à 13 morts après l’annonce d’un décès par l’ambassade indienne ; plus de 300 blessés. Les Houthis revendiquent samedi. La coalition saoudienne décrit le projectile dimanche au Terminal 4, avec incendie et blessés, comme non identifié. Ne pas fusionner les attributions.",
        "Risques d’infrastructures, aviation et mer en hausse, sans preuve automatique de fermeture du Pipeline ou de hausse de surtaxe."
      ],
      [
        "USD/KRW vers 1,341 : amortisseur novembre persistant",
        "Briefing fourni du 12 octobre 07:25 KST : USD/KRW 1,340.88 et 847.05 KRW pour 100 JPY. Spot inférieur de 30.07 à la moyenne octobre 1,370.95, pas cotation live indépendante ni moyenne novembre. Le change moyen du 16 septembre au 15 octobre détermine la conversion finale.",
        "MOPS haussier peut coexister avec hausse KRW limitée ou certaines routes stables. Avis officiels pour les montants réels."
      ],
      [
        "Brent 104.72, WTI 91.85 USD : choc Isaias temporaire",
        "Clôtures du 9 octobre : Brent 104.72, WTI 91.85 USD, +0.44 et +0.36. Reuters distingue jeudi environ 1.3m bpd (62.9%) arrêtés dans le Golfe américain et vendredi plus de 70% de production fermée. Pas une mesure simultanée. Propos de dialogue productif de Trump et reprise chinoise amortissent.",
        "Ouragan temporaire, non substitut au MOPS ; la plupart de la fenêtre novembre est déjà écoulée."
      ],
      [
        "Iran juge la réponse américaine insuffisante : pas d’accord confirmé",
        "Le 11 octobre, un responsable iranien indique que Washington accepte certaines conditions, mais sa réponse aux points Hormuz non résolus reste insuffisante. Évaluation attribuée au récit iranien, pas preuve indépendante d’un accord. Médiation et propos de Trump ne confirment ni réouverture totale ni fin du risque militaire.",
        "Diplomatie possible amortisseur, pas accord achevé ; ne pas annoncer réouverture imminente ou supprimer assurance/fret."
      ],
      [
        "CENTCOM dit avoir neutralisé la propulsion d’un cargo à Oman",
        "CENTCOM annonce une frappe le 10 octobre sur Ocean Molica, dit Arika Sun, pavillon panaméen, dans le Golfe d’Oman. Avertissements ignorés, tentative de blocus et équipage indemne relèvent du récit américain. Ni infraction juridiquement confirmée indépendamment, ni navire coulé, ni attribution tierce.",
        "Risque militaire pour la navigation commerciale, pas valeur MOPS ou calcul de dommages financiers."
      ],
      [
        "IEA accélère stocks promis non livrés ; Allemagne jusqu’à 15m",
        "Déclaration officielle IEA du 7 octobre : accélérer environ 100m barils encore non livrés de l’action de mars, diesel prioritaire. Pas 100m nouveaux en plus du programme 400m. Le 9 octobre, Allemagne annonce jusqu’à 15m de diesel, chauffage et brut ; plan distinct de livraison complète.",
        "Stocks amortisseurs sans résolution immédiate du raffinage ; effets selon livraison, pas réunion attendue les 14–15 transformée en livraison achevée."
      ],
      [
        "Contact Saudi–Iran : amortisseur potentiel malgré l’insécurité",
        "Reuters du 11 octobre cite les deux parties sur l’appel ministériel et les efforts de détente. Le ministre iranien propose une aide au dialogue Saudi–Yémen. Contact renouvelé ne signifie ni cessez-le-feu houthi ni sécurité des aéroports/Bab el-Mandeb. Flux East-West/Yanbu et sécurité restent distincts.",
        "Conserver les amortisseurs diplomatiques et d’offre avec risques d’attaques, fret et assurances ; détente possible non normalisation confirmée."
      ]
    ]
  },
  "de": {
    "status": "Oktober Stufe 23 gilt · November-Schluss D-3 · MOPS-Aufwärtsdruck",
    "verdict": "November-MOPS-Aufwärtsdruck dominiert, durch China-Neustart teilweise gedämpft · starker Won puffert · KRW stabil bis höher möglich · Richtungssicherheit etwas höher · konkrete Stufe wartet auf offizielle Berechnung",
    "deadline": "Bei bestehender Methode November-Zeitraum 16. September bis 15. Oktober: am 12. Oktober rund drei Tage übrig. Endmittel, Stufe und Beträge unbestätigt.",
    "jet": "Exakter öffentlicher Tageswert bleibt 2. Oktober: Singapore Jet 176.78 USD/bbl, +18.21 (+11.5%) gegenüber Oktober. Regrade +4.95 USD an diesem Tag ist Jet/Diesel-Spread, nach China-Neustart möglicherweise schwächer. Kein heutiger Preis oder November-Mittel.",
    "krw": "Bereitgestellter Spot USD/KRW 1,340.88 liegt unter Oktober-Mittel 1,370.95. Endumrechnung nutzt Berechnungswechselkurs; MOPS und KRW können verschieden laufen. Erhöhung, Stufe und Betrag unbestätigt.",
    "supply": "Chinas 3.7m Tonnen gelten für kombinierte Produkte. Kpler-Analyse 6. Oktober: Oman-Küste/Rotes Meer etwa 6.7m bpd und East-West/Yanbu puffern Angebot, nicht gleichzeitig Produkte und sichere Schifffahrt.",
    "security": "Kpler-Notiz 6. Oktober: Hormuz-Rohöl mindestens 10.1m bpd, -27% zum vorherigen Wochenhoch. Sieben am 6., zehn am 7. Oktober sind Commodity-Schiffe, nicht alle. Saudi-Angriffe und CENTCOM-Bericht getrennt zuordnen.",
    "correction": "Nachtrag 9. Oktober: China-Produkte nach Feiertagspause wieder exportiert. 3.7m Tonnen kombinierte Genehmigung, nicht nur Jet. Frühere Einschränkungen sind damalige Analyse.",
    "q": [
      "Welche Oktober-Stufe gilt?",
      "Wann endet November-Berechnung?",
      "Steigt November-Zuschlag?",
      "Ist Singapore Jet 176.78 USD November-Mittel?",
      "Hat China alle Oktober-Jet-Exporte gestoppt?",
      "Verschlechtert sich Hormuz wieder?",
      "Warum halten regionale Exporte trotzdem?",
      "Warum USD/KRW etwa 1,341 wichtig?"
    ],
    "cards": [
      [
        "China startet Oktober-Produkte neu: Puffer für Asien-Jet",
        "Reuters-Quellen und Platts-Raffinerieberichte vom 9. Oktober beschreiben Neustart nach Golden Week. Rund 3.7m Tonnen Genehmigung umfassen Benzin, Diesel und Jet, nicht nur Jet. Unter September-Erwartung über 4m und August 4.6m, also keine volle Normalisierung. Sparta erwartet möglicherweise schwächeren prompten Singapore-Regrade.",
        "China wird Angebotspuffer. Jet 176.78 und Regrade +4.95 USD vom 2. Oktober bleiben datiert, kein neues November-Mittel."
      ],
      [
        "Hormuz: sieben auf zehn Commodity-Schiffe, Tief seit Juli",
        "Reuters 8. Oktober nennt Kpler: sieben am 6. Oktober, niedrigster Wert seit 23. Juli, zehn am 7. Oktober. Commodity-Umfang ohne AIS-aus, nicht alle Schiffe oder Rohöl-bpd. Höchste Vorwochen-Tankerereignisse seit Kriegsbeginn bestätigen nicht einzelne Verantwortliche.",
        "Wenig Transit erhöht Fracht/Versicherungsrisiko; keine MOPS-, Mengen- oder Stufenberechnung aus Schiffszahlen."
      ],
      [
        "Hormuz mindestens 10.1m bpd: Umwege 6.7m puffern",
        "Kpler-Notiz 6. Oktober, Reuters-Bericht 8.: Strait-Rohöl mindestens 10.1m bpd, 27% unter vorherigem Kriegs-Wochenhoch. 74% Vorkriegsvergleich und früheres 14.2m haben verschiedene Zeitfenster. Oman-Küste und Rotes Meer rund 6.7m stützen Gesamtangebot, nicht naiv als gleicher Umfang summieren.",
        "Strait-Puffer schwächer, Umwege helfen. Rohölmenge, Produktknappheit, Sicherheit und Fracht getrennt halten."
      ],
      [
        "Riyadh-Flughafen: 13 Tote, über 300 Verletzte berichtet",
        "Reuters 11. Oktober aktualisiert Opfer vom 10. am King Khalid von 12 auf 13 nach zusätzlichem Todesfall laut indischer Botschaft; über 300 Verletzte. Houthis beanspruchen Samstag. Saudi-Koalition nennt Sonntagsprojektil am Terminal 4 mit Feuer/Verletzten nicht identifiziert. Ereigniszuordnung nicht automatisch gleichsetzen.",
        "Saudi-Infrastruktur-, Luftfahrt- und Seerisiken steigen, ohne automatischen Pipeline-Ausfall oder Zuschlagserhöhung zu belegen."
      ],
      [
        "USD/KRW etwa 1,341: November-KRW-Puffer bleibt",
        "Briefing 12. Oktober 07:25 KST: USD/KRW 1,340.88, KRW 847.05 je 100 JPY. Spot 30.07 unter Oktober-Mittel 1,370.95, kein unabhängiger Livekurs oder November-Mittel. Durchschnitt 16. September bis 15. Oktober bestimmt Endumrechnung.",
        "MOPS-Aufwärtsdruck kann begrenzte KRW-Zunahme oder stabile Strecken bedeuten. Tatsächliche Beträge aus offiziellen Mitteilungen."
      ],
      [
        "Brent 104.72, WTI 91.85 USD: Isaias nur vorübergehend",
        "Schluss 9. Oktober: Brent 104.72, WTI 91.85 USD, +0.44/+0.36. Reuters trennt Donnerstag etwa 1.3m bpd (62.9%) US-Gulf-Stillstand von Freitag über 70% Schließung. Keine einheitliche gleichzeitige Messung. Trumps produktive Gespräche und China-Neustart wirken entgegen.",
        "Temporärer Rohölschock, kein MOPS-Ersatz. Großteil des November-Zeitraums bereits vorbei."
      ],
      [
        "Iran nennt US-Antwort unzureichend: Hormuz-Abkommen offen",
        "Iranischer Sicherheitsvertreter sagt am 11. Oktober, Washington akzeptiere einzelne Bedingungen, offene Hormuz-Punkte seien unzureichend beantwortet. Bewertung bleibt iranischer Darstellung zugeordnet, nicht unabhängiger Beleg für Einigung. Vermittlung und Trump-Aussagen bestätigen weder volle Öffnung noch Ende militärischer Risiken.",
        "Diplomatie als möglicher Puffer, nicht fertiges Abkommen. Keine unmittelbar sichere Öffnung oder gestrichene Fracht-/Versicherungsrisiken."
      ],
      [
        "CENTCOM meldet Antrieb eines Oman-Frachters ausgeschaltet",
        "CENTCOM erklärt, am 10. Oktober Antrieb der Panama-registrierten Ocean Molica alias Arika Sun im Golf von Oman getroffen zu haben. Missachtete Warnungen, Blockadedurchbruch und unverletzte Crew sind US-Darstellung. Keine unabhängig festgestellte Rechtsverletzung, Versenkung oder Drittverantwortung.",
        "Militärisches Risiko kommerzieller Schifffahrt, kein MOPS-Wert oder Schadensberechnung."
      ],
      [
        "IEA beschleunigt alte Zusagen; Deutschland bis 15m Barrel",
        "Offizielle IEA-Erklärung 7. Oktober: etwa 100m noch nicht gelieferte Barrel aus März beschleunigen, Diesel priorisieren. Keine neuen zusätzlichen 100m zum 400m-Programm. Deutschland kündigt 9. Oktober bis 15m Diesel, Heizöl und Rohöl an; Plan nicht volle Lieferung.",
        "Bestände puffern, lösen Raffinerieengpässe nicht sofort. Lieferzeit bestimmt Wirkung; erwartete Sitzung 14.–15. nicht fertige Freigabe."
      ],
      [
        "Saudi–Iran-Kontakt: möglicher Puffer bei hohem Risiko",
        "Reuters 11. Oktober zitiert beide Seiten zum Ministertelefonat über Eskalation und Entspannung. Iran bietet Hilfe bei Saudi–Jemen-Dialog. Kontakt ist keine Houthi-Waffenruhe oder sichere Flughäfen/Bab el-Mandeb. East-West/Yanbu-Angebot und Sicherheit unterscheiden sich.",
        "Angebots- und Diplomatiepuffer mit Angriffs-, Fracht- und Versicherungsrisiken berücksichtigen, keine bestätigte Normalisierung."
      ]
    ]
  }
};
var urls=["https://www.spglobal.com/energy/en/news-research/latest-news/crude-oil/100926-china-resumes-clean-oil-product-exports-after-holiday-halt-oct-volumes-seen-lower-on-month","https://www.marketscreener.com/news/hormuz-transits-at-lowest-in-over-two-months-after-attacks-data-shows-ce785ddedf8cf52d","https://www.marketscreener.com/news/hormuz-transits-at-lowest-in-over-two-months-after-attacks-data-shows-ce785ddedf8cf52d","https://www.al-monitor.com/originals/2026/10/saudi-arabia-reports-injuries-new-attack-riyadh-airport-day-after-strike-kills-13","","https://live.euronext.com/en/financial-news/oil-prices-settle-higher-more-production-shut-ahead-hurricane","https://m.aa.com.tr/en/us-israel-iran-war/iran-says-us-response-to-conditions-for-reopening-strait-of-hormuz-insufficient/4085389","https://www.forth.news/lists/centcom/CfuUiQPmfHxXfWGGkPzeZ","https://www.iea.org/news/statement-by-iea-executive-director-on-meeting-of-iea-member-governments-on-7-october-2026","https://www.aol.com/articles/saudi-iranian-foreign-ministers-discuss-211337000.html"];
var names=['Platts / Reuters','Kpler / Reuters','Kpler / Reuters','Reuters','','Reuters','Iran statement / Anadolu','CENTCOM statement','IEA / Reuters','Saudi / Iran statements / Reuters'];
urls[0]='https://www.aol.com/articles/china-resume-october-fuel-exports-032753000.html';
var supplyValues={
ko:'10/6 분석: 우회 원유 약 6.7m bpd · Saudi East-West / Yanbu · IEA 미집행 약 1억 배럴',
en:'Oct 6 analysis: bypass crude ~6.7m bpd · Saudi East-West / Yanbu · IEA unfulfilled ~100m barrels',
ja:'10/6分析：迂回原油約6.7m bpd・Saudi East-West / Yanbu・IEA未実施約1億バレル',
zh:'10/6分析：绕行原油约6.7m bpd·Saudi East-West / Yanbu·IEA未执行约一亿桶',
fr:'Analyse 6/10 : brut dérivé ~6.7m bpd · Saudi East-West / Yanbu · IEA ~100m barils non livrés',
de:'Analyse 6.10.: Umweg-Rohöl ~6.7m bpd · Saudi East-West / Yanbu · IEA ~100m Barrel offen'
};
var flowWords={ko:'원유 최소',en:'crude at least',ja:'原油最低',zh:'原油至少',fr:'brut au moins',de:'Rohöl mindestens'};
var archiveSuffix={ko:' (10/9 후속: 수출 재개)',en:' (Oct 9 update: exports resume)',ja:'（10/9続報：輸出再開）',zh:'（10/9后续：出口重启）',fr:' (suite 9/10 : reprise)',de:' (Nachtrag 9.10.: Neustart)'};
var briefing={ko:'제공된 시장 브리핑',en:'Provided market briefing',ja:'提供された市場資料',zh:'提供的市场简报',fr:'Briefing de marché fourni',de:'Bereitgestelltes Marktbriefing'};
function firstSentence(text){var m=text.match(/^.*?(?:(?<![0-9])[.!?](?=\s|$)|。)/);return m?m[0]:text;}
r.modified=stamp;r.asOf=asOf;r.numbers=Object.assign({},r.numbers,window.AERO_MARKET_NUMBERS_20261012);
Object.keys(copy).forEach(function(l){
var c=copy[l],p=r.packs[l],rows=r.rows[l].map(function(x){return x.slice();});
rows[0][1]=c.status;rows[0][2]=c.deadline+' '+c.verdict;
rows[1][1]='2026-10-02: Singapore Jet 176.78 USD/bbl (+11.5%) · regrade +4.95 USD/bbl';
rows[1][2]=c.jet+' '+firstSentence(c.cards[0][1]);
rows[2][1]='Global Jet 187.34 USD/bbl (+1.0%) · USD/KRW 1,340.88 · 100 JPY 847.05 · Brent 104.72 / WTI 91.85 (2026-10-09)';
rows[2][2]=c.krw+' '+firstSentence(c.cards[5][1]);
rows[3][1]=supplyValues[l];
rows[3][2]=c.supply+' '+firstSentence(c.cards[8][1]);
rows[4][1]='2026-10-06: Kpler 7 · 2026-10-07: Kpler 10 · '+flowWords[l]+' 10.1m bpd · 2026-10-10/11 Riyadh';
rows[4][2]=c.security;
r.rows[l]=rows;
var intro=p.notice+' '+c.deadline+' '+c.jet+' '+firstSentence(c.cards[0][1])+' '+c.verdict;
var answers=[p.notice,c.deadline,c.verdict+' '+c.krw,c.jet,c.cards[0][1],c.security,c.supply,c.krw];
Object.assign(p,{rows:rows,intro:intro,desc:intro,sub:asOf+' · '+c.status,newsSub:asOf+' · '+c.status,verdict1:c.verdict,verdictLong:c.krw,keyVars:rows.map(function(x){return x[0]+': '+x[1];}),officialNotice:asOf+' · '+p.notice,faq:c.q.map(function(q,i){return{q:q,a:answers[i]};})});
});
var cards=copy.ko.cards.map(function(_,i){
var category=[3,6,7,8,9].indexOf(i)>=0?'institution':'market';
var card={id:'market-20261012-'+(i+1),category:category,priority:i+1,date:'2026-10-12',updatedAt:stamp,badge:'NEW',aiSummary:true,relevanceScore:1-i/100,sourceUrl:urls[i],i18n:{}};
Object.keys(copy).forEach(function(l){var x=copy[l].cards[i];card.i18n[l]={title:x[0],aiBrief:firstSentence(x[1]),summary:x[1],impact:x[2],sourceName:names[i]||briefing[l],tags:[],links:[],faq:[]};});
card.i18n.cn=card.i18n.zh;return card;
});
var corrected=['market-20261002-1','market-20261006-1','market-20261007-2'];
var archive=r.newsCards.filter(function(x){return !/^market-20261012-/.test(x.id);}).map(function(card){
if(corrected.indexOf(card.id)<0)return card;
var updated=Object.assign({},card,{updatedAt:stamp,i18n:{}});
Object.keys(copy).forEach(function(l){var prior=card.i18n[l];updated.i18n[l]=Object.assign({},prior,{title:prior.title+(card.id==='market-20261002-1'?archiveSuffix[l]:''),summary:prior.summary+' '+copy[l].correction,impact:copy[l].correction});});
updated.i18n.cn=updated.i18n.zh;return updated;
});
r.newsCards=cards.concat(archive);
window.AERO_MARKET_RELEASE=r;
})();

