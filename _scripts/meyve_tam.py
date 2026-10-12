import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

yeni = [
    {"id": "L-MY1ERYSE", "form": "мыӀэрысэ", "literalMeaning": "elma", "conceptId": "APPLE"},
    {"id": "L-MY", "form": "мы", "literalMeaning": "yabani elma", "conceptId": "WILD_APPLE"},
    {"id": "L-KHUZH", "form": "кхъужь", "literalMeaning": "armut", "conceptId": "PEAR"},
    {"id": "L-KUZHY", "form": "къужъы", "literalMeaning": "armut (varyant)", "conceptId": "PEAR"},
    {"id": "L-SHCHYPTS1ESHCHYDE", "form": "щӀыпцӀэщӀыдэ", "literalMeaning": "badem", "conceptId": "ALMOND"},
    {"id": "L-KYTS1E", "form": "къыцэ", "literalMeaning": "badem (cagla)", "conceptId": "ALMOND"},
    {"id": "L-DZHESH", "form": "джэш", "literalMeaning": "fasulye", "conceptId": "BEAN"},
    {"id": "L-SHYBZHIY", "form": "шыбжий", "literalMeaning": "biber", "conceptId": "PEPPER"},
    {"id": "L-NASHE", "form": "нащэ", "literalMeaning": "salatalik", "conceptId": "CUCUMBER"},
    {"id": "L-NESHEBEGU", "form": "нэшэбэгу", "literalMeaning": "salatalik (varyant)", "conceptId": "CUCUMBER"},
    {"id": "L-KHUERZHE", "form": "хуэржэ", "literalMeaning": "kayisi", "conceptId": "APRICOT"},
    {"id": "L-ZENDALE", "form": "зэндалэ", "literalMeaning": "kayisi (varyant)", "conceptId": "APRICOT"},
    {"id": "L-BALIY", "form": "балий", "literalMeaning": "kiraz", "conceptId": "CHERRY"},
    {"id": "L-CHEREZ", "form": "чэрэз", "literalMeaning": "kiraz (varyant)", "conceptId": "CHERRY"},
    {"id": "L-FISHCHYN", "form": "фищын", "literalMeaning": "visne", "conceptId": "SOUR_CHERRY"},
]

eklenen = 0
for y in yeni:
    if y["id"] not in mevcut:
        y["partOfSpeech"] = "noun"
        y["wordFamilyId"] = "WF-FRUIT"
        y["corpusFrequency"] = 0
        y["notes"] = "C-11.3: meyve/sebze. Jonty, Abaze, Teshu."
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']} ({y['literalMeaning']})")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nEklenen: {eklenen}")
print(f"Toplam lexeme: {len(lex)}")
