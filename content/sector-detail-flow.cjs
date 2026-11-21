const escapeHtml = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const text = (tag, zh, en, cls = '') =>
  `<${tag}${cls ? ` class="${cls}"` : ''} data-zh="${escapeHtml(zh)}" data-en="${escapeHtml(en)}">${escapeHtml(zh)}</${tag}>`;

const propertyScenes = {
  I01: [
    ['sector-selector/office-interior-v1.webp', 1774, 887],
    ['news-technical/led-manual/lighting-room.webp', 1350, 675],
    ['service-reference-v1/problem-cleaning-bathroom.webp', 1586, 992],
    ['scenes/02-building-interior.webp', 1536, 1024]
  ],
  I02: [
    ['sector-selector/retail-interior-v1.webp', 1774, 887],
    ['news-technical/drain-run.webp', 1100, 733],
    ['design/retail-entrance.webp', 1672, 941],
    ['service-reference-v1/gallery-fit-outs-make-good-work.webp', 1585, 992]
  ],
  I03: [
    ['service-reference-v1/specialist-plumbing-drainage-gas.webp', 1774, 887],
    ['sector-selector/hospitality-interior-v1.webp', 1774, 887],
    ['sector-detail/guest-1200.webp', 1200, 800, '酒店客房及相邻浴室示意', 'Illustration of a hotel guest room and adjoining bathroom'],
    ['design/hospitality.webp', 1672, 941]
  ],
  I04: [
    ['region-reference-v3/detail-roof.webp', 1536, 1024],
    ['sector-detail/loading-1200.webp', 1200, 800, '仓库装卸平台及车辆通道示意', 'Illustration of a warehouse loading apron and vehicle access'],
    ['service-reference-v1/problem-electrical-warehouse.webp', 1586, 992],
    ['sector-selector/warehouse-interior-v1.webp', 1774, 887]
  ],
  I05: [
    ['ellis-regions-v2/industrial.webp', 1536, 1024],
    ['sector-detail/hardstand-1200.webp', 1200, 800, '工业园区硬地及车辆通道示意', 'Illustration of an industrial hardstand and vehicle access'],
    ['sector-selector/industrial-interior-v1.webp', 1774, 887],
    ['region-reference-v3/scene-south-east.webp', 1254, 1254]
  ],
  I06: [
    ['sector-selector/medical-interior-v1.webp', 1774, 887],
    ['region-reference-v3/detail-lighting.webp', 1536, 1024],
    ['region-reference-v3/scene-north-east.webp', 1536, 1024],
    ['region-reference-v3/detail-garden.webp', 1536, 1024]
  ],
  I08: [
    ['sector-selector/common-interior-v1.webp', 1774, 887],
    ['ellis-regions-v2/carpark.webp', 1536, 1024],
    ['region-reference-v3/clipboard.webp', 1254, 1254],
    ['service-reference-v1/gallery-cleaning-public-after-v2.webp', 1902, 827]
  ]
};

const campus = [
  ['cutaway', '空间示意', 'Interior illustration', '教室、教职员共用空间及洗手间剖面', 'Cutaway showing a classroom, staff common room and amenities'],
  ['entry', '场地与动线示意', 'Site and access illustration', '学校场地的入口、围栏、步道和绿化', 'School grounds showing the entrance, fencing, path and planting'],
  ['refit', '施工场景示意', 'Refurbishment illustration', '设有地面保护及待安装材料的教室施工场景', 'Classroom refurbishment with floor protection and staged materials'],
  ['hall', '社区场景示意', 'Community facilities illustration', '设有活动座席和公共厨房的社区礼堂', 'Community hall with event seating and a shared kitchenette']
];

const hotspots = [
  [
    [49, 18, 47, 31, '墙面', 'Walls', '教室和教职员休息室的墙面维修。', 'Wall repairs in classrooms and staff rooms.'],
    [61, 40, 62, 49, '门', 'Doors', '我们按楼栋记录受影响的门和通行安排。', 'We record affected doors and access arrangements by building.'],
    [36, 74, 42, 66, '地板', 'Flooring', '我们按使用区域确认地板维修和复查项目。', 'We identify flooring repairs and checks by area of use.'],
    [84, 76, 79, 66, '设施', 'Fixtures', '我们结合洗手间使用时段安排设施维修。', 'We schedule fixture repairs around when the washrooms are in use.']
  ],
  [
    [59, 31, 54, 45, '入口', 'Entrance', '我们核对入校和活动动线，再确定入口维修范围。', 'We check school and event access routes before confirming the entrance repairs.'],
    [18, 69, 18, 82, '围栏', 'Fencing', '我们确认场地围栏的维护范围。', 'We confirm which sections of boundary fencing need maintenance.'],
    [68, 70, 64, 82, '步道', 'Paths', '我们结合现场通行安排步道维护。', 'We plan path maintenance around site access.'],
    [18, 43, 21, 57, '绿化', 'Planting', '我们把周边绿化纳入场地养护范围。', 'We include nearby planting in the grounds maintenance scope.']
  ]
];

const steps = [
  ['范围确认', 'Confirm the scope'],
  ['材料与工种衔接', 'Coordinate materials and trades'],
  ['施工安排', 'Schedule the work'],
  ['复查与交还', 'Review and hand back']
];

