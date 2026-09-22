/**
 * @file src/lib/paylasimGorseli.ts
 * @description Canvas API ile kelime kartı görseli oluşturur.
 */

export interface PaylasimGorseliOptions {
  kelime: string;
  anlam: string;
  ornekler?: string[];
  lehce?: string;
  boyut?: 'kare' | 'story';
}

const BOYUTLAR = {
  kare: { width: 1080, height: 1080 },
  story: { width: 1080, height: 1920 },
};

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

  // ═══ DEKORATİF DAİRE ═══
  ctx.beginPath();
  ctx.arc(boyut.width * 0.85, boyut.height * 0.15, 200, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(boyut.width * 0.1, boyut.height * 0.9, 250, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.fill();

  // ═══ BAŞLIK ═══
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.font = 'bold 32px Georgia, "Times New Roman", serif';
  ctx.textAlign = 'center';
  ctx.fillText('✨ GÜNÜN KELİMESİ', boyut.width / 2, boyut.height * 0.15);

  // ═══ AYRAÇ ═══
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(boyut.width * 0.2, boyut.height * 0.2);
  ctx.lineTo(boyut.width * 0.8, boyut.height * 0.2);
  ctx.stroke();

  // ═══ KELİME (büyük) ═══
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 96px Georgia, "Times New Roman", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(options.kelime, boyut.width / 2, boyut.height * 0.35);

  // ═══ ANLAM ═══
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.font = '36px Georgia, "Times New Roman", serif';
  ctx.fillText(options.anlam, boyut.width / 2, boyut.height * 0.45);

  // ═══ LEHÇE BADGE ═══
  if (options.lehce) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    const lehceText = options.lehce;
    ctx.font = 'bold 20px Georgia, "Times New Roman", serif';
    const textWidth = ctx.measureText(lehceText).width;
    const padding = 20;
    const badgeWidth = textWidth + padding * 2;
    const badgeHeight = 40;
    const badgeX = boyut.width / 2 - badgeWidth / 2;
    const badgeY = boyut.height * 0.52;

    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 20);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(lehceText, boyut.width / 2, badgeY + badgeHeight / 2);
  }

  // ═══ ÖRNEKLER ═══
  if (options.ornekler && options.ornekler.length > 0) {
    const ornekStartY = boyut.height * 0.62;
    const ornekLimit = Math.min(options.ornekler.length, 4);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 22px Georgia, "Times New Roman", serif';
    ctx.textAlign = 'center';
    ctx.fillText('💬 ÖRNEKLER', boyut.width / 2, ornekStartY);

    ctx.font = '26px Georgia, "Times New Roman", serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

    for (let i = 0; i < ornekLimit; i++) {
      const ornek = options.ornekler[i];
      const truncated = ornek.length > 50 ? ornek.slice(0, 47) + '...' : ornek;
      const y = ornekStartY + 50 + i * 45;

      // Sol çizgi
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

  // ═══ ALT: URL ═══
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = '24px Georgia, "Times New Roman", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🔗 acikmektep.com', boyut.width / 2, boyut.height * 0.9);

  // ═══ BLOB ═══
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Blob oluşturulamadı'));
    }, 'image/png');
  });
}

/**
 * Blob'u indir.
 */
export function indirBlob(blob: Blob, dosyaAdi: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = dosyaAdi;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}