/* November 12, 09:00 KST release. All 155 preceding news objects stay intact. */
(function () {
  'use strict';
  var r = window.AERO_MARKET_RELEASE, n = window.AERO_MARKET_NUMBERS_20261112;
  if (!r || !n) return;
  var stamp = '2026-11-12T09:16:09.258+09:00';
  var urls = {
    stage:'https://mobile.newsis.com/view_amp.html?ar_id=NISX20261016_0003828757',
    jet:'https://commodityscope.com/prices/singapore-jet-kerosene',
    jetCategory:'https://commodityscope.com/prices/jet-fuel',
    fx:'https://news.einfomax.co.kr/news/articleView.html?idxno=4444261',
    fxClose:'https://www.newsis.com/view/NISX20261111_0003864097',
    oil:'https://www.newsweekjapan.jp/articles/-/339829',
    oilContracts:'https://news.sbs.co.kr/english/article.do?news_id=N1008842078',
    iata:'https://www.iata.org/en/publications/economics/fuel-monitor/',
    iataTable:'https://www.iata.org/contentassets/9036deaf9c984009a3515fd6aa1c5e24/fuel_price_analysis.jpg',
    imo:'https://www.imo.org/en/mediacentre/hottopics/pages/middle-east-highlighted-incidents.aspx',
    traffic:'https://insights.windward.ai/',
    opec:'https://www.opec.org/assets/assetdb/momr-appendix-november-2026.xlsx',
    opecReport:'https://publications.opec.org/momr',
    opecNews:'https://www.brecorder.com/news/amp/40448439',
    didamar:'https://www.marketscreener.com/news/iran-attacks-shipping-navigation-systems-on-oman-s-didamar-island-sources-say-ce785edbde80f420',
    eia:'https://www.eia.gov/outlooks/steo/',
    eiaPdf:'https://www.eia.gov/outlooks/steo/pdf/steo_text.pdf',
    policy:'https://www.opec.org/pr-detail/620-1-november-2026.html',
    yp:'https://www.airpremia.com/a/ko/customer/notice/803'
  };
  var copy = {
    ko: {
      desc:'11월 12일 09:00 KST 기준 11월 유류할증료와 12월 전망. 원유 반등·환율 하락, 날짜가 명시된 항공유 평가, 제한된 해상 관측과 공식 공시를 구분합니다.',
      expectation:'12월 예상: 인하 압력·원유 반등 위험 공존',
      dec:'12월 산정기간은 10월 16일~11월 15일입니다. 11월 11일 원유 정산 반등은 상방, 서울 원/달러 하락과 11월 10일 민간 항공유 평가·11월 6일 종료 IATA 주간평균 하락은 하방 요인입니다. 방향이 엇갈리고 해상위험이 남아 신뢰도는 낮습니다. 공식 누적 MOPS·기간 평균환율·단계·금액은 미확정입니다.',
      fx:'11월 11일 서울 15:30 주간 종가는 1,333.6원/USD로 전일보다 3.9원 내렸습니다. 연합인포맥스 보도를 뉴시스와 대조했습니다. 원화 환산 비용의 하방 요인이지만 실시간 환율이나 12월 산정 평균은 아닙니다. 항공사 공시액을 이 환율로 다시 계산하지 않습니다.',
      oil:'11월 11일 선물 정산은 Brent 2027년 1월물 92.76 USD/bbl(+1.27·+1.39%), WTI 2026년 12월물 86.53(+0.49·+0.57%)입니다. Reuters 보도와 SBS의 월물·정산값을 대조했으며 거래소 원표 직접 검증은 아닙니다. 원유 반등은 상방 요인이며 항공유·공식 MOPS 평균과는 다릅니다.',
      jet:'Singapore Jet 145.98 USD/bbl은 CommodityScope의 11월 10일 민간 FOB 평가입니다. 이전 평가일 11월 6일보다 12.57달러(-7.9%) 낮으며 낮은 신뢰도의 참고값입니다. 당일 실시간값·실거래가·Platts MOPS가 아닙니다. 09시 전 검색 표에서 같은 행을 확보하고 기준시각 후 상세를 재확인했으며 최초 게시시각은 미제공입니다. 11월 대한항공 발표의 MOPS 173.89는 별도 9월 16일~10월 15일 평균입니다.',
      iata:'IATA/Platts의 11월 6일 종료 주간 세계 항공유 평균 178.95 USD/bbl(-6.6%), 아시아·오세아니아 163.26(-6.0%)은 이전과 같은 표입니다. 세계·지역 정유소 주간평균이며 싱가포르 일일 평가나 한국 항공사의 공식 MOPS 산정평균이 아닙니다.',
      imo:'IMO 133건·선원 사망 25명은 이전에 확인한 11월 10일 기준 목록의 과거 참고값입니다. 이번 최신 목록은 11월 12일 09시 이전 공개 근거를 확보하지 못해 최신 확정 누계는 미확인입니다. 확인일만 바꿔 과거 수치를 최신값으로 표시하지 않습니다. 중동·호르무즈 누적 사건은 전수 통항이나 원유 유량과 다릅니다.',
      traffic:'Windward 11월 11일 판은 11월 10일 18:00 UTC에 끝난 24시간 동안 호르무즈 통항 10회(진입 5·출항 5), AIS 관측 5·AIS 미관측 5를 관측했습니다. 업체 관측이며 전수 통항·원유 b/d·안전 회복을 입증하지 않습니다. 이전의 날짜만 있는 6회나 다른 길이의 관측창과 직접 증감률을 만들지 않습니다.',
      opec:'OPEC 11월 월간보고서의 10월 DoC 참여국 원유 생산은 2차 자료 추정으로 4,123만 b/d, 전월 대비 204만 b/d 증가입니다. 공식 보고서 본문과 Reuters 보도를 대조했습니다. 과거 월평균 생산 추정이며 새 생산정책·현재 수출·호르무즈 유량은 아닙니다. 11월 1일 결정의 12월 요구생산량은 9월 수준으로 유지됩니다.',
      didamar:'Reuters는 3명의 소식통을 인용해 이란이 오만 Didamar섬의 선박 항법시설을 공격했다고 보도했습니다. 11월 10일 발표된 시설 파괴 주장은 이란 측 주장으로, Reuters는 연기를 확인했으나 파괴 여부·피해 정도·정확한 사건일을 확인하지 못했습니다. 통항 영향이 제한적일 것이라는 평가도 별도 소식통 의견입니다. 현재 유량이나 다른 사건과의 동일성을 추정하지 않습니다.',
      eia:'EIA의 11월 10일 STEO는 11월 5일 모형 입력에 기반한 조건부 전망입니다. Brent 현물의 11~12월 월평균 약 100달러 전망은 이번 선물 정산이나 공식 항공유 평균이 아닙니다.',
      marine:'IMO 과거 참고 133건·25명(11월 10일), 최신 미확인 | Windward 10회=진입 5+출항 5(11월 10일 18Z 종료 24h)',
      basis:'서울 환율과 날짜가 명시된 민간 항공유·IATA 주간평균 하락은 인하 압력입니다. 공식 산정평균은 아직 확인되지 않았습니다.',
      risk:'11월 11일 원유 정산은 반등했습니다. 해상 공격과 시설 피해의 불확실성도 남아 인하 방향이 확정된 것은 아닙니다.',
      impacts:['인하 압력과 반등 위험이 공존합니다. 신뢰도 낮음·단계와 금액 미확정.','동일 민간 평가의 하락은 하방 참고입니다. IATA 주간값·공식 MOPS와 기간 및 범위를 구분합니다.','전일 대비 3.9원 하락은 환산 비용의 하방 요인입니다.','원유 정산 반등은 상방 요인입니다. 항공유 평균으로 대체하지 않습니다.','IMO는 과거 참고·최신 미확인입니다. 24시간 통항 10회도 안전 회복을 뜻하지 않습니다.'],
      questions:['11월 단계와 항공사 금액은 어떤 근거인가요?','12월 유류할증료는 어떻게 예상하나요?','Singapore Jet 평가와 IATA 주간평균은 공식 MOPS인가요?','1,333.6원은 언제의 환율인가요?','Brent·WTI는 어떤 계약의 가격인가요?','IMO 사건 집계와 Windward 통항 관측의 범위는 무엇인가요?','OPEC 생산 추정과 해상 공격 보도를 어떻게 해석하나요?'],
      heads:['원/달러 1,333.6원: 11월 11일 주간 종가 3.9원 하락','Brent 92.76·WTI 86.53: 11월 11일 선물 정산 반등','Singapore Jet 145.98: 11월 10일 민간 평가 하락','Windward: 11월 10일 18Z 종료 24시간 통항 10회','OPEC: 10월 DoC 원유 생산 4,123만 b/d 추정','Reuters: 소식통 3명, Didamar 항법시설 공격 확인'],
      labels:['최종 수정','정보 기준','발표·보도','사건·관측','게시시각 미제공','세계','아시아·오세아니아','주간 종료'],
      tags:['시장 종가','선물 정산','민간 평가','제공자 관측','월간 생산 추정','소식통 귀속 보도']
    },
    en: {
      desc:'November surcharges and December outlook at November 12, 09:00 KST: rebounding crude, lower USD/KRW, dated jet assessments, limited maritime observations and official notices kept distinct.',
      expectation:'December outlook: downward pressure with continuing rebound risk',
      dec:'December uses October 16–November 15. Higher November 11 crude settlements exert upward pressure; lower Seoul USD/KRW, the November 10 private jet assessment and IATA averages for the week ending November 6 lean downward. Signals conflict and maritime risk persists, so confidence is low. Official cumulative MOPS, period-average FX, stage and amounts remain unconfirmed.',
      fx:'Seoul’s November 11 daytime close at 15:30 was 1,333.6 KRW/USD, down 3.9 won. Yonhap Infomax was checked against Newsis. Lower conversion costs do not make this a live rate or December period average. Published airline charges are not recalculated at this rate.',
      oil:'November 11 futures settlements: Brent January 2027 at 92.76 USD/bbl (+1.27; +1.39%) and WTI December 2026 at 86.53 (+0.49; +0.57%). Reuters was checked against SBS for contracts and settlements, not directly against exchange tables. Rebounding crude is an upward factor, distinct from jet fuel or official MOPS averages.',
      jet:'Singapore Jet 145.98 USD/bbl is CommodityScope’s private FOB assessment dated November 10, down 12.57 dollars (-7.9%) from the previous assessment on November 6. Confidence is low. It is not a live quote, trade price or Platts MOPS. The same category-table row was obtained before 09:00 and the detail rechecked after cutoff; first publication time is unavailable. Korean Air’s November MOPS reference of 173.89 separately covers September 16–October 15.',
      iata:'IATA/Platts’ unchanged table for the week ending November 6 shows global jet fuel at 178.95 USD/bbl (-6.6%) and Asia/Oceania at 163.26 (-6.0%). These global and regional weekly refinery-price averages are neither daily Singapore assessments nor Korean airlines’ official MOPS calculation average.',
      imo:'IMO’s 133 incidents and 25 seafarer fatalities are a historical reference from the previously verified list as at November 10. Availability of the latest list before November 12 at 09:00 was not established, so the latest confirmed total is unavailable. Rechecking does not make older figures current. Cumulative Middle East and Hormuz incidents are not total traffic or oil flow.',
      traffic:'Windward’s November 11 edition observes ten Hormuz crossings in the 24 hours ending November 10 at 18:00 UTC: five inbound and five outbound, five AIS-visible and five dark. Provider observations do not establish exhaustive traffic, oil b/d or safe passage. No direct growth rate is calculated against the prior date-only six crossings or differently sized windows.',
      opec:'OPEC’s November monthly report estimates October DoC crude production from secondary sources at 41.23 million b/d, up 2.04 million b/d month on month. The official report text was checked against Reuters. This is a past monthly production estimate, not a new policy, current exports or Hormuz flow. The November 1 decision keeps December required production at September levels.',
      didamar:'Reuters cites three sources confirming Iranian attacks on ship-navigation infrastructure on Oman’s Didamar island. Destruction claimed by Iran on November 10 remains an attributed claim: Reuters verified smoke, but not destruction, damage extent or the exact event date. Expectations of limited shipping impact also come from separate sources. Current flow and identity with other incidents are not inferred.',
      eia:'EIA’s November 10 STEO is a conditional forecast completed with November 5 inputs. Its approximate 100-dollar November–December monthly Brent spot average is neither the latest futures settlement nor an official jet-fuel average.',
      marine:'IMO historical: 133 incidents, 25 fatalities (Nov 10); latest unconfirmed | Windward: 10=5 inbound+5 outbound (24h to Nov 10 18Z)',
      basis:'Lower Seoul USD/KRW and dated private jet and IATA weekly averages exert downward pressure. Official calculation averages remain unverified.',
      risk:'November 11 crude settlements rebounded. Maritime attacks and uncertain infrastructure damage persist; a surcharge reduction is not confirmed.',
      impacts:['Downward pressure and rebound risk coexist. Low confidence; stage and amounts unconfirmed.','The same private assessment series fell. Keep its period and scope distinct from IATA weekly values and official MOPS.','The 3.9-won daily decline lowers conversion-cost pressure.','Higher crude settlements exert upward pressure, without replacing the jet-fuel average.','IMO is historical, with the latest total unconfirmed. Ten crossings in 24 hours do not establish safety.'],
      questions:['What supports November’s stage and airline amounts?','What is the December surcharge outlook?','Are Singapore Jet assessments and IATA weekly averages official MOPS?','When was the 1,333.6 exchange rate observed?','Which contracts do Brent and WTI prices refer to?','What do the IMO incident count and Windward transits cover?','How should OPEC production estimates and maritime attack reports be read?'],
      heads:['USD/KRW 1,333.6: November 11 daytime close down 3.9 won','Brent 92.76; WTI 86.53: November 11 settlements rebound','Singapore Jet 145.98: lower private assessment dated November 10','Windward: ten crossings in 24 hours to November 10 at 18Z','OPEC estimates October DoC crude output at 41.23 million b/d','Reuters: three sources confirm attack on Didamar navigation systems'],
      labels:['Modified','Information cutoff','Publication/report','Event/observation','Publication time unavailable','Global','Asia/Oceania','week ending'],
      tags:['Market close','Futures settlement','Private assessment','Provider observation','Monthly output estimate','Attributed source report']
    },
    ja: {
      desc:'11月12日09:00 KST基準の11月燃油サーチャージと12月見通し。原油反発・為替下落、日付付き航空燃料評価、限定的な海上観測と公式公示を区別します。',
      expectation:'12月見通し：下落圧力と反発リスクが継続',
      dec:'12月の算定期間は10月16日～11月15日です。11月11日の原油清算値反発は上方向、ソウルUSD/KRW下落と11月10日の民間航空燃料評価・11月6日終了IATA週平均の下落は下方向の要因です。方向が分かれ海上リスクも残るため信頼度は低く、公式累積MOPS・期間平均為替・段階・金額は未確定です。',
      fx:'11月11日ソウル15:30の日中終値は1,333.6 KRW/USD、前日比3.9ウォン下落です。聯合インフォマックスをNewsisと照合しました。換算費用の下落要因ですが、リアルタイム為替や12月の期間平均ではなく、公示額を再計算しません。',
      oil:'11月11日の先物清算値はBrent2027年1月限92.76 USD/bbl（+1.27・+1.39%）、WTI2026年12月限86.53（+0.49・+0.57%）です。ReutersとSBSの限月・清算値を照合し、取引所表の直接検証ではありません。原油反発は上昇要因ですが、航空燃料・公式MOPS平均とは別です。',
      jet:'Singapore Jet145.98 USD/bblはCommodityScopeの11月10日の民間FOB評価で、前回評価日11月6日比12.57ドル（7.9%）下落です。信頼度は低く、当日のリアルタイム値・約定値・Platts MOPSではありません。09時前に検索表の同じ行を取得し基準時刻後に詳細を再確認しました。初回公表時刻は未提供です。大韓航空発表の11月MOPS173.89は別の9月16日～10月15日平均です。',
      iata:'IATA/Plattsの11月6日終了週は世界178.95 USD/bbl（-6.6%）、アジア・オセアニア163.26（-6.0%）で、前回と同じ表です。世界・地域の製油所週平均であり、シンガポール日次評価や韓国航空会社の公式MOPS算定平均ではありません。',
      imo:'IMO133件・船員死亡25人は以前確認した11月10日時点一覧の過去参考値です。最新一覧の11月12日09時以前の公表根拠を得られず、最新確定累計は未確認です。再確認日だけで過去値を最新にはしません。中東・ホルムズ累積事件は全通航数や原油流量とは異なります。',
      traffic:'Windward11月11日版は11月10日18:00 UTCまでの24時間にホルムズ通航10回（入航5・出航5）、AIS観測5・AIS未観測5を観測しました。民間観測で、全通航・原油b/d・安全回復を示しません。以前の日付のみの6回や長さの異なる観測期間から直接増減率を作りません。',
      opec:'OPEC11月月報は2次資料に基づき10月DoC参加国原油生産を4,123万b/d、前月比204万b/d増と推定しています。公式報告書本文とReutersを照合しました。過去の月平均生産推定で、新政策・現在の輸出・ホルムズ流量ではありません。11月1日の決定による12月要求生産量は9月水準です。',
      didamar:'Reutersは3人の関係筋を引用し、イランによるオマーンDidamar島の船舶航法施設攻撃を報じました。11月10日発表の施設破壊はイラン側の主張で、Reutersが確認したのは煙であり、破壊・損害規模・正確な事件日は未確認です。通航影響が限定的との見方も別の関係筋の評価です。現在流量や他事件との同一性を推定しません。',
      eia:'EIA11月10日STEOは11月5日のモデル入力による条件付き予測です。Brent現物11～12月の月平均約100ドルという予測は今回の先物清算値や公式航空燃料平均ではありません。',
      marine:'IMO過去参考133件・死亡25人（11月10日）、最新未確認 | Windward10回=入航5+出航5（11月10日18Zまで24h）',
      basis:'ソウル為替と日付付き民間航空燃料・IATA週平均の下落は引下げ圧力です。公式算定平均は未確認です。',
      risk:'11月11日の原油清算値は反発しました。海上攻撃と施設被害の不確実性も残り、サーチャージ引下げは確定していません。',
      impacts:['下落圧力と反発リスクが併存。信頼度は低く、段階・金額は未確定。','同じ民間評価系列の下落は下方向の参考。IATA週平均・公式MOPSとは期間と範囲が異なります。','前日比3.9ウォン下落は換算費用の下落要因。','原油清算値の反発は上方向。航空燃料平均の代用にはしません。','IMOは過去参考で最新未確認。24時間10回の通航も安全回復を示しません。'],
      questions:['11月の段階と航空会社の金額の根拠は何ですか？','12月の燃油サーチャージはどう予想されますか？','Singapore Jet評価とIATA週平均は公式MOPSですか？','1,333.6の為替はいつの値ですか？','Brent・WTIはどの限月の価格ですか？','IMO事件集計とWindward通航観測の範囲は？','OPEC生産推定と海上攻撃報道をどう解釈しますか？'],
      heads:['USD/KRW1,333.6：11月11日日中終値3.9ウォン下落','Brent92.76・WTI86.53：11月11日清算値が反発','Singapore Jet145.98：11月10日民間評価が下落','Windward：11月10日18Zまで24時間に通航10回','OPEC：10月DoC原油生産4,123万b/dと推定','Reuters：関係筋3人がDidamar航法施設攻撃を確認'],
      labels:['最終編集','情報基準','公表・報道','事件・観測','公表時刻未提供','世界','アジア・オセアニア','週終了'],
      tags:['市場終値','先物清算値','民間評価','事業者観測','月間生産推定','関係筋を引用した報道']
    },
    zh: {
      desc:'11月12日09:00 KST基准的11月燃油附加费与12月展望：区分原油反弹、汇率下跌、注明日期的航油评估、有限海上观测与官方公告。',
      expectation:'12月展望：下行压力与反弹风险持续',
      dec:'12月计算期为10月16日至11月15日。11月11日原油结算反弹带来上行压力；首尔美元兑韩元、11月10日私人航油评估及11月6日当周IATA均价下跌带来下行压力。信号不一且海上风险仍存，置信度低。官方累计MOPS、期间平均汇率、档位及金额未确认。',
      fx:'11月11日首尔15:30日间收盘为1,333.6 KRW/USD，较前日下降3.9韩元。韩联社Infomax报道与Newsis已对照。这降低换算成本，但并非实时汇率或12月期间均值，不据此重算航司公告金额。',
      oil:'11月11日期货结算：2027年1月Brent92.76 USD/bbl（+1.27、+1.39%），2026年12月WTI86.53（+0.49、+0.57%）。Reuters与SBS的合约月份及结算值已对照，未直接核验交易所表。原油反弹是上行因素，并非航油或官方MOPS平均。',
      jet:'Singapore Jet145.98 USD/bbl为CommodityScope11月10日私人FOB评估，较前次评估日11月6日下降12.57美元（7.9%）。置信度低，并非当天实时价、成交价或Platts MOPS。09时前搜索表已取得同一行，基准后复核详情；首次发布时间未提供。大韩航空11月MOPS参考173.89另对应9月16日至10月15日平均。',
      iata:'IATA/Platts截至11月6日当周表仍为全球178.95 USD/bbl（-6.6%）、亚洲及大洋洲163.26（-6.0%）。这是同一份全球及地区炼厂周均表，并非新加坡日度评估或韩国航司官方MOPS计算均值。',
      imo:'IMO133起事件、25名海员死亡是此前核验的截至11月10日清单的历史参考。无法证实最新清单在11月12日09时前已公开，因此最新确认累计仍未核实。更新查阅日期不会使旧值成为最新值。中东及霍尔木兹累计事件不等于完整通行量或原油流量。',
      traffic:'Windward11月11日版观测截至11月10日18:00 UTC的24小时内霍尔木兹通行10次：进入5、驶出5，AIS可见5、AIS未观测5。这是私人机构观测，不能证明完整通行量、原油b/d或安全恢复。不与此前仅注明日期的6次及不同时长观测窗直接计算增减率。',
      opec:'OPEC11月月报依据二手资料，估计10月DoC参与国产量为4,123万b/d，环比增加204万b/d。已对照官方报告正文与Reuters。这是过去月均原油生产估计，并非新政策、当前出口或霍尔木兹流量。11月1日决定的12月要求产量维持9月水平。',
      didamar:'Reuters援引3名知情人士确认伊朗袭击阿曼Didamar岛船舶导航设施。11月10日公布的设施摧毁说法来自伊朗；Reuters核实了烟雾，但未确认摧毁、损伤程度及准确事件日期。航运影响可能有限也属于另外消息人士的评估。不推定当前流量或与其他事件相同。',
      eia:'EIA11月10日STEO是基于11月5日模型输入的条件预测。Brent现货11—12月月均约100美元不等于本次期货结算或官方航油平均。',
      marine:'IMO历史参考133起、25人死亡（11月10日），最新未确认 | Windward10次=进入5+驶出5（截至11月10日18Z的24h）',
      basis:'首尔汇率、带日期的私人航油评估与IATA周均下跌形成下行压力。官方计算均值仍未核实。',
      risk:'11月11日原油结算反弹。海上袭击及设施损伤不确定性仍存，附加费下调尚未确认。',
      impacts:['下行压力与反弹风险并存。置信度低，档位与金额未确认。','同一私人评估序列下跌构成下行参考，须与IATA周均及官方MOPS区分期间与范围。','较前日下降3.9韩元，降低换算成本压力。','原油结算反弹构成上行因素，不替代航油均值。','IMO为历史参考，最新未确认。24小时10次通行不证明安全恢复。'],
      questions:['11月档位和航司金额依据是什么？','12月燃油附加费有何展望？','Singapore Jet评估与IATA周均是官方MOPS吗？','1,333.6是何时的汇率？','Brent和WTI指哪个合约？','IMO事件统计和Windward通行观测涵盖什么？','如何解读OPEC产量估计与海上袭击报道？'],
      heads:['美元兑韩元1,333.6：11月11日日间收盘下降3.9韩元','Brent92.76、WTI86.53：11月11日期货结算反弹','Singapore Jet145.98：11月10日私人评估下跌','Windward：截至11月10日18Z的24小时通行10次','OPEC估计10月DoC原油产量4,123万b/d','Reuters：3名消息人士确认Didamar导航设施遇袭'],
      labels:['最后修改','信息截至','发布·报道','事件·观测','发布时间未提供','全球','亚洲及大洋洲','周截止'],
      tags:['市场收盘','期货结算','私人评估','机构观测','月度产量估计','消息人士报道']
    },
    fr: {
      desc:'Surtaxes de novembre et perspectives de décembre au 12 novembre, 09:00 KST : rebond du brut, recul du change, évaluations datées du kérosène et observations maritimes limitées, distincts des avis officiels.',
      expectation:'Décembre : pression baissière et risque de rebond persistant',
      dec:'Le calcul de décembre couvre le 16 octobre–15 novembre. Le rebond des règlements pétroliers du 11 novembre pousse à la hausse ; le recul du USD/KRW de Séoul, de l’évaluation privée du kérosène du 10 novembre et des moyennes IATA au 6 novembre pousse à la baisse. Signaux mixtes et risques maritimes : confiance faible. MOPS officiel cumulé, change moyen, niveau et montants non confirmés.',
      fx:'Clôture diurne de Séoul du 11 novembre à 15 h 30 : 1,333.6 KRW/USD, soit -3.9 wons. Yonhap Infomax a été recoupé avec Newsis. Ce facteur réduit les coûts de conversion, sans être un cours en direct ni la moyenne de décembre. Les surtaxes publiées ne sont pas recalculées à ce taux.',
      oil:'Règlements du 11 novembre : Brent janvier 2027 à 92.76 USD/bbl (+1.27 ; +1.39 %) et WTI décembre 2026 à 86.53 (+0.49 ; +0.57 %). Reuters et SBS ont été recoupés pour les contrats et règlements, sans contrôle direct des tableaux de bourse. Le rebond du brut est un facteur haussier, distinct du kérosène et du MOPS officiel.',
      jet:'Singapore Jet à 145.98 USD/bbl est l’évaluation FOB privée de CommodityScope du 10 novembre, en recul de 12.57 dollars (-7.9 %) depuis l’évaluation précédente du 6 novembre. Confiance faible : ni cours en direct, ni prix de transaction, ni Platts MOPS. La même ligne du tableau a été obtenue par recherche avant 09:00, puis les détails revérifiés après la limite ; première publication inconnue. La référence MOPS de novembre de Korean Air, 173.89, couvre séparément le 16 septembre–15 octobre.',
      iata:'Le tableau IATA/Platts inchangé pour la semaine au 6 novembre donne 178.95 USD/bbl au niveau mondial (-6.6 %) et 163.26 en Asie-Océanie (-6.0 %). Moyennes hebdomadaires de prix en raffinerie, et non évaluation quotidienne de Singapour ou moyenne MOPS officielle des compagnies coréennes.',
      imo:'Les 133 incidents et 25 marins morts de l’OMI sont une référence historique de la liste au 10 novembre déjà vérifiée. La disponibilité de la dernière liste avant le 12 novembre à 09:00 n’est pas établie ; le dernier total confirmé reste inconnu. Une nouvelle consultation ne rend pas les anciens chiffres actuels. Ce cumul Moyen-Orient/Hormuz ne mesure ni trafic exhaustif ni flux pétroliers.',
      traffic:'L’édition Windward du 11 novembre observe dix passages à Hormuz sur les 24 heures finissant le 10 novembre à 18:00 UTC : cinq entrants, cinq sortants, cinq visibles par AIS et cinq non observés par AIS. Observations privées, sans preuve de trafic exhaustif, de pétrole en b/j ni de sécurité. Aucun taux de variation direct avec les six passages précédents datés seulement ou des fenêtres de durées différentes.',
      opec:'Le rapport mensuel OPEP de novembre estime la production de brut DoC d’octobre à 41.23 millions b/j, soit +2.04 millions sur un mois, selon des sources secondaires. Texte du rapport officiel recoupé avec Reuters. Moyenne mensuelle passée, ni nouvelle politique, ni exportations actuelles, ni flux à Hormuz. La décision du 1er novembre maintient décembre au niveau requis de septembre.',
      didamar:'Reuters cite trois sources confirmant des attaques iraniennes contre les installations de navigation de l’île omanaise de Didamar. La destruction annoncée par l’Iran le 10 novembre reste une affirmation attribuée : Reuters a vérifié de la fumée, pas la destruction, l’ampleur des dommages ou la date exacte des attaques. L’impact maritime jugé limité est aussi l’avis de sources distinctes. Aucun flux actuel ni lien avec d’autres incidents n’est déduit.',
      eia:'Le STEO EIA du 10 novembre est une prévision conditionnelle arrêtée avec les données au 5 novembre. Son Brent au comptant proche de 100 dollars en moyenne mensuelle en novembre–décembre n’est ni le dernier règlement à terme ni une moyenne officielle de kérosène.',
      marine:'OMI historique : 133 incidents, 25 morts (10 nov.), dernier bilan inconnu | Windward : 10=5 entrants+5 sortants (24h au 10 nov. 18Z)',
      basis:'Le recul du change de Séoul, du kérosène privé daté et des moyennes IATA exerce une pression baissière. Les moyennes officielles restent non vérifiées.',
      risk:'Les règlements pétroliers du 11 novembre ont rebondi. Attaques maritimes et dommages incertains persistent ; une baisse de surtaxe n’est pas confirmée.',
      impacts:['Pression baissière et risque de rebond coexistent. Confiance faible, niveau et montants non confirmés.','La même série privée baisse. Période et périmètre distincts des moyennes IATA et du MOPS officiel.','Le recul quotidien de 3.9 wons réduit la pression sur les coûts de conversion.','Le rebond du brut est haussier, sans remplacer la moyenne de kérosène.','OMI historique, dernier total inconnu. Dix passages sur 24 heures ne prouvent pas la sécurité.'],
      questions:['Sur quoi reposent le niveau de novembre et les montants des compagnies ?','Quelles perspectives pour la surtaxe de décembre ?','Singapore Jet et les moyennes IATA sont-ils le MOPS officiel ?','Quand le taux de 1,333.6 a-t-il été observé ?','À quels contrats correspondent le Brent et le WTI ?','Que couvrent les incidents OMI et les passages Windward ?','Comment lire les estimations OPEP et les informations sur les attaques maritimes ?'],
      heads:['USD/KRW 1,333.6 : clôture diurne du 11 novembre en recul de 3.9 wons','Brent 92.76 ; WTI 86.53 : rebond des règlements du 11 novembre','Singapore Jet 145.98 : évaluation privée du 10 novembre en baisse','Windward : dix passages sur 24 heures au 10 novembre à 18Z','OPEP : production DoC d’octobre estimée à 41.23 millions b/j','Reuters : trois sources confirment une attaque contre la navigation à Didamar'],
      labels:['Modifié','Date limite des informations','Publication','Événement / observation','Heure de publication inconnue','Monde','Asie-Océanie','semaine au'],
      tags:['Clôture de marché','Règlement à terme','Évaluation privée','Observation du fournisseur','Estimation mensuelle de production','Information attribuée']
    },
    de: {
      desc:'November-Zuschläge und Dezember-Ausblick zum 12. November, 09:00 KST: Ölpreisanstieg, schwächerer USD/KRW, datierte Kerosinbewertungen und begrenzte Schifffahrtsbeobachtungen getrennt von offiziellen Mitteilungen.',
      expectation:'Dezember: Abwärtsdruck bei anhaltendem Risiko eines Wiederanstiegs',
      dec:'Die Dezember-Berechnung umfasst den 16. Oktober–15. November. Höhere Öl-Abrechnungen vom 11. November wirken aufwärts; niedrigerer Seouler USD/KRW, die private Kerosinbewertung vom 10. November und die IATA-Wochenwerte bis 6. November wirken abwärts. Gemischte Signale und maritime Risiken bedeuten geringe Sicherheit. Offizieller kumulierter MOPS, Periodenwechselkurs, Stufe und Beträge bleiben unbestätigt.',
      fx:'Seouler Tagesschluss am 11. November um 15:30: 1,333.6 KRW/USD, minus 3.9 Won. Yonhap Infomax wurde mit Newsis abgeglichen. Das senkt Umrechnungskosten, ist aber weder Echtzeitkurs noch Dezember-Durchschnitt. Veröffentlichte Zuschläge werden damit nicht neu berechnet.',
      oil:'Abrechnung am 11. November: Brent Januar 2027 bei 92.76 USD/bbl (+1.27; +1.39 %) und WTI Dezember 2026 bei 86.53 (+0.49; +0.57 %). Reuters und SBS wurden zu Laufzeiten und Abrechnung abgeglichen, keine direkte Prüfung der Börsentabellen. Der Ölpreisanstieg wirkt aufwärts, ist aber kein Kerosin- oder offizieller MOPS-Durchschnitt.',
      jet:'Singapore Jet 145.98 USD/bbl ist CommodityScopes private FOB-Bewertung vom 10. November, 12.57 Dollar (-7.9 %) unter der vorherigen Bewertung vom 6. November. Geringes Vertrauen: kein Echtzeit-, Transaktions- oder Platts-MOPS-Preis. Dieselbe Tabellenzeile wurde vor 09:00 per Suche erfasst, die Detailseite danach geprüft; Erstveröffentlichungszeit unbekannt. Korean Airs November-MOPS-Referenz 173.89 betrifft separat den 16. September–15. Oktober.',
      iata:'Die unveränderte IATA/Platts-Tabelle für die Woche bis 6. November nennt weltweit 178.95 USD/bbl (-6.6 %) und Asien/Ozeanien 163.26 (-6.0 %). Globale und regionale Raffinerie-Wochenmittel, keine täglichen Singapurbewertungen oder offiziellen MOPS-Berechnungsdurchschnitte koreanischer Airlines.',
      imo:'133 IMO-Vorfälle und 25 getötete Seeleute sind eine historische Referenz der zuvor geprüften Liste mit Stand 10. November. Die Verfügbarkeit der neuesten Liste vor dem 12. November um 09:00 ist nicht belegt; der neueste bestätigte Gesamtstand bleibt unbekannt. Ein neues Prüfdatum macht alte Zahlen nicht aktuell. Kumulierte Nahost-/Hormus-Vorfälle sind weder Gesamtverkehr noch Ölfluss.',
      traffic:'Windwards Ausgabe vom 11. November erfasst zehn Hormus-Passagen in den 24 Stunden bis 10. November, 18:00 UTC: fünf einwärts, fünf auswärts, fünf AIS-sichtbar und fünf nicht über AIS beobachtet. Anbieterbeobachtung, kein vollständiger Verkehr, Öl-b/d oder Sicherheitsbeleg. Keine direkte Änderungsrate gegenüber den nur datierten sechs Passagen zuvor oder anders langen Zeitfenstern.',
      opec:'OPECs November-Monatsbericht schätzt die Oktober-Rohölförderung der DoC-Teilnehmer nach Sekundärquellen auf 41.23 Millionen b/d, plus 2.04 Millionen zum Vormonat. Offizieller Berichtstext mit Reuters abgeglichen. Historische Monatsproduktion, keine neue Politik, aktuellen Exporte oder Hormus-Durchflussmenge. Der Beschluss vom 1. November hält die Dezember-Vorgabe auf Septemberniveau.',
      didamar:'Reuters nennt drei Quellen, die iranische Angriffe auf Schiffsnavigationsanlagen auf Omans Insel Didamar bestätigen. Die am 10. November von Iran gemeldete Zerstörung bleibt eine zugeschriebene Behauptung: Reuters bestätigte Rauch, aber weder Zerstörung, Schadensausmaß noch genaues Ereignisdatum. Begrenzte Verkehrsfolgen sind ebenfalls die Einschätzung anderer Quellen. Aktueller Ölfluss oder Gleichheit mit anderen Vorfällen werden nicht abgeleitet.',
      eia:'Der EIA-STEO vom 10. November ist eine bedingte Prognose mit Eingaben bis 5. November. Sein Brent-Kassamonatsmittel für November–Dezember von ungefähr 100 Dollar ist weder die jüngste Futures-Abrechnung noch ein offizieller Kerosindurchschnitt.',
      marine:'IMO historisch: 133 Vorfälle, 25 Tote (10. Nov.), neuester Stand unbekannt | Windward: 10=5 einwärts+5 auswärts (24h bis 10. Nov. 18Z)',
      basis:'Niedrigerer Seouler Wechselkurs, datierte private Kerosinbewertung und IATA-Wochenmittel wirken abwärts. Offizielle Berechnungsdurchschnitte sind ungeprüft.',
      risk:'Öl-Abrechnungen vom 11. November stiegen wieder. Maritime Angriffe und unklare Anlagenschäden bestehen fort; eine Zuschlagssenkung ist nicht bestätigt.',
      impacts:['Abwärtsdruck und Risiko eines Wiederanstiegs bestehen nebeneinander. Geringe Sicherheit; Stufe und Beträge unbestätigt.','Dieselbe private Bewertungsreihe fällt. Zeitraum und Umfang von IATA-Wochenwerten und offiziellem MOPS trennen.','Der Tagesrückgang um 3.9 Won senkt den Umrechnungskostendruck.','Höhere Öl-Abrechnungen wirken aufwärts, ersetzen aber keinen Kerosindurchschnitt.','IMO ist historische Referenz, neuester Stand unbekannt. Zehn Passagen in 24 Stunden belegen keine Sicherheit.'],
      questions:['Worauf beruhen November-Stufe und Beträge der Airlines?','Wie ist der Ausblick für den Dezember-Zuschlag?','Sind Singapore-Jet-Bewertungen und IATA-Wochenmittel offizielles MOPS?','Wann wurde der Wechselkurs 1,333.6 beobachtet?','Welche Kontrakte betreffen Brent und WTI?','Was erfassen IMO-Vorfälle und Windward-Passagen?','Wie sind OPEC-Förderschätzungen und Berichte über maritime Angriffe einzuordnen?'],
      heads:['USD/KRW 1,333.6: Tagesschluss am 11. November 3.9 Won niedriger','Brent 92.76; WTI 86.53: Abrechnung am 11. November steigt','Singapore Jet 145.98: private Bewertung vom 10. November fällt','Windward: zehn Passagen in 24 Stunden bis 10. November, 18Z','OPEC schätzt Oktober-DoC-Rohölförderung auf 41.23 Millionen b/d','Reuters: drei Quellen bestätigen Angriff auf Didamar-Navigationsanlagen'],
      labels:['Geändert','Informationsstand','Veröffentlichung','Ereignis / Beobachtung','Veröffentlichungszeit unbekannt','Welt','Asien/Ozeanien','Woche bis'],
      tags:['Marktschluss','Futures-Abrechnung','Private Bewertung','Anbieterbeobachtung','Monatliche Förderschätzung','Quellen zugeschriebener Bericht']
    }
  };

  r.modified = stamp; r.asOf = n.asOf; r.numbers = n;
  // The footnote renderer uses the first two source entries in this order.
  r.sources = [
    ['NEWSIS / Korean Air · 2026-10-16 statement; November reference', urls.stage],
    ['CommodityScope · 2026-11-10 private FOB assessment; not Platts MOPS', urls.jet],
    ['CommodityScope category table · same assessment observed before cutoff', urls.jetCategory],
    ['Yonhap Infomax · 2026-11-11 Seoul daytime close', urls.fx],
    ['NEWSIS · 2026-11-11 daytime close corroboration', urls.fxClose],
    ['Reuters / Newsweek Japan · 2026-11-11 futures settlements', urls.oil],
    ['SBS · 2026-11-11 settlements and contract months', urls.oilContracts],
    ['IATA / Platts · week ending 2026-11-06, unchanged weekly table', urls.iata],
    ['IATA / Platts · global and regional weekly refinery-price table', urls.iataTable],
    ['IMO · historical as-at 2026-11-10 reference, 133 incidents / 25 fatalities; latest pre-cutoff availability unverified', urls.imo],
    ['Windward · 2026-11-11 edition; 24 hours ending 2026-11-10 18:00 UTC', urls.traffic],
    ['OPEC · November 2026 official report text; October secondary-source DoC output', urls.opecReport],
    ['OPEC · appendix availability metadata only; values not parsed', urls.opec],
    ['Reuters / Business Recorder · 2026-11-11 monthly output corroboration', urls.opecNews],
    ['Reuters / MarketScreener · 2026-11-11 Didamar source report; event date unknown', urls.didamar],
    ['EIA · 2026-11-10 STEO, inputs completed 2026-11-05', urls.eia],
    ['EIA · conditional forecast text', urls.eiaPdf],
    ['OPEC · 2026-11-01 unchanged December production policy', urls.policy],
    ['Air Premia · notice 803, Ningbo condition effective 2026-11-06', urls.yp]
  ];
  Object.keys(copy).forEach(function (lang) {
    var p = r.packs[lang], c = copy[lang], labels = c.labels;
    if (!p) return;
    var nov = p.faq[0].a, names = p.rows.map(function (row) { return row[0]; });
    var update = labels[0] + ': ' + stamp + ' · ' + labels[1] + ': ' + n.asOf;
    var rows = [
      [names[0], p.status, c.dec],
      [names[1], 'MOPS 173.89 (2026-09-16–10-15) | Singapore Jet 145.98 (2026-11-10) | IATA ' + labels[5] + ' 178.95 / ' + labels[6] + ' 163.26 (' + labels[7] + ' 2026-11-06) USD/bbl', c.jet + ' ' + c.iata],
      [names[2], '1,333.6 KRW/USD (2026-11-11 15:30 KST; -3.9)', c.fx],
      [names[3], 'Brent 92.76 (2027-01) / WTI 86.53 (2026-12) USD/bbl · 2026-11-11', c.oil],
      [names[4], c.marine, c.imo + ' ' + c.traffic]
    ];
    var answers = [nov, c.dec, c.jet + ' ' + c.iata, c.fx, c.oil, c.imo + ' ' + c.traffic, c.opec + ' ' + c.didamar + ' ' + c.eia];
    Object.assign(p, {
      desc:c.desc, sub:update + ' · ' + c.dec, newsSub:update + ' · ' + p.status,
      updated:update, updatedLabel:labels[0], intro:p.status + ' ' + c.dec, rows:rows,
      summary:[p.status, c.dec, rows[1][1], rows[2][1], rows[3][1], c.marine],
      foot:c.jet + ' ' + c.iata + ' ' + nov, basisBody:nov + ' ' + c.jet + ' ' + c.iata,
      verdict1:c.dec, verdict2:c.fx, verdictLong:c.opec + ' ' + c.didamar + ' ' + c.eia,
      note:c.dec, officialNotice:update + ' · ' + p.status,
      keyVars:[p.status, rows[1][1], rows[2][1], rows[3][1], c.marine],
      faq:c.questions.map(function (q, i) { return {q:q, a:answers[i]}; })
    });
    var overview = p.forecastOverview;
    p.forecastOverview = Object.assign({}, overview, {
      modifiedAt:stamp, informationCutoff:n.informationCutoff, expectation:c.expectation,
      question:c.questions[1], basis:c.basis, risk:c.risk,
      rows:[
        [overview.rows[0][0], c.expectation, c.impacts[0]],
        [names[1], rows[1][1], c.impacts[1]],
        [names[2], rows[2][1], c.impacts[2]],
        [names[3], rows[3][1], c.impacts[3]],
        [names[4], c.marine, c.impacts[4]]
      ], rowTones:['hold', 'down', 'down', 'up', 'up']
    });
    r.rows[lang] = rows;
    p.surface = Object.assign({}, p.surface, {
      'fore.pageSub':p.sub, 'fore.intro':p.intro, 'fore.summary.updated':update,
      'fore.indicator.footnote':p.foot, 'fore.verdict.line1':p.verdict1,
      'fore.verdict.line2':p.verdict2, 'fore.verdict.long':p.verdictLong,
      'fore.basis.body':p.basisBody, 'fore.predict.footnote':p.foot, 'fore.aiNotice':c.dec,
      'news.pageSub':p.newsSub, 'news.note':c.dec, 'news.surchargeNote':c.dec,
      'news.dataRef':p.sub, 'news.decisionShort':p.status + ' · ' + c.dec,
      'news.decisionLine1':c.dec, 'news.decisionLine2':c.fx,
      'news.forecastCta.desc':p.intro, 'news.summary.updated':update,
      'news.officialNotice':p.officialNotice, 'news.basisBody':p.foot
    });
    // A shorter equivalent heading fits the existing mobile title row.
    if (lang === 'de') p.surface['fore.predict.title'] = 'Markt und Sicherheit auf See';
  });
  var definitions = [
    {key:'fx', name:'Yonhap Infomax / NEWSIS', url:urls.fx, published:'2026-11-11T18:35:50+09:00', updated:null, event:'2026-11-11T15:30:00+09:00', checked:'2026-11-12T00:00:38.405Z', citations:[urls.fx, urls.fxClose], status:'published_reports_of_Seoul_1530_daytime_close'},
    {key:'oil', name:'Reuters / Newsweek Japan / SBS', url:urls.oil, published:'2026-11-12T05:57:00+09:00', updated:'2026-11-12T06:01:37+09:00', event:'2026-11-11', checked:'2026-11-12T00:01:56.163Z', citations:[urls.oil, urls.oilContracts], status:'published_settlement_and_contract_reports_not_direct_exchange_table'},
    {key:'jet', name:'CommodityScope', url:urls.jet, published:null, updated:null, reported:null, event:'2026-11-10', checked:n.singaporeJetSourceCheckedAt, citations:[urls.jet, urls.jetCategory], status:'private_low_confidence_assessment_category_table_observed_before_cutoff_detail_rechecked_after_cutoff'},
    {key:'traffic', name:'Windward', url:urls.traffic, published:null, updated:null, reported:'2026-11-11', event:'2026-11-10', checked:'2026-11-12T00:00:14.324Z', lastModified:'2026-11-11T00:59:58Z', status:'provider_tracked_24_hour_observations_not_exhaustive_traffic'},
    {key:'opec', name:'Reuters / OPEC', url:urls.opecNews, published:'2026-11-11T18:18:13+05:00', updated:'2026-11-11T18:18:13+05:00', reported:'2026-11-11', event:null, checked:'2026-11-12T00:02:11.211Z', citations:[urls.opecNews, urls.opecReport], status:'Reuters_monthly_secondary_source_output_estimate_corroborated_by_official_report_text_not_new_policy'},
    {key:'didamar', name:'Reuters / MarketScreener', url:urls.didamar, published:'2026-11-11T12:53:16-05:00', updated:'2026-11-11T12:53:16-05:00', event:null, checked:'2026-11-12T00:01:24.019Z', status:'three_source_attack_report_smoke_verified_destruction_and_exact_event_date_unconfirmed'}
  ];
  var cards = definitions.map(function (def, i) {
    var card = {
      id:'market-20261112-' + (i + 1), category:i >= 4 ? 'institution' : 'market', priority:i + 1,
      date:'2026-11-12', dateKind:'site_update', publishedAt:stamp, updatedAt:stamp,
      informationCutoff:n.informationCutoff, reportedDate:def.published || def.reported || null,
      sourcePublishedAt:def.published, sourceUpdatedAt:def.updated, eventDate:def.event,
      sourceVerifiedAt:def.checked, sourceUrl:def.url, citationUrls:def.citations || [def.url],
      sourceVerificationStatus:def.status, badge:'NEW', aiSummary:true, relevanceScore:1 - i / 100, i18n:{}
    };
    if (def.lastModified) card.sourceLastModifiedAt = def.lastModified;
    if (!def.published) card.sourcePublicationNote = 'First publication time is unavailable. Availability evidence is separate from observation and retrieval dates; Last-Modified is not first publication.';
    if (def.key === 'fx') {
      card.corroboratingSourcePublishedAt = '2026-11-11T15:48:56+09:00';
      card.corroboratingSourceUpdatedAt = '2026-11-11T16:28:24+09:00';
    }
    if (def.key === 'oil') {
      card.brentContractMonth = '2027-01'; card.wtiContractMonth = '2026-12';
      card.corroboratingSourcePublishedAt = '2026-11-12T07:08:07+09:00';
    }
    if (def.key === 'jet') {
      card.observationDate = '2026-11-10'; card.previousAssessmentDate = '2026-11-06';
      card.assessmentConfidence = 'low'; card.assessmentKind = 'private_indicative_FOB_not_Platts_MOPS';
      card.sourceAvailabilityUpperBound = '2026-11-12T08:59:58+09:00';
      card.sourceAvailabilityMethod = 'category_table_search_return_bound_clock_plus_total_call_elapsed_and_quantization_not_exact_retrieval_time';
    }
    if (def.key === 'traffic') {
      card.observationDate = '2026-11-10';
      card.observationStart = '2026-11-09T18:00:00Z'; card.observationEnd = '2026-11-10T18:00:00Z';
      card.observationStartBasis = n.windwardObservationWindowStartBasis;
      card.observationHours = 24; card.sourceReleaseDate = '2026-11-11';
    }
    if (def.key === 'opec') {
      card.observationPeriod = '2026-10'; card.sourceReleaseDate = '2026-11-11';
      card.officialReportSourcePublishedAt = null;
      card.officialAppendixUrl = urls.opec;
      card.officialAppendixLastModifiedAt = '2026-11-11T18:19:17Z';
      card.officialAppendixCheckedAt = '2026-11-12T00:01:52.781Z';
      card.officialAppendixValuesParsed = false;
      card.productionScope = 'DoC_crude_monthly_secondary_sources_not_exports_or_Hormuz_flow';
      card.corroboratingSourcePublishedAt = '2026-11-11T18:18:13+05:00';
    }
    if (def.key === 'didamar') {
      card.claimAnnouncementDate = '2026-11-10'; card.damageExtent = null;
      card.navigationSystemsDestroyed = null; card.currentOilFlow = null;
      card.relationshipToOtherIncidents = 'not_established';
      card.independentVisualVerification = 'smoke_only_not_identity_of_burning_object_or_destruction';
    }
    Object.keys(copy).forEach(function (lang) {
      var c = copy[lang], labels = c.labels;
      var dateCopy = labels[2] + ': ' + (card.reportedDate || labels[4]) + '. ';
      if (!def.published && card.reportedDate) dateCopy += labels[4] + '. ';
      if (def.event) dateCopy += labels[3] + ': ' + def.event + '. ';
      card.i18n[lang] = {
        title:c.heads[i], aiBrief:c.heads[i], summary:dateCopy + c[def.key], impact:c.dec,
        sourceName:def.name, sourceRefs:card.citationUrls.map(function (url) { return {name:url === urls.fxClose ? 'NEWSIS' : url === urls.oilContracts ? 'SBS' : url === urls.opecNews ? 'Reuters / Business Recorder' : def.name, url:url}; }),
        tags:[c.tags[i]], links:[], faq:[]
      };
    });
    card.i18n.cn = card.i18n.zh;
    return card;
  });
  r.newsCards = cards.concat(r.newsCards.filter(function (card) { return !/^market-20261112-/.test(card.id); }));
  window.AERO_MARKET_RELEASE = r;
  window.AERO_MARKET_NUMBERS_LATEST = n;
  if (typeof window.AeroApplyNovemberNoticePeriod20261110 === 'function') window.AeroApplyNovemberNoticePeriod20261110();
})();
