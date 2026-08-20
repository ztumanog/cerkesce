"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useDictionary } from "@/hooks/useDictionary";
import AkilliKlavye from "../src/components/AkilliKlavye"; 

// Merkezi tipleri çekiyoruz:
import { ExtendedDictionaryItem } from "@/types/dictionary";

// ==========================================
// TİP VE SABİT TANIMLAMALARI
// ==========================================
export type AramaModu = "baslayan" | "icinde" | "tam";

export interface GruplanmisKelime {
  kelime: string;
  dialect?: string;
  kaynaklar: ExtendedDictionaryItem[];
}

interface TemaTipi {
  arkaPlan: string;
  kartArkaPlan: string;
  yaziAna: string;
  yaziAlt: string;
  kenarlik: string;
  inputArkaPlan: string;
}

const LIMIT = 20;

const KURUMSAL = {
  kirmizi: "#FF4030",
  kirmiziKoyu: "#E02E1F",
  kirmiziAcik: "#FFF1F0",
  sari: "#FFC604",
  sariKoyu: "#D9A400",
  sariAcik: "#FFFBEB",
};

const VARSAYILAN_TEMA: TemaTipi = {
  arkaPlan: "#ffffff",
  yaziAna: "#000000",
  yaziAlt: "#64748b",
  kenarlik: "#e2e8f0",
  kartArkaPlan: "#ffffff",
  inputArkaPlan: "#f8fafc",
};

const BATI_SOZLUKLERI: Record<string, string> = {
  "0.Ady-Ady_AIG.json": "Adıgece Açıklamalı Sözlük — Адыгабзэм изэхэф гущı1алъ (2006)",
  "1.Ady-Ady_AP.json": "Adıgece-Rusça Sözlük — Prof. Dr. Mirabil L. Apaşev (2008)",
  "2.Ady-Ara.json": "Adıgece-Arapça Sözlük — Dr. Adel Abdulsalam Lash (2013)",
  "3.Ady-En.json": "Adıgece-İngilizce Sözlük — Адыгэбзэ-инджылыбзэ гущı1алъэ",
  "4.Ady-En_Adam.json": "Adam Shagash Adıgece-İngilizce Sözlük (2020)",
  "7.Ady-Rus_Tharkaho.json": "Tharkaho Adıgece-Rusça Sözlük — Cevdet Tharkaho",
  "8.Ady-Tur_Huvaj.json": "Fahri Huvaj Adıgece-Türkçe Sözlük",
  "9.En-Ady.json": "İngilizce-Adıgece Sözlük",
  "10.En-Ady_Adam.json": "Adam Shagash İngilizce-Adıgece Sözlük (2020)",
  "23.Rus-Ady_Blaghoj.json": "Blaghoj Rusça-Adıgece Sözlük — Prof. Dr. Ramazan Blaghoj (1991)",
  "24.Rus-Ady_UAG.json": "Odezhdeko Rusça-Adıgece Sözlük — U. A. Gethanoko (1960)",
  "25.Rus-Ady_UASP.json": "Rusça-Adıgece Okul Sözlüğü (1991)",
  "29.Tur-Ady_Teshu.json": "Teshu Türkçe-Adıgece Sözlük — Cevdet Tharkaho (1991)",
  "30.Ady-Rus_ThreeVolumes.json": "3 Ciltlik Büyük Adıgece-Rusça Sözlük — Maykop Enstitüsü (2011)",
  "31.Tu-Ady_Hilmi.json": "Açumıj Hilmi Türkçe-Adıgece Sözlük (2013)",
  "33.Ady-Rus-1960.json": "Eski Adıgece-Rusça Açıklamalı Sözlük (1960)",
};

