import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
lex = lex if isinstance(lex, list) else lex.get("lexemes", [])

id_yok = 0
id_bos = 0
ornek = []
for e in lex:
    if "id" not in e:
        id_yok += 1
        if len(ornek) < 5:
            ornek.append((e.get("form","?"), "id YOK"))
    elif not e["id"]:
        id_bos += 1
        if len(ornek) < 10:
            ornek.append((e.get("form","?"), "id BOŞ"))

print(f"Toplam lexeme : {len(lex)}")
print(f"id YOK        : {id_yok}")
print(f"id BOŞ        : {id_bos}")
print(f"id SORUNLU    : {id_yok + id_bos}")

if ornek:
    print("\n=== ORNEK ===")
    for form, sorun in ornek:
        print(f"  {form:20s} | {sorun}")
