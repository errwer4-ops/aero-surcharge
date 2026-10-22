'use strict';
const test = require('node:test'), assert = require('node:assert/strict');
const { partitionParserInputs, parseCollectedCandidates, buildProposal } = require('../scripts/run_pipeline');
const { fixtures } = require('./helpers/data-fixtures.cjs');

test('fallback or errored captures containing mock HTML never invoke paid parser', async () => {
  const f = fixtures(), input = [
    { ...f.collector, source:'fallback', text:'Mock table 22 USD', rawHtml:'<table><td>22</td></table>', error:null },
    { ...f.collector, code:'KE', source:'live', text:'stale mock text', error:'timeout' }
  ];
  let calls = 0;
  const result = await parseCollectedCandidates(input, { skipLlm:false }, async () => { calls++; throw new Error('must not reach paid API'); });
  assert.equal(calls, 0); assert.deepEqual(result.parsed, []);
  assert.equal(result.skipped.length, 2); assert.ok(result.skipped.every(item => item.status === 'SOURCE_HOLD'));
  const proposal = buildProposal(f.previous, result.parsed, input);
  assert.equal(proposal.passed, false); assert.equal(proposal.proposed, null);
  assert.ok(proposal.errors.some(error => error.includes('파싱 결과 누락')));
});
test('only successful captures are passed; skipped input still holds the entire publication batch', async () => {
  const f = fixtures(), good = { ...f.collector, text:'Actual official table 22 USD' },
    failed = { ...f.collector, code:'KE', source:'fallback', text:'Mock table' };
  let received;
  const result = await parseCollectedCandidates([failed, good], { skipLlm:false }, async (records, options) => {
    received = records; assert.equal(options.skipLlm, false); return [f.parsed];
  });
  assert.deepEqual(received, [good]); assert.equal(result.skipped[0].airline, 'KE');
  const proposal = buildProposal(f.previous, result.parsed, [failed, good]);
  assert.equal(proposal.passed, false); assert.equal(proposal.proposed, null);
});
test('successful existing AI-search recovery remains eligible; blank or invalid sources are held', () => {
  const f = fixtures(), recovered = { ...f.collector, source:'ai-search-auto', error:null, rawHtml:'<table><td>22 USD</td></table>', _parsedDirect:f.parsed };
  const result = partitionParserInputs([recovered,
    { ...f.collector, rawHtml:'<html><script>mock()</script><style>body{}</style>&nbsp;</html>' },
    { ...f.collector, text:'captured table', sourceUrl:'https://example.invalid/notice' },
    { ...f.collector, source:'mock', text:'mock table' }
  ]);
  assert.deepEqual(result.eligible, [recovered]);
  assert.deepEqual(result.skipped.map(item => item.reason), ['empty_source_content','source_url_invalid','collection_not_successful']);
});
