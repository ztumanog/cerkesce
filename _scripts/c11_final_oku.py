import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path
f = Path("c11_final.json")
if f.exists():
    data = json.loads(f.read_text(encoding="utf-8"))
    print("=== C11 FINAL ===")
    print(f"Gecen: {data['passed']}/{data['total']}")
    if data['fails']:
        print("Hatalar:")
        for f in data['fails']:
            print(f"  {f}")
