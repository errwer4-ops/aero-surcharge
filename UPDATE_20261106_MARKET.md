# 2026-11-06 평일 아침 시장·뉴스·전망 업데이트

- 자료 기준: **2026-11-06 09:00 KST (00:00 UTC)**. 기준시각과 원문 열람·로컬 편집시각을 구분한다.
- 시작 HEAD: `672868c41f674a33a4c7b4928c21e1ca35073c79`. 기존 미커밋 변경은 `UPDATE_20261105_MARKET.md`의 배포 완료 기록이며 보존했다. 시작 상태와 diff는 `artifacts/review-verification/market-nov06/start.json`, `preexisting.patch`에 저장했다.
- 저장소 및 상위 경로에 AGENTS.md는 없었다. 최신 보고서, `PIPELINE_README.md`, 출처 검증·배포 운영 문서를 읽었다. 환율 API 사용 중단, mock 게시 금지, 광고 비활성, 운영 설정을 유지한다.
- 오늘 권한 범위는 **로컬 수정·검증·보고**다. 어제의 배포 승인으로 오늘 변경을 자동 배포하지 않는다.

## 1. 기준시각 이전 공개를 확인한 신규 자료

| 항목 | 관측값·시점 | 성격·원문 공개 시각 |
|---|---|---|
| USD/KRW | **1,342.1 KRW/USD**, 전일 대비 **+0.6원**, **11월 5일 15:30** 서울 주간 종가 | Newsis 11월 5일 **15:59:49 KST**, 한국금융경제신문 **16:14:43 KST**. 실시간·역외·항공사 산정평균과 구분 |
| Brent | **98.29 USD/bbl**, **2027년 1월물**, **11월 5일 정산**, **+3.67(+3.88%)** | 연합뉴스/한국경제TV 11월 6일 **06:07:09 KST**, Reuters/Business Times **07:08:42 KST** 교차 확인 |
| WTI | **90.52 USD/bbl**, **2026년 12월물**, **11월 5일 정산**, **+2.40(+2.72%)** | 위 원문에서 금액과 계약월 확인. 원유 선물이며 항공유·MOPS가 아님 |
| Windward | **5회(진입 2·출항 3)**, **11월 4일 관측 / 11월 5일 판** | HTTP Last-Modified **11월 5일 06:41:36 UTC = 15:41:36 KST**. 최초 게시시각으로 쓰지 않으며 기준시각 이전 파일 공개 근거로만 사용 |
| EIA 항공유 수율 | 미국 정유시설의 월간 항공유 수율이 **2026년 3월 처음 12% 초과**, 이후 **8월까지 12% 이상** | 11월 5일 분석, 공식 RSS 게시시각 **09:00 EST = 23:00 KST**. 8월까지 Petroleum Supply Monthly 자료이며 현재 공급량·Singapore Jet·MOPS가 아님 |

원유·환율 반등을 상방 요인으로 반영한다. 날짜가 명시된 기존 항공유 참고값의 하방 요인과 해상안전 위험이 함께 있어, 12월 안내는 **‘인하 압력·반등 위험 혼재 / 신뢰도 낮음 / 단계 미확정’**으로 표현한다. 특정 단계·부과액·확률·절감액은 만들지 않는다.

## 2. 출처와 확인 방법

