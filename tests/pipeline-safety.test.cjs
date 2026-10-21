'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
const { fixtures } = require('./helpers/data-fixtures.cjs');
const { assertWritableMode, mergeFeed, buildProposal, publishFeed } = require('../scripts/run_pipeline');
const { validateAll } = require('../lib/validation');

test('mock/skip modes cannot write, including an installed API key', () => {
  assert.throws(() => assertWritableMode({ mock: true, dryRun: false }));
  assert.throws(() => assertWritableMode({ skipLlm: true, dryRun: false }));
  assert.doesNotThrow(() => assertWritableMode({ mock: true, dryRun: true }));
});
test('invalid candidate and failed collection produce no proposal', () => {
  const f = fixtures(); f.parsed.routes[0].amount = 0;
  assert.equal(buildProposal(f.previous, [f.parsed], [f.collector]).proposed, null);
  f.collector.source = 'fallback';
  assert.equal(buildProposal(f.previous, [f.parsed], [f.collector]).passed, false);
});
test('partial batches and unvalidated raw overrides cannot publish', () => {
  const f = fixtures();
  assert.equal(buildProposal(f.previous, [], [f.collector]).passed, false);
  const invalid = validateAll([{ ...f.parsed, usedMock: true }], f.previous, [f.collector]);
  const merged = mergeFeed(f.previous, invalid, null, { LJ: { items: [{ current: 0 }] } });
  assert.deepEqual(merged, f.previous);
});
test('valid publication uses metadata, keeps backup and forecast input untouched', () => {
  const f = fixtures(), proposal = buildProposal(f.previous, [f.parsed], [f.collector]);
  assert.equal(proposal.passed, true);
  const item = proposal.proposed.airlines[0].items[0];
  assert.equal(item.current, 22); assert.equal(item.metadata.validationStatus, 'passed'); assert.equal(item.metadata.publishedAt, null);
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'aero-publish-')), feedPath = path.join(dir, 'feed.json');
  const original = JSON.stringify(f.previous); fs.writeFileSync(feedPath, original);
  const forecastPath = path.join(dir, 'forecast.json'); fs.writeFileSync(forecastPath, '{"verified":"unchanged"}');
  assert.equal(publishFeed(feedPath, proposal.proposed, original, { reportDir: path.join(dir, 'reports') }), true);
  assert.equal(JSON.parse(fs.readFileSync(feedPath)).airlines[0].items[0].current, 22);
  const backups = fs.readdirSync(path.join(dir, 'reports')); assert.equal(backups.length, 1);
  assert.equal(fs.readFileSync(path.join(dir, 'reports', backups[0]), 'utf8'), original);
  assert.equal(fs.readFileSync(forecastPath, 'utf8'), '{"verified":"unchanged"}');
});
test('publishing revalidates and preserves original file on failure or concurrent edits', () => {
  const f = fixtures(), proposal = buildProposal(f.previous, [f.parsed], [f.collector]);
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'aero-hold-')), feedPath = path.join(dir, 'feed.json');
  const original = JSON.stringify(f.previous); fs.writeFileSync(feedPath, original);
  const invalid = structuredClone(proposal.proposed); invalid.airlines[0].items[0].current = -1;
  assert.throws(() => publishFeed(feedPath, invalid, original, { reportDir: dir }));
  assert.equal(fs.readFileSync(feedPath, 'utf8'), original);
  fs.writeFileSync(feedPath, original + '\n');
  assert.throws(() => publishFeed(feedPath, proposal.proposed, original, { reportDir: dir }), /변경됨/);
  assert.equal(fs.readFileSync(feedPath, 'utf8'), original + '\n');
});
test('actual mock dry-run exits nonzero for rejected data and changes no public JSON', () => {
  const root = path.resolve(__dirname, '..'), data = path.join(root, 'public', 'data');
  const digest = () => fs.readdirSync(data).filter(name => name.endsWith('.json')).map(name => [name,
    crypto.createHash('sha256').update(fs.readFileSync(path.join(data, name))).digest('hex')]);
  const before = digest();
  const run = spawnSync(process.execPath, ['scripts/run_pipeline.js', '--mock', '--dry-run', '--only', 'LJ'], {
    cwd: root, env: { ...process.env, ANTHROPIC_API_KEY: '', SKIP_LLM: '' }, encoding: 'utf8', timeout: 15000,
  });
  assert.equal(run.status, 1, run.stderr); assert.match(run.stdout, /파일 변경 없음/);
  assert.deepEqual(digest(), before);
});
