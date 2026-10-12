import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path
f = Path("morph_gercek.json")
if f.exists():
    data = json.loads(f.read_text(encoding="utf-8"))
    print("=== GERCEK LEXEME TESTLERI ===")
    for line in data:
        print(f"  {line}")
