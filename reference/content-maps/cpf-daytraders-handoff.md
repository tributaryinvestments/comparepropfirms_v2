# DayTraders.com — Handoff Document
*Build/maintenance reference for `cpf-daytraders.html` (ComparePropFirms.com). Pairs with `cpf-daytraders-content-map.md` (data source of truth).*

---

## What this file is
A single self-contained review page — inline CSS + vanilla JS, no build step — embedded into WordPress/Elementor. Structure, design tokens, and component CSS follow the cornerstone `cpf-tradeify.html`; only content, data, and per-product accents differ. Site-wide orange accent (`--orange`) is never recolored per firm; per-product accents come from existing palette tokens only.

**Canonical sub-tab order:** Overview → Evaluation Steps → Trading Rules → Funded Phase → Scaling Plan → Payouts → Product FAQ.

**Internal slot keys are preserved in code regardless of public terminology:** `trail`=growth/purple, `eod`=select/blue, `static`=lightning/orange, plus `s2f` and `s2l` in the instant grid.

---

## Data architecture — ONE source of truth: `CMP_DATA`
The Accounts comparison view **and** the Payouts tab now render from the same JS object, `CMP_DATA` (per product → `fixed` block + per-size `sizes` block). This guarantees a value can't drift between the two views.

- `CMP_DATA[product].fixed` — phase/product-level fields: `evalSteps, daysToPass, daysToPayout, consistencyEval, consistencyFunded, maxAccounts, resetsEval, resetsFunded, activationFee, news, bots, split, scaling, fundedTarget`.
- `CMP_DATA[product].sizes[size]` — per-size fields: `target, maxloss, dll, contracts, maxPayout, buffer`.
- Profit/Trading-Day values live in a small `PAY_PPD` map (payouts only); `minPayout` is the flat constant `$500`.

### Render engines (all rebuild `.ac-stats` innerHTML from row-spec arrays — never hand-edit the row HTML)
- **Comparison view:** `renderCmpCard(card)` + `window.renderAllCmpCards()`; row spec = `CMP_EVAL_ROWS` (12) when `window.cmpPhase==='eval'`, else `CMP_FUNDED_ROWS` (12). Size pills re-render on click.
- **Payouts tab:** `renderPayoutCard(account,size)`; row spec = `PAY_ROWS` (11). Size pills keep their `$/day` sublabels (set from `PAY_PPD`).
- The cards' `.ac-stats` containers are intentionally **empty in the HTML** — JS fills them. Labels are left-aligned (`.ac-stat-label`), values right-aligned (`.ac-stat-val`).

### Phase toggles
- **Accounts comparison** uses **[Evaluation | Funded]** as one segmented control + a **separate [Instant]** control. `showAcctView(view)` sets `window.cmpPhase`, toggles the `phase-eval` class (which controls the "FUNDED PHASE" pill + accent borders via `.compare-grid:not(.phase-eval)`), shows the matching `[data-product-group]` grid, and calls `renderAllCmpCards()`. Eval → eval grid with pill hidden; Funded → eval grid, pill shown, data unchanged except the row set swaps to funded; Instant → instant grid (S2F/S2L), funded rows.
- **Payouts** uses **[Funded Evaluation | Instant Funded]** (`showPayGroup`, `data-payout-product`).
- The 2-card Instant grids (Accounts + Payouts) are centered on desktop via a `min-width:1101px` rule (`grid-template-columns:repeat(2,1fr); max-width:calc((100% - 32px)/3*2 + 16px); margin auto`); below 1100px the existing `.compare-grid{grid-template-columns:1fr}` rule stacks them.

---

