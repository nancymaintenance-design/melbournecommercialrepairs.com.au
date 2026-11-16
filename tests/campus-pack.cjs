const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const manifest=require('../vendor/ellis-hotspot-kit/source-manifest.json'),hash=s=>crypto.createHash('sha256').update(s).digest('hex');
for(const [file,expected] of Object.entries(manifest.files))assert.equal(hash(fs.readFileSync(path.join('vendor/ellis-hotspot-kit',file))),expected,'Supplied source unchanged: '+file);
let options;const host={},fakeApi={select(){},setLanguage(){},close(){},getState(){},destroy(){}};
const context=vm.createContext({document:{querySelector:()=>host,documentElement:{lang:'en'}},location:{search:'?lang=en',origin:'https://example.test'},URL,URLSearchParams,addEventListener(){},MutationObserver:class{observe(){}disconnect(){}},EllisSectorExplorer:{mount:(root,opts)=>{assert.equal(root,host);options=opts;return fakeApi;}}});context.window=context;
vm.runInContext(fs.readFileSync('vendor/ellis-hotspot-kit/ellis-sectors.js','utf8'),context);
const original=JSON.stringify(context.ELLIS_SECTORS);
vm.runInContext(fs.readFileSync('sector-hotspot-kit.js','utf8'),context);
assert.equal(JSON.stringify(context.ELLIS_SECTORS),original);
assert.equal(options.sectors.length,8);assert.equal(options.language,'en');assert.equal(options.sceneSrc,'/assets/sectors/sector-campus-v1.png');
assert.deepEqual(Array.from(options.sectors,s=>s.id),['01','02','03','04','05','06','07','08']);
let links=0;for(const lang of ['zh','en']){for(const sector of options.sectors){assert(sector.point.x>0&&sector.point.x<1&&sector.point.y>0&&sector.point.y<1);for(const request of [{kind:'sector',key:sector.key},...sector.services.map(s=>({kind:'service',key:s.key}))]){const href=options.resolveHref({...request,sector,lang}),u=new URL(href);assert.equal(u.searchParams.get('lang'),lang);assert(!u.pathname.includes('demo'));assert(fs.existsSync(path.join('.',u.pathname.slice(1),'index.html')));links++;}}assert.equal(new URL(options.resolveHref({kind:'all-sectors',key:'all',lang})).pathname,'/sectors/');}
assert.equal(new URL(options.resolveHref({kind:'service',key:'planned-maintenance',lang:'en',sector:{key:'industrial'}})).pathname,'/services/hvac-building-systems/');
assert.equal(new URL(options.resolveHref({kind:'service',key:'planned-maintenance',lang:'zh',sector:{key:'shared-property'}})).pathname,'/services/building-maintenance/');
assert.equal(options.resolveHref({kind:'service',key:'missing',lang:'zh'}),undefined);
const html=fs.readFileSync('sectors/index.html','utf8'),home=fs.readFileSync('index.html','utf8');
assert.equal((html.match(/data-sector-kit>/g)||[]).length,1);
assert.equal((html.match(/<h1\b/g)||[]).length,1);
assert(!html.includes('src="/sector-explorer.js'),'Only supplied hotspot controller is mounted on the sector overview');
assert(!home.includes('data-campus-explorer')&&!home.includes('sector-hotspot-kit')&&!home.includes('vendor/ellis-hotspot-kit'),'No kit integration on homepage');
assert(home.includes('data-property-selector'),'Original homepage selector restored');
for(const file of ['ellis-sectors.js','ellis-explorer.js','sector-hotspot-kit.js'])assert.equal((html.match(new RegExp('src="[^"]*'+file.replaceAll('.','\\.')+'\\?','g'))||[]).length,1);
assert.equal(hash(fs.readFileSync('assets/sectors/sector-campus-v1.png')),'6ddadda645f80854acb83b32b640a08e53fe51b2d706db4c82357def40686fdb');
if(process.argv[2]){const baseline=process.argv[2];for(const file of ['index.html','app.js'])assert.equal(hash(fs.readFileSync(file)),hash(fs.readFileSync(path.join(baseline,file))),file+': exact pre-integration homepage restored');}
console.log(JSON.stringify({homeRestored:true,sectorsPageOnly:true,vendorFilesUnchanged:3,sectors:8,serviceLinks:24,localizedRouteChecks:links,oneH1:true,originalCampus:true}));

