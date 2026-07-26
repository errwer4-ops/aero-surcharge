"use strict";

const https = require("https");
const fs = require("fs");
const path = require("path");
const { loadLocalEnv } = require("../myrealtrip/env");

// ── 설정 ────────────────────────────────────────────────────────────────────

const MRT_BASE = "https://partner-ext-api.myrealtrip.com";

function getApiKey() {
  loadLocalEnv();
  return (process.env.MYREALTRIP_API_KEY || "").trim();
}

// 공항 → 도시 매핑
const AIRPORT_TO_CITY = {
  KIX: "osaka", ITM: "osaka",
  NRT: "tokyo", HND: "tokyo",
  FUK: "fukuoka",
};

const CITY_NAMES = { osaka: "오사카", tokyo: "도쿄", fukuoka: "후쿠오카" };

// 숙소 검색용 regionId (accommodation/region-autocomplete 결과)
const CITY_REGION_IDS = { osaka: 2225, tokyo: 2955, fukuoka: 193957 };

// ICN → 각 공항 거리(마일)
const ICN_DISTANCE_MILES = { KIX: 800, ITM: 780, NRT: 820, HND: 820, FUK: 300 };

// 플랜별 숙소 성급 필터
const HOTEL_CONFIG = {
  budget:       { sort: "price_asc" },
  balanced:     { starRating: "threestar,fourstar", sort: "review_score_desc" },
  satisfaction: { starRating: "fourstar,fivestar",  sort: "review_score_desc" },
};

// 플랜별 식비(1인 1일)
const MEAL_BY_PLAN = { budget: 30000, balanced: 50000, satisfaction: 100000 };

// 도시별 현지 교통비(1인 1일)
const TRANSPORT_BY_CITY = { osaka: 12000, tokyo: 15000, fukuoka: 10000 };

// 항공권 추정가 (1인 왕복, 유류할증료 미포함)
// 나중에 마이리얼트립 항공권 API 연동 시:
//   - API 가격은 유류할증료가 포함된 판매가이므로
//   - FLIGHT_SOURCE를 "api"로 변경하고 FUEL_INCLUDED_IN_FLIGHT를 true로 설정하면
//     유류할증료 항목이 자동으로 0원 처리됩니다
const FLIGHT_PRICE = {
  osaka:   { budget: 288000, balanced: 320000, satisfaction: 432000 },
  tokyo:   { budget: 340000, balanced: 380000, satisfaction: 480000 },
  fukuoka: { budget: 200000, balanced: 230000, satisfaction: 300000 },
};
const FLIGHT_SOURCE = "estimate";        // "estimate" | "api"
const FUEL_INCLUDED_IN_FLIGHT = false;   // API 연동 시 true로 변경

// ── 유류할증료 ────────────────────────────────────────────────────────────────

function loadFuelSurcharge(arrivalAirport, departureDate) {
  const feedPath = path.resolve(__dirname, "../../public/data/official_surcharge_feed.json");
  const fallback = { surchargeKRW: 0, source: "mock:unavailable", updatedAt: "-" };
  try {
    const feed = JSON.parse(fs.readFileSync(feedPath, "utf-8"));
    const distanceMiles = ICN_DISTANCE_MILES[arrivalAirport] || 800;
    const supported = (feed.airlines || []).filter(
      (a) => a.supported && Array.isArray(a.items) && a.items.length > 0
    );
    const airline =
      supported.find((a) => a.confidence === "fresh") ||
      supported.find((a) => a.confidence === "stale");
    if (!airline) return fallback;

    const item =
      airline.items.find((it) => {
        const [min, max] = it.distanceRange.split("-").map(Number);
        return distanceMiles >= min && distanceMiles < max;
      }) || airline.items[airline.items.length - 1];

    return {
      surchargeKRW: item.current,
      source: `official:${airline.iataCode}:${feed.meta?.source || "feed"}`,
      updatedAt: (feed.meta?.lastUpdated || "").slice(0, 10),
    };
  } catch {
    return fallback;
  }
}

// ── 마이리얼트립 API 호출 ────────────────────────────────────────────────────

function mrtPost(path, body) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const options = {
      hostname: "partner-ext-api.myrealtrip.com",
      path,
      method: "POST",
      headers: {
        Authorization: `Bearer ${getApiKey()}`,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(payload),
      },
    };
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          if (json.result?.status !== 200) {
            reject(new Error(json.result?.message || "API error"));
          } else {
            resolve(json.data);
          }
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on("error", reject);
    req.setTimeout(8000, () => { req.destroy(); reject(new Error("timeout")); });
    req.write(payload);
    req.end();
  });
}

// ── 숙소 검색 ────────────────────────────────────────────────────────────────

