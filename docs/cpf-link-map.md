# Angle 2 — Corrected Link Map (reconciled to the live site)

**Source of truth:** the live WordPress mega-menu + URL patterns captured in Angle 1.
**Rule (from the build spec):** resolve every link to its **real** target, or **flag it** — never wire a generic fallback (`/compare/`, generic `/category/best-prop-firms/`). A link that looks complete but lands everywhere on the same two pages is worse than an obvious gap.
**Companion:** `cpf-link-map.json` (the machine-readable version the agent applies).

---

## 0. The URL-pattern decision (apply first — everything below depends on it)

Adopt the **live patterns verbatim** in the new build so migrated pages need zero redirects:
- Firm review pages: **`/prop-firm/<slug>/`** (not `/firms/<slug>/`).
- Futures categories: **`/category/best-prop-firms/<subcat>/`** (nested, not flat).
- Verticals: **`/category/crypto|options|forex/`**.

This changes the new build's routing. If the agent has already shipped `/firms/<slug>/`, either rename to `/prop-firm/<slug>/` (preferred) or add a `/firms/* → /prop-firm/*` 301 — but renaming is cleaner and avoids redirect chains.

---

## 1. Header — Futures mega-menu (corrected)

Restore the **real** live taxonomy. Delete the invented "By Market" (ES/NQ/YM/GC/CL) and "By Feature" groupings — those categories do not exist on the live site.

| Label (use this wording) | Correct target | Status | New-build error being fixed |
|---|---|---|---|
| Best Funding Offers 2026 | `/category/best-prop-firms/` | ✅ live | was OK-ish; standardize label |
| Instant Funding Offers | `/category/best-prop-firms/instant-funding/` | ✅ live | was `/category/instant-funding/` (flattened) |
| One Step Evaluations | `/category/best-prop-firms/one-step-evaluation/` | ✅ live | pointed to generic `/category/best-prop-firms/` |
| 5+ Trading Accounts | `/category/best-prop-firms/five-plus-trading-accounts/` | ✅ live | missing / wrong |
| 100% Profit Split Offers | `/category/best-prop-firms/profit-split-bonus-offers/` | ✅ live | **pointed to `/firms/bulenox/`** (a firm page) |
| Tradovate Platform | `/category/best-prop-firms/tradovate/` | ✅ live | missing / → `/compare/` |
| Mid Tier Prop Firms | `/category/mid-tier-prop-firms/` | ✅ live | missing |
| Do Not Trade List | `/category/do-not-trade/` | ✅ live | missing |

**Primary nav (top level)**
| Label | Target | Status |
|---|---|---|
| Futures | `/category/best-prop-firms/` | ✅ live |
| Crypto | `/category/crypto/` | ✅ live (was `/compare/`) |
| Options | `/category/options/` | ✅ live (was `/compare/`) |
| Forex | `/category/forex/` | ✅ live (was `/compare/`) |

**Removed entirely (fictional IA):** "By Market" group (E-mini/NQ/YM/GC/CL/View all markets), and the "By Feature" list as a market grouping. If you want a market or feature taxonomy later, build the real category pages first, then add the links. Until a page exists, the link doesn't.

**`Best Offers` / `View all` CTAs:** point to `/category/best-prop-firms/` (the real "best funding offers" hub), not `/compare/`. There is no `/compare/` page in the live IA — see §4.

---

## 2. Header — logo & badge

- Logo → `/` (home). ✅
- BBB badge → the firm's real BBB profile URL `‹VERIFY›` (or no link). Don't leave it pointing at `#` or home.

---

## 3. Footer (corrected)

**Top Prop Firms** — each → `/prop-firm/<slug>/` (live pattern). Confirm each slug against the live sitemap; sample confirmed slugs: `lucid-trading`, `purdia-capital`, `redline-futures-funding`, `blusky-trading-company`.
| Label | Target | Status |
|---|---|---|
| Tradeify | `/prop-firm/tradeify/` | `‹VERIFY slug›` |
| Apex Trader Funding | `/prop-firm/<slug>/` | `‹VERIFY slug›` |
| Take Profit Trader | `/prop-firm/<slug>/` | `‹VERIFY slug›` |
| Lucid Trading | `/prop-firm/lucid-trading/` | ✅ confirmed |
| Topstep | `/prop-firm/<slug>/` | `‹VERIFY slug›` |
| View all firms → | `/category/best-prop-firms/` | ✅ |

**Resources** — map to real targets; flag any that don't exist yet rather than fallback.
| Label | Target | Status |
|---|---|---|
| Reviews | `/category/best-prop-firms/` | ✅ (reviews are the firm listing) |
| Guides | Articles hub (live `?page_id=692` → give it a clean slug, e.g. `/articles/`) | `‹VERIFY canonical articles URL›` |
| Payout Rules | a real guide/category if one exists, else **flag** | `‹FLAG: no destination yet›` |
| Scaling Plans | real guide/category, else **flag** | `‹FLAG: no destination yet›` |
| News Hub | `/news/` if it exists on live, else the Articles hub | `‹VERIFY›` |
| Compare Firms | see §4 | `‹FLAG›` |

**Support**
| Label | Target | Status |
|---|---|---|
| About Us | `/about/` (or live About page slug) | `‹VERIFY slug›` |
| Email | `mailto:support@comparepropfirms.com` | ✅ keep |

**Social** — real profile URLs `‹VERIFY›`; if a profile doesn't exist, **remove the icon** (don't ship `#`).

**Bottom-bar legal** — Privacy / Terms / Sitemap → live legal page slugs `‹VERIFY›`. Copyright "© 2026 Compare Prop Firms" ✅.

---

## 4. The `/compare/` question (decide, don't default)

The new build uses `/compare/` as a catch-all, but **there is no `/compare/` page in the live IA**. Two clean options:
1. **Don't build it yet** — remove every `/compare/` link; point "compare" intents at `/category/best-prop-firms/` (the real comparison/listing hub). Lowest risk for launch.
2. **Build it deliberately** — a real two-firm interactive comparison page at `/compare/` powered by the same `CMP_DATA` objects, then link to it. Higher value, but it's net-new scope and an audited page like any other.

Either way: until the page exists and passes audit, no link may point to it. Pick one and apply globally.

---

## 5. Title-format fix (cosmetic but ship it consistently)

One format everywhere: **`{Page subject} — ComparePropFirms.com`** (em-dash, site suffix, matches live `og:site_name`). Current new build mixes em-dash/pipe and sometimes drops the suffix. Examples:
- Firm: `Tradeify Review 2026 — ComparePropFirms.com`
- Category: `Best Funding Offers 2026 — ComparePropFirms.com`

---

## 6. Acceptance check for the agent (link layer)

- Zero `href="#"` anywhere.
- Zero links to `/compare/` unless that page exists and passed audit (per §4 decision).
- No "By Market" / fictional categories.
- Every firm link uses `/prop-firm/<slug>/`; every futures sub-category uses `/category/best-prop-firms/<subcat>/`.
- Every `‹VERIFY›`/`‹FLAG›` is resolved or the link is removed — nothing fallback-wired.
- Run the link gate in `validate.mjs` (Angle 3): it fails the build on any `#`, any unknown path, or any path not present in `cpf-link-map.json`.
