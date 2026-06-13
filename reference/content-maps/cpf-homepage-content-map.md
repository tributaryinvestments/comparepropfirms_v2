# Homepage — Content Map & Data Reference
*Source of truth for `cpf-homepage.html`. Lists every section, its copy/data, and whether each element is **static** (hard-coded) or **dynamic** (should be driven by the CMS/database at launch). Flags all placeholder/representative content that must be replaced before going live.*

> Shared header + footer are the **locked chrome** — see `cpf-pages-handoff.md` (Part B). This map covers only the page body between header and footer.

---

## Section order (top → bottom)
1. Hero
2. Press bar ("As featured in")
3. Browse by category (6 tiles)
4. Top Funded Offers (3 firm cards)
5. Compare Any Two Firms
6. Why traders trust our data (4 cards)
7. Explore Our Latest Guides (4 cards)
8. Stats bar
9. CTA band

---

## 1. Hero
- **Trust pill:** "Trusted by Real Traders" (no longer a hard number).
- **Headline (serif):** "Data-Driven Comparisons. **Smarter Funding** Decisions." ("Smarter Funding" in green `--green-check`).
- **Sub:** "We analyze 40+ data points across the top prop firms so you can trade with confidence."
- **CTA:** "Find My Perfect Firm →" (green `.btn-green`, site action) — links `#`, **wire to real route.** *(The secondary "Compare Firms" outline button was removed.)*
- **Trust checks:** Unbiased Reviews · Updated Daily · Expert Analyzed.
- **Hero visual = DECORATIVE podium** (`.hero-podium`): one center card (Tradeify) flanked by two side cards (Lucid left, Purdia right). **Non-interactive by design** (`pointer-events:none`; buttons are inert `<span>`s). It is an *image of the experience*, not live UI — do not wire it. Mirrors the real firm-card look (logo + "Instant Funding" ribbon + medal, chevron band, CTA row).

## 2. Press bar ("As featured in")
- Order: **Yahoo Finance · Benzinga · Forbes · PBS · WSJ** — rendered as **uniform greyed text** (`.press-logo`, same muted tone) so they read consistently. Static. ⚠️ *Still placeholders: (a) these are text, not logo images; (b) the uploaded image set didn't fully match the request — USA Today was extra, and Forbes/PBS were not supplied; (c) confirm each outlet has actually featured the site (legal/accuracy). For real greyed logo images, supply transparent, similarly-toned versions of all five.*

## 3. Browse by category — 6 tiles (even grid; 6 desktop / 3 tablet / 2 mobile)
Left → right, each = icon circle (own accent) + label. **Should link to the matching category page** (currently `#`):
1. **Evaluations** (blue)
2. **Instant Funding** (green)
3. **No Funded Consistency** (teal)
4. **Best for News Trading** (purple)
5. **100% Profit Split** (red)
6. **Instant Payouts** (orange)
- Static labels/icons; **links dynamic** (category taxonomy).

## 4. Top Funded Offers — 3 firm cards (`.offers-cards`)
Real cornerstone firm card in **mobile/stacked face**, **3-across desktop / stacked ≤1024px**. Fully functional (Expand Details + Add to Compare). **Each card should be rendered from the firms data source** (see firm data below). Order = rank.

| Rank | Firm | Rating | Eval fee (orig→sale) | Split | Payouts | Save | Promo | Logo gradient | Tagline | Ribbon/badge |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **Tradeify** | 5.0 | $145 → **$94** ($50K Eval) | 90% | 1–5 days | 35% | `CPF` | green `#2eb87a→#1e8757` | "Most trustworthy prop firm" | Instant Funding + 🏆 Editor's Choice |
| 2 | **Lucid Trading** | 5.0 | $140 → **$70** ($50K Eval) | 90% | 1–3 days | 50% | `VAULT` | navy `#1f2937→#0b1220` | "Fastest payouts in the industry" | Instant Funding |
| 3 | **Purdia Capital** | 4.9 | **$349** ($50K Instant) | 90% | 2–4 days | 36% | `CORE200` | blue `#2554c7→#1d3f99` | "No payout denials. Fast to live." | Instant Funding |

