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

# Mükerrer lemma'ları bul
mukerrer = {f: k for f, k in form_gruplari.items() if len(k) > 1}
print(f"=== MÜKERRER LEMMA: {len(mukerrer)} form ===\n")

# İlk 10 mükerrer lemma'yı göster
for form, kayitlar in list(mukerrer.items())[:10]:
    print(f"--- {form} ({len(kayitlar)} kayıt) ---")
    for l in kayitlar:
        kid = l.get("id") or "?"
        ipa = l.get("ipa") or "—"
        anlam = l.get("literalMeaning") or l.get("literalMeaningAdy") or "—"
        print(f"  id={kid:20s} ipa={ipa:15s} anlam={anlam[:40]}")
    print()
