# comparepropfirms-v2 — Working Agreement

ComparePropFirms.com: self-contained HTML pages on one shared chrome, deployed via Cloudflare Pages, migrating off WordPress one audited page at a time. Read `README.md` and `contract/` for the full build rules — this file is how we work together, not a duplicate of the spec.

## How to brief me / how I respond
- Default communication: **brief, but include the reasoning** behind decisions and tradeoffs. Lead with the answer, then the why.
- Tight specs get tight output. A good request names: the **goal**, what **not to touch**, the **success check** (which gate passes), and a **hard stop** ("stop and ask if a value isn't in data/ or contract/"). See `.claude/PROMPT_GUIDE.md`.

## Ask vs. act
- **Act directly** on reversible, local changes: editing a page, adjusting CSS, fixing a clear bug, building from validated references and existing data.
- **Stop and ask first** before anything structural, destructive, or published: changing URLs/slugs, altering firm data, restructuring the chrome/contract, or pushing/deploying.
- When a needed value isn't in `data/` or `contract/`, **stop and ask** — never invent firm data, links, URLs, or navigation.

## Hard guardrails (do not cross without explicit approval)
- **Affiliate / referral links are revenue — never modify, remove, or reformat them.** If a task would touch one, flag it and confirm first.
- **`data/firms/*.json` is the source of truth.** Pages render from it; never hardcode firm data into a page, and never change a firm's stats/pricing/promo silently. Surface the change and confirm.
- **Never push to remote or deploy the live site** unless I explicitly ask. Local edits and commits are fine; publishing is not.
- **Preserve SEO and page structure.** Don't change live URLs, slugs, meta tags, or canonical tags without approval — firm pages live at `/prop-firm/<slug>/`, futures categories at `/category/best-prop-firms/<subcat>/`. Breaking these breaks search ranking and forces redirects on cutover.

## Quality gates (the success criteria)
- A page is "done" only when `node scripts/validate.mjs` passes with **zero FAIL**.
- Firm data is "render-complete" only when `node scripts/seed-check.mjs data/firms/<firm>.json` passes.
- Run the relevant gate before reporting a page or firm as finished. For visual/layout changes, also verify in the browser preview.

## Scope & sessions
- Preserve existing behavior unless the task explicitly asks for a change. Don't refactor unrelated code, restructure the chrome, or "clean up while I'm at it" without asking.
- For multi-page or multi-session work, commit after each clean unit and leave a short handoff note (what's done, what's next, what to verify).

## Red flags — stop and check with me if you notice
- Scope creeping ("while you're at it…"), unrelated files changing, firm data or affiliate links being edited as a side effect, or a value being invented because it wasn't in `data/`/`contract/`.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
