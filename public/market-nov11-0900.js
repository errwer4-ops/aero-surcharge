/* 2026-11-11 09:00 KST delta. All 153 preceding news objects remain unchanged. */
(function () {
  'use strict';
  var r = window.AERO_MARKET_RELEASE, n = window.AERO_MARKET_NUMBERS_20261111_0900;
  if (!r || !n) return;
  var stamp = '2026-11-11T09:05:04.278+09:00', oldStamp = r.modified, oldAsOf = r.asOf;
  var imoUrl = 'https://www.imo.org/en/mediacentre/hottopics/pages/middle-east-highlighted-incidents.aspx';
  var adnocUrl = 'https://www.wam.ae/en/article/c36ot7v-adnoc-logistics-services-vessel-sustained-damage';
  var copy = {
  "ko": {
    "imo": "IMO의 11월 10일 기준 확인 사건은 133건, 선원 사망은 25명입니다. 이 목록은 오늘 08:30:56.838 KST에 이미 열람해 09:00 기준 이전 가용성을 확인했습니다. 최초 게시시각은 미제공입니다. NAVIG8 MACALLISTER의 사건일은 11월 7일, GRIT는 11월 3일로, 11월 10일 발생한 두 사건이라는 뜻이 아닙니다. 호르무즈 및 중동 누적 사건이며 전수 통항이나 원유 유량과 다릅니다. 과거 공식 자료의 집계·사건일 차이를 해소하는 정정은 미확인입니다.",
    "marine": "IMO 133건·선원 사망 25명(11월 10일 집계)",
    "impact": "IMO 11월 10일 집계 133건·25명. Windward 6회는 11월 9일 관측이며 안전 회복을 뜻하지 않습니다.",
    "heads": [
      "IMO 11월 10일 목록: 확인 사건 133건·선원 사망 25명",
      "ADNOC, UAE 영해에서 자사 선박 공격·손상 발표"
    ],
    "adnoc": "WAM은 ADNOC Logistics & Services가 11월 10일 오후 Arabian Gulf의 UAE 영해에서 자사 선박이 공격으로 손상됐고 대응 중이라고 발표했다고 보도했습니다. 선명·공격주체·인명피해·운영 또는 수출 차질 규모는 미제공입니다. 회사 발표이며 독립적인 현장·유량 확인은 아닙니다. UKMTO의 Oman Lima 북동 19NM 사건과 동일 사건인지 확인되지 않았으므로 연결하거나 IMO 누계에 임의로 더하지 않습니다.",
    "adnocImpact": "선박안전 위험에 관한 회사 발표입니다. 피해 정도나 공급 손실을 추정하지 않으며 12월 단계·금액 확정 근거로 쓰지 않습니다.",
    "publication": "발표",
    "event": "사건",
    "unavailable": "최초 게시시각 미제공",
    "tags": [
      "공식 누적 목록",
      "회사 발표"
    ]
  },
  "en": {
    "imo": "IMO lists 133 confirmed incidents and 25 seafarer fatalities as at November 10. The list was already read today at 08:30:56.838 KST, establishing availability before the 09:00 cutoff. Initial publication time is unavailable. NAVIG8 MACALLISTER’s event is dated November 7 and GRIT’s November 3; these are not two events that occurred on November 10. This is a cumulative Hormuz and Middle East incident list, not total traffic or oil flow. No correction resolving historical official count or event-date differences was verified.",
    "marine": "IMO: 133 incidents, 25 seafarer fatalities (as at Nov 10)",
    "impact": "IMO: 133 incidents and 25 fatalities as at November 10. Windward’s six crossings concern November 9 and do not establish safe passage.",
    "heads": [
      "IMO November 10 list: 133 confirmed incidents, 25 seafarer fatalities",
      "ADNOC reports attack damage to its vessel in UAE territorial waters"
    ],
    "adnoc": "WAM reports ADNOC Logistics & Services said its vessel was damaged in an attack in UAE territorial waters in the Arabian Gulf on the afternoon of November 10, with response efforts ongoing. The vessel’s name, attacker, casualties and scale of operational or export disruption were not supplied. This is a company statement, not independent on-site or flow verification. Its identity with the UKMTO incident 19 NM northeast of Lima, Oman, is unconfirmed; do not merge the reports or add it to IMO’s count.",
    "adnocImpact": "A company statement about vessel-safety risk. Damage severity and supply losses are not inferred, and it does not establish December surcharge amounts or a stage.",
    "publication": "Publication",
    "event": "Event",
    "unavailable": "Initial publication time unavailable",
    "tags": [
      "Official cumulative list",
      "Company statement"
    ]
  },
  "ja": {
    "imo": "IMOの11月10日時点の確認事件は133件、船員死亡は25人です。本日08:30:56.838 KSTに既に一覧を閲覧しており、09:00基準前の入手可能性を確認しました。初回公表時刻は未提供です。NAVIG8 MACALLISTERの事件日は11月7日、GRITは11月3日で、11月10日発生の2件ではありません。ホルムズ及び中東の累積事件であり、全通航数や原油流量とは異なります。過去の公式件数・事件日の差を解消する訂正は未確認です。",
    "marine": "IMO 133件・船員死亡25人（11月10日時点）",
    "impact": "IMOは11月10日時点133件・25人死亡。Windwardの6回は11月9日の観測で、安全回復を意味しません。",
    "heads": [
      "IMO 11月10日一覧：確認事件133件・船員死亡25人",
      "ADNOC、UAE領海で自社船の攻撃被害を発表"
    ],
    "adnoc": "WAMによるとADNOC Logistics & Servicesは、11月10日午後にアラビア湾のUAE領海で自社船が攻撃を受け損傷し、対応中だと発表しました。船名・攻撃主体・人的被害・操業又は輸出への影響規模は未提供です。会社発表であり独立した現場・流量検証ではありません。UKMTOが報告したオマーンLima北東19NMの事件との同一性は未確認で、報告を統合したりIMO累計に独自加算したりしません。",
    "adnocImpact": "船舶安全リスクに関する会社発表です。損傷程度・供給損失を推定せず、12月の段階や金額の確定根拠としません。",
    "publication": "公表",
    "event": "事件",
    "unavailable": "初回公表時刻は未提供",
    "tags": [
      "公式累積一覧",
      "会社発表"
    ]
  },
  "zh": {
    "imo": "IMO截至11月10日记录133起确认事件、25名海员死亡。今天08:30:56.838 KST已查阅该清单，证明其在09:00基准前可用；首次发布时间未提供。NAVIG8 MACALLISTER事件日期为11月7日，GRIT为11月3日，并非11月10日发生两起事件。这是霍尔木兹及中东累计事件，不是完整通行量或原油流量。尚未核实解决历史官方数量及事件日期差异的更正。",
    "marine": "IMO 133起事件、25名海员死亡（截至11月10日）",
    "impact": "IMO截至11月10日133起事件、25人死亡。Windward的6次通行为11月9日观测，不代表安全恢复。",
    "heads": [
      "IMO 11月10日清单：133起确认事件、25名海员死亡",
      "ADNOC称旗下船舶在阿联酋领海遇袭受损"
    ],
    "adnoc": "WAM报道，ADNOC Logistics & Services表示，旗下船舶11月10日下午在阿拉伯湾阿联酋领海遇袭受损，正在应对。未提供船名、袭击方、人员伤亡及运营或出口中断规模。这是公司声明，不是独立现场或流量核验。尚未确认其与UKMTO所报阿曼Lima东北19海里事件相同，不能合并报道或自行加到IMO累计数中。",
    "adnocImpact": "关于船舶安全风险的公司声明。不推定损伤程度或供应损失，也不用于确定12月附加费档位或金额。",
    "publication": "发布",
    "event": "事件",
    "unavailable": "首次发布时间未提供",
    "tags": [
      "官方累计清单",
      "公司声明"
    ]
  },
  "fr": {
    "imo": "La liste de l’OMI au 10 novembre compte 133 incidents confirmés et 25 marins morts. Elle avait déjà été consultée aujourd’hui à 08:30:56.838 KST, avant la limite de 09:00. L’heure de première publication manque. Les événements de NAVIG8 MACALLISTER et GRIT datent respectivement des 7 et 3 novembre, et non de deux événements survenus le 10. Ce cumul couvre Hormuz et le Moyen-Orient, pas le trafic total ni les flux pétroliers. Aucun correctif des anciens écarts officiels de nombres ou de dates n’a été vérifié.",
    "marine": "OMI : 133 incidents, 25 marins morts (bilan au 10 nov.)",
    "impact": "OMI : 133 incidents et 25 morts au 10 novembre. Les six passages Windward concernent le 9 novembre et ne prouvent pas un retour à la sécurité.",
    "heads": [
      "Liste OMI au 10 novembre : 133 incidents confirmés, 25 marins morts",
      "ADNOC annonce des dommages après une attaque dans les eaux des EAU"
    ],
    "adnoc": "Selon WAM, ADNOC Logistics & Services indique qu’un de ses navires a été endommagé par une attaque dans les eaux territoriales des EAU, dans le golfe Arabique, l’après-midi du 10 novembre, avec une intervention en cours. Ni nom du navire, auteur, victimes, ni ampleur des perturbations opérationnelles ou des exportations ne sont précisés. Il s’agit d’une déclaration de l’entreprise, sans vérification indépendante sur place ou des flux. Le lien avec l’incident UKMTO à 19 milles nautiques au nord-est de Lima, Oman, reste non confirmé : ne pas fusionner les rapports ni l’ajouter au total OMI.",
    "adnocImpact": "Déclaration d’entreprise sur un risque pour les navires. Aucune gravité des dommages ni perte d’approvisionnement déduite ; aucun niveau ni montant de surtaxe de décembre établi.",
    "publication": "Publication",
    "event": "Événement",
    "unavailable": "Heure de première publication non fournie",
    "tags": [
      "Liste cumulative officielle",
      "Déclaration de l’entreprise"
    ]
  },
  "de": {
    "imo": "Die IMO-Liste mit Stand 10. November nennt 133 bestätigte Vorfälle und 25 getötete Seeleute. Sie wurde heute bereits um 08:30:56.838 KST eingesehen und war damit vor dem Stichtag 09:00 verfügbar. Die Erstveröffentlichungszeit fehlt. NAVIG8 MACALLISTER ist auf den 7. November datiert, GRIT auf den 3.; es sind keine zwei Ereignisse vom 10. November. Die kumulierte Liste umfasst Hormus und den Nahen Osten, nicht den Gesamtverkehr oder Ölfluss. Keine Berichtigung historischer offizieller Zahlen- oder Datumsabweichungen wurde bestätigt.",
    "marine": "IMO: 133 Vorfälle, 25 getötete Seeleute (Stand 10. Nov.)",
    "impact": "IMO: 133 Vorfälle und 25 Tote zum 10. November. Windwards sechs Passagen betreffen den 9. November und belegen keine sichere Durchfahrt.",
    "heads": [
      "IMO-Liste vom 10. November: 133 bestätigte Vorfälle, 25 getötete Seeleute",
      "ADNOC meldet Angriffsschaden an Schiff in VAE-Hoheitsgewässern"
    ],
    "adnoc": "Laut WAM erklärte ADNOC Logistics & Services, eines seiner Schiffe sei am Nachmittag des 10. November in den Hoheitsgewässern der VAE im Arabischen Golf bei einem Angriff beschädigt worden; Gegenmaßnahmen liefen. Schiffsname, Angreifer, Personenschäden und Umfang möglicher Betriebs- oder Exportausfälle wurden nicht genannt. Unternehmensangabe, keine unabhängige Prüfung vor Ort oder der Durchflussmenge. Ob es derselbe Vorfall wie der UKMTO-Bericht 19 Seemeilen nordöstlich von Lima, Oman, ist, bleibt unbestätigt; Berichte nicht zusammenführen oder zur IMO-Summe addieren.",
    "adnocImpact": "Unternehmensangabe zu Schiffsrisiken. Schadensausmaß und Lieferverluste werden nicht abgeleitet; sie bestätigt weder Dezember-Stufe noch Zuschlagsbetrag.",
    "publication": "Veröffentlichung",
    "event": "Ereignis",
    "unavailable": "Erstveröffentlichungszeit nicht angegeben",
    "tags": [
      "Offizielle kumulierte Liste",
      "Unternehmensangabe"
    ]
  }
};

  // Rewrite current presentation only. Archived card objects are not visited.
  Object.keys(copy).forEach(function (lang) {
    var c = copy[lang], p = r.packs[lang];
    if (!p) return;
    var oldMarine = p.rows[4][1], oldDetail = p.rows[4][2];
    var trafficAt = oldDetail.indexOf('Windward');
    var oldImo = trafficAt >= 0 ? oldDetail.slice(0, trafficAt).trim() : oldDetail;
    var traffic = trafficAt >= 0 ? oldDetail.slice(trafficAt) : '';
    var oldImpact = p.forecastOverview.rows[4][2];
    var marineTail = oldMarine.indexOf(' | ') >= 0 ? oldMarine.slice(oldMarine.indexOf(' | ')) : '';
    function rewrite(value) {
      if (typeof value === 'string') {
        if (value === oldMarine) return c.marine + marineTail;
        if (value === oldImpact) return c.impact;
        return value.split(oldImo).join(c.imo).split(oldStamp).join(stamp)
          .split(oldAsOf).join(n.asOf)
          .split('2026-11-11T08:30:00+09:00').join(n.informationCutoff)
          .replace(/08:30 KST/g, '09:00 KST');
      }
      if (Array.isArray(value)) return value.map(rewrite);
      if (value && typeof value === 'object') {
        var next = {};
        Object.keys(value).forEach(function (key) { next[key] = rewrite(value[key]); });
        return next;
      }
      return value;
    }
    Object.assign(p, rewrite(p));
    p.rows[4][2] = c.imo + (traffic ? ' ' + traffic : '');
    p.faq[5].a = p.rows[4][2];
    p.forecastOverview.modifiedAt = stamp;
    p.forecastOverview.informationCutoff = n.informationCutoff;
    r.rows[lang] = p.rows;
  });
  r.modified = stamp; r.asOf = n.asOf; r.numbers = n;
  r.sources = r.sources.map(function (source) {
    return source[1] === imoUrl
      ? ['IMO · list as at 2026-11-10: 133 incidents / 25 fatalities; first observed 2026-11-11 08:30:56.838 KST, before the 09:00 cutoff', imoUrl]
      : source;
  });
  if (!r.sources.some(function (source) { return source[1] === adnocUrl; })) {
    r.sources.push(['WAM / ADNOC Logistics & Services · 2026-11-10 attributed company statement', adnocUrl]);
  }
  var definitions = [
    {key:'imo', name:'IMO', url:imoUrl, published:null, updated:null, event:null, verified:'2026-11-11T09:01:09.399+09:00', status:'official_list_available_before_cutoff_by_prior_direct_observation'},
    {key:'adnoc', name:'WAM / ADNOC Logistics & Services', url:adnocUrl, published:'2026-11-10T18:42:05+04:00', updated:'2026-11-10T18:47:30+04:00', event:'2026-11-10', verified:'2026-11-11T09:02:09.581+09:00', status:'attributed_company_statement_not_independently_verified'}
  ];
  var cards = definitions.map(function (def, i) {
    var card = {
      id:'market-20261111-0900-' + (i + 1), category:'institution', priority:i + 1,
      date:'2026-11-11', dateKind:'site_update', publishedAt:stamp, updatedAt:stamp,
      informationCutoff:n.informationCutoff, reportedDate:def.published,
      eventDate:def.event, sourcePublishedAt:def.published, sourceUpdatedAt:def.updated,
      sourceVerifiedAt:def.verified, sourceUrl:def.url, citationUrls:[def.url],
      sourceVerificationStatus:def.status, badge:'NEW', aiSummary:true,
      relevanceScore:1 - i / 100, i18n:{}
    };
    if (def.key === 'imo') {
      card.countAsOf = '2026-11-10'; card.observationDate = '2026-11-10';
      card.listedEventDates = ['2026-11-07', '2026-11-03'];
      card.sourcePreviouslyObservedAt = '2026-11-11T08:30:56.838+09:00';
      card.sourcePublicationNote = 'First publication time is unavailable. Earlier direct observation establishes availability before the 09:00 KST cutoff; the count date and listed event dates are distinct.';
    } else {
      card.claimedLocation = 'UAE_territorial_waters_Arabian_Gulf';
      card.vesselName = null; card.attacker = null; card.casualties = null; card.disruptionSize = null;
      card.relationshipToUkMto20126 = 'not_established';
    }
    Object.keys(copy).forEach(function (lang) {
      var c = copy[lang];
      var sourceClock = c.publication + ': ' + (def.published || c.unavailable) + '. ';
      if (def.event) sourceClock += c.event + ': ' + def.event + '. ';
      card.i18n[lang] = {
        title:c.heads[i], aiBrief:c.heads[i], summary:sourceClock + c[def.key],
        impact:def.key === 'imo' ? c.impact : c.adnocImpact,
        sourceName:def.name, sourceRefs:[{name:def.name, url:def.url}],
        tags:[c.tags[i]], links:[], faq:[]
      };
    });
    card.i18n.cn = card.i18n.zh;
    return card;
  });
  r.newsCards = cards.concat(r.newsCards.filter(function (card) { return !/^market-20261111-0900-/.test(card.id); }));
  window.AERO_MARKET_RELEASE = r;
  window.AERO_MARKET_NUMBERS_LATEST = n;
  if (typeof window.AeroApplyNovemberNoticePeriod20261110 === 'function') window.AeroApplyNovemberNoticePeriod20261110();
})();
