import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

f = Path("src/domain/linguistic/DialectConverter.ts")
icerik = f.read_text(encoding="utf-8")

# Kontrol: duzeltmeler yapildi mi?
print("=== DUZELTME KONTROLU ===")
print(f"шъэ kurali var mi? {'EVET' if 'шъэ' in icerik and 'щэ' in icerik else 'HAYIR'}")
print(f"чъыгы kurali var mi? {'EVET' if 'чъыгы' in icerik else 'HAYIR'}")

# Ilgili satirlari goster
for i, line in enumerate(icerik.split("\n")):
    if "шъэ" in line or "чъыгы" in line or "чъыг" in line:
        print(f"{i}: {line}")
