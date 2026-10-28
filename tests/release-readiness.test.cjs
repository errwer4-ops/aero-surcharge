const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {evaluateReview}=require('../lib/release-readiness.cjs');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
function fixture(){return {version:1,ads:{decision:'intentionally_disabled',reviewedAt:'2026-01-01T00:00:00Z',evidence:'Operator review fixture only'},operations:{status:'reviewed',reviewedAt:'2026-01-01T00:00:00Z',evidence:'External test evidence fixture only',sourceDigest:'source-A'}};}
test('pending, inconsistent or stale production review cannot pass silently',()=>{
  assert.equal(evaluateReview({adsEnabled:false},{version:1},'source-A').passed,false);
  assert.equal(evaluateReview({adsEnabled:false},fixture(),'source-A').passed,true);
  assert.equal(evaluateReview({adsEnabled:true},fixture(),'source-A').passed,false);
  assert.equal(evaluateReview({adsEnabled:false},fixture(),'source-B').passed,false);
  const enabled=fixture();enabled.ads.decision='enabled';
  assert.equal(evaluateReview({adsEnabled:true},enabled,'source-A').passed,false);
  enabled.ads.consentReview='reviewed';assert.equal(evaluateReview({adsEnabled:true},enabled,'source-A').passed,true);
  enabled.ads.reviewedAt='2099-01-01T00:00:00Z';assert.equal(evaluateReview({adsEnabled:true},enabled,'source-A').passed,false);
});
test('ad loader requires explicit enablement and advertising consent and loads once',()=>{
  const code=fs.readFileSync(path.join(root,'public/_ads.js'),'utf8');
  for(const enabled of [false,true])for(const granted of [false,true]){
    const scripts=[],handlers={};
    const context={location:{hostname:'aero-surcharge.com'},window:{AERO_ANALYTICS_CONFIG:{adsEnabled:enabled,adsClient:'ca-pub-4285114770383510'},AeroAnalytics:{consent:()=>({advertising:granted})},addEventListener:(n,f)=>handlers[n]=f},document:{getElementById:id=>scripts.find(s=>s.id===id),createElement:()=>({}),head:{appendChild:s=>scripts.push(s)}}};
    vm.runInNewContext(code,context);handlers['aero:consent']();handlers['aero:consent']();
    assert.equal(scripts.length,enabled&&granted?1:0);
  }
});
test('environment diagnostic prints presence, never credentials or URL values',()=>{
  const secret='fixture-secret-never-output',url='https://user:fixture-password@example.invalid/private';
  // Isolated cwd avoids loading any actual .env.local during this test.
  const output=execFileSync(process.execPath,[path.join(root,'scripts/check_env.js')],{cwd:path.join(root,'tests'),encoding:'utf8',env:{...process.env,MYREALTRIP_API_KEY:secret,MYREALTRIP_API_BASE_URL:url}});
  assert(!output.includes(secret));assert(!output.includes('fixture-password'));assert(!output.includes('fixture-'));
  assert(output.includes('MYREALTRIP_API_KEY loaded: true'));
});

test('deployment digest covers API handlers and verification definitions',()=>{
  const inspected=[];
  const fakeFs={...fs,readFileSync:(file,...args)=>{inspected.push(path.relative(root,file).replace(/\\/g,'/'));return fs.readFileSync(file,...args);}};
  const context={module:{exports:{}},require:name=>name==='node:fs'?fakeFs:require(name)};
  vm.runInNewContext(fs.readFileSync(path.join(root,'lib/release-readiness.cjs'),'utf8'),context);
  context.module.exports.sourceDigest(root);
  assert(inspected.includes('api/myrealtrip/flights.js'));
  assert(inspected.includes('api/travel/plan.js'));
  assert(inspected.includes('tests/release-readiness.test.cjs'));
  assert(inspected.includes('.github/workflows/data-validation.yml'));
  assert(!inspected.includes('config/deployment-review.json'),'review digest must not include itself');
});

test('static validation rejects missing provenance even with versioned shared script',()=>{
  const file=path.join(root,'scripts/verify_static_sources.cjs');
  const source=fs.readFileSync(path.join(root,'public/index.html'),'utf8');
  assert(/_shared\.js\?/.test(source),'exercise actual versioned include');
  const fakeFs={readdirSync:()=>['index.html'],readFileSync:()=>source.replace(/<script\b[^>]*src="source-provenance\.js(?:\?[^"]*)?"[^>]*><\/script>/i,'')};
  assert.throws(()=>vm.runInNewContext(fs.readFileSync(file,'utf8'),{__dirname:path.dirname(file),require:name=>name==='node:fs'?fakeFs:require(name),console}),/source provenance must load before shared renderer/);
});

test('review digest is portable across Windows and CI text line endings',()=>{
  const original=require('../lib/release-readiness.cjs').sourceDigest(root);
  const fakeFs={...fs,readFileSync:(file,...args)=>{
    const value=fs.readFileSync(file,...args);
    if(!/\.(?:js|cjs|json|html|css|xml|txt|ya?ml)$/.test(file))return value;
    return Buffer.from(value.toString('utf8').replace(/\r?\n/g,'\r\n'));
  }};
  const context={module:{exports:{}},require:name=>name==='node:fs'?fakeFs:require(name)};
  vm.runInNewContext(fs.readFileSync(path.join(root,'lib/release-readiness.cjs'),'utf8'),context);
  assert.equal(context.module.exports.sourceDigest(root),original);
});
