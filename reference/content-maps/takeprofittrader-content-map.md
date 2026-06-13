# Take Profit Trader — Content Map
**File:** `cpf-takeprofittrader.html` · **Built from:** Topstep template · **Cornerstone reference:** `cpf-tradeify.html` (master)
**As of:** current build (~6,503 lines). Line numbers are anchors at time of writing and will drift after edits.

> **Status:** The original `‹VERIFY›` figures (the page was first built from third-party data while takeprofittrader.com was blocked) have been reconciled against the live site and the owner's corrections. Remaining unconfirmed items are listed in §10. Earlier `‹VERIFY›` tags have been removed from the body of this map except where a value is still owner-dependent.

---

## 1. Firm model (single product)
Take Profit Trader sells **one account product** (no second account, no Standard/No-Fee type toggle).

- **Promo (always-on):** code **NOFEE30** → **30% off** the monthly fee **+ $0 activation**.
- **Without promo:** list monthly price **+ $130 activation**.
- **Hero promo line:** follows the cornerstone two-part pattern — `cta-meta` = *"June Sale Ends 6/30/26"* (date only), then `cta-meta-row` = plain label *"Use Promo Code:"* + `promo-code-pill` containing only the code *NOFEE30* (a "|" separator joins them inline on wider screens via `.cta-meta-row::before`).
- **Phase model:** **Test** (evaluation, 1 step, 5 trading-day minimum, 50% best-day consistency) → **PRO** (sim-funded, **80/20** split, **intraday** trailing drawdown) → **PRO+** ("Live", **90/10** split, **EOD** drawdown, via Tradovate).
- **Test → PRO** on passing the Test. **PRO → PRO+** after accumulating **~$5,000** of profit (no extra buffer is required once promoted — see §4).
- **Drawdown:** EOD trailing in Test → **intraday** trailing in PRO → **EOD** in PRO+; **locks at start**.
- **No Daily Loss Limit** (removed firm-wide Jan 2025).
- **No scaling plan** — full contract limit available from day one (see §6).
- **No consistency rule on funded accounts** (the 50% rule applies during the Test only).
- **Copy trading is ALLOWED** (owner decision). Bots/algos are **not** allowed; news trading is **restricted** on PRO. Hedging and Martingale/DCA are allowed.
- **PRO (funded) account resets:** if a **PRO** funded account hits the Max Trailing Drawdown, a reset **skips the evaluation and returns you to funded status** — **max 3 resets per PRO account**. **PRO+ accounts cannot be reset.** Per-size reset price: 25K **$449** · 50K **$649** · 75K **$799** · 100K **$999** · 150K **$1,499** (JS `RESET_PRICES`). *(Distinct from a Test reset during evaluation, which is priced at the monthly fee.)*

### Sizes & per-size figures (5 sizes everywhere)
| Size | Profit Target | Max Trailing DD | **Buffer (= DD + $100)** | Contracts (mini · micro, 10:1) | List monthly | Promo (30% off) |
|------|--------------:|----------------:|-------------------------:|:------------------------------:|-------------:|----------------:|
| 25K  | $1,500 | $1,500 | **$1,600** | 3 · 30   | $150 | $105    |
| 50K  | $3,000 | $2,000 | **$2,100** | 6 · 60   | $170 | $119    |
| 75K  | $4,500 | $2,500 | **$2,600** | 9 · 90   | $245 | $171.50 |
| 100K | $6,000 | $3,000 | **$3,100** | 12 · 120 | $330 | $231    |
| 150K | $9,000 | $4,500 | **$4,600** | 15 · 150 | $360 | $252    |

Hero leads with **50K @ $119**. The **buffer to clear before withdrawing = Max Trailing DD + $100** (e.g. 50K: $2,000 DD → reach $52,100).

---

## 2. Tabs (top nav) & panels
9 panels. Default account view = card view ("Comparison View" / "Card View" toggle on Accounts).

