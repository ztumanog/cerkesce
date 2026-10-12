import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

f = Path("src/tests/domain/linguistic/DialectConverter.c11.test.ts")
icerik = f.read_text(encoding="utf-8")

# Kontrol
has_shheshe = "щхьэшэ" in icerik
has_zhyg = "'жыг'" in icerik

print("=== KONTROL ===")
print(f"щхьэшэ var mi? {'EVET' if has_shheshe else 'HAYIR'}")
print(f"жыг var mi? {'EVET' if has_zhyg else 'HAYIR'}")

# Ilgili satirlari goster
print("\n=== ILGILI SATIRLAR ===")
for i, line in enumerate(icerik.split("\n")):
    if "шъхьащэ" in line or "чъыгы" in line:
        print(f"{i}: {line}")
