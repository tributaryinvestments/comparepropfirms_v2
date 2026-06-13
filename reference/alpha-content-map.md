# ComparePropFirms — Alpha Futures Content Map (database of record)

**File:** `cpf-alpha-futures.html` · Single self-contained HTML (inline CSS + vanilla JS). Built from the `cpf-tradeify.html` cornerstone; verified 0 Lucid / 0 Tradeify facts.
**Primary sources:** alpha-futures.com (home) + help.alpha-futures.com (help center). Data verified May–Jun 2026.
**Last revision:** Jun 2026 — Batches 15–17 (see §9 change log). Supersedes the `cpf-alpha-v1-full-page.html` map.

---

## §1 — Identity / brand layer
| Field | Value |
|---|---|
| Firm name / wordmark | **Alpha Futures** (embedded "A" mark — see §10 assets) |
| Legal entity | Alpha Futures Limited (UK, Companies House #15655643, incorporated **Apr 17 2024**) |
| Group | Part of **Alpha Group** — Alpha Capital Group (forex), ACG Markets (FSA broker), Alpha Prime |
| Founder / CEO | **George Kohler** (COO: Ben Chaffee) |
| HQ | United Kingdom |
| Trustpilot rating | **4.9/5 · 17,000+ reviews** |
| **CPF Score (site's own editorial rating)** | **4.9** — shown in hero (`.score`) **and** competitor table CPF row |
| Headline stats | 175,000+ Qualified Analysts · 140+ countries · $70M performance fees paid · up to $750K simulated |
| `<title>` | "Alpha Futures Review 2026 — ComparePropFirms.com" |
| Help-center URL | help.alpha-futures.com |

## §2 — Slot mapping (internal keys KEPT — shared template, do NOT rename)
| Internal key | Alpha product | Notes |
|---|---|---|
| `growth` | **Zero** | Monthly sub, no activation fee, **Daily Loss Guard**, capped payouts |
| `select` | **Premium** | Dual pricing (Standard +$149 activation / No-Activation), no DLG, no qualified consistency |
| `lightning` | **Advanced** | One-step eval (NOT instant funding); $149 activation, no scaling plan, highest cap |

Card-view type buttons use `data-cardtype`; phase toggle (`phaseState`) = `eval` / `funded`. UI phase NAME = **"Funded"** sitewide (Alpha's own "Qualified" kept only in descriptive prose/FAQ/CTAs).

## §3 — Pricing & rules matrix (verified)
**Universal:** one-step evaluation · **90 / 10** performance split (all account types) · **EOD trailing Maximum Loss Limit** (trails to starting balance, then locks at $100 buffer) · performance fees up to **4×/month** after every **5 winning days of $200+** · withdraw up to **50% of profit / request** · processed **≤48 business hours** · **50% consistency** in evaluation (where applicable), **none once qualified** on Premium & Advanced (Zero: 40% once qualified) · **max 5 accounts** · **Alpha Prime** progression at +$40K payable or 5 cycles.

| | **Zero** (25/50/100K) | **Premium** (50/100/150K) | **Advanced** (50/100/150K) |
|---|---|---|---|
| Monthly fee | $79 / $119 / $239 | Std: $79 / $159 / $239 (+$149 act) · No-Act: $159 / $269 / $379 | $139 / $279 / $419 (+$149 act) |
| Activation | None | $149 (Standard only) | $149 (always) |
| Profit target | $1,500 / $3,000 / $6,000 | $3,000 / $6,000 / $9,000 | $4,000 / $8,000 / $12,000 |
| Contracts | 1 / 3 / 6 | 4 / 8 / 12 | 5 / 10 / 15 |
| Max loss (EOD MLL) | $1,000 / $2,000 / $3,000 | $2,000 / $3,000 / $4,500 | $1,750 / $3,500 / $5,250 |
| Daily Loss Guard | $500 / $1,000 / $2,000 | None | None |
| Max payout/cycle | $1,000 / $1,500 / $2,500 | $6,000 | **$15,000** |
| Min days | 1 eval / 5 qualified | 2 eval / 5 qualified | 2 eval / 5 qualified |
| Resets | from $69 eval / $399 qual | from $69 (Std) | from $139 eval / none qual |
| News | Zero Qualified: no trades ±2 min high-impact | No restriction | No restriction |
| Scaling plan | ✅ dynamic | ✅ dynamic | **No scaling** (full size day 1) |

**Promo:** Premium-only **25% off**, code **Jered016805** (monthly fee only; $149 activation unchanged). Hero + Platforms-aside promo box read **"Save 25% This Month."** Zero & Advanced show real prices, no discount.

### §3a — Prohibited / permitted strategies (verified vs official help center, Jun 2026)
Source: help.alpha-futures.com — *Prohibited Trading Practices* (article 9508585).

| Practice | Status on page | Note |
|---|---|---|
| News Trading | ⚠️ Allowed; **Zero Qualified blocked ±2 min** | Premium/Advanced unrestricted. Zero Qualified: no trades ±2 min around a **tier-1 (high-impact) news** event (no restriction during Zero eval). Rendered **dynamically** per account type in the card-view. |
| Copy Trading | ✅ Allowed | Tradovate copier / signal services |
| **Bot / Algo Trading** | ⚠️ **Semi-Auto Only** | **Full bots, EAs & AI strictly PROHIBITED**; semi-automated (signals with **manual** placement/monitoring) permitted |
| **Martingale / DCA** | ✅ **Allowed** | Not in Alpha's official prohibited list (confirmed by site owner) |
| Hedging | 🛑 **Not Allowed** | Reverse trading / hedging across accounts prohibited (also CME rule on live) |
| HFT / tick-scalping | 🛑 Not Allowed | <2 min holds / <10 ticks / 100+ tr-day banned (prose) |

> **Consistency the page exposes:** Bot/Algo = "Semi-Auto Only" and Martingale/DCA = "Allowed" now match across **all** surfaces — Rules tab, Rulebook modal, card-view rules-summary, Quick Rule Facts, overview pills/pros-cons, Platforms automation note, and FAQ.

## §4 — Editorial rubric (overview "scoring breakdown")
| Criterion | Score |
|---|---|
| 💰 Pricing & Value | 4.8 |
| 📊 Profit Split | **4.8** |
| ⚡ Payout Speed | **4.8** |
| 📜 Trading Rules | 4.7 |
| 🛠 Platforms & Tools | **4.8** |
| 🤝 Customer Support | 4.9 |

## §5 — Competitor comparison table (overview)
Columns: **Alpha Futures** (featured) · **Topstep** · **Tradeify**.
| Metric | Alpha (featured-col) | Topstep (firm-col) | Tradeify (firm-col) |
|---|---|---|---|
| $50K Eval Fee | $140 → $70 ⚠️ *(verify; Premium 50K ≈ $79→$59)* | $165 → $85 | $145 → $87 |
| Profit Split | 90% / 10% | **90% / 10%** | 90% / 10% |
| Days to Payout | 5 winning days | **5 winning days** | **5 winning days** |
| Max Loss Type | EOD Trailing | EOD Trailing | EOD Trailing |
| Max Accounts | 5 | 5 | 5 |
| Max Payout / Cycle | $15,000 | — | — |
| **CPF Score** | **4.9** | **4.8** | **5.0** |

## §6 — Platforms (6 — all included free)
Tradovate · NinjaTrader · TradingView · Quantower · WealthCharts · Deepchart. Listed in the overview pill cluster **and** as cards in the Platforms tab.
Source: help.alpha-futures.com/articles/10525305.

| Platform | Icon source | Render rule |
|---|---|---|
| Tradovate | inline `<img>` base64 | `.platform-icon img` 78% contain |
| NinjaTrader | inline `<img>` base64 | same |
| TradingView | inline `<img>` base64 | same |
| Quantower | CSS var `--logo-quantower` | `center/cover` (tower mark, teal bg baked in) |
| **WealthCharts** | CSS var `--logo-wealthcharts` | **`#000 … center/contain`** — candlestick mark fits inside on a **black** fill |
| Deepchart | CSS var `--logo-deepchart` | `center/cover` (purple "W" on white) |

## §7 — JS data objects (unchanged this round)
| Object | Drives | Per-firm? |
|---|---|---|
| `ACCOUNT_DATA` | Comparison spec rows — **per phase**: `eval.{fixed,sizes}` + `funded.{fixed,sizes}`. Eval fields: evalSteps, target, drawdown, dailyLoss, daysToPass, consistency, maxContracts, maxAccounts, resets, activation (growth/lightning), news, bots. Funded fields: maxPayout, target, drawdown, dailyLoss, daysToPayout, consistency, scaling, maxAccounts, resets, split, news, bots. Select activation is driven by the Standard/No-Act toggle (`data-select-activation`, not `data-field`). | ✅ |
| `CARD_DATA` | Card view (incl. `feeNoAct`/`activation`/`dualPricing` Premium toggle) | ✅ |
| `TAB_CONTENT` | Card sub-tabs; scaling dynamic (Zero+Premium `hasScaling:true`; Advanced `scalingMsg`) | ✅ |
| `PAYOUT_DATA` | **Populated** `{fixed, sizes}` per account; `renderPayoutCard` is uniform sizes-based (the old select flex/daily branch was removed). Drives the 11 per-size payout rows via `data-payout-field`. | ✅ |
| `PHASE_LABELS` / `FULL_WIDTH_TABS` | UI labels / layout | 🔒 shared |
| `COMPARE_CAPS` + `applyComparePhasePricing()` | Comparison-view FUNDED toggle → size pills show max-payout caps; EVAL → monthly prices. **Scoped to `#view-comparison .account-card`** (must stay scoped — `.compare-grid` also matches the payouts grid). | 🔒 |
| `renderCardView` news logic | Per-type News row + Trading-Permissions badge: **Zero** restricted ±2 min (Qualified) / `deny`; **Premium/Advanced** Allowed / `allow`. Targets `[data-cd="newsRow"]` (innerHTML) + `[data-cd="newsBadge"]` (text + class). | 🔒 |

## §8 — Rulebook modal (`#rulebook-modal`) — current layout
- **Two-column** grid: `grid-template-columns: 200px 1fr` (TOC | main). *(Was 3-col `200px 1fr 240px`.)*
- TOC column = Table of Contents + **single** "Need Help?" block + General Rule.
- Main column = sections 1–6, then the former side content **folded underneath**: Quick Rule Facts → CTA → Last Updated.
- `.modal-side-row .value` is **right-aligned** (`justify-content:flex-end; text-align:right`).
- Quick Rule Facts: Bot Trading = "Semi-Auto Only", Hedging = "Not Allowed" (red), Profit Split 90%, Payouts ≤48 Business Hrs.

## §9 — Session change log (Batches 15–19, Jun 2026)
**Accounts comparison view + Payouts rebuilt (Batch 19):** The comparison-view cards now render **different row sets per phase** driven by two stat blocks per card (`.ac-stats.stats-eval` / `.ac-stats.stats-funded`, toggled by `.compare-grid.phase-eval`). **Eval rows (12):** Evaluation Steps · Profit Target · Total Drawdown · Daily Loss Limit · Days to Pass · Consistency Rule · Max Contracts · Max Accounts · Account Resets · Activation Fee · News Trading · Bots / Algo Trading. **Funded rows (12):** Max Payout · Profit Target · Total Drawdown · Daily Loss Limit · Days to Payout · Consistency Rule · Contract Scaling Plan · Max Accounts · Account Resets · Profit Split · News Trading · Bots / Algo Trading. Funded **size pills now show monthly price** (Account Size + Price), same as eval — the old max-payout-in-pill behavior was removed (cap moved to the "Max Payout" row). **Payouts tab** cards are now **per-size dynamic** (`data-payout-field` + populated `PAYOUT_DATA` + uniform `renderPayoutCard`) with 11 rows: Max Payout · Max Payout (Subsequent) · Minimum Payout · Profit Target · Withdrawal Buffer · Total Drawdown · Daily Loss Limit · Days to Payout · Profit / Trading Day · Consistency Rule · Profit Split.

**News trading (Batch 18):** Accounts **card-view** News row is now **dynamic per type** (`data-cd="newsRow"` + `data-cd="newsBadge"`, set in `renderCardView`) — **Zero** → "✕ No trades ±2 min (Qualified)" / `rs-badge deny`; **Premium/Advanced** → "✓ Allowed" / `rs-badge allow`. Overview pill **moved** from Allowed → Watch Outs as "⚠ Zero News ±2 Min". Added a Rules-tab note + Rulebook-modal caveat; corrected the "Can I trade news?" FAQ (previously claimed "without restriction").

**Hero:** removed the "#1" rank badge and "Funded Futures" ribbon; hero-logo = embedded Alpha "A" tile; hero **CPF score 4.9**.
**Overview:** promo "Save 25% This Month"; rubric Profit Split / Payout Speed / Platforms & Tools → **4.8**; removed "20% Consistency (Advanced)" watch-out pill; green pill "Bot Trading" → **"Semi-Auto Trading"**; pro line de-claims bots; con → **"Hedging strategies not permitted"** (Martingale dropped); all 6 platforms in pill cluster with real icons.
**Competitor table:** CPF Score 4.9 / 4.8 / 5.0; Topstep profit split → 90% / 10%; Days to Payout → "5 winning days" for all three.
**Bot/Algo (sitewide):** corrected to **Semi-Auto Only** in Rules tab, modal, card-view summary, Quick Rule Facts, Platforms automation note, FAQ.
**Martingale (sitewide):** **Martingale / Grid → Martingale / DCA = Allowed** in Rules tab + modal; card-view summary already Allowed; expert-prose drops Martingale.
**Platforms:** embedded `--logo-quantower / --logo-wealthcharts / --logo-deepchart`; WealthCharts ↔ Deepchart swapped; WealthCharts on **black contain-fit**.
**Modal:** collapsed to 2-column, side content folded under sections, duplicate "Need Help" removed, values right-aligned.

## §10 — Embedded assets (CSS `:root` variables)
| Variable | Content | Used by |
|---|---|---|
| `--af-logo` | Alpha "A" mark (center-cropped 256px PNG) | `.hero-logo`, `.sb-logo` |
| `--logo-quantower` | Quantower tower (128px) | `.platform-icon.quantower`, `.platform-logo.quantower` |
| `--logo-wealthcharts` | WealthCharts candlestick on black (128px, padded) | `.platform-icon/.platform-logo.wealthcharts` (black contain) |
| `--logo-deepchart` | Deepchart purple "W" (128px) | `.platform-icon/.platform-logo.deepchart` (cover) |

## §11 — Shared template (DO NOT change per firm)
Internal slot keys · phase keys · all CSS/render JS · ComparePropFirms wordmark · base64 platform `<img>` logos (Tradovate/NinjaTrader/TradingView). Orange reserved for CTA/action buttons; teal for callouts/pills/tags; type system locked (Inter / Source Serif).

## §12 — Flagged items to verify against live site
- **$50K Eval Fee (Alpha featured cell)** still "$140 → $70" — verify vs Premium 50K (~$79→$59).
- **Max Payout/Cycle** for Topstep & Tradeify = "—" (no data).
- **Comparison-view stat labels** still "Max Loss (Trailing)" (only Rules tab uses "EOD"); cosmetic.
- **Max accounts = 5 / $750K** (page) vs third-party "3 / $450K". Confirm.
- **Promo code Jered016805** — confirm current affiliate code.
- **Premium dual pricing** figures — re-confirm against live plan page.
- **Funded "Profit Target" = "No Target"** (funded accounts have no target) — confirm wording.
- **"Max Payout (Subsequent)" = same as Max Payout** — Alpha has no documented first-vs-subsequent escalation; shown equal. Confirm if a lower first-payout cap applies.
- **"Withdrawal Buffer" = "No Buffer"** — Alpha uses "up to 50% of profit per request" rather than a fixed buffer; confirm.
- **"Profit / Trading Day" = "$200 min"** (the winning-day threshold).
