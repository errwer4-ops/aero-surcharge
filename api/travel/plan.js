"use strict";

const { buildPlans, validateParams } = require("../../lib/travel/planner");
const MAX_BODY_BYTES = 16384;

async function readParams(req) {
  if (req.body !== undefined) {
    if (Buffer.isBuffer(req.body) || typeof req.body === "string") {
      const text = req.body.toString();
      if (Buffer.byteLength(text) > MAX_BODY_BYTES) throw Object.assign(new Error("요청 크기가 너무 큽니다."), { statusCode: 413 });
      return JSON.parse(text);
    }
    return req.body;
  }
  const body = await new Promise((resolve, reject) => {
    let text = "", bytes = 0;
    req.setEncoding("utf8");
    req.on("data", chunk => {
      bytes += Buffer.byteLength(chunk);
      if (bytes > MAX_BODY_BYTES) return reject(Object.assign(new Error("요청 크기가 너무 큽니다."), { statusCode: 413 }));
      text += chunk;
    });
    req.on("end", () => resolve(text));
    req.on("error", reject);
    req.on("aborted", () => reject(new Error("요청이 중단되었습니다.")));
  });
  return JSON.parse(body);
}

module.exports = async function handler(req, res) {
  if (typeof res.setHeader === "function") res.setHeader("Cache-Control", "no-store, max-age=0");
  if (req.method !== "POST") {
    if (typeof res.setHeader === "function") res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "POST만 지원합니다." });
  }

  let params;
  try {
    params = validateParams(await readParams(req));
  } catch (error) {
    return res.status(error.statusCode === 413 ? 413 : 400).json({ success: false,
      message: error.statusCode ? error.message : "요청 형식이 올바르지 않습니다." });
  }

  try {
    const result = await buildPlans(params);
    return res.status(200).json({ success: true, data: result });
  } catch (_) {
    return res.status(502).json({ success: false, message: "여행 정보를 확인하지 못했습니다. 잠시 후 다시 시도해주세요." });
  }
};
