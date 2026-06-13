# CPF — Funded Futures Network (FFN) Page Handoff
*How `cpf-ffn.html` implements the ComparePropFirms.com firm-page system. Read alongside the cornerstone docs: `cpf-page-system-handoff.md` (the locked design system) and `ffn-content-map.md` (FFN's data source of truth). The cornerstone template is `cpf-tradeify.html`.*

**Golden rule (inherited):** style, coloring, layout, and component structure **never change** across firm pages — only content, data, wording, and per-product accents do. FFN obeys this; the few deviations below are content-model differences, not design-system changes, and each is documented.

---

## 1. Conformance to the cornerstone — what is byte-identical
- **Design tokens:** the entire `:root` ramp and the `html.dark` theme are identical to Tradeify (`--orange:#F39200` global accent, `--green/red/blue/purple/teal`, `--gray-*`, `--ramp-1…6`, `--surface*`, `--star`, `--cf-label`). No hardcoded hex in content.
- **Typography:** `--sans:"Inter"`, `--serif:"Source Serif 4"` (Google Fonts; a sandbox 403 on fonts is harmless).
- **Layout & 9 tabs:** Overview, Accounts, Rules, Payouts, Platforms, Reviews, Expert Review, Restricted Countries, General FAQ.
- **Component vocabulary:** hero chevron strip, `cd-flow` interlocking chevrons, `account-card`, `rules-summary-grid`, `eval2-metric` cards, `payouts-cols`, `scaling` staircase, modal rulebook, sidebar boxes, sticky bottom.
- **Card-view header:** standard `cd-name` (left) · `cd-type-selector` · `cd-sizes` row; `positionSelectPills()` translateX-centers the OG/MAX pills over the active type button. The pills now live **inside** `cd-header` and are reordered with flex `order` (see §3.5) so they render correctly on mobile — a documented deviation, not a design-system change.
- **Row-alignment convention (locked):** label left, value right. `text-align:right` is present on `.eval-step-row .value`, `.eval2-step-row .val`, `.rules-summary-row .value`, `.pay-value`, `.pp-stat .value`, `.ac-stat-val`, `.ag-row .value`.
- **Behavior:** theme toggle (`localStorage` `cpf-theme`), tab/view/phase/program toggles, modal — all driven by data; logic unchanged from the cornerstone.

---

## 2. The FFN product model → cornerstone key mapping
FFN = **2 products × 2 styles × 5 sizes**, mapped onto the cornerstone's existing keys so the render engine needs no rewrite:

| FFN concept | Cornerstone slot | Notes |
|-------------|------------------|-------|
| **Standard** product | type key **`growth`** | accent purple; icon 💳; tag "More Days" |
| **Express** product | type key **`select`** | accent blue; icon 🚀; tag "Faster Funding" |
| *(no third product)* | type key **`lightning`** | **UNUSED** — empty/dropped |
| **OG / MAX** style | **`cardState.program`** = `'OG'` / `'MAX'` | occupies the slot Tradeify used for Select's `flex`/`daily` |
| Sizes | `25K/50K/100K/150K/250K` | 5 sizes (cornerstone ships 4) |

- **Default state:** `cardState = { type:'growth', size:'50K', program:'MAX' }` → "Standard MAX 50K".
- Data is keyed **`[type][program]`** everywhere (e.g. `CARD_DATA[type][program]`); comparison/payouts rows are computed on demand from the `ff*Rows(t,p,sz)` specs.

---

## 3. Deliberate deviations from the cornerstone (content-model, not design)
1. **Data is generated at runtime by `FF_*` builders** instead of hand-written literal objects. The builders emit the exact object shapes the cornerstone renderers expect. **Edit FFN data in the builders, never in a literal `CARD_DATA` block (there isn't one). The comparison/payouts card rows come from the `ff*Rows` specs; `ACCOUNT_DATA`/`PAYOUT_DATA` no longer exist.**
2. **OG/MAX applies to BOTH products** (Tradeify's Flex/Daily applied to Select only). Consequences:
   - `cd-program-pills` are **always visible** (inline `style="display:flex"`), not shown/hidden per type.
   - `positionSelectPills()` targets `#view-card .cd-type-btn.active` (the active product) rather than the hardcoded `[data-cardtype="select"]`.
   - **Comparison view:** *each* product card carries its own OG/MAX `flex-daily-toggle` (Standard and Express), vs Tradeify where only the Select card had one.
3. **5 sizes:** `.ac-sizes` comparison-card grid uses `repeat(5,1fr)` (all five on one row); card-view shows 5 size buttons. (Cornerstone uses `repeat(4,1fr)` for its 4 sizes.)
4. **`hero-logo` background `#000`** (FFN gold-FF wordmark on black) vs Tradeify green — firm-specific, correct.
5. **OG/MAX pills relocated into `cd-header` for correct mobile order.** The `cd-program-pills` block sits inside `cd-header` (after `cd-type-selector`); flex `order` controls layout per breakpoint: desktop = name/type/sizes on row 1 with the pills on their own row below (a zero-height `.cd-hbreak` flex item, `flex-basis:100%`, forces the line break so the pills stay `width:fit-content` and `positionSelectPills()` can still shift them under the active button); mobile (≤760px) = name → type → **pills → sizes** (`.cd-hbreak` hidden, `transform:none`). Header `gap` is split into `column-gap:16px; row-gap:0` (desktop) with a `10px` top margin on the pills, and `row-gap:16px` restored on mobile — this avoids the wrapped pills line being double-gapped. *(Earlier the pills were a standalone block above the header; that dropped below the sizes when the header stacked on mobile.)*

---

## 4. JS architecture — where to edit FFN data
All data lives in the main `<script>` as small builders (search `FF_`):

| Object | Holds | Key |
|--------|-------|-----|
| `FF_SIZES` | size order `['25K','50K','100K','150K','250K']` | — |
| `FF_SZ` | per-size: `target, maxdd, con` (contracts), `dll`, `win` | by size |
| `FF_PRICE` | `{ l:listPrices, d:displayedPrices }` (BOGO fee = `d/2`) | `type\|program` |
| `FF_PLAN` | per-style: `days, exhib, edd, econs, fcons, fdd, fmaxdd, dllSoft, buf` | `type\|program` |
| `FF_SCALE` | per-size contract-scaling tiers `[{c:contracts, r:profit range}]` (identical across all products/styles) | by size |
| `FF_PROD` | product `{name, icon, tag}` | by type |
| helpers | `FF_K(t,p)` key · `FF_MONEY(n)` · `FF_DLL(t,p,sz)` · `FF_BUF(t,p,sz)` · row specs `ffEvalRows` / `ffFundedRows` / `ffPayoutRows` + `acStatRowsHTML` | — |

- These builders feed `CARD_DATA[type][program]` (card view) and `TAB_CONTENT[type][program]` (payouts/scaling/FAQ). **Scaling is enabled** (`TAB_CONTENT…hasScaling:true`, `scaling.rows = FF_SCALE`); `renderScalingTab` renders the size-keyed milestone table + staircase, and the Overview Scaling block + rulebook modal read the same data.
- **Comparison-card & Payouts-tab rows are JS-built from row specs** (the `.ac-stats` blocks ship empty in the HTML). The left label is static, the right value dynamic:
  - `ffEvalRows(t,p,sz)` — 12 rows for the **Evaluation** phase toggle: Evaluation Steps · Profit Target · Total Drawdown · Daily Loss Limit · Days to Pass · Consistency Rule · Max Contracts · Max Accounts · Account Resets · Activation Fee · News Trading · Bots / Algo Trading.
  - `ffFundedRows(t,p,sz)` — 12 rows for the **Funded** phase toggle: Max Payout · Profit Target · Total Drawdown · Daily Loss Limit · Days to Payout · Consistency Rule · Contract Scaling Plan · Max Accounts · Account Resets · Profit Split · News Trading · Bots / Algo Trading.
  - `ffPayoutRows(t,p,sz)` — 14 rows for the **Payouts tab**: Max Payout · Max Payout (Subsequent) · Minimum Payout · Profit Target · Withdrawal Buffer · Total Drawdown · Daily Loss Limit · Days to Payout · Profit / Trading Day · Consistency Rule · Profit Split · Per Request · Payout Frequency · Processing Time.
  - All three render via `acStatRowsHTML(rows)`; `updateAccountCard()` picks eval/funded by `phaseState`, `renderPayoutCard()` always uses the payout spec. **The old `ACCOUNT_DATA`, `PAYOUT_DATA`, `PHASE_LABELS` objects and every `data-field` / `data-payout-field` / `data-label-key` hook were removed** — edit row labels/values only in the three `ff*Rows` helpers.
  - **Funded phase keeps Account Size + Price on the size pills** (same as Evaluation); it no longer swaps the price for a max-payout figure.
- **Renderers are the cornerstone's, unchanged:** `renderCardView()` → `setText()` for every `data-cd="X"` field, then `renderEvaluationTab` / `renderFundedTab` / `renderPayoutsTab` / `renderScalingTab` / `renderFAQTab`; `updateAccountCard()` for the comparison cards. To add a card-view field, add a `data-cd="X"` span and have a builder populate `X` — no new JS plumbing.
- **Dead Topstep objects were removed** during the build; if any reappear from a bad merge, delete them (they aren't referenced).

---

## 5. Per-firm content that was swapped (the content layer)
Identity & hero (name, logo, tagline, CEO, HQ, founded, "$ paid / traders", chevron stats, promo `BOGOISBACK`, CPF 4.4, Trustpilot); 2 account types + OG/MAX styles + accents; per-size + per-style data (§ content map); phase/wording; payout-method names (ACH/PayPal/wire); platforms (EdgeProX/FundX/Quantower/NinjaTrader/Sierra Chart, Rithmic, CME); restricted countries (23, single tier); comparison competitors (Topstep, Tradeify); rulebook modal copy; **per-size contract scaling (`FF_SCALE`)**; **$126/mo data fee = live-funded accounts only**; sources. Promo logic = list struck-through → displayed (50% off); card fee = displayed ÷ 2 (BOGO).

---

## 6. Build / edit workflow (matches cornerstone Part D)
1. Work on a copy; keep ALL styles/structure. Final deliverable: `/mnt/user-data/outputs/cpf-ffn.html`.
2. Update `ffn-content-map.md` first when data changes; keep page + map in sync.
3. Edit technique: guarded Python `str_replace` — `assert h.count(a)==n` before `h.replace(a,b)`. Never `%`-format strings containing literal `%` ("40%","90%"); use `.replace()` only.
4. Validate: extract the **3 `<script>` blocks** → `node --check` each (expect **3/3**).
5. Render-check (headless Chromium): click all 9 tabs + 7 card sub-tabs (`data-cd-tab-target`) + comparison/funded/program toggles; exercise all **20 combos** (2 products × 2 styles × 5 sizes); confirm **zero page errors** (Google-Fonts 403 is fine).
6. `present_files` the page + updated content map.

---

## 7. Open items to confirm before publish
- **Site nav differs from the cornerstone (decide a site-wide standard).** FFN uses an **image logo** (`.nav-logo img`) + **BBB accreditation badge** (`.nav-bbb`) + centered links + small-screen media queries; the Tradeify cornerstone uses a **serif text wordmark + `.nav-cta` button**. Nav is shared site chrome and should be unified across all pages — pick one and apply everywhere. (The FFN image-logo + BBB nav appears to be the newer/real site chrome; confirm with stakeholder.)
- **Data gaps (from `ffn-content-map.md`):** Trustpilot score/count (4.6 / ~426 placeholder); company facts (CEO Kevin Swart, founded 2022, NY — third-party sourced); per-account sim payout caps per size; Reviews-tab quotes are illustrative. *(Contract scaling is now verified for all five sizes from first-party checkout screenshots.)*
- **Prop-firm pricing/promos change often** — re-verify against fundedfuturesnetwork.com before publishing if time has passed.