async function fetchHotel(city, planType, checkIn, checkOut, travelers) {
  const regionId = CITY_REGION_IDS[city];
  const cfg = HOTEL_CONFIG[planType];
  try {
    const data = await mrtPost("/v1/products/accommodation/search", {
      regionId,
      checkIn,
      checkOut,
      adultCount: travelers,
      ...(cfg.starRating ? { starRating: cfg.starRating } : {}),
      size: 5,
    });
    const item = (data.items || [])[0];
    if (!item) throw new Error("empty");
    return {
      itemId: item.itemId,
      name: item.itemName,
      starRating: item.starRating || 3,
      reviewScore: item.reviewScore || "-",
      pricePerNight: item.salePrice,
      bookingUrl: item.productUrl,
      source: "live",
    };
  } catch {
    const fallbacks = {
      osaka:   { budget: 70000, balanced: 100000, satisfaction: 160000 },
      tokyo:   { budget: 90000, balanced: 130000, satisfaction: 200000 },
      fukuoka: { budget: 60000, balanced: 85000,  satisfaction: 130000 },
    };
    return {
      itemId: null,
      name: `${CITY_NAMES[city]} 호텔 (추정가)`,
      starRating: planType === "budget" ? 3 : planType === "balanced" ? 4 : 5,
      reviewScore: "-",
      pricePerNight: fallbacks[city][planType],
      bookingUrl: "https://www.myrealtrip.com",
      source: "fallback",
    };
  }
}

// ── 투어/티켓 검색 ────────────────────────────────────────────────────────────

async function fetchActivity(keyword) {
  try {
    const data = await mrtPost("/v1/products/tna/search", { keyword, size: 1 });
    const item = (data.items || [])[0];
    if (!item) return null;
    return {
      gid: item.gid,
      name: item.itemName,
      price: item.salePrice,
      bookingUrl: item.productUrl,
      source: "live",
    };
  } catch {
    return null;
  }
}

// ── 비용 계산 ─────────────────────────────────────────────────────────────────

function calcPlan({ city, planType, nights, days, travelers, hotel, fuelSurcharge, attractions }) {
  const flightUnit = FLIGHT_PRICE[city][planType];
  const flights     = flightUnit * travelers;
  // 항공권 API 연동 시 유류할증료가 이미 포함되므로 별도 계상 안 함
  const fuel        = FUEL_INCLUDED_IN_FLIGHT ? 0 : fuelSurcharge.surchargeKRW * travelers;
  const hotels      = hotel.pricePerNight * nights * Math.ceil(travelers / 2);
  const tickets     = attractions.reduce((s, a) => s + (a.unitPrice || 0) * travelers, 0);
  const transport   = TRANSPORT_BY_CITY[city] * days * travelers;
  const meals       = MEAL_BY_PLAN[planType] * days * travelers;
  const subtotal    = flights + fuel + hotels + tickets + transport + meals;
  const contingency = Math.round(subtotal * 0.05 / 1000) * 1000;
  const total       = subtotal + contingency;
  return { flights, fuel, hotels, tickets, transport, meals, contingency, total };
}

function confidenceScore({ total, budget, attractionCoverage }) {
  let score = 0;
  // 예산 충족 (40점)
  if (total <= budget) score += 40;
  else if (total <= budget * 1.1) score += 25;
  else if (total <= budget * 1.2) score += 10;
  // 관광지 커버리지 (20점)
  score += Math.round(attractionCoverage * 20);
  // 숨은 비용 포함 (15점)
  score += 15;
  // 유류할증료 포함 (10점)
  score += 10;
  // 노선 효율 (10점) — 고정
  score += 8;
  // 스타일 적합도 (5점) — 고정
  score += 5;
  return Math.min(100, score);
}

function fmtKRW(n) {
  const man = Math.round(Math.abs(n) / 10000);
  return (n < 0 ? "-약 " : "약 ") + man.toLocaleString("ko-KR") + "만원";
}

// ── 관광지 목록 (mock 가격, 실제 티켓은 MRT API 상품 링크로) ─────────────────

const ATTRACTIONS = {
  osaka: [
    { name: "유니버설 스튜디오 재팬", aliases: ["USJ", "유니버설"], unitPrice: 89000 },
    { name: "오사카성",               aliases: ["오사카 성"],         unitPrice: 6000  },
    { name: "도톤보리",               aliases: ["도톤호리"],          unitPrice: 0     },
    { name: "난바",                   aliases: ["나바"],              unitPrice: 0     },
    { name: "오사카 수족관 카이유칸",  aliases: ["카이유칸"],          unitPrice: 22000 },
    { name: "덴노지 동물원",          aliases: ["덴노지"],            unitPrice: 13000 },
  ],
  tokyo: [
    { name: "도쿄 디즈니랜드",        aliases: ["디즈니랜드", "디즈니"], unitPrice: 94000 },
    { name: "시부야 스카이",          aliases: ["시부야스카이"],        unitPrice: 22000 },
    { name: "아사쿠사",               aliases: ["아사쿠사 사원"],       unitPrice: 0     },
    { name: "도쿄 스카이트리",        aliases: ["스카이트리"],          unitPrice: 23000 },
    { name: "신주쿠 교엔",            aliases: ["신주쿠 공원"],         unitPrice: 3000  },
    { name: "하라주쿠",               aliases: [],                     unitPrice: 0     },
  ],
  fukuoka: [
    { name: "후쿠오카 타워",          aliases: ["타워"],               unitPrice: 8000  },
    { name: "오호리 공원",            aliases: ["오호리"],             unitPrice: 0     },
    { name: "다자이후 텐만구",        aliases: ["다자이후"],           unitPrice: 0     },
    { name: "캐널시티",               aliases: ["캐널 시티"],          unitPrice: 0     },
  ],
};

