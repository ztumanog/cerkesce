import { useState, useMemo } from 'react';
import { DictionaryItem, AktifSozlukItem, LehceTipi, AramaModuTipi } from '@/types/dictionary';
import { loadDictionaryData } from '@/lib/dictionaryLoader';

export const useDictionary = () => {
  const { entries, sources, manifest } = useMemo(() => loadDictionaryData(), []);

  const [aramaMetni, setAramaMetni] = useState('');
  const [seciliLehce, setSeciliLehce] = useState<LehceTipi>('tumu');
  const [aramaModu, setAramaModu] = useState<AramaModuTipi>('hepsi');

  const filtrelenmisKelimeler = useMemo(() => {
    return entries.filter((item: DictionaryItem) => {
      const q = aramaMetni.toLowerCase().trim();

      if (seciliLehce !== 'tumu') {
        const itemDialect = item.dialect?.toLowerCase() || '';
        if (seciliLehce === 'doğu' && !itemDialect.includes('dogu') && !itemDialect.includes('doğu')) return false;
        if (seciliLehce === 'batı' && !itemDialect.includes('western') && !itemDialect.includes('batı')) return false;
      }

      if (!q) return true;

      const wordMatch = item.word?.toLowerCase().includes(q);
      const translationMatch = item.translation?.toLowerCase().includes(q);

      if (aramaModu === 'kelime') return wordMatch;
      if (aramaModu === 'anlam') return translationMatch;
      return wordMatch || translationMatch;
    });
  }, [entries, aramaMetni, seciliLehce, aramaModu]);

  return {
    entries: filtrelenmisKelimeler,
    totalEntries: entries.length,
    sources,
    manifest,
    aramaMetni,
    setAramaMetni,
    seciliLehce,
    setSeciliLehce,
    aramaModu,
    setAramaModu,
  };
};

export default useDictionary;