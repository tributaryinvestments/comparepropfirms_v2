#!/usr/bin/env node
/* validate.mjs — ComparePropFirms build auditor (dependency-free).
 *
 * Usage:
 *   node scripts/validate.mjs [paths...]        # default: prop-firm/ category/ *.html
 * Looks for contract files in ./contract or ./ :
 *   cpf-link-map.json, cpf-canonical-phrases.json
 * Looks for canonical partials in ./partials :
 *   chrome-header.html, chrome-footer.html
 *
 * Exit code 1 if any FAIL. WARN does not fail the build. SKIP = check not applicable.
 * Gates: node --check scripts | id contract | chrome parity | link gate | asset order | VERIFY-leak.
 */
import { readFileSync, existsSync, writeFileSync, readdirSync, statSync, mkdtempSync } from 'node:fs';
import { join, extname } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';

const ROOT = process.cwd();
const COMPARE_PAGE_BUILT = false; // flip to true once /compare/ exists & passed audit

// ---------- locate contract + partials ----------
const find = (names) => { for (const d of ['contract', '.']) for (const n of names) { const p = join(ROOT, d, n); if (existsSync(p)) return p; } return null; };
const linkMapPath = find(['cpf-link-map.json']);
const linkMap = linkMapPath ? JSON.parse(readFileSync(linkMapPath, 'utf8')) : null;
const headerPartial = existsSync(join(ROOT, 'partials/chrome-header.html')) ? readFileSync(join(ROOT, 'partials/chrome-header.html'), 'utf8') : null;
const footerPartial = existsSync(join(ROOT, 'partials/chrome-footer.html')) ? readFileSync(join(ROOT, 'partials/chrome-footer.html'), 'utf8') : null;

// ---------- helpers ----------
const norm = (s) => s.replace(/<!--[\s\S]*?-->/g, '').replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim();
const results = [];
const add = (file, check, status, detail = '') => results.push({ file, check, status, detail });

