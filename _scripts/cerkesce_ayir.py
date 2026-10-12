import json
import re
from pathlib import Path

LEX_PATH = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX_PATH.read_text(encoding="utf-8"))

# Çerkesçe karakterler (Adığce/Kabardey)
CERKESCE_KARAKTERLER = r'[ӏӀ]'

def cerkesce_mi(text):
    """Metin Çerkesçe karakter içeriyor mu?"""
    if not text:
        return False
    return bool(re.search(CERKESCE_KARAKTERLER, text))

# Çerkesçe anlamları ayır
cerkesce_sayisi = 0
kalan_sayisi = 0

for l in lex:
    anlam = l.get("literalMeaning") or ""
    if not anlam:
        continue
    
    if cerkesce_mi(anlam):
        # Çerkesçe anlam → ayrı alana taşı
        l["literalMeaningAdy"] = anlam
        # literalMeaning'i boşalt (Türkçe anlam yoksa)
        l["literalMeaning"] = ""
        cerkesce_sayisi += 1
    else:
        kalan_sayisi += 1

LEX_PATH.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"=== ÇERKESÇE ANLAM AYIRMA RAPORU ===")
print(f"Çerkesçe anlam (literalMeaningAdy): {cerkesce_sayisi}")
print(f"Türkçe/Rusça/İngilizce (literalMeaning): {kalan_sayisi}")
print(f"Toplam: {cerkesce_sayisi + kalan_sayisi}")
