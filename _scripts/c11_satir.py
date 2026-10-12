import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

f = Path("src/tests/domain/linguistic/DialectConverter.c11.test.ts")
icerik = f.read_text(encoding="utf-8")

# 10-16 satirlar
print("=== SATIR 10-16 ===")
for i, line in enumerate(icerik.split("\n")):
    if 10 <= i <= 16:
        print(f"{i}: {repr(line)}")
