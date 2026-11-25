const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const dual = (tag, zh, en, extra='') => `<${tag} ${extra} data-zh="${escape(zh)}" data-en="${escape(en)}">${escape(zh)}</${tag}>`;

// Homepage only. The full FAQ page keeps its existing question bank.
const questions = [
  {
    question:['多个工种，能一起安排吗？','Can you coordinate several trades?'],
    title:['一个项目，协调对应工种。','One project. Coordinated trades.'],
    answer:['可以。漏水和受损吊顶涉及不同工种时，我们先安排查找漏源，再把修漏和吊顶恢复列进同一份工作清单。','Yes. For a leak and damaged ceiling, we arrange the leak investigation first, then put the repair and ceiling reinstatement on one work list.'],
    steps:[['确认范围','Define the scope'],['安排工种','Coordinate trades'],['明确进场','Plan site access']]
  },
  {
    question:['营业期间，如何安排施工？','How do you work around business hours?'],
    title:['我们按您的营业安排施工。','We schedule work around your operations.'],
    answer:['我们把营业区、顾客入口和收货通道分开安排。需要临时停用的位置和时段，我们会在施工前与物业方确认。','We plan separate work areas around trading, customer entrances and deliveries. We agree with your property team on any temporary closure before work begins.'],
    steps:[['了解现场','Review the site'],['划分作业区','Agree on work zones'],['确认时段','Confirm timing']]
  },
  {
    question:['单次维修还是长期维护？','One-off repairs or ongoing maintenance?'],
    title:['单次维修与持续维护，都能安排。','One-off repairs and ongoing maintenance.'],
    answer:['两种都可以。我们可先处理一项故障，也可按物业的设备清单和使用情况安排定期检查、保养和维修。','Both. We can fix a one-off fault or use your equipment register and site usage to plan regular inspections, servicing and repairs.'],
    steps:[['梳理需求','Review your needs'],['明确工作','Define the work'],['安排维护','Plan maintenance']]
  }
];

function section(){
  return `<section id="faq" class="section home-faq-fold" aria-labelledby="home-faq-heading">
    <header class="hf-heading"><div><p class="hf-eyebrow"><span>05 /</span> ${dual('span','项目问答','PROJECT QUESTIONS')}</p>${dual('h2','我们如何安排维修','How we arrange repairs','id="home-faq-heading"')}</div>${dual('a','查看全部 FAQ ↗','View all FAQs ↗','class="hf-all" href="/faq/"')}</header>
    <div class="hf-stage" data-active="0"><div class="hf-backplate" aria-hidden="true"></div>
      <div class="hf-tabs" role="tablist" aria-label="项目问答" data-aria-label-zh="项目问答" data-aria-label-en="Project FAQs">${questions.map((q,i)=>`<button type="button" class="hf-tab${i===0?' is-selected':''}" id="hf-tab-${i}" role="tab" aria-controls="hf-answer-${i}" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-hf-index="${i}"><span class="hf-tab-number" aria-hidden="true">0${i+1}</span>${dual('span',...q.question)}<span class="hf-mobile-symbol" aria-hidden="true">+</span></button>`).join('')}</div>
      <div class="hf-paper">${questions.map((q,i)=>`<div class="hf-answer" id="hf-answer-${i}" role="tabpanel" aria-labelledby="hf-tab-${i}" tabindex="0"${i===0?'':' hidden'}><div class="hf-answer-index" aria-hidden="true"><span>A / 0${i+1}</span></div><div class="hf-answer-copy">${dual('h3',...q.title)}${dual('p',...q.answer)}<ol class="hf-steps" aria-label="${i===0?'项目安排':'工作安排'}" data-aria-label-zh="${i===0?'项目安排':'工作安排'}" data-aria-label-en="How we plan the work">${q.steps.map(s=>`<li>${dual('span',...s)}</li>`).join('')}</ol></div></div>`).join('')}<img class="hf-curl" src="/assets/faq/page-curl.png" alt="" width="1774" height="887" loading="lazy" decoding="async" aria-hidden="true"></div>
    </div>
  </section>`;
}
module.exports={section,questions};
