# CPF Firm-Page System — Cornerstone Handoff
*Tradeify (`cpf-tradeify.html`) is the canonical template for every ComparePropFirms.com firm review page. This document tells a future chat exactly what to change per firm and what must never change.*

**Golden rule:** the **style, coloring, layout, and component structure NEVER change** across firm pages. Only **content, wording, data, and per-product accents** change. If an edit would alter the look/structure rather than the data/copy, stop — that's out of scope for a new firm page.

---

## PART A — What changes per firm/product (the content layer)

Everything below is firm-specific. A new firm page is produced by swapping these values; the scaffolding stays identical.

### 1. Identity & hero
- Firm name, hero logo (base64 image in `.hero-logo`), tagline, CEO/founder, HQ, founded year, "$X paid / N traders".
- Hero chevron strip values (3–4 stats): lead price, profit split, promo. Keep the **chevron component** as-is; change only the numbers/labels.
- CPF editorial score; Trustpilot score + review count + sample reviews.
- Breadcrumb, meta badges, the 30-second verdict, editor pull-quotes, pros/cons.

### 2. Account types (the per-product axis)
Tradeify has **three** types — `growth`, `select`, `lightning`. A firm may have 1–N. Each type carries:
- Display name, icon (emoji), tag text, and a **per-product accent** drawn from the existing palette tokens only — Tradeify uses purple/blue/orange (`--purple` / `--blue` / `--orange`) for card borders, tags, pills, and active sub-tabs. **Do not invent new colors;** reuse existing tokens.
- `about`, `features[]`, `bestFor[]`, `notIdeal[]`, `ctaText`, product FAQs.

### 3. Per-size data (25K/50K/100K/150K here; sizes themselves can change)
Fee, profit target, DLL, max loss, max contracts, min profit/winning-day, payout caps, min payouts, consistency %, min trading days, scaling milestones.

### 4. Wording the firm controls
Phase labels, frequency wording (e.g. "5 winning days"), payout-method names, restricted-country tiers/lists, comparison-table competitors, rulebook modal copy, sources list.

### 5. Promo logic
40% promo treatment via `discountedPrice()` (orig struck through, sale = round(orig×0.6)). Promo code pill / "limited time" copy.

> When updating content, the **content map** (`tradeify-content-map.md`) is the source of truth. Keep it in sync with the page.

---

## PART B — What must NEVER change (the design system)

### Color tokens (identical on every firm page)
- **Accent = site orange:** `--orange:#F39200` (light) / `#ff9f2e` (dark), plus `--orange-hover/soft/tint/deep`. This is the global site accent (active tabs, primary buttons, sticky CTA, featured column, hero price). Never recolor it per firm.
- Full token ramp — `--green/red`, `--gray-50…900`, `--blue/purple/teal`, `--ramp-1…6`, `--surface/surface-2`, `--bg-page/bg-soft`, `--star`, `--cf-label` — with a complete light **and** dark theme (`html.dark`). Every color in the page references a token; **no hardcoded hex in content.**
- Per-product accents (purple/blue/orange) come from these existing tokens — they're a *content choice from a fixed palette*, not new colors.

### Typography
- `--sans: "Inter"`, `--serif: "Source Serif 4"`. Serif for hero name, section titles, big numbers, pull-quotes; Inter for everything else. Only external dependency = Google Fonts (a sandbox 403 on fonts is harmless).

### Layout & components (structure is locked)
- Sticky nav → breadcrumb → hero (logo / info / chevron stats / CTA) → sticky tab bar → page grid (content + 340px sidebar; content-heavy tabs go full-width) → sticky bottom CTA → rulebook modal.
- **9 tabs:** Overview, Accounts, Rules, Payouts, Platforms, Reviews, Expert Review, Restricted Countries, General FAQ.
- **Accounts tab** = Comparison View **and** Card View (toggle), plus an eval/funded phase toggle and (for multi-program types) a Flex/Daily sub-toggle that sits directly **below** the Growth|Select|Lightning type toggle in card view, centered under the multi-program type.
- **Card View** has its own sub-tabs: Overview, Evaluation Steps, Trading Rules, Funded Phase, Scaling Plan, Payouts, Product FAQ.
- Component vocabulary that stays: hero chevron strip, `cd-flow` interlocking chevrons, `account-card`, `rules-summary-grid` (Risk Management / Permissions / Restrictions / Account Rules), `eval2-metric` cards with progress bars, `payouts-cols` (3-col), `scaling` staircase, modal rulebook (6 numbered sections — Trading, Risk Rules, Payouts, Operations, Policies, Notes; **no FAQ section** — FAQs live in the General FAQ tab and the per-product Product FAQ sub-tab), sidebar boxes, sticky bottom.
- **Row alignment convention (locked):** in any titled stat block, the **label is left-aligned and the value/answer is right-aligned**. Value classes carry `text-align: right` (e.g. `.ac-stat-val`, `.pay-value`, `.pp-stat .value`, `.rules-summary-row .value`, `.eval-step-row .value`, `.eval2-step-row .val`, `.ag-row .value`).

