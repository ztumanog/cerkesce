import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

f = Path("src/domain/linguistic/DialectConverter.ts")
icerik = f.read_text(encoding="utf-8")

print("=== шъ VE чъыг KURALLARI ===")
for i, line in enumerate(icerik.split("\n")):
    if "шъ" in line or "чъыг" in line or "___F" in line:
        print(f"{i}: {line}")
