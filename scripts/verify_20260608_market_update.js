const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..', 'public');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

function serverHandler(req, res) {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  const rel = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');
  const file = path.resolve(root, rel);
  if (!file.startsWith(root)) return res.writeHead(403).end('Forbidden');
  fs.readFile(file, (error, data) => {
    if (error) return res.writeHead(404).end('Not found');
    res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function main() {
  const server = http.createServer(serverHandler);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ headless: true });
  const errors = [];

  try {
    for (const viewport of [{ width: 1366, height: 900 }, { width: 390, height: 844 }]) {
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();
      page.on('pageerror', (error) => errors.push(error.message));

      await page.goto(`${base}/news.html`, { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.querySelectorAll('.news-card').length > 0);
      const news = await page.evaluate(() => {
        const faq = JSON.parse(document.querySelector('#newsFaqStructuredData').textContent);
        const firstCard = document.querySelector('.news-card');
        return {
          title: document.title,
          modified: document.querySelector('meta[property="article:modified_time"]')?.content,
          faqModified: faq.dateModified,
          firstTitle: firstCard?.querySelector('.news-title')?.textContent.trim(),
          firstText: firstCard?.innerText,
          body: document.body.innerText,
          latest: window.AERO_NEWS_LATEST,
          cardCount: document.querySelectorAll('.news-card').length,
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth
        };
      });
      assert(news.title.includes('6월 8일'), 'news title is not June 8');
      assert(news.modified === '2026-06-08T09:00:00+09:00', 'news modified_time mismatch');
      assert(news.faqModified === '2026-06-08T09:00:00+09:00', 'news FAQ dateModified mismatch');
      assert(news.firstTitle.includes('국제유가 안정에도 MOPS 부담 지속'), 'news first card is not the June 8 main card');
      assert(news.firstText.includes('2026.06.08') || news.firstText.includes('2026-06-08'), 'news first card does not expose June 8 date');
      assert(news.body.includes('동결 50~55%'), 'news body missing June 8 probability');
      assert(news.latest?.currentMonthNotice === '2026-06', 'news currentMonthNotice mismatch');
      assert(news.latest?.forecastTargetMonth === '2026-07', 'news forecastTargetMonth mismatch');
      assert(news.cardCount > 0, 'news cards did not render');
      assert(news.scrollWidth <= news.innerWidth + 2, 'news mobile/desktop horizontal overflow');

      await page.goto(`${base}/forecast.html`, { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.querySelector('#summaryCard')?.innerText.includes('동결: 50~55%'));
      const forecast = await page.evaluate(() => {
        const faq = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
        return {
          title: document.title,
          modified: document.querySelector('meta[property="article:modified_time"]')?.content,
          faqModified: faq.dateModified,
          pageSub: document.querySelector('.page-sub')?.innerText.trim(),
          h1: document.querySelector('h1')?.innerText.trim(),
          summary: document.querySelector('#summaryCard')?.innerText,
          mops: document.querySelector('#mopsAnalysisBox')?.innerText,
          faqText: document.querySelector('#forecastFaqBox')?.innerText || document.body.innerText,
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth
        };
      });
      assert(forecast.title.includes('6월 8일'), 'forecast title is not June 8');
      assert(forecast.modified === '2026-06-08T09:00:00+09:00', 'forecast modified_time mismatch');
      assert(forecast.faqModified === '2026-06-08T09:00:00+09:00', 'forecast FAQ dateModified mismatch');
      assert(forecast.pageSub.includes('2026.06.08 09:00 KST'), 'forecast pageSub mismatch');
      assert(forecast.h1.includes('국제유가 안정과 MOPS 강세의 균형'), 'forecast h1 mismatch');
      assert(forecast.summary.includes('동결: 50~55%'), 'forecast summary missing freeze probability');
      assert(forecast.mops.includes('MOPS 항공유 가격과 유류할증료 영향'), 'forecast MOPS block missing title');
      assert(forecast.faqText.includes('2026년 7월 유류할증료는 인상될까요?'), 'forecast FAQ missing AEO question');
      assert(forecast.scrollWidth <= forecast.innerWidth + 2, 'forecast mobile/desktop horizontal overflow');

      await context.close();
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  if (errors.length) throw new Error(`page errors: ${errors.join(' | ')}`);
  console.log('2026-06-08 market update verification passed');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
