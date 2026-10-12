import json
import re
from pathlib import Path
from collections import Counter

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))
animal = [l for l in lex if l.get("conceptId") == "ANIMAL"]

# ============================================================
# KATMAN 1: KESİN HAYVANLAR (beyaz liste)
# ============================================================
HAYVAN_TR = {
    "köpek", "kedi", "at", "eşek", "inek", "öküz", "boğa", "dana",
    "koyun", "koç", "kuzu", "keçi", "oğlak", "teke", "tavuk", "horoz",
    "civciv", "ördek", "kaz", "hindi", "domuz", "deve", "tavşan",
    "kurt", "tilki", "çakal", "sırtlan", "ayı", "aslan", "kaplan",
    "pars", "leopar", "geyik", "ceylan", "karaca", "sığın",
    "bizon", "bufalo", "antilop", "zürafa", "fil", "gergedan",
    "zebra", "maymun", "şempanze", "goril", "penguen",
    "balık", "balina", "yunus", "köpekbalığı", "ahtapot",
    "yılan", "kertenkele", "kaplumbağa", "kurbağa", "timsah",
    "kuş", "kartal", "şahin", "atmaca", "doğan", "baykuş",
    "güvercin", "serçe", "karga", "saksağan", "martı",
    "papağan", "bıldırcın", "keklik", "sülün", "tavus",
    "böcek", "sinek", "sivrisinek", "arı", "kelebek", "güve",
    "karınca", "örümcek", "akrep", "çekirge", "solucan",
    "salyangoz", "yengeç", "ıstakoz", "karides", "midye",
}

# ============================================================
# KATMAN 2: BİLİNEN FORMLAR → DOĞRU KATEGORİ
# ============================================================
DOGRU = {
    # Fiiller
    "лъэн": "ACTION", "щэхун": "ACTION", "щӀэжын": "ACTION",
    "зыхуэщӀын": "ACTION", "гъэпцӀын": "ACTION", "къэгъэщӀын": "ACTION",
    "гъэбзэщӀэн": "ACTION", "къэцыбырыбын": "ACTION",
    "хэгъэтын": "ACTION", "хуей": "ACTION", "етын": "ACTION",
    "гъэбэгъуэн": "ACTION", "бгъэдэлъын": "ACTION",
    # Zaman
    "мазае": "TIME", "сыхьэт": "TIME", "илъэсищэ": "TIME",
    "дыгъэкъухьэпӀэ": "TIME", "аргуэру": "TIME", "иджыри": "TIME",
    # Yer
    "вагъуэщхьэ": "LOCATION", "гъуэлъыпӀэ": "LOCATION",
    "къухьэпӀэ": "LOCATION", "унэм": "LOCATION",
    "дагъыстан": "LOCATION", "пащхьэ": "LOCATION",
    # Zamir
    "абыхэм": "PRONOUN", "псори": "PRONOUN", "зыгуэр": "PRONOUN",
    "зыми": "PRONOUN", "адрей": "PRONOUN", "хэти": "PRONOUN",
    "мыхэр": "PRONOUN", "аращ": "PRONOUN", "апхуэдэ": "PRONOUN",
    # Soru
    "сыту": "QUESTION", "дауэ": "QUESTION", "дэнэ": "QUESTION",
    "дэтхэнэ": "QUESTION",
    # Bağlaç/Edat
    "арати": "CONNECTIVE", "аращи": "CONNECTIVE",
    "нэхърэ": "PARTICLE", "дыдэ": "PARTICLE", "нэужь": "PARTICLE",
    "къэс": "PARTICLE", "нэс": "PARTICLE", "мис": "PARTICLE",
    "зэи": "ADVERB", "мыпхуэдэу": "ADVERB", "апхуэдизу": "ADVERB",
    # Yiyecek
    "помидор": "FOOD", "кхъуейлъалъэ": "FOOD",
    "хьэжыгъэ": "FOOD", "кашэ": "FOOD",
    # Kişi
    "уэрэдохуэ": "PERSON", "зиусхьэн": "PERSON", "нэбгырэ": "PERSON",
    # Nesne
    "шэнджэс": "OBJECT", "афэ": "OBJECT", "уэздыгъэ": "OBJECT",
    "фарфор": "OBJECT",
    # Vücut
    "жьафэ": "BODY",
    # Duygu
    "гущӀэгъу": "EMOTION",
    # Doğa
    "къуэлабэ": "NATURE", "псыхъуэжь": "NATURE", "шывей": "NATURE",
    # Kültür
    "ажэгъафэ": "CULTURE",
    # Soyut
    "тынышагъэ": "ABSTRACT", "къару": "ABSTRACT",
    # Nitelik
    "тыныш": "QUALIFIER", "фошыгъуафэ": "QUALIFIER",
    "хуит": "QUALIFIER", "мыбыдэ": "QUALIFIER",
    "зыпэмыплъа": "QUALIFIER", "ищхьэ": "LOCATION",
}

