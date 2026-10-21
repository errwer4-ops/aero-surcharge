/* Append-only news release. Existing five indicator rows and official tables stay intact. */
(function(){
'use strict';
var r=window.AERO_MARKET_RELEASE;if(!r)return;
var stamp='2026-10-21T10:00:00+09:00',asOf='2026.10.21 10:00 KST';
var urls=[
'https://www.yna.co.kr/amp/view/AKR20261016068000003',
'https://exchangerate.dev/exchange-rates/usd-krw',
'https://commodityscope.com/prices/singapore-jet-kerosene',
'https://www.investing.com/news/commodities-news/oil-rises-on-middle-east-supply-worries-4961438',
'https://ca.marketscreener.com/news/asian-refiners-use-smaller-tankers-buy-delivered-crude-as-freight-rates-soar-ce785cdbd181f521',
'https://www.marketscreener.com/news/oil-rises-on-middle-east-supply-worries-ce785cd8df89f324',
'https://ca.marketscreener.com/news/death-toll-from-houthi-attack-on-yemen-training-camp-rises-to-73-ce785cd8db8bf325'
];
var copy={
ko:{
dec:'12월 산정기간은 2026년 10월 16일~11월 15일로 아직 진행 중입니다. 항공유·운송비의 상방 위험과 환율 완충, 외교 변수가 혼재해 판단을 유보합니다. 방향성 신뢰도는 낮고 특정 단계 판단은 보류합니다. 평균·단계·금액·확률은 확정하지 않습니다.',
jet:'2026년 10월 19일 CommodityScope FOB Singapore Jet Kerosene은 170.16 USD/bbl입니다. 제공처가 신뢰도 낮음으로 표시한 일일 참고 평가값이며 Platts 원자료나 11월 확정 MOPS 평균 173.89 USD/bbl, 12월 산정 평균이 아닙니다. 20~21일 새 값은 확인되지 않아 19일 값을 유지하며 기존 제공처 시계열을 덮어쓰지 않습니다.',
fx:'USD/KRW 1,323.65원은 2026년 10월 21일 09:42 KST exchangerate.dev의 장중 참고값입니다. 제공처의 1분 기록으로 대조했으며 10:00 공식 고시나 산정기간 평균환율이 아닙니다. 10월 16일 서울 종가 1,331.4원은 별도 과거 비교값입니다. 당일 시세로 10~11월 공식 공시 금액을 다시 계산하지 않습니다.',
oil:'Reuters의 2026년 10월 21일 00:22 GMT(09:22 KST) 장중값은 Brent 109.64·WTI 98.58 USD/bbl로 각각 0.78% 상승입니다. 전일 20일 Brent 종가는 108.79입니다. WTI 11월물은 20일 만기 종가 101.79, 12월물 전일 종가는 97.82로 구분합니다. 현재 12월물과 만기된 11월물을 연결해 폭락으로 해석하지 않습니다. 유가만으로 12월 유류할증료를 확정하지 않습니다.',
freight:'10월 20일 Reuters 보도에서 Vitol 아시아 책임자는 호르무즈 셔틀 운항에 VLCC 약 80척이 묶여 미국→아시아 원유 운송비가 배럴당 약 40달러에 이르렀다고 설명했습니다. 전주 업계 행사 발언으로, 일일 용선료나 모든 항로의 고정 운임이 아닙니다. 아시아 정유사들은 Aframax·장기 용선·인도조건 구매로 대응하지만 비용 완화나 연료 공급 정상화를 보장하지 않습니다.',
security:'10월 21일 Reuters는 이란 혁명수비대 해군이 전날 호르무즈 남쪽에서 초대형 유조선의 기뢰 접촉·화재를 주장했다고 전했습니다. 이란 측 주장으로, 사건 경위·기뢰 설치자·책임은 독립 확인되지 않았습니다. Kpler가 19일 발표한 최근 2주 최소 18건 공격은 별도 기간 집계로 당일 공격 수나 통항량이 아닙니다. 완전 폐쇄로 단정하지 않습니다.',
redsea:'후티는 10월 19일 Yanbu·Shaybah 에너지 시설과 Riyadh·Abha 공항 공격을 주장했으나 사우디 당국 확인과 Reuters 독립 검증은 없었습니다. 20일 Reuters는 현지 당국을 인용해 19일 Shabwa 훈련소 공격 사망자가 73명으로 늘었다고 보도했습니다. 지상 전황을 Bab el-Mandeb 상선 운항 차질로 확정하지 않습니다. 운송·보험·공급 위험 요인이지 유가·할증료 인상 보장은 아닙니다.',
diplomacy:'이란의 10월 18일 조건부 재개방 제안은 합의가 아닙니다. 20일 이란 대통령과 파키스탄 육군 수장의 중재 논의 역시 봉쇄 해제나 안전 통항 합의로 확인되지 않았습니다.',
heads:['11월 27단계 확정: 기존 8개사 공시 유지','환율 1,323.65원: 10월 21일 09:42 장중 참고값','Singapore Jet 170.16달러: 10월 19일 일일 참고 평가','Brent 109.64·WTI 98.58달러: 09:22 장중값','Vitol: VLCC 약 80척 셔틀 투입·미국발 운송비 배럴당 약 40달러','이란 측 기뢰·화재 주장과 Kpler 최근 2주 최소 18건 집계','후티의 사우디 공격 주장·Shabwa 사망 73명 보도'],
questions:['10월 적용 단계는?','11월 확정 단계는?','11월 MOPS 평균과 산정기간은?','170.16달러는 월간 MOPS 평균인가요?','12월 유류할증료는 확정됐나요?','1,323.65원은 월간 환산 기준인가요?','호르무즈는 완전히 폐쇄됐나요?','기뢰 사건과 책임은 확인됐나요?'],
impact:'공시 금액은 유지합니다. 시장 참고자료와 당사자 주장은 확정 사실·산정 평균과 구분하며 다음 달 인상을 단정하지 않습니다.'},
en:{
dec:'December calculation, October 16–November 15, 2026, remains ongoing. Jet-fuel and freight upside risks coexist with FX relief and diplomacy, so judgment is reserved. Direction confidence is low; a specific level remains unassessed. No confirmed average, level, amount or probability.',
jet:'CommodityScope assessed FOB Singapore Jet Kerosene at 170.16 USD/bbl on October 19, 2026, with low confidence. This daily indicative estimate is not Platts data, the confirmed November MOPS average of 173.89 USD/bbl, or a December average. No verified October 20–21 update replaces the dated October 19 reference; existing provider series stay separate.',
fx:'USD/KRW 1,323.65 is exchangerate.dev’s October 21, 2026 09:42 KST intraday reference, checked against its one-minute history. It is neither a 10:00 official fixing nor a calculation-period average. The October 16 Seoul close of 1,331.4 is a separate historical comparison. Current FX does not recalculate published October or November fares.',
oil:'Reuters quoted Brent 109.64 and WTI 98.58 USD/bbl at 00:22 GMT / 09:22 KST on October 21, both up 0.78% intraday. October 20 Brent settled at 108.79. Expiring November WTI settled at 101.79; December WTI’s previous settlement was 97.82. Do not interpret the switch from expired November to current December as a price collapse, or infer December surcharges from crude alone.',
freight:'Reuters reported October 20 that Vitol’s Asia head described about 80 VLCCs tied to Hormuz shuttle operations and US-to-Asia crude freight around USD 40/bbl. These were remarks at the previous week’s industry event, not daily hire rates or a fixed tariff for every route. Asian refiners use Aframax vessels, long-term charters and delivered purchases; these adaptations do not guarantee lower costs or normal fuel supply.',
security:'Reuters reported October 21 that Iran’s Revolutionary Guards Navy claimed on the previous day that a supertanker struck a mine and caught fire south of Hormuz. The account, mine origin and responsibility are not independently established. Kpler’s October 19 note counted at least 18 reported vessel attacks over two weeks, not one day or a transit total. Complete closure is not established.',
redsea:'The Houthis claimed October 19 strikes on Yanbu and Shaybah energy sites and Riyadh and Abha airports. Saudi confirmation and independent Reuters verification were absent. On October 20, Reuters cited local authorities raising the October 19 Shabwa training-camp toll to 73. Ground fighting does not establish commercial shipping disruption at Bab el-Mandeb. These are supply, freight and insurance risks, not a guarantee of higher crude or surcharges.',
diplomacy:'Iran’s October 18 conditional reopening proposal is not an agreement. October 20 mediation discussions between Iran’s president and Pakistan’s army chief do not establish a lifted blockade or agreed safe passage.',
heads:['November Level 27 confirmed: retain eight verified airline notices','USD/KRW 1,323.65: October 21 09:42 KST reference','Singapore Jet USD 170.16: October 19 daily indicative assessment','Brent 109.64 / WTI 98.58: 09:22 KST intraday','Vitol: about 80 shuttle VLCCs, US–Asia freight around USD 40/bbl','Iran’s mine/fire claim and Kpler’s two-week count of at least 18 attacks','Houthi Saudi strike claims and reported Shabwa death toll of 73'],
questions:['Which level applies in October?','Which level is confirmed for November?','What is the November MOPS average and period?','Is USD 170.16 a monthly MOPS average?','Is December confirmed?','Is 1,323.65 the monthly conversion rate?','Is Hormuz completely closed?','Are the mine incident and responsibility independently established?'],
impact:'Published fares remain unchanged. Separate indicative data and party claims from confirmed facts and calculation averages; no guaranteed increase next month.'},
ja:{
dec:'12月算定期間は2026年10月16日～11月15日で進行中です。航空燃料・運賃の上昇リスク、為替の緩衝、外交要因が混在し判断を保留します。方向性の信頼度は低く、特定段階は判断保留。平均・段階・金額・確率は確定しません。',
jet:'CommodityScopeの2026年10月19日FOB Singapore Jet Keroseneは170.16 USD/bbl。信頼度「低」の日次参考評価で、Platts原資料、11月確定MOPS平均173.89 USD/bbl、12月平均ではありません。20～21日の新値は確認できず19日付を維持し、既存提供元の系列は上書きしません。',
fx:'USD/KRW 1,323.65はexchangerate.devの2026年10月21日09:42 KST取引中参考値で、1分履歴と照合しました。10:00公式公示や算定期間平均ではありません。10月16日ソウル終値1,331.4は別の過去比較値です。当日為替で10～11月の公示額を再計算しません。',
oil:'Reutersの10月21日00:22 GMT／09:22 KST取引中値はBrent 109.64・WTI 98.58 USD/bblで各0.78％高。20日Brent終値は108.79。満期のWTI11月物終値101.79と12月物前日終値97.82を区別します。限月切替を暴落と解釈せず、原油だけで12月燃油料を確定しません。',
freight:'10月20日ReutersによるとVitolアジア責任者は、ホルムズのシャトル輸送にVLCC約80隻が拘束され、米国→アジア原油運賃は約40 USD/bblに達したと前週の業界会合で説明しました。日額用船料や全航路共通の固定料金ではありません。製油所はAframax・長期用船・着荷条件購入で対応しますが、費用低下や正常供給の保証ではありません。',
security:'10月21日Reutersは、イラン革命防衛隊海軍が前日、ホルムズ南方で超大型タンカーの機雷接触と火災を主張したと報道。経緯・機雷の設置者・責任は独立確認されていません。Kplerの19日資料にある直近2週間で最低18件の攻撃は、当日件数や通航数ではありません。完全閉鎖とは断定しません。',
redsea:'フーシ派は10月19日、Yanbu・Shaybahのエネルギー施設とRiyadh・Abha空港への攻撃を主張。サウジ当局の確認やReuters独立検証はありません。20日Reutersは現地当局を引用し、19日のShabwa訓練所攻撃の死者73人と報道。地上戦況をBab el-Mandeb商船運航障害と同一視しません。供給・運賃・保険のリスクであり原油・燃油料上昇の保証ではありません。',
diplomacy:'イランの10月18日条件付き再開提案は合意ではありません。20日のイラン大統領とパキスタン陸軍トップの仲介協議も、封鎖解除や安全通航合意を意味しません。',
heads:['11月27段階確定：確認済み8社公示を維持','USD/KRW 1,323.65：10月21日09:42参考値','Singapore Jet 170.16ドル：10月19日日次参考評価','Brent 109.64・WTI 98.58：09:22取引中値','Vitol：シャトルVLCC約80隻・米国発運賃約40 USD/bbl','イランの機雷・火災主張とKpler直近2週最低18件','フーシ派のサウジ攻撃主張・Shabwa死者73人の報道'],
questions:['10月の適用段階は？','11月の確定段階は？','11月MOPS平均と算定期間は？','170.16ドルは月間MOPS平均？','12月は確定済み？','1,323.65は月間換算為替？','ホルムズは完全閉鎖？','機雷事件と責任は独立確認済み？'],
impact:'公示額を維持。参考値と当事者の主張を確認済み事実・算定平均から区別し、翌月の値上がりを断定しません。'},
zh:{
dec:'12月计算期为2026年10月16日至11月15日，仍在进行。航油和运费上行风险与汇率缓冲、外交因素并存，暂缓判断。方向可信度低，特定档位判断保留，不确定均价、档位、金额或概率。',
jet:'CommodityScope的2026年10月19日FOB Singapore Jet Kerosene为170.16 USD/bbl，属低可信度每日参考评估，并非Platts原始数据、11月确定MOPS均价173.89 USD/bbl或12月计算期均价。20至21日新值未核实，保留19日日期，不覆盖原供应商序列。',
fx:'USD/KRW 1,323.65为exchangerate.dev的2026年10月21日09:42 KST盘中参考值，已核对一分钟历史记录，并非10:00官方定盘价或计算期平均汇率。10月16日首尔收盘1,331.4仅为单独历史比较值。不以当日汇率重新计算10至11月官方公告金额。',
oil:'Reuters的10月21日00:22 GMT／09:22 KST盘中报价为Brent 109.64、WTI 98.58 USD/bbl，均上涨0.78%。20日Brent结算108.79。WTI到期11月合约结算101.79与12月合约前日结算97.82分别列示，不能把换月理解为暴跌，也不能仅凭原油确定12月附加费。',
freight:'Reuters于10月20日报道，Vitol亚洲区负责人在前一周行业会议称，约80艘VLCC用于霍尔木兹穿梭运输，美国至亚洲原油运费约40 USD/bbl。这不是每日租船费，也非所有航线固定费率。亚洲炼厂采用Aframax、长期租船及到岸采购应对，不代表运输成本必然下降或燃料供应恢复正常。',
security:'Reuters于10月21日报道，伊朗革命卫队海军前一天声称，一艘超大型油轮在霍尔木兹以南触雷起火。过程、布雷方及责任均未获独立确认。Kpler在19日资料中称最近两周至少18起船舶袭击，并非当天袭击数或通航量，不应据此断言完全封锁。',
redsea:'胡塞于10月19日声称袭击Yanbu、Shaybah能源设施及Riyadh、Abha机场，沙特当局未确认，Reuters未能独立核实。20日Reuters援引地方当局称，19日Shabwa训练营袭击死亡人数升至73人。地面战况不能直接等同Bab el-Mandeb商船运输受阻。这些是供应、运输与保险风险，不保证油价或附加费上涨。',
diplomacy:'伊朗10月18日附条件重开提议并非协议。20日伊朗总统与巴基斯坦陆军首长讨论调停，也不等于解除封锁或达成安全通航协议。',
heads:['11月第27档已确定：保留8家已核实公告','USD/KRW 1,323.65：10月21日09:42参考值','Singapore Jet 170.16美元：10月19日每日参考评估','Brent 109.64、WTI 98.58：09:22盘中报价','Vitol：约80艘VLCC穿梭运输、美国至亚洲约40 USD/bbl','伊朗触雷起火说法与Kpler最近两周至少18起袭击','胡塞对沙特袭击说法及Shabwa死亡73人报道'],
questions:['10月适用哪一档？','11月确定哪一档？','11月MOPS均价及计算期？','170.16美元是月均MOPS吗？','12月已确定吗？','1,323.65是月度换算汇率吗？','霍尔木兹完全封锁了吗？','触雷事件及责任已独立核实吗？'],
impact:'保持官方公告金额。区分参考价格、当事方说法与已核实事实及计算均价，不断言下月必然涨价。'},
fr:{
dec:'Le calcul de décembre couvre le 16 octobre–15 novembre 2026 et continue. Risques haussiers du kérosène et du fret, soutien du change et diplomatie restent mêlés : jugement réservé. Confiance directionnelle faible ; niveau précis non évalué. Moyenne, niveau, montant et probabilité non confirmés.',
jet:'CommodityScope évalue le FOB Singapore Jet Kerosene à 170.16 USD/bbl au 19 octobre 2026, avec faible confiance. Cette référence quotidienne n’est ni une donnée primaire Platts, ni la moyenne MOPS novembre confirmée de 173.89 USD/bbl, ni une moyenne décembre. Aucun nouveau chiffre des 20–21 octobre n’a été vérifié ; la référence garde sa date et les séries restent distinctes.',
fx:'USD/KRW 1,323.65 est la référence intrajournalière exchangerate.dev du 21 octobre 2026 à 09:42 KST, vérifiée dans son historique minute. Ce n’est ni un fixing officiel à 10:00 ni une moyenne de calcul. La clôture Séoul du 16 octobre à 1,331.4 reste une comparaison historique séparée. Le change courant ne recalcule pas les avis officiels octobre–novembre.',
oil:'Reuters indique Brent 109.64 et WTI 98.58 USD/bbl le 21 octobre à 00:22 GMT / 09:22 KST, chacun à +0.78% en séance. Brent a clôturé le 20 à 108.79. Le WTI novembre expirant a clôturé à 101.79 ; la clôture précédente du décembre était 97.82. Ne pas interpréter le changement de contrat comme un effondrement, ni déduire les surtaxes décembre du seul brut.',
freight:'Reuters rapporte le 20 octobre les propos du responsable Asie de Vitol lors d’une réunion sectorielle la semaine précédente : environ 80 VLCC mobilisés par les navettes d’Ormuz et fret États-Unis–Asie proche de 40 USD/bbl. Ce n’est ni un loyer journalier ni un tarif universel. Les raffineurs recourent aux Aframax, affrètements longs et achats livrés, sans garantie de baisse des coûts ou de normalisation de l’offre.',
security:'Selon Reuters le 21 octobre, la marine des Gardiens de la révolution a affirmé la veille qu’un superpétrolier avait heurté une mine et brûlé au sud d’Ormuz. Récit, origine de la mine et responsabilité non vérifiés indépendamment. La note Kpler du 19 recense au moins 18 attaques signalées sur deux semaines, pas une journée ni un nombre de passages. Fermeture totale non établie.',
redsea:'Les Houthis ont revendiqué le 19 octobre des frappes sur Yanbu, Shaybah et les aéroports de Riyad et Abha. Ni confirmation saoudienne ni vérification indépendante par Reuters. Le 20, Reuters cite les autorités locales portant à 73 le bilan du camp de Shabwa attaqué le 19. Les combats terrestres ne prouvent pas une interruption commerciale à Bab el-Mandeb. Risques d’offre, fret et assurance, sans hausse garantie du brut ou des surtaxes.',
diplomacy:'La proposition iranienne conditionnelle du 18 octobre n’est pas un accord. La médiation discutée le 20 par le président iranien et le chef de l’armée pakistanaise ne confirme ni levée du blocus ni passage sécurisé convenu.',
heads:['Novembre niveau 27 confirmé : huit avis vérifiés conservés','USD/KRW 1,323.65 : référence du 21 octobre à 09:42 KST','Singapore Jet 170.16 USD : évaluation quotidienne du 19 octobre','Brent 109.64 / WTI 98.58 : séance à 09:22 KST','Vitol : environ 80 VLCC en navette, fret US–Asie proche de 40 USD/bbl','Mine revendiquée par l’Iran et au moins 18 attaques en deux semaines selon Kpler','Revendications houthies en Arabie et bilan de 73 morts à Shabwa'],
questions:['Quel niveau en octobre ?','Quel niveau confirmé en novembre ?','Quelle moyenne MOPS et période novembre ?','170.16 USD est-il une moyenne MOPS mensuelle ?','Décembre est-il confirmé ?','1,323.65 est-il le taux mensuel de conversion ?','Ormuz est-il entièrement fermé ?','La mine et sa responsabilité sont-elles vérifiées indépendamment ?'],
impact:'Les montants publiés sont conservés. Distinguer références, revendications, faits confirmés et moyennes de calcul, sans hausse garantie le mois suivant.'},
de:{
dec:'Die Dezember-Berechnung vom 16. Oktober bis 15. November 2026 läuft weiter. Aufwärtsrisiken bei Kerosin und Fracht treffen auf Wechselkursentlastung und Diplomatie; Urteil vorbehalten. Richtungsverlässlichkeit gering, konkrete Stufe nicht bewertet. Mittel, Stufe, Betrag und Wahrscheinlichkeit bleiben unbestätigt.',
jet:'CommodityScope bewertet FOB Singapore Jet Kerosene am 19. Oktober 2026 mit 170.16 USD/bbl bei geringer Verlässlichkeit. Der tägliche indikative Wert ist weder Platts-Primärdatum noch bestätigtes November-MOPS-Mittel von 173.89 USD/bbl oder Dezember-Mittel. Keine neue Bewertung für 20.–21. Oktober verifiziert; Datum und getrennte Anbieterreihen bleiben erhalten.',
fx:'USD/KRW 1,323.65 ist die exchangerate.dev-Intraday-Referenz vom 21. Oktober 2026, 09:42 KST, mit der Minutenhistorie abgeglichen. Kein offizielles 10:00-Fixing und kein Berechnungsperiodenmittel. Seoul-Schluss 1,331.4 vom 16. Oktober bleibt ein eigener historischer Vergleich. Aktueller Wechselkurs berechnet veröffentlichte Oktober-/November-Tarife nicht neu.',
oil:'Reuters nennt Brent 109.64 und WTI 98.58 USD/bbl am 21. Oktober um 00:22 GMT / 09:22 KST, beide intraday +0.78%. Brent schloss am 20. bei 108.79. Auslaufender November-WTI schloss bei 101.79, vorheriger Dezember-Schluss bei 97.82. Kontraktwechsel nicht als Kurssturz deuten; Rohöl allein bestätigt keine Dezember-Zuschläge.',
freight:'Reuters berichtete am 20. Oktober über Vitols Asien-Chef beim Branchentreffen der Vorwoche: Rund 80 VLCC seien im Hormus-Shuttle gebunden, US–Asien-Rohölfracht koste rund 40 USD/bbl. Das ist keine Tagescharter und kein Festpreis für alle Routen. Raffinerien nutzen Aframax, Langzeitcharter und gelieferte Käufe; niedrigere Kosten oder normale Versorgung sind dadurch nicht garantiert.',
security:'Reuters berichtete am 21. Oktober, Irans Revolutionsgarden-Marine habe am Vortag einen Minentreffer und Brand eines Supertankers südlich von Hormus behauptet. Hergang, Minenleger und Verantwortung sind nicht unabhängig bestätigt. Kplers Mitteilung vom 19. nennt mindestens 18 gemeldete Schiffsangriffe über zwei Wochen, keine Tages- oder Durchfahrtszahl. Vollständige Sperrung nicht belegt.',
redsea:'Die Huthis beanspruchten am 19. Oktober Angriffe auf Yanbu, Shaybah sowie Riad- und Abha-Flughäfen. Saudi-Bestätigung und unabhängige Reuters-Prüfung fehlten. Am 20. meldete Reuters laut lokalen Behörden 73 Tote beim Angriff vom 19. auf das Lager Shabwa. Bodenkämpfe belegen keine kommerzielle Schifffahrtsstörung in Bab el-Mandeb. Angebots-, Fracht- und Versicherungsrisiken garantieren keine höheren Ölpreise oder Zuschläge.',
diplomacy:'Irans bedingter Öffnungsvorschlag vom 18. Oktober ist kein Abkommen. Vermittlungsgespräche am 20. zwischen Irans Präsident und Pakistans Armeechef bestätigen weder Blockadeaufhebung noch vereinbarte sichere Durchfahrt.',
heads:['November Stufe 27 bestätigt: acht geprüfte Mitteilungen bleiben','USD/KRW 1,323.65: Referenz vom 21. Oktober, 09:42 KST','Singapore Jet 170.16 USD: tägliche Bewertung vom 19. Oktober','Brent 109.64 / WTI 98.58: intraday 09:22 KST','Vitol: rund 80 Shuttle-VLCC, US–Asien-Fracht rund 40 USD/bbl','Iranische Minen-/Brandbehauptung und Kpler: mindestens 18 Angriffe in zwei Wochen','Huthi-Behauptungen zu Saudi-Angriffen und 73 gemeldete Tote in Shabwa'],
questions:['Welche Stufe gilt im Oktober?','Welche Stufe ist für November bestätigt?','November-MOPS-Mittel und Zeitraum?','Sind 170.16 USD ein monatliches MOPS-Mittel?','Ist Dezember bestätigt?','Sind 1,323.65 der monatliche Umrechnungskurs?','Ist Hormus vollständig gesperrt?','Sind Minenvorfall und Verantwortung unabhängig bestätigt?'],
impact:'Veröffentlichte Beträge bleiben erhalten. Referenzen und Parteibehauptungen von bestätigten Fakten und Berechnungsmitteln trennen; keine garantierte Erhöhung im Folgemonat.'}
};
var brief={
ko:['12월: 상방 위험·혼재 / 판단 유보 · 신뢰도 낮음',
'Vitol: 셔틀 VLCC 약 80척 · 미국→아시아 약 40 USD/bbl (10월 20일 보도)',
'운송비는 특정 항로의 배럴당 참고 사례이며 일일 용선료가 아닙니다. 대체 선박·장기 용선은 공급 위험을 일부 완충하지만 정상화를 뜻하지 않습니다.',
'이란 해군: 기뢰·화재 주장(미확인) · Kpler: 최근 2주 최소 18건 (10월 19일 자료)',
'기뢰 사건의 경위·책임은 독립 확인되지 않았습니다. 공격 건수와 실제 통항량은 별개입니다. 후티의 사우디 공격 주장도 미검증이며 완전 폐쇄·할증료 인상을 단정하지 않습니다.',
'09:42 환율은 장중 참고값으로 공식 고시·월간 환산 기준이 아닙니다. 09:22 유가는 장중값입니다. WTI 12월물은 전일 97.82와 비교하며, 만기 11월물 101.79와 혼동하지 않습니다.',
'10월 19일 Jet 170.16 USD/bbl은 CommodityScope 일일 참고 평가이며 Platts 원자료나 12월 산정 평균이 아닙니다.'],
en:['December: upside risks, mixed factors / judgment reserved; low confidence',
'Vitol: about 80 shuttle VLCCs · US–Asia around USD 40/bbl (October 20 report)',
'This is a route-specific per-barrel freight example, not daily hire. Smaller vessels and long charters may cushion supply risk but do not establish normalization.',
'Iranian navy: mine/fire claim, unverified · Kpler: at least 18 attacks over two weeks (October 19 note)',
'Mine circumstances and responsibility are not independently established. Attacks are not transit totals. Houthi Saudi claims also remain unverified; no complete closure or guaranteed surcharge increase.',
'09:42 FX is indicative, not an official fixing or monthly conversion rate. 09:22 crude is intraday. Compare December WTI with its 97.82 previous settlement, not expired November at 101.79.',
'October 19 Jet 170.16 USD/bbl is CommodityScope’s daily indicative assessment, not Platts primary data or a December calculation average.'],
ja:['12月：上昇リスク・要因混在／判断保留・信頼度低',
'Vitol：シャトルVLCC約80隻・米国→アジア約40 USD/bbl（10月20日報道）',
'特定航路のバレル当たり運賃例で、日額用船料ではありません。小型船・長期用船はリスクを一部緩衝しますが正常化を意味しません。',
'イラン海軍：機雷・火災主張、未確認・Kpler：直近2週最低18件（10月19日資料）',
'機雷事件の経緯・責任は独立未確認。攻撃件数と通航数は別です。フーシ派のサウジ攻撃主張も未検証で、完全閉鎖や燃油料上昇を断定しません。',
'09:42為替は参考値で公式公示・月間換算基準ではありません。09:22原油は取引中値。WTI12月物は前日97.82と比較し、満期11月物101.79と混同しません。',
'10月19日Jet 170.16 USD/bblはCommodityScope日次参考評価で、Platts原資料や12月算定平均ではありません。'],
zh:['12月：上行风险与因素混杂／暂缓判断、可信度低',
'Vitol：约80艘VLCC穿梭运输·美国至亚洲约40 USD/bbl（10月20日报道）',
'这是特定航线每桶运费参考案例，并非每日租金。小型船和长期租船可部分缓冲供应风险，但不代表运输恢复正常。',
'伊朗海军：触雷起火说法未核实·Kpler：最近两周至少18起（10月19日资料）',
'触雷过程及责任未独立确认，袭击数与通航量不同。胡塞对沙特袭击说法也未核实，不断言完全封锁或附加费必涨。',
'09:42汇率仅为参考值，并非官方定盘或月度换算依据。09:22原油为盘中价。WTI12月合约应与前日97.82比较，不与到期11月合约101.79混用。',
'10月19日Jet 170.16 USD/bbl为CommodityScope每日参考评估，不是Platts原始数据或12月计算均价。'],
fr:['Décembre : risques haussiers et facteurs mixtes / jugement réservé, confiance faible',
'Vitol : environ 80 VLCC en navette · US–Asie proche de 40 USD/bbl (rapport du 20 octobre)',
'Exemple de fret par baril sur une route précise, pas un loyer journalier. Petits navires et affrètements longs peuvent amortir le risque sans prouver une normalisation.',
'Marine iranienne : mine/incendie revendiqués, non vérifiés · Kpler : au moins 18 attaques en deux semaines (note du 19 octobre)',
'Circonstances et responsabilité de la mine non établies indépendamment. Attaques et passages sont distincts. Revendications houthies non vérifiées ; ni fermeture totale ni hausse des surtaxes garanties.',
'Change 09:42 indicatif, ni fixing officiel ni taux mensuel. Brut 09:22 en séance. Comparer le WTI décembre à sa clôture précédente 97.82, pas au novembre expiré à 101.79.',
'Jet du 19 octobre à 170.16 USD/bbl : évaluation quotidienne CommodityScope, pas donnée primaire Platts ni moyenne de calcul décembre.'],
de:['Dezember: Aufwärtsrisiken und gemischte Faktoren / Urteil vorbehalten, geringe Verlässlichkeit',
'Vitol: rund 80 Shuttle-VLCC · US–Asien rund 40 USD/bbl (Bericht 20. Oktober)',
'Streckenspezifisches Frachtbeispiel je Barrel, keine Tagescharter. Kleinere Schiffe und Langzeitcharter können Risiken puffern, belegen aber keine Normalisierung.',
'Iranische Marine: Minen-/Brandbehauptung unbestätigt · Kpler: mindestens 18 Angriffe in zwei Wochen (Mitteilung 19. Oktober)',
'Minenhergang und Verantwortung nicht unabhängig bestätigt. Angriffe sind keine Durchfahrten. Auch Saudi-Angriffe bleiben Huthi-Behauptungen; keine belegte Vollsperrung oder garantierte Zuschlagserhöhung.',
'09:42-Wechselkurs indikativ, kein offizielles Fixing oder Monatskurs. 09:22-Rohöl intraday. Dezember-WTI mit vorherigem Schluss 97.82 vergleichen, nicht mit abgelaufenem November bei 101.79.',
'Jet am 19. Oktober 170.16 USD/bbl: tägliche CommodityScope-Referenz, keine Platts-Primärdaten oder Dezember-Berechnungsmittel.']
};
r.modified=stamp;r.asOf=asOf;
r.numbers=Object.assign({},r.numbers,window.AERO_MARKET_NUMBERS_20261021);
r.sources=[['Yonhap · November MOPS',urls[0]],['CommodityScope · daily indicative',urls[2]],['exchangerate.dev · 09:42 KST',urls[1]],['Reuters · intraday',urls[3]]];
Object.keys(copy).forEach(function(l){
  var c=copy[l],p=r.packs[l],oldRows=r.rows[l],b=brief[l];
  c.nov=p.faq[1].a;c.current=p.faq[0].a;
  var rows=[
    [oldRows[0][0],p.notice,c.dec],
    [oldRows[1][0],'2026-09-16~10-15: 173.89 USD/bbl · 414.03 cents/gal | 2026-10-19: 170.16 USD/bbl',c.jet],
    [oldRows[2][0],'USD/KRW 1,323.65 (2026-10-21 09:42 KST) · Brent 109.64 / WTI 98.58 USD/bbl (2026-10-21 09:22 KST)',b[5]],
    [oldRows[3][0],b[1],b[2]],
    [oldRows[4][0],b[3],b[4]]
  ];
  r.rows[l]=rows;
  var answers=[c.current,c.nov,c.nov,c.jet,c.dec,c.fx,c.security,c.security];
  Object.assign(p,{desc:p.notice+' '+c.dec,sub:asOf+' · '+p.notice,newsSub:asOf+' · '+p.notice,
    intro:c.current+' '+c.nov+' '+c.dec,rows:rows,foot:c.jet+' '+c.fx,
    basisBody:c.nov+' '+c.dec,verdict1:c.dec,verdict2:b[6],verdictLong:c.diplomacy,
    keyVars:[p.notice,b[0],'Singapore Jet 170.16 USD/bbl (2026-10-19)','USD/KRW 1,323.65 (2026-10-21 09:42 KST)'],
    note:c.dec,officialNotice:asOf+' · '+p.notice,faq:c.questions.map(function(q,i){return {q:q,a:answers[i]};})});
});
var keys=['nov','fx','jet','oil','freight','security','redsea'];
var reports=['2026-10-16','2026-10-21','2026-10-19','2026-10-21','2026-10-20','2026-10-21','2026-10-20'];
var events=['2026-10-16','2026-10-21','2026-10-19','2026-10-21','2026-10-20','2026-10-20','2026-10-19'];
var sources=['Yonhap / official airline notices','exchangerate.dev','CommodityScope','Reuters / Investing.com','Reuters / MarketScreener','Reuters / MarketScreener','Reuters / MarketScreener'];
var extraRedsea='https://finance.yahoo.com/news/oil-eases-markets-assess-potential-005750414.html';
var dateLabels={ko:['보도·자료일','사건·관측일'],en:['Report/data date','Event/observation date'],ja:['報道・資料日','出来事・観測日'],zh:['报道／资料日期','事件／观测日期'],fr:['Date du rapport/de la donnée','Date de l’événement/observation'],de:['Berichts-/Datendatum','Ereignis-/Beobachtungsdatum']};
var cards=keys.map(function(key,i){
  var card={id:'market-20261021-'+(i+1),category:i===0?'airline':i>=5?'institution':'market',priority:i+1,
    date:'2026-10-21',publishedAt:stamp,updatedAt:stamp,reportedDate:reports[i],eventDate:events[i],
    badge:'NEW',aiSummary:true,relevanceScore:1-i/100,sourceUrl:urls[i],i18n:{}};
  Object.keys(copy).forEach(function(l){var c=copy[l],d=dateLabels[l];card.i18n[l]={title:c.heads[i],aiBrief:c.heads[i],summary:d[0]+': '+reports[i]+' · '+d[1]+': '+events[i]+'. '+c[key],impact:c.impact,sourceName:sources[i],tags:[i===0?'2026-11':'2026-10',i===0?'MOPS':i===1?'USD/KRW':i===2?'FOB Singapore':i===3?'Brent / WTI':i===4?'VLCC / Aframax':'Hormuz / Red Sea'],links:[],faq:[]};});
  card.i18n.cn=card.i18n.zh;return card;
});
// Additional primary reporting supports the separate Saudi claim and December-contract reference.
cards[6].relatedSourceUrls=[extraRedsea];
cards[3].relatedSourceUrls=['https://squawknews.com/news/525136-oil-futures-settle-lower-as-wti-november-falls-1-8'];
cards[1].relatedSourceUrls=['https://exchangerate.dev/api/chart-history?base=USD&symbol=KRW&interval=1m'];
cards.forEach(function(card){
  card.citationUrls=[card.sourceUrl].concat(card.relatedSourceUrls||[]);
  Object.keys(copy).forEach(function(l){card.i18n[l].sourceRefs=card.citationUrls.map(function(url,i){return {name:i===0?card.i18n[l].sourceName:card.id==='market-20261021-2'?'exchangerate.dev / 1m':card.id==='market-20261021-4'?'SquawkNews / WTI':'Reuters / Yahoo Finance',url:url};});});
});
r.newsCards=cards.concat(r.newsCards.filter(function(x){return !/^market-20261021-/.test(x.id);}));
window.AERO_MARKET_RELEASE=r;window.AERO_MARKET_NUMBERS_LATEST=r.numbers;
})();
