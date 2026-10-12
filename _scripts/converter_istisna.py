import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

f = Path("src/domain/linguistic/DialectConverter.ts")
icerik = f.read_text(encoding="utf-8")

# Mevcut istisnalari bul
print("=== MEVCUT ISTISNALAR (satir 80-95) ===")
satirlar = icerik.split("\n")
for i in range(80, 95):
    if i < len(satirlar):
        print(f"{i}: {satirlar[i]}")
