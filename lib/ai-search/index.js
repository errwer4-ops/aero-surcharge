/**
 * AI-Search Layer — v1 (v28)
 *
 * Level 3: Collector 실패 시 AI가 자동으로 공식 공지를 검색하고,
 * 자동 검증 통과 시에만 등록하는 복구 레이어.
 *
 * 동작 흐름:
 *   Step A: Collector 실패 감지 (source === 'fallback')
 *   Step B: AI 자동 검색 쿼리 생성 + 웹 검색 (Claude web_search tool)
 *   Step C: 후보 필터링 (공식 도메인 + 키워드 + 점수 기반)
 *   Step D: 자동 수집 (fetch, 최대 3후보 시도)
 *   Step E: 자동 파싱 (기존 parser 재사용)
 *   Step F: 자동 검증 (항공사명·월·금액·구간 수 필수 조건)
 *   Step G: 자동 등록 (검증 통과 시만, source = 'ai-search-auto')
 *
 * 핵심 원칙:
 *   - 검증 실패 데이터는 절대 등록 금지
 *   - 애매한 데이터는 버리는 것이 더 안전함
 *   - 전체 처리 시간 30초 제한
 *   - pipeline은 항상 완주 (throw 없음)
 */

'use strict';

const https = require('https');
const http  = require('http');
const zlib  = require('zlib');
const { getPipelineMonths, detectMonthFromText, classifyNoticeMonth } = require('../month');

// ─────────────────────────────────────────
// 상수
// ─────────────────────────────────────────

const AI_SEARCH_TIMEOUT_MS = 30000;  // 전체 처리 시간 제한
const MAX_CANDIDATES       = 3;       // 최대 후보 시도 수
const MAX_FETCH_TIMEOUT_MS = 10000;   // 개별 URL fetch 제한
const MAX_HTML_LEN         = 15000;   // parser 입력 최대 길이
const MAX_TEXT_LEN         = 3000;    // parser 텍스트 최대 길이

// 항공사별 공식 도메인 및 검색 설정
const AIRLINE_SEARCH_CONFIG = {
  KE: {
    name: '대한항공',
    nameEn: 'Korean Air',
    officialDomains: ['koreanair.com'],
    searchQueryKo: (month) => `대한항공 국제선 유류할증료 ${month} site:koreanair.com`,
    searchQueryEn: (month) => `Korean Air fuel surcharge ${month} site:koreanair.com`,
  },
  OZ: {
    name: '아시아나항공',
    nameEn: 'Asiana Airlines',
    officialDomains: ['flyasiana.com'],
    searchQueryKo: (month) => `아시아나항공 유류할증료 ${month} site:flyasiana.com`,
    searchQueryEn: (month) => `Asiana fuel surcharge ${month} site:flyasiana.com`,
  },
  LJ: {
    name: '진에어',
    nameEn: 'Jin Air',
    officialDomains: ['jinair.com'],
    searchQueryKo: (month) => `진에어 유류할증료 ${month} site:jinair.com`,
    searchQueryEn: (month) => `Jin Air fuel surcharge ${month} site:jinair.com`,
  },
  '7C': {
    name: '제주항공',
    nameEn: 'Jeju Air',
    officialDomains: ['jejuair.net'],
    searchQueryKo: (month) => `제주항공 국제선 유류할증료 ${month} site:jejuair.net`,
    searchQueryEn: (month) => `Jeju Air fuel surcharge ${month} site:jejuair.net`,
  },
  TW: {
    name: '티웨이항공',
    nameEn: 'T-way Air',
    officialDomains: ['twayair.com'],
    searchQueryKo: (month) => `티웨이항공 유류할증료 ${month} site:twayair.com`,
    searchQueryEn: (month) => `T-way Air fuel surcharge ${month} site:twayair.com`,
  },
  BX: {
    name: '에어부산',
    nameEn: 'Air Busan',
    officialDomains: ['airbusan.com'],
    searchQueryKo: (month) => `에어부산 유류할증료 ${month} site:airbusan.com`,
    searchQueryEn: (month) => `Air Busan fuel surcharge ${month} site:airbusan.com`,
  },
  YP: {
    name: '에어프레미아',
    nameEn: 'Air Premia',
    officialDomains: ['airpremia.com'],
    searchQueryKo: (month) => `에어프레미아 유류할증료 ${month} site:airpremia.com`,
    searchQueryEn: (month) => `Air Premia fuel surcharge ${month} site:airpremia.com`,
  },
  ZE: {
    name: '이스타항공',
    nameEn: 'Eastar Jet',
    officialDomains: ['eastarjet.com'],
    searchQueryKo: (month) => `이스타항공 유류할증료 ${month} site:eastarjet.com`,
    searchQueryEn: (month) => `Eastar Jet fuel surcharge ${month} site:eastarjet.com`,
  },
  RS: {
    name: '에어서울',
    nameEn: 'Air Seoul',
    officialDomains: ['flyairseoul.com'],
    searchQueryKo: (month) => `에어서울 유류할증료 ${month} site:flyairseoul.com`,
    searchQueryEn: (month) => `Air Seoul fuel surcharge ${month} site:flyairseoul.com`,
  },
};

