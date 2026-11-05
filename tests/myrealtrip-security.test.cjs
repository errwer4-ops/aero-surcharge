'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {EventEmitter}=require('node:events');
const root=path.resolve(__dirname,'..');
function fixture(mode='http'){
  let calls=0;
  const client={request(url,options,callback){
    calls++;const req=new EventEmitter();req.destroy=()=>{};req.write=()=>{};
    req.end=()=>process.nextTick(()=>{
      if(mode==='network'){req.emit('error',new Error('fixture-private-host.invalid fixture-private-password'));return;}
      const res=new EventEmitter();res.statusCode=mode==='mylink'?200:503;res.statusMessage='fixture-private-status';res.headers={'content-type':'application/json'};
      callback(res);res.emit('data',Buffer.from(JSON.stringify({private:'fixture-private-body',key:'fixture-private-key'})));res.emit('end');
    });return req;
  }};
  const env={MYREALTRIP_API_KEY:'fixture-private-key',MYREALTRIP_ADMIN_TOKEN:'fixture-admin-token',
    MYREALTRIP_API_BASE_URL:'https://fixture-private-user:fixture-private-password@fixture-private-host.invalid',
    MYREALTRIP_PRODUCTS_ENDPOINT:'/products',MYREALTRIP_MYLINK_ENDPOINT:'/mylink',MYREALTRIP_REVENUES_ENDPOINT:'/revenues'};
  const context={module:{exports:{}},process:{env},Buffer,URL,
    require:name=>name==='http'||name==='https'?client:name==='./env'?{loadLocalEnv(){}}:require(name)};
  vm.runInNewContext(fs.readFileSync(path.join(root,'lib/myrealtrip/server.js'),'utf8'),context);
  async function call(resource,query={call:'1'},headers={}){
    const req={method:'GET',query,headers,url:'/api/myrealtrip/'+resource};
    const res={setHeader(){},status(code){this.code=code;return this;},json(body){this.body=body;return this;}};
    await context.module.exports.handleResourceRoute(req,res,resource);return res;
  }
  return {call,calls:()=>calls};
}
test('public partner failures omit configured URL, userinfo, raw upstream body and exception details',async()=>{
  for(const mode of ['http','network','mylink']){
    const f=fixture(mode),res=await f.call(mode==='mylink'?'mylink':'products',mode==='mylink'?{call:'1',originalUrl:'https://www.myrealtrip.com/'}:{call:'1'});
    assert.equal(res.code,502);assert.equal(res.body.success,false);assert.equal(res.body.code,'upstream_request_failed');
    assert(!JSON.stringify(res.body).includes('fixture-private'),'private fixture leaked in public response');
    assert.equal(Object.hasOwn(res.body,'upstreamUrl'),false);assert.equal(Object.hasOwn(res.body,'responseTextPreview'),false);
    assert.equal(f.calls(),1);
  }
});
test('admin auth and HTTPS partner-host restriction reject requests before upstream I/O',async()=>{
  const f=fixture();assert.equal((await f.call('revenues')).code,401);
  for(const originalUrl of ['http://myrealtrip.com/','https://myrealtrip.com.evil.invalid/','https://127.0.0.1/'])
    assert.equal((await f.call('mylink',{call:'1',originalUrl})).code,400);
  assert.equal(f.calls(),0);
  assert.equal((await f.call('revenues',{call:'1'},{authorization:'Bearer fixture-admin-token'})).code,502);
  assert.equal(f.calls(),1);
});
test('flight and environment diagnostics do not echo internal exception messages',async()=>{
  const client={request(){const req=new EventEmitter();req.end=()=>process.nextTick(()=>req.emit('error',new Error('fixture-private-host.invalid')));req.write=()=>{};return req;}};
  const context={module:{exports:{}},Buffer,URL,process:{env:{MYREALTRIP_API_KEY:'fixture-key',MYREALTRIP_API_BASE_URL:'https://fixture-private-host.invalid'}},
    require:name=>name==='http'||name==='https'?client:name==='../../lib/myrealtrip/env'?{loadLocalEnv(){}}:require(name)};
  vm.runInNewContext(fs.readFileSync(path.join(root,'api/myrealtrip/flights.js'),'utf8'),context);
  const res={status(code){this.code=code;return this;},json(body){this.body=body;}};
  await context.module.exports({method:'GET',query:{origin:'ICN',destination:'NRT',departDate:'2027-01-01'}},res);
  assert.equal(res.code,500);assert(!JSON.stringify(res.body).includes('fixture-private'));
  const diagnostic={module:{exports:{}},require:()=>({loadLocalEnv(){throw new Error('fixture-private-password');}})};
  vm.runInNewContext(fs.readFileSync(path.join(root,'api/myrealtrip/test.js'),'utf8'),diagnostic);
  diagnostic.module.exports({method:'GET'},res);
  assert.equal(res.code,500);assert(!JSON.stringify(res.body).includes('fixture-private'));
});
