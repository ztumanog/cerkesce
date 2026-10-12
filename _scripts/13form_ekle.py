import json
import unicodedata
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

# ============================================================
# NORMALİZASYON — Palochka + Latin/Kiril
# ============================================================
def normalize(text):
    if not text:
        return ""
    # Palochka varyantları
    t = text.replace("I", "Ӏ").replace("l", "Ӏ").replace("1", "Ӏ").replace("'", "Ӏ")
    # Latin-Kiril karışıklığı (sadece Çerkesçe'de görülenler)
    char_map = {'a':'а', 'e':'е', 'o':'о', 'p':'р', 'c':'с', 'x':'х', 'y':'у'}
    for lat, cyr in char_map.items():
        t = t.replace(lat, cyr)
    return t.strip()

# Mevcut formları normalize edilmiş olarak haritala
mevcut = {}
for l in lex:
    form = l.get("form", "")
    if form:
        mevcut[normalize(form)] = l

# ============================================================
# 13 BULUNAMAYAN FORM — TAM VERİ
# ============================================================
YENI_FORMLAR = {
    "бгъэщӀэращӀэ": {
        "form": "бгъэщӀэращӀэ",
        "literalMeaning": "doğan, şahin türü",
        "partOfSpeech": "noun",
        "isLemma": True,
        "conceptId": "ANIMAL",
        "subConceptId": "FALCON",
        "rootForm": "бгъэ",
        "taxonomyFamily": "FALCONIDAE",
        "translations": {"tr": "doğan, şahin türü"},
        "notes": "Morfolojik pasaport ile eklendi."
    },
    "бзыуцӀыкӀу": {
        "form": "бзыуцӀыкӀу",
        "literalMeaning": "serçe, küçük kuş",
        "partOfSpeech": "noun",
        "isLemma": True,
        "conceptId": "ANIMAL",
        "subConceptId": "SMALL_BIRD",
        "rootForm": "бзыу",
        "taxonomyFamily": "PASSERIFORMES",
        "translations": {"tr": "serçe, küçük kuş"},
        "notes": "Morfolojik pasaport ile eklendi."
    },
    "блэнэпцӀ": {
        "form": "блэнэпцӀ",
        "literalMeaning": "kör yılan, oluklu kertenkele",
        "partOfSpeech": "noun",
        "isLemma": True,
        "conceptId": "ANIMAL",
        "subConceptId": "SLOW_WORM",
        "rootForm": "блэ",
        "taxonomyFamily": "ANGUIDAE",
        "translations": {"tr": "kör yılan, oluklu kertenkele"},
        "notes": "Morfolojik pasaport ile eklendi."
    },
    "мыхъумыбз": {
        "form": "мыхъумыбз",
        "literalMeaning": "erselik, çift cinsiyetli",
        "partOfSpeech": "noun",
        "isLemma": True,
        "conceptId": "ANIMAL",
        "subConceptId": "HERMAPHRODITE",
        "rootForm": "хъу",
        "taxonomyFamily": "QUALIFIER",
        "translations": {"tr": "erselik, çift cinsiyetli"},
        "notes": "Morfolojik pasaport ile eklendi. хъу (erkek) + мы (değil) + бз (dişi)"
    },
    "тхьэкӀумэхуэ": {
        "form": "тхьэкӀумэхуэ",
        "literalMeaning": "tavşan",
        "partOfSpeech": "noun",
        "isLemma": True,
        "conceptId": "ANIMAL",
        "subConceptId": "HARE",
        "rootForm": "тхьэкӀумэ",
        "taxonomyFamily": "LEPORIDAE",
        "translations": {"tr": "tavşan"},
        "notes": "Morfolojik pasaport ile eklendi."
    },
    "тӀы": {
        "form": "тӀы",
        "literalMeaning": "koç",
        "partOfSpeech": "noun",
        "isLemma": True,
        "conceptId": "ANIMAL",
        "subConceptId": "RAM",
        "rootForm": "тӀы",
        "taxonomyFamily": "BOVIDAE",
        "translations": {"tr": "koç"},
        "notes": "Morfolojik pasaport ile eklendi."
    },
    "хакӀуэ": {
        "form": "хакӀуэ",
        "literalMeaning": "aygır",
        "partOfSpeech": "noun",
        "isLemma": True,
        "conceptId": "ANIMAL",
        "subConceptId": "STALLION",
        "rootForm": "хакӀуэ",
        "taxonomyFamily": "EQUIDAE",
        "translations": {"tr": "aygır"},
        "notes": "Morfolojik pasaport ile eklendi."
    },
    "хыкъуэ": {
        "form": "хыкъуэ",
        "literalMeaning": "yunus",
        "partOfSpeech": "noun",
        "isLemma": True,
        "conceptId": "ANIMAL",
        "subConceptId": "DOLPHIN",
        "rootForm": "кхъуэ",
        "taxonomyFamily": "DELPHINIDAE",
        "translations": {"tr": "yunus"},
        "notes": "Morfolojik pasaport ile eklendi. Deniz domuzu."
    },
    "хьэндрабгъуэ": {
        "form": "хьэндрабгъуэ",
        "literalMeaning": "örümcek",
        "partOfSpeech": "noun",
        "isLemma": True,
        "conceptId": "ANIMAL",
        "subConceptId": "SPIDER",
        "rootForm": "хьэндрабгъуэ",
        "taxonomyFamily": "ARANEAE",
        "translations": {"tr": "örümcek"},
        "notes": "Morfolojik pasaport ile eklendi."
    },
    "хьэнтӀрабыщ": {
        "form": "хьэнтӀрабыщ",
        "literalMeaning": "karınca",
        "partOfSpeech": "noun",
        "isLemma": True,
        "conceptId": "ANIMAL",
        "subConceptId": "ANT",
        "rootForm": "хьэнтӀрабыщ",
        "taxonomyFamily": "FORMICIDAE",
        "translations": {"tr": "karınca"},
        "notes": "Morfolojik pasaport ile eklendi."
    },
    "хьэнэщӀыу": {
        "form": "хьэнэщӀыу",
        "literalMeaning": "kurbağa",
        "partOfSpeech": "noun",
        "isLemma": True,
        "conceptId": "ANIMAL",
        "subConceptId": "FROG",
        "rootForm": "хьэнэщӀыу",
        "taxonomyFamily": "RANIDAE",
        "translations": {"tr": "kurbağa"},
        "notes": "Morfolojik pasaport ile eklendi."
    },
    "чыцӀ": {
        "form": "чыцӀ",
        "literalMeaning": "oğlak",
        "partOfSpeech": "noun",
        "isLemma": True,
        "conceptId": "ANIMAL",
        "subConceptId": "KID",
        "rootForm": "чыцӀ",
        "taxonomyFamily": "BOVIDAE",
        "translations": {"tr": "oğlak"},
        "notes": "Morfolojik pasaport ile eklendi."
    },
    "шкӀэ": {
        "form": "шкӀэ",
        "literalMeaning": "buzağı",
        "partOfSpeech": "noun",
        "isLemma": True,
        "conceptId": "ANIMAL",
        "subConceptId": "CALF",
        "rootForm": "шкӀэ",
        "taxonomyFamily": "BOVIDAE",
        "translations": {"tr": "buzağı"},
        "notes": "Morfolojik pasaport ile eklendi."
    },
}

