import json
import os

# Tam yol
BASE = r"E:\projeler\Cerkesce"
LEX_PATH = os.path.join(BASE, "public", "data", "linguistic", "lexemes.json")

print(f"Dosya: {LEX_PATH}")
print(f"Var mi: {os.path.exists(LEX_PATH)}")
print()

with open(LEX_PATH, encoding='utf-8') as f:
    lex = json.load(f)

lex = [l for l in lex if l and isinstance(l, dict)]

n = len(lex)

def has_root(l):
    rid = l.get('rootIds')
    return rid and isinstance(rid, list) and len(rid) > 0

def has_deriv_root(l):
    d = l.get('derivation')
    if not d or not isinstance(d, dict):
        return False
    rid = d.get('rootIds')
    return rid and isinstance(rid, list) and len(rid) > 0

r = sum(1 for l in lex if has_root(l))
d = sum(1 for l in lex if has_deriv_root(l))
both = sum(1 for l in lex if has_root(l) and has_deriv_root(l))
none = sum(1 for l in lex if not has_root(l) and not has_deriv_root(l))

print('=' * 60)
print('ROOT COVERAGE - GERCEK DURUM')
print('=' * 60)
print(f'Toplam: {n}')
print(f'rootIds dolu:              {r} ({r/n*100:.1f}%)')
print(f'derivation.rootIds dolu:   {d} ({d/n*100:.1f}%)')
print(f'ikisi de dolu:             {both}')
print(f'hicbiri dolu degil:        {none} ({none/n*100:.1f}%)')
print(f'GERCEK COVERAGE:           {n-none} ({(n-none)/n*100:.1f}%)')
print()

kopyalanacak = [l for l in lex if has_deriv_root(l) and not has_root(l)]
print(f'Kopyalanacak (derivation -> rootIds): {len(kopyalanacak)}')
for l in kopyalanacak[:10]:
    rid = l.get('derivation', {}).get('rootIds', [])
    print(f'  {l.get("id", "?")}: {l.get("form", "?")} -> {rid}')