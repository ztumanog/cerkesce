import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

print("=== HuggingFace ===")
for f in Path("data/corpus/.hf_cache").rglob("*.parquet"):
    print(f"  {f.name} ({f.stat().st_size} byte)")

print("\n=== Webcorpora ===")
for f in Path("data/corpus/webcorpora").rglob("*"):
    if f.is_file():
        print(f"  {f.name} ({f.stat().st_size} byte)")

print("\n=== Raw ===")
for f in Path("data/corpus/raw").rglob("*.jsonl"):
    print(f"  {f.name} ({f.stat().st_size} byte)")
