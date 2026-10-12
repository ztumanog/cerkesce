import json
from pathlib import Path

# Dosyaları oku
wf_path = Path('public/data/linguistic/word_families.json')
lex_path = Path('public/data/linguistic/lexemes.json')
roots_path = Path('public/data/linguistic/roots.json')

wf = json.loads(wf_path.read_text(encoding='utf-8'))
lex = json.loads(lex_path.read_text(encoding='utf-8'))
roots = json.loads(roots_path.read_text(encoding='utf-8'))

# Mevcut ID'ler
wf_ids = {w['id'] for w in wf}
lex_ids = {l['id'] for l in lex}
root_ids = {r['id'] for r in roots}

print(f"Mevcut: {len(wf)} aile, {len(lex)} lexeme, {len(roots)} root")

# === YENI ROOT'LAR ===
yeni_rootlar = [
    {"id": "R-KHUMEN", "form": "хъум", "meaning": "korumak", "notes": "C-9.3 yeni kok"},
    {"id": "R-SHQE", "form": "шъыпкъ", "meaning": "dogru/gercek", "notes": "C-9.3 yeni kok"},
]

for r in yeni_rootlar:
    if r['id'] not in root_ids:
        roots.append(r)
        print(f"  + Root: {r['id']}")

# === YENI AILELER ===
yeni_aileler = [
    {
        "id": "WF-KHUMEN",
        "rootId": "R-KHUMEN",
        "morphemeIds": [],
        "lexemeIds": ["L-KHUMEN", "L-KUEUKHUMEN", "L-KUEKHUMEN", "L-KKHEKHUME"],
        "productivity": {"totalLexemes": 4, "corpusFrequency": 130, "mostFrequentLexemeId": "L-KHUMEN"},
        "dialectNote": {"adyghe": "хъумэн", "kabardian": "хъумэн", "note": "Her iki lehcede ayni"},
        "notes": "C-9.3 yeni aile. Korumak kok ailesi. Wiktionary kaniti."
    },
    {
        "id": "WF-SHQE",
        "rootId": "R-SHQE",
        "morphemeIds": [],
        "lexemeIds": ["L-SHQE", "L-SHQAGHE", "L-SHQEU", "L-SHQEM"],
        "productivity": {"totalLexemes": 4, "corpusFrequency": 2130, "mostFrequentLexemeId": "L-SHQE"},
        "dialectNote": {"adyghe": "шъыпкъэ", "kabardian": "щыпкъэ", "note": "Ses denkligi: шъ -> щ"},
        "notes": "C-9.3 yeni aile. Dogru/gercek kok ailesi. Yuksek frekans."
    },
]

for a in yeni_aileler:
    if a['id'] not in wf_ids:
        wf.append(a)
        print(f"  + Aile: {a['id']}")

