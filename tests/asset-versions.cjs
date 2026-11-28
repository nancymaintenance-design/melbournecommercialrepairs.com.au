const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const root = path.resolve(__dirname, '..');

// A returning browser must request the new application code, not its cached
// pre-showcase renderer. That renderer replaces the new cards with old ones.
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert.match(home, /src="app\.js\?v=[a-f0-9]{12}"/, 'Main application must have a content version');

const versionAssets = require('../content/asset-versions.cjs');
const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'ellis-asset-test-'));
const fixture = path.join(directory, 'app.js');
try {
  fs.writeFileSync(fixture, 'old renderer');
  const input = '<script src="app.js?v=old" defer></script><a href="/services/">Services</a>';
  const first = versionAssets(input, directory);
  fs.writeFileSync(fixture, 'new renderer');
  const second = versionAssets(input, directory);
  assert.notEqual(first, second, 'Changing application code must invalidate its previous URL');
  assert.equal(versionAssets(second, directory), second, 'Repeated builds must be stable');
  assert(second.includes('<a href="/services/">Services</a>'), 'Navigation must stay untouched');
  const external = '<script src="https://example.com/app.js"></script>';
  assert.equal(versionAssets(external, directory), external);
  const cdn = '<link href="//example.com/style.css" rel="stylesheet">';
  assert.equal(versionAssets(cdn, directory), cdn);
  const image = '<img src="/assets/service-showcase/garden-irrigation.webp">';
  assert.equal(versionAssets(image, directory), image, 'Image assets must stay untouched');
} finally {
  fs.unlinkSync(fixture);
  fs.rmdirSync(directory);
}

function verify(directory) {
  for (const item of fs.readdirSync(directory, { withFileTypes: true })) {
    if (item.name.startsWith('.')) continue;
    const file = path.join(directory, item.name);
    if (item.isDirectory()) verify(file);
    else if (item.name === 'index.html') {
      const html = fs.readFileSync(file, 'utf8');
      assert.equal(versionAssets(html, root), html, 'Outdated asset URL in ' + file);
    }
  }
}
verify(root);
const cacheRules = require('../vercel.json').routes.filter(rule => rule.headers?.['Cache-Control']?.includes('immutable'));
const isImmutable = (target, method = 'GET') => {
  const url = new URL(target, 'https://example.com');
  return cacheRules.some(rule => new RegExp(rule.src).test(url.pathname)
    && rule.methods.includes(method)
    && (!rule.has || rule.has.every(({key, value}) => new RegExp(value).test(url.searchParams.get(key) || ''))));
};
assert(isImmutable('/app.js?v=3edfc28dc0ad'));
assert(isImmutable('/vendor/ellis-regions-v2/src/contact-context.mjs?v=3edfc28dc0ad', 'HEAD'));
assert(isImmutable('/assets/scenes/01-home-w1536-v2.webp'));
assert(isImmutable('/assets/areas/melbourne-stage-design-night-w1731-v2.avif'));
for (const target of ['/app.js', '/style.css?v=stale', '/api/enquiry.js?v=3edfc28dc0ad',
  '/assets/scenes/01-home.webp', '/assets/areas/melbourne-stage-design-night-v1.webp',
  '/assets/project-process/enquiry-note.png', '/sitemap.xml', '/contact/?lang=en', '/analytics-frame.html']) {
  assert(!isImmutable(target), 'Unversioned or non-static response must still revalidate: ' + target);
}
assert(!isImmutable('/app.js?v=3edfc28dc0ad', 'POST'));
console.log('Asset cache regression passed: new code changes URLs; all generated pages have current versions.');