| # | Tab | Panel id | Notes |
|---|-----|----------|-------|
| 1 | Overview | `panel-overview` | Hero strip, rubric, instrument/feature pills, comparison table, bottom-line callout |
| 2 | Accounts | `panel-accounts` | Comparison View + Card View (7 sub-tabs) |
| 3 | Rules | `panel-rules` | Rule groups incl. Scaling Plan row |
| 4 | Payouts | `panel-payouts` | Buffer model, PRO/PRO+ toggle |
| 5 | Platforms | `panel-platforms` | 13 platforms (matches master exactly) |
| 6 | Reviews | `panel-reviews` | Trustpilot summary + sample reviews |
| 7 | Expert Review | `panel-expert` | CPF editorial verdict |
| 8 | Restricted Countries | `panel-restricted` | 57 countries, single tier |
| 9 | General FAQ | `panel-faq` | Firm-wide FAQ |

### Card-view sub-tabs (7)
`overview → evaluation → rules → funded → scaling → payouts → faq`
Chrome labels: Overview · Evaluation Steps · Trading Rules · Funded Phase · Scaling Plan · Payouts · Product FAQ.

---

## 3. Accounts tab
- **Comparison View** and **Card View** toggle.
- Single product → Accounts and Payouts cards are centered via inline `grid-template-columns: minmax(0,560px); justify-content:center;`.
- Card title **"Take Profit Trader"** — the word "Account" was dropped from all three cards (card view, comparison view, and the Payouts card) for consistency and to fit mobile. Tag **"30% Off · $0 Activation"**. On mobile (≤760px) the title stays on one line and the promo pill drops below it.
- Card-view stat-flow header: Monthly (Test) · Profit Split 80→90% · Profit Target · Max Loss (Trailing Max DD) · Payouts (Day one) · Max Accounts (**Up to 5**).
- **Card view — corrected values:** Copy Trading = **Allowed** (overview "Trading" block and Trading-Rules sub-tab; the "Allowed" rows auto-float to the top of the rules-summary card). Funded sub-tab **Min Trading Days = None** and **Consistency = None** (no "(day one)"/"(funded)" qualifier). Payouts sub-tab **Consistency = None**.
- **Comparison View — funded phase toggle is now visible** (`.phase-toggle-row`, previously `display:none`). In the **Funded** phase the TPT card shows a **PRO (80% / 20%) / PRO+ (Live) (90% / 10%)** sub-toggle (`[data-cmp-funded-sub]`). The sub-toggle swaps **only the Profit Split**; all other fields are identical between PRO and PRO+. Eval-phase split shows "80% (PRO) → 90% (PRO+)".
- **Comparison-view rows are phase-specific** (rebuilt by `cmpRows(size)` in `updateAccountCard`; left label static, right value dynamic per firm/size):
  - **Evaluation toggle:** Evaluation Steps (1 Step) · Profit Target ($) · Total Drawdown ($ trailing) · Daily Loss Limit (None) · Days to Pass (5 days) · Consistency Rule (50%) · Max Contracts (3/6/9/12/15 minis) · Max Accounts (Up to 5) · Account Resets (Yes — monthly fee) · Activation Fee ($0 with NOFEE30) · News Trading (Restricted) · Bots / Algo Trading (No).
  - **Funded toggle:** Max Payout (No cap) · Profit Target (None) · Total Drawdown ($ trailing) · Daily Loss Limit (None) · Days to Payout (Day one) · Consistency Rule (None) · Contract Scaling Plan (No) · Max Accounts (Up to 5) · Account Resets (PRO $449–$1,499 · up to 3; **PRO+ = Not available**) · Profit Split (PRO 80/20 ↔ PRO+ 90/10 via sub-toggle) · News Trading (Restricted) · Bots / Algo Trading (No).
