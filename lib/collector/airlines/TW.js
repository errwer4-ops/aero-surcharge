'use strict';

/**
 * TW (티웨이항공) 수집 전략
 *
 * 우선순위:
 *   1) override URL
 *   2) direct fetch (성공률 높음)
 *   3) Playwright (클릭 기반)
 *   4) fallback
 *
 * 특이사항:
 *   - TW는 v28에서 ai-search-auto로 1건 성공한 흐름 유지
 *   - direct fetch 우선, 실패 시 Playwright
 *   - 검색 성공 ≠ 수집 성공: URL 확보 후 반드시 HTML 수집 확인
 */

const {
  getPipelineMonths, detectMonthFromText, classifyNoticeMonth,
  isDomesticNotice, isNavigableHref,
} = require('../../month');
const { launchBrowser, newAirlineContext, blockResources, gotoAndExtract } = require('../utils/browser');
const { htmlToText, extractDetailBody, extractNoticeLinks, isErrorPage, hasStructuredData } = require('../utils/html');
const { directFetch } = require('../utils/fetch');
const { saveDebugArtifacts, FAIL_TYPE } = require('../utils/debug');

const TW_CONTENT_SELECTORS = [
  '.surcharge-wrap', '.notice-detail', '.notice-view',
  '.board-view', '.view-content', '.content-area',
  'article',
];

