/* Dated additions; historical cards and official fare tables remain unchanged. */
(function(){
'use strict';
var r=window.AERO_MARKET_RELEASE;if(!r)return;
var stamp='2026-10-19T09:30:00+09:00',asOf='2026.10.19 09:30 KST';
var urls=[
'https://www.yna.co.kr/amp/view/AKR20261016068000003',
'https://www.bosoop.com/premarket/2026-10-19/',
'https://commodityscope.com/prices/singapore-jet-kerosene',
'https://commodityscope.com/prices/crude-oil',
'https://www.mpa.gov.sg/media-centre/details/two-singapore-registered-vessels-struck-in-strait-of-hormuz',
'https://www.reuters.com/world/middle-east/iran-urges-us-accept-proposal-reopen-strait-hormuz-2026-10-18/'
];
var copy={
ko:{title:'2026년 10월 국제선 유류할증료 23단계 | 11월 27단계·12월 전망',
status:'10월 23단계 적용 · 11월 27단계 확정 · 12월 산정 중',
current:'10월 발권분은 23단계 적용 중입니다. 확정 MOPS 평균은 158.57 USD/bbl·377.54 cents/gal이며 8월 16일~9월 15일 산정 기준입니다. 9월은 과거 기록으로 보존합니다.',
nov:'11월은 27단계로 확정됐습니다. 9월 16일~10월 15일 MOPS 평균은 173.89 USD/bbl·414.03 cents/gal로 10월보다 약 9.7% 높고 4단계 상승했습니다. 대한항공 11월 국제선 편도는 55,600~408,100원입니다. 확인된 5개사 공시 금액·통화·구간은 그대로 유지하며 다른 항공사 금액은 추정하지 않습니다.',
dec:'12월 산정기간은 2026년 10월 16일~11월 15일이며 아직 산정 중입니다. 평균과 단계·금액은 미확정입니다. 환율 완충과 항공유·운송 위험이 혼재해 방향성 판단은 유보하며, 특정 단계 예측의 신뢰도도 평가하지 않습니다.',
jet:'CommodityScope의 2026년 10월 16일 FOB Singapore Jet Kerosene 170.20 USD/bbl은 낮은 신뢰도로 표시된 일일 참고 평가값입니다. Platts 원자료나 11월 확정 평균·12월 산정기간 평균이 아닙니다. 기존 제공처의 시계열을 덮어쓰지 않습니다.',
fx:'USD/KRW는 10월 16일 서울 종가 1,331.4원과 10월 19일 07:36 KST BOSOOP 오전 참고시세 1,334.7원을 구분합니다. 후자는 09:30 공식 고시환율이나 월간 평균환율이 아니며 확정된 11월 요금에 재환산하지 않습니다.',
oil:'확인된 10월 16일 종가는 Brent 109.86·WTI 101.41 USD/bbl입니다. 10월 19일 장중 수치의 원문·시각은 이번 검증에서 확인되지 않아 추가하지 않았습니다. 종가와 장중값을 섞지 않으며 유가만으로 다음 달 유류할증료를 확정하지 않습니다.',
flow:'기준시각에 대응하는 최신 Kpler 걸프 원유 흐름과 주간 사고 건수는 집계기간·원문 확인이 부족해 수치를 추가하지 않았습니다. 과거 뉴스의 집계는 해당 날짜 기록으로 보존합니다. 공급 흐름과 선박 안전 위험은 별개이며 완전 폐쇄로 단정하지 않습니다.',
iran:'10월 18일 Reuters 보도에 따르면 이란 외무장관은 미국이 항만 봉쇄·석유 제재 해제와 역내 적대행위 종료 등 조건을 수용하면 6일 안에 호르무즈를 재개방할 수 있다는 제안이 유효하다고 주장했습니다. 이란 측 조건부 제안이며 미국의 수용이나 재개방 합의가 확인된 것은 아닙니다.',
labels:['월 적용 상태','Singapore Jet Fuel / MOPS','Global Jet / 환율 / 국제유가','Saudi 공급 / 중동 수출','Hormuz 안보 / LNG'],
indicator:'2026년 12월 유류할증료 전망 핵심 지표',verdict:'2026년 12월 전망 결론',basis:'11월 확정 기준과 12월 산정 구분',key:'주요 확인 항목',button:'12월 전망 보기 →',
heads:['11월 27단계 확정: MOPS 평균 173.89달러','환율: 10월 16일 종가와 19일 오전 참고시세 구분','Singapore Jet 170.20달러는 일일 참고 평가값','국제유가: 확인된 10월 16일 종가 유지','호르무즈 물량과 사고 통계는 집계기간 확인 필요','이란의 조건부 호르무즈 재개방 제안'],
questions:['10월 적용 단계는?','11월 확정 단계는?','11월 MOPS 평균과 산정기간은?','170.20달러는 월간 MOPS 평균인가요?','12월 유류할증료는 확정됐나요?','1,334.7원은 월간 환산 기준인가요?','호르무즈는 완전히 폐쇄됐나요?','이란의 제안은 합의된 재개방인가요?'],
impact:'확정된 월간 공시와 시장 참고자료를 구분합니다. 다음 달 요금은 공식 공시 전까지 확정하지 않습니다.'},
en:{title:'October 2026 International Surcharges Level 23 | November 27 and December Outlook',status:'October Level 23 applies · November Level 27 confirmed · December calculation ongoing',
current:'October ticketing remains at Level 23. Its confirmed MOPS average is 158.57 USD/bbl and 377.54 cents/gal for August 16–September 15. September remains archived.',
nov:'November is confirmed at Level 27. MOPS averaged 173.89 USD/bbl and 414.03 cents/gal over September 16–October 15, about 9.7% above October and four levels higher. Korean Air November international one-way fares are KRW 55,600–408,100. Preserve the five verified airline tables, currencies and bands; do not estimate other carriers.',
dec:'December calculation runs October 16–November 15, 2026 and is ongoing. Its average, level and amounts are not confirmed. Currency relief and jet-fuel/shipping risks are mixed, so direction is reserved; confidence in any specific level is not assessed.',
jet:'CommodityScope lists FOB Singapore Jet Kerosene at 170.20 USD/bbl on October 16, 2026 as a low-confidence daily indicative assessment. It is not Platts primary data, the confirmed November average or the December calculation average. Existing provider series remain separate.',
fx:'Separate the October 16 Seoul USD/KRW close of 1,331.4 from the October 19 07:36 KST BOSOOP morning reference of 1,334.7. The latter is neither a 09:30 official fixing nor a monthly average, and is not used to reconvert confirmed November fares.',
oil:'Verified October 16 settlements are Brent 109.86 and WTI 101.41 USD/bbl. The original October 19 intraday figures and timestamp could not be verified, so they are not added. Settlement and intraday prices are separate; crude alone does not determine next month’s surcharge.',
flow:'The latest Kpler Gulf crude-flow figure and weekly incident count could not be matched to a verified reporting window before the cutoff, so no new totals are asserted. Historical news retains its own dates. Supply flows and vessel safety are distinct; complete closure is not established.',
iran:'Reuters reported on October 18 that Iran’s foreign minister said its proposal remained valid: Hormuz could reopen within six days if the US accepted conditions including lifting the port blockade and oil sanctions and ending regional hostilities. This is Iran’s conditional proposal, not confirmed US acceptance or an agreed reopening.',
labels:['Monthly application status','Singapore Jet Fuel / MOPS','Global Jet / FX / crude oil','Saudi supply / Middle East exports','Hormuz security / LNG'],indicator:'December 2026 surcharge outlook indicators',verdict:'December 2026 outlook conclusion',basis:'November confirmation versus December calculation',key:'Key checks',button:'December outlook →',
heads:['November Level 27 confirmed: MOPS average USD 173.89','FX: October 16 close versus October 19 morning reference','Singapore Jet USD 170.20 is a daily indicative assessment','Crude oil: retain verified October 16 settlements','Hormuz flow and incident totals require matching reporting windows','Iran’s conditional proposal to reopen Hormuz'],
questions:['Which level applies in October?','Which level is confirmed for November?','What is the November MOPS average and period?','Is USD 170.20 a monthly MOPS average?','Is December confirmed?','Is 1,334.7 the monthly conversion rate?','Is Hormuz completely closed?','Is Iran’s proposal an agreed reopening?'],impact:'Distinguish confirmed monthly notices from market references. Do not confirm next month’s fares before official publication.'},
ja:{title:'2026年10月国際線燃油23段階 | 11月27段階・12月見通し',status:'10月23段階適用中・11月27段階確定・12月算定中',
current:'10月発券分は23段階です。8月16日～9月15日の確定MOPS平均は158.57 USD/bbl・377.54 cents/gal。9月は過去の記録として保存します。',
nov:'11月は27段階に確定。9月16日～10月15日のMOPS平均は173.89 USD/bbl・414.03 cents/galで、10月比約9.7％、4段階上昇。大韓航空の11月国際線片道は55,600～408,100 KRWです。確認済み5社の金額・通貨・区間を維持し、他社は推定しません。',
dec:'12月算定期間は2026年10月16日～11月15日で進行中です。平均・段階・金額は未確定。為替の緩衝と航空燃料・輸送リスクが混在するため方向判断を保留し、特定段階の予測信頼度も評価しません。',
jet:'CommodityScopeの2026年10月16日FOB Singapore Jet Kerosene 170.20 USD/bblは、信頼度「低」の日次参考評価値です。Platts原資料、11月確定平均、12月算定平均ではありません。既存提供元の系列は別に保存します。',
fx:'USD/KRWは10月16日ソウル終値1,331.4と10月19日07:36 KSTのBOSOOP朝の参考値1,334.7を区別します。後者は09:30公式公示や月間平均ではなく、確定済み11月料金の再換算には使いません。',
oil:'確認済み10月16日終値はBrent 109.86・WTI 101.41 USD/bbl。10月19日取引中値の原文と時刻は確認できず追加しません。終値と取引中値を区別し、原油だけで翌月料金を確定しません。',
flow:'最新Kpler湾岸原油流量と週間事故件数は、基準時刻に対応する集計期間・原文の確認が不足しており追加しません。過去記事の集計は当時の記録として保存。供給流量と船舶安全は別で、完全閉鎖とは断定しません。',
iran:'10月18日のReutersによると、イラン外相は米国が港湾封鎖・石油制裁の解除と地域の敵対行為終了などを受け入れれば6日以内にホルムズを再開できるとの提案は有効だと主張しました。イラン側の条件付き提案で、米国の受諾や再開合意の確認ではありません。',
labels:['月別適用状況','Singapore Jet Fuel / MOPS','Global Jet / 為替 / 原油','Saudi供給 / 中東輸出','Hormuz安全保障 / LNG'],indicator:'2026年12月燃油見通し主要指標',verdict:'2026年12月見通し結論',basis:'11月確定と12月算定の区別',key:'主要確認項目',button:'12月見通し →',
heads:['11月27段階確定：MOPS平均173.89ドル','為替：10月16日終値と19日朝の参考値','Singapore Jet 170.20ドルは日次参考評価','原油：確認済み10月16日終値を維持','ホルムズ流量・事故件数は集計期間の確認が必要','イランの条件付きホルムズ再開提案'],questions:['10月の適用段階は？','11月の確定段階は？','11月MOPS平均と期間は？','170.20ドルは月間平均？','12月は確定済み？','1,334.7は月間換算為替？','ホルムズは完全閉鎖？','イラン提案は再開合意？'],impact:'確定月間公示と市場参考情報を区別します。翌月料金は公式発表まで確定しません。'},
zh:{title:'2026年10月国际线燃油第23档 | 11月第27档与12月展望',status:'10月第23档执行中·11月第27档已确认·12月计算中',
current:'10月出票适用第23档。8月16日至9月15日确定MOPS均价为158.57 USD/bbl及377.54 cents/gal。9月保留为历史记录。',
nov:'11月已确定为第27档。9月16日至10月15日MOPS均价173.89 USD/bbl及414.03 cents/gal，比10月高约9.7%，上升4档。大韩航空11月国际线单程55,600至408,100 KRW。保留5家已核实航司的金额、币种和区间，不推测其他航司。',
dec:'12月计算期为2026年10月16日至11月15日，目前仍在进行，均价、档位及金额尚未确定。汇率缓冲与航油、运输风险并存，暂缓方向判断，也不评估特定档位预测的可信度。',
jet:'CommodityScope的2026年10月16日FOB Singapore Jet Kerosene 170.20 USD/bbl是标注低可信度的每日参考评估值，并非Platts原始数据、11月确定均价或12月计算期均价。保留不同供应商的独立序列。',
fx:'区分10月16日首尔USD/KRW收盘1,331.4与10月19日07:36 KST BOSOOP早间参考1,334.7。后者并非09:30官方定盘价或月均汇率，不用于重新换算已确定的11月收费。',
oil:'已核实10月16日结算价为Brent 109.86、WTI 101.41 USD/bbl。10月19日盘中数据原文与时点未获核实，故不新增。区分结算与盘中价格，不凭原油单一因素确定下月附加费。',
flow:'最新Kpler海湾原油流量及每周事故总数的统计窗口与原文尚未充分核实，因此不新增数字。历史新闻保留当时日期。供应流量与船舶安全风险应分别描述，不能断言完全封锁。',
iran:'Reuters于10月18日报道，伊朗外长称，若美国接受解除港口封锁、石油制裁及结束地区敌对行动等条件，可在六天内重开霍尔木兹的提案仍有效。这是伊朗方面的附条件提议，并非美国已接受或双方已达成重开协议。',
labels:['月度执行状态','Singapore Jet Fuel / MOPS','Global Jet / 汇率 / 原油','Saudi供应 / 中东出口','Hormuz安全 / LNG'],indicator:'2026年12月燃油附加费展望核心指标',verdict:'2026年12月展望结论',basis:'区分11月确定基准与12月计算',key:'核心确认项',button:'查看12月展望 →',heads:['11月第27档确定：MOPS均价173.89美元','汇率：10月16日收盘与19日早间参考','Singapore Jet 170.20美元为每日参考评估','原油：保留已核实10月16日结算价','霍尔木兹流量与事故统计需核对时间窗口','伊朗附条件重开霍尔木兹的提议'],questions:['10月执行哪一档？','11月确定哪一档？','11月MOPS均价和计算期？','170.20美元是月均价吗？','12月已确定吗？','1,334.7是月度换算汇率吗？','霍尔木兹完全封锁了吗？','伊朗提议等于重开协议吗？'],impact:'区分确定的月度公告与市场参考资料。官方公告前不确定下月费用。'},
fr:{title:'Surtaxes internationales octobre 2026 niveau 23 | Novembre 27 et perspectives décembre',status:'Octobre niveau 23 en vigueur · novembre niveau 27 confirmé · décembre en calcul',
current:'Les émissions d’octobre restent au niveau 23. Moyenne MOPS confirmée : 158.57 USD/bbl et 377.54 cents/gal, période du 16 août au 15 septembre. Septembre reste archivé.',
nov:'Novembre est confirmé au niveau 27. Moyenne MOPS du 16 septembre au 15 octobre : 173.89 USD/bbl et 414.03 cents/gal, soit environ +9.7% et quatre niveaux au-dessus d’octobre. Korean Air : 55,600–408,100 KRW l’aller international en novembre. Les cinq tableaux vérifiés, devises et tranches sont conservés ; aucune estimation pour les autres compagnies.',
dec:'Le calcul de décembre couvre le 16 octobre–15 novembre 2026 et reste en cours. Moyenne, niveau et montants non confirmés. L’allègement du change et les risques kérosène/transport se compensent partiellement : jugement directionnel réservé, sans évaluation de confiance pour un niveau précis.',
jet:'CommodityScope indique 170.20 USD/bbl pour FOB Singapore Jet Kerosene le 16 octobre 2026 : évaluation indicative quotidienne de faible confiance. Ce n’est ni une donnée primaire Platts, ni la moyenne confirmée novembre, ni la moyenne de calcul décembre. Les séries des autres fournisseurs restent séparées.',
fx:'Distinguer la clôture USD/KRW à Séoul du 16 octobre, 1,331.4, de la référence matinale BOSOOP du 19 octobre à 07:36 KST, 1,334.7. Cette dernière n’est ni un fixing officiel à 09:30 ni une moyenne mensuelle et ne reconvertit pas les tarifs novembre déjà confirmés.',
oil:'Clôtures vérifiées du 16 octobre : Brent 109.86 et WTI 101.41 USD/bbl. Les chiffres intrajournaliers du 19 octobre et leur heure n’ont pas été vérifiés et ne sont pas ajoutés. Ne pas confondre clôture et séance, ni déduire la surtaxe du seul brut.',
flow:'La dernière mesure Kpler des flux de brut du Golfe et le total hebdomadaire d’incidents ne sont pas suffisamment vérifiés pour une période compatible avec la date limite ; aucun nouveau total n’est affirmé. Les archives gardent leurs dates. Flux et sécurité des navires sont distincts ; fermeture complète non établie.',
iran:'Selon Reuters le 18 octobre, le ministre iranien a déclaré toujours valable sa proposition de réouverture d’Ormuz sous six jours si Washington accepte notamment la levée du blocus portuaire et des sanctions pétrolières et la fin des hostilités régionales. Il s’agit d’une proposition iranienne conditionnelle, sans acceptation américaine ni accord de réouverture confirmé.',
labels:['Application mensuelle','Singapore Jet Fuel / MOPS','Global Jet / change / brut','Offre saoudienne / exportations régionales','Sécurité Ormuz / GNL'],indicator:'Indicateurs des perspectives décembre 2026',verdict:'Conclusion décembre 2026',basis:'Novembre confirmé et calcul décembre',key:'Points clés',button:'Perspectives décembre →',heads:['Novembre niveau 27 confirmé : MOPS moyen 173.89 USD','Change : clôture du 16 et référence matinale du 19 octobre','Singapore Jet 170.20 USD : évaluation quotidienne indicative','Brut : conserver les clôtures vérifiées du 16 octobre','Ormuz : vérifier les périodes des flux et incidents','Proposition iranienne conditionnelle de réouverture d’Ormuz'],questions:['Quel niveau en octobre ?','Quel niveau confirmé en novembre ?','Quelle moyenne MOPS et période novembre ?','170.20 USD est-il une moyenne mensuelle ?','Décembre est-il confirmé ?','1,334.7 est-il le taux mensuel de conversion ?','Ormuz est-il complètement fermé ?','La proposition iranienne constitue-t-elle un accord ?'],impact:'Distinguer les avis mensuels confirmés des références de marché. Aucun tarif du mois suivant confirmé avant publication officielle.'},
de:{title:'Internationale Zuschläge Oktober 2026 Stufe 23 | November 27 und Dezember-Ausblick',status:'Oktober Stufe 23 gilt · November Stufe 27 bestätigt · Dezember in Berechnung',
current:'Für Oktober-Ausstellungen gilt Stufe 23. Bestätigtes MOPS-Mittel: 158.57 USD/bbl und 377.54 cents/gal, Zeitraum 16. August–15. September. September bleibt archiviert.',
nov:'November ist mit Stufe 27 bestätigt. MOPS-Mittel vom 16. September bis 15. Oktober: 173.89 USD/bbl und 414.03 cents/gal, rund 9.7% und vier Stufen über Oktober. Korean Air international einfach im November: 55,600–408,100 KRW. Die fünf geprüften Tabellen, Währungen und Bänder bleiben unverändert; andere Airlines werden nicht geschätzt.',
dec:'Der Dezember-Zeitraum läuft vom 16. Oktober bis 15. November 2026 und ist noch nicht abgeschlossen. Mittel, Stufe und Beträge sind unbestätigt. Wechselkursentlastung und Kerosin-/Transportrisiken sind gemischt; Richtungsurteil vorbehalten, keine Bewertung der Verlässlichkeit einer bestimmten Stufenprognose.',
jet:'CommodityScope nennt für FOB Singapore Jet Kerosene am 16. Oktober 2026 170.20 USD/bbl als tägliche indikative Bewertung mit geringer Verlässlichkeit. Kein Platts-Primärwert, bestätigtes November-Mittel oder Dezember-Berechnungsmittel. Bestehende Anbieterreihen bleiben getrennt.',
fx:'USD/KRW-Schluss Seoul am 16. Oktober: 1,331.4; BOSOOP-Morgenreferenz am 19. Oktober um 07:36 KST: 1,334.7. Letztere ist weder offizielles 09:30-Fixing noch Monatsmittel und wird nicht zur Neuberechnung bestätigter November-Tarife verwendet.',
oil:'Geprüfte Schlusskurse vom 16. Oktober: Brent 109.86 und WTI 101.41 USD/bbl. Originalwerte und Zeitpunkt des Intraday-Handels am 19. Oktober konnten nicht bestätigt werden und werden nicht ergänzt. Schluss- und Intraday-Werte trennen; Rohöl allein bestimmt keinen Folgemonatszuschlag.',
flow:'Neuester Kpler-Golfrohölfluss und wöchentliche Vorfallzahl sind keinem ausreichend verifizierten Berichtszeitraum vor dem Stichtag zugeordnet; daher keine neuen Summen. Historische Meldungen behalten ihre Daten. Lieferfluss und Schiffssicherheit sind getrennt; vollständige Sperrung nicht belegt.',
iran:'Reuters berichtete am 18. Oktober, Irans Außenminister halte den Vorschlag aufrecht: Hormus könne innerhalb von sechs Tagen öffnen, falls die USA unter anderem Hafenblockade und Ölsanktionen aufheben und regionale Kampfhandlungen enden. Dies ist Irans bedingter Vorschlag, keine bestätigte US-Zustimmung oder vereinbarte Öffnung.',
labels:['Monatlicher Anwendungsstatus','Singapore Jet Fuel / MOPS','Global Jet / Wechselkurs / Rohöl','Saudi-Angebot / Nahostexporte','Hormus-Sicherheit / LNG'],indicator:'Indikatoren zum Dezember-Ausblick 2026',verdict:'Fazit Dezember 2026',basis:'November bestätigt, Dezember in Berechnung',key:'Prüfpunkte',button:'Dezember-Ausblick →',heads:['November Stufe 27 bestätigt: MOPS-Mittel 173.89 USD','Wechselkurs: Schluss 16. Oktober und Morgenreferenz 19. Oktober','Singapore Jet 170.20 USD ist eine tägliche indikative Bewertung','Rohöl: geprüfte Schlusskurse vom 16. Oktober beibehalten','Hormus: Berichtszeiträume für Flüsse und Vorfälle prüfen','Irans bedingter Vorschlag zur Öffnung von Hormus'],questions:['Welche Stufe gilt im Oktober?','Welche Stufe ist für November bestätigt?','November-MOPS-Mittel und Zeitraum?','Sind 170.20 USD ein Monatsmittel?','Ist Dezember bestätigt?','Sind 1,334.7 der monatliche Umrechnungskurs?','Ist Hormus vollständig gesperrt?','Ist Irans Vorschlag eine vereinbarte Öffnung?'],impact:'Bestätigte Monatsmitteilungen von Marktreferenzen trennen. Folgemonatstarife erst nach offizieller Veröffentlichung bestätigen.'}
};
r.modified=stamp;r.asOf=asOf;
r.numbers=Object.assign({},r.numbers,window.AERO_MARKET_NUMBERS_20261019);
r.sources=[['Yonhap · November MOPS',urls[0]],['CommodityScope · daily indicative',urls[2]],['BOSOOP · morning reference',urls[1]]];
var qualifications={
ko:['방향성 신뢰도: 낮음. 특정 단계: 판단 보류.','기준시각까지 검증된 신규 Saudi 공급·중동 수출 수치 없음. 과거 수치는 해당 날짜 뉴스에 보존합니다.'],
en:['Direction confidence: low. Specific level: judgment reserved.','No verified new Saudi supply or Middle East export figure before the cutoff. Historical figures remain in dated news.'],
ja:['方向性の信頼度：低。特定段階：判断保留。','基準時刻までに確認できた新たなSaudi供給・中東輸出の数値はありません。過去値は当時の記事に保存します。'],
zh:['方向判断可信度：低。特定档位：暂缓判断。','截至基准时点，未核实新增Saudi供应或中东出口数字。历史数据保留在原日期新闻中。'],
fr:['Confiance directionnelle : faible. Niveau précis : jugement réservé.','Aucun nouveau chiffre vérifié sur l’offre saoudienne ou les exportations régionales avant la date limite. Les archives conservent les anciens chiffres.'],
de:['Richtungsverlässlichkeit: gering. Bestimmte Stufe: Urteil vorbehalten.','Keine neuen verifizierten Zahlen zu Saudi-Angebot oder Nahostexporten vor dem Stichtag. Historische Zahlen bleiben in datierten Meldungen.']
};
var surface={
ko:['12월 전망에서의 의미','항공사별 공식 공시','11월 확정과 12월 전망 뉴스','12월 유류할증료 전망','공식 공시 확인 후 실제 항공권 총액 비교하기','10월 적용·11월 확정 유류할증료를 노선별로 확인하세요','10월 vs 11월 공식 공시 비교'],
en:['Meaning for December','Official airline notices','November confirmed and December outlook news','December surcharge outlook','Compare total fares after checking official notices','Check October applicable and November confirmed charges by route','October vs November official notices'],
ja:['12月見通しへの意味','航空会社公式公示','11月確定と12月見通しニュース','12月燃油見通し','公式公示を確認して航空券総額を比較','10月適用・11月確定料金を路線別に確認','10月と11月の公式公示比較'],
zh:['对12月展望的意义','航司官方公告','11月确定与12月展望新闻','12月燃油附加费展望','核对官方公告后比较机票总价','按航线查询10月执行与11月确定收费','10月与11月官方公告对比'],
fr:['Sens pour décembre','Avis officiels des compagnies','Novembre confirmé et perspectives décembre','Perspectives des surtaxes décembre','Comparer le prix total après vérification des avis officiels','Consulter par ligne octobre en vigueur et novembre confirmé','Avis officiels octobre contre novembre'],
de:['Bedeutung für Dezember','Offizielle Airline-Mitteilungen','November bestätigt und Dezember-Ausblick','Dezember-Zuschlagsausblick','Gesamtpreise nach Prüfung offizieller Mitteilungen vergleichen','Oktober gültig und November bestätigt je Strecke prüfen','Offizielle Mitteilungen Oktober gegen November']
};
Object.keys(copy).forEach(function(l){
var c=copy[l],p=r.packs[l];
c.dec+=' '+qualifications[l][0];
var s=surface[l];p.th=p.th.slice();p.th[2]=s[0];
p.ui=p.ui.slice();p.ui[3]=s[1];p.ui[5]=s[2];p.ui[7]=s[3];
p.surface={'fore.basis.title':c.basis,'fore.myrealtrip.title':s[4],'fore.cta.desc':s[5],'fore.cta.may':s[6],'news.basisTitle':c.basis};
var rows=[
[c.labels[0],c.status,c.dec],
[c.labels[1],'2026-09-16~10-15: 173.89 USD/bbl · 414.03 cents/gal | 2026-10-16: 170.20 USD/bbl',c.jet],
[c.labels[2],'USD/KRW 1,331.4 (2026-10-16) / 1,334.7 (2026-10-19 07:36 KST) · Brent 109.86 / WTI 101.41 USD/bbl (2026-10-16)',c.fx+' '+c.oil],
[c.labels[3],qualifications[l][1],c.dec],
[c.labels[4],c.iran,c.flow]
];
var answers=[c.current,c.nov,c.nov,c.jet,c.dec,c.fx,c.flow,c.iran];
r.rows[l]=rows;
Object.assign(p,{title:c.title,meta:c.title,newsTitle:c.title,newsMeta:c.title,desc:c.status+' '+c.dec,
sub:asOf+' · '+c.status,newsSub:asOf+' · '+c.status,notice:c.status,intro:c.current+' '+c.nov+' '+c.dec,
indicator:c.indicator,rows:rows,foot:c.jet+' '+c.fx,basisTitle:c.basis,basisBody:c.nov+' '+c.dec,
verdictTitle:c.verdict,verdict1:c.dec,verdict2:c.jet,verdictLong:c.iran,
keyTitle:c.key,keyVars:[c.status,c.dec,'Singapore Jet 170.20 USD/bbl (2026-10-16)','USD/KRW 1,334.7 (2026-10-19 07:36 KST)'],
note:c.dec,officialNotice:asOf+' · '+c.status,forecastBtn:c.button,factorClasses:['','','','',''],
faq:c.questions.map(function(q,i){return {q:q,a:answers[i]};})});
});
var mpa={
ko:'MPA의 10월 14일 발표에서 GFS Pride는 13일, GFS Giselle은 14일 미상 발사체에 맞은 것으로 보고됐으며 승무원은 모두 안전합니다. 공격 주체는 특정되지 않았습니다.',
en:'MPA reported on October 14 that GFS Pride was struck by an unknown projectile on October 13 and GFS Giselle on October 14; all crew were safe. The attacker was not identified.',
ja:'MPAは10月14日、GFS Prideが13日、GFS Giselleが14日に不明の飛翔体を受け、乗組員は全員無事と発表。攻撃主体は特定していません。',
zh:'MPA于10月14日通报，GFS Pride于13日、GFS Giselle于14日遭不明发射物击中，船员均安全，未确认袭击方。',
fr:'Le 14 octobre, MPA a signalé que GFS Pride avait été touché le 13 et GFS Giselle le 14 par des projectiles inconnus ; tous les équipages étaient sains et saufs. Auteur non identifié.',
de:'MPA meldete am 14. Oktober unbekannte Geschosse gegen GFS Pride am 13. und GFS Giselle am 14.; alle Besatzungsmitglieder waren sicher. Der Angreifer wurde nicht identifiziert.'
};
var names=['Yonhap','BOSOOP / ChosunBiz','CommodityScope','CommodityScope / Newsquawk','MPA Singapore','Reuters'];
var reports=['2026-10-16','2026-10-19','2026-10-16','2026-10-16','2026-10-14','2026-10-18'];
var keys=['nov','fx','jet','oil','flow','iran'];
var cards=keys.map(function(key,i){
var card={id:'market-20261019-'+(i+1),category:i===0?'airline':i===4?'institution':'market',priority:i+1,
date:'2026-10-19',publishedAt:stamp,updatedAt:stamp,reportedDate:reports[i],eventDate:reports[i],
badge:'NEW',aiSummary:true,relevanceScore:1-i/100,sourceUrl:urls[i],i18n:{}};
Object.keys(copy).forEach(function(l){var c=copy[l];card.i18n[l]={title:c.heads[i],aiBrief:c.heads[i],summary:(key==='flow'?mpa[l]+' ': '')+c[key],impact:c.impact,sourceName:names[i],tags:i===0?['2026-11','MOPS']:['2026-10'],links:[],faq:[]};});
card.i18n.cn=card.i18n.zh;return card;
});
r.newsCards=cards.concat(r.newsCards.filter(function(x){return !/^market-20261019-/.test(x.id);}));
window.AERO_MARKET_RELEASE=r;window.AERO_MARKET_NUMBERS_20261019=r.numbers;window.AERO_MARKET_NUMBERS_LATEST=r.numbers;
})();
