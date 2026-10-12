import json
from pathlib import Path

# 1. Kavram anahtar kelime haritası
concept_keywords = {
    "PLANT": ["plant", "tree", "flower", "leaf", "grass", "bitki", "ağaç", "çiçek", "yaprak"],
    "ANIMAL": ["animal", "horse", "dog", "cat", "wolf", "hayvan", "at", "köpek", "kedi", "kurt"],
    "EMOTION": ["emotion", "joy", "anger", "fear", "love", "duygu", "sevinç", "öfke", "korku", "sevgi"],
    "COLOR": ["color", "red", "blue", "green", "renk", "kırmızı", "mavi", "yeşil"],
    "FAMILY": ["father", "mother", "son", "daughter", "baba", "anne", "oğul", "kız"],
    "BODY": ["heart", "eye", "hand", "foot", "kalp", "göz", "el", "ayak"],
    "NATURE": ["water", "fire", "earth", "sea", "su", "ateş", "toprak", "deniz"],
    "FOOD": ["food", "bread", "meat", "milk", "yemek", "ekmek", "et", "süt"],
    "ABSTRACT": ["freedom", "peace", "justice", "özgürlük", "barış", "adalet"],
    "TOOL": ["tool", "weapon", "knife", "alet", "silah", "bıçak"],
}

# 2. Lexemes
lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
print(f"Lexemes: {len(lex)}")

# 3. Her lexeme için gloss kontrol
guncellenen = 0
for l in lex:
    if l.get("conceptId"):
        continue
    
    meaning = (l.get("literalMeaning") or "").lower()
    if not meaning:
        continue
    
    for concept, keywords in concept_keywords.items():
        if any(kw in meaning for kw in keywords):
            l["conceptId"] = concept
            guncellenen += 1
            break

print(f"Güncellenen conceptId: {guncellenen}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"✅ Toplam: {len(lex)}")
