'use strict';

const assert = require('node:assert/strict');
const path = require('node:path');
const {spawn} = require('node:child_process');
const {chromium} = require('playwright');

const root = path.resolve(__dirname, '..');
const port = Number(process.env.HOME_INTERACTIONS_TEST_PORT || 4213);
const origin = `http://127.0.0.1:${port}`;

function waitForServer(server) {
  return new Promise((resolve, reject) => {
    let stdout = '', stderr = '';
    const timer = setTimeout(() => finish(new Error('Home interaction server startup timeout: ' + stderr)), 10000);
    function finish(error) {
      clearTimeout(timer);
      server.stdout.off('data', onStdout);
      server.stderr.off('data', onStderr);
      server.off('error', onError);
      server.off('exit', onExit);
      if (error) reject(error); else resolve();
    }
    function onStdout(chunk) {
      stdout += String(chunk);
      if (stdout.includes('Local review server:')) finish();
    }
    function onStderr(chunk) { stderr += String(chunk); }
    function onError(error) { finish(error); }
    function onExit(code) { finish(new Error('Home interaction server exited with ' + code + ': ' + stderr)); }
    server.stdout.on('data', onStdout);
    server.stderr.on('data', onStderr);
    server.once('error', onError);
    server.once('exit', onExit);
  });
}

async function stopServer(server) {
  if (server.exitCode !== null || server.signalCode !== null) return;
  await new Promise(resolve => {
    const timer = setTimeout(resolve, 3000);
    server.once('exit', () => { clearTimeout(timer); resolve(); });
    server.kill();
  });
}

