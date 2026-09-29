/**
 * DiscoveryRelationType
 * 
 * Discovery Engine ve Sözlük ilişkileri için tüm bağ türleri.
 * Hem Faz 3 (sözlük) hem de Discovery Engine (graph) tarafından kullanılır.
 */

export enum DiscoveryRelationType {
  // Discovery Engine (graph) ilişkileri
  ROOT = 'ROOT',
  SYNONYM = 'SYNONYM',
  ANTONYM = 'ANTONYM',
  PARENT = 'PARENT',
  CHILD = 'CHILD',
  RELATED = 'RELATED',
  STATE_OF = 'STATE_OF',
  CATEGORY_OF = 'CATEGORY_OF',
  LOCATION_OF = 'LOCATION_OF',

  // Faz 3 (sözlük) ilişkileri
  DIALECT_VARIANT = 'DIALECT_VARIANT',
  DERIVED = 'DERIVED',
  HOMONYM = 'HOMONYM',
  COMPOUND = 'COMPOUND',
}

export type DiscoveryRelationTypeString = keyof typeof DiscoveryRelationType;

export const RELATION_TYPE_LABELS: Record<DiscoveryRelationType, string> = {
  [DiscoveryRelationType.ROOT]: 'Kök Kelime',
  [DiscoveryRelationType.SYNONYM]: 'Eş Anlamlı',
  [DiscoveryRelationType.ANTONYM]: 'Zıt Anlamlı',
  [DiscoveryRelationType.PARENT]: 'Üst Kavram',
  [DiscoveryRelationType.CHILD]: 'Alt Kavram',
  [DiscoveryRelationType.RELATED]: 'İlgili',
  [DiscoveryRelationType.STATE_OF]: 'Durum',
  [DiscoveryRelationType.CATEGORY_OF]: 'Kategori',
  [DiscoveryRelationType.LOCATION_OF]: 'Konum',
  [DiscoveryRelationType.DIALECT_VARIANT]: 'Lehçe Farkı',
  [DiscoveryRelationType.DERIVED]: 'Türetilmiş',
  [DiscoveryRelationType.HOMONYM]: 'Eş Sesli',
  [DiscoveryRelationType.COMPOUND]: 'Birleşik Kelime',
};

export const RELATION_TYPE_STYLES: Record<DiscoveryRelationType, string> = {
  [DiscoveryRelationType.ROOT]: 'bg-amber-50 text-amber-700 border-amber-200',
  [DiscoveryRelationType.SYNONYM]: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  [DiscoveryRelationType.ANTONYM]: 'bg-rose-50 text-rose-700 border-rose-200',
  [DiscoveryRelationType.PARENT]: 'bg-blue-50 text-blue-700 border-blue-200',
  [DiscoveryRelationType.CHILD]: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  [DiscoveryRelationType.RELATED]: 'bg-slate-50 text-slate-700 border-slate-200',
  [DiscoveryRelationType.STATE_OF]: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  [DiscoveryRelationType.CATEGORY_OF]: 'bg-purple-50 text-purple-700 border-purple-200',
  [DiscoveryRelationType.LOCATION_OF]: 'bg-sky-50 text-sky-700 border-sky-200',
  [DiscoveryRelationType.DIALECT_VARIANT]: 'bg-sky-50 text-sky-700 border-sky-200',
  [DiscoveryRelationType.DERIVED]: 'bg-purple-50 text-purple-700 border-purple-200',
  [DiscoveryRelationType.HOMONYM]: 'bg-slate-50 text-slate-700 border-slate-200',
  [DiscoveryRelationType.COMPOUND]: 'bg-indigo-50 text-indigo-700 border-indigo-200',
};

export function getRelationLabel(type: DiscoveryRelationType | string): string {
  const validKey = type as DiscoveryRelationType;
  return RELATION_TYPE_LABELS[validKey] || 'İlişkili Kelime';
}

export function getRelationStyle(type: DiscoveryRelationType | string): string {
  const validKey = type as DiscoveryRelationType;
  return RELATION_TYPE_STYLES[validKey] || 'bg-slate-100 text-slate-700 border-slate-200';
}
