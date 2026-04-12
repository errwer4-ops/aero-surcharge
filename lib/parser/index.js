/**
 * Parser Layer — v3 (v27)
 *
 * v3 핵심 변경 (v2 → v3):
 *   [Timeout] Anthropic API 호출 25초 hard timeout (이중 보호)
 *   [병렬 격리] parseAll → Promise.allSettled (단일 hang이 전체 멈춤 방지)
 *   [입력 전처리] script/style/nav/footer 제거 + 길이 제한 강화
 *   [상세 로그] 입력 크기 / API 요청 시작 / 응답 수신 / JSON 파싱 완료
 *   [skip-llm] SKIP_LLM=true 또는 --skip-llm 으로 API 호출 전체 건너뜀
 */

'use strict';

const https = require('https');
const { getPipelineMonths, detectMonthFromText, classifyNoticeMonth } = require('../month');

const DISTANCE_BANDS = [
  { key: 'D0_500',     label: '500마일 미만',    range: '0-500',    maxMile: 500   },
  { key: 'D500_1000',  label: '500~1,000마일',   range: '500-1000', maxMile: 1000  },
  { key: 'D1000_1500', label: '1,000~1,500마일', range: '1000-1500',maxMile: 1500  },
  { key: 'D1500_2000', label: '1,500~2,000마일', range: '1500-2000',maxMile: 2000  },
  { key: 'D2000_3000', label: '2,000~3,000마일', range: '2000-3000',maxMile: 3000  },
  { key: 'D3000_4000', label: '3,000~4,000마일', range: '3000-4000',maxMile: 4000  },
  { key: 'D4000_5000', label: '4,000~5,000마일', range: '4000-5000',maxMile: 5000  },
  { key: 'D5000_6500', label: '5,000~6,500마일', range: '5000-6500',maxMile: 6500  },
  { key: 'D6500_',     label: '6,500마일 이상',  range: '6500+',    maxMile: 99999 },
];

const MAX_HTML_LEN   = 15000;
const MAX_TEXT_LEN   = 3000;
const API_TIMEOUT_MS = 25000;

const PARSE_SYSTEM_PROMPT = `
당신은 항공사 유류할증료 공지 문서를 파싱하는 전문 파서입니다.
대상: 한국 출발 국제선 유류할증료(YR)만 처리합니다.

[역할]
- 공지 문서에서 거리구간/노선별 유류할증료를 전부 추출
- 반드시 문서에 명시된 값만 사용

[절대 금지]
- 수치 추정 또는 생성 금지
- 여러 값을 평균·대표값으로 합치기 금지
- 문서에 없는 구간 추가 금지
- 금액이 불명확하면 null로 처리 (추측 금지)
- 해외 출발, 국내선, 화물 데이터 포함 금지

[출력 형식 — 반드시 이 JSON만 출력, 마크다운/설명 없이]
{
  "effective_month": "YYYY.MM 형식, 없으면 null",
  "currency": "KRW 또는 USD 또는 JPY, 없으면 null",
  "departure": "KR",
  "routes": [
    {
      "route_type": "노선 또는 거리구간 설명 (원문 그대로)",
      "region": "일본|중국|동남아|미주|유럽|중동|호주|하와이|기타 중 하나, 거리구간만 있으면 null",
      "distance_range": "거리 범위 문자열 (예: 0-500, 500-1000), 없으면 null",
      "amount": 숫자 (원 단위 정수) 또는 null,
      "confidence_note": "파싱 신뢰도 한 줄 메모"
    }
  ],
  "summary": "공지 요약 1~2줄 (한국어)",
  "parse_warning": "파싱 중 문제 있으면 설명, 없으면 null"
}

[region 매핑 규칙]
- 일본: 일본, 도쿄, 오사카, 후쿠오카
- 중국: 중국, 베이징, 상하이, 광저우
- 동남아: 동남아, 태국, 베트남, 필리핀, 싱가포르, 말레이시아
- 미주: 미주, 미국, 캐나다, 뉴욕, LA
- 유럽: 유럽, 영국, 프랑스, 독일
- 중동: 중동, 두바이, 카타르
- 호주: 호주, 시드니
- 하와이: 하와이, 호놀룰루

[규칙]
- 테이블의 각 행이 별도 route가 됨
- 거리구간이 명시된 경우 distance_range에 기록
- 편도 기준 금액만 추출
- departure는 항상 KR
`.trim();

