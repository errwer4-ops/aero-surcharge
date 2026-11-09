/* Reproduce a slow legacy update script without any external network requests. */
const assert = require('node:assert/strict');
const path = require('node:path');
const {spawn} = require('node:child_process');
const {chromium} = require('playwright');
const root = path.resolve(__dirname, '..');
const port = Number(process.env.NEWS_LOADING_TEST_PORT || 4212);
const base = `http://127.0.0.1:${port}`;

async function main() {
  const server = spawn(process.execPath, [path.join(__dirname, 'serve_local.js')], {
    cwd: root, env: {...process.env, PORT: String(port)}, stdio: ['ignore', 'pipe', 'pipe']
  });
  let browser;
  try {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Server start timeout')), 10000);
      server.stdout.on('data', data => {
        if (String(data).includes('Local review server')) { clearTimeout(timer); resolve(); }
      });
      server.on('error', error => { clearTimeout(timer); reject(error); });
      server.on('exit', code => { clearTimeout(timer); reject(new Error('Server exit ' + code)); });
    });
    browser = await chromium.launch({headless: true});
    const context = await browser.newContext({viewport: {width: 1280, height: 900}});
    await context.route('**/*', async route => {
      const url = route.request().url();
      if (!url.startsWith(base) || url.includes('/api/')) return route.abort();
      // Allows the older inline news renderer to publish its five chips before
      // the current renderer loads. A warm cache normally hides this race.
      if (url.includes('/aug28-update.js')) await new Promise(resolve => setTimeout(resolve, 1200));
      return route.continue();
    });
    const page = await context.newPage();
    await page.clock.setFixedTime(new Date('2026-11-04T00:00:00Z'));
    const errors = [];
    page.on('pageerror', error => errors.push(error.stack || error.message));
    await page.goto(base + '/news.html', {waitUntil: 'domcontentloaded'});
    await page.waitForTimeout(1800);
    assert.deepEqual(errors, [], 'slow script loading must not throw during the news update');
    for (const lang of ['ko', 'en', 'ja', 'zh', 'fr', 'de']) {
      await page.locator('#navLang').selectOption(lang);
      await page.waitForFunction(lang => {
        const box = document.getElementById('newsKeyVariables');
        const rows = window.AERO_MARKET_RELEASE && window.AERO_MARKET_RELEASE.rows[lang];
        if (!box || !rows) return false;
        const labels = Array.from(box.lastElementChild.children, el => el.textContent);
        return labels.length === 4 && [3, 2, 1, 0].every((row, i) => labels[i] === rows[row][0]);
      }, lang, {timeout: 5000});
    }
    await page.waitForTimeout(500);
    assert.deepEqual(errors, [], 'language changes must not restore stale chips or throw');
    console.log('PASS news slow loading: delayed legacy script, current four indicators, six languages, no page errors.');
  } finally {
    if (browser) await browser.close();
    server.kill();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
