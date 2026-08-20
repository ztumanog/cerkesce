'use client';
import React, { useState, useEffect } from 'react';

export type KlavyeDili = 'adiyge' | 'kabardey' | 'tr' | 'ru' | 'en' | 'ar';

interface AkilliKlavyeProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  sorgu: string;
  setSorgu: React.Dispatch<React.SetStateAction<string>>;
  metinBoyutu: number;
  karanlikMod: boolean;
}

const KLAVYE_DUZENLERI: Record<KlavyeDili, { etiket: string; tuslar: string[] }> = {
  adiyge: {
    etiket: '🟢 Adıgece',
    tuslar: ['Ӏ', 'а', 'б', 'в', 'г', 'гу', 'гъ', 'д', 'дж', 'дз', 'е', 'ё', 'ж', 'жъ', 'з', 'и', 'й', 'к', 'къ', 'кӀ', 'л', 'ль', 'м', 'н', 'о', 'п', 'пӀ', 'р', 'с', 'т', 'у', 'ф', 'х', 'хъ', 'ц', 'ч', 'чъ', 'чӀ', 'ш', 'щ', 'ы', 'э', 'ю', 'я']
  },
  kabardey: {
    etiket: '🔵 Kabardeyce',
    tuslar: ['Ӏ', 'къ', 'кӀ', 'пӀ', 'тӀ', 'цӀ', 'чӀ', 'лъ', 'фӀ', 'хь', 'гъ', 'жь', 'щ', 'гу', 'гъu', 'дз', 'дж']
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

export default function AkilliKlavye({ inputRef, sorgu, setSorgu, metinBoyutu, karanlikMod }: AkilliKlavyeProps) {
  const [acik, setAcik] = useState(false);
  const [aktifDil, setAktifDil] = useState<KlavyeDili>('adiyge');

  useEffect(() => {
    const kayitliDil = localStorage.getItem('aktifKlavye') as KlavyeDili;
    if (kayitliDil && KLAVYE_DUZENLERI[kayitliDil]) {
      setAktifDil(kayitliDil);
    }
  }, []);

  const dilDegistir = (dil: KlavyeDili) => {
    setAktifDil(dil);
    localStorage.setItem('aktifKlavye', dil);
  };

  const harfEkle = (harf: string) => {
    const input = inputRef.current;
    if (!input) {
      setSorgu((prev) => prev + harf);
      return;
    }

    const baslangic = input.selectionStart ?? sorgu.length;
    const bitis = input.selectionEnd ?? sorgu.length;

    const yeniMetin = sorgu.substring(0, baslangic) + harf + sorgu.substring(bitis);
    setSorgu(yeniMetin);

    setTimeout(() => {
      input.focus();
      input.setSelectionRange(baslangic + harf.length, baslangic + harf.length);
    }, 0);
  };

  const arkaPlan = karanlikMod ? '#1e293b' : '#ffffff';
  const kenarlik = karanlikMod ? '#475569' : '#cbd5e1';
  const yaziRengi = karanlikMod ? '#f8fafc' : '#0f172a';

  return (
    <div style={{ marginBottom: '16px', textAlign: 'left' }}>
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
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '12px' }}>
            {(Object.keys(KLAVYE_DUZENLERI) as KlavyeDili[]).map((dilKey) => (
              <button
                key={dilKey}
                type="button"
                onClick={() => dilDegistir(dilKey)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '16px',
                  border: `1px solid ${aktifDil === dilKey ? '#2563eb' : kenarlik}`,
                  backgroundColor: aktifDil === dilKey ? '#2563eb' : 'transparent',
                  color: aktifDil === dilKey ? '#ffffff' : yaziRengi,
                  fontSize: `${metinBoyutu * 0.8}px`,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {KLAVYE_DUZENLERI[dilKey].etiket}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {KLAVYE_DUZENLERI[aktifDil].tuslar.map((harf, idx) => (
              <button
                key={idx}
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