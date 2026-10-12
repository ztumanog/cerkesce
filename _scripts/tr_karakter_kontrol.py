import json
import re
from pathlib import Path

LEX_PATH = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX_PATH.read_text(encoding="utf-8"))

# Türkçe karakter düzeltme tablosu (ASCII → Türkçe)
TR_KARAKTER = {
    'akilli': 'akıllı',
    'ofke': 'öfke',
    'dusunce': 'düşünce',
    'kismi': 'kısmı',
    'basin': 'başın',
    'ici': 'içi',
    'bas': 'baş',
    'sima': 'sima',
    # ... diğerleri
}

# Daha genel bir yaklaşım: kelime bazlı düzeltme
# Ama önce sorunun boyutunu görelim
def tr_karakter_var_mi(text):
    """Türkçe karakter içeriyor mu?"""
    return bool(re.search(r'[ıöüşğçİ]', text, re.IGNORECASE))

# Kaç kayıtta Türkçe karakter sorunu var?
sorunlu = []
for l in lex:
    anlam = l.get("literalMeaning") or ""
    # ASCII'ye dönüşmüş Türkçe kelimeleri ara
    if re.search(r'\b(akilli|ofke|dusunce|kismi|basin|ici|degil|soz|goz|dis|sac|yuz|kalp|can|kan|su|ates|toprak|hava)\b', anlam, re.IGNORECASE):
        sorunlu.append((l.get("form"), anlam[:60]))

print(f"=== TÜRKÇE KARAKTER SORUNU OLAN KAYITLAR: {len(sorunlu)} ===\n")
for form, anlam in sorunlu[:30]:
    print(f"  {form:20s} → {anlam}")
