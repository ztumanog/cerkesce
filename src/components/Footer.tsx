"use client";

import React from "react";
import { KURUMSAL } from "@/lib/dictionaryConstants";

// Propları opsiyonel (?) yapıyoruz
interface FooterProps {
  tema?: {
    kartArkaPlan?: string;
    yaziAna?: string;
    yaziAlt?: string;
    kenarlik?: string;
    [key: string]: any;
  };
  metinBoyutu?: number;
}

// Varsayılan tema değerleri belirliyoruz
export default function Footer({
  tema = {
    kartArkaPlan: "#ffffff",
    yaziAna: "#111827",
    yaziAlt: "#6b7280",
    kenarlik: "#e5e7eb",
  },
  metinBoyutu = 16,
}: FooterProps) {
  return (
    <footer
      style={{
        marginTop: "auto",
        padding: "24px 16px",
        backgroundColor: tema.kartArkaPlan,
        borderTop: `1px solid ${tema.kenarlik}`,
        color: tema.yaziAna,
        textAlign: "center",
        fontSize: `${metinBoyutu * 0.85}px`,
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <p style={{ margin: "0 0 8px 0", color: tema.yaziAlt }}>
          © {new Date().getFullYear()} Çerkesçe Sözlük. Tüm hakları saklıdır.
        </p>
        <p style={{ margin: 0, fontSize: `${metinBoyutu * 0.75}px`, color: KURUMSAL.kirmizi }}>
          Adıge Dilini Yaşatma ve Geliştirme Projesi
        </p>
      </div>
    </footer>
  );
}