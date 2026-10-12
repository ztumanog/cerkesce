import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

def normalize_palochka(text):
    if not text:
        return ""
    return text.replace("ӏ", "Ӏ").replace("I", "Ӏ").replace("l", "Ӏ")

# Belirsizleri bul + normalize hali
belirsiz = []
for l in lex:
    form = l.get("form", "")
    if not form.startswith("нэ"):
        continue
    if l.get("subConceptId"):
        continue
    norm = normalize_palochka(form)
    belirsiz.append((form, norm, l.get("literalMeaning") or "?"))

print(f"Belirsiz: {len(belirsiz)}\n")
print(f"{'FORM':<25} | {'NORM':<25} | ANLAM")
print("-" * 80)
for form, norm, anlam in belirsiz[:30]:
    farkli = " ⚠️" if form != norm else ""
    print(f"{form:<25} | {norm:<25} | {anlam[:30]}{farkli}")

# Normalize edilmiş haliyle SON_5'te olanlar
SON_5_NORM = {
    "нэмыӏэми", "нэуфӏыцӏщхьэрыуэу", "нэшанэ", "нэмыц", "нэмыгъэса",
    "нэм", "нэхэр", "нэщӏ", "нэкӏым", "нэщӏым", "нэкӏэ", "нэӏэ",
    "нэкӏ", "нэкӏы", "нэщӏу", "нэщэнэхэр", "нэщэнэу", "нэӏуасэ",
    "нэпкъым", "нэпитӏу", "нэфапӏэу", "нэшэсын",
    "нэутхагъ", "нэутх", "нэщэнэ", "нэӏэмый", "нэшанэ"
}

# Hangi normalize edilmiş formlar SON_5_NORM'da var?
esles = []
for form, norm, anlam in belirsiz:
    if norm in SON_5_NORM:
        esles.append((form, norm, anlam))

print(f"\n\nNormalize ile eşleşecek: {len(esles)}")
for form, norm, anlam in esles:
    print(f"  {form:<25} | norm: {norm:<25}")
