/* ComparePropFirms.com — comparison feature (FIRMS data + tray/overlay/full-page). Shared, vanilla JS. */
const FIRMS = [
{
    id: "tradeify", rank: 1, name: "Tradeify",
    link: "/prop-firm/tradeify/",
    logo: "tradeify", grad: "linear-gradient(135deg,#2eb87a,#1e8757)",
    ribbon: "Instant Funding", award: "🏆 Editor's Choice",
    rating: 5.0, tagline: "Most trustworthy with fast payouts",
    chev: {
      price: { value:"$94", orig:"$145", meta:"$50K Eval", label:"True Funding Fee" },
      split: { value:"90%", meta:"To Trader", label:"Profit Split" },
      save:  { value:"35%", meta:"Save up to", label:"Limited Time Offer" }
    },
    promo: "July Sale Ends 7/31/26 · Use Promo Code: <span class='promo-code-pill'>CPF</span>",
    tags: ["eval","instant","fiveplus","news"],
    sortPrice: 94, sortSave: 35,
    quickFacts: [
      { label:"Account Types", value:"Eval & Instant", sub:"3 account paths" },
      { label:"Days to Payout", value:"1–5 days", sub:"Industry leader" },
      { label:"Max Accounts", value:"5 funded", sub:"$750k combined" },
      { label:"Account Sizes", value:"$25k–$150k", sub:"4 sizes" },
      { label:"Drawdown", value:"EOD Trailing", sub:"+$100 lock" },
      { label:"Consistency", value:"0–40%", sub:"By account type" }
    ],
    paths: [
      { icon:"📈", name:"Growth", tag:"growth", tagText:"Best for Growth", blurb:"Most permissive eval in the industry — no consistency rule during evaluation." },
      { icon:"🛡️", name:"Select", tag:"select", tagText:"Most Popular", blurb:"Select Flex removes the daily loss limit on funded accounts — near-unrestricted trading." },
      { icon:"⚡", name:"Lightning", tag:"lightning", tagText:"Instant Access", blurb:"Skip the evaluation entirely and trade live capital immediately." }
    ],
    pros: [
      "Industry-leading 90% / 10% profit split across all accounts",
      "Payouts processed within 24–72 hours of approval",
      "End-of-day trailing drawdown with a $100 lock",
      "Three paths: no-consistency eval, structured eval, instant funded",
      "News trading, bots, and copy trading all allowed",
      "WealthCharts included free (normally $99/mo)"
    ],
    cons: [
      "Lightning has no resets — a breach ends the account",
      "20% consistency rule on Lightning",
      "Select Daily $25k carries a $500 funded daily loss limit",
      "No refunds on account purchases"
    ],
    verdict: "Tradeify wins on payout speed and instant funding. If you want the cheapest path to funded, go Growth or Select 25K; if you want maximum freedom once funded, go Select Flex; if you want to skip evaluation, go Lightning. All backed by a <strong>$125M+ payout track record</strong>.",
    allowed: ["Futures","News Trading","Bot Trading","Copy Trading","5 Accounts"],
    watch: [["⚠","20% Consistency (Lightning)","caution"],["⚠","No Funded Resets","caution"],["🛑","No Hedging","danger"]],
    platforms: { count: 13, sample: ["Tradovate","TradingView","NinjaTrader","WealthCharts","Quantower"] },
    cmp: { fee:"<span class='cmp-orig'>$145</span><span class='cmp-sale'>$94</span>", split:"90% / 10%", payout:"1–5 days", payoutFreq:"Per 5 winning days", processing:"24–72 hrs", minPayout:"$250", drawdown:"EOD Trailing", dailyLoss:"Varies (Dynamic)", consistency:"0–40%", maxAcc:"5 funded", sizes:"$25k–$150k", minDays:"1–7 days", resets:"Available (eval)", scaling:"Select only", instant:"<span class='cmp-yes'>Yes (Lightning)</span>", actFee:"None", news:"<span class='cmp-yes'>Yes</span>", bots:"<span class='cmp-yes'>Yes</span>", copy:"<span class='cmp-yes'>Yes</span>", weekend:"<span class='cmp-no'>No</span>", refund:"<span class='cmp-no'>No</span>", platforms:"13", score:"5.0" },
    richTabs: true,
    fullPage: "/prop-firm/tradeify/"
  },
{
    id: "lucid", rank: 2, name: "Lucid Trading",
    link: "/prop-firm/lucid-trading/",
    logo: "LUCID", grad: "linear-gradient(135deg,#1f2937,#0b1220)",
    ribbon: "Instant Funding", award: null,
    rating: 5.0, tagline: "Fastest payouts in the industry",
    chev: {
      price: { value:"$70", orig:"$140", meta:"$50K Eval", label:"True Funding Fee" },
      split: { value:"90%", meta:"To Trader", label:"Profit Split" },
      save:  { value:"50%", meta:"Save up to", label:"Limited Time Offer" }
    },
    promo: "Current Sale Ends 7/2/26 · Use Promo Code: <span class='promo-code-pill'>VAULT</span>",
    tags: ["eval","instant","fiveplus","news"],
    sortPrice: 70, sortSave: 50,
    quickFacts: [
      { label:"Account Types", value:"Eval & Instant", sub:"2 paths" },
      { label:"Days to Payout", value:"1–3 days", sub:"Daily while live" },
      { label:"Max Accounts", value:"5 funded", sub:"Copy enabled" },
      { label:"Account Sizes", value:"$50k–$150k", sub:"3 sizes" },
      { label:"Drawdown", value:"EOD Trailing", sub:"10:1 ratio" },
      { label:"Consistency", value:"20%", sub:"Direct only" }
    ],
    paths: [
      { icon:"🧭", name:"LucidTest", tag:"standard", tagText:"Evaluation", blurb:"One-time fee evaluation, often completed in a single trading day." },
      { icon:"⚡", name:"LucidDirect", tag:"lightning", tagText:"Instant", blurb:"Immediate live capital with no evaluation — built for experienced traders." }
    ],
    pros: [
      "Industry-leading 90% / 10% profit split",
      "Same-day to 3-day payouts",
      "Trade up to five funded accounts",
      "End-of-day trailing drawdown",
      "No hard breach rules, no scaling rules",
      "Bot and algorithm trading allowed (no HFT)"
    ],
    cons: [
      "50% of trades must be held at least 5 seconds",
      "20% consistency on the straight-to-funded path",
      "Additional profit requirement with each payout",
      "No swing trading accounts"
    ],
    verdict: "Lucid delivers exceptional speed and clarity across both evaluation and funded pathways. <strong>LucidTest</strong> can complete in a single day; <strong>LucidDirect</strong> jumps straight to a funded account. Strong choice for traders who value scalability and flexible risk settings.",
    allowed: ["Futures","News Trading","Bot Trading","Copy Trading","Custom Risk"],
    watch: [["⚠","20% Consistency (Direct)","caution"],["⚠","5-Second Hold Rule","caution"],["🛑","No Swing Trading","danger"]],
    platforms: { count: 9, sample: ["ProjectX","Rithmic","Tradovate","TradingView","Quantower"] },
    cmp: { fee:"<span class='cmp-orig'>$140</span><span class='cmp-sale'>$70</span>", split:"90% / 10%", payout:"1–3 days", payoutFreq:"Daily / 5-day", processing:"24–72 hrs", minPayout:"$250", drawdown:"EOD Trailing", dailyLoss:"Varies", consistency:"20% (Direct)", maxAcc:"5 funded", sizes:"$50k–$150k", minDays:"3 days", resets:"Available", scaling:"<span class='cmp-yes'>Yes</span>", instant:"<span class='cmp-yes'>Yes (Direct)</span>", actFee:"None", news:"<span class='cmp-yes'>Yes</span>", bots:"Yes (no HFT)", copy:"<span class='cmp-yes'>Yes</span>", weekend:"<span class='cmp-no'>No</span>", refund:"<span class='cmp-no'>No</span>", platforms:"9", score:"5.0" }
  },
{
    id: "purdia", rank: 3, name: "Purdia Capital",
    link: "/prop-firm/purdia-capital/",
    logo: "Purdia", grad: "linear-gradient(135deg,#2554c7,#1d3f99)",
    ribbon: "Instant Funding", award: null,
    rating: 4.9, tagline: "Fast track to live with zero payout denials",
    chev: {
      price: { value:"$349", meta:"$50K Instant", label:"True Funding Fee" },
      split: { value:"90%", meta:"To Trader", label:"Profit Split" },
      save:  { value:"36%", meta:"Save up to", label:"Limited Time Offer" }
    },
    promo: "July Sale Ends 7/31/26 · Use Promo Code: <span class='promo-code-pill'>CORE200</span>",
    tags: ["eval","instant","news"],
    sortPrice: 349, sortSave: 36,
    quickFacts: [
      { label:"Account Types", value:"Instant Funded", sub:"Direct only" },
      { label:"Days to Payout", value:"2–4 days", sub:"Zero denials" },
      { label:"Max Accounts", value:"3 funded", sub:"Combine allowed" },
      { label:"Account Sizes", value:"$25k–$150k", sub:"4 sizes" },
      { label:"Drawdown", value:"Static", sub:"Predictable" },
      { label:"Consistency", value:"None", sub:"No rule" }
    ],
    paths: [
      { icon:"⚡", name:"Instant Core", tag:"lightning", tagText:"Instant Access", blurb:"Pay once and trade live capital from day one — no evaluation phase." }
    ],
    pros: [
      "Zero payout denials track record",
      "90% / 10% profit split",
      "Static drawdown — no trailing surprises",
      "Fast track straight to live capital",
      "No daily loss limit on funded"
    ],
    cons: [
      "Higher up-front fee (instant funding)",
      "Capped at 3 funded accounts",
      "No low-cost evaluation entry point",
      "Newer firm with shorter track record"
    ],
    verdict: "Purdia is a pure instant-funding play. You pay more up front, but you skip evaluation, get a predictable <strong>static drawdown</strong>, and benefit from a clean zero-denial payout record. Best for confident, experienced traders who want certainty over a cheap entry point.",
    allowed: ["Futures","News Trading","Bot Trading","No DLL"],
    watch: [["⚠","Higher Entry Fee","caution"],["⚠","3 Account Cap","caution"]],
    platforms: { count: 7, sample: ["Tradovate","Rithmic","NinjaTrader","Quantower"] },
    cmp: { fee:"$349 <span style='color:var(--gray-500)'>(instant)</span>", split:"90% / 10%", payout:"2–4 days", payoutFreq:"After 5 days", processing:"24–48 hrs", minPayout:"$250", drawdown:"Static", dailyLoss:"<span class='cmp-yes'>None</span>", consistency:"None", maxAcc:"3 funded", sizes:"$25k–$150k", minDays:"5 days", resets:"—", scaling:"<span class='cmp-no'>No</span>", instant:"<span class='cmp-yes'>Yes (only)</span>", actFee:"None", news:"<span class='cmp-yes'>Yes</span>", bots:"<span class='cmp-yes'>Yes</span>", copy:"Limited", weekend:"<span class='cmp-no'>No</span>", refund:"<span class='cmp-no'>No</span>", platforms:"7", score:"4.9" }
  },
  {
    id: "alpha", rank: 4, name: "Alpha Futures",
    link: "/prop-firm/alpha-futures/", fullPage: "/prop-firm/alpha-futures/",
    logo: "ALPHA", grad: "linear-gradient(135deg,#0f766e,#0b4f49)",
    ribbon: "One-Step Eval", award: null,
    rating: 4.9, tagline: "EOD drawdown & fast payouts",
    cmp: {fee:"$59.25<span style='color:var(--gray-500)'>/mo</span>",split:"90% / 10%",payout:"5 winning days",payoutFreq:"Up to 4×/month",processing:"≤48 business hrs",minPayout:"$200",drawdown:"EOD Trailing",dailyLoss:"$500 (Zero)",consistency:"50% (eval)",maxAcc:"5 funded",sizes:"$50k–$150k",minDays:"1–2 days",resets:"Available",scaling:"<span class='cmp-yes'>Yes</span>",instant:"<span class='cmp-no'>No</span>",actFee:"$0–$149",news:"<span class='cmp-yes'>Yes</span>",bots:"Semi-auto only",copy:"<span class='cmp-yes'>Yes</span>",weekend:"<span class='cmp-no'>No</span>",refund:"<span class='cmp-no'>No</span>",platforms:"6",score:"4.9"},
    chev: {
      price: { value:"$79", meta:"Zero 25K / mo", label:"Lowest Monthly" },
      split: { value:"90%", meta:"To Trader", label:"Profit Split" },
      save:  { value:"25%", meta:"Save up to", label:"All Accounts" }
    },
    promo: "25% Off All Accounts \u2014 Limited Time \u00b7 Code: <span class='promo-code-pill'>Jered016805</span>",
    tags: ["eval","fiveplus","news"], sortPrice: 79, sortSave: 25,
    quickFacts: [
      { label:"Account Types", value:"One-Step Eval", sub:"3 paths" },
      { label:"Profit Split", value:"90% / 10%", sub:"All accounts" },
      { label:"Max Accounts", value:"5 funded", sub:"Alpha Prime scaling" },
      { label:"Account Sizes", value:"$50k–$150k", sub:"3 sizes" },
      { label:"Drawdown", value:"EOD Trailing MLL", sub:"$100 lock" },
      { label:"Consistency", value:"50% eval", sub:"None once qualified" }
    ],
    pros: ["90% / 10% split on every account type","One-step evaluation \u2014 no second phase","EOD trailing MLL with a $100 buffer","Up to 5 accounts with Alpha Prime scaling"],
    cons: ["Subscription pricing, not a one-time fee","50% consistency rule during evaluation","$149 activation on Premium (Standard) and Advanced"],
    verdict: "Alpha Futures is a one-step, subscription-based evaluation with a clean 90/10 split and an EOD trailing drawdown. Premium is the sweet spot \u2014 no Daily Loss Guard and no qualified-consistency rule \u2014 with room to scale to five accounts.",
    platforms: { count: 6, sample: ["Tradovate","NinjaTrader","TradingView","Quantower","WealthCharts"] },
    richTabs: false
  },
{
    id: "topstep", rank: 5, name: "Topstep",
    link: "/prop-firm/topstep/",
    logo: "TOPSTEP", grad: "linear-gradient(135deg,#111827,#000)",
    ribbon: null, award: "🎖️ Most Established",
    rating: 4.8, tagline: "Longest running prop firm, founded in 2010",
    chev: {
      price: { value:"$85/mo", meta:"$50K Eval", label:"True Funding Fee" },
      split: { value:"100%", meta:"First $10K", label:"Profit Split" },
      save:  { value:"70%", meta:"Save up to", label:"Limited Time Offer" }
    },
    promo: "No Promo Code Needed",
    tags: ["eval","fiveplus","split100","news"],
    sortPrice: 85, sortSave: 70,
    quickFacts: [
      { label:"Account Types", value:"Evaluation", sub:"Subscription" },
      { label:"Days to Payout", value:"5 days", sub:"Reliable" },
      { label:"Max Accounts", value:"5 funded", sub:"Established" },
      { label:"Account Sizes", value:"$50k–$150k", sub:"3 sizes" },
      { label:"Drawdown", value:"EOD Trailing", sub:"Standard" },
      { label:"Consistency", value:"None", sub:"No rule" }
    ],
    paths: [
      { icon:"🏛️", name:"Trading Combine", tag:"standard", tagText:"Evaluation", blurb:"The original subscription-based evaluation — keep 100% of your first $10K." }
    ],
    pros: [
      "100% profit split on the first $10,000",
      "Longest-running prop firm — founded 2010",
      "Strong brand recognition and reliability",
      "No promo code required for the current offer",
      "Up to 5 funded accounts"
    ],
    cons: [
      "Monthly subscription model rather than one-time fee",
      "Slower 5-day payout window",
      "No instant-funding option",
      "Profit split steps to 90% after first $10K"
    ],
    verdict: "Topstep is the trusted veteran. The <strong>100%-first-$10K</strong> threshold and 15-year reputation make it the safe pick for traders who prioritize brand reliability over the cheapest entry or the fastest payout.",
    allowed: ["Futures","News Trading","5 Accounts","Established 2010"],
    watch: [["⚠","Monthly Subscription","caution"],["⚠","No Instant Funding","caution"]],
    platforms: { count: 6, sample: ["TopstepX","Tradovate","NinjaTrader","TradingView"] },
    cmp: { fee:"$85<span style='color:var(--gray-500)'>/mo</span>", split:"100% first $10K", payout:"5 days", payoutFreq:"Weekly", processing:"1–3 days", minPayout:"No min", drawdown:"EOD Trailing", dailyLoss:"Yes (MLL)", consistency:"None", maxAcc:"5 funded", sizes:"$50k–$150k", minDays:"2 days", resets:"Available", scaling:"<span class='cmp-yes'>Yes</span>", instant:"<span class='cmp-no'>No</span>", actFee:"Monthly sub", news:"<span class='cmp-yes'>Yes</span>", bots:"Limited", copy:"<span class='cmp-no'>No</span>", weekend:"<span class='cmp-no'>No</span>", refund:"<span class='cmp-no'>No</span>", platforms:"6", score:"4.8" }
  },
  {
    id: "fundednext", rank: 6, name: "FundedNext Futures",
    link: "/prop-firm/fundednext-futures/", fullPage: "/prop-firm/fundednext-futures/",
    logo: "FN", grad: "linear-gradient(135deg,#7c3aed,#4c1d95)",
    ribbon: "4 Models", award: null,
    rating: 4.5, tagline: "Industry-low evaluation profit targets",
    cmp: {fee:"$79.99",split:"80% → 90%",payout:"From 3 days",payoutFreq:"Daily (Bolt)",processing:"~24 hrs",minPayout:"$250 min",drawdown:"EOD Trailing",dailyLoss:"None",consistency:"40%",maxAcc:"5 funded",sizes:"$25k–$150k",minDays:"1 day",resets:"Available",scaling:"<span class='cmp-no'>No</span>",instant:"<span class='cmp-no'>No</span>",actFee:"None",news:"<span class='cmp-yes'>Yes</span>",bots:"<span class='cmp-yes'>Yes</span>",copy:"<span class='cmp-yes'>Yes</span>",weekend:"<span class='cmp-no'>No</span>",refund:"<span class='cmp-no'>No</span>",platforms:"3",score:"4.5"},
    chev: {
      price: { value:"$79.99", meta:"Flex $50K", label:"Lowest Entry Fee" },
      split: { value:"Up to 90%", meta:"To Trader", label:"Reward Share" },
      save:  { value:"40%", meta:"Save up to", label:"Flex Launch Offer" }
    },
    promo: "Flex Launch Offer \u2014 Limited Time \u00b7 Code: <span class='promo-code-pill'>FLEX</span>",
    tags: ["eval"], sortPrice: 80, sortSave: 40,
    quickFacts: [
      { label:"Account Types", value:"4 models", sub:"Rapid/Legacy/Bolt/Flex" },
      { label:"Profit Split", value:"80% → 90%", sub:"Flex add-on" },
      { label:"Max Accounts", value:"5 funded", sub:"No monthly fees" },
      { label:"Account Sizes", value:"$25k–$150k", sub:"by model" },
      { label:"Drawdown", value:"EOD Trailing MLL", sub:"+$100 lock" },
      { label:"Activation", value:"None", sub:"one-time fee" }
    ],
    pros: ["Industry-low profit targets across four models","Up to 90% reward share via Flex add-on","Payouts within 24h of approval, or $1,000 extra","No activation or monthly fees"],
    cons: ["80/20 base split unless you add Flex","40% consistency once funded on some models"],
    verdict: "FundedNext brings four challenge models and the lowest profit targets in the space, with a clear road to live funding on Flex. Strong for traders who want a one-step eval and fast, guaranteed-timely payouts.",
    platforms: { count: 3, sample: ["Tradovate","NinjaTrader","TradingView"] },
    richTabs: false
  },
  {
    id: "bulenox", rank: 7, name: "Bulenox",
    link: "/prop-firm/bulenox/", fullPage: "/prop-firm/bulenox/",
    logo: "BX", grad: "linear-gradient(135deg,#0891b2,#0e4f6b)",
    ribbon: "Weekly Payouts", award: null,
    rating: 4.3, tagline: "Best-value futures evals with weekly payouts",
    cmp: {fee:"$19.25<span style='color:var(--gray-500)'>/mo</span>",split:"100% first $10K",payout:"10 days",payoutFreq:"Weekly (Wed)",processing:"24 hours",minPayout:"$1,000 min",drawdown:"Trailing or EOD",dailyLoss:"None",consistency:"40%",maxAcc:"Up to 11",sizes:"$25k–$250k",minDays:"None",resets:"$78",scaling:"<span class='cmp-no'>No</span>",instant:"<span class='cmp-no'>No</span>",actFee:"$143–$898 (Master)",news:"<span class='cmp-yes'>Yes</span>",bots:"<span class='cmp-yes'>Yes</span>",copy:"<span class='cmp-yes'>Yes</span>",weekend:"<span class='cmp-no'>No</span>",refund:"<span class='cmp-no'>No</span>",platforms:"8+",score:"4.3"},
    chev: {
      price: { value:"$19", meta:"+ $149 Funding Fee", label:"True Funding Fee" },
      split: { value:"100%", meta:"First $10K", label:"Profit Split" },
      save:  { value:"89%", meta:"Save up to", label:"Trailing \u00b7 Code 5JESS" }
    },
    promo: "Up to 89% Off Trailing \u00b7 Code: <span class='promo-code-pill'>5JESS</span>",
    tags: ["eval"], sortPrice: 19, sortSave: 89,
    quickFacts: [
      { label:"Products", value:"2 evals", sub:"Trailing / EOD" },
      { label:"Profit Split", value:"100% / 90%", sub:"100% on first $10k" },
      { label:"Account Sizes", value:"$25k–$250k", sub:"5 sizes" },
      { label:"Drawdown", value:"Trailing or EOD", sub:"by product" },
      { label:"Data / OS", value:"Rithmic", sub:"Windows-only" },
      { label:"Payouts", value:"Weekly", sub:"Wednesdays" }
    ],
    pros: ["100% split on the first $10k, 90% after","No daily loss limit on the Trailing product","Full contract size from day one (no scaling)","Five sizes up to $250k"],
    cons: ["Monthly subscription plus a $149 funding fee","Rithmic / Windows-only data stack"],
    verdict: "Bulenox offers monthly-subscription evaluations with a 100%-on-first-$10k split and weekly Wednesday payouts. Best value for traders who want to trade their own plan with no daily loss limit on the Trailing product.",
    platforms: { count: 3, sample: ["NinjaTrader","Quantower","Rithmic"] },
    richTabs: false
  },
  {
    id: "daytraders", rank: 8, name: "DayTraders.com",
    link: "/prop-firm/daytraders/", fullPage: "/prop-firm/daytraders/",
    logo: "DT", grad: "linear-gradient(135deg,#dc2626,#7f1d1d)",
    ribbon: "100% Split", award: null,
    rating: 4.5, tagline: "100% profit split with automated payouts",
    cmp: {fee:"$30",split:"100%",payout:"8 days",payoutFreq:"Every 8 days",processing:"~32 min (Plane)",minPayout:"$500 min",drawdown:"Trailing / EOD / Static",dailyLoss:"$800–$3,750",consistency:"30% (funded)",maxAcc:"Up to 15",sizes:"$25k–$300k",minDays:"2 days",resets:"Discounted",scaling:"<span class='cmp-no'>No</span>",instant:"<span class='cmp-yes'>Yes</span>",actFee:"$130 (evals)",news:"<span class='cmp-yes'>Yes</span>",bots:"<span class='cmp-yes'>Yes</span>",copy:"<span class='cmp-yes'>Yes</span>",weekend:"<span class='cmp-no'>No</span>",refund:"<span class='cmp-no'>No</span>",platforms:"8+",score:"4.5"},
    chev: {
      price: { value:"$30", meta:"$50K \u00b7 +$130 Fee", label:"True Funding Fee" },
      split: { value:"100%", meta:"To Trader", label:"Profit Split" },
      save:  { value:"90%", meta:"Save up to", label:"Limited Time" }
    },
    promo: "Up to 90% Off \u2014 Limited Time \u00b7 Code: <span class='promo-code-pill'>WODWQBSZ</span>",
    tags: ["eval","instant"], sortPrice: 30, sortSave: 90,
    quickFacts: [
      { label:"Account Types", value:"5", sub:"Trail/EOD/Static/S2F/S2L" },
      { label:"Profit Split", value:"100%", sub:"Pro \u00b7 80/20 on Live" },
      { label:"Max Accounts", value:"Up to 15", sub:"\u22645 instant (S2F)" },
      { label:"Account Sizes", value:"$25k–$300k", sub:"by type" },
      { label:"Drawdown", value:"Trailing / EOD / Static", sub:"by type" },
      { label:"Payouts", value:"Plane", sub:"~32 min approvals" }
    ],
    pros: ["100% profit split on funded Pro accounts","Fast automated payouts via Plane (~32 min)","Instant (S2F) and live-capital (S2L) paths","Up to 15 funded accounts"],
    cons: ["$150,000 lifetime withdrawal cap per trader","$130 activation on Trail/EOD/Static"],
    verdict: "DayTraders.com pairs a 100% funded split with fast automated payouts and a flexible five-type lineup, including instant funding and a straight-to-live path. A strong pick for traders who want choice in how they get funded.",
    platforms: { count: 2, sample: ["Onyx","WealthCharts"] },
    richTabs: false
  },
  {
    id: "ffn", rank: 9, name: "Funded Futures Network",
    link: "/prop-firm/funded-futures-network/", fullPage: "/prop-firm/funded-futures-network/",
    logo: "FFN", grad: "linear-gradient(135deg,#2563eb,#1e3a8a)",
    ribbon: "Same-Day Pay", award: null,
    rating: 4.4, tagline: "Same-day payouts \u00b7 EOD drawdown",
    cmp: {fee:"$75<span style='color:var(--gray-500)'>/mo</span>",split:"80% → 90%",payout:"Same day",payoutFreq:"Same day",processing:"Same day",minPayout:"$500 min",drawdown:"Trailing / EOD",dailyLoss:"$1,250 (MAX, soft)",consistency:"40%",maxAcc:"10 / 5 funded",sizes:"$25k–$250k",minDays:"2–7 days",resets:"$100",scaling:"<span class='cmp-yes'>Yes</span>",instant:"<span class='cmp-no'>No</span>",actFee:"None",news:"<span class='cmp-yes'>Yes</span>",bots:"<span class='cmp-yes'>Yes</span>",copy:"<span class='cmp-yes'>Yes</span>",weekend:"<span class='cmp-no'>No</span>",refund:"<span class='cmp-no'>No</span>",platforms:"2",score:"4.4"},
    chev: {
      price: { value:"$40", meta:"$50K Eval", label:"True Funding Fee" },
      split: { value:"80% \u2192 90%", meta:"Up to 90%", label:"Profit Split" },
      save:  { value:"75%", meta:"Save up to", label:"BOGO July Sale" }
    },
    promo: "July Sale \u2014 50% Off + Buy-One-Get-One \u00b7 Code: <span class='promo-code-pill'>BOGOISBACK</span> (ends 7/31/26)",
    tags: ["eval"], sortPrice: 40, sortSave: 75,
    quickFacts: [
      { label:"Products", value:"Standard + Express", sub:"OG / MAX styles" },
      { label:"Profit Split", value:"80% → 90%", sub:"Live after $5k payouts" },
      { label:"Max Accounts", value:"10 / 5 funded", sub:"Copy trading on 5" },
      { label:"Account Sizes", value:"$25k–$250k", sub:"5 sizes" },
      { label:"Drawdown", value:"Trailing / EOD", sub:"by style" },
      { label:"Payouts", value:"Same day", sub:"two eval styles" }
    ],
    pros: ["Same-day payouts","80% \u2192 90% split after $5k cumulative payouts","Two evaluation styles (OG / MAX) across five sizes","Copy trading across up to five accounts"],
    cons: ["Live capital only after $5,000 in payouts","Daily loss limit on the Standard MAX style"],
    verdict: "Funded Futures Network is a trader-built firm with same-day payouts and an 80\u219290% split once you reach $5k in payouts. Two evaluation styles across five sizes give flexibility on pace and price.",
    platforms: { count: 4, sample: ["Tradovate","NinjaTrader","TradingView","Quantower"] },
    richTabs: false
  },
  {
    id: "tradeday", rank: 10, name: "TradeDay",
    link: "/prop-firm/trade-day/", fullPage: "/prop-firm/trade-day/",
    logo: "TD", grad: "linear-gradient(135deg,#0d9488,#134e4a)",
    ribbon: "No Activation", award: null,
    rating: 4.3, tagline: "Day-one payouts \u00b7 no activation fee",
    cmp: {fee:"$62<span style='color:var(--gray-500)'>/mo</span>",split:"80% → 90%",payout:"Day 1 (Quick Pay)",payoutFreq:"On demand",processing:"≤24 hrs",minPayout:"$250",drawdown:"Intraday / EOD",dailyLoss:"None",consistency:"30% (eval)",maxAcc:"Up to 6",sizes:"$50k–$100k",minDays:"5 days",resets:"$60",scaling:"<span class='cmp-no'>No</span>",instant:"<span class='cmp-no'>No</span>",actFee:"None",news:"No (Tier-1 lockout)",bots:"<span class='cmp-yes'>Yes</span>",copy:"<span class='cmp-yes'>Yes</span>",weekend:"<span class='cmp-no'>No</span>",refund:"<span class='cmp-no'>No</span>",platforms:"3",score:"4.3"},
    chev: {
      price: { value:"$62.50", meta:"50K Quick Pay / mo", label:"Lead Price" },
      split: { value:"80%", meta:"To Trader", label:"Profit Split" },
      save:  { value:"50%", meta:"Save up to", label:"All Plans" }
    },
    promo: "50% Off All Plans \u2014 Limited Time \u00b7 Code: <span class='promo-code-pill'>TDNEW</span>",
    tags: ["eval"], sortPrice: 62, sortSave: 50,
    quickFacts: [
      { label:"Products", value:"Quick Pay / Fast Pass", sub:"TradeDay 2.0" },
      { label:"Profit Split", value:"80% → 90% Live", sub:"50/50 below $4k" },
      { label:"Account Sizes", value:"$50k–$100k+", sub:"monthly sub" },
      { label:"Drawdown", value:"Intraday / EOD", sub:"by SKU" },
      { label:"Activation", value:"None", sub:"no activation fee" },
      { label:"Payouts", value:"Day one", sub:"Quick Pay funded" }
    ],
    pros: ["Day-one payouts on Quick Pay funded","No activation fee on any plan","Intraday or EOD drawdown options","Path to real live capital"],
    cons: ["Quick Pay pays 50/50 below $4k net","Funded Live move is at TradeDay's discretion"],
    verdict: "TradeDay's relaunched 2.0 lineup offers day-one payouts on Quick Pay, no activation fee, and a path to live capital. A solid choice for traders who want flexible drawdown options on a monthly subscription.",
    platforms: { count: 5, sample: ["NinjaTrader","Quantower","TradingView","Jigsaw"] },
    richTabs: false
  },
  {
    id: "tpt", rank: 11, name: "Take Profit Trader",
    link: "/prop-firm/take-profit-trader/", fullPage: "/prop-firm/take-profit-trader/",
    logo: "TPT", grad: "linear-gradient(135deg,#ea580c,#7c2d12)",
    ribbon: "No DLL", award: null,
    rating: 4.3, tagline: "Day-one payouts \u00b7 no daily loss limit",
    cmp: {fee:"$102<span style='color:var(--gray-500)'>/mo</span>",split:"80% → 90%",payout:"1 day",payoutFreq:"On request",processing:"On request",minPayout:"No min",drawdown:"Trailing",dailyLoss:"None (optional)",consistency:"50% (eval)",maxAcc:"Up to 5",sizes:"$25k–$150k",minDays:"5 days",resets:"Up to 3 (PRO)",scaling:"<span class='cmp-no'>No</span>",instant:"<span class='cmp-no'>No</span>",actFee:"$0 (NOFEE30)",news:"<span class='cmp-yes'>Yes</span>",bots:"<span class='cmp-yes'>Yes</span>",copy:"<span class='cmp-yes'>Yes</span>",weekend:"<span class='cmp-no'>No</span>",refund:"<span class='cmp-no'>No</span>",platforms:"3",score:"4.3"},
    chev: {
      price: { value:"$119", meta:"$50K Eval", label:"True Funding Fee" },
      split: { value:"80\u201390%", meta:"PRO \u2192 PRO+", label:"Profit Split" },
      save:  { value:"35%", meta:"Save up to", label:"July Sale" }
    },
    promo: "July Sale Ends 7/31/26 \u00b7 Code: <span class='promo-code-pill'>NOFEE30</span>",
    tags: ["eval"], sortPrice: 119, sortSave: 35,
    quickFacts: [
      { label:"Product", value:"Single", sub:"Test \u2192 PRO \u2192 PRO+" },
      { label:"Profit Split", value:"80% → 90%", sub:"PRO \u2192 PRO+" },
      { label:"Account Sizes", value:"$25k–$150k", sub:"5 sizes" },
      { label:"Drawdown", value:"Trailing", sub:"locks at start" },
      { label:"Daily Loss Limit", value:"None", sub:"removed firm-wide" },
      { label:"Activation", value:"$0", sub:"with code NOFEE30" }
    ],
    pros: ["No daily loss limit (removed firm-wide)","Day-one payouts","$0 activation with code NOFEE30","Copy trading allowed; simple single product"],
    cons: ["No second account type / size toggle","News trading restricted on PRO"],
    verdict: "Take Profit Trader keeps it simple: one product, Test \u2192 PRO \u2192 PRO+, no daily loss limit, day-one payouts, and $0 activation with the always-on promo. Easy to understand and trade.",
    platforms: { count: 13, sample: ["Tradovate","NinjaTrader","TradingView","Quantower"] },
    richTabs: false
  }
];


