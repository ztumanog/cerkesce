import json
from pathlib import Path
from collections import defaultdict

LEX_PATH = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX_PATH.read_text(encoding="utf-8"))

# Lemma'ları forma göre grupla
form_gruplari = defaultdict(list)
for l in lex:
    if l.get("isLemma") == True:
        form = l.get("form") or "?"
        form_gruplari[form].append(l)

def birlestir(kayitlar):
    """Aynı formdaki kayıtları birleştirir."""
    if len(kayitlar) == 1:
        return kayitlar[0]
    
    def puan(l):
        return sum(1 for v in l.values() if v)
    
    en_iyi = max(kayitlar, key=puan)
    
    for l in kayitlar:
        for key, val in l.items():
            if val and not en_iyi.get(key):
                en_iyi[key] = val
    
    return en_iyi

yeni_lex = []
islenen = set()
birlesen = 0

for l in lex:
    if l.get("isLemma") == True:
        form = l.get("form") or "?"
        if form in islenen:
            continue
        islenen.add(form)
        
        grup = form_gruplari[form]
        if len(grup) > 1:
            birlestirilmis = birlestir(grup)
            yeni_lex.append(birlestirilmis)
            birlesen += len(grup) - 1
        else:
            yeni_lex.append(grup[0])
    else:
        yeni_lex.append(l)

LEX_PATH.write_text(json.dumps(yeni_lex, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"=== BİRLEŞTİRME RAPORU ===")
print(f"Önce: {len(lex)} kayıt")
print(f"Sonra: {len(yeni_lex)} kayıt")
print(f"Birleşen: {birlesen} mükerrer")
