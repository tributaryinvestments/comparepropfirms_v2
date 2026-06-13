# Alpha Futures — Implementation Handoff (live WordPress/Elementor site)

**Target page:** Alpha Futures review (ComparePropFirms.com)
**Source of truth:** `cpf-alpha-futures.html` (self-contained reference) + `cpf-alpha-content-map.md`.
**Scope of this handoff:** apply the Batch 15–19 changes (Jun 2026) to the live page. Batch 19 restructures the Accounts comparison-view cards (different rows per phase) and the Payouts cards (per-size dynamic) — see §1.11. Almost everything is *text*, *CSS*, *static markup*, or *asset*; the **one JS addition** is the per-type News-trading render in `renderCardView` (see §1.10 and Part 3). The other interactive widgets (account/phase toggles, rulebook modal open/close, comparison caps) are untouched; do not refactor them.

> **Golden rule:** match the reference HTML exactly. When a string or value differs between the live site and the reference, the **reference wins**. Make the smallest edit that produces the reference result; never rewrite a whole block when a token will do.

---

## Part 1 — Change manifest (apply in order)

Each row: **where** (tab/section + anchor) → **old** → **new** → **type**.

### 1.1 Hero
| Where | Old | New | Type |
|---|---|---|---|
| Hero logo overlay | `.hero-logo-ribbon` ("Funded Futures") + `.hero-logo-rank` ("1") elements | **Delete both elements** | markup |
| Hero logo tile | text "ALPHA" | empty tile painted by `--af-logo` (see Part 4) | asset/CSS |
| Hero score (`.hero-rating .score`) | `4.7` | **`4.9`** | text |

### 1.2 Overview — scoring rubric (`.rubric-head .rubric-score`)
| Criterion | Old | New |
|---|---|---|
| Profit Split | 5.0 | **4.8** |
| Payout Speed | 5.0 | **4.8** |
| Platforms & Tools | 5.0 | **4.8** |
*(Pricing & Value 4.8, Trading Rules 4.7, Customer Support 4.9 — unchanged.)*

### 1.3 Overview — pill clusters
| Where | Old | New | Type |
|---|---|---|---|
| Allowed pills | `✓ Bot Trading` | `✓ Semi-Auto Trading` | text |
| Watch-Outs pills | `⚠ 20% Consistency (Advanced)` pill | **Delete pill** | markup |
| Platforms cluster | Tradovate / TradingView / NinjaTrader / Quantower (📊) | add **WealthCharts** + **Deepchart** pills; Quantower/WC/DC icons via CSS vars (Part 4). All 6 platforms present. | markup/asset |

### 1.4 Overview — pros / cons (`.pc-list`)
| Where | Old | New |
|---|---|---|
| Pros | "News trading, bots, and copy trading all allowed" | "News trading and copy trading both allowed" |
| Cons | "Hedging and Martingale strategies not permitted" | "Hedging strategies not permitted" |
| Promo box headline | "🔥 Save 50% This Month" | "🔥 Save 25% This Month" |

