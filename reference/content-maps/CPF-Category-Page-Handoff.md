# ComparePropFirms — Category Page & Compare Functionality
## Implementation Handoff + Content Map

**Version:** 1.0
**Prepared for:** Agentic implementation (AI coding agent + human reviewer)
**Design source of truth:** `cpf-category-best-prop-firms-desktop-v2.html` (self-contained prototype)
**Fallback baseline:** `cpf-category-best-prop-firms-desktop.html` (v1)
**Reference (single firm depth):** `cpf-tradeify-v3-full-page.html` (existing product page)

---

## 0. How to use this document

You (the implementing agent) are extending an existing, live website — **not** building from scratch. This document tells you *what* to build and *how it should behave*; the prototype HTML file is the visual and behavioral source of truth. When this document and the prototype disagree, **the prototype wins for look-and-feel and interaction**, and **this document wins for data modeling, production integration, and acceptance criteria**.

Work in the phased order in §13. Do not invent firm data — every field maps to a real content source (§4). Where a decision is still open, it is flagged **[OPEN]**; do not resolve these unilaterally — surface them to the human reviewer.

A hard rule carried over from the prototype: **never fabricate firm numbers.** Only Tradeify has fully verified depth in the prototype; all other firms use representative placeholder data that must be replaced with real values before launch.

---

## 1. Background & goal

ComparePropFirms.com lists proprietary trading firms so traders can **compare → pick → get funded**. The category page (e.g. *Best Prop Firms*) is the primary conversion surface. The mobile site already does this in a stacked layout; this project delivers an optimized **desktop/tablet** experience plus richer **expanded detail** and **side-by-side comparison** features, while staying visually native to the existing brand.

Primary conversion actions, in priority order:
1. **Get Funded** (affiliate/sponsored outbound click) — the revenue event.
2. **Add to Compare** → open comparison → Get Funded.
3. **Expand Details / See all [Firm] Details** → product page → Get Funded.

---

## 2. Production environment & constraints

| Item | Detail |
|---|---|
| CMS | WordPress |
| Page builder | Elementor 3.33.x (confirmed from live page metadata) |
| Existing data | Firm listings already exist on the live category pages (firm name, score, promo, chevron stats, pros/cons, review prose, affiliate URL). **Locate the current data source before building** — likely a custom post type, ACF fields, or a page-builder template loop. |
| Outbound links | All "Get Funded" links are affiliate links and **must** carry `rel="sponsored noopener"` and open per current site convention. |
| Compliance | The site is advertising-supported; ordering can be influenced by compensation. Preserve any existing affiliate-disclosure copy. Do not remove `rel="sponsored"`. |
| Theme | Light + dark mode both required (tokens in §7). |

**Critical integration decision [OPEN]:** the prototype is data-driven from a single `FIRMS` JavaScript array. In production this array must be populated from the WordPress data source rather than hardcoded. Recommended approach: a **`prop_firm` custom post type** with structured fields (ACF or native meta) matching the schema in §4, exposed to the front end via either (a) server-rendered markup using the same class names, or (b) a localized JSON blob (`wp_localize_script`) consumed by the prototype's render functions. Confirm the preferred approach with the reviewer before Phase 1.

---

## 3. Information architecture

The category template is **one canonical layout** rendered for multiple categories. The in-page **pill bar** mirrors the live site's category navigation. Pill titles and their live destinations:

| Pill label | Behavior in prototype | Live-site meaning |
|---|---|---|
| Evaluations | Filters list to firms tagged `eval` | `/category/best-prop-firms/one-step-evaluation/` |
| Instant Funding | Filters to `instant` | `/category/best-prop-firms/instant-funding/` |
| 5+ Accounts | Filters to `fiveplus` | `/category/best-prop-firms/five-plus-trading-accounts/` |
| Profit Split | Filters to `split100` | `/category/best-prop-firms/profit-split-bonus-offers/` |
| Trade News | Filters to `news` | `/category/best-prop-firms/trade-news/` |
| Mid Tier | Shows "separate category" empty state | `/category/mid-tier-prop-firms/` (different parent category) |
| Do Not Trade | Shows "separate category" empty state | `/category/do-not-trade/` (different parent category) |

**Production note:** In the prototype, pills filter one in-memory list. On the live site these are real category/taxonomy URLs. The implementer should decide with the reviewer whether the desktop page filters client-side within a category or navigates to the category URL. **Mid Tier** and **Do Not Trade** are *separate category pages*, not filters of *Best Prop Firms* — render them as navigation, not as filters that can empty the list. The Sort dropdown from earlier iterations has been **removed**; do not reintroduce it.

