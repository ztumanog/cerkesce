import re
import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

f = Path("src/tests/domain/linguistic/DialectConverter.c11.test.ts")
icerik = f.read_text(encoding="utf-8")

# 1) щхьэщэ veya шъхьащэ varyasyonlarini 'щхьэшэ' yap
icerik = re.sub(r"'(?:щхьэщэ|шъхьащэ)'", "'щхьэшэ'", icerik)

# 2) Dizi icindeki 'щыгы' kelimesini 'жыг' ile degistir
icerik = re.sub(
    r"\[\s*['\"]чъыгы['\"]\s*,\s*['\"]щыгы['\"]\s*,\s*['\"]agac['\"]\s*\]",
    "['чъыгы', 'жыг', 'agac']",
    icerik
)

f.write_text(icerik, encoding="utf-8")

# Kontrol
icerik2 = f.read_text(encoding="utf-8")
print("=== DUZELTME SONRASI ===")
print(f"щхьэшэ var mi? {'EVET' if 'щхьэшэ' in icerik2 else 'HAYIR'}")
print(f"жыг var mi? {'EVET' if 'жыг' in icerik2 else 'HAYIR'}")

# Ilgili satirlari goster
for i, line in enumerate(icerik2.split("\n")):
    if "шъхьащэ" in line or "чъыгы" in line:
        print(f"{i}: {line}")
