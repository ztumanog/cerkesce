import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path
from collections import Counter

wf = json.loads(Path("public/data/linguistic/word_families.json").read_text(encoding="utf-8"))
print(f"Toplam aile: {len(wf)}\n")

# Kategori dagilimi (notes'a gore)
kategoriler = Counter()
for w in wf:
    notes = w.get("notes", "").lower()
    if "somatik" in notes or "beden" in notes or "vucut" in notes:
        kategoriler["body"] += 1
    elif "doga" in notes or "tabiat" in notes:
        kategoriler["nature"] += 1
    elif "zihin" in notes or "dusunce" in notes:
        kategoriler["mind"] += 1
    elif "akraba" in notes or "aile" in notes:
        kategoriler["kinship"] += 1
    elif "hayvan" in notes:
        kategoriler["animal"] += 1
    else:
        kategoriler["other"] += 1

for k, v in kategoriler.most_common():
    print(f"  {k:15} {v}")

# Lexeme sayilari
lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
lex_sayisi = Counter(l.get("wordFamilyId", "?") for l in lex)
print("\n=== EN BUYUK AILELER ===")
for aile, n in lex_sayisi.most_common(15):
    print(f"  {aile:15} {n} lexeme")
