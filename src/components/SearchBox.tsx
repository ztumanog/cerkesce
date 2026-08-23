"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback
} from "react";

// Types
import type {
  AramaModu,
  GruplanmisKelime,
  DictionaryItem,
  SozlukEkraniProps,
  SearchBoxProps,
  LehceTipi
} from "@/types/dictionary";
import type { TemaTipi } from "@/utils/helpers";

// Utils & Data
import { metneCevir, kaynagiDuzenle } from "@/utils/helpers";
import dictionariesData from "@/utils/dictionaries.json";
import { KURUMSAL } from "@/lib/dictionaryConstants";

// Alt Bileşenler (Proje içi içe aktarımlar)
import GununKelimesiKart from "./GununKelimesiKart";
import KelimeKarti from "./KelimeKarti";
import KelimeDetayDrawer from "./KelimeDetayDrawer";
import Kaynaklar from "./Kaynaklar";
import AkilliKlavye from "@/components/AkilliKlavye";
import manifestData from "@/utils/dictionaries.json";

// --- SEARCHBOX YARDIMCI FONKSİYONLARI ---
const getKaynakEtiketi = (d: any) => {
  if (d.shortLabel) return d.shortLabel;
  if (d.author) {
    return `${d.author}${d.year ? ` (${d.year})` : ""}`;
  }
  return d.year ? `(${d.year})` : "";
};

const getEnrichedDictionary = (rawFile: string) => {
  const fileNameOnly = rawFile.split("/").pop()?.split("\\").pop() || rawFile;
  const found = manifestData.find((d: any) => d.file === fileNameOnly);

  if (found) {
    return {
      file: fileNameOnly,
      title: found.title,
      label: getKaynakEtiketi(found),
      dialect: found.dialect as "BATI" | "DOGU",
    };
  }

  return {
    file: fileNameOnly,
    title: fileNameOnly,
    label: "",
    dialect: fileNameOnly.includes("Kbd") ? "DOGU" : "BATI",
  };
};

