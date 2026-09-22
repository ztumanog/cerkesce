const sharp = require('sharp');
const fs = require('fs');

const svgPath = process.argv[2];
const pngPath = process.argv[3];
const size = parseInt(process.argv[4] || '1024', 10);

if (!svgPath || !pngPath) {
  console.error('Kullanım: node convert-icon.js <input.svg> <output.png> [size]');
  process.exit(1);
}

sharp(fs.readFileSync(svgPath), { density: 300 })
  .resize(size, size)
  .png()
  .toFile(pngPath)
  .then(() => console.log(`✅ ${pngPath} oluşturuldu (${size}x${size})`))
  .catch((err) => console.error('❌ Hata:', err));