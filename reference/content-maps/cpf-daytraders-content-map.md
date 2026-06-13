# DayTraders.com — Content Map & Data Reference
*Single source of truth for the ComparePropFirms.com DayTraders review page. Account/payout/rule data verified against daytraders.com + help.daytraders.com (2026). Items not yet first-party-confirmed are tagged ‹VERIFY›.*

---

## Company
- **DayTraders.com** — futures prop firm.
- Founder **Leo Riot** ‹VERIFY›; **Founded 2023** ‹VERIFY› (neither confirmable first-party as of this session).
- **Profit split:** 100% on Pro (Trail/EOD/Static funded) and S2F; **80/20 on the Live program (S2L)** — *first-party confirmed* (help.daytraders.com "Live Accounts & Payouts").
- **$150,000 lifetime withdrawal cap per trader.**
- Payouts processed via **Plane** (most approvals ~32 min). Published **2024 pass rate ≈ 45%**.
- Platforms in file: **Onyx** (proprietary, web-based, Rithmic feed, native TradingView charts) + **WealthCharts**; feeds CQG & Rithmic. ‹VERIFY› the full platform list before publish (checkout/payout flows read Rithmic).
- **CPF editorial score (this page): 4.5/5.**
- "Funded" = simulated funded account; **Live** capital comes via the **S2L (Straight to Live)** program.

---

## Five account types (the per-product axis for this page)
| Type | Internal key | Accent | Tag | One-liner |
|------|--------------|--------|-----|-----------|
| **Trail** | `trail` (growth slot) | purple | "Lowest Cost" | Intraday trailing drawdown · 1-step eval · keep 100% |
| **EOD** | `eod` (select slot) | blue | "New" | End-of-day trailing drawdown · 1-step eval |
| **Static** | `static` (lightning slot) | orange | "Fixed Risk" | Fixed drawdown that never trails · 1-step eval |
| **S2F — Straight to Funded** | `s2f` (instant grid) | — | "Instant" | Instant funding · no evaluation · EOD trailing |
| **S2L — Straight to Live** | `s2l` (instant grid) | — | "Live Capital" | Real live account · 8-day qualifier · daily payouts |

- **Account sizes:** Trail/EOD = 25K/50K/150K/300K · Static = 25K/50K/100K/150K · S2F = 25K/50K/150K · S2L = 50K/150K/300K.
- **Max accounts:** Trail 15 · EOD 5 · Static 15 · S2F 5 · S2L 5. (Help center: up to **15 total funded**, of which **≤5 S2F**; page keeps per-product values above.)
- **Activation fee:** Trail/EOD/Static **$130**; S2F/S2L **$0**.
- **Account resets:** evaluation = **Discounted retry**; funded = **Not available**.
- **Scaling:** Trail/EOD/Static/S2F = **No** (full contracts from day one); **S2L = Yes** (Risk Manager review — +1 contract, DLL→% of cash-on-hand, reviewed bi-weekly).

---

## Per-size data (FIRST-PARTY — help.daytraders.com "Evaluation Account Sizes, Fees and Details")

### Current sale price (promotional — changes; one-time fee struck-through → sale)
| Size | Trail | EOD | Static | S2F | S2L |
|------|-------|-----|--------|-----|-----|
| 25K  | $249→$24.90 | $309→$30.90 | $150→$22.50 | $370→$222 | — |
| 50K  | $379→$37.90 | $469→$46.90 | $200→$30 | $570→$342 | $329→$179 |
| 100K | — | — | $325→$48.75 | — | — |
| 150K | $699→$69.90 | $899→$89.90 | $400→$60 | $825→$495 | $469→$319 |
| 300K | $879→$87.90 | $1,599→$159.90 | — | — | $599→$449 |

### Profit Target (evaluation)
| Size | Trail | EOD | Static |
|------|-------|-----|--------|
| 25K  | $1,500 | $1,500 | $2,500 |
| 50K  | $3,000 | $3,000 | $3,750 |
| 100K | — | — | $5,750 |
| 150K | $8,500 | $8,500 | $6,750 |
| 300K | $15,000 | $15,000 | — |
> Funded phase (Trail/EOD/Static) and S2F/S2L = **No target**.

