# 공식 출처·SEO·후속 사업 검토

검토 기준일: 2026-10-21 KST. 이 문서는 코드 작업과 공개 자료 조사 기록이며, 사이트 배포 또는 데이터 재배포 권한 취득 기록이 아니다.

## 공식 원문 확인

| 출처 | 확인한 내용 | 한계 |
| --- | --- | --- |
| [대한항공 10월](https://www.koreanair.com/contents/footer/customer-support/notice/2026/2610-infuel) / [11월](https://www.koreanair.com/contents/footer/customer-support/notice/2026/2611-infuel) | 한국 출발 국제선, KRW 편도, 발권일 적용. 10월 1~31일 / 11월 1~30일. 11월 9개 구간은 55,600~408,100원. 해외 출발 금액은 다를 수 있으며 기준 유가 산정 기간과 같은 기간의 평균 환율 사용 | 추출 본문에 발표일이 없으므로 URL이나 검색 수집 날짜로 발표일을 만들지 않음. 원문 표의 오래된 접근성 설명 문구보다 본문·열 제목·적용 기간을 함께 확인해야 함 |
| [에어서울 10월](https://flyairseoul.com/CW/ko/noticeContent.do?pageNo=1&seq=11103) / [11월](https://flyairseoul.com/CW/ko/noticeContent.do?pageNo=1&seq=11208) | 등록일 각각 2026-09-17 / 2026-10-16. KRW 편도 5개 구간. 11월은 69,100~122,000원. 300~700마일 미만 등 대한항공과 다른 구간 | 노선 목록·구간과 한국 출발 적용 범위를 유지해야 함 |
| [아시아나 9월](https://flyasiana.com/C/KR/KO/customer/notice/detail?id=CM202608180002530123) | 발표일 2026-08-18, 9월 1~30일 발권, KRW 편도. 8월·9월 비교표 원문 존재 | 이번 조사에서 모든 항공사의 10·11월 수치를 전수 재검증한 것은 아님 |
| [아시아나 11월](https://flyasiana.com/C/KR/KO/customer/notice/detail?id=CM202610160002530868) | 본문 등록일 2026-10-16. 한국 출발·KRW 편도, 11월 1~30일 발권. 9개 구간 62,400 / 92,200 / 120,600 / 149,100 / 178,900 / 207,400 / 235,900 / 294,200 / 351,100으로 기존 배열과 일치 | 원문 표 캡션에는 오래된 ‘8월’ 문구가 남아 있으나 제목·금액 열·적용 기간은 11월로 일치. 불필요한 검색 파라미터를 제외한 같은 공시 ID로 본문을 확인 |
| [에어부산 10월](https://www.airbusan.com/content/common/customercenter/noticeDetail?id=4407) | 한국 출발 편도 USD 37/66/78/90. 부산–나리타와 시즈오카는 첫 구간, 인천–나리타는 두 번째, 괌은 세 번째, 방콕은 네 번째. 같은 표의 9월 값은 USD 34/60/71/82 | 공시 노선군이 단순 거리·국가 분류보다 우선. 과거 지도에서 다른 구간을 찾았다고 그것을 최신 공시의 노선 분류로 간주하면 안 됨 |
| [에어부산 11월](https://www.airbusan.com/content/common/customercenter/noticeDetail?id=4420) | 한국 출발 편도, 11월 1~30일 발권. 4개 노선군 USD 43 / 77 / 90 / 106 및 부산·인천 나리타 구분 등 기존 배열과 일치. 원문 10월 비교 금액도 USD 37 / 66 / 78 / 90 | 추출 본문에서 발표일은 확인되지 않음. 확인일을 발표일로 대입하지 않음 |
| [트리니티항공(TW) 11월](https://www.trinityairways.com/app/customerCenter/notice/retrieve/12722) | 작성일 2026-10-19 09:33. 한국 출발 편도·KRW·11월 1~30일 발권. 7개 구간 43,400 / 76,000 / 95,000 / 123,500 / 133,000 / 대시 / 299,800으로 기존 배열과 일치. USD 기준액에 산정 기간 평균환율을 적용해 KRW로 공지한다고 명시 | 4,000~5,000마일 미만은 ‘-’이므로 0원으로 해석하지 않음. 첫 직접 요청은 실패했지만 검색으로 확인한 동일 공식 URL 재열기에서 본문 확인 |
| [제주항공 11월](https://www.jejuair.net/ko/customerServiceCenter/noticeDetail.do?billboardNo=0000000814) | 공식 URL에서 ‘한국 출발 국제선 2026년 11월’ 제목 및 본문 등록일 2026.10.16 확인 | 이번 웹 추출에서는 금액표 대신 ‘등록된 공지가 없습니다’가 반환되어 USD 금액·구간·전체 적용 기간을 재검증하지 못함. 기존 `official_notice_verified_from_saved_pdf` 기록을 웹 재검증 완료로 바꾸지 않음 |
| [진에어 11월](https://www.jinair.com/company/announce/announceView?anceSeq=28906&searchWord=&searchKey=titlCtn&page=1) | 저장소가 참조하는 공식 공시 URL을 확인하고 직접 요청 및 같은 ID의 간소화 URL로 재시도 | 접근 불가로 이번 실행에서 USD 5개 구간·발표일·기간 재검증 불가. 검색된 국내선 공시를 국제선 근거로 사용하지 않음 |
| [이스타항공 11월](https://www.eastarjet.com/newstar/PGWCA00002?cId=11&iId=0&bId=680&lang=KR) | 저장소가 참조하는 공식 공시 URL을 확인하고 직접 요청 및 같은 ID로 재시도 | 접근 불가로 이번 실행에서 USD 6개 노선군·발표일·기간 재검증 불가. 기존 웹/저장 PDF 검증 이력을 이번 감사에서 재현했다고 주장하지 않음 |
| [국토교통부 정책 Q&A](https://www.molit.go.kr/USR/policyTarget/m_24066/dtl.jsp?idx=1001) | 2019-12-18 국제선 여객 유류할증료 기준 유가 MOPS를 싱가포르 항공유 현물시장 가격지표로 설명 | 검색 색인 본문 확인. 직접 열기는 리디렉션 반복으로 실패. 현재 모든 항공사에 동일한 단계표·환율 규칙을 보장하는 자료가 아님 |
| [칭기즈칸 공항 운영자 안내](https://airlines.ulaanbaatar-airport.mn/) / [몽골 민항청 공항 표](https://backend-api.mcaa.gov.mn/storage/filemanager/6acdbf8c-c559-436a-94f3-62e7ab986547.pdf) / [ICAO 행사 안내](https://www.icao.int/sites/default/files/Meetings/FALForumMongolia/Participant_Handbook_v2.pdf) | 운영자는 Chinggis Khaan International Airport의 IATA UBN·ICAO ZMCK를 명시. 민항청은 UBN/ZMCK와 Buyant-Ukhaa ULN/ZMUB를 별개 행으로 기재. ICAO 2025 안내도 울란바토르 도착 공항을 UBN으로 표시 | ULN을 UBN으로 전 항공사 자동 치환하지 않음. BX 공시의 UBN 노선군을 별도로 사용하며 다른 항공사 취항·부과 기준까지 추론하지 않음 |

MOPS/항공유와 Brent·WTI·Dubai 원유를 같은 직접 산정 지표로 취급하지 않는다. 항공사 공시액, 시장 관측값, 산정 기간 평균, 자체 전망은 서로 다른 데이터다. 원유만으로 단계·공식 금액을 만들어내지 않는다. 단순 왕복은 한국 출발 편도액에 2를 곱한 가정이고 실제 결제 총액이 아니다.

## 재현한 SEO 및 콘텐츠 문제와 처리

- 공개 웹 추출에서 메인 제목은 10·11월인데 초기 본문에는 6·7월 문구가 남았고, 로컬 소스에서도 월별 업데이트가 여러 스크립트에 누적되어 있었다. 초기 HTML과 최종 DOM을 별도로 확인해야 하는 구조다.
- `airlines.html`에는 H1이 없었다. 기존 제목을 H1으로 바꾸고 디자인 클래스는 유지했다.
- `airlines-oct20.js`는 9·10월 비교를 제공하면서 이미 일부 11월 공시가 존재하는데도 11월을 산정 중으로 단정했다. 비교 범위를 9·10월로 명시하고 최신 조회는 기존 계산기로 안내한다.
- 항공사 상세 페이지는 8·9월 비교를 보존한다. `historical-comparison.js`가 과거 비교 범위와 편도·발권일 기준을 명시하고, 최신 공시로 이동하는 링크를 기존 계산기로 연결한다. 과거 가격을 최신 가격으로 재명명하지 않는다.
- 한국 출발 랜딩의 ZE·YP 10월 누락은 **이 표에 미반영**으로 표시한다. 한 페이지의 미반영 상태로 공식 공시 자체가 없다고 단정하지 않는다.
- 뉴스와 전망의 마지막 공통 렌더러가 같은 제목을 사용했다. `sep04-update.js`의 기존 `pack()`에서 뉴스는 공시·시장 소식, 전망은 전망 설명으로 제목·H1을 구분한다. 시장 관측값이나 뉴스 날짜는 바꾸지 않는다.
- `methodology.html`에 MOPS와 원유의 차이, 왕복 추정 가정, 0원 기준 변동률, 같은 통화·구간 비교, 발표일·적용일·수집·검증·편집 시각의 차이를 설명한다.
- `robots.txt`는 공개 HTML 허용 정책을 유지하며 `/api/`를 제외한다. `myrealtrip-api-test.html`은 이미 `noindex,nofollow,noarchive`였다. robots는 접근 제어 수단이 아니므로 API 인증을 대체하지 않는다.
- 기존 `.html` canonical, sitemap 항목과 URL을 유지했다. Vercel `cleanUrls:true`로 리디렉션되는 실제 URL과 canonical을 통일하는 운영 검토는 남아 있다. 검색 노출 이력이 있으므로 이 작업에서 URL을 일괄 변경하지 않았다. 날짜만 최신으로 보이게 하는 sitemap `lastmod`는 추가하지 않았다.
- AI 크롤러를 별도로 차단하는 규칙은 없다. 검색·AI 답변 노출은 보장하지 않는다. [Google 구조화 데이터 원칙](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)에 맞게 사용자에게 보이는 내용과 JSON-LD가 일치하는지 검증한다.
- 계산기 초기 HTML의 Twitter 설명은 11월 5개사, 다른 메타는 8개사였고 본문은 8·9월 비교와 10월 공시 전 문구를 포함했다. 메타·본문을 기존 10·11월 공시 범위에 맞추고, 실행 FAQ는 기존 `NOVEMBER_2026_NOTICE_COPY`를 재사용한다. 계산기 안의 6개 언어 산정 설명에서도 MOPS·원유·원 통화·항공사별 조건·단순 왕복 추정을 구분한다. 공시 금액은 이 작업에서 새로 생성하지 않았다.
- 제주항공 관련 링크의 `rel.notice`·`rel.forecast` 키는 다른 상세 페이지의 `rel.may`·`rel.jun`과 달랐다. 공통 과거 비교 안내가 두 키 형태를 모두 처리하며 최신 공시 링크의 실제 대상도 계산기로 맞췄다.

## 계산기 독립 코드 검토 후속

코드 검토에서는 공시 확정 상태와 원문 검증 상태가 분리되고, 원 통화 월별 비교·0원 기준 변동률·localStorage 실패 처리가 존재함을 확인했다. 다음 세 구체적 문제는 계산기 담당자에게 전달했고 담당자가 수정 및 단위 검증을 완료했다고 보고했다. 최종 통합 브라우저 결과는 루트 검증 보고서를 기준으로 한다.

- 동일 노선·발권월의 신규 검증 레코드가 기존 통화·부과 기준과 다르면 무시하고 구 자료로 돌아가던 선택 조건. 새 통화·구간 레코드를 우선하고 모호한 중복은 차단하도록 수정했다.
- 공식 원문 URL의 쿼리만 변경해도 공시 수정 배지가 생기던 fingerprint. 가격·통화·부과 조건 등의 실질 내용 변경과 출처 URL 변경을 구분하도록 수정했다.
- 재검증이 필요한 기록도 최저 공식 금액 요약에 포함하던 조건. 확인된 기록만 최저 금액에 포함하도록 수정했다.

초기 HTML/최종 DOM 동기화, 6개 언어 FAQ와 JSON-LD의 일치, 모바일 및 지연 렌더 후 안정성은 스냅샷 갱신 뒤 통합 브라우저에서 다시 검증해야 한다. 공식 출처의 전체 노선·과거 월 전수 확인이나 운영 분석 계정 수신까지 이 코드 검토가 보장하지 않는다.

## 정적 스냅샷 유지관리

`scripts/sync_static_snapshots.cjs`는 기존 Playwright와 로컬 서버를 재사용한다. 검증된 데이터·렌더러 수정 후 실행한다. 새 수치나 날짜를 생성하지 않고, 기존 렌더러가 보여주는 텍스트·표와 메타데이터를 초기 HTML에 반영한다.

```powershell
$env:PLAYWRIGHT_BROWSERS_PATH='C:/Users/jiwoo/AppData/Local/ms-playwright'
node scripts/sync_static_snapshots.cjs --write
node scripts/sync_static_snapshots.cjs
# 특정 페이지에 한정할 수 있음
node scripts/sync_static_snapshots.cjs --write --pages=index,news,forecast
```

외부 통신과 API는 차단하고 자식 프로세스에서 로컬 서버를 띄운다. 원본 스크립트·입력 필드·버튼·이벤트 노드·개인화·동의 UI는 복사하지 않는다. 계산기도 기본 대상에 포함하되, 정적 FAQ와 소개 문구만 동기화하며 검색 결과·선택 조건·저장 노선은 제외한다. 쓰기 없는 재실행에서 차이가 발견되면 실패 상태를 반환하므로 검토 시 누락을 찾을 수 있다. 검증 실패 자료를 신뢰할 수 있는 자료로 만드는 도구는 아니며, 데이터 검증을 먼저 통과해야 한다. 변경 후 한국어 초기 HTML, 실행 화면, 모바일, 언어 전환을 확인한다.

## 분석·광고 운영 확인

[Google 이벤트 가이드](https://developers.google.com/analytics/devguides/collection/ga4/events) 및 [DebugView](https://support.google.com/analytics/answer/7201382)에 따라 허용된 테스트 세션에서 실제 이벤트와 파라미터를 확인한다. 동의가 없는 세션은 DebugView에 보이지 않을 수 있다. 코드와 로컬 이벤트 검증만으로 운영 GA4 수신 또는 광고 수익을 확인했다고 보고하지 않는다.

[Clarity Consent V2](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-consent-api-v2)는 `ad_Storage`, `analytics_Storage` 값을 받는다. EEA·UK·CH 방문의 동의 신호 요건은 2025-10-31부터 적용되며, 비동의 모드도 제한된 측정을 수행할 수 있으므로 명시적 수집 차단은 스크립트 로드 차단과 함께 검증한다. [마스킹 문서](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-masking)에 맞게 프로젝트 마스킹 설정도 운영자가 확인해야 한다. 국가별 적용 의무와 실제 사업자의 개인정보 처리 현황에 대한 최종 법률 검토는 별도다.

제휴 클릭은 GA4 행동 지표다. 판매 확정·취소·환불·수수료는 제휴 플랫폼 원장을 통해 별도로 확인해야 한다. 관리자 계정 접근 없이 광고 승인 상태, 수익, 전환율을 추정하지 않는다.

## 이메일 알림 후속 설계

조회한 `api/`, `lib/`, `.env.example`에서는 이메일 발송·구독 수신 동의 시스템을 확인하지 못했다. 동작하지 않는 신청폼, 회원가입, 이메일 SaaS를 추가하지 않는다. 현재 관심 노선은 브라우저 보관 범위다.

도입 전에는 이메일·관심 노선의 보관 기간, 수신 목적별 동의와 증빙, 본인 확인, 구독 취소 토큰, 발송 빈도, 반송·신고·수신거부 처리, 삭제 요청, 계정별 접근 권한, 중복 발송 방지, 도메인 인증(SPF/DKIM/DMARC), 봇·대량 신청 방어가 필요하다. 새 공시를 수집한 후 검증을 통과한 변경에만 발송해야 한다. 운영비는 구독자 수 × 공시 빈도 × 메일 수와 로그·저장·작업자 실행량을 정한 뒤 제공업체 견적으로 확인한다. 현재 사용량과 제공업체가 정해지지 않아 금액을 제시하지 않는다.

## SaaS/API 사업성 — 구현 보류

| 후보 | 가능한 데이터와 고객 가치 | 선행 조건 및 중복 | 비용·수요 검증 |
| --- | --- | --- | --- |
| 항공사 공식 공시 조회 API | 출처·적용 기간·통화·구간·검증 상태를 정규화한 조회 | 기존 공개 계산기의 데이터와 중복. 원문 전체 복제와 정규화 사실 데이터 제공을 구분하고 항공사별 이용 조건 확인 | 여행 서비스 개발자에게 스키마 예제·샘플 응답으로 수동 검증. 호출량·가용성 요구 파악 후 비용 산정 |
| 월별 이력 API | 과거 비교, 수정 이력, 재현 가능한 공시 버전 | 과거 데이터의 검증·시각 누락을 정리하고 수정 전후를 보존해야 함 | 실제 업무에서 필요한 기간·항공사 범위·정정 빈도를 인터뷰로 검증 |
| 기업 데이터 피드 | 여러 항공사 자료 수집·검수 업무의 절감 | 원문 링크 제공만으로 수요가 충족되는지 먼저 검증. 이용 허락·SLA·정정 통지가 필요 | 파일 형태의 수동 시험 제공부터. 크롤러 유지보수·수동 검수·지원 인건비 포함 |
| 여행사 공시 변경 알림 | 확인된 변경의 빠른 전달과 근거 링크 | 소비자 관심 노선 기능과 목적 구분. 이메일 시스템·중복 방지·오탐 관리 필요 | 공시 후 누가 어떤 업무를 수행하는지 확인하고 소규모 운영 시험으로 가치 검증 |
| 외부 개발자 API | 항공사별 서로 다른 규칙의 통합 접근 | 조회 API와 기능 중복이므로 별도 제품으로 선행 개발하지 않음 | API 키·사용량 제한·버전 정책은 권리와 실제 수요 확보 후 구현 |

공개 열람 가능은 상업적 재배포 허락을 뜻하지 않는다. [에어부산 이용약관](https://www.airbusan.com/content/common/policy/agreement), 각 항공사의 최신 약관·자동 수집 허용 범위와 서면 라이선스를 확인해야 한다. 이번 작업에서 재배포 권한을 확보하지 않았다. [S&P Global 라이선스 안내](https://www.spglobal.com/en/licensing-terms-and-conditions)와 [Platts 시험 이용 조건](https://www.spglobal.com/energy/en/products-solutions/delivery/platts-trial-subscription-terms-and-conditions)은 상품·계약별 조건을 구분한다. MOPS/Platts 원시 시세를 무료 재배포할 수 있다고 가정하지 않는다.

수요·권리·운영 원가가 확정되기 전 결제·유료 구독·SLA를 출시하지 않는다. 현재는 기존 수집기와 검증 결과, 고객 인터뷰 및 수동 샘플 제공 계획까지만 유지한다. 모든 항공사의 최신 이용약관, 실제 수요, 광고 계정, 제휴 판매 실적, 이메일 비용은 미확인 상태다.
