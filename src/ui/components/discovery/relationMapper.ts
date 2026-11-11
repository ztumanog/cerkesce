import { DiscoveryRelationType } from '@/domain/discovery/types/DiscoveryRelationType';

export interface RelationMeta {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

export const DEFAULT_RELATION_META: RelationMeta = {
  label: 'Anlamsal Bağ',
  color: '#4b5563',
  bgColor: '#f3f4f6',
  borderColor: '#9ca3af',
  description: 'Anlamsal ağ ilişkisi',
};

export const RELATION_META_MAP: Partial<Record<DiscoveryRelationType, RelationMeta>> = {
  [DiscoveryRelationType.ROOT]: {
    label: 'Kök',
    color: '#0284c7',
    bgColor: '#e0f2fe',
    borderColor: '#38bdf8',
    description: 'Kök kavram bağı',
  },
  [DiscoveryRelationType.PARENT]: {
    label: 'Üst Kavram',
    color: '#ea580c',
    bgColor: '#ffedd5',
    borderColor: '#fb923c',
    description: 'Daha genel kapsayıcı kategori',
  },
  [DiscoveryRelationType.CHILD]: {
    label: 'Alt Kavram',
    color: '#0891b2',
    bgColor: '#cffafe',
    borderColor: '#22d3ee',
    description: 'Daha özelleşmiş alt kategori',
  },
  [DiscoveryRelationType.RELATED]: {
    label: 'İlişkili',
    color: '#d97706',
    bgColor: '#fef3c7',
    borderColor: '#fbbf24',
    description: 'Genel anlamsal ilişki bağı',
  },
  [DiscoveryRelationType.DIALECT_VARIANT]: {
    label: 'Diyalekt Varyantı',
    color: '#7c3aed',
    bgColor: '#f3e8ff',
    borderColor: '#c084fc',
    description: 'Doğu ve Batı Çerkesçe diyalekt eşleşmesi',
  },
  [DiscoveryRelationType.SYNONYM]: {
    label: 'Eş Anlam',
    color: '#16a34a',
    bgColor: '#dcfce7',
    borderColor: '#4ade80',
    description: 'Anlamsal olarak aynı veya yakın anlamlı',
  },
  [DiscoveryRelationType.ANTONYM]: {
    label: 'Zıt Anlam',
    color: '#dc2626',
    bgColor: '#fee2e2',
    borderColor: '#f87171',
    description: 'Karşıt anlama sahip kavram',
  },
};

export function getRelationMeta(type: DiscoveryRelationType): RelationMeta {
  return (
    RELATION_META_MAP[type] || {
      ...DEFAULT_RELATION_META,
      label: String(type),
    }
  );
}