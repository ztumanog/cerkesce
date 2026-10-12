import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path
import re

perf_tests = list(Path("src/tests").rglob("*[Pp]erformance*.test.ts"))
perf_tests += list(Path("src/tests").rglob("*[Bb]enchmark*.test.ts"))
perf_tests += list(Path("src/tests").rglob("*[Ss]tress*.test.ts"))

for t in perf_tests:
    print(f"=== {t.name} ===")
    content = t.read_text(encoding="utf-8")
    tests = re.findall(r"it\(['\"]([^'\"]+)['\"]", content)
    for test in tests[:5]:
        print(f"  - {test}")
    print()
