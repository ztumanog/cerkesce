import json
from pathlib import Path

LEX_PATH = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX_PATH.read_text(encoding="utf-8"))

# Silinecek ID'ler
SILINECEK = {
    # пщӀы
    "L-D0BFD18949D1", "L-PSHCH1Y",
    # щӀымахуэ
    "L-SH1YMAKHUE", "L-PROMPT-00000",
    # с
    "L-CORPUS-03462", "L-KBD-05734",
    # гуфӀэ
    "L-PROMPT-00005",
    # гущэ
    "L-GUSHHE",
    # еджапӀэ
    "L-YEDJAP1E",
    # псынщӀэ
    "L-PSYNSH1E",
    # шэ
    "L-SHE2",
    # цӀыкӀу
    "L-C1YQ1U",
    # кхъухь
    "L-KHQUXY",
    # шыпхъу
    "L-SHYPKHU",
    # шъо
    "L-SHKO",
}

onceki = len(lex)
lex = [l for l in lex if l.get("id") not in SILINECEK]
sonraki = len(lex)

# Kaydet
LEX_PATH.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"=== MÜKERRER SİLME RAPORU ===")
print(f"Önce: {onceki} kayıt")
print(f"Sonra: {sonraki} kayıt")
print(f"Silinen: {onceki - sonraki} kayıt")
