import json
from pathlib import Path
from rapidfuzz import fuzz, process
import sys

BASE = Path(r"E:\projeler\Cerkesce")
lex = json.loads((BASE/"public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
wik = json.loads((BASE/"_wiktionary/wiktionary_full.json").read_text(encoding="utf-8"))
lemmas = json.loads((BASE/"_wiktionary/lemmas_filtered.json").read_text(encoding="utf-8"))

def normalize(text):
    if not text:
        return ""
    t = text.lower().strip()
    t = t.replace("ı", "ӏ").replace("i", "ӏ").replace("1", "ӏ").replace("l", "ӏ")
    t = (t.replace("шъ", "щ")
          .replace("жъ", "жь")
          .replace("чъ", "ч")
          .replace("гъо", "гъуэ"))
    return t

# Wiktionary indeksleme
wik_norm_map = {}
wik_norm_to_orig = {}

for original_key in wik.keys():
    if not original_key:
        continue
    wik_norm_map[original_key.lower()] = original_key
    norm_key = normalize(original_key)
    if norm_key:
        wik_norm_map[norm_key] = original_key
        wik_norm_to_orig[norm_key] = original_key

# Normalize listesi (rapidfuzz icin)
norm_keys = list(wik_norm_to_orig.keys())

tam = lemma_esleme = prefix_esleme = fuzzy_esleme = eslesmeyen = 0
ornek_fuzzy = []

for i, l in enumerate(lex):
    if i % 5000 == 0 and i > 0:
        print(f"  {i}... (fuzzy: {fuzzy_esleme})")
    
    form = (l.get("form") or "").strip()
    if not form:
        continue
    
    form_l = form.lower()
    form_norm = normalize(form)
    
    # 1. Tam (orijinal)
    if form_l in wik_norm_map:
        tam += 1
        continue
    
    # 1b. Tam (normalize)
    if form_norm and form_norm in wik_norm_map:
        tam += 1
        continue
    
    # 2. Lemma
    lemma_data = lemmas.get(form)
    if lemma_data:
        lemma = lemma_data.get("lemma") or ""
        if lemma and (lemma.lower() in wik_norm_map or normalize(lemma) in wik_norm_map):
            lemma_esleme += 1
            continue
    
    # 3. Prefix
    bulundu = False
    for j in range(len(form)-1, 3, -1):
        if form[:j].lower() in wik_norm_map:
            prefix_esleme += 1
            bulundu = True
            break
    if bulundu:
        continue
    
    # 4. Fuzzy (rapidfuzz)
    if form_norm and norm_keys:
        sonuc = process.extractOne(form_norm, norm_keys, scorer=fuzz.ratio, score_cutoff=82)
        if sonuc:
            norm_title, oran, _ = sonuc
            orig_title = wik_norm_to_orig.get(norm_title, norm_title)
            fuzzy_esleme += 1
            if len(ornek_fuzzy) < 40:
                ornek_fuzzy.append((form, orig_title, round(oran/100, 2)))
            continue
    
    eslesmeyen += 1

toplam = tam + lemma_esleme + prefix_esleme + fuzzy_esleme
print(f"\n=== SONUC (rapidfuzz) ===")
print(f"Tam:        {tam}  (%{100*tam/len(lex):.1f})")
print(f"Lemma:      {lemma_esleme}  (%{100*lemma_esleme/len(lex):.1f})")
print(f"Prefix:     {prefix_esleme}  (%{100*prefix_esleme/len(lex):.1f})")
print(f"Fuzzy:      {fuzzy_esleme}  (%{100*fuzzy_esleme/len(lex):.1f})")
print(f"TOPLAM:     {toplam}  (%{100*toplam/len(lex):.1f})")
print(f"Eslesmeyen: {eslesmeyen}  (%{100*eslesmeyen/len(lex):.1f})")

print(f"\n=== ORNEKLER ===")
for form, wik_title, oran in ornek_fuzzy:
    print(f"  {form:25} -> {wik_title:25} ({oran})")
