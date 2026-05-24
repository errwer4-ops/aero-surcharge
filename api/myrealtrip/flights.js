const http = require("http");
const https = require("https");
const { loadLocalEnv } = require("../../lib/myrealtrip/env");

function sendJson(res, statusCode, payload) {
  res.status(statusCode).json({
    ...payload,
    checkedAt: new Date().toISOString(),
  });
}

function first(value) {
  return Array.isArray(value) ? value[0] : value;
}

function isValidAirport(code) {
  return /^[A-Z]{3}$/.test(String(code || ""));
}

function isValidDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || ""));
}

function getConfig() {
  loadLocalEnv();
  const endpoint = (process.env.MYREALTRIP_FLIGHTS_ENDPOINT || "").trim();
  const baseUrl = (process.env.MYREALTRIP_API_BASE_URL || "").trim().replace(/\/+$/, "");
  const apiKey = (process.env.MYREALTRIP_API_KEY || "").trim();
  const requestUrl = endpoint && /^https?:\/\//i.test(endpoint)
    ? endpoint
    : endpoint && baseUrl
      ? baseUrl + "/" + endpoint.replace(/^\/+/, "")
      : "";

  return {
    configured: Boolean(endpoint),
    callable: /^https?:\/\//i.test(requestUrl),
    endpoint,
    requestUrl,
    apiKey,
  };
}

function requestJson(url, headers) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const client = parsed.protocol === "http:" ? http : https;
    const req = client.request(parsed, {
      method: "GET",
      headers,
      timeout: 15000,
    }, (response) => {
      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () => {
        const raw = Buffer.concat(chunks).toString("utf8");
        let data = null;
        try {
          data = raw ? JSON.parse(raw) : null;
        } catch (error) {
          data = { rawText: raw.slice(0, 1200), parseError: error.message };
        }
        resolve({
          ok: response.statusCode >= 200 && response.statusCode < 300,
          statusCode: response.statusCode,
          data,
        });
      });
    });

    req.on("timeout", () => req.destroy(new Error("MyRealTrip flight request timed out.")));
    req.on("error", reject);
    req.end();
  });
}

function normalizeItems(payload) {
  const root = payload && payload.result ? payload.result : payload;
  const items = Array.isArray(root && root.items) ? root.items : [];

  return items.slice(0, 5).map((item) => {
    const leg = item.legs && item.legs[0] ? item.legs[0] : {};
    return {
      id: item.id || null,
      airlineCode: item.airline && item.airline.code ? item.airline.code : null,
      airlineName: item.airline && item.airline.name ? item.airline.name : null,
      origin: leg.origin || (item.route && item.route.origin) || null,
      destination: leg.destination || (item.route && item.route.destination) || null,
      departDate: leg.departDate || null,
      departTime: leg.departTime || null,
      arriveDate: leg.arriveDate || null,
      arriveTime: leg.arriveTime || null,
      stops: item.travelInfo && Number.isFinite(item.travelInfo.stops) ? item.travelInfo.stops : leg.stops,
      isDirect: item.travelInfo ? item.travelInfo.isDirect : leg.isDirect,
      durationMinutes: item.travelInfo ? item.travelInfo.totalDurationMinutes : leg.durationMinutes,
      price: item.price || null,
      reservationUrl: item.reservationUrl || item.deeplink || null,
    };
  });
}

module.exports = async function handler(req, res) {
  try {
    if (req.method && req.method !== "GET") {
      return sendJson(res, 405, { success: false, message: "Method not allowed. Use GET." });
    }

    const origin = String(first(req.query.origin) || "").trim().toUpperCase();
    const destination = String(first(req.query.destination) || "").trim().toUpperCase();
    const departDate = String(first(req.query.departDate) || "").trim();
    const tripType = String(first(req.query.tripType) || "ONE_WAY").trim().toUpperCase();
    const maxResults = Math.max(1, Math.min(5, parseInt(first(req.query.maxResults), 10) || 3));
    const config = getConfig();

    if (String(first(req.query.status) || "") === "1") {
      return sendJson(res, 200, {
        success: true,
        configured: config.configured,
        callable: config.callable,
        code: config.configured && config.callable ? "flight_endpoint_ready" : "flight_endpoint_not_configured",
        message: config.configured && config.callable
          ? "MyRealTrip flight search endpoint is configured."
          : "MyRealTrip flight search endpoint is not configured.",
      });
    }

    if (!isValidAirport(origin) || !isValidAirport(destination) || !isValidDate(departDate)) {
      return sendJson(res, 400, {
        success: false,
        message: "origin, destination, and departDate are required. Use IATA codes and YYYY-MM-DD.",
      });
    }

    if (!config.configured || !config.callable) {
      return sendJson(res, 200, {
        success: false,
        code: "flight_endpoint_not_configured",
        configured: config.configured,
        message: "MyRealTrip flight search endpoint is not configured. Set MYREALTRIP_FLIGHTS_ENDPOINT with a flight-search capable partner endpoint.",
        items: [],
      });
    }

    const url = new URL(config.requestUrl);
    url.searchParams.set("origin", origin);
    url.searchParams.set("destination", destination);
    url.searchParams.set("departDate", departDate);
    url.searchParams.set("tripType", tripType === "ROUND_TRIP" ? "ROUND_TRIP" : "ONE_WAY");
    url.searchParams.set("maxResults", String(maxResults));

    const upstream = await requestJson(url.toString(), {
      Accept: "application/json",
      "User-Agent": "aero-surcharge-flight-context/1.0",
      ...(config.apiKey ? { Authorization: `Bearer ${config.apiKey}`, "X-API-Key": config.apiKey } : {}),
    });

    if (!upstream.ok) {
      return sendJson(res, 502, {
        success: false,
        message: "MyRealTrip flight endpoint returned an error.",
        statusCode: upstream.statusCode,
        items: [],
      });
    }

    return sendJson(res, 200, {
      success: true,
      route: `${origin}-${destination}`,
      departDate,
      items: normalizeItems(upstream.data).slice(0, maxResults),
    });
  } catch (error) {
    return sendJson(res, 500, {
      success: false,
      message: "Flight context route failed.",
      error: error.message,
      items: [],
    });
  }
};
