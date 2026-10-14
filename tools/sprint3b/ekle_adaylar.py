import json
import shutil
from datetime import datetime
from pathlib import Path


def main():
    lex_path = Path("public/data/linguistic/lexemes.json")
    aday_path = Path("public/data/linguistic/lexemes_yeni_adaylar_p3.json")

    if not aday_path.exists():
        print(f"[!] Yok: {aday_path}")
        return

    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup = lex_path.with_suffix(f".backup_ekle_{ts}.json")
    shutil.copy2(lex_path, backup)
    print(f"[+] Yedek: {backup}")

    lexemes = json.loads(lex_path.read_text(encoding="utf-8"))
    adaylar = json.loads(aday_path.read_text(encoding="utf-8"))
    print(f"[+] Mevcut: {len(lexemes)}")
    print(f"[+] Aday  : {len(adaylar)}")

    mevcut_ids = {x["id"] for x in lexemes}
    mevcut_forms = {x["form"] for x in lexemes}

    eklenecek = []
    atlanan_id = 0
    atlanan_form = 0
    for a in adaylar:
        if a["id"] in mevcut_ids:
            atlanan_id += 1
            continue
        if a["form"] in mevcut_forms:
            atlanan_form += 1
            continue
        eklenecek.append(a)

    print(f"[+] Eklenecek : {len(eklenecek)}")
    print(f"[!] ID cakismasi : {atlanan_id}")
    print(f"[!] Form cakismasi: {atlanan_form}")

    lexemes.extend(eklenecek)

    lex_path.write_text(
        json.dumps(lexemes, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"[OK] Toplam: {len(lexemes)}")
    print(f"[OK] Yedek : {backup}")


if __name__ == "__main__":
    main()
