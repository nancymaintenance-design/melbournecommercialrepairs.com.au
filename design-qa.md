# Reference inner pages — design QA

final result: passed

Source visual truth:
- E:/Download/蓝橙建筑全景：墨尔本商业维护-1.png
- E:/Download/荧光解构：HVAC建筑系统-2.png
- E:/Download/热粉商业空间探索-3.png

Implementation evidence folder: E:/Ellis-Services/Ellis Services WordPress/reports/reference-inner-pages-2026-11-14/

Full comparisons: overview-comparison.jpg, systems-comparison.jpg, spaces-comparison.jpg. Each places the actual source and rendered browser capture side by side. Render viewport 864×1000 CSS px; full-page captures omit the 4–10px scrollbar gutter. Both source and actual were normalized to 432px content width, preserving aspect. Source portrait lengths differ; comparison retains both complete visual chapters rather than stretching either.

Focused evidence: scroll-keyframes.jpg (independent roof / pipe / body silhouettes); interior-frame-1.jpg and interior-frame-2.jpg (ceiling and wall); mobile-three-templates.jpg and individual bilingual mobile screenshots. CSS sizes 390×844 and 1440×1000 also checked. No device chrome included. Browser screenshots are JPEG; image conversion and montage do not substitute for rendered evidence.

Iteration history:
1. P1: legacy styles retained dark gutters and small title. Replaced shell styles, versioned assets; confirmed saturated edge-to-edge families, enlarged title and image.
2. P1: HVAC decorative type occluded roof. Corrected stacking. P2: service H1 orphaned final character. Split the existing Chinese city prefix into a block without changing H1 text; balanced headline width.
3. P2: source comparison initially contained only the viewport and missed lower chapter. Recaptured full-page, cropped using measured chapter boundaries; both major chapters now compared together.
4. P2: English architecture title inherited nowrap; mobile interior picture exceeded viewport. Restored wrapping and constrained mobile picture. Rechecked all 31 inner pages in both languages: 62/62 without document or heading overflow.
5. P2: supporting thumbnails showed miniature buildings rather than architectural detail. Added framed close crops and matching trade assets; rejected glowing ribbon, generated a clean opaque blue/orange backdrop instead.

Five fidelity surfaces:
- Typography: heavy system Chinese/Arial, oversized blue/orange headline, italic SPACES, translucent HVAC backdrop, readable dense official copy. Official longer H1s intentionally wrap rather than copying mock wording. No clipped H1 in 62 mobile and 31 desktop cases.
- Layout rhythm: pill header, near-full-width building, orange interior transition, acid-to-blue equipment chapters, pink-to-acid entrance progression, rounded framed thumbnails; lower content continues as saturated rounded sections. No large dark canvas.
- Colors/tokens: vivid blue #1424ff, orange #ff5a00, acid #dcff00, pink #fb43bf and warm white. Raster backdrop has subtle tonal variation, accepted as minor P3.
- Image quality: real supplied brand logo retained; supplied architecture plus matching generated architectural assets. No CSS approximation of buildings/equipment. Independent image masks inspected in browser; all image computed filters none. Full resolution WebP, no blur filters. Generated scenes are conceptual, not client evidence.
- Copy: all existing page-content and metadata match bb40f21; original H1s and bilingual behavior retained, headings and routes not replaced with mock captions.

Interactions and motion: native scroll drives roof up to -51px and pipe group -12.5px at measured keyframe; building base stays vertically anchored. Separate ceiling/wall and filter masks; progressive orange pipe connection and scene push. FAQ survives language change; mobile navigation and Escape work; real eight-route navigation; service CTA selection preserved. Reduced-motion browser emulation: roof/filter transforms none, all entrance content visible. Console error log empty.

Residual P3 / accepted differences: exact generated architectural perspective, decorative label styling, reference icon ornaments and thumbnail crops vary slightly. No pixel-perfect claim. Formal content increases page height compared with mock captions. No actionable P0/P1/P2 remains in the tested viewports.

Implementation checklist: [x] 31 inner pages [x] source comparisons [x] lower chapters [x] real scroll frames [x] bilingual mobile [x] desktop [x] reduced motion [x] build/idempotence/links [x] no content or URL regression.

Final lower-chapter iteration: the systems note was too shallow relative to the reference, and the detached interior wall approached the right crop. Filled the note with the existing first scope sentence, constrained the room width, and added three real linked retail entrance annotations. Recaptured all three comparisons; both major chapters remain visible. Representative 390px bilingual states rechecked 6/6 without overflow. Final static link count 1641; original content and metadata still unchanged.
