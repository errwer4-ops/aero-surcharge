const path = require("path");

let loaded = false;

function loadLocalEnv() {
  if (loaded) return;
  loaded = true;

  try {
    require("dotenv").config({
      path: path.join(process.cwd(), ".env.local"),
      quiet: true,
    });
  } catch (error) {
    // Vercel production uses configured Environment Variables; .env.local is only a local fallback.
  }
}

module.exports = {
  loadLocalEnv,
};
