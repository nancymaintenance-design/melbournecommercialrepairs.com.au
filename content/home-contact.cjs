const e=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const d=(t,z,n,c='')=>`<${t} class="${c}" data-zh="${e(z)}" data-en="${e(n)}">${e(z)}</${t}>`;
const icon=name=>`<img class="pp-icon" src="/assets/project-process/${name}.svg" alt="" aria-hidden="true" width="32" height="32">`;
exports.section=()=>`<section id="contact" class="section contact-section project-process" aria-labelledby="process-title">
<div class="pp-copy"><p class="eyebrow">07 / <span data-zh="项目咨询" data-en="PROJECT ENQUIRY">项目咨询</span></p>
<h2 id="process-title"><span data-zh="商业物业维修与维护，" data-en="Commercial property maintenance.">商业物业维修与维护，</span><span class="pp-headline-end" data-zh="和我们聊聊您的项目。" data-en="Let’s talk about your property.">和我们聊聊您的项目。</span></h2>
${d('p','一处物业有多项故障时，我们会按位置和影响整理维修清单，把检查、报价和进场接起来。','When one property has several faults, we group them by location and impact, then organise inspections, quotes and access.','pp-intro')}
<div class="pp-tags">${[['wrench','单项维修','One-off repairs'],['stack','多工种项目','Multi-trade projects'],['calendar-blank','定期维护','Ongoing maintenance']].map(([i,z,n])=>`<span>${icon(i)}${d('b',z,n)}</span>`).join('')}</div>
<div class="pp-steps"><img class="pp-connector" src="/assets/project-process/connector.png" alt="" aria-hidden="true" width="1536" height="192">
${[['提交需求','Tell us what needs fixing','我们根据地址、报修情况和照片了解哪些区域受影响。','We use the address, fault details and any photos to identify the affected areas.'],['沟通与报价','Discuss scope & quote','我们安排现场检查，分清可局部维修、需要换件和应另列的工作。','We arrange site checks and set out local repairs, replacements and any separately quoted work.'],['确认安排','Schedule the work','范围确认后，我们协调工种和进场时段，并记录完工情况。','Once the scope is agreed, we book the trades and access window and record the completed work.']].map((x,i)=>`<article class="pp-note pp-note-${i}"><b class="pp-number">0${i+1}</b>${d('h3',x[0],x[1])}${d('p',x[2],x[3])}</article>`).join('')}</div></div>
<aside class="pp-action"><img class="pp-note-shell" src="/assets/project-process/enquiry-note.png" alt="" aria-hidden="true" width="1374" height="1145">
<div class="pp-action-face"><img class="pp-note-arrow" src="/assets/project-process/arrow-up-right.svg" alt="" aria-hidden="true" width="44" height="44">
${d('h3','开始项目咨询','Start an enquiry')}
${d('p','我们核对报修范围，\n确认检查与报价安排。','We review the job and confirm\nwhat we need to inspect and quote.','pp-action-description')}
<a class="pp-submit" href="/contact/" data-local-page>${d('span','填写项目需求','Tell us about your project')}${icon('arrow-up-right')}</a>
${d('p','也可以直接致电或发送邮件','You can also call or email us.','pp-action-note')}</div></aside>
<div class="pp-contact-strip">
<a class="pp-contact-item" href="tel:+61450666876">${icon('phone')}<span>${d('span','直接致电','Call us','pp-contact-label')}<strong>ellis · 0450666876</strong></span></a>
<a class="pp-contact-item" href="mailto:melbournecommercialrepairs.au@outlook.com">${icon('envelope-simple')}<span>${d('span','发送项目资料','Email your project details','pp-contact-label')}<strong>melbournecommercialrepairs.au@<wbr>outlook.com</strong></span></a>
<div class="pp-contact-item">${icon('clock')}<span>${d('span','营业时间','Business hours','pp-contact-label')}${d('strong','周一至周日 9:00–21:00','Monday–Sunday, 9:00 am–9:00 pm')}</span></div>
</div></section>`;


