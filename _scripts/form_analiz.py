import json
import re
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
print(f"Toplam: {len(lex)}")

# Form karakter analizi
kiril = 0
latin = 0
ipa = 0
arap = 0
diger = 0

kiril_re = re.compile(r'^[\u0400-\u04FF\u0500-\u052FӀӏ\-\s]+$')
latin_re = re.compile(r'^[a-zA-Z\-\s]+$')
arap_re = re.compile(r'^[\u0600-\u06FF\-\s]+$')
ipa_re = re.compile(r'^[a-zA-Zːʷəɕħʑʁχʷʼʔʂʐɬɮɡʲʷʰ\-\[\]\/]+$')

kiril_ornek = []
latin_ornek = []
ipa_ornek = []
arap_ornek = []
diger_ornek = []

for l in lex:
    form = l.get("form", "")
    if not form:
        continue
    if kiril_re.match(form):
        kiril += 1
        if len(kiril_ornek) < 5:
            kiril_ornek.append(form)
    elif latin_re.match(form):
        latin += 1
        if len(latin_ornek) < 5:
            latin_ornek.append(form)
    elif arap_re.match(form):
        arap += 1
        if len(arap_ornek) < 5:
            arap_ornek.append(form)
    elif ipa_re.match(form) or "/" in form or "[" in form:
        ipa += 1
        if len(ipa_ornek) < 5:
            ipa_ornek.append(form)
    else:
        diger += 1
        if len(diger_ornek) < 10:
            diger_ornek.append(form)

print(f"\n=== FORM ANALIZI ===")
print(f"  Kiril:  {kiril}")
print(f"  Latin:  {latin}")
print(f"  Arap:   {arap}")
print(f"  IPA:    {ipa}")
print(f"  Diğer:  {diger}")

print(f"\n=== Kiril örnek ===")
for f in kiril_ornek:
    print(f"  {f}")

print(f"\n=== Latin örnek ===")
for f in latin_ornek:
    print(f"  {f}")

print(f"\n=== Arap örnek ===")
for f in arap_ornek:
    print(f"  {f}")

print(f"\n=== IPA örnek ===")
for f in ipa_ornek:
    print(f"  {f}")

print(f"\n=== Diğer örnek ===")
for f in diger_ornek:
    print(f"  {f}")
