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
