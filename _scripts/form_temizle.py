import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

guncellenen = 0
silinen = 0

temiz = []
for l in lex:
    form = l.get("form", "")
    
    if not form or form.strip() == "" or form.strip() == "kelime":
        silinen += 1
        continue
    
    if form in ["pa-", "taj-", "i"]:
        silinen += 1
        continue
    
    if form.startswith("-") and any(c in form for c in "ːʁʷə"):
        silinen += 1
        continue
    
    if "I" in form:
        form = form.replace("I", "Ӏ")
        l["form"] = form
        guncellenen += 1
    
    temiz.append(l)

print(f"Guncellenen (I -> palochka): {guncellenen}")
print(f"Silinen: {silinen}")
print(f"Kalan: {len(temiz)}")

Path("public/data/linguistic/lexemes.json").write_text(
    json.dumps(temiz, ensure_ascii=False, indent=2), encoding="utf-8"
)
print("OK Kaydedildi")
