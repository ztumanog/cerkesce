import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

print("=== DOGRULAMA ===")
for f in ["docs/PHASES.md", "docs/PROJECT_STATUS.md", "docs/ROADMAP.md"]:
    p = Path(f)
    print(f"\n{f}:")
    for line in p.read_text(encoding="utf-8").split("\n"):
        if "Faz 3" in line or "Phase 3" in line or "Faz 4" in line or "Phase 4" in line:
            print(f"  {line.strip()}")
