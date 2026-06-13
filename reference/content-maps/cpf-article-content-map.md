# Article (Guide) — Content Map & Data Reference
*Source of truth for `cpf-article.html`. This is the **single-article / guide template**; the live content shown is one example post.*

> Shared header + footer = locked chrome (see `cpf-pages-handoff.md`). This map covers the page body.

---

## Example article
**"How to Pass a Prop Firm Evaluation: 10 Proven Strategies (2026)"** — used to demonstrate the template. At launch this becomes the **dynamic article template** populated per post from the CMS.

## Structure (top → bottom)
1. **Breadcrumb** (`.breadcrumb`) — Home / Guides / {article}. ⚠️ dynamic per post.
2. **Article hero (navy)** — summit SVG motif, "GUIDES" pill, H1 title, byline: **"JK" avatar + author + "Updated …" + "14 min" read + "Fact-checked"** badge. ⚠️ author/date/read-time/category dynamic.
3. **5-stat strip** overlapping the hero — quick at-a-glance stats. ⚠️ per-article, optional.
4. **Article body** (`.prose`, max-width **1140px** for readability — narrower than cornerstone 1440, a deliberate, flagged deviation):
   - Drop-cap intro, a **pull-quote**, green **Pro-Tip callouts**.
   - **10 strategies** — first 4 detailed (feature-icon grid + blue "principles" box + tip), strategies 5–10 concise, then a **Bottom Line**.
5. **Sticky sidebar** (340px; flows **below** the article on mobile — deliberate vs cornerstone's hide):
   - **Key Takeaways**
   - **Top Prop Firm Offers** (monogram + stars + "From $…") ⚠️ render from firms data; affiliate links.
   - **Related Guides** ⚠️ dynamic (CMS).
   - **Trending Topics** ⚠️ dynamic (tags).
   - **Compare CTA** (navy).

---

## Dynamic vs static (template fields)
| Field | Source |
|---|---|
| Breadcrumb, title, category pill | CMS post |
| Byline: author name/avatar, updated date, read time, "Fact-checked" | CMS post meta |
| Hero/stat strip | per-post (optional) |
| Body HTML (`.prose`) | **CMS rich content** — must support drop-cap, pull-quote, pro-tip callout, feature-icon grid, principles box, "Bottom Line" as reusable blocks/shortcodes |
| Sidebar "Top Prop Firm Offers" | **firms data** + affiliate URLs |
| Related Guides | CMS (related/recent posts) |
| Trending Topics | CMS tags / analytics |
| Compare CTA | link → route |

## Reusable content blocks (for the CMS/editor)
The body uses several styled blocks the editor must be able to insert:
- **Drop-cap** opening paragraph.
- **Pull-quote** (`.pullquote`).
- **Pro-Tip callout** (green).
- **Feature-icon grid** (icon + heading + text).
- **Principles box** (blue).
- **Bottom Line** summary.
Implement these as Gutenberg blocks / Elementor widgets / shortcodes so writers reuse them without touching markup.

## Behavior / JS
- Scroll-reveal; theme toggle via locked header (`#themeToggle`); chrome JS for mega-menu + footer disclosures.

## SEO (important for a content/guide template)
- Per-post `<title>` + meta description + canonical.
- **Article structured data** (`Article`/`BlogPosting`: headline, author, datePublished/Modified, image).
- **BreadcrumbList** schema.
- If the sidebar shows firm ratings, consider `Review`/`AggregateRating` schema on the firm references (kept truthful).
- Open Graph / Twitter card with the hero image.

## Flagged deviations / placeholders
- Page max-width **1140px** (vs cornerstone 1440) — intentional for readability; confirm acceptable.
- Sidebar **flows below** article on mobile (cornerstone hides it) — intentional.
- "JK" avatar, author, dates, read time → real per-post values.
- Sidebar offers, related guides, trending topics → wire to firms data + CMS.
- `#` links → routes; affiliate URLs on offer links.
