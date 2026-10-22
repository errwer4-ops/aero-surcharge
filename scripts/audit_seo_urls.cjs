/* Check canonical URLs against the existing Vercel cleanUrls policy.
 * node scripts/audit_seo_urls.cjs [--browser] [--pages=news,forecast] [--live]
 * --live is an observational, unauthenticated production GET audit, never deployment.
 * --report=docs/review-evidence/file.json saves nonsecret evidence when requested.
 */
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const site = 'https://aero-surcharge.com';
const args = process.argv.slice(2);
const report = { checkedAt: new Date().toISOString(), policy: {}, static: [], runtime: [], live: [], errors: [], limitations: [] };
const attr = (tag, name) => (tag.match(new RegExp('\\b' + name + '\\s*=\\s*["\']([^"\']*)["\']', 'i')) || [])[1];
const canonicalFor = file => site + (file === 'index.html' ? '/' : '/' + file.replace(/\.html$/, ''));
function tags(html, pattern, attribute) { return [...html.matchAll(pattern)].map(match => attr(match[0], attribute)); }
function schemaUrls(value, found = []) {
  if (typeof value === 'string' && value.startsWith(site + '/')) found.push(value);
  else if (Array.isArray(value)) value.forEach(item => schemaUrls(item, found));
  else if (value && typeof value === 'object') Object.values(value).forEach(item => schemaUrls(item, found));
  return found;
}
function isClean(value) {
  try { const u = new URL(value); return u.origin === site && !/\.html$|\/index$/.test(u.pathname) && (u.pathname === '/' || !u.pathname.endsWith('/')); }
  catch (_) { return false; }
}
function readMeta(html) {
  const head = html.split(/<\/head>/i)[0];
  const schemas = [...head.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(match => JSON.parse(match[1]));
  return {
    canonical: tags(head, /<link\b[^>]*rel=["']canonical["'][^>]*>/gi, 'href'),
    ogUrl: tags(head, /<meta\b[^>]*property=["']og:url["'][^>]*>/gi, 'content'),
    schemaUrls: schemaUrls(schemas)
  };
}
function checkMeta(label, data, expected) {
  if (data.canonical.length !== 1 || data.canonical[0] !== expected) report.errors.push(label + ': canonical must be ' + expected);
  if (data.ogUrl.length !== 1 || data.ogUrl[0] !== expected) report.errors.push(label + ': og:url must match canonical');
  for (const url of data.schemaUrls) if (!isClean(url)) report.errors.push(label + ': noncanonical JSON-LD URL ' + url);
}
function staticAudit() {
  const config = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
  report.policy = { cleanUrls: config.cleanUrls, trailingSlash: config.trailingSlash };
  if (config.cleanUrls !== true || config.trailingSlash !== false) report.errors.push('Vercel cleanUrls/trailingSlash policy changed; review URL expectations before publishing');
  for (const rule of config.redirects || []) {
    if (!rule.destination.startsWith('/') || !isClean(site + rule.destination)) report.errors.push('Redirect target is not terminal canonical path: ' + rule.source + ' -> ' + rule.destination);
    const destinationFile = rule.destination === '/' ? 'index.html' : rule.destination.slice(1).replace(/\.html$/, '') + '.html';
    if (!fs.existsSync(path.join(root, 'public', destinationFile))) report.errors.push('Redirect destination file missing: ' + rule.destination);
  }
  const sitemap = fs.readFileSync(path.join(root, 'public/sitemap.xml'), 'utf8');
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  if (new Set(urls).size !== urls.length) report.errors.push('Sitemap contains duplicate URLs');
  for (const url of urls) if (!isClean(url)) report.errors.push('Sitemap URL is not canonical: ' + url);
  const canonicalUrls = new Set();
  const runtimeFiles = new Set();
  for (const file of fs.readdirSync(path.join(root, 'public')).filter(file => file.endsWith('.html'))) {
    const html = fs.readFileSync(path.join(root, 'public', file), 'utf8');
    // Search-engine ownership tokens are plain text files, not content pages.
    if (!/<head\b/i.test(html) || /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) continue;
    const expected = canonicalFor(file);
    try {
      const metadata = readMeta(html);
      checkMeta(file, metadata, expected);
      canonicalUrls.add(expected);
      report.static.push({ file, expected, ...metadata });
    } catch (error) { report.errors.push(file + ': ' + error.message); }
    for (const match of html.matchAll(/<script\b[^>]*src=["']([^"']+)["'][^>]*>/gi)) {
      const src = match[1].split('?')[0];
      if (/^[\w-]+\.js$/.test(src)) runtimeFiles.add(src);
    }
    // Runtime strings in inline renderers must not reintroduce the old self URL.
    if (/https:\/\/aero-surcharge\.com\/[\w-]+\.html\b/.test(html)) report.errors.push(file + ': runtime/static absolute .html self URL remains');
  }
  for (const src of runtimeFiles) {
    const code = fs.readFileSync(path.join(root, 'public', src), 'utf8');
    if (/https:\/\/aero-surcharge\.com\/[\w-]+\.html\b/.test(code) || /aero-surcharge\.com\/['"]\s*\+[^\n]+['"]\.html/.test(code)) report.errors.push(src + ': runtime absolute .html self URL remains');
  }
  for (const url of urls) if (!canonicalUrls.has(url)) report.errors.push('Sitemap URL lacks matching indexable page canonical: ' + url);
  report.sitemapCount = urls.length;
  return urls;
}
async function runtimeAudit(urls) {
  const { chromium } = require('playwright');
  const port = Number(process.env.AERO_URL_AUDIT_PORT || 4197), origin = 'http://127.0.0.1:' + port;
  const pagesArg = args.find(arg => arg.startsWith('--pages='));
  const chosen = pagesArg ? pagesArg.slice(8).split(',').map(name => canonicalFor(name + '.html')) : urls;
  if (chosen.some(url => !urls.includes(url))) throw new Error('Runtime pages must be existing sitemap entries');
  const server = spawn(process.execPath, [path.join(__dirname, 'serve_local.js')], { cwd: root, env: { ...process.env, PORT: String(port) }, stdio: ['ignore', 'pipe', 'pipe'] });
  let browser;
  try {
    await new Promise((resolve, reject) => { const timer = setTimeout(() => reject(new Error('Local server startup timeout')), 10000); server.stdout.on('data', text => { if (String(text).includes('Local review server')) { clearTimeout(timer); resolve(); } }); server.on('error', reject); });
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    await context.route('**/*', route => route.request().url().startsWith(origin + '/') && !route.request().url().includes('/api/') ? route.continue() : route.abort());
    for (const url of chosen) {
      const pathname = new URL(url).pathname;
      const page = await context.newPage();
      page.on('pageerror', error => report.errors.push(pathname + ': ' + error.message));
      await page.goto(origin + pathname, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(4700);
      for (const phase of ['settled', 'delayed']) {
        if (phase === 'delayed') await page.waitForTimeout(700);
        const data = readMeta(await page.content());
        checkMeta(pathname + ' ' + phase, data, url);
        report.runtime.push({ pathname, phase, ...data });
      }
      await page.close();
    }
  } finally { if (browser) await browser.close(); server.kill(); }
  report.limitations.push('Local server serves extensionless files but does not emulate Vercel redirects; real redirect observations are separate. External services and API calls were blocked during browser checks.');
}
async function liveAudit() {
  const paths = ['/index.html', '/airlines.html', '/fuel-surcharge-calculator.html', '/news.html', '/forecast.html', '/fuel-surcharge-forecast.html', '/fuel-surcharge-2026-06-forecast.html'];
  for (const pathname of paths) {
    const item = { requested: site + pathname, hops: [] };
    let url = item.requested;
    try {
      for (let i = 0; i < 6; i++) {
        const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(15000) });
        const location = response.headers.get('location');
        item.hops.push({ url, status: response.status, location });
        if (response.status >= 300 && response.status < 400 && location) {
          await response.body?.cancel();
          url = new URL(location, url).href;
          if (new URL(url).origin !== site) throw new Error('Unexpected external redirect; stopped');
          continue;
        }
        item.finalUrl = url;
        const html = await response.text();
        item.metadata = readMeta(html);
        item.publicScriptSignals = {
          directAdSenseTag: /<script\b[^>]*src=["'][^"']*pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/i.test(html),
          ga4Tag: /googletagmanager\.com\/gtag\/js/.test(html),
          clarityTag: /clarity\.ms\/tag\//.test(html),
          cmpMarker: /__tcfapi|fundingchoicesmessages|googlefc\.|consentmanager|cookiebot/i.test(html),
          localPlatformConfigTag: /src=["']_analytics-config\.js/.test(html)
        };
        item.canonicalMatchesFinal = item.metadata.canonical.length === 1 && item.metadata.canonical[0] === url;
        break;
      }
      if (!item.finalUrl) item.error = 'Redirect limit exceeded';
    } catch (error) { item.error = error.message; }
    report.live.push(item);
  }
  report.limitations.push('Live results describe the currently deployed site, which this task does not modify. A stale deployed canonical is reported without implying the local fix is deployed.');
}
async function main() {
  const urls = staticAudit();
  if (args.includes('--browser')) await runtimeAudit(urls);
  if (args.includes('--live')) await liveAudit();
}
main().catch(error => report.errors.push(error.stack || error.message)).finally(() => {
  report.localPassed = report.errors.length === 0;
  report.liveStatus = !args.includes('--live') ? 'not_requested' : report.live.length && report.live.every(item => !item.error && item.hops.at(-1)?.status === 200) ? 'complete' : 'incomplete';
  report.liveCanonicalMatchesFinal = report.liveStatus === 'complete' ? report.live.every(item => item.canonicalMatchesFinal) : null;
  report.passed = report.localPassed && report.liveStatus !== 'incomplete' && report.liveCanonicalMatchesFinal !== false;
  const targetArg = args.find(arg => arg.startsWith('--report='));
  if (targetArg) {
    const target = path.resolve(root, targetArg.slice(9));
    if (!['docs/review-evidence','artifacts/review-verification'].some(dir=>target.startsWith(path.join(root,dir)+path.sep))) throw new Error('Evidence must stay in the designated review directories');
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, JSON.stringify(report, null, 2) + '\n');
  }
  console.log(JSON.stringify({ checkedAt: report.checkedAt, passed: report.passed, localPassed: report.localPassed, staticPages: report.static.length, sitemapCount: report.sitemapCount, runtimeSamples: report.runtime.length, liveRequests: report.live.length, liveStatus: report.liveStatus, liveCanonicalMatchesFinal: report.liveCanonicalMatchesFinal, errors: report.errors }, null, 2));
  if (!report.passed) process.exitCode = 1;
});
