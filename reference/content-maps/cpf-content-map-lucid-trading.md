# ComparePropFirms — Lucid Trading Content Map

**Purpose:** one reference for every piece of the Lucid Trading review page that is *product-specific* (changes firm to firm, e.g. Tradeify → Lucid). Anything not listed here is shared template (structure, CSS, render logic) and should **not** be touched per firm. Use the playbooks in §8.

**Files**
| File | What it is |
|---|---|
| `cpf-lucid.html` | Lucid Trading page (current — reflects this map) |
| `cpf-tradeify.html` | Tradeify cornerstone (canonical structure/design reference) |
| `cpf-content-map-lucid-trading.md` | This document |

**Status legend:** ✅ done & verified · ⚠️ needs attention / confirm · 🔒 shared/do-not-change

> **Latest round (standardized Accounts + Payouts rows):** Comparison view rebuilt to **uniform 12-row schemas** per phase (driven by `COMPARE_ROWS` + consolidated `ACCOUNT_DATA`); **funded pills now show PRICE** (copying the eval toggle) not Max Payout; **Payouts tab rebuilt to a uniform 11-row layout** with `PAYOUT_DATA` migrated to uniform keys. See §4a.
>
> **Prior round (payouts + Overview boxes):** Tradeify CPF → 5.0 (now Lucid 5.0 / Topstep 4.8 / Tradeify 5.0); card-view **Overview boxes** reordered to Evaluation · Trading · Funded · **Scaling Plan (new)** · Payouts · Account (Platforms box dropped); **all payout figures re-grounded in Lucid's official help center** (substantial corrections — see §3) and made size-dynamic + consistent across the Payouts tab and the card-view Payouts sub-tab; dead white-space placeholders removed from the Payouts-tab cards.

---

## 1. Per-firm identity variables

| Field | Lucid value | Status |
|---|---|---|
| Firm name / wordmark | Lucid Trading ("LUCID" logo tile) | ✅ |
| Legal entity | Lucid Prop Ltd | ✅ |
| Founder / CEO | AJ Campanella | ✅ |
| Founded | 2025 | ✅ |
| Country | United States | ✅ |
| Hero review rating | 4.7 ★ (Reviews tab shows **no count** — “187” badge removed). Reviews panel still has a “Based on 4,000+ reviews” line — ⚠️ see §7 | ✅ / ⚠️ |
| CPF Score (comparison table) | Lucid **5.0** · Topstep 4.8 · Tradeify **5.0** | ✅ |
| Profit split | 90 / 10 (100% on first $10k grandfathered for accounts bought/reset before 11/28/2025 3pm EST) | ✅ |
| Payout *processing* speed (prose) | ~15 minutes (funds then disbursed within 2 business days) | ⚠️ see §7 |
| Days to Payout (At-a-Glance + comparison) | 3–5 days | ✅ |
| Drawdown model | EOD trailing | ✅ |
| Min payout request (all types) | **$500** | ✅ verified |
| Activation fee | Free / None | ✅ |
| Max accounts | 5 | ✅ |
| Help-center URL | support.lucidtrading.com | ✅ |
| Account types (display) | LucidPro / LucidFlex / LucidDirect | ✅ |
| Account types (internal keys — **do not rename**) | growth / select / lightning | 🔒 |

> **Internal key note:** CSS classes, JS keys, `data-cardtype`, `data-payout-account`, comments all use `growth/select/lightning`. Invisible to users; the join keys across data objects. Change only *display* text.

---

## 2. Promo block — changes most often

| Field | Current (Lucid) | Where it lives |
|---|---|---|
| Discount rate | 50% | JS `discountedPrice()` → `Math.round(num * 0.5)` (single source for card-view fees) |
| Promo code | VAULT | Hero promo pill · Overview verdict prose · floating bottom bar |
| "Save up to" / "From" | 50% / $50 (LucidFlex 25K @ 50%) | Hero chevrons |
| End date | generic "Limited Time" ⚠️ | Hero CTA meta + floating bar — supply a real expiry to harden |
| Static sale prices | see §3 | Comparison view + competitor table (hardcoded) |

