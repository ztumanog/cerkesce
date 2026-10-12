import json
import re
from pathlib import Path
from collections import defaultdict

LEX_PATH = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX_PATH.read_text(encoding="utf-8"))

# ===== 1. isLemma + Çerkesçe ayırma =====
CERKESCE = r'[ӏӀ]'

for l in lex:
    anlam = l.get("literalMeaning") or ""
    
    # Çerkesçe anlamı ayır
    if anlam and re.search(CERKESCE, anlam):
        l["literalMeaningAdy"] = anlam
        l["literalMeaning"] = ""
    
    # isLemma belirle (conceptId'ye DOKUNMA)
    if l.get("literalMeaning") or l.get("literalMeaningAdy"):
        l["isLemma"] = True
    else:
        l["isLemma"] = False

# ===== 2. Çok dilli translations =====
form_gruplari = defaultdict(list)
for l in lex:
    if l.get("isLemma") == True:
        form = l.get("form") or "?"
        form_gruplari[form].append(l)

for form, kayitlar in form_gruplari.items():
    def puan(l):
        return sum(1 for v in l.values() if v)
    
    temel = max(kayitlar, key=puan)
    
    translations = {}
    for l in kayitlar:
        de = l.get("dictionaryEvidence") or {}
        meanings = de.get("meanings") or {}
        for dil, anlam in meanings.items():
            if anlam and dil not in translations:
                translations[dil] = anlam
    
    for l in kayitlar:
        anlam = l.get("literalMeaning") or ""
        if anlam:
            if any(c in anlam for c in "ӏӀ"):
                translations.setdefault("ady", anlam)
            elif any(c in anlam for c in "аеёиоуыэюяАЕЁИОУЫЭЮЯ"):
                translations.setdefault("ru", anlam)
            else:
                translations.setdefault("tr", anlam)
    
    if translations:
        temel["translations"] = translations

# Kaydet
LEX_PATH.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

# Rapor
concept = sum(1 for l in lex if l.get("conceptId"))
lemma = sum(1 for l in lex if l.get("isLemma"))
trans = sum(1 for l in lex if l.get("translations"))

print(f"=== TEMİZLİK RAPORU ===")
print(f"Toplam: {len(lex)}")
print(f"ConceptId: {concept} ✅")
print(f"Lemma: {lemma}")
print(f"Translations: {trans}")

# Örnek
print("\n=== ÖRNEK ===")
for l in lex[:5]:
    if l.get("isLemma"):
        print(f"  {l.get('form'):15s} | concept={l.get('conceptId') or '—':12s} | tr={l.get('translations', {}).get('tr', '—')}")
