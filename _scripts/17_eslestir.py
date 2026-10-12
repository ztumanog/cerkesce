import json
from pathlib import Path

# 1. 17.json yükle
dict_path = Path("public/data/17.Kbd-En_Amjad.json")
data = json.loads(dict_path.read_text(encoding="utf-8"))
words = data.get("words", {})
print(f"17.json kelime: {len(words)}")

# 2. Lexemes yükle
lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
print(f"Lexemes: {len(lex)}")

# 3. Form map
lex_forms = {l.get("form", ""): l for l in lex if l.get("form")}

# 4. Uygula
guncellenen_meaning = 0
guncellenen_examples = 0

for spelling, entry in words.items():
    if spelling not in lex_forms:
        continue
    
    l = lex_forms[spelling]
    
    # literalMeaning
    if not l.get("literalMeaning"):
        defs = entry.get("definitions", [])
        if defs:
            meanings = [d.get("meaning", "") for d in defs if d.get("meaning")]
            if meanings:
                l["literalMeaning"] = " | ".join(meanings[:3])[:200]
                guncellenen_meaning += 1
    
    # examples
    if not l.get("examples"):
        defs = entry.get("definitions", [])
        examples = []
        for d in defs:
            for ex in d.get("examples", []):
                if ex and isinstance(ex, str):
                    examples.append(ex)
        if examples:
            l["examples"] = examples[:5]
            guncellenen_examples += 1

print(f"\nGüncellenen literalMeaning: {guncellenen_meaning}")
print(f"Güncellenen examples: {guncellenen_examples}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"✅ Toplam: {len(lex)}")
