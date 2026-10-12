import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

p = Path("docs/ROADMAP.md")
content = p.read_text(encoding="utf-8")
content = content.replace(
    "| Faz 3 | Concept Engine | READY FOR GATE REVIEW |",
    "| Faz 3 | Concept Engine | CLOSED (2026-09-30) |"
)
content = content.replace(
    "| Faz 4 | Data Mapping & Integrity | COMPLETED |",
    "| Faz 4 | Morphology Engine | UNLOCKED (2026-09-30) |"
)
p.write_text(content, encoding="utf-8")
print("OK: ROADMAP.md")
