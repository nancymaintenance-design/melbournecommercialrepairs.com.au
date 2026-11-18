# FAQ reference comparison — 2026-11-18

Compared the user’s 1024×1536 desktop and 724×2172 mobile references with the revised urgent-topic state at 1440×900, 724×900 and 390×844. The report contains equal-width side-by-side section comparisons, full captures, image sources, and functional results. See [FAQ reference comparison and verification](<E:/Ellis-Services/Ellis Services WordPress/reports/faq-ui-2026-11-18/FAQ-参考图对照与验收.md>).

Earlier hero attempts used a single question mark and then a free-standing letter group. The revised architecture image now incorporates the F and A and layers the metal Q in front. Section comparisons capture the thicker shortcut plates, enlarged numbers, desktop sidebar, and blue mobile reading area. Mobile comparison identified text overlap from the bands and a pause button too close to search. The current captures show the corrected band and control positions. Remaining differences are the independent artwork’s material and perspective details, and taller cards for the full readable answers.

Verified page implementation and checked the visual differences against both references. User review of the revised appearance is pending.

# Previous verification — Plumbing gallery contrast and reference fidelity — 2026-11-18

Source: original service pack images/04-plumbing-drainage-gas-full.png, its gallery/work-record section, the matching guide and bilingual JSON. Local target: /services/plumbing-drainage-gas/#gallery and the immediately adjacent handover strip only.

Evidence directory: E:/Ellis-Services/Ellis Services WordPress/reports/plumbing-gallery-2026-11-18. Original reference-full.png 1024×1536; before-gallery.jpg; final after-zh-1440-viewport.jpg / after-zh-gallery-handover.jpg; English desktop and both mobile full captures; reference-vs-final.jpg and before-after.jpg. Browser CSS viewport 1440×950, 1024×900 and 390×850, scale 1; content widths 1430/1014/380 reflect the scrollbar. Source and implementation crops are compared at an equal 1000px display width with natural aspect ratio. Default Chinese settled state is used for the design comparison.

Resolved findings: unrelated orange connector/pump and gas assets made the drainage gallery blend into its orange frame; replaced with four independent, environment-backed photos matching the original site/inspection/work/completion intent. First pass had tall title/caption spacing and delayed image paint in the screenshot; title/notice now share a compact row, side record spans both header/film rows, captions are natural, and all four final images are visibly painted. Global filter reset initially left black icons on blue; tightly scoped monochrome icon recolouring restores white. A gradient boundary crossed handover text; solid blue title/lime body/orange decoration now match the source composition without crossing text.

Fidelity: original high-saturation palette, continuous four-picture film, rounded cream captions, blue connecting marks, scope card, clipboard and offset backing remain. Real HTML holds all captions and records. Generated independent photos have the correct subject, neutral surroundings, clear crops and image boundaries; no reference screenshot serves as UI, no model substituted for site photography, no invented real-project claim. Body labels and full original data remain legible; natural card height is retained rather than shrinking copy to source raster size.

Verification: build, project syntax check, plumbing gallery contract, 12-service/48-state contract, shared 42-page navigation/locale contract, asset versions and diff whitespace checks passed. Desktop and 390px Chinese/English plus 1024px English show four decoded images, no caption/document overflow; English main has no Han. Measured navy/cream and navy/lime contrast 16.1:1 and 15.47:1; white/blue 7.7:1. Reduced-motion gallery is visible and has no animation. Console error query empty. No new JS or changed global motion delays. Scope manifest confirms existing About/home work, other routes, business data, header/footer and all other plumbing markup unchanged.

P3: independently generated site photos use different camera details from the original; complete bilingual labels and record copy produce a slightly taller region than the compressed reference. No actionable P0/P1/P2 remains.

final result: passed

Details, exact changed-file list, source prompts and screenshots: reports/plumbing-gallery-2026-11-18/修正与验收.md. Local only; no push or deployment.

---

# Latest verification — About company identity — 2026-11-18

Source visual truth: E:/Ellis-Services/Ellis Services WordPress/reports/about-identity-2026-11-18/reference.png (1717×916, original user attachment). Source facts: unchanged business.json. Target: only /about/ company registration module.

