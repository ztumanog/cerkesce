import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

f = Path("src/domain/linguistic/DialectConverter.ts")
icerik = f.read_text(encoding="utf-8")

print("=== SHCH KURALLARI ===")
for i, line in enumerate(icerik.split("\n")):
    if "шъ" in line or "щ" in line or "shch" in line.lower():
        print(f"{i}: {line}")
