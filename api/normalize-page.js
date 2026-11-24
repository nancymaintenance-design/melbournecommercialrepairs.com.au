const publicOrigin = 'https://www.melbournecommercialrepairs.com.au';
const legacyHost = 'melbournecommercialrepairscomau.vercel.app';
const pagePath = /^(?:about|contact|faq|privacy|(?:services|sectors|insights|areas\/melbourne)(?:\/[a-z-]+)?)$/;
const internalParameter = '__ellisPage';

module.exports = function normalizePage(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') return res.status(405).end();

  const request = new URL(req.url, publicOrigin);
  const original = request.pathname.startsWith('/api/')
    ? req.query?.[internalParameter] ?? request.searchParams.get(internalParameter)
    : request.pathname.slice(1);
  if (typeof original !== 'string') return res.status(404).end();
  const path = original.replace(/(?:^|\/)index\.html$/, '').replace(/\/$/, '');
  if (path && !pagePath.test(path)) return res.status(404).end();

  request.searchParams.delete(internalParameter);
  const canonicalPath = path ? `/${path}/` : '/';
  const host = String(req.headers.host || '').toLowerCase();
  const origin = host === legacyHost ? publicOrigin : '';
  res.setHeader('Location', origin + canonicalPath + request.search);
  return res.status(308).end();
};
