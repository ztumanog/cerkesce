import json
import re
from pathlib import Path
from collections import Counter

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))
animal = [l for l in lex if l.get("conceptId") == "ANIMAL"]

# ============================================================
# FİİL ÖNEKLERİ
# ============================================================
FIIL_ONEKLERI = {"гъэ", "дэ", "бгъэ", "е", "зэ", "зы", "къэ", "хэ",
                 "щӀэ", "те", "пы", "и", "щы", "фӀэ", "блэ"}

FIIL_RULES = {"causative", "locative", "reflexive", "reciprocal",
              "prefix_locative", "directional", "cislocative", "transitive"}

# ============================================================
# FONKSİYONEL KELİMELER — ÇERKESÇE (doğrudan form eşleşmesi)
# ============================================================
FONKSIYONEL = {
    # SORU KELİMELERİ
    "дауэ": "QUESTION", "дэнэ": "QUESTION", "сыт": "QUESTION",
    "хэт": "QUESTION", "сыту": "QUESTION", "тӀо": "QUESTION",
    "сытым": "QUESTION", "сытми": "QUESTION", "дэнэра": "QUESTION",
    
    # ZAMİRLER
    "абыхэм": "PRONOUN", "псори": "PRONOUN", "зыгуэр": "PRONOUN",
    "зыми": "PRONOUN", "ар": "PRONOUN", "мыр": "PRONOUN",
    "мыхэр": "PRONOUN", "мыбыхэм": "PRONOUN", "дыдей": "PRONOUN",
    "абы": "PRONOUN", "са": "PRONOUN", "уэ": "PRONOUN", "ды": "PRONOUN",
    "сы": "PRONOUN", "зы": "PRONOUN",
    
    # BAĞLAÇLAR
    "арати": "CONNECTIVE", "аращи": "CONNECTIVE",
    "нэгъуэщӀ": "CONNECTIVE", "икӀи": "CONNECTIVE", "ауэ": "CONNECTIVE",
    
    # EDATLAR / PARTICLE
    "нэхърэ": "PARTICLE", "дыдэ": "PARTICLE", "нэужь": "PARTICLE",
    "иджыри": "PARTICLE", "щхьэкӀэ": "PARTICLE",
    
    # DEMONSTRATIVE
    "апхуэдэ": "DEMONSTRATIVE", "мыпхуэдэ": "DEMONSTRATIVE",
    "аращ": "DEMONSTRATIVE", "мо": "DEMONSTRATIVE", "мы": "DEMONSTRATIVE",
    
    # İNTENSIFIER
    "дыдэ": "INTENSIFIER",
}

# ============================================================
# SON EK KURALLARI
# ============================================================
SON_EK_KURALLARI = [
    ("пӀэ", "LOCATION"),      # yer/mekan
    ("афэ", "QUALIFIER"),     # görünüm/tat/renk
    ("гъэ", "ABSTRACT"),      # soyut isim
]

# ============================================================
# KARA LİSTE (bilinen yanlışlar)
# ============================================================
KARA_LISTE = {
    "гува", "шывей", "мыбыдэ", "кхъуейлъалъэ", "зыпэмыплъа",
    "ищхьэ", "хэгъэтын", "щхьэзакъуэ", "кашэ", "мыхэр", "дагъыстан",
}

def fiil_mi(l):
    deriv = l.get("derivation") or {}
    if not isinstance(deriv, dict):
        deriv = {}
    prefix = (deriv.get("prefix") or "").rstrip("-")
    if prefix in FIIL_ONEKLERI:
        return True
    rule = deriv.get("rule") or ""
    if rule in FIIL_RULES:
        return True
    anlam = (l.get("literalMeaning") or "").lower().strip()
    if anlam.endswith(("mak", "mek")):
        return True
    if re.search(r"\b(etmek|olmak|yapmak|kılmak|kilmak)\b", anlam):
        return True
    return False

def fonksiyonel_mi(form):
    """Doğrudan Çerkesçe form eşleşmesi"""
    return FONKSIYONEL.get(form)

def son_ek_kategorisi(form):
    """Son eke göre kategori"""
    for ek, kat in SON_EK_KURALLARI:
        if form.endswith(ek):
            return kat
    return None

