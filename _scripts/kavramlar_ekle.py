import json
from pathlib import Path

kavramlar = [
    {"kabardeyce": "гуфIэ", "turkce": "Sevinç / Neşe", "conceptId": "JOY"},
    {"kabardeyce": "гужьей", "turkce": "Panik / Telaş", "conceptId": "PANIC"},
    {"kabardeyce": "гумыгъуэ", "turkce": "Şefkat", "conceptId": "COMPASSION"},
    {"kabardeyce": "губзыгъэ", "turkce": "Akıl / Zeka", "conceptId": "INTELLIGENCE"},
    {"kabardeyce": "губжь", "turkce": "Öfke / Kızgınlık", "conceptId": "ANGER"},
    {"kabardeyce": "гугъэ", "turkce": "Umut", "conceptId": "HOPE"},
    {"kabardeyce": "гуэтыныгъэ", "turkce": "Sadakat / Bağlılık", "conceptId": "LOYALTY"},
    {"kabardeyce": "гуиих", "turkce": "Korku / Dehşet", "conceptId": "FEAR"},
    {"kabardeyce": "напIцI", "turkce": "Yalan", "conceptId": "LIE"},
    {"kabardeyce": "нафI", "turkce": "İyilik", "conceptId": "GOODNESS"},
    {"kabardeyce": "щхьэусыгъуэ", "turkce": "Gerekçe / Mazeret", "conceptId": "REASON"},
    {"kabardeyce": "цIыхугъэ", "turkce": "İnsanlık / Hümanizm", "conceptId": "HUMANITY"},
    {"kabardeyce": "хабзэ", "turkce": "Gelenek / Edep / Töre", "conceptId": "TRADITION"},
    {"kabardeyce": "намыс", "turkce": "Onur / Gurur / Saygı", "conceptId": "HONOR"},
    {"kabardeyce": "пэж", "turkce": "Gerçek / Doğruluk", "conceptId": "TRUTH"},
    {"kabardeyce": "пцIы", "turkce": "Yalan / Sahtelik", "conceptId": "LIE"},
    {"kabardeyce": "захуагъэ", "turkce": "Adalet", "conceptId": "JUSTICE"},
    {"kabardeyce": "лъагъуныгъэ", "turkce": "Sevgi / Aşk", "conceptId": "LOVE"},
    {"kabardeyce": "шыIэныгъэ", "turkce": "Sabır", "conceptId": "PATIENCE"},
    {"kabardeyce": "лIыгъэ", "turkce": "Cesaret / Yiğitlik", "conceptId": "COURAGE"},
    {"kabardeyce": "фIыгъэ", "turkce": "İyilik / Hayır", "conceptId": "GOODNESS"},
    {"kabardeyce": "бзадджагъэ", "turkce": "Kötülük", "conceptId": "EVIL"},
    {"kabardeyce": "шэч", "turkce": "Şüphe", "conceptId": "DOUBT"},
    {"kabardeyce": "ажал", "turkce": "Ecel / Ölüm vakti", "conceptId": "DEATH"},
    {"kabardeyce": "насып", "turkce": "Şans / Mutluluk", "conceptId": "LUCK"},
    {"kabardeyce": "гугъуехь", "turkce": "Çile / Zorluk", "conceptId": "SUFFERING"},
    {"kabardeyce": "мамырыгъэ", "turkce": "Barış / Huzur", "conceptId": "PEACE"},
    {"kabardeyce": "хуитыныгъэ", "turkce": "Özgürlük", "conceptId": "FREEDOM"},
    {"kabardeyce": "ныбжьэгъугъэ", "turkce": "Dostluk / Arkadaşlık", "conceptId": "FRIENDSHIP"}
]

def temizle(s):
    return s.replace("I", "І").replace("1", "Ӏ").strip()

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
lex_forms = {l.get("form", ""): l for l in lex if l.get("form")}
print(f"Lexemes: {len(lex)}")

guncellenen = 0
yeni_eklenen = 0

for k in kavramlar:
    form = temizle(k["kabardeyce"])
    if form in lex_forms:
        l = lex_forms[form]
        if not l.get("conceptId"):
            l["conceptId"] = k["conceptId"]
            guncellenen += 1
        if not l.get("literalMeaning"):
            l["literalMeaning"] = k["turkce"]
    else:
        lex.append({
            "id": f"L-CONCEPT-{yeni_eklenen:03d}",
            "form": form,
            "literalMeaning": k["turkce"],
            "conceptId": k["conceptId"],
            "partOfSpeech": "noun",
            "rootIds": ["R-CONCEPT"],
            "wordFamilyId": "WF-CONCEPT",
            "notes": "Soyut kavram (Abstract concept)"
        })
        yeni_eklenen += 1

print(f"Güncellenen: {guncellenen}")
print(f"Yeni eklenen: {yeni_eklenen}")
print(f"✅ Toplam: {len(lex)}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
