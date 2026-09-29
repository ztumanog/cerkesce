"""
Faz C-9.1.0 — Circassian Parallel Corpus indirme (v2 - parquet direct)
======================================================================
Kaynak : https://huggingface.co/datasets/adiga-ai/circassian-parallel-corpus
Lisans : CC BY 4.0
Atif   : Anzor Qunash (2025). Circassian-Russian Parallel Text Corpus v1.0. adiga.ai

NOT: load_dataset() yerine parquet dosyalarini dogrudan indirip okuyoruz.
     Bu, HF datasets cache bug'ini (WinError 145) tamamen atlar.
"""
import json
import os
import sys
from pathlib import Path
from datetime import datetime, timezone

try:
    import pandas as pd
    from huggingface_hub import hf_hub_download
except ImportError as e:
    print(f"HATA: Eksik paket: {e}", file=sys.stderr)
    print("Kurun: py -m pip install pandas huggingface-hub pyarrow", file=sys.stderr)
    sys.exit(1)

# ---- Yapilandirma ----
DATASET_ID = "adiga-ai/circassian-parallel-corpus"
SPLITS = ["kbd_ru", "ru_kbd", "ady_ru", "ru_ady"]

BASE_DIR = Path("data/corpus")
RAW_DIR = BASE_DIR / "raw"
RAW_DIR.mkdir(parents=True, exist_ok=True)

HF_CACHE = BASE_DIR / ".hf_cache"
HF_CACHE.mkdir(parents=True, exist_ok=True)

# HF cache yolunu degistir (proje ici)
os.environ["HF_HOME"] = str(HF_CACHE.resolve())

print("=" * 60)
print("Faz C-9.1.0 — Circassian Parallel Corpus Indirme (v2)")
print("=" * 60)
print(f"Dataset : {DATASET_ID}")
print(f"Hedef   : {RAW_DIR.resolve()}")
print(f"Cache   : {HF_CACHE.resolve()}")
print()

counts = {}

for split_name in SPLITS:
    # Parquet dosyasini indir (HF cache'de)
    parquet_filename = f"data/{split_name}-00000-of-00001.parquet"
    print(f"[1/3] Indiriliyor: {parquet_filename}")

    try:
        parquet_path = hf_hub_download(
            repo_id=DATASET_ID,
            filename=parquet_filename,
            repo_type="dataset",
            cache_dir=str(HF_CACHE.resolve()),
        )
    except Exception as e:
        print(f"HATA: Indirilemedi ({split_name}): {e}", file=sys.stderr)
        continue

    # Parquet'i oku
    print(f"[2/3] Okunuyor:    {split_name}")
    df = pd.read_parquet(parquet_path)

    # Ceviri sutununu ac (translation = {"kbd": "...", "ru": "..."})
    # DataFrame sutunu "translation" olabilir, dict olarak
    if "translation" not in df.columns:
        print(f"UYARI: 'translation' sutunu yok. Sutunlar: {list(df.columns)}")
        continue

    # JSONL olarak kaydet
    out_path = RAW_DIR / f"circassian_{split_name}.jsonl"
    print(f"[3/3] Yaziliyor:   {out_path.name} ({len(df):,} satir)")

    with out_path.open("w", encoding="utf-8") as f:
        for row in df.itertuples(index=False):
            # row.translation bir dict
            record = {"translation": row.translation}
            f.write(json.dumps(record, ensure_ascii=False) + "\n")

    counts[split_name] = len(df)

print()

# ---- Metadata ----
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
print(f"[OK] Metadata yazildi: {meta_path}")
print(f"[OK] Toplam: {total:,} ceviri cifti")
print()
print("Split dagilimi:")
for name, cnt in counts.items():
    print(f"  {name:8s}  {cnt:>8,}")
print()
print("BASARILI - Corpus indirildi.")