(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.AeroCalculatorCore = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  var STORAGE_KEY = 'aero.calculator.v1';
  // Route identity is separately supported by the airline's published route/fare
  // pages. These are surcharge lookup routes, never a claim of live seat supply.
  var noticeRouteApplicability = [{airline:'BX',origin:'PUS',destination:'UBN',
    routeSourceUrl:'https://www.airbusan.com/content/individual/booking/fareInternational',
    airportCodeSourceUrl:'https://www.airbusan.com/content/common/customercenter/noticeDetail?id=3863',
    scope:'surcharge_applicability',scheduleVerified:false}];
  function month(value) { return typeof value === 'string' && /^20\d{2}-(0[1-9]|1[0-2])$/.test(value); }
  function money(value) { return typeof value === 'number' && Number.isFinite(value) && value >= 0; }
  function compare(base, target) {
    if (!base || !target || !money(base.amount) || !money(target.amount)) return { valid:false, reason:'missing' };
    if (base.status !== 'confirmed' || target.status !== 'confirmed') return { valid:false, reason:'unconfirmed' };
    if (!month(base.month) || !month(target.month) || base.month === target.month) return { valid:false, reason:'same_month' };
    if (['airline','origin','destination','basis','currency','direction'].some(function (key) { return !base[key] || base[key] !== target[key]; })) return { valid:false, reason:'conditions' };
    var difference = target.amount - base.amount;
    return { valid:true, difference:difference, percent:base.amount === 0 ? null : difference / base.amount * 100, currency:base.currency };
  }
  function safeUrl(value) { try { var u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password ? u.href : null; } catch (_) { return null; } }
  function officialRouteGroupIndex(notice, origin, destination) {
    if (!notice || !/^[A-Z]{3}$/.test(origin || '') || !/^[A-Z]{3}$/.test(destination || '')) return -1;
    if (Array.isArray(notice.routesByGroup)) return notice.routesByGroup.findIndex(function (group) { return Array.isArray(group) && group.indexOf(origin+'-'+destination)>=0; });
    if (notice.code === 'BX' && Array.isArray(notice.bands)) return notice.bands.findIndex(function (band) {
      return String(band).split('/').some(function (token) {
        var match=token.trim().match(/^([A-Z]{3})(?:\s*\(([A-Z]{3})\))?$/);
        return match && match[1]===destination && (!match[2] || match[2]===origin);
      });
    });
    return -1;
  }
  function validatedFeedRecords(feed) {
    var records=[];
    if (!feed || !Array.isArray(feed.airlines)) return records;
    feed.airlines.forEach(function (airline) {
      (Array.isArray(airline.items)?airline.items:[]).forEach(function (item) {
        var m=item && item.metadata;
        if (!m || m.airline!==airline.iataCode || m.dataStatus!=='confirmed' || m.validationStatus!=='passed' || !m.validatedAt || !Number.isFinite(Date.parse(m.validatedAt))) return;
        var period=String(m.effectiveMonth||'').replace('.','-');
        if (!month(period) || String(airline.currentPeriod||'').replace('.','-')!==period || !money(m.oneWayAmount) || (item.current!=null && item.current!==m.oneWayAmount)) return;
        if (!/^[A-Z]{3}$/.test(m.origin||'') || !/^[A-Z]{3}$/.test(m.destination||'') || !/^[A-Z]{3}$/.test(m.currency||'') || typeof m.chargingBasis!=='string' || !m.chargingBasis || m.direction!=='one_way' || !safeUrl(m.sourceUrl)) return;
        if (!m.collectedAt || !Number.isFinite(Date.parse(m.collectedAt))) return;
        if ([m.effectiveFrom,m.effectiveTo].some(function (date) { return date && (!Number.isFinite(Date.parse(date)) || date.slice(0,7)!==period); })) return;
        var sourceVerified=/^(verified|official_verified|official_notice_verified(?:_.+)?)$/.test(m.sourceVerificationStatus||'');
        records.push({airline:m.airline,origin:m.origin,destination:m.destination,month:period,currency:m.currency,direction:m.direction,basis:m.chargingBasis,band:item.label||m.chargingBasis,amount:m.oneWayAmount,status:'confirmed',verificationStatus:sourceVerified?'verified':'unverified',sourceUrl:safeUrl(m.sourceUrl),publishedAt:m.publishedAt||null,verifiedAt:m.sourceVerifiedAt||null,validatedAt:m.validatedAt,collectedAt:m.collectedAt,effectiveFrom:m.effectiveFrom||null,effectiveTo:m.effectiveTo||null});
      });
    });
    // Keep duplicates visible to selection: discarding them here would allow stale fallback.
    return records;
  }
  function selectFeedRecord(records, query) {
    var found=(records||[]).filter(function(record){return ['airline','origin','destination','month','direction'].every(function(key){return record[key]===query[key];});});
    return {present:found.length>0, record:found.length===1?found[0]:null};
  }
  function lowestVerified(records) {
    var lowest={};
    (records||[]).forEach(function(record){
      if (!record || record.status!=='confirmed' || record.verificationStatus!=='verified' || !money(record.amount)) return;
      if(lowest[record.currency]==null || record.amount<lowest[record.currency])lowest[record.currency]=record.amount;
    });
    return lowest;
  }
  function normalizeConditions(value) {
    if (!value || !/^[A-Z]{3}$/.test(value.origin || '') || !/^[A-Z]{3}$/.test(value.destination || '') || !/^(all|[A-Z0-9]{2})$/.test(value.airline || '')) return null;
    if (!month(value.baseMonth) || !month(value.targetMonth)) return null;
    return { origin:value.origin, destination:value.destination, airline:value.airline, baseMonth:value.baseMonth, targetMonth:value.targetMonth,
      passengers:Math.max(1, Math.min(20, Number.isInteger(value.passengers) ? value.passengers : 1)), trip:value.trip === 2 ? 2 : 1 };
  }
  function identity(value) { return value.origin + '-' + value.destination + ':' + value.airline; }
  function snapshot(records) {
    var result = {};
    (records || []).forEach(function (record) {
      // Never turn a forecast, unverified legacy record or missing amount into an update notification.
      if (!record || record.status !== 'confirmed' || record.verificationStatus !== 'verified' || !safeUrl(record.sourceUrl) || !money(record.amount) || !month(record.month)) return;
      var key = [record.airline,record.month,record.origin,record.destination].join('|');
      result[key] = {month:record.month, value:JSON.stringify([record.amount,record.currency,record.basis])};
    });
    return result;
  }
  function snapshotValue(value) {
    try { var fields=JSON.parse(value);return Array.isArray(fields)&&fields.length>=3&&money(fields[0])&&typeof fields[1]==='string'&&typeof fields[2]==='string'?JSON.stringify(fields.slice(0,3)):null; } catch (_) { return null; }
  }
  function changes(previous, current, currentMonth) {
    var kinds = [];
    // No baseline means first view, not an update.
    if (!previous) return kinds;
    Object.keys(current || {}).forEach(function (key) {
      var old = previous[key], item = current[key];
      var kind = !old ? (item.month < currentMonth ? 'historical_added' : 'new_notice') : snapshotValue(old.value) !== snapshotValue(item.value) ? (item.month < currentMonth ? 'historical_revision' : 'notice_revision') : null;
      if (kind && kinds.indexOf(kind) === -1) kinds.push(kind);
    });
    return kinds;
  }
  function validSnapshot(value) {
    var output = {};
    if (!value || typeof value !== 'object') return output;
    Object.keys(value).slice(0,300).forEach(function (key) {
      var item=value[key];
      if (/^[A-Z0-9]{2}\|20\d{2}-\d{2}\|[A-Z]{3}\|[A-Z]{3}$/.test(key) && item && month(item.month) && typeof item.value === 'string' && item.value.length < 1600 && snapshotValue(item.value)) output[key]={month:item.month,value:snapshotValue(item.value)};
    });
    return output;
  }
  function createStore(storage) {
    var state = {version:1, saved:[], recent:null}, available = true;
    try {
      var raw = storage && storage.getItem(STORAGE_KEY);
      if (raw && raw.length < 250000) {
        var parsed=JSON.parse(raw);
        if (parsed.version === 1) {
          state.recent=normalizeConditions(parsed.recent);
          (Array.isArray(parsed.saved) ? parsed.saved : []).slice(0,20).forEach(function (entry) {
            var conditions=normalizeConditions(entry.conditions);
            if (conditions && !state.saved.some(function (item) { return identity(item.conditions) === identity(conditions); })) state.saved.push({conditions:conditions, snapshot:validSnapshot(entry.snapshot)});
          });
        }
      }
    } catch (_) { available=false; }
    function persist() { try { if (!storage) throw new Error('unavailable'); storage.setItem(STORAGE_KEY,JSON.stringify(state)); } catch (_) { available=false; } return available; }
    return {
      state:state,
      available:function () { return available && !!storage; },
      recent:function (value) { var clean=normalizeConditions(value); if (clean) { state.recent=clean; persist(); } },
      save:function (value, records) {
        var clean=normalizeConditions(value); if (!clean) return false;
        var found=state.saved.find(function (entry) {return identity(entry.conditions)===identity(clean);});
        if (found) {found.conditions=clean;found.snapshot=snapshot(records);}
        else {if(state.saved.length>=20)return false;state.saved.push({conditions:clean,snapshot:snapshot(records)});}
        persist(); return true;
      },
      remove:function (id) { state.saved=state.saved.filter(function (entry) {return identity(entry.conditions)!==id;}); persist(); },
      acknowledge:function (id, records) { var entry=state.saved.find(function (item) {return identity(item.conditions)===id;}); if(entry){entry.snapshot=snapshot(records);persist();} }
    };
  }
  return {STORAGE_KEY:STORAGE_KEY, noticeRouteApplicability:noticeRouteApplicability, month:month, money:money, compare:compare, safeUrl:safeUrl, officialRouteGroupIndex:officialRouteGroupIndex, validatedFeedRecords:validatedFeedRecords, selectFeedRecord:selectFeedRecord, lowestVerified:lowestVerified, normalizeConditions:normalizeConditions, identity:identity, snapshot:snapshot, changes:changes, createStore:createStore};
});
