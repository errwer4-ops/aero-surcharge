(function(){
  'use strict';
  var stamp='2026-10-21T10:05:51+09:00';
  var october={
    KE:[49000,65800,98000,116200,162400,168000,226800,322000,362600],
    OZ:[53400,79400,104000,128700,153300,178000,202600,251900,301200],
    LJ:[32,46,74,81,97],BX:[37,66,78,90],
    TW:[37000,65900,82300,105700,113900,null,256600],
    '7C':[37,47,57,68,76,87],RS:[60300,69900,87800,98700,108300]
  };
  var links={
    KE:'https://www.koreanair.com/contents/footer/customer-support/notice/2026/2610-infuel?pageNum=1',
    OZ:'https://flyasiana.com/C/KR/KO/customer/notice/detail?id=CM202609160002530627',
    LJ:'https://www.jinair.com/company/announce/announceView?anceSeq=28742&searchWord=&searchKey=titlCtn&page=1',
    BX:'https://www.airbusan.com/content/common/customercenter/noticeDetail?id=4407',
    TW:'https://www.trinityairways.com/app/customerCenter/notice/retrieve/12703',
    '7C':'https://www.jejuair.net/ko/customerServiceCenter/noticeDetail.do?billboardNo=0000000762',
    RS:'https://flyairseoul.com/CW/ko/noticeContent.do?seq=11103&pageNo=1'
  };
  var packs={
    ko:{title:'유류할증료 데이터 아카이브 | 2026년 4월~10월 항공사별 비교',desc:'2026년 4월부터 10월까지 한국 출발 국제선 유류할증료 공식 공시 금액을 항공사·거리구간별로 비교하는 데이터 아카이브입니다. 9월 대비 10월 변화를 확인할 수 있습니다.',sub:'2026년 4월 · 5월 · 6월 · 7월 · 8월 · 9월 · 10월 항공사별 공식 공시 비교',h1:'2026년 4~10월 국제선 유류할증료 데이터 아카이브',notice:'<strong>안내:</strong> 과거 월 데이터는 삭제하지 않고 보존합니다. 10월은 대한항공·아시아나·진에어·에어부산·트리니티(티웨이)·제주항공·에어서울 공식 공시를 반영하며, 이스타항공·에어프레미아는 공시값이 없어 표시하지 않습니다.',intro:'2026년 4월부터 10월까지 적용되는 한국 출발 국제선 유류할증료를 항공사별로 비교합니다. 월별 공식 금액과 9월 대비 10월 증감률을 확인할 수 있습니다.',answerTitle:'9월 대비 10월 유류할증료는 어떻게 변했나?',answerBody:'10월은 23단계로 확정됐지만 산정기간 평균환율 영향으로 항공사·거리구간별 원화 금액 변화가 서로 다릅니다. 항공사를 선택하면 4월부터 10월까지의 공식 금액을 구간별로 비교할 수 있습니다.',card1:'4월~10월 공식 공시 추이',card1Body:'5월 고점 이후 하락했던 금액이 9월에 반등했고, 10월에는 항공사와 구간에 따라 추가 인상 또는 일부 인하가 나타났습니다.',card2:'9월 → 10월 비교',card2Body:'변화율 열은 9월 공식 공시 금액 대비 10월 공식 공시 금액의 증감률입니다.',note:'기본값은 최근 4개월(7월·8월·9월·10월)입니다. 전체를 선택하면 4월부터의 아카이브를 볼 수 있습니다. USD 공시 항공사는 선택 통화 기준으로 환산합니다.',table:'데이터는 각 항공사 공식 공지의 2026년 4월~10월 금액 기준입니다. 10월 표시 없음은 공식 공시 금액이 반영되지 않았다는 의미입니다.',faq1:'2026년 4월부터 10월까지 항공사별 국제선 유류할증료 공식 공시 금액을 비교합니다.',faqQ:'10월 유류할증료는 9월보다 어떻게 변했나요?',faqA:'10월 공식 공시는 KE·OZ·LJ·BX·TW·7C·RS를 반영했습니다. 단계는 올랐지만 환율 영향으로 일부 원화 구간은 인하됐습니다.',oct:'2026년 10월',thOct:'10월',change:'9월 대비',related:'9월·10월 비교'},
    en:{title:'Fuel Surcharge Data Archive | April-October 2026 by Airline',desc:'Archive of official Korea-departure international fuel surcharge amounts from April through October 2026 by airline and distance band.',sub:'April · May · June · July · August · September · October 2026 official airline comparison',h1:'April-October 2026 International Fuel Surcharge Data Archive',notice:'<strong>Notice:</strong> Historical months remain archived. October reflects confirmed notices for KE, OZ, LJ, BX, TW, 7C and RS; no October value is shown for Eastar Jet or Air Premia.',intro:'Compare official Korea-departure international fuel surcharges from April through October 2026 by airline and distance band, including October changes versus September.',answerTitle:'How did October surcharges change versus September?',answerBody:'October is confirmed at Level 23, but period-average FX produces different KRW changes by airline and band. Select an airline to compare official amounts from April through October.',card1:'April-October official trend',card1Body:'After falling from the May peak and rebounding in September, October shows further increases in many bands and decreases in a few KRW bands.',card2:'September → October',card2Body:'The change column compares confirmed October amounts with September official amounts.',note:'The default view shows July, August, September and October. Select All for the archive from April. USD filings are converted to the selected currency.',table:'Data is based on official airline notices from April through October 2026. No October display means no official amount has been reflected.',faq1:'This archive compares official international fuel surcharge amounts by airline from April through October 2026.',faqQ:'How did October change versus September?',faqA:'October notices are reflected for KE, OZ, LJ, BX, TW, 7C and RS. Despite the higher level, some KRW bands declined due to FX.',oct:'October 2026',thOct:'October',change:'vs. September',related:'September vs October'},
    ja:{title:'燃油サーチャージデータアーカイブ | 2026年4月～10月',desc:'2026年4月から10月までの韓国発国際線燃油サーチャージ公式金額を航空会社・距離区分別に比較します。',sub:'2026年4月・5月・6月・7月・8月・9月・10月 公式公示比較',h1:'2026年4月～10月 国際線燃油サーチャージデータアーカイブ',notice:'<strong>お知らせ:</strong> 過去データを保存し、10月はKE・OZ・LJ・BX・TW・7C・RSの公示を反映します。',intro:'2026年4月から10月までの公式金額と9月比の10月変化を比較します。',answerTitle:'10月は9月比でどう変わりましたか？',answerBody:'10月は23段階ですが、平均為替の影響で航空会社・距離区分ごとのウォン額は増減が異なります。',card1:'4月～10月公式推移',card1Body:'9月に反発した後、10月は多くの区分で上昇し、一部KRW区分では低下しました。',card2:'9月 → 10月比較',card2Body:'変化率は9月公式金額に対する10月公式金額です。',note:'初期表示は7月・8月・9月・10月。全てを選ぶと4月から表示します。',table:'2026年4月～10月の公式公示に基づきます。10月表示なしは未反映です。',faq1:'2026年4月から10月までの公式金額を比較します。',faqQ:'10月は9月よりどう変わりましたか？',faqA:'10月はKE・OZ・LJ・BX・TW・7C・RSを反映。為替により一部KRW区分は低下しました。',oct:'2026年10月',thOct:'10月',change:'9月比',related:'9月・10月比較'},
    zh:{title:'燃油附加费数据档案 | 2026年4月至10月',desc:'按航空公司和距离档比较2026年4月至10月韩国出发国际线燃油附加费官方金额。',sub:'2026年4月至10月航空公司官方公告比较',h1:'2026年4月至10月国际线燃油附加费数据档案',notice:'<strong>说明:</strong> 保留历史月份，10月已反映KE、OZ、LJ、BX、TW、7C和RS公告。',intro:'比较2026年4月至10月官方金额及10月相对9月的变化。',answerTitle:'10月相比9月如何变化？',answerBody:'10月确定为第23档，但平均汇率使不同航空公司和距离档的韩元金额变化不同。',card1:'4月至10月官方趋势',card1Body:'9月反弹后，10月多数档位继续上涨，部分韩元档位下降。',card2:'9月 → 10月比较',card2Body:'变化率按10月官方金额与9月官方金额计算。',note:'默认显示7月、8月、9月和10月。选择全部可查看4月起的档案。',table:'数据来自2026年4月至10月航空公司官方公告。10月无显示表示尚未反映。',faq1:'比较2026年4月至10月航空公司官方金额。',faqQ:'10月相比9月如何变化？',faqA:'10月已反映KE、OZ、LJ、BX、TW、7C和RS。受汇率影响，部分韩元档位下降。',oct:'2026年10月',thOct:'10月',change:'较9月',related:'9月·10月比较'}
  };
  packs.fr=Object.assign({},packs.en,{title:'Archives des surtaxes | avril-octobre 2026',h1:'Archives des surtaxes internationales d’avril à octobre 2026',oct:'Octobre 2026',thOct:'Octobre',change:'vs septembre',related:'Septembre vs octobre'});
  packs.de=Object.assign({},packs.en,{title:'Kerosinzuschlag-Datenarchiv | April-Oktober 2026',h1:'Datenarchiv internationaler Kerosinzuschläge April-Oktober 2026',oct:'Oktober 2026',thOct:'Oktober',change:'ggü. September',related:'September vs Oktober'});
  var novemberCopy={
  "ko": [
    "유류할증료 데이터 아카이브 | 2026년 4월~11월 항공사별 비교",
    "2026년 4월부터 11월까지 공식 공시를 보존합니다. 11월은 대한항공·아시아나·제주항공·진에어·에어서울 5개사만 반영하며, 나머지 4개사는 공시 전입니다. 10월은 현재 적용 금액, 11월은 11월 1~30일 발권분입니다.",
    "2026년 4~11월 국제선 유류할증료 데이터 아카이브",
    "10월 → 11월 공식 공시 비교",
    "11월 증감률은 같은 항공사·같은 거리 구간의 10월 공식 금액과 비교합니다. 미공시 값은 0원이나 이전 달 금액으로 채우지 않습니다.",
    "최근 4개월은 8월·9월·10월·11월입니다. 전체를 선택하면 4월부터 표시합니다. 원화 환산 표시는 사이트의 비교용 환율이며 항공사 월간 산정환율·실제 결제액이 아닙니다.",
    "11월 공시 전",
    "2026년 11월",
    "11월",
    "10월 대비",
    "10월 공식 공지",
    "11월 공식 공지"
  ],
  "en": [
    "Fuel Surcharge Data Archive | April-November 2026 by Airline",
    "Official monthly notices from April through November are preserved. November includes KE/OZ/7C/LJ/RS only; four other carriers are pending. October currently applies; November is for ticketing November 1–30.",
    "April-November 2026 International Fuel Surcharge Archive",
    "October to November official comparison",
    "November changes compare the same airline and distance band with October. Missing notices are not zero or replaced with a previous month.",
    "Latest four months: August, September, October and November. All includes April onward. Converted amounts use site comparison rates, not airline monthly calculation FX or actual payment prices.",
    "November notice pending",
    "November 2026",
    "November",
    "vs October",
    "October official notice",
    "November official notice"
  ],
  "ja": [
    "燃油サーチャージアーカイブ | 2026年4月～11月",
    "4月から11月までの公式公示を保存。11月はKE・OZ・7C・LJ・RSの5社のみ反映し、他4社は公示前です。10月は現在適用額、11月は11月1～30日発券分です。",
    "2026年4月～11月国際線燃油サーチャージアーカイブ",
    "10月→11月公式公示比較",
    "11月変化率は同じ航空会社・距離区間の10月額との比較です。未公示値をゼロや前月額で補いません。",
    "直近4か月は8・9・10・11月。全てで4月から表示。換算額はサイト比較用レートで、航空会社の月間平均為替や決済額ではありません。",
    "11月公示前",
    "2026年11月",
    "11月",
    "10月比",
    "10月公式公示",
    "11月公式公示"
  ],
  "zh": [
    "燃油附加费档案 | 2026年4月至11月",
    "保留4月至11月官方公告。11月仅反映KE/OZ/7C/LJ/RS共5家，其余4家为公告前。10月为当前收费，11月适用11月1日至30日出票。",
    "2026年4月至11月国际线燃油附加费档案",
    "10月→11月官方公告比较",
    "11月变化率比较同一航司、距离档的10月金额。未公告值不填零或用前月金额代替。",
    "最近4个月为8、9、10、11月；全部包含4月起资料。换算额使用网站比较汇率，不是航司月平均汇率或实际支付金额。",
    "11月公告前",
    "2026年11月",
    "11月",
    "较10月",
    "10月官方公告",
    "11月官方公告"
  ],
  "fr": [
    "Archives des surtaxes | avril-novembre 2026",
    "Avis officiels conservés d’avril à novembre. Novembre inclut seulement KE/OZ/7C/LJ/RS ; quatre autres compagnies en attente. Octobre en vigueur, novembre pour émission du 1er au 30 novembre.",
    "Archives des surtaxes internationales avril-novembre 2026",
    "Comparaison officielle octobre → novembre",
    "Variation novembre par rapport à octobre pour la même compagnie et tranche. Aucun avis manquant remplacé par zéro ou un mois précédent.",
    "Quatre derniers mois : août, septembre, octobre, novembre. Tout affiche depuis avril. Conversions au taux comparatif du site, pas au taux mensuel de compagnie ou au prix de paiement.",
    "Avis novembre en attente",
    "Novembre 2026",
    "Novembre",
    "vs octobre",
    "Avis officiel octobre",
    "Avis officiel novembre"
  ],
  "de": [
    "Kerosinzuschlag-Archiv | April-November 2026",
    "Offizielle Mitteilungen von April bis November bleiben erhalten. November nur KE/OZ/7C/LJ/RS; vier andere Airlines ausstehend. Oktober gilt aktuell, November für Ausstellung 1.–30. November.",
    "Internationales Kerosinzuschlag-Archiv April-November 2026",
    "Offizieller Vergleich Oktober → November",
    "November-Änderung gegenüber Oktober bei gleicher Airline und Entfernungsband. Fehlende Mitteilungen nicht durch null oder Vormonat ersetzen.",
    "Letzte vier Monate: August, September, Oktober, November. Alle zeigt ab April. Umrechnungen zum Vergleichskurs der Website, nicht Airline-Monatskurs oder Zahlungsbetrag.",
    "November-Mitteilung ausstehend",
    "November 2026",
    "November",
    "ggü. Oktober",
    "Offizielle Oktober-Mitteilung",
    "Offizielle November-Mitteilung"
  ]
};
  Object.keys(novemberCopy).forEach(function(l){var t=novemberCopy[l];t[1]=window.NOVEMBER_2026_NOTICE_COPY[l].summary;Object.assign(packs[l],{
    title:t[0],desc:t[1],sub:t[1],h1:t[2],notice:t[1],intro:t[1],answerTitle:t[3],answerBody:t[4],
    card1:t[2],card1Body:t[1],card2:t[3],card2Body:t[4],note:t[5],table:t[1]+' '+t[4],faq1:t[1],
    faqQ:t[3]+'?',faqA:t[4],change:t[9],related:t[3],nov:t[7],thNov:t[8],pending:t[6],octNotice:t[10],novNotice:t[11]
  });});
  october.ZE=[37,47,57,68,76,87];october.YP=[41,54,null,91,159,200,251];
  links.ZE='https://www.eastarjet.com/newstar/PGWCA00002?cId=11&iId=0&bId=664&lang=KR';
  links.YP='https://www.airpremia.com/a/ko/customer/notice/791';
  AIRLINES.forEach(function(a){var n=(window.NOVEMBER_2026_OFFICIAL_NOTICES||[]).find(function(n){return n.code===a.code;});a.nov=n?n.november.slice():a.bands.map(function(){return null;});a.novemberNoticeUrl=n?n.url:null;});
  AIRLINES.forEach(function(a){a.oct=october[a.code]?october[a.code].slice():a.bands.map(function(){return null;});if(links[a.code])a.url=links[a.code];});
  Object.keys(packs).forEach(function(lang){var p=packs[lang];GRAPH_I18N[lang]=GRAPH_I18N[lang]||{};window.I18N[lang]=window.I18N[lang]||{};var values={
    'graph.metaTitle':p.title,'graph.metaDesc':p.desc,'graph.pageSub':p.sub,'graph.h1':p.h1,'graph.notice':p.notice,'graph.intro':p.intro,
    'graph.answer.title':p.answerTitle,'graph.answer.body':p.answerBody,'graph.card1.title':p.card1,'graph.card1.body':p.card1Body,
    'graph.card2.title':p.card2,'graph.card2.body':p.card2Body,'graph.filter.oct':p.oct,'graph.th.oct':p.thOct,'graph.th.change':p.change,
    'graph.chartNote':p.note,'graph.tableNote':p.table,'graph.faq.a1':p.faq1,'graph.faq.q2':p.faqQ,'graph.faq.a2':p.faqA,'graph.related.may':p.related,
    'graph.filter.nov':p.nov,'graph.th.nov':p.thNov,'graph.pending.nov':p.pending,'graph.notice.oct':p.octNotice,'graph.notice.nov':p.novNotice
  };Object.assign(GRAPH_I18N[lang],values);Object.assign(window.I18N[lang],values);});
  var stray=document.getElementById('octoberGraphSummary');if(stray)stray.remove();
  document.title=packs.ko.title;
  var desc=document.querySelector('meta[name="description"]');if(desc)desc.content=packs.ko.desc;
  var ogTitle=document.querySelector('meta[property="og:title"]');if(ogTitle)ogTitle.content=packs.ko.title;
  var ogDesc=document.querySelector('meta[property="og:description"]');if(ogDesc)ogDesc.content=packs.ko.desc;
  document.querySelectorAll('script[type="application/ld+json"]').forEach(function(node){try{var data=JSON.parse(node.textContent);data.dateModified=stamp;if(data['@type']==='WebPage'){data.name=packs.ko.title;data.description=packs.ko.desc;}node.textContent=JSON.stringify(data);}catch(e){}});
  var renderBase=renderPage;
  renderPage=function(){
    renderBase();
    var l=(window.SHARED_STATE&&SHARED_STATE.lang)||'ko',p=packs[l]||packs.en;
    document.title=p.title;
    document.querySelectorAll('meta[name="description"],meta[property="og:description"],meta[name="twitter:description"]').forEach(function(el){el.content=p.desc;});
    document.querySelectorAll('meta[property="og:title"],meta[name="twitter:title"]').forEach(function(el){el.content=p.title;});
    document.querySelectorAll('script[type="application/ld+json"]').forEach(function(el){try{var d=JSON.parse(el.textContent);function update(x){if(!x||typeof x!=='object')return;if(x['@type']==='WebPage'){x.name=p.title;x.description=p.desc;x.dateModified=stamp;x.inLanguage=l;}if(x['@type']==='FAQPage'){x.mainEntity=[{'@type':'Question',name:p.h1+'?',acceptedAnswer:{'@type':'Answer',text:p.faq1}},{'@type':'Question',name:p.faqQ,acceptedAnswer:{'@type':'Answer',text:p.faqA}}];x.dateModified=stamp;x.inLanguage=l;}if(Array.isArray(x['@graph']))x['@graph'].forEach(update);}update(d);el.textContent=JSON.stringify(d);}catch(e){}});
  };
  filterState.month='recent4';
  renderPage();
})();
