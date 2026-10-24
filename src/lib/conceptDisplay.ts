/**
 * File: src/lib/conceptDisplay.ts
 * Layer: Lib
 *
 * Concept ID gösterim kuralları.
 * KAVRAM_ ile başlayan geçici kimlikler UI'da gösterilmez.
 */

/**
 * Bir conceptId'nin UI'da gösterilip gösterilemeyeceğini belirler.
 *
 * Kurallar:
 * - null/undefined → false
 * - KAVRAM_ ile başlayan → false (Rusça gloss kaynaklı geçici kimlik)
 * - Sadece BÜYÜK_HARF (Türkçe harfler dahil: Ç Ğ İ Ö Ş Ü) ve ALTÇİZGİ → true
 */
export function isDisplayableConceptId(id: string | null | undefined): id is string {
  if (!id) return false;
  if (id.startsWith('KAVRAM_')) return false; // Rusça gloss kaynaklı geçici kimlik
  return /^[A-ZÇĞİÖŞÜ][A-ZÇĞİÖŞÜ0-9_]*$/.test(id);
}

/**
 * Bir conceptId'yi UI için güvenli hale getirir.
 * Gösterilemiyorsa null döndürür.
 */
export function safeConceptId(id: string | null | undefined): string | null {
  return isDisplayableConceptId(id) ? id : null;
}
