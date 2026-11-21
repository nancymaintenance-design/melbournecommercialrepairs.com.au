const { origin } = require('./search-config.cjs');

const measurementId = 'G-N3CJWJXFCP';

function initialiseAnalytics(productionOrigin, id, pageLocation) {
 if (location.origin !== productionOrigin || navigator.globalPrivacyControl === true || navigator.doNotTrack === '1') return;

 window.dataLayer = window.dataLayer || [];
 function gtag() { window.dataLayer.push(arguments); }

 gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
 });
 gtag('set', 'ads_data_redaction', true);
 gtag('js', new Date());
 gtag('config', id, {
  page_location: pageLocation,
  page_referrer: document.referrer ? new URL(document.referrer).origin : '',
  allow_google_signals: false,
  allow_ad_personalization_signals: false
 });

 const script = document.createElement('script');
 script.async = true;
 script.referrerPolicy = 'no-referrer';
 script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
 document.head.append(script);
}

function withAnalytics(source, canonical) {
 const args = [origin, measurementId, canonical].map(value => JSON.stringify(value)).join(', ');
 const tag = `<script id="ellis-ga4">(${initialiseAnalytics})(${args});</script>`;
 return source
  .replace(/<script id="ellis-ga4">[\s\S]*?<\/script>/g, '')
  .replace('</head>', () => tag + '</head>');
}

module.exports = { withAnalytics };