### Total Drawdown
| Size | Trail | EOD | Static | S2F | S2L |
|------|-------|-----|--------|-----|-----|
| 25K  | $1,500 | $1,000 | $750 | $1,000 | — |
| 50K  | $2,500 | $2,000 | $1,000 | $2,500 | $2,000 |
| 100K | — | — | $1,500 | — | — |
| 150K | $4,500 | $4,000 | $1,750 | $6,000 | $4,500 |
| 300K | $7,000 | $6,500 | — | — | $7,000 |
> **S2F drawdown conflict:** page uses 25K $1,000 / 50K $2,500 / 150K $6,000 (**stakeholder-confirmed**). The help-center account-sizes table lists S2F as $750/$1,000/$1,750 — identical to Static, so almost certainly a docs copy artifact; the dedicated S2F article is bot-blocked. Leave page values; re-verify from member dashboard. Funded drawdown for Pro = same as eval (the trail locks at start balance on funding).

### Daily Loss Limit
| Size | Trail | EOD | Static | S2F | S2L |
|------|-------|-----|--------|-----|-----|
| 25K  | None | $800 | None | None | — |
| 50K  | None | $1,250 | None | $1,250 | $1,000 |
| 100K | — | — | None | — | — |
| 150K | None | $2,000 | None | $3,750 | $1,750 |
| 300K | None | $3,250 | — | — | $3,250 |

### Max Contracts (mini / micro) — FIRST-PARTY
| Size | Trail | EOD | Static | S2F | S2L |
|------|-------|-----|--------|-----|-----|
| 25K  | 6 / 60 | 6 / 60 | 4 / 40 | 2 / 20 | — |
| 50K  | 10 / 100 | 10 / 100 | 6 / 60 | 10 / 100 | 2 / 20* |
| 100K | — | — | 8 / 80 | — | — |
| 150K | 20 / 200 | 12 / 120 | 8 / 80 | 20 / 200 | 2 / 20* |
| 300K | 40 / 400 | 40 / 400 | — | — | 2 / 20* |
> *S2L starts at **2 mini / 20 micro**, set/raised by the Risk Manager and reviewed bi-weekly (help.daytraders.com "Live Account Details"). Note: 100K & 150K Static share 8/80.

### Profit / Trading Day (minimum daily profit to count a Qualifying Day)
| Size | Trail/EOD/Static | S2F | S2L |
|------|------------------|-----|-----|
| 25K  | $100 | $100 | — |
| 50K  | $200 | $200 | $200 |
| 100K | $300 | — | — |
| 150K | $300 | $300 | $300 |
| 300K | $400 | — | $400 |

---

## Payout policy (FIRST-PARTY — help.daytraders.com payout FAQ + Pro withdrawal table)
- **Minimum payout request:** **$500** (Pro & S2F).
- **Minimum Qualifying Days between requests:** Pro **8** · S2F **10** · S2L **daily** (after trailing drawdown locks).
- **Max Payout (per request — first = subsequent; DayTraders does not raise the cap on later requests):**
  - Pro (Trail/EOD/Static): 25K $1,000 · 50K $2,000 · 100K $3,000 · 150K $3,500 · 300K $5,000
  - S2F: 25K $1,000 · 50K $2,000 · 150K $3,000
  - **S2L: ‹VERIFY›** (no first-party per-request cap located)
- **Withdrawal Buffer (cushion-to-request = Min Balance to Request − starting balance; "option A"):**
  - Pro: 25K $1,600 · 50K $2,600 · 100K $3,100 · 150K $5,100 · 300K $7,600
  - **S2L: $1,000 flat** above initial balance (first-party "Live Accounts & Payouts").
- **Funded consistency rule:** Pro **30%** (relaxes from 50% eval) · S2F **20%** · S2L **25%**.

### Pro withdrawal table (from stakeholder screenshot — authoritative)
| Size | Min. Balance to Request | Min. Balance After Withdrawal | Max Per Request |
|------|-------------------------|-------------------------------|-----------------|
| 25K  | $26,600 | $26,000 | $1,000 |
| 50K  | $52,600 | $52,000 | $2,000 |
| 100K | $103,100 | $103,000 | $3,000 |
| 150K | $155,100 | $153,500 | $3,500 |
| 300K | $307,600 | $305,000 | $5,000 |
> The page's static card-view row "First Payout Threshold" still reads **$1,500 / min balance $26,500** at 25K — correct value is **$1,600 / $26,600** per this table. OPEN fix (see handoff).

---

## Evaluation & trading rules
- **Evaluation:** all eval products are **1-step**; **min 2 Qualifying Days** to pass (no max time limit); **50% consistency** during eval.
- **News Trading:** **Allowed**, no time restriction → page shows **"Yes"**.
- **Bots / Algo:** **Allowed with ownership verification** → page shows **"Yes (verification req.)"**. (No automated HFT.)
- **DCA (averaging):** Allowed. **Martingale:** **Not Allowed** (red watch-out). No hedging across accounts; one trade ≥ every 30 days to stay active; 1 account per household.

