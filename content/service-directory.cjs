const e=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const dual=(tag,zh,en,cls='')=>`<${tag}${cls?` class="${cls}"`:''} data-zh="${e(zh)}" data-en="${e(en)}">${e(zh)}</${tag}>`;
const groups=[
  {zh:'建筑维护',en:'Building care',title:['建筑维护','Building care'],desc:['墙体 · 门窗 · 吊顶 · 地面','Walls · Doors · Ceilings · Floors'],image:'/assets/design/interior-room.webp',service:0,theme:'building'},
  {zh:'设备系统',en:'Building systems',title:['设备系统','Building systems'],desc:['空调 · 水电 · 消防 · 安防','HVAC · Electrical · Plumbing · Security'],image:'/assets/design/hvac-unit.webp',service:4,theme:'systems'},
  {zh:'环境配套',en:'Grounds & exterior',title:['环境配套','Grounds & exterior'],desc:['园林 · 清洁 · 标识 · 室外维护','Landscaping · Cleaning · Signage · External works'],image:'/assets/service-showcase/garden-irrigation.webp',service:6,theme:'grounds'}
];
const groupFor=i=>[0,1,11].includes(i)?0:[2,3,4,5].includes(i)?1:2;
exports.section=function(services,slugs,zh,en){
  const intro=['按物业的具体需求选择服务。单项维修、定期维护与多工种工程均可按现场情况统筹安排。','Choose services for your property’s needs. We coordinate one-off repairs, ongoing maintenance and multi-trade works around the site.'];
  return `<section id="page-content" class="service-directory" data-service-directory data-active-group="2" aria-labelledby="directory-heading">
    <div class="directory-heading"><div><p class="eyebrow" data-zh="我们的服务 / MELBOURNE" data-en="OUR SERVICES / MELBOURNE">我们的服务 / MELBOURNE</p>${dual('h1',zh,en).replace('<h1 ','<h1 id="directory-heading" ')}${dual('p',...intro,'directory-intro')}</div><div class="directory-controls"><div class="directory-tabs" role="group" aria-label="Service groups">${groups.map((g,i)=>`<button type="button" data-directory-group="${i}" aria-pressed="${i===2}" aria-controls="directory-card-${i}">${dual('span',g.zh,g.en)}</button>`).join('')}</div><span class="directory-phase" aria-hidden="true"><b data-directory-phase>03</b> / 03</span></div></div>
    <div class="directory-layout"><div class="directory-theatre" aria-label="Building, systems and grounds">
      ${groups.map((g,i)=>`<a id="directory-card-${i}" class="directory-card directory-${g.theme}${i===2?' is-front':''}" href="/services/${slugs[g.service]}/" data-local-page data-directory-card="${i}"><div class="directory-card-surface"></div><div class="directory-model"><img src="${g.image}" alt="" width="1536" height="1024" fetchpriority="high"></div><div class="directory-card-copy">${dual('h2',...g.title)}${dual('p',...g.desc)}</div><span class="directory-card-arrow" aria-hidden="true">↗</span></a>`).join('')}
    </div><aside class="directory-catalog" aria-labelledby="directory-list-heading"><h2 id="directory-list-heading"><b>12</b>${dual('span','全部服务','SERVICES')}</h2><nav class="directory-service-list" aria-labelledby="directory-list-heading">${services.map((s,i)=>`<a href="/services/${slugs[i]}/" data-local-page data-directory-service="${i}" data-service-group="${groupFor(i)}"${groupFor(i)===2?' class="in-active-group"':''}><span class="directory-index">${String(i+1).padStart(2,'0')}</span>${dual('span',s.zh,s.en,'directory-service-name')}<span aria-hidden="true">→</span></a>`).join('')}</nav><a class="directory-enquire" href="/contact/" data-local-page data-zh="咨询墨尔本项目 ↗" data-en="Discuss your Melbourne project ↗">咨询墨尔本项目 ↗</a></aside></div>
  </section>`;
};
