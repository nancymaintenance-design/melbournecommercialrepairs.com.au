(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.EllisNewsMagazine=api;})(typeof window!=='undefined'?window:this,function(){
 const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const dual=(tag,zh,en,cls='',extra='')=>`<${tag} class="${cls}" data-zh="${esc(zh)}" data-en="${esc(en)}" ${extra}>${esc(zh)}</${tag}>`;
 const dimensions=[[1536,1024],[1060,1484],[1484,1060]],types=['feature','portrait','landscape'];
 function cards(data,slugs){return data.map((a,i)=>`<article class="nm-card nm-${types[i]}" style="--nm-order:${i}"><a class="nm-article-link" href="/insights/${slugs[i]}/?lang=zh" data-nm-article="${i}" aria-labelledby="nm-title-${i}"><div class="nm-cover" aria-hidden="true"><img src="/assets/news-magazine/${slugs[i]}-v1.webp" width="${dimensions[i][0]}" height="${dimensions[i][1]}" loading="lazy" decoding="async"></div><div class="nm-caption">${dual('p',a.catZh,a.catEn,'nm-category')}${dual('h3',a.zh,a.en,'',`id="nm-title-${i}"`)}<div class="nm-bottom">${i===0?dual('span',a.bodyZh[0][0],a.bodyEn[0][0],'nm-note'):''}<span class="nm-read">${dual('span','阅读全文','READ THE INSIGHT')}<span class="nm-arrow" aria-hidden="true">↗</span></span></div></div></a><span class="nm-fold-shadow" aria-hidden="true"></span><span class="nm-fold" aria-hidden="true"><i></i></span></article>`).join('');}
 function section(data,slugs){return `<section id="news" class="section news-section" data-news-magazine><header class="nm-heading"><div><p class="nm-eyebrow"><span>04 /</span> ${dual('span','新闻与见解','NEWS & INSIGHTS')}</p><div class="nm-heading-line">${dual('h2','商业物业维护资讯','Commercial Property Maintenance Insights')}${dual('p','关于商业物业、日常维护和场地更新的实用思路。','Practical perspectives on property care, maintenance and commercial spaces.','nm-intro')}</div></div>${dual('a','查看全部资讯 ↗','All insights ↗','nm-all',`href="/insights/?lang=zh"`)}</header><div class="nm-stage"><div class="nm-editorial-base" aria-hidden="true"></div><div id="news-grid" class="nm-grid">${cards(data,slugs)}</div></div></section>`;}
 const instances=new WeakMap();
 function update({node,data,slugs,language}){
  let state=instances.get(node);
  if(!state){
   if(!node.querySelector('.nm-card'))node.querySelector('#news-grid').innerHTML=cards(data,slugs);
   state={reduce:matchMedia('(prefers-reduced-motion: reduce)'),entered:false};instances.set(node,state);node.dataset.nmMounted='1';
   const reveal=()=>{state.entered=true;node.classList.add('nm-entered');node.querySelectorAll('.nm-card').forEach(card=>card.classList.add('nm-revealed'));state.observer?.disconnect()};
   if(!state.reduce.matches){node.classList.add('nm-armed');state.observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('nm-revealed');node.classList.add('nm-entered');state.observer.unobserve(entry.target)}})},{threshold:.08});node.querySelectorAll('.nm-card').forEach(card=>state.observer.observe(card));}else reveal();
   state.reduce.addEventListener('change',()=>{if(state.reduce.matches)reveal()});
   node.querySelectorAll('.nm-card').forEach(card=>{
    card.addEventListener('pointermove',event=>{if(state.reduce.matches||!matchMedia('(pointer:fine)').matches)return;const r=card.getBoundingClientRect();card.style.setProperty('--nm-x',((event.clientX-r.left)/r.width-.5)*10+'px');card.style.setProperty('--nm-y',((event.clientY-r.top)/r.height-.5)*8+'px')});
    card.addEventListener('pointerleave',()=>{card.style.setProperty('--nm-x','0px');card.style.setProperty('--nm-y','0px')});
   });
  }
  node.querySelectorAll('[data-nm-article]').forEach((link,i)=>link.href='/insights/'+slugs[i]+'/?lang='+language);
  node.querySelector('.nm-all').href='/insights/?lang='+language;
 }
 return{section,cards,update};
});
