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
const decemberReviewed = trust.manifest.filter(n => n.month === '2026.12' && n.status === 'source_reconciled');
assert.deepEqual(decemberReviewed.map(n=>n.airline).sort(),['BX','KE','OZ'],'only KE/OZ/BX December notices independently reviewed');
const decemberExpected = Object.fromEntries(decemberReviewed.map(n=>[n.airline,n]));
assert.equal(decemberExpected.KE.effectiveFrom,'2026-12-01');
assert.equal(decemberExpected.KE.effectiveTo,'2026-12-31');
assert.equal(decemberExpected.OZ.effectiveFrom,'2026-12-01');
assert.equal(decemberExpected.OZ.effectiveTo,'2026-12-16','Asiana notice must not extend through December 31');
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
        return {month,text:cell?.textContent||'',title:cell?.title||'',nullCell:!!cell?.querySelector('.null-cell'),number:number?Number(number):null};
      }),change:cells.at(-1)?.textContent};
    })}));
    const canvas=document.getElementById('graphCanvas'), ctx=canvas.getContext('2d'),dpr=window.devicePixelRatio||1,rect=canvas.getBoundingClientRect();
    return {airlines:AIRLINES.map(a=>({code:a.code,currency:a.currency,bands:a.bands,nov:a.nov,oct:a.oct,dec:a.dec,url:a.novemberNoticeUrl,decemberUrl:a.decemberNoticeUrl,ticketingStart:a.decemberTicketingStart,ticketingEnd:a.decemberTicketingEnd,archive:Object.fromEntries(['apr','may','june','july','aug','sep','oct'].map(m=>[m,a[m]]))})),
      points:_hitAreas.map(p=>({code:p.airline.code,month:p.month,band:p.bandIdx,original:p.origVal,value:p.displayVal,x:p.x,y:p.y,w:p.w,h:p.h,pixel:[...ctx.getImageData(Math.floor((p.x+p.w/2)*dpr),Math.floor((p.y+p.h/2)*dpr),1,1).data]})),
      table,monthKeys,filters:{...filterState},currency:SHARED_STATE.curr,rates:{...window.RATES},decimals:{...window.CURR_DEC},
      canvas:{internalWidth:canvas.width/dpr,internalHeight:canvas.height/dpr,displayWidth:rect.width,displayHeight:rect.height},
      novemberLabel:tg('graph.filter.nov'),noBand:tg('graph.noBand'),links:[...document.querySelectorAll('#officialLinks a')].map(a=>a.href),
      decemberLabel:tg('graph.filter.dec'),pendingDecember:tg('graph.pending.dec'),periods:{KE:tg('graph.period.dec.KE'),OZ:tg('graph.period.dec.OZ'),BX:tg('graph.period.dec.BX')},periodText:document.querySelector('#graphTablePeriod').textContent,
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
  near(x.canvas.displayWidth,x.canvas.internalWidth,label+' canvas display and drawing widths agree',0.500001);
  near(x.canvas.displayHeight,x.canvas.internalHeight,label+' canvas display and drawing heights agree',0.500001);
  assert.equal(x.overflow,false,label+' page overflow');
}

