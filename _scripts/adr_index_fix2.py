import re
from pathlib import Path

index_path = Path('docs/architecture/adr/ADR_INDEX.md')
content = index_path.read_text(encoding='utf-8')

# Eksik ADR'ler
eksik = {
    'ADR_0001_MODULAR_TYPE_ARCHITECTURE': 'Modular Type Architecture',
    'ADR_0002_DOMAIN_MODEL_MEANING_GROUP': 'Domain Model Meaning Group',
    'ADR_0003_ITRANSLATIONREPOSITORY_SEPARATION': 'ITranslationRepository Separation',
    'ADR_0014_CONCEPT_NETWORK_PROJECTION': 'Concept Network Projection',
}

# Kontrol
print("=== MEVCUT DURUM ===")
for e in eksik:
    if e in content:
        print(f"✅ {e}")
    else:
        print(f"❌ {e}")

# Yeni bölüm
yeni_bolum = """
## FOUNDATION ADR'LERI

| ADR | Baslik | Dosya | Durum |
|-----|--------|-------|-------|
| ADR_0001 | Modular Type Architecture | `ADR_0001_MODULAR_TYPE_ARCHITECTURE.md` | Accepted |
| ADR_0002 | Domain Model Meaning Group | `ADR_0002_DOMAIN_MODEL_MEANING_GROUP.md` | Accepted |
| ADR_0003 | ITranslationRepository Separation | `ADR_0003_ITRANSLATIONREPOSITORY_SEPARATION.md` | Accepted |
| ADR_0014 | Concept Network Projection | `ADR_0014_CONCEPT_NETWORK_PROJECTION.md` | Accepted |

## COMPLETION APPROVALS
"""

# Ekle
if 'FOUNDATION ADR' not in content:
    # İlk COMPLETION APPROVALS'tan önce ekle
    idx = content.find('## COMPLETION APPROVALS')
    if idx > 0:
        content = content[:idx] + yeni_bolum + content[idx + len('## COMPLETION APPROVALS'):]
        print("\n✅ Foundation ADR bolumu eklendi")
    else:
        content += yeni_bolum
        print("\n✅ Foundation ADR bolumu sona eklendi")
else:
    print("\n⚠️ Foundation ADR bolumu zaten var")

index_path.write_text(content, encoding='utf-8')
print(f"Yeni boyut: {len(content)} karakter")
