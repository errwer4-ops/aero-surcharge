const {chromium} = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {spawn} = require('node:child_process');
const {createHash} = require('node:crypto');
const root = path.resolve(__dirname, '..');
const port = Number(process.env.NOV16_TEST_PORT || 4232);
const origin = process.env.AERO_QA_ORIGIN || 'http://127.0.0.1:' + port;
const out = path.join(os.tmpdir(), 'aero-nov16-qa');
const langs = ['ko', 'en', 'ja', 'zh', 'fr', 'de'];
const prefix = 'market-20261116-';
const cutoff = '2026-11-16T09:00:00+09:00';
const normalize = text => String(text).replace(/\s+/g, ' ').trim();
const scriptSha256=createHash('sha256').update(fs.readFileSync(__filename)).digest('hex');
fs.mkdirSync(out, {recursive:true});

// Derive the preceding shared data from the checkout; no untracked artifact fixture is required.
const shared = fs.readFileSync(path.join(root, 'public/_shared.js'), 'utf8');
const appendMarker = '/* November 16 09:00 KST reviewed snapshot.';
const appendOffset = shared.indexOf(appendMarker);
assert(appendOffset > 0, 'November 16 append boundary exists');
assert.equal(shared.lastIndexOf(appendMarker), appendOffset, 'one November 16 snapshot boundary');
const previousShared = shared.slice(0, appendOffset);
const captureShared='\n;window.__NOV16_QA_SHARED_STATE=JSON.parse(JSON.stringify({snapshots:window.AERO_MARKET_SNAPSHOTS,latest:window.AERO_MARKET_NUMBERS_LATEST}));';
const sourceUrls = {
  fx:'https://view.asiae.co.kr/article/2026111315345800319',
  fxClose:'https://www.newsis.com/view/NISX20261113_0003867424',
  oil:'https://news.einfomax.co.kr/news/articleView.html?idxno=4444752',
  oilCorroboration:'https://www.marketscreener.com/news/oil-prices-set-for-second-weekly-decline-as-trump-sticks-with-iran-blockade-ce785ed9db81f121',
  jet:'https://commodityscope.com/prices/singapore-jet-kerosene',
  jetCategory:'https://commodityscope.com/prices/jet-fuel',
  traffic:'https://insights.windward.ai/',
  inventory:'https://www.eia.gov/petroleum/supply/weekly/archive/2026/2026_11_12/download/table6.csv',
  iea:'https://www.iea.org/reports/oil-market-report-november-2026',
  ukmto:'https://www.ukmto.org/-/media/ukmto/products/20261113-ukmto_vra_overview_u.pdf?rev=f163325bceb8457fa7f891c6c48dafa5',
  claim:'https://www.aol.com/articles/irans-navy-says-three-tankers-103107000.html'
};
function beforeCutoff(value, label) {
  assert(Number.isFinite(Date.parse(value)), label + ' explicit availability timestamp');
  assert(Date.parse(value) <= Date.parse(cutoff), label + ' available before cutoff');
}

