import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

p = Path("docs/PHASES.md")
content = p.read_text(encoding="utf-8")
content = content.replace(
    "## Phase 3 — Concept Engine",
    "## Phase 3 — Concept Engine ✅ CLOSED (2026-09-30)"
)
content = content.replace(
    "## Phase 4 — Morphology Engine",
    "## Phase 4 — Morphology Engine 🔓 UNLOCKED (2026-09-30)"
)
p.write_text(content, encoding="utf-8")
print("OK: PHASES.md")
