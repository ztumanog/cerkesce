import { LemmaBuilderV2 } from '../src/domain/morphology/LemmaBuilderV2';

const lb = new LemmaBuilderV2();

const testler = ['шхалъэ', 'гъэщтэн', 'ахэр', 'пшыналъэ', 'зыгуэрым', 'гуфӀэ'];

for (const t of testler) {
    try {
        const r = lb.buildLemma(t);
        console.log(`\nKELIME: ${t}`);
        console.log(`  Tum alanlar:`, Object.keys(r));
        console.log(`  lemma: ${r.lemma}`);
        console.log(`  pos: ${r.pos}`);
        console.log(`  confidence: ${r.confidenceScore}`);
        console.log(`  stem: ${r.rawStem}`);
        console.log(`  rootMatches: ${JSON.stringify(r.rootMatches)}`);
    } catch (e) {
        console.log(`HATA ${t}: ${e}`);
    }
}
