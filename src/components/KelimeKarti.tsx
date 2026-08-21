import React from "react";
import { tanimlariBicimlendir, kaynagiDuzenle, type TemaTipi } from "@/utils/helpers";
import { KURUMSAL } from "@/lib/dictionaryConstants";
import { GruplanmisKelime } from "@/types/dictionary";

interface KelimeKartiProps {
  grup: GruplanmisKelime;
  idx: number;
  tema: TemaTipi;
  metinBoyutu: number;
  kopyalandiId: string | null;
  panoyaKopyala: (kelime: string, tanim?: string, id?: string) => void;
  onClick: (grup: GruplanmisKelime) => void;
}

export default function KelimeKarti({
  grup,
  idx,
  tema,
  metinBoyutu,
  kopyalandiId,
  panoyaKopyala,
  onClick
}: KelimeKartiProps) {
  // kaynaklar veya anlamlar dizisinden güvenle ilk elemanı alıyoruz
  const ilkKaynak = grup.kaynaklar?.[0] || grup.anlamlar?.[0];
  const dosyaVeyaSozluk = ilkKaynak?.file || ilkKaynak?.kaynak_sozluk || ilkKaynak?.dictionaryName;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(grup);
    }
  };

  return (
    <div 
      onClick={() => onClick(grup)} 
      onKeyDown={handleKeyDown}
      style={{ 
        padding: "16px", 
        backgroundColor: tema.kartArkaPlan, 
        border: `1px solid ${tema.kenarlik}`, 
        borderRadius: "8px", 
        cursor: "pointer",
        transition: "border-color 0.2s"
      }}
      onMouseOver={(e) => (e.currentTarget.style.borderColor = KURUMSAL.kirmizi)}
      onMouseOut={(e) => (e.currentTarget.style.borderColor = tema.kenarlik)}
      role="article"
      tabIndex={0}
      aria-label={`${grup.kelime} kelimesi detayları`}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0, fontSize: `${metinBoyutu * 1.1}px`, color: tema.yaziAna }}>
          {grup.kelime}
        </h3>
        
        <button 
          onClick={(e) => { 
            e.stopPropagation();
            panoyaKopyala(grup.kelime, ilkKaynak?.tanim, `g-${idx}`); 
          }}
          style={{ 
            padding: "4px 8px", 
            fontSize: "12px", 
            border: `1px solid ${tema.kenarlik}`, 
            backgroundColor: "transparent", 
            color: tema.yaziAlt, 
            borderRadius: "4px", 
            cursor: "pointer",
            fontWeight: kopyalandiId === `g-${idx}` ? "bold" : "normal"
          }}
          aria-label="Kelimeyi ve tanımını kopyala"
        >
          {kopyalandiId === `g-${idx}` ? "✓ Kopyalandı" : "📋 Kopyala"}
        </button>
      </div>
      
      {tanimlariBicimlendir(
        ilkKaynak?.tanim || "", 
        tema, 
        grup.kelime, 
        metinBoyutu, 
        kaynagiDuzenle(dosyaVeyaSozluk)
      )}
    </div>
  );
}