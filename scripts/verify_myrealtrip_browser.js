const assert = require("assert");
const path = require("path");
const { spawn } = require("child_process");
const { chromium } = require("playwright");

const port = Number(process.env.LOCAL_REVIEW_PORT || 4174);
const baseUrl = `http://127.0.0.1:${port}`;

function waitForServer(child) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Local review server did not start.")), 10000);
    child.stdout.on("data", (chunk) => {
      if (String(chunk).includes("Local review server:")) {
        clearTimeout(timer);
        resolve();
      }
    });
    child.on("exit", (code) => {
      clearTimeout(timer);
      reject(new Error(`Local review server exited with code ${code}.`));
    });
  });
}

async function main() {
  const projectRoot = path.resolve(__dirname, "..");
  const server = spawn(process.execPath, [path.join(__dirname, "serve_local.js")], {
    cwd: projectRoot,
    env: { ...process.env, PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"],
  });
  await waitForServer(server);
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    const pageErrors = [];
    const myLinkRequests = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));

    await page.route("**/api/myrealtrip/mylink?**", async (route) => {
      const url = new URL(route.request().url());
      myLinkRequests.push({
        call: url.searchParams.get("call"),
        originalUrl: url.searchParams.get("originalUrl"),
        subId: url.searchParams.get("subId"),
      });
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          resource: "mylink",
          upstreamTest: true,
          link: { trackingUrl: "https://myrealt.rip/browser-test" },
        }),
      });
    });

    await page.goto(`${baseUrl}/fuel-surcharge-calculator`, { waitUntil: "networkidle" });
    await page.waitForFunction(() => {
      const link = document.getElementById("savingAffiliateBtn");
      return link && link.href === "https://myrealt.rip/browser-test";
    });

    const affiliateHref = await page.locator("#savingAffiliateBtn").getAttribute("href");
    assert.equal(affiliateHref, "https://myrealt.rip/browser-test");
    assert(myLinkRequests.length > 0);
    assert.equal(myLinkRequests[0].call, "1");
    assert.equal(myLinkRequests[0].originalUrl, "https://www.myrealtrip.com/");
    assert(/^calculator_[A-Z]{3}_[A-Z]{3}$/.test(myLinkRequests[0].subId));

    const desktopOverflow = await page.evaluate(() =>
      document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    assert.equal(desktopOverflow, false);
    assert.deepEqual(pageErrors, []);

    const staticContext = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const staticPage = await staticContext.newPage();
    let staticApiCalls = 0;
    await staticPage.route("**/api/myrealtrip/mylink?**", async (route) => {
      staticApiCalls += 1;
      await route.fulfill({
        status: 404,
        contentType: "text/plain",
        body: "Not found",
      });
    });
    await staticPage.goto(`${baseUrl}/fuel-surcharge-calculator`, { waitUntil: "networkidle" });
    await staticPage.evaluate(() => {
      if (window.renderSavingCalculator) window.renderSavingCalculator();
      if (window.updateSavingCalculator) window.updateSavingCalculator();
      if (window.updateSavingCalculator) window.updateSavingCalculator();
    });
    await staticPage.waitForTimeout(300);
    assert.equal(staticApiCalls, 1);
    assert((await staticPage.locator("#savingAffiliateBtn").getAttribute("href")).includes("lase.kr/click.php"));
    await staticContext.close();

    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobile.route("**/api/myrealtrip/mylink?**", (route) => route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        resource: "mylink",
        upstreamTest: true,
        link: { trackingUrl: "https://myrealt.rip/mobile-test" },
      }),
    }));
    await mobile.goto(`${baseUrl}/fuel-surcharge-calculator`, { waitUntil: "networkidle" });
    const mobileOverflow = await mobile.evaluate(() =>
      document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    assert.equal(mobileOverflow, false);

    await mobile.goto(`${baseUrl}/myrealtrip-api-test`, { waitUntil: "domcontentloaded" });
    assert.equal(
      await mobile.locator("#analysis").textContent(),
      "설정 확인 응답이라 분석 가능한 실제 API 데이터가 없습니다."
    );
    const adminOverflow = await mobile.evaluate(() =>
      document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    assert.equal(adminOverflow, false);

    await mobile.close();
    await context.close();
    console.log("MyRealTrip browser verification passed.");
  } finally {
    await browser.close();
    server.kill();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
