import json
import re
from pathlib import Path

# Tüm JSON bloklarını oku (senin yapıştırdığın)
# Ama önce: TÜM veriyi tek JSON'a dönüştür

# 1. KÖKLER (100+)
kokler = [
  {"form": "гу", "ipa": "/ɡʷə/", "literalMeaning": "kalp / zihin / merkez", "rootIds": ["R-GU"], "wordFamilyId": "WF-GU", "derivation": {"rule": "root", "components": ["гу"]}},
  # ... (100+ kök)
]

# 2. SOMATİK (30) - conceptId ile
somatik = [
  {"form": "гу", "ipa": "/ɡʷə/", "literalMeaning": "kalp / zihin / merkez", "conceptId": "HEART"},
  # ... (30 kök)
]

# 3. DOĞA (20) - conceptId ile
doga = [
  {"form": "псы", "ipa": "/psə/", "literalMeaning": "su / nehir", "conceptId": "WATER"},
  # ... (20 kök)
]

# 4. AKRABALIK - conceptId ile
akrabalik = [
  {"form": "адэ", "ipa": "/aːda/", "literalMeaning": "baba", "conceptId": "FATHER"},
  # ... (17 kök)
]

# 5. HAYVAN (30) - conceptId ile
hayvan = [
  {"form": "шы", "ipa": "/ʃə/", "literalMeaning": "at", "conceptId": "HORSE"},
  # ... (30 kök)
]

# 6. KELİME AİLELERİ (6 aile)
kelime_aileleri = [
  # псы ailesi (20 kelime)
  # гу ailesi (20 kelime)
  # нэ ailesi (15 kelime)
  # Ӏэ ailesi (15 kelime)
  # лъэ ailesi (15 kelime)
  # щхьэ ailesi (15 kelime)
  # тхьэ ailesi (12 kelime)
  # унэ ailesi (12 kelime)
  # мафӀэ ailesi (7 kelime)
]

print(f"kokler: {len(kokler)}")
print(f"somatik: {len(somatik)}")
print(f"doga: {len(doga)}")
print(f"akrabalik: {len(akrabalik)}")
print(f"hayvan: {len(hayvan)}")
print(f"kelime_aileleri: {len(kelime_aileleri)}")
