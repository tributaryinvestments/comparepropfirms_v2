# FundedNext Futures — Content Map & Data Reference
*Single source of truth for the ComparePropFirms.com FundedNext Futures review page (`cpf-fundednext.html`). Built from the canonical Tradeify cornerstone (`cpf-tradeify.html`); design system unchanged, content swapped per the page-system handoff. All per-product data below was re-verified against **fundednext.com/futures** and **helpfutures.fundednext.com** (June 2026). Where the help center articles disagree (they version independently), the most recently updated article wins and the conflict is flagged inline.*

---

## Company
- **FundedNext Futures** — the futures line of the FundedNext brand. Operated by **GrowthNext F.Z.E.** (UAE). Futures division launched 2025 (Flex model added May 2026).
- Brand stats (verify before publishing): **$150M+** rewarded; **50,000+** rewarded traders; **Trustpilot 4.7/5** from **26,000+** reviews. Awards: Prop Firm of the Year 2025 (Finance Magnates); Deloitte Technology Fast 50.
- **CPF editorial score (this page): 4.5/5.** Hero slogan: **"Industry low evaluation profit targets."**
- "Funded" = **FundedNext Account** (simulated). Live capital path = **Live Trading Program** (Flex road-to-live; Legacy/Rapid funded accounts also migrate if active at a transition).
- Futures and CFD are **two separate rulebooks** under one brand. This page covers **Futures only**. Do not import CFD/Stellar rules (e.g. the CFD "News Reward Share" 40% rule does **not** apply to Futures).

---

## Four challenge types (the per-product axis for this page)
| Type | Internal key | CSS family / accent | Tag | One-liner |
|------|--------------|---------------------|-----|-----------|
| **Rapid**  | `rapid`  | `growth` → **purple** (`--purple`)     | "Fastest Entry"  | 1-step, no consistency & no DLL in challenge; **40% consistency once funded** |
| **Legacy** | `legacy` | `select` → **blue** (`--blue`)         | "Most Popular"   | 1-step, lowest fees, 40% consistency in challenge only, highest return per payout |
| **Bolt**   | `bolt`   | `lightning` → **orange** (`--orange`)  | "Daily Rewards"  | single $50K, daily rewards, up to 125× return, disposable after 5 payouts |
| **Flex**   | `flex`   | `flex` → **teal** (`--teal`)           | "Lowest Target"  | lowest targets, optional 90% reward share, road to Live Funding |

> **Accent / class note (important for editors):** the CSS *family* class on the comparison cards and the JS `cardState.type` value are **different vocabularies**. Comparison cards carry `growth/select/lightning/flex`; the card-view type/size buttons and detail wash carry `rapid/legacy/bolt/flex`. Active-color CSS selectors must use the **rapid/legacy/bolt/flex** names (this was a fixed bug — old `growth/select/lightning` selectors only matched Flex). Map: rapid=purple, legacy=blue, bolt=orange, flex=teal.

- **Account sizes:** Rapid 25/50/100K · Legacy 25/50/100K · Bolt **50K only** · Flex 50/100/150K.
- **Reward split:** **80% / 20%** base on all models. **Up to 90%** via **Flex add-on only** (+$14.99 / $24.99 / $34.99 by size).
- **Max accounts:** 5 funded.
- **Activation fee:** None (one-time challenge fee only). No monthly fees.
- **Drawdown:** EOD trailing MLL on all models; locks at **starting balance + $100** once profit equals the MLL; resets to the starting balance after the first withdrawal.
- **No scaling plan** on any model — contract limits are fixed by size (this is framed as a **positive**: full size from day one; surfaced as a green "No Scaling Plan" pill in *Allowed*, not a Watch-Out).
- **Platforms (3):** Tradovate, NinjaTrader, TradingView (via Tradovate). CME futures (CME / COMEX / NYMEX / CBOT) + micros.
- **Reward methods:** Bank, Crypto. **Processing:** within **24h of approval**, or FundedNext pays **$1,000 extra** (avg ~5h).
- **Sessions:** no overnight/weekend holding — flat by **3:10 PM CT**; trading resumes **Sunday 5:00 PM CT**.

---

## Pricing — VERIFIED June 2026

