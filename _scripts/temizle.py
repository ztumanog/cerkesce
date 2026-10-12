"""
temizle.py — Ham kelime listesini temizle
"""

import sys
sys.stdout.reconfigure(encoding="utf-8")

import csv
import re
from pathlib import Path
from collections import Counter

# Ham veri (sizin paylastiginiz)
HAM = """FORM,ANLAM,CONCEPT,SUB,AILE,ROOT
щыгъуаз,"знаком  -а  -о Фэ",FAMILIAR,KNOWLEDGE,Düşünce & Soyut,щы-
... (tum liste)
"""

# Ayristir
satirlar = []
reader = csv.reader(HAM.splitlines())
header = next(reader)
for s in reader:
    if len(s) >= 6:
        satirlar.append({
            "form": s[0].strip(),
            "anlam": s[1].strip(),
            "concept": s[2].strip(),
            "sub": s[3].strip(),
            "aile": s[4].strip(),
            "root": s[5].strip(),
        })

print(f"Ham kayit: {len(satirlar)}")

# 1) Mukerrerleri temizle
gorulen = set()
temiz = []
for s in satirlar:
    key = s["form"]
    if key in gorulen:
        continue
    gorulen.add(key)
    temiz.append(s)

print(f"Mukerrer sonrasi: {len(temiz)}")

# 2) HTML temizle
for s in temiz:
    s["anlam"] = re.sub(r'<[^>]+>', '', s["anlam"]).strip()

# 3) Cekimli formlari cikar
CEKIM_EKLERI = [
    "м", "р", "у", "щ", "ми", "мэ", "т", "ти", "хэ", "хэм", "хэр",
    "хэу", "къым", "тэкъым", "гъэ", "гъэм", "гъэр", "гъэх",
    "ныгъэ", "ныгъэм", "ныгъэр", "пӏэ", "пӏэм", "пӏэр",
    "кӏэ", "кӏэм", "уэ", "и", "щ", "щт", "т", "тэ",
]

def cekimli_mi(form):
    """Kelimede cekim eki var mi?"""
    # Cok kisa kelimeler
    if len(form) < 4:
        return False
    # Son harflere bak
    for ek in CEKIM_EKLERI:
        if form.endswith(ek) and len(form) > len(ek) + 2:
            # Kok kismi da kontrol et
            kok = form[:-len(ek)]
            if len(kok) >= 3:
                return True
    return False

kokler = [s for s in temiz if not cekimli_mi(s["form"])]
cekimler = [s for s in temiz if cekimli_mi(s["form"])]

print(f"\nKok/turev: {len(kokler)}")
print(f"Cekim: {len(cekimler)}")

# CSV yaz
cikti = Path("_scripts/temiz_kokler.csv")
with open(cikti, "w", encoding="utf-8", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["FORM", "ANLAM", "CONCEPT", "SUB", "AILE", "ROOT"])
    for s in kokler:
        writer.writerow([s["form"], s["anlam"], s["concept"], s["sub"], s["aile"], s["root"]])

print(f"\nCSV: {cikti}")
