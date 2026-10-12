import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

emotion = [l for l in lex if "EMOTION" in (l.get("conceptId") or "") or
           l.get("conceptId") == "EMOTION" or
           l.get("taxonomyFamily") == "Nitelik & Duygu" or
           l.get("taxonomyFamily") == "Duygu"]

print(f"EMOTION ile ilgili: {len(emotion)}")
print()

cid = Counter(l.get("conceptId") for l in emotion)
print("conceptId dagilimi:")
for c, s in cid.most_common(20):
    print(f"  {c}: {s}")

print("\nIlk 30:")
for l in emotion[:30]:
    print(f"  {l.get('form'):20s} | {l.get('conceptId', 'YOK'):20s} | {l.get('literalMeaning', '?')[:40]}")
