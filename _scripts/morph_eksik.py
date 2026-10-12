import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

morph_path = Path("public/data/linguistic/morphemes.json")
morphs = json.loads(morph_path.read_text(encoding="utf-8"))
mevcut = {m["id"] for m in morphs}

yeni = [
    # Eksik morfemler
    {"id": "M-GU", "form": "гу", "gloss": "kalp, merkez", "type": "lexical",
     "dialect": "kabardian", "notes": "C-11.4: kalp koku."},
    {"id": "M-RY", "form": "ры", "gloss": "ilgi eki", "type": "grammatical",
     "dialect": "kabardian", "notes": "C-11.4: ilgi eki."},
    {"id": "M-1UE", "form": "ӏуэ", "gloss": "soylemek", "type": "lexical",
     "dialect": "kabardian", "notes": "C-11.4: soylemek."},
    {"id": "M-N", "form": "н", "gloss": "mastar eki", "type": "grammatical",
     "dialect": "kabardian", "notes": "C-11.4: mastar eki."},
    {"id": "M-PSYSE", "form": "псысэ", "gloss": "dusunce", "type": "lexical",
     "dialect": "kabardian", "notes": "C-11.4: dusunce."},
    {"id": "M-PLHE", "form": "плъэ", "gloss": "bakmak", "type": "lexical",
     "dialect": "kabardian", "notes": "C-11.4: bakmak."},
]

eklenen = 0
for m in yeni:
    if m["id"] not in mevcut:
        morphs.append(m)
        eklenen += 1
        print(f"Eklendi: {m['id']} - {m['form']}")

morph_path.write_text(json.dumps(morphs, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nEklenen: {eklenen}")
print(f"Toplam morfem: {len(morphs)}")
