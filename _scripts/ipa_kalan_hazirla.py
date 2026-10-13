import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
bos = [l for l in lex if not l.get("ipa")]

print(f"Kalan IPA'siz: {len(bos)}")

# NotebookLM icin liste
with open("ipa_kalan_notebooklm.txt", "w", encoding="utf-8") as f:
    f.write(f"Toplam: {len(bos)}\n\n")
    for i, l in enumerate(bos, 1):
        form = l.get("form", "?")
        pos = l.get("partOfSpeech", "?")
        meaning = (l.get("literalMeaning") or "")[:30]
        f.write(f"{i:5d}. {form} | {pos} | {meaning}\n")

print(f"Yazildi: ipa_kalan_notebooklm.txt ({len(bos)} satir)")

# Ilk 50
print(f"\n=== ILK 50 ===")
for i, l in enumerate(bos[:50], 1):
    form = l.get("form", "?")
    pos = l.get("partOfSpeech", "?")
    print(f"  {i:3d}. {form:25s} | {pos}")
