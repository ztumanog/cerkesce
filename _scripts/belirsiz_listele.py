"""
belirsiz_listele.py — щы- kokunde conceptId bos olanlari listele
"""

import sys
sys.stdout.reconfigure(encoding="utf-8")

import json
import csv
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# щы- ile baslayanlar
shchy = [l for l in lex if l.get("form", "").startswith("щы")]

# conceptId bos olanlar
belirsiz = [l for l in shchy if not l.get("conceptId") or l.get("conceptId") in ("", "-")]

print(f"Toplam щы-: {len(shchy)}")
print(f"Belirsiz: {len(belirsiz)}")
print("=" * 70)

# CSV'ye yaz
cikti = Path("_scripts") / "shchy_belirsiz.csv"
with open(cikti, "w", encoding="utf-8", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["FORM", "ID", "CONCEPT", "SUB", "AILE", "KAYNAK"])
    for l in belirsiz:
        writer.writerow([
            l.get("form", ""),
            l.get("id", ""),
            l.get("conceptId", ""),
            l.get("subConceptId", ""),
            l.get("taxonomyFamily", ""),
            l.get("source", "") or l.get("sourceDictionary", ""),
        ])

print(f"CSV yazildi: {cikti}")
print(f"\nIlk 30 belirsiz:")

for l in belirsiz[:30]:
    form = l.get("form", "")
    id_ = l.get("id", "")
    pos = l.get("partOfSpeech", "") or ""
    print(f"  {form:30s} {id_:25s} {pos}")