# ============================================================
# KATEGORİLER (kelime sınırı ile)
# ============================================================
KATEGORILER = {
    "MONTH": ["ocak", "şubat", "subat", "mart", "nisan", "mayıs", "mayis",
              "haziran", "temmuz", "ağustos", "agustos", "eylül", "eylul",
              "ekim", "kasım", "kasim", "aralık", "aralik"],
    "TIME": ["saat", "dakika", "saniye", "gün", "gun", "yıl", "yil",
             "hafta", "sabah", "akşam", "aksam", "gece", "öğle", "ogle",
             "zaman", "vakit", "dün", "dun", "yarın", "yarin", "bugün", "bugun",
             "asır", "yüzyıl", "yuzyil", "mevsim"],
    "PLANT": ["domates", "ağaç", "agac", "çiçek", "cicek", "yaprak",
              "meyve", "sebze", "üzüm", "uzum", "elma", "pamuk",
              "buğday", "bugday", "arpa", "mısır", "misir", "fasulye",
              "çimen", "cimen", "kavun", "karpuz"],
    "FOOD": ["ekmek", "yemek", "süt", "sut", "peynir", "tuz",
             "çay", "cay", "kahve", "çorba", "corba", "pilav",
             "yağ", "yag", "şeker", "seker", "hamur", "yumurta", "lapa"],
    "BODY": ["baş", "kol", "bacak", "göz", "goz", "kulak", "ağız", "agiz",
             "diş", "dil", "burun", "parmak", "kalp", "karın", "karin",
             "sırt", "sirt", "boyun", "omuz", "ayak",
             "saç", "sac", "dudak", "çene", "cene"],
    "EMOTION": ["sevgi", "öfke", "ofke", "korku", "üzüntü", "uzuntu",
                "mutluluk", "merhamet", "şefkat", "sefkat", "kaygı", "kaygi",
                "sevinç", "sevinc", "huzur", "endişe", "endise"],
    "FAMILY": ["anne", "baba", "kardeş", "kardes", "dede", "nine", "oğul", "ogul",
               "çocuk", "cocuk", "aile", "torun", "gelin", "damat", "abi", "abla",
               "hala", "teyze", "amca", "dayı", "dayi", "yeğen", "yegen"],
    "PERSON": ["adam", "kadın", "kadin", "erkek", "genç", "genc", "yaşlı", "yasli",
               "bekçi", "bekci", "muhafız", "muhafiz", "asker",
               "öğretmen", "ogretmen", "doktor", "çiftçi", "ciftci",
               "çoban", "coban", "misafir", "konuk", "komşu", "komsu",
               "demirci", "marangoz", "tüccar", "tuccar"],
    "OBJECT": ["yatak", "masa", "sandalye", "kapı", "kapi", "pencere",
               "kitap", "mektup", "araba", "kılıç", "kilic",
               "elbise", "giysi", "ayakkabı", "ayakkabi", "şapka", "sapka",
               "kemer", "yüzük", "yuzuk", "anahtar", "halat",
               "sehpa", "halı", "hali", "tabak", "bardak", "kaşık", "kasik",
               "çatal", "catal", "bıçak", "bicak", "porselen", "fincan"],
    "NATURE": ["nehir", "dağ", "dag", "deniz", "gökyüzü", "gokyuzu", "yıldız", "yildiz",
               "güneş", "gunes", "yağmur", "yagmur",
               "rüzgar", "ruzgar", "bulut", "toprak", "hava",
               "orman", "göl", "gol", "dere", "vadi", "tepe", "ova",
               "doğu", "dogu", "kuzey", "güney", "guney",
               "şimşek", "simsek", "gökkuşağı", "gokkusagi", "sis", "buz", "çamur", "camur",
               "gübre", "gubre", "batı", "bati"],
    "CULTURE": ["düğün", "dugun", "bayram", "mitolojik", "gelenek", "tören", "toren",
                "şarkı", "sarki", "dans", "oyun", "masal", "efsane",
                "atasözü", "atasozu", "deyim", "ninni", "ağıt", "agit"],
    "LOCATION": ["dağıstan", "dagistan", "yer", "bölge", "bolge", "ülke", "ulke",
                 "şehir", "sehir", "köy", "koy", "kasaba", "tavan", "çatı", "cati"],
    "ANIMAL": ["kurt", "köpek", "kopek", "kedi", "kuş", "kus", "balık", "balik",
               "inek", "koyun", "keçi", "keci", "tavuk", "horoz",
               "ördek", "ordek", "kaz", "domuz", "eşek", "esek", "deve",
               "tavşan", "tavsan", "fare", "sıçan", "sican", "yılan", "yilan",
               "kertenkele", "kaplumbağa", "kaplumbaga", "kurbağa", "kurbaga",
               "balina", "yunus", "aslan", "kaplan", "tilki",
               "çakal", "cakal", "geyik", "ceylan", "bizon", "fil",
               "zürafa", "zurafa", "zebra", "maymun", "şempanze",
               "goril", "penguen", "martı", "marti", "kartal", "şahin", "sahin",
               "atmaca", "baykuş", "baykus", "güvercin", "guvercin",
               "serçe", "serce", "karga", "saksağan", "saksagan",
               "bıldırcın", "bildircin", "keklik", "sülün", "sulun",
               "papağan", "papagan", "somon", "sığın", "sigin", "teke",
               "hayvan", "böcek", "bocek", "sinek",
               "örümcek", "orumcek", "karınca", "karinca", "kelebek",
               "solucan", "timsah", "salyangoz", "akrep",
               "sivrisinek", "çekirge", "cekirtge"],
}

