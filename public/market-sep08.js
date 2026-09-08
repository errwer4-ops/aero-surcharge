(function(){
  'use strict';
  var base=window.AERO_MARKET_RELEASE;
  if(!base) return;
  var date='2026.09.08 19:35 KST';
  var rows={
    ko:[
      ['10월 종합','보합~상승 압력 우세 · 상승 가능성 추가 확대','인하 가능성 상당히 낮아짐 · 신뢰도 보통에 접근. 단계는 항공유가 상방, 원화 강세는 KRW 부과액을 완충합니다.'],
      ['USD/KRW','9월 8일 15:30 기준 1,345.6원 · 전일 대비 +5.1원 · 장중 저점 1,336.3원 · 100엔 약 875.33원','원화 부과액에 매우 강한 하방 ↓↓↓. 현물환율과 8/16~9/15 산정기간 평균환율(집계 중)은 구분합니다.'],
      ['Singapore Jet Fuel / MOPS','시장 참고가격: 8/27 $142.93 → 9/3 $159.58/bbl · 9월 확정평균 $149.29 · 글로벌 주간평균 $171.01(+9%)','9/3 단일 시장값은 9월 기준선보다 $10.29 높습니다. 항공유 ↑↑↑. 어느 값도 10월 누적 MOPS 평균이 아닙니다.'],
      ['국제유가','9월 8일 19:35 KST 전후 Brent $98.39 · 장중 고점 $99.46 · WTI $93.73 · 장중 고점 $94.73','매우 강한 상승·Brent $100 근접 ↑↑↑. 후티의 사우디 일부 에너지시설 공격으로 공급위험이 확대됐습니다.'],
      ['호르무즈·정제품 공급','Kpler 공개 추적 commodity vessel: 월요일 7척 · 전일 8척 · 주말 저점 2척 · 제한구역 발표 예정','극저조 통항·상선 공격·보험 위험 ↑↑↑. 오만 통항로 협의와 대체공급은 일부 완충이지만 정상화로 볼 수 없습니다.']
    ],
    en:[
      ['October outlook','Flat-to-upward pressure dominates · upside probability expands further','Cut prospects are now substantially lower; confidence approaches medium. Jet fuel lifts stage pressure while a stronger won cushions KRW charges.'],
      ['USD/KRW','Sept 8, 15:30 KST: 1,345.6 · +5.1 day on day · intraday low 1,336.3 · JPY 100 ≈ KRW 875.33','Very strong downward effect on KRW amounts ↓↓↓. Spot FX remains separate from the Aug 16–Sept 15 calculation average, still being compiled.'],
      ['Singapore Jet Fuel / MOPS','Market references: Aug 27 $142.93 → Sept 3 $159.58/bbl · confirmed September average $149.29 · global weekly average $171.01 (+9%)','The Sept 3 single-day quote is $10.29 above the September baseline. Jet fuel ↑↑↑. None is the October cumulative MOPS average.'],
      ['Crude oil','Around Sept 8, 19:35 KST: Brent $98.39 · intraday high $99.46 · WTI $93.73 · high $94.73','Strong rise; Brent nears $100 ↑↑↑. Houthi attacks on some Saudi energy facilities widened supply risk.'],
      ['Hormuz and refined supply','Kpler publicly tracked commodity vessels: Monday 7 · prior day 8 · weekend low 2 · restricted zone planned','Traffic remains extremely low; commercial-shipping and insurance risk ↑↑↑. Oman corridor talks and alternative supply provide limited cushioning, not normalization.']
    ],
    ja:[
      ['10月総合','横ばい～上昇圧力が優勢 · 上昇可能性がさらに拡大','引き下げ可能性は大幅に低下、信頼度は中程度に接近。航空燃料は段階を押し上げ、ウォン高はウォン建て負担を緩和します。'],
      ['USD/KRW','9月8日15:30 KST 1,345.6 · 前日比+5.1 · 日中安値1,336.3 · 100円約875.33ウォン','ウォン建て金額への非常に強い下方向要因↓↓↓。直物と8/16～9/15算定平均（集計中）を区別します。'],
      ['Singapore Jet Fuel / MOPS','市場参考値: 8/27 $142.93 → 9/3 $159.58/bbl · 9月確定平均$149.29 · 世界週平均$171.01（+9%）','9/3単日値は9月基準を$10.29上回ります。航空燃料↑↑↑。いずれも10月累積MOPS平均ではありません。'],
      ['国際原油','9月8日19:35 KST前後: Brent $98.39 · 高値$99.46 · WTI $93.73 · 高値$94.73','強い上昇、Brentは$100に接近↑↑↑。フーシ派によるサウジの一部エネルギー施設攻撃で供給リスクが拡大しました。'],
      ['ホルムズ・石油製品供給','Kpler公開追跡の貨物船: 月曜7隻 · 前日8隻 · 週末安値2隻 · 制限区域は発表予定','極低水準の通航、商船・保険リスク↑↑↑。オマーン航路協議と代替供給は一部緩衝ですが、正常化ではありません。']
    ],
    zh:[
      ['10月综合','持平至上涨压力占优 · 上涨可能性进一步扩大','下调可能性显著降低，可信度接近中等。航油推高档位压力，韩元走强缓冲韩元收费。'],
      ['USD/KRW','9月8日15:30 KST 1,345.6 · 较前日+5.1 · 盘中低点1,336.3 · 100日元约875.33韩元','韩元金额的极强下行因素↓↓↓。即期汇率不同于8/16至9/15计算期平均汇率（汇总中）。'],
      ['Singapore Jet Fuel / MOPS','市场参考值: 8/27 $142.93 → 9/3 $159.58/bbl · 9月确定均值$149.29 · 全球周均$171.01（+9%）','9/3单日价格比9月基准高$10.29。航油↑↑↑。这些数据均不是10月累计MOPS均值。'],
      ['国际油价','9月8日19:35 KST前后: Brent $98.39 · 高点$99.46 · WTI $93.73 · 高点$94.73','强势上涨，Brent逼近$100 ↑↑↑。胡塞武装袭击沙特部分能源设施扩大供应风险。'],
      ['霍尔木兹与成品油供应','Kpler公开追踪商品船: 周一7艘 · 前日8艘 · 周末低点2艘 · 限制区待公布','通行极低、商船与保险风险↑↑↑。阿曼航道协商与替代供应仅部分缓冲，并非恢复正常。']
    ],
    fr:[
      ['Bilan octobre','Stabilité à hausse privilégiée · probabilité de hausse encore accrue','La baisse devient nettement moins probable; confiance proche de moyenne. Le kérosène pousse le niveau, le won fort amortit le montant en KRW.'],
      ['USD/KRW','8 sept., 15:30 KST : 1,345.6 · +5.1 sur un jour · plus bas 1,336.3 · 100 JPY ≈ 875.33 KRW','Très fort effet baissier sur le montant en KRW ↓↓↓. Le comptant diffère de la moyenne du 16 août au 15 septembre, en calcul.'],
      ['Singapore Jet Fuel / MOPS','Références de marché : 27/8 $142.93 → 3/9 $159.58/bbl · moyenne septembre confirmée $149.29 · moyenne mondiale $171.01 (+9%)','Le prix ponctuel du 3/9 dépasse la base de $10.29. Kérosène ↑↑↑. Aucun chiffre n’est le MOPS cumulé d’octobre.'],
      ['Pétrole','Vers le 8 sept., 19:35 KST : Brent $98.39 · sommet $99.46 · WTI $93.73 · sommet $94.73','Forte hausse, Brent proche de $100 ↑↑↑. Les attaques houthies contre certains sites énergétiques saoudiens élargissent le risque d’offre.'],
      ['Hormuz et produits raffinés','Navires de marchandises suivis publiquement par Kpler : lundi 7 · veille 8 · creux week-end 2 · zone restreinte prévue','Trafic extrêmement faible, risque commercial et assurance ↑↑↑. Corridor Oman et offre alternative amortissent peu; aucune normalisation.']
    ],
    de:[
      ['Oktober gesamt','Stabile bis steigende Tendenz · Aufwärtswahrscheinlichkeit weiter erhöht','Senkung deutlich unwahrscheinlicher; Vertrauen nähert sich mittel. Kerosin erhöht Stufendruck, ein stärkerer Won dämpft KRW-Beträge.'],
      ['USD/KRW','8. Sept., 15:30 KST: 1,345.6 · +5.1 zum Vortag · Tagestief 1,336.3 · 100 JPY ≈ 875.33 KRW','Sehr starker Abwärtsfaktor für KRW-Beträge ↓↓↓. Kassakurs und Mittel vom 16. August bis 15. September (noch in Berechnung) bleiben getrennt.'],
      ['Singapore Jet Fuel / MOPS','Marktreferenzen: 27.8. $142.93 → 3.9. $159.58/bbl · bestätigtes September-Mittel $149.29 · globales Wochenmittel $171.01 (+9%)','Der Einzelwert vom 3.9. liegt $10.29 über der September-Basis. Kerosin ↑↑↑. Keiner ist das kumulierte Oktober-MOPS-Mittel.'],
      ['Rohöl','Um 8. Sept., 19:35 KST: Brent $98.39 · Tageshoch $99.46 · WTI $93.73 · Hoch $94.73','Starker Anstieg, Brent nahe $100 ↑↑↑. Huthi-Angriffe auf einige saudische Energieanlagen erweitern das Angebotsrisiko.'],
      ['Hormuz und Raffinerieprodukte','Von Kpler öffentlich erfasste Frachtschiffe: Montag 7 · Vortag 8 · Wochenendtief 2 · Sperrzone geplant','Extrem niedriger Verkehr, Handels- und Versicherungsrisiko ↑↑↑. Oman-Korridor und Alternativangebot dämpfen begrenzt; keine Normalisierung.']
    ]
  };
  var intros={
    ko:'2026년 9월 8일 기준 10월 국제선 유류할증료는 보합~상승 압력이 우세하며 상승 가능성이 추가로 확대됐습니다. 원/달러 1,345.6원은 원화 부과액의 강한 하방 요인이지만, 9월 3일 Singapore Jet Fuel 시장 참고가격 $159.58/bbl와 글로벌 Jet Fuel 주간평균 $171.01(+9%)는 항공유 상방 신호입니다. 후티의 사우디 일부 에너지시설 공격으로 Brent는 장중 $99.46까지 상승했습니다. 10월 단계·금액은 아직 확정되지 않았습니다.',
    en:'As of September 8, 2026, October international fuel surcharges face predominantly flat-to-upward pressure, with upside probability expanding further. USD/KRW at 1,345.6 strongly cushions KRW charges, but the Sept 3 Singapore Jet Fuel market reference of $159.58/bbl and global weekly Jet Fuel at $171.01 (+9%) point upward. Brent reached an intraday $99.46 after Houthi attacks on some Saudi energy facilities. October stages and amounts remain unconfirmed.',
    ja:'2026年9月8日時点で、10月国際線燃油サーチャージは横ばい～上昇圧力が優勢で、上昇可能性がさらに拡大しました。USD/KRW 1,345.6はウォン建て負担を強く緩和しますが、9月3日のSingapore Jet Fuel市場参考値$159.58/bblと世界週平均$171.01（+9%）は上方向です。サウジの一部エネルギー施設への攻撃後、Brentは日中$99.46に達しました。10月の段階・金額は未確定です。',
    zh:'截至2026年9月8日，10月国际线燃油附加费持平至上涨压力占优，上涨可能性进一步扩大。USD/KRW 1,345.6对韩元收费形成强缓冲，但9月3日Singapore Jet Fuel市场参考价$159.58/bbl及全球周均$171.01（+9%）构成上行信号。沙特部分能源设施遇袭后，Brent盘中升至$99.46。10月档位与金额仍未确认。',
    fr:'Au 8 septembre 2026, la stabilité ou la hausse des surtaxes internationales d’octobre est privilégiée et la probabilité de hausse augmente encore. USD/KRW à 1,345.6 amortit fortement les montants en KRW, mais le prix Singapore Jet Fuel du 3 septembre à $159.58/bbl et la moyenne mondiale à $171.01 (+9%) poussent à la hausse. Brent a atteint $99.46 en séance après des attaques contre certains sites énergétiques saoudiens. Niveaux et montants restent non confirmés.',
    de:'Stand 8. September 2026 überwiegt bei internationalen Oktober-Zuschlägen eine stabile bis steigende Tendenz; die Aufwärtswahrscheinlichkeit ist weiter gestiegen. USD/KRW 1,345.6 dämpft KRW-Beträge stark, doch Singapore Jet Fuel vom 3. September bei $159.58/bbl und das globale Wochenmittel von $171.01 (+9%) wirken aufwärts. Brent erreichte nach Angriffen auf einige saudische Energieanlagen intraday $99.46. Oktober-Stufen und Beträge sind unbestätigt.'
  };
  var status={ko:'9월 21단계 현재 적용 · 10월 한국 출발 국제선 공식공시 미확인 · 산정기간 추적 중',en:'September Level 21 applies · October Korea-departure international notices unconfirmed · calculation tracked',ja:'9月21段階適用中 · 10月韓国発国際線公式公示未確認 · 算定期間追跡中',zh:'9月第21档适用中 · 10月韩国出发国际线官方公告未确认 · 计算期追踪中',fr:'Septembre niveau 21 en vigueur · avis internationaux d’octobre au départ de Corée non confirmés · calcul suivi',de:'September Stufe 21 gilt · internationale Oktober-Hinweise ab Korea unbestätigt · Berechnung läuft'};
  var packs={};
  Object.keys(rows).forEach(function(l){
    packs[l]=Object.assign({},base.packs[l],{
      intro:intros[l],desc:intros[l],sub:date+' · '+status[l],newsSub:date+' · '+rows[l][0][1],
      verdict1:status[l],verdict2:rows[l][0][1]+' · '+rows[l][0][2],
      verdictLong:({ko:'신뢰도: 보통에 접근 · 특정 10월 단계·금액 미확정',en:'Confidence approaches medium · October stage and amounts unconfirmed',ja:'信頼度は中程度に接近 · 10月段階・金額は未確定',zh:'可信度接近中等 · 10月档位与金额未确认',fr:'Confiance proche de moyenne · niveaux et montants non confirmés',de:'Vertrauen nähert sich mittel · Oktober-Stufen und Beträge unbestätigt'})[l],
      keyVars:rows[l].map(function(x){return x[0]+': '+x[1];}),
      officialNotice:date+' · KE/OZ/LJ/BX/TW/7C/ZE/RS/YP · '+status[l],
      foot:base.packs[l].foot.replace(/1,340\.5|1,340\.5/g,'1,345.6'),updatedLabel:base.packs[l].updatedLabel
    });
  });
  var content={
    ko:{title:'후티, 사우디 일부 에너지시설 공격…Brent $100 근접',brief:'9월 8일 후티 공격으로 사우디 남부 일부 에너지시설과 유틸리티에 화재가 발생하고 운영이 일시 중단됐습니다.',summary:'사우디 당국은 Abha·Jazan·Najran·Khamis Mushait의 민간·경제시설 공격으로 73명이 다쳤다고 밝혔습니다. Brent는 장중 $99.46/bbl까지 상승했습니다. 사우디 전체 생산 중단으로 해석하지 않습니다.',impact:'호르무즈 해상위험에 사우디 육상 에너지시설 위험이 더해져 10월 전망의 상승 가능성이 확대됐습니다.'},
    en:{title:'Houthi attacks hit some Saudi energy facilities; Brent nears $100',brief:'Sept 8 Houthi attacks caused fires and temporary operational suspensions at some southern Saudi energy and utility sites.',summary:'Saudi authorities reported 73 injuries after attacks on civilian and economic facilities in Abha, Jazan, Najran and Khamis Mushait. Brent reached $99.46/bbl intraday. This does not mean nationwide Saudi production stopped.',impact:'Saudi land-based energy risk now adds to Hormuz shipping risk, expanding upside pressure on the October outlook.'},
    ja:{title:'フーシ派がサウジの一部エネルギー施設を攻撃、Brentは$100に接近',brief:'9月8日の攻撃でサウジ南部の一部エネルギー・公共施設に火災が発生し、操業が一時停止しました。',summary:'当局はAbha、Jazan、Najran、Khamis Mushaitの民間・経済施設への攻撃で73人が負傷したと発表。Brentは日中$99.46/bblに達しました。サウジ全体の生産停止ではありません。',impact:'ホルムズ海上リスクにサウジ陸上施設リスクが加わり、10月見通しの上昇圧力が強まりました。'},
    zh:{title:'胡塞武装袭击沙特部分能源设施，Brent逼近$100',brief:'9月8日袭击导致沙特南部部分能源及公用设施起火并暂时停运。',summary:'沙特方面称Abha、Jazan、Najran和Khamis Mushait的民用及经济设施遇袭，73人受伤。Brent盘中达到$99.46/bbl。这不代表沙特全国石油生产停止。',impact:'霍尔木兹海运风险叠加沙特陆上能源设施风险，扩大10月展望的上行压力。'},
    fr:{title:'Les Houthis frappent certains sites énergétiques saoudiens; Brent proche de $100',brief:'Les attaques du 8 septembre ont provoqué des incendies et des arrêts temporaires sur certains sites énergétiques et publics du sud saoudien.',summary:'Les autorités annoncent 73 blessés après des attaques à Abha, Jazan, Najran et Khamis Mushait. Brent a atteint $99.46/bbl en séance. Cela ne signifie pas l’arrêt de toute la production saoudienne.',impact:'Le risque terrestre saoudien s’ajoute au risque maritime Hormuz et accroît la pression haussière pour octobre.'},
    de:{title:'Huthi-Angriffe treffen einige saudische Energieanlagen; Brent nahe $100',brief:'Angriffe am 8. September verursachten Brände und vorübergehende Betriebsstopps an einigen Energie- und Versorgungsanlagen im Süden Saudi-Arabiens.',summary:'Behörden meldeten 73 Verletzte nach Angriffen in Abha, Jazan, Najran und Khamis Mushait. Brent erreichte intraday $99.46/bbl. Dies bedeutet keinen landesweiten Produktionsstopp.',impact:'Zu Hormuz-Schifffahrtsrisiken kommen saudische Landanlagenrisiken, wodurch der Oktober-Ausblick weiter nach oben verschoben wird.'}
  };
  var houthi={id:'houthi-saudi-energy-sites-20260908',category:'market',priority:1,date:'2026-09-08',updatedAt:'2026-09-08T19:35:00+09:00',aiSummary:true,relevanceScore:1,sourceUrl:'https://apnews.com/article/4ad9446f0bb8c096750c84b6e1ba86b8',i18n:{}};
  Object.keys(content).forEach(function(l){var c=content[l];houthi.i18n[l]={title:c.title,aiBrief:c.brief,summary:c.summary,impact:c.impact,sourceName:'AP / Reuters',tags:['Saudi energy','Brent 99.46','Houthi','October outlook'],links:[{href:'forecast.html',label:packs[l].forecastBtn}],faq:[]};});
  houthi.i18n.cn=houthi.i18n.zh;
  function updateCard(card){
    var clone=Object.assign({},card,{i18n:Object.assign({},card.i18n)});
    if(/^usdkrw-/.test(clone.id)){
      clone.id='usdkrw-13456-20260908';clone.date='2026-09-08';clone.priority=2;clone.updatedAt='2026-09-08T19:35:00+09:00';
      Object.keys(content).forEach(function(l){var r=rows[l][1];clone.i18n[l]=Object.assign({},clone.i18n[l],{title:r[0]+' 1,345.6',aiBrief:r[1],summary:r[2],impact:rows[l][0][2]});});
    }
    if(/^hormuz-traffic-/.test(clone.id)){
      clone.id='hormuz-low-traffic-20260908';clone.date='2026-09-08';clone.priority=3;clone.updatedAt='2026-09-08T19:35:00+09:00';
      Object.keys(content).forEach(function(l){var r=rows[l][4];clone.i18n[l]=Object.assign({},clone.i18n[l],{title:r[0]+': '+r[1],aiBrief:r[1],summary:r[2],impact:r[2]});});
    }
    clone.i18n.cn=clone.i18n.zh;
    return clone;
  }
  var news=[houthi].concat(base.newsCards.map(updateCard));
  var numbers=Object.assign({},base.numbers,{
    asOf:date,usdKrw:1345.6,usdKrwAsOf:'2026-09-08T15:30:00+09:00',usdKrwPrevious:1340.5,usdKrwDailyChange:5.1,usdKrwIntradayLow:1336.3,jpy100Krw:875.33,
    brentUsdPerBbl:98.39,brentIntradayHigh:99.46,wtiUsdPerBbl:93.73,wtiIntradayHigh:94.73,crudeAsOf:'2026-09-08T19:35:00+09:00',
    hormuzKplerCommodityVessels:7,hormuzPreviousCommodityVessels:8,hormuzWeekendLowCommodityVessels:2,
    octoberForecastDirection:'flat_to_upward_pressure_upside_expanded',octoberForecastConfidence:'approaching_medium'
  });
  window.AERO_MARKET_RELEASE={numbers:numbers,rows:rows,packs:packs,newsCards:news,sources:base.sources.concat([['AP','https://apnews.com/article/4ad9446f0bb8c096750c84b6e1ba86b8']]),modified:'2026-09-08T19:35:00+09:00'};
  window.AERO_MARKET_NUMBERS_20260908=numbers;
})();