Rendered evidence: after-zh-desktop-full.jpg, after-en-desktop-full.jpg, after-zh-desktop-module.jpg, after-en-desktop-module.jpg, after-zh-mobile-full.jpg, after-en-mobile-full.jpg, after-zh-mobile-module.jpg and after-zh-mobile-reduced.jpg in that report directory. Before: before-desktop.jpg (original folded state) and before-expanded-desktop.jpg. Full-page comparison: before-after.jpg. Focused design comparison: reference-vs-final.jpg.

CSS viewports 1440×1050 and 390×850, deviceScaleFactor=1. Actual content raster widths 1430/380 reflect the 10px scrollbar. Reference and rendered module crops are compared at an equal 1050px display width, preserving both natural heights. Default settled English desktop state is used for the visual comparison; Chinese and mobile are additionally inspected. Actual data contains full dates, full region and the required original verification note; these are retained rather than compressed to screenshot shorthand.

Fidelity surfaces: original brand type with heavy italic company-name hierarchy, large copyable HTML ABN/ACN, source-matched navy/lime/orange/pink/cream surfaces, 42/58 asymmetric construction, native paired registration records and visible links. Independent alpha badge artwork matches the metallic/lime direction; the original logo and all public shell/insurance content are unchanged. Real HTML holds every company field and the badge label. No screenshot or full module raster serves as the UI.

Comparison history: v1 found badge/name overlap and an orange stripe outside the boundary; fixed positioning and stripe origin. v3 found a small/low badge, wrapped desktop region action and weak lime backing; enlarged/repositioned the badge, reallocated action columns and reordered backplates. Final narrow entry check found a 2px transient horizontal spill; numeric tiles now enter vertically. reference-vs-final.jpg and the four final locale/width checks show the corrections. No actionable P0/P1/P2 remains.

Runtime evidence: 8 public facts visible without disclosure in all four requested states; English main text has no Han; no horizontal or field overflow; one H1; ABN Lookup actually opens the official matching ABN page; area and Contact links navigate to existing routes with current lang. Keyboard Tab/Enter and 3px blue focus ring verified. Single-pass 4.4s badge/4.6s edge sequence, stable numeric translate 0px after entry, slight visual-only pointer tilt; desktop/mobile reduced-motion has no module animations, no transform and all facts visible. Console error query empty.

Build, project check, local JS syntax checks, about identity data/source regression, 42-page navigation/locale contract and asset cache check passed. Scope evidence in scope-preservation.json confirms the original About title, brand, intro, service groups, insurance, shared Header and Footer are byte-identical. Business data and other runtime pages have no task-induced content changes; prior pending homepage work was preserved.

P3: generated badge highlights/fluting and the existing site font differ slightly from the source. Complete dates/region/verification notes add natural height. These are disclosed rather than described as pixel-exact. No push/deployment. Local preview remains http://127.0.0.1:8767/about/?lang=zh#company-registration.

final result: passed

Detailed test matrix, full file list, asset source and screenshots: E:/Ellis-Services/Ellis Services WordPress/reports/about-identity-2026-11-18/验收与文件清单.md

---

# Latest verification — service reference fidelity correction — 2026-11-18

The previous service visual pass was too permissive and is superseded. The user's observation was correct: generic controls and single notes had removed readable construction labels, full scope checklists, stage paper notes and model scale.

Source truth: the original ELLIS_12_Service_UI_Reference_Pack_2026-11-17.zip; SHA-256 comparison confirms all 13 reference images match the extracted images under E:/Ellis-Services/Ellis Services WordPress/obsidian/service-ui-reference-2026-11-17/ELLIS_12_Service_UI/images. Copy and states follow the original guide/JSON; real shared site shell is retained.

Actual current browser evidence: E:/Ellis-Services/Ellis Services WordPress/reports/service-ui-2026-11-18/correction/01–12-final.jpg. CSS viewport1280×720; raster1270×714, uniform ratio1270/1280. Default source states, Chinese. Side-by-side: reference-vs-revised.jpg; focused four-page comparison: focused-reference-vs-revised.jpg; post-recapture source comparison: recapture-verification.jpg. The source1024×1536 long-images intentionally use compressed text, while guide-sized live reading copy expands naturally. Both sides retain aspect ratio; no forced height match.

