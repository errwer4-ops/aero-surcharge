const { loadLocalEnv } = require("../../lib/myrealtrip/env");

module.exports = function handler(req, res) {
  try {
    loadLocalEnv();

    if (req.method && req.method !== "GET") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed. Use GET for this test route.",
      });
    }

    const apiKey = process.env.MYREALTRIP_API_KEY || null;
    const baseUrl = process.env.MYREALTRIP_API_BASE_URL || null;

    return res.status(200).json({
      success: true,
      hasApiKey: Boolean(apiKey),
      hasBaseUrl: Boolean(baseUrl),
      checkedAt: new Date().toISOString(),
      message: "MyRealTrip server environment check complete.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