// --- SEARCHBOX BİLEŞENİ ---
export function SearchBox({
  searchQuery,
  setSearchQuery,
  mod,
  setMod,
  hedefDil,
  setHedefDil,
  seciliLehce,
  setSeciliLehce,
  seciliDosya,
  setSeciliDosya,
  aktifSozlukler = [],
  metinBoyutu,
  karanlikMod,
  tema,
  inputRef,
  setGoruntulenenAdet,
  limit,
}: SearchBoxProps) {
  const [dropdownAcik, setDropdownAcik] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownAcik(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (val: React.SetStateAction<string>) => {
    setSearchQuery(val);
    setGoruntulenenAdet(limit);
  };

  const handleHedefDilChange = (dilKod: string) => {
    setHedefDil(dilKod);
    setGoruntulenenAdet(limit);
  };

  const batisozlukleri = useMemo(
    () =>
      aktifSozlukler
        .map((d) => getEnrichedDictionary(d.file))
        .filter((d) => d.dialect === "BATI"),
    [aktifSozlukler]
  );

  const doguSozlukleri = useMemo(
    () =>
      aktifSozlukler
        .map((d) => getEnrichedDictionary(d.file))
        .filter((d) => d.dialect === "DOGU"),
    [aktifSozlukler]
  );

  const getSeciliSozlukEtiket = () => {
    if (seciliDosya === "TUMU") {
      return seciliLehce === "TUMU"
        ? "📖 Tüm Sözlüklerde Ara"
        : `📖 Tüm ${seciliLehce === "BATI" ? "Batı Adıgece" : "Doğu Kabardeyce"} Sözlükleri`;
    }
    const enriched = getEnrichedDictionary(seciliDosya);
    return `${enriched.title}${enriched.label ? ` — ${enriched.label}` : ""}`;
  };

  const renderSozlukItem = (d: { file: string; title: string; label: string }) => {
    const isSelected = seciliDosya === d.file;
    return (
      <button
        key={d.file}
        type="button"
        role="option"
        aria-selected={isSelected}
        onClick={() => {
          setSeciliDosya(d.file);
          setDropdownAcik(false);
          setGoruntulenenAdet(limit);
        }}
        style={{
          width: "100%",
          boxSizing: "border-box",
          border: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 14px",
          fontSize: `${metinBoyutu * 0.85}px`,
          cursor: "pointer",
          backgroundColor: isSelected ? tema.inputArkaPlan : "transparent",
          color: isSelected ? KURUMSAL.kirmizi : tema.yaziAna,
          fontWeight: isSelected ? "bold" : "normal",
        }}
      >
        <span style={{ flex: 1, textAlign: "left" }}>{d.title}</span>
        {d.label && (
          <span
            style={{
              color: tema.yaziAlt,
              fontSize: `${metinBoyutu * 0.8}px`,
              fontStyle: "italic",
              marginLeft: "12px",
              textAlign: "right",
              whiteSpace: "nowrap",
            }}
          >
            {d.label}
          </span>
        )}
      </button>
    );
  };

  return (
    <>
      {/* 🎯 ARAMA KUTUSU */}
      <div
        style={{
          border: `2px solid ${karanlikMod ? "#3D322C" : "#7A1C1C"}`,
          borderRadius: "8px",
          padding: "12px",
          backgroundColor: karanlikMod ? "#26201D" : "#FFFFFF",
          boxShadow: karanlikMod 
            ? "0 4px 16px rgba(0, 0, 0, 0.4)" 
            : "0 4px 12px rgba(122, 28, 28, 0.08)",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "16px"
        }}
      >
        {/* 🔍 ARAMA INPUTU VE SAĞDAKİ BÜYÜTEÇ */}
        <div
          style={{
            position: "relative",
            width: "100%",
            minHeight: "56px",
            borderRadius: "6px",
            border: `1px solid ${tema.kenarlik}`,
            backgroundColor: karanlikMod ? "#1A1614" : "#FAFAFA",
            display: "flex",
            alignItems: "center",
            padding: "0 76px 0 14px",
            boxSizing: "border-box"
          }}
        >
          <textarea
            id="arama-input"
            ref={inputRef as unknown as React.RefObject<HTMLTextAreaElement>}
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Kelime veya anlam ara... (/ tuşu ile hızlı odaklanın)"
            rows={1}
            style={{
              width: "100%",
              height: "42px",
              maxHeight: 80,
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "15px",
              fontWeight: "500",
              color: tema.yaziAna,
              resize: "none",
              padding: "8px 0",
              margin: 0,
              lineHeight: "1.4",
              boxSizing: "border-box"
            }}
          />

          {/* SAĞ TARAFTAKİ BUTONLAR (Temizle + Büyüteç) */}
          <div
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  handleSearchChange("");
                  (inputRef as unknown as React.RefObject<HTMLTextAreaElement>).current?.focus();
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: tema.yaziAlt,
                  cursor: "pointer",
                  fontSize: "15px",
                  padding: "4px"
                }}
              >
                ✕
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                (inputRef as unknown as React.RefObject<HTMLTextAreaElement>).current?.focus();
              }}
              title="Ara"
              style={{
                background: KURUMSAL.kirmizi,
                border: "none",
                color: "#ffffff",
                borderRadius: "6px",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "14px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}
            >
              🔍
            </button>
          </div>
        </div>

        {/* ALT SATIR: MOD SEÇİMİ VE AKILLI KLAVYE */}
        <div style={{ display: "flex", gap: "10px", alignItems: "stretch", flexWrap: "wrap" }}>
          <select
            value={mod}
            onChange={(e) => setMod(e.target.value as AramaModu)}
            style={{
              height: "40px",
              padding: "0 14px",
              fontSize: `${metinBoyutu * 0.95}px`,
              fontWeight: "600",
              borderRadius: "8px",
              border: `1.5px solid ${tema.kenarlik}`,
              backgroundColor: tema.inputArkaPlan,
              color: tema.yaziAna,
              cursor: "pointer",
              whiteSpace: "nowrap",
              boxSizing: "border-box",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <option value="baslayan">İle Başlayan</option>
            <option value="icinde">İçinde Geçen</option>
            <option value="tam">Tam Eşleşen</option>
          </select>

          <div style={{ display: "inline-flex", height: "40px" }}>
            <AkilliKlavye
              inputRef={inputRef}
              sorgu={searchQuery}
              setSorgu={handleSearchChange}
              metinBoyutu={metinBoyutu}
              karanlikMod={karanlikMod}
            />
          </div>
        </div>
      </div>

      {/* LEHÇE VE ÖZEL SÖZLÜK SEÇİCİ */}
      <fieldset style={{ border: "none", padding: 0, margin: "0 0 16px 0" }}>
        <legend
          style={{
            fontSize: `${metinBoyutu * 0.85}px`,
            fontWeight: "600",
            color: tema.yaziAlt,
            marginBottom: "8px",
          }}
        >
          Lehçe & Sözlük Seçimi:
        </legend>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "10px" }}>
          {[
            { kod: "TUMU" as LehceTipi, etiket: "🌐 Tüm Lehçeler" },
            { kod: "BATI" as LehceTipi, etiket: "🟢 Batı Adıgece" },
            { kod: "DOGU" as LehceTipi, etiket: "🔵 Doğu Kabardeyce" },
          ].map((lehce) => (
            <button
              key={lehce.kod}
              type="button"
              onClick={() => {
                setSeciliLehce(lehce.kod);
                setSeciliDosya("TUMU");
                setGoruntulenenAdet(limit);
              }}
              aria-pressed={seciliLehce === lehce.kod}
              style={{
                padding: "8px 14px",
                fontSize: `${metinBoyutu * 0.85}px`,
                fontWeight: seciliLehce === lehce.kod ? "bold" : "normal",
                borderRadius: "20px",
                border: `2px solid ${
                  seciliLehce === lehce.kod ? KURUMSAL.kirmizi : tema.kenarlik
                }`,
                backgroundColor:
                  seciliLehce === lehce.kod ? KURUMSAL.kirmizi : tema.kartArkaPlan,
                color: seciliLehce === lehce.kod ? "#ffffff" : tema.yaziAna,
                cursor: "pointer",
              }}
            >
              {lehce.etiket}
            </button>
          ))}
        </div>

        {/* DROPDOWN */}
        <div ref={dropdownRef} style={{ position: "relative", width: "100%", zIndex: 50 }}>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={dropdownAcik}
            onClick={() => setDropdownAcik((prev) => !prev)}
            style={{
              width: "100%",
              padding: "12px 16px",
              fontSize: `${metinBoyutu * 0.9}px`,
              borderRadius: "8px",
              border: `1px solid ${tema.kenarlik}`,
              backgroundColor: tema.inputArkaPlan,
              color: tema.yaziAna,
              textAlign: "left",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {getSeciliSozlukEtiket()}
            </span>
            <span style={{ fontSize: "12px", marginLeft: "8px" }}>
              {dropdownAcik ? "▲" : "▼"}
            </span>
          </button>

          {dropdownAcik && (
            <div
              role="listbox"
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                zIndex: 1000,
                marginTop: "4px",
                maxHeight: "340px",
                overflowY: "auto",
                backgroundColor: tema.kartArkaPlan,
                border: `1px solid ${tema.kenarlik}`,
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              }}
            >
              <button
                type="button"
                role="option"
                aria-selected={seciliDosya === "TUMU"}
                onClick={() => {
                  setSeciliDosya("TUMU");
                  setDropdownAcik(false);
                  setGoruntulenenAdet(limit);
                }}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "10px 14px",
                  fontSize: `${metinBoyutu * 0.85}px`,
                  fontWeight: "bold",
                  cursor: "pointer",
                  backgroundColor: seciliDosya === "TUMU" ? tema.inputArkaPlan : "transparent",
                  border: "none",
                  borderBottom: `1px solid ${tema.kenarlik}`,
                  color: tema.yaziAna,
                }}
              >
                {seciliLehce === "TUMU"
                  ? "📖 Tüm Sözlüklerde Ara"
                  : `📖 Tüm ${seciliLehce === "BATI" ? "Batı Adıgece" : "Doğu Kabardeyce"} Sözlükleri`}
              </button>

              {(seciliLehce === "TUMU" || seciliLehce === "BATI") && batisozlukleri.length > 0 && (
                <div>
                  <div
                    style={{
                      padding: "8px 14px 4px 14px",
                      fontSize: `${metinBoyutu * 0.75}px`,
                      fontWeight: "bold",
                      color: KURUMSAL.kirmizi,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      backgroundColor: tema.inputArkaPlan,
                    }}
                  >
                    ─── Batı Adıgece ───
                  </div>
                  {batisozlukleri.map(renderSozlukItem)}
                </div>
              )}

              {(seciliLehce === "TUMU" || seciliLehce === "DOGU") && doguSozlukleri.length > 0 && (
                <div>
                  <div
                    style={{
                      padding: "8px 14px 4px 14px",
                      fontSize: `${metinBoyutu * 0.75}px`,
                      fontWeight: "bold",
                      color: KURUMSAL.mavi,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      backgroundColor: tema.inputArkaPlan,
                    }}
                  >
                    ─── Doğu Kabardeyce ───
                  </div>
                  {doguSozlukleri.map(renderSozlukItem)}
                </div>
              )}
            </div>
          )}
        </div>
      </fieldset>

      {/* HEDEF DİL FİLTRESİ */}
      <fieldset style={{ border: "none", padding: 0, margin: "0 0 16px 0" }}>
        <legend
          style={{
            fontSize: `${metinBoyutu * 0.85}px`,
            fontWeight: "600",
            color: tema.yaziAlt,
            marginBottom: "8px",
          }}
        >
          Hedef Dil Filtresi:
        </legend>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {[
            { kod: "tumu", etiket: "🌐 Tümü" },
            { kod: "tr", etiket: "🇹🇷 Türkçe" },
            { kod: "ar", etiket: "🇸🇦 Arapça" },
            { kod: "en", etiket: "🇬🇧 İngilizce" },
            { kod: "ru", etiket: "🇷🇺 Rusça" },
          ].map((dil) => (
            <button
              key={dil.kod}
              type="button"
              onClick={() => handleHedefDilChange(dil.kod)}
              aria-pressed={hedefDil === dil.kod}
              style={{
                padding: "6px 12px",
                fontSize: `${metinBoyutu * 0.8}px`,
                fontWeight: hedefDil === dil.kod ? "bold" : "normal",
                borderRadius: "16px",
                border: `1px solid ${
                  hedefDil === dil.kod ? KURUMSAL.kirmizi : tema.kenarlik
                }`,
                backgroundColor:
                  hedefDil === dil.kod ? KURUMSAL.kirmizi : tema.kartArkaPlan,
                color: hedefDil === dil.kod ? "#ffffff" : tema.yaziAna,
                cursor: "pointer",
              }}
            >
              {dil.etiket}
            </button>
          ))}
        </div>
      </fieldset>
    </>
  );
}