P1/P2 correction history: (1) catalogued omitted labels, undersized models, absent checklists/route connectors/stage notes and generic galleries; (2) rebuilt all twelve professional compositions and five independent raster assets, restored full lists and real DOM annotations/region selection, refactored long English side content into normal flow, corrected duplicate navigation offset; (3) captured all twelve live views and compared with original regions; (4) rejected unpainted early04/09 screenshots and recaptured both correctly; verified full parking site visibility and distinct category thumbnails. The comparison views have been opened and inspected. These are browser captures, not generated UI mockups.

Functional verification: original12 routes and48 full issue states, complete supplied workflow/FAQ copy,1,201 local links/assets, uniqueIDs and tab-to-panel associations;36 specialist selections; stage arrows/keyboard, sign day/night, HVAC phase film and before/after slider. The missing sign panel found during this run was fixed and retested. Final36 English responsive states at1024/390/320 pass overflow, reading notes, oneH1, noHan in service content and unfolded footer checks. New preview console error query empty. Build/syntax/cache/shared navigation tests pass. Temporary viewport/media emulation restored before handoff.

P3 follow-up only: independent raster camera details/geometry and small decorative differences remain; exact pixel identity is not claimed. Header/Footer deliberately match the existing whole-site UI, and normal-size live text takes more natural height than compressed long-image references. No remaining substantive functional, reading or composition blocker in inspected states. No homepage/API changes, messages, push or deployment.

final result: passed

Detailed evidence and asset prompts: E:/Ellis-Services/Ellis Services WordPress/reports/service-ui-2026-11-18/correction/修正记录.md

---

# Service visual fidelity correction — 2026-11-18

The previous service visual pass was too permissive. Current source comparison identifies P1/P2 reductions: missing readable diagram labels, undersized model regions, generic specialist tabs replacing distinct compositions, absent full checklists and three-stage paper notes, incomplete gallery presentation. Functional checks do not close those visual findings.

final result: blocked

# Latest verification — 12 service reference pages — 2026-11-18

Source: CODEX_SERVICE_UI_GUIDE.md, service-pages.json, all twelve numbered full references and the enlarged building-maintenance reference. Implementation: the twelve existing /services/ routes at http://127.0.0.1:8767, local only.

Actual normal-browser viewport captures: E:/Ellis-Services/Ellis Services WordPress/reports/service-ui-2026-11-18/01–12-final-desktop-viewport.jpg. Final side-by-side visual evidence: final-reference-comparison.jpg. Early CDP component crops were found to include incorrect coordinates; these are superseded by actual viewport captures. No screenshot reference is served as the UI.

Visual pass inspected composition, independent imagery, readable 17–18px body text, title hierarchy, palette, rounded offsets, state clarity and DOM copy. Generic professional bands were replaced with twelve service-specific compositions. Fixed wrong hero labels, gallery caption mappings, misleading signage thumbnail actions and a 24px caption cascade collision at tablet widths. Normal reading sizes intentionally require more height than compressed source long-images. Shared Header, language switch, homepage and full Footer remain unchanged.

Functional evidence: 48 issue states, twelve route/asset contracts, workflow/FAQ source completeness, original internal links, selected-state language persistence, gallery controls, original Contact service preselection, zero console errors. Final English 1024/390/320-width sweep: 36 states without Han in service UI, overflow, duplicate H1 or footer disclosures. Recorded in final-responsive-checks.json. Build, syntax, asset cache and 42-page shared-navigation checks passed. Motion reductions and offscreen pauses remain; temporary browser emulation restored.

Remaining P3: independently recreated artwork has different camera crops, small geometry and icons; exact raster identity is not claimed. No outstanding P0/P1/P2 functional, responsive or reading blocker in the verified states. No backend messages sent, no push, no deployment.

final result: passed

