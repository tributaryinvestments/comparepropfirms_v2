# Funded Futures Network (FFN) — Content Map & Data Reference
*Single source of truth for the ComparePropFirms.com FFN review page (`cpf-ffn.html`). Keep this in sync with the page. Built on the Tradeify cornerstone (`cpf-tradeify.html`); see `cpf-ffn-handoff.md` for how the design system maps.*

> **Data-confidence legend:** ✅ verified against the firm's site/help center · ⚠️ **placeholder / unverified — confirm before publish** · 🔁 generic/derived (re-verify per size).

---

## Company
- **Funded Futures Network LLC (FFN)** — futures prop firm. Founded **2022** by **Jay & Kevin Swart**; **Kevin Swart is CEO**. Operates from **New York City (99 Wall St)**; LLC **registered in Florida**. ✅ *CEO/founder/founding verified (Trustpilot reviews + PropFirm Key); HQ-vs-registration nuance noted.*
- **CPF editorial score (this page): 4.4 / 5.**
- **Trustpilot: 4.6 / 5 from ~426 reviews.** ⚠️ *Placeholder — pull the live score + count from Trustpilot before publishing.*
- Positioning: "Built by traders, for traders." Up to **90% profit split**, same-day payouts, two evaluation styles (OG / MAX).
- **"Funded" = Simulated Funded Account.** Live capital is reached after **$5,000 in cumulative payouts**, at which point the split improves from **80/20 (sim) → 90/10 (live)**.
- **Account limits:** up to **10 accounts** total / **5 funded** at once. **Copy trading** across up to **5** accounts (~$1.25M aggregate notional).
- **Promo (live):** **June Sale — ends 6/30/26.** Code **`BOGOISBACK`** = 50% off **+** Buy-One-Get-One (second account free) **+ $0 activation**. Hero lead **$40** = Standard MAX 50K, BOGO-effective — surfaced on the page as the **“True Funding Fee”** on a $50K eval. Hero chevrons read **$40 True Funding Fee · 80%/20% (up to 90%) split · save up to 75%**.

---

## Account model — the per-product axis
FFN ships **2 products**, each available in **2 evaluation styles**, across **5 sizes**.

| Product | Internal key | Accent | Tag | Icon | One-liner |
|---------|-------------|--------|-----|------|-----------|
| **Standard** | `growth` | purple (`--purple`) | "More Days" | 💳 | More days to pass at a lower price |
| **Express** | `select` | blue (`--blue`) | "Faster Funding" | 🚀 | Faster funding on a tighter schedule |

| Style | `cardState.program` | Meaning |
|-------|--------------------|---------|
| **OG** | `OG` | Includes an **Exhibition** stage after the evaluation; intraday trailing drawdown; $0 buffer |
| **MAX** | `MAX` | **No Exhibition** — straight to funded; carries a buffer (= size max DD) |