---

## 4. Data model (the core of the build)

Everything renders from one object per firm. Replace the prototype's placeholder array with real data from the CMS. Below is the canonical schema followed by field definitions.

### 4.1 Firm JSON schema

```jsonc
{
  "id": "tradeify",                       // slug, unique, used for compare keys + anchors
  "rank": 1,                              // integer; controls list order + medal/rank badge
  "name": "Tradeify",
  "logo": "tradeify",                     // SWAP: production uses real logo image, not monogram text
  "grad": "linear-gradient(135deg,#2eb87a,#1e8757)", // fallback tile bg if no logo image
  "ribbon": "Instant Funding",            // string | null — red corner ribbon on logo
  "award": "🏆 Editor's Choice",           // string | null — top-left award pill (use sparingly)
  "rating": 5.0,                          // number, 1 decimal — "CPF Score"
  "tagline": "Most trustworthy with fast payouts",
  "affiliateUrl": "https://...",          // REQUIRED in production — Get Funded destination (rel=sponsored)
  "fullPage": "/prop-firm/tradeify/",     // canonical product page URL

  "chev": {                               // the 3 collapsed-row stat chevrons (consistent for all firms)
    "price": { "value": "$94", "orig": "$145", "meta": "$50K Eval", "label": "True Funding Fee" },
    "split": { "value": "90%", "meta": "To Trader", "label": "Profit Split" },
    "save":  { "value": "35%", "meta": "Save up to", "label": "Limited Time Offer" }
  },
  "promo": "June Sale Ends 6/30/26 · Use Promo Code: <span class='promo-code-pill'>CPF</span>",

  "tags": ["eval","instant","fiveplus","news"],   // drives pill filtering (see §3)
  "sortPrice": 94,                        // numeric helpers (optional; sort currently rank-only)
  "sortSave": 35,

  "quickFacts": [                         // EXACTLY 6 — renders the at-a-glance strip
    { "label": "Account Types", "value": "Eval & Instant", "sub": "3 account paths" },
    { "label": "Days to Payout", "value": "1–5 days",      "sub": "Industry leader" },
    { "label": "Max Accounts",   "value": "5 funded",       "sub": "$750k combined" },
    { "label": "Account Sizes",  "value": "$25k–$150k",     "sub": "4 sizes" },
    { "label": "Drawdown",       "value": "EOD Trailing",   "sub": "+$100 lock" },
    { "label": "Consistency",    "value": "0–40%",          "sub": "By account type" }
  ],

  "paths": [                              // account-path chips (used on product page; not on overview tab)
    { "icon": "📈", "name": "Growth", "tag": "growth", "tagText": "Best for Growth", "blurb": "…" }
  ],

  "pros": ["…"],                          // array; Overview shows all, Lean shows first 3
  "cons": ["…"],                          // array; Overview shows all, Lean shows first 2
  "verdict": "…HTML allowed (e.g. <strong>) …",   // 30-second verdict prose

  "allowed":  ["Futures","News Trading","Bot Trading","Copy Trading","5 Accounts"],
  "watch":    [["⚠","20% Consistency (Lightning)","caution"], ["🛑","No Hedging","danger"]],
  "platforms": { "count": 13, "sample": ["Tradovate","TradingView","NinjaTrader","WealthCharts","Quantower"] },

  "cmp": {                                // comparison metrics (see §6 row sets)
    "fee": "<span class='cmp-orig'>$145</span><span class='cmp-sale'>$94</span>",
    "split": "90% / 10%", "payout": "1–5 days", "payoutFreq": "Per 5 winning days",
    "processing": "24–72 hrs", "minPayout": "$250", "drawdown": "EOD Trailing",
    "dailyLoss": "Varies (Dynamic)", "consistency": "0–40%", "maxAcc": "5 funded",
    "sizes": "$25k–$150k", "minDays": "1–7 days", "resets": "Available (eval)",
    "scaling": "Select only", "instant": "<span class='cmp-yes'>Yes (Lightning)</span>",
    "actFee": "None", "news": "<span class='cmp-yes'>Yes</span>", "bots": "<span class='cmp-yes'>Yes</span>",
    "copy": "<span class='cmp-yes'>Yes</span>", "weekend": "<span class='cmp-no'>No</span>",
    "refund": "<span class='cmp-no'>No</span>", "platforms": "13", "score": "5.0"
  },

  "richTabs": true,                       // true = render Accounts/Rules/Payouts tabs; false = Overview only
  "accounts": { /* see §4.2 */ },
  "rules":    { /* see §4.3 */ },
  "payouts":  { /* see §4.4 */ }
}
```

