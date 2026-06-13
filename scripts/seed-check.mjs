#!/usr/bin/env node
/* seed-check.mjs — validates a firm-data JSON against the cornerstone render contract.
 * Usage: node seed-check.mjs <firm.json>
 * Required key sets are extracted verbatim from cpf-alpha-futures.html (ACCOUNT_DATA / PAYOUT_DATA).
 *
 * MISSING key   -> render-incomplete (HTML default would leak)  -> FAIL (exit 1)
 * key == ‹VERIFY› -> renders the flag (safe) but needs a human  -> verification queue (informational)
 */
import { readFileSync } from 'node:fs';

const VERIFY = '\u2039VERIFY\u203a';
const REQ = {
  evalFixed:   ['evalSteps','consistency','daysToPass','maxAccounts','resets','news','bots'], // 'activation' optional
  evalSize:    ['target','drawdown','dailyLoss','maxContracts'],
  fundedFixed: ['target','daysToPayout','consistency','scaling','maxAccounts','resets','split','news','bots'],
  fundedSize:  ['maxPayout','drawdown','dailyLoss'],
  payoutFixed: ['minPayout','target','buffer','days','perDay','consistency','split'],
  payoutSize:  ['maxPayout','maxPayoutSub','drawdown','dailyLoss'],
};

const path = process.argv[2];
if (!path) { console.error('usage: node seed-check.mjs <firm.json>'); process.exit(2); }
const f = JSON.parse(readFileSync(path, 'utf8'));
const sizes = f.meta?.sizes || [];
const slots = (f.meta?.products || []).map(p => p.slot);

const missing = [];           // render-incomplete
let verifyCount = 0;          // verification queue
let fieldCount = 0;

const need = (obj, keys, where) => {
  for (const k of keys) {
    fieldCount++;
    if (!obj || !(k in obj)) missing.push(`${where}.${k}`);
    else if (String(obj[k]).includes(VERIFY)) verifyCount++;
  }
};

// walk whole tree to count ALL ‹VERIFY› (incl. card_data, tab_content, meta notes)
const countVerifyDeep = (o) => {
  if (typeof o === 'string') return o.includes(VERIFY) ? 1 : 0;
  if (Array.isArray(o)) return o.reduce((n, x) => n + countVerifyDeep(x), 0);
  if (o && typeof o === 'object') return Object.values(o).reduce((n, x) => n + countVerifyDeep(x), 0);
  return 0;
};

if (!slots.length) missing.push('meta.products (no slots)');
if (!sizes.length) missing.push('meta.sizes (no sizes)');

for (const slot of slots) {
  const ad = f.account_data?.[slot];
  const pd = f.payout_data?.[slot];
  need(ad?.eval?.fixed,   REQ.evalFixed,   `account_data.${slot}.eval.fixed`);
  need(ad?.funded?.fixed, REQ.fundedFixed, `account_data.${slot}.funded.fixed`);
  need(pd?.fixed,         REQ.payoutFixed, `payout_data.${slot}.fixed`);
  for (const sz of sizes) {
    need(ad?.eval?.sizes?.[sz],   REQ.evalSize,   `account_data.${slot}.eval.sizes.${sz}`);
    need(ad?.funded?.sizes?.[sz], REQ.fundedSize, `account_data.${slot}.funded.sizes.${sz}`);
    need(pd?.sizes?.[sz],         REQ.payoutSize, `payout_data.${slot}.sizes.${sz}`);
  }
}
for (const ph of ['eval','funded']) { fieldCount++; if (!f.phase_labels?.[ph]?.consistency) missing.push(`phase_labels.${ph}.consistency`); }

const totalVerify = countVerifyDeep(f);

console.log(`\nfirm: ${f.meta?.name}  (${f.meta?.slug})  pattern=${f.meta?.pattern}  slots=[${slots}]  sizes=[${sizes}]`);
console.log(`render contract: ${fieldCount} required fields checked`);
if (missing.length) {
  console.log(`\n  FAIL render-incomplete — ${missing.length} required key(s) MISSING (HTML default would leak):`);
  for (const m of missing.slice(0, 20)) console.log(`    - ${m}`);
  if (missing.length > 20) console.log(`    …and ${missing.length - 20} more`);
} else {
  console.log(`  PASS render-complete — every required key present; page will fully populate.`);
}
console.log(`\n  verification queue: ${totalVerify} ‹VERIFY› field(s) for a human to confirm before publish`);
console.log(`  (${verifyCount} of those are in the required render grid; the rest are card/rules/restricted prose)\n`);
process.exit(missing.length ? 1 : 0);