## Guarded-edit workflow (use for every change)
1. Python script in `/home/claude/work/` with a `rep(old,new,label)` helper that asserts an exact occurrence count (aborts, writes nothing, on mismatch). Scripts are sequential: latest is **`edit_v14.py`**.
2. **Unicode trap:** HTML body stores real Unicode; JS string source stores literal `\uXXXX` escapes — match each in its own literal form (e.g. em-dash `\u2014`, ‹VERIFY› = `\u2039VERIFY\u203a`).
3. **Python trap:** never `%`-format strings containing literal `%`; use `.replace()` only.
4. Extract all `<script>` blocks and run `node --check` — expect **3/3** clean.
5. Playwright headless Chromium render at desktop (~1400px) and mobile (390px). The only console error is a Google Fonts 403 (sandbox-blocked; fine live) — filter it out.
6. Copy working copy → `/mnt/user-data/outputs/cpf-daytraders.html`; deliver via `present_files`.

---

## Changelog — this session
- **Accounts comparison rebuilt to a phase-aware, single-source engine.** Evaluation (12 rows) and Funded/Instant (12 rows) sets now render from `CMP_DATA`; the Funded toggle swaps the row set and shows the FUNDED PHASE pill; Instant shows S2F/S2L funded rows.
- **Payouts tab rebuilt** to an 11-row `PAY_ROWS` spec, reading the same `CMP_DATA`. Max Payout (Subsequent) mirrors Max Payout (DayTraders uses one cap). Withdrawal Buffer = cushion-to-request ("option A").
- **All values re-sourced first-party** (help.daytraders.com): per-size Max Contracts, profit targets, drawdowns, DLLs, payout caps, qualifying-day minimums; **S2L confirmed 80/20** (not 100%); funded drawdown carried from eval; S2F drawdown kept at $1,000/$2,500/$6,000 (stakeholder-confirmed).
- **Toggle controls restructured** (Evaluation|Funded + separate Instant on Accounts; Funded Evaluation|Instant Funded on Payouts); 2-card Instant grids centered; payout-card sub-toggle whitespace removed.
- **Card-view detail button styles swapped:** Evaluations/Instant Funding are now **blocky** (`border-radius:10px`, `10px 18px`), Trailing/EOD/Static are **thin pills** (`999px`, `7px 18px`). ⚠ This diverges from the cornerstone and every other firm page, which still use the old arrangement — propagate or revert for consistency (decision pending).
- **Restricted Countries tab corrected.** Replaced stale Tradeify two-tier data (Sim Funded Only 27 + Not Available 58) with DayTraders' single first-party list of **79** countries ("cannot offer new or additional accounts"); removed the Sim-Funded-Only card and its Straight-to-Live copy. Flags generated from ISO-3166 codes.
- **Uniform wording** applied so equal values read identically cross-firm: "2 qual. days", "8 qual. days", "No target", "Up to 15", "Yes (verification req.)", "Discounted retry", "Not available".

---

## Open items (carry forward)
1. **S2L Max Payout** — ‹VERIFY› placeholder in both the Instant comparison card and the payout card.
2. **S2F total drawdown** — confirm $1,000/$2,500/$6,000 vs help-center $750/$1,000/$1,750 (looks like a docs copy of Static).
3. **25K First-Payout Threshold / Min Balance** static card-view row — update $1,500/$26,500 → **$1,600/$26,600**.
4. **Card-view button-style swap** — decide whether to propagate to `cpf-tradeify.html` + all firm pages (recommended for cohesion) or revert here.
5. Unverified: **founder "Leo Riot" / "Founded 2023"**, **platform list** (Onyx/WealthCharts; CQG vs Rithmic), **Trustpilot 4.7 vs 4.6**.
6. Dead cornerstone scaffolding (legacy Select Flex/Daily payout branches) is gone from the comparison/payout engines; any remaining Tradeify-only branches elsewhere are harmless no-ops for DayTraders' account types.

---

## Files
- Page: `cpf-daytraders.html`
- Data source of truth: `cpf-daytraders-content-map.md`
- This handoff: `cpf-daytraders-handoff.md`
- Cornerstone reference: `cpf-tradeify.html` (immutable design baseline)