// URL 패턴 점수
const URL_PATTERN_SCORES = [
  { pattern: /notice/i,   score: 3 },
  { pattern: /announce/i, score: 3 },
  { pattern: /board/i,    score: 2 },
  { pattern: /news/i,     score: 2 },
  { pattern: /surcharge/i,score: 4 },
  { pattern: /fuel/i,     score: 3 },
  { pattern: /\d{4,}/,    score: 2 }, // 게시글 ID 숫자
];

// ─────────────────────────────────────────
// 로그 헬퍼
// ─────────────────────────────────────────

function log(code, msg) {
  console.log(`[AI-SEARCH][${code}] ${msg}`);
}

// ─────────────────────────────────────────
// Step A: Collector 실패 감지
// ─────────────────────────────────────────

/**
 * fallback 상태인 항공사만 반환.
 * 조건: source === 'fallback' (live 수집 실패 또는 fallback만 존재)
 */
function detectFailed(collected) {
  return collected.filter(c => c.source === 'fallback');
}

// ─────────────────────────────────────────
// Step B: AI 자동 검색
// ─────────────────────────────────────────

/**
 * Claude API의 web_search tool을 사용해 공식 공지 URL 후보를 수집.
 * 검색 쿼리를 생성하고, 결과에서 URL + 제목 + 스니펫을 추출.
 *
 * @param {string} code - 항공사 코드
 * @param {string} targetMonth - "YYYY.MM" 형식
 * @returns {Promise<Array<{url, title, snippet}>>}
 */
