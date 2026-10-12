import json
from pathlib import Path

bitkiler = [
    {"kabardeyce": "адыгэ бжьыныху", "turkce": "Adıge sarımsağı"},
    {"kabardeyce": "адыгэ къэб", "turkce": "İnce kabuklu Adıge kabağı"},
    {"kabardeyce": "андэрэф", "turkce": "Kamış"},
    {"kabardeyce": "андзыш", "turkce": "Sığırkuyruğu otu"},
    {"kabardeyce": "аIуудз", "turkce": "Zambak"},
    {"kabardeyce": "гъэшудз", "turkce": "Yara otu / Çok yapraklı sarı yonca"},
    {"kabardeyce": "гъуэжьытх", "turkce": "Katırtırnağı"},
    {"kabardeyce": "дахэтхьэпэ", "turkce": "Siyah ban otu"},
    {"kabardeyce": "дыгъэгъазэ", "turkce": "Ayçiçeği"},
    {"kabardeyce": "дэжьей", "turkce": "Fındık"},
    {"kabardeyce": "жьыху", "turkce": "Deniz lavantası"},
    {"kabardeyce": "зэхьфиран", "turkce": "Aspir / Yalancı safran"},
    {"kabardeyce": "мэзым", "turkce": "Yaban elması meyvesi"},
    {"kabardeyce": "шэдыгъуэ", "turkce": "Vişne"},
    {"kabardeyce": "фIарийтхьэмпэ", "turkce": "Sinir otu"},
    {"kabardeyce": "щхъуэмч", "turkce": "Kestane"},
    {"kabardeyce": "щIыгыныху", "turkce": "Kereviz"},
    {"kabardeyce": "Iэврэчин", "turkce": "Mısır"},
    {"kabardeyce": "щIакхъуэгъэтэдж", "turkce": "Şerbetçi otu"},
    {"kabardeyce": "жыг", "turkce": "Ağaç"},
    {"kabardeyce": "удз", "turkce": "Ot / Bitki"},
    {"kabardeyce": "гъэгъа", "turkce": "Çiçek"},
    {"kabardeyce": "бжьын", "turkce": "Soğan"},
    {"kabardeyce": "хьэIу", "turkce": "Arpa"},
    {"kabardeyce": "гуэдз", "turkce": "Buğday"},
    {"kabardeyce": "пындж", "turkce": "Pirinç"},
    {"kabardeyce": "мыIэрысэ", "turkce": "Elma"},
    {"kabardeyce": "къужъ", "turkce": "Armut"},
    {"kabardeyce": "балъкъэ", "turkce": "Kiraz"},
    {"kabardeyce": "сэнаниш", "turkce": "Üzüm"},
    {"kabardeyce": "пхъэгулъ", "turkce": "Fidan / Çalı"},
    {"kabardeyce": "тхьэмпэ", "turkce": "Yaprak"}
]

# Temizle: I → І (Kiril), 1 → Ӏ (palochka)
def temizle(s):
    return (s.replace("I", "І")
             .replace("1", "Ӏ")
             .replace("  ", " ")
             .strip())

# conceptId haritası
concept_map = {
    "жыг": "TREE", "удз": "GRASS", "гъэгъа": "FLOWER",
    "бжьын": "ONION", "хьэIу": "BARLEY", "гуэдз": "WHEAT",
    "пындж": "RICE", "мыIэрысэ": "APPLE", "къужъ": "PEAR",
    "балъкъэ": "CHERRY", "сэнаниш": "GRAPE", "тхьэмпэ": "LEAF",
    "дэжьей": "HAZELNUT", "шэдыгъуэ": "SOUR_CHERRY",
    "щхъуэмч": "CHESTNUT", "дыгъэгъазэ": "SUNFLOWER",
    "Iэврэчин": "CORN", "щIыгыныху": "CELERY",
    "андэрэф": "REED", "фIарийтхьэмпэ": "PLANTAIN",
}

# Lexemes
lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
lex_forms = {l.get("form", ""): l for l in lex if l.get("form")}
print(f"Lexemes: {len(lex)}")

guncellenen = 0
yeni_eklenen = 0

for b in bitkiler:
    form = temizle(b["kabardeyce"])
    if form in lex_forms:
        l = lex_forms[form]
        if not l.get("conceptId") and form in concept_map:
            l["conceptId"] = concept_map[form]
            guncellenen += 1
        if not l.get("literalMeaning"):
            l["literalMeaning"] = b["turkce"]
    else:
        lex.append({
            "id": f"L-PLANT-{yeni_eklenen:03d}",
            "form": form,
            "literalMeaning": b["turkce"],
            "conceptId": concept_map.get(form),
            "partOfSpeech": "noun",
            "rootIds": ["R-PLANT"],
            "wordFamilyId": "WF-PLANT",
            "notes": "Bitki (Plant)"
        })
        yeni_eklenen += 1

print(f"Güncellenen: {guncellenen}")
print(f"Yeni eklenen: {yeni_eklenen}")
print(f"✅ Toplam: {len(lex)}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
