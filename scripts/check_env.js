const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const cwd = process.cwd();
const envPath = path.join(cwd, ".env.local");
const envFiles = fs
  .readdirSync(cwd)
  .filter((name) => name.toLowerCase().startsWith(".env.local"))
  .sort();

const exists = fs.existsSync(envPath);
const bytes = exists ? fs.readFileSync(envPath) : Buffer.alloc(0);
const text = bytes.toString("utf8");
const parsed = exists ? dotenv.config({ path: envPath, override: true, quiet: true }) : null;

function preview(value) {
  return value ? value.slice(0, 6) + "..." : null;
}

function hasBom(buffer) {
  return buffer.length >= 3 && buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf;
}

function hasExactAssignment(name) {
  return new RegExp(`^${name}=`, "m").test(text);
}

console.log(`cwd: ${cwd}`);
console.log(`.env.local exists: ${exists}`);
console.log(`.env.local files: ${envFiles.length ? envFiles.join(", ") : "none"}`);
console.log(`.env.local size: ${exists ? bytes.length : 0}`);
console.log(`.env.local has UTF-8 BOM: ${exists ? hasBom(bytes) : false}`);
console.log(`MYREALTRIP_API_KEY string exists: ${text.includes("MYREALTRIP_API_KEY")}`);
console.log(`MYREALTRIP_API_BASE_URL string exists: ${text.includes("MYREALTRIP_API_BASE_URL")}`);
console.log(`MYREALTRIP_API_KEY exact assignment: ${hasExactAssignment("MYREALTRIP_API_KEY")}`);
console.log(`MYREALTRIP_API_BASE_URL exact assignment: ${hasExactAssignment("MYREALTRIP_API_BASE_URL")}`);

if (parsed && parsed.error) {
  console.log(`dotenv error: ${parsed.error.message}`);
} else {
  console.log("dotenv error: none");
}

console.log(`MYREALTRIP_API_KEY loaded: ${Boolean(process.env.MYREALTRIP_API_KEY)}`);
console.log(`MYREALTRIP_API_KEY preview: ${preview(process.env.MYREALTRIP_API_KEY)}`);
console.log(`MYREALTRIP_API_BASE_URL loaded: ${Boolean(process.env.MYREALTRIP_API_BASE_URL)}`);
console.log(
  `MYREALTRIP_API_BASE_URL preview: ${
    process.env.MYREALTRIP_API_BASE_URL ? process.env.MYREALTRIP_API_BASE_URL.slice(0, 30) : null
  }`
);
console.log(
  `MYREALTRIP env keys: ${Object.keys(process.env)
    .filter((key) => key.includes("MYREALTRIP"))
    .sort()
    .join(", ")}`
);
