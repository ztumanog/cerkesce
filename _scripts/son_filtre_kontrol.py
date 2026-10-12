import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

rootlu = [l for l in lex if l.get("rootIds")]
coklu = [l for l in rootlu if len(l["rootIds"]) > 1]

print(f"rootIds dolu: {len(rootlu)}")
print(f"Çoklu kök: {len(coklu)}")

for rid in ["R-HAE", "R-KWA", "R-SHYGHW", "R-DAGHA", "R-CHET", "R-WAS", "R-QWASH"]:
    sayi = len([l for l in lex if rid in (l.get("rootIds") or [])])
    print(f"  {rid:12s} {sayi}")

print("\n=== R-HAE kelimeleri ===")
for l in lex:
    if "R-HAE" in (l.get("rootIds") or []):
        print(f"  {l.get('form', '?'):25s}")

root_dagilim = Counter()
for l in rootlu:
    for rid in l["rootIds"]:
        root_dagilim[rid] += 1
print("\n=== En çok eşleşen 10 kök ===")
for rid, sayi in root_dagilim.most_common(10):
    print(f"  {rid:12s} {sayi:5}")
