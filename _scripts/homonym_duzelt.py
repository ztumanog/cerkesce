import json
from pathlib import Path

LEX_PATH = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX_PATH.read_text(encoding="utf-8"))

# Homonym düzeltmeleri
HOMONYM_DUZELTME = {
    "L-KHY": {"literalMeaning": "deniz", "conceptId": "SEA"},
    "L-KHY2": {"literalMeaning": "altı", "conceptId": "SIX"},
    "L-XY": {"literalMeaning": "altı", "conceptId": "SIX"},
    "L-KUE": {"literalMeaning": "vadi, dere", "conceptId": "VALLEY"},
    "L-QUE": {"literalMeaning": "oğul", "conceptId": "SON"},
}

duzeltme = 0
for l in lex:
    kid = l.get("id")
    if kid in HOMONYM_DUZELTME:
        for alan, deger in HOMONYM_DUZELTME[kid].items():
            if l.get(alan) != deger:
                l[alan] = deger
                duzeltme += 1
        print(f"  ✅ {kid}: {l.get('form')} → {l.get('literalMeaning')} ({l.get('conceptId')})")

# Kaydet
LEX_PATH.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\n✅ {duzeltme} homonym düzeltmesi yapıldı.")
