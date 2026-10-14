"""
Durum raporu - duzeltilmis versiyon
translations.tr dogru sayar (eski versiyon sadece obje varligina bakiyordu)
"""
import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
print(f"Toplam: {len(lex)}")
print()

def tr_dolu(x):  return bool((x.get("translations") or {}).get("tr"))
def en_dolu(x):  return bool((x.get("translations") or {}).get("en"))
def ru_dolu(x):  return bool((x.get("translations") or {}).get("ru"))

def trans_herhangi(x):
    t = x.get("translations")
    return bool(t) and (t.get("tr") or t.get("en") or t.get("ru"))

alanlar = [
    ("form", "Form"),
    ("ipa", "IPA"),
    ("partOfSpeech", "POS"),
    ("rootIds", "Root"),
    ("wordFamilyId", "WordFamily"),
    ("conceptId", "Concept"),
    ("derivation", "Derivation"),
    ("literalMeaning", "Meaning"),
    ("examples", "Examples"),
    ("audioUrl", "Audio"),
    ("corpusFrequency", "Frequency"),
]

for alan, isim in alanlar:
    dolu = sum(1 for l in lex if l.get(alan))
    pct = 100 * dolu / len(lex)
    bar = "█" * int(pct / 5) + "░" * (20 - int(pct / 5))
    print(f"  {isim:15s} {dolu:6}/{len(lex)} ({pct:5.1f}%) {bar}")

print()
print("=== TRANSLATIONS DETAYLI ===")
for isim, fn in [
    ("tr (Turkce)", tr_dolu),
    ("en (Ingilizce)", en_dolu),
    ("ru (Rusca)", ru_dolu),
    ("herhangi", trans_herhangi),
]:
    dolu = sum(1 for l in lex if fn(l))
    pct = 100 * dolu / len(lex)
    bar = "█" * int(pct / 5) + "░" * (20 - int(pct / 5))
    print(f"  {isim:15s} {dolu:6}/{len(lex)} ({pct:5.1f}%) {bar}")

print()
print("=== EK ALANLAR ===")
for alan, isim in [
    ("dialectVariants", "Dialect"),
    ("notes", "Notes"),
    ("isLemma", "isLemma"),
    ("subConceptId", "SubConcept"),
    ("taxonomyFamily", "Taxonomy"),
]:
    dolu = sum(1 for l in lex if l.get(alan))
    pct = 100 * dolu / len(lex)
    print(f"  {isim:15s} {dolu:6}/{len(lex)} ({pct:5.1f}%)")
