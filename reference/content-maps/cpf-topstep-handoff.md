# Topstep Review Page — Implementation & Handoff Guide
*For the agentic AI deploying `cpf-topstep.html` to ComparePropFirms.com. Pair with `cpf-topstep-content-map.md` (data source of truth).*
*Last revised: 2026-06-08 (comparison + payouts rows now dynamic — see §5b).*

---

## 1. What this is
A single, self-contained **Topstep prop-firm review page** for ComparePropFirms.com.
- **File:** `/mnt/user-data/outputs/cpf-topstep.html` (~414 KB, ~6,450 lines).
- **Inline CSS + JS, no build step.** Only external dependency is **Google Fonts** (Inter, Source Serif 4).
- Forked from the **Tradeify cornerstone** template (structure/design system are shared across all firm pages).

## 2. Status: COMPLETE & validated
- JS validates **3/3** (`node --check` on the three `<script>` blocks).
- All **9 tabs** render with zero runtime errors (a Google-Fonts 403 in a sandbox is harmless).
- Tabs (`data-tab`): overview, accounts, rules, payouts, platforms, reviews, expert, restricted, faq.
- Verified on desktop (1280px) and mobile (390px).

---

## 3. How to deploy it to the site
This is a **drop-in, full-page artifact** — there is **no CMS data binding required**; every value is inline in the page's JS.
1. Publish as a **standalone full-width page/template** (e.g. Elementor "HTML" / Custom HTML block, a raw-HTML page template, or a static route). Do **not** wrap it in a narrow content column — it manages its own max-width and responsive layout.
2. Keep the Google Fonts `<link>`/`@import` intact (Inter + Source Serif 4). If the site already loads these globally, the duplicate is harmless.
3. **Wire up placeholder links before publish** (all currently `href="#"`):
   - Primary CTAs ("Get Funded →", hero/side CTAs) -> Topstep affiliate URL.
   - "Compare Similar Firms" rows -> the **Purdia Capital**, **Tradeify**, **Lucid Trading** review pages.
   - In-page anchors already work (e.g. "View all reviews →" -> `#panel-reviews`).
4. Set page `<title>`/meta as needed; the `<meta name="description">` is already Topstep-specific (mentions Tradeify and Lucid Trading).
5. **Re-verify pricing/promos** against topstep.com before publishing if time has passed (prop-firm pricing changes often).

---

