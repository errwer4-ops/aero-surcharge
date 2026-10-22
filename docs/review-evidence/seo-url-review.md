# SEO URL 재검토 근거

검토 시각: 2026-10-21 18:44~18:49 KST (09:44~09:49 UTC). 운영 사이트는 읽기 전용으로 조회했으며 배포하지 않았다.

## 재현

`vercel.json`은 `cleanUrls:true`, `trailingSlash:false`이다. [Vercel 공식 설명](https://vercel.com/docs/project-configuration/vercel-json#cleanurls)은 확장자가 있는 경로를 확장자 없는 경로로 308 리디렉션하며 원래 HTML 파일은 그대로 서비스한다고 설명한다. [trailingSlash 설명](https://vercel.com/docs/project-configuration/vercel-json#trailingslash)에 따르면 루트 외 경로의 끝 슬래시도 제거된다.

웹 열기 도구가 다음 실제 요청의 리디렉션 목적지를 반환했다.

| 요청 | 반환된 최종 URL |
| --- | --- |
| `https://aero-surcharge.com/index.html` | `https://aero-surcharge.com/` |
| `https://aero-surcharge.com/airlines.html` | `https://aero-surcharge.com/airlines` |
| `https://aero-surcharge.com/fuel-surcharge-calculator.html` | `https://aero-surcharge.com/fuel-surcharge-calculator` |
| `https://aero-surcharge.com/news.html` | `https://aero-surcharge.com/news` |
| `https://aero-surcharge.com/forecast.html` | `https://aero-surcharge.com/forecast` |

이 도구는 원시 응답 상태 코드/전체 헤더를 제공하지 않으며 일부 본문은 기존 수집본이다. 따라서 위 결과만으로 실시간 응답 코드를 308이라고 측정했다고 주장하지 않는다. 원시 HTTP 조회 결과와 오류는 `url-live-before-deployment.json`에 별도로 기록한다. 요청 실패는 검증 성공이 아니다.

수정 전 정적 검사 `url-static-before.json`은 18개 콘텐츠 페이지와 sitemap 17개 URL을 검사했다. canonical·OG·JSON-LD가 `.html`로 남았고, 뉴스/전망의 지연 렌더러도 다시 `.html` URL을 설정했다. 예전 전망 URL 별칭의 리디렉션 목적지도 `/forecast.html`로 되어 추가 리디렉션이 필요했다. 플래너에는 canonical/OG URL이 없었다.

## 수정

- canonical·OG·구조화 데이터의 자체 URL과 뉴스/전망 URL setter를 운영 리디렉션의 최종 경로로 통일했다. `index.html`의 자체 URL은 `/`이다.
- HTML 파일명과 기존 `.html` 탐색 링크를 유지한다. `cleanUrls` 설정을 유지하므로 기존 주소는 계속 최종 경로로 연결된다.
- 기존 리디렉션 `source`는 모두 보존하고 전망 별칭의 목적지만 `/forecast`로 바꿔 불필요한 연결 단계를 없앴다.
- sitemap의 기존 17개 항목을 같은 최종 경로로 맞췄다. 플래너는 자기 canonical/OG만 추가했으며 새 검색 노출 대상으로 sitemap에 넣지는 않았다.
- `sync_oct19_metadata.cjs` 및 기존 URL 단언 검사도 새 정책을 사용한다. `_shared.js`에서는 해당 자체 URL setter가 검색되지 않았고 수정하지 않았다.

## 배포 전 필수 검사 연결

루트 빌드/CI 담당 단계에서 다음 두 읽기 전용 명령을 필수 검사로 연결한다. 이 문서는 배포 실행이나 배포 승인 기록이 아니다.

```text
node scripts/audit_seo_urls.cjs
node scripts/sync_static_snapshots.cjs
```

스냅샷 검사는 차이가 있을 때 실패한다. 공시·렌더러가 수정되면 원문/데이터 검증을 통과한 뒤 `--write`로 로컬 HTML을 갱신하고, 결과를 검토한 다음 쓰기 없는 명령으로 재확인한다. 배포 중 자동 갱신으로 차이를 숨기지 않는다.

실행 시 canonical을 다시 바꾸는 지연 스크립트를 잡기 위해 기존 Playwright를 사용하는 추가 검사를 제공한다.

```text
node scripts/audit_seo_urls.cjs --browser --pages=news,forecast,fuel-surcharge-calculator --report=docs/review-evidence/url-runtime-after.json
node scripts/audit_seo_urls.cjs --live --report=docs/review-evidence/url-live-before-deployment.json
```

브라우저 검사는 자체 로컬 서버를 사용하고 외부/API 요청을 차단한다. 확장자가 없는 실제 서비스 경로를 열어 4.7초 및 5.4초 시점의 canonical·OG·JSON-LD를 검사한다. 로컬 서버는 Vercel의 리디렉션을 구현하지 않으므로 실제 리디렉션은 `--live` 결과로만 판정한다. `--live`는 외부 계정이나 인증정보 없이 GET 요청만 하며, 로컬 수정과 현재 배포본의 상태를 구분한다.

## 결과와 한계

- 수정 전 실패와 수정 후 통과는 `url-static-before.json`, `url-static-after.json`에 타임스탬프와 검사 항목을 보존한다.
- `url-runtime-after.json`이 생성된 경우 해당 실행의 `passed`, `runtime` 및 `errors`가 실제 브라우저 결과다. 파일 없이 브라우저 검증 완료로 보고하지 않는다.
- `url-live-before-deployment.json`의 `liveStatus: incomplete` 또는 개별 `error`는 네트워크 검증 미완료다. `localPassed`와 혼동하지 않는다.
- 기존 배포본의 canonical이 아직 `.html`이어도 이 작업에서 배포하지 않았으므로 로컬 수정 실패를 뜻하지 않는다. 승인된 차후 배포 후에는 동일 읽기 검사를 다시 실행해야 한다.
- robots·실제 검색 색인·Search Console 선택 canonical·AI 검색 노출은 이 URL 일치 검사만으로 확인되지 않는다.
