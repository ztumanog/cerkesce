import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
freq_ady = json.loads(Path("data/corpus/frequency/lexeme_freq_ady.json").read_text(encoding="utf-8"))
freq_kbd = json.loads(Path("data/corpus/frequency/lexeme_freq_kbd.json").read_text(encoding="utf-8"))

sifir = [l for l in lex if not l.get("corpusFrequency") or l["corpusFrequency"] == 0]

def topla(form, freq_dict):
    if not form:
        return 0
    parcalar = form.replace("-", " ").split()
    return sum(freq_dict.get(p, 0) for p in parcalar)

sonuclar = []
bulunan = 0
for l in sifir:
    form = l.get("form", "")
    ady = l.get("dialectVariants", {}).get("adyghe", form)
    kbd = l.get("dialectVariants", {}).get("kabardian", form)
    a = topla(ady, freq_ady)
    k = topla(kbd, freq_kbd)
    t = a + k
    if t > 0:
        bulunan += 1
        durum = "BULUNDU"
    else:
        durum = "YOK"
    sonuclar.append({"id": l["id"], "form": form, "ady": ady, "kbd": kbd, "a": a, "k": k, "t": t, "durum": durum})

print(f"Frekanssiz: {len(sifir)}")
print(f"Bulunan: {bulunan}")
print(f"Bulunmayan: {len(sifir) - bulunan}")
print(f"Kapsam: %{bulunan/len(sifir)*100:.1f}")
print("")
print("DETAYLI:")
for s in sorted(sonuclar, key=lambda x: -x["t"]):
    print(f"  {s['id']:25} {s['form']:20} ADY={s['a']:6} KBD={s['k']:6} => {s['durum']}")

Path("data/corpus/frequency/c9_1_verification.json").write_text(
    json.dumps({"toplam": len(lex), "frekanssiz": len(sifir), "bulunan": bulunan,
                "bulunmayan": len(sifir)-bulunan, "kapsam": round(bulunan/len(sifir)*100, 1),
                "sonuclar": sonuclar}, ensure_ascii=False, indent=2), encoding="utf-8")