function checkNumbers(n) {
  // Independent expectations transcribed from reviewed sources, not copied from the renderer.
  const expected = {
    informationCutoff:cutoff,currentMonth:'2026-11',currentStage:27,
    currentMonthNotice:'2026-11',confirmedMonth:'2026-11',currentAppliedMonth:'2026-11',confirmedNoticeMonth:'2026-11',
    outlookDirection:'mixed_signals_confirmation_pending',
    novemberCalculationStatus:'period_ended_Korean_Air_average_reported_not_direct_Platts_verification',
    mopsUsdPerGallon:null,mopsUsdPerBbl:null,mopsCentsPerGallon:null,
    novemberMopsUsdPerBbl:173.89,novemberMopsCentsPerGal:414.03,
    hormuzOilFlowLast24hBbl:null,hormuzCrudeShipmentBbl:null,hormuzCrudeShipmentPrevDayBbl:null,
    currentStageScope:'Korean_Air_reported_reference_not_common_to_all_airlines',octoberStatus:'archive',
    usdKrw:1336.7,usdKrwDate:'2026-11-13',usdKrwDailyChange:6,usdKrwDailyChangePercent:null,
    usdKrwReferenceAt:'2026-11-13T15:30:00+09:00',
    brentUsdPerBbl:95.84,wtiUsdPerBbl:88.56,brentDailyChangeUsd:0.02,wtiDailyChangeUsd:-0.18,
    brentPct:0.02,wtiPct:-0.2,crudePriceDate:'2026-11-13',crudePriceKind:'settlement',
    brentContractMonth:'2027-01',wtiContractMonth:'2026-12',
    oilReferenceType:'2026-11-13 futures_settlement',oilReferenceTime:'2026-11-13 settlement_not_intraday',
    singaporeJetFobReferenceUsdPerBbl:147.37,singaporeJetFobReferenceDate:'2026-11-11',
    commodityScopeJetUsdPerBbl:147.37,commodityScopeJetDate:'2026-11-11',commodityScopeConfidence:'low',
    singaporeJetDailyChangeUsd:1.39,singaporeJetDailyChangePct:1,singaporeJetPreviousAssessmentDate:'2026-11-10',
    singaporeJetSourcePublishedAt:null,
    singaporeJetLatestVerifiedUsdPerBbl:null,singaporeJetLatestVerifiedDate:null,
    singaporeJetFirstSearchStartedAt:null,
    singaporeJetPriorObservationWindowStart:'2026-11-13T08:57:05+09:00',singaporeJetPriorObservationWindowEnd:'2026-11-13T08:57:15+09:00',
    imoCumulativeConfirmedIncidents:null,imoLatestConfirmedIncidentsAtCutoff:null,imoLatestFatalitiesAtCutoff:null,
    imoListConfirmedIncidents:null,imoCumulativeFatalities:null,imoListUpdated:null,imoSourcePublishedAt:null,
    windwardTrackedCrossings:9,windwardInboundCrossings:5,windwardOutboundCrossings:4,
    windwardDarkCrossings:9,windwardAisTrackedCrossings:0,windwardObservationDate:'2026-11-13',
    windwardObservationWindowStart:'2026-11-12T18:00:00Z',windwardObservationWindowEnd:'2026-11-13T18:00:00Z',
    windwardObservationWindowHours:24,windwardReportDate:'2026-11-14',windwardSourcePublishedAt:null,
    windwardSatelliteOnlyDetections:2,windwardObservationWindowStartBasis:'both_boundaries_explicit_in_provider_MIOC_text',
    iataJetFuelGlobalUsdPerBbl:178.95,iataJetFuelGlobalWeeklyChangePct:-6.6,
    iataJetFuelAsiaOceaniaUsdPerBbl:163.26,iataJetFuelAsiaOceaniaWeeklyChangePct:-6,
    iataJetFuelWeekEnding:'2026-11-06',iataJetFuelSourcePublishedAt:null,
    eiaSteoReportDate:'2026-11-10',eiaSteoForecastCompletedDate:'2026-11-05',
    eiaSteoBrentSpotNovemberDecember2026ApproxUsdPerBbl:100,eiaSteoBrentSpotQ4_2027AverageUsdPerBbl:77,
    eiaSteoKind:'conditional_model_forecast_not_observed_spot_futures_or_MOPS',eiaSteoSourcePublishedAt:null,
    eiaJetInventoryMillionBarrels:41.979,eiaJetInventoryPreviousMillionBarrels:41.782,
    eiaJetInventoryWeeklyChangeMillionBarrels:0.197,eiaJetInventoryWeekEnded:'2026-11-06',eiaJetInventoryReportDate:'2026-11-12',
    eiaJetInventorySourcePublishedAt:null,eiaJetInventoryScheduledTimeIsNotActualPublication:true,
    opecMomrReportMonth:'2026-11',opecMomrObservationMonth:'2026-10',
    opecMomrDocCrudeProductionMillionBpd:41.23,opecMomrDocCrudeProductionMonthlyChangeMillionBpd:2.04,
    opecMomrSourcePublishedAt:null,
    ieaOmrReportDate:'2026-11-13',ieaOmrObservationMonth:'2026-10',
    ieaOmrGlobalOilSupplyMillionBpd:105.4,ieaOmrGlobalOilSupplyMonthlyChangeMillionBpd:2.3,
    ieaOmrGulfOilExportsExcludingOmanMillionBpd:18.4,ieaOmrGulfCrudeExportsMillionBpd:15,
    ieaOmrGulfOilExportsPercentBelowPrewar:26,ieaOmrGulfCrudeExportsPercentOfPrewar:82,
    ieaOmrSourcePublishedAt:null,ieaOmrSourceCheckedAt:null,
    ukmtoWeeklyIncidents:8,ukmtoWeeklyAttacks:7,ukmtoWeeklyAdvisories:1,
    ukmtoWeeklyObservationStart:'2026-11-05',ukmtoWeeklyObservationEnd:'2026-11-11',ukmtoWeeklyReportDate:'2026-11-13',
    ukmtoWeeklySourcePublishedAt:null,ukmtoWeeklySourceCheckedAt:null,
    iranMineClaimVessels:3,iranMineClaimIndependentlyVerified:false,
    iranMineClaimAnnouncedDate:'2026-11-14',iranMineClaimEventDate:null,iranMineClaimClaimedEventDate:'2026-11-14',
    iranMineClaimSupplyDisruptionBarrelsPerDay:null,
    decemberCalculationStatus:'period_ended_official_average_and_notices_unconfirmed',
    decemberCalculationPeriodEnded:true,
    decemberDirection:'mixed_signals_confirmation_pending',decemberDirectionConfidence:'low',
    decemberCalculationStart:'2026-10-16',decemberCalculationEnd:'2026-11-15'
  };
  for(const [key,value] of Object.entries(expected)) assert.equal(n[key],value,key+' independently checked source value');
  assert.equal(n.runKind,'scheduled_0900');
  assert.equal(n.scheduledReferenceTimeUsed,true);
  assert.match(n.lastUpdated,/^2026-11-16T/);
  assert(Date.parse(n.lastUpdated)>=Date.parse(cutoff),'actual modification is separate from source cutoff');
  assert.equal(n.windwardTrackedCrossings,n.windwardInboundCrossings+n.windwardOutboundCrossings);
  assert.equal(n.windwardTrackedCrossings,n.windwardAisTrackedCrossings+n.windwardDarkCrossings);
  assert.equal(n.ukmtoWeeklyIncidents,n.ukmtoWeeklyAttacks+n.ukmtoWeeklyAdvisories);
  assert(Date.parse(n.decemberCalculationEnd)<Date.parse(cutoff),'calculation calendar interval has ended');
  assert.equal(Date.parse(n.windwardObservationWindowEnd)-Date.parse(n.windwardObservationWindowStart),24*60*60*1000);
  assert.equal(Date.parse(n.windwardSourceLastModifiedAt),Date.parse('2026-11-13T21:41:58Z'));
  assert.deepEqual(
    {asAt:n.imoHistoricalReference.asAt,count:n.imoHistoricalReference.confirmedIncidents,deaths:n.imoHistoricalReference.fatalities},
    {asAt:'2026-11-11',count:134,deaths:25}
  );
  beforeCutoff(n.imoHistoricalReference.sourceCheckedAt,'previously observed IMO historical reference');
  assert(Date.parse(n.imoLatestPageCheckedAt)>Date.parse(cutoff),'changed latest IMO page first read after cutoff');
  assert.match(n.imoLatestAvailabilityAtCutoff,/after_cutoff/);
  assert.equal(Date.parse(n.singaporeJetFirstSearchReturnedByUpperBound),Date.parse('2026-11-13T08:57:15+09:00'));
  beforeCutoff(n.singaporeJetFirstSearchReturnedByUpperBound,'Jet conservative search-return upper bound');
  assert.match(n.singaporeJetFirstSearchTimingMethod,/bounded.*not_exact/,'bound is not an invented exact retrieval clock');
  assert(Date.parse(n.singaporeJetSourceCheckedAt)>Date.parse(cutoff),'detail check remains separate from pre-cutoff search');
  assert.match(n.singaporeJetSourceAvailability,/historical|previous|prior/);
  assert.match(n.opecMomrProductionKind,/secondary_source.*not.*policy.*exports.*Hormuz/);
  for(const key of ['fxSourcePublishedAt','crudeSourcePublishedAt','windwardSourceLastModifiedAt','iataJetFuelSourceLastModifiedAt','eiaSteoPdfLastModifiedAt']) beforeCutoff(n[key],key);
  assert.equal(n.fxReferenceSourceUrl,sourceUrls.fx);
  assert.equal(n.fxDaytimeCloseCorroboratingSourceUrl,sourceUrls.fxClose);
  assert.equal(n.crudeSourceUrl,sourceUrls.oil);
  assert.equal(n.crudeCorroboratingSourceUrl,sourceUrls.oilCorroboration);
  assert.equal(n.fxSourcePublishedAt,'2026-11-13T15:34:58+09:00');
  assert.equal(n.crudeSourcePublishedAt,'2026-11-14T07:07:23+09:00');
  assert.equal(n.crudeSourceUpdatedAt,null,'minute-only update must not become an exact timestamp');
  assert.equal(n.crudeSourceUpdatedMinute,'2026-11-14T07:08+09:00');
  assert.equal(n.crudeCorroboratingSettlementAvailableAt,null,'initial Reuters clock does not prove settlement availability');
  assert.equal(n.eiaJetInventorySourceUrl,sourceUrls.inventory);
  assert.equal(n.ieaOmrSourceUrl,sourceUrls.iea); assert.equal(n.ukmtoWeeklySourceUrl,sourceUrls.ukmto);
  assert.equal(n.iranMineClaimSourceUrl,sourceUrls.claim);
  beforeCutoff(n.eiaJetInventorySourceLastModifiedAt,'EIA source availability distinct from release schedule');
  beforeCutoff(n.ukmtoWeeklyOfficialDistributionAt,'UKMTO official distribution distinct from first publication');
  assert.equal(n.iranMineClaimSourcePublishedAt,'2026-11-14T10:31:07Z');
  assert.equal(n.iranMineClaimSourceUpdatedAt,'2026-11-14T22:54:12Z');
  for(const source of ['ieaOmr','ukmtoWeekly']) {
    assert(Date.parse(n[source+'SourceCheckWindowStart'])>Date.parse(cutoff),source+' actual post-cutoff web check window');
    assert(Date.parse(n[source+'SourceCheckWindowEnd'])>=Date.parse(n[source+'SourceCheckWindowStart']),source+' valid check window');
  }
  for(const key of ['currentHormuzTraffic','hormuzLatestGulfCrudeFlowMillionBpd','decemberMopsUsdPerBbl','decemberAverageUsdKrw','decemberStageEstimate','decemberOfficialAmounts','crudeIntradayAt']) assert.equal(n[key],null,key+' not inferred');
}

