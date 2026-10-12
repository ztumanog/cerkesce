import csv
from pathlib import Path

csv_path = Path(r"E:\projeler\Cerkesce\_scripts\root_adaylari_full2.csv")

print(f"Dosya: {csv_path}")
print(f"Var mı: {csv_path.exists()}")

if csv_path.exists():
    print(f"Boyut: {csv_path.stat().st_size} byte")
    print()
    
    with open(csv_path, encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    
    print(f"Satır: {len(rows)}")
    if rows:
        print(f"Kolonlar: {list(rows[0].keys())}")
        print()
        print("İlk 5:")
        for r in rows[:5]:
            print(f"  {r}")