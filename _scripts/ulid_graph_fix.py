import re, sys
from pathlib import Path

APPLY = '--apply' in sys.argv
REG = Path('src/domain/concept/ConceptRegistry.ts')
MAP = Path('src/domain/discovery/services/QuerySemanticMapper.ts')
REPO = Path('src/repository/InMemoryConceptGraphRepository.ts')

def load(p):
    raw = p.read_bytes().decode('utf-8')
    nl = '\r\n' if '\r\n' in raw else '\n'
    return raw.replace('\r\n', '\n'), nl, raw

reg, _, _ = load(REG)
m = re.search(r"export const CONCEPT_ULID_MAP[^=\n]*=\s*\{\n(.*?)\n\};", reg, re.S)
if not m:
    sys.exit('HATA: CONCEPT_ULID_MAP bulunamadi, hicbir dosya degismedi.')
ulid_names = set(re.findall(r"^[ \t]+'?([A-Z0-9_]+)'?:[ \t]*'[0-9A-Z]{26}'", m.group(1), re.M))
print('ULID tablosu:', len(ulid_names))

# ---- Repository ----
repo, repo_nl, repo_raw = load(REPO)
static_re = re.compile(r"(static readonly \w+ = )CONCEPT_REGISTRY\.([A-Z0-9_]+);")
refs = static_re.findall(repo)
missing = sorted({n for _, n in refs if n not in ulid_names})
print('Repository sabit sayisi:', len(refs))
if missing:
    sys.exit('HATA: ULID tablosunda olmayan kavramlar: ' + ', '.join(missing))
others = len(re.findall(r'CONCEPT_REGISTRY\.', static_re.sub('', repo)))
print('Sabitler disinda CONCEPT_REGISTRY kullanimi:', others)

new_repo = repo
if 'ulidOf(' in repo:
    print('Repository zaten donusturulmus, atlandi.')
else:
    imp = "import { CONCEPT_REGISTRY } from '../domain/concept/ConceptRegistry';"
    if imp not in repo:
        sys.exit('HATA: repository import satiri beklenen bicimde degil.')
    helper = (
        "import { CONCEPT_REGISTRY, getConceptUlid } from '../domain/concept/ConceptRegistry';\n\n"
        "function ulidOf(name: string): string {\n"
        "  const ulid = getConceptUlid(name);\n"
        "  if (!ulid) throw new Error('ConceptRegistry ULID yok: ' + name);\n"
        "  return ulid;\n"
        "}"
    )
    new_repo = static_re.sub(r"\1ulidOf(CONCEPT_REGISTRY.\2);", repo)
    new_repo = new_repo.replace(imp, helper, 1)

# ---- Mapper ----
mp, mp_nl, mp_raw = load(MAP)
new_mp = mp
if 'getConceptUlid' in mp:
    print('Mapper zaten donusturulmus, atlandi.')
else:
    a_old = "import { CONCEPT_REGISTRY } from '../../concept/ConceptRegistry';"
    b_old = "const WATER_CONCEPT_ID: string = CONCEPT_REGISTRY.WATER;"
    if a_old not in mp or b_old not in mp:
        sys.exit('HATA: mapper beklenen bicimde degil.')
    new_mp = mp.replace(a_old, "import { CONCEPT_REGISTRY, getConceptUlid } from '../../concept/ConceptRegistry';")
    new_mp = new_mp.replace(b_old, "const WATER_CONCEPT_ID: string = getConceptUlid(CONCEPT_REGISTRY.WATER) ?? CONCEPT_REGISTRY.WATER;")

# mapQuery'ye eklenen kisayol artik gereksiz
blok = (
    "    // Once senkron map'i dene (hardcoded sozluk: su, water, вода, псы)\n"
    "    const syncResult = this.map(query);\n"
    "    if (syncResult.conceptId) {\n"
    "      return syncResult;\n"
    "    }\n\n"
)
if blok in new_mp:
    new_mp = new_mp.replace(blok, '')
    print('mapQuery kisayolu kaldirildi.')
else:
    print('mapQuery kisayolu bulunamadi (zaten yok).')

if not APPLY:
    print('Kuru calistirma: dosyalar degismedi. Uygulamak icin --apply ekle.')
    sys.exit(0)

Path('_scripts').mkdir(exist_ok=True)
Path('_scripts/InMemoryConceptGraphRepository.ts.bak').write_bytes(repo_raw.encode('utf-8'))
Path('_scripts/QuerySemanticMapper.ts.bak').write_bytes(mp_raw.encode('utf-8'))
REPO.write_bytes(new_repo.replace('\n', repo_nl).encode('utf-8'))
MAP.write_bytes(new_mp.replace('\n', mp_nl).encode('utf-8'))
print('Tamam. Yedekler _scripts altinda.')
