import { describe, it, expect } from 'vitest';
import { evaluateAccess } from '../../lib/auth/guard';
import type { SessionPayload } from '../../lib/auth/session';

/**
 * AUTH-001 — Erişim politikası (guard.ts, tek karar noktası).
 * Kapsam (Baş Mimar onayı):
 * - Kilitli: /admin/** (giris+yetkisiz hariç), /api/admin|curation|governance/**, /api/moderasyon
 * - İstisna: /api/moderasyon GET+POST (vatandaş Kelime Öner akışı)
 */

const YONETICI: SessionPayload = { email: 'mimar@cerkesce.org', role: 'YONETICI', exp: 9999999999 };
const DUSUK_ROL = { email: 'vatandas@x.com', role: 'VATANDAS', exp: 9999999999 } as unknown as SessionPayload;

describe('AUTH-001 - Erisim politikasi (guard.ts)', () => {
  describe('Sayfalar', () => {
    it('AUTH-G1: girissiz /admin sayfasi girise yonlendirilir', () => {
      for (const path of ['/admin/yonetim', '/admin/moderasyon', '/admin/curation/lexemes', '/admin/research']) {
        const d = evaluateAccess(path, 'GET', null);
        expect(d).toEqual({ allow: false, kind: 'LOGIN_REQUIRED', redirectTo: '/admin/giris' });
      }
    });

    it('AUTH-G2: giris ve yetkisiz sayfalari herkese acik', () => {
      expect(evaluateAccess('/admin/giris', 'GET', null)).toEqual({ allow: true });
      expect(evaluateAccess('/admin/yetkisiz', 'GET', null)).toEqual({ allow: true });
    });

    it('AUTH-G3: yonetici oturumuyla admin sayfalari acik', () => {
      expect(evaluateAccess('/admin/yonetim', 'GET', YONETICI)).toEqual({ allow: true });
      expect(evaluateAccess('/admin/moderasyon', 'GET', YONETICI)).toEqual({ allow: true });
    });

    it('AUTH-G4: oturum acik ama rol yetersizse yetkisiz sayfasi', () => {
      const d = evaluateAccess('/admin/yonetim', 'GET', DUSUK_ROL);
      expect(d).toEqual({ allow: false, kind: 'YETKISIZ', redirectTo: '/admin/yetkisiz' });
    });

    it('AUTH-G5: vatandas sayfalari girissiz acik (dokunulmaz)', () => {
      for (const path of ['/', '/sozluk/oneri', '/sozluk/morphology', '/sozluk/converter', '/explorer']) {
        expect(evaluateAccess(path, 'GET', null)).toEqual({ allow: true });
      }
    });
  });

  describe("API'ler", () => {
    it('AUTH-G6: girissiz kilitli API 401 karari (LOGIN_REQUIRED)', () => {
      for (const path of [
        '/api/curation/lexemes',
        '/api/curation/bulk',
        '/api/admin/curation/route',
        '/api/governance/executive',
      ]) {
        const d = evaluateAccess(path, 'GET', null);
        expect(d).toEqual({ allow: false, kind: 'LOGIN_REQUIRED', redirectTo: '/admin/giris' });
      }
    });

    it('AUTH-G7: yonetici oturumuyla kilitli API acik', () => {
      expect(evaluateAccess('/api/curation/lexemes', 'GET', YONETICI)).toEqual({ allow: true });
      expect(evaluateAccess('/api/moderasyon', 'PATCH', YONETICI)).toEqual({ allow: true });
    });

    it('AUTH-G8: /api/moderasyon GET+POST vatandasa acik (Kelime Oner akisi)', () => {
      expect(evaluateAccess('/api/moderasyon', 'GET', null)).toEqual({ allow: true });
      expect(evaluateAccess('/api/moderasyon', 'POST', null)).toEqual({ allow: true });
    });

    it('AUTH-G9: /api/moderasyon PATCH (onayla/reddet) girissiz KILITLI', () => {
      const d = evaluateAccess('/api/moderasyon', 'PATCH', null);
      expect(d).toEqual({ allow: false, kind: 'LOGIN_REQUIRED', redirectTo: '/admin/giris' });
    });

    it('AUTH-G10: vatandas APIleri girissiz acik', () => {
      for (const path of ['/api/search', '/api/morphology/analyze', '/api/morphology/inflect', '/api/translation', '/api/kavram/SU']) {
        expect(evaluateAccess(path, 'GET', null)).toEqual({ allow: true });
      }
    });

    it('AUTH-G11: onek eslesmesi kesin — benzer adli yollar kilitli kalmaz/acilmaz', () => {
      // /api/moderasyonfoo korumali degil (onek degil)
      expect(evaluateAccess('/api/moderasyonfoo', 'GET', null)).toEqual({ allow: true });
      // /api/curation/... alt yolu korumali
      expect(evaluateAccess('/api/curation/concepts/decide', 'POST', null)).toEqual({
        allow: false,
        kind: 'LOGIN_REQUIRED',
        redirectTo: '/admin/giris',
      });
    });
  });
});
