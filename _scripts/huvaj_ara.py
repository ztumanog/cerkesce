import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

f = Path("public/data/8.Ady-Tur_Huvaj.json")
data = json.loads(f.read_text(encoding="utf-8"))
words = data["words"]

print(f"Toplam kelime: {len(words)}")

# Test kelimelerimizi ara
test_kelimeler = ["шъхьэ", "шъэ", "шъу", "шъо", "шъы", "дышъэ",
                  "шъхьэгу", "шъхьэгъусэ", "шъхьэгъубжэ", "шъыпкъэ",
                  "шъхьащэ", "гукIэгъу", "нэшъу", "чъыгы",
                  "Iофы", "цIыфы", "бжьыныф", "фабэ", "мафэ", "фыжьы"]

print("\n=== Huvaj'da ARAMA ===")
for k in test_kelimeler:
    found = False
    for word_key, word_data in words.items():
        spelling = word_data.get("spelling", "")
        if k in spelling:
            print(f"\n{k}:")
            print(f"  spelling: {spelling[:100]}")
            defn = word_data.get("full_definition_in_html", "")[:200]
            print(f"  tanim: {defn}")
            found = True
            break
    if not found:
        print(f"\n{k}: BULUNAMADI")
