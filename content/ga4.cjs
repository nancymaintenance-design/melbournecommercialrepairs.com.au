const {origin} = require('./search-config.cjs');
const {analyticsQueryRules} = require('./business-query.cjs');

const measurementId = 'G-N3CJWJXFCP';

function initialiseAnalytics(productionOrigin, id, pageLocation, allowedValues) {
 if (location.origin !== productionOrigin || window.top !== window.self) return;

 // Preserve the policy even for URLs which are not eligible for analytics.
 const policy = document.createElement('meta');
 policy.name = 'referrer';
 policy.content = 'strict-origin';
 document.head.append(policy);

 if (navigator.globalPrivacyControl === true || navigator.doNotTrack === '1') return;

 const canonical = new URL(pageLocation);
 if (location.pathname !== canonical.pathname) return;
 const seen = new Set();
 for (const [key, value] of new URLSearchParams(location.search)) {
  if (seen.has(key)) return;
  seen.add(key);
  if (key === 'lang') {
   if ((value !== 'en' && value !== 'zh') || value !== canonical.searchParams.get('lang')) return;
  } else if (!Object.hasOwn(allowedValues, key) || !allowedValues[key].includes(value)) return;
 }

 const referrer = document.referrer ? new URL(document.referrer) : null;
 if (referrer && referrer.href !== referrer.origin + '/') return;

 // Consent mode can read the real browser URL instead of a page_location
 // override. Give the Google tag an isolated document with a canonical URL.
 // This also keeps form fields and later FAQ searches outside the tag's reach.
 const frame = document.createElement('iframe');
 frame.hidden = true;
 frame.title = 'Website analytics';
 frame.setAttribute('aria-hidden', 'true');
 frame.setAttribute('sandbox', 'allow-scripts');
 frame.referrerPolicy = 'no-referrer';
 frame.src = '/analytics-frame.html';
 const view = {kind: 'ellis-analytics-view', id, pageLocation,
  pageReferrer: referrer?.origin || '', pageTitle: document.title};
 // The sandbox makes the child opaque, so it cannot be addressed by origin.
 // This targeted message contains only standard page and origin-only metadata.
 frame.addEventListener('load', () => frame.contentWindow.postMessage(view, '*'), {once: true});
 const mount = () => document.body.append(frame);
 if (document.body) mount();
 else document.addEventListener('DOMContentLoaded', mount, {once: true});
}

function withAnalytics(source, canonical) {
 const pathname = new URL(canonical).pathname;
 const allowed = Object.hasOwn(analyticsQueryRules, pathname) ? analyticsQueryRules[pathname] : {};
 const args = [origin, measurementId, canonical, allowed].map(value => JSON.stringify(value)).join(', ');
 const tag = `<script id="ellis-ga4">(${initialiseAnalytics})(${args});</script>`;
 return source
  .replace(/<script id="ellis-ga4">[\s\S]*?<\/script>/g, '')
  .replace('</head>', () => tag + '</head>');
}

module.exports = {withAnalytics};