/* ---- affiliate links + logo-slug helper ---- */
const AFF = {
  tradeify:"https://tradeify.co/?ref=cpf",
  lucid:"https://lucidtrading.com/ref/ComparePropFunds/?campaign=Plans#plans",
  purdia:"https://purdia.com/?i=blackcatholdings",
  alpha:"https://app.alpha-futures.com/signup/Jered016805/",
  topstep:"https://www.topstep.com/",
  fundednext:"https://fundednext.com/futures/?fpr=jered18",
  bulenox:"https://bulenox.com/member/aff/go/jeredklima",
  daytraders:"https://daytraders.com/go/blackcatholdings?c=WODWQBSZ",
  ffn:"https://www.fundedfuturesnetwork.com/?via=CPF",
  tradeday:"https://www.tradeday.com/?a_aid=cpf",
  tpt:"https://takeprofittrader.com/?referralCode=CPF"
};
function slug(f){ return (f.link||"").replace("/prop-firm/","").replace(/\/$/,""); }

const compareSet = new Set();
let compareMode = 'overlay';

function toggleCompare(id){
  if(compareSet.has(id)) compareSet.delete(id);
  else { if(compareSet.size>=4){ flashTray(); return; } compareSet.add(id); }
  syncCompareButtons();
  renderTray();
}
function syncCompareButtons(){
  document.querySelectorAll('.add-compare').forEach(btn=>{
    const on = compareSet.has(btn.dataset.id);
    btn.classList.toggle('added', on);
    btn.textContent = on ? '✓ Added to Compare' : '＋ Add to Compare';
  });
}
function renderTray(){
  const tray = document.getElementById('compare-tray');
  const slots = document.getElementById('compare-slots');
  if(!tray || !slots) return;
  document.getElementById('compare-badge').textContent = compareSet.size;
  document.getElementById('compare-go').disabled = compareSet.size < 2;
  tray.classList.toggle('show', compareSet.size > 0);
  slots.innerHTML = [...compareSet].map(id=>{
    const f = FIRMS.find(x=>x.id===id);
    return `<div class="compare-slot"><span class="mini-logo"><img src="/cpf-logos/${slug(f)}-logo.png" alt=""></span>${f.name}<span class="remove" data-remove="${id}">✕</span></div>`;
  }).join('');
  slots.querySelectorAll('[data-remove]').forEach(x=>{
    x.addEventListener('click', ()=>{ compareSet.delete(x.dataset.remove); syncCompareButtons(); renderTray(); });
  });
}
function flashTray(){
  const t=document.getElementById('compare-tray');
  if(t && t.animate) t.animate([{transform:'translateY(-4px)'},{transform:'translateY(0)'}],{duration:180});
}

