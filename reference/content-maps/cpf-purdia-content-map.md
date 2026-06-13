# Purdia Capital — Content Map & Data Reference
*Single source of truth for the ComparePropFirms.com Purdia Capital review page (`cpf-purdia.html`). Verified against purdia.com and its knowledgebase (2026). Built on the `cpf-tradeify.html` cornerstone design system.*

---

## Company
- **Purdia Capital LLC** — futures prop firm. Operating since **2022**. **Founder & CEO: Jonas D. Attiah.** HQ **651 N Broad St, Suite 201, Middletown, DE 19709, USA**.
- By its own account: **never denied a payout**, **$5M+** funded, **6,000+** active pro traders (15,000+ across programs).
- Trustpilot shown as **4.5 / 64 reviews** *(sidebar figure — not independently re-verified; see Open Flags)*.
- **CPF editorial score (comparison table): 4.9/5.** *(Hero rosette still renders 5.0 — see Open Flags.)*
- Positioning: "compare → pick → get funded." Fast funding, fast payouts, genuine **live** brokerage accounts via **Tradovate** after qualifying.
- Pre-live: a **temporary simulated funded environment** (up to **$10,000** total profit) while the live account is set up (**~several weeks**).

---

## Two products / five types (the per-product axis for this page)
| Product | Type | Internal key | Accent | Tag | One-liner |
|---------|------|--------------|--------|-----|-----------|
| **Evaluation** (monthly) | **Beginner** | `beginner` | green (`--green`) | "Learn Safely" | 2-step, micro-only, free Step-1 resets, 0% consistency |
| **Evaluation** (monthly) | **EOD Drawdown** | `eod` | blue (`--blue`) | standard | 1-step, EOD trailing drawdown |
| **Evaluation** (monthly) | **Pro** | `pro` | purple (`--purple`) | "Trailing DD" | 1-step, intraday trailing; funded needs $200 × 5 days in sim |
| **Instant Funding** (one-time) | **EOD Instant** | `instant` | orange (`--orange`) | "Skip the Eval" | No eval — sim funded on purchase; EOD trailing |
| **Instant Funding** (one-time) | **Static Instant** | `static` | teal (`--teal`) | "Static DD" | No eval; fixed (static) drawdown; 90-day window, no resets |

- **Category axis (card view):** `eval` → {beginner, eod, pro}; `instant` → {instant, static}.
- **`NOEVAL = [instant, static]`** (these show the "No Evaluation" empty-state in the comparison eval phase).
- **Profit split:** **90% / 10%** across all types, from day one.
- **Consistency rule:** **0% (none)** on every account, eval and funded.
- **Max accounts:** **3** (sim + live combined, any mix of sizes).
- **Activation fee:** **$130** one-time **after passing an eval** (eval path only). Instant accounts are a one-time purchase (no activation fee).
- **Resets:** **$99** in the eval stage; **free once/day in Beginner Step 1**; **no resets** on Instant/Static.
- **Drawdown types:** EOD trailing (Beginner / EOD / EOD Instant) · Intraday trailing (Pro) · Static (Static Instant + **all live accounts**). Live drawdown is **static at breakeven + $100**.
- **Daily Loss Limit:** a **soft halt** (never a breach). Present on Beginner/EOD/Static; **none by default** on Instant & Pro.
- **Instruments:** CME futures & micros, front-month. **No** forex, crypto, options, or stocks.
- **Platforms (3):** **Tradovate** (the regulated broker behind live accounts), **TradingView**, **NinjaTrader**. *(Tradovate + TradingView explicit on purdia.com; NinjaTrader plausible — see Open Flags.)*
- **Scaling plan:** **None** (shown in a red pill). No tiered contract-scaling plan — Purdia doesn't unlock additional contracts through profit milestones. *(KB does describe discretionary live size adjustments, but the page presents "no tiered scaling plan" editorially.)*
- **Automation:** **semi-automated tools & trade copiers allowed** with active monitoring; **fully automated / set-and-forget systems prohibited**.
- **Allowed:** news trading, DCA/scalping, copy trading (monitored), semi-automation.
- **Overnight/weekend:** not allowed. Auto-flatten **3:45 PM CT** (not a breach); close 4:00 PM CT; reopen 5:00 PM CT.
- **Min trading days:** **5** to pass an eval; **10 days + 5 profitable** for the first payout.

---

