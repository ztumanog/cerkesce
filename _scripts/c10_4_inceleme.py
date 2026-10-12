import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

sr_path = Path("public/data/linguistic/semantic_relations.json")
sr = json.loads(sr_path.read_text(encoding="utf-8"))

# 5 metafor icin dilbilimsel kanit
inceleme = {
    "SR-HEAD-TOP": {
        "confidence": 0.60,
        "evidenceSource": "Wikipedia (щхьэгу)",
        "evidenceDetail": "щхьэ (bas) + гу (ic) = basin ici -> zirve, tepe",
        "reference": "Wikipedia: Adyghe language",
        "notes": "Metaforik zincir: HEAD -> TOP. Wikipedia kaniti."
    },
    "SR-HEAD-REASON": {
        "confidence": 0.65,
        "evidenceSource": "Wikipedia (щхьэусыгъуэ)",
        "evidenceDetail": "щхьэ (bas) + усыгъуэ (sebep) = basin sebebi -> gerekce",
        "reference": "Wikipedia: Adyghe language",
        "notes": "Metaforik zincir: HEAD -> REASON. Wikipedia kaniti."
    },
    "SR-SHHYE-FREEDOM": {
        "confidence": 0.70,
        "evidenceSource": "Wikipedia (щхьэхуитыныгъэ)",
        "evidenceDetail": "щхьэ (bas) + хуит (serbest) + ыныгъэ = ozgurluk",
        "reference": "Wikipedia: Adyghe language",
        "notes": "Metaforik zincir: HEAD -> FREE -> FREEDOM. Wikipedia kaniti."
    },
    "SR-SHHYE-WINDOW": {
        "confidence": 0.65,
        "evidenceSource": "Wiktionary (щхьэгъубжэ)",
        "evidenceDetail": "щхьэ (bas) + гъубжэ (delik) = bas deligi -> pencere",
        "reference": "Wiktionary: щхьэгъубжэ",
        "notes": "Metaforik zincir: HEAD -> WINDOW. Wiktionary kaniti."
    },
    "SR-GU-ANGER": {
        "confidence": 0.75,
        "evidenceSource": "12 sozluk (губжь)",
        "evidenceDetail": "гу (kalp) + бжь (kirilma) = kalp kirilmasi -> ofke",
        "reference": "Apashev (2008), Yamisha (2018), Kokov (2008)",
        "notes": "Metaforik zincir: HEART -> ANGER. 12 sozluk kaniti."
    }
}

guncellenen = 0
for m in sr:
    if m.get("type") != "metaphorical":
        continue
    mid = m.get("id", "")
    if mid in inceleme:
        i = inceleme[mid]
        m["confidence"] = i["confidence"]
        m["evidenceSource"] = i["evidenceSource"]
        m["evidenceDetail"] = i["evidenceDetail"]
        m["reference"] = i["reference"]
        m["notes"] = i["notes"]
        m["status"] = "DOGRULANDI"
        guncellenen += 1
        print(f"Guncellendi: {mid} (conf={i['confidence']})")

sr_path.write_text(json.dumps(sr, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nGuncellenen: {guncellenen}")

# Dogrulama
metaforlar = [s for s in sr if s.get("type") == "metaphorical"]
dogrulanan = sum(1 for m in metaforlar if m.get("confidence", 0) > 0)
bulunmayan = len(metaforlar) - dogrulanan
print(f"\n=== DOGRULAMA ===")
print(f"Toplam metafor: {len(metaforlar)}")
print(f"DOGRULANDI: {dogrulanan}")
print(f"BULUNAMADI: {bulunmayan}")
