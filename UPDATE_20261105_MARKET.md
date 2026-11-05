# 2026-11-05 평일 아침 시장·뉴스·전망 업데이트

- 자료 기준시각: **2026-11-05 09:00 KST (00:00 UTC)**. 08:58부터 원문 확인을 시작했다. 게시·관측·실제 편집시각을 구분한다.
- 기존 미커밋 홈 반복 문구·월 전환·YP 그래프 수정과 전날 보고서를 보존한다. 시작 상태의 diff는 `%TEMP%/aero-nov05-qa/preexisting.patch`에 저장했다.
- 작업 범위: 공개 자료 확인, 로컬 반영·검증·보고. commit·push·운영 배포·제3자 메시지 발송 없음.

## 1. 이번 실행의 시장 자료

| 항목 | 확인한 관측값 | 가격·통계 성격과 제한 |
|---|---|---|
| USD/KRW | **1,341.5원**, 11월 4일 15:30 서울 주간 종가, **+0.5원** | 11월 5일 실시간 환율이나 12월 산정기간 평균환율이 아니다. |
| Brent | **94.62 USD/bbl**, 2027년 1월물, 11월 4일 정산, **-8.98달러(-8.7%)** | Reuters 보도와 계약월 명시 원문을 대조했다. 거래소 정산표 직접 검증과 구분한다. |
| WTI | **88.12 USD/bbl**, 2026년 12월물, 11월 4일 정산, **-7.97달러(-8.3%)** | 원유 선물이며 항공유 평가나 MOPS가 아니다. |
| Singapore Jet | **164.52 USD/bbl**, 11월 3일 CommodityScope 자체 일일 평가, **-1.03달러(-0.6%)** | FOB Singapore, 신뢰도 낮음. 공식 Platts MOPS·산정기간 평균·실거래 호가로 쓰지 않는다. |
| IMO | **128건·선원 사망 24명**, 기존 **11월 3일** 기준 목록 재확인 | 중동·호르무즈 전체 확인 사건 범위. 숫자와 관측일을 유지하며 새 사건 수로 표시하지 않는다. |
| Windward | **3회(입항 1·출항 2)**, **11월 3일 관측 / 11월 4일 판** | 업체 추적 범위의 통항. 전체 선박 전수 통항이나 원유 b/d가 아니며 안전 정상화를 뜻하지 않는다. |
| 미국 항공유 재고 | **41.782 million bbl**, 10월 30일 주말, 직전 주 **42.217** 대비 **-0.435** | EIA 11월 4일 WPSR. 미국 kerosene-type jet fuel 재고이며 싱가포르 항공유 가격·MOPS와 구분한다. |

11월 공식 공시를 현재 적용으로 유지한다. 12월 산정기간은 10월 16일~11월 15일이며 공식 누적 MOPS·산정 평균환율·최종 단계·부과액은 미확인이다. **보합~인하 가능성, 낮은 신뢰도**라는 방향성 해석에 원유·항공유 참고가격 하락과 환율 소폭 상승·해상 위험을 함께 반영한다. 단계·금액·확률·절감액을 생성하지 않는다.

## 2. 원문·날짜·검증 근거

