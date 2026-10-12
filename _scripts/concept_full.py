import json
import re
from pathlib import Path

# 1) concept_mapping.json'dan tum kavramlari al
mapping = json.loads(Path('public/data/linguistic/concept_mapping.json').read_text(encoding='utf-8'))
tum_kavramlar = sorted(mapping.keys())
print(f"Mapping kavram: {len(tum_kavramlar)}")

# 2) ConceptRegistry.ts'deki mevcut kavramlar
ts_path = Path('src/domain/concept/ConceptRegistry.ts')
content = ts_path.read_text(encoding='utf-8')

mevcut = set(re.findall(r"^\s+([A-Z0-9_]+):\s*'[A-Z0-9_]+'", content, re.MULTILINE))
print(f"Registry kavram: {len(mevcut)}")

# 3) Eksikler
eksik = [k for k in tum_kavramlar if k not in mevcut]
print(f"Eksik: {len(eksik)}")
for e in eksik[:20]:
    print(f"  - {e}")

# 4) Yeni CONCEPT_REGISTRY olustur (TUM kavramlar)
yeni = """/**
 * File: src/domain/concept/ConceptRegistry.ts
 * Layer: Domain
 */

export const CONCEPT_REGISTRY = {
"""

for i, name in enumerate(tum_kavramlar):
    comma = "," if i < len(tum_kavramlar) - 1 else ""
    # Gecerli TS identifier mi?
    if re.match(r'^[A-Z_][A-Z0-9_]*$', name):
        yeni += f"  {name}: '{name}'{comma}\n"
    else:
        # String key olarak ekle
        yeni += f"  '{name}': '{name}'{comma}\n"

yeni += """} as const;

export type ConceptName = keyof typeof CONCEPT_REGISTRY;
export type ConceptId = (typeof CONCEPT_REGISTRY)[ConceptName];

export const CONCEPT_ULID_MAP: Record<string, string> = {
"""

for i, (name, ulid) in enumerate(sorted(mapping.items())):
    comma = "," if i < len(mapping) - 1 else ""
    if re.match(r'^[A-Z_][A-Z0-9_]*$', name):
        yeni += f"  {name}: '{ulid}'{comma}\n"
    else:
        yeni += f"  '{name}': '{ulid}'{comma}\n"

yeni += """};

export function getConceptUlid(conceptId: string): string | undefined {
  return CONCEPT_ULID_MAP[conceptId];
}

export function getConceptIdByUlid(ulid: string): string | undefined {
  for (const [key, value] of Object.entries(CONCEPT_ULID_MAP)) {
    if (value === ulid) return key;
  }
  return undefined;
}

export interface ConceptDisplayName {
  tr: string;
  kbd?: string;
  ady?: string;
}

export function getConceptDisplayName(conceptId: string): ConceptDisplayName | undefined {
  return { tr: conceptId };
}

export function getConceptDisplayNameTr(conceptId: string): string {
  return conceptId;
}

export function getConceptDisplayNameKbd(conceptId: string): string {
  return conceptId;
}
"""

ts_path.write_text(yeni, encoding='utf-8')
print(f"\nYeni ConceptRegistry: {len(tum_kavramlar)} kavram")
