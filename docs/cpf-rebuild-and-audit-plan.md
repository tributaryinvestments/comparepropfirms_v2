# Angle 3 — Rebuild on GitHub + Audit Loop (the way forward)

**Goal:** put the build where I can actually audit it on every pass, lock the contract into the repo, and migrate off WordPress one audited page at a time without breaking SEO.

---

## 1. Why GitHub is the unlock

Right now I can only see the new site as rendered HTML from the outside, and inline base64 logos drown the DOM — so I can't verify the things that decide quality (externalized assets, exact element ids, chrome byte-parity, the `CMP_DATA` row schema, node-clean scripts). **If the source lives in a GitHub repo, I can pull the raw files directly** (github.com and raw.githubusercontent.com are reachable from my environment) and run the full validation chain locally, file by file, every pass. That turns "I think the nav looks wrong" into "line 412 ships `href="#"`, fix it."

Cloudflare Pages already deploys from Git, so this also fits your hosting: connect the Pages project to the repo, every push gets a preview URL, every merge to `main` deploys.

---

## 2. Proposed repo structure

```
comparepropfirms-v2/
├─ assets/
│  ├─ cpf-base.css            # tokens + resets (load 1st)
│  ├─ cpf-chrome.css          # chrome styles (load 2nd)
│  └─ cpf-chrome.js           # chrome behavior (incl. mobile drawer — fix the gap)
├─ partials/
│  ├─ chrome-header.html      # canonical header (one source of truth)
│  └─ chrome-footer.html      # canonical footer
├─ prop-firm/                 # firm reviews at LIVE urls: /prop-firm/<slug>/
│  ├─ tradeify/index.html
│  ├─ alpha-futures/index.html
│  └─ …
├─ category/
│  └─ best-prop-firms/
│     ├─ index.html
│     ├─ instant-funding/index.html
│     ├─ one-step-evaluation/index.html
│     └─ …
├─ articles/ , about/ , legal/ …
├─ data/
│  └─ firms/<slug>.json       # per-firm CMP_DATA (first-party, the single source)
├─ contract/                  # THE RULES, versioned with the code
│  ├─ cpf-build-spec.md
│  ├─ cpf-site-manifest.json
│  ├─ cpf-canonical-phrases.json
│  └─ cpf-link-map.json
├─ routes.json                # migration source of truth: which paths are "pages" vs "wordpress"
├─ scripts/
│  └─ validate.mjs            # the audit harness (run in CI + by me)
└─ .github/workflows/ci.yml   # runs validate.mjs on every PR
```

Two principles: the **contract files live in the repo** next to the code they govern (so the agent can't drift from a spec it can't see), and **per-firm data is JSON in `/data`**, with each firm page rendering from its JSON so comparison view and Payouts tab literally cannot diverge.

---

## 3. The audit loop (every pass)

1. **Agent works on a branch**, one page or cluster at a time, rendering from `/data` JSON and injecting the canonical partials.
2. **Agent opens a PR.** CI runs `validate.mjs` automatically (the gates below). PR can't merge red.
3. **I pull the branch** (`git clone` / raw fetch), run `validate.mjs` plus a Playwright pass at 1280px and 390px, and hand back a **per-file pass/fail defect report** — exact lines, exact fixes.
4. **Agent fixes**, pushes; repeat until green.
5. **Merge → Pages deploy.** Then flip that path in `routes.json` from `wordpress` to `pages` (§5).

**Gates `validate.mjs` enforces (from the build spec):**
- `node --check` on every `<script>` block (firm pages expect 3/3 clean).
- **ID contract:** zero `theme-toggle`; exactly one `siteNav` / `themeToggle` / `footDisc`; mobile-drawer ids present.
- **Chrome parity:** each page's header+footer is byte-identical to `partials/` (normalized whitespace).
- **Link gate:** zero `href="#"`; every link matches `cpf-link-map.json` or the `/prop-firm/` `/category/` patterns; no `/compare/` until built; no fictional categories.
- **Asset order:** base → chrome → page CSS; chrome.js before page JS.
- **Canonicalization lint:** every comparable value matches `cpf-canonical-phrases.json`; no `‹VERIFY›` rendered to visitors.
- **Row schema:** firm pages emit 12 eval / 12 funded / 11–14 payout rows from builders, off one data object.

---

## 4. Fix the two build defects in the repo, once

- **Mobile drawer:** move the open/close handler into `cpf-chrome.js` and bind `mobileNav` / `mobileNavOverlay` / `mobileNavClose` (today it only lives inline in some templates, so externalizing chrome silently breaks the mobile menu).
- **URL patterns:** routing must emit `/prop-firm/<slug>/` and `/category/best-prop-firms/<subcat>/` (Angle 1/2). This is a one-time routing change, not per-page.

---

## 5. Migration: strangler-fig via `routes.json`

`routes.json` is the single source of truth for "what's live where":
```json
{ "/prop-firm/tradeify/": "pages", "/prop-firm/redline-futures-funding/": "wordpress", "/category/best-prop-firms/instant-funding/": "wordpress" }
```
A Cloudflare Worker (or Pages Functions) in front of the domain reads it: path marked `pages` → serve the new build; else → proxy to the WordPress origin (locked to Cloudflare). Finishing a page = it passes audit, merges, deploys, and you flip its value to `pages`. Because the new pages use the **same live URLs**, there are **no redirects** and equity carries over.

For cohesion across the seam during the transition, the Worker can use HTMLRewriter to inject the canonical chrome onto the still-on-WordPress pages, so old and new wear the same header/footer from day one. Migrate in clusters (all firm pages → categories → homepage) so visitors rarely cross a seam mid-journey. When every value in `routes.json` reads `pages`, WordPress is switched off.

---

## 6. Concrete sequence

1. **Create the repo**, drop in `/contract` (the four files), `/assets` + `/partials` (canonical chrome), and `scripts/validate.mjs`. Connect Cloudflare Pages to it.
2. **Complete the inventory** from the live sitemap (Angle 1 §7) → seed `routes.json` with every live URL set to `wordpress`, and `data/firms/*.json` stubs per firm.
3. **Fix routing to live URL patterns** and the **mobile-drawer JS** (§4).
4. **Re-flow the existing built pages** (homepage, firm pages, category) through the canonical contract; open PRs; I audit each to green.
5. **Stand up the Worker** with `routes.json` all pointing at WordPress (zero visible change) + edge chrome injection.
6. **Flip pages to `pages`** as each clears audit, cluster by cluster, until WordPress is empty.

---

## 7. What I need from you to start

1. **The repo** (or permission/plan to create it) — name, and confirm Cloudflare Pages will build from it.
2. **The live `/sitemap_index.xml`** (paste or upload) so I can produce the full URL master list + seed `routes.json`.
3. **Confirm the canonical host** (apex `comparepropfirms.com` vs `www`).
4. A green light on **adopting the live URL patterns** in the rebuild (vs. keeping `/firms/` + redirects).

Give me the repo and the sitemap and I'll generate the full URL master list, the seeded `routes.json`, and run the first audit pass against whatever's already in there.
