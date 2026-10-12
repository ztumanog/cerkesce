import json
from pathlib import Path
from collections import Counter

lex_path = Path("public/data/linguistic/lexemes.json")
bak_path = Path("public/data/linguistic/lexemes.json.bak-root")

lex = json.loads(bak_path.read_text(encoding="utf-8"))
print(f"Temiz lexemes: {len(lex)}")

for l in lex:
    l.pop("rootIds", None)
    l.pop("wordFamilyId", None)
    l.pop("derivation", None)
print("Eski alanlar temizlendi.")

roots = json.loads(Path("_scripts/roots_birlesik.json").read_text(encoding="utf-8"))
root_map = {r["form"]: r for r in roots if r.get("form")}
sorted_root_forms = sorted(root_map.keys(), key=len, reverse=True)
print(f"Kök sayısı: {len(root_map)}")

# ---- R-HAE (köpek) BEYAZ LİSTE ----
EXACT_HAE_WORDS = {
    "хьэ", "хьэпшыр", "хьэбзы", "хьэш",
    "хьэпӀащэ", "хьэпӀащэжь", "хьэгъуэлъыжь",
    "хьэпӀащӀэ", "хьэпщӀащэ"
}
def is_real_hae_root(word: str) -> bool:
    w = word.strip()
    return w in EXACT_HAE_WORDS

# ---- Filtre fonksiyonu ----
def bul_kokler(form):
    adaylar = []
    for root_form in sorted_root_forms:
        r = root_map[root_form]
        if not r.get("rootIds"):
            continue
        rid = r["rootIds"][0]

        # тхьэ filtresi
        if "тхьэ" in form and rid == "R-HAE":
            continue

        # R-HAE: sadece beyaz liste
        if rid == "R-HAE" and not is_real_hae_root(form):
            continue

        # 2 harfli kökler için başlama/tam eşleşme şartı
        if len(root_form) <= 2:
            if form != root_form and not form.startswith(root_form):
                continue

        if form == root_form:
            adaylar.append((root_form, r))
        elif root_form in form:
            adaylar.append((root_form, r))

    benzersiz = {}
    for root_form, r in adaylar:
        rid = r["rootIds"][0]
        if rid not in benzersiz:
            benzersiz[rid] = (root_form, r)
    return list(benzersiz.values())

sayac = Counter()
for l in lex:
    form = l.get("form", "")
    if not form:
        continue

    bulunanlar = bul_kokler(form)
    if not bulunanlar:
        continue

    l["rootIds"] = [r["rootIds"][0] for _, r in bulunanlar]
    l["wordFamilyId"] = bulunanlar[0][1].get("wordFamilyId")
    l["derivation"] = {
        "rule": "compound" if len(bulunanlar) > 1 else "root",
        "components": [rf for rf, _ in bulunanlar]
    }
    sayac["rootIds"] += 1

print(f"\nrootIds atanan: {sayac['rootIds']}")

hae = [l for l in lex if "R-HAE" in (l.get("rootIds") or [])]
print(f"R-HAE (köpek) kökü atanan: {len(hae)}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"✅ Kaydedildi: {lex_path}")