### 4.2 Rich-tab content — Accounts

The Accounts tab renders a 3-up grid of account-type cards (Growth / Select / Lightning for Tradeify; varies by firm). Each card:

| Field | Notes |
|---|---|
| `type` class | `growth` \| `select` \| `lightning` \| `standard` — drives the colored top border + tag color |
| name, icon, tagText | header |
| sub | one-line descriptor under the header |
| hasToggle | boolean — Select has a Flex/Daily sub-toggle; **Growth & Lightning must reserve the same vertical space** with an empty `.flex-daily-toggle` so all three cards' rows align |
| sizes[] | `{ name, priceOrig, priceSale }` × 4 (e.g. $25K/$50K/$100K/$150K) |
| stats[] | `{ label, value }` rows — currently shown for the **$50K** column |

**Scope [OPEN / decided as snapshot]:** the prototype shows static **$50K** figures and links out to the product page for live size/phase switching ("See Full Product Types and Sizes Details →"). Confirm whether to keep the snapshot or port the product page's full interactive size/phase/Flex-Daily recompute into the category embed.

### 4.3 Rich-tab content — Rules

Renders 5 rule groups; each group has an icon+color, title, description, and 5 rule items. Each item: `{ label, badgeClass, badge, note }`.

| Group | Icon color | Example items |
|---|---|---|
| Trading Permissions | green | News Trading, Bot/Algo, Copy Trading, Hedging, Martingale/DCA |
| Account & Risk Rules | purple | Drawdown Type, Daily Loss Limit, Max Loss, Consistency, Max Accounts |
| Payout Rules | orange | First Payout, Subsequent, Max Per Request, Frequency, Processing Time |
| Account Operations | blue | Live Funding Path, Weekend Holding, VPN/VPS, Reset, Refund |
| Other Policies | gray | Scaling Plan, Inactivity, Min Trading Days, One-Time Fee, Tradable Products |

Badge classes: `allowed` (green), `not-allowed` (red), `info` (blue), `warn` (orange), `purple`, `neutral` (gray).

### 4.4 Rich-tab content — Payouts

3-up payout card grid (same alignment rule as Accounts — empty toggle spacer on non-toggle cards) + a 4-step "How payouts work" process strip + a track-record CTA banner. Card stats: Profit Split, Min Payout, Min Winning Days, Min Profit/Day, Max Payout, Daily Loss Limit, Consistency (Funded), Frequency.

---

## 5. Page anatomy / content map

Top to bottom. Class names reference the prototype.

| # | Component | Class(es) | Content | Notes |
|---|---|---|---|---|
| 1 | Nav bar | `.nav` | Logo, Futures/Crypto/Forex/Options, theme toggle, Compare Firms CTA | Sticky; matches product page |
| 2 | Page header | `.pf-head` | "Updated [Month Year]" eyebrow, H1, subtitle | H1 currently "Best Prop Firms Offers" — reconcile with live wording **[OPEN]** |
| 3 | Trust bar | `.pf-featured` | "Featured in" + PBS / Forbes / USA Today / Norton | Use real logo assets in production |
| 4 | Filter pills | `.pf-toolbar` › `.filter-pill` | 7 pills (§3) | **No box, no Sort.** Sticky. Horizontal scroll on narrow widths |
| 5 | Controls row | `.pf-controls` | Result count (left) + "Expanded Details: Rich \| Lean" toggle (right) | Default **Rich** |
| 6 | Firm row (collapsed) | `.firm` › `.firm-row` | Rank · brand block · 3 chevrons · CTA column · promo · expand toggle | **One firm per row.** Award pill + ribbon optional |
| 6a | — brand block | `.firm-brand` | Logo (+ribbon +rank medal), name, stars+score, tagline | |
| 6b | — chevron stats | `.firm-stats` › `.chev` | price / split / save (clip-path arrows) | **Consistent trio for all firms** (optimize later) |
| 6c | — CTA column | `.firm-cta` | Get Funded (primary), Add to Compare (secondary), promo meta | Get Funded = affiliate |
| 7 | Expand toggle | `.firm-expand-btn` | "Expand Details ▾" / "Hide Details ▴" | |
| 8 | Expanded panel | `.firm-expand-inner` | **Rich** (tabbed) or **Lean** (snapshot) — see §5.1 / §5.2 | |
| 9 | Compare tray | `.compare-tray` | "Compare (n)", firm chips, Overlay\|Full-page toggle, Clear all, Compare Firms | Sticky bottom; appears when ≥1 selected |
| 10 | Compare overlay | `.cmp-backdrop` › `.cmp-modal` | Simple comparison table (10 rows) | Default presentation |
| 11 | Compare full page | `.cmp-fullpage` | Grouped comparison table (~25 rows) | "even more detail" |
| 12 | Empty state | inline | Mid Tier / Do Not Trade "separate category" card | Nav-only categories |

