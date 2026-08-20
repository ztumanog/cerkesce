import React from "react";

export interface GununKelimesiKartProps {
  gununKelimesi: any;
  karanlikMod: boolean;
  metinBoyutu: number;
  tema: any;
  onSelect: (item: any) => void;
  KURUMSAL?: { kirmizi: string; sari?: string };
  kaynagiDuzenle?: (kaynak: string) => string;
}

export default function GununKelimesiKart({
  gununKelimesi,
  karanlikMod,
  metinBoyutu,
  tema,
  onSelect,
  KURUMSAL = { kirmizi: "#e11d48" },
  kaynagiDuzenle = (val) => val,
}: GununKelimesiKartProps) {
  if (!gununKelimesi) return null;

  return (
    <div
      onClick={() =>
        onSelect({
          kelime: gununKelimesi.kelime,
          dialect: gununKelimesi.dialect,
          kaynaklar: [gununKelimesi],
        })
      }
      style={{
        padding: "16px 20px",
        backgroundColor: karanlikMod ? "#1e293b" : "#FFF1F0",
        borderLeft: `5px solid ${KURUMSAL.kirmizi}`,
        borderRadius: "8px",
        marginBottom: "20px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          style={{
            color: KURUMSAL.kirmizi,
            fontWeight: "bold",
            fontSize: `${metinBoyutu * 0.85}px`,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          🌟 Günün Kelimesi
        </span>
        {gununKelimesi.dialect && (
          <span
            style={{
              fontSize: `${metinBoyutu * 0.75}px`,
              fontWeight: "bold",
              color: gununKelimesi.dialect === "BATI" ? "#16a34a" : "#2563eb",
              backgroundColor: gununKelimesi.dialect === "BATI" ? "#16a34a15" : "#2563eb15",
              padding: "3px 8px",
              borderRadius: "12px",
            }}
          >
            {gununKelimesi.dialect === "BATI" ? "Batı Adıgece" : "Doğu Kabardeyce"}
          </span>
        )}
      </div>
      <div style={{ fontSize: `${metinBoyutu * 1.25}px`, fontWeight: "bold", color: tema.yaziAna, marginTop: "4px" }}>
        {gununKelimesi.kelime}
      </div>
      <div style={{ fontSize: `${metinBoyutu * 0.95}px`, color: tema.yaziAlt, marginTop: "4px", lineHeight: "1.5" }}>
        {gununKelimesi.tanim}
      </div>
      {gununKelimesi.kaynak_sozluk && (
        <small style={{ color: tema.yaziAlt, display: "block", marginTop: "6px", fontSize: "12px" }}>
          📚 Kaynak: {kaynagiDuzenle(gununKelimesi.kaynak_sozluk)}
        </small>
      )}
    </div>
  );
}