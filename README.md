# comparepropfirms-v2

The new ComparePropFirms.com — self-contained HTML pages on one shared chrome, deployed via Cloudflare Pages, migrating off WordPress one audited page at a time.

## What's in here

| Folder | What it is | Deployed? |
|---|---|---|
| `assets/` | The shared chrome the whole site inherits: `cpf-base.css` (tokens) → `cpf-chrome.css` (styles) → `cpf-chrome.js` (behavior). Load in that order. | ✅ yes |
| `partials/` | Canonical header + footer markup (`chrome-header.html`, `chrome-footer.html`). One source of truth — every page injects these verbatim. | ✅ (injected) |
| `prop-firm/` | New firm review pages, built as `prop-firm/<slug>/index.html` at the **live** URL (e.g. `prop-firm/tradeify/`). Empty until we build them. | ✅ yes |
| `category/` | New category pages, e.g. `category/best-prop-firms/instant-funding/index.html`. Empty until we build them. | ✅ yes |
| `data/firms/` | Per-firm JSON in the `CMP_DATA` shape. Pages render from this — never hardcode firm data. | source |
| `contract/` | The rules, versioned with the code: build spec, site manifest, canonical phrase bank, link map, and the firm-data JSON schema. | source |
| `scripts/` | The audit gates: `validate.mjs` (page contract) and `seed-check.mjs` (firm-data completeness). Dependency-free; run with Node. | dev |
| `routes.json` | Migration status board. Every live URL → `wordpress` or `pages`. Flip to `pages` only after a page passes audit. | source |
| `docs/` | Reference reports (site audit, full URL inventory, master list, rebuild plan). Read-only background. | no |
| `reference/` | The two cornerstone firm pages + their content maps, and `design-source/` (old WP-design pages for **look reference only**). **Do not deploy.** | no |

## The two URL rules that must never break
- Firm pages live at **`/prop-firm/<slug>/`** (matches live WordPress — zero redirects on cutover).
- Futures categories are **nested**: `/category/best-prop-firms/<subcat>/`. Verticals: `/category/crypto|options|forex/`.

## Running the gates (anyone, locally)
```
node scripts/validate.mjs            # audits built pages against the chrome/link/asset contract
node scripts/seed-check.mjs data/firms/<firm>.json   # checks a firm's data is render-complete
```

## First build task (not done yet)
Clean the chrome once, since every page inherits it: externalize `assets/*` into pages, remove the legacy `theme-toggle` id, add the mobile-drawer handler to `cpf-chrome.js`, and correct the mega-menu links per `contract/cpf-link-map.json`. Then build the first category page as the validated gold-standard the rest copy.

---

## STANDING INSTRUCTION FOR THE AGENTIC AI (paste this to it)

> Build only from the validated reference page in this repo and the files in `contract/` and `data/`. Never invent navigation, links, URLs, or firm data — if a value isn't in `data/` or `contract/`, stop and ask. Firm pages go at `/prop-firm/<slug>/`; categories at `/category/best-prop-firms/<subcat>/` (and `/category/crypto|options|forex/`). Inject the canonical `partials/chrome-header.html` and `partials/chrome-footer.html` verbatim and load `assets/cpf-base.css` → `cpf-chrome.css` → page CSS, then `cpf-chrome.js`. Every page must pass `node scripts/validate.mjs` with zero FAIL before you open a pull request. Do not deploy anything under `reference/` or `docs/`.
