import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

# PHASES.md
p = Path("docs/PHASES.md")
content = p.read_text(encoding="utf-8")
content = content.replace(
    "## Phase 3 — Concept Engine ✅ CLOSED (2026-09-30) ✅ CLOSED (2026-09-30)",
    "## Phase 3 — Concept Engine ✅ CLOSED (2026-09-30)"
)
content = content.replace(
    "## Phase 4 — Data Mapping & Integrity",
    "## Phase 4 — Morphology Engine 🔓 UNLOCKED (2026-09-30)"
)
p.write_text(content, encoding="utf-8")
print("OK: PHASES.md")

# PROJECT_STATUS.md - tekrarları kaldır
p = Path("docs/PROJECT_STATUS.md")
content = p.read_text(encoding="utf-8")
lines = content.split("\n")
seen = set()
yeni = []
for line in lines:
    if "Faz 3 | CLOSED" in line or "Faz 4 | UNLOCKED" in line:
        if line in seen:
            continue
        seen.add(line)
    yeni.append(line)
content = "\n".join(yeni)
p.write_text(content, encoding="utf-8")
print("OK: PROJECT_STATUS.md")

# Doğrula
print("\n=== DOGRULAMA ===")
for f in ["docs/PHASES.md", "docs/PROJECT_STATUS.md", "docs/ROADMAP.md"]:
    p = Path(f)
    print(f"\n{f}:")
    for line in p.read_text(encoding="utf-8").split("\n"):
        if "Faz 3" in line or "Phase 3" in line or "Faz 4" in line or "Phase 4" in line:
            print(f"  {line.strip()}")
