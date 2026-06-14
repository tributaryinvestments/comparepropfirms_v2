import re,os
REPO="/home/claude/work/repo2"
P={'apex-trader-funding':3299,'blusky-trading-company':3428,'my-funded-futures':3347,'top-one-futures':3395}
for s,_ in P.items():
    h=open(os.path.join(REPO,'prop-firm',s,'index.html'),encoding='utf-8').read()
    # pros: items in pc-list pros ... ; cons: items in pc-list cons
    def items(cls):
        m=re.search(r'pc-list %s"[^>]*>(.*?)</ul>'%cls,h,re.S)
        if not m: return []
        return [re.sub(r'<[^>]+>','',x).strip() for x in re.findall(r'<li[^>]*>(.*?)</li>',m.group(1),re.S)]
    pros=items('pros'); cons=items('cons')
    print("==== %s ===="%s)
    print(" PROS:"); [print("  - "+p) for p in pros[:6]]
    print(" CONS:"); [print("  - "+c) for c in cons[:6]]