const allowedTargets = new Set();
if (linkMap) {
  const walk = (o) => { if (Array.isArray(o)) o.forEach(walk); else if (o && typeof o === 'object') { if (typeof o.target === 'string') allowedTargets.add(o.target); Object.values(o).forEach(walk); } };
  walk(linkMap);
}
const linkOK = (href) => {
  if (href === '#') return false;                                   // bare placeholder
  if (/^(mailto:|tel:|https?:\/\/|#)/i.test(href)) return true;     // external / in-page anchor
  if (href === '/' ) return true;
  if (/^\/compare\/?$/.test(href)) return COMPARE_PAGE_BUILT;       // gated
  if (allowedTargets.has(href)) return true;
  if (/^\/prop-firm\/[a-z0-9-]+\/$/.test(href)) return true;
  if (/^\/category\/[a-z0-9-]+\/([a-z0-9-]+\/)?$/.test(href)) return true;
  if (/^\/[a-z0-9-]+\/$/.test(href)) return true;                   // single-segment page/post
  return null;                                                     // unknown -> WARN
};

// ---------- per-file checks ----------
function checkFile(file) {
  const html = readFileSync(file, 'utf8');
  const isPage = /<body[\s>]/i.test(html);

  // 1) node --check each JS <script> block
  const blocks = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
  let n = 0, bad = 0;
  for (const m of blocks) {
    const attrs = m[1] || '', body = m[2] || '';
    if (/\bsrc=/.test(attrs)) continue;                    // external
    if (/type\s*=\s*["']application\/(ld\+)?json["']/i.test(attrs)) continue; // JSON
    if (!body.trim()) continue;
    n++;
    const tmp = join(mkdtempSync(join(tmpdir(), 'cpfjs-')), 'b.js');
    writeFileSync(tmp, body);
    try { execFileSync(process.execPath, ['--check', tmp], { stdio: 'pipe' }); }
    catch (e) { bad++; add(file, 'node --check', 'FAIL', `block ${n}: ${String(e.stderr || e).split('\n').find(Boolean)}`); }
  }
  if (n) add(file, 'node --check', bad ? 'FAIL' : 'PASS', `${n - bad}/${n} blocks clean`);
  else add(file, 'node --check', 'SKIP', 'no inline JS');

  if (!isPage) { add(file, 'chrome/id/links', 'SKIP', 'not a full page'); return; }

  // 2) ID contract
  const count = (re) => (html.match(re) || []).length;
  const legacy = count(/theme-toggle/g);
  const idErrs = [];
  if (legacy) idErrs.push(`theme-toggle x${legacy} (must be 0)`);
  for (const id of ['siteNav', 'themeToggle', 'footDisc']) { const c = count(new RegExp(`id="${id}"`, 'g')); if (c !== 1) idErrs.push(`id="${id}" x${c} (want 1)`); }
  for (const id of ['mobileNav', 'mobileNavOverlay', 'mobileNavClose']) { if (!count(new RegExp(`id="${id}"`, 'g'))) idErrs.push(`missing id="${id}"`); }
  add(file, 'id contract', idErrs.length ? 'FAIL' : 'PASS', idErrs.join('; '));

  // 3) chrome parity
  const hdr = html.match(/<header class="site-nav"[\s\S]*?<\/header>/i);
  const ftr = html.match(/<footer class="site-foot"[\s\S]*?<\/footer>/i);
  if (headerPartial) add(file, 'header parity', hdr ? (norm(hdr[0]) === norm(headerPartial) ? 'PASS' : 'FAIL') : 'FAIL', hdr ? '' : 'no <header class="site-nav"> found');
  else add(file, 'header parity', 'SKIP', 'no partials/chrome-header.html');
  if (footerPartial) add(file, 'footer parity', ftr ? (norm(ftr[0]) === norm(footerPartial) ? 'PASS' : 'FAIL') : 'FAIL', ftr ? '' : 'no <footer class="site-foot"> found');
  else add(file, 'footer parity', 'SKIP', 'no partials/chrome-footer.html');

  // 4) link gate
  const hrefs = [...html.matchAll(/href="([^"]*)"/g)].map((m) => m[1]);
  const fails = [], warns = [];
  for (const h of hrefs) { const v = linkOK(h); if (v === false) fails.push(h); else if (v === null) warns.push(h); }
  if (fails.length) add(file, 'link gate', 'FAIL', `${fails.length} bad: ${[...new Set(fails)].slice(0, 6).join(', ')}`);
  else add(file, 'link gate', 'PASS', `${hrefs.length} links ok`);
  if (warns.length) add(file, 'link gate', 'WARN', `${[...new Set(warns)].length} unknown internal: ${[...new Set(warns)].slice(0, 6).join(', ')}`);

  // 5) asset order
  const iBase = html.indexOf('cpf-base.css'), iChrome = html.indexOf('cpf-chrome.css'), iJs = html.indexOf('cpf-chrome.js');
  const aErr = [];
  if (iBase < 0) aErr.push('cpf-base.css not linked');
  if (iChrome < 0) aErr.push('cpf-chrome.css not linked');
  if (iBase >= 0 && iChrome >= 0 && iBase > iChrome) aErr.push('base.css must load before chrome.css');
  if (iJs < 0) aErr.push('cpf-chrome.js not linked');
  add(file, 'asset order', aErr.length ? 'FAIL' : 'PASS', aErr.join('; '));

  // 6) VERIFY leak (unicode guillemets used as flag markers)
  if (/[\u2039][^\u203a]*[\u203a]/.test(html.replace(/<!--[\s\S]*?-->/g, ''))) add(file, 'VERIFY leak', 'WARN', 'a \u2039\u203a flag may be rendered to visitors');
}

// ---------- gather files ----------
function gather(p, acc) {
  if (!existsSync(p)) return;
  const st = statSync(p);
  if (st.isDirectory()) for (const e of readdirSync(p)) { if (e === 'node_modules' || e === 'partials' || e === 'contract' || e.startsWith('.')) continue; gather(join(p, e), acc); }
  else if (extname(p) === '.html') acc.push(p);
}
const args = process.argv.slice(2);
const targets = args.length ? args : ['prop-firm', 'category', '.'];
const files = [];
for (const t of targets) gather(join(ROOT, t), files);
const uniq = [...new Set(files)];

if (!uniq.length) { console.error('No .html files found under: ' + targets.join(', ')); process.exit(2); }
for (const f of uniq) checkFile(f);

// ---------- report ----------
const rel = (f) => f.replace(ROOT + '/', '');
let fail = 0, warn = 0;
const byFile = new Map();
for (const r of results) { if (!byFile.has(r.file)) byFile.set(r.file, []); byFile.get(r.file).push(r); if (r.status === 'FAIL') fail++; if (r.status === 'WARN') warn++; }
for (const [file, rs] of byFile) {
  console.log('\n' + rel(file));
  for (const r of rs) console.log(`  ${r.status.padEnd(4)} ${r.check}${r.detail ? ' — ' + r.detail : ''}`);
}
console.log(`\n${uniq.length} file(s) · ${fail} FAIL · ${warn} WARN`);
console.log(linkMap ? `link map: ${linkMapPath}` : 'link map: (none found — link gate ran in pattern-only mode)');
process.exit(fail ? 1 : 0);
