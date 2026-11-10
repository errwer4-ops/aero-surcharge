# 2026-11-10 평일 아침 시장·뉴스·전망 업데이트

- 자료 기준: **2026-11-10 09:00 KST (00:00 UTC)**. 자동 실행 시작은 08:57:29 KST. 주요 원문은 08:58~08:59에 열람했고, 편집·검사는 기준시각 이후 수행했다. 열람시각을 최초 게시시각으로 대체하지 않는다.
- 시작 HEAD: `a7228a3` (`add 20261109 news and forecast`), 작업 트리 clean. 상위 경로와 저장소에 AGENTS.md가 없음을 확인했다. 최신 UPDATE 보고서, PIPELINE_README, 월별 운영 절차, 출처 검증·데이터 검증·분석/배포 문서를 읽었다.
- Git 상태와 추적 파일의 SHA-256을 `artifacts/review-verification/market-nov10/start.json`에 기록했다. 첫 경로 수집에서 빠진 한글 PNG 3개는 NUL 구분 경로로 보완해 HEAD 원본과 바이트가 같음을 확인했다. 총 370개 파일을 보존 대조했다. 이전 기사·공시액·디자인·제휴·광고 설정을 보존한다.
- 이번 범위는 로컬 수정·검증이다. 어제 배포 요청은 완료된 별도 작업이며 오늘 commit·push·운영 배포는 실행하지 않는다. 중단된 ExchangeRate-API와 mock 파이프라인을 실행하지 않는다.

## 1. 시장 자료

