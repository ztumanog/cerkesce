import json
from pathlib import Path

# 1. Sayıları yükle (39 sayı)
sayilar = [
  {"form": "зы", "ipa": "/zə/", "literalMeaning": "bir", "conceptId": "ONE"},
  {"form": "тIу", "ipa": "/t'əw/", "literalMeaning": "iki", "conceptId": "TWO"},
  {"form": "щы", "ipa": "/ɕə/", "literalMeaning": "üç", "conceptId": "THREE"},
  {"form": "плIы", "ipa": "/pɬ'ə/", "literalMeaning": "dört", "conceptId": "FOUR"},
  {"form": "тху", "ipa": "/txʷə/", "literalMeaning": "beş", "conceptId": "FIVE"},
  {"form": "хы", "ipa": "/xə/", "literalMeaning": "altı", "conceptId": "SIX"},
  {"form": "блы", "ipa": "/bɮə/", "literalMeaning": "yedi", "conceptId": "SEVEN"},
  {"form": "и", "ipa": "/jə/", "literalMeaning": "sekiz", "conceptId": "EIGHT"},
  {"form": "бгъу", "ipa": "/bʁʷə/", "literalMeaning": "dokuz", "conceptId": "NINE"},
  {"form": "пщIы", "ipa": "/pɕ'ə/", "literalMeaning": "on", "conceptId": "TEN"},
  {"form": "пщыкIуз", "ipa": "/pɕ'ək'wəz/", "literalMeaning": "on bir", "conceptId": "ELEVEN"},
  {"form": "пщыкIутI", "ipa": "/pɕ'ək'wət'/", "literalMeaning": "on iki", "conceptId": "TWELVE"},
  {"form": "пщыкIущ", "ipa": "/pɕ'ək'wəɕ/", "literalMeaning": "on üç", "conceptId": "THIRTEEN"},
  {"form": "пщыкIуплI", "ipa": "/pɕ'ək'wəpɬ'/", "literalMeaning": "on dört", "conceptId": "FOURTEEN"},
  {"form": "пщыкIутху", "ipa": "/pɕ'ək'wətxʷ/", "literalMeaning": "on beş", "conceptId": "FIFTEEN"},
  {"form": "пщыкIух", "ipa": "/pɕ'ək'wəx/", "literalMeaning": "on altı", "conceptId": "SIXTEEN"},
  {"form": "пщыкIубл", "ipa": "/pɕ'ək'wəbɮ/", "literalMeaning": "on yedi", "conceptId": "SEVENTEEN"},
  {"form": "пщыкIуий", "ipa": "/pɕ'ək'wəj/", "literalMeaning": "on sekiz", "conceptId": "EIGHTEEN"},
  {"form": "пщыкIубгъу", "ipa": "/pɕ'ək'wəbʁʷ/", "literalMeaning": "on dokuz", "conceptId": "NINETEEN"},
  {"form": "тIощI", "ipa": "/t'awɕ'/", "literalMeaning": "yirmi", "conceptId": "TWENTY"},
  {"form": "щэщI", "ipa": "/ɕaɕ'/", "literalMeaning": "otuz", "conceptId": "THIRTY"},
  {"form": "плIыщI", "ipa": "/pɬ'əɕ'/", "literalMeaning": "kırk", "conceptId": "FORTY"},
  {"form": "тхущI", "ipa": "/txʷəɕ'/", "literalMeaning": "elli", "conceptId": "FIFTY"},
  {"form": "хыщI", "ipa": "/xəɕ'/", "literalMeaning": "altmış", "conceptId": "SIXTY"},
  {"form": "блыщI", "ipa": "/bɮəɕ'/", "literalMeaning": "yetmiş", "conceptId": "SEVENTY"},
  {"form": "ищI", "ipa": "/jəɕ'/", "literalMeaning": "seksen", "conceptId": "EIGHTY"},
  {"form": "бгъущI", "ipa": "/bʁʷəɕ'/", "literalMeaning": "doksan", "conceptId": "NINETY"},
  {"form": "щэ", "ipa": "/ɕa/", "literalMeaning": "yüz", "conceptId": "ONE_HUNDRED"}
]

# 2. Lexemes yükle
lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
print(f"Toplam: {len(lex)}")

# 3. Form map
lex_forms = {l.get("form", ""): l for l in lex if l.get("form")}

# 4. Uygula
guncellenen_cid = 0
yeni_eklenen = 0

for s in sayilar:
    form = s["form"]
    if form in lex_forms:
        # Güncelle
        l = lex_forms[form]
        if not l.get("conceptId"):
            l["conceptId"] = s["conceptId"]
            guncellenen_cid += 1
        if not l.get("ipa") and s.get("ipa"):
            l["ipa"] = s["ipa"]
    else:
        # Yeni ekle
        lex.append({
            "id": f"L-NUM-{s['conceptId']}",
            "form": form,
            "ipa": s.get("ipa"),
            "literalMeaning": s["literalMeaning"],
            "conceptId": s["conceptId"],
            "partOfSpeech": "numeral",
            "rootIds": ["R-NUM"],
            "wordFamilyId": "WF-NUM",
            "notes": "Sayı (Numeral)"
        })
        yeni_eklenen += 1

print(f"\nGüncellenen conceptId: {guncellenen_cid}")
print(f"Yeni eklenen: {yeni_eklenen}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"✅ Toplam: {len(lex)}")
