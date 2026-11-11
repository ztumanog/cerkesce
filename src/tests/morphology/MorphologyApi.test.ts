import { describe, it, expect } from 'vitest';
import { POST } from '../../../app/api/morphology/analyze/route';

describe('API Route /api/morphology/analyze E2E Test', () => {

  it('Tekil kelime analizi için doğru JSON yanıtı dönmelidir', async () => {
    const req = new Request('http://localhost:3000/api/morphology/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word: 'цӀыхуныгъэ' }),
    });

    const response = await POST(req);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.word).toBe('цӀыхуныгъэ');
    expect(data.isMultiWord).toBe(false);
    expect(data.root).toBe('цӀыху');
  });

  it('Çoklu kelime/cümle sentaks analizi için ağaç ve dizilim verisi dönmelidir', async () => {
    const req = new Request('http://localhost:3000/api/morphology/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word: 'щӀалэм унэшхуэр ищӀащ' }),
    });

    const response = await POST(req);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.isMultiWord).toBe(true);
    expect(data.syntax).toBeDefined();
    expect(data.syntax.structurePattern).toBe('ERG_SUBJ + OBJ + VERB');
    expect(data.syntax.tokens).toHaveLength(3);
  });

  it('Geçersiz veya boş isteklerde 400 hatası dönmelidir', async () => {
    const req = new Request('http://localhost:3000/api/morphology/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word: '' }),
    });

    const response = await POST(req);
    expect(response.status).toBe(400);
  });

});