'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),out=path.join(root,'artifacts/review-verification/planner-fix-nov05');
// Serve the real UI from an intercepted origin. The planner has no configured
// partner key in this isolated VM, and every external browser request is blocked.
const context={module:{exports:{}},process:{env:{}},Buffer,URL,console,
  require:name=>name==='https'?{request(){throw new Error('Unexpected external API request');}}:name==='../myrealtrip/env'?{loadLocalEnv(){}}:require(name)};
vm.runInNewContext(fs.readFileSync(path.join(root,'lib/travel/planner.js'),'utf8'),context);

async function main(){
  fs.mkdirSync(out,{recursive:true});
  const browser=await chromium.launch({headless:true}),reports=[];
  try{
    for(const width of [320,390,1440]){
      const page=await browser.newPage({viewport:{width,height:900}}),errors=[];let apiCalls=0,latestData;
      page.on('pageerror',error=>errors.push(error.message));
      await page.route('**/*',async route=>{
        const url=new URL(route.request().url());
        if(url.hostname!=='planner.qa.invalid')return route.abort();
        if(url.pathname==='/api/travel/plan'){
          apiCalls++;
          try{latestData=await context.module.exports.buildPlans(route.request().postDataJSON());
            return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({success:true,data:latestData})});
          }catch(error){return route.fulfill({status:400,contentType:'application/json',body:JSON.stringify({success:false,message:error.message})});}
        }
        const relative=url.pathname==='/'||url.pathname==='/planner'?'planner.html':url.pathname.slice(1),file=path.join(root,'public',relative);
        if(!fs.existsSync(file))return route.fulfill({status:404,body:'Not found'});
        return route.fulfill({contentType:file.endsWith('.html')?'text/html':file.endsWith('.css')?'text/css':'text/javascript',body:fs.readFileSync(file)});
      });
      await page.goto('https://planner.qa.invalid/planner');
      await page.waitForFunction(()=>typeof calcPlans==='function');
      await page.locator('#aeroConsentDeny').click();
      const bounds=await page.evaluate(()=>{
        const panel=document.querySelector('.form-panel').getBoundingClientRect();
        return [...document.querySelectorAll('.form-panel input,.form-panel select')].map(el=>{
          const r=el.getBoundingClientRect();return {id:el.id,left:r.left,right:r.right,width:r.width,panelLeft:panel.left,panelRight:panel.right,visible:r.width>0&&r.height>0};
        });
      });
      assert.equal(bounds.length,7);
      assert(bounds.every(b=>b.visible&&b.left>=0&&b.right<=width&&b.left>=b.panelLeft&&b.right<=b.panelRight),JSON.stringify(bounds));
      await page.locator('#attraction-input').fill('<b>fixture</b>');await page.locator('#attraction-input').press('Enter');
      assert.equal(await page.locator('#tags-wrap b').count(),0);
      await page.locator('#budget').fill('2000000');await page.locator('#travelers').fill('-2');await page.locator('#calc-btn').click();
      assert.equal(apiCalls,0,'invalid inputs must not call the partner adapter');
      await page.locator('#travelers').fill('2');await page.locator('#calc-btn').click();
      await page.waitForFunction(()=>document.querySelectorAll('.plan-card').length===3);
      const body=await page.locator('body').innerText();
      assert(body.includes('전체 총액은 확인 필요')&&body.includes('발권월')&&body.includes('예산 가정 부분합'));
      assert(!body.includes('0점')&&!body.includes('null원')&&!body.includes('NaN'));
      assert.equal(await page.locator('.confidence-fill,.plan-badge-best').count(),0);
      for(const plan of latestData.plans)assert.equal(plan.fuelSurcharge.totalKRW,null);
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);assert.equal(overflow,false);
      await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
      await page.mouse.move(0,0);await page.screenshot({path:path.join(out,'planner-'+width+'.png'),fullPage:true});
      const unsafe=structuredClone(latestData);unsafe.plans[0].hotel.name='<img src=x onerror=alert(1)>';unsafe.plans[0].hotel.bookingUrl='javascript:alert(1)';
      await page.evaluate(data=>renderResult(data),unsafe);
      assert.equal(await page.locator('.hotel-name img').count(),0);
      assert.equal(await page.locator('a[href^="javascript:"]').count(),0);
      assert.deepEqual(errors,[]);reports.push({width,bounds,apiCalls,overflow,pageErrors:errors});await page.close();
    }
    fs.writeFileSync(path.join(out,'verification.json'),JSON.stringify({reports,externalApiCalls:0},null,2));
    console.log('PASS planner: 320/390/1440px visible inputs, bounded validation, unknown fuel/total, estimate scope, text escaping and safe links; external API calls 0');
  }finally{await browser.close();}
}
main().catch(error=>{console.error(error.message);process.exitCode=1;});
