'use strict';

const fs   = require('fs');
const path = require('path');

// ─────────────────────────────────────────
// 차단 페이지 판별 키워드
// ─────────────────────────────────────────

const BLOCKED_KEYWORDS = [
  'Access Denied',
  'Verify you are human',
  'Suspicious activity',
  'temporarily unavailable',
  'enable javascript',
  'Please enable JavaScript',
  'DDoS protection',
  'Cloudflare',
  'Bot detection',
  'CAPTCHA',
  '접근이 제한',
  '보안 점검',
];

// ─────────────────────────────────────────
// 실패 타입 정의
// ─────────────────────────────────────────

const FAIL_TYPE = {
  TIMEOUT:           'timeout',
  ABORTED:           'aborted',
  HTTP_403:          'http_403',
  HTTP_401:          'http_401',
  HTTP_404:          'http_404',
  HTTP_OTHER:        'http_other',
  SELECTOR_MISS:     'selector_miss',
  BLOCKED_PAGE:      'blocked_page',
  EMPTY_BODY:        'empty_body',
  JS_SHELL_ONLY:     'js_shell_only',
  NO_CANDIDATE_LINK: 'no_candidate_link',
  PARSE_REJECTED:    'parse_rejected',
  OVERRIDE_FAIL:     'override_fail',
  FETCH_FAIL:        'fetch_fail',
  PLAYWRIGHT_FAIL:   'playwright_fail',
  UNKNOWN:           'unknown',
};

/**
 * HTTP 에러 메시지에서 실패 타입 분류
 */
function classifyFailType(err) {
  const msg = (err?.message || '').toLowerCase();
  const code = err?.statusCode || 0;

  if (code === 403 || msg.includes('403'))            return FAIL_TYPE.HTTP_403;
  if (code === 401 || msg.includes('401'))            return FAIL_TYPE.HTTP_401;
  if (code === 404 || msg.includes('404'))            return FAIL_TYPE.HTTP_404;
  if (code > 0)                                        return FAIL_TYPE.HTTP_OTHER;
  if (msg.includes('timeout'))                         return FAIL_TYPE.TIMEOUT;
  if (msg.includes('aborted') || msg.includes('err_aborted')) return FAIL_TYPE.ABORTED;
  if (msg.includes('empty') || msg.includes('짧음'))  return FAIL_TYPE.EMPTY_BODY;
  return FAIL_TYPE.UNKNOWN;
}

/**
 * HTML이 차단 페이지인지 판별
 */
function isBlockedPage(html) {
  if (!html) return false;
  for (const kw of BLOCKED_KEYWORDS) {
    if (html.includes(kw)) return true;
  }
  return false;
}

/**
 * HTML이 JS 쉘(빈 껍데기)인지 판별
 * - body에 텍스트가 거의 없고 script만 많을 때
 */
function isJsShellOnly(html) {
  if (!html || html.length < 50) return true;
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim();
  return stripped.length < 100 && html.length > 500;
}

/**
 * 디버그 아티팩트 저장
 * @param {string} code - 항공사 코드
 * @param {string} phase - 수집 단계 (override/direct/playwright 등)
 * @param {string} failType - 실패 타입
 * @param {Object} artifacts - { html, screenshot, finalUrl, status, redirectChain }
 * @returns {Object} 저장된 파일 경로들
 */
function saveDebugArtifacts(code, phase, failType, artifacts = {}) {
  const saved = {};
  try {
    const dir = path.join(process.cwd(), 'debug', code);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const ts    = Date.now();
    const base  = `${phase}_${failType}_${ts}`;

    // HTML 스냅샷
    if (artifacts.html) {
      const htmlPath = path.join(dir, `${base}.html`);
      let meta = `<!-- DEBUG ARTIFACT\n`;
      meta += `  airline: ${code}\n`;
      meta += `  phase: ${phase}\n`;
      meta += `  failType: ${failType}\n`;
      meta += `  finalUrl: ${artifacts.finalUrl || 'unknown'}\n`;
      meta += `  status: ${artifacts.status || 'unknown'}\n`;
      meta += `  redirectChain: ${JSON.stringify(artifacts.redirectChain || [])}\n`;
      meta += `  blockedPage: ${isBlockedPage(artifacts.html)}\n`;
      meta += `  jsShellOnly: ${isJsShellOnly(artifacts.html)}\n`;
      meta += `  selectorMiss: ${artifacts.selectorMiss || false}\n`;
      meta += `  timestamp: ${new Date(ts).toISOString()}\n`;
      meta += `-->\n`;
      fs.writeFileSync(htmlPath, meta + artifacts.html, 'utf8');
      saved.htmlPath = htmlPath;
      console.log(`  [${code}] 💾 HTML 스냅샷: debug/${code}/${base}.html`);
    }

    // 스크린샷
    if (artifacts.screenshot) {
      const ssPath = path.join(dir, `${base}.png`);
      fs.writeFileSync(ssPath, artifacts.screenshot);
      saved.screenshotPath = ssPath;
      console.log(`  [${code}] 📷 스크린샷: debug/${code}/${base}.png`);
    }

    // 메타 JSON
    const metaPath = path.join(dir, `${base}.json`);
    fs.writeFileSync(metaPath, JSON.stringify({
      code, phase, failType,
      finalUrl:       artifacts.finalUrl || null,
      status:         artifacts.status || null,
      redirectChain:  artifacts.redirectChain || [],
      blockedPage:    isBlockedPage(artifacts.html || ''),
      jsShellOnly:    isJsShellOnly(artifacts.html || ''),
      selectorMiss:   artifacts.selectorMiss || false,
      blockedKeyword: (artifacts.html || '') ? BLOCKED_KEYWORDS.find(k => (artifacts.html || '').includes(k)) || null : null,
      htmlLength:     (artifacts.html || '').length,
      timestamp:      new Date(ts).toISOString(),
    }, null, 2), 'utf8');
    saved.metaPath = metaPath;

  } catch (e) {
    console.log(`  [${code}] ⚠ 디버그 저장 실패: ${e.message}`);
  }
  return saved;
}

module.exports = {
  FAIL_TYPE,
  BLOCKED_KEYWORDS,
  classifyFailType,
  isBlockedPage,
  isJsShellOnly,
  saveDebugArtifacts,
};
