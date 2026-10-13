import json
from pathlib import Path

print("=" * 60)
print("ROOTS.JSON")
print("=" * 60)
roots = json.loads(Path("public/data/linguistic/roots.json").read_text(encoding="utf-8"))
print(f"Tip: {type(roots).__name__}")
print(f"Toplam: {len(roots)}")
if isinstance(roots, list) and roots:
    print(f"\nİlk 3 kök:")
    for r in roots[:3]:
        print(json.dumps(r, ensure_ascii=False, indent=2))

print("\n" + "=" * 60)
print("WORD_FAMILIES.JSON")
print("=" * 60)
wf = json.loads(Path("public/data/linguistic/word_families.json").read_text(encoding="utf-8"))
print(f"Tip: {type(wf).__name__}")
print(f"Toplam: {len(wf)}")
if isinstance(wf, list) and wf:
    print(f"\nİlk 3 aile:")
    for w in wf[:3]:
        print(json.dumps(w, ensure_ascii=False, indent=2))

print("\n" + "=" * 60)
print("CONCEPT_MAPPING.JSON")
print("=" * 60)
cm = json.loads(Path("public/data/linguistic/concept_mapping.json").read_text(encoding="utf-8"))
print(f"Tip: {type(cm).__name__}")
print(f"Toplam: {len(cm)}")
if isinstance(cm, dict):
    for k, v in list(cm.items())[:3]:
        print(f"  {k} → {json.dumps(v, ensure_ascii=False)[:100]}")
elif isinstance(cm, list):
    for item in cm[:3]:
        print(f"  {json.dumps(item, ensure_ascii=False)[:150]}")
