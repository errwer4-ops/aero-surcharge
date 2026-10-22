const test=require('node:test');
const assert=require('node:assert/strict');
const core=require('../public/calculator-platform-core');
const trust=require('../public/source-provenance');
function reviewed(airline,month,index,origin='ICN',destination='NRT'){
  const n=trust.getNotice(airline,month);assert(n,'reviewed source fixture must exist');
  return core.reconcile({airline,origin,destination,month:month.replace('.','-'),basis:airline==='BX'||airline==='ZE'?'route-group-'+(index+1):n.bands[index],currency:n.currency,direction:n.direction,departureCountry:n.departureCountry,band:n.bands[index],sourceBand:n.bands[index],bandIndex:index,amount:n.amounts[index],status:'confirmed',validationStatus:'passed',sourceUrl:n.sourceUrl,effectiveFrom:n.effectiveFrom,effectiveTo:n.effectiveTo});
}
const base=reviewed('KE','2026-10',1),target=reviewed('KE','2026-11',1);
const conditions={origin:'ICN',destination:'NRT',airline:'KE',baseMonth:'2026-10',targetMonth:'2026-11',passengers:2,trip:2};
// Only the arithmetic unit tests use synthetic receipts. Integration tests below
// use the actual independent source manifest and cannot bless modified values.
const unitTrust={evaluate(){return {status:'verified',sourceVerificationStatus:'source_reconciled',sourceVerifiedAt:'2026-10-21T10:00:00+09:00'};}};
function memoryStore(value){const memory=new Map(value?[[core.STORAGE_KEY,JSON.stringify(value)]]:[]);return {memory,storage:{getItem:k=>memory.get(k),setItem:(k,v)=>memory.set(k,v)}};}
test('native month arithmetic has correct sign, precise percentage and zero handling',()=>{
  const result=core.compare(base,target);assert.equal(result.valid,true);assert.equal(result.difference,10200);assert.equal(result.percent,10200/65800*100);
  assert.equal(core.compare(target,base).difference,-10200);
  assert.equal(core.compare({...base,amount:0},target,unitTrust).percent,null);
  assert.equal(core.compare({...base,amount:0},{...target,amount:0},unitTrust).difference,0);
});
test('missing, forecast, same month and incompatible exact conditions never compare',()=>{
  for(const value of [null,{...target,amount:null},{...target,amount:-1},{...target,amount:'76000'},{...target,status:'forecast'},{...target,month:base.month},{...target,airline:'OZ'},{...target,currency:'USD'},{...target,basis:'700-1299'},{...target,sourceBand:'changed official band'},{...target,origin:'PUS'},{...target,direction:'round_trip'}])assert.equal(core.compare(base,value,unitTrust).valid,false);
});
test('status strings and validation timestamps cannot substitute for actual source reconciliation',()=>{
  assert.equal(core.isConfirmed(target),true);
  for(const value of [{amount:target.amount+1},{sourceUrl:target.sourceUrl.replace('2611','2610')},{bandIndex:0},{sourceBand:null},{currency:'USD'},{departureCountry:null},{validationStatus:'rejected'},{effectiveFrom:'2026-10-01'}]){
    const candidate={...target,...value,verificationStatus:'verified',sourceVerificationStatus:'official_verified',verifiedAt:'2026-10-21T10:00:00+09:00'};
    assert.equal(core.isConfirmed(candidate),false);assert.equal(core.compare(base,candidate).valid,false);assert.deepEqual(core.lowestVerified([candidate]),{});assert.deepEqual(core.snapshot([candidate]),{});
    const pending=core.reconcile(candidate);assert.equal(pending.status,'unconfirmed');assert.equal(pending.amount,candidate.amount);assert.equal(pending.verifiedAt,null);
  }
  assert.equal(core.reconcile({...target,status:'forecast'}).status,'forecast');
  assert.equal(core.reconcile({...target,publishedAt:'2026-10-16'}).publishedAt,null,'unknown source publication date is not filled from legacy copy');
  const jeju=reviewed('7C','2026-11',1);const noInventedDates=core.reconcile({...jeju,effectiveFrom:'2026-11-01',effectiveTo:'2026-11-30'});assert.equal(noInventedDates.status,'confirmed');assert.equal(noInventedDates.effectiveFrom,null);assert.equal(noInventedDates.effectiveTo,null);
});
test('BX and ZE groups bind exact origin and UBN remains a distinct limited surcharge route',()=>{
  const bx={code:'BX',bands:['FUK / NRT (PUS) / FSZ','NRT (ICN) / HKG','GUM / CNX (ICN)','BKK / DPS']};
  assert.equal(core.officialRouteGroupIndex(bx,'PUS','NRT'),0);assert.equal(core.officialRouteGroupIndex(bx,'ICN','NRT'),1);assert.equal(core.officialRouteGroupIndex(bx,'PUS','BKK'),3);assert.equal(core.officialRouteGroupIndex(bx,'CJU','NRT'),-1);assert.equal(core.officialRouteGroupIndex(bx,'PUS','CNX'),-1);
  const oct=reviewed('BX','2026-10',2,'PUS','UBN'),nov=reviewed('BX','2026-11',2,'PUS','UBN');assert.equal(oct.amount,78);assert.equal(nov.amount,90);assert.equal(core.compare(oct,nov).difference,12);
  assert.equal(core.isConfirmed({...nov,destination:'ULN'}),false);assert.equal(core.isConfirmed({...nov,origin:'CJU'}),false);assert.equal(core.isConfirmed({...reviewed('BX','2026-11',0,'PUS','NRT'),origin:'ICN'}),false);
  const ze={code:'ZE',routesByGroup:[['PUS-KIX'],['ICN-KIX']]};assert.equal(core.officialRouteGroupIndex(ze,'PUS','KIX'),0);assert.equal(core.officialRouteGroupIndex(ze,'ICN','KIX'),1);
  assert.deepEqual(core.noticeRouteApplicability.map(x=>[x.airline,x.origin,x.destination]),[['BX','PUS','UBN']]);assert.equal(core.noticeRouteApplicability[0].scheduleVerified,false);assert(!Object.hasOwn(core.noticeRouteApplicability[0],'miles'));
});
test('saved route lifecycle stores safe selected conditions and new provenance version',()=>{
  const {memory,storage}=memoryStore(),store=core.createStore(storage);store.recent({...conditions,query:'secret@example.com'});assert.equal(store.save(conditions,[target]),true);
  assert.equal(store.save({...conditions,targetMonth:'2026-12'},[target]),true);assert.equal(store.state.saved.length,1);assert(!memory.get(core.STORAGE_KEY).includes('secret@example.com'));
  const restored=core.createStore(storage);assert.deepEqual(restored.state.recent,conditions);assert.equal(restored.state.saved[0].conditions.targetMonth,'2026-12');assert.equal(restored.state.saved[0].snapshotVersion,core.SNAPSHOT_VERSION);
  restored.remove(core.identity(conditions));assert.equal(core.createStore(storage).state.saved.length,0);
});
test('blocked, corrupted and malformed storage never prevents calculation',()=>{
  const unavailable=core.createStore({getItem(){throw new Error('denied');},setItem(){throw new Error('denied');}});assert.equal(unavailable.save(conditions,[target]),true);assert.equal(unavailable.available(),false);assert.equal(core.compare(base,target).valid,true);
  assert.equal(core.createStore({getItem(){return '{invalid';},setItem(){}}).state.saved.length,0);assert.equal(core.normalizeConditions({...conditions,destination:'<script>'}),null);assert.equal(core.safeUrl('javascript:alert(1)'),null);assert.equal(core.safeUrl('https://user:password@example.com/'),null);
});
test('badges distinguish reviewed new, revised and historical records; unproven mutations ignored',()=>{
  const before=core.snapshot([target]),revised=core.snapshot([{...target,amount:78000}],unitTrust);
  assert.deepEqual(core.changes(before,core.snapshot([target]),'2026-10'),[]);assert.deepEqual(core.changes(before,revised,'2026-10'),['notice_revision']);assert.deepEqual(core.changes(before,revised,'2026-12'),['historical_revision']);
  assert.deepEqual(core.changes({},before,'2026-10'),['new_notice']);assert.deepEqual(core.changes(null,before,'2026-10'),[]);assert.deepEqual(core.changes({},core.snapshot([base]),'2026-11'),['historical_added']);
  assert.deepEqual(core.changes(before,core.snapshot([{...target,amount:78000}]),'2026-10'),[]);assert.deepEqual(core.changes({},core.snapshot([{...target,status:'forecast'}]),'2026-10'),[]);
  assert.deepEqual(core.changes(before,core.snapshot([{...target,sourceBand:'revised band'}],unitTrust),'2026-10'),['notice_revision']);
});
test('URL corrections and source verification alone are not new official notices',()=>{
  const before=core.snapshot([target]),after=core.snapshot([{...target,sourceUrl:target.sourceUrl+'#source'}]);assert.deepEqual(core.changes(before,after,'2026-10'),[]);
  const pending={...target,status:'unconfirmed',sourceBand:null};assert.deepEqual(core.changes({},after,'2026-10',core.observedRecords([pending])),[]);
  assert.deepEqual(core.changes({},after,'2026-10',{}),['new_notice'],'a genuinely absent month can become a new reviewed notice');
});
test('old flag-based baselines migrate silently; temporarily unverified source does not erase known baseline',()=>{
  const key='KE|2026-11|ICN|NRT',oldSnapshot={[key]:{month:'2026-11',value:JSON.stringify([75000,'KRW',target.basis,target.sourceUrl])}};
  const {storage}=memoryStore({version:1,saved:[{conditions,snapshot:oldSnapshot}],recent:conditions}),store=core.createStore(storage);
  assert.equal(store.state.saved[0].snapshotVersion,0);store.acknowledge(core.identity(conditions),[target]);const entry=store.state.saved[0];assert.equal(entry.snapshotVersion,core.SNAPSHOT_VERSION);assert.deepEqual(core.changes(entry.snapshot,core.snapshot([target]),'2026-10',entry.observed),[]);
  store.acknowledge(core.identity(conditions),[{...target,status:'unconfirmed',sourceUrl:'https://www.koreanair.com/wrong-notice'}]);assert.deepEqual(entry.snapshot,core.snapshot([target]));assert.deepEqual(core.changes(entry.snapshot,core.snapshot([target]),'2026-10',entry.observed),[]);
});
test('lowest values require both technical validity and independently reviewed source identity',()=>{
  const bx=reviewed('BX','2026-11',0,'PUS','NRT');assert.deepEqual(core.lowestVerified([target,bx,{...target,amount:1},{...target,amount:0,status:'unconfirmed'}]),{KRW:76000,USD:43});
  assert.deepEqual(core.lowestVerified([{...target,validationStatus:'missing'}]),{});
});
function feed(metadata={},current=82500,parent='2026.12'){
  const m={airline:'KE',origin:'ICN',destination:'NRT',effectiveMonth:'2026.12',chargingBasis:'500-999',currency:'KRW',oneWayAmount:82500,direction:'one_way',dataStatus:'confirmed',validationStatus:'passed',validatedAt:'2026-11-16T10:00:00+09:00',collectedAt:'2026-11-16T09:00:00+09:00',sourceUrl:'https://www.koreanair.com/notice/2612',...metadata};
  return {airlines:[{iataCode:'KE',currentPeriod:parent,items:[{current,label:'500~999mi',metadata:m}]}]};
}
test('future technically valid feed remains pending without reviewed source fields and preserves amounts',()=>{
  const records=core.validatedFeedRecords(feed({sourceVerificationStatus:'official_verified',sourceVerifiedAt:'2026-11-16T09:30:00+09:00'}));assert.equal(records.length,1);assert.equal(records[0].month,'2026-12');assert.equal(records[0].amount,82500);assert.equal(records[0].publishedAt,null);assert.equal(records[0].status,'unconfirmed');assert.equal(records[0].verifiedAt,null);assert.deepEqual(core.snapshot(records),{});
  const exact=core.validatedFeedRecords(feed({effectiveMonth:'2026.11',oneWayAmount:target.amount,chargingBasis:target.basis,sourceUrl:target.sourceUrl,sourceBand:target.sourceBand,bandIndex:target.bandIndex,departureCountry:'KR'},target.amount,'2026.11'));assert.equal(core.isConfirmed(exact[0]),true);assert.equal(Object.keys(core.snapshot(exact)).length,1);
  for(const invalid of [{direction:null},{origin:null},{dataStatus:'forecast'},{validationStatus:'rejected'},{sourceUrl:'javascript:bad()'},{effectiveMonth:'2026.11'},{oneWayAmount:82000},{effectiveFrom:'2026-11-01'}])assert.deepEqual(core.validatedFeedRecords(feed(invalid)),[]);
});
test('new exact route/month feed overrides old currency or basis; ambiguity blocks stale fallback',()=>{
  const query={airline:'KE',origin:'ICN',destination:'NRT',month:'2026-12',direction:'one_way'},changed=core.validatedFeedRecords(feed({currency:'USD',chargingBasis:'new-band'}));
  const selected=core.selectFeedRecord(changed,query);assert.equal(selected.present,true);assert.equal(selected.record.currency,'USD');assert.equal(selected.record.basis,'new-band');assert.equal(core.compare(base,selected.record).valid,false);
  assert.deepEqual(core.selectFeedRecord(changed.concat({...changed[0],currency:'EUR'}),query),{present:true,record:null});assert.deepEqual(core.selectFeedRecord(changed,{...query,destination:'KIX'}),{present:false,record:null});
});
test('calculator shows concise statuses without upgrading pending or changing source data',()=>{
  const fs=require('node:fs'),vm=require('node:vm'),source=fs.readFileSync('public/calculator-platform.js','utf8');
  const context={core,t:ko=>ko,esc:value=>String(value),amount:(value,currency)=>value+' '+currency};vm.createContext(context);
  vm.runInContext(source.slice(source.indexOf('function info(record){'),source.indexOf('function refreshSurface(){')),context);
  const confirmedBefore=JSON.stringify(target),pending=core.reconcile({...target,amount:target.amount+1}),pendingBefore=JSON.stringify(pending);
  const confirmedHtml=context.info(target),pendingHtml=context.info(pending),missingHtml=context.info(null);
  assert.match(confirmedHtml,/공시 확인 완료/);assert.match(confirmedHtml,/공시 원문/);assert.match(confirmedHtml,/확인일:/);
  for(const html of [pendingHtml,missingHtml]){assert.match(html,/확인 중/);assert(!html.includes('공시 확인 완료'));}
  for(const html of [confirmedHtml,pendingHtml,missingHtml])assert(!/원문 검증|형식 검사|금액.?구간 대조/.test(html));
  assert.equal(JSON.stringify(target),confirmedBefore);assert.equal(JSON.stringify(pending),pendingBefore);
  assert.equal(core.compare(base,pending).valid,false);assert.match(context.nativeCell(pending,1),new RegExp(String(pending.amount)),'pending amount remains visible with its pending status');
  assert.match(context.delta({comparison:core.compare(base,pending)},1),/비교 불가 · 확인 중/);
  assert.match(context.delta({comparison:{valid:false,reason:'conditions'}},1),/비교 불가 · 조건 다름/);
  assert.match(context.delta({comparison:{valid:false,reason:'same_month'}},1),/다른 발권월을 선택하세요/);
  assert.match(context.delta({comparison:core.compare(base,target)},1),/10200 KRW/);
});
test('home landing keeps concise November status, qualified minimum changes and distinct feed dates',()=>{
  const fs=require('node:fs'),vm=require('node:vm');
  const {loadNotices,loadRouteGroupNotices}=require('../scripts/validate_service_data.cjs');
  const index=fs.readFileSync('public/index.html','utf8'),patch=fs.readFileSync('public/home-sep20.js','utf8'),calc=fs.readFileSync('public/calculator-oct20.js','utf8');
  const elements=new Map(),node=id=>{if(!elements.has(id))elements.set(id,{style:{},innerHTML:'',textContent:''});return elements.get(id);};
  const context={AeroCalculatorCore:core,AeroSourceTrust:trust,URL,Intl,Date:class extends Date{constructor(...args){super(...(args.length?args:['2026-10-21T12:00:00+09:00']));}},document:{readyState:'complete',getElementById:node},getCurrentLang:()=> 'ko',getAirlineName:()=>'',t:key=>key,FEED:{meta:{lastUpdated:'2026-04-23T01:00:00Z'}}};context.window=context;vm.createContext(context);
  vm.runInContext(index.slice(index.indexOf('var _OFFICIAL_AMT = {'),index.indexOf('var OFFICIAL_ROUTE_MAP = {')),context);
  function declaration(source,startMarker){const start=source.indexOf(startMarker);assert(start>=0);return source.slice(start,source.indexOf('\n  };',start)+5);}
  vm.runInContext(declaration(calc,'var october={'),context);vm.runInContext(declaration(patch,'var octoberLinks={'),context);
  context.NOVEMBER_2026_OFFICIAL_NOTICES=loadNotices(fs.readFileSync('public/_shared.js','utf8'));context.OCTOBER_2026_ROUTE_GROUP_NOTICES=loadRouteGroupNotices(fs.readFileSync('public/notice-group-source.js','utf8'));context.OCTOBER_2026_NOTICE_LINKS=context.octoberLinks;
  context.KR_AIRLINES=Object.keys(context._OFFICIAL_AMT).map(code=>({code,logo:code,name:code}));context.november={};context.novemberLinks={};context.AUGUST_2026_NOTICE_LINKS={};context.AUGUST_2026_OFFICIAL_AMOUNTS={};
  context.NOVEMBER_2026_OFFICIAL_NOTICES.forEach(n=>{context.november[n.code]=n.november;context.novemberLinks[n.code]=n.url;});
  Object.entries(context._OFFICIAL_AMT).forEach(([code,data])=>data.rows.forEach((row,i)=>{row.july=context.october[code][i];row.august=context.november[code]?.[i]??null;if(code==='ZE')row.label=String(i+1);}));
  const renderer=index.lastIndexOf('renderLanding = function(){');vm.runInContext(index.slice(renderer,index.indexOf('\n};',renderer)+3),context);
  vm.runInContext(fs.readFileSync('public/home-platform.js','utf8'),context);
  assert.equal(context.AeroHomePlatform.landingState('BX').latest.status,'verified');assert.equal(context.AeroHomePlatform.landingState('BX').current.status,'verified');assert.equal(context.AeroHomePlatform.landingState('KE').current.status,'partial');assert.equal(context.AeroHomePlatform.landingState('YP').latest.status,'pending');
  assert.match(node('miniGrid').innerHTML,/data-airline="YP" data-source-verified="false"/);
  assert.equal((node('miniGrid').innerHTML.match(/class="mini-status"[^>]*>11월 공시 완료<\/div>/g)||[]).length,8);assert.equal((node('miniGrid').innerHTML.match(/class="mini-status"[^>]*>11월 공시 미완료<\/div>/g)||[]).length,1);
  assert(!node('miniGrid').innerHTML.includes('2026-10 원문 링크'),'the November-incomplete card does not masquerade an October URL as November');assert(!node('miniGrid').innerHTML.includes('/notice/791'));assert.match(node('miniGrid').innerHTML,/사이트의 11월 공시 반영이 진행 중입니다/);
  const platform=context.AeroHomePlatform;
  for(const n of context.NOVEMBER_2026_OFFICIAL_NOTICES){
    const comparison=platform.landingComparison(n.code),rates=n.october.map((b,i)=>typeof b==='number'&&b>0&&typeof n.november[i]==='number'?(n.november[i]-b)/b*100:null).filter(v=>v!==null);
    assert.equal(comparison.kind,'increase');assert.equal(comparison.minimum,Math.min(...rates));assert.equal(comparison.pairs.length,rates.length);assert.match(platform.comparisonLabel(comparison),new RegExp('전월 대비 최소 '+comparison.minimum.toFixed(1).replace('.','\\.')+'% 상승'));
    assert.equal(comparison.archived,comparison.pairs.some(p=>!p.sourceVerified));
  }
  assert.equal(platform.landingComparison('YP'),null);assert.equal(platform.landingComparison('TW').pairs.length,6,'unpublished null slot excluded, never zero');assert.equal(platform.landingComparison('BX').archived,false);
  assert.equal(platform.landingComparison('OZ').archived,true);assert.match(platform.landingComparisonHtml('OZ'),/보관 기록 기준/);assert.match(platform.landingComparisonHtml('OZ'),/10월 보관 기록/);assert.match(platform.landingComparisonHtml('OZ'),/500~999 mi/);assert.match(platform.landingComparisonHtml('OZ'),/<details/);assert(!platform.landingComparisonHtml('OZ').includes(' open'));
  assert.equal(platform.recordFor('OZ',1,'2026-10','ICN','NRT',false).status,'unconfirmed','retained-record trend does not upgrade official calculator comparison');
  const pair=p=>({percent:p,sourceVerified:true}),summary=values=>platform.summarizeComparison(values.map(pair));
  assert.equal(summary([-10,-5]).kind,'decrease');assert.match(platform.comparisonLabel(summary([-10,-5])),/최소 5.0% 하락/);assert.equal(summary([-5,10]).kind,'mixed');assert(!platform.comparisonLabel(summary([-5,10])).includes('상승'));assert.equal(summary([0,0]).kind,'unchanged');assert.equal(summary([0,10]).kind,'rise_and_unchanged');assert(!platform.comparisonLabel(summary([0,10])).includes('최소'));assert.equal(summary([-10,0]).kind,'fall_and_unchanged');assert.equal(platform.summarizeComparison([]),null);
  const ozNotice=context.NOVEMBER_2026_OFFICIAL_NOTICES.find(n=>n.code==='OZ'),ozRows=context._OFFICIAL_AMT.OZ.rows,originalBase=ozNotice.october[0];
  ozNotice.october[0]=ozRows[0].july=0;assert.equal(platform.landingComparison('OZ').pairs.length,8,'zero denominator omitted');ozNotice.october[0]=ozRows[0].july=null;assert.equal(platform.landingComparison('OZ').pairs.length,8,'missing baseline omitted');ozNotice.october[0]=ozRows[0].july=originalBase;
  const currency=context._OFFICIAL_AMT.OZ.currency;context._OFFICIAL_AMT.OZ.currency='USD';assert.equal(platform.landingComparison('OZ'),null,'different stored currency invalidates trend');context._OFFICIAL_AMT.OZ.currency=currency;
  const originalRange=ozRows[1].range;ozRows[1].range=ozRows[0].range;assert.equal(platform.landingComparison('OZ'),null,'ambiguous stored charging bands cannot compare');ozRows[1].range=originalRange;
  context._OFFICIAL_AMT.BX.rows[0].august++;context.renderLanding();assert.match(node('miniGrid').innerHTML,/data-airline="BX" data-source-verified="false"/,'changed displayed amount cannot retain reconciled landing badge');
  assert.equal(platform.landingComparison('BX'),null,'changed displayed November amount cannot retain trend');
  const feedBefore=JSON.stringify(context.FEED);const installStart=patch.indexOf('function installData(){');vm.runInContext(patch.slice(installStart,patch.indexOf('function updateHead()',installStart)),context);context.installData();assert.equal(JSON.stringify(context.FEED),feedBefore,'site patch must not write into feed metadata');
  context.AeroHomePlatform.updateStatusText('2026-10-21T10:05:51+09:00');const status=node('statusText').textContent;assert.match(status,/사이트 문구 수정:/);assert.match(status,/공시 확인:/);assert.match(status,/공시 수집: 미기록/);assert.match(status,/별도 피드 파일 갱신: 2026-04-23 10:00 KST/);
});
