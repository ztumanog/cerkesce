import json
from pathlib import Path

# Hedef sözlükler
hedefler = [
    "public/data/27.Tur-Ady_Abaze.json",
    "public/data/32.Rus-Kbd_Nalchik_2013.json",
]

for yol in hedefler:
    p = Path(yol)
    if not p.exists():
        print(f"❌ {yol} yok")
        continue
    
    print(f"\n{'='*70}")
    print(f"📁 {p.name}")
    print('='*70)
    
    data = json.loads(p.read_text(encoding="utf-8"))
    
    if isinstance(data, list):
        print(f"Kayıt: {len(data)}")
        if data:
            print(f"Anahtarlar: {list(data[0].keys())}")
            # Örnek cümle içeren ilk 3 kaydı göster
            sayac = 0
            for item in data:
                if isinstance(item, dict):
                    for key, val in item.items():
                        if isinstance(val, str) and len(val) > 60:
                            if any(m in val for m in ["◊", "~", "Example", "Пример", "Örnek"]):
                                print(f"\n  [{key}] {val[:300]}")
                                sayac += 1
                                break
                    if sayac >= 3:
                        break
    elif isinstance(data, dict):
        print(f"Anahtarlar: {list(data.keys())[:10]}")
        if "words" in data:
            words = data["words"]
            print(f"words: {len(words)}")
            if words:
                print(f"İlk kelime anahtarları: {list(words[0].keys()) if isinstance(words[0], dict) else '?'}")
                # Örnek cümle var mı?
                for w in words[:5]:
                    if isinstance(w, dict):
                        for key, val in w.items():
                            if isinstance(val, str) and len(val) > 60:
                                if any(m in val for m in ["◊", "~", "Example", "Пример", "Örnek"]):
                                    print(f"\n  [{key}] {val[:300]}")
