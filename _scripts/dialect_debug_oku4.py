import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path
f = Path("dialect_debug4.json")
if f.exists():
    data = json.loads(f.read_text(encoding="utf-8"))
    print("=== DEBUG4 ===")
    for line in data:
        print(f"  {line}")
