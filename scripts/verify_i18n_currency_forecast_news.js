const http = require("http");
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");

const root = path.join(__dirname, "..", "public");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".ico": "image/x-icon",
  ".png": "image/png",
};

function serve() {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    const filePath = path.join(root, urlPath === "/" ? "index.html" : urlPath.slice(1));
    if (!filePath.startsWith(root) || !fs.existsSync(filePath)) {
      res.writeHead(404);
      res.end("not found");
      return;
    }
    res.writeHead(200, { "content-type": mime[path.extname(filePath)] || "text/plain; charset=utf-8" });
    fs.createReadStream(filePath).pipe(res);
  });
  return new Promise((resolve) => server.listen(0, () => resolve(server)));
}

async function select(page, lang, curr) {
  await page.selectOption("#navLang", lang);
  await page.waitForTimeout(80);
  await page.selectOption("#navCurr", curr);
  await page.waitForTimeout(120);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

(async () => {
  const server = await serve();
  const port = server.address().port;
  const browser = await chromium.launch({ headless: true });
  try {
    const localeSignals = {
      ko: ["2026년 7월", "동결"],
      en: ["July 2026", "Freeze"],
      ja: ["2026年7月", "据え置き"],
      zh: ["2026年7月", "维持"],
      fr: ["juillet 2026", "statu quo"],
      de: ["Juli 2026", "Unverändert"],
    };
    const currencies = { ko: "KRW", en: "USD", ja: "JPY", zh: "JPY", fr: "EUR", de: "EUR" };
    const currencySignals = { KRW: "₩", USD: "$", JPY: "¥", EUR: "€" };

    for (const pageName of ["forecast.html", "news.html"]) {
      const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(`http://127.0.0.1:${port}/${pageName}`, { waitUntil: "networkidle" });

      await select(page, "ko", "KRW");
      let body = await page.locator("body").innerText();
      for (const expected of ["₩140,935/bbl", "₩136,771/bbl", "₩5,633/gal", "₩236,602/bbl", "₩220,868/bbl", "1 USD = ₩1,559.36"]) {
        assert(body.includes(expected), `${pageName} KRW market amount missing: ${expected}`);
      }
      assert(body.includes("2026.06.12 06:00 KST"), `${pageName} June 12 timestamp missing`);
      assert(body.includes("60~65%"), `${pageName} freeze probability missing`);
      assert(!body.includes("forecastTargetMonth") && !body.includes("currentMonthNotice"), `${pageName} internal variable leaked`);

      if (pageName === "forecast.html") {
        const indicatorText = await page.locator("#indicatorTbody").innerText();
        const predictText = await page.locator("#predictFactors").innerText();
        for (const expected of ["₩140,935/bbl", "₩136,771/bbl", "₩5,633/gal", "₩236,602/bbl", "₩220,868/bbl", "1 USD = ₩1,559.36"]) {
          assert(indicatorText.includes(expected), `Forecast indicator table missing ${expected}`);
          assert(predictText.includes(expected), `Forecast key variables missing ${expected}`);
        }
      } else {
        const firstCard = await page.locator(".news-card").first().innerText();
        assert(firstCard.includes("국제유가 안정세 지속"), "June 12 news card is not first");
      }

      await select(page, "ko", "USD");
      body = await page.locator("body").innerText();
      for (const expected of ["$90.38/bbl", "$87.71/bbl", "$3.61/gal", "$151.73/bbl", "$141.64/bbl"]) {
        assert(body.includes(expected), `${pageName} USD amount missing: ${expected}`);
      }

      for (const lang of Object.keys(localeSignals)) {
        const curr = currencies[lang];
        await select(page, lang, curr);
        body = await page.locator("body").innerText();
        for (const signal of localeSignals[lang]) {
          assert(body.toLowerCase().includes(signal.toLowerCase()), `${pageName} ${lang} content missing: ${signal}`);
        }
        assert(body.includes(currencySignals[curr]), `${pageName} ${lang}/${curr} currency marker missing`);
        assert(body.includes(lang === "ko" ? "60~65%" : lang === "ja" ? "60〜65%" : "60-65%") || body.includes("60–65%"), `${pageName} ${lang} probability missing`);
      }

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
      assert(!overflow, `${pageName} horizontal overflow`);
      assert(errors.length === 0, `${pageName} page errors: ${errors.join(" | ")}`);
      await page.close();

      const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await mobile.goto(`http://127.0.0.1:${port}/${pageName}`, { waitUntil: "networkidle" });
      await select(mobile, "fr", "EUR");
      const mobileBody = await mobile.locator("body").innerText();
      assert(mobileBody.toLowerCase().includes("juillet 2026"), `${pageName} mobile localized content missing`);
      const mobileOverflow = await mobile.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
      assert(!mobileOverflow, `${pageName} mobile horizontal overflow`);
      if (pageName === "forecast.html") {
        assert(await mobile.locator("#indicatorTbody").isVisible(), "Forecast mobile indicator table is hidden");
        assert(await mobile.locator("#predictFactors").isVisible(), "Forecast mobile key variables are hidden");
      } else {
        assert(await mobile.locator(".news-card").first().isVisible(), "News mobile first card is hidden");
      }
      await mobile.close();
    }
    console.log("forecast/news i18n and currency verification passed");
  } finally {
    await browser.close();
    server.close();
  }
})().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
