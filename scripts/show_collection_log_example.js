#!/usr/bin/env node
/**
 * scripts/show_collection_log_example.js — v30
 *
 * v30 collector 수집 단계별 로그 예시 (네트워크 호출 없음)
 *
 * 시나리오:
 *   KE — override-text (공지 텍스트 직접 입력, Collector 완전 우회)
 *   OZ — override-url 실패(404) → Playwright js_shell → fallback + 안내
 *   TW — override 없음 → direct fetch 성공
 *   LJ — override 없음 → direct 실패 → Playwright 링크 탐색 성공
 *
 * 실행: node scripts/show_collection_log_example.js
 */

'use strict';

function div(c = '─', n = 64) { return c.repeat(n); }
async function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

// ─────────────────────────────────────────
// 시나리오별 시뮬레이션
// ─────────────────────────────────────────

async function simKE() {
  console.log('\n' + div('═'));
  console.log('[Collector][KE] ▶ 수집 시작 — 대한항공 (전략: browser-heavy)');
  console.log(div());

  // override 확인
  console.log('[Collector][KE] override entry 확인 → type: text (2026.04)');
  await wait(10);

  // text override: Collector 완전 우회
  console.log('[Collector][KE] [override-text] ✅ Collector 우회 | 412자 | month: 2026.04 [CURRENT]');
  console.log('[Collector][KE] ✅ source: override-text | month: 2026.04 | monthType: CURRENT');
  console.log('[Collector][KE] → Playwright 미실행 (텍스트 직접 입력이므로 자동화 전체 skip)');

  return { code: 'KE', name: '대한항공', source: 'override-text', month: '2026.04', monthType: 'CURRENT', success: true };
}

async function simOZ() {
  console.log('\n' + div('═'));
  console.log('[Collector][OZ] ▶ 수집 시작 — 아시아나항공 (전략: browser-heavy)');
  console.log(div());

  // override 확인
  console.log('[Collector][OZ] override entry 확인 → type: url (2026.04)');
  console.log('[Collector][OZ] override URL: https://flyasiana.com/C/KR/KO/customer/notice/detail/20264');
  await wait(20);

  // override URL 시도
  console.log('  [OZ] [override-url] fetch 시도: https://flyasiana.com/C/KR/KO/customer/notice/detail/20264');
  console.log('  [OZ] goto | status: 404 | URL: https://flyasiana.com/C/KR/KO/customer/notice/detail/20264');
  console.log('  [OZ] 💾 HTML 스냅샷: debug/OZ/override_http_404_1775812000.html');
  console.log('  [OZ] 📷 스크린샷:    debug/OZ/override_http_404_1775812000.png');
  console.log('  [OZ] [override-url] 실패: HTTP 404');
  await wait(15);

  // API 탐색
  console.log('  [OZ] [api] JSON 엔드포인트 탐색 (2개)');
  console.log('  [OZ] [api] /C/KR/KO/customer/notice/list 실패: HTTP 403');
  console.log('  [OZ] [api] /api/notice/list 실패: HTTP 404');
  await wait(15);

  // Playwright
  console.log('  [OZ] [browser] Playwright 시작');
  console.log('  [OZ] [browser] 공지 목록: https://flyasiana.com/C/KR/KO/customer/notice/list');
  console.log('  [OZ] goto | status: 200 | URL: https://flyasiana.com/C/KR/KO/customer/notice/list');
  console.log('  [OZ] [browser] body HTML: 284자');
  console.log('  [OZ] 💾 HTML 스냅샷: debug/OZ/list_js_shell_only_1775812030.html');
  console.log('  [OZ] 📷 스크린샷:    debug/OZ/list_js_shell_only_1775812030.png');
  console.log('  [OZ] [browser] 목록 수집 실패: js_shell_only (본문 없는 JS 쉘)');
  await wait(10);

  // fallback
  console.log('[Collector][OZ] ❌ 수집 실패 → fallback: OZ: 공지 목록 수집 실패 (js_shell_only)');
  console.log('[Collector][OZ] ⚠ override 권장 항공사 — manual_overrides.json 업데이트 필요');

  return {
    code: 'OZ', name: '아시아나항공', source: 'fallback', month: null, monthType: 'UNKNOWN',
    success: false, error: 'OZ: 공지 목록 수집 실패 (js_shell_only)',
    overrideHint: 'override URL을 올바른 상세 공지 URL로 교체 또는 type:text로 공지 텍스트 직접 입력',
  };
}

