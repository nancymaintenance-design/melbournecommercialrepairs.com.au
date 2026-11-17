/**
 * Ellis region route and enquiry context contract.
 * Pure JavaScript: no DOM, requests, storage or submission side effects.
 * Keep route suffixes separate from editorial IDs (western != western-suburbs).
 */
export const SERVICE_CATALOG = Object.freeze([
  ['building-maintenance', '建筑主体与日常维修', 'Building maintenance & repairs'],
  ['roofing-waterproofing', '屋顶、防水与建筑修复', 'Roof repairs & waterproofing'],
  ['electrical-lighting', '商业电气与照明', 'Commercial electrical & lighting'],
  ['plumbing-drainage-gas', '水管、排水与燃气', 'Plumbing, drainage & gas'],
  ['hvac-building-systems', '空调与楼宇设备系统', 'Air conditioning & building systems'],
  ['fire-security-access', '消防、安防与门禁', 'Fire, security & access control'],
  ['landscaping-irrigation', '商业园林绿化与灌溉', 'Landscaping & irrigation'],
  ['signage-wayfinding', '广告标识与导视', 'Signage & wayfinding'],
  ['facade-high-access-cleaning', '外立面与高空清洁', 'Facade & high-access cleaning'],
  ['cleaning-waste-hygiene', '商业清洁与环境维护', 'Commercial cleaning & hygiene'],
  ['car-parks-external-works', '停车场与室外工程', 'Car parks & external works'],
  ['fit-outs-make-good', '商业翻新与退租恢复', 'Refurbishment & make good'],
].map(([slug, zh, en]) => Object.freeze({
  slug,
  route: `/services/${slug}/`,
  names: Object.freeze({ zh, en }),
})));

export const normaliseLanguage = (lang) => lang === 'zh' ? 'zh' : 'en';

function checkedPath(path) {
  if (typeof path !== 'string' || !/^\/(?:[a-z0-9-]+\/)*$/i.test(path)) {
    throw new TypeError('Expected a local route with a trailing slash');
  }
  return path;
}

function checkedLanguage(lang) {
  if (lang !== 'zh' && lang !== 'en') throw new RangeError('Language must be en or zh');
  return lang;
}

export function createRegionLinks(data) {
  if (!data || !Array.isArray(data.regions)) throw new TypeError('Expected region-pages data');
  const byId = new Map();
  const byArea = new Map();
  const services = new Map(SERVICE_CATALOG.map((service) => [service.slug, service]));

  for (const source of data.regions) {
    const route = checkedPath(source.route);
    const area = route.split('/').filter(Boolean).at(-1);
    if (!source.slug || source.areaParam && source.areaParam !== area) {
      throw new TypeError('Invalid region or area/route mismatch');
    }
    if (byId.has(source.slug) || byArea.has(area)) throw new TypeError('Duplicate region');
    const regionServices = new Map();
    for (const item of source.priorityServices || []) {
      const canonicalService = services.get(item.slug);
      if (!canonicalService || checkedPath(item.route) !== canonicalService.route) {
        throw new TypeError('Unknown service or conflicting service route');
      }
      regionServices.set(item.slug, Object.freeze({
        slug: item.slug,
        route: canonicalService.route,
        names: Object.freeze({
          zh: item.anchorZh || canonicalService.names.zh,
          en: item.anchorEn || canonicalService.names.en,
        }),
      }));
    }
    const region = Object.freeze({
      id: source.slug,
      area,
      route,
      services: regionServices,
      names: Object.freeze({ zh: source.nameZh, en: source.nameEn }),
    });
    byId.set(region.id, region);
    byArea.set(region.area, region);
  }

  const contactPath = checkedPath(data.contactPath || '/contact/');
  const formId = data.contactFormId || 'contact-enquiry-form';
  if (!/^[a-z][a-z0-9-]*$/i.test(formId)) throw new TypeError('Invalid form anchor');
  const getArea = (id) => {
    const region = byId.get(id) || byArea.get(id);
    if (!region) throw new RangeError('Unknown region');
    return region;
  };
  const getService = (slug) => {
    const service = services.get(slug);
    if (!service) throw new RangeError('Unknown service');
    return service;
  };
  const localLink = (path, lang) => `${path}?${new URLSearchParams({ lang: checkedLanguage(lang) })}`;

  return Object.freeze({
    areaHref(id, lang = 'en') {
      return localLink(getArea(id).route, lang);
    },
    serviceHref(slug, lang = 'en') {
      return localLink(getService(slug).route, lang);
    },
    contactHref({ area, service, lang = 'en' } = {}) {
      const params = new URLSearchParams({ lang: checkedLanguage(lang) });
      if (area !== undefined && area !== null && area !== '') params.set('area', getArea(area).area);
      if (service !== undefined && service !== null && service !== '') params.set('service', getService(service).slug);
      return `${contactPath}?${params}#${formId}`;
    },
    readContactContext(search = '', languageOverride) {
      if (typeof search !== 'string') throw new TypeError('Expected a URL search string');
      const params = new URLSearchParams(search.split('#', 1)[0]);
      const lang = languageOverride === undefined
        ? normaliseLanguage(params.get('lang'))
        : checkedLanguage(languageOverride);
      // Only exact actual route suffixes are accepted from the untrusted URL.
      const region = byArea.get(params.get('area'));
      const service = region?.services.get(params.get('service')) || services.get(params.get('service'));
      return Object.freeze({
        lang,
        area: region?.area ?? null,
        regionId: region?.id ?? null,
        areaName: region?.names[lang] ?? null,
        service: service?.slug ?? null,
        serviceName: service?.names[lang] ?? null,
      });
    },
  });
}
