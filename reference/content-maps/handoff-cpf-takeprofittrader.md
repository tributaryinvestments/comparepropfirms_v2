# HANDOFF — cpf-takeprofittrader.html
Engineering handoff for the Take Profit Trader (TPT) review page on ComparePropFirms.com.
Pair this with `takeprofittrader-content-map.md` (content inventory).

---

## 1. Identity & provenance
- **Deliverable:** `cpf-takeprofittrader.html` — self-contained single-page HTML + inline CSS + vanilla JS. No build system. ~6,503 lines / ~574 KB.
- **Built from:** the Topstep template (`cpf-topstep.html`), then collapsed from two products to one.
- **Cornerstone / master:** `cpf-tradeify.html`. The master is canonical for shared components, design tokens, and structural conventions. Platforms and the no-scaling pattern were aligned to it byte-for-byte where applicable.

## 2. File paths
| Purpose | Path |
|---|---|
| Delivered page | `/mnt/user-data/outputs/cpf-takeprofittrader.html` |
| Working copy | `/home/claude/cpf-tpt.html` |
| Content map | `/mnt/user-data/outputs/takeprofittrader-content-map.md` |
| Master (read-only) | `/mnt/user-data/uploads/cpf-tradeify.html` |
| JS validator | `/home/claude/validate_js.py` (extracts the 3 `<script>` blocks, `node --check` each; expect **3/3**) |

Keep the working file (`/home/claude/cpf-tpt.html`) as the edit target; copy to outputs after each validated change.

## 3. Design tokens (`:root`, light) — keep in sync with master
Fonts: `--sans:"Inter"`, `--serif:"Source Serif 4"`.
Brand orange `--orange:#F39200` (hover `#d97e00`, soft `#fff8eb`, tint `#fde6d7`, deep `#b9531a`).
Green `--green:#2e8654` / check `#16a34a` / bg `#ecfdf5`. Red `--red:#dc2626`.
Gray ramp `--gray-50…900` (`#fafbfc`→`#111827`). `--text:#1a1a1a`, `--border:#e5e7eb`, `--bg-page:#f4f5f8`.
Accents: `--blue:#2554c7`, `--purple:#7c3aed`, `--teal:#0e7490`, `--star:#facc15`.
Slate stat-flow ramp `--ramp-1…6` + `--cf-label:#3f4d63`, `--surface:#fff`.
A second `:root` (dark mode) overrides these (e.g. `--orange:#ff9f2e`, `--green:#34d399`). Dark mode is class-driven on `<html>/<body>`.

## 4. JS architecture (anchors as of this build — will drift)
Single engine of 3 `<script>` blocks; **all 3 must pass `node --check`.** (tiny block ~line 7; main block ~4878–6489; small tail block ~6492–6500.)

**Data structures**
- `PHASE_LABELS` (~4938)
- `ACCOUNT_DATA` (~4943) — comparison-view rows; has `eval` and `funded` phase blocks. Funded `split: '80% PRO / 90% PRO+'` (overridden at runtime by the PRO/PRO+ sub-toggle — see below).
- `compareProgram` (~5009, inert), **`fundedSub` (~5010)** — `'pro' | 'proplus'`, drives the comparison-view Profit Split in the funded phase.
- **`RESET_PRICES` (~5024)** — `{25K:$449, 50K:$649, 75K:$799, 100K:$999, 150K:$1,499}`. Used by `updateAccountCard` (comparison-view Resets row → `price · up to 3` for **PRO**, `Not available (PRO+)` for PRO+) and `renderFundedTab` (card-view "Account Reset" metric card, growth only).
- `SELECT_FUNDED_DAILY` / `SELECT_CAPS` (~5010–5020) — legacy/Select (dead under single-product).
- `CARD_DATA` (~5118) — **live product is `CARD_DATA.growth`**; `CARD_DATA.select` is defined but dead/unused. Funded fields now read `fundedMinDays:'None'`, `consistencyFunded:'None'`.
- `GROWTH_FUNDED` (~5170) — per-size `threshold:'Clear the buffer ($X)'` now **DD + $100** (1,600 / 2,100 / 2,600 / 3,100 / 4,600); `maxPayout:'No cap'`.
- `_EOD_PAY` (~5182) — shared PRO/PRO+ payout policy; step 3 carries the **$50-fee** line; step 1 buffer example uses **$52,100**.
- `CMP_SIZES` + `cmpRows(size)` (near `RESET_PRICES`) — drive the **Comparison-view** stat rows. `updateAccountCard` rebuilds `.ac-stats` innerHTML from `cmpRows`, which returns a **different row set for Evaluation vs Funded** (and swaps Profit Split / Account Resets by `fundedSub`). The old static `[data-field]` rows are gone; rows are now generated.
- `_TS_MODES` / `PAYOUT_DATA` (~6116) — Payouts-tab data, toggled by `data-mode` (standard = PRO, consistency = PRO+). Now carries the **14-row** schema fields (`maxPayout`, `maxPayoutSub`, `minPayout`, `profitTarget`, `daysToPayout`, `profitPerDay`, `consistency`, `split`, `perRequest`, `frequency`, `processing`) + per-size `payoutCap` (Withdrawal Buffer; PRO $ / PRO+ 'No Buffer') and `drawdown`. `renderPayoutCard` fills `[data-payout-field]` generically.
- `PLATFORM_FEED` / `PLATFORMS` (~6280+) — **13 entries, identical to master** (WealthCharts no longer carries the "$99/mo value — free" tag).

