const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..', 'public');
// Read the release through its public contract instead of duplicating FAQ copy.
const window = {AERO_MARKET_RELEASE:{packs:{},rows:{},newsCards:[]}};
for (const l of ['ko','en','ja','zh','fr','de']) window.AERO_MARKET_RELEASE.packs[l]={th:[],ui:[]};
vm.runInNewContext(fs.readFileSync(path.join(root,'market-oct19.js'),'utf8'),{window});
if (process.argv.includes('--oct21')) vm.runInNewContext(fs.readFileSync(path.join(root,'market-oct21.js'),'utf8'),{window});
const r=window.AERO_MARKET_RELEASE,p=r.packs.ko;
for (const file of ['forecast.html','news.html']) {
  const target=path.join(root,file);
  let text=fs.readFileSync(target,'utf8');
  const end=text.indexOf('</head>');
  let head=text.slice(0,end);
  head=head.replace(/<title>[\s\S]*?<\/title>/,`<title>${p.title}</title>`);
  head=head.replace(/(<meta\b[^>]*(?:name="description"|property="og:description")[^>]*content=")[^"]*(")/g,`$1${p.desc}$2`);
  head=head.replace(/(<meta\b[^>]*property="og:title"[^>]*content=")[^"]*(")/g,`$1${p.title}$2`);
  head=head.replace(/(<meta\b[^>]*property="article:modified_time"[^>]*content=")[^"]*(")/g,`$1${r.modified}$2`);
  head=head.replace(/(<script\b[^>]*type="application\/ld\+json"[^>]*>)([\s\S]*?)(<\/script>)/g,(all,open,body,close)=>{
    const data=JSON.parse(body);
    if(data['@type']!=='FAQPage'&&!(file==='news.html'&&data['@type']==='CollectionPage'))return all;
    data.dateModified=r.modified;data.inLanguage='ko';
    if(file==='news.html'){
      // News has no visible FAQ section; describe the collection, not hidden questions.
      data['@type']='CollectionPage';data['@id']='https://aero-surcharge.com/news.html';
      data.headline=p.newsTitle;data.description=p.desc;delete data.mainEntity;
    }else data.mainEntity=p.faq.map(x=>({'@type':'Question',name:x.q,acceptedAnswer:{'@type':'Answer',text:x.a}}));
    return open+'\n'+JSON.stringify(data,null,2)+'\n'+close;
  });
  fs.writeFileSync(target,head+text.slice(end));
}