> ⚠️ **Two price sources:** card-view fees compute live from base × rate; comparison-view + competitor-table prices are **hardcoded** (re-type on rate change). The **40% consistency** rule is a real LucidPro rule — never confuse with a promo %.

---

## 3. Pricing, rules & payouts matrix (canonical, verified May 2026)

Base (pre-promo) fees + key per-size specs. `ACCOUNT_DATA` (comparison) and `CARD_DATA` (card view) must agree.

**LucidPro** (`growth`) — eval; DLL from $50K; 40% consistency funded (none in eval); buffer-protected payouts
| Size | Fee | Target | Max Loss (EOD) | DLL | Contracts |
|---|---|---|---|---|---|
| 25K | $135 | $1,250 | $1,000 | None | 2 mini / 20 micro |
| 50K | $185 | $3,000 | $2,000 | $1,200 | 4 / 40 |
| 100K | $285 | $6,000 | $3,000 | $1,800 | 6 / 60 |
| 150K | $370 | $9,000 | $4,500 | $2,700 | 10 / 100 |

**LucidFlex** (`select`) — eval; **no DLL ever**; 50% consistency eval-only; funded scaling; payout after **5 winning days/cycle**
| Size | Fee | Target | Max Loss (EOD) | DLL | Contracts (eval max) |
|---|---|---|---|---|---|
| 25K | $100 | $1,250 | $1,000 | None | 2 / 20 |
| 50K | $140 | $3,000 | $2,000 | None | 4 / 40 |
| 100K | $225 | $6,000 | $3,000 | None | 6 / 60 |
| 150K | $420 | $9,000 | $4,500 | None | 10 / 100 |

**LucidDirect** (`lightning`) — instant funded; 20% consistency every payout; no min trading days (8-day removed Feb 2026)
| Size | Fee | Max Loss (EOD) | DLL | Contracts |
|---|---|---|---|---|
| 25K | $340 | $1,000 | None | 2 / 20 |
| 50K | $520 | $2,000 | $1,200 | 4 / 40 |
| 100K | $700 | ⚠️ $3,000–3,500 verify | ⚠️ verify | 6 / 60 |
| 150K | $840 | $4,500 | ⚠️ verify | 10 / 100 |

**50%-off sale prices:** Pro 25K $68·50K $93·100K $143·150K $185 / Flex 25K $50·50K $70·100K $113·150K $210 / Direct 25K $170·50K $260·100K $350·150K $420.

### Payouts (VERIFIED — Lucid help center, single source = JS `PAYOUT_DATA`)

Common: 90/10 split · **min payout request $500 (all types)** · funds deducted in minutes, disbursed within 2 business days.

**LucidPro** — eligibility = Min Profit Goal + 40% consistency + Buffer (NOT a "5 winning days" cycle)
| Size | Min Profit Goal | Max Payout (1st) | Max Payout (2+) | Buffer Balance |
|---|---|---|---|---|
| 25K | $250 | $1,000 | $1,500 | $26,100 |
| 50K | $500 | $2,000 | $2,500 | $52,100 |
| 100K | $750 | $2,500 | $3,000 | $103,100 |
| 150K | $1,000 | $3,000 | $3,500 | $154,600 |

**LucidFlex** — 5 separate profit days/cycle (resets after each payout); no buffer; no consistency; up to **5 payouts** then LucidLive
| Size | Min Daily Profit | Max Payout / Request (50% of profit, up to) |
|---|---|---|
| 25K | $100 | $1,000 |
| 50K | $150 | $2,000 |
| 100K | $200 | $2,500 |
| 150K | $250 | $3,000 |

