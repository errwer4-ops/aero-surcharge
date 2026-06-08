const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..', 'public');
const reportPath = path.resolve(__dirname, '..', 'docs', 'audit', 'locale-currency-audit.json');
const languages = ['ko', 'en', 'ja', 'zh', 'fr', 'de'];
const currencies = ['KRW', 'USD', 'JPY', 'EUR'];
const pages = fs.readdirSync(root)
  .filter((name) => name.endsWith('.html'))
  .filter((name) => !/^(google|naver)/.test(name))
  .sort();

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

function serveFile(req, res) {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  const rel = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');
  const file = path.resolve(root, rel);
  if (!file.startsWith(root)) {
    res.writeHead(403).end('Forbidden');
    return;
  }
  fs.readFile(file, (error, data) => {
    if (error) {
      res.writeHead(404).end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
}

async function snapshot(page) {
  return page.evaluate(() => {
    const visible = (el) => {
      const style = getComputedStyle(el);
      return style.display !== 'none' && style.visibility !== 'hidden';
    };
    const bodyText = (document.body.innerText || '').replace(/\s+/g, ' ').trim();
    const koreanChars = (bodyText.match(/[가-힣]/g) || []).length;
    const mojibakeTokens = (bodyText.match(/[?�]{2,}|(?:留|怨|援|좊|쒖|뺣|섏|났|몄|댁|媛|諛|湲|愿|쎄|寃|곗|룰|퀎)/g) || []).length;
    const translated = Array.from(document.querySelectorAll('[data-i18n],[data-i18n-html]'))
      .filter(visible)
      .map((el) => ({
        key: el.getAttribute('data-i18n') || el.getAttribute('data-i18n-html'),
        text: (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim()
      }));
    const missing = translated
      .filter(({ key }) => typeof window.t === 'function' && window.t(key) === key)
      .map(({ key }) => key);
    const amounts = bodyText.match(/(?:₩|\$|¥|€)\s?[\d,.]+|[\d,.]+\s?(?:원|KRW|USD|JPY|EUR)/g) || [];
    return {
      htmlLang: document.documentElement.lang,
      title: document.title,
      bodyText,
      koreanChars,
      mojibakeTokens,
      dataI18nCount: translated.length,
      missingKeys: [...new Set(missing)],
      amounts: [...new Set(amounts)].slice(0, 40),
      langValue: document.getElementById('navLang')?.value || null,
      currValue: document.getElementById('navCurr')?.value || null,
      sharedLang: window.SHARED_STATE?.lang || null,
      sharedCurr: window.SHARED_STATE?.curr || null
    };
  });
}

async function setSelect(page, id, value) {
  const selector = `#${id}`;
  if (!(await page.locator(selector).count())) return false;
  const values = await page.locator(`${selector} option`).evaluateAll((options) => options.map((option) => option.value));
  if (!values.includes(value)) return false;
  await page.selectOption(selector, value);
  await page.waitForTimeout(250);
  return true;
}

async function prepareMonetaryView(page, name) {
  if (name === 'index.html') {
    await page.waitForFunction(() => document.querySelectorAll('#originSelect option[value]').length > 1);
    await page.selectOption('#originSelect', 'ICN', { force: true });
    await page.selectOption('#destSelect', 'NRT', { force: true });
    await page.click('#searchBtn');
    await page.waitForTimeout(500);
  }
  if (name === 'fuel-surcharge-calculator.html') {
    await page.waitForFunction(() => document.querySelectorAll('#savingOrigin option[value]').length > 1);
    await page.selectOption('#savingOrigin', 'ICN', { force: true });
    await page.locator('#savingOrigin').dispatchEvent('change');
    await page.waitForFunction(() => Array.from(document.querySelectorAll('#savingDestination option')).some((option) => option.value === 'NRT'));
    await page.selectOption('#savingDestination', 'NRT', { force: true });
    await page.locator('#savingDestination').dispatchEvent('change');
    await page.click('#savingCalcBtn');
    await page.waitForTimeout(500);
  }
}

async function main() {
  const server = http.createServer(serveFile);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const browser = await chromium.launch({ headless: true });
  const results = [];

  try {
    for (const name of pages) {
      const context = await browser.newContext();
      const page = await context.newPage();
      const consoleErrors = [];
      const pageErrors = [];
      page.on('console', (message) => {
        if (message.type() === 'error') consoleErrors.push(message.text());
      });
      page.on('pageerror', (error) => pageErrors.push(error.message));
      await page.goto(`http://127.0.0.1:${port}/${name}`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(800);
      const baseline = await snapshot(page);
      const availableLanguages = baseline.langValue === null
        ? []
        : await page.locator('#navLang option').evaluateAll((options) => options.map((option) => option.value));
      const availableCurrencies = baseline.currValue === null
        ? []
        : await page.locator('#navCurr option').evaluateAll((options) => options.map((option) => option.value));
      const languageResults = {};

      for (const lang of languages) {
        if (lang !== baseline.langValue) await setSelect(page, 'navLang', lang);
        languageResults[lang] = await snapshot(page);
      }

      await page.evaluate(() => {
        localStorage.setItem('aero_lang', 'ko');
        localStorage.setItem('aero_curr', 'KRW');
      });
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(800);
      await prepareMonetaryView(page, name);
      const currencyResults = {};
      for (const curr of currencies) {
        await setSelect(page, 'navCurr', curr);
        currencyResults[curr] = await snapshot(page);
      }

      results.push({
        page: name,
        hasLanguageSelector: baseline.langValue !== null,
        hasCurrencySelector: baseline.currValue !== null,
        availableLanguages,
        availableCurrencies,
        baseline,
        languages: languageResults,
        currencies: currencyResults,
        consoleErrors: [...new Set(consoleErrors)],
        pageErrors: [...new Set(pageErrors)]
      });
      await context.close();
      process.stdout.write(`audited ${name}\n`);
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify({
    generatedAt: new Date().toISOString(),
    languages,
    currencies,
    pages: results
  }, null, 2));
  process.stdout.write(`report ${reportPath}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
