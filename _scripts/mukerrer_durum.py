import json
from pathlib import Path
from collections import defaultdict

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# Lemma'ları forma göre grupla
form_gruplari = defaultdict(list)
for l in lex:
    if l.get("isLemma") == True:
        form = l.get("form") or "?"
        form_gruplari[form].append(l)

# Mükerrer lemma'ları bul
mukerrer = {f: k for f, k in form_gruplari.items() if len(k) > 1}

print(f"=== MÜKERRER LEMMA DURUMU ===")
print(f"Toplam lemma: {sum(len(k) for k in form_gruplari.values())}")
print(f"Farklı form: {len(form_gruplari)}")
print(f"Mükerrer form: {len(mukerrer)}")
print(f"Toplam mükerrer kayıt: {sum(len(k)-1 for k in mukerrer.values())}")
print(f"\nİlk 10 mükerrer form:")
for form, kayitlar in list(mukerrer.items())[:10]:
    print(f"  {form:20s} → {len(kayitlar)} kayıt")
