/**
 * @file src/lib/bildirimler.ts
 * @description Capacitor Local Notifications yönetimi.
 */

import { LocalNotifications } from '@capacitor/local-notifications';

const BILDIRIM_ID = 1001;
const BILDIRIM_KEY = 'cerkesce_bildirim_ayar';

export interface BildirimAyar {
  aktif: boolean;
  saat: number; // 0-23
  dakika: number; // 0-59
}

const VARSAYILAN_AYAR: BildirimAyar = {
  aktif: false,
  saat: 9,
  dakika: 0,
};

/**
 * Ayarları localStorage'dan yükle.
 */
export function ayarlariYukle(): BildirimAyar {
  if (typeof window === 'undefined') return VARSAYILAN_AYAR;
  try {
    const raw = localStorage.getItem(BILDIRIM_KEY);
    if (!raw) return VARSAYILAN_AYAR;
    return { ...VARSAYILAN_AYAR, ...JSON.parse(raw) };
  } catch {
    return VARSAYILAN_AYAR;
  }
}

/**
 * Ayarları localStorage'a kaydet.
 */
export function ayarlariKaydet(ayar: BildirimAyar): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(BILDIRIM_KEY, JSON.stringify(ayar));
}

/**
 * Bildirim izni iste.
 */
export async function izinIste(): Promise<boolean> {
  try {
    const sonuc = await LocalNotifications.checkPermissions();
    if (sonuc.display === 'granted') return true;

    const yeniSonuc = await LocalNotifications.requestPermissions();
    return yeniSonuc.display === 'granted';
  } catch (err) {
    console.error('İzin hatası:', err);
    return false;
  }
}

/**
 * Günlük bildirimi planla.
 */
export async function bildirimiPlanla(
  ayar: BildirimAyar,
  gununKelimesi: { kelime: string; anlam: string }
): Promise<void> {
  try {
    // Önce eski bildirimi iptal et
    await LocalNotifications.cancel({
      notifications: [{ id: BILDIRIM_ID }],
    });

    if (!ayar.aktif) return;

    // İzin kontrol
    const izinVar = await izinIste();
    if (!izinVar) {
      console.warn('Bildirim izni verilmedi');
      return;
    }

    // Planla
    await LocalNotifications.schedule({
      notifications: [
        {
          id: BILDIRIM_ID,
          title: '✨ Günün Kelimesi',
          body: `${gununKelimesi.kelime} — ${gununKelimesi.anlam}`,
          schedule: {
            on: {
              hour: ayar.saat,
              minute: ayar.dakika,
            },
            repeats: true,
            every: 'day',
          },
          sound: undefined,
          smallIcon: 'ic_stat_icon_config_sample',
          iconColor: '#6366f1',
        },
      ],
    });

    console.log('✅ Bildirim planlandı:', `${ayar.saat}:${String(ayar.dakika).padStart(2, '0')}`);
  } catch (err) {
    console.error('Bildirim planlama hatası:', err);
    throw err;
  }
}

/**
 * Bildirimi iptal et.
 */
export async function bildirimiIptalEt(): Promise<void> {
  try {
    await LocalNotifications.cancel({
      notifications: [{ id: BILDIRIM_ID }],
    });
  } catch (err) {
    console.error('İptal hatası:', err);
  }
}

/**
 * Planlanmış bildirimleri listele.
 */
export async function planlanmisBildirimler(): Promise<any[]> {
  try {
    const sonuc = await LocalNotifications.getPending();
    return sonuc.notifications || [];
  } catch {
    return [];
  }
}
