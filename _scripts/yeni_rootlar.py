import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

# Roots yukle
roots_path = Path("public/data/linguistic/roots.json")
roots = json.loads(roots_path.read_text(encoding="utf-8"))
mevcut = {r["id"] for r in roots}

# Yeni rootlar
yeni = [
    {"id": "R-1E", "form": "ӏэ", "ipa": "/ʔa/",
     "primaryMeaning": "el, kol",
     "secondaryMeanings": ["guc", "yardim", "beceri"],
     "semanticDomains": ["body", "action"],
     "dialectVariants": {"adyghe": "ӏэ", "kabardian": "ӏэ"},
     "productivity": {"lemmaCount": 50, "corpusFrequency": 214016},
     "notes": "C-11.4: el koku. En yuksek frekansli."},
    {"id": "R-SHCH", "form": "щы", "ipa": "/ɕə/",
     "primaryMeaning": "uc",
     "secondaryMeanings": ["sayi"],
     "semanticDomains": ["quantity"],
     "dialectVariants": {"adyghe": "щы", "kabardian": "щы"},
     "productivity": {"lemmaCount": 10, "corpusFrequency": 64367},
     "notes": "C-11.4: uc koku."},
    {"id": "R-GUASHE", "form": "гуащэ", "ipa": "/gʷaːɕa/",
     "primaryMeaning": "hanim, prenses",
     "secondaryMeanings": ["kadin"],
     "semanticDomains": ["people", "family"],
     "dialectVariants": {"adyghe": "гуащэ", "kabardian": "гуащэ"},
     "productivity": {"lemmaCount": 10, "corpusFrequency": 568},
     "notes": "C-11.4: hanim koku."},
]

eklenen = 0
for y in yeni:
    if y["id"] not in mevcut:
        roots.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']}")

roots_path.write_text(json.dumps(roots, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nEklenen: {eklenen}")
print(f"Toplam root: {len(roots)}")
