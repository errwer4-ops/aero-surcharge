const assert = require("assert");
const fs = require("fs");
const http = require("http");
const path = require("path");
const { handleResourceRoute } = require("../lib/myrealtrip/server");

function createMockResponse() {
  return {
    headers: {},
    statusCode: 200,
    body: null,
    setHeader(name, value) {
      this.headers[String(name).toLowerCase()] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return payload;
    },
    end(text) {
      this.body = JSON.parse(text);
      return this.body;
    },
  };
}

async function callRoute(resource, query = {}, headers = {}) {
  const params = new URLSearchParams(query);
  const req = {
    method: "GET",
    query,
    headers,
    url: `/api/myrealtrip/${resource}?${params.toString()}`,
  };
  const res = createMockResponse();
  await handleResourceRoute(req, res, resource);
  return res;
}

function readRequestBody(req) {
  return new Promise((resolve) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      const text = Buffer.concat(chunks).toString("utf8");
      resolve(text ? JSON.parse(text) : null);
    });
  });
}

async function main() {
  const previous = {};
  [
    "MYREALTRIP_API_BASE_URL",
    "MYREALTRIP_API_KEY",
    "MYREALTRIP_PRODUCTS_ENDPOINT",
    "MYREALTRIP_MYLINK_ENDPOINT",
    "MYREALTRIP_RESERVATIONS_ENDPOINT",
    "MYREALTRIP_REVENUES_ENDPOINT",
    "MYREALTRIP_ADMIN_TOKEN",
    "MYREALTRIP_MYLINK_METHOD",
  ].forEach((key) => {
    previous[key] = process.env[key];
  });

  let capturedMyLinkBody = null;
  const upstream = http.createServer(async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    if (req.url.startsWith("/mylink")) {
      capturedMyLinkBody = await readRequestBody(req);
      res.end(JSON.stringify({
        result: {
          mylink: "https://www.myrealtrip.com/affiliate/mock-link",
          mylinkId: 12345,
          campaignId: "campaign-1",
          subId: capturedMyLinkBody && capturedMyLinkBody.subId,
        },
      }));
      return;
    }
    if (req.url.startsWith("/products")) {
      res.end(JSON.stringify({
        data: [{
          productId: "P100",
          title: "Tokyo activity",
          category: "activity",
          city: "Tokyo",
          price: 42000,
          currency: "KRW",
          thumbnail: "https://example.com/image.jpg",
          productUrl: "https://www.myrealtrip.com/offers/P100",
          airline: "KE",
          totalPrice: 42000,
        }],
      }));
      return;
    }
    if (req.url.startsWith("/revenues")) {
      res.end(JSON.stringify({
        data: [{ revenueId: "R1", amount: 1200, commission: 1200, subId: "calculator_ICN_NRT" }],
      }));
      return;
    }
    if (req.url.startsWith("/reservations")) {
      res.end(JSON.stringify({
        data: [{ reservationId: "B1", status: "confirmed", amount: 120000 }],
      }));
      return;
    }
    if (req.url.startsWith("/unauthorized")) {
      res.statusCode = 401;
      res.end(JSON.stringify({ error: "Unauthorized", apiKey: "test-secret-key" }));
      return;
    }
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Not found" }));
  });

  await new Promise((resolve) => upstream.listen(0, "127.0.0.1", resolve));
  const address = upstream.address();

  try {
    process.env.MYREALTRIP_API_BASE_URL = `http://127.0.0.1:${address.port}`;
    process.env.MYREALTRIP_API_KEY = "test-secret-key";
    process.env.MYREALTRIP_PRODUCTS_ENDPOINT = "/products";
    process.env.MYREALTRIP_MYLINK_ENDPOINT = "/mylink";
    process.env.MYREALTRIP_RESERVATIONS_ENDPOINT = "/reservations";
    process.env.MYREALTRIP_REVENUES_ENDPOINT = "/revenues";
    process.env.MYREALTRIP_ADMIN_TOKEN = "admin-test-token";
    process.env.MYREALTRIP_MYLINK_METHOD = "POST";

    const status = await callRoute("mylink");
    assert.equal(status.statusCode, 200);
    assert.equal(status.body.success, true);
    assert.equal(status.body.upstreamTest, false);
    assert.equal(Object.prototype.hasOwnProperty.call(status.body, "keyPreview"), false);

    const mylink = await callRoute("mylink", {
      call: "1",
      originalUrl: "https://www.myrealtrip.com/",
      subId: "calculator ICN/NRT",
    });
    assert.equal(mylink.statusCode, 200);
    assert.equal(mylink.body.success, true);
    assert.equal(mylink.body.link.trackingUrl, "https://www.myrealtrip.com/affiliate/mock-link");
    assert.equal(mylink.body.link.mylinkId, 12345);
    assert.equal(capturedMyLinkBody.subId, "calculator_ICN_NRT");
    assert.equal(capturedMyLinkBody.targetUrl, "https://www.myrealtrip.com/");
    assert.equal(JSON.stringify(mylink.body).includes("test-secret-key"), false);

    const invalidTarget = await callRoute("mylink", {
      call: "1",
      originalUrl: "https://example.com/",
      subId: "invalid",
    });
    assert.equal(invalidTarget.statusCode, 400);
    assert.equal(invalidTarget.body.success, false);

    const products = await callRoute("products", { call: "1", city: "Tokyo" });
    assert.equal(products.statusCode, 200);
    assert.equal(products.body.items[0].id, "P100");
    assert.equal(products.body.items[0].price, 42000);
    assert(products.body.analysis.categories.some((item) => item.id === "totalPrice" && item.matchCount > 0));

    const adminDenied = await callRoute("revenues", { call: "1" });
    assert.equal(adminDenied.statusCode, 401);
    assert.equal(adminDenied.body.success, false);

    const adminAllowed = await callRoute(
      "revenues",
      { call: "1" },
      { authorization: "Bearer admin-test-token" }
    );
    assert.equal(adminAllowed.statusCode, 200);
    assert.equal(adminAllowed.body.success, true);
    assert(Array.isArray(adminAllowed.body.data.data));

    process.env.MYREALTRIP_PRODUCTS_ENDPOINT = "/unauthorized";
    const upstreamFailure = await callRoute("products", { call: "1" });
    assert.equal(upstreamFailure.statusCode, 502);
    assert.equal(upstreamFailure.body.success, false);
    assert.equal(upstreamFailure.body.status, 401);
    assert.equal(Object.prototype.hasOwnProperty.call(upstreamFailure.body, "responseTextPreview"), true);
    assert.equal(JSON.stringify(upstreamFailure.body).includes("test-secret-key"), false);

    const calculator = fs.readFileSync(
      path.join(__dirname, "..", "public", "fuel-surcharge-calculator.html"),
      "utf8"
    );
    assert(calculator.includes("/api/myrealtrip/mylink?call=1"));
    assert(calculator.includes("'calculator_' + getRouteDep(dest) + '_' + getRouteArr(dest)"));
    assert(calculator.includes("liveFareFallbackUrl"));

    const adminPage = fs.readFileSync(
      path.join(__dirname, "..", "public", "myrealtrip-api-test.html"),
      "utf8"
    );
    assert(adminPage.includes('content="noindex,nofollow,noarchive"'));
    assert(adminPage.includes("설정 확인 응답이라 분석 가능한 실제 API 데이터가 없습니다."));
    assert.equal(adminPage.includes("MYREALTRIP_API_KEY"), false);

    console.log("MyRealTrip integration verification passed.");
  } finally {
    await new Promise((resolve) => upstream.close(resolve));
    Object.entries(previous).forEach(([key, value]) => {
      if (value == null) delete process.env[key];
      else process.env[key] = value;
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
