import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

# DialectConverter dosyalarini bul
converter_files = []
for p in Path(".").rglob("*ialect*"):
    if p.is_file() and not any(x in str(p) for x in ["node_modules", "_arsiv", "_backup"]):
        converter_files.append(str(p))

print("=== DIALECT DOSYALARI ===")
for f in converter_files:
    print(f"  {f}")
