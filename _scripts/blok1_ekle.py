# _scripts/blok1_ekle.py
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
wf_path = Path("public/data/linguistic/word_families.json")
root_path = Path("public/data/linguistic/roots.json")

lex = json.loads(lex_path.read_text(encoding="utf-8"))
wf = json.loads(wf_path.read_text(encoding="utf-8"))
roots = json.loads(root_path.read_text(encoding="utf-8"))

mevcut_lex = {l["id"] for l in lex}
mevcut_wf = {w["id"] for w in wf}
mevcut_roots = {r["id"] for r in roots}

# ============================================
# BLOK 1: 25 KELIME
# ============================================
yeni_lexemes = [
    # Aile / İnsan
    {"id": "L-PKHU", "form": "пхъу", "literalMeaning": "kiz evlat",
     "wordFamilyId": "WF-PKHU", "conceptId": "DAUGHTER", "corpusFrequency": 0},
    # ... (25 kelime)
]

yeni_wf = [
    {"id": "WF-PKHU", "rootId": "R-PKHU",
     "lexemeIds": ["L-PKHU"], "conceptIds": ["DAUGHTER"]},
    # ...
]

yeni_roots = [
    {"id": "R-PKHU", "form": "пхъу", "primaryMeaning": "kiz evlat"},
    # ...
]

# Ekle (idempotent)
for y in yeni_lexemes:
    if y["id"] not in mevcut_lex:
        lex.append(y)
        print(f"Eklendi: {y['id']} - {y['form']}")

for w in yeni_wf:
    if w["id"] not in mevcut_wf:
        wf.append(w)
        print(f"Eklendi WF: {w['id']}")

for r in yeni_roots:
    if r["id"] not in mevcut_roots:
        roots.append(r)
        print(f"Eklendi Root: {r['id']}")

# Yaz
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
wf_path.write_text(json.dumps(wf, ensure_ascii=False, indent=2), encoding="utf-8")
root_path.write_text(json.dumps(roots, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"\nLexeme: {len(lex)}")
print(f"Aile: {len(wf)}")
print(f"Root: {len(roots)}")