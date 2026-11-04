# 34_plant_duzelt.py — Thonny icin
import json, shutil
from pathlib import Path
from datetime import datetime

ROOT = Path(r"D:\projeler\Cerkesce")
LEX = ROOT / "public" / "data" / "linguistic" / "lexemes.json"
SNAP_DIR = ROOT / "storage" / "snapshots"

lex_raw = LEX.read_text(encoding="utf-8")
lex = json.loads(lex_raw)
orijinal_dict = isinstance(lex, dict)
if orijinal_dict:
    lex = lex.get("lexemes") or list(lex.values())

# PLANT -> PLANT_KINGDOM
sayac = 0
for l in lex:
    if l.get("conceptId") == "PLANT":
        l["conceptId"] = "PLANT_KINGDOM"
        sayac += 1

print(f"[i] Guncellenen: {sayac}")

# Yedek
ts = datetime.now().strftime("%Y%m%d_%H%M%S")
yedek = SNAP_DIR / f"{ts}_faz16b1-plant-kingdom_lexemes.json"
shutil.copy2(LEX, yedek)
print(f"[+] Yedek: {yedek}")

# Yaz
if orijinal_dict:
    orijinal = json.loads(lex_raw)
    if "lexemes" in orijinal:
        orijinal["lexemes"] = lex
    else:
        orijinal = dict(zip(orijinal.keys(), lex))
    LEX.write_text(json.dumps(orijinal, ensure_ascii=False, indent=2), encoding="utf-8")
else:
    LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"[OK] Kaydedildi")
print(">>> Simdi invariant_kapisi.py tekrar calistir")