import json
from pathlib import Path

file_path = Path("public/data/linguistic/lexemes.json")
lexemes = json.loads(file_path.read_text(encoding="utf-8"))

# 1. Anlamı olan ana maddeleri (Lemma) haritala
lemmas = {}
for l in lexemes:
    if l.get("literalMeaning") or l.get("literalMeaningAdy"):
        form = l.get("form")
        if form:
            lemmas[form] = l.get("id")

# Yaygın Çerkesçe çekim ve bağlaç ekleri
SUFFIXES = ["ми", "ри", "кӀэ", "щ", "м", "р"]

linked_count = 0
cleaned_concepts = 0

for l in lexemes:
    has_meaning = bool(l.get("literalMeaning") or l.get("literalMeaningAdy"))
    
    if not has_meaning:
        l["isLemma"] = False
        form = l.get("form") or ""
        
        # Hatalı conceptId temizliği
        if l.get("conceptId") == "ANIMAL" and l.get("partOfSpeech") == "particle":
            l["conceptId"] = None
            cleaned_concepts += 1

        # Sonek kırpma ile kök eşleştirme (Lemmatization)
        for suf in SUFFIXES:
            if form.endswith(suf):
                stem = form[:-len(suf)]
                if stem in lemmas:
                    l["rootId"] = lemmas[stem]
                    linked_count += 1
                    break
    else:
        l["isLemma"] = True

# Dosyayı güncelle
file_path.write_text(json.dumps(lexemes, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"=== İŞLEM TAMAMLANDI ===")
print(f"Köke Bağlanan Çekimli Form : {linked_count}")
print(f"Temizlenen Hatalı Kavram   : {cleaned_concepts}")
