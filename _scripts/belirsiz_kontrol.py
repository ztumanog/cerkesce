import csv
from pathlib import Path

p = Path("_scripts/shchy_belirsiz.csv")
with open(p, encoding="utf-8") as f:
    reader = csv.reader(f)
    satirlar = list(reader)

print(f"Toplam satir: {len(satirlar)}")
print(f"Header: {satirlar[0]}")
print(f"\nIlk 10:")
for s in satirlar[1:11]:
    print(f"  {s[0]:30s} {s[1]:25s} {s[5] if len(s) > 5 else ''}")
