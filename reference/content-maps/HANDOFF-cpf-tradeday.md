# HANDOFF — cpf-tradeday.html

**Audience:** an agentic AI implementing this TradeDay review page on the live ComparePropFirms.com site, or making further edits to it.
**Read this top to bottom before touching the file.** The companion `tradeday-content-map.md` is the factual source of truth; this doc is the structural + procedural one.
**Status:** complete and validated. JS `node --check` **3/3**, `<div>` balance **1242/1242**, `<details>` **10/10**, jsdom runtime **0 errors**.
**File:** `cpf-tradeday.html` — self-contained single page, ~6,310 lines, ~373 KB (one logo + one platform icon embedded as data URIs inflate the size).

---

## PART 0 — What this file is

A **self-contained, single-page TradeDay prop-firm review** for ComparePropFirms.com: all CSS is inline in one `<style>`, all JS is in three `<script>` blocks, no external assets except font links and two embedded data-URI images. It is built on the canonical cornerstone template (`cpf-tradeify.html`) and shares that template's design system, 9 content tabs, and component vocabulary.

The conversion model is **compare → pick → get funded** (affiliate). Every outbound CTA points to `https://www.tradeday.com/?a_aid=cpf` with `rel="sponsored noopener"`.

**Golden rule:** content/data/wording and per-product accents change per firm; **design system, layout, and component structure do not.** If an edit would change the look or structure rather than the data or copy, it is out of scope — stop and confirm.

---

## PART 1 — Files & sources of truth

**Deliverables (this set):**
- `cpf-tradeday.html` — the page. Drop-in ready.
- `tradeday-content-map.md` — **the factual source of truth.** Every figure on the page must match it. Contains the verified TradeDay 2.0 data, the "TradeDay 2.0 vs. help-center" accuracy note, pricing, specs, rules, restricted countries, and a Round-by-round changelog. CPF editorial score = **4.3**.
- `HANDOFF-cpf-tradeday.md` — this file.

**Upstream reference (do not edit):**
- `cpf-tradeify.html` — the canonical cornerstone. The single source of structural truth; diff against it when unsure how a component should look or behave.

---

## PART 2 — Editing discipline (NON-NEGOTIABLE)

Every edit on this page system is made this way. Follow exactly.

1. **Guarded anchor-splice.** Edit in Python with a helper that asserts the match count *before* replacing, and writes the file only if every assertion passes:
   ```python
   def ap(old, new, n=1):
       assert h.count(old) == n, f"[ABORT] {n}!={h.count(old)}: {old[:80]!r}"
       h = h.replace(old, new)
   ```
   Never blind-replace. If an anchor isn't unique, lengthen it with surrounding context.
2. **HTML prose uses real Unicode** (`–` U+2013, `—` U+2014, `→` U+2192, `≤` U+2264, `×` U+00D7, `ⓘ` U+24D8, `✓ ✕ ⚠ 🛑`). **JS string literals store Unicode as `\uXXXX` escapes** (e.g. `name: 'Quick Pay \u2014 EOD'` is six literal characters in the file). So a Python edit targeting JS-string content must match the **escaped** form — use a raw string (`r"... \u2014 ..."`) or double the backslash. Editing JS strings with the real char will silently fail to match.
3. **Never `%`-format strings containing `%`** (`"30%"`, `"90/10"`). Use `.replace()`.
4. **Validate JS after every change.** Extract the three `<script>` blocks and `node --check` each — **expect 3/3.** Block 0 = `<head>` dark-mode bootstrap; block 1 = main data + render block; block 2 = late/theme block. (Beware glob collisions when naming temp files, e.g. `/tmp/b*.js` also matches `/tmp/blk*.js`.)
5. **Check structural balance after every change:** `<div>` == `</div>` (currently 1242) and `<details>` == `</details>` (10).
6. **Runtime-test with jsdom** (installed; run from the working dir): load the page with `runScripts:'dangerously'`, stub `scrollTo`/`matchMedia`/`IntersectionObserver`, capture `console.error` + window `error`. Then exercise: switch the three card-view product toggles, flip the Eval/Funded phase toggle, open the rulebook modal. **Expect 0 errors.** A Playwright/Chromium headless screenshot pass is the final visual check if the environment allows it.
7. **Work in a scratch copy**, then copy the finished file to `/mnt/user-data/outputs/` and `present_files` the page first, content map second.
8. **Reuse existing palette tokens only** — no new colors, no hardcoded hex in content. Per-product accents come from `--purple` / `--blue` / `--orange` (light) only.

