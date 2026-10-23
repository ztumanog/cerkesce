import json, subprocess
from collections import Counter

DOSYA = "public/data/linguistic/lexemes.json"
REFS = ["65d1b31", "626f36d", "9f874da", "HEAD"]
KOK = "R-KHUMEN"
FORMLAR = ["къуэпсы", "къуэлабэ", "къуэкӀэмыщӀэ", "къуажедээс", "къуажехь"]

def git_json(ref):
    r = subprocess.run(["git", "show", f"{ref}:{DOSYA}"], capture_output=True)
    if r.returncode != 0:
        return None
    return json.loads(r.stdout.decode("utf-8-sig"))

def rids(e):
    d = e.get("derivation") if isinstance(e.get("derivation"), dict) else {}
    return set(str(x) for x in (e.get("rootIds") or [])) | set(str(x) for x in (d.get("rootIds") or []))

veri = {r: git_json(r) for r in REFS}
veri["CALISMA"] = json.load(open(DOSYA, encoding="utf-8-sig"))

print("== 1. R-KHUMEN: kimlik oneki mi, form mu? (626f36d) ==")
lex = veri["626f36d"]
kok_on = Counter(str(e.get("id") or "")[:3] for e in lex if KOK in rids(e))
tum_on = Counter(str(e.get("id") or "")[:3] for e in lex)
print("  R-KHUMEN kayitlarinda en sik onekler:")
for on, n in kok_on.most_common(8):
    oran = n / tum_on[on] * 100 if tum_on[on] else 0
    print(f"    {on:<5} R-KHUMEN={n:<5} bu onekteki_toplam={tum_on[on]:<6} oran=%{oran:.1f}")
hum = sum(1 for e in lex if KOK in rids(e) and "хъум" in str(e.get("form") or ""))
print(f"  R-KHUMEN toplam={sum(1 for e in lex if KOK in rids(e))}, formunda 'хъум' gecen={hum}")

print("\n== 2. Bes formun FORM alaninda kayit var mi? ==")
for ad, data in veri.items():
    if data is None:
        print(f"  {ad}: okunamadi")
        continue
    for f in FORMLAR:
        ids = [str(e.get("id")) for e in data if str(e.get("form") or "") == f]
        print(f"  {ad:<8} {f:<14} -> {ids if ids else 'YOK'}")

print("\n== 3. R-KHUMEN kaydi olan ama 65d1b31'de olmayan kimlikler (626f36d) ==")
onceki = {(str(e.get("id")), str(e.get("form"))) for e in veri["65d1b31"] or []}
yeni = [e for e in lex if KOK in rids(e) and (str(e.get("id")), str(e.get("form"))) not in onceki]
print(f"  adet={len(yeni)}")
for e in yeni[:15]:
    print(f"    {str(e.get('id')):<24} {str(e.get('form') or ''):<16} {str(e.get('literalMeaning') or '')[:30]}")
