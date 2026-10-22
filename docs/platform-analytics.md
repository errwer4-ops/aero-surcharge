# 분석·광고 운영 점검 (2026-10-21)

기존 GA4 `G-76T4QJPY4L`과 AdSense 공개 게시자 ID를 재사용한다. 신규 계정·비밀키·유료 리소스는 만들지 않았다. `public/_analytics-config.js`는 공개 설정 파일이며 비밀키를 넣으면 안 된다.

## 구현과 이벤트 정의

- 모든 페이지의 GA 태그를 `_analytics.js` 한 곳으로 통합한다. 초기 상태는 거부이며, 동의 전에는 GA4·Clarity 네트워크 스크립트를 로드하지 않는다. 저장한 동의는 180일 후 만료한다.
- 검색 실행은 `route_search`, 실제 표시된 유효 결과는 `route_result_view`, 미지원 출발지 또는 데이터 없음은 `route_no_result`다. 유효하지 않은 입력은 검색 성공으로 집계하지 않는다.
- 계산기에서 사용자 조작 이후 실제 표시한 비교에 `airline_compare`와 `month_compare`를 보낸다. 재렌더링과 초기 자동 복원은 새 검색으로 집계하지 않는다.
- 전망/아카이브 본문이 화면에 나타났을 때 한 번 `forecast_view`/`archive_view`를 보낸다. 단순 링크 클릭과 구분한다.
- 기존 제휴 링크는 공통 클릭 핸들러로 `affiliate_click`을 한 번 보낸다. 제휴사·위치·페이지 경로·모바일 여부·조회 결과 후 클릭 여부를 구분한다. `app.ac`는 실제 제휴사를 추측하지 않고 `sim_partner`로 분류한다.
- 이메일 발송/신청 기능이 없으므로 `alert_subscribe`를 보내는 경로가 없다.
- 사용자 입력 원문·이메일·저장 노선 목록·URL 쿼리는 사용자 이벤트에 포함하지 않는다. 허용된 코드/월/상태만 통과한다. GA 자체 접속 식별자와 IP 처리는 사용자 이벤트 필터와 별개다.

## Clarity 및 동의

실제 ID가 없으므로 `clarityId: ''` 상태로 비활성화했다. ID를 설정할 때 Clarity 관리 화면의 Strict masking과 보유 설정을 확인한다. 코드에는 문서 전체 및 입력 마스킹, 동의 후 지연 로드, Consent V2의 `analytics_Storage`/`ad_Storage` 신호가 있다. 동의 철회 후에는 새로고침해 이미 로드된 외부 라이브러리를 종료한다. 이 코드가 모든 지역의 법적 요건을 충족한다는 주장은 하지 않는다.

근거: [Microsoft Consent V2](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-consent-api-v2), [마스킹 설정](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-masking). Consent V2 거부 모드는 쿠키 없는 제한적 처리가 가능하므로, 최초 거부 시에는 라이브러리 자체를 로드하지 않도록 했다.

## 광고와 제휴

광고 위치를 늘리지 않았다. `_ads.js`는 명시적 광고 동의 및 `adsEnabled`가 모두 있어야 로드한다. 기본 `adsEnabled: false`이며 **운영 배포 전** 기존 AdSense 계정의 지역별 동의 관리와 광고 설정을 점검한 뒤 운영자가 활성화해야 한다. 현 운영 사이트는 배포하지 않았으므로 변경되지 않았다.

자체 설정 패널은 Google 인증 CMP를 대신하지 않는다. EEA·영국·스위스의 맞춤형 광고에는 Google 인증 CMP/TCF 요건을 확인해야 한다. [Google 게시자 동의 요건](https://support.google.com/adsense/answer/13554116). 광고 승인 상태와 수익, 제휴 판매 실적은 계정 접근 없이 확인하거나 추정하지 않았다. GA 클릭 수는 판매·정산 수익과 다르다.

## 로컬 검증 및 운영 DebugView 절차

1. `node scripts/verify_platform.cjs`는 자체 로컬 서버를 실행한다. 테스트에서만 `allowLocal: true`를 지정하며 외부 GA/광고/API 요청을 모두 차단한다. 이것은 이벤트 구조 검사이지 운영 수신 확인이 아니다.
2. 승인된 미리보기에서 실제 기존 GA4 ID를 사용하고 `debug: true`를 일시 설정한다. 분석 동의를 선택한다. 실제 운영에서는 `debug: false` 및 `allowLocal: false`를 유지한다.
3. ICN→NRT 검색 한 번: 검색 1회, 결과 1회. 미지원 해외 출발 검색: 검색 1회, 결과 없음 1회. 언어/통화 변경으로 검색이 중복되지 않는지 확인한다.
4. 계산기 월 선택/비교 후 유효 결과와 이벤트를 대조한다. 환율 환산값이 월별 원통화 비교에 섞이지 않는지 확인한다. 제휴 클릭 한 번에 이벤트가 하나인지 확인한다.
5. GA4 관리의 DebugView에서 이벤트명/코드/비교 월을 확인한다. 검색 원문, 이메일, URL query가 없는지 검사한다. 동의 거부 상태에서는 이벤트가 보이지 않는 것이 정상이다. [Google DebugView](https://support.google.com/analytics/answer/7201382).
6. 운영 GA4의 향상된 측정(사이트 검색, 폼 상호작용), 데이터 보유 기간, 광고 신호, 내부 트래픽 필터를 검토한다. 코드만으로 계정 설정을 변경하거나 검증할 수 없다.
7. `clarityId`를 설정한 경우 동의 전 요청 없음, 동의 후 마스킹, 철회 후 새로고침 시 요청 없음과 검색 영역 이탈 관측 가능 여부를 실제 Clarity 계정에서 확인한다.

운영 계정 DebugView, 실제 광고 렌더링, Clarity 수집 결과, 수익 정산은 이번 로컬 검증의 미검증 영역이다.

## 검수 후 배포 차단 연결

`npm run build`는 이제 공통 검증을 거친다. 프로덕션 또는 배포 환경이 명시되지 않은 빌드에서는 `config/deployment-review.json`의 광고 유지/의도적 중단 결정과 운영 검토 근거가 없으면 먼저 실패한다. 현재 모두 `pending`이며 광고 로더를 임의로 활성화하지 않았다. `npm run check:deployment`로 차단 사유와 현재 소스 해시를 읽을 수 있다.

광고 활성화를 결정한다면 실제 계정의 CMP·지역별 설정 및 노출을 확인하고 그 근거를 기록해야 한다. 의도적 비활성화도 명시적인 운영 결정이 필요하다. 운영 검토 해시는 API·공개 파일·검증 코드·CI 설정 변경으로 무효화된다. 이 수동 기록은 DebugView나 광고 노출 증빙을 대신하지 않으며 검사를 통과시키려고 임의로 채우면 안 된다. preview 빌드는 운영 승인 상태와 별개로 자동 검증을 수행한다. 이번 작업에서는 preview/production 어느 쪽도 배포하지 않았다.