async function simTW() {
  console.log('\n' + div('═'));
  console.log('[Collector][TW] ▶ 수집 시작 — 티웨이항공 (전략: hybrid)');
  console.log(div());

  // override 없음
  console.log('[Collector][TW] override entry 확인 → 없음 (value 비어있음)');
  await wait(10);

  // direct fetch
  console.log('  [TW] [direct] 목록 fetch: https://www.twayair.com/app/customerCenter/notice');
  await wait(30);
  console.log('  [TW] [direct] 목록 수집: 31240자');
  console.log('  [TW] [direct] 링크 후보: 4개');
  console.log('    "2026년 4월 국제선 유류할증료 안내" [CURRENT] score:18 → /app/customerCenter/notice/view?noticeId=4821');
  console.log('    "2026년 3월 국제선 유류할증료 안내" [PREV] score:8');

  // 상세 fetch
  console.log('  [TW] [direct] 상세 fetch: https://www.twayair.com/app/customerCenter/notice/view?noticeId=4821');
  await wait(20);
  console.log('  [TW] [direct] ✅ 수집 성공: 2140자');

  console.log('[Collector][TW] ✅ source: live | month: 2026.04 | monthType: CURRENT');

  return { code: 'TW', name: '티웨이항공', source: 'live', month: '2026.04', monthType: 'CURRENT', success: true, via: 'direct' };
}

async function simLJ() {
  console.log('\n' + div('═'));
  console.log('[Collector][LJ] ▶ 수집 시작 — 진에어 (전략: hybrid)');
  console.log(div());

  // override 없음
  console.log('[Collector][LJ] override entry 확인 → 없음');
  await wait(10);

  // API 탐색
  console.log('  [LJ] [api] JSON 엔드포인트 탐색 (2개)');
  console.log('  [LJ] [api] /company/announce/announceList.json 실패: HTTP 404');
  console.log('  [LJ] [api] /api/notice/list 실패: HTTP 404');
  await wait(15);

  // direct fetch 실패
  console.log('  [LJ] [direct] 목록 fetch: https://www.jinair.com/company/announce/announceList');
  await wait(25);
  console.log('  [LJ] [direct] 목록 수집: 8420자 (SSR 렌더 확인)');
  console.log('  [LJ] [direct] 링크 후보: 2개');
  console.log('    "2026년 4월 국제선 유류할증료 안내" [CURRENT] score:15');

  // 상세 fetch
  console.log('  [LJ] [direct] 상세 fetch: https://www.jinair.com/company/announce/announceView?noticeId=8841');
  await wait(20);
  console.log('  [LJ] [direct] ✅ 수집 성공: 1980자');

  console.log('[Collector][LJ] ✅ source: live | month: 2026.04 | monthType: CURRENT');

  return { code: 'LJ', name: '진에어', source: 'live', month: '2026.04', monthType: 'CURRENT', success: true, via: 'direct' };
}

// ─────────────────────────────────────────
// 파서 로그 시뮬레이션
// ─────────────────────────────────────────

function simParserLog(results) {
  console.log('\n' + div('═'));
  console.log('[Step 4] Parser...');
  console.log(div());

  const SAVEABLE = ['live', 'override-url', 'override-text', 'override-html', 'ai-search-auto'];
  for (const r of results) {
    const ok     = SAVEABLE.includes(r.source);
    const srcTag = r.source === 'live'           ? '[실공지]  '
                 : r.source === 'override-text'  ? '[수동텍스트]'
                 : r.source === 'override-html'  ? '[수동HTML]'
                 : r.source === 'override-url'   ? '[수동URL] '
                 : '[fallback] ';
    console.log(`  ${ok ? '✅' : '⚠ '} ${srcTag} ${r.code}: 출처=${r.source}`);
  }

  console.log('');
  for (const r of results) {
    if (!SAVEABLE.includes(r.source)) {
      console.log(`[Parser] ${r.code}: skip (fallback — 저장 금지 원칙에 따라 파싱 건너뜀)`);
      continue;
    }
    const chars = r.source === 'override-text' ? 412 : r.source === 'live' ? 2100 : 1800;
    console.log(`[Parser] ${r.code}: 입력 ${chars}자 → API 요청 시작`);
    console.log(`[Parser] ${r.code}: AI 파싱 완료 — ${r.code === 'KE' ? 9 : r.code === 'OZ' ? 0 : 4}개 구간`);
    if (r.code !== 'OZ') {
      const regions = r.code === 'KE'
        ? '일본(42,000) / 동남아(78,000) / 미주(276,000) / 유럽(303,000)'
        : r.code === 'TW' ? '일본(42,000) / 동남아(78,000)'
        : '일본(42,000) / 동남아(78,000) / 하와이(126,000)';
      console.log(`[Parser] ${r.code}: region 집계 → ${regions}`);
    }
  }
}

