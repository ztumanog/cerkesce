import json
from pathlib import Path

dict_path = Path("public/data/17.Kbd-En_Amjad.json")
data = json.loads(dict_path.read_text(encoding="utf-8"))
words = data.get("words", {})

alanlar = set()
for v in words.values():
    alanlar.update(v.keys())

print("=== Tüm alanlar ===")
for a in sorted(alanlar):
    dolu = sum(1 for v in words.values() if v.get(a))
    print(f"  {a:30s} {dolu:6}/{len(words)}")
