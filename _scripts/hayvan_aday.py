import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
animal = [l for l in lex if l.get("conceptId") == "ANIMAL"]

HAYVAN = ["петух","курица","лошадь","конь","корова","бык","овца","коза","козел",
          "собака","кошка","птица","рыба","волк","лиса","медведь","заяц",
          "мышь","змея","лев","тигр","олень","слон","обезьяна","орел",
          "сокол","сова","голубь","воробей","ворона","сорока","лось",
          "баран","ягненок","свинья","осел","верблюд","черепаха","лягушка",
          "horoz","tavuk","at","inek","boğa","koyun","keçi","teke","köpek",
          "kedi","kuş","balık","kurt","tilki","ayı","tavşan","fare","yılan",
          "aslan","kaplan","geyik","fil","maymun","kartal","şahin","baykuş",
          "güvercin","serçe","karga","saksağan","sığın","koç","kuzu","oğlak",
          "domuz","eşek","deve","kaplumbağa","kurbağa","somon","salmon","lосось"]

bulunan = []
for l in animal:
    anlam = (l.get("literalMeaning") or "").lower()
    tr = l.get("translations") or {}
    tr_str = ""
    if isinstance(tr, dict):
        tr_str = " ".join(str(v) for v in tr.values()).lower()
    tum = anlam + " " + tr_str
    for h in HAYVAN:
        if h.lower() in tum:
            bulunan.append(l)
            break

# UTF-8 dosyaya yaz
with open("_scripts/hayvan_adaylari.txt", "w", encoding="utf-8") as f:
    f.write(f"# Muhtemel Hayvan Adayları — {len(bulunan)} kayıt\n")
    f.write(f"# ANIMAL'daki toplam: {len(animal)}\n")
    f.write(f"# KURAL: Hayvan olan [x], olmayan [ ]\n")
    f.write(f"# {'=' * 70}\n\n")
    for i, l in enumerate(bulunan, 1):
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?")[:50]
        kid = l.get("id", "?")
        f.write(f"[{i:3}] [x] {form:25} | {anlam:50} | {kid}\n")

print(f"OK: {len(bulunan)} aday yazildi")
