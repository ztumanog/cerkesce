import json
import re
from pathlib import Path

# Tüm sözlükleri tara
sozluk_dir = Path("public/data")
tum_ornekler = {}

for f in sozluk_dir.rglob("*.json"):
    if "linguistic" in str(f):
        continue
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
        
        # words dict mi?
        if isinstance(data, dict) and "words" in data:
            words = data["words"]
            if isinstance(words, dict):
                for word, item in words.items():
                    if not isinstance(item, dict):
                        continue
                    
                    # full_definition_in_html içinde ◊ ara
                    html = item.get("full_definition_in_html", "")
                    if html and "◊" in html:
                        # HTML temizle
                        text = re.sub(r'<[^>]+>', ' ', html)
                        text = text.replace("&nbsp;", " ").replace("&amp;", "&")
                        # ◊ ile başlayan cümleleri bul
                        parts = re.split(r'◊', text)
                        ornekler = []
                        for part in parts[1:]:
                            cumle = part.split("-")[0].strip()
                            cumle = re.sub(r'\s+', ' ', cumle)
                            if len(cumle) > 10:
                                ornekler.append(cumle[:200])
                        if ornekler:
                            tum_ornekler[word] = {
                                "examples": ornekler[:3],
                                "source": f.name
                            }
                    
                    # definitions[].examples içinde ◊ ara
                    defs = item.get("definitions", [])
                    if isinstance(defs, list):
                        for d in defs:
                            if isinstance(d, dict):
                                for ex in d.get("examples", []):
                                    if isinstance(ex, str) and "◊" in ex:
                                        cumle = ex.split("◊")[1].strip() if "◊" in ex else ex
                                        cumle = re.sub(r'\s+', ' ', cumle)
                                        if len(cumle) > 10:
                                            if word not in tum_ornekler:
                                                tum_ornekler[word] = {"examples": [], "source": f.name}
                                            tum_ornekler[word]["examples"].append(cumle[:200])
    except Exception as e:
        pass

print(f"◊ ile örnek cümle bulunan kelime: {len(tum_ornekler)}")

# Örnek göster
print("\n=== İlk 20 örnek ===")
for k, v in list(tum_ornekler.items())[:20]:
    print(f"\n  {k} ({v['source']}):")
    for ex in v["examples"][:2]:
        print(f"    ◊ {ex[:100]}")

# Kaydet
Path("_scripts/diamond_ornekler.json").write_text(
    json.dumps(tum_ornekler, ensure_ascii=False, indent=2), encoding="utf-8"
)
print("\nOK Kaydedildi: _scripts/diamond_ornekler.json")