- **Account resets** appear in the funded contexts: the card-view **Funded Phase** sub-tab renders an "Account Reset" metric (per-size price, "up to 3 resets per PRO account"), and the comparison-view **Resets** stat row shows the per-size reset price + "· up to 3" when the **PRO** sub-toggle is active, and **"Not available (PRO+)"** when PRO+ is selected (eval phase still reads "Reset = monthly fee").

---

## 4. Payouts tab
- **Buffer model.** Withdraw from **day one** once profit exceeds the buffer (**= Max Trailing DD + $100**); **no minimum days, no payout windows, no caps, no scaling**. You can withdraw **any amount** (no maximum).
- Toggle labels **PRO (80/20)** / **PRO+ (90/10)** (internal `data-mode` keys remain `standard`/`consistency`).
- `payoutCap` field = the **buffer to clear**, shown per size:
  - **PRO (standard / intraday trailing):** $1,600 / $2,100 / $2,600 / $3,100 / $4,600 (= DD + $100).
  - **PRO+ (consistency / EOD trailing):** **"No Buffer"** — promotion to PRO+ requires accumulating **~$5,000 profit**, after which **no further buffer** is needed to withdraw.
- **Consistency = None** in both modes.
- **Payouts-tab rows (14)** driven by `_TS_MODES` (PRO=standard / PRO+=consistency), `payoutCap` + `drawdown` per size: Max Payout (No cap) · Max Payout Subsequent (No cap) · Minimum Payout (No minimum) · Profit Target (No target) · Withdrawal Buffer (PRO $1,600–$4,600 / PRO+ No Buffer) · Total Drawdown ($ trailing) · Daily Loss Limit (None) · Days to Payout (Day one) · Profit / Trading Day (No minimum) · Consistency Rule (None) · Profit Split (PRO 80/20 ↔ PRO+ 90/10) · Per Request (Up to 100%) · Payout Frequency (On request, daily) · Processing Time (≤12 business hrs). Size buttons show the per-size buffer.
- **Withdrawal fee:** **> $250 free / ≤ $250 costs $50.** Approval ≤ **12 business hours**. Methods: **Plaid / Wise / PayPal**. Max Trailing Drawdown resets to $0 after each payout.
- **PRO (funded) account resets** (block on the Payouts tab): reset a **PRO** funded account after a Max-DD breach to skip the eval and return to funded — **max 3 per PRO account; PRO+ cannot be reset** — priced 25K $449 · 50K $649 · 75K $799 · 100K $999 · 150K $1,499.

---

## 5. Platforms tab — matches master (`cpf-tradeify.html`) EXACTLY
**13 platforms**, same order/logos/feeds/tags/flags as the master. Firm-name references rebranded Tradeify → Take Profit Trader.

Feeds: **CQG** (Tradovate, TradingView, NinjaTrader) · **Rithmic** (the other 10). Connection pill shows **CQG · or · Rithmic**.

Order: Tradovate, TradingView, NinjaTrader, WealthCharts, Tradesea, MotiveWave, Bookmap, Sierra Chart, Quantower, R | Trader, Jigsaw Trading, TickBlaze, MultiCharts.

Subtitle: *"13 platforms supported across the CQG and Rithmic data feeds — all included with your account."*
Bottom note (copied from master, **still flagged**): *"Bot trading note: Algorithmic trading is permitted with ownership verification. PickMyTrade webhook integration officially supported."*

**Changed / still-flagged items**
- **WealthCharts "$99/mo value — free" tag pill REMOVED** (the platform's `desc` prose still mentions it's normally $99/mo and included free — trim on request).
- The master's **bot-note** and Tradovate "built-in trade copier" claim: copy trading is now **allowed** for TPT (owner decision), but **bots/algos remain prohibited**, so the bot-note still conflicts and should be reconciled.
- Other perk claims carried from Tradeify, attributed to TPT, unverified: TradingView "Premium Free," NinjaTrader "Free with Take Profit Trader."
- The 13-platform roster itself is Tradeify's — confirm TPT supports all of them.

