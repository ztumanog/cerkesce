import sharp from 'sharp';
import { readFileSync } from 'fs';
import { mkdirSync } from 'fs';

const svg = readFileSync('public/icons/favicon.svg');
mkdirSync('public/icons', { recursive: true });

await sharp(svg).resize(192, 192).png().toFile('public/icons/icon-192.png');
await sharp(svg).resize(512, 512).png().toFile('public/icons/icon-512.png');
await sharp(svg).resize(144, 144).png().toFile('public/icons/icon-144.png');
await sharp(svg).resize(96, 96).png().toFile('public/icons/icon-96.png');
await sharp(svg).resize(72, 72).png().toFile('public/icons/icon-72.png');
await sharp(svg).resize(48, 48).png().toFile('public/icons/icon-48.png');

console.log('PNG ikonlar olusturuldu!');