### One-time fee
| Size | Rapid | Legacy | Bolt | Flex (base → promo) |
|------|-------|--------|------|---------------------|
| 25K  | $99.99  | $79.99  | —      | — |
| 50K  | $199.99 | $149.99 | $99.99 | **$133.99 → $79.99** |
| 100K | $279.99 | $249.99 | —      | **$249.99 → $129.99**… see note |
| 150K | —       | —       | —      | **$483.99 → $289.99** |

### Flex promo — **40% off (code FLEX)** — the current offer
The Flex "What is…" help article (updated most recently) sets the current structure:
| Size | Base | **First 5 (code FLEX, ~40% off)** | 6th purchase onward | Reset |
|------|------|-----------------------------------|---------------------|-------|
| 50K  | $133.99 | **$79.99** | $89.99 | $77.99 |
| 100K | $249.99 | **$149.99** | $169.99 | $144.99 |
| 150K | $483.99 | **$289.99** | $319.99 | $278.99 |

> **Promo history / conflict flag:** the older *Prices* help article still describes FLEX as **47% off first 5** ($69.99/$129.99/$249.99) then 40% from the 6th. The newer *Flex Challenge* article (and the live offer per client) is **40% off first 5** = **$79.99/$149.99/$289.99**. The page now uses the **40%** numbers. The page's struck-through "base" prices are the **real published bases** ($133.99/$249.99/$483.99), so the discount math is honest. Re-confirm at live checkout if the headline % shifts again.
>
> **100K display note:** the card-view Flex 100K fee renders **$249.99 → $149.99** (40% off, the current promo); the row above shows $129.99 only as the legacy 47% figure for reference. Use **$149.99** as the live 100K promo price.

- **Bolt reset:** ~$91.99 (carried from prior research — not re-verified this session; confirm if a stakeholder asks).

---

## Per-size data (challenge phase unless noted)

### Profit target — VERIFIED
| Size | Rapid | Legacy | Bolt | Flex |
|------|-------|--------|------|------|
| 25K  | $1,500 | $1,250 | —      | — |
| 50K  | $3,000 | $3,000 | $3,000 | $2,500 |
| 100K | $5,000 | $6,000 | —      | $5,000 |
| 150K | —      | —      | —      | $8,000 |

### Max Loss (EOD trailing MLL) — VERIFIED (note Rapid vs Legacy diverge at 100K)
| Size | Rapid | Legacy | Bolt | Flex |
|------|-------|--------|------|------|
| 25K  | $1,000 | $1,000 | —      | — |
| 50K  | $2,000 | $2,000 | $2,000 | $1,500 |
| 100K | **$2,500** | **$3,000** | —  | $2,500 |
| 150K | —      | —      | —      | $4,000 |
- Flex MLL **locks** at $50,100 / $100,100 / $150,100 (start + $100). All models reset MLL to the **starting balance** after the first withdrawal.

### Daily Loss Limit — **Bolt only**
- **Bolt 50K: $1,000** (soft breach → trading paused rest of day, resets next day; trails from highest EOD balance). Applies to **both** challenge and funded Bolt. **Rapid / Legacy / Flex: None.**

### Consistency rule (40% where it applies)
- **Rapid:** none in challenge; **40% on the funded account** (daily profit ≤ 40% of total profit before a reward).
- **Legacy / Bolt / Flex:** **40% during the challenge only** (a single day ≤ 40% of the *profit target*; exceeding it raises the target, it does not breach). **None once funded.**