async function aiSearch(code, targetMonth) {
  const config = AIRLINE_SEARCH_CONFIG[code];
  if (!config) {
    log(code, `검색 설정 없음 → 건너뜀`);
    return [];
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    log(code, `ANTHROPIC_API_KEY 없음 → 검색 불가`);
    return [];
  }

  // 월 표현: "2026.05" → "2026년 5월" + "May 2026"
  const [year, mon] = targetMonth.split('.');
  const monthKo = `${year}년 ${parseInt(mon, 10)}월`;
  const monthEn = new Date(parseInt(year), parseInt(mon, 10) - 1, 1)
    .toLocaleString('en-US', { month: 'long', year: 'numeric' });

  const queryKo = config.searchQueryKo(monthKo);
  const queryEn = config.searchQueryEn(monthEn);

  log(code, `검색 쿼리 KO: "${queryKo}"`);
  log(code, `검색 쿼리 EN: "${queryEn}"`);

  const systemPrompt = `당신은 항공사 유류할증료 공지 URL을 찾는 검색 도우미입니다.
web_search 도구를 사용해 주어진 검색어로 검색하고, 공식 항공사 웹사이트에 있는 유류할증료 공지 URL을 찾아주세요.
결과는 반드시 아래 JSON 형식으로만 출력하세요 (마크다운, 설명 없이):
[
  {"url": "https://...", "title": "공지 제목", "snippet": "본문 요약"},
  ...
]
URL이 없으면 빈 배열 []을 반환하세요.`;

  const userContent = `다음 두 검색어로 각각 검색하고, 유류할증료 공지 URL을 최대 5개 찾아주세요:
1. ${queryKo}
2. ${queryEn}

중복 URL은 하나만 포함하세요.`;

  const body = JSON.stringify({
    model:      'claude-sonnet-4-6',
    max_tokens: 1000,
    system:     systemPrompt,
    messages:   [{ role: 'user', content: userContent }],
    tools: [
      {
        type: 'web_search_20250305',
        name: 'web_search',
      },
    ],
  });

  return new Promise((resolve) => {
    const options = {
      hostname: 'api.anthropic.com',
      path:     '/v1/messages',
      method:   'POST',
      timeout:  15000,
      headers: {
        'Content-Type':      'application/json',
        'x-api-key':         apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-beta':    'web-search-2025-03-05',
        'Content-Length':    Buffer.byteLength(body),
      },
    };

    let data = '';
    const req = https.request(options, (res) => {
      res.setEncoding('utf8');
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode !== 200) {
            log(code, `AI 검색 API 오류 HTTP ${res.statusCode}: ${parsed.error?.message || '알 수 없음'}`);
            return resolve([]);
          }

          // content 블록에서 text 타입만 추출
          const textBlocks = (parsed.content || [])
            .filter(b => b.type === 'text')
            .map(b => b.text)
            .join('');

          log(code, `AI 검색 응답 수신 (${textBlocks.length}자)`);

          // JSON 파싱 시도
          const jsonMatch = textBlocks.match(/\[[\s\S]*\]/);
          if (!jsonMatch) {
            log(code, `AI 검색 결과 JSON 없음`);
            return resolve([]);
          }

          const results = JSON.parse(jsonMatch[0]);
          log(code, `AI 검색 결과: ${results.length}개 URL 후보`);
          results.forEach((r, i) =>
            log(code, `  후보[${i}]: ${r.url} | "${(r.title || '').slice(0, 50)}"`)
          );

          resolve(Array.isArray(results) ? results : []);
        } catch (e) {
          log(code, `AI 검색 응답 파싱 실패: ${e.message}`);
          resolve([]);
        }
      });
    });

    req.on('timeout', () => { req.destroy(); resolve([]); });
    req.on('error', (e) => { log(code, `AI 검색 요청 오류: ${e.message}`); resolve([]); });
    req.write(body);
    req.end();
  });
}

// ─────────────────────────────────────────
// Step C: 후보 필터링
// ─────────────────────────────────────────

/**
 * 검색 결과를 점수 기반으로 필터링.
 * 최소 조건: 공식 도메인 + 유류할증료 키워드
 *
 * @param {string} code
 * @param {Array<{url, title, snippet}>} rawResults
 * @param {string} targetMonth
 * @returns {Array<{url, title, snippet, score}>} 점수 내림차순 정렬
 */
