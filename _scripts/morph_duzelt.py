import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

# 1) Eksik morfemleri ekle
morph_path = Path("public/data/linguistic/morphemes.json")
morphs = json.loads(morph_path.read_text(encoding="utf-8"))
mevcut_m = {m["id"] for m in morphs}

yeni_m = [
    {"id": "M-GU", "form": "гу", "gloss": "kalp", "type": "lexical", "dialect": "kabardian"},
    {"id": "M-RY", "form": "ры", "gloss": "ilgi eki", "type": "grammatical", "dialect": "kabardian"},
    {"id": "M-1UE", "form": "ӏуэ", "gloss": "soylemek", "type": "lexical", "dialect": "kabardian"},
    {"id": "M-N", "form": "н", "gloss": "mastar eki", "type": "grammatical", "dialect": "kabardian"},
    {"id": "M-PSYSE", "form": "псысэ", "gloss": "dusunce", "type": "lexical", "dialect": "kabardian"},
    {"id": "M-PLHE", "form": "плъэ", "gloss": "bakmak", "type": "lexical", "dialect": "kabardian"},
]
for m in yeni_m:
    if m["id"] not in mevcut_m:
        morphs.append(m)
morph_path.write_text(json.dumps(morphs, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Morfem: {len(morphs)}")

# 2) Lexeme morphemeIds duzelt
lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
duzelt = {
    "L-GUPSYSE": ["M-GU", "M-PSYSE"],
    "L-GURYYUEN": ["M-GU", "M-RY", "M-1UE", "M-N"],
    "L-PEPLEN": ["M-PE3", "M-PLHE", "M-N"],
    "L-1ERYSH1": ["M-1E", "M-RY", "M-SH1E"],
}
for l in lex:
    if l["id"] in duzelt:
        if not l.get("derivation"):
            l["derivation"] = {}
        l["derivation"]["morphemeIds"] = duzelt[l["id"]]
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Lexeme: {len(lex)}")
