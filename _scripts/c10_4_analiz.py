import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path
from collections import Counter

sr = json.loads(Path("public/data/linguistic/semantic_relations.json").read_text(encoding="utf-8"))
metaforlar = [s for s in sr if s.get("type") == "metaphorical"]
print(f"Toplam metafor: {len(metaforlar)}\n")

durumlar = Counter()
for m in metaforlar:
    if m.get("confidence", 0) > 0:
        durumlar["DOGRULANDI"] += 1
    else:
        durumlar["BULUNAMADI"] += 1

print("=== DURUM ===")
for d, n in durumlar.most_common():
    print(f"  {d}: {n}")

rootlar = Counter(m.get("source", "?") for m in metaforlar)
print("\n=== ROOT DAGILIMI ===")
for r, n in rootlar.most_common():
    print(f"  {r:15} {n}")

print("\n=== TARGET DAGILIMI ===")
targetlar = Counter(m.get("target", "?") for m in metaforlar)
for t, n in targetlar.most_common(15):
    print(f"  {t:25} {n}")

print("\n=== DETAYLI ===")
for m in metaforlar:
    conf = m.get("confidence", 0)
    durum = "OK" if conf > 0 else "YOK"
    print(f"  [{durum}] {m.get('id',''):25} {m.get('source',''):10} -> {m.get('target',''):25} conf={conf:.2f}")
