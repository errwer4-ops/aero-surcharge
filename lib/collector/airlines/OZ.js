'use strict';

/**
 * OZ (아시아나항공) 수집 전략
 *
 * 우선순위:
 *   1) override URL
 *   2) known public API 탐색 (JSON 응답 감시)
 *   3) Playwright (DOM 탐색 + API 인터셉트)
 *   4) fallback
 *
 * 특이사항:
 *   - 독립 browser context
 *   - response 인터셉트로 내부 API 탐지
 *   - 실패 시 HTML snapshot + screenshot 필수
 */

const {
  getPipelineMonths, detectMonthFromText, classifyNoticeMonth,
  isDomesticNotice, isNavigableHref, monthTypePriority,
} = require('../../month');
const { launchBrowser, newAirlineContext, blockResources, gotoAndExtract } = require('../utils/browser');
const { htmlToText, extractDetailBody, isErrorPage, hasStructuredData } = require('../utils/html');
const { apiFetch } = require('../utils/fetch');
const { saveDebugArtifacts, FAIL_TYPE } = require('../utils/debug');

const OZ_TIMEOUT_MS = 60000;

// OZ 공개 API 엔드포인트 탐색 목록
const OZ_API_CANDIDATES = [
  '/C/KR/KO/customer/notice/list',
  '/api/notice/list',
  '/api/board/list',
];

const OZ_CONTENT_SELECTORS = [
  '.board-view', '.board-detail', '.notice-view',
  '.view-content', '.article-body', '.content-view',
];

