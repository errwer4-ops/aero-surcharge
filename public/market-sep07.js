(function(){
  'use strict';
  // Data only: the existing renderer owns layout and language changes.
  var date = '2026.09.07 20:30 KST';
  var numbers = {
    asOf:date, currentMonth:'2026-09', currentMonthNotice:'2026-09', forecastTargetMonth:'2026-10',
    septemberLevel:21, septemberBaselineUsdPerBbl:149.29, septemberBaselineCentsPerGal:355.46,
    octoberWindow:'2026.08.16~2026.09.15', octoberAverageMops:null, octoberAverageUsdKrw:null,
    usdKrw:1340.5, usdKrwAsOf:'2026-09-07T15:30:00+09:00', usdKrwIntradayLow:1334.7, jpy100Krw:861,
    singaporeJetFuelDate:'2026.09.03', singaporeJetFuelFlatUsdPerBbl:159.58,
    singaporeJetFuelPreviousDate:'2026.08.27', singaporeJetFuelPreviousUsdPerBbl:142.93,
    singaporeJetFuelVsBaselineUsd:10.29, singaporeJetFuelVsBaselinePct:6.89,
    globalJetFuelUsdPerBbl:171.01, globalJetFuelWeeklyPct:9.0,
    brentUsdPerBbl:96.19, wtiUsdPerBbl:91.03, brentPct:null, wtiPct:null,
    crudeAsOf:'2026-09-07T08:22:00Z', brentIntradayHigh:97.93,
    hormuzKplerCommodityVessels:null, hormuzTenDayAverageCommodityVessels:10,
    hormuzSaturdayCommodityVessels:2, hormuzSundayCommodityVessels:6,
    octoberNoticeStatus:'not-confirmed'
  };
  var rows = {
    ko:[
      ['10월 종합','보합~상승 압력 우세 · 인하 가능성 크게 후퇴','신뢰도 낮음~보통 · 보통에 접근. 항공유 반등은 상방, 원화 강세는 KRW 부과액의 완충 요인입니다.'],
      ['USD/KRW','9월 7일 15:30 기준 1,340.5원 · 장중 저점 1,334.7원 · 100엔 약 861원','원화 부과액에 강한 하방 ↓↓↓. 현물환율과 8/16~9/15 산정기간 평균환율(집계 중)은 다릅니다.'],
      ['Singapore Jet Fuel / MOPS','시장 flat price: 8/27 $142.93 → 9/3 $159.58/bbl · 9월 산정평균 $149.29 · 글로벌 주간평균 $171.01(+9%)','9/3 시장값은 9월 기준선보다 $10.29 높습니다. 항공유 ↑↑↑. 어느 시장 참고값도 10월 누적 MOPS 평균은 아닙니다.'],
      ['국제유가','9월 7일 08:22 UTC 장중 Brent $96.19 · WTI $91.03/bbl · Brent 장중 고점 $97.93','높은 수준 ↑↑. OPEC+는 9/6 회의에서 10월 생산정책 유지 결정. 새 추가증산에 따른 완화는 없습니다.'],
      ['호르무즈·정제품 공급','Kpler 공개 추적 commodity vessel: 10일 평균 약 10척/일 · 주말 토 2/일 6척 · 수요일 이후 VLCC 출항 미확인','상업선박 공격·운송·보험 위험 ↑↑↑. 제한구역은 발표 예정, 오만 통항로는 이란 측 협의 주장입니다. 전체 선박 수나 정상화로 해석하지 않습니다.']
    ],
    en:[
      ['October outlook','Flat-to-upward pressure dominates · cut prospects retreat sharply','Confidence low-to-medium, approaching medium. Higher jet fuel raises pressure; stronger KRW cushions the KRW charge.'],
      ['USD/KRW','Sept 7, 15:30 KST: 1,340.5 · intraday low 1,334.7 · JPY 100 ≈ KRW 861','Strong downward effect on KRW amounts ↓↓↓. Spot FX differs from the Aug 16–Sept 15 calculation average, still being compiled.'],
      ['Singapore Jet Fuel / MOPS','Market flat price: Aug 27 $142.93 → Sept 3 $159.58/bbl · September average $149.29 · global weekly average $171.01 (+9%)','The Sept 3 quote exceeds the September baseline by $10.29. Jet fuel ↑↑↑. None of these market references is the October cumulative MOPS average.'],
      ['Crude oil','Sept 7, 08:22 UTC intraday: Brent $96.19 · WTI $91.03/bbl · Brent high $97.93','Elevated prices ↑↑. On Sept 6 OPEC+ maintained October production policy, with no new additional output increase.'],
      ['Hormuz and refined supply','Kpler publicly tracked commodity vessels: 10-day average ≈10/day · Sat 2/Sun 6 · no outbound VLCC confirmed since Wednesday','Commercial-vessel attacks, freight and insurance risk ↑↑↑. Restricted zone planned; Oman corridor talks claimed by Iran. These are not total traffic counts or proof of reopening.']
    ],
    ja:[
      ['10月総合','横ばい～上昇圧力が優勢 · 引き下げ可能性は大きく後退','信頼度は低～中、中程度に接近。航空燃料上昇は上方向、ウォン高はウォン建て負担を緩和します。'],
      ['USD/KRW','9月7日15:30 KST 1,340.5 · 日中安値1,334.7 · 100円約861ウォン','ウォン建て金額への強い下方向要因↓↓↓。直物相場と8/16～9/15の算定平均為替（集計中）は異なります。'],
      ['Singapore Jet Fuel / MOPS','市場価格: 8/27 $142.93 → 9/3 $159.58/bbl · 9月算定平均$149.29 · 世界週平均$171.01（+9%）','9/3価格は9月基準を$10.29上回ります。航空燃料↑↑↑。これらは10月累積MOPS平均ではありません。'],
      ['国際原油','9月7日08:22 UTC取引中: Brent $96.19 · WTI $91.03/bbl · Brent高値$97.93','高水準↑↑。OPEC+は9/6会合で10月生産方針を維持し、新たな追加増産は決定しませんでした。'],
      ['ホルムズ・石油製品供給','Kpler公開追跡の貨物船: 10日平均約10隻/日 · 土2/日6隻 · 水曜以降VLCC出航未確認','商船攻撃・輸送・保険リスク↑↑↑。制限区域は発表予定、オマーン航路協議はイラン側の主張です。全船舶数や正常化を示しません。']
    ],
    zh:[
      ['10月综合','持平至上涨压力占优 · 下调可能性明显减弱','可信度低至中，接近中等。航油反弹推高压力，韩元走强缓冲韩元收费。'],
      ['USD/KRW','9月7日15:30 KST 1,340.5 · 盘中低点1,334.7 · 100日元约861韩元','韩元金额的强下行因素↓↓↓。即期汇率不同于8/16至9/15计算期平均汇率（汇总中）。'],
      ['Singapore Jet Fuel / MOPS','市场价格: 8/27 $142.93 → 9/3 $159.58/bbl · 9月计算均值$149.29 · 全球周均$171.01（+9%）','9/3报价比9月基准高$10.29。航油↑↑↑。这些参考价格均不是10月累计MOPS均值。'],
      ['国际油价','9月7日08:22 UTC盘中: Brent $96.19 · WTI $91.03/bbl · Brent高点$97.93','维持高位↑↑。OPEC+在9/6会议维持10月生产政策，未决定新的额外增产。'],
      ['霍尔木兹与成品油供应','Kpler公开追踪商品船: 10日均约10艘/日 · 周六2/周日6艘 · 周三以来未确认VLCC驶出','商船袭击、运费和保险风险↑↑↑。限制区尚待宣布，阿曼航道协商为伊朗方面说法。不是总船流量或恢复通航的证明。']
    ],
    fr:[
      ['Bilan octobre','Stabilité à hausse privilégiée · baisse nettement moins probable','Confiance faible à moyenne, proche de moyenne. Le kérosène pousse à la hausse, le won fort amortit le montant en KRW.'],
      ['USD/KRW','7 sept., 15:30 KST : 1,340.5 · plus bas 1,334.7 · 100 JPY ≈ 861 KRW','Fort effet baissier sur le montant en KRW ↓↓↓. Le cours au comptant diffère de la moyenne du 16 août au 15 septembre, en cours de calcul.'],
      ['Singapore Jet Fuel / MOPS','Prix de marché : 27/8 $142.93 → 3/9 $159.58/bbl · moyenne septembre $149.29 · moyenne mondiale hebdomadaire $171.01 (+9%)','Le prix du 3/9 dépasse la base septembre de $10.29. Kérosène ↑↑↑. Aucune de ces références ne représente le MOPS moyen cumulé d’octobre.'],
      ['Pétrole','7 sept., 08:22 UTC en séance : Brent $96.19 · WTI $91.03/bbl · sommet Brent $97.93','Niveau élevé ↑↑. Le 6/9, l’OPEC+ a maintenu sa politique de production pour octobre, sans nouvelle augmentation supplémentaire.'],
      ['Hormuz et produits raffinés','Navires de marchandises suivis publiquement par Kpler : moyenne 10 jours ≈10/jour · sam. 2/dim. 6 · aucune sortie VLCC confirmée depuis mercredi','Attaques de navires marchands, fret et assurance ↑↑↑. Zone restreinte annoncée comme projet; corridor avec Oman selon l’Iran. Ni trafic total ni normalisation confirmée.']
    ],
    de:[
      ['Oktober gesamt','Stabile bis steigende Tendenz · Senkung deutlich unwahrscheinlicher','Vertrauen niedrig bis mittel, nähert sich mittel. Teureres Kerosin wirkt aufwärts, ein stärkerer Won dämpft den KRW-Betrag.'],
      ['USD/KRW','7. Sept., 15:30 KST: 1,340.5 · Tagestief 1,334.7 · 100 JPY ≈ 861 KRW','Starker Abwärtsfaktor für KRW-Beträge ↓↓↓. Kassakurs und Durchschnitt vom 16. August bis 15. September (noch in Berechnung) sind verschieden.'],
      ['Singapore Jet Fuel / MOPS','Marktpreis: 27.8. $142.93 → 3.9. $159.58/bbl · September-Mittel $149.29 · globales Wochenmittel $171.01 (+9%)','Der Kurs vom 3.9. liegt $10.29 über der September-Basis. Kerosin ↑↑↑. Keiner dieser Referenzwerte ist das kumulierte Oktober-MOPS-Mittel.'],
      ['Rohöl','7. Sept., 08:22 UTC im Handel: Brent $96.19 · WTI $91.03/bbl · Brent-Hoch $97.93','Hohes Niveau ↑↑. OPEC+ behielt am 6.9. die Oktober-Förderpolitik bei, ohne neue zusätzliche Fördererhöhung.'],
      ['Hormuz und Raffinerieprodukte','Von Kpler öffentlich erfasste Frachtschiffe: 10-Tage-Mittel ≈10/Tag · Sa. 2/So. 6 · seit Mittwoch keine VLCC-Ausfahrt bestätigt','Angriffe auf Handelsschiffe, Fracht und Versicherung ↑↑↑. Sperrzone geplant; Oman-Korridor laut iranischer Darstellung in Gesprächen. Keine Gesamtverkehrszahl oder bestätigte Normalisierung.']
    ]
  };
  var copy = {
    ko:{intro:'2026년 9월 7일 기준 10월 국제선 유류할증료는 보합~상승 압력이 우세하고 인하 가능성은 크게 후퇴했습니다. Singapore Jet Fuel 시장가격은 8/27 $142.93에서 9/3 $159.58/bbl로 반등했고 IATA 글로벌 주간평균도 $171.01(+9%)로 상승했습니다. USD/KRW 1,340.5원의 원화 강세는 실제 KRW 부과액 상승폭을 제한할 수 있습니다. 단계·금액은 아직 확정되지 않았습니다.',foot:'* $149.29는 9월 확정 산정평균(7/16~8/15, 355.46 cents/gal), $159.58는 9/3 Singapore 시장 flat price, $171.01은 IATA/S&P Global Platts 세계 주간평균입니다. 10월 MOPS·평균환율은 8/16~9/15 집계 중입니다.',confidence:'신뢰도: 낮음~보통 · 보통에 접근 · 특정 10월 단계·금액 미확정',status:'9월 21단계 현재 적용 · 10월 한국 출발 국제선 공식공시 미확인 · 산정기간 추적 중',note:'유류할증료는 발권일 기준입니다. 공개 시장자료를 분석한 전망이며 실제 금액은 각 항공사 공식 공지를 확인하세요.',updated:'최종 업데이트',faqTitle:'10월 유류할증료 자주 묻는 질문',source:'출처',analysis:'10월 영향',questions:['10월 국제선 유류할증료는 오를까요?','지난주보다 전망을 상향한 이유는?','환율이 내려도 금액이 오를 수 있나요?','$159.58가 10월 MOPS 평균인가요?','호르무즈는 정상화됐나요?']},
    en:{intro:'As of September 7, 2026, October international fuel surcharges face predominantly flat-to-upward pressure, with a sharp retreat in cut prospects. Singapore Jet Fuel rebounded from $142.93 on Aug 27 to $159.58/bbl on Sept 3; the IATA global weekly average rose to $171.01 (+9%). A stronger won at USD/KRW 1,340.5 may limit the increase in actual KRW charges. October stages and amounts remain unconfirmed.',foot:'* $149.29 is September’s confirmed calculation average (July 16–Aug 15, 355.46 cents/gal). $159.58 is the Sept 3 Singapore market flat price; $171.01 is the IATA/S&P Global Platts global weekly average. October MOPS and average FX for Aug 16–Sept 15 are still being compiled.',confidence:'Confidence: low-to-medium, approaching medium · October stage and amounts unconfirmed',status:'September Level 21 applies · October Korea-departure international notices not confirmed · calculation tracked',note:'Surcharges apply by ticketing date. This outlook analyses public market data; confirm actual charges in each airline’s official notice.',updated:'Last updated',faqTitle:'October surcharge questions',source:'Sources',analysis:'October impact',questions:['Will October international surcharges rise?','Why has the outlook moved up since last week?','Can charges rise while USD/KRW falls?','Is $159.58 the October MOPS average?','Has Hormuz returned to normal?']},
    ja:{intro:'2026年9月7日時点で、10月国際線燃油サーチャージは横ばい～上昇圧力が優勢となり、引き下げ可能性は大きく後退しました。Singapore Jet Fuelは8/27の$142.93から9/3の$159.58/bblへ反発し、IATA世界週平均も$171.01（+9%）へ上昇。USD/KRW 1,340.5のウォン高は実際のウォン建て負担の上昇幅を抑える可能性があります。段階・金額は未確定です。',foot:'* $149.29は9月確定算定平均（7/16～8/15、355.46 cents/gal）。$159.58は9/3のSingapore市場価格、$171.01はIATA/S&P Global Platts世界週平均です。10月MOPSと平均為替は8/16～9/15を集計中です。',confidence:'信頼度: 低～中、中程度に接近 · 10月の段階・金額は未確定',status:'9月21段階適用中 · 10月韓国発国際線公式公示未確認 · 算定期間追跡中',note:'燃油サーチャージは発券日基準です。公開市場資料に基づく分析であり、実際の金額は各社公式公示をご確認ください。',updated:'最終更新',faqTitle:'10月燃油サーチャージのよくある質問',source:'出典',analysis:'10月への影響',questions:['10月国際線燃油サーチャージは上がりますか？','先週より見通しを引き上げた理由は？','為替が下がっても金額は上がりますか？','$159.58は10月MOPS平均ですか？','ホルムズは正常化しましたか？']},
    zh:{intro:'截至2026年9月7日，10月国际线燃油附加费持平至上涨压力占优，下调可能性明显减弱。Singapore Jet Fuel从8/27的$142.93反弹至9/3的$159.58/bbl，IATA全球周均升至$171.01（+9%）。USD/KRW 1,340.5所体现的韩元走强可能限制实际韩元收费涨幅。10月档位与金额仍未确认。',foot:'* $149.29是9月确定计算均值（7/16至8/15，355.46 cents/gal）。$159.58是9/3 Singapore市场价格，$171.01是IATA/S&P Global Platts全球周均。10月MOPS与平均汇率仍按8/16至9/15汇总。',confidence:'可信度: 低至中、接近中等 · 10月档位与金额未确认',status:'9月第21档适用中 · 10月韩国出发国际线官方公告未确认 · 计算期追踪中',note:'附加费按出票日适用。本展望分析公开市场数据，实际金额请确认各航空公司官方公告。',updated:'最后更新',faqTitle:'10月燃油附加费常见问题',source:'来源',analysis:'10月影响',questions:['10月国际线燃油附加费会上涨吗？','为何比上周上调展望？','汇率下降时金额仍可能上涨吗？','$159.58是10月MOPS均值吗？','霍尔木兹恢复正常了吗？']},
    fr:{intro:'Au 7 septembre 2026, la stabilité ou la hausse des surtaxes internationales d’octobre est privilégiée; une baisse devient nettement moins probable. Singapore Jet Fuel a rebondi de $142.93 le 27 août à $159.58/bbl le 3 septembre; la moyenne mondiale hebdomadaire IATA atteint $171.01 (+9%). Un won fort, avec USD/KRW à 1,340.5, peut limiter la hausse du montant payé en KRW. Niveaux et montants restent non confirmés.',foot:'* $149.29 est la moyenne confirmée de septembre (16 juillet–15 août, 355.46 cents/gal). $159.58 est le prix de marché Singapore du 3 septembre; $171.01 est la moyenne mondiale hebdomadaire IATA/S&P Global Platts. MOPS et change moyens d’octobre restent en calcul sur le 16 août–15 septembre.',confidence:'Confiance : faible à moyenne, proche de moyenne · niveaux et montants d’octobre non confirmés',status:'Septembre niveau 21 en vigueur · avis internationaux au départ de Corée pour octobre non confirmés · calcul suivi',note:'La date d’émission détermine la surtaxe. Cette analyse repose sur des données publiques; vérifiez les montants dans les avis officiels des compagnies.',updated:'Dernière mise à jour',faqTitle:'Questions sur la surtaxe d’octobre',source:'Sources',analysis:'Effet sur octobre',questions:['La surtaxe internationale d’octobre augmentera-t-elle ?','Pourquoi relever la perspective depuis la semaine dernière ?','Le montant peut-il monter quand USD/KRW baisse ?','$159.58 est-il le MOPS moyen d’octobre ?','Hormuz est-il revenu à la normale ?']},
    de:{intro:'Stand 7. September 2026 überwiegt bei internationalen Oktober-Zuschlägen eine stabile bis steigende Tendenz; eine Senkung ist deutlich unwahrscheinlicher. Singapore Jet Fuel stieg von $142.93 am 27. August auf $159.58/bbl am 3. September; das globale IATA-Wochenmittel erreichte $171.01 (+9%). Ein stärkerer Won bei USD/KRW 1,340.5 kann den Anstieg tatsächlicher KRW-Beträge begrenzen. Stufen und Beträge sind noch unbestätigt.',foot:'* $149.29 ist das bestätigte September-Berechnungsmittel (16. Juli–15. August, 355.46 cents/gal). $159.58 ist der Singapore-Marktpreis vom 3. September; $171.01 das globale IATA/S&P Global Platts-Wochenmittel. Oktober-MOPS und Durchschnittskurs werden für 16. August–15. September noch berechnet.',confidence:'Vertrauen: niedrig bis mittel, nähert sich mittel · Oktober-Stufen und Beträge unbestätigt',status:'September Stufe 21 gilt · internationale Oktober-Hinweise ab Korea nicht bestätigt · Berechnung läuft',note:'Maßgeblich ist das Ausstellungsdatum. Diese Analyse beruht auf öffentlichen Marktdaten; tatsächliche Beträge bitte in offiziellen Airline-Hinweisen prüfen.',updated:'Zuletzt aktualisiert',faqTitle:'Fragen zum Oktober-Zuschlag',source:'Quellen',analysis:'Oktober-Auswirkung',questions:['Steigt der internationale Oktober-Zuschlag?','Warum wurde der Ausblick seit letzter Woche angehoben?','Kann der Betrag bei fallendem USD/KRW steigen?','Ist $159.58 das Oktober-MOPS-Mittel?','Ist Hormuz wieder normal befahrbar?']}
  };
  var ui={
    ko:['항공권 예약 판단 가이드','관련 유류할증료 정보','8월 → 9월 유류할증료 비교','항공사별 9월 공시','한국 출발 유류할증료 조회','9월 공시와 10월 전망 뉴스','유류할증료 변동 그래프','유류할증료 계산 방법'],
    en:['Ticket booking considerations','Related surcharge information','August → September comparison','September airline notices','Korea-departure surcharges','September notices and October outlook news','Surcharge history graph','Surcharge calculation'],
    ja:['航空券予約の判断材料','関連サーチャージ情報','8月 → 9月比較','航空会社別9月公示','韓国発サーチャージ検索','9月公示と10月見通しニュース','サーチャージ推移グラフ','サーチャージ計算'],
    zh:['机票预订参考','相关附加费信息','8月 → 9月对比','各航司9月公告','韩国出发附加费查询','9月公告与10月展望新闻','附加费历史图表','附加费计算'],
    fr:['Éléments pour réserver','Informations associées','Comparaison août → septembre','Avis des compagnies de septembre','Surtaxes au départ de Corée','Avis septembre et actualités octobre','Graphique des surtaxes','Calcul des surtaxes'],
    de:['Hinweise zur Ticketbuchung','Weitere Zuschlagsinformationen','Vergleich August → September','September-Hinweise der Airlines','Zuschläge ab Korea','September-Hinweise und Oktober-Ausblick','Zuschlagsverlauf','Zuschlagsberechnung']
  };
  var packs = {};
  Object.keys(copy).forEach(function(l){
    var c=copy[l], r=rows[l];
    packs[l]={intro:c.intro,desc:c.intro,sub:date+' · '+c.status,newsSub:date+' · '+r[0][1],foot:c.foot,
      verdict1:c.status,verdict2:r[0][1]+' · '+r[0][2],verdictLong:c.confidence,
      keyVars:r.map(function(x){return x[0]+': '+x[1];}),officialNotice:date+' · KE/OZ/LJ/BX/TW/7C/ZE/RS/YP · '+c.status,
      note:c.note,officialDesc:c.note,notice:c.status,updatedLabel:c.updated,ui:ui[l],
      faq:c.questions.map(function(q,i){return {q:q,a:[c.intro,r[2][1]+' '+r[2][2],r[1][2]+' '+r[0][2],c.foot,r[4][1]+' '+r[4][2]][i]};}),faqTitle:c.faqTitle};
  });
  Object.keys(packs).forEach(function(l){
    packs[l].newsMeta = ui[l][5]+' | MOPS · USD/KRW';
    packs[l].forecastBtn = ({ko:'10월 전망 보기',en:'View October outlook',ja:'10月見通しを見る',zh:'查看10月展望',fr:'Voir la perspective d’octobre',de:'Oktober-Ausblick ansehen'})[l];
    packs[l].verdictTitle=({ko:'2026년 10월 전망 결론',en:'October 2026 conclusion',ja:'2026年10月見通しの結論',zh:'2026年10月展望结论',fr:'Conclusion pour octobre 2026',de:'Fazit für Oktober 2026'})[l];
    packs[l].keyTitle=({ko:'주요 확인 항목',en:'Key indicators',ja:'主要確認項目',zh:'核心指标',fr:'Indicateurs clés',de:'Wichtige Indikatoren'})[l];
  });
  var sources = [
    ['Sparta Commodities','https://www.spartacommodities.com/market-outlook/'],
    ['IATA / S&P Global Platts','https://www.iata.org/en/publications/economics/fuel-monitor/'],
    ['Reuters','https://uk.marketscreener.com/news/oil-extends-gains-after-us-and-iran-strike-ships-ce785bdbdd8cf42d'],
    ['Reuters / Kpler','https://www.gulf-times.com/article/731298/business/shipping-slows-through-strait-of-hormuz-after-tanker-attacks'],
    ['연합뉴스 / Yonhap','https://stock.mk.co.kr/news/view/1154690'],
    ['AP','https://apnews.com/article/a52beec77dc90af3d040d0553837ad20'],
    ['Xinhua','https://en.people.cn/n3/2026/0907/c90000-20496645.html'],
    ['OPEC','https://www.opec.org/pr-detail/613-6-september-2026.html'],
    ['Reuters','https://uk.marketscreener.com/news/ship-fuel-shortage-looms-as-refiners-strained-by-war-favour-other-products-ce785bdbdd8cff21']
  ];
  var headlines={
    ko:['Singapore Jet Fuel $159.58…8월 말 대비 급반등','글로벌 Jet Fuel $171.01…주간 9% 상승','미국·이란, 상업용 유조선 공격 발표…해상 위험 확대','호르무즈 공개추적 10일 평균 10척…5월 이후 최저','원/달러 1,340.5원…원화 부과액 상승폭 완충','이란, 신규 제한구역 발표 예고','이란·오만 통항로 협의 주장…정상화는 미확인','OPEC+ 10월 생산정책 유지…새 추가증산 없음','선박연료 부족 우려…운임·운송비 상방 위험'],
    en:['Singapore Jet Fuel rebounds to $159.58 from late August','Global Jet Fuel $171.01: weekly increase of 9%','U.S. and Iran report commercial tanker attacks','Hormuz public 10-day average at 10 ships: lowest since May','USD/KRW 1,340.5 may cushion KRW surcharge increases','Iran plans to announce a new restricted zone','Iran claims Oman corridor talks; normalisation unconfirmed','OPEC+ maintains October production policy','Ship-fuel shortage concerns add freight-cost risk'],
    ja:['Singapore Jet Fuel $159.58、8月末から反発','世界Jet Fuel $171.01、週間9%上昇','米国・イランが商業用タンカー攻撃を発表','ホルムズ公開追跡10日平均10隻、5月以来の低水準','USD/KRW 1,340.5、ウォン建て負担増を緩和','イラン、新たな制限区域の発表を予告','イランがオマーン航路協議を主張、正常化は未確認','OPEC+、10月生産方針を維持','船舶燃料不足への懸念、運賃上昇リスク'],
    zh:['Singapore Jet Fuel反弹至$159.58','全球Jet Fuel $171.01，周涨9%','美国与伊朗宣布商用油轮袭击','霍尔木兹公开追踪10日均10艘，5月以来最低','USD/KRW 1,340.5缓冲韩元附加费涨幅','伊朗预告新限制区','伊朗称与阿曼协商航道，正常化未确认','OPEC+维持10月生产政策','船用燃料短缺担忧增加运费风险'],
    fr:['Singapore Jet Fuel rebondit à $159.58','Jet Fuel mondial à $171.01, +9% sur la semaine','États-Unis et Iran annoncent des attaques de pétroliers','Hormuz : moyenne publique sur 10 jours de 10 navires','USD/KRW à 1,340.5 amortit le montant en KRW','L’Iran prévoit une nouvelle zone restreinte','L’Iran évoque un corridor avec Oman, sans normalisation confirmée','OPEC+ maintient la production d’octobre','Risque de pénurie de combustible maritime et de hausse du fret'],
    de:['Singapore Jet Fuel steigt auf $159.58','Globales Jet Fuel bei $171.01, wöchentlich +9%','USA und Iran melden Angriffe auf Handelstanker','Hormuz: öffentliches 10-Tage-Mittel bei 10 Schiffen','USD/KRW 1,340.5 dämpft KRW-Zuschläge','Iran plant neue Sperrzone','Iran meldet Oman-Korridorgespräche, Normalisierung unbestätigt','OPEC+ behält Oktober-Förderpolitik bei','Schiffstreibstoffknappheit erhöht Frachtrisiko']
  };
  // Each entry has a dated factual brief and a separate analytical implication.
  var details={
    ko:[
      ['Sparta의 9월 3일 Singapore Jet Fuel flat price는 $159.58/bbl입니다.','8/27 $142.93보다 $16.65, 9월 확정 산정평균 $149.29보다 $10.29 높습니다. Sparta의 주간 변화 +$9.61은 별도 비교 기준이며 두 날짜 차이와 혼동하지 않습니다. 10월 누적 MOPS 평균은 집계 중입니다.'],
      ['IATA/S&P Global Platts 주간평균은 $171.01/bbl, 전주 대비 +9.0%입니다.','글로벌 지역별 가격을 반영한 주간평균으로 Singapore MOPS가 아닙니다. 직전 주간 $156.85에서 상승했으며 항공유 전반의 반등을 보여줍니다.'],
      ['9월 7일 Reuters 보도: 미 중부사령부는 이란 원유 유조선 3척 공격을 발표했습니다.','이란 혁명수비대도 유조선과 미국 관련 선박 공격을 주장했습니다. 양측 발표와 독립 확인은 구분합니다. Kharg Island는 이란 핵심 원유수출 거점으로, 상업선박 직접 공격은 공급·보험 위험을 높입니다.'],
      ['9월 7일 Kpler 공개 추적 commodity vessel의 10일 평균은 하루 약 10척입니다.','주말 토요일 2척·일요일 6척은 갱신 집계로, 초기 보도 수치와 다를 수 있습니다. 수요일 이후 VLCC 출항 미확인도 공개 추적 범위이며 AIS 비활성 선박을 포함한 전체 통항량은 아닙니다.'],
      ['9월 7일 서울 외환시장 15:30 기준 USD/KRW는 1,340.5원입니다.','장중 저점은 약 1,334.7원, 100엔은 약 861원 수준입니다. 현물환율은 산정기간 평균환율과 다릅니다. 단계가 보합 또는 상승해도 평균환율 하락은 실제 KRW 금액의 상승폭을 줄일 수 있습니다.'],
      ['이란은 며칠 안에 호르무즈 인근 제한구역을 발표하겠다고 예고했습니다.','진입 선박에 대한 제재 경고가 있지만 구역 지도·시행이 확인되기 전에는 발표 예정으로 봅니다. 통제 강화 가능성이 해상운송의 불확실성을 높입니다.'],
      ['이란 측은 오만과 새 국제 통항로를 협의하고 있다고 밝혔습니다.','새 지도 발표·서명을 추진한다는 이란 측 설명이며 실제 통항 정상화를 의미하지 않습니다. 제한구역 강화와 협상이 병행되고 있어 단기 완화 효과는 조건부입니다.'],
      ['OPEC+ 7개국은 9월 6일 회의에서 10월 생산정책 유지를 결정했습니다.','9월 요구 생산량을 10월에도 유지한다는 공식 결정입니다. 새 감산 발표가 아니며 새로운 추가증산에 따른 즉각적인 공급 완화도 없습니다.'],
      ['9월 7일 Reuters는 정유·운송 차질 속 선박연료 공급 부족 우려를 보도했습니다.','선박연료는 Jet Fuel과 다른 제품입니다. 부족은 선박 연료비와 운임을 통해 원유·정제품 운송비에 간접 영향을 줄 수 있으며 MOPS의 직접 산정값으로 사용하지 않습니다.']
    ],
    en:[
      ['Sparta reports a Sept 3 Singapore Jet Fuel flat price of $159.58/bbl.','This is $16.65 above Aug 27’s $142.93 and $10.29 above September’s $149.29 calculation average. Sparta’s +$9.61 weekly comparison uses a separate reference. October cumulative MOPS is still being compiled.'],
      ['The IATA/S&P Global Platts weekly average is $171.01/bbl, up 9.0%.','This global regional-price average is not Singapore MOPS. It follows $156.85 in the previous weekly reading and signals a broader jet-fuel rebound.'],
      ['Reuters on Sept 7 reports CENTCOM announced strikes on three Iranian oil tankers.','Iran’s Revolutionary Guards also claimed attacks on tankers and U.S.-linked vessels. These are attributed statements, not independent confirmation of every claim. Kharg Island is a key Iranian oil-export hub.'],
      ['Kpler’s publicly tracked commodity-vessel 10-day average is about 10 per day on Sept 7.','Updated weekend counts were Saturday 2 and Sunday 6; preliminary reports differed. No outbound VLCC confirmed since Wednesday refers to public tracking, not proof that no vessel passed. AIS-dark traffic may be absent.'],
      ['USD/KRW was 1,340.5 at the Seoul market’s Sept 7, 15:30 reference.','The intraday low was around 1,334.7; JPY 100 was near KRW 861. Spot FX is not the calculation-period average. A lower average exchange rate can limit KRW increases even if the fuel-based stage stays flat or rises.'],
      ['Iran said it plans to announce a restricted zone near Hormuz in the coming days.','Sanctions were threatened against entering vessels. Until a map and implementation are confirmed, this remains a planned measure that adds shipping uncertainty.'],
      ['Iran said it was discussing a new international shipping corridor with Oman.','The planned map and signature are an Iranian account, not confirmation of restored traffic. Corridor talks coexist with tighter restrictions, making any relief conditional.'],
      ['Seven OPEC+ countries maintained October production policy at their Sept 6 meeting.','The official decision carries September required production into October. It is not a new cut, and provides no new additional production increase.'],
      ['Reuters on Sept 7 reported ship-fuel shortage concerns amid refining and transport disruption.','Marine fuel is a different product from jet fuel. Scarcity can raise bunker costs and freight, indirectly affecting crude and refined-product transport. It is not a direct MOPS calculation input.']
    ],
    ja:[
      ['Spartaによる9/3 Singapore Jet Fuel市場価格は$159.58/bblです。','8/27の$142.93より$16.65、9月算定平均$149.29より$10.29高い水準です。Spartaの週間+$9.61は別の比較基準です。10月累積MOPSは集計中です。'],
      ['IATA/S&P Global Platts世界週平均は$171.01/bbl、前週比+9.0%です。','地域価格を集計した世界平均でSingapore MOPSではありません。前週$156.85から上昇し、航空燃料全体の反発を示します。'],
      ['9/7 Reutersによると米中央軍はイラン原油タンカー3隻への攻撃を発表しました。','イラン革命防衛隊もタンカーと米国関連船舶への攻撃を主張しました。各側の発表と独立確認は区別します。Kharg Islandはイランの主要原油輸出拠点です。'],
      ['9/7 Kpler公開追跡の貨物船10日平均は約10隻/日です。','更新後の週末値は土2隻・日6隻で、初期報道と異なる場合があります。水曜以降VLCC出航未確認は公開追跡の範囲であり、AIS非作動船を含む全通航数ではありません。'],
      ['9/7ソウル市場15:30基準USD/KRWは1,340.5です。','日中安値は約1,334.7、100円は約861ウォンです。直物は算定平均ではありません。段階が横ばい・上昇でも、平均為替低下でウォン建て増額が抑えられる可能性があります。'],
      ['イランは数日以内にホルムズ近辺の制限区域を発表すると予告しました。','進入船舶への制裁を警告していますが、地図・実施が確認されるまでは予定として扱います。海上輸送の不確実性を高めます。'],
      ['イラン側はオマーンと新国際航路を協議中と述べました。','地図発表・署名の推進はイラン側の説明で、通航回復の確認ではありません。規制強化と協議が同時進行し、緩和効果は条件付きです。'],
      ['OPEC+7か国は9/6会合で10月生産方針を維持しました。','9月の要求生産量を10月も維持する公式決定です。新たな減産ではなく、追加増産による新たな供給緩和もありません。'],
      ['9/7 Reutersは精製・輸送障害に伴う船舶燃料不足懸念を報道しました。','船舶燃料と航空燃料は別製品です。燃料費・運賃上昇を通じて原油・製品輸送に間接影響しますが、MOPS直接算定値ではありません。']
    ],
    zh:[
      ['Sparta公布9/3 Singapore Jet Fuel市场价格为$159.58/bbl。','比8/27的$142.93高$16.65，比9月计算均值$149.29高$10.29。Sparta周度+$9.61使用另一比较基准。10月累计MOPS仍在汇总。'],
      ['IATA/S&P Global Platts全球周均为$171.01/bbl，周涨9.0%。','这是地区价格汇总的全球均值，不是Singapore MOPS。前周为$156.85，变化反映更广泛的航油反弹。'],
      ['9/7 Reuters报道美国中央司令部宣布袭击三艘伊朗原油油轮。','伊朗革命卫队也声称袭击油轮与美国相关船只。各方说法不等于每项均获独立证实。Kharg Island是伊朗主要原油出口枢纽。'],
      ['9/7 Kpler公开追踪商品船10日均约10艘/日。','更新后周末数据为周六2艘、周日6艘，可能与初步报道不同。周三以来未确认VLCC驶出仅限公开追踪，不代表含关闭AIS船只的总通行量。'],
      ['9/7首尔市场15:30基准USD/KRW为1,340.5。','盘中低点约1,334.7，100日元约861韩元。即期汇率不是计算期均值。即使档位持平或上升，平均汇率下降也可能限制韩元金额涨幅。'],
      ['伊朗称将在数日内宣布霍尔木兹附近限制区。','伊朗警告制裁进入船只，但地图与实施确认前仍为计划，增加海运不确定性。'],
      ['伊朗方面表示正在与阿曼商议新国际航道。','地图发布及签署计划属于伊朗说法，并不确认恢复通行。监管收紧与谈判并行，缓解作用仍有条件。'],
      ['OPEC+七国在9/6会议维持10月生产政策。','官方决定将9月要求产量延续至10月。不是新减产，也没有新的额外增产带来供应缓解。'],
      ['9/7 Reuters报道炼油与运输受阻带来的船用燃料短缺担忧。','船用燃料与航油是不同产品。短缺可通过燃料费和运费间接影响原油及成品油运输，不是MOPS直接计算数据。']
    ],
    fr:[
      ['Sparta indique $159.58/bbl pour le prix Singapore Jet Fuel du 3 septembre.','Cela dépasse de $16.65 les $142.93 du 27 août et de $10.29 la moyenne septembre de $149.29. La variation hebdomadaire Sparta de +$9.61 utilise une autre référence. Le MOPS cumulé d’octobre reste en calcul.'],
      ['La moyenne mondiale hebdomadaire IATA/S&P Global Platts atteint $171.01/bbl, +9.0%.','Cette moyenne de prix régionaux n’est pas Singapore MOPS. Elle suit $156.85 la semaine précédente et signale un rebond plus large du kérosène.'],
      ['Reuters rapporte le 7 septembre que CENTCOM a annoncé des frappes sur trois pétroliers iraniens.','Les Gardiens de la révolution revendiquent aussi des attaques contre des pétroliers et navires liés aux États-Unis. Ces déclarations ne valent pas confirmation indépendante de chaque fait. Kharg est un grand terminal pétrolier iranien.'],
      ['Au 7 septembre, Kpler suit environ 10 navires de marchandises par jour en moyenne sur dix jours.','Les comptes actualisés du week-end sont samedi 2 et dimanche 6; les premiers chiffres différaient. Aucune sortie VLCC confirmée depuis mercredi concerne le suivi public, pas tous les navires, notamment AIS éteint.'],
      ['USD/KRW vaut 1,340.5 à la référence de Séoul du 7 septembre à 15:30.','Le plus bas est proche de 1,334.7; 100 JPY valent environ 861 KRW. Le comptant n’est pas la moyenne de calcul. Un change moyen inférieur peut amortir le montant en KRW même si le niveau carburant monte.'],
      ['L’Iran prévoit une zone restreinte près d’Hormuz dans les prochains jours.','Il menace les navires entrants de sanctions. Sans carte et mise en œuvre confirmées, il s’agit d’un projet ajoutant de l’incertitude maritime.'],
      ['L’Iran affirme discuter d’un corridor international avec Oman.','La carte et sa signature restent un projet décrit par l’Iran, pas une reprise du trafic confirmée. Restrictions et négociations coexistent; le soulagement reste conditionnel.'],
      ['Sept pays OPEC+ ont maintenu la politique de production d’octobre le 6 septembre.','La décision officielle conserve la production requise de septembre. Ce n’est ni une nouvelle réduction ni une augmentation supplémentaire.'],
      ['Reuters évoque le 7 septembre une pénurie de combustible maritime liée aux perturbations du raffinage et du transport.','Ce combustible diffère du kérosène. Sa rareté peut augmenter le fret et affecter indirectement le transport du brut et des produits; ce n’est pas une donnée directe du MOPS.']
    ],
    de:[
      ['Sparta nennt $159.58/bbl als Singapore-Jet-Fuel-Marktpreis vom 3. September.','Das liegt $16.65 über $142.93 vom 27. August und $10.29 über dem September-Mittel von $149.29. Spartas Wochenvergleich +$9.61 hat eine andere Basis. Das Oktober-MOPS-Mittel wird noch berechnet.'],
      ['Das globale IATA/S&P-Global-Platts-Wochenmittel beträgt $171.01/bbl, +9.0%.','Dieser Durchschnitt regionaler Preise ist kein Singapore MOPS. Nach $156.85 in der Vorwoche zeigt er eine breitere Kerosinerholung.'],
      ['Reuters berichtet am 7. September, CENTCOM habe Angriffe auf drei iranische Öltanker bekanntgegeben.','Irans Revolutionsgarden beanspruchen ebenfalls Angriffe auf Tanker und US-bezogene Schiffe. Diese Aussagen bestätigen nicht unabhängig jeden Vorgang. Kharg ist ein wichtiger iranischer Ölexportstandort.'],
      ['Kpler erfasst am 7. September öffentlich etwa 10 Frachtschiffe täglich im Zehntagesmittel.','Aktualisierte Wochenendwerte: Samstag 2, Sonntag 6; erste Berichte wichen ab. Seit Mittwoch keine bestätigte VLCC-Ausfahrt bezieht sich auf öffentliches Tracking, nicht auf alle Schiffe einschließlich abgeschaltetem AIS.'],
      ['USD/KRW lag zur Seouler Referenz am 7. September um 15:30 bei 1,340.5.','Tagestief etwa 1,334.7; 100 JPY etwa 861 KRW. Kassakurs und Berechnungsmittel unterscheiden sich. Ein niedrigerer Durchschnittskurs kann KRW-Anstiege trotz stabiler oder höherer Kerosinstufe dämpfen.'],
      ['Iran kündigt eine Sperrzone nahe Hormuz für die kommenden Tage an.','Einfahrenden Schiffen drohen laut Iran Sanktionen. Bis Karte und Umsetzung bestätigt sind, bleibt dies eine geplante Maßnahme mit zusätzlicher Unsicherheit.'],
      ['Iran meldet Gespräche mit Oman über einen internationalen Korridor.','Karte und Unterzeichnung sind iranische Angaben, keine bestätigte Verkehrserholung. Gespräche und strengere Beschränkungen laufen gleichzeitig; Entlastung bleibt bedingt.'],
      ['Sieben OPEC+-Länder behielten am 6. September die Oktober-Förderpolitik bei.','Die offizielle Entscheidung übernimmt die geforderte September-Fördermenge. Es ist keine neue Kürzung und keine neue zusätzliche Erhöhung.'],
      ['Reuters meldet am 7. September Sorgen vor Schiffstreibstoffknappheit durch Raffinerie- und Transportstörungen.','Schiffstreibstoff ist ein anderes Produkt als Kerosin. Knappheit kann Frachtkosten und indirekt Rohöl- und Produkttransport verteuern; sie ist kein direkter MOPS-Eingabewert.']
    ]
  };
  var ids=['singapore-jet-rebound','global-jet-weekly','commercial-tanker-attacks','hormuz-traffic','usdkrw','restricted-zone','oman-corridor','opec-policy','marine-fuel'];
  var newsCards=ids.map(function(id,i){
    var card={id:id+'-20260907',category:i===7?'institution':'market',priority:i+1,date:'2026-09-07',updatedAt:'2026-09-07T20:30:00+09:00',aiSummary:true,relevanceScore:1-i/100,sourceUrl:sources[i][1],i18n:{}};
    Object.keys(copy).forEach(function(l){
      var d=details[l][i], impact=rows[l][[2,2,4,4,1,4,4,3,4][i]][2];
      card.i18n[l]={title:headlines[l][i],aiBrief:d[0],summary:d[1],impact:impact,sourceName:sources[i][0].replace('연합뉴스 / ',''),tags:[],links:[{href:'forecast.html',label:copy[l].analysis}],faq:[]};
    });
    card.i18n.cn=card.i18n.zh;
    return card;
  });
  window.AERO_MARKET_RELEASE={numbers:numbers,rows:rows,packs:packs,newsCards:newsCards,sources:sources,modified:'2026-09-07T20:30:00+09:00'};
  window.AERO_MARKET_NUMBERS_20260907=numbers;
})();
