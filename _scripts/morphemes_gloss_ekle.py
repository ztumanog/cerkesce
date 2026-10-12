import json
from pathlib import Path

# 1) Oku
morph_path = Path('public/data/linguistic/morphemes.json')
morph = json.loads(morph_path.read_text(encoding='utf-8'))
mevcut_ids = {m.get('id', '') for m in morph}
mevcut_forms = {m.get('form', '') for m in morph}

# 2) Yeni morfemler
yeni = [
    # Isim cekim
    {"id": "M-R", "form": "-р", "gloss": "ABS", "meaning": "yalin/mutlak durum", "category": "case"},
    {"id": "M-M", "form": "-м", "gloss": "OBL/ERG", "meaning": "egik/ergatif durum", "category": "case"},
    {"id": "M-KHER", "form": "-хэр", "gloss": "PL.ABS", "meaning": "cogul mutlak", "category": "plural"},
    {"id": "M-KHEM", "form": "-хэм", "gloss": "PL.OBL", "meaning": "cogul egik", "category": "plural"},
    {"id": "M-K1E", "form": "-кӀэ", "gloss": "INS", "meaning": "vasita/arac durumu", "category": "case"},
    {"id": "M-UE", "form": "-уэ", "gloss": "PRED/ADV", "meaning": "yuklemsil/zarf-fiil", "category": "case"},
    {"id": "M-RE", "form": "-рэ", "gloss": "COORD", "meaning": "baglama eki", "category": "conjunction"},

    # Yon/konum onekleri
    {"id": "M-QE", "form": "къы-", "gloss": "DIR/ABL", "meaning": "konusana dogru", "category": "prefix"},
    {"id": "M-KHE", "form": "хэ-", "gloss": "IN/INESS", "meaning": "icinde bulunma", "category": "prefix"},
    {"id": "M-SH1E", "form": "щӀэ-", "gloss": "SUB/SUBESS", "meaning": "altinda bulunma", "category": "prefix"},
    {"id": "M-TE", "form": "те-", "gloss": "SUPER/SUPERESS", "meaning": "uzerinde bulunma", "category": "prefix"},
    {"id": "M-K1ERY", "form": "кӀэры-", "gloss": "AD/ADESS", "meaning": "yanina bitisik", "category": "prefix"},
    {"id": "M-BGHEDE", "form": "бгъэдэ-", "gloss": "AD/PROX", "meaning": "yaninda/yakininda", "category": "prefix"},
    {"id": "M-1U", "form": "Ӏу-", "gloss": "LAT/FRONT", "meaning": "onunde/hizasinda", "category": "prefix"},
    {"id": "M-ZHEDE", "form": "жьэдэ-", "gloss": "IN.MOUTH", "meaning": "agzin icinde", "category": "prefix"},
    {"id": "M-GHE", "form": "гъэ-", "gloss": "CAUS", "meaning": "ettirgenlik oneki", "category": "prefix"},

    # Sahis isaretleyicileri
    {"id": "M-SY", "form": "сы-", "gloss": "1SG", "meaning": "1. tekil sahis (ben)", "category": "person"},
    {"id": "M-U", "form": "у-", "gloss": "2SG", "meaning": "2. tekil sahis (sen)", "category": "person"},
    {"id": "M-I", "form": "и-", "gloss": "3SG", "meaning": "3. tekil sahis (o)", "category": "person"},
    {"id": "M-DY", "form": "ды-", "gloss": "1PL", "meaning": "1. cogul sahis (biz)", "category": "person"},
    {"id": "M-FY", "form": "фы-", "gloss": "2PL", "meaning": "2. cogul sahis (siz)", "category": "person"},
    {"id": "M-YA", "form": "я-", "gloss": "3PL", "meaning": "3. cogul sahis (onlar)", "category": "person"},

    # Zaman/kip sonekleri
    {"id": "M-SHCH", "form": "-щ", "gloss": "AFF/ASSERT", "meaning": "bildirme/onaylama", "category": "tense"},
    {"id": "M-K1YM", "form": "-къым", "gloss": "NEG", "meaning": "olumsuzluk", "category": "negation"},
    {"id": "M-NUSHCH", "form": "-нущ", "gloss": "FUT", "meaning": "gelecek zaman", "category": "tense"},
    {"id": "M-ASHCH", "form": "-ащ", "gloss": "PST", "meaning": "gecmis zaman", "category": "tense"},
    {"id": "M-ZH", "form": "-ж", "gloss": "REPET/REV", "meaning": "tekrar/geri donme", "category": "aspect"},
]

# 3) Ekle
eklenen = 0
for y in yeni:
    if y['id'] not in mevcut_ids and y['form'] not in mevcut_forms:
        morph.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']} ({y['gloss']})")
    else:
        print(f"Zaten var: {y['id']} - {y['form']}")

# 4) Yaz
morph_path.write_text(json.dumps(morph, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"\nEklenen: {eklenen}")
print(f"Toplam morfem: {len(morph)}")
