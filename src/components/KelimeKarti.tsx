// @/components/KelimeKarti.tsx
import React from "react";
import Image from "next/image";
import { guvenliTanimAyikla } from "@/lib/DictionaryService";

type KelimeKartiTema = "kirmizi" | "sari";

const kelimeKartiVaryantlari = (tema: KelimeKartiTema = "kirmizi") =>
  `relative flex flex-col p-6 rounded-xl shadow-md transition-all duration-200 border-l-4 ${
    tema === "sari"
      ? "bg-white border-[#FFC604] text-gray-800 hover:shadow-lg"
      : "bg-white border-[#FF4030] text-gray-800 hover:shadow-lg"
  }`;

export interface KelimeKartiProps {
  kelime: string;
  hamVeri: unknown; // 'any' yasaktır, veri servis katmanında ayıklanır
  tema?: KelimeKartiTema;
}

export const KelimeKarti = ({ kelime, hamVeri, tema }: KelimeKartiProps) => {
  // Veri ayıklama hiyerarşisine (definitions -> html -> tanim) göre işlem
  const anlam = guvenliTanimAyikla(hamVeri);

  if (!anlam) return null;

  return (
    <article className={kelimeKartiVaryantlari(tema ?? undefined)}>
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">{kelime}</h2>
        {/* Açık Mektep Logosu */}
        <Image 
          src="/logo.png" 
          alt="Açık Mektep Logosu" 
          width={32} 
          height={32} 
          className="object-contain"
        />
      </header>
      
      <div 
        className="text-lg text-gray-700 mb-6"
        dangerouslySetInnerHTML={{ __html: anlam }} // DOMPurify entegrasyonu varsayımıyla
      />

      {/* Kurumsal İmza Alanı */}
      <footer className="mt-auto pt-4 border-t border-gray-100 flex justify-end">
        <Image 
          src="/imza.png" 
          alt="Kurumsal İmza" 
          width={120} 
          height={40} 
          className="opacity-80"
        />
      </footer>
    </article>
  );
};