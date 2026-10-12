import json
from pathlib import Path

wik = json.loads(Path("data/corpus/wiktionary-entries.json").read_text(encoding="utf-8"))
print(f"Toplam girdi: {len(wik)}")

ipa_olan = [w for w in wik if w.get("ipa")]
print(f"IPA olan: {len(ipa_olan)}")

print("\n=== İlk 5 ===")
for w in wik[:5]:
    print(f"  {w['word']:15s} | IPA: {w.get('ipa', 'YOK'):15s} | POS: {w.get('partOfSpeech', 'YOK')}")
