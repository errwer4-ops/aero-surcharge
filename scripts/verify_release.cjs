/* One local/CI/build command; artifacts contain public test data, never .env. */
const fs=require('node:fs');
const path=require('node:path');
const {spawn,execFileSync}=require('node:child_process');
const {sourceDigest,check}=require('../lib/release-readiness.cjs');
const root=path.resolve(__dirname,'..'),build=process.argv.includes('--build');
const stamp=new Date().toISOString().replace(/[:.]/g,'-');
const output=path.join(root,'artifacts/review-verification',stamp);
fs.mkdirSync(output,{recursive:true});
const report={startedAt:new Date().toISOString(),scope:'local automated verification; external services are not asserted',runtime:{node:process.version,platform:process.platform,playwright:require('playwright/package.json').version},sourceDigest:sourceDigest(root),passed:false,checks:[]};
try{report.gitHead=execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim();report.workingTree=execFileSync('git',['status','--porcelain'],{cwd:root,encoding:'utf8'}).trim().split('\n').filter(Boolean);}catch(_){report.gitHead=null;}
async function run(name,args){
  const started=Date.now(),logPath=path.join(output,name+'.log');
  const log=fs.createWriteStream(logPath);
  const code=await new Promise(resolve=>{
    const child=spawn(process.execPath,args,{cwd:root,env:process.env,stdio:['ignore','pipe','pipe']});
    child.stdout.pipe(log,{end:false});child.stderr.pipe(log,{end:false});
    child.on('error',error=>{log.write(error.message+'\n');resolve(1);});child.on('close',value=>resolve(value===null?1:value));
  });
  await new Promise(resolve=>log.end(resolve));
  report.checks.push({name,command:['node',...args],exitCode:code,durationMs:Date.now()-started,log:name+'.log'});
  console.log((code===0?'PASS':'FAIL')+': '+name+' ('+code+')');
  if(code!==0)console.error(fs.readFileSync(logPath,'utf8').split(/\r?\n/).slice(-60).join('\n'));
  return code===0;
}
async function main(){
  report.deploymentReview=check(root);
  const readiness=report.deploymentReview;
  readiness.warnings.forEach(message=>console.warn('REVIEW NOTE: '+message));
  // CI and production enforce the same scoped review. A baseline match is not
  // external-service verification, and never skips the technical checks below.
  if(!readiness.passed){
    report.blocked='Operational settings review required';console.error(readiness.errors.join('\n'));
    // The artifact directory is not accessible from a failed Vercel build.
    // Log only public source paths/hashes and validation flags, never contents
    // or environment values, so a remote-only mismatch can be diagnosed.
    console.error('REVIEW DIAGNOSTICS: '+JSON.stringify({runtime:report.runtime,
      baselineChecks:readiness.baselineChecks,expectedOperationalDigest:readiness.expectedOperationalDigest,
      actualOperationalDigest:readiness.actualOperationalDigest,operationalFiles:readiness.operationalFiles}));
    process.exitCode=1;return;
  }
  if(build){
    if(process.env.VERCEL){
      const cli=path.join(path.dirname(require.resolve('playwright/package.json')),'cli.js');
      if(!await run('install-browser',[cli,'install','chromium'])){process.exitCode=1;return;}
    }
  }
  const tests=fs.readdirSync(path.join(root,'tests')).filter(n=>n.endsWith('.test.cjs')).sort().map(n=>'tests/'+n);
  const commands=[
    ['native',['--test',...tests]],
    ['static',['scripts/verify_static_sources.cjs']],
    ['data',['scripts/validate_data.js']],
    ['service-data',['scripts/validate_service_data.cjs']],
    ['urls',['scripts/audit_seo_urls.cjs','--browser','--pages=news,forecast,fuel-surcharge-calculator','--report='+path.join(output,'url-runtime.json')]],
    ['myrealtrip',['scripts/verify_myrealtrip_integration.js']],
    ['platform',['scripts/verify_platform.cjs']],
    ['home-period',['scripts/verify_home_period.cjs']],
    ['graph-notices',['scripts/verify_graph_notices.cjs']],
    ['calculator',['scripts/verify_calculator_platform.cjs']],
    ['seo-snapshot',['scripts/sync_static_snapshots.cjs','--check']]
  ];
  for(const [name,args] of commands)if(!await run(name,args))process.exitCode=1;
  report.finishedSourceDigest=sourceDigest(root);
  if(report.finishedSourceDigest!==report.sourceDigest){report.sourceChangedDuringRun=true;process.exitCode=1;}
  report.passed=process.exitCode!==1;
  const browser=path.join(root,'tmp/platform-verification/verification.json');
  const platformCheck=report.checks.find(item=>item.name==='platform');
  if(platformCheck&&platformCheck.exitCode===0&&fs.existsSync(browser)){
    const evidence=JSON.parse(fs.readFileSync(browser,'utf8'));
    if(Date.parse(evidence.at)>=Date.parse(report.startedAt)){
      fs.copyFileSync(browser,path.join(output,'browser-verification.json'));
      report.browserEvidence='browser-verification.json';
    }
  }
}
main().catch(error=>{report.error=error.message;console.error(error.message);process.exitCode=1;}).finally(()=>{
  report.finishedAt=new Date().toISOString();fs.writeFileSync(path.join(output,'summary.json'),JSON.stringify(report,null,2)+'\n');
  console.log('Evidence: '+output);
});
