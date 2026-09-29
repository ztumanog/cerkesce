"""
Faz C-9.1.0 — Circassian Parallel Corpus indirme
================================================
Kaynak : https://huggingface.co/datasets/adiga-ai/circassian-parallel-corpus
Lisans : CC BY 4.0
Atıf   : Anzor Qunash (2025). Circassian-Russian Parallel Text Corpus v1.0. adiga.ai
Tarih  : 2026-09-30
"""
import os
import json
import sys
from pathlib import Path
from datetime import datetime, timezone

# --- Windows symlink sorunlarini asmak icin (import'lardan SONRA, load_dataset'ten ONCE) ---
os.environ["HF_HUB_DISABLE_SYMLINKS_WARNING"] = "1"
os.environ["HF_HUB_DISABLE_SYMLINKS"] = "1"
os.environ["HF_DATASETS_CACHE"] = str(Path("data/corpus/.hf_cache").resolve())

try:
    from datasets import load_dataset
except ImportError:
    print("HATA: 'datasets' paketi bulunamadi. Kurun: py -m pip install datasets", file=sys.stderr)
    sys.exit(1)

# ---- Yapilandirma ----
DATASET_ID = "adiga-ai/circassian-parallel-corpus"
SPLITS = ["kbd_ru", "ru_kbd", "ady_ru", "ru_ady"]

BASE_DIR = Path("data/corpus")
RAW_DIR = BASE_DIR / "raw"
RAW_DIR.mkdir(parents=True, exist_ok=True)

print("=" * 60)
print("Faz C-9.1.0 — Circassian Parallel Corpus Indirme")
print("=" * 60)
print(f"Dataset : {DATASET_ID}")
print(f"Hedef   : {RAW_DIR.resolve()}")
print(f"Cache   : {os.environ['HF_DATASETS_CACHE']}")
print()

# ---- Adim 1: Dataset yukle ----
print("[1/4] Dataset yukleniyor (bu birkac dakika surebilir)...")
try:
    ds = load_dataset(DATASET_ID)
except Exception as e:
    print(f"HATA: Dataset yuklenemedi: {e}", file=sys.stderr)
    print("       Cozum: Cache temizleyin ve tekrar deneyin.", file=sys.stderr)
    sys.exit(1)

print(f"      Yuklenen split'ler: {list(ds.keys())}")
print()

# ---- Adim 2: Her split'i JSONL olarak kaydet ----
counts = {}
for split_name in SPLITS:
    if split_name not in ds:
        print(f"[!] Split bulunamadi: {split_name} (atlanıyor)")
        continue

    split = ds[split_name]
    count = len(split)
    counts[split_name] = count

    out_path = RAW_DIR / f"circassian_{split_name}.jsonl"
    print(f"[2/4] Yaziliyor: {out_path.name} ({count:,} satir)")

    with out_path.open("w", encoding="utf-8") as f:
        for row in split:
            f.write(json.dumps(row, ensure_ascii=False) + "\n")

print()

# ---- Adim 3: Metadata ----
total = sum(counts.values())
meta = {
    "corpusName": DATASET_ID,
    "version": "v1.0",
    "license": "CC BY 4.0",
    "downloadedAt": datetime.now(timezone.utc).isoformat(),
    "splits": counts,
    "totalPairs": total,
    "citation": "Anzor Qunash (2025). Circassian-Russian Parallel Text Corpus v1.0. adiga.ai",
    "url": f"https://huggingface.co/datasets/{DATASET_ID}",
    "schema": {
        "format": "jsonl",
        "fields": ["translation.kbd", "translation.ady", "translation.ru"],
        "note": "Her satir bir ceviri ciftini temsil eder."
    }
}

meta_path = BASE_DIR / "metadata.json"
meta_path.write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"[3/4] Metadata yazildi: {meta_path}")

# ---- Adim 4: Ozet ----
print(f"[4/4] Toplam: {total:,} ceviri cifti")
print()
print("Split dagilimi:")
for name, cnt in counts.items():
    print(f"  {name:8s}  {cnt:>8,}")
print()
print("OK — Corpus indirildi.")