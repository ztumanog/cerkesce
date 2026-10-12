import json
from pathlib import Path

BASE = Path(r"E:\projeler\Cerkesce")

# roots.json (115 kök, güncel)
with open(BASE / "public/data/linguistic/roots.json", encoding="utf-8") as f:
    roots = json.load(f)

# Normalize
def normalize(s):
    return s.replace("\u04c0", "\u04cf")

root_list = []
for r in roots:
    if r.get("form") and r.get("id"):
        root_list.append((normalize(r["form"]), r["id"]))

# Uzunluğa göre sırala
root_list = sorted(root_list, key=lambda x: -len(x[0]))

print(f"Toplam kök: {len(root_list)}")

# lexemes
with open(BASE / "public/data/linguistic/lexemes.json", encoding="utf-8") as f:
    lex = json.load(f)
lex = [l for l in lex if l and isinstance(l, dict)]
n = len(lex)

# Mevcut root'lu
mevcut_rootlu = sum(1 for l in lex if l.get("rootIds"))
print(f"Mevcut root'lu: {mevcut_rootlu} ({mevcut_rootlu/n*100:.1f}%)")

# Fuzzy match potansiyeli
atandi = 0
for l in lex:
    if l.get("rootIds"):
        continue
    
    form = normalize(l.get("form", ""))
    
    best_root = None
    best_len = 0
    
    for root_form, root_id in root_list:
        if form.startswith(root_form) and len(root_form) > best_len:
            best_root = root_id
            best_len = len(root_form)
    
    if best_root:
        atandi += 1

print(f"Fuzzy match ile atanabilir: {atandi}")
print(f"Yeni coverage: {(mevcut_rootlu + atandi) / n * 100:.1f}%")