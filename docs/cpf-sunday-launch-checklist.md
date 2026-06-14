# ComparePropFirms — Build-to-Sunday Checklist

**Status (Sun 14 Jun):** clean chrome ✅ · footer real logo ✅ · **15 firm review pages** built ✅ · **8 category pages** with 15-firm catalog + filters ✅ · news hub `/articles/` (19 posts) ✅ · affiliate CTAs wired on all 15 ✅. Remaining before launch: footer links, normalize the 4 new pages to shared chrome, resolve `‹VERIFY›` cells, push + flip routes.

---

## 1. BUILD — pages
- [x] **best-prop-firms** category page — flagship ranking = the **set 11** (new 4 excluded from default via `core` tag)
- [x] **7 sub-categories** — instant-funding · five-plus-trading-accounts · profit-split-bonus-offers · one-step-evaluation · no-evaluation-funding-fee · live-trading-path · tradovate
- [x] **Category catalog = 15 firms** — 4 new firms (Apex, BluSky, MFF, Top One) added to shared `FIRMS`; filter membership aligned to your 5 screenshots (Evaluations / Instant / 5+ / Profit Split / Trade News)
- [x] **15 firm review pages** `/prop-firm/<slug>/` — 11 original + apex-trader-funding · blusky-trading-company · my-funded-futures · top-one-futures
- [x] **News hub** `/articles/` — 19 WP posts migrated at exact URLs
- [x] **Crypto / Options / Forex** — pointed to WordPress in `routes.json` (lean static build deferred post-launch)
- [ ] **Homepage** — attach `cpf-homepage.html` in chat and Claude builds it
- [ ] **Klaviyo** on the homepage signup — see §4

## 2. WIRE — make it work + go live
- [x] **"Get Funded" CTAs** — real affiliate links on all 15 firm pages + category cards (`target=_blank rel="sponsored noopener"`)
- [x] **Real firm logos** — category cards pull `/cpf-logos/<slug>-logo.png`; all 15 present
- [ ] Commit **and push** every built file (Desktop: Commit → **Push origin**) — *commit ≠ push; you've been holding until the new firms landed — that's now done*
- [ ] `routes.json`: flip the built category + firm + article paths from `wordpress` → `pages`
- [ ] Verify live URLs on cpfv2.pages.dev, then the domain
- [ ] **Footer links** — replace the placeholder `#` links (4 social + footer nav) with real URLs (fixed once in the footer partial)
- [ ] **Normalize the 4 new firm pages** to the shared `/assets/` chrome (cpf-base.css / cpf-chrome.css / cpf-chrome.js) — they are currently fully self-contained (inline CSS/JS, no chrome.js include). Visual header/footer spot-check needed.

## 3. OPTIMIZE — SEO + quality
- [x] Unique `<title>` + canonical per page
- [ ] Meta description per page
- [ ] Open Graph + Twitter card tags (link previews)
- [ ] Favicon + apple-touch-icon
- [ ] `sitemap.xml` + `robots.txt` updated for the new pages
- [x] Headless (jsdom) render on every firm + category page — **23/23 clean** this pass
- [ ] Mobile QA at 390px on each page type
- [ ] Analytics (GA4 / GTM) — one snippet in the chrome
- [ ] **Press bar** "As featured in" (PBS / Forbes / WSJ / USA Today) — real assets vs current placeholders
- [ ] **3 low-res hero post-images** — replacements at same filenames

## 4. KLAVIYO — homepage signup
**What Claude needs from you (3 things):** Public API Key (6-char site ID) · List ID · double opt-in yes/no.
Then Claude wires the homepage form via Klaviyo embedded form (fastest for Sunday) or custom form → Client API (keeps our design).

## 5. OPEN DATA ITEMS — `‹VERIFY›` + judgment calls (you resolve)
- [ ] **New-firm `cmp` cells flagged `‹VERIFY›`** in the comparison table (processing, minPayout, dailyLoss, maxAcc, minDays, resets, scaling, copy, weekend, refund — varies by firm). Confirm and Claude clears them.
- [ ] **CPF score conflict — MFF & Top One:** your screenshots show **4.0**, but their review pages (your newer builds) show **4.8**. Catalog currently uses **4.8** (matches the page = single source of truth). They're ranked **12–13** (appended below the set 11), so a 4.8 firm sits below 4.3 core firms in filtered views. Tell me to switch to 4.0 (and lower the hero) or to interleave by score.
- [ ] **Apex** appears in **none** of your 5 screenshots — tagged by its real model (`eval`, `fiveplus`, `news`) so it's discoverable. Say if you want it hidden from filters or placed elsewhere.
- [ ] **Top One promo code:** review page pill = `5WK4X64N`; your Trade-News screenshot shows `ANNIVERSARY`. Used the page code — confirm which is live.
- [ ] **MFF side-box:** replaced the "100K+ traders since 2023" testimonial stat with the **4.9 Trustpilot** rating you asked for. Keep, or restore the 100K+ and put 4.9 elsewhere?
- [ ] **Split value formatting** — MFF gray chev rendered "80–90%" (en-dash) per your "80%-90%".

## 6. LAUNCH — Sunday
- [ ] Final push of all pages
- [ ] Flip `routes.json` paths to `pages`
- [ ] Smoke test each live URL (desktop + mobile): menu, drawer, cards, filters, compare, CTAs, footer
- [ ] Confirm WordPress still serves everything not yet migrated
- [ ] Spot-check 2–3 firm data points per firm against the live firm sites

## 7. POST-LAUNCH backlog
- [ ] Rich category sub-tabs (Accounts / Rules / Payouts) are data-driven only for Tradeify (`richTabs:true`); other firms show the lean overview. Build out when ready.
- [ ] Lean static crypto / options / forex category pages (currently WP).
- [ ] Streaming/analytics (separate project): Apps Script TradingView webhook still on old deployment URL — update to new.
