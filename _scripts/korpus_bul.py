import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path
from collections import Counter

# 1) Tum corpus dosyalarini bul
data_dir = Path("public/data")
corpus_files = list(data_dir.glob("*.csv")) + list(data_dir.glob("*.json"))

print("=== CORPUS DOSYALARI ===")
for f in corpus_files:
    print(f"  {f.name} ({f.stat().st_size} byte)")
