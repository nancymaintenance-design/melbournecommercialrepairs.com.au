# Homepage about: brand and insurance

2026-11-14. Scope is only the existing homepage `#about`. Local preview: http://127.0.0.1:8765/?lang=zh#about. No push, deployment, production-server or DNS change.

The reference is the user-supplied `艾利斯服务集团品牌与保险简介.png`. Lime brand and orange insurance panels interlock above a warm-white introduction, with pink, red and electric-blue edges. The Chinese H2 is exactly “多种专业，统一协作。” at 46px on desktop; its smaller scale than the artwork follows the explicit 40–48px requirement. At mobile widths the same content flows brand → insurance → introduction → registration.

`assets/ellis-services-logo.png` is byte-for-byte identical to the original `ellis-services.png`. It uses `object-fit: contain`, with no mask, clip, filter, redraw or transform. ELLIS and SERVICES GROUP are separate HTML. Only the ELLIS wordmark receives a text reveal.

The insurance statement is actual HTML: fixed `$20M`, `Public Liability Insurance`, and Chinese `2000万澳币公众责任险`. English hides only the Chinese translation. Amount and label animate together without a numeric counter. The insurance fact is supplied by the user in this task; no policy number, expiry, insurer or certification has been invented.

The two introduction paragraphs follow the supplied artwork, with Melbourne as the service city. `/about/` remains the company detail entry. The existing business data and full six-field registration block are reused unchanged: legal name, ABN, ACN, company type, ABN status, GST date and VIC registration region. A visible summary and the original ABN Lookup URL remain; the complete record is available in an accessible native disclosure.

Implementation: `home-about-brand.js` supplies the shared build-time HTML and one local intersection observer. `home-about-brand.css` is scoped to `#about[data-about-brand]`. `build-pages.cjs` replaces only the homepage about section and adds the two homepage assets. The old `.about-e` parallax setup in `app.js` has a null guard because that decorative node was removed. No global motion or inner-page templates changed.

The local observer disconnects after entry, has no scroll listener or frame loop, and uses a WeakSet to prevent duplicate mounting. Background surfaces unfold along their rounded outlines; the insurance group slides into position, and copy becomes stable after entry. `prefers-reduced-motion` displays all text directly with no animation.

Verification: build, syntax, asset-version and visual-preservation checks passed. The pre-change scope snapshot confirms all HTML outside about, 21 protected files and 31 inner pages unchanged. Browser checks cover Chinese/English desktop, 390px mobile, full insurance wrapping, original logo aspect, registration disclosure, real about navigation, one mount, reduced motion, no overflow and no console errors.

Actual screenshots, source comparison, original-logo hashes and the full report are stored in `E:/Ellis-Services/Ellis Services WordPress/reports/home-about-brand-2026-11-14/`.
