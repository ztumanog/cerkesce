import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

f = Path("dialect_debug.json")
if f.exists():
    data = json.loads(f.read_text(encoding="utf-8"))
    print("=== DEBUG SONUCLARI ===")
    for line in data:
        parts = line.split("=")
        if len(parts) == 2:
            print(f"  {parts[0]} -> {parts[1]}")
else:
    print("dialect_debug.json bulunamadi")
