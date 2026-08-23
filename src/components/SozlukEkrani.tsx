"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback
} from "react";
import Footer from "./Footer";
import type {
  AramaModu,
  GruplanmisKelime,
  DictionaryItem,
  SozlukEkraniProps
} from "@/types/dictionary";
import type { TemaTipi } from "@/utils/helpers";
import { metneCevir, kaynagiDuzenle } from "@/utils/helpers";
import manifestData from "@/utils/dictionaries.json";
import Header from "./Header";

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
  const [metinBoyutu, setMetinBoyutu] = useState<number>(17);
  const [karanlikMod, setKaranlikMod] = useState<boolean>(false);

  const [mod, setMod] = useState<AramaModu>("baslayan");
  const [hedefDil, setHedefDil] = useState<string>("tumu");
  const [goruntulenenAdet, setGoruntulenenAdet] = useState<number>(20);
  const [seciliKelimeGrubu, setSeciliKelimeGrubu] = useState<GruplanmisKelime | null>(null);
  const [kopyalandiId, setKopyalandiId] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (karanlikMod) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [karanlikMod]);

  useEffect(() => {
    setGoruntulenenAdet(20);
  }, [searchQuery, hedefDil, seciliLehce, seciliDosya, mod]);

  const aktifTema: TemaTipi = useMemo(() => ({
    arkaPlan: karanlikMod ? "#1A1614" : "#FDFBF7",
    kartArkaPlan: karanlikMod ? "#1F1A17" : "#FFFFFF",
    yaziAna: karanlikMod ? "#F4EFE6" : "#2C221E",
    yaziAlt: karanlikMod ? "#A89A8E" : "#8C7A6B",
    kenarlik: karanlikMod ? "#3D322C" : "#EADDC9",
    inputArkaPlan: karanlikMod ? "#26201D" : "#FAFAFA",
  }), [karanlikMod]);

  const hedefDilBul = useCallback((item: DictionaryItem | any) => {
    if (!item) return "diger";

    const metaLang = (item.targetLanguage || item.language || item.dil || "").toString().toLowerCase();
    if (metaLang) {
      if (metaLang.includes("tr") || metaLang.includes("turk")) return "tr";
      if (metaLang.includes("ar")) return "ar";
      if (metaLang.includes("en")) return "en";
      if (metaLang.includes("ru")) return "ru";
    }

    const dosyaAdi = metneCevir(item.file || item.kaynak_sozluk || item).toLowerCase();
    if (dosyaAdi.includes("tur") || dosyaAdi.includes("tu-")) return "tr";
    if (dosyaAdi.includes("ara") || dosyaAdi.includes("-ar")) return "ar";
    if (dosyaAdi.includes("en") || dosyaAdi.includes("kbd-en")) return "en";
    if (dosyaAdi.includes("rus") || dosyaAdi.includes("ru-")) return "ru";

    return "diger";
  }, []);

  const gruplanmisSonuclar = useMemo<GruplanmisKelime[]>(() => {
    if (!searchQuery?.trim() || !filtrelenmisSonuclar || !Array.isArray(filtrelenmisSonuclar) || filtrelenmisSonuclar.length === 0) {
      return [];
    }

    let havuz = [...(filtrelenmisSonuclar as DictionaryItem[])];

    if (hedefDil !== "tumu") {
      havuz = havuz.filter((item) => hedefDilBul(item) === hedefDil);
    }

    const gruplar = new Map<string, DictionaryItem[]>();

    havuz.forEach((item) => {
      const kelimeStr = metneCevir(item.kelime);
      const key = kelimeStr.trim().toLowerCase();
      if (!key) return;

      if (!gruplar.has(key)) gruplar.set(key, []);
      gruplar.get(key)!.push(item);
    });

    return Array.from(gruplar.values()).map((kaynaklar) => {
      const ilk = kaynaklar[0];
      const kelimeBaslik = metneCevir(ilk.kelime);

      return {
        kelime: kelimeBaslik,
        dialect: typeof ilk.dialect === "string" ? ilk.dialect : "BATI",
        kaynaklar,
        anlamlar: kaynaklar.map((k) => ({
          tanim: metneCevir(k.tanim || k.meaning || k.full_definition_in_html),
          file: metneCevir(k.file),
          kaynak_sozluk: metneCevir(k.kaynak_sozluk),
          dialect: typeof k.dialect === "string" ? k.dialect : undefined,
          language: typeof k.language === "string" ? k.language : undefined,
        })),
      };
    });
  }, [filtrelenmisSonuclar, searchQuery, hedefDil, hedefDilBul]);

  const dinamikSozlukSayisi = useMemo(() => {
    if (searchQuery?.trim() && gruplanmisSonuclar.length > 0) {
      const sozlukSet = new Set<string>();
      gruplanmisSonuclar.forEach((grup) => {
        grup.kaynaklar?.forEach((k: any) => {
          const ad = k.file || k.kaynak_sozluk;
          if (ad) sozlukSet.add(ad);
        });
      });
      return sozlukSet.size;
    }

    const dosyaMetni = (seciliDosya || "").toString().trim().toLowerCase();
    if (dosyaMetni && !["tumu", "all", "hepsi"].includes(dosyaMetni)) {
      return 1;
    }

    const lehceMetni = (seciliLehce || "").toString().trim().toLowerCase();
    if (lehceMetni && !["tumu", "all", "hepsi"].includes(lehceMetni)) {
      const kaynakListe = (Array.isArray(manifestData) && manifestData.length > 0) 
        ? manifestData 
        : aktifSozlukler;

      if (Array.isArray(kaynakListe)) {
        return kaynakListe.filter((s: any) => {
          const d = (s.dialect || s.lehce || s.language || s.dil || "").toString().trim().toLowerCase();
          return d.includes(lehceMetni) || lehceMetni.includes(d);
        }).length;
      }
    }

    if (Array.isArray(aktifSozlukler) && aktifSozlukler.length > 0) {
      return aktifSozlukler.length;
    }
    return Array.isArray(manifestData) ? manifestData.length : 34;
  }, [searchQuery, gruplanmisSonuclar, seciliDosya, seciliLehce, aktifSozlukler]);

  const dinamikKayitSayisi = useMemo(() => {
    if (searchQuery?.trim()) {
      return gruplanmisSonuclar.reduce(
        (toplam, grup) => toplam + (grup.kaynaklar?.length || 0),
        0
      );
    }

    const dosyaMetni = (seciliDosya || "").toString().trim().toLowerCase();
    const lehceMetni = (seciliLehce || "").toString().trim().toLowerCase();
    const filtreVarMi = (dosyaMetni && !["tumu", "all"].includes(dosyaMetni)) || 
                        (lehceMetni && !["tumu", "all"].includes(lehceMetni));

    if (filtreVarMi) {
      if (filtrelenmisSonuclar && Array.isArray(filtrelenmisSonuclar) && filtrelenmisSonuclar.length > 0) {
        return filtrelenmisSonuclar.length;
      }
      
      if (Array.isArray(aktifSozlukler) && aktifSozlukler.length > 0) {
        const toplam = aktifSozlukler.reduce((acc, s: any) => {
          const count = s.count || s.kayitSayisi || s.total_words || 0;
          return acc + Number(count);
        }, 0);
        if (toplam > 0) return toplam;
      }
    }

    return wordsCount;
  }, [searchQuery, gruplanmisSonuclar, seciliDosya, seciliLehce, filtrelenmisSonuclar, aktifSozlukler, wordsCount]);

  const handleKelimeSec = useCallback((grup: GruplanmisKelime) => {
    setSeciliKelimeGrubu(grup);
  }, []);

  const handlePanoyaKopyala = useCallback(async (kelime: string, tanim?: string, id?: string) => {
    const metin = `${metneCevir(kelime)}\n${metneCevir(tanim)}`;
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
    <div 
      style={{
        backgroundColor: aktifTema.arkaPlan,
        color: aktifTema.yaziAna,
        transition: "all 0.2s ease",
        padding: "8px 14px 0 14px",
        fontFamily: "'IBM Plex Sans', ui-sans-serif, system-ui, -apple-system, sans-serif"
      }}
    >
      <main 
        style={{ 
          maxWidth: "1150px", 
          width: "100%", 
          margin: "0 auto", 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "flex-start", // Elemanları yukarıya sabitler
          gap: "4px"
        }}
      >
        <Header 
          karanlikMod={karanlikMod}
          toggleKaranlikMod={() => setKaranlikMod(!karanlikMod)}
          metinBoyutu={metinBoyutu}
          setMetinBoyutu={setMetinBoyutu}
          sozlukSayisi={dinamikSozlukSayisi}
          kayitSayisi={dinamikKayitSayisi}
          tema={aktifTema}
        />

        {!searchQuery?.trim() && gununKelimesi && (
          <GununKelimesiKart
            gununKelimesi={{
              ...gununKelimesi,
              kelime: metneCevir(gununKelimesi.kelime),
              tanim: metneCevir(gununKelimesi.tanim),
            }}
            karanlikMod={karanlikMod}
            metinBoyutu={metinBoyutu}
            tema={aktifTema}
            onClick={() => handleKelimeSec({
              kelime: metneCevir(gununKelimesi.kelime),
              dialect: gununKelimesi.dialect,
              kaynaklar: [gununKelimesi],
              anlamlar: [{
                tanim: metneCevir(gununKelimesi.tanim),
                file: metneCevir(gununKelimesi.file),
                kaynak_sozluk: metneCevir(gununKelimesi.kaynak_sozluk),
                dialect: gununKelimesi.dialect,
              }],
            })}
          />
        )}

        <div 
          style={{
            border: `1px solid ${aktifTema.kenarlik}`,
            borderRadius: "4px",
            padding: "10px",
            backgroundColor: aktifTema.kartArkaPlan,
            boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
            outline: `1px solid ${karanlikMod ? "#2C221E" : "#F4C7C7"}`,
            outlineOffset: "-5px"
          }}
        >
          <SearchBox
            inputRef={inputRef}
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
            filtrelenmisSonuclar={filtrelenmisSonuclar}
            tema={aktifTema}
            harfEkle={(harf: string) => {
              setSearchQuery((prev: string) => (prev || "") + harf);
              inputRef.current?.focus();
            }}
            kaynagiDuzenle={kaynagiDuzenle}
            limit={20}
            setGoruntulenenAdet={setGoruntulenenAdet}
          />
        </div>

        {searchQuery?.trim() && !loading && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 0 0 2px" }}>
            <span style={{ fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", color: "#7A1C1C", backgroundColor: karanlikMod ? "#2C221E" : "#FDF2F2", padding: "2px 8px", borderRadius: "2px", border: "1px solid #F4C7C7" }}>
              SONUÇLAR
            </span>
            <p style={{ fontSize: "13px", color: aktifTema.yaziAlt, margin: 0 }}>
              Toplam <strong style={{ color: "#7A1C1C", fontWeight: "bold" }}>{gruplanmisSonuclar.length}</strong> kelime grubu bulundu.
            </p>
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: "center", padding: "12px 0", color: aktifTema.yaziAlt, fontSize: "14px", fontWeight: "bold" }}>
            📖 Sözlük koleksiyonu taranıyor...
          </div>
        ) : (
          searchQuery?.trim() && (
<section style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "0px" }}>              {gruplanmisSonuclar.length === 0 ? (
                <div 
                  style={{
                    textAlign: "center",
                    padding: "20px 16px",
                    borderRadius: "3px",
                    border: `1px dashed ${aktifTema.kenarlik}`,
                    backgroundColor: aktifTema.kartArkaPlan
                  }}
                >
                  <p style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "4px", color: aktifTema.yaziAna }}>
                    Aradığınız kelime bulunamadı
                  </p>
                  <p style={{ fontSize: "13px", color: aktifTema.yaziAlt }}>
                    &quot;{searchQuery}&quot; ifadesine ait kayıt eşleşmedi. Lehçe veya kaynak filtrelerini sıfırlayabilirsiniz.
                  </p>
                </div>
              ) : (
                gosterilenGruplar.map((grup, idx) => (
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
                ))
              )}

              {dahaFazlaVar && (
                <button
                  onClick={() => setGoruntulenenAdet((prev) => prev + 20)}
                  style={{
                    marginTop: "4px",
                    width: "100%",
                    padding: "10px 14px",
                    backgroundColor: "#7A1C1C",
                    color: "#FFFFFF",
                    fontSize: "12px",
                    fontWeight: "bold",
                    borderRadius: "2px",
                    border: "none",
                    cursor: "pointer",
                    letterSpacing: "1px",
                    textTransform: "uppercase"
                  }}
                >
                  Daha Fazla Göster ({gruplanmisSonuclar.length - goruntulenenAdet} kalan)
                </button>
              )}
            </section>
          )
        )}

 {seciliKelimeGrubu && (
          <KelimeDetayDrawer
            seciliKelime={seciliKelimeGrubu}
            kapat={() => setSeciliKelimeGrubu(null)}
            tema={aktifTema}
            metinBoyutu={metinBoyutu}
          />
        )}
{/* Footer'ın üstündeki boşluğu sıfırlıyoruz */}
        <div style={{ marginTop: "0px", paddingTop: "0px" }}>
          <Footer 
            aktifTema={aktifTema} 
            onKaynaklarAc={() => {}} 
          />
        </div>
      </main>
    </div>
  );
}