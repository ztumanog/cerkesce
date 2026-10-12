import json
from pathlib import Path
from collections import defaultdict

LEX_PATH = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX_PATH.read_text(encoding="utf-8"))

form_gruplari = defaultdict(list)
for l in lex:
    if l.get("isLemma") == True:
        form = l.get("form") or "?"
        form_gruplari[form].append(l)

yeni_lex = []
islenen = set()

for form, kayitlar in form_gruplari.items():
    if form in islenen:
        continue
    islenen.add(form)
    
    def puan(l):
        return sum(1 for v in l.values() if v)
    
    temel = max(kayitlar, key=puan)
    
    # Çok dilli translations
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
    
    yeni_kayit = dict(temel)
    yeni_kayit["translations"] = translations
    yeni_kayit["sources"] = list(set(
        s for l in kayitlar 
        for s in (l.get("dictionaryEvidence", {}).get("sources") or [])
    ))
    
    yeni_lex.append(yeni_kayit)

for l in lex:
    if l.get("isLemma") != True:
        yeni_lex.append(l)

LEX_PATH.write_text(json.dumps(yeni_lex, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"=== ÇOK DİLLİ YAPI RAPORU ===")
print(f"Önce: {len(lex)} kayıt")
print(f"Sonra: {len(yeni_lex)} kayıt")
print(f"Çok dilli translations: {sum(1 for l in yeni_lex if l.get('translations'))}")

print("\n=== ÖRNEK ===")
for l in yeni_lex[:10]:
    if l.get("isLemma") and l.get("translations"):
        print(f"  {l.get('form'):15s} → {l.get('translations')}")
