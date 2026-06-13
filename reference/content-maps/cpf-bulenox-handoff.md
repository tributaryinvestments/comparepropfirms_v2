# ComparePropFirms — Page Build & Implementation Handoff (Bulenox)

**Deliverable:** `cpf-bulenox.html` (self-contained) + `cpf-bulenox-content-map.md` (data reference)
**Audience:** the agentic AI implementing CPF firm pages onto the WordPress/Elementor site.
**Modeled on:** the CPF page-system handoff format (same template family as Take Profit Trader, Topstep, Tradeify). **Tradeify is the cornerstone/master template.**

---

## 0. TL;DR for the implementing agent
- The file is a **single, self-contained HTML document**: all CSS is inline in one `<style>` block, all JS is in **three `<script>` blocks**, and **all images are inline base64** (no external asset requests).
- **Do not run it through a bundler/minifier that re-parses JS as modules.** It's plain vanilla JS. The only build-time gate is: **each of the 3 script blocks must pass `node --check`** (expect "3/3").
- To embed in WordPress/Elementor: drop the whole file into a **Custom HTML / HTML widget** (or a full-width page template). Because it's self-contained, nothing else needs to be uploaded.
- **Firm-specific content lives in data + copy; the design system is locked.** See §6 for exactly what is safe to change per firm.

---

## 1. What this file is
A complete prop-firm review page rendered as one HTML artifact. No framework, no build step, no external CSS/JS/fonts-as-files. Fonts are loaded via Google Fonts `<link>` (Inter + Source Serif). Everything else is in-document.

## 2. Tech constraints (hard rules)
1. **Three `<script>` blocks**, all vanilla JS. After any JS edit, validate: extract each block and run `node --check`. All three must pass.
2. **No browser storage APIs** (`localStorage`/`sessionStorage`) — state is in-memory JS only.
3. **Inline base64 images only** for logos/badges — keeps the page portable into any CMS without an asset pipeline.
4. **UTF-8.** The HTML stores real Unicode (e.g. em dash `—`, middot `·`, curly punctuation). Inside JS string literals, escape sequences like `\u2014` are fine, but **prefer straight ASCII apostrophes** in visible copy.

## 3. Design system (LOCKED — do not redesign per firm)
- **CSS custom properties (tokens)** define all color/spacing. Light + dark themes via a `--token` set that flips on the dark-mode class.
- **Typography:** Inter (UI/body) + Source Serif (display headings).
- **Per-firm accent:** the only color that changes per firm. **Bulenox accent = orange** (`--orange: #F39200` light / `#ff9f2e` dark).
- **Alignment convention:** spec rows are **label-left / value-right**, values right-aligned.
- **Dark-mode:** the page forces a correct background under browser dark-mode; don't strip the dark tokens.

## 4. Page anatomy (top → bottom)
1. **Hero** — firm name, logo, BBB badge, **CPF score** (Bulenox = **4.3**), one-line verdict.
2. **"As Featured In"** strip (greyscale press logos) — shared site chrome.
3. **Comparison table** — Bulenox vs similar firms (featured column highlighted).
4. **Scoring rubric** — 6 categories (Pricing & Value 4.6, Profit Split 5.0, Trading Rules 5.0, Payout Speed 4.3, Platforms & Tools 4.2, Customer Support 4.5).
5. **9 tabs** (the `.tab` buttons → `.panel#panel-<name>`):
   `overview · accounts · rules · payouts · platforms · reviews · expert · restricted · faq`
6. **Right sidebar** — "Compare Similar Firms" cards (hidden on the full-width tabs: accounts, rules, payouts, restricted, faq).
7. **Full Rules Playbook modal** — sections **mod-1…mod-6** (Trading, Risk Rules, Payouts, Operations, Policies, Important Notes). *(Section 7 "FAQs" was intentionally removed.)*

## 5. JS architecture (where the data lives)
- **`CARD_DATA`** — per-product (`growth` = Trailing, `select` = EOD) × per-size object: fee, activation, target, dll, maxloss, contracts, split, payout fields, consistency, min days, `about`, etc. Drives the expandable detail **Card View**.
- **`GROWTH_FUNDED` / `_EOD_PAY` / `SELECT_PROGRAMS` / `SELECT_CAPS` / `PAYOUT_CAPS`** — Master-account payout policy (threshold, safety **reserve/buffer**, min/max payout, steps). **This is the payout source of truth in code — keep it aligned with the content map §5.**
- **`PLATFORMS`** — array of 20 platform objects: `{ key, name, feed, logo (base64), tags[], desc, + style flags }`. Renderer `platformIconHTML(p, kind)` picks the tile treatment from flags:
  - `fill` → image covers the tile edge-to-edge (square app-icons).
  - `chip` → white rounded chip + contained logo (logos that read on white).
  - `bg: "#hex"` → tile background color matched to the logo's own background (dark-mode logos).
  - `zoom` → enlarge a wide wordmark inside the tile.
- **View toggles:** Accounts tab has **Card View** (`#view-card`) and **Comparison View** (`#view-comparison`); a **phase toggle** (Evaluation / Funded) re-renders comparison stats. `renderPayoutsTab()` builds the Payouts tab.
- **Render pattern:** `setText(field, val)` writes to all `[data-cd="field"]`; `setPay(...)` writes `[data-pay="..."]`; payout/comparison cards use `[data-payout-field]` / `[data-field]`.

