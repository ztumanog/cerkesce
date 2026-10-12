import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
shchy = [l for l in lex if l.get("form", "").startswith("щы")]
dolu = [l for l in shchy if l.get("conceptId") and l.get("conceptId") not in ("", "-")]

# Dolu olanlari yazdir
print(f"DOLU: {len(dolu)}")
print()
for l in dolu:
    print(f"  {l.get('form'):20s} | {l.get('conceptId'):20s}")

# 8 kelime var mi?
print("\n=== 8 KELIME KONTROL ===")
hedefler = ["щын", "щыугъ", "щычын", "щытхъугъ", "щыхъон", "щыуагъ", "щыхьан", "щыуэ"]
for h in hedefler:
    var = [l for l in dolu if l.get("form") == h]
    print(f"  {h:15s} | DOLU listesinde: {'VAR' if var else 'YOK'}")
