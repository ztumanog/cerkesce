import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

f = Path("src/tests/domain/linguistic/DialectConverter.c11.test.ts")
icerik = f.read_text(encoding="utf-8")
print(icerik)