---

## 6. Scaling — NONE (mirrors master's Growth/Lightning)
Take Profit Trader has **no contract scaling plan**; full contract limit available from day one.

Implementation mirrors how the master treats Growth/Lightning (`hasScaling: false`):
- **Card-view Scaling Plan sub-tab** → clean "No Scaling Plan" block (icon + message); no banner / 3-col / staircase chart / milestone table.
- **Message:** *"Take Profit Trader does not include a contract scaling plan. Your maximum position size is set by your account size from day one (3 / 6 / 9 / 12 / 15 minis)."*
- **Rules tab** "Scaling Plan" row → neutral badge **"No scaling plan"**, note *"Full contract limit available from day one."*
- **Rules & Policies modal** "📈 Scaling Plan" card → neutral **"Not available."**
- Card-view Overview mini-block "📊 Scaling Plan" → *Not available / —*.
- Per-size scaling milestone objects still exist in source but are **unreachable** (render returns early on `hasScaling:false`).

---

## 7. Restricted Countries tab
- **Single tier, 57 countries** (help-center verified).
- **Comparison table:** Take Profit Trader (featured) vs **Topstep** vs **Apex** — confirm competitor cells.
- Policy cards mention KYC / 24–48h windows.

---

## 8. Ratings & firm facts
- **Trustpilot:** 4.4 / ~8,750 reviews.
- **CPF score:** **4.3** (hero `<span class="score">` and the Overview comparison-table TPT column both read 4.3).
- **Rubric (Overview):** Pricing & Value **4.8** · Profit Split **4.0** · Payout Speed **4.9** · Trading Rules **4.0** · Platforms & Tools **4.8** · Customer Support **4.8**.
- **Founded:** Jan 2022 · **HQ:** **Windermere, FL** (founder name intentionally removed).

### Overview pills
- **Allowed:** Futures (CME Group) · Manual Trading · Up to 5 Funded · **Trade Copy**.
- **Watch Outs:** No News Trading · No Bots or Algos · 50% Test Consistency · Intraday Trailing DD (PRO). *("No Trade Copiers" and "Flat by 4:00 PM ET" pills were removed.)*

