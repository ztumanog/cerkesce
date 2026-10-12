import json
import re
from pathlib import Path
from collections import Counter

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))
animal = [l for l in lex if l.get("conceptId") == "ANIMAL"]

# ============================================================
# BİLİNEN FORMLAR → DOĞRU KATEGORİ (elle hazırlanmış)
# ============================================================
DOGRU = {
    # Fiiller
    "лъэн": "ACTION", "щэхун": "ACTION", "щӀэжын": "ACTION",
    "зыхуэщӀын": "ACTION", "гъэпцӀын": "ACTION", "къэгъэщӀын": "ACTION",
    "гъэбзэщӀэн": "ACTION", "къэцыбырыбын": "ACTION",
    "хэгъэтын": "ACTION", "хуей": "ACTION", "етын": "ACTION",
    "гъэбэгъуэн": "ACTION", "бгъэдэлъын": "ACTION", "тет": "ACTION",
    "хэплъэныгъэ": "ABSTRACT",
    
    # Zaman
    "мазае": "TIME", "сыхьэт": "TIME", "илъэсищэ": "TIME",
    "дыгъэкъухьэпӀэ": "TIME", "аргуэру": "TIME", "иджыри": "TIME",
    
    # Yer / Konum / Yön (mimarın kuralı #3)
    "вагъуэщхьэ": "LOCATION", "гъуэлъыпӀэ": "LOCATION",
    "къухьэпӀэ": "LOCATION", "унэм": "LOCATION",
    "дагъыстан": "LOCATION", "пащхьэ": "LOCATION",
    "ужь": "LOCATION", "яужь": "LOCATION",
    "мысыр": "LOCATION",
    
    # Kişi / Meslek (mimarın kuralı #2)
    "уэрэдохуэ": "PERSON", "зиусхьэн": "PERSON", "нэбгырэ": "PERSON",
    "шу": "PERSON",
    
    # Zamir
    "абыхэм": "PRONOUN", "зыгуэр": "PRONOUN",
    "зыми": "PRONOUN", "адрей": "PRONOUN", "хэти": "PRONOUN",
    "мыхэр": "PRONOUN", "аращ": "PRONOUN", "апхуэдэ": "PRONOUN",
    "зэгуэрым": "PRONOUN",
    
    # Soru
    "сыту": "QUESTION", "дауэ": "QUESTION", "дэнэ": "QUESTION",
    "дэтхэнэ": "QUESTION",
    
    # Bağlaç/Edat
    "арати": "CONNECTIVE", "аращи": "CONNECTIVE", "арти": "CONNECTIVE",
    "нэхърэ": "PARTICLE", "дыдэ": "PARTICLE", "нэужь": "PARTICLE",
    "къэс": "PARTICLE", "нэс": "PARTICLE", "мис": "PARTICLE",
    "зэи": "ADVERB", "мыпхуэдэу": "ADVERB", "апхуэдизу": "ADVERB",
    
    # Miktar / Derece (mimarın kuralı #4)
    "псори": "QUANTIFIER", "хуэдиз": "QUANTIFIER",
    "нэхъыбэ": "QUANTIFIER", "ныкъуэ": "QUANTIFIER",
    
    # Yiyecek / Bitki
    "помидор": "FOOD", "кхъуейлъалъэ": "FOOD",
    "хьэжыгъэ": "FOOD", "кашэ": "FOOD",
    
    # Nesne
    "шэнджэс": "OBJECT", "афэ": "OBJECT", "уэздыгъэ": "OBJECT",
    "фарфор": "OBJECT", "щапхъэ": "OBJECT",
    
    # Vücut
    "жьафэ": "BODY",
    
    # Duygu
    "гущӀэгъу": "EMOTION",
    
    # Doğa
    "къуэлабэ": "NATURE", "псыхъуэжь": "NATURE", "шывей": "NATURE",
    "лъабжьэ": "NATURE",
    
    # Kültür / Mitoloji
    "ажэгъафэ": "CULTURE", "жин": "CULTURE",
    
    # Hukuk / Kurum
    "хьэкум": "LEGAL",
    
    # Dilbilim
    "псалъэуха": "LINGUISTICS",
    
    # Nitelik / Sıfat
    "тыныш": "QUALIFIER", "фошыгъуафэ": "QUALIFIER",
    "хуит": "QUALIFIER", "мыбыдэ": "QUALIFIER",
    "зыпэмыплъа": "QUALIFIER", "ещхь": "QUALIFIER",
    "хамэ": "QUALIFIER", "пэжыр": "QUALIFIER",
    "ищхьэ": "LOCATION",
}

# ============================================================
# KURAL 1 (Mimar): -гъэ eki → ABSTRACT
# İstisnalar: хьэжыгъэ (un) → FOOD zaten yukarıda
# ============================================================
def kural_ghe_abstract(form):
    if form.endswith("гъэ") and form not in ("хьэжыгъэ",):
        return "ABSTRACT"
    return None

# ============================================================
# KURAL 2 (Mimar): İnsan/meslek → PERSON
# ============================================================
PERSON_FORM_ONEKLERI = ["уэрэ", "шу", "зиус"]

