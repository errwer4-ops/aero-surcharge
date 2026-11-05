const path=require('node:path');
const result=require('../lib/release-readiness.cjs').check(path.resolve(__dirname,'..'));
console.log(JSON.stringify({at:new Date().toISOString(),scope:'scoped build readiness; a settings baseline match is not external-service verification',...result},null,2));
if(!result.passed)process.exitCode=1;
