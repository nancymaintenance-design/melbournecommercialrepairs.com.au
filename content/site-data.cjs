const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const app = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const data = vm.runInNewContext(app.slice(app.indexOf('  const services ='), app.indexOf('  function renderServices()')) +
 ';({services,sectors,articles,faqs,serviceSlugs,sectorSlugs,articleSlugs})');
module.exports = data;
