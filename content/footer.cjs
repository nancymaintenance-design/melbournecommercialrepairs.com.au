/* Shared footer: business facts and actual destinations, independent of the enquiry strip. */
const e=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const dual=(tag,zh,en,cls='')=>`<${tag}${cls?` class="${cls}"`:''} data-zh="${e(zh)}" data-en="${e(en)}">${e(zh)}</${tag}>`;
const svg=(content,cls='')=>`<svg${cls?` class="${cls}"`:''} viewBox="0 0 48 48" aria-hidden="true">${content}</svg>`;
const icons={
 instagram:svg('<rect x="5" y="5" width="38" height="38" rx="11"/><circle cx="24" cy="24" r="9"/><circle class="instagram-dot" cx="35" cy="13" r="2"/>','social-icon'),
 facebook:svg('<circle fill="#087eff" cx="24" cy="24" r="23"/><path fill="#fff" d="M28 46V28h6l1-8h-7v-4c0-2 1-3 4-3h4V6c-1 0-4-1-6-1-7 0-11 4-11 11v4h-6v8h6v18Z"/>','social-icon'),
 google:svg('<path fill="#4285f4" d="M46 24c0-1.5-.1-3-.4-4H24v9h12.5a11 11 0 0 1-4.6 6.4l7.3 5.6C43.5 37 46 31.1 46 24Z"/><path fill="#34a853" d="M24 47c6.2 0 11.4-2 15.2-6l-7.3-5.6c-2 1.3-4.5 2.1-7.9 2.1-6 0-11-4-12.8-9.3l-7.6 5.9A23 23 0 0 0 24 47Z"/><path fill="#fbbc05" d="M11.2 28.2a14 14 0 0 1 0-8.4L3.6 14A23 23 0 0 0 1 24c0 3.6.9 7 2.6 10.1Z"/><path fill="#ea4335" d="M24 10.5c3.5 0 6.5 1.2 9 3.5l6.7-6.5A22.6 22.6 0 0 0 24 1 23 23 0 0 0 3.6 14l7.6 5.8C13 14.5 18 10.5 24 10.5Z"/>','social-icon'),
 linkedin:svg('<rect x="1" y="1" width="46" height="46" rx="7" fill="#087fbc"/><path fill="#fff" d="M10 19h7v21h-7Zm3.5-11a4 4 0 1 1 0 8 4 4 0 0 1 0-8ZM21 19h7v3c1-2 3-4 6-4 7 0 8 4 8 10v12h-7V29c0-3 0-5-3-5s-4 2-4 5v11h-7Z"/>','social-icon'),
 pin:svg('<path fill="#ff7200" d="M24 46S6 27.4 6 18a18 18 0 1 1 36 0c0 9.4-18 28-18 28Z"/><circle fill="#201c17" cx="24" cy="18" r="6"/>'),
 shield:svg('<path d="m24 4 18 8v12c0 10-18 20-18 20S6 34 6 24V12Z"/><path d="m14 24 6 6 14-14"/>')};
const groups=[
 ['探索 ELLIS','Explore ELLIS','Explore Ellis',[
 ['/services/','服务内容','Services'],['/sectors/','商业种类','Property sectors'],['/areas/melbourne/','服务地区','Service areas'],['/about/','关于我们','About us'],['/insights/','新闻与资讯','News & insights']]],
 ['服务入口','Our services','Service links',[
 ['/services/building-maintenance/','建筑与日常维修','Building maintenance'],['/services/hvac-building-systems/','空调与设备系统','HVAC & building systems'],['/services/electrical-lighting/','商业电气与照明','Electrical & lighting'],['/services/plumbing-drainage-gas/','水管、排水与燃气','Plumbing, drainage & gas'],['/services/landscaping-irrigation/','园林与外部环境','Landscaping & grounds']]],
 ['项目与支持','Project support','Project support',[
 ['/contact/','项目咨询 ↗','Project enquiry ↗'],['/faq/','常见问题','FAQs'],['/privacy/','隐私说明','Privacy information']]]];
const platforms=[
 ['instagram','Instagram','查看动态','Our latest updates','https://www.instagram.com/elliservices_group/'],
 ['facebook','Facebook','关注我们','Follow our work','https://www.facebook.com/p/Ellis-Services-Group-100082926022259/'],
 ['google','Google Reviews','查看客户评价','Read customer reviews','https://maps.app.goo.gl/FtP6ee7x1Ra4KX4z8'],
 ['linkedin','LinkedIn','公司主页','Our company profile','https://www.linkedin.com/in/ellis-services-group-091541266/']];
module.exports=business=>`<footer class="site-footer melbourne-footer footer-brand-panel" id="site-footer">
 <div class="footer-columns"><div class="footer-company">
 <a href="/" class="brand footer-brand" aria-label="Ellis Services Group home"><img class="brand-logo" src="/assets/ellis-services-logo.png" alt="" width="512" height="512"><span class="brand-name">ELLIS<span>SERVICES GROUP</span></span></a>
 ${dual('h2','墨尔本商业物业维修与维护','Commercial property care in Melbourne')}
 ${dual('p','建筑、设备与室外场地，统筹安排。','Coordinated work for buildings, systems and grounds.')}
 <a class="footer-address" href="${e(business.mapsUrl)}" target="_blank" rel="noopener noreferrer">${icons.pin}<span>459 Collins Street, Melbourne, VIC 3000</span></a>
 <span class="footer-insurance">${icons.shield}<span>$20M Public Liability Insurance</span></span></div>
 ${groups.map(([zh,en,label,links])=>`<nav aria-label="${label}">${dual('h3',zh,en)}${links.map(([href,z,h])=>`<a href="${href}" data-zh="${e(z)}" data-en="${e(h)}">${e(z)}</a>`).join('')}</nav>`).join('')}
 <span class="footer-etch" aria-hidden="true">ELLIS</span></div>
 <div class="footer-social-heading"><span aria-hidden="true">//</span>${dual('h3','在这里找到 ELLIS','Find ELLIS here')}<i aria-hidden="true"></i></div>
 <div class="footer-socials">${platforms.map(([key,name,zh,en,href])=>`<a class="footer-social footer-${key}" href="${href}" target="_blank" rel="noopener noreferrer">${icons[key]}<span class="social-copy"><strong>${name}</strong>${dual('span',zh,en)}</span><span class="social-arrow" aria-hidden="true">↗</span></a>`).join('')}</div>
 <div class="footer-bottom"><span>© <span id="year">2026</span> Ellis Services Group</span><a class="footer-legal" href="${e(business.registerUrl)}" target="_blank" rel="noopener noreferrer">${e(business.legalName)} · ABN ${e(business.abn)}</a><a class="footer-to-top" href="#main" aria-label="Back to top">↑</a></div>
</footer>`;