// ── 입력 HTML 전처리 ──────────────────────
function cleanInputHtml(html) {
  if (!html) return '';
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

// ── Anthropic API 호출 (25초 hard timeout) ──
function callClaudeAPI(systemPrompt, userContent) {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return reject(new Error('ANTHROPIC_API_KEY 없음'));

    const body = JSON.stringify({
      model:      'claude-sonnet-4-6',
      max_tokens: 1500,
      messages:   [{ role: 'user', content: userContent }],
      system:     systemPrompt,
    });

    let aborted  = false;
    let req; // 선언 먼저

    // 25초 hard kill
    const hardTimer = setTimeout(() => {
      aborted = true;
      if (req) req.destroy(new Error('hard-timeout'));
    }, API_TIMEOUT_MS);

    const options = {
      hostname: 'api.anthropic.com',
      path:     '/v1/messages',
      method:   'POST',
      timeout:  API_TIMEOUT_MS + 5000,
      headers:  {
        'Content-Type':      'application/json',
        'x-api-key':         apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Length':    Buffer.byteLength(body),
      },
    };

    req = https.request(options, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        clearTimeout(hardTimer);
        if (aborted) return;
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode !== 200) {
            const msg   = parsed.error?.message || `HTTP ${res.statusCode}`;
            const label = res.statusCode === 429 ? `[rate-limit] ${msg}` : `[HTTP ${res.statusCode}] ${msg}`;
            return reject(new Error(label));
          }
          const text = (parsed.content || []).find(c => c.type === 'text')?.text || '';
          if (!text) return reject(new Error('AI 응답에 text 없음'));
          resolve(text);
        } catch (e) {
          reject(new Error('응답 JSON 파싱 실패: ' + e.message));
        }
      });
    });

    req.on('timeout', () => {
      clearTimeout(hardTimer);
      req.destroy();
      reject(new Error('Anthropic API 소켓 timeout'));
    });
    req.on('error', (err) => {
      clearTimeout(hardTimer);
      if (aborted) {
        reject(new Error(`Anthropic API hard timeout (${API_TIMEOUT_MS / 1000}s)`));
      } else {
        reject(new Error('네트워크 오류: ' + err.message));
      }
    });

    req.write(body);
    req.end();
  });
}

function safeParseJson(text) {
  try {
    return JSON.parse(text.replace(/```json\n?|\n?```/g, '').trim());
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) { try { return JSON.parse(match[0]); } catch { /* 무시 */ } }
    return null;
  }
}

function htmlToTableText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<\/tr>/gi, '\n')
    .replace(/<\/td>|<\/th>/gi, '\t')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/\t\t+/g, '\t')
    .split('\n').map(l => l.trim()).filter(Boolean).join('\n');
}

