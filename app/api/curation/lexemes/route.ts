import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get('q')||'').toLowerCase();
  const p = path.join(process.cwd(), '_scripts', '2ca-001-review.json');
  const review = JSON.parse(fs.readFileSync(p,'utf-8'));
  const lexemes = Object.entries(review).filter(([k])=>!k.startsWith('_')).map(([tr,v]:any,i)=>({id:'lex_'+i, form:v.circassianCandidates?.[0]||tr, language:'kbd', rootIds:['root_1'], wordFamilyId:'wf_'+tr, conceptId:v.target||null, tr, ...v}));
  const filtered = !q ? lexemes.slice(0,30) : lexemes.filter((l:any)=> l.tr.toLowerCase().includes(q) || String(l.form).toLowerCase().includes(q));
  return NextResponse.json(filtered);
}
