# Angle 1 — Current Site Map & Audit (the WordPress site we're replacing)

**Target:** `https://comparepropfirms.com` (live, WordPress).
**Method:** live retrieval (search + page fetch) on 12 Jun 2026. URL patterns, nav taxonomy, CMS stack, and content model below are confirmed from the live site. The full per-URL inventory (all 50+ firms) requires the sitemap — see §7 for how to complete it.
**Why this exists:** before we replace anything we need a complete picture of what's live — every URL pattern, what each page type contains, how comparison works today, and exactly where the new build's URLs already diverge. Those divergences are the SEO risk.

---

## 1. Platform & stack (confirmed)

- **CMS:** WordPress.
- **Builder:** **Elementor 3.33.4** (confirmed in page `meta-generator`). Pages are Elementor layouts, CSS print method = external, Google Fonts enabled, font-display swap, custom breakpoints.
- **SEO layer:** a Yoast-style SEO plugin — pages emit `canonical`, `og:*`, `twitter:*`, `article:modified_time`, reading-time, `robots: index`. An "Otto" plugin tag is present but disabled.
- **Media:** uploads under `/wp-content/uploads/YYYY/MM/…` (e.g. firm cards, cropped site icon).
- **Reachability:** the live site responded to direct fetch (no hard Cloudflare challenge on the page tested) — so ongoing spot-checks via fetch are possible, but the inline placeholder SVGs/base64 make full-DOM reads unreliable. For real auditing, GitHub is still the right source (Angle 3).

---

## 2. URL taxonomy (confirmed patterns — this is the core of the map)

| Content type | Live URL pattern | Confirmed examples |
|---|---|---|
| Homepage | `/` | `/` |
| **Firm review** (custom post type) | **`/prop-firm/<slug>/`** | `/prop-firm/redline-futures-funding/`, `/prop-firm/lucid-trading/`, `/prop-firm/purdia-capital/`, `/prop-firm/blusky-trading-company/` |
| **Futures categories** (nested under best-prop-firms) | **`/category/best-prop-firms/<subcategory>/`** | `/category/best-prop-firms/` (parent), `/instant-funding/`, `/one-step-evaluation/`, `/five-plus-trading-accounts/`, `/profit-split-bonus-offers/`, `/tradovate/`, `/live-trading-path/` |
| **Tier / list categories** | `/category/<slug>/` | `/category/mid-tier-prop-firms/`, `/category/do-not-trade/` |
| **Other asset verticals** | `/category/<vertical>/` | `/category/crypto/`, `/category/options/`, `/category/forex/` |
| Articles/posts | `/<post-slug>/` (root-level) | `/discover-the-best-proprietary-trading-firms-of-2024…/` |
| WP pages | `/?page_id=<id>/` or clean slug | Articles hub `?page_id=692` |
| Media | `/wp-content/uploads/YYYY/MM/<file>` | firm card PNGs |

**The two URL facts that matter most:**
1. Firm reviews live at **`/prop-firm/<slug>/`** — *not* `/firms/<slug>/`.
2. Futures sub-categories are **nested** under `/category/best-prop-firms/…` — *not* flat `/category/<slug>/`.

The new pages.dev build currently uses `/firms/<slug>/` and flat `/category/<slug>/`. Both are wrong against live. See §6.

---

## 3. The live navigation taxonomy (authoritative — pulled from the live mega-menu)

This is the real information architecture. The corrected link map (Angle 2) must restore exactly this — the new build invented a different one.

**Primary nav**
- **Futures** → `/category/best-prop-firms/` (mega-menu, items below)
- **Crypto** → `/category/crypto/`
- **Options** → `/category/options/`
- **Forex** → `/category/forex/`

**Futures mega-menu items**
| Label (live) | Live URL |
|---|---|
| Best Funding Offers 2026 | `/category/best-prop-firms/` |
| Instant Funding Offers | `/category/best-prop-firms/instant-funding/` |
| One Step Evaluations | `/category/best-prop-firms/one-step-evaluation/` |
| 5+ Trading Accounts | `/category/best-prop-firms/five-plus-trading-accounts/` |
| 100% Profit Split Offers | `/category/best-prop-firms/profit-split-bonus-offers/` |
| Tradovate Platform | `/category/best-prop-firms/tradovate/` |
| Mid Tier Prop Firms | `/category/mid-tier-prop-firms/` |
| Do Not Trade List | `/category/do-not-trade/` |

> Note: the live menu is organized **by offer type / feature / platform / tier** (Instant, One-Step, 5+, Profit-Split, Tradovate, Mid-Tier, Do-Not-Trade) — there is **no "By Market" (ES/NQ/YM/GC/CL) grouping** anywhere on the live site. The new build invented that. There is also no `/compare/` destination in the live IA.

---

## 4. Page-type content model (what each template actually contains)

**Firm review (`/prop-firm/<slug>/`)** — Elementor prose, not interactive. Recurring block pattern:
- Offer/promo banner (e.g. discount code), then editorial body organized as **ACCOUNTS / RULES / FUNDED / PAYOUTS / PLATFORM / PROMOTIONS** prose sections.
- Hard spec figures embedded in prose (account sizes, monthly price, profit target, max drawdown, profit split, payout cycle, min/winning days, platforms).
- Standard editorial disclaimers (General Disclaimer, Editorial Note, Advertising Disclosure) repeated at the foot.
- SEO: per-page canonical, og/twitter, reading time, `article:modified_time`.
- *Example (Redline):* `$50K $87/mo`, `$100K $147/mo`, `$150K $192/mo`; no minimum days; no consistency rule; pass in 1 day; 80% split; up to `$1,500` per payout cycle (8 trading days, 6 winning days at `$130+`); platform DeepCharts by dxFeed.