function checkFeed(feed,n) {
  assert.equal(feed.meta.informationCutoff,cutoff);
  assert.equal(feed.meta.lastUpdated,n.lastUpdated);
  const input=feed.meta.inputs;
  const pairs={
    usdKrw:'usdKrw',usdKrwDailyChange:'usdKrwDailyChange',brentUSD:'brentUsdPerBbl',wtiUSD:'wtiUsdPerBbl',
    brentContract:'brentContractMonth',wtiContract:'wtiContractMonth',brentDailyChangeUSD:'brentDailyChangeUsd',wtiDailyChangeUSD:'wtiDailyChangeUsd',
    brentDailyChangePercent:'brentPct',wtiDailyChangePercent:'wtiPct',
    singaporeJetPrivateAssessmentUsdPerBbl:'singaporeJetFobReferenceUsdPerBbl',singaporeJetAssessmentDate:'singaporeJetFobReferenceDate',
    singaporeJetDailyChangeUSD:'singaporeJetDailyChangeUsd',imoConfirmedIncidents:'imoCumulativeConfirmedIncidents',
    imoListConfirmedIncidents:'imoListConfirmedIncidents',imoFatalities:'imoCumulativeFatalities',imoListDate:'imoListUpdated',
    fxSourceUrl:'fxReferenceSourceUrl',crudeSourceUrl:'crudeSourceUrl'
  };
  for(const [feedKey,numberKey] of Object.entries(pairs)) assert.equal(input[feedKey],n[numberKey],feedKey+' synchronized');
  const sameKeys=[
    'windwardTrackedCrossings','windwardInboundCrossings','windwardOutboundCrossings','windwardAisTrackedCrossings','windwardDarkCrossings',
    'windwardSatelliteOnlyDetections',
    'windwardObservationDate','windwardReportDate','windwardObservationWindowStart','windwardObservationWindowEnd','windwardObservationWindowHours','windwardObservationWindowStartBasis',
    'iataJetFuelGlobalUsdPerBbl','iataJetFuelAsiaOceaniaUsdPerBbl','iataJetFuelWeekEnding','imoLatestConfirmedIncidentsAtCutoff','imoLatestFatalitiesAtCutoff',
    'eiaSteoReportDate','eiaSteoForecastCompletedDate','eiaSteoBrentSpotNovemberDecember2026ApproxUsdPerBbl','eiaSteoBrentSpotQ4_2027AverageUsdPerBbl',
    'eiaJetInventoryMillionBarrels','eiaJetInventoryPreviousMillionBarrels','eiaJetInventoryWeeklyChangeMillionBarrels','eiaJetInventoryWeekEnded','eiaJetInventoryReportDate',
    'opecMomrReportMonth','opecMomrObservationMonth','opecMomrDocCrudeProductionMillionBpd','opecMomrDocCrudeProductionMonthlyChangeMillionBpd',
    'singaporeJetPreviousAssessmentDate','singaporeJetFirstSearchReturnedByUpperBound','singaporeJetFirstSearchTimingMethod',
    'singaporeJetLatestVerifiedUsdPerBbl','singaporeJetLatestVerifiedDate',
    'ieaOmrReportDate','ieaOmrObservationMonth','ieaOmrGlobalOilSupplyMillionBpd','ieaOmrGlobalOilSupplyMonthlyChangeMillionBpd',
    'ieaOmrGulfOilExportsExcludingOmanMillionBpd','ieaOmrGulfCrudeExportsMillionBpd','ieaOmrGulfOilExportsPercentBelowPrewar','ieaOmrGulfCrudeExportsPercentOfPrewar',
    'ukmtoWeeklyIncidents','ukmtoWeeklyAttacks','ukmtoWeeklyAdvisories','ukmtoWeeklyObservationStart','ukmtoWeeklyObservationEnd','ukmtoWeeklyReportDate',
    'iranMineClaimVessels','iranMineClaimIndependentlyVerified','iranMineClaimAnnouncedDate','iranMineClaimEventDate','iranMineClaimClaimedEventDate',
    'decemberCalculationStatus','oilReferenceType','oilReferenceTime'
  ];
  for(const key of sameKeys) assert.equal(input[key],n[key],key+' synchronized');
  assert.deepEqual(input.imoHistoricalReference,n.imoHistoricalReference);
  assert.equal(input.singaporeJetConfidence,'low');
  assert.equal(input.decemberOfficialMopsUsdPerBbl,null); assert.equal(input.decemberPeriodAverageUsdKrw,null);
  assert.match(input.fxKind,/15:30.*daytime_close/); assert.equal(input.fxObservationAt,'2026-11-13T15:30:00+09:00');
  assert.match(input.crudeKind,/settlement/); assert.equal(input.crudeObservationDate,'2026-11-13');
  for(const p of feed.forecasts) {
    assert.equal(p.targetPeriod,'2026.12'); assert.equal(p.direction,n.decemberDirection); assert.equal(p.confidence,'low');
    for(const key of ['predictedMin','predictedMax','officialStage','officialAmounts']) assert.equal(p[key],null);
  }
  assert.equal(feed.latest.informationCutoff,cutoff,'top-level latest cutoff is current');
  assert.equal(feed.latest.asOf,n.asOf,'top-level latest display cutoff agrees');
  assert.equal(feed.latest.runKind,n.runKind,'top-level latest execution kind agrees');
  assert.match(feed.latest.summary,/1,?336\.7/,'latest summary has current FX');
  assert.match(feed.latest.summary,/95\.84/,'latest summary has current Brent');
  assert.match(feed.latest.summary,/88\.56/,'latest summary has current WTI');
  assert.match(feed.latest.summary,/147\.37/,'latest summary has dated historical Jet assessment');
  assert.doesNotMatch(feed.latest.summary,/1,333\.6|92\.76|86\.53|145\.98|151\.15/);
  assert.equal(feed.latest.status,'period_ended_official_average_and_notices_unconfirmed');
  assert.equal(input.currentHormuzTraffic,null);
  assert.equal(input.hormuzLatestGulfCrudeFlowMillionBpd,null);
  assert.doesNotMatch(feed.latest.summary,/산정 중|산정중/,'ended calculation interval is not described as ongoing');
}

