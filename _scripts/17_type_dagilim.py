import json
from pathlib import Path
from collections import Counter

dict_path = Path("public/data/17.Kbd-En_Amjad.json")
data = json.loads(dict_path.read_text(encoding="utf-8"))
words = data.get("words", {})

# type dağılımı
types = Counter(v.get("type", "YOK") or "BOŞ" for v in words.values())
print("=== type dağılımı ===")
for t, c in types.most_common(20):
    print(f"  {t:40s} {c}")
