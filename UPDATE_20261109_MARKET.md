# 2026-11-09 평일 아침 시장·뉴스·전망 업데이트

- 자료 기준: **2026-11-09 09:00 KST (00:00 UTC)**. 자동 실행은 09:02:46 KST에 시작되어 실제 열람·편집시각과 구분한다.
- 시작 HEAD: `59ad282` (add 20261106 news and forecast). 시작 당시 사용자 수정은 추적 파일 23개와 신규 홈 UI·폰트·검증 파일 등 **총 29개 파일**이었다. `artifacts/review-verification/market-nov09/start.json`, `preexisting.patch`, `preexisting/`에 원본·해시를 보존했다.
- 저장소와 상위 경로의 AGENTS.md는 없었다. 최신 UPDATE 보고서, PIPELINE_README, 출처 검증·분석/배포 운영 문서를 읽었다. 사용자 디자인·홈 검색·뉴스 지연 로딩 수정과 기존 데이터·기사를 보존한다.
- 범위: 로컬 시장 데이터·전망·뉴스·연결 화면·검증·보고. commit·push·운영 배포·제3자 메시지 발송은 하지 않는다. 사용 중단된 ExchangeRate-API와 mock 파이프라인을 실행하지 않는다.

## 1. 이번에 확인한 자료

