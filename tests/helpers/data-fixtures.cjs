'use strict';
const { getPipelineMonths } = require('../../lib/month');
function fixtures() {
  const month = getPipelineMonths().currentMonth;
  const url = 'https://www.jinair.com/company/announce/announceView?seq=100';
  const collectedAt = new Date().toISOString();
  const previous = { meta: { lastUpdated: collectedAt }, airlines: [{ iataCode: 'LJ',
    currentPeriod: month, currency: 'USD', sourceType: 'official_notice',
    officialSourceUrl: url, fetchedAt: collectedAt, items: [{ label: 'Japan',
      distanceRange: '0-500', current: 20, currency: 'USD', period: month }] }] };
  const parsed = { airline: 'LJ', effective_month: month, currency: 'USD', source_url: url,
    usedMock: false, routes: [{ route_type: 'Japan', distance_range: '0-500', amount: 22, currency: 'USD' }] };
  const collector = { code: 'LJ', source: 'live', sourceUrl: url, detectedMonth: month, fetchedAt: collectedAt, monthType: 'CURRENT' };
  return { previous, parsed, collector, month, url, collectedAt };
}
module.exports = { fixtures };
