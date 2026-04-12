'use strict';

/**
 * HYBRID 항공사 수집 전략 — LJ, 7C, BX, YP
 *
 * 우선순위:
 *   1) override URL
 *   2) 공개 API/JSON 엔드포인트 탐색
 *   3) direct fetch (우선)
 *   4) Playwright fallback
 *
 * 각 항공사별 특이사항:
 *   LJ: hydration 대기 필요 (.announce, .notice, table selector)
 *   7C: clickable row 기반 (a[href] 직접 클릭 불안정)
 *   BX: ERR_ABORTED 빈번 → 홈 경유 필수
 *   YP: JSON-LD embedded data 탐색 추가
 */

const {
  getPipelineMonths, detectMonthFromText, classifyNoticeMonth,
  isDomesticNotice, isNavigableHref,
} = require('../../month');
const { launchBrowser, newAirlineContext, blockResources, gotoAndExtract } = require('../utils/browser');
const { htmlToText, extractDetailBody, extractNoticeLinks, isErrorPage, hasStructuredData, isListPage } = require('../utils/html');
const { directFetch, apiFetch } = require('../utils/fetch');
const { saveDebugArtifacts, FAIL_TYPE } = require('../utils/debug');

// 항공사별 공개 API 후보
const AIRLINE_API_CANDIDATES = {
  LJ:  ['/company/announce/announceList.json', '/api/notice/list'],
  '7C': ['/ko/customerServiceCenter/notice.json', '/api/notice'],
  BX:  ['/ko/customer/notice/list.json', '/api/board'],
  YP:  ['/a/ko/customer/notice.json', '/api/notice/list'],
};

// 항공사별 본문 selector
const AIRLINE_CONTENT_SELECTORS = {
  LJ:   ['.announce-detail', '.notice-detail', '.board-view', '.view-content'],
  '7C': ['.view-content', '.notice-view', '.board-view'],
  BX:   ['.content-area', '.notice-detail', '.board-view', '.view-content'],
  YP:   ['.notice', '.notice-detail', '.content-view', 'article'],
};

