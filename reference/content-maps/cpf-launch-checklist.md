# CPF — Go-Live Checklist (tracker)
*Working surface for taking the five new pages live. Each item points to the explanation in `cpf-pages-handoff.md` (or a page content map) — this doc is status only, not explanation. Update Status/Owner as you go.*

**Status key:** ☐ not started · ◐ in progress · ☑ done · ⊘ N/A
**Refs:** Part A–J = sections in `cpf-pages-handoff.md`; "map" = the relevant `*-content-map.md`.

---

## 1. Chrome & assets
| # | Item | Ref | Owner | Status |
|---|---|---|---|---|
| 1.1 | Header+footer as ONE shared template part (not 5 copies) | B, E | | ☐ |
| 1.2 | Keep `<head>` theme script + `color-scheme` meta + `html` bg on every page | A | | ☐ |
| 1.3 | Replace logo SVG with official mark (header + footer) | F | | ☐ |
| 1.4 | Replace BBB badge with official asset; confirm accreditation | F | | ☐ |
| 1.5 | Build + wire the mobile nav panel (burger is visual-only) | J3, I | | ☐ |

## 2. Data & content modeling
| # | Item | Ref | Owner | Status |
|---|---|---|---|---|
| 2.1 | Model **firms** (CPT/table) with all fields incl. `affiliate_url`, `last_verified` | C, J2 | | ☐ |
| 2.2 | Model **posts/articles** + reusable body blocks (drop-cap, pull-quote, pro-tip, etc.) | C, article map | | ☐ |
| 2.3 | Category taxonomy for the 6 homepage tiles | C, homepage map | | ☐ |
| 2.4 | Migrate verified firm data (Tradeify/Lucid/Purdia) | C, maps | | ☐ |

## 3. Templates / page types
| # | Item | Ref | Owner | Status |
|---|---|---|---|---|
| 3.1 | Homepage (firm cards, compare table, latest guides from data) | D, homepage map | | ☐ |
| 3.2 | News Hub (featured/latest/popular/news + review cards from data) | D, news-hub map | | ☐ |
| 3.3 | Article single-post template + blocks | D, article map | | ☐ |
| 3.4 | About | D, about map | | ☐ |
| 3.5 | Legal → two URLs (Privacy, Terms) | D, legal map | | ☐ |
| 3.6 | **Compare-results** page (Compare Now destination — unbuilt) | J3 | | ☐ |
| 3.7 | Archive / category / tag listing + pagination | J3 | | ☐ |
| 3.8 | Search-results page | J3 | | ☐ |
| 3.9 | 404 + newsletter/contact success + author pages | J3 | | ☐ |

## 4. Wiring (interactive / backend)
| # | Item | Ref | Owner | Status |
|---|---|---|---|---|
| 4.1 | Affiliate links via **tracked redirect** + per-placement sub-IDs; reconcile to dashboards | J1 | | ☐ |
| 4.2 | Compare tool: populate selects from data, "Compare Now" → results | C, J3 | | ☐ |
| 4.3 | Newsletter signup → ESP, double opt-in, consent, states | C, J7 | | ☐ |
| 4.4 | Contact form (About) → email/CRM, validation, spam protection | C, J7, about map | | ☐ |
| 4.5 | Replace every `#` link with a real route | D, maps | | ☐ |

## 5. Data verification (flagged figures — do NOT publish unverified)
| # | Item | Ref | Owner | Status |
|---|---|---|---|---|
| 5.1 | Take Profit Trader figures | I, homepage map | | ☐ |
| 5.2 | Firm "Max Funding" + "Consistency Rule" compare cells | I, homepage map | | ☐ |
| 5.3 | All "Save up to %" + sale-end dates | I, J2 | | ☐ |
| 5.4 | Trust stats: 500K+, 250+, 4.8/5, Trustpilot, 1M+/150+/2,500+ | I, J8 | | ☐ |
| 5.5 | Featured/press logos — authorized + claim is truthful | F, about map | | ☐ |
| 5.6 | Legal effective dates + entity/contact details (legal sign-off) | I, legal map | | ☐ |
| 5.7 | Stand up the per-firm freshness process + visible "last verified" | J2 | | ☐ |

## 6. Compliance & trust
| # | Item | Ref | Owner | Status |
|---|---|---|---|---|
| 6.1 | "Not financial advice" / simulated-funding / risk disclaimers | J5 | | ☐ |
| 6.2 | Jurisdictional financial-promotion review (FCA/EU/etc.) with legal | J5 | | ☐ |
| 6.3 | Ranking **methodology page** (re-add About link once it exists) | J5, about map | | ☐ |
| 6.4 | Author bios/credentials + sourcing on guides (E-E-A-T) | J5 | | ☐ |
| 6.5 | Cookie-consent banner | J5 | | ☐ |
| 6.6 | Self-host Google Fonts (GDPR + perf) | J5, J6 | | ☐ |
| 6.7 | Keep footer Advertising Disclosure + About independence accurate | B, about map | | ☐ |

## 7. SEO & analytics
| # | Item | Ref | Owner | Status |
|---|---|---|---|---|
| 7.1 | Per-page title/meta/canonical + OG/Twitter | G | | ☐ |
| 7.2 | Schema: Organization, BreadcrumbList, Article, truthful Review/AggregateRating | G | | ☐ |
| 7.3 | XML sitemap incl. all page types; footer Sitemap link | G | | ☐ |
| 7.4 | GA4 + event plan (offer impressions → CTR → affiliate click → conversion) | J8 | | ☐ |

## 8. Performance
| # | Item | Ref | Owner | Status |
|---|---|---|---|---|
| 8.1 | Image pipeline: srcset, lazy-load, compression/next-gen | G, J6 | | ☐ |
| 8.2 | Font-loading strategy; caching/CDN | J6 | | ☐ |
| 8.3 | Decide inline `<style>`/`<script>` handling in WP (enqueue vs critical CSS) | J6, E | | ☐ |
| 8.4 | Pass Core Web Vitals (mobile) | J6 | | ☐ |

## 9. IA / launch ops / governance
| # | Item | Ref | Owner | Status |
|---|---|---|---|---|
| 9.1 | URL/permalink structure + link-target map + redirect map | J4 | | ☐ |
| 9.2 | Confirm existing firm (Tradeify) + category cornerstones share the chrome | J4, B | | ☐ |
| 9.3 | Name the source of truth + content-map↔CMS sync rule | J9 | | ☐ |
| 9.4 | Staging env, backups, rollback, theme in version control | J9 | | ☐ |
| 9.5 | Final QA: both themes, all breakpoints, real mobile in-app browser, a11y | H, A | | ☐ |
