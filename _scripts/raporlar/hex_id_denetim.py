import json, re, csv, sys
from pathlib import Path
from collections import Counter

LEX = Path("public/data/linguistic/lexemes.json")
OUT = Path("_scripts/raporlar/hex_id_denetim.csv")
OUT.parent.mkdir(parents=True, exist_ok=True)

lex = json.loads(LEX.read_text(encoding="utf-8"))

# Her Kiril harfi 2 bayttir: D0/D1 + devam baytı (80-BF)
HEX = re.compile(r"^L-((?:D[01][0-9A-F]{2})+)(-\d+)?$")
CYR = re.compile(r"[\u0400-\u04FF]")
LAT = re.compile(r"[A-Za-z]")

def dec(h):
    try:
        return bytes.fromhex(h).decode("utf-8")
    except Exception:
        return None

# Öz denetim: bilinen bir kimlik eşleşmeli
assert HEX.match("L-D0B0D183D18D"), "regex öz denetimi başarısız"

hex_kayitlar = [e for e in lex if HEX.match(e.get("id", ""))]
print("toplam hex kayit:", len(hex_kayitlar))
if not hex_kayitlar:
    print("HATA: hic hex kayit bulunamadi, betik durduruldu.")
    sys.exit(1)

form_say = Counter(e.get("form", "") for e in lex)

dosyalar = []
for kok in ["public/data", "src"]:
    p = Path(kok)
    if p.exists():
        dosyalar += [f for f in p.rglob("*") if f.is_file() and f.suffix in (".json", ".ts", ".tsx")]
metinler = {f: f.read_text(encoding="utf-8", errors="replace") for f in dosyalar}

rows = []
for e in hex_kayitlar:
    lid = e["id"]
    m = HEX.match(lid)
    h, sonek = m.group(1), m.group(2) or ""
    onek = dec(h)
    form = e.get("form", "") or ""

    bayrak = []
    if onek is None: bayrak.append("GECERSIZ_UTF8")
    if not form: bayrak.append("BOS_FORM")
    if " " in form: bayrak.append("COKLU_KELIME")
    if CYR.search(form) and LAT.search(form): bayrak.append("KARISIK_ALFABE")
    if form and form_say[form] > 1: bayrak.append("FORM_TEKRARI")
    if sonek: bayrak.append("CAKISMA_SONEK")
    if onek and form and onek != form and len(form) <= 3: bayrak.append("ONEK_FORM_UYUMSUZ")

    kalip = re.compile(r"(?<![A-Za-z0-9_\-])" + re.escape(lid) + r"(?![A-Za-z0-9_\-])")
    bulunan = [str(f) for f, t in metinler.items() if f != LEX and kalip.search(t)]

    rows.append({
        "lexeme_id": lid,
        "form": form,
        "onek_cozum": onek or "",
        "form_uzunluk": len(form),
        "partOfSpeech": e.get("partOfSpeech", ""),
        "literalMeaning": e.get("literalMeaning", ""),
        "bayraklar": ",".join(bayrak),
        "diger_dosya_referans_sayisi": len(bulunan),
        "diger_dosyalar": ";".join(bulunan),
    })

with OUT.open("w", encoding="utf-8-sig", newline="") as f:
    w = csv.DictWriter(f, fieldnames=list(rows[0].keys()), delimiter=";")
    w.writeheader()
    w.writerows(rows)

print("diger dosyada referansi olan:", sum(1 for r in rows if r["diger_dosya_referans_sayisi"] > 0))
for k, v in Counter(b for r in rows for b in r["bayraklar"].split(",") if b).most_common():
    print(f"{k}: {v}")
print("CSV:", OUT)