- [Newsis 환율 원문](https://files.newsis.com/view/NISX20261105_0003856668), [한국금융경제신문](https://www.kfenews.co.kr/news/articleView.html?idxno=667603): 직접 HTTP 본문·게시 메타데이터 확인. 후자는 15:30 주간 종가를 명시한다.
- [연합뉴스/한국경제TV 원유 원문](https://www.wowtv.co.kr/NewsCenter/News/Read?articleId=AKR20261106008700072): 본문·계약월·JSON-LD `2026-11-06T06:07:09+09:00` 확인. OG 태그의 잘못된 Z 표기 대신 화면과 JSON-LD의 KST를 사용한다.
- [Reuters/Business Times](https://www.businesstimes.com.sg/companies-markets/energy-commodities/brent-crude-jumps-settles-over-us3-after-tanker-attacks): 직접 HTTP 본문과 `2026-11-06T06:08:42+08:00` 게시 메타데이터 확인. 원유 반등을 선박안전 회복으로 해석하지 않는다. 거래소 정산표를 직접 열람한 검증과 구분한다.
- [Windward Daily Intelligence](https://insights.windward.ai/): 09:00:51 KST 열람, 11월 5일 판·11월 4일 관측 확인. 업체 관측 출항 유조선 0건, 비송신 출항 화물선 1척은 업체 범위의 관측이며 전수 통항·원유 b/d·안전 정상화가 아니다.
- [EIA 분석](https://www.eia.gov/todayinenergy/detail.php?id=68424), [EIA 공식 RSS](https://www.eia.gov/rss/todayinenergy.xml): 직접 HTTP 본문과 RSS의 해당 기사 게시시각 확인. 월간 수율 비중과 절대 생산량을 혼용하지 않는다.
- [Newsis 10월 16일 대한항공 발표 보도](https://mobile.newsis.com/view_amp.html?ar_id=NISX20261016_0003828757): 오늘 원문 재열람. 11월 27단계, 9월 16일~10월 15일 MOPS 평균 173.89 USD/bbl·414.03 cents/gal을 재확인했다. Platts 원자료 직접 검증이나 모든 항공사의 공통 단계로 표현하지 않는다.
- [OPEC 11월 1일 정책](https://www.opec.org/pr-detail/620-1-november-2026.html), [11월 4일 해상운송 워크숍](https://www.opec.org/pr-detail/621-4-november-2026.html): 오늘 공식 목록·본문 재확인. 12월 요구 생산량은 9월 수준 유지, 다음 회의 11월 29일. 워크숍은 생산량 변경·안전 회복 선언이 아니다. 같은 과거 발표를 신규 기사로 재등록하지 않는다.

## 3. 신규 반영을 보류한 자료

### 항공유 평가와 IMO 집계: 기준시각 전 공개 여부 미확인

- [CommodityScope](https://commodityscope.com/prices/singapore-jet-kerosene)에서 **11월 4일 평가 163.89 USD/bbl, -0.63(-0.4%)**를 오늘 원문으로 확인했다. 자체 일일 FOB Singapore indicative assessment, low confidence이며 Platts MOPS·실거래 호가가 아니다. 평가일은 게시일이 아니다. 최초 확인이 **09:00:39 KST 이후**, 게시시각은 없고 직접 HTTP는 403이어서 **09:00 이전 공개를 입증하지 못했다**. 오늘 기준 스냅샷의 새 값과 NEW 기사에서는 제외한다.
- 같은 원문 일별 표에서 **11월 3일 164.52**도 다시 확인했다. 어제 기준시각 전에 이미 확인된 참고값을 그 날짜·낮은 신뢰도와 함께 유지하되 **09시 기준 최신 평가 미확인**을 표시한다. 새 확인일만 붙여 최신값처럼 보이게 하지 않는다.
- [IMO 공식 목록](https://www.imo.org/en/mediacentre/hottopics/pages/middle-east-highlighted-incidents.aspx)에서 **11월 5일 기준 129건·사망 24명**과 **11월 4일 VELOS SAPPHIRE(IMO 9321201)** 사건을 확인했다. 장소는 카타르 Madinat ash Shamal 북쪽 50NM, **손상 있음·오염 없음·선원 1명 실종**이다. 실종자를 사망자에 더하지 않는다.
- IMO 최초 열람은 **09:00:53 KST**였고 집계일 외 게시시각, Last-Modified, 게시 메타데이터를 확보하지 못했다. 집계일을 게시일로 간주하지 않고 **129건 신규 반영과 신규 카드는 보류**한다. 이전에 확인한 **11월 3일 128건·24명**은 이전 집계라는 표시와 **09시 기준 최신 집계 미확인**을 함께 유지한다. 기존 스냅샷·기사의 날짜를 소급 변경하지 않는다.

### 기타 제한

- 12월 공식 누적 MOPS·산정 평균환율·확정 단계·부과액은 미확인으로 유지한다. 검색된 화물 공지의 10월 달력월 MOPS 174.72를 여객 12월 산정기간 평균으로 대체하지 않는다.
- UKMTO는 동적 목록 빈값 또는 403, JMIC 미러는 과거 자료여서 새 확정 사건 수로 반영하지 않는다. 추출 실패를 사건 0건으로 해석하지 않는다.
- [Reuters/MarketScreener ARA 항공유 재고 기사](https://www.marketscreener.com/news/ara-jet-fuel-stocks-rise-on-imports-insights-global-data-shows-ce785fdddb8aff22)는 공개 리드만 확인됐고 절대량·관측기간 등 본문 접근에 제한이 있어 신규 카드에서 제외한다.
- [Reuters/MarketScreener 호르무즈 기사](https://au.marketscreener.com/news/tankers-hit-in-hormuz-as-iran-keeps-up-pressure-after-us-vote-ce785fdcd089fe20)의 IRGC 피해 주장과 UKMTO 인용은 서로 다른 정보다. 독립 확인 없는 피해를 IMO 목록에 가산하거나 원유 공급 손실량으로 환산하지 않는다. 새 카드에서는 제외한다.
- 항공권 비교용 기존 환산율 `RATES`는 시장 종가와 다른 표시 기준이다. 1,342.1원으로 항공사 공시액·모든 교차환율을 임의 재산정하지 않는다.

## 4. 9개 항공사 공식 공지 재확인

열람은 09:00~09:02 KST, 대상은 기준시각 이전의 11월 기존 공지다. 공식 본문으로 대조한 **5개사**와 접근 제한 **4개사**를 구분한다.

| 항공사 | 오늘 확인 범위 | 공식 원문 |
|---|---|---|
| KE | 한국발 편도 KRW, 11/1~30 발권, 9구간 55,600~408,100 기존 값 일치. 게시일 본문 미표시 | [공지](https://www.koreanair.com/contents/footer/customer-support/notice/2026/2611-infuel) |
| OZ | 10/16 게시, 한국발 편도 KRW, 11/1~30 발권, 9구간 62,400~351,100 일치 | [공지](https://flyasiana.com/C/KR/KO/customer/notice/detail?id=CM202610160002530868) |
| YP | 10/27 09:18:18 게시, 한국발 편도 USD 48/64/107/187/236/296 일치. 11/1~30 **결제일**, 원화 환산은 **발권일 환율**. 미공시 거리 구간 유지 | [공지 803](https://www.airpremia.com/a/ko/customer/notice/803) |
| BX | 한국발 편도 USD 43/77/90/106 일치, 11월 발권. 부산·인천 출발별 노선 조건 유지. 게시일 미표시 | [공지 4420](https://www.airbusan.com/content/common/customercenter/noticeDetail?id=4420) |
| TW | 10/19 09:33 게시, 한국발 편도 KRW 43,400/76,000/95,000/123,500/133,000/–/299,800 일치. 11월 발권, 대시는 null 유지 | [공지 12722](https://www.trinityairways.com/app/customerCenter/notice/retrieve/12722) |
| 7C | 11월 제목·10/16 게시일만 확인. 금액표 대신 ‘등록된 공지가 없습니다’ 반환 | [공지 0814](https://www.jejuair.net/ko/customerServiceCenter/noticeDetail.do?billboardNo=0000000814) |
| LJ | 도구·직접 HTTP 접근 실패/403. 금액·기간 재검증 불가 | [공지 28906](https://www.jinair.com/company/announce/announceView?anceSeq=28906&searchWord=&searchKey=titlCtn&page=1) |
| ZE | 직접 HTTP 200이나 공지 없는 일반 템플릿. 금액·기간 재검증 불가 | [공지 680](https://www.eastarjet.com/newstar/PGWCA00002?cId=11&iId=0&bId=680&lang=KR) |
| RS | PC·모바일 경로 모두 403. 금액·기간 재검증 불가 | [공지 11208](https://flyairseoul.com/CW/ko/noticeContent.do?seq=11208&pageNo=1) |

5개사의 확인은 브라우징 도구의 공식 본문에 근거한다. 별도 직접 HTTP에서 YP·BX는 403, KE는 셸만 반환했으며 방법별 접근 결과가 다름을 보존한다. 확인 불가한 공시의 기존 검증일을 오늘로 바꾸지 않는다. 공식 검색과 접근 가능한 목록에서 한국발 국제선 **12월 신규 확정 공시를 확보하지 못했다**. 일부 목록 접근이 제한됐으므로 공시 부재 자체를 단정하지 않는다. 일본 출발 11~12월 공지는 별도 범위라 제외했다. 공식 금액 데이터는 변경하지 않는다.

## 5. 수정·검증 결과

### 수정 파일

- `public/_shared.js`: 11월 6일 스냅샷을 추가했다. 11월 5일 이전 스냅샷은 그대로 유지한다.
- `public/data/forecast_feed.json`: 환율·원유·통항 관측·EIA와 12월 혼재 전망을 동기화했다. `currentStageScope`와 요약문에 27단계가 대한항공 발표 기준임을 명시했다.
- `public/market-nov06.js`: 6개 언어의 시장 지표·전망·FAQ·메타데이터와 신규 기사 4건을 추가했다. 현재 제목·현재 단계 안내에서도 대한항공 기준을 명시했다. 기존 기사 133건의 내용·날짜를 보존했다.
- `public/forecast.html`, `public/news.html`: 새 모듈 연결과 초기 HTML·구조화 데이터 동기화. 시장·해상안전 지표의 상단 배치와 5개 지표 구성을 유지했다.
- `public/index.html`, `public/fuel-surcharge-calculator.html`, `public/fuel-surcharge-graph.html`: 공통 데이터 자산 버전을 갱신하고 필요한 초기 HTML을 동기화했다.
- `scripts/verify_nov06.cjs`: 날짜·단위·확정/미확정·이전 참고값·6언어·이전 기사 보존·단계 적용 범위를 검사하는 해당일 회귀 검증을 추가했다.

자료 기준시각은 09:00 KST이며, 데이터 스냅샷의 lastUpdated 기록은 09:06:10 KST, 표시 모듈 최종 수정시각은 09:13:59 KST다. 기존 자동 수집이나 환율 API를 실행하지 않았고 항공사 공식 금액 파일·제휴 설정·광고 설정·배포 설정을 수정하지 않았다.

### 최종 검증

- `node scripts/verify_nov06.cjs` **PASS**: 최종 화면에서 6언어·5개 지표·FAQ/JSON-LD·canonical·신규 4기사·이전 133기사 불변, 데스크톱 1440px/모바일 390px, 12초 뒤 화면 안정성, 그래프 비어 있지 않음 확인. 대한항공 단계 범위와 미확정 null 값도 검사했다.
- 별도 콘솔 확인 **PASS**: 전망·뉴스 각각 6언어 전환에서 예상하지 못한 콘솔 오류·페이지 예외 0건. 각 페이지의 외부 요청 차단으로 생긴 `net::ERR_FAILED` 1건은 의도적 테스트 차단으로 구분했다.
- 그래프 기존 검증 **PASS**: 9개사 11월 공시 56개 금액, 6개 언어×9개 통화, YP 미공시 구간 null·6개 공시액, 모바일·12초 지연 확인.
- `node scripts/validate_service_data.cjs --base-ref HEAD` **PASS**: 9개사 공식 금액 스냅샷 정합성과 과거 수동 데이터 검사. 이 로컬 통과를 오늘 9개 원격 공지 모두 재검증했다는 의미로 쓰지 않는다.
- 초기 HTML·SEO 스냅샷을 5개 연결 화면에 동기화했고 모바일 전망 상단과 데스크톱 뉴스 화면을 직접 열람했다. 기존 카드·표가 유지되고 가로 넘침은 없었다.
- 09:12 시작한 첫 통합 검증은 13개 검사 모두 exit 0이었으나, 실행 중 단계 적용범위 문구 수정으로 소스 해시가 달라져 전체 결과는 무효 처리됐다. 오류를 숨기지 않고 최종 파일을 동결한 뒤 재실행했다. 최초 증거: `artifacts/review-verification/2026-11-06T00-12-44-692Z/summary.json`.
- `npm run verify:release` **PASS — 13/13 검사**: 단위 테스트 **120/120**, 정적 소스·데이터·공시 데이터·URL·제휴 통합·9개 주요 화면·홈 월 전환·그래프·54개 화면/언어 조합·여행 계획·계산기·13개 SEO 스냅샷 검사 통과. 검증 시작/종료 소스 해시가 동일했다.
- 최종 통합 증거: `artifacts/review-verification/2026-11-06T00-17-45-245Z/summary.json`. 런타임: Node v24.14.0 / win32 / Playwright 1.59.1. 소스 SHA-256: `c9bf1d5a844eb1cf29a9832cba02108502ceb138af25cca8a89ca5db95613ff1`.
- `git diff --check` 통과. 기존 11월 5일 보고서의 시작 diff와 종료 diff가 동일함을 재확인했다.

최신 회귀 검증 결과·콘솔 로그·화면 증거는 `artifacts/review-verification/market-nov06/`에 보존했다. 원본 화면 증거는 `C:\Users\jiwoo\AppData\Local\Temp\aero-nov06-qa\`에도 있다.

### 검증 한계와 종료 상태

로컬 브라우저 검사에서는 외부 네트워크를 차단했다. 제휴 버튼·허용 주소·이벤트 중복 방지의 통과는 실제 제휴 전환·정산 수신, GA4 계정 수신 또는 Vercel 운영 배포 검증이 아니다. 광고 비활성 상태와 기존 운영 설정은 유지했다.

새 항공유 평가·IMO 집계의 기준시각 이전 공개 입증, 4개 항공사 공식 금액 재열람, 12월 공식 MOPS 평균·단계·금액은 위 사유로 미확인/미반영 상태다. 이번 실행은 로컬 변경만 남기며 commit·push·운영 배포·제3자 메시지 발송을 하지 않는다. 기존 11월 5일 보고서 변경은 시작 diff와 동일하게 보존했다.
