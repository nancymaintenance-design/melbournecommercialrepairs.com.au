const origin = 'https://www.melbournecommercialrepairs.com.au';
const languages = {zh: 'zh-CN', en: 'en-AU'};
const canonicalUrl = (route, language) => origin + route + '?lang=' + language;
const homeMeta = {
 route: '/',
 titleZh: '墨尔本商业物业维护与维修 | Ellis Services Group',
 titleEn: 'Commercial Property Maintenance & Repairs in Melbourne | Ellis Services Group',
 descriptionZh: 'Ellis Services Group 为墨尔本商业物业提供建筑维修、空调水电、园林绿化、广告标识及外立面高空清洁。',
 descriptionEn: 'Ellis Services Group coordinates commercial property maintenance in Melbourne: building repairs, HVAC, electrical, plumbing, landscaping, signage and high-access cleaning.'
};
function localeHead(metadata) {
 const alternates = Object.entries(languages).map(([locale, hreflang]) =>
  '<link rel="alternate" hreflang="' + hreflang + '" href="' + canonicalUrl(metadata.route, locale) + '">');
 return '<link rel="canonical" href="' + canonicalUrl(metadata.route, 'zh') + '">' +
  alternates.join('') + '<link rel="alternate" hreflang="x-default" href="' + canonicalUrl(metadata.route, 'zh') + '">' +
  '<script type="application/json" id="page-meta">' + JSON.stringify(metadata).replaceAll('<', '\\u003c') + '</script>';
}
module.exports = {origin, languages, canonicalUrl, homeMeta, localeHead};
