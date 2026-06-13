# Lucid Trading Review Page — Implementation Handoff (for agentic AI)

**Artifact:** `cpf-lucid.html` (self-contained single-page review for ComparePropFirms.com)
**Cornerstone reference:** `cpf-tradeify.html` (canonical design + structure; never diverge from it without reason)
**Companion:** `cpf-content-map-lucid-trading.md` (per-field source-of-truth map; read it alongside this doc)
**Goal of this doc:** let an agent recreate, port (to WordPress/Elementor), or QA this page **without re-deriving data or breaking interactivity**. Every number here is verified against Lucid's official help center (support.lucidtrading.com, May 2026) unless flagged ⚠️.

---

## 0. Non-negotiable rules (read first)

1. **Self-contained file.** One `.html` with inline `<style>` and inline `<script>`. No external JS/CSS except fonts/CDN already present. It is embedded into WordPress/Elementor as a raw-HTML block.
2. **Exactly three `<script>` blocks.** After ANY JS edit, run `node --check` on each block — all three must pass. Do not merge or reorder them.
3. **Internal slot keys are immutable:** `growth` = LucidPro, `select` = LucidFlex, `lightning` = LucidDirect. They appear in CSS classes, `data-cardtype`, `data-payout-account`, JS object keys, and comments. **Never rename them.** Only change user-visible display text.
4. **Design system is shared/immutable** (from the cornerstone): color tokens (`--orange #F39200` is CTA-only; teal for callouts/pills; the rest of the ramp), Inter / Source Serif 4 type, `cpf-theme` localStorage dark mode, 9 tabs, label-left / value-right rows. Do not restyle per firm.
5. **Never fabricate firm financials.** If a number isn't in this doc or the content map, leave the existing value and flag it — do not invent. Prices/rules change; re-verify against the help center if unsure.
6. **Edit discipline:** make guarded string replacements (assert each match count), then re-validate JS and re-render. Do not hand-retype large blocks.

---

## 1. Identity & global values

| Field | Value |
|---|---|
| Firm / wordmark | Lucid Trading ("LUCID" tile) |
| Legal entity | Lucid Prop Ltd |
| Founder | AJ Campanella · Founded 2025 · United States |
| Hero rating | 4.7 ★ — **Reviews tab shows NO count** (the "187" badge was removed; tab reads just "Reviews") |
| CPF Score (comparison table) | Lucid **5.0** · Topstep 4.8 · Tradeify **5.0** |
| Profit split | 90 / 10 (100% on first $10k grandfathered for accounts bought/reset before 11/28/2025 3:00pm EST) |
| Drawdown | EOD trailing (all accounts) |
| Payout *processing* | ~15 min, then disbursed within 2 business days |
| Days to Payout (At-a-Glance + comparison) | 3–5 days |
| Min payout request (all types) | **$500** |
| Max accounts | 5 · Activation fee: Free/None |
| Help center | support.lucidtrading.com |
| Display account types | LucidPro / LucidFlex / LucidDirect (internal: growth / select / lightning) |
| Promo | **50% off**, code **VAULT** (rate lives once in JS `discountedPrice()` → `Math.round(num * 0.5)`) |

---

## 2. Pricing (base, pre-promo) — `ACCOUNT_DATA` + `CARD_DATA` must agree

| | 25K | 50K | 100K | 150K |
|---|---|---|---|---|
| LucidPro fee | $135 | $185 | $285 | $370 |
| LucidFlex fee | $100 | $140 | $225 | $420 |
| LucidDirect fee | $340 | $520 | $700 | $840 |

50%-off sale (display): Pro 68/93/143/185 · Flex 50/70/113/210 · Direct 170/260/350/420.
Card-view fees compute live from base × rate. **Comparison-view + competitor-table prices are hardcoded** — re-type them if the promo rate changes.

---

## 3. Payouts — VERIFIED (single JS source = `PAYOUT_DATA`)

Common to all: 90/10 split · **min payout request $500** · funds deducted within minutes, disbursed within 2 business days.

**LucidPro (`growth`)** — eligibility = Min Profit Goal + 40% consistency + Buffer (**NOT** a "5 winning days" model)
| Size | Min Profit Goal | Max Payout 1st | Max Payout 2+ | Buffer Balance |
|---|---|---|---|---|
| 25K | $250 | $1,000 | $1,500 | $26,100 |
| 50K | $500 | $2,000 | $2,500 | $52,100 |
| 100K | $750 | $2,500 | $3,000 | $103,100 |
| 150K | $1,000 | $3,000 | $3,500 | $154,600 |

