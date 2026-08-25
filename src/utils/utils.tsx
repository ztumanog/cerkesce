import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import manifestDataRaw from '@/utils/dictionaries.json';
import type { 
  ManifestData, 
  DictionaryItem, 
  RawDictionaryFile 
} from '@/types/dictionary';

export const manifestData = manifestDataRaw as unknown as ManifestData;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getEnrichedDictionary(file: string) {
  const fileNameOnly = file.replace(/\.json$/, '');

  const foundItem = manifestData?.items?.find(
    (item) => item.file === file || item.file === fileNameOnly
  );

  if (foundItem) {
    return {
      file: foundItem.file,
      title: foundItem.title,
      label: foundItem.label,
      dialect: foundItem.dialect,
    };
  }

  return {
    file: fileNameOnly,
    title: fileNameOnly,
    label: '',
    dialect: fileNameOnly.includes('Kbd') ? 'DOGU' : 'BATI',
  };
}