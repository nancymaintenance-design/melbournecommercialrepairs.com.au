const e=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const dual=(tag,zh,en,cls='')=>`<${tag} class="${cls}" data-zh="${e(zh)}" data-en="${e(en)}">${e(zh)}</${tag}>`;
const visualById={S03:'03-equipment',S04:'03-equipment',S05:'03-equipment',S06:'03-equipment',S07:'04-landscaping',S11:'04-landscaping',S12:'02-building-interior'};
const sectorImages={I02:'retail-shopping-centre',I04:'warehouse-logistics',I05:'manufacturing-campus'};
exports.heading=(route,zh,en,options={})=>{
 const id=options.topic?.id||({services:'12',sectors:'08',about:'ESG',faq:'Q&A',contact:'↗','areas/melbourne':'MEL',insights:'NOTES'}[route]||'ELLIS');
 const image=sectorImages[id]?'/assets/sectors/'+sectorImages[id]+'.webp':'/assets/scenes/'+(visualById[id]||((id==='I06'||id==='I07'||route==='areas/melbourne')?'04-landscaping':'01-home'))+'.webp';
 const intro=options.intro||['建筑、设备与场地。一个团队，衔接每个细节。','Buildings, systems and grounds. One group, every detail connected.'];
 const target=options.topic?'#scope-1':'#page-content';
 return `<section class="content-hero designer-hero"><div class="hero-running-type" aria-hidden="true"><span>MELBOURNE ↗ ELLIS / PROPERTY CARE ↗ MELBOURNE ↗ ELLIS / PROPERTY CARE ↗ </span><span>MELBOURNE ↗ ELLIS / PROPERTY CARE ↗ MELBOURNE ↗ ELLIS / PROPERTY CARE ↗ </span></div><div class="designer-hero-copy"><p class="eyebrow">ELLIS / MELBOURNE <span>${id}</span></p>${dual('h1',zh,en)}${dual('p',...intro,'detail-lead')}<a class="designer-explore" href="${target}"><span data-zh="向下探索" data-en="EXPLORE BELOW">向下探索</span><b aria-hidden="true">↘</b></a></div><div class="designer-scene" data-pointer-scene><div class="scene-orbits" aria-hidden="true"><i></i><i></i><i></i><span>✳</span></div><div class="designer-model"><img src="${image}" alt="" width="1536" height="1024" fetchpriority="high"></div><span class="designer-stamp" aria-hidden="true">ELLIS<br><b>↗</b><br>MELBOURNE</span><span class="designer-scene-label" data-zh="一处物业 · 多种可能" data-en="ONE PROPERTY. EVERY POSSIBILITY.">一处物业 · 多种可能</span></div></section>`;
};
exports.rail=`<div class="detail-journey-meter" aria-hidden="true"><span></span></div>`;
