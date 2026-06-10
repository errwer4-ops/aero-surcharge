const http = require('http');
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const root = path.join(__dirname, '..', 'public');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon',
  '.png': 'image/png'
};

function serve() {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    const filePath = path.join(root, urlPath === '/' ? 'index.html' : urlPath.slice(1));
    if (!filePath.startsWith(root) || !fs.existsSync(filePath)) {
      res.writeHead(404);
      res.end('not found');
      return;
    }
    res.writeHead(200, { 'content-type': mime[path.extname(filePath)] || 'text/plain; charset=utf-8' });
    fs.createReadStream(filePath).pipe(res);
  });
  return new Promise(resolve => server.listen(0, () => resolve(server)));
}

async function select(page, lang, curr) {
  await page.selectOption('#navLang', lang);
  await page.waitForTimeout(80);
  await page.selectOption('#navCurr', curr);
  await page.waitForTimeout(120);
}

async function text(page) {
  return page.evaluate(() => document.body.innerText);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

(async () => {
  const server = await serve();
  const port = server.address().port;
  const browser = await chromium.launch({ headless: true });
  try {
    for (const pageName of ['fuel-surcharge-forecast.html', 'news.html']) {
      const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
      await page.goto(`http://127.0.0.1:${port}/${pageName}`, { waitUntil: 'networkidle' });

      await select(page, 'ko', 'KRW');
      let body = await text(page);
      assert(body.includes('₩148,934/bbl'), `${pageName} KRW Brent amount missing`);
      assert(body.includes('₩5,633/gal') && body.includes('₩236,602/bbl'), `${pageName} KRW MOPS amounts missing`);
      assert(body.includes('₩220,868/bbl'), `${pageName} KRW IATA jet fuel amount missing`);
      assert(body.includes('1 USD = ₩1,559.36'), `${pageName} USD/KRW amount missing`);
      assert(body.includes('2026.06.10 11:00 KST'), `${pageName} latest timestamp missing`);
      assert(body.includes('55~60%'), `${pageName} latest freeze probability missing`);
      assert(!body.includes('forecastTargetMonth') && !body.includes('currentMonthNotice'), `${pageName} internal variable leaked`);
      if (pageName === 'fuel-surcharge-forecast.html') {
        const indicatorText = await page.locator('#indicatorTbody').innerText();
        const predictText = await page.locator('#predictFactors').innerText();
        for (const expected of ['₩148,934/bbl', '₩5,633/gal', '₩220,868/bbl', '1 USD = ₩1,559.36']) {
          assert(indicatorText.includes(expected), `Forecast indicator table missing ${expected}`);
          assert(predictText.includes(expected), `Forecast key variables missing ${expected}`);
        }
      }
      if (pageName === 'news.html') {
        const firstCardTitle = await page.locator('.news-card').first().innerText();
        assert(firstCardTitle.includes('호르무즈') || firstCardTitle.includes('7월 유류할증료'), 'June 10 news card is not first');
        assert(!body.includes('완화 요인: · 으로'), 'News relief-factor sentence has a blank metric');
      }

      await select(page, 'ko', 'USD');
      body = await text(page);
      assert(body.includes('$95.51/bbl') && body.includes('$92.72/bbl'), `${pageName} USD oil amounts missing`);
      assert(body.includes('$3.61/gal') && body.includes('$151.73/bbl'), `${pageName} USD MOPS amounts missing`);
      assert(body.includes('$141.64/bbl'), `${pageName} USD IATA jet fuel amount missing`);

      await select(page, 'ja', 'JPY');
      body = await text(page);
      assert(body.includes('燃油') || body.includes('サーチャージ'), `${pageName} Japanese content missing`);
      assert(!body.includes('July 2026 Fuel Surcharge Outlook Summary'), `${pageName} Japanese still has English forecast summary`);
      assert(body.includes('¥'), `${pageName} JPY currency marker missing`);

      await select(page, 'zh', 'JPY');
      body = await text(page);
      assert(body.includes('燃油附加费'), `${pageName} Chinese content missing`);
      assert(!body.includes('July 2026 Fuel Surcharge Outlook Summary'), `${pageName} Chinese still has English forecast summary`);
      assert(body.includes('¥'), `${pageName} JPY/CNY currency marker missing`);

      await select(page, 'fr', 'EUR');
      body = await text(page);
      assert(body.includes('surtaxe carburant') || body.includes('Surtaxe carburant'), `${pageName} French content missing`);
      assert(!body.includes('July 2026 Fuel Surcharge Outlook Summary'), `${pageName} French still has English forecast summary`);
      assert(body.includes('€'), `${pageName} EUR currency marker missing`);

      await select(page, 'de', 'EUR');
      body = await text(page);
      assert(body.includes('Treibstoffzuschlag'), `${pageName} German content missing`);
      assert(!body.includes('July 2026 Fuel Surcharge Outlook Summary'), `${pageName} German still has English forecast summary`);
      assert(body.includes('€'), `${pageName} German EUR currency marker missing`);

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
      assert(!overflow, `${pageName} horizontal overflow`);
      await page.close();
    }
    console.log('forecast/news i18n and currency verification passed');
  } finally {
    await browser.close();
    server.close();
  }
})().catch(err => {
  console.error(err.message);
  process.exit(1);
});