---

## PART 3 — Page architecture

### 3.1 Layout
- Sticky site nav (`.nav-logo` = "ComparePropFirms." — the **site** logo, not the firm).
- Hero: `.hero-logo` tile (now the embedded TradeDay wordmark; see 3.4), rating, promo CTA wrapper.
- 9 content tabs (`.panel` sections): Overview, Accounts, Rules, Payouts, Platforms, Scaling, Pros/Cons, FAQ, etc. Each driven by a tab nav.
- Full-rulebook **modal** (`#rulebook-modal`), opened from two triggers (`#open-rulebook`, `#open-rulebook-2`) via `openRulebook()`.

### 3.2 The Accounts tab has TWO views
- **Comparison view** — three `.account-card` columns (`growth` / `select` / `lightning`) with an **Eval/Funded phase toggle** (`.phase-toggle-btn[data-phase]`, revealed only in Comparison View by the view-toggle handler). The toggle adds/removes `.phase-eval` on `.compare-grid`. **As of Round 4 each card holds TWO row-blocks** — `.ac-stats.ac-stats-eval` (12 rows) and `.ac-stats.ac-stats-funded` (12 rows) — and CSS shows exactly one per phase (`.ac-stats-funded{display:none}`; `.compare-grid:not(.phase-eval) .ac-stats-eval{display:none}` / `…-funded{display:block}`). The old `.acp-eval`/`.acp-funded` price↔max-payout swap is **retired**: `.ac-size-price` now always shows the price (`.acp-funded` permanently hidden); **Max Payout is its own funded row** instead. Account sizes use `.ac-sizes { grid-template-columns: repeat(3,1fr) }`.
- **Card view** — three `.cd-type-btn[data-cardtype]` toggle buttons select a product; a chevron stat strip (`.cd-flow-*`) plus six `.cd-tab-panel` sub-tabs (Overview, Evaluation, Funded, Scaling, Payouts, FAQ) render the selected product. Values are set by JS (`data-cd="…"` hooks).

### 3.3 The two JS data objects (don't confuse them)
- **Comparison-card data** `ACCOUNT_DATA` (~lines 5070–5160): per-product `eval`/`funded` blocks, each `{ fixed, sizes }`. **Round-4 field set** — eval.fixed: `evalSteps, consistency, daysToPass, maxAccounts, resets, activation, newsTrading, bots`; eval.sizes[size]: `target, dll, drawdown, contracts`; funded.fixed: `consistency, daysToPayout, scaling, maxAccounts, resets, split, newsTrading, bots, target`; funded.sizes[size]: `dll, drawdown, maxPayout`. `updateAccountCard` merges `fixed+sizes` for the active `phaseState` and writes every `data-field` cell in the card (both blocks are populated; CSS hides the inactive one). `rerenderAllAccountCards` runs on load and on phase switch. (`PHASE_LABELS` / `data-label-key` are now unused but harmless.)
- **Payouts-tab data** `PAYOUT_DATA` (~line 6156): `{ growth, select, lightning }`, each `{ sizes: { "50K"|"100K"|"150K": {…} } }`. Each size object carries all 11 payout fields: `maxPayout, maxPayoutSub, minPayout, profitTarget, buffer, drawdown, dll, daysToPayout, profitPerDay, consistency, split`. `renderPayoutCard(account,size)` (Round-4: simplified to a single sizes-based path — the old `select` flex/daily special-case was removed) writes the `data-payout-field` cells; size pills (`.ac-size[data-payout-size]`) re-render on click; init loop populates the default 50K on load.
- **Card-view detail data** (~lines 5230–5300): per-product objects with `name`, `tag`, `icon`, `split`, `splitFull`, `payoutsTop`, `firstPayout`, `accountReset`, etc., plus a per-size map (`fee`, `feeBase`, `target`, `dll`, `maxloss`, `maxlossShort`, `contracts`, `activation`). Feeds the card-view via `renderCardView` and the sub-tab renderers.

