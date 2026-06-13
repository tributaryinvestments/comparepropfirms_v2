# ComparePropFirms — Purdia Capital Page Content Map

**Build file:** `cpf-purdia.html`
**Template lineage:** transformed from `cpf-tradeify-v3-full-page.html` (the Tradeify build).
**Purpose:** Catalog every Purdia-specific data input and the structural changes made vs. the Tradeify template, so the page can be maintained or re-cloned without missing anything.

> ⚠️ **Anchor by selector / element ID / JS object name — NOT by line number.** Line numbers drift on every edit. Every entry gives a stable anchor (CSS selector, `id`, or JS object/key) you can `grep` for.

> One self-contained HTML file (inline `<style>` + vanilla JS, no build step; all images inline base64). **Two data layers:** (1) JS data objects near the bottom (`ACCOUNT_DATA`, `CARD_DATA`, `TAB_CONTENT`, `PLATFORMS`) render the Accounts tab; (2) static HTML for prose/tables/pills/reviews/FAQ/modal. When a fact lives in both, update both.

---

## 0. Biggest structural difference vs. Tradeify

Tradeify had **3 account families** (Growth / Select / Lightning), one of which (Select) had a Flex/Daily sub-program toggle. **Purdia has 2 products containing 5 account types**, and BOTH the comparison view and the card view use a **category toggle + sub-type pills** pattern (the Tradeify Select Flex/Daily mechanism, generalized):

| Product (category key) | Sub-type keys | Names |
|---|---|---|
| **Evaluation** (`eval`) | `beginner`, `eod`, `pro` | Beginner · EOD Eval · Pro Eval |
| **Instant Funding** (`instant`) | `instant`, `static` | EOD Instant · Static Instant |

- **Comparison view** (`#view-comparison`): exactly **2 cards** (`.account-card.eval`, `.account-card.instant`). Each has an in-card sub-toggle (`[data-cmp-subtoggle]`, reuses `.flex-daily-toggle`/`.fd-btn`) that swaps the card's `data-subtype`; `updateAccountCard(card)` rebuilds the sizes + stats from the selected sub-type.
- **Card (detail) view** (`#view-card`): uses the **canonical cornerstone components** — contextual **sub-type pills on top** (`.cd-program-pills` → `.cd-prog-btn[data-subtype]`, hook `[data-cd-subtype-pills]`), then the header row with the account **name left**, the two **category buttons centered** (`.cd-type-selector` → `.cd-type-btn[data-cardcat="eval|instant"]`), and **size buttons right** (`.cd-size-btn`). No bespoke selector classes — same `cd-type-btn`/`cd-prog-btn` as Tradeify. All active states are **blue** (`--blue`/`--blue-soft`) to match the cornerstone screenshot; `renderTypeControls()` keeps buttons + pills in sync; `cardState = { cat, type, size }`.

**Removed from the Tradeify template:** `SELECT_PROGRAMS`, `SELECT_CAPS`, `SELECT_FUNDED_DAILY`, `GROWTH_FUNDED`, `LIGHTNING_FUNDED`, the old `cd-type-selector` (5 buttons) and `cd-prog-btn`, and the fabricated 40%-off promo (`discountedPrice()` now returns the price unchanged; real instant/static sale prices are baked into the fee strings).

**Type → accent color** (`.ac-tag.<key>`, `.account-card.<key>`, `.cd-pill.active.sel-<key>`, `.ac-cta.<key>`):
beginner → green · eod → blue · pro → purple · instant → orange · static → teal · category `eval` → blue · category `instant` → orange.

---

## 1. Brand & global

| What | Anchor | Purdia value |
|---|---|---|
| Page title | `<title>` | `Purdia Capital Review 2026 — ComparePropFirms.com` |
| Breadcrumb | `.breadcrumb` | last crumb `Purdia Capital` |
| Firm name | grep `Purdia Capital` | 0 occurrences of "Tradeify" remain |
| Hero/sidebar logos | `.hero-logo img`, `.similar-logo img` | base64 (placeholder Purdia logo) |
| Sticky monogram | `.sb-logo` | `PC` |
| Payout icon monogram | `.pay-method-icon.tp` | `$` |
| Promo code | `.promo-code-pill`, `.side-cta .sub` | `CPF` (house affiliate code) |
| Sale label | `.cta-meta`, `.side-cta .headline` | "Instant Funding Sale" (no fabricated %/date) |
| Knowledge base links | grep `purdia.com/knowledgebase` | restricted list → `purdia.com/knowledgebase/prohibited-countries` |
| Headline metadata | `#panel-overview .hero-meta` | `🇺🇸 Middletown, DE` · `Operating since 2022` · `Broker: Tradovate` (NO CEO — none is public) |

---

## 2. Account model (JS data objects)

