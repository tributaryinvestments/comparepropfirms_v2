# ComparePropFirms — Build-to-Sunday Checklist

**Status (Sun 14 Jun):** clean chrome ✅ · 15 firm review pages ✅ · 8 category pages with 15-firm catalog + filters ✅ · news hub `/articles/` (19 posts) ✅ · affiliate CTAs on all 15 ✅ · homepage guide cards linked ✅ · rich 4-tab snapshots on all 15 ✅ · internal link audit clean (0 broken) ✅. **Remaining before launch:** resolve `‹VERIFY›` cells · footer `#` links · push + flip `routes.json` · SEO/meta polish · Klaviyo. Everything below is committed to the working copy but **NOT pushed** — you push via GitHub Desktop (commit ≠ push).

---

## 1. BUILD — pages  (DONE)
- [x] **best-prop-firms** flagship page — ranking = the **set 11** (new 4 excluded from default via `core` tag — see flag at bottom)
- [x] **7 sub-categories** — instant-funding · five-plus-trading-accounts · profit-split-bonus-offers · one-step-evaluation · no-evaluation-funding-fee · live-trading-path · tradovate
- [x] **Catalog = 15 firms** — Apex, BluSky, MFF, Top One added to shared `FIRMS`; filter membership matches your 5 screenshots
- [x] **15 firm review pages** `/prop-firm/<slug>/`
- [x] **News hub** `/articles/` — 19 WP posts at exact URLs
- [x] **Homepage "Explore Our Latest Guides"** — 4 placeholders → real articles; "View all guides" → `/articles/`
- [x] **Rich 4-tab snapshots (Overview/Accounts/Rules/Payouts) on all 15 firms** — Tradeify keeps its bespoke per-size matrix; others render a data-driven snapshot from `cmp` (real values, `‹VERIFY›` where unconfirmed)
- [x] **Crypto / Options / Forex** header links — now open in a **new tab to the live site** (`https://comparepropfirms.com/category/…/`, `target=_blank`); still served by WordPress via `routes.json`

## 2. WIRE — make it work + go live
- [x] **"Get Funded" CTAs** — real affiliate links on all 15 pages + cards (`rel="sponsored noopener"`); FundedNext on `jered18`; no stale affiliate links found
- [x] **Real firm logos** — all 15 present in `/cpf-logos/`
- [x] **Internal link audit** — 2,047 internal links resolve · 528 correctly proxy to WordPress · **0 broken**
- [ ] **Commit AND push** every file (Desktop: Commit → **Push origin**). `origin/main` is still the pre-build state until you push.
- [ ] `routes.json` — flip the built category + firm + article paths from `wordpress` → `pages`
- [ ] Verify on **cpfv2.pages.dev**, then the live domain
- [ ] **Footer links** — replace the placeholder `#` links (4 social + footer nav) with real URLs (fix once in the footer partial)
- [ ] **Normalize the 4 new firm pages** to shared `/assets/` chrome — they're currently self-contained (inline CSS/JS, no chrome.js); header/footer spot-check needed

## 3. OPTIMIZE — SEO + quality
- [x] Unique `<title>` + canonical per page
- [x] Headless (jsdom) render on every page — **19/19 clean** this pass
- [ ] Meta description per page
- [ ] Open Graph + Twitter card tags (link previews)
- [ ] Favicon + apple-touch-icon
- [ ] `sitemap.xml` + `robots.txt` updated for new pages
- [ ] Mobile QA at 390px on each page type
- [ ] Analytics (GA4 / GTM) — one snippet in the chrome
- [ ] **Press bar** "As featured in" — real assets vs placeholders
- [ ] **3 low-res hero images** — replacements at same filenames

## 4. KLAVIYO — homepage signup
Needs 3 things from you: **Public API Key** (6-char site ID) · **List ID** · **double opt-in yes/no.** Then the homepage form gets wired (embedded form = fastest for Sunday, or custom → Client API to keep our design).

## 5. OPEN DATA — `‹VERIFY›` cells (you resolve, I clear)
All in the comparison table for the 4 new firms only:
- [ ] **Apex (6):** payout processing, scaling, news, copy, weekend, refund
- [ ] **BluSky (6):** min payout, daily loss, resets, copy, weekend, refund
- [ ] **MFF (11):** processing, min payout, daily loss, max accounts, min days, resets, scaling, bots, copy, weekend, refund
- [ ] **Top One (10):** payout frequency, min payout, daily loss, max accounts, min days, resets, scaling, copy, weekend, refund

*Resolved earlier (no action needed):* MFF & Top One scores set to **4.0** (ranked 14–15) · Apex shown under eval/5+/news · Top One promo `5WK4X64N` · MFF side-box shows 4.9 Trustpilot.

## 6. LAUNCH — Sunday
- [ ] Final push of all pages
- [ ] Flip `routes.json` paths to `pages`
- [ ] Smoke test each live URL (desktop + mobile): menu, drawer, cards, filters, compare, CTAs, footer
- [ ] Confirm WordPress still serves everything not yet migrated
- [ ] Spot-check 2–3 data points per firm against the live firm sites

## 7. POST-LAUNCH backlog
- [ ] Per-size pricing matrix in the Accounts tab for non-Tradeify firms (needs each firm's per-size pricing; snapshot stands until then)
- [ ] Lean static crypto / options / forex pages (currently WP)
- [ ] Streaming/analytics (separate project): Apps Script TradingView webhook → update old deployment URL to new

> **Decision needed (visibility):** the main `/category/best-prop-firms/` page defaults to the `core` filter (your original 11). Apex, BluSky, MFF, Top One show under their specific filters but **not** on the default flagship view. Tag the new 4 `core` to surface them there by default? Your call.
