"use client";

import React, { useRef } from "react";
import type { DictionaryItem, LehceTipi } from "@/types/dictionary";
import type { TemaTipi } from "@/utils/helpers";
import SearchBox from "@/components/dictionary/SearchBox";
import useDictionary from "@/hooks/useDictionary";

interface SozlukEkraniProps {
  tema: Pick<TemaTipi, "yaziAna" | "yaziAlt" | "kenarlik" | "kartArkaPlan">;
  karanlikMod?: boolean;
}

export default function SozlukEkrani({ tema, karanlikMod = false }: SozlukEkraniProps) {
  // Veri akışını ve durumları yöneten custom hook
  const dictionary = useDictionary();
  const inputRef = useRef<HTMLInputElement>(null);

  // Arama metni kontrolü
  const aramaMetniVarMi =
    typeof dictionary.searchQuery === "string" &&
    dictionary.searchQuery.trim().length > 0;

  // Filtrelenmiş sonuçlar (useDictionary tarafından seçilen limit miktarınca süzülmüştür)
  const filtrelenmisSonuclar: DictionaryItem[] = dictionary.filtrelenmisSonuclar || [];

  return (
    <section className="w-full">
      {/* 1. Arama Kutusu ve Filtreler */}
      <SearchBox
        searchQuery={dictionary.searchQuery}
        setSearchQuery={dictionary.setSearchQuery}
        aramaModu={dictionary.aramaModu}
        setAramaModu={dictionary.setAramaModu}
        mod={dictionary.aramaModu}
        setMod={dictionary.setAramaModu}
        hedefDil={dictionary.hedefDil}
        setHedefDil={dictionary.setHedefDil}
        seciliLehce={(dictionary.seciliLehce as LehceTipi) || "TUMU"}
        setSeciliLehce={dictionary.setSeciliLehce}
        seciliDosya={dictionary.seciliDosya}
        setSeciliDosya={dictionary.setSeciliDosya}
        limit={dictionary.limit}
        setLimit={dictionary.setLimit}
        aktifSozlukler={dictionary.aktifSozlukler || []}
        inputRef={inputRef}
        karanlikMod={karanlikMod}
      />

      {/* 2. Yükleniyor Durumu */}
      {dictionary.loading && (
        <div
          className="mx-auto my-8 max-w-5xl rounded-2xl border p-8 text-center text-sm font-medium shadow-sm"
          style={{
            borderColor: tema.kenarlik,
            backgroundColor: tema.kartArkaPlan,
            color: tema.yaziAlt,
          }}
        >
          Sözlük verileri yükleniyor...
        </div>
      )}

      {/* 3. Hata Durumu */}
      {dictionary.error && (
        <div
          className="mx-auto my-8 max-w-5xl rounded-lg border p-4 text-center text-sm"
          style={{
            borderColor: "#dc2626",
            backgroundColor: karanlikMod ? "#7f1d1d" : "#fee2e2",
            color: karanlikMod ? "#fca5a5" : "#991b1b",
          }}
        >
          {dictionary.error}
        </div>
      )}

      {/* 4. Sözlük Kelime Listesi ve İstatistikler */}
      {!dictionary.loading && !dictionary.error && (
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          
          {/* İstatistik Çubuğu */}
          <div
            className="mb-4 flex items-center justify-between text-xs font-medium"
            style={{ color: tema.yaziAlt }}
          >
            <span>Toplam Yüklü Kelime: {dictionary.wordsCount || 0}</span>
            <span>Gösterilen Sonuç: {filtrelenmisSonuclar.length}</span>
          </div>

          {/* Sonuç Alanı */}
          {filtrelenmisSonuclar.length === 0 ? (
            <div
              className="my-12 rounded-xl border border-dashed p-8 text-center text-sm font-medium"
              style={{ 
                borderColor: tema.kenarlik,
                color: tema.yaziAlt 
              }}
            >
              {aramaMetniVarMi
                ? "Aramanızla eşleşen kelime bulunamadı."
                : "Kelime aramak için yukarıdaki arama kutusunu kullanın."}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {filtrelenmisSonuclar.map((item: DictionaryItem, index: number) => {
                // Alternatif alan adlarına karşı güvenli okuma (fallback)
                const kelime = String(
                  item.kelime || item.word || item.baslik || item.term || "Adsız Kelime"
                );

                const anlam = String(
                  item.tanim ||
                  item.definition ||
                  item.meaning ||
                  item.anlam ||
                  ""
                );

                const kaynak = String(
                  item.kaynakSozluk ||
                  item.kaynak_sozluk ||
                  item.sozluk ||
                  item.dictionary ||
                  item.source ||
                  ""
                );

                return (
                  <article
                    key={`${item.id || kelime}-${index}`}
                    className="flex flex-col justify-between rounded-xl border p-5 shadow-sm transition hover:shadow-md"
                    style={{
                      borderColor: tema.kenarlik,
                      backgroundColor: tema.kartArkaPlan,
                    }}
                  >
                    <div>
                      <h3
                        className="text-xl font-bold tracking-tight"
                        style={{ color: tema.yaziAna }}
                      >
                        {kelime}
                      </h3>

                      {anlam && (
                        <p
                          className="mt-2 text-sm leading-relaxed"
                          style={{ color: tema.yaziAlt }}
                        >
                          {anlam}
                        </p>
                      )}
                    </div>

                    {kaynak && (
                      <div
                        className="mt-4 flex items-center justify-between border-t pt-3"
                        style={{ borderColor: tema.kenarlik }}
                      >
                        <span
                          className="rounded px-2 py-1 text-[11px] font-medium"
                          style={{
                            backgroundColor: tema.kenarlik,
                            color: tema.yaziAlt,
                          }}
                        >
                          {kaynak}
                        </span>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      )}
    </section>
  );
}