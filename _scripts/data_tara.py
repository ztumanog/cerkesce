import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path
from collections import Counter

# 1) public/data/ altindaki tum JSON'lari bul
data_files = list(Path("public/data").rglob("*.json"))
print(f"=== PUBLIC/DATA JSON DOSYALARI ({len(data_files)}) ===")
for f in data_files[:30]:
    print(f"  {f.name} ({f.stat().st_size} byte)")

# 2) Sozluk dosyalarini bul
sozluk_files = [f for f in data_files if any(x in f.name.lower() for x in ["ady", "kbd", "jonty", "huvaj", "ziwar", "amjad", "abaze"])]
print(f"\n=== SOZLUK DOSYALARI ({len(sozluk_files)}) ===")
for f in sozluk_files:
    print(f"  {f.name} ({f.stat().st_size} byte)")
