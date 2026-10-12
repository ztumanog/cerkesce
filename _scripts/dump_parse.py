import bz2
import re
import json
from pathlib import Path

# 1. Dump aç
dump_path = Path("data/corpus/kbdwiktionary-dump.xml.bz2")
print("Dump açılıyor...")
with bz2.open(dump_path, "rt", encoding="utf-8") as f:
    content = f.read()

print(f"Toplam: {len(content):,} karakter")

# 2. Sayfaları çıkar
pages = re.findall(r'<page>(.*?)</page>', content, re.DOTALL)
print(f"Sayfa sayısı: {len(pages)}")

# 3. Her sayfa için title + text
entries = []
for page in pages:
    title_match = re.search(r'<title>(.*?)</title>', page, re.DOTALL)
    text_match = re.search(r'<text[^>]*>(.*?)</text>', page, re.DOTALL)
    
    if title_match and text_match:
        title = title_match.group(1).strip()
        text = text_match.group(1)
        
        # IPA ara
        ipa_patterns = [
            r'\{\{IPA\|([^}]+)\}\}',           # {{IPA|...}}
            r'/([^/\n]{2,50})/',                # /.../
            r'\[([^\]]{2,50})\]',               # [...]
        ]
        
        ipa = None
        for pattern in ipa_patterns:
            m = re.search(pattern, text)
            if m:
                ipa = m.group(1).strip()
                break
        
        # POS ara
        pos_patterns = [
            r'\{\{([a-z\-]+)\}\}',              # {{noun}}, {{verb}}
            r'==+\s*([^=\n]+?)\s*==+',           # == Başlık ==
        ]
        
        pos = None
        for pattern in pos_patterns:
            m = re.search(pattern, text)
            if m:
                pos = m.group(1).strip()
                break
        
        entries.append({
            "word": title,
            "ipa": f"/{ipa}/" if ipa and not ipa.startswith("/") else ipa,
            "pos": pos,
            "text_preview": text[:200]
        })

print(f"Toplam girdi: {len(entries)}")
print(f"IPA olan: {sum(1 for e in entries if e.get('ipa'))}")
print(f"POS olan: {sum(1 for e in entries if e.get('pos'))}")

# 4. Kaydet
out_path = Path("data/corpus/kbdwiktionary-entries.json")
out_path.write_text(json.dumps(entries, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\n✅ Kaydedildi: {out_path}")

# 5. İlk 10
print("\n=== İlk 10 ===")
for e in entries[:10]:
    print(f"  {e['word']:20s} | IPA: {str(e.get('ipa', 'YOK')):25s} | POS: {e.get('pos', 'YOK')}")
