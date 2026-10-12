import json
from pathlib import Path

# Proje koku
BASE = Path(r"E:\projeler\Cerkesce")

# roots-117 + roots-30
with open(BASE / "data/grammar/roots-117.json", encoding="utf-8") as f:
    r117 = json.load(f)
with open(BASE / "data/grammar/roots-30.json", encoding="utf-8") as f:
    r30 = json.load(f)

root_forms = set()
for r in r117 + r30:
    if r.get("form"):
        root_forms.add(r["form"])

print(f"Toplam root form: {len(root_forms)}")

# lexemes
with open(BASE / "public/data/linguistic/lexemes.json", encoding="utf-8") as f:
    lex = json.load(f)

lex = [l for l in lex if l and isinstance(l, dict)]
n = len(lex)

eslesen = 0
root_suz_eslesen = 0

for l in lex:
    form = l.get("form", "")
    if form in root_forms:
        eslesen += 1
        if not l.get("rootIds"):
            root_suz_eslesen += 1

print(f"Toplam lexeme: {n}")
print(f"Form eslesen: {eslesen}")
print(f"Root suz + form eslesen: {root_suz_eslesen}")
print(f"Yeni coverage: {(4527 + root_suz_eslesen) / n * 100:.1f}%")