### Max Contracts (e-minis / micros) — VERIFIED; funded ≠ challenge for Rapid & Legacy
**Challenge phase** (shown on the page's Trading box / Trading Rules):
| Size | Rapid (1:5) | Legacy (1:10) | Bolt (1:3) | Flex (1:10) |
|------|-------------|----------------|------------|-------------|
| 25K  | 2 / 10  | 2 / 20  | —      | — |
| 50K  | 3 / 15  | 3 / 30  | 3 / 9  | 3 / 30 |
| 100K | 5 / 25  | 5 / 50  | —      | 5 / 50 |
| 150K | —       | —       | —      | 8 / 80 |

**Funded phase** (step-up; not currently surfaced per-size on the page — see Open Flags):
| Size | Rapid | Legacy | Bolt | Flex |
|------|-------|--------|------|------|
| 25K  | 3 / 15  | 3 / 30  | —      | — |
| 50K  | 5 / 25  | 5 / 50  | 3 / 9  | 3 / 30 |
| 100K | 7 / 35  | 7 / 70  | —      | 5 / 50 |
| 150K | —       | —       | —      | 8 / 80 |

---

## Payout policy by type — VERIFIED (the "less-than-ideal" terms are real)
All models pay an **80% reward share** (Flex up to 90% with add-on). "Payout" = "Performance Reward."

| | First withdrawal | Subsequent (per cycle) | Max per request | Benchmark days | Funded consistency | Lifecycle |
|---|---|---|---|---|---|---|
| **Rapid** | min $250 (25/50K) / $500 (100K) | same min | **$800 / $1,500 / $2,500** then **no cap after 5** | none | **40%** | ongoing |
| **Legacy** | 5 benchmark days + min $250 | min $500 profit/cycle | **up to 50%, cap $3,000 / $6,000 / $6,000** until **30 benchmark days**, then **100%** | 5 (profit $100/$200/$200) | none | ongoing |
| **Bolt** | above **$52,100 buffer** + min $250 | daily, min $250 | **$1,200** (1st–4th); **5th up to $7,700** then **account concluded** | none | none | **disposable, max 5 payouts** |
| **Flex** | 5 benchmark days + min $500/cycle | min $500/cycle | **up to 50%, cap $1,500 / $2,500 / $4,000** | 5 (profit $200/$200/$250) | none | **max 5 payouts → concluded → Live review** |

- Rapid first reward available **~3 days after meeting the 40% funded consistency** (no benchmark days).
- Processing: within **24h of approval** or **+$1,000** (avg ~5h).
- **Flex Road to Live:** after 5 Performance Reward withdrawals the Flex account is concluded and the trader is evaluated for the **Live Trading Program** (also reachable via exceptional performance / prior live history). Flex accounts with ≥1 withdrawal are eligible to transition; 0-payout accounts close. Live accounts: deposit/settlement/reserve structure, 80/20 split, daily withdrawal, EOD drawdown, no DLL, min withdrawal $100, max combined deposit $10,000; 4-week cooldown after a live loss.

---

## Evaluation rules
- All four are **1-Step Challenges**, **no time limit**, **no stated minimum trading days** (the 40% consistency rule on Legacy/Bolt/Flex effectively requires ≥3 winning days to reach target; Rapid can pass in a single day).
- Challenge consistency: Rapid none · Legacy/Bolt/Flex 40%. Challenge DLL: Bolt $1,000 only. No benchmark days in any challenge.

## Trading rules
- **Allowed (all models, challenge + funded):** **news trading (no restrictions — Futures has no News Reward Share rule)**, EAs/bots/algos (ownership verification), copy trading (own accounts), DCA/Martingale, VPN/VPS.
- **Prohibited:** HFT, tick scalping, latency arbitrage, reverse arbitrage, market-data abuse, high-risk/gambling behavior.
- **No overnight/weekend holding** — flat by 3:10 PM CT.

## Restricted countries (single "Not Available" tier — 51)
Afghanistan, Albania, Antarctica, Antigua and Barbuda, Bangladesh, Belarus, Belize, Bouvet Island, Burkina Faso, Burundi, Cape Verde, Chad, Comoros, Congo, Cook Islands, Côte d'Ivoire, Cuba, DR Congo, Djibouti, Eritrea, Fiji, Grenada, Guinea-Bissau, Iran, Iraq, Jordan, North Korea, Laos, Lebanon, Lesotho, Libya, Malawi, Malaysia, Mali, Myanmar, Palestinian Territory (Occupied), Russian Federation, Rwanda, Sierra Leone, Somalia, South Sudan, Sri Lanka, Sudan, Syria, Tajikistan, Timor-Leste, Tuvalu, Ukraine, Venezuela, Vietnam, Yemen. *(Eligibility by residency, not citizenship; travel OK; no VPN bypass; KYC before first reward. Re-verify count/list at helpfutures.fundednext.com.)*

---

## CPF scorecard (this page)
- **Overall: 4.5/5.**
- Rubric: Pricing & Value **4.7** · Reward Share **4.5** · Payout Speed **5.0** · Trading Rules **4.8** · Platforms & Tools **4.5** · Customer Support **4.8**.
- ⚠️ The six rubric rows currently average **~4.72**, above the 4.5 headline. This is intentional per client edits to date; if a strict average is wanted, lower Trading Rules / Customer Support / Payout Speed. Not changed automatically.

## Comparison-view card rows (Accounts tab → Comparison view)
Left column = static label; right column = dynamic value. Eval and Funded are **separate row sets**, kept uniform across all four products for quick comparison. Size buttons show **price** in both phases.

### Evaluation toggle (12 rows)
| Row | Rapid | Legacy | Bolt | Flex |
|-----|-------|--------|------|------|
| Evaluation Steps | 1 Step | 1 Step | 1 Step | 1 Step |
| Profit Target *(per size)* | $1,500 / $3,000 / $5,000 | $1,250 / $3,000 / $6,000 | $3,000 | $2,500 / $5,000 / $8,000 |
| Total Drawdown *(per size)* | $1,000 / $2,000 / $2,500 | $1,000 / $2,000 / $3,000 | $2,000 | $1,500 / $2,500 / $4,000 |
| Daily Loss Limit | None | None | $1,000 | None |
| Days to Pass | 1 day | 3 days | 3 days | 3 days |
| Consistency Rule | None | 40% | 40% | 40% |
| Max Contracts *(per size, mini/micro)* | 2/10 · 3/15 · 5/25 | 2/20 · 3/30 · 5/50 | 3/9 | 3/30 · 5/50 · 8/80 |
| Max Accounts | Up to 5 | Up to 5 | Up to 5 | Up to 5 |
| Account Resets | Yes · 8% off list | Yes · 8% off list | Yes · $91.99 | Yes · $77.99–$278.99 |
| Activation Fee | $0 | $0 | $0 | $0 |
| News Trading | Yes | Yes | Yes | Yes |
| Bots / Algo Trading | Yes | Yes | Yes | Yes |

> **Days to Pass** = the *minimum* days to pass; FundedNext sets no hard min-days rule, but the 40% consistency rule on Legacy/Bolt/Flex forces ≥3 winning days. Rapid (no eval consistency) can pass in 1 day. No time limit / no maximum.
> **Account Resets**: resets are **8% off list** for Rapid/Legacy/Bolt (verified: 50K Rapid $199.99→$183.99, Legacy $149.99→$137.99, Bolt $99.99→$91.99); **Flex** resets at the offer-based price ($77.99 / $144.99 / $278.99). Unlimited up to allocation; don't count toward the 15/month new-challenge cap.

### Funded toggle (12 rows)
| Row | Rapid | Legacy | Bolt | Flex |
|-----|-------|--------|------|------|
| Max Payout *(per size)* | $800 / $1,500 / $2,500 | $3,000 / $6,000 / $6,000 | $1,200 | $1,500 / $2,500 / $4,000 |
| Profit Target | No Target | No Target | No Target | No Target |
| Total Drawdown *(per size)* | $1,000 / $2,000 / $2,500 | $1,000 / $2,000 / $3,000 | $2,000 | $1,500 / $2,500 / $4,000 |
| Daily Loss Limit | None | None | $1,000 | None |
| Days to Payout | From 3 days | 5 days | Daily | 5 days |
| Consistency Rule | 40% | None | None | None |
| Contract Scaling Plan | No | No | No | No |
| Max Accounts | Up to 5 | Up to 5 | Up to 5 | Up to 5 |
| Account Resets | No | No | No | No |
| Profit Split | 80% / 20% | 80% / 20% | 80% / 20% | 80% / 20% (90% add-on) |
| News Trading | Yes | Yes | Yes | Yes |
| Bots / Algo Trading | Yes | Yes | Yes | Yes |

## Payouts tab rows (`#panel-payouts`, per type, per-size)
Size buttons show the **Max Payout** amount. 11 stat rows:
| Row | Rapid | Legacy | Bolt | Flex |
|-----|-------|--------|------|------|
| Max Payout *(per size)* | $800 / $1,500 / $2,500 | $3,000 / $6,000 / $6,000 | $1,200 | $1,500 / $2,500 / $4,000 |
| Max Payout (Subsequent) | No cap (after 5) | 100% (after 30 BD) | $7,700 (5th, final) | (same; 5 max) |
| Minimum Payout *(per size)* | $250 / $250 / $500 | $250 | $250 | $500 |
| Profit Target | No Target | No Target | No Target | No Target |
| Withdrawal Buffer | No Buffer | No Buffer | $52,100 | No Buffer |
| Total Drawdown *(per size)* | $1,000 / $2,000 / $2,500 | $1,000 / $2,000 / $3,000 | $2,000 | $1,500 / $2,500 / $4,000 |
| Daily Loss Limit | None | None | $1,000 | None |
| Days to Payout | From 3 days | 5 days | Daily | 5 days |
| Profit / Trading Day *(benchmark min, per size)* | None | $100 / $200 / $200 | None | $200 / $200 / $250 |
| Consistency Rule | 40% | None | None | None |
| Profit Split | 80% / 20% | 80% / 20% | 80% / 20% | 80% / 20% (90% add-on) |

> **Withdrawal Buffer**: only **Bolt** publishes a buffer ($52,100 = $50K + $2K MLL + $100). Rapid/Legacy/Flex have no marketed buffer ("No Buffer") — withdraw profit above the starting balance once the min/benchmark requirement is met.

## Comparison table (Overview tab) — FundedNext Futures vs Topstep vs Alpha Futures
| Metric | FundedNext Futures (featured) | Topstep | Alpha Futures |
|--------|------------------------------|---------|---------------|
| $50K challenge fee | **$133.99 → $79.99 (Flex)** | $165 → $85 | $79 → $59 |
| Reward / profit split | 80% (up to 90%) | 90% (100% first $10K) | 90/10 |
| **Days to Payout** | **1–5 days** | 5 days | 5 days |
| Drawdown | EOD trailing | EOD trailing | EOD trailing |
| Max funded | 5 | 5 | 5 |
| Daily payout option | Yes (Bolt) | No | No |
| CPF score | **4.5** | 4.7 | 4.9 |
*(Topstep / Alpha columns are reference points carried from the cornerstone — not re-verified this session.)*

---

## Page-specific UI behaviors (differ from a vanilla cornerstone page)
1. **Variable size counts** — `.ac-sizes` uses flex so Bolt (1 size) and Flex (3) render cleanly; 4-size firms are unaffected.
2. **Comparison Evaluation/Funded toggle** — compact + centered (matches cornerstone), shown only in Comparison view.
3. **Comparison-view stat rows are data-driven** — Eval and Funded show **different row sets** (see "Comparison-view card rows" below), rendered from `ACCOUNT_DATA[type][phase]` via `EVAL_ROWS` / `FUNDED_ROWS` schemas in `updateAccountCard()`. Both phases' size **buttons show price** (Funded buttons copy Eval). Max payout is a stat **row** in Funded, not on the buttons.
4. **No Flex promo ribbon** on the comparison card (removed — the struck-through price conveys the discount).
5. **Card-view payouts subtab is per-size** — first/subsequent/max-per-request all update with the selected size (`FUNDED_PAYOUT[type][size]` → `{firstGoal, sub, maxPayout}`).
6. **Top-level Payouts tab** (`#panel-payouts`) is per-type with per-size buttons that show **max payout** amounts; its 11 stat rows render from `PAYOUT_DATA[type]` via `PAYOUT_ROWS` in `renderPayoutCard()`.
7. **Full playbook has 6 sections** (FAQs section #7 removed; the main FAQ tab covers that).

## Open flags / to confirm before publish
- Flex promo % (40 vs 47) at live checkout; Bolt reset fee ($91.99).
- Whether to surface **funded-phase contract step-up** (Rapid/Legacy) anywhere on the page (currently challenge-stage contracts are shown).
- Rubric vs headline-score consistency (see scorecard note).
- Brand stats ($150M+, 50k traders, Trustpilot 4.7/26k+) and restricted-country count (51).

## Sources
fundednext.com/futures; helpfutures.fundednext.com — articles: challenge types & sizes (14255818); prices (15053874); Flex challenge (14878751); benchmark days (14298258); reward share (14260359); per-type reward eligibility — Rapid (14283389), Legacy (14282529), Bolt (14282044), Flex (14878865); contract limits (14262297); profit targets — Legacy (14282332), Rapid (14282838); max loss limit (14298225); daily loss limit (14298201); news trading (14298245).
