/* November 18, 09:00 KST: original evidence checked before cutoff; preserve dated archives. */
(function(){
"use strict";
var r=window.AERO_MARKET_RELEASE,n=window.AERO_MARKET_NUMBERS_20261118,view=window.AeroDecemberView;
if(!r||!n||!view)return;
var stamp="2026-11-18T00:09:32.228Z";
var labels={
  "ko": [
    "최종 편집",
    "자료 기준",
    "자료 발표",
    "사건·관측",
    "최초 발표시각 미제공",
    "세계",
    "아시아·오세아니아",
    "주간 종료"
  ],
  "en": [
    "Last edited",
    "Information cutoff",
    "Source publication",
    "Event / observation",
    "First publication time unavailable",
    "Global",
    "Asia & Oceania",
    "Week ending"
  ],
  "ja": [
    "最終編集",
    "情報基準",
    "資料発表",
    "事件・観測",
    "初回公表時刻不明",
    "世界",
    "アジア・オセアニア",
    "週終了"
  ],
  "zh": [
    "最后编辑",
    "资料截止",
    "来源发布",
    "事件／观测",
    "首次发布时间未知",
    "全球",
    "亚洲及大洋洲",
    "周截至"
  ],
  "fr": [
    "Dernière modification",
    "Données arrêtées au",
    "Publication de la source",
    "Événement / observation",
    "Heure de première publication inconnue",
    "Monde",
    "Asie et Océanie",
    "Semaine au"
  ],
  "de": [
    "Zuletzt bearbeitet",
    "Datenstand",
    "Quellenveröffentlichung",
    "Ereignis / Beobachtung",
    "Erstveröffentlichungszeit unbekannt",
    "Welt",
    "Asien und Ozeanien",
    "Woche bis"
  ]
};
var energy={
  "runDate": "2026-11-18",
  "cutoffAt": "2026-11-18T09:00:00+09:00",
  "articles": {
    "fx": {
      "date": "2026-11-17",
      "publishedAt": "2026-11-17T15:44:17+09:00",
      "observedAt": "2026-11-17T15:30:00+09:00",
      "url": "https://www.newsis.com/view/NISX20261117_0003871797",
      "locales": {
        "ko": {
          "title": "원·달러 1,338.2원 마감…전일보다 2.5원 상승",
          "summary": "11월 17일 서울 외환시장 오후 3시 30분 종가입니다.",
          "impact": "하루 환율 상승만으로 12월 공시 금액이 바뀌지는 않습니다. 실제 발권 총액을 비교하세요."
        },
        "en": {
          "title": "USD/KRW closes at 1,338.2, up 2.5 won",
          "summary": "Seoul daytime close at 15:30 on November 17.",
          "impact": "A one-day FX rise does not change published December charges. Compare the final ticket total."
        },
        "ja": {
          "title": "ドル・ウォン、1,338.2で終了　前日比2.5ウォン上昇",
          "summary": "11月17日15時30分のソウル外国為替市場終値です。",
          "impact": "1日の為替上昇で12月の発表済み料金が変わるわけではありません。航空券の総額を比較しましょう。"
        },
        "zh": {
          "title": "美元兑韩元收于1,338.2，上涨2.5韩元",
          "summary": "这是11月17日15:30首尔外汇市场的日间收盘价。",
          "impact": "单日汇率上涨不会改变已公布的12月附加费，请比较机票最终总价。"
        },
        "fr": {
          "title": "Le dollar clôture à 1 338,2 wons, en hausse de 2,5",
          "summary": "Clôture de jour à Séoul, le 17 novembre à 15 h 30.",
          "impact": "Une hausse quotidienne ne modifie pas les suppléments de décembre déjà publiés. Comparez le prix total du billet."
        },
        "de": {
          "title": "USD/KRW schließt bei 1.338,2 – plus 2,5 Won",
          "summary": "Tagesschluss in Seoul am 17. November um 15:30 Uhr.",
          "impact": "Ein Tagesanstieg ändert veröffentlichte Dezemberzuschläge nicht. Vergleichen Sie den Gesamtpreis des Tickets."
        }
      }
    },
    "oil": {
      "date": "2026-11-18",
      "publishedAt": "2026-11-18T07:07:08+09:00",
      "observedDate": "2026-11-17",
      "url": "https://news.einfomax.co.kr/news/articleView.html?idxno=4445238",
      "locales": {
        "ko": {
          "title": "국제유가 소폭 반등…WTI 86.01·Brent 93.14달러",
          "summary": "11월 17일 선물 정산가(USD/bbl)로 WTI 12월물은 0.34%, Brent 1월물은 0.76% 올랐습니다.",
          "impact": "원유와 항공유는 다른 가격입니다. 하루 반등을 다음 달 유류할증료 인상으로 단정하지 않습니다."
        },
        "en": {
          "title": "Oil edges up: WTI $86.01, Brent $93.14",
          "summary": "November 17 futures settlements: December WTI rose 0.34%; January Brent gained 0.76%. Prices are USD per barrel.",
          "impact": "Crude is not jet fuel. A daily rebound does not establish next month's surcharge."
        },
        "ja": {
          "title": "原油が小幅反発　WTI 86.01ドル、Brent 93.14ドル",
          "summary": "11月17日の先物清算値。WTI12月限は0.34%、Brent1月限は0.76%上昇。単位は米ドル／バレルです。",
          "impact": "原油と航空燃料は別の価格です。1日の反発だけで翌月のサーチャージ上昇は判断できません。"
        },
        "zh": {
          "title": "油价小幅回升：WTI 86.01美元，Brent 93.14美元",
          "summary": "11月17日期货结算价：12月WTI上涨0.34%，1月Brent上涨0.76%，单位为美元／桶。",
          "impact": "原油与航空燃油价格不同，不能根据单日反弹断言下月附加费上涨。"
        },
        "fr": {
          "title": "Pétrole en légère hausse : WTI 86,01 $, Brent 93,14 $",
          "summary": "Règlements du 17 novembre : WTI décembre +0,34 %, Brent janvier +0,76 %. Prix en USD par baril.",
          "impact": "Le brut et le kérosène sont distincts. Un rebond quotidien ne détermine pas le supplément du mois suivant."
        },
        "de": {
          "title": "Öl leicht höher: WTI 86,01 $, Brent 93,14 $",
          "summary": "Abrechnung vom 17. November: WTI Dezember +0,34 %, Brent Januar +0,76 %. Preise in USD je Barrel.",
          "impact": "Rohöl und Flugtreibstoff sind verschiedene Preise. Ein Tagesanstieg bestimmt den Zuschlag des Folgemonats nicht."
        }
      }
    },
    "jet": {
      "date": "2026-11-16",
      "publishedAt": null,
      "observedDate": "2026-11-16",
      "url": "https://commodityscope.com/prices/singapore-jet-kerosene",
      "locales": {
        "ko": {
          "title": "싱가포르 항공유 참고값 151.72달러",
          "summary": "11월 16일 CommodityScope 민간 평가: 전회보다 0.57달러 상승(USD/bbl).",
          "impact": "공식 MOPS 평균이 아니며, 이 값만으로 단계나 요금을 정하지 않습니다."
        },
        "en": {
          "title": "Singapore jet reference: $151.72/bbl",
          "summary": "CommodityScope's November 16 private assessment rose $0.57.",
          "impact": "This is not official MOPS; it cannot determine the surcharge."
        },
        "ja": {
          "title": "シンガポール航空燃料の参考値151.72ドル",
          "summary": "11月16日のCommodityScope民間評価は前回比0.57ドル上昇（USD/bbl）。",
          "impact": "公式MOPS平均ではなく、段階や料金を確定する値ではありません。"
        },
        "zh": {
          "title": "新加坡航空燃油参考价151.72美元／桶",
          "summary": "CommodityScope的11月16日民间评估较前次上涨0.57美元。",
          "impact": "这不是官方MOPS均价，不能据此确定档位或附加费。"
        },
        "fr": {
          "title": "Kérosène de Singapour : référence à 151,72 $/baril",
          "summary": "Évaluation privée CommodityScope du 16 novembre : +0,57 $.",
          "impact": "Ce n'est pas la moyenne MOPS officielle, ni un tarif confirmé."
        },
        "de": {
          "title": "Singapur-Flugtreibstoff: Referenz 151,72 $/Barrel",
          "summary": "Private CommodityScope-Bewertung vom 16. November: +0,57 $.",
          "impact": "Kein offizieller MOPS-Mittelwert und kein bestätigter Zuschlag."
        }
      }
    },
    "hedging": {
      "date": "2026-11-17",
      "publishedAt": "2026-11-17T09:02:00Z",
      "observedDate": null,
      "url": "https://www.opis.com/resources/energy-market-news-from-opis/european-airlines-reduce-fuel-hedging-gambling-on-oil-price-drops/",
      "optional": true,
      "locales": {
        "ko": {
          "title": "유럽 항공사, 내년 연료비 대비 방식에 차이",
          "summary": "OPIS는 일부 유럽 항공사가 2027년 연료가격 사전 고정 비중을 줄였다고 보도했습니다.",
          "impact": "연료비 부담은 항공사마다 다릅니다. 국제유가 움직임만으로 항공권 총액을 예측하기 어렵습니다."
        },
        "en": {
          "title": "European airlines take different approaches to 2027 fuel costs",
          "summary": "OPIS reports reduced forward fuel-price protection at several European airlines.",
          "impact": "Fuel costs affect carriers differently. Oil prices alone cannot predict your ticket total."
        },
        "ja": {
          "title": "来年の燃料費への備え、欧州航空各社で差",
          "summary": "OPISは、一部の欧州航空会社が2027年の燃料価格の事前固定比率を下げたと報じました。",
          "impact": "燃料費の影響は会社ごとに異なります。原油価格だけで航空券総額は予測できません。"
        },
        "zh": {
          "title": "欧洲航司应对明年燃油成本的方式出现差异",
          "summary": "OPIS报道，部分欧洲航司降低了2027年提前锁定燃油价格的比例。",
          "impact": "燃油成本对各航司的影响不同，仅凭油价无法预测机票总价。"
        },
        "fr": {
          "title": "Coûts du carburant en 2027 : les compagnies européennes divergent",
          "summary": "Selon OPIS, plusieurs compagnies réduisent leurs couvertures de prix du carburant.",
          "impact": "L'effet varie selon la compagnie. Le pétrole seul ne permet pas de prévoir le prix total du billet."
        },
        "de": {
          "title": "Europäische Airlines sichern Treibstoffkosten für 2027 unterschiedlich ab",
          "summary": "Laut OPIS reduzieren mehrere Airlines ihre vorab gesicherte Treibstoffmenge.",
          "impact": "Die Kostenwirkung unterscheidet sich je Airline. Ölpreise allein sagen den Ticketgesamtpreis nicht voraus."
        }
      }
    }
  },
  "basis": {
    "ko": {
      "fx": "11/17 15:30 서울 종가 · 원/달러",
      "oil": "11/17 선물 정산 · WTI 12월물 / Brent 2027년 1월물 · USD/bbl",
      "jet": "11/16 FOB Singapore · 민간 참고 평가 · 신뢰도 낮음 · USD/bbl",
      "iata": "11/13 종료 주간 평균 · 세계 / 아시아·오세아니아 · USD/bbl",
      "reportedMops": "12월 산정기간 10/16~11/15 · 언론 보도 참고 · 공식 평균·단계 직접 검증 전"
    },
    "en": {
      "fx": "Nov 17, 15:30 Seoul daytime close · KRW/USD",
      "oil": "Nov 17 futures settlement · WTI Dec / Brent Jan 2027 · USD/bbl",
      "jet": "Nov 16 FOB Singapore · private indicative assessment · low confidence · USD/bbl",
      "iata": "Week ending Nov 13 · global / Asia-Oceania averages · USD/bbl",
      "reportedMops": "December calculation: Oct 16–Nov 15 · media reference · official average and stage not directly verified"
    },
    "ja": {
      "fx": "11/17 15:30 ソウル日中終値 · KRW/USD",
      "oil": "11/17 先物清算値 · WTI12月限 / Brent2027年1月限 · USD/bbl",
      "jet": "11/16 FOB Singapore · 民間参考評価 · 信頼度は低い · USD/bbl",
      "iata": "11/13終了週平均 · 世界 / アジア・オセアニア · USD/bbl",
      "reportedMops": "12月算定期間10/16～11/15 · 報道参考 · 公式平均・段階は直接未検証"
    },
    "zh": {
      "fx": "11/17 15:30 首尔日间收盘 · 韩元/美元",
      "oil": "11/17 期货结算 · WTI12月 / Brent2027年1月 · 美元/桶",
      "jet": "11/16 FOB Singapore · 民间参考评估 · 置信度低 · 美元/桶",
      "iata": "截至11/13周均价 · 全球 / 亚太 · 美元/桶",
      "reportedMops": "12月计算期10/16–11/15 · 媒体参考 · 官方均价与档位尚未直接核验"
    },
    "fr": {
      "fx": "17 nov., 15 h 30 · clôture de jour à Séoul · KRW/USD",
      "oil": "Règlements du 17 nov. · WTI déc. / Brent janv. 2027 · USD/baril",
      "jet": "16 nov., FOB Singapour · estimation privée · faible confiance · USD/baril",
      "iata": "Semaine close le 13 nov. · moyennes mondiale / Asie-Océanie · USD/baril",
      "reportedMops": "Calcul de décembre : 16 oct.–15 nov. · presse · moyenne et palier officiels non vérifiés directement"
    },
    "de": {
      "fx": "17. Nov., 15:30 Uhr · Tagesschluss Seoul · KRW/USD",
      "oil": "Abrechnung 17. Nov. · WTI Dez. / Brent Jan. 2027 · USD/Barrel",
      "jet": "16. Nov., FOB Singapur · private Richtbewertung · geringe Zuverlässigkeit · USD/Barrel",
      "iata": "Woche bis 13. Nov. · Welt / Asien-Ozeanien · USD/Barrel",
      "reportedMops": "Dezember-Berechnung: 16. Okt.–15. Nov. · Medienreferenz · offizieller Mittelwert und Stufe nicht direkt geprüft"
    }
  },
  "faq": {
    "ko": [
      {
        "q": "오늘 환율과 유가가 오르면 12월 요금도 다시 오르나요?",
        "a": "하루 시장 변동만으로 발표된 요율이 바뀌지는 않습니다. 항공사별 공시의 발권기간과 노선을 확인하고 실제 결제 총액을 비교하세요."
      },
      {
        "q": "싱가포르 항공유 참고값은 확정 요금을 뜻하나요?",
        "a": "아닙니다. 11월 16일 민간 평가 151.72달러/배럴은 시장 참고값입니다. 공식 MOPS 산정평균과 단계, 항공사 공시금액은 별도로 확인해야 합니다."
      }
    ],
    "en": [
      {
        "q": "Do today's FX and oil rises change December charges?",
        "a": "A daily market move does not change published rates by itself. Check each airline's ticketing period and route, then compare final ticket totals."
      },
      {
        "q": "Does the Singapore jet reference give a confirmed fare?",
        "a": "No. The November 16 private assessment of $151.72/bbl is a market reference. Official MOPS averages, stages and airline charges require separate verification."
      }
    ],
    "ja": [
      {
        "q": "今日の為替・原油上昇で12月の料金も変わりますか？",
        "a": "1日の市場変動だけで発表済み料金が変わるわけではありません。各社の発券期間と路線を確認し、最終的な支払総額を比較してください。"
      },
      {
        "q": "シンガポール航空燃料の参考値は確定料金ですか？",
        "a": "いいえ。11月16日の民間評価151.72ドル／バレルは市場の参考値です。公式MOPS平均・段階・各社の公示額は別に確認する必要があります。"
      }
    ],
    "zh": [
      {
        "q": "今天汇率和油价上涨，会改变12月附加费吗？",
        "a": "单日市场变化本身不会改变已公布的费率。请确认各航司的出票期和航线，再比较最终机票总价。"
      },
      {
        "q": "新加坡航空燃油参考价等于确定票价吗？",
        "a": "不是。11月16日民间评估的151.72美元／桶只是市场参考，官方MOPS均价、档位及航司公布金额需分别核验。"
      }
    ],
    "fr": [
      {
        "q": "La hausse du change et du pétrole modifie-t-elle décembre ?",
        "a": "Une variation quotidienne ne change pas à elle seule les tarifs publiés. Vérifiez la période d'émission et la liaison de chaque compagnie, puis comparez les totaux."
      },
      {
        "q": "La référence du kérosène de Singapour est-elle un tarif confirmé ?",
        "a": "Non. L'évaluation privée du 16 novembre, 151,72 $/baril, est une référence de marché. Les moyennes MOPS officielles, paliers et tarifs nécessitent des vérifications distinctes."
      }
    ],
    "de": [
      {
        "q": "Ändern heutige Wechselkurs- und Ölpreisanstiege die Dezemberzuschläge?",
        "a": "Eine Tagesbewegung ändert veröffentlichte Tarife nicht von selbst. Prüfen Sie Ausstellungszeitraum und Strecke je Airline und vergleichen Sie die Gesamtpreise."
      },
      {
        "q": "Ist die Singapur-Treibstoffreferenz ein bestätigter Tarif?",
        "a": "Nein. Die private Bewertung vom 16. November von 151,72 $/Barrel ist eine Marktreferenz. Offizielle MOPS-Mittelwerte, Stufen und Airline-Zuschläge müssen getrennt geprüft werden."
      }
    ]
  },
  "implementationNotes": [
    "No new publication for unchanged IATA, EIA stocks, IEA supply or OPEC decision.",
    "Jet date is assessment date; initial publication time unknown, source observed before cutoff.",
    "Article metadata must distinguish original publication date from run/recheck date.",
    "OPIS optional article uses attributed company plans; no European prices converted into Korean surcharge."
  ]
};
var marine={
  "marineSummary": {
    "ko": {
      "title": "통항은 이어지지만 선박 안전 회복은 확인되지 않았습니다",
      "summary": "Windward의 11월 17일 관측은 통과 4척·출항 0척입니다. IMO는 17일 기준 누계 138건·선원 사망 25명을 집계했습니다. JMIC의 가장 최근 확인본은 15일자이며 호르무즈 위험도는 SEVERE입니다.",
      "impact": "수송 차질은 주시하되, 이 수치만으로 이미 공시된 12월 요율이나 발권 시점의 유불리를 바꾸지는 않습니다."
    },
    "en": {
      "title": "Traffic continues, but safe passage has not been established",
      "summary": "Windward records four Hormuz crossings, none outbound, for November 17. IMO’s November 17 cumulative totals are 138 incidents and 25 seafarer fatalities. The latest verified JMIC edition is dated November 15 and rates Hormuz SEVERE.",
      "impact": "Monitor transport disruption; these figures alone do not change published December surcharges or establish a better booking date."
    },
    "ja": {
      "title": "通航は続いていますが、安全回復は確認できていません",
      "summary": "Windwardの11月17日観測は通過4隻、湾外向け0隻。IMOの17日時点の累計は事故138件、船員死亡25人です。確認できた最新のJMICは15日版で、ホルムズの危険度はSEVEREです。",
      "impact": "輸送の混乱に注意しつつ、これらの数値だけで公表済みの12月料金や購入時期の有利不利は判断しません。"
    },
    "zh": {
      "title": "船舶仍在通行，但航行安全恢复尚未得到确认",
      "summary": "Windward记录11月17日霍尔木兹通行4艘、出湾0艘。IMO截至17日累计确认138起事件、25名海员死亡。已核实的最新JMIC为15日版，霍尔木兹风险仍评为SEVERE。",
      "impact": "需关注运输受扰，但这些数字本身不会改变已公布的12月附加费，也不能确定最佳出票时点。"
    },
    "fr": {
      "title": "Le trafic continue, sans confirmation d’un retour à la sécurité",
      "summary": "Windward observe quatre passages à Ormuz, sans sortie enregistrée, le 17 novembre. L’OMI recense alors 138 incidents et 25 décès de marins cumulés. La dernière édition JMIC vérifiée date du 15 novembre et classe Ormuz SEVERE.",
      "impact": "Ces risques de transport méritent un suivi, mais ne modifient pas à eux seuls les suppléments publiés pour décembre ni le meilleur moment pour acheter."
    },
    "de": {
      "title": "Schiffe passieren weiterhin, sichere Durchfahrt ist jedoch nicht bestätigt",
      "summary": "Windward erfasst für den 17. November vier Hormus-Passagen ohne Ausfahrt. Die IMO zählt zum 17. November insgesamt 138 Vorfälle und 25 getötete Seeleute. Die zuletzt verifizierte JMIC-Ausgabe vom 15. November stuft Hormus als SEVERE ein.",
      "impact": "Transportrisiken bleiben relevant. Diese Zahlen allein ändern weder veröffentlichte Dezember-Zuschläge noch belegen sie einen günstigeren Buchungszeitpunkt."
    }
  },
  "faq": {
    "ko": {
      "question": "원유가 계속 운송되면 호르무즈도 안전해진 건가요?",
      "answer": "아닙니다. 원유 운송량, 선박 통과 건수, 선원 안전은 서로 다른 지표입니다. EIA의 하루 910만 배럴은 2026년 3분기 평균이고, Windward의 4척은 11월 17일 관측입니다. IMO 사고 누계와 JMIC 위험 평가는 별도로 봐야 합니다."
    },
    "en": {
      "question": "Does continued oil transport mean Hormuz is safe?",
      "answer": "No. Oil volume, ship crossings and crew safety measure different things. EIA’s 9.1 million barrels/day is a third-quarter 2026 average; Windward’s four ships refer to November 17. IMO cumulative incidents and JMIC risk ratings must be assessed separately."
    },
    "ja": {
      "question": "石油輸送が続いていれば、ホルムズは安全になったのですか？",
      "answer": "いいえ。石油輸送量、船舶通過数、乗員の安全は別の指標です。EIAの1日910万バレルは2026年第3四半期平均、Windwardの4隻は11月17日の観測です。IMOの事故累計とJMICの危険度は別途確認する必要があります。"
    },
    "zh": {
      "question": "石油运输仍在继续，是否意味着霍尔木兹已安全？",
      "answer": "不是。石油运量、船舶通行次数和船员安全是不同指标。EIA的每日910万桶是2026年第三季度平均，Windward的4艘是11月17日观测。IMO事件累计数和JMIC风险评级需要分别判断。"
    },
    "fr": {
      "question": "La poursuite du transport de pétrole signifie-t-elle qu’Ormuz est sûr ?",
      "answer": "Non. Volume de pétrole, passages de navires et sécurité des équipages sont des indicateurs distincts. Les 9,1 millions de barils/jour de l’EIA sont une moyenne du troisième trimestre 2026 ; les quatre navires de Windward concernent le 17 novembre. Incidents de l’OMI et risques JMIC s’évaluent séparément."
    },
    "de": {
      "question": "Bedeutet fortgesetzter Öltransport, dass Hormus sicher ist?",
      "answer": "Nein. Ölmenge, Schiffspassagen und Sicherheit der Besatzungen sind unterschiedliche Größen. Die 9,1 Millionen Barrel/Tag der EIA sind ein Durchschnitt für das dritte Quartal 2026; Windwards vier Schiffe betreffen den 17. November. IMO-Vorfallzahlen und JMIC-Risikostufen müssen getrennt betrachtet werden."
    }
  }
};
var definitions=[
  {
    "key": "fx",
    "name": "NEWSIS / News1",
    "url": "https://www.newsis.com/view/NISX20261117_0003871797",
    "published": "2026-11-17T15:44:17+09:00",
    "updated": "2026-11-17T16:30:24+09:00",
    "event": null,
    "observed": "2026-11-17T15:30:00+09:00",
    "checked": "2026-11-17T23:57:25.674Z",
    "citations": [
      "https://www.newsis.com/view/NISX20261117_0003871797",
      "https://www.news1.kr/finance/market-exr/6356903"
    ],
    "locales": {
      "ko": {
        "title": "원·달러 1,338.2원 마감…전일보다 2.5원 상승",
        "summary": "11월 17일 서울 외환시장 오후 3시 30분 종가입니다.",
        "impact": "하루 환율 상승만으로 12월 공시 금액이 바뀌지는 않습니다. 실제 발권 총액을 비교하세요."
      },
      "en": {
        "title": "USD/KRW closes at 1,338.2, up 2.5 won",
        "summary": "Seoul daytime close at 15:30 on November 17.",
        "impact": "A one-day FX rise does not change published December charges. Compare the final ticket total."
      },
      "ja": {
        "title": "ドル・ウォン、1,338.2で終了　前日比2.5ウォン上昇",
        "summary": "11月17日15時30分のソウル外国為替市場終値です。",
        "impact": "1日の為替上昇で12月の発表済み料金が変わるわけではありません。航空券の総額を比較しましょう。"
      },
      "zh": {
        "title": "美元兑韩元收于1,338.2，上涨2.5韩元",
        "summary": "这是11月17日15:30首尔外汇市场的日间收盘价。",
        "impact": "单日汇率上涨不会改变已公布的12月附加费，请比较机票最终总价。"
      },
      "fr": {
        "title": "Le dollar clôture à 1 338,2 wons, en hausse de 2,5",
        "summary": "Clôture de jour à Séoul, le 17 novembre à 15 h 30.",
        "impact": "Une hausse quotidienne ne modifie pas les suppléments de décembre déjà publiés. Comparez le prix total du billet."
      },
      "de": {
        "title": "USD/KRW schließt bei 1.338,2 – plus 2,5 Won",
        "summary": "Tagesschluss in Seoul am 17. November um 15:30 Uhr.",
        "impact": "Ein Tagesanstieg ändert veröffentlichte Dezemberzuschläge nicht. Vergleichen Sie den Gesamtpreis des Tickets."
      }
    },
    "status": "original_news_reports_verified_before_cutoff"
  },
  {
    "key": "oil",
    "name": "Yonhap Infomax / Bloomberg",
    "url": "https://news.einfomax.co.kr/news/articleView.html?idxno=4445238",
    "published": "2026-11-18T07:07:08+09:00",
    "updated": null,
    "event": null,
    "observed": "2026-11-17",
    "checked": "2026-11-17T23:57:24.777Z",
    "citations": [
      "https://news.einfomax.co.kr/news/articleView.html?idxno=4445238",
      "https://www.rigzone.com/news/wire/oil_prices_swing_as_gulf_attacks_continue-17-nov-2026-185107-article/"
    ],
    "locales": {
      "ko": {
        "title": "국제유가 소폭 반등…WTI 86.01·Brent 93.14달러",
        "summary": "11월 17일 선물 정산가(USD/bbl)로 WTI 12월물은 0.34%, Brent 1월물은 0.76% 올랐습니다.",
        "impact": "원유와 항공유는 다른 가격입니다. 하루 반등을 다음 달 유류할증료 인상으로 단정하지 않습니다."
      },
      "en": {
        "title": "Oil edges up: WTI $86.01, Brent $93.14",
        "summary": "November 17 futures settlements: December WTI rose 0.34%; January Brent gained 0.76%. Prices are USD per barrel.",
        "impact": "Crude is not jet fuel. A daily rebound does not establish next month's surcharge."
      },
      "ja": {
        "title": "原油が小幅反発　WTI 86.01ドル、Brent 93.14ドル",
        "summary": "11月17日の先物清算値。WTI12月限は0.34%、Brent1月限は0.76%上昇。単位は米ドル／バレルです。",
        "impact": "原油と航空燃料は別の価格です。1日の反発だけで翌月のサーチャージ上昇は判断できません。"
      },
      "zh": {
        "title": "油价小幅回升：WTI 86.01美元，Brent 93.14美元",
        "summary": "11月17日期货结算价：12月WTI上涨0.34%，1月Brent上涨0.76%，单位为美元／桶。",
        "impact": "原油与航空燃油价格不同，不能根据单日反弹断言下月附加费上涨。"
      },
      "fr": {
        "title": "Pétrole en légère hausse : WTI 86,01 $, Brent 93,14 $",
        "summary": "Règlements du 17 novembre : WTI décembre +0,34 %, Brent janvier +0,76 %. Prix en USD par baril.",
        "impact": "Le brut et le kérosène sont distincts. Un rebond quotidien ne détermine pas le supplément du mois suivant."
      },
      "de": {
        "title": "Öl leicht höher: WTI 86,01 $, Brent 93,14 $",
        "summary": "Abrechnung vom 17. November: WTI Dezember +0,34 %, Brent Januar +0,76 %. Preise in USD je Barrel.",
        "impact": "Rohöl und Flugtreibstoff sind verschiedene Preise. Ein Tagesanstieg bestimmt den Zuschlag des Folgemonats nicht."
      }
    },
    "status": "original_news_reports_verified_before_cutoff"
  },
  {
    "key": "jet",
    "name": "CommodityScope",
    "url": "https://commodityscope.com/prices/singapore-jet-kerosene",
    "published": null,
    "updated": null,
    "event": null,
    "observed": "2026-11-16",
    "checked": "2026-11-17T23:58:36Z",
    "citations": [
      "https://commodityscope.com/prices/singapore-jet-kerosene"
    ],
    "locales": {
      "ko": {
        "title": "싱가포르 항공유 참고값 151.72달러",
        "summary": "11월 16일 CommodityScope 민간 평가: 전회보다 0.57달러 상승(USD/bbl).",
        "impact": "공식 MOPS 평균이 아니며, 이 값만으로 단계나 요금을 정하지 않습니다."
      },
      "en": {
        "title": "Singapore jet reference: $151.72/bbl",
        "summary": "CommodityScope's November 16 private assessment rose $0.57.",
        "impact": "This is not official MOPS; it cannot determine the surcharge."
      },
      "ja": {
        "title": "シンガポール航空燃料の参考値151.72ドル",
        "summary": "11月16日のCommodityScope民間評価は前回比0.57ドル上昇（USD/bbl）。",
        "impact": "公式MOPS平均ではなく、段階や料金を確定する値ではありません。"
      },
      "zh": {
        "title": "新加坡航空燃油参考价151.72美元／桶",
        "summary": "CommodityScope的11月16日民间评估较前次上涨0.57美元。",
        "impact": "这不是官方MOPS均价，不能据此确定档位或附加费。"
      },
      "fr": {
        "title": "Kérosène de Singapour : référence à 151,72 $/baril",
        "summary": "Évaluation privée CommodityScope du 16 novembre : +0,57 $.",
        "impact": "Ce n'est pas la moyenne MOPS officielle, ni un tarif confirmé."
      },
      "de": {
        "title": "Singapur-Flugtreibstoff: Referenz 151,72 $/Barrel",
        "summary": "Private CommodityScope-Bewertung vom 16. November: +0,57 $.",
        "impact": "Kein offizieller MOPS-Mittelwert und kein bestätigter Zuschlag."
      }
    },
    "status": "private_low_confidence_assessment_original_seen_before_cutoff"
  },
  {
    "key": "hedging",
    "name": "OPIS",
    "url": "https://www.opis.com/resources/energy-market-news-from-opis/european-airlines-reduce-fuel-hedging-gambling-on-oil-price-drops/",
    "published": "2026-11-17T09:02:00Z",
    "updated": "2026-11-17T16:19:13Z",
    "event": null,
    "observed": null,
    "checked": "2026-11-17T23:58:32.254Z",
    "citations": [
      "https://www.opis.com/resources/energy-market-news-from-opis/european-airlines-reduce-fuel-hedging-gambling-on-oil-price-drops/"
    ],
    "locales": {
      "ko": {
        "title": "유럽 항공사, 내년 연료비 대비 방식에 차이",
        "summary": "OPIS는 일부 유럽 항공사가 2027년 연료가격 사전 고정 비중을 줄였다고 보도했습니다.",
        "impact": "연료비 부담은 항공사마다 다릅니다. 국제유가 움직임만으로 항공권 총액을 예측하기 어렵습니다."
      },
      "en": {
        "title": "European airlines take different approaches to 2027 fuel costs",
        "summary": "OPIS reports reduced forward fuel-price protection at several European airlines.",
        "impact": "Fuel costs affect carriers differently. Oil prices alone cannot predict your ticket total."
      },
      "ja": {
        "title": "来年の燃料費への備え、欧州航空各社で差",
        "summary": "OPISは、一部の欧州航空会社が2027年の燃料価格の事前固定比率を下げたと報じました。",
        "impact": "燃料費の影響は会社ごとに異なります。原油価格だけで航空券総額は予測できません。"
      },
      "zh": {
        "title": "欧洲航司应对明年燃油成本的方式出现差异",
        "summary": "OPIS报道，部分欧洲航司降低了2027年提前锁定燃油价格的比例。",
        "impact": "燃油成本对各航司的影响不同，仅凭油价无法预测机票总价。"
      },
      "fr": {
        "title": "Coûts du carburant en 2027 : les compagnies européennes divergent",
        "summary": "Selon OPIS, plusieurs compagnies réduisent leurs couvertures de prix du carburant.",
        "impact": "L'effet varie selon la compagnie. Le pétrole seul ne permet pas de prévoir le prix total du billet."
      },
      "de": {
        "title": "Europäische Airlines sichern Treibstoffkosten für 2027 unterschiedlich ab",
        "summary": "Laut OPIS reduzieren mehrere Airlines ihre vorab gesicherte Treibstoffmenge.",
        "impact": "Die Kostenwirkung unterscheidet sich je Airline. Ölpreise allein sagen den Ticketgesamtpreis nicht voraus."
      }
    },
    "status": "original_report_of_company_plans"
  },
  {
    "key": "imo",
    "name": "IMO",
    "url": "https://www.imo.org/en/mediacentre/hottopics/pages/middle-east-highlighted-incidents.aspx",
    "published": null,
    "updated": null,
    "event": null,
    "observed": "2026-11-17",
    "checked": "2026-11-17T23:57:09.143Z",
    "citations": [
      "https://www.imo.org/en/mediacentre/hottopics/pages/middle-east-highlighted-incidents.aspx"
    ],
    "locales": {
      "ko": {
        "title": "IMO, 중동 해상 확인 사고 누계 138건으로 갱신",
        "summary": "IMO의 11월 17일 기준 확인 사고는 누계 138건, 확인된 선원 사망은 25명입니다. 새로 올라온 11월 15일 AL DHANNAH 사고는 아라비아만 선박 손상으로, 오염은 없다고 기재됐습니다.",
        "impact": "누계가 늘었다는 뜻이며, 오늘 발생한 사고 138건이나 유류 공급 손실 규모를 의미하지 않습니다."
      },
      "en": {
        "title": "IMO updates confirmed Middle East incidents to 138",
        "summary": "As of November 17, IMO lists 138 confirmed incidents and 25 seafarer fatalities. Its newly listed November 15 AL DHANNAH incident records damage in the Arabian Gulf and no pollution.",
        "impact": "These are cumulative figures, not 138 new attacks today or a measure of lost oil supply."
      },
      "ja": {
        "title": "IMO、中東の確認済み海事事故を累計138件に更新",
        "summary": "IMOの11月17日時点の集計は確認済み事故138件、船員の死亡25人です。新たに掲載された11月15日のAL DHANNAH事故はアラビア湾での船体損傷で、汚染なしと記載されています。",
        "impact": "累計の更新です。当日の事故件数や石油供給の減少量を示すものではありません。"
      },
      "zh": {
        "title": "IMO更新中东海事事件：累计确认138起",
        "summary": "截至11月17日，IMO累计确认138起事件、25名海员死亡。新列入的11月15日AL DHANNAH事件发生于阿拉伯湾，记录为船舶受损、无污染。",
        "impact": "这是累计数据，并非当天新增138起袭击，也不代表石油供应损失量。"
      },
      "fr": {
        "title": "L’OMI porte à 138 le cumul des incidents confirmés au Moyen-Orient",
        "summary": "Au 17 novembre, l’OMI recense 138 incidents confirmés et 25 décès de marins. L’incident de l’AL DHANNAH du 15 novembre, nouvellement ajouté, mentionne des dommages dans le golfe Arabo-Persique, sans pollution.",
        "impact": "Il s’agit d’un cumul, pas de 138 nouvelles attaques aujourd’hui ni d’une mesure des pertes pétrolières."
      },
      "de": {
        "title": "IMO: 138 bestätigte Vorfälle im Nahen Osten insgesamt",
        "summary": "Zum 17. November erfasst die IMO insgesamt 138 bestätigte Vorfälle und 25 getötete Seeleute. Der neu gelistete Vorfall mit der AL DHANNAH vom 15. November nennt Schäden im Persischen Golf, ohne Verschmutzung.",
        "impact": "Das sind kumulierte Zahlen, keine 138 neuen Angriffe heute und kein Maß für ausgefallene Öllieferungen."
      }
    },
    "status": "original_provider_body_verified_before_cutoff",
    "extra": {}
  },
  {
    "key": "traffic",
    "name": "Windward",
    "url": "https://insights.windward.ai/",
    "published": null,
    "updated": null,
    "event": null,
    "observed": "2026-11-17",
    "checked": "2026-11-17T23:57:08.844Z",
    "citations": [
      "https://insights.windward.ai/"
    ],
    "locales": {
      "ko": {
        "title": "Windward, 11월 17일 호르무즈 통과 4척 관측",
        "summary": "Windward의 11월 18일판은 17일 통과 선박을 입항 4척·출항 0척으로 기록했습니다. AIS 식별 0척·dark 4척이며, 이번 판의 정확한 UTC 집계 시작·종료 시각은 확인되지 않았습니다.",
        "impact": "출항 0은 해당 업체의 관측 결과입니다. 실제 통항 전무나 원유 흐름 0, 항로 안전 회복을 뜻하지 않습니다."
      },
      "en": {
        "title": "Windward records four Hormuz transits for November 17",
        "summary": "Windward’s November 18 edition records four inbound and no outbound crossings for November 17: zero AIS-visible and four dark. The edition’s exact UTC observation window was not verified.",
        "impact": "No outbound crossings recorded is a provider observation, not proof of zero actual traffic, zero oil flow or safe passage."
      },
      "ja": {
        "title": "Windward、11月17日のホルムズ通過を4隻と観測",
        "summary": "Windwardの11月18日版は、17日の通過を湾内向け4隻・湾外向け0隻と記録。AISで識別できた船舶は0隻、darkは4隻です。今回の正確なUTC集計時間帯は未確認です。",
        "impact": "湾外向け0隻は同社の観測結果です。実際の通航や石油輸送がゼロ、あるいは安全が回復したという意味ではありません。"
      },
      "zh": {
        "title": "Windward记录11月17日霍尔木兹海峡通行4艘",
        "summary": "Windward的11月18日版记录17日入湾4艘、出湾0艘；AIS可见0艘、dark船舶4艘。本版准确的UTC观测起止时间尚未核实。",
        "impact": "未记录出湾船舶是该公司的观测结果，并不证明实际通行或石油流量为零，也不证明航道安全恢复。"
      },
      "fr": {
        "title": "Windward observe quatre passages à Ormuz le 17 novembre",
        "summary": "L’édition du 18 novembre de Windward relève quatre entrées et aucune sortie le 17 novembre : zéro navire visible par AIS et quatre « dark ». Les bornes UTC exactes ne sont pas vérifiées.",
        "impact": "L’absence de sortie observée ne prouve ni un trafic réel nul, ni un flux pétrolier nul, ni la sécurité du passage."
      },
      "de": {
        "title": "Windward erfasst vier Hormus-Passagen am 17. November",
        "summary": "Die Windward-Ausgabe vom 18. November erfasst für den 17. November vier Einfahrten und keine Ausfahrt: 0 AIS-sichtbare und vier „dark“-Schiffe. Das genaue UTC-Beobachtungsfenster ist nicht bestätigt.",
        "impact": "Keine erfasste Ausfahrt beweist weder vollständigen Verkehrsstillstand noch einen Ölfluss von 0 oder sichere Passage."
      }
    },
    "status": "original_provider_body_verified_before_cutoff",
    "extra": {
      "sourceEditionDate": "2026-11-18",
      "observationWindowStart": null,
      "observationWindowEnd": null
    }
  },
  {
    "key": "ukmto208update",
    "name": "UKMTO / gCaptain",
    "url": "https://x.com/UK_MTO/status/2122620224801501653",
    "published": "2026-11-17T09:17:00Z",
    "updated": null,
    "event": "2026-11-16",
    "observed": null,
    "checked": "2026-11-17T23:58:25.944Z",
    "citations": [
      "https://x.com/UK_MTO/status/2122620224801501653",
      "https://pbs.twimg.com/media/HXUPjzFXwAAqxPk.png?name=orig",
      "https://gcaptain.com/second-strike-on-lpg-tanker-in-strait-of-hormuz-leaves-one-missing-two-injured/"
    ],
    "locales": {
      "ko": {
        "title": "UKMTO, 유조선 추가 피격 보고…후속 보도서 1명 실종",
        "summary": "UKMTO 208-26의 11월 17일 07:45 UTC 업데이트는 추가 피격과 화재, 당시 승무원 소재 미확인을 전했습니다. 이후 gCaptain은 인도 당국 발표를 인용해 TARA GAS의 인도인 선원 1명 실종·2명 부상을 보도했습니다.",
        "impact": "초기 경보와 후속 인명 정보를 구분합니다. 실종자를 확인 사망 누계에 더하거나 유류 공급 부족으로 환산하지 않습니다."
      },
      "en": {
        "title": "UKMTO reports a second tanker strike; later report says one missing",
        "summary": "UKMTO’s 208-26 update at 07:45 UTC on November 17 reported another strike, fire and crew then unaccounted for. gCaptain later cited Indian authorities reporting one Indian seafarer missing and two injured aboard TARA GAS.",
        "impact": "The later crew report updates the initial warning. Missing is not confirmed dead, and the incident does not quantify fuel shortages."
      },
      "ja": {
        "title": "UKMTO、タンカーへの再攻撃を報告…続報で1人不明",
        "summary": "UKMTOの208-26更新（11月17日07:45 UTC）は再攻撃と火災、当時の乗員の所在不明を伝えました。その後gCaptainはインド当局の発表を引用し、TARA GASのインド人船員1人不明・2人負傷と報じました。",
        "impact": "初報とその後の乗員情報を区別します。不明者は確認済み死亡者に加算せず、燃料不足量にも換算しません。"
      },
      "zh": {
        "title": "UKMTO通报油轮再次遇袭，后续报道指1人失踪",
        "summary": "UKMTO的208-26更新（11月17日07:45 UTC）通报再次遭袭、起火及当时船员下落未明。随后gCaptain援引印度当局消息，报道TARA GAS上1名印度海员失踪、2人受伤。",
        "impact": "须区分初始警报与后续人员消息。失踪不等于确认死亡，也无法据此量化燃油短缺。"
      },
      "fr": {
        "title": "UKMTO signale une seconde frappe ; un marin ensuite porté disparu",
        "summary": "La mise à jour 208-26 d’UKMTO, le 17 novembre à 07:45 UTC, signale une seconde frappe, un incendie et des marins alors non localisés. Citant les autorités indiennes, gCaptain rapporte ensuite un marin indien disparu et deux blessés sur le TARA GAS.",
        "impact": "Le bilan ultérieur se distingue de l’alerte initiale. Un disparu n’est pas un décès confirmé ; aucune pénurie de carburant n’est quantifiée."
      },
      "de": {
        "title": "UKMTO meldet zweiten Tankerangriff; später ein Seemann vermisst",
        "summary": "Das UKMTO-Update 208-26 vom 17. November, 07:45 UTC, meldet einen weiteren Treffer, Feuer und zunächst ungeklärten Verbleib der Besatzung. Später berichtet gCaptain unter Berufung auf indische Behörden von einem vermissten indischen Seemann und zwei Verletzten auf der TARA GAS.",
        "impact": "Spätere Besatzungsangaben sind von der ersten Warnung zu trennen. Vermisst bedeutet nicht bestätigt tot; eine Treibstoffknappheit ist damit nicht beziffert."
      }
    },
    "status": "official_bulletin_image_verified_before_cutoff_publication_time_from_public_mirror",
    "extra": {
      "initialEventAt": "2026-11-16T19:00:00Z",
      "bulletinReferenceAt": "2026-11-17T07:45:00Z",
      "secondStrikeEventAt": null,
      "followupPublishedAt": "2026-11-17T15:00:21Z",
      "followupUpdatedAt": "2026-11-17T17:07:54Z"
    }
  },
  {
    "key": "ukmto209",
    "name": "UKMTO",
    "url": "https://x.com/UK_MTO/status/2122649948298850600",
    "published": "2026-11-17T11:15:00Z",
    "updated": null,
    "event": "2026-11-13",
    "observed": null,
    "checked": "2026-11-17T23:58:25.978Z",
    "citations": [
      "https://x.com/UK_MTO/status/2122649948298850600",
      "https://pbs.twimg.com/media/HXUpA92WIAAy9Xt.png?name=orig"
    ],
    "locales": {
      "ko": {
        "title": "UKMTO, 11월 13일 유조선 피격을 뒤늦게 접수",
        "summary": "11월 17일 공개된 UKMTO 209-26은 13일 아라비아만에서 호르무즈 진입 전 동진하던 유조선이 미상 발사체에 맞았다는 확인 보고입니다. 승무원은 안전하며 정확한 발생 시각과 피해·환경 영향은 미확인입니다.",
        "impact": "발생일은 13일, 공지일은 17일입니다. 별도 확인 없이 IMO 누계에 더하거나 다른 익명 경보와 동일 선박으로 묶지 않습니다."
      },
      "en": {
        "title": "UKMTO receives a late report of a November 13 tanker strike",
        "summary": "Warning 209-26, published November 17, verifies a November 13 projectile strike on a tanker eastbound in the Arabian Gulf before Hormuz. Crew are safe; the exact event time, damage and environmental impact remain unknown.",
        "impact": "November 13 is the event date, November 17 the reporting date. Do not add it to IMO totals or identify an anonymous vessel without verification."
      },
      "ja": {
        "title": "UKMTO、11月13日のタンカー被弾を遅れて確認",
        "summary": "11月17日公表のUKMTO 209-26は、13日にホルムズ進入前のアラビア湾を東進していたタンカーへの不明な飛翔体の命中を確認した報告です。乗員は安全で、正確な発生時刻、損傷・環境影響は未確認です。",
        "impact": "発生日は13日、公表日は17日です。別途確認せずIMO累計に加算したり、他の匿名警報と同じ船と判断したりしません。"
      },
      "zh": {
        "title": "UKMTO迟报确认11月13日油轮中弹事件",
        "summary": "11月17日公布的UKMTO 209-26确认：13日，一艘油轮在进入霍尔木兹前、于阿拉伯湾向东航行时遭不明弹体击中。船员安全，准确发生时间、损害及环境影响未明。",
        "impact": "事件发生于13日，通报于17日。未经核实，不应再加到IMO累计数中，或认定与其他匿名警报为同一船。"
      },
      "fr": {
        "title": "UKMTO reçoit un signalement tardif d’une frappe du 13 novembre",
        "summary": "L’avis 209-26, publié le 17 novembre, confirme qu’un pétrolier naviguant vers l’est dans le golfe Arabo-Persique avant Ormuz a été touché le 13 novembre. L’équipage est sauf ; l’heure exacte, les dommages et l’impact environnemental restent inconnus.",
        "impact": "Le 13 novembre est la date de l’événement, le 17 celle du signalement. Aucun ajout automatique au cumul de l’OMI."
      },
      "de": {
        "title": "UKMTO bestätigt verspätet gemeldeten Tankertreffer vom 13. November",
        "summary": "Die am 17. November veröffentlichte Warnung 209-26 bestätigt einen Treffer durch ein unbekanntes Geschoss am 13. November: ein ostwärts fahrender Tanker im Persischen Golf vor Hormus. Besatzung sicher; genaue Uhrzeit, Schäden und Umweltfolgen unbekannt.",
        "impact": "Der Vorfall geschah am 13., die Meldung erschien am 17. November. Keine ungeprüfte Addition zur IMO-Gesamtzahl oder Zuordnung zu anderen anonymen Warnungen."
      }
    },
    "status": "official_bulletin_image_verified_before_cutoff_publication_time_from_public_mirror",
    "extra": {
      "eventAt": null
    }
  },
  {
    "key": "ukmto210",
    "name": "UKMTO",
    "url": "https://x.com/UK_MTO/status/2122703877438861624",
    "published": "2026-11-17T14:50:00Z",
    "updated": null,
    "event": "2026-11-17",
    "observed": null,
    "checked": "2026-11-17T23:58:25.936Z",
    "citations": [
      "https://x.com/UK_MTO/status/2122703877438861624",
      "https://pbs.twimg.com/media/HXVbbjNWkAA5Fbq.png?name=orig"
    ],
    "locales": {
      "ko": {
        "title": "아덴만 화물선 무장 승선 시도…경고 사격 뒤 물러나",
        "summary": "UKMTO 210-26은 11월 17일 12:50 UTC 예멘 알무칼라 남서쪽 50해리에서 소형정이 화물선 승선을 시도했다고 전했습니다. 현지 당국 보고에 따르면 보안팀의 경고 사격 뒤 소형정은 모선 쪽으로 돌아갔습니다.",
        "impact": "호르무즈와 다른 아덴만 사건입니다. 항로 폐쇄나 인명 피해 유무는 이 경보만으로 확정할 수 없습니다."
      },
      "en": {
        "title": "Armed boarding attempt in Gulf of Aden retreats after warning shot",
        "summary": "UKMTO 210-26 reports a boarding attempt at 12:50 UTC on November 17, 50 nautical miles southwest of Al Mukalla, Yemen. Local authorities said a skiff withdrew toward a mother ship after the cargo vessel’s security team fired a warning shot.",
        "impact": "This is in the Gulf of Aden, not Hormuz. The warning does not establish a route closure or an injury count."
      },
      "ja": {
        "title": "アデン湾の貨物船で武装乗船未遂、警告射撃後に退去",
        "summary": "UKMTO 210-26は、11月17日12:50 UTC、イエメンのアルムカッラ南西50海里での乗船未遂を報告。現地当局によると、貨物船の警備員が警告射撃し、小型艇は母船方向へ退きました。",
        "impact": "ホルムズではなくアデン湾の事件です。この警報だけでは航路閉鎖や負傷者の有無は確認できません。"
      },
      "zh": {
        "title": "亚丁湾货船遭武装登船企图，警告射击后小艇撤离",
        "summary": "UKMTO 210-26通报11月17日12:50 UTC、也门穆卡拉西南50海里处的登船企图。当地当局称，货船安保人员鸣枪警告后，小艇返回母船方向。",
        "impact": "这是亚丁湾事件，并非霍尔木兹事件。该警报不能确认航道关闭或人员伤亡情况。"
      },
      "fr": {
        "title": "Tentative d’abordage armé dans le golfe d’Aden, retrait après un tir d’avertissement",
        "summary": "UKMTO 210-26 rapporte une tentative d’abordage le 17 novembre à 12:50 UTC, à 50 milles nautiques au sud-ouest d’Al Mukalla, au Yémen. Selon les autorités locales, un tir d’avertissement des agents de sécurité du cargo a fait repartir l’embarcation vers un navire-mère.",
        "impact": "L’événement concerne le golfe d’Aden, pas Ormuz. L’alerte ne confirme ni fermeture de route ni bilan de blessés."
      },
      "de": {
        "title": "Bewaffneter Enterversuch im Golf von Aden nach Warnschuss abgebrochen",
        "summary": "UKMTO 210-26 meldet einen Enterversuch am 17. November um 12:50 UTC, 50 Seemeilen südwestlich von Al Mukalla, Jemen. Laut örtlichen Behörden zog sich das Boot nach einem Warnschuss des Sicherheitsteams des Frachters Richtung Mutterschiff zurück.",
        "impact": "Der Vorfall betrifft den Golf von Aden, nicht Hormus. Die Warnung bestätigt weder eine Routensperrung noch eine Verletztenzahl."
      }
    },
    "status": "official_bulletin_image_verified_before_cutoff_publication_time_from_public_mirror",
    "extra": {
      "eventAt": "2026-11-17T12:50:00Z",
      "geography": "Gulf of Aden"
    }
  },
  {
    "key": "tankerCapacity",
    "name": "Bloomberg / gCaptain",
    "url": "https://gcaptain.com/gulf-oil-flow-at-risk-from-lack-of-empty-tankers-tracker-says/",
    "published": "2026-11-17T18:24:56Z",
    "updated": "2026-11-17T18:25:01Z",
    "event": null,
    "observed": null,
    "checked": "2026-11-17T23:58:10.334Z",
    "citations": [
      "https://gcaptain.com/gulf-oil-flow-at-risk-from-lack-of-empty-tankers-tracker-says/"
    ],
    "locales": {
      "ko": {
        "title": "걸프행 빈 유조선 수송능력, 8월 말보다 약 40% 감소 관측",
        "summary": "11월 17일 Bloomberg 보도에서 TankerTrackers.com은 걸프 지역으로 향하는 빈 VLCC·수에즈막스 유조선의 합산 수송능력이 8월 말보다 약 40% 줄었다고 밝혔습니다. 오만만 해상 환적을 통한 공급은 계속되고 있습니다.",
        "impact": "이는 선박의 운반 가능량 지표이며 실제 원유 수출이 40% 줄었다는 뜻은 아닙니다. 항공유 부족 규모도 확인되지 않았습니다."
      },
      "en": {
        "title": "Tracker sees Gulf-bound empty tanker capacity down about 40%",
        "summary": "Bloomberg reported on November 17 that TankerTrackers.com estimates combined empty VLCC and Suezmax capacity heading to the Gulf about 40% below end-August. Ship-to-ship transfers in the Gulf of Oman continue to support deliveries.",
        "impact": "This measures available carrying capacity, not a 40% fall in actual oil exports. It does not quantify a jet-fuel shortage."
      },
      "ja": {
        "title": "湾岸向け空荷タンカーの輸送能力、8月末比約40％減との観測",
        "summary": "11月17日のBloomberg報道で、TankerTrackers.comは湾岸に向かう空荷のVLCC・スエズマックスの合計輸送能力が8月末比約40％減ったと推計。オマーン湾での船舶間移送による供給は続いています。",
        "impact": "運搬可能量の指標であり、実際の原油輸出が40％減ったという意味ではありません。航空燃料の不足量も示していません。"
      },
      "zh": {
        "title": "追踪机构称赴海湾空载油轮运力较8月底约降40%",
        "summary": "Bloomberg于11月17日报道，TankerTrackers.com估计驶向海湾的空载VLCC和苏伊士型油轮合计运力较8月底下降约40%。阿曼湾船对船转运仍在支持交付。",
        "impact": "这是可用运载能力指标，不等于实际石油出口下降40%，也未量化航空燃油短缺。"
      },
      "fr": {
        "title": "Capacité des pétroliers à vide vers le Golfe : environ 40 % de moins selon un suivi",
        "summary": "Bloomberg rapporte le 17 novembre que TankerTrackers.com estime la capacité cumulée des VLCC et Suezmax à vide se dirigeant vers le Golfe environ 40 % sous son niveau de fin août. Les transferts entre navires dans le golfe d’Oman soutiennent encore les livraisons.",
        "impact": "Il s’agit de capacité de transport, pas d’une baisse de 40 % des exportations réelles de pétrole ni d’une pénurie chiffrée de kérosène."
      },
      "de": {
        "title": "Tracker: Kapazität leerer Tanker Richtung Golf um etwa 40 % gesunken",
        "summary": "Laut Bloomberg vom 17. November schätzt TankerTrackers.com die gemeinsame Kapazität leerer VLCC- und Suezmax-Tanker Richtung Golf rund 40 % niedriger als Ende August. Umladungen zwischen Schiffen im Golf von Oman ermöglichen weiter Lieferungen.",
        "impact": "Gemeint ist Transportkapazität, kein Rückgang tatsächlicher Ölexporte um 40 %. Ein Kerosinmangel ist damit nicht beziffert."
      }
    },
    "status": "original_publisher_report_of_provider_assessment",
    "extra": {}
  }
];

r.modified=stamp;r.asOf=n.asOf;r.numbers=n;
r.sources=definitions.map(function(d){return [d.name,d.url];}).concat([
 ['IATA / Platts · unchanged week ending 2026-11-13',n.iataJetFuelSourceUrl||'https://www.iata.org/en/publications/economics/fuel-monitor/'],
 ['IATA / Platts · original weekly table','https://www.iata.org/contentassets/9036deaf9c984009a3515fd6aa1c5e24/fuel_price_analysis.jpg'],
 ['NEWSIS · December KE reported MOPS; not direct official average','https://www.newsis.com/view/NISX20261116_0003869952'],
 ['NEWSIS · November KE reported reference','https://mobile.newsis.com/view_amp.html?ar_id=NISX20261016_0003828757'],
 ['JMIC 114 · 2026-11-15 13:00 UTC; unchanged','https://www.ukmto.org/-/media/ukmto/products/update-114_jmic_advisory_15-nov.pdf?rev=be65cfbd755a41c4816feba6cef4401c'],
 ['EIA · historical Q3 2026 petroleum transit','https://www.eia.gov/outlooks/steo/report/energysecurity/article.php'],
 ['OPEC · November 1 December-target decision; unchanged','https://www.opec.org/pr-detail/620-1-november-2026.html'],
 ['EIA · jet stocks, week ending November 6; unchanged','https://ir.eia.gov/wpsr/table6.csv'],
 ['IEA · November 13 report, October supply; unchanged','https://www.iea.org/reports/oil-market-report-november-2026']
]).concat(window.AeroDecemberNotices.notices.map(function(notice){return [notice.code+' · December airline notice',notice.url];}));
Object.keys(labels).forEach(function(lang){
 var p=r.packs[lang],c=view.copy[lang],l=labels[lang],b=energy.basis[lang],m=marine.marineSummary[lang];
 if(!p||!c)return;
 var nov=p.faq[0],names=p.rows.map(function(row){return row[0];});
 var periods=[c.ke,c.oz,c.bx,c.lj,c.ze].join(' · ');
 var notice=c.summary+' '+periods+'. '+c.later+' '+c.pending;
 var update=l[0]+': '+stamp+' · '+l[1]+': '+n.asOf;
 var jetValue='Singapore Jet 151.72 (2026-11-16) | IATA '+l[5]+' 169.82 / '+l[6]+' 152.80 ('+l[7]+' 2026-11-13) USD/bbl';
 var fx=energy.articles.fx.locales[lang],oil=energy.articles.oil.locales[lang],jet=energy.articles.jet.locales[lang];
 var rows=[
  [c.title,c.summary,periods+'. '+c.later],
  [names[1],jetValue,b.jet+' · '+b.iata],
  [names[2],'1,338.2 KRW/USD (2026-11-17 15:30 KST; +2.5)',b.fx+' · '+fx.impact],
  [names[3],'Brent 93.14 (2027-01) / WTI 86.01 (2026-12) USD/bbl · 2026-11-17',b.oil+' · '+oil.impact],
  [names[4],m.title,m.summary]
 ];
 var foot=b.jet+' · '+b.iata+' · '+b.reportedMops+' (165.66 USD/bbl · 394.44 cents/gal · 25)';
 p.status=c.count+' (KE · OZ · BX · LJ · ZE)';
 Object.assign(p,{desc:c.summary+' '+c.guide,sub:update,newsSub:update,updated:update,updatedLabel:l[0],
  intro:c.summary,rows:rows,summary:[p.status,c.summary,jetValue,rows[2][1],rows[3][1],m.summary],
  foot:foot,basisBody:nov.a+' '+c.officialAverage+' '+b.reportedMops,
  verdict1:c.summary,verdict2:c.guide,verdictLong:c.later+' '+c.pending,note:notice,
  officialNotice:update+' · '+p.status,keyVars:[c.summary,jetValue,rows[2][1],rows[3][1],m.summary],
  faq:[nov,{q:c.question,a:notice+' '+c.officialAverage}].concat(energy.faq[lang], [{q:marine.faq[lang].question,a:marine.faq[lang].answer}])});
 var overview=p.forecastOverview;
 p.forecastOverview=Object.assign({},overview,{modifiedAt:stamp,informationCutoff:n.informationCutoff,expectation:c.summary,
  confidence:c.count,basis:periods,risk:m.title,note:c.officialAverage,question:c.question,
  rows:[[c.title,c.summary,periods+'. '+c.later],[names[1],jetValue,jet.impact],[names[2],rows[2][1],fx.impact],[names[3],rows[3][1],oil.impact],[names[4],m.title,m.summary]],
  rowTones:['down','hold','up','up','hold']});
 r.rows[lang]=rows;
 p.surface=Object.assign({},p.surface,{'fore.pageSub':p.sub,'fore.intro':p.intro,'fore.summary.updated':update,'fore.indicator.footnote':p.foot,
  'fore.verdict.line1':p.verdict1,'fore.verdict.line2':p.verdict2,'fore.verdict.long':p.verdictLong,'fore.basis.body':p.basisBody,'fore.predict.footnote':p.foot,'fore.aiNotice':notice,
  'news.pageSub':p.newsSub,'news.note':notice,'news.surchargeNote':notice,'news.dataRef':p.sub,'news.decisionShort':c.summary,'news.decisionLine1':c.summary,
  'news.decisionLine2':c.guide,'news.forecastCta.desc':c.guide,'news.summary.updated':update,'news.officialNotice':p.officialNotice,'news.basisBody':p.foot});
});
var cards=definitions.map(function(def,i){
 var card={id:'market-20261118-'+def.key,category:['fx','oil','jet','hedging'].indexOf(def.key)>=0?'market':'institution',priority:i+1,
  date:'2026-11-18',dateKind:'site_update',publishedAt:stamp,updatedAt:stamp,informationCutoff:n.informationCutoff,
  reportedDate:def.published||null,sourcePublishedAt:def.published,sourceUpdatedAt:def.updated,eventDate:def.event,
  sourceAsAt:def.observed||null,sourceVerifiedAt:def.checked,sourceUrl:def.url,citationUrls:def.citations,
  sourceVerificationStatus:def.status,badge:'NEW',aiSummary:true,relevanceScore:1-i/100,i18n:{}};
 if(!def.published)card.sourcePublicationNote='First publication time unknown; source body observed before the cutoff. Observation and retrieval dates are distinct.';
 Object.assign(card,def.extra||{});
 Object.keys(labels).forEach(function(lang){
  var l=labels[lang],a=def.locales[lang],dates=l[2]+': '+(def.published||l[4])+'. ';
  var eventLabel=def.key==='ukmto208update'?({ko:'최초 피격',en:'Initial strike',ja:'最初の攻撃',zh:'首次遇袭',fr:'Frappe initiale',de:'Erster Treffer'})[lang]:l[3];
  if(def.event||def.observed)dates+=eventLabel+': '+(def.event||def.observed)+'. ';
  card.i18n[lang]={title:a.title,aiBrief:a.title,summary:dates+a.summary,impact:a.impact,sourceName:def.name,
   sourceRefs:card.citationUrls.map(function(url){return {name:new URL(url).hostname,url:url};}),tags:[def.name],links:[],faq:[]};
 });
 card.i18n.cn=card.i18n.zh;return card;
});
r.newsCards=cards.concat(r.newsCards.filter(function(card){return !/^market-20261118-/.test(card.id);}));
window.AERO_MARKET_RELEASE=r;window.AERO_MARKET_NUMBERS_LATEST=n;
if(typeof window.AeroApplyNovemberNoticePeriod20261110==='function')window.AeroApplyNovemberNoticePeriod20261110();
})();
