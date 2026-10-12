import sys
sys.stdout.reconfigure(encoding="utf-8")
from datasets import load_dataset

print("Veri seti yukleniyor...")
ds = load_dataset(
    "adiga-ai/circassian-parallel-corpus",
    trust_remote_code=True,
    verification_mode="no_checks"
)

print("Split'ler:", list(ds.keys()))

# Sütun adlarını kontrol et
for split in ds:
    print(f"\n--- {split} ---")
    print("Sutunlar:", ds[split].column_names)
    print("Ornek:", ds[split][0])
    break

# Tüm metinleri topla
all_text = []
for split in ds:
    for row in ds[split]:
        for col in row:
            if isinstance(row[col], str):
                all_text.append(row[col])

print(f"\nToplam metin: {len(all_text)}")

print("\n=== lezh (calismak) koku ===")
for form in ["лэжь", "лэжьэн", "лэжьыгъэ", "лэжьэным", "лэжьак1уэ"]:
    count = sum(1 for t in all_text if form in t)
    print(f"{form}: {count}")

print("\n=== lazhe (kusur/keder/suc) ===")
for form in ["лажьэ", "лажьэншэ", "лажьэрей", "лажьэшхуэ"]:
    count = sum(1 for t in all_text if form in t)
    print(f"{form}: {count}")