**LucidDirect** — 20% consistency; profit goal resets to $0 after each payout
| Size | Profit Goal (1st) | Profit Goal (2+) | Max Payout (1–3) | Max Payout (4–5) |
|---|---|---|---|---|
| 25K | $1,500 | $1,250 | $1,000 | $1,000 |
| 50K | $3,000 | $2,500 | $2,000 | $2,500 |
| 100K | $6,000 | $3,500 | $2,500 | $3,000 |
| 150K | $9,000 | $4,500 | $3,000 | $3,500 |

**Funded comparison-view "Max Payout" per size** (hardcoded `.ac-size-payout`; = top-tier per-request cap; also shown on the Payouts-tab size pills):
| Size | LucidPro | LucidFlex | LucidDirect |
|---|---|---|---|
| 25K | $1,500 | $1,000 | $1,000 |
| 50K | $2,500 | $2,000 | $2,500 |
| 100K | $3,000 | $2,500 | $3,000 |
| 150K | $3,500 | $3,000 | $3,500 |

---

## 4. Page sections — what is product-specific

| Tab / Section | Product-specific content | Status |
|---|---|---|
| `<head>` / SEO | `<title>` = "Lucid Trading Review <year>"; `<h1>` hero name | ✅ |
| Hero | name, logo, rating (4.7), tagline ("EOD drawdown & ~15-minute payouts" ⚠️), prices, promo | ✅ |
| Overview — competitor table | Lucid / Topstep / **Tradeify**; CPF 5.0 / 4.8 / 5.0; Days-to-Payout 3–5 / 5 / 1–2 ⚠️; Tradeify $50K fee $165/$99 ⚠️ | ⚠️ Tradeify fee/days to confirm |
| Accounts — Comparison | **uniform 12 rows per phase** (§4a). **Both** eval and funded pills show **price** (funded no longer shows Max Payout on the pill — Max Payout is now a row). Stat label still "Max Loss (Trailing)" ⚠️ §7 | ✅ |
| Accounts — Card view → **Overview boxes** | **6 boxes: Evaluation · Trading · Funded · Scaling Plan · Payouts · Account** (Platforms box dropped). Scaling Plan box is dynamic (see §5) | ✅ |
| Accounts → Card view → Scaling Plan sub-tab | cornerstone build-out: dynamic per-size chart + 3-col (path / chart+example / key rules) + **“$<size> Account — Scaling Milestones”** table (cornerstone format: Milestone / Equity Trigger / Max Contracts, red Start + green trigger dots, full-width spacing). Per-size rows from `FLEX_SCALING` | ✅ |
| Rules | DLL "$1,200–$3,000" (None at $25K); **Max Loss (EOD Trailing)** "$1,000–$4,500"; Min Trading Days 1–5; Platforms row removed | ⚠️ ranges to confirm §7 |
| **Payouts (main tab)** | 3 cards, **uniform 11 rows** (§4a), size-dynamic via `PAYOUT_DATA`; pills show top-tier max payout | ✅ |
| Card view → Payouts sub-tab | Col-1 figures now pulled from the **same `PAYOUT_DATA`**, size-dynamic, matching the Payouts tab | ✅ |
| Platforms / Reviews / Expert / Restricted / FAQ | platform list; **Reviews tab has no count badge**; testimonials (one still name-drops "Apex"); “Based on 4,000+ reviews” line still in panel ⚠️; prose; country list; answers | ✅ / ⚠️ |
| Rules Playbook (modal) | 6 sections / 6 TOC; "Max Loss (EOD Trailing)" + DLL range | ✅ |
| Sidebar | At-a-Glance Days to Payout 3–5 days; Compare Similar = Topstep / Tradeify / Take Profit Trader | ✅ |

## 4a. Standardized row schemas (Accounts comparison + Payouts tab)

Left column = static label; right column = dynamic value (em-dash `—` fallback). Schemas are uniform across firms for quick comparison.

