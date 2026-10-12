import json
from pathlib import Path

index_path = Path("data/corpus/inverted-index.json")
sent_path = Path("data/corpus/sentences.json")

if not index_path.exists():
    print("❌ Index yok! Önce corpus_index.py çalıştır.")
    exit(1)

index = json.loads(index_path.read_text(encoding="utf-8"))
sentences = json.loads(sent_path.read_text(encoding="utf-8"))
print(f"Index: {len(index)}")
print(f"Cümle: {len(sentences)}")

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
print(f"Lexemes: {len(lex)}")

guncellenen = 0
for l in lex:
    form = l.get("form", "").lower()
    if form in index and not l.get("examples"):
        ids = index[form][:3]
        examples = [sentences[i] for i in ids if i < len(sentences)]
        if examples:
            l["examples"] = examples
            guncellenen += 1

print(f"\nGüncellenen examples: {guncellenen}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"✅ Toplam: {len(lex)}")
