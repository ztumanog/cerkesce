import json
import re
from pathlib import Path
from collections import Counter

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

# ============================================================
# ZATEN UYGULANMIŞ 49 KAYIT — bunlara dokunma
# ============================================================
ZATEN_UYGULANMIS = {
    "гу", "гуагъэуцорэмэ", "гуадз", "гуадзэ", "гуажэ", "гуакӀуагъ",
    "гуакӀуэ", "гуанабэ", "гуаным", "гуанэ", "гуапагъ", "гуапагъэ",
    "гуапэ", "гуапэт", "гуапэу", "гуапэщ", "гуартэ", "гуарцэ",
    "гуауэ", "гуауэм", "гуауэр", "гуауэшхуэ", "гуауэщхьэуэ",
    "гуахъуэ", "гуащ", "гуащэ", "гуащэм", "гуащэнабдзэ",
    "гуащэнэ", "гуащэр", "гуащэу", "гуащӀаджэ", "гуащӀэ",
    "гуащӀэв", "гуащӀэгъуэ", "гуащӀэпсэу", "гуащӀэрагъкӀэ",
    "гуащӏэдэкӏ", "гуащӏэкӏэ", "гуащӏэм", "гуащӏэмащӀэ",
    "гуащӏэр", "гуащӏэу", "губгъо", "губгъом", "губгъор",
    "губгъу", "губгъуэ", "губгъуэм", "губгъуэр",
}

# ============================================================
# KÖK TESPİTİ — form başlangıcına göre
# ============================================================
def kok_bul(form):
    # Spesifik kökler
    if form.startswith("гуащӀэ") or form.startswith("гуащӏэ"):
        return "гуащӀэ"
    if form.startswith("гуащэ"):
        return "гуащэ"
    if form.startswith("губгъу") or form.startswith("губгъо"):
        return "губгъуэ"
    if form.startswith("гуан"):
        return "гуанэ"
    if form.startswith("гуарт"):
        return "гуартэ"
    if form.startswith("гуарц"):
        return "гуарцэ"
    if form.startswith("гуап"):
        return "гуапэ"
    if form.startswith("гуакӀу") or form.startswith("гуакӏу"):
        return "гуакӀуэ"
    if form.startswith("гуау"):
        return "гуауэ"
    if form.startswith("гуаж"):
        return "гуажэ"
    if form.startswith("гуадз"):
        return "гуадзэ"
    # Genel kök
    return "гу"

# ============================================================
# ANLAM KURALLARI — literalMeaning'e göre
# ============================================================
KURALLAR = [
    # === DUYGU (EMOTION) ===
    (["sevgi", "sevinç", "sevincli", "mutlu", "mutluluk"], "EMOTION", "JOY", "Duygu & Zihin"),
    (["öfke", "ofke", "kızgın", "kizgin", "sinir", "nefret"], "EMOTION", "ANGER", "Duygu & Zihin"),
    (["keder", "üzüntü", "uzuntu", "acı", "aci", "hüzün", "huzun"], "EMOTION", "GRIEF", "Duygu & Zihin"),
    (["korku", "endişe", "endise", "kaygı", "kaygi", "telaş", "telas", "panik"], "EMOTION", "FEAR", "Duygu & Zihin"),
    (["merhamet", "şefkat", "sefkat", "acıma", "acima"], "EMOTION", "COMPASSION", "Duygu & Zihin"),
    (["utanç", "utanc", "mahcubiyet"], "EMOTION", "SHAME", "Duygu & Zihin"),
    (["gurur", "onur"], "EMOTION", "PRIDE", "Duygu & Zihin"),
    (["kıskanç", "kiskanc", "haset"], "EMOTION", "JEALOUSY", "Duygu & Zihin"),
    (["sıcak", "sicak", "samimi", "hoş", "hos"], "EMOTION", "WARM", "Duygu & Zihin"),
    (["nezaket", "hoşnut", "hosnut"], "EMOTION", "KINDNESS", "Duygu & Zihin"),
    (["gücenme", "gucenme", "kırgın", "kirgin", "incinme"], "EMOTION", "OFFENSE", "Duygu & Zihin"),
    (["umut", "beklenti"], "EMOTION", "HOPE", "Duygu & Zihin"),
    (["sevimli", "çekici", "cekici", "hoşa"], "EMOTION", "CHARM", "Duygu & Zihin"),
    
    # === ZİHİN (MIND) ===
    (["düşünce", "dusunce", "fikir"], "MIND", "THOUGHT", "Duygu & Zihin"),
    (["zeki", "akıllı", "akilli", "kavrayış", "kavrayis"], "MIND", "INTELLIGENCE", "Duygu & Zihin"),
    (["hatıra", "hatira", "anı", "ani"], "MIND", "MEMORY", "Duygu & Zihin"),
    (["dikkat", "ilgi", "özen", "ozen"], "MIND", "ATTENTION", "Duygu & Zihin"),
    (["ilham"], "MIND", "INSPIRATION", "Duygu & Zihin"),
    
    # === İBADET (fiiller) ===
    (["düşünmek", "dusunmek", "hatırlamak", "hatirlamak"], "ACTION", "GU_VERB", "Duygu & Zihin"),
    (["öfkelenmek", "ofkelenmek", "sevinmek", "üzülmek", "uzulmek"], "ACTION", "GU_VERB", "Duygu & Zihin"),
    
    # === DOĞA (NATURE) ===
    (["tarla", "ova", "bozkır", "bozkir", "kır", "kir"], "NATURE", "FIELD", "Doğa & Arazi"),
    (["dal", "budak"], "NATURE", "BRANCH", "Doğa & Bitki"),
    (["çalı", "cali", "bodur"], "NATURE", "THICKET", "Doğa & Arazi"),
    (["gül", "gul"], "NATURE", "ROSE", "Doğa & Flora"),
    
    # === TARIM / ALET ===
    (["yaba", "tırmık", "tirmik", "çatal"], "OBJECT", "PITCHFORK", "Tarım & Alet"),
    (["buğday", "bugday"], "AGRICULTURE", "WHEAT", "Tarım"),
    
    # === SOSYAL ===
    (["hanım", "hanim", "prenses", "kayınvalide", "kayinvalide"], "PERSON", "LADY", "Sosyal Rol"),
    (["yardımcı", "yardimci", "muavin"], "PERSON", "ASSISTANT", "Görev & Unvan"),
    
    # === GÜÇ / EMEK ===
    (["güç", "guc", "kuvvet", "emek"], "LABOR", "POWER", "Güç & Emek"),
    (["acı", "aci", "sert", "yoğun", "yogun"], "LABOR", "INTENSE", "Güç & Emek"),
    
    # === TOPLULUK ===
    (["sürü", "suru", "küme", "kume", "grup"], "COLLECTIVE", "HERD", "Topluluk"),
]

