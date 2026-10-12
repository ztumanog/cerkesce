import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# Akademik makaleden hayvanlar (KBD)
HAYVANLAR = {
    # === EVCİL (Унагъуэ псэущхьэхэр) ===
    "гуу": ("BULL", "R-GUU"),
    "жэм": ("COW", "R-ZHAM"),
    "шкӀэ": ("CALF", "R-SHKHE"),
    "шкӀэхъу": ("MALE_CALF", "R-SHKHE"),
    "шкӀэбз": ("FEMALE_CALF", "R-SHKHE"),
    "хьэ": ("DOG", "R-HAE"),
    "хьэхъу": ("MALE_DOG", "R-HAE"),
    "хьэбз": ("FEMALE_DOG", "R-HAE"),
    "мэл": ("SHEEP", "R-MEL"),
    "мэлыбз": ("EWE", "R-MEL"),
    "тӀы": ("RAM", "R-TY"),
    "бжэн": ("GOAT", "R-BZHEN"),
    "ажэ": ("HE_GOAT", "R-AZHA"),
    "шы": ("HORSE", "R-SHY"),
    "хакӀуэ": ("STALLION", "R-KHAKWE"),
    "шыбз": ("MARE", "R-SHY"),
    "джэд": ("CHICKEN", "R-DZHED"),
    "адакъэ": ("ROOSTER", "R-ADAQE"),
    "къаз": ("GOOSE", "R-QAZ"),
    "бэбыш": ("DUCK", "R-BEBYSH"),
    # === VAHŞİ (ХьэкӀэхъуэкӀэхэр) ===
    "бажэ": ("FOX", "R-BAZHE"),
    "мышэ": ("BEAR", "R-MYSHE"),
    "ужьэ": ("WEASEL", "R-UZHE"),
    "дыгъужь": ("WOLF", "R-DYGHUZH"),
    "щыхь": ("DEER", "R-SCHYKH"),
    "бланэ": ("ELK", "R-BLANE"),
    # === KUŞLAR (Къуалэбзухэр) ===
    "бзу": ("BIRD", "R-BZU"),
    "къуалэбзу": ("WILD_BIRD", "R-BZU"),
    "бгъэ": ("EAGLE", "R-BGHA"),
    "къашыргъэ": ("HAWK", "R-QASHYRGHA"),
    "жьынду": ("OWL", "R-ZHYNDU"),
    "тхьэрыкъуэ": ("DOVE", "R-THARYQWE"),
    # === BALIKLAR (ПцӀыхухэр) ===
    "бдзэжьей": ("FISH", "R-BDZAZHEI"),
    "бдзэ": ("STURGEON", "R-BDZA"),
}

guncellenen = 0
for l in lex:
    form = l.get("form", "")
    if form in HAYVANLAR:
        concept, root = HAYVANLAR[form]
        degisti = False
        if not l.get("conceptId"):
            l["conceptId"] = concept
            degisti = True
        if not l.get("rootIds"):
            l["rootIds"] = [root]
            degisti = True
        if degisti:
            guncellenen += 1

print(f"Guncellenen: {guncellenen}")
print(f"conceptId dolu: {sum(1 for l in lex if l.get('conceptId'))}")
print(f"rootIds dolu: {sum(1 for l in lex if l.get('rootIds'))}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("OK Kaydedildi")