function checkTranslations(release,cards) {
  const historicalWords={ko:/과거/,en:/historical/i,ja:/過去/,zh:/历史/,fr:/historique/i,de:/historisch/i};
  const unknownWords={ko:/미확인|확인 불가/,en:/unconfirmed|unverified|unavailable/i,ja:/未確認|不明|未確定/,zh:/未确认|未核验|未核实|未知/,fr:/non confirm|non vérifi|inconnu|indisponible/i,de:/unbestätigt|nicht bestätigt|ungeklärt|unbekannt|nicht verifiziert|ungeprüft/i};
  const endedWords={ko:/종료|끝났/,en:/ended|closed|complete/i,ja:/終了/,zh:/结束|已满/,fr:/termin[ée]|clos/i,de:/beendet|abgeschlossen/i};
  for(const lang of langs) {
    const p=release.packs[lang], o=p.forecastOverview;
    assert.equal(release.rows[lang].length,5,lang+' established five indicators');
    assert.deepEqual(p.rows,release.rows[lang]);
    const marine=JSON.stringify(p.rows[4]);
    assert.match(marine,/134/); assert.doesNotMatch(marine,/\b136\b/,'post-cutoff count is withheld');
    assert.match(marine,historicalWords[lang],lang+' historical IMO label');
    assert.match(marine,unknownWords[lang],lang+' latest IMO unavailable label');
    const jet=JSON.stringify(p.rows[1]);
    assert.match(jet,/147[.,]37/); assert.match(jet,historicalWords[lang],lang+' jet is a dated historical reference');
    assert.match(jet,unknownWords[lang],lang+' latest cutoff jet price is not confirmed');
    assert(o,lang+' forecast overview');
    assert.equal(o.informationCutoff,cutoff);
    assert.equal(o.rows.length,5); assert.equal(o.columns.length,3);
    assert.deepEqual(o.rowTones,['hold','hold','up','hold','up'],lang+' mixed oil, rising FX, dated jet and maritime risk directions');
    for(const key of ['title','expectation','question','confidence','basis','risk','note']) {
      assert(typeof o[key]==='string' && o[key].trim(),lang+' overview '+key);
      if(lang!=='en') assert.notEqual(o[key],release.packs.en.forecastOverview[key],lang+' translated overview '+key);
    }
    assert.match([o.basis,o.risk,o.note,...p.faq.map(entry=>entry.a)].join(' '),endedWords[lang],lang+' December calculation interval has ended');
    assert(p.faq.length>0);
    p.faq.forEach((entry,i)=>{for(const key of ['q','a']) {
      assert(entry[key],lang+' FAQ '+i+' '+key);
      assert.doesNotMatch(entry[key],/1,333\.6|92\.76|86\.53|145\.98|151\.15/,lang+' current FAQ has no superseded or cutoff-withheld prices');
      if(lang!=='en') assert.notEqual(entry[key],release.packs.en.faq[i][key],lang+' translated FAQ');
    }});
    for(const key of ['desc','intro','verdict1']) {
      assert(typeof p[key]==='string' && p[key]);
      if(lang!=='en') assert.notEqual(p[key],release.packs.en[key],lang+' translated '+key);
    }
    for(const card of cards) {
      const item=card.i18n[lang]; assert(item,card.id+' '+lang);
      for(const key of ['title','summary','impact']) {
        assert(item[key],card.id+' '+lang+' '+key);
        if(lang!=='en') assert.notEqual(item[key],card.i18n.en[key],card.id+' translated '+key);
      }
      if(lang==='ko') assert.match(item.summary,/[가-힣]/);
      if(lang==='ja') assert.match(item.summary,/[ぁ-んァ-ン]/);
      if(lang==='zh') assert.match(item.summary,/[\u4e00-\u9fff]/);
    }
  }
}