### Behavior
- Theme toggle (persisted to `localStorage` `cpf-theme`), tab switching, view/phase/program toggles, modal open/close, all driven by the JS data structures below. Logic doesn't change per firm — only the data it reads.

---

## PART C — JS architecture (edit data here, never the scaffolding)

Main `<script>` holds the data + renderers. **3 script blocks total; all must pass `node --check`.**

- **Comparison view:** `ACCOUNT_DATA[type].{eval,funded}.{fixed,sizes}`; `PHASE_LABELS` (eval/funded consistency labels); `phaseState`; Select uses `compareProgram` + `SELECT_FUNDED_DAILY` + `SELECT_CAPS`. Rendered by `updateAccountCard()`.
- **Card view:** `CARD_DATA[type]` (icon/name/tag/sub/split/per-size `sizes{fee,target,dll,maxloss,maxlossShort,contracts}` + eval/funded fields); `cardState{type,size,program}`; `GROWTH_FUNDED`, `LIGHTNING_FUNDED`, `SELECT_PROGRAMS.{flex,daily}`. Rendered by `renderCardView()`, which calls `setText()` for every `data-cd="…"` field, then `renderEvaluationTab` / `renderFundedTab` / `renderPayoutsTab` / `renderScalingTab` / `renderFAQTab`.
- **Main Payouts tab:** its own `PAYOUT_DATA[type]` (per-size minProfit/payoutCap/minPayout/dll; Select has flex/daily).
- **Field wiring:** any `data-cd="X"` in card-view HTML auto-populates from `setText('X', …)` — that's how the new **Max Contracts** row (`data-cd="contracts"`) fills per type+size with no extra JS.

### Where the recent edits live (reference for similar future edits)
- Min profit/winning-day → `renderFundedTab` "Minimum Trading Days" metric desc (Growth + Select Flex branch).
- Max Contracts in Risk Management → static row in card-view Rules panel, `data-cd="contracts"`.
- Frequency wording → `SELECT_PROGRAMS.flex.frequency`.
- DLL "(EOD)" + "Max Loss (EOD)" + dropped "(eval)" qualifiers → `ACCOUNT_DATA`, `PHASE_LABELS`, `CARD_DATA`, and the static comparison/rules HTML.

---

## PART D — Build / edit workflow for the next firm page

1. Copy `cpf-tradeify.html` → `cpf-<firm>.html`. Keep ALL styles/structure.
2. Build/refresh `<firm>-content-map.md` from the firm's official help center (verify every number; cite article URLs).
3. Swap the Part-A content: identity, account types + accents (from the fixed palette), per-size data, wording, restricted countries, comparison competitors, rulebook copy, sources.
4. Edit technique: anchor-splice in Python with `h.replace(a,b)` and `assert a in h`. **Never** run Python `%`-formatting on strings containing a literal `%` ("40%","90%") — it crashes; use `.replace()` only.
5. Validate: extract the 3 `<script>` blocks → `node --check` each (expect 3/3).
6. Render-check with headless Chromium: click through all 9 tabs + card-view sub-tabs + comparison/funded toggles; confirm **zero page errors** (Google-Fonts 403 is fine).
7. `present_files` the page + updated content map.

---

## Open items to confirm with stakeholder (carry forward)
- **Select contract values:** page shows Select 50K = 2 minis (20 micros); one third-party source says 4/40. Left as the page's lower scaling-start values — re-verify if questioned.
- **"Max Loss (EOD)" label:** renamed only in the card-view Rules › Risk Management card (per the "rules tab" instruction). Overview/comparison cards still read "Max Loss (Trailing)" with values like "$2,000 EOD." Offer to propagate "(EOD)" everywhere for full consistency if desired.
- **Prop-firm pricing/promos change often** — re-verify against the firm's site before publishing if time passes.
