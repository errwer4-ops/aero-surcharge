# 유류할증료 데이터 파이프라인

> **v28 업데이트**: Level 3 AI 자동 검색(ai-search-auto) 레이어 추가  
> Collector 실패 시 AI가 공식 공지를 자동 검색→수집→파싱→검증→등록 (검증 통과 시만)


정적 사이트(v12)의 데이터를 자동 갱신하는 백엔드 파이프라인.  
**"AI 예측 시스템"이 아닌 "데이터 기반 + AI 보조 파싱 시스템"**

---

## 폴더 구조

```
aero-v12/
├── public/              ← 기존 정적 사이트 (변경 없음)
│   └── data/
│       ├── official_surcharge_feed.json  ← 파이프라인이 갱신
│       ├── forecast_feed.json            ← inputs 섹션 갱신
│       └── pipeline_log.json             ← 실행 로그 (자동 생성)
│
├── lib/                 ← 파이프라인 레이어 (신규)
│   ├── collector/
│   │   └── index.js    ← [Layer 1] HTML 수집
│   ├── ai-search/
│   │   └── index.js    ← [Level 3] AI 자동 검색 복구
│   ├── parser/
│   │   └── index.js    ← [Layer 2] AI 파싱
│   ├── validation/
│   │   └── index.js    ← [Layer 3] 데이터 검증
│   └── market/
│       └── index.js    ← 시장 데이터 (유가/환율)
│
└── scripts/
    └── run_pipeline.js ← 메인 실행 파일
```

---

## 3단 레이어 구조

```
[Collector]  → HTML 수집, 키워드 탐지
     ↓ (실패 시 ↘)
[AI-Search]  → Level 3: fallback 항공사 AI 자동 검색 복구 (검증 통과 시만)
     ↓
[Parser]     → AI가 텍스트 → 구조화 JSON 변환
     ↓
[Validation] → 필수값·금액·통화·이상변동 검증
     ↓
public/data/ ← 검증 통과 항목만 저장 (실패 시 기존 유지)
```

---

## 실행 방법

```bash
# 기본 실행 (mock 데이터, 저장 안 함)
npm run pipeline:dry

# mock 모드로 실제 저장
npm run pipeline:mock

# 실제 수집 + Claude API 파싱 (API_KEY 필요)
ANTHROPIC_API_KEY=sk-... npm run pipeline

# 특정 항공사만
node scripts/run_pipeline.js --mock --only KE
```

---

## AI 사용 원칙

| 허용 | 금지 |
|------|------|
| 공지 텍스트 → JSON 파싱 | 수치 추정 |
| 공지 요약 생성 | 없는 값 생성 |
| 변화 설명 | 비즈니스 로직 결정 |

---

## MVP 제한 사항

- 항공사: KE, TW (2개사)
- 수집 방식: HTML only (PDF 미구현)
- 스케줄링: 수동 실행 (cron 추가 가능)
- 시장 데이터: mock (실제 API 연동 구조만 정의)
- API_KEY 없으면 mock 파서 자동 사용

---

## 기존 코드와의 연결

파이프라인 실행 후 `public/data/official_surcharge_feed.json`이 갱신되면  
기존 정적 사이트(`index.html`, `airlines.html`)가 자동으로 새 데이터를 사용합니다.  
프론트엔드 코드 수정 없음.

---

## 다음 단계 (MVP 이후)

- [ ] GitHub Actions로 일일 자동 실행
- [ ] PDF 공지 파싱 구현 (`lib/collector/index.js`의 `fetchPdf` 함수)
- [ ] 실제 유가 API 연동 (`lib/market/index.js`의 `fetchJetFuelPrice`)
- [ ] 실제 환율 API 연동 (`lib/market/index.js`의 `fetchFxRates`)
- [ ] 지원 항공사 확대 (`lib/collector/index.js`의 `AIRLINE_TARGETS` 배열 추가)

---

## Level 3: AI 자동 검색 복구 (v28)

### 동작 흐름

```
Collector 실패 감지 (source=fallback)
         ↓
Step B: AI 자동 검색
  - Claude web_search tool 사용
  - 쿼리: "대한항공 국제선 유류할증료 2026년 5월 site:koreanair.com"
  - Top 5 결과 수집
         ↓
Step C: 후보 필터링 (점수 기반)
  필수: 공식 도메인 + 유류할증료 키워드
  가산: URL 패턴, 월 정보, 금액 힌트
         ↓
Step D: HTML 수집 (최대 3후보 순차 시도)
         ↓
Step E: AI 파싱 (기존 parser 시스템 프롬프트 재사용)
         ↓
Step F: 자동 검증 (필수 조건 모두 충족 시만 등록)
  1. 항공사명 일치
  2. 현재월 또는 다음월 데이터
  3. 금액 있는 구간 존재
  4. 최소 2개 이상 구간
  5. 비정상 금액 없음 (0원, 범위 초과)
  6. 통화 일관성
         ↓
Step G: 자동 등록 (검증 통과 시만)
  source = 'ai-search-auto'
  신뢰도: live보다 소폭 하향 (CURRENT: 0.90 vs live 0.97)
```

### 핵심 원칙

- **검증 실패 = 등록 금지**: 6가지 조건 중 하나라도 실패하면 fallback 유지
- **전체 처리 시간 30초 제한**: 초과 시 즉시 중단, 기존 fallback 유지
- **pipeline 완주 보장**: 예외 발생해도 throw 없이 계속 진행
- **--mock / --skip-llm**: AI-Search 자동 건너뜀

### 로그 확인

```
[AI-SEARCH][KE] 검색 쿼리 KO: "대한항공 국제선 유류할증료 2026년 5월 site:koreanair.com"
[AI-SEARCH][KE] AI 검색 결과: 3개 URL 후보
[AI-SEARCH][KE]   후보[0]: https://www.koreanair.com/... | "5월 유류할증료 안내"
[AI-SEARCH][KE] 필터링 결과: 3개 → 2개 통과
[AI-SEARCH][KE] 선택 URL: https://www.koreanair.com/...
[AI-SEARCH][KE] HTML 수집 성공: 45321자
[AI-SEARCH][KE] 파싱 완료: 9개 구간, month=2026.05
[AI-SEARCH][KE] 검증 결과: ✅ 통과 — 검증 통과 (9구간, KRW, month=2026.05)
[AI-SEARCH][KE] ✅ 자동 등록 완료 (source=ai-search-auto)
```
