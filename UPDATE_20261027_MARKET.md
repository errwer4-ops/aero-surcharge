# 2026-10-27 07:30 KST Update

## 1. Files

- `public/_shared.js`
- `public/market-oct27.js`
- `public/forecast.html`
- `public/news.html`
- `scripts/sync_oct19_metadata.cjs`
- `scripts/verify_oct27.cjs`
- This report.

## 2. Changes by File

The common file adds a dated observation snapshot without changing any fare table. The new daily release follows the existing market module chain: five existing forecast rows/cards, nine appended news cards, nine forecast FAQs and native Korean/English/Japanese/Chinese/French/German copy. Forecast/news load the new release before the existing final renderer, with versioned URLs. Metadata synchronization accepts `--oct27`. No CSS, graph implementation, navigation, canonical or public page URL was changed. Historical cards retain their objects, amounts and timestamps.

## 3. Monthly States

September stays archived. October Level 23 currently applies; its MOPS 158.57 USD/bbl is the August 16–September 15 average. November Level 27 is confirmed for November ticketing; MOPS 173.89 USD/bbl / 414.03 cents/gal covers September 16–October 15, approximately +9.7% and four levels above October. These figures were rechecked against the [October 16 Yonhap report](https://www.yna.co.kr/amp/view/AKR20261016068000003), separately from airline fare verification. Older market-reference cards are not retroactively rewritten.

## 4. Airline Evidence

Korean Air saved PDF was rendered and visually inspected: KRW 55,600–408,100, including the 2,000–2,999 mile KRW 185,800 band. The [official web text](https://www.koreanair.com/contents/footer/customer-support/notice/2026/2611-infuel) agrees and specifies November 1–30 ticketing, Korea departure, one-way and average FX over the same fuel assessment period.

Asiana saved PDF pages 1–2 were rendered and inspected: KRW 62,400–351,100, November 1–30, Korea departure, one-way. The [official notice](https://flyasiana.com/C/KR/KO/customer/notice/detail?id=CM202610160002530868) was also read through the web tool.

All eight already source-reconciled November tables (KE/OZ/7C/LJ/RS/BX/TW/ZE) and their links/periods/currencies/groups were preserved and compared against the baseline. YP remains pending. No additional carrier notice or fare was invented. Other six carriers were not newly recaptured in this update.

**Browser capture limitation:** fresh Chromium navigation to both official KE/OZ pages failed with HTTP/2 protocol errors; an HTTP/1-compatible attempt timed out. No successful official-page browser screenshot is claimed. PDF renders are in `%TEMP%/aero-oct27-qa/ke-pdf.png`, `ke-band-detail.png`, `oz-pdf.png`, `oz-pdf-2.png`. Existing independent source-review records were not weakened or replaced by status strings.

## 5. December

October 16–November 15 calculation is ongoing. Upside risks remain, public data are limited and specific-stage judgment is reserved. Direction confidence remains low; confidence in an individual stage is not assigned. December average/stage fields stay `null`. No forecast fare or probability was created.

## 6. Market Data

| Series | Included Observation | Qualification |
| --- | --- | --- |
| November MOPS | 173.89 USD/bbl / 414.03 cents/gal | Completed September 16–October 15 assessment, not current daily Jet |
| CommodityScope Jet | 179.94 USD/bbl, October 23 | Daily indicative FOB Singapore assessment, provider confidence low |
| Prism Jet | 176.59 USD/bbl, October 27 07:06 KST | Private modelled cash reference, FOB Singapore loading 15–30 days ahead, not Platts |
| USD/KRW | 1,326.09, October 26 | Investing.com provider daily close, not Seoul official fixing or period-average FX |
| Brent / WTI | 115.81 / 101.76 USD/bbl, October 26 | December-contract settlements, about −0.8% / −1.5%, not October 27 intraday |

Sources: [CommodityScope](https://commodityscope.com/prices/singapore-jet-kerosene), [Prism](https://www.prismprice.com/grade/JET-SING), [Investing.com historical FX](https://kr.investing.com/currencies/usd-krw-historical-data), [Bloomberg via Rigzone](https://www.rigzone.com/news/wire/oil_dips_from_6_month_high_as_officials_meet_in_tehran-26-oct-2026-184936-article/).

Prism’s directly fetched Dataset JSON-LD returned `dateModified: 2026-10-26T22:06:23.639Z`, value `176.59`, unit `USD/bbl`; that is before the 07:30 KST cutoff. The requested 167.64 at approximately 03:30 could not be reverified and was not substituted into the current reference. FX at the supplied source showed 1,326.09 rather than the document’s approximate 1,325.6; different providers/bases were not averaged. A verified October 27 morning FX quote was not added. The fare tables are never repriced with spot FX.

## 7. Hormuz Volume / Transit / Security / Costs

[Reuters’ October 22 column via Devdiscourse](https://www.devdiscourse.com/article/international/3996358-roi-dont-mistake-mideast-oil-rebound-for-normality-bousso) cites Kpler’s October-to-report averages: Middle East exports 17.3m bpd versus a two-month pre-war 16.9m; Hormuz 11.7m bpd, about 82% of pre-war. These are not a completed October monthly average or October 27 traffic. It also reports Middle East–China VLCC rates around USD 1.4m/day and insurance around 10% of cargo value versus approximately 3% pre-war, not universal tariffs.

[Gulf News, updated October 25](https://gulfnews.com/world/mena/strait-of-hormuz-crisis-nearly-500-vessels-face-disruption-amid-new-tanker-attack-1.500723273), cites JMIC: 101 US-facilitated transits over October 22–24 (72 hours), approximately 492 waiting vessels estimated October 25, Severe threat. The 2025 baseline of 138 vessels/day has a different denominator. AIS-off vessels can be missed; the queue lacked immediate UAE confirmation.

[Reuters via EnergyNow, October 23](https://energynow.com/2026/10/ship-attacks-in-strait-of-hormuz-hit-record-high-in-october/) reports Washington Institute’s 28 confirmed/reported attacks during October to publication, potentially missing unreported cases. Do not conflate attacks, cargo flow, assisted crossings and total traffic. No complete closure is asserted.

## 8. UAE / Saudi Arabia / Yemen / Diplomacy

[Reuters via AOL, October 26](https://www.aol.com/articles/oil-spill-off-uae-widens-092751000.html) describes October 24 satellite imagery, clean-up/environmental assessment and coastal restrictions in Umm Al Quwain, Al Hamriyah/Sharjah and Ras Al Khaimah. Officials did not establish a vessel or cause; Gem No.2 is an expert attribution, not an official finding.

[Reuters via Internazionale, October 26](https://www.internazionale.it/ultime-notizie-reuters/2026/10/26/houthis-say-they-attacked-east-west-oil-pumping-stations-no-saudi-confirmation) attributes East-West pumping-station/Riyadh attack claims to the Houthis, without immediate Saudi confirmation. Saudi-led coalition statements about destroyed Yemen missile installations are attributed to that coalition, not independent proof. Ground fighting and Bab el-Mandeb shipping effects remain separate.

The [AP October 26 report](https://apnews.com/article/36486edb61b3bf4e0df67e8a17123e44), also indexed as an [AP syndicated story](https://www.local10.com/news/world/2026/10/26/delegations-meeting-in-tehran-with-region-on-edge-over-potential-for-renewed-fighting/), supports Tehran meetings involving Iranian, Saudi, Pakistani and Turkish officials. Contact is not a ceasefire, reopening agreement or normalized shipping.

## 9. SEO / GEO / Structured Data

Existing JSON-LD types and URLs are retained. Titles and one H1 distinguish current October, confirmed November and December outlook. Screen cutoff, page metadata and page-level `dateModified` are `2026-10-27T07:30:00+09:00`. Nine visible forecast FAQs cover the requested distinctions; news has no hidden FAQ. New card publication/modification dates, descriptions, full bodies and citation arrays share the same localized data. Older card timestamps are unchanged.

## 10. Tests

- `npm test`: 92/92 PASS.
- `npm run test:static`: PASS, 60 JavaScript sources and seven JSON-LD documents parse.
- JavaScript syntax and `git diff --check`: PASS, only Git CRLF conversion notices.
- Final Playwright regression: PASS. Twelve page/language combinations, nine new cards, nine FAQs, five rows, all previous cards and eight fare tables unchanged, original official links, categories, mobile 390px/desktop 1440px, local link/resource checks, 54-second delayed-render stability, and home/calculator/graph fare smoke checks all passed. No uncaught application JavaScript errors or local resource failures were recorded; third-party network calls were intentionally blocked in this deterministic test.
- Focused mobile Jet-card and desktop forecast-table screenshots were visually inspected. No CSS changes or text clipping was introduced.

## 11. Remaining Limits

- Requested Prism 167.64 and FX approximately 1,325.6 were not promoted over conflicting directly observed provider values. No new October 27 morning FX fixing is asserted.
- UKMTO’s public incident listing returned no readable incident entries in this environment. The specific 182-26 original warning and its crew/damage/environment fields could not be independently read from UKMTO. Those details are not published as newly verified facts; different October 22/23 tanker incidents are not merged.
- Fresh KE/OZ browser screenshots could not be captured, as described above. Official web text and saved PDFs were checked; no claim of a successful screenshot is made.
- Direct AP/Reuters access is limited on some routes; accessible wire redistributions/indexed AP reporting were used with attribution. A blocked response is not certified as a working external browser link.
- The existing global analytics/privacy widget retains its own ko/en behavior and may keep Korean labels after a language switch. It is excluded from the market-content locale assertion and was not altered as an unrelated feature.
- No production deployment, Git commit, new airline fare, library installation or design refactor was performed. Local preview remains http://localhost:4173/forecast and http://localhost:4173/news.
