
import fs from 'fs';
import path from 'path';
import Client from './client';

function loadJson(name:string){
  const tries=[
    path.join(process.cwd(),'data','linguistic',name),
    path.join(process.cwd(),'public','data','linguistic',name),
    path.join(process.cwd(),'src','data','linguistic',name),
  ];
  for(const p of tries){
    try{
      if(fs.existsSync(/*turbopackIgnore: true*/ p)){
        const raw=fs.readFileSync(/*turbopackIgnore: true*/ p,'utf-8');
        const j=JSON.parse(raw);
        return Array.isArray(j)?j:(j.lexemes||Object.values(j));
      }
    }catch(e){}
  }
  return [];
}

export default function Page(){
  const families = loadJson('word_families.json') as any[];
  const lexemes = loadJson('lexemes.json') as any[];
  return <Client initialFamilies={families} initialLexemes={lexemes as any[]} />
}
