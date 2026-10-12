import json
from pathlib import Path

# Tüm sözlüklerin dil kodlarını kontrol et
sozluk_dir = Path("public/data")

print("=== SÖZLÜK DİL KODLARI ===")
for f in sorted(sozluk_dir.rglob("*.json")):
    if "linguistic" in str(f):
        continue
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
        if isinstance(data, dict):
            title = data.get("title", "?")
            fromLang = data.get("fromLang", "?")
            toLang = data.get("toLang", "?")
            words = data.get("words", {})
            if isinstance(words, dict):
                print(f"  {f.name:40s} | {fromLang:5s} -> {toLang:5s} | {len(words):6d} kelime | {title[:30]}")
    except:
        pass