async function collectHybrid(target, overrideUrl = null) {
  const { code, listUrl, baseUrl, keywords } = target;
  const { currentMonth, nextMonth }          = getPipelineMonths();
  const tag = `[${code}]`;

  const contentSelectors = (AIRLINE_CONTENT_SELECTORS[code] || []).join(', ');

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
      saveDebugArtifacts(code, 'override', FAIL_TYPE.OVERRIDE_FAIL, { html: '', finalUrl: overrideUrl });
    }
  }

  // ── STEP 2: 공개 API 탐색 ────────────────────────────────────
  const apiCandidates = AIRLINE_API_CANDIDATES[code] || [];
  if (apiCandidates.length > 0) {
    console.log(`  ${tag} [api] JSON 엔드포인트 탐색 (${apiCandidates.length}개)`);
  }
  for (const apiPath of apiCandidates) {
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
        const id  = hit.noticeId || hit.boardId || hit.seq || hit.id || hit.articleId;
        const url = hit.url || hit.link || hit.href || (id ? `${baseUrl}/notice/${id}` : null);
        if (url) {
          const detailUrl = url.startsWith('http') ? url : baseUrl + url;
          console.log(`  ${tag} [api] ✅ API 기반 URL: ${detailUrl}`);
          try {
            const detailRes = await directFetch(detailUrl, baseUrl);
            const bodyHtml  = extractDetailBody(detailRes.body);
            const text      = htmlToText(bodyHtml);
            if (text.length > 100 && !isErrorPage(detailRes.body)) {
              const monthType = classifyNoticeMonth(detectMonthFromText(text), currentMonth, nextMonth);
              console.log(`  ${tag} [api] ✅ 수집 성공: ${text.length}자 [${monthType}]`);
              return { html: bodyHtml, text, sourceUrl: detailUrl, monthType, source: 'live' };
            }
          } catch { /* API URL fetch 실패 → 계속 */ }
        }
      }
    } catch (apiErr) {
      console.log(`  ${tag} [api] ${apiPath} 실패: ${apiErr.message}`);
    }
  }

  // ── STEP 3: direct fetch ──────────────────────────────────────
  console.log(`  ${tag} [direct] 목록 fetch: ${listUrl}`);
  let listBody = null;
  let directErr = null;
  try {
    const res = await directFetch(listUrl, baseUrl);
    listBody  = res.body;
    console.log(`  ${tag} [direct] 목록 수집: ${listBody.length}자`);
  } catch (fe) {
    directErr = fe;
    console.log(`  ${tag} [direct] 목록 fetch 실패: ${fe.message}`);
  }

  if (listBody) {
    const links = extractNoticeLinks(listBody, baseUrl, keywords);
    console.log(`  ${tag} [direct] 링크 후보: ${links.length}개`);

    for (const link of links.slice(0, 5)) {
      if (isDomesticNotice(link.text)) continue;
      try {
        const res       = await directFetch(link.url, listUrl);
        const bodyHtml  = extractDetailBody(res.body);
        const cleanText = htmlToText(bodyHtml);
        if (cleanText.length > 100 && !isErrorPage(res.body) && !isDomesticNotice(cleanText)) {
          const monthType = classifyNoticeMonth(detectMonthFromText(cleanText), currentMonth, nextMonth);
          console.log(`  ${tag} [direct] ✅ 수집 성공: ${cleanText.length}자 [${monthType}]`);
          return { html: bodyHtml, text: cleanText, sourceUrl: link.url, monthType, source: 'live' };
        }
      } catch { /* 다음 링크 */ }
    }
  }

  // ── STEP 4: Playwright fallback ───────────────────────────────
  console.log(`  ${tag} [browser] Playwright 시작`);
  const browser = await launchBrowser().catch(e => { throw new Error(`playwright 실패: ${e.message}`); });
  try {
    const ctx  = await newAirlineContext(browser);
    const page = await ctx.newPage();
    await page.route('**/*.{png,jpg,jpeg,gif,svg,woff,woff2,ttf,ico,mp4,webm}', r => r.abort());

    // BX: 홈 경유 필수
    if (code === 'BX') {
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});
      await page.waitForTimeout(1000);
    }

    // YP: JSON-LD embedded data 탐색
    let ypJsonLdUrl = null;
    if (code === 'YP') {
      try {
        await page.goto(listUrl, { waitUntil: 'domcontentloaded', timeout: 25000 });
        const jsonLdData = await page.evaluate(() => {
          return Array.from(document.querySelectorAll('script[type="application/json"], script[type="application/ld+json"], script[id*="state"], script[id*="data"]'))
            .map(s => s.textContent?.slice(0, 500) || '')
            .filter(t => t.includes('유류') || t.includes('surcharge') || t.includes('notice'));
        });
        if (jsonLdData.length > 0) {
          console.log(`  ${tag} [browser] JSON-LD embedded data ${jsonLdData.length}개 발견`);
          // URL 추출 시도
          for (const d of jsonLdData) {
            const urlMatch = d.match(/https?:\/\/[^\s"']+notice[^\s"']*/);
            if (urlMatch) { ypJsonLdUrl = urlMatch[0]; break; }
          }
        }
      } catch { /* YP JSON-LD 탐색 실패 무시 */ }
    }

    // 7C: clickable row 기반 전략
    if (code === '7C') {
      return await collect7CPlaywright(page, target, browser, currentMonth, nextMonth);
    }

    // 공통: 목록 진입 후 링크 탐색
    try {
      const res = await gotoAndExtract(page, listUrl, {
        code,
        phase:     'list',
        saveDebug: ['7C', 'BX'].includes(code),   // 7C/BX는 디버그 저장
        timeout:   30000,
      });

      // LJ: hydration 대기
      if (code === 'LJ') {
        await Promise.race([
          page.waitForSelector('.announce, .notice, .board, table, li', { timeout: 4000 }).catch(() => {}),
          page.waitForTimeout(3000),
        ]);
        await page.waitForTimeout(500);
      }

      const listHtml = await page.content().catch(() => res.html);
      const links    = extractNoticeLinks(listHtml, baseUrl, keywords);
      console.log(`  ${tag} [browser] 링크 후보: ${links.length}개`);

      const origin = new URL(listUrl).origin;
      for (const link of links.slice(0, 5)) {
        if (isDomesticNotice(link.text)) continue;
        const detailUrl = link.url.startsWith('http') ? link.url : origin + link.url;
        try {
          const detailRes = await gotoAndExtract(page, detailUrl, {
            code, phase: 'detail', saveDebug: false,
            contentSelector: contentSelectors, timeout: 25000,
          });
          const bodyHtml  = detailRes.selectorHit ? detailRes.html : extractDetailBody(detailRes.html);
          const cleanText = htmlToText(bodyHtml);
          if (cleanText.length > 100 && !isErrorPage(detailRes.html) && !isDomesticNotice(cleanText)) {
            const monthType = classifyNoticeMonth(detectMonthFromText(cleanText), currentMonth, nextMonth);
            console.log(`  ${tag} [browser] ✅ 수집 성공: ${cleanText.length}자 [${monthType}]`);
            await browser.close();
            return { html: bodyHtml, text: cleanText, sourceUrl: detailUrl, monthType, source: 'live' };
          }
        } catch (de) {
          console.log(`  ${tag} [browser] 상세 실패: ${de.message}`);
          await page.goto(listUrl, { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});
          await page.waitForTimeout(1000);
        }
      }

    } catch (listErr) {
      console.log(`  ${tag} [browser] 목록 수집 실패: ${listErr.message}`);
    }

    await browser.close();
    throw new Error(`${code}: override/API/direct/Playwright 모두 실패`);
  } catch (err) {
    await browser.close().catch(() => {});
    throw err;
  }
}

