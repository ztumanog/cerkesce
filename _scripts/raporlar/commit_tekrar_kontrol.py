import json, re, subprocess
from collections import Counter

DOSYA = "public/data/linguistic/lexemes.json"
HEDEF = "L-D0BAD18AD183"
HEX = re.compile(r"^L-(?:D[01][0-9A-F]{2})+")
COMMITS = ["7a476c7", "65d1b31", "626f36d", "9f874da"]

def yukle(ref):
    r = subprocess.run(["git", "show", f"{ref}:{DOSYA}"], capture_output=True)
    if r.returncode != 0:
        return None
    return json.loads(r.stdout.decode("utf-8-sig"))

veri = {c: yukle(c) for c in COMMITS}
veri["CALISMA"] = json.loads(open(DOSYA, encoding="utf-8-sig").read())

print("== Tekrarlayan kimlikler ==")
for k, lex in veri.items():
    if lex is None:
        print(k, "okunamadi")
        continue
    sayac = Counter(str(e.get("id") or "") for e in lex)
    tekrar = {i: n for i, n in sayac.items() if i and n > 1}
    print(f"{k:<10} tekrarlayan kimlik={len(tekrar)} kayit={sum(tekrar.values())}")
    for i, n in sorted(tekrar.items(), key=lambda x: -x[1])[:5]:
        print(f"    {i} x{n}")

print("\n== HEDEF kimligin kopyalari ==")
for k in ["7a476c7", "65d1b31"]:
    for e in veri[k]:
        if e.get("id") == HEDEF:
            print(f"  {k}: form={e.get('form','')} pos={e.get('partOfSpeech','')} anlam={str(e.get('literalMeaning',''))[:35]}")

def hex_kumesi(lex):
    return {str(e.get("id")) for e in lex if HEX.match(str(e.get("id") or ""))}

a, b = veri["65d1b31"], veri["9f874da"]
ha, hb = hex_kumesi(a), hex_kumesi(b)
kaldirilan = sorted(ha - hb)
print(f"\n== 65d1b31 -> 9f874da: kaldirilan hex={len(kaldirilan)} eklenen hex={len(hb - ha)}")
form_a = {str(e.get("id")): e.get("form", "") for e in a}
for i in kaldirilan[:25]:
    print(f"  {i:<24} {form_a.get(i, '')}")

c = veri["626f36d"]
idsiz = [e for e in c if not str(e.get("id") or "").strip()]
print(f"\n== 626f36d ID'siz kayit: {len(idsiz)}")
for e in idsiz[:10]:
    print("  ", e.get("form", ""), "|", str(e.get("literalMeaning", ""))[:30])
