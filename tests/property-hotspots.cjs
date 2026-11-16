const assert=require('node:assert/strict'),fs=require('node:fs'),api=require('../home-sector-selector.js');
const expected=[
 ['hvac-building-systems','electrical-lighting','building-maintenance'],
 ['signage-wayfinding','electrical-lighting','building-maintenance'],
 ['hvac-building-systems','plumbing-drainage-gas','cleaning-waste-hygiene'],
 ['roofing-waterproofing','building-maintenance','car-parks-external-works'],
 ['hvac-building-systems','plumbing-drainage-gas','car-parks-external-works'],
 ['hvac-building-systems','building-maintenance','cleaning-waste-hygiene'],
 ['electrical-lighting','building-maintenance','landscaping-irrigation'],
 ['fire-security-access','facade-high-access-cleaning','cleaning-waste-hygiene']
];
assert.equal(api.sectorHotspotServices.length,8);
assert.deepEqual(api.sectorHotspotServices.map(s=>s.map(h=>h.slug)),expected);
for(const scene of api.sectorHotspotServices){
 assert.equal(scene.length,3);
 for(const h of scene){
  for(const key of ['zh','en','descZh','descEn','ctaZh','ctaEn'])assert(h[key]&&h[key].trim());
  assert(h.descEn.startsWith('We '));
  assert(fs.existsSync('services/'+h.slug+'/index.html'));
  assert(fs.existsSync('assets/sector-selector/icons/'+h.icon+'.svg'));
 }
}
const html=fs.readFileSync('index.html','utf8'),js=fs.readFileSync('home-sector-selector.js','utf8'),css=fs.readFileSync('home-sector-selector.css','utf8');
const kitMounted=html.includes('data-campus-explorer');
assert.equal((html.match(/id="ps-office-popover"/g)||[]).length,kitMounted?0:1);
assert(!html.includes('id="ps-hotspot-popover"'),'Legacy popup removed');
assert(!js.includes('state.index===0')&&!js.includes('state.index!==0'),'No office-only interaction guards');
assert(!css.slice(css.indexOf('/* Shared service hotspots')).includes('[data-ps-active="0"]'),'All eight scenes share the accepted presentation');
assert.equal((html.match(/data-ps-hotspot="/g)||[]).length,kitMounted?0:3,'Legacy scene hotspots are not duplicated by the kit');
const p=api.placeOfficePopover({left:650,right:807,top:387,bottom:431},{left:380,right:1210},{width:310,height:296},{width:1280,height:720,top:86});
assert(p.top+296<=382||p.left>=819||p.left+310<=638,'Long cards do not cover the selected hotspot');
console.log('Eight scenes, 24 bilingual hotspots, matching services/icons and one shared popup passed.');