# ============================================================
# KATMAN 3: POS → KATEGORİ (belirsizler için)
# ============================================================
POS_KATEGORI = {
    "verb": "ACTION",
    "adjective": "QUALIFIER",
    "adverb": "ADVERB",
    "pronoun": "PRONOUN",
    "conjunction": "CONNECTIVE",
    "postposition": "PARTICLE",
    "particle": "PARTICLE",
    "interjection": "PARTICLE",
    "numeral": "QUANTIFIER",
}

def hayvan_mi(l):
    """3 kaynağa bak: literalMeaning, translations.tr, translations.ru"""
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
    "POS_TASIMA": [],
    "BILINMEYEN": [],
}

for l in animal:
    form = l.get("form", "")
    
    # 1. Bilinen form mu?
    if form in DOGRU:
        sonuc["BILINEN_TASIMA"].append((l, DOGRU[form]))
        continue
    
    # 2. Gerçek hayvan mı?
    if hayvan_mi(l):
        sonuc["HAYVAN_KALACAK"].append(l)
        continue
    
    # 3. POS'a göre taşı
    pos = (l.get("partOfSpeech") or "").lower()
    if pos in POS_KATEGORI:
        sonuc["POS_TASIMA"].append((l, POS_KATEGORI[pos]))
        continue
    
    # 4. Bilinmeyen
    sonuc["BILINMEYEN"].append(l)

# ============================================================
# RAPOR
# ============================================================
print("=" * 70)
print(f"ANIMAL TEMİZLİK — 3 KATMANLI")
print("=" * 70)
print(f"Toplam ANIMAL:            {len(animal)}")
print(f"✅ Hayvan kalacak:         {len(sonuc['HAYVAN_KALACAK'])}")
print(f"🎯 Bilinen → taşınacak:   {len(sonuc['BILINEN_TASIMA'])}")
print(f"🔀 POS → taşınacak:       {len(sonuc['POS_TASIMA'])}")
print(f"❓ Bilinmeyen:            {len(sonuc['BILINMEYEN'])}")
print()

# POS dağılımı
print("BİLİNMEYENLERİN POS DAĞILIMI:")
pos_dagilim = Counter((l.get("partOfSpeech") or "?") for l in sonuc["BILINMEYEN"])
for k, v in pos_dagilim.most_common():
    print(f"  {k:15} {v}")

print()
print("KALACAK HAYVANLAR (ilk 20):")
for l in sonuc["HAYVAN_KALACAK"][:20]:
    form = l.get("form", "?")
    anlam = (l.get("literalMeaning") or "?")[:45]
    print(f"  {form:22} | {anlam}")

print()
print("BİLİNMEYENLER (ilk 20):")
for l in sonuc["BILINMEYEN"][:20]:
    form = l.get("form", "?")
    anlam = (l.get("literalMeaning") or "?")[:45]
    pos = l.get("partOfSpeech", "?")
    print(f"  {form:22} | {anlam:45} | {pos}")

print()
print("⚠️  KURU ÇALIŞTIRMA")
