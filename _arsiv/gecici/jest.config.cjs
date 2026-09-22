/**
 * @file jest.config.cjs
 * @description Jest ve ts-jest için CommonJS formatında yapılandırma dosyası.
 */

module.exports = {
  // TypeScript dosyalarını ts-jest ile işle
  preset: 'ts-jest',
  // Test ortamı olarak Node.js kullan
  testEnvironment: 'node',
  // Test dosyalarının aranacağı dizinler
  roots: ['<rootDir>/src'],
  // Test dosyası uzantı kalıpları
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  // Dosya uzantılarını tanıma sırası
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};