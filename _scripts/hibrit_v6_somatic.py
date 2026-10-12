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
def is_real_hae_root(word: str) -> bool:
    return word.strip() in EXACT_HAE_WORDS

# --- GENİŞLETİLMİŞ SOMATİK SONEK KÖKLERİ ---
SOMATIC_SUFFIX_MAP = {
    "гу": "R-GU",    # нэгу, Ӏэгу, бзэгу, лъэгу
    "пс": "R-PSY",   # напс (gözyaşı), лъэпс (bağ), щхьэпс (sicim), бзэпс (kiriş)
    "пэ": "R-PA",    # Ӏэпэ (parmak), лъапэ (ayak ucu), напэ (yüz/onur)
}

def ekle_somatik_sonek(form, root_ids, components):
    for suf, rid in SOMATIC_SUFFIX_MAP.items():
        if form.endswith(suf) and len(form) > len(suf):
            if rid not in root_ids:
                root_ids.append(rid)
                # sonek formunu değil, gerçek kök formunu yaz
                if suf == "пс":
                    components.append("псы")
                elif suf == "пэ":
                    components.append("пэ")
                else:
                    components.append(suf)
    return root_ids, components

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

    bulunanlar = bul_kokler(form)
    if not bulunanlar:
        continue

    root_ids = [r["rootIds"][0] for _, r in bulunanlar]
    components = [rf for rf, _ in bulunanlar]

    root_ids, components = ekle_somatik_sonek(form, root_ids, components)

    l["rootIds"] = root_ids
    l["wordFamilyId"] = bulunanlar[0][1].get("wordFamilyId") if bulunanlar else None
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
