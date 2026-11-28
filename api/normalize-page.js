const {readFile} = require('node:fs/promises');
const path = require('node:path');
const {origin: publicOrigin} = require('../content/search-config.cjs');
const {urlLanguage} = require('../content/url-language.cjs');
const {analyticsQueryRules} = require('../content/business-query.cjs');

const legacyHost = 'melbournecommercialrepairscomau.vercel.app';
const pagePath = /^(?:about|contact|faq|privacy|(?:services|sectors|insights|areas\/melbourne)(?:\/[a-z-]+)?)$/;
const internalParameter = '__ellisPage';
const root = path.join(__dirname, '..');

function copyRoutedQuery(request, query) {
  for (const [key, value] of Object.entries(query || {})) {
    if (key === internalParameter) continue;
    const incoming = request.searchParams.getAll(key);
    const routed = (Array.isArray(value) ? value : [value]).filter(item => typeof item === 'string');
    // Prefer the wire order. Some adapters expose repeated fields only in req.query.
    if (incoming.length === 0 || (key === 'lang' && routed.length > incoming.length)) {
      request.searchParams.delete(key);
      for (const item of routed) request.searchParams.append(key, item);
    }
  }
}

function retainLanguageSwitchParams(body, route, language, incoming) {
  const rules = route === '/'
    ? {service: analyticsQueryRules['/contact/'].service, region: ['Melbourne']}
    : analyticsQueryRules[route];
  if (!rules) return body;

  const target = new URLSearchParams({lang: language === 'en' ? 'zh' : 'en'});
  for (const [key, values] of Object.entries(rules)) {
    const value = incoming.get(key);
    if (values.includes(value)) target.set(key, value);
  }
  if (target.size === 1) return body;

  const href = route + '?' + target.toString().replaceAll('&', '&amp;');
  return Buffer.from(body.toString('utf8').replace(/<a\b[^>]*\bdata-language-switch(?=[\s=>])[^>]*>/,
    anchor => anchor.replace(/\bhref="[^"]*"/, () => 'href="' + href + '"')));
}

module.exports = async function normalizePage(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') return res.status(405).end();

  const request = new URL(req.url, publicOrigin);
  const routedPath = req.query?.[internalParameter] ?? request.searchParams.get(internalParameter);
  const original = request.pathname === '/api/normalize-page' ? routedPath : request.pathname;
  if (typeof original !== 'string') return res.status(404).end();
  const requestedPath = original.startsWith('/') ? original : '/' + original;
  const route = requestedPath.slice(1).replace(/(?:^|\/)index\.html$/, '').replace(/\/$/, '');
  if (route && !pagePath.test(route)) return res.status(404).end();

  copyRoutedQuery(request, req.query);
  request.searchParams.delete(internalParameter);

  const language = urlLanguage(request.searchParams);
  const file = path.join(root, language === 'en' ? '_ellisl10n' : '', route, 'index.html');
  let body;
  try {
    body = await readFile(file);
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'ENOTDIR') return res.status(404).end();
    throw error;
  }

  const canonicalPath = route ? '/' + route + '/' : '/';
  const host = String(req.headers.host || '').toLowerCase();
  const legacy = host === legacyHost;
  const languages = request.searchParams.getAll('lang');
  if (requestedPath !== canonicalPath || languages.length !== 1 || languages[0] !== language || legacy) {
    request.searchParams.set('lang', language);
    res.setHeader('Location', (legacy ? publicOrigin : '') + canonicalPath + request.search);
    return res.status(308).end();
  }

  body = retainLanguageSwitchParams(body, canonicalPath, language, request.searchParams);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Content-Length', body.length);
  return res.status(200).end(req.method === 'HEAD' ? undefined : body);
};
