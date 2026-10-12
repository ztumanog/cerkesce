import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

f = Path("src/tests/domain/linguistic/DialectConverter.c11.test.ts")
icerik = f.read_text(encoding="utf-8")

# 1) shchhashche -> shkheshe
icerik = icerik.replace("'щхьэщэ'", "'щхьэшэ'")

# 2) chygy -> zhyg
icerik = icerik.replace("['чъыгы', 'щыгы', 'agac']", "['чъыгы', 'жыг', 'agac']")

f.write_text(icerik, encoding="utf-8")

# Kontrol
icerik2 = f.read_text(encoding="utf-8")
print("=== DUZELTME SONRASI ===")
print(f"щхьэшэ var mi? {'EVET' if 'щхьэшэ' in icerik2 else 'HAYIR'}")
print(f"жыг var mi? {'EVET' if \"'жыг'\" in icerik2 else 'HAYIR'}")

for i, line in enumerate(icerik2.split("\n")):
    if "шъхьащэ" in line or "чъыгы" in line:
        print(f"{i}: {line}")
