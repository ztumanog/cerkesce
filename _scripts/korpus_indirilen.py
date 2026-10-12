import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path
from collections import Counter
import re

# 1) data/corpus/ altindaki tum dosyalari bul
corpus_dir = Path("data/corpus")
print("=== DATA/CORPUS DOSYALARI ===")
for f in corpus_dir.rglob("*"):
    if f.is_file():
        print(f"  {f.relative_to(corpus_dir)} ({f.stat().st_size} byte)")
