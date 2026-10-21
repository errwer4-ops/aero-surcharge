const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'../public');
let scripts=0,schemas=0;
for(const name of fs.readdirSync(root)){
  if(!/\.(html|js)$/.test(name))continue;
  const source=fs.readFileSync(path.join(root,name),{encoding:'utf8',flag:'r'});
  if(name.endsWith('.js')){new vm.Script(source,{filename:name});scripts++;}
  if(!name.endsWith('.html'))continue;
  let i=0;
  for(const match of source.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)){
    i++;const attrs=match[1],body=match[2];
    if(/\bsrc\s*=/i.test(attrs))continue;
    const type=attrs.match(/\btype\s*=\s*["']([^"']+)["']/i)?.[1];
    if(type==='application/ld+json'){JSON.parse(body);schemas++;}
    else if(!type || /^(text|application)\/javascript$/i.test(type)){new vm.Script(body,{filename:name+':script'+i});scripts++;}
  }
}
console.log(`PASS: ${scripts} JavaScript sources and ${schemas} JSON-LD documents parse.`);
