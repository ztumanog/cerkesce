import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# R-HAE alanlar
hae = [l for l in lex if "R-HAE" in (l.get("rootIds") or [])]
print(f"R-HAE kalan: {len(hae)}\n")
for l in hae:
    print(f"  ID: {l.get('id')}")
    print(f"  form: {l.get('form')}")
    print(f"  rootIds: {l.get('rootIds')}")
    print(f"  derivation: {l.get('derivation')}")
    print()

# 37 kelimelik listede R-HAE var mı?
hedef_liste = [
    "щхьэ", "щхьэгу", "щхьэусыгъуэ", "щхьэц", "щхьэгъусэ", "щхьэгъусэншэ",
    "щхьэхуитыныгъэ", "щхьэгъубжэ", "псэущхьэ", "щхьэщэ", "къыщхьэщыжын",
    "щхьэщыжын", "унащхьэ", "унащхьэпыхьэ", "унащхьэ папцӀэ", "унащхьэщӀэсэ",
    "блыщхьэ", "пщыхьэщхьэ", "бжьыхьэ", "къупщхьэ", "шыщхьэӀу", "пхъащхьэмыщхьэ",
    "унэзехьэ", "унэзэтелъхьэ", "унэидзыхьэ", "унэрыхьэ", "унэрыхьэ-унэрыкӏыу",
    "щхьэл", "псыхьэл", "хьэзыр", "хьэзырылъэ", "хьэзырыпс", "хьэзырӀупэ",
    "сыхьэт", "хьэджэбз", "щыкъу хьэджэбз", "хьэн"
]

print("=== 37 Kelimede R-HAE kontrolü ===")
for form in hedef_liste:
    kayit = next((l for l in lex if l.get("form") == form), None)
    if kayit:
        root = kayit.get("rootIds")
        hae_var = "R-HAE" in (root or [])
        durum = "❌ HÂLÂ R-HAE!" if hae_var else "✅ Temiz"
        print(f"  {form:30s} rootIds={root} {durum}")
    else:
        print(f"  {form:30s} (lexemes.json'da yok)")