function extractRouteRows(tableText) {
  const rows  = [];
  const lines = tableText.split('\n').map(l => l.trim()).filter(Boolean);
  for (const line of lines) {
    const amountWithWon = line.match(/(\d{1,3}(?:,\d{3})+)원/);
    const tabCells      = line.split('\t');
    const lastCell      = tabCells.length > 1 ? tabCells[tabCells.length - 1].trim() : null;
    const tabAmount     = lastCell ? lastCell.match(/^(\d{1,3}(?:,\d{3})+)$/) : null;

    let amount = null, amountStr = '';
    if (amountWithWon) {
      amountStr = amountWithWon[1];
      amount    = parseInt(amountStr.replace(/,/g, ''), 10);
    } else if (tabAmount && tabCells.length >= 2) {
      amountStr = tabAmount[1];
      amount    = parseInt(amountStr.replace(/,/g, ''), 10);
    } else {
      continue;
    }
    if (isNaN(amount) || amount < 5000 || amount > 1000000) continue;

    let labelPart;
    if (tabCells.length >= 2) {
      labelPart = tabCells.slice(0, tabCells.length - 1).join(' ').trim();
    } else if (amountWithWon) {
      labelPart = line.slice(0, line.indexOf(amountWithWon[0])).trim();
    } else {
      labelPart = '';
    }
    let routeLabel = labelPart.replace(/[,\s]+$/, '').trim();

    let distanceRange    = null;
    const allMileMatches = [...labelPart.matchAll(/(\d[\d,]*)\s*(?:마일|mile)/gi)];
    const allMileNums    = allMileMatches.map(m => parseInt(m[1].replace(/,/g, ''), 10)).filter(n => !isNaN(n));
    const compactRange   = labelPart.match(/(\d[\d,]*)\s*[~\-]\s*(\d[\d,]*)\s*(?:마일|mile)/i);
    const plainRange     = labelPart.match(/(\d[\d,]*)\s*[~\-]\s*(\d[\d,]*)/);

    if (compactRange) {
      const a = parseInt(compactRange[1].replace(/,/g, ''), 10);
      const b = parseInt(compactRange[2].replace(/,/g, ''), 10);
      if (!isNaN(a) && !isNaN(b) && a < b) distanceRange = `${a}-${b}`;
    }
    if (!distanceRange && allMileNums.length >= 2) {
      const first = allMileNums[0], last = allMileNums[allMileNums.length - 1];
      distanceRange = first < last ? `${first}-${last}` : `${first}+`;
    }
    if (!distanceRange && allMileNums.length === 1) {
      const n = allMileNums[0];
      distanceRange = /이상/.test(labelPart) ? `${n}+` : `0-${n}`;
    }
    if (!distanceRange && plainRange) {
      const a = parseInt(plainRange[1].replace(/,/g, ''), 10);
      const b = parseInt(plainRange[2].replace(/,/g, ''), 10);
      if (!isNaN(a) && !isNaN(b) && a < b) distanceRange = `${a}-${b}`;
    }
    if (!distanceRange) {
      const underMatch = labelPart.match(/[~\-](\d[\d,]*)/);
      if (underMatch) {
        const n = parseInt(underMatch[1].replace(/,/g, ''), 10);
        if (!isNaN(n) && n > 0) distanceRange = `0-${n}`;
      }
    }

    if (!routeLabel || routeLabel.length < 2) routeLabel = distanceRange || '노선 미상';
    if (routeLabel.length > 50) routeLabel = routeLabel.slice(0, 50);
    rows.push({ routeLabel, amount, distanceRange });
  }
  return rows;
}

function mockParse(rawHtml, airlineCode, sourceUrl) {
  const tableText    = htmlToTableText(rawHtml || '');
  const monthMatch   = tableText.match(/(\d{4})년\s*(\d{1,2})월/);
  const effectiveMonth = monthMatch
    ? `${monthMatch[1]}.${String(monthMatch[2]).padStart(2, '0')}`
    : null;
  const rows   = extractRouteRows(tableText);
  const routes = rows.length === 0
    ? [{ route_type: '데이터 없음', distance_range: null, amount: null, currency: null, confidence_note: 'mock 파싱: 금액 추출 실패' }]
    : rows.map(row => ({ route_type: row.routeLabel, distance_range: row.distanceRange, amount: row.amount, currency: 'KRW', confidence_note: 'mock 파싱: 텍스트에서 추출' }));

  return {
    airline: airlineCode, source_url: sourceUrl,
    effective_month: effectiveMonth, currency: 'KRW', routes,
    summary:      `[mock] ${airlineCode}: ${routes.filter(r => r.amount != null).length}개 구간 추출`,
    parse_warning: 'mock 파서 사용 — AI API 미연동 상태',
    parsedAt: new Date().toISOString(), usedMock: true,
  };
}

