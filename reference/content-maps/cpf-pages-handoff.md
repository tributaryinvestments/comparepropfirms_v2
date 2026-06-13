# ComparePropFirms.com — Page System & Go-Live Handoff
*For the agentic AI tasked with taking the five new page prototypes live and building the backend correctly.*

This document is the orientation guide. Read it first, then the per-page content maps:
`cpf-homepage-content-map.md`, `cpf-legal-content-map.md`, `cpf-about-content-map.md`, `cpf-news-hub-content-map.md`, `cpf-article-content-map.md`.

For the **firm review pages** (a separate, pre-existing page type), the canonical references are `cpf-page-system-handoff.md` + `tradeify-content-map.md` + `CPF-Category-Page-Handoff.md`. This handoff does **not** replace those; it covers the five new page types built in this round.

---

## 0. What was delivered (the artifacts)

Self-contained HTML prototypes in the output folder:

| File | Page type | Status |
|---|---|---|
| `cpf-homepage.html` | Homepage | complete |
| `cpf-legal.html` | Privacy Policy + Terms (one template) | complete |
| `cpf-about.html` | About | complete |
| `cpf-news-hub.html` | News Hub | complete |
| `cpf-article.html` | Single article / guide template | complete |
| `cpf-header-footer.html` | **Reference for the locked header + footer chrome** | complete |

All five pages share **one locked header and footer** (the "chrome"), identical to `cpf-header-footer.html`. Each prototype is fully styled, responsive, theme-aware (light/dark), and self-contained (inline `<style>` + `<script>`, external dep = Google Fonts only).

These are **prototypes**, not a production stack. The job is to (a) turn them into real, templated, data-driven pages on the live site, and (b) wire up the backend so the dynamic parts populate from a CMS/database.

---

## PART A — The design system (locked; never restyle)

**Golden rule (inherited from the firm-page system):** style, color, layout, and component structure **do not change**. Only content, data, and per-section/per-firm accents change. If a change would alter the look rather than the data/copy, it's out of scope.

### Tokens
- Every color is a **CSS custom property**. **No hard-coded hex in content** (sanctioned exceptions: per-firm logo gradients and the fixed brand-navy panels).
- Full light ramp on `:root` and a complete dark ramp on `html.dark`. Key tokens:
  - Site accent: `--orange:#F39200` (light) / `#ff9f2e` (dark) — primary CTAs, affiliate "Get Funded", active states. **Reserved**; green is used for site-action buttons ("Find My Perfect Firm", "Compare Now").
  - Canvas/surface: `--bg-page` (page canvas), `--surface` (cards), `--bg-soft`.
  - Brand navy: `--ink` / `--ink-soft` (dark in both themes) — used for dark hero/CTA bands and the dark header in dark mode.
  - Section accents: `--blue / --purple / --teal / --green / --red` (+ `-soft`/`-tint`/`-dark` variants) used as per-section accents.
- Fonts: `--sans:"Inter"`, `--serif:"Source Serif 4"`. Serif for headings, firm names, big numbers, pull-quotes; Inter for everything else.
- The frontend-design "avoid Inter / be bold" guidance is **explicitly overridden** — matching the cornerstone system is the requirement.

### Theming
- Theme toggle persists to `localStorage['cpf-theme']`. An inline `<head>` script applies the `dark` class **before paint** (prevents flash). The visible toggle is `#themeToggle` in the locked header.
- **Light/dark canvas fix (already applied to all pages):** `html { color-scheme: light; background: var(--bg-page); }` **plus** `<meta name="color-scheme" content="light dark">`. This was required because some mobile in-app browsers ignore the CSS `color-scheme` property and force-darken a transparent canvas (the page rendered black). **Keep both** when templating — do not drop the meta tag or the explicit `html` background.

### Breakpoints & conventions
- Primary breakpoints **1100px** and **760px**; a few components use **1024px** (the 3-up offer/review grids collapse to 1-up there).
- Stat blocks are label/value pairs; in titled stat rows the **label is left-aligned, value right-aligned**.
- **Affiliate links carry `rel="sponsored noopener"`.**
- **Never fabricate firm numbers.** Representative/unverified figures are flagged in the content maps — verify before publishing.

