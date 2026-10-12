import json
import re
from pathlib import Path

LEX_PATH = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX_PATH.read_text(encoding="utf-8"))

def gecerli_ipa(ipa):
    """IPA geçerli mi kontrol eder."""
    if not ipa:
        return False
    text = str(ipa).strip()
    
    # Boş veya tire
    if text in ['—', '-', '']:
        return False
    
    # Rusça/İngilizce metin içeriyorsa geçersiz
    if re.search(r'русский|инджылыбзэ|английский', text, re.IGNORECASE):
        return False
    
    # Bozuk karakter içeriyorsa geçersiz
    if re.search(r'[╩╔╗╚╝║╠╣╦╩╬]', text):
        return False
    
    # Çerkesçe yazı içeriyorsa geçersiz (IPA değil)
    if re.search(r'[Ӏӏ]', text):
        return False
    
    # /.../ formatında mı?
    if not (text.startswith('/') and text.endswith('/')):
        return False
    
    return True

def temizle_ipa(ipa):
    """Geçersiz IPA'yı None yapar."""
    if not ipa:
        return None
    if gecerli_ipa(ipa):
        return str(ipa).strip()
    return None

# Tüm kayıtların IPA'sını temizle
temizlenen = 0
for l in lex:
    eski = l.get("ipa")
    yeni = temizle_ipa(eski)
    if yeni != eski:
        l["ipa"] = yeni
        temizlenen += 1
        if temizlenen <= 20:
            print(f"  {l.get('form'):20s} → {eski} → {yeni}")

LEX_PATH.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\n✅ {temizlenen} bozuk IPA temizlendi.")
