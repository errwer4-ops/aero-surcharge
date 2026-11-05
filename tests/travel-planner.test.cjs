'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { EventEmitter } = require('node:events');
const root = path.resolve(__dirname, '..');
const today = new Date(Date.now() + 9 * 3600000).toISOString().slice(0, 10);
const dateAfter = days => new Date(Date.parse(today) + days * 86400000).toISOString().slice(0, 10);
const params = { departureAirport:'ICN', arrivalAirport:'KIX', departureDate:dateAfter(14), returnDate:dateAfter(17), travelers:2, budgetKRW:2000000, attractions:[] };

function plannerFixture({ configured=false, status=503, item=null }={}) {
  let calls=0;
  const https={ request(options, callback) {
    calls++; const req=new EventEmitter(); req.setTimeout=()=>{}; req.write=()=>{}; req.destroy=()=>{};
    req.end=()=>process.nextTick(()=>{const res=new EventEmitter();res.statusCode=status;callback(res);
      res.emit('data',JSON.stringify({result:{status:200},data:{items:item?[item]:[]}}));res.emit('end');});
    return req;
  }};
  const context={module:{exports:{}},process:{env:{MYREALTRIP_API_KEY:configured?'fixture-partner-key':''}},Buffer,URL,console,
    require:name=>name==='https'?https:name==='../myrealtrip/env'?{loadLocalEnv(){}}:require(name)};
  vm.runInNewContext(fs.readFileSync(path.join(root,'lib/travel/planner.js'),'utf8'),context);
  return {...context.module.exports,calls:()=>calls};
}

test('planner rejects invalid travelers, budgets, calendars, durations, airports and attraction lists before I/O', async()=>{
  const p=plannerFixture({configured:true});
  const changes=[null,[],{...params,travelers:-2},{...params,travelers:0},{...params,travelers:1.5},{...params,travelers:10},
    {...params,budgetKRW:Infinity},{...params,budgetKRW:99999},{...params,budgetKRW:100000001},
    {...params,departureDate:'2027-02-30'},{...params,departureDate:'not-a-date'},
    {...params,departureDate:dateAfter(-1)},{...params,returnDate:dateAfter(13)},{...params,returnDate:dateAfter(14)},
    {...params,returnDate:dateAfter(45)},{...params,departureAirport:'JFK'},{...params,arrivalAirport:'XXX'},
    {...params,attractions:[null]},{...params,attractions:[' ']},{...params,attractions:['a'.repeat(81)]},
    {...params,attractions:Array(21).fill('오사카성')}];
  for(const invalid of changes) await assert.rejects(p.buildPlans(invalid),error=>error.statusCode===400);
  assert.equal(p.calls(),0);
  assert.equal(p.validateParams({...params,travelers:9,budgetKRW:100000000,returnDate:dateAfter(44)}).travelers,9);
});

test('missing partner config keeps existing budget assumptions and unknown fuel/total distinct without requests', async()=>{
  const p=plannerFixture(),data=await p.buildPlans({...params,attractions:['unknown attraction']});
  assert.equal(p.calls(),0);assert.equal(data.plans.length,3);
  for(const plan of data.plans){
    assert.equal(plan.fuelSurcharge.perTravelerKRW,null);assert.equal(plan.fuelSurcharge.totalKRW,null);
    assert.equal(plan.fuelSurcharge.source,null);assert.equal(plan.fuelSurcharge.updatedAt,null);
    assert.equal(plan.fuelSurcharge.ticketingMonth,today.slice(0,7));
    assert.equal(plan.totalCostKRW,null);assert.equal(plan.remainingBudgetKRW,null);assert.equal(plan.confidenceScore,null);
    assert.equal(plan.budgetStatus,'unconfirmed');assert.equal(plan.costBreakdown.tickets,null);
    assert.equal(plan.costBreakdown.fuelSurcharge,null);assert.equal(plan.costBreakdown.contingency,null);
    assert.equal(plan.hotel.source,'fallback');assert(plan.estimatedSubtotalKRW>0);
    const subtotal=['flights','hotels','tickets','transport','meals'].map(key=>plan.costBreakdown[key]).filter(Number.isFinite).reduce((sum,value)=>sum+value,0);
    assert.equal(plan.estimatedSubtotalKRW,subtotal);assert.match(plan.estimateNote,/부분합/);
  }
  assert.equal(data.plans[0].costBreakdown.flights,576000,'existing flight budget assumption retained');
  assert.equal(data.plans[0].attractionCosts[0].unitPriceKRW,null,'unknown attraction is not a free ticket');
});

