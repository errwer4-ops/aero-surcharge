(function(){
  'use strict';
  var base=window.AERO_MARKET_RELEASE;
  if(!base) return;
  var date='2026.09.10 19:34 KST';
  var rows={
    ko:[
      ['10월 종합','상승 압력 우세 · 보합 가능성 잔존','인하 가능성 낮음. 방향성 신뢰도 보통, 정확한 단계 예측 신뢰도 낮음. 강한 원화가 실제 KRW 상승폭을 제한할 수 있습니다.'],
      ['USD/KRW','현재 약 1,342.17원 · 100엔 약 872.35원 · 산정기간 평균환율 집계 중','원화 부과액의 강한 하방 ↓↓↓. 현물환율은 8/16~9/15 평균환율과 다르며 단계 자체를 직접 낮추는 변수가 아닙니다.'],
      ['Singapore Jet Fuel / MOPS','9/3 시장 참고가격 $159.58/bbl · 9월 확정 산정평균 $149.29 · 글로벌 주간평균 $171.01(+9%)','최근 단일 시장값은 9월 기준선보다 $10.29 높아 항공유 상방 ↑↑↑. 10월 누적 MOPS 평균은 집계 중입니다.'],
      ['국제유가','Brent 약 $101.61 · WTI 약 $96.54 · Brent $100 돌파 후 $101대','미·이란 해상충돌과 공급차질 위험으로 매우 강한 상승 압력 ↑↑↑. 지속 여부는 산정 종료까지 확인합니다.'],
      ['호르무즈·정제품 공급','Kpler 공개 AIS 예비집계: 수요일 7척 · 수정 전날 12척 · 10일 평균 14척 · Fujairah 재고 +56%, middle distillate +31%','통항·상선·제한구역 위험 ↑↑↑. 재고와 우회 공급망은 완충 ↓↓이나 정상화는 아닙니다. 예비치는 수정될 수 있습니다.']
    ],
    en:[
      ['October outlook','Upward pressure dominates · flat outcome remains possible','Cut probability is low. Direction confidence is medium; exact-stage confidence is low. A strong won may limit the increase in actual KRW charges.'],
      ['USD/KRW','About 1,342.17 now · JPY 100 about KRW 872.35 · calculation-period average being compiled','Strong downward cushion for KRW amounts ↓↓↓. Spot FX differs from the Aug 16–Sept 15 average and does not directly set the stage.'],
      ['Singapore Jet Fuel / MOPS','Sept 3 market reference $159.58/bbl · confirmed September average $149.29 · global weekly average $171.01 (+9%)','The single market quote is $10.29 above the September baseline: jet fuel upside ↑↑↑. October cumulative MOPS remains under compilation.'],
      ['Crude oil','Brent about $101.61 · WTI about $96.54 · Brent holds in the $101s after crossing $100','U.S.–Iran maritime conflict and supply risk create very strong upward pressure ↑↑↑. Persistence will be tracked through period end.'],
      ['Hormuz and refined supply','Kpler public AIS preliminary count: Wednesday 7 · revised prior day 12 · 10-day average 14 · Fujairah stocks +56%, middle distillates +31%','Traffic, vessel and restricted-zone risk ↑↑↑. Stocks and rerouting cushion ↓↓ but do not indicate normalization; preliminary counts may change.']
    ],
    ja:[
      ['10月総合','上昇圧力が優勢 · 横ばいの可能性は残る','引き下げ可能性は低い。方向性の信頼度は中、正確な段階予測は低い。ウォン高が実際のKRW上昇幅を抑える可能性があります。'],
      ['USD/KRW','現在約1,342.17 · 100円約872.35ウォン · 算定期間平均は集計中','KRW金額への強い下方緩衝↓↓↓。直物は8/16～9/15平均と異なり、段階を直接決めません。'],
      ['Singapore Jet Fuel / MOPS','9/3市場参考値$159.58/bbl · 9月確定平均$149.29 · 世界週平均$171.01（+9%）','単日値は9月基準を$10.29上回り航空燃料は上方向↑↑↑。10月累積MOPSは集計中です。'],
      ['国際原油','Brent約$101.61 · WTI約$96.54 · Brentは$100突破後$101台','米・イラン海上衝突と供給リスクで非常に強い上昇圧力↑↑↑。算定終了まで持続性を確認します。'],
      ['ホルムズ・石油製品供給','Kpler公開AIS暫定値: 水曜7隻 · 修正前日12隻 · 10日平均14隻 · Fujairah在庫+56%、中間留分+31%','通航・船舶・制限区域リスク↑↑↑。在庫と迂回は緩衝↓↓ですが正常化ではなく、暫定値は修正され得ます。']
    ],
    zh:[
      ['10月综合','上涨压力占优 · 仍存在持平可能','下调可能性低。方向可信度中等，准确档位可信度低。韩元走强可能限制实际KRW涨幅。'],
      ['USD/KRW','当前约1,342.17 · 100日元约872.35韩元 · 计算期均值汇总中','韩元金额的强下行缓冲↓↓↓。即期不同于8/16至9/15均值，也不直接决定档位。'],
      ['Singapore Jet Fuel / MOPS','9/3市场参考价$159.58/bbl · 9月确定均值$149.29 · 全球周均$171.01（+9%）','单日价格高于9月基准$10.29，航油上行↑↑↑。10月累计MOPS仍在汇总。'],
      ['国际油价','Brent约$101.61 · WTI约$96.54 · Brent突破$100后维持$101区间','美伊海上冲突及供应风险形成极强上涨压力↑↑↑。将跟踪至计算期结束。'],
      ['霍尔木兹与成品油供应','Kpler公开AIS初步统计: 周三7艘 · 修订前日12艘 · 10日均14艘 · Fujairah库存+56%、中间馏分+31%','通行、商船及限制区风险↑↑↑。库存和绕行形成缓冲↓↓，但并非正常化；初值可能修订。']
    ],
    fr:[
      ['Bilan octobre','Pression haussière dominante · stabilité encore possible','Probabilité de baisse faible. Confiance directionnelle moyenne, confiance sur le niveau exact faible. Le won fort peut limiter la hausse en KRW.'],
      ['USD/KRW','Environ 1,342.17 · 100 JPY ≈ 872.35 KRW · moyenne de calcul en cours','Fort amortisseur baissier pour le montant KRW ↓↓↓. Le comptant diffère de la moyenne du 16/8 au 15/9 et ne fixe pas directement le niveau.'],
      ['Singapore Jet Fuel / MOPS','Référence du 3/9 $159.58/bbl · moyenne septembre confirmée $149.29 · moyenne mondiale $171.01 (+9%)','Le prix ponctuel dépasse la base de $10.29: pression kérosène ↑↑↑. Le MOPS cumulé d’octobre reste en calcul.'],
      ['Pétrole','Brent env. $101.61 · WTI env. $96.54 · Brent dans les $101 après avoir franchi $100','Le conflit maritime États-Unis–Iran et le risque d’offre créent une très forte pression ↑↑↑. La durée sera suivie jusqu’à la clôture.'],
      ['Hormuz et produits raffinés','Décompte AIS préliminaire Kpler: mercredi 7 · veille révisée 12 · moyenne 10 jours 14 · stocks Fujairah +56%, distillats moyens +31%','Risques trafic, navires et zone restreinte ↑↑↑. Stocks et détours amortissent ↓↓ sans normalisation; les chiffres préliminaires peuvent changer.']
    ],
    de:[
      ['Oktober gesamt','Aufwärtsdruck dominiert · stabiles Ergebnis bleibt möglich','Senkungswahrscheinlichkeit niedrig. Richtungsvertrauen mittel, exakte Stufe niedrig. Der starke Won kann den KRW-Anstieg begrenzen.'],
      ['USD/KRW','Aktuell etwa 1,342.17 · 100 JPY etwa 872.35 KRW · Periodenmittel wird ermittelt','Starker Abwärtspuffer für KRW-Beträge ↓↓↓. Kassakurs und Mittel 16.8.–15.9. sind getrennt; der Kurs setzt die Stufe nicht direkt.'],
      ['Singapore Jet Fuel / MOPS','Marktreferenz 3.9. $159.58/bbl · bestätigtes September-Mittel $149.29 · global $171.01 (+9%)','Einzelwert $10.29 über September-Basis: Kerosin aufwärts ↑↑↑. Kumuliertes Oktober-MOPS wird noch ermittelt.'],
      ['Rohöl','Brent ca. $101.61 · WTI ca. $96.54 · Brent nach Überschreiten von $100 in den $101ern','US-iranischer Seekonflikt und Angebotsrisiko erzeugen sehr starken Aufwärtsdruck ↑↑↑. Dauer wird bis Periodenende verfolgt.'],
      ['Hormuz und Raffinerieprodukte','Vorläufige öffentliche Kpler-AIS-Zählung: Mittwoch 7 · Vortag revidiert 12 · 10-Tage-Mittel 14 · Fujairah +56%, Mitteldestillate +31%','Verkehrs-, Schiffs- und Sperrzonenrisiko ↑↑↑. Bestände und Umleitung puffern ↓↓, sind aber keine Normalisierung; Vorabzahlen können sich ändern.']
    ]
  };
  var intro={
    ko:'2026년 9월 10일 기준 10월 국제선 유류할증료는 상승 압력이 우세해졌습니다. 9월 3일 Singapore Jet Fuel 시장 참고가격 $159.58/bbl는 현재 적용 중인 9월 산정평균 $149.29를 웃돌고, 글로벌 Jet Fuel도 $171.01/bbl로 주간 9% 상승했습니다. Brent는 약 $101.61로 $100을 돌파했습니다. 반면 원/달러 약 1,342원과 Fujairah 정제품 재고 증가는 실제 원화 부과액의 상승폭을 일부 제한합니다. 10월 단계와 금액은 아직 확정되지 않았습니다.',
    en:'As of September 10, 2026, upward pressure dominates the October international fuel-surcharge outlook. The Sept 3 Singapore Jet Fuel market reference of $159.58/bbl is above the confirmed September calculation average of $149.29, global Jet Fuel is $171.01/bbl after a 9% weekly rise, and Brent has crossed $100 to about $101.61. USD/KRW near 1,342 and higher Fujairah product stocks partly cushion actual KRW charges. October stages and amounts remain unconfirmed.',
    ja:'2026年9月10日時点で、10月国際線燃油サーチャージは上昇圧力が優勢です。9月3日のSingapore Jet Fuel市場参考値$159.58/bblは9月確定算定平均$149.29を上回り、世界Jet Fuelは週9%上昇の$171.01、Brentは$100を超え約$101.61です。一方USD/KRW約1,342とFujairah在庫増はKRW負担を一部緩和します。10月段階・金額は未確定です。',
    zh:'截至2026年9月10日，10月国际线燃油附加费上涨压力占优。9月3日Singapore Jet Fuel市场参考价$159.58/bbl高于9月确定计算均值$149.29，全球Jet Fuel周涨9%至$171.01，Brent突破$100至约$101.61。USD/KRW约1,342及Fujairah库存增加部分缓冲实际韩元收费。10月档位与金额尚未确认。',
    fr:'Au 10 septembre 2026, la pression haussière domine les surtaxes internationales d’octobre. Le Singapore Jet Fuel du 3 septembre à $159.58/bbl dépasse la moyenne confirmée de septembre à $149.29; le Jet Fuel mondial atteint $171.01 (+9% hebdo) et Brent a franchi $100 à environ $101.61. USD/KRW proche de 1,342 et les stocks de Fujairah amortissent en partie les montants KRW. Niveaux et montants d’octobre restent non confirmés.',
    de:'Stand 10. September 2026 dominiert Aufwärtsdruck beim internationalen Oktober-Zuschlag. Singapore Jet Fuel vom 3. September bei $159.58/bbl liegt über dem bestätigten September-Mittel von $149.29; globales Jet Fuel liegt bei $171.01 (+9% wöchentlich), Brent nach Überschreiten von $100 bei etwa $101.61. USD/KRW um 1,342 und höhere Fujairah-Bestände dämpfen KRW-Beträge. Oktober-Stufen und Beträge bleiben unbestätigt.'
  };
  var confidence={ko:'방향성 신뢰도: 보통 · 정확한 단계 예측 신뢰도: 낮음',en:'Direction confidence: medium · exact-stage confidence: low',ja:'方向性の信頼度: 中 · 正確な段階予測: 低',zh:'方向可信度: 中等 · 准确档位可信度: 低',fr:'Confiance directionnelle : moyenne · niveau exact : faible',de:'Richtungsvertrauen: mittel · exakte Stufe: niedrig'};
  var status={ko:'9월 21단계 현재 적용 · 10월 국제선 공식공시 전 · 산정 종료 임박',en:'September Level 21 applies · October international notices not yet published · calculation nearing end',ja:'9月21段階適用中 · 10月国際線公式公示前 · 算定終了間近',zh:'9月第21档适用中 · 10月国际线官方公告前 · 计算期临近结束',fr:'Septembre niveau 21 en vigueur · avis international octobre non publié · calcul presque terminé',de:'September Stufe 21 gilt · internationaler Oktober-Hinweis noch ausstehend · Berechnung fast beendet'};
  var packs={};
  Object.keys(rows).forEach(function(l){
    packs[l]=Object.assign({},base.packs[l],{
      intro:intro[l],desc:intro[l],sub:date+' · '+status[l],newsSub:date+' · '+rows[l][0][1],
      verdict1:status[l],verdict2:rows[l][0][1]+' · '+rows[l][0][2],verdictLong:confidence[l],
      keyVars:rows[l].map(function(x){return x[0]+': '+x[1];}),
      officialNotice:date+' · KE/OZ/LJ/BX/TW/7C/ZE/RS/YP · '+status[l]
    });
  });
  function card(id,priority,sourceUrl,text){
    var out={id:id,category:'market',priority:priority,date:'2026-09-10',updatedAt:'2026-09-10T19:34:00+09:00',aiSummary:true,relevanceScore:1,sourceUrl:sourceUrl,i18n:{}};
    Object.keys(text).forEach(function(l){out.i18n[l]=Object.assign({sourceName:'Reuters / S&P Global',tags:[],links:[{href:'forecast.html',label:packs[l].forecastBtn}],faq:[]},text[l]);});
    out.i18n.cn=out.i18n.zh; return out;
  }
  var texts={
    brent:{
      ko:{title:'Brent $100 돌파…$101대에서 고유가 지속',aiBrief:'Brent 약 $101.61, WTI 약 $96.54로 국제유가의 강한 상방 압력이 이어지고 있습니다.',summary:'미·이란 해상충돌과 호르무즈 공급차질 우려로 Brent가 $100/bbl을 넘어섰습니다. $100 이상이 영구히 유지된다는 의미는 아닙니다.',impact:'국제유가 상승은 Singapore Jet Fuel과 10월 국제선 유류할증료의 상방 위험을 높입니다.'},
      en:{title:'Brent crosses $100 and holds in the $101 range',aiBrief:'Brent is about $101.61 and WTI about $96.54, keeping crude pressure strongly upward.',summary:'U.S.–Iran maritime conflict and Hormuz supply concerns pushed Brent above $100/bbl. This does not imply a permanent price above $100.',impact:'Higher crude increases upside risk for Singapore Jet Fuel and October international surcharges.'},
      ja:{title:'Brentが$100突破、$101台で高値継続',aiBrief:'Brent約$101.61、WTI約$96.54で強い上昇圧力が続きます。',summary:'米・イラン海上衝突とホルムズ供給懸念でBrentは$100を突破しました。恒久的な$100超を意味しません。',impact:'原油高はSingapore Jet Fuelと10月国際線サーチャージの上方リスクを高めます。'},
      zh:{title:'Brent突破$100并维持在$101区间',aiBrief:'Brent约$101.61、WTI约$96.54，原油上行压力强劲。',summary:'美伊海上冲突及霍尔木兹供应忧虑推动Brent突破$100/bbl，但不代表永久维持该水平。',impact:'油价上涨提高Singapore Jet Fuel及10月国际线附加费的上行风险。'},
      fr:{title:'Brent franchit $100 et reste autour de $101',aiBrief:'Brent vaut environ $101.61 et WTI $96.54, maintenant une forte pression haussière.',summary:'Le conflit maritime États-Unis–Iran et le risque Hormuz ont poussé Brent au-dessus de $100/bbl, sans garantir un maintien permanent.',impact:'La hausse du brut accroît le risque pour le kérosène et les surtaxes internationales d’octobre.'},
      de:{title:'Brent überschreitet $100 und bleibt um $101',aiBrief:'Brent liegt bei etwa $101.61, WTI bei $96.54; der Aufwärtsdruck bleibt stark.',summary:'US-iranischer Seekonflikt und Hormuz-Sorgen trieben Brent über $100/bbl. Das bedeutet keinen dauerhaften Preis über $100.',impact:'Höheres Rohöl steigert das Risiko für Kerosin und internationale Oktober-Zuschläge.'}
    },
    hormuz:{
      ko:{title:'호르무즈 공개통항 7척…10일 평균의 절반 수준',aiBrief:'Kpler 공개 AIS 예비집계 수요일 7척, 수정 전날 12척, 10일 평균 14척입니다.',summary:'commodity vessel 공개추적 통항은 평균을 크게 밑돕니다. AIS 비활성 선박은 누락될 수 있으며 예비값은 후속 수정될 수 있습니다.',impact:'완전 봉쇄는 아니지만 정상 상업통항과 큰 차이가 있어 운항·보험 위험이 극도로 높습니다.'},
      en:{title:'Hormuz public count at 7, half the 10-day average',aiBrief:'Kpler public AIS preliminary data show Wednesday 7, revised prior day 12 and a 10-day average of 14.',summary:'Publicly tracked commodity-vessel traffic remains far below average. AIS-dark vessels may be absent and preliminary counts can be revised.',impact:'This is not a full blockade, but it remains far from normal commercial traffic and keeps shipping and insurance risk extremely high.'},
      ja:{title:'ホルムズ公開通航7隻、10日平均の半分',aiBrief:'Kpler公開AIS暫定値は水曜7隻、修正前日12隻、10日平均14隻です。',summary:'公開追跡貨物船は平均を大幅に下回ります。AIS非表示船は欠落し、暫定値は修正され得ます。',impact:'完全封鎖ではないものの通常商業通航とは大差があり、運航・保険リスクは極めて高い状態です。'},
      zh:{title:'霍尔木兹公开通行7艘，仅为10日均值一半',aiBrief:'Kpler公开AIS初值为周三7艘、修订前日12艘、10日均14艘。',summary:'公开追踪商品船大幅低于均值。关闭AIS的船舶可能遗漏，初值也可能修订。',impact:'并非完全封锁，但距离正常商业通行很远，航运和保险风险极高。'},
      fr:{title:'Hormuz: 7 navires suivis, moitié de la moyenne sur 10 jours',aiBrief:'Données AIS Kpler préliminaires: mercredi 7, veille révisée 12, moyenne 10 jours 14.',summary:'Le trafic public de navires de marchandises reste très sous la moyenne. Les navires AIS éteint peuvent manquer et les chiffres être révisés.',impact:'Ce n’est pas un blocus total, mais le trafic reste loin de la normale et le risque transport-assurance est extrême.'},
      de:{title:'Hormuz: 7 öffentlich erfasste Schiffe, Hälfte des 10-Tage-Mittels',aiBrief:'Vorläufige Kpler-AIS-Daten: Mittwoch 7, revidierter Vortag 12, 10-Tage-Mittel 14.',summary:'Öffentlich erfasster Frachtschiffverkehr bleibt weit unter dem Mittel. AIS-dunkle Schiffe fehlen möglicherweise; Vorabzahlen können revidiert werden.',impact:'Keine Vollblockade, aber weit von Normalverkehr entfernt; Schifffahrts- und Versicherungsrisiko bleibt extrem.'}
    },
    stocks:{
      ko:{title:'Fujairah 정제품 재고 급증…공급위험 일부 완충',aiBrief:'9월 7일까지 전체 석유제품 재고는 주간 56%, middle distillate는 31% 증가했습니다.',summary:'middle distillate에는 diesel과 Jet Fuel/kerosene 계열이 포함됩니다. 일부 중동 정제품 허브의 재고 회복 신호입니다.',impact:'공급 부족을 일부 완충하지만 호르무즈 공급망 정상화를 뜻하지는 않습니다.'},
      en:{title:'Fujairah product stocks surge, partly cushioning supply risk',aiBrief:'In the week to Sept 7, total oil-product stocks rose 56% and middle distillates 31%.',summary:'Middle distillates include diesel and jet-fuel/kerosene products, indicating inventory recovery at one regional product hub.',impact:'This partly cushions shortage risk but does not mean the Hormuz supply chain has normalized.'},
      ja:{title:'Fujairah石油製品在庫急増、供給リスクを一部緩和',aiBrief:'9月7日までの週に全製品在庫は56%、中間留分は31%増加しました。',summary:'中間留分にはdieselとJet Fuel/kerosene系が含まれ、地域ハブの在庫回復を示します。',impact:'不足リスクを一部緩和しますが、ホルムズ供給網の正常化ではありません。'},
      zh:{title:'Fujairah成品油库存激增，部分缓冲供应风险',aiBrief:'截至9月7日一周，总库存增长56%，中间馏分增长31%。',summary:'中间馏分包括柴油及Jet Fuel/kerosene，显示区域成品油枢纽库存恢复。',impact:'这部分缓冲短缺风险，但不代表霍尔木兹供应链恢复正常。'},
      fr:{title:'Forte hausse des stocks de Fujairah, amortisseur partiel',aiBrief:'Sur la semaine au 7 septembre, stocks totaux +56% et distillats moyens +31%.',summary:'Les distillats moyens incluent diesel et jet fuel/kérosène, signe de reconstitution dans un hub régional.',impact:'Cela amortit le risque de pénurie sans signifier une normalisation de la chaîne Hormuz.'},
      de:{title:'Fujairah-Bestände steigen stark und puffern Angebotsrisiko',aiBrief:'In der Woche bis 7. September stiegen Gesamtbestände um 56%, Mitteldestillate um 31%.',summary:'Mitteldestillate umfassen Diesel und Jet Fuel/Kerosin und zeigen Erholung an einem regionalen Hub.',impact:'Dies puffert Knappheitsrisiko teilweise, bedeutet aber keine Normalisierung der Hormuz-Lieferkette.'}
    }
  };
  var newCards=[
    card('brent-over-100-20260910',1,'https://www.reuters.com/',texts.brent),
    card('hormuz-half-average-20260910',2,'https://www.reuters.com/',texts.hormuz),
    card('fujairah-stocks-20260910',3,'https://www.spglobal.com/energy/en/news-research/latest-news/crude-oil/090926-fujairah-data-oil-product-stocks-rise-record-56-in-one-week',texts.stocks)
  ];
  var retained=base.newsCards.filter(function(c){return !/houthi-saudi-energy-sites|hormuz-low-traffic|usdkrw-/.test(c.id);}).map(function(c){
    if(!/^commercial-tanker-attacks/.test(c.id)) return c;
    var copy={
      ko:{title:'미·이란 선박 공격 확대…호르무즈 해상위험 최고조',aiBrief:'이란 측은 호르무즈 인근 선박 10척 공격을 주장했고, 미국 측은 이란 유조선 5척 공격을 발표했습니다.',summary:'양측 발표를 독립적으로 확인된 단일 공격 숫자로 합산하지 않습니다. Reuters는 이를 전쟁 시작 후 양측의 최대 규모 선박 공격으로 전했습니다.',impact:'상업운항과 해상보험 위험이 극도로 높아져 10월 유류할증료의 상방 압력이 강화됐습니다.'},
      en:{title:'U.S.–Iran ship attacks expand as Hormuz risk peaks',aiBrief:'Iran said it attacked 10 vessels near Hormuz; the U.S. said it struck five Iranian tankers.',summary:'The two sides’ claims are kept separate and are not combined as independently verified totals. Reuters described the exchange as the largest declared wave of shipping attacks in the war.',impact:'Commercial-shipping and marine-insurance risk is extremely high, strengthening October surcharge upside pressure.'},
      ja:{title:'米・イラン船舶攻撃拡大、ホルムズ海上リスク最高潮',aiBrief:'イラン側は周辺船舶10隻への攻撃を主張し、米国側はイランのタンカー5隻への攻撃を発表しました。',summary:'双方発表を独立確認済みの合計値として扱いません。Reutersは開戦後最大の船舶攻撃応酬と報じました。',impact:'商業運航・海上保険リスクが極めて高く、10月の上昇圧力を強めます。'},
      zh:{title:'美伊船舶攻击扩大，霍尔木兹海上风险升至最高',aiBrief:'伊朗方面称攻击了霍尔木兹附近10艘船，美国方面称袭击5艘伊朗油轮。',summary:'双方数字分别标明主张主体，不合并为独立核实总数。Reuters称这是开战以来双方宣布的最大规模船舶攻击。',impact:'商业航运和海上保险风险极高，加强10月附加费上行压力。'},
      fr:{title:'Escalade des attaques navales États-Unis–Iran, risque Hormuz extrême',aiBrief:'L’Iran affirme avoir attaqué 10 navires près d’Hormuz; les États-Unis annoncent cinq pétroliers iraniens frappés.',summary:'Les déclarations des deux camps restent séparées et ne sont pas additionnées comme bilan indépendant. Reuters parle de la plus grande vague déclarée du conflit.',impact:'Le risque commercial et d’assurance maritime est extrême, renforçant la pression haussière d’octobre.'},
      de:{title:'US-iranische Schiffsangriffe eskalieren, Hormuz-Risiko extrem',aiBrief:'Iran behauptet Angriffe auf 10 Schiffe bei Hormuz; die USA melden fünf angegriffene iranische Tanker.',summary:'Beide Angaben bleiben als getrennte Behauptungen und werden nicht als unabhängig bestätigte Summe addiert. Reuters bezeichnete es als größte erklärte Angriffswelle des Krieges.',impact:'Handelsschifffahrts- und Versicherungsrisiko ist extrem und verstärkt den Oktober-Aufwärtsdruck.'}
    };
    var out=Object.assign({},c,{id:'commercial-tanker-attacks-20260910',priority:2,date:'2026-09-10',updatedAt:'2026-09-10T19:34:00+09:00',sourceUrl:'https://www.internazionale.it/ultime-notizie-reuters/2026/09/10/iran-attacks-us-base-in-jordan-ships-near-hormuz-tankers-sunk',i18n:Object.assign({},c.i18n)});
    Object.keys(copy).forEach(function(l){out.i18n[l]=Object.assign({},out.i18n[l],copy[l]);}); out.i18n.cn=out.i18n.zh; return out;
  });
  var fx=base.newsCards.filter(function(c){return /^usdkrw-/.test(c.id);})[0];
  if(fx){
    fx=Object.assign({},fx,{id:'usdkrw-134217-20260910',priority:4,date:'2026-09-10',updatedAt:'2026-09-10T19:34:00+09:00',i18n:Object.assign({},fx.i18n)});
    Object.keys(rows).forEach(function(l){fx.i18n[l]=Object.assign({},fx.i18n[l],{title:'USD/KRW 1,342.17',aiBrief:rows[l][1][1],summary:rows[l][1][2],impact:rows[l][0][2]});}); fx.i18n.cn=fx.i18n.zh;
    newCards.push(fx);
  }
  var numbers=Object.assign({},base.numbers,{asOf:date,usdKrw:1342.17,jpy100Krw:872.35,brentUsdPerBbl:101.61,wtiUsdPerBbl:96.54,hormuzKplerCommodityVessels:7,hormuzPreviousCommodityVessels:12,hormuzTenDayAverage:14,fujairahTotalStockWeeklyPct:56,fujairahMiddleDistillateWeeklyPct:31,octoberForecastDirection:'upward_pressure_dominant_flat_possible',octoberForecastConfidence:'medium_direction_low_exact_stage'});
  window.AERO_MARKET_RELEASE={numbers:numbers,rows:rows,packs:packs,newsCards:newCards.concat(retained),sources:base.sources.concat([['S&P Global Fujairah','https://www.spglobal.com/energy/en/news-research/latest-news/crude-oil/090926-fujairah-data-oil-product-stocks-rise-record-56-in-one-week']]),modified:'2026-09-10T19:34:00+09:00'};
  window.AERO_MARKET_NUMBERS_20260910=numbers;
})();
