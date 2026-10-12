import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

pselh = [l for l in lex if l.get("form", "").startswith("псэлъ")]
pselh.sort(key=lambda x: x.get("form", ""))

print(f"псэлъ- TOPLAM: {len(pselh)}")
print()
print("CONCEPT DAGILIMI:")
for k, v in Counter(l.get("conceptId") or "(bos)" for l in pselh).most_common(10):
    print(f"  {k:<25} {v}")
print()

with open("_scripts/PSELH_MIMARA.txt", "w", encoding="utf-8") as f:
    f.write("=" * 100 + "\n")
    f.write(f"псэлъ- KÖKÜ SINIFLANDIRMA — {len(pselh)} kayıt\n")
    f.write("=" * 100 + "\n\n")
    f.write("## FORMAT\n")
    f.write("Her satır için: FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n\n")
    f.write("## KURALLAR\n")
    f.write("- **CONCEPT:** İngilizce büyük harf (SPEAK, SPEECH, TALK, LANGUAGE...)\n")
    f.write("- **SUB:** Spesifik alt kategori\n")
    f.write("- **AİLE:** Anlamsal grup (Dil & Konuşma, İletişim...)\n")
    f.write("- **ROOT:** псэлъ-\n\n")
    f.write("## ÖRNEK\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    f.write('псэлъэн,"konuşmak",SPEAK,SPEAK_ACTION,Dil & Konuşma,псэлъ-\n')
    f.write('псэлъэгъу,"muhatap",INTERLOCUTOR,INTERLOCUTOR_PERSON,Dil & Konuşma,псэлъ-\n\n')
    f.write("=" * 100 + "\n")
    f.write(f"## SINIFLANDIRILACAK KELİMELER ({len(pselh)} kayıt)\n")
    f.write("=" * 100 + "\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for l in pselh:
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?").replace(",", " ").replace('"', "'")[:50]
        f.write(f'{form},"{anlam}",?,?,?,псэлъ-\n')

print(f"OK - _scripts/PSELH_MIMARA.txt")
