# About — Content Map & Data Reference
*Source of truth for `cpf-about.html`.*

> Shared header + footer = locked chrome (see `cpf-pages-handoff.md`). This map covers the page body.

---

## Section order
1. Mission hero
2. Value strip (4 cards)
3. How we rank prop firms
4. Independence band
5. What you get
6. Brand quote
7. Trusted / Featured-in
8. Our Promise (3 cards)
9. Contact
10. Closing CTA band

---

## 1. Mission hero
- Headline: "Level the **playing field** for traders." (`.hl` highlight).
- Animated SVG **mountain-summit** motif + floating chips. Scroll-reveal entrance.
- Static copy.

## 2. Value strip — 4 cards
Brand values (icon + title + line each). Static copy.

## 3. How we rank prop firms (`id="rank"`)
- Explains the methodology with a **radar/pentagon SVG** showing weighted criteria.
- ⚠️ Confirm the **criteria + weightings** shown match the real editorial methodology. Static once confirmed.
- Note: an earlier "View full methodology" link was intentionally **removed** (no methodology page exists yet). If one is created later, re-add the link.

## 4. Independence band
- **Honest affiliate framing** — explains the site earns affiliate commissions and how that does/doesn't affect rankings. ⚠️ This wording was deliberately written to be **truthful** (the mockup's "no paid placements" claim was rejected). Keep accurate; align with the footer's Advertising Disclosure.

## 5. What you get
- Cards describing user benefits. Static.

## 6. Brand quote
- Pull-quote. Static.

## 7. Trusted / Featured-in
- Press/featured logos. ⚠️ *placeholders — real authorized logos + truthful claims.*

## 8. Our Promise — 3 cards
- "This is what we stand for" — 3 promise cards. Static.

## 9. Contact (`id="contact"`)
- Team members: **R.A. Guirand** and **Jessica Sebben** (names/roles). ⚠️ confirm real names/titles/photos.
- **Contact form** (name/email/message). ⚠️ **Not wired** — backend must connect to email/CRM/helpdesk (submit endpoint + spam protection). There is no Contact/FAQ page elsewhere, so this form + the footer `support@comparepropfirms.com` mail link are the support entry points.

## 10. Closing CTA band
- CTA to compare/find firms. Link → `#`, wire to route.

---

## Dynamic vs static
| Element | Static | Dynamic / backend |
|---|---|---|
| All narrative sections | ✓ | content fixed (could be CMS page) |
| Featured-in logos | ✓ | optional CMS |
| Team members | ✓ | confirm real people |
| Contact form | — | **submit endpoint + anti-spam + notification** |
| CTAs | ✓ copy | links → routes |

## Behavior / JS
- Scroll-reveal (IntersectionObserver). Theme toggle via locked header (`#themeToggle`).

## Placeholders to replace before launch
- Featured-in logos (authorized) + truthful "featured" claims.
- Team names/roles/photos.
- Methodology criteria & weights — confirm accuracy.
- Contact form backend (endpoint, validation, spam protection, success state).
- All `#` CTA links → real routes.
