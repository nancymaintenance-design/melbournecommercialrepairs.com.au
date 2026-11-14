/* Dedicated company profile. Keep public company facts supplied by business.json. */
const escape=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const dual=(tag,zh,en,cls='')=>`<${tag}${cls?` class="${cls}"`:''} data-zh="${escape(zh)}" data-en="${escape(en)}">${escape(zh)}</${tag}>`;
exports.section=(business,registration)=>{
 const groups=[
  ['building-maintenance','建筑与日常维修','Building & general maintenance','BUILDINGS'],
  ['hvac-building-systems','空调与设备系统','HVAC & building systems','SYSTEMS'],
  ['landscaping-irrigation','园林、标识与清洁','Grounds, signage & cleaning','GROUNDS']
 ];
 return `<section class="ap-profile" aria-labelledby="ap-heading" data-about-profile>
  <header class="ap-heading-row"><div><p class="ap-eyebrow">ABOUT / MELBOURNE</p>${dual('h1','关于 Ellis Services Group','About Ellis Services Group','ap-heading').replace('<h1','<h1 id="ap-heading"')}</div><p class="ap-motto">ONE GROUP.<br>MANY TRADES.</p></header>
  <div class="ap-canvas">
   <div class="ap-brand-card" aria-label="Ellis Services Group"><img src="/assets/ellis-services-logo.png" width="512" height="512" alt="Ellis Services Group" class="ap-original-logo"><div class="ap-brand-name"><span>ELLIS</span><strong>SERVICES GROUP</strong></div><p>MELBOURNE / COMMERCIAL PROPERTY SERVICES</p></div>
   <article class="ap-intro-card"><div class="ap-intro-inner">${dual('p','我们是谁','WHO WE ARE','ap-label')}${dual('h2','多种专业，统一协作。','Many trades. One coordinated team.','ap-intro-heading')}${dual('p','我们为墨尔本商业物业提供建筑维修、设备系统与室内外环境维护。','We coordinate building repairs, building systems and indoor and outdoor maintenance for commercial properties in Melbourne.','ap-intro-copy')}${dual('p','从单项维修、商业翻新到持续维护计划，我们根据现场需求明确工作范围，安排对应施工人员，衔接现场沟通、施工安排与完工交付。','From one-off repairs and commercial refurbishment to ongoing maintenance, we define the scope around your site, coordinate the relevant trades, and connect site communication, work scheduling and handover.','ap-intro-copy')}
    <nav class="ap-service-groups" aria-label="Company service groups">${groups.map(([slug,zh,en,label],i)=>`<a href="/services/${slug}/" data-local-page class="ap-service-group ap-service-group-${i}">${dual('span',zh,en)}<small>${label}</small></a>`).join('')}</nav>
    <div class="ap-registration-summary"><h3>${escape(business.legalName)}</h3><p><span>ABN ${escape(business.abn)}</span><span>ACN ${escape(business.acn)}</span><span>${escape(business.registeredRegion)}</span></p><a href="${escape(business.registerUrl)}" target="_blank" rel="noopener noreferrer" data-zh="公司登记详情 ↗" data-en="Company registration details ↗">公司登记详情 ↗</a></div>
   </div></article>
   <aside class="ap-insurance-band" aria-label="$20M Public Liability Insurance"><strong class="ap-insurance-amount">$20M</strong><div class="ap-insurance-copy"><strong>Public Liability Insurance</strong>${dual('span','2000万澳币公众责任险','Public liability cover of $20 million','ap-insurance-zh')}</div><a class="ap-contact-link" href="/contact/" data-local-page data-zh="联系 ELLIS ↗" data-en="Contact ELLIS ↗">联系 ELLIS ↗</a></aside>
   <div class="ap-secondary-info"></div>
   <details class="ap-registration-details"><summary>${dual('span','查看完整公司登记资料','View full company registration')}<span class="ap-details-mark" aria-hidden="true">+</span></summary><div class="ap-registration-content">${registration}${dual('p','我们的服务面向墨尔本。主要经营登记地区为 VIC 3030；该公开记录未列出街道地址。','Our services are for Melbourne. The public register lists VIC 3030 as the main business location and does not publish a street address.','ap-register-note')}<a href="${escape(business.mapsUrl)}" class="ap-map-link" target="_blank" rel="noopener noreferrer" data-zh="查看商家地图 ↗" data-en="View business map ↗">查看商家地图 ↗</a></div></details>
  </div>
 </section>`;
};
