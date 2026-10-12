import re
from pathlib import Path

dump_path = Path("data/corpus/kbdwiktionary-dump.xml")
content = dump_path.read_text(encoding="utf-8", errors="ignore")

# гуфӏэ sayfasını bul (dikkat: Ӏ yerine ӏ olabilir)
for form in ["гуфӀэ", "гуфӏэ", "гуфIэ"]:
    m = re.search(rf'<title>{re.escape(form)}</title>(.*?)</page>', content, re.DOTALL)
    if m:
        text = m.group(1)
        print(f"=== {form} bulundu (uzunluk: {len(text)}) ===")
        print(text[:3000])
        break
    else:
        print(f"{form} bulunamadı")
