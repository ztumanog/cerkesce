import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# L-CORPUS ID'lerini çıkar
lcorpus = [l for l in lex if l.get("id", "").startswith("L-CORPUS-")]
ids = sorted([int(l.get("id", "").replace("L-CORPUS-", "")) for l in lcorpus])

print(f"Toplam L-CORPUS: {len(ids)}")
print(f"Min ID: {min(ids)}")
print(f"Max ID: {max(ids)}")
print(f"Beklenen: {max(ids) + 1}")

# Tüm gap'ları bul
gaps = []
for i in range(min(ids), max(ids) + 1):
    if i not in ids:
        gaps.append(i)

if gaps:
    print(f"\n🔴 TOPLAM GAP: {len(gaps)}")
    print(f"\nGap Aralıkları:")
    
    # Aralıkları grupla
    ranges = []
    start = gaps[0]
    end = gaps[0]
    
    for i in range(1, len(gaps)):
        if gaps[i] == end + 1:
            end = gaps[i]
        else:
            ranges.append((start, end))
            start = gaps[i]
            end = gaps[i]
    ranges.append((start, end))
    
    for start, end in ranges:
        if start == end:
            print(f"  ❌ L-CORPUS-{start}")
        else:
            print(f"  ❌ L-CORPUS-{start} to L-CORPUS-{end} ({end - start + 1} kayıt)")
else:
    print("\n✅ GAP YOK - Tüm ID'ler sıralı")
