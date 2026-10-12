import json
from pathlib import Path

BASE = Path(r"E:\projeler\Cerkesce")

# roots-117 + roots-30
with open(BASE / "data/grammar/roots-117.json", encoding="utf-8") as f:
    r117 = json.load(f)
with open(BASE / "data/grammar/roots-30.json", encoding="utf-8") as f:
    r30 = json.load(f)

# Yeni root form'lari
yeni_forms = set()
for r in r117 + r30:
    if r.get("form"):
        yeni_forms.add(r["form"])

# Aktif roots.json
with open(BASE / "public/data/linguistic/roots.json", encoding="utf-8") as f:
    aktif = json.load(f)
aktif_forms = set(r.get("form") for r in aktif if r.get("form"))

# Sadece yeni olanlar
sadece_yeni = yeni_forms - aktif_forms
print(f"roots-117+30 form: {len(yeni_forms)}")
print(f"aktif roots.json form: {len(aktif_forms)}")
print(f"Sadece yeni form: {len(sadece_yeni)}")
print()

# lexemes.json'da kac form eslesiyor?
with open(BASE / "public/data/linguistic/lexemes.json", encoding="utf-8") as f:
    lex = json.load(f)
lex = [l for l in lex if l and isinstance(l, dict)]

eslesen_yeni = 0
root_suz_eslesen = 0

for l in lex:
    form = l.get("form", "")
    if form in sadece_yeni:
        eslesen_yeni += 1
        if not l.get("rootIds"):
            root_suz_eslesen += 1

print(f"Yeni formla eslesen lexeme: {eslesen_yeni}")
print(f"Root suz + eslesen: {root_suz_eslesen}")
print(f"Potansiyel yeni coverage: {(4527 + root_suz_eslesen) / len(lex) * 100:.1f}%")