---

## PART B — The locked chrome (header + footer)

`cpf-header-footer.html` is the canonical source. It is **build-once, apply-everywhere** — identical on all pages even where a page's own mockup showed different chrome.

### Header (`<header class="site-nav" id="siteNav">`)
- Chevron-diamond logo SVG + wordmark "Compare Prop Firms™" (brand-blue light / white dark).
- Icon nav: **Futures** (mega-menu dropdown), **Crypto**, **Options**, **Forex**.
- **Futures mega-menu** (`.nav-dd #futuresDD` / `.mega`): 3 columns — Popular / By Market / By Feature. Opens on hover (desktop) / tap (touch), closes on Escape/outside-click.
- "Best Offers" pill, theme toggle (`#themeToggle`), BBB badge, mobile burger (`.mobile-burger`, shown ≤1100px).
- Sticky; gains a shadow on scroll (`.stuck`).

### Footer (`<footer class="site-foot">`)
- 4 columns: Brand (+ social X/IG/YT/FB) / Top Prop Firms / Resources / Stay Updated (newsletter + a Support sub-block with "About Us" + `support@comparepropfirms.com` mail link).
- Centered expandable **"Editorial Standards & Disclosures"** accordion (`#footDisc` / `#discToggle`): 3 columns — General Disclaimer / Editorial Note / Advertising Disclosure. **This copy is the real, verbatim disclosure text** — keep it; align the About page's independence section with it.
- Bottom bar: © 2026 + Privacy Policy / Terms & Conditions / Sitemap.

### Chrome JS (4 handlers)
Theme toggle · footer disclosures accordion · sticky-header shadow · Futures mega-menu. On the four propagated pages this is injected before `</body>`; the homepage and reference page already contain it.

> **Templating implication:** the chrome must become **one shared partial/template part** (a WordPress template part / Elementor global header+footer / component include) so it's edited once. Do not maintain five copies.

---

## PART C — Data model (what the backend must provide)

Two primary content types drive almost every dynamic block.

### 1. Firms (the most important entity)
Powers: Homepage Top Funded Offers + Compare table + hero podium (cosmetic), News Hub "Top Prop Firm Reviews", Article sidebar offers, footer "Top Prop Firms".

Suggested fields per firm:
- `name`, `slug`, `rank`, `rating` (e.g. 5.0), `logo` (image/SVG) + `logo_gradient` (for the text-tile fallback), `accent`/brand color.
- `eval_fee`, `eval_fee_original` (for strike-through), `account_label` (e.g. "$50K Eval" / "$50K Instant").
- `profit_split` (e.g. 90%), `payout_days` (e.g. "1–5 days"), `save_pct`, `promo_code`, `sale_ends` (date).
- `tagline`, `ribbon` (e.g. "Instant Funding"), `award` (e.g. "Editor's Choice"), `is_top` (bool).
- `affiliate_url` (used on every "Get Funded"; render with `rel="sponsored noopener"`).
- Expand-panel content: `quick_facts[]` (label/value/sub), `pros[]`, `cons[]`, `verdict` (HTML), `max_funding`, `consistency_rule`.
- **Verified values today:** Tradeify, Lucid, Purdia (see content maps). **Representative/flagged:** Take Profit Trader figures, several "Max Funding"/"Consistency Rule" cells, all "Save up to %"/sale dates. Verify before publishing; pricing/promos change often.

### 2. Posts / Articles (CMS)
Powers: News Hub (featured + latest + popular + news lists), Homepage "Latest Guides", the Article template, "Related Guides".

Fields: `title`, `slug`, `excerpt`, `body` (rich), `featured_image`, `category`, `tags[]`, `author` (name + avatar), `published_at`, `updated_at`, `read_time`, `fact_checked` (bool), `is_featured`/`is_popular`.
- The Article body needs **reusable blocks**: drop-cap, pull-quote, pro-tip callout, feature-icon grid, principles box, "Bottom Line" (see `cpf-article-content-map.md`). Build these as editor blocks/widgets/shortcodes.

