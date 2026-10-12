import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

f = Path("src/domain/linguistic/DialectConverter.ts")
icerik = f.read_text(encoding="utf-8")

print("=== KONTROL ===")
print(f"шъэ kurali var mi? {'EVET' if 'шъэ' in icerik else 'HAYIR'}")
print(f"шъхьащэ kurali var mi? {'EVET' if 'шъхьащэ' in icerik else 'HAYIR'}")
print(f"чъыгы kurali var mi? {'EVET' if 'чъыгы' in icerik else 'HAYIR'}")

# Ilk 20 satiri goster (let c = word civari)
print("\n=== let c = word CIVARI ===")
satirlar = icerik.split("\n")
for i, line in enumerate(satirlar):
    if "let c = word" in line:
        for j in range(i, min(i+10, len(satirlar))):
            print(f"{j}: {satirlar[j]}")
        break
