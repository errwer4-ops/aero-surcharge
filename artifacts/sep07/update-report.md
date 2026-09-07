# 2026.09.07 20:30 KST 업데이트 보고

1. 수정 파일: `public/forecast.html`, `public/news.html`, `public/_shared.js`, `public/sep04-update.js`. 추가 파일: `public/market-sep07.js`, `scripts/verify-sep07.cjs`.
2. 파일별 변경: HTML은 데이터 연결·검색 메타·구형 카드 삭제 조건을 수정했습니다. 공통 JS는 최신 시장 참조를 갱신했습니다. 기존 렌더러는 새 데이터·다국어·FAQ를 사용하며, 데이터 파일은 DOM이나 CSS를 변경하지 않습니다.
3. 현재월: 9월 21단계 적용, 10월 산정기간 8/16~9/15 추적을 유지했습니다. 항공사별 9월 공식 금액은 변경하지 않았습니다.
4. 10월 공식공시: KE/OZ/7C/LJ/TW/ZE/BX/RS/YP 공식 도메인 검색과 공지 목록 접근을 재시도했습니다. 한국 출발 국제선 10월 공시를 확인하지 못했습니다. 동적 목록·접근 오류로 전 항공사의 부재를 확정할 수 없어 화면에는 '미확인'으로 표시합니다. 아시아나 일본 출발 9~10월 공지는 한국 출발 공시와 구분했습니다.
5. USD/KRW: 9/7 15:30 기준 1,340.5원, 장중 저점 약 1,334.7원, 100엔 약 861원. 산정기간 평균환율은 null(집계 중)로 구분했습니다. 거래·계산기 환율 API 로직은 변경하지 않았습니다.
6. Singapore Jet Fuel: 9/3 시장 flat price $159.58/bbl. 10월 MOPS 평균으로 표기하지 않았습니다.
7. 비교: 8/27 $142.93 → 9/3 $159.58, 차이 $16.65. Sparta의 주간 +$9.61과 비교 기준이 다름을 설명했습니다.
8. 글로벌 Jet Fuel: IATA/S&P Global Platts 주간평균 $171.01, +9%. Singapore MOPS와 구분했습니다.
9. 9월 Baseline: $149.29/bbl, 355.46 cents/gal, 7/16~8/15 확정 평균 유지. 9/3 시장값과 차이는 +$10.29입니다.
10. 국제유가: 9/7 08:22 UTC 장중 Brent $96.19, WTI $91.03, Brent 장중 고점 $97.93. 종가로 표기하지 않았습니다.
11. OPEC+: 9/6 공식 발표에 따라 10월 생산정책 유지. 새 감산이나 추가증산으로 표현하지 않았습니다.
12. 유조선 공격: 미 중부사령부의 이란 유조선 3척 공격 발표와 이란 측 공격 주장을 출처에 귀속했습니다. 모든 주장에 독립 확인이 있었다고 쓰지 않았습니다.
13. Hormuz: 공개 추적 commodity vessel 10일 평균 약 10척/일. 주말 2척·6척은 갱신 집계이며 초기 보도와 차이가 있음을 설명했습니다.
14. VLCC: 수요일 이후 출항 미확인은 공개 추적 범위입니다. 실제 통항 0척으로 확정하지 않았습니다.
15. Restricted zone: 발표 예정으로 표시했습니다.
16. Oman corridor: 이란 측 협의·지도 추진 주장으로 표시하고 실제 정상화와 구분했습니다.
17. 선박·보험·운임: 기존 호르무즈·정제품 공급 행에서 설명합니다. 선박연료는 항공유와 다른 제품이며 간접 운송비 경로임을 뉴스에 반영했습니다.
18. 전망 변경: '보합 중심·인하 가능성 유지·상승 리스크 재확대'에서 '보합~상승 압력 우세·인하 가능성 크게 후퇴'로 변경했습니다.
19. KRW 완충: 항공유 단계가 보합·상승하더라도 평균환율 하락으로 원화 금액 상승폭이 제한될 수 있음을 설명했습니다.
20. 신뢰도: 낮음~보통·보통에 접근. 특정 10월 단계·금액·확률을 생성하지 않았습니다.
21. 신규 카드: Singapore Jet, 글로벌 Jet, 유조선 공격, 통항, 환율, 제한구역, Oman corridor, OPEC+, 선박연료 순서의 9개 카드. 6개 언어의 제목·요약·본문·영향 설명과 원문 링크를 제공합니다.
22. 수정 카드: 기존 최신 시장 카드 묶음을 갱신하고 9월 항공사 카드·공지 링크를 보존했습니다. 과거 정리 로직이 'Kpler'를 포함한 최신 카드까지 삭제하던 조건을 수정했습니다.
23. SEO: 정적 제목·설명·H1과 렌더 후 언어별 메타를 갱신했습니다. 기존 URL은 유지했습니다.
24. GEO: 첫 문단 직접 답변, 날짜·단위·평균과 단일값 구분, 원문 출처, 데이터와 분석 구분을 반영했습니다. 별도 지표 행이나 새 대형 섹션은 추가하지 않았습니다.
25. FAQ: 기존 FAQ 영역의 5문항을 6개 언어로 갱신했습니다.
26. 내부링크: 기존 링크 스타일을 유지하고 예전 월 표기·언어 잔존을 수정했습니다. 그래프·항공사·조회·뉴스·계산기 연결을 유지했습니다.
27. JSON-LD: 페이지 dateModified는 2026-09-07T20:30:00+09:00, FAQ는 실제 표시 내용과 일치하도록 갱신했습니다. 개별 뉴스 Article 제목·발행일·저자는 덮어쓰지 않습니다.
28. Canonical: forecast.html/news.html의 aero-surcharge.com 주소 유지. 별도 archive 이름의 페이지 파일은 없습니다. 기존 월별 기록 URL을 변경하지 않았습니다.
29. 화면검증: 실제 언어 선택 메뉴로 ko/en/ja/zh/fr/de를 순환하며 9개 최신 카드, 9개 항공사 공지 링크, 5개 forecast 카드, H1 하나, JSON 파싱, 한국어 잔존을 검사합니다. 데스크톱 1440px·모바일 390px 스크린샷을 보관합니다.
30. 오류검증: 브라우저 pageerror, undefined, 가로 넘침, JS 문법 및 git diff 공백 검사를 수행했습니다. 결과는 verification.json과 검증 스크립트로 확인할 수 있습니다.
31. 잔여사항: 과거 날짜별 스크립트와 반복 렌더링 구조가 누적되어 있습니다. 이번 최신 데이터가 과거 카드 정리 대상에 포함되는 문제는 수정했습니다. 전체 구조 통합·모든 과거 아카이브 번역 재작성은 이번 범위에서 수행하지 않았습니다. 운영 배포는 수행하지 않았습니다.

## 확인 출처

- Singapore Jet: https://www.spartacommodities.com/market-outlook/
- 글로벌 항공유: https://www.iata.org/en/publications/economics/fuel-monitor/
- 환율: https://stock.mk.co.kr/news/view/1154690
- 국제유가·공격 발표·10일 통항: https://uk.marketscreener.com/news/oil-extends-gains-after-us-and-iran-strike-ships-ce785bdbdd8cf42d
- OPEC 공식: https://www.opec.org/pr-detail/613-6-september-2026.html
- 제한구역: https://apnews.com/article/a52beec77dc90af3d040d0553837ad20
- Oman corridor: https://en.people.cn/n3/2026/0907/c90000-20496645.html
- 선박연료: https://uk.marketscreener.com/news/ship-fuel-shortage-looms-as-refiners-strained-by-war-favour-other-products-ce785bdbdd8cff21

## 검증 실행

`PORT=4187`로 로컬 서버를 실행한 후 `node scripts/verify-sep07.cjs`로 재현할 수 있습니다.
