// Idempotent migration: consolidate GA4/affiliate handlers, preserving page scripts.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname,'../public');
const selected=process.argv.slice(2);
for (const file of fs.readdirSync(root).filter(x=>x.endsWith('.html')&&(!selected.length||selected.includes(x)))) {
  const full=path.join(root,file);
  let html=fs.readFileSync(full,'utf8');
  if(!/<head[\s>]/i.test(html)||!/<body[\s>]/i.test(html))continue;
  html=html.replace(/\s*<script\b[^>]*src=["']https:\/\/www\.googletagmanager\.com\/gtag\/js[^"']*["'][^>]*><\/script>/g,'');
  html=html.replace(/\s*<script>(?:(?!<\/script>)[\s\S])*?gtag\(['"]config['"],\s*['"]G-76T4QJPY4L['"]\);\s*<\/script>/g,'');
  html=html.replace(/<script\b[^>]*src=["']https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js[^"']*["'][^>]*><\/script>/g,'<script src="_ads.js" defer></script>');
  html=html.replace(/\s+onclick="if\(window\.gtag\)\{gtag\('event','affiliate_click',\{affiliate:'([^']+)',placement:'([^']+)'\}\);\}"/g,' data-analytics-placement="$2"');
  if(!html.includes('src="_analytics.js"'))html=html.replace(/<head>/,'<head>\n  <script src="_analytics-config.js"></script>\n  <script src="_analytics.js"></script>');
  html=html.replace(/href="\/favicon-v2\.ico"/g,'href="/favicon-v2.png"');
  html=html.replace(/<input\b(?![^>]*data-clarity-mask)/g,'<input data-clarity-mask="true"');
  fs.writeFileSync(full,html);
}
console.log('Centralized analytics and consent-aware ad tags installed.');
