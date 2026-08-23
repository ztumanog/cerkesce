'use client';

import React, { useState, useEffect } from 'react';
import { KURUMSAL } from '@/lib/dictionaryConstants';
import { CERKES_OZEL_HARFLER } from '@/constants/alphabet';

export type KlavyeDili = 'cerkes' | 'tr' | 'ru' | 'en' | 'ar';

interface AkilliKlavyeProps {
  inputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  sorgu: string;
  setSorgu: (yeniSorgu: string | ((prev: string) => string)) => void;
  metinBoyutu?: number;
  karanlikMod?: boolean;
}

const KLAVYE_DUZENLERI: Record<KlavyeDili, { etiket: string; tuslar: readonly string[] }> = {
  cerkes: {
    etiket: '🟢 Çerkesçe',
    tuslar: CERKES_OZEL_HARFLER || []
  },
  tr: {
    etiket: '🇹🇷 Türkçe',
    tuslar: ['a', 'b', 'c', 'ç', 'd', 'e', 'f', 'g', 'ğ', 'h', 'ı', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'ö', 'p', 'r', 's', 'ş', 't', 'u', 'ü', 'v', 'y', 'z']
  },
  ru: {
    etiket: '🇷🇺 Русский',
    tuslar: ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я']
  },
  en: {
    etiket: '🇬🇧 English',
    tuslar: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  },
  ar: {
    etiket: '🇸🇦 العربية',
    tuslar: ['أ', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'هـ', 'و', 'ي']
  }
};

export default function AkilliKlavye({ 
  inputRef, 
  sorgu = "", 
  setSorgu, 
  metinBoyutu = 16, 
  karanlikMod = false 
}: AkilliKlavyeProps) {
  const [acik, setAcik] = useState(false);
  const [aktifDil, setAktifDil] = useState<KlavyeDili>('cerkes');

  useEffect(() => {
    try {
      const kayitliDil = localStorage.getItem('aktifKlavye') as KlavyeDili;
      if (kayitliDil && KLAVYE_DUZENLERI[kayitliDil]) {
        setAktifDil(kayitliDil);
      }
    } catch (e) {
      // localStorage engeli varsa es geç
    }
  }, []);

  const dilDegistir = (e: React.MouseEvent, dil: KlavyeDili) => {
    e.preventDefault();
    e.stopPropagation();
    setAktifDil(dil);
    try {
      localStorage.setItem('aktifKlavye', dil);
    } catch (err) {}
  };

  const harfEkle = (harf: string) => {
    const input = inputRef?.current;

    if (input) {
      const baslangic = input.selectionStart ?? input.value.length;
      const bitis = input.selectionEnd ?? input.value.length;
      
      const eskiDeger = input.value || "";
      const yeniDeger = eskiDeger.substring(0, baslangic) + harf + eskiDeger.substring(bitis);
      
      const proto = input instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
      
      if (nativeInputValueSetter) {
        nativeInputValueSetter.call(input, yeniDeger);
      } else {
        input.value = yeniDeger;
      }

      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));

      setSorgu(yeniDeger);

      setTimeout(() => {
        input.focus();
        input.setSelectionRange(baslangic + harf.length, baslangic + harf.length);
      }, 0);
    } else {
      setSorgu((prev) => (prev || "") + harf);
    }
  };

  const kirmiziRenk = KURUMSAL?.kirmizi || '#FF4030';
  const arkaPlan = karanlikMod ? '#1e293b' : '#ffffff';
  const kenarlik = karanlikMod ? '#475569' : '#cbd5e1';
  const yaziRengi = karanlikMod ? '#f8fafc' : '#0f172a';

  const mevcutTuslar = KLAVYE_DUZENLERI[aktifDil]?.tuslar || [];

  return (
    <div style={{ position: 'relative', width: '100%', marginBottom: '16px', textAlign: 'left', zIndex: 40 }}>
      <button
        type="button"
        onClick={() => setAcik((prev) => !prev)}
        aria-expanded={acik}
        aria-label="Sanal Klavyeyi Aç veya Kapat"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          borderRadius: '6px',
          border: `1px solid ${kenarlik}`,
          backgroundColor: arkaPlan,
          color: yaziRengi,
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: `${metinBoyutu * 0.85}px`
        }}
      >
        ⌨️ {acik ? 'Klavyeyi Gizle' : 'Akıllı Klavye'}
      </button>

      {acik && (
        <div
          style={{
            marginTop: '10px',
            padding: '16px',
            borderRadius: '8px',
            border: `1px solid ${kenarlik}`,
            backgroundColor: arkaPlan,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          {/* Dil Sekmeleri */}
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '12px' }}>
            {(Object.keys(KLAVYE_DUZENLERI) as KlavyeDili[]).map((dilKey) => {
              const isSelected = aktifDil === dilKey;
              return (
                <button
                  key={dilKey}
                  type="button"
                  onClick={(e) => dilDegistir(e, dilKey)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '16px',
                    border: `1px solid ${isSelected ? kirmiziRenk : kenarlik}`,
                    backgroundColor: isSelected ? kirmiziRenk : (karanlikMod ? '#0f172a' : '#f8fafc'),
                    color: isSelected ? '#ffffff' : yaziRengi,
                    fontSize: `${metinBoyutu * 0.8}px`,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    fontWeight: isSelected ? 'bold' : 'normal',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {KLAVYE_DUZENLERI[dilKey].etiket}
                </button>
              );
            })}
          </div>

          {/* Harf Tuşları */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {mevcutTuslar.map((harf, idx) => (
              <button
                key={`${aktifDil}-${harf}-${idx}`}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => harfEkle(harf)}
                style={{
                  padding: '8px 12px',
                  minWidth: '36px',
                  borderRadius: '6px',
                  border: `1px solid ${kenarlik}`,
                  backgroundColor: karanlikMod ? '#334155' : '#f1f5f9',
                  color: yaziRengi,
                  fontSize: `${metinBoyutu * 0.9}px`,
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {harf}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}