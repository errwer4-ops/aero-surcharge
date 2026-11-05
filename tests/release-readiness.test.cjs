const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {evaluateReview,sourceDigest,operationalDigest}=require('../lib/release-readiness.cjs');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const scopeA='a'.repeat(64),scopeB='b'.repeat(64);
function fixture(){return {version:2,runtimeBaseline:{operationalDigest:scopeA,recordedAt:'2026-01-01T00:00:00Z',reason:'Unchanged settings fixture; not external review'},ads:{decision:'pending',consentReview:'pending',reviewedAt:null,evidence:null,scopeDigest:null},operations:{status:'pending',reviewedAt:null,evidence:null,scopeDigest:null}};}
function reviewFor(scope){return {reviewedAt:'2026-01-01T00:00:00Z',evidence:'External test evidence fixture only',scopeDigest:scope};}
test('daily content releases preserve pending external reviews without blocking unchanged settings',()=>{
  const review=fixture(),before=JSON.stringify(review);
  for(const digest of ['article-release-A','article-release-B']){
    const result=evaluateReview({adsEnabled:false},review,digest,scopeA);
    assert.equal(result.passed,true);assert.equal(result.baselineMatches,true);
    assert.equal(result.operationsReviewed,false);assert.equal(result.warnings.length,2);
    assert.equal(result.sourceDigest,digest);
  }
  assert.equal(JSON.stringify(review),before,'checking must not generate approval evidence');
});
test('changed operational settings require current scoped review, not a full-content approval',()=>{
  const review=fixture();
  const changed=evaluateReview({adsEnabled:false},review,'source-B',scopeB);
  assert.equal(changed.passed,false);
  assert(!changed.warnings.some(w=>w.includes('기준 설정과 일치')),'do not claim a match for changed settings');
  review.operations={status:'reviewed',...reviewFor(scopeA)};
  assert.equal(evaluateReview({adsEnabled:false},review,'source-B',scopeB).passed,false);
  review.operations.scopeDigest=scopeB;
  const result=evaluateReview({adsEnabled:false},review,'source-B',scopeB);
  assert.equal(result.passed,true);assert.equal(result.operationsReviewed,true);
  assert.equal(result.baselineMatches,false);
});
test('ads cannot be enabled using a settings baseline or missing, stale or future consent review',()=>{
  const review=fixture();
  assert.equal(evaluateReview({adsEnabled:true},review,'source-A',scopeA).passed,false);
  review.ads={decision:'enabled',...reviewFor(scopeA)};
  assert.equal(evaluateReview({adsEnabled:true},review,'source-A',scopeA).passed,false);
  review.ads.consentReview='reviewed';
  assert.equal(evaluateReview({adsEnabled:true},review,'source-A',scopeA).passed,true);
  assert.equal(evaluateReview({adsEnabled:false},review,'source-A',scopeA).passed,false);
  review.ads.scopeDigest=scopeB;
  assert.equal(evaluateReview({adsEnabled:true},review,'source-A',scopeA).passed,false);
  review.ads.scopeDigest=scopeA;review.ads.reviewedAt='2099-01-01T00:00:00Z';
  assert.equal(evaluateReview({adsEnabled:true},review,'source-A',scopeA).passed,false);
});
test('intentional ad disablement requires evidence rather than just relabeling pending',()=>{
  const review=fixture();review.ads.decision='intentionally_disabled';
  assert.equal(evaluateReview({adsEnabled:false},review,'source-A',scopeA).passed,false);
  Object.assign(review.ads,reviewFor(scopeB));
  assert.equal(evaluateReview({adsEnabled:false},review,'source-A',scopeA).passed,false);
  review.ads.scopeDigest=scopeA;
  assert.equal(evaluateReview({adsEnabled:false},review,'source-A',scopeA).passed,true);
});
test('actual build entry point rejects unreviewed ads in preview as well as production',async()=>{
  const code=fs.readFileSync(path.join(root,'scripts/verify_release.cjs'),'utf8');
  for(const environment of ['preview','production']){
    const readiness=evaluateReview({adsEnabled:true},fixture(),'source-A',scopeA);
    const processStub={argv:['node','verify_release.cjs','--build'],env:{VERCEL_ENV:environment},version:process.version,platform:process.platform};
    let saved,spawned=false;
    const context={__dirname:path.join(root,'scripts'),process:processStub,console:{log(){},warn(){},error(){}},require:name=>{
      if(name==='node:fs')return {mkdirSync(){},writeFileSync:(file,value)=>{saved=JSON.parse(value);},readdirSync:()=>[]};
      if(name==='node:child_process')return {execFileSync:()=>'',spawn:()=>{spawned=true;throw new Error('must stop before build commands');}};
      if(name==='../lib/release-readiness.cjs')return {sourceDigest:()=>'source-A',check:()=>readiness};
      if(name==='playwright/package.json')return {version:'fixture'};
      return require(name);
    }};
    await vm.runInNewContext(code,context);
    assert.equal(processStub.exitCode,1);assert.equal(spawned,false);
    assert.equal(saved.blocked,'Operational settings review required');
    assert.equal(saved.deploymentReview.passed,false);
  }
});
test('malformed or missing settings baselines fail closed',()=>{
  assert.equal(evaluateReview({adsEnabled:false},{version:1},'source-A',scopeA).passed,false);
  for(const change of [r=>delete r.runtimeBaseline,r=>r.runtimeBaseline.recordedAt='2099-01-01T00:00:00Z',r=>r.operations.status='typo']){
    const review=fixture();change(review);
    assert.equal(evaluateReview({adsEnabled:false},review,'source-A',scopeA).passed,false);
  }
  assert.equal(evaluateReview({},fixture(),'source-A',scopeA).passed,false);
  assert.equal(evaluateReview({adsEnabled:false},fixture(),'source-A',null).passed,false);
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
  assert(inspected.includes('config/deployment-review.json'),'full build input digest includes review configuration');
});

