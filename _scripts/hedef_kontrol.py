import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
d = json.loads(LEX.read_text(encoding="utf-8"))
l = d if isinstance(d, list) else d["lexemes"]

hedef_idler = {"L-PSE", "L-PSEXUN", "L-PSEBYDE", "KAV-ПСЭУНЭ"}
hedef_formlar = {"псэр", "псэхэр"}

bulunan = 0
for e in l:
    if e.get("id") in hedef_idler or e.get("form") in hedef_formlar:
        bulunan += 1
        print(
            e.get("id"), "|",
            e.get("form"), "| status:", e.get("status"),
            "| rootIds:", e.get("rootIds"),
            "| wordFamilyId:", e.get("wordFamilyId"),
            "| meaning:", e.get("meaning"),
        )

print("Bulunan kayit sayisi:", bulunan)
