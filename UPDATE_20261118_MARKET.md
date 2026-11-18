# 2026-11-18 시장·뉴스·전망 업데이트

## 실행 1 — 평일 오전 정기 작업

- 자료 기준시각: **2026-11-18 09:00 KST (2026-11-18T00:00:00Z)**. 실행은 08:56에 시작했으며, 새 시장·해상 자료는 기준시각 이전의 실제 원문 응답으로 공개 여부를 확인했다. 이후 편집·검사 시각을 자료 발표일이나 가격 관측일로 사용하지 않는다.
- 시작 HEAD/main: `ee98230513d84852749c50ac719cfedccfc06c4c`. 시작 작업 트리는 깨끗했고 추적 파일은 480개였다. 저장소와 상위 경로에서 AGENTS.md를 확인했고, 최신 11/17 보고서·월별 작업 문서·원문 검증/운영 지침을 읽었다.
- 이번 정기 작업은 **로컬 수정·검증만** 수행한다. 전날 승인된 공시 배포와 구분하며 commit·push·운영 배포·제3자 메시지 전송은 하지 않는다. 수집 pipeline의 mock·실패값이나 중단한 환율 API를 사용하지 않았다.

## 새로 반영한 시장 자료

| 항목 | 검증값·단위·관측일 | 발표·접근 및 구분 |
|---|---|---|
| USD/KRW | **1,338.2 KRW/USD**, 전 거래일 대비 **+2.5원**, 11/17 15:30 서울 주간 종가 | [뉴시스](https://www.newsis.com/view/NISX20261117_0003871797) 11/17 15:44:17 KST 발표, [뉴스1](https://www.news1.kr/finance/market-exr/6356903) 15:32:29 대조. 원문 응답 08:57:24~25 KST. 실시간·야간·NDF·공시 산정 평균환율과 구분하며 사이트 표시통화용 RATES는 보존. |
| 원유 선물 | **Brent 93.14 USD/bbl (+0.70, +0.76%)**, ICE 2027년 1월물. **WTI 86.01 (+0.29, +0.34%)**, NYMEX 2026년 12월물. 모두 11/17 정산 | [연합인포맥스](https://news.einfomax.co.kr/news/articleView.html?idxno=4445238) 11/18 07:07:08 KST 발표. [Bloomberg/Rigzone](https://www.rigzone.com/news/wire/oil_prices_swing_as_gulf_attacks_continue-17-nov-2026-185107-article/) 11/17 20:53:14 UTC 대조. 후자는 변동률을 소수1자리로 반올림. 거래소 정산표를 직접 확인한 것은 아니며, 보도된 정산값으로 표시. |
| Singapore Jet | **151.72 USD/bbl**, 11/16 평가, 전회 11/13 대비 **+0.57 (+0.4%)** | [CommodityScope](https://commodityscope.com/prices/singapore-jet-kerosene) CS-SIN-JET, FOB Singapore 민간 참고 평가·낮은 신뢰도. 08:58:35~36 KST 원문 열람 성공, 직접 HTTP403은 별도 기록. 최초 발표시각 미제공. 평가 불확실성 범위151.02~153.36은 호가/일중 고저가가 아님. 공식 Platts MOPS·항공사 산정평균으로 사용하지 않음. |
| 항공유 관련 뉴스 | 일부 유럽 항공사의 2027년 연료가격 헤지 축소 계획 | [OPIS](https://www.opis.com/resources/energy-market-news-from-opis/european-airlines-reduce-fuel-hedging-gambling-on-oil-price-drops/) 11/17 09:02 UTC 발표, 16:19:13 수정. 경영진 발언을 인용한 계획 보도이며 미래 실제 비용이나 한국 요율 예측으로 바꾸지 않음. |

IATA는 새 값으로 재발행하지 않았다. [원문 주간 표](https://www.iata.org/contentassets/9036deaf9c984009a3515fd6aa1c5e24/fuel_price_analysis.jpg)를 새로 내려받아 시각 대조했으며 **11/13 종료 주간** 세계169.82 USD/bbl(-5.1%), 아시아·오세아니아152.80(-6.4%)가 그대로다. 이미지 SHA256 `d3b8177d8c660c256483860f10cc8ab01716b35a4f7e32092c12644f4df7262d`. 서버 Last-Modified를 최초 발표일로 사용하지 않았다.

[EIA 주간 재고표](https://ir.eia.gov/wpsr/table6.csv)의 항공유 재고 **11/6 주간 41.979 million bbl**도 변경 없음. [OPEC 11/1 결정](https://www.opec.org/pr-detail/620-1-november-2026.html)은 12월 생산목표 유지·11/29 다음 회의이며 실제 생산량이 아니다. [IEA 11/13 OMR](https://www.iea.org/reports/oil-market-report-november-2026)의 10월 세계 공급105.4 million bpd와 걸프 수출은 원래 관측월을 유지했다. 재확인일만 바꾸어 새 기사로 만들지 않았다.

## 새로 반영한 해상 자료

- [IMO](https://www.imo.org/en/mediacentre/hottopics/pages/middle-east-highlighted-incidents.aspx): **11/17 기준 확인 사고 누계138건·선원 사망25명**. 새로 기재된 11/15 AL DHANNAH는 아라비아만 선박 손상·오염 없음으로 기록. 당일 사고 수, 호르무즈 한정 통계 또는 유류 손실량이 아니다. 08:57:09 원문을 보관했고 09:00:37 재확인 본문 해시가 동일했다.
- [Windward](https://insights.windward.ai/): **11/18판, 11/17 관측 통과4척(진입4·출항0), AIS 식별0·dark4**. 정확한 UTC 관측 시작/종료·위성만으로 탐지한 하위 집계는 미확인으로 null. 출항0은 업체 관측 결과이며 실제 통항/원유 흐름0이라는 뜻이 아니다. 이전 판과 시간창이 같다고 가정한 감소율을 만들지 않았다. 08:57:08 원문과 09:00:37 재확인 해시 동일.
- [UKMTO 208-26 Update001 원문 이미지](https://pbs.twimg.com/media/HXUPjzFXwAAqxPk.png?name=orig): 최초 피격11/16 19:00 UTC, 업데이트의 기준시각11/17 07:45 UTC, 공식 게시물의 공개시각은 미러상09:17 UTC. 추가 피격·화재·당시 승무원 소재 미확인 보고다. **추가 피격 자체의 정확한 시각은 null**이다. [gCaptain 후속 보도](https://gcaptain.com/second-strike-on-lpg-tanker-in-strait-of-hormuz-leaves-one-missing-two-injured/)는 인도 당국을 인용해 TARA GAS 인도인 선원1명 실종·2명 부상을 전했다. 직접 당국 발표는 확인하지 못했으므로 인용 보도로 구분한다. 실종자를 IMO 확인 사망 누계에 합산하지 않는다.
- [UKMTO 209-26 원문 이미지](https://pbs.twimg.com/media/HXUpA92WIAAy9Xt.png?name=orig): **11/13 발생**, **11/17 11:15 UTC 공개**인 지연 보고. 아라비아만에서 호르무즈 진입 전 동진하던 유조선 미상 발사체 피격, 승무원 안전. 정확한 사건 시각·손상·환경 영향 미확인. 다른 익명 경보와 동일 선박이라고 추정하거나 누계에 더하지 않는다.
- [UKMTO 210-26 원문 이미지](https://pbs.twimg.com/media/HXVbbjNWkAA5Fbq.png?name=orig): **11/17 12:50 UTC 발생**, 14:50 UTC 공개. 예멘 알무칼라 남서50해리의 무장 승선 시도가 경고 사격 뒤 종료됐다는 현지 당국 보고. **아덴만 사건**으로 호르무즈와 구분하며, 경보에 없는 무부상·항로 폐쇄·공격 주체를 추정하지 않는다.
- [Bloomberg/gCaptain](https://gcaptain.com/gulf-oil-flow-at-risk-from-lack-of-empty-tankers-tracker-says/): 11/17 18:24:56 UTC 공개. TankerTrackers의 걸프행 빈 VLCC·Suezmax **합산 수송능력이 8월 말 대비 약40% 감소**했다는 평가. 실제 원유 수출/공급40% 감소나 항공유 부족량으로 환산하지 않는다. 정확한 측정창과 절대 수송능력은 미확인이다.

UKMTO 세 건의 원본 CDN 이미지 모두 08:58:25 KST에 HTTP200으로 확보해 직접 시각 확인했다. X 직접 접근과 일부 PDF는403이었고 공개시각은 공식 계정 게시물의 공개 미러에서 확인했음을 기록했다. 본문을 보지 못한 검색 제목만으로 사건을 게시하지 않았다.

가장 최근 확인된 [JMIC114](https://www.ukmto.org/-/media/ukmto/products/update-114_jmic_advisory_15-nov.pdf?rev=be65cfbd755a41c4816feba6cef4401c)는 **11/15 13:00 UTC 기준**, 호르무즈 SEVERE다. 이를 11/18 새 위험평가로 표시하지 않는다. [EIA 호르무즈](https://www.eia.gov/outlooks/steo/report/energysecurity/article.php)의 **2026년 3분기 석유9.1 million bpd**(원유·콘덴세이트7.3/석유제품1.8)는 과거 분기평균이며 현재 흐름/안전을 뜻하지 않는다.

## 항공사 공시 재확인과 미반영 항목

- **12월 확인5개사·32금액 유지, 추가 확정 공시 없음**: [대한항공](https://www.koreanair.com/contents/footer/customer-support/notice/2026/2612-infuel), [아시아나](https://flyasiana.com/C/KR/KO/customer/notice/detail?id=CM202611160002531020&dispCt=all&page=1&searchOption=0&searchText=), [에어부산](https://www.airbusan.com/content/common/customercenter/noticeDetail?id=4431), [진에어 GDS 배포 원문](https://www.hanjinsabre.com/Airlinegroup/BoardView/?CDA=LJ&TAB=3&BID=90147), [이스타 GDS 배포 원문](https://www.hanjinsabre.com/Airlinemain/BoardView/?CDA=ZE&TAB=3&BID=90153)을 재확인했다. LJ/ZE 소비자 사이트 접근 상태와 항공사 배포 원문 검증은 구분한다.
- KE/OZ는 KRW, BX/LJ/ZE는 USD, 모두 한국 출발 국제선 여객 1인 편도·**발권일 기준**이다. KE/BX/LJ/ZE 12/1~31, **OZ는12/1~16만** 확인됐으며17일부터 통합항공사 기준 적용·후속 금액 별도 확인이 필요하다. 출발지별 노선군·원통화·왕복 제한을 유지한다. 원 공시 확인일을 오늘로 덮어쓰지 않았다.
- [제주항공 목록](https://www.jejuair.net/ko/customerServiceCenter/notice.do?limit=25&pageNum=1), [에어서울 항공사 배포 목록](https://www.hanjinsabre.com/Airlinemain/Board/?CDA=RS&TAB=3), [TW 목록](https://www.trinityairways.com/app/customerCenter/notice?noticeDiv=FUEL)을 확인했다. 국내선12월 공지를 국제선 여객 공시로 사용하지 않았고, 확인 범위에서 추가12월 국제선 금액을 검증하지 못했다.
- [에어프레미아 공식 점검 공지](https://www.airpremia.com/a/ko/customer/notice/811)의 예정 점검은 **11/17 22:00~11/18 10:00 KST**다. 이번09시 확인은 comingsoon 리다이렉트/403으로 제한됐다. **미공시라고 단정하지 않는다.** 기존11월 금액·원검증 기록은 보존한다.
- LJ 11월 네 금액은 12월 공시 비교 열에서 재확인했으나 기존 다섯 번째 구간은 이번에 재검증하지 못했다. 과거 확인값을 보존하며 새 검증으로 표시하지 않는다. RS11월 원표는09시 이후 확보했으므로, 기준 전 확보한10/19 게시목록과 발표/수정일을 통한 과거 공시 보강 근거로만 사용했다.
- 12월 공식 MOPS 산정평균·단계·기간 평균환율은 **null 유지**. [뉴시스](https://www.newsis.com/view/NISX20261116_0003869952), [파이낸셜뉴스](https://www.fnnews.com/news/202611161506121925), [머니투데이](https://www.mt.co.kr/index.php/industry/2026/11/16/2026111615451527605)의 대한항공 인용 **10/16~11/15 평균165.66 USD/bbl·394.44 cents/gal·25단계**는 보도 참고로만 보존했다. 항공사 공식 원자료에서 직접 검증한 값이나 전체 항공사 공통 단계로 승격하지 않았다.
- Transat 새 보도자료는 제목/목록의 기준 전 공개와 이후 본문 접근을 분리했다. 추출된 금액의 통화도 불명확하여 이번 기사에 반영하지 않았다.
- 새 항공사 공시가 없으므로 월별 `유류할증료/2026.12` 원본 캡처를 덮어쓰거나 중복 생성하지 않았다. 오늘 재확인용 원본 표 이미지는 ignored 조사 폴더에만 보관했다.

## 반영 파일과 보존

- `public/_shared.js`: 기존 전체 접두부·과거52개 스냅샷을 그대로 두고 11/18 스냅샷과 날짜/기준시각 키2개를 추가. RATES와 5개사 공시/원확인시각 보존.
- `public/data/forecast_feed.json`: 시장값·관측일·출처·현재 별칭 정합성 반영. 확정 공시와 미확인 미래 요율 구분, 최신 JMIC 검증시각에 전날 시간창이 남지 않도록 최신 window는null 처리.
- `public/market-nov18.js`: 6개 언어 시장표·FAQ·뉴스10건. 12월 공시 패치 다음에 적용해 오늘 시장값이 과거 방향 설명으로 되돌아가지 않게 했다. 기존182개 기사와 원래 시각·번역을 그대로 보존하여 총192개. 신규 사건의 최초 피격일/후속 보고일을 구분한다.
- `forecast.html`, `news.html`에 새 모듈 연결. 공통 스크립트를 사용하는 기존13개 HTML의 자산 버전을 갱신하고 기존 정적 스냅샷 도구로 내용·FAQ·SEO/구조화 데이터를 동기화했다. 전망의 결론 우선 안내·접힌 근거·총액 비교 CTA·디자인·canonical·과거 기사 URL·그래프/계산기 구성을 유지한다.
- `scripts/verify_nov18.cjs`: 배포된 시작 커밋 원문을 독립 기준으로 사용하여 기사 전필드·스냅샷·금액/시각 보존과 오늘 원문에서 독립 전사한 기대값을 검증한다.
- 출처 및 원본 해시: `docs/review-evidence/20261118-market-sources.json`. 원문 HTML/PNG·시각 확인·실패 응답은 `artifacts/review-verification/market-nov18/`에 보관하며 웹 공개 폴더에 넣지 않았다.

## 검증

공통 데이터 독립 검토는 기존52스냅샷·RATES·공시 불변, 새54개 스냅샷, shared/feed 공통435필드 일치, 브라우저 오류0으로 통과했다. 해상 기사6건×6개 언어는 원문 연구 기록과 별도 대조했다. 초기 통합 화면에서 전망/뉴스 언어 전환 후 신규10개·총192개와 최신 지표 유지를 확인했다.

전체 회귀 및 5페이지×6개 언어×데스크톱/모바일 최종 결과는 아래에 기록한다. 외부 광고·분석·API·제휴 거래 요청은 브라우저 검사에서 차단하므로 실제 정산·전환 추적·운영 서버 상태를 검증했다고 주장하지 않는다.

- 첫 독립 검사에서 독일어 Windward 카드가 누락되는 표시 문제를 발견했다. 독일어 숫자0을 뜻하는 null을 기존 텍스트 필터가 오류 토큰으로 제거한 것이므로 신규 카드의 해당 두 표현을 숫자0으로 바꿨다. 데이터의 미확인 null 필드는 유지했다. 초기 독립 실패 기록을 보존했고, 진행 중인 첫 전체 회귀는 중단하여 성공으로 세지 않는다. 수정 후 전체 검사를 다시 실행한다.

- 에너지 독립 검토의 후속 정리로 OPIS 기사 발표일을 공통 관측일로 중복 지정하던 필드를 null로 바꾸고, 한국어 원유 기사에 USD/bbl 단위를 명시했다. 수정 전 두 번째 전체 회귀도 중단했으며 최종 소스가 고정된 뒤 세 번째 전체 실행을 시작했다. 중간 UI 검사는 최종 불변성 검사와 구분한다.
- 수동 시각 검토: 한국어 모바일 전망의 발권 안내·접힌 근거, 프랑스어 데스크톱 시장 안내, 한국어 모바일 UKMTO208의 최초 피격 표기, 독일어 데스크톱 Windward 숫자0 표시를 확인했다. 깨진 카드나 가로 넘침이 없으며 증거는 market-nov18/visual-review.json 및 네 개의 focused PNG다. 캡처 도구의 첫 실행은 접힌 근거를 열지 않아 대기 실패했으므로 실제 요약 버튼을 열어 다시 캡처했다.

## 실행 1 최종 검증 결과

- **전체 회귀15/15 PASS, 기본 테스트130/130 PASS**. 최종 실행 2026-11-18T00:17:14.011Z~2026-11-18T00:24:18.132Z. 시작·종료·현재 소스 digest 동일: `4282bc0a27157f7adedd0ee2f46b00c9ee98b30ac694074af7164cef50e58475`.
- 독립 검사 2026-11-18T00:17:16.454Z~2026-11-18T00:19:35.892Z: 전망·뉴스·홈·그래프·계산기5페이지×6언어×1440/390px **60조합 PASS**, 12초 지연 후 유지, 콘솔/로컬HTTP/넘침 오류0. FAQ/JSON-LD·canonical·그래프·계산기14노선·LJ누락구간과ZE6그룹을 확인했다. 기존182기사 전필드·원본52스냅샷·RATES·공시금액/원확인시각을 보존했다.
- 정적 HTML13페이지와 런타임을 최종 전체 게이트에서 대조했다. 제휴 통합 검사 PASS이며 실제 전환/거래/정산 검증을 의미하지 않는다. 광고 비활성·환율API 중단·운영 설정 digest `58fe3f43f77319c5970c8cded41e3d9ef55705e08d59d2e06c3b007507f8de5b` 보존.
- 시작 추적480파일 중465개 바이트 동일·수정15개·삭제0. 신규5개는 보고서·출처/최종검증JSON·시장모듈·일일검증기다. HEAD `ee98230513d84852749c50ac719cfedccfc06c4c` 유지, staged0, **commit·push·배포 없음**.
- 최종 근거: `docs/review-evidence/20261118-market-verification.json`. 원문 접근 제한과 미확인 항목은 위에 기록한 상태를 유지하며, 검사 통과를 추가 공시/공식 평균의 검증으로 확대하지 않는다.

## 실행 2 — 사용자 요청: 홈 상단 전망 메뉴 추가

- 홈페이지 상단 계산기 다음에 `전망` 링크를 추가했다. 목적지는 기존 `forecast.html`이며, 모바일 첫 화면에서 찾기 쉽도록 세 번째에 배치했다.
- `public/index.html`, `public/home-interface.js`, `public/home.css`만 추가 수정했다. 6개 언어 메뉴 이름을 기존 번역 체계에 등록하고 JS/CSS 캐시 버전을 갱신했다. 프랑스어 900px에서 확인된 메뉴 넘침은 긴 메뉴 줄바꿈으로 해소했으며 모바일의 기존 가로 스크롤은 유지한다.
- 6언어×320/390/768/900/1024/1440px **36조합**에서 전망 링크가 처음부터 보이고 화면 넘침0을 확인했다. 키보드 Enter로 전망 페이지 이동, JavaScript 비활성 상태의 링크, 12초 지연 후 번역 유지, 브라우저 오류0도 확인했다. 한국어 모바일과 프랑스어900px 화면을 직접 시각 검토했다.
- 기존 홈 상호작용 검사와 홈 기간 검사(6언어·통화·14초 안정성·한국시간 월경계3건·열린 탭 자정 전환) PASS. JS84개/JSON-LD7개 구문 검사와 홈 정적 HTML 일치 검사 PASS. 증거: `artifacts/review-verification/home-forecast-nav-nov18/inspection.json`.
- 이번 소스 digest는 `000380672e10a604cb3684249fc64aa45dac4df683ceb1d8712ca8675f18ecc1`이다. 실행1 전체 회귀 결과는 당시 소스의 기록으로 보존하며, 이번 작은 메뉴 변경에는 관련 홈 검사를 수행했다. 아침 시장 데이터·기존 작업은 그대로 보존했다. **commit·push·운영 배포 없음.**
