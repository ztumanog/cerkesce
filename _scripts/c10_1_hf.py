import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path
try:
    import pyarrow.parquet as pq
    print("pyarrow OK")
except ImportError:
    print("pyarrow YOK")
    sys.exit(1)

for f in Path("data/corpus/.hf_cache").rglob("*.parquet"):
    table = pq.read_table(f)
    print(f"\n{f.name}:")
    print(f"  Satir: {table.num_rows}")
    print(f"  Kolonlar: {table.column_names}")