function normalizeAIResult(parsed, airlineCode, sourceUrl) {
  const routes = (parsed.routes || []).map(r => ({
    route_type:      r.route_type || null,
    region:          r.region || null,           // v30: region 기반 필드
    distance_range:  r.distance_range || null,
    amount:          typeof r.amount === 'number' && r.amount > 0 ? r.amount : null,
    currency:        parsed.currency || r.currency || null,
    confidence_note: r.confidence_note || '',
  }));
  return {
    airline:         airlineCode,
    source_url:      sourceUrl,
    departure:       parsed.departure || 'KR',   // v30: 항상 KR
    effective_month: parsed.effective_month || null,
    currency:        parsed.currency || null,
    routes,
    // v30: region 기반 집계 뷰 (UI용)
    regions:         buildRegionView(routes),
    summary:         parsed.summary || null,
    parse_warning:   parsed.parse_warning || null,
    parsedAt:        new Date().toISOString(),
    usedMock:        false,
  };
}

// region 기반 집계: routes에서 region별 대표값 추출 (UI 표시용)
// 같은 region에 여러 구간이 있으면 중간값(median) 사용
function buildRegionView(routes) {
  const REGION_ORDER = ['일본', '중국', '동남아', '하와이', '미주', '유럽', '중동', '호주', '기타'];
  const grouped = {};
  for (const r of routes) {
    if (!r.region || r.amount == null) continue;
    if (!grouped[r.region]) grouped[r.region] = [];
    grouped[r.region].push(r.amount);
  }
  const result = [];
  for (const region of REGION_ORDER) {
    if (!grouped[region]) continue;
    const amounts = grouped[region].sort((a, b) => a - b);
    const mid     = Math.floor(amounts.length / 2);
    result.push({
      region,
      surcharge:    amounts[mid],              // 중간값 (대표)
      surcharge_min: amounts[0],
      surcharge_max: amounts[amounts.length - 1],
      currency:     'KRW',
    });
  }
  return result;
}