| 자료 | 관측값과 성격 | 원문·공개 근거 |
|---|---|---|
| USD/KRW | **1,347.1 KRW/USD**, 전 거래일 대비 **-9.5원**, 11/9 **15:30 서울 주간 종가**. -0.70%는 전 종가 대비 산술 반올림 | [연합인포맥스](https://news.einfomax.co.kr/news/articleView.html?idxno=4443817) 11/9 18:05:42 KST 게시·18:06 수정 표시, [뉴스1](https://www.news1.kr/finance/market-exr/6348028) 16:39:45 게시, [뉴시스/FN](https://www.fnnews.com/news/202611091545328742) 15:45:32 게시. 직접 HTTP200 본문 대조 |
| Brent | **92.57 USD/bbl**, **2027년 1월물**, **-5.75(-5.85%)**, 11/9 선물 정산 | [Bloomberg/Rigzone](https://www.rigzone.com/news/wire/oil_prices_sink_on_iran_peace_hopes-09-nov-2026-185046-article/) 11/9 21:27:55 UTC = 11/10 06:27:55 KST 게시·수정 |
| WTI | **86.85 USD/bbl**, **2026년 12월물**, **-3.98(-4.38%)**, 11/9 선물 정산 | [DTN](https://www.dtnpf.com/agriculture/web/ag/news/world-policy/article/2026/11/09/wti-tests-85-u-s-iran-de-escalation) 11/9 20:57 UTC = 11/10 05:57 KST 게시·수정. 양 원문 HTTP200으로 계약월·정산·변화액 대조 |
| Singapore Jet 날짜 명시 참고값 | **158.55 USD/bbl**, **11/6** 민간 FOB Singapore 일일 indicative assessment, 전일 대비 **+5.03(+3.3%)**, 자체 신뢰도 low | [CommodityScope](https://commodityscope.com/prices/singapore-jet-kerosene) 08:59:29~31 KST에 웹 도구로 원문 표 확보. 직접 HTTP403, 최초 게시시각 미제공. 기준시각 전 존재한 11/6 평가이며 11/9 평가·현재 실시간값·공식 Platts MOPS가 아님 |
| IATA 세계 항공유 | **178.95 USD/bbl, 전주 대비 -6.6%**, **11/6 종료 주간** | [공식 Fuel Monitor](https://www.iata.org/en/publications/economics/fuel-monitor/), [공식 표](https://www.iata.org/contentassets/9036deaf9c984009a3515fd6aa1c5e24/fuel_price_analysis.jpg). 본문 08:59:09·표 08:59:29 KST HTTP200, 이미지 시각 대조 |
| IATA Asia & Oceania | **163.26 USD/bbl, 전주 대비 -6.0%**, 같은 주간 | Platts 기반 IATA 지역 주간평균. 표 Last-Modified 11/9 02:24:57 UTC이며 최초 게시시각과 별개. Singapore 단일시장·한국 항공사 MOPS 산정평균으로 대체하지 않음 |

원유는 두 원문 보도를 대조했으며 거래소 정산표 직접 검증은 아니다. 기사 상단 실시간 ticker·정산 이후 장중값을 섞지 않았다. 환율 기사 제목의 시가 대비 하락폭과 전 종가 대비 -9.5원을 구분했다. 기존 항공권 비교 환산율과 공시액을 시장 종가로 재계산하지 않는다.

[Newsis 10/16 원문](https://mobile.newsis.com/view_amp.html?ar_id=NISX20261016_0003828757)을 재열람해 **대한항공 발표 기준 11월 27단계·9/16~10/15 MOPS 173.89 USD/bbl(414.03 cents/gal)**를 확인했다. 10/16 11:15:10 KST 게시·11:52:24 수정이다. 대한항공 발표 인용 보도이지 Platts 원자료 직접 검증이나 모든 항공사의 공통 단계가 아니다.

## 2. 해상 안전·공급과 정책

### IMO

[공식 사건 목록](https://www.imo.org/en/mediacentre/hottopics/pages/middle-east-highlighted-incidents.aspx)은 **11/9 기준 확인 사건 131건·선원 사망 25명**이다. 08:58:37 및 08:58:56 KST에 HTTP200 본문을 확보해 오늘 09시 이전 가용성을 입증했다. 최초 게시일·시각은 null이며 집계일과 구분한다. 중동 해역 공식 사건 목록으로, 일일 사건·호르무즈 전수 통항·원유 유량이 아니다.

새 목록의 HUDA 사건일은 11/7, VIEILA는 11/5다. 확인된 목록 갱신을 11/9에 새로 발생한 사건으로 쓰지 않는다. [11/6 공식 보도자료](https://www.imo.org/en/mediacentre/pressbriefings/pages/imo-council-c138-urges-stronger-protection-of-seafarers-amid-threats-to-global-shipping-.aspx)의 최소 130건·사망 25명도 다시 확인했다. **11/9 목록 131과 11/6 성명 최소 130은 기준일이 달라 같은 시점의 충돌로 표현하지 않는다.** 다만 과거 11/6 목록 129와 같은 날 성명의 차이를 해소하는 정정은 확인하지 못했다. VELOS SAPPHIRE 사건일도 목록 11/4·보도자료 11/5의 차이가 남아 있다.

### Windward

[11/8판 원문](https://insights.windward.ai/)을 08:58:33·08:58:56 KST HTTP200으로 확보했다. 명시된 관측창은 **11/6 18:00 UTC~11/8 18:00 UTC, 48시간**이며 **14회(진입 8·출항 6), 그중 AIS 비송신 8회**다. Last-Modified는 11/9 02:30:44 UTC이고 최초 게시시각은 미제공이다.

상단 기준일 11/7과 개별 일일 카드의 진입 7·출항 4를 48시간 본문 합계와 혼용하지 않는다. 범위가 다른 dark-track 재검토 4건을 가감하지 않는다. 이전 20시간 16회와 이번 48시간 14회의 단순 증감률을 만들지 않는다. 업체 관측은 전수 통항·현재 원유 b/d·안전 정상화 확인이 아니며 전체 통항·유량은 null을 유지한다.

### OPEC+, EIA와 당사자 발언

- [OPEC 11/1 결정](https://www.opec.org/pr-detail/620-1-november-2026.html)을 재열람했다. 12월 요구생산량은 9월 수준, 다음 회의 11/29가 유지됐다. 실제 생산·수출이나 통항안전 회복과 구분한다. 공식 목록은 직접403이어서 대체 본문·검색을 함께 확인했으며 전수 부재를 단정하지 않는다.
- [EIA 공식 RSS](https://www.eia.gov/rss/todayinenergy.xml)의 최신 항목은 11/6 베네수엘라 원유 수입 분석이다. [11/5 항공유 수율 분석](https://www.eia.gov/todayinenergy/detail.php?id=68424)은 3~8월 관측이고 오늘 일일 공급량이 아니므로 반복 신규 카드에서 제외했다. 이전 재고·정제입력 표는 오늘 재검증하지 않아 원래 날짜·상태를 보존한다.
- [Reuters/Al-Monitor](https://www.al-monitor.com/originals/2026/11/iran-says-no-unauthorised-vessels-transited-strait-hormuz-overnight-after)의 남부 항로 항행보조시설 파괴·밤사이 무허가 통항 부재는 이란 측 관리의 주장이다. 게시 11/9 13:28:01 KST, 수정 13:46:36 KST. 시설 파괴·0통항을 독립 확인한 사실로 반영하지 않았다. 다른 관측창의 Windward 자료와 모순으로 단정하지 않는다.
- UKMTO/JMIC 공식 본문·PDF 접근이 제한됐다. 제3자가 전하는 사건 수·위협 등급은 원문 미확보로 보류했으며 접근 실패를 사건 0건으로 바꾸지 않았다.

## 3. 항공사 공시와 YP 조건

11월 한국발 국제선 9개사와 12월 공지를 08:58~08:59 KST에 직접 검색·열람했다. 자세한 구간·노선·접근 결과는 `artifacts/review-verification/market-nov10/airlines-research.md`에 기록했다.

| 항공사 | 오늘 확인한 범위 | 공식 URL |
|---|---|---|
| KE | 한국발 편도 KRW, 11/1~30 발권, 9금액 55,600~408,100 일치. 게시일 미표시. 웹 본문 확보, 직접 HTTP는 셸 | [공지](https://www.koreanair.com/contents/footer/customer-support/notice/2026/2611-infuel) |
| OZ | 10/16 게시, 한국발 편도 KRW, 11/1~30 발권, 9금액 62,400~351,100 일치. 직접 HTTP 본문 확인 | [공지](https://flyasiana.com/C/KR/KO/customer/notice/detail?id=CM202610160002530868) |
| YP | 10/27 09:18:18 게시, 한국발 편도 USD 48/64/107/187/236/296 일치. 11/1~30 결제일, 원화는 발권일 환율. 닝보 11/6 적용 조건 확보 | [공지803](https://www.airpremia.com/a/ko/customer/notice/803) |
| BX | 한국발 편도 USD 43/77/90/106, 11/1~30 발권, 출발지별 NRT/BKI/CNX 조건 일치. 게시일 미표시. 웹 본문 확보·직접403 | [공지4420](https://www.airbusan.com/content/common/customercenter/noticeDetail?id=4420) |
| TW | 10/19 09:33 게시, 한국발 편도 KRW 43,400/76,000/95,000/123,500/133,000/—/299,800 일치. 11/1~30 발권. 직접 HTTP 본문 확인 | [공지12722](https://www.trinityairways.com/app/customerCenter/notice/retrieve/12722) |
| 7C | 11월 제목·10/16 게시일만 확보, 상세 본문 재확인 불가 | [공지0814](https://www.jejuair.net/ko/customerServiceCenter/noticeDetail.do?billboardNo=0000000814) |
| LJ | 공식 본문 접근 실패·HTTP403 | [공지28906](https://www.jinair.com/company/announce/announceView?anceSeq=28906&searchWord=&searchKey=titlCtn&page=1) |
| ZE | HTTP200이나 일반 템플릿으로 상세 본문 미확보 | [공지680](https://www.eastarjet.com/newstar/PGWCA00002?cId=11&iId=0&bId=680&lang=KR) |
| RS | PC·모바일 공식 경로403 | [공지11208](https://flyairseoul.com/CW/ko/noticeContent.do?seq=11208&pageNo=1) |

YP의 **ICN–NGB(닝보)는 첫 구간 USD 48, 11/6부터 적용**이라는 기존 공지의 조건을 새로 확보했다. 조항 추가·수정시각은 미제공이며 오늘 새 공시라고 표현하지 않는다. 웹 도구의 공식 URL 본문 반환과 원 서버 직접403을 구분한다. 독립 근거는 `docs/review-evidence/20261110-yp-route-condition.json`이며 기존 PDF 원문 검증 기록·금액·검증일을 보존한다.

현재 서비스에 NGB 계산 노선이 없고 발권일 단위 선택도 없다. 새 노선이나 계산 로직을 추가하지 않고 현재 공시의 6언어 기간 설명과 별도 조건 메타데이터·뉴스로 반영한다. 나머지 노선의 월 전체 적용 시작일을 11/6으로 바꾸지 않는다. 미공시 거리 구간은 null을 유지한다.

**12월 한국발 국제선 확정 공시는 확보하지 못했다.** 검색된 KE/BX/TW의 12월 공지는 국내선이어서 제외했다. 일부 공식 목록 접근 제한이 있으므로 공시가 존재하지 않는다고 단정하지 않는다. 4개사 접근 실패도 기존 금액 오류로 해석하지 않으며 원래 검증일을 오늘로 덮어쓰지 않는다.

## 4. 12월 전망

**12월 예상: 인하 압력·반등 위험 지속 / 신뢰도 낮음.** 11/9 원유 정산·원/달러 하락과 IATA 주간 항공유 평균 하락은 비용 하방 요인이다. 11/6 민간 Jet 일일평가는 반등했고 해상 안전·공급 위험과 협상 불확실성이 남아 있다. 가격 하락이나 협상 기대를 실제 항로 안전 회복으로 해석하지 않는다.

산정기간은 **10/16~11/15**다. 공식 누적 MOPS·기간 평균환율·12월 단계·부과액은 미확인 null을 유지하며 특정 단계·확률·절감액을 만들어 제시하지 않는다. IATA 세계/지역 주간평균·Singapore 민간 일일평가·원유·현물환율을 서로 대체하지 않는다.

## 5. 반영 및 검증

### 수정 파일

- `public/_shared.js`: 11/10 스냅샷을 맨 끝에 추가했다. 기존 스냅샷과 원통화 금액·사이트 환산율은 유지한다. 데이터 생성기록은 실제 편집시각 09:04:25 KST다. YP 기간 설명은 과거 뉴스 생성 이후에 적용해 아카이브를 보존한다.
- `public/data/forecast_feed.json`: 시장 수치·관측기간·출처와 12월 미확정 null 상태를 공통 스냅샷에 맞췄다.
- `public/market-nov10.js`: 신규 뉴스 **6개**(환율·원유·IATA·Windward·IMO·YP 조건), 6언어 지표·전망·FAQ·SEO/구조화 데이터. 실제 편집시각 09:05:18 KST. 기존 지표 5행과 전망 상단 구성을 유지한다.
- `public/forecast.html`, `public/news.html`: 새 모듈 연결과 초기 HTML·JSON-LD 동기화. 이전 시장 모듈·기사 URL·canonical을 보존했다.
- `public/index.html`, `public/fuel-surcharge-calculator.html`, `public/fuel-surcharge-graph.html`: 공통 자산 버전과 필요한 초기 문구 동기화. 계산 로직·디자인은 변경하지 않았다.
- `public/source-provenance.js`, `docs/review-evidence/20261110-yp-route-condition.json`: YP 닝보 조건의 별도 근거와 메타데이터. 기존 PDF 근거·월별 금액 검증 기록은 그대로다.
- `scripts/verify_nov10.cjs`, `tests/source-provenance.test.cjs`: 오늘 원문 수치·기간·게시시각 미제공 처리·142개 기사 보존·다국어/화면 및 독립 YP 조건 근거 검사.
- `UPDATE_20261110_MARKET.md`: 이번 실행의 출처·제한·검증 기록. 이전 UPDATE 보고서는 수정하지 않았다.

### 검증 결과

- **`node scripts/verify_nov10.cjs` PASS**: Git HEAD의 공통 데이터·출처 자료를 별도 주입한 이전 화면과 비교해 **기존 142개 기사 전체 JSON과 시각 불변**, 새 6개 기사 확인. 6언어, 5개 지표, 7개 FAQ와 구조화 데이터·canonical 정합성, 1440px 데스크톱·390px 모바일, 12초 지연 후 화면 유지, 그래프 실제 그리기를 검사했다. 전망·뉴스 콘솔 오류·페이지 예외는 **0건**이다.
- 모바일 전망 상단과 데스크톱 뉴스 화면을 직접 열람했다. 새 전망·IATA/시장 지표가 보이며 기존 디자인·글꼴·카드 구성을 유지한다.
- **`node scripts/verify_release.cjs` 15/15 PASS**: Node 단위 검사 **121/121**, 정적 소스·공식 데이터·출처 검증·URL·제휴 모의 연동·플랫폼·홈 월 전환/인터랙션·뉴스 지연 로딩·그래프·언어별 월 관계·플래너·계산기·SEO 스냅샷 전부 통과했다.
- 그래프 검사는 11월 9개사 전 구간과 null 누락 구간, 6언어×9통화, 표·그려진 값·툴팁·필터·모바일·12초 안정성을 확인했다. 언어/월 검사는 54개 화면·언어 조합, SEO는 13개 초기 화면을 검사했다. 항공사 원문 9곳의 실시간 접근 성공으로 해석하지 않는다.
- 배포 준비 검사 **PASS**. 기존 운영 검토 해시와 광고 비활성 설정을 변경하지 않았다. 이는 로컬 검사 통과이며 오늘 실제 배포나 외부 운영 수신 검증은 아니다.
- 검사 시작·종료 소스 해시가 동일했다: `883f196de65ccaf1a899492995874c98d1681b40516452c9df964bfb0ffaf8f4`. 런타임 Node v24.14.0 / Playwright 1.59.1. 전체 검사 09:08:25~09:13:58 KST.
- 보존 검사 **PASS**: 기존 추적 파일 370개 중 허용한 9개만 변경, 나머지 **361개 바이트 불변**. `_shared.js`는 줄바꿈 정규화 기준 기존 내용 뒤에만 추가됐다. 연결 HTML 5개의 style·실행 script 본문·canonical은 동일하다. 과거 시장 모듈·기사·보고서·광고/제휴 설정은 보존했다.
- `git diff --check` 통과. 시작 HEAD `a7228a3` 유지. 신규 파일 4개와 기존 수정 9개를 로컬에 남기며 commit·push·배포를 하지 않았다.

검증 근거: `artifacts/review-verification/market-nov10/verification.json`, `preservation.json`, `release-summary.json`. 전체 자동 검사 로그는 `artifacts/review-verification/2026-11-10T00-08-25-395Z/`, 일일 화면 원본은 `C:\Users\jiwoo\AppData\Local\Temp\aero-nov10-qa\`에 있다.

### 남은 제한

7C·LJ·ZE·RS 상세 공지 재접근, UKMTO/JMIC 공식 최신 본문, 12월 국제선 공식 공시·누적 MOPS·기간 평균환율·단계·금액은 미확인이다. 공급자 평가·주간 통계로 이를 채우지 않았다. 날짜가 다른 IMO 집계와 과거 사건일 차이, 민간 Jet 낮은 신뢰도·원문 접근 방식을 그대로 표시한다.

로컬 화면 검사는 외부 요청을 차단했다. 실제 제휴 전환·정산·GA4 계정 수신·광고 송출·운영 사이트의 오늘 반영을 확인한 결과가 아니다. 운영 사이트는 별도 배포 전까지 이전 버전이다.
