"use client";

import React from "react";

interface HeaderProps {
  karanlikMod: boolean;
  toggleKaranlikMod: () => void;
  metinBoyutu: number;
  setMetinBoyutu: React.Dispatch<React.SetStateAction<number>>;
  tema: {
    yaziAna: string;
    kenarlik: string;
    kartArkaPlan: string;
  };
}

export default function Header({
  karanlikMod,
  toggleKaranlikMod,
  metinBoyutu,
  setMetinBoyutu,
  tema,
}: HeaderProps) {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px",
        flexWrap: "wrap",
        gap: "12px",
        borderBottom: "2px solid #FFC604",
        paddingBottom: "14px",
      }}
    >
      {/* Sol Logo ve Başlık */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <img
          src="/logo/logo.png"
          alt="Açık Mektep Logosu"
          style={{
            width: "42px",
            height: "42px",
            objectFit: "contain",
            borderRadius: "8px",
          }}
          onError={(e) => {
            (e.target as HTMLElement).style.display = "none";
          }}
        />
        <div>
          <span
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              color: "#FF4030",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              display: "block",
            }}
          >
            Açık Mektep
          </span>
          <h1
            style={{
              color: tema.yaziAna,
              margin: 0,
              fontSize: `${metinBoyutu * 1.3}px`,
              fontWeight: "bold",
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
            backgroundColor: tema.kartArkaPlan,
            border: `1px solid ${tema.kenarlik}`,
            borderRadius: "8px",
            padding: "2px 4px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
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
              fontSize: "14px",
            }}
          >
            A-
          </button>
          
          <span
            style={{
              fontSize: "13px",
              fontWeight: "600",
              color: tema.yaziAna,
              padding: "0 6px",
              borderLeft: `1px solid ${tema.kenarlik}`,
              borderRight: `1px solid ${tema.kenarlik}`,
              userSelect: "none",
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
              fontSize: "14px",
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
            borderRadius: "8px",
            border: `1px solid ${tema.kenarlik}`,
            backgroundColor: tema.kartArkaPlan,
            color: tema.yaziAna,
            cursor: "pointer",
            fontWeight: "500",
            fontSize: "14px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          {karanlikMod ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}