# ============================================================
# UYGULAMA
# ============================================================
eklenen = 0
guncellenen = 0
zaten_var = 0

for form, veri in YENI_FORMLAR.items():
    norm = normalize(form)
    if norm in mevcut:
        # Zaten var → güncelle
        l = mevcut[norm]
        for k, v in veri.items():
            l[k] = v
        guncellenen += 1
    else:
        # Yok → yeni kayıt ekle
        # ID üret
        kayit = veri.copy()
        kayit["id"] = f"L-MORPHO-{form[:10].upper()}"
        lex.append(kayit)
        eklenen += 1

# Kaydet
LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

# Rapor
with open("_scripts/13form_rapor.txt", "w", encoding="utf-8") as f:
    f.write("=" * 70 + "\n")
    f.write("13 FORM EKLEME RAPORU\n")
    f.write("=" * 70 + "\n\n")
    f.write(f"Yeni eklenen:  {eklenen}\n")
    f.write(f"Güncellenen:   {guncellenen}\n")
    f.write(f"Zaten vardı:   {zaten_var}\n")
    f.write(f"Toplam:        {eklenen + guncellenen}\n\n")
    
    # Doğrulama
    animal = [l for l in lex if l.get("conceptId") == "ANIMAL"]
    f.write(f"Şimdi ANIMAL: {len(animal)} kayıt\n\n")
    
    f.write("TÜM HAYVANLAR:\n")
    f.write("-" * 70 + "\n")
    for l in sorted(animal, key=lambda x: (x.get("taxonomyFamily",""), x.get("form",""))):
        form2 = l.get("form", "?")
        sub = l.get("subConceptId", "-")
        fam = l.get("taxonomyFamily", "-")
        root = l.get("rootForm", "-")
        f.write(f"  {form2:22} | {sub:20} | {fam:15} | kök: {root}\n")

print(f"OK - {eklenen} yeni, {guncellenen} guncel")