**Comparison view — EVALUATION toggle (12 rows, `COMPARE_ROWS.eval`)** — pills show **price**:
Evaluation Steps (`evalSteps`) · Profit Target (`target`) · Total Drawdown (`totalDrawdown`) · Daily Loss Limit (`dll`) · Days to Pass (`daysToPass`) · Consistency Rule (`consistency`) · Max Contracts (`contracts`) · Max Accounts (`maxAccounts`) · Account Resets (`resets`) · Activation Fee (`activationFee`) · News Trading (`newsTrading`) · Bots / Algo Trading (`bots`).

**Comparison view — FUNDED toggle (12 rows, `COMPARE_ROWS.funded`)** — pills show **price** (changed; no longer Max Payout):
Max Payout (`maxPayout`) · Profit Target (`target`) · Total Drawdown (`totalDrawdown`) · Daily Loss Limit (`dll`) · Days to Payout (`daysToPayout`) · Consistency Rule (`consistency`) · Contract Scaling Plan (`scalingPlan`) · Max Accounts (`maxAccounts`) · Account Resets (`resets`) · Profit Split (`profitSplit`) · News Trading (`newsTrading`) · Bots / Algo Trading (`bots`).

**Payouts tab (11 rows, `data-payout-field` ← `PAYOUT_DATA`)** — pills show top-tier max payout per size:
Max Payout (`maxPayout`) · Max Payout (Subsequent) (`maxPayoutSub`) · Minimum Payout (`minPayout`) · Profit Target (`profitTarget`, or "No target") · Withdrawal Buffer (`withdrawalBuffer`, or "No buffer") · Total Drawdown (`totalDrawdown`) · Daily Loss Limit (`dll`) · Days to Payout (`daysToPayout`) · Profit / Trading Day (`profitPerDay`, `—` if n/a) · Consistency Rule (`consistency`) · Profit Split (`profitSplit`).

> **Max-Payout semantics (NOT a bug):** the **Payouts tab** splits the cap into `maxPayout` (first request) and `maxPayoutSub` (subsequent). The **comparison funded view** "Max Payout" row + the Payouts-tab **size pills** show the **top-tier ceiling** = `maxPayoutSub` (= the highest per-request cap a trader can reach). So comparison-Max-Payout == Payouts-pill == Payouts `maxPayoutSub`, by design.
> - LucidPro: first → subsequent caps differ ($1,000→$1,500 … $3,000→$3,500).
> - LucidFlex: `maxPayout` == `maxPayoutSub` (no first/subsequent distinction).
> - LucidDirect: `maxPayout` = req 1–3 cap, `maxPayoutSub` = req 4–5 cap.

---

---

## 5. JS data objects

| Object | Drives | Notes |
|---|---|---|
| `ACCOUNT_DATA` | Comparison view | consolidated: per type → `eval`/`funded` → `fixed`+`sizes`; carries every COMPARE_ROWS field (evalSteps, daysToPass, consistency, contracts, maxAccounts, resets, activationFee, newsTrading, bots, target, totalDrawdown, dll; funded adds maxPayout, daysToPayout, scalingPlan, profitSplit) |
| `CARD_DATA` | Card view header + Overview boxes | per type + size; `select` reconciled flex-only |
| `TAB_CONTENT` | Card sub-tabs | per-type prose/figures; `select.scaling.programs`/`.steps` now dead (render hardcodes its own) |
| `COMPARE_ROWS` | Comparison view | `{eval:[12],funded:[12]}` — `[label, fieldKey]` pairs; `updateAccountCard()` rebuilds `.ac-stats` from this + `ACCOUNT_DATA[type][phase]` (fixed+sizes), value fallback `—` |
| `PAYOUT_DATA` | **Payouts tab + card-view Payouts sub-tab** | **uniform keys (migrated):** `fixed{minPayout,daysToPayout,consistency,profitSplit, + per-type filler}` + per-size `{maxPayout,maxPayoutSub,profitTarget,withdrawalBuffer,totalDrawdown,dll,profitPerDay}`. `renderPayoutCard()` merges `fixed`+`sizes[size]` and fills `[data-payout-field]` uniformly for all 3 types |
| `FLEX_SCALING` | Scaling sub-tab + Overview Scaling box | per-size contract tiers by simulated profit (verified; 150K column cross-checked) |
| `scalingChartSVG(size)` | Scaling chart | dynamic staircase, one node per tier for the size |
| `renderScalingBox()` | **Overview Scaling Plan box (new)** | LucidFlex → Scaling=Yes, Starting Max=first tier, Max Contracts=last tier, Scaling Triggers=tiers−1, First Trigger=$1,000 equity. Pro/Direct → "Not available" + "—" rows |
| `renderPayoutsTab()` | Card-view Payouts sub-tab | Col-1 first/subsequent/maxPerRequest now size-dynamic from `PAYOUT_DATA` |
| `discountedPrice()` | card-view fees | the promo **rate** (one place) |

