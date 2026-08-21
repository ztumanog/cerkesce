"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback
} from "react";

// Tip Tanımları
import type {
  AramaModu,
  GruplanmisKelime,
  DictionaryItem,
  SozlukEkraniProps
} from "@/types/dictionary";

// Alt Bileşenler
import Header from "./Header";
import IstatistikBandi from "./IstatistikBandi";
import GununKelimesiKart from "./GununKelimesiKart";
import SearchBox from "./SearchBox";
import KelimeKarti from "./KelimeKarti";
import KelimeDetayDrawer from "./KelimeDetayDrawer";

export default function SozlukEkrani({
  loading,
  searchQuery,
  setSearchQuery,
  seciliLehce,
  setSeciliLehce,
  seciliDosya,
  setSeciliDosya,
  gununKelimesi,
  filtrelenmisSonuclar,
  aktifSozlukler,
  wordsCount = 428679
}: SozlukEkraniProps) {
  const [metinBoyutu, setMetinBoyutu] = useState<number>(16);
  const [karanlikMod, setKaranlikMod] = useState<boolean>(false);

  const [mod, setMod] = useState<AramaModu>("baslayan");
  const [hedefDil, setHedefDil] = useState<string>("tumu");
  const [goruntulenenAdet, setGoruntulenenAdet] = useState<number>(20);
  const [seciliKelimeGrubu, setSeciliKelimeGrubu] = useState<GruplanmisKelime | null>(null);
  const [kopyalandiId, setKopyalandiId] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (karanlikMod) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [karanlikMod]);

  const aktifTema = useMemo(() => ({
    arkaPlan: karanlikMod ? "#0c0f17" : "#f8fafc",
    kartArkaPlan: karanlikMod ? "#141a29" : "#ffffff",
    yaziAna: karanlikMod ? "#f8fafc" : "#0f172a",
    yaziAlt: karanlikMod ? "#cbd5e1" : "#334155",
    kenarlik: karanlikMod ? "#334155" : "#cbd5e1",
    inputArkaPlan: karanlikMod ? "#1a2236" : "#ffffff",
  }), [karanlikMod]);

  // ESKİ SİSTEMDEKİ KUSURSUZ ÇALIŞAN HEDEF DİL BULMA FONKSİYONU
  const hedefDilBul = useCallback((dosyaAdi?: string) => {
    if (!dosyaAdi) return "diger";
    const isim = dosyaAdi.toLowerCase();
    if (isim.includes("tur") || isim.includes("tu-")) return "tr";
    if (isim.includes("ara") || isim.includes("-ar")) return "ar";
    if (isim.includes("en") || isim.includes("kbd-en")) return "en";
    if (isim.includes("rus") || isim.includes("ru-")) return "ru";
    return "diger";
  }, []);

  const gruplanmisSonuclar = useMemo<GruplanmisKelime[]>(() => {
    if (!searchQuery?.trim() || !filtrelenmisSonuclar || filtrelenmisSonuclar.length === 0) {
      return [];
    }

    let havuz = [...(filtrelenmisSonuclar as DictionaryItem[])];

    // 1. Hedef Dil Filtresi (Eski Sistem Mantığıyla)
    if (hedefDil !== "tumu") {
      havuz = havuz.filter((item) => {
        const dosya = item.file || item.kaynak_sozluk;
        return hedefDilBul(dosya) === hedefDil;
      });
    }

    // 2. Gruplama
    const gruplar = new Map<string, DictionaryItem[]>();

    havuz.forEach((item) => {
      const key = item.kelime?.trim().toLowerCase();
      if (!key) return;

      if (!gruplar.has(key)) gruplar.set(key, []);
      gruplar.get(key)!.push(item);
    });

    return Array.from(gruplar.values()).map((kaynaklar) => ({
      kelime: kaynaklar[0].kelime,
      dialect: kaynaklar[0].dialect,
      kaynaklar,
      anlamlar: kaynaklar.map((k) => ({
        tanim: k.tanim,
        file: k.file,
        kaynak_sozluk: k.kaynak_sozluk,
        dialect: k.dialect,
        language: k.language,
      })),
    }));
  }, [filtrelenmisSonuclar, searchQuery, hedefDil, hedefDilBul]);

  const handleKelimeSec = useCallback((grup: GruplanmisKelime) => {
    setSeciliKelimeGrubu(grup);
  }, []);

  const handlePanoyaKopyala = useCallback(async (kelime: string, tanim?: string, id?: string) => {
    const metin = `${kelime}\n${tanim || ""}`;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(metin);
      }
      if (id) {
        setKopyalandiId(id);
        setTimeout(() => setKopyalandiId(null), 2000);
      }
    } catch (err) {
      console.warn("Kopyalama engellendi:", err);
    }
  }, []);

  const gosterilenGruplar = gruplanmisSonuclar.slice(0, goruntulenenAdet);
  const dahaFazlaVar = gruplanmisSonuclar.length > goruntulenenAdet;

  return (
    <div className="flex flex-col min-h-screen transition-colors px-4 py-6" style={{ backgroundColor: aktifTema.arkaPlan }}>
      <main className="flex-1 max-w-4xl w-full mx-auto space-y-6">

        <Header
          karanlikMod={karanlikMod}
          toggleKaranlikMod={() => setKaranlikMod(!karanlikMod)}
          metinBoyutu={metinBoyutu}
          setMetinBoyutu={setMetinBoyutu}
          tema={aktifTema}
        />

        {!searchQuery?.trim() && (
          <IstatistikBandi
            wordsCount={wordsCount}
            sozlukSayisi={aktifSozlukler?.length || 34}
            aktifTema={aktifTema}
          />
        )}

        {!searchQuery?.trim() && gununKelimesi && (
          <GununKelimesiKart
            gununKelimesi={gununKelimesi}
            karanlikMod={karanlikMod}
            metinBoyutu={metinBoyutu}
            tema={aktifTema}
            onClick={() => handleKelimeSec({
              kelime: gununKelimesi.kelime,
              dialect: gununKelimesi.dialect,
              kaynaklar: [gununKelimesi],
              anlamlar: [{
                tanim: gununKelimesi.tanim,
                file: gununKelimesi.file,
                kaynak_sozluk: gununKelimesi.kaynak_sozluk,
                dialect: gununKelimesi.dialect,
              }],
            })}
          />
        )}

        <SearchBox
          searchQuery={searchQuery || ""}
          setSearchQuery={setSearchQuery}
          mod={mod}
          setMod={setMod}
          hedefDil={hedefDil}
          setHedefDil={setHedefDil}
          seciliLehce={seciliLehce}
          setSeciliLehce={setSeciliLehce}
          seciliDosya={seciliDosya}
          setSeciliDosya={setSeciliDosya}
          aktifSozlukler={aktifSozlukler || []}
          metinBoyutu={metinBoyutu}
          karanlikMod={karanlikMod}
          tema={aktifTema}
          inputRef={inputRef}
          harfEkle={(harf: string) => {
            setSearchQuery((prev: string) => (prev || "") + harf);
            inputRef.current?.focus();
          }}
          kaynagiDuzenle={(dosyaAdi?: string) => dosyaAdi || ""}
          limit={20}
          setGoruntulenenAdet={setGoruntulenenAdet}
        />

        {searchQuery?.trim() && !loading && (
          <p className="text-sm font-medium" style={{ color: aktifTema.yaziAlt }}>
            Toplam <strong>{gruplanmisSonuclar.length}</strong> kelime grubu bulundu.
          </p>
        )}

        {loading ? (
          <div className="text-center py-8 text-slate-500 font-medium">
            📖 Sözlük verileri yükleniyor...
          </div>
        ) : (
          <section aria-label="Arama Sonuçları" className="flex flex-col gap-4">
            {gosterilenGruplar.map((grup, idx) => (
              <KelimeKarti
                key={`${grup.kelime}-${grup.kaynaklar?.length || 0}-${idx}`}
                idx={idx}
                grup={grup}
                tema={aktifTema}
                metinBoyutu={metinBoyutu}
                kopyalandiId={kopyalandiId}
                panoyaKopyala={handlePanoyaKopyala}
                onClick={handleKelimeSec}
              />
            ))}

            {dahaFazlaVar && (
              <button
                onClick={() => setGoruntulenenAdet((prev) => prev + 20)}
                className="mt-4 w-full p-3 bg-[#FF4030] text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
              >
                Daha Fazla Göster ({gruplanmisSonuclar.length - goruntulenenAdet} kalan)
              </button>
            )}
          </section>
        )}

        {seciliKelimeGrubu && (
          <KelimeDetayDrawer
            seciliKelime={seciliKelimeGrubu}
            kapat={() => setSeciliKelimeGrubu(null)}
            tema={aktifTema}
            metinBoyutu={metinBoyutu}
          />
        )}
      </main>
    </div>
  );
}