const DOGU_SOZLUKLERI: Record<string, string> = {
  "5.Ady-Rus_Qarden.json": "Kardanov Kabardeyce-Rusça Sözlük — B. M. Kardanov (1957)",
  "6.Ady-Rus_Sherdjes.json": "Sherdjes Aliy Kabardeyce/Adıgece-Rusça Sözlük — Ali İ. Çerkes (1994)",
  "11.En-Kbd-Jonty.json": "Jonty Yamisha İngilizce-Kabardeyce Sözlük",
  "12.En-Kbd-Ziwar.json": "Ziwar Gish İngilizce-Kabardeyce Sözlük",
  "13.Kbd-Ar-Jonty.json": "Jonty Yamisha Kabardeyce-Arapça Sözlük",
  "14.Kbd-En-2-Jonty.json": "Jonty Yamisha Kabardeyce-İngilizce Sözlük v2",
  "15.Kbd-En-Jonty.json": "Jonty Yamisha Kabardeyce-İngilizce Sözlük v1",
  "16.Kbd-En-Ziwar.json": "Ziwar Gish Kabardeyce-İngilizce Sözlük",
  "17.Kbd-En_Amjad.json": "Amjad Jaimoukha Kabardeyce-İngilizce Sözlük (1997)",
  "18.Kbd-Ru&En.json": "Kabardeyce - Rusça & İngilizce Çok Dilli Sözlük",
  "19.Kbd-Ru-2-Jonty.json": "Jonty Yamisha Kabardeyce-Rusça Sözlük v2",
  "20.Kbd-Ru-Jonty.json": "Jonty Yamisha Kabardeyce-Rusça Sözlük v1",
  "21.Kbd-Tu-Jonty.json": "Jonty Yamisha Kabardeyce-Türkçe Sözlük",
  "22.Ru-Kbd-Jonty.json": "Jonty Yamisha Rusça-Kabardeyce Sözlük",
  "26.Tu-Kbd-Jonty.json": "Jonty Yamisha Türkçe-Kabardeyce Sözlük",
  "27.Tur-Ady_Abaze.json": "İbrahim Alhas Abaze Türkçe-Adıgece Sözlük (2005)",
  "28.Tur-Ady_Huvaj.json": "Fahri Huvaj Türkçe-Çerkesçe Sözlük (2007)",
  "32.Rus-Kbd_Nalchik_2013.json": "Nalçik Baskısı Okullar İçin Rusça-Kabardeyce Sözlük (2013)",
};

const KAYNAK_HARITASI: Record<string, string> = { ...BATI_SOZLUKLERI, ...DOGU_SOZLUKLERI };

const TUR_MAP: Record<string, string> = {
  verb: "Fiil",
  noun: "İsim",
  adjective: "Sıfat",
  adverb: "Zarf",
  "auxiliary verb": "Yardımcı Fiil",
  auxiliary: "Yardımcı Fiil",
  suffix: "Ek",
  "verbal suffix": "Fiil Eki",
  prefix: "Önek",
  preposition: "Edat",
  conjunction: "Bağlaç",
  pronoun: "Zamir",
};

const normalizeText = (text: string) =>
  text
    .normalize("NFC")
    .toLocaleLowerCase("tr")
    .replace(/[^\p{L}\p{N}]/gu, "")
    .trim();