All keyed `beginner | eod | pro | instant | static`. `const NOEVAL = ['instant','static']`.

- **`ACCOUNT_DATA[type].{eval,funded}`** — drives comparison cards. `.fixed` = evalSteps, split, consistency, minDays, maxAccounts, resets; `.sizes[size]` = target, dll, maxloss.
- **`CARD_DATA[type]`** — drives card view: icon, name, tag, sub, split, targetSub, payoutsTop, minDays/evalMinDays/fundedMinDays, consistencyEval/Funded, firstPayout/subsequent/frequency, accountReset, about, features[], bestFor[], notIdeal[], ctaText, and `sizes[size]` = fee, target, dll, maxloss, maxlossShort, contracts.
- **`TAB_CONTENT[type]`** — card-view sub-tabs: evalTitle/Sub, completion, payouts{firstThreshold, subsequent, maxPerRequest, steps[]}, `hasScaling:false` + `scalingMsg` (balance-based), faqs[].
- **Card-view controls:** `CAT_TYPES`, `CAT_OF`, `PILL_LABEL`, `renderTypeControls()`. Size buttons rebuilt per type inside `renderCardView()` from `Object.keys(d.sizes)`; the per-type drawdown label is set via `[data-cd="maxlossDesc"]` + a `_ddmap` in `renderCardView`.
- **Init order note:** the initial `rerenderAllAccountCards()` is called AFTER `CARD_DATA` is defined (alongside the initial `renderCardView()`), to avoid a TDZ error.

### Verified numbers (source of truth)

**Evaluations** — monthly sub + one-time **$130 activation** after passing; **$99 reset**; 90/10; no consistency.
- Beginner (2-step, EOD trailing, free Step-1 reset/day): $10K = $79/mo, $1,000/step, $250 soft DLL, 5 Micros · $25K = $119/mo, $2,000/step, $500 DLL, 10 Micros. Min 5 days/step.
- EOD Drawdown (1-step, EOD trailing): $50K = $179/mo, $3,000 target, $1,000 DLL, 5 Mini/50 Micro · $100K = $299/mo, $6,000, $2,000 DLL, 10 Mini/100 Micro. Min 5 days.
- Pro (1-step, intraday trailing): $100K = $199/mo, $6,000, no default DLL, 10 Mini/100 Micro. Sim-funded needs 5 days of $200+.

**Instant Funding** — one-time fee, sim→live, qualify = 10 trading days + 5 profitable; 90/10; no consistency.
- EOD Instant (EOD trailing): $25K = $349 (reach $1,000, $750 DD, 2 Mini/20 Micro) · $50K = $549→$349 (reach $2,000, $1,500 DD, 5 Mini/50 Micro) · $100K = $849→$679 (reach $3,000, $3,000 DD, 10 Mini/100 Micro).
- Static Instant (static DD, 90-day window, **no resets**): $100K = $1,499→$749 ($3,000 target/DD, $1,000 soft DLL, 3 Mini/30 Micro, 5 days $300+) · $150K = $2,299→$1,149 ($5,000 target/DD, $1,500 DLL, 5 Mini/50 Micro, 5 days $500+).

**Firm-wide:** daily payouts once live (incl. Day 1), processed ≤24h, received 1–3 business days, ACH (US+Wise)/Int'l wire, **USD only — no crypto/PayPal**, no minimum. First payout requires qualifying; none after. Max **3 active** accounts (sim+live combined). Live drawdown = static breakeven +$100. News/DCA/scalping/copy allowed; semi-auto OK; **full automation prohibited**. No overnight/weekend; auto-flatten 3:45 PM CT (not a breach); market 4:00 PM CT close / 5:00 PM CT reopen. Futures only, front-month. Broker = Tradovate; platforms = Tradovate/TradingView/NinjaTrader. Genuine live brokerage + dedicated risk manager. Scaling (live): +1 contract / +$1,000, max 50, DLL cap ~25%. Operating since 2022; "never denied a payout"; $5M+ funded; 6,000+ active traders. HQ Purdia Capital LLC, Middletown DE. Restricted: single ~124-country "Not Available" list (updated 4/15/25). Trustpilot ~4.5★/64 (third-party). **No public CEO — do not fabricate.**

---

## 3.–14. Static HTML sections (all rebuilt for Purdia)