def siniflandir(l):
    form = l.get("form", "")
    anlam = (l.get("literalMeaning") or "").lower()
    pos = (l.get("partOfSpeech") or "").lower()
    kok = kok_bul(form)
    
    # Kural bazlı arama
    for kelimeler, concept, sub, family in KURALLAR:
        if any(k in anlam for k in kelimeler):
            return concept, sub, family, kok
    
    # Fiil kontrolü
    if pos == "verb" or anlam.endswith(("mak", "mek")):
        return "ACTION", "GU_VERB", "Duygu & Zihin", kok
    
    # Sıfat kontrolü
    if pos == "adjective":
        return "QUALIFIER", "GU_ADJ", "Duygu & Zihin", kok
    
    # Belirsiz
    return "BELIRSIZ", "-", "-", kok

# ============================================================
# UYGULA
# ============================================================
uygulanan = 0
sonuclar = []

for l in lex:
    form = l.get("form", "")
    if not form.startswith("гу"):
        continue
    if form in ZATEN_UYGULANMIS:
        continue
    # Zaten Morfolojik Pasaport alanı varsa atla
    if l.get("subConceptId"):
        continue
    
    concept, sub, family, kok = siniflandir(l)
    l["conceptId"] = concept
    l["subConceptId"] = sub
    l["taxonomyFamily"] = family
    l["rootForm"] = kok
    uygulanan += 1
    sonuclar.append((l, concept, sub, family, kok))

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

# ============================================================
# RAPOR — MİMARA VERİLECEK
# ============================================================
with open("_scripts/gu_mimara_onay.txt", "w", encoding="utf-8") as f:
    f.write(f"# GU- OTOMATIK SINIFLANDIRMA — MIMAR ONAYI ICIN\n")
    f.write(f"# Toplam: {uygulanan} kayit\n")
    f.write(f"# KURAL: Her satirda 'OK' veya 'DUZELT' yaz\n")
    f.write("=" * 130 + "\n")
    f.write(f"{'FORM':<25} | {'ANLAM':<45} | {'CONCEPT':<12} | {'SUB':<18} | {'AİLE':<18} | ONAY\n")
    f.write("-" * 130 + "\n")
    
    for l, c, s, fam, k in sonuclar:
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?")[:45]
        f.write(f"{form:<25} | {anlam:<45} | {c:<12} | {s:<18} | {fam:<18} | [ ]\n")

# Dağılım
dagilim = Counter(c for _, c, _, _, _ in sonuclar)
print(f"OK - {uygulanan} kayit guncellendi")
print()
print("KATEGORI DAGILIMI:")
for k, v in dagilim.most_common():
    print(f"  {k:<20} {v}")
print()
print("Dosya: _scripts/gu_mimara_onay.txt")