Detailed Chinese report: E:/Ellis-Services/Ellis Services WordPress/reports/service-ui-2026-11-18/预览与验收.md

---

# Latest verification — navigation, English UI and visible footer — 2026-11-18

Follow-up: navigation button states and every footer now use the homepage's shared CSS directly. Removed remaining regional footer padding/size rules; light social cards retain dark text even on hover/focus. Forty-two shared-shell comparisons, 96 contrast states and six footer typography comparisons passed. Latest evidence: `E:/Ellis-Services/Ellis Services WordPress/reports/shared-shell-2026-11-18/验收记录.md`. Earlier compact footer findings below are superseded.

The latest user request supersedes the earlier compact-footer findings below: the full original black footer now displays directly, without a disclosure. All 42 routes share the same navigation geometry. English UI text and attributes contain no Chinese, with the explicitly retained original language switch as the sole exception. See `E:/Ellis-Services/Ellis Services WordPress/reports/navigation-locale-2026-11-18/本地验收.md` for 124 browser states, eight additional heading-clearance states, screenshots and test commands. This is a local candidate; no deployment.

Current result: passed. The following regional report is historical and records the prior design iteration.

# Regional reference implementation — historical QA — 2026-11-17

## Source and implementation

Source truth: the user's latest overview screenshot and ten individual regional references, copied without alteration to `E:/Ellis-Services/Ellis Services WordPress/reports/region-reference-2026-11-17/references/`. Location names: `C:/Users/UFTR/Desktop/Entry/13melbourne新站/墨尔本核心地名.md` (10 groups, 67 names).

Implementation: `http://127.0.0.1:8765/areas/melbourne/?lang=zh` and its ten existing regional routes. Full rendered captures: `E:/Ellis-Services/Ellis Services WordPress/reports/region-reference-2026-11-17/{slug}-zh-1024.jpg`; overview uses `overview-zh-1024.jpg`. Mobile: `eastern-zh-mobile.jpg`, `frankston-mornington-peninsula-en-mobile.jpg`. Final normal-viewport preview: `overview-preview.jpg` and `overview-desktop-full.jpg` in that report directory.

Comparison state: Chinese, default selected scene, first FAQ open, coverage detail collapsed. Reference pixels 1024×1536 for regional images and overview; browser viewport 1024×1536, actual content raster about 1014px wide because of the scrollbar, density 1. `compare.py` scales both independently to 700px wide, aligns their top edges and retains their natural heights; it never stretches height to conceal content differences. The combined inputs are `compare-{slug}-review.jpg`, one for every source. Focused real action/copy comparison: `compare-focused-actions.jpg` (Bayside). Full views establish composition; focused evidence checks labels, service descriptions and the real action link. Browser images are actual captures, not generated design images.

## Comparison history / resolved issues

1. Initial implementation used a generic regional template and distant imagery. Replaced only regional content rendering with reference-specific scene compositions: office cutaway, retail side tabs, exploded systems, warehouse collage, northern photo choices, community split, warehouse/showroom split, facade inset, tenancy stages and coastal indoor/outdoor scene. Generated independent reference-guided artwork; kept the original transparent company logo, local fonts and licensing. Original card/preview assets and the supplied interaction module remain independent and functional.
2. Original shell navigation inherited a mobile bordered layout on desktop; original expanded footer occupied too much of the compact reference. Scoped regional overrides restore the original shared header DOM in one desktop row. Regional compact footer exposes the same navigation/social destinations; complete original footer content remains in its disclosure. Other page families and homepage are unchanged.
3. First comparison found tall text rows, oversized cards, a wrong default SE service action and a mismatched SE illustration. Short default summaries now follow the reference, full existing copy remains in coverage details. Default SE action targets HVAC. New exploded rectangular building illustration and rooftop HVAC card artwork replace the mismatches. Revised `compare-south-east-review.jpg` confirms those fixes.
4. Mobile review found retail/facade photos collapsing because percentage height overrode their mobile height; tabs then covered body text. Explicit mobile stage heights fix this. Latest mobile scene heights are 285px for these variants; retail photo and solution panel have a 12px gap. `eastern-zh-mobile.jpg` is post-fix.
5. English four-part local rail clipped Coverage on 390px. Mobile English rail now uses four equal grid tracks, allowing natural wrapping. At 320px all four links end within 287px and no page overflow occurs.
6. Fixed-height heroes clipped insurance on Western and long peninsula titles. Desktop copy uses natural height with the same compact minimum. All 20 detail-language states confirm insurance fully inside its hero with at least 20px bottom space.
7. Bayside's sole service action was hidden by a last-child rule intended to remove a second action. Selector now targets only second and later actions. Focused post-fix comparison confirms the visible real facade-service link; all 20 detail-language states have at least one visible service action.
8. Modifier+Home was intercepted as scene Home. The generated integration wrapper now lets Ctrl/Meta/Alt combinations pass through. Native scene Home/End/arrow handling is preserved. Rapid sequence 1→2→0→2 ends at 2, one visible solution and the correct decoded image.
9. Lower CTA colors now follow the per-reference families: lime for East/North/NW, blue for West, orange for other regions and a cream/orange coastal ending. Coastal hero also retains the separate industrial inset.

