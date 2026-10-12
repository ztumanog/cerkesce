import json
from pathlib import Path
from datetime import datetime

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-fear-inflected-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

# --- FEAR DOGRULANMIS CEKIRDEK ---
FEAR_CORE = {
    "гузэвэгъуэ": {"tr": "endişe, stres, telaş", "kaynak": 22},
    "гузавэ":     {"tr": "telaş, endişe", "kaynak": 16},
    "гужьеигъуэ": {"tr": "dehşet, panik, umutsuzluk", "kaynak": 14},
    "гущтэ":      {"tr": "korku refleksi, korku", "kaynak": 16},
    "гузэвэн":    {"tr": "endişelenmek", "kaynak": 12},
    "гулэзын":    {"tr": "kaygılanmak, endişelenmek", "kaynak": 6},
    "щыщтэн":     {"tr": "birinden korkmak", "kaynak": 9},
    "гузэжъогъу": {"tr": "telaş, endişe (Adigece)", "kaynak": 13},
    "гужьей":     {"tr": "telaş, panik", "kaynak": 3},
    "къэщтэн":    {"tr": "aniden korkmak, ürkmek", "kaynak": 23},
    "щынэн":      {"tr": "korkmak, ürkmek", "kaynak": 12},
    "гуиих":      {"tr": "korkunç, ürkütücü", "kaynak": 4},
    "шынэ":       {"tr": "korku (Kabardeyce)", "kaynak": 93},
}

# --- FEAR TUREV AILESI (inflected adaylari) ---
FEAR_INFLECTED = [
    # гузэвэгъуэ ailesi
    ("гузэвэгъуэ щӀыӀэ", "гузэвэгъуэ", "dehşete düşmek"),
    ("гузэвэгъуэм хэту", "гузэвэгъуэ", "tehlikede"),
    ("гузэвэгъуэкӀэ", "гузэвэгъуэ", "aceleyle"),
    ("гузэвэгъуэ хэдзэн", "гузэвэгъуэ", "telaşlandırmak"),
    # гущтэ ailesi
    ("гущтэ-гулэ", "гущтэ", "ürkek (kişi)"),
    ("гущтэ-гулэу", "гущтэ", "ürkekçe"),
    ("гущтэ щӀын", "гущтэ", "ürkekleşmek"),
    ("гущтэпкӀ", "гущтэ", "-"),
    # гузавэ ailesi
    ("гузавэу", "гузавэ", "telaşla"),
    ("гузавэгъэӀу", "гузавэ", "alarm"),
    # гужьеигъуэ ailesi
    ("гужьеигъуэу", "гужьеигъуэ", "dehşetle"),
    ("гужьеигъуэ етын", "гужьеигъуэ", "dehşete düşürmek"),
    # щынэ ailesi (Adigece)
    ("щынэгъончъэ", "щынэ", "güvenli"),
    ("щынэгъончъагъ", "щынэ", "güvenlik"),
    ("щынэжьыгъэ", "щынэ", "korkmuş"),
    ("щынэкъэрабгъэ", "щынэ", "korkak"),
    ("щынэкъэрабгъагъэ", "щынэ", "korkaklık"),
    ("щынэрей", "щынэ", "korkak"),
    ("щынэуз", "щынэ", "fobi"),
    ("щынагъо", "щынэ", "tehlike"),
    # шынэ ailesi (Kabardeyce)
    ("шынэгъуэншэ", "шынэ", "güvenli"),
    ("шынэгъуэншагъэ", "шынэ", "güvenlik"),
    ("шынэкъэрабгъэ", "шынэ", "korkak"),
    ("шынэкъэрабгъагъэ", "шынэ", "korkaklık"),
    ("шынэ уз", "шынэ", "dehşet"),
    ("шынэу", "шынэ", "korkuyla"),
    ("шынэ зымыщӀэ", "шынэ", "korkusuz"),
    # гулэзын ailesi
    ("гулэз", "гулэзын", "endişelenmek"),
    # гузэвэн ailesi
    ("мэгузавэ", "гузэвэн", "endişelenmek"),
    ("гузэващ", "гузэвэн", "endişelendi"),
]

# --- _inflected klasoru ---
inflected_dir = Path("public/data/linguistic/_inflected")
inflected_dir.mkdir(parents=True, exist_ok=True)

# --- fear_core.json ---
core_data = []
for form, info in FEAR_CORE.items():
    core_data.append({
        "form": form,
        "conceptId": "FEAR",
        "subConceptId": "EMOTION",
        "taxonomyFamily": "Duygu & Zihin",
        "literalMeaning": info["tr"],
        "kaynakSayisi": info["kaynak"],
        "verified": True
    })

core_path = inflected_dir / "fear_core.json"
core_path.write_text(json.dumps(core_data, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Yazildi: {core_path} ({len(core_data)} kayit)")

# --- fear_surface.json (inflected) ---
surface_data = []
for surface, lemma, tr in FEAR_INFLECTED:
    surface_data.append({
        "surface": surface,
        "lemma": lemma,
        "conceptId": "FEAR",
        "literalMeaning": tr,
        "note": "FEAR turev/cekim formu"
    })

surface_path = inflected_dir / "fear_surface.json"
surface_path.write_text(json.dumps(surface_data, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Yazildi: {surface_path} ({len(surface_data)} kayit)")

# --- lexemes.json'da FEAR kayitlarini isaretle ---
FEAR_FORMS = set(FEAR_CORE.keys())
sayac = 0
for l in lex:
    form = l.get("form", "")
    if form in FEAR_FORMS and l.get("conceptId") == "FEAR":
        l["verified"] = True
        l["kaynakSayisi"] = FEAR_CORE[form]["kaynak"]
        sayac += 1

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nGuncellendi: {lex_path.name} ({sayac} kayit isaretlendi)")
print(f"\nOK - {len(core_data)} cekirdek, {len(surface_data)} turev")
