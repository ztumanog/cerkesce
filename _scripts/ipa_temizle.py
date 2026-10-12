import json
import re
from pathlib import Path

LEX_PATH = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX_PATH.read_text(encoding="utf-8"))

def temizle_ipa(ipa: str) -> str | None:
    """IPA alanındaki dosya yollarını ve geçersiz değerleri temizler."""
    if not ipa:
        return None
    text = str(ipa).strip()
    
    # Dosya yolu içeriyorsa geçersiz
    if re.search(r'\[File:|\[Dosya:|\.ogg|\.wav|\.mp3|\.oga', text):
        return None
    
    # Sadece /.../ formatında olanları al
    if re.match(r'^/[^/]+/$', text):
        return text
    
    # /.../ yoksa ama geçerli IPA karakterleri varsa, /.../ ekle
    if re.match(r'^[a-zA-Zɑæɐɒɓɔɕçðɖɘəɚɛɜɞɟɡɠɢɣɤɥɦɧɨɪɯɰɱɲɳɴɵɶɸɹɺɻɼɽɾɿʀʁʂʃʄʅʆʇʈʉʊʋʌʍʎʏʐʑʒʔʕʖʗʘʙʚʛʜʝʞʟʠʡʢʣʤʥʦʧʨʩʪʫʬʭʮʯ]+$', text):
        return f"/{text}/"
    
    return text or None

duzeltme = 0
for l in lex:
    eski = l.get("ipa")
    yeni = temizle_ipa(eski)
    if yeni != eski:
        l["ipa"] = yeni
        duzeltme += 1
        if duzeltme <= 20:
            print(f"  {l.get('form'):20s} → ipa: {yeni}")

LEX_PATH.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\n✅ {duzeltme} IPA kaydı temizlendi.")
