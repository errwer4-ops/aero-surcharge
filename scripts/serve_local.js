const fs = require("fs");
const http = require("http");
const path = require("path");

const root = path.resolve(__dirname, "..", "public");
const port = Number(process.env.PORT || 4173);
const apiHandlers = {
  "/api/myrealtrip/test": require("../api/myrealtrip/test"),
  "/api/myrealtrip/mylink": require("../api/myrealtrip/mylink"),
  "/api/myrealtrip/products": require("../api/myrealtrip/products"),
  "/api/myrealtrip/reservations": require("../api/myrealtrip/reservations"),
  "/api/myrealtrip/revenues": require("../api/myrealtrip/revenues"),
  "/api/myrealtrip/flights": require("../api/myrealtrip/flights"),
};

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function decorateResponse(res) {
  res.status = function status(code) {
    res.statusCode = code;
    return res;
  };
  res.json = function json(payload) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(payload, null, 2));
  };
}

function buildQuery(url) {
  const query = {};
  url.searchParams.forEach((value, key) => {
    if (query[key] == null) query[key] = value;
    else if (Array.isArray(query[key])) query[key].push(value);
    else query[key] = [query[key], value];
  });
  return query;
}

function resolvePublicFile(urlPath) {
  const cleanPath = decodeURIComponent(urlPath).replace(/^\/+/, "");
  const requested = cleanPath || "index.html";
  const candidates = path.extname(requested)
    ? [requested]
    : [`${requested}.html`, path.join(requested, "index.html")];

  for (const candidate of candidates) {
    const absolute = path.resolve(root, candidate);
    if (!absolute.startsWith(root + path.sep) && absolute !== root) continue;
    if (fs.existsSync(absolute) && fs.statSync(absolute).isFile()) return absolute;
  }
  return null;
}

const server = http.createServer(async (req, res) => {
  decorateResponse(res);
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const apiHandler = apiHandlers[url.pathname];

  if (apiHandler) {
    req.query = buildQuery(url);
    try {
      await apiHandler(req, res);
    } catch (error) {
      if (!res.headersSent) {
        res.status(500).json({ success: false, message: "Local API route failed.", error: error.message });
      }
    }
    return;
  }

  const file = resolvePublicFile(url.pathname);
  if (!file) {
    res.statusCode = 404;
    res.end("Not found");
    return;
  }

  res.setHeader("Content-Type", contentTypes[path.extname(file).toLowerCase()] || "application/octet-stream");
  fs.createReadStream(file).pipe(res);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Local review server: http://127.0.0.1:${port}`);
});
