import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

ANLAMLAR = {
    "зыгъэпсын": "kendini hazırlamak, yıkanmak",
    "зыщытӀэгъэжын": "tekrar giyinmek",
    "гъэкӀэнтӀэн": "eğmek, büktürmek (ettirgen)",
    "гъэлъэпӀэстхъэн": "ufalamak, paramparça etmek (ettirgen)",
    "дэгъэкӀуэсыкӀын": "içeriden söndürüp çıkarmak (ettirgen)",
    "зэрегъэшэн": "birbiriyle evlendirmek (ettirgen)",
    "зэбгъурышэн": "yan yana getirmek, yaklaştırmak",
    "къыдежьэн": "birlikte yola çıkmak",
    "кӀуэцӀыгъэлъэдэн": "içeriye koşturmak (ettirgen)",
    "кӀэрыубэн": "dayayarak sıkıştırmak, tıkamak",
    "щӀэшхыкӀын": "altından yiyerek bitirmek",
    "къызэщӀэукъубиен": "kabarmak, taşmak (deniz/dalga)",
    "жьэхэгъэзэрыхьын": "yüz yüze karıştırmak (ettirgen)",
    "щэнэуэн": "sallanmak, salınmak",
    "щӀакӀуэ-бащлыкъ": "Çerkes pelerini ve başlık",
    "страпил": "çatı merteği (Rusça alıntı)",
    "уэкъулэ": "yardım isteme, ricacı olma",
    "щэхурыпхъуагъэ": "sinsilik, kurnazlık",
    "Ӏурыхьэгъуэ": "buluşma zamanı, karşılaşma imkânı",
    "батыргъэнпэж": "sert tavşancıl otu (bitki)",
}

guncellenen = 0
for l in lex:
    form = l.get("form", "")
    if form in ANLAMLAR:
        eski = l.get("literalMeaning", "")
        if not eski or eski in ["Manuel ekleme", ""]:
            l["literalMeaning"] = ANLAMLAR[form]
            guncellenen += 1
        else:
            # Zaten anlam varsa, yanına ekle
            if ANLAMLAR[form] not in eski:
                l["literalMeaning"] = f"{eski} / {ANLAMLAR[form]}"
                guncellenen += 1

print(f"Güncellenen: {guncellenen}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("OK Kaydedildi")
