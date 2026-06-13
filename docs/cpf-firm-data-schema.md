# Firm-Data Contract — the "fill a form, not build a page" schema

**What this is:** the single per-firm JSON shape that the cornerstone template renders from. It is reverse-engineered **verbatim from the real cornerstone renderer** (`ACCOUNT_DATA`, `PAYOUT_DATA`, `CARD_DATA`, `PHASE_LABELS` in `cpf-alpha-futures.html` / `cpf-tradeify.html`) — not invented. If a key here exists, it's because the template's `updateAccountCard()` / `renderPayoutCard()` reads it.

**Why it matters for the 54:** today a firm page is ~4 hours of manual building. With this contract, the page is fixed and validated; the only per-firm work is **populating one JSON and clearing its `‹VERIFY›` flags**. That's the time drop.

---

## 1. How the renderer consumes data (the contract you can't break)

The template merges `fixed` + the selected `sizes[size]` and writes each key to the element with the matching `data-field` / `data-payout-field`:

```js
const merged = Object.assign({}, phaseBlock.fixed, phaseBlock.sizes[size]);
el.textContent = merged[field];   // only set when merged[field] !== undefined
```

Consequence: **any key the HTML references but the JSON omits is left at the HTML default.** So "render-complete" = the JSON defines every key in §3. A `‹VERIFY›` value still renders (it shows the flag), which is the safety net — an unconfirmed field is visible, never silently wrong.

---

## 2. Top-level shape

```jsonc
{
  "meta": {
    "name": "Take Profit Trader",
    "slug": "take-profit-trader",          // = live /prop-firm/<slug>/
    "url": "/prop-firm/take-profit-trader/",
    "pattern": "eval-only",                // "eval-only" (Alpha) | "eval+instant" (Tradeify)
    "accent": "--green",                   // existing palette token ONLY; never recolor --orange
    "sizes": ["25K","50K","75K","100K","150K"],
    "products": [                          // 1–3 slots. slot key = internal, immutable; label = public
      { "slot": "pro", "label": "Pro Account" }
    ],
    "platforms": ["Tradovate","TradingView","NinjaTrader"],
    "instruments": "Futures",
    "promo": "30% off all evaluations for life · no activation fee",
    "source": { "wp": "/prop-firm/take-profit-trader/", "helpCenter": "‹VERIFY URL›", "pulled": "2026-06-12" }
  },
  "account_data": { "<slot>": { "eval": { "fixed": {…}, "sizes": {…} }, "funded": { "fixed": {…}, "sizes": {…} } } },
  "payout_data":  { "<slot>": { "fixed": {…}, "sizes": {…} } },
  "card_data":    { "<slot>": {…} },
  "phase_labels": { "eval": { "consistency": "Consistency (Eval)" }, "funded": { "consistency": "Consistency (Funded)" } },
  "tab_content":  { "rules": "…", "faq": [{ "q":"…","a":"…" }], "restricted": ["…"] }
}
```

**Product count is a layout variant, not data.** 1 product → 1 comparison column; 3 → 3 (like Alpha). The JSON drives *values*; the template variant (how many `account-card` columns) is selected per firm. Most of the 54 are 1–2 products, so they're *simpler* than the cornerstones, not harder.

---

## 3. Required key dictionaries (exactly what the renderer reads)

**`account_data[slot].eval.fixed`** — `evalSteps, consistency, daysToPass, maxAccounts, resets, news, bots` (+ `activation` if the firm charges one)
**`account_data[slot].eval.sizes[size]`** — `target, drawdown, dailyLoss, maxContracts`
**`account_data[slot].funded.fixed`** — `target, daysToPayout, consistency, scaling, maxAccounts, resets, split, news, bots`
**`account_data[slot].funded.sizes[size]`** — `maxPayout, drawdown, dailyLoss`
**`payout_data[slot].fixed`** — `minPayout, target, buffer, days, perDay, consistency, split`
**`payout_data[slot].sizes[size]`** — `maxPayout, maxPayoutSub, drawdown, dailyLoss`
**`phase_labels`** — `eval.consistency`, `funded.consistency`
**`card_data[slot]`** (card view) — `icon, name, tag, tagClass, sub, split, splitFull, targetSub, payoutsTop, minDays, evalMinDays, fundedMinDays, consistencyEval, consistencyFunded, instruments, firstPayout, subsequent, frequency, accountReset, about, features[], bestFor[], notIdeal[], ctaText, sizes{}`

These map 1:1 to the uniform **12 eval / 12 funded / 11–14 payout** row schema. `cpf-firm-data.schema.json` enforces them; `seed-check.mjs` reports coverage + counts unresolved `‹VERIFY›`.

---

## 4. Canonicalization still applies

Every value passes through `cpf-canonical-phrases.json` before it's final: durations as `"5 trading days"` / `"5 winning days"` (never bare "days"), drawdown as `"$2,000 (EOD)"`, absence as `"None"` / `"No Buffer"`, split as `"90% / 10%"`. Two firms sharing a value must produce the identical string. New shared values get added to the phrase bank, not forked.

---

## 5. The per-firm workflow (what replaces the 4 hours)

1. **Seed** the JSON: copy confirmed values from the firm's live WP page; `‹VERIFY›` everything not certain.
2. **Verify** against the firm's own help center — clear `‹VERIFY›` flags (this is the only human-judgment step; it must stay human at your accuracy bar).
3. **Render**: drop the JSON into the template for its product-count/pattern variant.
4. **Gate**: `seed-check.mjs` (data complete?) → `validate.mjs` (page contract?) → ship.

Seeding is mechanical and batchable (many firms per pass). Verifying is fast review, not authoring. That is the difference between 54 × 4 hours and a multi-day verify queue.