const tanimlariBicimlendir = (
  tanim: string,
  tema: TemaTipi = VARSAYILAN_TEMA,
  gecerliBaslikOrBoyut?: string | number,
  metinBoyutuParam?: number,
  kaynakParam?: string
) => {
  if (!tanim) return null;

  const gecerliTema = tema || VARSAYILAN_TEMA;
  let gecerliBaslik = "";
  let metinBoyutu = 16;

  if (typeof gecerliBaslikOrBoyut === "number") {
    metinBoyutu = gecerliBaslikOrBoyut;
  } else if (typeof gecerliBaslikOrBoyut === "string") {
    gecerliBaslik = gecerliBaslikOrBoyut;
    if (typeof metinBoyutuParam === "number") {
      metinBoyutu = metinBoyutuParam;
    }
  }

  const temizBaslik = gecerliBaslik ? normalizeText(gecerliBaslik) : "";
  const satirListesi: string[] = tanim.split("\n");
  const anlamlar: string[] = [];
  const benzersizAnlamlar = new Set<string>();
  let turBilgisi: string = "";
  let kaynakBilgisi: string = kaynakParam || "";

  const kirilVarMi = /[\u0400-\u04FF]/.test(tanim);

  for (const satir of satirListesi) {
    let temiz = satir.trim();
    if (!temiz) continue;

    if (/^definitions:?$/i.test(temiz)) continue;

    const typeMatch = temiz.match(/^type:\s*(.*)$/i);
    if (typeMatch) {
      const hamTur = typeMatch[1].trim();
      turBilgisi = TUR_MAP[hamTur.toLowerCase()] || hamTur;
      continue;
    }

    const sourceMatch = temiz.match(/^(?:source|kaynak):\s*(.*)$/i);
    if (sourceMatch) {
      kaynakBilgisi = sourceMatch[1].trim();
      continue;
    }

    temiz = temiz.replace(/^[\s•*\-\d\.\)]+/, "").trim();
    temiz = temiz.replace(/\s*\(.*?\)/g, "").trim();

    if (!temiz) continue;

    if (temizBaslik && normalizeText(temiz) === temizBaslik) continue;
    if (!temizBaslik && kirilVarMi && /^[a-zA-Z\s\-\'\"]+$/.test(temiz)) continue;

    if (!benzersizAnlamlar.has(temiz)) {
      benzersizAnlamlar.add(temiz);
      anlamlar.push(temiz);
    }
  }

  return (
    <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
      {anlamlar.length > 0 && (
        <div>
          <h4 style={{ fontSize: `${metinBoyutu * 0.85}px`, fontWeight: 600, color: gecerliTema.yaziAlt, margin: "0 0 6px 0" }}>
            📖 Karşılıklar
          </h4>
          {anlamlar.map((anlam: string, idx: number) => (
            <div key={idx} style={{ color: gecerliTema.yaziAna, fontSize: `${metinBoyutu * 0.95}px`, lineHeight: "1.6", marginBottom: "4px", paddingLeft: "2px" }}>
              • {anlam}
            </div>
          ))}
        </div>
      )}

      {Boolean(turBilgisi) && (
        <div style={{ paddingTop: "8px", borderTop: `1px solid ${gecerliTema.kenarlik}`, fontSize: `${metinBoyutu * 0.85}px`, color: gecerliTema.yaziAlt, fontWeight: 500 }}>
          🏷 Tür: <span style={{ color: gecerliTema.yaziAna, fontWeight: 600 }}>{turBilgisi}</span>
        </div>
      )}

      {Boolean(kaynakBilgisi) && (
        <div style={{ paddingTop: turBilgisi ? "4px" : "8px", borderTop: turBilgisi ? "none" : `1px solid ${gecerliTema.kenarlik}`, fontSize: `${metinBoyutu * 0.8}px`, color: gecerliTema.yaziAlt, fontStyle: "italic" }}>
          📚 Kaynak: <span style={{ fontWeight: 500 }}>{kaynakBilgisi}</span>
        </div>
      )}
    </div>
  );
};

export default function Home() {
  const {
    wordsCount,
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
  } = useDictionary();

  const [mod, setMod] = useState<AramaModu>("baslayan");
  const [hedefDil, setHedefDil] = useState<string>("tumu");
  const [goruntulenenAdet, setGoruntulenenAdet] = useState<number>(LIMIT);
  const [karanlikMod, setKaranlikMod] = useState<boolean>(false);
  const [metinBoyutu, setMetinBoyutu] = useState<number>(16);
  const [kopyalandiId, setKopyalandiId] = useState<string | null>(null);
  const [duyuruMetni, setDuyuruMetni] = useState<string>("");

  const [seciliKelimeGrubu, setSeciliKelimeGrubu] = useState<GruplanmisKelime | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const drawerKapatBtnRef = useRef<HTMLButtonElement>(null);
  const sonOdaklanilanElemanRef = useRef<HTMLElement | null>(null);

  const ozelKarakterler = ["Ӏ", "I", "а", "э", "гь", "кь"];

  useEffect(() => {
    const kayitliKaranlik = localStorage.getItem("darkMode");
    if (kayitliKaranlik) {
      setKaranlikMod(JSON.parse(kayitliKaranlik));
    }
  }, []);

  const toggleKaranlikMod = () => {
    setKaranlikMod((prev) => {
      const yeniDurum = !prev;
      localStorage.setItem("darkMode", JSON.stringify(yeniDurum));
      setDuyuruMetni(yeniDurum ? "Karanlık tema açıldı." : "Aydınlık tema açıldı.");
      return yeniDurum;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!seciliKelimeGrubu) return;
      if (e.key === "Escape") {
        setSeciliKelimeGrubu(null);
        return;
      }
      if (e.key === "Tab" && drawerRef.current) {
        const odaklanabilir = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (odaklanabilir.length === 0) return;
        const ilk = odaklanabilir[0];
        const son = odaklanabilir[odaklanabilir.length - 1];

        if (e.shiftKey && document.activeElement === ilk) {
          e.preventDefault();
          son.focus();
        } else if (!e.shiftKey && document.activeElement === son) {
          e.preventDefault();
          ilk.focus();
        }
      }
    };

    if (seciliKelimeGrubu) {
      sonOdaklanilanElemanRef.current = document.activeElement as HTMLElement;
      window.addEventListener("keydown", handleKeyDown);
      setTimeout(() => drawerKapatBtnRef.current?.focus(), 50);
    } else {
      sonOdaklanilanElemanRef.current?.focus();
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [seciliKelimeGrubu]);

  const kaynagiDuzenle = useCallback((dosyaAdi?: string) => {
    if (!dosyaAdi) return "";
    return KAYNAK_HARITASI[dosyaAdi] || dosyaAdi;
  }, []);

  const hedefDilBul = useCallback((dosyaAdi?: string) => {
    if (!dosyaAdi) return "diger";
    const isim = dosyaAdi.toLowerCase();
    if (isim.includes("tur") || isim.includes("tu-")) return "tr";
    if (isim.includes("ara") || isim.includes("-ar")) return "ar";
    if (isim.includes("en") || isim.includes("kbd-en")) return "en";
    if (isim.includes("rus") || isim.includes("ru-")) return "ru";
    return "diger";
  }, []);

  // 🎯 0 KAYIT ENGELİ KALDIRILDI:
const gruplanmisSonuclar = useMemo(() => {
    const gruplar = new Map<string, ExtendedDictionaryItem[]>();

    filtrelenmisSonuclar.forEach((item) => {
      const kelimeKey = item.kelime?.trim().toLowerCase();
      if (!kelimeKey) return;

      if (!gruplar.has(kelimeKey)) {
        gruplar.set(kelimeKey, []);
      }
      gruplar.get(kelimeKey)!.push(item);
    });

    return Array.from(gruplar.values()).map((kaynaklar: ExtendedDictionaryItem[]) => ({
      kelime: kaynaklar[0].kelime,
      kaynaklar: kaynaklar,
    }));
  }, [filtrelenmisSonuclar, searchQuery, mod, hedefDil, hedefDilBul]);
  const handleSearchChange: React.Dispatch<React.SetStateAction<string>> = (val) => {
    setSearchQuery(val);
    setGoruntulenenAdet(LIMIT);
  };

  const harfEkle = (harf: string) => {
    handleSearchChange(searchQuery + harf);
    setDuyuruMetni(`${harf} harfi eklendi.`);
    inputRef.current?.focus();
  };

  const panoyaKopyala = async (kelime: string, tanim?: string, id?: string) => {
    const metin = `${kelime}\n${tanim || ""}`;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(metin);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = metin;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      if (id) setKopyalandiId(id);
      setDuyuruMetni(`${kelime} kelimesi panoya kopyalandı.`);
      setTimeout(() => setKopyalandiId(null), 2000);
    } catch (err) {
      console.warn("Pano kopyalama engellendi:", err);
      setDuyuruMetni("Kopyalama başarısız oldu.");
    }
  };

  const benzerKelimeler = useMemo<string[]>(() => {
    if (!seciliKelimeGrubu || !seciliKelimeGrubu.kelime || !filtrelenmisSonuclar) return [];
    const kok = seciliKelimeGrubu.kelime.slice(0, 3).toLowerCase();
    if (!kok) return [];

    const eslesenler = (filtrelenmisSonuclar as ExtendedDictionaryItem[])
      .filter(
        (w: ExtendedDictionaryItem) =>
          w.kelime?.toLowerCase().startsWith(kok) &&
          w.kelime?.toLowerCase() !== seciliKelimeGrubu.kelime.toLowerCase()
      )
      .map((w: ExtendedDictionaryItem) => w.kelime as string);

    return Array.from(new Set<string>(eslesenler)).slice(0, 8);
  }, [seciliKelimeGrubu, filtrelenmisSonuclar]);

  const tema: TemaTipi = {
    arkaPlan: karanlikMod ? "#0c0f17" : "#f8fafc",
    kartArkaPlan: karanlikMod ? "#141a29" : "#ffffff",
    yaziAna: karanlikMod ? "#f8fafc" : "#0f172a",
    yaziAlt: karanlikMod ? "#cbd5e1" : "#334155",
    kenarlik: karanlikMod ? "#334155" : "#cbd5e1",
    inputArkaPlan: karanlikMod ? "#1a2236" : "#ffffff",
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif", color: "#64748b" }}>
        📖 Sözlük veritabanı yükleniyor...
      </div>
    );
  }

  const gosterilenGruplar = gruplanmisSonuclar.slice(0, goruntulenenAdet);
  const dahaFazlaVar = gruplanmisSonuclar.length > goruntulenenAdet;

  return (
    <div style={{ backgroundColor: tema.arkaPlan, minHeight: "100vh", padding: "24px 16px", transition: "background-color 0.2s" }}>
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}
      >
        {duyuruMetni}
      </div>

      <main style={{ maxWidth: "840px", margin: "0 auto", fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px", borderBottom: `2px solid ${KURUMSAL.sari}`, paddingBottom: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img
              src="/logo/logo.png"
              alt="Açık Mektep Logosu"
              style={{ width: "42px", height: "42px", objectFit: "contain", borderRadius: "8px" }}
              onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
            />
            <div>
              <span style={{ fontSize: `${metinBoyutu * 0.75}px`, fontWeight: "bold", color: KURUMSAL.kirmizi, textTransform: "uppercase", letterSpacing: "0.08em", display: "block" }}>
                Açık Mektep
              </span>
              <h1 style={{ color: tema.yaziAna, margin: 0, fontSize: `${metinBoyutu * 1.5}px` }}>
                📖 Çerkesçe Sözlük
              </h1>
            </div>
          </div>

          <div style={{ display: "flex", gap: "8px", alignItems: "center" }} role="toolbar" aria-label="Görünüm kontrolleri">
            <button
              onClick={() => setMetinBoyutu((p) => { const yeni = Math.max(14, p - 2); setDuyuruMetni(`Yazı boyutu küçültüldü: ${yeni} piksel`); return yeni; })}
              aria-label="Yazı boyutunu küçült"
              style={{ padding: "8px 12px", borderRadius: "6px", border: `1px solid ${tema.kenarlik}`, backgroundColor: tema.kartArkaPlan, color: tema.yaziAna, cursor: "pointer", fontWeight: "bold" }}
            >
              A-
            </button>
            <button
              onClick={() => setMetinBoyutu((p) => { const yeni = Math.min(24, p + 2); setDuyuruMetni(`Yazı boyutu büyütüldü: ${yeni} piksel`); return yeni; })}
              aria-label="Yazı boyutunu büyüt"
              style={{ padding: "8px 12px", borderRadius: "6px", border: `1px solid ${tema.kenarlik}`, backgroundColor: tema.kartArkaPlan, color: tema.yaziAna, cursor: "pointer", fontWeight: "bold" }}
            >
              A+
            </button>
            <button
              onClick={toggleKaranlikMod}
              aria-pressed={karanlikMod}
              aria-label="Karanlık Temayı Aç/Kapat"
              style={{ padding: "8px 14px", borderRadius: "6px", border: `1px solid ${tema.kenarlik}`, backgroundColor: tema.kartArkaPlan, color: tema.yaziAna, cursor: "pointer" }}
            >
              {karanlikMod ? "☀️ Aydınlık" : "🌙 Karanlık"}
            </button>
          </div>
        </header>

        <p style={{ color: tema.yaziAlt, fontSize: `${metinBoyutu * 0.9}px`, marginBottom: "20px" }}>
          📚 {aktifSozlukler?.length || 33} sözlük &bull; 📖 {(wordsCount ?? 0).toLocaleString("tr-TR")}+ kayıt &bull;{" "}
          <strong style={{ color: KURUMSAL.kirmizi }}>Açık Mektep Dijital Sözlük Ekosistemi</strong>
        </p>

        {!searchQuery.trim() && gununKelimesi && (
          <div
            onClick={() => setSeciliKelimeGrubu({ kelime: gununKelimesi.kelime || "", dialect: gununKelimesi.dialect as "BATI" | "DOGU" | undefined, kaynaklar: [gununKelimesi as ExtendedDictionaryItem] })}
            style={{ padding: "16px 20px", backgroundColor: karanlikMod ? "#1e293b" : "#FFF1F0", borderLeft: `5px solid ${KURUMSAL.kirmizi}`, borderRadius: "8px", marginBottom: "20px", boxShadow: "0 2px 6px rgba(0,0,0,0.05)", cursor: "pointer", textAlign: "left" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: KURUMSAL.kirmizi, fontWeight: "bold", fontSize: `${metinBoyutu * 0.85}px`, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                🌟 Günün Kelimesi
              </span>
              {gununKelimesi.dialect && (
                <span style={{ fontSize: `${metinBoyutu * 0.75}px`, fontWeight: "bold", color: gununKelimesi.dialect === "BATI" ? "#16a34a" : "#2563eb", backgroundColor: gununKelimesi.dialect === "BATI" ? "#16a34a15" : "#2563eb15", padding: "3px 8px", borderRadius: "12px" }}>
                  {gununKelimesi.dialect === "BATI" ? "Batı Adıgece" : "Doğu Kabardeyce"}
                </span>
              )}
            </div>
            <div style={{ fontSize: `${metinBoyutu * 1.25}px`, fontWeight: "bold", color: tema.yaziAna, marginTop: "4px" }}>
              {gununKelimesi.kelime}
            </div>
            {tanimlariBicimlendir(gununKelimesi.tanim, tema, gununKelimesi.kelime, metinBoyutu, kaynagiDuzenle(gununKelimesi.kaynak_sozluk))}
          </div>
        )}

        <fieldset style={{ border: "none", padding: 0, margin: "0 0 16px 0" }}>
          <legend style={{ fontSize: `${metinBoyutu * 0.85}px`, fontWeight: "600", color: tema.yaziAlt, marginBottom: "8px" }}>
            Lehçe & Sözlük Seçimi:
          </legend>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "10px" }}>
            {[
              { kod: "TUMU", etiket: "🌐 Tüm Lehçeler" },
              { kod: "BATI", etiket: "🟢 Batı Adıgece" },
              { kod: "DOGU", etiket: "🔵 Doğu Kabardeyce" },
            ].map((lehce) => (
              <button
                key={lehce.kod}
                onClick={() => { setSeciliLehce(lehce.kod as "TUMU" | "BATI" | "DOGU"); setSeciliDosya("TUMU"); }}
                aria-pressed={seciliLehce === lehce.kod}
                style={{ padding: "8px 14px", fontSize: `${metinBoyutu * 0.85}px`, fontWeight: seciliLehce === lehce.kod ? "bold" : "normal", borderRadius: "20px", border: `2px solid ${seciliLehce === lehce.kod ? KURUMSAL.kirmizi : tema.kenarlik}`, backgroundColor: seciliLehce === lehce.kod ? KURUMSAL.kirmizi : tema.kartArkaPlan, color: seciliLehce === lehce.kod ? "#ffffff" : tema.yaziAna, cursor: "pointer" }}
              >
                {lehce.etiket}
              </button>
            ))}
          </div>

          <select
            value={seciliDosya}
            onChange={(e) => { setSeciliDosya(e.target.value); setGoruntulenenAdet(LIMIT); }}
            style={{ width: "100%", padding: "10px 12px", fontSize: `${metinBoyutu * 0.85}px`, borderRadius: "8px", border: `1px solid ${tema.kenarlik}`, backgroundColor: tema.inputArkaPlan, color: tema.yaziAna, cursor: "pointer" }}
          >
            <option value="TUMU">
              {seciliLehce === "TUMU" ? "📖 Tüm Sözlüklerde Ara" : `📖 Tüm ${seciliLehce === "BATI" ? "Batı" : "Doğu"} Sözlüklerinde Ara`}
            </option>
            {aktifSozlukler?.map((d: any) => (
              <option key={d.file} value={d.file}>
                {d.title || kaynagiDuzenle(d.file)} ({d.total_words?.toLocaleString("tr-TR") || 0} kelime)
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset style={{ border: "none", padding: 0, margin: "0 0 16px 0" }}>
          <legend style={{ fontSize: `${metinBoyutu * 0.85}px`, fontWeight: "600", color: tema.yaziAlt, marginBottom: "8px" }}>Hedef Dil Filtresi:</legend>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {[
              { kod: "tumu", etiket: "🌐 Tümü" }, { kod: "tr", etiket: "🇹🇷 Türkçe" },
              { kod: "ar", etiket: "🇸🇦 Arapça" }, { kod: "en", etiket: "🇬🇧 İngilizce" }, { kod: "ru", etiket: "🇷🇺 Rusça" },
            ].map((dil) => (
              <button
                key={dil.kod} onClick={() => setHedefDil(dil.kod)} aria-pressed={hedefDil === dil.kod}
                style={{ padding: "6px 12px", fontSize: `${metinBoyutu * 0.8}px`, fontWeight: hedefDil === dil.kod ? "bold" : "normal", borderRadius: "16px", border: `1px solid ${hedefDil === dil.kod ? KURUMSAL.kirmizi : tema.kenarlik}`, backgroundColor: hedefDil === dil.kod ? KURUMSAL.kirmizi : tema.kartArkaPlan, color: hedefDil === dil.kod ? "#ffffff" : tema.yaziAna, cursor: "pointer" }}
              >
                {dil.etiket}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset style={{ border: "none", padding: 0, margin: "0 0 16px 0" }}>
          <legend style={{ fontSize: `${metinBoyutu * 0.85}px`, fontWeight: "600", color: tema.yaziAlt, marginBottom: "8px" }}>Çerkesçe Hızlı Harfler:</legend>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {ozelKarakterler.map((harf, index) => (
              <button key={index} onClick={() => harfEkle(harf)} style={{ padding: "8px 16px", fontSize: `${metinBoyutu}px`, fontWeight: "bold", borderRadius: "6px", border: `1px solid ${tema.kenarlik}`, backgroundColor: tema.kartArkaPlan, color: tema.yaziAna, cursor: "pointer" }}>{harf}</button>
            ))}
          </div>
        </fieldset>

        <AkilliKlavye inputRef={inputRef} sorgu={searchQuery} setSorgu={handleSearchChange} metinBoyutu={metinBoyutu} karanlikMod={karanlikMod} />

        <div style={{ display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 240px", position: "relative" }}>
            <input
              id="arama-input" ref={inputRef} type="search" value={searchQuery} onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Kelime veya anlam ara... (Örn: Ӏаб, мафэ, псы)"
              style={{ width: "100%", padding: "12px 40px 12px 16px", fontSize: `${metinBoyutu}px`, borderRadius: "8px", border: `2px solid ${tema.kenarlik}`, backgroundColor: tema.inputArkaPlan, color: tema.yaziAna, outlineColor: KURUMSAL.kirmizi, boxSizing: "border-box" }}
            />
            {searchQuery && (
              <button onClick={() => { handleSearchChange(""); inputRef.current?.focus(); }} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "transparent", border: "none", color: tema.yaziAlt, cursor: "pointer", fontSize: `${metinBoyutu}px` }}>✕</button>
            )}
          </div>

          <select value={mod} onChange={(e) => setMod(e.target.value as AramaModu)} style={{ padding: "12px", fontSize: `${metinBoyutu * 0.9}px`, borderRadius: "8px", border: `2px solid ${tema.kenarlik}`, backgroundColor: tema.inputArkaPlan, color: tema.yaziAna, cursor: "pointer" }}>
            <option value="baslayan">İle Başlayan</option>
            <option value="icinde">İçinde Geçen</option>
            <option value="tam">Tam Eşleşen</option>
          </select>
        </div>

        <p style={{ color: tema.yaziAlt, fontSize: `${metinBoyutu * 0.9}px`, marginBottom: "16px" }} role="status">
          Toplam <strong>{gruplanmisSonuclar.length}</strong> kelime grubu bulundu.
        </p>

        <section aria-label="Arama Sonuçları">
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {gosterilenGruplar.map((g, idx) => (
              <div
                key={idx}
                onClick={() => setSeciliKelimeGrubu(g)}
                style={{ padding: "16px", backgroundColor: tema.kartArkaPlan, border: `1px solid ${tema.kenarlik}`, borderRadius: "8px", cursor: "pointer" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ margin: 0, fontSize: `${metinBoyutu * 1.1}px`, color: tema.yaziAna }}>{g.kelime}</h3>
                  <button
                    onClick={(e) => { e.stopPropagation(); panoyaKopyala(g.kelime, g.kaynaklar[0]?.tanim, `g-${idx}`); }}
                    style={{ padding: "4px 8px", fontSize: "12px", border: `1px solid ${tema.kenarlik}`, backgroundColor: "transparent", color: tema.yaziAlt, borderRadius: "4px", cursor: "pointer" }}
                  >
                    {kopyalandiId === `g-${idx}` ? "✓ Kopyalandı" : "📋 Kopyala"}
                  </button>
                </div>
                {tanimlariBicimlendir(g.kaynaklar[0]?.tanim, tema, g.kelime, metinBoyutu, kaynagiDuzenle(g.kaynaklar[0]?.file || g.kaynaklar[0]?.kaynak_sozluk))}
              </div>
            ))}
          </div>

          {dahaFazlaVar && (
            <button
              onClick={() => setGoruntulenenAdet((prev) => prev + LIMIT)}
              style={{ marginTop: "20px", width: "100%", padding: "12px", backgroundColor: KURUMSAL.kirmizi, color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}
            >
              Daha Fazla Göster ({gruplanmisSonuclar.length - goruntulenenAdet} kalan)
            </button>
          )}
        </section>

        {/* Detay Çekmecesi (Drawer Modal) */}
        {seciliKelimeGrubu && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "flex-end",
              zIndex: 1000,
            }}
            onClick={() => setSeciliKelimeGrubu(null)}
          >
            <div
              ref={drawerRef}
              style={{
                width: "100%",
                maxWidth: "480px",
                backgroundColor: tema.kartArkaPlan,
                height: "100%",
                padding: "24px",
                overflowY: "auto",
                boxShadow: "-4px 0 16px rgba(0,0,0,0.15)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h2 style={{ color: tema.yaziAna, margin: 0, fontSize: `${metinBoyutu * 1.3}px` }}>{seciliKelimeGrubu.kelime}</h2>
                <button
                  ref={drawerKapatBtnRef}
                  onClick={() => setSeciliKelimeGrubu(null)}
                  style={{ padding: "8px 12px", border: `1px solid ${tema.kenarlik}`, borderRadius: "6px", backgroundColor: "transparent", color: tema.yaziAna, cursor: "pointer" }}
                >
                  ✕
                </button>
              </div>

              {seciliKelimeGrubu.kaynaklar.map((item, index) => (
                <div key={index} style={{ marginBottom: "20px", paddingBottom: "16px", borderBottom: `1px solid ${tema.kenarlik}` }}>
                  {tanimlariBicimlendir(item.tanim, tema, seciliKelimeGrubu.kelime, metinBoyutu, kaynagiDuzenle(item.file || item.kaynak_sozluk))}
                </div>
              ))}

              {benzerKelimeler.length > 0 && (
                <div style={{ marginTop: "24px" }}>
                  <h4 style={{ color: tema.yaziAlt, marginBottom: "8px", fontSize: `${metinBoyutu * 0.9}px` }}>Benzer Kelimeler</h4>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {benzerKelimeler.map((bKelime, bIdx) => (
                      <button
                        key={bIdx}
                        onClick={() => { setSearchQuery(bKelime); setSeciliKelimeGrubu(null); }}
                        style={{ padding: "6px 10px", border: `1px solid ${tema.kenarlik}`, borderRadius: "6px", backgroundColor: tema.inputArkaPlan, color: tema.yaziAna, cursor: "pointer", fontSize: `${metinBoyutu * 0.85}px` }}
                      >
                        {bKelime}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}