def kelime_sinirli_ara(aranan, metin):
    pattern = r"\b" + re.escape(aranan) + r"\b"
    return re.search(pattern, metin) is not None

def siniflandir(l):
    form = l.get("form", "")
    anlam = (l.get("literalMeaning") or "").lower().strip()
    
    # 1. Kara liste → BELIRSIZ (manuel)
    if form in KARA_LISTE:
        return "BELIRSIZ"
    
    # 2. Fonksiyonel kelime? (form eşleşmesi)
    fk = fonksiyonel_mi(form)
    if fk:
        return fk
    
    # 3. Fiil mi?
    if fiil_mi(l):
        return "FIIL"
    
    # 4. Son ek kuralı
    sek = son_ek_kategorisi(form)
    if sek:
        return sek
    
    # 5. Hayvan kontrolü (kelime sınırlı)
    for k in KATEGORILER["ANIMAL"]:
        if kelime_sinirli_ara(k, anlam):
            return "ANIMAL"
    
    # 6. Diğer kategoriler
    for kat, kelimeler in KATEGORILER.items():
        if kat == "ANIMAL":
            continue
        for k in kelimeler:
            if kelime_sinirli_ara(k, anlam):
                return kat
    
    return "BELIRSIZ"

sonuclar = [(l, siniflandir(l)) for l in animal]
dagilim = Counter(k for _, k in sonuclar)

print("=" * 70)
print(f"ANIMAL TOPLU TASNİF v4 — Toplam: {len(animal)}")
print("=" * 70)
print()
for k, c in dagilim.most_common():
    yuzde = c / len(animal) * 100
    if k == "ANIMAL": isaret = "✅ KALACAK"
    elif k == "BELIRSIZ": isaret = "❓ MANUEL"
    elif k == "FIIL": isaret = "🎯 null"
    else: isaret = f"🔀 {k}"
    print(f"  {isaret:25} {c:5}  ({yuzde:5.1f}%)")

print()
print("=" * 70)
print("KATEGORİ ÖRNEKLERİ (ilk 5'er)")
print("=" * 70)
for kat in ["FIIL", "QUESTION", "PRONOUN", "CONNECTIVE", "PARTICLE",
            "DEMONSTRATIVE", "MONTH", "TIME", "PLANT", "FOOD", "BODY",
            "EMOTION", "FAMILY", "PERSON", "OBJECT", "NATURE", "LOCATION",
            "QUALIFIER", "ABSTRACT", "ANIMAL"]:
    ornekler = [l for l, k in sonuclar if k == kat][:5]
    if ornekler:
        print(f"\n--- {kat} ({dagilim[kat]}) ---")
        for l in ornekler:
            form = l.get("form", "?")
            anlam = (l.get("literalMeaning") or "?")[:55]
            print(f"  {form:22} | {anlam}")

belirsiz = [l for l, k in sonuclar if k == "BELIRSIZ"]
with open("_scripts/animal_belirsiz.txt", "w", encoding="utf-8") as f:
    f.write(f"# ANIMAL Belirsiz — {len(belirsiz)} kayıt\n\n")
    for l in belirsiz:
        form = l.get("form", "?")
        anlam = l.get("literalMeaning", "?")
        f.write(f"{form:25} | {anlam}\n")

print()
print("=" * 70)
print(f"BELİRSİZ: {len(belirsiz)} — ilk 20")
print("=" * 70)
for l in belirsiz[:20]:
    form = l.get("form", "?")
    anlam = (l.get("literalMeaning") or "?")[:55]
    print(f"  {form:22} | {anlam}")

print()
print(f"✅ Belirsizler: _scripts/animal_belirsiz.txt")
