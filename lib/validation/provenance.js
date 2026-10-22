'use strict';

const trust = require('../../public/source-provenance');

// A host allowlist, HTTP 200, parser confidence or historical status string is
// not a reconciliation of the amount and its charging conditions.
function reconcileRecord(record) {
  if (!record || record.chargingBasis !== record.sourceBand) return { status: 'unresolved', sourceVerificationStatus: 'unresolved', sourceVerifiedAt: null, reason: 'source_basis_missing_or_mismatch' };
  const input = { airline: record.airline, month: record.effectiveMonth, currency: record.currency,
    sourceUrl: record.sourceUrl, amount: record.oneWayAmount, bandIndex: record.bandIndex,
    band: record.sourceBand, direction: record.direction, departureCountry: record.departureCountry,
    route: record.origin && record.destination ? `${record.origin}-${record.destination}` : null };
  return input.route ? trust.evaluate(input) : trust.evaluateNotice(input);
}

module.exports = { reconcileRecord };
