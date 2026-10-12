import json
import csv
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# щы- ile baslayanlar
shchy = [l for l in lex if l.get("form", "").startswith("щы")]

# conceptId bos olanlar
belirsiz = [l for l in shchy if not l.get("conceptId") or l.get("conceptId") in ("", "-")]

print(f"Toplam щы-: {len(shchy)}")
print(f"conceptId DOLU: {len(shchy) - len(belirsiz)}")
print(f"conceptId BOS: {len(belirsiz)}")

# CSV'ye yaz (sadece form)
cikti = Path("_scripts") / "shchy_kalan.csv"
with open(cikti, "w", encoding="utf-8", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["FORM", "ID", "POS"])
    for l in belirsiz:
        writer.writerow([
            l.get("form", ""),
            l.get("id", ""),
            l.get("partOfSpeech", "") or "",
        ])

print(f"\nCSV: {cikti}")
print(f"\nIlk 20 belirsiz:")
for l in belirsiz[:20]:
    print(f"  {l.get('form', ''):30s} {l.get('id', ''):25s} {l.get('partOfSpeech', '') or ''}")
