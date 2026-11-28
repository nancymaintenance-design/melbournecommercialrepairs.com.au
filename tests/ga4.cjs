const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const {withAnalytics} = require('../content/ga4.cjs');
const {analyticsQueryRules} = require('../content/business-query.cjs');
const {origin} = require('../content/search-config.cjs');
const clean = value => JSON.parse(JSON.stringify(value));

function page(path, canonical, {referrer = '', navigator = {}, framed = false} = {}) {
 const nodes = [];
 const source = '<head><script id="ellis-ga4">expired</script></head>';
 const tags = withAnalytics(source, origin + canonical);
 assert.equal(tags.match(/id="ellis-ga4"/g).length, 1);
 assert(!tags.includes('expired'));
 const window = {};
 window.top = framed ? {} : window;
 window.self = window;
 const document = {title: 'Project enquiries', referrer, createElement(tag) {
  return {tag, attrs:{}, callbacks:{}, setAttribute(key,value){this.attrs[key]=value;},
   addEventListener(event, callback){this.callbacks[event]=callback;},
   contentWindow:{postMessage(view, target){this.view=clean(view);this.target=target;}}};
 }};
 for (const key of ['head','body']) document[key] = {append(node){nodes.push(node);}};
 vm.runInNewContext(tags.match(/<script id="ellis-ga4">([\s\S]*?)<\/script>/)[1], {
  window, document, navigator, location: new URL(path, origin), URL, URLSearchParams
 });
 const frame = nodes.find(node => node.tag === 'iframe');
 if (!frame) return null;
 assert.equal(nodes[0].content, 'strict-origin');
 assert.equal(frame.attrs.sandbox, 'allow-scripts');
 assert.equal(frame.referrerPolicy, 'no-referrer');
 assert.equal(frame.src, '/analytics-frame.html');
 assert(frame.hidden);
 frame.callbacks.load();
 assert.equal(frame.contentWindow.target, '*');
 return frame.contentWindow.view;
}

for (const [path, groups] of Object.entries(analyticsQueryRules)) {
 for (const [key, values] of Object.entries(groups)) {
  const [value] = values;
  for (const lang of ['en', 'zh']) {
   const view = page(path + '?' + key + '=' + value + '&lang=' + lang, path + '?lang=' + lang);
   assert.deepEqual(view, {kind:'ellis-analytics-view', id:'G-N3CJWJXFCP',
    pageLocation:origin + path + '?lang=' + lang, pageReferrer:'', pageTitle:'Project enquiries'});
  }
  assert.equal(page(path + '?lang=en&' + key + '=fake@example.com', path + '?lang=en'), null);
 }
}
for (const path of [
 '/contact/?service=roofing-waterproofing&lang=zh',
 '/contact/?lang=invalid',
 '/contact/?lang=en&lang=zh',
 '/contact/?lang=en&name=PRIVATE_NAME',
 '/contact/?lang=en&topic=roofing',
 '/contact/?lang=en&area=cbd-inner&area=eastern',
 '/faq/?lang=en&q=PRIVATE_QUERY',
 '/faq/?lang=en&area=cbd-inner',
 '/?lang=en&service=roofing-waterproofing',
]) assert.equal(page(path, path.split('?')[0] + '?lang=en'), null, path);
assert.equal(page('/contact/?lang=en', '/contact/?lang=en', {navigator:{globalPrivacyControl:true}}), null);
assert.equal(page('/contact/?lang=en', '/contact/?lang=en', {navigator:{doNotTrack:'1'}}), null);
assert.equal(page('/contact/?lang=en', '/contact/?lang=en', {framed:true}), null);
assert.equal(page('/contact/?lang=en', '/contact/?lang=en', {referrer:'https://example.com/?email=PRIVATE'}), null);
assert.equal(page('/contact/?lang=en', '/contact/?lang=en', {referrer:'https://example.com/'}).pageReferrer, 'https://example.com');
assert(page('/contact/?service=roofing-waterproofing&lang=en&area=cbd-inner#contact-enquiry-form', '/contact/?lang=en'));

const childSource = fs.readFileSync(require.resolve('../analytics-frame.html'), 'utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
const parent = {};
const observers = new Map();
const scripts = [];
const document = {referrer:'', createElement(){ return {}; }, head:{append(script){scripts.push(script);}}};
const history = {current:'',replaceState(_, __, value){this.current=value;}};
const window = {parent, origin:'null',
 addEventListener(kind, action){observers.set(kind,action);},
 removeEventListener(kind){observers.delete(kind);}
};
const view = page('/contact/?service=roofing-waterproofing&lang=en', '/contact/?lang=en');
vm.runInNewContext(childSource,{window,document,history,URL});
const trigger = message => observers.get('message')?.({origin, source:parent, data:view, ...message});
trigger({origin:'https://untrusted.example'});
trigger({source:{}});
trigger({data:{...view, pageLocation:origin+'/contact/?lang=en&email=PRIVATE'}});
trigger({data:{...view, pageReferrer:'https://example.com/?name=PRIVATE_NAME'}});
assert.equal(window.dataLayer, undefined);
trigger({});
trigger({});
assert.equal(history.current, origin+'/contact/?lang=en');
assert.equal(scripts.length, 1);
assert.equal(scripts[0].referrerPolicy, 'no-referrer');
assert.equal(scripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=G-N3CJWJXFCP');
document.cookie = 'tracking=blocked';
assert.equal(document.cookie, '');
const commands = Array.from(window.dataLayer, row => Array.from(row));
assert.deepEqual(clean(commands[0]), ['consent','default',{
 analytics_storage:'denied', ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied'
}]);
assert.equal(commands.find(row => row[0]==='config')[2].send_page_view, false);
assert.deepEqual(clean(commands.filter(row => row[0]==='event')), [['event','page_view',{
 page_location:origin+'/contact/?lang=en', page_referrer:''
}]]);
console.log('GA4: business routes and consent gate, opaque handoff, denied consent, and one canonical page_view verified.');

