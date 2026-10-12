import re
from pathlib import Path

dump_path = Path("data/corpus/kbdwiktionary-dump.xml")
content = dump_path.read_text(encoding="utf-8", errors="ignore")

# ЩАПХЪЭХЭР geçen ilk sayfayı bul
m = re.search(r'<title>(.*?)</title>(.*?)</page>', content, re.DOTALL)
sayac = 0
for m in re.finditer(r'<title>(.*?)</title>(.*?)</page>', content, re.DOTALL):
    title = m.group(1)
    text = m.group(2)
    if "ЩАПХЪЭХЭР" in text or "IPA" in text:
        print(f"\n=== {title} ===")
        # ЩАПХЪЭХЭР çevresini göster
        idx = text.find("ЩАПХЪЭХЭР")
        if idx >= 0:
            print("ЩАПХЪЭХЭР çevresi:")
            print(text[idx:idx+500])
        idx = text.find("IPA")
        if idx >= 0:
            print("\nIPA çevresi:")
            print(text[idx:idx+200])
        sayac += 1
        if sayac >= 3:
            break