async function collectOZ(target, overrideUrl = null) {
  const { listUrl, baseUrl, keywords } = target;
  const { currentMonth, nextMonth }    = getPipelineMonths();
  const tag = '[OZ]';

  const ozWork = async () => {
    const browser = await launchBrowser();
    try {
      const ctx = await newAirlineContext(browser, {
        extraHeaders: { 'Referer': 'https://www.google.com/' },
      });
      const page = await ctx.newPage();
      await page.route('**/*.{png,jpg,jpeg,gif,svg,woff,woff2,ttf,ico,mp4,webm}', r => r.abort());

      // ── STEP 1: override URL ──────────────────────────────────
      if (overrideUrl) {
        console.log(`  ${tag} [override] 직접 진입: ${overrideUrl}`);
        try {
          const res = await gotoAndExtract(page, overrideUrl, {
            code:            'OZ',
            phase:           'override',
            saveDebug:       true,
            contentSelector: OZ_CONTENT_SELECTORS.join(', '),
            timeout:         25000,
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
        }
      }

      // ── STEP 2: 공개 API 탐색 (JSON 엔드포인트) ──────────────
      console.log(`  ${tag} [api] JSON 엔드포인트 탐색 시작`);
      for (const apiPath of OZ_API_CANDIDATES) {
        const apiUrl = baseUrl + apiPath;
        try {
          const res  = await apiFetch(apiUrl, baseUrl);
          const data = JSON.parse(res.body);
          const items = Array.isArray(data) ? data
            : Array.isArray(data?.list) ? data.list
            : Array.isArray(data?.data) ? data.data
            : Array.isArray(data?.content) ? data.content : [];
          const hit = items.find(item => {
            const txt = JSON.stringify(item);
            return keywords.some(kw => txt.includes(kw));
          });
          if (hit) {
            const id = hit.noticeId || hit.boardId || hit.seq || hit.id || hit.articleId;
            const detailUrl = id ? `${baseUrl}/C/KR/KO/customer/notice/detail/${id}`
              : (hit.url || hit.link || hit.href || null);
            if (detailUrl) {
              console.log(`  ${tag} [api] ✅ API 기반 상세 URL 발견: ${detailUrl}`);
              // 상세 HTML 수집은 browser로 (JS 렌더링 필요할 수 있음)
              try {
                const detailRes = await gotoAndExtract(page, detailUrl, {
                  code:            'OZ',
                  phase:           'api_detail',
                  saveDebug:       true,
                  contentSelector: OZ_CONTENT_SELECTORS.join(', '),
                  timeout:         25000,
                });
                const bodyHtml  = detailRes.selectorHit ? detailRes.html : extractDetailBody(detailRes.html);
                const cleanText = htmlToText(bodyHtml);
                if (hasStructuredData(cleanText) && !isErrorPage(detailRes.html)) {
                  const monthType = classifyNoticeMonth(detectMonthFromText(cleanText), currentMonth, nextMonth);
                  console.log(`  ${tag} [api] ✅ 상세 수집 성공: ${cleanText.length}자 [${monthType}]`);
                  await browser.close();
                  return { html: bodyHtml, text: cleanText, sourceUrl: detailUrl, monthType, source: 'live' };
                }
              } catch { /* 상세 fetch 실패 → browser DOM 탐색으로 */ }
            }
          }
        } catch (apiErr) {
          console.log(`  ${tag} [api] ${apiPath} 실패: ${apiErr.message}`);
        }
      }

      // ── STEP 3: Playwright DOM 탐색 ──────────────────────────
      console.log(`  ${tag} [browser] 공지 목록 진입: ${listUrl}`);

      // API 응답 인터셉트
      const apiHits = [];
      page.on('response', async (res) => {
        const url = res.url();
        const ct  = res.headers()['content-type'] || '';
        if (/notice|board|customer|list|surcharge/i.test(url) && /json|text|html/i.test(ct)) {
          try {
            const body = await res.text();
            if (body.length > 100 && keywords.some(kw => body.includes(kw))) {
              apiHits.push({ url, body });
              console.log(`  ${tag} [browser] API 응답 캐치: ${url.slice(0, 80)}`);
            }
          } catch { /* 무시 */ }
        }
      });

      let navOk   = false;
      let listHtml = '';

      // 직접 목록 진입
      try {
        const res = await gotoAndExtract(page, listUrl, {
          code:      'OZ',
          phase:     'list',
          saveDebug: true,
          timeout:   20000,
        });
        listHtml = res.html;
        navOk    = true;
        console.log(`  ${tag} [browser] 목록 수집: ${listHtml.length}자`);
      } catch (listErr) {
        console.log(`  ${tag} [browser] 목록 직접 진입 실패: ${listErr.message}`);
        // 홈 경유 시도
        try {
          await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});
          await page.waitForTimeout(1000);
          const noticeLink = page.locator('a[href*="notice"], a[href*="customer"], a[href*="board"]').first();
          if (await noticeLink.count({ timeout: 2000 }).catch(() => 0) > 0) {
            await noticeLink.click({ force: true, timeout: 5000 }).catch(() => {});
            await page.waitForTimeout(2000);
            console.log(`  ${tag} [browser] 홈 경유 후 URL: ${page.url()}`);
            navOk = !page.url().startsWith('about:');
            if (navOk) listHtml = await page.content().catch(() => '');
          }
        } catch (altErr) {
          console.log(`  ${tag} [browser] 홈 경유도 실패: ${altErr.message}`);
        }
      }

      if (!navOk) {
        await browser.close();
        throw new Error('OZ: 공지 목록 수집 실패 (direct + 홈 경유 모두)');
      }

      // DOM 링크 탐색
      const candidates = await page.evaluate(({ kws }) => {
        return Array.from(document.querySelectorAll('a, button, [role="link"]'))
          .map(el => ({
            text: (el.textContent || '').trim().slice(0, 100),
            href: el.getAttribute('href') || '',
          }))
          .filter(n => kws.some(kw => n.text.includes(kw)));
      }, { kws: keywords });

      const filteredCandidates = candidates
        .filter(c => !isDomesticNotice(c.text))
        .map(c => ({
          ...c,
          monthType: classifyNoticeMonth(detectMonthFromText(c.text), currentMonth, nextMonth),
        }))
        .sort((a, b) => monthTypePriority(a.monthType) - monthTypePriority(b.monthType));

      console.log(`  ${tag} [browser] DOM 후보: ${filteredCandidates.length}개`);

      for (const c of filteredCandidates) {
        if (!isNavigableHref(c.href)) continue;
        const detailUrl = c.href.startsWith('http') ? c.href
          : c.href.startsWith('//') ? 'https:' + c.href
          : baseUrl + (c.href.startsWith('/') ? c.href : '/' + c.href);
        console.log(`  ${tag} [browser] 상세 이동: "${c.text.slice(0, 40)}" [${c.monthType}] → ${detailUrl}`);

        try {
          const res = await gotoAndExtract(page, detailUrl, {
            code:            'OZ',
            phase:           'detail',
            saveDebug:       true,
            contentSelector: OZ_CONTENT_SELECTORS.join(', '),
            timeout:         20000,
          });
          const bodyHtml  = res.selectorHit ? res.html : extractDetailBody(res.html);
          const cleanText = htmlToText(bodyHtml);
          if (hasStructuredData(cleanText) && !isErrorPage(res.html)) {
            const monthType = classifyNoticeMonth(detectMonthFromText(cleanText), currentMonth, nextMonth);
            console.log(`  ${tag} [browser] ✅ 상세 수집 성공: ${cleanText.length}자 [${monthType}]`);
            await browser.close();
            return { html: bodyHtml, text: cleanText, sourceUrl: res.finalUrl, monthType, source: 'live' };
          }
        } catch (detailErr) {
          console.log(`  ${tag} [browser] 상세 실패: ${detailErr.message}`);
        }
      }

      await browser.close();
      throw new Error('OZ: DOM/API 탐색 모두 실패');
    } catch (err) {
      await browser.close().catch(() => {});
      throw err;
    }
  };

  const timeoutP = new Promise((_, rej) =>
    setTimeout(() => rej(new Error(`OZ: hard timeout ${OZ_TIMEOUT_MS / 1000}s`)), OZ_TIMEOUT_MS)
  );
  return Promise.race([ozWork(), timeoutP]);
}

module.exports = { collectOZ };
