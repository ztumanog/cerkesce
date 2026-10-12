import json
from pathlib import Path

LEX_PATH = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX_PATH.read_text(encoding="utf-8"))

concept_temizlenen = 0
pos_temizlenen = 0

for l in lex:
    if l.get("isLemma") == True:
        continue
    
    # Çekimli formların conceptId'sini temizle
    if l.get("conceptId"):
        l["conceptId"] = None
        concept_temizlenen += 1
    
    # Çekimli formların POS'unu "corpus" yap veya temizle
    if l.get("partOfSpeech") == "noun":
        l["partOfSpeech"] = None
        pos_temizlenen += 1

LEX_PATH.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"=== KAVRAM/POS DÜZELTME ===")
print(f"Temizlenen conceptId: {concept_temizlenen}")
print(f"Temizlenen POS: {pos_temizlenen}")
