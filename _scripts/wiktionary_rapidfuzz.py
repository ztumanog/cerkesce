import json
from pathlib import Path
from rapidfuzz import fuzz, process
import sys

BASE = Path(r"E:\projeler\Cerkesce")
lex = json.loads((BASE/"public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
wik = json.loads((BASE/"_wiktionary/wiktionary_full.json").read_text(encoding="utf-8"))
lemmas = json.loads((BASE/"_wiktionary/lemmas_filtered.json").read_text(encoding="utf-8"))

wik_norm = {t.lower(): t for t in wik.keys()}
wik_keys = list(wik.keys())

tam = lemma_esleme = prefix_esleme = fuzzy_esleme = eslesmeyen = 0
ornek_fuzzy = []

for i, l in enumerate(lex):
    if i % 5000 == 0 and i > 0:
        print(f"  {i} islendi... (fuzzy: {fuzzy_esleme})")
    
    form = (l.get("form") or "").strip()
    if not form:
        continue
    if form.lower() in wik_norm:
        tam += 1
        continue
    lemma_data = lemmas.get(form)
    if lemma_data:
        lemma = lemma_data.get("lemma") or ""
        if lemma and lemma.lower() in wik_norm:
            lemma_esleme += 1
            continue
    bulundu = False
    for j in range(len(form)-1, 3, -1):
        if form[:j].lower() in wik_norm:
            prefix_esleme += 1
            bulundu = True
            break
    if bulundu:
        continue
    sonuc = process.extractOne(form, wik_keys, scorer=fuzz.ratio, score_cutoff=85)
    if sonuc:
        wik_title, oran, _ = sonuc
        fuzzy_esleme += 1
        if len(ornek_fuzzy) < 30:
            ornek_fuzzy.append((form, wik_title, round(oran/100, 2)))
        continue
    eslesmeyen += 1

toplam = tam + lemma_esleme + prefix_esleme + fuzzy_esleme
print(f"\n=== SONUC ===")
print(f"Tam:        {tam}  (%{100*tam/len(lex):.1f})")
print(f"Lemma:      {lemma_esleme}  (%{100*lemma_esleme/len(lex):.1f})")
print(f"Prefix:     {prefix_esleme}  (%{100*prefix_esleme/len(lex):.1f})")
print(f"Fuzzy:      {fuzzy_esleme}  (%{100*fuzzy_esleme/len(lex):.1f})")
print(f"TOPLAM:     {toplam}  (%{100*toplam/len(lex):.1f})")
print(f"Eslesmeyen: {eslesmeyen}  (%{100*eslesmeyen/len(lex):.1f})")
print(f"\n=== FUZZY ORNEKLER ===")
for form, wik_title, oran in ornek_fuzzy:
    print(f"  {form:25} -> {wik_title:25} ({oran})")
