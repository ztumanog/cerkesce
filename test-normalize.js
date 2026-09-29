const PALOCHKA = '\u04C0';
function normalizePalochka(input) {
  if (!input) return input;
  return input
    .replace(/\u04CF/g, PALOCHKA)
    .replace(/\u0031/g, PALOCHKA)
    .replace(/\u0049/g, PALOCHKA);
}

console.log('1э →', normalizePalochka('1э'));
console.log('Ӏэ →', normalizePalochka('Ӏэ'));
console.log('Iэ →', normalizePalochka('Iэ'));
