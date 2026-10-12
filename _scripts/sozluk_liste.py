import json
from pathlib import Path

data_dir = Path("public/data")
print("Mevcut sozlukler:")
for f in sorted(data_dir.glob("*.json")):
    if not f.name[0].isdigit():
        continue
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
        title = data.get("title", "?")
        from_lang = data.get("fromLang", "?")
        to_lang = data.get("toLang", "?")
        words = data.get("words", {})
        sayi = len(words) if isinstance(words, dict) else 0
        print(f"  {f.name:40s} {from_lang:>5s}->{to_lang:<5s} {sayi:>6d} kelime")
        print(f"    {title}")
    except Exception as e:
        print(f"  HATA {f.name}: {e}")
