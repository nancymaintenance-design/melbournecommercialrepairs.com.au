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
   <article class="ap-intro-card"><div class="ap-intro-inner">${dual('p','我们是谁','WHO WE ARE','ap-label')}${dual('h2','多工种协作，一个项目团队。','One team to coordinate your trades.','ap-intro-heading')}${dual('p','我们为墨尔本商业物业提供建筑、楼宇设备及室内外场地维护。','We maintain buildings, equipment and grounds for commercial properties across Melbourne.','ap-intro-copy')}${dual('p','单项维修、商业翻新和定期维护都可以安排。我们明确施工范围、协调各工种，并与物业方对接进场和完工交接。','We handle one-off repairs, refurbishments and planned maintenance. We agree on the scope with you, arrange the trades and coordinate access through to handover.','ap-intro-copy')}
    <nav class="ap-service-groups" aria-label="Company service groups">${groups.map(([slug,zh,en,label],i)=>`<a href="/services/${slug}/" data-local-page class="ap-service-group ap-service-group-${i}">${dual('span',zh,en)}<small>${label}</small></a>`).join('')}</nav>
    <div class="ap-registration-summary"><h3>${escape(business.legalName)}</h3><p><span>ABN ${escape(business.abn)}</span><span>ACN ${escape(business.acn)}</span><span>${escape(business.registeredRegion)}</span></p><a href="${escape(business.registerUrl)}" target="_blank" rel="noopener noreferrer" data-zh="公司登记详情 ↗" data-en="Company registration details ↗">公司登记详情 ↗</a></div>
   </div></article>
   <aside class="ap-insurance-band" aria-label="$20M Public Liability Insurance"><strong class="ap-insurance-amount">$20M</strong><div class="ap-insurance-copy"><strong>Public Liability Insurance</strong>${dual('span','2,000 万澳元公众责任险','Public liability cover of $20 million','ap-insurance-zh')}</div><a class="ap-contact-link" href="/contact/" data-local-page data-zh="联系 ELLIS ↗" data-en="Contact ELLIS ↗">联系 ELLIS ↗</a></aside>
   <div class="ap-secondary-info"></div>
   ${require('./about-identity.cjs').section(business)}
  </div>
 </section>`;
};
