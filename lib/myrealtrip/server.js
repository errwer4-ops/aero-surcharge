const http = require("http");
const https = require("https");
const { loadLocalEnv } = require("./env");

const ENDPOINT_ENV_BY_RESOURCE = {
  products: "MYREALTRIP_PRODUCTS_ENDPOINT",
  mylink: "MYREALTRIP_MYLINK_ENDPOINT",
  reservations: "MYREALTRIP_RESERVATIONS_ENDPOINT",
  revenues: "MYREALTRIP_REVENUES_ENDPOINT",
};

function getApiKey() {
  loadLocalEnv();
  return (process.env.MYREALTRIP_API_KEY || "").trim();
}

function getBaseUrl() {
  loadLocalEnv();
  return (process.env.MYREALTRIP_API_BASE_URL || "").trim().replace(/\/+$/, "");
}

function getKeyPreview() {
  const apiKey = getApiKey();
  return apiKey ? apiKey.slice(0, 6) + "..." : null;
}

function getResourceConfig(resource) {
  loadLocalEnv();

  const endpointEnv = ENDPOINT_ENV_BY_RESOURCE[resource] || null;
  const endpointPath = endpointEnv ? (process.env[endpointEnv] || "").trim() : "";
  const baseUrl = getBaseUrl();
  const apiKey = getApiKey();

  return {
    resource,
    configured: Boolean(baseUrl && endpointPath && apiKey),
    callable: Boolean(baseUrl && endpointPath && apiKey && isCallableBaseUrl(baseUrl)),
    hasApiKey: Boolean(apiKey),
    hasBaseUrl: Boolean(baseUrl),
    baseUrlConfigured: Boolean(baseUrl),
    endpointConfigured: Boolean(endpointPath),
    endpointEnv,
    keyPreview: getKeyPreview(),
    baseUrlPreview: baseUrl ? baseUrl.slice(0, 30) : null,
    requestUrl: baseUrl && endpointPath ? joinUrl(baseUrl, endpointPath) : null,
    message: getConfigMessage(baseUrl, endpointPath),
  };
}

function isCallableBaseUrl(baseUrl) {
  return /^https?:\/\//i.test(baseUrl);
}

function getConfigMessage(baseUrl, endpointPath) {
  if (!baseUrl) return "MYREALTRIP_API_BASE_URL 또는 endpoint 설정 필요: baseUrl not configured";
  if (!endpointPath) return "MYREALTRIP_API_BASE_URL 또는 endpoint 설정 필요";
  return "configured";
}

function joinUrl(baseUrl, endpointPath) {
  if (/^https?:\/\//i.test(endpointPath)) return endpointPath;
  return baseUrl + "/" + endpointPath.replace(/^\/+/, "");
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
  }

  if (typeof res.status === "function" && typeof res.json === "function") {
    return res.status(statusCode).json(safePayload);
  }

  res.statusCode = statusCode;
  if (typeof res.setHeader === "function") {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
  }
  return res.end(JSON.stringify(safePayload, null, 2));
}

function methodNotAllowed(res) {
  if (typeof res.setHeader === "function") res.setHeader("Allow", "GET");
  return sendJson(res, 405, {
    success: false,
    message: "Method not allowed. Use GET for this test route.",
  });
}

async function handleResourceRoute(req, res, resource) {
  try {
    if (req.method && req.method !== "GET") return methodNotAllowed(res);

    const config = getResourceConfig(resource);

    if (!config.configured) {
      return sendJson(res, 200, buildStatusPayload(resource, config, {
        configured: false,
        message: config.message,
      }));
    }

    if (!shouldCallUpstream(req)) {
      return sendJson(res, 200, buildStatusPayload(resource, config, {
        configured: true,
        upstreamTest: false,
        message: "endpoint 설정 확인 완료. 실제 호출은 ?call=1로 실행합니다.",
      }));
    }

    if (!config.callable) {
      return sendJson(res, 200, buildStatusPayload(resource, config, {
        configured: true,
        callable: false,
        upstreamTest: false,
        message: "MYREALTRIP_API_BASE_URL은 http:// 또는 https:// URL이어야 실제 호출을 수행합니다.",
      }));
    }

    const upstream = await fetchJson(config.requestUrl, {
      headers: {
        Authorization: `Bearer ${getApiKey()}`,
        "X-API-Key": getApiKey(),
        Accept: "application/json",
        "User-Agent": "aero-surcharge-myrealtrip-api-test/1.0",
      },
    });

    return sendJson(res, 200, buildStatusPayload(resource, config, {
      configured: true,
      callable: true,
      upstreamTest: true,
      message: "마이리얼트립 API 실제 호출 완료",
      upstream,
    }));
  } catch (error) {
    const config = getSafeResourceConfig(resource);

    return sendJson(res, 502, buildStatusPayload(resource, config, {
      success: false,
      configured: config.configured,
      upstreamTest: shouldCallUpstream(req),
      message: "마이리얼트립 API 테스트 호출 실패",
      status: error && error.statusCode ? error.statusCode : 502,
      error: error && error.message ? error.message : String(error),
      upstreamUrl: config.requestUrl || null,
      responseText: error && error.responseText ? error.responseText.slice(0, 1200) : null,
    }));
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
      keyPreview: null,
      baseUrlPreview: null,
      requestUrl: null,
      message: "route 설정 확인 중 오류가 발생했습니다.",
    };
  }
}

function shouldCallUpstream(req) {
  try {
    const url = new URL(req.url || "/", "http://localhost");
    return url.searchParams.get("call") === "1";
  } catch (error) {
    return false;
  }
}

function fetchJson(url, options) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const client = parsed.protocol === "http:" ? http : https;
    const req = client.request(
      parsed,
      {
        method: "GET",
        headers: options.headers,
        timeout: 15000,
      },
      (response) => {
        const chunks = [];
        response.on("data", (chunk) => chunks.push(chunk));
        response.on("end", () => {
          const body = Buffer.concat(chunks).toString("utf8");
          const contentType = response.headers["content-type"] || "";
          const parsedBody = parseBody(body, contentType);

          resolve({
            statusCode: response.statusCode,
            ok: response.statusCode >= 200 && response.statusCode < 300,
            contentType,
            data: parsedBody,
            responseText: body.slice(0, 1200),
          });
        });
      }
    );

    req.on("timeout", () => {
      req.destroy(new Error("마이리얼트립 API 테스트 호출 시간이 초과되었습니다."));
    });
    req.on("error", reject);
    req.end();
  });
}

function parseBody(body, contentType) {
  if (!body) return null;
  if (contentType.toLowerCase().includes("application/json")) {
    try {
      return JSON.parse(body);
    } catch (error) {
      return { parseError: error.message, rawText: body.slice(0, 4000) };
    }
  }
  return { rawText: body.slice(0, 4000) };
}

function redactSecrets(value) {
  const apiKey = getApiKey();
  const preview = getKeyPreview();

  if (Array.isArray(value)) return value.map(redactSecrets);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, redactSecrets(item)])
    );
  }
  if (typeof value !== "string" || !apiKey) return value;

  return value.split(apiKey).join(preview || "[redacted]");
}

module.exports = {
  getApiKey,
  getBaseUrl,
  getKeyPreview,
  getResourceConfig,
  handleResourceRoute,
  methodNotAllowed,
  sendJson,
};