**State:** `let cardState = { type:'growth', size:'50K' }`. `scalingProgram` is legacy and inert.

**Functions:** `setText`, `renderCardView`, `updateAccountCard` (~5022, comparison view; contains the funded-phase split override), `rerenderAllAccountCards`, `renderEvaluationTab`, `renderFundedTab`, `renderPayoutsTab`, `renderScalingTab` (early-returns; chart unreachable), `renderFAQTab`, `renderPayoutCard` (~6110), platform renderers (~6450+).

**Auto-float:** a block (~6068) sorts `.rs-badge.allow` rows to the top of each card rules-summary card — so flipping a card-rules row deny→allow also satisfies "move it up."

## 5. Structure conventions
- **Top nav:** 9 panels — `panel-overview, -accounts, -rules, -payouts, -platforms, -reviews, -expert, -restricted, -faq`.
- **Accounts view toggle:** "Comparison View" / "Card View". `#view-comparison` and `#view-card` are both referenced by toggle JS — **do not remove `#view-comparison`.**
- **Comparison-view phase toggle** (`.phase-toggle-row`) is now **visible** (was `display:none`). Eval/Funded switches `phaseState` and toggles the `.phase-eval` class on `.compare-grid`.
- **PRO/PRO+ funded sub-toggle:** lives in the TPT card's `flex-daily-toggle` slot as `[data-cmp-funded-sub]` with `.fd-btn[data-fsub="pro"|"proplus"]`. Shown only in the funded phase (the slot is hidden in eval). Its handler (~5092) sets `fundedSub` and calls `rerenderAllAccountCards()`. `updateAccountCard` then sets `merged.split` to `'80% / 20%'` (pro) or `'90% / 10%'` (proplus). **All other funded fields are intentionally identical between PRO and PRO+.**
- **Card-view sub-tabs (7):** `overview, evaluation, rules, funded, scaling, payouts, faq`. Chrome uses site-standard labels even where TPT terminology differs (PRO/PRO+).
- **Single-product centering:** Accounts & Payouts grids use inline `grid-template-columns: minmax(0,560px); justify-content:center;`. `.ac-sizes` is `repeat(5,1fr)`. On mobile (≤760px) the **comparison-view** size pills (`#view-comparison .ac-size-price`) stack the strikethrough `.price-orig` above the green `.price-sale` and shrink/tighten so all 5 stay in one row without overflow; the Payouts strip is untouched (its pills hold a single short value and already fit). The firm-name title omits the word "Account" in all three cards (card, comparison, Payouts); on mobile `.ac-title-row` stacks to a column and `.cd-name` wraps, keeping the title on one line with the `.ac-tag` promo pill beneath it.
- **Rules & Policies modal** (`#rulebook-modal`): sections **1–6 only**; **section 7 "FAQs" (#mod-7) was removed** (it was non-interactive/broken), along with its `.modal-tabs` nav link and its `.modal-toc-list` entry. The `.modal-faq-link` JS handler (~6255) is null-guarded and now inert; the orphan `.modal-faq-list` CSS is harmless. Scrollspy maps the 6 remaining nav links to the 6 remaining sections.

## 6. Two alignments completed against the master
**Platforms (exact):** the master's 13 logo entries verbatim — order, base64 logos, CQG/Rithmic feeds, tags, flags. Connection pill shows CQG · or · Rithmic. Only deviation: "Tradeify" → "Take Profit Trader" (5 refs), plus the WealthCharts "$99/mo value — free" tag removed.

**Scaling = none:** `TAB_CONTENT` types set `hasScaling:false`; `renderScalingTab` early-returns the "No Scaling Plan" block. Rules row → neutral "No scaling plan"; modal card → "Not available"; overview mini-block → "Not available / —".

## 7. Edit & verification workflow (follow this)
1. **Atomic guarded Python scripts.** Helper `rep(old,new,exp)` asserts `h.count(old)==exp` before replacing; the file is written **only at the end**, so a failed assert leaves it untouched.
2. **Entity vs unicode trap:** HTML stores real unicode (`—` `’` `✓` `🛑`); **JS string source stores escapes** (`\u2014`, `\uD83D\uDCCA`). Match the literal form per location. (Example this session: the Payouts `consistency` value was the literal text `\u2014 (none)` inside a JS string, not a real em-dash.)
3. **Bytes vs chars:** print with Python slicing, not shell `cut -c`.
4. **JS validation:** `python3 validate_js.py` → **expect 3/3** after every JS-touching change.
5. **Delivery:** copy working file to `/mnt/user-data/outputs/`, then `present_files`. Owner sends numbered change lists; apply all items in one pass.

## 8. Current facts baked into the page (post-corrections)
- Promo **NOFEE30** (30% off + $0 activation; else list + $130). Hero line: "June sale ends 6/30/26 | Use Promo Code: NOFEE30."
- Phases Test → PRO (80/20, intraday DD) → PRO+ ("Live", 90/10, EOD DD); PRO→PRO+ after ~$5K profit.
- **Buffer = Max Trailing DD + $100**; withdraw day one above buffer; **no min, no max, withdraw any amount**; **≤$250 withdrawal = $50 fee, >$250 free**; approval ≤12 business hrs; Plaid/Wise/PayPal.
- **Copy trading ALLOWED**; bots/algos not allowed; news restricted on PRO; hedging + Martingale/DCA allowed.
- No DLL, no scaling, no funded consistency (Test consistency 50%). **Min trading days: 5 to pass Test, none funded.** Max **5** funded accounts.
- **PRO (funded) account resets:** hit Max Trailing DD → reset skips eval back to funded, **PRO only, max 3 per PRO account; PRO+ accounts cannot be reset**; per-size $449 / $649 / $799 / $999 / $1,499 (`RESET_PRICES`). Surfaced in Overview bottom-line, Payouts-tab pricing block, card-view Funded sub-tab metric, comparison-view Resets row, Rules-tab Account Reset item, and the Rules & Policies modal. (A Test/eval reset is separate, priced at the monthly fee.)
- Trustpilot 4.4/~8,750 · **CPF 4.3** · HQ **Windermere, FL** · founded Jan 2022.
- Sidebar compare: **Bulenox · Apex Trader Funding · Trade Day**. Overview table vs **Topstep + Tradeify** (Topstep Profit Split = **90/10**, owner-confirmed — no longer 100%-first-$10K).

## 9. Known residual / owner-confirm backlog
1. **Topstep comparison column:** Profit Split owner-confirmed at **90/10**; remaining cells still use cornerstone figures, not Topstep's live pricing — confirm.
2. **Platforms:** bot-note + Tradovate copier claim conflict with policy (copy allowed, bots not); "free/included" perks unverified; WealthCharts "free" still in `desc` prose; roster is Tradeify's — confirm.
3. **Flat-by-4:00 PM ET** still in prose (pros/cons, expert review, FAQ) after the pill was removed — trim if undesired.
4. **Rules-tab Copy Trading note** = "Trade copiers permitted" — refine if a caveat is needed.
5. Dead code safe to remove later: `CARD_DATA.select`, `SELECT_*` legacy dicts, unreachable scaling objects + `scalingChartSVG`, `.cd-type-btn` CSS/JS, orphan `.modal-faq-list` / `.modal-faq-link` CSS.

## 10. Adding the next firm page
Build from the **master** (`cpf-tradeify.html`), not from this TPT file — TPT carries single-product collapses and TPT-specific copy. Keep CSS design tokens byte-identical to the master; fork structure only deliberately and document it here.
