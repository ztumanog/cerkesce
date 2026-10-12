import json
import re
from pathlib import Path

# 1) concept_mapping.json'dan ULID'leri al
mapping_path = Path('public/data/linguistic/concept_mapping.json')
mapping = json.loads(mapping_path.read_text(encoding='utf-8'))
print(f"ULID mapping: {len(mapping)}")

# 2) ConceptRegistry.ts'den kavram isimlerini al
ts_path = Path('src/domain/concept/ConceptRegistry.ts')
content = ts_path.read_text(encoding='utf-8')
matches = re.findall(r"^\s+([A-Z0-9_]+):\s*\{", content, re.MULTILINE)
print(f"Kavram: {len(matches)}")

# 3) Yeni ConceptRegistry.ts (STRING + ULID mapping)
yeni = """/**
 * File: src/domain/concept/ConceptRegistry.ts
 * Layer: Domain
 * 
 * Tum Concept ID'lerinin merkezi kaydi.
 * STRING TABANLI - ULID mapping JSON'da
 */

export const CONCEPT_REGISTRY = {
"""

for i, name in enumerate(matches):
    comma = "," if i < len(matches) - 1 else ""
    yeni += f"  {name}: '{name}'{comma}\n"

yeni += """} as const;

export type ConceptName = keyof typeof CONCEPT_REGISTRY;
export type ConceptId = (typeof CONCEPT_REGISTRY)[ConceptName];

/**
 * ULID mapping (concept_mapping.json'dan)
 * Not: Bu obje script ile doldurulur.
 */
export const CONCEPT_ULID_MAP: Record<string, string> = {
"""

# ULID mapping ekle
for i, (name, ulid) in enumerate(sorted(mapping.items())):
    comma = "," if i < len(mapping) - 1 else ""
    yeni += f"  {name}: '{ulid}'{comma}\n"

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
print(f"ConceptRegistry.ts guncellendi: {len(matches)} kavram, {len(mapping)} ULID")
