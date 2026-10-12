import json
import re
from pathlib import Path
from collections import Counter

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))
animal = [l for l in lex if l.get("conceptId") == "ANIMAL"]

# ============================================================
# DOĞRU KATEGORİ HARİTASI — form → yeni conceptId
# (ANIMAL'da yanlış etiketlenen her kelime buraya)
# ============================================================
DOGRU_KATEGORILER = {
    # === ZAMAN / AY ===
    "мазае": "TIME",       # şubat
    "сыхьэт": "TIME",      # saat
    "илъэсищэ": "TIME",    # yüzyıl
    "дыгъэкъухьэпӀэ": "TIME",  # gün batımı
    
    # === YER / MEKAN ===
    "вагъуэщхьэ": "LOCATION",   # tavan/çatı
    "гъуэлъыпӀэ": "LOCATION",   # yatak odası
    "къухьэпӀэ": "LOCATION",    # batı
    "унэм": "LOCATION",         # evde
    "дагъыстан": "LOCATION",    # Dağıstan
    "пащхьэ": "LOCATION",       # ön
    
    # === FİİL ===
    "лъэн": "ACTION",
    "щэхун": "ACTION",
    "щӀэжын": "ACTION",
    "зыхуэщӀын": "ACTION",
    "гъэпцӀын": "ACTION",
    "къэгъэщӀын": "ACTION",
    "гъэбзэщӀэн": "ACTION",
    "къэцыбырыбын": "ACTION",
    "хэгъэтын": "ACTION",
    "хуей": "ACTION",
    "етын": "ACTION",
    "гъэбэгъуэн": "ACTION",
    "бгъэдэлъын": "ACTION",
    
    # === ZAMİR ===
    "абыхэм": "PRONOUN",
    "псори": "PRONOUN",
    "зыгуэр": "PRONOUN",
    "зыми": "PRONOUN",
    "адрей": "PRONOUN",
    "хэти": "PRONOUN",
    "мыхэр": "PRONOUN",
    "аращ": "PRONOUN",
    "апхуэдэ": "PRONOUN",
    
    # === SORU ===
    "сыту": "QUESTION",
    "дауэ": "QUESTION",
    "дэнэ": "QUESTION",
    "дэтхэнэ": "QUESTION",
    
    # === BAĞLAÇ / EDAT / ZARF ===
    "арати": "CONNECTIVE",
    "аращи": "CONNECTIVE",
    "нэхърэ": "PARTICLE",
    "иджыри": "PARTICLE",
    "дыдэ": "PARTICLE",
    "нэужь": "PARTICLE",
    "къэс": "PARTICLE",
    "нэс": "PARTICLE",
    "мис": "PARTICLE",
    "зэи": "ADVERB",
    "аргуэру": "ADVERB",
    "мыпхуэдэу": "ADVERB",
    "апхуэдизу": "ADVERB",
    
    # === YİYECEK / BİTKİ ===
    "помидор": "FOOD",
    "кхъуейлъалъэ": "FOOD",
    "хьэжыгъэ": "FOOD",
    "кашэ": "FOOD",
    
    # === KİŞİ / UNVAN ===
    "уэрэдохуэ": "PERSON",
    "зиусхьэн": "PERSON",
    "нэбгырэ": "PERSON",
    
    # === NESNE ===
    "шэнджэс": "OBJECT",
    "афэ": "OBJECT",
    "уэздыгъэ": "OBJECT",
    "фарфор": "OBJECT",
    
    # === VÜCUT ===
    "жьафэ": "BODY",
    
    # === DUYGU ===
    "гущӀэгъу": "EMOTION",
    
    # === DOĞA ===
    "къуэлабэ": "NATURE",
    "псыхъуэжь": "NATURE",
    "шывей": "NATURE",
    
    # === KÜLTÜR ===
    "ажэгъафэ": "CULTURE",
    
    # === SOYUT ===
    "тынышагъэ": "ABSTRACT",
    "къару": "ABSTRACT",
    
    # === NİTELİK ===
    "тыныш": "QUALIFIER",
    "фошыгъуафэ": "QUALIFIER",
    "хуит": "QUALIFIER",
    "мыбыдэ": "QUALIFIER",
    "зыпэмыплъа": "QUALIFIER",
    "ищхьэ": "LOCATION",
}

# ============================================================
# UYGULAMA
# ============================================================
tasindi = 0
kalacak = 0
belirsiz = 0

for l in animal:
    form = l.get("form", "")
    
    if form in DOGRU_KATEGORILER:
        yeni_kat = DOGRU_KATEGORILER[form]
        # notes'a iz ekle
        eski_not = l.get("notes") or ""
        yeni_not = f"[ANIMAL etiketinden {yeni_kat} olarak düzeltildi]"
        if yeni_not not in eski_not:
            l["notes"] = (eski_not + " " + yeni_not).strip()
        l["conceptId"] = yeni_kat
        tasindi += 1
    else:
        # Beyaz listede olan (gerçek hayvan) mı?
        anlam = (l.get("literalMeaning") or "").lower()
        gercek_hayvan = any(
            re.search(r"\b" + re.escape(h) + r"\b", anlam)
            for h in ["köpek", "kedi", "kurt", "tilki", "at", "eşek",
                      "inek", "koyun", "keçi", "tavuk", "horoz", "ördek",
                      "kaz", "kuş", "balık", "yılan", "aslan", "kaplan",
                      "ayı", "geyik", "ceylan", "fil", "maymun", "fare"]
        )
        if gercek_hayvan:
            kalacak += 1
        else:
            belirsiz += 1

print("=" * 70)
print("ANIMAL TEMİZLİK ÖN RAPORU")
print("=" * 70)
print(f"Toplam ANIMAL:       {len(animal)}")
print(f"✅ Doğruya taşınan:   {tasindi}")
print(f"✅ Gerçek hayvan:     {kalacak}")
print(f"❓ Belirsiz kalan:    {belirsiz}")
print()

# Kategori dağılımı
kat_dagilim = Counter()
for l in animal:
    if l.get("form") in DOGRU_KATEGORILER:
        kat_dagilim[DOGRU_KATEGORILER[l["form"]]] += 1

print("TAŞINACAK KATEGORİLER:")
for k, c in kat_dagilim.most_common():
    print(f"  {k:15} {c}")

print()
print("=" * 70)
print("İLK 30 TAŞIMA")
print("=" * 70)
sayac = 0
for l in animal:
    if l.get("form") in DOGRU_KATEGORILER and sayac < 30:
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?")[:45]
        yeni = DOGRU_KATEGORILER[form]
        print(f"  {form:22} | {anlam:45} | → {yeni}")
        sayac += 1

print()
print("⚠️  KURU ÇALIŞTIRMA — hiçbir şey değişmedi")
