const path=require('node:path');
const result=require('../lib/release-readiness.cjs').check(path.resolve(__dirname,'..'));
console.log(JSON.stringify({at:new Date().toISOString(),scope:'manual operational review gate, not a claim of external service verification',...result},null,2));
if(!result.passed)process.exitCode=1;
