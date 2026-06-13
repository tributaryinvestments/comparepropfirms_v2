# Purdia Capital Review Page — Implementation & Handoff
*For the agentic AI deploying `cpf-purdia.html` onto the live ComparePropFirms.com (WordPress / Elementor) site. Pair this with `cpf-purdia-content-map.md` (the data source of truth).*

---

## 0. What you're deploying
- **`cpf-purdia.html`** — a **fully self-contained, single-page** review of Purdia Capital: one file, **inline CSS**, **vanilla JS**, **no external dependencies** (the firm logo and press images are embedded as base64). It is built to the canonical `cpf-tradeify.html` cornerstone design system.
- It renders a sticky nav, hero, a 9-tab interface, and two interactive account explorers. Nothing here calls a CDN or external API, so it drops into a page/embed without network setup. (One harmless `403` may appear in console from a placeholder external resource — ignore.)

---

## 1. How to place it on the site
The established pattern is **one self-contained HTML file per firm**, embedded into the WordPress page body.

1. Create/locate the Purdia review page (slug e.g. `/futures/purdia-capital/`).
2. Embed the **entire** contents of `cpf-purdia.html` via a **Custom HTML / Code** block (Elementor "HTML" widget or a full-width Code block). Paste the whole document **including its `<style>` and `<script>` blocks** — they are namespaced to this page's classes and must travel together.
3. Do **not** split the CSS/JS into the theme's global assets. The page is intentionally hermetic so it can't be broken by theme updates and matches the other firm pages 1:1.
4. If the theme wraps content in a constrained container, give this block **full-width** so the hero, tab strip, and comparison cards aren't clipped.
5. Replace the placeholder CTA hrefs (`href="#"` on **Get Funded**, size CTAs, sale box) with the **live Purdia affiliate link**, and keep `rel="sponsored noopener"` on the primary CTA.

> Affiliate/conversion model: **compare → pick → get funded.** Every "Get Funded / View … Details" button should point to the affiliate URL (optionally with the relevant promo code pre-applied).

---

## 2. Interactive components that MUST work after embedding
Verify each of these once the block is live (they're all driven by the page's own JS):

- **Top tabs** (Overview, Accounts, Rules, Payouts, Platforms, Reviews, Expert Review, Restricted Countries, General FAQ) — clicking switches `.panel`; content-heavy tabs go full-width.
- **Accounts tab — two views** via the **Comparison View / Card View** toggle:
  - **Comparison View:** two product cards (Evaluation, Instant Funding) each with an internal sub-toggle, a size row, stat rows, and a CTA. A **phase toggle (Evaluation / Funded)** appears here.
    - Eval phase: the **Instant Funding** card shows a **"No Evaluation"** empty-state panel (instant has no eval); the two cards are forced to **equal height**. Eval and Funded show **different stat rows** (different schemas).
    - Both phases: size buttons show **Account Size + Price**. The Funded view surfaces **Max Payout** as the first stat row, not in the buttons.
  - **Card View:** a detail card with a **category toggle (Evaluation / Instant Funding)**, **subtype pills**, **size buttons**, a flow strip, and vertical sub-tabs (Overview, Evaluation Steps, Trading Rules, Funded Phase, Scaling Plan, Payouts, Product FAQ).
- **Rulebook modal** (View Full Rulebook) — 6 sections + a TOC; opens/closes; in-page anchor nav.
- **FAQ accordions** (`<details>`), Restricted-countries list, Trustpilot/sale side boxes.

**Color/theming rule that's already baked in (don't "fix" it):** account types are color-coded — Beginner = green, EOD = blue, Pro = purple, **EOD/Static Instant = orange**, Static = teal. In the card view the **Instant Funding** category toggle, its sub-pills, and selected size buttons are **orange**; **Evaluation** is **blue**. Orange is reserved for CTAs and the instant-funding theme; teal for callouts/pills/tags.

---

## 3. Where the data lives (if you must edit content)
All firm data is in **JS objects inside the single `<script>` block** — edit data there, not scattered HTML, so the comparison view and payouts tab stay in sync.

- `ACCOUNT_DATA[type].{eval,funded}` — the master per-type model for the **comparison view AND the payouts tab**. `*.sizes` carry per-size figures (target, totalDD, dll, and for funded: maxPayout, profitPerDay); `*.fixed` carry per-type figures (steps, days, consistency, maxContracts, maxAccounts, resets, activationFee/scaling/split, newsTrading, bots).
- **Row schemas** (also in the script): `EVAL_ROWS`, `FUNDED_ROWS`, and `PAYOUT_ROWS` define the **left-column labels and order**; `PAYOUT_FIXED` holds the firm-wide payout policy. The comparison cards and payout cards are rendered by mapping these schemas over the data, so **`.ac-stats` in the HTML is intentionally empty** — don't hand-add rows there.
  - Evaluation toggle and Funded toggle deliberately show **different rows** (driven by `EVAL_ROWS` vs `FUNDED_ROWS`); both size-button rows show **Account Size + Price**.
  - Payouts-tab size buttons show **Account Size + Max Payout**.
