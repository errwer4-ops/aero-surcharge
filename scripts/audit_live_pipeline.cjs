/* Bounded, explicitly read-only pipeline exercise. Never accepts publish flags. */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {spawn}=require('node:child_process');
const root=path.resolve(__dirname,'..'),out=path.join(root,'docs/review-evidence');
const envPath=path.join(root,'.env.local');
const local=fs.existsSync(envPath)?require('dotenv').parse(fs.readFileSync(envPath)):{};
const keyNames=['ANTHROPIC_API_KEY','EXCHANGERATE_API_KEY','MYREALTRIP_API_KEY','MYREALTRIP_ADMIN_TOKEN'];
const secrets=keyNames.flatMap(k=>[local[k],process.env[k]]).filter(v=>v&&v.length>5);
function redact(text){for(const secret of secrets)text=text.split(secret).join('[REDACTED]');return text;}
function hashes(){return Object.fromEntries(fs.readdirSync(path.join(root,'public/data')).filter(n=>n.endsWith('.json')).sort().map(n=>[n,crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'public/data',n))).digest('hex')]));}
async function main(){
  fs.mkdirSync(out,{recursive:true});
  const report={startedAt:new Date().toISOString(),mode:'real collectors and configured parser, dry-run only',carriers:['KE','LJ','7C'],credentialConfigured:!!(local.ANTHROPIC_API_KEY||process.env.ANTHROPIC_API_KEY),before:hashes()};
  let log='';
  report.exitCode=await new Promise(resolve=>{
    const child=spawn(process.execPath,['scripts/run_pipeline.js','--dry-run','--only',...report.carriers],{cwd:root,env:process.env,stdio:['ignore','pipe','pipe']});
    child.stdout.on('data',v=>{log+=v;});child.stderr.on('data',v=>{log+=v;});
    child.on('error',e=>{log+=e.message;resolve(1);});child.on('close',code=>resolve(code===null?1:code));
  });
  report.finishedAt=new Date().toISOString();report.after=hashes();report.publicDataPreserved=JSON.stringify(report.before)===JSON.stringify(report.after);
  report.pipelinePassed=report.exitCode===0;
  report.interpretation=report.pipelinePassed?'Selected real dry-run passed; no production publication was performed.':'Selected real dry-run did not pass; log describes the blocking collection/parser/validation result. This is not a full-carrier success.';
  fs.writeFileSync(path.join(out,'live-pipeline.log'),redact(log));
  fs.writeFileSync(path.join(out,'live-pipeline.json'),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify({credentialConfigured:report.credentialConfigured,exitCode:report.exitCode,publicDataPreserved:report.publicDataPreserved,interpretation:report.interpretation}));
  process.exitCode=report.pipelinePassed&&report.publicDataPreserved?0:1;
}
main().catch(e=>{console.error(redact(e.message));process.exitCode=1;});