function checkCards(cards,release) {
  assert.deepEqual(cards.map(c=>c.id).sort(),Array.from({length:7},(_,i)=>prefix+(i+1)).sort());
  const [fx,oil,inventory,traffic,iea,ukmto,claim]=Array.from({length:7},(_,i)=>cards.find(c=>c.id===prefix+(i+1)));
  assert.equal(fx.sourceUrl,sourceUrls.fx); assert(fx.citationUrls.includes(sourceUrls.fxClose));
  assert.equal(fx.eventDate,'2026-11-13T15:30:00+09:00'); assert.equal(fx.sourcePublishedAt,'2026-11-13T15:34:58+09:00');
  assert.equal(oil.sourceUrl,sourceUrls.oil); assert(oil.citationUrls.includes(sourceUrls.oilCorroboration));
  assert.equal(oil.eventDate,'2026-11-13'); assert.equal(oil.sourcePublishedAt,'2026-11-14T07:07:23+09:00');
  assert.equal(oil.brentContractMonth,'2027-01'); assert.equal(oil.wtiContractMonth,'2026-12');
  assert.equal(oil.sourceUpdatedAt,null); assert.equal(oil.sourceUpdatedMinute,'2026-11-14T07:08+09:00');
  assert.equal(oil.corroboratingInitialTimestampIsSettlementEvidence,false);
  assert.equal(inventory.sourceUrl,sourceUrls.inventory); assert.equal(inventory.sourcePublishedAt,null);
  assert.equal(inventory.eventDate,'2026-11-06'); assert.equal(inventory.sourceReleaseDate,'2026-11-12');
  assert.equal(inventory.previousObservationDate,'2026-10-30');
  assert.equal(inventory.scheduledTimeIsNotActualPublication,true);
  assert.match(inventory.stockScope,/US.*inventory_not_production/);
  assert.equal(traffic.sourceUrl,sourceUrls.traffic); assert.equal(traffic.sourcePublishedAt,null);
  assert.equal(traffic.observationStart,'2026-11-12T18:00:00Z'); assert.equal(traffic.observationEnd,'2026-11-13T18:00:00Z');
  assert.equal(traffic.observationHours,24); assert.equal(traffic.sourceReleaseDate,'2026-11-14');
  assert.equal(traffic.observationBoundariesExplicitInSource,true); assert.equal(traffic.satelliteOnlyDetectionsIncludedInTotal,true);
  assert.equal(iea.sourceUrl,sourceUrls.iea); assert.equal(iea.sourcePublishedAt,null);
  assert.equal(iea.sourceReleaseDate,'2026-11-13'); assert.equal(iea.observationPeriod,'2026-10');
  assert.equal(iea.eventDate,null); assert.equal(iea.crudeExportsIncludedInTotal,true);
  assert.equal(ukmto.sourceUrl,sourceUrls.ukmto); assert.equal(ukmto.sourcePublishedAt,null);
  assert.equal(ukmto.sourceReleaseDate,'2026-11-13');
  assert.equal(ukmto.observationStart,'2026-11-05'); assert.equal(ukmto.observationEnd,'2026-11-11');
  assert.equal(ukmto.eventDate,null); assert.equal(ukmto.observationTimeOfDay,null);
  assert.equal(ukmto.mixedTransitTotalsAdopted,false);
  beforeCutoff(ukmto.officialDistributionAt,'UKMTO official distribution');
  assert.equal(claim.sourceUrl,sourceUrls.claim); assert.equal(claim.sourcePublishedAt,'2026-11-14T10:31:07Z');
  assert.equal(claim.sourceUpdatedAt,'2026-11-14T22:54:12Z');
  assert.equal(claim.eventDate,null); assert.equal(claim.claimedEventDate,'2026-11-14');
  assert.equal(claim.claimedVessels,3); assert.equal(claim.independentlyVerified,false);
  for(const key of ['vesselNames','casualties','cargoVolumes','supplyDisruptionBarrelsPerDay']) assert.equal(claim[key],null,key+' not inferred from the claim');
  for(const card of [iea,ukmto]) {
    assert.equal(card.sourceVerifiedAt,null,'web check is bracketed, not an invented exact page clock');
    assert(Date.parse(card.sourceVerificationWindow.start)>Date.parse(cutoff));
    assert(Date.parse(card.sourceVerificationWindow.end)>=Date.parse(card.sourceVerificationWindow.start));
  }
  // The text of each new card must retain the independently researched figures.
  const requiredNumbers=[[/1[, .]?336[.,]7/],[/95[.,]84/,/88[.,]56/],[/41[.,]979/,/41[.,]782/,/0[.,]197/],[/\b9\b/,/\b5\b/,/\b4\b/],[/105[.,]4/,/18[.,]4/,/\b15\b/],[/\b8\b/,/\b7\b/,/\b1\b/],[/\b3\b/]];
  const numberWords={en:{nine:9,five:5,four:4,eight:8,seven:7,one:1,three:3},fr:{neuf:9,cinq:5,quatre:4,huit:8,sept:7,un:1,trois:3},de:{neun:9,'fünf':5,vier:4,acht:8,sieben:7,eine:1,drei:3}};
  for(const [i,c] of [fx,oil,inventory,traffic,iea,ukmto,claim].entries()) for(const lang of langs) {
    let text=c.i18n[lang].summary;
    for(const [word,value] of Object.entries(numberWords[lang]||{})) text=text.replace(new RegExp('(?<![\\p{L}])'+word+'(?![\\p{L}])','giu'),String(value));
    let numbers=requiredNumbers[i];
    // East Asian copy legitimately expresses millions of barrels in ten-thousands.
    if(i===2 && ['ko','ja','zh'].includes(lang)) numbers=[/4[, .]?197[.,]9/,/4[, .]?178[.,]2/,/19[.,]7/];
    if(i===4 && ['ko','ja','zh'].includes(lang)) numbers=[/1\s*[억億亿]\s*540\s*[만万]/,/1[, .]?840\s*[만万]/,/1[, .]?500\s*[만万]/];
    for(const number of numbers) assert.match(text,number,c.id+' '+lang+' independently checked facts (localized units allowed)');
  }
  for(const c of cards) {
    assert.equal(c.date,'2026-11-16'); assert.equal(c.dateKind,'site_update');
    assert.equal(c.updatedAt,release.modified); assert.equal(c.informationCutoff,cutoff);
    assert(Object.hasOwn(c,'sourcePublishedAt')); assert(Object.hasOwn(c,'eventDate'));
    if(c.sourcePublishedAt) {
      assert.match(c.sourcePublishedAt,/T\d\d:\d\d/,'release day must not become a publication clock');
      beforeCutoff(c.sourcePublishedAt,c.id+' publication');
    } else {
      // A clearly dated official release on a prior calendar day supplies a bound,
      // while its unknown exact first-publication clock must remain null.
      const availability=[c.sourceLastModifiedAt,c.sourcePreviouslyObservedAt,c.sourceAvailabilityUpperBound,c.officialDistributionAt,
        ...(c===iea||c===ukmto ? [c.sourceReleaseDate+'T23:59:59+00:00'] : [])].filter(Boolean);
      assert(availability.some(t=>Number.isFinite(Date.parse(t)) && Date.parse(t)<=Date.parse(cutoff)),c.id+' unknown publication needs separate pre-cutoff availability');
    }
    if(c.eventDate) beforeCutoff(c.eventDate,c.id+' observation');
    else assert.equal(c.eventDate,null,c.id+' unknown event date stays null');
    if(c.reportedDate) beforeCutoff(c.reportedDate,c.id+' report');
    if(c.sourceUpdatedAt) beforeCutoff(c.sourceUpdatedAt,c.id+' source update');
    const url=new URL(c.sourceUrl);
    assert.equal(url.protocol,'https:'); assert.notEqual(url.hostname,'aero-surcharge.com');
    assert(c.citationUrls.includes(c.sourceUrl));
  }
}

