import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

# 1) Tum sozlukleri yukle
data_dir = Path("public/data")
sozlukler = {}

for f in sorted(data_dir.glob("*.json")):
    if not f.name[0].isdigit():
        continue
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
        words = data.get("words", {})
        # spelling -> word data
        spelling_map = {}
        for w, wdata in words.items():
            sp = wdata.get("spelling", w)
            if sp:
                spelling_map[sp.lower()] = {
                    "spelling": sp,
                    "word_key": w,
                    "data": wdata
                }
        sozlukler[f.name] = {
            "title": data.get("title", f.name),
            "from": data.get("fromLang", "?"),
            "to": data.get("toLang", "?"),
            "count": len(words),
            "spelling_map": spelling_map
        }
    except Exception as e:
        pass

print("=" * 70)
print(f"SOZLUK ARAMA ARACI - {len(sozlukler)} sozluk yuklendi")
print("=" * 70)
print("Cikmak icin: 'q' veya 'exit'")
print("=" * 70)

# 2) Interaktif arama dongusu
while True:
    try:
        kelime = input("\nKelime girin: ").strip()
    except (EOFError, KeyboardInterrupt):
        print("\nCikiliyor...")
        break
    
    if not kelime or kelime.lower() in ["q", "exit", "quit"]:
        print("Cikiliyor...")
        break
    
    # 3) Tum sozluklerde ara
    sonuclar = []
    for fname, s in sozlukler.items():
        sp_map = s["spelling_map"]
        key = kelime.lower()
        if key in sp_map:
            entry = sp_map[key]
            # Anlami cikar
            data = entry["data"]
            anlam = ""
            for field in ["translation", "meaning", "definition", "ru", "en", "tr"]:
                if field in data:
                    anlam = str(data[field])[:80]
                    break
            if not anlam:
                # full_definition_in_html'den cikar
                html = data.get("full_definition_in_html", "")
                if html:
                    import re
                    anlam = re.sub(r'<[^>]+>', '', html)[:80]
            sonuclar.append({
                "sozluk": fname,
                "title": s["title"][:40],
                "from": s["from"],
                "to": s["to"],
                "anlam": anlam
            })
    
    # 4) Sonuclari goster
    if sonuclar:
        print(f"\n✅ '{kelime}' {len(sonuclar)} sozlukte bulundu:\n")
        for s in sonuclar:
            print(f"  📖 {s['sozluk']}")
            print(f"     {s['title']} ({s['from']}->{s['to']})")
            print(f"     Anlam: {s['anlam']}")
            print()
    else:
        print(f"\n❌ '{kelime}' hicbir sozlukte bulunamadi.")
