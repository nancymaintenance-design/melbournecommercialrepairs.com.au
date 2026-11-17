# Melbourne region V2 integration — 2026-11-17

The supplied V2 implementation is vendored under `vendor/ellis-regions-v2`; original README, DESIGN, integration documentation, CSS and font licence are retained. `npm run build` runs the existing site builder first, then `build-region-v2.mjs` adapts the eleven existing regional routes. No framework migration or homepage replacement.

The original site navigation, language switch and black footer remain. Regional content is isolated through a CSS cascade layer and `@scope`; the supplied final fidelity import is retained. Resetting legacy styles excludes SVG presentation attributes. A compact original-footer variant applies only to region routes. The longer English heading has a local allowance to prevent cropping. The initial Chinese content is server rendered; translated markup is safely encoded in JSON and mounted as real HTML, leaving one H1. Language remounts disconnect previous motion observers.

All ten image cards select a preview, and a separate arrow navigates. Card, preview and scene art remain independent. The full bilingual package text and coverage disclosure are retained. `region-preview/?compare=1&width=1024` shows the approved reference beside the real integration; `?width=390` uses the actual mobile viewport.

`region-contact-prefill.mjs` only reads validated area/service context, adds editable region suggestions and translates the service slug to the existing numeric form contract. It has no submit listener. Production Contact submission and resized attachments are handled by `contact-page.js` and `api/enquiry.js`; credentials exist only in the Vercel production environment. The package draft form is never rendered or initialised. Privacy copy describes the real receiving flow.

## Validation

- `npm run build`, `npm run check`, `npm run test:assets`, `npm run test:regions`, `npm run test:enquiry`: pass. API suite: 11 tests. Regional suite: 11 routes, 22 complete locale variants, 924 local URL references, ten independent preview/navigation controls, full coverage, fonts and fidelity.
- Browser: all ten cards selected correctly; Home keyboard action restores first; selected Western scene changes the visible response and service link; Chinese/English remounts expose one H1; no horizontal page overflow at 390, 1024 and 1440 pixels. Western roof enquiry preselects area western, address 西区 and numeric service 1 in existing Contact. No initial draft or preview message.
- Actual `?compare=1&width=1024` inspected. Screenshots in the site reports folder `region-v2-2026-11-17/`.
- Fresh browser load + language toggle: no console errors or warnings.
- Old `test:visuals` / `test:compact` are historical composition snapshots from d1733f2 / ce18882; they assert superseded regional/contact/privacy markup and the earlier homepage FAQ. They are not evidence of this release's scope preservation and were not weakened to approve the new design.

Production delivery and real Resend delivery are recorded after release verification.