---

## Restricted countries (FIRST-PARTY — stakeholder screenshot)
DayTraders uses a **single restricted list** — "countries where we currently cannot offer new or additional accounts." There is **no Sim-Funded-Only tier** (that was Tradeify's model and has been removed from the page). **79 countries**, eligibility by **residency**:

Afghanistan, Algeria, Azerbaijan, Bahrain, Bangladesh, Belarus, Benin, Brunei, Burkina Faso, Cameroon, Central African Republic, Chad, China, Congo, Côte d'Ivoire, Cuba, Curaçao, Cyprus, Egypt, Gabon, Grenada, Haiti, Indonesia, Iran, Iraq, Jersey, Jordan, Kazakhstan, Kenya, Kosovo, Kuwait, Lebanon, Lesotho, Libya, Madagascar, Maldives, Mauritania, Mauritius, Mongolia, Morocco, Mozambique, Namibia, Nepal, Nicaragua, Niger, Nigeria, Oman, Pakistan, Palestine, Qatar, Republic of Moldova, Republic of the Congo, Réunion, Russia, Rwanda, Saint Pierre and Miquelon, Saudi Arabia, Senegal, Serbia, Somalia, South Africa, Sri Lanka, Sudan, Syria, Tanzania, Thailand, Togo, Trinidad and Tobago, Tunisia, Turkey, Uganda, Ukraine, Uzbekistan, Venezuela, Vietnam, Western Sahara, Yemen, Zambia, Zimbabwe.

Policies (generic, unchanged): residency not citizenship · travel is OK · no VPN bypass · accounts created from restricted countries may be terminated without refund.

## Row schemas used by the comparison + payout engines (this page; propagate for cross-firm parity)
**Accounts → Comparison view → Evaluation toggle (12 rows):** Evaluation Steps · Profit Target · Total Drawdown · Daily Loss Limit · Days to Pass · Consistency Rule · Max Contracts · Max Accounts · Account Resets · Activation Fee · News Trading · Bots / Algo Trading.

**Accounts → Comparison view → Funded & Instant toggle (12 rows):** Max Payout · Profit Target · Total Drawdown · Daily Loss Limit · Days to Payout · Consistency Rule · Contract Scaling Plan · Max Accounts · Account Resets · Profit Split · News Trading · Bots / Algo Trading.

**Payouts tab (11 rows):** Max Payout · Max Payout (Subsequent) · Minimum Payout · Profit Target · Withdrawal Buffer · Total Drawdown · Daily Loss Limit · Days to Payout · Profit / Trading Day · Consistency Rule · Profit Split.

---

## Overview comparison table (Overview tab) — DayTraders vs Bulenox vs Topstep
| Metric | DayTraders (featured) | Bulenox | Topstep |
|--------|-----------------------|---------|---------|
| $50K eval fee | $379 → $37.90 | $175 → $19 | $165 → $85 |
| Profit split | 100% | 100% first $10K then 90% | 90/10 |
| Days to payout | 8–10 Trading Days | 10 Trading Days | 5 Trading Days |
| Drawdown | Trailing / EOD / Static | Trailing or EOD | EOD Trailing |
| Max funded | Up to 11 | Up to 11 | 5 |
| Instant funding | Yes (S2F / S2L) | No | No |
| CPF score | 4.5 | 4.3 | 4.9 |

---

## Open / ‹VERIFY› items
1. **S2L Max Payout** per-request cap — shows ‹VERIFY› in Instant comparison card + payout card.
2. **S2F total drawdown** — page $1,000/$2,500/$6,000 (confirmed) vs help-center $750/$1,000/$1,750 (likely docs copy artifact). Re-verify.
3. **25K First-Payout Threshold / Min Balance** in the static card-view row — should be $1,600 / $26,600 (currently $1,500 / $26,500).
4. **Founder "Leo Riot" / Founded 2023** — unconfirmed.
5. **Platform list** (Onyx, WealthCharts; CQG vs Rithmic) — confirm before publish.
6. **Trustpilot** 4.7 live vs 4.6 in file.

---

## Sources
daytraders.com; help.daytraders.com / intercom.help/daytraders articles: 10131750 (Evaluation Account Sizes, Fees & Details — contracts/targets/drawdowns), 14038700 (Live Accounts & Payouts — 80/20 split, $1,000 buffer), 10707755 (Live Account Details — contract limits), 14473672 (EOD Account Rules), 9856878 / 14367459 (Allowed Number of Accounts), 14363990 (Payout FAQ — Pro & S2F); stakeholder screenshots (Pro withdrawal table; restricted-countries list).