async function verifyTooltip(page,x,label,last=false){
  const hits=x.points.filter(p=>p.month==='nov'),hit=last?hits.at(-1):hits[0];assert(hit,label+' tooltip target');
  await page.locator('#graphCanvas').scrollIntoViewIfNeeded();
  const box=await page.locator('#graphCanvas').boundingBox();
  // Aim at the displayed bar, not an unscaled internal hit-test coordinate.
  await page.mouse.move(box.x+(hit.x+hit.w/2)*box.width/x.canvas.internalWidth,box.y+(hit.y+hit.h/2)*box.height/x.canvas.internalHeight);
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

function verifyDecember(x,label){
  verifySourceArrays(x,label);
  assert(x.monthKeys.includes('dec'),label+' December selected');
  for(const a of x.airlines){
    const n=decemberExpected[a.code];
    assert.deepEqual(a.dec,n?n.amounts:a.bands.map(()=>null),label+' '+a.code+' December bands match independent source or stay null');
    assert.equal(a.decemberUrl,n?n.sourceUrl:null,label+' December source URL');
    assert.equal(a.ticketingStart,n?n.effectiveFrom:null,label+' ticketing start');
    assert.equal(a.ticketingEnd,n?n.effectiveTo:null,label+' ticketing end');
    if(n)assert(x.links.includes(n.sourceUrl),label+' linked December source');
  }
  for(const group of x.table){
    const n=decemberExpected[group.code];
    group.rows.forEach((row,index)=>{
      const cell=row.months.find(m=>m.month==='dec');assert(cell,label+' December cell');
      if(!n){assert.equal(cell.number,null,label+' unverified December never inherits November/zero');assert.equal(norm(cell.text),norm(x.pendingDecember),label+' unverified notice is explicit');return;}
      assert.equal(cell.nullCell,false,label+' reviewed amount shown');
      near(cell.number,n.amounts[index]/x.rates[n.currency]*x.rates[x.currency],label+' December table amount',0.500001*10**(-(x.decimals[x.currency]??0)));
      assert.equal(cell.title,x.periods[group.code],label+' amount cell keeps ticketing period');
    });
  }
  const points=x.points.filter(p=>p.month==='dec'),codes=x.filters.airline==='all'?['BX','KE','OZ']:[x.filters.airline].filter(code=>decemberExpected[code]);
  assert.deepEqual([...new Set(points.map(p=>p.code))].sort(),codes.slice().sort(),label+' only confirmed December airlines drawn');
  points.forEach(p=>{
    const n=decemberExpected[p.code],raw=p.band===null?average(n.amounts):n.amounts[p.band];
    near(p.original,raw,label+' source December bar');near(p.value,raw/x.rates[n.currency]*x.rates[x.currency],label+' converted December bar');
    assert(p.w>0&&p.h>0&&p.pixel[3]>0,label+' December bar has pixels');
  });
  if(x.filters.airline==='all'||x.filters.airline==='OZ'){
    assert(x.periodText.includes(x.periods.OZ),label+' Asiana limited period is visible beside table');
    assert(/16/.test(x.periods.OZ)&&/17/.test(x.periods.OZ),label+' Asiana December 16 limit and December 17 integration retained');
  }
  assert.equal(x.overflow,false,label+' page overflow');
}

async function verifyDecemberTooltip(page,x,label){
  const hit=x.points.find(p=>p.month==='dec'&&p.code==='OZ');assert(hit,label+' Asiana December tooltip target');
  await page.locator('#graphCanvas').scrollIntoViewIfNeeded();const box=await page.locator('#graphCanvas').boundingBox();
  await page.mouse.move(box.x+(hit.x+hit.w/2)*box.width/x.canvas.internalWidth,box.y+(hit.y+hit.h/2)*box.height/x.canvas.internalHeight);
  const text=norm(await page.locator('#graphTooltip').innerText());
  assert(text.includes(norm(x.decemberLabel)),label+' tooltip identifies December');
  assert(text.includes(norm(x.periods.OZ)),label+' tooltip shows December 16 limit and integration condition');
  assert(text.includes(hit.value.toLocaleString('en-US',{minimumFractionDigits:x.decimals[x.currency]??0,maximumFractionDigits:x.decimals[x.currency]??0})),label+' tooltip amount');
  const bounds=await page.locator('#graphTooltip').boundingBox(),size=page.viewportSize();
  assert(bounds.x>=0&&bounds.x+bounds.width<=size.width,label+' tooltip fits viewport');
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
    await page.route('**/*',route=>{
      const url=new URL(route.request().url());
      return url.origin===origin&&!url.pathname.startsWith('/api/')?route.continue():route.abort();
    });
    await page.goto(origin+'/fuel-surcharge-graph.html');await page.waitForTimeout(1400);
    const deny=page.locator('#aeroConsentDeny');if(await deny.isVisible())await deny.click();
    const initial=await capture(page);assert.equal(initial.canonical,'https://aero-surcharge.com/fuel-surcharge-graph');
    assert.equal(await page.locator('#graphDataDetails').getAttribute('open'),null,'detailed data starts collapsed');
    report.currencySelectorOptions=await page.locator('#navCurr option').evaluateAll(options=>options.map(option=>option.value));
    assert.deepEqual([...report.currencySelectorOptions].sort(),[...currencies].sort(),'nine real currency options');
    assert.deepEqual(initial.monthKeys,['sep','oct','nov','dec']);verifyNovember(initial,'initial recent four');verifyDecember(initial,'initial December');
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
    for(const [filter,months] of [['recent4',['sep','oct','nov','dec']],['all',['apr','may','june','july','aug','sep','oct','nov','dec']],['nov',['nov']]]){
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
    const dataToggle=page.locator('#graphDataDetails > summary');
    await dataToggle.focus();await dataToggle.press('Enter');
    assert.notEqual(await page.locator('#graphDataDetails').getAttribute('open'),null,'detailed data opens by keyboard');
    assert(await page.locator('.graph-data-table').isVisible(),'expanded data table is visible');
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
    await page.setViewportSize({width:320,height:844});
    await page.selectOption('#navCurr','KRW');await page.selectOption('#filterAirline','all');await page.selectOption('#filterMonth','all');
    const narrow=await capture(page);verifyNovember(narrow,'320px all airlines/all months');
    assert.deepEqual(narrow.monthKeys,['apr','may','june','july','aug','sep','oct','nov','dec'],'narrow chart keeps all nine months');
    const ordered=narrow.points.slice().sort((a,b)=>a.x-b.x);
    ordered.forEach((point,i)=>{
      assert(point.x>=0&&point.x+point.w<=narrow.canvas.internalWidth,'narrow bar stays within the canvas');
      if(i)assert(ordered[i-1].x+ordered[i-1].w<=point.x+1e-7,'320px adjacent month/airline bars do not overlap');
    });
    const narrowLabels=await page.evaluate(()=>{
      const ctx=document.getElementById('graphCanvas').getContext('2d'),original=ctx.fillText,labels=[];
      ctx.fillText=function(text,x,y){
        if(AIRLINES.some(airline=>airline.code===text))labels.push({text,x,y,width:this.measureText(text).width});
        return original.apply(this,arguments);
      };
      try{drawChart();}finally{ctx.fillText=original;}
      return labels;
    });
    assert.equal(narrowLabels.length,9,'320px axis labels retain every airline');
    narrowLabels.forEach((label,i)=>narrowLabels.slice(i+1).forEach(other=>{
      if(Math.abs(label.y-other.y)<13)assert(Math.abs(label.x-other.x)>=(label.width+other.width)/2,'320px airline labels do not overlap');
    }));
    report.narrowChart={width:320,months:narrow.monthKeys.length,airlines:narrow.airlines.length,bars:ordered.length,canvas:narrow.canvas};
    await page.setViewportSize({width:1440,height:1000});await page.selectOption('#filterMonth','dec');
    for(const lang of langs){
      await page.selectOption('#navLang',lang);
      for(const currency of currencies){await chooseCurrency(page,currency);await page.selectOption('#filterAirline','all');verifyDecember(await capture(page),`${lang}/${currency}/December`);}
      await chooseCurrency(page,'KRW');
      for(const code of Object.keys(expected)){await page.selectOption('#filterAirline',code);verifyDecember(await capture(page),lang+'/December/'+code);}
      await page.selectOption('#filterAirline','OZ');await verifyDecemberTooltip(page,await capture(page),lang+'/December/desktop');
      await page.setViewportSize({width:390,height:844});verifyDecember(await capture(page),lang+'/December/mobile');await verifyDecemberTooltip(page,await capture(page),lang+'/December/mobile');
      await page.setViewportSize({width:1440,height:1000});
      console.log('PASS December notices, missing values and Asiana ticketing period: '+lang);
    }
    await page.selectOption('#navLang','ko');await page.selectOption('#filterAirline','all');await page.selectOption('#filterMonth','recent4');
    const decemberBefore=await capture(page);verifyDecember(decemberBefore,'December before delay');
    await page.waitForTimeout(12000);const decemberAfter=await capture(page);verifyDecember(decemberAfter,'December after 12 seconds');assert.deepEqual(decemberAfter.airlines,decemberBefore.airlines,'December arrays remain stable');assert.deepEqual(decemberAfter.table,decemberBefore.table,'December table remains stable');
    await page.selectOption('#filterView','change');
    const decemberChanges=await capture(page);assert.deepEqual(decemberChanges.points.map(p=>p.code).sort(),['BX','KE','OZ'],'only confirmed December changes drawn');
    decemberChanges.points.forEach(p=>near(p.value,(average(decemberExpected[p.code].amounts)-average(expected[p.code].values))/average(expected[p.code].values)*100,'December versus November source comparison'));
    await page.selectOption('#filterView','amount');await page.mouse.move(0,0);await page.locator('#graphCanvas').screenshot({path:path.join(out,'december-desktop.png')});
    await page.setViewportSize({width:390,height:844});await page.selectOption('#filterAirline','OZ');verifyDecember(await capture(page),'Asiana December mobile final');await page.locator('#graphCanvas').screenshot({path:path.join(out,'asiana-december-mobile.png')});
    report.december={reviewed:['BX','KE','OZ'],sourceAmounts:22,unverifiedAirlines:6,asianaTicketingEnd:'2026-12-16',languages:langs,currencies,delayedSeconds:12};
    assert.deepEqual(errors,[],'page JavaScript errors');report.pageErrors=errors;report.delayedSeconds=12;
    fs.writeFileSync(path.join(out,'verification.json'),JSON.stringify(report,null,2));
    console.log('PASS graph November archive and December: nine November notices preserved; three December notices, six null airlines, Asiana December 16/17 distinction; six languages/nine currencies, table/chart/tooltip, mobile, 320px and 12-second stability. '+out);
  }finally{if(browser)await browser.close();if(server)server.kill();}
})().catch(error=>{console.error(error);process.exitCode=1;});