function filterCandidates(code, rawResults, targetMonth) {
  const config = AIRLINE_SEARCH_CONFIG[code];
  if (!config || !rawResults.length) return [];

  const [year, mon] = targetMonth.split('.');
  const monthKo = `${parseInt(mon, 10)}월`;
  const monthEn = new Date(parseInt(year), parseInt(mon, 10) - 1, 1)
    .toLocaleString('en-US', { month: 'long' });

  const FUEL_KEYWORDS = ['유류할증료', '유류 할증료', 'fuel surcharge', 'YQ', 'YR'];

  const scored = rawResults.map(r => {
    const url     = (r.url     || '').toLowerCase();
    const title   = (r.title   || '');
    const snippet = (r.snippet || '');
    const combined = `${title} ${snippet}`.toLowerCase();

    // ── 필수 조건 1: 공식 도메인 ──
    const isOfficial = config.officialDomains.some(d => url.includes(d));
    if (!isOfficial) {
      log(code, `  후보 폐기 (비공식 도메인): ${r.url}`);
      return null;
    }

    // ── 필수 조건 2: 유류할증료 키워드 ──
    const hasKeyword = FUEL_KEYWORDS.some(kw => combined.includes(kw.toLowerCase()));
    if (!hasKeyword) {
      log(code, `  후보 폐기 (키워드 없음): ${r.url}`);
      return null;
    }

    // ── 점수 계산 ──
    let score = 10; // 기본점수 (공식 도메인 + 키워드 통과)

    // URL 패턴 점수
    for (const { pattern, score: s } of URL_PATTERN_SCORES) {
      if (pattern.test(url)) score += s;
    }

    // 제목에 유류할증료
    if (/유류할증료|fuel surcharge/i.test(title)) score += 5;

    // 월 정보 포함
    if (combined.includes(monthKo) || combined.toLowerCase().includes(monthEn.toLowerCase())) score += 4;

    // 연도 포함
    if (combined.includes(year)) score += 2;

    // 본문에 금액/표 존재 힌트
    if (/\d{2,3},\d{3}|₩\d+|원/.test(snippet)) score += 3;
    if (/마일|mile|구간|노선/.test(snippet))     score += 2;

    return { ...r, score };
  }).filter(Boolean);

  scored.sort((a, b) => b.score - a.score);

  log(code, `후보 필터링 결과: ${rawResults.length}개 → ${scored.length}개 통과`);
  scored.forEach((c, i) =>
    log(code, `  통과[${i}] score=${c.score}: ${c.url}`)
  );

  return scored;
}

// ─────────────────────────────────────────
// Step D: 자동 수집 (HTTP fetch)
// ─────────────────────────────────────────

/**
 * URL에서 HTML 획득. 실패 시 null 반환.
 */
function fetchHtml(targetUrl) {
  return new Promise((resolve) => {
    let parsed;
    try { parsed = new URL(targetUrl); }
    catch { return resolve(null); }

    const lib = parsed.protocol === 'https:' ? https : http;
    const headers = {
      'User-Agent':      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
    };

    const req = lib.request({
      hostname: parsed.hostname,
      port:     parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
      path:     parsed.pathname + parsed.search,
      method:   'GET',
      headers,
      timeout:  MAX_FETCH_TIMEOUT_MS,
    }, (res) => {
      // 리다이렉트 처리 (1회만)
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        const next = res.headers.location.startsWith('http')
          ? res.headers.location
          : parsed.origin + res.headers.location;
        return fetchHtml(next).then(resolve);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return resolve(null);
      }

      const enc    = (res.headers['content-encoding'] || '').toLowerCase();
      let   stream = res;
      if (enc.includes('br'))           { stream = res.pipe(zlib.createBrotliDecompress()); stream.on('error', () => resolve(null)); }
      else if (enc.includes('gzip'))    { stream = res.pipe(zlib.createGunzip());           stream.on('error', () => resolve(null)); }
      else if (enc.includes('deflate')) { stream = res.pipe(zlib.createInflate());           stream.on('error', () => resolve(null)); }
      else res.setEncoding('utf8');

      let body = '';
      stream.on('data', chunk => { body += typeof chunk === 'string' ? chunk : chunk.toString('utf8'); });
      stream.on('end', () => {
        if (!body || body.trim().length < 200) return resolve(null);
        resolve(body);
      });
    });

    req.on('timeout', () => { req.destroy(); resolve(null); });
    req.on('error',   () => resolve(null));
    req.end();
  });
}

/**
 * 최대 MAX_CANDIDATES개 후보 URL을 순서대로 시도, 최초 성공 시 반환.
 *
 * @returns {{ html: string, sourceUrl: string } | null}
 */
