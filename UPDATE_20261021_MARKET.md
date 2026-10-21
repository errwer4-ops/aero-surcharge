# 2026-10-21 10:00 KST market update

## 1. Changed Files

- `public/_shared.js`: separate October 21 snapshot; no airline fare changes.
- `public/market-oct21.js`: daily release, six languages, seven appended cards.
- `public/forecast.html`: release loader/cache version and metadata only.
- `public/news.html`: release loader/cache version, metadata and optional new-card source citations in existing JSON-LD generation.
- `scripts/sync_oct19_metadata.cjs`: optional `--oct21` release synchronization.
- `scripts/verify_oct21.cjs`: regression and rendering checks.
- This report. Earlier uncommitted Eastar work is preserved, not part of a fare rewrite.

## 2. Content Changes

The existing five forecast indicator rows, five summary cards, colors, CSS, navigation and page sections remain. Compact indicator copy is separate from detailed news descriptions. Seven cards are appended: November confirmation (airline), FX, Singapore Jet, crude, freight (four market), Hormuz and Yemen/Saudi risks (two institution). All seven have native ko/en/ja/zh/fr/de text, report/event dates and source links. Older cards are not rewritten.

## 3. Monthly Status

- September: archive.
- October: Level 23 currently applies; historical MOPS 158.57 USD/bbl / 377.54 cents/gal, August 16–September 15.
- November: Level 27 confirmed; 173.89 USD/bbl / 414.03 cents/gal, September 16–October 15; approximately +9.7% and +4 levels. KE one-way KRW 55,600–408,100 remains unchanged.
- Preserve all eight November tables: KE/OZ/7C/LJ/RS/BX/TW/ZE. YP remains pending, not estimated. Preserve currencies, route/distance groups, October baselines and Trinity’s unpublished group rather than assigning zero.
- Monthly confirmation reference: [Yonhap, October 16](https://www.yna.co.kr/amp/view/AKR20261016068000003). Individual official links remain those already verified in the site.

## 4. December Outlook

October 16–November 15 calculation remains in progress. Upside risks and mixed factors coexist; judgment reserved. Direction confidence is low. The specific stage remains unassessed. December average and stage fields remain `null`; no final amount or probability is published.

## 5. Market Observations

| Observation | Basis | Source |
| --- | --- | --- |
| USD/KRW 1,323.65 | October 21, 09:42 KST, indicative; not official fixing/monthly conversion | [exchangerate.dev](https://exchangerate.dev/exchange-rates/usd-krw) |
| Singapore Jet 170.16 USD/bbl | October 19 daily FOB Singapore indicative assessment, low provider confidence; not Platts or a monthly average | [CommodityScope](https://commodityscope.com/prices/singapore-jet-kerosene) |
| Brent 109.64 / WTI 98.58 USD/bbl | October 21, 00:22 GMT / 09:22 KST, intraday, both +0.78% | [Reuters via Investing.com](https://www.investing.com/news/commodities-news/oil-rises-on-middle-east-supply-worries-4961438) |
| October 20 settlements | Brent 108.79; expiring November WTI 101.79; December WTI 97.82, not one continuous contract comparison | [Reuters](https://www.marketscreener.com/news/oil-rises-on-middle-east-supply-worries-ce785cd8df89f324), [SquawkNews](https://squawknews.com/news/525136-oil-futures-settle-lower-as-wti-november-falls-1-8) |

The FX page had advanced past the cutoff, so its current quote was not copied. Its public [one-minute history](https://exchangerate.dev/api/chart-history?base=USD&symbol=KRW&interval=1m) returned the dated observation below. The minute is displayed as 09:42 KST; the exact provider effective timestamp is retained in common data.

```json
{"timestamp":"2026-10-21T00:42:00Z","effective_at":{"KRW":"2026-10-21T00:42:59.999Z"},"rates":{"KRW":1323.65},"source":"live","source_type":"market"}
```

The October 16 Seoul close 1,331.4 remains a dated historical comparison, not the October 21 fixing. Market rates never reprice official airline notices. No verified October 20–21 Jet assessment replaces October 19.

## 6. Hormuz and Regional Risk

- [Reuters, October 21](https://www.marketscreener.com/news/oil-rises-on-middle-east-supply-worries-ce785cd8df89f324): Iranian naval claim made October 20 concerning a supertanker mine strike/fire south of Hormuz. Circumstances, mine origin and responsibility remain independently unconfirmed. Kpler’s October 19 note concerns at least 18 reported attacks over two weeks, not one day or transit counts.
- [Reuters freight report, October 20](https://ca.marketscreener.com/news/asian-refiners-use-smaller-tankers-buy-delivered-crude-as-freight-rates-soar-ce785cdbd181f521): Vitol’s Asia head described about 80 shuttle VLCCs and US–Asia crude transport near USD 40/bbl at the previous week’s conference. This is a route-specific transport example, not daily hire or a universal tariff. Aframax, long charters and delivered purchases do not prove normalization.
- [Reuters Saudi claims report](https://finance.yahoo.com/news/oil-eases-markets-assess-potential-005750414.html): Houthi claims concerning Yanbu, Shaybah, Riyadh and Abha remain attributed and independently unverified.
- [Reuters Shabwa report, October 20](https://ca.marketscreener.com/news/death-toll-from-houthi-attack-on-yemen-training-camp-rises-to-73-ce785cd8db8bf325): local authorities reported 73 deaths from the October 19 attack. Ground fighting is not itself confirmed disruption to commercial passage through Bab el-Mandeb.
- October 18 conditional Iranian proposals and October 20 mediation discussions are not represented as an agreed reopening or removal of the blockade. These risks do not guarantee rising oil or airline charges.

## 7. SEO / GEO

Preserve the October 23 / November 27 / December outlook title and single H1. Page metadata and visible market cutoff use `2026-10-21T10:00:00+09:00`. Forecast FAQ has eight visible questions; news remains a CollectionPage, without a hidden FAQ. New NewsArticle descriptions, full bodies, language, publication/modification timestamps and citation URLs follow the same card data.

Earlier cards retain their own timestamps. In particular Eastar’s official notice is dated October 20 but the existing site verification/publication timestamp is October 21 10:05:51. That timestamp is not backdated: the 10:00 market-information cutoff is distinct from the later existing airline verification.

## 8. Verification

Final regression run: PASS. Commands: `node scripts/sync_oct19_metadata.cjs --oct21`, `node scripts/verify_oct21.cjs`, JavaScript syntax checks, and `git diff --check` (only existing CRLF-conversion warnings).

- 12 page/language combinations: forecast/news with ko/en/ja/zh/fr/de.
- Seven new cards, five indicator rows/cards, eight forecast FAQ entries, single H1 and matching page timestamps.
- Every older card object, eight fare tables, official rows and official URLs equal the baseline with only the new release excluded.
- New NewsArticle full descriptions, language, dates and source citation arrays match the visible card data.
- Categories, no visible foreign-locale Hangul, no undefined/debug output, no clipped card paragraphs.
- Desktop 1440px and mobile 390px: no horizontal page overflow; focused table and mobile oil-card screenshots visually checked.
- Forecast nine local link targets and news ten local targets return success; no local resource failures or JavaScript page errors.
- Both pages retain identical visible text after the 54-second delayed-render check, covering legacy callbacks.
- Screenshots: `%TEMP%/aero-oct21-qa/`.

External HTTP checks returned 200 for Yonhap, exchangerate.dev and CommodityScope. Reuters redistribution pages at Investing.com and MarketScreener returned 403 to automated direct requests. Their indexed Reuters article bodies and publication times were cross-checked; unrestricted browser access is not claimed. This is an external access limitation, not evidence of a 404.

Local preview: http://localhost:4173/forecast and http://localhost:4173/news. No production deployment or Git commit was performed.

## 9. Omissions / Limits

The proposed Gulf crude-flow comparison of 8.5m versus more than 20m bpd could not be matched to an adequately verified primary report and aggregation period. It is not added; the latest flow field stays empty rather than mixing exports, flow estimates and transit counts. No December average, stage, probability or unannounced airline fare is fabricated. Existing archives remain unchanged.
