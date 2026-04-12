'use strict';

const { COMMON_UA } = require('./fetch');
const { isBlockedPage, isJsShellOnly, saveDebugArtifacts, FAIL_TYPE } = require('./debug');

/**
 * Playwright browser 인스턴스 생성 (KE/OZ는 독립 context, 나머지 공유 가능)
 */
async function launchBrowser(opts = {}) {
  let chromium;
  try { ({ chromium } = require('playwright')); }
  catch { throw new Error('playwright 미설치 — npm install playwright 필요'); }

  return chromium.launch({
    headless: true,
    args: [
      '--no-sandbox', '--disable-setuid-sandbox',
      '--disable-dev-shm-usage', '--disable-http2',
      '--disable-blink-features=AutomationControlled',
      ...(opts.extraArgs || []),
    ],
  });
}

/**
 * 새 browser context 생성 (항공사별 독립 세션)
 */
async function newAirlineContext(browser, opts = {}) {
  return browser.newContext({
    userAgent:         COMMON_UA,
    locale:            'ko-KR',
    timezoneId:        'Asia/Seoul',
    viewport:          { width: 1366, height: 768 },
    ignoreHTTPSErrors: true,
    extraHTTPHeaders: {
      'Accept-Language':           'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
      'Accept':                    'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Upgrade-Insecure-Requests': '1',
      ...(opts.extraHeaders || {}),
    },
    ...(opts.storageState ? { storageState: opts.storageState } : {}),
  });
}

/**
 * 리소스 차단 (이미지/폰트/미디어)
 */
async function blockResources(page, types = ['image', 'media', 'font', 'stylesheet']) {
  await page.route('**/*', (route) => {
    if (types.includes(route.request().resourceType())) return route.abort();
    return route.continue();
  });
}

/**
 * 페이지 goto + body 대기 (domcontentloaded 기반)
 * networkidle 사용 안 함
 *
 * @returns {{ html, text, finalUrl, status, redirectChain, screenshot }}
 */
async function gotoAndExtract(page, url, opts = {}) {
  const {
    waitUntil    = 'domcontentloaded',
    timeout      = 30000,
    contentSelector = null,   // 공지 본문 selector (있으면 우선)
    bodyTimeout  = 8000,
    code         = '??',
    phase        = 'goto',
    saveDebug    = false,
  } = opts;

  const redirectChain = [];
  page.on('framenavigated', (frame) => {
    if (frame === page.mainFrame()) redirectChain.push(frame.url());
  });

  let status = 0;
  try {
    const resp = await page.goto(url, { waitUntil, timeout });
    status = resp?.status() ?? 0;
  } catch (gotoErr) {
    // goto 예외: about:blank / ERR_ABORTED 포함
    const finalUrl = page.url();
    console.log(`  [${code}] ${phase} goto 예외: ${gotoErr.message} | URL: ${finalUrl}`);

    if (saveDebug) {
      const snap = await page.content().catch(() => '');
      const shot = await page.screenshot({ fullPage: false }).catch(() => null);
      saveDebugArtifacts(code, phase, FAIL_TYPE.ABORTED, {
        html: snap, screenshot: shot, finalUrl, status: 0, redirectChain,
      });
    }
    throw Object.assign(gotoErr, { statusCode: 0, finalUrl, redirectChain });
  }

  const finalUrl = page.url();
  console.log(`  [${code}] ${phase} | status: ${status} | URL: ${finalUrl}`);

  // fail-fast: about:blank or status=0
  if (finalUrl.startsWith('about:') || status === 0) {
    const err = new Error(`${phase}: about:blank 또는 status=0`);
    err.statusCode = status;
    err.finalUrl   = finalUrl;
    if (saveDebug) {
      saveDebugArtifacts(code, phase, FAIL_TYPE.ABORTED, {
        html: '', finalUrl, status, redirectChain,
      });
    }
    throw err;
  }

  // HTTP 4xx
  if (status === 403 || status === 401 || status === 404) {
    const ft  = status === 403 ? FAIL_TYPE.HTTP_403 : status === 401 ? FAIL_TYPE.HTTP_401 : FAIL_TYPE.HTTP_404;
    const err = new Error(`HTTP ${status}`);
    err.statusCode = status;
    err.finalUrl   = finalUrl;
    if (saveDebug) {
      const snap = await page.content().catch(() => '');
      const shot = await page.screenshot({ fullPage: false }).catch(() => null);
      saveDebugArtifacts(code, phase, ft, { html: snap, screenshot: shot, finalUrl, status, redirectChain });
    }
    throw err;
  }

  // body 대기
  await page.waitForSelector('body', { timeout: bodyTimeout }).catch(() => {});

  // 공지 본문 selector 우선 시도
  let html = '';
  if (contentSelector) {
    try {
      await page.waitForSelector(contentSelector, { timeout: 5000 });
      const el = page.locator(contentSelector).first();
      html = await el.innerHTML().catch(() => '');
      if (html && html.length > 100) {
        console.log(`  [${code}] ${phase} 본문 selector 성공: ${contentSelector} (${html.length}자)`);
        return { html, finalUrl, status, redirectChain, selectorHit: true };
      }
    } catch {
      console.log(`  [${code}] ${phase} 본문 selector 미스: ${contentSelector}`);
    }
  }

  // body 전체 fallback
  html = await Promise.race([
    page.content(),
    new Promise((_, rej) => setTimeout(() => rej(new Error('content() timeout')), 6000)),
  ]).catch(() => '');

  console.log(`  [${code}] ${phase} body HTML: ${html.length}자`);

  // 차단 페이지 / JS 쉘 판별
  if (isBlockedPage(html) || isJsShellOnly(html)) {
    const ft  = isBlockedPage(html) ? FAIL_TYPE.BLOCKED_PAGE : FAIL_TYPE.JS_SHELL_ONLY;
    const shot = await page.screenshot({ fullPage: false }).catch(() => null);
    if (saveDebug) {
      saveDebugArtifacts(code, phase, ft, { html, screenshot: shot, finalUrl, status, redirectChain });
    }
    const err = new Error(`${ft}: 본문 수집 불가`);
    err.statusCode = status;
    err.finalUrl   = finalUrl;
    throw err;
  }

  if (html.length < 200) {
    const err = new Error(`empty_body: HTML ${html.length}자`);
    err.statusCode = status;
    err.finalUrl   = finalUrl;
    if (saveDebug) {
      const shot = await page.screenshot({ fullPage: false }).catch(() => null);
      saveDebugArtifacts(code, phase, FAIL_TYPE.EMPTY_BODY, { html, screenshot: shot, finalUrl, status, redirectChain });
    }
    throw err;
  }

  return { html, finalUrl, status, redirectChain, selectorHit: false };
}

module.exports = { launchBrowser, newAirlineContext, blockResources, gotoAndExtract };