test('adding an unpriced attraction preserves known ticket assumptions in the partial subtotal',async()=>{
  const p=plannerFixture();
  const known=await p.buildPlans({...params,attractions:['USJ']});
  const mixed=await p.buildPlans({...params,attractions:['USJ','unknown attraction']});
  const unknown=await p.buildPlans({...params,attractions:['unknown attraction']});
  for(let i=0;i<known.plans.length;i++){
    assert.equal(known.plans[i].costBreakdown.tickets,178000);
    assert.equal(mixed.plans[i].costBreakdown.tickets,null);
    assert.equal(mixed.plans[i].costBreakdown.knownTicketsSubtotal,178000);
    assert.equal(mixed.plans[i].estimatedSubtotalKRW,known.plans[i].estimatedSubtotalKRW);
    assert.equal(mixed.plans[i].estimatedSubtotalKRW-unknown.plans[i].estimatedSubtotalKRW,178000);
    assert.equal(mixed.plans[i].totalCostKRW,null);
    assert.equal(mixed.plans[i].attractionCosts[1].unitPriceKRW,null);
  }
  assert.equal(p.calls(),0);
});

test('fuel month follows KST ticketing boundary instead of future travel month and never reuses April feed', async()=>{
  const p=plannerFixture(),input={...params,departureDate:'2027-01-10',returnDate:'2027-01-13'};
  const before=await p.buildPlans(input,{now:new Date('2026-11-30T14:59:59Z')});
  const after=await p.buildPlans(input,{now:new Date('2026-11-30T15:00:00Z')});
  assert.equal(before.plans[0].fuelSurcharge.ticketingMonth,'2026-11');
  assert.equal(after.plans[0].fuelSurcharge.ticketingMonth,'2026-12');
  assert.equal(after.plans[0].fuelSurcharge.perTravelerKRW,null);
  assert(!JSON.stringify(after).includes('official:KE'));
});

test('upstream HTTP errors and invalid prices use labeled assumptions; valid hotel response preserves safe link',async()=>{
  const item={itemId:'fixture',itemName:'Fixture hotel',salePrice:123000,productUrl:'https://www.myrealtrip.com/products/fixture'};
  const failed=plannerFixture({configured:true,status:503,item}),failedData=await failed.buildPlans(params);
  assert.equal(failed.calls(),3);assert.equal(failedData.plans[0].hotel.source,'fallback');
  const bad=plannerFixture({configured:true,status:200,item:{...item,salePrice:-100}});
  assert.equal((await bad.buildPlans(params)).plans[0].hotel.source,'fallback');
  const good=plannerFixture({configured:true,status:200,item}),goodData=await good.buildPlans(params);
  assert.equal(goodData.plans[0].hotel.source,'live');assert.equal(goodData.plans[0].hotel.pricePerNight,123000);
  assert.equal(goodData.plans[0].hotel.bookingUrl,item.productUrl);
  const unsafe=plannerFixture({configured:true,status:200,item:{...item,productUrl:'javascript:alert(1)'}});
  assert.equal((await unsafe.buildPlans(params)).plans[0].hotel.bookingUrl,null);
});

test('travel route returns 400/413 for malformed bodies and never exposes unexpected internal errors',async()=>{
  let calls=0,shouldFail=false;
  const p=plannerFixture();
  const context={module:{exports:{}},Buffer,require:name=>name==='../../lib/travel/planner'?{
    validateParams:p.validateParams,buildPlans:async()=>{calls++;if(shouldFail)throw new Error('fixture-internal-secret');return {plans:[]};}
  }:require(name)};
  vm.runInNewContext(fs.readFileSync(path.join(root,'api/travel/plan.js'),'utf8'),context);
  async function invoke(body,{raw=false,method='POST'}={}){
    const req=new EventEmitter();req.method=method;req.setEncoding=()=>{};if(!raw)req.body=body;
    const res={headers:{},setHeader(k,v){this.headers[k]=v;},status(code){this.code=code;return this;},json(payload){this.payload=payload;return this;}};
    const done=context.module.exports(req,res);
    if(raw)process.nextTick(()=>{req.emit('data',body);req.emit('end');});
    await done;return res;
  }
  for(const body of [null,[],{},'{invalid',JSON.stringify({...params,travelers:-2})]) assert.equal((await invoke(body)).code,400);
  assert.equal((await invoke('{invalid',{raw:true})).code,400);
  assert.equal((await invoke('x'.repeat(16385),{raw:true})).code,413);assert.equal(calls,0);
  assert.equal((await invoke(params)).code,200);
  assert.equal((await invoke(JSON.stringify(params),{raw:true})).code,200);
  shouldFail=true;const failed=await invoke(params);assert.equal(failed.code,502);assert(!JSON.stringify(failed.payload).includes('fixture-internal-secret'));
  assert.equal(failed.headers['Cache-Control'],'no-store, max-age=0');
  assert.equal((await invoke(null,{method:'GET'})).code,405);
});
