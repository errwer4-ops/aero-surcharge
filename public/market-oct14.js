/* October 14 references. Historical cards and official airline tables remain untouched. */
(function(){
'use strict';
var r=window.AERO_MARKET_RELEASE;if(!r)return;
var stamp='2026-10-14T07:25:00+09:00',asOf='2026.10.14 07:25 KST';
var copy={
  "ko": {
    "status": "10월 공식 공시 적용 중 · 11월 공시 전·산정 중",
    "fact": "10월 발권분은 항공사 공식 공시 기준으로 적용 중입니다. 대한항공 국제선 편도 49,000~362,600원, 아시아나 53,400~301,200원이며, 다른 항공사의 기존 공시 통화·거리 구간·적용 기준은 유지합니다.",
    "pending": "11월은 공시 전·산정 중입니다. 2026년 9월 16일~10월 15일 산정기간은 10월 14일 현재 끝나지 않았으며 최종 평균·단계·금액은 미확정입니다.",
    "jet": "Chợ Giá의 10/13 Kero 175.71 USD/bbl(약 418.36 cents/gal)은 별도 출처의 일일 참고값입니다. 기존 Sparta 10/2 Jet 176.78과 동일 자료로 덮어쓰지 않으며, 11월 산정평균이 아닙니다.",
    "fx": "10/13 서울외국환중개 15:30 매매기준율 1,345.10 KRW/USD입니다. 당일 기준환율은 항공사의 월간 평균환율이 아니며, 다른 산출 방식의 시장 종가와 혼합하지 않습니다.",
    "risk": "공격과 통항 위축은 공급·운송 차질 위험을 높이지만 해협 완전 폐쇄나 유가·유류할증료의 필연적 인상을 뜻하지 않습니다. 확인된 보도와 당사자 주장을 구분합니다.",
    "foot": "10월 확정 평균 158.57 USD/bbl(377.54 cents/gal)은 비교 기준입니다. Chợ Giá 일일 Kero 175.71, Sparta 10/2 Jet 176.78, IATA 주간 Global Jet 190.18은 다른 자료이며 11월 평균은 미확정입니다.",
    "historical": "10/6 Kpler 우회수출 6.7m bpd 및 이전 공급 분석은 관측 날짜가 붙은 과거 참고입니다. 최신 사건만으로 기존 공급량이 0이 됐다고 단정하지 않습니다.",
    "q": [
      "10월 공시 금액은 어떻게 적용되나요?",
      "11월 산정이 끝났나요?",
      "Kero 175.71달러가 11월 평균인가요?",
      "175.71달러의 cents/gallon 환산은?",
      "1,345.10원이 월간 환산 기준인가요?",
      "Global Jet와 Singapore MOPS는 같은가요?",
      "호르무즈 공격 책임이 모두 확인됐나요?",
      "공격 보도가 유류할증료 인상을 확정하나요?"
    ],
    "conversion": "175.71 USD/bbl ÷ 42 × 100 ≈ 418.36 cents/gallon입니다. 원 단위 가격은 그대로 유지하며 다른 통화나 11월 평균으로 변환하지 않습니다.",
    "cards": [
      [
        "UKMTO 미상 발사체 공격 보도…이란 측 주장과 구분",
        "AP의 10월 13일 보도는 UKMTO가 최소 3척의 선박에 대한 미상 발사체 공격을 알렸다고 전합니다. 배포본의 시점은 UKMTO 10월 12일 게시·그 전날 사건으로 설명되며, 개별 책임은 미확인입니다. 이란 당국자의 이른바 ‘밀수 선박’ 공격 발언은 이란 측 주장이지 이 사건 모두의 책임을 독립 확인한 증거가 아닙니다. AP 지정 링크 접근 제한으로 확인 가능한 AP 배포본을 연결합니다.",
        "해상안보·운송 차질 위험은 높아졌지만 완전 폐쇄나 필연적 유가 상승으로 단정하지 않습니다."
      ],
      [
        "FT 보도 참고: 2주간 24척 피격…단일일 물량과 평균 구분",
        "보도 기준은 10월 11일까지 2주간 선박 24척이 공격받았다는 FT 집계입니다. FT 원문 접근이 제한돼 재인용 자료와 대조한 참고 정보로 표시합니다. 10월 11일 290만 배럴은 단일일 통과 물량이고 추적 보완에 따른 수정 가능성이 있으며, 전쟁 전 대비 40% 넘게 낮은 수치는 별도의 7일 평균 설명입니다. 290만 배럴에 그 평균 감소율을 직접 붙이거나 기존 Kpler 주간값과 단순 비교하지 않습니다.",
        "위축된 통항과 공격 위험은 구분합니다. 특정 기간의 보도값만으로 해협 완전 폐쇄나 11월 단계·금액을 산정하지 않습니다."
      ],
      [
        "원·달러 1,345.10원…10월 13일 15:30 기준율",
        "파이낸셜뉴스 10월 13일 외국환 시세 원문은 서울외국환중개·연합인포맥스 자료와 미국 달러의 서울 15:30 기준을 명시합니다. 원·달러 매매기준율은 1,345.10 KRW/USD입니다. 다른 시장 종가나 시간대 수치와 하나의 환율로 합치지 않으며, 항공사 유류할증료의 월간 환산 평균으로 대체하지 않습니다.",
        "이번 정보 갱신으로 기존 공식 KRW/USD 공시 금액이나 사이트의 환산 설정을 임의 변경하지 않습니다."
      ],
      [
        "10월 13일 Kero 175.71달러…별도 일일 참고자료",
        "Chợ Giá의 10월 13일 행에 Kero 175.71이 표시됩니다. USD/bbl 기준 환산은 175.71 ÷ 42 × 100 ≈ 418.36 cents/gallon입니다. 기존 Sparta와 다른 출처의 참고값으로 보존하며 10월 확정 평균 158.57 USD/bbl·377.54 cents/gallon이나 아직 집계 중인 11월 평균과 혼합하지 않습니다.",
        "일일 항공유 가격은 시장 참고이지 항공사 공식 산정 평균·단계·금액의 확정값이 아닙니다."
      ],
      [
        "Brent 105.69·WTI 94.14달러…10월 13일 종가 혼조",
        "10월 13일 종가는 Brent 105.69 USD/bbl(-0.9%), WTI 94.14 USD/bbl(+0.4%)입니다. 지정 Reuters 링크의 확인 가능한 배포본은 앞선 장중 106.04·93.27 값을 담아 종가와 구분했고, 종가 수치는 별도의 마감 보도와 대조했습니다. 공급 전망과 해상 위험이 동시에 작용하므로 공격 보도 하나로 가격 방향을 확정하지 않습니다.",
        "Brent·WTI 종가는 Singapore MOPS가 아니며, 이를 이용해 미공시 11월 금액이나 단계를 만들지 않습니다."
      ],
      [
        "IATA 주간 Global Jet 190.18달러…전주 대비 1.5%",
        "10월 14일 확인한 IATA 공식 Fuel Monitor는 글로벌 주간 평균 190.18 USD/bbl, 전주 대비 +1.5%를 표시합니다. 이는 글로벌 주간 자료로 Chợ Giá 일일 Kero 175.71이나 Singapore MOPS 산정기간 평균과 다릅니다. 기존 187.34 주간 뉴스는 당시 기록으로 보존합니다.",
        "항공유 부담의 참고 신호지만 단독으로 11월 유류할증료 인상을 확정하지 않습니다."
      ]
    ]
  },
  "en": {
    "status": "October official notices apply · November before notice, calculation in progress",
    "fact": "October ticketing follows official airline notices. Korean Air international one-way KRW 49,000–362,600; Asiana KRW 53,400–301,200. Other airlines retain their established notice currencies, distance bands and application rules.",
    "pending": "November remains before official announcement and in calculation. September 16–October 15 has not ended on October 14; final average, level and amounts are unconfirmed.",
    "jet": "Cho Gia October 13 Kero USD 175.71/bbl (~418.36 cents/gal) is an alternate-source daily reference. It does not overwrite Sparta October 2 Jet 176.78 or represent November average.",
    "fx": "October 13 Seoul Money Brokerage 15:30 daily reference: KRW 1,345.10/USD. Not airline monthly average FX; do not merge with market closes calculated differently.",
    "risk": "Attacks and reduced transit increase supply and transport risk, not proof of full closure or inevitable oil/surcharge increases. Reports and party claims remain separate.",
    "foot": "October confirmed average 158.57 USD/bbl (377.54 cents/gal) is a comparison baseline. Cho Gia daily Kero 175.71, Sparta Oct 2 Jet 176.78 and IATA weekly Global Jet 190.18 are distinct; November average remains unconfirmed.",
    "historical": "October 6 Kpler bypass exports 6.7m bpd and earlier supply analysis remain dated history. New attacks do not prove physical supply has dropped to zero.",
    "q": [
      "How do October notice amounts apply?",
      "Has November calculation finished?",
      "Is Kero USD 175.71 November average?",
      "How is USD 175.71 converted to cents/gallon?",
      "Is FX 1,345.10 the monthly basis?",
      "Is Global Jet the same as Singapore MOPS?",
      "Are all Hormuz attack responsibilities confirmed?",
      "Do attacks establish a surcharge increase?"
    ],
    "conversion": "175.71 USD/bbl ÷ 42 × 100 ≈ 418.36 cents/gallon. Retain the original price; this is not a currency conversion or November average.",
    "cards": [
      [
        "UKMTO projectile reports: separate Iranian claims from attribution",
        "An October 13 AP report relays UKMTO notices of at least three vessels struck by unknown projectiles. The AP distribution copy describes a Monday October 12 posting about incidents the day before; individual responsibility remains unconfirmed. An Iranian official’s statement about attacking purported smuggling ships is an Iranian claim, not independent attribution of every reported incident. The accessible AP distribution copy is linked because the supplied AP URL is access-restricted.",
        "Shipping security and transport risk rise, but neither full closure nor inevitable price increases are established."
      ],
      [
        "FT reference: 24 ships in two weeks, daily oil versus average",
        "FT reporting covers 24 vessels attacked in the two weeks through October 11. Its original is access-restricted here; figures are presented as reported references checked against a requotation. October 11 transit of 2.9m barrels is a single-day observation, potentially revised with tracking; the above-40% prewar decline describes a separate seven-day average. Do not apply that decline to the daily figure or compare it directly with earlier Kpler weekly values.",
        "Reduced transit and attack risk are distinct. These observations do not establish total closure or calculate November amounts or levels."
      ],
      [
        "USD/KRW 1,345.10: October 13 Seoul 15:30 reference",
        "The October 13 Financial News FX table identifies Seoul Money Brokerage/Infomax data and a Seoul 15:30 USD basis. The daily reference is KRW 1,345.10 per USD. Do not combine it with differently timed market closes or substitute it for the airline calculation-period average.",
        "This update does not arbitrarily change official KRW/USD notice amounts or existing currency-conversion settings."
      ],
      [
        "October 13 Kero USD 175.71: separate daily reference",
        "Cho Gia’s October 13 Kero row displays 175.71. On a USD/bbl basis, 175.71 ÷ 42 × 100 ≈ 418.36 cents/gallon. Retain it as an alternate-provider reference, separate from Sparta, October confirmed 158.57 USD/bbl / 377.54 cents/gallon and the unfinished November average.",
        "Daily fuel prices are references, not confirmed airline calculation averages, levels or amounts."
      ],
      [
        "Brent USD 105.69, WTI USD 94.14: mixed October 13 close",
        "October 13 settlement: Brent 105.69 USD/bbl (-0.9%), WTI 94.14 (+0.4%). An accessible copy of the supplied Reuters story carries earlier intraday 106.04/93.27 prices, not those settlements; closing values were cross-checked with separate close reports. Supply prospects and maritime risk act together, so attacks alone do not settle direction.",
        "Brent/WTI closes are not Singapore MOPS and cannot create unannounced November fares or levels."
      ],
      [
        "IATA weekly Global Jet USD 190.18, up 1.5%",
        "The official IATA Fuel Monitor checked October 14 shows global weekly average 190.18 USD/bbl, +1.5% week-on-week. It differs from Cho Gia daily Kero 175.71 and calculation-period Singapore MOPS. Earlier 187.34 weekly news remains historical.",
        "A fuel-cost reference signal, not standalone confirmation of a November surcharge increase."
      ]
    ]
  },
  "ja": {
    "status": "10月公式公示が適用中・11月公示前、算定中",
    "fact": "10月発券は公式公示基準です。大韓航空国際線片道49,000〜362,600ウォン、アシアナ53,400〜301,200ウォン。他社の既存公示通貨・距離区分・適用規則は維持します。",
    "pending": "11月は公式発表前・算定中です。9月16日〜10月15日の期間は10月14日現在終了しておらず、最終平均・段階・金額は未確定です。",
    "jet": "Chợ Giáの10/13 Kero175.71 USD/bbl（約418.36 cents/gal）は別出所の日次参考です。Sparta10/2 Jet176.78を上書きせず、11月平均でもありません。",
    "fx": "10/13 Seoul Money Brokerage15:30日次基準1,345.10 KRW/USD。航空会社の月間平均ではなく異なる市場終値と合算しません。",
    "risk": "攻撃と通航縮小は供給・運送リスクを高めますが全面閉鎖や必然的な価格・サーチャージ上昇ではありません。報道と当事者主張を分けます。",
    "foot": "10月確定158.57 USD/bbl（377.54 cents/gal）は比較基準。Chợ Giá日次175.71、Sparta10/2 176.78、IATA週次190.18は異なり、11月平均は未確定です。",
    "historical": "10/6 Kpler迂回6.7m bpdと以前の供給分析は日付付き過去参考です。新たな攻撃だけで供給ゼロとはしません。",
    "q": [
      "10月公示金額の適用は？",
      "11月算定は終了？",
      "Kero175.71ドルは11月平均？",
      "cents/gallonへの換算は？",
      "1,345.10は月間為替基準？",
      "Global JetとMOPSは同じ？",
      "Hormuzの全攻撃責任は確認済み？",
      "攻撃で値上げは確定？"
    ],
    "conversion": "175.71 USD/bbl ÷ 42 × 100 ≈ 418.36 cents/gallon。原値を維持し通貨換算や11月平均にはしません。",
    "cards": [
      [
        "UKMTO未確認飛翔体の報道：Iran主張と区別",
        "10月13日APは最低3隻が未確認飛翔体で攻撃されたとのUKMTO通報を伝えます。配信版は10月12日月曜掲示・前日の事件と説明し、個別責任は未確認です。Iran当局者の「密輸船」攻撃発言はIran側主張で全事件の独立した帰属確認ではありません。指定APリンク制限のため閲覧可能なAP配信版を接続します。",
        "海運安全・運送リスク増加であって全面閉鎖や必然的値上げは未確認です。"
      ],
      [
        "FT参考：2週24隻、単日物量と平均を区別",
        "10月11日まで2週間24隻攻撃というFT報道です。原文閲覧制限のため再引用と照合した報道参考として表示します。10月11日290万バレルは単日観測で追跡による修正可能性があり、戦前比40％超減少は別の7日平均説明です。その率を単日量に付けたりKpler過去週値と単純比較しません。",
        "通航縮小と攻撃リスクは別で、この数値から全面閉鎖や11月金額・段階を作りません。"
      ],
      [
        "USD/KRW1,345.10：10/13ソウル15:30基準",
        "10月13日Financial News表はSeoul Money Brokerage/Infomax資料と米ドルのソウル15:30基準を明記します。日次基準1,345.10 KRW/USDで、別時点市場終値と統合せず航空会社算定平均にも代用しません。",
        "既存の公式KRW/USD金額や換算設定を任意変更しません。"
      ],
      [
        "10/13 Kero175.71ドル：別出所の日次参考",
        "Chợ Giáの10月13日Kero行は175.71です。USD/bbl換算175.71 ÷ 42 × 100 ≈418.36 cents/gallon。Spartaと異なる参考資料として保持し、10月確定158.57/377.54や未完了11月平均と混ぜません。",
        "日次航空燃料値は公式算定平均・段階・金額の確定値ではありません。"
      ],
      [
        "Brent105.69・WTI94.14ドル：10/13終値まちまち",
        "10月13日終値Brent105.69 USD/bbl（-0.9％）、WTI94.14（+0.4％）。指定Reutersの閲覧可能配信版は先の場中106.04/93.27で、終値は別の締め報道と照合しました。供給見通しと海運リスクが同時に働くため攻撃のみで方向を確定しません。",
        "原油終値はSingapore MOPSではなく未公示11月金額・段階を生成しません。"
      ],
      [
        "IATA週次Global Jet190.18ドル、+1.5％",
        "10月14日確認のIATA公式は週次Global平均190.18 USD/bbl、前週比+1.5％です。Chợ Giá日次175.71やSingapore算定平均とは異なります。以前187.34のニュースは当時記録として維持。",
        "燃料負担の参考で、単独で11月値上げ確定ではありません。"
      ]
    ]
  },
  "zh": {
    "status": "10月官方公告适用中·11月公告前、计算中",
    "fact": "10月出票按官方公告。大韩航空国际线单程49,000至362,600韩元，韩亚53,400至301,200韩元；其他航司已有公告币种、距离分段及适用规则保持。",
    "pending": "11月仍公告前、计算中。9月16日至10月15日期间在10月14日尚未结束，最终均价、档位与金额未定。",
    "jet": "Chợ Giá10/13 Kero175.71 USD/bbl（约418.36 cents/gal）为另一来源日参考。不覆盖Sparta10/2 Jet176.78，也不是11月均价。",
    "fx": "10/13 Seoul Money Brokerage15:30日基准1,345.10 KRW/USD，不是航司月平均，不合并不同市场收盘。",
    "risk": "攻击和通航萎缩增加供应运输风险，但不证明完全关闭或必然涨油价、附加费。报道与当事方主张分开。",
    "foot": "10月确认158.57 USD/bbl（377.54 cents/gal）为比较基准。Chợ Giá日175.71、Sparta10/2 176.78、IATA周190.18不同，11月平均未定。",
    "historical": "10/6 Kpler绕行6.7m bpd和既有供应分析为带日期历史参考，不凭新攻击断言供应变零。",
    "q": [
      "10月公告金额如何适用？",
      "11月计算结束了吗？",
      "Kero175.71美元是11月均价吗？",
      "如何换成cents/gallon？",
      "1,345.10是月换算基准吗？",
      "Global Jet与MOPS相同吗？",
      "Hormuz所有攻击归因已确认吗？",
      "攻击确认附加费必涨吗？"
    ],
    "conversion": "175.71 USD/bbl ÷ 42 × 100 ≈418.36 cents/gallon。保留原价，不是货币换算或11月平均。",
    "cards": [
      [
        "UKMTO未知发射物报道：与Iran主张分开",
        "10月13日AP称UKMTO通报至少3艘船遭未知发射物攻击。配发版描述10月12日周一发布、前一天事件，个别责任未确认。Iran官员攻击所谓走私船的说法是Iran主张，不是所有事件归因的独立证明。指定AP链接受限，连接可阅AP配发版。",
        "海运安全与运输风险升高，不证明全面关闭或必然涨价。"
      ],
      [
        "FT参考：两周24艘、单日量与平均分开",
        "FT报道范围是截至10月11日两周24艘遇袭。原文访问受限，作为与再引用对照的报道参考。10月11日290万桶是单日观测且可随追踪修订，战前低40%以上对应另一个7日平均。不可把此比例附于单日量或直接比较既有Kpler周值。",
        "通航萎缩与攻击风险不同，不能从此确定全面关闭或11月金额档位。"
      ],
      [
        "USD/KRW1,345.10：10/13首尔15:30基准",
        "10月13日Financial News表注明Seoul Money Brokerage/Infomax与美元首尔15:30基准。日基准为1,345.10 KRW/USD，不同时间收盘不合并，也不用作航司计算期平均。",
        "不任意修改既有官方KRW/USD金额或换算设置。"
      ],
      [
        "10/13 Kero175.71美元：不同来源日参考",
        "Chợ Giá10月13日Kero行为175.71。USD/bbl换算175.71 ÷ 42 ×100≈418.36 cents/gallon。保留另一来源参考，区别Sparta、10月确认158.57/377.54和未完成11月平均。",
        "日航油是参考，不是官方计算均价、档位或金额。"
      ],
      [
        "Brent105.69、WTI94.14美元：10/13收盘分化",
        "10月13日收盘Brent105.69 USD/bbl（-0.9%）、WTI94.14（+0.4%）。指定Reuters可阅配发版是较早盘中106.04/93.27，收盘已与另一个收市报道核对。供应预期和海运风险同时作用，不能只凭攻击确定方向。",
        "原油收盘不是Singapore MOPS，不生成未公告11月金额档位。"
      ],
      [
        "IATA周Global Jet190.18美元、+1.5%",
        "10月14日核对IATA官方周全球平均190.18 USD/bbl，环比+1.5%。不同于Chợ Giá日175.71及Singapore计算期均值。此前187.34新闻保留为历史。",
        "燃油负担参考，不独立确认11月涨费。"
      ]
    ]
  },
  "fr": {
    "status": "Avis octobre applicables · novembre avant annonce, calcul en cours",
    "fact": "Émission octobre selon avis officiels : Korean Air aller simple international 49,000–362,600 KRW ; Asiana 53,400–301,200 KRW. Devises, tranches et règles des autres avis conservées.",
    "pending": "Novembre avant publication, calcul en cours. La période du 16 septembre au 15 octobre n’est pas terminée le 14 ; moyenne, niveau et montants définitifs inconnus.",
    "jet": "Kero Chợ Giá du 13/10, 175.71 USD/bbl (~418.36 cents/gal), est une référence quotidienne distincte. Ne remplace ni Sparta 2/10 176.78 ni la moyenne novembre.",
    "fx": "Référence quotidienne Seoul Money Brokerage 13/10 à 15:30 : 1,345.10 KRW/USD. Pas moyenne mensuelle aérienne, pas fusion avec clôtures différentes.",
    "risk": "Attaques et transit réduit augmentent risques d’offre/transport, sans fermeture totale prouvée ou hausse certaine. Rapports et revendications séparés.",
    "foot": "Moyenne octobre 158.57 USD/bbl (377.54 cents/gal) : comparaison. Chợ Giá quotidien 175.71, Sparta 2/10 176.78 et IATA hebdomadaire 190.18 distincts ; moyenne novembre inconnue.",
    "historical": "Kpler 6/10 dérivations 6.7m bpd et analyses antérieures restent datés. Les nouvelles attaques ne prouvent pas une offre tombée à zéro.",
    "q": [
      "Comment appliquer les montants octobre ?",
      "Le calcul novembre est-il achevé ?",
      "Kero 175.71 USD est-il la moyenne novembre ?",
      "Conversion en cents/gallon ?",
      "1,345.10 est-il le change mensuel ?",
      "Global Jet identique à MOPS ?",
      "Toutes les responsabilités sont-elles établies ?",
      "Attaques signifient-elles hausse certaine ?"
    ],
    "conversion": "175.71 USD/bbl ÷ 42 × 100 ≈418.36 cents/gallon. Prix original conservé, ni conversion monétaire ni moyenne novembre.",
    "cards": [
      [
        "UKMTO : projectiles inconnus, revendications iraniennes distinctes",
        "AP du 13 octobre rapporte au moins trois navires frappés selon UKMTO. La copie distribuée décrit une publication lundi 12 concernant la veille ; responsabilités individuelles inconnues. Le propos iranien sur des navires de contrebande est une revendication, non preuve indépendante pour tous ces incidents. Le lien AP fourni étant restreint, copie AP accessible liée.",
        "Risque maritime accru, sans fermeture totale ou hausse inévitable prouvées."
      ],
      [
        "Référence FT : 24 navires sur deux semaines, jour versus moyenne",
        "FT rapporte 24 navires attaqués sur deux semaines au 11 octobre. Original restreint ici : référence rapportée confrontée à une reprise. Les 2.9m barils du 11 sont une observation quotidienne révisable par suivi ; baisse de plus de 40% face à l’avant-guerre décrit une autre moyenne sept jours. Ne pas appliquer ce taux au jour ni comparer directement à l’ancien Kpler hebdomadaire.",
        "Transit réduit et risque sont distincts ; pas de fermeture totale ou montants novembre déduits."
      ],
      [
        "USD/KRW 1,345.10 : référence Séoul 13/10 à 15:30",
        "Table Financial News du 13 octobre : Seoul Money Brokerage/Infomax, dollar à 15:30 Séoul. Référence journalière 1,345.10 KRW/USD, distincte de clôtures à horaires différents et du change moyen de calcul aérien.",
        "Avis KRW/USD officiels et réglages de conversion existants non modifiés arbitrairement."
      ],
      [
        "Kero 175.71 USD le 13/10 : référence quotidienne séparée",
        "Ligne Kero Chợ Giá du 13 octobre : 175.71. Base USD/bbl : 175.71 ÷ 42 × 100 ≈418.36 cents/gallon. Source distincte de Sparta, de la moyenne octobre 158.57/377.54 et de novembre inachevé.",
        "Prix journalier de référence, pas moyenne officielle, niveau ou montant confirmé."
      ],
      [
        "Brent 105.69, WTI 94.14 USD : clôture 13/10 mixte",
        "Clôture 13 octobre : Brent 105.69 USD/bbl (-0.9%), WTI 94.14 (+0.4%). Copie accessible du Reuters fourni : prix intrajournaliers antérieurs 106.04/93.27, non clôture ; clôtures croisées avec d’autres rapports de fin de séance. Offre et risque maritime interagissent, attaques seules non déterminantes.",
        "Clôtures de brut non MOPS : aucun montant ou niveau novembre inventé."
      ],
      [
        "IATA hebdomadaire Global Jet 190.18 USD, +1.5%",
        "Fuel Monitor officiel vérifié le 14 octobre : moyenne globale hebdomadaire 190.18 USD/bbl, +1.5%. Distincte de Kero quotidien 175.71 et du MOPS de calcul. Anciennes nouvelles 187.34 conservées historiquement.",
        "Signal de coût, pas confirmation autonome d’une hausse novembre."
      ]
    ]
  },
  "de": {
    "status": "Oktober-Mitteilungen gelten · November vor Veröffentlichung, Berechnung läuft",
    "fact": "Oktober-Ausstellung nach offiziellen Mitteilungen: Korean Air international einfach 49,000–362,600 KRW; Asiana 53,400–301,200 KRW. Andere Währungen, Entfernungsbänder und Regeln erhalten.",
    "pending": "November unveröffentlicht und in Berechnung. Zeitraum 16. September bis 15. Oktober am 14. noch nicht beendet; Endmittel, Stufe und Beträge offen.",
    "jet": "Chợ Giá-Kero 13.10., 175.71 USD/bbl (~418.36 cents/gal), ist separater Tagesreferenzwert. Kein Überschreiben von Sparta 2.10. 176.78 oder November-Mittel.",
    "fx": "Seoul Money Brokerage 13.10. 15:30 Tagesreferenz 1,345.10 KRW/USD. Kein Monatswechselkurs der Airline und keine Mischung mit anderen Schlusswerten.",
    "risk": "Angriffe und weniger Transit erhöhen Angebots-/Transportrisiken, beweisen weder Vollsperre noch sichere Preisanstiege. Meldungen und Parteibehauptungen getrennt.",
    "foot": "Oktober-Mittel 158.57 USD/bbl (377.54 cents/gal) als Vergleich. Chợ Giá täglich 175.71, Sparta 2.10. 176.78 und IATA wöchentlich 190.18 sind verschieden; November-Mittel offen.",
    "historical": "Kpler 6.10. Umwege 6.7m bpd und frühere Analysen bleiben datiert. Neue Angriffe beweisen kein Angebot von null.",
    "q": [
      "Wie gelten Oktober-Beträge?",
      "Ist November-Berechnung fertig?",
      "Kero 175.71 USD gleich November-Mittel?",
      "Wie cents/gallon umrechnen?",
      "Ist 1,345.10 der Monatskurs?",
      "Global Jet identisch mit MOPS?",
      "Alle Angriffszurechnungen bestätigt?",
      "Bedeuten Angriffe sichere Zuschlagserhöhung?"
    ],
    "conversion": "175.71 USD/bbl ÷ 42 × 100 ≈418.36 cents/gallon. Originalpreis bleibt, keine Währungsumrechnung oder November-Mittelbildung.",
    "cards": [
      [
        "UKMTO: unbekannte Projektile, iranische Behauptungen getrennt",
        "AP vom 13. Oktober meldet mindestens drei getroffene Schiffe laut UKMTO. Verteilte Kopie beschreibt Montagsmeldung 12. über den Vortag; Verantwortliche unbekannt. Iranische Aussage über Schmuggelschiffe ist Behauptung, kein unabhängiger Beweis für jeden Angriff. Wegen eingeschränktem AP-Link wird zugängliche AP-Kopie verlinkt.",
        "Seerisiko steigt, keine nachgewiesene Vollsperre oder unvermeidliche Preiserhöhung."
      ],
      [
        "FT-Referenz: 24 Schiffe in zwei Wochen, Tag und Mittel trennen",
        "FT meldet 24 angegriffene Schiffe in zwei Wochen bis 11. Oktober. Original eingeschränkt, Angaben als mit Wiederzitat geprüfte Referenz. 2.9m Barrel am 11. sind revidierbarer Tageswert; mehr als 40% Rückgang betrifft separates Siebentage-Mittel. Diesen Rückgang nicht dem Einzelwert zuordnen oder direkt mit altem Kpler-Wochenwert vergleichen.",
        "Transit und Angriffsrisiko verschieden; keine Vollsperre oder November-Beträge daraus errechnen."
      ],
      [
        "USD/KRW 1,345.10: Seoul-Referenz 13.10. 15:30",
        "Financial-News-Tabelle 13. Oktober nennt Seoul Money Brokerage/Infomax und Dollarbasis 15:30 Seoul. Tagesreferenz 1,345.10 KRW/USD, nicht andere zeitliche Schlusskurse oder Airline-Berechnungswechselkurs.",
        "Offizielle KRW/USD-Beträge und bestehende Umrechnungseinstellungen nicht willkürlich geändert."
      ],
      [
        "Kero 175.71 USD am 13.10.: separater Tageswert",
        "Chợ Giá-Kero-Zeile 13. Oktober nennt 175.71. USD/bbl: 175.71 ÷ 42 × 100 ≈418.36 cents/gallon. Alternative Quelle zu Sparta, getrennt vom Oktober-Mittel 158.57/377.54 und offenem November-Mittel.",
        "Tagespreis als Referenz, kein offizielles Mittel oder bestätigte Stufe/Betrag."
      ],
      [
        "Brent 105.69, WTI 94.14 USD: gemischter Schluss 13.10.",
        "Schluss 13. Oktober: Brent 105.69 USD/bbl (-0.9%), WTI 94.14 (+0.4%). Zugängliche Kopie des angegebenen Reuters-Berichts enthält frühere Intradaywerte 106.04/93.27; Schlusswerte separat abgeglichen. Angebot und Seerisiken wirken gleichzeitig, Angriffe allein legen Richtung nicht fest.",
        "Rohölschluss ist kein MOPS, keine unveröffentlichten November-Beträge oder Stufen erzeugen."
      ],
      [
        "IATA-Wochenwert Global Jet 190.18 USD, +1.5%",
        "Offizieller Fuel Monitor am 14. Oktober geprüft: globales Wochenmittel 190.18 USD/bbl, +1.5%. Anders als tägliches Kero 175.71 und Singapore-Berechnungsmittel. Frühere 187.34-Nachrichten bleiben historisch.",
        "Kostensignal, kein alleiniger Beleg für November-Erhöhung."
      ]
    ]
  }
};
var urls=[
'https://www.local10.com/news/2026/10/13/houthi-rebels-report-airstrikes-in-yemen-and-other-middle-east-developments/',
'https://www.ft.com/content/a4ab83d4-81b5-4336-9569-a0708b41e894',
'https://www.fnnews.com/news/202610131539493182',
'https://chogia.vn/gia-xang-dau-singapore-hom-nay-38348/',
'https://pflpetroleum.com/reports/petroleum-daily-report-10-13-2026/',
'https://www.iata.org/en/publications/economics/fuel-monitor/'
];
var names=['AP / UKMTO','Financial Times (reported reference)','Financial News / Seoul Money Brokerage','Chợ Giá (daily reference)','Petroleum market close report','IATA'];
function firstSentence(text){var m=text.match(/^.*?(?:(?<![0-9])[.!?](?=\s|$)|。)/);return m?m[0]:text;}
var ftPeriods={ko:'10/11까지 2주',en:'two weeks through Oct 11',ja:'10/11まで2週間',zh:'截至10/11两周',fr:'deux semaines au 11/10',de:'zwei Wochen bis 11.10.'};
r.modified=stamp;r.asOf=asOf;r.numbers=Object.assign({},r.numbers,window.AERO_MARKET_NUMBERS_20261014);
r.sources=[['Chợ Giá · daily Kero reference',urls[3]],['IATA · global weekly',urls[5]]];
Object.keys(copy).forEach(function(l){
var c=copy[l],p=r.packs[l],rows=r.rows[l].map(function(x){return x.slice();});
rows[0][1]=c.status;rows[0][2]=c.pending;
rows[1][1]='Chợ Giá 2026-10-13: Kero 175.71 USD/bbl · 418.36 cents/gal · Sparta 2026-10-02: 176.78 USD/bbl';
rows[1][2]=c.jet;
rows[2][1]='USD/KRW 1,345.10 (2026-10-13 15:30 KST) · Brent 105.69 (-0.9%) / WTI 94.14 (+0.4%) USD/bbl (2026-10-13) · IATA 190.18 USD/bbl (+1.5%)';
rows[2][2]=c.fx+' '+firstSentence(c.cards[5][1]);
rows[3][2]=c.historical;
rows[4][1]='AP / UKMTO: ≥3 · FT: 24 ('+ftPeriods[l]+') · 2026-10-11: 2.9m barrels';
rows[4][2]=c.risk;
r.rows[l]=rows;
var answers=[c.fact,c.pending,c.jet,c.conversion,c.fx,c.foot,c.cards[0][1],c.risk+' '+c.pending];
Object.assign(p,{rows:rows,notice:c.fact,intro:c.fact+' '+c.pending+' '+c.jet+' '+c.fx,desc:c.pending+' '+c.jet+' '+c.fx,sub:asOf+' · '+c.status,newsSub:asOf+' · '+c.status,foot:c.foot,note:c.pending+' '+c.risk,basisBody:c.foot,verdict1:c.pending,verdict2:c.risk,verdictLong:c.pending,keyVars:rows.map(function(x){return x[0]+': '+x[1];}),officialNotice:asOf+' · '+c.status,faq:c.q.map(function(q,i){return{q:q,a:answers[i]};})});
});
var events=['2026-10-11','2026-10-11','2026-10-13','2026-10-13','2026-10-13',null];
var cards=copy.ko.cards.map(function(_,i){
var card={id:'market-20261014-'+(i+1),category:(i===0||i===5)?'institution':'market',priority:i+1,date:'2026-10-14',publishedAt:stamp,updatedAt:stamp,reportedDate:i===5?'2026-10-14':'2026-10-13',eventDate:events[i],badge:'NEW',aiSummary:true,relevanceScore:1-i/100,sourceUrl:urls[i],i18n:{}};
Object.keys(copy).forEach(function(l){var x=copy[l].cards[i];card.i18n[l]={title:x[0],aiBrief:firstSentence(x[1]),summary:x[1],impact:x[2],sourceName:names[i],tags:[],links:[],faq:[]};});
card.i18n.cn=card.i18n.zh;return card;
});
r.newsCards=cards.concat(r.newsCards.filter(function(x){return !/^market-20261014-/.test(x.id);}));
window.AERO_MARKET_RELEASE=r;
})();

