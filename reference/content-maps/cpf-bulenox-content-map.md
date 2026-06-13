# ComparePropFirms — Bulenox Content Map (Verified Data Reference)

**Page file:** `cpf-bulenox.html`
**Firm:** Bulenox
**Status:** Verified against bulenox.com (home, /help, /help/connection, /help/warning, /help/master-account)
**Use:** Single source of truth for every factual value rendered on the Bulenox review page. If the live site changes, update here first, then propagate into the HTML.

> Convention used on the page: **label left, value right**, values right-aligned. All money is USD.

---

## 1. Firm identity
- **Legal entity:** Bulenox LLC — 1201 N Orange St, Suite 7149, Wilmington, DE 19801
- **Copyright:** © 2025
- **Model:** Simulated/“sim-funded” prop evaluation → Master (sim-funded) → real-capital Funded
- **Data stack:** Rithmic-only, Windows-only
- **Marketing line:** "trade without any restrictions" (on your own plan)

---

## 2. Products & pricing

Two evaluation products, five sizes each. Both products share the same profit targets, drawdown amounts, and contract caps.

| Product (page key) | What it is | Promo |
|---|---|---|
| **Trailing Drawdown** (`growth`) | Real-time intraday trailing max-loss; **no** daily loss limit; **no** scaling; full contract size from day one | **89% off** with code **5JESS** |
| **EOD Drawdown** (`select`) | End-of-day trailing max-loss (more forgiving of intraday dips); **dynamic scaling**; **daily loss limit** | **45% off** with code **BAZKV** |

**Monthly Qualification fee (list price):**

| Size | List | Public coupon | After public coupon |
|---|---|---|---|
| $25K | $145 | — | $145 |
| $50K | $175 | `$50OFF` | $125 |
| $100K | $215 | `$60OFF` | $155 |
| $150K | $325 | — | $325 |
| $250K | $535 | — | $535 |

- **Only two public coupons exist:** `$50OFF` (50K) and `$60OFF` (100K).
- `5JESS` / `BAZKV` are **affiliate** codes (not shown publicly on the site); they drive the 89%/45% sale prices used in the card pills.
- Sale-price math on page: Trailing sale = 11% of list (89% off); EOD sale = 55% of list (45% off), rounded to whole dollars.

---

## 3. Evaluation parameters (per size)

| Size | Profit target | Trailing drawdown (TDA) | Contracts (minis / micros) | EOD daily loss limit* |
|---|---|---|---|---|
| $25K | $1,500 | $1,500 | 3 / 30 | $500 |
| $50K | $3,000 | $2,500 | 7 / 70 | $1,100 |
| $100K | $6,000 | $3,000 | 12 / 120 | $2,200 |
| $150K | $9,000 | $4,500 | 15 / 150 | $3,300 |
| $250K | $15,000 | $5,500 | 25 / 250 | $4,500 |

\* Daily loss limit applies to the **EOD (`select`)** product only. The **Trailing (`growth`)** product has **no daily loss limit**.

- **Qualification pass:** hit profit target without breaching drawdown — **no minimum number of trading days** in the Qualification.
- **Drawdown lock:** once your balance reaches **start balance + $100**, the max-loss locks at the starting balance (no longer trails).
- **EOD scaling:** the `select` product adds a dynamic scaling plan (contract limit grows with balance).

---

## 4. Master activation (one-time fee)

Paid once when you pass Qualification and move to the Master (sim-funded) account.

| Size | Activation |
|---|---|
| $25K | $143 |
| $50K | $148 |
| $100K | $248 |
| $150K | $498 |
| $250K | $898 |

Page renders this range as **"$143–$898"** in the comparison stat row.

---

## 5. Payouts & withdrawals (Master / sim-funded) — **the core model**

This is the section that must be exactly right. Bulenox does **not** use a “winning days” or “profit goal” model (those are Tradeify/TPT concepts and must never appear here).

