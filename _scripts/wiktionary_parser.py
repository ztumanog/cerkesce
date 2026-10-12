import re
import json
from pathlib import Path

dump_path = Path("data/corpus/kbdwiktionary-dump.xml")
if not dump_path.exists():
    print("❌ Dump yok!")
    exit(1)

print(f"Dump boyutu: {dump_path.stat().st_size / 1024 / 1024:.1f} MB")

# XML'den sayfaları çek
content = dump_path.read_text(encoding="utf-8", errors="ignore")
pages = re.findall(r'<title>(.*?)</title>.*?<text[^>]*>(.*?)</text>', content, re.DOTALL)
print(f"Toplam sayfa: {len(pages)}")

# Çekilecek bölümler
def extract_section(text, section_name):
    """Belirli bir bölümü çek"""
    pattern = rf'{section_name}(.*?)(?=\n==|\nПСАЛЪЭ|\nЭТИМОЛОГИЕ|\nКЪЭПСЭЛЪЫКӀЭ|\nСКЛОНЕНЭ|\nМЫХЬЭНЭ|\nЩАПХЪЭХЭР|\nПСАЛЪЭ ЗЭПХАХЭР|\nНЭГЪУЭЩӀЫБЗЭКӀЭ|\nИНДЖЫЛЫБЗЭ|\nУРЫСЫБЗЭ|\nпсалъафэ|$)'
    m = re.search(pattern, text, re.DOTALL)
    return m.group(1).strip() if m else None

# Her sayfa için veri çek
sonuclar = []
for title, text in pages:
    # Boş veya özel sayfaları atla
    if not title or title.startswith(("MediaWiki", "Template", "Category", "Уикипедиэ")):
        continue

    kayit = {
        "form": title,
        "partOfSpeech": None,
        "ipa": None,
        "etymology": None,
        "derivation": None,
        "meaning": None,
        "examples": [],
        "english": None,
        "russian": None,
        "idioms": []
    }

    # 1. Sözcük türü
    pos_match = re.search(r'лъэпкъыгъуэ=(\w+)', text)
    if pos_match:
        pos = pos_match.group(1)
        pos_map = {
            "ЩЫӀЭЦӀЭ": "noun",
            "ПСАЛЪЭЗЭПХА": "verb",
            "ПСАЛЪЭЗЭПХАЩӀЭ": "adjective",
            "ПСАЛЪЭЗЭПХАЗЭ": "adverb",
            "ПСАЛЪЭЗЭПХАПӀЭ": "postposition",
            "ПСАЛЪЭЗЭПХАЦӀЭ": "pronoun",
            "ПСАЛЪЭЗЭПХАБЖЬ": "numeral",
            "ПСАЛЪЭЗЭПХАГЪЭ": "conjunction"
        }
        kayit["partOfSpeech"] = pos_map.get(pos, pos)

    # 2. IPA
    ipa_match = re.search(r"IPA \['([^']+)'\]", text)
    if ipa_match:
        kayit["ipa"] = f"/{ipa_match.group(1)}/"

    # 3. Etimoloji
    kayit["etymology"] = extract_section(text, "ЭТИМОЛОГИЕ")

    # 4. Heceleme (ПСАЛЪЭ ЛЪАБЖЬЭ)
    kayit["derivation"] = extract_section(text, "ПСАЛЪЭ ЛЪАБЖЬЭ")

    # 5. Anlam (МЫХЬЭНЭ)
    kayit["meaning"] = extract_section(text, "МЫХЬЭНЭ")

    # 6. Örnek cümleler (ЩАПХЪЭХЭР)
    ornek_metin = extract_section(text, "ЩАПХЪЭХЭР")
    if ornek_metin:
        cumleler = re.findall(r'^\s*(.+?)$', ornek_metin, re.MULTILINE)
        kayit["examples"] = [c.strip() for c in cumleler if len(c.strip()) > 20][:5]

    # 7. İngilizce (ИНДЖЫЛЫБЗЭ)
    kayit["english"] = extract_section(text, "ИНДЖЫЛЫБЗЭ")

    # 8. Rusça (УРЫСЫБЗЭ)
    kayit["russian"] = extract_section(text, "УРЫСЫБЗЭ")

    # 9. Deyimler (псалъафэ зэпыщӀахэр)
    deyim_metin = extract_section(text, "псалъафэ зыпыщӀахэр")
    if deyim_metin:
        deyimler = re.findall(r'^\s*(.+?)$', deyim_metin, re.MULTILINE)
        kayit["idioms"] = [d.strip() for d in deyimler if len(d.strip()) > 5][:10]

    sonuclar.append(kayit)

print(f"Parse edilen: {len(sonuclar)}")

# Kaydet
Path("_scripts/wiktionary_veri.json").write_text(
    json.dumps(sonuclar, ensure_ascii=False, indent=2),
    encoding="utf-8"
)
print(f"✅ Kaydedildi: _scripts/wiktionary_veri.json")

# Örnek
ornek = next((s for s in sonuclar if s["form"] == "гуфӀэ"), None)
if ornek:
    print(f"\n=== гуфӀэ ===")
    print(json.dumps(ornek, ensure_ascii=False, indent=2)[:1000])
