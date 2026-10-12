import json
from pathlib import Path

lex = json.load(open('public/data/linguistic/lexemes.json', encoding='utf-8'))

normal = [l for l in lex if not l.get('id','').startswith('L-KBD-')]
kbd = [l for l in lex if l.get('id','').startswith('L-KBD-')]

print("=" * 60)
print("NORMAL KAYITLAR")
print("=" * 60)
print(f"Toplam: {len(normal)}")
print(f"rootIds dolu: {sum(1 for l in normal if l.get('rootIds'))}")
print(f"wordFamilyId dolu: {sum(1 for l in normal if l.get('wordFamilyId'))}")
print(f"conceptId dolu: {sum(1 for l in normal if l.get('conceptId'))}")

print()
print("=" * 60)
print("L-KBD KAYITLARI")
print("=" * 60)
print(f"Toplam: {len(kbd)}")
print(f"rootIds dolu: {sum(1 for l in kbd if l.get('rootIds'))}")
print(f"wordFamilyId dolu: {sum(1 for l in kbd if l.get('wordFamilyId'))}")
print(f"conceptId dolu: {sum(1 for l in kbd if l.get('conceptId'))}")

print()
print("=" * 60)
print("ROOT DOLU İLK 10 (normal)")
print("=" * 60)
root = [l for l in normal if l.get('rootIds')]
for l in root[:10]:
    print(f"  {l['id']:15s} {l.get('form','?'):20s} root={l.get('rootIds')}")

print()
print("=" * 60)
print("WORDFAMILY DOLU İLK 10 (normal)")
print("=" * 60)
wf = [l for l in normal if l.get('wordFamilyId')]
for l in wf[:10]:
    print(f"  {l['id']:15s} {l.get('form','?'):20s} wf={l.get('wordFamilyId')}")

print()
print("=" * 60)
print("CONCEPT DOLU İLK 10 (normal)")
print("=" * 60)
con = [l for l in normal if l.get('conceptId')]
for l in con[:10]:
    print(f"  {l['id']:15s} {l.get('form','?'):20s} con={l.get('conceptId')}")