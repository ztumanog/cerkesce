import json
from pathlib import Path

LEX_PATH = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX_PATH.read_text(encoding="utf-8"))

# Hatalı anlam/kavram düzeltmeleri
ANLAM_DUZELTME = {
    "L-DYGHUZHY": {"literalMeaning": "kurt", "conceptId": "WOLF"},
    "L-GUKHELHE": {"literalMeaning": "niyet, amaç", "conceptId": "INTENTION"},
    "L-BZEBZA": {"literalMeaning": "geveze, tatlı dilli", "conceptId": "TALKATIVE"},
    "L-PROMPT-00000": {"partOfSpeech": "noun"},
}

duzeltme = 0
for l in lex:
    kid = l.get("id")
    if kid in ANLAM_DUZELTME:
        for alan, deger in ANLAM_DUZELTME[kid].items():
            if l.get(alan) != deger:
                eski = l.get(alan)
                l[alan] = deger
                duzeltme += 1
                print(f"  ✅ {kid}: {alan} → {deger} (eski: {eski})")

# Kaydet
LEX_PATH.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\n✅ {duzeltme} anlam/kavram düzeltmesi yapıldı.")
