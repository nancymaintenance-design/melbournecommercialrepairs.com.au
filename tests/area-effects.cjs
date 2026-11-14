/* Behaviour tests execute the shipped controller, not a copy of its formulas.
 * Canvas/font doubles cover lifecycle and DOM contracts; browser QA owns glyph
 * appearance, real font rasterisation and responsive composition. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '..', 'area-theatre.js'), 'utf8');

class Events {
 constructor() { this.listeners = new Map(); }
 addEventListener(type, callback, options = {}) {
  const list = this.listeners.get(type) || [];
  list.push({ callback, options }); this.listeners.set(type, list);
 }
 emit(type, event = {}) {
  for (const item of [...(this.listeners.get(type) || [])]) {
   item.callback(event);
   if (item.options.once) this.listeners.set(type, this.listeners.get(type).filter(entry => entry !== item));
  }
 }
}
class Element extends Events {
 constructor() {
  super(); this.dataset = {}; this.attributes = new Map(); this.children = [];
  this.style = { setProperty(name, value) { this[name] = value; } };
  this.classList = { values: new Set(), add(name) { this.values.add(name); } };
  this.isConnected = true;
 }
 setAttribute(name, value) { this.attributes.set(name, String(value)); }
 removeAttribute(name) { this.attributes.delete(name); }
 append(node) { this.children.push(node); }
 getBoundingClientRect() { return { left: 0, top: 100, right: 800, bottom: 500, width: 800, height: 400 }; }
}

function harness() {
 const stats = { samples: 0, fontLoads: [], sampledFonts: [], fills: [], underlays: [], texts: [], visibilityObservers: [] };
 let resolveFont, fontReady = false, nextFrame = 0;
 const frames = new Map(), fontGate = new Promise(resolve => { resolveFont = resolve; });
 const media = new Map();
 const matchMedia = query => {
  if (!media.has(query)) {
   const node = new Events(); node.matches = query === '(pointer: fine)'; node.media = query; media.set(query, node);
  }
  return media.get(query);
 };
 const root = new Element(), stage = new Element(), scene = new Element(), canvas = new Element(), phrase = new Element();
 const images = ['day', 'dusk', 'night'].map(phase => { const image = new Element(); image.dataset.maPhase = phase; return image; });
 function context(sample = false) {
  return {
   font: '10px sans-serif', globalAlpha: 1, fillStyle: '',
   setTransform() {}, clearRect() {}, beginPath() {}, moveTo() {}, arc() {},
   measureText() {
    const size = Number.parseFloat(this.font) || 100;
    return { width: size * 7, actualBoundingBoxLeft: size * .1, actualBoundingBoxRight: size * 6.9,
     actualBoundingBoxAscent: size * .8, actualBoundingBoxDescent: size * .2 };
   },
   fillText(text) {
    stats.texts.push({ text, font: this.font, sample });
    if (sample) stats.sampledFonts.push(this.font);
   },
   getImageData(x, y, width, height) {
    const data = new Uint8ClampedArray(width * height * 4);
    // An ink-shaped band is sufficient to exercise sampling and the budget.
    for (let row = Math.floor(height * .4); row < height * .6; row++)
     for (let col = Math.floor(width * .25); col < width * .75; col++) data[(row * width + col) * 4 + 3] = 255;
    return { data };
   },
   fill() { stats.fills.push({ alpha: this.globalAlpha, colour: this.fillStyle }); },
   drawImage(image, x, y) { stats.underlays.push({ alpha: this.globalAlpha, image, x, y }); }
  };
 }
 const outputContext = context();
 canvas.getContext = () => outputContext;
 canvas.getBoundingClientRect = () => ({ left: 0, top: 200, right: 800, bottom: 360, width: 800, height: 160 });
 root.querySelector = selector => ({
  '.ma-stage': stage, '.ma-scene': scene, 'canvas.ma-particles': canvas,
  '[data-ma-particle-text],.ma-particle-text': phrase
 })[selector] || null;
 root.querySelectorAll = selector => selector === '.ma-scene img[data-ma-phase]' ? images : [];
 const document = new Events();
 document.readyState = 'loading'; document.hidden = false; document.documentElement = { lang: 'zh-CN' };
 document.querySelectorAll = selector => selector === '[data-area-theatre]' ? [root] : [];
 document.createElement = tag => {
  const node = new Element();
  if (tag === 'canvas') { stats.samples++; const sampleContext = context(true); node.getContext = () => sampleContext; }
  return node;
 };
 document.fonts = {
  load(font, text) { stats.fontLoads.push({ font, text }); return fontGate; },
  check() { return fontReady; }
 };
 const windowEvents = new Events();
 const sandbox = {
  document, matchMedia, innerHeight: 900, devicePixelRatio: 1,
  requestAnimationFrame(callback) { const id = ++nextFrame; frames.set(id, callback); return id; },
  cancelAnimationFrame(id) { frames.delete(id); },
  addEventListener: windowEvents.addEventListener.bind(windowEvents),
  ResizeObserver: class { constructor(callback) { this.callback = callback; } observe() {} },
  IntersectionObserver: class {
   constructor(callback) { this.callback = callback; stats.visibilityObservers.push(this); }
   observe() {}
  },
  Uint8ClampedArray, console
 };
 sandbox.window = sandbox;
 const contextVM = vm.createContext(sandbox);
 // The same bundle being encountered twice must still mount the element once.
 vm.runInContext(source, contextVM, { filename: 'area-theatre.js' });
 vm.runInContext(source, contextVM, { filename: 'area-theatre.js' });
 document.emit('DOMContentLoaded');
 return {
  root, stage, scene, canvas, document, media, frames, stats, windowEvents,
  async readyFont() { fontReady = true; resolveFont([{ family: 'Ellis Pacifico' }]); await new Promise(setImmediate); },
  frame(now) { const callbacks = [...frames.values()]; frames.clear(); callbacks.forEach(callback => callback(now)); },
  visible(value) { stats.visibilityObservers[0].callback([{ isIntersecting: value, intersectionRatio: value ? 1 : 0 }]); },
  time(hour) { root.emit('ma:set-time', { detail: { hour } }); return Number(root.dataset.maNightAlpha); }
 };
}

(async () => {
 const h = harness();
 assert.equal(h.root.dataset.maMounted, '1', 'Mounts without range, output or playback buttons');
 assert.equal(h.stats.visibilityObservers.length, 1, 'Only one mounted observer despite duplicate bundle startup');
 assert.equal(h.frames.size, 1, 'Only one animation loop');
 assert.equal(h.stats.fontLoads.length, 1, 'Only one script-font load per mounted scene');
 assert.match(h.stats.fontLoads[0].font, /Ellis Pacifico/, 'Requests the actual branded script font');
 assert.equal(h.stats.fontLoads[0].text, 'I love Melbourne');
 assert.equal(h.stats.samples, 0, 'Does not sample fallback glyphs before font availability');
 await h.readyFont();
 assert.equal(h.root.dataset.maFont, 'ready');
 assert(h.stats.samples > 0, 'Rebuilds point cloud when the asynchronous font resolves');
 assert(h.stats.sampledFonts.every(font => font.includes('Ellis Pacifico')), 'Point cloud samples only the loaded handwriting font');
 assert(Number(h.root.dataset.maParticleCount) > 0, 'Font-ready rebuild creates particles');

 const startingHour = Number(h.root.dataset.hour);
 h.frame(1000); h.frame(5000);
 assert(Number(h.root.dataset.hour) > startingHour, 'Day/night advances automatically without public controls');

 // Contract values are time-of-day requirements, not a reimplementation of smooth().
 for (const hour of [0, 4.999, 5, 20, 23.999, 24]) assert.equal(h.time(hour), 1, 'Fully visible overnight at '+hour);
 for (const hour of [8, 12, 16.999, 17]) assert.equal(h.time(hour), 0, 'Absent during daytime at '+hour);
 assert(Math.abs(h.time(6) - .7407) < .001, '06:00 is a partial smooth morning fade');
 assert(Math.abs(h.time(18.5) - .5) < .001, '18:30 is halfway through the evening fade');
 const morning = [5, 6, 7, 8].map(hour => h.time(hour));
 const evening = [17, 18, 18.5, 19, 20].map(hour => h.time(hour));
 assert(morning.every((alpha, i) => !i || alpha < morning[i-1]), 'Morning fade is monotonic');
 assert(evening.every((alpha, i) => !i || alpha > evening[i-1]), 'Evening fade is monotonic');
 const paintCount = h.stats.fills.length;
 const underlayCount = h.stats.underlays.length;
 h.time(12); assert.equal(h.stats.fills.length, paintCount, 'No point cloud is painted during daytime');
 assert.equal(h.stats.underlays.length, underlayCount, 'No handwriting underlay is painted during daytime');
 h.time(22); assert(h.stats.fills.length > paintCount, 'Night point cloud is painted');
 assert(h.stats.underlays.length > underlayCount, 'Night handwriting underlay is painted');
 assert.equal(h.stats.underlays.at(-1).alpha, .12, 'The connecting ink stays at 12% opacity overnight');
 h.time(18.5); assert.equal(h.stats.underlays.at(-1).alpha, .06, 'The ink underlay shares the evening night-alpha fade');
 h.time(22);
 assert(h.stats.fills.some(fill => fill.colour === '#ffb8df'), 'Night points retain the required pink colour');

 h.visible(false); assert.equal(h.frames.size, 0, 'Offscreen stops queued animation');
 h.visible(true); assert.equal(h.frames.size, 1, 'Returning onscreen resumes a single loop');
 h.document.hidden = true; h.document.emit('visibilitychange');
 assert.equal(h.frames.size, 0, 'Hidden document stops animation');
 h.document.hidden = false; h.document.emit('visibilitychange');
 assert.equal(h.frames.size, 1, 'Visible document resumes a single loop');
 const reduced = h.media.get('(prefers-reduced-motion: reduce)');
 reduced.matches = true; reduced.emit('change');
 assert.equal(h.frames.size, 0, 'Reduced motion stops continuous animation');
 assert.equal(h.scene.style['--ma-city-x'], '0px');
 assert.equal(h.scene.style['--ma-city-y'], '0px');
 assert(h.stats.texts.some(item => !item.sample && item.font.includes('Ellis Pacifico')), 'Reduced motion retains a static handwriting glyph');
 reduced.matches = false; reduced.emit('change');
 assert.equal(h.frames.size, 1, 'Leaving reduced motion resumes one loop');
 for (const item of h.windowEvents.listeners.get('scroll') || []) assert.equal(item.options.passive, true, 'Scroll listener is passive');
 assert(!/preventDefault|scrollTo|scrollIntoView/.test(source), 'The controller does not take over page scrolling');
 assert(fs.existsSync(path.join(__dirname, '..', 'assets/fonts/pacifico-regular.ttf')), 'The real handwriting asset is present');
 console.log(JSON.stringify({publicControlsRequired:false,duplicateInstances:0,fontReadyRebuild:true,handwritingFont:true,automaticDayNight:true,nightAlphaBoundaries:true,morningAndEveningFades:true,daytimeParticles:0,daytimeInkUnderlays:0,nightInkUnderlayFade:true,offscreenPaused:true,documentHiddenPaused:true,reducedMotionPaused:true,scrollTakeover:false}));
})().catch(error => { console.error(error); process.exitCode = 1; });

