import argparse
import copy
import json
import os
from datetime import datetime
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument("--apply", action="store_true")
args = parser.parse_args()

p = Path("public/data/linguistic/lexemes.json")
raw = p.read_bytes()
data = json.loads(raw.decode("utf-8-sig"))
roots = json.loads(
    p.with_name("roots.json").read_text(encoding="utf-8-sig")
)

def require(condition, message):
    if not condition:
        raise SystemExit("DURDURULDU: " + message)

require(isinstance(data, list), "Lexeme verisi liste degil.")
require(isinstance(roots, list), "Kok verisi liste degil.")
require(
    sum(isinstance(r, dict) and r.get("id") == "R-UE-HAIL"
        for r in roots) == 1,
    "Hedef kok yok veya mukerrer."
)

matches = [
    (i, e) for i, e in enumerate(data)
    if isinstance(e, dict) and e.get("id") == "L-UE"
]
require(len(matches) == 1, "L-UE yok veya mukerrer.")
index, entry = matches[0]

require(entry.get("rootIds") == ["R-UE-HAIL"], "Ana kok beklenenden farkli.")
require(entry.get("wordFamilyId") == "WF-UE-HAIL", "Aile beklenenden farkli.")
der = entry.get("derivation")
require(isinstance(der, dict), "Derivation nesne degil.")

if der.get("rootIds") == ["R-UE-HAIL"]:
    print("Zaten duzeltilmis. Yazma yapilmadi.")
    raise SystemExit(0)

require(der.get("rootIds") == ["R-UE"], "Eski referans beklenenden farkli.")

old = b'"R-UE"'
new = b'"R-UE-HAIL"'
require(raw.count(old) == 1, "Dosyada tam R-UE metni birden fazla veya yok.")

patched = raw.replace(old, new, 1)
expected = copy.deepcopy(data)
expected[index]["derivation"]["rootIds"] = ["R-UE-HAIL"]
require(
    json.loads(patched.decode("utf-8-sig")) == expected,
    "Hedef alan disinda degisiklik bulundu."
)

print("L-UE.derivation.rootIds:")
print('  - ["R-UE"]')
print('  + ["R-UE-HAIL"]')
print("Diger tum JSON alanlari ayni; bicimlendirme korunuyor.")

if not args.apply:
    print("DRY-RUN: Veri dosyasi degistirilmedi.")
    raise SystemExit(0)

require(p.read_bytes() == raw, "Dosya islem sirasinda degisti.")
backup_dir = Path("_scripts/yedekler")
backup_dir.mkdir(parents=True, exist_ok=True)
stamp = datetime.now().strftime("%Y%m%d-%H%M%S-%f")
backup = backup_dir / ("lexemes.before_ue_" + stamp + ".json")
with backup.open("xb") as f:
    f.write(raw)
require(backup.read_bytes() == raw, "Yedek dogrulanamadi.")

temp = p.with_name("lexemes.ue-patch-" + stamp + ".tmp")
with temp.open("xb") as f:
    f.write(patched)
require(p.read_bytes() == raw, "Dosya yazma oncesinde degisti.")
os.replace(temp, p)
require(p.read_bytes() == patched, "Yazma dogrulanamadi.")

print("Yedek:", backup)
print("UYGULANDI: Yalnizca L-UE.derivation.rootIds degisti.")