async function fetchFromCandidates(code, candidates) {
  for (let i = 0; i < Math.min(candidates.length, MAX_CANDIDATES); i++) {
    const url = candidates[i].url;
    log(code, `HTML 수집 시도 [${i + 1}/${Math.min(candidates.length, MAX_CANDIDATES)}]: ${url}`);
    const html = await fetchHtml(url);
    if (html) {
      log(code, `HTML 수집 성공: ${html.length}자 (${url})`);
      return { html, sourceUrl: url };
    }
    log(code, `HTML 수집 실패: ${url}`);
  }
  log(code, `모든 후보 HTML 수집 실패`);
  return null;
}

// ─────────────────────────────────────────
// Step E: 자동 파싱 (기존 parser 재사용)
// ─────────────────────────────────────────

/**
 * HTML 전처리: script/style/nav/footer 제거 + 길이 제한
 */
function cleanHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s{3,}/g, '  ')
    .slice(0, MAX_HTML_LEN);
}

/**
 * HTML → 평문 텍스트
 */
function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<\/tr>/gi, '\n').replace(/<\/td>|<\/th>/gi, '\t').replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&#\d+;/g, '').replace(/&[a-z]+;/g, '')
    .replace(/\t{2,}/g, '\t')
    .split('\n').map(l => l.trim()).filter(l => l.length > 0).join('\n');
}

/**
 * Anthropic API를 직접 호출해 HTML을 파싱.
 * parser/index.js의 PARSE_SYSTEM_PROMPT와 동일한 지침 사용.
 *
 * @returns {object|null} parsed JSON 또는 null
 */
async function parseHtmlWithAI(code, html, sourceUrl) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const cleanedHtml = cleanHtml(html);
  const text = htmlToText(cleanedHtml);
  const truncText = text.length > MAX_TEXT_LEN
    ? text.slice(0, MAX_TEXT_LEN) + '\n...(생략)'
    : text;

  log(code, `파싱 시작: HTML ${html.length}자 → 전처리 ${cleanedHtml.length}자 | 텍스트 ${truncText.length}자`);

  const systemPrompt = `당신은 항공사 유류할증료 공지 문서를 파싱하는 전문 파서입니다.

[역할]
- 공지 문서에서 거리구간/노선별 유류할증료를 전부 추출
- 반드시 문서에 명시된 값만 사용

[절대 금지]
- 수치 추정 또는 생성 금지
- 여러 값을 평균·대표값으로 합치기 금지
- 문서에 없는 구간 추가 금지
- 금액이 불명확하면 null로 처리 (추측 금지)

[출력 형식 — 반드시 이 JSON만 출력, 마크다운/설명 없이]
{
  "effective_month": "YYYY.MM 형식, 없으면 null",
  "currency": "KRW 또는 USD 또는 JPY, 없으면 null",
  "routes": [
    {
      "route_type": "노선 또는 거리구간 설명",
      "distance_range": "거리 범위 문자열 (예: 0-500, 500-1000)",
      "amount": 숫자 (원 단위 정수) 또는 null,
      "confidence_note": "파싱 신뢰도 한 줄 메모"
    }
  ],
  "summary": "공지 요약 1~2줄 (한국어)",
  "parse_warning": "파싱 중 문제 있으면 설명, 없으면 null"
}

[규칙]
- 테이블의 각 행이 별도 route가 됨
- 거리구간이 명시된 경우 distance_range에 기록
- 편도 기준 금액만 추출`.trim();

  const body = JSON.stringify({
    model:      'claude-sonnet-4-6',
    max_tokens: 1500,
    system:     systemPrompt,
    messages:   [{ role: 'user', content: `다음 항공사 공지 HTML을 파싱해주세요:\n\n${cleanedHtml}\n\n---텍스트 추출본---\n${truncText}` }],
  });

  return new Promise((resolve) => {
    const options = {
      hostname: 'api.anthropic.com',
      path:     '/v1/messages',
      method:   'POST',
      timeout:  20000,
      headers: {
        'Content-Type':      'application/json',
        'x-api-key':         apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Length':    Buffer.byteLength(body),
      },
    };

    let data = '';
    const req = https.request(options, (res) => {
      res.setEncoding('utf8');
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode !== 200) {
            log(code, `파싱 API 오류 HTTP ${res.statusCode}`);
            return resolve(null);
          }
          const text = (parsed.content || []).find(c => c.type === 'text')?.text || '';
          if (!text) { log(code, `파싱 AI 응답 없음`); return resolve(null); }

          // JSON 파싱
          let clean = text.replace(/```json|```/g, '').trim();
          const jsonResult = JSON.parse(clean);
          log(code, `파싱 완료: ${jsonResult.routes?.length || 0}개 구간, month=${jsonResult.effective_month}`);
          resolve(jsonResult);
        } catch (e) {
          log(code, `파싱 결과 JSON 오류: ${e.message}`);
          resolve(null);
        }
      });
    });

    req.on('timeout', () => { req.destroy(); resolve(null); });
    req.on('error',   (e) => { log(code, `파싱 요청 오류: ${e.message}`); resolve(null); });
    req.write(body);
    req.end();
  });
}

