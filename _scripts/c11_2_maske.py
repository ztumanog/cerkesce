import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

f = Path("src/domain/linguistic/DialectConverter.ts")
c = f.read_text(encoding="utf-8")

if "___TS1___" in c:
    c = c.replace("___TS1___", "ЦЦЦ")
    f.write_text(c, encoding="utf-8")
    print("OK: ___TS1___ -> ЦЦЦ")
else:
    print("___TS1___ bulunamadi")

# Kontrol
import re
print("\nMevcut kural:")
for line in c.split("\n"):
    if "ЦЦЦ" in line or "TS1" in line or "цӀ" in line:
        print(f"  {line.strip()}")