### 3. Smaller dynamic bits
- **Newsletter signup** (footer + News Hub promo): POST to the ESP (Mailchimp/ConvertKit/etc.) with double opt-in + success/error states.
- **Contact form** (About): submit endpoint → email/CRM/helpdesk, with validation + spam protection. (No Contact/FAQ page exists; this + the footer mail link are the support entry points.)
- **Compare tool** (Homepage): the two firm selects + "Compare Now" should query firms data and route to a comparison; the displayed table should be rendered from firms data with the "best value" cell computed, not hard-coded.
- **Category taxonomy**: the Homepage "Browse by category" tiles (Evaluations / Instant Funding / No Funded Consistency Rule / Best for News Trading / 100% Profit Split / Instant Payouts) should link to category/filter pages.
- **Stats/trust numbers** (500K+, 250+, 4.8/5, Trustpilot, 1M+/150+/2,500+): currently representative — make them CMS-config or computed, and confirm before launch.

---

## PART D — Static vs dynamic, per page (quick index)
| Page | Mostly static | Must be wired to data |
|---|---|---|
| Homepage | hero copy/podium, category labels, "why trust" cards | Top Funded Offers, Compare table+selects, Latest Guides, affiliate URLs, stats |
| Legal | entire body (verbatim) | dates confirm only; canonical URLs |
| About | all narrative | Contact form backend; methodology accuracy; featured logos |
| News Hub | hero, promo copy | Featured/Latest/Popular/News lists, firm review cards, trending tags, stats |
| Article | template chrome | every per-post field + body blocks; sidebar offers/related/trending |

---

## PART E — Getting live (platform)

The site runs on **WordPress / Elementor** (per project context). Choose one integration path and apply consistently:

**Option 1 — Native WordPress (recommended for maintainability)**
- Header + footer → a **block-based theme template part** (or Elementor Theme Builder global Header/Footer).
- Homepage / About / News Hub → templates with **ACF/CPT-driven** dynamic sections (firms = a `firm` CPT; posts = native posts).
- Article → the **single-post template**; register the reusable blocks as **Gutenberg blocks** (or Elementor widgets).
- Legal → two pages (or one with deeplinks) using the legal template.
- Port the prototype CSS into the theme's stylesheet (keep the token system intact); enqueue the chrome JS once.

**Option 2 — Elementor-first**
- Recreate sections as Elementor templates/global widgets; firms/posts via a dynamic-content add-on (e.g. JetEngine/ACF + Dynamic Tags). Heavier to keep pixel-faithful — preserve the tokens and component structure exactly.

**Option 3 — Headless / static**
- Use the HTML largely as-is with a templating layer (e.g. Astro/Next + a headless CMS). Cleanest for fidelity; biggest lift on infra.

