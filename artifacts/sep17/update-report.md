# 2026-09-17 06:40 KST update

## Confirmed October, early November

- September Level 21 remains in effect through September 30. October Level 23 applies from October 1, up two levels.
- October calculation window: August 16–September 15. Singapore Jet Fuel/MOPS average: USD 158.57/bbl, 377.54 cents/gal, up USD 9.28 (about 6.2%) from the September average of USD 149.29/bbl.
- October average USD/KRW: about 1,370.95. Current spot about 1,377.63 is a November input, not an October recalculation.
- Korean Air examples: Tokyo/Beijing KRW 66,000 to 65,800; London/Paris/LA KRW 325,500 to 322,000. The lower average FX more than offsets the USD surcharge rise for these routes.
- November calculation window: September 16–October 15. Global weekly Jet Fuel USD 181.46/bbl (+6.1%) is a separate indicator, not Singapore MOPS. No November stage has been assigned.
- Brent USD 105.83, WTI USD 102.43. Oman Sohar STS is treated as a partial supply buffer, not an East-West Pipeline repair.
- Public Kpler AIS commodity-vessel count: Hormuz four vs ten-day average 18, VLCC zero, LNG zero. Bab el-Mandeb 22 vs previous 24. Neither count is presented as all shipping.

## Official airline material

- Korean Air: supplied official screenshot confirms October KRW 49,000–362,600, including both lower-KRW examples.
- Asiana: supplied official PDF confirms publication of an October Korea-departure international notice. The screenshot truncates the October amount column, so route amounts were not transcribed.
- Jin Air: supplied official PDF confirms October international notice and distance bands including USD 32, 46 and 74.
- Air Busan: supplied official PDF identifies notice `4407` and USD 37, 66, 78 and 90. The link now points to that notice rather than the general notice list.
- Tway, Jeju, Eastar, Air Seoul and Air Premia: October international notices were not supplied or verified; September official links remain explicitly marked as September references, not October confirmations.

## Code and verification

- `public/market-sep17.js`: localized release data, eight new news cards, official statuses and URLs, FAQ and SEO text.
- `public/sep04-update.js`: supports release-specific official rows/URLs and a separate October/November overview while keeping the existing five-indicator layout.
- `public/forecast.html`, `public/news.html`: load the new release with a cache-busting version.
- `public/october-graph-summary.js`, `public/fuel-surcharge-graph.html`: add a small September/October comparison above the existing April–September airline graph, without inventing missing October airline series.
- `scripts/verify-sep17.cjs`: validates forecast and news in six languages and the graph comparison in its existing four supported languages. Desktop/mobile, canonical, JSON-LD dateModified, five forecast indicators, eight current cards, four October official links, no `undefined`, no console errors and no horizontal overflow passed.

## Scope note

- The existing airline graph remains an April–September archive until all October airline notices can be entered as complete official series. Its new top comparison shows confirmed stage, MOPS and average FX only.
