const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const {execFileSync, spawn} = require('node:child_process');
const {chromium} = require('playwright');
const trust = require('../public/source-provenance.js');

const port=Number(process.env.GRAPH_NOTICES_TEST_PORT||4199);
const origin = process.env.AERO_QA_ORIGIN || `http://127.0.0.1:${port}`;
const out = path.join(os.tmpdir(), 'aero-graph-notices-qa');
const langs = ['ko', 'en', 'ja', 'zh', 'fr', 'de'];
const currencies = ['KRW', 'USD', 'JPY', 'EUR', 'GBP', 'CNY', 'AUD', 'SGD', 'HKD'];
const reviewed = trust.manifest.filter(n => n.month === '2026.11' && n.status === 'source_reconciled');
assert.equal(reviewed.length, 9, 'nine independently reviewed November notices');
const expected = Object.fromEntries(reviewed.map(n => [n.airline, {
  currency:n.currency, source:n.sourceUrl,
  // The third historical display band has no November YP amount. The six
  // published amounts must remain in their actual, non-contiguous bands.
  values:n.airline === 'YP' ? [n.amounts[0], n.amounts[1], null, ...n.amounts.slice(2)] : n.amounts
}]));
const root=path.resolve(__dirname,'..'),baseRef=process.env.AERO_BASE_REF||'HEAD';
const previousHtml=execFileSync('git',['show',baseRef+':public/fuel-surcharge-graph.html'],{cwd:root,encoding:'utf8',maxBuffer:8*1024*1024});
const previousPatch=execFileSync('git',['show',baseRef+':public/graph-oct20.js'],{cwd:root,encoding:'utf8',maxBuffer:8*1024*1024});
const archiveContext={};vm.createContext(archiveContext);
vm.runInContext(previousHtml.slice(previousHtml.indexOf('var AIRLINES = ['),previousHtml.indexOf('var COLORS = {'))+'\napplyAugustArchiveData();',archiveContext);
vm.runInContext('var october='+previousPatch.match(/var october=(\{[\s\S]*?\n  \});/)[1]+';\n'+previousPatch.match(/october\.(?:ZE|YP)=\[[^;]+;/g).join('\n'),archiveContext);
const archive=JSON.parse(JSON.stringify(archiveContext.AIRLINES.map(a=>({code:a.code,values:Object.fromEntries(['apr','may','june','july','aug','sep'].map(m=>[m,a[m]]).concat([['oct',archiveContext.october[a.code]]]))}))));
const norm = s => String(s || '').replace(/\s+/g, ' ').trim();
const average = a => {const values=a.filter(v => v !== null); return values.reduce((sum,v) => sum+v,0)/values.length;};
const near = (actual, wanted, message, tolerance=1e-7) => assert(Math.abs(actual-wanted) <= tolerance, `${message}: ${actual} != ${wanted}`);
fs.mkdirSync(out, {recursive:true});

async function capture(page) {
  return page.evaluate(() => {
    const monthKeys=getSelectedMonthKeys(), airlines=getVisibleAirlines();
    const rows=[...document.querySelectorAll('#dataTableBody tr')];
    let cursor=0;
    const table=airlines.map(a => ({code:a.code, rows:a.bands.map((_,index) => {
      const tr=rows[cursor++], cells=tr ? [...tr.cells] : [], offset=index===0?2:0;
      return {band:cells[offset]?.textContent, months:monthKeys.map((month,i) => {
        const cell=cells[offset+1+i], direct=cell?[...cell.childNodes].filter(n=>n.nodeType===Node.TEXT_NODE).map(n=>n.textContent).join(''):'';
        const number=direct.replace(/[^\d.-]/g,'');
        return {month,text:cell?.textContent||'',nullCell:!!cell?.querySelector('.null-cell'),number:number?Number(number):null};
      }),change:cells.at(-1)?.textContent};
    })}));
    const canvas=document.getElementById('graphCanvas'), ctx=canvas.getContext('2d'),dpr=window.devicePixelRatio||1;
    return {airlines:AIRLINES.map(a=>({code:a.code,currency:a.currency,bands:a.bands,nov:a.nov,oct:a.oct,url:a.novemberNoticeUrl,archive:Object.fromEntries(['apr','may','june','july','aug','sep','oct'].map(m=>[m,a[m]]))})),
      points:_hitAreas.map(p=>({code:p.airline.code,month:p.month,band:p.bandIdx,original:p.origVal,value:p.displayVal,x:p.x,y:p.y,w:p.w,h:p.h,pixel:[...ctx.getImageData(Math.floor((p.x+p.w/2)*dpr),Math.floor((p.y+p.h/2)*dpr),1,1).data]})),
      table,monthKeys,filters:{...filterState},currency:SHARED_STATE.curr,rates:{...window.RATES},decimals:{...window.CURR_DEC},
      novemberLabel:tg('graph.filter.nov'),noBand:tg('graph.noBand'),links:[...document.querySelectorAll('#officialLinks a')].map(a=>a.href),
      overflow:document.documentElement.scrollWidth>innerWidth,canonical:document.querySelector('link[rel="canonical"]')?.href};
  });
}

function verifySourceArrays(x, label) {
  assert.equal(x.airlines.length, 9, label+' airline count');
  for (const [code,n] of Object.entries(expected)) {
    const a=x.airlines.find(a=>a.code===code);assert(a,label+' '+code+' present');
    assert.equal(a.currency,n.currency,code+' source currency');
    assert.deepEqual(a.nov,n.values,code+' all November bands match reviewed source');
    assert.equal(a.bands.length,n.values.length,code+' display band coverage');
    assert.equal(a.url,n.source,code+' November source URL');
    assert(x.links.includes(n.source),code+' rendered source URL');
    assert.deepEqual(a.archive,archive.find(entry=>entry.code===code).values,code+' April–October arrays unchanged from '+baseRef);
  }
  assert.equal(x.airlines.find(a=>a.code==='YP').nov[2],null,'YP unpriced band stays null');
  assert.equal(x.airlines.find(a=>a.code==='TW').nov[5],null,'Trinity dash stays null');
}

function verifyNovember(x, label) {
  verifySourceArrays(x,label);
  assert(x.monthKeys.includes('nov'),label+' November selected');
  const rows=x.table.flatMap(a=>a.rows.map((r,i)=>({code:a.code,index:i,row:r})));
  for(const {code,index,row} of rows){
    const n=expected[code],raw=n.values[index],cell=row.months.find(c=>c.month==='nov');
    assert(cell,label+' November cell exists');
    if(raw===null){assert(cell.nullCell,label+' '+code+' null band');assert.equal(cell.number,null,label+' no invented zero');if(code==='YP')assert.equal(norm(cell.text),norm(x.noBand),label+' YP gap is absent published band, not future notice');continue;}
    assert.equal(cell.nullCell,false,label+' '+code+' published amount must render');
    const value=raw/x.rates[n.currency]*x.rates[x.currency], decimals=x.decimals[x.currency]??0;
    near(cell.number,value,label+' table '+code+'/'+index,0.500001*10**(-decimals));
  }
  const points=x.points.filter(p=>p.month==='nov');
  if(x.filters.airline==='all'){
    assert.equal(points.length,9,label+' one November average bar per airline');
    for(const [code,n] of Object.entries(expected)){
      const p=points.find(p=>p.code===code);assert(p,label+' missing aggregate '+code);
      near(p.original,average(n.values),label+' original average '+code);
      near(p.value,average(n.values)/x.rates[n.currency]*x.rates[x.currency],label+' converted average '+code);
    }
  }else{
    const code=x.filters.airline,n=expected[code],indices=n.values.flatMap((value,index)=>value===null?[]:[index]);
    assert.deepEqual(points.map(p=>p.band),indices,label+' exact drawn band indices');
    points.forEach(p=>{assert.equal(p.original,n.values[p.band],label+' source chart point');near(p.value,p.original/x.rates[n.currency]*x.rates[x.currency],label+' chart conversion');});
  }
  points.forEach(p=>{assert(p.w>0&&p.h>0,label+' bar size');assert(p.pixel[3]>0&&p.pixel.slice(0,3).some(v=>v<200),label+' actual bar pixels');});
  assert.equal(x.overflow,false,label+' page overflow');
}

async function verifyTooltip(page,x,label,last=false){
  const hits=x.points.filter(p=>p.month==='nov'),hit=last?hits.at(-1):hits[0];assert(hit,label+' tooltip target');
  await page.locator('#graphCanvas').scrollIntoViewIfNeeded();
  const box=await page.locator('#graphCanvas').boundingBox();
  await page.mouse.move(box.x+hit.x+hit.w/2,box.y+hit.y+hit.h/2);
  const text=norm(await page.locator('#graphTooltip').innerText());
  assert(text.includes(norm(x.novemberLabel)),label+' tooltip identifies November: '+text);
  const decimals=x.decimals[x.currency]??0;
  assert(text.includes(hit.value.toLocaleString('en-US',{minimumFractionDigits:decimals,maximumFractionDigits:decimals})),label+' tooltip amount');
  const bounds=await page.locator('#graphTooltip').boundingBox(),size=page.viewportSize();
  assert(bounds.x>=0&&bounds.x+bounds.width<=size.width,label+' tooltip fits viewport: '+JSON.stringify(bounds));
}

async function chooseCurrency(page,currency){
  assert.equal(await page.locator('#navCurr option[value="'+currency+'"]').count(),1,'visible currency selector supports '+currency);
  await page.selectOption('#navCurr',currency);
}

(async()=>{
  let browser,server;
  const report={reviewedMonth:'2026-11',airlines:Object.keys(expected),sourceAmounts:reviewed.reduce((n,a)=>n+a.amounts.filter(v=>v!==null).length,0),runs:[]};
  try{
    if(!process.env.AERO_QA_ORIGIN){
      server=spawn(process.execPath,[path.join(__dirname,'serve_local.js')],{cwd:root,env:{...process.env,PORT:String(port)},stdio:['ignore','pipe','pipe']});
      await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error('Graph test server startup timeout')),10000);server.stdout.on('data',data=>{if(String(data).includes('Local review server')){clearTimeout(timer);resolve();}});server.on('error',error=>{clearTimeout(timer);reject(error);});server.on('exit',code=>{clearTimeout(timer);reject(new Error('Graph test server exited '+code));});});
    }
    browser=await chromium.launch();
    const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.route('**/*',route=>new URL(route.request().url()).origin===origin?route.continue():route.abort());
    await page.goto(origin+'/fuel-surcharge-graph.html');await page.waitForTimeout(1400);
    const deny=page.locator('#aeroConsentDeny');if(await deny.isVisible())await deny.click();
    const initial=await capture(page);assert.equal(initial.canonical,'https://aero-surcharge.com/fuel-surcharge-graph');
    report.currencySelectorOptions=await page.locator('#navCurr option').evaluateAll(options=>options.map(option=>option.value));
    assert.deepEqual([...report.currencySelectorOptions].sort(),[...currencies].sort(),'nine real currency options');
    assert.deepEqual(initial.monthKeys,['aug','sep','oct','nov']);verifyNovember(initial,'initial recent four');
    for(const lang of langs){
      await page.selectOption('#navLang',lang);
      await page.selectOption('#filterMonth','nov');
      for(const currency of currencies){
        await chooseCurrency(page,currency);
        await page.selectOption('#filterAirline','all');verifyNovember(await capture(page),`${lang}/${currency}/all`);
        for(const code of Object.keys(expected)){
          await page.selectOption('#filterAirline',code);
          const x=await capture(page);verifyNovember(x,`${lang}/${currency}/${code}`);
          if(code==='BX'){
            const names={ko:['단거리','중거리1','중거리2','장거리'],en:['Short-haul','Mid-haul 1','Mid-haul 2','Long-haul'],ja:['短距離','中距離1','中距離2','長距離'],zh:['短程','中程1','中程2','长程'],fr:['Court-courrier','Moyen-courrier 1','Moyen-courrier 2','Long-courrier'],de:['Kurzstrecke','Mittelstrecke 1','Mittelstrecke 2','Langstrecke']};
            assert.deepEqual(x.table.find(a=>a.code==='BX').rows.map(row=>row.band),names[lang],lang+' BX band labels are localized without changing source amounts');
          }
          if(code==='YP'&&currency==='USD')await verifyTooltip(page,x,lang+' YP/USD');
        }
      }
      report.runs.push({lang,currencies,airlines:9});
      console.log('PASS graph all bands/table/drawn points: '+lang);
    }
    for(const [selector,value] of [['#navCurr','KRW'],['#navLang','en'],['#filterMonth','oct']]){
      await page.selectOption('#navLang','ko');await page.selectOption('#navCurr','USD');await page.selectOption('#filterAirline','YP');await page.selectOption('#filterMonth','nov');
      await verifyTooltip(page,await capture(page),'before '+selector+' change');
      await page.selectOption(selector,value);
      assert.equal(await page.locator('#graphTooltip').isVisible(),false,'old tooltip hidden after '+selector+' change');
    }
    await page.selectOption('#navLang','ko');await page.selectOption('#navCurr','USD');await page.selectOption('#filterAirline','YP');
    for(const [filter,months] of [['recent4',['aug','sep','oct','nov']],['all',['apr','may','june','july','aug','sep','oct','nov']],['nov',['nov']]]){
      await page.selectOption('#filterMonth',filter);const x=await capture(page);assert.deepEqual(x.monthKeys,months);verifyNovember(x,'YP filter '+filter);
    }
    await page.selectOption('#filterView','change');
    const changes=await capture(page),yp=changes.airlines.find(a=>a.code==='YP');
    assert.deepEqual(changes.points.map(p=>p.band),[0,1,3,4,5,6]);
    changes.points.forEach(p=>near(p.value,(yp.nov[p.band]-yp.oct[p.band])/yp.oct[p.band]*100,'YP per-band change'));
    await page.selectOption('#filterView','amount');
    await page.mouse.move(0,0);
    await page.locator('#graphCanvas').screenshot({path:path.join(out,'yp-november-desktop.png')});
    const before=await capture(page);await page.waitForTimeout(12000);const after=await capture(page);
    verifyNovember(after,'after 12 seconds');assert.deepEqual(after.airlines,before.airlines,'delayed array preservation');assert.deepEqual(after.table,before.table,'delayed table preservation');
    await page.setViewportSize({width:390,height:844});
    await page.selectOption('#navCurr','KRW');await page.selectOption('#filterMonth','recent4');
    for(const code of Object.keys(expected)){await page.selectOption('#filterAirline',code);verifyNovember(await capture(page),'mobile '+code);}
    await page.selectOption('#filterAirline','YP');
    for(const lang of langs){await page.selectOption('#navLang',lang);const x=await capture(page);verifyNovember(x,'mobile '+lang+' YP');await verifyTooltip(page,x,'mobile '+lang+' last YP bar',true);}
    await page.selectOption('#navLang','ko');
    await page.mouse.move(0,0);await page.locator('#graphCanvas').screenshot({path:path.join(out,'yp-november-mobile.png')});
    await page.selectOption('#filterMonth','nov');await page.selectOption('#navCurr','USD');
    await page.locator('.graph-data-table').screenshot({path:path.join(out,'yp-november-table-mobile.png')});
    await page.selectOption('#navCurr','KRW');
    // A missing conversion rate cannot erase original USD notices or invent a
    // converted amount. Restore it before checking the normal path again.
    const rate=await page.evaluate(()=>{const value=RATES.USD;delete RATES.USD;drawChart();buildTable();return value;});
    const missing=await page.evaluate(()=>({points:_hitAreas.length,text:document.querySelector('#dataTableBody').innerText,label:tg('graph.rateUnavailable'),native:convertAmt(48,'USD'),nov:AIRLINES.find(a=>a.code==='YP').nov}));
    assert.equal(missing.points,0);assert.equal(missing.native,null);assert(missing.text.includes(missing.label));assert(missing.text.includes('($48)'));assert(!/NaN|Infinity/.test(missing.text));assert.deepEqual(missing.nov,expected.YP.values);
    await page.selectOption('#navCurr','USD');
    const native=await capture(page);assert.deepEqual(native.points.filter(p=>p.month==='nov').map(p=>p.value),[48,64,107,187,236,296],'native USD needs no FX rate');
    await page.evaluate(rate=>{RATES.USD=rate;drawChart();buildTable();},rate);verifyNovember(await capture(page),'restored conversion rate');
    assert.deepEqual(errors,[],'page JavaScript errors');report.pageErrors=errors;report.delayedSeconds=12;
    fs.writeFileSync(path.join(out,'verification.json'),JSON.stringify(report,null,2));
    console.log('PASS graph November: nine source notices, every band and null gap, six languages/nine currencies, table and drawn values, tooltip, filters, mobile, 12-second stability. '+out);
  }finally{if(browser)await browser.close();if(server)server.kill();}
})().catch(error=>{console.error(error);process.exitCode=1;});
