import re
from pathlib import Path

ts_path = Path('src/domain/morphology/VerbSuffixDecompiler.ts')
content = ts_path.read_text(encoding='utf-8')

# 1) lexemeSet import ekle (eger yoksa)
eski_import = """export interface SuffixResult {
  morpheme: string;
  code: string;
  gloss: string;
}"""

yeni_import = """import fs from 'fs';
import path from 'path';

export interface SuffixResult {
  morpheme: string;
  code: string;
  gloss: string;
}

// Lexeme set (kok kontrolu icin)
let LEXEME_SET: Set<string> | null = null;
function getLexemeSet(): Set<string> {
  if (LEXEME_SET) return LEXEME_SET;
  try {
    const lexPath = path.resolve('./public/data/linguistic/lexemes.json');
    const lex = JSON.parse(fs.readFileSync(lexPath, 'utf-8'));
    LEXEME_SET = new Set(lex.map((l: any) => l.form));
  } catch {
    LEXEME_SET = new Set();
  }
  return LEXEME_SET;
}"""

content = content.replace(eski_import, yeni_import)

# 2) decompile metodunda kural ekle
eski_kural = """          if (stripped.length >= 2) {
            suffixes.unshift({
              morpheme: match[0],
              code: s.code,
              gloss: s.gloss,
            });
            remaining = stripped;
            changed = true;
            break;
          }"""

yeni_kural = """          if (stripped.length >= 2) {
            let finalStripped = stripped;
            // "у" ile biten koklerde "э" geri ekle (кIу -> кIуэ)
            if (stripped.endsWith('у') && (match[0] === 'ащ' || match[0] === 'а')) {
              const withE = stripped + 'э';
              if (getLexemeSet().has(withE)) {
                finalStripped = withE;
              }
            }
            suffixes.unshift({
              morpheme: match[0],
              code: s.code,
              gloss: s.gloss,
            });
            remaining = finalStripped;
            changed = true;
            break;
          }"""

if eski_kural in content:
    content = content.replace(eski_kural, yeni_kural)
    ts_path.write_text(content, encoding='utf-8')
    print("✅ VerbSuffixDecompiler kural eklendi")
else:
    print("❌ Pattern bulunamadi!")
