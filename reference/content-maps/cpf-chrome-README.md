# Shared Chrome (Header + Footer) — one source of truth

**Status:** the five page prototypes + the reference page each still embed their *own* copy of the header/footer. These files replace that with a single shared source so the chrome is edited **once** and reused everywhere (checklist item 1.1).

## The files (this is the whole "template part")
| File | What | Load |
|---|---|---|
| `cpf-base.css` | Design tokens + base resets (incl. the mobile light/dark `html` background fix). The foundation the chrome and pages both depend on. | once, globally, **first** |
| `cpf-chrome.css` | Site **header + footer** styles. Depends on `cpf-base.css`. | once, globally, after base |
| `cpf-chrome.js` | Chrome behavior: theme toggle, footer disclosures, sticky-header shadow, Futures mega-menu. | once, end of `<body>` (or `defer`) |
| `cpf-chrome-header.html` | The `<header class="site-nav">` markup. | top of `<body>` |
| `cpf-chrome-footer.html` | The `<footer class="site-foot">` markup. | end of `<body>`, before scripts |

**The one rule:** change the chrome only in these files. Never paste another copy into a page.

## Required `<head>` on every page
The theme bootstrap must run **before paint** (prevents a flash of the wrong theme), and the `color-scheme` meta + `cpf-base.css` together fix the mobile in-app black-background bug. Keep all of this:

```html
<meta charset="UTF-8" />
<meta name="color-scheme" content="light dark" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<!-- apply saved theme before paint -->
<script>(function(){try{if(localStorage.getItem('cpf-theme')==='dark')document.documentElement.classList.add('dark');}catch(e){}})();</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Source+Serif+4:opsz,wght@8..60,600;8..60,700;8..60,800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/cpf-base.css">
<link rel="stylesheet" href="/assets/cpf-chrome.css">
<!-- then each page's own stylesheet -->
```
> For production, self-host the fonts (GDPR + performance) instead of the Google link — see handoff Part J5.

## Page skeleton
```html
<body>
  <!-- include cpf-chrome-header.html -->
  <main> ...page content... </main>
  <!-- include cpf-chrome-footer.html -->
  <script src="/assets/cpf-chrome.js" defer></script>
  <!-- then each page's own script -->
</body>
```
Load order matters: `cpf-base.css` → `cpf-chrome.css` → page CSS, so the cascade resolves the same way it does in the prototypes.

## Register it as a template part (pick your stack)

**WordPress classic theme** — the literal template part:
- `header.php`: the `<head>` block above + `<body>` + the contents of `cpf-chrome-header.html`. Pages call `get_header()`.
- `footer.php`: the contents of `cpf-chrome-footer.html` + `wp_footer()` + `</body></html>`. Pages call `get_footer()`.
- Enqueue assets in `functions.php`:
```php
add_action('wp_enqueue_scripts', function () {
  wp_enqueue_style ('cpf-base',   get_stylesheet_directory_uri().'/assets/cpf-base.css',  [], '1.0');
  wp_enqueue_style ('cpf-chrome', get_stylesheet_directory_uri().'/assets/cpf-chrome.css', ['cpf-base'], '1.0');
  wp_enqueue_script('cpf-chrome', get_stylesheet_directory_uri().'/assets/cpf-chrome.js',  [], '1.0', true);
});
```

**WordPress block theme:** put the markup into `parts/header.html` and `parts/footer.html` (a Custom HTML block is fine for this hand-authored chrome), reference them from templates with `<!-- wp:template-part {"slug":"header"} /-->`, and enqueue the three assets as above.

**Elementor:** Theme Builder → create a **Header** and a **Footer** template (set display conditions to Entire Site). Paste the markup into an HTML widget in each. Load the CSS/JS once via the child theme's `functions.php` (snippet above) or Elementor → Custom Code (CSS/`<head>` for base+chrome+fonts+bootstrap; before `</body>` for `cpf-chrome.js`).

**Static site / no PHP:** use server-side includes or a build-time partial (`{{> header }}` / `{{> footer }}`). A JS fetch-and-inject loader also works but defers the chrome to runtime (minor SEO/flash trade-off) — prefer a server/build include for a real site.

## Retrofitting the existing prototypes (optional)
The prototypes are self-contained demos, so they don't *need* this. If you want them to share the source too: in each page, replace the embedded `<header class="site-nav">…</header>` and `<footer class="site-foot">…</footer>` with the two parts, delete the duplicated chrome CSS (the `#cpf-chrome` block / the header+footer rules) and the chrome JS, and link `cpf-base.css` + `cpf-chrome.css` + `cpf-chrome.js` instead. Keep each page's `<head>` bootstrap.
