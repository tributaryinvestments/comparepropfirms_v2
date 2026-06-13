# TradeDay — Content Map & Data Reference
*Single source of truth for the ComparePropFirms.com TradeDay review page. Verified against tradeday.com and tradeday.freshdesk.com (Jun 2026).*

---

## ⚠️ Critical accuracy note — "TradeDay 2.0" vs. the help center
TradeDay relaunched as **"TradeDay 2.0 — the next evolution of prop trading"**. The **homepage (tradeday.com) is the current source of truth** for account specs, pricing, funded rules, and payout splits. **The Freshdesk help center has NOT fully caught up to 2.0** — several articles still describe the legacy model:
- Legacy payout article (Aug 2025) = lifetime split tiers **80% / 90% / 95%** + a **buffer zone** (50% split on buffer funds). **2.0 homepage** shows a per-account model instead: Quick Pay **80/20 above $4k net, 50/50 below**; Fast Pass **80/20**; **Funded Live = 90/10** (the page shows "80/20 → 90/10 Live").
- Legacy **$5k milestones** ($5k→$20k, profits above forfeited). **2.0 homepage** lists **"Milestones: None"** on both Quick Pay and Fast Pass funded.
→ **Page uses the 2.0 homepage model.** Where the help center is still current (drawdown mechanics, prohibited practices, restricted countries, platforms, company facts, evaluation objectives), those articles are used. **Re-verify payout split + milestones against tradeday.com before publishing** in case the help center is updated.

---

## Company
- **TradeDay LLC** — futures trading-education & trader-evaluation firm. Founded **2020**, registered **Illinois, USA**; also a **UK presence**.
- HQ: **2nd Floor, 412 S. Wells, Chicago, Illinois 60607.** © 2026.
- Co-founders: **James Thorpe** and **Steve Miley** (~60 yrs combined trading/futures experience).
- Payout/onboarding partner: **Riseworks** (KYC/AML at funding).
- Not regulated (evaluation service); trades only **CME Group** products on regulated venues via regulated brokers.
- Support: support@tradeday.com (24/7). Discord community ~**15,000**.
- **Positioning line:** "We fund futures traders." / "The next evolution of prop trading."
- **Promo:** site-wide **50% OFF**; code **"TDNEW"** (for best pricing). No separate promo-code gate needed — 50% is already reflected in displayed prices.
- **CPF editorial score (this page): 4.3/5** *(CONFIRMED by Jered. Hero rating ★★★★☆ 4.3.)*

---

## Stats / trust signals (homepage)
- **$10M+ verified payouts** · **1000s** of funded traders · **6+ years** in operation · **15,000** trader community.
- **Trustpilot ~4.6/5** ("Excellent", 1000s of reviews). Also cited: PropFirmMatch 4.8, Google 4.9. *(Use the honest Trustpilot 4.6 as the headline external rating.)*
- **Evaluation pass rate: 36%** (Jan 2026 – Jun 2026, per site disclaimer).

---

## The journey (3 stages)
1. **Evaluation** — simulated, monthly subscription. Hit the profit target + objectives without breaching Max Drawdown.
2. **Funded Sim** — simulated funded account; earns **real payouts** (day one on Quick Pay). Reviewed for a move to Live.
3. **Funded Live** — real capital. Move is at TradeDay's discretion (legacy route: review at withdrawal milestones / performance).

- **Canada (outside Ontario) & Germany:** eligible for **Funded Sim only** (no Funded Live); may remain in Funded Sim indefinitely.

---

## PRODUCT LINEUP — three variants per size (the 3 card columns)
TradeDay 2.0 sells two account types across two drawdown calcs. The page maps the **three live SKUs per size** to the template's three slots:

| Slot key (internal) | Card-view title | Toggle label | Account type | Funded drawdown calc |
|---|---|---|---|
| `growth` | **Quick Pay** | Quick Pay (Intraday) | Quick Pay | Intraday trailing |
| `select` | **Quick Pay — EOD** | Quick Pay (EOD) | Quick Pay | EOD trailing (intraday on funded) |
| `lightning` | **Fast Pass — EOD** | Fast Pass (EOD) | Fast Pass | EOD trailing |

