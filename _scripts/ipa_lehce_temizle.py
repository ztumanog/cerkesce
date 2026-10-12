import json
import re
from pathlib import Path

LEX_PATH = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX_PATH.read_text(encoding="utf-8"))

# ===== 1. IPA TEMİZLEME =====
def temizle_ipa(ipa):
    if not ipa:
        return None
    text = str(ipa).strip()
    
    # Dosya yolu içeriyorsa geçersiz
    if re.search(r'\[File:|\[Dosya:|\.ogg|\.wav|\.mp3|\.oga', text):
        return None
    
    # Başında ve sonunda / yoksa ekle
    if text and not text.startswith('/'):
        text = '/' + text
    if text and not text.endswith('/'):
        text = text + '/'
    
    return text or None

# ===== 2. LEHÇE ETİKETİ TEMİZLEME =====
LEHCE_ETIKETLERI = [
    r'мало-каб\.?',
    r'больше-каб\.?',
    r'кубано-зеленчукские',
    r'кубано-зеленчук\.?',
    r'каб\.?',
    r'адыг\.?',
    r'адыгейск\.?',
    r'черкес\.?',
    r'шапсуг\.?',
    r'бжедуг\.?',
    r'темиргоев\.?',
    r'абадз\.?',
    r'besleney\.?',
    r'beslenei\.?',
]

def temizle_lehce(anlam):
    if not anlam:
        return anlam
    text = str(anlam)
    for pattern in LEHCE_ETIKETLERI:
        text = re.sub(pattern, '', text, flags=re.IGNORECASE)
    text = re.sub(r'\s+', ' ', text).strip()
    text = re.sub(r'^[\s,;:.\-–—]+', '', text)
    text = re.sub(r'[\s,;:.\-–—]+$', '', text)
    return text

# ===== UYGULA =====
ipa_duzeltme = 0
lehce_duzeltme = 0

for l in lex:
    # IPA temizle
    eski_ipa = l.get("ipa")
    yeni_ipa = temizle_ipa(eski_ipa)
    if yeni_ipa != eski_ipa:
        l["ipa"] = yeni_ipa
        ipa_duzeltme += 1
        if ipa_duzeltme <= 10:
            print(f"  IPA: {l.get('form'):20s} → {yeni_ipa}")
    
    # Lehçe etiketi temizle
    eski_anlam = l.get("literalMeaning") or ""
    yeni_anlam = temizle_lehce(eski_anlam)
    if yeni_anlam != eski_anlam:
        l["literalMeaning"] = yeni_anlam
        lehce_duzeltme += 1
        if lehce_duzeltme <= 10:
            print(f"  ANLAM: {l.get('form'):20s} → '{eski_anlam[:30]}' → '{yeni_anlam[:30]}'")

LEX_PATH.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"\n=== RAPOR ===")
print(f"IPA temizlenen: {ipa_duzeltme}")
print(f"Lehçe etiketi temizlenen: {lehce_duzeltme}")