### 5.1 Expanded panel — RICH (default)

Underline-style tab bar (`.ex-tabs` / `.ex-tab`) matching the product page (gray inactive, orange underline active, no box, no emoji). Four tabs:

- **Overview** — 6-cell quick-facts strip → Pros / Cons / 30-second verdict (3-col grid) → Platforms / Allowed / Watch-outs pill clusters. *(Account Paths intentionally removed from Overview — it lives in the Accounts tab.)*
- **Accounts** — §4.2 grid + "See Full Product Types and Sizes Details →" link.
- **Rules** — §4.3 table + "View Full Rulebook →".
- **Payouts** — §4.4 grid + process strip + track-record CTA.

Shared footer (`.ex-foot`): "**See all [Firm] Details →**" link + Add to Compare + Get Funded.

### 5.2 Expanded panel — LEAN

Compact decision snapshot, no tabs: 6-cell quick-facts strip → "Why traders pick [Firm]" (top 3 pros) / "Keep in mind" (top 2 cons) / 30-second verdict → same shared footer. Purpose: faster scan, funnel to product page.

---

## 6. Comparison feature

### 6.1 Tray
- Appears when ≥1 firm added; **max 4** firms (reject the 5th with a subtle nudge).
- Each slot: mini-logo + name + remove (✕). "Compare Firms →" enabled at **≥2**.
- A segmented **Overlay | Full page** toggle controls which presentation opens. Default **Overlay**.

### 6.2 Two presentations (same data, different chrome + depth)
- **Overlay** (`.cmp-modal`): centered modal, dimmed backdrop, closes via ✕ / backdrop click / Esc. Renders the **simple** row set + a hint to switch to Full page for more.
- **Full page** (`.cmp-fullpage`): full-viewport takeover with "← Back to all firms" bar. Renders the **full grouped** row set.

Firms are **columns**; metrics are **rows**; column header = logo + name + stars + score; bottom row = Get Funded per column.

### 6.3 Row sets (drive both tables from these)

**Simple (Overlay):**
`fee, split, payout, drawdown, consistency, maxAcc, sizes, instant, actFee, score`

**Full (Full page), grouped:**
- **Pricing & Funding:** fee, sizes, instant, actFee
- **Profit & Payouts:** split, payout, payoutFreq, processing, minPayout
- **Risk & Rules:** drawdown, dailyLoss, consistency, maxAcc, minDays, resets, scaling
- **Trading Permissions:** news, bots, copy, weekend, refund
- **Platforms & Rating:** platforms, score

Group headers render as full-width separator rows (`.cmp-group-cell`). Yes/No values use `.cmp-yes` / `.cmp-no`; sale pricing uses `.cmp-orig` + `.cmp-sale`.

---

## 7. Design system

### 7.1 Tokens (light)
```css
--sans:"Inter",system-ui,sans-serif;  --serif:"Source Serif 4",Georgia,serif;
--orange:#F39200; --orange-hover:#d97e00; --orange-soft:#fff8eb; --orange-tint:#fde6d7; --orange-deep:#b9531a;
--green:#2e8654; --green-soft:#d8ecdf; --green-check:#16a34a; --green-bg:#ecfdf5;
--red:#dc2626; --red-soft:#fef2f2;
--gray-50:#fafbfc; --gray-100:#f1f3f6; --gray-150:#e9ecef; --gray-200:#dee1e6;
--gray-300:#c9cdd3; --gray-500:#6b7280; --gray-700:#374151; --gray-900:#111827;
--text:#1a1a1a; --border:#e5e7eb; --bg-page:#f4f5f8; --bg-soft:#f8f9fb; --star:#facc15;
--blue:#2554c7; --blue-dark:#1d3f99; --blue-soft:#eef2ff;
--purple:#7c3aed; --purple-soft:#f3e8ff; --teal:#0e7490; --teal-soft:#ecfeff;
--surface:#ffffff;
```
A full **dark** token set exists in the prototype (`html.dark`); port it verbatim. Every component already references tokens, so dark mode is automatic.