// ─────────────────────────────────────────
// Step F: 자동 검증 (핵심)
// ─────────────────────────────────────────

/**
 * 파싱 결과가 등록 기준을 충족하는지 검증.
 * 실패 시 이유를 명확히 반환.
 *
 * 필수 조건:
 *   1. 항공사명 일치
 *   2. 현재월 또는 다음월 데이터 포함
 *   3. 금액 또는 거리 구간 존재
 *   4. 최소 2개 이상의 노선/구간 정보
 *
 * 추가 검증:
 *   - 금액이 비정상 값이 아닌지 (0원, 999999 등)
 *   - 통화 일관성
 *
 * @returns {{ passed: boolean, reason: string }}
 */
function validateParseResult(code, parseResult, rawHtml, targetMonth) {
  const config = AIRLINE_SEARCH_CONFIG[code];
  if (!parseResult) {
    return { passed: false, reason: '파싱 결과 없음' };
  }

  const routes    = parseResult.routes || [];
  const currency  = parseResult.currency || 'KRW';
  const effMonth  = parseResult.effective_month || '';
  const { currentMonth, nextMonth } = getPipelineMonths();

  // ── 조건 1: 항공사명 일치 ──
  const htmlText = htmlToText(rawHtml).slice(0, 2000);
  const hasName  = config
    ? htmlText.includes(config.name) || htmlText.includes(config.nameEn)
    : false;
  if (!hasName) {
    return { passed: false, reason: `항공사명 미확인 (기대: ${config?.name})` };
  }

  // ── 조건 2: 현재월 또는 다음월 데이터 포함 ──
  const monthInRange = [currentMonth, nextMonth].some(m => {
    if (!m || !effMonth) return false;
    // "2026.05" 형식 비교
    return effMonth.replace(/[^0-9]/g, '').slice(0, 6) === m.replace(/[^0-9]/g, '').slice(0, 6);
  });
  // 파싱 월이 없는 경우: HTML에서 직접 탐지
  const detectedMonth = detectMonthFromText(htmlText);
  const monthTypeRaw  = detectedMonth
    ? classifyNoticeMonth(detectedMonth, currentMonth, nextMonth)
    : 'UNKNOWN';
  const monthOk = monthInRange || monthTypeRaw === 'CURRENT' || monthTypeRaw === 'NEXT';

  if (!monthOk) {
    return {
      passed: false,
      reason: `월 데이터 범위 밖 (effective_month=${effMonth}, detected=${detectedMonth}, current=${currentMonth}, next=${nextMonth})`,
    };
  }

  // ── 조건 3: 금액 또는 거리 구간 존재 ──
  const validRoutes = routes.filter(r => r.amount !== null && r.amount !== undefined);
  if (validRoutes.length === 0) {
    return { passed: false, reason: '금액 있는 구간 없음' };
  }

  // ── 조건 4: 최소 2개 이상 구간 ──
  if (validRoutes.length < 2) {
    return { passed: false, reason: `구간 수 부족 (${validRoutes.length}개, 최소 2개 필요)` };
  }

  // ── 추가 검증: 비정상 금액 ──
  const AMOUNT_RANGES = {
    KRW: { min: 1000,  max: 1000000 },
    USD: { min: 1,     max: 1000    },
    JPY: { min: 100,   max: 100000  },
  };
  const range = AMOUNT_RANGES[currency] || AMOUNT_RANGES.KRW;
  const anomalies = validRoutes.filter(r => r.amount <= 0 || r.amount < range.min || r.amount > range.max);
  if (anomalies.length > 0) {
    return {
      passed: false,
      reason: `비정상 금액 감지: ${anomalies.map(r => `${r.route_type}=${r.amount}`).join(', ')}`,
    };
  }

  // ── 추가 검증: 통화 일관성 ──
  const currencies = [...new Set(validRoutes.map(r => r.currency || currency).filter(Boolean))];
  if (currencies.length > 1) {
    return { passed: false, reason: `통화 불일치: ${currencies.join(', ')}` };
  }

  return { passed: true, reason: `검증 통과 (${validRoutes.length}구간, ${currency}, month=${effMonth || detectedMonth})` };
}