- **환율:** [뉴시스](https://files.newsis.com/view/NISX20261104_0003854868), 11월 4일 15:48:20 게시. [조선비즈](https://biz.chosun.com/policy/policy_sub/2026/11/04/3FJK5J6IEJFH7IRQNVZ4CHFHBM/?outputType=native), 15:35 게시·15:50 수정. 15:30 종가를 교차 확인했다.
- **원유:** [Reuters/CNA](https://www.channelnewsasia.com/business/oil-slumps-after-midterm-election-rebuke-trump-raises-bets-iran-war-exit-6519506), 직접 HTTP 200 본문과 JSON-LD 수정시각 **11월 5일 04:21:40 +08:00 = 05:21:40 KST** 확인. [Reuters/Cyprus Mail](https://www.cyprus-mail.com/2026/11/04/oil-slumps-after-midterm-election-raises-bets-on-iran-war-exit), 게시 **11월 4일 20:34:08 UTC = 11월 5일 05:34:08 KST**, 같은 정산값 확인. [EFE/Prensa Libre](https://www.prensalibre.com/ahora/economia/el-brent-cae-un-8-67-hasta-los-us94-62-dolares-tras-las-elecciones-legislativas-de-ee-uu/)에서 Brent 1월물 확인. 추가 계약월 근거는 아래 완료 기록에 남긴다.
- **Singapore Jet:** [CommodityScope](https://commodityscope.com/prices/singapore-jet-kerosene). 08:58:40 KST 이전 열람에서 11월 3일 평가값 확인. 공개된 11월 달력월 평균과 여객 12월 산정기간 평균을 섞지 않는다.
- **IMO:** [공식 사건 목록](https://www.imo.org/en/mediacentre/hottopics/pages/middle-east-highlighted-incidents.aspx). 08:58:58 KST 이전 열람에서 `as at 3 November 2026` 128건·24명 확인. 새로운 수치 변경 없음.
- **Windward:** [Daily Intelligence](https://insights.windward.ai/). 08:59:41 KST HTTP 200; 11월 4일 판·11월 3일 관측. Last-Modified **11월 4일 16:51:11 UTC = 11월 5일 01:51:11 KST**. 수정 헤더를 정확한 최초 게시시각으로 취급하지 않는다.
- **OPEC+ 생산정책:** [11월 1일 공식 발표](https://www.opec.org/pr-detail/620-1-november-2026.html)를 재확인했다. 12월 요구 생산량은 9월 수준 유지, 다음 회의 11월 29일. 실제 생산·수출이나 새 증산 결정과 구분한다.
- **OPEC·IEA·IEF 해상 에너지 운송 워크숍:** [11월 4일 공식 발표](https://www.opec.org/pr-detail/621-4-november-2026.html). Last-Modified **11월 4일 14:28:43 UTC = 23:28:43 KST**, 정확한 최초 게시시각 미표시. 해상 운송·보험·시장 안정성 논의이며 생산정책 변경이나 통항 안전 회복 선언이 아니다.
- **IRGC 주장:** [Reuters/MarketScreener](https://www.marketscreener.com/news/iran-s-irgc-says-four-tankers-ablaze-after-hitting-mines-near-strait-of-hormuz-ce785fdede8cf325). JSON-LD 게시 **11월 3일 22:49:16 -05:00 = 11월 4일 12:49:16 KST**. 유조선 4척 기뢰 피해·추가 2척 나포는 IRGC 설명이며 독립 확인된 피해 수로 채택하지 않는다. IMO 집계에 합산하지 않는다.
- **항공유 재고:** [EIA 11월 4일 WPSR Table 6 CSV](https://www.eia.gov/petroleum/supply/weekly/archive/2026/2026_11_04/download/table6.csv), [공식 발표 목록](https://www.eia.gov/petroleum/supply/weekly/). 10월 30일 주말 관측, 표 단위 thousand barrels를 million barrels로 단위 변환했다. 공식 정규 표 발표시각 10:30 ET(11월 5일 00:30 KST)이며 개별 파일 최초 게시시각과 구분한다.
- **걸프 수출:** [Reuters/MarketScreener, 11월 3일](https://uk.marketscreener.com/news/gulf-oil-flows-dip-in-october-from-post-iran-war-high-data-shows-ce785fdedb8ff525), 게시 **15:40:48 UTC = 11월 4일 00:40:48 KST**. Vortexa 10월 원유·콘덴세이트·정제품(LPG 제외) 17.1m b/d, 9월 18.9; Kpler는 다른 경로·품목 범위 16.1m b/d, 9월 17.09. 양사 이란 제외·수정 가능. 두 통계나 선박 수를 합산·연결해 호르무즈 단일 유량을 만들지 않는다.

## 3. 항공사 공식 공시 확인 범위

| 항공사 | 오늘 확인 범위 | 원문 |
|---|---|---|
| KE | 한국 출발 국제선 편도 KRW·11월 1~30일 발권, 9개 구간 55,600~408,100 기존 금액과 일치. 게시일은 이번 추출에 없음. | [공식 공지](https://www.koreanair.com/contents/footer/customer-support/notice/2026/2611-infuel) |
| OZ | 10월 16일 게시, 한국 출발 편도 KRW·11월 발권, 9개 구간 62,400~351,100 기존 금액과 일치. 유무상·마일리지 포함. | [공식 공지](https://flyasiana.com/C/KR/KO/customer/notice/detail?id=CM202610160002530868) |
| 7C | 제목·10월 16일 게시일 확인. HTTP 200이나 금액 본문 미추출로 금액 재검증 불가. | [공식 공지](https://www.jejuair.net/ko/customerServiceCenter/noticeDetail.do?billboardNo=0000000814) |
| LJ | 웹 추출 실패·직접 요청 HTTP 403. 기존 검토 원문을 보존하며 오늘 재검증으로 승격하지 않음. | [공식 공지](https://www.jinair.com/company/announce/announceView?anceSeq=28906&searchWord=&searchKey=titlCtn&page=1) |
| RS | 직접 HTTP 403. 오늘 검색 색인에서 10월 16일·11월 발권·편도 KRW 5개 구간 확인. 직접 본문 성공과 구분. | [공식 공지](https://flyairseoul.com/CM/ko/noticeContent.do?board_id=notice&seq=11208) |
| BX | 한국 출발 편도·11월 발권·USD 43/77/90/106 기존과 일치. ICN/PUS 노선 조건 유지. 게시일 이번 본문 미표시. | [공식 공지](https://www.airbusan.com/content/common/customercenter/noticeDetail?id=4420) |
| TW | 10월 19일 09:33 게시, 한국 출발 편도·11월 발권·KRW 7개 군 기존과 일치. 6군 대시는 금액 없음이며 0이 아님. | [공식 공지](https://www.trinityairways.com/app/customerCenter/notice/retrieve/12722) |
| ZE | HTTP 200이지만 템플릿만 추출. 금액·조건 이번 재검증 불가, 기존 원문 기록 유지. | [공식 공지](https://www.eastarjet.com/newstar/PGWCA00002?cId=11&iId=0&bId=680&lang=KR) |
| YP | 10월 27일 09:18:18 게시. 한국 출발 편도 USD 48/64/107/187/236/296, **11월 1~30일 결제일 기준**, 원화 환산은 **발권일 환율**. 1,500~1,999마일 공시 구간 없음. 기존 6개 금액과 일치. | [공식 공지 803](https://www.airpremia.com/a/ko/customer/notice/803) |

9개사 공식 도메인·목록 검색에서 **한국 출발 국제선 여객 12월 확정 공시 근거는 확보하지 못했다**. 일본 출발 11~12월 공지·화물 kg 요율·과거 연도 공지를 제외했다. 검색 부재를 공시가 없다는 확정 사실로 바꾸지 않는다. 일부 접근 실패는 해당 항목에만 한정했다.

## 4. 과거 보고서 정정과 미반영 항목

- 11월 4일 보고서의 LARGO ATOM “손상·오염 없음”, SELAT STORM “손상·오염 여부 미상” 표현을 정정한다. IMO 현재 원문은 **두 선박 모두 손상**, LARGO는 **오염 없음**, SELAT는 **오염 여부 미상**이다. 사건일은 모두 11월 1일. 기존 보고서를 덮어쓰지 않고 이 실행에 정정을 남긴다.
- 공식 Platts MOPS 누적평균·산정 평균환율·12월 단계/금액은 미확인으로 유지한다. 제3자 일일 평가나 화물 달력월 평균을 대신 넣지 않는다.
- 호르무즈만의 최신 원유 b/d는 확보하지 못했다. IMO 사건·Windward 통항·걸프 월간 수출은 별도 범위다.
- UKMTO 사건 페이지의 추출 결과 `0 reports`는 접근·추출 한계이며 실제 사건 0건을 뜻하지 않는다.
- 일부 웹 도구는 원문 열기에 실패했으나 직접 HTTP 본문·JSON-LD로 재확인했다. HTTP 200 자체를 수치 검증으로 취급하지 않는다.
- 통화 비교용 기존 `RATES`는 공시 금액·시장 환율과 분리된 표시 환산 기준을 유지한다. 1,341.5 종가로 항공사 공시액이나 다른 통화 교차환율을 임의 재산정하지 않는다.
- 전날 남긴 일부 연결 화면의 영문 fallback 한계는 이번 시장 갱신에서 해소했다고 주장하지 않는다.

## 5. 수정 및 검증 완료 기록

계약월 추가 대조: [MT Newswires/Yahoo](https://ca.finance.yahoo.com/news/tsx-closer-index-jumps-more-211427951.html), 11월 4일 21:14:27 UTC(11월 5일 06:14:27 KST)에서 WTI 12월물 88.12를 확인했다. 이 기사에 함께 실린 Brent 95.22는 장중 값이므로 정산가로 사용하지 않는다. [Contrapunto/EFE](https://contrapunto.com/sin-categoria/petroleo-de-texas-cae-83-tras-admitir-trump-impacto-de-guerra-con-iran-en-los-comicios/)도 12월물을 명시한다(게시 11월 4일 17:08:13 -04:00). Prensa Libre/EFE의 Brent 1월물 기사 최초 게시 11월 4일 14:15:00 -06:00·수정 14:26:02를 확인했다. 모두 기준시각 이전이다.

UKMTO 194·195 개별 보도는 검색 색인에서 일부 본문이 나타났으나 직접 원문 접근은 403 또는 빈 목록이었다. 신규 확정 사건으로 사이트에 추가하지 않았다. 카타르 외교부의 11월 3일 발표를 다시 읽었으며 새 합의가 확인됐다고 표현하지 않는다.

11월 산정 기준도 이번 실행에서 다시 확인했다. [뉴시스 10월 16일 기사](https://mobile.newsis.com/view_amp.html?ar_id=NISX20261016_0003828757)를 **11월 5일 09:04:51 KST**에 직접 HTTP 200으로 읽었다. 기사 자체의 게시 10월 16일 11:15:10·수정 11:52:24는 자료 기준시각 이전이다. 대한항공 발표의 27단계, 9월 16일~10월 15일 MOPS 173.89 USD/bbl·414.03 cents/gal을 확인했다. 타 항공사에 동일한 단계 체계를 일률 적용하거나 Platts 원시 데이터를 직접 검증한 것으로 쓰지 않는다.

- 공통 스냅샷과 피드 생성시각: **09:01:50 KST**. 자료 기준시각 09:00과 별도이다.
- `npm test`: **95/95 통과**.
- `node scripts/validate_service_data.cjs --base-ref HEAD`: **9개사·112개 공시 금액 검증 통과**, 오류 0. 기존 발표일 미확인·대시 구간·과거 자료 경고는 보존했다.
- `node scripts/verify_calculator_platform.cjs`: 공식 값·월 비교·미확인 자료·노선군·저장 상태·모바일 검사 통과.
- `node scripts/verify_home_period.cjs`: 초기 HTML·6개 언어·통화 전환·14초 후 유지·모바일/데스크톱·한국시간 월 경계·자정 타이머 검사 통과.
- `node scripts/verify_graph_notices.cjs`: **9개 항공사·6개 언어·9개 통화**, 실제 막대/표/툴팁·YP 11월 6개 값과 공시 없는 구간·월 필터·모바일·12초 안정성 검사 통과.

- `node scripts/verify_nov05.cjs`: 전망·뉴스 **각 6개 언어**, 관측값·출처·FAQ·NewsArticle·메타데이터·canonical 정합성 통과. 기존 기사 **125개 객체·시각을 그대로 보존**하고 새 기사 **8개**를 추가했다. 1440px 데스크톱·390px 모바일, 가로 넘침 없음, JavaScript 오류 없음, **12초 후 되돌림 없음**을 확인했다.
- `node scripts/verify_platform.cjs`: 연결된 9개 페이지의 모바일/데스크톱·메타데이터·JSON-LD 및 검색·저장소 제약 등의 기존 기능 검사 통과.
- `node scripts/verify_static_sources.cjs`: JavaScript **66개**, JSON-LD **7개** 구문 검증 통과.
- `node scripts/sync_static_snapshots.cjs --check --pages=index,forecast,news,fuel-surcharge-calculator,fuel-surcharge-graph`: **5개 페이지 차이 0건**. 홈 시장 기준일과 전망·뉴스 초기 HTML을 실제 렌더링과 동기화했다. 공시 검증일·홈 문구 수정일은 이전 기록을 유지한다.
- 최종 전망 모바일 상단과 뉴스 데스크톱을 육안 확인했다. 전망 상단 예상·낮은 신뢰도·단계 미확정·5개 지표 배치를 유지했고, 환율 행은 **상방**, 원유·항공유 행은 **하방**으로 구분했다. 6개 언어의 최신 영역에 전날 환율·원유·항공유 수치가 남아 있지 않은지도 별도로 확인했다.
- `git diff --check`: 통과. 기존 Windows 줄바꿈 안내 외 오류 없음.

이번 실행에서 수정·추가한 파일:

- `public/market-nov05.js`: 신규 뉴스 8건, 전망 방향·FAQ·출처·6개 언어. 실제 편집시각 **09:06:24 KST**.
- `public/_shared.js`, `public/data/forecast_feed.json`: 관측일·출처·미확인 상태를 포함한 11월 5일 시장 스냅샷.
- `public/forecast.html`, `public/news.html`: 오늘 릴리스 로드·캐시 버전·초기 HTML·SEO 구조화 데이터.
- `public/index.html`: 시장 기준시각 초기 표시 및 공통 데이터 캐시 버전.
- `public/fuel-surcharge-calculator.html`, `public/fuel-surcharge-graph.html`: 공통 데이터 캐시 버전만 이번 실행에서 변경. 전날의 공시·YP 그래프 수정을 보존했다.
- `scripts/verify_nov05.cjs`: 새 기준일의 기존 통합 검증을 확장. 전날 검사 파일은 보존했다.
- `UPDATE_20261105_MARKET.md`: 이 실행의 자료·정정·검증·제한 기록.

브라우저 기능 검증은 외부 요청을 차단한 로컬 검증이며 출처 확인은 별도 웹·HTTP 조사로 수행했다. 증거 파일은 `%TEMP%/aero-nov05-qa/verification.json`과 같은 폴더의 스크린샷, `%TEMP%/aero-home-period-qa`, `%TEMP%/aero-graph-notices-qa`에 있다. 연결 페이지 검증 증거는 기존 `tmp/platform-verification` 경로를 사용했다.

**로컬 수정·검증 완료. commit·push·운영 배포는 수행하지 않았다.** 기존 운영 사이트가 이 실행의 변경을 반영한 것으로 보고하지 않는다.
