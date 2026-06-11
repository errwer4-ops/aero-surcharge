const crypto = require("crypto");
const http = require("http");
const https = require("https");
const { loadLocalEnv } = require("./env");

const ENDPOINT_ENV_BY_RESOURCE = {
  products: "MYREALTRIP_PRODUCTS_ENDPOINT",
  mylink: "MYREALTRIP_MYLINK_ENDPOINT",
  reservations: "MYREALTRIP_RESERVATIONS_ENDPOINT",
  revenues: "MYREALTRIP_REVENUES_ENDPOINT",
};

const ADMIN_RESOURCES = new Set(["reservations", "revenues"]);
const MYREALTRIP_HOST_PATTERN = /(^|\.)myrealtrip\.com$/i;
const SENSITIVE_QUERY_KEYS = new Set(["key", "apiKey", "token", "authorization"]);

function getApiKey() {
  loadLocalEnv();
  return (process.env.MYREALTRIP_API_KEY || "").trim();
}

function getBaseUrl() {
  loadLocalEnv();
  return (process.env.MYREALTRIP_API_BASE_URL || "").trim().replace(/\/+$/, "");
}

function getResourceConfig(resource) {
  loadLocalEnv();

  const endpointEnv = ENDPOINT_ENV_BY_RESOURCE[resource] || null;
  const endpointPath = endpointEnv ? (process.env[endpointEnv] || "").trim() : "";
  const baseUrl = getBaseUrl();
  const apiKey = getApiKey();
  const requestUrl = baseUrl && endpointPath ? joinUrl(baseUrl, endpointPath) : "";

  return {
    resource,
    configured: Boolean(baseUrl && endpointPath && apiKey),
    callable: Boolean(requestUrl && apiKey && /^https?:\/\//i.test(requestUrl)),
    hasApiKey: Boolean(apiKey),
    hasBaseUrl: Boolean(baseUrl),
    baseUrlConfigured: Boolean(baseUrl),
    endpointConfigured: Boolean(endpointPath),
    endpointEnv,
    requestUrl,
    message: getConfigMessage(baseUrl, endpointPath, apiKey),
  };
}

function getConfigMessage(baseUrl, endpointPath, apiKey) {
  if (!baseUrl) return "MYREALTRIP_API_BASE_URL 설정이 필요합니다.";
  if (!endpointPath) return "해당 endpoint 환경변수 설정이 필요합니다.";
  if (!apiKey) return "MYREALTRIP_API_KEY 설정이 필요합니다.";
  return "endpoint 설정 확인 완료. 실제 호출은 ?call=1로 실행합니다.";
}

function joinUrl(baseUrl, endpointPath) {
  if (/^https?:\/\//i.test(endpointPath)) return endpointPath;
  return `${baseUrl}/${endpointPath.replace(/^\/+/, "")}`;
}

function first(value) {
  return Array.isArray(value) ? value[0] : value;
}

function getQuery(req) {
  const query = { ...(req.query || {}) };
  try {
    const url = new URL(req.url || "/", "http://localhost");
    url.searchParams.forEach((value, key) => {
      if (query[key] == null) query[key] = value;
    });
  } catch (error) {
    // Vercel normally supplies req.query; URL parsing is a local-test fallback.
  }
  return query;
}

function shouldCallUpstream(req) {
  return String(first(getQuery(req).call) || "") === "1";
}

function buildStatusPayload(resource, config, overrides = {}) {
  return {
    success: true,
    resource,
    configured: config.configured,
    callable: config.callable,
    upstreamTest: false,
    message: config.message,
    hasApiKey: config.hasApiKey,
    hasBaseUrl: config.hasBaseUrl,
    baseUrlConfigured: config.baseUrlConfigured,
    endpointConfigured: config.endpointConfigured,
    endpointEnv: config.endpointEnv,
    checkedAt: new Date().toISOString(),
    ...overrides,
  };
}

function sendJson(res, statusCode, payload) {
  const safePayload = redactSecrets(payload || {});

  if (typeof res.setHeader === "function") {
    res.setHeader("Cache-Control", "no-store, max-age=0");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
  }

  if (typeof res.status === "function" && typeof res.json === "function") {
    return res.status(statusCode).json(safePayload);
  }

  res.statusCode = statusCode;
  return res.end(JSON.stringify(safePayload, null, 2));
}

function methodNotAllowed(res) {
  if (typeof res.setHeader === "function") res.setHeader("Allow", "GET");
  return sendJson(res, 405, {
    success: false,
    message: "Method not allowed. Use GET.",
    checkedAt: new Date().toISOString(),
  });
}

function readHeader(req, name) {
  if (!req || !req.headers) return "";
  const direct = req.headers[name] || req.headers[name.toLowerCase()];
  return String(Array.isArray(direct) ? direct[0] : direct || "").trim();
}

function safeEqual(left, right) {
  const a = Buffer.from(String(left || ""));
  const b = Buffer.from(String(right || ""));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function isAdminAuthorized(req) {
  loadLocalEnv();
  const expected = (process.env.MYREALTRIP_ADMIN_TOKEN || "").trim();
  if (!expected) return { ok: false, configured: false };

  const authorization = readHeader(req, "authorization");
  const bearer = authorization.replace(/^Bearer\s+/i, "");
  const supplied = readHeader(req, "x-admin-token") || bearer;
  return { ok: safeEqual(supplied, expected), configured: true };
}

function requireAdmin(req, res, resource) {
  if (!ADMIN_RESOURCES.has(resource)) return false;
  const auth = isAdminAuthorized(req);

  if (!auth.configured) {
    sendJson(res, 503, {
      success: false,
      resource,
      upstreamTest: false,
      error: "Admin authentication is not configured",
      message: "MYREALTRIP_ADMIN_TOKEN 설정이 필요합니다.",
      checkedAt: new Date().toISOString(),
    });
    return true;
  }

  if (!auth.ok) {
    sendJson(res, 401, {
      success: false,
      resource,
      upstreamTest: false,
      error: "Unauthorized",
      message: "관리자 인증이 필요한 API입니다.",
      checkedAt: new Date().toISOString(),
    });
    return true;
  }

  return false;
}

function validateMyLinkTarget(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && MYREALTRIP_HOST_PATTERN.test(url.hostname);
  } catch (error) {
    return false;
  }
}

function sanitizeSubId(value) {
  return String(value || "aero_surcharge")
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .slice(0, 80);
}

function buildUpstreamRequest(resource, config, query) {
  const headers = {
    Authorization: `Bearer ${getApiKey()}`,
    "X-API-Key": getApiKey(),
    Accept: "application/json",
    "User-Agent": "aero-surcharge-myrealtrip/1.0",
  };

  if (resource === "mylink") {
    const originalUrl = String(first(query.originalUrl) || "").trim();
    if (!validateMyLinkTarget(originalUrl)) {
      const error = new Error("originalUrl must be an HTTPS myrealtrip.com URL.");
      error.statusCode = 400;
      throw error;
    }

    const body = {
      originalUrl,
      targetUrl: originalUrl,
      url: originalUrl,
      subId: sanitizeSubId(first(query.subId)),
    };
    const productId = String(first(query.productId) || "").trim();
    const campaignId = String(first(query.campaignId) || "").trim();
    if (productId) body.productId = productId.slice(0, 100);
    if (campaignId) body.campaignId = campaignId.slice(0, 100);

    const method = (process.env.MYREALTRIP_MYLINK_METHOD || "POST").trim().toUpperCase();
    if (method === "GET") {
      const url = new URL(config.requestUrl);
      Object.entries(body).forEach(([key, value]) => url.searchParams.set(key, value));
      return { url: url.toString(), method, headers };
    }
    return { url: config.requestUrl, method, headers, body };
  }

  const url = new URL(config.requestUrl);
  Object.entries(query).forEach(([key, rawValue]) => {
    if (key === "call" || key === "adminToken" || SENSITIVE_QUERY_KEYS.has(key)) return;
    const value = first(rawValue);
    if (value != null && String(value).trim()) url.searchParams.set(key, String(value).slice(0, 300));
  });

  return { url: url.toString(), method: "GET", headers };
}

function findFirstValue(value, candidateKeys) {
  if (!value || typeof value !== "object") return null;
  if (Array.isArray(value)) {
    for (const item of value) {
      const match = findFirstValue(item, candidateKeys);
      if (match != null) return match;
    }
    return null;
  }

  for (const [key, item] of Object.entries(value)) {
    if (candidateKeys.includes(key.toLowerCase()) && item != null && typeof item !== "object") {
      return item;
    }
  }
  for (const item of Object.values(value)) {
    const match = findFirstValue(item, candidateKeys);
    if (match != null) return match;
  }
  return null;
}

function findFirstArray(value) {
  if (Array.isArray(value)) return value;
  if (!value || typeof value !== "object") return [];
  for (const key of ["products", "items", "results", "data", "list"]) {
    if (Array.isArray(value[key])) return value[key];
    if (value[key] && typeof value[key] === "object") {
      const nested = findFirstArray(value[key]);
      if (nested.length) return nested;
    }
  }
  return [];
}

function normalizeMyLink(payload) {
  const trackingUrl = findFirstValue(payload, [
    "deeplink",
    "trackingurl",
    "affiliateurl",
    "shorturl",
    "mylink",
    "url",
  ]);
  return {
    trackingUrl: typeof trackingUrl === "string" ? trackingUrl : null,
    mylinkId: findFirstValue(payload, ["mylinkid"]),
    campaignId: findFirstValue(payload, ["campaignid"]),
    subId: findFirstValue(payload, ["subid"]),
    productId: findFirstValue(payload, ["productid"]),
  };
}

function normalizeProduct(item, index) {
  const priceValue = findFirstValue(item, ["price", "saleprice", "amount", "totalprice"]);
  return {
    id: findFirstValue(item, ["productid", "id", "gid"]) || `product-${index + 1}`,
    title: findFirstValue(item, ["title", "name", "productname"]),
    category: findFirstValue(item, ["category", "categoryname", "type"]),
    country: findFirstValue(item, ["country", "countryname"]),
    city: findFirstValue(item, ["city", "cityname", "destination"]),
    price: Number.isFinite(Number(priceValue)) ? Number(priceValue) : priceValue,
    currency: findFirstValue(item, ["currency", "currencycode"]),
    imageUrl: findFirstValue(item, ["imageurl", "thumbnail", "thumbnailurl", "image"]),
    productUrl: findFirstValue(item, ["producturl", "deeplink", "url"]),
  };
}

function collectFieldPaths(value, prefix = "", result = new Set(), depth = 0) {
  if (depth > 5 || value == null) return result;
  if (Array.isArray(value)) {
    value.slice(0, 3).forEach((item) => collectFieldPaths(item, `${prefix}[]`, result, depth + 1));
    return result;
  }
  if (typeof value !== "object") return result;

  Object.entries(value).forEach(([key, item]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    result.add(path);
    collectFieldPaths(item, path, result, depth + 1);
  });
  return result;
}

function analyzePayload(resource, payload) {
  const paths = Array.from(collectFieldPaths(payload));
  const lowerPaths = paths.map((path) => path.toLowerCase());
  const categories = [
    {
      id: "fuelSurcharge",
      label: "유류할증료 분리 가능성",
      terms: ["fuelsurcharge", "fuel_surcharge", "surcharge", "유류할증료"],
    },
    {
      id: "airfare",
      label: "항공권 가격 구조 확인 필요",
      terms: ["fare", "basefare", "tax", "airline", "origin", "destination", "departure"],
    },
    {
      id: "totalPrice",
      label: "총액 기반 제휴 연결 가능",
      terms: ["totalprice", "saleprice", "price", "amount", "currency"],
    },
    {
      id: "tracking",
      label: "예약/수익 추적 가능",
      terms: ["reservation", "revenue", "commission", "campaignid", "subid", "status"],
    },
    {
      id: "deeplink",
      label: "deeplink 생성 가능성",
      terms: ["deeplink", "trackingurl", "affiliateurl", "producturl", "url"],
    },
  ];

  return {
    actualData: true,
    resource,
    fieldCount: paths.length,
    fieldPaths: paths.slice(0, 120),
    categories: categories.map((category) => {
      const matches = paths.filter((path, index) =>
        category.terms.some((term) => lowerPaths[index].includes(term))
      );
      return {
        id: category.id,
        label: category.label,
        matches,
        matchCount: matches.length,
        explanation: matches.length
          ? `${matches.length}개 관련 필드를 찾았습니다.`
          : "응답 필드명에서 관련 키워드를 찾지 못했습니다. 실제 값의 의미와 API 문서를 추가 확인해야 합니다.",
      };
    }),
  };
}

function formatSuccessData(resource, payload) {
  if (resource === "mylink") {
    const link = normalizeMyLink(payload);
    if (!link.trackingUrl) {
      const error = new Error("MyLink 응답에서 deeplink 또는 trackingUrl을 찾지 못했습니다.");
      error.statusCode = 502;
      error.responseText = JSON.stringify(payload).slice(0, 1200);
      throw error;
    }
    return { link, analysis: analyzePayload(resource, payload) };
  }

  if (resource === "products") {
    const items = findFirstArray(payload).slice(0, 20).map(normalizeProduct);
    return { items, analysis: analyzePayload(resource, payload) };
  }

  return { data: payload, analysis: analyzePayload(resource, payload) };
}

async function handleResourceRoute(req, res, resource) {
  try {
    if (req.method && req.method !== "GET") return methodNotAllowed(res);
    if (requireAdmin(req, res, resource)) return;

    const config = getResourceConfig(resource);
    if (!config.configured || !shouldCallUpstream(req)) {
      return sendJson(res, 200, buildStatusPayload(resource, config, {
        configured: config.configured,
        upstreamTest: false,
      }));
    }

    if (!config.callable) {
      return sendJson(res, 200, buildStatusPayload(resource, config, {
        callable: false,
        message: "API URL이 호출 가능한 http 또는 https 주소가 아닙니다.",
      }));
    }

    const query = getQuery(req);
    const request = buildUpstreamRequest(resource, config, query);
    const upstream = await fetchJson(request.url, request);

    if (!upstream.ok) {
      return sendJson(res, 502, {
        success: false,
        resource,
        configured: true,
        callable: true,
        upstreamTest: true,
        status: upstream.statusCode,
        error: upstream.statusMessage || "Upstream request failed",
        message: "MyRealTrip API 호출 실패",
        upstreamUrl: maskUrl(request.url),
        responseTextPreview: upstream.responseText.slice(0, 1200),
        checkedAt: new Date().toISOString(),
      });
    }

    const result = formatSuccessData(resource, upstream.data);
    return sendJson(res, 200, {
      success: true,
      resource,
      configured: true,
      callable: true,
      upstreamTest: true,
      message: "MyRealTrip API 실제 호출 완료",
      ...result,
      checkedAt: new Date().toISOString(),
    });
  } catch (error) {
    const status = error && error.statusCode === 400 ? 400 : 502;
    const config = getSafeResourceConfig(resource);
    return sendJson(res, status, {
      success: false,
      resource,
      configured: config.configured,
      callable: config.callable,
      upstreamTest: shouldCallUpstream(req),
      status: error && error.statusCode ? error.statusCode : status,
      error: error && error.message ? error.message : String(error),
      message: status === 400 ? "MyRealTrip API 요청값 오류" : "MyRealTrip API 호출 실패",
      upstreamUrl: maskUrl(config.requestUrl),
      responseTextPreview: error && error.responseText ? error.responseText.slice(0, 1200) : null,
      checkedAt: new Date().toISOString(),
    });
  }
}

function getSafeResourceConfig(resource) {
  try {
    return getResourceConfig(resource);
  } catch (error) {
    return {
      resource,
      configured: false,
      callable: false,
      hasApiKey: false,
      hasBaseUrl: false,
      baseUrlConfigured: false,
      endpointConfigured: false,
      endpointEnv: ENDPOINT_ENV_BY_RESOURCE[resource] || null,
      requestUrl: "",
      message: "route 설정 확인 중 오류가 발생했습니다.",
    };
  }
}

function fetchJson(url, options = {}) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const client = parsed.protocol === "http:" ? http : https;
    const body = options.body ? JSON.stringify(options.body) : null;
    const headers = {
      ...(options.headers || {}),
      ...(body
        ? {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(body),
          }
        : {}),
    };
    const upstreamReq = client.request(
      parsed,
      {
        method: options.method || "GET",
        headers,
        timeout: 15000,
      },
      (response) => {
        const chunks = [];
        response.on("data", (chunk) => chunks.push(chunk));
        response.on("end", () => {
          const responseText = Buffer.concat(chunks).toString("utf8");
          const contentType = response.headers["content-type"] || "";
          resolve({
            statusCode: response.statusCode || 500,
            statusMessage: response.statusMessage || "",
            ok: Boolean(response.statusCode && response.statusCode >= 200 && response.statusCode < 300),
            contentType,
            data: parseBody(responseText, contentType),
            responseText,
          });
        });
      }
    );

    upstreamReq.on("timeout", () => {
      upstreamReq.destroy(new Error("MyRealTrip API 호출 시간이 초과되었습니다."));
    });
    upstreamReq.on("error", reject);
    if (body) upstreamReq.write(body);
    upstreamReq.end();
  });
}