const CMP_ROWS_SIMPLE = [
  ['fee','$50K Account Fee'], ['split','Profit Split'], ['payout','Days to Payout'],
  ['drawdown','Drawdown Type'], ['consistency','Consistency Rule'], ['maxAcc','Max Funded Accounts'],
  ['sizes','Account Sizes'], ['instant','Instant Funding'], ['actFee','Activation Fee'], ['score','CPF Score']
];
const CMP_ROWS_FULL = [
  ['__group','Pricing & Funding'],
  ['fee','$50K Account Fee'], ['sizes','Account Sizes'], ['instant','Instant Funding'], ['actFee','Activation Fee'],
  ['__group','Profit & Payouts'],
  ['split','Profit Split'], ['payout','Days to Payout'], ['payoutFreq','Payout Frequency'], ['processing','Processing Time'], ['minPayout','Minimum Payout'],
  ['__group','Risk & Rules'],
  ['drawdown','Drawdown Type'], ['dailyLoss','Daily Loss Limit'], ['consistency','Consistency Rule'], ['maxAcc','Max Funded Accounts'], ['minDays','Min Trading Days'], ['resets','Resets'], ['scaling','Scaling Plan'],
  ['__group','Trading Permissions'],
  ['news','News Trading'], ['bots','Bot / Algo Trading'], ['copy','Copy Trading'], ['weekend','Weekend Holding'], ['refund','Refund Policy'],
  ['__group','Platforms & Rating'],
  ['platforms','Platforms Supported'], ['score','CPF Score']
];
function comparisonTableHTML(rows){
  const firms = [...compareSet].map(id=>FIRMS.find(f=>f.id===id));
  const colCount = firms.length + 1;
  const heads = firms.map(f=>`
    <th>
      <div class="cmp-firm-logo"><img src="/cpf-logos/${slug(f)}-logo.png" alt="${f.name} logo"></div>
      <div class="cmp-firm-name">${f.name}</div>
      <div class="cmp-firm-stars">★★★★★</div>
      <div class="cmp-firm-score">${typeof f.rating==='number'?f.rating.toFixed(1):'—'} · CPF Score</div>
    </th>`).join('');
  const body = rows.map(([key,label])=>{
    if(key==='__group'){
      return `<tr class="cmp-group"><td class="cmp-metric cmp-group-cell" colspan="${colCount}">${label}</td></tr>`;
    }
    return `<tr>
      <td class="cmp-metric">${label}</td>
      ${firms.map(f=>`<td class="is-firm">${(f.cmp&&f.cmp[key])||'—'}</td>`).join('')}
    </tr>`;
  }).join('');
  const ctas = firms.map(f=>`<td><a class="cmp-cta" href="${AFF[f.id]||f.link}" target="_blank" rel="sponsored nofollow noopener">Get Funded →</a></td>`).join('');
  return `
    <table class="cmp-table">
      <thead><tr><th class="cmp-metric">Metric</th>${heads}</tr></thead>
      <tbody>
        ${body}
        <tr class="cmp-cta-row"><td class="cmp-metric"></td>${ctas}</tr>
      </tbody>
    </table>`;
}
function openCompare(){
  if(compareSet.size < 2) return;
  if(compareMode === 'overlay'){
    document.getElementById('cmp-modal-body').innerHTML = comparisonTableHTML(CMP_ROWS_SIMPLE)
      + `<div style="text-align:center;font-size:12.5px;color:var(--gray-500);margin-top:14px;">Want the complete breakdown? Switch to <strong style="color:var(--blue-dark)">Full page</strong> in the compare bar for payouts, rules, permissions &amp; more.</div>`;
    document.getElementById('cmp-backdrop').classList.add('show');
    document.body.style.overflow = 'hidden';
  } else {
    document.getElementById('cmp-fp-body').innerHTML = comparisonTableHTML(CMP_ROWS_FULL);
    document.getElementById('cmp-fullpage').classList.add('show');
    document.body.style.overflow = 'hidden';
    window.scrollTo(0,0);
  }
}
function closeCompare(){
  const bd=document.getElementById('cmp-backdrop'); if(bd) bd.classList.remove('show');
  const fp=document.getElementById('cmp-fullpage'); if(fp) fp.classList.remove('show');
  document.body.style.overflow = '';
}
function initCompare(){
  document.querySelectorAll('.add-compare').forEach(btn=>{
    btn.addEventListener('click', ()=> toggleCompare(btn.dataset.id));
  });
  const clr=document.getElementById('compare-clear'); if(clr) clr.addEventListener('click', ()=>{ compareSet.clear(); syncCompareButtons(); renderTray(); });
  const go=document.getElementById('compare-go'); if(go) go.addEventListener('click', openCompare);
  const mc=document.getElementById('cmp-modal-close'); if(mc) mc.addEventListener('click', closeCompare);
  const fpc=document.getElementById('cmp-fp-close'); if(fpc) fpc.addEventListener('click', closeCompare);
  const bd=document.getElementById('cmp-backdrop'); if(bd) bd.addEventListener('click', e=>{ if(e.target.id==='cmp-backdrop') closeCompare(); });
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeCompare(); });
  document.querySelectorAll('#compare-mode-seg .seg-btn').forEach(b=>{
    b.addEventListener('click', ()=>{
      document.querySelectorAll('#compare-mode-seg .seg-btn').forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      compareMode = b.dataset.cmode;
    });
  });
  document.querySelectorAll('[data-open-compare]').forEach(b=> b.addEventListener('click', openCompare));
  syncCompareButtons();
  renderTray();
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initCompare);
else initCompare();