**Category (`/category/best-prop-firms/…` and verticals)** — a filtered listing of firm offers for that facet (instant funding, one-step, profit-split, Tradovate, etc.), plus intro copy. This is where the live "comparison" experience mostly lives (see §5).

**Articles / posts (`/<slug>/`)** — long-form editorial guides; a posts index/"Articles" page exists.

**Legal / about / support** — standard WP pages; disclosures also embedded site-wide in the footer.

---

## 5. Comparison functionality (today vs. what the rebuild adds)

- **Today (live):** comparison is **list-and-prose**. Category pages collate firms by facet; firm pages describe specs in prose. The site markets "free access to comparison tools," but the per-firm pages are static Elementor content, not interactive tables. There is no live `/compare/` two-firm tool in the IA we can see.
- **New build:** elevates this to **interactive per-firm tabs** (Accounts / Payouts / Rules) rendered from a single data object (`CMP_DATA`) with the uniform 12/12/11 row schema, plus cross-firm comparison. That's a genuine UX upgrade, not just a re-platform.
- **Implication:** the rebuild is doing two things at once — (a) moving off WordPress/Elementor, and (b) replacing prose specs with structured, data-driven comparison. (b) is where the "equal values render identically" discipline pays off, and where first-party accuracy matters most.

---

## 6. Where the new build already diverges from live (the SEO-risk list)

| Area | Live (correct) | New build (current) | Risk |
|---|---|---|---|
| Firm review URL | `/prop-firm/<slug>/` | `/firms/<slug>/` | **High** — every firm page at wrong URL; loses ranking/backlinks unless reconciled |
| Instant Funding | `/category/best-prop-firms/instant-funding/` | `/category/instant-funding/` | High — flattened, wrong path |
| One-Step / Profit-Split / 5+ / Tradovate | nested under `/category/best-prop-firms/…` | pointed to generic `/category/best-prop-firms/` or a firm page | High — dead-ends / wrong targets |
| Crypto / Options / Forex | `/category/crypto|options|forex/` | all → `/compare/` | High — real categories collapsed to a non-existent page |
| "By Market" (ES/NQ/YM/GC/CL) | **does not exist** | invented sub-menu → `/compare/` | Medium — fictional IA; remove or build real pages |
| `/compare/` | not in live IA | used as catch-all | Medium — either build it deliberately or stop using it |
| Title format | `… - ComparePropFirms.com` (og:site_name) | mixed em-dash / pipe / suffix | Low — cosmetic but inconsistent |

**Decision this forces (feeds Angle 2 & 3):** the new build should adopt the **live URL patterns verbatim** — `/prop-firm/<slug>/` and `/category/best-prop-firms/<subcat>/` — so migrated pages need **zero redirects** and keep their equity. Changing the build to match live is cheaper and safer than 301-mapping 50+ firms. (This supersedes the `/firms/` and `/best-futures-prop-firms/` patterns in the earlier build spec — those were placeholders written before we had ground truth.)

---

## 7. Inventory status & how to complete it

**Confirmed live firm slugs (sample):** `redline-futures-funding`, `lucid-trading`, `purdia-capital`, `blusky-trading-company`. Plus firms we have new pages for (slugs `‹VERIFY against live›`): Tradeify, Topstep, Take Profit Trader, FundedNext Futures, Funded Futures Network, Alpha Futures, TradeDay, Bulenox, DayTraders.com.

**Confirmed live categories:** best-prop-firms (+ instant-funding, one-step-evaluation, five-plus-trading-accounts, profit-split-bonus-offers, tradovate, live-trading-path), mid-tier-prop-firms, do-not-trade, crypto, options, forex.

**To get the complete, authoritative inventory of all 50+ firms + every page/post/category in one shot**, hand me any one of:
1. **`/sitemap_index.xml`** (WordPress/SEO-plugin sitemap) — paste it or upload the file; I'll expand every child sitemap into a full URL list with last-modified dates.
2. A **WordPress export** (Tools → Export) or the `wp_posts` slug list.
3. The **GitHub repo** once the rebuild lives there (Angle 3) — then I clone and enumerate directly.

With the sitemap I can turn §2's patterns into a row-per-URL master list (firm slugs, category tree, posts, pages) that becomes the migration checklist and the routes manifest in Angle 3.

---

## 8. One-paragraph summary

ComparePropFirms.com is a WordPress + Elementor 3.33.4 site with a Yoast-style SEO layer. Firm reviews are a custom post type at `/prop-firm/<slug>/`; the futures information architecture is nested categories under `/category/best-prop-firms/…` (Instant Funding, One-Step, 5+ Accounts, Profit-Split, Tradovate), with sibling categories for Mid-Tier, Do-Not-Trade, and the Crypto/Options/Forex verticals. Firm pages today are prose specs, not interactive — the rebuild's structured tab/comparison UI is a real upgrade. The most urgent finding: the new build's URLs (`/firms/…`, flat categories, invented "By Market" menu, `/compare/` catch-all) do **not** match the live IA, which will break SEO on cutover. Fix = make the rebuild mirror the live URL patterns exactly, restore the real mega-menu, and complete the inventory from the sitemap.
