# _scripts/ipa_doldur_v4.py
import json
import shutil
import datetime
from pathlib import Path
from rapidfuzz import fuzz, process
import sys

sys.stdout.reconfigure(encoding="utf-8")

BASE = Path(r"E:\projeler\Cerkesce")
LEX = BASE / "public/data/linguistic/lexemes.json"
WIK = BASE / "_wiktionary/wiktionary_full.json"
LEMMAS = BASE / "_wiktionary/lemmas_filtered.json"

lex = json.loads(LEX.read_text(encoding="utf-8"))
wik = json.loads(WIK.read_text(encoding="utf-8"))
lemmas = json.loads(LEMMAS.read_text(encoding="utf-8"))

def normalize(text):
    if not text:
        return ""
    t = text.lower().strip()
    t = t.replace("ı", "Ӏ").replace("i", "Ӏ").replace("1", "Ӏ").replace("l", "Ӏ")
    t = (t.replace("шъ", "щ")
          .replace("жъ", "жь")
          .replace("чъ", "ч")
          .replace("гъо", "гъуэ")
          .replace("о", "уэ"))
    return t

wik_norm_map = {}
wik_norm_to_orig = {}
wik_norm_by_prefix2 = {}

for original_key in wik.keys():
    if not original_key:
        continue
    wik_norm_map[original_key.lower()] = original_key
    norm_key = normalize(original_key)
    if norm_key:
        wik_norm_map[norm_key] = original_key
        wik_norm_to_orig[norm_key] = original_key
        if len(norm_key) >= 2:
            wik_norm_by_prefix2.setdefault(norm_key[:2], []).append(norm_key)

def fuzzy_kati(form_norm, esik=0.92):
    if not form_norm or len(form_norm) < 3:
        return None, 0.0
    p2 = form_norm[:2]
    adaylar = wik_norm_by_prefix2.get(p2, [])
    if not adaylar:
        return None, 0.0
    uygun = [a for a in adaylar if abs(len(a) - len(form_norm)) <= 1]
    if not uygun:
        return None, 0.0
    sonuc = process.extractOne(form_norm, uygun, scorer=fuzz.ratio, score_cutoff=esik*100)
    if sonuc:
        norm_title, oran, _ = sonuc
        return wik_norm_to_orig.get(norm_title, norm_title), oran / 100
    return None, 0.0

def find_ipa(form):
    form_l = form.lower()
    form_norm = normalize(form)
    
    if form_l in wik_norm_map:
        return wik_norm_map[form_l], "tam"
    
    if form_norm and form_norm in wik_norm_map:
        return wik_norm_map[form_norm], "tam_norm"
    
    lemma_data = lemmas.get(form)
    if lemma_data:
        lemma = lemma_data.get("lemma") or ""
        if lemma:
            if lemma.lower() in wik_norm_map:
                return wik_norm_map[lemma.lower()], "lemma"
            lemma_norm = normalize(lemma)
            if lemma_norm in wik_norm_map:
                return wik_norm_map[lemma_norm], "lemma_norm"
    
    for j in range(len(form)-1, 3, -1):
        if form[:j].lower() in wik_norm_map:
            return wik_norm_map[form[:j].lower()], "prefix"
    
    wik_title, oran = fuzzy_kati(form_norm, esik=0.92)
    if wik_title:
        return wik_title, f"fuzzy_{oran:.2f}"
    
    return None, None

ts = datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
shutil.copy(str(LEX), str(LEX) + f".bak-ipa-v4-{ts}")
print(f"Backup: *.bak-ipa-v4-{ts}\n")

guncellenen = 0
kaynak_sayaci = {}
ornekler = []

for l in lex:
    form = (l.get("form") or "").strip()
    if not form:
        continue
    
    wik_title, kaynak = find_ipa(form)
    if wik_title and wik_title in wik:
        ipa = wik[wik_title].get("ipa")
        if ipa:
            yeni_ipa = f"/{ipa}/"
            if l.get("ipa") != yeni_ipa:
                l["ipa"] = yeni_ipa
                guncellenen += 1
                kaynak_sayaci[kaynak] = kaynak_sayaci.get(kaynak, 0) + 1
                if len(ornekler) < 25:
                    ornekler.append((form, wik_title, yeni_ipa, kaynak))

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

dolu = sum(1 for l in lex if l.get("ipa"))
print("=== V4 TEMIZ IPA DOLDURMA SONUCU ===")
print(f"Guncellenen:  {guncellenen}")
print(f"IPA dolu:     {dolu} (%{100*dolu/len(lex):.1f})")
print("\n=== KAYNAK DAGILIMI ===")
for k, n in sorted(kaynak_sayaci.items(), key=lambda x: -x[1]):
    print(f"  {k:20}: {n}")

print("\n=== ORNEKLER ===")
for form, wik_title, ipa, kaynak in ornekler:
    print(f"  {form:20} -> {ipa:25} [{kaynak}]")