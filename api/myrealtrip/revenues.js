const { handleResourceRoute } = require("../../lib/myrealtrip/server");

module.exports = function handler(req, res) {
  try {
    return handleResourceRoute(req, res, "revenues");
  } catch (error) {
    return res.status(500).json({
      success: false,
      resource: "revenues",
      message: "revenues route fallback error",
      error: error.message,
      checkedAt: new Date().toISOString(),
    });
  }
};