| § | Tab / area | Anchor | Status |
|---|---|---|---|
| 3 | Hero stats | `.hero-stats .chev` | $79/$10K Beginner · 90% split · "None / Consistency rule" |
| 4 | Overview | `#panel-overview` | Intro, pros (10)/cons (4), quick-facts, allowed/watch-out pills, rubric, compare table (vs **Topstep + Alpha Futures**), bottom-line — all Purdia |
| 5 | Accounts | `#panel-accounts` | 2-card comparison + category/pill card view (see §0/§2) |
| 6 | Rules + modal | `#panel-rules`, `#rulebook-modal` | 5 rule-groups + modal sections 1–7, all Purdia (no consistency; soft DLL; only-hard-breach max DD) |
| 7 | Payouts | `#panel-payouts` | **2 dynamic cards** (Evaluation / Instant Funding) mirroring the comparison pattern: card titles "Evaluations" / "Instant Funding"; in-card sub-toggle (`[data-pay-subtoggle]`) → Beginner/EOD/Pro and EOD/Static; per-type size buttons (`[data-pay-sizes]`, sub-value = profit target); 10 payout-component rows (`[data-pfield]`: split, frequency, qualify, target, minDays, profitable, subsequent, processing, methods, consistency) updated per type/size by `renderPayoutCard2()` from `PAYOUT_INFO[type]` + `CARD_DATA[type].sizes`. Below: withdrawal note, 4-step process, since-2022 track record. |
| 8 | Platforms | `#panel-platforms` | `PLATFORMS` filtered to Tradovate/TradingView/NinjaTrader; `PLATFORM_FEED.tradovate`; intro = "3 platforms… through Tradovate"; bot note = semi-auto allowed / full automation prohibited |
| 9 | Reviews | `#panel-reviews` | 4.5★, distribution scaled to ~64, 4 review cards rewritten (no Growth/Select/Lightning/WealthCharts) |
| 10 | Expert Review | `#panel-expert` | Pull-quote + prose: evaluations, instant funding, what stands out, where it isn't perfect |
| 11 | Restricted | `#panel-restricted` | **Single "Not Available" tier** (~124 countries) + residency/travel/VPN/KYC policy notes; official link fixed |
| 12 | General FAQ | `#panel-faq` | 9 Q&As, all Purdia |
| 13 | Sidebar | `.sidebar` | At-a-Glance (Eval & Instant · Daily · 3 active · $10k–$150k · EOD/Intraday/Static · None · $130) · "Instant Funding Sale · CPF" · Trustpilot 4.5/64 · similar firms (Topstep, Alpha Futures) |
| 14 | Sticky CTA | `.sticky-bottom` | `PC` monogram · "Payouts in 1–3 Days · 90% Profit Split · No Hidden Rules" |

---

## 14b. Cornerstone conformance (verified against `cpf-tradeify.html`)

Checked against the canonical template + `cpf-page-system-handoff.md`:
- **Color tokens:** byte-identical `:root` + `html.dark` ramps (0 differing tokens, 0 missing/extra). Site accent `--orange:#F39200` unchanged.
- **Typography:** Inter + Source Serif 4, same usage.
- **Layout & components:** every canonical CSS component class is present (0 missing). Same 9 tabs, same 7 card sub-tabs, same sticky nav → breadcrumb → hero → tab bar → grid+sidebar → sticky bottom → rulebook modal.
- **Row-alignment convention:** label-left / value-right preserved (`.ac-stat-val`, `.pay-value`, `.rules-summary-row .value`, etc.).
- **Card-view selector:** consolidated onto the cornerstone's `cd-type-selector/cd-type-btn` + `cd-program-pills/cd-prog-btn` (previously bespoke `cd-cat-*`/`cd-pill` — removed).
- **Purdia-only additions (content layer, token-styled, no new colors / no structure change):** per-product accent classes `beginner/eod/pro/instant/static` (+ `type-beginner`, `sel-*`), the `.noeval-banner` "no evaluation" pill for instant types, and the `.compare-note-purdia` 2-product explainer note in the comparison view.

## 15. Conventions & known notes

- **Transform method:** Python `str_replace` scripts with exact-count asserts (`R(a,b,n)`) / slice-replace (`RSLICE`); JS validated after every change via Node `new Function()` over each `<script>` block (3 blocks, all pass). Playwright (Chromium) screenshots in light/dark/mobile.
- **Working/output:** edit `/home/claude/work/purdia.html`; final copy at `/mnt/user-data/outputs/cpf-purdia.html`.
- **`FULL_WIDTH_TABS`** (JS) = accounts, rules, payouts, restricted, faq (hide sidebar for width).
- **Dead but harmless:** the `hasScaling===true` branch of `renderScalingTab` (Select/Growth/Lightning text) is unreachable because every type sets `hasScaling:false`. The old `PAYOUT_DATA`/`renderPayoutCard` remain defined but unused; the live Payouts tab is driven by `PAYOUT_INFO` + `renderPayoutCard2()` / `renderAllPayoutCards()` (delegated handler on `#panel-payouts .account-card`). CSS class names `.growth/.select/.lightning` and a few JS code comments still mention the old names — internal only, not user-visible.
- **Do not fabricate:** CEO name (none public), exact Trustpilot internals beyond ~4.5/64, or any promo % — instant sale prices are the only real discounts and are hard-coded into the fee strings.
