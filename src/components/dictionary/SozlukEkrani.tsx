'use client';

import { useState, useCallback, useMemo, useRef } from 'react';
import {
  Container,
  Box,
  Flex,
  Card,
  Button,
  Text,
  Heading,
  Callout,
  Spinner,
} from '@radix-ui/themes';
import { MagnifyingGlassIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import SearchBox from '@/components/dictionary/SearchBox';
import KelimeKarti from '@/components/dictionary/KelimeKarti';
import KelimeDetayDrawer from '@/components/dictionary/KelimeDetayDrawer';
import GununKelimesiKart from '@/components/dictionary/GununKelimesiKart';
import {
  type DialectFilterValue,
} from '@/components/dictionary/DialectFilter';
import {
  type LanguageFilterValue,
} from '@/components/dictionary/LanguageFilter';
import FilterDropdown from '@/components/dictionary/FilterDropdown';
import AramaGecmisi from '@/components/dictionary/AramaGecmisi';
import { normalizeDialect } from '@/lib/normalizers/dialectNormalizer';
import { normalizeLanguage } from '@/lib/normalizers/languageNormalizer';
import { resolveSourceMetadata } from '@/lib/normalizers/sourceMetadataResolver';
import { useAramaGecmisi } from '@/hooks/useAramaGecmisi';
import type { KelimeItem } from '@/components/dictionary/KelimeKarti';
import { useFavoriler } from '@/hooks/useFavoriler';
import { useKlavyeKisayollari } from '@/hooks/useKlavyeKisayollari';
import type { DictionaryEntry } from '@/types/dictionary';

export default function SozlukEkrani() {
  const [sonuclar, setSonuclar] = useState<KelimeItem[]>([]);
  const [yukleniyor, setYukleniyor] = useState<boolean>(false);
  const [seciliKelime, setSeciliKelime] = useState<DictionaryEntry | null>(null);
  const [drawerAcik, setDrawerAcik] = useState<boolean>(false);
  const [aramaMetni, setAramaMetni] = useState<string>('');
  const [tumunuGoster, setTumunuGoster] = useState<boolean>(false);
  const [klavyeAcik, setKlavyeAcik] = useState<boolean>(false);
  const aramaInputRef = useRef<HTMLInputElement>(null);

  const [dialectFilter, setDialectFilter] = useState<DialectFilterValue>('ALL');
  const [languageFilter, setLanguageFilter] = useState<LanguageFilterValue>('ALL');

  const { favoriMi, favoriToggle } = useFavoriler();

  useKlavyeKisayollari({
    onEscape: () => {
      setDrawerAcik(false);
    },
  });

  const {
    gecmis,
    ekle: gecmiseEkle,
    sil: gecmistenSil,
    temizle: gecmisiTemizle,
  } = useAramaGecmisi();

  const handleSearch = useCallback(
    async (query: string, mode: string = 'baslayan') => {
      if (!query.trim()) {
        setSonuclar([]);
        setAramaMetni('');
        return;
      }

      setYukleniyor(true);
      setAramaMetni(query);
      setTumunuGoster(false);
      setDialectFilter('ALL');
      setLanguageFilter('ALL');

      gecmiseEkle(query);

      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}&mode=${mode}`
        );
        const data = await response.json();

        if (data.success && data.results && Array.isArray(data.results)) {
          const results: KelimeItem[] = data.results.map(
            (entry: any, idx: number) => {
              const word =
                entry.form ||
                entry.spelling ||
                entry.word ||
                entry.kelime ||
                entry.headword ||
                entry.lemma ||
                entry.dialectVariants?.adyghe ||
                entry.dialectVariants?.kabardian ||
                '';

              const anlamlarSet = new Set<string>();

              if (Array.isArray(entry.meanings)) {
                entry.meanings.forEach((m: any) => {
                  const text = m?.text || m?.value || m?.meaning || '';
                  if (text.trim()) anlamlarSet.add(text.trim());
                });
              }

              if (Array.isArray(entry.definitions)) {
                entry.definitions.forEach((d: any) => {
                  const text = d?.meaning || d?.tanim || d?.text || '';
                  if (text.trim()) anlamlarSet.add(text.trim());
                });
              }

              if (Array.isArray(entry.kaynaklar)) {
                entry.kaynaklar.forEach((k: any) => {
                  const text = k?.anlam || k?.meaning || '';
                  if (text.trim()) anlamlarSet.add(text.trim());
                });
              }

              const rawTrList = Array.isArray(entry.translations?.tr)
                ? entry.translations.tr
                : typeof entry.tr === 'string'
                  ? [entry.tr]
                  : [];
              rawTrList.forEach((t: any) => {
                if (typeof t === 'string' && t.trim()) anlamlarSet.add(t.trim());
              });

              const multiLangCandidates = [
                entry.tr,
                entry.anlam,
                entry.translation,
                entry.definition,
                entry.meaning,
                entry.tanim,
                entry.literalMeaning,
                entry.en,
                Array.isArray(entry.translations?.en)
                  ? entry.translations.en.join(', ')
                  : entry.translations?.en,
                entry.ru,
                Array.isArray(entry.translations?.ru)
                  ? entry.translations.ru.join(', ')
                  : entry.translations?.ru,
                entry.ar,
                Array.isArray(entry.translations?.ar)
                  ? entry.translations.ar.join(', ')
                  : entry.translations?.ar,
              ];
              multiLangCandidates.forEach((cand) => {
                if (typeof cand === 'string' && cand.trim()) {
                  anlamlarSet.add(cand.trim());
                }
              });

              const anlamlar = Array.from(anlamlarSet);
              const ilkAnlam = anlamlar[0] || '';

              const kaynakDialect = entry.kaynaklar?.[0]?.sourceFile
                ? resolveSourceMetadata(entry.kaynaklar[0].sourceFile).dialect
                : null;

              return {
                id: entry.id || `${query}-${idx}`,
                kelime: word,
                form: entry.form || word,
                madde: entry.headword || entry.form || word,
                anlam: ilkAnlam,
                ilkAnlam,
                literalMeaning: entry.literalMeaning || undefined,
                anlamlar,
                kaynaklar: entry.kaynaklar || [],
                lehce: kaynakDialect || entry.dialect || entry.lehce || 'ADY',
                dialect: kaynakDialect || entry.dialect || entry.lehce || 'ADY',
                rootIds: entry.rootIds || [],
                wordFamilyId: entry.wordFamilyId || null,
                conceptId: entry.conceptId || null,
                ipa: entry.ipa || null,
                partOfSpeech: entry.partOfSpeech || null,
                corpusFrequency: entry.corpusFrequency || 0,
                dialectVariants: entry.dialectVariants || null,
              };
            }
          );

          setSonuclar(results);
        } else {
          setSonuclar([]);
        }
      } catch (error) {
        console.error('Arama hatası:', error);
        setSonuclar([]);
      } finally {
        setYukleniyor(false);
      }
    },
    [gecmiseEkle]
  );

  const handleKelimeSec = (kelime: KelimeItem) => {
    const dictionaryEntry: DictionaryEntry = {
      id: kelime.id,
      word: kelime.kelime,
      meaning: kelime.anlam || kelime.ilkAnlam || '',
      anlam: kelime.anlam || kelime.ilkAnlam || '',
      definition: kelime.anlam || kelime.ilkAnlam || '',
      tanim: kelime.anlam || kelime.ilkAnlam || '',
      definitions:
        kelime.anlamlar?.map((anlam) => ({ meaning: anlam, tanim: anlam })) || [],
      kaynaklar: kelime.kaynaklar || [],
      lehce: kelime.lehce || 'ADY',
      dialect: kelime.lehce || 'ADY',
      group: kelime.kaynaklar?.[0] as any,
      rootIds: kelime.rootIds || [],
      wordFamilyId: kelime.wordFamilyId || null,
      conceptId: kelime.conceptId || null,
      ipa: kelime.ipa || null,
      partOfSpeech: kelime.partOfSpeech || null,
      corpusFrequency: kelime.corpusFrequency || 0,
      dialectVariants: kelime.dialectVariants || null,
    };

    setSeciliKelime(dictionaryEntry);
    setDrawerAcik(true);
  };

  const filtrelenmisSonuclar = useMemo(() => {
    return sonuclar.filter((kelime) => {
      if (dialectFilter !== 'ALL') {
        const canonical = normalizeDialect(kelime.lehce);
        if (canonical !== dialectFilter) return false;
      }

      if (languageFilter !== 'ALL') {
        const ilkKaynak = kelime.kaynaklar?.[0];
        const targetLang = ilkKaynak?.sourceFile
          ? resolveSourceMetadata(ilkKaynak.sourceFile).targetLanguage
          : null;
        const canonical = normalizeLanguage(targetLang);
        if (canonical !== languageFilter) return false;
      }

      return true;
    });
  }, [sonuclar, dialectFilter, languageFilter]);

  const dialectCounts = useMemo(() => {
    const counts: Record<DialectFilterValue, number> = {
      ALL: sonuclar.length,
      ADY: 0,
      KBD: 0,
    };

    sonuclar.forEach((kelime) => {
      const canonical = normalizeDialect(kelime.lehce);
      if (canonical === 'ADY') counts.ADY++;
      else if (canonical === 'KBD') counts.KBD++;
    });

    return counts;
  }, [sonuclar]);

  const languageCounts = useMemo(() => {
    const counts: Record<LanguageFilterValue, number> = {
      ALL: sonuclar.length,
      TR: 0,
      EN: 0,
      RU: 0,
      AR: 0,
      CIRC: 0,
      MULTI: 0,
    };

    sonuclar.forEach((kelime) => {
      const ilkKaynak = kelime.kaynaklar?.[0];
      const targetLang = ilkKaynak?.sourceFile
        ? resolveSourceMetadata(ilkKaynak.sourceFile).targetLanguage
        : null;
      const canonical = normalizeLanguage(targetLang);

      if (canonical === 'TR') counts.TR++;
      else if (canonical === 'EN') counts.EN++;
      else if (canonical === 'RU') counts.RU++;
      else if (canonical === 'AR') counts.AR++;
    });

    return counts;
  }, [sonuclar]);

  const bosArama = sonuclar.length === 0 && !aramaMetni && !yukleniyor;
  const goruntulenenSonuclar = tumunuGoster
    ? filtrelenmisSonuclar
    : filtrelenmisSonuclar.slice(0, 3);
  const dahaFazlaSonucVarmi =
    filtrelenmisSonuclar.length > 3 && !tumunuGoster;

  return (
    <Container size="3" px={{ initial: '3', sm: '4' }} py="4">
      <Flex direction="column" gap="3">
        <Card size="3" variant="surface" asChild>
          <section aria-label="Sözlük arama alanı">
            <SearchBox
              onSearch={handleSearch}
              inputRef={aramaInputRef}
              klavyeAcik={klavyeAcik}
              setKlavyeAcik={setKlavyeAcik}
              filterSlot={
                sonuclar.length > 1 ? (
                  <FilterDropdown
                    activeCount={
                      (dialectFilter !== 'ALL' ? 1 : 0) +
                      (languageFilter !== 'ALL' ? 1 : 0)
                    }
                    dialectFilter={dialectFilter}
                    onDialectChange={setDialectFilter}
                    dialectCounts={dialectCounts}
                    languageFilter={languageFilter}
                    onLanguageChange={setLanguageFilter}
                    languageCounts={languageCounts}
                  />
                ) : null
              }
            />
          </section>
        </Card>

        {gecmis.length > 0 && !aramaMetni && (
          <AramaGecmisi
            gecmis={gecmis}
            onSec={(sorgu) => {
              handleSearch(sorgu, 'baslayan');
            }}
            onSil={gecmistenSil}
            onTemizle={gecmisiTemizle}
          />
        )}

        {bosArama && (
          <Box>
            <GununKelimesiKart />
          </Box>
        )}

        {yukleniyor && (
          <Flex
            direction="column"
            align="center"
            justify="center"
            gap="2"
            py="6"
            role="status"
            aria-live="polite"
          >
            <Spinner size="3" />
            <Text size="2" color="gray" weight="medium">
              Sözlükte aranıyor...
            </Text>
          </Flex>
        )}

        {sonuclar.length > 0 && (
          <Flex align="center" justify="between" px="1">
            <Heading as="h2" size="3" weight="bold" role="status" aria-live="polite">
              Sonuçlar ({filtrelenmisSonuclar.length}
              {(dialectFilter !== 'ALL' || languageFilter !== 'ALL') &&
                ` / ${sonuclar.length}`}
              )
            </Heading>
          </Flex>
        )}

        <Flex direction="column" gap="2" role="region" aria-label="Arama sonuçları">
          {goruntulenenSonuclar.map((kelime, index) => (
            <KelimeKarti
              key={kelime.id ?? `kelime-${index}`}
              data={kelime}
              onClick={() => handleKelimeSec(kelime)}
              favoriMi={favoriMi(kelime.id)}
              onFavoriToggle={() =>
                favoriToggle({
                  id: kelime.id,
                  kelime: kelime.kelime,
                  anlam: kelime.anlam || kelime.ilkAnlam || '',
                  lehce: kelime.lehce,
                  tarih: new Date().toISOString(),
                })
              }
            />
          ))}
        </Flex>

        {!yukleniyor &&
          aramaMetni &&
          sonuclar.length > 0 &&
          filtrelenmisSonuclar.length === 0 && (
            <Callout.Root color="amber" variant="surface" role="status">
              <Callout.Icon>
                <InfoCircledIcon aria-hidden="true" />
              </Callout.Icon>
              <Callout.Text>
                Bu lehçe veya dil filtresinde eşleşen sonuç bulunamadı. Farklı bir filtre seçmeyi deneyin.
              </Callout.Text>
            </Callout.Root>
          )}

        {dahaFazlaSonucVarmi && (
          <Flex justify="center" pt="1">
            <Button
              type="button"
              variant="solid"
              color="jade"
              size="2"
              highContrast
              onClick={() => setTumunuGoster(true)}
            >
              Tüm Sonuçları Göster ({filtrelenmisSonuclar.length - 3} daha)
            </Button>
          </Flex>
        )}

        {!yukleniyor && aramaMetni && sonuclar.length === 0 && (
          <Callout.Root color="gray" variant="surface" role="status">
            <Callout.Icon>
              <MagnifyingGlassIcon aria-hidden="true" />
            </Callout.Icon>
            <Callout.Text>
              <strong>&ldquo;{aramaMetni}&rdquo;</strong> için sonuç bulunamadı. Yazımı veya klavye düzenini kontrol edip tekrar deneyin.
            </Callout.Text>
          </Callout.Root>
        )}

        <KelimeDetayDrawer
          isOpen={drawerAcik}
          onClose={() => setDrawerAcik(false)}
          seciliKelime={seciliKelime}
          onConceptClick={(word) => {
            setDrawerAcik(false);
            handleSearch(word, 'tam');
          }}
        />
      </Flex>
    </Container>
  );
}

