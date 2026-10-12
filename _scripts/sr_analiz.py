import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

sr_path = Path("public/data/linguistic/semantic_relations.json")
sr = json.loads(sr_path.read_text(encoding="utf-8"))

print(f"Toplam: {len(sr)}")
print("\n=== TURLER ===")
turler = {}
for r in sr:
    t = r.get("type", "?")
    turler[t] = turler.get(t, 0) + 1
for t, c in sorted(turler.items(), key=lambda x: -x[1]):
    print(f"  {t}: {c}")

print("\n=== KAYNAKLAR ===")
kaynaklar = {}
for r in sr:
    k = r.get("source", "?")
    kaynaklar[k] = kaynaklar.get(k, 0) + 1
for k, c in sorted(kaynaklar.items(), key=lambda x: -x[1])[:10]:
    print(f"  {k}: {c}")

print("\n=== ORNEK KAYITLAR ===")
for r in sr[:3]:
    print(json.dumps(r, ensure_ascii=False, indent=2))
    print("---")
