import json
from pathlib import Path

# Yedekteki durum
bak = Path("public/data/linguistic/lexemes.json.bak-shchy03-20261009-224831")
lex_bak = json.loads(bak.read_text(encoding="utf-8"))
shchy_bak = [l for l in lex_bak if l.get("form", "").startswith("щы")]
dolu_bak = [l for l in shchy_bak if l.get("conceptId") and l.get("conceptId") not in ("", "-")]
print(f"YEDEK (22:48):")
print(f"  щы-: {len(shchy_bak)}")
print(f"  DOLU: {len(dolu_bak)}")

# Şu anki durum
lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
shchy = [l for l in lex if l.get("form", "").startswith("щы")]
dolu = [l for l in shchy if l.get("conceptId") and l.get("conceptId") not in ("", "-")]
print(f"\nŞU AN:")
print(f"  щы-: {len(shchy)}")
print(f"  DOLU: {len(dolu)}")

# Fark
print(f"\nFARK:")
print(f"  щы-: {len(shchy) - len(shchy_bak)}")
print(f"  DOLU: {len(dolu) - len(dolu_bak)}")

# Yedekte olup simdi olmayan DOLU
bak_formlar = set(l.get("form") for l in dolu_bak)
simdi_formlar = set(l.get("form") for l in dolu)
kayip = bak_formlar - simdi_formlar
print(f"\nKayip DOLU formlar: {len(kayip)}")
for f in sorted(kayip)[:20]:
    print(f"  {f}")
