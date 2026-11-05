"use strict";

const https = require("https");
const { loadLocalEnv } = require("../myrealtrip/env");

// ── 설정 ────────────────────────────────────────────────────────────────────

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
const FUEL_INCLUDED_IN_FLIGHT = false;   // API 연동 시 true로 변경

// ── 유류할증료 ────────────────────────────────────────────────────────────────

function kstDate(now = new Date()) {
  return new Date(now.getTime() + 9 * 3600000).toISOString().slice(0, 10);
}

function validDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + "T00:00:00Z");
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function validateParams(params, now = new Date()) {
  function invalid(message) { throw Object.assign(new Error(message), { statusCode: 400 }); }
  if (!params || typeof params !== "object" || Array.isArray(params)) invalid("요청은 여행 조건을 담은 JSON 객체여야 합니다.");
  const { departureAirport, arrivalAirport, departureDate, returnDate, travelers, budgetKRW } = params;
  const attractions = params.attractions === undefined ? [] : params.attractions;
  if (!["ICN", "GMP"].includes(departureAirport) || !["KIX", "NRT", "HND", "FUK"].includes(arrivalAirport)) invalid("지원하는 출발·도착 공항을 선택해주세요.");
  if (!validDate(departureDate) || !validDate(returnDate)) invalid("출발일과 귀국일은 실제 존재하는 날짜여야 합니다.");
  const nights = (Date.parse(returnDate) - Date.parse(departureDate)) / 86400000;
  if (departureDate < kstDate(now)) invalid("출발일은 오늘 이후여야 합니다.");
  if (nights < 1 || nights > 30) invalid("여행 기간은 1박부터 30박까지 지원합니다.");
  if (!Number.isInteger(travelers) || travelers < 1 || travelers > 9) invalid("인원은 1명부터 9명까지 입력해주세요.");
  if (!Number.isSafeInteger(budgetKRW) || budgetKRW < 100000 || budgetKRW > 100000000) invalid("총 예산은 10만원부터 1억원까지 입력해주세요.");
  if (!Array.isArray(attractions) || attractions.length > 20 || attractions.some(item => typeof item !== "string" || !item.trim() || item.trim().length > 80)) invalid("관광지는 각 80자 이내, 최대 20개까지 입력해주세요.");
  return { departureAirport, arrivalAirport, departureDate, returnDate, travelers, budgetKRW,
    attractions: [...new Set(attractions.map(item => item.trim()))] };
}

function loadFuelSurcharge(now = new Date()) {
  // Neither a selected carrier nor a reviewed Japan-origin return leg exists.
  return { surchargeKRW: null, source: null, updatedAt: null, status: "unconfirmed",
    ticketingMonth: kstDate(now).slice(0, 7), basis: "ticketing_month",
    reason: "airline_and_return_fare_unconfirmed",
    message: "유류할증료는 여행 출발월이 아닌 발권월 기준입니다. 항공사와 귀국편 요율을 확인해야 하므로 왕복 금액은 부분합에 포함하지 않았습니다." };
}

// ── 마이리얼트립 API 호출 ────────────────────────────────────────────────────

