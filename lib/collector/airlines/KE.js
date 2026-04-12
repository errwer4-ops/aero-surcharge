'use strict';

/**
 * KE (대한항공) 수집 전략
 *
 * 우선순위:
 *   1) override URL (manual_overrides.json)
 *   2) known public API 탐색 (없음 — KE는 JS 렌더링 필수)
 *   3) Playwright (browser-heavy, 독립 context)
 *   4) fallback
 *
 * 특이사항:
 *   - 홈 진입 → 공지 목록 → 상세 흐름
 *   - 독립 browser context (타 항공사와 격리)
 *   - 실패 시 HTML snapshot + screenshot 필수 저장
 */

const {
  getPipelineMonths, detectMonthFromText, classifyNoticeMonth,
  isDomesticNotice, isNavigableHref,
} = require('../../month');
const { launchBrowser, newAirlineContext, blockResources, gotoAndExtract } = require('../utils/browser');
const { htmlToText, extractDetailBody, isErrorPage, hasStructuredData } = require('../utils/html');
const { saveDebugArtifacts, FAIL_TYPE } = require('../utils/debug');

const KE_TIMEOUT_MS = 60000;

// 공지 본문 selector 우선순위 (KE 사이트 기준)
const KE_CONTENT_SELECTORS = [
  '.notice-view', '.notice-detail', '.notice-content',
  '.board-view', '.board-detail', '.view-content',
  'article', '.article-body',
];

