import json
from pathlib import Path

BASE = Path(r"E:\projeler\Cerkesce")
lex = json.loads((BASE/"public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

def dolu(l, field):
    v = l.get(field)
    if v is None: return False
    if isinstance(v, str): return len(v.strip()) >= 2
    if isinstance(v, (list, dict)): return len(v) > 0
    return bool(v)

print(f"Toplam: {len(lex)}\n")
for alan in ["form", "ipa", "partOfSpeech", "rootIds", "wordFamilyId", "conceptId",
             "derivation", "translations", "literalMeaning", "examples", "audioUrl"]:
    sayi = sum(1 for l in lex if dolu(l, alan))
    pct = 100*sayi/len(lex)
    bar = "#" * int(pct/5) + "." * (20 - int(pct/5))
    print(f"  {alan:18} {sayi:6}/{len(lex)} ({pct:5.1f}%) {bar}")

# IPA kalite kontrolu
print("\n=== IPA KALITE ===")
def ipa_gecerli(ipa):
    if not ipa: return False
    if not ipa.startswith("/") or not ipa.endswith("/"): return False
    ic = ipa.strip("/")
    if not ic: return False
    if any('\u0400' <= c <= '\u04FF' for c in ic): return False
    if any('a' <= c.lower() <= 'z' and c.isascii() for c in ic): return False
    if '╩' in ic or '\ufffd' in ic: return False
    return True

gecerli = sum(1 for l in lex if ipa_gecerli(l.get("ipa", "")))
print(f"  Temiz IPA: {gecerli} (%{100*gecerli/len(lex):.1f})")
print(f"  Kirli IPA: {len(lex) - gecerli}")
