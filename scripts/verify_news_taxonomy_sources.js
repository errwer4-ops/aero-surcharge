const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const shared = fs.readFileSync(path.join(root, 'public', '_shared.js'), 'utf8');
const news = fs.readFileSync(path.join(root, 'public', 'news.html'), 'utf8');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(
  shared.includes("categories:['airline','institution','market']"),
  'The three-category policy is missing.'
);
assert(
  shared.includes("!/(^|\\.)aero-surcharge\\.com$/i.test(parsed.hostname)"),
  'Self-domain source rejection is missing.'
);
assert(
  news.includes('.map(enforceNewsPolicy)'),
  'News items are not passed through the taxonomy policy.'
);
assert(
  news.includes("localizedCardArray(it,'sourceRefs')"),
  'External source references are not rendered.'
);

const categoryLists = [...shared.matchAll(/var categories=\[([^\]]+)\];/g)]
  .slice(-6)
  .map((match) => match[1]);
assert(categoryLists.length === 6, 'Could not inspect the six recent category lists.');
categoryLists.forEach((list) => {
  assert(
    !/'(?:forecast|oil|geopolitics|mops|fx|guide|general)'/.test(list),
    `Unsupported recent category remains: ${list}`
  );
});

console.log('News taxonomy/source policy verification passed.');