function campusHotspots(index) {
  const points = hotspots[index];
  if (!points) return '';
  const route = index === 1 ? '<path class="sector-flow-route" pathLength="1" d="M77 98 L60 85 L56 73 L54 62 L54 45"/>' : '';
  return `<svg class="sector-flow-markup" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${route}${points.map(([x,y,px,py], n) =>
    `<g class="sector-flow-pin" data-scene-pin="${n}" style="--pin-order:${n}"><line x1="${x}" y1="${y}" x2="${px}" y2="${py}" vector-effect="non-scaling-stroke"></line><circle cx="${px}" cy="${py}" r="1.25"></circle></g>`).join('')}</svg>
    ${points.map(([x,y, , ,zh,en], n) =>
      `<button class="sector-flow-hotspot" type="button" disabled data-scene-label="${n}" style="--x:${x}%;--y:${y}%;--pin-order:${n}" aria-expanded="false" aria-controls="scene-note-${index}-${n}">${text('span',zh,en)}</button>`).join('')}`;
}

function campusNotes(index) {
  return (hotspots[index] || []).map(([, , , , , , zh, en], n) =>
    `<p class="sector-flow-note" id="scene-note-${index}-${n}" hidden>${text('span', zh, en)}</p>`).join('');
}

function figure(images, index, school) {
  const item = images[index];
  const [filename, width, height, altZh = '', altEn = ''] = school
    ? [`sector-detail/${item[0]}-1200.webp`, 1200, index === 0 ? 900 : 800, item[3], item[4]]
    : item;
  const [captionZh, captionEn] = school ? [item[1], item[2]] : ['场景示意', 'Scene illustration'];
  const source = `/assets/${filename}`;
  const responsive = filename.startsWith('sector-detail/')
    ? ` srcset="${source.replace('-1200.webp','-600.webp')} 600w, ${source} 1200w" sizes="(max-width: 760px) 96vw, (max-width: 1500px) 65vw, 980px"`
    : '';
  return `<figure class="sector-flow-scene" data-flow-art>
    <div class="sector-flow-scene-inner">
      <img src="${source}"${responsive} width="${width}" height="${height}" alt="${escapeHtml(altZh)}"${altZh ? ` data-alt-zh="${escapeHtml(altZh)}" data-alt-en="${escapeHtml(altEn)}"` : ''} loading="lazy" decoding="async">${school ? campusHotspots(index) : ''}
    </div>
    ${text('figcaption', captionZh, captionEn)}${school ? campusNotes(index) : ''}
  </figure>`;
}

function schoolTimeline(links) {
  return `<div class="sector-flow-timeline"><ol>${steps.map(([zh,en], n) =>
    `<li data-flow-step><span class="sector-flow-step-number" aria-hidden="true">0${n+1}</span>${text('strong',zh,en)}
      <span class="sector-flow-step-art" style="--prop-position:${n * 100 / (steps.length - 1)}%" aria-hidden="true"></span></li>`).join('')}</ol>${links}</div>`;
}

function schoolCalendar() {
  return `<div class="sector-flow-calendar">
    <svg aria-hidden="true" viewBox="0 0 48 48"><rect x="4" y="9" width="40" height="35" rx="5"/><path d="M14 4v11M34 4v11M4 21h40M14 28v3M24 28v3M34 28v3M14 35v3M24 35v3M34 35v3"/></svg>
    ${text('strong','围绕活动日历安排','Work around the event calendar')}
  </div>`;
}

module.exports = function sectorDetail(topic, getLinks) {
  const school = topic.id === 'I07';
  const images = school ? campus : propertyScenes[topic.id];
  const nav = `<nav class="sector-flow-nav" aria-label="本页栏目" data-aria-label-zh="本页栏目" data-aria-label-en="On this page">
    ${topic.sections.map((s,i)=>`<a href="#scope-${i+1}"${i === 0 ? ' aria-current="location"' : ''}><span class="sector-flow-nav-number" aria-hidden="true">0${i+1}</span>${text('span',s.h2Zh,s.h2En)}</a>`).join('')}
  </nav>`;
  const chapters = topic.sections.map((s, i) => {
    const title = `<div class="sector-flow-title"><span class="sector-flow-number" aria-hidden="true">0${i+1}</span>${text('h2',s.h2Zh,s.h2En)}</div>`;
    const copy = `<div class="sector-flow-copy">${text('p',s.zh,s.en)}${s.subsections.map(sub =>
       `<div class="scope-subsection">${text('h3',sub.h3Zh,sub.h3En)}${text('p',sub.zh,sub.en)}</div>`).join('')}${school && i === 3 ? schoolCalendar() : ''}</div>`;
    const links = getLinks(i, 'sector-flow-links');
    const scene = figure(images, i, school);
    const layout = [
      `${title}${copy}${scene}${links}`,
      `${title}${copy}${scene}${links}`,
      `${title}${copy}${scene}${school ? schoolTimeline(links) : links}`,
      `${title}${scene}${copy}${links}`
    ][i];
    return `<section id="scope-${i+1}" tabindex="-1" class="sector-flow-chapter sector-flow-chapter-${i+1}"><div class="sector-flow-wrap">${layout}</div></section>`;
  }).join('');
  const faq = `<a class="sector-flow-faq" href="#questions">${text('span','项目常见问题','Project FAQs')}<span aria-hidden="true">↓</span></a>`;
  return `<div class="sector-flow${school ? ' sector-flow-education' : ''}">${nav}${chapters}${faq}</div>`;
};
