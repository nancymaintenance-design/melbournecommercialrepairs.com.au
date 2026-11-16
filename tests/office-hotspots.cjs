const assert=require('node:assert/strict'),fs=require('node:fs'),api=require('../home-sector-selector.js');
const cp=require('node:child_process'),normal=s=>s.replaceAll('\r\n','\n');
const film=s=>s.slice(s.indexOf('  function renderSectorFilm()'),s.indexOf('  function renderSectorDetail()'));
assert.equal(film(normal(fs.readFileSync('app.js','utf8'))),film(normal(cp.execFileSync('git',['show','HEAD:app.js'],{encoding:'utf8'}))),'Existing four-card film remains unchanged across the kit adapter');
const css=normal(fs.readFileSync('home-sector-selector.css','utf8')),baseCss=normal(cp.execFileSync('git',['show','HEAD:home-sector-selector.css'],{encoding:'utf8'}));
assert(css.startsWith(baseCss.trimEnd()),'Existing scene layout styles remain intact');
const html=fs.readFileSync('index.html','utf8');
if(html.includes('data-campus-explorer'))assert(!html.includes('src="home-sector-selector.js'),'Legacy helper is no longer mounted after the approved kit integration');
else assert.equal((html.match(/id="ps-office-popover"/g)||[]).length,1);
assert.equal(api.officeServices.length,3);
assert.deepEqual(api.officeServices.map(x=>x.slug),['hvac-building-systems','electrical-lighting','building-maintenance']);
for(const service of api.officeServices){assert(fs.existsSync('services/'+service.slug+'/index.html'));for(const key of ['zh','en','descZh','descEn','ctaZh','ctaEn'])assert(service[key]);}
const bounds={left:400,right:1400},size={width:310,height:240},viewport={width:1440,height:900};
let p=api.placeOfficePopover({left:1310,top:100,bottom:144},bounds,size,viewport);
assert(p.left+310<=1392);assert(p.left>=408);assert.equal(p.direction,'below');
p=api.placeOfficePopover({left:1250,top:750,bottom:794},bounds,size,viewport);
assert.equal(p.direction,'above');assert(p.top+240<750);
p=api.placeOfficePopover({left:1270,top:373,bottom:417},bounds,size,viewport,[{left:1179,right:1337,top:526,bottom:570}]);
assert.equal(p.direction,'above','Do not cover another hotspot with the lighting card');
p=api.placeOfficePopover({left:270,top:140,bottom:184},{left:15,right:375},{width:310,height:290},{width:390,height:844});
assert(p.left>=23);assert(p.left+310<=367);assert(p.top+290<=832);
console.log('Office hotspot routes, bilingual content and edge placement passed.');

