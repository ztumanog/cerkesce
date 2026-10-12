import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
import re
from pathlib import Path
import os

# Thonny icin proje kokunu ayarla
PROJE_KOKU = Path("E:/projeler/Cerkesce")
if PROJE_KOKU.exists():
    os.chdir(PROJE_KOKU)

print(f"Calisma dizini: {os.getcwd()}")
print("=" * 70)

# 1) Tum sozlukleri yukle
data_dir = Path("public/data")
sozlukler = {}

for f in sorted(data_dir.glob("*.json")):
    if not f.name[0].isdigit():
        continue
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
        words = data.get("words", {})
        if not isinstance(words, dict):
            continue

        spelling_map = {}
        for w, wdata in words.items():
            if not isinstance(wdata, dict):
                continue
                
            sp = wdata.get("spelling", w)
            if sp:
                key = sp.lower()
                if key not in spelling_map:
                    spelling_map[key] = []
                spelling_map[key].append({
                    "spelling": sp,
                    "data": wdata
                })

        sozlukler[f.name] = {
            "title": data.get("title", f.name),
            "from": data.get("fromLang", "?"),
            "to": data.get("toLang", "?"),
            "spelling_map": spelling_map
        }
    except Exception as e:
        print(f"HATA {f.name}: {e}")

print(f"{len(sozlukler)} sozluk yuklendi")
print("=" * 70)
print("Cikmak icin: q")
print("Toplu arama: virgul ile ayirin")
print("=" * 70)

# 2) Arama dongusu
while True:
    try:
        girdi = input("\nKelime(ler): ").strip()
    except (EOFError, KeyboardInterrupt):
        print("\nCikiliyor...")
        break
        
    if not girdi or girdi.lower() in ["q", "exit", "quit"]:
        print("Cikiliyor...")
        break
        
    kelimeler = [k.strip() for k in girdi.split(",") if k.strip()]
    
    for kelime in kelimeler:
        sonuclar = []
        key = kelime.lower()
        
        for fname, s in sozlukler.items():
            if key in s["spelling_map"]:
                entries = s["spelling_map"][key]
                for entry in entries:
                    data = entry["data"]
                    anlam = ""
                    for field in ["translation", "meaning", "definition"]:
                        if field in data and data[field]:
                            anlam = str(data[field])[:80]
                            break
                    if not anlam:
                        html = data.get("full_definition_in_html", "")
                        if html:
                            anlam = re.sub(r'<[^>]+>', '', str(html))[:80].strip()
                    sonuclar.append({
                        "sozluk": fname,
                        "title": s["title"][:40],
                        "from": s["from"],
                        "to": s["to"],
                        "anlam": anlam
                    })
        
        if sonuclar:
            print(f"\n[OK] '{kelime}' {len(sonuclar)} kayit bulundu:")
            for s in sonuclar:
                print(f"  - {s['sozluk']} ({s['from']}->{s['to']})")
                print(f"    {s['title']}")
                print(f"    Anlam: {s['anlam']}")
        else:
            print(f"\n[YOK] '{kelime}' hicbir sozlukte bulunamadi.")