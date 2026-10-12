import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# İlk 10 kaydın tüm alanlarını göster
print("=== İLK 10 KAYIT ===\n")
for l in lex[:10]:
    form = l.get("form") or "?"
    anlam = l.get("literalMeaning") or "—"
    print(f"--- {form} ---")
    print(f"  literalMeaning: {anlam[:80]}")
    print(f"  tüm alanlar: {list(l.keys())}")
    print()

# Çerkesçe karakter içeren anlamlar var mı?
print("\n=== ÇERKESÇE KARAKTER İÇEREN ANLAMLAR ===")
count = 0
for l in lex:
    anlam = l.get("literalMeaning") or ""
    if any(c in anlam for c in "ӏӏӏӀӏӀӀӏӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀӀ"):
        count += 1
        if count <= 10:
            print(f"  {l.get('form'):20s} → {anlam[:60]}")
print(f"\nToplam Çerkesçe karakter içeren: {count}")