- `CARD_DATA[type]` — the master model for the **card view** (icon, name, tag, sizes{fee,target,dll,maxloss,contracts}, copy). **`fee` strings carry the sale markup** as `<span class='price-orig'>…</span><span class='price-sale'>…</span>`. Comparison/payout size-button prices read from here.
- `PAYOUT_INFO[type]` — the one-line description above each payouts card.
- `PLATFORMS` — the platform list (Tradovate / TradingView / NinjaTrader).
- Static HTML holds the Overview prose, rubric, comparison table, rules table, rulebook modal, and restricted-countries list — edit those inline.

> **Render scoping (important):** `rerenderAllAccountCards()` is scoped to `#view-comparison` and `renderAllPayoutCards()` to `#panel-payouts` so the phase toggle never clobbers the payouts cards. Keep that scoping if you refactor.

**Promo codes & pricing are dual-source:** the per-size sale prices live in `CARD_DATA` `fee` strings; the **promo codes** (`IMAN` headline, `CORE200` for the $50K Instant) are in the **hero CTA** and the **sidebar sale box**. Update both together. See the content map for the full price table and the comparison/payout row schemas.

---

## 4. Safe editing workflow (use this, don't hand-edit blindly)
This page rewards disciplined edits. The proven loop:

1. **Guarded string replacement** — use a script that asserts the exact match count before saving (a `rep(old, new, n)` helper that **aborts on mismatch**), so a stale selector never silently no-ops or double-applies.
2. **`node --check`** on the extracted main `<script>` after any JS-touching change — the page must stay parse-clean.
3. **Headless render test** (Playwright Chromium) — confirm: tab switching, comparison ⇄ card view, the phase toggle (eval No-Evaluation panel + equal-height cards; funded max-payout sizes), the card-view category/subtype/size colors (instant = orange), the rulebook modal, and no console errors beyond the benign `403`.
4. Only then publish.

---

## 5. Post-deploy QA checklist
- [ ] Hero logo renders on its blue tile (no letterbox bars); chevrons read **$349 / $50K Instant**, **90% / Profit Split**, **Save up to 30%**.
- [ ] CTA shows **June Sale Ends 6/30/26 · Use Promo Code IMAN**; sidebar sale box shows **IMAN** (30% off all) **and CORE200** ($50K Instant → $349).
- [ ] Overview meta row: Middletown DE · Operating since 2022 · **CEO: Jonas D. Attiah** (no "Broker: Tradovate" pill).
- [ ] Rubric: Pricing 4.8 · Profit Split 4.8 · Payout Speed 5.0 · Trading Rules 4.9 · Platforms 4.8 · Support 4.9.
- [ ] Comparison table CPF scores **4.9 / 4.8 / 4.9**; "Instant Funding Option" = **Yes**.
- [ ] Rules tab: Max Drawdown **$750 – $5,000**; Daily Loss Limit **$250 – $2,000**; First Payout **$1,000 – $6,000**; Subsequent **No cap**; **Scaling Plan = None (red pill)**; Consistency **0%**; Max Accounts **3**.
- [ ] Accounts → Comparison: **Eval toggle** shows 12 rows (Evaluation Steps → Bots/Algo) with Size+Price buttons; **Funded toggle** shows 12 rows starting with **Max Payout** and Size+Price buttons; eval-phase cards are equal height with the Instant "No Evaluation" panel.
- [ ] Payouts tab: 14 rows (Max Payout → Processing Time); size buttons show **Size + Max Payout**.
- [ ] "What we love" says **semi-automated tools allowed (no full automation)** — not "bots allowed."
- [ ] All `href="#"` CTAs swapped for the live affiliate URL.

---

## 6. Open flags to resolve with the editor before publish
1. **Hero rosette still shows 5.0** vs the 4.9 comparison/rubric — align if desired (also the pullquote "earns our top score").
2. **Sale end date** (6/30/26) is format-matched, not confirmed — set Purdia's real date.
3. **Trustpilot 4.5 / 64** sidebar figure not independently re-verified.
4. **NinjaTrader** third platform plausible but only Tradovate + TradingView are explicit on purdia.com.
5. **Copy trading** shown as allowed (monitored); one third-party source says copying *from other traders* is restricted — re-verify.

---

## 7. Files in this handoff
- `cpf-purdia.html` — the finalized, self-contained review page (deploy this).
- `cpf-purdia-content-map.md` — the data source of truth (every figure on the page).
- `cpf-purdia-handoff.md` — this document.
