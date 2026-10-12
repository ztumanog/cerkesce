import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

# morphemes.json
f = Path("public/data/linguistic/morphemes.json")
morphs = json.loads(f.read_text(encoding="utf-8"))
print(f"=== morphemes.json: {len(morphs)} morfem ===")
for m in morphs[:5]:
    print(f"\n{json.dumps(m, ensure_ascii=False, indent=2)}")

# Tiplere gore dagilim
tipler = {}
for m in morphs:
    t = m.get("type", "?")
    tipler[t] = tipler.get(t, 0) + 1
print(f"\n=== TIP DAGILIMI ===")
for t, c in sorted(tipler.items(), key=lambda x: -x[1]):
    print(f"  {t}: {c}")