Key render functions: `renderCardView` (5336), `renderEvaluationTab` (5578), `renderFundedTab` (5735), `renderPayoutsTab` (5883), `scalingChartSVG`/`renderScalingTab` (5913/5938), `renderFAQTab` (6058). Helpers: `setText(key, val)` sets all `[data-cd="key"]`; `setFeeHTML` renders the struck-through price. `applyTabLayout` (4977) wires the sub-tabs. Platform icons render from a `PLATFORMS` data array via `platformIconHTML()`.

### 3.4 Embedded images (data URIs)
- **Hero logo** — TradeDay wordmark PNG, in `.hero-logo` (navy `#253141` tile, `object-fit: contain`, replaces the old "TD" monogram).
- **Jigsaw platform icon** — blue puzzle-piece PNG on the `jigsaw` `PLATFORMS` entry (`logo` + `chip:true`).

---

## PART 4 — Per-product mapping (TradeDay's three card columns)

| Slot key | Card-view **title** (JS `name`) | **Toggle** label | Account type | Funded drawdown |
|---|---|---|---|---|
| `growth` | **Quick Pay** | Quick Pay (Intraday) | Quick Pay | Intraday trailing |
| `select` | **Quick Pay — EOD** | Quick Pay (EOD) | Quick Pay | EOD trailing |
| `lightning` | **Fast Pass — EOD** | Fast Pass (EOD) | Fast Pass | EOD trailing |

`setText('name', d.name)` also drives the "About …" heading (`'About ' + d.name`) and the FAQ heading. Per-product accent: growth→`--purple`-family, select→`--blue`, lightning→`--orange` (mapped in CSS by `data-cardtype`); do not recolor.

---

## PART 5 — TradeDay facts that matter most (verify against the content map)

These are the corrections baked into the page this round — confirm them when implementing or re-verifying:

