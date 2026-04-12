'use strict';

const https = require('https');
const http  = require('http');
const zlib  = require('zlib');

function safeReferer(rawUrl) {
  if (!rawUrl) return '';
  try {
    const u = new URL(rawUrl);
    const p = u.pathname.split('/').map(s => encodeURIComponent(decodeURIComponent(s))).join('/');
    const q = u.search
      ? '?' + u.search.slice(1).split('&').map(pair => {
          const [k, v] = pair.split('=');
          return v !== undefined
            ? encodeURIComponent(decodeURIComponent(k || '')) + '=' + encodeURIComponent(decodeURIComponent(v || ''))
            : encodeURIComponent(decodeURIComponent(k || ''));
        }).join('&')
      : '';
    return u.origin + p + q;
  } catch { return ''; }
}

function sanitizeHeaders(headers) {
  const out = {};
  for (const [k, v] of Object.entries(headers)) {
    if (v && /^[\x00-\x7F]*$/.test(v)) out[k] = v;
  }
  return out;
}

/**
 * HTTP/HTTPS fetch with redirect follow, gzip/br/deflate 지원
 * @returns {Promise<{body: string, cookies: string[], status: number, finalUrl: string, redirectChain: string[]}>}
 */
function httpFetch(targetUrl, headers, cookie = '', redirectCount = 0, redirectChain = []) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) return reject(new Error('Too many redirects'));
    let parsed;
    try { parsed = new URL(targetUrl); }
    catch (e) { return reject(new Error('잘못된 URL: ' + targetUrl)); }

    const lib        = parsed.protocol === 'https:' ? https : http;
    const reqHeaders = sanitizeHeaders({ ...headers, ...(cookie ? { Cookie: cookie } : {}) });

    const req = lib.request({
      hostname: parsed.hostname,
      port:     parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
      path:     parsed.pathname + parsed.search,
      method:   'GET',
      headers:  reqHeaders,
      timeout:  20000,
    }, (res) => {
      const setCookies = [].concat(res.headers['set-cookie'] || []);
      const newCookie  = setCookies.map(c => c.split(';')[0]).join('; ');
      const chain      = [...redirectChain, targetUrl];

      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        const nextUrl  = res.headers.location.startsWith('http') ? res.headers.location : parsed.origin + res.headers.location;
        const combined = [cookie, newCookie].filter(Boolean).join('; ');
        return resolve(httpFetch(nextUrl, { ...headers, Referer: safeReferer(targetUrl) }, combined, redirectCount + 1, chain));
      }

      const status = res.statusCode;
      if (status !== 200) {
        res.resume();
        const err = new Error(`HTTP ${status}`);
        err.statusCode = status;
        err.finalUrl   = targetUrl;
        return reject(err);
      }

      const enc    = (res.headers['content-encoding'] || '').toLowerCase();
      let   stream = res;
      if (enc.includes('br'))           { stream = res.pipe(zlib.createBrotliDecompress()); stream.on('error', reject); }
      else if (enc.includes('gzip'))    { stream = res.pipe(zlib.createGunzip());           stream.on('error', reject); }
      else if (enc.includes('deflate')) { stream = res.pipe(zlib.createInflate());           stream.on('error', reject); }
      else res.setEncoding('utf8');

      let body = '';
      stream.on('data', chunk => { body += (typeof chunk === 'string') ? chunk : chunk.toString('utf8'); });
      stream.on('end', () => {
        resolve({ body, cookies: setCookies, status, finalUrl: targetUrl, redirectChain: chain });
      });
    });

    req.on('timeout', () => {
      req.destroy();
      const err = new Error('HTTP timeout 20s');
      err.statusCode = 0;
      reject(err);
    });
    req.on('error', reject);
    req.end();
  });
}

const COMMON_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const BASE_HEADERS = {
  'User-Agent':              COMMON_UA,
  'Accept':                  'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language':         'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
  'Accept-Encoding':         'gzip, deflate, br',
  'Connection':              'keep-alive',
  'Upgrade-Insecure-Requests': '1',
  'Sec-Fetch-Dest':          'document',
  'Sec-Fetch-Mode':          'navigate',
  'Sec-Fetch-Site':          'none',
  'Sec-Fetch-User':          '?1',
  'Cache-Control':           'max-age=0',
};

/**
 * direct fetch: baseUrl warmup → 타겟 fetch
 * @returns {Promise<{body, status, finalUrl, redirectChain}>}
 */
async function directFetch(targetUrl, baseUrl) {
  // Step 1: warmup (쿠키 획득)
  let cookie = '';
  try {
    const warm = await httpFetch(baseUrl, { ...BASE_HEADERS, 'Sec-Fetch-Site': 'none' });
    cookie = warm.cookies.map(c => c.split(';')[0]).join('; ');
  } catch { /* warmup 실패 무시 */ }

  // Step 2: 타겟 fetch
  const result = await httpFetch(targetUrl, {
    ...BASE_HEADERS,
    'Referer':        safeReferer(baseUrl),
    'Sec-Fetch-Site': 'same-origin',
  }, cookie);

  if (!result.body || result.body.trim().length < 100) {
    const err = new Error('empty_body: body 너무 짧음');
    err.statusCode = 0;
    throw err;
  }
  return result;
}

/**
 * JSON API fetch (공개 API 탐색용)
 */
async function apiFetch(apiUrl, baseUrl) {
  const headers = {
    ...BASE_HEADERS,
    'Accept':   'application/json, text/plain, */*',
    'Referer':  safeReferer(baseUrl),
    'Sec-Fetch-Site': 'same-origin',
  };
  const result = await httpFetch(apiUrl, headers);
  if (!result.body || result.body.trim().length < 10) throw new Error('API 응답 비어있음');
  return result;
}

module.exports = { httpFetch, directFetch, apiFetch, safeReferer, sanitizeHeaders, BASE_HEADERS, COMMON_UA };
