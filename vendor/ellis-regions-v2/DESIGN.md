# ELLIS — Melbourne region pages · Fidelity V2

## Intent and register

A marketing and service-content website for Melbourne commercial property maintenance. The V2 overview follows the user's approved, compact composition: saturated blue, orange and citron, rounded architectural imagery, bold readable headings and a warm-black footer. The objective is to preserve that specific hierarchy while keeping the interface functional and the content available as HTML.

The visitor chooses a region, previews its relevant property context and services, enters the region page, and can carry the selected region/service into an enquiry.

## Source of truth

- **`public/assets/design-reference-overview.png`**: the user-approved 1024 × 1536 overview. This is the primary visual reference for the V2 hub, shown in comparison mode only; it is never a substitute for live page components.
- **`public/assets/fidelity.css`**: the required final `fidelity` cascade layer, owning V2 composition, runtime overrides, type, density and decorative treatment. `styles.css` imports it with `@import url('./fidelity.css') layer(fidelity)`.
- `public/assets/styles.css`: base tokens, reset, components, responsive behavior, motion and the declared layer order. Its original tokens are overridden by `fidelity.css` where specified below.
- `src/render.mjs`: current composition, including the approved compact hub headline and presentation labels.
- `data/region-pages.json`: bilingual service content, 10 regions, 67 coverage names, related pages and actual routes.
- `src/visuals.mjs`: separate hero, card, preview and detail-scene image mappings and hotspot geometry.
- `src/region-links.mjs`: route/contact allowlists and the 12-service catalogue.
- `docs/APPROVED_UI_GUIDE.md`: earlier detail-page guidance; the user's overview image and V2 code take precedence for the hub.
- User-provided company information: Ellie, 0482 602 558, elliservices.group@gmail.com, 459 Collins Street, Melbourne VIC 3000, Monday–Sunday 09:00–21:00 and $20M Public Liability Insurance.

## Tokens and typography

| Runtime token | V2 value / source | Use |
|---|---|---|
| `--blue` | `#1000FF` in `fidelity.css` | Compact hero, selected cards, actions |
| `--blue-deep` | `#0900B5` in `fidelity.css` | Blue depth |
| `--orange` | `#FF5900` in `fidelity.css` | Ribbon shapes and service strip |
| `--lime` | `#E4FF00` in `fidelity.css` | Active outline, insurance and enquiry strip |
| `--ivory` | `#F7F3ED` in `fidelity.css` | Page, card and navigation surfaces |
| `--ink` | `#071239` in `fidelity.css` | Headings and body copy |
| `--pink` | `#FB37BC` in `fidelity.css` | Narrow decorative reverse edges |
| `--charcoal` | `#201C17` in `fidelity.css` | Retained warm-black footer |
| `--radius`, `--radius-lg` | `28px`, `36px` base tokens | Rounded main cards and image containers |
| `--pill` | `999px` base token | Compact navigation and actions |
| `--shell` | `1440px` in `fidelity.css` | Maximum page shell |
| `--font` | Arial, Ellis Sans SC, system fallbacks | English and Chinese typography |

The actual CSS is authoritative for responsive values; do not create a second set of hardcoded layout tokens in new components. Keep `fidelity` last in the declared layer order and preserve its import when adapting stylesheet paths.

`ellis-sans-sc-400.woff` and `ellis-sans-sc-700.woff` are local Noto Sans CJK SC subsets. Their `@font-face` declarations live in `fidelity.css`; keep `docs/FONT_LICENSE.txt` with redistributed assets. They cover current project content rather than the complete Chinese character set. New copy may require regenerating the subset, with system fallbacks retained. No external font request is needed.

The hub's Chinese H1 uses two deliberate phrases: “墨尔本商业物业维修” and “从所在地区开始”. English wraps naturally within the same compact copy area. Dense overview navigation and card labels are visually distinct from longer body text on region detail pages.

## Composition and hierarchy

### Overview

The V2 hub sequence is fixed:

1. Compact blue hero with a full-frame Melbourne skyline illustration on the right. The title, lead, CTA and insurance sit together on the left.
2. A shallow cream service rail overlaps the hero's lower edge.
3. Ten individual architectural cards in a 5 × 2 desktop grid, with a clear active region.
4. One selected-region panel: roughly 60% independent image and 40% title, short property-type subtitle, three selected service links and a blue detail action.
5. An orange horizontal service strip with four primary service pills and a real link to all services.
6. A blue/citron enquiry strip with concise planning checks and a contact action.
7. A narrow native coverage disclosure containing the longer introduction, complete planning descriptions, full regional service context and coverage names.
8. A shallow transition into the compact warm-black footer, including business information and four social links.

