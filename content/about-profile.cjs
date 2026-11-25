/* Dedicated company profile. Keep public company facts supplied by business.json. */
const escape=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const dual=(tag,zh,en,cls='')=>`<${tag}${cls?` class="${cls}"`:''} data-zh="${escape(zh)}" data-en="${escape(en)}">${escape(zh)}</${tag}>`;
exports.section=business=>{
 const groups=[
  ['building-maintenance','建筑与日常维修','Building & general maintenance','BUILDINGS'],
  ['hvac-building-systems','空调与设备系统','HVAC & building systems','SYSTEMS'],
  ['landscaping-irrigation','园林、标识与清洁','Grounds, signage & cleaning','GROUNDS']
 ];
 return `<section class="ap-profile" aria-labelledby="ap-heading" data-about-profile>
  <header class="ap-heading-row"><div><p class="ap-eyebrow">ABOUT / MELBOURNE</p>${dual('h1','关于 Ellis Services Group','About Ellis Services Group','ap-heading').replace('<h1','<h1 id="ap-heading"')}</div><p class="ap-motto">ONE GROUP.<br>MANY TRADES.</p></header>
  <div class="ap-canvas">
   <div class="ap-brand-card" aria-label="Ellis Services Group"><img src="/assets/ellis-services-logo.png" width="512" height="512" alt="Ellis Services Group" class="ap-original-logo"><div class="ap-brand-name"><span>ELLIS</span><strong>SERVICES GROUP</strong></div><p>MELBOURNE / COMMERCIAL PROPERTY SERVICES</p></div>
   <article class="ap-intro-card"><div class="ap-intro-inner">${dual('p','我们是谁','WHO WE ARE','ap-label')}${dual('h2','多工种协作，一个项目团队。','One team to coordinate your trades.','ap-intro-heading')}${dual('p','我们为墨尔本的办公楼、商铺、仓库和共用区域维修建筑、设备与室外设施。','We repair buildings, equipment and outdoor facilities for Melbourne offices, shops, warehouses and common areas.','ap-intro-copy')}${dual('p','单项故障、退租恢复和计划维护都由我们按现场安排。从检查和分项报价，到进场协调和完工记录，物业方可与我们对接。','We organise one-off repairs, end-of-lease make good and planned maintenance. We work with your property team from inspection and itemised quote through to site access and handover.','ap-intro-copy')}
    <nav class="ap-service-groups" aria-label="Company service groups">${groups.map(([slug,zh,en,label],i)=>`<a href="/services/${slug}/" data-local-page class="ap-service-group ap-service-group-${i}">${dual('span',zh,en)}<small>${label}</small></a>`).join('')}</nav>
    <div class="ap-registration-summary"><h3>${escape(business.legalName)}</h3><p><span>ABN ${escape(business.abn)}</span><span>ACN ${escape(business.acn)}</span><span>${escape(business.registeredRegion)}</span></p><a href="${escape(business.registerUrl)}" target="_blank" rel="noopener noreferrer" data-zh="公司登记详情 ↗" data-en="Company registration details ↗">公司登记详情 ↗</a></div>
   </div></article>
   <aside class="ap-insurance-band" aria-label="$20M Public Liability Insurance"><strong class="ap-insurance-amount">$20M</strong><div class="ap-insurance-copy"><strong>Public Liability Insurance</strong>${dual('span','2,000 万澳元公众责任险','Public liability cover of $20 million','ap-insurance-zh')}</div><a class="ap-contact-link" href="/contact/" data-local-page data-zh="联系 ELLIS ↗" data-en="Contact ELLIS ↗">联系 ELLIS ↗</a></aside>
   <div class="ap-secondary-info"></div>
   ${require('./about-identity.cjs').section(business)}
  </div>
 </section>`;
};
