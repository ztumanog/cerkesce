import { DictionaryItem, DictionaryMetadata, LehceTipi } from '@/types/dictionary';

export function filterByLehce(items: DictionaryItem[], lehce: LehceTipi): DictionaryItem[] {
  return items.filter((item) => item.dialect === lehce);
}

export function getMetadataById(metadataList: DictionaryMetadata[], id: string): DictionaryMetadata | undefined {
  return metadataList.find((meta) => meta.id === id);
}