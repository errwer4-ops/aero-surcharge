'use strict';

// For diagnostic output only. Never pass the result back into an API request.
const REDACTED = '[redacted]';
function sensitiveKey(key) {
  const name = String(key).replace(/[^a-z0-9]/gi, '').toLowerCase();
  return /^(?:authorization|proxyauthorization|cookie|setcookie|key|apikey|xapikey|token|accesstoken|refreshtoken|idtoken|admintoken|password|passwd|secret|clientsecret|signature|sig)$/.test(name)
    || /(?:apikey|authtoken|accesstoken|refreshtoken|password|clientsecret)$/.test(name);
}

function redactUrl(raw) {
  try {
    const url = new URL(raw);
    let changed = false;
    if (url.username || url.password) { url.username = ''; url.password = ''; changed = true; }
    for (const key of [...url.searchParams.keys()]) {
      if (sensitiveKey(key)) { url.searchParams.set(key, REDACTED); changed = true; }
    }
    // This provider embeds its credential in the path, including historical keys.
    if (url.hostname.toLowerCase() === 'v6.exchangerate-api.com' && /^\/v6\/[^/]+\//.test(url.pathname)) {
      url.pathname = url.pathname.replace(/^(\/v6\/)[^/]+\//, '$1' + REDACTED + '/');
      changed = true;
    }
    return changed ? url.toString() : raw;
  } catch { return raw; }
}

function redactForLog(value, env = process.env) {
  const secrets = [...new Set(Object.entries(env)
    .filter(([key, item]) => /(?:API_?KEY|TOKEN|SECRET|PASSWORD|PRIVATE_?KEY)/i.test(key) && typeof item === 'string' && item.length >= 4)
    .flatMap(([, item]) => [item, encodeURIComponent(item)]))].sort((a, b) => b.length - a.length);
  function text(value) {
    let result = value;
    for (const secret of secrets) result = result.split(secret).join(REDACTED);
    result = result.replace(/https?:\/\/[^\s<>"'`]+/gi, redactUrl);
    // Header blocks and serialized diagnostic fields may arrive as plain text.
    result = result.replace(/((?:authorization|proxy-authorization)\s*["']?\s*[:=]\s*["']?)(?:(?:Bearer|Basic)\s+)?[^\s,"'<>}]+/gi, '$1' + REDACTED);
    result = result.replace(/((?:x-api-key|api[_-]?key|access[_-]?token|refresh[_-]?token|token|password|client[_-]?secret)\s*["']?\s*[:=]\s*["']?)[^\s,"'&<>}]+/gi, '$1' + REDACTED);
    result = result.replace(/((?:^|\n)\s*(?:cookie|set-cookie)\s*:\s*)[^\r\n]+/gi, '$1' + REDACTED);
    return result;
  }
  function visit(item) {
    if (typeof item === 'string') return text(item);
    if (item instanceof Error) return { name: item.name, message: text(item.message) };
    if (Array.isArray(item)) return item.map(visit);
    if (item && typeof item === 'object') return Object.fromEntries(Object.entries(item)
      .map(([key, child]) => [key, sensitiveKey(key) && child != null && typeof child !== 'boolean' ? REDACTED : visit(child)]));
    return item;
  }
  return visit(value);
}

module.exports = { redactForLog };
