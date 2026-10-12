import json
import re
from pathlib import Path

LEX_PATH = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX_PATH.read_text(encoding="utf-8"))

def temizle_wiktionary(anlam: str) -> str:
    if not anlam:
        return anlam
    text = str(anlam)
    # //[File:...// ve //[Dosya:...// temizle
    text = re.sub(r'//\[File:[^\]]*//', '', text)
    text = re.sub(r'//\[Dosya:[^\]]*//', '', text)
    text = re.sub(r'\[\[File:[^\]]*\]\]', '', text)
    text = re.sub(r'\[\[Dosya:[^\]]*\]\]', '', text)
    # Fazla boşlukları temizle
    text = re.sub(r'\s+', ' ', text).strip()
    return text

duzeltme = 0
for l in lex:
    eski = l.get("literalMeaning") or ""
    yeni = temizle_wiktionary(eski)
    if yeni != eski:
        l["literalMeaning"] = yeni
        duzeltme += 1
        print(f"  ✅ {l.get('form'):20s} → {yeni[:60]}")

LEX_PATH.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\n✅ {duzeltme} kayıt temizlendi.")
