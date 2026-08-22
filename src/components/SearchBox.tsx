"use client";

import React, { useState, useRef, useEffect } from "react";
import AkilliKlavye from "@/components/AkilliKlavye";
import { KURUMSAL } from "@/lib/dictionaryConstants";
import {
  SearchBoxProps,
  AramaModu,
  LehceTipi,
} from "@/types/dictionary";

export default function SearchBox({
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
  const [dictionaries, setDictionaries] = useState<any[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // public/data/dictionaries.json dosyasını çekme
  useEffect(() => {
    fetch("/data/dictionaries.json")
      .then((res) => res.json())
      .then((data) => setDictionaries(data))
      .catch((err) => console.error("Dictionaries JSON okunamadı:", err));
  }, []);

  // Dışarı tıklandığında dropdown'ı kapat
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

  // Akademik Künye Oluşturucu (shortLabel veya yazar + yıl)
  const getKaynakEtiketi = (d: any) => {
    if (d.shortLabel) return d.shortLabel;
    if (d.author) {
      return `${d.author}${d.year ? ` (${d.year})` : ""}`;
    }
    return d.year ? `(${d.year})` : "";
  };

  // Gelip geçen aktifSozlukler listesini dictionaries.json verisi ile zenginleştirme
  const getEnrichedDictionary = (rawFile: string) => {
    const fileNameOnly = rawFile.split("/").pop()?.split("\\").pop() || rawFile;
    const found = dictionaries.find((d) => d.file === fileNameOnly);
    
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

  // Gruplanmış Veriler
  const batisozlukleri = aktifSozlukler
    .map((d) => getEnrichedDictionary(d.file))
    .filter((d) => d.dialect === "BATI");

  const doguSozlukleri = aktifSozlukler
    .map((d) => getEnrichedDictionary(d.file))
    .filter((d) => d.dialect === "DOGU");

  // Seçili Sözlüğün Başlık Metni
  const getSeciliSozlukEtiket = () => {
    if (seciliDosya === "TUMU") {
      return seciliLehce === "TUMU"
        ? "📖 Tüm Sözlüklerde Ara"
        : `📖 Tüm ${seciliLehce === "BATI" ? "Batı Adıgece" : "Doğu Kabardeyce"} Sözlükleri`;
    }
    const enriched = getEnrichedDictionary(seciliDosya);
    return `${enriched.title}${enriched.label ? ` — ${enriched.label}` : ""}`;
  };

  return (
    <>
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

        {/* Lehçe Butonları */}
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

        {/* ÖZEL UI DROPDOWN */}
        <div ref={dropdownRef} style={{ position: "relative", width: "100%", zIndex: 50 }}>
          <button
            type="button"
            onClick={() => setDropdownAcik(!dropdownAcik)}
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
              {/* Hepsi Seçeneği */}
              <div
                onClick={() => {
                  setSeciliDosya("TUMU");
                  setDropdownAcik(false);
                  setGoruntulenenAdet(limit);
                }}
                style={{
                  padding: "10px 14px",
                  fontSize: `${metinBoyutu * 0.85}px`,
                  fontWeight: "bold",
                  cursor: "pointer",
                  backgroundColor: seciliDosya === "TUMU" ? tema.inputArkaPlan : "transparent",
                  borderBottom: `1px solid ${tema.kenarlik}`,
                  color: tema.yaziAna,
                }}
              >
                {seciliLehce === "TUMU"
                  ? "📖 Tüm Sözlüklerde Ara"
                  : `📖 Tüm ${seciliLehce === "BATI" ? "Batı Adıgece" : "Doğu Kabardeyce"} Sözlükleri`}
              </div>

              {/* BATI ADIGECE GRUBU */}
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
                  {batisozlukleri.map((d) => {
                    const isSelected = seciliDosya === d.file;
                    return (
                      <div
                        key={d.file}
                        onClick={() => {
                          setSeciliDosya(d.file);
                          setDropdownAcik(false);
                          setGoruntulenenAdet(limit);
                        }}
                        style={{
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
                        <span style={{ flex: 1 }}>{d.title}</span>
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
                      </div>
                    );
                  })}
                </div>
              )}

              {/* DOĞU KABARDEYCE GRUBU */}
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
                  {doguSozlukleri.map((d) => {
                    const isSelected = seciliDosya === d.file;
                    return (
                      <div
                        key={d.file}
                        onClick={() => {
                          setSeciliDosya(d.file);
                          setDropdownAcik(false);
                          setGoruntulenenAdet(limit);
                        }}
                        style={{
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
                        <span style={{ flex: 1 }}>{d.title}</span>
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
                      </div>
                    );
                  })}
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
{/* ARAMA KUTUSU (SOL ALTA HİZALANMIŞ YAZI) */}
      <div
        style={{
          position: "relative",
          marginBottom: "16px",
          width: "100%",
          height: "220px",
          borderRadius: "16px",
          border: `2px solid ${tema.kenarlik}`,
          backgroundColor: tema.inputArkaPlan,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          display: "flex",
          alignItems: "flex-end", // İçindeki her şeyi sol alta itin
          padding: "16px 48px 16px 16px",
          boxSizing: "border-box",
        }}
      >
        <textarea
          id="arama-input"
          ref={inputRef as any}
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Kelime veya anlam ara... (Örn: Ӏаб, мафэ, псы)"
          rows={1}
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: `${metinBoyutu}px`,
            color: tema.yaziAna,
            resize: "none",
            padding: 0,
            margin: 0,
            lineHeight: "1.4",
          }}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              handleSearchChange("");
              inputRef.current?.focus();
            }}
            style={{
              position: "absolute",
              right: "16px",
              bottom: "16px",
              background: "transparent",
              border: "none",
              color: tema.yaziAlt,
              cursor: "pointer",
              fontSize: `${metinBoyutu * 1.2}px`,
            }}
          >
            ✕
          </button>
        )}
      </div>

     {/* ALT SATIR: İLE BAŞLAYAN KUTUSU VE AKILLI KLAVYENIN EŞİTLENMİŞ TASARIMI */}
      <div style={{ display: "flex", gap: "10px", alignItems: "stretch", flexWrap: "wrap", marginTop: "12px" }}>
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
      </>
  );
}