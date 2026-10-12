import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
hae = [l for l in lex if "R-HAE" in (l.get("rootIds") or [])]

print(f"R-HAE toplam: {len(hae)}")
for l in hae:
    print(f"  {l.get('form', '?'):25s} rootIds={l.get('rootIds')}")

# Yeni beyaz liste adayları lexemes.json'da var mı?
print("\n=== Yeni adaylar ===")
for form in ["хьэщ", "хьэжь", "хьэхъу", "хьэшорэ", "хьэбзыпэ", "мэлыхъуэхьэ", "хьэхэм"]:
    l = next((l for l in lex if l.get("form") == form), None)
    if l:
        print(f"  {form:25s} rootIds={l.get('rootIds')}")
    else:
        print(f"  {form:25s} (lexemes.json'da yok)")
