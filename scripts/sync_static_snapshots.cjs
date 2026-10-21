/* Reuse the existing renderer; preserve scripts, inputs and interactive nodes.
 * node scripts/sync_static_snapshots.cjs [--write] [--pages=index,news,...]
 * Run after notice validation. No date or financial value is generated here.
 */
const fs=require('node:fs'), path=require('node:path'), {spawn}=require('node:child_process');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'), write=process.argv.includes('--write');
const pagesArg=process.argv.find(a=>a.startsWith('--pages='));
const names=pagesArg?pagesArg.slice(8).split(','):['index','airlines','news','forecast','fuel-surcharge-calculator','fuel-surcharge-graph','fuel-surcharge-2026-05','fuel-surcharge-korea','fuel-surcharge-korean-air','fuel-surcharge-asiana','fuel-surcharge-jejuair','fuel-surcharge-jinair','fuel-surcharge-tway'];
const port=Number(process.env.AERO_SNAPSHOT_PORT||4196), origin=`http://127.0.0.1:${port}`;
const escapeHtml=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const attr=(s,name)=>(s.match(new RegExp('\\b'+name+'\\s*=\\s*["\']([^"\']+)["\']','i'))||[])[1];
function candidates(html){
  // Source offsets avoid reserializing/reformatting existing scripts and markup.
  const tokens=/<!--[\s\S]*?-->|<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>|<\/?([a-zA-Z][\w:-]*)\b[^>]*>/g;
  const stack=[], found=[]; let m;
  while((m=tokens.exec(html))){
    if(!m[2])continue;
    const tag=m[2].toLowerCase(),close=m[0].startsWith('</');
    if(close){
      let i=stack.length-1;while(i>=0&&stack[i].tag!==tag)i--;
      if(i<0)continue;
      const node=stack[i];stack.length=i;
      if(!node.selector)continue;
      const content=html.slice(node.start,m.index);
      if(/<(?:script|style|input|select|button|form|canvas)\b|\bonclick\s*=/i.test(content))continue;
      found.push({...node,end:m.index,content});
    }else if(!/^(?:area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/.test(tag)&&!m[0].endsWith('/>')){
      const id=attr(m[0],'id'),key=attr(m[0],'data-i18n')||attr(m[0],'data-i18n-html');
      let selector=id?'[id='+JSON.stringify(id)+']':key?'['+(attr(m[0],'data-i18n')?'data-i18n':'data-i18n-html')+'='+JSON.stringify(key)+']':null;
      // The FAQ is editorial copy. All calculator results, conditions and saved state stay excluded.
      if(!/^(?:div|p|span|h1|h2|h3|h4|a|section|thead|tbody|tr|td|th|ul|ol|li|strong)$/.test(tag)||(id!=='calculatorFaq'&&/nav|search|result|saved|privacy|consent|modal|toast|filter|calc|affiliate|saving/i.test(id||''))||/^(?:nav|affiliate|footer)\./.test(key||''))selector=null;
      stack.push({tag,selector,start:tokens.lastIndex});
    }
  }
  return found;
}
async function main(){
  const server=spawn(process.execPath,[path.join(__dirname,'serve_local.js')],{cwd:root,env:{...process.env,PORT:String(port)},stdio:['ignore','pipe','pipe']});
  let browser;
  try{
    await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error('Local server startup timeout')),10000);server.stdout.on('data',x=>{if(String(x).includes('Local review server')){clearTimeout(timer);resolve();}});server.on('error',reject);});
    browser=await chromium.launch({headless:true});
    const context=await browser.newContext();
    await context.route('**/*',r=>r.request().url().startsWith(origin+'/')&&!r.request().url().includes('/api/')?r.continue():r.abort());
    let differences=0;
    for(const name of names){
      if(!/^[a-z0-9-]+$/.test(name))throw new Error('Invalid page name: '+name);
      const file=path.join(root,'public',name+'.html'),source=fs.readFileSync(file,'utf8'),nodes=candidates(source);
      const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
      await page.goto(origin+'/'+name+'.html',{waitUntil:'domcontentloaded'});await page.waitForTimeout(4600);
      if(errors.length)throw new Error(name+': '+errors.join('; '));
      const live=await page.evaluate(selectors=>({title:document.title,description:document.querySelector('meta[name="description"]')?.content,
        nodes:selectors.map(s=>{const el=document.querySelector(s);if(!el||el.closest('#aeroPrivacy,[data-personalized]')||el.querySelector('input,select,button,form,canvas,script,style,[onclick]'))return null;return el.innerHTML;}),
        schemas:[...document.querySelectorAll('head script[type="application/ld+json"]')].map(e=>({id:e.id,json:JSON.parse(e.textContent)}))
      }),nodes.map(n=>n.selector));
      const changes=nodes.map((n,i)=>({...n,value:live.nodes[i]})).filter(n=>n.value!==null&&n.value!==n.content).sort((a,b)=>a.start-b.start||b.end-a.end);
      const selected=[];for(const n of changes)if(!selected.some(p=>p.start<=n.start&&p.end>=n.end))selected.push(n);
      let updated=source;for(const n of selected.sort((a,b)=>b.start-a.start))updated=updated.slice(0,n.start)+n.value+updated.slice(n.end);
      const end=updated.indexOf('</head>');let head=updated.slice(0,end);
      head=head.replace(/<title>[\s\S]*?<\/title>/,()=>'<title>'+escapeHtml(live.title)+'</title>');
      head=head.replace(/(<meta\b[^>]*(?:name="description"|property="og:description"|name="twitter:description")[^>]*content=")[^"]*(")/g,(_,a,z)=>a+escapeHtml(live.description)+z);
      head=head.replace(/(<meta\b[^>]*(?:property="og:title"|name="twitter:title")[^>]*content=")[^"]*(")/g,(_,a,z)=>a+escapeHtml(live.title)+z);
      head=head.replace(/(<script\b[^>]*type="application\/ld\+json"[^>]*>)([\s\S]*?)(<\/script>)/g,(all,a,body,z)=>{
        const original=JSON.parse(body),id=attr(a,'id');
        const matching=live.schemas.find(s=>id?s.id===id:s.json['@id']&&s.json['@id']===original['@id'])||live.schemas.find(s=>s.json['@type']===original['@type']);
        return matching?a+'\n'+JSON.stringify(matching.json,null,2).replace(/</g,'\\u003c')+'\n'+z:all;
      });
      if(!/name="twitter:card"/.test(head))head+='  <meta name="twitter:card" content="summary"/>\n  <meta name="twitter:title" content="'+escapeHtml(live.title)+'"/>\n  <meta name="twitter:description" content="'+escapeHtml(live.description)+'"/>\n';
      updated=head+updated.slice(end);
      if(updated!==source){differences++;if(write)fs.writeFileSync(file,updated);}
      console.log(name+': '+selected.length+' content snapshots; '+(updated===source?'in sync':write?'updated':'DIFF'));
      await page.close();
    }
    if(!write&&differences)process.exitCode=1;
  }finally{if(browser)await browser.close();server.kill();}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