async function collectKE(target, overrideUrl = null) {
  const { listUrl, baseUrl, keywords } = target;
  const { currentMonth, nextMonth }    = getPipelineMonths();
  const tag = '[KE]';

  const keWork = async () => {
    const browser = await launchBrowser();
    try {
      const ctx = await newAirlineContext(browser);
      const page = await ctx.newPage();
      await blockResources(page);

      // 디버그 이벤트
      page.on('response', (res) => {
        if (res.request().resourceType() === 'document')
          console.log(`  ${tag} [resp] ${res.status()} ${res.url().slice(0, 90)}`);
      });
      page.on('requestfailed', (req) => {
        if (req.resourceType() === 'document')
          console.log(`  ${tag} [fail] ${req.failure()?.errorText} — ${req.url().slice(0, 80)}`);
      });

      // ── STEP 1: override URL 직접 시도 ───────────────────────
      if (overrideUrl) {
        console.log(`  ${tag} [override] 직접 진입: ${overrideUrl}`);
        try {
          const res = await gotoAndExtract(page, overrideUrl, {
            code:            'KE',
            phase:           'override',
            saveDebug:       true,
            contentSelector: KE_CONTENT_SELECTORS.join(', '),
            timeout:         30000,
          });
          const bodyHtml  = res.selectorHit ? res.html : extractDetailBody(res.html);
          const cleanText = htmlToText(bodyHtml);
          if (cleanText.length > 100 && !isErrorPage(res.html)) {
            const monthType = classifyNoticeMonth(detectMonthFromText(cleanText), currentMonth, nextMonth);
            console.log(`  ${tag} [override] ✅ 수집 성공: ${cleanText.length}자 [${monthType}]`);
            await browser.close();
            return { html: bodyHtml, text: cleanText, sourceUrl: overrideUrl, monthType, source: 'override-url' };
          }
        } catch (overrideErr) {
          console.log(`  ${tag} [override] 실패: ${overrideErr.message}`);
          saveDebugArtifacts('KE', 'override', FAIL_TYPE.OVERRIDE_FAIL, {
            html: '', finalUrl: overrideUrl,
          });
        }
      }

      // ── STEP 2: 홈 진입 (쿠키 준비) ─────────────────────────
      console.log(`  ${tag} [browser] 홈 진입: ${baseUrl}`);
      await gotoAndExtract(page, baseUrl, {
        code: 'KE', phase: 'home', timeout: 20000, saveDebug: false,
      }).catch(e => console.log(`  ${tag} [browser] 홈 진입 예외 (무시): ${e.message}`));
      await page.waitForTimeout(1000);

      // ── STEP 3: 공지 목록 이동 ───────────────────────────────
      console.log(`  ${tag} [browser] 공지 목록: ${listUrl}`);
      let listHtml = '';
      let listOk   = false;

      try {
        const res = await gotoAndExtract(page, listUrl, {
          code:      'KE',
          phase:     'list',
          saveDebug: true,
          timeout:   30000,
        });
        listHtml = res.html;
        listOk   = true;
        console.log(`  ${tag} [browser] 목록 수집: ${listHtml.length}자`);
      } catch (listErr) {
        console.log(`  ${tag} [browser] 목록 수집 실패: ${listErr.message}`);
      }

      if (!listOk || listHtml.length < 300) {
        await browser.close();
        throw new Error('KE: 공지 목록 페이지 수집 실패');
      }

      // ── STEP 4: 공지 링크 탐색 ───────────────────────────────
      const keLinks = await page.evaluate((kws) => {
        return Array.from(document.querySelectorAll('a'))
          .map(a => ({
            href: a.getAttribute('href') || '',
            text: (a.textContent || '').trim().slice(0, 120),
          }))
          .filter(l => kws.some(kw => l.text.includes(kw)));
      }, keywords).catch(() => []);

      console.log(`  ${tag} [browser] 링크 후보: ${keLinks.length}개`);
      keLinks.slice(0, 3).forEach(l =>
        console.log(`    후보: "${l.text.slice(0, 50)}" href="${l.href.slice(0, 60)}"`)
      );

      // ── STEP 5: 상세 진입 ────────────────────────────────────
      for (const link of keLinks) {
        if (isDomesticNotice(link.text)) {
          console.log(`  ${tag} [browser] 국내선 → 건너뜀: "${link.text.slice(0, 30)}"`);
          continue;
        }

        let detailHtml = '';
        let detailUrl  = '';

        if (!link.href || link.href.startsWith('javascript:')) {
          const anchor = page.locator('a').filter({ hasText: link.text.slice(0, 25) }).first();
          if (await anchor.count({ timeout: 2000 }).catch(() => 0) > 0) {
            await anchor.click({ force: true, timeout: 5000 }).catch(() => {});
            await page.waitForTimeout(2500);
          }
          detailUrl  = page.url();
          detailHtml = await page.content().catch(() => '');
        } else {
          detailUrl = link.href.startsWith('http') ? link.href
            : baseUrl + (link.href.startsWith('/') ? link.href : '/' + link.href);
          console.log(`  ${tag} [browser] 상세 이동: "${link.text.slice(0, 40)}" → ${detailUrl}`);
          try {
            const res = await gotoAndExtract(page, detailUrl, {
              code:            'KE',
              phase:           'detail',
              saveDebug:       true,
              contentSelector: KE_CONTENT_SELECTORS.join(', '),
              timeout:         25000,
            });
            detailHtml = res.selectorHit ? res.html : extractDetailBody(res.html);
            detailUrl  = res.finalUrl;
          } catch (detailErr) {
            console.log(`  ${tag} [browser] 상세 실패: ${detailErr.message}`);
            await page.goto(listUrl, { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});
            await page.waitForTimeout(1000);
            continue;
          }
        }

        const cleanText = htmlToText(detailHtml);
        if (detailHtml.length < 300 || isErrorPage(detailHtml) || isDomesticNotice(cleanText)) {
          await page.goto(listUrl, { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});
          await page.waitForTimeout(1000);
          continue;
        }

        const monthType = classifyNoticeMonth(detectMonthFromText(cleanText), currentMonth, nextMonth);
        console.log(`  ${tag} [browser] ✅ 상세 수집 성공: ${cleanText.length}자 [${monthType}]`);
        await browser.close();
        return { html: detailHtml, text: cleanText, sourceUrl: detailUrl, monthType, source: 'live' };
      }

      await browser.close();
      throw new Error('KE: 모든 링크 탐색 실패');
    } catch (err) {
      await browser.close().catch(() => {});
      throw err;
    }
  };

  // KE 전체 60초 hard timeout
  const timeoutP = new Promise((_, rej) =>
    setTimeout(() => rej(new Error(`KE: hard timeout ${KE_TIMEOUT_MS / 1000}s`)), KE_TIMEOUT_MS)
  );
  return Promise.race([keWork(), timeoutP]);
}

module.exports = { collectKE };
