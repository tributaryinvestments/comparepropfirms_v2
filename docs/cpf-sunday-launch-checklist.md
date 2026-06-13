# ComparePropFirms — Build-to-Sunday Checklist

**Status today (Sat):** clean chrome (menu + mobile drawer) ✅ · footer real logo ✅ · best-prop-firms page with 11 firms of first-party data ✅ · 7 futures sub-category pages ✅. Next: firm review pages, homepage + Klaviyo, then go live.

---

## 1. BUILD — pages
- [x] **best-prop-firms** category page (11 firms, real data)
- [x] **7 sub-categories** — instant-funding · one-step-evaluation · no-evaluation-funding-fee · live-trading-path · five-plus-trading-accounts · profit-split-bonus-offers · tradovate *(same ranking placeholder — you send the per-category firm order to finalize)*
- [ ] **11 firm review pages → `/prop-firm/<slug>/`** on the clean chrome *(Claude builds, you commit)*
- [ ] **Homepage** *(attach `cpf-homepage.html` in chat and Claude builds it)*
- [ ] **Crypto / Options / Forex** hubs — need their own (different) firms; do after futures
- [ ] **Trade-news** — that's the news hub, a separate page type; decide if it launches Sunday

## 2. WIRE — make it work + go live
- [ ] Commit **and push** every built file (Desktop: Commit → **Push origin**)
- [ ] `routes.json`: flip the built category paths from `wordpress` → `pages` (everything else keeps proxying to WordPress — zero redirects)
- [ ] Verify the live URLs render on cpfv2.pages.dev, then your domain
- [ ] **Footer links** — replace the 20 placeholder `#` links (4 social + footer nav) with real URLs; fixed once in the footer partial, applies to every page
- [ ] **"Get Funded" CTAs** — they currently point to each firm's review page; swap in your real affiliate links per firm
- [ ] **Real firm logos** — drop 11 logo images into `assets/logos/` (or drag into chat) and Claude wires them onto the cards
- [ ] **Klaviyo** on the homepage signup — see §4

## 3. OPTIMIZE — SEO + quality
- [x] Unique `<title>` + canonical per page
- [ ] Meta description per page
- [ ] Open Graph + Twitter card tags (link previews)
- [ ] Favicon + apple-touch-icon
- [ ] `sitemap.xml` + `robots.txt` updated for the new pages
- [ ] Run `validate.mjs` + headless render on every page before pushing
- [ ] Mobile QA at 390px on each page type
- [ ] Analytics (GA4 / GTM) — one snippet in the chrome

## 4. KLAVIYO — homepage signup
**What Claude needs from you (3 things):**
- [ ] Klaviyo **Public API Key** — the 6-character site ID (Klaviyo → Settings → API Keys)
- [ ] The **List ID** new signups should join
- [ ] Whether you want **double opt-in**

**Then Claude wires the homepage email form one of two ways:**
1. **Klaviyo embedded form** — paste Klaviyo's form embed + `klaviyo.js`; Klaviyo handles validation, consent, confirmations (fastest, most reliable).
2. **Custom form → Klaviyo Client API** — the existing email field POSTs to Klaviyo's subscribe endpoint using your public key (keeps our exact design).

*Recommendation: option 1 for Sunday (less to break), swap to option 2 later if you want the custom look.*

## 5. LAUNCH — Sunday
- [ ] Final push of all pages
- [ ] Flip `routes.json` category paths to `pages`
- [ ] Smoke test each live URL (desktop + mobile): menu, mobile drawer, cards, CTAs, footer
- [ ] Confirm WordPress still serves everything not yet migrated
- [ ] Spot-check 2–3 firm data points against the live firm sites
