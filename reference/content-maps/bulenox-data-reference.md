# Bulenox — Verified Data Reference

**Companion to:** `CONTENT_MAP.md` (the generic per-firm cloning guide) and `cpf-bulenox.html` (the built page).
**Purpose:** The single source of truth for **Bulenox-specific** values, verified against the live site. Update this file whenever Bulenox changes its rules/pricing, then sync the HTML from it.

**Verified by live crawl:** 2026-06-02
**Sources (re-crawl these to re-verify):**
- Home / pricing: https://bulenox.com/
- Help — General: https://bulenox.com/help/
- Help — Qualification: https://bulenox.com/help/qualification-account/
- Help — Master: https://bulenox.com/help/master-account/
- Help — Funded: https://bulenox.com/help/funded-account/
- Help — Special (free trial + 10K micro): https://bulenox.com/help/special-account/
- Help — Connection (platforms/feeds): https://bulenox.com/help/connection/
- Help — Subscription & Payment: https://bulenox.com/help/subscription-and-payment/
- Help — Warning: https://bulenox.com/help/warning/
- Help — FAQ: https://bulenox.com/help/frequently-asked-questions/

---

## ⚠️ GOTCHAS / LESSONS (read before editing — these were missed in earlier builds)

1. **ACTIVATION FEE is NOT "None."** This is one of Bulenox's biggest real drawbacks and must show the per-size Master activation fee everywhere — never "None." (Earlier build left two card-view rows as "None.") In the HTML the card-view rows are bound to `data-cd="activation"`, fed from `CARD_DATA[...].sizes[size].activation`.
2. **Pricing is MONTHLY, not one-time.** The Qualification is a recurring monthly subscription that auto-renews every 30 days. The ONLY one-time fee is the **Master activation fee** (paid after you pass). Do not label the eval price "One Time Fee."
3. **Copy trading, bots, algos, hedging are ALLOWED.** The help center explicitly says copiers/algos/bots are "not forbidden," and the Warning page contains **no** trading prohibitions. Do NOT claim "no copy trading / no hedging / no HFT" (those were Tradeify-template leftovers). The only hard restriction is **no overnight/weekend holding** (flat by 15:59 CT).
4. **Promo codes 5JESS / BAZKV are affiliate codes, not on the public site.** The live homepage shows base monthly pricing + coupons **$50OFF** (50K) and **$60OFF** (100K) only. The 89%/45% figures behind 5JESS/BAZKV could NOT be verified on bulenox.com — confirm at checkout before publishing.
5. **Platforms: Rithmic-only, Windows-only.** No CQG, no native Tradovate/TradingView. Use the real supported list (see §Platforms). NinjaTrader 8 free license is included (not "funded-only").
6. **Pro data feed fee is inconsistent on their own site:** Qualification page says **$116/mo**; Connection page says **$112 per exchange**. Present as "~$112–$116/mo."
7. **Funded (Live) stage:** triggered after **3 successful Master payouts** (Risk Management discretion), NOT automatically. Active Master accounts consolidate into ONE Funded account.

---

## Company
- **Legal entity:** Bulenox LLC
- **HQ:** 1201 N Orange St, Suite 7149, Wilmington, DE 19801
- **Founded:** ~2022 (help docs timestamped from Nov 2021; treat as approximate)
- **Founders:** not publicly disclosed
- **Site copyright:** © 2025 Bulenox

