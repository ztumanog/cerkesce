import { LemmaBuilderV2 } from '../src/domain/morphology/LemmaBuilderV2';

const lb = new LemmaBuilderV2();

const testler = ['шхалъэ', 'гъэщтэн', 'ахэр', 'пшыналъэ', 'зыгуэрым', 'гуфӀэ', 'тэйлъэдан', 'хэлъхьэн'];

for (const t of testler) {
    const r = lb.buildLemma(t);
    console.log(`\nKELIME: ${t}`);
    console.log(`  lemma: ${r.lemma}`);
    console.log(`  rawStem: ${r.rawStem}`);
    console.log(`  morphemeBreakdown: ${JSON.stringify(r.morphemeBreakdown)}`);
}