Do not reinsert a separate large introduction, 12-card directory, three large planning cards or an additional full-width CTA into this sequence. Those earlier blocks were the main cause of divergence from the approved overview.

The 1024px design reference is the comparison baseline. The aim is the same compact order and proportions, approximately 1536–1800px for the closed overview at that width; actual content, language, font rendering and open disclosures determine the final height. This is a design target, not a pixel-perfect claim.

### Regional details

The ten region detail pages retain their own scene compositions: cutaway, zoning, equipment layers, loading panorama, work orders, courtyard, dual window, facade detail, tenancy stages and indoor/outdoor connection. They continue to expose relevant services, three problem/approach/handover scenarios, planning, coverage, regional FAQs, related regions and enquiry context.

The overview's compact presentation does not remove the complete detailed content.

## Image responsibilities

- `hero`: the hub uses the new full-frame Melbourne skyline image, not the previous floating blue stage or a miniature model.
- `card`: ten distinct photograph-like architectural illustrations, with separate card-sized WebP files. Do not substitute a full 3D campus model into these near-view cards.
- `preview`: independent expanded-panel imagery; the CBD panel uses its glass entrance and tree-lined footpath image.
- `scene` and `details`: the existing 3D/maintenance images for the full regional detail pages.
- `design-reference-overview.png`: comparison-only approved artwork, never a screenshot background for the website.

The illustrations are not evidence of completed projects or exact geography. Their source and use are recorded in `docs/ASSET_PROVENANCE.md`. Image and card framing are real CSS; copy and controls remain HTML.

## Interaction contracts

- The hub card's image and primary/secondary names belong to one native button using `data-region-preview-select`. It selects the corresponding preview; active card styling follows the same selected state.
- A separate arrow anchor enters the actual region route. Never nest an anchor inside the preview button or silently make one click perform both operations.
- The linked preview has three selected service pills. The fourth service and full regional context remain in the coverage disclosure, with real links.
- Hub preview selection may bring the resulting panel into view. Scene hotspots on detail pages update the complete answer without forcing focus or scroll changes.
- Scenario buttons retain `data-scene-select`, `aria-pressed` and matching panel IDs. All panel copy exists in initial HTML; JavaScript controls visibility.
- Native buttons support Tab, Enter and Space; grouped controls also support arrow/Home/End conveniences where implemented.
- Coverage, planning detail and FAQs use native `details`/`summary`, retaining readable content without JavaScript.
- The compact footer's contact details can expand; phone, email, address, hours, insurance, company identity and social destinations remain available.
- The mobile menu is a non-modal disclosure. Contact context is allowlisted and editable; the production prefill adapter must not replace the site's submission handler.

## Preview and evidence

Both `/preview/` and offline `START_HERE.html` preserve these modes:

- `?width=1024`: inspect the code at the approved design width.
- `?compare=1`: approved source and actual code side by side.
- `?capture=1&width=1024`: actual page without preview controls, suitable for capturing its full layout.

V2 browser-image locations are `docs/previews/ellis-region-hub-v2.jpg` and `docs/previews/ellis-region-comparison-v2.jpg`. Use the actual files and `docs/VERIFICATION.md` to assess final evidence; this document does not assert a completed browser pass or exact pixel match.

## Motion, responsiveness and accessibility

Selection changes are immediate, with short entry motion. Main copy and actions do not wait through an intro animation. Respect reduced-motion preferences and pause continuous decoration offscreen. Do not add scroll locks or long transition queues to force the reference's page height.

Desktop uses the five-column region grid. Narrow viewports reflow cards and the linked preview; text, controls and open disclosures remain reachable. The document owns vertical scrolling. Local image dimensions reserve layout space, the hero is prioritized and lower images can load lazily.

Maintain visible keyboard focus, meaningful image alternatives, labelled form controls and the distinct semantics of preview buttons versus navigation links. Details pages must continue to handle longer text naturally. Final receiving-site and assistive-technology checks remain part of integration.

## Integration boundary

Integrate this implementation and its assets into the existing framework first. Reuse `renderMain()` or port the same DOM structure into established components; preserve the header/footer and contact backend where appropriate. Keep the V2 style hierarchy, card/preview image mapping and local fonts when adapting paths or applying route-level scoping.

Do not introduce a new application architecture or deploy the standalone preview server as the entire production website. Retain the existing domain, routing, analytics/consent and canonical policy. The mail-draft contact screen is a demonstration; production keeps its current submission and upload flow.
