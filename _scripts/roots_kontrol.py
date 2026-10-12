import json
from pathlib import Path

roots = json.loads(Path("public/data/linguistic/roots.json").read_text(encoding="utf-8"))
print(f"Toplam kök: {len(roots)}")
print(f"\n=== İlk 5 ===")
for r in roots[:5]:
    print(f"  {r.get('id', 'YOK'):15s} | {r.get('form', 'YOK')}")
