import sys
sys.stdout.reconfigure(encoding="utf-8")

import json
import re
import unicodedata
import os
from pathlib import Path

# Thonny için proje kökü
PROJE_KOKU = Path("E:/projeler/Cerkesce")

if PROJE_KOKU.exists():
    os.chdir(PROJE_KOKU)

print(f"Çalışma dizini: {os.getcwd()}")
print("=" * 70)


def normalize(text):
    if text is None:
        return ""

    return unicodedata.normalize(
        "NFC",
        str(text)
    ).strip().lower()


# --------------------------------------------------
# Sözlükleri yükle
# --------------------------------------------------

data_dir = Path("public/data")
sozlukler = {}

for f in sorted(data_dir.glob("*.json")):

    try:
        data = json.loads(
            f.read_text(
                encoding="utf-8",
                errors="ignore"
            )
        )

        words = data.get("words", {})

        if not isinstance(words, dict):
            continue

        spelling_map = {}

        for word_key, wdata in words.items():

            if not isinstance(wdata, dict):
                continue

            aranacaklar = {
                str(word_key),
                str(wdata.get("spelling", "")),
                str(wdata.get("lemma", "")),
                str(wdata.get("word", "")),
                str(wdata.get("headword", "")),
                str(wdata.get("entry", "")),
            }

            for item in aranacaklar:

                item = item.strip()


                if not item:
                    continue

                key = normalize(item)

                spelling_map.setdefault(key, []).append({
                    "spelling": item,
                    "data": wdata,
                })

        sozlukler[f.name] = {
            "title": data.get("title", f.name),
            "from": data.get("fromLang", "?"),
            "to": data.get("toLang", "?"),
            "spelling_map": spelling_map,
        }

    except Exception as e:
        print(f"HATA {f.name}: {e}")

print(f"{len(sozlukler)} sözlük yüklendi")
print("=" * 70)
print("Çıkmak için: q")
print("Toplu arama: virgül ile ayır")
print("=" * 70)

# --------------------------------------------------
# Arama
# --------------------------------------------------

while True:

    try:
        girdi = input("\nKelime(ler): ").strip()

    except (KeyboardInterrupt, EOFError):
        print("\nÇıkılıyor...")
        break

    if not girdi:
        continue

    if girdi.lower() in ["q", "quit", "exit"]:
        print("Çıkılıyor...")
        break

    kelimeler = [
        k.strip()
        for k in girdi.split(",")
        if k.strip()
    ]

    for kelime in kelimeler:

        key = normalize(kelime)
        sonuclar = []

        for fname, s in sozlukler.items():

            matches = []

            # Tam eşleşme
            if key in s["spelling_map"]:
                matches.extend(s["spelling_map"][key])

            # Başlayan eşleşme
            for k, entries in s["spelling_map"].items():
                if k.startswith(key) and k != key:
                    matches.extend(entries)

            for entry in matches:

                data = entry["data"]

                anlam = ""

                for field in [
                    "translation",
                    "meaning",
                    "definition",
                ]:
                    if data.get(field):
                        anlam = str(data[field])[:150]
                        break

                if not anlam:

                    html = str(
                        data.get(
                            "full_definition_in_html",
                            ""
                        )
                    )

                    anlam = re.sub(
                        r"<[^>]+>",
                        "",
                        html
                    ).strip()[:150]

                sonuclar.append({
                    "sozluk": fname,
                    "title": s["title"],
                    "from": s["from"],
                    "to": s["to"],
                    "anlam": anlam,
                    "kelime": entry["spelling"],
                })

        if sonuclar:

            print(
                f"\n[OK] '{kelime}' için "
                f"{len(sonuclar)} kayıt bulundu:"
            )

            for s in sonuclar:

                print(
                    f"\n- {s['sozluk']} "
                    f"({s['from']}->{s['to']})"
                )

                print(f"  Kelime: {s['kelime']}")
                print(f"  Sözlük: {s['title']}")

                if s["anlam"]:
                    print(f"  Anlam: {s['anlam']}")

        else:

            print(
                f"\n[YOK] '{kelime}' "
                f"hiçbir sözlükte bulunamadı."
            )