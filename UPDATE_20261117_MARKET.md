# 2026-11-17 시장·뉴스·전망 업데이트

## 실행 1 — 평일 09:00 정기 작업

- 자료 기준: **2026-11-17 09:00 KST**. 자동 실행 신호는08:58:07.548, 첫 실제 시계 확인은08:58:16이었다. 기준시각 전 관측과 이후 상세 검토를 구분했다. 이후 열람 자료는 원문 게시·배포 기록으로09시 이전 공개 여부를 확인했다.
- 시작 HEAD: `f21c2f10ebf9c4c29fb30abd5eda9975cff29c29` (`2026.12 KR OZ YR TAX ADD`). 작업 트리/staged 변경 없음. 기존469개 추적 파일의 시작 SHA256와 public 원본을 `artifacts/review-verification/market-nov17/start.json`, `start-files/public/`에 보관했다.
- 상위/저장소 AGENTS.md 없음. 최신 UPDATE, 월별 공시 절차, 원문 검증·데이터 검증·운영 문서와 PIPELINE_README를 확인했다. 과거 절차의 RATES 갱신 예시보다 이번 요청의 가격 성격 구분을 우선한다.
- 이번 실행은 **로컬 수정·검증만**이다. commit·push·배포·제3자 메시지·ExchangeRate-API 사용·mock 수집값 게시 없음. 전날 승인된 배포를 오늘의 배포 승인으로 확장하지 않았다.

## 항공사 공시

**에어부산(BX) 12월 한국발 국제선 여객 공시를 새로 확인했다.** 1인 편도, 탑승일이 아닌2026-12-01~31 발권 기준이다. 공식12월 표에는 **USD만** 제공되며 KRW 환산금액·공식 단계·MOPS 평균·기간 평균환율은 만들지 않았다.

| 노선군 | 11월 USD | 12월 USD | 차액 USD |
|---|---:|---:|---:|
| 후쿠오카·마쓰야마·간사이·부산발 나리타·나가사키·칭다오·다카마쓰·시즈오카 | 43 | 40 | -3 |
| 인천발 나리타·삿포로·시안·옌지·장자제·홍콩·마카오·타이베이·가오슝 | 77 | 71 | -6 |
| 싼야·울란바토르·세부·칼리보·다낭·나트랑·비엔티안·부산발 코타키나발루·하노이·보홀·괌·인천발 치앙마이 | 90 | 84 | -6 |
| 방콕·발리 | 106 | 98 | -8 |

