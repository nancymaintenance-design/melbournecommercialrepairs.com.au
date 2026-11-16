# Homepage FAQ visual verification — 2026-11-16

Source visual truth: C:/Users/UFTR/AppData/Local/Temp/codex-clipboard-212785eb-ee83-45d1-bfeb-dc151a2b76ca.png (1825 × 862).
Implementation: E:/Ellis-Services/Ellis Services WordPress/reports/home-faq-fold-2026-11-16/desktop-zh.png (1825 × 650 crop of 1825 × 862 CSS viewport, density 1).
Comparison input: E:/Ellis-Services/Ellis Services WordPress/reports/home-faq-fold-2026-11-16/comparison.png. The source content region and rendered content region are displayed together at matching widths. Vertical compression is intentional: the user requested approximately 400–480px and smaller text than the source mockup.
State: first question selected; Chinese. Supporting captures: desktop-en.png, mobile-zh.png, mobile-en.png (390 × 844 CSS viewport). Also checked 320 × 780.

## Findings and iterations

- Initial desktop region measured 524px; reduced local padding and panel minimum height. Final measured 476px at 1270px desktop and about 483px at 1825px desktop (English 481px). This is within the requested approximate height; content can grow on narrower screens.
- Initial English mobile styling overrode the selected lime background. Removed the over-specific base selector. Post-fix evidence mobile-en.png shows the lime selected label.
- Initial English mobile step pills stacked separately and left stray arrows. Switched the local sequence to three equal columns with natural label wrapping. Post-fix mobile-en.png has a complete readable sequence and no overflow.
- No remaining actionable P0/P1/P2 findings.

## Required fidelity surfaces

Typography: existing Arial / Noto Sans CJK SC / Microsoft YaHei stack. H2 36–42px desktop, 30px mobile; question labels 18–20px; answer paragraph 18px desktop, 17px mobile. Full questions, answers and FAQ link use real HTML. Focused text inspection used the original full-size desktop and mobile captures, not only the reduced comparison board.

Spacing/layout: one blue answer surface with three raised rounded tabs, orange offset backing, pink tab edge and independent curled corner. Desktop answer region reserves the tallest answer in one CSS grid track; six sequential switches stayed exactly 230px. Mobile buttons and their corresponding answers are interleaved in a vertical accordion. No extra full-screen segment or scroll lock.

Colors/tokens: electric blue #0834ff, fluorescent lime #e3ff00, orange #ff7100, warm white from existing --paper. Text areas are solid colors. Contrast and selected/keyboard-focus states remain clear.

Asset quality: separate transparent orange/lime curl raster generated for this component; no text baked into it. No existing logo or scene image changed. The curl shape differs slightly from the mockup and omits the embossed ELLIS decoration (P3); its subject, palette and independent layer are retained.

Copy: exactly the three requested topics; bilingual equivalent responses. Full FAQ page data and generated HTML hash unchanged. Homepage title and upper-right real FAQ route match the request.

## Interaction checks

- Default first answer; all three correct answers accessible by click.
- Six repeated/alternating desktop switches: one visible answer and stable 230px reading surface.
- Arrow keys and Home: roving tab focus and selected state update correctly.
- Mobile open/close, category switching and resizing preserve a valid state.
- Chinese/English content and FAQ URLs preserve the active language.
- Actual FAQ link clicked to /faq/?lang=en and existing H1 verified.
- 320px viewport: no document or FAQ horizontal overflow.
- Reduced-motion emulation: answer still usable, zero component animations.
- Browser console error log at final local check: empty.

## Scope and build

scope-check.json: homepage body outside FAQ unchanged; independent FAQ page SHA256 unchanged; exactly three question controls. Earlier homepage performance work preserved.
Build, syntax checks, asset cache checks and seven existing homepage performance regressions passed. No deployment or push.

## Implementation checklist

- [x] Local component and initial HTML generation
- [x] Bilingual content and existing full FAQ route
- [x] Stable desktop tabs / mobile accordion
- [x] Independent curl and interruptible short transitions
- [x] Actual desktop/mobile screenshots and visual comparison

final result: passed
