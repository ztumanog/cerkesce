"use client";

import React, { useEffect, useRef } from "react";
import type { GruplanmisKelime } from "@/types/dictionary";
import type { TemaTipi } from "@/utils/helpers";
import { metneCevir, kaynagiDuzenle } from "@/utils/helpers";

const KURUMSAL_KIRMIZI = "#FF4030";

interface KelimeDetayDrawerProps {
  seciliKelime: GruplanmisKelime;
  kapat: () => void;
  tema: TemaTipi;
  metinBoyutu: number;
}

export default function KelimeDetayDrawer({
  seciliKelime,
  kapat,
  tema,
  metinBoyutu,
}: KelimeDetayDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const kapatBtnRef = useRef<HTMLButtonElement>(null);

  // Eski page.tsx'teki Klavye ve Odak Yönetimi Logic'i
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        kapat();
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

    window.addEventListener("keydown", handleKeyDown);
    setTimeout(() => kapatBtnRef.current?.focus(), 50);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [kapat]);

  // Kaynak listesi (Eski yapıdaki kaynaklar veya anlamlar dizisi)
  const kaynakListesi =
    seciliKelime.kaynaklar && seciliKelime.kaynaklar.length > 0
      ? seciliKelime.kaynaklar
      : seciliKelime.anlamlar || [];

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="drawer-title">
      {/* Karartma Arka Planı (Backdrop) */}
      <div
        onClick={kapat}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(2px)",
          zIndex: 9998,
        }}
      />

      {/* Drawer Sabit Paneli */}
      <div
        ref={drawerRef}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "520px",
          maxWidth: "92%",
          height: "100vh",
          backgroundColor: tema.kartArkaPlan,
          color: tema.yaziAna,
          zIndex: 9999,
          boxShadow: "-4px 0 20px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          padding: "24px",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            borderBottom: `1px solid ${tema.kenarlik}`,
            paddingBottom: "12px",
          }}
        >
          <h2
            id="drawer-title"
            style={{
              margin: 0,
              fontSize: `${metinBoyutu * 1.4}px`,
              color: tema.yaziAna,
              fontWeight: "bold",
            }}
          >
            {metneCevir(seciliKelime.kelime)}
          </h2>
          <button
            ref={kapatBtnRef}
            onClick={kapat}
            aria-label="Detay panelini kapat"
            style={{
              background: "transparent",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              color: tema.yaziAlt,
              padding: "4px 8px",
            }}
          >
            ✕
          </button>
        </div>

        {/* Kaynaklar / Tanımlar Listesi */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
          {kaynakListesi.map((kaynak: any, idx: number) => {
            const dosyaAdi =
              kaynak.kaynak_sozluk || kaynak.file || kaynak.kaynak;

            const tanim = metneCevir(
              kaynak.tanim || kaynak.anlam || kaynak.meaning || kaynak.full_definition_in_html
            );

            return (
              <div
                key={idx}
                style={{
                  padding: "16px",
                  borderRadius: "8px",
                  backgroundColor: tema.inputArkaPlan,
                  border: `1px solid ${tema.kenarlik}`,
                }}
              >
                {dosyaAdi && (
                  <div
                    style={{
                      fontSize: `${metinBoyutu * 0.85}px`,
                      fontWeight: "bold",
                      color: KURUMSAL_KIRMIZI,
                      marginBottom: "6px",
                    }}
                  >
                    📚 {kaynagiDuzenle(metneCevir(dosyaAdi))}
                  </div>
                )}
                
                <div
                  style={{
                    color: tema.yaziAna,
                    fontSize: `${metinBoyutu * 0.95}px`,
                    lineHeight: "1.6",
                  }}
                  dangerouslySetInnerHTML={{ __html: tanim }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}