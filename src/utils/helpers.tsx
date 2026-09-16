// ============================================
// ⬇️ ŞU KODLARI helpers.ts'in EN SONUNA EKLE
// ============================================

/**
 * metneCevir - Convert/escape text for safe HTML display
 * Prevents XSS attacks by escaping HTML special characters
 */
export function metneCevir(text: string | undefined | null): string {
  if (!text) return '';
  
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * kaynagiDuzenle - Format dictionary source name
 * Cleans up file names and source identifiers
 */
export function kaynagiDuzenle(text: string | undefined | null): string {
  if (!text) return 'Bilinmeyen Kaynak';
  
  return String(text)
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\.json$/i, '')
    .replace(/\.csv$/i, '')
    .replace(/\.txt$/i, '')
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * normalizeText - Normalize Turkish text
 * Converts to lowercase and removes diacritics
 */
export function normalizeText(text: string): string {
  if (!text) return '';
  
  const turkishMap: Record<string, string> = {
    'ç': 'c', 'Ç': 'C',
    'ğ': 'g', 'Ğ': 'G',
    'ı': 'i', 'I': 'i',
    'ö': 'o', 'Ö': 'O',
    'ş': 's', 'Ş': 'S',
    'ü': 'u', 'Ü': 'U',
  };

  return String(text)
    .toLowerCase()
    .split('')
    .map(char => turkishMap[char] || char)
    .join('');
}

/**
 * truncateText - Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * formatDate - Format date to Turkish locale
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * getInitials - Get initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
}