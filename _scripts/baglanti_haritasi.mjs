// Salt okunur: app/ girişlerinden erişilebilen dosyaları çıkarır.
import fs from "fs";
import path from "path";

const kok = process.cwd();
const uzantilar = [".ts", ".tsx", ".js", ".jsx", ".mjs"];
const yoksay = ["node_modules", ".next", "tests", "__tests__", "_scripts", "backups", "docs"];

// tsconfig paths ("@/*")
let aliasHedef = ["src/*"];
try {
  const ham = fs.readFileSync("tsconfig.json", "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  const p = JSON.parse(ham).compilerOptions?.paths?.["@/*"];
  if (p) aliasHedef = p;
} catch {}
const aliasKokleri = aliasHedef.map((h) => h.replace(/\/\*$/, "").replace(/^\.\//, ""));

function tara(dir, cikti = []) {
  if (!fs.existsSync(dir)) return cikti;
  for (const ad of fs.readdirSync(dir, { withFileTypes: true })) {
    if (yoksay.includes(ad.name)) continue;
    const yol = path.join(dir, ad.name);
    if (ad.isDirectory()) tara(yol, cikti);
    else if (uzantilar.includes(path.extname(ad.name)) && !/\.(test|spec)\./.test(ad.name)) cikti.push(path.normalize(yol));
  }
  return cikti;
}

function coz(kaynak, ifade) {
  let adaylar = [];
  if (ifade.startsWith("@/")) adaylar = aliasKokleri.map((k) => path.join(kok, k, ifade.slice(2)));
  else if (ifade.startsWith(".")) adaylar = [path.resolve(path.dirname(kaynak), ifade)];
  else return null;
  for (const a of adaylar) {
    for (const son of ["", ...uzantilar, ...uzantilar.map((u) => "/index" + u)]) {
      const tam = path.normalize(a + son);
      if (fs.existsSync(tam) && fs.statSync(tam).isFile()) return tam;
    }
  }
  return null;
}

const importRe = /(?:import|export)\s[^'"]*?from\s*['"]([^'"]+)['"]|import\s*['"]([^'"]+)['"]|import\(\s*['"]([^'"]+)['"]\s*\)|require\(\s*['"]([^'"]+)['"]\s*\)/g;

function erisilebilir(girisler) {
  const gorulen = new Set();
  const yigin = [...girisler];
  while (yigin.length) {
    const f = yigin.pop();
    if (gorulen.has(f)) continue;
    gorulen.add(f);
    let icerik = "";
    try { icerik = fs.readFileSync(f, "utf8"); } catch { continue; }
    for (const m of icerik.matchAll(importRe)) {
      const ifade = m[1] || m[2] || m[3] || m[4];
      const hedef = ifade && coz(f, ifade);
      if (hedef && !gorulen.has(hedef)) yigin.push(hedef);
    }
  }
  return gorulen;
}

const tumu = [...tara(path.join(kok, "app")), ...tara(path.join(kok, "src"))];
const appDosyalari = tumu.filter((f) => f.startsWith(path.join(kok, "app")));
const srcDosyalari = tumu.filter((f) => f.startsWith(path.join(kok, "src")));

const bagli = erisilebilir(appDosyalari);

// src altında ilk iki klasör seviyesine göre grupla
function grup(f) {
  const goreli = path.relative(path.join(kok, "src"), f).split(path.sep);
  return goreli.length > 2 ? goreli.slice(0, 2).join("/") : goreli[0];
}
const ozet = {};
for (const f of srcDosyalari) {
  const g = grup(f);
  ozet[g] ??= { toplam: 0, bagli: 0 };
  ozet[g].toplam++;
  if (bagli.has(f)) ozet[g].bagli++;
}

console.log("app/ giris dosyasi:", appDosyalari.length, "| src/ dosyasi:", srcDosyalari.length);
console.log("src/ icinde app'ten erisilebilen:", srcDosyalari.filter((f) => bagli.has(f)).length, "\n");
console.log("KLASOR".padEnd(34), "TOPLAM".padStart(7), "BAGLI".padStart(7), "ORAN");
for (const [g, v] of Object.entries(ozet).sort((a, b) => a[0].localeCompare(b[0]))) {
  const oran = Math.round((v.bagli / v.toplam) * 100) + "%";
  console.log(g.padEnd(34), String(v.toplam).padStart(7), String(v.bagli).padStart(7), oran);
}

// app/api route'ları: hangi src klasörlerine uzanıyor?
console.log("\napp/api route -> dokundugu src klasorleri");
for (const f of appDosyalari.filter((x) => x.includes(path.join("app", "api")))) {
  const kume = erisilebilir([f]);
  const klasorler = new Set([...kume].filter((x) => x.startsWith(path.join(kok, "src"))).map(grup));
  console.log(path.relative(kok, f).padEnd(50), [...klasorler].join(", ") || "-");
}