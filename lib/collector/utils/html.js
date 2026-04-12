'use strict';

const {
  getPipelineMonths,
  detectMonthFromText,
  classifyNoticeMonth,
  isInternationalNotice,
  isDomesticNotice,
  isNavigableHref,
} = require('../../month');

// ─────────────────────────────────────────
// HTML → 텍스트 변환
// ─────────────────────────────────────────

function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<\/tr>/gi, '\n').replace(/<\/td>|<\/th>/gi, '\t').replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#\d+;/g, '').replace(/&[a-z]+;/g, '')
    .replace(/\t{2,}/g, '\t')
    .split('\n').map(l => l.trim()).filter(l => l.length > 0).join('\n');
}

// ─────────────────────────────────────────
// 공지 본문 영역 추출
// ─────────────────────────────────────────

const DETAIL_SELECTORS = [
  'notice-view', 'notice-detail', 'board-view', 'board-detail',
  'view-content', 'article-body', 'content-view', 'post-content',
  'surcharge-wrap', 'cont-box', 'detail-body', 'news-body',
];

/**
 * HTML에서 공지 본문 블록을 추출
 * selector 매칭 → article → table 순
 */
function extractDetailBody(html) {
  // 1) class 기반 div 추출
  for (const cls of DETAIL_SELECTORS) {
    const re  = new RegExp(`<div[^>]+class="[^"]*${cls}[^"]*"[^>]*>`, 'i');
    const idx = html.search(re);
    if (idx >= 0) {
      let depth = 0, i = idx;
      while (i < html.length) {
        if (html[i] === '<') { depth += (html[i+1] === '/') ? -1 : (html[i+1] !== '!') ? 1 : 0; }
        if (depth === 0 && i > idx) break;
        i++;
      }
      const block = html.slice(idx, i + 1);
      if (block.length > 100) return block;
    }
  }
  // 2) article
  const art = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (art && art[1].length > 100) return art[1];
  // 3) 첫 번째 table 영역
  const tIdx = html.toLowerCase().indexOf('<table');
  if (tIdx >= 0) {
    const tEnd = html.toLowerCase().indexOf('</table>', tIdx);
    return html.slice(Math.max(0, tIdx - 600), Math.min(html.length, (tEnd >= 0 ? tEnd : tIdx) + 800));
  }
  return html;
}

// ─────────────────────────────────────────
// 판별 함수들
// ─────────────────────────────────────────

function isErrorPage(html) {
  return /404|페이지를 찾을 수 없|not found|권한 없음|접근 오류|오류가 발생/i.test(html);
}

function isListPage(html) {
  const lower    = html.toLowerCase();
  const hasTable = /<table[\s\S]*?<\/table>/i.test(html);
  const hasPrice = /[\d,]{4,}\s*(?:원|krw)/i.test(html) || /₩\s*[\d,]+/.test(html);
  const hasPaging = /pagination|paging|notice-list|공지\s*목록|board-list|게시판|list-wrap/i.test(lower);
  let score = 0;
  if (!hasTable) score++;
  if (!hasPrice) score++;
  if (hasPaging) score++;
  return score >= 2;
}

function hasStructuredData(text) {
  const hasPrice    = /[\d,]{4,}원|[\d,]{4,}\s*krw|₩[\d,]+/i.test(text);
  const hasDistance = /\d+\s*마일|mile|\d+\s*km|단거리|장거리|미주|동남아|일본\s*노선|유럽/i.test(text);
  return hasPrice && hasDistance;
}

function detectKeywords(html, keywords) {
  const lower   = html.toLowerCase();
  const matched = keywords.filter(k => lower.includes(k.toLowerCase()));
  return { detected: matched.length > 0, matched };
}

// ─────────────────────────────────────────
// 공지 링크 추출 (점수 기반)
// ─────────────────────────────────────────

function extractNoticeLinks(html, baseUrl, keywords) {
  const { currentMonth, nextMonth } = getPipelineMonths();
  const candidates = [];
  const seen       = new Set();

  const anchorRe = /<a[^>]+href=["']([^"']*)['"'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = anchorRe.exec(html)) !== null) {
    const href = m[1].trim();
    const text = m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (!isNavigableHref(href)) continue;
    const textMatch = keywords.some(kw => text.toLowerCase().includes(kw.toLowerCase()));
    const hrefMatch = keywords.some(kw => href.toLowerCase().includes(kw.toLowerCase()));
    if (!textMatch && !hrefMatch) continue;
    if (isDomesticNotice(text)) continue;
    const full = href.startsWith('http') ? href : href.startsWith('//') ? 'https:' + href : baseUrl + (href.startsWith('/') ? href : '/' + href);
    if (seen.has(full)) continue;
    let score = 0;
    if (text.includes('유류할증료'))      score += 5;
    if (isInternationalNotice(text))       score += 4;
    if (/notice|surcharge|fuel|board|detail|view|article/i.test(href)) score += 3;
    if (/\/notice\/\d+/.test(href))        score += 5;
    if (/noticeDetail|noticeid|seq=/i.test(href)) score += 3;
    if (/[?&](id|seq|no|idx)=\d+/i.test(href)) score += 3;
    const detectedM = detectMonthFromText(text);
    const monthType = classifyNoticeMonth(detectedM, currentMonth, nextMonth);
    if (monthType === 'CURRENT') score += 10;
    else if (monthType === 'NEXT') score += 3;
    seen.add(full);
    candidates.push({ url: full, text, score, monthType });
  }

  candidates.sort((a, b) => b.score - a.score);
  return candidates;
}

module.exports = {
  htmlToText,
  extractDetailBody,
  extractNoticeLinks,
  isErrorPage,
  isListPage,
  hasStructuredData,
  detectKeywords,
};
