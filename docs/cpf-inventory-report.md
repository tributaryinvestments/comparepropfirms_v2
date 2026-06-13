# Live Inventory Report — complete URL master list (from the sitemap)

**Generated 2026-06-12** from the live Yoast sitemaps (`product`, `product_cat`, `category`, `page`, `post`).
**Companion data:** `cpf-url-master-list.csv` (row-per-URL migration checklist) and `cpf-routes.json` (strangler-fig routing seed, every live URL → `wordpress`).
This completes Angle 1: the full picture of what we're replacing.

---

## 1. Counts (what's actually live & indexed)

| Type | Count | URL pattern |
|---|---:|---|
| Firm reviews (WooCommerce product, base = `prop-firm`) | **65** | `/prop-firm/<slug>/` |
| — of which a **new build page already exists** | 11 | (tradeify, alpha-futures, topstep, purdia-capital, take-profit-trader, fundednext-futures, funded-futures-network, lucid-trading, trade-day, bulenox, daytraders) |
| — **still to build** | **54** | — |
| Product (firm) categories | 15 | `/category/…` (incl. nested `/category/best-prop-firms/…`) |
| Blog categories | 3 | `/blog-category/…` |
| Pages | 9 | `/`, `/about-us/`, `/faq/`, `/articles/`, `/terms-and-conditions/`, `/privacy-policy/`, `/shop/`, `/cart/`, `/home-2/` |
| Posts (guides / comparisons / review-articles) | 19 | `/<post-slug>/` (root level) |
| **Total indexed URLs mapped** | **111** | (excludes author & tag archive sitemaps — present but low-value) |

The firm reviews being a **WooCommerce product type** is the key structural fact: the site has a store (`/shop/`, `/cart/`) wired around firm offers. Confirm whether that's a real checkout flow to preserve or affiliate redirects with discount codes — it changes rebuild scope. (See §5.)

---

## 2. Complete firm-category taxonomy (authoritative — 15)

Nested under `best-prop-firms` (product_cat):
`/category/best-prop-firms/` · `/best/` · `/instant-funding/` · `/one-step-evaluation/` · `/five-plus-trading-accounts/` · `/profit-split-bonus-offers/` · `/no-evaluation-funding-fee/` · `/live-trading-path/` · `/trade-news/` · `/tradovate/`

Top-level: `/category/mid-tier-prop-firms/` · `/category/do-not-trade/` · `/category/crypto/` · `/category/options/` · `/category/forex/`

> Three categories exist that the new-build mega-menu didn't account for: **`best/`**, **`no-evaluation-funding-fee/`**, **`trade-news/`**. Decide whether each belongs in the menu. (`trade-news/` is likely the real "News" destination — see §3.)

---

## 3. Resolved link-map flags (the `‹VERIFY›` items from Angle 2 are now answered)

| Link | Confirmed live target |
|---|---|
| About Us | **`/about-us/`** (not `/about/`) |
| Guides / Articles | **`/articles/`** |
| Terms & Conditions | **`/terms-and-conditions/`** |
| Privacy Policy | **`/privacy-policy/`** |
| FAQ | **`/faq/`** (exists — consider adding to footer/nav) |
| Footer · Tradeify | `/prop-firm/tradeify/` |
| Footer · Apex Trader Funding | `/prop-firm/apex-trader-funding/` |
| Footer · Take Profit Trader | `/prop-firm/take-profit-trader/` |
| Footer · Lucid Trading | `/prop-firm/lucid-trading/` |
| Footer · Topstep | `/prop-firm/topstep/` |
| News Hub | **no `/news/` page exists** → use `/category/best-prop-firms/trade-news/` (or `/articles/`) — decide |
| Payout Rules | no dedicated page → link the guide post `/prop-firm-payout-guide-2026…/` or flag |
| Scaling Plans | no dedicated page → flag (no destination) |
| Compare Firms / `/compare/` | **no page exists.** A comparison *article* exists (`/tradeify-vs-apex-trader-funding-vs-topstep…/`) but no interactive tool — decide per Angle 2 §4 |

These are applied in the updated `cpf-link-map.json`.

---

## 4. Cleanup & risk flags found in the inventory

1. **Stale duplicate homepage** `/home-2/` is indexed — a second full homepage. Noindex or remove before launch to avoid duplicate-content dilution.
2. **Product page vs. review-post duplication.** Several firms have **both** a `/prop-firm/<slug>/` product page **and** a root-level `…-review-2026…` blog post: aqua-futures ↔ `aquafutures-review-2026…`, goat-funded-futures, blue-guardian-futures, legends-trading, and a `the-prop-pit-review-2026…` post. Two URLs targeting the same firm competes for the same keyword. Decide the canonical (recommend: the `/prop-firm/` page is canonical; the post is editorial and canonical-points to it, or is repositioned as a distinct guide).
3. **Naming mismatch to verify:** product `the-trading-pit` vs post `the-prop-pit-review` — same firm or two firms? `‹VERIFY›`.
4. **Multi-vertical firm variants.** e8markets has three pages (`-crypto`, `-futures`, `-forex`); tradersyard has two (`tradersyard`, `tradersyard-futures`); tradeify has two (`tradeify`, `tradeify-crypto`). The futures-first rebuild should map the **futures** variant to the firm page and route the crypto/forex variants under their verticals — don't collapse them.
5. **WooCommerce surface.** `/shop/`, `/cart/` (and almost certainly `/checkout/`, `/my-account/` not in the sitemap). If the rebuild drops WordPress, decide what replaces any commerce/checkout/discount-code mechanics.
6. **Archives not enumerated:** `author-sitemap.xml` and `post_tag-sitemap.xml` exist (author + tag archives). Usually low-value/noindex; confirm and exclude from the rebuild unless they rank.

---

## 5. Migration math & phasing (feeds Angle 3 `routes.json`)

- **2 cornerstones done** (tradeify, alpha-futures) · **11 firm pages exist** in the new build · **54 firm pages to build**.
- **15 categories + homepage + 9 pages + 19 posts** also to migrate.
- `cpf-routes.json` seeds all 111 paths to `wordpress`. Suggested flip order: cornerstones → the other 9 built firms → highest-traffic remaining firms (pull GA/GSC top pages) → categories → homepage → posts. Each flips to `pages` only after passing `validate.mjs`.

**Net:** the rebuild is ~65 firm pages + 15 category pages + homepage + supporting pages/posts, on the live URL scheme, behind the Worker. The master CSV is your tick-list; `routes.json` is the live status board.

---

## 6. What I still need to finalize

- **Top-traffic data** (GA4 or Search Console top pages) to order the migration by value rather than by sitemap date.
- **Decisions on:** `/home-2/` removal, product-page-vs-review-post canonicals, the `/compare/` and `/news/` questions, and whether commerce/checkout must be preserved.
- **The repo** (Angle 3) so I can run `validate.mjs` against each page as it's built and flip its route on green.