## 4. Locked design decisions (do not change without asking)
1. **No promo code** -> "No Promo Code Needed" messaging (the cornerstone's code pills are intentionally absent).
2. **Overall CPF score = 4.8** (hero rating badge + comparison row). Expert rubric sub-scores stay as-is (Pricing 5.0 / Profit Split 4.9 / Payout Speed 4.9 / Trading Rules 4.8 / Platforms 5.0 / Support 4.9). **Trustpilot stays the honest 3.4.**
3. **Hero lead price = $85** (No-AF 50K with the optional DLL discount).
4. **Color scheme = site-standard ORANGE** (`--orange`). **Do NOT recolor** — every firm page shares this accent.
5. **Hero logo = embedded Topstep wordmark PNG** (base64, on a black `#000` tile in `.hero-logo`). NOT a monogram, NOT an image URL. The top-left **site** nav logo ("Compare Prop Firms") is a separate base64 PNG — leave it.
6. **Overview comparison table = Topstep (featured) vs Tradeify vs Lucid Trading.** (Bulenox was removed entirely — there are **zero** "Bulenox" strings left in the file.)
7. **Two purchase paths** fill the cornerstone's two product slots:
   - internal key `growth` = card title **"Standard"**, account-type toggle label **"Standard Plan"**, icon 💳, tag "Lower Monthly".
   - internal key `select` = **"No Activation Fee"**, icon 🚀.
8. **Three sizes: 50K / 100K / 150K.**
9. No-AF card/hero prices are shown **DISCOUNTED** ($85/$129/$199) with the base struck through ($95/$149/$229).
10. **Instruments label = "Futures"**; **drawdown label = "EOD trailing"** (comparison + At-a-Glance), an editorial normalization (see content map).

---

## 5. Accounts tab — Card View (most-edited area)
The Card View header (`.card-detail` -> `.cd-header`) stacks, in order:
1. `.cd-name` — icon + name ("Standard") + `.ac-tag`.
2. `.cd-mode-stack` (flex column, `align-items:center`, `gap:10px`):
   - **`.cd-type-selector`** (account-type toggle) — `.cd-type-btn[data-cardtype="growth"|"select"]` = **"💳 Standard Plan"** / **"🚀 No Activation Fee"**. (This row is on TOP.)
   - **`.cd-program-pills`** (XFA payout-mode toggle) — `.cd-prog-btn[data-program="standard"|"consistency"]` = **"Standard XFA"** / **"Consistency XFA"**. (This row is BELOW; `margin:0 auto` so the single 10px flex gap is the only inter-row spacing — keeps the two rows evenly centered.)
3. `.cd-sizes` — `.cd-size-btn[data-size="50K"|"100K"|"150K"]`. On **mobile** these align right (`.cd-header .cd-sizes { justify-content: flex-end }`).

Accent behavior: the selected account type drives the accent — **purple** for `growth`/Standard, **blue** for `select`/No-Activation-Fee — applied to both the type toggle and the active XFA pill (`.card-detail.type-select .cd-prog-btn.active` = blue).

Sub-tabs (`.cd-subtab[data-cd-tab-target=...]`): overview, evaluation, rules, funded, scaling, payouts, faq — each panel populated by `renderCardView()`.

---

## 5b. Accounts COMPARISON view + Payouts tab — dynamic rows (most-edited area)
Both the Accounts-tab **comparison** cards and the **Payouts** tab cards now build their `.ac-stats` rows **dynamically** from ordered row-builders (no static row markup is authoritative — the static HTML rows are overwritten on the init render). Each row is `[left label, right value]` → `<div class="ac-stat-row"><div class="ac-stat-label">…</div><div class="ac-stat-val">…</div></div>`.

- **`AC_SIZE`** (defined just after `FUNDED_MODE`) — shared per-size spec: `target`, `draw` (eval drawdown), `drawF` (funded drawdown, "locks $0"), `dll`, `contracts`. Reused by both builders.
- **`acRows(phase, account, size, mode, dllOn)`** — returns the comparison rows for `phase` = `'eval'` | `'funded'`. Eval = 12 rows; Funded = 12 rows (different sets). See content map "Accounts tab — comparison card rows" for the exact lists. `account` controls Activation Fee ($149 growth / $0 select); `mode` + `dllOn` control Max Payout / Days to Payout / Consistency Rule / DLL "(optional)→(added)".
- **`payRows(account, size, mode, dllOn)`** — returns the 14 Payouts-tab rows. Pulls caps from `PAYOUT_DATA`, drawdown from `AC_SIZE`, days from `FUNDED_MODE`.
- **`updateAccountCard(card, size)`** (comparison) — reads `phaseState` + `card.dataset.fmode`/`fdll`, sets `.ac-stats` innerHTML from `acRows(...)`, toggles the payout-mode/DLL controls' visibility (Funded only), and reflects switch state. It **no longer** swaps the size-button prices — Eval and Funded both show the static monthly **price**.
- **`renderPayoutCard(account, size)`** (Payouts) — sets `.ac-stats` innerHTML from `payRows(...)`, and updates each size button to its own Max Payout (×2 with DLL).

**If you add/reorder/reword a row, edit the builder array — not the HTML.** The static `.ac-stats` rows in the comparison cards (`#view-comparison`) and payout cards (`[data-payout-account]`) are just initial-paint fallback and get replaced on load (`rerenderAllAccountCards()` and the payout init loop both run at startup). The same builders should be copied verbatim to every firm page so row labels/order/wording stay identical site-wide.

Phase default: the comparison view **opens on Funded**; Card view stays on Evaluation (set in the view-toggle handler).

---

## 6. Key JS data structures (main `<script>`)
- **`AC_SIZE`** — shared per-size spec (`target`/`draw`/`drawF`/`dll`/`contracts`) feeding `acRows()` + `payRows()` (see §5b).
- `ACCOUNT_DATA` — legacy per-phase/per-size object; still present but the comparison cards now render via `acRows()` (ACCOUNT_DATA is no longer the row source). `CARD_DATA` still drives the Card View.
- `SELECT_LIST_FEE = {50K:'$95',100K:'$149',150K:'$229'}` — drives the No-AF list->discounted strikethrough via `feeHTML()`. **Do NOT reintroduce a discount-multiplier** (an old `PROMO_MULT` approach caused a "$49 -> $5" bug; this static map replaced it).
- **`FUNDED_MODE = { standard:{consistency:'None', minDays:'5 winning days'}, consistency:{consistency:'40% best day', minDays:'3 trading days'} }`** — drives the card-view funded fields per selected XFA payout mode.
- **`XFA_CAPS` / `XFA_CAPS_DLL`** — per-size, per-program payout caps (Standard $2K/$3K/$5K, Consistency $3K/$4K/$6K for 50K/100K/150K).
- `TAB_CONTENT` (`growth`/`select`) — `evalTitle`, `steps`, `completion`, `payouts`, **`scaling`**, `faqs`.
  - **`scaling`** (this is the per-size Scaling Plan — both paths share the same XFA plan):
    - `scaling.notes[]` = `{type:'green'|'amber', text}`.
    - `scaling.bySize[size]` = **array of `{equity, contracts}`** (ordered ladder). Example 50K: `[{equity:'Under $1,500',contracts:'2 minis (20 micros)'}, {equity:'$1,500–$2,000',contracts:'3 minis (30 micros)'}, {equity:'Above $2,000',contracts:'5 minis (50 micros)'}]`. 100K/150K are longer (see content map for all values).
    - There is **no `triggers` array** anymore (removed 2026-06-08). Milestone names are derived by index in `renderScalingTab` (Start / Tier N / Max).
- `PAYOUT_DATA` / `_TS_PAY_STANDARD` / `_TS_PAY_CONSISTENCY` — payouts-tab data (mode-keyed). Payouts identical across both purchase paths.
- `PLATFORMS` array — TopstepX, NinjaTrader, TradingView, Tradovate, Quantower, Sierra Chart, Bookmap, ATAS, etc.

### Renderers tied to the scaling data (if you touch scaling, update all three)
- `renderScalingTab(d)` — reads `vals = sc.bySize[size]`; `startC = vals[0].contracts`, `maxC = vals[last].contracts`; milestone table uses `vals[idx].equity` + `vals[idx].contracts`; chart call is `scalingChartSVG(vals.map(v => v.contracts.split(' (')[0]))`.
- `scalingChartSVG(arr)` — takes an array of short contract strings, draws the staircase (handles 3–6 points).
- The overview sub-tab's 📊 Scaling cd-block (`scOv` block in `renderCardView`) reads `scVals[i].contracts` / `scVals[1].equity`.

---

## 7. Payouts tab toggle (important nuance)
- The Payouts tab now renders **14 rows** via `payRows()` (see §5b) — Max Payout, Max Payout (Subsequent), Minimum Payout, Profit Target, Withdrawal Buffer, Total Drawdown, Daily Loss Limit, Days to Payout, Profit / Trading Day, Consistency Rule, Profit Split, Per Request, Payout Frequency, Processing Time. Exact values in the content map.
- Each payout card has a **Standard / Consistency** toggle that switches the cap amounts per size.
- **Those caps are set by payout MODE, NOT by the Daily Loss Limit.** (Verified vs help.topstep.com payout policy.) The DLL is a separate optional add-on that affects *price* and the *daily-break threshold* — and, via the limited-time promo, **doubles** the per-request cap.

---

## 8. Edit & validation techniques (reuse)
- Anchor-splice in Python with a guarded helper: `assert h.count(old)==n` before `h.replace(old,new)` (aborts without saving on mismatch).
- **CRITICAL:** never run Python `%`-formatting on a string containing a literal `%` ("50%","40%","90%") — use a placeholder token + `.replace()`.
- **String-literal gotcha:** in JS string literals this file uses `\uXXXX` ESCAPE sequences (match `\\uXXXX` in Python); in HTML content it uses the actual unicode char. Always re-grep exact strings before editing — line numbers shift between batches.
- **JS validation:** regex-extract `<script>` blocks, write each to `/tmp`, `node --check` each. Expect **3/3**.
- **Render check:** Playwright Chromium headless (`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`); click `.tab[data-tab="X"]`, `.view-toggle-btn[data-view="card"]`, sub-tabs, size/type/program buttons; screenshot. Google-Fonts 403 is harmless.
- `present_files` to deliver.

---

## 9. Accuracy notes (verified 2026)
- **Scaling Plan** ladders match Topstep's official scaling chart exactly (stakeholder-supplied image): 50K 2->3->5, 100K 3->4->5->10, 150K 3->4->5->10->15 minis; caps 5/10/15 minis (x10 micros). Applies to XFA only (Live = Dynamic Live Risk Expansion); limits update next session, not mid-session.
- **90/10 split** from dollar one for accounts created after Jan 12, 2026 (pre-Jan-12 grandfathered to 100% of first $10K then 90/10). Page uses 90/10. Do NOT reintroduce "100% of first $10K" anywhere.
- **Payout caps** (per request = 50% of balance, up to): Standard 50K/100K/150K = $2,000 / $3,000 / $5,000; Consistency = $3,000 / $4,000 / $6,000.
- **"EOD trailing"** is the on-page drawdown label for cross-firm consistency; Topstep's MLL is technically monitored intraday in real time (editorial normalization — confirm if you want it distinguished).
- Combine pass objectives = profit target + best day < 50% of target; one hard rule = the MLL.
- **Pricing/promos change often** — re-verify before publishing.

---

## 10. Open items to confirm with stakeholder
- **Comparison view opens on the Funded phase.** Now that Evaluation leads the row spec, confirm whether it should open on Eval instead (one-line change in the view-toggle handler: set `phaseState='eval'` + add `phase-eval` class + mark the eval phase button active when entering comparison view).
- **Canonical row wording** (in `acRows`/`payRows`, must stay identical across all firm pages): "No minimum", "5 winning days", "3 trading days", "Up to 50% of balance", "Max Payout (Subsequent) = same cap", "No buffer", "Instant–3 days (by method)". Change once here, then propagate.
- **Affiliate / cross-link URLs** for all `href="#"` CTAs and the Purdia Capital / Tradeify / Lucid Trading similar-firm cards.
- No-AF hero/card prices are shown as the **DLL-discounted** figures ($85/$129/$199) with the base struck through. If they'd rather headline the undiscounted base, it's a swap in `CARD_DATA.select` + `SELECT_LIST_FEE` + hero markup.
- Scaling first-tier wording: page says "Under $1,500"; Topstep's chart says "Below $1,500" (identical meaning — change only if verbatim match is wanted).
