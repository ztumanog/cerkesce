import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

# Performance testlerini bul
tests = list(Path("src/tests").rglob("*.test.ts"))
perf = [t for t in tests if "performance" in t.name.lower() or "benchmark" in t.name.lower() or "stress" in t.name.lower()]

print(f"Performance test: {len(perf)}")
for t in perf:
    print(f"  - {t.name}")

# Discovery testleri (performans icin)
disc = [t for t in tests if "discovery" in str(t).lower() and "performance" in t.name.lower()]
print(f"\nDiscovery performance: {len(disc)}")
