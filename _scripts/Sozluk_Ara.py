import json
from pathlib import Path
from collections import Counter

ROOT = Path(r"E:\projeler\Cerkesce")
WIKT = ROOT / "_wiktionary"
SRC = WIKT / "sukunov_sozluk_v22.json"
OUT = WIKT / "sukunov_sozluk_v23.json"

def normalize(k):
    if not k:
        return ""
    return k.replace("Ӏ", "1").replace("I", "1").strip()

with open(SRC, encoding="utf-8") as f:
    kayitlar = json.load(f)

# Son UNKNOWN
for k in kayitlar:
    kbd = (k.get("kabardeyce") or "").strip()
    if normalize(kbd) == normalize("л1ыф1щи") or normalize(kbd) == normalize("лӀыфэ"):
        k["kabardeyce"] = "л1ыфэ"
        k["turkce"] = "Yiğit, cesur, mert"
        k["rusca"] = "мужественный"
        k["ingilizce"] = "manly, brave"
        k["concept"] = "ANTONYM"
        print(f"  ✓ {kbd} -> ANTONYM")

with open(OUT, "w", encoding="utf-8") as f:
    json.dump(kayitlar, f, ensure_ascii=False, indent=2)

print(f"\nKaydedildi: {OUT}")

kalan = [k for k in kayitlar if k.get("concept") == "UNKNOWN"]
print(f"Kalan UNKNOWN: {len(kalan)}")

dagilim = Counter(k.get("concept") for k in kayitlar)
print(f"\n=== SON DAGILIM ===")
for c, n in dagilim.most_common(25):
    print(f"  {c}: {n}")
print(f"  ...")
print(f"  Toplam kategori: {len(dagilim)}")
print(f"  Toplam kayit: {len(kayitlar)}")
print(f"  UNKNOWN: {len(kalan)}")