### Overview comparison table (7 rows)
Featured = Take Profit Trader, vs **Topstep** and **Tradeify**. **Topstep Profit Split = 90% / 10%** (owner-confirmed — Topstep no longer offers a 100% split; the old "90% (100% first $10K)" cell was removed). Remaining Topstep cells still use cornerstone values for internal consistency (differ from Topstep's current public pricing — owner to confirm if those should reflect live Topstep).

---

## 9. Sidebar / chrome
- **At a glance:** Current Promo, Payouts, Max Funded, Account Sizes, Drawdown, Profit Split, Activation Fee.
- **Compare Similar Firms:** **Bulenox · Apex Trader Funding · Trade Day**.
- Expert-review prose references Tradeify/Topstep as comparison firms (intentional).

---

## 10. Outstanding / owner-confirm backlog
1. **Topstep comparison column:** Profit Split is owner-confirmed at **90/10**; the remaining Topstep cells still use cornerstone figures, not Topstep's current live pricing — confirm which is desired.
2. **Platforms:** bot-note + Tradovate copier claim vs TPT policy (copy trading allowed, bots not); "free/included" perks unverified; 13-platform roster is Tradeify's — confirm. WealthCharts "free" still in `desc` prose.
3. **Prose still mentioning flat-by-4:00 PM ET** (pros/cons, expert review, FAQ) after the pill was removed — trim if undesired.
4. **Rules-tab Copy Trading note** currently "Trade copiers permitted" — refine wording if a caveat is needed (own accounts only, specific tool, etc.).
5. Confirm remaining firm facts: founding date, restricted-country competitor cells, PRO→PRO+ ~$5K profit threshold, news-event specifics.

---

## 11. Change log — this session
- Promo code **NOFEE → NOFEE30** sitewide; hero promo line restructured to match the cornerstone — "June Sale Ends 6/30/26 | Use Promo Code: [NOFEE30]" with the date alone on the first line and only the code inside the dashed `promo-code-pill` (removed the redundant inline "Use Promo Code: NOFEE30" text and the "Use code" wording inside the pill).
- Rubric softened (Profit Split → 4.0, Trading Rules → 4.0, etc.); **CPF score 4.7 → 4.3**.
- Watch-out/allowed pills rebuilt; **Trade Copy moved to Allowed**.
- **Copy trading flipped to Allowed** across card overview, card rules sub-tab, Rules tab, and Rules & Policies modal (incl. Quick Rule Facts).
- Rules tab: **Consistency 40% → 0%**; **Max Per Request → No cap**; **Min Trading Days → 5 / None**; First & Subsequent payout notes → "Withdrawals under $250 incur a $50 fee. 80/20 in PRO, 90/10 in PRO+".
- **Buffer = DD + $100** applied to card funded thresholds, payouts tab (PRO amounts), FAQ, payouts prose, and rulebook modal.
- **$50-fee / withdraw-any-amount** language added to payouts overview, payouts sub-tab, and FAQ.
- Comparison view: **phase toggle surfaced** + **PRO/PRO+ funded sub-toggle** added (swaps Profit Split only).
- Rulebook modal: **FAQ section (#mod-7) removed** (broken), plus its top-nav link and TOC entry.
- Payouts tab: PRO buffer amounts **+$100**; **PRO+ = "No Buffer"**; Consistency → **None**.
- Platforms: **WealthCharts "$99/mo value — free" pill removed**.
- HQ Orlando → **Windermere, FL**; all "up to 10 funded" → **5**; Trustpilot harmonized to **4.4/5**; founder name and all `‹VERIFY›` callouts removed.
- Hero logo: replaced the "TPT" text placeholder with the owner's embedded logo (base64 JPEG, black frame); hero tagline trimmed to "Day-one payouts · No daily loss limit".
- Added **PRO (funded) account resets** (skip eval back to funded after a Max-DD breach, **PRO only — max 3 per PRO account; PRO+ cannot be reset**; per-size $449 / $649 / $799 / $999 / $1,499) to the Overview bottom-line, Payouts tab (pricing block), card-view Funded sub-tab (metric), and comparison-view Resets row (`RESET_PRICES`). Reconciled older template statements that wrongly said the PRO/funded account had no reset.
- Hero chevron cards aligned to the cornerstone: green = **$119 / $50K Eval / True Funding Fee** (was "50K w/ code NOFEE30"); orange = **Save up to / 35% / Limited Time Offer** (was "Waived / $130"); middle (Profit Split 80–90%) unchanged.
- Removed **"Account"** from the firm-name title in the card view, comparison view, and Payouts card. Mobile (≤760px): `.ac-title-row` stacks to a column and `.cd-name` wraps so the title sits on one line with the promo pill beneath it.
- Comparison-view size pills made responsive on mobile (`#view-comparison`): the strikethrough `.price-orig` stacks above the green `.price-sale` so all 5 sizes fit one row without overflow (Payouts strip untouched).
- Hero logo replaced with the owner-supplied embedded image; hero tagline trimmed to "Day-one payouts · No daily loss limit".
- **Topstep Profit Split** in the Overview comparison table corrected to **90% / 10%** (was "90% (100% first $10K)"); the bottom-line prose no longer cites a Topstep "100%-first-$10K threshold."
- Restructured the **Comparison-view rows** into distinct **Evaluation** and **Funded** row sets (rebuilt dynamically per phase via `cmpRows`/`CMP_SIZES`), and rebuilt the **Payouts tab** into the agreed **14-row** schema (new `_TS_PAY_*` fields + per-size `drawdown`). Values uniform for cross-firm comparison.
