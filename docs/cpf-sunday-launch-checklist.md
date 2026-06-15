# ComparePropFirms — Build-to-Sunday Checklist

**Status (Sun 14 Jun, reconciled):** repo **pushed & current** — `origin/main` @ `067449a` is byte-identical to the working tree (139 site files, 0 diff). Clean chrome ✅ · 15 firm review pages ✅ · 8 category pages w/ 15-firm catalog + filters ✅ · news hub `/articles/` (19 posts) ✅ · affiliate CTAs on all 15 ✅ · homepage guide cards linked ✅ · rich 4-tab snapshots on all 15 ✅ · internal link audit clean ✅ · **all 15 firms' comparison data now built & filled** (weekend=No, promo fees, refund=No everywhere) ✅ · 19/19 jsdom-clean ✅.

> **One push pending:** today's edits (new-firm refund=No, Alpha/Lucid weekend rules-tab fix, Apex page replace) are in the working copy + zip but **not yet pushed**. Commit → **Push origin** in GitHub Desktop.

---

## 1. BUILD — pages  (DONE)
- [x] best-prop-firms flagship + 7 sub-categories
- [x] Catalog = 15 firms in shared `FIRMS`; filter membership matches screenshots
- [x] 15 firm review pages `/prop-firm/<slug>/`
- [x] News hub `/articles/` — 19 WP posts at exact URLs
- [x] Homepage "Explore Our Latest Guides" → real articles
- [x] Rich 4-tab snapshots on all 15
- [x] Crypto / Options / Forex header links → live site, new tab, WP-served

## 2. COMPARISON DATA — (DONE since last edit)
- [x] **Built `cmp` from scratch for the 7 original firms that were blank** (alpha, fundednext, bulenox, daytraders, ffn, tradeday, tpt) — parsed each page's `ACCOUNT_DATA`/`CARD_DATA`
- [x] Filled with your confirmed values; **0 `‹VERIFY›` left** on those 7
- [x] **weekend = No across all 15** (no futures firm holds over weekend)
- [x] **refund = No across all 15** (incl. the 4 new firms, just resolved)
- [x] Fees = your **promo prices** (Alpha $59.25/mo, Bulenox $19.25/mo, TPT $102/mo, FundedNext $79.99, DayTraders $30, FFN $75/mo, TradeDay $62/mo)
- [x] **Weekend rules-tab consistency** fixed on Alpha + Lucid review pages (were "Allowed"; now "Not Allowed"). Bulenox verified already correct.
- [x] Apex review page replaced with your new version — all links/affiliate/compare preserved

## 3. WIRE — make it work + go live  (OPEN)
- [x] "Get Funded" affiliate CTAs on all 15 + cards; FundedNext on `jered18`
- [x] Real firm logos in `/cpf-logos/`
- [x] Internal link audit — 0 broken
- [ ] **Push today's edits** (see banner)
- [ ] `routes.json` — flip built category + firm + article paths `wordpress` → `pages`
- [ ] Verify on **cpfv2.pages.dev**, then live domain
- [ ] **Footer `#` links** — 4 social + footer nav → real URLs (fix once in footer partial)
- [ ] **Normalize the 4 new firm pages** (apex, blusky, mff, topone) to shared `/assets/` chrome — still self-contained inline CSS/JS

## 4. SEO + quality  (OPEN — gap concentrated on the 4 new firms)
- [x] Unique `<title>` per page
- [x] canonical + meta description + OG tags — **on 11 originals + category pages**
- [ ] **canonical / meta description / OG MISSING on the 4 new self-contained pages** (apex, blusky, mff, topone) — add to match the other 11
- [ ] **Favicon + apple-touch-icon** — currently on 0 pages
- [ ] `sitemap.xml` + `robots.txt` exist — **update to include the new/migrated pages** (verify coverage)
- [ ] Mobile QA at 390px per page type
- [ ] Analytics (GA4 / GTM) — one snippet in chrome
- [ ] Press bar "As featured in" — real assets vs placeholders
- [ ] 3 low-res hero images — replacements at same filenames

## 5. OPEN DATA — `‹VERIFY›` cells (4 NEW firms only; you resolve, I clear)
*weekend + refund now resolved for all — counts below are what remains.*
- [ ] **Apex (4):** processing, scaling, news, copy
- [ ] **BluSky (4):** min payout, daily loss, resets, copy
- [ ] **MFF (9):** processing, min payout, daily loss, max accounts, min days, resets, scaling, bots, copy
- [ ] **Top One (8):** payout frequency, min payout, daily loss, max accounts, min days, resets, scaling, copy
- [ ] **MFF + Top One** also missing a Weekend Holding row in their rules tab (structural)
- *Note:* **copy trading** is `‹VERIFY›` on all 4 — you can answer once for all four.

## 6. KLAVIYO — homepage signup
Needs from you: **Public API Key** (6-char site ID) · **List ID** · **double opt-in yes/no.** Then the form gets wired.

## 7. LAUNCH — Sunday
- [ ] Final push · flip `routes.json` to `pages` · smoke test each live URL (desktop + mobile) · confirm WP still serves un-migrated paths · spot-check 2–3 data points per firm vs live firm sites

## 8. POST-LAUNCH backlog
- [ ] Per-size pricing matrix in Accounts tab for non-Tradeify firms
- [ ] Lean static crypto/options/forex pages (currently WP)
- [ ] Streaming/analytics (separate): Apps Script TradingView webhook → new deployment URL

> **Decision needed:** main `/category/best-prop-firms/` defaults to `core` (original 11). Tag the new 4 `core` to surface them on the default flagship view? Your call.
