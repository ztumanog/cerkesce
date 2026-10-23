import json, subprocess, glob
from collections import Counter

DOSYA = "public/data/linguistic/lexemes.json"
KOK = "R-KHUMEN"
REFS = ["65d1b31", "626f36d", "9f874da", "HEAD"]
KAYIP = ["къуэпсы", "къуэлабэ", "къуэкӀэмыщӀэ", "къуажедээс", "къуажехь"]

def git_json(ref):
    r = subprocess.run(["git", "show", f"{ref}:{DOSYA}"], capture_output=True)
    if r.returncode != 0:
        return None
    return json.loads(r.stdout.decode("utf-8-sig"))

def rids(e):
    d = e.get("derivation") if isinstance(e.get("derivation"), dict) else {}
    return set(str(x) for x in (e.get("rootIds") or [])) | set(str(x) for x in (d.get("rootIds") or []))

def anahtar(e):
    return (str(e.get("id") or ""), str(e.get("form") or ""))

veri = {r: git_json(r) for r in REFS}

print("== R-KHUMEN sayisi ==")
for r in REFS:
    lex = veri[r]
    if lex is None:
        print(f"  {r}: okunamadi")
        continue
    n = sum(1 for e in lex if KOK in rids(e))
    print(f"  {r:<10} kayit={len(lex):>6} R-KHUMEN={n}")

print("\n== Commit gecislerinde R-KHUMEN degisimi (id+form eslesmesi) ==")
for onceki, sonraki in zip(REFS, REFS[1:]):
    a, b = veri[onceki], veri[sonraki]
    if a is None or b is None:
        continue
    harita = {}
    for e in a:
        harita.setdefault(anahtar(e), set()).update(rids(e))
    durum = Counter()
    ornek = []
    for e in b:
        if KOK not in rids(e):
            continue
        k = anahtar(e)
        if k not in harita:
            s = "kayit_yok_once"
        elif KOK in harita[k]:
            continue
        elif not harita[k]:
            s = "kok_yok_once"
        else:
            s = "baska_kok_vardi"
        durum[s] += 1
        if len(ornek) < 6:
            ornek.append((k, s, sorted(harita.get(k, []))))
    print(f"  {onceki} -> {sonraki}: {dict(durum)}")
    for o in ornek:
        print(f"      {o[0][0]:<22} {o[0][1]:<14} once={o[2]}  [{o[1]}]")

print("\n== Kayip formlarin dosyalardaki sayisi ==")
for p in sorted(glob.glob("public/data/linguistic/lexemes*.json")):
    txt = open(p, encoding="utf-8-sig", errors="replace").read()
    sayilar = {f: txt.count(f) for f in KAYIP if f in txt}
    if sayilar:
        print(f"  {p}: {sayilar}")

print("\n== Commit tarihcesi ==")
