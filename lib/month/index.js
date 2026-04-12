/**
 * Month Utilities — v2 (v25)
 *
 * 변경 사항 (v1 → v2):
 *   - detectMonthFromText: 빈도 기반 → 우선순위 기반(detectMonthPriority)로 교체
 *     → CURRENT 포함이면 무조건 CURRENT 반환 (빈도 무관)
 *     → NEXT 포함이면 NEXT 반환
 *     → 둘 다 없으면 마지막 등장 월 반환 (fallback)
 *   - classifyNoticeMonth: text 직접 받는 { fromText: true } 오버로드 추가
 *   - getPipelineMonths: KST 기준 강제 (UTC+9, timezone 설정 무관)
 *   - isInternationalNotice: 영문 패턴 추가 (/국제선|international|fuel surcharge/i)
 *   - detectMonthFromText: 하위 호환 래퍼로 유지 — 기존 호출부 수정 불필요
 *   - detectMonthPriority: 신규 export (권장 API)
 */

'use strict';

// ──────────────────────────────────────────
// 월 포맷 헬퍼
// ──────────────────────────────────────────

function formatYYYYMM(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  return `${y}.${m}`;
}

function addMonthsToStr(yyyymm, n) {
  const [y, m] = yyyymm.split('.').map(Number);
  const d = new Date(y, m - 1 + n, 1);
  return formatYYYYMM(d);
}

// ──────────────────────────────────────────
// 파이프라인 기준 월 계산 — KST 기준 강제
// ──────────────────────────────────────────

/**
 * 현재 시점(KST = UTC+9)으로 CURRENT / NEXT 월 반환.
 * 서버 timezone 설정과 무관하게 항상 한국 시간 기준.
 */
function getPipelineMonths() {
  const now          = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const currentMonth = formatYYYYMM(now);
  const nextMonth    = addMonthsToStr(currentMonth, 1);
  return { currentMonth, nextMonth };
}

// ──────────────────────────────────────────
// 우선순위 기반 월 탐지 (핵심 변경)
// ──────────────────────────────────────────

/**
 * 텍스트에서 모든 "YYYY년 M월" 패턴을 추출한 뒤
 * 우선순위 기반으로 대표 월을 반환.
 *
 * 우선순위:
 *   1순위: currentMonth가 텍스트에 있으면 → 무조건 currentMonth 반환 (빈도 무관)
 *   2순위: nextMonth가 텍스트에 있으면    → nextMonth 반환
 *   3순위: 둘 다 없으면 → 마지막 등장 월 반환 (fallback)
 *
 * 예: "4월 적용...5월 적용" → currentMonth=2026.04 → "2026.04" 반환
 *
 * @param {string}      text
 * @param {string}      currentMonth  "YYYY.MM"
 * @param {string}      nextMonth     "YYYY.MM"
 * @returns {string|null}
 */
function detectMonthPriority(text, currentMonth, nextMonth) {
  if (!text) return null;

  const matches = [...text.matchAll(/(\d{4})년\s*(\d{1,2})월/g)];
  if (matches.length === 0) return null;

  const months = matches.map(m => `${m[1]}.${String(m[2]).padStart(2, '0')}`);

  // 1순위: CURRENT 포함이면 무조건 반환
  if (months.includes(currentMonth)) return currentMonth;

  // 2순위: NEXT 포함
  if (months.includes(nextMonth)) return nextMonth;

  // 3순위: 마지막 등장 월 (fallback)
  return months[months.length - 1];
}

/**
 * detectMonthFromText — 하위 호환 래퍼.
 * 기존 호출부(detectMonthFromText(text))는 수정 없이 그대로 동작.
 * 내부에서 getPipelineMonths()를 가져와 우선순위 기반 탐지로 위임.
 *
 * ※ 가능하면 detectMonthPriority(text, currentMonth, nextMonth) 직접 호출 권장.
 *
 * @param {string} text
 * @returns {string|null}
 */
function detectMonthFromText(text) {
  const { currentMonth, nextMonth } = getPipelineMonths();
  return detectMonthPriority(text, currentMonth, nextMonth);
}

// ──────────────────────────────────────────
// 공지 제목 분류
// ──────────────────────────────────────────

/**
 * 국제선 공지 여부 확인.
 * "국제선", "international", "fuel surcharge" 중 하나 이상 포함.
 */