**LucidFlex (`select`)** — 5 separate profit days/cycle (resets after each payout); no buffer; no funded consistency; **up to 5 payouts then LucidLive**
| Size | Min Daily Profit | Max Payout / Request (50% of profit, up to) |
|---|---|---|
| 25K | $100 | $1,000 |
| 50K | $150 | $2,000 |
| 100K | $200 | $2,500 |
| 150K | $250 | $3,000 |

**LucidDirect (`lightning`)** — 20% consistency; profit goal resets to $0 after each payout; instant funded, no min trading days
| Size | Profit Goal 1st | Profit Goal 2+ | Max Payout 1–3 | Max Payout 4–5 |
|---|---|---|---|---|
| 25K | $1,500 | $1,250 | $1,000 | $1,000 |
| 50K | $3,000 | $2,500 | $2,000 | $2,500 |
| 100K | $6,000 | $3,500 | $2,500 | $3,000 |
| 150K | $9,000 | $4,500 | $3,000 | $3,500 |

**Funded comparison-view "Max Payout" per size** (hardcoded `.ac-size-payout`; also shown on the Payouts-tab size pills) = **top-tier per-request cap**:
| Size | LucidPro | LucidFlex | LucidDirect |
|---|---|---|---|
| 25K | $1,500 | $1,000 | $1,000 |
| 50K | $2,500 | $2,000 | $2,500 |
| 100K | $3,000 | $2,500 | $3,000 |
| 150K | $3,500 | $3,000 | $3,500 |

---

## 4. LucidFlex scaling tiers — `FLEX_SCALING` (drives chart, sub-tab milestone table, and the Overview Scaling box)

Per-size max contracts by simulated-profit tier. Columns = [25K, 50K, 100K, 150K]; `—` = tier doesn't apply at that size.

| Simulated Profit | 25K | 50K | 100K | 150K |
|---|---|---|---|---|
| $0 – $999 | 1 mini / 10 micros | 2 / 20 | 3 / 30 | 4 / 40 |
| $1,000 – $1,999 | 2 / 20 | 3 / 30 | 4 / 40 | 5 / 50 |
| $2,000 – $2,999 | — | 4 / 40 | 5 / 50 | 6 / 60 |
| $3,000 – $4,499 | — | — | 6 / 60 | 8 / 80 |
| $4,500+ | — | — | — | 10 / 100 |

Scaling exists **only for funded LucidFlex**. LucidPro & LucidDirect have NO scaling plan (their Overview Scaling box shows "Not available / —"; their Scaling sub-tab shows the "No Scaling Plan" message).

---

## 5. Page structure

**Top-level tabs (9):** Overview · Accounts · Rules · Payouts · Platforms · **Reviews** (no count) · Expert Review · Restricted Countries · General FAQ.

**Overview tab:** intro/verdict prose, founder/date badges, pros/cons, scoring, and the **competitor comparison table** = Lucid / Topstep / Tradeify (CPF 5.0 / 4.8 / 5.0; Days-to-Payout 3–5 / 5 / 1–2 ⚠️; Profit Split 90/10 all; Drawdown EOD all; Max Accts 5 all; Instant Funding Yes/No/Yes).

**Accounts tab:** Comparison View ⇄ Card View toggle (Card View is default-active).
- **Comparison View:** 3 cards (`#view-comparison`), each a **uniform 12-row table** rebuilt from `COMPARE_ROWS[phase]` + `ACCOUNT_DATA`. **Both** phases show **price** on the pill (`.ac-size-payout` is hidden by CSS; Max Payout is a row in the funded table, not the pill).
  - **EVAL rows (12):** Evaluation Steps · Profit Target · Total Drawdown · Daily Loss Limit · Days to Pass · Consistency Rule · Max Contracts · Max Accounts · Account Resets · Activation Fee · News Trading · Bots / Algo Trading.
  - **FUNDED rows (12):** Max Payout · Profit Target · Total Drawdown · Daily Loss Limit · Days to Payout · Consistency Rule · Contract Scaling Plan · Max Accounts · Account Resets · Profit Split · News Trading · Bots / Algo Trading.
