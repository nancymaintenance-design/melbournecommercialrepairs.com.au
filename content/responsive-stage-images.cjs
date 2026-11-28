const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');

function imageOptions({stem, widths, original, originalWidth, sizes, defer = false}) {
 const candidates = new Map([[originalWidth, original]]);
 for (const width of widths) {
  const url = stem + '-w' + width + '-v2.webp';
  if (fs.existsSync(path.join(root, url))) candidates.set(width, url);
 }
 const items = [...candidates].sort(([a], [b]) => a - b);
 const prefix = defer ? 'data-' : '';
 return prefix + 'src="' + items.at(-1)[1] + '" ' +
  prefix + 'srcset="' + items.map(([width, url]) => url + ' ' + width + 'w').join(', ') + '" ' +
  prefix + 'sizes="' + sizes + '"' + (items.some(([,url]) => url !== original) ? ' data-fallback="' + original + '"' : '');
}

const homeScenes = ['01-home','02-building-interior','03-equipment','04-landscaping'];
function withHomeSceneImages(html) {
 return html.replace(/<img\b[^>]*class="motion-state"[^>]*>/g, tag => {
  const state = Number(tag.match(/\bdata-state="(\d+)"/)?.[1]);
  const scene = homeScenes[state];
  if (!scene) return tag;
  const clean = tag.replace(/\s+(?:data-)?(?:src|srcset|sizes|fallback|loading)="[^"]*"/g, '');
  return clean.slice(0, -1) + (state === 0 ? ' loading="eager" ' : ' ') + imageOptions({
   stem: '/assets/scenes/' + scene,
   widths: [768, 1152, 1536],
   original: '/assets/scenes/' + scene + '.webp',
   originalWidth: 1536,
   // Supply enough pixels for the 1.15x camera and the calibrated overlay scale.
   sizes: '(max-width: 700px) 102vw, (max-width: 1100px) 61vw, 74vw',
   defer: state > 0
  }) + '>';
 });
}

module.exports = {imageOptions, withHomeSceneImages};