> **Init-order note (load-bearing):** the initial `renderCardView()` runs *after* the `PAYOUT_DATA` `const` is initialized — `renderPayoutsTab` references `PAYOUT_DATA`, and a `const` in its temporal dead zone throws (a `typeof` guard does NOT save it). Keep that call after `PAYOUT_DATA`.
> **Vestigial/dead (harmless):** `.fd-btn` CSS; `TAB_CONTENT.select.scaling.programs`/`.steps`. The old `.flex-daily-toggle` placeholders and their listener are now **removed**.

---

## 6. Shared template — do **not** edit per firm 🔒

CSS / tokens (`--orange #F39200`, Inter / Source Serif 4) · 9-tab scaffolding · render functions · toggle logic · internal keys `growth/select/lightning` · `cpf-theme` localStorage · label-left/value-right rows · "CPF Score" = ComparePropFirms rating.

---

## 7. Known residual items (confirm / optionally action)

**Open:**
| Item | Location | Issue |
|---|---|---|
| 8× "Max Loss (Trailing)" labels not renamed | Accounts tab: comparison cards ×3, card-view Overview boxes ×2, `TAB_CONTENT` eval-step labels ×3 (+1 comment) | Rules tab + modal say "EOD Trailing"; these 8 still say "Max Loss (Trailing)". **Offer:** propagate "EOD Trailing" everywhere. |
| Tradeify competitor column | Overview comparison | CPF now 5.0 ✅. Still confirm $50K fee **$165/$99** and Days-to-Payout **1–2 days** against your Tradeify page. |
| LucidDirect 100K/150K MLL & DLL | §3 | per-size max-loss / DLL not fully nailed down — verify. |
| DLL / Max-Loss ranges | Rules tab + modal | "$1,200–$3,000" (None at $25K) and "$1,000–$4,500" — confirm framing. |
| ~15-min payout narrative | hero, pros, payouts, reviews, expert, FAQ, modal (~19 refs) | "~15 min" processing now sits beside "3–5 days" and "2 business days" disbursement. Reconcile the payout-speed story if desired. |
| Scaling "Equity Trigger" wording | Overview Scaling box + Scaling sub-tab milestone table | Both now render **"$1,000 / $2,000 / $3,000 / $4,500 equity"** (per `FLEX_SCALING` tier lower bounds) to match the cornerstone column. Note Lucid's help center frames the basis as *simulated profit*; "equity" follows the cornerstone wording — say if you'd prefer "profit". |
| "Elite Live" / "Live Funded" wording | Rules note, modal, completion/ctaText | Tradeify-era; Lucid's live pool is LucidLive (after 5 payouts on Flex) — wording overstates. |
| `CARD_DATA` per-size specs | Card view | target/DLL/max-loss/contracts partly Tradeify-era; reconcile to §3. |
| LucidFlex eval consistency | a few spots show 40% | should be **50%** (eval-only) — reconcile. |
| Brand colors | CSS tokens | still Tradeify palette; Lucid hex unconfirmed. |
| Profit split 90/10 vs 100%-first-$10k | page-wide | page shows 90/10; help center grandfathers 100%-first-$10k pre-11/28/2025. Decide whether to surface. |
| "Based on 4,000+ reviews" line | Reviews panel (`.count`, ~line 4276) | Tab badge “187” removed per request (no number by the tab). This in-panel “4,000+” line remains — remove/keep per your “no number amount” preference. |
| "Apex" testimonial mention | Reviews tab | user-prose comparison; left intentionally. |

