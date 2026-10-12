import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

# Huvaj sozlugunu bul
huvaj_path = None
for p in Path(".").rglob("*Huvaj*"):
    if p.is_file() and p.suffix == ".json":
        huvaj_path = p
        break

if not huvaj_path:
    for p in Path(".").rglob("*huvaj*"):
        if p.is_file() and p.suffix == ".json":
            huvaj_path = p
            break

if huvaj_path:
    print(f"Huvaj sozlugu: {huvaj_path}")
    data = json.loads(huvaj_path.read_text(encoding="utf-8"))
    print(f"Toplam kayit: {len(data)}")
    
    # Test kelimelerimizi ara
    test_kelimeler = ["шъхьэ", "шъэ", "шъу", "шъо", "шъы", "дышъэ",
                      "шъхьэгу", "шъхьэгъусэ", "шъхьэгъубжэ", "шъыпкъэ",
                      "шъхьащэ", "гукIэгъу", "нэшъу", "чъыгы",
                      "Iофы", "цIыфы", "бжьыныф", "фабэ", "мафэ", "фыжьы"]
    
    print("\n=== Huvaj'da ARAMA ===")
    for k in test_kelimeler:
        for kayit in data:
            if isinstance(kayit, dict):
                for key, val in kayit.items():
                    if k in str(key) or k in str(val):
                        print(f"  {k}: {key} -> {val}")
                        break
else:
    print("Huvaj sozlugu bulunamadi")
    # Tum json dosyalarini listele
    print("\n=== JSON DOSYALARI ===")
    for p in Path(".").rglob("*.json"):
        if "huvaj" in str(p).lower() or "Huvaj" in str(p):
            print(f"  {p}")