function parseBody(body, contentType) {
  if (!body) return null;
  if (contentType.toLowerCase().includes("application/json") || /^[\[{]/.test(body.trim())) {
    try {
      return JSON.parse(body);
    } catch (error) {
      return { parseError: error.message, rawText: body.slice(0, 4000) };
    }
  }
  return { rawText: body.slice(0, 4000) };
}

function maskUrl(value) {
  if (!value) return null;
  try {
    const url = new URL(value);
    url.searchParams.forEach((item, key) => {
      if (SENSITIVE_QUERY_KEYS.has(key)) url.searchParams.set(key, "[redacted]");
    });
    return url.toString();
  } catch (error) {
    return String(value).slice(0, 200);
  }
}

function redactSecrets(value) {
  const secrets = [
    getApiKey(),
    (process.env.MYREALTRIP_ADMIN_TOKEN || "").trim(),
  ].filter(Boolean);

  if (Array.isArray(value)) return value.map(redactSecrets);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, redactSecrets(item)])
    );
  }
  if (typeof value !== "string") return value;

  return secrets.reduce(
    (text, secret) => text.split(secret).join("[redacted]"),
    value
  );
}

module.exports = {
  analyzePayload,
  getApiKey,
  getBaseUrl,
  getResourceConfig,
  handleResourceRoute,
  methodNotAllowed,
  normalizeMyLink,
  sendJson,
};