## 6. Firm-specific vs LOCKED (what to edit when forking a new firm)
**Edit per firm (content):**
- All copy, the CPF score + rubric, the comparison table, hero/verdict, reviews, expert review, FAQ.
- All numeric data in `CARD_DATA` and the payout policy objects (use the firm's content map).
- The `PLATFORMS` array (logos + roster).
- The accent token value.
- The rules summary + detailed rules + modal rulebook text.

**Do NOT change (locked design system):**
- Layout, grid structure, tab framework, modal framework, JS render functions, token names, typography, alignment convention, responsive breakpoints.

## 7. Logos (PLATFORMS) — practical notes
- Logos are inline base64 PNGs, downscaled (~128px max dim) and palette/size-optimized to keep the page light.
- Match each tile background to the logo's own background (white chip for white logos; matching dark `bg` for dark-mode logos; `fill` for square icons) so nothing looks pasted-on.
- **Known dark-mode logos:** **Volfix** (near-black wordmark) and **Trade Navigator** (white "NAVIGATOR" text) only exist as dark-background art here, so they stay on dark tiles. To put them on white you'd need light-background source files.

## 8. WordPress / Elementor implementation steps
1. Create the firm page (or template). Use a **full-width**, no-sidebar layout so the page's own chrome controls width.
2. Add an **HTML widget** (Elementor) or a **Custom HTML block** (Gutenberg) and paste the **entire** `cpf-bulenox.html` contents.
   - If the theme injects its own container max-width that fights the layout, wrap the embed in a full-width section or use a blank/canvas page template.
3. Confirm the Google Fonts `<link>` is allowed (or self-host Inter/Source Serif and swap the `<link>` for `@font-face` if the CSP blocks external fonts).
4. No other assets to upload — logos/badges are inline.
5. Publish, then run the QA checklist (§10) on desktop, tablet, and mobile.

> If you prefer not to paste a large inline block into the editor, host the file as a static asset and embed via `<iframe>` sized to the content — but the inline HTML-widget route keeps it indexable and styled with the rest of the page.

## 9. Responsive behavior
- Tabs/panels reflow; full-width tabs drop the sidebar.
- **Accounts → Comparison view** and **Payouts** tab: the two product cards are **centered and width-capped (≤460px)**, and the **five account sizes render on a single row on all devices** (desktop/tablet 2-up cards, mobile stacks to 1-up; size grid stays 5-wide). Breakpoint at **760px**.

## 10. QA checklist
- [ ] All 3 `<script>` blocks pass `node --check` (3/3).
- [ ] No console errors; tab switching, view toggle, phase toggle, and the rules modal all work.
- [ ] Payouts tab + Accounts comparison view: **5 sizes on one row**, cards centered, no empty band above the sizes — desktop/tablet/mobile.
- [ ] Payout values match content map §5 (safety reserve buffer, first-3 caps, 40% consistency, weekly Wed, ACH/Wire·PayPal·Wise, 100%→90% split). **No "winning days" / "profit goal" / "50% of profit" wording anywhere.**
- [ ] Hedging shows **Not Allowed** in all four places (rules summary, rules list, modal side-row, modal card) with the "no specific rule but generally not allowed" note.
- [ ] Modal rulebook ends at section 6 (no section 7).
- [ ] All 20 platform logos render with correct tile treatment; no monograms.
- [ ] Apostrophes display correctly (no literal `\u2019`).

## 11. This build's change log (most recent session)
- Payout engine de-Tradeified: removed "50% of profit", "After 5 winning days", "winning-day count resets"; both products now show the real Bulenox model (10 trading days, 40% consistency, safety-reserve buffer, first-3 caps then uncapped, weekly Wed, 100%→90%). Added a **Safety Reserve (buffer)** row; replaced Rise Pay/Plane methods with **ACH/Wire, PayPal, Wise**.
- **Hedging → Not Allowed** (4 locations) + note. Removed **rules-playbook section 7 (FAQs)** and its nav links.
- **Payouts tab + Accounts comparison view:** centered, width-capped cards; **5 sizes on one row, all devices**; removed the whitespace band above the sizes.
- **Platforms:** built the full **20-logo** roster (real base64 logos, all Rithmic, Inside Edge excluded); recompressed all logos (page ~580KB). Whitened OverCharts/MedvedTrader/Photon, then **reverted OverCharts to its dark version** per request; **restored the exact Tradeify MotiveWave logo**. Volfix & Trade Navigator kept on dark tiles (see §7).
- Apostrophe/encoding fixes across FAQ + JS.
- Overview comparison table: corrected **Topstep profit split to 90/10** (Topstep no longer offers 100% on the first $10K).
- Accounts comparison view: rebuilt to a **uniform 12-row schema** for both toggles (Eval: Evaluation Steps, Profit Target, Total Drawdown, Daily Loss Limit, Days to Pass, Consistency Rule, Max Contracts, Max Accounts, Account Resets, Activation Fee, News Trading, Bots/Algo — Funded swaps in Max Payout, Days to Payout, Contract Scaling Plan, Profit Split). Driven by `ACCOUNT_DATA` + `PHASE_LABELS`; every row is label- and value-dynamic by phase.
- Payouts tab: rebuilt to a **uniform 11-row schema** (Max Payout, Max Payout (Subsequent), Minimum Payout, Profit Target, Withdrawal Buffer, Total Drawdown, Daily Loss Limit, Days to Payout, Profit / Trading Day, Consistency Rule, Profit Split). Driven by `PAYOUT_DATA`; dropped the old Methods/Frequency rows.
- Both schemas are a **deliberate deviation from the cornerstone**, intended to propagate to Tradeify + all firm pages. `‹VERIFY›` Profit / Trading Day = "No minimum".

## 12. Known follow-ups / flags
- **Volfix & Trade Navigator** logos: dark tiles only (need light-bg source files to go white).
- **Select 50K contract value** and global **"Max Loss (EOD)"** labeling: confirm/decide before propagating across the firm series.
