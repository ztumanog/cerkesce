import fs from 'fs';
import path from 'path';
import { LemmaBuilderV2 } from '../src/domain/morphology/LemmaBuilderV2';

const lb = new LemmaBuilderV2();

// 1) Lexemes.json'daki tum form'larin lemma'larini cikar
const lexemes = JSON.parse(fs.readFileSync('public/data/linguistic/lexemes.json', 'utf-8'));
const lexemeList = Array.isArray(lexemes) ? lexemes : (lexemes.lexemes || []);

console.log(`Toplam lexeme: ${lexemeList.length}`);

// form -> { lemma, id, form }
const formToLemma: Record<string, string> = {};
const lemmaToLexemes: Record<string, Array<{id: string, form: string}>> = {};

let islenen = 0;
let hata = 0;

for (const lex of lexemeList) {
    const form = lex.form;
    if (!form || form.length < 2) continue;
    try {
        const r = lb.buildLemma(form);
        if (r.lemma) {
            formToLemma[form] = r.lemma;
            if (!lemmaToLexemes[r.lemma]) lemmaToLexemes[r.lemma] = [];
            lemmaToLexemes[r.lemma].push({ id: lex.id || '', form: form });
            islenen++;
        }
    } catch (e) {
        hata++;
    }
}

console.log(`Islenen: ${islenen}, Hata: ${hata}`);
console.log(`Benzersiz lemma: ${Object.keys(lemmaToLexemes).length}`);

// 2) CSV'yi oku (Python'dan gelen coklu_kelime_cumleler.csv)
const csvPath = '_raporlar/coklu_kelime_cumleler.csv';
const csvText = fs.readFileSync(csvPath, 'utf-8');
const csvLines = csvText.split('\n').filter(l => l.trim());

// Basit CSV parse (ilk satir baslik)
const headers = csvLines[0].split(',').map(h => h.trim());
const noIdx = headers.indexOf('no');
const trIdx = headers.indexOf('turkce');
const ceIdx = headers.indexOf('cerkesce');
const onayIdx = headers.indexOf('onay');

const cumleler: Array<{no: string, tr: string, ce: string, onay: string}> = [];
for (let i = 1; i < csvLines.length; i++) {
    // Basit CSV split (virgul iceren alanlar icin yetersiz ama idare eder)
    const parts = csvLines[i].split(',');
    if (parts.length < 3) continue;
    cumleler.push({
        no: parts[noIdx]?.trim() || '',
        tr: parts[trIdx]?.trim() || '',
        ce: parts[ceIdx]?.trim() || '',
        onay: parts[onayIdx]?.trim() || ''
    });
}

console.log(`\nCSV satir: ${cumleler.length}`);

// 3) Her cumledeki Cerkesce kelimelerin lemma'larini cikar
const sonuclar: Array<{
    no: string,
    tr: string,
    ce: string,
    kelime_lemma: Array<{kelime: string, lemma: string}>,
    eslesen_lexeme: Array<{id: string, form: string}>
}> = [];

for (const c of cumleler) {
    // Cerkesce kelimeleri ayir (4+ harf)
    const kelimeler = (c.ce.match(/[а-яА-ЯӀӏ]{4,}/g) || []);
    
    const kelime_lemma: Array<{kelime: string, lemma: string}> = [];
    const eslesen_lexeme: Array<{id: string, form: string}> = [];
    const eklenenIdler = new Set<string>();
    
    for (const k of kelimeler) {
        try {
            const r = lb.buildLemma(k);
            if (r.lemma) {
                kelime_lemma.push({ kelime: k, lemma: r.lemma });
                
                // Bu lemma ile eslesen lexeme var mi?
                const eslesenler = lemmaToLexemes[r.lemma] || [];
                for (const le of eslesenler) {
                    if (!eklenenIdler.has(le.id)) {
                        eklenenIdler.add(le.id);
                        eslesen_lexeme.push(le);
                    }
                }
            }
        } catch (e) {
            // hata, atla
        }
    }
    
    if (eslesen_lexeme.length > 0) {
        sonuclar.push({
            no: c.no,
            tr: c.tr,
            ce: c.ce,
            kelime_lemma: kelime_lemma,
            eslesen_lexeme: eslesen_lexeme
        });
    }
}

console.log(`\nEslesen cumle: ${sonuclar.length}`);

// 4) Kaydet
const outPath = '_raporlar/cumle_lemma_eslesme.json';
fs.writeFileSync(outPath, JSON.stringify(sonuclar, null, 2), 'utf-8');
console.log(`Yazildi: ${outPath}`);

// 5) Ilk 10 ornek
console.log('\n=== ILK 10 ESLEME ===');
for (const s of sonuclar.slice(0, 10)) {
    console.log(`\nTR: ${s.tr}`);
    console.log(`CE: ${s.ce}`);
    console.log(`Eslesen lexeme: ${s.eslesen_lexeme.map(e => e.form).join(', ')}`);
}
