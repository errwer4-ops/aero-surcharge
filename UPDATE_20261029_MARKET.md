# 2026-10-29 market release and Air Premia November notice

Information cutoff: 2026-10-29 07:30 KST. Editorial modification: 07:58:49 KST, not backdated to the information cutoff. No deployment or commit performed.

## Changed Files

- `public/market-oct29.js`: dated release, eight detailed cards in Korean, English, Japanese, Chinese, French and German, seven visible FAQs and corresponding structured data.
- `public/_shared.js`: separate October 29 snapshot and Air Premia November USD notice.
- `public/source-provenance.js`, `docs/review-evidence/source-reconciliation.json`: independently reviewed Air Premia PDF receipt.
- `public/news.html`, `public/forecast.html`: release include and current metadata. Existing five-row forecast, styles, sections and navigation retained.
- `public/home-sep20.js`, `public/home-platform.js`, `public/calculator-oct20.js`, `public/calculator-platform.js`, `public/graph-oct20.js`: explicit six-source-band/seven-display-slot mapping. The unpublished 1,500–1,999-mile display slot stays null, never zero.
- `public/index.html`, `public/fuel-surcharge-calculator.html`, `public/fuel-surcharge-graph.html`: versioned affected resources and synchronized notice metadata.
- `public/market-oct17.js`: ninth airline name, localized PDF conditions and source-derived pending list. Existing eight notice cards are retained.
- `scripts/sync_oct19_metadata.cjs`, `scripts/sync_november_notice_metadata.cjs`, `scripts/verify_oct29.cjs` and focused existing tests: metadata synchronization and regression checks.

## Data Changes

- October: Level 23 currently applies. November: Level 27 confirmed, September 16–October 15 MOPS 173.89 USD/bbl / 414.03 cents/gal, November 1–30 ticketing, not travel dates.
- Air Premia, published October 27 at 09:18:18 KST: Korea-departure international one-way USD 48 / 64 / 107 / 187 / 236 / 296 across the PDF's six original bands. November uses ticketing-day FX; website comparison conversions are not actual payment amounts.
- FX: October 28 Seoul 15:30 daytime close 1,337.7 KRW/USD, up 14.0. Not an October 29 live fixing or a monthly average.
- CommodityScope: October 27 private low-confidence FOB Singapore daily assessment 178.64 USD/bbl, not Platts MOPS or the unfinished December average.
- October 28 settlements: Brent 115.32 and December WTI 102.78 USD/bbl. Intraday quotes are not substituted.
- December remains under calculation, October 16–November 15. Upside pressure, FX rebound and potential China-quota supply relief are distinguished. No exact level, average, fare or probability is generated.
- Added FX, November confirmation, China quotas, dated Kpler flows, attacks/IMO scope, attributed Sinokor statements, Ras Tanura claims and EIA inventory news. Air Premia also has its localized official-notice card.

## Evidence And Dates

- Air Premia: https://www.airpremia.com/a/ko/customer/notice/803
  - Saved PDF: `C:/Users/jiwoo/OneDrive/Desktop/사이드/유류할증료/2026.11 유류할증료/에어프레미아 11월 유류할증료.pdf`, all four pages visually reviewed.
  - SHA-256: `8632dfb87882f755d7691db280ccc538b6aa6cc881a42d6dae808c73250e2759`.
  - PDF print timestamp October 29 07:44 is not the notice publication timestamp. The notice itself was published October 27, before the cutoff. Live official page returned a Cloudflare challenge; no bypass or successful live-page verification is claimed.
- FX, Seoul Finance, October 28 15:40: https://www.seoulfn.com/news/articleView.html?idxno=641238
- CommodityScope, assessment October 27: https://commodityscope.com/prices/singapore-jet-kerosene
- Reuters settlements/EIA, October 28, updated before cutoff: https://in.marketscreener.com/news/oil-rises-over-1-after-saudi-arabian-refinery-attack-reignites-supply-risk-ce785cd2d98ffe22
- Reuters China quotas, October 28: https://ca.finance.yahoo.com/news/oil-prices-rise-yemen-fighting-182359149.html
- Reuters/Kpler, October 22: https://www.devdiscourse.com/article/international/3996358-roi-dont-mistake-mideast-oil-rebound-for-normality-bousso
- Reuters attacks, October 23: https://energynow.com/2026/10/ship-attacks-in-strait-of-hormuz-hit-record-high-in-october/
- IMO primary confirmed-incident list, updated October 27: https://www.imo.org/en/mediacentre/hottopics/pages/middle-east-highlighted-incidents.aspx
- Reuters Sinokor/Korean shipowners, October 28: https://quews.news/iran-says-sinokor-vessels/
- Reuters Ras Tanura, October 27: https://www.streetinsider.com/Reuters/Yemen%27s%2BHouthis%2Bsay%2Bthey%2Bhit%2BSaudi%2BRas%2BTanura%2Boil%2Brefinery%2Bwith%2Bmissile/27236697.html

## SEO / GEO

Existing canonical URLs preserved. Current descriptions, FAQ JSON-LD and NewsArticle bodies/citations agree with visible localized copy. New market cards use the actual editorial timestamp while separately recording report and observation dates. Old articles retain their records and timestamps. Air Premia publication time and verification time are separate.

## Verification

- `npm test`: 93/93 passed.
- `node scripts/verify_static_sources.cjs`: JavaScript and JSON-LD parsing passed.
- `node scripts/validate_service_data.cjs --base-ref HEAD`: passed; nine source-reconciled November notices. Existing historical provenance warnings retained, not reclassified as verified.
- `node scripts/verify_oct29.cjs`: both pages in all six languages, eight new cards, seven FAQs, schema agreement, archived-card preservation, local links/resources, desktop/mobile and 54-second no-reversion checks passed. No page JavaScript errors in tested surfaces.
- `node scripts/verify_calculator_platform.cjs`: source-mutation rejection, month comparisons, storage lifecycle, route groups and mobile calculator passed.
- Extended quick browser checks: Air Premia NRT/HKG/BKK/HNL/LAX/EWR November amounts, graph array and nonblank canvas pixels, mobile overflow and screenshots.
- Existing eight November notice objects compared against Git HEAD: unchanged. No CSS changes or historical news deletion.
- QA screenshots: `%TEMP%/aero-oct29-qa/`.

## Deliberately Unfilled

December Platts MOPS average, period-average FX, exact stage/fare/probability and October 29 07:30 live official FX remain unavailable. No claim of verified Sinokor violations, actual refinery shutdown, lost Ras Tanura production, complete Hormuz closure or a decided OPEC+ target. External source access restrictions are not treated as proof that a linked article does not exist.
