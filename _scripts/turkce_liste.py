import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
kalan = [l for l in lex if not l.get("rootIds")]

# Türkçe olduğu düşünülen kelimeler (elle işaretlenmiş)
turkce_isaret = [
    "истамбыл", "анкара", "сату", "топ", "хъан", "къазакъ",
    "мэздан", "пастэ", "ор", "оркъ", "аскер", "къуэш",
    "нысэ", "тырку", "урыс", "адыгэ", "тюрк", "араб",
]

print(f"rootIds olmayan: {len(kalan)}")
print(f"\n=== TURKCE OLDUGU DUSUNULEN ===")
for l in kalan:
    form = l.get("form", "").lower()
    if form in turkce_isaret:
        meaning = (l.get("literalMeaning") or "")[:40]
        print(f"  {l.get('form'):25s} | {meaning}")

# Ayrica 'к' ile baslayan ve turkce olabilecek kelimeler
print(f"\n=== 'КЪ' ILE BASLAYAN (Turkce olabilir) ===")
for l in kalan:
    form = l.get("form", "")
    if form.startswith("Къ") or form.startswith("къ"):
        meaning = (l.get("literalMeaning") or "")[:40]
        print(f"  {form:25s} | {meaning}")
