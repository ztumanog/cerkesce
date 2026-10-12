import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# İlk kaydın tüm alanlarını göster
print("=== İLK KAYDIN TÜM ALANLARI ===")
print(json.dumps(lex[0], ensure_ascii=False, indent=2))