async function collectTW(target, overrideUrl = null) {
  const { listUrl, baseUrl, keywords } = target;
  const { currentMonth, nextMonth }    = getPipelineMonths();
  const tag = '[TW]';

  // ── STEP 1: override URL ─────────────────────────────────────
  if (overrideUrl) {
    console.log(`  ${tag} [override] 직접 시도: ${overrideUrl}`);
    try {
      const res      = await directFetch(overrideUrl, baseUrl);
      const bodyHtml = extractDetailBody(res.body);
      const text     = htmlToText(bodyHtml);
      if (text.length > 100 && !isErrorPage(res.body)) {
        const monthType = classifyNoticeMonth(detectMonthFromText(text), currentMonth, nextMonth);
        console.log(`  ${tag} [override] ✅ 수집 성공: ${text.length}자 [${monthType}]`);
        return { html: bodyHtml, text, sourceUrl: overrideUrl, monthType, source: 'override-url' };
      }
    } catch (overrideErr) {
      console.log(`  ${tag} [override] 실패: ${overrideErr.message}`);
      saveDebugArtifacts('TW', 'override', FAIL_TYPE.OVERRIDE_FAIL, { html: '', finalUrl: overrideUrl });
    }
  }

  // ── STEP 2: direct fetch → 목록 파싱 ────────────────────────
  console.log(`  ${tag} [direct] 목록 fetch: ${listUrl}`);
  let listBody = null;
  try {
    const res = await directFetch(listUrl, baseUrl);
    listBody  = res.body;
    console.log(`  ${tag} [direct] 목록 수집: ${listBody.length}자`);
  } catch (fetchErr) {
    console.log(`  ${tag} [direct] 목록 fetch 실패: ${fetchErr.message}`);
  }

  if (listBody) {
    const links = extractNoticeLinks(listBody, baseUrl, keywords);
    console.log(`  ${tag} [direct] 링크 후보: ${links.length}개`);
    links.slice(0, 3).forEach(l =>
      console.log(`    "${l.text.slice(0, 50)}" [${l.monthType}] score:${l.score}`)
    );

    for (const link of links.slice(0, 5)) {
      if (isDomesticNotice(link.text)) continue;
      console.log(`  ${tag} [direct] 상세 fetch: ${link.url}`);
      try {
        const res       = await directFetch(link.url, listUrl);
        const bodyHtml  = extractDetailBody(res.body);
        const cleanText = htmlToText(bodyHtml);
        if (cleanText.length > 100 && !isErrorPage(res.body) && !isDomesticNotice(cleanText)) {
          // ★ 수집 성공 확인 (검색 URL 확보 ≠ 수집 성공)
          console.log(`  ${tag} [direct] ✅ 수집 성공: ${cleanText.length}자`);
          const monthType = classifyNoticeMonth(detectMonthFromText(cleanText), currentMonth, nextMonth);
          return { html: bodyHtml, text: cleanText, sourceUrl: link.url, monthType, source: 'live' };
        }
        console.log(`  ${tag} [direct] 상세 조건 미달 → 건너뜀`);
      } catch (detailErr) {
        console.log(`  ${tag} [direct] 상세 fetch 실패: ${detailErr.message}`);
      }
    }
  }

  // ── STEP 3: Playwright 클릭 기반 ─────────────────────────────
  console.log(`  ${tag} [browser] Playwright 클릭 시도`);
  const browser = await launchBrowser().catch(e => { throw new Error(`playwright 실패: ${e.message}`); });
  try {
    const ctx  = await newAirlineContext(browser);
    const page = await ctx.newPage();
    await blockResources(page);

    const res = await gotoAndExtract(page, listUrl, {
      code:      'TW',
      phase:     'list',
      saveDebug: true,
      timeout:   30000,
    });

    // TW 전용 selector 우선 (공지 row)
    const TW_ROW_SELECTORS = [
      'li', 'tr', 'article',
      '[role="link"]', '[onclick]',
      'div[class*="list"]', 'div[class*="item"]', 'div[class*="notice"]',
    ];

    const rowCandidates = await page.evaluate(({ kws, selectors }) => {
      const seen    = new Set();
      const results = [];
      for (const sel of selectors) {
        let nodes;
        try { nodes = Array.from(document.querySelectorAll(sel)); } catch { continue; }
        for (const el of nodes) {
          const text = (el.textContent || '').trim().replace(/\s+/g, ' ');
          if (!text || text.length < 5 || text.length > 800) continue;
          const key = text.slice(0, 80);
          if (seen.has(key)) continue;
          if (!kws.some(kw => text.includes(kw))) continue;
          seen.add(key);
          const innerA  = el.querySelector('a[href]');
          const href    = innerA ? (innerA.getAttribute('href') || '') : '';
          results.push({ sel, text: text.slice(0, 200), href });
        }
      }
      return results;
    }, { kws: keywords, selectors: TW_ROW_SELECTORS });

    console.log(`  ${tag} [browser] 클릭 후보: ${rowCandidates.length}개`);

    const origin = new URL(listUrl).origin;
    for (const cand of rowCandidates.slice(0, 8)) {
      if (isDomesticNotice(cand.text)) continue;

      let detailHtml = '';
      let detailUrl  = '';

      if (cand.href && isNavigableHref(cand.href)) {
        detailUrl = cand.href.startsWith('http') ? cand.href
          : cand.href.startsWith('//') ? 'https:' + cand.href
          : origin + (cand.href.startsWith('/') ? cand.href : '/' + cand.href);
        try {
          const detailRes = await gotoAndExtract(page, detailUrl, {
            code:            'TW',
            phase:           'detail',
            saveDebug:       false,
            contentSelector: TW_CONTENT_SELECTORS.join(', '),
            timeout:         25000,
          });
          detailHtml = detailRes.selectorHit ? detailRes.html : extractDetailBody(detailRes.html);
          detailUrl  = detailRes.finalUrl;
        } catch (e) {
          console.log(`  ${tag} [browser] 상세 goto 실패: ${e.message}`);
          await page.goto(listUrl, { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});
          continue;
        }
      } else {
        // JS 클릭
        const loc = page.locator(cand.sel).filter({ hasText: cand.text.slice(0, 20) }).first();
        if (await loc.count({ timeout: 1000 }).catch(() => 0) > 0) {
          await loc.click({ force: true, timeout: 5000 }).catch(() => {});
          await page.waitForTimeout(2500);
        }
        detailHtml = await page.content().catch(() => '');
        detailUrl  = page.url();
      }

      const cleanText = htmlToText(detailHtml);
      if (
        detailHtml.length > 200 &&
        !isErrorPage(detailHtml) &&
        !isDomesticNotice(cleanText) &&
        (keywords.some(kw => cleanText.includes(kw)) || hasStructuredData(cleanText))
      ) {
        // ★ 수집 성공 확인
        const monthType = classifyNoticeMonth(detectMonthFromText(cleanText), currentMonth, nextMonth);
        console.log(`  ${tag} [browser] ✅ 수집 성공: ${cleanText.length}자 [${monthType}]`);
        await browser.close();
        return { html: detailHtml, text: cleanText, sourceUrl: detailUrl, monthType, source: 'live' };
      }

      await page.goto(listUrl, { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});
      await page.waitForTimeout(1000);
    }

    await browser.close();
    throw new Error('TW: direct fetch + Playwright 클릭 모두 실패');
  } catch (err) {
    await browser.close().catch(() => {});
    throw err;
  }
}

module.exports = { collectTW };