function mrtPost(path, body) {
  return new Promise((resolve, reject) => {
    if (!getApiKey()) return reject(new Error("Partner API is not configured."));
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
          if (res.statusCode < 200 || res.statusCode >= 300 || json.result?.status !== 200) {
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
    if (!item || typeof item.salePrice !== "number" || !Number.isFinite(item.salePrice) || item.salePrice <= 0) throw new Error("empty or invalid price");
    return {
      itemId: item.itemId,
      name: item.itemName,
      starRating: item.starRating || 3,
      reviewScore: item.reviewScore || "-",
      pricePerNight: item.salePrice,
      bookingUrl: safeBookingUrl(item.productUrl),
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
    if (!item || typeof item.salePrice !== "number" || !Number.isFinite(item.salePrice) || item.salePrice < 0) return null;
    return {
      gid: item.gid,
      name: item.itemName,
      price: item.salePrice,
      bookingUrl: safeBookingUrl(item.productUrl),
      source: "live",
    };
  } catch {
    return null;
  }
}

// ── 비용 계산 ─────────────────────────────────────────────────────────────────

function safeBookingUrl(value) {
  try { const url = new URL(value); return url.protocol === "https:" && !url.username && !url.password && /(^|\.)myrealtrip\.com$/i.test(url.hostname) ? url.href : null; }
  catch { return null; }
}

function calcPlan({ city, planType, nights, days, travelers, hotel, attractions }) {
  const flightUnit = FLIGHT_PRICE[city][planType];
  const flights     = flightUnit * travelers;
  // 항공권 API 연동 시 유류할증료가 이미 포함되므로 별도 계상 안 함
  const fuel        = null;
  const hotels      = hotel.pricePerNight * nights * Math.ceil(travelers / 2);
  const knownTicketsSubtotal = attractions.filter(a => Number.isFinite(a.unitPrice))
    .reduce((sum, attraction) => sum + attraction.unitPrice * travelers, 0);
  const tickets     = attractions.every(a => Number.isFinite(a.unitPrice)) ? knownTicketsSubtotal : null;
  const transport   = TRANSPORT_BY_CITY[city] * days * travelers;
  const meals       = MEAL_BY_PLAN[planType] * days * travelers;
  const subtotal    = flights + hotels + knownTicketsSubtotal + transport + meals;
  return { flights, fuel, hotels, tickets, knownTicketsSubtotal, transport, meals, contingency: null, total: null, subtotal };
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
      ) || { name: input, aliases: [], unitPrice: null }
    );
  });
}

// ── 메인 플랜 생성 함수 ───────────────────────────────────────────────────────

async function buildPlans(params, { now = new Date() } = {}) {
  const { departureAirport, arrivalAirport, departureDate, returnDate, travelers, budgetKRW, attractions: attractionNames } = validateParams(params, now);
  const city = AIRPORT_TO_CITY[arrivalAirport];
  if (!city) throw new Error(`지원하지 않는 도착 공항입니다: ${arrivalAirport}`);

  const d1 = new Date(departureDate);
  const d2 = new Date(returnDate);
  const nights = Math.round((d2 - d1) / 86400000);
  const days   = nights + 1;

  const resolvedAttractions = resolveAttractions(city, attractionNames || []);
  const fuelSurcharge = loadFuelSurcharge(now);

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

    return {
      type: planType,
      name: PLAN_NAMES[planType] + " 추천 플랜",
      totalCostKRW: costs.total,
      displayTotal: "확인 필요",
      estimatedSubtotalKRW: costs.subtotal,
      displaySubtotal: fmtKRW(costs.subtotal),
      remainingBudgetKRW: null,
      displayRemaining: "확인 필요",
      budgetStatus: "unconfirmed",
      confidenceScore: null,
      estimateNote: "부분합에는 항공권·식비·교통·입장료의 기존 예산 가정이 포함됩니다. 숙소 API 미확인 시 숙소도 추정가입니다. 실제 판매 총액이 아니며 유류할증료·미확인 입장료·예비비는 제외됩니다.",
      fuelIncludedInFlight: FUEL_INCLUDED_IN_FLIGHT,
      costBreakdown: {
        flights:      costs.flights,
        fuelSurcharge: costs.fuel,
        hotels:       costs.hotels,
        tickets:      costs.tickets,
        knownTicketsSubtotal: costs.knownTicketsSubtotal,
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
        totalKRW: Number.isFinite(a.unitPrice) ? a.unitPrice * travelers : null,
      })),
      fuelSurcharge: {
        perTravelerKRW: fuelSurcharge.surchargeKRW,
        totalKRW: null,
        source: fuelSurcharge.source,
        updatedAt: fuelSurcharge.updatedAt,
        status: fuelSurcharge.status,
        ticketingMonth: fuelSurcharge.ticketingMonth,
        basis: fuelSurcharge.basis,
        reason: fuelSurcharge.reason,
        message: fuelSurcharge.message,
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

module.exports = { buildPlans, validateParams };