// ─────────────────────────────────────────
// Step G: 자동 등록 결과 조립
// ─────────────────────────────────────────

/**
 * 검증 통과 시 collectResult 형식으로 결과를 조립.
 * source = 'ai-search-auto' 로 표시.
 */
function buildAutoResult(code, name, parseResult, html, sourceUrl) {
  const { currentMonth, nextMonth } = getPipelineMonths();
  const text = htmlToText(html);
  const detectedMonth = parseResult.effective_month || detectMonthFromText(text);
  const monthType     = detectedMonth
    ? classifyNoticeMonth(detectedMonth, currentMonth, nextMonth)
    : 'UNKNOWN';

  return {
    // collector result 호환 필드
    code,
    name,
    sourceUrl,
    rawHtml:       html,
    text,
    detected:      true,
    matched:       ['유류할증료'],
    source:        'ai-search-auto',
    fetchedAt:     new Date().toISOString(),
    error:         null,
    detectedMonth,
    monthType,

    // parser result (parseAll 없이 직접 주입)
    _parsedDirect: {
      airline:          code,
      source_url:       sourceUrl,
      effective_month:  parseResult.effective_month,
      currency:         parseResult.currency || 'KRW',
      routes:           parseResult.routes   || [],
      summary:          parseResult.summary  || null,
      parse_warning:    parseResult.parse_warning || null,
      parsedAt:         new Date().toISOString(),
      usedMock:         false,
      aiSearchAuto:     true,
    },
  };
}

// ─────────────────────────────────────────
// 메인: runAiSearch
// ─────────────────────────────────────────

/**
 * Collector 결과 배열을 받아 fallback 항공사에 대해 AI 자동 검색을 수행.
 * 검증 통과 시 해당 항공사의 collected 엔트리를 ai-search-auto 결과로 교체.
 *
 * 전체 처리 시간은 AI_SEARCH_TIMEOUT_MS(30초) 이내.
 * 실패해도 throw 없이 기존 collected 배열 그대로 반환.
 *
 * @param {Array} collected - collectAll() 반환값
 * @returns {Promise<Array>} - 업데이트된 collected 배열 (원본 변형 없음)
 */
