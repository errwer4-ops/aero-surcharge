(function(){
  'use strict';
  var stamp='2026-09-20T10:00:00+09:00';
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
  AIRLINES.forEach(function(a){a.oct=october[a.code]?october[a.code].slice():a.bands.map(function(){return null;});if(links[a.code])a.url=links[a.code];});
  Object.keys(packs).forEach(function(lang){var p=packs[lang];GRAPH_I18N[lang]=GRAPH_I18N[lang]||{};window.I18N[lang]=window.I18N[lang]||{};var values={
    'graph.metaTitle':p.title,'graph.metaDesc':p.desc,'graph.pageSub':p.sub,'graph.h1':p.h1,'graph.notice':p.notice,'graph.intro':p.intro,
    'graph.answer.title':p.answerTitle,'graph.answer.body':p.answerBody,'graph.card1.title':p.card1,'graph.card1.body':p.card1Body,
    'graph.card2.title':p.card2,'graph.card2.body':p.card2Body,'graph.filter.oct':p.oct,'graph.th.oct':p.thOct,'graph.th.change':p.change,
    'graph.chartNote':p.note,'graph.tableNote':p.table,'graph.faq.a1':p.faq1,'graph.faq.q2':p.faqQ,'graph.faq.a2':p.faqA,'graph.related.may':p.related
  };Object.assign(GRAPH_I18N[lang],values);Object.assign(window.I18N[lang],values);});
  var stray=document.getElementById('octoberGraphSummary');if(stray)stray.remove();
  document.title=packs.ko.title;
  var desc=document.querySelector('meta[name="description"]');if(desc)desc.content=packs.ko.desc;
  var ogTitle=document.querySelector('meta[property="og:title"]');if(ogTitle)ogTitle.content=packs.ko.title;
  var ogDesc=document.querySelector('meta[property="og:description"]');if(ogDesc)ogDesc.content=packs.ko.desc;
  document.querySelectorAll('script[type="application/ld+json"]').forEach(function(node){try{var data=JSON.parse(node.textContent);data.dateModified=stamp;if(data['@type']==='WebPage'){data.name=packs.ko.title;data.description=packs.ko.desc;}node.textContent=JSON.stringify(data);}catch(e){}});
  filterState.month='recent4';
  renderPage();
})();
