function urlLanguage(searchParams) {
  return searchParams.getAll('lang').findLast(value => value === 'en' || value === 'zh') || 'en';
}

module.exports = {urlLanguage};
