/* October 16 release: preserve official fares, archives and the five-row layout. */
(function(){
'use strict';
var r=window.AERO_MARKET_RELEASE;if(!r)return;
var stamp='2026-10-16T08:00:00+09:00',asOf='2026.10.16 08:00 KST';
var copy={
ko:{
title:'2026년 10월 국제선 유류할증료 23단계 | 11월 공시 대기',
status:'10월 23단계 적용 · 11월 산정기간 종료·공식 평균 및 항공사 공시 확인 대기',
fact:'10월 발권분은 공식 공시 기준 23단계 적용 중입니다. MOPS 확정 평균은 158.57 USD/bbl·377.54 cents/gal입니다. 대한항공 국제선 편도 49,000~362,600원, 아시아나 53,400~301,200원이며 다른 항공사의 공시 통화·구간·기준도 유지합니다.',
pending:'11월 산정기간 2026-09-16~10-15는 종료됐습니다. 기준시각에 확인 가능한 자료에서 공식 MOPS 평균과 한국 출발 국제선 항공사 공시는 미확인입니다. 기간 종료와 평균 공개·공시는 별개이며 단계·금액은 판단을 보류합니다.',
jet:'CommodityScope의 2026-10-14 FOB Singapore Jet Kerosene 179.42 USD/bbl은 별도 제공처의 일일 참고가격이며 Platts 원자료나 11월 MOPS 평균이 아닙니다. 10/15 유효값은 미확인이고 가격표의 0.00은 실제 가격으로 반영하지 않습니다. 기존 Sparta·Chợ Giá 자료는 각 날짜의 별도 기록으로 보존합니다.',
fx:'2026-10-15 15:30 KST 서울외국환중개 매매기준율은 1,344.60 KRW/USD입니다. 11월 산정기간 평균환율은 미확인으로, 원화 부과액 방향이나 환율 완충의 크기는 확정하지 않습니다.',
risk:'일일 항공유와 국제유가는 상방 압력 요인일 수 있으나 공식 평균과 공시 전에는 11월 단계·원화 금액을 확정하지 않습니다. 해상 안전 위험과 실제 통항·보험 비용은 구분하며 최신 통항·운임·보험료 자료는 미확인입니다. 해협 완전 폐쇄로 단정하지 않습니다.',
history:'Saudi·중국·인도·G7·물류의 이전 수치는 과거 날짜의 뉴스에 보존합니다. 최신 동일 기준의 공급·실제 비축유 방출·운임·보험 수치는 확인하지 못해 현재 전망의 수치 근거로 재사용하지 않습니다.',
historyValue:'과거 공급·정제품 자료: 아카이브 참고 · 최신 수치 미확인',
shipValue:'MPA 10/14: GFS Pride(10/13) 침몰·21명 대피 / GFS Giselle(10/14) 안전 정박·22명 안전',
foot:'10월 158.57 USD/bbl·377.54 cents/gal은 확정 산정평균입니다. CommodityScope 10/14 179.42는 일일 참고값이고 IATA 190.18은 별도 글로벌 주간값입니다. 11월 평균은 미확인입니다.',
q:['현재 10월 국제선 유류할증료는 몇 단계인가요?','11월 국제선 유류할증료가 발표됐나요?','11월 산정기간은 끝났나요?','179.42달러는 11월 MOPS 평균인가요?','1,344.60원이 11월 적용 평균환율인가요?','호르무즈에서 어떤 선박이 공격받았나요?','공격 주체가 확인됐나요?'],
attribution:'MPA는 미상 발사체로 발표했습니다. 이 자료만으로 국가나 단체를 특정하지 않습니다.',
cards:[
['호르무즈서 싱가포르 선박 2척 피격…GFS Pride 침몰','MPA의 10월 14일 공식 발표에 따르면 GFS Pride는 10월 13일, GFS Giselle은 14일 미상 발사체에 맞은 것으로 보고됐습니다. Pride는 손상·화재 후 침몰했지만 승무원 21명 모두 대피했습니다. Giselle은 선체 손상 후 자력으로 안전한 정박지에 도착했고 22명 모두 안전합니다. 두 선박 모두 부상자는 보고되지 않았으며 공격 주체는 특정되지 않았습니다.','선박 안전과 공급·운송 차질 위험을 높이는 사건입니다. 실제 통항량이나 유류할증료 인상을 확정하는 자료는 아닙니다.'],
['Cape Dao 침몰 후속 보도…9월 23일 공격과 구분','Reuters의 10월 14일 후속 보도는 IMO 자료를 인용해 Cape Dao 침몰을 전합니다. 이는 9월 23일 공격 피해와 관련된 별도 사건이며 당시 선원 1명 사망이 보도됐습니다. GFS Pride·GFS Giselle의 10월 사건이나 10월 15일 신규 공격으로 합쳐 집계하지 않습니다.','공격일과 침몰 보도일을 구분합니다. 과거 피해의 후속 보도를 당일 공격 증가로 해석하지 않습니다.'],
['Brent 105.92·WTI 97.97달러…10월 15일 종가 혼조','10월 15일 Brent는 0.14달러(-0.13%) 내린 105.92 USD/bbl, WTI는 2.88달러(+3.03%) 오른 97.97 USD/bbl에 마감했습니다. Reuters 배포본과 마감 자료를 대조했습니다. 미국 원유재고 감소가 WTI를 지지했으며 Brent와 방향이 달랐습니다. 종가와 장중 가격을 혼합하지 않습니다.','원유 결제가격은 항공유나 MOPS 평균이 아닙니다. 11월 단계·금액을 이 종가로 계산하지 않습니다.'],
['원·달러 1,344.60원…10월 15일 서울 15:30 기준','연합뉴스의 10월 15일 외국환 시세 표는 미국 달러의 서울 15:30 기준 1,344.60 KRW/USD를 명시합니다. 자료 제공은 서울외국환중개·연합인포맥스입니다. 다른 산출 방식의 시장 종가를 동일 기준으로 합치지 않으며 11월 산정기간 평균환율로 사용하지 않습니다.','기존 항공사 공식 금액과 사이트 환산 설정은 변경하지 않습니다. 실제 원화 부과액은 공식 공시로 확인해야 합니다.'],
['Singapore Jet Kerosene 10월 14일 179.42 USD/bbl','CommodityScope 공개 가격표의 FOB Singapore Jet Kerosene은 10월 14일 179.42 USD/bbl입니다. 일일 참고가격이며 Platts 원자료 또는 11월 산정기간 평균 MOPS로 간주하지 않습니다. 10월 15일 유효값은 확인하지 못했고 별도 표의 0.00은 누락·미수신 가능 값으로 가격과 그래프에서 제외합니다.','일일 가격과 10월 확정 평균의 비교만 가능합니다. 11월 평균·단계를 임의 생성하지 않습니다.']
]},
en:{
title:'October 2026 International Fuel Surcharge Level 23 | November Notices Pending',
status:'October Level 23 applies · November period ended; official average and airline notices pending verification',
fact:'October ticketing follows official Level 23 notices. Confirmed MOPS average: USD 158.57/bbl, 377.54 cents/gal. Korean Air international one-way KRW 49,000–362,600; Asiana KRW 53,400–301,200. Other notice currencies, bands and rules are unchanged.',
pending:'The November calculation period, September 16–October 15, has ended. Official MOPS average and Korea-departure international airline notices were not confirmed in accessible material at the cutoff. Period end is not publication; no November level or amount is assigned.',
jet:'CommodityScope FOB Singapore Jet Kerosene, October 14: USD 179.42/bbl, a separate-provider daily reference, not Platts raw data or November MOPS average. October 15 valid data is unconfirmed; a 0.00 entry is not treated as a price. Sparta and Cho Gia remain separate dated records.',
fx:'Seoul Money Brokerage daily reference at October 15, 15:30 KST: KRW 1,344.60/USD. November period-average FX is unconfirmed, so neither the KRW charge direction nor the size of any FX buffer is established.',
risk:'Daily jet fuel and crude may imply upward pressure, not a confirmed November level or KRW charge. Shipping safety differs from traffic and insurance costs; current traffic, freight and insurance figures are unconfirmed. This does not establish a complete closure.',
history:'Earlier Saudi, China, India, G7 and logistics figures remain in dated archives. Comparable current supply, actual reserve delivery, freight and insurance data were not confirmed and are not reused as current numerical inputs.',
historyValue:'Historical supply/product reports: archive only · current figures unconfirmed',
shipValue:'MPA Oct 14: GFS Pride (Oct 13), sunk, 21 evacuated / GFS Giselle (Oct 14), safe anchorage, 22 safe',
foot:'October 158.57 USD/bbl and 377.54 cents/gal are confirmed calculation averages. CommodityScope October 14 179.42 is daily; IATA 190.18 is a separate global weekly figure. November average remains unconfirmed.',
q:['What is the current October international level?','Have November international notices been confirmed?','Has the November calculation period ended?','Is USD 179.42 the November MOPS average?','Is KRW 1,344.60 the November average FX?','Which ships were struck in Hormuz?','Has responsibility been established?'],
attribution:'MPA describes unknown projectiles. Its statement does not identify a responsible country or group.',
cards:[
['Two Singapore ships struck in Hormuz; GFS Pride sinks','MPA stated on October 14 that GFS Pride and GFS Giselle were reportedly struck by unknown projectiles on October 13 and 14 respectively. Pride sank after damage and fire; all 21 crew evacuated. Giselle reached safe anchorage under its own power after hull damage, with all 22 crew safe. No injuries were reported on either vessel; MPA did not identify an attacker.','This raises shipping safety and supply-disruption risk, not proof of a specific traffic volume or inevitable surcharge increase.'],
['Cape Dao sinking: follow-up to the September 23 attack','Reuters reported the Cape Dao sinking on October 14, citing IMO data. This concerns damage from a separate September 23 attack, in which one crew death was reported. Do not combine it with the October GFS incidents or label it a new October 15 attack.','Separate the original attack date from the sinking report; a follow-up is not evidence of additional same-day attacks.'],
['Brent USD 105.92, WTI USD 97.97 at October 15 settlement','Brent settled USD 0.14 lower (-0.13%) at USD 105.92/bbl on October 15. WTI gained USD 2.88 (+3.03%) to USD 97.97/bbl, supported by a large US crude inventory draw. Reuters syndication and settlement reporting were cross-checked; these are closing, not intraday prices.','Crude settlements are not jet fuel or MOPS averages. They cannot establish an unpublished November level or charge.'],
['USD/KRW 1,344.60: October 15 Seoul 15:30 reference','Yonhap’s October 15 FX table identifies KRW 1,344.60/USD as the Seoul 15:30 dollar reference from Seoul Money Brokerage and Infomax. It is a daily observation. Market closes using another methodology are not merged with it, and it does not replace November period-average FX.','Official airline fares and existing site conversion settings remain unchanged; use airline notices for actual KRW charges.'],
['Singapore Jet Kerosene USD 179.42/bbl on October 14','CommodityScope lists FOB Singapore Jet Kerosene at USD 179.42/bbl for October 14. This is a daily indicative reference, not Platts raw data or November MOPS average. Valid October 15 data was not confirmed; a separate table’s 0.00 is excluded as potentially missing or invalid data, not plotted as a real price.','A daily-versus-October-average comparison is possible, but no November average or level is invented.']
]},
ja:{
title:'2026年10月国際線燃油サーチャージ23段階 | 11月公示待ち',
status:'10月23段階適用中 · 11月算定期間終了・公式平均と航空会社公示の確認待ち',
fact:'10月発券分は公式公示の23段階を適用中です。確定MOPS平均158.57 USD/bbl・377.54 cents/gal。大韓航空の国際線片道49,000～362,600 KRW、アシアナ53,400～301,200 KRW。他社の通貨・区間・適用基準は維持します。',
pending:'11月の算定期間2026-09-16～10-15は終了しました。基準時刻までに確認可能な資料では公式MOPS平均と韓国発国際線公示は未確認です。期間終了と平均公開・公示は別で、段階・金額は保留します。',
jet:'CommodityScopeの10月14日FOB Singapore Jet Kerosene 179.42 USD/bblは別提供元の日次参考値で、Platts原資料や11月MOPS平均ではありません。10月15日の有効値は未確認で、0.00は価格に採用しません。Sparta・Chợ Giáは日付付きの別記録として保存します。',
fx:'10月15日15:30 KSTのソウル外国為替仲介の基準値は1,344.60 KRW/USD。11月算定期間平均為替は未確認で、ウォン負担の方向や為替緩衝効果の大きさは確定しません。',
risk:'日次航空燃料と原油は上昇圧力要因となり得ますが11月段階・金額の確定根拠ではありません。船舶安全と通航・保険費用を区別し、最新通航・運賃・保険料は未確認です。完全閉鎖とは断定しません。',
history:'サウジ・中国・インド・G7・物流の従来値は日付付きアーカイブに保存します。同一基準の最新供給量・実際の備蓄放出・運賃・保険料は未確認で、現在の数値根拠には再利用しません。',
historyValue:'過去の供給・石油製品情報はアーカイブ参照 · 最新値未確認',
shipValue:'MPA 10/14: GFS Pride(10/13)沈没・21人避難 / GFS Giselle(10/14)安全停泊・22人無事',
foot:'10月158.57 USD/bbl・377.54 cents/galは確定算定平均。CommodityScope 10/14の179.42は日次値、IATA 190.18は別の世界週次値です。11月平均は未確認です。',
q:['現在の10月国際線は何段階ですか？','11月国際線公示は確認できましたか？','11月算定期間は終了しましたか？','179.42ドルは11月MOPS平均ですか？','1,344.60は11月平均為替ですか？','ホルムズで被害を受けた船舶は？','攻撃主体は確認されていますか？'],
attribution:'MPAは不明な発射体と発表しており、この資料だけで国や団体を特定しません。',
cards:[
['ホルムズでシンガポール船2隻被害、GFS Pride沈没','MPAの10月14日発表ではGFS Prideは13日、GFS Giselleは14日に不明な発射体の被害を受けたと報告されました。Prideは損傷・火災後に沈没しましたが21人全員避難。Giselleは損傷後に自力で安全な停泊地へ到着し22人全員無事です。両船とも負傷者の報告はなく、攻撃主体は特定されていません。','船舶安全と供給・輸送障害のリスクであり、通航量やサーチャージ上昇を確定する資料ではありません。'],
['Cape Dao沈没続報、9月23日の攻撃と区別','Reutersは10月14日にIMO資料を引用してCape Dao沈没を報じました。9月23日の別の攻撃による損傷に関する続報で、当時乗員1人死亡が報じられています。10月のGFS両船の事件や10月15日の新規攻撃として合算しません。','攻撃発生日と沈没報道日を区別し、過去被害の続報を当日の攻撃増加と解釈しません。'],
['10月15日終値Brent105.92・WTI97.97ドル','Brentは0.14ドル(-0.13%)安の105.92 USD/bbl、WTIは2.88ドル(+3.03%)高の97.97 USD/bblでした。米原油在庫の大幅減少がWTIを支えました。Reuters配信記事と決済報道で照合し、日中価格とは区別します。','原油決済値は航空燃料やMOPS平均ではなく、11月段階・金額は算出しません。'],
['ドル・ウォン1,344.60、10月15日ソウル15:30基準','聯合ニュースの10月15日為替表は米ドルのソウル15:30基準1,344.60 KRW/USDを示します。資料はソウル外国為替仲介・Infomaxです。他の算出方法の終値と混ぜず、11月算定期間平均為替には置き換えません。','航空会社の公式金額と既存換算設定は変更せず、実際のウォン負担は公式公示で確認します。'],
['Singapore Jet Kerosene、10月14日179.42 USD/bbl','CommodityScope公開表のFOB Singapore Jet Keroseneは10月14日179.42 USD/bblです。日次参考値で、Platts原資料や11月算定期間MOPS平均ではありません。15日の有効値は未確認で、別表の0.00は欠損・無効値の可能性があるため価格やグラフには採用しません。','日次値と10月確定平均の比較に限定し、11月平均・段階は作成しません。']
]},
zh:{
title:'2026年10月国际线燃油附加费第23档 | 等待11月公告',
status:'10月第23档执行中 · 11月计算期结束，等待核实官方均价及航司公告',
fact:'10月出票按官方第23档执行。确定MOPS均价158.57 USD/bbl、377.54 cents/gal。大韩航空国际线单程49,000～362,600 KRW，韩亚53,400～301,200 KRW。其他航司公告币种、区间与适用规则保持不变。',
pending:'11月计算期2026-09-16～10-15已结束。基准时间可访问资料中尚未核实官方MOPS均价和韩国出发国际线航司公告。期间结束不等于均价发布或公告，暂不判断档位及金额。',
jet:'CommodityScope的10月14日FOB Singapore Jet Kerosene 179.42 USD/bbl为另一提供商的每日参考价，不是Platts原始数据或11月MOPS均价。15日有效值未确认，0.00不作为真实价格。Sparta及Chợ Giá保留为各自日期的独立记录。',
fx:'10月15日15:30 KST首尔外汇经纪基准为1,344.60 KRW/USD。11月计算期平均汇率未确认，不确定韩元收费方向或汇率缓冲幅度。',
risk:'每日航油与原油可能形成上行压力，但不能确定11月档位或韩元金额。船舶安全与实际通航、保险成本分别处理；最新通航、运费及保险费未确认。不认定海峡完全关闭。',
history:'沙特、中国、印度、G7及物流旧数据保留在注明日期的归档中。同口径最新供应、实际储备投放、运费与保险费未核实，不作为当前数值依据。',
historyValue:'历史供应及成品油资料见归档 · 最新数据未确认',
shipValue:'MPA 10/14：GFS Pride(10/13)沉没、21人撤离 / GFS Giselle(10/14)安全锚泊、22人平安',
foot:'10月158.57 USD/bbl及377.54 cents/gal为确定计算均价。CommodityScope 10/14的179.42为日价，IATA 190.18为独立全球周价。11月均价未确认。',
q:['当前10月国际线为第几档？','11月国际线公告已确认吗？','11月计算期已结束吗？','179.42美元是11月MOPS均价吗？','1,344.60是11月平均汇率吗？','霍尔木兹哪些船舶遇袭？','攻击方已确认吗？'],
attribution:'MPA称为不明发射物，不能仅据该声明认定某国或组织负责。',
cards:[
['霍尔木兹两艘新加坡船遇袭，GFS Pride沉没','MPA于10月14日表示，GFS Pride和GFS Giselle分别于13日及14日据报遭不明发射物击中。Pride损毁起火后沉没，21名船员全部撤离。Giselle船体受损后自行抵达安全锚地，22人全部平安。两船均无伤者报告，声明未确认攻击方。','事件提高船舶安全及供应运输中断风险，但不等于确定通航量或附加费必涨。'],
['Cape Dao沉没续报，须区分9月23日袭击','Reuters于10月14日引述IMO资料报道Cape Dao沉没。此事涉及9月23日另一场袭击所致损伤，当时曾报告一名船员死亡。不能与10月两艘GFS船事件合并或列为10月15日新袭击。','区分袭击发生日与沉没报道日，不将历史损伤续报当作当日新增袭击。'],
['10月15日Brent收105.92、WTI收97.97美元','Brent下跌0.14美元(-0.13%)至105.92 USD/bbl，WTI上涨2.88美元(+3.03%)至97.97 USD/bbl。美国原油库存大减支撑WTI。已对照Reuters转载与结算报道，以上为收盘而非盘中价格。','原油结算价不是航油或MOPS均价，不能据此生成11月档位或金额。'],
['美元兑韩元1,344.60，10月15日首尔15:30基准','韩联社10月15日外汇表注明美元首尔15:30基准为1,344.60 KRW/USD，资料来自首尔外汇经纪与Infomax。该值为每日观测，不能与其他计算口径的市场收盘混用，也不是11月计算期平均汇率。','航司官方金额与网站既有换算设置不变；实际韩元收费以官方公告为准。'],
['Singapore Jet Kerosene：10月14日179.42 USD/bbl','CommodityScope公开价格表列10月14日FOB Singapore Jet Kerosene为179.42 USD/bbl。此为每日参考价，不是Platts原始资料或11月MOPS计算均价。15日有效值未确认，其他表的0.00可能为缺失或无效数据，不纳入价格或图表。','只可作日价与10月确定均价比较，不虚构11月均价或档位。']
]},
fr:{
title:'Surtaxe internationale octobre 2026 niveau 23 | Avis de novembre attendus',
status:'Octobre niveau 23 en vigueur · période novembre terminée, moyenne officielle et avis à vérifier',
fact:'Émission en octobre selon les avis officiels niveau 23. Moyenne MOPS confirmée : 158.57 USD/bbl, 377.54 cents/gal. Korean Air international aller simple 49,000–362,600 KRW ; Asiana 53,400–301,200 KRW. Autres devises, tranches et règles inchangées.',
pending:'La période novembre du 16 septembre au 15 octobre est terminée. Moyenne MOPS officielle et avis internationaux au départ de Corée non confirmés dans les documents accessibles à la date limite. Fin de période ne signifie pas publication : aucun niveau ni montant novembre attribué.',
jet:'CommodityScope, FOB Singapore Jet Kerosene du 14 octobre : 179.42 USD/bbl, référence quotidienne distincte, pas données Platts ni moyenne MOPS novembre. Valeur valide du 15 non confirmée ; 0.00 exclu des prix. Sparta et Chợ Giá restent des séries datées distinctes.',
fx:'Référence quotidienne Seoul Money Brokerage du 15 octobre à 15:30 KST : 1,344.60 KRW/USD. Moyenne de change novembre non confirmée : direction du montant KRW et ampleur de compensation non établies.',
risk:'Kérosène quotidien et brut peuvent exercer une pression haussière, sans confirmer niveau ou montant novembre. Sécurité, trafic et assurance sont distincts ; trafic, fret et primes actuels non confirmés. Aucune fermeture totale établie.',
history:'Anciens chiffres saoudiens, chinois, indiens, G7 et logistiques conservés dans les archives datées. Offre, livraisons réelles des réserves, fret et assurances comparables récents non confirmés, donc non réutilisés comme données actuelles.',
historyValue:'Offre et produits historiques : archives · chiffres actuels non confirmés',
shipValue:'MPA 14/10 : GFS Pride (13/10), naufrage, 21 évacués / GFS Giselle (14/10), mouillage sûr, 22 indemnes',
foot:'Octobre : moyennes confirmées 158.57 USD/bbl et 377.54 cents/gal. CommodityScope 14/10 179.42 est quotidien ; IATA 190.18 est mondial hebdomadaire distinct. Moyenne novembre non confirmée.',
q:['Quel niveau international en octobre ?','Les avis internationaux novembre sont-ils confirmés ?','La période novembre est-elle terminée ?','179.42 USD est-il la moyenne MOPS novembre ?','1,344.60 est-il le change moyen novembre ?','Quels navires ont été touchés à Ormuz ?','Les responsables sont-ils identifiés ?'],
attribution:'MPA parle de projectiles inconnus. Cette déclaration seule ne permet pas d’attribuer les attaques à un pays ou groupe.',
cards:[
['Deux navires singapouriens touchés à Ormuz, GFS Pride coulé','MPA a annoncé le 14 octobre que GFS Pride et GFS Giselle auraient été touchés par des projectiles inconnus les 13 et 14 respectivement. Pride a coulé après dommages et incendie ; ses 21 marins ont évacué. Giselle a rejoint par ses propres moyens un mouillage sûr, ses 22 marins sont sains et saufs. Aucun blessé signalé, auteur non identifié.','Risque accru pour la sécurité et les approvisionnements, pas preuve d’un volume de trafic ou d’une hausse inévitable des surtaxes.'],
['Naufrage du Cape Dao : suite de l’attaque du 23 septembre','Reuters a rapporté le naufrage le 14 octobre en citant les données de l’OMI. Il concerne les dommages d’une attaque distincte du 23 septembre, avec un marin mort selon les informations de l’époque. Ce n’est ni l’incident GFS d’octobre ni une nouvelle attaque du 15 octobre.','Date de l’attaque et date du suivi séparées ; ne pas compter le suivi comme une attaque supplémentaire du jour.'],
['Brent 105.92 USD, WTI 97.97 USD au règlement du 15 octobre','Brent termine à 105.92 USD/bbl, en baisse de 0.14 USD (-0.13%). WTI gagne 2.88 USD (+3.03%) à 97.97 USD/bbl, soutenu par une forte baisse des stocks américains. Dépêche Reuters rediffusée et compte rendu de clôture recoupés ; cours intrajournaliers distincts.','Le brut n’est ni kérosène ni moyenne MOPS. Aucun niveau ou montant novembre calculé à partir de ces clôtures.'],
['USD/KRW 1,344.60 : référence Séoul du 15 octobre à 15:30','Le tableau Yonhap du 15 octobre donne 1,344.60 KRW/USD à 15:30 Séoul, données Seoul Money Brokerage et Infomax. Observation quotidienne, non fusionnée avec des clôtures de méthodologie différente. Ce n’est pas le change moyen de la période novembre.','Tarifs officiels et paramètres de conversion du site inchangés ; consulter les avis pour les montants KRW réels.'],
['Singapore Jet Kerosene : 179.42 USD/bbl le 14 octobre','CommodityScope affiche 179.42 USD/bbl FOB Singapore Jet Kerosene au 14 octobre. Référence quotidienne indicative, pas données Platts ou moyenne MOPS novembre. Valeur valide du 15 non confirmée ; le 0.00 d’un autre tableau est exclu comme valeur potentiellement manquante, sans tracé comme prix réel.','Comparaison quotidien/moyenne octobre seulement ; aucune moyenne ni niveau novembre inventé.']
]},
de:{
title:'Internationaler Treibstoffzuschlag Oktober 2026 Stufe 23 | November-Mitteilungen offen',
status:'Oktober Stufe 23 gilt · November-Zeitraum beendet, offizielles Mittel und Mitteilungen zu prüfen',
fact:'Oktober-Ausstellung gemäß offiziellen Mitteilungen Stufe 23. Bestätigtes MOPS-Mittel: 158.57 USD/bbl, 377.54 cents/gal. Korean Air international einfach 49,000–362,600 KRW; Asiana 53,400–301,200 KRW. Andere Währungen, Bänder und Regeln bleiben erhalten.',
pending:'November-Zeitraum 16. September bis 15. Oktober beendet. Offizielles MOPS-Mittel und internationale Airline-Mitteilungen ab Korea waren in zugänglichen Unterlagen zum Stichtag nicht bestätigt. Periodenende ist nicht Veröffentlichung; keine November-Stufe oder Beträge festgelegt.',
jet:'CommodityScope FOB Singapore Jet Kerosene vom 14. Oktober: 179.42 USD/bbl, separater Tagesreferenzwert, keine Platts-Rohdaten oder November-MOPS-Mittel. Gültiger Wert vom 15. unbestätigt; 0.00 nicht als Preis übernommen. Sparta und Chợ Giá bleiben getrennte datierte Reihen.',
fx:'Seoul Money Brokerage Tagesreferenz 15. Oktober, 15:30 KST: 1,344.60 KRW/USD. November-Periodenmittelkurs unbestätigt; Richtung der KRW-Belastung und Umfang eines Wechselkurspuffers nicht festgelegt.',
risk:'Tageskerosin und Rohöl können Aufwärtsdruck bedeuten, bestätigen aber weder November-Stufe noch KRW-Betrag. Schiffssicherheit, Transit und Versicherung getrennt; aktuelle Verkehrs-, Fracht- und Versicherungswerte unbestätigt. Keine Vollsperre festgestellt.',
history:'Frühere Saudi-, China-, Indien-, G7- und Logistikzahlen bleiben im datierten Archiv. Vergleichbare aktuelle Versorgung, tatsächliche Reservelieferung, Fracht und Versicherung nicht bestätigt und nicht als aktuelle Zahlen wiederverwendet.',
historyValue:'Historische Versorgungs-/Produktdaten: Archiv · aktuelle Zahlen unbestätigt',
shipValue:'MPA 14.10.: GFS Pride (13.10.) gesunken, 21 evakuiert / GFS Giselle (14.10.) sicherer Ankerplatz, 22 unverletzt',
foot:'Oktober-Mittel 158.57 USD/bbl und 377.54 cents/gal bestätigt. CommodityScope 14.10. 179.42 ist täglich; IATA 190.18 separat global wöchentlich. November-Mittel unbestätigt.',
q:['Welche internationale Stufe gilt im Oktober?','Sind November-Mitteilungen bestätigt?','Ist der November-Zeitraum beendet?','Sind 179.42 USD das November-MOPS-Mittel?','Ist 1,344.60 der November-Mittelkurs?','Welche Schiffe wurden in Hormuz getroffen?','Sind die Verantwortlichen bekannt?'],
attribution:'MPA nennt unbekannte Projektile. Aus dieser Mitteilung allein wird kein Land oder Akteur als verantwortlich benannt.',
cards:[
['Zwei Singapur-Schiffe in Hormuz getroffen, GFS Pride gesunken','MPA teilte am 14. Oktober mit, GFS Pride und GFS Giselle seien am 13. beziehungsweise 14. von unbekannten Projektilen getroffen worden. Pride sank nach Schäden und Feuer, alle 21 Besatzungsmitglieder evakuiert. Giselle erreichte aus eigener Kraft einen sicheren Ankerplatz; alle 22 sind sicher. Keine Verletzten gemeldet, Angreifer nicht identifiziert.','Höheres Sicherheits- und Versorgungsrisiko, kein Nachweis bestimmter Verkehrsvolumen oder unvermeidlicher Zuschlagserhöhungen.'],
['Cape Dao gesunken: Nachmeldung zum Angriff vom 23. September','Reuters berichtete am 14. Oktober unter Berufung auf IMO-Daten vom Untergang. Er betrifft Schäden durch einen separaten Angriff vom 23. September; damals wurde ein toter Seemann gemeldet. Nicht mit den GFS-Ereignissen im Oktober oder einem neuen Angriff am 15. Oktober gleichsetzen.','Angriffsdatum und spätere Untergangsmeldung trennen; Nachmeldungen sind keine zusätzlichen Angriffe desselben Tages.'],
['Brent 105.92 USD, WTI 97.97 USD am 15. Oktober','Brent schloss 0.14 USD (-0.13%) tiefer bei 105.92 USD/bbl. WTI stieg 2.88 USD (+3.03%) auf 97.97 USD/bbl, unterstützt durch einen starken Rückgang der US-Rohölvorräte. Reuters-Verteilung und Schlussbericht abgeglichen, keine Vermischung mit Intradaykursen.','Rohölschlusswerte sind weder Kerosin noch MOPS-Mittel. Keine November-Stufe oder Beträge daraus berechnet.'],
['USD/KRW 1,344.60: Seoul-Referenz vom 15. Oktober 15:30','Yonhaps Devisentabelle vom 15. Oktober nennt 1,344.60 KRW/USD zum Seouler Dollar-Stichtag 15:30. Daten stammen von Seoul Money Brokerage und Infomax. Tageswert nicht mit anders berechneten Schlusskursen vermischt und kein Ersatz für den November-Periodenmittelkurs.','Offizielle Airline-Beträge und bestehende Umrechnungseinstellungen bleiben unverändert; tatsächliche KRW-Belastung laut Mitteilung.'],
['Singapore Jet Kerosene am 14. Oktober 179.42 USD/bbl','CommodityScope nennt FOB Singapore Jet Kerosene 179.42 USD/bbl am 14. Oktober. Indikativer Tageswert, keine Platts-Rohdaten oder November-MOPS-Mittel. Gültiger Wert vom 15. nicht bestätigt; 0.00 in einer anderen Tabelle wegen möglicher Datenlücke nicht als Preis oder Grafikpunkt übernommen.','Nur Tageswert/Oktober-Mittel-Vergleich; kein November-Mittel und keine Stufe erfunden.']
]}
};
var urls=[
'https://www.mpa.gov.sg/media-centre/details/two-singapore-registered-vessels-struck-in-strait-of-hormuz',
'https://www.al-monitor.com/originals/2026/10/two-ships-sink-near-hormuz-after-being-hit-projectiles-amid-surge-attacks',
'https://uk.marketscreener.com/news/oil-prices-fall-as-investors-weigh-supply-outlook-middle-east-tensions-ce785dd3d98bfe25',
'https://www.yna.co.kr/view/AKR20261015132900002',
'https://commodityscope.com/prices'
];
var names=['MPA Singapore','Reuters / Al-Monitor','Reuters / MarketScreener','Yonhap / Seoul Money Brokerage','CommodityScope'];
function firstSentence(text){var m=text.match(/^.*?(?:(?<![0-9])[.!?](?=\s|$)|。)/);return m?m[0]:text;}
r.modified=stamp;r.asOf=asOf;r.numbers=Object.assign({},r.numbers,window.AERO_MARKET_NUMBERS_20261016);
r.sources=[['MPA',urls[0]],['CommodityScope · FOB Singapore daily',urls[4]],['Yonhap · Seoul 15:30',urls[3]]];
Object.keys(copy).forEach(function(l){
var c=copy[l],p=r.packs[l],rows=r.rows[l].map(function(x){return x.slice();});
rows[0][1]=c.status;rows[0][2]=c.pending;
rows[1][1]='CommodityScope 2026-10-14: FOB Singapore Jet Kerosene 179.42 USD/bbl';rows[1][2]=c.jet;
rows[2][1]='USD/KRW 1,344.60 (2026-10-15 15:30 KST) · Brent 105.92 (-0.13%) / WTI 97.97 (+3.03%) USD/bbl (2026-10-15) · IATA 190.18 USD/bbl (+1.5%, 2026-10-14)';
rows[2][2]=c.fx;
rows[3][1]=c.historyValue;rows[3][2]=c.history;
rows[4][1]=c.shipValue;rows[4][2]=c.risk;
r.rows[l]=rows;
var answers=[c.fact,c.pending,c.pending,c.jet,c.fx,c.cards[0][1],c.attribution];
Object.assign(p,{title:c.title,meta:c.title,newsTitle:c.title,newsMeta:c.title,rows:rows,
notice:c.fact,intro:c.fact+' '+c.pending+' '+c.jet+' '+c.fx,
desc:c.pending+' '+c.jet+' '+c.fx,sub:asOf+' · '+c.status,newsSub:asOf+' · '+c.status,
foot:c.foot,note:c.pending+' '+c.risk,basisBody:c.foot,verdict1:c.pending,verdict2:c.risk,verdictLong:c.pending,
keyVars:rows.map(function(x){return x[0]+': '+x[1];}),officialNotice:asOf+' · '+c.status,
faq:c.q.map(function(q,i){return {q:q,a:answers[i]};})});
});
var reports=['2026-10-14','2026-10-14','2026-10-15','2026-10-15','2026-10-14'];
var events=['2026-10-13','2026-09-23','2026-10-15','2026-10-15','2026-10-14'];
var cards=copy.ko.cards.map(function(_,i){
var card={id:'market-20261016-'+(i+1),category:i===0?'institution':'market',priority:i+1,date:'2026-10-16',
publishedAt:stamp,updatedAt:stamp,reportedDate:reports[i],eventDate:events[i],badge:'NEW',aiSummary:true,
relevanceScore:1-i/100,sourceUrl:urls[i],i18n:{}};
Object.keys(copy).forEach(function(l){var x=copy[l].cards[i];card.i18n[l]={title:x[0],aiBrief:firstSentence(x[1]),summary:x[1],impact:x[2],sourceName:names[i],tags:[],links:[],faq:[]};});
card.i18n.cn=card.i18n.zh;return card;
});
r.newsCards=cards.concat(r.newsCards.filter(function(x){return !/^market-20261016-/.test(x.id);}));
window.AERO_MARKET_RELEASE=r;
})();

