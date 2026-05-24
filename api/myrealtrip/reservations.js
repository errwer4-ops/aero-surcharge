const { handleResourceRoute } = require("../../lib/myrealtrip/server");

module.exports = function handler(req, res) {
  try {
    return handleResourceRoute(req, res, "reservations");
  } catch (error) {
    return res.status(500).json({
      success: false,
      resource: "reservations",
      message: "reservations route fallback error",
      error: error.message,
      checkedAt: new Date().toISOString(),
    });
  }
};
