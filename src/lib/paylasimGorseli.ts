/**
 * @file src/lib/paylasimGorseli.ts
 * @description Canvas API ile kelime kartı görseli oluşturur.
 *              ADR-P4-007: Logo + Tarih + QR kod eklendi.
 */

import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import QRCode from 'qrcode';

export interface PaylasimGorseliOptions {
  kelime: string;
  anlam: string;
  ornekler?: string[];
  lehce?: string;
  boyut?: 'kare' | 'story';
  tarih?: string;
}

const BOYUTLAR = {
  kare: { width: 1080, height: 1080 },
  story: { width: 1080, height: 1920 },
};

/**
 * Resim yükle (URL veya data URL).
 */
function yukleResim(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Canvas ile paylaşım görseli oluşturur.
 */
export async function olusturPaylasimGorseli(
  options: PaylasimGorseliOptions
): Promise<Blob> {
  const boyut = BOYUTLAR[options.boyut || 'kare'];
  const canvas = document.createElement('canvas');
  canvas.width = boyut.width;
  canvas.height = boyut.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context oluşturulamadı');

  // ═══ ARKA PLAN (Indigo gradient) ═══
  const gradient = ctx.createLinearGradient(0, 0, 0, boyut.height);
  gradient.addColorStop(0, '#6366f1');
  gradient.addColorStop(1, '#4338ca');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, boyut.width, boyut.height);

  // ═══ DEKORATİF DAİRELER ═══
  ctx.beginPath();
  ctx.arc(boyut.width * 0.85, boyut.height * 0.15, 200, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(boyut.width * 0.1, boyut.height * 0.9, 250, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.fill();

  // ═══ ⭐ LOGO (Sol Üst) ═══
  try {
    const logo = await yukleResim('/icons/icon-192.png');
    const logoBoyut = 80;
    const logoX = 60;
    const logoY = 60;

    ctx.save();
    ctx.beginPath();
    ctx.arc(logoX + logoBoyut / 2, logoY + logoBoyut / 2, logoBoyut / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(logo, logoX, logoY, logoBoyut, logoBoyut);
    ctx.restore();
  } catch {
    // Fallback: "АП" yaz
    ctx.beginPath();
    ctx.arc(100, 100, 40, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fill();
    ctx.fillStyle = '#FCD34D';
    ctx.font = 'bold 36px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('АП', 100, 100);
  }

  // ═══ ⭐ TARİH (Sağ Üst) ═══
  const bugun = new Date();
  const tarihStr =
    options.tarih ||
    bugun.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = '24px Georgia, "Times New Roman", serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillText(tarihStr, boyut.width - 60, 100);

  // ═══ BAŞLIK ═══
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.font = 'bold 32px Georgia, "Times New Roman", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('✨ GÜNÜN KELİMESİ', boyut.width / 2, boyut.height * 0.2);

  // ═══ AYRAÇ ═══
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(boyut.width * 0.2, boyut.height * 0.24);
  ctx.lineTo(boyut.width * 0.8, boyut.height * 0.24);
  ctx.stroke();

  // ═══ KELİME ═══
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 96px Georgia, "Times New Roman", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(options.kelime, boyut.width / 2, boyut.height * 0.36);

  // ═══ ANLAM ═══
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.font = '36px Georgia, "Times New Roman", serif';
  ctx.fillText(options.anlam, boyut.width / 2, boyut.height * 0.46);

  // ═══ LEHÇE BADGE ═══
  if (options.lehce) {
    const lehceText = options.lehce;
    ctx.font = 'bold 20px Georgia, "Times New Roman", serif';
    const textWidth = ctx.measureText(lehceText).width;
    const padding = 20;
    const badgeWidth = textWidth + padding * 2;
    const badgeHeight = 40;
    const badgeX = boyut.width / 2 - badgeWidth / 2;
    const badgeY = boyut.height * 0.53;

    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 20);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(lehceText, boyut.width / 2, badgeY + badgeHeight / 2);
  }

  // ═══ ÖRNEKLER ═══
  if (options.ornekler && options.ornekler.length > 0) {
    const ornekStartY = boyut.height * 0.63;
    const ornekLimit = Math.min(options.ornekler.length, 3);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 22px Georgia, "Times New Roman", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('💬 ÖRNEKLER', boyut.width / 2, ornekStartY);

    ctx.font = '24px Georgia, "Times New Roman", serif';

    for (let i = 0; i < ornekLimit; i++) {
      const ornek = options.ornekler[i];
      const truncated = ornek.length > 45 ? ornek.slice(0, 42) + '...' : ornek;
      const y = ornekStartY + 50 + i * 42;

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(boyut.width * 0.15, y - 10);
      ctx.lineTo(boyut.width * 0.15, y + 15);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.textAlign = 'left';
      ctx.fillText(truncated, boyut.width * 0.18, y);
    }
  }

  // ═══ ⭐ QR KOD (Alt Orta) ═══
  try {
    const qrDataUrl = await QRCode.toDataURL('https://acikmektep.com', {
      width: 180,
      margin: 1,
      color: {
        dark: '#4338ca',
        light: '#ffffff',
      },
    });

    const qr = await yukleResim(qrDataUrl);
    const qrBoyut = 140;
    const qrX = boyut.width / 2 - qrBoyut / 2;
    const qrY = boyut.height * 0.84;

    // QR arka plan (beyaz kare)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.beginPath();
    ctx.roundRect(qrX - 10, qrY - 10, qrBoyut + 20, qrBoyut + 20, 12);
    ctx.fill();

    // QR kod
    ctx.drawImage(qr, qrX, qrY, qrBoyut, qrBoyut);
  } catch (err) {
    console.warn('QR kod oluşturulamadı:', err);
  }

  // ═══ URL ═══
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.font = 'bold 22px Georgia, "Times New Roman", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🔗 acikmektep.com', boyut.width / 2, boyut.height * 0.99);

  // ═══ BLOB ═══
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Blob oluşturulamadı'));
    }, 'image/png');
  });
}

/**
 * Blob'u indir — Android/iOS'ta Filesystem API, web'de <a download> kullanır.
 */
export async function indirBlob(blob: Blob, dosyaAdi: string): Promise<void> {
  if (Capacitor.isNativePlatform()) {
    try {
      const base64 = await blobToBase64(blob);
      const base64Data = base64.split(',')[1];

      await Filesystem.writeFile({
        path: dosyaAdi,
        data: base64Data,
        directory: Directory.Documents,
        recursive: true,
      });

      return;
    } catch (err) {
      console.error('Filesystem yazma hatası:', err);
      throw err;
    }
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = dosyaAdi;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}