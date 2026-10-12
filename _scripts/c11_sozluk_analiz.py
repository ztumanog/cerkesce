import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path
from collections import Counter

data_dir = Path("public/data")
sozluk_files = [f for f in sorted(data_dir.glob("*.json")) if f.name[0].isdigit()]
lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

print(f"=== {len(sozluk_files)} SOZLUK, {len(lex)} LEXEME ===\n")

# Her sozluk icin lexeme bul
sonuclar = {}
for f in sozluk_files:
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
        words = data.get("words", {})
        # Sozlukteki tum spelling'leri topla (kucuk harf)
        sozluk_set = set()
        for w, wdata in words.items():
            sp = wdata.get("spelling", w)
            if sp:
                sozluk_set.add(sp.lower())
        
        # Lexeme'leri ara
        bulunan = []
        bulunmayan = []
        for l in lex:
            form = l.get("form", "")
            if not form:
                continue
            if form.lower() in sozluk_set:
                bulunan.append(l["id"])
            else:
                bulunmayan.append(l["id"])
        
        sonuclar[f.name] = {
            "title": data.get("title", f.name),
            "from": data.get("fromLang", "?"),
            "to": data.get("toLang", "?"),
            "kelime": len(words),
            "bulunan": len(bulunan),
            "bulunmayan": len(bulunmayan),
            "bulunan_ids": bulunan,
            "bulunmayan_ids": bulunmayan
        }
        print(f"  {f.name}: {len(bulunan)}/{len(lex)}")
    except Exception as e:
        print(f"  {f.name}: HATA - {e}")

# En cok bulunan sozlukler
print(f"\n=== EN COK BULUNAN ===")
sirali = sorted(sonuclar.items(), key=lambda x: -x[1]["bulunan"])
for fname, s in sirali[:10]:
    print(f"  {fname}: {s['bulunan']}/{len(lex)} ({s['title'][:40]})")

# Hicbir sozlukte bulunmayan lexeme'ler
print(f"\n=== HICBIR SOZLUKTE BULUNMAYAN ===")
tum_bulunan = set()
for s in sonuclar.values():
    tum_bulunan.update(s["bulunan_ids"])
hic_bulunmayan = [l for l in lex if l["id"] not in tum_bulunan]
print(f"Toplam: {len(hic_bulunmayan)}")
for l in hic_bulunmayan[:30]:
    print(f"  {l['id']:25} {l.get('form',''):20} {l.get('literalMeaning','')[:30]}")

# Kaydet
Path("data/corpus/frequency/c11_sozluk_analiz.json").write_text(
    json.dumps({k: {kk: vv for kk, vv in v.items() if kk not in ["bulunan_ids", "bulunmayan_ids"]} 
                for k, v in sonuclar.items()}, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nKaydedildi: c11_sozluk_analiz.json")
