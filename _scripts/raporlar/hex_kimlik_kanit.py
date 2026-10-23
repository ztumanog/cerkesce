import json, re
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

HEX_RE = re.compile(r"L-((?:D[01][0-9A-F]{2})+)")
CYR = re.compile(r"[\u0400-\u04FF]")
LAT = re.compile(r"[A-Za-z]")

def decode(h):
    try:
        return bytes.fromhex(h).decode("utf-8")
    except Exception:
        return None

# 1) Hex kimlikli kayitlar
print("== HEX KIMLIKLER ==")
hex_rows = []
for e in lex:
    m = HEX_RE.fullmatch(e.get("id", ""))
    if m:
        dec = decode(m.group(1))
        form = e.get("form", "")
        hex_rows.append((e["id"], dec, form, dec == form))
print(f"toplam: {len(hex_rows)}, form ile birebir: {sum(1 for r in hex_rows if r[3])}")
for lid, dec, form, ok in hex_rows[:80]:
    print(f"{lid} | cozulen={dec} | form={form} | eslesme={ok}")

# 2) Karisik alfabe (Kiril + Latin ayni formda)
print("\n== KARISIK ALFABE ==")
for e in lex:
    f = e.get("form", "")
    if CYR.search(f) and LAT.search(f):
        print(e.get("id"), "|", f)

# 3) Yer tutucu kimlikler
print("\n== YER TUTUCU (L-__) ==")
for e in lex:
    if "__" in e.get("id", ""):
        print(e.get("id"), "|", e.get("form"), "|", e.get("partOfSpeech"))

# 4) Referans haritasi: hex ve yer tutucu kimlikler hangi JSON dosyalarinda geciyor
print("\n== REFERANS HARITASI ==")
files = list(Path("public/data").rglob("*.json"))
texts = {f: f.read_text(encoding="utf-8", errors="replace") for f in files}
targets = [r[0] for r in hex_rows] + [e["id"] for e in lex if "__" in e.get("id", "")]
for tid in targets[:80]:
    hits = [str(f) for f, t in texts.items() if tid in t]
    print(f"{tid}: {len(hits)} dosya -> {hits}")
