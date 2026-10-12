import json
from pathlib import Path

BASE = Path(r"E:\projeler\Cerkesce")

# roots.json (115 kök)
with open(BASE / "public/data/linguistic/roots.json", encoding="utf-8") as f:
    roots = json.load(f)

def normalize(s):
    return s.replace("\u04c0", "\u04cf")

root_list = []
for r in roots:
    if r.get("form") and r.get("id"):
        root_list.append((normalize(r["form"]), r["id"]))

root_list = sorted(root_list, key=lambda x: -len(x[0]))

print(f"Toplam kök: {len(root_list)}")

# lexemes
with open(BASE / "public/data/linguistic/lexemes.json", encoding="utf-8") as f:
    lex = json.load(f)

# Filtrele (None kayıtları)
lex = [l for l in lex if l and isinstance(l, dict)]

print(f"Toplam lexeme: {len(lex)}")

# Fuzzy match uygula
atandi = 0
atlanan = 0

for l in lex:
    if l.get("rootIds"):
        atlanan += 1
        continue
    
    form = normalize(l.get("form", ""))
    
    best_root = None
    best_len = 0
    
    for root_form, root_id in root_list:
        if form.startswith(root_form) and len(root_form) > best_len:
            best_root = root_id
            best_len = len(root_form)
    
    if best_root:
        l["rootIds"] = [best_root]
        atandi += 1

print(f"Atanan: {atandi}")
print(f"Atlanan (zaten root'lu): {atlanan}")

# Kaydet
lex_path = BASE / "public/data/linguistic/lexemes.json"
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"✅ Kaydedildi: {lex_path}")

# Yeni coverage
rootlu = sum(1 for l in lex if l.get("rootIds"))
print(f"Yeni root'lu: {rootlu} ({rootlu/len(lex)*100:.1f}%)")