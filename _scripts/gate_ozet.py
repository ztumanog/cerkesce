import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path
p = Path("docs/governance/PHASE3_COMPLETION_REPORT.md")
print("=== FAZ 3 ===")
print(p.read_text(encoding="utf-8")[:500])
p2 = Path("docs/FAZ_6_GATE_KAPANIS.md")
print("\n=== FAZ 6 ===")
print(p2.read_text(encoding="utf-8")[:500])