### 7.2 Type & signature elements
- Headings/firm names/prices: **Source Serif 4** (700–800). Body/UI: **Inter**.
- **Chevron stat** uses a CSS `clip-path` arrow; copy the exact polygon values from the prototype `.chev`.
- **Tabs** = underline style (`border-bottom: 3px solid` orange when active), never pill/boxed.
- Buttons: primary = orange (`.btn-primary`), secondary = outline (`.btn-secondary`), added state = blue tint.

---

## 8. Responsive

| Breakpoint | Layout changes |
|---|---|
| **≥1100px (desktop)** | Firm row = single grid row (rank · brand · chevrons · CTA). Overview pros/cons/verdict = 3 cols. Quick-facts = 6 cols. Account/payout grids = 3 cols. Compare = full table. |
| **≤1100px (tablet)** | Firm row reflows: brand on top, chevrons full-width, CTAs side-by-side. Pros/cons/verdict → 2 cols (verdict spans). Quick-facts → 3 cols. Account/payout/rules grids → 1 col / stacked. |
| **≤760px (mobile)** | Full stack (mirrors current mobile site). Quick-facts → 2 cols. Tabs scroll horizontally. Compare table scrolls horizontally. |

---

## 9. Accessibility

- Tabs: `role="tablist"`/`tab`/`tabpanel`, `aria-selected`, arrow-key nav, visible focus.
- Expand toggles: `aria-expanded`.
- Overlay: `role="dialog"`, `aria-modal`, focus trap, Esc to close, scroll-lock body, restore focus on close.
- Color is never the only signal (badges have text + icon).
- Verify token contrast meets WCAG AA in both themes.
- Honor `prefers-reduced-motion` for the expand/tab transitions.

---

## 10. SEO & analytics

- All "Get Funded" / affiliate links: `rel="sponsored noopener"`.
- Add structured data where appropriate (e.g. `Product`/`Review` with `aggregateRating` per firm) — coordinate with existing SEO setup.
- Fire analytics events: `get_funded_click` (firm id, placement: row/expanded/compare), `add_to_compare`, `expand_details` (firm id, mode rich/lean), `compare_open` (firm ids, mode overlay/fullpage), `filter_select` (pill). Confirm naming with the existing analytics layer.
- Preserve advertising-disclosure copy and the "Updated [date]" freshness signal.

---

## 11. Decisions log & open questions

| # | Item | Status |
|---|---|---|
| D1 | One firm per row | **Decided** — keep |
| D2 | Chevron trio (price/split/save) consistent across firms | **Decided** — keep now; optimize per-category later |
| D3 | Expanded detail: Rich vs Lean | **Both built; default Rich.** [OPEN] confirm whether to keep both for users or pick one (e.g. Lean default + Rich on featured firm) |
| D4 | Compare: Overlay vs Full page | **Both built; default Overlay; Full page = deeper.** [OPEN] confirm whether to keep both |
| D5 | Account/Payout tab interactivity | **Snapshot ($50K) + link out.** [OPEN] confirm vs full interactive port |
| D6 | Data source / CMS integration | **[OPEN] — blocker for Phase 1.** Define `prop_firm` source + render strategy (§2) |
| D7 | Pills filter client-side vs navigate to category URLs | **[OPEN]** (§3) |
| D8 | Header date/wording vs live ("Best Prop Firm Offers of [Month]") | **[OPEN]** |
| D9 | Real logos, trust-bar logos | **[OPEN]** — replace monogram tiles with image assets |

---

## 12. Acceptance criteria / QA checklist

**Data**
- [ ] Every firm field populated from the real CMS source; no hardcoded placeholder data ships.
- [ ] Non-Tradeify firms have verified (not representative) numbers before launch.
- [ ] All Get Funded links resolve to correct affiliate URLs with `rel="sponsored noopener"`.

**Collapsed row**
- [ ] Rank, brand, 3 chevrons, CTAs, promo render for every firm.
- [ ] Reflows correctly at 1100 / 760 breakpoints.

