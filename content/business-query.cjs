const {services} = require('./service-pages.json');
const {regions} = require('../vendor/ellis-regions-v2/data/region-pages.json');
const {topics} = require('./faq-content.json');

// Query values are the keys already used by the contact prefill and FAQ.
const analyticsQueryRules = Object.freeze({
 '/contact/': Object.freeze({
  service: Object.freeze(services.map(service => service.route.split('/')[2])),
  area: Object.freeze(regions.map(region => region.areaParam))
 }),
 '/faq/': Object.freeze({topic: Object.freeze(['all', ...topics.map(topic => topic.key)])})
});

module.exports = {analyticsQueryRules};
