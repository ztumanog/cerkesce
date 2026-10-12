import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

p = Path("src/tests/security/Phase8_0_5_Security.test.ts")
if p.exists():
    print(p.read_text(encoding="utf-8")[:2000])

# Test dosyalarini listele
tests = list(Path("src/tests").rglob("*.test.ts"))
print(f"\nToplam test: {len(tests)}")
for t in sorted(tests)[:30]:
    print(f"  {t.name}")