// ── 단일 공지 파싱 ──────────────────────
async function parseOne(collectResult, { skipLlm = false } = {}) {
  const { code, sourceUrl, rawHtml, text, detected } = collectResult;

  if (!detected) {
    return {
      airline: code, source_url: sourceUrl,
      effective_month: null, currency: null, routes: [],
      summary: null,
      parse_warning: '유류할증료 키워드 미탐지 — 파싱 건너뜀',
      parsedAt: new Date().toISOString(), usedMock: false,
    };
  }

  const cleanedHtml = cleanInputHtml(rawHtml);
  const truncText   = text && text.length > MAX_TEXT_LEN
    ? text.slice(0, MAX_TEXT_LEN) + '\n...(생략)'
    : (text || '');

  console.log(`[Parser] ${code}: 입력 HTML ${(rawHtml || '').length}자 → 전처리 후 ${cleanedHtml.length}자 | 텍스트 ${(text || '').length}자`);

  // skip-llm 모드
  const useSkipLlm = skipLlm || process.env.SKIP_LLM === 'true';
  if (useSkipLlm) {
    console.log(`[Parser] ${code}: skip-llm → mock 파서`);
    return mockParse(cleanedHtml, code, sourceUrl);
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.log(`[Parser] ${code}: API 키 없음 → mock 파서`);
    return mockParse(cleanedHtml, code, sourceUrl);
  }

  try {
    const { currentMonth: _cm } = getPipelineMonths();
    const userContent = `다음은 ${code} 항공사 유류할증료 공지입니다. 거리구간별로 전부 추출해주세요.\n기준월: ${_cm}\n\n${truncText}`;

    console.log(`[Parser] ${code}: API 요청 시작 (timeout: ${API_TIMEOUT_MS / 1000}s, prompt: ${userContent.length}자)`);
    const t0         = Date.now();
    const aiResponse = await callClaudeAPI(PARSE_SYSTEM_PROMPT, userContent);
    console.log(`[Parser] ${code}: 응답 수신 (${Date.now() - t0}ms, ${aiResponse.length}자)`);

    const parsed = safeParseJson(aiResponse);
    console.log(`[Parser] ${code}: JSON 파싱 ${parsed ? '성공' : '실패'}`);

    if (!parsed || !Array.isArray(parsed.routes)) {
      console.warn(`[Parser] ${code}: routes 없음 → mock fallback | 원본 앞 200자: ${aiResponse.slice(0, 200)}`);
      return mockParse(cleanedHtml, code, sourceUrl);
    }

    const result = normalizeAIResult(parsed, code, sourceUrl);
    const { currentMonth: _verCm, nextMonth: _verNm } = getPipelineMonths();
    if (result.effective_month) {
      const _mtype = classifyNoticeMonth(result.effective_month, _verCm, _verNm);
      if (_mtype === 'UNKNOWN') {
        console.warn(`[Parser] ${code}: ⚠ 탐지월(${result.effective_month}) 불일치`);
      } else {
        console.log(`[Parser] ${code}: 월 확인 → ${result.effective_month} [${_mtype}]`);
      }
    } else {
      const _fb = detectMonthFromText(truncText);
      if (_fb) { result.effective_month = _fb; console.log(`[Parser] ${code}: effective_month 재추출: ${_fb}`); }
    }

    console.log(`[Parser] ${code}: AI 파싱 완료 — ${result.routes.length}개 구간`);
    return result;

  } catch (err) {
    const isRateLimit = err.message.includes('rate-limit');
    const isTimeout   = err.message.toLowerCase().includes('timeout');
    if (isRateLimit)     console.warn(`[Parser] ${code}: rate-limit → mock fallback`);
    else if (isTimeout)  console.warn(`[Parser] ${code}: timeout (${err.message}) → mock fallback`);
    else                 console.error(`[Parser] ${code}: 오류 → mock fallback: ${err.message}`);
    return mockParse(cleanedHtml, code, sourceUrl);
  }
}

// ── parseAll — Promise.allSettled 병렬 격리 ──
async function parseAll(collectResults, opts = {}) {
  const { skipLlm = false } = opts;
  const useSkipLlm = skipLlm || process.env.SKIP_LLM === 'true';

  if (useSkipLlm) {
    console.log('[Parser] skip-llm 모드: API 호출 없이 mock 파서만 사용');
  } else if (!process.env.ANTHROPIC_API_KEY) {
    console.log('[Parser] API 키 없음: mock 파서 사용');
  } else {
    console.log(`[Parser] API 연동 (per-airline timeout: ${API_TIMEOUT_MS / 1000}s, 병렬 처리)`);
  }

  const results = await Promise.allSettled(
    collectResults.map(cr => {
      // [AI-Search] ai-search-auto 결과는 _parsedDirect 직접 주입 (파싱 재실행 불필요)
      if (cr.source === 'ai-search-auto' && cr._parsedDirect) {
        console.log(`[Parser] ${cr.code}: ai-search-auto → _parsedDirect 직접 사용`);
        return Promise.resolve(cr._parsedDirect);
      }
      return parseOne(cr, { skipLlm: useSkipLlm });
    })
  );

  return results.map((r, i) => {
    const cr = collectResults[i];
    if (r.status === 'fulfilled') return r.value;
    console.error(`[Parser] ${cr.code}: 이중 catch → mock fallback: ${r.reason?.message}`);
    return mockParse(cleanInputHtml(cr.rawHtml || ''), cr.code, cr.sourceUrl);
  });
}

module.exports = { parseOne, parseAll, DISTANCE_BANDS };
