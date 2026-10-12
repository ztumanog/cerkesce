import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

# Performance testlerini incele
perf_tests = [
    "src/tests/performance/Phase12_1_PerformanceBenchmark.test.ts",
    "src/tests/domain/concept/ConceptPerformance.test.ts",
    "src/tests/StressAndPerformance.test.ts",
]

for t in perf_tests:
    p = Path(t)
    if p.exists():
        print(f"=== {p.name} ===")
        content = p.read_text(encoding="utf-8")
        # Ilk 1500 karakter
        print(content[:1500])
        print()
