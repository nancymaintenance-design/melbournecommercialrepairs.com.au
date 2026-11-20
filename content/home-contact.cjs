const e=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const d=(t,z,n,c='')=>`<${t} class="${c}" data-zh="${e(z)}" data-en="${e(n)}">${e(z)}</${t}>`;
const icon=name=>`<img class="pp-icon" src="/assets/project-process/${name}.svg" alt="" aria-hidden="true" width="32" height="32">`;
exports.section=()=>`<section id="contact" class="section contact-section project-process" aria-labelledby="process-title">
<div class="pp-copy"><p class="eyebrow">07 / <span data-zh="项目咨询" data-en="PROJECT ENQUIRY">项目咨询</span></p>
<h2 id="process-title"><span data-zh="商业物业维修与维护，" data-en="Commercial property maintenance.">商业物业维修与维护，</span><span class="pp-headline-end" data-zh="和我们聊聊您的项目。" data-en="Let’s talk about your property.">和我们聊聊您的项目。</span></h2>
${d('p','告诉我们物业位置、需要处理的事项和期望时间，现场照片也可以一起提供。','Tell us where the property is, what needs attention and when you’d like the work done. You can add site photos.','pp-intro')}
<div class="pp-tags">${[['wrench','单项维修','One-off repairs'],['stack','多工种项目','Multi-trade projects'],['calendar-blank','定期维护','Ongoing maintenance']].map(([i,z,n])=>`<span>${icon(i)}${d('b',z,n)}</span>`).join('')}</div>
<div class="pp-steps"><img class="pp-connector" src="/assets/project-process/connector.png" alt="" aria-hidden="true" width="1536" height="192">
${[['提交需求','Tell us what needs fixing','物业位置、维修事项、期望时间，现场照片可选。','Tell us the address, what needs attention and when you’d like it done. Photos are optional.'],['沟通与报价','Discuss scope & quote','我们了解现场情况，确认维修范围和报价。','We look at the site, confirm the scope and prepare a quote.'],['确认安排','Schedule the work','范围确认后，我们安排工种、进场和施工顺序。','Once we agree on the scope, we schedule the trades, access and work.']].map((x,i)=>`<article class="pp-note pp-note-${i}"><b class="pp-number">0${i+1}</b>${d('h3',x[0],x[1])}${d('p',x[2],x[3])}</article>`).join('')}</div></div>
<aside class="pp-action"><img class="pp-note-shell" src="/assets/project-process/enquiry-note.png" alt="" aria-hidden="true" width="1374" height="1145">
<div class="pp-action-face"><img class="pp-note-arrow" src="/assets/project-process/arrow-up-right.svg" alt="" aria-hidden="true" width="44" height="44">
${d('h3','开始项目咨询','Start an enquiry')}
${d('p','把需求告诉我们，\n一起明确下一步安排。','Tell us what needs fixing.\nWe’ll work out the next step with you.','pp-action-description')}
<a class="pp-submit" href="/contact/" data-local-page>${d('span','填写项目需求','Tell us about your project')}${icon('arrow-up-right')}</a>
${d('p','也可以直接致电或发送邮件','You can also call or email us.','pp-action-note')}</div></aside>
<div class="pp-contact-strip">
<a class="pp-contact-item" href="tel:+61450666876">${icon('phone')}<span>${d('span','直接致电','Call us','pp-contact-label')}<strong>ellis · 0450666876</strong></span></a>
<a class="pp-contact-item" href="mailto:melbournecommercialrepairs.au@outlook.com">${icon('envelope-simple')}<span>${d('span','发送项目资料','Email your project details','pp-contact-label')}<strong>melbournecommercialrepairs.au@<wbr>outlook.com</strong></span></a>
<div class="pp-contact-item">${icon('clock')}<span>${d('span','营业时间','Business hours','pp-contact-label')}${d('strong','周一至周日 9:00–21:00','Monday–Sunday, 9:00 am–9:00 pm')}</span></div>
</div></section>`;