## Three-stage model
**Qualification (Evaluation) → Master (Sim-Funded) → Funded (Live)**
- **Qualification:** the paid evaluation. Reach the profit target; no minimum trading days.
- **Master:** simulated-funded account where payouts are EARNED (weekly Wednesdays, 10-day min). Reached after passing Qualification + signing contract.
- **Funded (Live):** real-capital account. Granted after **3 successful Master payouts** (at Risk Management's discretion). All active Master accounts consolidate into one Funded account; payout minimum drops to **5 trading days**. Decline = Master closed, no payout.

## Two products (per account, choose at purchase)
- **Option 1 — Trailing Drawdown** (HTML key `growth`): real-time intraday trailing max-loss (incl. unrealized P&L), **no daily loss limit**, **no scaling** (full contracts day one). Promo: 89% off code **5JESS** (affiliate — unverified).
- **Option 2 — EOD Drawdown** (HTML key `select`): end-of-day trailing max-loss (more forgiving intraday), **daily loss limit**, **dynamic scaling plan**. Promo: 45% off code **BAZKV** (affiliate — unverified).
- Both share the same profit targets, drawdown amounts, and full-size contract caps.

## Account sizes & core specs (5 sizes; site also has a 10K micro via Special Account)
| Size | Monthly (Qual) | Master Activation (one-time) | Profit Target | Drawdown (TDA) | Max contracts (full) |
|---|---|---|---|---|---|
| 25K  | $145/mo | **$143** | $1,500  | $1,500 | 3  (30 micro) |
| 50K  | $175/mo | **$148** | $3,000  | $2,500 | 7  (70 micro) |
| 100K | $215/mo | **$248** | $6,000  | $3,000 | 12 (120 micro) |
| 150K | $325/mo | **$498** | $9,000  | $4,500 | 15 (150 micro) |
| 250K | $535/mo | **$898** | $15,000 | $5,500 | 25 (250 micro) |

*(10K micro account: $98 activation, $1,000 target, $1,000 drawdown, 5 micro max — not shown on the page's 5-size grid.)*
**Current live coupons on homepage:** `$50OFF` (50K → $125/mo), `$60OFF` (100K → $155/mo). No 25K/150K/250K coupon shown.

## EOD daily loss limits (Option 2 only)
10K $400 · 25K $500 · 50K $1,100 · 100K $2,200 · 150K $3,300 · 250K $4,500.
DLL hit = account suspended rest of day (NOT a violation); resumes next session.
**On Master:** DLL removed once the max-drawdown threshold reaches the account's **starting balance** (e.g. ~$103,000 on a $100K acct). *(Not "+$100" — that's the separate drawdown-lock rule.)*

## EOD scaling ladders (Option 2; Cash-on-Hand → max contracts)
- 25K: $0–1,500→2 · $1,501+→3
- 50K: $0–1,500→2 · $1,501–4,000→4 · $4,001+→7
- 100K: $0–2,000→3 · $2,001–3,000→5 · $3,001–5,000→8 · $5,001+→12
- 150K: $0–4,000→5 · $4,001–8,000→8 · $8,001–12,000→10 · $12,001+→15
- 250K: $0–5,000→6 · $5,001–12,000→12 · $12,001–20,000→18 · $20,001+→25
*(Trailing/Option 1 = full max contracts day one, no scaling.)*

## Drawdown mechanics
- Trailing (Opt 1): real-time, follows current balance incl. unrealized.
- EOD (Opt 2): updates only at end of trading day.
- On Master, trailing/EOD **stops moving (locks)** when it reaches initial starting balance **+$100**.

## Master payout policy (where payouts happen)
- First **$10,000** withdrawn at **100%** (no commission); after that **90% trader / 10% company** (charged at transfer).
- Request anytime in the calendar month; **all payouts processed weekly on Wednesdays**.
- Requires **≥10 individual trading days**.
- **Min withdrawal $1,000.** Max withdrawal applies to **first 3 payouts only**, by size: 25K $1,000 · 50K $1,500 · 100K $1,750 · 150K $2,000 · 250K $2,500. After 3rd payout = **no max**.
- **Safety threshold reserve** (min that must remain to withdraw): 25K $1,600 · 50K $2,600 · 100K $3,100 · 150K $4,600 · 250K $5,600. Withdrawable upon Master Agreement termination.
- **40% Consistency rule** (every payout): best single day ≤40% of total profit. `PnL% = (Best day P&L / Total P&L)*100`. If not met → payout held (NOT a violation); keep trading to dilute. Safety threshold counts toward 40% on first withdrawal. None during Qualification.
- Withdrawal methods: ACH/Wire, PayPal, Wise. Independent contractors; **1099-MISC** (US) / **W-8BEN** (foreign).

## Funded (Live) balance caps (eff. Apr 28, 2025)
25K $2,500 · 50K $5,000 · 100K $10,000 · 150K $15,000 · 250K $25,000. Payout min = **5 trading days**.

## Multiple accounts
Up to **11 active Master accounts**, with up to **3 activatable simultaneously** (each additional unlocks once a prior account's max-drawdown reaches its starting balance). Unlimited Qualification accounts. **One Rithmic User ID only** (multiple logins/IDs = ban, no refund). IDs like BX000642-001/-002.

## Reset / subscription
- Qualification reset: **$78 anytime**; **free on billing date** if a rule was violated before the next billing date (completed trading days remain). Subscription auto-renews every 30 days.
- **No reset on Master.**
- **No refunds** (all fees non-refundable). Payment: card, PayPal, crypto.

## Trading rules / permissions
- **Allowed:** news trading, bots/algorithms, trade copiers (Bulenox provides none but doesn't forbid), DCA/Martingale, hedging (not restricted in published rules).
- **Not allowed:** overnight/weekend holding — all positions flat by **15:59 CT**. Trading window 5:00pm–4:00pm CT; weekends/holidays don't count.
- 1 standard contract = 10 micro.
- Instruments: CME-group futures + micros (ES/NQ/YM/RTY/CL/GC/6E/MES/MNQ/MCL etc.).

## Platforms & data feed (Connection page)
- **Rithmic-based, Windows-only** (not macOS/ChromeOS). No CQG; no native Tradovate/TradingView.
- **Free NinjaTrader 8 license** included (auto for accounts after 07/13/2024).
- Pro Rithmic data feed: **~$112–$116/mo** (site lists both figures); non-pro is free.
- **Free 14-day (10 trading day) Rithmic trial** for new Rithmic users (Special Account page).
- Supported platforms (use for the tiles): NinjaTrader 8, R\|Trader Pro, Tiger Trade, Optimus Flow, Inside Edge, Volfix, ATAS, QScalp, OverCharts, MedvedTrader, Quantower, QST, ScalpTool, TSLab, Trade Navigator, Sierra Chart, MultiCharts, Photon Trader, MotiveWave, Investor/RT, Bookmap. *(Do NOT list Jigsaw DayTradr or "Investor/RTD" — not on Bulenox.)*

## Reviews / ratings (NOT re-verified this session — confirm on Trustpilot)
- Trustpilot ≈ **4.8/5 from ~1,600 reviews** (carried from earlier research).
- Page hero rating: 4.6 (editorial).

## Restricted countries
- Single "Not Available" tier (no sim-funded tier). Bulenox restricts **~97 countries** total; the page shows a representative sanctioned/compliance subset with a "verify full list on help center" caveat. The authoritative list isn't on the crawled help pages (likely in Terms of Use PDF) — verify before relying on specifics.

## Competitors used on the page (intentional)
Topstep + Tradeify (the only intended "Tradeify"/"Lightning" mentions in the file are these competitor references).
