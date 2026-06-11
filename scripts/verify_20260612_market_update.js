const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const assert = (value, message) => {
  if (!value) throw new Error(message);
};

const shared = read("public/_shared.js");
const news = read("public/news.html");
const forecast = read("public/forecast.html");
const vercel = JSON.parse(read("vercel.json"));

assert(shared.includes("AERO_MARKET_NUMBERS_20260612"), "June 12 market numbers are missing");
assert(shared.includes("AERO_NEWS_CARDS_20260612"), "June 12 news cards are missing");
assert(shared.includes("window.AERO_NEWS_LATEST=window.AERO_MARKET_BRIEF_20260612"), "June 12 brief is not latest");
assert(news.indexOf("AERO_NEWS_CARDS_20260612") < news.indexOf("AERO_NEWS_CARDS_20260610"), "June 12 cards are not prepended");
assert(news.includes("2026-06-12T06:00:00+09:00"), "News modified time is stale");
assert(forecast.includes("2026-06-12T06:00:00+09:00"), "Forecast modified time is stale");
assert(news.includes("#faq-20260612"), "News FAQ id is stale");
assert(forecast.includes("#faq-20260612"), "Forecast FAQ id is stale");
assert(forecast.includes("동결: 60~65%"), "Latest freeze probability is missing");
assert(forecast.includes("1단계 인상: 25~30%"), "Latest one-step probability is missing");
assert(forecast.includes("브렌트유 $90.38/bbl") && forecast.includes("WTI $87.71/bbl"), "Exact oil values are missing");
assert(forecast.includes("대한항공 유류할증료") && forecast.includes("티웨이 유류할증료"), "Airline SEO entities are missing");
assert(shared.includes("AERO_NEWS_CARDS_20260610") && shared.includes("AERO_NEWS_CARDS_20260608"), "News history was removed");
assert(news.includes("AERO_NEWS_CARDS_20260524"), "Older news history was removed");
assert(!fs.existsSync(path.join(root, "public", "fuel-surcharge-forecast.html")), "Old forecast file still exists");
assert(fs.existsSync(path.join(root, "public", "forecast.html")), "forecast.html is missing");
assert(!shared.includes("fuel-surcharge-forecast.html"), "Old forecast link remains in shared JS");
assert(!news.includes("fuel-surcharge-forecast.html"), "Old forecast link remains in news");

const redirects = vercel.redirects || [];
for (const source of [
  "/fuel-surcharge-2026-06-forecast",
  "/fuel-surcharge-2026-06-forecast.html",
  "/fuel-surcharge-forecast",
  "/fuel-surcharge-forecast.html",
]) {
  assert(redirects.some((item) => item.source === source && item.destination === "/forecast.html" && item.permanent), `Redirect missing: ${source}`);
}

for (const [name, html] of [["news", news], ["forecast", forecast]]) {
  const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)]
    .map((match) => match[1])
    .filter((code) => code.trim() && !code.trim().startsWith("{"));
  scripts.forEach((code, index) => new vm.Script(code, { filename: `${name}:${index}` }));

  const jsonBlocks = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  jsonBlocks.forEach((match) => JSON.parse(match[1]));
}

console.log("2026-06-12 market update verification passed");