- **Sizes (all products/styles):** 25K / 50K / 100K / 150K / 250K.
- **Profit split:** **80/20 sim → 90/10 live** (live after $5,000 cumulative payouts), all products.
- **Lightning key is UNUSED** — FFN has no third product (the cornerstone's `lightning` slot is empty/dropped).

---

## Per-size data (shared across products & styles) — ✅
| Size | Profit target | Max DD (max loss) | Max contracts | Daily Loss Limit* | Min profit / winning day |
|------|---------------|-------------------|---------------|-------------------|--------------------------|
| 25K  | $2,000  | $1,500 | 3 Mini (30 Micros)   | $1,000 | $100 |
| 50K  | $3,000  | $2,000 | 4 Mini (40 Micros)   | $1,250 | $150 |
| 100K | $6,000  | $3,600 | 10 Mini (100 Micros) | $2,500 | $200 |
| 150K | $9,000  | $5,000 | 15 Mini (150 Micros) | $3,750 | $250 |
| 250K | $15,000 | $6,000 | 20 Mini (200 Micros) | $4,500 | $300 |

\* **DLL only applies to Standard MAX** (soft breach pauses the day). On Standard OG, Express OG, and Express MAX the DLL reads **"None."**

---

## Per-style plan data (keyed `product|style`) — ✅
| Plan | Min days | Exhibition | Eval drawdown | Eval consistency | Funded consistency | Funded drawdown | Buffer |
|------|---------|------------|---------------|------------------|--------------------|-----------------|--------|
| **Standard OG** (`growth\|OG`) | 7 | Yes | Intraday Trailing (Realized) | 40% | 40% | Static +$100 | $0 |
| **Express OG** (`select\|OG`) | 4 | Yes | Intraday Trailing (Realized) | 25% | 40% | Static +$100 | $0 |
| **Standard MAX** (`growth\|MAX`) | 5 | No | EOD (End of Day) | 40% | 40% | EOD → Static +$100 after buffer | = size max DD |
| **Express MAX** (`select\|MAX`) | 2 | No | Intraday Trailing (Realized) | 50% | 25% | Trailing (Unrealized) → Static | = size max DD |

- **Buffer** = the size's max-DD figure for MAX styles; **$0** for OG styles.
- **Eval-phase max-loss wording** (overview/eval) derives from the eval drawdown type: **realized** for Standard OG, Express OG and **Express MAX**; **EOD** only for Standard MAX. *(Express MAX previously mislabeled "EOD" — corrected.)*
- **Funded-phase max-loss wording** on cards: OG → "realized → static"; Standard MAX → "EOD"; Express MAX → "trailing → static".

---

## Pricing & promo — ✅
Two numbers per cell: **list price** (struck through) → **displayed price** (50% off). The big card "fee" = **BOGO-effective = displayed ÷ 2** (second account free).

| Plan | 25K | 50K | 100K | 150K | 250K |
|------|-----|-----|------|------|------|
| **Standard OG** | $125 → $63 | $150 → $75 | $305 → $153 | $350 → $175 | $580 → $290 |
| **Express OG**  | $155 → $78 | $175 → $88 | $330 → $165 | $380 → $190 | $690 → $345 |
| **Standard MAX**| $135 → $68 | $160 → $80 | $315 → $158 | $365 → $183 | $590 → $295 |
| **Express MAX** | $165 → $83 | $185 → $93 | $340 → $170 | $395 → $198 | $720 → $360 |

- **Activation fee:** $120 — **$0 with promo.**
- **Account reset:** $100.
- Example: Standard MAX 50K → displayed $80 → BOGO-effective **$40** (the hero lead price).

---

## Payout policy — ✅ except where noted
- **Minimum payout:** $500.
- **Per-request user cap:** $10,000. ⚠️ *Per-account sim caps are unconfirmed; the page surfaces the $10K user cap + each size's profit target as the payout-cap figure — re-verify exact sim caps per size.*
- **Speed:** same-day on approval. **Methods:** ACH, PayPal, wire — **no fees.**
- **Data fee:** $126 / month — **live-funded accounts only** (not sim-funded). Sim-funded accounts pay no data fee.
- Live split (90/10) unlocks after **$5,000 cumulative payouts**.

---

## Accounts-tab comparison cards & Payouts-tab rows — ✅ (with flags)
Left column = static label; right column = dynamic value. Rows are uniform across firms for easy comparison. Built in JS from `ffEvalRows` / `ffFundedRows` / `ffPayoutRows`.

**Evaluation toggle (12 rows):** Evaluation Steps → `1 Step` · Profit Target → size target · Total Drawdown → size max DD · Daily Loss Limit → `$X (soft)` on Standard MAX else `None` · Days to Pass → plan days · Consistency Rule → eval % · Max Contracts → `Yes` · Max Accounts → `Up to 5` · Account Resets → `Yes — $100` · Activation Fee → `$120 ($0 promo)` · News Trading → `Allowed` · Bots / Algo Trading → `Allowed`.

**Funded toggle (12 rows):** Max Payout → size target · Profit Target → size target · Total Drawdown → size max DD · Daily Loss Limit → as eval · Days to Payout → consistency floor `ceil(100 / funded %)` → 3 days for 40% plans, **4 days for Express MAX (25%)**, all `(1 when live)` · Consistency Rule → funded % · Contract Scaling Plan → `Yes` · Max Accounts → `Up to 5` · Account Resets → `No (funded)` · Profit Split → `80% → 90%` · News Trading → `Flat ±1 min near news` · Bots / Algo Trading → `Allowed`. Size pills show **Account Size + Price** (same as Evaluation).

**Payouts tab (14 rows):** Max Payout → size target · Max Payout (Subsequent) → `Up to $10,000 / request` · Minimum Payout → `$500` · Profit Target → size target · Withdrawal Buffer → size max DD on MAX / `No buffer ($0)` on OG · Total Drawdown → size max DD · Daily Loss Limit → as eval · Days to Payout → consistency floor `ceil(100 / funded %)` (3 days for 40% plans, **4 days for Express MAX**) `(1 when live)` · Profit / Trading Day → size min winning-day profit ($100–$300) · Consistency Rule → funded % · Profit Split → `80% → 90%` · Per Request → `Up to $10,000` · Payout Frequency → `On request (any day)` · Processing Time → `Same day`. Size pills show each size's **Max Payout** (= profit target).

**Flags / proxied values to re-verify (first-party):**
- 🔁 **Max Payout (per size)** is proxied by the **profit target** (page convention); exact per-size sim payout caps unconfirmed.
- ✅ **Days to Payout** is derived from the funded consistency rule: `ceil(100 / consistency%)` + `(1 when live)` — 40% plans → 3 days, Express MAX (25%) → 4 days. This keeps it logically consistent (a 25% rule needs ≥4 days). The firm-level comparison-table cell reads **3–4 days, 1 when live**. *(If FFN publishes an explicit higher minimum, override it here.)*
- 🔁 **Processing Time** = `Same day` (same-day on approval); no published hour figure.
- ✅ **Per-request cap** $10,000, **Minimum payout** $500, **Profit/winning-day** ($100–$300), **Withdrawal buffer** (= size max DD on MAX, $0 on OG), **Activation** $120/$0, **Reset** $100, **Profit split** 80→90% — confirmed.
- **Max Contracts** shows `Yes` (FFN caps; exact per-size cap lives in the Scaling Plan tab). **News Trading** funded = flat ±1 min around Tier-1 news (per rules). **Bots** allowed.

---

## Scaling plan — ✅ (depends on account size only)
Contract limits scale with **realized profit** on the funded account in **3 tiers**. The plan is **identical across Standard, Express, OG and MAX** — only account size changes it. Drop back below a tier in profit and the cap steps down. Verified from first-party checkout screenshots for all 20 product/size combinations.

| Size | Tier 1 (start) | Tier 2 | Tier 3 (cap) |
|------|----------------|--------|--------------|
| 25K  | 1 Mini (10 Micros) · $0–$800   | 2 Mini (20 Micros) · $801–$1,000   | 3 Mini (30 Micros) · $1,001+ |
| 50K  | 2 Mini (20 Micros) · $0–$1,000 | 3 Mini (30 Micros) · $1,001–$2,000 | 4 Mini (40 Micros) · $2,001+ |
| 100K | 4 Mini (40 Micros) · $0–$3,000 | 6 Mini (60 Micros) · $3,001–$4,500 | 10 Mini (100 Micros) · $4,501+ |
| 150K | 4 Mini (40 Micros) · $0–$3,000 | 8 Mini (80 Micros) · $3,001–$4,500 | 15 Mini (150 Micros) · $4,501+ |
| 250K | 6 Mini (60 Micros) · $0–$5,000 | 12 Mini (120 Micros) · $5,001–$9,000 | 20 Mini (200 Micros) · $9,001+ |

- **Profit range** = realized profit above starting balance. Tier 3 contract count = the size's Max Contracts cap (see per-size table).
- Implemented as the size-keyed `FF_SCALE` builder; rendered on the **Scaling Plan** sub-tab, the **Overview** Scaling block, and the rulebook modal.

---

## Evaluation & funded rules
- **Evaluation:** 1-step. OG styles add an **Exhibition** stage after passing; MAX styles skip it (straight to funded). Min trading days per style table above.
- **Exhibition (defined):** a short post-evaluation stage on **OG** plans where you trade to build a profit buffer before the account becomes funded. (This definition is surfaced in the Overview first paragraph.)
- **Consistency:** eval + funded percentages per style table above.
- **News trading:** allowed during evaluation; on funded/exhibition accounts must be **flat ±1 minute around Tier-1 news**.
- **Hedging:** prohibited. **Scalping, DCA, copy trading (≤5 accounts):** allowed.
- **Sessions:** flat by **4:50 PM EST**; market reopens **6:00 PM EST**. No overnight holding.

---

## Platforms — ✅
| Platform | Cost |
|----------|------|
| **EdgeProX** | Free |
| **FundX** | Free |
| **Onyx Trader** | FFN platform · Rithmic |
| **Quantower** | Included |
| **NinjaTrader** | Bring your own license |
| **Sierra Chart** | Bring your own license |
| **R \| Trader** | Rithmic native (R \| Trader Pro) · connect |

- **Execution / data feed:** Rithmic. **Instruments:** CME Group futures.
- **Logos (page):** real platform logos are embedded — NinjaTrader/Sierra Chart/Quantower reused from the Tradeify cornerstone; EdgeProX (orange “X” mark), Onyx Trader (silver/gold wordmark on black), and R | Trader (green “Pro” app icon) supplied by stakeholder. **FundX reuses the Quantower mark** (cosmetic, per design direction). ⚠️ **Onyx Trader**: confirmed as an FFN platform (Trustpilot mentions); exact feature set unverified — confirm before publish.

---

## Restricted countries (single tier, 23) — ✅
Afghanistan, Azerbaijan, Burma (Myanmar), Central African Republic, Cuba, Haiti, Iran, Iraq, Mali, Nauru, Nicaragua, Nigeria, North Korea, Pakistan, Russia, Somalia, South Sudan, Sudan, Syria, Turkmenistan, Ukraine, Venezuela, Yemen.
- Eligibility by **residency**; KYC required; no VPN bypass.

---

## Comparison table (Overview tab) — FFN vs Topstep vs Tradeify
| Metric | FFN (featured) | Topstep | Tradeify |
|--------|----------------|---------|----------|
| $50K lead (BOGO) | $40 | — | — |
| Profit split | 80/20 → 90/10 | 90% (100% first $10K) | 90/10 |
| Activation fee | $0–$120 | $0–$149 | $0 (none) |
| Days to payout | 3 days, 1 when live | 5 | 1–5 |
| Drawdown | EOD trailing | EOD trailing | EOD trailing |
| Max funded | 5 | 5 | 5 |
| Instant funding | No (MAX = no exhibition) | No | Yes (Lightning) |
| CPF score | 4.4 | 4.7 | 5.0 |
> Competitor figures are for context — verify before publish.

---

## Sources
fundedfuturesnetwork.com and its help center (verify every number against live articles). ⚠️ Several company facts (founder, founding date, HQ) and the Trustpilot count were third-party/placeholder at build time — confirm on the official site before publishing.

---

## Data confidence summary (what to verify before publish)
1. ✅/⚠️ **Trustpilot** — score **4.6** confirmed (PropFirm Key); live count hovers **~410–430** (page shows ~426). Pull the exact live count before publish.
2. ✅ **Company facts** — CEO **Kevin Swart**, co-founder **Jay Swart**, founded **2022**, NYC HQ (99 Wall St), LLC registered in **FL** (Trustpilot + PropFirm Key).
3. ✅ **Scaling milestones** — all five sizes verified from first-party checkout screenshots (see Scaling plan table). Identical across Standard/Express and OG/MAX.
4. ⚠️ **Per-account sim payout caps** per size (page shows $10K user cap + profit targets).
5. Review quotes on the Reviews tab are **illustrative** — replace with real verified reviews.
6. ⚠️ **Onyx Trader** feature set/positioning unverified (added per stakeholder); confirm on the firm site/help center.
