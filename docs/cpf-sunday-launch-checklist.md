# ComparePropFirms — Build-to-Sunday Checklist

**Status (Sun 14 Jun, late):** repo pushed & current through prior work. Since then, in the working copy (NOT yet pushed): homepage bugs fixed, preview table refreshed, SEO meta added to the 4 new firms, weekend rows added to MFF/Top One, sitemap updated, Apex logos standardized. 19/19 jsdom-clean.

> **One push pending** — today's batch is in the zip, not on `origin`. Commit → **Push origin** in GitHub Desktop.

---

## 1. BUILD — pages (DONE)
- [x] Flagship + 7 sub-categories · 15 firm review pages · news hub (19 posts) · homepage · rich 4-tab snapshots

## 2. COMPARISON DATA (DONE)
- [x] All 15 firms' `cmp` built & filled; weekend=No and refund=No across all 15; promo fees
- [x] Weekend rules-tab consistency on all review pages (Alpha/Lucid fixed; MFF/Top One rows added)

## 3. HOMEPAGE (DONE tonight)
- [x] **"Browse by what matters" fixed** — 6 category tiles had malformed anchors (`href="…"<div>`); now render correctly
- [x] **"Compare Any Two Firms" fixed** — both dropdowns now list all 15 firms; "Compare Now" launches the real tool (`/category/best-prop-firms/?compare=id1,id2`); validates two distinct firms
- [x] **Preview table refreshed** — Take Profit column now matches our data ($102/mo, 80–90%, 1 Day, $750K, 50%)

## 3b. CATEGORY PILLS + TITLES (DONE)
- [x] **7 pills** across all 8 category pages: Best Futures Firms / 1 Step Evaluations / Instant Funding / 5+ Accounts / 100% Profit Split / Trade News / No Funded Consistency
- [x] **Dynamic title** — H1 updates live when switching pills, reverts to each page's authored title on reset
- [x] **No Funded Consistency** filter tagged: purdia, tradeday, tpt, mff (first-party None/0% funded consistency). *Topstep (consistency on one account type only) and FFN (unconfirmed) left untagged — confirm if you want them in.*
- [x] **Menu rename** "No Evaluation / Funding Fee" -> "No Funding Fees" (menu + page H1 + <title>, 92 instances/44 files; URL slug untouched)

## 4. APEX (DONE)
- [x] New page swapped in, all links/affiliate/compare preserved
- [x] Similar-firm logos standardized to `/cpf-logos/` paths (platform icons + Apex's own logo stay embedded)
- [x] No affiliate link needed (bare apextraderfunding.com is intended)

## 5. SEO + quality
- [x] **canonical + meta description + OG/Twitter on ALL 15 firms + category + homepage** (4 new firms added tonight, descriptions written from first-party page text; shared `/assets/og-default.png`)
- [x] Unique `<title>` per page · 19/19 jsdom-clean
- [x] **sitemap.xml** now covers all 15 firms (added apex, blusky, mff, topone) — 47 URLs, well-formed
- [x] **Favicons** — full set wired sitewide (74 pages): .ico, .svg, 96px, apple-touch (180), PWA 192/512, site.webmanifest (name set to ComparePropFirms.com)
- [ ] Mobile QA at 390px per page type
- [ ] Analytics (GA4 / GTM) snippet in chrome
- [x] **Press bar logos** — PBS/Forbes/USA TODAY/Norton processed to clean transparent muted-grey PNGs; replaced text wordmarks on 8 category pages + homepage (Forbes/PBS). *Forbes file was near-black-on-black — usable but slightly grainy; a cleaner Forbes asset would sharpen it.*
- [ ] 3 low-res hero image swaps

## 6. GO-LIVE WIRING
- [ ] **Push tonight's batch**
- [ ] **routes.json flip** — 0/111 flipped (all still `wordpress`). Ready to flip: 15 firm pages, homepage, /articles/ + posts, legal. **Gated on:** (a) you verifying cpfv2.pages.dev, (b) the 4 new firms' `‹VERIFY›` data — flipping the 8 category pages before that puts placeholders live in the compare tool. I generate the flipped file on your go.
- [ ] **Footer `#` links** — 4 social + footer nav need real URLs (give me the URLs)
- [ ] Verify cpfv2.pages.dev → live domain
- [ ] **Normalize 4 new pages to shared `/assets/` chrome** — DEFER to post-launch (risky; they're self-contained and render fine; header/footer are visually consistent)

## 7. OPEN DATA — `‹VERIFY›` (4 new firms; you resolve, I clear)
- [ ] **Apex (4):** processing, scaling, news, copy
- [ ] **BluSky (4):** min payout, daily loss, resets, copy
- [ ] **MFF (9):** processing, min payout, daily loss, max accounts, min days, resets, scaling, bots, copy
- [ ] **Top One (8):** payout frequency, min payout, daily loss, max accounts, min days, resets, scaling, copy
- *copy trading is open on all 4 — answer once for all.*

## 8. KLAVIYO
- [ ] Public API Key (6-char site ID) · List ID · double-opt-in yes/no → then I wire the homepage form

## 9. POST-LAUNCH backlog
- [ ] Chrome normalization of 4 new pages · per-size pricing matrix (non-Tradeify) · static crypto/options/forex pages · Apps Script webhook URL update