- Promo sale-end dates in cards: Tradeify "June Sale Ends 6/30/26", Lucid "Current Sale Ends 7/2/26", Purdia "June Sale Ends 6/30/26" — ⚠️ *date-sensitive, drive from CMS.*
- "Get Funded →" = **affiliate link** (`rel="sponsored noopener"`, currently `#`). **Wire real affiliate URLs.**
- Expand panel data (quick-facts strip, pros/cons, 30-second verdict) is **representative** — verify against each firm's site (see firm-specific content maps, e.g. `tradeify-content-map.md`).
- Section head "View all firms →" → firms index (`#`).

## 5. Compare Any Two Firms
- Left: heading + sub + two firm `<select>` dropdowns + circular orange "VS" + "Compare Now" (green). ⚠️ **Selects are static markup — not wired.** Backend should populate options from firms data and make "Compare Now" route to a comparison view.
- Right: comparison table, columns **Tradeify / Lucid / Purdia / Take Profit** (colored dots), rows:
  - Evaluation Fee — $94 / **$70** (best, green) / $349 / $99
  - Profit Split — 90% / 90% / 90% / 90% (all green "good")
  - Payouts — 1–5 Days / 1–3 Days / 2–4 Days / 3 Days
  - Max Funding — ⚠️ *values are placeholders, confirm per firm*
  - Consistency Rule — ⚠️ *confirm per firm*
- **Take Profit Trader** figures are **representative** (~$99, 90%, ~3 days) — verify or replace.
- Whole table should be **rendered from firms data**, with the "best value" highlight computed (lowest fee), not hard-coded.
- 🔧 **Flagged in the HTML** (a comment sits in this section): the agentic AI must wire the two selects + the table to live firm data for all four displayed firms (Tradeify, Lucid, Purdia, Take Profit), and route "Compare Now" to a real comparison, when fusing the site together.

## 6. Why traders trust our data — 4 cards
Four cards (static copy):
- **40+** — "Data Points Analyzed"
- **Daily Updates** — "Promotions, rules, and firm metrics updated daily. We don't skip leg day!"
- **Expert Reviewed** — "Real traders validate our prop firm reviews."
- **Unbiased** — "We are traders at heart and not owned by any prop firm."

## 7. Explore Our Latest Guides — 4 cards
Gradient image placeholder + category tag overlay + title. ⚠️ **Dynamic — pull latest 4 posts** (title, category, image, slug) from the content/CMS. Currently static gradients + sample titles.

## 8. Stats bar
**500K+** Comparisons Made · **100+** Prop Firms Tracked · **4.9/5** Average Rating · "Excellent" Trustpilot. ⚠️ *all representative — confirm real figures and Trustpilot rating before publishing.*

## 9. CTA band
"Join real traders who compare before they buy" + green "Find My Perfect Firm →" (`#`). ⚠️ wire CTA.

---

## Dynamic vs static summary (for backend)
| Element | Static | Dynamic source |
|---|---|---|
| Hero copy, trust checks | ✓ | — |
| Hero podium cards | ✓ (decorative) | — (cosmetic mirror of firm data) |
| Press logos | ✓ | optional CMS |
| Category tiles labels/icons | ✓ | links → category taxonomy |
| Top Funded Offers cards | — | **firms data (ranked)** |
| Compare table + selects | — | **firms data** |
| Latest Guides | — | **CMS posts (latest 4)** |
| Stats numbers | ✓ | should be CMS-config or computed |
| Affiliate "Get Funded" URLs | — | **firms data (affiliate URL + promo)** |

## Placeholders to replace before launch
- Trust/stat numbers (500K+ Comparisons, 100+ Prop Firms, 4.9/5, Trustpilot) — confirm or compute.
- Press "featured in" (Yahoo Finance / Benzinga / Forbes / PBS / WSJ) — currently uniform grey text; supply matching transparent greyed logo images if desired, and confirm each outlet actually featured the site (legal).
- Firm "Max Funding" + "Consistency Rule" compare rows — verify per firm.
- Take Profit Trader figures — verify.
- Guide cards — real posts + thumbnail images.
- All `#` links → real routes; affiliate URLs on Get Funded.
- Logo SVG / BBB badge in chrome (shared — see handoff).