function resolveAttractions(city, names) {
  const list = ATTRACTIONS[city] || [];
  return names.map((input) => {
    const key = input.trim().toLowerCase();
    return (
      list.find((a) =>
        [a.name, ...a.aliases].some(
          (c) => c.toLowerCase().includes(key) || key.includes(c.toLowerCase())
        )
      ) || { name: input, aliases: [], unitPrice: 0 }
    );
  });
}

// ── 메인 플랜 생성 함수 ───────────────────────────────────────────────────────

async function buildPlans({ departureAirport, arrivalAirport, departureDate, returnDate, travelers, budgetKRW, attractions: attractionNames }) {
  const city = AIRPORT_TO_CITY[arrivalAirport];
  if (!city) throw new Error(`지원하지 않는 도착 공항입니다: ${arrivalAirport}`);

  const d1 = new Date(departureDate);
  const d2 = new Date(returnDate);
  const nights = Math.round((d2 - d1) / 86400000);
  const days   = nights + 1;

  const resolvedAttractions = resolveAttractions(city, attractionNames || []);
  const fuelSurcharge = loadFuelSurcharge(arrivalAirport, departureDate);
  const coverage = attractionNames.length === 0 ? 1 : resolvedAttractions.length / attractionNames.length;

  const PLAN_TYPES = ["budget", "balanced", "satisfaction"];
  const PLAN_NAMES = { budget: "가성비형", balanced: "균형형", satisfaction: "만족도 우선형" };

  // 숙소 3개 + 관광지 액티비티 병렬 fetch
  const [hotels, activityResults] = await Promise.all([
    Promise.all(PLAN_TYPES.map((t) => fetchHotel(city, t, departureDate, returnDate, travelers))),
    Promise.all(resolvedAttractions.map((a) => fetchActivity(a.name))),
  ]);

  const plans = PLAN_TYPES.map((planType, i) => {
    const hotel = hotels[i];
    const costs = calcPlan({ city, planType, nights, days, travelers, hotel, fuelSurcharge, attractions: resolvedAttractions });
    const score = confidenceScore({ total: costs.total, budget: budgetKRW, attractionCoverage: coverage });
    const remaining = budgetKRW - costs.total;

    return {
      type: planType,
      name: PLAN_NAMES[planType] + " 추천 플랜",
      totalCostKRW: costs.total,
      displayTotal: fmtKRW(costs.total),
      remainingBudgetKRW: remaining,
      displayRemaining: fmtKRW(remaining),
      budgetStatus: costs.total <= budgetKRW ? "within_budget" : costs.total <= budgetKRW * 1.1 ? "near_limit" : "over_budget",
      confidenceScore: score,
      fuelIncludedInFlight: FUEL_INCLUDED_IN_FLIGHT,
      costBreakdown: {
        flights:      costs.flights,
        fuelSurcharge: costs.fuel,
        hotels:       costs.hotels,
        tickets:      costs.tickets,
        transport:    costs.transport,
        meals:        costs.meals,
        contingency:  costs.contingency,
      },
      hotel: {
        name:         hotel.name,
        starRating:   hotel.starRating,
        reviewScore:  hotel.reviewScore,
        pricePerNight: hotel.pricePerNight,
        bookingUrl:   hotel.bookingUrl,
        source:       hotel.source,
      },
      activities: activityResults
        .map((act, idx) => act ? {
          attractionName: resolvedAttractions[idx].name,
          productName: act.name,
          price: act.price,
          bookingUrl: act.bookingUrl,
          source: act.source,
        } : null)
        .filter(Boolean),
      attractionCosts: resolvedAttractions.map((a) => ({
        name: a.name,
        unitPriceKRW: a.unitPrice,
        totalKRW: a.unitPrice * travelers,
      })),
      fuelSurcharge: {
        perTravelerKRW: fuelSurcharge.surchargeKRW,
        totalKRW: fuelSurcharge.surchargeKRW * travelers,
        source: fuelSurcharge.source,
        updatedAt: fuelSurcharge.updatedAt,
      },
    };
  });

  return {
    city: CITY_NAMES[city],
    nights,
    days,
    travelers,
    budgetKRW,
    displayBudget: fmtKRW(budgetKRW),
    plans,
  };
}

module.exports = { buildPlans };
