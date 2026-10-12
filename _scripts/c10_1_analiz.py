import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path
from collections import Counter

rapor = json.loads(Path("data/corpus/frequency/c9_1_verification.json").read_text(encoding="utf-8"))
bulunmayan = [s for s in rapor["sonuclar"] if s["durum"] == "YOK"]

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
lex_map = {l["id"]: l for l in lex}

aile_sayisi = Counter()
for s in bulunmayan:
    l = lex_map.get(s["id"], {})
    aile_sayisi[l.get("wordFamilyId", "?")] += 1

print(f"Bulunmayan: {len(bulunmayan)}")
print("=== AILE BAZINDA ===")
for aile, n in aile_sayisi.most_common():
    print(f"  {aile:15} {n}")

Path("data/corpus/frequency/c10_1_bulunmayanlar.json").write_text(
    json.dumps({"toplam": rapor["frekanssiz"], "bulunmayan": len(bulunmayan),
                "aile_dagilimi": dict(aile_sayisi)}, ensure_ascii=False, indent=2), encoding="utf-8")
print("Kaydedildi")
