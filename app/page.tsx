'use client';

import {
  useMemo,
  useRef,
  useState,
} from 'react';

import type {
  AramaModu,
} from '@/types/dictionary';

import type {
  TemaTipi,
} from '@/utils/helpers';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SearchBox from '@/components/dictionary/SozlukEkrani';
import useDictionary from '@/hooks/useDictionary';

export default function Home() {
  const dictionary = useDictionary();

  /*
   * SearchBox için gerekli state'ler.
   * Bunlar useDictionary içinde olmadığı için burada tutuluyor.
   */
  const [mod, setMod] =
    useState<AramaModu>('baslayan');

  const [goruntulenenAdet, setGoruntulenenAdet] =
    useState<number>(200);

  const [karanlikMod, setKaranlikMod] =
    useState<boolean>(false);

  /*
   * Header'daki mevcut kod metin boyutunu px olarak kullanıyor.
   * Bu nedenle başlangıç değeri 16 olmalı.
   */
  const [metinBoyutu, setMetinBoyutu] =
    useState<number>(16);

  const inputRef =
    useRef<HTMLInputElement>(null);

  const limit = 200;

  const toggleKaranlikMod = () => {
    setKaranlikMod(
      (oncekiDeger) => !oncekiDeger
    );
  };

  /*
   * HeaderProps içindeki tema tipi Pick<TemaTipi, ...>
   * olduğu için tema string değil, nesne olmalıdır.
   */
  const tema = useMemo<
    Pick<
      TemaTipi,
      'yaziAna' |
      'yaziAlt' |
      'kenarlik' |
      'kartArkaPlan'
    >
  >(
    () =>
      karanlikMod
        ? {
            yaziAna: '#F4EFE6',
            yaziAlt: '#D0C4B8',
            kenarlik: '#4A3E37',
            kartArkaPlan: '#211A17',
          }
        : {
            yaziAna: '#2C221E',
            yaziAlt: '#4A3E37',
            kenarlik: '#EADDC9',
            kartArkaPlan: '#F4EFE6',
          },
    [karanlikMod]
  );

  return (
    <div
      className={
        karanlikMod
          ? 'flex min-h-screen flex-col bg-stone-950 text-stone-100'
          : 'flex min-h-screen flex-col bg-stone-50 text-stone-900'
      }
    >
      <Header
        karanlikMod={karanlikMod}
        toggleKaranlikMod={toggleKaranlikMod}
        metinBoyutu={metinBoyutu}
        setMetinBoyutu={setMetinBoyutu}
        sozlukSayisi={34}
        kayitSayisi={dictionary.wordsCount}
        tema={tema}
      />

      <main className="flex-1">
        <SearchBox
          searchQuery={dictionary.searchQuery}
          setSearchQuery={dictionary.setSearchQuery}
          mod={mod}
          setMod={setMod}
          hedefDil={dictionary.hedefDil}
          setHedefDil={dictionary.setHedefDil}
          seciliLehce={dictionary.seciliLehce}
          setSeciliLehce={dictionary.setSeciliLehce}
          seciliDosya={dictionary.seciliDosya}
          setSeciliDosya={dictionary.setSeciliDosya}
          aktifSozlukler={dictionary.aktifSozlukler}
          inputRef={inputRef}
          setGoruntulenenAdet={
            setGoruntulenenAdet
          }
          limit={limit}
        />

        <section className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
          {dictionary.loading ? (
            <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center text-sm text-stone-500 shadow-sm dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400">
              Sözlükler yükleniyor...
            </div>
          ) : dictionary.filtrelenmisSonuclar.length === 0 ? (
            <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center text-sm text-stone-500 shadow-sm dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400">
              Arama sonucu bulunamadı.
            </div>
          ) : (
            <div className="grid gap-4">
              {dictionary.filtrelenmisSonuclar
                .slice(0, goruntulenenAdet)
                .map(
                  (
                    sonuc: any,
                    index: number
                  ) => (
                    <article
                      key={
                        sonuc.id ||
                        sonuc.kelime ||
                        sonuc.word ||
                        index
                      }
                      className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900"
                    >
                      <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                        {sonuc.kelime ||
                          sonuc.word ||
                          sonuc.baslik ||
                          sonuc.term ||
                          'Sonuç'}
                      </h2>

                      {(sonuc.anlam ||
                        sonuc.meaning ||
                        sonuc.tanim ||
                        sonuc.definition) && (
                        <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">
                          {sonuc.anlam ||
                            sonuc.meaning ||
                            sonuc.tanim ||
                            sonuc.definition}
                        </p>
                      )}

                      {(sonuc.sozluk ||
                        sonuc.dictionary ||
                        sonuc.kaynak_sozluk) && (
                        <p className="mt-3 text-xs text-stone-400">
                          Kaynak:{' '}
                          {sonuc.sozluk ||
                            sonuc.dictionary ||
                            sonuc.kaynak_sozluk}
                        </p>
                      )}
                    </article>
                  )
                )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
