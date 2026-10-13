# _scripts/g2p_kalan_ipa.py
import json
import re
from pathlib import Path
import sys

sys.stdout.reconfigure(encoding="utf-8")

BASE = Path(r"E:\projeler\Cerkesce")
LEX = BASE / "public/data/linguistic/lexemes.json"
lex = json.loads(LEX.read_text(encoding="utf-8"))

# Kabardeyce / Doğu Çerkesçesi G2P Fonetik Haritası
G2P_MAP = [
    ("гъуэ", "ʁwa"), ("кхъуэ", "q͡χwa"), ("кӀуэ", "kʲʼwa"), ("пӀастэ", "pʼaːsta"),
    ("кӀ", "tʃʼ"), ("щӀ", "ɕʼ"), ("цӀ", "tsʼ"), ("пӀ", "pʼ"), ("тӀ", "tʼ"),
    ("къ", "qʼ"), ("кхъ", "q͡χ"), ("хъ", "χ"), ("гъ", "ʁ"), ("жь", "ʑ"),
    ("щ", "ɕ"), ("шъ", "ʂ"), ("жъ", "ʐ"), ("чъ", "tʂ"), ("дж", "dʒ"),
    ("дз", "dz"), ("хь", "ħ"), ("Ӏу", "ʔw"), ("Ӏ", "ʔ"),
    ("б", "b"), ("в", "v"), ("г", "ɡ"), ("д", "d"), ("ж", "ʒ"),
    ("з", "z"), ("й", "j"), ("к", "k"), ("л", "l"), ("лӀ", "ɬʼ"),
    ("лъ", "ɬ"), ("м", "m"), ("н", "n"), ("п", "p"), ("р", "r"),
    ("с", "s"), ("т", "t"), ("ф", "f"), ("х", "x"), ("ц", "ts"),
    ("ч", "tʃ"), ("ш", "ʃ"),
    ("уэ", "wa"), ("и", "ji"), ("о", "wa"), ("э", "a"), ("а", "aː"),
    ("ы", "ə"), ("у", "w"), ("е", "ja"), ("ю", "ju"), ("я", "jaː")
]

def cyrillic_to_ipa(word):
    if not word or word.strip() in ["-", "-м", "-р", "-рэ"]:
        return None
    
    t = word.lower().strip()
    for cyr, ipa in G2P_MAP:
        t = t.replace(cyr, ipa)
    
    t = re.sub(r'[^a-zːəɨɕʑʂʐɬħʔqχʁʃʒʧʤtsejaːwa\s-]', '', t)
    return f"/{t}/" if t else None

guncellenen = 0
for l in lex:
    if not l.get("ipa"):
        form = (l.get("form") or "").strip()
        ipa_g2p = cyrillic_to_ipa(form)
        if ipa_g2p:
            l["ipa"] = ipa_g2p
            guncellenen += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

toplam_dolu = sum(1 for l in lex if l.get("ipa"))
print("=== G2P IPA TAMAMLAMA SONUCU ===")
print(f"G2P ile Eklenen: {guncellenen}")
print(f"Toplam IPA Dolu: {toplam_dolu} / {len(lex)} (%{100*toplam_dolu/len(lex):.1f})")