**Hero lead price = $62.50** (50K Quick Pay Intraday, 50% off $125; card shows "$62").

---

## Pricing (50% off — base → discounted; monthly subscription; NO activation fee on any plan)
| Size | Quick Pay Intraday | Quick Pay EOD | Fast Pass EOD |
|------|--------------------|---------------|---------------|
| 50K  | $125 → **$62**  (reset $60)  | $175 → **$87**  (reset $85)  | $180 → **$90**  (reset $89)  |
| 100K | $230 → **$115** (reset $110) | $285 → **$142** (reset $135) | $320 → **$160** (reset $140) |
| 150K | $350 → **$175** (reset $165) | $395 → **$197** (reset $195) | $480 → **$240** (reset $225) |

- **No activation fee** on any plan (unlike Topstep). Monthly subscription only.
- Resets ("retake") = the per-plan reset price above; or a **free courtesy reset** at the next subscription renewal.
- **TradeDay CoPilot:** members-area / resources only (no funding), from **$24/mo**.
- Data feed: **CQG** (included). TradingView/Jigsaw free to connect but require your own license.

---

## Per-size specs (identical across all three variants)
| Size | Profit Target | Max Drawdown (trailing) | Position limit |
|------|---------------|-------------------------|----------------|
| 50K  | $3,000 | $2,000 | 5 contracts (50 micros) |
| 100K | $6,000 | $3,000 | 10 contracts (≈100 micros) |
| 150K | $9,000 | $4,500 | 15 contracts (≈150 micros) |

*Note: site cards literally print "(50 Micros)" on the 100K & 150K rows — appears to be a copy/paste error; logical 10:1 micro equivalents are 100 & 150. Page uses 5/10/15 contracts as the unambiguous figure.*

**Drawdown mechanics (help center, current):** three calc types —
- **Intraday trailing** — trails off intraday equity highs (incl. unrealized).
- **End of Day (EOD) trailing** — trails off the end-of-day closing balance only.
- **Static** — fixed floor set at account creation, never moves (e.g. 50K Static = $500 → floor $49,500).
- Trailing limits **trail up with new highs and lock once they reach the starting balance**; from then the account may not close below the starting balance.
- Enforced **in real time** on realized + unrealized P&L; touching the limit with an open position = liquidation / fail.

---

## Objectives & rules (Evaluation)
- **ONE hard rule:** do not hit/exceed the **Maximum Drawdown**.
- **Objectives:**
  - Trade a **minimum number of days** — **5 days** (Quick Pay) / **3 days** (Fast Pass).
  - Reach the **profit target** (net).
  - **Consistency** — no single day greater than **30%** (Quick Pay) / **45%** (Fast Pass) of total profit.
- Stay within permitted times, permitted products (CME), and position limits. Accidental breaches aren't auto-fails; abuse loses the account.
- Fail → retake via paid **reset** or free courtesy reset at next renewal.

---

## Funded rules & payout model (2.0 homepage = authoritative)
**Quick Pay (Intraday & EOD) — Funded Sim:**
- Profit split **80/20 above $4k net profit; 50/50 below** $4k. (**Funded Live: 90/10**.)
- **Min days to payout: 1** (day-one payouts). Must first clear the **buffer** (starting balance + Max DD = **$52,000 / $103,000 / $154,000**); above buffer = 80/20, into the buffer zone = 50/50.
- **Max payout per request: NO cap** — withdraw any positive balance above the buffer. **No consistency** rule on funded.
- Min payout request **$250**. Full position limit (5/10/15 contracts).
- Funded Sim review/milestone every **$5k gross up to $20k**; Live transition discretionary (often after the **3rd withdrawal**).

**Fast Pass (EOD) — Funded Sim:**
- Profit split **80/20** (**Funded Live: 90/10**). Graduates to Funded Live on the **5th payout request**.
- **Min days to payout: 5**; **min profitable days: 5 × $150 (50K) / $200 (100K) / $250 (150K)**.
- **Max payout per request: ≤50% of balance AND capped by tier — $2,000 (50K) / $2,500 (100K) / $3,000 (150K)**. No buffer requirement; balance must be above the starting balance with net profit since last payout.
- **Scaling position limit:** starts **2 / 3 / 4 contracts** (≈20/30/40 micros), **+1 contract per $2,000 of EOD profit** (max 5/10/15). No milestones, no consistency.

