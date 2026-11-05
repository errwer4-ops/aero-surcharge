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

## 배포 검사와 운영 검토 범위 (2026-11-05 수정)

10월 22일 도입한 전체 소스 해시 기반 검토가 미완료 상태여서 매일의 시장·뉴스 수정까지 프로덕션 빌드를 차단했다. 11월 5일 사용자의 수정 요청에 따라 `config/deployment-review.json`을 version 2로 전환했다.

- `sourceDigest`는 공개 파일·API·라이브러리·스크립트·테스트·CI·패키지·배포 검토 설정 전체를 기록한다. 빌드 도중 입력 변경을 감지하고 검증 증거와 연결하며, 수동 운영 승인 해시로 사용하지 않는다.
- `operationalDigest`는 API·라이브러리, 광고/분석/동의 로더, 공개 운영 설정·정책, 수집 진입점, 패키지, Vercel/CI 및 배포 검사 코드만 포함한다. 일일 시장 모듈·공시 피드·일반 화면 문구·일일 테스트 파일은 포함하지 않는다. 보호 경로는 `lib/release-readiness.cjs`에 고정한다.
- `runtimeBaseline`은 이번 정책 전환 당시의 저장소 설정과 시각을 명시적으로 기록한 비교 기준이다. 실제 운영 서비스의 배포 버전이나 외부 계정 검증 완료를 뜻하지 않는다. 빌드가 이 기준을 자동 갱신하지 않는다.
- 기준 설정과 같으면 기존 `pending`을 경고로 유지하면서 기술 검증을 진행한다. 운영 범위가 달라지면 실제 검토 완료 상태·유효한 검토 시각·근거와 현재 `operations.scopeDigest`가 있어야 통과한다. 새 API 추가·삭제도 변경으로 감지한다.
- 광고가 활성화된 설정은 기준 일치 여부와 무관하게 현재 범위의 광고 결정·동의/CMP 검토·근거·시각·`ads.scopeDigest`가 필요하다. 현재 `adsEnabled:false`, 광고/운영 검토 `pending`과 기존 null 근거는 그대로 유지한다.

`npm run build`와 `npm run verify:release`는 로컬·CI·Vercel preview·production에서 동일한 범위 검사를 적용한 뒤 기존 기능·데이터·원문·화면·SEO 검사를 모두 실행한다. 테스트 실패는 계속 exit 1이다. Preview에서도 미검토 광고 활성화나 운영 설정 변경을 우회하지 않는다. `npm run check:deployment`는 현재 통과 여부·기준 일치 여부·미완료 운영 검토를 구분해 출력한다.

새로운 운영 설정을 검토할 때는 실제 검증 근거를 `operations`와 필요한 경우 `ads`에 남긴다. `runtimeBaseline`을 다시 생성하거나 검토 상태를 임의로 `reviewed`로 바꾸는 것은 검증을 대신하지 않는다. DebugView 수신·광고 노출 등 외부 결과는 로컬 빌드 성공으로 확인됐다고 표시하지 않는다.

### Vercel 환경 차이 추가 점검 (2026-11-05)

사용자가 푸시한 `d2daed0`은 GitHub Actions의 Ubuntu/Node 22 환경에서 같은 범위 검사와 11개 기술 검사를 모두 통과했으나, Vercel에서는 기술 검사 전에 기준 불일치로 실패했다. 원격 로그에 실제 파일별 해시가 없으므로 어떤 입력이 달라졌는지는 아직 확인하지 못했다. Windows 줄바꿈·경로 구분자·Git에 반영되지 않은 변경은 원본 바이트 및 POSIX 경로 대조로 배제했다.

- Vercel과 CI 설치 명령을 `npm ci --ignore-scripts --include=dev`로 통일하고 Node 엔진을 `22.x`로 맞춘다. `--include=dev`는 `NODE_ENV=production`에서도 검사에 필요한 dotenv가 설치되도록 명시한다. `npm ci`는 package/lock 파일을 수정하지 않으며 불일치 시 실패한다. 이것은 환경 차이를 줄이는 조치이며, 기존 실패가 lock 재작성 때문이었다는 확정 근거는 아니다. [npm ci 문서](https://docs.npmjs.com/cli/v11/commands/npm-ci/), [Vercel 설정](https://vercel.com/docs/project-configuration/vercel-json#installcommand).
- 기준 검사 실패 로그에는 기준/실제 해시, 해시·기록시각·설명 조건의 개별 결과, 운영 파일 경로별 SHA256만 남긴다. 파일 내용이나 환경 변수 값은 출력하지 않는다. 실패한 기술 검사도 마지막 60줄을 빌드 로그에 남긴다.
- 이번 배포 수정에 포함된 설치 계약·진단 코드의 기준 해시는 로컬 검증 후 명시적으로 기록한다. 자동 갱신 기능은 없으며 광고와 외부 운영 검토는 계속 `pending`이다.
- 새 커밋의 Vercel 실행이 통과해야 원격 배포 복구가 확인된다. 로컬 성공이나 이전 GitHub Actions 성공만으로 운영 사이트 반영을 주장하지 않는다.