async function runAiSearch(collected) {
  console.log('\n[AI-SEARCH] === Level 3 AI 자동 검색 시작 ===');

  const failedList = detectFailed(collected);
  if (failedList.length === 0) {
    console.log('[AI-SEARCH] fallback 항공사 없음 → 건너뜀');
    return collected;
  }

  const failedCodes = failedList.map(c => c.code);
  console.log(`[AI-SEARCH] 복구 대상: ${failedCodes.join(', ')} (${failedList.length}개)`);

  // 결과 복사 (원본 불변)
  const result = collected.map(c => ({ ...c }));

  const { currentMonth, nextMonth } = getPipelineMonths();
  const targetMonth = currentMonth; // 기본: 현재월 기준 검색

  // 전체 30초 제한
  const globalDeadline = Date.now() + AI_SEARCH_TIMEOUT_MS;

  for (const failed of failedList) {
    const code   = failed.code;
    const config = AIRLINE_SEARCH_CONFIG[code];
    if (!config) {
      log(code, `설정 없음 → 건너뜀`);
      continue;
    }

    // 시간 초과 확인
    if (Date.now() >= globalDeadline) {
      log(code, `전체 처리 시간 초과 (${AI_SEARCH_TIMEOUT_MS / 1000}s) → 중단`);
      break;
    }

    log(code, `--- 복구 시작 ---`);

    try {
      // ── Step B: AI 자동 검색 ──
      const rawResults = await aiSearch(code, targetMonth);
      if (!rawResults.length) {
        log(code, `검색 결과 없음 → fallback 유지`);
        log(code, `등록 안 함 (후보 없음)`);
        continue;
      }

      // ── Step C: 후보 필터링 ──
      const candidates = filterCandidates(code, rawResults, targetMonth);
      if (!candidates.length) {
        log(code, `필터링 후 후보 없음 → fallback 유지`);
        log(code, `등록 안 함 (필터 탈락)`);
        continue;
      }

      log(code, `선택 URL: ${candidates[0].url}`);

      // ── Step D: 자동 수집 ──
      const fetched = await fetchFromCandidates(code, candidates);
      if (!fetched) {
        log(code, `HTML 확보 실패 → fallback 유지`);
        log(code, `등록 안 함 (HTML 수집 실패)`);
        continue;
      }

      // ── Step E: 자동 파싱 ──
      const parseResult = await parseHtmlWithAI(code, fetched.html, fetched.sourceUrl);
      if (!parseResult) {
        log(code, `파싱 실패 → fallback 유지`);
        log(code, `등록 안 함 (파싱 실패)`);
        continue;
      }

      const routeCount  = parseResult.routes?.length || 0;
      const validCount  = (parseResult.routes || []).filter(r => r.amount !== null).length;
      log(code, `파싱 결과 요약: ${routeCount}구간 (유효금액 ${validCount}개), month=${parseResult.effective_month}, warn=${parseResult.parse_warning || '없음'}`);

      // ── Step F: 자동 검증 ──
      const validation = validateParseResult(code, parseResult, fetched.html, targetMonth);
      log(code, `검증 결과: ${validation.passed ? '✅ 통과' : '❌ 실패'} — ${validation.reason}`);

      if (!validation.passed) {
        log(code, `등록 안 함 (검증 실패: ${validation.reason})`);
        continue;
      }

      // ── Step G: 자동 등록 ──
      const autoResult = buildAutoResult(code, config.name, parseResult, fetched.html, fetched.sourceUrl);
      const idx        = result.findIndex(c => c.code === code);
      if (idx !== -1) {
        result[idx] = autoResult;
        log(code, `✅ 자동 등록 완료 (source=ai-search-auto, url=${fetched.sourceUrl})`);
      }

    } catch (err) {
      log(code, `복구 중 예외: ${err.message} → fallback 유지`);
      log(code, `등록 안 함 (예외 발생)`);
    }
  }

  const autoCount = result.filter(c => c.source === 'ai-search-auto').length;
  console.log(`[AI-SEARCH] === 완료: ai-search-auto ${autoCount}개 등록 ===\n`);
  return result;
}

module.exports = { runAiSearch, detectFailed, filterCandidates, validateParseResult };