**Shared funded rules (help center, current):**
- Same single rule as eval (don't breach Max Drawdown). Funded account mirrors the eval account (drawdown not changed on funding).
- Funded traders may **not trade within 2% of a price limit** (loses the account).
- Lose a funded account with a positive balance → keep eligible profits (after split) **except**: profits from tier-1 data-release trading, breaches of permitted times, prohibited-practice breaches, or simulated-only profits.

---

## Payout policy & fees
- **Min payout $250.** Requests received **before 5:30 PM CT** processed within **24 hours** (business days).
- Paid via **Riseworks**: **Bank wire** (US **free**, International **$15**) or **Crypto** (**L1 $2.50 + gas**, **L2 free**). Country/bank legislation may add fees.
- Tax/onboarding: KYC + AML at funding; proof of address + government ID required.
- *(Legacy buffer-zone + 80/90/95 lifetime tiers exist in the old help article — superseded on the 2.0 homepage by the per-account model above. Flag to verify.)*

---

## Trading rules / allowed & prohibited
- **Allowed:** futures (CME/CBOT/NYMEX/COMEX & micros), **multiple accounts**, **copy trading** (own accounts), DCA/averaging. Scalping allowed within the scalping policy.
- **Prohibited practices:** third-party trading bots/ATS (or shared bots); spoofing/layering & CME-prohibited conduct; **HFT scalping (>200 trades/day)**; order splitting (multiple same-price orders at once); exploiting gapped/illiquid markets for stray fills; **trading Tier-1 news/data releases** (NFP, FOMC, CPI, GDP, EIA — positions auto-liquidated 2 min before/after; profits forfeited; eval & funded); exploiting sim slippage; trading outside best bid/offer; slow/external data feeds; opposite positions / **hedging across accounts** (prohibited); multiple usernames/emails; **VPN/VPS/IP masking**; trading within **2% of a price limit**.
- All first payouts run through a security review; profits from prohibited practices are confiscated.

---

## Platforms
- **Tradovate** — primary all-in-one (Mac/Win/iOS/Android), **CQG** data feed.
- **NinjaTrader** — free NT8 provided (CQG feed), fully integrated with Tradovate; or use own Multi/Single-broker license (no commission reduction). NinjaTrader's own mobile app does NOT work with eval.
- **TradingView** — free to connect to Tradovate; **own TradingView license required**.
- **Jigsaw** — free to integrate with Tradovate; **own LIVE Jigsaw license required**.

---

## Restricted / prohibited countries
*Official: help.topstep… no — TradeDay article 103000123294. Eligibility by **citizenship AND residency**; min age 18.*

**Not eligible (citizen OR resident — ~73):**
Afghanistan, Albania, Algeria, Angola, Balkans, Barbados, Belarus, British Virgin Islands, Bosnia & Herzegovina, Botswana, Bulgaria, Burkina Faso, Burundi, Cameroon, Cayman Islands, Central African Republic, Côte d'Ivoire (Ivory Coast), Crimea Region of Ukraine, Croatia, Cuba, DPRK (North Korea), DR Congo, Ecuador, Ethiopia, Ghana, Gibraltar, Guam, Guyana, Haiti, Iceland, Indonesia, Iran, Iraq, Jamaica, Jordan, Kosovo, Lao PDR, Lebanon, Liberia, Libya, Macedonia, Magnitsky (list), Mali, Malta, Mauritius, Monaco, Mongolia, Montenegro, Morocco, Mozambique, Myanmar (Burma), Namibia, Nepal, Nicaragua, Nigeria, Pakistan, Panama, Papua New Guinea, Philippines, Puerto Rico, Romania, Russia, Senegal, Serbia, Slovenia, Somalia, South Africa, South Sudan, Sri Lanka, Sudan/Darfur, Syria, Tanzania, Trinidad & Tobago, Tunisia, Uganda, Ukraine*, US Virgin Islands, Venezuela, Vietnam, Yemen, Zimbabwe.

- **Ukraine:** no new onboarding (Riseworks limitation); existing users may withdraw crypto only.
- **Conditional — Canada (outside Ontario) & Germany:** **Funded Sim only**, no Funded Live; may remain in Funded Sim indefinitely. TradeDay may offboard elevated-risk accounts (eligible profits paid per policy). *(Germany added per Jered's site review — confirm in final pass.)*

---

## Overview comparison table — TradeDay vs Topstep vs Tradeify (TradeDay featured)
| Metric | TradeDay (featured) | Topstep | Tradeify |
|--------|---------------------|---------|----------|
| 50K entry | $125 → **$62**/mo | $95 → $85/mo | $145 → $87 |
| Activation | **$0 (none)** | $149 or $0 | One-time |
| Split | 80/20 → 90/10 Live | 90/10 | 90/10 |
| Days to payout | **1** (Quick Pay) | 5 winning days | 1–5 |
| Drawdown | Intraday / EOD / Static (choose) | EOD trailing (locks) | EOD trailing |
| Max funded | Multiple | Up to 5 | 5 |
| Instant funding | No | No | Yes (Lightning) |
| CPF score | 4.3 | 4.9 | 5.0 |

---

## Rubric (Overview scoring breakdown) — CONFIRMED, avg 4.3
Pricing & Value **4.5** (90%) · Profit Split **3.8** (76%) · Payout Speed **4.7** (94%) · Trading Rules **4.2** (84%) · Platforms & Tools **4.2** (84%) · Customer Support **4.4** (88%) → overall **4.3**.
(Profit Split is the main drag: 80/20, and only 50/50 below $4k net on Quick Pay, vs the 90/10 norm.)

---

## Locked / proposed design decisions
1. **Base template = the canonical cornerstone** (`cpf-tradeify.html`) — fully de-Alpha'd. 3 columns + Eval/Funded phase toggle + 9 tabs. (The legacy per-card "pricing toggle" has been removed.)
2. **Color = site-standard ORANGE** (`--orange #F39200` light / `#ff9f2e` dark). Do NOT recolor (TradeDay's purple/red brand is ignored — every CPF firm page shares orange).
3. **Hero lead price = $62.50.** Hero monogram = **"TD"** tile (no image). **Jigsaw platform icon = the uploaded blue puzzle-piece image** (embedded PNG data URI; `logo` + `chip:true` on the `jigsaw` PLATFORMS entry).
4. **No activation fee** anywhere (key differentiator vs Topstep).
5. **Phase toggle chrome:** "Evaluation" / "Funded" for nav/pills; firm terms "Funded Sim" & "Funded Live" preserved in prose.
6. **Promo:** "50% Off" framing + code **TDNEW** pill (replaces Alpha's promo-code pill); no "no promo code" framing (TradeDay does have a code).
7. **3 sizes: 50K / 100K / 150K.**
8. Comparison table = TradeDay (featured) vs Topstep vs Tradeify.

---

## Round 2 changelog (this revision)
- **Rulebook modal (full playbook)** rewritten to match TradeDay (was carrying Tradeify/Alpha values). Fixes: Bot/Algo → **Conditional** (own algos OK; third-party/purchased bots & >200 trades/day HFT prohibited); Copy trading = own accounts; Drawdown **Intraday / EOD**; **No daily loss limit**; Consistency **30% / 45% (eval only)**; Max Accounts **Up to 6 (3 Sim + 1 Live)**; First payout **from day 1 / any profit ($250 min)**; Max per request **QP no cap / FP 50% & $2k–$3k**; **VPN/VPS Not Allowed**; Resets **all plans $60–$225**; Scaling **Fast Pass only**; Min trading days **3–5**; Monthly fee **$62–$240/mo (no activation fee)**. Quick Rule Facts side panel + CTA corrected (split “up to 90%”).
- **Modal layout:** 3-col → **2-col**; the right sidebar (Quick Rule Facts + CTA + Last-Updated) **moved under the left column**; **Section 7 (FAQs) removed**; **redundant Need Help removed** (one kept).
- **Rules tab:** removed the **Platforms** rule-item; corrected Min Trading Days (**3–5 days**) and Monthly Fee (**$62–$240/mo, monthly subscription**); Scaling note clarified (Fast Pass scales).
- **Accounts tab:** removed the non-functional **“50% Off / Code TDNEW”** toggles + their reserved whitespace; **account sizes now full-width** (grid `repeat(3,1fr)`, kills right deadspace); the **Funded phase toggle now shows max payout per size** instead of price (Quick Pay = **No cap**; Fast Pass = **$2,000 / $2,500 / $3,000**). Card-view “payouts by size” corrected to the same model (Quick Pay = no per-request cap, day-one, no min winning days/DLL; Fast Pass = 5 winning days, $150–$250/day, $2k–$3k caps).
- **Jigsaw** platform now renders the uploaded blue puzzle-piece image throughout.
- **Restricted countries:** **Germany** added to the Canada-outside-Ontario Conditional (Funded-Sim-only) tier.
- **Open flags for final review:** (a) Germany's conditional status added per site review — reconfirm wording/scope; (b) hidden card-view “Standard +$149 / No Activation Fee” toggle still in code (`display:none`, not user-visible) — inaccurate (no activation fee) but harmless; (c) comparison-table competitor Activation cell “$149 or $0” left as competitor data; (d) funded-account drawdown: some third-party sources say EOD-eval → Intraday-funded — page keeps the help-center “mirrors eval” model; (e) CPF score on page = **4.3**.

---

## Round 3 changelog (this revision)
- **News trading → NOT ALLOWED** sitewide. TradeDay auto-liquidates all open positions 2 min before & 2 min after Tier-1 data releases (NFP, FOMC, CPI, GDP, EIA), on **both eval and funded**, and **forfeits** profits from those trades (official help-center articles 103000063272 / 103000018874 / 103000081072). Updated: overview “Allowed” pill removed + new “No Tier-1 news trading” watch-out; pros-list line reworded; accounts card-view Trading row; rules-summary; main Rules tab item (+note); modal card; modal Quick-Rule-Facts side row.
- **Page logo:** hero monogram “TD” replaced with the uploaded **TradeDay wordmark** (embedded PNG data URI; navy #253141 tile, object-fit contain).
- **Tradable Products** rule-item added to the Rules → Other Policies group (Futures Only · “CME Group futures & micros”), refilling the 5-column grid left lopsided when Platforms was removed. Monthly Fee no longer spans two cells.
- **Accounts-tab Profit Split** headline standardised to **80% / 20%** (chevron, quick-facts, card-view payouts, modal side) since most traders remain in Funded Sim; 90/10-on-Live kept as context in `splitFull`, prose, and the qf sub-line (“50/50 below $4k · 90/10 on Live”).
- **Payouts chevron (Fast Pass)** changed from the confusing “Scaling” to **“After 5 days”** (first payout needs 5 profitable days).
- **Account resets = evaluation only**: modal card + `accountReset` values now read “Eval only · $60/$85/$89”; funded accounts cannot be reset.
- **“Min Trading Days” (Rules tab)** set to **1–5 days** per Jered (note: Quick Pay pays from day 1; Fast Pass needs 5; the **evaluation** minimum specifically is 5 Quick Pay / 3 Fast Pass).
- **Trading-rules sub-tab:** “cross-account hedging / DCA” → **“Martingale / DCA”** (fixes an inaccuracy — cross-account hedging is prohibited, whereas Martingale/DCA aren’t). Also corrected **VPN / VPS Usage** from “Allowed” to **“Prohibited”** (was contradicting the rest of the page).
- **“TMD” jargon removed** from all Max Loss values (“$2,000 Intraday TMD” → “$2,000 Intraday”; “EOD TMD” → “EOD”), and **accounts card-view stat values right-aligned** (`.cd-block-row .value`) to match the evaluation section.
- **Card-view product naming finalised:** titles are **“Quick Pay” / “Quick Pay — EOD” / “Fast Pass — EOD”** (JS `name` fields, which also drive the “About …” heading and FAQ heading via `setText`); toggle buttons read **“Quick Pay (Intraday)” / “Quick Pay (EOD)” / “Fast Pass (EOD)”**.
- **⚠ Max accounts flag:** Jered asked for **5**, but TradeDay’s **own help center (two articles, updated 2026) says up to 6 total** (max 3 active Funded Sim + 1 Funded Live, single-platform). Kept/standardised at **“Up to 6”** everywhere — **please reconfirm**; if the live site truly shows 5 I’ll switch.

---

## Sources
tradeday.com (homepage / pricing / FAQ / footer); tradeday.freshdesk.com articles: 103000008676 (what is TradeDay), 103000008847 (eval objectives/rules), 103000008855 (max drawdown), 103000008889 (funded rules), 103000335937 (Quick Pay payout policy / buffer table), 103000404096 (Fast Pass payout policy), 103000008898 (payment methods), 103000123294 (prohibited countries), 103000121031 (prohibited trade practices), 103000008813 (platforms), 103000353468 (funded sim milestones / route to live). Riseworks: help.riseworks.io.

## Round 4 changelog (uniform comparison rows + payouts list)
**Accounts → Comparison view** is now two phase-specific row-blocks (left label static, right value dynamic per product & size; data engine = `ACCOUNT_DATA` → `data-field`). The Funded toggle now keeps the **price** pills (the old price→max-payout pill swap is retired); **Max Payout is a funded row**.

- **Evaluation rows (12):** Evaluation Steps `1 Step` · Profit Target `$3,000/$6,000/$9,000` · Total Drawdown `$2,000/$3,000/$4,500` · Daily Loss Limit `None` · Days to Pass `5 days` (QP) / `3 days` (FP) · Consistency Rule `30%` (QP) / `45%` (FP) · Max Contracts `5/10/15` · Max Accounts `Up to 6` · Account Resets `Yes · $60/$85/$89` · Activation Fee `$0` · News Trading `No · Tier-1 lockout` · Bots / Algo Trading `Semi-auto`.
- **Funded rows (12):** Max Payout `No cap` (QP) / `$2,000/$2,500/$3,000` (FP) · Profit Target `No target` · Total Drawdown `$2,000/$3,000/$4,500` · Daily Loss Limit `None` · Days to Payout `1 day` (QP) / `5 days` (FP) · Consistency Rule `None` · Contract Scaling Plan `No` (QP) / `Yes` (FP) · Max Accounts `Up to 6` · Account Resets `No` · Profit Split `80% / 20%` · News Trading `No · Tier-1 lockout` · Bots / Algo Trading `Semi-auto`.

**Payouts tab** (top-level) is now a uniform **11-row** per-size list driven by `PAYOUT_DATA` → `data-payout-field`; size pills already show the max-payout amount:
- Max Payout · Max Payout (Subsequent) · Minimum Payout `$250` · Profit Target `No target` · Withdrawal Buffer (QP `$52,000/$103,000/$154,000`; FP `No buffer`) · Total Drawdown `$2,000/$3,000/$4,500` · Daily Loss Limit `None` · Days to Payout (QP `1 day`; FP `5 days`) · Profit / Trading Day (QP `None`; FP `$150/$200/$250`) · Consistency Rule `None` · Profit Split `80% / 20%`. (Max Payout & Subsequent are equal for TradeDay — neither phase caps the first payout differently.)

**Judgment calls (confirm if needed):** funded *Profit Target* = "No target" (the spec said "Dollar Amount" but funded accounts have no target); funded *Profit Split* rendered as % (the spec's "$0 (No)/Amount (Yes)" was an Activation-Fee copy-paste); *Total Drawdown* shown as a clean $ amount (the intraday-vs-EOD trailing type is conveyed by the product name/sub and Rules); *News Trading* value = "No · Tier-1 lockout"; *Bots* = "Semi-auto" (own algos OK, third-party prohibited); *Max Contracts* shows the max 5/10/15 (Fast Pass start-2/3/4 scaling is captured by the funded "Contract Scaling Plan: Yes" row).