## Promo / pricing (current sale — TWO codes live on the page)
- **`IMAN`** = **30% off all accounts** (headline promo). Appears in the hero CTA and the sidebar sale box.
- **`CORE200`** = **$200 off the $50K Instant** ($549 → **$349**, cheaper than the 30% price). Called out in the sidebar sale box.
- Sale framing: hero chevron "**Save up to 30%**"; CTA "**June Sale Ends 6/30/26**"; sidebar "**🔥 Save 30% This Month**". *(Date is placeholder-matched to the cornerstone format — confirm Purdia's actual end date.)*

### Per-size fee (list → sale shown struck-through)
| Type | Size | List | Sale | Code |
|------|------|------|------|------|
| Beginner (mo) | 10K | $79 | **$55** | IMAN |
| Beginner (mo) | 25K | $119 | **$83** | IMAN |
| EOD (mo) | 50K | $179 | **$125** | IMAN |
| EOD (mo) | 100K | $299 | **$209** | IMAN |
| Pro (mo) | 100K | $199 | **$139** | IMAN |
| EOD Instant (one-time) | 25K | $349 | **$244** | IMAN |
| EOD Instant (one-time) | 50K | $549 | **$349** | **CORE200** |
| EOD Instant (one-time) | 100K | $849 | **$594** | IMAN |
| Static Instant (one-time) | 100K | $1,499 | **$1,049** | IMAN |
| Static Instant (one-time) | 150K | $2,299 | **$1,609** | IMAN |

### Profit target (to qualify)
- Beginner: 10K **$1,000 / step** · 25K **$2,000 / step** (2-step)
- EOD: 50K **$3,000** · 100K **$6,000**
- Pro: 100K **$6,000**
- EOD Instant: 25K **reach $1,000** · 50K **reach $2,000** · 100K **reach $3,000**
- Static: 100K **reach $3,000** · 150K **reach $5,000**

### Max Drawdown (the single hard-breach rule) — range **$750 – $5,000**
- Beginner: 10K $1,000 EOD · 25K $2,000 EOD
- EOD: 50K $2,000 EOD · 100K $3,000 EOD
- Pro: 100K $3,000 intraday trailing
- EOD Instant: 25K $750 EOD · 50K $1,500 EOD · 100K $3,000 EOD
- Static: 100K $3,000 static · 150K $5,000 static

### Daily Loss Limit (soft halt) — range **$250 – $2,000**
- Beginner: 10K $250 · 25K $500
- EOD: 50K $1,000 · 100K $2,000
- Static: 100K $1,000 · 150K $1,500
- **Instant & Pro:** none by default

### Max contracts (minis / micros)
- Beginner: 10K **5 Micros** · 25K **10 Micros**
- EOD: 50K **5 Minis (50 Micros)** · 100K **10 Minis (100 Micros)**
- Pro: 100K **10 Minis (100 Micros)**
- EOD Instant: 25K **2 Minis (20 Micros)** · 50K **5 Minis (50 Micros)** · 100K **10 Minis (100 Micros)**
- Static: 100K **3 Minis (30 Micros)** · 150K **5 Minis (50 Micros)**

---

## Payout policy
- **Profit split:** 90/10, all accounts.
- **First payout:** requires a **Live Funded Account** = **10 trading days + 5 profitable days** (min $200 profit/day). The first payout is **capped at the profit you carry to live** (the account's profit target) → effective range **$1,000 – $6,000** by size. **Sim profit above the target is forfeited** at carryover.
- **Subsequent payouts:** **no cap, any amount, any day** (including Day 1 of the cycle).
- **Min / Max:** no minimum, no cap. **Withdrawing 100% ends live-funding eligibility** — Purdia suggests leaving a buffer (~40% at a time).
- **Methods:** **USD only** via ACH / Wise / wire. **No crypto, no PayPal.**
- **Processing:** approved **≤24h**; received in **1–3 business days**.
- **Static Instant specifics:** 90-day window; monthly purchase limits (≈40/mo on 100K, 25/mo on 150K); per-day minimums ($300 on 100K, $500 on 150K).

---

## Evaluation rules
- **Beginner:** 2-step, $1,000/step target, micro-only, free reset once/day in Step 1, 0% consistency.
- **EOD:** 1-step, EOD trailing drawdown.
- **Pro:** 1-step, intraday trailing drawdown; sim-funded stage requires 5 days of $200+ profit.
- Min 5 trading days to pass; positions flat by 3:45 PM CT.

---

## Trading rules
- **Allowed:** news trading, DCA / scalping, copy trading (monitored), semi-automated tools & copiers (active monitoring).
- **Prohibited:** fully automated / set-and-forget systems; overnight/weekend holding.
- **Consistency rule:** 0% on every account.
- **Live funding path:** genuine live Tradovate brokerage accounts + a dedicated risk manager once funded.

---

## Restricted countries
- **US residents + 50+ countries banned.** (Surfaced on the Restricted Countries tab. Eligibility by residency; re-verify the list against purdia.com/knowledgebase/prohibited-countries.)

---

## Comparison table (Overview tab) — Purdia vs Topstep vs Alpha Futures
| Metric | Purdia (featured) | Topstep | Alpha Futures |
|--------|-------------------|---------|---------------|
| $50K eval fee | $179 → $125 / mo | $165 → $85 | $79 → $59 |
| Profit split | 90 / 10 | 90% (100% first $10K) | 90 / 10 |
| Days to payout | Daily (once live) | 5 days | 5 days |
| Drawdown type | EOD · Intraday · Static | EOD Trailing | EOD Trailing |
| Max funded accounts | 3 | 5 | 5 |
| Instant funding option | Yes | No | No |
| **CPF score** | **4.9** | **4.8** | **4.9** |

---

## Editorial scoring rubric (Overview "How we scored it")
| Criterion | Score |
|-----------|-------|
| 💰 Pricing & Value | 4.8 |
| 📊 Profit Split | 4.8 |
| ⚡ Payout Speed | 5.0 |
| 📜 Trading Rules | 4.9 |
| 🛠 Platforms & Tools | 4.8 |
| 🤝 Customer Support | 4.9 |

---

## Accounts (comparison view) & Payouts card rows — uniform schema
*The left column (labels) is fixed and identical across firms for easy comparison; the right column is the dynamic per-firm/per-product value. Rows are generated in JS from row schemas, so the Evaluation and Funded toggles can show different rows.*

**Evaluation toggle** (buttons = Account Size + Price): Evaluation Steps · Profit Target · Total Drawdown · Daily Loss Limit · Days to Pass · Consistency Rule · Max Contracts (per-size count) · Max Accounts · Account Resets · Activation Fee · News Trading · Bots / Algo Trading.

**Funded toggle** (buttons = Account Size + Price): Max Payout · Profit Target · Total Drawdown · Daily Loss Limit · Days to Payout · Consistency Rule · Contract Scaling Plan (Yes/No) · Max Accounts · Account Resets · Profit Split · News Trading · Bots / Algo Trading.

**Payouts tab** (buttons = Account Size + Max Payout): Max Payout · Max Payout (Subsequent) · Minimum Payout · Profit Target · Withdrawal Buffer · Total Drawdown · Daily Loss Limit · Days to Payout · Profit / Trading Day · Consistency Rule · Profit Split · Per Request · Payout Frequency · Processing Time.

**Purdia values used in these rows:** Max Contracts shown as the **per-size contract count** (Beginner 5/10 micros · EOD/Pro 5–10 minis · Instant 2–10 minis · Static 3–5 minis); Contract Scaling Plan **No**; Consistency **0%**; Max Accounts **Up to 3**; News Trading **Yes**; Bots/Algo **Semi-auto**; Account Resets eval **Yes — $99** (Beginner free in Step 1; Instant/Static **No**), funded **No**; Activation Fee eval **$130** (Instant/Static **$0**); Days to Pass **5 days** (Beginner 5/step); Days to Payout **10 days**; Profit/Trading Day **$200/day** (Static 100K **$300**, 150K **$500**); Min Payout **No minimum**; Subsequent **No cap**; Withdrawal Buffer **Breakeven + $100**; Per Request **Up to ~40% (rec.)**; Frequency **Daily (once live)**; Processing **≤24h**. Max Payout / Profit Target / Total Drawdown / Daily Loss Limit are per size (see the per-size tables above).

> **Cornerstone note:** this row schema is a deliberate, documented evolution of the comparison/payout cards. It should be propagated to `cpf-tradeify.html` and the other firm pages so the comparison experience stays uniform site-wide.

---

## Open flags (verify before publish / unilateral edits avoided)
1. **Hero rosette still shows 5.0** while the comparison table + rubric average ~4.9. Decide whether to drop the hero score (and pullquote "top score") to 4.9.
2. **Sale end date** "6/30/26" is format-matched to the cornerstone, not confirmed against purdia.com.
3. **Trustpilot 4.5 / 64** is the sidebar figure — not independently re-verified.
4. **NinjaTrader** as a third platform is plausible but only **Tradovate + TradingView** are explicitly named on purdia.com.
5. **Copy trading** is shown as "Allowed (monitored)"; at least one third-party source says copying *from other traders* is restricted — re-verify if a stakeholder questions it.

---

## Sources
purdia.com (homepage, /evaluation, /instant, /static-instant-funding) and knowledgebase articles: payouts, scaling-plan, daily-loss-limit, max-drawdown, instant-funded-accounts, static-ifa, temp-sfa, multiple-accounts, beginner-evaluation, pro-evaluation, what-when-can-i-trade. CEO confirmed via Crunchbase / LinkedIn / @jonasatia. Promo codes (IMAN 30%, CORE200 $200-off 50K) confirmed via ImanTrading + coupon trackers.
