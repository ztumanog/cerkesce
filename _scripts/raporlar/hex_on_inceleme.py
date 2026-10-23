import json, re, csv
from pathlib import Path
from collections import Counter, defaultdict

LEX = Path("public/data/linguistic/lexemes.json")
OUT = Path("_scripts/raporlar/hex_on_inceleme.csv")
HEX = re.compile(r"^L-((?:D[01][0-9A-F]{2})+)(-\d+)?$")

lex = json.loads(LEX.read_text(encoding="utf-8"))
form_say = Counter(e.get("form", "") for e in lex)
hexler = [e for e in lex if HEX.match(str(e.get("id", "")))]

def dec(h):
    try:
        return bytes.fromhex(h).decode("utf-8")
    except Exception:
        return ""

grup = defaultdict(list)
OUT.parent.mkdir(parents=True, exist_ok=True)
with OUT.open("w", encoding="utf-8-sig", newline="") as f:
    w = csv.writer(f, delimiter=";")
    w.writerow(["id", "form", "onek", "partOfSpeech", "literalMeaning",
                "rootIds", "wordFamilyId", "ayni_form_sayisi"])
    for e in hexler:
        m = HEX.match(e["id"])
        onek = dec(m.group(1))
        grup[onek].append(e["id"])
        d = e.get("derivation") if isinstance(e.get("derivation"), dict) else {}
        w.writerow([e["id"], e.get("form", ""), onek, e.get("partOfSpeech", ""),
                    e.get("literalMeaning", ""),
                    ",".join(map(str, d.get("rootIds") or [])),
                    str(e.get("wordFamilyId", "")),
                    form_say[e.get("form", "")]])

print("hex kayit:", len(hexler))
print("farkli onek:", len(grup))
print("birden fazla kayit tasiyan onek:", sum(1 for v in grup.values() if len(v) > 1))
print("en cok cakisan 10 onek:")
for k, v in sorted(grup.items(), key=lambda x: -len(x[1]))[:10]:
    print("  ", k, len(v))
print("CSV:", OUT)
