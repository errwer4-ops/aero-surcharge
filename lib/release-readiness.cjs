const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const vm=require('node:vm');

function sourceDigest(root){
  const files=[];
  function walk(relative){
    for(const item of fs.readdirSync(path.join(root,relative),{withFileTypes:true})){
      const name=relative+'/'+item.name;
      if(item.isDirectory())walk(name);else if(item.isFile())files.push(name);
    }
  }
  ['public','api','lib','scripts','tests','.github/workflows'].forEach(walk);
  files.push('package.json','package-lock.json','vercel.json');
  const hash=crypto.createHash('sha256');
  files.sort().forEach(name=>{hash.update(name+'\0');const value=fs.readFileSync(path.join(root,name));hash.update(/\.(?:js|cjs|json|html|css|xml|txt|ya?ml)$/.test(name)?value.toString('utf8').replace(/\r\n/g,'\n'):value);hash.update('\0');});
  return hash.digest('hex');
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
function evaluateReview(config,review,digest){
  const errors=[];
  if(!review||review.version!==1)return {passed:false,errors:['배포 검토 파일 형식이 올바르지 않습니다.']};
  const ads=review.ads||{},ops=review.operations||{};
  if(!['enabled','intentionally_disabled'].includes(ads.decision)||!reviewed(ads))errors.push('광고 유지/의도적 중단 결정과 검토 근거가 없습니다. false 기본값으로 배포할 수 없습니다.');
  if(ads.decision==='enabled'&&(config.adsEnabled!==true||ads.consentReview!=='reviewed'))errors.push('광고 활성화 설정 또는 지역별 동의/CMP 검토가 완료되지 않았습니다.');
  if(ads.decision==='intentionally_disabled'&&config.adsEnabled!==false)errors.push('광고 중단 결정과 공개 로더 설정이 다릅니다.');
  if(ops.status!=='reviewed'||!reviewed(ops))errors.push('실수집·GA4 수신·Vercel 환경 등에 대한 운영 검토 근거가 없습니다.');
  if(ops.sourceDigest!==digest)errors.push('운영 검토 대상과 현재 배포 소스가 다릅니다.');
  return {passed:errors.length===0,errors,sourceDigest:digest,adsEnabled:config.adsEnabled,clarityConfigured:!!config.clarityId};
}
function check(root){return evaluateReview(publicConfig(root),JSON.parse(fs.readFileSync(path.join(root,'config/deployment-review.json'),'utf8')),sourceDigest(root));}
module.exports={sourceDigest,publicConfig,evaluateReview,check};
