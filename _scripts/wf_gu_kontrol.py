import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# WF-GU ailesindeki tüm kelimeler
wf_gu = [l for l in lex if l.get("wordFamilyId") == "WF-GU"]
print(f"WF-GU ailesi: {len(wf_gu)} kelime")

print("\n=== WF-GU üyeleri ===")
for l in wf_gu:
    form = l.get("form", "?")
    root_ids = l.get("rootIds", [])
    lm = (l.get("literalMeaning") or "")[:40]
    print(f"  {form:25s} rootIds={root_ids} | {lm}")

# R-GU kökündekiler
r_gu = [l for l in lex if "R-GU" in (l.get("rootIds") or [])]
print(f"\nR-GU kökü: {len(r_gu)} kelime")

# WF-GU'da olup R-GU'da olmayanlar
wf_gu_set = {l.get("id") for l in wf_gu}
r_gu_set = {l.get("id") for l in r_gu}
fark = wf_gu_set - r_gu_set
print(f"\nWF-GU'da olup R-GU'da olmayan: {len(fark)}")
for lid in list(fark)[:10]:
    l = next((l for l in lex if l.get("id") == lid), None)
    if l:
        print(f"  {l.get('form'):25s} rootIds={l.get('rootIds')}")
