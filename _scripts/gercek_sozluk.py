import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

# 1) Gercek sozlukleri bul (0-33 arasi numarali)
data_dir = Path("public/data")
sozluk_files = []
for f in sorted(data_dir.glob("*.json")):
    if f.name[0].isdigit():
        sozluk_files.append(f)

print(f"=== GERCEK SOZLUKLER ({len(sozluk_files)}) ===\n")

# 2) Lexeme'leri yukle
lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
print(f"Lexeme: {len(lex)}\n")

# 3) Her sozlugu tara
for f in sozluk_files:
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
        # Yapi kontrol
        if isinstance(data, dict):
            kayit = len(data)
            # Ilk anahtar
            ilk_key = list(data.keys())[0] if data else "?"
            print(f"  {f.name}: dict ({kayit} anahtar, ilk: {ilk_key})")
        elif isinstance(data, list):
            kayit = len(data)
            ornek = data[0] if data else {}
            print(f"  {f.name}: list ({kayit} kayit, ornek: {list(ornek.keys()) if isinstance(ornek, dict) else type(ornek)})")
        else:
            print(f"  {f.name}: {type(data)}")
    except Exception as e:
        print(f"  {f.name}: HATA - {e}")
