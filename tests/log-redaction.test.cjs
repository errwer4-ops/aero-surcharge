'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const vm = require('node:vm');
const { EventEmitter } = require('node:events');
const { redactForLog } = require('../lib/log-redaction.cjs');
const { saveReport } = require('../scripts/run_pipeline');
const { saveDebugArtifacts } = require('../lib/collector/utils/debug');

test('diagnostics redact URL credentials, queries and nested headers without changing public facts', () => {
  const env = { EXCHANGERATE_API_KEY: 'fixture-current-fx-key', OTHER_API_KEY: 'fixture key/encoded' };
  const record = {
    observedAt: '2026-11-05T09:00:00+09:00', amount: 1341.5, source: 'https://official.example/news?id=42&month=202611',
    errors: ['HTTP 403: https://v6.exchangerate-api.com/v6/fixture-historical-key/latest/USD',
      'failed https://fixture-user:fixture-password@api.example/path?API_KEY=fixture-query-key&month=202611',
      'Authorization: Bearer fixture-bearer\nCookie: session=fixture-cookie; mode=private',
      '{"Authorization":"Basic fixture-basic","access_token":"fixture-access"}',
      'key in message: fixture-current-fx-key; encoded: fixture%20key%2Fencoded'],
    headers: { Authorization: 'Bearer fixture-header', 'X-API-Key': 'fixture-x-key', 'Set-Cookie': ['fixture-set-cookie'], Accept: 'application/json' },
  };
  const original = structuredClone(record), safe = redactForLog(record, env), serialized = JSON.stringify(safe);
  assert(!serialized.includes('fixture-') && !serialized.includes('fixture%20'), 'credential fixture remains in log');
  assert.equal(safe.amount, record.amount); assert.equal(safe.observedAt, record.observedAt);
  assert.equal(safe.source, record.source); assert.equal(safe.headers.Accept, 'application/json');
  assert(safe.errors[1].includes('month=202611'));
  assert.deepEqual(record, original, 'logging must not mutate actual request data');
});

test('pipeline reports persist redacted diagnostics while retaining observations', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'aero-safe-log-'));
  const report = { runAt: '2026-11-05T01:00:00Z', amount: 1341.5,
    errors: ['HTTP 403: https://v6.exchangerate-api.com/v6/fixture-report-key/latest/USD'],
    request: { headers: { Authorization: 'Bearer fixture-report-auth' } } };
  const file = saveReport(report, dir), stored = fs.readFileSync(file, 'utf8');
  assert(!stored.includes('fixture-'), 'pipeline persisted an unredacted credential');
  assert.equal(JSON.parse(stored).amount, report.amount);
  assert(report.errors[0].includes('fixture-report-key'), 'logging must not mutate the source object');
});

test('collector HTML and metadata redact final URL and redirect chain', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'aero-debug-log-')), previous = process.cwd();
  let saved;
  try {
    process.chdir(dir);
    saved = saveDebugArtifacts('QA', 'direct', 'http_403', {
      html: '<html><body>공식 안내. Authorization: Bearer fixture-html-auth</body></html>', status: 403,
      finalUrl: 'https://api.example/path?api_key=fixture-debug-key&month=202611',
      redirectChain: ['https://api.example/start?token=fixture-debug-token'],
    });
  } finally { process.chdir(previous); }
  for (const file of [saved.htmlPath, saved.metaPath]) assert(!fs.readFileSync(file, 'utf8').includes('fixture-'), 'debug artifact leaked a credential');
  const meta = JSON.parse(fs.readFileSync(saved.metaPath)); assert.equal(meta.status, 403);
  assert(meta.finalUrl.includes('month=202611'));
});

test('discontinued FX provider makes no request even with an enabled flag and leftover key', async () => {
  const messages = [], code = fs.readFileSync(path.join(__dirname, '../lib/market/index.js'), 'utf8');
  let calls = 0;
  const fakeHttps = { get(url, options, callback) {
    calls++; const req = new EventEmitter(); req.destroy = () => {};
    process.nextTick(() => callback({ statusCode: 403, resume() {} })); return req;
  } };
  const context = { module: { exports: {} }, process: { env: { USE_LIVE_MARKET_DATA: 'true', EXCHANGERATE_API_KEY: 'fixture-fx-key' } },
    console: { log: value => messages.push(value), warn: value => messages.push(value) },
    require: name => name === 'https' ? fakeHttps : name === '../log-redaction.cjs' ? { redactForLog } : require(name) };
  vm.runInNewContext(code, context);
  const result = await context.module.exports.getMarketData();
  assert.equal(calls, 0); assert.equal(result.source, 'mock_fallback');
  assert(!JSON.stringify([result, messages]).includes('fixture-fx-key'), 'FX error leaked provider credential');
  assert.equal(result.fxStatus, 'disabled'); assert.equal(result.fxConfigured, false);
  assert.equal(result.fxProvider, null); assert.match(result.fxError, /사용 중단/); assert.match(result.fxError, /mock/);
  const mock = await context.module.exports.getMarketData({useMock:true});
  assert.equal(mock.source, 'mock'); assert.equal(calls, 0);
});

test('public pipeline archive contains no credential-bearing provider URL', () => {
  const archive = fs.readFileSync(path.join(__dirname, '../public/data/pipeline_log.json'), 'utf8');
  const paths = [...archive.matchAll(/https:\/\/v6\.exchangerate-api\.com\/v6\/([^/\s"']+)\/latest\/USD/g)];
  assert.equal(paths.length, 3); assert(paths.every(match => match[1] === '[redacted]'), 'archive contains an unredacted provider credential');
  assert.doesNotThrow(() => JSON.parse(archive));
});