**Resolved this round (verified against official help center):**
- ✅ Min payout was shown as **$250** → corrected to **$500** (all types).
- ✅ LucidFlex caps were 1,500/3,000/4,000/5,000 → corrected to **1,000/2,000/2,500/3,000**.
- ✅ LucidPro is **profit-goal + buffer + 40% consistency**, NOT a "5 winning days" model (card/subtitle corrected).
- ✅ LucidDirect funded Max Payout no longer "best-estimate" — now verified (1,000/2,500/3,000/3,500 top tier).
- ✅ LucidFlex "**5 winning days**" cadence — CONFIRMED correct (official).
- ✅ Payouts now size-dynamic and **match** across the Payouts tab and the card-view Payouts sub-tab.
- ✅ Tradeify CPF = 5.0.
- ✅ Reviews-tab “187” count badge removed (tab now reads just “Reviews”).
- ✅ Scaling sub-tab milestone table reformatted to the cornerstone spaced “Scaling Milestones” layout (was cramped at a 100px first column); correct per-size triggers/contracts for 25K/50K/100K/150K.

---

## 8. Change playbooks

**A. Swap a promo (rate / code / expiry)**
1. `discountedPrice()` rate. 2. Hero chevrons + promo pill. 3. Overview verdict prose. 4. Floating bar. 5. Right-rail headline. 6. Re-type hardcoded sale prices in **Comparison view** + **competitor table** (§3). *(Funded **Max Payout** values + Payouts-tab figures live in `PAYOUT_DATA`/`.ac-size-payout` — verified caps, NOT promo-derived; leave unless the firm's caps change.)* 7. Expiry date. 8. Verify hero + a card-view fee + comparison eval **and** funded phase; confirm consistency % untouched.

**B. Convert / add a new firm** (top→bottom; tick §4 + §5)
1. §1 identity. 2. `ACCOUNT_DATA` + `CARD_DATA` per-size (§3). 3. `TAB_CONTENT` + **`PAYOUT_DATA`** (verify payout caps/goals/buffer from the firm's help center). 4. Panel prose. 5. Restricted countries (C). 6. Platforms. 7. Promo (A). 8. Colors.
9. **Verify:** `grep -ic` old firm name/entity/founder/platforms/tier names/old numbers → 0; case-sensitive grep for short tokens; `node --check` each of the 3 `<script>` blocks (3/3); render every tab light+dark; **0 JS page-errors**; restricted pill count == official.

**C. Update restricted countries** — pull official list (cross-check count) → replace pills (count match) → purge from Eligible card → set basis in subtitle/policy card → update "as of <date>" + link.

---

## Cornerstone alignment (Tradeify template) — applied
- Card sub-tab order = Overview → Evaluation Steps → Trading Rules → Funded Phase → **Scaling Plan → Payouts** → Product FAQ.
- **Overview boxes** = Evaluation · Trading · Funded · **Scaling Plan** · Payouts · Account (Platforms dropped) — matches the cornerstone/sibling layout.
- **Scaling Plan** sub-tab = dynamic chart + 3-col build-out + milestone table; **Overview Scaling box** = 5-row dynamic summary.
- **Payouts** = single `PAYOUT_DATA` source feeding both the Payouts tab and the card-view sub-tab; funded comparison view shows Max Payout.
- Shared design system matched (9 tabs, tokens, localStorage theme, row convention).

---
*Last updated: payouts + Overview-boxes round — Tradeify CPF 5.0; Overview boxes reordered (Platforms→Scaling Plan); payouts re-grounded in Lucid help center (min payout $500; verified per-size goals/caps/buffer); Payouts tab + card-view sub-tab size-dynamic and matching; dead-space placeholders removed.*
