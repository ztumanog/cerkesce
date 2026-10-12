import bz2
from pathlib import Path

dump_path = Path("data/corpus/kbdwiktionary-dump.xml.bz2")
out_path = Path("data/corpus/kbdwiktionary-dump.xml")

print("Açılıyor...")
with bz2.open(dump_path, "rt", encoding="utf-8") as f:
    content = f.read()

out_path.write_text(content, encoding="utf-8")
print(f"Açıldı: {len(content):,} karakter")
print(f"Dosya: {out_path}")

# İlk 2000 karakter
print("\n=== İlk 2000 karakter ===")
print(content[:2000])
