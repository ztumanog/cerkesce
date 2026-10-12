import json
from pathlib import Path
from collections import Counter

LEX_PATH = Path("public/data/linguistic/lexemes.json")

def load():
    return json.loads(LEX_PATH.read_text(encoding="utf-8"))

def main():
    lex = load()
    n = len(lex)

    with_root = [l for l in lex if l.get("rootIds")]
    without_root = [l for l in lex if not l.get("rootIds")]

    print("=" * 70)
    print("ROOT COVERAGE GAP ANALYSIS")
    print("=" * 70)
    print(f"Toplam lexeme       : {n}")
    print(f"rootIds dolu        : {len(with_root)}  ({len(with_root)/n*100:.1f}%)")
    print(f"rootIds bos         : {len(without_root)}  ({len(without_root)/n*100:.1f}%)")
    print()

    pos_counter = Counter(l.get("partOfSpeech", "?") for l in without_root)
    print("-" * 70)
    print("KOKSUZ LEXEMELERIN POS DAGILIMI")
    print("-" * 70)
    for pos, count in pos_counter.most_common():
        print(f"  {pos:20s} {count:6d}  ({count/len(without_root)*100:.1f}%)")
    print()

    len_counter = Counter(len(l.get("form", "")) for l in without_root)
    print("-" * 70)
    print("KOKSUZ LEXEMELERIN UZUNLUK DAGILIMI")
    print("-" * 70)
    for uzunluk in sorted(len_counter.keys()):
        count = len_counter[uzunluk]
        bar = "#" * min(int(count / 100), 50)
        print(f"  {uzunluk:2d} karakter  {count:6d}  {bar}")
    print()

    ADAY_POS = {"noun", "adj", "adjective", "verb"}
    adaylar = [
        l for l in without_root
        if 2 <= len(l.get("form", "")) <= 5
        and l.get("partOfSpeech") in ADAY_POS
        and l.get("isLemma")
    ]
    print("-" * 70)
    print(f"KOK ADAYI (kisa + isim/sifat/fiil + lemma): {len(adaylar)}")
    print("-" * 70)
    for l in adaylar[:30]:
        form = l.get("form", "?")
        pos = l.get("partOfSpeech", "?")
        anlam = (l.get("literalMeaning") or "")[:40]
        print(f"  {l['id']:12s} {form:15s} {pos:8s} {anlam}")
    print()

    turemis = [
        l for l in without_root
        if len(l.get("form", "")) >= 8
        and not l.get("wordFamilyId")
    ]
    print("-" * 70)
    print(f"KOKSUZ + AILESIZ + UZUN (>=8 karakter): {len(turemis)}")
    print("-" * 70)
    for l in turemis[:20]:
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "")[:40]
        print(f"  {l['id']:12s} {form:25s} {anlam}")
    print()

    root_usage = Counter()
    for l in with_root:
        for r in (l.get("rootIds") or []):
            root_usage[r] += 1
    print("-" * 70)
    print(f"KULLANILAN FARKLI ROOT SAYISI: {len(root_usage)}")
    print("-" * 70)
    print("  En yogun 15 root:")
    for r, count in root_usage.most_common(15):
        print(f"    {r:15s} {count:5d} lexeme")
    print()
    print("  En seyrek 15 root:")
    for r, count in root_usage.most_common()[-15:]:
        print(f"    {r:15s} {count:5d} lexeme")
    print()

    print("=" * 70)
    print("OZET KARAR")
    print("=" * 70)
    potansiyel = len(with_root) + len(adaylar)
    print(f"Mevcut rootlu lexeme    : {len(with_root)}")
    print(f"Hizli kazanc potansiyeli: +{len(adaylar)}  (kok adaylari)")
    print(f"Teorik yeni doluluk     : {potansiyel/n*100:.1f}%")

if __name__ == "__main__":
    main()
