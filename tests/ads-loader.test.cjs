const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const code=fs.readFileSync(path.join(__dirname,'../public/_ads.js'),'utf8');
function run(options={}){
  const {consent=true,hostname='aero-surcharge.test',allowLocal=false}=options;
  const enabled=Object.hasOwn(options,'enabled')?options.enabled:true;
  const scripts=[],listeners={};
  const context={location:{hostname},window:{AERO_ANALYTICS_CONFIG:{adsEnabled:enabled,allowLocal,adsClient:'ca-pub-4285114770383510'},AeroAnalytics:{consent:()=>({advertising:consent})},addEventListener:(name,handler)=>listeners[name]=handler},document:{getElementById:id=>scripts.find(script=>script.id===id),createElement:()=>({}),head:{appendChild:script=>scripts.push(script)}}};
  vm.runInNewContext(code,context);listeners['aero:consent']();listeners['aero:consent']();return scripts;
}
test('ads require boolean enablement and boolean consent, without duplicate loading',()=>{
  for(const enabled of [false,'false','true',1,null,undefined])assert.equal(run({enabled}).length,0);
  for(const consent of [false,'false','true',1,null])assert.equal(run({consent}).length,0);
  assert.equal(run().length,1);
});
test('IPv4, IPv6 and named localhost need an explicit local test override',()=>{
  for(const hostname of ['localhost','127.0.0.1','[::1]']){
    assert.equal(run({hostname}).length,0);
    assert.equal(run({hostname,allowLocal:'true'}).length,0);
    assert.equal(run({hostname,allowLocal:true}).length,1);
  }
});
