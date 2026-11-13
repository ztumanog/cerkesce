import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '../../../app/api/sozluk/root/[id]/route';

describe('Root API (/api/sozluk/root/[id])', () => {
  it('bilinmeyen kanonik kok IDleri (R-XHU, R-NONEXISTENT-999) icin 404 doner', async () => {
    for (const unknownId of ['R-XHU', 'R-NONEXISTENT-999']) {
      const req = new NextRequest(`http://localhost:3000/api/sozluk/root/${unknownId}`);
      const res = await GET(req, { params: Promise.resolve({ id: unknownId }) });
      expect(res.status).toBe(404);
      const body = await res.json();
      expect(body.error).toBeTruthy();
    }
  });

  it('gecerli bir kanonik kok IDsi (R-LHE) icin 200 ve uyeleri doner', async () => {
    const req = new NextRequest('http://localhost:3000/api/sozluk/root/R-LHE');
    const res = await GET(req, { params: Promise.resolve({ id: 'R-LHE' }) });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.id).toBe('R-LHE');
    expect(body.count).toBeGreaterThan(0);
  });

  it('birlestirilen duplicate alias IDsini (R-SHX -> R-SHKH) kanonik koke yonlendirir', async () => {
    const req = new NextRequest('http://localhost:3000/api/sozluk/root/R-SHX');
    const res = await GET(req, { params: Promise.resolve({ id: 'R-SHX' }) });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.id).toBe('R-SHKH');
    expect(body.requestedId).toBe('R-SHX');
  });
});