async function newPage(browser,baseline=false) {
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  await page.clock.setFixedTime(new Date(cutoff));
  page._blockedUrls=new Set();
  await page.route('**/*',route=>{
    const url=new URL(route.request().url());
    if(url.origin!==origin||url.pathname==='/api'||url.pathname.startsWith('/api/')) {page._blockedUrls.add(url.origin+url.pathname);return route.abort();}
    if(baseline && url.pathname==='/market-nov16.js') return route.fulfill({contentType:'application/javascript',body:'/* Pre-Nov16 baseline. */'});
    if(url.pathname==='/_shared.js') return route.fulfill({contentType:'application/javascript',body:(baseline ? previousShared : shared)+captureShared});
    return route.continue();
  });
  return page;
}
async function state(page) {
  return page.evaluate(()=>{
    function flatten(value) {
      if(Array.isArray(value)) return value.flatMap(flatten);
      return value && value['@graph'] ? flatten(value['@graph']) : [value];
    }
    const table=document.querySelector('#indicatorTbody') || document.querySelector('.indicator-table tbody') || document.querySelector('.fore-tbl tbody');
    const overview=document.querySelector('#forecastOutlookSummary'), b=overview?.getBoundingClientRect();
    return {
      n:window.AERO_MARKET_NUMBERS_LATEST,r:window.AERO_MARKET_RELEASE,
      body:document.body.innerText,title:document.title,h1:document.querySelector('h1').textContent,
      canonical:document.querySelector('link[rel="canonical"]').href,
      metaDescription:document.querySelector('meta[name="description"]')?.content,
      openGraphTitle:document.querySelector('meta[property="og:title"]')?.content,
      schemas:[...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(el=>flatten(JSON.parse(el.textContent))),
      rows:table ? [...table.rows].map(row=>[...row.cells].map(cell=>cell.innerText)) : [],
      rowTones:table ? [...table.rows].map(row=>row.cells[2]?.className) : [],
      newsBriefRows:[...document.querySelectorAll('#sep04NewsBrief li')].map(el=>el.innerText),
      visibleCards:[...document.querySelectorAll('.news-card')].map(card=>({
        id:card.id,title:card.querySelector('.news-title')?.textContent,summary:card.querySelector('.news-summary')?.textContent,
        impact:card.querySelector('.news-impact')?.textContent,hrefs:[...card.querySelectorAll('a[href]')].map(a=>a.href)
      })),
      faq:document.querySelector('#forecastFaqBox')?.innerText || '',overview:overview?.innerText || '',
      overviewBounds:b ? {top:b.top,width:b.width,height:b.height,viewportHeight:innerHeight} : null,
      officialDescription:document.querySelector('#officialDesc')?.innerText || '',
      overflow:document.documentElement.scrollWidth>innerWidth
    };
  });
}

(async()=>{
  let browser,server;
  const reports=[];
  try {
    if(!process.env.AERO_QA_ORIGIN) {
      server=spawn(process.execPath,[path.join(__dirname,'serve_local.js')],{cwd:root,env:{...process.env,PORT:String(port)},stdio:['ignore','pipe','pipe']});
      await new Promise((resolve,reject)=>{
        const timer=setTimeout(()=>reject(Error('Local server timeout')),10000);
        server.stdout.on('data',b=>{if(String(b).includes('Local review server')){clearTimeout(timer);resolve();}});
        server.on('error',e=>{clearTimeout(timer);reject(e);});
        server.on('exit',code=>{clearTimeout(timer);reject(Error('Local server exited '+code));});
      });
    }
    browser=await chromium.launch();
    const baselines={};
    for(const name of ['forecast','news']) {
      const baseline=await newPage(browser,true);
      await baseline.goto(origin+'/'+name); await baseline.waitForTimeout(1800);
      const preceding=await baseline.evaluate(()=>({
        cards:window.AERO_MARKET_RELEASE.newsCards,snapshots:window.AERO_MARKET_SNAPSHOTS,
        namedArchives:{'2026-07-31':window.AERO_MARKET_NUMBERS_20260731,'2026-09-07':window.AERO_MARKET_NUMBERS_20260907},
        rawSnapshots:window.__NOV16_QA_SHARED_STATE.snapshots
      }));
      assert.equal(Object.keys(preceding.rawSnapshots).length,48,name+' 48 shared-only prior snapshots');
      assert.equal(Object.keys(preceding.snapshots).length,53,name+' 53 preceding runtime snapshot keys');
      assert.equal(preceding.cards.length,161,name+' 161 preceding news cards');
      assert(!preceding.cards.some(c=>c.id.startsWith(prefix)));
      assert.equal(preceding.snapshots['2026-11-11T08:30:00+09:00'].informationCutoff,'2026-11-11T08:30:00+09:00');
      assert.equal(preceding.snapshots['2026-11-11T09:00:00+09:00'].informationCutoff,'2026-11-11T09:00:00+09:00');
      baselines[name]=preceding;
      await baseline.close();
    }
    const historicalCards=baselines.news.cards;
    assert.deepEqual(baselines.forecast.cards,historicalCards,'both preceding page archives agree');
    async function checkPreservedSnapshots(page,name) {
      const preceding=baselines[name],precedingSnapshotKeys=Object.keys(preceding.snapshots).sort();
      const c=await page.evaluate(keys=>({
        snapshots:Object.fromEntries(keys.map(key=>[key,window.AERO_MARKET_SNAPSHOTS[key]])),
        rawSnapshots:window.__NOV16_QA_SHARED_STATE.snapshots,
        snapshotKeys:Object.keys(window.AERO_MARKET_SNAPSHOTS),
        today:window.AERO_MARKET_NUMBERS_20261116,day:window.AERO_MARKET_SNAPSHOTS['2026-11-16'],
        timed:window.AERO_MARKET_SNAPSHOTS['2026-11-16T09:00:00+09:00'],latest:window.AERO_MARKET_NUMBERS_LATEST,
        namedArchives:{'2026-07-31':window.AERO_MARKET_NUMBERS_20260731,'2026-09-07':window.AERO_MARKET_NUMBERS_20260907},
        distinct:window.AERO_MARKET_NUMBERS_20261116!==window.AERO_MARKET_NUMBERS_20261112
      }),precedingSnapshotKeys);
      const previousRawKeys=Object.keys(preceding.rawSnapshots);
      assert.deepEqual(Object.fromEntries(previousRawKeys.map(key=>[key,c.rawSnapshots[key]])),preceding.rawSnapshots,'all 48 shared-only prior snapshots preserved by the append');
      assert.deepEqual(Object.keys(c.rawSnapshots).sort(),[...previousRawKeys,'2026-11-16','2026-11-16T09:00:00+09:00'].sort(),'shared append adds only the two current keys');
      // These two legacy runtime writers used LATEST as a historical base. The fix
      // retains the existing dated source objects instead of freezing contaminated
      // runtime output. All other 51 entries retain their own page's prior values.
      const restoredKeys=['2026-07-31','2026-09-07'];
      const expectedSnapshots={...preceding.snapshots,...Object.fromEntries(restoredKeys.map(key=>[key,preceding.rawSnapshots[key]]))};
      assert.deepEqual(c.snapshots,expectedSnapshots,name+' 51 runtime entries preserved; two dated source originals restored');
      assert.deepEqual(c.namedArchives,{'2026-07-31':preceding.rawSnapshots['2026-07-31'],'2026-09-07':preceding.namedArchives['2026-09-07']},name+' July31 named original restored; separate September7 dated global preserved');
      assert.deepEqual(c.snapshotKeys.sort(),[...precedingSnapshotKeys,'2026-11-16','2026-11-16T09:00:00+09:00'].sort(),'only the two current registry keys were added');
      assert(c.distinct); assert.deepEqual(c.today,c.day); assert.deepEqual(c.today,c.timed);
      // The established renderer adds legacy archive-only keys to LATEST.
      // Every field in today's explicit snapshot must still win unchanged.
      for(const [key,value] of Object.entries(c.today)) assert.deepEqual(c.latest[key],value,'latest preserves current snapshot field '+key);
      checkNumbers(c.today);
    }
    for(const name of ['forecast','news']) {
      const page=await newPage(browser), errors=[], consoleErrors=[];
      page.on('pageerror',error=>errors.push(error.message));
      page.on('console',m=>{if(m.type()==='error')consoleErrors.push({text:m.text(),url:m.location().url});});
      await page.goto(origin+'/'+name); await page.waitForTimeout(1800);
      const initial=await state(page), cards=initial.r.newsCards.filter(c=>c.id.startsWith(prefix));
      assert.deepEqual(initial.r.newsCards.filter(c=>!c.id.startsWith(prefix)),historicalCards,'all archived card fields and timestamps preserved');
      checkCards(cards,initial.r); checkTranslations(initial.r,cards); await checkPreservedSnapshots(page,name);
      const feed=await (await page.request.get(origin+'/data/forecast_feed.json')).json();
      checkFeed(feed,initial.n);
      for(const lang of langs) {
        await page.selectOption('#navLang',lang); await page.waitForTimeout(650);
        if(name==='news') {
          // Long context remains available in native disclosures after the list.
          // Keep all original content/value checks below on the expanded guide.
          for(const id of ['newsContextGuide','newsMethodGuide']) {
            const guide=page.locator('#'+id);
            if(!await guide.evaluate(el=>el.open)) await guide.locator(':scope > summary').click();
            assert.equal(await guide.evaluate(el=>el.open),true,id+' content available for source checks');
          }
        }
        let publicationBeforeRefresh;
        if(name==='forecast') {
          publicationBeforeRefresh=await page.evaluate(()=>{
            const faq=[...document.querySelectorAll('script[type="application/ld+json"]')].map(el=>JSON.parse(el.textContent)).find(s=>s['@type']==='FAQPage');
            const published=faq?.datePublished; window.syncForecastStructuredData(); return published;
          });
          await page.waitForTimeout(100);
        }
        const x=await state(page), p=x.r.packs[lang];
        checkNumbers(x.n);
        assert.equal(x.canonical,'https://aero-surcharge.com/'+name);
        assert.equal(x.title,name==='news' ? p.newsMeta : p.meta);
        assert.equal(x.h1,name==='news' ? await page.evaluate(()=>t('news.interface.title')) : p.title);
        assert.equal(x.metaDescription,p.desc,lang+' current metadata');
        assert.equal(x.openGraphTitle,x.title,lang+' Open Graph title');
        const stageCarrier={ko:'대한항공',en:'Korean Air',ja:'大韓航空',zh:'大韩航空',fr:'Korean Air',de:'Korean Air'}[lang];
        if(name==='news') {
          assert(x.title.includes(stageCarrier),lang+' news metadata scopes current stage to Korean Air');
          const guideTitles=await page.locator('#newsContextGuide .summary-card-title').allTextContents();
          assert.equal(guideTitles.filter(title=>title===p.newsTitle).length,1,lang+' original detailed news heading retained once in context');
          assert(p.newsTitle.includes(stageCarrier),lang+' context heading scopes current stage to Korean Air');
        } else assert(x.h1.includes(stageCarrier),lang+' current stage is scoped to Korean Air');
        assert.equal(x.overflow,false,name+' '+lang+' desktop overflow');
        assert.doesNotMatch(x.body,/undefined|\?\?\?\?|AERO_MARKET_NUMBERS|\ufffd/);
        assert.match(x.body,/09:00/,name+' cutoff visible');
        for(const number of [/1[, .]?336[.,]7/,/95[.,]84/,/88[.,]56/,/147[.,]37/,/178[.,]95/,/163[.,]26/,/134/]) assert.match(x.body,number,name+' '+lang+' dated values visible');
        const o=name==='forecast' && p.forecastOverview?.informationCutoff===cutoff ? p.forecastOverview : null;
        const modified=o && Date.parse(o.modifiedAt)>Date.parse(x.r.modified) ? o.modifiedAt : x.r.modified;
        for(const schema of x.schemas.filter(s=>/^(WebPage|CollectionPage|FAQPage)$/.test(s['@type']))) assert.equal(schema.dateModified,modified,name+' '+lang+' schema modification');
        if(name==='forecast') {
          assert(o,lang+' current forecast overview');
          assert.equal(normalize(await page.locator('[data-i18n="fareCompare.button"]').innerText()),normalize(await page.evaluate(()=>I18N[getCurrentLang()]['fareCompare.button'])),lang+' current localized total-airfare CTA');
          assert.equal(await page.locator('[data-i18n="fore.cta.may"]').getAttribute('href'),'fuel-surcharge-calculator.html');
          for(const key of ['expectation','confidence','basis','risk','note']) assert(normalize(x.overview).includes(normalize(o[key])),lang+' visible overview '+key);
          assert.deepEqual(x.rows.map(row=>row.map(normalize)),o.rows.map(row=>row.map(normalize)),lang+' visible current rows');
          assert.deepEqual(x.rowTones,o.rowTones.map(tone=>'impact-'+tone),lang+' rendered direction classes');
          assert(x.overviewBounds && x.overviewBounds.top<x.overviewBounds.viewportHeight && x.overviewBounds.width>0,lang+' first-viewport outlook');
          const faq=x.schemas.find(s=>s['@type']==='FAQPage'); assert(faq);
          assert.equal(faq['@id'],x.canonical+'#faq'); assert.equal(faq.headline,x.h1); assert.equal(faq.description,p.desc);
          assert.equal(faq.inLanguage,lang); assert.equal(faq.datePublished,publicationBeforeRefresh);
          const expected=p.faq.map((entry,i)=>i===1 ? {q:o.question,a:o.expectation+'. '+o.confidence+'. '+o.basis+' '+o.risk+' '+o.note} : entry);
          assert.deepEqual(faq.mainEntity.map(q=>({q:q.name,a:q.acceptedAnswer.text})),expected);
          for(const entry of expected) {
            assert(normalize(x.faq).includes(normalize(entry.q)),lang+' visible FAQ question');
            assert(normalize(x.faq).includes(normalize(entry.a)),lang+' visible FAQ answer');
          }
        } else {
          for(const key of ['news.decisionMid','news.filterAirline']) assert.equal(normalize(await page.locator('[data-i18n="'+key+'"]').innerText()),normalize(p.surface[key]));
          assert.equal(normalize(x.officialDescription),normalize(p.officialDesc));
          assert.doesNotMatch(x.officialDescription,/10월 유류할증료 적용|October in force|Octobre en vigueur|Oktober gilt aktuell/);
          assert.deepEqual(x.newsBriefRows.map(normalize),p.rows.map(row=>normalize(row[0]+': '+row[1])),lang+' five current news indicators');
          for(const card of cards) {
            const item=card.i18n[lang], schema=x.schemas.find(s=>s['@type']==='NewsArticle' && s.url?.endsWith('#'+card.id));
            const visible=x.visibleCards.find(c=>c.id===card.id);
            assert(schema,card.id+' schema'); assert(visible,card.id+' rendered card');
            assert.equal(schema.articleBody,item.summary+' '+item.impact); assert.equal(schema.headline,item.title);
            assert.equal(normalize(visible.title),normalize(item.title));
            assert.equal(normalize(visible.summary),normalize(item.summary)); assert.equal(normalize(visible.impact),normalize(item.impact));
            assert(visible.hrefs.includes(card.sourceUrl),card.id+' visible original source link');
          }
        }
        await page.setViewportSize({width:390,height:844}); await page.waitForTimeout(180);
        const mobile=await state(page);
        assert.equal(mobile.overflow,false,name+' '+lang+' mobile overflow'); assert.equal(mobile.title,x.title);
        if(name==='forecast') {
          assert.deepEqual(mobile.rows,x.rows,lang+' mobile indicators');
          assert(mobile.overviewBounds && mobile.overviewBounds.top<mobile.overviewBounds.viewportHeight && mobile.overviewBounds.width>0,lang+' mobile first-viewport outlook');
        } else assert.deepEqual(mobile.newsBriefRows,x.newsBriefRows,lang+' mobile brief');
        await page.setViewportSize({width:1440,height:1000});
      }
      await page.selectOption('#navLang','ko'); await page.waitForTimeout(650);
      const deny=page.locator('#aeroConsentDeny'); if(await deny.isVisible()) await deny.click();
      await page.mouse.move(0,0);
      await page.evaluate(()=>window.scrollTo(0,0)); await page.waitForTimeout(100);
      await page.screenshot({path:path.join(out,name+'-desktop.png'),fullPage:true});
      await page.screenshot({path:path.join(out,name+'-desktop-top.png')});
      await page.setViewportSize({width:390,height:844}); await page.waitForTimeout(500);
      await page.evaluate(()=>window.scrollTo(0,0)); await page.waitForTimeout(100);
      const before=await state(page); assert.equal(before.overflow,false);
      await page.screenshot({path:path.join(out,name+'-mobile.png'),fullPage:true});
      await page.screenshot({path:path.join(out,name+'-mobile-top.png')});
      await page.waitForTimeout(12000);
      const after=await state(page);
      for(const key of ['title','h1','overview','metaDescription']) assert.equal(after[key],before[key],name+' delayed '+key);
      assert.deepEqual(after.rows,before.rows,name+' delayed indicators');
      assert.deepEqual(after.visibleCards,before.visibleCards,name+' delayed news cards');
      assert.deepEqual(after.r.newsCards.filter(c=>!c.id.startsWith(prefix)),historicalCards,name+' delayed archive equality');
      for(const schema of after.schemas.filter(s=>/^(WebPage|CollectionPage|FAQPage)$/.test(s['@type']))) assert.equal(schema.dateModified,after.r.modified,name+' delayed schema modification');
      if(name==='news') for(const card of after.r.newsCards) {
        const schema=after.schemas.find(s=>s['@type']==='NewsArticle' && s.url?.endsWith('#'+card.id));
        if(schema) assert.equal(schema.dateModified,card.updatedAt,card.id+' preserved individual article modification');
      }
      await checkPreservedSnapshots(page,name); assert.equal(after.overflow,false); assert.deepEqual(errors,[]);
      const unexpectedConsole=consoleErrors.filter(e=>!(e.text==='Failed to load resource: net::ERR_FAILED' && page._blockedUrls.has((e.url||'').split('?')[0])));
      assert.deepEqual(unexpectedConsole,[],name+' unexpected console errors');
      reports.push({page:name,locales:langs,historicalCards:161,newCards:7,previousSnapshots:{rawCount:48,runtimeCount:53,unchangedRuntimeCount:51,restoredDatedSourceKeys:['2026-07-31','2026-09-07'],status:'all 48 shared originals preserved; 51 runtime entries unchanged; two contaminated legacy copies restored to their dated originals'},desktopAndMobile:true,delayedStabilitySeconds:12,errors,consoleErrors,unexpectedConsole});
      await page.close();
      console.log(name+': six locales, source values/cutoff/schema, 161 archived cards, 48 shared originals/51 unchanged runtime entries/2 restored dated originals, mobile and 12-second stability PASS');
    }
    const graph=await newPage(browser), graphErrors=[], graphConsoleErrors=[];
    graph.on('pageerror',e=>graphErrors.push(e.message));
    graph.on('console',m=>{if(m.type()==='error')graphConsoleErrors.push({text:m.text(),url:m.location().url});});
    await graph.goto(origin+'/fuel-surcharge-graph'); await graph.waitForTimeout(1500);
    const graphHasInk=()=>graph.evaluate(()=>{
      const c=document.querySelector('#graphCanvas');
      return c && c.width>0 && c.height>0 && c.getContext('2d').getImageData(0,0,c.width,c.height).data.some((v,i)=>i%4===3 && v>0);
    });
    assert(await graphHasInk(),'desktop graph canvas drawn');
    assert.equal(await graph.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    await graph.screenshot({path:path.join(out,'graph-desktop.png'),fullPage:true});
    await graph.setViewportSize({width:390,height:844}); await graph.waitForTimeout(300);
    assert(await graphHasInk(),'mobile graph canvas redrawn');
    assert.equal(await graph.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    assert.deepEqual(graphErrors,[]);
    const graphUnexpectedConsole=graphConsoleErrors.filter(e=>!(e.text==='Failed to load resource: net::ERR_FAILED' && graph._blockedUrls.has((e.url||'').split('?')[0])));
    assert.deepEqual(graphUnexpectedConsole,[],'graph unexpected console errors');
    await graph.screenshot({path:path.join(out,'graph-mobile.png'),fullPage:true});
    assert.equal(createHash('sha256').update(fs.readFileSync(__filename)).digest('hex'),scriptSha256,'verification script did not change during this run');
    fs.writeFileSync(path.join(out,'verification.json'),JSON.stringify({cutoff,verifiedAt:new Date().toISOString(),scriptSha256,reports,graph:'PASS',scope:'Local rendering and data consistency; external requests blocked. Source research is recorded separately.'},null,2));
    console.log('Graph nonblank/mobile PASS. Screenshots and report: '+out);
    console.log('Verification script SHA-256: '+scriptSha256);
  } finally {
    if(browser) await browser.close();
    if(server) server.kill();
  }
})().catch(error=>{console.error(error);process.exitCode=1;});