**In all cases:**
- Keep the **token system, breakpoints, and component classes** intact (don't let a page builder rewrite them).
- Keep the **chrome as a single shared include**.
- Preserve the **`<head>` theme bootstrap script + `color-scheme` meta + `html` background** on every rendered page (the dark-flash and mobile-black-background fixes depend on them).
- Replace every `#` placeholder link with a real route; attach affiliate URLs (`rel="sponsored noopener"`) to all "Get Funded" actions.

---

## PART F — Assets to replace before launch
- **Logo:** the chevron-diamond SVG is an **approximation** — swap for the official brand mark (header + footer).
- **BBB badge:** approximated two-tone badge — replace with the official Accredited Business asset (and confirm accreditation is current).
- **Firm logos:** currently styled text tiles with brand gradients — replace with real logo images (keep the gradient as fallback).
- **Images:** hero/article/guide/news thumbnails are gradients/placeholders — supply real images (with `alt`, responsive `srcset`, lazy-loading).
- **Press / featured-in logos:** text placeholders — use authorized logos and ensure the "featured" claims are truthful.

---

## PART G — SEO & compliance
- Per-page `<title>`, meta description, canonical; Open Graph + Twitter cards.
- Structured data: `Organization` (site-wide), `BreadcrumbList` (Article), `Article`/`BlogPosting` (Article), and truthful `Review`/`AggregateRating` where firm ratings appear.
- Legal pages indexable; sitemap includes all pages (footer links a Sitemap).
- **Affiliate compliance:** the footer Advertising Disclosure + About independence section state the affiliate relationship — keep them accurate and visible; `rel="sponsored"` on monetized links.
- Accessibility: chrome already uses ARIA on the menu/accordion/toggle; preserve it. Verify color contrast in both themes, focus states, and that the mobile burger opens a real menu (the prototype burger is currently **visual only** — wire a mobile nav panel at launch).

---

## PART H — Build / validation conventions (carried from the firm-page system)
- Edit prototypes by **anchor-splice** (`assert anchor in html; html.replace(anchor, new)`); for large blocks, write to a temp file and inject with Python. Avoid one-shot huge writes.
- **Never** run Python `%`-formatting on strings containing literal `%` ("90%", "35%") — use `.replace()`.
- Validate every change: extract `<script>` blocks → `node --check` (all must pass); check tag balance (strip `<svg>`/`<style>`/`<script>` first so self-closing SVG tags don't false-alarm); confirm the file starts with `<!DOCTYPE` and ends `</html>`.
- No headless browser is available in this sandbox; rely on the above checks and manual open/resize/theme-toggle.

---

## PART I — Known flags & open items (carry forward)
- **Representative data to verify/replace:** Take Profit Trader figures; firm "Max Funding" + "Consistency Rule" compare cells; all "Save up to %" + sale-end dates; stats (500K+/250+/4.8/Trustpilot; 1M+/150+/2,500+).
- **Approximated assets:** logo SVG, BBB badge (Parts F).
- **Not wired:** Compare-tool selects, Contact form, newsletter signup, all `#` links, affiliate URLs, mobile nav panel (burger is visual only).
- **Intentional deviations (don't "fix" without sign-off):** Article body max-width 1140px; Article sidebar flows below on mobile; Homepage hero podium is decorative/non-interactive; News Hub category pill bar removed; About "View full methodology" link removed; About independence wording is deliberately honest about affiliate revenue.
- **Legal copy is verbatim/authoritative** — no stylistic edits without legal sign-off; confirm effective dates.
- Prop-firm pricing/promos change frequently — re-verify against each firm's site before publishing.

---

## PART J — Surrounding system & pre-launch gaps
*The page prototypes are complete, but a comparison/affiliate site needs supporting systems and a few additional artifacts that a page prototype can't show. These are the items most likely to stall a go-live if discovered late. Tracked in `cpf-launch-checklist.md`.*

### J1. Affiliate tracking & attribution (the revenue path)
- **What:** the mechanism that measures revenue, not just the link. Cloak/redirect links (e.g. `/go/{firm}` or a plugin like Pretty Links/ThirstyAffiliates), append per-firm **sub-IDs / UTMs** so each signup is attributable to the *page and placement* that drove it, log click events, and reconcile against each firm's affiliate dashboard.
- **Why:** this is the business model. "Add `rel="sponsored noopener"`" (Part C) covers the markup, not the measurement.
- **Done when:** every "Get Funded" routes through a tracked redirect carrying a placement-level sub-ID; clicks are logged; numbers reconcile to the firms' dashboards.

### J2. Offer-freshness operations
- **What:** a recurring process to re-verify each firm's fees/promo/sale-date, plus a visible **"last verified" date** per firm.
- **Why:** Part C/I flag the figures as volatile and partly representative, but there's no owner or cadence. Publishing specific (wrong) prices is a trust and liability risk.
- **Done when:** an owner + cadence exist; each firm record has a `last_verified` date surfaced on-page or in admin; stale records are flagged.

### J3. Missing page types / templates (not yet built)
- **Compare-results page** — the Homepage compare tool's "Compare Now" has no destination; this is an unbuilt 6th template.
- **Archive / category / tag listing** pages (implied by News Hub + Article) and a **search-results** page, all with **pagination**.
- **Utility pages/states:** 404, newsletter confirmation/thank-you, contact-success, author pages.
- **Real mobile nav panel** — the header burger is currently **visual only** (flagged in Part I); the slide-out/overlay panel itself needs building and wiring.

### J4. Information architecture & whole-site fit
- **What:** URL/permalink structure for all page types; an explicit map of what every nav + footer link points to; internal-linking rules; and a **redirect map** if any old URLs exist.
- **Connection to existing cornerstones:** these five pages link out to the pre-existing **firm review** (Tradeify, `cpf-tradeify.html`) and **category** pages — confirm those routes and that the shared chrome is applied to them too (or that their chrome matches).
- **Done when:** a sitemap/IA doc exists, every link resolves to a real route, redirects are in place.

### J5. Compliance, legal & trust (YMYL / trading-adjacent)
- **Risk framing:** "not financial advice," simulated-funding/risk disclaimers; review **financial-promotion rules by jurisdiction** (e.g. UK FCA, EU) with legal — the niche warrants it.
- **E-E-A-T:** author bios/credentials, sourcing/citations on guides, and a real **ranking methodology page** (the About "View methodology" link was removed because that page doesn't exist — Part I).
- **Consent & privacy infra:** cookie-consent banner (the legal page already has a CCPA table); **self-host Google Fonts** for GDPR + performance (removes the only external dependency).
- **Done when:** disclaimers present, jurisdictional review done, methodology page live, consent + self-hosted fonts in place.

### J6. Performance / Core Web Vitals
- Image pipeline (`srcset`, lazy-load, compression/next-gen formats); font-loading strategy; caching/CDN; and a decision on how the inline `<style>`/`<script>` are handled once in WordPress (enqueue vs. critical-CSS inline). Target passing CWV on mobile.

### J7. Forms & newsletter specifics
- Spam protection (Turnstile/reCAPTCHA/honeypot), **double opt-in**, the actual ESP/CRM choice, a consent checkbox, and success/error states — for both the footer/News Hub newsletter and the About contact form (Part C).

### J8. Analytics & KPIs
- GA4 (or equivalent) + an **event plan** for the funnel that matters: offer impressions → offer CTR → affiliate click → conversion. This also lets you **replace the representative trust stats** (500K+, 4.8/5, 1M+, etc. — Part I) with real, defensible numbers.

### J9. Governance & source of truth
- Once the CMS/database is live, **it** is the source of truth — these prototypes and content maps will go stale. Name the single source of truth and a sync rule (e.g. content maps describe structure/flags only; live values live in the CMS). Plus the basics: **staging environment, backups, rollback, and the theme in version control.**

---

## Suggested launch order
1. Stand up the **chrome** as a shared template part (header + footer + JS), with real logo/BBB assets; build the **mobile nav panel** (J3).
2. Lock the **IA / URL structure + redirect map**, and confirm the existing firm/category cornerstones share the chrome (J4).
3. Model **firms** (CPT/table) and **posts**; migrate **verified** firm data with a `last_verified` field + freshness process (C, J2).
4. Template **Homepage** + **News Hub**; wire affiliate URLs through **tracked redirects** with sub-IDs (J1) + category links.
5. Template the **Article** single-post + reusable blocks; backfill posts; add author bios + methodology page (J5).
6. Build the missing templates: **compare-results, archive/category/tag, search, 404 + success/utility pages** (J3).
7. Build **About** (wire contact form) and **Legal** (two URLs); add cookie consent + self-host fonts (J5, J7).
8. Wire **newsletter** + **compare tool**; add SEO/schema, analytics/event plan (J8), risk disclaimers (J5); replace all placeholders.
9. Performance pass (J6); QA in both themes, all breakpoints, and a real mobile in-app browser (the black-background fix); accessibility pass; set up staging/backups/version control (J9); then publish.
