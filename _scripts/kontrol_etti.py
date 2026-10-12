import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# rootIds dolu olanlar
rootlu = [l for l in lex if l.get("rootIds")]
print(f"rootIds dolu: {len(rootlu)}")

# rootIds bazında dağılım
from collections import Counter
root_dagilim = Counter()
for l in rootlu:
    for rid in l["rootIds"]:
        root_dagilim[rid] += 1

print(f"\n=== En çok eşleşen 15 kök ===")
for rid, sayi in root_dagilim.most_common(15):
    print(f"  {rid:15s} {sayi:5}")

# Örnek: R-GU (гу) kökü
print(f"\n=== R-GU (гу) köküne sahip 10 kelime ===")
gu = [l for l in lex if "R-GU" in (l.get("rootIds") or [])]
for l in gu[:10]:
    print(f"  {l['id']:20s} form={l.get('form', '?'):20s} rootIds={l.get('rootIds')}")

# wordFamilyId dolu
wfli = [l for l in lex if l.get("wordFamilyId")]
print(f"\nwordFamilyId dolu: {len(wfli)}")

# Aile dağılımı
wf_dagilim = Counter(l["wordFamilyId"] for l in wfli)
print(f"\n=== En çok eşleşen 15 aile ===")
for wf, sayi in wf_dagilim.most_common(15):
    print(f"  {wf:15s} {sayi:5}")
