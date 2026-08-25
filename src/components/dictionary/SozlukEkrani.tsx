"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback
} from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GununKelimesiKart from "@/components/dictionary/GununKelimesiKart";
import SearchBox from "@/components/dictionary/SearchBox";
import KelimeKarti from "@/components/dictionary/KelimeKarti";
import KelimeDetayDrawer from "@/components/ui/KelimeDetayDrawer";
import Kaynaklar from "@/components/layout/Kaynaklar";

import type {
  AramaModu,
  GruplanmisKelime,
  DictionaryItem,
  SozlukEkraniProps,
} from "@/types/dictionary";
import type { TemaTipi } from "@/utils/helpers";
import { metneCevir } from "@/utils/helpers";
import manifestData from "@/utils/dictionaries.json";

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
}: SozlukEkraniProps) {
  const [metinBoyutu, setMetinBoyutu] = useState<number>(17);
  const [karanlikMod, setKaranlikMod] = useState<boolean>(false);

  const [mod, setMod] = useState<AramaModu>("baslayan");
  const [hedefDil, setHedefDil] = useState<string>("tumu");
  const [goruntulenenAdet, setGoruntulenenAdet] = useState<number>(20);
  const [seciliKelimeGrubu, setSeciliKelimeGrubu] = useState<GruplanmisKelime | null>(null);
  const [kopyalandiId, setKopyalandiId] = useState<string | null>(null);
  const [kaynaklarAcik, setKaynaklarAcik] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Klavye Odağı Kısayolu ("/")
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

  // Karanlık Mod Teması
  useEffect(() => {
    if (karanlikMod) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [karanlikMod]);

  // Arama/Filtre Değişiminde Adet Sıfırlama
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

  // Hedef Dil Tespiti Guard Metodu
  const hedefDilBul = useCallback((item: DictionaryItem | Record<string, unknown>): string => {
    if (!item) return "diger";

    const metaLang = (
      (item as DictionaryItem).targetLanguage ||
      (item as Record<string, unknown>).language ||
      (item as Record<string, unknown>).dil ||
      ""
    ).toString().toLowerCase();

    if (metaLang) {
      if (metaLang.includes("tr") || metaLang.includes("turk")) return "tr";
      if (metaLang.includes("ar")) return "ar";
      if (metaLang.includes("en")) return "en";
      if (metaLang.includes("ru")) return "ru";
    }

    const dosyaAdi = metneCevir((item as DictionaryItem).file || (item as Record<string, unknown>).kaynak_sozluk || item).toLowerCase();
    if (dosyaAdi.includes("tur") || dosyaAdi.includes("tu-")) return "tr";
    if (dosyaAdi.includes("ara") || dosyaAdi.includes("-ar")) return "ar";
    if (dosyaAdi.includes("en") || dosyaAdi.includes("kbd-en")) return "en";
    if (dosyaAdi.includes("rus") || dosyaAdi.includes("ru-")) return "ru";

    return "diger";
  }, []);

  // Tanım Öncelik Mantığı Uygulanmış Gruplama
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
      const ilk = kaynaklar[0] as Record<string, unknown>;
      const kelimeBaslik = metneCevir(ilk.kelime);

      // Lehçe okuma: dialect -> lehce -> diyalekt sırasıyla kontrol ediliyor
      const tespitEdilenLehce = (ilk.dialect || ilk.lehce || ilk.diyalekt || "BATI").toString();

      return {
        kelime: kelimeBaslik,
        dialect: tespitEdilenLehce,
        kaynaklar,
        anlamlar: kaynaklar.map((k) => {
          const itemObj = k as Record<string, unknown>;
          let secilenTanim = "";

          if (Array.isArray(k.definitions) && k.definitions.length > 0 && k.definitions[0]?.meaning) {
            secilenTanim = metneCevir(k.definitions[0].meaning);
          } else if (k.full_definition_in_html) {
            secilenTanim = metneCevir(k.full_definition_in_html);
          } else {
            secilenTanim = metneCevir(k.tanim || k.meaning);
          }

          const ozelLehce = itemObj.dialect || itemObj.lehce || itemObj.diyalekt;

          return {
            tanim: secilenTanim,
            file: metneCevir(k.file),
            kaynak_sozluk: metneCevir(k.kaynak_sozluk),
            dialect: ozelLehce ? ozelLehce.toString() : undefined,
            language: typeof k.language === "string" ? k.language : undefined,
          };
        }),
      };
    });
  }, [filtrelenmisSonuclar, searchQuery, hedefDil, hedefDilBul]);

  // Dinamik Sayaçlar
  const dinamikSozlukSayisi = useMemo(() => {
    if (searchQuery?.trim() && gruplanmisSonuclar.length > 0) {
      const sozlukSet = new Set<string>();
      gruplanmisSonuclar.forEach((grup) => {
        grup.kaynaklar?.forEach((k: DictionaryItem) => {
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
        return kaynakListe.filter((s: unknown) => {
          const item = s as Record<string, unknown>;
          // diyalekt alanı da lehce tespiti içine eklendi
          const d = (item.dialect || item.lehce || item.diyalekt || item.language || item.dil || "").toString().trim().toLowerCase();
          return d.includes(lehceMetni) || lehceMetni.includes(d);
        }).length;
      }
    }

    if (Array.isArray(aktifSozlukler) && aktifSozlukler.length > 0) {
      return aktifSozlukler.length;
    }
    return Array.isArray(manifestData) ? manifestData.length : 34;
  }, [searchQuery, gruplanmisSonuclar, seciliDosya, seciliLehce, aktifSozlukler]);

  const dinamikKayitSayisi = useMemo<number>(() => {
    if (searchQuery?.trim()) {
      return gruplanmisSonuclar.reduce(
        (toplam, grup) => toplam + (grup.kaynaklar?.length || 0),
        0
      );
    }

    const dosyaMetni = (seciliDosya || "").toString().trim().toLowerCase();
    const lehceMetni = (seciliLehce || "").toString().trim().toLowerCase();
    
    const filtreVarMi = 
      (dosyaMetni !== "" && !["tumu", "all"].includes(dosyaMetni)) ||
      (lehceMetni !== "" && !["tumu", "all"].includes(lehceMetni));

    if (filtreVarMi) {
      if (Array.isArray(filtrelenmisSonuclar) && filtrelenmisSonuclar.length > 0) {
        return filtrelenmisSonuclar.length;
      }

      if (Array.isArray(aktifSozlukler) && aktifSozlukler.length > 0) {
        return aktifSozlukler.reduce<number>((acc, sozluk) => {
          if (!sozluk || typeof sozluk !== "object") return acc;

          const rawCount =
            (sozluk as Record<string, unknown>).kelimeSayisi ??
            (sozluk as Record<string, unknown>).kayitSayisi ??
            (sozluk as Record<string, unknown>).count ??
            (sozluk as Record<string, unknown>).total_words ??
            0;

          const countNum = Number(rawCount);
          return acc + (isNaN(countNum) ? 0 : countNum);
        }, 0);
      }
    }

    return 0;
  }, [searchQuery, gruplanmisSonuclar, seciliDosya, seciliLehce, filtrelenmisSonuclar, aktifSozlukler]);

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
          justifyContent: "flex-start",
          gap: "8px"
        }}
      >
        <Header
          karanlikMod={karanlikMod}
          toggleKaranlikMod={() => setKaranlikMod(!karanlikMod)}
          metinBoyutu={metinBoyutu}
          setMetinBoyutu={setMetinBoyutu}
          sozlukSayisi={Number(dinamikSozlukSayisi ?? 0)}
          kayitSayisi={Number(dinamikKayitSayisi ?? 0)}
          tema={aktifTema}
        />

        {/* 1. Arama Kutusu Bileşeni */}
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
            limit={20}
            setGoruntulenenAdet={setGoruntulenenAdet}
          />
        </div>

        {/* 2. Günün Kelimesi Bileşeni */}
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
            onClick={() => {
              const itemObj = gununKelimesi as Record<string, unknown>;
              const gununLehcesi = (gununKelimesi.dialect || itemObj.lehce || itemObj.diyalekt || "BATI").toString();
              
              handleKelimeSec({
                kelime: metneCevir(gununKelimesi.kelime),
                dialect: gununLehcesi,
                kaynaklar: [gununKelimesi],
                anlamlar: [{
                  tanim: metneCevir(gununKelimesi.tanim),
                  file: metneCevir(gununKelimesi.file),
                  kaynak_sozluk: metneCevir(gununKelimesi.kaynak_sozluk),
                  dialect: gununLehcesi,
                }],
              });
            }}
          />
        )}

        {/* Sonuç Özeti */}
        {searchQuery?.trim() && !loading && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "4px 0 0 2px" }}>
            <span style={{ fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", color: "#7A1C1C", backgroundColor: karanlikMod ? "#2C221E" : "#FDF2F2", padding: "2px 8px", borderRadius: "2px", border: "1px solid #F4C7C7" }}>
              SONUÇLAR
            </span>
            <p style={{ fontSize: "13px", color: aktifTema.yaziAlt, margin: 0 }}>
              Toplam <strong style={{ color: "#7A1C1C", fontWeight: "bold" }}>{gruplanmisSonuclar.length}</strong> kelime grubu bulundu.
            </p>
          </div>
        )}

        {/* Veri Listesi / Loading Durumu */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "16px 0", color: aktifTema.yaziAlt, fontSize: "14px", fontWeight: "bold" }}>
            📖 Sözlük koleksiyonu taranıyor...
          </div>
        ) : (
          searchQuery?.trim() && (
            <section style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
              {gruplanmisSonuclar.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "20px 16px",
                    borderRadius: "4px",
                    border: `1px dashed ${aktifTema.kenarlik}`,
                    backgroundColor: aktifTema.kartArkaPlan
                  }}
                >
                  <p style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "4px", color: aktifTema.yaziAna }}>
                    Aradığınız kelime bulunamadı
                  </p>
                  <p style={{ fontSize: "13px", color: aktifTema.yaziAlt }}>
                    &quot;{searchQuery}&quot; ifadesine ait kayıt eşleşmedi. Filtrelerinizi kontrol edebilirsiniz.
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
                  type="button"
                  onClick={() => setGoruntulenenAdet((prev) => prev + 20)}
                  style={{
                    marginTop: "6px",
                    width: "100%",
                    padding: "10px 14px",
                    backgroundColor: "#7A1C1C",
                    color: "#FFFFFF",
                    fontSize: "12px",
                    fontWeight: "bold",
                    borderRadius: "4px",
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

        {/* Detay Drawer Modal Yapısı */}
        {seciliKelimeGrubu && (
          <KelimeDetayDrawer
            seciliKelime={seciliKelimeGrubu}
            kapat={() => setSeciliKelimeGrubu(null)}
            tema={aktifTema}
            metinBoyutu={metinBoyutu}
          />
        )}

        <Footer
          aktifTema={aktifTema}
          onKaynaklarAc={() => setKaynaklarAcik(true)}
        />

        {/* Referans Modal */}
        {kaynaklarAcik && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
              backdropFilter: "blur(2px)"
            }}
            onClick={() => setKaynaklarAcik(false)}
          >
            <div
              style={{
                backgroundColor: aktifTema.kartArkaPlan,
                color: aktifTema.yaziAna,
                border: `1px solid ${aktifTema.kenarlik}`,
                borderRadius: "6px",
                padding: "24px",
                maxWidth: "800px",
                width: "100%",
                maxHeight: "85vh",
                overflowY: "auto",
                position: "relative",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setKaynaklarAcik(false)}
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "16px",
                  background: "none",
                  border: "none",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#7A1C1C",
                  cursor: "pointer"
                }}
              >
                ✕
              </button>

              <Kaynaklar />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}