import csv
import re
from pathlib import Path

p = Path("_scripts/ham_liste.csv")
with open(p, encoding="utf-8") as f:
    reader = csv.reader(f)
    header = next(reader)
    satirlar = []
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

print(f"Ham: {len(satirlar)}")

# Mukerrer temizle
gorulen = set()
temiz = []
for s in satirlar:
    if s["form"] in gorulen:
        continue
    gorulen.add(s["form"])
    # HTML temizle
    s["anlam"] = re.sub(r'<[^>]+>', '', s["anlam"]).strip()
    temiz.append(s)

print(f"Temiz: {len(temiz)}")

# CSV yaz
cikti = Path("_scripts/temiz_liste.csv")
with open(cikti, "w", encoding="utf-8", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["FORM", "ANLAM", "CONCEPT", "SUB", "AILE", "ROOT"])
    for s in temiz:
        writer.writerow([s["form"], s["anlam"], s["concept"], s["sub"], s["aile"], s["root"]])

print(f"CSV: {cikti}")
