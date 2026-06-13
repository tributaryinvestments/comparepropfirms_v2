# ComparePropFirms.com — Site Assembly & Accuracy Spec (BUILD SPEC)

**Audience:** the agentic AI that assembles the static site.
**Read this entire file before touching any page.** Then read `cpf-site-manifest.json` (machine-readable rules) and `cpf-canonical-phrases.json` (exact-match wording bank).
**Prime directive:** *one* chrome, *one* head contract, *one* set of element ids, *one* data object per firm. Every deployed page must be byte-for-byte consistent in its chrome and identical in how it renders equal facts. When in doubt, do not invent — flag `‹VERIFY›` and stop.

---

## 0. Why this file exists

The source files contain **three different headers** and **two different theme-toggle contracts**. An agent that picks per-page produces an inconsistent site. This spec removes the choice: it declares the canonical chrome and the exact transform to apply to each page type so the output is uniform. Do not "improve," restyle, or re-architect anything. Reconcile to the contract; change nothing else.

---

## 1. Golden rules (non-negotiable)

1. **Cornerstone is immutable.** `cpf-tradeify.html` (eval **+** instant funding) and `cpf-alpha-futures.html` (eval only) define structure, tab architecture, design tokens, and component vocabulary. Every firm page is these two patterns with *content* swapped — never structure. A firm with instant funding follows Tradeify; an eval-only firm follows Alpha Futures.
2. **First-party data only.** Every firm fact comes from that firm's own site / help center. No aggregators, no memory, no inference. Anything not confirmed first-party gets a literal `‹VERIFY›` marker and is excluded from any "verified" surface.
3. **Equal values render identically.** If two firms share a value, the *string* must match exactly — "5 trading days," not "5 days" on one page and "5 trading days" on another. The phrase bank (`cpf-canonical-phrases.json`) is the dictionary. This is what makes the comparison experience trustworthy.
4. **Single source of truth per firm.** Comparison view and the Payouts tab read from the *same* data object (`CMP_DATA` or the firm's equivalent). They can never be allowed to drift because they are never authored twice.
5. **Builder arrays, not static HTML.** Rows are emitted by builder functions (`acRows()` / `payRows()` or equivalent) off shared per-size data objects. Copy the builders verbatim across firms. Never hand-write row `<tr>`/card HTML.
6. **One chrome.** The canonical header, footer, base CSS, chrome CSS, and chrome JS below are the *only* chrome. Strip every other header/footer/toggle you find and inject these.
7. **No unrequested changes.** If a transform isn't specified here, don't do it. Scope is exactly: wrap pages in canonical chrome, wire links, enforce data rules, validate.

---

## 2. File inventory & roles

| File | Role | Deploy as |
|---|---|---|
| `cpf-base.css` | **Canonical** design tokens + resets. Load **first**, once, globally. | `/assets/cpf-base.css` |
| `cpf-chrome.css` | **Canonical** chrome styles (header/footer/nav/footer-disclosure). Load **second**. | `/assets/cpf-chrome.css` |
| `cpf-chrome.js` | **Canonical** chrome behavior. Load **last** (`defer`). ⚠️ See §4 gap — must be extended. | `/assets/cpf-chrome.js` |
| `cpf-chrome-header.html` | **Canonical** header markup (`<header class="site-nav" id="siteNav">` + mega-menu + mobile drawer). Inject at top of `<body>`. | injected partial |
| `cpf-chrome-footer.html` | **Canonical** footer markup (`<footer class="site-foot">` + disclosures). Inject before scripts. | injected partial |
| `cpf-tradeify.html` | **Cornerstone** firm page (eval + instant). Body content + firm-specific CSS/JS only. | `/firms/tradeify/` |
| `cpf-alpha-futures.html` | **Cornerstone** firm page (eval only). | `/firms/alpha-futures/` |
| `cpf-category-best-prop-firms-desktop-v2.html` | Category/listing page body (`<main class="pf-list">`). | `/best-futures-prop-firms/` |
| `cpf-homepage.html` | Homepage body. | `/` |
| `cpf-article.html` | Article template body. | `/<article-slug>/` |
| `cpf-news-hub.html` | News index body. | `/news/` |
| `cpf-about.html` | About page body. | `/about/` |
| `cpf-legal.html` | Legal template body (privacy / terms / etc.). | `/legal/<slug>/` |
| `cpf-header-footer.html` | **Reference only.** A full demo page bundling chrome. Do **not** deploy. Use it only to cross-check the canonical partials. | — |
| `*-content-map.md` | Per-firm data source of truth (first-party facts). | — |
| `*-handoff.md` | Per-firm architecture / changelog / open items. | — |

**Roles to internalize:** `cpf-base.css` + `cpf-chrome.css` + `cpf-chrome.js` + `cpf-chrome-header.html` + `cpf-chrome-footer.html` = **the chrome system**. Everything else is a **page body** that gets wrapped in it.

---

## 3. The canonical page contract

Every deployed HTML page — firm, category, homepage, article, news, about, legal — has this exact skeleton. Nothing varies except `<title>`, meta, the page-specific `<style>`, the `<main>` body, and the page-specific `<script>`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <!-- THEME BOOTSTRAP: inline, pre-paint, never externalize. Verbatim: -->
  <script>(function(){try{if(localStorage.getItem('cpf-theme')==='dark')document.documentElement.classList.add('dark');}catch(e){}})();</script>
  <title>‹PAGE TITLE› — ComparePropFirms.com</title>
  <meta name="description" content="‹≤155 chars, first-party accurate›">
  <link rel="canonical" href="https://comparepropfirms.com‹/path/›">
  <!-- og:/twitter: tags as per §6.4 -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700;8..60,800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/cpf-base.css">
  <link rel="stylesheet" href="/assets/cpf-chrome.css">
  <style>/* PAGE-SPECIFIC CSS ONLY — no token redefinitions, no chrome styles */</style>
</head>
<body>
  <!-- INJECT cpf-chrome-header.html verbatim -->
  <main>
    <!-- PAGE BODY -->
  </main>
  <!-- INJECT cpf-chrome-footer.html verbatim -->
  <script src="/assets/cpf-chrome.js" defer></script>
  <script>/* PAGE-SPECIFIC JS ONLY — no theme toggle, no chrome behavior */</script>
</body>
</html>
```

**Asset load order is mandatory:** `cpf-base.css` → `cpf-chrome.css` → page `<style>`; then `cpf-chrome.js` → page `<script>`. Base defines the tokens the chrome consumes; reversing the order breaks theming.

**The ID contract (canonical — the only ids the chrome JS knows):**

| Element | Canonical id | Bound by |
|---|---|---|
| Header `<header>` | `siteNav` | `cpf-chrome.js` (sticky shadow) |
| Theme toggle button | `themeToggle` | `cpf-chrome.js` |
| Futures mega-menu | `futuresDD` / trigger `futuresTrigger` | `cpf-chrome.js` |
| Footer disclosure wrap / button / panel | `footDisc` / `discToggle` / `discPanel` | `cpf-chrome.js` |
| Mobile drawer | `mobileNav` / `mobileNavOverlay` / `mobileNavClose` | ⚠️ **not yet bound — see §4** |

**`theme-toggle` (hyphenated) is forbidden in output.** It is the legacy id; the shared JS binds `themeToggle`. Every occurrence in a page body must be removed (the page no longer owns the toggle — the injected header does).

---

## 4. Known drift & gaps you MUST reconcile

These are the specific defects in the source. Fix exactly these; don't go looking for others to "improve."

1. **Three headers exist. Keep one.** Canonical = `cpf-chrome-header.html`. The legacy `<nav class="nav">…<a class="nav-logo">ComparePropFirms<span class="dot">.</span></a>` found in the firm cornerstones and the older inline header in the page templates are both **deleted** and replaced by the canonical injection. (The "image-logo + mega-menu" header is canonical; the "serif wordmark + CTA" header is legacy. This resolves the open nav-standard question in favor of the chrome file.)
2. **Two toggle contracts. Keep one.** Standardize on `themeToggle`. Delete every `theme-toggle` id and every inline toggle handler in page bodies (e.g., the bottom-of-`<body>` `getElementById('theme-toggle')` script in the firm pages). The toggle now lives in the injected header and is driven by `cpf-chrome.js`.
3. **`cpf-chrome.js` does not bind the mobile drawer.** The canonical header ships `mobileNav` / `mobileNavOverlay` / `mobileNavClose`, but the open/close handler currently lives *inline in the templates only* (e.g., homepage ~line 1331). **Action:** lift that handler into `cpf-chrome.js` (one place), and confirm/standardize the hamburger opener id in the header. After this, the drawer works on every page from the shared JS alone. Do **not** leave drawer JS inline in page bodies.
4. **The homepage inline header is missing the 66-line mobile drawer block.** Irrelevant once you replace inline headers with the canonical injection — but it's proof the inline copies have drifted. Never trust an inline chrome copy; always use the canonical partial.
5. **Placeholder links.** `cpf-chrome-header.html` and `cpf-chrome-footer.html` contain `href="#"` and `href="#"`-style placeholders, and footer social links are `#`. All must be resolved against §6. No `href="#"` may ship.

---

## 5. Per-page-type assembly transform

For **every** page: produce the §3 skeleton, inject canonical header+footer, wire links (§6), externalize chrome CSS/JS, delete legacy chrome, run the validation chain (§8). Page-specific deltas below.

### 5a. Firm pages (Tradeify / Alpha Futures patterns)
- Extract the firm **body** (everything between the legacy `<nav>` and the closing chrome). Wrap it in `<main>`.
- **Delete** the legacy `<nav class="nav">` header and the bottom inline theme-toggle script.
- Keep the firm's own `<style>` (tab UI, accent colors) and `<script>` (tab logic, `acRows()`/`payRows()`, `CMP_DATA`) **inside** the page — these are firm-specific, not chrome.
- Apply the **data accuracy module (§7)** in full. This is where accuracy lives or dies.
- Per-product accent comes from existing palette tokens only (`--purple`/`--blue`/`--orange`/etc.); never recolor `--orange` itself.

### 5b. Category / listing page
- Body is `<main class="pf-list">`. Wrap with canonical chrome.
- Listing rows/cards must read the **same canonical phrases** (§7) as firm pages — a "Min payout days" value shown in the list must be the identical string used on that firm's page.
- If a desktop-only and a mobile variant exist (you currently maintain a separate mobile category build on Cloudflare Pages), **converge to one responsive page** under the canonical chrome. Note this in the handoff; don't silently drop the mobile variant until the responsive page is validated at 390px.

### 5c. Homepage
- Body wrapped in `<main>`. **Replace** its inline (drifted) header/footer with canonical injection.
- The "Compare any two firms" widget and "Top funded offers" cards must pull from the same canonical phrase set so homepage figures equal firm-page figures.

### 5d. Article / News hub / About / Legal
- Same transform: strip inline chrome, inject canonical, wire links.
- These have mixed `themeToggle`/`theme-toggle` usage — purge `theme-toggle` entirely (§4.2).
- Legal pages: confirm the disclosure copy in the footer matches the standalone legal pages; the footer "Editorial Standards & Disclosures" text is canonical and must not be reworded per page.

---

## 6. URL & link wiring map

Resolve **every** `href="#"` to a real path. Confirm host casing/`www` once and apply globally: `‹VERIFY: comparepropfirms.com apex vs www — pick one, 301 the other›`.

### 6.1 Canonical URL patterns
| Page type | Path pattern |
|---|---|
| Homepage | `/` |
| Firm review | `/firms/<firm-slug>/` |
| Category / "best" list | `/best-futures-prop-firms/` |
| Compare tool | `/compare/` |
| Reviews index | `/reviews/` |
| Guides index | `/guides/` |
| News hub | `/news/` |
| Article | `/<article-slug>/` |
| About | `/about/` |
| Legal | `/legal/privacy/`, `/legal/terms/`, `/legal/sitemap/` |

> **Migration constraint:** for any firm already live on WordPress, the new path **must equal the existing WordPress URL** so rankings and backlinks carry over with zero redirects. Pull the live slug from the current sitemap before assigning a path. Only mint a new pattern for pages that don't yet exist.

### 6.2 Header nav targets (canonical)
Map the mega-menu and primary links to the patterns above. "Best Futures Prop Firms" → `/best-futures-prop-firms/`. Each firm in the mega-menu → `/firms/<slug>/`. `‹VERIFY›` the full firm list against the live nav.

### 6.3 Footer link targets
- **Top Prop Firms** (Tradeify, Apex Trader Funding, Take Profit Trader, Lucid Trading, Topstep) → `/firms/<slug>/`; "View all firms →" → `/reviews/` (or `/best-futures-prop-firms/` — pick one, apply everywhere).
- **Resources** (Reviews, Guides, Payout Rules, Scaling Plans, News Hub, Compare Firms) → their index paths.
- **Support** (About Us → `/about/`; email is already `mailto:support@comparepropfirms.com` — keep).
- **Social** icons → real profile URLs `‹VERIFY›`; if a profile doesn't exist, remove the icon rather than ship `#`.
- **Bottom bar** legal links → `/legal/...`. Copyright "© 2026 Compare Prop Firms" is canonical.

### 6.4 Per-page meta
Each page needs a unique `<title>`, `<meta name="description">`, self-referential `<link rel="canonical">`, and og/twitter tags. Titles follow `‹Subject› — ComparePropFirms.com` (matches the existing Tradeify title format).

---

## 7. Firm-page data accuracy module

This is the section that makes or breaks the "zero mistakes" goal. Apply to every firm page.

### 7.1 Sourcing
- Pull **only** from the firm's own site/help center. Cite the source article id in the content map (the Tradeify map already does this, e.g. help-center article numbers).
- If a help center is unreachable (e.g. Cloudflare-blocked), **do not** substitute a guess or an aggregator. Mark the field `‹VERIFY›` and leave it out of verified surfaces.

### 7.2 `‹VERIFY›` discipline
- Any unconfirmed founder/platform/Trustpilot/data point keeps a literal `‹VERIFY›` token in the content map and is **suppressed** from the rendered page (don't render a `‹VERIFY›` to visitors; render nothing or a neutral "—" and keep the flag in the map until confirmed).

### 7.3 Uniform row schema (deliberate deviation propagating to all pages incl. cornerstone)
- **Accounts tab / Evaluation toggle:** 12 rows.
- **Accounts tab / Funded toggle:** 12 rows (the funded set).
- **Payouts tab:** 11–14 rows (firm-dependent; default 11, extend only when the firm genuinely publishes more).
- Funded toggle always shows **Account Size + Price** buttons; **Max Payout is its own row**, never a button label.
- Rows are emitted by `acRows()` / `payRows()` (or the firm's named builder) off per-size data objects — copy the builder verbatim across firms.

### 7.4 Slot-key mapping (internal keys never change, public labels can)
- Internal: `growth` / `select` / `lightning` for product slots; `eval` / `funded` for phases. Preserve these in code regardless of the firm's public marketing names. Map public label → slot key in the content map; never rename the slot key.

### 7.5 Single data object
- Comparison view and Payouts tab both read `CMP_DATA` (or the firm's equivalent). One object. If you find two, merge to one and point both renderers at it.
- `rerenderAllAccountCards()` and similar must be scoped to `#view-comparison` so a phase toggle can't clobber payout cards.

### 7.6 Exact-match phrasing
- Use `cpf-canonical-phrases.json` as the dictionary. Before emitting any value, normalize it through the bank: durations ("5 trading days"), drawdown types ("EOD trailing"), payout method names, country-eligibility labels, etc.
- If a firm uses a value not yet in the bank, **add it to the bank** (with its canonical string) so the next firm that shares it renders identically. The bank grows; it never forks.

---

## 8. Validation chain & Definition of Done

Run on **every** page before it ships. Author in a working copy (`/home/claude/work/…`), validate, then copy to the deploy directory — never edit the deploy file directly. Make every edit with the guarded `rep(old, new, expected_count)` helper that asserts exact occurrence count before replacing; a failed assertion writes nothing.

**Per-page gates (all must pass):**
1. `node --check` on **each** extracted `<script>` block → expect **all clean** (firm pages have 3 blocks; expect 3/3).
2. Playwright headless Chromium render at **desktop ~1200–1400px** and **mobile 390px** — no console errors, header sticky-shadow works, theme toggle flips and persists, Futures mega-menu opens, mobile drawer opens/closes, footer disclosure expands.
3. **Chrome parity check:** the page's header+footer is byte-identical to the canonical partials (diff against `cpf-chrome-header.html` / `cpf-chrome-footer.html`, normalized whitespace). Any diff = fail.
4. **ID contract check:** zero occurrences of `theme-toggle`; exactly one `id="siteNav"`, one `id="themeToggle"`, one `id="footDisc"`; mobile-drawer ids present.
5. **Link check:** zero `href="#"`; every internal link resolves to a §6 path; canonical tag is self-referential and absolute.
6. **Canonicalization lint:** every comparable value matches a `cpf-canonical-phrases.json` entry; no `‹VERIFY›` token rendered to the visitor.
7. **Asset order check:** base → chrome → page CSS; chrome.js before page JS.

**Site-wide gates:**
- Two firms sharing a value render the **identical string** (cross-page diff of canonical fields).
- One URL is served from exactly one place (no page exists in both the new build and WordPress simultaneously — see migration routes manifest).
- `sitemap.xml` lists only canonical URLs; robots allows them.

Deliver with `present_files` only after all gates pass.

---

## 9. Companion files
- `cpf-site-manifest.json` — machine-readable: file roles, page-type transforms, asset load order, id contract, link map skeleton, validation gates. Parse this to drive the build.
- `cpf-canonical-phrases.json` — the exact-match wording bank + row schema. Normalize every value through it.

**If anything in a source file contradicts this spec, this spec wins. If a fact can't be confirmed first-party, stop and flag `‹VERIFY›` — never fill the gap with a guess.**
