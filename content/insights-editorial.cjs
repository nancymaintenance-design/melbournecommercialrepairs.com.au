/* The existing three articles, arranged as a compact editorial shelf. */
const esc = value => String(value).replace(/[&<>"]/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[character]));
const dual = (tag, zh, en, cls = '', attributes = '') => `<${tag}${cls ? ` class="${cls}"` : ''} data-zh="${esc(zh)}" data-en="${esc(en)}" ${attributes}>${esc(zh)}</${tag}>`;

exports.section = function section(articles, slugs) {
  const descriptions = [
    ['将建筑、设备、室外场地和公共区域放在同一份维护清单中。', 'Bring the building, equipment, grounds and shared areas into one maintenance inventory.'],
    ['从玻璃、幕墙、雨棚到高处细部，明确范围与现场作业安排。', 'Define the scope and site arrangements for windows, façades, canopies and high areas.'],
    ['一起核对保留、拆除、修复与新增内容，衔接相关工种。', 'Coordinate what stays, what is removed, what needs repair and what will be added.']
  ];
  const card = index => {
    const article = articles[index], slug = slugs[index];
    return `<article class="ie-card ie-card-${index === 0 ? 'feature' : index === 1 ? 'left' : 'right'}" data-ie-card data-ie-topic="${index}" aria-labelledby="ie-article-${index}">
      <div class="ie-backplate" aria-hidden="true"></div>
      <a class="ie-article" href="/insights/${esc(slug)}/" data-local-page aria-labelledby="ie-article-${index}">
        <div class="ie-cover"><img src="/assets/news-magazine/${esc(slug)}-v1.webp" width="${index === 0 ? 1536 : index === 1 ? 1060 : 1484}" height="${index === 0 ? 1024 : index === 1 ? 1484 : 1060}" alt="" decoding="async" ${index === 0 ? 'fetchpriority="high"' : ''}></div>
        <div class="ie-copy">
          ${dual('p', article.catZh + (index === 0 ? ' / 主推' : ''), article.catEn + (index === 0 ? ' / FEATURED' : ''), 'ie-category')}
          ${dual('h2', article.zh, article.en, 'ie-article-title', `id="ie-article-${index}"`)}
          ${dual('p', descriptions[index][0], descriptions[index][1], 'ie-excerpt')}
          <div class="ie-read">${dual('span', '阅读全文', 'Read the insight')}<span class="ie-arrow" aria-hidden="true">↗</span></div>
        </div>
      </a>
      ${index === 0 ? '<div class="ie-book-spine" aria-hidden="true"></div><span class="ie-fold-shadow" aria-hidden="true"></span><span class="ie-fold" aria-hidden="true"><i></i></span>' : ''}
    </article>`;
  };
  return `<section class="ie-editorial" data-ie-module aria-labelledby="ie-heading">
    <header class="ie-heading">
      <div class="ie-heading-copy"><p class="ie-eyebrow">INSIGHTS / MELBOURNE</p>${dual('h1', '商业物业维护资讯', 'Commercial Property Maintenance Insights', '', 'id="ie-heading"')}</div>
      ${dual('p', '关于商业物业、日常维护和场地更新的实用思路。', 'Practical perspectives on property care, maintenance and commercial spaces.', 'ie-intro')}
    </header>
    <div class="ie-filter-row"><div class="ie-filters" role="group" aria-label="Article categories" data-ie-filters>
      ${dual('button', '全部资讯', 'All insights', 'is-active', 'type="button" data-ie-filter="all" aria-pressed="true"')}
      ${articles.map((article, index) => dual('button', article.catZh, article.catEn, '', `type="button" data-ie-filter="${index}" aria-pressed="false"`)).join('')}
    </div><p class="ie-filter-status" role="status" aria-live="polite" data-ie-status></p></div>
    <div class="ie-shelf" data-ie-shelf>${[0, 1, 2].map(card).join('')}</div>
    <div class="ie-tail"><span></span>${dual('a', '按具体任务了解服务 ↗', 'Explore the relevant services ↗', '', 'href="/services/" data-local-page')}<span></span></div>
  </section>`.replace(/[ \t]+$/gm,'');
};
