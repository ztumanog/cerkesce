import fs from 'fs';
import { LemmaBuilderV2 } from '../src/domain/morphology/LemmaBuilderV2';

const lb = new LemmaBuilderV2();
const lexemes = JSON.parse(fs.readFileSync('public/data/linguistic/lexemes.json', 'utf-8'));
const lexemeList = Array.isArray(lexemes) ? lexemes : (lexemes.lexemes || []);

console.log(`Toplam lexeme: ${lexemeList.length}`);

const sonuclar: Record<string, {
    form: string,
    lemma: string,
    pos: string,
    confidence: number,
    stem: string,
    roots: Array<{ id: string, form: string }>
}> = {};

let islenen = 0;
let hata = 0;

for (const lex of lexemeList) {
    const form = lex.form;
    if (!form || form.length < 3) continue;
    try {
        const r = lb.buildLemma(form);
        const roots = (r.rootMatches || []).map((m: any) => ({
            id: m.rootId || m.id || '',
            form: m.form || ''
        })).filter((x: any) => x.id);
        
        if (roots.length > 0) {
            sonuclar[form] = {
                form: form,
                lemma: r.lemma || '',
                pos: r.pos || '',
                confidence: r.confidenceScore || 0,
                stem: r.rawStem || '',
                roots: roots
            };
            islenen++;
            if (islenen % 5000 === 0) console.log(`${islenen} islendi...`);
        }
    } catch (e) {
        hata++;
    }
}

const outPath = '_raporlar/lemmas_all.json';
fs.writeFileSync(outPath, JSON.stringify(sonuclar, null, 2), 'utf-8');
console.log(`\nRoot'lu lexeme: ${islenen}, Hata: ${hata}`);
console.log(`Yazildi: ${outPath}`);

// Ilk 10 ornek
const keys = Object.keys(sonuclar).slice(0, 10);
console.log('\n=== ILK 10 ORNEK ===');
for (const k of keys) {
    const s = sonuclar[k];
    console.log(`  [${s.form}] lemma=${s.lemma} -> roots=${s.roots.map((r: any) => r.id).join(', ')}`);
}
