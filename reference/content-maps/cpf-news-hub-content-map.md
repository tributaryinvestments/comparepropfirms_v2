# News Hub — Content Map & Data Reference
*Source of truth for `cpf-news-hub.html`.*

> Shared header + footer = locked chrome (see `cpf-pages-handoff.md`). This map covers the page body.

---

## Section order
1. Hero (dark navy)
2. Featured Story row
3. Top Prop Firm Reviews (3 firm cards)
4. Popular Guides + Trending Topics
5. Promo band
6. News & Updates + "Trusted by Traders" stats
7. Compare CTA band

---

## 1. Hero (dark navy, `--ink`)
- "NEWS HUB" pill; serif H1 **"Your Hub for Prop Firm Insights & Research"**; 4 value checks; a floating 3-card collage; decorative orange wave SVG at the base.
- Static copy; collage is decorative.

## 2. Featured Story row (3-col)
- Big **feature card** + a column of **mini-articles** + a **"Latest News"** rail.
- ⚠️ **Dynamic** — should be driven by the CMS: one featured post + N recent posts (title, excerpt, image, category, date, slug). Currently static sample content + placeholder images (gradients).

## 3. Top Prop Firm Reviews — 3 firm cards (`.offers-cards`)
- Exact cornerstone firm cards in **mobile/stacked face**, **3-across desktop / stacked ≤1024px**, fully functional (Expand Details + Add to Compare).
- Firms = **Tradeify (rank 1, Editor's Choice) / Lucid (2) / Purdia (3)** — same data + promos as the homepage Top Funded Offers (see `cpf-homepage-content-map.md` table, or the firm-specific maps). **Render from firms data.**
- Purdia tagline here is unified to "**No payout denials. Fast to live.**" (matches homepage).
- "Get Funded →" = affiliate link (`rel="sponsored noopener"`, currently `#`).
- Expand-panel detail (quick facts / pros-cons / verdict) is **representative** — verify per firm.
- Section head "View all reviews →" → reviews index (`#`).

## 4. Popular Guides + Trending Topics (2-col)
- Popular Guides list + Trending Topics chips. ⚠️ **Dynamic** — popular/most-read posts + trending tags from CMS/analytics. Currently static.

## 5. Promo band (cream)
- Newsletter/offer promo. Static copy; any CTA → route.

## 6. News & Updates + "Trusted by Traders" stats
- A news/updates list + a stats block: **1M+ / 150+ / 2,500+** — ⚠️ *placeholder figures, confirm.*
- News list ⚠️ **dynamic** (CMS posts).

## 7. Compare CTA band (navy)
- CTA to the compare tool. Link → `#`, wire to route.

---

## Dynamic vs static
| Element | Static | Dynamic source |
|---|---|---|
| Hero copy + collage | ✓ | — |
| Featured Story / mini-articles / Latest News | — | **CMS posts** |
| Top Prop Firm Reviews cards | — | **firms data (ranked)** + affiliate URLs |
| Popular Guides | — | **CMS (most-read)** |
| Trending Topics | — | **CMS tags / analytics** |
| News & Updates list | — | **CMS posts** |
| "Trusted by Traders" stats | ✓ | confirm/replace numbers |
| Promo + CTA copy | ✓ | links → routes |

## Behavior / JS
- Scroll-reveal; firm-card Expand Details + Add to Compare (cornerstone delegated handlers); theme toggle via locked header (`#themeToggle`); Futures mega-menu + footer disclosures from chrome JS.

## Notes / decisions carried over
- Category pill bar was intentionally **removed** earlier.
- "Trusted by Traders" stats (1M+/150+/2,500+) are placeholders.

## Placeholders to replace before launch
- All article/news content + thumbnail images → CMS.
- Stats (1M+/150+/2,500+) → confirm.
- Firm expand-panel data → verify per firm.
- `#` links → routes; affiliate URLs on Get Funded.