async function main() {
  const server = spawn(process.execPath, [path.join(__dirname, 'serve_local.js')], {
    cwd: root,
    env: {...process.env, PORT: String(port)},
    stdio: ['ignore', 'pipe', 'pipe'],
    windowsHide: true
  });
  let browser;
  try {
    await waitForServer(server);
    browser = await chromium.launch({headless: true});
    const context = await browser.newContext({viewport: {width: 1280, height: 900}, serviceWorkers: 'block'});
    // Only local static files are allowed. These UI checks never contact a
    // provider, analytics endpoint, advertising host, or local API handler.
    await context.route('**/*', route => {
      const url = new URL(route.request().url());
      return url.origin === origin && !/^\/api(?:\/|$)/.test(url.pathname)
        ? route.continue()
        : route.abort();
    });
    const page = await context.newPage();
    const errors = [], dialogs = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('dialog', async dialog => { dialogs.push(dialog.message()); await dialog.dismiss(); });
    await page.clock.setFixedTime(new Date('2026-11-06T00:00:00Z'));
    await page.goto(origin + '/', {waitUntil: 'domcontentloaded'});
    await page.waitForFunction(() => window.AeroHomePlatform && window.KR_AIRLINES?.length === 9 && window.getAirportSearchItems?.().length);
    // Let the existing delayed page initializers settle before spying on
    // deliberate language/currency actions.
    await page.waitForTimeout(4500);
    if (await page.locator('#aeroConsentDeny').isVisible()) await page.locator('#aeroConsentDeny').click();

    const originInput = page.locator('#originAirportInput');
    const destinationInput = page.locator('#destAirportInput');
    const originSelect = page.locator('#originSelect');
    const destinationSelect = page.locator('#destSelect');

    await originInput.fill('ICN');
    await originInput.press('Enter');
    assert.equal(await originSelect.inputValue(), 'ICN', 'exact airport code Enter selects ICN');
    assert.match(await originInput.inputValue(), /\(ICN\)/, 'selected origin keeps its displayed code');

    await destinationInput.fill('도쿄');
    await destinationInput.press('ArrowDown');
    await destinationInput.press('ArrowDown');
    assert.match(await page.locator('#destSuggestList .airport-suggest-item.active').innerText(), /HND/, 'second Tokyo suggestion is HND');
    await destinationInput.press('Enter');
    assert.equal(await destinationSelect.inputValue(), 'HND', 'keyboard selection commits HND');
    await originInput.click();
    await destinationInput.click();
    await destinationInput.press('Enter');
    assert.equal(await destinationSelect.inputValue(), 'HND', 'refocusing and Enter retains HND instead of a stale first suggestion');
    assert.match(await destinationInput.inputValue(), /\(HND\)/, 'refocused destination label remains HND');

    await destinationInput.press('ControlOrMeta+A');
    await destinationInput.press('Backspace');
    await destinationInput.press('Enter');
    assert.equal(await destinationInput.inputValue(), '', 'Enter does not resurrect a deleted suggestion');
    assert.equal(await destinationSelect.inputValue(), '', 'deleting all text clears the selected airport');

    await originInput.fill('ICN');
    await originInput.press('Enter');
    await destinationInput.fill('NRT');
    assert.equal(await destinationSelect.inputValue(), '', 'typed destination is deliberately not committed before swap');
    await page.locator('#swapBtn').click();
    assert.equal(await originSelect.inputValue(), 'NRT', 'swap resolves visible uncommitted destination before exchanging values');
    assert.equal(await destinationSelect.inputValue(), 'ICN', 'swap preserves the committed origin as destination');
    assert.match(await originInput.inputValue(), /\(NRT\)/, 'swapped origin label agrees with hidden select');
    assert.match(await destinationInput.inputValue(), /\(ICN\)/, 'swapped destination label agrees with hidden select');

    await originInput.fill('ICN');
    await originInput.press('Enter');
    await destinationInput.fill('NRT');
    await destinationInput.press('Enter');
    await page.locator('#searchBtn').click();
    await page.waitForFunction(() => window._searchCtx?.dep === 'ICN' && window._searchCtx?.arr === 'NRT' && document.querySelector('#cardsGrid .al-card'));
    const koreanMeta = (await page.locator('#resultMeta').innerText()).trim();
    assert(koreanMeta.length > 0, 'search metadata is visible');
    await page.locator('#ftabData').click();

    await page.evaluate(() => {
      const original = window.renderCards;
      window.__homeInteractionRenderCalls = [];
      window.renderCards = function(filter) {
        window.__homeInteractionRenderCalls.push(filter);
        return original.apply(this, arguments);
      };
    });

    async function assertDataFilter(label) {
      const state = await page.evaluate(() => ({
        active: document.querySelector('#filterRow .ftab.active')?.dataset.f,
        calls: window.__homeInteractionRenderCalls.slice(),
        cards: document.querySelectorAll('#cardsGrid .al-card').length
      }));
      assert.equal(state.active, 'data', label + ': selected filter remains data');
      assert(state.calls.length > 0, label + ': results were actually rerendered');
      assert(state.calls.every(filter => filter === 'data'), label + ': renderCards preserves the selected filter, calls=' + JSON.stringify(state.calls));
      assert(state.cards > 0, label + ': results remain visible');
    }

    for (const lang of ['en', 'ja', 'zh', 'fr', 'de', 'ko']) {
      await page.evaluate(() => { window.__homeInteractionRenderCalls.length = 0; });
      await page.locator('#navLang').selectOption(lang);
      await page.waitForFunction(language => window.getCurrentLang() === language && window.__homeInteractionRenderCalls.length > 0, lang);
      await assertDataFilter('language ' + lang);
      const metadata = (await page.locator('#resultMeta').innerText()).trim();
      const expected = await page.evaluate(() => (window.t('index.meta.oneWay') + ' · ' + window.t('index.meta.suffix')).replace(/\s+/g, ' ').trim());
      assert.equal(metadata, expected, lang + ': existing search metadata follows the selected language');
      if (lang !== 'ko') assert.notEqual(metadata, koreanMeta, lang + ': metadata is not stale Korean');
    }

    for (const currency of ['USD', 'KRW']) {
      await page.evaluate(() => { window.__homeInteractionRenderCalls.length = 0; });
      await page.locator('#navCurr').selectOption(currency);
      await page.waitForFunction(() => window.__homeInteractionRenderCalls.length > 0);
      await assertDataFilter('currency ' + currency);
    }

    await originInput.fill('NRT');
    await originInput.press('Enter');
    await destinationInput.fill('LAX');
    await destinationInput.press('Enter');
    await page.locator('#searchBtn').click();
    assert.equal(await page.locator('#filterRow').isVisible(), false, 'unsupported foreign departure hides result filters');
    assert.equal(await page.locator('#cardsGrid .al-card').count(), 0, 'unsupported departure has no financial result cards');
    for (const lang of ['en', 'ko']) {
      await page.locator('#navLang').selectOption(lang);
      const expected = await page.evaluate(() => ({
        meta: window.t('index.result.overseasMeta'),
        title: window.t('index.result.onlyKoreaDeparture'),
        detail: window.t('index.result.overseasComingSoon')
      }));
      assert.equal((await page.locator('#resultMeta').innerText()).trim(), expected.meta, lang + ': unsupported-search metadata follows language');
      const notice = await page.locator('#cardsGrid').innerText();
      assert(notice.includes(expected.title), lang + ': unsupported-search title follows language');
      assert(notice.includes(expected.detail), lang + ': unsupported-search explanation follows language');
      assert.equal(await page.locator('#filterRow').isVisible(), false, lang + ': translation does not expose unsupported filters');
    }

    await page.locator('#backToOverview').click();
    assert.equal(await page.locator('#landingSection').isVisible(), true, 'back returns to airline overview');
    assert.equal(await page.locator('#resultsSection').isVisible(), false, 'back hides search results');
    const hiddenResults = await page.locator('#cardsGrid').innerHTML();
    await page.evaluate(() => { window.__homeInteractionRenderCalls.length = 0; });
    await page.locator('#navCurr').selectOption('USD');
    await page.waitForTimeout(250);
    const afterBack = await page.evaluate(() => ({
      search: window._searchCtx || null,
      unsupported: window._unsupportedSearchCtx || null,
      calls: window.__homeInteractionRenderCalls.slice(),
      overviewCards: document.querySelectorAll('#miniGrid .mini-card').length
    }));
    assert.equal(afterBack.search, null, 'back clears successful search context');
    assert.equal(afterBack.unsupported, null, 'back clears unsupported search context');
    assert.deepEqual(afterBack.calls, [], 'currency change on overview does not rerender old search results');
    assert.equal(afterBack.overviewCards, 9, 'currency change preserves the complete airline overview');
    assert.equal(await page.locator('#landingSection').isVisible(), true, 'currency change keeps overview visible');
    assert.equal(await page.locator('#resultsSection').isVisible(), false, 'currency change cannot restore old results');
    assert.equal(await page.locator('#cardsGrid').innerHTML(), hiddenResults, 'currency change cannot rewrite stale unsupported results after back');

    assert.deepEqual(dialogs, [], 'valid keyboard/swap/search actions must not raise an alert');
    assert.deepEqual(errors, [], 'home interactions must not produce JavaScript exceptions');
    console.log('PASS home interactions: exact code Enter, Tokyo keyboard selection, refocus persistence, clear-then-Enter, uncommitted text swap, data-filter preservation across six languages and two currencies, localized successful/unsupported search metadata, clean return to overview; no JavaScript errors.');
  } finally {
    try { if (browser) await browser.close(); }
    finally { await stopServer(server); }
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
