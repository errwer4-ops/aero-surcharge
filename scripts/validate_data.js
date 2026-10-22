#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { validateFeed, normalizeRecord, detectSpike, checkSourceLinks } = require('../lib/validation');
const { reconcileRecord } = require('../lib/validation/provenance');
const root = path.resolve(__dirname, '..');
const relativeFeed = 'public/data/official_surcharge_feed.json';

function validateChanges(previous, next) {
  const result = validateFeed(next);
  if (!previous) return result;
  for (const oldAirline of previous.airlines || []) {
    if (!next.airlines?.some(a => a.iataCode === oldAirline.iataCode)) result.errors.push(`${oldAirline.iataCode}: 항공사 삭제는 별도 검토 필요`);
  }
  for (const airline of next.airlines || []) {
    const before = previous.airlines?.find(a => a.iataCode === airline.iataCode);
    if (JSON.stringify(before) === JSON.stringify(airline)) continue;
    const strict = validateFeed({ meta: {}, airlines: [airline] }, { strict: true });
    result.errors.push(...strict.errors);
    const oldCount = before?.items?.filter(item => item.current != null).length || 0;
    if ((airline.items?.length || 0) < oldCount) result.errors.push(`${airline.iataCode}: 구간 수 감소 검토 필요`);
    if (before?.currentPeriod && airline.currentPeriod < before.currentPeriod) result.errors.push(`${airline.iataCode}: 적용월 과거로 변경`);
    for (const item of airline.items || []) {
      const record = normalizeRecord(item, airline), spike = detectSpike(airline.iataCode, record, previous);
      const source = reconcileRecord(record);
      if (source.status !== 'verified') result.errors.push(`${airline.iataCode}: 공식 원문 대조 미완료 (${source.reason})`);
      if (spike) result.errors.push(`${airline.iataCode}: ${spike}`);
      if (record.oneWayAmount === 0) result.errors.push(`${airline.iataCode}: 신규 0원 공시 검토 필요`);
    }
  }
  result.passed = result.errors.length === 0;
  return result;
}

async function main(args = process.argv.slice(2)) {
  const flag = name => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : null; };
  const file = flag('--file') || path.join(root, relativeFeed);
  const feed = JSON.parse(fs.readFileSync(file, 'utf8'));
  const baselinePath = flag('--baseline'), baseRef = flag('--base-ref');
  if (baseRef && !/^[a-zA-Z0-9_./~-]+$/.test(baseRef)) throw new Error('잘못된 git 기준 ref');
  const previous = baselinePath ? JSON.parse(fs.readFileSync(baselinePath, 'utf8'))
    : baseRef ? JSON.parse(execFileSync('git', ['show', `${baseRef}:${relativeFeed}`], { cwd: root, encoding: 'utf8' })) : null;
  const check = args.includes('--strict') ? validateFeed(feed, { strict: true }) : validateChanges(previous, feed);
  if (args.includes('--check-links')) {
    check.links = await checkSourceLinks(check.records);
    check.errors.push(...check.links.filter(link => !link.passed).map(link => `${link.airline}: 공식 링크 확인 실패 (${link.status || link.error})`));
    check.passed = check.errors.length === 0;
  }
  console.log(JSON.stringify({ passed: check.passed, records: check.records.length, errors: check.errors,
    warnings: check.warnings, links: check.links }, null, 2));
  return check;
}

if (require.main === module) main().then(check => { process.exitCode = check.passed ? 0 : 1; }).catch(error => { console.error(error.message); process.exitCode = 1; });
module.exports = { validateChanges, main };
