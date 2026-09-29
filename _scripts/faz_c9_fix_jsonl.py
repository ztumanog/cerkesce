import json
from pathlib import Path

RAW = Path("data/corpus/raw")
SPLITS = ["kbd_ru", "ru_kbd", "ady_ru", "ru_ady"]

print("=" * 60)
print("Faz C-9.1.0b — JSONL cift-kodlama duzeltmesi")
print("=" * 60)

for split in SPLITS:
    in_path = RAW / f"circassian_{split}.jsonl"
    out_path = RAW / f"circassian_{split}.fixed.jsonl"

    if not in_path.exists():
        print(f"[!] Yok: {in_path}")
        continue

    print(f"[1/2] Okunuyor: {in_path.name}")
    fixed_count = 0
    with in_path.open("r", encoding="utf-8") as fin, \
         out_path.open("w", encoding="utf-8") as fout:
        for line in fin:
            row = json.loads(line)
            trans = row.get("translation")
            if isinstance(trans, str):
                trans = json.loads(trans)
            fout.write(json.dumps({"translation": trans}, ensure_ascii=False) + "\n")
            fixed_count += 1

    print(f"[2/2] Yazildi:  {out_path.name} ({fixed_count:,} satir)")

    backup = in_path.with_suffix(".jsonl.bak")
    if backup.exists():
        backup.unlink()
    in_path.rename(backup)
    out_path.rename(in_path)
    print(f"      Yedek: {backup.name}")

print()
print("OK — JSONL dosyalari duzeltildi.")
