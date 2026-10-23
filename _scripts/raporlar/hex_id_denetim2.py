import json, re, csv, traceback
from pathlib import Path
from collections import Counter
try:
    lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
    print("lexeme sayisi:", len(lex))
    HEX = re.compile(r"^L-((?:D[01][0-9A-F]{2})+)(-\d+)?$")
    hexler = [e for e in lex if HEX.match(str(e.get("id", "")))]
    print("hex kayit:", len(hexler))
    say = Counter(e.get("form", "") for e in lex)
    out = Path("_scripts/raporlar/hex_id_denetim.csv")
    out.parent.mkdir(parents=True, exist_ok=True)
    with out.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.writer(f, delimiter=";")
        w.writerow(["lexeme_id", "form", "onek_cozum", "form_uzunluk", "partOfSpeech", "literalMeaning", "bayraklar"])
        for e in hexler:
            lid = e["id"]
            form = e.get("form", "") or ""
            m = HEX.match(lid)
            try:
                onek = bytes.fromhex(m.group(1)).decode("utf-8")
            except Exception:
                onek = ""
            b = []
            if not onek: b.append("GECERSIZ_UTF8")
            if not form: b.append("BOS_FORM")
            if " " in form: b.append("COKLU_KELIME")
            if form and say[form] > 1: b.append("FORM_TEKRARI")
            if m.group(2): b.append("CAKISMA_SONEK")
            if onek and form and onek != form and len(form) <= 3: b.append("ONEK_FORM_UYUMSUZ")
            w.writerow([lid, form, onek, len(form), e.get("partOfSpeech", ""), e.get("literalMeaning", ""), ",".join(b)])
    print("yazildi:", out, "satir:", len(hexler))
except Exception:
    traceback.print_exc()
