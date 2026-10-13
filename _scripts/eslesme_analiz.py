import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
roots = json.loads(Path("public/data/linguistic/roots.json").read_text(encoding="utf-8"))
wf = json.loads(Path("public/data/linguistic/word_families.json").read_text(encoding="utf-8"))

lex_by_id = {l.get("id"): l for l in lex}

print(f"Toplam lexeme: {len(lex)}")
print(f"Toplam kok: {len(roots)}")
print(f"Toplam word family: {len(wf)}")

# roots.json'daki lexemeId'ler
root_lexeme_ids = set()
for r in roots:
    wf_data = r.get("wordFamily", {})
    for lid in wf_data.get("lexemeIds", []):
        root_lexeme_ids.add(lid)

print(f"\nroots.json'daki toplam lexemeId: {len(root_lexeme_ids)}")
print(f"lexemes.json'da bulunan: {len(root_lexeme_ids & set(lex_by_id.keys()))}")
print(f"lexemes.json'da BULUNMAYAN: {len(root_lexeme_ids - set(lex_by_id.keys()))}")

# Mevcut durum
with_root = sum(1 for l in lex if l.get("rootIds"))
with_wf = sum(1 for l in lex if l.get("wordFamilyId"))
with_cid = sum(1 for l in lex if l.get("conceptId"))

print(f"\n=== MEVCUT DURUM ===")
print(f"rootIds olan: {with_root} ({100*with_root/len(lex):.1f}%)")
print(f"wordFamilyId olan: {with_wf} ({100*with_wf/len(lex):.1f}%)")
print(f"conceptId olan: {with_cid} ({100*with_cid/len(lex):.1f}%)")

# Eslesme potansiyeli
eksik_eslesme = 0
for lid in root_lexeme_ids & set(lex_by_id.keys()):
    l = lex_by_id[lid]
    if not l.get("rootIds"):
        eksik_eslesme += 1

print(f"\nroots.json'da var ama lexeme'de rootIds yok: {eksik_eslesme}")
print(f"-> Bu kadar lexeme HEMEN doldurulabilir!")