// ─────────────────────────────────────────
// 7C 전용: clickable row 기반
// ─────────────────────────────────────────

async function collect7CPlaywright(page, target, browser, currentMonth, nextMonth) {
  const { listUrl, baseUrl, keywords } = target;
  const tag = '[7C]';
  const TEXT_FILTERS = ['유류할증료', '국제선', '2026'];

  try {
    await gotoAndExtract(page, listUrl, {
      code: '7C', phase: 'list', saveDebug: true, timeout: 30000,
    });

    await Promise.race([
      page.waitForSelector('li, tr, table, .notice, .board, [class*="list"]', { timeout: 4000 }).catch(() => {}),
      page.waitForTimeout(3000),
    ]);
    await page.waitForTimeout(500);

    const finalUrl = page.url();
    const listHtml = await page.content();
    console.log(`  ${tag} [browser] 목록 진입 | URL: ${finalUrl} | HTML: ${listHtml.length}자`);

    if (finalUrl.startsWith('about:') || listHtml.length < 200) {
      throw new Error(`7C: 목록 진입 실패 (URL: ${finalUrl}, HTML: ${listHtml.length}자)`);
    }

    // clickable row 후보 수집
    const ROW_SELECTORS = [
      'li', 'article', 'tr', 'button',
      '[role="link"]', '[role="button"]', '[onclick]',
      'div[class*="list"]', 'div[class*="item"]', 'div[class*="row"]',
      'div[class*="notice"]', 'div[class*="board"]',
    ];

    const rowCandidates = await page.evaluate(({ filters, selectors }) => {
      const seen    = new Set();
      const results = [];
      for (const sel of selectors) {
        let nodes;
        try { nodes = Array.from(document.querySelectorAll(sel)); } catch { continue; }
        for (const el of nodes) {
          const text = (el.textContent || '').trim().replace(/\s+/g, ' ');
          if (!text || text.length < 5 || text.length > 1000) continue;
          const key = text.slice(0, 80);
          if (seen.has(key)) continue;
          let matchScore = 0;
          for (const f of filters) { if (text.includes(f)) matchScore++; }
          if (matchScore === 0) continue;
          seen.add(key);
          const innerA  = el.querySelector('a[href]');
          const href    = innerA ? (innerA.getAttribute('href') || '') : '';
          const onclick = (el.getAttribute('onclick') || '').slice(0, 100);
          results.push({ selector: sel, text: text.slice(0, 200), href, onclick, matchScore });
        }
      }
      return results.sort((a, b) => b.matchScore - a.matchScore);
    }, { filters: TEXT_FILTERS, selectors: ROW_SELECTORS });

    console.log(`  ${tag} [browser] clickable row 후보: ${rowCandidates.length}개`);

    if (rowCandidates.length === 0) {
      // 디버그: DOM 샘플 출력
      console.log(`  ${tag} [browser] ⚠ 후보 0개 — 확장 DOM 분석:`);
      const domSample = await page.evaluate(() =>
        Array.from(document.querySelectorAll('li, tr, article, [class*="notice"], [class*="board"]'))
          .slice(0, 8).map(el => ({
            tag: el.tagName, cls: el.className.slice(0, 60),
            text: (el.textContent || '').trim().slice(0, 80),
          }))
      );
      domSample.forEach((s, i) =>
        console.log(`    DOM[${i}] <${s.tag} class="${s.cls}"> text="${s.text}"`)
      );
      const allHrefs = await page.evaluate(() =>
        Array.from(document.querySelectorAll('a[href]')).map(a => a.getAttribute('href')).filter(Boolean).slice(0, 15)
      );
      console.log(`    a[href] 샘플: ${allHrefs.join(' | ')}`);
      saveDebugArtifacts('7C', 'list', FAIL_TYPE.NO_CANDIDATE_LINK, { html: listHtml, finalUrl });

      throw new Error('7C: clickable row 후보 없음');
    }

    const origin = new URL(listUrl).origin;
    for (const cand of rowCandidates.slice(0, 10)) {
      if (isDomesticNotice(cand.text)) continue;

      let navigated = false;
      let detailHtml = '';
      let detailUrl  = '';

      if (cand.href && isNavigableHref(cand.href)) {
        detailUrl = cand.href.startsWith('http') ? cand.href
          : cand.href.startsWith('//') ? 'https:' + cand.href
          : origin + (cand.href.startsWith('/') ? cand.href : '/' + cand.href);
        try {
          const res = await gotoAndExtract(page, detailUrl, {
            code: '7C', phase: 'detail', saveDebug: false, timeout: 25000,
          });
          detailHtml = res.html;
          detailUrl  = res.finalUrl;
          navigated  = true;
        } catch (e) {
          console.log(`  ${tag} [browser] 상세 goto 실패: ${e.message}`);
        }
      }

      if (!navigated) {
        const matchText = cand.text.slice(0, 20);
        let clicked = false;
        for (const sel of [cand.selector, 'li', 'tr', 'article', '[onclick]', '[role="link"]']) {
          try {
            const loc = page.locator(sel).filter({ hasText: matchText }).first();
            if (await loc.count({ timeout: 1000 }).catch(() => 0) > 0) {
              await loc.click({ force: true, timeout: 5000 });
              clicked = true;
              break;
            }
          } catch { /* 다음 */ }
        }
        if (!clicked) continue;
        await page.waitForTimeout(3000);
        detailHtml = await page.content().catch(() => '');
        detailUrl  = page.url();
        navigated  = true;
      }

      if (!navigated || detailUrl.startsWith('about:') || detailHtml.length < 300) {
        await page.goto(listUrl, { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});
        await page.waitForTimeout(1000);
        continue;
      }

      const cleanText = htmlToText(detailHtml);
      if (
        !isErrorPage(detailHtml) &&
        !isDomesticNotice(cleanText) &&
        (keywords.some(kw => cleanText.includes(kw)) || hasStructuredData(cleanText))
      ) {
        const monthType = classifyNoticeMonth(detectMonthFromText(cleanText), currentMonth, nextMonth);
        console.log(`  ${tag} [browser] ✅ 수집 성공: ${cleanText.length}자 [${monthType}]`);
        await browser.close();
        return { html: detailHtml, text: cleanText, sourceUrl: detailUrl, monthType, source: 'live' };
      }

      console.log(`  ${tag} [browser] 조건 미달 → 복귀`);
      await page.goto(listUrl, { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});
      await page.waitForTimeout(1000);
    }

    await browser.close();
    throw new Error('7C: clickable row 탐색 모두 실패');
  } catch (err) {
    await browser.close().catch(() => {});
    throw err;
  }
}

module.exports = { collectHybrid };
