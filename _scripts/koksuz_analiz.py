import json
from pathlib import Path
koksuz = json.loads(Path("koksuz.json").read_text(encoding="utf-8"))
print(f"Tip: {type(koksuz).__name__}")
print(f"Toplam: {len(koksuz)}")
if isinstance(koksuz, list) and koksuz:
    print(f"\n=== İlk 3 ===")
    for k in koksuz[:3]:
        print(json.dumps(k, ensure_ascii=False, indent=2)[:300])
        print()
