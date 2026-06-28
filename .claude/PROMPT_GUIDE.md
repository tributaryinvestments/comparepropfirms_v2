# Briefing Claude — quick reference

Tight specs get tight output in one pass. A good brief has four parts. You don't need all four every time, but the more you give, the less back-and-forth.

| Part | Question it answers | Example (this repo) |
|---|---|---|
| **Goal** | What am I building, in one sentence? | "Build the Tradeify firm review page at `/prop-firm/tradeify/`." |
| **Constraints** | What must NOT change? | "Render only from `data/firms/tradeify.json`. Don't touch the chrome, affiliate links, or any other firm's data." |
| **Success** | How do we know it worked? | "`node scripts/validate.mjs` passes with zero FAIL and it renders correctly in preview." |
| **Hard stop** | When should you bail and ask? | "Stop if a value isn't in `data/` or `contract/` — don't invent it." |

## Weak vs. strong

**Weak:** "Add the EdgeProp page."
→ Which data? What URL? What counts as done? Leaves me guessing.

**Strong:** "Build the EdgeProp review page at `/prop-firm/edgeprop-trading/` from `data/firms/edgeprop-trading.json`, copying the structure of an already-validated firm page. Don't change the chrome or any affiliate links. Done = `validate.mjs` passes with zero FAIL. Stop and ask if the JSON has unresolved `‹VERIFY›` markers."

## Anti-patterns to avoid
- **"While you're at it…"** → one goal per task; file the rest for next time.
- **"Make it look better."** → say what "better" means (e.g., "promo badge more prominent, mobile menu doesn't overflow").
- **"Figure it out."** → if a value lives only in your head or an external source, give it to me or point me to it.

## When a task is too big
If it spans multiple pages or sessions, say so up front and I'll split it, commit per clean unit, and leave a handoff note (what's done, what's next, what to verify).
