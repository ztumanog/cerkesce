import json
from pathlib import Path

LEX_PATH = Path("public/data/linguistic/lexemes.json")

# Farklı encoding'lerle oku
encodings = ['utf-8', 'utf-8-sig', 'windows-1252', 'iso-8859-9', 'cp1254', 'latin-1']

for enc in encodings:
    try:
        with open(LEX_PATH, 'r', encoding=enc) as f:
            lex = json.load(f)
        # İlk IPA'yı göster
        for l in lex:
            ipa = l.get("ipa")
            if ipa and 'гугъу' in (l.get("form") or ""):
                print(f"Encoding: {enc}")
                print(f"  IPA: {ipa}")
                break
        break
    except Exception as e:
        print(f"Encoding {enc}: HATA - {e}")
