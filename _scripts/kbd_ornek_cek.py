import json
import re
from pathlib import Path

# KBD sözlükleri (dil kodu Kbd olanlar)
KBD_SOZLUKLER = [
    "1.Ady-Ady_AP.json",
    "5.Ady-Rus_Qarden.json",
    "6.Ady-Rus_Sherdjes.json",
    "13.Kbd-Ar-Jonty.json",
    "14.Kbd-En-2-Jonty.json",
    "15.Kbd-En-Jonty.json",
    "16.Kbd-En-Ziwar.json",
    "17.Kbd-En_Amjad.json",
    "18.Kbd-Ru&En.json",
    "19.Kbd-Ru-2-Jonty.json",
    "20.Kbd-Ru-Jonty.json",
    "21.Kbd-Tu-Jonty.json",
    "22.Ru-Kbd-Jonty.json",
    "25.Rus-Ady_UASP.json",
    "26.Tu-Kbd-Jonty.json",
    "27.Tur-Ady_Abaze.json",
    "32.Rus-Kbd_Nalchik_2013.json",
]

sozluk_dir = Path("public/data")
tum_ornekler = {}

for fname in KBD_SOZLUKLER:
    f = sozluk_dir / fname
    if not f.exists():
        print(f"❌ {fname} yok")
        continue

    data = json.loads(f.read_text(encoding="utf-8"))
    if not isinstance(data, dict) or "words" not in data:
        continue

    words = data["words"]
    if not isinstance(words, dict):
        continue

    sayac = 0
    for word, item in words.items():
        if not isinstance(item, dict):
            continue

        html = item.get("full_definition_in_html", "")
        if html and "◊" in html:
            text = re.sub(r'<[^>]+>', ' ', html)
            text = text.replace("&nbsp;", " ").replace("&amp;", "&")
            parts = re.split(r'◊', text)
            ornekler = []
            for part in parts[1:]:
                cumle = part.split("-")[0].strip()
                cumle = re.sub(r'\s+', ' ', cumle)
                if len(cumle) > 10:
                    ornekler.append(cumle[:200])
            if ornekler:
                if word not in tum_ornekler:
                    tum_ornekler[word] = {"examples": [], "sources": []}
                tum_ornekler[word]["examples"].extend(ornekler[:3])
                tum_ornekler[word]["sources"].append(fname)
                sayac += 1

    print(f"  {fname:40s} | {sayac:5d} örnek")

print(f"\nToplam KBD örnek: {len(tum_ornekler)}")

# Kaydet
Path("_scripts/diamond_ornekler_kbd.json").write_text(
    json.dumps(tum_ornekler, ensure_ascii=False, indent=2), encoding="utf-8"
)
print("OK Kaydedildi: _scripts/diamond_ornekler_kbd.json")
