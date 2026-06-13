# Legal — Content Map & Data Reference
*Source of truth for `cpf-legal.html` (Privacy Policy + Terms and Conditions in one template).*

> Shared header + footer = locked chrome (see `cpf-pages-handoff.md`). This map covers the page body.

---

## Purpose & structure
- **One file holds two legal documents**, switched client-side by a segmented control (`.seg`): **Privacy Policy** and **Terms and Conditions**.
- Serif `.legal-title` H1 with an **orange accent bar**; long-form prose in `.legal-body`.
- **Sticky right-rail Table of Contents** (`.legal-toc`, `id="toc"`), built from the headings and driven by an **IntersectionObserver scroll-spy** (active link highlights as you scroll). On ≤1100px the TOC relocates from the right rail into an in-flow slot above the body.
- Includes a **CCPA "categories of personal information" table** — 11 rows, labelled **A–K**.

## Content status
- ⚠️ **Legal copy is reproduced verbatim and must not be edited for style.** It is the canonical Privacy/Terms text supplied for the site. Treat as **static, authoritative content**.
- Source quirks were preserved intentionally (do not "fix" wording/spacing without legal sign-off).

## Dynamic vs static
| Element | Static | Notes |
|---|---|---|
| Privacy Policy body | ✓ | Verbatim; could live as a CMS "page" but content is fixed |
| Terms body | ✓ | Verbatim |
| TOC | ✓ generated client-side from headings | no backend needed |
| Doc switcher (Privacy/Terms) | ✓ client-side | no backend |
| Effective/updated dates | ✓ | ⚠️ confirm dates are current before launch |

## Behavior / JS
- Doc switch (Privacy ⇄ Terms), TOC build, scroll-spy — all client-side (no backend).
- Theme toggle now provided by the **locked header** (`#themeToggle`); the page's own toggle handler binds to it. (Old standalone toggle button was removed in the header/footer pass.)

## SEO / launch notes
- These are two distinct documents — at launch they should ideally be **two URLs** (e.g. `/privacy-policy`, `/terms`) for indexing/linking, even though they share one template. Decide whether to (a) keep the in-page switcher with anchor/deeplink support, or (b) split into two pages that reuse the template. Footer + many pages link to "Privacy Policy" and "Terms & Conditions" — point those links here.
- Add `<title>`/meta description per document; `noindex` is **not** desired (legal pages should be indexable for trust).

## Placeholders to replace before launch
- Confirm effective dates and entity/contact details inside the legal copy with the business/legal owner.
- Wire footer/legal links to the canonical URL(s) for these documents.
