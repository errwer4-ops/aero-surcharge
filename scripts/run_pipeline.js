#!/usr/bin/env node
'use strict';

// Existing collectors, parsers and candidate selection remain in use. Publication
// is a separate fail-closed step; neither fallback nor mock inputs can reach it.
const fs = require('fs');
const path = require('path');
const { collectAll } = require('../lib/collector');
const { parseAll } = require('../lib/parser');
const { validateAll, printValidationSummary, validateFeed, validateSourceUrl, checkSourceLinks } = require('../lib/validation');
const { resolveFinal } = require('../lib/candidate');
const { getPipelineMonths } = require('../lib/month');
const { runAiSearch } = require('../lib/ai-search');
const { validateChanges } = require('./validate_data');
const { reconcileRecord } = require('../lib/validation/provenance');
const ROOT = path.resolve(__dirname, '..');
const FEED_PATH = path.join(ROOT, 'public', 'data', 'official_surcharge_feed.json');
const REPORT_DIR = path.join(ROOT, 'artifacts', 'data-validation');

function loadEnv() {
  const envPath = path.join(ROOT, '.env.local');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const match = line.trim().match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (match && !(match[1] in process.env)) process.env[match[1]] = match[2].replace(/^(['"])(.*)\1$/, '$2');
  }
}

function parseOptions(args = process.argv.slice(2)) {
  const index = args.indexOf('--only');
  const only = [];
  if (index >= 0) for (let i = index + 1; i < args.length && !args[i].startsWith('--'); i++) only.push(args[i].toUpperCase());
  return { mock: args.includes('--mock'), dryRun: args.includes('--dry-run'),
    skipLlm: args.includes('--skip-llm') || process.env.SKIP_LLM === 'true',
    checkLinks: args.includes('--check-links'), only: only.length ? only : null };
}

function assertWritableMode(options) {
  if (!options.dryRun && (options.mock || options.skipLlm)) {
    throw new Error('--mock / --skip-llm 실행은 --dry-run 필수입니다. 운영 피드 게시를 차단했습니다.');
  }
}

function partitionParserInputs(collected) {
  const eligible = [], skipped = [];
  const successfulSources = new Set(['live', 'override-url', 'override-text', 'override-html', 'ai-search-auto']);
  for (const result of collected) {
    const text = typeof result.text === 'string' ? result.text.trim() : '';
    const htmlText = typeof result.rawHtml === 'string' ? result.rawHtml
      .replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]*>/g, ' ').replace(/&nbsp;|&#160;/g, ' ').trim() : '';
    const reason = !successfulSources.has(result.source) ? 'collection_not_successful'
      : result.error ? 'collector_error'
      : !text && !htmlText ? 'empty_source_content'
      : validateSourceUrl(result.sourceUrl, result.code).length ? 'source_url_invalid' : null;
    if (reason) skipped.push({ airline: result.code, source: result.source || 'unknown', status: 'SOURCE_HOLD', reason });
    else eligible.push(result);
  }
  return { eligible, skipped };
}

async function parseCollectedCandidates(collected, options, parser = parseAll) {
  // Run after the existing AI-search recovery. Failed recovery still leaves a
  // fallback record containing mock HTML; never spend parser calls on that HTML.
  const { eligible, skipped } = partitionParserInputs(collected);
  const parsed = eligible.length ? await parser(eligible, options) : [];
  return { parsed, skipped };
}

function mergeFeed(existingFeed, validated, forecastFeed, manualOverrides, collected = []) {
  const feed = JSON.parse(JSON.stringify(existingFeed));
  const now = new Date().toISOString();
  for (const result of validated) {
    if (!result.hasValidData || result.blockUpdate || result.usedMock !== false) continue;
    const reconciled = result.validRoutes.map(route => reconcileRecord(route.metadata));
    if (reconciled.some(check => check.status !== 'verified')) throw new Error(`${result.airline}: 공식 원문 금액/부과 기준 대조 미완료 — 게시 보류`);
    const existing = feed.airlines.find(a => a.iataCode === result.airline);
    if (!existing) throw new Error(`${result.airline}: 기존 항공사 없음 — 검토 필요`);
    // Text/HTML/URL overrides were already collected and validated above.
    // Legacy raw override.items cannot bypass the same candidate validation.
    const final = resolveFinal(result, existing, [], null);
    if (!final.updated || !['official_notice', 'override'].includes(final.finalSource)) continue;
    const items = final.finalRoutes.map((item, i) => ({ ...item,
      period: result.effective_month, dataStatus: 'confirmed',
      metadata: { ...result.validRoutes[i].metadata, dataStatus: 'confirmed', validationStatus: 'passed', validatedAt: result.validatedAt,
        sourceVerificationStatus: reconciled[i].sourceVerificationStatus, sourceVerifiedAt: reconciled[i].sourceVerifiedAt,
        sourceEvidenceId: reconciled[i].evidenceId },
    }));
    const proposed = { ...existing, items, currentPeriod: result.effective_month,
      currency: result.currency, sourceType: 'official_notice', dataStatus: 'confirmed',
      confidence: 'fresh', supported: true, fetchedAt: result.collectedAt,
      noticeUrl: result.source_url, officialSourceUrl: result.source_url,
      sources: { ...existing.sources, noticeUrl: result.source_url },
      validationStatus: 'passed', validatedAt: result.validatedAt,
      sourceVerificationStatus: 'source_reconciled', sourceVerifiedAt: reconciled[0].sourceVerifiedAt,
      dataQuality: { source: final.finalSource, confidence: final.finalConfidence,
        updatedAt: now, validationStatus: 'passed', reason: final.reason },
    };
    const finalCheck = validateFeed({ meta: {}, airlines: [proposed] }, { strict: true });
    if (!finalCheck.passed) throw new Error(`${result.airline}: 최종 후보 검증 실패: ${finalCheck.errors.join('; ')}`);
    Object.assign(existing, proposed);
    delete existing.spikeWarning; delete existing.lowConfidenceReason;
    if (result.summary) existing.aiSummary = result.summary;
  }
  if (JSON.stringify(feed.airlines) !== JSON.stringify(existingFeed.airlines)) {
    feed.meta = { ...feed.meta, lastUpdated: now, pipelineRun: now };
  }
  return feed;
}

function buildProposal(existingFeed, parsed, collected) {
  const validated = validateAll(parsed, existingFeed, collected);
  const errors = [];
  if (!collected.length || !parsed.length) errors.push('수집/파싱 결과 비어 있음');
  for (const result of collected) {
    if (!parsed.some(item => item.airline === result.code)) errors.push(`${result.code}: 파싱 결과 누락`);
  }
  for (const result of validated) {
    if (result.blockUpdate || !result.hasValidData) errors.push(`${result.airline}: ${result.validationErrors.join('; ')}`);
    else {
      result.sourceReviews = result.validRoutes.map(route => reconcileRecord(route.metadata));
      result.sourceVerificationStatus = result.sourceReviews.every(check => check.status === 'verified') ? 'source_reconciled' : 'unresolved';
      if (result.sourceVerificationStatus !== 'source_reconciled') errors.push(`${result.airline}: 공식 원문 대조 미완료 (${[...new Set(result.sourceReviews.filter(check => check.status !== 'verified').map(check => check.reason))].join(', ')}) — 후보 보관, 게시 보류`);
    }
  }
  // Batch publication is all-or-nothing. A failed candidate preserves all files.
  let proposed = null;
  if (!errors.length) {
    proposed = mergeFeed(existingFeed, validated, null, null, collected);
    const check = validateFeed(proposed);
    errors.push(...check.errors);
  }
  return { passed: errors.length === 0, errors, validated, proposed };
}

function publishFeed(feedPath, proposed, originalText, { mock = false, skipLlm = false, dryRun = false, reportDir = REPORT_DIR } = {}) {
  assertWritableMode({ mock, skipLlm, dryRun });
  if (dryRun) return false;
  const original = JSON.parse(originalText);
  const check = validateChanges(original, proposed);
  if (!check.passed) throw new Error(`게시 직전 스키마 검증 실패: ${check.errors.join('; ')}`);
  // Apply strict rules only to changed records, retaining unmodified legacy data.
  for (const airline of proposed.airlines) {
    const previous = original.airlines.find(a => a.iataCode === airline.iataCode);
    if (JSON.stringify(airline) !== JSON.stringify(previous)) {
      const changed = validateFeed({ meta: {}, airlines: [airline] }, { strict: true });
      if (!changed.passed) throw new Error(`변경된 항공사 검증 실패: ${changed.errors.join('; ')}`);
    }
  }
  if (fs.readFileSync(feedPath, 'utf8') !== originalText) throw new Error('검증 도중 피드가 변경됨 — 다시 실행 필요');
  if (JSON.stringify(proposed) === JSON.stringify(original)) return false;
  fs.mkdirSync(reportDir, { recursive: true });
  const id = `${new Date().toISOString().replace(/[:.]/g, '-')}-${process.pid}`;
  // Recoverable pre-write snapshot, outside public/. Never overwrite an older backup.
  fs.writeFileSync(path.join(reportDir, `${id}.backup.json`), originalText, { flag: 'wx' });
  const temp = `${feedPath}.${id}.tmp`;
  fs.writeFileSync(temp, JSON.stringify(proposed, null, 2) + '\n', { flag: 'wx' });
  if (fs.readFileSync(feedPath, 'utf8') !== originalText) { fs.unlinkSync(temp); throw new Error('게시 도중 피드가 변경됨 — 기존 피드 보존'); }
  fs.renameSync(temp, feedPath);
  return true;
}

function saveReport(report, dir = REPORT_DIR) {
  fs.mkdirSync(dir, { recursive: true });
  const name = `${report.runAt.replace(/[:.]/g, '-')}-${process.pid}.json`;
  fs.writeFileSync(path.join(dir, name), JSON.stringify(report, null, 2) + '\n', { flag: 'wx' });
  return path.join(dir, name);
}

async function main(options) {
  loadEnv();
  const opts = options || parseOptions();
  const report = { runAt: new Date().toISOString(), options: opts, success: false, errors: [] };
  try {
    assertWritableMode(opts);
    const originalText = fs.readFileSync(FEED_PATH, 'utf8'), existing = JSON.parse(originalText);
    console.log(`[Pipeline] 기준월 ${getPipelineMonths().currentMonth} / 다음달 ${getPipelineMonths().nextMonth}`);
    let collected = await collectAll({ useMock: opts.mock, only: opts.only });
    if (!opts.mock && !opts.skipLlm && process.env.ANTHROPIC_API_KEY) collected = await runAiSearch(collected);
    const parsing = await parseCollectedCandidates(collected, { skipLlm: opts.skipLlm || opts.mock });
    const parsed = parsing.parsed;
    report.parserSkipped = parsing.skipped;
    for (const skipped of parsing.skipped) console.log(`[Parser] ${skipped.airline}: SOURCE_HOLD (${skipped.reason}) — 유료 파싱 생략`);
    const proposal = buildProposal(existing, parsed, collected);
    printValidationSummary(proposal.validated);
    report.validation = proposal.validated.map(result => ({ airline: result.airline,
      passed: result.hasValidData && result.sourceVerificationStatus === 'source_reconciled', technicalPassed: result.hasValidData,
      sourceVerificationStatus: result.sourceVerificationStatus || 'unresolved', sourceReviews: result.sourceReviews,
      errors: result.validationErrors, warnings: result.allWarnings,
      rejectedRoutes: result.rejectedRoutes.map(route => ({ basis: route.route_type, errors: route._validation.errors })),
    }));
    report.errors = proposal.errors;
    if (!proposal.passed) throw new Error('신규 후보 검증 실패 — 공식/전망 피드 전체 보존');
    if (opts.checkLinks) {
      report.links = await checkSourceLinks(proposal.validated.flatMap(result => result.validRoutes.map(route => route.metadata)));
      if (report.links.some(link => !link.passed)) throw new Error('공식 출처 연결 검증 실패 — 게시 보류');
    }
    report.published = publishFeed(FEED_PATH, proposal.proposed, originalText, opts);
    // Market module still contains mock petroleum inputs even when FX is live.
    // No forecast inputs or generatedAt are rewritten by this official notice pipeline.
    report.forecast = 'preserved: market model contains mock inputs';
    report.success = true;
  } catch (error) {
    report.errors.push(error.message);
    console.error(`[Pipeline] ${error.message}`);
  }
  if (opts.dryRun || opts.mock || opts.skipLlm) {
    console.log(`[Pipeline] 파일 변경 없음; 결과 ${report.success ? 'PASS' : 'HOLD'}`);
  } else {
    console.log(`[Pipeline] 검토 로그: ${saveReport(report)}`);
  }
  return report;
}

if (require.main === module) main().then(report => { process.exitCode = report.success ? 0 : 1; }).catch(error => { console.error(error.message); process.exitCode = 1; });
module.exports = { parseOptions, assertWritableMode, partitionParserInputs, parseCollectedCandidates, mergeFeed, buildProposal, publishFeed, saveReport, main };
