import json
from pathlib import Path

# 1. Corpus dosyalarını yükle
index_path = Path("data/corpus/inverted-index.json")
sent_path = Path("data/corpus/sentences.json")

if not index_path.exists():
    print("❌ inverted-index.json yok!")
    exit(1)

index = json.loads(index_path.read_text(encoding="utf-8"))
sentences = json.loads(sent_path.read_text(encoding="utf-8"))
print(f"Index: {len(index)} kelime")
print(f"Cümle: {len(sentences)}")

# 2. Lexemes
lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
print(f"Lexemes: {len(lex)}")

# 3. Examples ekle
guncellenen = 0
for l in lex:
    form = l.get("form", "").lower()
    if form in index and not l.get("examples"):
        ids = index[form][:3]
        examples = [sentences[i] for i in ids if isinstance(i, int) and i < len(sentences)]
        if examples:
            l["examples"] = examples
            guncellenen += 1

print(f"\nGüncellenen examples: {guncellenen}")

# 4. Kaydet
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"✅ Kaydedildi: {lex_path}")
