# Ellis Services Group — Melbourne

Bilingual static website for commercial property maintenance and repairs in Melbourne. This repository contains editable source, transparent building assets and the generated HTML pages.

## Local development

Requires Node.js 20 or later. No npm dependencies are required.

```sh
npm run check
npm run build
python -m http.server 8765
```

Open `http://127.0.0.1:8765/?lang=zh` or `http://127.0.0.1:8765/?lang=en`.

The build updates HTML in the repository root and route directories. Serve the repository root as static files. The English interface uses the existing `?lang=en` client-side language switch; full English text is stored in the HTML `data-en` attributes, with Chinese as the no-JavaScript default.

## Editing

- `content/services.cjs`, `content/sectors.cjs`: bilingual content for 12 services and 8 property types.
- `content/render-topics.cjs`, `build-pages.cjs`: page generation, metadata, FAQ and related links.
- `navigation.cjs`: independent page destinations for the main navigation.
- `business.json`: company registration and verified Google business location.
- `scene-visual.js`, `motion.js`, `app.js`: homepage shared building stage and interactions.
- `designer.css`, `designer-motion.js`, `content/design-shell.cjs`: detail-page visual scenes and interactions.
- `DESIGN.md`: approved design direction and implementation decisions.

Run the build after changing templates, content, navigation or business details. Commit the generated HTML alongside its source.

## Current delivery status

- The site is a local candidate. Uploading to GitHub does not establish a production deployment.
- Enquiry forms create a local draft and do not send messages. Telephone and Google Maps links are functional destinations.
- Confirm the production origin and review canonical/hreflang URLs before enabling a public domain.
- Service coverage is Melbourne. The Google business location and the ABN registration region are distinct and are recorded separately.

The visual direction uses strong cobalt, orange and lime contrasts, rounded cards, building scenes, scroll effects and pointer interactions. Respect reduced-motion preferences and keep all text readable without animations.
