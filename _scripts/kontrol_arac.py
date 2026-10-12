import json
from pathlib import Path

# Sözlük verilerini yükle
sozluk_dosyalari = list(Path("_scripts").glob("*.json"))
print(f"Sözlük dosyası: {len(sozluk_dosyalari)}")

# Veritabanı
lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

def normalize(text):
    if not text:
        return ""
    for c in ['\u04cf', '\u04c0', '\u04e0', '\u0406', '\u0456']:
        text = text.replace(c, '\u04c0')
    return text.strip()

# Kontrol edilecek kelimeler (şüpheli olanlar)
KONTROL = [
    "щы", "щыблэ", "щыгу", "щыгъу", "щыгугъын",
    # ... mimarın sınıflandırdığı kelimeler
]

print("\n=== KONTROL ===")
for kelime in KONTROL:
    norm = normalize(kelime)
    kayitlar = [l for l in lex if normalize(l.get("form","")) == norm]
    for l in kayitlar:
        print(f"\n{kelime}:")
        print(f"  literalMeaning: {l.get('literalMeaning')}")
        print(f"  translations: {l.get('translations')}")
        print(f"  conceptId: {l.get('conceptId')}")
        print(f"  subConceptId: {l.get('subConceptId')}")
        print(f"  notes: {l.get('notes')}")
