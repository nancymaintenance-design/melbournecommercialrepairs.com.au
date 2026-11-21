/* About-only company identity. Public facts remain owned by business.json. */
const escape=value=>String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const dual=(tag,zh,en,cls='')=>`<${tag}${cls?` class="${cls}"`:''} data-zh="${escape(zh)}" data-en="${escape(en)}">${escape(zh)}</${tag}>`;
const icon=name=>`<img src="/assets/${name==='calendar-blank'?'project-process':'sector-selector/icons'}/${name}.svg" width="32" height="32" alt="" aria-hidden="true">`;
const date=(iso,locale)=>new Intl.DateTimeFormat(locale,{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(iso+'T00:00:00Z'));
exports.section=business=>{
 const nameLines=business.legalName==='ELLIS SERVICES GROUP PTY LTD'?business.legalName.match(/ELLIS|SERVICES|GROUP|PTY LTD/g):[business.legalName];
 const fields=[
  ['status','shield-check','ABN 状态','ABN status',business.abnStatus==='Active'?'有效':business.abnStatus,business.abnStatus],
  ['active-date','calendar-blank','ABN 登记日期','ABN registration date',date(business.activeFrom,'zh-CN'),date(business.activeFrom,'en-AU')],
  ['gst','stack','GST 状态','GST status',business.gstFrom?'已登记':'未登记',business.gstFrom?'Registered':'Not registered'],
  ['gst-date','calendar-blank','GST 登记日期','GST registration date',date(business.gstFrom,'zh-CN'),date(business.gstFrom,'en-AU')],
  ['type','buildings','公司类型','Company type',business.entityType==='Australian Private Company'?'澳大利亚私人公司':business.entityType,business.entityType],
  ['region','house-line','主要经营登记地区','Principal business region',business.registeredRegion,business.registeredRegion]
 ];
 return `<section class="ap-identity" id="company-registration" aria-labelledby="identity-title" data-entrance data-company-identity>
  <div class="ai-surface">
   <div class="ai-visual" data-identity-visual>
    <p class="ai-kicker">COMPANY IDENTITY</p>
    <h2 class="ai-name" id="identity-title">${nameLines.map((line,i)=>`<span class="ai-name-line" style="--identity-order:${i}">${escape(line)}</span>`).join('\n')}</h2>
    <div class="ai-seal" aria-hidden="true"><img class="ai-seal-image" src="/assets/about-identity/registration-badge.png" width="768" height="768" alt="" decoding="async" loading="lazy"><span class="ai-seal-top">VERIFIED</span><span class="ai-seal-bottom">ABN RECORD</span></div>
    <span class="ai-signature" aria-hidden="true"></span>
    <span class="ai-diagonal" aria-hidden="true"></span>
   </div>
   <div class="ai-records">
    <dl class="ai-numbers"><div class="ai-number ai-abn"><dt>ABN</dt><dd>${escape(business.abn)}</dd></div><div class="ai-number ai-acn"><dt>ACN</dt><dd>${escape(business.acn)}</dd></div></dl>
    <dl class="ai-fields">${fields.map(([key,svg,zh,en,valueZh,valueEn])=>`<div class="ai-field ai-field-${key}"><dt><span class="ai-field-icon" aria-hidden="true">${icon(svg)}</span>${dual('span',zh,en)}</dt>${dual('dd',valueZh,valueEn)}</div>`).join('')}</dl>
    <nav class="ai-actions" aria-label="公司登记与服务地区" data-aria-label-zh="公司登记与服务地区" data-aria-label-en="Company registration and service area links"><a class="ai-verify" href="${escape(business.registerUrl)}" target="_blank" rel="noopener noreferrer">${dual('span','官方 ABN 登记资料','ABN Lookup record')}<img src="/assets/sector-selector/icons/arrow-up-right.svg" width="25" height="25" alt="" aria-hidden="true"></a><a class="ai-area" href="/areas/melbourne/" data-local-page>${dual('span','墨尔本服务地区','Melbourne service area')}<img src="/assets/sector-selector/icons/arrow-up-right.svg" width="24" height="24" alt="" aria-hidden="true"></a></nav>
   </div>
   <span class="ai-edge-light" aria-hidden="true"></span>
  </div>
  <div class="ai-footnotes">${dual('p','我们于 '+date(business.verifiedOn,'zh-CN')+' 核对登记资料','We checked the registration details on '+date(business.verifiedOn,'en-AU'),'ai-checked')}<a href="${escape(business.mapsUrl)}" target="_blank" rel="noopener noreferrer" data-zh="查看商家地图 ↗" data-en="View our location on Google Maps ↗">查看商家地图 ↗</a></div>
 </section>`;
};
