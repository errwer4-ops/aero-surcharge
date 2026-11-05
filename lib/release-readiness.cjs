const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const vm=require('node:vm');

// Operational changes require review; daily notices, articles and page copy do
// not. The complete source digest below still records every release's inputs.
const OPERATIONAL_PATHS=[
  'api','lib','.github/workflows','scripts/run_pipeline.js','scripts/check_env.js',
  'scripts/verify_release.cjs','scripts/check_deployment_readiness.cjs',
  'public/_analytics-config.js','public/_analytics.js','public/_ads.js',
  'public/ads.txt','public/privacy.html','public/terms.html',
  'package.json','package-lock.json','vercel.json'
];
function listFiles(root,paths){
  const files=[];
  function walk(relative){
    if(fs.statSync(path.join(root,relative)).isFile()){files.push(relative);return;}
    for(const item of fs.readdirSync(path.join(root,relative),{withFileTypes:true})){
      const name=relative+'/'+item.name;
      if(item.isDirectory())walk(name);else if(item.isFile())files.push(name);
    }
  }
  paths.forEach(walk);
  return files.sort();
}
function normalizedFile(root,name){
  const value=fs.readFileSync(path.join(root,name));
  if(name==='vercel.json'){
    // Vercel rewrites this file as compact JSON before running the build.
    // Compare configuration values, including array order, rather than layout.
    function ordered(item){
      if(Array.isArray(item))return item.map(ordered);
      if(item&&typeof item==='object')return Object.fromEntries(Object.keys(item).sort().map(key=>[key,ordered(item[key])]));
      return item;
    }
    return JSON.stringify(ordered(JSON.parse(value.toString('utf8'))))+'\n';
  }
  return /\.(?:js|cjs|json|html|css|xml|txt|ya?ml)$/.test(name)?value.toString('utf8').replace(/\r\n/g,'\n'):value;
}
function digestPaths(root,paths){
  const hash=crypto.createHash('sha256');
  listFiles(root,paths).forEach(name=>{hash.update(name+'\0');hash.update(normalizedFile(root,name));hash.update('\0');});
  return hash.digest('hex');
}
function sourceDigest(root){
  return digestPaths(root,['public','api','lib','scripts','tests','.github/workflows',
    'package.json','package-lock.json','vercel.json','config/deployment-review.json']);
}
function operationalDigest(root){return digestPaths(root,OPERATIONAL_PATHS);}
function operationalFiles(root){
  return Object.fromEntries(listFiles(root,OPERATIONAL_PATHS).map(name=>[
    name,crypto.createHash('sha256').update(normalizedFile(root,name)).digest('hex')
  ]));
}
function publicConfig(root){
  const context={window:{}};
  vm.runInNewContext(fs.readFileSync(path.join(root,'public/_analytics-config.js'),'utf8'),context,{timeout:100});
  return context.window.AERO_ANALYTICS_CONFIG;
}
function reviewed(value){
  return value && typeof value.evidence==='string' && value.evidence.trim().length>=10 &&
    typeof value.reviewedAt==='string' && /^\d{4}-\d{2}-\d{2}T/.test(value.reviewedAt) &&
    Number.isFinite(Date.parse(value.reviewedAt)) && Date.parse(value.reviewedAt)<=Date.now();
}
function evaluateReview(config,review,digest,scopeDigest){
  const errors=[],warnings=[];
  const baseline=review&&review.runtimeBaseline||{};
  const validScope=typeof scopeDigest==='string'&&/^[a-f0-9]{64}$/.test(scopeDigest);
  const recordedAtValid=typeof baseline.recordedAt==='string'&&/^\d{4}-\d{2}-\d{2}T/.test(baseline.recordedAt)&&Number.isFinite(Date.parse(baseline.recordedAt));
  const baselineChecks={
    digestMatches:validScope&&baseline.operationalDigest===scopeDigest,
    recordedAtValid,
    recordedAtNotFuture:recordedAtValid&&Date.parse(baseline.recordedAt)<=Date.now(),
    reasonValid:typeof baseline.reason==='string'&&baseline.reason.trim().length>=10
  };
  const diagnostics={baselineChecks,
    expectedOperationalDigest:typeof baseline.operationalDigest==='string'&&/^[a-f0-9]{64}$/.test(baseline.operationalDigest)?baseline.operationalDigest:null,
    actualOperationalDigest:validScope?scopeDigest:null};
  if(!review||review.version!==2)return {passed:false,errors:['배포 검토 파일은 범위별 검토 형식(version 2)이어야 합니다.'],warnings,...diagnostics};
  const ads=review.ads||{},ops=review.operations||{};
  const baselineMatches=Object.values(baselineChecks).every(Boolean);
  const operationsReviewed=validScope&&ops.status==='reviewed'&&reviewed(ops)&&ops.scopeDigest===scopeDigest;
  if(!['pending','reviewed'].includes(ops.status))errors.push('운영 검토 상태가 올바르지 않습니다.');
  if(ops.status==='reviewed'&&!reviewed(ops))errors.push('운영 검토 완료 기록에 유효한 시각과 근거가 없습니다.');
  if(!baselineMatches&&!operationsReviewed)errors.push('광고·API·수집기·배포 설정이 기준 상태와 다릅니다. 변경된 운영 범위의 검토 근거와 scopeDigest가 필요합니다.');
  if(typeof config.adsEnabled!=='boolean')errors.push('광고 활성화 설정은 명시적인 true 또는 false여야 합니다.');
  if(config.adsEnabled===true){
    if(ads.decision!=='enabled'||ads.consentReview!=='reviewed'||!reviewed(ads)||ads.scopeDigest!==scopeDigest)
      errors.push('광고 활성화에는 현재 운영 범위의 광고·동의/CMP 검토 근거가 필요합니다.');
  }else if(config.adsEnabled===false){
    if(ads.decision==='enabled')errors.push('광고 활성화 결정과 공개 로더 설정이 다릅니다.');
    else if(!['pending','intentionally_disabled'].includes(ads.decision))errors.push('광고 검토 상태가 올바르지 않습니다.');
    else if(ads.decision==='pending')warnings.push('광고는 비활성 상태입니다. 광고 운영 검토는 pending으로 유지하며 활성화 승인으로 취급하지 않습니다.');
    else if(!reviewed(ads)||ads.scopeDigest!==scopeDigest)errors.push('의도적 광고 중단 결정에 현재 운영 범위의 검토 시각과 근거가 필요합니다.');
  }
  if(!operationsReviewed)warnings.push('외부 실수집·GA4 수신·Vercel 계정 검증은 미완료입니다.'+(baselineMatches?' 기준 설정과 일치한다는 사실만 확인했습니다.':''));
  return {passed:errors.length===0,errors,warnings,sourceDigest:digest,operationalDigest:scopeDigest,
    baselineMatches,operationsReviewed,adsEnabled:config.adsEnabled,clarityConfigured:!!config.clarityId,...diagnostics};
}
function check(root){
  const result=evaluateReview(publicConfig(root),JSON.parse(fs.readFileSync(path.join(root,'config/deployment-review.json'),'utf8')),sourceDigest(root),operationalDigest(root));
  if(!result.passed)result.operationalFiles=operationalFiles(root);
  return result;
}
module.exports={sourceDigest,operationalDigest,operationalFiles,publicConfig,evaluateReview,check};
