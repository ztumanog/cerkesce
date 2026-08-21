"use client";

import React from "react";
import AkilliKlavye from "@/components/AkilliKlavye";
import { KURUMSAL } from "@/lib/dictionaryConstants";
import {
  SearchBoxProps,
  AramaModu,
  LehceTipi,
  DictionaryMeta,
  DictionaryItem,
  Dialect,
} from "@/types/dictionary";

export function searchWords(
  allWords: DictionaryItem[],
  query: string,
  dialect: "TUMU" | Dialect = "TUMU",
  selectedFile: string = "TUMU",
  hedefDil: string = "tumu",
  limit: number = 50
): DictionaryItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return allWords
    .filter((item) => {
      // 1. Lehçe Filtresi
      if (dialect !== "TUMU" && item.dialect !== dialect) return false;
      
      // 2. Sözlük Dosya Filtresi
      if (selectedFile !== "TUMU" && item.file !== selectedFile) return false;

      // 3. Hedef Dil Filtresi (Eklendi)
      if (hedefDil !== "tumu") {
        const itemDil = (item.target_lang || item.lang || "").toLowerCase();
        if (itemDil && itemDil !== hedefDil.toLowerCase()) return false;
      }

      // 4. Kelime ve Tanım Araması
      return (
        (item.kelime?.toLowerCase() || "").includes(q) ||
        (item.tanim?.toLowerCase() || "").includes(q)
      );
    })
    .slice(0, limit);
}

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
  aktifSozlukler,
  metinBoyutu,
  karanlikMod,
  tema,
  inputRef,
  kaynagiDuzenle,
  setGoruntulenenAdet,
  limit,
}: SearchBoxProps) {
  const handleSearchChange = (val: React.SetStateAction<string>) => {
    setSearchQuery(val);
    setGoruntulenenAdet(limit);
  };

  const handleHedefDilChange = (dilKod: string) => {
    setHedefDil(dilKod);
    setGoruntulenenAdet(limit);
  };

  return (
    <>
      {/* 1. Lehçe & Sözlük Seçimi */}
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
        <select
          value={seciliDosya}
          onChange={(e) => {
            setSeciliDosya(e.target.value);
            setGoruntulenenAdet(limit);
          }}
          style={{
            width: "100%",
            padding: "10px 12px",
            fontSize: `${metinBoyutu * 0.85}px`,
            borderRadius: "8px",
            border: `1px solid ${tema.kenarlik}`,
            backgroundColor: tema.inputArkaPlan,
            color: tema.yaziAna,
            cursor: "pointer",
          }}
        >
          <option value="TUMU">
            {seciliLehce === "TUMU"
              ? "📖 Tüm Sözlüklerde Ara"
              : `📖 Tüm ${seciliLehce === "BATI" ? "Batı" : "Doğu"} Sözlüklerinde Ara`}
          </option>
          {aktifSozlukler?.map((d: DictionaryMeta) => (
            <option key={d.file} value={d.file}>
              {d.title || kaynagiDuzenle(d.file)} ({d.total_words?.toLocaleString("tr-TR") || 0} kelime)
            </option>
          ))}
        </select>
      </fieldset>

      {/* 2. Hedef Dil Filtresi */}
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

      {/* 3. Arama Inputu ve Mod Seçimi */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "12px", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 240px", position: "relative" }}>
          <input
            id="arama-input"
            ref={inputRef}
            type="search"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Kelime veya anlam ara... (Örn: Ӏаб, мафэ, псы)"
            style={{
              width: "100%",
              padding: "12px 40px 12px 16px",
              fontSize: `${metinBoyutu}px`,
              borderRadius: "8px",
              border: `2px solid ${tema.kenarlik}`,
              backgroundColor: tema.inputArkaPlan,
              color: tema.yaziAna,
              outlineColor: KURUMSAL.kirmizi,
              boxSizing: "border-box",
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
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                color: tema.yaziAlt,
                cursor: "pointer",
                fontSize: `${metinBoyutu}px`,
              }}
            >
              ✕
            </button>
          )}
        </div>
        <select
          value={mod}
          onChange={(e) => setMod(e.target.value as AramaModu)}
          style={{
            padding: "12px",
            fontSize: `${metinBoyutu * 0.9}px`,
            borderRadius: "8px",
            border: `2px solid ${tema.kenarlik}`,
            backgroundColor: tema.inputArkaPlan,
            color: tema.yaziAna,
            cursor: "pointer",
          }}
        >
          <option value="baslayan">İle Başlayan</option>
          <option value="icinde">İçinde Geçen</option>
          <option value="tam">Tam Eşleşen</option>
        </select>
      </div>

      {/* 4. Akıllı Klavye */}
      <AkilliKlavye
        inputRef={inputRef}
        sorgu={searchQuery}
        setSorgu={handleSearchChange}
        metinBoyutu={metinBoyutu}
        karanlikMod={karanlikMod}
      />
    </>
  );
}