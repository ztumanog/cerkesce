import json
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
print(f"Toplam: {len(lex)}")

# Ana alanlar
alanlar = [
    ("form", "Form"),
    ("ipa", "IPA"),
    ("partOfSpeech", "POS"),
    ("rootIds", "Root"),
    ("wordFamilyId", "WordFamily"),
    ("conceptId", "Concept"),
    ("derivation", "Derivation"),
    ("translations", "Translations"),
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

# Ek alanlar
print()
print("=== EK ALANLAR ===")
ek_alanlar = [
    ("dialectVariants", "Dialect"),
    ("notes", "Notes"),
    ("examples", "Examples"),
    ("isLemma", "isLemma"),
    ("subConceptId", "SubConcept"),
    ("taxonomyId", "Taxonomy"),
]
for alan, isim in ek_alanlar:
    dolu = sum(1 for l in lex if l.get(alan))
    pct = 100 * dolu / len(lex)
    print(f"  {isim:15s} {dolu:6}/{len(lex)} ({pct:5.1f}%)")