import json
from pathlib import Path

LEX_PATH = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX_PATH.read_text(encoding="utf-8"))

# Manuel düzeltme tablosu (senin verdiğin)
DUZELTME = {
    # Yanlış çeviriler
    "щхьэгу": "başın tepesi, zirve",
    "лъэгу": "ayak tabanı",
    "нэбжьыц": "kirpik",
    "набдзэ": "kaş",
    "псынэ": "pınar, çeşme, su kaynağı",
    "псыкъуий": "çağlayan, şelale",
    # Etimolojik → Günlük
    "гущӀэ": "sine, bağır, merhamet",
    "Ӏэгу": "avuç içi",
    "щхьэхуитыныгъэ": "özgürlük, hürriyet",
    "псынщӀэ": "hızlı, çabuk, hafif",
    "щӀыдагъэ": "petrol",
    "псыунэ": "tuvalet, banyo",
    "псэлъыхъу": "dünür, damat adayı",
    "псэху": "huzurlu, rahat",
    "нэпцӀ": "sahte, yanılsama",
    "Псыжь": "Kuban Nehri",
}

duzeltme = 0
for l in lex:
    form = l.get("form")
    if form in DUZELTME:
        eski = l.get("literalMeaning")
        l["literalMeaning"] = DUZELTME[form]
        duzeltme += 1
        print(f"  {form:20s} → {DUZELTME[form]}")

# Kaydet
LEX_PATH.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"\n✅ {duzeltme} kayıt düzeltildi.")