- **Minimum trading days before first payout:** **10 individual trading days** (a "trading day" = the 5:00 PM–4:00 PM CT session; weekends/holidays don't count).
- **Minimum withdrawal:** **$1,000**.
- **Maximum withdrawal — first 3 payouts (capped by size), uncapped after the 3rd:**

  | Size | Max per request (payouts 1–3) |
  |---|---|
  | $25K | $1,000 |
  | $50K | $1,500 |
  | $100K | $1,750 |
  | $150K | $2,000 |
  | $250K | $2,500 |

- **Safety threshold reserve (the “buffer”) — must REMAIN in the account; only profit ABOVE it is withdrawable:**

  | Size | Safety reserve |
  |---|---|
  | $25K | $1,600 |
  | $50K | $2,600 |
  | $100K | $3,100 |
  | $150K | $4,600 |
  | $250K | $5,600 |

- **Consistency rule:** **40%** — your single best trading day must stay under 40% of total profit, checked **at each payout request** (not daily).
- **Profit split:** **100% on the first $10,000**, then **90/10** thereafter.
- **Frequency:** weekly; requests processed **Wednesdays**.
- **Methods:** **ACH/Wire, PayPal, Wise**. Tax forms: 1099-MISC (US) / W-8BEN (non-US).

---

## 6. Account scaling & limits
- **Up to 11 Master accounts**, **3 active simultaneously**, all under **one Rithmic ID**.
- Each additional account unlocks as a previous account's drawdown threshold reaches its starting balance.

---

## 7. Qualification → Master → Funded path
1. **Qualification** (the paid evaluation): hit profit target, don't breach drawdown, no min days.
2. **Master** (sim-funded): earn payouts (weekly Wednesdays, after 10 trading days, 40% consistency, above safety reserve).
3. **Funded** (real capital): after **three successful Master payouts** — and at the Risk Management team's discretion — active Master accounts consolidate into **one Funded account**.
   - Funded balance cap: **$2,500 on a 25K** up to **$25,000 on a 250K**.
   - Funded payout minimum drops to **5 trading days**.
- **Resets:** Qualification reset costs **$78** (free on your billing date). The Master account has **no reset**.

---

## 8. Trading rules

**Allowed:**
- News trading
- Dollar-cost averaging (DCA) / Martingale
- Automated/algorithmic trading, bots, EAs, trade copiers (Bulenox doesn't *provide* them, but doesn't forbid them on your own plan)
- Scalping, high-frequency trading (HFT)
- VPN / VPS **for trading** (see restriction below for access from banned countries)

**Not allowed:**
- **Overnight holding** — all positions flat by **15:59 CT**
- **Weekend holding**
- **Hedging** — there is no specific published rule against it, but it is **generally not allowed** (only permitted when trading your own capital, not here)

**Other:**
- Trading day window: **5:00 PM → 4:00 PM CT**; weekends/holidays don't count as trading days.
- Site **warnings** cover only **Market Halt** and **Technical Issues** — there are no other trading prohibitions.

---

## 9. Data & connection
- **Rithmic-only, Windows-only.**
- Free **NinjaTrader 8** license (auto-provisioned after 07/13/2024).
- **Pro** Rithmic data status ≈ **$112/exchange** (CME / CBOT / NYMEX / COMEX); **non-pro is free**.
- Rithmic **14-day free trial** available.

---

## 10. Platforms (20 — all Rithmic)

Inside Edge is **excluded** (per client). Roster order on the page:

`NinjaTrader 8 · R|Trader Pro · Quantower · Sierra Chart · ATAS · Bookmap · MultiCharts · Tiger Trade · Optimus Flow · MotiveWave · Volfix · Investor/RT · QScalp · OverCharts · MedvedTrader · QST · ScalpTool (euSpeed) · TSLab · Trade Navigator · Photon Trader`

- All carry `feed: "rithmic"`.
- ScalpTool is by **euSpeed**; Trade Navigator is by **Genesis Financial Technologies**.

---

## 11. Restricted countries
- Using a **VPN to access Bulenox from a restricted country is a hard breach** — IP logging + pattern detection; sustained VPN use → account closure and forfeiture of profits.

---

## 12. CPF scoring (editorial)
| Metric | Score |
|---|---|
| Overall (CPF score) | **4.3** |
| 💰 Pricing & Value | 4.6 |
| 🤝 Profit Split | 5.0 |
| 📋 Trading Rules | 5.0 |
| ⚡ Payout Speed | 4.3 |
| 🛠 Platforms & Tools | 4.2 |
| 🤝 Customer Support | 4.5 |

Reviews aggregate score shown: **4.8**. Expert review score: **4.8**.

---

## 13a. Accounts comparison-view & Payouts row schemas (uniform across firms)

The comparison-view cards and Payouts-tab cards use a **fixed, uniform row set** (left label static, right value dynamic per product/size) so firms can be compared at a glance. Driven by `ACCOUNT_DATA`/`PHASE_LABELS` (comparison) and `PAYOUT_DATA` (payouts); field keys are noted in brackets.

**Evaluation toggle (12 rows):** Evaluation Steps `[r1]` = 1 Step · Profit Target `[target]` = $1,500/$3,000/$6,000/$9,000/$15,000 · Total Drawdown `[drawdown]` = $1,500/$2,500/$3,000/$4,500/$5,500 · Daily Loss Limit `[dll]` = Trailing **None** / EOD $500/$1,100/$2,200/$3,300/$4,500 · Days to Pass `[days]` = No minimum · Consistency Rule `[consistency]` = None · Max Contracts `[r7]` = 3/7/12/15/25 · Max Accounts `[maxAccounts]` = Up to 11 · Account Resets `[resets]` = Yes — $78 · Activation Fee `[r10]` = $143/$148/$248/$498/$898 · News Trading `[news]` = Yes · Bots / Algo Trading `[bots]` = Yes.

**Funded toggle (12 rows):** Max Payout `[r1]` = $1,000/$1,500/$1,750/$2,000/$2,500 · Profit Target `[target]` = No target · Total Drawdown `[drawdown]` = (same as eval) · Daily Loss Limit `[dll]` = Trailing None / EOD per size · Days to Payout `[days]` = 10 days · Consistency Rule `[consistency]` = 40% · Contract Scaling Plan `[r7]` = Trailing **No** / EOD **Yes** · Max Accounts `[maxAccounts]` = Up to 11 · Account Resets `[resets]` = No · Profit Split `[r10]` = 100% / 90% · News Trading = Yes · Bots / Algo Trading = Yes.

**Payouts tab (11 rows):** Max Payout `[payoutCap]` = first-3 cap per size · Max Payout (Subsequent) `[maxPayoutSub]` = Uncapped · Minimum Payout `[minPayout]` = $1,000 · Profit Target `[target]` = No target · Withdrawal Buffer `[reserve]` = $1,600/$2,600/$3,100/$4,600/$5,600 · Total Drawdown `[drawdown]` = per size · Daily Loss Limit `[dll]` = Trailing None / EOD per size · Days to Payout `[days]` = 10 days · Profit / Trading Day `[profitPerDay]` = No minimum · Consistency Rule `[consistency]` = 40% · Profit Split `[split]` = 100% / 90%.

> **‹VERIFY› Profit / Trading Day** — set to "No minimum"; Bulenox publishes no minimum-profit-per-day threshold for a day to count toward the 10 trading days. Confirm against bulenox.com if a per-day figure exists.
> **Deliberate cornerstone deviation:** this uniform row schema differs from the Tradeify cornerstone and is intended to propagate to it and all firm pages.

## 13. Comparison-table competitor reference (Overview tab)
The Overview comparison table compares Bulenox vs Topstep vs Tradeify. Keep competitor figures current:

| Metric | Bulenox | Topstep | Tradeify |
|---|---|---|---|
| $50K eval fee | $175 → $19 | $165 → $85 | $145 → $87 |
| Profit split | 100% first $10K, then 90% | **90% / 10%** | 90% / 10% |
| Days to payout | 10 trading days | 5 trading days | 1–5 days |
| Drawdown type | Trailing or EOD (choose) | EOD trailing | EOD trailing |
| Max accounts | Up to 11 | 5 | 5 |
| Instant funding | No | No | Yes (Lightning) |
| CPF score | 4.3 | 4.9 | 5.0 |

> **2026 update:** Topstep now uses a **90/10** split (it no longer offers 100% on the first $10K). Bulenox keeps its 100%-first-$10K-then-90% structure, so Bulenox now clearly leads on split.

## 14. Open items / watch-list
- **Select 50K contract value** — confirm vs live if Bulenox revises.
- **"Max Loss (EOD)" labeling** — decide if it should be propagated globally across all firm pages.
- **Volfix & Trade Navigator logos** — currently rendered on dark tiles. Their uploaded files are dark-mode logos (near-black wordmark / white "NAVIGATOR"); they cannot be placed on white without light-background source files.
