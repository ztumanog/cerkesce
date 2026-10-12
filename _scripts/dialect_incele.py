import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

# 1) Converter'i incele
f = Path("src/domain/linguistic/DialectConverter.ts")
if f.exists():
    print("=== DialectConverter.ts ===")
    print(f.read_text(encoding="utf-8")[:2000])

# 2) Test dosyalarini incele
print("\n\n=== TEST DOSYALARI ===")
for tf in ["src/tests/domain/linguistic/DialectConverter.cert.test.ts",
           "src/tests/DialectRules.test.ts"]:
    f = Path(tf)
    if f.exists():
        print(f"\n--- {tf} ---")
        print(f.read_text(encoding="utf-8")[:1000])
