const { handleResourceRoute } = require("../lib/myrealtrip/server");

function createResponse() {
  return {
    statusCode: 200,
    body: null,
    setHeader() {},
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

async function call(resource, query) {
  const req = {
    method: "GET",
    query,
    headers: {},
    url: `/api/myrealtrip/${resource}?${new URLSearchParams(query).toString()}`,
  };
  const res = createResponse();
  await handleResourceRoute(req, res, resource);
  return res;
}

function summarize(resource, response) {
  const payload = response.body || {};
  return {
    resource,
    httpStatus: response.statusCode,
    success: Boolean(payload.success),
    configured: Boolean(payload.configured),
    callable: Boolean(payload.callable),
    upstreamTest: Boolean(payload.upstreamTest),
    upstreamStatus: payload.status || null,
    message: payload.message || null,
    error: payload.error || null,
    responseTextPreview: payload.responseTextPreview
      ? String(payload.responseTextPreview).replace(/\s+/g, " ").slice(0, 500)
      : null,
    itemCount: Array.isArray(payload.items) ? payload.items.length : null,
    fieldCount: payload.analysis ? payload.analysis.fieldCount : null,
    hasTrackingUrl: Boolean(payload.link && payload.link.trackingUrl),
  };
}

async function main() {
  const statusResults = [];
  for (const resource of ["mylink", "products"]) {
    statusResults.push(summarize(resource, await call(resource, {})));
  }
  console.log(JSON.stringify({ phase: "configuration", results: statusResults }, null, 2));

  const mylink = await call("mylink", {
    call: "1",
    originalUrl: "https://www.myrealtrip.com/",
    subId: "calculator_probe_20260610",
  });
  console.log(JSON.stringify({ phase: "mylink", result: summarize("mylink", mylink) }, null, 2));

  const products = await call("products", { call: "1", limit: "3" });
  console.log(JSON.stringify({ phase: "products", result: summarize("products", products) }, null, 2));

  if (!mylink.body.success || !products.body.success) process.exitCode = 2;
}

main().catch((error) => {
  console.error(JSON.stringify({
    success: false,
    error: error.message,
  }, null, 2));
  process.exitCode = 1;
});
