import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderRegionReference,withOverviewPlaces} from './content/region-reference.mjs';
import versionAssets from './content/asset-versions.cjs';
import {renderMain} from './vendor/ellis-regions-v2/src/render.mjs';
const root=path.dirname(fileURLToPath(import.meta.url));
const data=JSON.parse(await fs.readFile(path.join(root,'vendor/ellis-regions-v2/data/region-pages.json'),'utf8'));
const places=JSON.parse(await fs.readFile(path.join(root,'content/region-places.json'),'utf8'));
data.regions.forEach(region=>{region.coverageSuburbs=places[region.areaParam];});
const assetBase='/assets/ellis-regions-v2';
const hostFiles=['style.css','lower.css','cinematic.css','designer.css','inner-footer-transition.css'];
await fs.writeFile(path.join(root,'region-v2-host.css'),'@layer host, hostreset, reset, tokens, base, components, variants, responsive, motion, fidelity;\n'+hostFiles.map(file=>'@import url("/'+file+'") layer(host);').join('\n'));
const interaction=(await fs.readFile(path.join(root,'vendor/ellis-regions-v2/src/app.mjs'),'utf8')).replace("!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)","event.ctrlKey || event.metaKey || event.altKey || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)");
await fs.writeFile(path.join(root,'vendor/ellis-regions-v2/src/app-integration.mjs'),interaction.replace(/\nif \(hasDOM\) \{[\s\S]*$/,'').replace('const hasDOM =', 'const integrationObservers=[]; export function disposePage(){integrationObservers.splice(0).forEach(observer=>observer.disconnect());}\nconst hasDOM =').replace("root.querySelectorAll('[data-reveal]').forEach", "integrationObservers.push(reveal);root.querySelectorAll('[data-reveal]').forEach").replace("root.querySelectorAll('[data-motion-decoration]').forEach","integrationObservers.push(ornaments);root.querySelectorAll('[data-motion-decoration]').forEach"));
// Keep the supplied fidelity import/layer ordering. Scope both style sheets so
// their brand/header/footer selectors cannot replace the receiving site's shell.
for(const name of ['styles.css','fidelity.css']){
 let css=await fs.readFile(path.join(root,'vendor/ellis-regions-v2/source-styles',name),'utf8');
 const preamble=name==='styles.css'?css.match(/^[\s\S]*?@import[^;]+;/)[0]:'';
 css=css.slice(preamble.length).replace(/:root\b/g,':scope').replace(/\bbody\b/g,':scope').replace(/\bhtml\b/g,':scope').replace(/\.page-hub\b/g,':scope.page-hub').replace(/\.page-region\b/g,':scope.page-region');
 await fs.writeFile(path.join(root,'assets/ellis-regions-v2',name),preamble+(name==='styles.css'?'\n@layer hostreset {.region-v2-content,.region-v2-content :not(svg):not(svg *),.region-v2-content *::before,.region-v2-content *::after{all:revert;}}':'')+'\n@scope (.region-v2-content) {\n'+css+'\n}\n');
}
const origin='https://melbournecommercialrepairscomau.vercel.app';
for(const page of [data.hub,...data.regions]){
 const file=path.join(root,page.route,'index.html');
 let html=await fs.readFile(file,'utf8');
 const header=html.match(/<header class="site-header"[\s\S]*?<\/header>/)[0];
 const footer=html.match(/<footer\b[\s\S]*?<\/footer>/)[0];
 const kind=page===data.hub?'page-hub':`page-region theme-${page.designFamily} region-${page.areaParam}`;
 const variants=Object.fromEntries(['zh','en'].map(lang=>[lang,(page===data.hub?withOverviewPlaces(renderMain({data,pathname:page.route,lang,assetBase,siteOrigin:origin,preview:false,contactLocal:true,includeHubCoverage:false}),data,lang):renderRegionReference({data,page,lang})).replaceAll(origin,'').replaceAll('/assets/ellis-regions-v2/hero-melbourne-v2.webp','/assets/region-reference-v3/overview-city.webp')]));
 const meta={route:page.route,titleZh:page.locales.zh.metaTitle,titleEn:page.locales.en.metaTitle,descriptionZh:page.locales.zh.metaDescription,descriptionEn:page.locales.en.metaDescription};
 html=html.replace(/<link rel="stylesheet"[^>]*>/g,'').replace(/<script src="\/(?:designer-motion|area-theatre|inner-footer-transition)\.js[^>]*><\/script>/g,'');
 html=html.replace(/<script type="application\/json" id="page-meta">[\s\S]*?<\/script>/,`<script type="application/json" id="page-meta">${JSON.stringify(meta)}</script>`);
 html=html.replace(/<body\b[\s\S]*<\/body>/,`<body class="cinematic-v2 designer-detail detail-page region-v2-host">${header}<main id="main" class="region-v2-content ${kind}" data-lang="zh">${variants.zh}</main><script type="application/json" id="region-v2-locales">${JSON.stringify(variants).replaceAll('<','\\u003c')}</script><div class="inner-footer-shell region-footer-shell">${footer}</div><script type="module" src="/region-v2-adapter.mjs"></script></body>`);
 html=html.replace('</head>',`<link rel="stylesheet" href="/region-v2-host.css"><link rel="stylesheet" href="${assetBase}/styles.css"><link rel="stylesheet" href="/region-v2-adapter.css"><link rel="stylesheet" href="/region-reference.css"><link rel="stylesheet" href="/navigation-refinement.css"><link rel="stylesheet" href="/footer-brand.css"></head>`);
 if(page===data.hub){
  html=html.replace('</head>','<link rel="stylesheet" href="/region-city-cycle.css"></head>')
   .replace('</body>','<script type="module" src="/region-city-cycle.mjs"></script></body>');
 }
 await fs.writeFile(file,versionAssets(html,root));
}
console.log('Integrated V2: 11 existing routes, bilingual initial markup, scoped fidelity, original navigation and footer.');
const contactFile=path.join(root,'contact/index.html');
let contact=await fs.readFile(contactFile,'utf8');
contact=contact.replace('</body>','<script type="module" src="/region-contact-prefill.mjs"></script></body>');
await fs.writeFile(contactFile,versionAssets(contact,root));
