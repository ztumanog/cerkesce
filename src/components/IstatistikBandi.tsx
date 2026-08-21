import React from "react";

interface IstatistikBandiProps {
  wordsCount: number;
  sozlukSayisi?: number;
  aktifTema: {
    yaziAna?: string;
    yaziAlt: string;
  };
}

export const IstatistikBandi: React.FC<IstatistikBandiProps> = ({
  wordsCount,
  sozlukSayisi = 34,
  aktifTema,
}) => {
  const yaziAna = aktifTema.yaziAna || "inherit";

  return (
    <div
      style={{
        color: aktifTema.yaziAlt,
        fontSize: "13px",
        textAlign: "center",
        marginTop: "-12px",
        marginBottom: "4px",
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        flexWrap: "wrap",
      }}
    >
      <span>
        <strong style={{ color: yaziAna, fontWeight: 700 }}>{sozlukSayisi} Sözlük</strong>
      </span>

      <span style={{ opacity: 0.35 }}>•</span>

      <span>
        <strong style={{ color: yaziAna, fontWeight: 700 }}>
          {wordsCount.toLocaleString("tr-TR")}+
        </strong>{" "}
        Kelime Kaydı
      </span>

      <span style={{ opacity: 0.35 }}>•</span>

      <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "#10b981",
            display: "inline-block",
          }}
        />
        Açık Dijital Arşiv
      </span>
    </div>
  );
};

export default IstatistikBandi;