// ─────────────────────────────────────────
// 운영 요약 리포트
// ─────────────────────────────────────────

function printSummary(results) {
  const SAVEABLE = ['live', 'override-url', 'override-text', 'override-html', 'ai-search-auto'];
  const succeeded = results.filter(r => SAVEABLE.includes(r.source));
  const failed    = results.filter(r => !SAVEABLE.includes(r.source));

  console.log('\n' + div('═', 64));
  console.log('📊 [Collector] 수집 결과 요약 (v30)');
  console.log(div('═', 64));

  console.log(`\n✅ 수집 성공 (${succeeded.length}개):`);
  for (const r of succeeded) {
    const mark = r.source.startsWith('override') ? ' [수동입력]' : ` [via ${r.via || 'auto'}]`;
    console.log(`   ${r.code.padEnd(3)} ${r.name.padEnd(8)} source: ${r.source.padEnd(16)} month: ${r.month} [${r.monthType}]${mark}`);
  }

  console.log(`\n❌ 수집 실패 / fallback (${failed.length}개):`);
  for (const r of failed) {
    const err = r.error ? r.error.slice(0, 65) : '원인 불명';
    console.log(`   ${r.code.padEnd(3)} ${r.name.padEnd(8)} → ${err}`);
    if (r.overrideHint) {
      console.log(`   ${''.padEnd(12)} 💡 ${r.overrideHint}`);
    }
  }

  if (failed.length > 0) {
    console.log('\n📝 override 등록 방법 (manual_overrides.json > collector_overrides):');
    console.log('   [텍스트 입력] { "type": "text", "value": "500마일 미만: 42,000원\\n..." }');
    console.log('   [URL 등록]   { "type": "url",  "value": "https://flyasiana.com/.../notice/..." }');
    console.log('   [HTML 입력]  { "type": "html", "value": "<table>...</table>" }');
  }

  console.log('\n📋 source별 분류:');
  const bySource = {};
  for (const r of results) {
    if (!bySource[r.source]) bySource[r.source] = [];
    bySource[r.source].push(r.code);
  }
  for (const [src, codes] of Object.entries(bySource).sort()) {
    const icon = SAVEABLE.includes(src) ? '✅' : '⚠️ ';
    console.log(`   ${icon} ${src.padEnd(18)}: ${codes.join(', ')}`);
  }

  console.log('\n📁 디버그 아티팩트:');
  console.log('   debug/OZ/override_http_404_*.html  — override URL 404 스냅샷');
  console.log('   debug/OZ/list_js_shell_only_*.html — Playwright JS 쉘 스냅샷');
  console.log('   → HTML 열어서 확인: 진짜 차단인지 / JS 쉘인지 / 배너 때문인지');

  console.log('\n' + div('═', 64));
  console.log('💡 다음 운영 액션 (OZ):');
  console.log('   1. debug/OZ/*.html 열어 실패 원인 확인');
  console.log('   2. 아시아나 공식 사이트에서 4월 공지 URL 또는 텍스트 확인');
  console.log('   3-A. URL 방법: manual_overrides.json > OZ > 2026.04 > type:"url" 에 올바른 URL 등록');
  console.log('   3-B. 텍스트 방법: 공지 내용 복사 후 type:"text" 에 붙여넣기 (더 안정적)');
  console.log('   4. node scripts/run_pipeline.js --only OZ --dry-run 으로 재검증');
  console.log(div('═', 64) + '\n');
}

// ─────────────────────────────────────────
// 실행
// ─────────────────────────────────────────

async function main() {
  console.log('\n' + div('═', 64));
  console.log('  v30 Collector 수집 단계 로그 예시 — KE / OZ / TW / LJ');
  console.log('  핵심: 검색 성공 ≠ 수집 성공 | override-text = Collector 완전 우회');
  console.log(div('═', 64));
  console.log('[Collector] 수집 시작 (v30): KE, OZ, TW, LJ');
  console.log('[Collector] 기준월: 2026.04 / 다음월: 2026.05');
  console.log('[Collector] 전략: KE=browser-heavy, OZ=browser-heavy, TW=hybrid, LJ=hybrid');

  // 병렬 시뮬레이션 (실제는 Promise.allSettled)
  const results = await Promise.all([simKE(), simOZ(), simTW(), simLJ()]);

  // Parser 로그
  simParserLog(results);

  // 최종 요약
  printSummary(results);
}

main().catch(err => {
  console.error('예시 스크립트 오류:', err.message);
  process.exit(1);
});
