import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
print(f"Toplam: {len(lex)}")
print(f"rootIds dolu: {sum(1 for l in lex if l.get('rootIds'))}")
print(f"wordFamilyId dolu: {sum(1 for l in lex if l.get('wordFamilyId'))}")
print(f"conceptId dolu: {sum(1 for l in lex if l.get('conceptId'))}")
print(f"examples dolu: {sum(1 for l in lex if l.get('examples'))}")
print(f"ipa dolu: {sum(1 for l in lex if l.get('ipa'))}")

# L-KBD kayıtları
kbd = [l for l in lex if l.get("id", "").startswith("L-KBD")]
print(f"\nL-KBD: {len(kbd)}")
print(f"L-KBD conceptId: {sum(1 for l in kbd if l.get('conceptId'))}")
print(f"L-KBD rootIds: {sum(1 for l in kbd if l.get('rootIds'))}")
print(f"L-KBD examples: {sum(1 for l in kbd if l.get('examples'))}")
