import json
from pathlib import Path

veri = json.loads(Path("_scripts/wiktionary_veri.json").read_text(encoding="utf-8"))
print(f"Toplam: {len(veri)}")

# гуфӀэ var mı?
gufie = next((v for v in veri if v["form"] == "гуфӀэ"), None)
if gufie:
    print("\n=== гуфӀэ ===")
    print(json.dumps(gufie, ensure_ascii=False, indent=2)[:1500])
else:
    print("\n⚠️ гуфӀэ bulunamadı")

# İlk 5 kayıt
print("\n=== İlk 5 kayıt ===")
for v in veri[:5]:
    print(f"  {v['form']}: pos={v['partOfSpeech']}, ipa={v['ipa']}, examples={len(v['examples'])}")

# Örnek cümle bulunan ilk 5
print("\n=== Örnek cümle bulunan ilk 5 ===")
sayac = 0
for v in veri:
    if v["examples"]:
        print(f"\n{v['form']}:")
        for c in v["examples"][:2]:
            print(f"  - {c[:80]}")
        sayac += 1
        if sayac >= 5:
            break

# İstatistikler
pos_dagilim = {}
for v in veri:
    pos = v.get("partOfSpeech") or "yok"
    pos_dagilim[pos] = pos_dagilim.get(pos, 0) + 1
print("\n=== partOfSpeech dağılımı ===")
for pos, sayi in sorted(pos_dagilim.items(), key=lambda x: -x[1])[:15]:
    print(f"  {pos:20s} {sayi:5}")
