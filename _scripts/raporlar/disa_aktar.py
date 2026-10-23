import csv
from pathlib import Path

SRC = Path("_scripts/raporlar/hex_id_denetim.csv")
OUT_TUM = Path("_scripts/raporlar/dogrulanacak_tum.txt")
OUT_BAY = Path("_scripts/raporlar/dogrulanacak_bayrakli.txt")

if not SRC.exists() or SRC.stat().st_size == 0:
    raise SystemExit("HATA: CSV yok veya bos. Once denetim betigini calistirin.")

with SRC.open(encoding="utf-8-sig", newline="") as f:
    rows = list(csv.DictReader(f, delimiter=";"))

print("toplam satir:", len(rows))
if not rows:
    raise SystemExit("HATA: CSV'de satir yok.")

def tekil(liste):
    gorulen, sonuc = set(), []
    for x in liste:
        if x and x not in gorulen:
            gorulen.add(x)
            sonuc.append(x)
    return sonuc

tum = tekil(r["form"] for r in rows)
bayrakli = tekil(r["form"] for r in rows if r["bayraklar"].strip())

OUT_TUM.write_text(",".join(tum), encoding="utf-8")
OUT_BAY.write_text(",".join(bayrakli), encoding="utf-8")

print("tekil form (tum):", len(tum))
print("tekil form (bayrakli):", len(bayrakli))
print("yazildi:", OUT_TUM, OUT_BAY)
