import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

pkg = json.loads(Path("package.json").read_text(encoding="utf-8"))
print("=== DEPENDENCIES ===")
for k, v in pkg.get("dependencies", {}).items():
    print(f"  {k}: {v}")
print("\n=== DEV DEPENDENCIES ===")
for k, v in pkg.get("devDependencies", {}).items():
    print(f"  {k}: {v}")
