"use client";

import React from "react";
import SozlukEkrani from "@/components/dictionary/SozlukEkrani";
import useDictionary from "@/hooks/useDictionary";

export default function Home() {
  const dictionary = useDictionary();

  return (
    <main className="min-h-screen">
      <SozlukEkrani
        loading={dictionary.loading}
        searchQuery={dictionary.searchQuery}
        setSearchQuery={dictionary.setSearchQuery}
        seciliLehce={dictionary.seciliLehce}
        setSeciliLehce={dictionary.setSeciliLehce}
        seciliDosya={dictionary.seciliDosya}
        setSeciliDosya={dictionary.setSeciliDosya}
        gununKelimesi={dictionary.gununKelimesi}
        filtrelenmisSonuclar={dictionary.filtrelenmisSonuclar}
        aktifSozlukler={dictionary.aktifSozlukler}
        wordsCount={dictionary.wordsCount || 428679}
      />
    </main>
  );
}