- **Card View:** type buttons (LucidPro/LucidFlex/LucidDirect) + size buttons (25K/50K/100K/150K) + 7 left sub-tabs: **Overview · Evaluation Steps · Trading Rules · Funded Phase · Scaling Plan · Payouts · Product FAQ**.
  - **Card-view Overview sub-tab = 6 boxes** in this exact order: **Evaluation · Trading · Funded · Scaling Plan · Payouts · Account** (there is NO Platforms box). The Scaling Plan box is dynamic (see §6).
  - **Scaling Plan sub-tab:** banner → "How LucidFlex scaling works" → 3-column build-out (path steps / dynamic chart card + worked example / key rules) → **"$<size> Account — Scaling Milestones"** table → footer. The milestone table is the cornerstone format: **Milestone | Equity Trigger | Max Contracts**, with a red dot on "Starting Max Contracts" (At funding) and green dots on "Scaling Trigger N" rows (equity = the tier's lower bound: $1,000 / $2,000 / $3,000 / $4,500). Full-width spacing — the first column is wide (`grid-template-columns: 1.6fr 1fr 1.1fr`); do NOT cap it at a fixed px or the profit range wraps.

**Payouts tab:** 3 cards (`[data-payout-account]`), each a **uniform 11-row table** (`data-payout-field` ← `PAYOUT_DATA`). Header sits directly on the size pills (no spacer). Pills show the top-tier max payout per size. **11 rows:** Max Payout · Max Payout (Subsequent) · Minimum Payout · Profit Target (or “No target”) · Withdrawal Buffer (or “No buffer”) · Total Drawdown · Daily Loss Limit · Days to Payout · Profit / Trading Day (`—` if n/a) · Consistency Rule · Profit Split.

> **Max-Payout semantics (not a bug):** Payouts-tab `maxPayout` = first-request cap, `maxPayoutSub` = subsequent cap. The comparison funded “Max Payout” row + the Payouts-tab pills both show the **top-tier ceiling** = `maxPayoutSub`. LucidPro first≠subsequent; LucidFlex equal; LucidDirect = req 1–3 vs 4–5 caps.

**Rules tab + Rulebook modal:** DLL "$1,200 – $3,000" (None at 25K); **Max Loss (EOD Trailing)** "$1,000 – $4,500"; Min Trading Days 1–5; no Platforms row. Modal has **6 sections / 6 TOC items** (FAQs section removed).

**Sidebar:** At-a-Glance Days to Payout 3–5 days; Compare Similar Firms = Topstep / Tradeify / Take Profit Trader.

---

## 6. JS architecture

| Object / function | Role |
|---|---|
| `ACCOUNT_DATA` | Comparison view per-type eval+funded figures |
| `CARD_DATA` | Card-view header + Overview boxes; per type + size. `select` is reconciled flex-only (no "Flex or Daily" anywhere) |
| `TAB_CONTENT` | Card sub-tab prose/figures per type. (`select.scaling.programs` / `.steps` are dead — the renderer hardcodes its own steps) |
| `COMPARE_ROWS` | `{eval:[12],funded:[12]}` of `[label, fieldKey]`; `updateAccountCard()` rebuilds each comparison `.ac-stats` from this + `ACCOUNT_DATA[type][phase]` (`fixed`+`sizes`), `—` fallback |
| `PAYOUT_DATA` | **Single source** for the Payouts tab AND the card-view Payouts sub-tab. **Uniform keys:** `fixed{minPayout,daysToPayout,consistency,profitSplit,…}` + per-size `{maxPayout,maxPayoutSub,profitTarget,withdrawalBuffer,totalDrawdown,dll,profitPerDay}`. `renderPayoutCard()` merges `fixed`+`sizes[size]` and fills `[data-payout-field]` for all 3 types |
| `FLEX_SCALING` | The §4 tier table |
| `renderPayoutCard(account,size)` | Merges `fixed`+`sizes[size]`, fills `[data-payout-field]` — uniform for all 3 types |
| `renderPayoutsTab()` | Card-view Payouts sub-tab Col-1 — pulls per-size from the SAME `PAYOUT_DATA` so both surfaces match |
| `scalingChartSVG(size)` | Dynamic staircase, one node per tier for the size |
| `renderScalingTab(d)` | Scaling sub-tab build-out + milestone table |
| `renderScalingBox()` | Overview Scaling Plan box. LucidFlex → Scaling=Yes / Starting Max=first tier / Max Contracts=last tier / Scaling Triggers=tiers−1 / First Trigger=$1,000 equity. Pro & Direct → "Not available" + "—" rows |
| `renderCardView()` | Orchestrates the above; called on type/size/phase change |
| `discountedPrice()` | The promo **rate** — the one place to change it |

**⚠️ Load-bearing init order:** the initial `renderCardView()` must run **after** the `PAYOUT_DATA` `const` is initialized. `renderPayoutsTab` references `PAYOUT_DATA`; a `const` in its temporal dead zone throws (a `typeof` guard does NOT save it). Keep that call below the `PAYOUT_DATA` declaration.

**Dynamic behaviors that must survive a port:** type switch recolors + reloads all sub-tabs; size switch updates eval/funded figures, the scaling chart + milestone table, and both payout surfaces; phase toggle (eval/funded) swaps comparison price↔max-payout and the phase-aware Min-Trading-Days / Consistency / Profit-Target labels; dark-mode persists via `cpf-theme`.

---

## 7. Implementation steps (for the agent)

1. Drop `cpf-lucid.html` in as a raw-HTML block (or recreate from the cornerstone, then apply §1–§6). Keep inline CSS/JS intact.
2. Confirm the three `<script>` blocks are present and **`node --check` passes on each (3/3)**.
3. Verify every value in §1–§4 against the live file; correct only mismatches, using guarded replacements.
4. Do NOT touch: internal keys (§0.3), design tokens (§0.4), or any value not listed here (§0.5).
5. Run the §8 render checks. Capture screenshots. Fix, re-validate, repeat until clean.
6. Leave §9 flags as-is unless Jered confirms a change.

---

## 8. Verification checklist (Playwright, headless Chromium)

- **JS:** 3/3 `node --check`; **zero** `pageerror` on load and during interaction.
- **Reviews tab:** label is exactly `"Reviews"` (no number); clicking shows `#panel-reviews`.
- **Comparison table:** CPF row = [5.0, 4.8, 5.0].
- **Card-view Overview:** exactly 6 boxes in order Evaluation · Trading · Funded · Scaling Plan · Payouts · Account; no Platforms box. Scaling box: LucidFlex 25K → "Yes / 1 mini / 2 minis / 1 trigger / $1,000 equity"; 150K → 4 triggers / 10 minis; LucidPro & LucidDirect → "Not available / —".
- **Scaling sub-tab milestone table:** title "$<size> Account — Scaling Milestones"; columns Milestone | Equity Trigger | Max Contracts; first-column cells single-line (no wrap, height ≈ 20px) at all 4 sizes; per-size rows match §4 (e.g. 150K = Start 4 minis → T1 $1,000/5 → T2 $2,000/6 → T3 $3,000/8 → T4 $4,500/10).
- **Payouts tab:** **11 rows** on each of the 3 cards; header→pills gap = 0px; click each size on each card and confirm the rows update to the §3 values (e.g. 100K LucidPro → Max Payout $2,500 / Subsequent $3,000 / Withdrawal Buffer $103,100 / Total Drawdown $3,000 EOD / DLL $1,800; 25K LucidFlex → Profit Target “No target”, Withdrawal Buffer “No buffer”, Profit/Trading Day $100). Card-view Payouts sub-tab shows matching first/subsequent/maxPerRequest.
- **Comparison view:** EVAL and FUNDED each render **exactly 12 rows** with the labels in §5, for all three products; pills show **price in both phases** (`.ac-size-payout` computed `display:none`). Funded Max Payout per size matches §3's funded table.
- **Both themes:** render light + dark; no contrast/overflow regressions.

---

## 9. Open flags — confirm with Jered before "fixing"

- **8× "Max Loss (Trailing)" labels** still in the Accounts tab (comparison cards ×3, card-view Overview boxes ×2, `TAB_CONTENT` eval-step labels ×3). Rules tab + modal already say "EOD Trailing"; propagate only on request.
- **Tradeify competitor column:** confirm $50K fee ($165/$99) and Days-to-Payout (1–2 days) against the live Tradeify page (CPF already 5.0).
- **"Equity Trigger" wording:** Lucid's help center frames scaling by *simulated profit*; the page uses "equity" to match the cornerstone. Switch to "profit" only if Jered prefers.
- **"Based on 4,000+ reviews"** line remains inside the Reviews panel (the tab badge was removed). Remove/keep per the "no number amount" preference.
- **~15-min payout narrative** (~19 refs) coexists with "3–5 days" and "2 business days." Reconcile the payout-speed story if desired.
- **Profit split 90/10 vs 100%-first-$10k** (grandfathered pre-11/28/2025) — page shows 90/10; decide whether to surface the legacy term.
- **Carry-overs:** "Elite Live"/"Live Funded" wording (Lucid's is LucidLive after 5 Flex payouts); `CARD_DATA` per-size specs partly Tradeify-era (reconcile to §2/§3); LucidFlex eval consistency should read 50% everywhere; LucidDirect 100K/150K MLL & DLL to verify; brand colors still the Tradeify palette; one "Apex" mention left intentionally in a testimonial.

---
*Verified against support.lucidtrading.com, May 2026. Promo 50% / VAULT. If any figure looks stale, re-check the help center before changing — do not guess.*