function isInternationalNotice(title) {
  return /국제선|international|fuel surcharge/i.test(title);
}

/**
 * 국내선 공지 여부 확인. "국내선" 포함이면 제외 대상.
 */
function isDomesticNotice(title) {
  return /국내선/.test(title);
}

/**
 * 공지 제목·본문의 월을 CURRENT / NEXT / UNKNOWN으로 분류.
 *
 * 사용 방법 A (기존 호환):
 *   classifyNoticeMonth(detectedMonth, currentMonth, nextMonth)
 *   → 이미 탐지된 단일 월 문자열을 분류
 *
 * 사용 방법 B (신규 권장):
 *   classifyNoticeMonth(text, currentMonth, nextMonth, { fromText: true })
 *   → 텍스트에서 직접 우선순위 탐지 후 분류 (detectMonthPriority 내부 호출)
 *
 * @param {string|null} detectedMonthOrText
 * @param {string}      currentMonth
 * @param {string}      nextMonth
 * @param {{ fromText?: boolean }} [opts]
 * @returns {'CURRENT'|'NEXT'|'UNKNOWN'}
 */
function classifyNoticeMonth(detectedMonthOrText, currentMonth, nextMonth, opts = {}) {
  const month = opts.fromText
    ? detectMonthPriority(detectedMonthOrText, currentMonth, nextMonth)
    : detectedMonthOrText;

  if (!month) return 'UNKNOWN';
  if (month === currentMonth) return 'CURRENT';
  if (month === nextMonth)    return 'NEXT';
  return 'UNKNOWN';
}

/**
 * monthType을 우선순위 숫자로 변환. 낮을수록 우선.
 */
function monthTypePriority(monthType) {
  if (monthType === 'CURRENT') return 1;
  if (monthType === 'NEXT')    return 2;
  return 999;
}

// ──────────────────────────────────────────
// 링크 유효성 — javascript:void 필터
// ──────────────────────────────────────────

/**
 * href가 실제 이동 가능한 URL인지 확인.
 * javascript:, #, about:blank 등은 false.
 */
function isNavigableHref(href) {
  if (!href) return false;
  const trimmed = href.trim();
  if (trimmed.startsWith('javascript:')) return false;
  if (trimmed === '#' || trimmed === '') return false;
  if (trimmed.startsWith('about:'))      return false;
  return true;
}

// ──────────────────────────────────────────
// carry_over 월 검증
// ──────────────────────────────────────────

/**
 * carry_over 후보의 월이 currentMonth와 일치하는지 확인.
 * 미래 월 carry_over는 신뢰도 패널티 부여.
 *
 * @param {string|null} candidateMonth
 * @param {string}      currentMonth
 * @returns {{ valid: boolean, penalty: number, reason: string }}
 */
function validateCarryOverMonth(candidateMonth, currentMonth) {
  if (!candidateMonth) {
    return { valid: true, penalty: 0.05, reason: 'carry_over 월 정보 없음 (소폭 패널티)' };
  }

  if (candidateMonth === currentMonth) {
    return { valid: true, penalty: 0, reason: 'carry_over 현재월 일치' };
  }

  const [cy, cm] = currentMonth.split('.').map(Number);
  const [ky, km] = candidateMonth.split('.').map(Number);
  const currentOrd = cy * 12 + cm;
  const carryOrd   = ky * 12 + km;

  if (carryOrd > currentOrd) {
    return {
      valid: false,
      penalty: 0.40,
      reason: `carry_over 미래월 오염 (${candidateMonth} > ${currentMonth}) — 사용 불가`,
    };
  }

  const monthDiff = currentOrd - carryOrd;
  const penalty   = Math.min(monthDiff * 0.05, 0.20);
  return {
    valid: true,
    penalty,
    reason: `carry_over 과거월 (${candidateMonth}, ${monthDiff}개월 전, 패널티 ${(penalty * 100).toFixed(0)}%)`,
  };
}

module.exports = {
  formatYYYYMM,
  addMonthsToStr,
  getPipelineMonths,
  detectMonthPriority,     // 신규 — 우선순위 기반 (권장)
  detectMonthFromText,     // 하위 호환 래퍼 (기존 호출부 수정 불필요)
  isInternationalNotice,
  isDomesticNotice,
  classifyNoticeMonth,
  monthTypePriority,
  isNavigableHref,
  validateCarryOverMonth,
};