| 항목 | 값·관측시점 | 성격·공개 근거 |
|---|---|---|
| USD/KRW | **1,356.6 KRW/USD**, **+14.5원(+1.08%)**, 11/6 **15:30 서울 주간 종가** | [경향신문 원문](https://www.khan.co.kr/article/202611061634001/amp), 11/6 16:34 KST 게시. 야간 종가·장중·실시간·항공사 산정평균과 구분 |
| Brent | **98.32 USD/bbl**, **2027년 1월물**, +0.03(+0.03%), 11/6 정산 | [Bloomberg/Rigzone](https://www.rigzone.com/news/wire/oil_posts_biggest_weekly_drop_since_2022-06-nov-2026-185035-article/) 게시 11/6 21:05:21 UTC = 11/7 06:05:21 KST |
| WTI | **90.83 USD/bbl**, **2026년 12월물**, +0.31(+0.34%), 11/6 정산 | [Reuters 재배포](https://www.globalbankingandfinance.com/oil-set-sharp-weekly-drop-middle-east-supply-concerns/) 수정 11/6 21:47:23 UTC = 11/7 06:47:23 KST에 정산 반영. 최초 게시 02:49:50 UTC의 장중 기사와 구분 |
| Singapore Jet 과거 참고값 | **163.89 USD/bbl**, 11/4 평가, -0.63 | [CommodityScope](https://commodityscope.com/prices/singapore-jet-kerosene)의 자체 일일 FOB Singapore indicative assessment. 신뢰도 낮음. 오늘 원문 일별표를 다시 확인했고 11/6 실행의 열람 기록으로 오늘 cutoff 이전 공개를 입증. **최신 평가가 아닌 날짜 명시 과거 참고값** |
| Windward | **최소 16회, 진입 8·출항 8**, **11/5 18:00 UTC~11/6 14:00 UTC** 관측창 | [11/6 판](https://insights.windward.ai/). Last-Modified 11/6 15:37:28 UTC = 11/7 00:37:28 KST. 정확한 최초 게시시각으로 사용하지 않음 |
| IMO | **선원 사망 25명**. 사건 목록 **129건**, 보도자료 **최소 130건** | [공식 목록](https://www.imo.org/en/mediacentre/hottopics/pages/middle-east-highlighted-incidents.aspx)은 as at 11/6. [11/6 공식 보도자료](https://www.imo.org/en/mediacentre/pressbriefings/pages/imo-council-c138-urges-stronger-protection-of-seafarers-amid-threats-to-global-shipping-.aspx)의 게시일은 cutoff 이전이며 정확한 시각은 미제공 |

원유 숫자는 원문 보도 교차 검증이며 거래소 정산표를 직접 검증한 것은 아니다. Bloomberg의 WTI +0.3%는 한 자리 반올림이고 Reuters의 +0.34%를 정밀 표시에 사용한다. 월물 교체 영향을 받을 수 있는 주간 원유 하락률은 반영하지 않았다. 항공권 비교용 기존 환산율과 공시액을 시장 종가로 임의 재계산하지 않는다.

### 해상 안전·공급 범위와 불일치

IMO의 두 공식 자료는 공격/사건 총수가 일치하지 않는다. **단일 확정 사건 누계는 null**로 두고 출처별 129/최소 130 및 차이 미해소 상태를 표시한다. 보도자료는 11/6 게시가 명시되어 cutoff 이전 자료다. 목록은 as-at 날짜만 있고 오늘 첫 열람은 09:03:55 KST여서, 최신 목록의 09시 이전 공개시각은 미확인이다. 따라서 목록 129/25는 **출처 불일치 열람 대조용**으로 표시하며 cutoff 당시의 단일 확정 누계로 사용하지 않는다. 이는 호르무즈만의 전수 통항 수가 아니다. VELOS SAPPHIRE 사건도 목록은 11/4, 보도자료는 11/5로 날짜가 달라 한 날짜로 임의 통일하지 않는다. 선원 실종을 임의로 사망으로 환산한 것이 아니라 공식 보도자료의 25번째 사망 확인을 반영한다.

Windward 상단의 ‘Data as of 5 November’만 보고 11/5 하루 관측으로 표시하지 않는다. 본문에 명시된 두 날짜의 관측창을 사용한다. 업체 관측 통항은 전수 통항량·원유 b/d·선박안전 회복과 다르다. 현재 전체 통항·원유 유량은 계속 null이다.

### 이라크 수출 항로 관련 발언

[Reuters/gCaptain 원문](https://gcaptain.com/iraq-has-reached-understandings-with-us-to-allow-oil-exports-through-hormuz/)은 11/8 이라크 외무장관의 미국과 수출 항로 양해 관련 발언을 보도했다. gCaptain 게시시각 11/8 14:30:33 -08:00 = 11/9 07:30:33 KST, 수정 5초 뒤로 기준시각 이전이다. 오만 인근 항로를 통한 이라크 원유 수출에 대한 **당사자 발언**으로 표시한다. 미국의 별도 확인·실제 추가 수출·통항·선박안전 확보를 독립 검증한 사실로 바꾸거나 b/d 수치를 생성하지 않는다.

## 2. 미확인·미반영 및 과거 자료

- CommodityScope의 현재 페이지 **11/6 평가 158.55 USD/bbl, +5.03(+3.3%)**를 오늘 확인했다. 평가일만 있고 게시시각을 확보하지 못했으며 직접 HTTP·sitemap은 403이었다. 09시 이전 공개를 입증하지 못해 오늘 최신값으로 반영하지 않는다. 월간 자체 평균도 공식 MOPS로 대체하지 않는다.
- [Newsis 10/16 대한항공 발표 보도](https://mobile.newsis.com/view_amp.html?ar_id=NISX20261016_0003828757)를 오늘 재열람해 **11월 27단계·9/16~10/15 MOPS 173.89 USD/bbl(414.03 cents/gal)**를 확인했다. 대한항공 발표를 인용한 보도이며 Platts 원자료 직접 검증 또는 모든 항공사 공통 단계가 아니다.
- 12월 산정기간은 10/16~11/15이며 공식 누적 MOPS·평균환율·확정 단계·금액은 미확인 null 유지. 방향은 **인하 압력·반등 위험 혼재 / 신뢰도 낮음**이며, 과거 항공유 참고값과 환율 상승·해상 위험을 구분한다. 특정 단계·확률·절감액을 생성하지 않는다.
- [OPEC 11/1 공식 결정](https://www.opec.org/pr-detail/620-1-november-2026.html)과 공식 목록을 재열람했다. 12월 요구 생산량은 9월 수준, 다음 회의는 11/29로 새 정책 변경을 확인하지 못했다. 실제 생산·수출량이나 통항 안전 회복으로 해석하지 않는다.
- UKMTO/JMIC 공식 원문은 접근 제한 또는 최신 날짜 본문 미확보로 새 사건 수를 반영하지 않았다. 접근 실패를 사건 0건으로 해석하지 않는다.
- [EIA 공식 RSS](https://www.eia.gov/rss/todayinenergy.xml)의 최신 11/6 기사는 베네수엘라산 원유 수입에 관한 내용이며 현재 항공유 가격·공급량 자료가 아니어서 신규 카드에서 제외한다. 11/5 항공유 수율 분석과 과거 재고·정유 통계는 원래 날짜를 유지한다.

## 3. 항공사 공지

11/9 09:03~09:05 KST 재열람. 본문 확인 5개사와 상세 재확인 제한 4개사를 구분한다. 11월 금액 데이터는 변경하지 않는다.

| 항공사 | 확인 내용 | 공식 URL |
|---|---|---|
| KE | 한국발 편도 KRW, 11/1~30 발권, 9구간 55,600~408,100 기존 값 일치. 게시일 미표시 | [공지](https://www.koreanair.com/contents/footer/customer-support/notice/2026/2611-infuel) |
| OZ | 10/16 게시. 한국발 편도 KRW, 11/1~30 발권, 9구간 62,400~351,100 일치 | [공지](https://flyasiana.com/C/KR/KO/customer/notice/detail?id=CM202610160002530868) |
| YP | 10/27 09:18:18 게시. 한국발 편도 USD 48/64/107/187/236/296, 11/1~30 **결제일**, 원화 환산 **발권일 환율**. 미공시 구간 null 유지 | [공지803](https://www.airpremia.com/a/ko/customer/notice/803) |
| BX | 한국발 편도 USD 43/77/90/106, 11/1~30 발권. 나리타·코타키나발루·치앙마이 출발지 조건 유지. 게시일 미표시 | [공지4420](https://www.airbusan.com/content/common/customercenter/noticeDetail?id=4420) |
| TW | 10/19 09:33 게시. 한국발 편도 KRW 43,400/76,000/95,000/123,500/133,000/—/299,800, 11/1~30 발권. 4,000~5,000마일 미만 미공시 null 유지 | [공지12722](https://www.trinityairways.com/app/customerCenter/notice/retrieve/12722) |
| 7C | 11월 제목·10/16 게시일만 확인. 본문은 등록된 공지 없음으로 금액 재확인 불가 | [공지0814](https://www.jejuair.net/ko/customerServiceCenter/noticeDetail.do?billboardNo=0000000814) |
| LJ | 도구 접근 실패·직접 HTTP403 | [공지28906](https://www.jinair.com/company/announce/announceView?anceSeq=28906&searchWord=&searchKey=titlCtn&page=1) |
| ZE | 직접 HTTP200이나 일반 템플릿으로 11월 공지 본문 없음 | [공지680](https://www.eastarjet.com/newstar/PGWCA00002?cId=11&iId=0&bId=680&lang=KR) |
| RS | PC·모바일 공식 경로403 | [공지11208](https://flyairseoul.com/CW/ko/noticeContent.do?seq=11208&pageNo=1) |

OZ·TW는 직접 HTTP 본문도 확보했다. KE·YP·BX 금액은 브라우징 도구가 반환한 공식 본문으로 대조했고, 직접 HTTP는 KE 셸/YP·BX403이었다. 특히 YP는 도구 크롤 시점이 전날로 표시되어 오늘 실시간 원문 서버 검증 성공으로 쓰지 않는다. KE·BX의 공지 게시일을 임의 생성하지 않았으며 기존 공개 기록과 오늘 일치하는 본문을 근거로 유지한다.

12월 한국발 국제선 확정 공시를 확보하지 못했다. 새로 검색된 [7C 12월 공지0881](https://www.jejuair.net/ko/customerServiceCenter/noticeDetail.do?billboardNo=0000000881&pageNum=1)와 TW 11/6 공지는 **국내선**으로 범위가 달라 제외했다. 접근 실패를 공시 부재나 기존 수치 오류로 해석하지 않는다.

## 4. 시작 시 발견한 배포 검사 제한

시장 수정 전 `check_deployment_readiness`는 실패했다. 기존 사용자 변경 중 보호 범위에 있는 **package.json, scripts/verify_release.cjs, public/privacy.html, public/terms.html**이 기준과 달라 운영 검토 근거·scopeDigest가 요구된다. 실제 차이는 테스트 명령 2개 추가와 정책 화면 글꼴 CSS 수정이며, 광고 활성화나 새 API 키 변경으로 단정하지 않는다.

이 차단은 오늘 시장 수정 이전부터 존재했다. 운영 승인·기준 해시를 임의 갱신하거나 배포 검사를 우회하지 않는다. 필요한 로컬 기능 검사는 개별 명령으로 수행하며, 기능 검사 통과와 배포 준비 완료를 구분한다.

## 5. 수정·검증 결과

### 수정 파일

- `public/_shared.js`: Nov9 스냅샷 추가. 기존 스냅샷을 변경하지 않았다. 생성 기록 09:09:11 KST.
- `public/data/forecast_feed.json`: 동일 자료·검증 범위와 공식 미확정 null 동기화.
- `public/market-nov09.js`: 새 5개 기사, 6언어 지표·전망·FAQ·SEO/JSON-LD 데이터. 실제 수정시각 09:13:14 KST. 기존 137기사 내용·날짜 보존. FAQ에 상속되어 남던 128건 질문도 출처별 차이를 묻는 질문으로 교체했다.
- `public/forecast.html`, `public/news.html`: 새 모듈과 초기 HTML 연결. 기존 디자인·폰트·카드·지표 구성과 사용자 뉴스 로딩 개선 보존.
- `public/index.html`, `public/fuel-surcharge-calculator.html`, `public/fuel-surcharge-graph.html`: 공통 자산 버전 및 필요한 초기 HTML 동기화.
- `scripts/verify_nov09.cjs`: 최신 cutoff·자료 범위·IMO 불일치·과거 참고값·6언어·137기사 보존·콘솔·모바일·지연 안정성 검사. 자체 로컬 서버를 시작·종료한다.
- `UPDATE_20261109_MARKET.md`: 이번 실행의 출처·결과·한계 기록. 기존 보고서 수정 없음.

### 검증

- `node scripts/verify_nov09.cjs` **PASS**: 6언어 지표·전망·FAQ/JSON-LD·canonical, 새 5기사와 이전 137기사 전체 JSON 불변, 1440px 데스크톱/390px 모바일, 12초 뒤 화면 안정성, 그래프 실제 그리기 확인. 전망·뉴스 콘솔 오류와 페이지 예외 각각 **0건**.
- `npm test`에 해당하는 기존 Node 검사 **120/120 PASS**. 기존 정적 소스·데이터·공시 데이터·URL·제휴 통합·주요 화면·홈 월 전환·새 홈 인터랙션·뉴스 지연 로딩·그래프·계산기 검사가 통과했다. 최종 전체 결과는 아래에 기록했다.
- 기존 그래프 검증은 11월 9개사 56개 금액과 6언어×9통화, YP 6개 공시액 및 미공시 구간 null, 모바일·지연 안정성을 확인한다. 이 로컬 검증을 오늘 원격 공지 9곳 모두 접근 성공이라는 의미로 쓰지 않는다.
- 5개 연결 화면의 초기 HTML과 SEO 데이터를 동기화했다. 모바일 전망 상단과 데스크톱 뉴스 화면을 직접 열람했으며 사용자 폰트·카드 구성과 현재 전망이 유지됐다.
- 보존 검사 **PASS**: 기존 수정 파일 중 연결 HTML 5개를 제외한 **24개 파일의 바이트가 시작 상태와 동일**하다. 연결 HTML의 기존 style·실행 script 본문이 동일하다. `_shared.js`는 Git 줄바꿈 정규화 기준 기존 전체 내용 뒤에만 추가됐다(CRLF 작업본과 Git LF 비교). 과거 보고서·공시액·제휴/광고 설정을 변경하지 않았다. 증거: `artifacts/review-verification/market-nov09/preservation.json`.
- 최종 로컬 기술 검사 **15/15 PASS**: 언어별 월 경계 54개 화면/언어 조합과 13개 SEO 스냅샷까지 통과했다. 시작/종료 소스 SHA-256이 동일하다. 런타임 Node v24.14.0 / Playwright 1.59.1. 최종 증거: `artifacts/review-verification/market-nov09/technical-summary.json`.
- 소스 SHA-256: `3eb66b0aba507cebe6e40299ce90ab221d11b2dc0fa7403d6d9cc83ccd9ae9c8`. 배포 준비는 **false**이며 위에 기록한 기존 운영 범위 검토 차단을 유지한다.
- `git diff --check` 통과. HEAD는 시작과 같은 `59ad282`이며 이번 실행에서 commit·push·배포를 하지 않았다.

검증 로그·화면·시작 원본은 `artifacts/review-verification/market-nov09/`에 보존했다. 일일 화면 원본은 `C:\Users\jiwoo\AppData\Local\Temp\aero-nov09-qa\`에 있다. 배포 준비 검사 실패를 기능 검사 통과로 덮어쓰지 않는다.

### 제한

외부 요청을 차단한 로컬 UI 검사는 제휴 전환·정산 수신, GA4 계정 수신이나 운영 배포 성공을 입증하지 않는다. 현재 광고 비활성·운영 검토 pending 상태를 보존한다. 4개 항공사 원문 제한·최신 Jet 게시시각 미확인·IMO 목록과 보도자료의 범위 및 날짜 차이·12월 공식 평균/단계/금액 미확인을 그대로 남긴다.

## 6. 사용자 요청에 따른 배포 진행 (2026-11-09 11:57 KST 이후)

아침 자동 실행 종료 뒤 사용자가 배포·커밋·푸시를 명시적으로 요청했다. 요청한 커밋 메시지는 `add 20261109 news and forecast`다. 이번 추가 실행은 검증한 기존 홈 UI·폰트·뉴스 지연 로딩 수정과 오늘 시장 업데이트를 함께 배포하는 범위다.

- 원격 main과 로컬 HEAD59ad282가 일치하며, 배포 직전 코드 소스 해시가 아침 15/15 검증 당시의 `3eb66b0aba507cebe6e40299ce90ab221d11b2dc0fa7403d6d9cc83ccd9ae9c8`와 같음을 확인했다.
- 보호 파일 43개 중 달라진 4개를 검토했다. package.json과 verify_release는 검사 2개 추가이며 기존 검사는 유지한다. privacy/terms는 폰트 CSS 수정이며 정책 본문·동의 동작은 동일하다.
- 실제 검토 근거를 `docs/review-evidence/20261109-operational-review.json`에 기록하고 `config/deployment-review.json`의 operations에 시각·범위 해시·근거를 연결했다. 기존 runtimeBaseline을 교체하지 않았고 광고 pending/비활성 상태를 유지했다.
- 배포 준비 검사 **PASS**, 배포 차단·광고 동의·범위 해시·Windows/CI 줄바꿈 및 Vercel JSON 관련 회귀 **15/15 PASS**. 검토 메타데이터 외 실행 코드는 아침 검사 이후 바꾸지 않았다.
- 이는 변경 파일 범위의 배포 전 검토다. GA4 수신·광고/CMP 계정·제휴 전환/정산을 검증했다는 의미가 아니다.
- 커밋·푸시 후 최종 SHA의 GitHub/Vercel 결과와 운영 사이트 반영을 별도 확인한다.

스테이징 검사에서 신규 OFL 라이선스의 줄 끝 공백 1곳을 발견해 제거했다. 라이선스 문구·폰트 파일·실행 코드에는 변화가 없다.