// --- ANA SÖZLÜK EKRANI BİLEŞENİ ---
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
  const [metinBoyutu, setMetinBoyutu] = useState<number>(15);
  const [karanlikMod, setKaranlikMod] = useState<boolean>(false);

  const [mod, setMod] = useState<AramaModu>("baslayan");
  const [hedefDil, setHedefDil] = useState<string>("tumu");
  const [goruntulenenAdet, setGoruntulenenAdet] = useState<number>(20);
  const [seciliKelimeGrubu, setSeciliKelimeGrubu] = useState<GruplanmisKelime | null>(null);
  const [kopyalandiId, setKopyalandiId] = useState<string | null>(null);

  // Referanslar Modal Durumu
  const [kaynaklarModaliAcik, setKaynaklarModaliAcik] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Klavye Kısayolu ("/" tuşu ile aramaya odaklanma)
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

  // Karanlık Mod Yönetimi
  useEffect(() => {
    if (karanlikMod) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [karanlikMod]);

  // Arama veya filtre değiştiğinde gösterilen adet limitini başa sar
  useEffect(() => {
    setGoruntulenenAdet(20);
  }, [searchQuery, hedefDil, seciliLehce, seciliDosya, mod]);

  // TEMA TANIMLAMALARI
  const aktifTema: TemaTipi = useMemo(() => ({
    arkaPlan: karanlikMod ? "#1A1614" : "#FDFBF7",
    kartArkaPlan: karanlikMod ? "#26201D" : "#FFFFFF",
    yaziAna: karanlikMod ? "#F4EFE6" : "#2C221E",
    yaziAlt: karanlikMod ? "#A89A8E" : "#8C7A6B",
    kenarlik: karanlikMod ? "#3D322C" : "#EADDC9",
    inputArkaPlan: karanlikMod ? "#221C19" : "#FAFAFA",
  }), [karanlikMod]);

  // Metadata öncelikli hedef dil tespiti
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

  // Dinamik Sayaçlar
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
    if (dosyaMetni && dosyaMetni !== "tumu" && dosyaMetni !== "all" && dosyaMetni !== "hepsi") {
      return 1;
    }

    const lehceMetni = (seciliLehce || "").toString().trim().toLowerCase();
    if (lehceMetni && lehceMetni !== "tumu" && lehceMetni !== "all" && lehceMetni !== "hepsi") {
      if (Array.isArray(manifestData) && manifestData.length > 0) {
        const lehceSozlukleri = manifestData.filter((s: any) => {
          const d = (s.dialect || s.lehce || s.language || s.dil || "").toString().trim().toLowerCase();
          return d.includes(lehceMetni) || lehceMetni.includes(d);
        });
        return lehceSozlukleri.length;
      }

      if (Array.isArray(aktifSozlukler) && aktifSozlukler.length > 0) {
        return aktifSozlukler.length;
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
    const filtreVarMi = (dosyaMetni && dosyaMetni !== "tumu" && dosyaMetni !== "all") ||
      (lehceMetni && lehceMetni !== "tumu" && lehceMetni !== "all");

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
        display: "flex",
        flexDirection: "column",
        backgroundColor: aktifTema.arkaPlan,
        color: aktifTema.yaziAna,
        transition: "all 0.2s ease",
        padding: "10px 14px 10px 14px",
        fontFamily: "'IBM Plex Sans', ui-sans-serif, system-ui, -apple-system, sans-serif"
      }}
    >
      <main style={{ flex: 1, maxWidth: "960px", width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", gap: "18px" }}>

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

        {/* ARAMA KUTUSU & SAĞ ÜST İSTATİSTİK ROZETİ */}
        <div
          style={{
            position: "relative",
            width: "100%",
            backgroundColor: aktifTema.kartArkaPlan,
            border: `1px solid ${aktifTema.kenarlik}`,
            padding: "14px 16px",
            borderRadius: "8px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.02)",
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}
        >
          {/* Üst Başlık & Sağ Taraftaki İstatistik Banderolü */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${aktifTema.kenarlik}`, paddingBottom: "8px", flexWrap: "wrap", gap: "6px" }}>
            <span style={{ fontSize: "11px", fontWeight: "bold", color: "#7A1C1C", textTransform: "uppercase", letterSpacing: "1px", display: "flex", alignItems: "center", gap: "4px" }}>
              <span>🔍</span> Sözlükte Kelime Ara
            </span>

            {/* İstatistikler */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "#8C7A6B" }}>
              <span>
                <strong style={{ color: aktifTema.yaziAna }}>{dinamikSozlukSayisi}</strong> Sözlük
              </span>
              <span>•</span>
              <span>
                <strong style={{ color: aktifTema.yaziAna }}>{dinamikKayitSayisi.toLocaleString("tr-TR")}</strong> Kayıt
              </span>
            </div>
          </div>

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

        {/* Bulunan Sonuç Adedi */}
        {searchQuery?.trim() && !loading && (
          <p style={{ fontSize: "12px", color: "#8C7A6B", margin: "-4px 0 0 2px", fontFamily: "monospace" }}>
            Toplam <strong style={{ color: "#7A1C1C" }}>{gruplanmisSonuclar.length}</strong> kelime grubu listeleniyor.
          </p>
        )}

        {/* Loading / Sonuç Liste Alanı */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "24px 0", color: "#8C7A6B", fontSize: "13px", fontWeight: "bold", fontFamily: "monospace" }}>
            📖 Sözlük verileri taranıyor...
          </div>
        ) : (
          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {searchQuery?.trim() && gruplanmisSonuclar.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "32px 16px",
                  borderRadius: "2px",
                  border: `1px dashed ${aktifTema.kenarlik}`,
                  backgroundColor: aktifTema.kartArkaPlan
                }}
              >
                <p style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "4px", color: aktifTema.yaziAna }}>
                  Aradığınız kelime bulunamadı
                </p>
                <p style={{ fontSize: "12px", color: "#8C7A6B" }}>
                  &quot;{searchQuery}&quot; ifadesine ait bir karşılık bulunamadı. Filtrelerinizi değiştirip tekrar deneyebilirsiniz.
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
                  marginTop: "8px",
                  width: "100%",
                  padding: "10px 16px",
                  fontSize: `${metinBoyutu * 0.9}px`,
                  fontWeight: "bold",
                  color: KURUMSAL.kirmizi,
                  backgroundColor: aktifTema.kartArkaPlan,
                  border: `1px solid ${aktifTema.kenarlik}`,
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Daha Fazla Göster ({gruplanmisSonuclar.length - goruntulenenAdet} Kalan)
              </button>
            )}
          </section>
        )}
      </main>

      {/* DETAY DRAWER */}
      {seciliKelimeGrubu && (
        <KelimeDetayDrawer
          seciliKelime={seciliKelimeGrubu}
          kapat={() => setSeciliKelimeGrubu(null)}
          tema={aktifTema}
          metinBoyutu={metinBoyutu}
        />
      )}
    </div>
  );
}