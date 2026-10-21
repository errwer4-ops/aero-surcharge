const test=require('node:test');
const assert=require('node:assert/strict');
const core=require('../public/calculator-platform-core');
const base={airline:'KE',origin:'ICN',destination:'NRT',month:'2026-10',basis:'500-999',currency:'KRW',direction:'one_way',amount:65800,status:'confirmed',verificationStatus:'verified',sourceUrl:'https://www.koreanair.com/notice'};
const target={...base,month:'2026-11',amount:76000};
const conditions={origin:'ICN',destination:'NRT',airline:'KE',baseMonth:'2026-10',targetMonth:'2026-11',passengers:2,trip:2};
test('month difference uses native amounts, correct sign and precise percentage',()=>{
  const result=core.compare(base,target);assert.equal(result.valid,true);assert.equal(result.difference,10200);assert.equal(result.percent,10200/65800*100);
  assert.equal(core.compare(target,base).difference,-10200);
  assert.equal(core.compare({...base,amount:0},target).percent,null);
  assert.equal(core.compare({...base,amount:0},{...target,amount:0}).difference,0);
});
test('missing, forecast, same month, airline, currency and basis mismatches never compare',()=>{
  for(const value of [null,{...target,amount:null},{...target,amount:-1},{...target,amount:'76000'},{...target,status:'forecast'},{...target,month:base.month},{...target,airline:'OZ'},{...target,currency:'USD'},{...target,basis:'700-1299'},{...target,origin:'PUS'},{...target,direction:'round_trip'}])assert.equal(core.compare(base,value).valid,false);
});
test('official route groups respect origin and reject unpublished routes',()=>{
  const bx={code:'BX',bands:['FUK / NRT (PUS) / FSZ','NRT (ICN) / HKG','GUM / CNX (ICN)','BKK / DPS']};
  assert.equal(core.officialRouteGroupIndex(bx,'PUS','NRT'),0);assert.equal(core.officialRouteGroupIndex(bx,'ICN','NRT'),1);assert.equal(core.officialRouteGroupIndex(bx,'PUS','BKK'),3);assert.equal(core.officialRouteGroupIndex(bx,'PUS','GUM'),2);assert.equal(core.officialRouteGroupIndex(bx,'CJU','NRT'),-1);assert.equal(core.officialRouteGroupIndex(bx,'PUS','CNX'),-1);
  const ze={code:'ZE',routesByGroup:[['PUS-KIX'],['ICN-KIX']]};assert.equal(core.officialRouteGroupIndex(ze,'PUS','KIX'),0);assert.equal(core.officialRouteGroupIndex(ze,'ICN','KIX'),1);assert.equal(core.officialRouteGroupIndex(ze,'ICN','LAX'),-1);
  const additions=core.noticeRouteApplicability;assert.deepEqual(additions.map(x=>[x.airline,x.origin,x.destination]),[['BX','PUS','UBN']]);assert.equal(additions[0].scheduleVerified,false);assert(!Object.hasOwn(additions[0],'miles'));assert.equal(additions[0].scope,'surcharge_applicability');
});
test('saved route lifecycle persists only safe conditions, restores and deletes',()=>{
  const memory=new Map(),storage={getItem:k=>memory.get(k),setItem:(k,v)=>memory.set(k,v)};
  const store=core.createStore(storage);store.recent({...conditions,query:'secret@example.com'});assert.equal(store.save(conditions,[target]),true);
  assert.equal(store.save({...conditions,targetMonth:'2026-12'},[target]),true);assert.equal(store.state.saved.length,1);
  assert(!memory.get(core.STORAGE_KEY).includes('secret@example.com'));
  const restored=core.createStore(storage);assert.deepEqual(restored.state.recent,conditions);assert.equal(restored.state.saved[0].conditions.targetMonth,'2026-12');
  restored.remove(core.identity(conditions));assert.equal(core.createStore(storage).state.saved.length,0);
});
test('blocked, corrupted or malicious storage does not break calculator',()=>{
  const unavailable=core.createStore({getItem(){throw new Error('denied');},setItem(){throw new Error('denied');}});assert.equal(unavailable.save(conditions,[target]),true);assert.equal(unavailable.available(),false);assert.equal(core.compare(base,target).valid,true);
  const corrupt=core.createStore({getItem(){return '{invalid';},setItem(){}});assert.equal(corrupt.state.saved.length,0);
  assert.equal(core.normalizeConditions({...conditions,destination:'<script>'}),null);
  assert.equal(core.safeUrl('javascript:alert(1)'),null);assert.equal(core.safeUrl('https://user:password@example.com/'),null);
});
test('update badges distinguish new official records, revisions and historical changes; forecasts ignored',()=>{
  const before=core.snapshot([target]);assert.deepEqual(core.changes(before,core.snapshot([target]),'2026-10'),[]);
  assert.deepEqual(core.changes(before,core.snapshot([{...target,amount:78000}]),'2026-10'),['notice_revision']);
  assert.deepEqual(core.changes({},before,'2026-10'),['new_notice']);assert.deepEqual(core.changes(null,before,'2026-10'),[]);
  assert.deepEqual(core.changes({},core.snapshot([{...target,status:'forecast'}]),'2026-10'),[]);
  assert.deepEqual(core.changes({},core.snapshot([{...target,verificationStatus:'legacy_record'}]),'2026-10'),[]);
  assert.deepEqual(core.changes(before,core.snapshot([{...target,amount:78000}]),'2026-12'),['historical_revision']);
  assert.deepEqual(core.changes({},core.snapshot([base]),'2026-11'),['historical_added']);
});
test('URL-only corrections do not create official revision badges, including existing snapshots',()=>{
  const before=core.snapshot([target]),after=core.snapshot([{...target,sourceUrl:target.sourceUrl+'?page=1'}]);
  assert.deepEqual(core.changes(before,after,'2026-10'),[]);
  const key=Object.keys(before)[0],legacy={[key]:{month:target.month,value:JSON.stringify([target.amount,target.currency,target.basis,target.sourceUrl])}};
  assert.deepEqual(core.changes(legacy,after,'2026-10'),[]);
  assert.deepEqual(core.changes(legacy,core.snapshot([{...target,basis:'new-official-band'}]),'2026-10'),['notice_revision']);
});
test('lowest official amounts exclude unconfirmed and source-unverified entries',()=>{
  assert.deepEqual(core.lowestVerified([target,{...target,amount:1,status:'unconfirmed'},{...target,currency:'USD',amount:1,verificationStatus:'unverified'},{...target,amount:0,verificationStatus:'legacy_record'}]),{KRW:76000});
  assert.deepEqual(core.lowestVerified([{...target,status:'unconfirmed'}]),{});
  assert.deepEqual(core.lowestVerified([target,{...target,currency:'USD',amount:43}]),{KRW:76000,USD:43});
});
function feed(metadata={}){
  const m={airline:'KE',origin:'ICN',destination:'NRT',effectiveMonth:'2026.12',chargingBasis:'500-999',currency:'KRW',oneWayAmount:82500,direction:'one_way',dataStatus:'confirmed',validationStatus:'passed',validatedAt:'2026-11-16T10:00:00+09:00',collectedAt:'2026-11-16T09:00:00+09:00',sourceUrl:'https://www.koreanair.com/notice/2612',...metadata};
  return {airlines:[{iataCode:'KE',currentPeriod:'2026.12',items:[{current:82500,label:'500~999mi',metadata:m}]}]};
}
test('future feed accepts only validated complete exact records, retaining absent dates',()=>{
  const records=core.validatedFeedRecords(feed());assert.equal(records.length,1);assert.equal(records[0].month,'2026-12');assert.equal(records[0].amount,82500);assert.equal(records[0].publishedAt,null);assert.equal(records[0].verificationStatus,'unverified');assert.deepEqual(core.snapshot(records),{});
  const verified=core.validatedFeedRecords(feed({sourceVerificationStatus:'official_verified',sourceVerifiedAt:'2026-11-16T09:30:00+09:00'}));assert.equal(verified[0].verificationStatus,'verified');assert.equal(Object.keys(core.snapshot(verified)).length,1);assert.equal(verified[0].verifiedAt,'2026-11-16T09:30:00+09:00');
  for(const invalid of [{direction:null},{origin:null},{dataStatus:'forecast'},{validationStatus:'rejected'},{sourceUrl:'javascript:bad()'},{effectiveMonth:'2026.11'},{oneWayAmount:82000},{effectiveFrom:'2026-11-01'}])assert.deepEqual(core.validatedFeedRecords(feed(invalid)),[]);
  const duplicate=feed();duplicate.airlines[0].items.push(duplicate.airlines[0].items[0]);assert.deepEqual(core.selectFeedRecord(core.validatedFeedRecords(duplicate),{airline:'KE',origin:'ICN',destination:'NRT',month:'2026-12',direction:'one_way'}),{present:true,record:null});
});
test('validated current route records override legacy currency/basis, and ambiguous records block fallback',()=>{
  const query={airline:'KE',origin:'ICN',destination:'NRT',month:'2026-12',direction:'one_way'};
  const changed=core.validatedFeedRecords(feed({currency:'USD',chargingBasis:'official-new-band'}));
  const selected=core.selectFeedRecord(changed,query);assert.equal(selected.present,true);assert.equal(selected.record.currency,'USD');assert.equal(selected.record.basis,'official-new-band');assert.equal(core.compare(base,selected.record).reason,'conditions');
  assert.deepEqual(core.selectFeedRecord(changed.concat({...changed[0],currency:'EUR'}),query),{present:true,record:null});
  assert.deepEqual(core.selectFeedRecord(changed,{...query,destination:'KIX'}),{present:false,record:null});
});
