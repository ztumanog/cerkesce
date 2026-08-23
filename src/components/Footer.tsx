import React from "react";

interface FooterProps {
  aktifTema: any;
  onKaynaklarAc: () => void;
}

export default function Footer({ aktifTema, onKaynaklarAc }: FooterProps) {
  return (
    <footer
      style={{
        marginTop: "1px", // 16px yerine 4px'e düşürüldü
        paddingTop: "3px", // 14px yerine 6px'e düşürüldü
        paddingBottom: "8px",
        borderTop: `1px solid ${aktifTema?.kenarlik || "#E2D7C3"}`,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "11px",
        color: "#8C7A6B",
        textTransform: "uppercase",
        letterSpacing: "1px"
      }}
    >
      <div>
        Açık Mektep Dijital Yayıncılık — Çerkesçe Dil Korpusu
      </div>
      <div>
        <button
          onClick={onKaynaklarAc}
          style={{
            background: "none",
            border: "none",
            color: "#7A1C1C",
            cursor: "pointer",
            padding: 0,
            fontSize: "11px",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}
        >
          Kaynaklar ve Referanslar →
        </button>
      </div>
    </footer>
  );
}