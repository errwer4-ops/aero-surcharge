const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path');
const stamp=process.argv.find(a=>a.startsWith('--stamp='))?.slice(8)||'2026-10-21T10:05:51+09:00';
(async()=>{
 const b=await chromium.launch(),p=await b.newPage();
 await p.route('**/*',r=>r.request().url().startsWith('http://localhost:4173')?r.continue():r.abort());
 for(const name of ['index','fuel-surcharge-calculator','fuel-surcharge-graph']){
  await p.goto('http://localhost:4173/'+name+'.html');await p.waitForTimeout(1100);
  const live=await p.evaluate(()=>({title:document.title,desc:document.querySelector('meta[name="description"]').content,
   schemas:[...document.querySelectorAll('script[type="application/ld+json"]')].map(x=>JSON.parse(x.textContent))}));
  const file=path.join(__dirname,'..','public',name+'.html'),text=fs.readFileSync(file,'utf8'),end=text.indexOf('</head>');
  let head=text.slice(0,end);
  head=head.replace(/<title>[\s\S]*?<\/title>/,()=>'<title>'+live.title+'</title>');
  head=head.replace(/(<meta\b[^>]*(?:name="description"|property="og:description")[^>]*content=")[^"]*(")/g,(_,a,z)=>a+live.desc+z);
  head=head.replace(/(<meta\b[^>]*property="og:title"[^>]*content=")[^"]*(")/g,(_,a,z)=>a+live.title+z);
  head=head.replace(/(<meta\b[^>]*property="article:modified_time"[^>]*content=")[^"]*(")/g,(_,a,z)=>a+stamp+z);
  head=head.replace(/(<script\b[^>]*type="application\/ld\+json"[^>]*>)([\s\S]*?)(<\/script>)/g,(all,a,body,z)=>{
   const d=JSON.parse(body);
   function update(x){
    if(!x||typeof x!=='object')return;
    if(Array.isArray(x)){x.forEach(update);return;}
    if(x['@graph'])update(x['@graph']);
    if(['WebPage','CollectionPage','FAQPage','WebApplication'].includes(x['@type'])){
     x.dateModified=stamp;x.inLanguage='ko';
     if(x['@type']==='FAQPage'){
      const faq=live.schemas.find(y=>y['@type']==='FAQPage');if(faq)x.mainEntity=faq.mainEntity;
     }else{x.name=live.title;x.description=live.desc;}
    }
   }
   update(d);return a+'\n'+JSON.stringify(d,null,2)+'\n'+z;
  });
  fs.writeFileSync(file,head+text.slice(end));
 }
 await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
