(function(){
  'use strict';
  var core=window.AeroCalculatorCore;
  if(!core)return;
  function notice(code){return (window.NOVEMBER_2026_OFFICIAL_NOTICES||[]).find(function(n){return n.code===code;});}
  function language(){return (window.getCurrentLang?window.getCurrentLang():'ko')==='ko';}
  function locale(){var lang=window.getCurrentLang?window.getCurrentLang():window.SHARED_STATE&&window.SHARED_STATE.lang||'ko';return lang==='cn'?'zh':lang;}
  var homeCopy = [
    ['Retained records','保管記録に基づく','基于留存记录','Archives conservées','Gespeicherte Aufzeichnungen'],
    ['Calculation details','計算根拠','计算依据','Détail du calcul','Berechnungsdetails'],
    ['October retained record','10月保管記録','10月留存记录','Archive d’octobre','Oktober-Aufzeichnung'],
    ['Notice available','公示確認済み','公告已核实','Avis disponible','Mitteilung verfügbar'],
    ['Notice pending','公示確認中','公告核实中','Avis en vérification','Mitteilung wird geprüft'],
    ['No data for this month','この月の資料なし','暂无该月资料','Aucune donnée pour ce mois','Keine Daten für diesen Monat'],
    ['No charging group established for this route.','この路線の課金区分を確認できません。','无法核实该航线的收费区间。','Tranche tarifaire non établie pour cette ligne.','Keine bestätigte Tarifgruppe für diese Strecke.'],
    ['No official data','公式資料なし','暂无官方资料','Aucune donnée officielle','Keine offiziellen Daten'],
    ['Notice confirmed','公示確認済み','公告已核实','Avis confirmé','Mitteilung bestätigt'],
    ['Pending','確認中','核实中','En vérification','Prüfung läuft'],
    ['Zero baseline: no percentage','基準額0：変化率なし','基准金额为0：无变化率','Base nulle : pas de pourcentage','Basis null: kein Prozentsatz'],
    ['Selected route','選択路線','所选航线','Ligne choisie','Gewählte Strecke'],
    ['Published surcharge lookup for PUS–UBN. This does not establish current operating dates or seat availability. ','釜山発UBNの公示料金検索です。現在の運航日や空席を示すものではありません。 ','这是釜山至UBN公告金额查询，不代表当前航班日期或余位。 ','Consultation de la surtaxe PUS–UBN, sans confirmation des dates de vol ni des places disponibles. ','Abfrage des veröffentlichten Zuschlags PUS–UBN; keine Bestätigung aktueller Flugtage oder freier Plätze. '],
    ['Airline route source','航空会社の路線資料','航司航线来源','Source de la ligne','Streckenquelle der Airline'],
    ['Check schedules','運航日程を確認','查看航班时刻','Consulter les horaires','Flugplan prüfen'],
    ['Source link','原文リンク','原文链接','Lien source','Quellenlink'],
    ['Published: ','発表日：','发布日期：','Publication : ','Veröffentlicht: '],
    ['Checked: ','確認日：','核实日期：','Vérifié : ','Geprüft: '],
    ['not recorded','記録なし','未记录','non consigné','nicht erfasst'],
    ['Ticketing: ','発券適用：','出票适用：','Émission : ','Ausstellung: '],
    ['Notice amounts · original currency','公示金額・元の通貨','公告金额·原币种','Montants publiés · devise d’origine','Veröffentlichte Beträge · Originalwährung'],
    ['Simple round-trip estimate: Korea-origin one-way × 2','単純往復試算：韓国発片道×2','简单往返估算：韩国出发单程×2','Estimation aller-retour : aller simple de Corée × 2','Hin-und-Rückflug-Schätzung: einfacher Flug ab Korea × 2'],
    ['One-way per person','1人片道','每人单程','Aller simple par personne','Einfacher Flug pro Person'],
    ['Published charging band','公示課金区分','公告收费区间','Tranche tarifaire publiée','Veröffentlichte Tarifgruppe'],
    ['Difference / change','差額・変化率','差额／变化率','Écart / variation','Differenz / Veränderung'],
    ['Only confirmed amounts are compared. Pending amounts are excluded.','確認済み金額だけを比較します。確認中の金額は除外します。','仅比较已核实金额，核实中的金额不计入比较。','Seuls les montants confirmés sont comparés. Les montants en vérification sont exclus.','Nur bestätigte Beträge werden verglichen. Ungeprüfte Beträge bleiben ausgeschlossen.'],
    ['November notice amount','11月の公示金額','11月公告金额','Montant publié en novembre','Veröffentlichter Novemberbetrag'],
    ['October notice amount','10月の公示金額','10月公告金额','Montant publié en octobre','Veröffentlichter Oktoberbetrag'],
    ['November source notice','11月の公示原文','11月公告原文','Avis source de novembre','Originalmitteilung November'],
    ['Amounts by band and verification details','区分別金額と確認根拠','各收费区间金额及核实依据','Montants par tranche et éléments de vérification','Beträge je Tarifgruppe und Prüfnachweise'],
    ['Cannot compare · different conditions','比較不可・条件が異なります','无法比较·条件不同','Comparaison impossible · conditions différentes','Nicht vergleichbar · andere Bedingungen'],
    ['Cannot compare · checking','比較不可・確認中','无法比较·核实中','Comparaison impossible · vérification en cours','Nicht vergleichbar · Prüfung läuft']
  ],homeByEnglish={};
  homeCopy.forEach(function(row){homeByEnglish[row[0]]=row;});
  function text(ko,en){var lang=locale();if(lang==='ko')return ko;var row=homeByEnglish[en],index={en:0,ja:1,zh:2,fr:3,de:4}[lang];return row&&index!==undefined?row[index]:en;}
  var comparisonCopy={
    ko:['전월 대비 최소 {min}% 상승','전월 대비 최소 {maxAbs}% 하락','전월 대비 변동 없음','전월 대비 동결~최대 {max}% 상승','전월 대비 동결~최대 {minAbs}% 하락','전월 대비 {min}%~+{max}% 변동','2026년 10월 → 11월, 동일 통화·동일 저장 구간의 {count}개 금액쌍 기준입니다. 누락·미공시·기준액 0인 구간은 제외합니다. 비율은 소수 첫째 자리로 반올림합니다.','10월 보관 기록을 포함한 참고 비율입니다.'],
    en:['At least {min}% higher than October','At least {maxAbs}% lower than October','Unchanged from October','Unchanged to {max}% higher','Unchanged to {minAbs}% lower','{min}% to +{max}% versus October','October → November 2026, {count} pairs in the same currency and stored charging band. Missing, unpublished and zero-baseline bands are excluded. Percentages are rounded to one decimal.','An indicative rate including retained October records.'],
    ja:['10月比で最低{min}%上昇','10月比で最低{maxAbs}%下落','10月比で変化なし','据え置き～最大{max}%上昇','据え置き～最大{minAbs}%下落','10月比{min}%～+{max}%','2026年10月→11月、同じ通貨・保存区分の{count}組を比較。欠損・未公示・基準額0は除外し、小数第1位に丸めています。','10月の保管記録を含む参考比率です。'],
    zh:['较10月至少上涨{min}%','较10月至少下降{maxAbs}%','较10月无变化','持平至最高上涨{max}%','持平至最高下降{minAbs}%','较10月变化{min}%至+{max}%','比较2026年10月至11月同币种、同留存收费区间的{count}组金额。排除缺失、未公告和基准金额为0的区间，比例保留一位小数。','此参考比例包含10月留存记录。'],
    fr:['Hausse d’au moins {min}% depuis octobre','Baisse d’au moins {maxAbs}% depuis octobre','Inchangé depuis octobre','Stabilité à +{max}%','Stabilité à −{minAbs}%','{min}% à +{max}% depuis octobre','Octobre → novembre 2026 : {count} paires dans la même devise et tranche conservée. Données manquantes, non publiées ou à base nulle exclues. Pourcentages arrondis à une décimale.','Taux indicatif incluant des archives d’octobre.'],
    de:['Mindestens {min}% höher als im Oktober','Mindestens {maxAbs}% niedriger als im Oktober','Unverändert zum Oktober','Unverändert bis {max}% höher','Unverändert bis {minAbs}% niedriger','{min}% bis +{max}% zum Oktober','Oktober → November 2026: {count} Betragspaare derselben Währung und gespeicherten Tarifgruppe. Fehlende, unveröffentlichte Werte und Nullbasen sind ausgeschlossen. Auf eine Dezimalstelle gerundet.','Richtwert unter Einbeziehung gespeicherter Oktober-Daten.']
  };
  function comparisonText(index,comparison){var values={min:comparison.minimum.toFixed(1),max:comparison.maximum.toFixed(1),maxAbs:Math.abs(comparison.maximum).toFixed(1),minAbs:Math.abs(comparison.minimum).toFixed(1),count:comparison.pairs.length};return (comparisonCopy[locale()]||comparisonCopy.en)[index].replace(/\{(\w+)\}/g,function(_,key){return values[key];});}
  function esc(value){return String(value==null?'':value).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function noticeOnlyEvaluator(){return window.AeroSourceTrust?{evaluate:window.AeroSourceTrust.evaluateNotice}:null;}
  function recordFor(code,index,month,dep,arr,routeSpecific){
    var data=window._OFFICIAL_AMT&&window._OFFICIAL_AMT[code],row=data&&data.rows[index],n=notice(code);
    if(!row)return null;
    var record={airline:code,origin:dep,destination:arr,month:month,basis:row.range||row.label,currency:data.currency,direction:'one_way',departureCountry:null,band:row.label,sourceBand:null,bandIndex:null,amount:null,status:'unconfirmed',validationStatus:'passed',sourceUrl:null,publishedAt:null,collectedAt:null,effectiveFrom:null,effectiveTo:null};
    if(month==='2026-11'&&n){
        index=n.displayBandIndices?n.displayBandIndices[index]:index;
        if(index===null||index===undefined)return null;
      Object.assign(record,{amount:n.november[index],currency:n.currency,sourceUrl:core.safeUrl(n.url),band:n.bands[index],sourceBand:n.bands[index],bandIndex:index,direction:n.direction,departureCountry:n.departureCountry,publishedAt:n.noticePublishedAt||n.noticeDate||null,collectedAt:n.collectedAt||null,effectiveFrom:n.ticketingStart,effectiveTo:n.ticketingEnd});
    }else if(month==='2026-10'){
      var old=(window.OCTOBER_2026_ROUTE_GROUP_NOTICES||{})[code];
      var reviewed=window.AeroSourceTrust&&window.AeroSourceTrust.getNotice(code,month);
      Object.assign(record,{amount:row.july,sourceUrl:core.safeUrl((window.OCTOBER_2026_NOTICE_LINKS||{})[code])});
      if(old){
        Object.assign(record,{amount:(old.amounts||old.october)[index],currency:old.currency,sourceUrl:core.safeUrl(old.url),band:old.bands[index],sourceBand:old.bands[index],bandIndex:index,direction:old.direction,departureCountry:old.departureCountry,publishedAt:old.noticePublishedAt||old.noticeDate||null,effectiveFrom:old.ticketingStart,effectiveTo:old.ticketingEnd});
      }else if(reviewed&&reviewed.routesByGroup){
        // October's independently reviewed route list establishes its identity.
        Object.assign(record,{band:reviewed.bands[index],sourceBand:reviewed.bands[index],bandIndex:index,direction:reviewed.direction,departureCountry:reviewed.departureCountry,publishedAt:reviewed.publishedAt,effectiveFrom:reviewed.effectiveFrom,effectiveTo:reviewed.effectiveTo});
      }else if(reviewed&&String(row.label).replace(/\s+/g,'')===String(reviewed.bands[index]).replace(/\s+/g,'')){
        Object.assign(record,{sourceBand:reviewed.bands[index],bandIndex:index,direction:reviewed.direction,departureCountry:reviewed.departureCountry,publishedAt:reviewed.publishedAt,effectiveFrom:reviewed.effectiveFrom,effectiveTo:reviewed.effectiveTo});
      }
    }
    if(!core.money(record.amount))return null;
    if(code==='BX'||code==='ZE')record.basis='route-group-'+(index+1);
    return core.reconcile(record,routeSpecific?null:noticeOnlyEvaluator());
  }
  function selectedIndex(code,dep,arr){
    var n=notice(code),data=window._OFFICIAL_AMT&&window._OFFICIAL_AMT[code];
    if(!data)return -1;
    if(code==='BX'||code==='ZE')return core.officialRouteGroupIndex(n,dep,arr);
    var basis=window.OFFICIAL_ROUTE_MAP&&window.OFFICIAL_ROUTE_MAP[code]&&window.OFFICIAL_ROUTE_MAP[code][dep+'-'+arr];
    return basis?data.rows.findIndex(function(row){return row.range===basis;}):-1;
  }
  function koreaMonth(){return new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit'}).format(new Date());}
  function latestTime(values){return values.filter(function(v){return typeof v==='string'&&Number.isFinite(Date.parse(v));}).sort(function(a,b){return Date.parse(b)-Date.parse(a);})[0]||null;}
  function landingMonthState(code,month){
    var data=window._OFFICIAL_AMT&&window._OFFICIAL_AMT[code],n=notice(code),records=[],total=0,verified=0;
    var slot=month==='2026-10'?'july':month==='2026-11'?'august':null;
    var url=month==='2026-11'&&n?n.url:month==='2026-10'?(window.OCTOBER_2026_NOTICE_LINKS||{})[code]:null;
    if(data&&slot)data.rows.forEach(function(row,index){
      if(!core.money(row[slot]))return;
      total++;
      // This checks notice bands without making a route/flight-schedule claim.
      var record=recordFor(code,index,month,'ICN','NRT',false);
      var completeNotice=month!=='2026-11'||window.AeroSourceTrust&&window.AeroSourceTrust.summarize([n],month).verifiedCount===1;
      if(record&&record.amount===row[slot]&&completeNotice&&core.isConfirmed(record,noticeOnlyEvaluator())){verified++;records.push(record);}
    });
    return {month:month,url:core.safeUrl(url),total:total,verified:verified,status:total&&verified===total?'verified':verified?'partial':total?'pending':'missing',sourceVerifiedAt:latestTime(records.map(function(r){return r.verifiedAt;})),collectedAt:latestTime(records.map(function(r){return r.collectedAt;}))};
  }
  function landingState(code){
    var period=window.AeroNoticePeriod&&window.AeroNoticePeriod.state(),noticeMonth=period?period.noticeMonth:'2026-11';
    var current=landingMonthState(code,period?period.currentMonth:koreaMonth()),latest=landingMonthState(code,notice(code)?noticeMonth:'2026-10');
    return {current:current,latest:latest,publication:landingMonthState(code,noticeMonth)};
  }
  function summarizeComparison(pairs){
    if(!pairs.length)return null;
    var rates=pairs.map(function(pair){return pair.percent;}),minimum=Math.min.apply(null,rates),maximum=Math.max.apply(null,rates);
    return {kind:minimum>0?'increase':maximum<0?'decrease':minimum===0&&maximum===0?'unchanged':minimum===0?'rise_and_unchanged':maximum===0?'fall_and_unchanged':'mixed',minimum:minimum,maximum:maximum,pairs:pairs,archived:pairs.some(function(pair){return !pair.sourceVerified;})};
  }
  function landingComparison(code){
    var n=notice(code),data=window._OFFICIAL_AMT&&window._OFFICIAL_AMT[code],pairs=[];
    if(!n||!data||landingMonthState(code,'2026-11').status!=='verified'||data.currency!==n.currency||!Array.isArray(n.october)||n.october.length!==n.bands.length||new Set(data.rows.map(function(row){return row.range;})).size!==data.rows.length)return null;
    var reviewedOld=window.AeroSourceTrust&&window.AeroSourceTrust.getNotice(code,'2026-10');
    n.bands.forEach(function(band,index){
      var displayIndex=n.displayBandIndices?n.displayBandIndices.indexOf(index):index;
      var row=data.rows[displayIndex],baseline=n.october[index],target=n.november[index];
      // Both saved monthly slots must identify the same row and native currency.
      // Nulls, missing amounts, zero denominators and mismatched slots are omitted.
      if(!row||!row.range||!band||!core.money(baseline)||baseline===0||!core.money(target)||row.july!==baseline||row.august!==target)return;
      // Known original-source disagreement cannot be reclassified as an archive.
      if(reviewedOld&&(reviewedOld.currency!==n.currency||reviewedOld.direction!==n.direction||reviewedOld.departureCountry!==n.departureCountry||reviewedOld.bands[index]!==band||reviewedOld.amounts[index]!==baseline))return;
      var baseRecord=recordFor(code,displayIndex,'2026-10','ICN','NRT',false),targetRecord=recordFor(code,displayIndex,'2026-11','ICN','NRT',false);
      pairs.push({band:band,basis:row.range,currency:n.currency,base:baseline,target:target,percent:(target-baseline)/baseline*100,sourceVerified:core.compare(baseRecord,targetRecord,noticeOnlyEvaluator()).valid});
    });
    return summarizeComparison(pairs);
  }
  function comparisonLabel(comparison){
    var index=['increase','decrease','unchanged','rise_and_unchanged','fall_and_unchanged','mixed'].indexOf(comparison.kind);
    return comparisonText(index<0?5:index,comparison);
  }
  function landingComparisonHtml(code){
    var comparison=landingComparison(code);if(!comparison)return '';
    var ko=language(),label=comparisonLabel(comparison),pending=comparison.pairs.filter(function(pair){return !pair.sourceVerified;});
    var explanation=comparisonText(6,comparison);
    if(pending.length)explanation+=' '+comparisonText(7,comparison);
    return '<details class="mini-trend-details" style="font-size:var(--font-caption);line-height:1.6"><summary title="'+esc(explanation)+'" aria-label="'+esc(code+' · '+label+(comparison.archived?' · '+(text('보관 기록 기준','Retained records')):'')+' · '+(text('계산 근거 보기','Calculation details')))+'" style="cursor:pointer;color:#075985"><span class="mini-trend-label">'+esc(label)+'</span>'+(comparison.archived?' <small class="mini-archive-mark" style="color:var(--muted)">'+(text('보관 기록 기준','Retained records'))+'</small>':'')+'</summary><div style="margin-top:5px;color:var(--muted);overflow-wrap:anywhere">'+esc(explanation)+'<ul style="padding-left:16px;margin:5px 0">'+comparison.pairs.map(function(pair){return '<li>'+esc(pair.band+' · '+pair.currency+' '+pair.base.toLocaleString('en-US')+' → '+pair.target.toLocaleString('en-US')+' · '+(pair.percent>0?'+':'')+pair.percent.toFixed(1)+'%')+(!pair.sourceVerified?' · '+(text('10월 보관 기록','October retained record')):'')+'</li>';}).join('')+'</ul></div></details>';
  }
  function landingLabel(state){
    var ko=language();
    return state.status==='verified'?(text('공시 완료','Notice available')):state.status==='partial'||state.status==='pending'?(text('공시 확인 중','Notice pending')):(text('해당 월 데이터 없음','No data for this month'));
  }
  function updateStatusText(siteEditedAt){
    var cta={
      ko:['항공권 총액 확인 후 바로 비교','항공권 가격 비교','여행 상품 확인','예약 타이밍 판단'],
      en:['Compare the total airfare','Compare flight prices','Explore travel products','Review booking timing'],
      ja:['航空券の総額を比較','航空券価格を比較','旅行商品を確認','予約時期を検討'],
      zh:['比较机票总价','比较机票价格','查看旅行产品','判断预订时机'],
      fr:['Comparez le prix total du billet','Comparer les prix des vols','Voir les offres de voyage','Évaluer la date de réservation'],
      de:['Gesamten Ticketpreis vergleichen','Flugpreise vergleichen','Reiseangebote ansehen','Buchungszeitpunkt prüfen']
    },ctaCopy=cta[locale()]||cta.en;
    document.querySelectorAll('.myrealtrip-cta .cta-kicker').forEach(function(e){e.textContent=ctaCopy[0];});
    document.querySelectorAll('.myrealtrip-cta .cta-benefits').forEach(function(e){Array.from(e.children).forEach(function(item,index){if(ctaCopy[index+1])item.textContent=ctaCopy[index+1];});});
    var text=document.getElementById('statusText');if(!text)return;
    var labels={
      ko:{notice:'공시 확인',market:'시장 자료 기준',edited:'사이트 문구 수정',collected:'공시 수집',feed:'별도 피드 파일 갱신',missing:'미기록'},
      en:{notice:'Notices checked',market:'Market information cutoff',edited:'Site text edited',collected:'Notice collected',feed:'Separate feed file updated',missing:'not recorded'},
      ja:{notice:'公示確認',market:'市場資料基準',edited:'サイト文言更新',collected:'公示取得',feed:'別途フィードファイル更新',missing:'記録なし'},
      zh:{notice:'公告核实',market:'市场资料截至',edited:'网站文字更新',collected:'公告收集',feed:'独立数据文件更新',missing:'未记录'},
      fr:{notice:'Avis vérifiés',market:'Date limite des données de marché',edited:'Texte du site modifié',collected:'Avis collectés',feed:'Fichier de données distinct mis à jour',missing:'non consigné'},
      de:{notice:'Mitteilungen geprüft',market:'Stichtag der Marktdaten',edited:'Website-Text geändert',collected:'Mitteilungen erfasst',feed:'Separate Datendatei aktualisiert',missing:'nicht erfasst'}
    },copy=labels[locale()]||labels.en;
    var states=(window.KR_AIRLINES||[]).flatMap(function(al){var state=landingState(al.code);return [state.current,state.latest];});
    var period=window.AeroNoticePeriod&&window.AeroNoticePeriod.state(),market=window.AERO_MARKET_NUMBERS_LATEST||{};
    function stamp(value){return value&&Number.isFinite(Date.parse(value))?new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(new Date(value))+' KST':copy.missing;}
    var verifiedAt=period&&period.sourceVerifiedAt||latestTime(states.map(function(s){return s.sourceVerifiedAt;}));
    text.textContent=copy.notice+': '+stamp(verifiedAt)+' · '+copy.market+': '+stamp(market.informationCutoff)+' · '+copy.edited+': '+stamp(siteEditedAt);
    var details=[],collectedAt=latestTime(states.map(function(s){return s.collectedAt;}));
    if(collectedAt)details.push(copy.collected+': '+stamp(collectedAt));
    var feedDate=window.FEED&&window.FEED.meta&&window.FEED.meta.lastUpdated;
    if(feedDate)details.push(copy.feed+': '+stamp(feedDate));
    text.title=details.join(' · ');
    var strip=document.getElementById('statusStrip');if(strip)strip.style.display='flex';
  }
  function install(){
    ['BX','ZE'].forEach(function(code){
      var n=notice(code),data=window._OFFICIAL_AMT&&window._OFFICIAL_AMT[code];
      if(!n||!data||!window.OFFICIAL_ROUTE_MAP)return;
      var original=window.OFFICIAL_ROUTE_MAP[code]||{},next={};
      Object.keys(original).forEach(function(route){var p=route.split('-'),i=core.officialRouteGroupIndex(n,p[0],p[1]);if(i>=0&&data.rows[i])next[route]=data.rows[i].range;});
      if(n.routesByGroup)n.routesByGroup.forEach(function(routes,i){routes.forEach(function(route){if(data.rows[i])next[route]=data.rows[i].range;});});
      core.noticeRouteApplicability.filter(function(route){return route.airline===code;}).forEach(function(route){var i=core.officialRouteGroupIndex(n,route.origin,route.destination);if(i>=0&&data.rows[i])next[route.origin+'-'+route.destination]=data.rows[i].range;});
      window.OFFICIAL_ROUTE_MAP[code]=next;
    });
    window.buildOfficialSection=function(cd,al,miles,isRT,dep,arr){
      var data=window._OFFICIAL_AMT&&window._OFFICIAL_AMT[al.code],selected=selectedIndex(al.code,dep,arr),ko=language(),mult=isRT?2:1;
      if(!data||selected<0)return '<p class="official-section">'+(text('해당 노선의 부과 구간을 확인할 수 없습니다.','No charging group established for this route.'))+'</p>';
      function amount(record){return record?esc(record.currency)+' '+(record.amount*mult).toLocaleString('en-US',{maximumFractionDigits:2}):'—';}
      function cell(record,index){
        if(!record)return '—<br><small>'+(text('공식 데이터 없음','No official data'))+'</small>';
        var confirmed=core.isConfirmed(record,index===selected?null:noticeOnlyEvaluator());
        return amount(record)+'<br><small class="source-verification-status" style="white-space:normal;color:var(--muted)">'+(confirmed?(text('공시 확인 완료','Notice confirmed')):(text('확인 중','Pending')))+'</small>';
      }
      var rows=data.rows.map(function(row,index){
        var baseline=recordFor(al.code,index,'2026-10',dep,arr,index===selected),target=recordFor(al.code,index,'2026-11',dep,arr,index===selected);
        var comparison=core.compare(baseline,target,index===selected?null:noticeOnlyEvaluator()),delta='—';
        if(comparison.valid)delta=(comparison.difference<0?'-':comparison.difference>0?'+':'')+esc(comparison.currency)+' '+(Math.abs(comparison.difference)*mult).toLocaleString('en-US',{maximumFractionDigits:2})+'<br>'+(comparison.percent===null?(text('기준액 0: 비율 계산 불가','Zero baseline: no percentage')):(comparison.percent>0?'+':'')+comparison.percent.toFixed(2)+'%');
        var band=target&&target.band||baseline&&baseline.band||row.label;
        return '<tr class="'+(index===selected?'highlighted':'')+'" data-source-verified="'+String(index===selected&&core.isConfirmed(target))+'"><td><span class="route-range">'+esc(band)+'</span>'+(index===selected?'<span class="route-highlight-badge">'+(text('선택 노선','Selected route'))+'</span>':'')+'</td><td class="route-amt-current">'+cell(baseline,index)+'</td><td class="route-amt-next">'+cell(target,index)+'</td><td>'+delta+'</td></tr>';
      }).join('');
      var applicability=core.noticeRouteApplicability.find(function(route){return route.airline===al.code&&route.origin===dep&&route.destination===arr;});
      var scopeNote=applicability?'<p class="notice-route-scope" style="font-size:var(--font-small);line-height:1.7">'+(text('부산 출발 UBN 공시 금액 조회입니다. 현재 운항일·좌석 제공을 뜻하지 않습니다. ','Published surcharge lookup for PUS–UBN. This does not establish current operating dates or seat availability. '))+'<a href="'+esc(applicability.routeSourceUrl)+'" target="_blank" rel="noopener noreferrer">'+(text('항공사 노선 근거','Airline route source'))+'</a> · <a href="https://www.airbusan.com/web/individual/booking/schedule" target="_blank" rel="noopener noreferrer">'+(text('운항 일정 확인','Check schedules'))+'</a></p>':'';
      var sources=['2026-10','2026-11'].map(function(month){var record=recordFor(al.code,selected,month,dep,arr,true);if(!record)return '';return (record.sourceUrl?'<a href="'+esc(record.sourceUrl)+'" target="_blank" rel="noopener noreferrer">'+month+' '+(text('원문 링크','Source link'))+'</a>':'')+' · '+(text('발표일: ','Published: '))+esc(record.publishedAt||(text('미기록','not recorded')))+' · '+(text('확인일: ','Checked: '))+esc(record.verifiedAt||(text('미기록','not recorded')))+(record.effectiveFrom?' · '+(text('발권 적용: ','Ticketing: '))+esc(record.effectiveFrom)+' – '+esc(record.effectiveTo):'');}).filter(Boolean).join('<br>');
      var selectedBaseline=recordFor(al.code,selected,'2026-10',dep,arr,true);
      var selectedTarget=recordFor(al.code,selected,'2026-11',dep,arr,true);
      var selectedComparison=core.compare(selectedBaseline,selectedTarget);
      var selectedBand=selectedTarget&&selectedTarget.band||selectedBaseline&&selectedBaseline.band||data.rows[selected].label;
      var journey=isRT?text('단순 왕복 추정: 한국 출발 편도 × 2','Simple round-trip estimate: Korea-origin one-way × 2'):text('1인 편도','One-way per person');
      var summaryChange='—',summaryChangeNote=selectedComparison.reason==='conditions'?text('비교 불가 · 조건 다름','Cannot compare · different conditions'):text('비교 불가 · 확인 중','Cannot compare · checking');
      if(selectedComparison.valid){
        summaryChange=(selectedComparison.difference<0?'-':selectedComparison.difference>0?'+':'')+esc(selectedComparison.currency)+' '+(Math.abs(selectedComparison.difference)*mult).toLocaleString('en-US',{maximumFractionDigits:2});
        summaryChangeNote=selectedComparison.percent===null?text('기준액 0: 비율 계산 불가','Zero baseline: no percentage'):(selectedComparison.percent>0?'+':'')+selectedComparison.percent.toFixed(2)+'%';
      }
      var targetStatus=!selectedTarget?text('공식 데이터 없음','No official data'):core.isConfirmed(selectedTarget)?text('공시 확인 완료','Notice confirmed'):text('확인 중','Pending');
      var selectedSummary='<section class="selected-route-summary" data-source-verified="'+String(core.isConfirmed(selectedTarget))+'">'+
        '<p class="route-summary-basis"><span>'+text('공시 부과 구간','Published charging band')+' · '+esc(selectedBand)+'</span><span>'+esc(dep+' → '+arr)+' · '+journey+'</span></p>'+
        '<dl class="route-summary-metrics">'+
          '<div class="route-summary-metric route-summary-metric-primary"><dt class="route-summary-label">'+text('11월 공시 금액','November notice amount')+'</dt><dd class="route-summary-value">'+amount(selectedTarget)+'</dd></div>'+
          '<div class="route-summary-metric"><dt class="route-summary-label">'+text('10월 공시 금액','October notice amount')+'</dt><dd class="route-summary-value">'+cell(selectedBaseline,selected)+'</dd></div>'+
          '<div class="route-summary-metric"><dt class="route-summary-label">'+text('차액 / 변동률','Difference / change')+'</dt><dd class="route-summary-value route-summary-change" data-comparable="'+String(selectedComparison.valid)+'">'+summaryChange+'<small>'+esc(summaryChangeNote)+'</small></dd></div>'+
        '</dl><p class="route-summary-source"><span class="source-verification-status">2026.11 · '+targetStatus+'</span>'+
          (selectedTarget&&selectedTarget.sourceUrl?'<a href="'+esc(selectedTarget.sourceUrl)+'" target="_blank" rel="noopener noreferrer">'+text('11월 공시 원문','November source notice')+'</a>':'')+'</p></section>';
      return '<div class="official-section">'+selectedSummary+scopeNote+
        '<details class="route-details"><summary>'+text('구간별 금액과 확인 근거','Amounts by band and verification details')+'</summary>'+
          '<div class="official-label">'+text('공시 금액 · 원통화','Notice amounts · original currency')+'</div>'+
          '<div class="route-table-wrap"><table class="route-table"><thead><tr><th>'+text('공시 부과 구간','Published charging band')+'</th><th>2026.10</th><th>2026.11</th><th>'+text('차액 / 변동률','Difference / change')+'</th></tr></thead><tbody>'+rows+'</tbody></table></div>'+
          '<p style="font-size:var(--font-caption);line-height:1.7">'+text('확인된 금액만 비교합니다. 확인 중인 금액은 비교에서 제외합니다.','Only confirmed amounts are compared. Pending amounts are excluded.')+'<br>'+sources+'</p>'+
        '</details></div>';
    };
    window._trendBadgeHtml=function(code,miles,dep,arr){
      var index=selectedIndex(code,dep,arr);if(index<0)return '';
      var comparison=core.compare(recordFor(code,index,'2026-10',dep,arr,true),recordFor(code,index,'2026-11',dep,arr,true));
      if(!comparison.valid||comparison.percent===null)return '';
      return '<span style="font-size:var(--font-caption);color:#075985">'+(comparison.percent>0?'+':'')+comparison.percent.toFixed(2)+'%</span>';
    };
    window.AeroHomePlatform={recordFor:recordFor,selectedIndex:selectedIndex,landingState:landingState,landingLabel:landingLabel,landingComparison:landingComparison,landingComparisonHtml:landingComparisonHtml,summarizeComparison:summarizeComparison,comparisonLabel:comparisonLabel,updateStatusText:updateStatusText};
    (window.KR_AIRLINES||[]).forEach(function(al){al.hasOfficialNotice=landingState(al.code).current.status==='verified';});
    if(window.renderLanding)window.renderLanding();
    if(window.refreshHomeResults)window.refreshHomeResults();
  }
  if(window.addEventListener)window.addEventListener('aero:notice-period-change',function(){
    (window.KR_AIRLINES||[]).forEach(function(al){al.hasOfficialNotice=landingState(al.code).current.status==='verified';});
    if(window.renderLanding)window.renderLanding();
  });
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