## Required fidelity surfaces

- Typography: original local Ellis Sans SC and original shared logo; one H1 per route, real selectable HTML labels/copy. Long bilingual headings and related-region buttons wrap naturally. Compact reference hierarchy retained; mobile body copy has natural height.
- Layout/rhythm: compact blue hero, shared warm-white navigation, local rail, reference-specific scene controls, real linked service imagery, three-stage strip, coverage/FAQ, compact black regional footer. Additional visible key-location chips intentionally increase lower-page height relative to the screenshots; no forced blank-space or fixed-height clipping.
- Colors: electric blue #1000ff, orange #ff5b00, lime #e4ff00, warm cream #f7f3ed, dark ink #071239; orange/pink/lime offset edges remain. No global recoloring.
- Imagery: source references guide independent scene art only. Entire screenshots are never used as the page; no title/button/paragraph is baked into an image. Art is marked as a scene illustration. WebP conversion preserves source originals. Fine building geometry, camera crops and small decorative icons are approximations, not pixel-identical source assets.
- Copy: all 67 supplied names remain verbatim under the correct region, visible as chips on detail pages and in the selected overview preview. First four are repeated in a light jump row. No invented popularity rankings or fake suburb URLs. Full original regional scenario, planning and service text remains in the coverage disclosure in both languages.

## Functional verification

- Build, syntax checks, asset-cache regression and region integration tests pass. Integration test checks 11 routes, 22 complete locales, 1,038 local href/src references, ten preview buttons, ten independent region arrows, 67 location names in main chips and overview previews, complete original body copy, fonts and final fidelity import.
- Browser: all 20 desktop detail-language states have one H1, no horizontal overflow, no missing visible images, insurance within hero and visible real service actions. Mobile 22-state bilingual sweep has no page overflow; separate ten-route post-fix photo-height sweep confirms no collapsed main scene. 390px and 320px English rail verified.
- Overview selecting East shows all seven expected names and points to the existing Eastern route. Switching language remounts one interaction instance. Scene selection keeps one visible panel and current photo; old async decodes cannot overwrite a newer selection.
- Coverage and FAQ use native details; content expands naturally. Contact CTA carries `area=eastern` to the existing Contact form; the form receives the East address/area preselection and retains an enabled submit button. No message or test enquiry was sent. Existing submission/attachment code remains unchanged.
- Reduced-motion emulation: selection works with zero running animations. Emulation and temporary viewport overrides reset before handoff. Console error query returned none.
- Protected-scope Git comparison confirms homepage, Contact HTML/backend, shared footer and all other page families unchanged. No remote write, push or deployment. Local listener is bound to 127.0.0.1:8765.

## Follow-up polish

P3 only: independently recreated building details, artwork crops and some small icons differ from the source; exact raster identity is not claimed. The longer complete location lists and translated text require more natural height than the static reference. The full original footer is available through a disclosure to keep the regional ending compact. No actionable P0/P1/P2 integration or readability issue remains in the verified states.

final result: passed
