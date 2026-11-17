/** Small original interface glyphs. Decorative SVGs inherit the surrounding colour. */
const paths = {
  arrow: '<path d="M5 19 19 5M6 5h13v13"/>',
  right: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  phone: '<path d="M5.5 3.5 9 8l-2 2c1.4 3 4 5.6 7 7l2-2 4.5 3.5c-.4 2.5-2 3.5-4.3 2.6C9.4 19 5 14.6 2.9 7.8 2 5.5 3 3.9 5.5 3.5Z"/>',
  email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5h5"/>',
  shield: '<path d="m12 3 8 4v5c0 5-8 9-8 9s-8-4-8-9V7l8-4Z"/><path d="m8 12 3 3 5-6"/>',
  pin: '<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/>',
  building: '<path d="M4 21V6l9-3v18M13 10h7v11M2 21h20M8 8v1m0 3v1m0 3v1m9-3v1m0 3v1"/>',
  layers: '<path d="m12 3 10 5-10 5L2 8l10-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
  wrench: '<path d="m14 4 3 3 4-1c1 4-2 8-6 7L7 21l-4-4 8-8c-1-4 3-7 6-6l-3 1Z"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  fan: '<circle cx="12" cy="12" r="2"/><path d="M10 10C3 9 4 3 8 3c4 0 6 5 4 7m2 1c5-5 10-1 8 3-2 4-7 3-9 0m-2 0c1 7-5 9-7 5-2-4 1-8 5-7"/>',
  bolt: '<path d="m14 2-10 12h7l-1 8L21 9h-8l1-7Z"/>',
  droplet: '<path d="M12 2C9 7 5 11 5 15a7 7 0 0 0 14 0c0-4-4-8-7-13Z"/><path d="M8 15c0 2 1 3 3 3"/>',
  sparkles: '<path d="m11 3 2.6 6.4L20 12l-6.4 2.6L11 21l-2.6-6.4L2 12l6.4-2.6L11 3Zm8-1v5m-2.5-2.5h5"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none"/>',
  facebook: '<path d="M14 21v-8h3l.5-4H14V7c0-1 .5-1.5 2-1.5h2V2h-3c-4 0-5 2-5 5v2H7v4h3v8" fill="currentColor" stroke="none"/>',
  linkedin: '<path d="M4 9h4v12H4V9Zm8 0h4v2c1-3 6-3 6 2v8h-4v-7c0-2-2-2-2 0v7h-4V9Z" fill="currentColor" stroke="none"/><circle cx="6" cy="4.5" r="2.2" fill="currentColor" stroke="none"/>',
  google: '<path d="M20.8 10H12v4h5c-.6 2.5-2.7 4-5 4a6 6 0 1 1 4.2-10.3L19 5a10 10 0 1 0 3 7c0-.7-.1-1.4-.2-2Z" fill="currentColor" stroke="none"/>',
  starburst: '<path d="M12 1v22M1 12h22M4.2 4.2l15.6 15.6M4.2 19.8 19.8 4.2"/>',
};
export function icon(name, className = '') {
  return `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name] || paths.arrow}</svg>`;
}
