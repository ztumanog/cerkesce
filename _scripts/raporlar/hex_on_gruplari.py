import csv
from pathlib import Path
from collections import defaultdict

SRC = Path("_scripts/raporlar/hex_on_inceleme.csv")
OUT = Path("_scripts/raporlar/hex_on_gruplari.txt")

with SRC.open(encoding="utf-8-sig", newline="") as f:
    rows = list(csv.DictReader(f, delimiter=";"))

grup = defaultdict(list)
for r in rows:
    grup[r["onek"]].append(r)

satirlar = []
for onek, liste in sorted(grup.items(), key=lambda x: -len(x[1])):
    if len(liste) < 2:
        continue
    satirlar.append(f"\n## {onek}  ({len(liste)} kayit)")
    for r in liste:
        satirlar.append(f"  {r['id']:<22} form={r['form']:<18} "
                        f"pos={r['partOfSpeech']:<10} anlam={r['literalMeaning'][:40]:<40} "
                        f"rootIds={r['rootIds']}")

OUT.write_text("\n".join(satirlar), encoding="utf-8")
print("cok kayitli onek:", sum(1 for v in grup.values() if len(v) > 1))
print("yazildi:", OUT)