def kural_person(form):
    for o in PERSON_FORM_ONEKLERI:
        if form.startswith(o):
            return "PERSON"
    return None

# ============================================================
# KURAL 3 (Mimar): Konum edatı → LOCATION
# ============================================================
LOCATION_FORM_SONLARI = ["пӀэ", "хьэ"]

def kural_location(form):
    if form.endswith("пӀэ"):
        return "LOCATION"
    return None

# ============================================================
# KURAL 4 (Mimar): Miktar → QUANTIFIER
# ============================================================
QUANTIFIER_FORM_SONLARI = ["диз", "къуэ", "бэ"]

def kural_quantifier(form):
    for s in QUANTIFIER_FORM_SONLARI:
        if form.endswith(s):
            return "QUANTIFIER"
    return None

# ============================================================
# BEYAZ LİSTE: Gerçek hayvanlar (Türkçe literalMeaning)
# ============================================================
HAYVAN_TR = {
    "köpek", "kedi", "at", "eşek", "inek", "öküz", "boğa", "dana",
    "koyun", "koç", "kuzu", "keçi", "oğlak", "teke", "tavuk", "horoz",
    "civciv", "ördek", "kaz", "hindi", "domuz", "deve", "tavşan",
    "kurt", "tilki", "çakal", "sırtlan", "ayı", "aslan", "kaplan",
    "geyik", "ceylan", "karaca", "sığın", "zürafa", "fil",
    "zebra", "maymun", "penguen", "balık", "balina", "yunus",
    "yılan", "kertenkele", "kaplumbağa", "kurbağa", "timsah",
    "kuş", "kartal", "şahin", "atmaca", "doğan", "baykuş",
    "güvercin", "serçe", "karga", "martı", "papağan",
    "bıldırcın", "keklik", "sülün", "tavus", "böcek",
    "sinek", "arı", "kelebek", "karınca", "örümcek",
}

def hayvan_mi(l):
    anlamlar = []
    if l.get("literalMeaning"):
        anlamlar.append(l["literalMeaning"].lower())
    tr = l.get("translations") or {}
    if isinstance(tr, dict):
        if tr.get("tr"):
            anlamlar.append(tr["tr"].lower())
        if tr.get("ru"):
            anlamlar.append(tr["ru"].lower())
    for a in anlamlar:
        for h in HAYVAN_TR:
            if re.search(r"\b" + re.escape(h) + r"\b", a):
                return True
    return False

# ============================================================
# UYGULAMA
# ============================================================
sonuc = {
    "HAYVAN_KALACAK": [],
    "BILINEN_TASIMA": [],
    "KURAL_TASIMA": [],
    "BILINMEYEN": [],
}

for l in animal:
    form = l.get("form", "")
    
    # 1. Bilinen form → taşı
    if form in DOGRU:
        sonuc["BILINEN_TASIMA"].append((l, DOGRU[form]))
        continue
    
    # 2. Beyaz liste → hayvan, kal
    if hayvan_mi(l):
        sonuc["HAYVAN_KALACAK"].append(l)
        continue
    
    # 3. Mimarın kuralları
    kat = (kural_ghe_abstract(form) or 
           kural_person(form) or 
           kural_location(form) or 
           kural_quantifier(form))
    if kat:
        sonuc["KURAL_TASIMA"].append((l, kat))
        continue
    
    # 4. Bilinmeyen
    sonuc["BILINMEYEN"].append(l)

# ============================================================
# RAPOR
# ============================================================
print("=" * 70)
print(f"ANIMAL TEMİZLİK — Mimar kuralları + Bilinen liste")
print("=" * 70)
print(f"Toplam ANIMAL:             {len(animal)}")
print(f"✅ Hayvan kalacak:          {len(sonuc['HAYVAN_KALACAK'])}")
print(f"🎯 Bilinen → taşınacak:    {len(sonuc['BILINEN_TASIMA'])}")
print(f"📐 Kural → taşınacak:      {len(sonuc['KURAL_TASIMA'])}")
print(f"❓ Bilinmeyen:             {len(sonuc['BILINMEYEN'])}")
print()

kat_dagilim = Counter()
for _, k in sonuc["BILINEN_TASIMA"]:
    kat_dagilim[k] += 1
for _, k in sonuc["KURAL_TASIMA"]:
    kat_dagilim[k] += 1

print("TAŞINACAK KATEGORİLER:")
for k, c in kat_dagilim.most_common():
    print(f"  {k:15} {c}")

print()
print("KURALLARLA TAŞINANLAR (ilk 30):")
for l, k in sonuc["KURAL_TASIMA"][:30]:
    form = l.get("form", "?")
    anlam = (l.get("literalMeaning") or "?")[:40]
    print(f"  {form:22} | {anlam:40} | → {k}")

print()
print("BİLİNMEYENLER (ilk 30):")
for l in sonuc["BILINMEYEN"][:30]:
    form = l.get("form", "?")
    anlam = (l.get("literalMeaning") or "?")[:50]
    print(f"  {form:22} | {anlam}")

print()
print("⚠️  KURU ÇALIŞTIRMA")
