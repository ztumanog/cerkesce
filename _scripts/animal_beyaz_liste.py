import json
import re
from pathlib import Path
from collections import Counter

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))
animal = [l for l in lex if l.get("conceptId") == "ANIMAL"]

# ============================================================
# GERÇEK HAYVANLAR — BEYAZ LİSTE
# Bu listede olan ANIMAL olarak KALIR.
# Olmayan her şey null yapılır.
# ============================================================
GERCEK_HAYVANLAR = {
    # Evcil hayvanlar
    "köpek", "kopek", "kedi", "at", "eşek", "esek", "katır", "katir",
    "inek", "öküz", "okuz", "boğa", "boga", "dana", "buzağı", "buzagi",
    "koyun", "koç", "koc", "kuzu", "keçi", "keci", "oğlak", "oglak",
    "teke", "tavuk", "horoz", "civciv", "ördek", "ordek", "kaz",
    "hindi", "domuz", "deve", "tavşan", "tavsan", "kedi",
    
    # Vahşi hayvanlar
    "kurt", "tilki", "çakal", "cakal", "sırtlan", "sirtlan",
    "ayı", "ayi", "aslan", "kaplan", "pars", "leopar", "çita", "cita",
    "geyik", "ceylan", "karaca", "elk", "sığın", "sigin",
    "bizon", "bufalo", "antilop", "zürafa", "zurafa",
    "fil", "gergedan", "su aygırı", "zebra", "maymun", "şempanze",
    "sempanze", "goril", "orangutan", "lemur", "panda",
    
    # Deniz canlıları
    "balık", "balik", "balina", "yunus", "köpekbalığı", "kopekbaligi",
    "ahtapot", "kalamar", "yengeç", "yengec", "ıstakoz", "istakoz",
    "karides", "midye", "istiridye", "salyangoz",
    
    # Kuşlar
    "kuş", "kus", "kartal", "şahin", "sahin", "atmaca", "doğan", "dogan",
    "baykuş", "baykus", "güvercin", "guvercin", "serçe", "serce",
    "karga", "saksağan", "saksagan", "martı", "marti", "penguen",
    "papağan", "papagan", "muhabbet kuşu", "kanarya",
    "bıldırcın", "bildircin", "keklik", "sülün", "sulun", "tavus",
    
    # Sürüngenler / Amfibiler
    "yılan", "yilan", "kertenkele", "kaplumbağa", "kaplumbaga",
    "kurbağa", "kurbaga", "timsah", "kertenkele",
    
    # Böcekler / Küçük canlılar
    "böcek", "bocek", "sinek", "sivrisinek", "arı", "ari", "eşek arısı",
    "esek arisi", "kelebek", "güve", "guve", "karınca", "karinca",
    "örümcek", "orumcek", "akrep", "kırkayak", "kirkayak",
    "çekirge", "cekirtge", "hamamböceği", "hamambocegi",
    "solucan", "salyangoz", "yusufçuk", "yusufcuk",
}

def hayvan_mi(anlam):
    """literalMeaning'de beyaz listeden bir kelime var mı?"""
    a = anlam.lower().strip()
    for h in GERCEK_HAYVANLAR:
        if re.search(r"\b" + re.escape(h) + r"\b", a):
            return True
    return False

# ============================================================
# TASNİF
# ============================================================
kalacak = []
cikarilacak = []

for l in animal:
    anlam = l.get("literalMeaning") or ""
    if hayvan_mi(anlam):
        kalacak.append(l)
    else:
        cikarilacak.append(l)

print("=" * 70)
print(f"ANIMAL TEMİZLİK ÖN RAPORU")
print("=" * 70)
print(f"Toplam ANIMAL:     {len(animal)}")
print(f"✅ Kalacak:        {len(kalacak)}")
print(f"❌ Çıkarılacak:    {len(cikarilacak)}")
print()

print("=" * 70)
print("✅ KALACAK ÖRNEKLERİ (ilk 40)")
print("=" * 70)
for l in kalacak[:40]:
    form = l.get("form", "?")
    anlam = (l.get("literalMeaning") or "?")[:55]
    print(f"  {form:22} | {anlam}")

print()
print("=" * 70)
print("❌ ÇIKARILACAK ÖRNEKLERİ (ilk 40)")
print("=" * 70)
for l in cikarilacak[:40]:
    form = l.get("form", "?")
    anlam = (l.get("literalMeaning") or "?")[:55]
    print(f"  {form:22} | {anlam}")

# Dosyalara yaz
with open("_scripts/animal_kalacak.txt", "w", encoding="utf-8") as f:
    f.write(f"# ANIMAL Kalacak — {len(kalacak)} kayıt\n\n")
    for l in kalacak:
        form = l.get("form", "?")
        anlam = l.get("literalMeaning", "?")
        f.write(f"{form:25} | {anlam}\n")

with open("_scripts/animal_cikarilacak.txt", "w", encoding="utf-8") as f:
    f.write(f"# ANIMAL Çıkarılacak — {len(cikarilacak)} kayıt\n\n")
    for l in cikarilacak:
        form = l.get("form", "?")
        anlam = l.get("literalMeaning", "?")
        f.write(f"{form:25} | {anlam}\n")

print()
print(f"✅ _scripts/animal_kalacak.txt")
print(f"✅ _scripts/animal_cikarilacak.txt")