- **Profit split:** Quick Pay Funded Sim **50/50 ≤ $4k net, 80/20 > $4k**; Fast Pass Funded Sim **80/20**; **Funded Live 90/10**. The accounts tab leads with **80% / 20%** (most traders stay in Funded Sim); 90/10-on-Live is kept as context.
- **Payouts:** Quick Pay = day one, **no per-request cap** (above buffer; buffer = start + Max DD = $52k/$103k/$154k). Fast Pass = after **5 profitable days**, ≤50% of balance and capped **$2,000 / $2,500 / $3,000** by size. $250 min request, ≤24 hr processing via Riseworks.
- **No daily loss limit anywhere.** Drawdown is **Intraday or EOD trailing** (trails to starting balance, then locks). "TMD" jargon removed sitewide.
- **News trading: NOT allowed** — Tier-1 data-release lockout (NFP/FOMC/CPI/GDP/EIA), positions auto-liquidated 2 min before/after, profits forfeited, eval + funded.
- **Bots conditional** (own algos OK; third-party/purchased + >200 trades/day prohibited). **Hedging across accounts, VPN/VPS/IP masking: prohibited.** Copy trading across own accounts allowed.
- **Consistency** 30% (Quick Pay eval) / 45% (Fast Pass eval); none funded. **Resets: evaluation only** ($60–$225; free courtesy reset at renewal; funded can't be reset).
- **Pricing** (50% off, monthly subscription, **no activation fee**), specs, and the ~73-country restricted list (with **Canada-outside-Ontario & Germany** = Funded-Sim-only) are in the content map.

---

## PART 6 — Changelog (what was done)

- **Round 1 (cornerstone parity):** ported platforms to the data-array pattern, cornerstone CTA wrapper, removed Alpha/Quantower leftovers, design-system parity.
- **Round 2:** jigsaw icon; accounts tab (3-col sizes, removed fake "50% Off/TDNEW" toggles, pure-CSS Funded max-payout swap, corrected card-view payouts to the Quick Pay/Fast Pass model); rules "Other Policies" fixes + Platforms item removed; Germany added to Conditional tier; **rulebook modal fully rewritten** to TradeDay-accurate values and **restructured 3-col → 2-col** (sidebar moved under the left column, Section 7 FAQ + redundant "Need Help" removed).
- **Round 3:** news trading → Not Allowed throughout; hero logo image; **Tradable Products** rule-item added (refills the 5-col Other Policies grid); accounts-tab profit split standardised to 80/20 (90/10 kept as context); Fast Pass payouts chevron "Scaling" → "After 5 days"; resets = evaluation only; "Min Trading Days" → "1–5 days"; "cross-account hedging / DCA" → "Martingale / DCA" and VPN/VPS corrected to Prohibited; "TMD" removed + card-view stat values right-aligned; max accounts standardised to "Up to 6".
- **Round 4 (uniform comparison rows):** rebuilt the Accounts **comparison view** into two phase row-blocks — **Eval (12 rows):** Evaluation Steps · Profit Target · Total Drawdown · Daily Loss Limit · Days to Pass · Consistency Rule · Max Contracts · Max Accounts · Account Resets · Activation Fee · News Trading · Bots / Algo Trading. **Funded (12 rows):** Max Payout · Profit Target · Total Drawdown · Daily Loss Limit · Days to Payout · Consistency Rule · Contract Scaling Plan · Max Accounts · Account Resets · Profit Split · News Trading · Bots / Algo Trading. Funded toggle now keeps the **price** pills (Max Payout moved to a row). Rebuilt the top-level **Payouts tab** into a uniform **11-row** per-size list (Max Payout · Max Payout (Subsequent) · Minimum Payout · Profit Target · Withdrawal Buffer · Total Drawdown · Daily Loss Limit · Days to Payout · Profit / Trading Day · Consistency Rule · Profit Split), wired to a now-populated `PAYOUT_DATA`. **Judgment calls:** funded *Profit Target* = "No target"; funded *Profit Split* shown as % (the spec's "$0/Amount" was an Activation-Fee copy-paste); *Total Drawdown* shown as clean $ (intraday/EOD type lives in the product name/sub); *News Trading* = "No · Tier-1 lockout"; *Bots* = "Semi-auto"; *Max Contracts* = max 5/10/15 (Fast Pass scaling noted in the funded "Contract Scaling Plan: Yes" row).
- **Naming pass:** card-view titles → Quick Pay / Quick Pay — EOD / Fast Pass — EOD; Fast Pass toggle → "Fast Pass (EOD)".

---

## PART 7 — Open flags (decide before publishing)

1. **Max accounts = 6, not 5.** TradeDay's own help center (articles 103000354796 & 103000008833, updated 2026) says **up to 6 total** (max 3 active Funded Sim + 1 Funded Live, single-platform). The page is standardised to **"Up to 6."** Jered asked for 5; if the live site genuinely shows 5, change every `maxAccounts`/"Up to 6" occurrence.
2. **"Min Trading Days" = "1–5 days"** per request. The *evaluation* minimum is specifically 5 (Quick Pay) / 3 (Fast Pass); the "1" is Quick Pay's day-one funded payout. Confirm framing.
3. **Germany** in the Conditional (Funded-Sim-only) tier was added per site review — reconfirm scope/wording.
4. **Hidden card-view "Standard +$149" pricing toggle** remains in the code (`display:none`, not user-visible; `applyComparePricing` is now a no-op since the comparison cards carry no `[data-select-activation]` cell) and the comparison-table competitor cell "$149 or $0" is competitor data — both left intentionally.
5. **Rules-summary leftovers not in scope:** "Payout Frequency: Every 3 days" and "Payout Methods: Rise Pay, Plane" look like template residue (should be ~24 hr / Riseworks) — flagged, not changed.

---

## PART 8 — Final verification checklist (run before declaring done)

- [ ] `node --check` on all three `<script>` blocks → **3/3**.
- [ ] `<div>` == `</div>` (1242) and `<details>` == `</details>` (10).
- [ ] jsdom: toggle all three products, flip the phase toggle, open the modal → **0 console/window errors**.
- [ ] Spot-check that every visible figure matches `tradeday-content-map.md`.
- [ ] (If available) Playwright headless screenshot of Overview, Accounts (both views, both phases), Rules, and the open modal.
- [ ] Outputs delivered and `present_files`'d: page first, content map second.

---

## PART 9 — One-line summary for the next agent

`cpf-tradeday.html` is a finished, validated, self-contained TradeDay review on the cornerstone system; edit only data/copy via guarded anchor-splices (escaped Unicode in JS strings), keep the design system untouched, re-run the PART 8 checks, and resolve the PART 7 flags before pushing live.
