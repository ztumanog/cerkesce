import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

f = Path("dialect_full_debug.json")
if f.exists():
    data = json.loads(f.read_text(encoding="utf-8"))
    print("=== TUM TEST SONUCLARI ===")
    for line in data:
        print(f"  {line}")
