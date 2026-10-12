import json
from pathlib import Path
from collections import Counter

LEX_PATH = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX_PATH.read_text(encoding="utf-8"))

# Mükerrer kayıtları bul
form_dagilim = Counter(l.get("form") or "?" for l in lex)
mukerrer = {f: s for f, s in form_dagilim.items() if s > 1}

print(f"=== MÜKERRER KAYITLAR: {len(mukerrer)} farklı form ===\n")

# Her mükerrer form için tüm kayıtları göster
for form, sayi in sorted(mukerrer.items(), key=lambda x: -x[1])[:20]:
    kayitlar = [l for l in lex if l.get("form") == form]
    print(f"\n--- {form} ({sayi} kez) ---")
    for i, l in enumerate(kayitlar, 1):
        kid = l.get("id") or "?"
        pos = l.get("partOfSpeech") or "—"
        anlam = (l.get("literalMeaning") or "—")[:50]
        cid = l.get("conceptId") or "—"
        print(f"  {i}. id={kid:15s} pos={pos:10s} concept={cid:10s} → {anlam}")
