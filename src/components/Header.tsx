"use client";

import React from "react";

interface HeaderProps {
  karanlikMod: boolean;
  toggleKaranlikMod: () => void;
  metinBoyutu: number;
  setMetinBoyutu: React.Dispatch<React.SetStateAction<number>>;
  sozlukSayisi?: number;
  kayitSayisi?: number;
  aramaYapildiMi?: boolean;
  tema: {
    yaziAna: string;
    yaziAlt?: string;
    kenarlik: string;
    kartArkaPlan: string;
  };
}

export default function Header({
  karanlikMod,
  toggleKaranlikMod,
  metinBoyutu,
  setMetinBoyutu,
  sozlukSayisi = 34,
  kayitSayisi = 332238,
  aramaYapildiMi = false,
  tema,
}: HeaderProps) {
  // Kaynaklar.tsx Tasarım Renk Tanımları
  const arkaplan = karanlikMod ? "#1F1A17" : "#F4EFE6";
  const solCizgiRenk = "#7A1C1C";
  const etiketRenk = "#7A1C1C";
  const baslikRenk = karanlikMod ? "#FDFBF7" : "#1F1A17";

  return (
    <header
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "24px",
        backgroundColor: arkaplan,
        borderLeft: `4px solid ${solCizgiRenk}`,
        borderTop: `1px solid ${tema.kenarlik}`,
        borderRight: `1px solid ${tema.kenarlik}`,
        borderBottom: `1px solid ${tema.kenarlik}`,
        borderRadius: "2px",
        padding: "24px 28px",
        fontFamily: "'IBM Plex Sans', sans-serif",
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      {/* Üst Kısım: Logo + Başlık + Sağ Kontroller */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          width: "100%",
        }}
      >
        {/* Sol Logo ve Başlık */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img
            src="/logo/logo.png"
            alt="Açık Mektep Logosu"
            style={{
              width: "48px",
              height: "48px",
              objectFit: "contain",
              borderRadius: "4px",
            }}
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
          <div>
            <span
              style={{
                fontSize: "11px",
                fontWeight: "bold",
                color: etiketRenk,
                textTransform: "uppercase",
                letterSpacing: "2.5px",
                display: "block",
                marginBottom: "4px",
              }}
            >
              AÇIK MEKTEP AÇIK ERİŞİM DİL KAYNAKLARI PROJESİ
            </span>
            <h1
              style={{
                color: baslikRenk,
                margin: 0,
                fontSize: `${metinBoyutu * 1.5}px`,
                fontWeight: "600",
                fontFamily: "serif",
                fontStyle: "italic",
                lineHeight: "1.2",
              }}
            >
              Çerkesçe Sözlük
            </h1>
          </div>
        </div>

        {/* Sağ Butonlar (Yazı Boyutu + Tema) */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
          role="toolbar"
          aria-label="Görünüm kontrolleri"
        >
          {/* A- / 16px / A+ Grubu */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: karanlikMod ? "#2C221E" : "#FFFFFF",
              border: `1px solid ${tema.kenarlik}`,
              borderRadius: "3px",
              padding: "2px 4px",
            }}
          >
            <button
              type="button"
              onClick={() => setMetinBoyutu((p) => Math.max(12, p - 2))}
              aria-label="Yazı boyutunu küçült"
              style={{
                padding: "6px 10px",
                border: "none",
                background: "transparent",
                color: tema.yaziAna,
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "13px",
              }}
            >
              A-
            </button>

            <span
              style={{
                fontSize: "12px",
                fontWeight: "600",
                color: tema.yaziAna,
                padding: "0 6px",
                borderLeft: `1px solid ${tema.kenarlik}`,
                borderRight: `1px solid ${tema.kenarlik}`,
                userSelect: "none",
                fontFamily: "monospace",
              }}
            >
              {metinBoyutu}px
            </span>

            <button
              type="button"
              onClick={() => setMetinBoyutu((p) => Math.min(24, p + 2))}
              aria-label="Yazı boyutunu büyüt"
              style={{
                padding: "6px 10px",
                border: "none",
                background: "transparent",
                color: tema.yaziAna,
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "13px",
              }}
            >
              A+
            </button>
          </div>

          {/* Karanlık Mod Butonu */}
          <button
            type="button"
            onClick={toggleKaranlikMod}
            aria-pressed={karanlikMod}
            aria-label="Karanlık Temayı Aç/Kapat"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 12px",
              borderRadius: "3px",
              border: `1px solid ${tema.kenarlik}`,
              backgroundColor: karanlikMod ? "#2C221E" : "#FFFFFF",
              color: tema.yaziAna,
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "13px",
            }}
          >
            {karanlikMod ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>

      {/* Alt Kısım: Genel İstatistik Satırı */}
      <p
        style={{
          margin: "16px 0 0 0",
          fontSize: `${metinBoyutu * 0.85}px`,
          color: karanlikMod ? "#D0C4B8" : "#4A3E37",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        📖 <strong>{sozlukSayisi} Sözlük</strong>
        <span>&bull;</span>
        📚 <strong>{kayitSayisi.toLocaleString("tr-TR")}+ Kelime Kaydı</strong>
        <span>&bull;</span>
        <span style={{ color: etiketRenk, fontWeight: "bold" }}>
          ● Açık Dijital Arşiv
        </span>
      </p>
    </header>
  );
}