- [BX 공식12월 공시4431](https://www.airbusan.com/content/common/customercenter/noticeDetail?id=4431), [11월 공시4420](https://www.airbusan.com/content/common/customercenter/noticeDetail?id=4420)의 노선군·원금액을 별도로 대조했다. 나리타의 부산/인천 구분, 코타키나발루 부산발·치앙마이 인천발 조건을 유지한다. 좌석 없는 만2세 미만 유아 면제다.
- 공식 게시일·최초 게시시각이 없어 null이다. 최초 공식검색 전문은08:58:50~59, 저장된 재검색 전문은08:59:28~39에 반환됐다. 이후09:00:36 상세 web-open에서 동일한 전체 표와 조건을 확인했다. 확인시각을 최초 게시시각으로 쓰지 않았다.
- [KE12월](https://www.koreanair.com/contents/footer/customer-support/notice/2026/2612-infuel) AEM 원문과 [OZ12월](https://flyasiana.com/C/KR/KO/customer/notice/detail?id=CM202611160002531020) 상세HTML은08:59:11~12 직접 저장했다. KE12/1~31·OZ12/1~16과 원금액이 그대로다. **OZ12/17 이후 통합 항공사 금액은 미확인**이며 자동 연장하지 않는다. 기존 KE/OZ 공시·기사 객체의 확인일과 내용은 보존했다.
- 7C/TW의09시 전 목록, ZE의09시 전 셸과09:01:29 실제 목록, YP11월 본문·발권일환율·닝보11/6 조건, LJ/RS의 접근 제한 및 공식/GDS 검색을 기록했다. **12월 확정3개사(KE/OZ/BX), 미확인6개사(7C/LJ/RS/TW/ZE/YP)**다. 접근 실패나 확인 범위의 부재를 미공시 확정으로 바꾸지 않는다.
- 원문 근거: `docs/review-evidence/20261117-bx-december.json`, `artifacts/review-verification/market-nov17/airlines-research.md`, `facts.json` 및 `airlines/`.

### 월별 증빙 보관

기존 사용자 지정 폴더 `C:/Users/jiwoo/OneDrive/Desktop/사이드/유류할증료/2026.12/확인 기록/20261117_에어부산_확인자료/`에09시 이전 공식 검색 반환, 실제 공식 페이지 텍스트 추출, 조건 대조, 접근실패 기록/PNG, SHA256 목록과 보관 안내를 저장했다. 기존 KE/OZ PDF와 원본 캡처는 유지한다.

**BX 정상 원문 스크린샷/PDF는 직접HTTP와 브라우저403으로 확보하지 못했다.** 오류화면은 명시적으로 접근실패로 보관했으며 공시 PDF로 만들지 않았다. 사이트의 요율 검증은 성공한 공식 원문 web 추출과 원표 전체 비교에 근거한다.

## 시장 자료와 가격 성격

| 지표 | 확인 값과 관측 기준 | 원문·공개 근거 |
|---|---|---|
| USD/KRW | **1,335.7 KRW/USD, -1.0원**,11/16 서울15:30 주간 종가. 비교일은 전 거래일11/13 | [뉴시스](https://www.newsis.com/view/NISX20261116_0003870079)11/16 15:46:17 게시·16:40:24 수정,08:59:21 직접 확보. [뉴스1](https://www.news1.kr/finance/market-exr/6355567)·[뉴스핌](https://www.newspim.com/news/view/20261116001164) 대조 |
| Brent | **92.44 USD/bbl, -3.40(-3.55%)**,2027년1월물,11/16 선물 정산 | [연합인포맥스](https://news.einfomax.co.kr/news/articleView.html?idxno=4445052),11/17 07:02:19 게시·07:03 수정(분 정밀도),08:59:53 직접 확보 |
| WTI | **85.72 USD/bbl, -2.84(-3.21%)**,2026년12월물,11/16 선물 정산 | 같은 인포맥스와 [뉴시스](https://www.newsis.com/view/NISX20261117_0003870633)06:36:25 게시·06:39:48 수정, [Bloomberg/Rigzone](https://www.rigzone.com/news/wire/oil_retreats_as_traders_weigh_supply_glut-16-nov-2026-185096-article/) 교차 확인 |
| Singapore Jet | **151.15 USD/bbl, +1.19(+0.8%)**,11/13 FOB 민간 평가, 비교11/12 | [CommodityScope 원문](https://commodityscope.com/prices/singapore-jet-kerosene)08:58:58~08:59:03 web 열람. 직접HTTP403은 별도 기록. 제공자 신뢰도 낮음, 최초 게시시각null |
| IATA/Platts | **11/13 종료 주간** 세계169.82(-5.1%), 아시아·오세아니아152.80(-6.4%) USD/bbl | [공식 모니터](https://www.iata.org/en/publications/economics/fuel-monitor/)·[원본 표 이미지](https://www.iata.org/contentassets/9036deaf9c984009a3515fd6aa1c5e24/fuel_price_analysis.jpg)08:59:21 HTTP200 저장·시각 대조. Last-Modified11/16 08:28:39Z는 최초 게시시각이 아님 |

원유는 원문 보도의 **선물 정산**을 대조한 것으로 거래소 정산표 직접 검증과 구분했다. 환율 주간 종가를 야간·NDF·실시간·기간 평균환율이나 사이트의 표시용 환산 RATES에 덮어쓰지 않았다. Singapore Jet 평가 범위를 매수/매도 호가나 장중 고가/저가로 쓰지 않았다. IATA는 세계/지역 정유가격 주간평균이며 항공사 산정기간 공식 MOPS가 아니다.

### 12월 MOPS 보도 참고와 공식 공시의 구분

[11/16 뉴시스](https://www.newsis.com/view/NISX20261116_0003869952)의 대한항공 인용 **394.44 cents/gal·25단계**, [뉴스1/파이낸셜뉴스](https://www.fnnews.com/news/202611161506121925)·[머니투데이](https://www.mt.co.kr/index.php/industry/2026/11/16/2026111615451527605)의 **165.66 USD/bbl**, 산정기간10/16~11/15를 새로 확인했다. `reportedDecemberMops*`와 `reportedDecemberStage`에 별도 보도 참고로 기록한다.

**12월 공식 MOPS 산정평균·공식 단계·산정기간 평균환율 필드는 null**이다. 공시 본문/Platts 원자료에서 직접 확인한 값으로 승격하거나 모든 항공사의 공통 단계로 적용하지 않는다. 공식 공시금액 자체는 항공사별 원통화·기간으로 별도 확인되어 있다. ALL 공통 금액은 없다.

현재11월의 대한항공27단계·173.89 USD/bbl·414.03 cents/gal은 [10/16 뉴시스 원문](https://mobile.newsis.com/view_amp.html?ar_id=NISX20261016_0003828757)을 오늘 다시 읽고9/16~10/15 산정기간·대한항공 보도 범위로 유지했다. 이전 보고서 숫자를 근거로 재사용하지 않았다.

## 해상·공급 뉴스

1. **IMO:** [공식 목록](https://www.imo.org/en/mediacentre/hottopics/pages/middle-east-highlighted-incidents.aspx)을08:59:23.522 직접 저장했다. as-at11/16 **137건·선원 사망25명**이다. 중동 해역 누계이며 오늘 발생 건수·호르무즈 단독 공격 수·침몰 선박 수·원유 공급 손실이 아니다. 최초 게시시각은 미표시다.
2. **UKMTO:** [207-26](https://www.ukmto.org/-/media/ukmto/products/20261116-ukmto_warning_207-26.pdf?rev=b7a05cc809114a4c9bb82eb10734d893)은11/16 05:58UTC 회사 보안책임자 보고, [208-26](https://www.ukmto.org/-/media/ukmto/products/20261116-ukmto_warning_208-26.pdf?rev=29246f8ab7714c10a7668e09cddcac15)은19:00UTC 제3자 보고다. 유조선 공격·기관실 화재, 각각 인명피해 보고 없음/전원 확인과 승무원 안전 보고를 구분했다. 선명·공격자·정확 피해량·두 보고의 중복은 미확인이다. **독립 확인된 공격2건으로 확정하거나 IMO에 더하지 않는다.**
3. 공식 UKMTO PDF는 web 텍스트로 읽었지만 직접HTTP403·유효한 로컬PDF/정상PNG 미확보다. 공식X 배포글의07:19UTC/21:33UTC 시각을 공개 미러로 대조해 cutoff 전 배포 근거를 남겼다. X 직접 열람이나 PDF 최초 게시시각 검증이라고 주장하지 않는다.
4. **JMIC114:** [11/15 공식 보고서](https://www.ukmto.org/-/media/ukmto/products/update-114_jmic_advisory_15-nov.pdf?rev=be65cfbd755a41c4816feba6cef4401c)의 기준은11/15 13:00UTC, 호르무즈SEVERE다. 오늘 새 평가로 날짜를 바꾸지 않는다. JMIC 사건/통항 집계를 IMO·Windward와 합산하지 않는다.
5. **EIA 신규 분기 자료:** [11/16 Global Energy Security Data 표4](https://www.eia.gov/outlooks/steo/report/energysecurity/article.php)의2026Q3 호르무즈 전체 석유는 **9.1 million b/d**(Q2 5.1, 전년 동기21.4), 구성은 원유·콘덴세이트7.3/제품1.8이다. **분기 과거 평균 추정**이며 현재 유량·현재 공급 손실·항해 안전이 아니다. AIS 불확실성과 개정 가능성을 함께 표시했다. 공식RSS 자정EST는 날짜 placeholder로 다루고, 같은 수치를 실은 [22:05Z PRNewswire 원문](https://www.prnewswire.com/news-releases/on-monday-in-oil-and-gas-federal-hormuz-data-lands-as-two-acquisitions-are-announced-302941088.html)의 cutoff 전 공개로 보강했다. 수치 출처는 EIA, 보도자료는 공개시각 보강용이다.
6. **OPEC 생산능력 검토:** [Reuters/BOE Report](https://boereport.com/2026/11/16/opec-officials-meet-to-discuss-oil-production-capacity-review/amp/)11/16 17:11:25Z 게시·18:36:09Z 수정 원문을 확인했다. 2027년 이후 생산 기준에 활용할 최대 지속가능 생산능력 검토 논의이며12월 증산 결정·실제 생산량·확정2027쿼터가 아니다. [11/1 공식 결정](https://www.opec.org/pr-detail/620-1-november-2026.html)의12월 목표 유지·11/29 다음 회의도 재확인했다.

**변경 없는 자료는 관측일 유지:** [Windward](https://insights.windward.ai/)11/14판의11/12 18Z~11/13 18Z 통항9회(진입5·출항4), AIS미관측9회 안의 위성단독2회; [EIA 항공유 재고](https://ir.eia.gov/wpsr/table6.csv)11/6 종료 주간41.979 million barrels(+0.197); [IEA11월 보고서](https://www.iea.org/reports/oil-market-report-november-2026)10월 세계공급105.4·오만 제외 걸프 석유수출18.4(원유15 포함) million b/d; [EIA11월 STEO](https://www.eia.gov/outlooks/steo/)11/10 발표·11/5 입력 완료 자료를 새로 대조했으나 새 관측/새 기사로 재발행하지 않았다.

Gulf Times의 통항5척·0척 검색 결과는 HTML 실제 발행일8/17과 현재 표시일이 충돌해 최신 기사에서 제외했다. 이란 측 유조선 침몰·원유량 주장은 독립 확인이 없어 실제 침몰/확정 손실 지표로 반영하지 않았다. 검색 요약만 확보한 공항 연료저장 기사도 현재 공항 공급 장애로 단정하지 않았다.

## 구현과 보존

- `public/_shared.js`의 기존 접두부와 날짜별50개 원본 스냅샷을 보존하고11/17 객체·registry키2개를 추가했다. `forecast_feed.json`은 현재 입력·전망·별도 announcedNotices와 정합성을 맞췄다. 확인일만 바꿔 옛 가격을 최신으로 표시하지 않는다.
- `public/market-nov17.js`에 새 시장·공급·해상 기사9개와6개 언어 지표·FAQ를 추가했다. 기존시장모듈/과거기사170개는 수정하지 않고 BX1개를 합쳐 총180개가 된다.
- `december-notices.js`, `source-provenance.js`에 BX 원표와 독립 근거를 추가하고, `december-update.js`를 개별 통화·발권기간·검증시각에 맞췄다. KE/OZ 기존 기사 전필드와 원검증시각은 보존한다.
- 그래프는 BX12월4구간을 원통화·출발지 조건으로 연결하며 미확인6개사는 null이다. 계산기에서 부산–나리타 USD43→40과 인천–나리타 USD77→71 등 구간별 비교를 확인한다. KRW/ USD 최저액을 환율 없이 섞어 순위를 만들지 않는다.
- 전망은 기존 결론 우선·총액 비교 CTA·접힌 근거/FAQ 구조를 유지하고3개사 확인 상태로 갱신한다. 공시 적용기간·OZ12/17 이후 별도 확인은 유지한다. 홈·항공사 목록·뉴스·전망·그래프·계산기·KE/OZ 상세8페이지의 연결 버전 및 필요한 정적SEO/JSON-LD 스냅샷을 동기화했다.
- BX 공시의 긴 공항 그룹 때문에 모바일에서 금액 열이 밀리는 문제를 발견해 BX 표 첫 열만 줄바꿈·폭 제한을 적용했다. 실제390px 캡처에서4구간의11월·12월·차액을 동시에 읽을 수 있다.
- 독립 검토에서 상속된 `p.status`의 “12월 단계·금액 미확정” 및 `singaporeJetFobReferenceKind`의 `not_latest_at_cutoff` 충돌을 발견했다. 최신 문구/객체에서만3개 공시 확인과 날짜 있는 민간평가 의미로 고쳤다. 이전 날짜의 객체·과거 기사에는 소급 적용하지 않는다.
- 광고 비활성·제휴 URL·분석/동의 동작·환율 API 사용 중단·canonical을 유지했다. 전날 확인된 항공사 코드 중복 및 기존 페이지 간 표시 환율 차이는 이번 공시/시장 작업과 무관하여 임의 리팩터링하지 않았다.

## 검증 진행 기록

- 공통 데이터 독립 검사: 이전50개 스냅샷/RATES 보존, shared/feed416개 공통 필드 일치. 12월 공식 MOPS/단계 null과 별도 보도참고·3사 개별 공시를 구분.
- BX 개별 검증: 공시/원문 Node17개, 서비스 공시3사22금액, 그래프6언어×9통화와320/390px·12초 유지, 계산기 원통화/노선/월 비교, 공시6페이지×6언어 통합 검사 통과. 이 개별 실행은 새 시장모듈 연결 전 검사이므로 최종 통합 검사와 구분한다.
- 독립 일일 검증의 첫 실행은 `cn`→`zh` 별칭을 새 언어로 세는 전제, 이후 실행은 계산기의 month input을 select로 취급한 전제에서 중단됐다. 검증기를 실제 구조에 맞게 수정했으며 서비스 실패로 숨기거나 오류를 무시하지 않았다. 실패 로그를 보관한다.
- 첫 전체 배포 게이트는 기본·구문·데이터·공시·URL·제휴·플랫폼 검사를 통과한 뒤, 독립 검토의 상속 문구 수정 때문에 중단했다. PID/명령을 확인한 해당 검증 프로세스와 자식만 종료했으며 사용자 프로세스를 종료하지 않았다. 최종 소스를 동결한 뒤 전체 게이트를 다시 시작했다.
- 최종 전체 검사와 일일 UI 검증 결과는 아래에 추가한다. 외부 광고·분석·제휴/API 요청은 검사에서 차단하며 실제 거래·정산·분석 수신 성공을 의미하지 않는다.

## 미반영과 한계

- 6개사12월 여객 요율, OZ12/17 이후 금액, 직접 검증한 공식 MOPS 평균·공식 단계·기간 평균환율은 미확인이다. 이전월 복사·원유/환율 역산·언론 단계의 공식 승격을 하지 않았다.
- BX 정상 공시 캡처/PDF와 UKMTO/JMIC 정상 로컬PDF 시각 검증은 접근 제한으로 미완료다. 성공한 원문텍스트·검색/배포 근거와 실패 상태를 분리해 기록했다.
- 전체 조사 근거와 원문 해시는 `artifacts/review-verification/market-nov17/`에 보관한다. 날짜·수치의 재현 가능한 요약은 `energy-fx-facts.json`, `maritime-facts.json`, `facts.json`, `market-module-evidence.json`이다.
- 커밋·푸시·운영 배포는 하지 않는다.



## 실행 1 최종 검증 결과

- **전체 회귀 15/15 PASS, 기본 테스트 127/127 PASS**. 최종 실행 2026-11-17T00:21:45.327Z~2026-11-17T00:28:42.631Z. 실행 중 소스 digest가 변하지 않았고 최종 checkout과 동일하다. 요약: docs/review-evidence/20261117-market-verification.json.
- 최종 서비스/검사 소스 digest: 6921a6f7becdf71c350cc9bf7956db7d2bb40ced27de0dbbf7cad9d938a851d8. 운영 설정 digest: be4a8ac9816841d37faaa86f2c8e78fc7b9c66416f0ab50be4e91a4f469ad3c4. 외부 광고·분석 설정/제휴 URL·API 중단 조건을 변경하지 않았다.
- 독립 일일 검증: 전망·뉴스·홈·그래프·계산기 5페이지×6언어×1440/390px,60조합과12초 유지·콘솔/넘침·FAQ/JSON-LD·공식/보도 데이터 구분 PASS. 기존 커밋 f21c2f1 원문을 별도 브라우저로 제공해 **170개 기사 전필드·원본50개/런타임55개 과거 스냅샷 보존**, 신규9시장기사+BX1기사=180개를 확인했다.
- 위 일일 실행 완료 후 그래프 소개에 BX가 빠진 옛 문구를 시각 검토에서 발견했다. graph-interface.js 6언어와 정적HTML을 수정하고, 소개의 항공사명 검사도 보강했다. 그래프만 다시6언어×2폭12조합·12초 유지·금액/통화/null·캔버스·콘솔/넘침을 통과했다. 후속 검사 완료 2026-11-17T00:21:52.775Z. 원래 전체5페이지 실행과 후속 범위검사의 소스/스크립트 시점은 구분한다.
- 그래프 문구 수정 전에 실행 중이던 두 번째 전체 게이트도 중단했다. 최초/두 번째는 최종 성공으로 계산하지 않았고, 모든 수정·검증기 변경을 동결한 세 번째 전체 실행에서15개 모두 통과했다.
- BX 모바일 공시표는 CSS 수정 전 캡처를 bx-visual-before-wrap에 보존하고 재캡처했다. 최종 airlines/bx-visual/bx-notice-mobile.png에서4개 노선군과11월/12월/차액이 동시에 읽힌다. 그래프USD40/71/84/98, 부산–나리타 계산기USD43→40·차액-3도 재확인했다. 전망 한국어 모바일/프랑스어 데스크톱, 그래프 최종 소개도 시각 대조했다.
- 기존 469개 추적 파일 중445개는 바이트 동일, 수정24개·삭제0이다. 공유 파일의 이전 전체 접두부는 동일하다. 신규6개는 보고서·근거JSON3개·시장모듈·일일검증기다. preservation-audit.json에 전체 목록이 있다.
- HEAD는 시작 커밋 f21c2f10ebf9c4c29fb30abd5eda9975cff29c29 그대로, staged 파일0이다. **commit·push·운영 배포 없음.** 본 결과는 로컬 검사이며 운영에 반영됐다고 주장하지 않는다.
- 원문·출처 요약: docs/review-evidence/20261117-market-sources.json, docs/review-evidence/20261117-bx-december.json. 최종일일검증기 SHA256: fc8b80afae000785f2eff0d86e7759c5221c5532960114e189f425d02bb7b3b7. 보고서의 미확인 항목과 정상 캡처/PDF 접근 제한은 그대로 남아 있다.

## 실행 2 — 사용자 승인에 따른 커밋·배포

- 사용자가 오늘 변경사항의 커밋·푸시·운영 배포를 요청했다. 정기 뉴스·전망 업데이트의 날짜 형식을 이어 제목은 `add 2026.11.17 news and forecast`로 사용한다. 직전 특별 공시 커밋의 2026.12는 적용월이므로 오늘 날짜로 치환하지 않는다.
- 검증 완료된 수정24개·신규6개, 총30개 파일을 대상으로 한다. 현재 소스 digest는 실행1 최종 검증의 `6921a6f7becdf71c350cc9bf7956db7d2bb40ced27de0dbbf7cad9d938a851d8`와 일치하고 운영 설정도 동일하다. 배포 준비 검사 통과, 광고 비활성·환율API 중단 유지.
- 이번 기록은 push 전 준비 결과다. 새 커밋의 실제 GitHub CI/Vercel 상태와 운영 파일·화면 검증은 ignored `artifacts/review-verification/deploy-nov17/`에 보관하고 대화에서 최종 보고한다. 오전 로컬 작업과 이후 승인된 배포를 구분한다.
- 새 파일까지 포함한 staged diff 검사에서 시장모듈 끝의 불필요한 빈 줄을 발견해 제거했다. 실행 코드·수치·문구는 동일하며 오전 전체 검증 해시는 수정 전 기록으로 보존한다. 구문·staged diff를 다시 확인하고, 최종 커밋은 원격 CI/Vercel 전체 검사와 운영 파일 대조로 검증한다.
