import re
import json
from pathlib import Path

dump_path = Path("data/corpus/kbdwiktionary-dump.xml")
content = dump_path.read_text(encoding="utf-8", errors="ignore")

# Tüm sayfaları çek
pages = re.findall(r'<title>(.*?)</title>.*?<text[^>]*>(.*?)</text>', content, re.DOTALL)
print(f"Toplam sayfa: {len(pages)}")

# Чекilecek bölümler
def extract_ipa(text):
    # {{къэпсэлъыкӀэ|kbd|къэпсэлъ='...'}} veya IPA ['...']
    m = re.search(r"къэпсэлъ='([^']+)'", text)
    if m:
        return f"/{m.group(1)}/"
    m = re.search(r"IPA \['([^']+)'\]", text)
    if m:
        return f"/{m.group(1)}/"
    return None

def extract_examples(text):
    """{{щапхъэхэр}} sonrası * ile başlayan cümleler"""
    # щапхъэхэр template'inden sonraki bölümü al
    pattern = r'\{\{щапхъэхэр\}\}(.*?)(?=\{\{|$)'
    m = re.search(pattern, text, re.DOTALL)
    if not m:
        return []
    bolum = m.group(1)
    # * ile başlayan satırları çek
    cumleler = re.findall(r'^\*\s*(.+?)$', bolum, re.MULTILINE)
    # Temizle: {{...}} template'lerini sil
    temiz = []
    for c in cumleler:
        c = re.sub(r'\{\{.*?\}\}', '', c).strip()
        c = re.sub(r'\[\[.*?\]\]', '', c).strip()
        if len(c) > 15:
            temiz.append(c)
    return temiz[:5]

def extract_partofspeech(text):
    m = re.search(r'лъэпкъыгъуэ=(\w+)', text)
    if not m:
        return None
    pos = m.group(1)
    pos_map = {
        "ЩЫӀЭЦӀЭ": "noun",
        "ПСАЛЪЭЗЭПХА": "verb",
        "ГЛАГОЛ": "verb",
        "ПЛЪЫФЭЦӀЭ": "adjective",
        "НАРЕЧИЕ": "adverb",
        "МЕЖДОМЕТИЕ": "interjection",
        "БЖЫГЪЭЦӀЭ": "numeral",
        "ЧАСТИЦЭ": "particle",
        "ПОСЛЕЛОГ": "postposition",
        "СОЮЗ": "conjunction",
        "ХЬЭРФ": "letter"
    }
    return pos_map.get(pos, pos)

def extract_meaning(text):
    """{{мыхьэнэ}} sonrası # ile başlayan anlamlar"""
    m = re.search(r'\{\{мыхьэнэ\}\}(.*?)(?=\{\{|$)', text, re.DOTALL)
    if not m:
        return None
    anlamlar = re.findall(r'^#\s*(.+?)$', m.group(1), re.MULTILINE)
    return " ".join(a.strip() for a in anlamlar if len(a.strip()) > 5)[:300]

sonuclar = []
for title, text in pages:
    if title.startswith(("Шаблон:", "НапэкӀуэцӀ", "Уикипедиэ", "MediaWiki", "Category", "Template", "Модул", "Индекс:", "спр-")):
        continue

    kayit = {
        "form": title,
        "partOfSpeech": extract_partofspeech(text),
        "ipa": extract_ipa(text),
        "meaning": extract_meaning(text),
        "examples": extract_examples(text),
    }
    if kayit["partOfSpeech"] or kayit["ipa"] or kayit["examples"]:
        sonuclar.append(kayit)

print(f"Anlamlı kayıt: {len(sonuclar)}")

pos_dolu = sum(1 for s in sonuclar if s["partOfSpeech"])
ipa_dolu = sum(1 for s in sonuclar if s["ipa"])
ex_dolu = sum(1 for s in sonuclar if s["examples"])
print(f"  partOfSpeech: {pos_dolu}")
print(f"  ipa:          {ipa_dolu}")
print(f"  examples:     {ex_dolu}")

# Örnek: гуфӏэ
gufie = next((s for s in sonuclar if s["form"] in ["гуфӀэ", "гуфӏэ"]), None)
if gufie:
    print(f"\n=== {gufie['form']} ===")
    print(json.dumps(gufie, ensure_ascii=False, indent=2))

# Kaydet
Path("_scripts/wiktionary_veri_v2.json").write_text(
    json.dumps(sonuclar, ensure_ascii=False, indent=2),
    encoding="utf-8"
)
print(f"\n✅ Kaydedildi: _scripts/wiktionary_veri_v2.json")
