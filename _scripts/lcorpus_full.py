import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
l_corpus = [l for l in lex if l["id"].startswith("L-CORPUS")]

print(f"L-CORPUS toplam: {len(l_corpus)}")
print(f"İlk 5 kayıt ID: {[l['id'] for l in lex[:5]]}")
print(f"L-CORPUS ilk 3 ID: {[l['id'] for l in l_corpus[:3]]}")

print("\n=== L-CORPUS İLK 3 KAYIT TAM İÇERİK ===\n")
for l in l_corpus[:3]:
    print(f"ID: {l['id']}")
    print(f"Form: {l.get('form', '?')}")
    lm = l.get("literalMeaning", "")
    print(f"literalMeaning ({len(lm)} karakter):")
    print(lm)
    print("=" * 100)
