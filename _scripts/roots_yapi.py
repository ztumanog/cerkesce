import json
from pathlib import Path

for yol in ["data/grammar/roots-117.json", "data/grammar/roots-30.json"]:
    p = Path(yol)
    data = json.loads(p.read_text(encoding="utf-8"))
    print(f"\n{'='*60}")
    print(f"📁 {yol} ({len(data)} kayıt)")
    print('='*60)
    print(f"İlk kayıt anahtarları: {list(data[0].keys())}")
    print(f"İlk 3 kayıt:")
    for r in data[:3]:
        print(f"  {json.dumps(r, ensure_ascii=False)[:300]}")
