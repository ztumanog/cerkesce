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

# --- R-HAE beyaz liste ---
EXACT_HAE_WORDS = {
    "хьэ", "хьэпшыр", "хьэбзы", "хьэш",
    "хьэпӀащэ", "хьэпӀащэжь", "хьэгъуэлъыжь",
    "хьэпӀащӀэ", "хьэпщӀащэ"
}
def is_real_hae_root(word):
    return word.strip() in EXACT_HAE_WORDS

# --- SOMATİK SONEK ---
SOMATIC_SUFFIX_MAP = {
    "гу": ("R-GU", "гу"),
    "пс": ("R-PSY", "псы"),
    "пэ": ("R-PA", "пэ"),
}
def ekle_somatik_sonek(form, root_ids, components):
    for suf, (rid, gercek_form) in SOMATIC_SUFFIX_MAP.items():
        if form.endswith(suf) and len(form) > len(suf):
            if rid not in root_ids:
                root_ids.append(rid)
                components.append(gercek_form)
    return root_ids, components

# --- ABLAUT VARYANTLARI ---
SOMATIC_VARIANTS = {
    "напс":  (["R-NA", "R-PSY"], ["нэ", "псы"]),
    "напэ":  (["R-NA", "R-PA"],  ["нэ", "пэ"]),
    "лъапэ": (["R-LHA", "R-PA"], ["лъэ", "пэ"]),
}

# --- Kök bulma ---
def bul_kokler(form):
    adaylar = []
    for root_form in sorted_root_forms:
        r = root_map[root_form]
        if not r.get("rootIds"):
            continue
        rid = r["rootIds"][0]

        if "тхьэ" in form and rid == "R-HAE":
            continue
        if rid == "R-HAE" and not is_real_hae_root(form):
            continue
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

    # 1) Doğrudan varyant eşleşmesi
    if form in SOMATIC_VARIANTS:
        root_ids, components = SOMATIC_VARIANTS[form]
        l["rootIds"] = root_ids
        l["wordFamilyId"] = None
        l["derivation"] = {"rule": "compound", "components": components}
        sayac["rootIds"] += 1
        continue

    # 2) Normal kök araması
    bulunanlar = bul_kokler(form)
    if not bulunanlar:
        continue

    root_ids = [r["rootIds"][0] for _, r in bulunanlar]
    components = [rf for rf, _ in bulunanlar]

    # 3) Somatik sonek ekle
    root_ids, components = ekle_somatik_sonek(form, root_ids, components)

    # 4) WordFamilyId (ilk gerçek bulunan)
    wfid = bulunanlar[0][1].get("wordFamilyId") if bulunanlar else None

    l["rootIds"] = root_ids
    l["wordFamilyId"] = wfid
    l["derivation"] = {
        "rule": "compound" if len(root_ids) > 1 else "root",
        "components": components
    }
    sayac["rootIds"] += 1

print(f"\nrootIds atanan: {sayac['rootIds']}")
hae = [l for l in lex if "R-HAE" in (l.get("rootIds") or [])]
print(f"R-HAE (köpek): {len(hae)}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"✅ Kaydedildi: {lex_path}")
