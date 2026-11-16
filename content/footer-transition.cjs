/* These surfaces describe the final outer content blocks, not active cards.
   Verified against each existing page family before introducing the seam. */
const layouts={
  about:{theme:'blue',surface:'#1026ff',accent:'#ff7100',layout:'about',size:'color'},
  contact:{theme:'blue',surface:'#1025ff',accent:'#ff7100',layout:'contact',size:'color'},
  faq:{theme:'blue',surface:'#1026ff',accent:'#ff7100',layout:'faq',size:'color'},
  insights:{theme:'blue',surface:'#1026ff',accent:'#ff7100',layout:'insights',size:'color'},
  services:{theme:'pink',surface:'#fb43bf',accent:'#ff7100',layout:'services',size:'color'},
  sectors:{theme:'orange',surface:'#ff5300',accent:'#1424ff',layout:'sectors',size:'color'}
};
function ending(route,{topic,areaOverview,areaRegion}={}){
  if(layouts[route])return {...layouts[route]};
  if(areaOverview||areaRegion)return {theme:'paper',surface:'#f8f5ee',accent:'#ff7100',layout:areaOverview?'area-overview':'area-region',size:'short'};
  if(topic||route.startsWith('insights/')||route==='privacy')return {theme:'paper',surface:'#faf7ef',accent:'#ff7100',layout:topic?'topic':route==='privacy'?'privacy':'article',size:'paper'};
  throw new Error('An explicit footer ending surface is required for '+route);
}
function attributes(config){return ` data-ending-theme="${config.theme}" data-ending-layout="${config.layout}" style="--ending-surface:${config.surface}"`;}
function wrap(footer,config){
  const solid=config.theme!=='paper';
  return `<div class="inner-footer-shell" data-footer-size="${config.size}" data-footer-theme="${config.theme}" style="--ending-surface:${config.surface};--ending-accent:${config.accent}">
 <div class="footer-transition" aria-hidden="true">
  ${solid?`<svg class="ft-cap" viewBox="0 0 1600 64" preserveAspectRatio="none" focusable="false"><path class="ft-thin-backing" d="M0 0H570L600 58H0Z"/><path class="ft-surface" d="M0 0H1600V8C1570 39 1520 48 1430 48L0 52Z"/></svg>`:`<svg class="ft-paper-edge" viewBox="0 0 120 16" preserveAspectRatio="none" focusable="false"><path d="M0 4Q45 15 120 5"/></svg>`}
  <svg class="ft-hairline" viewBox="0 0 1200 24" preserveAspectRatio="none" focusable="false"><path d="M1 20C220 -5 780 28 1199 5"/></svg>
 </div>${footer.trim()}
</div>`;
}
module.exports={ending,attributes,wrap};