# === YENI LEXEME'LER ===
yeni_lexemeler = [
    # WF-KHUMEN
    {"id": "L-KHUMEN", "form": "хъумэн", "ipa": "/χʷəman/", "literalMeaning": "korumak",
     "derivation": {"rootIds": ["R-KHUMEN"], "morphemeIds": [], "rule": "root"},
     "wordFamilyId": "WF-KHUMEN", "conceptId": "PROTECT",
     "dialectVariants": {"adyghe": "хъумэн", "kabardian": "хъумэн"},
     "corpusFrequency": 91, "corpusFrequencyAdy": 0, "corpusFrequencyKbd": 91,
     "notes": "Korumak. C-9.3 yeni lexeme."},
    {"id": "L-KUEUKHUMEN", "form": "къэухъумэн", "ipa": "/qʷawχʷəman/", "literalMeaning": "savunmak",
     "derivation": {"rootIds": ["R-KHUMEN"], "morphemeIds": [], "rule": "compound"},
     "wordFamilyId": "WF-KHUMEN", "conceptId": "DEFEND",
     "dialectVariants": {"adyghe": "къэухъумэн", "kabardian": "къэухъумэн"},
     "corpusFrequency": 36, "corpusFrequencyAdy": 36, "corpusFrequencyKbd": 0,
     "notes": "Savunmak. C-9.3 yeni lexeme."},
    {"id": "L-KUEKHUMEN", "form": "къэхъумэн", "ipa": "/qʷaχʷəman/", "literalMeaning": "savunmak (KBD)",
     "derivation": {"rootIds": ["R-KHUMEN"], "morphemeIds": [], "rule": "compound"},
     "wordFamilyId": "WF-KHUMEN", "conceptId": "DEFEND",
     "dialectVariants": {"adyghe": "къэухъумэн", "kabardian": "къэхъумэн"},
     "corpusFrequency": 3, "corpusFrequencyAdy": 0, "corpusFrequencyKbd": 3,
     "notes": "Savunmak (KBD varyanti). C-9.3 yeni lexeme."},
    {"id": "L-KKHEKHUME", "form": "кхъэхъумэ", "ipa": "/q͡χaχʷəma/", "literalMeaning": "mezarlik bekcisi",
     "derivation": {"rootIds": ["R-KHUMEN"], "morphemeIds": [], "rule": "compound"},
     "wordFamilyId": "WF-KHUMEN", "conceptId": "GRAVEKEEPER",
     "dialectVariants": {"adyghe": "кхъэхъумэ", "kabardian": "кхъэхъумэ"},
     "corpusFrequency": 0, "corpusFrequencyAdy": 0, "corpusFrequencyKbd": 0,
     "notes": "Mezarlik bekcisi. C-9.3 yeni lexeme."},
    # WF-SHQE
    {"id": "L-SHQE", "form": "шъыпкъэ", "ipa": "/ʂəpqʷʼa/", "literalMeaning": "dogru",
     "derivation": {"rootIds": ["R-SHQE"], "morphemeIds": [], "rule": "root"},
     "wordFamilyId": "WF-SHQE", "conceptId": "TRUE",
     "dialectVariants": {"adyghe": "шъыпкъэ", "kabardian": "щыпкъэ"},
     "corpusFrequency": 1392, "corpusFrequencyAdy": 1392, "corpusFrequencyKbd": 30,
     "notes": "Dogru, gercek. C-9.3 yeni lexeme. Yuksek frekans."},
    {"id": "L-SHQAGHE", "form": "шъыпкъагъэ", "ipa": "/ʂəpqʷʼaʁa/", "literalMeaning": "dogruluk",
     "derivation": {"rootIds": ["R-SHQE"], "morphemeIds": [], "rule": "suffix"},
     "wordFamilyId": "WF-SHQE", "conceptId": "TRUTH",
     "dialectVariants": {"adyghe": "шъыпкъагъэ", "kabardian": "щыпкъагъэ"},
     "corpusFrequency": 392, "corpusFrequencyAdy": 392, "corpusFrequencyKbd": 205,
     "notes": "Dogruluk. C-9.3 yeni lexeme."},
    {"id": "L-SHQEU", "form": "шъыпкъэу", "ipa": "/ʂəpqʷʼaw/", "literalMeaning": "dogru olarak",
     "derivation": {"rootIds": ["R-SHQE"], "morphemeIds": [], "rule": "suffix"},
     "wordFamilyId": "WF-SHQE", "conceptId": "TRULY",
     "dialectVariants": {"adyghe": "шъыпкъэу", "kabardian": "щыпкъэу"},
     "corpusFrequency": 214, "corpusFrequencyAdy": 214, "corpusFrequencyKbd": 30,
     "notes": "Dogru olarak. C-9.3 yeni lexeme."},
    {"id": "L-SHQEM", "form": "шъыпкъэм", "ipa": "/ʂəpqʷʼam/", "literalMeaning": "dogruya",
     "derivation": {"rootIds": ["R-SHQE"], "morphemeIds": [], "rule": "suffix"},
     "wordFamilyId": "WF-SHQE", "conceptId": "TRUTH",
     "dialectVariants": {"adyghe": "шъыпкъэм", "kabardian": "щыпкъэм"},
     "corpusFrequency": 132, "corpusFrequencyAdy": 132, "corpusFrequencyKbd": 0,
     "notes": "Dogruya. C-9.3 yeni lexeme."},
]

for l in yeni_lexemeler:
    if l['id'] not in lex_ids:
        lex.append(l)
        print(f"  + Lexeme: {l['id']}")

# Kaydet
roots_path.write_text(json.dumps(roots, ensure_ascii=False, indent=2), encoding='utf-8')
wf_path.write_text(json.dumps(wf, ensure_ascii=False, indent=2), encoding='utf-8')
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding='utf-8')

print(f"\nYeni durum: {len(wf)} aile, {len(lex)} lexeme, {len(roots)} root")
