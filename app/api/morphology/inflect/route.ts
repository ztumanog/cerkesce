import { NextRequest, NextResponse } from 'next/server';
import { InflectionHandler } from '../../../../src/domain/linguistic/InflectionHandler';

/**
 * FİİL ÇEKİMİ ÜRETİMİ (P4-B5)
 *
 * src/domain/linguistic/InflectionHandler (üretici: kök + ek -> çekimli form)
 * ilk kez üretim akışına bağlandı. /sozluk/morphology sayfasındaki
 * "Fiil Çekimi Üret" bölümü bu ucu çağırır.
 *
 * İki kapasite:
 * - inflectVerbStem: mastar/gövde -> zaman/kip çekimi (şimdiki, geçmiş, gelecek,
 *   emir, koşul, zarf-fiil; olumsuz dahil, Kabardeyce/Adıgece sonek farkıyla)
 * - deriveCausative: ettirgen türetme (гъэ- ön eki, fonolojik uyumla)
 *
 * Not: inflect() (kök+ek kayıt defterinden birleştirme) veri kaydı gerektirir;
 * bu uç yalnızca kayıt defteri gerektirmeyen iki metodu kullanır.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const VALID_TENSES = new Set(['infinitive', 'present', 'past', 'future', 'imperative', 'conditional', 'gerund']);

// inflectVerbStem / deriveCausative kök-morfem kayıt defteri kullanmaz;
// boş kurucu yeterli (yöntemler tablo + fonoloji ile çalışır).
const handler = new InflectionHandler([], []);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const verb = String(body.verb || '').trim();
    if (!verb) {
      return NextResponse.json({ error: 'verb gerekli (mastar veya fiil gövdesi, örн: кӀуэн)' }, { status: 400 });
    }

    const tenseOrMood = String(body.tenseOrMood || 'present');
    if (!VALID_TENSES.has(tenseOrMood)) {
      return NextResponse.json({ error: `geçersiz tenseOrMood: ${tenseOrMood}` }, { status: 400 });
    }
    const dialect = body.dialect === 'adyghe' ? 'adyghe' : 'kabardian';
    const negative = Boolean(body.negative);
    const causative = Boolean(body.causative);

    const result = handler.inflectVerbStem(verb, tenseOrMood as any, dialect as any, negative);
    const causativeResult = causative ? handler.deriveCausative(result.form, dialect as any) : null;

    return NextResponse.json({
      input: verb,
      form: result.form,
      components: result.components,
      rule: result.rule,
      confidence: result.confidence,
      tenseOrMood,
      dialect,
      negative,
      causative: causativeResult
        ? { form: causativeResult.form, components: causativeResult.components, rule: causativeResult.rule, confidence: causativeResult.confidence }
        : null,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'çekim üretilemedi' }, { status: 500 });
  }
}
