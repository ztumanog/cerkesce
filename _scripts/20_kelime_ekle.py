import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

mevcut = {l.get("form") for l in lex}

yeni = [
    {"form": "зыгъэпсын", "literalMeaning": "yıkanmak, kendini temizlemek", "partOfSpeech": "verb", "conceptId": "WASH"},
    {"form": "зыщытӀэгъэжын", "literalMeaning": "üstünü tekrar giyinmek", "partOfSpeech": "verb", "conceptId": "DRESS"},
    {"form": "гъэкӀэнтӀэн", "literalMeaning": "eğmek, büktürmek", "partOfSpeech": "verb", "conceptId": "BEND"},
    {"form": "гъэлъэпӀэстхъэн", "literalMeaning": "ufalamak, paramparça etmek", "partOfSpeech": "verb", "conceptId": "CRUSH"},
    {"form": "дэгъэкӀуэсыкӀын", "literalMeaning": "içeriden söndürüp çıkarmak", "partOfSpeech": "verb", "conceptId": "EXTINGUISH"},
    {"form": "зэрегъэшэн", "literalMeaning": "birbiriyle evlendirmek", "partOfSpeech": "verb", "conceptId": "MARRY"},
    {"form": "зэбгъурышэн", "literalMeaning": "yan yana yürütmek", "partOfSpeech": "verb", "conceptId": "LEAD"},
    {"form": "къыдежьэн", "literalMeaning": "birlikte yola çıkmak", "partOfSpeech": "verb", "conceptId": "DEPART"},
    {"form": "кӀуэцӀыгъэлъэдэн", "literalMeaning": "içeriye koşturmak", "partOfSpeech": "verb", "conceptId": "RUN_IN"},
    {"form": "кӀэрыубэн", "literalMeaning": "dayayarak sıkıştırmak", "partOfSpeech": "verb", "conceptId": "PRESS"},
    {"form": "щӀэшхыкӀын", "literalMeaning": "altından yiyerek bitirmek", "partOfSpeech": "verb", "conceptId": "EAT_UNDER"},
    {"form": "къызэщӀэукъубиен", "literalMeaning": "kendi içine büzülmek", "partOfSpeech": "verb", "conceptId": "CURL"},
    {"form": "жьэхэгъэзэрыхьын", "literalMeaning": "yüz yüze karıştırmak", "partOfSpeech": "verb", "conceptId": "MIX"},
    {"form": "щэнэуэн", "literalMeaning": "pazarlık etmek", "partOfSpeech": "verb", "conceptId": "BARGAIN"},
    {"form": "щӀакӀуэ-бащлыкъ", "literalMeaning": "Çerkes pelerini ve başlık", "partOfSpeech": "noun", "conceptId": "CLOTHING"},
    {"form": "страпил", "literalMeaning": "çatı merteği", "partOfSpeech": "noun", "conceptId": "ROOF"},
    {"form": "уэкъулэ", "literalMeaning": "bir tür kap", "partOfSpeech": "noun", "conceptId": "CONTAINER"},
    {"form": "щэхурыпхъуагъэ", "literalMeaning": "gizlilik, sinsi davranma", "partOfSpeech": "noun", "conceptId": "SECRECY"},
    {"form": "Ӏурыхьэгъуэ", "literalMeaning": "buluşma zamanı", "partOfSpeech": "noun", "conceptId": "MEETING"},
    {"form": "батыргъэнпэж", "literalMeaning": "tavşancıl otu", "partOfSpeech": "noun", "conceptId": "PLANT"},
]

sayac = 0
for y in yeni:
    form = y["form"]
    if form in mevcut:
        continue
    kayit = {
        "id": f"L-EXTRA-{sayac:05d}",
        "form": form,
        "literalMeaning": y["literalMeaning"],
        "partOfSpeech": y["partOfSpeech"],
        "conceptId": y["conceptId"],
        "notes": "Manuel ekleme",
        "corpusFrequency": 0,
        "rootIds": [],
        "wordFamilyId": None,
        "derivation": None,
        "dialectVariants": {"adyghe": form, "kabardian": form}
    }
    lex.append(kayit)
    sayac += 1

print(f"Eklenen: {sayac}")
print(f"Toplam: {len(lex)}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("OK Kaydedildi")
