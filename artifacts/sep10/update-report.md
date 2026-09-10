# 2026-09-10 19:34 KST update report

## Files

- `public/market-sep10.js`: September 10 market release, six-language forecast copy and news cards.
- `public/forecast.html`: loads the September 10 release before the existing renderer.
- `public/news.html`: loads the same release to keep both pages consistent.
- `public/sep04-update.js`: removes superseded September 8 cards before inserting the current release.
- `scripts/verify-sep07.cjs`: expanded six-language, SEO and responsive verification.

## Market and month state

- Current applied month: September 2026, Level 21, based on USD 149.29/bbl and 355.46 cents/gallon.
- Forecast target: October 2026; calculation period August 16 through September 15.
- Outlook changed from `flat-to-upward pressure` to `upward pressure dominates; flat remains possible`.
- Cut probability: low. Direction confidence: medium. Exact-stage confidence: low.
- No October international stage or amount is represented as confirmed.
- Search of the nine airline official sites found no October Korea-departure international passenger notice. October domestic notices remain clearly separate.

## Updated indicators

- USD/KRW about 1,342.17; JPY 100 about KRW 872.35. Spot FX is not presented as the period average.
- September 3 Singapore Jet Fuel market reference USD 159.58/bbl; September confirmed calculation average USD 149.29/bbl; October cumulative MOPS remains under compilation.
- Global weekly Jet Fuel USD 171.01/bbl, up 9%.
- Brent about USD 101.61 and WTI about USD 96.54; Brent is described as having crossed USD 100.
- Kpler public AIS preliminary count: Wednesday 7, revised prior day 12, ten-day average 14. It is not described as all-vessel traffic.
- Fujairah total product stocks +56% and middle distillates +31%, treated as a partial cushion rather than normalization.

## News

- Added/updated Brent above USD 100, U.S.–Iran vessel attacks, Hormuz traffic, Fujairah stocks and USD/KRW cards.
- Iranian claims of attacks on 10 ships and the U.S. announcement of attacks on five Iranian tankers are explicitly separated by source.
- Older daily Hormuz and FX cards are replaced instead of accumulated.

## Verification

- Forecast keeps exactly five indicators and the existing visual structure.
- Korean, English, Japanese, Chinese, French and German passed without Korean leakage.
- No `undefined`, page errors, horizontal overflow or missing first-page current card.
- Nine airline official-notice links remain present.
- Canonical URLs, meta descriptions, one H1 and JSON-LD `dateModified` were checked.
- Desktop and mobile screenshots are stored alongside this report.
