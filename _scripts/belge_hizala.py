import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

# PHASES.md
for f in list(Path("docs").rglob("*PHASES*.md")):
    print(f"=== {f.name} ===")
    content = f.read_text(encoding="utf-8")
    for line in content.split("\n"):
        if "Faz 3" in line or "Phase 3" in line:
            print(f"  {line.strip()}")

# PROJECT_STATUS
p = Path("docs/PROJECT_STATUS.md")
print(f"\n=== PROJECT_STATUS.md ===")
for line in p.read_text(encoding="utf-8").split("\n"):
    if "Faz 3" in line:
        print(f"  {line.strip()}")

# ROADMAP
p = Path("docs/ROADMAP.md")
print(f"\n=== ROADMAP.md ===")
for line in p.read_text(encoding="utf-8").split("\n"):
    if "Faz 3" in line:
        print(f"  {line.strip()}")
