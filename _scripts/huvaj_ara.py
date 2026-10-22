import json
import sys
from pathlib import Path

# Huvaj JSON
huvaj_path = Path("public/data/28.Tur-Ady_Huvaj.json")
if not huvaj_path.exists():
    print(f"❌ Dosya yok: {huvaj_path}")
    sys.exit(1)

huvaj = json.loads(huvaj_path.read_text(encoding="utf-8"))

# Aranacak çiftler (Adıgece, Kabardeyce)
ciftler = [
    ("чъыгы", "жыг"),
    ("фэбжьэу", "фIэбжьэу"),
    ("фыжьы", "хуыжь"),
    ("бжьыныф", "бжьыныху"),
    ("ты-лэжьэ-щт", "ды-лэжьэ-нщ"),
    ("жъы", "жьы"),
    ("бжъэ", "бжьэ"),
    ("жъэн", "жьэн"),
    ("жъуэн", "вэн"),
    ("жъуагъуэ", "вагъуэ"),
    ("мафэ", "махуэ"),
    ("фабэ", "хуабэ"),
    ("нэшъу", "нэф"),
    ("нэф", "нэху"),
    ("шIын", "щIын"),
    ("шIэн", "щIэн"),
    ("гъашIэ", "гъащIэ"),
    ("шъхьэ", "щхьэ"),
    ("дышъэ", "дыщэ"),
    ("шъынэ", "щынэ"),
    ("шъабэ", "щабэ"),
    ("шъхьащэ", "щхьэшэ"),
    ("гукIэгъу", "гущIэгъу"),
    ("гупшысэ", "гупсысэ"),
    ("гушIо", "гуфIэ"),
]

print("=" * 70)
print("HUVAJ'DA ÇİFT ARAMA")
print("=" * 70)
print()

dogrulanmis = 0
dogrulanmamis = 0

for ady, kbd in ciftler:
    bulundu = []
    for madde, m in huvaj.items():
        html = m.get("full_definition_in_html", "") if isinstance(m, dict) else ""
        if not html:
            continue
        # Her iki form da geçiyor mu?
        if ady in html and kbd in html:
            bulundu.append(madde)
        # Veya sadece Adıgece geçiyor mu? (kaynak olabilir)
        elif ady in html:
            bulundu.append(f"{madde} (sadece Adıgece)")
    
    if bulundu:
        print(f"✅ {ady} -> {kbd}")
        for b in bulundu[:3]:
            print(f"     Huvaj: {b}")
        dogrulanmis += 1
    else:
        print(f"❌ {ady} -> {kbd}  (Huvaj'da yok)")
        dogrulanmamis += 1

print()
print("=" * 70)
print(f"Doğrulanmış: {dogrulanmis}")
print(f"Doğrulanmamış: {dogrulanmamis}")
print(f"Toplam: {dogrulanmis + dogrulanmamis}")
print("=" * 70)
