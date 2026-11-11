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
  // --- Yeni Eklenen Tüm Enum Türleri ---
  [DiscoveryRelationType.STATE_OF]: {
    label: 'Durum / Hal',
    color: '#8b5cf6',
    bgColor: '#f5f3ff',
    borderColor: '#a78bfa',
    description: 'Bir durumun, niteliğin veya halin bağı',
  },
  [DiscoveryRelationType.CATEGORY_OF]: {
    label: 'Kategori',
    color: '#059669',
    bgColor: '#ecfdf5',
    borderColor: '#34d399',
    description: 'Kategori ve sınıflandırma ilişkisi',
  },
  [DiscoveryRelationType.LOCATION_OF]: {
    label: 'Konum / Yer',
    color: '#0d9488',
    bgColor: '#ccfbf1',
    borderColor: '#5eead4',
    description: 'Coğrafi veya fiziksel konum ilişkisi',
  },
  [DiscoveryRelationType.DRINK_OF]: {
    label: 'İçecek / Besin',
    color: '#db2777',
    bgColor: '#fce7f3',
    borderColor: '#f472b6',
    description: 'İçecek ve tüketim ilişkisi bağı',
  },
  [DiscoveryRelationType.DERIVED]: {
    label: 'Türetilmiş',
    color: '#2563eb',
    bgColor: '#dbeafe',
    borderColor: '#60a5fa',
    description: 'Morfofonetik türetim bağı',
  },
  [DiscoveryRelationType.HOMONYM]: {
    label: 'Eş Sesli',
    color: '#475569',
    bgColor: '#f1f5f9',
    borderColor: '#94a3b8',
    description: 'Yazılışı aynı, anlamı farklı (Sesteş)',
  },
  [DiscoveryRelationType.COMPOUND]: {
    label: 'Bileşik Yapı',
    color: '#9333ea',
    bgColor: '#faf5ff',
    borderColor: '#c084fc',
    description: 'Birden fazla kökten oluşan birleşik sözcük',
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