### 1.5 Overview — competitor comparison table
Columns are **Alpha (featured-col) · Topstep (firm-col #1) · Tradeify (firm-col #2)**.
| Row | Alpha | Topstep | Tradeify |
|---|---|---|---|
| Profit Split | 90% / 10% | **90% / 10%** *(was "90% (100% first $5K)")* | 90% / 10% |
| Days to Payout | 5 winning days | **5 winning days** *(was "8 days")* | **5 winning days** *(was "1–5 days")* |
| CPF Score | **4.9** *(was 4.7)* | **4.8** *(was 4.7)* | 5.0 |

### 1.6 Bot / Algo — correct to "Semi-Auto Only" everywhere
Alpha's official policy: **full bots/EAs/AI are prohibited; only semi-automated (manual execution) is allowed.**
| Surface | New value |
|---|---|
| Rules tab `Bot / Algo Trading` | badge **`Semi-Auto Only`** (warn) · note "Full bots, EAs & AI prohibited; semi-automated (manual execution) allowed" |
| Rulebook modal `🤖 Bot / Algo Trading` | badge **`Semi-Auto Only`** (warn) · desc same as above |
| Card-view rules-summary `EA / Bots` | badge **`Semi-Auto Only`** (deny) |
| Quick Rule Facts `Bot Trading` | value **`Semi-Auto Only`** (no green check) |
| Platforms tab "Automation note" | "Copy trading is permitted… Full automation (bots, EAs, AI) is not — only semi-automated trading with manual execution." |
| FAQ ("Can I automate…") | drop the "automated" claim; add "Full automation (bots, EAs, AI) is not permitted — only semi-automated…" |

### 1.7 Martingale — relabel + allow
| Surface | Old | New |
|---|---|---|
| Rules tab | `Martingale / Grid` · badge "Not Allowed" | **`Martingale / DCA`** · badge **`Allowed`** |
| Rulebook modal | `⊞ Martingale / Grid` · "Not Allowed" · "Martingale and grid strategies not permitted." | **`⊞ Martingale / DCA`** · **`Allowed`** · "Martingale and DCA strategies are permitted." |
| Expert-review prose | "Hedging and Martingale are not permitted…" | "Hedging is not permitted…" |
| Card-view rules-summary | already "Martingale / DCA — Allowed" | (no change) |

### 1.8 Platforms — icons (see Part 4 for the asset payloads)
- Embed three icons as `:root` CSS vars: `--logo-quantower`, `--logo-wealthcharts`, `--logo-deepchart`.
- **WealthCharts = candlestick mark** rendered on a **black fill, contain-fit**: `background: #000 var(--logo-wealthcharts) center/contain no-repeat;` (applies to both `.platform-icon.wealthcharts` and `.platform-logo.wealthcharts`).
- **Deepchart = purple "W"**: `background: var(--logo-deepchart) center/cover no-repeat;`
- **Quantower = tower mark**: `background: var(--logo-quantower) center/cover no-repeat;`
- Empty the emoji/text inside each `.platform-icon`/`.platform-logo` element so only the background shows.

### 1.9 Rulebook modal (`#rulebook-modal`) — collapse to two columns
1. `.modal-body { grid-template-columns: 200px 1fr; }` (was `200px 1fr 240px`).
2. Move the right-column content (**Quick Rule Facts** box, **CTA** box, **Last Updated**) to the **end of `.modal-main`**, below section 6 — i.e., they now flow under the sections in a single column.
3. Delete the **duplicate** "Need Help?" block (the one that lived in the side column). Keep the single one in the Table-of-Contents column.
4. Right-align all Quick Rule Facts values: `.modal-side-row .value { justify-content: flex-end; text-align: right; }`.

### 1.10 News trading — Zero Qualified ±2 min restriction
Zero **Qualified** accounts cannot enter trades within **2 minutes before/after a tier-1 (high-impact) news event**; **no restriction during the Zero evaluation**, and **Premium/Advanced are unrestricted**.
| Surface | New behavior |
|---|---|
| Accounts **card-view** — Trading block row (`data-cd="newsRow"`) | Per type: **Zero** "✕ No trades ±2 min (Qualified)"; Premium/Advanced "✓ Allowed" |
| Accounts **card-view** — Trading-Permissions badge (`data-cd="newsBadge"`) | Per type: **Zero** "±2 min (Qualified)" (`rs-badge deny`); Premium/Advanced "Allowed" (`rs-badge allow`) |
| Overview pill | **Moved** from Allowed → Watch Outs: "⚠ Zero News ±2 Min" |
| Rules tab `News Trading` | keep badge **Allowed**, add note "Zero Qualified: no trades ±2 min around tier-1 news (Premium & Advanced unrestricted)" |
| Rulebook modal `📰 News Trading` | append to desc: "Zero Qualified blocks trades ±2 min around tier-1 news." |
| FAQ "Can I trade news events…" | rewrite: Premium/Advanced unrestricted; Zero Qualified ±2 min tier-1 (no eval restriction) |

> **JS:** in `renderCardView`, after the activation block, set `[data-cd="newsRow"]` (innerHTML) and `[data-cd="newsBadge"]` (textContent + `className`) from `cardState.type === 'growth'` (Zero). If your live build renders the card-view differently, replicate the same per-type branch.

### 1.11 Accounts comparison view + Payouts — row restructure (Batch 19)
**Comparison view (`#view-comparison`):** each card holds **two** stat blocks — `<div class="ac-stats stats-eval">` and `<div class="ac-stats stats-funded">` — toggled by phase:
```css
.compare-grid.phase-eval .account-card .stats-funded { display:none; }
.compare-grid:not(.phase-eval) .account-card .stats-eval { display:none; }
```
**Eval rows (12, in order):** Evaluation Steps, Profit Target, Total Drawdown, Daily Loss Limit, Days to Pass, Consistency Rule, Max Contracts, Max Accounts, Account Resets, Activation Fee, News Trading, Bots / Algo Trading.
**Funded rows (12, in order):** Max Payout, Profit Target, Total Drawdown, Daily Loss Limit, Days to Payout, Consistency Rule, Contract Scaling Plan, Max Accounts, Account Resets, Profit Split, News Trading, Bots / Algo Trading.
- Each value cell carries `data-field="…"` and is populated by `updateAccountCard()` from `ACCOUNT_DATA[account][phase].fixed/sizes` (merged). **Exception:** Premium's eval Activation Fee uses `data-select-activation` (driven by the Standard/No-Activation toggle), **not** `data-field`.
- **Funded size pills now show monthly price** (Account Size + Price), identical to eval. The previous "max-payout cap in the pill" behavior was removed; the cap is now the funded **Max Payout** row. `applyComparePhasePricing()` was simplified to always restore the eval price markup (and defer Premium to `applyComparePricing()`); `COMPARE_CAPS` was deleted.

**Payouts tab (`#panel-payouts`):** cards are now **per-size dynamic**. Each value cell carries `data-payout-field="…"`; `PAYOUT_DATA[account].{fixed,sizes}` is populated and `renderPayoutCard()` is uniform sizes-based (the old Premium flex/daily branch was removed). **Rows (11, in order):** Max Payout, Max Payout (Subsequent), Minimum Payout, Profit Target, Withdrawal Buffer, Total Drawdown, Daily Loss Limit, Days to Payout, Profit / Trading Day, Consistency Rule, Profit Split. Size pills keep their max-payout-cap labels.

> **Goal:** identical left-column labels across every firm so columns line up for comparison. Keep the label text verbatim; only the right-hand values change per firm/product/size.

---

## Part 2 — Immutable design system (respect; do not "improve")
- **Color roles:** **orange** is reserved for CTA / action buttons **only**; **teal** for callouts, pills, tags. Never repaint a stat or badge orange.
- **Type system:** Inter (sans) + Source Serif — locked. No new fonts/weights.
- **Badge classes (reuse, don't invent):** `rule-badge allowed` (green) · `rule-badge warn` (amber, used for "Semi-Auto Only") · `rule-badge not-allowed` (red); card-view summary uses `rs-badge allow` / `rs-badge deny`.
- **Stat values are right-aligned** sitewide (incl. the modal Quick Rule Facts).
- **Phase name = "Funded"** in all UI chrome (Alpha's "Qualified" only appears in descriptive prose/FAQ/CTAs).

---

## Part 3 — JS architecture
Script changes this round: (a) the per-type **News-trading** render in `renderCardView` (§1.10); (b) the comparison-view rebuild (§1.11) — `ACCOUNT_DATA` (per-phase fixed+sizes with the new field set), `applyComparePhasePricing()` simplified, `COMPARE_CAPS` removed; (c) the payouts rebuild — `PAYOUT_DATA` populated + `renderPayoutCard()` made uniform. `updateAccountCard()` itself is unchanged (it merges fixed+sizes and writes every `[data-field]`). Keep intact:
- Account **card-view** render (`renderCardView`, `setText`, `CARD_DATA`) and **comparison-view** render (`rerenderAllAccountCards`, `updateAccountCard`).
- Premium **Standard/No-Activation** pricing toggle; **phase** (eval/funded) toggle.
- Comparison FUNDED-phase caps: `COMPARE_CAPS` + `applyComparePhasePricing()` — **must stay scoped to `#view-comparison .account-card`** (an unscoped `.compare-grid` selector also matches the Payouts grid and will blank those caps). If you port the JS, preserve that scoping.
- Validate any JS you touch with `node --check` on each extracted `<script>` block (3 blocks; all currently pass).

---

## Part 4 — Assets
The four marks are embedded as `:root` CSS custom properties (data-URI PNGs) in the reference file:
`--af-logo` (Alpha "A"), `--logo-quantower`, `--logo-wealthcharts`, `--logo-deepchart`.

**WordPress options (pick one, be consistent):**
1. **Inline (matches reference):** copy the four `--…` declarations verbatim into the page's `:root` (e.g., an Elementor Custom CSS block or the page wrapper). Zero external requests; survives media-library changes.
2. **Media library:** upload the four PNGs, then replace each var value `url('data:image/png;base64,…')` with `url('https://…/wp-content/uploads/…png')`. Keep the **same variable names and the same `background` shorthands** (esp. WealthCharts' `#000 … contain`).

Icon sizing is handled by the existing `.platform-icon` (18px circle, `overflow:hidden`) and `.platform-logo` (card tile) rules — don't change them.

---

## Part 5 — Post-implementation verification
1. **Render every tab** (Overview, Accounts, Rules, Payouts, Platforms, Reviews, Expert, Restricted, FAQ) in light **and** dark mode — **0 console errors**.
2. **Hero:** no "#1" badge, no "Funded Futures" ribbon; "A" logo paints; score reads **4.9**.
3. **Overview:** rubric shows 4.8 / 4.8 / 4.8 for Profit Split / Payout Speed / Platforms; promo says **25%**; 6 platform pills with real icons; no "20% Consistency" pill; cons say "Hedging strategies not permitted".
4. **Comparison table:** CPF 4.9 / 4.8 / 5.0; all profit splits "90% / 10%"; all Days-to-Payout "5 winning days".
5. **Bot/Algo:** every surface shows **Semi-Auto Only** (search the page for the word "Allowed" next to "Bot" — there should be none).
6. **Martingale:** Rules tab, modal, and card-view summary all read **"Martingale / DCA — Allowed"** (consistent).
7. **Platforms tab:** Quantower (teal tower), **WealthCharts (candlestick on black, fits inside the circle)**, Deepchart (purple "W") all render.
8. **Rulebook modal:** opens; **two columns** (TOC | main); Quick Rule Facts + CTA + Last-Updated sit **under** the sections; only **one** "Need Help?"; all Quick-Fact values right-aligned.
9. **News rule:** in the Accounts card-view, switch **Zero** → News reads "No trades ±2 min (Qualified)" (red badge); switch **Premium/Advanced** → "Allowed" (green). Overview Watch-Outs shows "Zero News ±2 Min"; the green "News Trading" allowed pill is gone.
10. **Comparison rows:** in **Evaluation**, each card shows the 12 eval rows; in **Funded**, the 12 funded rows. Switching account **size** updates Profit Target / Total Drawdown / Daily Loss Limit / Max Contracts (eval) and Max Payout / Total Drawdown / Daily Loss Limit (funded). Funded **size pills show price**, not caps.
11. **Payouts rows:** switching size updates Max Payout / Max Payout (Subsequent) / Total Drawdown / Daily Loss Limit. All 11 labels present.
12. **Interactive smoke test:** Accounts card/comparison toggle, Premium Standard↔No-Activation toggle, eval↔funded phase toggle — all still work.

---

## Part 6 — Open items to confirm with the owner (not blockers)
- Alpha "$50K Eval Fee" featured cell still "$140 → $70" — verify vs Premium 50K (~$79→$59).
- Topstep & Tradeify "Max Payout / Cycle" = "—".
- Comparison-view stat label still "Max Loss (Trailing)" while Rules tab says "EOD".
- Max accounts 5 / $750K (page) vs third-party 3 / $450K.
- Promo code `Jered016805` — confirm current affiliate code.
