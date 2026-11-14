const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

// Keep returning browsers on the same CSS/JS release as the generated HTML.
// Replacing existing queries makes repeated builds stable.
module.exports = function versionAssets(html, root) {
  return html.replace(/\b(href|src)="(\/?[\w./-]+\.(?:css|js))(?:\?[^"#]*)?"/g, (match, attribute, url) => {
    if (url.startsWith('//')) return match;
    const file = path.resolve(root, url.replace(/^\/+/, ''));
    const relative = path.relative(root, file);
    if (relative.startsWith('..') || path.isAbsolute(relative)) return match;
    const version = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').slice(0, 12);
    return `${attribute}="${url}?v=${version}"`;
  });
};
