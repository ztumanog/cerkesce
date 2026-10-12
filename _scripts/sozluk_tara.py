import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path
from collections import Counter, defaultdict

# 1) Tum sozluk JSON'larini yukle
data_dir = Path("public/data")
json_files = list(data_dir.rglob("*.json"))

# Sozluk verilerini topla
sozlukler = {}
for f in json_files:
    if "linguistic" in str(f):
        continue
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
        if isinstance(data, list) and len(data) > 0:
            sozlukler[f.name] = data
    except:
        pass

print(f"=== SOZLUKLER ({len(sozlukler)}) ===")
for name, data in sozlukler.items():
    print(f"  {name}: {len(data)} kayit")

# 2) Lexeme'leri yukle
lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
mevcut_formlar = {l.get("form", "").lower() for l in lex if l.get("form")}
print(f"\n=== MEVCUT LEXEME: {len(lex)} ===")
print(f"Benzersiz form: {len(mevcut_formlar)}")

# 3) Her sozlukte lexeme'lerimizi ara
print(f"\n=== LEXEME ARAMA ===")
for name, data in sozlukler.items():
    bulunan = 0
    for l in lex:
        form = l.get("form", "")
        if not form:
            continue
        for entry in data:
            entry_str = json.dumps(entry, ensure_ascii=False).lower()
            if form.lower() in entry_str:
                bulunan += 1
                break
    if bulunan > 0:
        print(f"  {name}: {bulunan}/{len(lex)} lexeme bulundu")