**Expanded — Rich**
- [ ] Tabs are underline-style, keyboard-navigable; Overview is default.
- [ ] Overview shows 6 quick-facts (no Account Paths), pros/cons/verdict, pill clusters.
- [ ] Accounts/Payouts: Growth & Lightning align with Select's toggle row (no vertical drift).
- [ ] All "See full…" links point to the correct product page.

**Expanded — Lean**
- [ ] No tabs; 6 quick-facts + 3 pros + 2 cons + verdict + footer.

**Compare**
- [ ] Add up to 4; 5th rejected gracefully; tray shows/hides correctly; ≥2 enables Compare.
- [ ] Overlay (simple rows) opens by default; closes via ✕/backdrop/Esc; body scroll locked.
- [ ] Full page (grouped rows) opens when toggled; "Back to all firms" returns cleanly.
- [ ] Yes/No and sale-price formatting render with correct colors.

**Filters**
- [ ] Each functional pill filters correctly; active pill toggles off to "all".
- [ ] Mid Tier / Do Not Trade behave as navigation (separate categories), not empty filters.

**Cross-cutting**
- [ ] Dark mode correct across all components; preference persists.
- [ ] WCAG AA contrast; reduced-motion respected; dialog a11y verified.
- [ ] Analytics events fire with correct payloads.
- [ ] No layout shift / console errors; Lighthouse acceptable on mobile.

---

## 13. Recommended build sequence

1. **Phase 0 — Integration spike (resolve D6/D7).** Confirm data source + render strategy. Stand up the firm schema (§4) in the CMS for 2–3 firms. *Gate: reviewer sign-off before Phase 1.*
2. **Phase 1 — Collapsed list.** Header, trust bar, pills (no box/sort), controls row, firm rows with chevrons + CTAs, responsive reflow. Ship behind a flag.
3. **Phase 2 — Expanded panels.** Rich tabbed mini-page (Overview/Accounts/Rules/Payouts) + Lean variant + Expanded Details toggle (default Rich).
4. **Phase 3 — Compare.** Tray, Add/remove (max 4), Overlay (simple) + Full page (grouped), Overlay|Full-page toggle.
5. **Phase 4 — Polish.** Filters incl. nav-only empty states, dark mode parity, a11y, analytics, SEO/structured data, QA against §12.

---

## Appendix A — Component → class quick reference

| Component | Selector |
|---|---|
| Firm card / row | `.firm` / `.firm-row` |
| Chevron stats | `.firm-stats` `.chev.green/.gray/.orange` |
| Primary / secondary CTA | `.btn-primary` / `.btn-secondary` (`.added`) |
| Expand toggle | `.firm-expand-btn` (caret) |
| Expanded container | `.firm-expand-inner` (`.lean` modifier) |
| Rich tabs | `.ex-tabs` / `.ex-tab` (`.active`) / `.ex-tab-panel` |
| Quick-facts strip | `.qf-strip` / `.qf-cell` |
| Pros/Cons/Verdict | `.pc-box.pros/.cons` / `.verdict-box` |
| Account/Payout cards | `.compare-grid` / `.account-card.growth/.select/.lightning` |
| Flex/Daily toggle (+spacer) | `.flex-daily-toggle` / `.fd-btn` |
| Rules table | `.rules-table` / `.rule-group` / `.rule-item` / `.rule-badge` |
| Pills (allowed/watch/platform) | `.pill.yes/.caution/.danger/.platform` |
| Compare tray | `.compare-tray` / `.compare-slot` / `.seg` |
| Compare overlay | `.cmp-backdrop` / `.cmp-modal` |
| Compare full page | `.cmp-fullpage` |
| Comparison table | `.cmp-table` / `.cmp-metric` / `.cmp-group-cell` / `.cmp-yes/.cmp-no` |
| Filter pills | `.filter-pill` (`.active`) |
| Detail/compare toggles | `.seg` / `.seg-btn` (`.active`) |

---

## Appendix B — State summary (for the front-end controller)

| State var | Values | Default | Effect |
|---|---|---|---|
| `detailMode` | `rich` \| `lean` | `rich` | Which expanded layout renders |
| `compareMode` | `overlay` \| `fullpage` | `overlay` | Which comparison presentation opens |
| `activeFilter` | `all` \| tag | `all` | List filtering |
| `compareSet` | Set of firm ids | empty | Tray + comparison contents (max 4) |
| theme | light \| dark | light | Persisted (localStorage on prototype; use site convention in prod) |

*End of handoff.*