test('operational digest ignores daily market changes but detects API, loaders and added handlers',()=>{
  function withChangedFile(target){
    const fakeFs={...fs,readFileSync:(file,...args)=>{
      const value=fs.readFileSync(file,...args);
      return path.relative(root,file).replace(/\\/g,'/')===target?Buffer.concat([Buffer.from(value),Buffer.from('\n/* changed */')]):value;
    }};
    const context={module:{exports:{}},require:name=>name==='node:fs'?fakeFs:require(name)};
    vm.runInNewContext(fs.readFileSync(path.join(root,'lib/release-readiness.cjs'),'utf8'),context);
    return context.module.exports;
  }
  const scope=operationalDigest(root),full=sourceDigest(root);
  for(const file of ['public/_shared.js','public/data/forecast_feed.json','public/forecast.html']){
    const changed=withChangedFile(file);
    assert.equal(changed.operationalDigest(root),scope,file+' is daily content');
    assert.notEqual(changed.sourceDigest(root),full,file+' remains a release input');
  }
  for(const file of ['api/myrealtrip/flights.js','public/_analytics-config.js','public/_ads.js','public/_analytics.js','scripts/verify_release.cjs','vercel.json'])
    assert.notEqual(withChangedFile(file).operationalDigest(root),scope,file+' needs scoped review');
  const addedPath=path.join(root,'api','new-handler.js');
  const fakeFs={...fs,readdirSync:(folder,options)=>{
    const values=fs.readdirSync(folder,options);
    if(folder===path.join(root,'api'))values.push({name:'new-handler.js',isDirectory:()=>false,isFile:()=>true});
    return values;
  },readFileSync:(file,...args)=>file===addedPath?Buffer.from('new handler'):fs.readFileSync(file,...args)};
  const context={module:{exports:{}},require:name=>name==='node:fs'?fakeFs:require(name)};
  vm.runInNewContext(fs.readFileSync(path.join(root,'lib/release-readiness.cjs'),'utf8'),context);
  assert.notEqual(context.module.exports.operationalDigest(root),scope,'new API handlers require review');
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
  assert.equal(context.module.exports.operationalDigest(root),operationalDigest(root));
});
