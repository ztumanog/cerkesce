import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

p = Path("docs/PROJECT_STATUS.md")
content = p.read_text(encoding="utf-8")
content = content.replace(
    "| Faz 3 | READY FOR GATE REVIEW | Mimar onayli |",
    "| Faz 3 | CLOSED | 2026-09-30 |"
)
content = content.replace(
    "| Faz 4 | COMPLETED | Data Mapping |",
    "| Faz 4 | UNLOCKED | 2026-09-30 |"
)
p.write_text(content, encoding="utf-8")
print("OK: PROJECT_STATUS.md")
