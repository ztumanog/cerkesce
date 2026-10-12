import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path
f = Path("c11_izole.json")
if f.exists():
    data = json.loads(f.read_text(encoding="utf-8"))
    print("=== C11 IZOLE ===")
    for line in data:
        print(f"  {line}")
