"use strict";

const { buildPlans } = require("../../lib/travel/planner");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "POST만 지원합니다." });
  }

  req.setEncoding("utf8");
  let body = "";
  await new Promise((resolve) => {
    req.on("data", (chunk) => (body += chunk));
    req.on("end", resolve);
  });

  let params;
  try {
    params = JSON.parse(body);
  } catch {
    return res.status(400).json({ success: false, message: "요청 형식이 올바르지 않습니다." });
  }

  const { departureAirport, arrivalAirport, departureDate, returnDate, travelers, budgetKRW, attractions } = params;

  if (!departureAirport || !arrivalAirport || !departureDate || !returnDate || !travelers || !budgetKRW) {
    return res.status(400).json({ success: false, message: "필수 파라미터가 누락됐습니다." });
  }

  try {
    const result = await buildPlans({
      departureAirport,
      arrivalAirport,
      departureDate,
      returnDate,
      travelers: Number(travelers),
      budgetKRW: Number(budgetKRW),
      attractions: Array.isArray(attractions) ? attractions : [],
    });
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
