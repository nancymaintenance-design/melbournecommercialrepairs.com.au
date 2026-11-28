/* The supplied Melbourne directory composition, with independent HTML links. */
const regions=require('./area-data.cjs');
const {imageOptions}=require('./responsive-stage-images.cjs');
const phases=['day','dusk','night'];
// On small screens the artwork extends to 190% of the stage.
const sceneSizes='(max-width: 700px) calc(190vw - 38px), calc(100vw - 6px)';
const sceneImage=(phase,defer)=>{
 const stem='/assets/areas/melbourne-stage-design-'+phase;
 const original=stem+'-v1.webp';
 return imageOptions({stem,widths:[577,1154,1731],original,originalWidth:1920,sizes:sceneSizes,defer});
};
const escape=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const dual=(tag,zh,en,cls='',attrs='')=>`<${tag} class="${cls}" data-zh="${escape(zh)}" data-en="${escape(en)}" ${attrs}>${escape(zh)}</${tag}>`;
function card(r,i){
 const colours=['lime','orange','pink','cream','blue','cream','blue','lime','orange','pink'];
 return `<a class="ma-region ma-${colours[i]} ma-region-${i+1}" href="${r.route}" data-local-page style="--ma-index:${i%5}" aria-labelledby="ma-region-name-${i+1}"><span class="ma-number">${String(i+1).padStart(2,'0')}</span>${dual('span',r.zh,r.en,'ma-name',`id="ma-region-name-${i+1}"`)}${dual('span',r.en,'Commercial property maintenance','ma-translation')}<span class="ma-arrow" aria-hidden="true">→</span></a>`;
}
exports.section=({home=false}={})=>`<section ${home?'id="areas"':''} class="ma-directory${home?' ma-home':''}" data-area-theatre aria-labelledby="ma-heading"><header class="ma-heading"><div class="ma-heading-copy">${dual('p','服务地区 / SERVICE AREAS','SERVICE AREAS / MELBOURNE','ma-eyebrow')}<div class="ma-heading-line">${dual(home?'h2':'h1','墨尔本服务地区','Melbourne service areas','ma-title','id="ma-heading"')}${dual('p','选择所在大区，查看商业维修与维护服务。','Choose your region. Explore commercial repairs and maintenance.','ma-intro')}</div></div><div class="ma-heading-actions">${dual('span','10 / 大区','10 / REGIONS','ma-count')}${dual('a','咨询区域服务 ↗','Enquire about your area ↗','ma-enquire','href="/contact/" data-local-page')}</div></header><div class="ma-stage"><div class="ma-scene" aria-hidden="true">${phases.map(phase=>'<img data-ma-phase="'+phase+'" '+sceneImage(phase,true)+' alt="" width="1920" height="1008" decoding="async">').join('')}</div><noscript><img class="ma-scene-fallback" ${sceneImage('day',false)} alt="" aria-hidden="true" width="1920" height="1008"></noscript><nav class="ma-row ma-top" aria-label="Melbourne regions 01–05">${regions.slice(0,5).map(card).join('')}</nav><canvas class="ma-particles" aria-hidden="true"></canvas><span class="ma-particle-text sr-only" data-ma-particle-text>I love Melbourne</span><nav class="ma-row ma-bottom" aria-label="Melbourne regions 06–10">${regions.slice(5).map((r,i)=>card(r,i+5)).join('')}</nav></div></section>`;
