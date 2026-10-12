import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

# Morphemes.json'a yeni morfemleri ekle
morph_path = Path("public/data/linguistic/morphemes.json")
morphs = json.loads(morph_path.read_text(encoding="utf-8"))
mevcut = {m["id"] for m in morphs}

yeni = [
    # Faktitif onekleri
    {"id": "M-UY", "form": "уы", "gloss": "faktitif (yapmak)", "type": "grammatical",
     "dialect": "kabardian", "notes": "C-11.4: faktitif oneki."},
    {"id": "M-GHE2", "form": "гъэ", "gloss": "kauzatif (yaptirmak)", "type": "grammatical",
     "dialect": "kabardian", "notes": "C-11.4: kauzatif oneki."},
    
    # Lokal preverbler
    {"id": "M-PE3", "form": "пэ", "gloss": "on, karsi", "type": "grammatical",
     "dialect": "kabardian", "notes": "C-11.4: lokal preverb. Kok: пэ (burun)."},
    {"id": "M-LHE2", "form": "лъэ", "gloss": "arkasindan", "type": "grammatical",
     "dialect": "kabardian", "notes": "C-11.4: lokal preverb. Kok: лъэ (ayak)."},
    {"id": "M-KUE4", "form": "къуэ", "gloss": "yaninda", "type": "grammatical",
     "dialect": "kabardian", "notes": "C-11.4: lokal preverb. Kok: къуэ (agiz)."},
    {"id": "M-GU4", "form": "гу", "gloss": "yaninda", "type": "grammatical",
     "dialect": "kabardian", "notes": "C-11.4: lokal preverb. Kok: гу (kalp)."},
    {"id": "M-BLE", "form": "блэ", "gloss": "yanindan", "type": "grammatical",
     "dialect": "kabardian", "notes": "C-11.4: lokal preverb. Kok: блэ (kol)."},
    {"id": "M-CH1E", "form": "ч1э", "gloss": "altinda", "type": "grammatical",
     "dialect": "kabardian", "notes": "C-11.4: lokal preverb. Kok: ч1э (dip)."},
    {"id": "M-K1UETS1Y", "form": "к1уэц1ы", "gloss": "icinde", "type": "grammatical",
     "dialect": "kabardian", "notes": "C-11.4: lokal preverb."},
    {"id": "M-PKHY", "form": "пхы", "gloss": "icinden", "type": "grammatical",
     "dialect": "kabardian", "notes": "C-11.4: lokal preverb."},
    
    # Birliktelik
    {"id": "M-DE2", "form": "дэ", "gloss": "birlikte", "type": "grammatical",
     "dialect": "kabardian", "notes": "C-11.4: birliktelik oneki."},
    
    # Karsiliklilik
    {"id": "M-ZE", "form": "зэ", "gloss": "karsilikli", "type": "grammatical",
     "dialect": "kabardian", "notes": "C-11.4: karsiliklilik oneki."},
    
    # Versiyon/Potansiyel
    {"id": "M-KHUE3", "form": "хуэ", "gloss": "icin (versiyon/potansiyel)", "type": "grammatical",
     "dialect": "kabardian", "notes": "C-11.4: versiyon/potansiyel oneki."},
    
    # Yon
    {"id": "M-KE", "form": "къэ", "gloss": "konusana dogru", "type": "grammatical",
     "dialect": "kabardian", "notes": "C-11.4: yon oneki."},
    {"id": "M-NE2", "form": "нэ", "gloss": "konusandan uzaga", "type": "grammatical",
     "dialect": "kabardian", "notes": "C-11.4: yon oneki."},
    
    # Donusluluk
    {"id": "M-ZE2", "form": "зэ", "gloss": "donusluluk", "type": "grammatical",
     "dialect": "kabardian", "notes": "C-11.4: donusluluk oneki."},
]

eklenen = 0
for m in yeni:
    if m["id"] not in mevcut:
        morphs.append(m)
        eklenen += 1
        print(f"Eklendi: {m['id']} - {m['form']}")

morph_path.write_text(json.dumps(morphs, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nEklenen: {eklenen}")
print(f"Toplam morfem: {len(morphs)}")
